import { error, fail, redirect } from '@sveltejs/kit'
import { z } from "zod";
export const actions = {
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
	}
}