/**
 * Created by yao on 2017-5-9 0009.
 */
$(".getCode").on("click",function(){
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
                btn.attr("disabled",false).val("获取验证码");
            }
        },1000);

        $.ajax({
            type:"post",
            url:"forget.do",
            data:{phone:phone},
            success:function(data){
                console.log(data);
            }
        });
    }else{
        $(".remain").html("手机号有误！");
    }

});



$(".resetPass").on("click",function(){
    var phone=$("#phone").val().trim();
    var code=$("#code").val().trim();
    var pass=$("#pass").val().trim();
    var conPass=$("#conPass").val().trim();
    if(phone!=""&&code!=""&&pass!=""&&conPass!=""){
        if(pass==conPass){
            if(pass.length>10||pass.length<5){
                $(".remain").html("请输入5-10位密码");
            }else{
                $.ajax({
                    type:"post",
                    url:"reset.do",
                    data:{phone:phone,code:code,pass:pass},
                    success:function(data){

                        if(data=="error"){
                            $(".remain").html("验证失败");
                        }else if(data=="pass"){
                            $(".remain").html("重置成功，请去登录");
                        }
                    }
                });
            }

        }
    }else{
        $(".remain").html("请填完整信息");
    }

});