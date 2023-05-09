<script>
    import { cart } from '../../store';
    import {enhance} from "$app/forms";
    import ProductImage from '$components/ProductImage.svelte'
	  import RegisterForm from '$components/forms/Register.svelte'
    export let data
    export let form
    let altAddress = false

    let createAccount = false
    const { shipping } = data
    $: total = parseInt(shipping.value) + $cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
</script>
<section class="checkout p-4">
    <form action="?/pay" method="POST" use:enhance>
    <div class="container mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 items-start gap-4 lg:gap-16">
            <div class="md:order-2 shadow-lg p-4 bg-gray-50">
                {#if $cart.length > 0}
                <h3 class="mb-4 font-bold text-primary text-2xl lg:text-3xl">Twoje zamówienie</h3>
                <div class="grid grid-cols-3 md:grid-cols-3 mb-4 items-center">
                    <div class="col-span-2 border-b border-gray-500">
                        Produkt:
                    </div>
                    <div class="border-b border-gray-500 text-right">Cena</div>
                    {#each $cart as item,i }
                        {#if item.quantity > 0}
                        <div class="col-span-3 grid grid-cols-3 md:grid-cols-3 items-center p-2 { i % 2 === 0 ? '' : 'bg-gray-200'}">
                            <ProductImage class="w-16" product={item} />
                            <div>{item.name}</div>
                            <div class="text-right">{item.quantity} X {item.price * item.quantity}zł</div>
                        </div>
                        {/if}
                    {/each}
                </div>
                <div class="grid grid-cols-3 md:grid-cols-3 mb-4 items-center py-4 border-t border-gray-500">

                    <div class="col-span-2">Dostawa:</div>
                    <h4 class="text-2xl text-right">{parseInt(shipping.value)}zł</h4>
                    <div class="col-span-2">Razem:</div>
                    <h4 class="text-2xl text-right">{total}zł</h4>
                </div>
                <div>
                    <textarea class="w-full" name="note" id="note" cols="30" rows="4" placeholder="Notatka do sprzedawcy"></textarea>
                </div>
                {:else}
                     <p>Twój koszyk jest pusty</p>
                {/if}
            </div>

            <div class="md:order-1">
                <h2 class="mb-4 font-bold text-primary text-2xl lg:text-3xl">Płatność</h2>
                {#if $cart.length > 0}
                    {#if data.user}
                    <h2 class="mb-4 font-bold text-primary text-2xl lg:text-3xl">Dane odbiorcy przesyłki:</h2>
                    <p>
                        {data.user.name}<br />
                        {@html data.user.address}<br />
                        {data.user.postcode} {data.user.city}<br />
                        email: {data.user.email}<br />
                        tel: {data.user.telephone}
                    </p>
                    <p><a href="/account/profile">Zmień swój adres</a></p>
                    <p><label for="altAddress"><input id="altAddress" type="checkbox" bind:checked={altAddress}> Inny adres doręczenia?</label></p>
                    {#if altAddress}
                         <textarea class="textarea textarea-bordered w-full" name="shipping" id="" cols="30" rows="10" placeholder="Dane do wysyłki"></textarea>
                    {/if}
                    <button type="submit" class="button w-full">Złóż zamówienie</button>
                    {:else}
                    <p class="flex items-center">
                        <a href="/login" class="button">Zaloguj się</a> <span class="px-2">jeśli posiadasz już konto.</span>
                    </p>
                    <hr>
                    <p>lub kupuj jako gość.</p>
                    <h2 class="mb-4 font-bold text-primary text-2xl lg:text-3xl">Dane odbiorcy przesyłki:</h2>
                    <div class="">
                        <RegisterForm createAccount={createAccount} errors={form?.errors?.fieldErrors}/>
                        <div class="w-full pt-2">
                            <label class="flex items-center mb-4" for="account"><input name="create_account" value="true" id="account" type="checkbox" bind:checked={createAccount}><span class="px-2">Utwórz konto?</span></label>
                            <button type="submit" class="button w-full">Zapłać</button>
                        </div>
                    </div>
                    {/if}
                {:else}
                    Brak produktów
                {/if}
            </div>
        </div>
    </div>
    </form>
</section>