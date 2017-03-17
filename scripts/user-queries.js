import mongoose from 'mongoose';
import 'config/dotenv';
import UserSchema from 'models/user';
// import TempUserSchema from 'models/temp-user';

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI);

const User = mongoose.model('User', UserSchema);
// const TempUser = mongoose.model('TempUser', TempUserSchema);

User
// TempUser
  .find({})
  .select('code email')
  .exec()
  .then((users) => {
    users.sort();
    users.forEach((user) => {
      console.log(user.email, user.code);
    });
    process.exit();
  });
