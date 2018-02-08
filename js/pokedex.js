var pokeApp = angular.module('pokedex', ['ngResource']);

// With this you can inject POKEAPI url wherever you want
//Service : constant. Chaque service est son propre provider. Contient des valeurs/objets
pokeApp.constant('POKEAPI', 'https://pokeapi.co');

pokeApp.config(['$resourceProvider', function($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
}]);

//Factory : liens API
pokeApp.factory("resources", function(POKEAPI){
    return{
        listePoke:POKEAPI+'/api/v1/pokedex',
        resPok:'api/v1/pokemon/',
        linkPok:POKEAPI+'/api/v2/pokemon-form/',
    }
});


//Controleur
pokeApp.controller('myCtrl',function($scope, $http, POKEAPI, resources) {
    //Question 3 et 4
    /*$scope.names = [{id:0, name:""},{id:1,name:"Mewtwo"},
    {id:2, name:"Aspicot"},{id:3, name:"Fermite"},
    {id:4,name:"Chenipan"},{id:5,name:"Aeromite"}];*/

    
    //Question 10
    $scope.names = new Array();
    var vm = this;

    $http.get(resources.listePoke).success(function (listePokemon){
        vm.listePokemon = listePokemon;
        angular.forEach(vm.listePokemon.objects[0].pokemon, function(value, key){
            var array = value.resource_uri.split(resources.resPok);
            var idPok = value.resource_uri.substring(15);
            idPok = idPok.substring(-10000, idPok.length-1);
            $scope.names.push({id:idPok,name:value.name});
        });

    }).error(function(error){
        vm.statut = 'Impossible de récupérer la liste des pokémons : ' + error.Message;
    });

    
    //Question 8
    $scope.check = function (id) {
        var lePokemon = this;
        $http.get(resources.linkPok+id).success(function (lePokemon){
            lePokemon.listeCompetence = lePokemon;
            
            //console.log(lePokemon.listeCompetence.sprites.front_default);
            $scope.image = [{
                src: lePokemon.listeCompetence.sprites.front_default,
              }];
    
        }).error(function(error){
            vm.statut = 'Impossible de récupérer la liste des pokémons : ' + error.Message;
        });
    }

    $scope.nomPokemon=""
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


