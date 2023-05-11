<script>
  import {enhance} from "$app/forms"
	import RegisterForm from '$lib/components/forms/Register.svelte'
	import Input from '$lib/components/inputs/Input.svelte'
	export let data 
	const {user} = data
	
</script>

<div class="profile typography !max-w-none p-4 py-16 md:flex">
	<div class="px-4">
		<h2>Your profile</h2>
		<form class="w-auto mx-auto block mb-16" action="?/update" method="post" use:enhance>
			<RegisterForm user={user} />
      <button type="submit" class="btn variant-filled-primary w-full my-6">Update</button>
		</form>
	</div>
	<div class="px-4">
		<h2>Change your password</h2>
		<form action="?/passwordChange" method="post" use:enhance>
      <Input label="Aktualne Hasło" name="oldPassword" type="password" />
      <Input label="Nowe Hasło" name="password" type="password" />
      <Input label="Potwierdź nowe hasło" name="passwordConfirm" type="password" />
			<div class="w-full max-w-md my-6">
				<button type="submit" class="btn variant-filled-secondary w-full">Update</button>
			</div>
		</form>
	</div>

</div>