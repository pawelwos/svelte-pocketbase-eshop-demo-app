<script>
    import ProductImage from '../../../components/ProductImage.svelte'
    import {serializeNonPOJOs, productLink} from "../../../lib/utils"
    import AddToCart from "../../../components/addToCart.svelte"
    export let data
    const {product, variations} = data
</script>
<div class="container mx-auto">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
    <ProductImage class="w-full h-auto" product={product} />
    <div class="">
      <h1 class="text-2xl lg:text-4xl text-primary font-bold mb-2">{product.name}</h1>
      <h3 class="text-c3 mb-4">
          {#each product.expand.tags as tag, i}
          {tag.name}{i < product.expand.tags ? ',' : ''}
          {/each}
      </h3>
      <div class="mb-8">{@html product.description}</div>
      {#if variations}
        {#each Object.entries(variations) as [name, val]}
          <div class="mb-4">
            <label for="{name.toLocaleLowerCase}">{name}:</label>
            <select class="w-full" name="{name.toLocaleLowerCase}" id="{name.toLocaleLowerCase}">
              <option value="">Please select...</option>
              {#each val as option}
                 <option value="{option.id}" data-price="{option.price}">{option.value}</option>
              {/each}
            </select>
          </div>
        {/each}
      {/if}
      <h4 class="text-2xl font-bold text-gray-500 mb-8">
        {#if variations}
          Please select variations above.
        {:else}
          {product.price}zł
        {/if}
      </h4>
      <AddToCart product={serializeNonPOJOs(product)} />
    </div>

  </div>
</div>
