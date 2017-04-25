var myApp = angular.module("myApp", ['ngRoute','ngResource']);

myApp.controller("myController", ['$scope', function ($scope) {

  $scope.name ="hello world";

}]);

myApp.config(function ($routeProvider) {

  $routeProvider

  .when('/', {
      templateUrl: 'home.html',
      controller: 'homeController'
  })
  .when ('/forecast',
     {
        templateUrl: 'forecast.html',
        controller: 'forecastController'
  })
} );

myApp.service('myService', function(){

  // this.cityName = 'your city name here';
  this.cityName = 'Arkansas,Rogers'

});

myApp.controller("homeController", ['$scope', 'myService','$location',function($scope,myService,$location){

  $scope.city = myService.cityName;

  $scope.$watch('city', function(){

      myService.cityName = $scope.city;
  });

  $scope.onSubmit = function ()
  {
    $location.path("/forecast");
  }


}]);

myApp.controller("forecastController", ['$scope', 'myService','$resource',function($scope,myService,$resource){

      $scope.city = myService.cityName;

      $scope.weatherAPI = $resource('http://openweathermap.org/data/2.5/find', {
        callback: "JSON_CALLBACK"}, {get: {method: "JSONP"}} );

        $scope.weatherResult = $scope.weatherAPI.get({q:$scope.city, cnt :2, appid: 'b1b15e88fa797225412429c1c50c122a1'})

        $scope.convertToFahrenheit = function(degk)
        {
          return Math.round((1.8 *(degk-273))+32);
        };

        $scope.convertTocelcius = function(degk)
        {
          return Math.round(degk-273.15);
        };

        $scope.convertToDate = function(dt) {

            return new Date(dt * 1000);

        };


}]);


myApp.directive('weatherReport', function()
{
  return {
            restrict: 'EACM',
            templateUrl: 'directive/weather.html',
            scope: {
              weatherDay: "=",
              convertFahrenheit: "&",
              convertCelcius: "&",
              convertDate: "&",
              dateFormat: "@"
            }
  };
});
