<template>
	<v-snackbar v-model='visible' color='black' timeout='-1'>
		<v-row align='center' class='ma-0 pa-0 unselectable' justify='center' no-gutters>
			<v-col v-if='icon && !loading' class='' cols='auto'>
				<v-icon color='error' :icon />
			</v-col>
			<v-col v-if='loading' class='' cols='auto'>
				<v-progress-circular color='danger' indeterminate :size='18' :width='3' />
			</v-col>
			<v-col class='mx-3 ma-0 pa-0 danger--text' cols='auto'>
				{{ message }}
			</v-col>
		</v-row>
	</v-snackbar>

</template>

<script setup lang='ts'>

const snackbar = snackbarStore()

const icon = computed(() => snackbar.icon)
const loading = computed({
	get (): boolean {
		return snackbar.loading
	},
	set (b: boolean): void {
		snackbar.set_loading(b)
	},
})
const message = computed({
	get (): string {
		return snackbar.message
	},
	set (s: string): void {
		snackbar.set_message(s)
	},
})
const snackTimeout = computed({
	get (): number {
		return snackbar.timeout
	},
	set (nu: number): void {
		snackbar.set_timeout(nu)
	},
})
const visible = computed({
	get (): boolean {
		return snackbar.visible
	},
	set (b: boolean): void {
		snackbar.set_visible(b)
	},
})

const timeout = ref(0)

function closeSnackbar (): void {
	visible.value = false
	snackbar.$reset()
	clearTimeout(timeout.value)
	timeout.value = 0
}
watch(visible, i => {
	if (i && snackTimeout) timeout.value = window.setTimeout(() => {
		closeSnackbar()
	}, snackTimeout.value)
})
</script>
