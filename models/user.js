const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
// const bcrypt = require('bcrypt');
// const { UnauthorizedError } = require('../errors/UnauthorizedError');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: 'Wrong email format',
    },
  },

  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },

  name: {
    default: '',
    type: String,
    minlength: 2,
    maxlength: 30,
  },
});

// userSchema.statics.findUserByCredentials = function findUserByCredentials(
//   email,
//   password,
//   name
// ) {
//   return this.findOne({ email })
//     .select('+password')
//     .then((user) => {
//       if (!user) {
//         return Promise.reject(new UnauthorizedError('Incorrect email or password'));
//       }

//       return bcrypt.compare(password, user.password).then((matched) => {
//         if (!matched) {
//           return Promise.reject(new UnauthorizedError('Incorrect email or password'));
//         }

//         return user;
//       });
//     });
// };

module.exports = mongoose.model('user', userSchema);
