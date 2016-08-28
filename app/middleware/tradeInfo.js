'use strict'
let path= process.cwd();
var Traded = require(path+'/app/models/traded');

module.exports=function(req,res,next){
    let tradeInfo={myRequest:[],othersRequest:[]};
    
    try{
    Traded.find({username:req.user.user.username},function(err,traded){
        if (err) { 
                    console.error(err);
                    res.status('400');
                    return res.end();
                }
        tradeInfo.myRequest=traded;
        Traded.find({username:{$ne:req.user.user.username}},function(err,traded){
            if (err) { 
                    console.error(err);
                    res.status('400');
                    return res.end();
                }
            tradeInfo.othersRequest=traded;
            res.send({tradeInfo:tradeInfo});
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