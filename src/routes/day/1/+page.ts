import type { PageLoad } from './$types';

export type Person = {
	name: string;
	tally: number;
};

export const load: PageLoad = async ({ fetch }) => {
	const url = 'https://advent.sveltesociety.dev/data/2023/day-one.json';
	return { people: (await fetch(url).then((r) => r.json())) as Person[] };
};
