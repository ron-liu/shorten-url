const basic = {
	port: 3000,
	urlPrefix: 'http://localhost:3000/',
	dbConnection:{
		option: {
			dialect: 'sqlite',
		}
	},
}

const specifics = {
	production: {},
	test: {
		dbConnection: {
			option: {
				dialect: 'sqlite',
			}
		}
	},
	dev: {}
}

const env = process.env.NODE_ENV || 'dev'

export default { ...basic, ...specifics[env]}
