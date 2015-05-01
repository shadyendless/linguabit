/// <reference path="../../../definitions/materialize.d.ts" />

interface INotifications {
	showError(message: string, time?: number): void;
	showSuccess(message: string, time?: number): void;
	showMessage(message: string, time?: number): void;
}

declare var Notifications : INotifications;
Notifications = {
	showError: function(message: string, time: number = 4000) {
		Materialize.toast(`<strong class="red-text">Error</strong>&nbsp; ${message}`, time);
	},	
	showSuccess: function(message: string, time: number = 4000) {
		Materialize.toast(`<strong class="green-text">Success</strong>&nbsp; ${message}`, time);
	},	
	showMessage: function(message: string, time: number = 4000) {		
		Materialize.toast(message, time);
	}
};