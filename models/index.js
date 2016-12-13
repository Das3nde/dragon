import mongoose from 'mongoose';

import UserSchema from './user';

mongoose.connect(process.env.MONGO_URI);
mongoose.model('User', UserSchema);
