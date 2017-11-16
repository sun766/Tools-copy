/* 
 * @Author: Marte
 * @Date:   2017-09-27 00:15:27
 * @Last Modified by:   Marte
 * @Last Modified time: 2017-09-27 01:16:56
 */

$(document).ready(function() {

    var ani_index = 0;
    $(".atrstar_bg").mousedown(function() {
        // $(this).animate({background:#3f0},100)
        $(this).css("background", "#3f0");
        // $(".ani_wrap").animate({ "box-shadow": "0 0 25px #f00" }, 50)
        ani_index++;
        console.log(ani_index);
    })
    $(".atrstar_bg").mouseup(function() {
        // $(this).animate({background:#3f0},100)
        $(this).css("background", "#111");
        // $(".ani_wrap").animate({ "box-shadow": "0 0 0px #f00" }, 50)
    })
});
