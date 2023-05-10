<script lang="ts">
    import ProductImage from '$lib/components/ProductImage.svelte'
    import AddToCart from "$lib/components/addToCart.svelte"
    import Price from "$lib/components/Price.svelte"
    export let data
    const {product, variations} = data
</script>
<div class="container mx-auto my-8">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
    <ProductImage class="w-full h-auto" product={product} />
    <div class="prose">
      <h1 class="text-2xl lg:text-4xl text-primary font-bold mb-2">{product.name}</h1>
      <h3 class="text-c3 mb-4">
          {#each product.expand.tags as tag, i}
          {tag.name}{i < product.expand.tags ? ',' : ''}
          {/each}
      </h3>
      <div class="mb-8">{@html product.description}</div>
      <h4 class="text-2xl font-bold text-gray-500 mb-8">
        <Price price={product.price} />
      </h4>
      <AddToCart product={structuredClone(product)} />
    </div>

  </div>
</div>
