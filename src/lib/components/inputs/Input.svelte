<script>
  export let type
  export let label
  export let name
  export let value = ""
  export let disabled
  export let placeholder
  export let error
</script>

<p>
  <label class="block text-sm font-bold mb-2 label  " for="">{label}
    <input class="input w-full {error && 'input-error'}" type={type} value={value} name={name} placeholder={placeholder} disabled={disabled} />
  </label>
  {#if error}
    <p class="text-[red]">{error}</p>
  {/if}
</p>