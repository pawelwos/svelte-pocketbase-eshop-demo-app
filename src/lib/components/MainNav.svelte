<script lang="ts">

	import { drawerStore } from '@skeletonlabs/skeleton';
	function drawerClose():void {
		drawerStore.close()
	}
</script>
<div class="p-4 lg:p-8">
	<h2 class="mb-4 flex justify-between">
		<span>eShop Demo App</span>
		<button type="button" on:click={drawerClose}>
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
				<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
			</svg>
		</button>
		
	</h2>
	<hr class="mb-4">
	<nav class="list-nav">
		<ul>
			<li><a href="/" on:click={drawerClose}>Home</a></li>
			<li><a href="/about" on:click={drawerClose}>About Us</a></li>
			<li><a href="/shop" on:click={drawerClose}>Shop</a></li>
			<li><a href="/contact" on:click={drawerClose}>Contact</a></li>
		</ul>
	</nav>
</div>