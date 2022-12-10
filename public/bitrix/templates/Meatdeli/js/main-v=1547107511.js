$(window).load(() => {
    setTimeout(() => $('.page-loading').fadeOut(500), 2000)
});
$(document).ready(function() {
    


    var sizeScreenTablet = 975;
    var sizeScreenMobile = 755;
    var header = $('header');
    var btn_menu = $('.btn-nav');
    var menuMobile = $('.menu-mobile');
    var topmenu = $('.topmenu');
    var overlay = $('.overlay-mobile');
    // header control
    var Header = {
        clickButtonMenu : function(){
            btn_menu.click(function(e){
                var w = $(window).width();
                e.stopPropagation();
                $(this).toggleClass('is-active');
                if(w <= sizeScreenTablet){
                    menuMobile.toggleClass('is-active');
                    overlay.toggleClass('is-active');
                    header.toggleClass('menu-isActive');
                }
            });
        },
        disableTopMenu : function(){
            header.removeClass('menu-isActive');
        },
        changedScroll : function(){
            var h_header = header.height();
            if($(window).scrollTop() >=5 && $(window).scrollTop() > h_header-100){
                header.addClass('is-scroll');
            }else{
                header.removeClass('is-scroll');
            }
        }
    }

    $('.block-recipe #filtertool').remove();
    $('.block-recipe .container-w .lastest').append('<div id="filtertool"></div>');

    Header.clickButtonMenu();

    var Menu = {
        disableMenuMobile : function(){
            menuMobile.removeClass("is-active");
            btn_menu.removeClass('is-active');
            overlay.removeClass('is-active');
        },
        // setHeightInnerMenuMobile : function(){
        //     var h_header = header.height();
        //     var h_window = $(window).height();
        //     menuMobile.css({'height':(h_window-h_header)});
        // }
    }

    // Menu.setHeightInnerMenuMobile();
   
    overlay.click(function(e){
        Menu.disableMenuMobile();
        Header.disableTopMenu();
        $(this).removeClass('is-active');
    });

    $('#pexplain').click(function(e){
        e.stopPropagation();
        $(this).parent().find('.explainbox').slideToggle(200);
    });
    $('.explainbox').click(function(e){
        e.stopPropagation();
    })

    var App = {
         // trigger click slider
        general : function(){
            header.click(function(e){
                e.stopPropagation();
            });

            $('header .menu-mobile .inner').click(function(e){
                e.stopPropagation();
            });

            $(".backtotop").click(function () {
               $("html, body").animate({scrollTop: 0}, 700);
            });

            $('.tab-expand .item .head').click(function(){
                $(this).parent().children('.content').slideToggle(140);
                $(this).parent().siblings('.item').find('.content').slideUp(140);
                $(this).toggleClass('active');
                $(this).parent().siblings('.item').find('.head').removeClass('active');
            });

        },
        fixedSocial : function(){
            var social = $('.article-detail .social');
            if(social.length){
                var h_top  = $('.banner-top').height() + header.height();
                var h_bottom = $('footer');
                if($(window).scrollTop() >= social.offset().top - 60){
                    social.addClass('fixed');
                }
                if(social.offset().top >= h_bottom.offset().top - 150){
                    social.removeClass('fixed');
                }
                if(social.offset().top <= h_top){
                    social.removeClass('fixed');
                }
            }
        }
    }

    // slider homepage
    if($('.sliderHome .slider-w').length){
        var $sliderHome = $('.sliderHome .slider-w');
        $sliderHome.slick({
            dots: false,
            autoplay:true,
            autoplaySpeed: 5000,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            adaptiveHeight: true,
            useTransform: true,
            cssEase: 'cubic-bezier(.76,.22,.36,.99)',
            fade:true,
            nextArrow: $('.sliderHome .btn-next'),
            prevArrow: $('.sliderHome .btn-prev'),
        });
    }
   
    if($('.slider-promt').length){
        var $slider = $('.slider-promt');
        $slider.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            infinite: true,
            speed: 800,
            useTransform: true,
            cssEase: 'cubic-bezier(.76,.22,.36,.99)',
            nextArrow: $('.promt-news .btn-next'),
            prevArrow: $('.promt-news .btn-prev'),
        });
    }

    if($('.slider-pd-recommend').length){
        var $slider = $('.slider-pd-recommend .slider-pd');
        $slider.slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            dots: false,
            infinite: true,
            speed: 600,
            useTransform: true,
            cssEase: 'cubic-bezier(.76,.22,.36,.99)',
            nextArrow: $('.slider-pd-recommend .btn-next'),
            prevArrow: $('.slider-pd-recommend .btn-prev'),
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    }

    if($('.slider_list_article').length){
        var $slider = $('.slider_list_article');
        $slider.slick({
            slidesToShow: 3,
            slidesToScroll: 3,
            dots: false,
            infinite: true,
            speed: 600,
            useTransform: true,
            cssEase: 'cubic-bezier(.76,.22,.36,.99)',
            touchThreshold : 20,
            responsive: [
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1,
                        centerMode: true,
                        centerPadding: '20px',
                    }
                }
            ]
        });
    }
    
    var slider_pddetail = $('.sc_pddetail .pd_slider');
    var slider_pddetail_nav = $('.sc_pddetail .pd_slider_nav');
    if(slider_pddetail.length){
        slider_pddetail.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            asNavFor: slider_pddetail_nav
        });
        slider_pddetail_nav.slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            asNavFor: slider_pddetail,
            dots: false,
            centerMode: false,
            focusOnSelect: true,
            arrows: false,
            touchThreshold : 20
        });
    }


    if($('.parallax').length){
        $('.parallax').paroller();
    }


