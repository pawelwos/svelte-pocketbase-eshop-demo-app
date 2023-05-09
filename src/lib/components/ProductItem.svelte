<script lang="ts">
  import AddToCart from "$lib/components/addToCart.svelte"
  import {productLink} from "$lib/utils"
  import ProductImage from '$lib/components/ProductImage.svelte'
  export let product
</script>

<div class="card flex flex-col w-auto bg-base-100 shadow-xl">
    <a href={productLink(product.name, product.id)}>
        <figure class="bg-white">
        <ProductImage class="h-64 w-full object-contain" product={product} />
        </figure>
    </a>
    <div class="p-4 flex flex-col flex-grow">
        <div class="mb-4 flex flex-col flex-grow">
					<h2>{product.name}</h2>
				</div>
        <div class="flex justify-between items-center">
        <AddToCart product={product} />
        <h3 class="font-bold text-primary text-lg lg:text-2xl">&pound;{product.price}</h3>
        </div>
    </div>
</div>