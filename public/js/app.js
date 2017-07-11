var app = angular.module('beerList', ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $stateProvider
        .state('home', {
            url: '/home',
            controller: 'beersController',
            templateUrl: '/templates/home.html'
        })
        .state('beer', {
            url: '/beer/:beerID',
            params: {
                beerParam: null
            },
            controller: 'beerController',
            templateUrl: '/templates/beer.html'
        })
        .state('register', {
            url: '/register',
            controller: 'authController',
            templateUrl: '/templates/register.html'
        })
        .state('login', {
            url: '/login',
            controller: 'authController',
            templateUrl: '/templates/login.html'
        });
    $urlRouterProvider.otherwise('/home');
}]);