'use strict'
var app=angular.module('app');

app.component('setting',{
    templateUrl:'/client/setting/setting.html',
    controller:SettingController
});

function SettingController(myAjax){
    var ctrl=this;
    ctrl.userInfo={};
    
    myAjax.personalinfo()
    .$promise.then(function(response){
        ctrl.userInfo.name=response.name;
        ctrl.userInfo.city=response.city;
        ctrl.userInfo.state=response.state;
    },function(error){
        
    });
    
    ctrl.saveUserInfo=function(){
        myAjax.saveUserInfo({name:ctrl.userInfo.name,city:ctrl.userInfo.city,state:ctrl.userInfo.state})
        .$promise.then(function(response){
            console.log(response);
        },function(error){
            //ctrl.login.status=error.status;
        });
    }
    
};