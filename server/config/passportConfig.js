var User = require('../models/User.js');
// configAuth is using Google API's client secret, client ID. You'll need to create your own Google API client secret and client ID.
const configAuth = require('./auth.js');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = function(passport){

    // serializeUser takes the whole user object and stores the user_id in the RAM.
    passport.serializeUser(function(user, done) {
        console.log('serializeUser user id: ' + user._id);
        done(null, user._id);
    });

    // deserializeUser is how to get the hashed data back when you need it.
    passport.deserializeUser(function(_id, done) {
        console.log('_id for logout----' + _id);
        User.findById(_id, function(err, user) {
            done(err, user);
        });
    });

    //Here we use the Google Strategy to authenticate the user.
    passport.use(new GoogleStrategy({
        clientID: configAuth.clientID,
        clientSecret: configAuth.clientSecret,

        // FOR PRODUCTION:
        // callbackURL: 'http://nullops.org:3000/auth/google/callback'

        callbackURL: 'http://hunted.tenoutoftintravels.com:3000/auth/google/callback'

    }, (accessToken, refreshToken, profile, done) => {
        //Query the database to see if the user exists.
        User.findOne({ google_id: profile.id}, function(err, user){
            if(err){
                return done(err);
            }
            if(user){
                return done(null, user);
            } else {
                //If user does not exists, create new instance of User and set properties to equal corresponding properties from the Google profile object.
                //Then save to the database.
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
