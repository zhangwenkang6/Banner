$(function() {
    var banner = new carousel();
});

function carousel(){
    var $banner = $(''
                +'<div class="slider" id="slider">'
                    +'<div class="slide"><img src="./img/b5.png" alt=""></div>'
                    +'<div class="slide"><img src="./img/b1.png" alt=""></div>'
                    +'<div class="slide"><img src="./img/b2.png" alt=""></div>'
                    +'<div class="slide"><img src="./img/b3.png" alt=""></div>'
                    +'<div class="slide"><img src="./img/b4.png" alt=""></div>'
                    +'<div class="slide"><img src="./img/b5.png" alt=""></div>'
                    +'<div class="slide"><img src="./img/b1.png" alt=""></div>'
                +'</div>'
                +'<span id="left"><</span>'
                +'<span id="right">></span>'
                +'<ul class="nav" id="navs">'
                    +'<li class="active">1</li>'
                    +'<li>2</li>'
                    +'<li>3</li>'
                    +'<li>4</li>'
                    +'<li>5</li>'
                +'</ul>');
  
    
    var $box = $('#box');
    $box.append($banner);
    var $Navlist = $('#navs').children();
    var $right = $('#right'),$left = $('#left');
    var index = 1;
    var timer;
    var isMoving = false;

    $box.mouseover(function(){
        left.style.opacity = 0.5;
        right.style.opacity = 0.5;
        clearInterval(timer)
    })
    $box.mouseout(function(){
        left.style.opacity = 0;
        right.style.opacity = 0;
        timer = setInterval(next, 2000);
    })

    for( var i=0; i<$Navlist.length; i++ ){
        (function(i){
            $Navlist[i].onclick = function(){
                index = i+1;
                navmove();
                animate(slider,{left:-1200*index});
            }
        })(i);
    }

    $left.click(function(){
        prev();
    })

    $right.click(function(){
        next();
    })

    function prev(){
        if(isMoving){
            return;
        }
        isMoving = true;
        index--;
        navmove();
        animate(slider,{left:-1200*index},function(){
            if(index==0){
                slider.style.left = '-6000px';
                index = 5;
            }
            isMoving = false;
        });
    }

    function next(){
        if(isMoving){
            return;
        }
        isMoving = true;
        index++;
        navmove();
        animate(slider,{left:-1200*index},function(){
            if(index==6){
                slider.style.left = '-1200px';
                index = 1;
            }
            isMoving = false;
        });
    }

    function navmove(){
        for( var i=0; i<$Navlist.length; i++ ){
            $Navlist[i].className = "";
        }
        if(index >5 ){
            $Navlist[0].className = "active";
        }else if(index<=0){
            $Navlist[4].className = "active";
        }else {
            $Navlist[index-1].className = "active";
        }
    }

    timer = setInterval(next, 2000);
    function getStyle(obj, attr){
        if(obj.currentStyle){
            return obj.currentStyle[attr];
        } else {
            return getComputedStyle(obj, null)[attr];
        }
    }

    function animate(obj,json,callback){
        clearInterval(obj.timer);
        obj.timer = setInterval(function(){
            var isStop = true;
            for(var attr in json){
                var now = 0;
                if(attr == 'opacity'){
                    now = parseInt(getStyle(obj,attr)*100);
                }else{
                    now = parseInt(getStyle(obj,attr));
                }
                var speed = (json[attr] - now) / 8;
                speed = speed>0?Math.ceil(speed):Math.floor(speed);
                var cur = now + speed;
                if(attr == 'opacity'){
                    obj.style[attr] = cur / 100;
                }else{
                    obj.style[attr] = cur + 'px';
                }
                if(json[attr] !== cur){
                    isStop = false;
                }
            }
            if(isStop){
                clearInterval(obj.timer);
                callback&&callback();
            }
        }, 30)
    }   
    return $box;
}
