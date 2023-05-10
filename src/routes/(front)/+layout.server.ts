import type { LayoutServerLoad } from './$types';

export const load = ( async({ locals }) => {
	const result = await locals.pb.collection('categories').getList(1, 20, {
			sort: 'name'
	})

	return {
		user: structuredClone(locals.pb.authStore.model),
		categories: structuredClone(result)
	}
}) satisfies LayoutServerLoad;

