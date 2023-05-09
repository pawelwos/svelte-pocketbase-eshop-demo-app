import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import Cookies from 'js-cookie'
const defaultCart = browser ? Cookies.get('cart') ? JSON.parse(Cookies.get('cart')) : [] : [];

export const cart = writable(defaultCart);
export const showCart = writable(false);

cart.subscribe((value) => {
  if (browser) {
    Cookies.set('cart', JSON.stringify(value), { expires: 7 })
  }
});