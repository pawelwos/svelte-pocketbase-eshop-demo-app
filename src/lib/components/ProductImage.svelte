<script>
    import { PUBLIC_PB_URL } from '$env/static/public'
    export let product
    let img = PUBLIC_PB_URL+"/api/files/"+product.collectionId+"/"+product.id+"/"+product.cover
</script>
<img class={$$props.class} src={img} alt={product.name} />