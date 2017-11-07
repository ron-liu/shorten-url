
// actions
const ADD = 'histories/add'

export default (state = [], action) => {
	switch (action.type) {
		case ADD :
			const {originalUrl, shortenedUrl} = action
			const filtered = state.filter(x=>x.shortenedUrl !== shortenedUrl)
				.map(x=>({...x, justAdded: undefined}))
				.slice(0, 2)
			return [ {originalUrl, shortenedUrl, justAdded: true}, ...filtered ]
		default:
			return state
	}
}

export const addShortenedUrl = ({originalUrl, shortenedUrl}) => ({
	type: ADD,
	originalUrl,
	shortenedUrl
})