app.controller("menuCtrl",function($scope, cartService, $rootScope) {
  $scope.cartlength  = 0;
  $scope.cartHide = false;
  $rootScope.$on("cart.updated",function() {
    $scope.cart = cartService.getCart();
    $scope.cartlength = $scope.cart.length;
  })

  $rootScope.$on("cart.remove",function() {
    $scope.cartHide = true;
  });
  $rootScope.$on("cart.enabled",function() {
    $scope.cartHide = false;
  });
})
app.controller("productsCtrl",function($scope, $http, cartService, $rootScope){
  $scope.cart = [];
  $rootScope.$broadcast("cart.enabled");
  //reading JSON file
  $http.get('data/products.json').then(function (resp){
    $scope.products = resp.data;
    console.log("products",resp.data);
  },function(){
    console.log("Failed to fetch products");
  });

  $scope.addToCart = function(index,quantity) {
    console.log("add to cart called",index,quantity);
    if($scope.products[index])
    {
      var cartProduct = angular.copy($scope.products[index]);
      cartProduct.quantity = quantity;
      //cartProduct.price = quantity*cartProduct.price;
      $scope.cart.push(cartProduct);
      cartService.setCart($scope.cart);
      $rootScope.$broadcast("cart.updated");

      console.log("updated cart",$scope.cart);
    }
  }
})
app.controller("cartCtrl",function($scope,cartService, $rootScope, cartFinal) {
  $scope.cart = cartService.getCart();
  $scope.updatePrice = function(){
    $scope.cartTotal = 0;
    angular.forEach($scope.cart, function(v,k) {
      $scope.cartTotal = $scope.cartTotal + (v.price * v.quantity);
      cartFinal.setCart($scope.cartTotal);
    })
  }
  $scope.updatePrice();


  $scope.updateCart = function(index,quantity) {
    console.log(index,quantity);
    $scope.cart[index].quantity = quantity;
    cartService.updateCart(index,$scope.cart[index]);
    $scope.updatePrice();
  }

  $scope.deleteProduct = function(index) {
    delete $scope.cart[index];
    cartService.removeCart(index);
    $rootScope.$broadcast("cart.updated");
    console.log("Broadcasted cart.updated");
    $scope.updatePrice();
  }
})
app.controller("checkoutCtrl",function($scope,cartFinal,$rootScope, cartService, $http, $timeout, orderService) {
  $rootScope.$broadcast("cart.remove");
  $scope.cartTotal = cartFinal.getCart();
  $scope.cart = cartService.getCart();
  $scope.PurchaseId = null;


  $scope.postPay = function(user,card) {

    $scope.cartPost = {"totalPrice":$scope.cartTotal,
                      "purchaseId" : $scope.pid,
                      "userDetails":$scope.user,
                      "cardDetails":$scope.card,
                      "productList":$scope.cart};
    //checkout controller
    $http.post('checkout/addPurchase', $scope.cartPost).then(function (resp){
      if(resp.data.PurchaseId)
      {
        $scope.PurchaseId = resp.data.PurchaseId;
        orderService.set($scope.PurchaseId);
        window.location.href = "#!/success";
      }
      else{
        window.location.href = "#!/failure";
      }
    },function(){
      console.log("Failed to fetch products");
    });
    console.log("final json",$scope.cartPost);

    //to check server on / off
    $timeout(function () {
      if($scope.PurchaseId == null){
        alert("Failed to communicate with server");
      }
    }, 10000);

  }




});

app.controller("successCtrl",function($scope,orderService) {
  $scope.orderId = orderService.get();
})
