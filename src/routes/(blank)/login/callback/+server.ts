import { redirect } from '@sveltejs/kit';
import type { RequestEvent, RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals, url, cookies, }: RequestEvent) => {
    const state = url.searchParams.get('state')
    const code = url.searchParams.get('code') 
    
    // load the previously stored provider's data

    const provider = JSON.parse(cookies.get('provider'))
    
    if (!provider) {
        console.log('Provider not found');
        throw redirect(303, '/login');
    }

    if (provider.state  !== state) {
        console.log('state does not match expected', provider.state, state);
        throw redirect(303, '/login');
    }
    
    try {
        // authenticate
       const oauth = await locals.pb.collection('users').authWithOAuth2Code(
            provider.name,
            code,
            provider.codeVerifier,
            //url.origin+"/login/callback",
            "https://shop.pawelwos.com/login/callback",
            // pass optional user create data
            {
                emailVisibility: false,
            }
        )
    } catch {
        console.log('oAuth Login error')
        throw redirect(303, '/login')
    }

    throw redirect(303, '/');
};

