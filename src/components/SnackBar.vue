<template>
	<v-snackbar v-model='visible' timeout='-1' color='black'>
		<v-row justify='center' align='center' no-gutters class='ma-0 pa-0 unselectable'>
			<v-col v-if='icon && !loading' cols='auto' class=''>
				<v-icon color='error' :icon='icon' />
			</v-col>
			<v-col v-if='loading' cols='auto' class=''>
				<v-progress-circular indeterminate :size='18' :width='3' color='danger' />
			</v-col>
			<v-col cols='auto' class='mx-3 ma-0 pa-0 danger--text'>
				{{ message }}
			</v-col>
		</v-row>
	</v-snackbar>

</template>

<script setup lang='ts'>

const snackbar = snackbarStore();

const icon = computed(() => snackbar.icon);
const loading = computed({
	get (): boolean {
		return snackbar.loading;
	},
	set (b: boolean): void {
		snackbar.set_loading(b);
	}
});
const message = computed({
	get (): string {
		return snackbar.message;
	},
	set (s: string): void {
		snackbar.set_message(s);
	}
});
const snackTimeout = computed({
	get (): number {
		return snackbar.timeout;
	},
	set (nu: number): void {
		snackbar.set_timeout(nu);
	}
});
const visible = computed({
	get (): boolean {
		return snackbar.visible;
	},
	set (b: boolean): void {
		snackbar.set_visible(b);
	}
});

const timeout = ref(0);

const closeSnackbar = (): void => {
	visible.value = false;
	snackbar.$reset();
	clearTimeout(timeout.value);
	timeout.value = 0;
};
watch(visible, (i) => {
	if (i && snackTimeout) timeout.value = window.setTimeout(() => {
		closeSnackbar();
	}, snackTimeout.value);
});
</script>