<script lang="ts">
	import { SlideToggle } from '@skeletonlabs/skeleton';

	export let name:string
	export let value: boolean = false;
  export let error: string
</script>
<div class="mr-4">
	<input type="hidden" name={name} value={value}>
	<SlideToggle name={name} bind:checked={value} />
</div>
 Accept our &nbsp;<a href="/terms-and-conditions">Terms & Conditions</a>
{#if error}
<p class="w-full text-center variant-filled-error">{@html error}</p>
{/if}