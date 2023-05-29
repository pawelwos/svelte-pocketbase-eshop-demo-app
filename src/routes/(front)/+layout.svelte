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

	import { popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
	const popupAvatar: PopupSettings = {
		event: 'click',
		target: 'popupAvatar',
		placement: 'bottom'
	};

	import MainNav from '$lib/components/MainNav.svelte'
	import Cart from '$lib/components/Cart.svelte'
	import type { LayoutData } from './$types';
  import {categoryLink} from "$lib/utils"


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

	function drawerClose(): void {
		drawerStore.close()
	}

	function cartOpen(): void {
		drawerStore.open(CartDrawer)
	}


  export let data:LayoutData
  const {user, categories} = data
</script>
<Toast />
<Modal />
<Drawer>
	{#if $drawerStore.id === 'Cart'}
  <Cart />
	{:else}
		<MainNav user={user} />
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
				<div class="mx-2">
					<LightSwitch />
				</div>
        {#if user}
					<button class="block" use:popup={popupAvatar}>
						<Avatar initials={user.name?.split(' ')[0]?.slice(0,1)+user.name?.split(' ')[1]?.slice(0,1)} width="w-10" background="bg-primary-500" />
					</button>
					<div class="card w-48 shadow-xl py-2" data-popup="popupAvatar">
						<ul class="list text-center">
							<li><a href="/account" class="btn mx-auto">Account</a></li>
							<li>
								<form action="/logout" class="w-full" method="POST">
									<button type="submit" class="flex w-auto mx-auto btn variant-filled">
										<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
											<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
										</svg>	
										<span>Logout</span>
									</button>
								</form>
							</li>
						</ul>
						<div class="arrow bg-surface-100-800-token" />
					</div>
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
	<footer class="bg-white dark:bg-slate-800 mt-16 p-4">
		<div class="container mx-auto grid md:grid-cols-2 lg:grid-cols-4 py-8">
			<div class="typography">
				<h3>eShop Demo App</h3>
				<p class="flex">Source code: <a href="https://github.com/pawelwos/svelte-pocketbase-eshop-demo-app">
                <svg class="ml-4"  width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" fill="#24292f"/></svg>
                </a></p>
			</div>
			<div class="typography">
				<h3>Categories</h3>
				<ul>
					{#each categories.items as category}
						<li><a href={categoryLink(category.name, category.id)}>{category.name}</a></li>
					{/each}
				</ul>
			</div>
			<div class="typography">
				<h3>Navigation:</h3>
				<ul>
					<li><a href="/" on:click={drawerClose}>Home</a></li>
					<li><a href="/about" on:click={drawerClose}>About Us</a></li>
					<li><a href="/categories" on:click={drawerClose}>Shop</a></li>
					<li><a href="/contact" on:click={drawerClose}>Contact</a></li>
					<li><a href="/terms-and-conditions" on:click={drawerClose}>Terms & Conditions</a></li>
				</ul>
			</div>
			<div class="typography">
				<h3>Contact:</h3>
					<ul>
						<li><strong>Email:</strong> <a href="mailto:info@example.com">info@example.com</a><br /></li>
						<li><strong>Telefon:</strong> +44 02081 123 123</li>
					</ul>
			</div>
		</div>
		<div class="container mx-auto text-center p-4 mt-8">
			<hr class="mb-3">
			<p>&copy;{new Date().getFullYear()} eShop Demo App using <a href="https://kit.svelte.dev/" target="_blank">Sveltekit</a>, <a href="https://www.skeleton.dev/" target="_blank">Skeleton UI</a>  and <a href="https://pocketbase.io/" target="_blank">PocketBase</a></p>
		</div>
	</footer>
</AppShell>

<style lang="postcss">
	footer a {
		@apply !no-underline
	}
</style>
