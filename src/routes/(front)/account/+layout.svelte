<section class="account">
	<div class="container mx-auto">
		<div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
			<div class="nav md:col-span-2">
				<ul class="p-4">
					<li class="p-4 border-b border-gray-800 dark:border-white"><a href="/account" class="">Orders</a></li>
					<li class="p-4 border-b border-gray-800 dark:border-white"><a href="/account/profile" class="">Your Profile</a></li>
					<li class="p-4 border-b border-gray-800 dark:border-white">
						<form action="/logout" method="POST">
							<button type="submit" class="underline text-c3">Logout</button>
						</form>
					</li>
				</ul>
			</div>
			<div class="main md:col-span-10">
				<slot />
			</div>
		</div>
	</div>
</section>