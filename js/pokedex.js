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
        /*listePoke:POKEAPI+'/api/v1/pokedex',
        resPok:'api/v1/pokemon/',
        linkPok:POKEAPI+'/api/v2/pokemon-form/',
        description:POKEAPI+'/api/v1/description/'*/
        listePoke:POKEAPI+'/api/v2/pokemon/?limit=1000',
        resPok:POKEAPI+'/api/v2/pokemon/',
        linkPok:POKEAPI+'/api/v2/pokemon-form/',
        description:POKEAPI+'/api/v2/ability/'
    }
});

var image="";
var id;


//Controleur pour récupérer informations
pokeApp.controller('myCtrl',function($scope, $http, POKEAPI, resources) {
    //Question 3 et 4
    /*$scope.names = [{id:0, name:""},{id:1,name:"Mewtwo"},
    {id:2, name:"Aspicot"},{id:3, name:"Fermite"},
    {id:4,name:"Chenipan"},{id:5,name:"Aeromite"}];*/

    
    //Question 10
    $scope.names = new Array();
    var vm = this;

    //V2
    $http.get(resources.listePoke).success(function (listePokemon){
        vm.listePokemon = listePokemon;
        angular.forEach(vm.listePokemon.results, function(value, key){
            //var array = value.url.split(resources.resPok);
            var idPok = value.url.substring(34);
            idPok = idPok.substring(-10000, idPok.length-1);
            $scope.names.push({id:idPok,name:value.name});
            this.id = idPok;
        });
        //V1
        /*angular.forEach(vm.listePokemon.Objects[0].pokemon, function(value, key){
            //var array = value.resource_uri.split(resources.resPok);
            var idPok = value.resource_uri.substring(15);
            idPok = idPok.substring(-10000, idPok.length-1);
            $scope.names.push({id:idPok,name:value.name});
            this.id = idPok;
        });*/

    }).error(function(error){
        vm.statut = 'Impossible de récupérer la liste des pokémons : ' + error.Message;
    });

    var vm = this;
    //Question 8
    $scope.check = function (id) {
        var idPok = id.match(/\d+/)[0]; //Récupère nombre dans chaine de caractères
        var lePokemon = this;
        $http.get(resources.linkPok+idPok).success(function (lePokemon){
            lePokemon.listeCompetence = lePokemon;

            //Affecte image
            $scope.image = [{
                src: lePokemon.listeCompetence.sprites.front_default,
            }];

        }).error(function(error){
            vm.statut = 'Impossible de récupérer la liste des pokémons : ' + error.Message;
        });



        $http.get(resources.description+idPok).success(function (lePokemon){
            lePokemon.listeCompetence = lePokemon;
            //Description
            $scope.description=lePokemon.listeCompetence.effect_entries[0].effect;
        }).error(function(error){
            vm.statut = 'Impossible de récupérer la liste des pokémons : ' + error.Message;
        });

        $http.get(resources.resPok+idPok).success(function (lePokemon){
            lePokemon.listeCompetence = lePokemon;
            $scope.pms = [];
            angular.forEach(lePokemon.listeCompetence.moves, function(value, key) {
                //console.log(value.move);
                $scope.pms.push(value.move);
            });


        }).error(function(error){
            vm.statut = 'Impossible de récupérer la liste des pokémons : ' + error.Message;
        });

    };

    //Récupère nom
    $scope.changeId = function(id){
        if(id){
            $scope.nomPokemon = $scope.names[id].name;
        }
    }

    $scope.getId = function(name){
        console.log($scope.names[name].id);
        return $scope.names[name].id;
    }



});


//Controleur pour affichage
pokeApp.controller('myCtrl2',function($scope, $http, POKEAPI, resources) {


});


