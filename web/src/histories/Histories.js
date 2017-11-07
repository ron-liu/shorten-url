import React from 'react'
import {connect} from 'react-redux'
import classnames from 'classnames'

const History = ({originalUrl, shortenedUrl, justAdded}) => (
	<div className={classnames({History: true, justAdded})}>
		{justAdded && <p>Result is: </p>}
		<p>Original Url: <a href={originalUrl}>{originalUrl}</a></p>
		<p>Shortened Url: <a href={shortenedUrl}>{shortenedUrl}</a></p>
	</div>
)

const Histories = props => {
	const {histories} = props
	return (
		<div>{histories.map(History)}</div>
	)
}

export default
connect(
	store => ({histories: store.histories})
)
(Histories)

