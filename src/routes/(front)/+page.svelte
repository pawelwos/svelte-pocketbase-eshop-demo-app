<script lang="ts">
	import type { PageData } from './$types';
	import ProductItem from '$lib/components/ProductItem.svelte'
	export let data: PageData;
	const {results} = data
</script>
<div class="py-8">
	<h2 class="mb-4">Latest Products</h2>
	<hr>
</div>
{#if results.items}
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-10">
		{#each results.items as product}
			<ProductItem product={product} />
		{/each}
	</div>
{:else}
	 <div class="card p-4">
		<p>No products yet</p>
	</div>
{/if}



