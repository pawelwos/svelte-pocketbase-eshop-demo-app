<script lang="ts">

	import { drawerStore } from '@skeletonlabs/skeleton';
	function drawerClose():void {
		drawerStore.close()
	}
	export let user
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
			<li><a href="/categories" on:click={drawerClose}>Shop</a></li>
			<li><a href="/contact" on:click={drawerClose}>Contact</a></li>
			<li><a href="/terms-and-conditions" on:click={drawerClose}>Terms & Conditions</a></li>
			{#if !user}
				 <li>
					 <a href="/register" class="flex btn w-48 variant-filled-primary">
						 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
							 <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
						 </svg>
						 <span>Register</span>
					 </a>
				 </li>
				 <li>
					 <a href="/login" class="flex btn w-48 variant-filled">
						 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
							 <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
						 </svg>
						 <span>Login</span>
					 </a>
				 </li>
			{:else}
			<li>
				<form action="/logout" method="POST">
					<button type="submit" class="flex w-48 btn variant-filled">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
							<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
						</svg>	
						<span>Logout</span>
					</button>
				</form>
			</li>
			{/if}
		</ul>
	</nav>
</div>