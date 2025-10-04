<script lang="ts">
	import type { DataHandler, Field } from '@vincjo/datatables/legacy';
	import { ArrowsDownUp, ArrowUp, ArrowDown } from 'phosphor-svelte';

	let {
		handler,
		orderBy,
		children,
		class: className = '',
		innerClass = ''
	} = $props<{
		handler: DataHandler;
		orderBy?: string;
		children?: any;
		class?: string;
		innerClass?: string;
	}>();

	const identifier = orderBy?.toString();
	let sorted = $derived(handler.getSort());
</script>

<th class:cursor-pointer={orderBy} onclick={() => handler.sort(orderBy as Field<any>)} class={className}>
	<div class="flex items-center py-3.5 {innerClass}">
		{#if children}
			{@render children()}
		{/if}
		{#if orderBy && $sorted.identifier === identifier && $sorted.direction === 'asc'}
			<ArrowUp class="ml-1.5" />
		{:else if orderBy && $sorted.identifier === identifier && $sorted.direction === 'desc'}
			<ArrowDown class="ml-1.5" />
		{:else if orderBy}
			<ArrowsDownUp class="ml-1.5" />
		{/if}
	</div>
</th>
