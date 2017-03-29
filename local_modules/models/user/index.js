import bcrypt from 'bcrypt';
import cipher from 'simple-cipher';
import mongoose from 'mongoose';

const SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema({
  name: {
    first: {
      type: String,
      select: false,
    },
    last: {
      type: String,
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
    set: email => cipher.encrypt(email, 'email'),
    get: email => (email ? cipher.decrypt(email, 'email') : null),
    select: false,
  },
  password: {
    type: String,
    select: false,
  },
});

UserSchema.pre('save', (next) => {
  const user = this;

  if (user.isModified('password')) {
    bcrypt.hash(user.password, SALT_WORK_FACTOR)
      .then((hash) => {
        user.password = hash;
        return next();
      })
      .catch(err => next(err));
  }
});

UserSchema.methods.comparePassword = function comparePassword(_password) {
  if (!this.password) return false;
  return bcrypt.compareSync(_password, this.password);
};

UserSchema.virtual('name.full').get(() => `${this.name.first} ${this.name.last}`);

mongoose.model('User', UserSchema);

export default UserSchema;
