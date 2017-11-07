/**
 * Created by yao on 2017-5-8 0008.
 */
//$(function(){
//    var video=sessionStorage.getItem("video");
//    $.ajax({
//        type:"get",
//        url:"videoItem.do",
//        data:{video:video+"1"},
//        success:function(data){
//            $("video").attr("src",data[0]).data("video",video);
//
//        }
//    })
//});
//$(".down").on("click",function(){
//
//});
function blindItem(){
    $(".videoItem").on("click",function(){
        $(".videoItem").removeClass("play");
        $(this).addClass("play");
        var num=$(this).html();
        //var video=$("video").data("video");
        //$.ajax({
        //    type:"get",
        //    url:"videoItem.do",
        //    data:{video:video+num},
        //    success:function(data){
        //        $("video").attr("src",data[0]);
        //    }
        //})
        var temp=(sessionStorage.getItem("videoSrc").split("%"));
        $("video").attr("src","video/"+temp[num-1]);
        $(".down").data("downSrc",temp[num-1]);
        console.log(sessionStorage.getItem("videoSrc"));
    });

}



$(function(){
    //$("video").attr("src","video/"+sessionStorage.getItem("video")+".mp4");
    drawItem();
    $(".down").on("click",function(){
        var src=$(this).data("downSrc");
        //console.log(src);
        $.ajax({
            type:"get",
            url:"down.do",
            data:{src:src},
            success:function(data){
                console.log(data);
            }
        });
    });
});
function drawItem(){
    $.ajax({
        type:"get",
        url:"videoItem.do",
        data:{video:sessionStorage.getItem("video")},
        success:function(data){
            if(data!="novideo"){
                var str='';
                var videoSrc="";
                for(var i=1;i<data.length+1;i++){
                    str+='<div class="videoItem">'+i+'</div>';
                    videoSrc+=data[i-1].v_src+"%";
                }
                sessionStorage.setItem("videoSrc",videoSrc);
                $(".videoItemDiv").html(str);
                $("video").attr("src","video/"+data[0].v_src);
                blindItem();
                $(".videoItem:first-child").addClass("play");
                $(".down").data("downSrc",data[0].v_src);
                $(".videoName h4").html(data[0].v_name);
                //console.log(data[0].v_src);
            }else{
                console.log("没有视频");
            }

        }
    })
}


