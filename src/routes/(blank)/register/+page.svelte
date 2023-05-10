<script>
  import {enhance} from "$app/forms"
	import RegisterForm from '$lib/components/forms/Register.svelte'
	import Accept from '$lib/components/inputs/Accept.svelte'
  export let form
</script>

<div class="card p-8">
	<header class="header">
		<h2 class="mb-4">Register</h2>
    <hr class="mb-4">
    <p>
      or <a href="/login">login</a> if you already have an account.
    </p>  
	</header>
	<form action="?/register" method="POST" class="w-full" use:enhance>
		<RegisterForm user={{}} createAccount errors={form?.errors} />
		<div class="flex flex-wrap justify-center mt-8"><Accept name="accept" error={form?.errors.accept} /></div>
    <button type="submit" class="btn variant-filled-primary w-full mt-6">Register</button>
	</form>
</div>