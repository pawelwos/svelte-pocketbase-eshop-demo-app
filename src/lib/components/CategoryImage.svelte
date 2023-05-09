<script>
    import { PUBLIC_PB_URL } from '$env/static/public'
    export let category
    let img = PUBLIC_PB_URL+"/api/files/"+category.collectionId+"/"+category.id+"/"+category.cover
</script>
<img class={$$props.class} src={img} alt={category.name} />