import config from '../../config/configServer.json';
import User from './User.class.js';
import * as lib from './lib';

class Article {
	constructor(params) {
		if (params) {
			this.title = params.title;
			this.autor = params.autor;
			this.medias = params.medias;
			this.content = params.content;
			this.mediaURL = params.mediaURL || '';
			this.commentCount = params.commentCount || 0;
			this.postDate = params.postDate || new Date();
			this.comments = params.comments || new Array();
			if (params.mediasURI) {
				var reg = new RegExp('^data:image/([a-z]{2,4});base64,(.+)$', 'i'),
					matches = params.mediasURI.match(reg);

				if (matches.length !== 3) throw(lib.newError(400, 'Error file data'));
				else this.mediasURI = {type: matches[1], data: matches[2]};
			}
			if (params['@rid']) {
				this.rid = typeof params['@rid'] === 'string'
					? params['@rid'] : params['@rid'].toString();
			} else if (params.rid) {
				this.rid = typeof params.rid === 'string'
					? params.rid : lib.ridToString(params.rid);
			} else this.rid = '';
			this.id = this.rid !== '' ? lib.strToHex(this.rid) : '';
			this.db = params.db;
		}
	}

	static getArticleById(db, id) {
		return db.record.get(id);
	}

	static deleteArticleById(db, id) {
		return db.record.delete(id);
	}

	static getArticles(db) {
		var query = "SELECT * FROM Article ORDER BY postDate";

		return db.query(query);
	}

	postArticleDB() {
		return this.db.create('VERTEX', 'Article')
		.set({
			postDate: this.postDate,
			content: this.content,
			title: this.title
		}).one();
	}

	putMediasDB() {
		return this.db.update('Article')
		.set({medias: this.medias})
		.where({'@rid': this.rid})
		.one();
	}

	postAutorEdge(id) {
		return this.db.create('EDGE', 'Autor')
		.from(this.rid)
		.to(id)
		.one();
	}

	deleteAutorEdge(id) {
		return this.db.delete('EDGE', 'Autor')
		.from(this.rid)
		.to(id)
		.scalar();
	}

	getAutor() {
		var	query = "SELECT FROM (SELECT EXPAND(OUTE('Autor').INV()) FROM ";
		query += this.rid + ") WHERE @class='User'";

		return this.db.query(query);
	}

	getComments() {
		var	query = "SELECT FROM (SELECT EXPAND(OUTE('CommentLink').INV()) FROM ";
		query += this.rid + ") WHERE @class='Comment' ORDER BY postDate asc";

		return this.db.query(query);
	}

	putData() {
		var autor = undefined;

		this.id = lib.strToHex(this.rid);
		return new Promise((resolve, reject) => {
			return this.getAutor().then((users) => {
				autor = new User(users[0]);
				this.autor = autor.getPublicData();
				return this.getComments();
			}).then((result) => {
				var promiseMap = result.map((res) => {
					var comment = new Comment(res);

					return new Promise((res, rej) => {
						return comment.putData().then(() => {
							this.comments.push(comment.getPublicData());
							res();
						});
					});
				});
				return Promise.all(promiseMap);
			}).then(() => {
				resolve();
			});
		});
	}

	getPublicData() {
		this.commmentCount = this.comments.length;
		this.mediaURL = config.mediasURL + this.medias;
		return {
			commentCount: this.commentCount,
			postDate: this.postDate,
			mediaURL: this.mediaURL,
			content: this.content,
			title: this.title,
			autor: this.autor,
			id: this.id
		};
	}
}

export default Article;
