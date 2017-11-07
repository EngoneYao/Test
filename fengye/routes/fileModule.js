/**
 * Created by yao on 2017-5-9 0009.
 */
//在两个中targetPath不知为什么必须加项目名才有用，上课的时候代码没有
"use strict";
const fs=require("fs");
const db=require("./mySql.js");
function myUpload(req,res){
    //console.log(req.files);//这时req.body是空的，而req对象的files属性才是存文件的信息
    //console.log(req.files.asyncFile);//asyncFile是页面表单中自己命的名
    let tempPath = req.files.asyncFile.path;//获取临时存放文件的文件路径和名字
    let targetPath ="day8down/public/upload/"+req.files.asyncFile.name;//要存放的路径+获取文件原始名字
    fs.rename(tempPath,targetPath,function(error){//fs自带移动文件函数，第三个是回调函数，但是他只存了错误信息
        res.send("上传成功");
        console.log(error);
    });



}
function uploadPic(req,res){
    console.log(req.files.myFile);
    //这里用到了stream，他是可读可写
    let tempPath = req.files.myFile.ws.path;//因为用流上传的文件，最好用流里面文件的路径
    var date=new Date();//设置图片编号
    var str="";
    //str+=date.getYear();///年
    //str+=date.getMonth();//月
    //str+=date.getDate();//日
    str+=date.getHours();//时
    str+=date.getMinutes();//分
    str+=date.getSeconds();//秒
    str+=date.getMilliseconds();//毫秒
    //var _name=String(req.files.myFile.name).split(".");
    //_name=_name[1];
    let targetPah = "public/img/picture/"+req.files.myFile.name;
    fs.createReadStream(tempPath).pipe(fs.createWriteStream(targetPah));//读写可以同时进行，pipe相当
    // 于管道，一边创建读取文件流的同时创建一个写入的文件流，将临时文件写入最终文件夹
    fs.unlink(tempPath);//删除临时文件
    db.connectDB("insert into img values(null,?,?,null,null,null)",[req.files.myFile.name,str],function(error,data){
        if(error==null){
            db.connectDB("insert into imgtypetable values(null,?,?)",[str,req.body.type],function(error,data){
                if(error==null){
                    res.send("完成");
                }
                else{
                    res.send("上传错误");
                }
            });
        }
        else{
            res.send("上传错误");
        }
    });



}
function uploadVideo(req,res){
    //console.log(req.files.myFile);
    //这里用到了stream，他是可读可写
    let tempPath = req.files.myFile.ws.path;//因为用流上传的文件，最好用流里面文件的路径
    var date=new Date();//设置图片编号
    var str="";
    //str+=date.getYear();///年
    //str+=date.getMonth();//月
    //str+=date.getDate();//日
    str+=date.getHours();//时
    str+=date.getMinutes();//分
    str+=date.getSeconds();//秒
    str+=date.getMilliseconds();//毫秒
    //var _name=String(req.files.myFile.name).split(".");
    //_name=_name[1];
    //console.log(str);
    let targetPah = "public/video/"+req.files.myFile.name;
    fs.createReadStream(tempPath).pipe(fs.createWriteStream(targetPah));//读写可以同时进行，pipe相当
    // 于管道，一边创建读取文件流的同时创建一个写入的文件流，将临时文件写入最终文件夹
    fs.unlink(tempPath);//删除临时文件
    db.connectDB("insert into video values(null,?,?,?,now(),'姚',?)",
        [str,req.files.myFile.name,req.body.des,req.body.v_name],function(error,data){
        if(error==null){
            console.log("插入视频");
            db.connectDB("insert into videotypetable values(null,?,?)",[str,req.body.type],function(error,data){
                if(error==null){
                    res.send("完成");
                    console.log("插入类型");
                }
                else{
                    res.send("上传错误");
                }
            });
        }
        else{
            console.log(error);
            res.send("上传错误");
        }
    });



}
function getType(req,res){
    db.connectDB("select * from imgtype",[],function(error,data){
        res.send(data);
    })
}
function test(req,res){
    console.log(req);
    res.send("ok");
}
function getVideoType(req,res){
    db.connectDB("select * from videotype",[],function(error,data){
        res.send(data);
    })
}
module.exports={
    myUpload:myUpload,
    uploadPic:uploadPic,
    getType:getType,
    test:test,
    getVideoType:getVideoType,
    uploadVideo:uploadVideo
};
