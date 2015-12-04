var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var billSchema = new Schema({
  type: {type: String, required: true},
  amount: {type: Number, required: true},
  Due: {type: Date, required: true},
  roommates: [{mongoose.Schema.ObjectId, ref: 'User'}],
  Notes: {type: String},
});

billSchema.method.toggleAvailable = function(cb) {
  this.isAvailable = !this.isAvailable;
  this.save(cb);
};

var Bill = mongoose.model('Bill', billSchema);

module.exports = Bill;
