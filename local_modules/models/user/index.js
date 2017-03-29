import bcrypt from 'bcrypt';
import cipher from 'simple-cipher';
import mongoose from 'mongoose';

const SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema({
  name: {
    first: {
      type: String,
    },
    last: {
      type: String,
    },
  },
  code: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    set: email => cipher.encrypt(email, 'email'),
    get: email => (email ? cipher.decrypt(email, 'email') : null),
  },
  password: {
    type: String,
    select: false,
  },
  hasPassword: {
    type: Boolean,
    default: false,
  },
});

UserSchema.pre('save', function preSave(next) {
  if (this.isModified('password')) {
    try {
      this.password = bcrypt.hashSync(this.password, SALT_WORK_FACTOR);
    } catch (err) {
      return next(err);
    }
  }

  this.hasPassword = !!this.password;

  return next();
});

UserSchema.methods.comparePassword = function comparePassword(_password) {
  if (!this.password) return false;
  return bcrypt.compareSync(_password, this.password);
};

UserSchema.statics.login = function login(_email, _password) {
  const email = cipher.encrypt(_email, 'email');

  return this.findOne({ email }).select('+password').exec()
    .then((user) => {
      // 1. Username must be correct
      // 2. If no password, code must be correct
      // 3. If password, password must be correct

      if (
        (!user) ||
        (!user.password && user.code !== _password) ||
        (user.password && !user.comparePassword(_password))
      ) return null;

      user.password = undefined;
      return user;
    });
};

UserSchema.virtual('name.full').get(function getFullName() {
  return `${this.name.first} ${this.name.last}`;
});

mongoose.model('User', UserSchema);

export default UserSchema;
