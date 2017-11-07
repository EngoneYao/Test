/**
 * Created by yao on 2017-5-9 0009.
 */
$(function(){
    $(".result").html("");
});
$("#userName").on("blur",function(){
    if(checkName()){
        $(".name").html("");
    }else{
        $(".name").html("请输入1-10位长度的用户名");
    }

});
$("#oldPassword").on("blur",function(){
    if(checkOldPass()){
        $(".oldPassword").html("");
    }else{
        $(".oldPassword").html("旧密码格式不正确");
    }

});
$("#password").on("blur",function(){

    if(checkComPass()){
        $(".comPassword").html("");
    }else{
        $(".comPassword").html("两次输入密码不一样");
    }
    if(checkPass()){
        $(".password").html("");
    }else{
        $(".password").html("请输入5-10位密码");
    }
});
$("#comPassword").on("blur",function(){

    if(checkComPass()){
        $(".comPassword").html("");
    }else{
        $(".comPassword").html("两次输入密码不一样");
    }
});
$("#qq").on("blur",function(){
    if(checkQQ()){
        $(".qq").html("");
    }else{
        $(".qq").html("请输入4-11位的qq");
    }
});
function checkName(){
    var name=$("#userName").val().trim();
    if(name.length>10||name.length==0){
        return false;
    }else{
        return true;
    }
}
function checkQQ(){
    var qq=$("#qq").val().trim();
    if(qq.length>11){
        return false;
    }else if(qq.length<4&&qq.length>0){
        return false;
    }else{
        return true;
    }
}
function checkOldPass(){
    var pass=$("#oldPassword").val().trim();
    if(pass.length>10||pass.length<5){
        return false;
    }else{
        return true;
    }
}
function checkPass(){
    var pass=$("#password").val().trim();
    if(pass.length>10||pass.length<5){
        return false;
    }else{
        return true;
    }
}
function checkComPass(){
    var pass=$("#password").val().trim();
    var comPass=$("#comPassword").val().trim();
    return pass==comPass?true:false;
}
function modifyUser(){
    var qq=$("#qq").val().trim();
    var user=sessionStorage.getItem("id");
    var name=$("#userName").val().trim();
    var oldPass=$("#oldPassword").val().trim();
    var pass=$("#password").val().trim();
    var comPass=$("#comPassword").val().trim();
    $.ajax({
        type:"post",
        url:"modify.do",
        data:{qq:qq,user:user,name:name,oldPass:oldPass,pass:pass},
        success:function(data){
            if(data=="wrong"){
                $(".result").html("旧密码错误");
            }else if(data=="ok"){
                $(".result").html("修改成功");
                sessionStorage.setItem("name",name)
            }else if(data=="error"){
                $(".result").html("验证失败");
            }
        }
    });




    console.log(user+"1");
    console.log(name+"2");
    console.log(oldPass+"3");
    console.log(pass+"4");
    console.log(comPass+"5");
}
$(".saveBtn").on("click",function(){

    var user=sessionStorage.getItem("id");
    if(user){
        if(checkName()&&checkComPass()&&checkOldPass()&&checkPass()&&checkQQ()){
            modifyUser();
        }
    }
});