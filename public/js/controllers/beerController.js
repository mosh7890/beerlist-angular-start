app.controller('beerController', function ($scope, $stateParams, beerFactory) {

    $scope.beer = $stateParams.beerParam;

    //* Create a Review Form Template
    var reviewForm = {
        username: $scope.currentUser.username,
        review: ""
    };

    $scope.temp = angular.copy(reviewForm);

    //* 6 - Add Beer Reviews
    $scope.addReview = function () {
        var newReview = {
            username: this.temp.username,
            review: this.temp.review
        };

        beerFactory.addReview(newReview, this.beer._id)
            .then(function (beer) {
                $scope.beer = beer;
                $scope.myForm.$setPristine();
                $scope.temp = angular.copy(reviewForm);
            })
            .catch(function (error) {
                console.log(error)
                alert(error.data.message);
            });
    }

    //* 7 - Delete Beer Reviews
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