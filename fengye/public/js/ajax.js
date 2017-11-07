/**
 * Created by yao on 2017-5-5 0005.
 */
(function(){/*·â×°Òþ²Øajaxº¯Êý*/
    function myAjax(obj){
        var method=obj.type;
        var url=obj.url;
        var data=obj.data;
        var success=obj.success;
        var async=false;
        if(obj.hasOwnProperty("async")){
            async=obj.async;
        }
        var str="";
        var xhr;
        if(window.XMLHttpRequest){
            xhr=new XMLHttpRequest();
        }else{
            xhr=new ActiveXObject();
        }
        xhr.onreadystatechange=function(){
            if(xhr.status==200&&xhr.readystate==4){
                success(JSON.parse(xhr.responseText));
            }
        };
        for(var i in data){
            str+=i+"="+data[i]+"&";
        }
        str=str.substring(0,str.length-1);
        if(method=="get"){
            xhr.open("get",url+"?"+str,async);
            xhr.send(null);
        }else if(method=="post"){
            xhr.open("post",url,async);
            xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            xhr.send(str);
        }
    }
    window.myAjax=myAjax();
})();