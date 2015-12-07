app.controller('SettingsCtrl', function ($scope, $location, ngFB) {
  ngFB.api({
    path: '/me',
    params: {
      fields: 'id,name,email'
    }
  }).then(
    function (user) {
      console.log(user);
      $scope.user = user;
    },
    function (error) {
      console.log('Facebook error: ' + error.error_description);
    });

  $scope.fbLogout = function () {
      ngFB.logout().then(function (data) {
        console.log('logged out?');
        console.log(data);
      }, function (error) {
        console.log(error);
      })
  }


});
