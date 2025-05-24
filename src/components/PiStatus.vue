<template>
	<v-row align='center' justify='center' class='ma-0 pa-0'>
		<v-col cols='12' class='text-caption ma-0 pa-0'>

			<v-row justify='space-between' class='ma-0 pa-0'>

				<v-col cols='6' md='4' class='ma-0 pa-0 text-md-left text-left unselectable '>
					<span>backend version: </span><span class='font-weight-bold'>{{ backend_version }}</span>
				</v-col>

				<v-col cols='6' md='4' class='ma-0 pa-0 text-md-center text-right'>
					<span class='unselectable'>ip address: </span><span class='font-weight-bold'>{{ ip_address }}</span>
				</v-col>

				<v-col cols='6' md='4' class='ma-0 pa-0 text-md-right text-left unselectable'>
					<span>frontend version: </span><span class='font-weight-bold'>{{ env.app_version }}</span>
				</v-col>

				<v-col cols='6' md='4' class='ma-0 pa-0 text-md-left text-right unselectable'>
					<span>uptime app: </span><span class='font-weight-bold'>{{ uptime_app }}</span>
				</v-col>

				<v-col cols='6' md='4' class='ma-0 pa-0 text-md-center text-left unselectable'>
					<span>uptime ws: </span><span class='font-weight-bold'>{{ uptime_ws }}</span>
				</v-col>

				<v-col cols='6' md='4' class='ma-0 pa-0 text-md-right text-right unselectable'>
					<span>uptime: </span><span class='font-weight-bold'>{{ uptime }}</span>
				</v-col>

				<v-col cols='auto' class='ma-0 pa-0 text-md-left text-left unselectable'>
					<span>time on: </span><span class='font-weight-bold'>{{ time_on }}</span>
				</v-col>

				<v-col cols='auto' class='ma-0 pa-0 text-md-left text-left unselectable'>
					<span>current time: </span><span class='font-weight-bold'>{{ current_time }}</span>
				</v-col>

				<v-col cols='auto' class='ma-0 pa-0 text-md-right text-left unselectable'>
					<span>time off: </span><span class='font-weight-bold'>{{ time_off }}</span>
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

const backend_version = computed(() => statusStore.version);
const ip_address = computed(() => statusStore.ip_address);
const uptime = computed(() => secondsToText(statusStore.uptime));
const uptime_app = computed(() => secondsToText(statusStore.uptime_app));
const uptime_ws = computed(() => secondsToText(statusStore.uptime_ws));

const current_time = ref('');

onMounted(() => {
	set_current_time();
});

// Uptime is incrased every second in the HomeView.vue, by watching we can update the current_time on the same schedule
watch(uptime, () => {
	set_current_time();
});

const set_current_time = (): void => {
	const tzOptions: Intl.DateTimeFormatOptions = {
		timeZone: statusStore.timezone,
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric',
		hour12: false
	};
	const tempDate = new Intl.DateTimeFormat([], tzOptions);
	const formattedDate = tempDate.format(new Date());
	const time = {
		hours: Number(formattedDate.toString().substring(0, 2)),
		minutes: Number(formattedDate.toString().substring(3, 5)),
		seconds: Number(formattedDate.toString().substring(6, 8))
	};
	current_time.value = `${zeroPad(time.hours)}:${zeroPad(time.minutes)}:${zeroPad(time.seconds)}`;
};

const time_on = computed(() => `${statusStore.time_on[0]}:${statusStore.time_on[1]}`);
const time_off = computed(() => `${statusStore.time_off[0]}:${statusStore.time_off[1]}`);

</script>
