export const load = async ({locals, cookies, params }) => {
  const sessionId = cookies.get('sessionId')
  const orderId = cookies.get('orderId')
	return {
		sessionId,
		orderId,
		status: params.status,
		user: locals.user ? locals.user : undefined
	}
}