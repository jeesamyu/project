 const mongoose = require('mongoose');
const passport = require('passport');
 const User = mongoose.model('User');
 const _ = require('lodash');
 const jwthelper = require('../config/jwthelper');
 module.exports.register = (req,res,next) =>{
    var user = new User();
    user.fullname = req.body.fullname;
    user.email = req.body.email;
    user.password = req.body.password;
    user.save((err, doc) => {
        if (!err) 
            res.send(doc);
            else{
                if(err.code === 11000)
                res.status(422).send(['Dublicate email address found']);
                else
                return next(err);
            }
    } )
};

module.exports.authenticate = (req, res, next) => {
    // call for passport authentication
    passport.authenticate('local', (err, user, info) => {       
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user
        else if (user) return res.status(200).json({ "token": user.generateJwt() });
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
}

module.exports.userProfile = (res, req , next) => {
    User.findOne({ _id : req._id },
        (err,user) => {
            if(!user)
            return res.status(404).json({ status : false , message : 'User record not found' });
            else
            return res.status(200).json({ status : true ,user : _.pick(user,['fullname','email']) });
        })
}