const Koa = require('koa');
const send = require('koa-send');
const serve = require('koa-static');

const app = new Koa();
app.use(serve(`${__dirname}/build`));
app.listen(3000);
console.log('listening on port 3000');