import 'babel-core/register';
import chalk from 'chalk';
import throng from 'throng';

import './dotenv.config';
import app from './express';

const WORKERS = process.env.WEB_CONCURRENCY || 1;

const startScript = (id) => {
  app.listen(app.get('port'), () => {
    console.log(chalk.yellow(`Express server (${id}) listening on port ${app.get('port')}`));
  });
};

throng(WORKERS, startScript);
