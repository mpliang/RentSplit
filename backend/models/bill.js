var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var billSchema = new Schema({
  type: {type: String, required: true},
  amount: {type: Number, required: true},
  Due: {type: Date, required: true},
  roommates: [{type: mongoose.Schema.ObjectId, ref: 'User'}],
  repeats: {type: String, default: 'monthly'},
  Notes: {type: String},
});

billSchema.method.toggleAvailable = function(cb) {
  this.isAvailable = !this.isAvailable;
  this.save(cb);
};

var Bill = mongoose.model('Bill', billSchema);

module.exports = Bill;
