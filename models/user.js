const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: 'String',
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: 'String',
    required: true,
    trim: true
  }
});


// encrypt password
userSchema.pre('save', function(next) {
    const user = this;
    if(!user.isModified || !user.isNew) { // don't rehash if it's an old user
      next();
    } else {
      bcrypt.hash(user.password, saltRounds, function(err, hash) {
        if (err) {
          console.log('Error hashing password for user', user.username);
          next(err);
        } else {
          user.password = hash;
          next();
        }
      });
    }
  });


module.exports = mongoose.model('User', userSchema);