import {
	AddressBook,
	Cards,
	ChatCentered,
	ClockCountdown,
	CloudSnow,
	Coins,
	Cookie,
	Gift,
	Heart,
	IdentificationCard,
	MapPinLine,
	MaskHappy,
	Metronome,
	NotePencil,
	Question,
	Snowflake,
	Sparkle,
	SunHorizon,
	Translate,
	Truck,
	UsersThree,
	Warehouse,
} from 'phosphor-svelte';

type Day = { day: number; completed: boolean; title: string; icon?: any };

export const days: Day[] = [
	{ day: 1, completed: true, title: 'Naughty or Nice', icon: AddressBook },
	{ day: 2, completed: true, title: 'Cookie Counter', icon: Cookie },
	{ day: 3, completed: true, title: 'Sleigh Load Balancer', icon: Truck },
	{ day: 4, completed: false, title: 'Heart of Christmas', icon: Heart },
	{ day: 5, completed: false, title: 'Present Progress', icon: Gift },
	{ day: 6, completed: false, title: 'Mistletoe Metronome', icon: Metronome },
	{ day: 7, completed: false, title: 'Morse Code Translator', icon: Translate },
	{ day: 8, completed: false, title: "Santa's Deck of Doubles", icon: Cards },
	{ day: 9, completed: false, title: 'Christmas Countdown', icon: ClockCountdown },
	{ day: 10, completed: false, title: 'Holiday Greeting Pop-Up', icon: ChatCentered },
	{ day: 11, completed: false, title: 'Elf Name Generator', icon: IdentificationCard },
	{ day: 12, completed: false, title: 'Christmas Card Editor', icon: NotePencil },
	{ day: 13, completed: false, title: 'Sleigh Load Balancer 2.0', icon: Truck },
	{ day: 14, completed: false, title: 'Snowfall Symphony', icon: Snowflake },
	{ day: 15, completed: false, title: 'Sparkling Snowglobes', icon: Sparkle },
	{ day: 16, completed: false, title: 'Lessons from Amazon', icon: Warehouse },
	{ day: 17, completed: false, title: 'Festive Funds', icon: Coins },
	{ day: 18, completed: false, title: "Santa's Quiz", icon: Question },
	{ day: 19, completed: false, title: 'Polar Lights', icon: SunHorizon },
	{ day: 20, completed: false, title: 'Jingle Jokes', icon: MaskHappy },
	{ day: 21, completed: false, title: 'Frightful Weather App', icon: CloudSnow },
	{ day: 22, completed: false, title: 'Snowflake Silhouettes', icon: Snowflake },
	{ day: 23, completed: false, title: 'ElfNet Social', icon: UsersThree },
	{ day: 24, completed: false, title: "Santa's Magical Tracker", icon: MapPinLine }
];

export function getDay(day: number): Day | undefined {
	return days.find((d) => d.day === day);
}

export function getNextDayRoute(day: number, path = 'day/'): string | undefined {
	const nextDay = days.find((d) => d.day > day && d.completed);
	return nextDay ? `/${path}${nextDay.day}` : undefined;
}

export function getPreviousDayRoute(day: number, path = 'day/'): string | undefined {
	const reversedDays = days
		.filter((d) => d.completed)
		.map((d) => d.day)
		.reverse();
	const previousDay = reversedDays.find((d) => d < day);
	return previousDay ? `/${path}${previousDay}` : undefined;
}
