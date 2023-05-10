<script>
  export let label
  export let name
  export let value = ""
  export let disabled
  export let placeholder
  export let error
</script>

<div>
  <label class="block text-sm font-bold label mt-4" for="">{label}
    <textarea class="textarea {error && 'input-error'}" rows="4" name={name} placeholder={placeholder} disabled={disabled}>{value}</textarea>
  </label>
  {#if error}
    <p class="variant-filled-error">{error}</p>
  {/if}
</div>