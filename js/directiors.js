// /* 
//  * @Author: Marte
//  * @Date:   2017-09-24 14:18:47
//  * @Last Modified by:   Marte
//  * @Last Modified time: 2017-09-28 10:53:55
//  */

// Main
$(function() {
    $(".floor_box").children().each(function(index, ele) {
        $(".dot_list").append($('<li class="floor_dot"></li>'))
    })
});

$(window).load(function() {
    /* Stuff to do after the page is loaded */

    // 动态生成导航

    var index = 0;
    highLight($(".dot_list"));

    // 鼠标滚轮翻页
    $(".floor").on('mousewheel', function(event, delta) {
        delta > 0 ? index = $(this).index() - 1 : index = $(this).index() + 1;
        getIndex()

        slide(index);
    })

    // 返回顶部
    $(".floor_top").click(function(event) {
        /* Act on the event */
        index = 0;
        slide(index, 200);
    });

    // 点击导航跳转
    $(".dot_list").on("click", "li", function() {
        index = $(this).index();
        slide(index);
    })

    // 向前翻页or向后翻页
    $(".floor_prev").click(function() {
        index -= 1;
        getIndex();
        slide(index);
    })
    $(".floor_next").click(function() {
        index += 1;
        getIndex();
        slide(index);
    })

    // 判断index
    function getIndex() {
        if (index < 0) {
            index = 0;
        } else if (index > $(".floor_box").children().length - 1) {
            index = $(".floor_box").children().length - 1;
        };
    }

    // 翻页函数
    function slide(index, speed) {
        var speed = speed || 1000;
        // console.log(-$(".floor_box").children('div').height() * index)
        var target = -($(".floor_box").children('div').height()) * index;
        $(".floor_box").stop().animate({ top: target }, speed);
        highLight($(".dot_list"));

        console.log(index);
        console.log($(".floor_box").offset().top);
        isFloor1(index);
        isFloor3(index);

    }



    // 高亮显示函数
    function highLight(ele) {
        ele.children().eq(index).addClass('current').siblings().removeClass('current');
    }

    // floor1 开始
    // 旋转木马(未完成)
    var arrOfJson = [{ //  1
        width: 300,
        top: 50,
        left: 250,
        opacity: 0.2,
        "z-index": 2
    }, { // 2
        width: 500,
        top: 130,
        left: 100,
        opacity: 0.8,
        "z-index": 3
    }, { // 3
        width: 700,
        top: 100,
        left: 250,
        opacity: 1,
        "z-index": 4
    }, { // 4
        width: 500,
        top: 130,
        left: 600,
        opacity: 0.8,
        "z-index": 3
    }, { //5
        width: 300,
        top: 50,
        left: 650,
        opacity: 0.2,
        "z-index": 2
    }];


    $("#banner_3d_slide li").each(function(index, ele) {
        $(ele).css("z-index", arrOfJson[index]["z-index"]);
    });


    $("#banner_3d_slide li").each(function(index, ele) {

        $(ele).animate(arrOfJson[index], 400);
    })


    $("#banner_3d_slide").mouseenter(function() {
        $("#banner_3d_arrow").animate({ "opacity": 1 });
    })


    $("#banner_3d_slide").mouseleave(function() {
        $("#banner_3d_arrow").animate({ "opacity": 0 });
    })


    $(".banner_3d_next").on("click", function() {

        var first = arrOfJson.shift();
        arrOfJson.push(first);

        $("#banner_3d_slide li").each(function(index, ele) {
            $(ele).css("z-index", arrOfJson[index]["z-index"]);
        });

        $("#banner_3d_slide li").each(function(index, ele) {
            $(ele).stop().animate(arrOfJson[index], 400);
        })

    });


    $(".banner_3d_prev").on("click", function() {

        var last = arrOfJson.pop();
        arrOfJson.unshift(last);

        $("#banner_3d_slide li").each(function(index, ele) {
            $(ele).css("z-index", arrOfJson[index]["z-index"]);
        });

        $("#banner_3d_slide li").each(function(index, ele) {
            $(ele).stop().animate(arrOfJson[index], 400);
        })
    });

    // floor1 结束


    // floor3 开始

    // 显示函数
    function isFloor1(index){
        if (index==0) {
            $('.head_nav').fadeIn('slow');
        }else{
            $('.head_nav').slideUp('slow');
        };
    }
    function isFloor3(index) {
        if (index == 1) {
            console.log(1)
            $(".floor3_header").slideDown('slow', function() {
                $(".floor3_main").fadeIn("slow");
            });
        } else {
            $(".floor3_main").fadeOut("slow");
            $(".floor3_header").slideUp('slow');

        };
    }

    // tab栏切换
    $(".floor3_head_list").children().click(function() {
        var i = $(this).index();
        $(this).addClass('active').siblings('li').removeClass('active');
        $(".floor3_main").children().stop().eq(i).siblings('div').fadeOut("fast").end().show(function() {
            console.log($(this).attr("class"))
            if ($(this).attr("class") == "artists") {
                console.log()
                inputVal();
            };
        }).children(".floor3_list").hide().eq(0).slideDown('slow', function() {
            $(this).next("ul").slideDown('slow');
        });;
    });

    // 高亮显示
    $(".floor3_main ul").children().hover(function() {
        $(this).children('.floor3_mask').stop().slideDown(100).next("a").css("color", "#000");
    }, function() {
        $(this).children('.floor3_mask').stop().slideUp(400).next("a").css("color", "#3f0");
    });


    // 光标输入

    // $(".artists_top_left_top").load
    // inputValOfTimer($(".artists_top_left_top"), inputValOfTimer($(".artists_top_left_bottom"), inputValOfTimer(  $(".artists_top_right"))));



    //function inputVal() {
    //    var input_timer1 = null,
    //        input_timer2 = null,
    //        input_timer3 = null,
    //        json2 = {
    //            "str1": "Tool's roster of artist collaborators is a mix of influential creators across many disciplines:",
    //            "str2": "Virtual Reality, Artificial Intelligence, Augmented Reality, Robotics, Installations, and Physical Computing.",
    //            "str3": "Our mission is to produce experimental art projects that push a medium forward and continue working with our clients to produce disruptive creative for brands looking to break ground with culturally relevant messaging."
    //        }
    //    inputValOfTimer($(".artists_top_left_top"), json2["str1"], input_timer1);
    //    inputValOfTimer($(".artists_top_left_bottom"), json2["str2"], input_timer2);
    //    inputValOfTimer($(".artists_top_right"), json2["str3"], input_timer3);
    //}
    //
    //function inputValOfTimer(ele, str, timer) {
    //    var newStr = "",
    //        strIndex = 0;
    //    ele.text("");
    //    // console.log(oldStr);
    //    clearInterval(timer);
    //    // if (timer) {
    //    //     return;
    //    // };
    //    timer = setInterval(function() {
    //        newStr += str[strIndex];
    //        ele.text(newStr);
    //        strIndex++;
    //        if (strIndex >= str.length) {
    //            clearInterval(timer);
    //        };
    //
    //    }, 100)
    //}
    var obj1 = $(".artists_top_left_top");
    var obj2 = $(".artists_top_left_bottom");
    var obj3 = $(".artists_top_right");

    function inputVal() {
        var json2 = {
            "str1": "Tool's roster of artist collaborators is a mix of influential creators across many disciplines:",
            "str2": "Virtual Reality, Artificial Intelligence, Augmented Reality, Robotics, Installations, and Physical Computing.",
            "str3": "Our mission is to produce experimental art projects that push a medium forward and continue working with our clients to produce disruptive creative for brands looking to break ground with culturally relevant messaging."
        }

        inputValOfTimer(obj1, json2["str1"]);
        inputValOfTimer(obj2, json2["str2"]);
        inputValOfTimer(obj3, json2["str3"]);
    }

    function inputValOfTimer(ele, str) {
        var newStr = "",
            strIndex = 0;

        // console.log(oldStr);
        clearInterval(ele.timer);
        ele.text("");
        // if (timer) {
        //     return;
        // };
        ele.timer = setInterval(function() {
            newStr += str[strIndex];
            // console.log(newStr);
            ele.text(newStr);
            strIndex++;
            if (strIndex >= str.length) {
                clearInterval(ele.timer);
            };

        }, 80)
    }

    // floor3 结束


});
