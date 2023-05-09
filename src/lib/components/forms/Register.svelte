<script>
  import Input from '$components/inputs/Input.svelte'
  import Textarea from '$components/inputs/Textarea.svelte';
	export let user
  export let createAccount
  export let errors
</script>

<Input type="text" label="Imię i nazwisko" error={errors?.name} name="name" value={user?.name} />
<Input type="email" label="Email" error={errors?.email} name="email" value={user?.email} />
{#if createAccount}
<Input type="password" label="Hasło" error={errors?.password} name="password" />
<Input type="password" label="Potwierdź hasło" error={errors?.passwordConfirm} name="passwordConfirm" />
{/if}
<Input type="text" label="Telefon" error={errors?.telephone} name="telephone"  value={user?.telephone} />
<Textarea label="Adres" error={errors?.address} name="address" value={user?.address} />
<Input type="text" label="Kod pocztowy" error={errors?.postcode} name="postcode"  value={user?.postcode} />
<Input type="text" label="Miasto" error={errors?.city} name="city"  value={user?.city} />