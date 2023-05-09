<script lang="ts">
	import { drawerStore } from '@skeletonlabs/skeleton';
	import type { DrawerSettings } from '@skeletonlabs/skeleton';
  import { toastStore } from '@skeletonlabs/skeleton';
  import type { ToastSettings } from '@skeletonlabs/skeleton';
  const CartDrawer:DrawerSettings = {
		id: 'Cart',
		position: 'right'
	}

  export let product:object

  import { cart } from '$lib/store';
  const addToCart = (product:object):void => {
    //console.log('add to cart')
    drawerStore.open(CartDrawer)
    const addedToCart:ToastSettings = {
      message: `Product ${product.name} added to the cart`
    }
    toastStore.trigger(addedToCart)
    for(let item of $cart) {
        if(item.id === product.id) {

          product.quantity += 1
          cart.set($cart)
          return;
        }
    }
    $cart = [...$cart, product]
  }
</script>
{#if product.stock > 0}
   <button on:click={addToCart({...product, quantity: 1})} class="btn variant-filled">Add to cart</button>
{:else}
  Out of stock
{/if}