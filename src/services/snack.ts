import type { Snack } from '@/types'
import { mdiAlertCircle, mdiCheckCircleOutline } from '@mdi/js'

export async function snackSuccess ({ message = 'Success', icon = mdiCheckCircleOutline, timeout = 5000, loading = false }: Snack): Promise<void> {
	const snackbar_store = snackbarStore()
	snackReset()
	snackbar_store.set_icon(icon)
	snackbar_store.set_loading(loading)
	snackbar_store.set_message(message)
	snackbar_store.set_timeout(timeout)
	snackbar_store.set_error(false)
	snackbar_store.set_visible(true)
}

export async function snackError ({ message = 'error', icon = mdiAlertCircle, timeout = 7500 }: Snack): Promise<void> {
	const snackbar_store = snackbarStore()
	snackReset()
	snackbar_store.set_icon(icon)
	snackbar_store.set_message(message)
	snackbar_store.set_timeout(timeout)
	snackbar_store.set_error(true)
	snackbar_store.set_visible(true)
}

export function snackReset (): void {
	const snackbar_store = snackbarStore()
	snackbar_store.$reset()
}
