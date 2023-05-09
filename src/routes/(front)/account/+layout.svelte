<section class="account">
	<div class="container mx-auto">
		<div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
			<div class="nav md:col-span-2">
				<ul class="p-4">
					<li class="p-4 border-b border-gray-200"><a href="/account" class="">Zamówienia</a></li>
					<li class="p-4 border-b border-gray-200"><a href="/account/profile" class="">Twoje Dane</a></li>
					<li class="p-4 border-b border-gray-200">
						<form action="/logout" method="POST">
							<button type="submit" class="underline text-c3">Wyloguj</button>
						</form>
					</li>
				</ul>
			</div>
			<div class="main md:col-span-10">
				<slot></slot>
			</div>
		</div>
	</div>
</section>