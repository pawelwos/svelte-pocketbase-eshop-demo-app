import type { PageServerLoad } from './$types';

export const load = (async ({locals}) => {
	const result = await locals.pb.collection('categories').getList(1, 20, {
		sort: 'name',
		'$cancelKey': "mainCats"
});
return {
	categories: structuredClone(result)
}
}) satisfies PageServerLoad;