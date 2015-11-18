import ApplicationStore from '../stores/ApplicationStore';
import closeDialogAction from './closeDialogAction';

function postAuthAction(context, payload) {
	var socket = context.getStore(ApplicationStore).getSocket();

	return new Promise((resolve, reject) => {
		socket.emit('postAuth', payload, (response) => {
			if (response.error === true) reject(response);
			context.dispatch('LOG_ACTION', response);
			resolve();
		});
	}).then(() => {
		context.executeAction(closeDialogAction, {});
	}).catch((e) => {
		console.log(e);
		context.dispatch('ERROR_ACTION', e);
	});
}

export default postAuthAction;
