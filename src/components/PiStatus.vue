<template>
	<v-row align='center' justify='center' class='ma-0 pa-0'>
		<v-col cols='12' class='text-caption ma-0 pa-0'>

			<v-row justify='space-between' class='ma-0 pa-0'>

				<v-col cols='6' md='4' class='ma-0 pa-0 text-md-left text-left unselectable '>
					<span >backend version: </span><span class='font-weight-bold'>{{ backend_version }}</span>
				</v-col>

				<v-col cols='6' md='4' class='ma-0 pa-0 text-md-center text-right'>
					<span class='unselectable'>ip address: </span><span class='font-weight-bold'>{{ ip_address }}</span>
				</v-col>

				<v-col cols='6' md='4' class='ma-0 pa-0 text-md-right text-left unselectable'>
					<span >frontend version: </span><span class='font-weight-bold'>{{ env.app_version }}</span>
				</v-col>

				<v-col cols='6' md='4' class='ma-0 pa-0 text-md-left text-right unselectable'>
					<span >uptime app: </span><span class='font-weight-bold'>{{ uptime_app }}</span>
				</v-col>

				<v-col cols='6' md='4' class='ma-0 pa-0 text-md-center text-left unselectable'>
					<span >uptime ws: </span><span class='font-weight-bold'>{{ uptime_ws }}</span>
				</v-col>

				<v-col cols='6' md='4' class='ma-0 pa-0 text-md-right text-right unselectable'>
					<span >uptime: </span><span class='font-weight-bold'>{{ uptime }}</span>
				</v-col>

				<v-col cols='auto' class='ma-0 pa-0 text-md-left text-left unselectable'>
					<span >time on: </span><span class='font-weight-bold'>{{ time_on }}</span>
				</v-col>

				<v-col cols='auto' class='ma-0 pa-0 text-md-right text-left unselectable'>
					<span >time off: </span><span class='font-weight-bold'>{{ time_off }}</span>
				</v-col>
			</v-row>
		</v-col>
	</v-row>
</template>

<script setup lang='ts'>
import { env } from '@/vanillaTS/env';
import { secondsToText } from '@/vanillaTS/secondsToText';
import { zeroPad } from '@/vanillaTS/zeropad';

const statusStore = statusModule();

const ip_address = computed(() => {
	return statusStore.ip_address;
});

const uptime_app = computed(() => {
	return secondsToText(statusStore.uptime_app);
});

const uptime_ws = computed(() => {
	return secondsToText(statusStore.uptime_ws);
});

const uptime = computed(() => {
	return secondsToText(statusStore.uptime);
});

const time_on = computed(() => {
	const hour = zeroPad(statusStore.time_on[0]);
	const minute = zeroPad(statusStore.time_on[1]);
	return `${hour}:${minute}`;
});

const time_off = computed(() => {
	const hour = zeroPad(statusStore.time_off[0]);
	const minute = zeroPad(statusStore.time_off[1]);
	return `${hour}:${minute}`;
});
const backend_version = computed(() => {
	return statusStore.version;
});

</script>