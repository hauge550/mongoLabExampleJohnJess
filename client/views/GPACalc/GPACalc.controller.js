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
            $scope.classes.push({class:$scope.classField, grade:$scope.gradeField, credits:$scope.creditField});
            totalCredits = totalCredits + parseInt($scope.creditField);
            totalGradePoint = totalGradePoint + (parseInt($scope.creditField) * parseInt($scope.returnGradeValue($scope.gradeField.toUpperCase())));
            $scope.classField = "";
            $scope.gradeField = "";
            $scope.creditField = "";
        //}
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
    $scope.removeClasses = function(index){
        var gradeToRemove = "";
        gradeToRemove = $scope.returnGradeValue($scope.classes[index].grade);
        var creditsToRemove = "";
        creditsToRemove = $scope.classes[index].credits;
        totalGradePoint -= (gradeToRemove * creditsToRemove);
        totalCredits -= creditsToRemove;
        $scope.classes.splice(index,1);
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
