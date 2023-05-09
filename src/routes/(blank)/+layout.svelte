<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/all.css';
	// Most of your app wide CSS should be put in this file
	import '../../app.postcss';

</script>
<div class="container mx-auto max-w-3xl py-8">
  <h1 class="mb-8 text-center"><a href="/">eShop Demo App</a></h1>
  <slot />
  <div class="text-center my-8">
    <a href="/" class="btn variant-filled">Back to homepage</a>
  </div>
</div>