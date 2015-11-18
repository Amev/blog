import * as lib from './lib';

class Comment {
	contructor(params) {
		if (params) {
			this.user = params.user;
			this.content = params.content;
			this.postDate = params.postDate || new Date();
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

	static getCommentById(db, id) {
		return db.record.get(id);
	}

	static deleteCommentById(db, id) {
		return db.record.delete(id);
	}

	postCommentDB() {
		return this.db.create('VERTEX', 'Comment')
		.set({
			postDate: this.postDate,
			content: this.content
		}).one();
	}

	postCommentedByEdge(id) {
		return this.db.create('EDGE', 'CommentedBy')
		.from(this.rid)
		.to(id)
		.scalar();
	}

	deleteCommentedByEdge(id) {
		return this.db.delete('EDGE', 'CommentedBy')
		.from(this.rid)
		.to(id)
		.scalar();
	}

	postCommentLinkEdge(id) {
		return this.db.create('EDGE', 'CommentLink')
		.from(id)
		.to(this.rid)
		.one();
	}

	deleteCommentLinkEdge(id) {
		return this.db.delete('EDGE', 'CommentLink')
		.from(id)
		.to(this.rid)
		.scalar();
	}

	getUser() {
		var	query = "SELECT FROM (SELECT EXPAND(OUTE('CommentedBy').INV()) FROM ";
		query += this.rid + ") WHERE @class='User'";

		return this.db.query(query);
	}

	putData() {
		var user = undefined;

		this.id = lib.strToHex(this.rid);
		return new Promise((resolve, reject) => {
			return this.getUser().then((users) => {
				user = new User(users[0]);
				this.user = user.getPublicData();
				resolve();
			});
		});
	}

	getPublicData() {
		return {
			postDate: this.postDate,
			content: this.content,
			user: this.user,
			id: this.id
		}
	}
}

export default Comment;
