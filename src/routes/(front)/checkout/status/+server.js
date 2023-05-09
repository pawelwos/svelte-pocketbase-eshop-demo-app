import { error } from '@sveltejs/kit'
import { redirect } from '@sveltejs/kit';
import p24 from '$lib/p24'
import { serializeNonPOJOs } from '$lib/utils'


export const POST = async ({ request, locals, cookies }) => {
    const transaction = new p24()
    try {
        const req = await request.json()
        const sessionId = await req.sessionId
        transaction.setOrderId(req.orderId)
        transaction.setSessionId(sessionId)
        transaction.setTotal(req.amount)
        await transaction.setSignature()
        await transaction.verify()

        const payment = await locals.pb.collection('payments').getFirstListItem( `session_id = "${sessionId}"`, {})
        const paymentObj = serializeNonPOJOs(payment)

        const data = {
            "session_id": req.sessionId,
            "status": transaction.getVerification()
        };
        const record = await locals.pb.collection('payments').update(paymentObj.id, data);
        
        const orderData = {
            "payment": paymentObj.id,
            "sessionId": req.sessionId,
            "status": 'PAID'
        };
        const orderRecord = await locals.pb.collection('orders').update(paymentObj.order, orderData);


    } catch (err) {
        console.log('Error: ', err)
        throw error(500, "500 server error")
    }
    throw redirect(303, '/checkout/complete/'+transaction.getVerification());
};