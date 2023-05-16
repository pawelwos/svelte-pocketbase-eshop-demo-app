<script lang="ts">
    import { cart } from '$lib/store'
    import {enhance} from "$app/forms"
    import type { PageData, ActionData } from './$types';
    import ProductImage from '$lib/components/ProductImage.svelte'
    import Price from '$lib/components/Price.svelte'
    import RegisterForm from '$lib/components/forms/Register.svelte'
    import Accept from '$lib/components/inputs/Accept.svelte'
    export let data:PageData
    export let form:ActionData
    let submitting = false;
    let createAccount = false
    let altAddress = false
    const { shipping } = data
    $: total = parseInt(shipping) + $cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
</script>
<section class="checkout typography !max-w-none p-4">
    <form action="?/pay" method="POST" 	use:enhance={() => {
      submitting = true;
  
      return async ({ update }) => {
        await update();
        submitting = false;
      };
    }}>
    <div class="container mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 items-start gap-4 lg:gap-16">
            <div class="md:order-2 shadow-lg p-4 bg-gray-50">
                {#if $cart.length > 0}
                <h3 class="mb-4 font-bold text-primary text-2xl lg:text-3xl">Your order</h3>
                <div class="grid grid-cols-3 md:grid-cols-3 mb-4 items-center">
                    <div class="col-span-2 border-b border-gray-500">
                        Products:
                    </div>
                    <div class="border-b border-gray-500 text-right">Price</div>
                    {#each $cart as item,i }
                        {#if item.quantity > 0}
                        <div class="col-span-3 grid grid-cols-3 md:grid-cols-3 items-center p-2 { i % 2 === 0 ? '' : 'bg-gray-200'}">
                            <ProductImage class="w-16" product={item} />
                            <div>{item.name}</div>
                            <div class="text-right">{item.quantity} X <Price price={item.price * item.quantity} /></div>
                        </div>
                        {/if}
                    {/each}
                </div>
                <div class="grid grid-cols-3 md:grid-cols-3 mb-4 items-center py-4 border-t border-gray-500">

                    <div class="col-span-2">Shipping cost:</div>
                    <h4 class="text-2xl text-right"><Price price={parseInt(shipping)} /></h4>
                    <div class="col-span-2">Total:</div>
                    <h4 class="text-2xl text-right"><Price price={total} /></h4>
                </div>
                <div>
                    <textarea class="w-full" name="note" id="note" cols="30" rows="4" placeholder="Order note"></textarea>
                </div>
                {:else}
                     <p>Your cart is empty</p>
                {/if}
            </div>

            <div class="md:order-1 prose">
                <h2 class="mb-4 font-bold text-primary text-2xl lg:text-3xl">Checkout</h2>
                {#if $cart.length > 0}
                    {#if data.user}
                    <h2 class="mb-4 font-bold text-primary text-2xl lg:text-3xl">Shipping address:</h2>
                    <p>
                        {data.user.name}<br />
                        {@html data.user.address}<br />
                        {data.user.postcode} {data.user.city}<br />
                        email: {data.user.email}<br />
                        teelphone: {data.user.telephone}
                    </p>
                    <p><a href="/account/profile">Ship to different address?</a></p>
                    <p><label for="altAddress"><input id="altAddress" type="checkbox" bind:checked={altAddress}> Different shipping address?</label></p>
                    {#if altAddress}
                         <textarea class="textarea textarea-bordered w-full" name="shipping" id="" cols="30" rows="10" placeholder="Shipping address"></textarea>
                    {/if}
                    <button type="submit" class="btn variant-filled-primary w-full" disabled={submitting}>{submitting ? 'Processing...' : 'Place your order'}</button>
                    {:else}
                    <p class="flex items-center">
                        <a href="/login" class="pr-2">Login</a> if you have an account.
                    </p>
                    <h2 class="mb-4 font-bold text-primary text-2xl lg:text-3xl">Shipping address:</h2>
                    <div class="">
                        <RegisterForm user={{}} createAccount={createAccount} errors={form?.errors}/>
		                <div class="flex flex-wrap justify-center mt-8"><Accept name="accept" error={form?.errors?.accept} /></div>
                        <div class="w-full pt-2">
                            <label class="flex items-center mb-4" for="account"><input name="create_account" value="true" id="account" type="checkbox" bind:checked={createAccount}><span class="px-2">Create an account?</span></label>
                            <button type="submit" class="btn variant-filled-primary w-full" disabled={submitting}>{submitting ? 'Processing...' : 'Pay'}</button>
                        </div>
                    </div>
                    {/if}
                {:else}
                    Nothing to checkout yet
                {/if}
            </div>
            
        </div>
    </div>
    </form>
</section>