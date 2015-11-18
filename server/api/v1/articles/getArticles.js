import Article from '../../../lib/Article.class.js';
import * as lib from '../../../lib/lib';
import DB from '../../../lib/db';

function getArticles(socket) {
	socket.on('getArticles', (payload, done) => {
		var result = new Array(),
			db = new DB();

		Article.getArticles(db.db).then((response) => {
			var promiseMap = response.map((res) => {
				var article = new Article(res);

				article.db = db.db;
				return new Promise((resolve, reject) => {
					return article.putData().then(() => {
						result.push(article.getPublicData());
						resolve();
					});
				});
			});
			return Promise.all(promiseMap);
		}).then(() => {
			db.db.close();
			db.server.close();
			done(result);
		}).catch((e) => {
			console.log(e);
			if (e.error !== true) e = lib.newError(500, 'Internal server error');
			db.db.close();
			db.server.close();
			done(e);
		});
	});
}

export default getArticles;
