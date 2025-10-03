<script lang="ts">
	import { days } from '$lib/days';
</script>

<h2 class="mt-5 mb-7 sm:mb-11 flex items-center justify-center space-x-3">
	<span class="text-xl sm:text-2xl font-bold pb-0.5">Calendar</span>
</h2>

<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
	{#each days as day}
		{#if day.completed}
			<a href="day/{day.day}">
				<div class="card flex justify-between items-center px-4 py-3 transition-border hover:border-primary">
					<div class="flex flex-col justify-between">
						<span class="text-ok font-bold">Day {day.day}</span>
						<span class="text-sm">{day.title}</span>
					</div>
					<day.icon class="text-primary mr-1 w-7 h-7" />
				</div>
			</a>
		{:else}
			<div
				class="card flex justify-between items-center px-4 py-3 transition-all border-dashed text-border"
				aria-disabled="true"
			>
				<div class="flex flex-col justify-between">
					<span class="font-bold">Day {day.day}</span>
					<span class="text-sm">{day.title}</span>
				</div>
				<day.icon class="mr-1 w-7 h-7" />
			</div>
		{/if}
	{/each}
</div>
