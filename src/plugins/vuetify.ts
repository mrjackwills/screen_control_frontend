import '../sass/variables.scss';
import 'vuetify/styles';
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg';
import { createVuetify } from 'vuetify';

export default createVuetify({
	icons: {
		defaultSet: 'mdi',
		aliases,
		sets: {
			mdi,
		},
	},
	
	theme: {
		defaultTheme: 'dark',
		themes: {
			dark: {
				colors: {
					primary: '#A02C5F',
					error: '#DA0360',
					offwhite: '#FFEECB',
					secondary: '#FF7245',
				},
			},
		},
	},
});
