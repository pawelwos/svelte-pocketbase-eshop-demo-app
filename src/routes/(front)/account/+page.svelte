<script>
	import Price from '$lib/components/Price.svelte'
  import {enhance} from "$app/forms";
	export let data
	const {orders, shipping} = data
</script>
<section class="account typography p-4 py-16">
	<div class="container mx-auto">
		<h2>Your Account</h2>
		{#if orders?.items?.length}
			<p>Your latest orders:</p>

			<div class="relative overflow-x-auto">
				<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
						<thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
								<tr>
										<th scope="col" class="px-6 py-3">
												Date
										</th>
										<th scope="col" class="px-6 py-3">
												Order number
										</th>
										<th scope="col" class="px-6 py-3">
												Products
										</th>
										<th scope="col" class="px-6 py-3">
												Address
										</th>
										<th scope="col" class="px-6 py-3">
												Status
										</th>
										<th scope="col" class="px-6 py-3">
												price
										</th>
								</tr>
						</thead>
						<tbody>
							{#each orders?.items as order}
								<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
										<th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
											{new Date(order.created).toLocaleString().split(", ")[0]}<br />
											{new Date(order.created).toLocaleString().split(", ")[1 ]}
										</th>
										<td class="px-6 py-4">
											{order.id}
										</td>
										<td class="px-6 py-4">
											{#if order?.expand?.products}
												 <ul>
													 {#each order?.expand?.products as product}
														 <li class="flex justify-between"><span>{product.name}</span> <span>{product.price}zł</span></li>
													 {/each}
												 </ul>
											{/if}
										</td>
										<td class="px-6 py-4">
												{#if order.shipping}
													 {order.shipping}
												{:else}
													 {order.address}<br />
													 {order.postcode} {order.city}
												{/if}
										</td>
										<td class="px-6 py-4">
												{#if order.status == 'PAID'}
													 <span class="text-green-800">Paid</span>
												{:else if order.status == 'PENDING'}
													 <form action="?/pay" method="POST" use:enhance>
                            <input type="hidden" name="sessionId" value="{order.sessionId}">
                            <input type="hidden" name="orderId" value="{order.id}">
                            <input type="hidden" name="total" value="{order.total}">
                            <input type="hidden" name="shipping" value="{parseInt(shipping.value)}">
                            <button class="button">Pay</button>
                          </form>
												{:else}
                          <span class="text-red-600">Not paid</span>
												{/if}
										</td>
										<td class="px-6 py-4">
												<Price price={order.total/100} />
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