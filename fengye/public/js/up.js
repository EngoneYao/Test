$(function(){
    $.ajax({
        type:"get",
        url:"gettype.do",
        data:{},
        success:function(data){
            //console.log(data);
            var html="";
            for(var i =0;i<data.length;i++){
                html+='<option value="'+data[i].img_typeNum+'">'+data[i].img_typeName+'</option>';
            }
            $("#type").html(html);
        }
    });
    $.ajax({
        type:"get",
        url:"getvideotype.do",
        data:{},
        success:function(data){
            //console.log(data);
            var html="";
            for(var i =0;i<data.length;i++){
                html+='<option value="'+data[i].v_typeNum+'">'+data[i].v_typeName+'</option>';
            }
            $("#videoType").html(html);
        }
    });
});
function upPic(){
    uploadFile("uppic.do",new FormData($("#pic")[0]));
    //第二个参数表示js提供的将表单转为二进制，因此会将参数转为js
}
function upVideo(){
    var des=$.trim($("#vDes").val());
    var name=$.trim($("#vName").val());
    console.log(des);
    console.log(name);
    if(des!=""&&name!=""){
        uploadFile("upvideo.do",new FormData($("#video")[0]));
    }else{
        $(".remain").html("信息不完整");

        setTimeout(function(){
            $(".remain").html("");
        },2000);
    }

}
function uploadFile(which,file){
    var arr=["上传中","上传中.","上传中..","上传中..."];
    var index=0;
    var a =setInterval(function(){
        index++;
        if(index>arr.length-1){
            index=0;
        }
        $(".remain").html(arr[index]);
    },1000);
    $.ajax({
        type:"post",
        url:which,
        data:file,
        processData:false,
        contentType:false,
        //processData和contentType都是辅助表单enctype那样，不要讲文件编码
        success:function(data){
            console.log(data);
            clearInterval(a);
            $(".remain").html(data);

            setTimeout(function(){
                $(".remain").html("");
            },2000);
        }
    });
}










