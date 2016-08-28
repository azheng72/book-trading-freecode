'use strict';
var path = process.cwd();
var addBook=require(path+'/app/middleware/addBook');
var deleteBook=require(path+'/app/middleware/deleteBook');
var allBooks=require(path+'/app/middleware/allBooks');
var trade=require(path+'/app/middleware/trade');
var deleteTrade=require(path+'/app/middleware/deleteTrade');
var confirmTrade=require(path+'/app/middleware/confirmTrade');
var tradeInfo=require(path+'/app/middleware/tradeInfo');
var myBooks=require(path+'/app/middleware/myBooks');
var saveUserInfo=require(path+'/app/middleware/saveUserInfo');
var signUp=require(path+'/app/middleware/signUp');

module.exports=function(app,passport){

    
        
    function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
		    if(req.method=='POST'){
		        res.status('401');
		        res.end();
		    }
			
		}
	}
	
    app.route('/addbook')
        .post(isLoggedIn,addBook,
            function(req,res){
                res.end();
            }
        )
    app.route('/deletebook')
        .post(isLoggedIn,deleteBook,
            function(req,res){
                res.end();
            }
        )
    app.route('/allbooks')
        .post(isLoggedIn,allBooks,
            function(req,res){
                res.end();
            }
        )
        
    app.route('/trade')
        .post(isLoggedIn,trade,
            function(req,res){
                res.end();
            }
        )
        
    app.route('/deleteTrade')
        .post(isLoggedIn,deleteTrade,
            function(req,res){
                res.end();
            }
        )
        
    app.route('/confirmTrade')
        .post(isLoggedIn,confirmTrade,
            function(req,res){
                res.end();
            }
        ) 
        
    app.route('/tradeInfo')
        .post(isLoggedIn,tradeInfo,
            function(req,res){
                res.end();
            }
        )
        
    app.route('/mybooks')
        .post(isLoggedIn,myBooks,
            function(req,res){
                res.end();
            }
        )
        
    app.route('/saveUserInfo')
        .post(isLoggedIn,saveUserInfo,
            function(req,res){
                res.end();
            }
        )
        
    app.route('/login')
        .post(
            passport.authenticate('local'), //access to next middleware when passport authenticate success, otherwise stop here
            function(req,res){              //login success
                console.log('user login success');
                res.status('200');
                res.end();
            }
        )
        // .get(
        //     function(req,res){
        //         res.sendFile(path+'/client/index.html');
        //     }
        // );
        
    app.route('/personalinfo')
        .post(isLoggedIn,
            function(req,res){              //already login success
                res.send({username:req.user.user.username,
                            name:req.user.user.name,
                            city:req.user.user.city,
                            state:req.user.user.state
                });
                res.end();
            }
        );
        
    app.route('/signup')
        .post(signUp,
                passport.authenticate('local'), //access to next middleware when passport authenticate success, otherwise stop here
                function(req,res){              //signed up and login success
                    res.status('200');
                    res.end();
                }
        );
        
    app.route('/logout')
        .post(
                function(req,res){ 
                    req.logout();
                    console.log('user logout success');
                    res.end();
                }
        );
      
    app.route('/*')
        .get(//isLoggedIn,
            function(req,res){             
                res.sendFile(path+'/client/index.html')
            }
        );     
};