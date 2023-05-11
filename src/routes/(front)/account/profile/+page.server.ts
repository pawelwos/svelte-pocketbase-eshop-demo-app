import { error, redirect } from '@sveltejs/kit'


export const actions = {
	update: async ({request, locals}) => {
		if(!locals.pb.authStore.isValid) {
			throw redirect(303, '/login')
		}
		const body = Object.fromEntries(await request.formData())
		try {
			const user = await locals.pb.collection('users').update(locals.pb?.authStore?.model?.id, {...body})
			if(body.email !== locals.pb?.authStore?.model?.email)
			await locals.pb.collection('users').requestVerification(body.email)
		} catch (err) {
			console.log('Error: ', err)
			throw error(500, "500 server error")
		}
		throw redirect(303, '/account/profile')
	},
	passwordChange: async ({request, locals}) => {
		if(!locals.pb.authStore.isValid) {
			throw redirect(303, '/login')
		}
		const body = Object.fromEntries(await request.formData())

		try {
			const user = await locals.pb.collection('users').update(locals.user.id, {...body})
		} catch (err) {
			console.log('Error: ', err)
			throw error(500, "500 server error")
		}
		throw redirect(303, '/account/profile')
	}
}

export const load = async ({locals, params, cookies }) => {
	if(!locals.pb.authStore.isValid) {
		throw redirect(303, '/login')
	}

	return {
		user: structuredClone(locals.pb?.authStore?.model),
	}
}