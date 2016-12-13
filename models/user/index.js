import mongoose from 'mongoose';
import cipher from 'simple-cipher';

const UserSchema = mongoose.Schema({
  name: {
    first: {
      type: String,
      required: false,
      select: false,
    },
    last: {
      type: String,
      required: false,
      select: false,
    },
  },
  code: {
    type: String,
    required: true,
    select: false,
  },
  email: {
    type: String,
    set: (email) => cipher.encrypt(email, 'email'),
    get: (email) => cipher.decrypt(email, 'email'),
    select: false,
  },
});

UserSchema.virtual('name.full').get(() => `${this.name.first} ${this.name.last}`);

export default UserSchema
