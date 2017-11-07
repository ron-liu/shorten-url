import React from'react'
import {connect} from 'react-redux'
import {withState, withHandlers, compose} from 'recompose'
import {toShorten} from "./shorten.duck";
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

export default compose(
	withState('state', 'setState', {inputtedUrl: ''}),
	connect(
		state => ({...state.shorten}),
		dispatch => ({
			shorten: url => dispatch(toShorten(url))
		})
	),
	withHandlers({
		onChange: props => event => props.setState({inputtedUrl: event.target.value}),
		onSubmit: props => event => {
			const { state: {inputtedUrl}, shorten} = props
			
			shorten(inputtedUrl)
			event.preventDefault();
		}
	})
)(Shorten)
