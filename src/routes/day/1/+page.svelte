<script lang="ts">
	import { DataHandler } from '@vincjo/datatables';
	import Th from './Th.svelte';
	import Pagination from './Pagination.svelte';
	import { Trash } from 'phosphor-svelte';

	let { data } = $props();
	let children = $state(data.children);

	const handler = new DataHandler(data.children, { rowsPerPage: 10 });
	let rows = $derived(handler.getRows());

	$effect(() => {
		handler.setRows(children);
	});

	let newChildName = $state('');
	function addChild() {
		children = [
			{
				id: Math.max(...children.map((p: any) => p.id)) + 1,
				name: newChildName,
				tally: 0
			},
			...children
		];
	}

	function incrementTally(id: number, amount: number) {
		console.log(`add 1 to ${id}`);
		children = children.map((p: any) => {
			if (p.id === id) return { ...p, tally: p.tally + amount };
			return p;
		});
	}
	function removeChild(id: number) {
		console.log(`remove ${id}`);
		children = children.filter((p) => p.id !== Number(id));
	}
</script>

<article class="py-5 px-5 flex flex-col space-y-4 description mb-5 md:mb-6">
	<span>The ancient system for tracking who's been naughty or nice is out of commission.</span>
	<span>
		The elves need a quick replacement system to input names and <strong>tally each child's deeds</strong>.
	</span>
</article>

<div class="grid grid-cols-1 gap-x-8 gap-y-0 md:grid-cols-2">
	<article class="p-0 mb-5 md:mb-6">
		<label for="search" class="px-5 pt-4">Search by Name</label>
		<div role="group" class="px-5 pb-6 w-full my-auto">
			<input type="text" name="search" placeholder="Search..." />
		</div>
	</article>
	<article class="p-0 mb-5 md:mb-6">
		<label for="name" class="px-5 pt-4">Add New Child</label>
		<div role="group" class="px-5 pb-6 w-full my-auto">
			<input type="text" name="name" placeholder="Name" bind:value={newChildName} />
			<button on:click={addChild} class="p-3 transition-all bg-bg text-fg whitespace-nowrap">Save</button>
		</div>
	</article>
</div>

<article class="p-0 mb-5 md:mb-6">
	<div class="overflow-x-auto rounded-md">
		<table class="mb-0 px-8 sticky-first-col">
			<thead>
				<tr>
					<Th {handler} orderBy="name">Name</Th>
					<Th {handler} orderBy="tally">Status</Th>
					<Th {handler} orderBy="tally">Tally</Th>
					<th class="w-0"></th>
				</tr>
			</thead>
			<tbody>
				{#each $rows as row}
					<tr>
						<td>{row.name}</td>
						{#if row.tally >= 0}
							<td class="text-ok">nice</td>
						{:else}
							<td class="text-primary">naughty</td>
						{/if}
						<td>{row.tally}</td>
						<td>
							<div class="flex items-center justify-center space-x-2">
								<button
									on:click={() => incrementTally(row.id, -1)}
									class="py-1 px-2 secondary outline hover:border-primary"
									title="-1"
								>
									<span class="text-primary inline-block w-6">-1</span>
								</button>
								<button
									on:click={() => incrementTally(row.id, 1)}
									class="py-1 px-2 secondary outline hover:border-ok"
									title="+1"
								>
									<span class="text-ok inline-block w-6">+1</span>
								</button>
								<button
									on:click={() => removeChild(row.id)}
									data-id={row.id}
									class="p-2 secondary outline hover:border-primary"
									title="Delete"
								>
									<Trash weight="bold" class="text-primary" />
								</button>
							</div>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	<div class="table-footer pt-2 pb-8 rounded-b-md">
		{#if $rows.length === 0}
			<div class="text-center text-secondary">No people yet</div>
		{:else}
			<div class="flex justify-between space-x-2 mx-4 pt-4">
				<Pagination {handler} />
			</div>
		{/if}
	</div>
</article>
