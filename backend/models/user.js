var mongoose = require('mongoose');
var jwt = require('jsonwebtoken')
var crypto = require('crypto');

var userSchema = mongoose.Schema({
  name: {type: String, required: true},
  username: {type: String},
  location: {type: String},
  email: {type: String, required: true},
  phone: {type: String, default: 'http://placehold.it/200x300?text=Profile+Picture', required: true},
  roommates: [{type: mongoose.Schema.ObjectId, ref: 'User'}],
  bills: [{type: mongoose.Schema.ObjectId, ref: 'Bill'}],
  hash: String,
  salt: String,
});

userSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

userSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
};

userSchema.methods.generateJWT = function() {
  var today = new Date();
  var exp = new Date(today);

  exp.setDate(today.getDate() + 60);

  return jwt.sign({
    _id: this._id,
    username: this.username,
    exp: parseInt(exp.getTime() / 1000),
  }, 'SECRET');
};

var User = mongoose.model('User', userSchema);

module.exports = User;
