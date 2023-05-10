<script>
  import { cart } from '../store';

	import { drawerStore } from '@skeletonlabs/skeleton';
  import ProductImage from '$lib/components/ProductImage.svelte'
  import Price from '$lib/components/Price.svelte';

  const minusItem = (product) => {
    for(let item of $cart) {
      if(item.id === product.id) {
        if(product.quantity > 1 ) {
            product.quantity -= 1
            $cart = $cart
        } else {
            $cart = $cart.filter((cartItem) => cartItem != product)
        }
        return;
      }
    }
  }

  const plusItem = (product) => {
    for(let item of $cart) {
        if(item.id === product.id) {
          product.quantity += 1
          $cart = $cart;
          return;
        }
    }
  }

  const closeCart = () => {
		drawerStore.close()
  }

  $: total = $cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

</script>
    <button on:click={()=>closeCart()} class="btn btn-circle btn-outline absolute top-4 right-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
      </button>
    <div class="p-4 w-full h-full">
        <h2 class="text-primary mt-16 text-2xl mb-4 font-bold">Your Cart</h2>
        <div class="overflow-x-auto mb-8">
            <table class="table w-full">
              <!-- head -->
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th class="text-right">Price</th>
                </tr>
              </thead>
              <tbody>
                {#if $cart.length > 0}
                {#each $cart as item, i }
                    {#if item.quantity > 0}
                    <tr>
                        <td class="{i % 2 === 0 ? 'bg-slate-200' : ''} flex items-center">
                            <ProductImage class="w-16 h-16 object-cover mr-4" product={item} /> {item.name}
                        </td>
                        <td class="{i % 2 === 0 ? 'bg-slate-200' : ''} text-center">
                            <span class="px-2 text-lg">{item.quantity}</span>
                            <button class="chip variant-filled-secondary" on:click={() => plusItem(item)}>+</button>
                            <button class="chip variant-filled-primary" on:click={() => minusItem(item)}>-</button>
                        </td>
                        <td class="{i % 2 === 0 ? 'bg-slate-200' : ''} text-right font-bold text-c3"><Price price={item.price * item.quantity} /></td>
                    </tr>
                    {/if}
                {/each}
                {:else}
                     <td colsspan="3">Your cart is empty</td>
                {/if}
              </tbody>
              <tfoot>
                <tr>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                    <td class="py-4 text-xl text-right">
                        <h4>Total: <Price price={total} /></h4>
                    </td>
                </tr>
              </tfoot>
            </table>
          </div>
        {#if $cart.length > 0}
        <div class="flex justify-between">
          <a href="/" class="btn variant-filled" on:click|preventDefault={()=>closeCart()}>Continue</a>
          <a href="/checkout" class="btn variant-filled-primary" on:click={()=>closeCart()}>Checkout</a>
        </div>
        {/if}
    </div>
<style>
	.cart-item {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
	}
	
	.total {
		text-align: right;
	}
	
	.cart-list {
		border: 2px solid;
		padding: 10px;
	}
</style>