import config from '../../config/configServer.json';
import User from './User.class.js';
import jwt from 'jsonwebtoken';

export function newError(code, informations) {
	var err = {
		code: code,
		error: true,
		informations: informations
	};

	if (err.code === 400) {
		err.message = 'Bad request';
	} else if (err.code === 401) {
		err.message = 'Unauthorized';
	} else if (err.code === 403) {
		err.message = 'Forbidden';
	} else if (err.code === 404) {
		err.message = 'Not Found';
	} else if (err.code === 410) {
		err.message = 'Gone';
	} else {
		err.code = err.code || 500;
		err.message = 'Internal Server Error';
	}
	return err;
}

export function strToHex(str) {
	var retStr = '';

	for (var i = 0; i < str.length; i++) retStr += str.charCodeAt(i).toString(16);
	return retStr;
}

export function hexToStr(hex) {
	var hex = hex.toString(),
		retStr = '';

	for (var i = 0; i < hex.length; i += 2) {
		retStr += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
	}
	return retStr;
}

export function createWebToken(name, rid, accountType, expireMins = 2520) {
	return jwt.sign({
		name: name,
		id: strToHex(rid),
		accountType: accountType
	}, config.tokenSecret, {expiresIn: expireMins * 60});
}

export function verifyToken(db, token) {
	return new Promise((resolve, reject) => {
		if (token) {
			jwt.verify(token, config.tokenSecret, (err, decoded) => {
				if (err) reject(newError(403, 'Failed to authenticate token'));
				decoded.rid = hexToStr(decoded.id);
				User.getUserById(db, decoded.rid).then((record) => {
					var user = new User(record);
					user.db = db;
					if (user.verifyLastToken(token) === true) resolve(decoded);
					else reject(newError(403, 'Failed to authenticate token'));
				}).catch((e) => {
					console.log(e);
					reject(newError(403, "Token's id isn't a valid id"));
				});
			});
		} else reject(newError(403, 'No token provided'));
	});
}

export function verifyAdminToken(db, token) {
	return new Promise((resolve, reject) => {
		if (token) {
			jwt.verify(token, config.tokenSecret, (err, decoded) => {
				if (err) reject(newError(403, 'Failed to authenticate token'));
				var account = decoded.accountType;

				if (account !== 'admin' && account !== 'superAdmin')
					reject(newError(403, 'Bad account type'));
				decoded.rid = hexToStr(decoded.id);
				User.getUserById(db, decoded.rid).then((record) => {
					var user = new User(record);
					user.db = db;
					if (user.verifyLastToken(token) === true) resolve(decoded);
					else reject(newError(403, 'Failed to authenticate token'));
				}).catch((e) => {
					console.log(e);
					reject(newError(403, "Token's id isn't a valid id"));
				});
			});
		} else reject(newError(403, 'No token provided'));
	});
}

export function verifySuperAdminToken(db, token) {
	return new Promise((resolve, reject) => {
		if (token) {
			jwt.verify(token, config.tokenSecret, (err, decoded) => {
				if (err) reject(newError(403, 'Failed to authenticate token'));
				var account = decoded.accountType;

				if (account !== 'superAdmin') reject(newError(403, 'Bad account type'));
				decoded.rid = hexToStr(decoded.id);
				User.getUserById(db, decoded.rid).then((record) => {
					var user = new User(record);
					user.db = db;
					if (user.verifyLastToken(token) === true) resolve(decoded);
					else reject(newError(403, 'Failed to authenticate token'));
				}).catch((e) => {
					console.log(e);
					reject(newError(403, "Token's id isn't a valid id"));
				});
			});
		} else reject(newError(403, 'No token provided'));
	});
}
