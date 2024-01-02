<script lang="ts">
	import { DataHandler } from '@vincjo/datatables';
	import Th from './Th.svelte';
	import Pagination from './Pagination.svelte';
	import { Trash } from 'phosphor-svelte';

	let { data } = $props();
	let people = $state(data.people);

	const handler = new DataHandler(data.people, { rowsPerPage: 10 });
	let rows = $derived(handler.getRows());

	$effect(() => {
		handler.setRows(people);
	});

	let newPersonName = $state('');
	let newPersonTally = $state('');
	function addPerson() {
		people = [
			{
				id: Math.max(...people.map((p: any) => p.id)) + 1,
				name: newPersonName,
				tally: Number(newPersonTally) ?? 0
			},
			...people
		];
	}

	function incrementTally(id: number, amount: number) {
		console.log(`add 1 to ${id}`);
		people = people.map((p: any) => {
			if (p.id === id) return { ...p, tally: p.tally + amount };
			return p;
		});
	}
	function removePerson(id: number) {
		console.log(`remove ${id}`);
		people = people.filter((p) => p.id !== Number(id));
	}
</script>

<div class="grid grid-cols-1 gap-x-8 gap-y-0 md:grid-cols-2">
	<article class="py-5 px-5 flex flex-col space-y-4 bel-air">
		<span>
			In <strong>West Philadelphia</strong> born and raised, on the playground is where I spent most of my days.
			Chillin' out, maxin', relaxin' all cool, and all shootin' some b-ball outside of the school...
		</span>
		<span>
			When a couple of guys who were up to no good started makin' trouble in my neighborhood, I got in one
			little fight and my mom got scared and said "You're movin' with your auntie and uncle in <strong
				>Bel-Air</strong
			>".
		</span>
	</article>

	<article class="px-0">
		<header class="px-6 py-4 mb-5 mx-0">
			<h2 class="text-sm md:text-base font-bold">Add new Person</h2>
		</header>
		<div class="flex flex-col justify-center">
			<div class="px-6">
				<input type="text" name="name" placeholder="Name" bind:value={newPersonName} />
			</div>
			<div role="group" class="w-full mb-0 px-6">
				<input type="number" name="tally" placeholder="Tally (blank = 0)" bind:value={newPersonTally} />
				<button
					on:click={addPerson}
					class="p-3 transition-all bg-[--pico-background-color] text-[--pico-color]"
				>
					Save
				</button>
			</div>
		</div>
	</article>
</div>

<article class="p-0">
	<div class="overflow-x-auto">
		<table class="mb-0 px-8">
			<thead>
				<tr>
					<Th {handler} orderBy="name">Name</Th>
					<Th {handler} orderBy="tally" hideMobile={true}>Status</Th>
					<Th {handler} orderBy="tally">Tally</Th>
					<th class="w-0"></th>
				</tr>
			</thead>
			<tbody>
				{#each $rows as row}
					<tr>
						<td>{row.name}</td>
						{#if row.tally >= 0}
							<td class="text-ok hidden sm:table-cell">nice</td>
						{:else}
							<td class="text-primary hidden sm:table-cell">naughty</td>
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
									on:click={() => removePerson(row.id)}
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

	<div class="table-footer pt-2 pb-8">
		{#if $rows.length === 0}
			<div class="text-center text-secondary">No people yet</div>
		{:else}
			<div class="flex justify-between space-x-2 mx-4 pt-4">
				<Pagination {handler} />
			</div>
		{/if}
	</div>
</article>

<style>
	.table-footer,
	thead {
		background: var(--pico-table-row-stripped-background-color);
	}

	.bel-air strong {
		color: var(--pico-primary);
	}
</style>
