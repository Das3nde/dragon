import chalk from 'chalk';
import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';

import splashRoutes from './splash.routes';

const User = mongoose.model('User');

const router = express.Router();

router.use(splashRoutes);

router.get('/test', (req, res) => res.sendStatus(200));
router.get('/fail', (req, res) => res.sendStatus(401));

router.get('/user', (req, res) => {
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

router.post('/login', passport.authenticate('local'), (req, res) => res.sendStatus(200));

router.get('/logout', (req, res) => {
  req.logout();
  return res.sendStatus(200);
});

router.post('/set-password', (req, res, next) => {
  if (req.user) {
    const _id = req.user._id;
    console.log(chalk.blue('Password set request from user with id:'), _id);
    User.findOne({ _id }).exec()
      .then((user) => {
        if (user.hasPassword) return res.sendStatus(400);

        user.password = req.body.password;
        return user.save();
      })
      .then(() => res.sendStatus(200))
      .catch(err => next(err));
  }
});

router.use((req, res) => {
  res.render('index');
});

export default router;
