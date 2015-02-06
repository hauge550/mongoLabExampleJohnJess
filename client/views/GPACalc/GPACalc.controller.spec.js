/**
 * Created by lynch446 on 2/6/15.
 */
'use strict';
//========Testing GPA Controller==================================

describe('Testing controller: gpaCtrl', function(){
    beforeEach(module('mainApp'));


    var gpaCtrl, scope;

    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        gpaCtrl = $controller('gpaCtrl', {
            $scope: scope
        });
    }));

    it('should contain classes', function(){
        expect(scope.classes.length > 0).toEqual(false);
    });

    it('should return badGrade', function(){
        expect(scope.returnGpaColor(0)).toBe("badGrade");
    });

    it('should return an 4.0', function(){
        expect(scope.returnGradeValue("A")).toBe(4.0);
    });

    it('should return an 4.0', function(){
        expect(scope.returnGradeValue("D")).toBe(1.0);
    });
});