'use strict'

app.controller('RoommateCtrl', function ($scope, ngFB) {

  ngFB.api({
    path: '/me',
    params: {
      fields: 'id,name,friends'
    }
  }).then(
    function (user) {
      console.log(user);
      $scope.user = user;
    },
    function (error) {
      console.log('Facebook error: ' + error.error_description);
    });

  $scope.roommates = [{
    name: 'John',
  }, {
    name: 'Steve',
  }, {
    name: 'Joe',
  }, ];

});
