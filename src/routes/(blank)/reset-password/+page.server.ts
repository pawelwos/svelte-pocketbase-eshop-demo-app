import { error, fail, redirect } from '@sveltejs/kit'
import { z } from "zod";
import { toastStore } from '@skeletonlabs/skeleton'
import type { ToastSettings } from '@skeletonlabs/skeleton'
import type { Actions } from './$types';

export const actions:Actions = {
	resetPassword: async ({ request, locals }) => {
		const body = Object.fromEntries(await request.formData());
    const loginSchema = z.object({
      email: z.string().email(),
    });
    try {
      loginSchema.parse(body)
    } catch (err) {
      return fail(400, { errors: err.flatten() });
    }

		try {
			await locals.pb.collection('users').requestPasswordReset(body.email);
			const t: ToastSettings = {
        message: 'Reset email sent',
        background: 'variant-filled-success'
      };
      toastStore.trigger(t);
		} catch (err) {
			console.log('Error: ', err);
      const t: ToastSettings = {
        message: 'Reset password errors',
        background: 'variant-filled-error'
      };
      toastStore.trigger(t);
		}

		throw redirect(303, '/')
	}
} satisfies Actions