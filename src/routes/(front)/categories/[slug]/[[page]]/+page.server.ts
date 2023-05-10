export const load = async ({locals, params}) => {
  let id = params.slug.split("-").pop()
  const category = await locals.pb.collection('categories').getOne(id);
	const result = await locals.pb.collection('products').getList((params.page ? params.page : 1), 9, {
			filter: 'published = true && categories ~ "'+id+'"'
	});
	return {
		products: structuredClone(result),
    slug: params.slug,
    category: structuredClone(category)
	}
}