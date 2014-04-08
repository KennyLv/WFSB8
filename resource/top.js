(function() {

    var $backToTopTxt="<a href=\"cart.html\" class=\"back_a\">购物车</a>", $backToTopEle = new Element("div", {
        "class": "backToTop", 
        "id":"backToTop",
        "title":"返回大象",
    }).set("html", $backToTopTxt).addEvent("click", function() {
        var st = document.getScroll().y, speed = st / 10;
        var funScroll = function() {
            st -= speed;
            if (st <= 0) { st = 0; }
            window.scrollTo(0, st);
            if (st > 0) { setTimeout(funScroll, 20); }
        };
        funScroll();
    }).inject(document.body), $backToTopFun = function() {
        var st = document.getScroll().y, winh = window.getSize().y;
        (st > 0)? $backToTopEle.setStyle("display", "block"): $backToTopEle.setStyle("block", "none");
        //IE6下的定位
        if (!window.XMLHttpRequest) {
            $backToTopEle.setStyle("top", st + winh - 166);
        }
    };
    window.addEvents({
        scroll: $backToTopFun,
        domready: $backToTopFun
    });
})();