/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		screens: {
			'4xs': '340px',
			'3xs': '375px',
			'2xs': '425px',
			xs: '500px',
			...defaultTheme.screens,
			'3xl': '1700px'
		},
		transitionProperty: {
			...defaultTheme.transitionProperty,
			border: 'border-color, border-width'
		},
		transitionDuration: {
			...defaultTheme.transitionDuration,
			DEFAULT: 'var(--pico-transition-duration)'
		},
		borderWidth: {
			...defaultTheme.borderWidth,
			3: '3px',
			DEFAULT: 'var(--pico-border-width)'
		},
		borderRadius: {
			...defaultTheme.borderRadius,
			DEFAULT: 'var(--pico-border-radius)'
		},
		colors: {
			primary: 'var(--pico-primary)',
			secondary: 'var(--pico-secondary)',
			bgprimary: 'var(--pico-primary-background)',
			primaryhover: 'var(--pico-primary-hover)',
			border: 'var(--pico-border-color)',
			fg: 'var(--pico-color)',
			bg: 'var(--pico-background-color)',
			ok: 'var(--pico-ok)',
			error: 'var(--pico-error)'
		},
		fontFamily: {
			sans: ['Inter', ...defaultTheme.fontFamily.sans]
		},
		extend: {}
	},
	plugins: []
};
