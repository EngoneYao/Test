/**
 * Created by yao on 2017-5-5 0005.
 */


//搜索按钮点击事件
$(".searchBtn").on("click",function(){
    var searchText=$(".searchText");
    var text=searchText.val().trim();/*获取搜索框内容并去掉空格*/
    if(text!=""){
        $.ajax({
            type:"get",
            url:"search.do",
            data:{"keyWord":text},
            success:function(data){
                window.location.href = "videotype.html"
            }
        });
    }else{/*搜索框内容为空*/
        searchText.val("");
        searchText.attr("placeholder","关键字不能为空").focus();/*改变提示语并获取焦点*/
        for(var i=0;i<3;i++){/*左右晃动3次*/
            searchRemain();
        }
    }
});
//搜索框失去焦点事件
$(".searchText").on("blur",function(){
    $(".searchText").attr("placeholder","请输入关键字");
});
//搜索框内容为空的话左右晃动一次函数
function searchRemain(){
    var searchDiv=$(".searchDiv");
    searchDiv.animate({
        "marginLeft":"-10px"
    },10,"linear",function(){
        searchDiv.animate({
            "marginLeft":"10px"
        },20,"linear",function(){
            searchDiv.animate({
                "marginLeft":"0"
            },10,"linear",function(){

            })
        })
    })
}
$("a").on("click",function(e){/*阻止a默认事件，方便以后自定义拦截*/

    if(($(this).attr("data-num"))){
        e.preventDefault();
    }

});

$(function(){
    checkUser();

});
function checkUser(){
    var a=sessionStorage.getItem("id");
    console.log(a);
    if(a){
        $(".user").html('<span class="glyphicon glyphicon-user"></span>'+
                    '<a href="userinfo.html">'+sessionStorage.getItem("name")+'</a>'+
                    '&nbsp;&nbsp;'+
                    '<a href="index.html" onclick="loginOut()">注销</a>');
    }
    //$.ajax({
    //    type:"get",
    //    url:"checkUser.do",
    //    data:{},
    //    success:function(data){
    //        if(data=="null"){
    //
    //        }else{
    //            $(".user").html('<span class="glyphicon glyphicon-user"></span>'+
    //            '<a href="userinfo.html">'+data+'</a>'+
    //            '<a href="">注销</a>');
    //        }
    //    }
    //});
}
function loginOut(){
    sessionStorage.clear();
}
