import Config from './config'
import {createApp} from "./setup";

const app = createApp()
app.listen(Config.port)
