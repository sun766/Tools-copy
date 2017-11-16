/**
 * Created by ASUS on 2017/9/23.
 */
//头部导航栏样式
jQuery(window).load(function(){
    $(".nav-ml ul li").mouseenter(function(){
        $(this).find("span").stop(true,true).slideDown(200);
        $(this).find("a").css("color","orange");
    });
    $(".nav-ml ul li").mouseleave(function(){
        $(this).find("a").css("color","white");
        $(this).find("span").slideUp(200);
    });
    //轮播盒子移动样式
    var distance = 0; //移动距离
    var leader = 0;//移动前位置
    var target = 0;//移动后位置
    $(".wrap-ml").scroll(function (event) {
        target = $(".wrap-ml").scrollLeft();
        distance = target - leader;
        if(distance>400){
            $(this).find("li").removeClass("rol");
            var index =  Math.floor($(".wrap-ml").scrollLeft()/$("img").width());
            $(this).find("li").eq(index+3).addClass("rol");
            console.log($(this).find("li").eq(index).nextAll());
            leader = target;
        }
    })
    //轮播盒子悬停样式
    $(".box-ml ul li").hover(
        function(){
            $(this).find("img").addClass("act");
            $(this).find("span").stop(true,true).fadeOut(800)},
                function(){
                    $(this).find("span").fadeIn(800);
                    $(this).find("img").removeClass("act")}
    )
})