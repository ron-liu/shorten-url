import React, {Component} from 'react';
import './App.css';
import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import Shorten from "./shorten/Shorten";
import histories from './histories/histories.duck'
import Histories from './histories/Histories'
import shorten from './shorten/shorten.duck'

const composeEnhancers =
	typeof window === 'object' &&
	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
			// Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
		}) : compose;

let store = createStore(
	combineReducers({
		histories,
		shorten
	}),
	composeEnhancers(applyMiddleware(thunk))
)

const App = () => {
	return (
		<Provider store = {store}>
		<div className="App">
			<header className="App-header">
				<h1 className="App-title">Welcome to Shorten Url   --for nintex 88</h1>
			</header>
			<div className="App-Content">
				<Shorten/>
				<Histories/>
			</div>
		</div>
		</Provider>
	);
}

export default App;

console.log(`bootstrapped with NODE_ENV: ${process.env.NODE_ENV} and API_SERVER: ${process.env.REACT_APP_API_SERVER}`)
