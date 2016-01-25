//Directives

weatherApp.directive('weatherReport', function(){
  return {
    restrict:'E',
    templateUrl:'directives/weatherReport.html',
    replace: true,
    
      scope: {
          weatherDay : '=',  //w
          convertToStandard:'&', //convertToFahrenheit
          convertToDate:'&', //convertToDate
          dateFormat: '@'//format
         
      }
   }

});
