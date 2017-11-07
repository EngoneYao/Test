/**
 * Created by yao on 2017-5-8 0008.
 */
"use strict";
const mysql=require("mysql");
function connectDB(sql,arr,fun){
    let db = mysql.createConnection({//创建数据库链接
        host:"localhost",
        port:"3306",
        user:"root",
        password:"root",
        database:"graduate"
    });
    db.connect();//打开数据库
    db.query(sql,arr,fun);//查询数据库fun有两个依赖注入的参数(error，data)，
    //如果数据库查不到数据，返回空数组，等于"",也可以用length判断是否查到数据
    db.end();//关闭链接
}


module.exports={
    connectDB:connectDB
};
