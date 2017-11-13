// actions
import {shorten} from "../services";
import {addShortenedUrl} from '../histories/histories.duck'

const SHORTENING = 'shorten/shortening'
const SHORTENED = 'shorten/shortened'
const ERROR = 'shorten/error'
const READY = 'shorten/ready'
const TO_SHORTEN = 'shorten/shorten'

const initState = {status: 'READY'}

export default (state = initState, action) => {
	switch (action.type) {
		case SHORTENING:
			return {status: 'SHORTENING'}
		case SHORTENED:
			return {status: 'SHORTENED'}
		case ERROR:
			return {status: 'ERROR', message: action.message}
		case READY:
			return {status: 'READY'}
		default:
			return state
	}
}

export const setError = (message) => ({type: ERROR, message})

export const toShorten = originalUrl => dispatch => {
	dispatch({type: SHORTENING})
	return shorten(originalUrl)
	.then(({url}) => {
		dispatch({type: SHORTENED})
		dispatch(addShortenedUrl({originalUrl, shortenedUrl: url}))
		setTimeout(() => dispatch({type: READY}), 2000)
	})
	.catch(err => dispatch(setError( err.message)))
}

