'use strict'
let path=process.cwd();
var User = require(path+'/app/models/user');

module.exports=function(req,res,next){

        try{
        
            let deleteIdx=req.body.deleteIdx;
            User.findOne({'user.username':req.user.user.username},
            function(err,user){
                if (err) { 
                    console.error(err);
                    res.status('400');
                    return res.end();
                }
                if (!user) {
                    console.log("username username not found");
                    res.status('400');
                    return res.end();
                 }
                user.books.splice(deleteIdx,1);
                user.save(function (err) {  //save to db
            			if (err) {throw err;}
        			    console.log('delete book from user collection','success');
                        next();
                    });
            });
        }
        catch(err){
            console.error('/middleware/deleteBook:',err);
            res.status('400');
            return res.end();
        }

}
