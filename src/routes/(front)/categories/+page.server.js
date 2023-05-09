import { serializeNonPOJOs } from '$lib/utils'

export const load = async ({locals}) => {
	const result = await locals.pb.collection('categories').getList(1, 20, {
			sort: 'name'
	});
	return {
		categories: serializeNonPOJOs(result)
	}
}