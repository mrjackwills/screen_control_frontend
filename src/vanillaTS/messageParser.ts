import { isString } from '@/types/typeguard';
import { parse } from 'secure-json-parse';
import type { WsIncoming } from '@/types';

export const parseMessage = (message: unknown): WsIncoming | undefined=> {
	try {
		if (!isString(message)) throw Error('not string');
		const tmpData: WsIncoming = parse(message, undefined, {
			protoAction: 'remove',
			constructorAction: 'remove' 
		});
		if (!tmpData.data && !tmpData?.error) throw Error('Invalid data');
		return tmpData;
	} catch {
		return undefined;
	}
};