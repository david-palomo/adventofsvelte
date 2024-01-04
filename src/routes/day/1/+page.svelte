<script lang="ts">
	import { DataHandler } from '@vincjo/datatables';
	import TableHeader from './TableHeader.svelte';
	import Pagination from './Pagination.svelte';
	import { Minus, Plus, Trash } from 'phosphor-svelte';

	let { data } = $props();
	let children = $state(data.children);

	const handler = new DataHandler(data.children, { rowsPerPage: 10 });
	let rows = $derived(handler.getRows());
	let pageCount = $derived(handler.getPageCount());

	$effect(() => {
		handler.setRows(children);
	});

	let newChildName = $state('');
	function addChild() {
		if (!newChildName) return;
		children = [
			{
				id: Math.max(...children.map((p: any) => p.id)) + 1,
				name: newChildName,
				tally: 0
			},
			...children
		];
		newChildName = '';
	}

	function incrementTally(id: number, amount: number) {
		children = children.map((p: any) => {
			if (p.id === id) return { ...p, tally: p.tally + amount };
			return p;
		});
	}
	function removeChild(id: number) {
		children = children.filter((p) => p.id !== Number(id));
		if ($rows.length === 0) handler.setPage('previous');
	}
</script>

<article
	class="py-5 px-5 flex flex-col space-y-4 challenge-description mb-5 md:mb-7 font-medium text-balance text-center"
>
	<span>
		The ancient system for tracking who's been naughty or nice is out of commission, so the elves need a quick
		replacement system to input names and <strong>tally each child's deeds</strong>.
	</span>
</article>

<div class="grid gap-x-7 gap-y-5 md:grid-cols-5">
	<article class="p-0 md:col-span-3 challenge-solution">
		<div class="overflow-x-auto rounded">
			<table class="mb-0">
				<thead>
					<tr>
						<TableHeader {handler} orderBy="name" class="sticky left-0" innerClass="pl-10">Name</TableHeader>
						<TableHeader {handler} orderBy="tally" innerClass="justify-center pl-5">Tally</TableHeader>
						<th class="w-0" aria-label="Actions"></th>
					</tr></thead
				>
				<tbody>
					{#each $rows as row}
						<tr>
							<td class="font-medium whitespace-nowrap sticky left-0">
								<div class="w-10 inline-block text-center">
									{#if row.tally >= 0}😇{:else}😈{/if}
								</div>
								<span>{row.name}</span>
							</td>
							<td>
								<div class="flex justify-center items-center space-x-0 md:space-x-0">
									<button
										on:click={() => incrementTally(row.id, -1)}
										class="font-medium py-1.5 px-2.5 border-0 hover:border-error text-error"
										title="Subtract 1 from Tally"
									>
										<Minus weight="bold" class="w-5 h-5" />
									</button>

									<span class="w-10 text-center">{row.tally}</span>

									<button
										on:click={() => incrementTally(row.id, 1)}
										class="font-medium py-1.5 px-2.5 border-0 hover:border-ok text-ok"
										title="Add 1 to Tally"
									>
										<Plus weight="bold" class="w-5 h-5" />
									</button>
								</div>
							</td>
							<td>
								<div class="flex items-center justify-end">
									<button
										on:click={() => removeChild(row.id)}
										class="border-0 px-1.5 text-error"
										title="Remove Child"
									>
										<Trash class="w-5 h-5" />
									</button>
								</div>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>

		<div class="table-footer pt-6 pb-8 rounded-b">
			{#if $rows.length === 0 && $pageCount === 0}
				<div class="text-center text-secondary">No people yet</div>
			{:else}
				<div class="flex justify-between space-x-2 mx-6">
					<Pagination {handler} />
				</div>
			{/if}
		</div>
	</article>

	<div class="flex flex-col md:col-span-2 space-y-5 md:space-y-6 order-first md:order-last">
		<article class="p-0 challenge-solution">
			<header class="py-3 mt-0 mx-0 mb-4 font-semibold px-5">Add New Child</header>
			<div class="px-4 md:px-5 mb-5 md:mb-6">
				<div role="group" class="p-0 m-0 w-full">
					<input type="text" name="name" placeholder="Name" bind:value={newChildName} maxlength="30" />
					<button
						on:click={addChild}
						class="p-3 transition-all bg-bg border-bg text-fg whitespace-nowrap font-semibold"
					>
						Save
					</button>
				</div>
			</div>
		</article>
		<article class="p-0 challenge-solution">
			<header class="py-3 mt-0 mx-0 mb-4 font-semibold px-4 md:px-5">Apply Filters</header>
			<div class="grid grid-cols-1 2xs:grid-cols-2 md:grid-cols-1 gap-x-4 gap-y-4 pb-1 px-4 md:px-5">
				<div class="w-full p-0 my-0">
					<input type="text" name="search" placeholder="Search by Name..." />
				</div>
				<div class="w-full p-0 my-0">
					<details class="dropdown">
						<summary>Filter status</summary>
						<ul>
							<li>
								<label class="cursor-pointer">
									<input type="checkbox" name="naughty" checked />
									<span class="pr-2">😈</span>Naughty
								</label>
							</li>
							<li>
								<label class="cursor-pointer">
									<input type="checkbox" name="nice" checked />
									<span class="pr-2">😇</span>Nice
								</label>
							</li>
						</ul>
					</details>
				</div>
			</div>
		</article>
		<article class="flex-grow hidden md:flex"></article>
	</div>
</div>
