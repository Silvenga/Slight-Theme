﻿function isExternal(url) {
    var match = url.match(/^([^:\/?#]+:)?(?:\/\/([^\/?#]*))?([^?#]+)?(\?[^#]*)?(#.*)?/);
    if (typeof match[1] === "string" && match[1].length > 0 && match[1].toLowerCase() !== location.protocol) return true;
    if (typeof match[2] === "string" && match[2].length > 0 && match[2].replace(new RegExp(":(" + { "http:": 80, "https:": 443 }[location.protocol] + ")?$"), "") !== location.host) return true;
    return false;
}

jQuery(function ($) {

    var history = window.History;
    var $ajaxContainer = $('#ajax-container');

    if (!history.enabled) {
        console.log("Ajax not supported.");
        return false;
    }

    history.Adapter.bind(window, 'statechange', function () {

        var state = history.getState();

        $('html, body').animate({ 'scrollTop': 0 });

        $("#main-footer").fadeOut(200);

        sizeForScroll();

        $ajaxContainer.fadeOut(200, function () {

            $('#ajax-container').load(state.url + ' #ajax-content', function(response, status, xhr) {

                if (status == "error") {

                    var msg = $('<div>', { html: response });
                    msg = msg.find('#ajax-content').html();

                    $("#ajax-container").html(msg);
                }

                document.title = $("#title").text();

                _paq.push(['trackPageView', $("#title").text()]);

                sizeForScroll();

                $ajaxContainer.fadeIn(200);
                $("#main-footer").fadeIn(200);

                start();
            });
        });
    });

    $('body').on('click', 'a', function (e) {

        if (isExternal($(this).attr('href')))
            return true;

        e.preventDefault();

        var currentState = history.getState();
        var url = $(this).attr('href');
        var title = $(this).attr('title') || null;

        if (url !== currentState.url.replace(/\/$/, "")) {

            history.pushState({}, title, url);
        }
    });
});