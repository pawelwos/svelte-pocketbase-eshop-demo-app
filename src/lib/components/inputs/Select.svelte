<script lang="ts">
	interface options {
		value: string,
		name: string
	}

  export let label:string
  export let name:string
	export let options:Array<options>
  export let value:string = ""
  export let disabled:boolean
  export let error:object
</script>

<div>
  <label class="block text-sm font-bold label mt-4" for="">
		<span>{label}</span>
		<select name={name} class="select">
			{#each options as option}
			<option value="{option.value}">{option.name}</option>
			{/each}
		</select>
  </label>
  {#if error}
    <p class="variant-filled-error">{error}</p>
  {/if}
</div>