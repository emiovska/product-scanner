app.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('scanProduct',{
            url: "/scanProduct",
            templateUrl: "views/scanProduct.html",
            controller: 'ProductController'
        })
        .state('productDetails',{
            url: "/productDetails/:barcode",
            templateUrl: "views/productDetails.html",
            controller: 'ProductDetailsController'
        });

    $urlRouterProvider.otherwise('/scanProduct');
});