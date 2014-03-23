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

    // Reset the comments script
    $("#disqus_script").remove();

    // if id is seen, then run the comments script
    if ($("#disqus_thread").length > 0) {
        var disqus_shortname = 'CHANGE_ME';
        var disqus_identifier = '{{post.id}}';
        (function() {
            var dsq = document.createElement('script');
            dsq.id = "disqus_script";
            dsq.type = 'text/javascript';
            dsq.async = true;
            dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
            (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
        })();
    }

    // Download Gists
    readGists();
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