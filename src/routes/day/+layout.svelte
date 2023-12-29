<script lang="ts">
	import { page } from '$app/stores';
	import { getDay, getNextDayRoute, getPreviousDayRoute } from '$lib/days';
	import NavigationButton from '$lib/components/NavigationButton.svelte';

	let day = $derived(Number($page.route.id?.split('/').pop() ?? 0));
</script>

<div class="flex justify-between mt-2 mb-10 items-center">
	<NavigationButton direction="left" href={getPreviousDayRoute(day)} />
	<h2 class="xs:text-lg md:text-xl font-bold under">Day {day}: {getDay(day)?.title}</h2>
	<NavigationButton direction="right" href={getNextDayRoute(day)} />
</div>

<slot />

<style>
	.under {
		text-decoration: underline solid var(--pico-primary) 2px;
		text-underline-offset: 12px;
		margin-top: -10px;
	}
</style>
