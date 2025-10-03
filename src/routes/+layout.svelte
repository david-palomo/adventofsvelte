<script lang="ts">
	import { run } from 'svelte/legacy';

	import '../app.css';
	import { GithubLogo as Github, Moon, Sun } from 'phosphor-svelte';
	import { browser } from '$app/environment';
	import { navigating } from '$app/stores';
	import NProgress from 'nprogress';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	NProgress.configure({ minimum: 0.16, showSpinner: false });
	run(() => {
		if ($navigating) NProgress.start();
		else NProgress.done();
	});

	let theme: string;
	if (browser) {
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		const dataTheme = document.documentElement.dataset.theme;
		theme = dataTheme || (prefersDark ? 'dark' : 'light');
	}
	function toggleTheme() {
		theme = theme === 'light' ? 'dark' : 'light';
		document.documentElement.dataset.theme = theme;
		document.cookie = `preferredColorScheme=${theme};path=/;max-age=31536000;samesite=strict`;
	}
</script>

<div class="wrapper relative flex flex-col font-sans">
	<main class="container flex flex-col flex-grow max-w-5xl pb-14 2xs:pb-16">
		<nav class="pt-2 sm:pt-3 pb-3 sm:pb-4 mx-1">
			<ul class="pb-1">
				<li class="py-0">
					<a href="/" class="flex font-bold items-center space-x-2 3xs:space-x-3 xs:space-x-4">
						<img src="/logo.svg" alt="Logo" class="h-10 w-8" />
						<h1 class="text-lg 3xs:text-xl">Advent of Svelte</h1>
					</a>
				</li>
			</ul>
			<ul>
				<li class="3xs:mr-1 2xs:mr-2">
					<a class="secondary" href="https://github.com/code406/adventofsvelte" aria-label="GitHub Repo">
						<Github class="w-6 h-6" weight="duotone" />
					</a>
				</li>
				<li>
					<button class="as-link" onclick={toggleTheme} title="Toggle theme">
						<div class="toggle-sun"><Sun class="w-6 h-6" weight="duotone" /></div>
						<div class="toggle-moon"><Moon class="w-6 h-6" weight="duotone" /></div>
					</button>
				</li>
			</ul>
		</nav>

		<div class="mx-1 pb-8">
			{@render children?.()}
		</div>
	</main>

	<footer class="absolute bottom-0 w-full h-14 2xs:h-16 font-medium">
		<div class="m-auto max-w-5xl px-2 pt-3 2xs:pt-4 text-sm flex justify-between">
			<p class="text-[var(--pico-muted-color)] mx-2 2xs:mx-4">
				Built by <a href="https://github.com/code406" class="secondary">code406</a>
			</p>
			<p class="text-[var(--pico-muted-color)] mx-2 2xs:mx-4">
				Powered by <a href="https://kit.svelte.dev/" class="secondary">SvelteKit</a>
			</p>
		</div>
	</footer>
</div>

<style>
	.wrapper {
		min-height: 100vh;
		min-height: 100dvh;
	}
	.as-link {
		margin: calc(var(--pico-nav-link-spacing-vertical) * -1) calc(var(--pico-nav-link-spacing-horizontal) * -1);
		padding: var(--pico-nav-link-spacing-vertical) var(--pico-nav-link-spacing-horizontal);
		border: 0;
	}

	a.secondary,
	.as-link {
		text-decoration: underline var(--pico-secondary-underline);
		color: var(--pico-secondary);
		text-underline-offset: 4px;
	}

	a.secondary:hover,
	.as-link:hover {
		text-decoration: underline var(--pico-secondary-hover-underline);
		color: var(--pico-secondary-hover);
	}
</style>
