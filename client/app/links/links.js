angular.module('shortly.links', [])

.controller('LinksController', function ($scope, $location, Links, Auth) {
  // Your code here
  if (Auth.isAuth()) {
    $scope.data = {};
    Links.getAll()
      .then(function(links) {
        $scope.data.links = links;
      })
      .catch(function (error) {
        console.error(error);
      });
  } else {
    $location.path('/signin');
  }

});
