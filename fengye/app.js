"use strict";//使用严格模式--1.位置必须在开头位置（网上也有在函数内部使用的）
//nodejs版本过低会不支持严格模式




const header=require("./routes/header1.js");
const index=require("./routes/index.js");
const video=require("./routes/video.js");
const manger=require("./routes/manger.js");
const file=require("./routes/fileModule.js");
const register=require("./routes/smsModule.js");
const userInfo=require("./routes/userInfo.js");
//=========================================用express搭建服务器
//----------1.加载

const express=require("express");//const是es6的常量，即用const声明的常量在后面不允许重新赋值
//----------2.执行express全局函数，返回express服务对象
const app = express();
//-----------3.express框架配置
const cookie = require("cookie-parser");
const session = require("express-session");
app.configure(function(){
        //调用cookie
        app.use(cookie());

        //session设置
        app.use(session({
            name:"mysession",//session名字，可以自己设置，默认是connect.sid
            secret:"12345",//密钥
            cookie:{maxAge:4444444444444444444},//cookie保存时间，以毫秒为单位
            resave:true,//更新session-cookie失效时间
            rolling:true//保存更新
        }));
        //ejs
        app.set("views",__dirname+"/views");//设置ejs模板文件路径
        app.set("view engine","ejs");//设置模板引擎，代表模板后缀是ejs
        //express
        app.use(express.logger("dev"));//设置为开发者模式，会显示日式
        app.use(express.bodyParser());//处理post请求
        app.use(express.methodOverride());//协助处理post。将所有get转为post
        app.use(app.router);//将路由级别提升最高，即先启动路由
        app.use(express.static(__dirname+"/public"));//设置静态资源路径,__dirname不是变量，是内置的，表示当前文件根目录
        app.use(express.favicon(__dirname+"/public/img/favicon.ico"));//配置小图标，一般是32x32，或是64x64
        app.use(express.errorHandler());//打印错误


    }
);
//设置端口方法一：
app.set("port",8888);
app.listen(app.get("port"),function(){
    console.log("枫叶项目启动，端口8888");
});
//设置端口方法二：app.listen(8888,function(){
//   console.log("启动");
//});
/*---------------------------------------get拦截-------------------------------------*/
//原生拦截请求
//app.get("/login.do",function(request,response){//地址栏必须加/，不然拦截不到
//        console.log(request.query);//get拦截表单的输入的东，用对象存储的
//        response.writeHead(200,{"content-type":"text/html;charset=utf-8"});
//        response.write("登录成功");
//        response.end();
//});


//express封装了很多原生的方法
//app.get("/login.do",function(request,response){//地址栏必须加/，不然拦截不到
//        //这里的地址是测试用的表单action
//        console.log(request.query);
//        response.send("<h1>登录成功</h1>");//注意他是封装原生的，而原生的在最后会有response.end()，因此在这里写2次会报错
//       // response.redirect("index.html");//封装的页面跳转方法
//});

//app.get("/index.html",function(){});//拦截用户输入页面，因为输入的相当于地址栏传值，用get


//-------------------------------------------------post拦截----------------------
//app.post("/login.do", function (request,response) {
//        console.log(request.body);//post拦截的表单input内容，用对象存储
//});
//------------------------------------------------所有拦截-----------------------------------
//app.get("/*.do",()=>{})或者app.post("/*.do",()=>{})




app.get("/index.html",function(req,res){/*拦截index.html*/
    res.render("index",{userId:"55",userName:"药房"});
});
app.get("/",function(req,res){/*拦截用户只是输入ip地址加端口号*/
    res.render("index",{});
});
app.get("/search.do",function(req,res){/*搜索按钮*/
    res.send("videotype");
});

app.get("/checkUser.do",header.checkUser);/*主页进入是判断是否登录，但是没起作用*/


app.post("/login.do",header.login);/*登录*/

app.get("/videotype.html",function(req,res){/*动画类型*/
    res.render("videotype");
});

app.get("/video.html", function (req,res) {/*视频播放页面*/
    res.render("video");
});

app.get("/videoItem.do",video.getVideo);/*视频播放页面获取所有视频src*/

app.get("/manger.do",function(req,res){/*登录时返回管理员页面*/
    res.render("manger");
});


app.get("/mgetvideo.do",manger.getVideo);/*管理员获取视频*/
app.get("/delete.do",manger.deleteVideo);

app.get("/mpic.do",manger.getPic);
app.get("/deletePic.do",manger.deletePic);

app.get("/gettype.do",file.getType);//获取图片类型有哪些

app.post("/uppic.do",file.uploadPic);//上传图片
app.get("/getvideotype.do",file.getVideoType);//获取视频类型有哪些
app.post("/upvideo.do",file.uploadVideo);

app.get("/down.do",(req,res)=>{//下载文件请求
    //console.log("下载");
    //console.log(req.query);
    res.download("public/video/"+req.query.src,req.query.src);//express封装的下载方法
    //下载文件的url和下载后保存的名字
});



app.post("/getCode.do",register.sendCode);
app.post("/register.do",register.checkCode);


app.post("/modify.do",userInfo.modifyUser);


app.post("/forget.do",register.getCode);
app.post("/reset.do",register.resetPass);