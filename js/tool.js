/**
 * 功能：多个属性json递变
 * @param ele
 * @param json
 */
function animate(ele,json,time){
    //要用定时器先清除定时器
    clearInterval(ele.timer);
    //设置定时器
    ele.timer = setInterval(function(){
        //设置一个标识符，确认是否所有属性都满足条件
        var bool = true;
        //遍历每个属性
        for(var key in json){
            //目标值
            var target;
            if(key==="opacity"){
                target = json[key]*100;
            }else {
                target = json[key];
            }
            //当前值:特殊属性，特殊处理
            var leader;
            if(key ==="opacity"){
                leader = parseInt((getStyle(ele,key)*100)) || 1;
            }else{
                leader = parseInt(getStyle(ele,key))||0;
            }
            //获取步长
            var step = (target-leader)/10;
            //二次处理
            step = step>0?Math.ceil(step):Math.floor(step);
            //赋值:特殊值特殊处理
            if(key ==="opacity"){
                ele.style[key] = (leader+step)/100;
                leader = leader+step;
                //兼容IE6，7，8
                ele.style.filter = "alpha(opacity="+leader+")";
            }else{
                ele.style[key]=leader  + step +"px";
            }
            //判断是否达到目标位置
            if(Math.abs(target-leader)>Math.abs(step)){
                bool = false;
            }
            if(bool){
                clearInterval(ele.timer);
                for(var key in json){
                    ele.style[key] = json[key];
                }
            }
        }
    },time)
}
function getStyle(ele,attr){
    if(window.getComputedStyle){
        return window.getComputedStyle(ele,null)[attr];
    }
    return ele.currentStyle[attr];
}

/**
 * 功能: 将毫秒值总时间转换为时分秒： 00:00:00
 * @param time
 */
function convertTime(time){
     var h = Math.floor(time/3600);
    var m = Math.floor(time%3600/60);
    var s = Math.floor(time%3600%60);
    h=h>10?h:"0"+h;
    m=m>10?m:"0"+m;
    s =s>10?s:"0"+s;
    var str=h+":"+m+":"+s;
    return str;
}
