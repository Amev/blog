import User from '../../../lib/User.class.js';
import * as lib from '../../../lib/lib';
import DB from '../../../lib/db';

function postAuth(socket) {
	socket.on('postAuth', (payload, done) => {
		if (!payload) done(lib.newError(400, 'No payload provided'));
		else {
			var password = payload.password,
				email = payload.email,
				token = undefined,
				user = undefined;

			if(email && password) {
				var	db = new DB();

				User.getUserByEmail(db.db, email).then((result) => {
					if (result.length === 0)
						throw(lib.newError(401, 'Invalid email'));
					user = new User(result[0]);
					user.db = db.db;
					if (!user.verifyPassword(password))
						throw(lib.newError(401, 'Invalid password'));
					token = {
						token: lib.createWebToken(email, user.rid, user.accountType),
						accountType: user.accountType,
						email: user.email,
						id: user.id,
						isLog: true
					};
					return user.saveLastToken(token.token);
				}).then(() => {
					db.db.close();
					db.server.close();
					done(token);
				}).catch((e) => {
					console.log(e);
					if (e.error !== true)
						e = lib.newError(500, 'Internal server error');
					db.db.close();
					db.server.close();
					done(e);
				});
			} else done(lib.newError(400, 'Email and password required'));
		}
	});
}

export default postAuth;
