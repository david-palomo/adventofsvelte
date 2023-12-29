<script lang="ts">
	import { page } from '$app/stores';
	import { getDay, getNextDayRoute, getPreviousDayRoute } from '$lib/days';
	import NavigationButton from '$lib/components/NavigationButton.svelte';

	let day = $derived(Number($page.route.id?.split('/').pop() ?? 0));
</script>

<!-- Mobile -->
<div class="flex lg:hidden justify-between mt-2 mb-10 items-center">
	<NavigationButton type="previous" href={getPreviousDayRoute(day)} />
	<h2 class="xs:text-lg md:text-xl font-bold">Day {day}: {getDay(day)?.title}</h2>
	<NavigationButton type="next" href={getNextDayRoute(day)} />
</div>

<!-- Desktop -->
<div class="hidden lg:flex justify-between mt-2 mb-10 items-center">
	<NavigationButton type="previous" href={getPreviousDayRoute(day)} extraText="Previous Day" />
	<h2 class="xs:text-lg md:text-xl font-bold">Day {day}: {getDay(day)?.title}</h2>
	<NavigationButton type="next" href={getNextDayRoute(day)} extraText="Next Day" />
</div>

<slot />
