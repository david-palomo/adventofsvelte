<script lang="ts">
	import type { DataHandler } from '@vincjo/datatables';
	import { CaretLeft, CaretDoubleLeft } from 'phosphor-svelte';

	let { handler } = $props<{ handler: DataHandler }>();
	let pageNumber = $derived(handler.getPageNumber());
	let pageCount = $derived(handler.getPageCount());

	$effect(() => {
		console.log($pageNumber, $pageCount);
		if ($pageNumber === 0) handler.setPage(1);
		else if ($pageNumber > $pageCount) handler.setPage($pageCount);
	});
</script>

<div class="flex justify-between w-full items-center">
	<div class="text-secondary">
		Page <b>{$pageNumber}</b> of <b>{$pageCount}</b>
	</div>

	<div>
		<button
			disabled={$pageNumber === 1}
			on:click={() => handler.setPage(1)}
			class="secondary outline p-1"
			title="First Page"
		>
			<CaretDoubleLeft class="w-5 h-5" />
		</button>

		<button
			disabled={$pageNumber === 1}
			on:click={() => handler.setPage('previous')}
			class="secondary outline p-1"
			title="Previous Page"
		>
			<CaretLeft class="w-5 h-5" />
		</button>

		<button
			disabled={$pageNumber === $pageCount}
			on:click={() => handler.setPage('next')}
			class="secondary outline p-1"
			title="Next Page"
		>
			<CaretLeft class="w-5 h-5 transform rotate-180" />
		</button>

		<button
			disabled={$pageNumber === $pageCount}
			on:click={() => handler.setPage($pageCount)}
			class="secondary outline p-1"
			title="Last Page"
		>
			<CaretDoubleLeft class="w-5 h-5 transform rotate-180" />
		</button>
	</div>
</div>
