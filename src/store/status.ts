import { defineStore } from 'pinia';
import { ModuleName } from '@/types/const_module';
import type { ScreenStatus, Status } from '@/types';

export const statusModule = defineStore(ModuleName.STATUS, {

	state: () => ({
		uptime_app: 0,
		uptime_ws: 0,
		uptime: 0,
		timezone: '',
		ip_address: '',
		time_on: [0, 0],
		time_off: [0, 0],
		version: '',
		screen_status: undefined as undefined | ScreenStatus,
		init: false
	}),

	getters: {
		have_screen_status (): boolean {
			return this.screen_status === 'Off' || this.screen_status === 'On';
		}
	},

	actions: {
		set_screen_status (x: string) {
			if (x === 'On' || x === 'Off') {
				this.screen_status = x;
			}
		},
		set_uptime (x: number) {
			this.uptime = x;
		},
		set_uptime_app (x: number) {
			this.uptime_app = x;
		},
		set_uptime_ws (x: number) {
			this.uptime_ws = x;
		},
		set_version (x: string) {
			this.version = x;
		},
		set_ip_address (x: string) {
			this.ip_address = x;
		},
		set_time_on (x: [number, number]) {
			this.time_on = x;
		},
		set_time_off (x: [number, number]) {
			this.time_off = x;
		},
		set_time (s: string): void {
			this.timezone = s;
		},

		// Set all values
		set_from_status (x: Status) {
			this.set_uptime(x.uptime);
			this.set_screen_status(x.screen_status);
			this.set_uptime_app(x.uptime_app);
			this.set_uptime_ws(x.uptime_ws);
			this.set_version(x.version);
			this.set_ip_address(x.ip_address);
			this.set_time_on(x.time_on);
			this.set_time(x.timezone);
			this.set_time_off(x.time_off);
		},

		set_init_true () {
			this.init = true;
		},

		// Increase the uptimes by one second
		increase_uptimes () {
			this.uptime++;
			this.uptime_app++;
			this.uptime_ws++;
		}

	}
});
