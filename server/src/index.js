import 'babel-polyfill'
import Config from './config'
import {createApp} from "./setup";

createApp()
.then(app => app.listen(
	Config.port,
	() => console.log(`started server at ${Config.port}, environment is: ${process.env.NODE_ENV}`))
)
