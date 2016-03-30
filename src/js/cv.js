pageNav();

function pageNav() {
    var $navBtn = $('#nav a'),
        index = 0,
        $body = $('body'),
        pageHeight,
        pageNum = $('section').eq(this.length - 1).attr('id').substr(-1);

    $navBtn.eq(0).addClass('active');

    resize();

    window.onresize = resize;

    $navBtn.click(function() {
        index = $navBtn.index(this);

        pageScroll(index);

        return false;
    });

    document.onmousewheel = eventScroll;

    document.onkeydown = eventScroll;

    touchEvent();

    function resize() {
        pageHeight = $(window).height();
        $('body').css('height', pageHeight);
        pageScroll(index);
    }

    function touchEvent() {
        var y1, y2,
            t, t1, t2;

        document.addEventListener("touchstart", function(e) {
            y1 = e.targetTouches[0].pageY;
            t = new Date();
            t1 = t.getTime();
        });

        document.addEventListener("touchmove", function(e) {
            y2 = e.targetTouches[0].pageY;
        });

        document.addEventListener("touchend", function() {
            t = new Date();
            t2 = t.getTime();
            eventScroll(y1 - y2, t2 - t1);
        });
    }

    function eventScroll(e, t) {
        if ($body.is(':animated')) {
            return;
        }

        var direction;

        if (e.wheelDeltaY) {
            if (e.wheelDeltaY > 0) {
                direction = "up";
            } else {
                direction = "down";
            }
        }

        if (e.keyCode) {
            if (e.keyCode == 38) {
                direction = "up";
            } else if (e.keyCode == 40) {
                direction = "down";
            }
        }

        if (typeof e === "number") {
            if (e < 0) {
                direction = "up";
            } else {
                direction = "down";
            }
        }

        if (index === 0 && direction == "up") {
            index = 0;
        } else {
            if (direction == "up") {
                index--;
            } else if (direction == "down") {
                index++;
            }

            if (index == pageNum) {
                index = 0;
            }
        }

        pageScroll(index);
    }

    function pageScroll(index) {
        var href = $navBtn.eq(index).attr("href");

        $navBtn.removeClass('active')
            .eq(index).addClass('active');

        $body.stop(true, false).animate({
            scrollTop: $(href).offset().top + "px"
        }, 900);
    }
}
