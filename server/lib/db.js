import config from '../../config/configDB.json';
import orientdb from 'orientjs';

class DB {
	constructor() {
		this.server = orientdb({
			host: config.host,
			port: config.port,
			username: config.username,
			password: config.password
		});
		this.db = this.server.use(config.dbName);
	}
}

export default DB;
