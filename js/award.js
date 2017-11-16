/**
 * Created by Administrator on 2017/9/24.
 */
    //顶部
$(window).ready(function () {

    $(".h_lone").animate({marginTop:0},900);
    $(".h_ltwo").animate({marginTop:0},750);
    $(".h_lthree").animate({marginTop:0},600);

    $("#h_right").animate({marginTop:80,opacity:1},1000);

});

//底部
$(window).load(function (){
    $(".container").bind("mouseenter mouseleave", function(e) {
        var w = $(this).width();
        var h = $(this).height();
        var x = (e.pageX - this.offsetLeft - (w / 2)) * (w > h ? (h / w) : 1);
        var y = (e.pageY - this.offsetTop - (h / 2)) * (h > w ? (w / h) : 1);
        //alert(x);
        var direction = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;
        //direction的值为“0,1,2,3”分别对应着“上，右，下，左”
        var eventType = e.type;
        //alert(e.type);
        if (e.type == 'mouseenter') {
            if (direction == 0) {
                $(this).find('.mask').css({
                    'display': 'block',
                    'top': -h + 'px',
                    'left': '0px'
                }).stop().animate({
                    'top': '0px'
                },120);
            } else if (direction == 1) {
                $(this).find('.mask').css({
                    'display': 'block',
                    'left': w + 'px',
                    'top': '0px'
                }).stop().animate({
                    'left': '0px'
                },120);
            } else if (direction == 2) {
                $(this).find('.mask').css({
                    'display': 'block',
                    'top': h + 'px',
                    'left': '0px'
                }).stop().animate({
                    'top': '0px'
                },120);
            } else if (direction == 3) {
                $(this).find('.mask').css({
                    'display': 'block',
                    'left': -w + 'px',
                    'top': '0px'
                }).stop().animate({
                    'left': '0px'
                },120);
            }
        } else {
            if (direction == 0) {
                $(this).find('.mask').stop().animate({
                    'top': -h + 'px'
                },120);
            } else if (direction == 1) {
                $(this).find('.mask').stop().animate({
                    'left': w + 'px'
                },120);
            } else if (direction == 2) {
                $(this).find('.mask').stop().animate({
                    'top': h + 'px'
                },120);
            } else if (direction == 3) {
                $(this).find('.mask').stop().animate({
                    'left': -w + 'px'
                },120);
            }
        }
    });


});
    //js 无缝滚动

//需求1: 根据ul中的li的个数生成li添加到ol中，点亮第一张，复制ul中的第一个li添加到ul的最末尾;
    window.onload= function () {
        var box = document.getElementById("all");
        var screen = document.getElementById("screen");
        var ul = document.getElementById("ul");
        var ulLiArr = ul.getElementsByTagName("li");
        var ol = document.getElementById("ol");
        var arr = document.getElementById("arr");
        var left = document.getElementById("left");
        var right = document.getElementById("right");
        var imgWidth = screen.offsetWidth;


        for(var i=0;i<ulLiArr.length;i++){
            var newLi = document.createElement("li");
            newLi.innerHTML = i+1;
            ol.appendChild(newLi);
        }

        var olLiArr=ol.getElementsByTagName("li");
        olLiArr[0].className="current";
        ul.appendChild(ulLiArr[0].cloneNode(true));


        //需求2: 鼠标放到ol中的li上，点亮盒子，移动ul;(案例1)
        for(var i=0;i<olLiArr.length;i++){
            olLiArr[i].index= i;
            olLiArr[i].onmouseover= function () {
                for (var j = 0; j<olLiArr.length; j++) {
                    olLiArr[j].className = "";
                }
                this.className = "current";

                var sss = -imgWidth*this.index;
                animate(ul, sss);
                square = key = this.index;

            }
        }
        //需求3: 鼠标点击右侧按钮，ul滑向下一张;(案例2+无缝滚动原理)
        var square=0;
        var key=0;
        right.onclick=autoPlay;

//需求4: 左侧按钮和右侧按钮逻辑相反;(案例2+无缝滚动原理)
        left.onclick= function () {
            square--;
            key--;
            if (square === -1) {
                square = olLiArr.length-1;
            }

            if (key === -1) {
                ul.style.left = -(ulLiArr.length -1)*imgWidth+"px";
                key = ulLiArr.length - 2;

            }

            for (var j = 0; j < olLiArr.length; j++) {
                olLiArr[j].className = "";

            }
            olLiArr[square].className = "current";
            var sss = -imgWidth * key;
            animate(ul, sss);
        }

//需求5: 添加定时器;(需求3逻辑一样)

        var timer=setInterval(autoPlay,1000);
        box.onmouseover= function () {
            clearInterval(timer);
            arr.style.display="block";
        }

        box.onmouseout= function () {
            timer=setInterval(autoPlay,1000);
            arr.style.display="none";

        }

//封装右侧按钮的功能逻辑
        function autoPlay(){
            square++;
            key++;

            if(square===olLiArr.length){
                square=0;
            }
            if(key===ulLiArr.length){
                ul.style.left=0;
                key=1;
            }
            for(var j=0;j<olLiArr.length;j++) {
                olLiArr[j].className = "";
            }
                olLiArr[square].className="current";
                var sss=-imgWidth*key;
                animate(ul,sss);
            }
        }

//动画封装
        function  animate(ele,target){
            clearInterval(ele.timer);

            ele.timer=setInterval(function () {
                var step=target>ele.offsetLeft?10:-10;
                ele.style.left=ele.offsetLeft+step+"px";
                console.log(1);
                if(Math.abs(target-ele.offsetLeft)<=Math.abs(step)){
                    ele.style.left=target+"px";
                    clearInterval(ele.timer);
                }

            },10);

        }



