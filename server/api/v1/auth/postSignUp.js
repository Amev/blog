import User from '../../../lib/User.class.js';
import * as lib from '../../../lib/lib';
import DB from '../../../lib/db';

function postSignUp(socket) {
	socket.on('postSignUp', (payload, done) => {
		if (!payload) done(lib.newError(400, 'No payload provided'));
		else {
			var	firstName = payload.firstName,
				lastName = payload.lastName,
				password = payload.password,
				email = payload.email,
				token = undefined,
				user = undefined;

			if (email && password && firstName && lastName) {
				var db = new DB();

				User.getUserByEmail(db.db, email).then((result) => {
					if (result.length !== 0)
						throw(lib.newError(400, 'Email already used'));
					user = new User({
						firstName: firstName,
						accountType: 'user',
						lastName: lastName,
						email: email,
						db: db.db
					});
					user.setPassword(password);
					return user.postUserDB();
				}).then((response) => {
					user.rid = response['@rid'].toString();
					token = lib.createWebToken(user.email, user.rid, 'user');
					return user.saveLastToken(token);
				}).then(() => {
					db.db.close();
					db.server.close();
					done({
						token: token,
						accountType: user.accountType,
						email: user.email,
						id: lib.strToHex(user.rid),
						isLog: true
					});
				}).catch((e) => {
					console.log(e);
					if (e.error !== true)
						e = lib.newError(500, 'Internal server error');
					db.db.close();
					db.server.close();
					done(e);
				});
			}
			else done(lib.newError(400, 'Missing some data'));
		}
	});
}

export default postSignUp;
