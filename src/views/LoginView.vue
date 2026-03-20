<template>
	<v-container class='ma-0 pa-0 fill-height d-flex align-center flex-wrap' fluid>

		<v-row class='fill-height ma-0 pa-0 ustify-center align-center'>
			<v-col class='ma-0 pa-0' cols='12'>

				<v-row class='align-center justify-center' density='compact'>
					<v-col cols='9' md='5'>
						<v-form autocomplete='off' @submit.prevent>
							<v-row class='ma-0 pa-0 justify-center'>
								<v-col class='ma-0 pa-0' cols='12'>
									<v-text-field
										v-model='password'
										autocomplete='password'
										bg-color='offwhite'
										class='ma-0 pa-0'
										clearable
										:error='passwordError'
										:error-messages='passwordError ? "incorrect password" : ""'
										label='password required'
										persistent-hint
										:prepend-inner-icon='eyeIcon'
										:type='inputType'
										@click:prepend-inner='prependClick'
										@keydown.enter='login'
									/>
								</v-col>
								<v-col class='ma-0 pa-0' cols='12'>
									<v-row class='ma-0 pa-0 justify-center'>
										<v-col class='ma-0 pa-0' cols='auto'>
											<v-btn
												color='primary'
												:disabled='buttonDisabled'
												rounded='lg'
												@click='login'
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
import type { VBtn } from 'vuetify/components/VBtn'
import { mdiEye, mdiEyeOff } from '@mdi/js'
import { useRouter } from 'vue-router'
import { axiosRequests } from '@/services/axios'
import { snackReset } from '@/services/snack'
import { FrontendRoutes } from '@/types'

const router = useRouter()
const loadingStore = loadingModule()

const pageTitle = 'login'

onMounted(() => {
	browserModule().set_description(pageTitle)
	browserModule().set_title(pageTitle)
})

const buttonDisabled = computed(() => loading.value || password.value.length === 0 || passwordError.value)

const loading = computed({
	get (): boolean {
		return loadingStore.loading
	},
	set (b: boolean): void {
		loadingStore.set_loading(b)
	},
})

const passwordVisible = ref(false)
const password = ref('')
const passwordError = ref(false)

const eyeIcon = computed(() => passwordVisible.value ? mdiEyeOff : mdiEye)
const inputType = computed(() => passwordVisible.value ? 'text' : 'password')
function prependClick (): void {
	if (loading.value) return
	passwordVisible.value = !passwordVisible.value
}

watch(password, _ => {
	if (passwordError.value) {
		passwordError.value = false
	}
})

async function login (): Promise<void> {
	if (!password.value) return
	passwordVisible.value = false
	loading.value = true
	const response = await axiosRequests.wsAuth_post(password.value)
	loading.value = false
	if (response) {
		password.value = ''
		snackReset()
		router.push(FrontendRoutes.BASE)
	} else {
		passwordError.value = true
	}
}

</script>

<style scoped>
.v-messages__message {
	color: var(--v-theme-error) !important;
}
</style>
