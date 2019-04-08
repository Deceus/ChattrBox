const http = require('http');
module.exports = async (sessionParser, app, req) => {
    const res = new http.ServerResponse(req);
    const ctx = app.createContext(req, res);
    await sessionParser(ctx, async () => {});
    return ctx.session;
};