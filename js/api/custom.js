$(function() {
    $('.slider-thumb').slick({
        autoplay: false,
        vertical: true,
        infinite: true,
        verticalSwiping: true,
        slidesPerRow: 6,
        slidesToShow: 6,
        asNavFor: '.slider-preview',
        focusOnSelect: true,
        prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-chevron-up"></i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="fas fa-chevron-down"></i></button>',
        responsive: [{
                breakpoint: 1141,
                settings: {
                    vertical: false,
                    slidesPerRow: 1,
                    slidesToShow: 1,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    vertical: false,
                    slidesPerRow: 1,
                    slidesToShow: 1,
                }
            },
            {
                breakpoint: 479,
                settings: {
                    vertical: false,
                    slidesPerRow: 1,
                    slidesToShow: 1,
                }
            },
        ]
    });
    $('.slider-preview').slick({
        autoplay: false,
        vertical: true,
        infinite: true,
        slidesPerRow: 1,
        slidesToShow: 1,
        asNavFor: '.slider-thumb',
        arrows: false,
        draggable: false,
        responsive: [{
            breakpoint: 1141,
            settings: {
                vertical: false,
                fade: true,
            }
        }, ]
    });
});