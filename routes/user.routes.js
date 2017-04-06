import chalk from 'chalk';
import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';

const User = mongoose.model('User');

const router = express.Router();

router.get('/', (req, res) => {
  if (req.user) {
    return res.send(req.user);
  }

  return res.sendStatus(404);
});

router.get('/login', (req, res, next) => {
  if (req.user) {
    return res.redirect('/korea/main');
  }

  return next();
});

router.get('/test', passport.verify, (req, res) => res.sendStatus(200));

router.post('/login', passport.authenticate('local'), (req, res) =>
    res.status(200).send(req.user));

router.post('/set-password', passport.verify, (req, res, next) => {
  const _id = req.user._id;
  console.log(chalk.blue('Password set request from user with id:'), _id);
  User.findOne({ _id }).exec()
    .then((user) => {
      if (user.hasPassword) return res.sendStatus(400);

      user.password = req.body.password;
      return user.save();
    })
    .then(user => res.status(200).send(user))
    .catch(err => next(err));
});

router.post('/reserve', passport.verify, (req, res, next) => {
  const _id = req.user._id;
  User.findOne({ _id }).exec()
    .then((user) => {
      const _reservation = Object.assign({ }, user.reservation);
      req.body.reservation.forEach((item) => {
        const status = 'reserved';
        const guest = item.guest || false;
        const date = Date.now();

        _reservation[item.id] = { status, guest, date };
      });
      user.reservation = _reservation;
      return user.save();
    })
    .then(user => res.status(200).send(user))
    .catch(err => next(err));
});

router.get('/logout', (req, res) => {
  req.logout();
  return res.sendStatus(200);
});

export default router;
