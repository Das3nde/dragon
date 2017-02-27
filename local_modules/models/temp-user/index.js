import mongoose from 'mongoose';
import cipher from 'simple-cipher';

const TempUserSchema = mongoose.Schema({
  code: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    set: email => cipher.encrypt(email, 'email'),
    get: (email) => {
      if (email) {
        return cipher.decrypt(email, 'email');
      }
      return null;
    },
  },
});

mongoose.model('TempUser', TempUserSchema);

export default TempUserSchema;
