<script lang="ts">
	import { DataHandler } from '@vincjo/datatables/legacy';
	import TableHeader from './TableHeader.svelte';
	import Pagination from './Pagination.svelte';
	import { DotOutline, Minus, Plus, Trash } from 'phosphor-svelte';
	import type { Child } from './types';

	const storedChildren = ''; //browser && localStorage.getItem('children');
	const initialChildren = storedChildren ? (JSON.parse(storedChildren) as Child[]) : [];
	const handler = new DataHandler(initialChildren, { rowsPerPage: 10 });

	let loading = $state(storedChildren === '');
	let rows = $derived(handler.getRows());
	let children = $state(initialChildren);
	let newChildName = $state('');
	let naughtyFilter = $state(true);
	let niceFilter = $state(true);
	let pageCount = $derived(handler.getPageCount());

	$effect(() => {
		localStorage.setItem('children', JSON.stringify(children));
	});

	$effect(() => {
		handler.setRows(children);
	});

	$effect(() => {
		if (!storedChildren) {
			getChildrenFromAPI().then((data) => ((children = data), (loading = false)));
		}
	});

	function addChild() {
		if (!newChildName) return;
		children = [
			{
				id: Math.max(0, ...children.map((p) => p.id)) + 1,
				name: newChildName,
				tally: 0
			},
			...children
		];
		newChildName = '';
	}

	function incrementTally(id: number, amount: number) {
		children = children.map((p: Child) => {
			if (p.id === id) return { ...p, tally: p.tally + amount };
			return p;
		});
	}

	function removeChild(id: number) {
		children = children.filter((p: Child) => p.id !== Number(id));
		if ($rows.length === 0) handler.setPage('previous');
	}

	function getChildrenFromAPI() {
		return fetch('https://advent.sveltesociety.dev/data/2023/day-one.json')
			.then((res) => res.json() as Promise<Child[]>)
			.then((data) => data.map((p: Child, i) => ({ ...p, id: i })) as Child[]);
	}
</script>

<article class="py-5 px-5 flex flex-col space-y-4 mb-5 md:mb-7 font-medium text-balance text-center">
	<span>
		The ancient system for tracking who's been
		<strong class="text-error">naughty</strong> or <strong class="text-ok">nice</strong>
		is out of commission, so the elves need a quick replacement system to input names and
		<strong>tally each child's deeds</strong>.
	</span>
</article>

<div class="grid gap-x-7 gap-y-5 md:grid-cols-5">
	<article class="p-0 md:col-span-3 flex flex-col">
		<div class="overflow-x-auto rounded flex-grow flex flex-col">
			<table class="mb-0">
				<thead>
					<tr>
						<TableHeader {handler} orderBy="name" class="sticky left-0" innerClass="pl-8">Name</TableHeader>
						<TableHeader {handler} orderBy="tally" innerClass="justify-center pl-5">Tally</TableHeader>
						<th class="w-0" aria-label="Actions"></th>
					</tr></thead
				>
				<tbody>
					{#each $rows as row}
						<tr>
							<td class="font-medium sticky left-0 break-normal whitespace-nowrap">
								<div class="flex items-center justify-start space-x-1">
									<div class:text-ok={row.tally >= 0} class:text-error={row.tally < 0}>
										<DotOutline size="32" />
									</div>
									<span title={row.name} class="w-20 3xs:w-24 2xs:w-28 inline-block overflow-hidden text-ellipsis">
										{row.name}
									</span>
								</div>
							</td>
							<td>
								<div class="flex justify-center items-center space-x-0 md:space-x-0">
									<button
										onclick={() => incrementTally(row.id, -1)}
										class="font-medium py-1.5 px-2.5 border-0 hover:border-error text-error"
										title="Subtract 1"
									>
										<Minus weight="bold" class="w-5 h-5" />
									</button>

									<span class="w-9 2xs:w-10 text-center">{row.tally}</span>

									<button
										onclick={() => incrementTally(row.id, 1)}
										class="font-medium py-1.5 px-2.5 border-0 hover:border-ok text-ok"
										title="Add 1"
									>
										<Plus weight="bold" class="w-5 h-5" />
									</button>
								</div>
							</td>
							<td class="pl-0">
								<div class="flex items-center justify-end">
									<button
										onclick={() => removeChild(row.id)}
										class="border-0 px-1.5 opacity-50 hover:opacity-100"
										title="Remove"
									>
										<Trash class="w-5 h-5 text-error" weight="duotone" />
									</button>
								</div>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>

			{#if $rows.length === 0 && $pageCount === 0}
				<div class="flex flex-grow justify-center items-center">
					<div aria-busy={loading} class="text-center text-secondary my-10 pb-10">
						{#if !loading}No children found.{/if}
					</div>
				</div>
			{/if}
		</div>

		<div class="table-footer py-5 rounded-b">
			<div class="flex justify-between space-x-2 mx-6 items-end">
				<Pagination {handler} />
			</div>
		</div>
	</article>

	<div class="flex flex-col md:col-span-2 space-y-5 md:space-y-6">
		<article class="p-0">
			<header class="pt-3 pb-2.5 mt-0 mx-0 mb-5 font-semibold px-5">Add New Child</header>
			<div class="px-4 md:px-5 mb-6">
				<div role="group" class="p-0 m-0 w-full">
					<input type="text" name="name" placeholder="Name" bind:value={newChildName} maxlength="20" />
					<button
						onclick={addChild}
						class="p-3 transition-all bg-bg border-bg text-fg whitespace-nowrap font-semibold"
					>
						Save
					</button>
				</div>
			</div>
		</article>
		<article class="p-0">
			<header class="pt-3 pb-2.5 mt-0 mx-0 mb-5 font-semibold px-5">Filter Children</header>
			<div class="pb-2 px-5">
				<div class="w-full p-0 my-0">
					<input class="rounded-md" type="search" name="search" placeholder="Search by Name..." />
				</div>
				<div class="my-2.5 px-1.5 py-2 flex flex-col space-y-1.5">
					<label>
						<input
							type="checkbox"
							name="naughty"
							class="border-border shadow-ok checked:border-error checked:bg-[--pico-error-bg] mr-2"
							bind:checked={naughtyFilter}
						/>
						Show Naughty
					</label>
					<label>
						<input
							type="checkbox"
							name="nice"
							class="border-border shadow-ok checked:border-ok checked:bg-[--pico-ok-bg] mr-2"
							bind:checked={niceFilter}
						/>
						Show Nice
					</label>
				</div>
			</div>
		</article>
		<article class="p-0">
			<header class="pt-3 pb-2.5 mt-0 mx-0 mb-4 font-semibold px-5">Stats</header>
			<div class="px-5 mb-4">
				<div class="flex flex-col space-y-2.5">
					<div class="flex justify-between">
						<span>Naughty</span>
						<span class="font-semibold text-error">{children.filter((p) => p.tally < 0).length}</span>
					</div>
					<div class="flex justify-between">
						<span>Nice</span>
						<span class="font-semibold text-ok">{children.filter((p) => p.tally >= 0).length}</span>
					</div>
					<hr />
					<div class="flex justify-between">
						<span>Total Children</span>
						<span class="font-semibold">{children.length}</span>
					</div>
				</div>
			</div>
		</article>
	</div>
</div>
