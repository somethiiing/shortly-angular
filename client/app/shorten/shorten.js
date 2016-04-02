angular.module('shortly.shorten', [])

.controller('ShortenController', function ($scope, $location, Links, Auth) {

  if (Auth.isAuth()) {

    var rValidUrl = /^(?!mailto:)(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?:(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[0-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))|localhost)(?::\d{2,5})?(?:\/[^\s]*)?$/i;
    var isValidUrl = function (url) {
      return url.match(rValidUrl);
    };

    $scope.addLink = function(link) {
      // console.log.bind(console, link);
      if (isValidUrl(link)) {
        Links.addOne(link)
          .then(function(){
            $location.path('/links');
          })
          .catch(function(err){
            console.error('Failed to add link: ', err);
          });
        $scope.newLink = '';
      } else {
        $scope.warning = 'Not a valid URL.';
      }
    };
    $scope.clearField = function() {
      $scope.warning = '';
      $scope.newLink = '';
    };
  } else {
    $location.path('/signin');
  }

});
