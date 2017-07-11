app.controller('authController', function ($scope, $state, authFactory) {

    //* 1 - Register New Users
    $scope.register = function () {
        authFactory.register($scope.user)
            .then(function (beers) {
                $state.go('home');
            })
            .catch(function (error) {
                alert(error.data.message);
            });
    }

    //* 2 - Login Users
    $scope.login = function () {
        authFactory.login($scope.user)
            .then(function (beers) {
                $state.go('home');
            })
            .catch(function (error) {
                alert(error.data);
            });
    }
});