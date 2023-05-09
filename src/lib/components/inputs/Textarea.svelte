<script>
  export let label
  export let name
  export let value = ""
  export let disabled
  export let placeholder
  export let error
</script>

<p>
  <label class="block text-sm font-bold mb-2" for="">{label}</label>
  <textarea class="w-full {error && 'border-[red]'}" name={name} placeholder={placeholder} disabled={disabled}>{value}</textarea>
  {#if error}
    <p class="text-[red]">{error}</p>
  {/if}
</p>