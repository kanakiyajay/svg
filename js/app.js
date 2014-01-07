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

App.controller("PolyLineCtrl",function  ($scope) {
	$scope.model = {
		stroke : "black",
		fill : "none"
	};

	$scope.points = [{
			top : 20,
			left: 100,
		},{
			top : 40,
			left: 60,
		},{
			top : 70,
			left: 80,
		},{
			top : 100,
			left: 20,
		}];

	$scope.getPoints = function  () {
		var str = "";
		for (var i = 0; i < $scope.points.length; i++) {
			str += $scope.points[i].left + "," + $scope.points[i].top+" ";
		}
		return str;
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

/* Directive for Draggable */

App.directive('draggable', function($document) {
	return {
		restrict : 'EA',
		require : '?ngModel',
		transclude : true,
		link: function(scope, element, attr) {
			var index = parseInt(attr.ponindex);
			console.log(index);
			var startX = 0, startY = 0, x = attr.x, y = attr.y;
			element.css({
				top:attr.y+'px',
				left:attr.x+'px',
				position : 'absolute',
				width: '6px',
				backgroundColor : 'blue',
				height : '6px',
				cursor: 'pointer'
			});

			element.on('mousedown', function(event) {
			// Prevent default dragging of selected content
				event.preventDefault();
				startX = event.pageX - x;
				startY = event.pageY - y;
				$document.on('mousemove', mousemove);
				$document.on('mouseup', mouseup);
			});

			function mousemove(event) {
				y = event.pageY - startY;
				x = event.pageX - startX;
				element.css({
					top: y + 'px',
					left:  x + 'px'
				});
				scope.$apply(function  () {
					scope.points[index].top = y;
					scope.points[index].left = x;
				});
			}

			function mouseup() {
				$document.unbind('mousemove', mousemove);
				$document.unbind('mouseup', mouseup);
			}
		}
	}
});
