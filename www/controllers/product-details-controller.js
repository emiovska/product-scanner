app.controller('ProductDetailsController', ['$scope','D2RService','$stateParams','$timeout',
function($scope,D2RService,$stateParams,$timeout) {

  var barcode = $stateParams.barcode;

  $scope.data = {
    showSearching: true,
    noDataFound: false,
    showProductDetails: false

  }
  var literalTranslation={};
    literalTranslation["brandName"]="Brand name";
    literalTranslation["brandUrl"]="Brand url";
    literalTranslation["ownerName"] = "Owner name";
    literalTranslation["wikiLink"] = "Wikipedia link";

    var getProductInfo= function(){
      $scope.data = {
          showSearching: true,
          noDataFound: false,
          showProductDetails: false
      }
      D2RService.getProductInfo(barcode).then(function(data){
        var jsonStr = $.xml2json(data);
        if(jsonStr.results) {
         var productResult = jsonStr.results.result.binding;
         angular.forEach(productResult,function(value){
            var literalName= value.name;
            var translation = literalTranslation[literalName];
            value.name=translation;
         });
         $scope.productData = productResult;
         $scope.data = {
            showSearching: false,
            noDataFound: false,
            showProductDetails: true
         }

        } else {
          $scope.data = {
             showSearching: false,
             noDataFound: true,
             showProductDetails: false
          }
        }
      },function(error){

        getProductInfo();
      });
    }


  getProductInfo();
}]);