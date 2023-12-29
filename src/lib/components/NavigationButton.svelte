<script lang="ts">
	import { CaretLeft, CaretRight } from 'phosphor-svelte';
	let { href, direction } = $props<{ href?: string; direction?: 'left' | 'right' }>();
</script>

<a
	{href}
	class="rounded-md p-1 transition-all border-2 border-[--pico-border-color] hover:border-primary h-fit
		{href ? '' : 'opacity-0'} ease-in-out"
>
	{#if direction === 'left'}
		<CaretLeft class="w-5 h-5" />
	{:else}
		<CaretRight class="w-5 h-5" />
	{/if}
</a>
