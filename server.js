import 'babel-core/register';

import chalk from 'chalk';
import dotenv from 'dotenv';
import throng from 'throng';

import app from './express';

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  dotenv.load();
}

const WORKERS = process.env.WEB_CONCURRENCY || 1;

const startScript = (id) => {
  app.listen(app.get('port'), () => {
    console.log(chalk.yellow(`Express server (${id}) listening on port ${app.get('port')}`));
  });
};

throng(WORKERS, startScript);
