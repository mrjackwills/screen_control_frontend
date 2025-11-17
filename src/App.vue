<template>
	<v-app class='ma-0 pa-0 app_back'>
		<v-main
			id='something'
			class='ma-0 pa-0'
		>
			<v-progress-linear
				:active='true'
				bg-opacity='0'
				class='mb-n1'
				color='error'
				:indeterminate='loading'
				top
			/>
			<RouterView />
			<AppFooter />
			<SnackBar />
		</v-main>
	</v-app>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { registerSW } from 'virtual:pwa-register'
import { useRegisterSW } from 'virtual:pwa-register/vue'
import { useRoute } from 'vue-router'
import { snackSuccess } from '@/services/snack'
import { env } from './vanillaTS/env'

const route = useRoute()
const browserStore = browserModule()
const { updateServiceWorker } = useRegisterSW()

if ('serviceWorker' in navigator) {
	registerSW({
		onNeedRefresh () {
			appUpdate()
		},
	})
}

const loading = computed(() => loadingModule().loading)
const title = computed(() => browserStore.title)
const description = computed(() => browserStore.description)

onMounted((): void => {
	// Prevent Chrome 67 and earlier from automatically showing the prompt
	window.addEventListener('beforeinstallprompt', e => {
		e.preventDefault()
	})
})

const prefix = 'screen control'

useHead({
	title: () => {
		return title.value ? `${prefix} - ${title.value}` : prefix
	},

	meta: [
		{
			name: `description`,
			content: (): string => {
				return description.value ? `${prefix} - ${description.value}` : prefix
			},
		},
	],
	link: () => [
		{
			rel: 'canonical',
			href: `${env.domain}${route?.path}`,
		},
	],
})

function appUpdate (): void {
	snackSuccess({
		message: 'downloading updates',
		loading: true,
		timeout: 4500,
	})
	window.setTimeout(() => updateServiceWorker(), 5000)
}

</script>
