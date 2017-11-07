$(".loginBtn").on("click",function(){
    var login=$("#user").val();
    var pass=$("#pass").val();
    $.ajax({
        type:"post",
        url:"login.do",
        data:{login:login,pass:pass},
        success:function(data){
            //console.log(data);
            if(data=="error"){
                $(".remain").css("opacity","1");
                console.log(data);
            }else{
                sessionStorage.setItem("id",data[1]);
                sessionStorage.setItem("name",data[2]);
                window.location.href = data[0];//跳转主页
                //sessionStorage.setItem("myLogin",name);//这是方法二
            }
        }
    });
});