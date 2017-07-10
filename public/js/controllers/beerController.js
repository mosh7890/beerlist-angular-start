app.controller('beerController', function ($scope, $stateParams, beerFactory) {

    // Create a Blank Form Template
    var blankForm = {
        name: "",
        style: "",
        abv: "",
        image_url: "",
    }

    //  Sets Temp's Values in HTML?
    $scope.temp = angular.copy(blankForm);

    $scope.beer = $stateParams.beerParam;

    // 6 - Add Beer Reviews
    $scope.addReview = function () {
        var newReview = {
            username: this.temp.username,
            review: this.temp.review
        };

        beerFactory.addReview(newReview, this.beer._id)
            .then(function (beer) {
                $scope.beer = beer;
                $scope.myForm.$setPristine(); // No clue wtf this does
                $scope.temp = angular.copy(blankForm);
            })
            .catch(function (error) {
                console.log(error)
                alert(error.data.message);
            });
    }

    // 7 - Delete Beer Reviews
    $scope.removeReview = function () {
        var reviewIndex = this.$index;

        beerFactory.removeReview(this.$parent.beer._id, this.review._id)
            .then(function (beer) {
                $scope.beer.reviews.splice(reviewIndex, 1);
            })
            .catch(function (error) {
                console.log(error)
                alert(error.data.message);
            });
    }
});