import Article from '../../../../lib/Article.class.js';
import * as lib from '../../../../lib/lib';
import DB from '../../../../db';

function deleteArticleById(socket) {
	socket.on('deleteArticleById', (payload, done) => {
		if (!payload || !payload.id || !payload.token)
			done(lib.newError(400, 'No payload provided'));
		else {
			var	rid = lib.hexToStr(payload.id),
				article = undefined,
				db = new DB();

			lib.verifyAdminToken(db.db, payload.token).then((result) => {
				if (result.error === true) throw(result);
				return Article.getArticleById(db.db, rid);
			}).then((record) => {
				if (!record || record['@class'] !== 'Article')
					throw(lib.newError(400, "ID is'nt valid"));
				article = new Article(record);
				article.db = db.db;
				return article.putData();
			}).then(() => {
				return article.deleteAutorLink(lib.hexToStr(article.autor.id));
			}).then(() => {
				return article.deleteComments();
			}).then(() => {
				var data = article.getPublicData();
				socket.broadcast.emit('deletedArticle', data);
				db.db.close();
				db.server.close();
				done(data);
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

export default deleteArticleById;
