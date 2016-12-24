import mongoose from 'mongoose';

import UserSchema from './user';
import TempUserSchema from './temp-user';

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI);

mongoose.model('User', UserSchema);
mongoose.model('TempUser', TempUserSchema);
