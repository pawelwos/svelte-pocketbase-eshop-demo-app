import { serializeNonPOJOs } from '$lib/utils'

export const load = async ({locals, params}) => {

	const result = await locals.pb.collection('products').getList((params.page ? params.page : 1), 9, {
			filter: 'published = true'
	});
	return {
		products: serializeNonPOJOs(result)
	}
}