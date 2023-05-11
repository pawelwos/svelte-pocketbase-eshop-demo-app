<script lang="ts">
  import {enhance} from "$app/forms"
	import type { PageData, ActionData } from './$types';
  import Input from "$lib/components/inputs/Input.svelte";
  export let form: ActionData;
</script>

<div class="card p-8">
  <header class="header">
    <h2 class="mb-4">Password reset</h2>
    <hr class="mb-4">
    <p>
      Will send you a reset password link via email
    </p>  
  </header>
	<form
	action="?/resetPassword"
	method="POST"
	class="w-full"
	use:enhance
>
	<Input type="text" label="Email:" name="email" error={form?.errors?.fieldErrors.email} />
	<button type="submit" class="btn variant-filled-primary w-full my-6">Reset</button>
</form>
</div>