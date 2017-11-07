import reducer from '../shorten.duck'

it('send fetching should work', () => {
	expect(reducer(undefined, {type: 'shorten/shortening'}))
	.toEqual({status: 'SHORTENING'})
})
it('send fetched should work', () => {
	expect(reducer(undefined, {type: 'shorten/shortened'}))
	.toEqual({status: 'SHORTENED'})
})
it('send fetching should work', () => {
	expect(reducer(undefined, {type: 'shorten/error', message: 'oops'}))
	.toEqual({status: 'ERROR', message: 'oops'})
})
it('send fetching should work', () => {
	expect(reducer({status: 'SHORTENED'}, {type: 'what ever'}))
	.toEqual({status: 'SHORTENED'})
})
