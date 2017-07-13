app.factory('authFactory', function ($http) {

    var currentUser = {};

    //* 1 - Register New Users
    var register = function (user) {
        return $http.post('/users/register', user)
            .then(function (response) {
                currentUser.username = response.data.username;
                currentUser.isAdmin = response.data.admin;
                return angular.copy(response.data);
            });
    };

    //* 2 - Login Users
    var login = function (user) {
        return $http.post('/users/login', user)
            .then(function (response) {
                currentUser.username = response.data.username;
                currentUser.isAdmin = response.data.admin;
                return angular.copy(response.data);
            });
    };

    //* 3 - Check for a Logged In User
    var getCurrentUser = function () {
        return $http.get('/users/currentuser')
            .then(function (response) {
                currentUser.username = response.data.username;
                currentUser.isAdmin = response.data.admin;
                return angular.copy(response.data);
            });
    };

    //* 4 - Logout Users
    var logout = function (user) {
        return $http.get('/users/logout')
            .then(function (response) {
                currentUser.username = null;
                currentUser.isAdmin = null;
                return angular.copy(response.data);
            });
    };

    return {
        register: register,
        login: login,
        currentUser: currentUser,
        getCurrentUser: getCurrentUser,
        logout: logout
    };
});