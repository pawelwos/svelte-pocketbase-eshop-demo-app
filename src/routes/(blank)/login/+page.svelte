<script lang="ts">
  import {enhance} from "$app/forms"
  import type { PageData, ActionData } from './$types';
  import Input from "$lib/components/inputs/Input.svelte";
  import { page } from '$app/stores';
  import Cookies from 'js-cookie'
  export let form: ActionData
  export let data: PageData
  const {providers} = data
  const signin = async (provider) => {
    providers.authProviders.map(prov => {
        if(provider == prov.name)
        {
            // store provider's data on click for verification in the redirect page
            Cookies.set('provider', JSON.stringify(prov))
            console.log($page.url) 
            window.location.href = prov.authUrl+$page.url.origin+"/login/callback" 
        }
    })
  }
</script>
<div class="card p-8">
  <header class="header">
    <h2 class="mb-4">Login</h2>
    <hr class="mb-4">
    <p>
      or <a href="/register">register</a> if you don't have an account.
    </p>  
  </header>
  <form action="?/login" method="POST" class="w-full" use:enhance>
    <Input type="text" label="Email:" name="email" error={form?.errors?.fieldErrors.email} />
    <Input type="password" label="Password:" name="password" error={form?.errors?.fieldErrors.password} />
		<div class="w-full my-4">
			<a href="/reset-password">Forgot password?</a>
		</div>
	  {#if form?.error}
		<p class="variant-filled-primary">{form.error}</p>
		{/if}
			<button type="submit" class="btn variant-filled-primary w-full">Login</button> 
      <hr>
	  {#if form?.error}
		<p class="text-red">{form.error}</p>
		{/if}
	</form>
  <div class="flex flex-wrap justify-center items-center">
      <button on:click={() => signin('google')} type="button" class="btn btn-lg variant-ringed mb-4">
        <span>
          <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 186.69 190.5"><path fill="#4285f4" d="M95.25 77.932v36.888h51.262c-2.251 11.863-9.006 21.908-19.137 28.662l30.913 23.986c18.011-16.625 28.402-41.044 28.402-70.052 0-6.754-.606-13.249-1.732-19.483z"/><path fill="#34a853" d="m41.869 113.38-6.972 5.337-24.679 19.223c15.673 31.086 47.796 52.561 85.03 52.561 25.717 0 47.278-8.486 63.038-23.033l-30.913-23.986c-8.486 5.715-19.31 9.179-32.125 9.179-24.765 0-45.806-16.712-53.34-39.226z"/><path fill="#fbbc05" d="M10.218 52.561C3.724 65.376.001 79.837.001 95.25s3.723 29.874 10.217 42.689c0 .086 31.693-24.592 31.693-24.592-1.905-5.715-3.031-11.776-3.031-18.098s1.126-12.383 3.031-18.098z"/><path fill="#ea4335" d="M95.25 37.927c14.028 0 26.497 4.849 36.455 14.201l27.276-27.276C142.442 9.439 120.968 0 95.25 0 58.016 0 25.891 21.388 10.218 52.561L41.91 77.153c7.533-22.514 28.575-39.226 53.34-39.226z"/></svg>
        </span>
        <span>Continue with Google</span>
      </button>
      <button on:click={() => signin('facebook')} type="button" class="btn btn-lg variant-ringed mb-4">
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="url(#a)" class="w-6 h-6 b6ax4al1 m4pnbp5e somyomsx ahndzqod" viewBox="0 0 36 36"><defs><linearGradient id="a" x1="50%" x2="50%" y1="97.078%" y2="0%"><stop offset="0%" stop-color="#0062E0"/><stop offset="100%" stop-color="#19AFFF"/></linearGradient></defs><path fill="url(&quot;#a&quot;)" d="M15 35.8C6.5 34.3 0 26.9 0 18 0 8.1 8.1 0 18 0s18 8.1 18 18c0 8.9-6.5 16.3-15 17.8l-1-.8h-4l-1 .8z"/><path fill="#FFF" d="m25 23 .8-5H21v-3.5c0-1.4.5-2.5 2.7-2.5H26V7.4c-1.3-.2-2.7-.4-4-.4-4.1 0-7 2.5-7 7v4h-4.5v5H15v12.7c1 .2 2 .3 3 .3s2-.1 3-.3V23h4z" class="kbtg6tx2"/></svg>
        </span>
        <span>Continue with Facebook</span>
      </button>
  </div>
</div>
