'use strict'
let path= process.cwd();
var Books = require(path+'/app/models/books');
var Traded = require(path+'/app/models/traded');

module.exports=function(req,res,next){
    try{
    Books.findOne({_id:req.body.trade_id},function(err,book){
        if (err) { 
                    console.error(err);
                    res.status('400');
                    return res.end();
                }
        if (!book) {
                    console.log("book _id not found");
                    res.status('400');
                    return res.end();
                 }
        let newTraded=new Traded;
        newTraded.title=book.title;
        newTraded.image=book.image;
        newTraded.username=req.user.user.username;
        newTraded.origin_id=book._id;
        newTraded.save(function (err) {  //save to db
            			if (err) {throw err;}
            			res.send({newTrade:newTraded});
        			    console.log('trade book add to traded collection','success');
                    });        
        book.traded=true;
        book.save(function (err) {  //save to db
            			if (err) {throw err;}
        			    console.log("set 'traded=true' in books collection",'success');
                        next();
                    });
    });
    }
    catch(err){
            console.error('/middleware/trade:',err);
            res.status('400');
            return res.end();
    }
}