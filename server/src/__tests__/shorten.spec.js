import {createApp} from '../setup'
import request from 'supertest'
import {sync} from '../model'
import Config from '../config'

let agent
const originalUrl = 'http://www.example.com/123456abcdefg'
beforeEach(async done => {
	const app = createApp()
	agent = request(app)
	await sync({force: true})
	done()
})

it('simplest case', async () => {
	const shortenedUrl = await agent.post('/shorten')
	.send({url: originalUrl})
	.expect(200)
	.then(res => {
		expect(res.body).toHaveProperty('url')
		return res.body.url
	})
	
	expect(shortenedUrl).toContain(Config.urlPrefix)
	
	await agent.get(`/${shortenedUrl.replace(Config.urlPrefix, '')}`)
	.expect(301)
	.expect('Location', originalUrl)
})

it('same original url should return same shortened url', async () => {
	const shortenedUrl1 = await agent.post('/shorten')
	.send({url: originalUrl})
	.expect(200)
	.then(res => res.body.url)
	
	const shortenedUrl2 = await agent.post('/shorten')
	.send({url: originalUrl})
	.expect(200)
	.then(res => res.body.url)
	
	expect(shortenedUrl1).toBe(shortenedUrl2)
})

it('non-existed shortened url should return 404', async() => {
	await agent.get(`/non-existed`)
	.expect(404)
})