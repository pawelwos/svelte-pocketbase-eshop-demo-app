import { PUBLIC_PB_URL } from '$env/static/public'
import PocketBase from 'pocketbase'


/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    event.locals.pb = new PocketBase(PUBLIC_PB_URL);

    // load the store data from the request cookie string
    const ev = event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');
    try {
        // get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
        event.locals.pb.authStore.isValid && await event.locals.pb.collection('users').authRefresh();
        //console.log( event.locals.pb.authStore.isValid )
    } catch (_) {
        // clear the auth store on failed refresh
        event.locals.pb.authStore.clear();
    }

    const response = await resolve(event);

    // send back the default 'pb_auth' cookie to the client with the latest store state
    response.headers.append('set-cookie', event.locals.pb.authStore.exportToCookie({sameSite: 'Lax'}));
    
    return response;
}
