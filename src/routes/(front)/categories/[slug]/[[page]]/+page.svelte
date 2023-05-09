<script>
	import { categoryLink } from "$lib/utils";
    import ProductItem from "../../../../components/ProductItem.svelte";
    export let data
</script>
<section class="products">
    <div class="container mx-auto p-4">
      <h1 class="text-center text-primary font-bold text-2xl lg:text-4xl mb-6">Kategoria {data.category.name}</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
        {#each data.products.items as product}
          <ProductItem key={product.id} product={product} />
        {/each}
      </div>
      <div class="paginatin flex justify-center py-8">
        {#if data.products.page > 1}
          <a class="button" href="/categories/{data.slug}/{data.products.page-1}">Prev</a>
        {/if}
        {#if data.products.page < data.products.totalPages}
          <a class="button" href="/categories/{data.slug}/{data.products.page+1}">Next</a>
        {/if}
      </div>
    </div>
  </section>
