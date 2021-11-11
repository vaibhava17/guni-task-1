//main navigation
(function ($) {

if(jQuery(window).width() < 1025)
{
    jQuery( "<span class='clickD'></span>" ).insertAfter(".navbar-nav > li.menu-item-has-children > a");
}
 $('.navbar-nav li .clickD').click(function(e) {
    e.preventDefault();
    var $this = $(this);
  
    if ($this.next().hasClass('show')) {
        $this.next().removeClass('show');
        $this.removeClass('toggled');
        $this.next().hide();
    } else {
        $this.parent().parent().find('.sub-menu').removeClass('show');
        $this.parent().parent().find('.toggled').removeClass('toggled');
        $this.parent().parent().find('.sub-menu').hide();
        $this.next().toggleClass('show');
        $this.toggleClass('toggled');
        $this.next().show();
    }
});

 $('html').click(function(){
    $('.navbar-nav li .clickD').removeClass('toggled');
});
  $(document).click(function(){
     $('.navbar-nav li .clickD').removeClass('toggled');
});
  $('.navbar-nav').click(function(e){
  e.stopPropagation();
});


$('.customenrs_area_slider').slick({
  dots: false,
  infinite: true,
  speed: 900,
  autoplay: true,
  autoplaySpeed: 2000,
  slidesToShow: 1,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: false
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
});




$('.bnnr_slider').slick({
  dots: true,
  infinite: true,
  speed: 1800,
  arrows:false,
  autoplay: true,
  autoplaySpeed: 2200,
  slidesToShow: 1,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
});



$(document).ready(function() {
$(".down").click(function() {
     $('html, body').animate({
         scrollTop: $(".get_started_section").offset().top
     }, 900);
 });
});


  
$(document).ready(function() {
  $(".set > a").on("click", function() {
    if ($(this).hasClass("active")) {
      $(this).removeClass("active");
      $(this)
        .siblings(".content")
        .slideUp(200);
      $(".set > a i")
        .removeClass("fa-minus")
        .addClass("fa-plus");
    } else {
      $(".set > a i")
        .removeClass("fa-minus")
        .addClass("fa-plus");
      $(this)
        .find("i")
        .removeClass("fa-plus")
        .addClass("fa-minus");
      $(".set > a").removeClass("active");
      $(this).addClass("active");
      $(".content").slideUp(200);
      $(this)
        .siblings(".content")
        .slideDown(200);
    }
  });
});


$(document).ready(function() {
	$( "#spend_value" ).change(function() {
	  if($(this).val()==='20'){
		var persmsvalue = 5;
		var smscount = ($(this).val()*100)/persmsvalue;
		$(".per_sms_value span").text(persmsvalue);
		$(".credit_value").text(smscount); 
	  }else if($(this).val()==='40'){
		var persmsvalue = 4;
		var smscount = ($(this).val()*100)/persmsvalue;
		$(".per_sms_value span").text(persmsvalue);
		$(".credit_value").text(smscount);
	  }else if($(this).val()==='60'){
		var persmsvalue = 3;
		var smscount = ($(this).val()*100)/persmsvalue;
		$(".per_sms_value span").text(persmsvalue);
		$(".credit_value").text(smscount);
	  }else if($(this).val()==='80'){
		var persmsvalue = 2;
		var smscount = ($(this).val()*100)/persmsvalue;
		$(".per_sms_value span").text(persmsvalue);
		$(".credit_value").text(smscount);
	  }else{
		var persmsvalue = 1; 
		var smscount = ($(this).val()*100)/persmsvalue;	
		$(".per_sms_value span").text(persmsvalue);
		$(".credit_value").text(smscount);		
	  }
	});
});







}(jQuery));








