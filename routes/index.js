import express from 'express';
import passport from 'passport';

import splashRoutes from './splash.routes';

const router = express.Router();

router.use(splashRoutes);

router.get('/test', (req, res) => res.sendStatus(200));
router.get('/fail', (req, res) => res.sendStatus(401));

router.post('/login', passport.authenticate('local'), (req, res) => res.sendStatus(200));

router.use((req, res) => {
  res.render('index');
});

export default router;
