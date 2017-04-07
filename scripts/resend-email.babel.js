import jade from 'jade';
import mailgun from 'config/mailgun';
import mongoose from 'mongoose';

import UserSchema from 'models/user';

mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://heroku_t2qxw14d:5l7pdd231r4shlpts2a10biooc@ds033145.mongolab.com:33145/heroku_t2qxw14d');

const User = mongoose.model('User', UserSchema);

User.find({}).exec()
  .then((users) => {
    users.forEach((user) => {
      const html = jade.renderFile('./views/invite-email.jade', {
        code: user.code,
      });

      mailgun.messages().send({
        from: 'Korea 2017 Portal <do-not-reply@followthegreatdragon.com>',
        to: user.email,
        bcc: 'knutson.justin@gmail.com',
        subject: 'Korea 2017 - The Gathering Update',
        html,
      })
      .then((mail) => {
        console.log(mail);
      });
    });
  });
