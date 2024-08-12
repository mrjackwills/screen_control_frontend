<template>
	<v-container class='fill-height ma-0 pa-0' fluid>

		<v-row align='center' justify='center' no-gutters class='fill-height ma-0 pa-0'>
			<v-col cols='12' class='ma-0 pa-0'>

				<v-row align='center' justify='center' no-gutters >
					<v-col cols='9' md='5'>
						<v-form v-on:submit.prevent autocomplete='off'>
							<v-row class='ma-0 pa-0' justify='center'>
								<v-col cols='12' class='ma-0 pa-0'>
									<v-text-field
										v-model='password'
										@click:prepend-inner='prependClick'
										@keydown.enter='login' :error='passwordError'
										:error-messages='passwordError ? "incorrect password" : ""'
										:prepend-inner-icon='eyeIcon' :type='inputType' bg-color='offwhite'
										autocomplete='password'
										class='ma-0 pa-0'
										label='password required'
										clearable
										persistent-hint
									/>
								</v-col>
								<v-col cols='12' class='ma-0 pa-0'>
									<v-row class='ma-0 pa-0' justify='center'>
										<v-col cols='auto' class='ma-0 pa-0'>
											<v-btn
												@click='login'
												:disabled='buttonDisabled'
												color='primary'
												rounded='lg'
											>
												login
											</v-btn>
										</v-col>

									</v-row>
								</v-col>
							</v-row>
						</v-form>
					</v-col>
				</v-row>

			</v-col>
		</v-row>
	</v-container>
</template>

<script setup lang="ts">
import { axiosRequests } from '@/services/axios';
import { FrontendRoutes } from '@/types/enum_routes';
import { mdiEye, mdiEyeOff } from '@mdi/js';
import { snackReset } from '@/services/snack';
import { useRouter } from 'vue-router';
import type { VBtn } from 'vuetify/components/VBtn';
import { VTextField } from 'vuetify/lib/components/index.mjs';

const router = useRouter();
const loadingStore = loadingModule();

const pageTitle = 'login';

onMounted(() => {
	browserModule().set_description(pageTitle);
	browserModule().set_title(pageTitle);

	// for (const i of [ 25, 50, 75, 100, 125, 150, 175, 200, 225, 250 ]) {
	// 	window.setTimeout(auto_fill, i);
	// }
});

// const autologin = ref(false);
// /// If the login is autofilled, then log in automatically
// const auto_fill = async (): Promise<void> => {
// 	// if autologin.value
// 	if (password.value && !autologin.value) {
// 		autologin.value = true;
// 		await login();
// 	}
// };

const buttonDisabled = computed((): boolean => {
	return loading.value || password.value.length < 1 || passwordError.value;
});

const loading = computed({
	get (): boolean {
		return loadingStore.loading;
	},
	set (b: boolean): void {
		loadingStore.set_loading(b);
	}
});

const passwordVisible = ref(false);
const password = ref('');
const passwordError = ref(false);

const eyeIcon = computed((): string => {
	return passwordVisible.value ? mdiEyeOff : mdiEye;
});
const inputType = computed((): string => {
	return passwordVisible.value ? 'text' : 'password';
});
const prependClick = (): void => {
	if (loading.value) return;
	passwordVisible.value = !passwordVisible.value;
};

watch(password, (_) => {
	if (passwordError.value) {
		passwordError.value = false;
	}
});

const login = async (): Promise<void> => {
	if (!password.value) return;
	passwordVisible.value = false;
	loading.value = true;
	const response = await axiosRequests.wsAuth_post(password.value);
	loading.value = false;
	if (response) {
		// eslint-disable-next-line require-atomic-updates
		password.value = '';
		snackReset();
		router.push(FrontendRoutes.BASE);
	} else {
		passwordError.value = true;
	}
};

</script>

<style scoped>
.v-messages__message {
	color: var(--v-theme-error) !important;
}
</style>