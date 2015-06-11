app.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('scanProduct',{
            url: "/scanProduct",
            templateUrl: "views/scanProduct.html",
            controller: 'ProductController'
        });

    $urlRouterProvider.otherwise('/scanProduct');
});