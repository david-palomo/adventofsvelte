import type { PageLoad } from './$types';

export type Child = {
	id: number;
	name: string;
	tally: number;
};

export const load: PageLoad = async ({ fetch }) => {
	const url = 'https://advent.sveltesociety.dev/data/2023/day-one.json';
	const json = (await fetch(url).then((r) => r.json())) as Child[];
	const children = json.map((p: Child, i) => ({ ...p, id: i }));
	return { children };
};
