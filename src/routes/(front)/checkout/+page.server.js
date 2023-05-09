import { error, fail, redirect } from '@sveltejs/kit'
import { serializeNonPOJOs, generateUsername, getUUID } from '$lib/utils'
import p24 from '$lib/p24'
import { z } from "zod";

const stringMessages = {
  'required_error': 'Pole wymagane',
  'invalid_type_error': 'Wymagany ciąg znaków',
  'message': 'Pole wymagane'
}


export const actions = {
	pay: async ({request, locals, cookies}) => {
    
    const body = Object.fromEntries(await request.formData() )
    const registrSchema = z.object({
      name: z.string(stringMessages).min(1, stringMessages).trim(),
      email: z.string(stringMessages).email(stringMessages),
      telephone: z.string(stringMessages).min(1, stringMessages).trim(),
      address: z.string(stringMessages).min(1,stringMessages).trim(),
      postcode: z.string(stringMessages).min(5, {message: 'Kod pocztowy xx-xxx'}).trim(),
      city: z.string(stringMessages).min(1, stringMessages).trim(),
      country: z.string(stringMessages).min(1, stringMessages).trim(),
    });

    if(body.create_account) {
      registrSchema = {
        ...registrSchema,
        password: z.string(stringMessages).min(8, {message: 'Hasło musi mieć conajmniej 8 znaków'}).trim(),
        passwordConfirm: z.string(stringMessages).min(8, {message: 'Hasło musi mieć min 8 znaków'}).trim(),
      }
    }

    try {
      registrSchema.parse(body)
    } catch (err) {
      return fail(400, { errors: err.flatten() });
    }

		let client = {}
		let total = 0
		const sessionId = cookies.get('sessionId')
    let products = []

		// start p24
		const transaction = new p24()

		const cart = JSON.parse(cookies.get('cart'))

		for (const v of cart) {
			const product = await locals.pb.collection('products').getOne(v.id);
			if(product) {
				const obj = serializeNonPOJOs(product)
        products.push(obj)
				total =  total+obj.price
			}
		}
		
		if(total > 0)
		try {

			const result = await locals.pb.collection('options').getOne('wvo06cc5cbpk6zk');
			const shipping = parseInt(serializeNonPOJOs(result).value);
			total = (total + shipping) * 100

			if(body.create_account ) {
				let username = generateUsername(body.name.split(' ').join('').toLowerCase())
				try {
					await locals.pb.collection('users').create({username, ...body})
					await locals.pb.collection('users').requestVerification(body.email)
				} catch (err) {
					console.log('Error: ', err)
					throw error(500, "500 server error")
				}
			} 

			if(locals.user) {
				client = {
					client: locals.user.name,
					email: locals.user.email,
					phone: locals.user.telephone,
					address: JSON.stringify(locals.user.address),
					city: locals.user.city,
					zip: locals.user.postcode,
					country: 'PL',
				}
			} else {
				client = {
					client: body.name,
					email: body.email,
					phone: body.telephone,
					address: JSON.stringify(body.address),
					city: body.city,
					zip: body.postcode,
					country: 'PL',
				}
			}

			// set p24 transaction
			transaction.setClient(client)
			transaction.setSessionId(sessionId)
			transaction.setShipping(shipping)
			transaction.setTotal(total)

			try {

				// create order record
				const pb_order = {
					"sessionId": sessionId,
					"user": locals.user ? locals.user.id : "",
					"email": client.email,
					"telephone": client.phone,
					"address": client.address,
					"city": client.city,
					"postcode": client.zip,
					"country": client.country,
					"status": "PENDING",
					"products": products.map(p => {
						return p.id
					}),
					"total": total,
					"note": body.note
				};

				// if different shipping address add it
				if(body.shipping)
				pb_order.shipping = body.shipping

				const order_record = await locals.pb.collection('orders').create(pb_order)

				// create payment record
				const pb_payment = {
					"user": locals.user ? locals.user.id : "",
					"order": order_record.id,
					"session_id": sessionId,
					"amount": total,
					"status": "PENDING"
				};
				const payment = await locals.pb.collection('payments').create(pb_payment)

				cookies.set('orderId', order_record.id, {
					httpOnly: false,
					secure: false
				})

				// update stock level
				for (const prod of products) {
					try {
						const data = {
							'stock': prod.stock - 1
						}
						const update = await locals.pb.collection('products').update(prod.id, data);
					} catch (err) {
						console.log(`Update stock: ${prod.id} error: `, err)
						throw error(500, '500 error page')
					}
				}
				// continue p24 transaction
				transaction.setDescription(`Zamówienie: ${order_record.id}`)
				transaction.setSignature()
				transaction.setOrder()
				await transaction.obtainToken()

			} catch (err) {
				console.log('Error: ', err)
				throw error(500, "500 server error")
			}
			

		} catch (err) {
			console.log("Error: ", err)
			throw error(500, '500 error page')
		}

		throw redirect(303, transaction.getRedirect())
	}
}

export const load = async ({locals, cookies }) => {
	const result = await locals.pb.collection('options').getOne('wvo06cc5cbpk6zk');
	const shipping = serializeNonPOJOs(result);
  const sessionId = getUUID()
  cookies.set('sessionId', sessionId, {
		httpOnly: false,
		secure: false
	})
	return {
		shipping,
		user: locals.user ? locals.user : undefined
	}
}