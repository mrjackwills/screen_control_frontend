import { defineStore, getActivePinia } from 'pinia'
import { snackError } from '@/services/snack'
import { loadingModule } from '@/store/loading'
import { FrontendRoutes, ModuleName } from '@/types'
import { websocketModule } from './websocket'

export const userModule = defineStore(ModuleName.USER, {

	state: () => ({ authenticated: false }),

	actions: {
		logout (message?: string): void {
			this.authenticated = false
			loadingModule().set_loading(false)
			websocketModule().closeWS()
			if (message) {
				snackError({ message })
			}
			getActivePinia()?.router().push(FrontendRoutes.LOGIN)
		},

		set_authenticated (value: boolean) {
			this.authenticated = value
		},
	},
})
