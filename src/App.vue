<template>
	<v-app class='ma-0 pa-0 app_back'>
		<v-main class='ma-0 pa-0'>
			<v-progress-linear :active='true' :indeterminate='loading' bg-opacity='0' color='error' class='mb-n1' top />
			<RouterView />
			<AppFooter />
			<SnackBar />
		</v-main>
	</v-app>
</template>

<script setup lang="ts">
import { env } from './vanillaTS/env';
import { registerSW } from 'virtual:pwa-register';
import { snackSuccess } from '@/services/snack';
import { useHead } from '@vueuse/head';
import { useRegisterSW } from 'virtual:pwa-register/vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const browserStore = browserModule();
const { updateServiceWorker } = useRegisterSW();

if ('serviceWorker' in navigator) {
	registerSW({
		onNeedRefresh () {
			appUpdate();
		}
	});
}

const loading = computed(() => loadingModule().loading);
const title = computed(() => browserStore.title);
const description = computed(() => browserStore.description);

onMounted((): void => {
	// Prevent Chrome 67 and earlier from automatically showing the prompt
	window.addEventListener('beforeinstallprompt', (e) => {
		e.preventDefault();
	});
});

const prefix = 'screen control';

useHead({
	title: () => {
		if (title.value) {
			return `${prefix} - ${title.value}`;
		} else {
			return prefix;
		}
	},

	meta: [
		{
			name: `description`,
			content: (): string => {
				if (description.value) {
					return `${prefix} - ${description.value}`;
				} else {
					return prefix;
				}
			}
		}
	],
	link: () => [
		{
			rel: 'canonical',
			href: `${env.domain}${route?.path}`
		}
	]
});

const appUpdate = (): void => {
	snackSuccess({
		message: 'downloading updates',
		loading: true,
		timeout: 4500
	});
	window.setTimeout(() => updateServiceWorker(), 5000);
};

</script>
