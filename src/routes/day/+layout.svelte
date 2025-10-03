<script lang="ts">
	import { page } from '$app/state';
	import { getDay, getNextDayRoute, getPreviousDayRoute } from '$lib/days';
	import NavigationButton from '$lib/components/NavigationButton.svelte';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	let day = $derived(Number(page.route.id?.split('/').pop() ?? 0));
</script>

<div class="flex justify-between mt-5 mb-7 sm:mb-12 items-center">
	<NavigationButton type="previous" href={getPreviousDayRoute(day)} />
	<h2 class="xs:text-lg sm:text-xl font-bold">
		<span class="text-ok">Day {day}:</span>
		<span class="pl-1">{getDay(day)?.title}</span>
	</h2>
	<NavigationButton type="next" href={getNextDayRoute(day)} />
</div>

{@render children?.()}
