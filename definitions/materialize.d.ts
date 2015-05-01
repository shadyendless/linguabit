/**
 * 
 * Materialize definitions for TypeScript
 * author - Jacob Foster - dalindeck@gmail.com
 * 
 * supports Materialize 0.96.1
 */
 
 interface JQuery {
	 sideNav(action?: string): Function;
	 openModal(): Function;
	 closeModal(): Function;
	 material_select(): Function;
	 characterCounter(): Function;
 }
 
 declare module Materialize {
	 function toast(message: string, time?: number, style?: string, callback?: Function): void;
 }
 