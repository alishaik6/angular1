// MODULE
var myApp =angular.module("myapp", ['ngRoute']);

// angularapp.controller('mainController', function ($scope) {
//
//   $scope.testing = "ali shaik"
//   console.log($scope);
//
// });

myApp.service('myservice' , function ()
{
   this.name = 'ali shaik';
});

myApp.config(function ($routeProvider) {

  $routeProvider

  // .when('/', {
  //     templateUrl: 'pages/main.html',
  //     controller: 'mainController'
  // })
  .when('/first', {
      templateUrl: 'first.html',
      controller: 'firstController'
  })
  .when('/second', {
      templateUrl: 'second.html',
      controller: 'secondController'
  })
  .when('/second/:num', {
      templateUrl: 'second.html',
      controller: 'secondController'
  })
} );


myApp.controller('mainController', ['$scope',  function($scope) {

    $scope.name = 'Main';

}]);

myApp.controller('firstController' , ['$scope', 'myservice', function($scope, myservice) {

    $scope.name = 'first';

    $scope.author = myservice.name;

    $scope.$watch('author', function ()
  {
    myservice.name = $scope.author;
  });

  $scope.person = {
      name: 'Ali Shaik',
      address : '3302',
      street: 'dixieland Rd',
      city: 'Rogers',
      state: 'AR',
      zip: '72756'

  }
  $scope.completeAddress = function (person)
  {
      return person.address +", "+person.street+', '+person.city+', '+person.state+', '+person.zip;
  };

}]);

myApp.controller('secondController', ['$scope', '$routeParams', 'myservice', function($scope, $routeParams,
                  myservice) {

    $scope.name = 'Second';
    $scope.num = $routeParams.num || 1;

      $scope.author = myservice.name;

      $scope.$watch('author', function ()
    {
      myservice.name = $scope.author;
    });


}]);

myApp.directive("myDirective", function()
{
  return {
          // restrict: 'AECM',
          templateUrl: 'directive.html',
          replace: true,
          scope:
          {
            dirName : '@',
            dirAddress: '@',
            dirPerson: '=',
            dirFunction: '&'
          },
          link: function(scope, elements, attrs) {

              console.log('Linking...');

              console.log(scope);

              if (scope.dirPerson.name == 'Jane Doe') {
                   elements.removeAttr('class');
              }

              console.log(elements);

           }

  }


});




// angularapp.controller("mainController", ["$scope","$timeout", "$filter","$http" ,
//       function ($scope, $timeout,$filter,$http){
//
//         $scope.name = "angular 1.3V";
//         $scope.twitter="";
//         $scope.characters=5;
//
//         $timeout(function () {
//
//           $scope.name = "angular 4.0 V";
//         }, 3000);
//
//         $scope.lowercase = function ()
//         {
//           return $filter('lowercase')($scope.twitter);
//         };
//
//         $scope.rules = [
//
//           {rule: "must be 5 chanracters"},
//           {rule: "must be unique"},
//           {rule: "must be cool"}
//
//         ]
//
//         $http.get("http://jsonplaceholder.typicode.com/users/").
//         success(function(result){
//
//           $scope.users = result;
//         })
//         .error(function(data, status){
//           console.log(status);
//         });
//
//         $scope.newdata =""
//         $scope.newdataMethod = function (){
//             $http.post("http://jsonplaceholder.typicode.com/posts", "'data': $scope.newdata").
//             success(function(result)
//             {
//               $http.get("http://jsonplaceholder.typicode.com/users/").
//               success(function(result){
//
//                 $scope.users = result;
//               })
//               .error(function(data, status){
//                 console.log(status);
//               });
//             })
//
//             .error(function(data, status){
//               console.log(status);
//             });
//         };
//
//
//         //Below id using java scipt method
//         // var request =  new XMLHttpRequest();
//         //
//         // request.onreadystatechange = function ()
//         // {
//         //   $scope.$apply(function (){
//         //     if(request.readyState == 4 && request.status == 200)
//         //     {
//         //       $scope.users = JSON.parse(request.responseText);
//         //
//         //     }
//         //
//         //   });
//         //
//         // };
//         //
//         // request.open("GET", "http://jsonplaceholder.typicode.com/users/", true);
//         // request.send();
//
//
//
//
//
// }]);
