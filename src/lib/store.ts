import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import Cookies from 'js-cookie'
const defaultCart:object = browser ? Cookies.get('cart') ? JSON.parse(Cookies.get('cart')) : [] : [];

export const cart = writable(defaultCart);

cart.subscribe((value) => {
  if (browser) {
    Cookies.set('cart', JSON.stringify(value), { expires: 7 })
  }
});