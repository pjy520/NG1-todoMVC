(function(angular){
  var app = angular.module('service',[]);
  app.service('myService',['$window',function($window){
    var str = $window.localStorage.getItem('Todos') || '[]'; //json字符串
    var myTodos =JSON.parse(str);
    this.get = function(){
      return myTodos;
    }

    this.add = function(newTodo){
      if(newTodo){
        myTodos.push({
					id:Math.random(),
					name:newTodo,
					completed:false
				})
      }
      this.save();
    }

    this.delete = function(id){
      for(var i = 0; i < myTodos.length; i++){
        if(myTodos[i].id == id){
          myTodos.splice(i,1);
        }
      }
      this.save();
    }


    this.save = function(){
      var str = JSON.stringify(myTodos);
      $window.localStorage.setItem('Todos',str);
    }


    this.change = function(selectedAll){
      for(var i = 0; i < myTodos.length; i++){
			     myTodos[i].completed = selectedAll;
			}
      this.save();
    }

    this.getActive = function(){
      var arr = [];
      for(var i = 0; i < myTodos.length; i++) {
        if(!myTodos[i].completed){
          arr.push(myTodos[i]);
        }
      }
      return arr.length;
    }

    this.remove = function(){
      for(var i = myTodos.length - 1; i >= 0; i--){
				if(myTodos[i].completed == true){
					myTodos.splice(i,1);
				}
			}
      this.save();
    }

  }])
})(angular)
