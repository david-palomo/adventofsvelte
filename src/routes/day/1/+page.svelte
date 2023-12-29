<script lang="ts">
	let { data } = $props();
</script>

<table>
	<thead>
		<tr>
			<th>Name</th>
			<th>Tally</th>
			<th>Status</th>
		</tr>
	</thead>
	<tbody>
		{#each data.people as person}
			<tr>
				<td>{person.name}</td>
				<td>{person.tally}</td>
				<td>{person.tally < 0 ? 'Naughty' : 'Nice'}</td>
			</tr>
		{/each}
	</tbody>
</table>

<style>
	td,
	th {
		background: transparent;
		transition-property: all;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 150ms;
	}
</style>
