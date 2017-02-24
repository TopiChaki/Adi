var app =angular.module('adi',['ngRoute', 'xeditable', 'ngStorage']);
app.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // 'bs2', 'default'
});
app.config(function($routeProvider) {
		$routeProvider

			
			.when('/', {
				templateUrl : 'pages/home.html',
				controller  : 'mainController'
			})

			
			.when('/order_entry', {
				templateUrl : 'pages/order_entry.html',
				controller  : 'orderEntryController'
			})

			
			.when('/customer_creation', {
				templateUrl : 'pages/customer_creation.html',
				controller  : 'cust_createController'
			})
			
			.when('/log_sin', {
				templateUrl : 'pages/log_sin.html',			
				controller  : 'log_sinController'
			})
			

			
	});
app.controller('mainController', function($scope, Page, User){
Page.setTitle('Home');
$scope.Page = Page;
$scope.User = User;
});
app.controller('orderEntryController',function($scope,$http, Page){
	Page.setTitle('Order Entry');
	$scope.cnt=2;
	var thisCtrl = this;

	$scope.user= {
		name:'Chhagan'
	};
	$scope.bill_to_addr = {};
	$scope.sold_to_addr = {};
	$scope.insertions=[
	{
		insertion: '1',
		publication: '2',
		from_date: '1-3-17',
		to_date: '8-3-17',
		price: 500
	},
	{
		insertion: '2',
		publication: '2',
		from_date: '1-3-17',
		to_date: '8-3-17',
		price: 500
	}
	];
	
	$scope.addRow = function(){
		$scope.cnt = $scope.cnt+1;
		$scope.insertions.push({
			insertion: $scope.cnt,
			publication: '2',
			from_date: '1-3-17',
			to_date: '8-3-17',
			price: 500
		});
	};
	$scope.update = function(){
		$scope.bill_to_addr = angular.copy($scope.sold_to_addr);
	};
	
	 $http.get('test.json').success(function(data) {
	$scope.inserts = data;
	}); 
});

app.controller('cust_createController',function($scope, Page){
	Page.setTitle('Customer Creation');
	$scope.addresses=[
	{
		address: '1',
		city: '2',
		state: '1-3-17',
		zip: '8-3-17',
		country: 500,
		number: 9874563210
	},

	];
	
	$scope.addnewadd = function(){
		
		$scope.addresses.push({
		address: '2',
		city: '2',
		state: '1-3-17',
		zip: '8-3-17',
		country: 500,
		number: 9874563210
		});
	}
	
});
app.controller('log_sinController', function($scope, $localStorage, $sessionStorage, $window, Page, User){
	$scope.Save = function () {
                
				User.Set($scope.username);
				$scope.User = User;
            };
            
	Page.setTitle('Login Signup');
});
/*app.controller('log_sinController', function ($scope, $localStorage, $sessionStorage, $window) {
            $scope.Save = function () {
                $localStorage.LocalMessage = "LocalStorage: My name is Mudassar Khan.";
                $sessionStorage.SessionMessage = "SessionStorage: My name is Mudassar Khan.";
            }
            $scope.Get = function () {
                $window.alert($localStorage.LocalMessage + "\n" + $sessionStorage.SessionMessage);
            }
        });*/
app.factory('Page', function(){
  var title = 'Home page';
  return {
    title: function() { return title; },
    setTitle: function(newTitle) { title = newTitle; }
  };
});
app.factory('User', function(){
  var user_name = 'Guest';
  return {
    Get: function() { return user_name; },
    Set: function(newName) { user_name=newName; }
  };
});
app.directive('datepicker', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ngModelCtrl) {
            element.datepicker();
            element.bind('blur keyup change', function(){
                var model = attrs.ngModel;
                if (model.indexOf(".") > -1) scope[model.replace(/\.[^.]*/, "")][model.replace(/[^.]*\./, "")] = element.val();
                else scope[model] = element.val();
            });
        }
    };
});