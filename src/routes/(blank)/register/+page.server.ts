import { error, fail, redirect } from '@sveltejs/kit';

import { toastStore } from '@skeletonlabs/skeleton'
import type { ToastSettings } from '@skeletonlabs/skeleton'

import { z } from "zod"
import { registerUserSchema } from '$lib/schemas'
import { generateUsername, validateData } from '$lib/utils'


/** @type {import('./$types').Actions} */
export const actions = {
	register: async ({locals, request}) => {
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
    
    const username = generateUsername(formData.name.split(' ').join('')).toLowerCase()
    try {
			await locals.pb.collection('users').create({ username, ...formData });
			await locals.pb.collection('users').requestVerification(formData.email);
		} catch (err) {
			console.log('Error: ', err)
			throw error(500, "500 server error")
		}
		throw redirect(303, '/login')
	}
}