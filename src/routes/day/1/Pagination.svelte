<script lang="ts">
	import type { DataHandler } from '@vincjo/datatables';
	import { CaretLeft, CaretDoubleLeft } from 'phosphor-svelte';

	let { handler } = $props<{ handler: DataHandler }>();
	let pageNumber = $derived(handler.getPageNumber());
	let pageCount = $derived(handler.getPageCount());

	const setPage = (page: number | 'previous' | 'next') => {
		return () => handler.setPage(page);
	};

	$effect(() => {
		if ($pageNumber === 0) setPage(1);
		else if ($pageNumber > $pageCount) setPage($pageCount);
	});
</script>

<div class="flex justify-between w-full items-center">
	<div class="text-secondary">
		Page <b>{$pageNumber}</b> of <b>{$pageCount}</b>
	</div>

	<div>
		<button disabled={$pageNumber === 1} on:click={setPage(1)} class="secondary outline p-1">
			<CaretDoubleLeft class="w-5 h-5" />
		</button>

		<button disabled={$pageNumber === 1} on:click={setPage('previous')} class="secondary outline p-1">
			<CaretLeft class="w-5 h-5" />
		</button>

		<button disabled={$pageNumber === $pageCount} on:click={setPage('next')} class="secondary outline p-1">
			<CaretLeft class="w-5 h-5 transform rotate-180" />
		</button>

		<button disabled={$pageNumber === $pageCount} on:click={setPage($pageCount)} class="secondary outline p-1">
			<CaretDoubleLeft class="w-5 h-5 transform rotate-180" />
		</button>
	</div>
</div>
