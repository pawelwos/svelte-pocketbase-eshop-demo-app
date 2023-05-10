<script>
  export let type
  export let label
  export let name
  export let value = ""
  export let disabled
  export let placeholder
  export let error
</script>

<div>
  <label class="block text-sm font-bold label mt-4" for="">{label}
    <input class="input w-full {error && 'input-error'}" type={type} value={value} name={name} placeholder={placeholder} disabled={disabled} />
  </label>
  {#if error}
    <p class="variant-filled-error">{error}</p>
  {/if}
</div>