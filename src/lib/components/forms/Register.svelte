<script lang="ts">
  import Input from '$lib/components/inputs/Input.svelte'
  import Textarea from '$lib/components/inputs/Textarea.svelte';
  import Select from '$lib/components/inputs/Select.svelte'
	export let user:object
  export let createAccount:Boolean
  export let errors:object
</script>

<div class="grid md:grid-cols-2 gap-x-8">
<Input type="text" label="Name" error={errors?.name} name="name" value={user?.name} />
<Input type="email" label="Email" error={errors?.email} name="email" value={user?.email} />
{#if createAccount}
<Input type="password" label="Password" error={errors?.password} name="password" />
<Input type="password" label="Confirm Password" error={errors?.passwordConfirm} name="passwordConfirm" />
{/if}
<div class="md:order-2">
  <Textarea class="md:h-64" label="Address" error={errors?.address} name="address" value={user?.address} />
  <Select label="Country" options={[{name: "United Kingdom", value: "UK"}]} error={errors?.country} name="country"  value={user?.country} />
</div>
<div class="grid md:order-1">
  <Input type="text" label="Telephone" error={errors?.telephone} name="telephone"  value={user?.telephone} />
  <Input type="text" label="City" error={errors?.city} name="city"  value={user?.city} />
  <Input type="text" label="Postcode" error={errors?.postcode} name="postcode"  value={user?.postcode} />
</div>
</div>