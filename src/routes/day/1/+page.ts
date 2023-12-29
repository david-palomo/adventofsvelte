import type { PageLoad } from './$types';

export type Person = {
	id: number;
	name: string;
	tally: number;
};

export const load: PageLoad = async ({ fetch }) => {
	const url = 'https://advent.sveltesociety.dev/data/2023/day-one.json';
	const json = (await fetch(url).then((r) => r.json())) as Person[];
	const people = json.map((p: Person, i) => ({ ...p, id: i }));
	return { people };
};
