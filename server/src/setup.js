import bodyParser from 'body-parser'
import {inflate, shorten} from "./controller";
import express from 'express'
import cors from 'cors'
import {sync} from "./model";

const wrapController = controller => (req, res, next) => {
	(async () => {
		try {
			await controller(req, res, next)
		}
		catch (e) {
			next(e)
		}
	})()
}
const setupMiddlewares = app => {
	app.use(cors())
	app.use(bodyParser.json())
	return app
}

const setupRoutes = app => {
	app.post('/shorten', wrapController(shorten))
	app.get('/:key', wrapController(inflate))
}

const setupErrorHandler = app => {
	app.use(function (err, req, res, next) {
		console.error(err.stack)
		res.status(500).send('Something broke!')
	})
}

export const createApp = async () => {
	console.log('NODE_ENV:', process.env.NODE_ENV)
	await sync()
	const app = express()
	setupMiddlewares(app)
	setupRoutes(app)
	setupErrorHandler(app)
	return app
}
