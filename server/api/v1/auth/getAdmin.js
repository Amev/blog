import * as lib from '../../../lib/lib';
import DB from '../../../lib/db';

function getAdmin(socket) {
	socket.on('getAdmin', (payload, done) => {
		if (!payload || !payload.token)
			done(lib.newError(400, 'No payload or token provided'));
		else {
			var token = payload.token,
				db = new DB();

			lib.verifyAdminToken(db.db, token).then((result) => {
				if (result.error === true) throw(result);
				db.db.close();
				db.server.close();
				done({message: 'success auth'});
			}).catch((e) => {
				console.log(e);
				if (e.error !== true)
					e = lib.newError(500, 'Internal server error');
				db.db.close();
				db.server.close();
				done(e);
			});
		}
	});
}

export default getAdmin;
