app.factory('beerFactory', function ($http) {

    var getBeerList = function () {
        return $http.get('/beers').then(function (response) {
            return angular.copy(response.data);
        });
    }

    var addBeer = function (data) {
        return $http.post('/beers', data).then(function (response) {
            return angular.copy(response.data);
        });
    }

    var removeBeer = function (beerID) {
        return $http.delete('/beers/' + beerID).then(function (response) {
            return angular.copy(response.data);
        });
    }

    var addRating = function (data, beerID) {
        return $http.post('/beers/' + beerID + '/ratings', data).then(function (response) {
            return angular.copy(response.data);
        });
    }

    var editBeer = function (data, beerID) {
        return $http.put('/beers/' + beerID, data).then(function (response) {
            return angular.copy(response.data);
        });
    }

    return {
        getBeerList: getBeerList,
        addBeer: addBeer,
        removeBeer: removeBeer,
        addRating: addRating,
        editBeer: editBeer,
    }
});