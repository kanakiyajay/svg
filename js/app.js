/*!
** d3 example App
** Licensed under the Apache License v2.0
** http://www.apache.org/licenses/LICENSE-2.0
** Built by Jay Kanakiya ( @techiejayk )
**/

"use strict";

var App = angular.module("svg",[]);

App.controller("CircleCtrl",function  ($scope) {
	$scope.model = {
		cx : 60,
		cy : 100,
		r : 25,
		fill : "purple"
	};
});

App.controller("RectCtrl",function  ($scope) {
	$scope.model = {
		x : 10,
		y : 10,
		height : 100,
		width : 100,
		fill : "green"
	};
});

App.controller("EllipseCtrl",function  ($scope) {
	$scope.model = {
		cx : 100,
		cy : 100,
		rx : 34,
		ry : 10,
		fill : "red"
	};
});

App.controller("LineCtrl",function  ($scope) {
	$scope.model = {
		x1 : 100,
		y1 : 100,
		x2 : 34,
		y2 : 10,
		stroke : "black",
		strokeWidth : 5
	};
});

/* Directive For Spectrum based Color-picker*/

App.directive('uiColorpicker', function() {
    return {
        restrict: 'E',
        require: 'ngModel',
        scope: false,
        replace: true,
        template: "<span><input class='input-small' /></span>",
        link: function(scope, element, attrs, ngModel) {
            var input = element.find('input');
            var options = angular.extend({
                color: ngModel.$viewValue,
                clickoutFiresChange : true ,
                showInput : true ,
                move: function(color) {
                    scope.$apply(function() {
                      ngModel.$setViewValue(color.toHexString());
                    });
                }
            }, scope.$eval(attrs.options));

            ngModel.$render = function() {
              input.spectrum('set', ngModel.$viewValue || '');
            };

            input.spectrum(options);
        }
    };
});