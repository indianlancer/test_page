$(document).ready(function () {
    $('.bussiness-incri, .scroll-effect').each(function () {
        $(window).scroll(function (e) {
            $('.bussiness-incri, .scroll-effect').css({'background-position-y': $(window).scrollTop() * -.3 + (+200) + "px"});
        });
    });
     $(".btn.btn-info.view-all-btn").click(function (e) {
          e.preventDefault();
        document.location.href= HTTP_PATH+"contact-us";
    });
    console.log();
    $(".white-btn").wrap("<div class='banner-btn'></div>")
    $(window).scroll(function (e) {

        var scroll = $(window).scrollTop();
        if (scroll > 100) {
            $(".top-sc-btn").stop().slideDown();
            $(".x-dev-nav").stop().css({'position': "fixed", "background": "#0a0a0a8c"});
            $(".nav-btn.fa-bars").stop().css({'font-size': "15px"});
            $(".navigation .navigation-brand img").stop().css({'width': "100px"});
        } else {
            $(".top-sc-btn").stop().slideUp();
            $(".x-dev-nav").stop().css({'position': "", "background": "", "padding": ""});
            $(".navigation .navigation-brand img").stop().css({'width': ""});
            $(".nav-btn.fa-bars").stop().css({'font-size': ""});
        }
    });
    var button_sub = $(".submit-btn, .form3-sub, .send-msg.contanct-us ");
    $(document).ajaxStart(function () {
        button_sub.attr("disabled", "true");
        button_sub.css("opacity", "0.5");
        button_sub.append("<img src='assets/images/app-dev/loader.gif' style='width:20px;'>");

    });
    $(document).ajaxSuccess(function () {
        button_sub.removeAttr('disabled');
        button_sub.css("opacity", "1");
        $(".submit-btn img, .form3-sub img , .send-msg.contanct-us img").remove();
    });
//    $("body").on("click", ".send-msg.contanct-us", function (e) {
//        e.preventDefault();
//        var name = $(".name").val();
//        var email_d = $(".email-d").val();
//        var subject = $(".subject").val();
//        var skpe = $(".skpe").val();
//        var company = $(".company").val();
//        var phone = $(".phone").val();
//        var write_msg = $(".write-msg").val();
//
//        $.ajax({
//            type: "POST",
//            url: "form.php/index",
//            data: {'name': name, email_d: email_d, subject: subject, skpe: skpe, company: company, phone: phone, write_msg: write_msg},
//            success: function (data) {
//                if (data.error == 1) {
//                    $('html, body').stop().animate({
//                        scrollTop: $("#con-name").offset().top
//                    }, 1500);
//                }
//                $(".contact-form.form2 input, .contact-form.form2 textarea").each(function (e) {
//                    if ($(this).val() == "") {
//                        $(this).siblings(".error-msg").html("<span >" + data.error_mess + "</span>");
//                    }
//                    if (!$(this).val() == "") {
//                        $(this).siblings(".error-msg").find("span").remove();
//                    }
//                });
//                if (!data.user_data.email_mess == "") {
//                    $('.email-d').siblings(".error-msg").html("<span>" + data.user_data.email_mess + "</span>");
//                }
//                if (!data.user_data.mobile_mess == "") {
//                    $('.phone').siblings(".error-msg").html("<span>" + data.user_data.mobile_mess + "</span>");
//                }
//                if (data.success == 1) {
//                    $(".error-msg span").remove();
//                    $(".success-msg").css("display", 'block');
//                    $(".success-msg strong").text(data.success_mess);
//                    $(".name").val("");
//                    $(".email-d").val("");
//                    $(".subject").val("");
//                    $(".skpe").val("");
//                    $(".company").val("");
//                    $(".phone").val("");
//                    $(".write-msg").val("");
//
//                }
//            }
//        });
//    });



    var form_check = 0;
    $("body").on("click", ".submit-btn", function (e) {
        e.preventDefault();
        form_check = 0;
        project_f();
    });
    $("body").on("click", ".form3-sub", function (e) {
        e.preventDefault();
        form_check = 1;
        project_f();
    });

    function project_f() {
        if (form_check == 1) {
            var file_data = $('.form-3 .pro_photo').prop('files')[0];
            var form_data = new FormData();
            form_data.append('upload', file_data);
            form_data.append('name', $(".form-3 .name_f").val());
            form_data.append('email', $(".form-3 .email_f").val());
            form_data.append('phone', $(".form-3 .phone_f").val());
            form_data.append('budget', $(".form-3 .budget_f").val());
            form_data.append('requir', $(".form-3 .Require_f").val());
            form_data.append('url', $(".form-3 .url_f").val());
        } else {
            var file_data = $('.pro_photo').prop('files')[0];
            var form_data = new FormData();
            form_data.append('upload', file_data);
            form_data.append('name', $(".name_f").val());
            form_data.append('email', $(".email_f").val());
            form_data.append('phone', $(".phone_f").val());
            form_data.append('budget', $(".budget_f").val());
            form_data.append('requir', $(".Require_f").val());
            form_data.append('url', $(".url_f").val());
        }
        $.ajax({
            url: "form-pro.php",
            dataType: 'json',
            cache: false,
            contentType: false,
            processData: false,
            data: form_data,
            type: 'post',
            success: function (data) {
                if (form_check == 1) {

                    $(".contact-form.form-3 input, .contact-form.form-3 textarea, .contact-form.form-3 select").each(function () {
                        if ($(this).val() == "") {
                            $(this).siblings(".error-msg").html("<span >" + data.error_mess + "</span>");
                        }
                        if (!$(this).val() == "") {
                            $(this).siblings(".error-msg").find("span").remove();
                        }
                        if ($(this).siblings("label").is(':contains("optional")')) {
                            $(this).siblings(".error-msg").find("span").remove();
                        }
                        if ($(this).siblings("label").is(':contains("optional")')) {
                            $(this).siblings(".error-msg").find("span").remove();
                        }
                    });
                    if (data.error == 1) {
                        $('html, body').stop().animate({
                            scrollTop: $("#namefi").offset().top - 100
                        }, 1500);
                    }
                } else {
                    if (data.error == 1) {
                        $('.hve-projct-form').stop().animate({
                            scrollTop: $("#name_nav").offset().top
                        }, 1500);
                    }

                    $(".contact-form.form-1 input, .contact-form.form-1 textarea, .contact-form.form-1 select").each(function () {
                        if ($(this).val() == "") {
                            $(this).siblings(".error-msg").html("<span >" + data.error_mess + "</span>");
                        }
                        if (!$(this).val() == "") {
                            $(this).siblings(".error-msg").find("span").remove();
                        }
                        if ($(this).siblings("label").is(':contains("optional")')) {
                            $(this).siblings(".error-msg").find("span").remove();
                        }
                    });

                }
                if (!data.user_data.email_mess == "") {
                    $('.email_f').siblings(".error-msg").html("<span>" + data.user_data.email_mess + "</span>");
                }
                if (!data.user_data.mobile_mess == "") {
                    $('.phone_f').siblings(".error-msg").html("<span>" + data.user_data.mobile_mess + "</span>");
                }
                if (!data.user_data.url_mess == "") {
                    $('.url_f').siblings(".error-msg").html("<span>" + data.user_data.url_mess + "</span>");
                }
                if (data.success == 1 && data.error == 0) {
                    $(".error-msg span").remove();
                    alert(data.success_mess);
                    $(".hve-projct-form").fadeOut();
                    $(".name_f").val("");
                    $(".phone_f").val("");
                    $(".email_f").val("");
                    $(".budget_f").val("");
                    $(".Require_f").val("");
                    $(".url_f").val("");
                    $(".pro_photo").val("");
                }
            }
        });
    }
    $(".success-msg .close").on('click', function (e) {
        e.preventDefault();
        $(".success-msg").fadeOut(300);
    });
    $(".owl-tech").owlCarousel({
        items: 8,
        itemsDesktop: [1000, 5],
        itemsDesktopSmall: [900, 3],
        itemsTablet: [600, 2],
        itemsMobile: false,
        navigation: false,
        slideSpeed: 300,
        paginationSpeed: 400,
        singleItem: true,
        pagination: false,
        responsiveClass: true,
        responsive: {
            0: {
                items: 3,
            },
            600: {
                items: 5,
            }
        }
    });
    $(" .slide-heading:eq(0), .type-effect").each(function () {
        var txt = $(this).text();
        var txt1 = $(this).text().length;
        var i = 0;
        var speed = 50;
        $(this).text(" ");
        function typeWriter() {
            if (i < txt1) {
                $(".slide-heading:eq(0), .type-effect").append(txt.charAt(i));
                i++;
                setTimeout(typeWriter, speed);
            }
        }
         var elem_sc = $(this).offset().top;
        $(window).scroll(function (e) {
            var current_scroll = $(window).scrollTop();
            if (current_scroll > elem_sc ) {
                 typeWriter();
            }

        });
        typeWriter();
    });
    $(".top-sc-btn").on('click', function(event) {
     event.preventDefault();
      $('html, body').animate({
        scrollTop: 0
      }, 800);
  });
});