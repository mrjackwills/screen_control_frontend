/* eslint-disable @stylistic/ts/object-curly-newline */
/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { createApp } from 'vue';
import { createHead } from '@vueuse/head';
import { createPinia } from 'pinia';
import { markRaw } from 'vue';
import App from './App.vue';
import router from './router';
import type { Router } from 'vue-router';
import vuetify from './plugins/vuetify';

const head = createHead();
const app = createApp(App);

declare module 'pinia' {
	export interface Pinia {
		router: () => Router;
	}
	export interface PiniaCustomProperties {
		router: Router;
	}
}

const pinia = createPinia();
pinia.use(({ store }) => {
	store.router = markRaw(router);
});
pinia.router = (): Router => router;

app
	.use(head)
	.use(router)
	.use(pinia)
	.use(vuetify)
	.mount('#screen_control_app');