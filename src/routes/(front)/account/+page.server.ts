import { error, redirect } from '@sveltejs/kit'

export const actions = {
	
}

export const load = async ({locals, params, cookies }) => {
	if(!locals.pb.authStore.isValid) {
		throw redirect(303, '/login')
	}
  //const result = await locals.pb.collection('options').getOne('wvo06cc5cbpk6zk');
	//const shipping = structuredClone(result);
	const shipping = 0

	const records = await locals.pb.collection('orders').getList(1, 50, {
			filter: 'user = "'+locals.pb?.authStore?.model?.id+'"',
			sort: '-created',
			expand: 'products'
	});
	return {
		orders: structuredClone(records),
    shipping
	}
}