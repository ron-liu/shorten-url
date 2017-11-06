import {UrlModel} from './model'
import invariant from 'invariant'
import Config from './config'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
const hashInteger = n => {
	let ret = ''
	while (n > 0) {
		ret += CHARS[n % CHARS.length]
		n = parseInt(n / CHARS.length, 10)
	}
	return ret
}

export const shorten = async (req, res) => {
	invariant(req.body.url, 'url is required in request body')
	const {url: originalUrl} = req.body
	const record = await UrlModel.create({originalUrl})
	const shortenedUrl = hashInteger(record.id)
	await UrlModel.update({shortenedUrl}, { where: {id: record.id}})
	res.send({url: `${Config.urlPrefix}${shortenedUrl}`})
}

export const inflate = async (req, res ) => {
	invariant(req.params.key, '/:key is required in request body')
	const {key} = req.params
	const record = await UrlModel.findOne({where: {shortenedUrl: key}})
	if (!record) {
		res.status(404).send('Not found')
		return
	}
	res.set({'Location': record.originalUrl})
	res.status(301).end()
}