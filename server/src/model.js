import Sequelize from 'sequelize'
import Config from './config'
console.log('881', Config)
const {database, username, password, option} = Config.dbConnection
const sequelize = new Sequelize(database, username, password, option)
export const UrlModel = sequelize.define('url', {
	id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true}, // I think 4 billion is enough
	originalUrl: {type: Sequelize.STRING(2048), unique: true},
	shortenedUrl: {type: Sequelize.STRING(8), unique: true}
})
export const sync = opt => sequelize.sync(opt)