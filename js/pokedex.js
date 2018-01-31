var pokeApp = angular.module('pokedex', ['ngResource']);

// With this you can inject POKEAPI url wherever you want
//Service : constant. Chaque service est son propre provider. Contient des valeurs/objets
pokeApp.constant('POKEAPI', (function(id) {
    var resource = 'http://pokeapi.co';
    return {
        POKEAPI : resource + '/api/v1/pokedex/:'+id
    }
})());



//Controleur
pokeApp.controller('myCtrl', function($scope, POKEAPI) {
    //Question 3 et 4
    $scope.names = [{id:0, name:""},{id:1,name:"Mewtwo"},
    {id:2, name:"Aspicot"},{id:3, name:"Fermite"},
    {id:4,name:"Chenipan"},{id:5,name:"Aeromite"}];


    //Question 8
    $scope.check = function (id) {
        console.log($scope.names[id]);
    }

    //Question 10
    /*$scope.liste = function(POKEAPI){
        POKEAPI = POKEAPI;
        console.log(POKEAPI);
    }*/
    $scope.nomPokemon="Pokémon"
    //Récupère nom
    $scope.changeId = function(id){
        if(id){
            $scope.nomPokemon = $scope.names[id].name;
        }
    }

    $scope.getId = function(name){
        return $scope.names[name].id;
    }
});
