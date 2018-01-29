var pokeApp = angular.module('pokedex', ['ngResource']);

// With this you can inject POKEAPI url wherever you want
pokeApp.constant('POKEAPI', 'http://pokeapi.co');

pokeApp.config(['$resourceProvider', function($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
}]);

pokeApp.controller('myCtrl', function($scope) {
    //Question 3 et 4
    //var id = ["1","2","3","4","5"];
    //$scope.id = {id};
    $scope.names = [{id:0, name:""},{id:1,name:"Mewtwo"},
    {id:2, name:"Aspicot"},{id:3, name:"Fermite"},
    {id:4,name:"Chenipan"},{id:5,name:"Aeromite"}];
    /*var valeur = ["","Mewtwo","Aspicot","Fermite",
    "Chenipan","Aeromite"];
    $scope.name = valeur;*/
    /*$scope.namepoke = ["Mewtwo","Aspicot","Fermite",
    "Chenipan","Aeromite"];*/
});
