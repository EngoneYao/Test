/**
 * Created by yao on 2017-5-9 0009.
 */

$(function(){
    $(".success").css("visibility","hidden");
    $(".getCode").on("click",function(){
        //两种方法设置disabled属性
        //$('#areaSelect').attr("disabled",true);
        //$('#areaSelect').attr("disabled","disabled");
        //三种方法移除disabled属性
        //$('#areaSelect').attr("disabled",false);
        //$('#areaSelect').removeAttr("disabled");
        //$('#areaSelect').attr("disabled","");
        var phone=$("#phone").val();
        if((/^1[34578]\d{9}$/.test(phone))){
            $(this).attr("disabled",true);
            $(".remain").html("");
            var btn=$(".getCode");
            var delay=60;
            var timer=setInterval(function(){
                btn.val("请("+delay+")后再试");
                delay--;
                if(delay==-1){
                    clearInterval(timer);
                    btn.attr("disabled",false).val("免费获取验证码");
                }
            },1000);

            $.ajax({
                type:"post",
                url:"getCode.do",
                data:{phone:phone},
                success:function(data){
                    console.log(data);
                }
            });
        }else{
            $(".remain").html("手机号有误！");
        }

    });
    $(".registerBtn").on("click",function(){
        var code=$(".code").val().trim();
        var pass=$("#pass").val().trim();
        var comPass=$("#comPass").val().trim();
        var phone=$("#phone").val();
        if(code!=""&&pass!=""&&comPass!=""){
            if(pass==comPass){
                if(pass.length<5){
                    $(".remain").html("密码不能小于5位");
                }else if(pass.length>10){
                    $(".remain").html("密码不能大于10位");
                }else{
                    $(".remain").html("");
                    $.ajax({
                        type:"post",
                        url:"register.do",
                        data:{code:code,phone:phone,pass:pass,comPass:comPass},
                        success:function(data){
                            console.log(data);
                            if(data=="pass"){
                                sessionStorage.setItem("id",phone);
                                sessionStorage.setItem("name","新用户");
                                $(".success").css("visibility","visible");
                                $(".login").html(phone);
                            }else if(data=="error"){
                                $(".remain").html("验证失败");
                            }else{
                                $(".remain").html("注册失败");
                            }

                        }
                    });
                }

            }else{
                $(".remain").html("两次输入密码不相同");
            }
        }else{
            $(".remain").html("输入信息不完整");
        }
        //console.log(code+"1");
        //console.log(pass+"2");
        //console.log(comPass+"3");
    });
    $(".sure").on("click",function(){
        window.location.href="index.html";
    });
});

