<script>
	import Price from '$lib/components/Price.svelte'
  import {enhance} from "$app/forms";
	export let data
	const {orders, shipping} = data
</script>
<section class="account !max-w-none typography p-4 py-16">
	<div class="container mx-auto">
		<h2>Your Account</h2>
		{#if orders?.items?.length}
			<p>Your latest orders:</p>

			<div class="relative w-full overflow-x-auto">
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
												Total
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
											{#if order?.cart}
												 {order.cart}
											{/if}
										</td>
										<td class="px-6 py-4">
												{#if order.shipping}
													 {order.shipping}
												{:else}
													 {@html order.address}<br />
													 {order.postcode} {order.city}
												{/if}
										</td>
										<td class="px-6 py-4">
												{#if order.status == 'PAID'}
													 <span class="text-green-800">Paid</span>
												{:else}
                          <span class="text-red-600">Not paid</span>
												{/if}
										</td>
										<td class="px-6 py-4">
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
