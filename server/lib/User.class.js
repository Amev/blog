import * as lib from './lib';
import crypto from 'crypto';

class User {
	constructor(params) {
		if (params) {
			this.email = params.email;
			this.lastName = params.lastName;
			this.firstName = params.firstName;
			this.password = params.password || '';
			this.lastToken = params.lastToken || '';
			this.subDate = params.subDate || new Date();
			this.accountType = params.accountType || 'user';
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

	static getUserById(db, id) {
		return db.record.get(id);
	}

	static getUserByEmail(db, email) {
		var query = 'SELECT * FROM User WHERE email="' + email + '"';

		return db.query(query);
	}

	static getUsers(db) {
		var query = "SELECT * FROM User ORDER BY email";

		return db.query(query);
	}

	static deleteUserById(db, id) {
		return db.record.delete(id);
	}

	deleteUserDB() {
		return this.db.record.delete(this.rid);
	}

	postUserDB() {
		return this.db.create('VERTEX', 'User')
		.set({
			accountType: this.accountType,
			firstName: this.firstName,
			lastName: this.lastName,
			password: this.password,
			subDate: this.subDate,
			email: this.email
		}).one();
	}

	putUserDB() {
		return this.db.update('User')
		.set({
			accountType: this.accountType,
			firstName: this.firstName,
			lastName: this.lastName,
			email: this.email
		})
	}

	getPublicData() {
		this.id = lib.strToHex(this.rid);
		return {
			firstName: this.firstName,
			lastName: this.lastName,
			subDate: this.subDate
		};
	}

	setPassword(password) {
		password = crypto.createHash('sha512').update(password).digest('hex');
		if (this.password && this.password != '' && this.password === password) {
			return false;
		} else {
			this.password = password;
			return true;
		}
	}

	saveLastToken(token) {
		return this.db.update('User')
		.set({lastToken: token})
		.where({'@rid': this.rid})
		.scalar();
	}

	verifyLastToken(token) {
		if (!token.length || !token) return false;
		return this.lastToken === token;
	}

	verifyPassword(passToVerify) {
		passToVerify = crypto.createHash('sha512').update(passToVerify).digest('hex');
		return passToVerify === this.password;
	}
}

export default User;
