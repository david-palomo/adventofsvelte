<script lang="ts">
	import { CaretLeft, CaretRight } from 'phosphor-svelte';

	let { href, type, extraText } = $props<{
		href?: string;
		type?: 'previous' | 'next';
		extraText?: string;
	}>();
</script>

<a {href} role="button" class="secondary outline p-1 {href ? '' : 'opacity-0'}" aria-label={type}>
	{#if type === 'previous'}
		<div class="flex items-center lg:space-x-3" class:mx-2={extraText}>
			<CaretLeft class="w-5 h-5" />
			{#if extraText}
				<span class="hidden lg:inline pr-2 pb-0.5">{extraText}</span>
			{/if}
		</div>
	{:else if type === 'next'}
		<div class="flex items-center lg:space-x-3" class:mx-2={extraText}>
			{#if extraText}
				<span class="hidden lg:inline pl-2 pb-0.5">{extraText}</span>
			{/if}
			<CaretRight class="w-5 h-5" />
		</div>
	{/if}
</a>
