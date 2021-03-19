/****************************************************************
 *                                                                *
 *                              代码库                            *
 *                        www.dmaku.com                            *
 *              努力创建完善、持续更新插件以及模板            *
 *                                                                *
 ****************************************************************/
$(document).ready(function () {
    var canvas = document.getElementById("c");
    var ctx = canvas.getContext("2d");
    var c = $("#c");
    var x, y, w, h, cx, cy, l;
    var y = [];
    var b = {
        n: 100,
        c: false,    //  颜色  如果是false 则是随机渐变颜色
        bc: '#000',   //  背景颜色
        r: 0.9,
        o: 0.05,
        a: 1,
        s: 20,
    }
    re();
    var color, color2;
    if (b.c) {
        color2 = b.c;
    } else {
        color = Math.random() * 360;
    }

    $(window).resize(function () {
        re();
    });

    function begin() {
        if (!b.c) {
            color += .1;
            color2 = 'hsl(' + color + ',100%,80%)';
        }
        ctx.globalAlpha = 0.2;
        ctx.fillStyle = b.bc;
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = color2;
        y.push({x: cx, y: cy, xv: 2, yv: 1, o: 1});

        for (var i = 0; i < y.length; i++) {
            y[i].o -= b.o / 10;
            ctx.globalAlpha = y[i].o;
            y[i].x += (Math.random() - .5) * 4;
            y[i].y -= 1;
            ctx.fillRect(y[i].x, y[i].y, 2, 2);
            if (y[i].o <= 0) {
                y.splice(i, 1);
                i--;
            }
        }
        window.requestAnimationFrame(begin);
    }

    function re() {
        w = window.innerWidth;
        h = window.innerHeight;
        canvas.width = w;
        canvas.height = h;
        cx = w / 2;
        cy = h / 2;
    }

    c.mousemove(function (e) {
        cx = e.pageX - c.offset().left;
        cy = e.pageY - c.offset().top;
    });
    /*c.mousedown(function(){
        c.on('mousemove',function(e){
            cx = e.pageX-c.offset().left;
            cy = e.pageY-c.offset().top;
            y.push({x:cx,y:cy,r:b.r,o:1});
        });
        c.on('mouseup',function(){
            c.off('mouseup');
            c.off('mousemove');
            c.off('moseleave');
        });
        c.on('mouseleave',function(){
            c.off('mouseup');
            c.off('mousemove');
            c.off('moseleave');
        });
    });*/
    (function () {
        var lastTime = 0;
        var vendors = ['webkit', 'moz'];
        for (var xx = 0; xx < vendors.length && !window.requestAnimationFrame; ++xx) {
            window.requestAnimationFrame = window[vendors[xx] + 'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[xx] + 'CancelAnimationFrame'] ||
                window[vendors[xx] + 'CancelRequestAnimationFrame'];
        }

        if (!window.requestAnimationFrame) {
            window.requestAnimationFrame = function (callback, element) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
                var id = window.setTimeout(function () {
                    callback(currTime + timeToCall);
                }, timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };
        }
        if (!window.cancelAnimationFrame) {
            window.cancelAnimationFrame = function (id) {
                clearTimeout(id);
            };
        }
    }());
    begin();
});
console.log("\u002f\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u000d\u000a\u0020\u002a\u0009\u0009\u0009\u0009\u0009\u0009\u0009\u0009\u0009\u0009\u0009\u0009\u0009\u0009\u0009\u0009\u002a\u0009\u0009\u000d\u000a\u0020\u002a\u0020\u0009\u0009\u0009\u0009\u0009\u0009\u0020\u0020\u0020\u0020\u0020\u0020\u4ee3\u7801\u5e93\u0009\u0009\u0009\u0009\u0009\u0009\u0009\u002a\u000d\u000a\u0020\u002a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0077\u0077\u0077\u002e\u0064\u006d\u0061\u006b\u0075\u002e\u0063\u006f\u006d\u0009\u0009\u0009\u0009\u0009\u0009\u0009\u002a\u000d\u000a\u0020\u002a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0009\u0009\u0020\u0020\u52aa\u529b\u521b\u5efa\u5b8c\u5584\u3001\u6301\u7eed\u66f4\u65b0\u63d2\u4ef6\u4ee5\u53ca\u6a21\u677f\u0009\u0009\u0009\u002a\u000d\u000a\u0020\u002a\u0020\u0009\u0009\u0009\u0009\u0009\u0009\u0009\u0009\u0009\u0009\u0009\u0009\u0009\u0009\u0009\u0009\u002a\u000d\u000a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002f");