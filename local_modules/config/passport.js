import cipher from 'simple-cipher';
import mongoose from 'mongoose';
import passport from 'passport';
import passportLocal from 'passport-local';

const User = mongoose.model('User');

passport.use(new passportLocal.Strategy({
  usernameField: 'email',
  passwordField: 'code',
}, (_email, code, done) => {
  const email = cipher.encrypt(_email, 'email');
  User.findOne({ email }).select('code').exec()
    .then((user) => {
      console.log(user);
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      /*
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      */
      if (user.code !== code) {
        return done(null, false, { message: 'Invalid code.' });
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
