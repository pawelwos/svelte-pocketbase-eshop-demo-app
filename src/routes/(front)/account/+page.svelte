<script lang="ts">
	import Price from '$lib/components/Price.svelte';
	export let data;
	const { orders } = data;
    const getProducts = (cart:string):string => {
        let line:Array<string> = []
        let rows = cart.trim().split("\n")
        rows.map(row => {
            let cols = row.trim().split(" | ")
            if(cols?.length > 0)
            line.push("<div>"+cols[0]+"i</div><div> "+cols[2]+" x &pound;"+cols[1]+"</div><div> &pound;"+cols[3]+"</div>")
        })
        return line
    }
</script>

<section class="account !max-w-none typography p-4 py-16">
	<div class="container mx-auto">
		<h2>Your Account</h2>
		{#if orders?.items?.length}
			<p>Your latest orders:</p>

			<div class="overflow-x-auto relative w-full">
				<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
					<thead
						class="text-xs text-gray-700 uppercase bg-gray-50 dark:text-gray-400 dark:bg-gray-700"
					>
						<tr>
							<th scope="col" class="!px-6 py-3"> Date </th>
							<th scope="col" class="!px-6 py-3"> Order number </th>
							<th scope="col" class="!px-6 py-3"> Products </th>
							<th scope="col" class="!px-6 py-3"> Address </th>
							<th scope="col" class="!px-6 py-3"> Status </th>
							<th scope="col" class="!px-6 py-3"> Total </th>
						</tr>
					</thead>
					<tbody>
						{#each orders?.items as order}
							<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
								<th
									scope="row"
									class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
								>
									{new Date(order.created).toLocaleString().split(', ')[0]}<br />
									{new Date(order.created).toLocaleString().split(', ')[1]}
								</th>
								<td class="py-4 px-6">
									{order.id}
								</td>
								<td class="py-4 px-6">
                                <ul>
                                {#each  getProducts(order.cart) as line }
                                   <li class="flex justify-between">{@html line}</li> 
                                {/each}
                                </ul>
                                    
								</td>
								<td class="py-4 px-6">
									{#if order.shipping}
										{order.shipping}
									{:else}
										{@html order.address}<br />
										{order.postcode}
										{order.city}
									{/if}
								</td>
								<td class="py-4 px-6 text-center">
									{#if order.status == 'PAID'}
										<span class="text-green-800">Paid</span>
									{:else if order.status == 'CANCELLED'}
										<span class="text-red-600">Canceltd</span>
									{:else}
										<span class="text-red-600">Not paid</span>
										{#if order?.expand?.payment?.stripeSessionId}
											<form method="POST" action="?/pay">
												<input
													type="hidden"
													name="stripeSessionId"
													value={order.expand.payment.stripeSessionId}
												/>
												<button class="btn variant-filled-primary">Pay again</button>
											</form>
										{/if}
									{/if}
								</td>
								<td class="py-4 px-6">
									<Price price={order.total} />
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{:else}
			<p>No orders yet</p>
		{/if}
	</div>
</section>
