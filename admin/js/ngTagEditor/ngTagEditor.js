'use strict';

angular.module('ngTagEditor', [])
	.filter('getCol', function(){
		return function (items, row){
			return items && items.map(function (item){
					return item[row];
			}).join(',');
		}
	}).directive('focusMe', ['$timeout', '$parse', function($timeout, $parse){
		return{
			link: function(scope, element, attrs){
				var model = $parse(attrs.focusMe);
				scope.$watch(model, function(value){
					if(value === true){ 
						$timeout(function(){
							element[0].focus(); 
						});
					}
				});
				element.bind('blur', function(){
					scope.$apply(model.assign(scope, false));
				});
			}
		};
	}]).directive('tagEditor', function(){
		return{
			restrict: 'AE',
			/* require: 'ngModel',*/
			scope: {
				tags: '=ngModel',
				suggestOptions :'=suggestions'
			},
			replace: true,
			controller: ['$scope', '$attrs', '$element', '$http', '$compile','$templateRequest', function($scope, $attrs, $element, $http, $compile, $templateRequest){


				$scope.options = [];
				$scope.options.output = $attrs.output || 'name';
				$scope.options.placeholder = $attrs.placeholder || 'Tags';
				$scope.options.apiOnly = $attrs.apiOnly || false;
				$scope.search = '';
			
				$scope.$watch('search', function(search){
					if( search ){
						$scope.suggestions = $scope.suggestOptions.filter(function(){
							return (new RegExp( search)).test( $scope.suggestOptions )
						})
					}

				});
				$scope.add = function(id, name){
					$scope.tags.push({'id':id, 'name':name});
					$scope.search = '';
					$scope.$apply();
					console.log( $scope.tags )
				};
				$scope.remove = function(index){
					$scope.tags.splice(index, 1);
				};
				



				$templateRequest($attrs['template']).then(function( tmp){
					var $compileTpl = $compile(tmp)($scope)

					$compileTpl.find('input').on('keydown', function(e){
						var keys = [8, 13, 32];
						if(keys.indexOf(e.which) !== -1){
							if(e.which == 8){ /* backspace */
								if($scope.search.length === 0 && $scope.tags.length){
									$scope.tags.pop();
									e.preventDefault();
								}
							}
							else if(e.which == 32 || e.which == 13){ /* space & enter */
								if($scope.search.length && !$scope.apiOnly){
									if(!$scope.apiOnly){
										$scope.add(undefined, $scope.search);
										e.preventDefault();
									}
								}
							}
							$scope.$apply();
						}
					});
					$element.replaceWith( $compileTpl )
				})
			}]
		}
	});
