import { defineStore } from 'pinia';
import { ModuleName } from '@/types/const_module';

export const browserModule = defineStore(ModuleName.BROWSER, {

	state: () => ({
		api_version: '',
		description: '',
		pwa: false,
		redirect: '',
		title: ''
	}),

	actions: {
		set_api_version (x: string): void {
			this.api_version = x;
		},

		set_description (x: string): void {
			this.description = x;
		},

		set_pwa (x: boolean): void {
			this.pwa = x;
		},

		set_redirect (x: string): void {
			this.redirect = x;
		},

		set_title (x: string): void {
			this.title = x;
		}
	}
});
