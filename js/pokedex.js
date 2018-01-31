var pokeApp = angular.module('pokedex', ['ngResource']);

// With this you can inject POKEAPI url wherever you want
//Service : constant. Chaque service est son propre provider. Contient des valeurs/objets

/*pokeApp.constant('$POKEAPI',{
    resource :'http://pokeapi.co/api/v2/pokemon/'
});*/

pokeApp.constant('POKEAPI', 'http://pokeapi.co');

pokeApp.config(['$resourceProvider', function($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
}]);


/*pokeApp.appService($http){
    this.getAllPokemon = function(){
        return $http.get(POKEAPI+'/api/v1/:pokemon');
    };
}*/

//Controleur
pokeApp.controller('myCtrl',function($scope, $http, POKEAPI) {
    //Question 3 et 4

    $scope.names = [{id:0, name:""},{id:1,name:"Mewtwo"},
    {id:2, name:"Aspicot"},{id:3, name:"Fermite"},
    {id:4,name:"Chenipan"},{id:5,name:"Aeromite"}];

    /*var obj = {content:null};

    $http.get(POKEAPI).success(function(data) {
        // you can do some processing here
        obj.content = data;
        console.log(obj.content);
    });*/

    var vm = this;

    $http.get(POKEAPI+'/api/v1/pokemon').success(function (listePokemon){
        vm.listePokemon = listePokemon;
    }).error(function(error){
        vm.statut = 'Impossible de récupérer la liste des pokémons : ' + error.Message;
    });
    
    

    /*console.log($http.get(POKEAPI+'.json').success(function(response) {
        return response.data;
    }));*/

    //Question 8
    $scope.check = function (id) {
        console.log($scope.names[id]);
    }

    //Question 10
    /*$scope.liste = function(POKEAPI){
        $scope.POKEAPI = POKEAPI.$resource+$scope.names.id;
        console.log($scope.POKEAPI);
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


