/**
 * Created by lynch446 on 2/6/15.
 */
'use strict';

console.log("GPACalc.js loaded!");

angular.module("appModule")
    .config(function($stateProvider){
        $stateProvider
            .state('GPACalc', {
                url: '/GPACalc',
                templateUrl: 'views/GPACalc/GPACalc.html',
                controller: 'gpaCtrl'
            });
    });