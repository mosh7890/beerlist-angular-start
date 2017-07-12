app.controller('beersController', function ($scope, beerFactory) {

    //*  Show / Hide Divs
    $scope.showAddForm = true;
    $scope.showBeers = true;
    $scope.showEditForm = false;

    //* Create a Blank Form Template
    var blankForm = {
        name: "",
        style: "",
        abv: "",
        image_url: "",
    }

    //* Create Empty Beer List
    $scope.beerList = [];

    //* 1 - Get All Beers
    beerFactory.getBeerList()
        .then(function (beers) {
            $scope.beerList = beers;
        })
        .catch(function (error) {
            console.log(error)
        });

    //* 2 - Add a Beer
    $scope.addBeer = function () {
        var newBeer = {
            name: this.temp.name,
            style: this.temp.style,
            image_url: this.temp.image_url,
            abv: this.temp.abv,
            ratings: [],
            avgRating: 0,
            comments: [],
        };

        beerFactory.addBeer(newBeer)
            .then(function (beer) {
                $scope.beerList.push(beer);
                $scope.myForm.$setPristine(); //* No clue wtf this does
                $scope.temp = angular.copy(blankForm);
            })
            .catch(function (error) {
                console.log(error)
                alert(error.data.message);
            });
    };

    //* 3 - Delete a Beer
    $scope.removeBeer = function () {
        var index = this.$index;

        beerFactory.removeBeer(this.beer._id)
            .then(function (beer) {
                $scope.beerList.splice(index, 1);
            })
            .catch(function (error) {
                console.log(error)
                alert(error.data.message);
            });
    };

    //* 4 - Add Beer Ratings
    $scope.addRating = function () {
        var newRating = {
            ratings: prompt('Enter A Rating Between 1 and 5'),
            ratingsTotal: $scope.getRatingsTotal(this)
        };

        var index = this.$index;

        if (newRating.ratings > 0) {
            beerFactory.addRating(newRating, this.beer._id)
                .then(function (beer) {
                    $scope.beerList[index] = beer;
                })
                .catch(function (error) {
                    console.log(error)
                    alert(error.data.message);
                });
        }
    }

    //* Get Average Rating for Individual Beers
    $scope.getRatingsTotal = function (data) {
        function getSum(total, num) {
            return total + num;
        }
        if (data.beer.ratings.length > 0) {
            return data.beer.ratings.reduce(getSum);
        }
    }

    //* Sorting Flag
    var flag = false;

    //* Sort Beer List By Rating
    $scope.sortBeers = function () {
        $scope.beerList.sort(dynamicSort('avgRating', flag));
        flag = !flag;
    }

    var dynamicSort = function (property, flag) {
        return function (a, b) {
            if (flag) {
                return (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            } else {
                return (a[property] > b[property]) ? -1 : (a[property] < b[property]) ? 1 : 0;
            }
        };
    }

    //* 5 - Update Beer Info (name, style, image, abv)
    $scope.editBeerShow = function () {
        $scope.showAddForm = false;
        $scope.showBeers = false;
        $scope.showEditForm = true;

        var index = this.$index;
        var beerID = this.beer._id;

        var defaultEditForm = {
            name: this.beer.name,
            style: this.beer.style,
            abv: this.beer.abv,
            image_url: this.beer.image_url,
        }

        $scope.temp2 = angular.copy(defaultEditForm);

        $scope.editBeer = function () {
            var editedBeer = {
                name: this.temp2.name,
                style: this.temp2.style,
                image_url: this.temp2.image_url,
                abv: this.temp2.abv,
            };

            beerFactory.editBeer(editedBeer, beerID)
                .then(function (beer) {
                    $scope.beerList[index] = beer;
                    $scope.showAddForm = true;
                    $scope.showBeers = true;
                    $scope.showEditForm = false;
                })
                .catch(function (error) {
                    console.log(error)
                    alert(error.data.message);
                });
        }
    }

    //* Clear Add Beer Form
    $scope.clearAddBeer = function () {
        $scope.temp = angular.copy(blankForm);
    }

    //* Cancel the Beer Edit
    $scope.cancelEdit = function () {
        $scope.showAddForm = true;
        $scope.showBeers = true;
        $scope.showEditForm = false;
    }
});