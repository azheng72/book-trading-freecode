'use strict'
let path= process.cwd();
var Books = require(path+'/app/models/books');
var Traded = require(path+'/app/models/traded');

module.exports=function(req,res,next){
    try{
    Books.findOne({_id:req.body.deleteTrade.origin_id},function(err,book){  //use the origin_id(came from books collection itself) to find the book
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
        book.traded=false;
        book.save(function (err) {  //save to db
            			if (err) {throw err;}
        			    console.log("set 'traded=true' in books collection",'success');
                    });
        Traded.remove({_id:req.body.deleteTrade._id},function (err) {  //also need to delete doc in the Trade collection
            			if (err) {throw err;}
        			    console.log('trade book remove from traded collection','success');
                        next();
                    });        
    });
    }
    catch(err){
            console.error('/middleware/deleteTrade:',err);
            res.status('400');
            return res.end();
    }
}