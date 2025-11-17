<template>
	<v-container class='fill-height ma-0 pa-0' fluid>

		<v-row v-if='init' align='center' class='ma-0 pa-0 fill-height' justify='center'>
			<v-col class='text-center ma-0 pa-0' cols='11'>

				<v-row align='center' class='ma-0 pa-0' justify='center'>
					<v-col class='text-center ma-0 pa-0' cols='12' md='6'>

						<PiStatus />
					</v-col>
				</v-row>

				<v-row align='center' class='ma-0 pa-0 mt-8' justify='center'>
					<v-col
						class='text-center ma-0 pa-0 text-h1'
						cols='12'
					>
						Screen is {{ screen_status }}
					</v-col>

				</v-row>

				<v-row class='ma-0 pa-0 mt-8' justify='center'>

					<template v-if='have_screen_status && init'>
						<v-col class='ma-0 pa-0' cols='auto'>
							<v-btn color='primary' rounded='lg' @click='toggle_screen'>
								{{ button_text }}
							</v-btn>
						</v-col>

					</template>
					<template v-if='!have_screen_status && init'>

						<v-col class='ma-0 pa-0 mr-3' cols='auto'>
							<v-btn color='primary' rounded='lg' @click='turn_screen_on'>
								try on
							</v-btn>
						</v-col>

						<v-col class='ma-0 pa-0' cols='auto'>
							<v-btn color='primary' rounded='lg' @click='turn_screen_off'>
								try off
							</v-btn>
						</v-col>

					</template>

					<template v-if='!init'>
						loading
					</template>
				</v-row>
			</v-col>
		</v-row>

		<v-row v-if='!init && !loading' align='center' class='ma-0 pa-0 fill-height' justify='center'>
			<v-col class='text-center ma-0 pa-0' cols='8' md='12'>

				<v-row align='center' class='ma-0 pa-0' justify='center'>
					<v-col class='text-center ma-0 pa-0 text-h2' cols='auto' md='12'>
						Framebox appears offline
					</v-col>
				</v-row>
				<v-row align='center' class='ma-0 pa-0 mt-3' justify='center'>
					<v-col v-if='!have_screen_status' class='ma-0 pa-0 ml-3' cols='auto'>
						<v-btn color='primary' rounded='lg' @click='reload'>
							reload
						</v-btn>
					</v-col>
				</v-row>
			</v-col>

		</v-row>
	</v-container>
</template>

<script setup lang="ts">
import type { WsIncoming } from '@/types'
import { snackError } from '@/services/snack'
import { ws } from '@/services/WS'
import { parseMessage } from '@/vanillaTS/messageParser'

const router = useRouter()

const [loadingStore, statusStore, websocketStore] = [loadingModule(), statusModule(), websocketModule()]
const pageTitle = ''

onMounted(() => {
	browserModule().set_description(``)
	browserModule().set_title(pageTitle)
	init_time_interval()
	init_status_interval()
	loading.value = true

	// Ten second timeout to get first message
	window.setTimeout(() => {
		loading.value = false
	}, 10_000)
})

onUnmounted(() => {
	clearTimeout(time_interval.value)
	clearInterval(status_interval.value)
})

const loading = computed({
	get (): boolean {
		return loadingStore.loading
	},
	set (b: boolean): void {
		loadingStore.set_loading(b)
	},
})

// Web socket methods
const screen_status = computed(() => statusStore.screen_status ?? 'unknown')

// Web socket methods
const init = computed(() => statusStore.init)

// Time methods
const time_interval = ref(0)

const status_interval = ref(0)

// Update the current_time value every second
function init_time_interval (): void {
	clearInterval(time_interval.value)
	time_interval.value = window.setInterval(() => {
		statusStore.increase_uptimes()
	}, 1000)
}

function init_status_interval (): void {
	clearInterval(status_interval.value)
	status_interval.value = window.setInterval(() => {
		send_status()
	}, 10_000)
}

// Web socket methods
const ws_connected = computed(() => websocketStore.connected)

// Request the status of the server
function send_status (): void {
	websocketStore.send({ name: 'status' })
}

watch(ws_connected, (i: boolean) => {
	if (i) {
		addWSHandlers()
		send_status()
	}
})

function addWSHandlers (): void {
	ws.connection?.addEventListener('message', data => {
		try {
			const message = parseMessage(data.data)
			if (!message) throw new Error(`can't parse message`)
			wsDataHandler(message)
		} catch (error) {
			const message = error instanceof Error ? error.message : 'ERROR'
			snackError({ message })
		}
	})

	send_status()

	// Although should never have the connection killed
	ws.connection?.addEventListener('close', _event => {
		userModule().logout()
	})
}

// should have an array,
async function wsDataHandler (message: WsIncoming): Promise<void> {
	loading.value = false
	statusStore.set_init_true()
	switch (message.data?.name) {
		case 'status': {
			if (message.data.data) statusStore.set_from_status(message.data.data)
			init_time_interval()
			init_status_interval()
			break
		}
		case 'error': {
			await snackError({ message: message.data.data })
			break
		}
	}
}

// Reload the page
function reload (): void {
	router.go(0)
}

// Text on the main button
const button_text = computed(() => {
	if (have_screen_status.value) {
		return statusStore.screen_status === 'On' ? 'turn screen OFF' : 'turn screen ON'
	} else {
		return ''
	}
})

// Screen status is known?
const have_screen_status = computed(() => statusStore.have_screen_status)

// Send a screen off command
function turn_screen_off (): void {
	websocketStore.send({ name: 'screen_off' })
}

// Send a screen on command
function turn_screen_on (): void {
	websocketStore.send({ name: 'screen_on' })
}

// Toggle the screen depending on current screen state
async function toggle_screen (): Promise<void> {
	if (statusStore.screen_status === 'On') {
		turn_screen_off()
	} else if (statusStore.screen_status === 'Off') {
		turn_screen_on()
	}
}

</script>

<style>
.v-btn__content {
	width: 100%
}
</style>
