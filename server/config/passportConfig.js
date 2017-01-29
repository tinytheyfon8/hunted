var User = require('../models/User.js');
const configAuth = require('./auth.js');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = function(passport){

    passport.serializeUser(function(user, done) {
        console.log('serializeUser user id: ' + user._id);
        done(null, user._id);
    });

    passport.deserializeUser(function(_id, done) {
        console.log('_id for logout----' + _id);
        User.findById(_id, function(err, user) {
            done(err, user);
        });
    });
    
    passport.use(new GoogleStrategy({
        clientID: configAuth.clientID,
        clientSecret: configAuth.clientSecret,
        callbackURL: "http://localhost:3000/auth/google/callback"
    }, (accessToken, refreshToken, profile, done) => {
        User.findOne({ google_id: profile.id}, function(err, user){
            if(err){
                return done(err);
            }
            if(user){
                return done(null, user);
            } else {
                var newUser = new User();
                newUser.name = profile.displayName;
                newUser.google_id = profile.id;
                newUser.email = profile.emails[0].value;
                newUser.save((err, user) => {
                    if (err) {
                        return done(err);
                    }
                    if(user){
                        return done(null, newUser);
                    } 
                });
            }
        });
        }
    ));
}