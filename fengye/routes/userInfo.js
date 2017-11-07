/**
 * Created by yao on 2017-5-9 0009.
 */
const db=require("./mySql.js");
function modifyUser(req,res){
    db.connectDB("select u_password from user where u_login=?",[req.body.user],function(error,data){
        if(data[0].u_password==req.body.oldPass){
            db.connectDB("update user set u_name=?,u_password=?,u_qq=? where u_login=?",
                [req.body.name,req.body.pass,req.body.qq,req.body.user],function(error,data){
                    if(error==null){
                        res.send("ok");
                        console.log(error);
                    }else{
                        res.send("error");
                    }

            });
        }else{
            res.send("wrong");
        }
        console.log(data[0].u_password);
    })
}



module.exports={
    modifyUser:modifyUser
};