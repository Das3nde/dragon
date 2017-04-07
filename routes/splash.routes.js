import chalk from 'chalk';
import express from 'express';
import jade from 'jade';
import mongoose from 'mongoose';

import mailgun from 'config/mailgun';
import BadRequestError from 'errors/bad-request.error';

const User = mongoose.model('User');
const TempUser = mongoose.model('TempUser');

const codes = [
  'TESTT', '8QP47', '3AN22', 'L75BH', 'Z4P9A',
  '85J22', 'I44N7', '4KP22', '82243', '29A7P',
  'M3A22', 'TJKC3', 'AZYVX', 'L2BA3', '9GQHT',
  'PQBBK', 'PDHB6', 'KS6LA', 'DNI48', '8MTQW',
  'HSBVN', '9SH4A', 'AV3AP', 'A5GRS', 'RS3UT',
  'XKYY5', 'R9V5K', 'RN7JZ', 'HCL72', '88425',
  'N5R6Z', 'QRNF6', 'MXKTX', 'Q9N45', 'AWLMN',
  '6FCNS', 'PYCH4', '74G7W', 'RSJ32', 'F5W5G',
  '9TRPX', 'PBKLA', 'TEMP1',
];

const router = express.Router();

router.post('/register', (req, res) => {
  const code = req.body._code;
  const email = req.body._email;

  if (codes.includes(code)) {
    return User.findOne({ code })
      .exec()
      .then((user) => {
        if (user) {
          throw new BadRequestError('User already exists!');
        }

        return TempUser.findOneAndRemove({ code }).exec();
      })
      .then(() => {
        console.log(chalk.yellow('Creating new temp user...'));
        return TempUser.create({ code, email });
      })
      .then((tempUser) => {
        console.log(chalk.green('Successfully created temp user:'), tempUser._id);
        const html = jade.renderFile('./views/confirmation-email.jade', {
          confirmurl: `http://${req.get('host')}/confirm/${tempUser.id}`,
        });
        return mailgun.messages().send({
          from: 'Korea 2017 Portal <do-not-reply@followthegreatdragon.com>',
          to: email,
          subject: 'Please Confirm Your Email Address',
          html,
        });
      })
      .then((mail) => {
        console.log(mail);
        return res.sendStatus(200);
      })
      .catch((err) => {
        const errCode = err.code || 500;

        return res.status(errCode).send(err.message);
      });
  }

  return res.status(404).send('Code invalid!');
});

router.post('/code', (req, res) => {
  const code = req.body._code;

  if (codes.includes(code)) return res.sendStatus(200);

  return res.sendStatus(404);
});

router.get('/confirm/:id', (req, res) => {
  const _id = req.params.id;
  TempUser.findOne({ _id })
    .exec()
    .then((tempUser) => {
      if (!tempUser) {
        throw new BadRequestError('ID no longer valid');
      }

      const email = tempUser.email;
      const code = tempUser.code;

      return User.create({ code, email })
        .then(() => tempUser.remove());
    })
    .then((user) => {
      console.log(user);
      return res.redirect('/login');
    })
    .catch((err) => {
      const errCode = err.code || 500;

      return res.status(errCode).send(err.message);
    });
});

export default router;
