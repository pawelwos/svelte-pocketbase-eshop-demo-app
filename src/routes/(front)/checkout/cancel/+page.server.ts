export const load = async ({locals, cookies }) => {
  const sessionId = cookies.get('sessionId')
  const orderId = cookies.get('orderId')
	return {
		sessionId,
		orderId,
		user: locals.pb.authStore.model ?? undefined
	}
}