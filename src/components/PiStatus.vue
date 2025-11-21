<template>
	<v-row align='center' class='ma-0 pa-0' justify='center'>
		<v-col class='text-caption ma-0 pa-0' cols='12'>

			<v-row class='ma-0 pa-0' justify='space-between'>

				<v-col class='ma-0 pa-0 text-md-left text-left unselectable ' cols='6' md='4'>
					<span>backend version: </span><span class='font-weight-bold'>{{ backend_version }}</span>
				</v-col>

				<v-col class='ma-0 pa-0 text-md-center text-right' cols='6' md='4'>
					<span class='unselectable'>ip address: </span><span class='font-weight-bold'>{{ ip_address }}</span>
				</v-col>

				<v-col class='ma-0 pa-0 text-md-right text-left unselectable' cols='6' md='4'>
					<span>frontend version: </span><span class='font-weight-bold'>{{ env.app_version }}</span>
				</v-col>

				<v-col class='ma-0 pa-0 text-md-left text-right unselectable' cols='6' md='4'>
					<span>uptime app: </span><span class='font-weight-bold'>{{ uptime_app }}</span>
				</v-col>

				<v-col class='ma-0 pa-0 text-md-center text-left unselectable' cols='6' md='4'>
					<span>uptime ws: </span><span class='font-weight-bold'>{{ uptime_ws }}</span>
				</v-col>

				<v-col class='ma-0 pa-0 text-md-right text-right unselectable' cols='6' md='4'>
					<span>uptime: </span><span class='font-weight-bold'>{{ uptime }}</span>
				</v-col>

				<v-col class='ma-0 pa-0 text-md-left text-left unselectable' cols='auto'>
					<span>time on: </span><span class='font-weight-bold'>{{ time_on }}</span>
				</v-col>

				<v-col class='ma-0 pa-0 text-md-left text-left unselectable' cols='auto'>
					<span>current time: </span><span class='font-weight-bold'>{{ current_time }}</span>
				</v-col>

				<v-col class='ma-0 pa-0 text-md-right text-left unselectable' cols='auto'>
					<span>time off: </span><span class='font-weight-bold'>{{ time_off }}</span>
				</v-col>
			</v-row>
		</v-col>
	</v-row>
</template>

<script setup lang='ts'>
import { env } from '@/vanillaTS/env'
import { secondsToText } from '@/vanillaTS/secondsToText'
import { zeroPad } from '@/vanillaTS/zeropad'

const statusStore = statusModule()

const backend_version = computed(() => statusStore.version)
const ip_address = computed(() => statusStore.ip_address)
const uptime = computed(() => secondsToText(statusStore.uptime))
const uptime_app = computed(() => secondsToText(statusStore.uptime_app))
const uptime_ws = computed(() => secondsToText(statusStore.uptime_ws))

const current_time = ref('')

onMounted(() => {
	set_current_time()
})

// Uptime is increased every second in the HomeView.vue, by watching we can update the current_time on the same schedule
watch(uptime, () => {
	set_current_time()
})

function set_current_time (): void {
	const tzOptions: Intl.DateTimeFormatOptions = {
		timeZone: statusStore.timezone,
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric',
		hour12: false,
	}
	const tempDate = new Intl.DateTimeFormat([], tzOptions)
	const formattedDate = tempDate.format(new Date())
	const time = {
		hours: Number(formattedDate.toString().slice(0, 2)),
		minutes: Number(formattedDate.toString().slice(3, 5)),
		seconds: Number(formattedDate.toString().slice(6, 8)),
	}
	current_time.value = `${zeroPad(time.hours)}:${zeroPad(time.minutes)}:${zeroPad(time.seconds)}`
}

const time_on = computed(() => `${zeroPad(statusStore.time_on[0] ?? 0)}:${zeroPad(statusStore.time_on[1] ?? 0)}`)
const time_off = computed(() => `${zeroPad(statusStore.time_off[0] ?? 0)}:${zeroPad(statusStore.time_off[1] ?? 0)}`)

</script>
