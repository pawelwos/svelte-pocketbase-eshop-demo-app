<script lang="ts">
    import { cart } from '$lib/store'
    import {enhance} from "$app/forms"
    import ProductImage from '$lib/components/ProductImage.svelte'
    import Price from '$lib/components/Price.svelte'
	  import RegisterForm from '$lib/components/forms/Register.svelte'
    import { loadStripe } from '@stripe/stripe-js'
    import { onMount } from 'svelte'

    import { PUBLIC_STRIPE_KEY } from '$env/static/public'
    import { Elements, PaymentElement, LinkAuthenticationElement, Address } from 'svelte-stripe'
    export let data
    export let form

    let elements
    let stripe = null

    onMount(async () => {
        stripe = await loadStripe(PUBLIC_STRIPE_KEY)
    })

    let createAccount = false
    const { shipping, clientSecret } = data
    $: total = parseInt(shipping.value) + $cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
</script>
<section class="checkout typography !max-w-none p-4">
    <form action="?/pay" method="POST" use:enhance>
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
                    <h4 class="text-2xl text-right"><Price price={parseInt(shipping.value)} /></h4>
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

            <div class="md:order-1">
                <h2 class="mb-4 font-bold text-primary text-2xl lg:text-3xl">Checkout</h2>
                {#if $cart.length > 0}
                    {#if data.user}
                    {#if stripe && clientSecret}
                        <Elements
                        {stripe}
                        {clientSecret}
                        theme="flat"
                        labels="floating"
                        variables={{ colorPrimary: '#7c4dff' }}
                        rules={{ '.Input': { border: 'solid 1px #0002' } }}
                        bind:elements
                        >
                        <LinkAuthenticationElement defaultValues={{email: data.user.email}} />
                        <PaymentElement />
                        <Address mode="billing" defaultValues={{
                            name: data.user.name,
                            address: {
                                line1: data.user.address,
                                city: data.user.city,
                                postal_code: data.user.postcode,
                                country: data.user.country ?? 'UK'
                            }
                        }} />
                        </Elements>
                    {:else}
                        Loading...
                    {/if}
                    <button type="submit" class="btn my-6 variant-filled-primary w-full">Place order</button>
                    {:else}
                    <p class="flex items-center">
                        <a href="/login">Login</a> <span class="px-2">if you already have an account.</span>
                    </p>
                    <p>... or buy as a guest.</p>
                    <div class="">
                        <div class="w-full pt-2">
                            {#if stripe && clientSecret}
                                <Elements
                                {stripe}
                                {clientSecret}
                                theme="flat"
                                labels="floating"
                                variables={{ colorPrimary: '#7c4dff' }}
                                rules={{ '.Input': { border: 'solid 1px #0002' } }}
                                bind:elements
                                >
                                <LinkAuthenticationElement />
                                <PaymentElement />
                                <Address mode="billing" />
                                </Elements>
                                <label class="flex items-center my-4" for="account"><input name="create_account" value="true" id="account" type="checkbox" bind:checked={createAccount}><span class="px-2">Create an account?</span></label>

                            {:else}
                                Loading...
                            {/if}

                            <button type="submit" class="btn my-6 variant-filled-primary w-full">Place order</button>
                        </div>
                    </div>
                    {/if}
                {:else}
                    No products yet
                {/if}
            </div>
        </div>
    </div>
    </form>
</section>