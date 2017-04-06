import express from 'express';

import splashRoutes from './splash.routes';
import userRoutes from './user.routes';

const router = express.Router();

router.use(splashRoutes);
router.use('/user', userRoutes);

router.get('/test', (req, res) => res.sendStatus(200));
router.get('/fail', (req, res) => res.sendStatus(401));

router.use((req, res) => {
  res.render('index');
});

export default router;
