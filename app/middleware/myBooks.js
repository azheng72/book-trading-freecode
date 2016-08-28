'use strict'
let path= process.cwd();
var User = require(path+'/app/models/user');

module.exports=function(req,res,next){
    try{
    User.findOne({'user.username':req.user.user.username},function(err,user){
        if (err) { 
                    console.error(err);
                    res.status('400');
                    return res.end();
                }
        res.send({books:user.books});
        next();
    });
    }
    catch(err){
        console.error('/middleware/myBooks',err);
        res.status('400');
        res.end();
    }
}