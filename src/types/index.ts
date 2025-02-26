export type u<T> = T | undefined;
export type nu = u<number>;
export type su = u<string>;

export type Snack = {
	message?: string;
	icon?: string;
	timeout?: number;
	closable?: boolean;
	loading?: boolean;
} & Partial<SnackPosition>;

export type Positions = 'bottom' | 'left' | 'right' | 'top';

export type SnackPosition = {
	x: u<Positions>;
	y: u<Positions>; 
};

export type Error = {
	message: string;
	code: number; 
};

export type ScreenStatus = 'On' | 'Off';

type IncomingNameData<T extends IncomingMessageName, U> = {
	name: T;
	data?: U; 
};
type OutgoingNameData<T extends OutgoingMessageName, U> = {
	name: T;
	body?: U; 
};

type OutgoingMessageName = 'status' | 'screen_on' | 'screen_off';
type IncomingMessageName = 'status' | 'error';

export type Status = Record<'screen_status' | 'version' | 'ip_address', string>
	& Record<'uptime' | 'uptime_app' | 'uptime_ws', number> & Record<'time_on' | 'time_off', [number, number]>;

export type ComputedCity = Record<'value' | 'title', string>;

export type WsIncoming = {
	data?: IncomingNameData<'status', Status> | IncomingNameData<'error', string>;
	cache?: boolean;
	unique?: boolean;
	error?: Error; 
};

export type wsOutGoing = OutgoingNameData<'status', undefined> |
	OutgoingNameData<'screen_on', undefined> |
	OutgoingNameData<'screen_off', undefined>;