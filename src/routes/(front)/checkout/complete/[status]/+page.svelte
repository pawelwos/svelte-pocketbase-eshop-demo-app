<script>
	export let data 
	const {status, orderId} = data
</script>

<section class="simple p-4">
	<div class="container mx-auto">
			<h2 class="mt-2 text-3xl font-bold tracking-tight text-base-content mb-4">Dziękujemy! Zamówienie zostało opłacone</h2>
			{#if orderId}
					<p>Numer Twojego zamówienia: <strong>{orderId}</strong>.</p>
			{/if}
	</div>
</section>