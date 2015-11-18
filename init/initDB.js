import orientdb from 'orientjs';

function initDB(payload) {
	if (payload) {
		var server = orientdb({
			host: payload.host,
			port: payload.port,
			username: payload.username,
			password: payload.password
		});
	}

	server.list().then((dbs) => {
		for (var i = 0, len = dbs.length; i < len; i++) {
			if (dbs[i].name === payload.dbName) {
				throw({error: true, message: "dbName already used"});
			}
		}
		return server.create({name: payload.dbName, type: 'graph', storage: 'plocal'});
	}).then((db) => {
		console.log('Created a database called ' + payload.dbName);
		process.exit();
	}).catch((e) => {
		if (e.error = true) console.log(e);
		else console.log({error: true, message: e.message});
		process.exit();
	});
}

export default initDB;
