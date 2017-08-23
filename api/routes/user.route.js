'use strict'

module.exports = function (route) {
    var userCtrl = require('../controllers/user.controller');
    var auth = require('../auth/middleware');

    route.post('/user', userCtrl.create);

    route.post('/user/list',auth.isAuth, userCtrl.list);

    route.post('/user/auth', userCtrl.login)

    route.delete('/user/:user_id',auth.isAuth, userCtrl.delete);

    route.put('/user/:user_id',auth.isAuth, userCtrl.update);

};


