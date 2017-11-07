const db=require("./mySql.js");
module.exports={
    login:login,
    checkUser:checkUser
};
function checkUser(req,res){
    console.log(req.session.userId);
    console.log(req.session.userName);
    console.log(req.session);
    if(req.session.userId){
        res.send(req.session.userName);
    }else{
        res.send("null");
    }
}
function login(req,res){
    var sql="select u_name,u_login from user where u_login=? and u_password=?";
    var arr=[req.body.login,req.body.pass];
    var sql2="select m_num from manger where m_num=? and m_password=?";
    //console.log(req.body);
    db.connectDB(sql,arr,function(error,data) {
        var arrResult=[];
        if (data.length > 0) {
            arrResult.push("index.html");
            arrResult.push( data[0].u_login);
            arrResult.push(data[0].u_name);
            res.send(arrResult);
            req.session.userId = data[0].u_login;
            req.session.userName = data[0].u_name;
        } else {
            db.connectDB(sql2,arr,function(error, data) {
                console.log(error);
                if (data.length > 0) {
                    arrResult.push("manger.do");
                    arrResult.push(data[0].m_num);
                    arrResult.push(data[0].m_num);
                    res.send(arrResult);
                }
                else {
                    res.send("error");
                }
            });
        }
    })
}
