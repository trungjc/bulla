'use strict';
var isMobileScreen = function () {
    return document.body.clientWidth < 992;
};

var app = {
    init: function () {
        app.slider();
    },
    slider: function () {
        // $('#slickBanner').slick({
        //     slidesToShow: 1,
        //     slidesToScroll: 1,
        //     dots: false,
        //     arrows: true,
        // });
        $('#newsSlider').slick({
            slidesToShow: 4,
            slidesToScroll: 2,
            dots: false,
            arrows: true,
            infinite: false,
            responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    dots: false,
                    arrows: true,
                    infinite: false,
                }
            }]
        });
          $('.banner').slick({
            slidesToScroll: 1,
            dots: false,
            arrows: true,
            responsive:
            [
              {
                breakpoint: 1024,
                settings: {
                  arrows: false,
                  autoplay: true,
                  autoplaySpeed: 2000
                }
              }
              ]
          });

          $('.testimonial-slider').slick({
            slidesToScroll: 1,
            dots: false,
            arrows: false,
            fade: true,
            cssEase: 'linear',
            autoplay: true,
            autoplaySpeed: 3000
          });
    },
    mobile: function () {
        let winWidth = window.innerWidth;
        if (winWidth < 1024) {
            //add class menu
            $('#mobile_menu').addClass('collapse');
        }
        else {
            $('#mobile_menu').removeClass('collapse');
        }

        $('.mb-btn').on('click',function () {
            $(this).toggleClass('active');
          $('html').toggleClass('show-menu');
        })
        $('#mobile_menu li .fas').on('click',function (e) {

            $(this).toggleClass('active');
            $(this).next().toggleClass('active');
          e.preventDefault();
        })
    },
    initEqualHeight: function () {
        if (isMobileScreen()) return;
    },
    equalHeight: function (obj, notRunMobile) {
        var widthTarget = 0;
        if ($(obj).length) {
            $(obj).height('auto');
            widthTarget = notRunMobile === true ? 768 : 0;
            if ($(window).width() >= widthTarget) {
                var currentTallest = 0;
                $(obj).each(function () {
                    if ($(this).is(':visible') === true) {
                        if ($(this).outerHeight() > currentTallest) {
                            currentTallest = $(this).outerHeight();
                        }
                    }
                });
                $(obj).css('min-height', currentTallest);
            }
        }
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
    },
    // validateRuleAccept: function () {
    //     $('#submitbtn').on('click', function () {
    //         if ($('#agree_privacy').prop('checked')) {
    //             $('#agreeBox').removeClass('error');
    //         }
    //         else {
    //             $('#agreeBox').addClass('error');
    //         }
    //     })
    // }
};

var product = {

    init: function () {
        product.filter()
    },
    filter: function () {
        var $grid = $('.grid').isotope({
            itemSelector: '.element-item',
            layoutMode: 'fitRows',
        });

        // bind filter button click
        $('#filters').on('click', 'button', function () {
            var filterValue = $(this).attr('data-filter');
            $grid.isotope({ filter: filterValue });
        });
        // change is-checked class on buttons
        $('.button-group').each(function (i, buttonGroup) {
            var $buttonGroup = $(buttonGroup);
            $buttonGroup.on('click', 'button', function () {
                $buttonGroup.find('.is-checked').removeClass('is-checked');
                $(this).addClass('is-checked');
            });
        });
    },
    slide: function () {
        $('#relatedP').slick({
            slidesToShow: 4,
            slidesToScroll: 2,
            dots: false,
            arrows: true,
            infinite: false,
            responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    dots: false,
                    arrows: true,
                    infinite: false,
                }
            }]
        });
    },
    menuFilter: function () {
        let winWidth = window.innerWidth;
        if (winWidth < 1024) {
            //add class menu
            $('#filter_collapse').addClass('collapse');
        }
        else {
            $('#filter_collapse').removeClass('collapse');
        }
    }
};

var recipes = {

    initSearch: function () {
        $('#searchBtn').on('click', function () {
            $('.recipe').addClass('show-search');
        })
        $('#closeSearch').on('click', function () {
            $('.recipe').removeClass('show-search');
        })
    },
    onFilterClick: function () {
        $('#filter li > a').off('click').on('click', function (e) {
            $('#filterText').text($(this).text());
            if($(this).text() === 'clear') {
              $('#filterText').text('filter by product');
            } else {
              $('#filterText').text($(this).text());
            }
        })
    }
};


$(document).ready(function () {

    app.mobile();
    app.init();
    product.slide();
    recipes.initSearch();
    recipes.onFilterClick();
    product.menuFilter();

    var resizeId;


    $(window).resize(function () {
        clearTimeout(resizeId);
        resizeId = setTimeout(function () {
            app.initEqualHeight();
        });
        app.mobile();
        if ($('.js-products').length > 0) {
            product.menuFilter();
        }
    });

    $(window).scroll(function () {
        let winWidth = window.innerWidth;
        if (winWidth > 1024) {
            if ($(window).scrollTop() > 200) {
                $('header').addClass('sticky-header');
            }
            else {
                $('header').removeClass('sticky-header');
            }
        }

    });
});

$(window).on('load', function () {
    if ($('.js-products').length > 0) {
        // product.init();
        app.initEqualHeight();
        app.equalHeightByRow('.element-item > a');
    }
});


