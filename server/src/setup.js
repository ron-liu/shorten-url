import bodyParser from 'body-parser'
import {inflate, shorten} from "./controller";
import express from 'express'

const setupMiddlewares = app => {
	app.use(bodyParser.json())
	return app
}

const setupRoutes = app => {
	app.post('/shorten', shorten)
	app.get('/:key', inflate)
}

export const createApp = () => {
	console.log('NODE_ENV:', process.env.NODE_ENV)
	const app = express()
	setupMiddlewares(app)
	setupRoutes(app)
	return app
}
