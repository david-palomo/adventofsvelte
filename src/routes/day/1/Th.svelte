<script lang="ts">
	import type { DataHandler, Field } from '@vincjo/datatables';
	import { ArrowsDownUp, ArrowUp, ArrowDown } from 'phosphor-svelte';

	let {
		handler,
		orderBy,
		children,
		hideMobile = false
	} = $props<{
		handler: DataHandler;
		orderBy?: string;
		children?: any;
		hideMobile?: boolean;
	}>();

	const identifier = orderBy?.toString();
	let sorted = $derived(handler.getSort());
</script>

<th
	class:cursor-pointer={orderBy}
	on:click={() => handler.sort(orderBy as Field<any>)}
	class={hideMobile ? 'hidden sm:table-cell' : 'table-cell'}
>
	<div class="flex items-center space-x-1.5 py-4">
		<strong>
			{#if children}
				{@render children()}
			{/if}
		</strong>
		{#if orderBy && $sorted.identifier === identifier && $sorted.direction === 'asc'}
			<ArrowUp />
		{:else if orderBy && $sorted.identifier === identifier && $sorted.direction === 'desc'}
			<ArrowDown />
		{:else if orderBy}
			<ArrowsDownUp />
		{/if}
	</div>
</th>
