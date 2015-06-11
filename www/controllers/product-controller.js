app.controller('ProductController', ['$scope','D2RService','$cordovaBarcodeScanner','$ionicPopup',
function($scope,D2RService,$cordovaBarcodeScanner,$ionicPopup) {

  $scope.data = {
    barcodeInput: "",
    sensor: 0
  }

  $scope.showBarcodeInput=true;

  $("#barcode").JsBarcode("1234567891234",{width:1,displayValue:false,fontSize:20,lineColor:"#526666"});
  $scope.showSpinner=false;

  $scope.updateBarcode = function(val){
      if(val.length>=13){
        $("#barcode").JsBarcode(val,{width:1,displayValue:true,fontSize:20});
        $scope.showBarcodeInput=false;
      }
     else
        $("#barcode").JsBarcode("1234567891234",{width:1,displayValue:false,fontSize:20,lineColor:"#526666"});

      $scope.showProductTable=false;
  };


  $scope.getProductInfo= function(){
    $scope.showSpinner=true;
    D2RService.getProductInfo($scope.data.barcodeInput).then(function(data){
      var jsonStr = $.xml2json(data);
      if(jsonStr.results) {
        $scope.productData=jsonStr.results.result.binding;
        $scope.showProductTable=true;
      } else {
        var alertPopup = $ionicPopup.alert({
          title: 'No product data found',
          template: 'Sorry we can not find information about this product'
        });
          alertPopup.then(function(res) {
        });
        $scope.showProductTable=false;
      }
      $scope.showSpinner=false;
    },function(error){
      alert(error);
      $scope.showSpinner=false;
    });
  }

  var scanBarcode = function(){
     $cordovaBarcodeScanner
          .scan()
          .then(function(barcodeData) {
            $scope.data = {
              barcodeInput: barcodeData.text,
              sensor: 0
            };
            $scope.updateBarcode(barcodeData.text);
          },function(error) {
            alert("error starting bar code scanner");
          });
  }


  $scope.editBarcode = function() {
    $scope.showBarcodeInput=true;
    $("#barcode").JsBarcode("1234567891234",{width:1,displayValue:false,fontSize:20,lineColor:"#526666"});
  };

  $scope.sensorDetection = function(sensor) {
    if(sensor>=100){
        scanBarcode();
    }
  }
//  $scope.parseXML=function(){
//    var json = $.xml2json("<?xml version=\"1.0\"?> <sparql xmlns=\"http://www.w3.org/2005/sparql-results#\"> <head> <variable name=\"brandName\"/> <variable name=\"brandUrl\"/> <variable name=\"ownerName\"/> <variable name=\"wikiLink\"/> </head> <results> <result> <binding name=\"brandName\"> <literal>Fanta</literal> </binding> <binding name=\"brandUrl\"> <literal>http://www.fanta.com</literal> </binding> <binding name=\"ownerName\"> <literal>Coca-Cola</literal> </binding> <binding name=\"wikiLink\"> <literal>http://en.wikipedia.org/wiki/The_Coca-Cola_Company</literal> </binding> </result> </results> </sparql>");
//    console.log(json.results.result.binding);
//    $scope.productData = json.results.result.binding;
//    $scope.showProductTable=true;
//
//  }

}]);