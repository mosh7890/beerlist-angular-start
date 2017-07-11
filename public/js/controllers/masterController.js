app.controller('masterController', function ($scope, authFactory) {
    authFactory.getCurrentUser();
    $scope.currentUser = authFactory.currentUser;

    $scope.logout = function () {
        authFactory.logout($scope.currentUser);
    }
});