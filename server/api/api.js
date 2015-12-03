import postArticles from './v1/articles/postArticle';
import getArticles from './v1/articles/getArticles';
import postSignUp from './v1/auth/postSignUp';
import postAuth from './v1/auth/postAuth';
import getAdmin from './v1/auth/getAdmin';

function socketAPI(socket) {
	// Articles
	postArticles(socket);
	getArticles(socket);

	// Auth
	postAuth(socket);
	getAdmin(socket);

	// signUp
	postSignUp(socket);
	socket.on('error', (payload) => {
		socket.emit('errorMSG', payload);
	});
}

export default socketAPI;
