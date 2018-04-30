let LocalStrategy = require('passport-local');
let User = require('../models/users');

module.exports = function(passport){
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use('local-register', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    }, (req, email, password, done) => {
        process.nextTick(()=>{
            User.findOne({email: email}, (err, user) => {
                console.log(user)
                if(err)
                    return done(err);

                if(user){
                    return done(null, false, req.flash('signupMessage', 'That email is already token.'));
                }else{
                    let newUser = new User();
                    newUser.email = email;
                    newUser.password = newUser.generateHash(password);
                    newUser.save((err)=> {
                        if(err)
                            throw err;
                        return done(null, newUser)
                    })
                }
            })
        })
    }) )

    passport.use('local-login', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true 
    },
    function(req, email, password, done) { 
        User.findOne({ email :  email }, function(err, user) {
            if (err)
                return done(err);

            if (!user)
                return done(null, false, req.flash('loginMessage', 'No user found.'));

            if (!user.validPassword(password))
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

            return done(null, user);
        });

    }));
}