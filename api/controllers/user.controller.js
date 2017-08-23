'use strict'
var mongoose = require('mongoose');
var crypto = require('crypto');
var User = mongoose.model('User');

exports.create = function (req, res) {

    var data = req.body ? req.body : {};

    var new_user = new User(data);
    new_user.save(function (err, result) {
        if (err) {
            if (err.code === 11000) {
                return res.json({status: 0, msg: 'This email already exist!'});
            }
            return res.json({status: 0, msg: 'Parameter is missing or server error!', error: err});

        }
        else {
            res.json({status: 200, msg: 'User created', data: result});
        }
    });

}

exports.login = function (req, res) {
    var userData = req.body ? req.body : {};

    User.findOne({'email': userData.email, 'is_deleted': false}, function (err, user) {
        if (err) {
            return res.json(err);
        }
        if (!user) {
            return res.json({status: 0, msg: 'Invalid email try again !'});
        }
        if (user) {
            var password = crypto.pbkdf2Sync(userData.password, user.salt, 1000, 64).toString('hex');

            User.findOne({'email': userData.email, 'password': password}, function (err, userlogin) {
                if (err) {
                    return res.json(err);
                }
                if (!userlogin) {
                    return res.json({status: 0, msg: "Wrong password try again ! "});
                }
                if (userlogin) {
                    var login_details = {name: userlogin.first_name, token: userlogin.generateJwt()}
                    res.json({status: 200, msg: "Login success", data: login_details});
                }
            })
        }
    });
}

exports.list = function (req, res) {
    var data = req.body ? req.body : {};
    var offset = parseInt(data.offset);
    var rows = parseInt(data.rows);
    User.paginate({is_deleted: false}, {offset: offset, limit: rows}, function (err, result) {
        if (err) {
            return res.json({status: 0, msg: "Error while geting user List", data: err});
        }
        else {
            User.find({is_deleted: false}).count(function (err, count) {
                if (err) {
                    return res.json({status: 0, msg: "Error while counting user List", data: err});
                }
                else {
                    res.json({status: 200, msg: "user list success", count: count, data: result.docs});
                }

            })

        }
    });


}


exports.delete = function (req, res) {

    var data = req.params ? req.params : {};

    if (data.user_id) {

        User.update({_id: data.user_id}, {$set: {is_deleted: true, updated_date: Date.now()}}, function (err, user) {
            if (err) {
                res.json({status: 0, msg: 'Error while deleting user!', data: err});
            } else {
                console.log(user);
                res.json({status: 200, msg: 'User deleted successfully!'});
            }
        })

    }
    else {
        res.json({status: 0, msg: 'parameters missing!'});
    }

}

exports.update = function (req, res) {

    var data = req.body ? req.body : null;

    if (data) {
        User.update({_id: data._id}, {
            $set: {
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email
            }
        }, function (err, user) {

            if (err) {
                if (err.code === 11000) {
                    return res.json({status: 0, msg: 'This email already exist!'});
                }

                return res.json({status: 0, msg: 'Error while updating user details!', data: err});
            } else {
                console.log(user);
                res.json({status: 200, msg: 'User details updaetd successfully!'});
            }
        })

    } else {
        res.json({status: 0, msg: 'parameters missing!'});
    }

}
