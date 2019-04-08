const http = require('http');
const wss = require('./websockets-server');
const api = require('./api');
const compress = require('koa-compress');
const serve = require('koa-static')
const Koa = require('koa');
const auth = require('./auth');
const VerifyClient = require('./verify-client');
const passport = require('koa-passport');
const convert = require('koa-convert');
const session = require('koa-generic-session');
const SESSION_SECRET = process.env.SESSION_SECRET
const mount = require('koa-mount');

const app = new Koa();

app.keys = [SESSION_SECRET];
const sessionParser = convert(session({ key: 'chattrbox.sid' }));
app.use(sessionParser);
const extractSession = require('./extract-session').bind(undefined, sessionParser, app);
const authApi = auth({ passport });
app.use(passport.initialize());
app.use(passport.session());
app.use(authApi.routes());
app.use(auth.redirect);

app.use(compress());
app.use(serve('./app'));
app.use(mount('/api', api.routes()))

const server = http.createServer(app.callback());
const verifyClient = VerifyClient(extractSession);
wss(server, verifyClient)

server.listen(3000);