var app=angular.module('app');
app.component('signup',{
    templateUrl:'/client/signup/signup.html',
    controller:SignupController
});

function SignupController(myAjax){
    var ctrl=this;
    ctrl.signup={};
    ctrl.signup.error=false;
    
    ctrl.signupSubmit=function(){
        myAjax.signup({username:ctrl.signup.username,password:ctrl.signup.password})
        .$promise.then(function(response){
            window.location='/';
        },function(error){
            ctrl.signup.error=true;
            if(error.status=='422')
                ctrl.signup.message='Username already existed';
            if(error.status=='400')
                ctrl.signup.message='Invalid username or password';
        });
        
    }
};