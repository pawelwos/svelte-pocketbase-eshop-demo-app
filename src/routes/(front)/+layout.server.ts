import type { PageServerLoad } from './$types';

export const load = ( ({ locals }) => {

	return {
		user: structuredClone(locals.pb.authStore.model)
	}
}) satisfies PageServerLoad;

