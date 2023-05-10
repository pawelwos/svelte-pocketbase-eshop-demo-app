import { error, redirect } from '@sveltejs/kit'


export const actions = {
	update: async ({request, locals}) => {
		if(!locals.user) {
			throw redirect(303, '/login')
		}
		const body = Object.fromEntries(await request.formData())
		try {
			const user = await locals.pb.collection('users').update(locals.user.id, {...body})
			if(body.email !== locals.user.email)
			await locals.pb.collection('users').requestVerification(body.email)
		} catch (err) {
			console.log('Error: ', err)
			throw error(500, "500 server error")
		}
		throw redirect(303, '/account/profile')
	},
	passwordChange: async ({request, locals}) => {
		if(!locals.user) {
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
	if(!locals.user) {
		throw redirect(303, '/login')
	}

	return {
		user: locals.user,
	}
}