/**
 * Created by yao on 2017-5-9 0009.
 */
$("a").on("click",function(){
    sessionStorage.setItem("video",$(this).data("video"));
});