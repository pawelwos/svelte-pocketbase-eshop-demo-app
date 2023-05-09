import type { PageServerLoad } from './$types';

export const load = ( async({ locals }) => {
	const results = await locals.pb.collection('products').getList(1, 3, {
			filter: 'published = true'
	});
	return {
		results: structuredClone(results)
	}
}) satisfies PageServerLoad;

