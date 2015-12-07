'use strict'

app.controller('PayCtrl', function ($scope, $location, $http) {

  var scope = ['make_payments', 'access_profile', 'access_friends', 'access_phone', 'access_email'];
  var scopes = scope.join('%20');
  console.log(scopes);
  // var url = `https://api.venmo.com/v1/oauth/authorize?client_id=${client_id}&scope=${scopes}`;

  $scope.venmoLogin = () => {
    var data = {
      client_id: '3271',
      client_secret: ''
    }
    $http.post('https://api.venmo.com/v1/oauth/access_token', data)
  }

  console.log(document.URL);
});
