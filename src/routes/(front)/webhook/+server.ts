import { error,redirect } from '@sveltejs/kit'
import type { RequestHandler } from './$types';
import Stripe from 'stripe'
import { SECRET_STRIPE_KEY } from '$env/static/private'

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "whsec_498a46cb120d90a53c679d073c6005559d4575b742d61233a61e2312b73db059";
const stripe = new Stripe(SECRET_STRIPE_KEY);

export const POST = (async ({ locals, request }) => {

  const headers =  await request.headers
  const sig = headers.get('stripe-signature')
  const data = await request.text()

  let event;

  try {
    event = stripe.webhooks.constructEvent(data, sig, endpointSecret);
  }
  catch (err) {
    console.log("Error: ", err)
    throw error(500, 'Signature error')
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    // Retrieve the session. If you require line items in the response, you may include them by expanding line_items.
    const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
      event.data.object.id,
      {
        expand: ['line_items'],
      }
    );
    const lineItems = sessionWithLineItems.line_items;
    const sessionId = sessionWithLineItems.metadata.sessionId

    // Fulfill the purchase...
    console.log(lineItems.data)
    // update stock level
    for (const prod of lineItems.data) {
      console.log(prod.price)
      const record = await locals.pb.collection('products').getOne(prod.metadata.productId);
      try {
        const data = {
          'stock': record.stock - 1
        }
        const update = await locals.pb.collection('products').update(record.id, data);
      } catch (err) {
        console.log(`Update stock: ${record.id} error: `, err)
        throw error(500, '500 error page')
      }
    }
    try {
      const payment = await locals.pb.collection('payments').getFirstListItem( `session_id = "${sessionId}"`)

      const data = {
          "session_id": sessionId,
          "status": event.data.object.status
      };
      const record = await locals.pb.collection('payments').update(payment.id, data);
      
      const orderData = {
          "payment": payment.id,
          "sessionId": sessionId,
          "status": 'PAID'
      };
      const orderRecord = await locals.pb.collection('orders').update(payment.order.id, orderData);

    } catch (error) {
      console.log(`Payment update: ${record.id} error: `, err)
      throw error(500, '500 error page')
    }
    // update payment and order
  }
  return new Response();

}) satisfies RequestHandler;