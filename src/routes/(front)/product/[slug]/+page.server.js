import { serializeNonPOJOs } from '$lib/utils'

export const load = async ({locals, params }) => {
    let id = params.slug.split("-").pop()
    const result = await locals.pb.collection('products').getOne(id,{
        expand: 'categories,tags'
    });
    const obj = serializeNonPOJOs(result);

	return {
		product: obj,
	}
}