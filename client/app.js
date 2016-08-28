var app=angular.module('app',['ngResource','ngComponentRouter']);

app.factory('myAjax', ['$resource', function($resource) {
return $resource('/:directive/:user', null,
    {
        'update': { method:'PUT' },
        'login':  {method:'POST',params:{directive:'login'}},
        'logout':  {method:'POST',params:{directive:'logout'}},
        'signup':  {method:'POST',params:{directive:'signup'}},
        'personalinfo':  {method:'POST',params:{directive:'personalinfo'}},
        'addbook':  {method:'POST',params:{directive:'addbook'}},
        'deletebook':  {method:'POST',params:{directive:'deletebook'}},
        'allbooks':  {method:'POST',params:{directive:'allbooks'}},
        'trade':  {method:'POST',params:{directive:'trade'}},
        'tradeInfo':  {method:'POST',params:{directive:'tradeInfo'}},
        'deleteTrade':  {method:'POST',params:{directive:'deleteTrade'}},
        'confirmTrade':  {method:'POST',params:{directive:'confirmTrade'}},
        'mybooks':  {method:'POST',params:{directive:'mybooks'}},
        'saveUserInfo':  {method:'POST',params:{directive:'saveUserInfo'}}
    });
}]);

app.config(function($locationProvider) {
  $locationProvider.html5Mode(true);
})

app.value('$routerRootComponent', 'app')
app.component('app', {
  templateUrl:'client/app.html',
  controller:AppController,
  $routeConfig: [
    {path: '/' , name: 'Home', component: 'home',useAsDefault: true}, 
    {path: '/login', name: 'Login', component: 'login' },
    {path: '/signup', name: 'Signup', component: 'signup' },
    {path: '/mybooks', name: 'Mybooks', component: 'mybooks' },
    {path: '/allbooks', name: 'Allbooks', component: 'allbooks' },
    {path: '/setting', name: 'Setting', component: 'setting' }
  ]
});

function AppController(myAjax,$location){
    var ctrl=this;
    
    ctrl.alreadyLogin=true;
    myAjax.personalinfo()
    .$promise.then(function(response){
        ctrl.username=response.username;
    },function(error){
        ctrl.alreadyLogin=false;
        $location.path('/'); //redirect
    });
    
    ctrl.logout=function(){
      myAjax.logout()
      .$promise.then(function(response){
          ctrl.message='logout success';
          window.location='/'; //redirect
      },function(error){
          ctrl.username=error.status;
      });
    };
    
    ctrl.active={};
    ctrl.navClick=function(name){  //nav bar dynameic click
      ctrl.active={};
      ctrl.active[name]='active';
    }
    ctrl.active[window.location.pathname.replace('/','')]='active'; //initialization
    
}
