app.controller('ProductController', ['$scope','D2RService','$cordovaBarcodeScanner','$ionicPopup',
function($scope,D2RService,$cordovaBarcodeScanner,$ionicPopup) {

  $scope.data = {
    barcodeInput: "",
    sensor: 0
  }

  $scope.showBarcodeInput=true;
  $scope.showSpinner=false;

  $("#barcode").JsBarcode("1234567891234",{width:1,displayValue:false,fontSize:20,lineColor:"#526666"});

  $scope.updateBarcode = function(val){
      if(val.length>=13){
        $("#barcode").JsBarcode(val,{width:1,displayValue:true,fontSize:20});
        $scope.showBarcodeInput=false;
      }
     else {
       $("#barcode").JsBarcode("1234567891234",{width:1,displayValue:false,fontSize:20,lineColor:"#526666"});
       }
      $scope.showProductTable=false;
  };

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

}]);