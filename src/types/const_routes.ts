import { ConstT } from '@/types';

export const FrontendRoutes = {
	BASE: '/' as const,
	LOGIN: '/login' as const,
	CATCHALL: '/:pathMatch(.*)*' as const
};

export type FrontendRoutes = ConstT<typeof FrontendRoutes>;