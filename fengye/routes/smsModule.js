/**
 * Created by yao on 2017-5-4 0004.
 */

//当这个过期时，在哪个应用的消息设置中设置签名审核

const db=require("./mySql.js");
const AV = require("leanengine");//引入短信模块
AV.init({//配置，id和key是自己在https://leancloud.cn创建新应用中的
    appId:"AReas29zAQ9uEKwLQgCK3MQu-gzGzoHsz",
    appKey:"anI1gHMRf9vbF5TNJd7RGpW3"
});

function sendCode(req,res){//=========发送验证码
    var phone = req.body.phone;
    //console.log(phone);
    AV.Cloud.requestSmsCode({//调用请求短信发送接口并配置
        mobilePhoneNumber:phone,//设置需要验证码接受的手机号
        name:"枫叶动漫",//服务
        op:"注册",//操作
        ttl:5//验证码失效的时间，单位为分钟

        /*接收到的短息格式：
         * 【leancloud上应用的名字】您正在使用+name+ 服务进行+op，
         * 您的验证码是：465211，请在 +ttl+ 分钟内完成操作
         * */

    }).then(function(data){//链式调用，then两个参数都是函数，第一个是成功函数，第二个是失败函数
        console.log("验证码已经发送");
        res.send("验证码已经发送");
    },function(error){
        console.log(error);
        res.send(String(error));
    });

}



function checkCode(req,res){
    var phone = req.body.phone;
    var code = req.body.code;
    //verifySmsCode是leancloud的短信验证接口
    AV.Cloud.verifySmsCode(code,phone).then(function(data){//与发送短信的链式调用then一样

        db.connectDB("insert into user values(null,'新用户',?,?,?,null,now())",
            [phone,req.body.pass,phone],function(error,data){
            if(error==null){
                res.send("pass");
                console.log("pass");
            }else{
                res.send("fail");
                console.log(error);
            }

        });
    },function(error){
        console.log(error);
        res.send("error");
    });
}

function getCode(req,res){//=========发送验证码
    var phone = req.body.phone;
    //console.log(phone);
    AV.Cloud.requestSmsCode({//调用请求短信发送接口并配置
        mobilePhoneNumber:phone,//设置需要验证码接受的手机号
        name:"枫叶动漫",//服务
        op:"找回密码",//操作
        ttl:5//验证码失效的时间，单位为分钟

        /*接收到的短息格式：
         * 【leancloud上应用的名字】您正在使用+name+ 服务进行+op，
         * 您的验证码是：465211，请在 +ttl+ 分钟内完成操作
         * */

    }).then(function(data){//链式调用，then两个参数都是函数，第一个是成功函数，第二个是失败函数
        console.log("验证码已经发送");
        res.send("ok");
    },function(error){
        console.log(error);
        res.send("error");
    });

}
function resetPass(req,res){
    var phone = req.body.phone;
    var code = req.body.code;
    //verifySmsCode是leancloud的短信验证接口
    AV.Cloud.verifySmsCode(code,phone).then(function(data){//与发送短信的链式调用then一样

        db.connectDB("update user set u_password=? where u_login=?",
            [req.body.pass,phone],function(error,data){
            if(error==null){
                res.send("pass");
                console.log("pass");
            }else{
                res.send("fail");
            }

        });
    },function(error){
        console.log(error);
        res.send("error");
    });

}
function randomLogin(){
    var temp;
    db.connectDB("select u_login from user",[],function(error,data){
        temp=data;
    });
    var str="";
    str+=parseInt(Math.random()*9+1);
    for(var i =0;i<9;i++){
        str+=parseInt(Math.random()*10);
    }
}


module.exports={
    sendCode:sendCode,
    checkCode:checkCode,
    getCode:getCode,
    resetPass:resetPass
};