function filterPostRecipes(value){
        var loaithit=$('.category-filter .head .inner').attr("data-value");
        var loainau=$('.type-filter .head .inner').attr("data-value");
        if(typeof loaithit === 'undefined' || typeof loainau === 'undefined') {
            return false;
        }       
        if(loainau.length > 0) loainau = "/"+loainau;
        // var url = "./recipe-listing.html?loaithit=" + loaithit + "&loainau=" + loainau + "#filtertool";
        var url = "/goc-am-thuc/" + loaithit + loainau +"/" + "#filtertool";
        window.location = window.location.url = url;
    }

    var SelectBox = {
        selectBoxDisableAll : function(){
            $('.selectbox ul').removeClass('is-show');
            $('.selectbox').removeClass('active');
            $('.selectbox ul li.sub').find('ul').slideUp(140);
            $('.selectbox ul li.sub').removeClass('active');
        },
        selectBoxHeadClicked : function(){
            var head = $('.selectbox .head');
            head.click(function(e){
                e.stopPropagation();
                if($(this).parent().find('ul').hasClass('is-show')){
                    SelectBox.selectBoxDisableAll();
                }else{
                    SelectBox.selectBoxDisableAll();
                    $(this).closest('.selectbox').toggleClass('active');
                    $(this).closest('.selectbox').find('ul').toggleClass('is-show');
                }
            });
        },
        selectBoxItemClicked : function(){
            $('.selectbox ul li').click(function(e){
                e.stopPropagation();
                if(!$(this).closest('.selectbox').hasClass('no-select') && !$(this).hasClass('sub')){
                    var parent = $(this).closest('.selectbox');
                    var head = parent.find('.head');
                    var value = $(this).html();
                    $('span',head).html(value);
                    if(typeof value !== typeof undefined && value !== false){
                        var cat = $('.selectbox ul');
                        var value = $(this).attr('data-value');
                        var parent = $(this).closest('.selectbox');
                        var head = parent.find('.head');
                        $('.inner', head).html($(this).html());
                        $('.inner', head).attr('data-value', value);
                        filterPostRecipes(value);
                    }
                    if(parent.hasClass('filterCatMobile')){
                        var id = $(this).attr('data-catid');
                        $('.filterProductBox .pdlistMobile ul').removeClass('active');
                        $('.filterProductBox .pdlistMobile .pd'+id).addClass('active');
                    }
                    if(parent.hasClass('filterPd')){
                        var id = $(this).attr('data-catpd');
                        $('.filterProductBox .filterCat .catProduct').removeClass('active');
                        $('.filterProductBox .filterCat .catProduct'+id).addClass('active');
                        $('.filterProductBox .filterCat .catProduct'+id+' .cat').first().addClass('active');
                        $('.filterProductBox .filterCat .catProduct'+id+' .cat').first().find('li').first().addClass('active');
                        $('.filterProductBox .filterCatMobile .catProduct').removeClass('active');
                        $('.filterProductBox .filterCatMobile .catProduct'+id).addClass('active');
                        var pdfirst = $('.filterProductBox .filterCatMobile .catProduct.active ul li').first().text();
                        $('.filterProductBox .filterCatMobile .catProduct.active .head .inner span').html(pdfirst);
                    }   
                    SelectBox.selectBoxDisableAll();
                }else{
                    $(this).find('ul').slideToggle(140);
                    $(this).siblings('li').find('ul').slideUp(140);
                    $(this).toggleClass('active');
                    $(this).siblings('li').removeClass('active');
                }
            })
        },
        selectBoxItemClicked2 : function(){
            var cat = $('.province ul,.district ul');

            cat.on('click','li',function(e){
                 // e.stopPropagation();
                if(!$(this).closest('.selectbox').hasClass('no-select')){
                    var parent = $(this).closest('.selectbox');
                    var head = parent.find('.head');
                    var text = $(this).html();
                    $('span',head).html(text);
                    if(parent.hasClass('filterCatMobile')){
                        var id = $(this).attr('data-catid');
                        $('.filterProductBox .pdlistMobile ul').removeClass('active');
                        $('.filterProductBox .pdlistMobile .pd'+id).addClass('active');
                    }
                    if(parent.hasClass('filterPd')){
                        var id = $(this).attr('data-catpd');
                        $('.filterProductBox .filterCat .catProduct').removeClass('active');
                        $('.filterProductBox .filterCat .catProduct'+id).addClass('active');
                        $('.filterProductBox .filterCat .catProduct'+id+' .cat').first().addClass('active');
                        $('.filterProductBox .filterCat .catProduct'+id+' .cat').first().find('li').first().addClass('active');
                        $('.filterProductBox .filterCatMobile .catProduct').removeClass('active');
                        $('.filterProductBox .filterCatMobile .catProduct'+id).addClass('active');
                        var pdfirst = $('.filterProductBox .filterCatMobile .catProduct.active ul li').first().text();
                        $('.filterProductBox .filterCatMobile .catProduct.active .head .inner span').html(pdfirst);
                    }   
                }
                SelectBox.selectBoxDisableAll();
            })
           
        },
    }
    SelectBox.selectBoxItemClicked();
    SelectBox.selectBoxItemClicked2();
    SelectBox.selectBoxHeadClicked();


    // filterProduct Home
    var catProduct = $('.filterProductBox .filterCat .cat>li');
    var product = $('.filterProductBox .filterCat .cat li ul li');
    var productmobile = $('.pdlistMobile ul li');
    var FilterProduct = {
        hoverCatProduct : function(){
            catProduct.hover(
                function(){
                    if(!$(this).hasClass('active')){
                        catProduct.removeClass('active');
                        $(this).addClass('active');
                    }
                },
                function(){
                    if(catProduct.first().hasClass('active')){
                        catProduct.first().addClass('active');
                    }
                }
            )
        },
        clickProduct : function(){
            product.click(function(){
                product.removeClass('active');
                $(this).addClass('active');
                catProduct.removeClass('active');
                $(this).parent().parent().addClass('active');
            });
            productmobile.click(function(){
                productmobile.removeClass('active');
                $(this).addClass('active');
            });
        },
    }
    FilterProduct.hoverCatProduct();
    FilterProduct.clickProduct();

    App.general();
    App.fixedSocial();

    // pig 
    var itemPig = $('.myModalTracer .pig .st0');
    var position = $('.myModalTracer .position .list');
    var pig = $('.myModalTracer .pig');
    var itemComponentsPig = $('.myModalTracer .position .list li');
    $.fn.addSvgClass = function(className) {
        var attr
        this.each(function() {
            attr = $(this).attr('class')
            if(attr.indexOf(className) < 0) {
                $(this).attr('class', attr+' '+className+ ' ')
            }
        })
    };    
    $.fn.removeSvgClass = function(className) {
        var attr
        this.each(function() {
            attr = $(this).attr('class')
            attr = attr.replace(className , ' ')
            $(this).attr('class' , attr)
        })
    }; 

    itemPig.click(function(){
        var id = $(this).attr('data-id');
        itemPig.removeSvgClass('active');
        itemPig.removeSvgClass('clicked');
        pig.find('.p'+id).addSvgClass('active');
        pig.find('.p'+id).addSvgClass('clicked');
        position.find('li').removeClass('active');
        position.find('.'+id).addClass('active');
    });
    itemPig.hover(
        function(){
            var id = $(this).attr('data-id');
            itemPig.removeSvgClass('active');
            pig.find('.p'+id).addSvgClass('active');
            position.find('li').removeClass('active');
            position.find('.'+id).addClass('active');
        },
        function(){
            if(itemPig.hasClass('clicked')){
                itemPig.removeSvgClass('active');
                position.find('li').removeClass('active');
            }
        }
    )
    itemComponentsPig.click(function(){
        var id = $(this).attr('data-id');
        position.find('li').removeClass('active');
        $(this).addClass('active');
        itemPig.removeSvgClass('active');
        pig.find('.p'+id).addSvgClass('active');
    });

    $(document).click(function(){
        SelectBox.selectBoxDisableAll();
        $('.explainbox').slideUp(200);
    });

    $(window).scroll(function(){
        Header.changedScroll();
        App.fixedSocial();
    });

    $(window).resize(function(){
        setTimeout(function(){
            Menu.disableMenuMobile();
            // Menu.setHeightInnerMenuMobile();
            Header.disableTopMenu();
        },100);
    });
    $(window).load(function(){
       objectFitImages();
       var isMobile = /Android|iPhone|iPod|BlackBerry|Windows Phone/g.test(navigator.userAgent || navigator.vendor || window.opera);

        // if(isMobile){
        //    $('.jarallax-ab').jarallax('destroy');
        // }else{
        //    $('.jarallax-ab').jarallax({
        //        speed: 0.7,
        //    });
        // }
        if(isMobile){
           $('.jarallax').jarallax('destroy');
        }else{
            $('.jarallax').jarallax({
               speed: 0.7,
           });
        }
    });

    // $("html").easeScroll({
    //     frameRate: 120,
    //     animationTime: 800,
    //     stepSize: 120,
    // });

});


