'use strict'
var app=angular.module('app');

app.component('mybooks',{
    templateUrl:'/client/mybooks/mybooks.html',
    controller:MybooksController
});

function MybooksController(myAjax){
    var ctrl=this;
    ctrl.addBook=function(search){
        myAjax.addbook({search:search})
        .$promise.then(function(response){
            console.log(response.books);
            ctrl.mybooks.image=response.books.map(function(val) {return val.image});
        },function(error){
            //ctrl.login.status=error.status;
        });
    }
    ctrl.deleteBook=function(idx){
        myAjax.deletebook({deleteIdx:idx})
        .$promise.then(function(response){
            console.log(response);
            ctrl.mybooks.image.splice(idx,1);
        },function(error){
            //ctrl.login.status=error.status;
        });
    }
    
    ctrl.mybooks={};
    myAjax.mybooks({})  //load all my books
    .$promise.then(function(response){
        console.log(response.books);
        ctrl.mybooks.image=response.books.map(function(val) {return val.image});
    },function(error){
        ctrl.mybooks.status=error.status;
    });
};