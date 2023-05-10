import { error, redirect } from '@sveltejs/kit'
import { serializeNonPOJOs, getUUID } from '$lib/utils'
import p24 from '$lib/p24'

export const actions = {
	pay: async ({request, locals, cookies}) => {
		let client = {}
		let total = 0
    let shipping = 0

		// start p24
		const transaction = new p24()

		const body = Object.fromEntries(await request.formData() )

		const sessionId = body.sessionId ? body.sessionId : ''
		const orderId = body.orderId ? body.orderId : ''

		cookies.set('sessionId', sessionId, {
			httpOnly: false,
			secure: false
		})

		cookies.set('orderId', orderId, {
			httpOnly: false,
			secure: false
		})

		total = body.total
    shipping = body.shipping
		try {
      client = {
        client: locals.user.name,
        email: locals.user.email,
        phone: locals.user.telephone,
        address: JSON.stringify(locals.user.address),
        city: locals.user.city,
        zip: locals.user.postcode,
        country: 'PL',
      }

			// set p24 transaction
			transaction.setClient(client)
			transaction.setSessionId(sessionId)
			transaction.setShipping(shipping*100)
			transaction.setTotal(parseInt(total))
      transaction.setDescription(`Zamówienie: ${body.orderId}`)
      transaction.setSignature()
      transaction.setOrder()
      await transaction.obtainToken()

		} catch (err) {
			console.log("Error: ", err)
			throw error(500, '500 error page')
		}

		throw redirect(303, transaction.getRedirect())
	}
}

export const load = async ({locals, params, cookies }) => {
	if(!locals.user) {
		throw redirect(303, '/login')
	}
  const result = await locals.pb.collection('options').getOne('wvo06cc5cbpk6zk');
	const shipping = serializeNonPOJOs(result);

	const records = await locals.pb.collection('orders').getList(1, 50, {
			filter: 'user = "'+locals.user.id+'"',
			sort: '-created',
			expand: 'products'
	});
	return {
		user: locals.user,
		orders: serializeNonPOJOs(records),
    shipping
	}
}