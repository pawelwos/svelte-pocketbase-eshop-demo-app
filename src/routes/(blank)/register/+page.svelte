<script>
  import {enhance} from "$app/forms"
	import RegisterForm from '$components/forms/Register.svelte'
  export let form
</script>
<div class="container mx-auto p-4 flex flex-col items-center justify-center max-w-2xl">
	<h2 class="mt-2 text-center text-3xl font-bold tracking-tight text-base-content">
		Zarejestruj się
	</h2>
	<p class="text-center mt-1">
		Lub <a href="/login">zaloguj się</a> jeśli posiadasz już konto.
	</p>
	<form action="?/register" method="POST" class="w-full" use:enhance>
		<RegisterForm createAccount errors={form?.errors?.fieldErrors} />
    <button type="submit" class="button w-full">Zarejestruj</button>
	</form>
</div>