app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        disableCache: true,
        templateUrl : "partials/products.html",
        controller : "productsCtrl"
    })
    .when("/cart", {
        templateUrl : "partials/cart.html",
        controller : "cartCtrl"
    })
    .when("/checkout", {
        templateUrl : "partials/checkout.html",
        controller : "checkoutCtrl"
    })
    .when("/success", {
        templateUrl : "partials/success.html",
        controller:"successCtrl"
    })
    .when("/failure", {
        templateUrl : "partials/failure.html"
    })
    .otherwise({
        templateUrl : "partials/404.html"
    })

});
