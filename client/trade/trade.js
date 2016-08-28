var app=angular.module('app');
app.component('trade',{
    templateUrl:'/client/trade/trade.html',
    controller:TradeController,
    bindings:{
        mybooks:'='
    }
});

function TradeController(myAjax,$scope){
    var ctrl=this;
    ctrl.tradeInfo={};
    
    angular.element(document).ready(function () {
        ctrl.showConfirmBtn=window.location.pathname=='/mybooks'? true:false;
    });
    
    myAjax.tradeInfo({})
    .$promise.then(function(response){
            ctrl.tradeInfo=response.tradeInfo;
        },function(error){
            console.log(error.status);
        });
        
    ctrl.deleteTrade= function(myRequest,idx){
        ctrl.tradeInfo.myRequest.splice(idx,1);
        myAjax.deleteTrade({deleteTrade:myRequest})
        .$promise.then(function(response){
                console.log(response);
            },function(error){
                console.log(error.status);
            });        
    }
    
    ctrl.confirmTrade=function(othersRequest,idx){
        ctrl.mybooks.image.push(othersRequest.image);  //mybooks binding from 'mybooks' component
        ctrl.tradeInfo.othersRequest.splice(idx,1);
        console.log('othersRequest',othersRequest);
        myAjax.confirmTrade({confirmTrade:othersRequest})
        .$promise.then(function(response){
                console.log(response);
            },function(error){
                console.log(error.status);
            });        
    }
};