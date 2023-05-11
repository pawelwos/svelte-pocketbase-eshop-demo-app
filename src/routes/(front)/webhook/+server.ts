import { redirect } from '@sveltejs/kit'
import type { RequestHandler } from './$types';
import Stripe from 'stripe'
import { SECRET_STRIPE_KEY } from '$env/static/private'

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "whsec_498a46cb120d90a53c679d073c6005559d4575b742d61233a61e2312b73db059";
const stripe = new Stripe(SECRET_STRIPE_KEY);

export const POST = (async ({ locals, request }) => {
  const event = await request.json()
  console.log(event.type)
  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntentSucceeded = event.data.object;
      // Then define and call a function to handle the event payment_intent.succeeded
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  return new Response();

}) satisfies RequestHandler;