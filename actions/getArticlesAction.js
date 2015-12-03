import ApplicationStore from '../stores/ApplicationStore';

function getArticlesAction(context, payload) {
	var socket = context.getStore(ApplicationStore).getSocket();

	return new Promise((resolve, reject) => {
		socket.emit('getArticles', {}, (response) => {
			if (response.error === true) reject(response);
			context.dispatch('FETCH_ARTICLES_ACTION', response);
			resolve();
		});
	}).catch((e) => {
		console.log(e);
		context.dispatch('ERROR_ACTION', e);
	});
}

export default getArticlesAction;
