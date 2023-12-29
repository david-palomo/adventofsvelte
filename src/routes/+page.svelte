<script lang="ts">
	import { days } from '$lib/days';
	import { CalendarBlank as Calendar, CheckCircle, CircleDashed } from 'phosphor-svelte';
	// TODO: (WHEN_LUCIDE_FIXED) Change import to lucide-svelte. Import Calendar, CheckCircle, CircleDashed
</script>

<h2 class="mt-1 mb-7 md:mb-10 flex items-center justify-center space-x-3">
	<Calendar class="w-6 h-6 md:w-7 md:h-7 text-primary" />
	<span class="text-xl md:text-2xl font-bold pb-0.5">Calendar</span>
</h2>

<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
	{#each days as day}
		{#if day.completed}
			<a href="day/{day.day}">
				<div
					class="day-card completed border-2 rounded-md px-4 py-3
					border-[--pico-border-color] hover:border-primary"
				>
					<div class="flex items-center space-x-1 justify-between">
						<span class="font-bold">Day {day.day}</span>
						<CheckCircle class="text-primary w-6 h-6" />
						<!-- TODO: (WHEN_LUCIDE_FIXED) Remove w/h -->
					</div>
					<span class="text-sm">{day.title}</span>
				</div>
			</a>
		{:else}
			<div
				class="day-card incomplete border-2 rounded-md px-4 py-3 border-dashed
					border-[--pico-border-color] text-[--pico-border-color]"
			>
				<div class="flex items-center space-x-1 justify-between">
					<span class="font-bold">Day {day.day}</span>
					<CircleDashed class="w-6 h-6" />
					<!-- TODO: (WHEN_LUCIDE_FIXED) Remove w/h -->
				</div>
				<span class="text-sm">{day.title}</span>
			</div>
		{/if}
	{/each}
</div>

<style>
	.day-card {
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 150ms;
	}
	.day-card.completed {
		transition-property: border;
	}
	.day-card.incomplete {
		transition-property: border, color;
	}
</style>
