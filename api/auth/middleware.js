var mongoose = require('mongoose');
var User = mongoose.model('User');

exports.isAuth = function (req, res, next) {
    console.log('====>is auth', req.body, req.headers['token']);

    if (!req.headers['token'] || req.headers['token'] === 'undefined') {
        return res.json({status: 500, msg: 'invalid request'})
    }
    var token = req.headers['token'];

    var user = new User();
    user.verifyToken(token, function (valid) {
        if (!valid) {
            return res.json({status: 203, msg: 'invalid tokens,please login again'});
        }
        else {
            next();
        }
    })

}