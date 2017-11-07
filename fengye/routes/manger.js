/**
 * Created by yao on 2017-5-8 0008.
 */
const db=require("./mySql.js");
module.exports={
    getVideo:getVideo,
    deleteVideo:deleteVideo,
    getPic:getPic,
    deletePic:deletePic
};

function getVideo(req,res){
    db.connectDB("select * from video",[],function(error,data){
        res.send(data);
    })
}
function deleteVideo(req,res){
    var num=req.query.num;
    db.connectDB("delete from video where v_num=?",[num],function(error,data){
        res.send("ok");
    })
}

function getPic(req,res){
    db.connectDB("select * from img",[],function(error,data){
        console.log(data);
        res.send(data);
    })
}
function deletePic(req,res){
    db.connectDB("delete from img where img_num=?",[req.query.num],function(error,data){
        res.send(data);
    })
}