/**
 * Created by msi on 2017/9/28.
 */

window.onload = function () {
    var timer = null;
    var str = 'Human-centered storytelling is at the heart of Tool’s approach to VR and 360. From live action cinematic VR to real-time rendered CGI, our creative process is designed around the sensitivities of user experience. Our directors, artists and technologists understand the nuances of sound, haptics, and visual cues when it comes to directing user gaze and creating presence in the virtual world. We are a turnkey shop wth capabilities that include 360 mono/stereo live action, game engine development, CGI, UX/UI, app development, post and stitching,installation design, and environmental builds. As experts in platform and distribution strategy, we work across Oculus, Vive, GearVR, Cardboard, and browser-based 360 to optimize reach and accessibility for any audience.'
    fn(str);

    function fn(oldStr) {
        clearInterval(timer);
        $(".word").text("");
        var newStr = "";
        var index = 0;
//            $(".typed-cursor").show();
        timer = setInterval(function () {
            console.log(1)
            newStr += oldStr.charAt(index);
            $(".word").text(newStr);
            index++;
            if (index >= oldStr.length) {
//                    $(".typed-cursor").hide();
                clearInterval(timer);
            }
        }, 20);
    }


        var box = document.getElementById("box");
        var small = box.firstElementChild || box.firstChild;
        var mask = small.children[1];
        var big = small.nextElementSibling || small.nextSibling;
        var bigImg = big.lastElementChild || big.lastChild;


        small.onmouseenter = function () {
            // show(mask);
            // show(big);
            $("#mask").show();
            $("#big").show();
        }
        small.onmouseleave = function () {
            // hide(mask);
            // hide(big);
            $("#mask").hide();
            $("#big").hide();
        }

        small.onmousemove = function (event) {
            console.log(1)
            event = event || window.event;
            var pagex = event.pageX || event.clientX + scroll().left;
            var pagey = event.pageY || event.clientY + scroll().top;

            var smallx = box.offsetLeft;
            var smally = box.offsetTop;

            var x = pagex - smallx - mask.offsetWidth/2;
            var y = pagey - smally - mask.offsetHeight/2;


            if(x<0){
                x = 0;
            }
            if(x>small.offsetWidth-mask.offsetWidth){
                x = small.offsetWidth-mask.offsetWidth;
            }
            if(y<0){
                y = 0;//鼠标超出，但是黄盒子不能超出
            }
            if(y>small.offsetHeight-mask.offsetHeight){
                y = small.offsetHeight-mask.offsetHeight;
            }


            mask.style.left = x+"px";
            mask.style.top = y+"px";



            var bili = bigImg.offsetWidth/small.offsetWidth;

            var xx = bili*x;
            var yy = bili*y;

            bigImg.style.marginTop = -yy+"px";
            bigImg.style.marginLeft = -xx+"px";

        }
    }
