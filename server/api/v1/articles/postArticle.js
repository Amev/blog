import config from '../../../../config/configServer.json';
import Article from '../../../lib/Article.class.js';
import * as lib from '../../../lib/lib';
import DB from '../../../lib/db';
import fs from 'fs';

function postArticle(socket) {
	socket.on('postArticle', (payload, done) => {
		if (!payload || !payload.token)
			done(lib.newError(400, 'No payload provided'));
		else {
			var	mediasURI = payload.mediaURI,
				content = payload.content,
				resume = payload.resume,
				title = payload.title,
				article = undefined,
				decoded = undefined,
				db = new DB();

			resume = resume.slice(0, 50);
			resume = resume[49] === '.' ? resume + '..' : resume + '...';
			lib.verifyAdminToken(db.db, payload.token).then((result) => {
				if (result.error === true) throw(result);
				else if (!mediasURI || !content || !title)
					throw(lib.newError(400, 'Missing some datas'));
				decoded = result;
				article = new Article({
					mediasURI: mediasURI,
					content: content,
					resume: resume,
					title: title
				});
				article.db = db.db;
				return article.postArticleDB();
			}).then((response) => {
				article.rid = response['@rid'].toString();
				return article.postAutorEdge(decoded.rid);
			}).then(() => {
				return article.putData();
			}).then(() => {
				var	fileData = new Buffer(article.mediasURI.data, 'base64'),
					pathName = config.medias;

				article.medias = article.id + '.' + article.mediasURI.type;
				fs.writeFileSync(pathName + article.medias, fileData);
				return article.putMediasDB();
			}).then(() => {
				var articles = new Array(article.getPublicData());
				socket.broadcast.emit('sendArticles', articles);
				db.db.close();
				db.server.close();
				done(articles);
			}).catch((e) => {
				console.log(e);
				if (e.error !== true) e = lib.newError(500, 'Internal server error');
				db.db.close();
				db.server.close();
				done(e);
			});
		}
	});
}

export default postArticle;
