const api = require('koa-router')();

api.get('/users', async ctx => {
    var users = await User.find();
    ctx.body = users.map(
        ({ id, email, name }) => ({ id, email, name })
    );

    //     ctx.body = [{
    //         id: 1,
    //         email: 'clark.kent@bignerdranch.com',
    //         name: 'Clark Kent'
    //     }, {
    //         id: 2,
    //         email: 'diana.prince@bignerdranch.com',
    //         name: 'Diana Prince'
    //     },
    //     {
    //       id: 3,
    //       email: 'chris.castor.us@gmail.com',
    //       name: 'Chris Castor'
    //   }];
});

api.get('/users/me', async ctx => {
    var { id, email, name } = ctx.state.user;
    ctx.body = { id, email, name };
});
module.exports = api;