import ApplicationStore from '../stores/ApplicationStore';
import {navigateAction} from 'fluxible-router';

function getAdminAction(context, payload) {
	var socket = context.getStore(ApplicationStore).getSocket(),
		token = context.getStore(ApplicationStore).getToken();

	return new Promise((resolve, reject) => {
		socket.emit('getAdmin', {token: token}, (response) => {
			if (response.error === true) reject(response);
			context.dispatch('GET_ADMIN_ACTION', response);
			resolve();
		});
	}).catch((e) => {
		console.log(e);
		context.executeAction(navigateAction, {url: '/', type: 'click'});
		context.dispatch('ERROR_ACTION', e);
	});
}

export default getAdminAction;
