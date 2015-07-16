angular.module( 'Basket.home', [
  'ui.router',
  'plusOne',
  'firebase'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'home', {
    url: '/home',
    views: {
      "main": {
        controller: 'HomeCtrl',
        templateUrl: 'home/home.tpl.html'
      }
    },
    data:{ pageTitle: 'Home' }
  });
})

.controller('HomeCtrl',function HomeController($scope,$location,$firebaseArray){
  var API_URL = 'https://basketapp.firebaseio.com/basket';
  var fireRef = new Firebase(API_URL);

  $scope.basket = $firebaseArray(fireRef);
  $scope.newItem = '';
  $scope.qty = '';

  $scope.addItem = function(){
    var newItem = $scope.newItem
    var qty = $scope.qty;
    //if the length of item is 0 it will return nothing
    if (!newItem.length){
      return;
    }
    $scope.basket.$add({
        name:newItem,
        qty:qty,
        done:false
    });
  };
});
