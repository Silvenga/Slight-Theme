function start() {

    $(".hover-parrent").on("mouseenter", function() {

        $(this).addClass("onhover");
    });

    $(".hover-parrent").on("mouseleave", function() {

        $(this).removeClass("onhover");
    });

    $(window).scroll(function() {

        if ($(document).scrollTop() > 50) {

            $(".sticky-menu").addClass("menu-small");
        } else {

            $(".sticky-menu").removeClass("menu-small");
        }
    });

    sizeForScroll();

}

start();
$(window).resize(function() {

    sizeForScroll();
});

function sizeForScroll() {
    
    if (!isScrollBar()) {
        $("body").css('margin-right', getScrollBar() + 'px');
    } else {
        $("body").css('margin-right', 0 + 'px');
    }
        $("#nav-bar").width($("#page-length").width());
}

function isScrollBar() {

    return  $("body").get(0).scrollHeight >  $("body").get(0).clientHeight;
}

function getScrollBar() {
    
    var scrollDiv = document.createElement("div");
    scrollDiv.className = "scrollbar-measure";
    document.body.appendChild(scrollDiv);

    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);

    return scrollbarWidth;
}