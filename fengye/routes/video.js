/**
 * Created by yao on 2017-5-8 0008.
 */
    "use strict";
const db=require("./mySql.js");

function getVideo(req,res){
    var sql="select v_src,v_name from video where v_src like ? ";
    var arr=[req.query.video+"%"];
    db.connectDB(sql,arr,function(error,data){
        console.log(data);
        if(data.length>0){
            res.send(data);
        }else{
            res.send("novideo");
        }
    });
}

module.exports={
    getVideo:getVideo
};