import { createVuetify, type ThemeDefinition } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import '../sass/variables.scss'
import 'vuetify/styles'

const customDarkTheme: ThemeDefinition = {
	dark: true,
	colors: {
		primary: '#A02C5F',
		error: '#DA0360',
		offwhite: '#FFEECB',
		secondary: '#FF7245',
	},
}

export default createVuetify({

	defaults: {
		VRow: {
			density: 'compact',
		},
	},

	icons: {
		defaultSet: 'mdi',
		aliases,
		sets: { mdi },
	},

	theme: {
		defaultTheme: 'customDarkTheme',
		themes: { customDarkTheme },
	},
})
