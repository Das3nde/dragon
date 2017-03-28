import cipher from 'simple-cipher';
import mongoose from 'mongoose';
import passport from 'passport';
import passportLocal from 'passport-local';

const User = mongoose.model('User');

passport.use(new passportLocal.Strategy({
  usernameField: 'email',
  passwordField: 'password',
}, (_email, _password, done) => {
  // Necessary because emails are stored as ciphered text
  const email = cipher.encrypt(_email, 'email');

  User.findOne({ email }).select('password code').exec()
    .then((user) => {
      console.log(user);

      // 1. Username must be correct
      // 2. If no password, code must be correct
      // 3. If password, password must be correct

      if (
        (!user) ||
        (!user.password && user.code !== _password) ||
        (user.password && !user.comparePassword(_password))
      ) {
        return done(null, false, { message: 'Incorrect username or password' });
      }

      return done(null, user);
    })
    .catch(err => done(err));
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
