$(function() 

{
    var Accordion = function(el, multiple) {
        this.el = el || {};
        this.multiple = multiple || false;

        // Variables privadas
        var links = this.el.find('.link-mob');
        // Evento
        links.on('click', {el: this.el, multiple: this.multiple}, this.dropdown)
    }

/*    $('.nav-tabs > li > a').hover(function() {
  $(this).tab('show');
});*/

    Accordion.prototype.dropdown = function(e) {
        var $el = e.data.el;
            $this = $(this),
            $next = $this.next();

        $next.slideToggle();
        $this.parent().toggleClass('open');

        if (!e.data.multiple) {
            $el.find('.submenu-mob').not($next).slideUp().parent().removeClass('open');
        };
    }   

    var accordion = new Accordion($('#accordion-mob'), false);
});

  $(".solution-hd").click(function(){
    $(".solution-sub-menu").toggle();
    $(".solution-hd i").toggleClass('fa-chevron-right');
    $(".solution-hd i").toggleClass('fa-chevron-down');
  });

    $(".solution-hd-2").click(function(){
    $(".solution-sub-menu-2").toggle();
    $(".solution-hd-2 i").toggleClass('fa-chevron-right');
    $(".solution-hd-2 i").toggleClass('fa-chevron-down');
  });


    /* pricing page load more button */

$(document).ready(function () {
    $("#collapseExample-show").hide();

     $(".load-hide-btn").click(function(){
          $(this).text(function(i, v){
          return v === "LOAD MORE" ? "LOAD LESS" : "LOAD MORE";
      })   
     $("#collapseExample-show").toggle();
   //  $(".load-hide-btn").text("Load less");
     });


  /*  $(".load-hide-btn").on("click", function () {
        var txt = $("#collapseExample-show").is(':visible') ? 'Load More' : 'Load Less';
        $(".load-hide-btn").text(txt);
        $(this).next('#collapseExample-show').slideToggle(200);
    }); */
});

    /* pricing page load more button closed */


        var myDiv = $('.ptag-chr');
myDiv.text(myDiv.text().substring(0,200) + '...')

        var myDiv1 = $('.ptag-chr1');
myDiv1.text(myDiv1.text().substring(0,200) + '...')

        var myDiv2 = $('.ptag-chr2');
myDiv2.text(myDiv2.text().substring(0,200) + '...')

        var myDiv3 = $('.ptag-chr3');
myDiv3.text(myDiv3.text().substring(0,200) + '...')

        var myDiv4 = $('.ptag-chr4');
myDiv4.text(myDiv4.text().substring(0,200) + '...')

        var myDiv5 = $('.ptag-chr5');
myDiv5.text(myDiv5.text().substring(0,200) + '...')

        var myDiv6 = $('.ptag-chr6');
myDiv6.text(myDiv6.text().substring(0,200) + '...')

        var myDiv7 = $('.ptag-chr7');
myDiv7.text(myDiv7.text().substring(0,200) + '...')

        var myDiv8 = $('.ptag-chr8');
myDiv8.text(myDiv8.text().substring(0,200) + '...')

var myDiv9 = $('.ptag-chr9');
myDiv9.text(myDiv2.text().substring(0,200) + '...')

        var myDiv10 = $('.ptag-chr10');
myDiv10.text(myDiv10.text().substring(0,200) + '...')

        var myDiv11 = $('.ptag-chr11');
myDiv11.text(myDiv11.text().substring(0,200) + '...')

        var myDiv12 = $('.ptag-chr12');
myDiv12.text(myDiv12.text().substring(0,200) + '...')

        var myDiv13 = $('.ptag-chr13');
myDiv13.text(myDiv13.text().substring(0,200) + '...')

        var myDiv14 = $('.ptag-chr14');
myDiv14.text(myDiv14.text().substring(0,200) + '...')

        var myDiv15 = $('.ptag-chr15');
myDiv15.text(myDiv15.text().substring(0,200) + '...')

        var myDiv16 = $('.ptag-chr16');
myDiv16.text(myDiv16.text().substring(0,200) + '...')

        var myDiv17 = $('.ptag-chr17');
myDiv17.text(myDiv17.text().substring(0,200) + '...')

        var myDiv18 = $('.ptag-chr18');
myDiv18.text(myDiv18.text().substring(0,125) + '...')

var myDiv19 = $('.ptag-chr19');
myDiv19.text(myDiv2.text().substring(0,125) + '...')

        var myDiv20 = $('.ptag-chr20');
myDiv20.text(myDiv20.text().substring(0,125) + '...')

        var myDiv21 = $('.ptag-chr21');
myDiv21.text(myDiv21.text().substring(0,125) + '...')

        var myDiv22 = $('.ptag-chr22');
myDiv22.text(myDiv22.text().substring(0,125) + '...')

        var myDiv23 = $('.ptag-chr23');
myDiv23.text(myDiv23.text().substring(0,125) + '...')

        var myDiv24 = $('.ptag-chr24');
myDiv24.text(myDiv24.text().substring(0,125) + '...')

        var myDiv25 = $('.ptag-chr25');
myDiv25.text(myDiv25.text().substring(0,125) + '...')

        var myDiv26 = $('.ptag-chr26');
myDiv26.text(myDiv26.text().substring(0,125) + '...')

        var myDiv27 = $('.ptag-chr27');
myDiv27.text(myDiv27.text().substring(0,125) + '...')

        var myDiv28 = $('.ptag-chr28');
myDiv28.text(myDiv28.text().substring(0,125) + '...')

var myDiv29 = $('.ptag-chr29');
myDiv29.text(myDiv29.text().substring(0,125) + '...')

        var myDiv30 = $('.ptag-chr30');
myDiv30.text(myDiv30.text().substring(0,125) + '...')

        var myDiv31 = $('.ptag-chr31');
myDiv31.text(myDiv31.text().substring(0,125) + '...')

        var myDiv32 = $('.ptag-chr32');
myDiv32.text(myDiv32.text().substring(0,125) + '...')

        var myDiv33 = $('.ptag-chr33');
myDiv33.text(myDiv33.text().substring(0,125) + '...')

      
/* var mySwiper = new Swiper('.swiper-container', {
    loop: true,
    speed: 1000,
    autoplay: {
        delay: 3000,
    },
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    coverflowEffect: {
        rotate: 0,
        stretch: 80,
        depth: 200,
        modifier: 1,
        slideShadows: false,
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

})


var swiper = new Swiper('.swiper-container-mob', {
  scrollbar: '.swiper-scrollbar',
  effect: 'coverflow',
  direction: 'vertical',
  loop: true,
  speed: 1000,
    autoplay: {
        delay: 3000,
    },
  slideToClickedSlide: true,
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 'auto',
  coverflowEffect: {
    rotate: 0,
    stretch: 270,
    depth: 100,
    modifier: 1,
    slideShadows: false
  },
  freeMode:false,
  freeModeSticky:true
});*/