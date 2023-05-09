<script>
  import {enhance} from "$app/forms"
  import Input from "$lib/components/inputs/Input.svelte";
	export let form;
</script>
<div class="card p-8">
  <header class="header py-4">
    <h2 class="mb-4">Login</h2>
    <hr class="mb-4">
    <p>
      or <a href="/register">register</a> if you don't have an account.
    </p>  
  </header>
  <form action="?/login" method="POST" class="w-full" use:enhance>
    <Input type="text" label="Email:" name="email" error={form?.errors?.fieldErrors.email} />
    <Input type="password" label="Password:" name="password" error={form?.errors?.fieldErrors.password} />
		<div class="w-full mb-4">
			<a href="/reset-password">Forgot password?</a>
		</div>
			<button type="submit" class="btn variant-filled-primary w-full">Login</button>  
	</form>
</div>
