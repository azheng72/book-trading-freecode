
var app=angular.module('app');
app.component('login',{
    templateUrl:'/client/login/login.html',
    controller:LoginController,
    bindings: {
        '$router': '<'
      }
});

function LoginController(myAjax){
    var ctrl=this;
    ctrl.login={};
    ctrl.login.error=false;
    
    ctrl.loginSubmit=function(){
        myAjax.login({username:ctrl.login.username,password:ctrl.login.password})
        .$promise.then(function(response){
            window.location='/';
        },function(error){
            ctrl.login.error=true;
            if(error.status=='401')
                ctrl.login.message='Incorrect username or password';
            if(error.status=='400')
                ctrl.login.message='Invalid username or password';
        });
        
    }
    
};