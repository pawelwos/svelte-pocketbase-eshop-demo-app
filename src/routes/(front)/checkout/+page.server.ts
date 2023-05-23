import { error, fail, redirect } from '@sveltejs/kit'
import { generateUsername, validateData, getUUID } from '$lib/utils'
import { SECRET_STRIPE_KEY } from '$env/static/private'
import { PUBLIC_SUCCESS_URL, PUBLIC_CANCEL_URL, PUBLIC_PB_URL} from '$env/static/public'
import type { Actions } from './$types'
import type { PageServerLoad } from './$types'
import { toastStore } from '@skeletonlabs/skeleton'
import type { ToastSettings } from '@skeletonlabs/skeleton'
import { registerUserSchema } from '$lib/schemas'
import Stripe from 'stripe';


export const actions:Actions = {
	pay: async ({request, locals, cookies}) => {

		// create app sessionId
		const sessionId = getUUID()
		const formData = await request.formData()
		const user = locals.pb.authStore.model ?? null
		const { formData: body, errors } = await validateData(formData, registerUserSchema(formData.get('create_account') ? false : true))
		

		if (!user && errors) {
			const t: ToastSettings = {
				message: 'Validation errors',
				background: 'variant-filled-error'
			};
			toastStore.trigger(t);
			return fail(400, {
				data: body,
				errors: errors.fieldErrors
			})
		}

		let client = {}
		let total = 0
		let session:any

		const cart = JSON.parse(cookies.get('cart'))
		let cartStr:string = ""

		// stripe session cart
		const line_items = []

		for (const item of cart) {
			const product = await locals.pb.collection('products').getOne(item.id)
			if(product) {

				//PUBLIC_PB_URL+"/api/files/"+product.collectionId+"/"+product.id+"/"+product.cover
				const images = ['https://app.pawelwos.com'+"/api/files/"+product.collectionId+"/"+product.id+"/"+product.cover]
				
				// Stripe product for session
				line_items.push({
					'price_data': {
						'currency': 'GBP',
						'product_data': {
							'name': product.name,
							'images': images,
              'metadata': {
                'productId': product.id
              }
						},
						'unit_amount': product.price*100,
					},
					'quantity': item.quantity,
				})

				// cart string for PB order 
				total += (product.price*item.quantity)
				cartStr += `${product.name} | ${product.price} | ${item.quantity} | ${product.price*item.quantity} \n`

			}
		}

		if(total > 0)
		try {

			if(formData.get('create_account') ) {
				let username = generateUsername(body.name.split(' ').join('').toLowerCase())
				try {
					await locals.pb.collection('users').create({username, ...body})
					await locals.pb.collection('users').requestVerification(body.email)
				} catch (err) {
					console.log('Error: ', err)
					throw error(500, "500 server error")
				}
			} 

			if(user) {
				client = {
					name: user.name,
					email: user.email,
					phone: user.telephone,
					address: JSON.stringify(user.address),
					city: user.city,
					zip: user.postcode,
					country: user.country,
				}
			} else {
				client = {
					name: body.name,
					email: body.email,
					phone: body.telephone,
					address: JSON.stringify(body.address),
					city: body.city,
					zip: body.postcode,
					country: body.country,
				}
			}
			try {
				// add shipping price
				const result = await locals.pb.collection('options').getOne('bi3g03tppvmir2y');
				const shipping = parseInt(result.value);
				total += shipping

				// init Stripe SDK
				const stripe = new Stripe(SECRET_STRIPE_KEY);

        // customer data 
        const customerData = {
          address: {
            city: client.city,
            line1: client.address,
            postal_code: client.zip,
            country: client.country
          },
					shipping: {
						address: {
							city: client.city,
							line1: client.address,
							postal_code: client.zip,
							country: client.country
						},
						name: client.name
					},
					name: client.name,
					email: client.email,
					phone: client.phone
				}

				const customers = await stripe.customers.list({
  					email: client.email,
				});
        // if customer (by email) already exist we update the address details 
        // or else we create new customer
				if(customers?.data)
				{
          const customer = await stripe.customers.update(customers.data[0].id,customerData);
				} else {
          const customer = await stripe.customers.create(customerData);
        }

				session = await stripe.checkout.sessions.create({
					line_items: line_items,
					mode: 'payment',
					currency: 'GBP',
					customer: customers.data[0].id ?? null,
					success_url: PUBLIC_SUCCESS_URL,
					cancel_url: PUBLIC_CANCEL_URL,
					shipping_options: [
						{
							shipping_rate_data: {
								display_name: 'Standard Shipping',
								type: 'fixed_amount',
								fixed_amount: {
									amount: shipping * 100,
									currency: 'gbp',
								},
							}
						}
					],
					after_expiration: {
						recovery: {
							enabled: true,
						},
					},
					metadata: {
					  'sessionId': sessionId
					},
					payment_intent_data: {
					  metadata: {
					    'sessionId': sessionId
					  }
					},
					locale: 'en-GB'
				})

			} catch (err) {
				console.log('Stripe Session error: ', err)
				throw error(500, "500 server error")
			}

			try {

				// create order record
				const pb_order = {
					"sessionId": sessionId,
					"user": user ? user.id : "",
					"name": client.name,
					"email": client.email,
					"telephone": client.phone,
					"address": client.address,
					"city": client.city,
					"postcode": client.zip,
					"country": client.country,
					"status": "PENDING",
					"cart": cartStr,
					"total": total,
					"note": body.note
				};

				// if different shipping address add it
				if(body.shipping)
				pb_order.shipping = body.shipping

				const order_record = await locals.pb.collection('orders').create(pb_order)

				// create payment record
				const pb_payment = {
					"user": user ? user.id : "",
					"order": order_record.id,
					"sessionId": sessionId,
					"stripeSessionId": session.id,
					"amount": total,
					"status": "PENDING"
				};
				const payment = await locals.pb.collection('payments').create(pb_payment)
				const orderData = {
						"payment": payment.id
				}
				const orderPaymentLink = await locals.pb.collection('orders').update(order_record.id, orderData);

				cookies.set('orderId', order_record.id)

			} catch (err) {
				console.log('Pocketbase order and payment setup failed: ', err)
				throw error(500, "500 server error")
			}
			

		} catch (err) {
			console.log("Error: ", err)
			throw error(500, '500 error page')
		}

		throw redirect(303, session.url)
	}
}

export const load = (async ({locals, cookies }) => {
	const result = await locals.pb.collection('options').getOne('bi3g03tppvmir2y');
	const shipping = structuredClone(result).value;

	return {    
		shipping,
		user: structuredClone(locals.pb?.authStore?.model) ?? undefined
	}
}) satisfies PageServerLoad
