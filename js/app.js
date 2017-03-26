(function (angular) {
	'use strict';

	// Your starting point. Enjoy the ride!
	var app = angular.module('myApp',['service'])
	app.controller('demoController',['$scope','$location','myService',function($scope,$location,myService){
		//展示模块
		$scope.myTodos = myService.get();

		//添加任务
		$scope.newTodo = '';
		$scope.add = function(){
			myService.add($scope.newTodo);
			$scope.newTodo = '';
		}

		//删除任务
		$scope.delete = function(id){
			myService.delete(id);
		}

		// 修改任务内容
		$scope.isEditingId = -1;
		$scope.edit = function(id){
			$scope.isEditingId = id;
		}
		$scope.save = function(){
			$scope.isEditingId = -1;
			myService.save();
		}

		// 切换任务完成与否的状态
		$scope.changed = function(){
			myService.save();
		}
		// 批量切换任务完成与否的状态
		$scope.selectedAll = false;
		$scope.change = function(){ // 点击的时候已经改变的selectedAlld的值
			myService.change($scope.selectedAll);
		}
		// 显示未完成的任务数
		$scope.getActive = function(){
			return myService.getActive();
		}

	 	// 清除所有已完成任务
		$scope.remove = function(){
			myService.remove();
		}

 		// 切换显示不同状态的任务
			// $scope.isCompleted = {};
			// $scope.active = function(){
			// 	$scope.isCompleted.completed = false;
			// }
			// $scope.completed = function(){
			// 	$scope.isCompleted.completed = true;
			// }
			// $scope.all = function(){
			// 	$scope.isCompleted = {};
			// }
		//锚点值做法 location.url();
		$scope.loa = $location;
		$scope.isCompleted = {};
		$scope.$watch('loa.url()',function(now,old){
			switch(now){
				case '/active':
				$scope.isCompleted.completed = false;
				breack;
				case '/':
				$scope.isCompleted = {};
				break;
				case '/completed':
				$scope.isCompleted.completed = true;
				break;
			}
		})




	}])
})(angular);
