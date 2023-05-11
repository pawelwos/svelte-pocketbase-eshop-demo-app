<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/all.css';
	// Most of your app wide CSS should be put in this file
	import '../../app.postcss';
	import { AppShell } from '@skeletonlabs/skeleton';
	import { Toast } from '@skeletonlabs/skeleton';

</script>
<Toast />
<AppShell>
	<div class="container typography mx-auto max-w-3xl py-8">
		<h1 class="text-center"><a href="/" class="no-underline">eShop Demo App</a></h1>
		<slot />
	</div>
</AppShell>