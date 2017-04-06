import jade from 'jade';
import mailgun from 'config/mailgun';
import mongoose from 'mongoose';

import UserSchema from 'models/user';

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/dragon');

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
        subject: 'Korea 2017 - New Information',
        html,
      })
      .then((mail) => {
        console.log(mail);
      });
    });
  });
