import ApplicationStore from '../stores/ApplicationStore';
import {navigateAction} from 'fluxible-router';

function postSignUpAction(context, payload) {
	var socket = context.getStore(ApplicationStore).getSocket();

	return new Promise((resolve, reject) => {
		socket.emit('postSignUp', payload, (response) => {
			if (response.error === true) reject(response);
			context.dispatch('LOG_ACTION', response);
			resolve();
		});
	}).then(() => {
		context.executeAction(navigateAction, {url: '/'});
	}).catch((e) => {
		console.log(e);
		context.dispatch('ERROR_ACTION', e);
	});
}

export default postSignUpAction;
