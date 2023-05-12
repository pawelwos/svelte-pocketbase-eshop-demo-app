<script>
    import { cart } from '$lib/store';

    export let data;
    const {sessionId, orderId} = data

    $cart = []
</script>

<section class="simple p-4">
    <div class="container mx-auto">
        <h2 class="mt-2 text-3xl font-bold tracking-tight text-base-content mb-4">Order Complete!</h2>
        {#if orderId}
            <p>Your order id is: <strong>{orderId}</strong>.</p>
        {/if}
    </div>
</section>