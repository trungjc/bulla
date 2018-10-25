'use strict';
var isMobileScreen = function () {
    return document.body.clientWidth < 992;
};

var app = {
    init: function () {
        app.slider();
        app.mobile();
    },
    slider: function () {
        //$('.slick-banne').slick({
        //    slidesToShow: 1,
        //    slidesToScroll: 1,
        //    arrows: false,
        //    fade: true,
        //    dots: true,
        //    //customPaging : function(slider, i) {
        //    //  var thumb = $(slider.$slides[i]).find('.item').attr('data-thumb');
        //    //  console.log(thumb);
        //    //  return '<a><img src="' + thumb + '"></a>'
        //    //}
        //});
        $('.slick-banner').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
            arrows: true,
        });
        $('#newsSlider').slick({
            slidesToShow: 4,
            slidesToScroll: 2,
            dots: false,
            arrows: true,
        });
    },
    mobile:function(){
        let winWidth = window.innerWidth;
        if (winWidth < 1024) {
            //add class menu
            $('#mobile_menu').addClass('collapse');
        }
    },
    initEqualHeight: function () {
        if (isMobileScreen()) return;
    },
    equalHeightByRow: function (obj, notRunMobile) {
        var widthTarget = 0;
        if ($(obj).length) {
            $(obj).height('auto');
            widthTarget = notRunMobile === true ? 768 : 0;
            if ($(window).width() >= widthTarget) {
                var currentTallest = 0,
                  currentRowStart = 0,
                  rowDivs = [],
                  currentDiv = 0,
                  $el,
                  topPosition = 0;
                $(obj).each(function () {
                    if ($(this).is(':visible') === true) {
                        $el = $(this);
                        topPosition = $el.offset().top;
                        if (currentRowStart !== topPosition) {
                            for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
                                rowDivs[currentDiv].css('min-height', currentTallest);
                            }
                            rowDivs = [];
                            currentRowStart = topPosition;
                            currentTallest = $el.innerHeight();
                            rowDivs.push($el);
                        } else {
                            rowDivs.push($el);
                            currentTallest = currentTallest < $el.innerHeight() ? $el.innerHeight() : currentTallest;
                        }
                        for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
                            rowDivs[currentDiv].css('min-height', currentTallest);
                        }
                    }
                });
            }
        }
    }




};


$(document).ready(function () {
    app.init();
    var resizeId;
    $(window).resize(function () {
        clearTimeout(resizeId);
        resizeId = setTimeout(function () {
            app.initEqualHeight();
        });
        app.mobile();
    });

    $(window).scroll(function () {
    });
});

$(window).on('load', function () {
});


