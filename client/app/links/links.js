angular.module('shortly.links', [])

.controller('LinksController', function ($scope, Links) {
  // Your code here
  $scope.data = {};
  $scope.getAll = function() {
    Links.getAll()
      .then(function(links) {
        $scope.data = links;
      })
      .catch(function (error) {
        console.error(error);
      });
  };
});
