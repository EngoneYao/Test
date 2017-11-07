/**
 * Created by yao on 2017-5-8 0008.
 */
$("a").on("click",function(){
    sessionStorage.setItem("video",$(this).data("video"));
});