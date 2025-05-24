import { ConstT } from '@/types';

export const FrontendRoutes = {
	BASE: '/',
	LOGIN: '/login',
	CATCHALL: '/:pathMatch(.*)*'
} as const;

export type FrontendRoutes = ConstT<typeof FrontendRoutes>;
