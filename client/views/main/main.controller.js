'use strict';

angular.module("appModule")
    .controller('mainCtrl', function($scope, $http){
        console.log("main controller loaded!");

        $scope.textField = "";

        $scope.weightField = "";

        // Normally, data like this would be stored in a database, and this controller would issue an http:get request for it.
        $scope.data = [];

        $scope.getPets = function(){
            $http.get('api/pets').success(function(pets) {
                $scope.data = pets;
            });
        };

        $scope.getPets();

        $scope.addData = function() {
            if ($scope.textField.length >= 1 && $scope.weightField >= 0) {
                $scope.data.push({text: $scope.textField, number: $scope.weightField});
                $scope.textField = "";
                $scope.weightField = "";
            }
            $http.post('api/pets', $scope.data).success(function () {
                $scope.getPets();
            });
        };

        //
        //$http.post('api/pets', {text: $scope.textField}).success(function(){
        //    $scope.getPets();

        $scope.removeData = function(index){
            $http.delete('/api/pets/' + $scope.data[index]._id).success(function(){
                $scope.getPets();
            });
        };

        $scope.cat = function(str1, str2){
            return str1 + str2;
        };

        $scope.itemsInList = function(){
            return $scope.data.length;
        };

    });