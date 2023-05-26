import type { Actions } from './$types'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({locals, cookies }) => {
  const sessionId = cookies.get('sessionId')
  const orderId = cookies.get('orderId')
	return {
		sessionId,
		orderId,
		user: structuredClone(locals.pb.authStore.model) ?? undefined
	}
}
