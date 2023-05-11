import { error, fail, redirect } from '@sveltejs/kit'
import { generateUsername, getUUID, validateData } from '$lib/utils'
import { SECRET_STRIPE_KEY } from '$env/static/private'
import type { Actions } from './$types'
import type { PageServerLoad } from './$types'
import { toastStore } from '@skeletonlabs/skeleton'
import type { ToastSettings } from '@skeletonlabs/skeleton'
import { registerUserSchema } from '$lib/schemas'
import Stripe from 'stripe';

export const actions:Actions = {
	pay: async ({request, locals, cookies}) => {
    

    const body = Object.fromEntries(await request.formData() )


    if(body.create_account) {
			const { formData, errors } = await validateData(await request.formData(), registerUserSchema)

			if (errors) {
				const t: ToastSettings = {
					message: 'Validation errors',
					background: 'variant-filled-error'
				};
				toastStore.trigger(t);
				return fail(400, {
					data: formData,
					errors: errors.fieldErrors
				})
			}
    }


		let client = {}
		let total = 0
		const sessionId = cookies.get('sessionId')
    let products = []


		const cart = JSON.parse(cookies.get('cart'))

		for (const v of cart) {
			const product = await locals.pb.collection('products').getOne(v.id);
			if(product) {
				const obj = structuredClone(product)
        products.push(obj)
				total =  total+obj.price
			}
		}
		

		
		if(total > 0)
		try {

			const result = await locals.pb.collection('options').getOne('bi3g03tppvmir2y');
			const shipping = parseInt(structuredClone(result).value);
			total = (total + shipping) * 100

			const paymentIntent = await stripe.paymentIntents.create({
				amount: total,
				currency: "gbp",
				automatic_payment_methods: {
					enabled: true,
				},
			});

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
} satisfies Actions;

export const load = (async ({locals, cookies }) => {
	const result = await locals.pb.collection('options').getOne('bi3g03tppvmir2y');
	const shipping:number = structuredClone(result).value;
  const sessionId = getUUID()


	const cart = JSON.parse(cookies.get('cart'))	
	let total = 0

	for (const v of cart) {
		const product = await locals.pb.collection('products').getOne(v.id);
		if(product) {
			const obj = structuredClone(product)
			total =  total+obj.price
		}
	}
	total = (total + shipping) * 100

	const stripe = new Stripe(SECRET_STRIPE_KEY);

	const paymentIntent = await stripe.paymentIntents.create({
		amount: total,
		currency: "gbp",
		automatic_payment_methods: {
			enabled: true,
		},
	});
	const clientSecret = paymentIntent.client_secret


  cookies.set('sessionId', sessionId, {
		httpOnly: false,
		secure: false
	})
	return {
		shipping,
		clientSecret,
		user: structuredClone(locals.pb?.authStore?.model) ?? undefined
	}
}) satisfies PageServerLoad;