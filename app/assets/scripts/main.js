'use strict';
var isMobileScreen = function() {
    return document.body.clientWidth < 992;
};

var app = {
    init: function () {
         app.slider();
    },
    slider: function () {
      $('.slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        dots: true,
        customPaging : function(slider, i) {

          var thumb = $(slider.$slides[i]).find('.item').attr('data-thumb');
          console.log(thumb);
          return '<a><img src="' + thumb + '"></a>'
          // asNavFor: '.slider-nav'
        }
      });

      $('.slider-nav').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        asNavFor: '.slider-for',
        dots: false,
        arrows: false,
        centerMode: true,
        focusOnSelect: true
      });


      $('.slider').slick({

        centerMode: true,
        centerPadding: '20%',
        // slidesToShow: 1,
        autoplay: false,
        autoplaySpeed: 3000,
        speed: 600,
        initialSlide: 0,
        pauseOnHover: true,
        pauseOnFocus: true,
         variableWidth: true,
        focusOnSelect: true,
        infinity: 1,
        arrows: false,

        responsive: [{
          breakpoint: 1024,
          settings: {
            centerPadding: '0%',
            slidesToShow: 1,
            slidesToScroll: 1,
            variableWidth: false,
            centerMode: false
          }
        }]
      }).on('beforeChange', function (event, slick, currentSlide, nextSlide){
         console.log(slick);
         console.log(currentSlide);
         console.log(nextSlide);
      })
    },
    initEqualHeight: function(){
      if(isMobileScreen()) return;
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
                  rowDivs[currentDiv].css('min-height',currentTallest);
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
                rowDivs[currentDiv].css('min-height',currentTallest);
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
    });

    $(window).scroll(function(){
    });
});

$(window).on('load', function () {
});


