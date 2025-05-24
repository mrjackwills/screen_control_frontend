import { defineStore } from 'pinia';
import { ModuleName } from '@/types/const_module';

export const snackbarStore = defineStore(ModuleName.SNACKBAR, {

	state: () => ({
		loading: false,
		icon: '',
		message: '',
		timeout: 0,
		visible: false,
		error: false
	}),

	actions: {
		set_loading (b: boolean): void {
			this.loading = b;
		},

		set_error (b: boolean): void {
			this.error = b;
		},

		set_icon (su: string): void {
			this.icon = su;
		},

		set_message (su: string): void {
			this.message = su;
		},

		set_timeout (nu: number): void {
			this.timeout = nu;
		},

		set_visible (b: boolean): void {
			this.visible = b;
		}
	}
});
