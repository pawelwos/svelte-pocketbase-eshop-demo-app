<script lang="ts">
	export let price:Number
</script>
<span>{price.toLocaleString('en-GB',{
	style: 'currency',
  currency: 'GBP',
})}</span>