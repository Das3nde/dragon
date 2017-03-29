import mongoose from 'mongoose';
import passport from 'passport';
import passportLocal from 'passport-local';

const User = mongoose.model('User');

passport.use(new passportLocal.Strategy({
  usernameField: 'email',
  passwordField: 'password',
}, (_email, _password, done) => {
  User.login(_email, _password)
    .then((user) => {
      if (!user) return done(null, false);
      return done(null, user);
    })
    .catch(err => done(err));
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).exec()
    .then(user => done(null, user));
});
