<script>

  import CategoryImage from '../../components/CategoryImage.svelte'
  import {categoryLink} from "../../lib/utils"
  export let data
  const {categories} = data
  console.log(categories)
</script>

<section class="categories">
  <div class="container mx-auto">

    <h1 class="text-center text-primary font-bold text-2xl lg:text-4xl mb-6">Kategorie</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
      {#each categories.items as category}
        <div class="card w-auto bg-base-100 shadow-xl">
          <a href={categoryLink(category)} class="!no-underline">
              <figure>
              {#if category.cover}
              <CategoryImage class="h-64 w-full object-cover" category={category} />
              {:else}
              <div class="h-64 w-full bg-primary flex justify-center items-center text-white">Brak obrazka</div>
              {/if}
              </figure>
          </a>
          <div class="p-4">
              <h2 class="font-bold text-c3 text-lg mb-2">{category.name}</h2>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>