import ApplicationStore from '../stores/ApplicationStore';

function postArticleAction(context, payload) {
	var socket = context.getStore(ApplicationStore).getSocket(),
		token = context.getStore(ApplicationStore).getToken();

	payload.token = token;
	return new Promise((resolve, reject) => {
		socket.emit('postArticle', payload, (response) => {
			if (response.error === true) reject(response);
			context.dispatch('LOG_ACTION', response);
			resolve();
		});
	}).catch((e) => {
		console.log(e);
		context.dispatch('ERROR_ACTION', e);
	});
}

export default postArticleAction;
