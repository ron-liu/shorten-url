import React from'react'
import {connect} from 'react-redux'
import {withState, withHandlers, compose} from 'recompose'
import {setError, toShorten} from "./shorten.duck";
import classnames from 'classnames'

const Message = ({status, message}) => (
	<p className={classnames({
		error: status === 'ERROR',
		shortened: status ==='SHORTENED',
		message: true
	})}>
		{status === 'ERROR' ? message : (status === 'SHORTENED' ? 'Successfully shortened': ' ')}
	</p>
)

const Shorten = props => {
	const { state: {inputtedUrl}, onChange, onSubmit, status, message} = props
	return (
		<div className='Shorten'>
			<form className='input-box' onSubmit={onSubmit}>
				<input value={inputtedUrl} onChange={onChange} className={status === 'ERROR'? 'error': ''}/>
				<button>Shorten</button>
			</form>
			<Message status={status} message={message} />
		</div>
	)
}

const validate = url => {
	if (typeof url !== 'string') {
		return 'please enter a url'
	}
	url = url.trim()
	if (!url) {
		return 'please enter a url'
	}
	const urlReg = /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})$/
	if (!urlReg.test(url)) {
		return 'please enter a valid url'
	}
	return null
}

export default compose(
	withState('state', 'setState', {inputtedUrl: ''}),
	connect(
		state => ({...state.shorten}),
		dispatch => ({
			shorten: url => dispatch(toShorten(url)),
			setError: message => dispatch(setError(message))
		})
	),
	withHandlers({
		onChange: props => event => props.setState({inputtedUrl: event.target.value}),
		onSubmit: props => event => {
			event.preventDefault();
			const { state: {inputtedUrl}, shorten, setError} = props
			const error = validate(inputtedUrl)
			if (error) {
				setError(error)
				return;
			}
			shorten(inputtedUrl)
		}
	})
)(Shorten)
