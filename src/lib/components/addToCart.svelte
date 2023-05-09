<script>
  export let product

  import { cart, showCart } from '$lib/store';
  const addToCart = (product) => {
    //console.log('add to cart')
    showCart.set(true)
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
  Brak Produktu
{/if}