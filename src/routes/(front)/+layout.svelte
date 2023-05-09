<script lang='ts'>
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/all.css';
	// Most of your app wide CSS should be put in this file
	import '../../app.postcss';

	import { AppShell } from '@skeletonlabs/skeleton';
	import { AppBar } from '@skeletonlabs/skeleton';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { LightSwitch } from '@skeletonlabs/skeleton';

	import { Drawer, drawerStore } from '@skeletonlabs/skeleton';
	import type { DrawerSettings } from '@skeletonlabs/skeleton';

  import { Toast } from '@skeletonlabs/skeleton';
  import { Modal, modalStore } from '@skeletonlabs/skeleton';
  import type { ModalSettings, ModalComponent } from '@skeletonlabs/skeleton';

	import MainNav from '$lib/components/MainNav.svelte'
	import Cart from '$lib/components/Cart.svelte'
	import type { PageData } from './$types';

	const MainNavDrawer:DrawerSettings = {
		id: 'MainNav',
		position: 'left'
	}

	const CartDrawer:DrawerSettings = {
		id: 'Cart',
		position: 'right'
	}

	function drawerOpen(): void {
		drawerStore.open(MainNavDrawer)
	}

	function cartOpen(): void {
		drawerStore.open(CartDrawer)
	}


  export let data:PageData
  const {user} = data
</script>
<Toast />
<Modal />
<Drawer>
	{#if $drawerStore.id === 'Cart'}
  <Cart />
	{:else}
		<MainNav />
	{/if}
</Drawer>
<AppShell slotSidebarLeft="w-0 md:w-52 bg-black/50">
	<svelte:fragment slot="header">
		<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
			<svelte:fragment slot="lead">
				<button on:click={drawerOpen} type="button" class="flex items-center">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-3">
						<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
					</svg>					
					<span class="hidden md:block">eShop Demo App</span>
				</button>
			</svelte:fragment>
			
			<svelte:fragment slot="trail">
				<LightSwitch />
        {#if user}
				  <Avatar initials="JD" width="w-10" background="bg-primary-500" />
        {:else}
				<a href="/register" class="hidden lg:flex btn variant-filled-primary">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
						<path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
					</svg>
					<span>Register</span>
				</a>
				<a href="/login" class="hidden lg:flex btn variant-filled">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
						<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
					</svg>
					<span>Login</span>
				</a>
        {/if}
				<button type="button" on:click={cartOpen}>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
						<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
					</svg>					
				</button>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<div class="container mx-auto p-4">
		<slot />
	</div>
	<svelte:fragment slot="footer">
		<div class="container mx-auto text-center p-4">
			<p>&copy;{new Date().getFullYear()} eShop Demo App using <a href="https://kit.svelte.dev/" target="_blank">Sveltekit</a>, <a href="https://www.skeleton.dev/" target="_blank">Skeleton UI</a>  and <a href="https://pocketbase.io/" target="_blank">PocketBase</a></p>
		</div>
	</svelte:fragment>
</AppShell>