import mongoose from 'mongoose';
import 'models';

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI);
