'use strict'
let path=process.cwd();
var User = require(path+'/app/models/user');
var Traded = require(path+'/app/models/traded');


module.exports=function(req,res,next){
        try{
            let title=req.body.confirmTrade.title;
            let image=req.body.confirmTrade.image;
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
                user.books.push({title:title,image:image});
                user.save(function (err) {  //save to db
            			if (err) {throw err;}
        			    console.log('add trade book to user collection','success');
                    });
                Traded.remove({_id:req.body.confirmTrade._id},function (err) {  //also need to delete doc in the Trade collection
            			if (err) {throw err;}
        			    console.log('trade book remove from traded collection','success');
                        next();
                    });        
            });
        }
        catch(err){
            console.error('/middleware/confirmTrade:',err);
            res.status('400');
            return res.end();
        }
}