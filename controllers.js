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

