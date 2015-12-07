app.controller('SignInCtrl', function ($scope, $location, ngFB) {

  $scope.fbSignIn = function () {
    ngFB.login({
      scope: 'email,publish_actions,user_location,user_friends,email'
    }).then(
      function (response) {
        if (response.status === 'connected') {
          console.log('Facebook login succeeded');
          $location.path('/app/home');
        } else {
          alert('Facebook login failed');
        }
      });
  }

});
