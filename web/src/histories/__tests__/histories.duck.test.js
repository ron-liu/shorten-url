import reducer, {addShortenedUrl} from '../histories.duck'

it('first add should work', () => {
	expect(
		reducer(undefined, addShortenedUrl({originalUrl: 'http://www.google.com', shortenedUrl:'http://g.c/a'}))
	).toEqual([
		{originalUrl: 'http://www.google.com', shortenedUrl:'http://g.c/a', justAdded: true}
	])
})

it('first add should work', () => {
	expect(
		reducer(
			[
				{originalUrl: 'o1', shortenedUrl: 's1'},
				{originalUrl: 'o2', shortenedUrl: 's2'},
			],
			addShortenedUrl({originalUrl: 'o0', shortenedUrl:'s0'}))
	).toEqual([
		{originalUrl: 'o0', shortenedUrl: 's0', justAdded: true},
		{originalUrl: 'o1', shortenedUrl: 's1'},
		{originalUrl: 'o2', shortenedUrl: 's2'},
	])
})

it('replace should work', () => {
	expect(
		reducer(
			[
				{originalUrl: 'o1', shortenedUrl: 's1'},
				{originalUrl: 'o2', shortenedUrl: 's2'},
			],
			addShortenedUrl({originalUrl: 'o2', shortenedUrl:'s2'}))
	).toEqual([
		{originalUrl: 'o2', shortenedUrl: 's2', justAdded: true},
		{originalUrl: 'o1', shortenedUrl: 's1'},
	])
})

it('at most 3', () => {
	expect(
		reducer(
			[
				{originalUrl: 'o1', shortenedUrl: 's1'},
				{originalUrl: 'o2', shortenedUrl: 's2'},
				{originalUrl: 'o3', shortenedUrl: 's3'},
			],
			addShortenedUrl({originalUrl: 'o0', shortenedUrl:'s0'}))
	).toEqual([
		{originalUrl: 'o0', shortenedUrl: 's0', justAdded: true},
		{originalUrl: 'o1', shortenedUrl: 's1'},
		{originalUrl: 'o2', shortenedUrl: 's2'},
	])
})
