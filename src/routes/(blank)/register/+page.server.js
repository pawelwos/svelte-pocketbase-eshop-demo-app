import { error, fail, redirect } from '@sveltejs/kit'
import { generateUsername, slugify } from "$lib/utils"

import { z } from "zod";

const stringMessages = {
  'required_error': 'Pole wymagane',
  'invalid_type_error': 'Wymagany ciąg znaków',
  'message': 'Pole wymagane'
}

const registrSchema = z.object({
  name: z.string(stringMessages).min(1, stringMessages).trim(),
  email: z.string(stringMessages).email(stringMessages),
  password: z.string(stringMessages).min(8, {message: 'Hasło musi mieć conajmniej 8 znaków'}).trim(),
  passwordConfirm: z.string(stringMessages).min(8, {message: 'Hasło musi mieć min 8 znaków'}).trim(),
  telephone: z.string(stringMessages).min(1, stringMessages).trim(),
  address: z.string(stringMessages).min(1,stringMessages).trim(),
  postcode: z.string(stringMessages).min(5, {message: 'Kod pocztowy xx-xxx'}).trim(),
  city: z.string(stringMessages).min(1, stringMessages).trim(),
  country: z.string(stringMessages).min(1, stringMessages).trim(),
});

export const actions = {
	register: async ({locals, request}) => {
		const body = Object.fromEntries(await request.formData())
    try {
      registrSchema.parse(body)
    } catch (err) {
      return fail(400, { errors: err.flatten() });
    }
    
		let username = generateUsername(slugify(body.name.split(' ').join('').toLowerCase()))
		try {
			const user = await locals.pb.collection('users').create({'username': username, ...body})
			const verification = await locals.pb.collection('users').requestVerification(body.email)
		} catch (err) {
			console.log('Error: ', err)
			throw error(500, "500 server error")
		}
		throw redirect(303, '/login')
	}
}