/**
 * Created by yao on 2017-5-8 0008.
 */


$(function(){/*页面加载*/
    $(".manger").text(sessionStorage.getItem("id"));/*管理员名字*/
    $(".loginOut").on("click",function(){/*注销按钮*/
        sessionStorage.clear();
    });
    $(".typeVideo").on("click",function(){/*视频按钮*/
        getVideo();
    });
    $(".typePic").on("click",function(){/*图片按钮*/
        getPic();
    });

    getVideo();


});

function getVideo(){/*获取全部视频*/
    var html='<li>'+
    '<div><span>视频</span></div>'+
    '<div><span>视频编号</span></div>'+
    '<div><span>视频名</span></div>'+
    '<div><span>视频描述</span></div>'+
    '<div><span ">删除</span></div>'+
    '</li>';
    $(".picDiv").html("");
    $.ajax({
        type:"get",
        url:"mgetvideo.do",
        data:{},
        success:function(data){
            for(var i=0;i<data.length;i++){
                html+='<li>'+
                '<div><video src="video/'+data[i].v_src+'"></video></div>'+
                '<div><a href="mvideo.html" class="num" data-src="'+data[i].v_src+'">'+data[i].v_num+'</a></div>'+
                '<div><span>'+data[i].v_name+'</span></div>'+
                '<div><span>'+data[i].v_des+'</span></div>'+
                '<div><span class="glyphicon glyphicon-trash delete"></span></div>'+
                '</li>';
            }
            $(".videoUl").html(html);
            blindDelete();
            blindNum();
        }
    });
}

function blindDelete(){/*绑定视频删除*/
    $(".delete").on("click",function(){
        var num=$(this).parent().parent().find(".num").text();
        console.log(num);
        $.ajax({
            type:"get",
            url:"delete.do",
            data:{num:num},
            success:function(data){
                getVideo();
                console.log(data);
            }
        });
    });
}

function blindNum(){/*绑定a表现点击跳转视频播放页面*/
    $(".num").on("click",function(){
        var temp=$(this).data("src");
        sessionStorage.setItem("mvideo",temp)
    });
}

function getPic(){
    $(".videoUl").html("");
    $.ajax({
        type:"get",
        url:"mpic.do",
        data:{},
        success:function(data){
            //console.log(data[0].img_src);
            var html="";
            if(data.length>0){
                for(var i =0;i<data.length;i++){
                    html+='<div>'+
                    '<img src="../img/picture/'+data[i].img_src+'" alt="" />'+
                    '<span class="deletePic" data-num='+data[i].img_num+'>X</span>'+
                    '</div>';
                }
            }
            $(".picDiv").html(html);
            blindPicDelete();
        }
    });
}
function blindPicDelete(){
    $(".deletePic").on("click",function(){
        var num=$(this).data("num");
        $.ajax({
            type:"get",
            url:"deletePic.do",
            data:{num:num},
            success:function(data){
                getPic();
            }
        });
    });
}