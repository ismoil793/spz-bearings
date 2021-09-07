(function ($) {
  "use strict";

  var nav_offset_top = $("header").height() + 100;
  /*-------------------------------------------------------------------------------
	  Navbar 
	-------------------------------------------------------------------------------*/

  //* Navbar Fixed
  function navbarFixed() {
    if ($("header").length) {
      $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        if (scroll >= nav_offset_top) {
          $("header").addClass("navbar_fixed");
        } else {
          $("header").removeClass("navbar_fixed");
        }
      });
    }
  }
  navbarFixed();

  if ($(".cons_project_slider,.twitter_slider").length) {
    $(".cons_project_slider,.twitter_slider").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      arrows: true,
      prevArrow: ".prev,.prevs",
      nextArrow: ".next,.nexts",
    });
  }

  if ($(".cons_project_slider_two").length) {
    $(".cons_project_slider_two").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      centerMode: true,
      centerPadding: "432px",
      autoplay: false,
      arrows: true,
      prevArrow: ".prev",
      nextArrow: ".next",
      responsive: [
        {
          breakpoint: 1420,
          settings: {
            centerPadding: "200px",
          },
        },
        {
          breakpoint: 992,
          settings: {
            centerPadding: "80px",
          },
        },
        {
          breakpoint: 600,
          settings: {
            centerPadding: "15px",
          },
        },
      ],
    });
  }

  /*----------------------------------------------------*/
  /*  Main Slider js
    /*----------------------------------------------------*/

  function mainSlider() {
    var sliderTimer = 5000;
    var beforeEnd = 500;
    var $imageSlider = $(".main_slider,.slider_tweenty_area");
    $imageSlider.slick({
      autoplay: true,
      autoplaySpeed: sliderTimer,
      speed: 1000,
      dots: false,
      fade: true,
      prevArrow: ".slider_left_arrow",
      nextArrow: ".slider_right_arrow",
      adaptiveHeight: true,
      pauseOnFocus: false,
      pauseOnHover: false,
    });

    function progressBar() {
      $(".slider-progress").find(".slider_progress_bar").removeAttr("style");
      $(".slider-progress").find(".slider_progress_bar").removeClass("active");
      setTimeout(function () {
        $(".slider-progress")
          .find(".slider_progress_bar")
          .css("transition-duration", sliderTimer / 1000 + "s")
          .addClass("active");
      }, 100);
    }
    progressBar();
    $imageSlider.on("beforeChange", function (e, slick) {
      progressBar();
    });

    $(".main_slider,.slider_tweenty_area").on("beforeChange", function (
      e,
      slick,
      currentSlide,
      nextSlide
    ) {
      var $animatingElements = $(
        'div.slider_item[data-slick-index="' + nextSlide + '"]'
      ).find("[data-animation]");
      doAnimations($animatingElements);
    });
    function doAnimations(elements) {
      var animationEndEvents =
        "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
      elements.each(function () {
        var $this = $(this);
        var $animationDelay = $this.data("delay");
        var $animationType = "animated " + $this.data("animation");
        $this.css({
          "animation-delay": $animationDelay,
          "-webkit-animation-delay": $animationDelay,
        });
        $this.addClass($animationType).one(animationEndEvents, function () {
          $this.removeClass($animationType);
        });
      });
    }
  }

  mainSlider();
  /*----------------------------------------------------*/
  /*  Main Slider js
    /*----------------------------------------------------*/

  if ($(".cons_project_slider_three").length) {
    $(".cons_project_slider_three").slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      arrows: true,
      prevArrow: ".prev",
      nextArrow: ".next",
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 500,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    });
  }

  if ($(".shop_banner_slider").length) {
    $(".shop_banner_slider").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      arrows: false,
      dots: false,
      fade: true,
      speed: 500,
      infinite: true,
      cssEase: "ease-in-out",
      touchThreshold: 100,
    });
  }

  /*=============================================== 
	       cons testimonial slider
  ================================================*/

  if ($("#testimonial").length) {
    $("#testimonial").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      centerMode: true,
      centerPadding: "842px",
      autoplay: true,
      arrows: false,
      dots: true,
      responsive: [
        {
          breakpoint: 1368,
          settings: {
            centerPadding: "500px",
          },
        },
        {
          breakpoint: 992,
          settings: {
            centerPadding: "200px",
          },
        },
        {
          breakpoint: 600,
          settings: {
            centerPadding: "100px",
          },
        },
        {
          breakpoint: 480,
          settings: {
            centerPadding: "0px",
          },
        },
      ],
    });
  }

  if ($("#testimonialTwo").length) {
    $("#testimonialTwo").slick({
      slidesToShow: 2,
      slidesToScroll: 1,
      centerMode: true,
      centerPadding: "170px",
      autoplay: true,
      arrows: false,
      dots: true,
      responsive: [
        {
          breakpoint: 1368,
          settings: {
            centerPadding: "70px",
          },
        },
        {
          breakpoint: 992,
          settings: {
            centerPadding: "0px",
          },
        },
        {
          breakpoint: 600,
          settings: {
            centerPadding: "50px",
            slidesToShow: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            centerPadding: "0px",
            slidesToShow: 1,
          },
        },
      ],
    });
  }

  if ($(".pr_gallery_slider").length) {
    $(".pr_gallery_slider").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      arrows: false,
      dots: false,
    });
  }

  if ($(".cons_service_slider").length) {
    $(".cons_service_slider").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      centerMode: true,
      centerPadding: "890px",
      autoplay: true,
      arrows: true,
      nextArrow: ".arrow_next",
      dots: false,
      responsive: [
        {
          breakpoint: 1368,
          settings: {
            centerPadding: "700px",
          },
        },
        {
          breakpoint: 1200,
          settings: {
            centerPadding: "400px",
          },
        },
        {
          breakpoint: 992,
          settings: {
            centerPadding: "100px",
            slidesToShow: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            centerPadding: "0px",
            slidesToShow: 1,
          },
        },
      ],
    });
  }

  if ($(".cons_service_slider_two").length) {
    $(".cons_service_slider_two").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      centerMode: true,
      centerPadding: "940px",
      autoplay: true,
      arrows: false,
      dots: false,
      responsive: [
        {
          breakpoint: 1500,
          settings: {
            centerPadding: "700px",
          },
        },
        {
          breakpoint: 1200,
          settings: {
            centerPadding: "400px",
          },
        },
        {
          breakpoint: 992,
          settings: {
            centerPadding: "100px",
            slidesToShow: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            centerPadding: "0px",
            slidesToShow: 1,
          },
        },
      ],
    });
  }

  /*=============================================== 
	       cons testimonial slider two
  ================================================*/

  if ($("#testimonail_slider_two").length) {
    $("#testimonail_slider_two").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      arrows: true,
      dots: false,
    });
  }

  if ($(".testimonial_info").length) {
    $(".cons_testimonail_slider_two ").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: false,
      arrows: true,
      swipe: false,
      asNavFor: ".testimonial_thumbnil",
      prevArrow: ".prevs",
      nextArrow: ".nexts",
    });
    $(".testimonial_thumbnil").slick({
      slidesToShow: 1,
      autoplay: false,
      infinite: false,
      asNavFor: ".cons_testimonail_slider_two",
      centerMode: true,
      centerPadding: "55px",
      swipe: false,
      arrows: false,
      focusOnSelect: true,
    });
  }

  if ($(".cons_team_area_three").length) {
    $(".cons_team_slider").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      // infinite: false,
      arrows: true,
      swipe: false,
      asNavFor: ".cons_team_thum_slider",
      prevArrow: ".prev",
      nextArrow: ".next",
      dots: true,
    });
    $(".cons_team_thum_slider").slick({
      slidesToShow: 2,
      slidesToScroll: 1,
      autoplay: false,
      asNavFor: ".cons_team_slider",
      centerMode: true,
      centerPadding: "145px",
      swipe: false,
      arrows: false,
      focusOnSelect: true,
      responsive: [
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            centerPadding: "25px",
          },
        },
      ],
    });
  }

  function parallax() {
    if ($(".parallaxie").length) {
      $(".parallaxie").parallaxie({
        speed: 0.5,
      });
    }
  }
  parallax();

  /*=============================================== 
	  Portfolio isotope js
	================================================*/
  function portfolioMasonry() {
    var portfolio = $("#work-portfolio, .projects_inner");
    if (portfolio.length) {
      portfolio.imagesLoaded(function () {
        // images have loaded
        // Activate isotope in container
        portfolio.isotope({
          // itemSelector: ".portfolio_item",
          layoutMode: "fitRows",
          filter: "*",
          animationOptions: {
            duration: 1000,
          },
          transitionDuration: "0.5s",
        });

        // Add isotope click function
        $("#portfolio_filter div").on("click", function () {
          $("#portfolio_filter div").removeClass("active");
          $(this).addClass("active");

          var selector = $(this).attr("data-filter");
          portfolio.isotope({
            filter: selector,
            animationOptions: {
              animationDuration: 750,
              easing: "linear",
              queue: false,
            },
          });
          return false;
        });
      });
    }
  }
  portfolioMasonry();

  function portfolioMasonry2() {
    var gallery = $("#gallery");
    if (gallery.length) {
      gallery.imagesLoaded(function () {
        // images have loaded
        // Activate isotope in container
        gallery.isotope({
          // itemSelector: ".portfolio_item",
          layoutMode: "masonry",
          masonry: {
            columnWidth: 10,
          },
        });
      });
    }
  }
  portfolioMasonry2();

  /*=============================================== 
	       Parallax Init
	  ================================================*/
  if ($("#scroll_parallax").length > 0) {
    $("#scroll_parallax").parallax({
      scalarX: 10.0,
      scalarY: 0.0,
    });
  }

  /*=============================================== 
	  Portfolio image hover js
  ================================================*/

  function ImageHover() {
    if ($(".portfolio_item").length) {
      imagesLoaded(document.querySelectorAll("img"), () => {
        document.body.classList.remove("loading");
      });

      Array.from(document.querySelectorAll(".portfolio_item")).forEach((el) => {
        const imgs = Array.from(el.querySelectorAll("img"));
        new hoverEffect({
          parent: el,
          intensity: el.dataset.intensity || undefined,
          speedIn: el.dataset.speedin || undefined,
          speedOut: el.dataset.speedout || undefined,
          easing: el.dataset.easing || undefined,
          hover: el.dataset.hover || undefined,
          image1: imgs[0].getAttribute("src"),
          image2: imgs[1].getAttribute("src"),
          displacementImage: el.dataset.displacement,
        });
      });
    }
  }
  ImageHover();

  if ($(".fact_item,.expreence_item").length) {
    $(".fact_item,.expreence_item").each(function () {
      $(this).isInViewport(function (status) {
        if (status === "entered") {
          for (
            var i = 0;
            i < document.querySelectorAll(".odometer").length;
            i++
          ) {
            var el = document.querySelectorAll(".odometer")[i];
            el.innerHTML = el.getAttribute("data-odometer-final");
          }
        }
      });
    });
  }

  if ($(".cons_project_slider_four").length) {
    var tabContent = new Swiper(".cons_project_slider_four", {
      slidesPerView: "auto",
      centeredSlides: true,
      spaceBetween: 30,
      loop: true,
    });
  }

  if ($(".cons_project_slider_five").length) {
    var tabContent = new Swiper(".cons_project_slider_five", {
      slidesPerView: "auto",
      spaceBetween: 30,
      loop: true,
      // loopFillGroupWithBlank: true,
    });
  }

  if ($(".cons_project_slider_six").length) {
    $(".cons_project_slider_six").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      centerMode: true,
      centerPadding: "230px",
      autoplay: false,
      arrows: true,
      prevArrow: ".prev",
      nextArrow: ".next",
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            centerPadding: "150px",
          },
        },
        {
          breakpoint: 992,
          settings: {
            centerPadding: "70px",
            slidesToShow: 1,
          },
        },
        {
          breakpoint: 767,
          settings: {
            centerPadding: "0px",
            centerMode: false,
            slidesToShow: 1,
          },
        },
      ],
    });
  }

  if ($(".cons_project_slider_eight").length) {
    $(".cons_project_slider_eight").slick({
      slidesToShow: 2,
      slidesToScroll: 1,
      centerMode: true,
      centerPadding: "352px",
      autoplay: false,
      arrows: true,
      prevArrow: ".prev",
      nextArrow: ".next",
      responsive: [
        {
          breakpoint: 1600,
          settings: {
            centerPadding: "250px",
          },
        },
        {
          breakpoint: 1200,
          settings: {
            centerPadding: "70px",
          },
        },
        {
          breakpoint: 767,
          settings: {
            centerPadding: "50px",
            slidesToShow: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            centerPadding: "20px",
            slidesToShow: 1,
          },
        },
      ],
    });
  }

  /*=============================================== 
	       progress-bar
	  ================================================*/
  $(".progress-element").each(function () {
    $(this).waypoint(
      function () {
        var progressBar = $(".progress-bar");
        progressBar.each(function (indx) {
          $(this).css("width", $(this).attr("aria-valuenow") + "%");
        });
      },
      {
        triggerOnce: true,
        offset: "bottom-in-view",
      }
    );
  });
  /*=============================================== 
	       counter js
	  ================================================*/
  function counterActivator() {
    if ($(".counter").length) {
      $(".counter").counterUp({
        delay: 70,
        time: 1000,
      });
    }
  }
  counterActivator();

  $(".search a").on("click", function () {
    if ($(this).parent().hasClass("open")) {
      $(this).parent().removeClass("open");
    } else {
      $(this).parent().addClass("open");
    }
    return false;
  });

  function shopingCartbtn() {
    var windowWidth = $(window).width();
    if ($(".shoping-cart").length) {
      if (windowWidth < 992) {
        $(".shoping-cart a").on("click", function (e) {
          e.preventDefault();
          if ($(this).parent().hasClass("open")) {
            $(this).parent().removeClass("open");
          } else {
            $(this).parent().addClass("open");
          }
          return false;
        });
      }
    }
  }

  shopingCartbtn();

  $(".menu_btn").on("click", function (e) {
    e.preventDefault();
    $("body").removeClass("menu-is-closed").addClass("menu-is-opened");
  });
  $(".close_btn, .body_capture").on("click", function () {
    $("body").removeClass("menu-is-opened").addClass("menu-is-closed");
  });

  function wd_scroll() {
    if ($(".wd_scroll").length) {
      $(window).on("load", function () {
        $(".wd_scroll").mCustomScrollbar({
          theme: "dark",
        });
      });
    }
  }
  wd_scroll();

  var dropToggle = $(".mb_menu > li").has("ul").children("a");
  dropToggle.on("click", function () {
    dropToggle.not(this).closest("li").find("ul").slideUp(300);
    $(this).closest("li").children("ul").slideToggle(300);
    return false;
  });

  // === Back to Top Button
  function backTop() {
    var back_top_btn = $(".go_top");
    back_top_btn.on("click", function (e) {
      e.preventDefault();
      $("html, body").animate({ scrollTop: 0 }, "300");
    });
  }
  backTop();

  /*--------------- Start popup-js--------*/
  function popupVideo() {
    if ($(".popup-youtube").length) {
      $(".popup-youtube").magnificPopup({
        disableOn: 700,
        type: "iframe",
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false,
        mainClass: "mfp-with-zoom mfp-img-mobile",
      });
    }
  }
  popupVideo();

  /*-------------------------------------------------------------------------------
	  WOW js
	-------------------------------------------------------------------------------*/

  Pace.on("done", function () {
    $("#preloader").addClass("load_coplate");
    $(".product_name").addClass("load_coplate");
  });
})(jQuery);
