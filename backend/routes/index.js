'use strict';

var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var Bill = require('../models/bill');
var jwt = require('express-jwt');
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



////////////////////////////Auth routes////////////////////////////

router.post('/register', function(req, res, next) {
  if(!req.body.username || !req.body.password){
    return res.status(400).send('Username and password are required fields');
  }

  var user = new User();
  user.name= req.body.name;
  user.username= req.body.username;
  user.location = req.body.location;
  user.email= req.body.email;
  user.phone = req.body.phone;
  user.roommates = [];
  user.bills =[];
  user.setPassword(req.body.password);

  user.save(function(err, data){
    if(err){
      res.status(401).send(err)
    } else {
      var jwt = user.generateJWT();
      res.send(jwt)
    }
  })
});

router.post('/login', function(req, res, next){
  if(!req.body.username || !req.body.password){
    return res.status(400).send('Please fill out all fields');
  }

  User.findOne({username: req.body.username}, function(err, user){
    if(err){
      res.status(401).send(err)
    }else if(!user || !user.validPassword(req.body.password)){
      res.status(401).send('Invalid login credentials')
    }else{
      var jwt = user.generateJWT();
      res.send(jwt)
    }
  })
});

router.get('/me/', auth, (req, res) => {
  let jwt = req.headers.authorization.replace(/Bearer /, "")
  let userID = (JSON.parse(atob(jwt.split('.')[1])))._id

  User.findById(userID).populate('bills').populate('roommates').exec(function (err, data){
    err ? res.status(401).send(err) : res.send(data)
  })
});

router.get('/user/:id', auth, (req, res) => {
  User.findById(req.params.id, (err, user)=> {
    if (err) res.status(401).send(err);
    else res.send(user)
  })
});

////////////////////////////User routes////////////////////////////

//get all users
router.get('/users', function(req,res,next) {
  User.find({}, function(err, data){
    res.status(err ? 400 : 200).send(err || data);
  })
});

//get user data
router.get('/:id', function(req,res,next) {
  User.findById(req.params.id, function(err, user){
    res.status(err ? 400 : 200).send(err || user);
  })
});


//add a new roommate
router.post('/:id/roommate', function(req, res,next){
  User.findById(req.params.id, function(err, user) {
    user.roommates.push(req.body);
    user.save();
    res.status(err ? 400 : 200).send(err || user);
  })
});


//delete roommate
router.delete('/:id/:roommateId', function(req, res) {
  User.findById(req.params.id, function(err, user){
    user.roommates.findByIdAndRemove(req.params.roommateId, function(err, deletedRoommate){
      res.status(err ? 400 : 200).send(err || deletedRoommate)
    })
  });
});





////////////////////////////Bill routes////////////////////////////


//add new bill
router.post("/:id/bills", function(req, res) {
  User.findById(req.params.id, function(err, user) {
    var bill = new Bill(req.body);
    user.bills.push(bill);
    user.save();
    res.status(err ? 400 : 200).send(err || user);
  });
});

//delete bill
router.delete('/:id/:billId', function(req, res) {
  User.findById(req.params.id, function(err, user){
    user.bills.findByIdAndRemove(req.params.billId, function(err, deletedBill){
      res.status(err ? 400 : 200).send(err || deletedBill)
    })
  });
});



module.exports = router;
