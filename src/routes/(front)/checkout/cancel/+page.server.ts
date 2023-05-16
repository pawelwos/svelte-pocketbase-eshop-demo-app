export const load = async ({locals, cookies }) => {
  const sessionId = cookies.get('sessionId')
  const orderId = cookies.get('orderId')
	try {
			// update payment and order
			const order = await locals.pb.collection('orders').getFirstListItem( `sessionId = "${sessionId}"`)
			const payment = await locals.pb.collection('payments').getFirstListItem( `sessionId = "${sessionId}"`)
      const data = {
					"sessionId": sessionId,
					"status": 'CANCELED'
			};
			const record = await locals.pb.collection('payments').update(payment.id, data);
			
			const orderData = {
					"payment": payment.id,
					"sessionId": sessionId,
					"status": 'CANCELED'
			};
			const orderRecord = await locals.pb.collection('orders').update(order.id, orderData);
    } catch (error) {
      
    }

	return {
		sessionId,
		orderId,
		user: locals.pb.authStore.model ?? undefined
	}
}