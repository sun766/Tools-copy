(function(){
    var aArr = document.getElementsByTagName("a");
    for(var i=0;i<aArr.length;i++){
        aArr[i].onclick = function(){
            for(var j=0;j<aArr.length;j++){
                aArr[j].className="";
            }
            this.className="current";
        }

    }
})()