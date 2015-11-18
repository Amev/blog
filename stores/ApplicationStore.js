import {BaseStore} from 'fluxible/addons';
import socket from 'socket.io-client';

class ApplicationStore extends BaseStore {

	constructor(dispatcher) {
		super(dispatcher);
		this.error = new Object();
		this.user = new Object();
		this.socket = undefined;
		this.dialog = false;
		this.signUp = false;
		this.isLog = false;
		this.token = '';
	}

	initSocket() {
		this.socket = socket("http://localhost:3000/");
	}

	initSocketClient(socket) {
		this.socket = socket;
	}

	getSocket() {
		return this.socket;
	}

	getToken() {
		return this.token;
	}

	getError() {
		return this.error;
	}

	getUser() {
		return this.user;
	}

	getDialog() {
		return this.dialog;
	}

	getSignUp() {
		return this.signUp;
	}

	getState() {
		return {
			signUp: this.signUp,
			dialog: this.dialog,
			error: this.error,
			isLog: this.isLog,
			token: this.token,
			user: this.user
		};
	}

	onLogAction(payload) {
		if (payload.isLog === true) {
			this.token = payload.token;
			this.user = {
				accountType: payload.accountType,
				email: payload.email,
				id: payload.id,
			};
			this.isLog = true;
		} else {
			this.user = new Object();
			this.isLog = false;
			this.token = '';
		}
		this.emitChange();
	}

	onReceiveError(payload) {
		if (payload.error === true) {
			this.error = payload;
			this.emitChange();
		}
	}

	onCloseError(payload) {
		this.error = new Object();
		this.emitChange();
	}

	onCloseDialog(payload) {
		this.dialog = false;
		this.signUp = false;
		this.emitChange();
	}

	onOpenDialog(payload) {
		this.dialog = true;
		this.signUp = false;
		this.emitChange();
	}

	onSwitchSign(payload) {
		this.signUp = this.signUp === false;
		this.emitChange();
	}

	dehydrate() {
		return this.getState();
	}

	rehydrate(state) {
		this.user = state.user;
		this.isLog = state.isLog;
		this.token = state.token;
		this.error = state.error;
		this.dialog = state.dialog;
		this.signUp = state.signUp;
	}
}

ApplicationStore.storeName = 'ApplicationStore';
ApplicationStore.handlers = {
	'CLOSE_DIALOG_ACTION': 'onCloseDialog',
	'OPEN_DIALOG_ACTION': 'onOpenDialog',
	'CLOSE_ERROR_ACTION': 'onCloseError',
	'SWITCH_SIGN_ACTION': 'onSwitchSign',
	'ERROR_ACTION': 'onReceiveError',
	'LOG_ACTION': 'onLogAction'
};

export default ApplicationStore;
