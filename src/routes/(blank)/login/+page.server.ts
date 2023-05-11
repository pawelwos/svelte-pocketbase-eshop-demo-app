import { error, fail, redirect } from '@sveltejs/kit'
import type { Actions } from './$types';
import eventsource from 'eventsource';
global.EventSource = eventsource

import { z } from "zod";
export const actions:Actions = {
	login: async ({request, locals}) => {
		const body = Object.fromEntries(await request.formData() )
    const loginSchema = z.object({
      email: z.string().email(),
      password: z.string().min(8).trim(),
    });
    try {
      loginSchema.parse(body)
    } catch (err) {
      return fail(400, { errors: err.flatten() });
    }
		try {
			await locals.pb.collection('users').authWithPassword(body.email, body.password)
			if(!locals.pb?.authStore?.model?.verified) {
				locals.pb.authStore.clear()
				return {
					notVerified: true
				}
			}
		} catch (err) {
			console.log("Error: ", err)
			//throw error(500, '500 error page')
			return {
				error: 'Login failed'
			}
		}
		throw redirect(303, '/')
	},
	google: async({request, locals}) => {
		try {
			const authData = await locals.pb?.collection('users').authWithOAuth2({ provider: 'google' });
		} catch (err) {
			console.log("Google login error: ", err)
			throw error(500, '500 error page')
		}
		throw redirect(303, '/')
	},
	facebook: async({request, locals}) => {
		try {
			const authData = await locals.pb?.collection('users').authWithOAuth2({ provider: 'facebook' });
		} catch (err) {
			console.log("Facebook login error: ", err)
			throw error(500, '500 error page')
		}
		throw redirect(303, '/')
	}
} satisfies Actions;

