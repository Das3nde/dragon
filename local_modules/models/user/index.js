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
});

// Must use function syntax to get context for 'this'

UserSchema.pre('save', function preSave(next) {
  if (this.isModified('password')) {
    try {
      this.password = bcrypt.hashSync(this.password, SALT_WORK_FACTOR);
    } catch (err) {
      return next(err);
    }
  }

  return next();
});

// Must use function syntax to get context for 'this'

UserSchema.methods.comparePassword = function comparePassword(_password) {
  if (!this.password) return false;
  return bcrypt.compareSync(_password, this.password);
};

UserSchema.virtual('name.full').get(() => `${this.name.first} ${this.name.last}`);

mongoose.model('User', UserSchema);

export default UserSchema;
