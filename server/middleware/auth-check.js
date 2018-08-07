const User = require('../models').User;
const config = require('../config/config.js');
const jwt = require('jsonwebtoken');

module.exports = function authorize(req, res, next) {
    if(!req.header('token')
        || req.header('token') == null
        || req.header('token') == undefined) {
        return res.status(401).send({message: 'Unable to authenticate'});
    }

    try {
        //verify if can update a profile by checking if has valid token
        var currentUser = jwt.verify(req.header('token'), config.secret);

        if(currentUser.userId) {
            User.findById(currentUser.userId)
                .then(user => {
                    req.currentUser = user.id;
                    next();
                })
                .catch((err, user) => {
                    if (err || !user) {
                        return res.status(401).send({message: 'Unable to authenticate'});
                    }
                });
        } else {
            req.currentUser = false;
            next();
        }
    } catch (error) {
        req.currentUser = false;
        next();
    }
}
