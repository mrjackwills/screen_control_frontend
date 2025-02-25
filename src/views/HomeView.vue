<template>
	<v-container class='fill-height ma-0 pa-0' fluid>

		<v-row align='center' justify='center' class='ma-0 pa-0 fill-height' v-if='init'>
			<v-col cols='11'  class='text-center ma-0 pa-0'>

				<v-row align='center' justify='center' class='ma-0 pa-0'>
					<v-col cols='12' md='6' class='text-center ma-0 pa-0'>

						<PiStatus  />
					</v-col>
				</v-row>

				<v-row align='center' justify='center' class='ma-0 pa-0 mt-8'>
					<v-col cols='12' class='text-center ma-0 pa-0 text-h1'>
						Screen is {{ screen_status }}
					</v-col>

				</v-row>
		
				<v-row justify='center' class='ma-0 pa-0 mt-8'>

					<template v-if='have_screen_status && init'>
						<v-col cols='auto' class='ma-0 pa-0' >
							<v-btn
								color='primary'
								rounded='lg'
								@click='toggle_screen'>
								{{ button_text }}
							</v-btn>
						</v-col>

					</template>
					<template v-if='!have_screen_status && init'>
						
						<v-col cols='auto' class='ma-0 pa-0 mr-3'>
							<v-btn
								color='primary'
								rounded='lg'
								@click='turn_screen_on'>
								try on
							</v-btn>
						</v-col>
					
						<v-col cols='auto' class='ma-0 pa-0'>
							<v-btn
								color='primary'
								rounded='lg'
								@click='turn_screen_off'>
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

		<v-row align='center' justify='center' class='ma-0 pa-0 fill-height' v-if='!init && !loading'>
			<v-col cols='8' md='12' class='text-center ma-0 pa-0'>

				<v-row align='center' justify='center' class='ma-0 pa-0'>
					<v-col cols='auto' md='12' class='text-center ma-0 pa-0 text-h2'>
						Framebox appears offline
					</v-col>
				</v-row>
				<v-row align='center' justify='center' class='ma-0 pa-0 mt-3'>
					<v-col cols='auto' class='ma-0 pa-0 ml-3' v-if='!have_screen_status' >
						<v-btn
							color='primary'
							rounded='lg'
							@click='reload'>
							reload
						</v-btn>
					</v-col>
				</v-row>
			</v-col>
				
		</v-row>
	</v-container>
</template>

<script setup lang="ts">
import { parseMessage } from '@/vanillaTS/messageParser';
import { snackError } from '@/services/snack';
import { ws } from '@/services/WS';
import type { WsIncoming } from '@/types';

const router = useRouter();

const [ loadingStore, statusStore, websocketStore ] = [ loadingModule(), statusModule(), websocketModule() ];
const pageTitle = '';

onMounted(() => {
	browserModule().set_description(``);
	browserModule().set_title(pageTitle);
	init_time_interval();
	loading.value = true;

	/// Ten second timeout to get first message
	window.setTimeout(() => {
		loading.value = false;
	}, 10000);
});

onUnmounted(() => {
	clearTimeout(time_timeout.value);
});

const loading = computed({
	get (): boolean {
		return loadingStore.loading;
	},
	set (b: boolean): void {
		loadingStore.set_loading(b);
	}
});

/// Web socket methods
const screen_status = computed(() => {
	return statusStore.screen_status ?? 'unknown';
});

/// Web socket methods
const init = computed(() => {
	return statusStore.init;
});

/// Time methods
const time_timeout = ref(0);

/// Update the current_time value every second
const init_time_interval = (): void => {
	clearInterval(time_timeout.value);
	time_timeout.value = window.setInterval(() => {
		statusStore.increase_uptimes();
	}, 1000);

};

/// Web socket methods
const ws_connected = computed(() => {
	return websocketStore.connected;
});

/// Request the status of the server
const send_status = (): void => {
	websocketStore.send({ name: 'status' });
};

watch(ws_connected, (i: boolean) => {
	if (i) {
		addWSHandlers();
		send_status();
	}
});

const addWSHandlers = (): void => {
	ws.connection?.addEventListener('message', (data) => {
		try {
			const message = parseMessage(data.data);
			if (!message) throw Error(`can't parse message`);
			wsDataHandler(message);
		} catch (e) {
			const message = e instanceof Error ? e.message : 'ERROR';
			snackError({ message });
		}
	});

	send_status();

	// Although should never have the connection killed
	ws.connection?.addEventListener('close', (_event) => {
		userModule().logout();
	});
};

// should have an array,
const wsDataHandler = async (message: WsIncoming): Promise<void> => {
	loading.value = false;
	statusStore.set_init_true();
	switch (message.data?.name) {
		case 'status': {
			if (message.data.data) statusStore.set_from_status(message.data.data);
			init_time_interval();
			break;
		}

		case 'error': {
			await snackError({ message: message.data.data });
			break;
		}
	}

};

// Reload the page
const reload = (): void => {
	router.go(0);
};

/// Text on the main button
const button_text = computed(() => {

	if (have_screen_status.value) {

		if (statusStore.screen_status === 'On') {
			return 'turn screen OFF';
		} else {
			return 'turn screen ON';
		}
	} else {
		return '';
	}
});

/// Screen status is known?
const have_screen_status = computed(() => {
	return statusStore.have_screen_status;
});

// Send a screen off command
const turn_screen_off = (): void => {
	websocketStore.send({ name: 'screen_off' });
};

// Send a screen on command
const turn_screen_on = (): void => {
	websocketStore.send({ name: 'screen_on' });
};

/// Toggle the screen depending on current screen state
const toggle_screen = async (): Promise<void>=> {
	if (statusStore.screen_status === 'On') {
		turn_screen_off();

	} else if (statusStore.screen_status === 'Off') {
		turn_screen_on();
	}
};

</script>

<style>
.v-btn__content {
	width: 100%
}
</style>