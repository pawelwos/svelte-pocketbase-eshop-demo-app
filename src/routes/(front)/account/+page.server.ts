import { error, redirect } from '@sveltejs/kit'
import Stripe from 'stripe';
import { SECRET_STRIPE_KEY } from '$env/static/private'

export const actions = {
	pay: async ({ request, locals, cookies }) => {

		const body = Object.fromEntries(await request.formData())

		// init Stripe SDK
		const stripe = new Stripe(SECRET_STRIPE_KEY);
		const session = await stripe.checkout.sessions.retrieve(
			body.stripeSessionId
		);
        if(session.url)
		throw redirect(303, session.url)
        else
        throw redirect(303, '/account')
	}
}

export const load = async ({ locals, params, cookies }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login')
	}
	const result = await locals.pb.collection('options').getOne('bi3g03tppvmir2y');
	const shipping = structuredClone(result);


	const records = await locals.pb.collection('orders').getList(1, 50, {
		filter: 'user = "' + locals.pb?.authStore?.model?.id + '"',
		sort: '-created',
		expand: 'payment'
	});

	return {
		orders: structuredClone(records),
		shipping
	}
}
