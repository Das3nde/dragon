import jade from 'jade';
import mailgun from 'config/mailgun';
import mongoose from 'mongoose';

import TempUserSchema from 'models/temp-user';

mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://heroku_t2qxw14d:5l7pdd231r4shlpts2a10biooc@ds033145.mongolab.com:33145/heroku_t2qxw14d');

const TempUser = mongoose.model('TempUser', TempUserSchema);

TempUser.find({})
  .exec()
  .then((users) => {
    users.forEach((user) => {
      const html = jade.renderFile('./views/confirmation-email.jade', {
        confirmurl: `http://www.followthegreatdragon.com/confirm/${user.id}`,
      });

      mailgun.messages().send({
        from: 'Korea 2017 Portal <do-not-reply@followthegreatdragon.com>',
        to: user.email,
        bcc: 'knutson.justin@gmail.com',
        subject: 'Please Confirm Your Email Address',
        html,
      })
      .then((mail) => {
        console.log(mail);
      });
    });
  });
