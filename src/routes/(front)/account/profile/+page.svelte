<script>
  import {enhance} from "$app/forms"
	import H1 from '$components/html/h1.svelte'
	import RegisterForm from '$components/forms/Register.svelte'
	import Input from '$components/inputs/Input.svelte'
	export let data 
	const {user} = data
	
</script>

<div class="profile p-4 py-16 md:flex">
	<div class="px-4">
		<H1>Twoje dane</H1>
		<form class="w-auto mx-auto block mb-16" action="?/update" method="post" use:enhance>
			<RegisterForm user={user} />
      <button type="submit" class="button w-full">Zaktualizuj</button>
		</form>
	</div>
	<div class="px-4">
		<H1>Zmień hasło</H1>
		<form action="?/passwordChange" method="post" use:enhance>
      <Input label="Aktualne Hasło" name="oldPassword" type="password" />
      <Input label="Nowe Hasło" name="password" type="password" />
      <Input label="Potwierdź nowe hasło" name="passwordConfirm" type="password" />
			<div class="w-full max-w-md pt-2">
				<button type="submit" class="button w-full">Zmień</button>
			</div>
		</form>
	</div>

</div>