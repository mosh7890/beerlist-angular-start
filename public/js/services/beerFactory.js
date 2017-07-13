app.factory('beerFactory', function ($http) {

    //* 1 - Get All Beers
    var getBeerList = function () {
        return $http.get('/beers')
            .then(function (response) {
                return angular.copy(response.data);
            });
    }

    //* 2 - Add a Beer
    var addBeer = function (data) {
        return $http.post('/beers', data)
            .then(function (response) {
                return angular.copy(response.data);
            });
    }

    //* 3 - Delete a Beer
    var removeBeer = function (beerID) {
        return $http.delete('/beers/' + beerID)
            .then(function (response) {
                return angular.copy(response.data);
            });
    }

    //* 4 - Add Beer Ratings
    var addRating = function (data, beerID) {
        return $http.post('/beers/' + beerID + '/ratings', data)
            .then(function (response) {
                return angular.copy(response.data);
            });
    }

    //* 5 - Update Beer Info (name, style, image, abv)
    var editBeer = function (data, beerID) {
        return $http.put('/beers/' + beerID, data)
            .then(function (response) {
                return angular.copy(response.data);
            });
    }

    //* 6 - Add Beer Reviews
    var addReview = function (data, beerID) {
        return $http.post('/beers/' + beerID + '/reviews', data)
            .then(function (response) {
                return angular.copy(response.data);
            });
    }

    //* 7 - Delete Beer Reviews
    var removeReview = function (beerID, reviewID) {
        return $http.delete('/beers/' + beerID + '/reviews/' + reviewID)
            .then(function (response) {
                return angular.copy(response.data);
            });
    }
    //* 8 - Get Current Beer on Refresh
    var getBeer = function (beerID) {
        return $http.get('/beers/' + beerID)
            .then(function (response) {
                return angular.copy(response.data);
            });
    }

    return {
        getBeerList: getBeerList,
        addBeer: addBeer,
        removeBeer: removeBeer,
        addRating: addRating,
        editBeer: editBeer,
        addReview: addReview,
        removeReview: removeReview,
        getBeer: getBeer
    };
});