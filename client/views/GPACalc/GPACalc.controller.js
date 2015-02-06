/**
 * Created by lynch446 on 2/6/15.
 */
//==================== GPA CONTROLLER ====================================
'use strict';
angular.module("appModule")
    .controller('gpaCtrl', function($scope, $http){
        console.log("gpa controller loaded!");

        $scope.classField = "";

        $scope.gradeField = "";

        $scope.creditField = "";

        $scope.classes =[];

        var totalCredits = 0;

        var totalGradePoint = 0;

        $scope.getSaveClass = function(){
            $http.get('api/pets').success(function(pets) {
                $scope.classes = pets;
            });
        };

        $scope.getSaveClass();

    $scope.returnGradeValue = function(str){
        if (str === "A") {
            return 4.0;
        } else if (str === "B") {
            return 3.0;
        } else if (str === "C") {
            return 2.0;
        } else if (str === "D") {
            return 1.0;
        } else {
            return 0;
        }
    };

    $scope.addClass = function(){
        //if(!$scope.classField.length >=1){
        //    incorrectClassAlert();
        //} else if(!$scope.gradeField.length == 1){
        //    incorrectGradeAlert();currentGpa
        //} else if(!$scope.creditField.length == 1){
        //    incorrectCreditAlert();
        //} else if(isNaN($scope.creditField)){
        //    incorrectCreditAlert();
        //} else {
        if ($scope.classField.length >= 1 && $scope.gradeField.length >= 1 && $scope.creditField.length >= 1) {
            $scope.classes.push({
                className: $scope.classField,
                gradeEarned: $scope.gradeField,
                numberOfCredits: $scope.creditField
            });
            totalCredits = totalCredits + parseInt($scope.creditField);
            totalGradePoint = totalGradePoint + (parseInt($scope.creditField) * parseInt($scope.returnGradeValue($scope.gradeField.toUpperCase())));
            $scope.classField = "";
            $scope.gradeField = "";
            $scope.creditField = "";
        }

        $http.post('api/pets', $scope.classes).success(function () {
            $scope.getSaveClass();
        });
        //}

        //$scope.addData = function() {
        //    if ($scope.textField.length >= 1 && $scope.weightField >= 0) {
        //        $scope.data.push({text: $scope.textField, number: $scope.weightField});
        //        $scope.textField = "";
        //        $scope.weightField = "";
        //    }
        //    $http.post('api/pets', $scope.data).success(function () {
        //        $scope.getPets();
        //    });
        //};
    };


    $scope.currentGpa = function(){
        return (totalGradePoint/totalCredits).toFixed(3);
    };

    $scope.classesInList = function(){
        return $scope.classes.length;
    };

    $scope.totalCredits = function(){
        return totalCredits;
    };


    //Removes class from table as well as updating global variables that affect the displayed GPA
    //$scope.removeClasses = function(index){
    //    var gradeToRemove = "";
    //    gradeToRemove = $scope.returnGradeValue($scope.classes[index].grade);
    //    var creditsToRemove = "";
    //    creditsToRemove = $scope.classes[index].credits;
    //    totalGradePoint -= (gradeToRemove * creditsToRemove);
    //    totalCredits -= creditsToRemove;
    //    $scope.classes.splice(index,1);
    //};

        $scope.removeClass = function(index){
            $http.delete('/api/pets/' + $scope.classes[index]._id).success(function(){
                $scope.getSaveClass();
            });
        };


    //Returns the name of a class that is dependant upon the quality of GPA
    $scope.returnGpaColor = function(current){
        if(current >= 3){
            return "goodGrade";
        } else if (current > 2 && current < 3){
            return "okGrade";
        } else if (current <= 2) {
            return "badGrade";
        }
    }
});
