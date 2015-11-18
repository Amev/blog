export default {
	properties: {
		hostDB: {
			description: "DB hostname (default='localhost')",
			type: "string",
			default: "localhost"
		},
		portDB: {
			description: "DB port (default=2424)",
			type: "number",
			default: 2424
		},
		userDB: {
			description: "DB username (default='root')",
			type: "string",
			default: "root"
		},
		passDB: {
			description: "DB password (required)",
			type: "string",
			hidden: true,
			required: true
		},
		DBName: {
			description: "New DB name (required)",
			type: "string",
			required: true,
			pattern: /^[a-zA-Z]+$/,
			message: "DB name be only letters"
		}
	}
}
