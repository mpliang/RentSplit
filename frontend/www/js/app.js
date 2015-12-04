// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

app.run(function ($ionicPlatform, $rootScope, $timeout) {
  $ionicPlatform.ready(function () {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

  $rootScope.authStatus = false;
  //stateChange event
  $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
    $rootScope.authStatus = toState.authStatus;
    if ($rootScope.authStatus) {


    }
  });

  $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
    console.log("URL : " + toState.url);
    if (toState.url == '/dashboard') {
      console.log("match : " + toState.url);
      $timeout(function () {
        angular.element(document.querySelector('#leftMenu')).removeClass("hide");
      }, 1000);
    }
  });

})

.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  //--------------------------------------

  .state('app.login', {
      url: '/login',
      views: {
        'menuContent': {
          templateUrl: 'templates/tab-signin.html'
        }
      },
      authStatus: false
    })
    .state('app.signup', {
      url: '/signup',
      views: {
        'menuContent': {
          templateUrl: 'templates/tab-signup.html',
        }
      },
      authStatus: false
    })
    //--------------------------------------


  .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl'
      }
    },
    authStatus: true
  })


  .state('app.add', {
      url: '/add',
      views: {
        'menuContent': {
          templateUrl: 'templates/add.html',
          controller: 'ProfilesCtrl'
        }
      }
    })
    .state('app.pay', {
      url: '/pay',
      views: {
        'menuContent': {
          templateUrl: 'templates/pay.html'
        }
      }
    })
    .state('app.manage', {
      url: '/manage',
      views: {
        'menuContent': {
          templateUrl: 'templates/manage.html'
        }
      }
    })
    .state('app.manage-bills', {
      url: '/manage/bills',
      views: {
        'menuContent': {
          templateUrl: 'templates/manage-bills.html',
          controller: 'BillCtrl'
        }
      }
    })
    .state('app.manage-roommates', {
      url: '/manage/roommates',
      views: {
        'menuContent': {
          templateUrl: 'templates/manage-roommates.html',
          controller: 'RoommateCtrl'
        }
      }
    })
    .state('app.settings', {
      url: '/settings',
      views: {
        'menuContent': {
          templateUrl: 'templates/settings.html',
        }
      }
    })

  .state('app.profile', {
    url: '/profile/:profileId',
    views: {
      'menuContent': {
        templateUrl: 'templates/profile-detail.html',
        controller: 'ProfileCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
