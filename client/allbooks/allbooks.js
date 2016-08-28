'use strict'
// var allbooks=angular.module('allbooks',[]);
var app=angular.module('app');

app.component('allbooks',{
    templateUrl:'/client/allbooks/allbooks.html',
    controller:AllbooksController
});

function AllbooksController(myAjax,$compile){
    let ctrl=this;
    ctrl.allbooks=[];
    ctrl.icon=[]; 
    ctrl.newTrade=[];
    
    myAjax.allbooks({})
    .$promise.then(function(response){
            ctrl.allbooks=response.books;//.map((val)=>{val.forceChange='no';return val});
            for(let i=0;i<ctrl.allbooks.length;i++)
                ctrl.icon.push('glyphicon-refresh');
        },function(error){
            console.log(error.status);
        });

        
    ctrl.trade=function(book,idx){
        ctrl.icon[idx]='glyphicon-ok-circle';
        myAjax.trade({trade_id:book._id})
        .$promise.then(function(response){
            ctrl.newTrade.push(response.newTrade);
            console.log(ctrl.newTrade);
            
        },function(error){
            //ctrl.login.status=error.status;
        });
    }
}
