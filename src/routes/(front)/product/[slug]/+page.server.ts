
export const load = async ({locals, params }) => {
    let id = params.slug.split("-").pop()
    const result = await locals.pb.collection('products').getOne(id,{
        expand: 'categories,tags'
    });

	return {
		product: structuredClone(result),
	}
}