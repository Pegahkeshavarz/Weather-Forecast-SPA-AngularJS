
//module
var weatherApp= angular.module('weatherApp', ['ngResource', 'ngRoute']);

//Route
weatherApp.config(function ($routeProvider) {

  $routeProvider

  .when('/', {
    templateUrl: 'pages/home.htm',
    controller: 'homeController'
  })

  .when('/forecast', {
   templateUrl: 'pages/forecast.htm',
   controller: 'forecastController'

 })
  .when('/forecast/:days', {
   templateUrl: 'pages/forecast.htm',
   controller: 'forecastController'

 })

});


// SERVICES
weatherApp.service('cityService', function() {
   
    this.city = prompt('what is your city?');
    
});

// CONTROLLERS
weatherApp.controller('homeController', ['$scope', '$resource','$routeParams','cityService', function($scope,$resource,$routeParams,cityService) {
    
    $scope.city = cityService.city;
    
    $scope.$watch('city', function() {
       cityService.city = $scope.city; 
    });
    
}]);

weatherApp.controller('forecastController', ['$scope','$resource','$routeParams','cityService', function($scope,$resource,$routeParams, cityService) {
    
    $scope.city = cityService.city;
    $scope.days= $routeParams.days || '2';
   
    $scope.weatherAPI=$resource('http://api.openweathermap.org/data/2.5/forecast/daily?APPID=c5a0e60a4bd5c6481cfbe55c9486fafc',{
    callback : 'JSON_CALLBACK'}, {get: {method:"JSONP"}});
    
    $scope.weatherResult = $scope.weatherAPI.get({q:$scope.city, cnt:$scope.days});
    
    $scope.convertToFahrenheit= function(degK){
        
        return Math.round((degK-273.15));
    }
    
    $scope.convertToDate = function(dt){
        return new Date(dt * 1000);
    };
    
    console.log($scope.weatherResult);  
    
}]);

//Directives

weatherApp.directive('weatherReport', function(){
  return{
    restrict:'AECM',
    templateUrl:'directives/weatherReport.html',
    replace:'true',
    
      scope: {
          weatherDay : '=',  //w
          convertToStandard:'&', //convertToFahrenheit
          convertToDate:'&', //convertToDate
          dateFormat: '@'//format
         
      }
   }

});
