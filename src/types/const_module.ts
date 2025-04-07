import { ConstT } from '@/types';

export const ModuleName = {
	BROWSER: 'browser' as const,
	LOADING: 'loading' as const,
	SETTINGS: 'settings' as const,
	SNACKBAR: 'snackbar' as const,
	STATUS: 'status' as const,
	USER: 'user' as const,
	WEBSOCKET: 'websocket' as const
};
export type ModuleName = ConstT<typeof ModuleName>;