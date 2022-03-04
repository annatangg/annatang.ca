
$(document).ready(function() {
	
	"use strict";
	
	PageLoad();
	FirstLoad();
	HeroSection();
	PageShare();
	Sliders();
	AjaxLoad();
	FitThumbScreen();
	Portfolio();
	BackToTop();
	//VirtualScr();
	JustifiedGrid();
	Lightbox();
	AppearIteam();
	ContactMap();
	ContactForm();
	
});



/*--------------------------------------------------
Function Page Load
---------------------------------------------------*/

	function PageLoad() {	
		
		$('body').removeClass('hidden');		
		
		var width = 100,
			perfData = window.performance.timing, 
			EstimatedTime = -(perfData.loadEventEnd - perfData.navigationStart),
			time = ((EstimatedTime/1000)%50) * 100
		
		
		// Percentage Increment Animation
		var PercentageID = $("#precent"),
				start = 0,
				end = 100,
				durataion = time;
				animateValue(PercentageID, start, end, durataion);
				
		function animateValue(id, start, end, duration) {
		  
			var range = end - start,
			  current = start,
			  increment = end > start? 1 : -1,
			  stepTime = Math.abs(Math.floor(duration / range)),
			  obj = $(id);
			
			var timer = setInterval(function() {
				current += increment;
				$(obj).text(current);
			  //obj.innerHTML = current;
				if (current == end) {
					clearInterval(timer);
				}
			}, stepTime);
		}
		
		// Fading Out Loadbar on Finised
		setTimeout(function(){
			
			
			TweenMax.to($(".preloader-wrap"), 0.5, {force3D:true, opacity:0, ease:Power1.easeIn});
			TweenMax.set($(".preloader-wrap"), {visibility:'hidden', yPercent: -101, delay:0.6});
			
			setTimeout(function(){
				
				TweenMax.to($("#main"), 0.2, {force3D:true, opacity:1, delay:0.1, ease:Power2.easeOut});		
				TweenMax.to($("#page-action-holder-left"), 0.3, {opacity:1, ease:Power2.easeOut});
				if( $('#hero').hasClass("has-image")) {	
					TweenMax.to($("#hero-bg-image"), 0.7, {force3D:true, scale:1.05 , opacity:1, delay:0.6, ease:Power2.easeOut});
					TweenMax.to($(".hero-title"), 0.4, {force3D:true, y: 0, opacity:1, delay:0.7, ease:Power2.easeOut});
					TweenMax.to($(".hero-subtitle"), 0.4, {force3D:true, y: 0, opacity:1, delay:0.75, ease:Power2.easeOut});
				} else {
					TweenMax.to($(".hero-title"), 0.4, {force3D:true, y: 0, opacity:1, delay:0.7, ease:Power2.easeOut});
					TweenMax.to($(".hero-subtitle"), 0.4, {force3D:true, y: 0, opacity:1, delay:0.75, ease:Power2.easeOut});
				}
				if ($('#hero-bg-image').hasClass("light-content")) {
					$('#hero-caption').addClass('light-content');
					setTimeout(function(){
						$('#magic-cursor').addClass('light-content');
					} , 700 );
					$('header').addClass('transparent');
					setTimeout(function(){
						$('#header-container, #menu-overlay, #page-bottom').addClass('light-content');
					} , 600 );
				}
				
				var tlThumbs = new TimelineLite();
				$("#portfolio .item-wrap").each(function(index, element) {
					tlThumbs.to(element, 0.5, {y:0, opacity:1, delay:0.1, ease:Power2.easeOut}, index * 0.1)
				});
				
					
				setTimeout( function(){	
					$('body').removeClass("load-project-page")
				} , 850 );
				
				setTimeout( function(){	
					$('body').removeClass("show-loader")
				} , 800 );
				
				TweenMax.set($(".vc_row"), {y: 80, opacity:0, delay:0});		
				var tlRow = new TimelineLite();
				$(".vc_row").each(function(index, element) {
					tlRow.to(element, 0.5, {force3D:true, opacity:1, y:0, delay:0.8, ease:Power3.easeOut}, index * 0.1)
				});	
			
			} , 500 );
				  
		}, time);
		
		
		
	}// End Page Load
		


/*--------------------------------------------------
Function First Load
---------------------------------------------------*/	

	function FirstLoad() {		
	
		$("html,body").animate({scrollTop: 0}, 1);
		
		$('.item').each(function() {
			var image = $(this).find('.item-image').data('src');	
			$(this).find('.item-image').css({'background-image': 'url(' + image + ')'});
		});
		
		$('.page').each(function() {
			var image = $(this).data('src');	
			$(this).css({'background-image': 'url(' + image + ')'});
		});
		
		$('.title-reveal .item-caption').each(function() {
			var textcolor = $(this).data('textcolor');	
			$(this).find(".item-title, .item-title-hover").css('color', function () {
				return textcolor
			});	
		});
		
		
		//Load Default Page
		$('a.ajax-link').on('click', function() {
			$("body").addClass("show-loader");			
			TweenMax.to($("#page-action-holder-left"), 0.2, {opacity:0, delay:0, ease:Power2.easeInOut});
			$(".scrolltotop").removeClass('page-up');
			setTimeout( function(){	
				TweenMax.to($("#main"), 0.3, {opacity:0, ease:Power0.ease});				
			} , 10 );
			
			var tlThumbs = new TimelineLite();
			$("#portfolio .item-wrap").each(function(index, element) {
				tlThumbs.to(element, 0.3, {y:-200, opacity:0, ease:Power1.easeIn}, index * 0.05)
			});
			$('.page-container').remove();
		});
		
		
		//Load Project Page
		$('a.ajax-link-project').on('click', function() {
			$("body").addClass("show-loader");
			TweenMax.to($("#page-action-holder-left"), 0.2, {opacity:0, delay:0, ease:Power2.easeInOut});
			$(".scrolltotop").removeClass('page-up');
			setTimeout( function(){
				$("body").addClass("load-project-page");
			} , 100 );	
			TweenMax.to($("#footer-container"), 0.2, {opacity:0, ease:Power0.easeNone});
			setTimeout( function(){
				$(".big-title-caption").remove();
				$(".title-caption-tooltip").remove();
			} , 200 );
			setTimeout( function(){
				$('.page-container').remove();
			} , 850 );							
		});	
		
		
		//Load Next Project Page
		$('a.next-ajax-link-project').on('click', function() {
			$("body").addClass("show-loader");
			$(".scrolltotop").removeClass('page-up');
			$("#project-nav").addClass("active");
			TweenMax.to($("footer"), 0.3, {opacity:0, delay:0.2, ease:Power2.easeInOut});
			TweenMax.to($("#project-nav"), 0.6, {y:-100, ease:Power2.easeInOut});
			TweenMax.to($(".next-project-title"), 0.3, {opacity:0, delay:0.1, ease:Power2.easeInOut});
			$(".big-title-caption").remove();
			$(".title-caption-tooltip").remove();
			$('.page-container').remove();
			setTimeout( function(){	
				TweenMax.to($("#main"), 0.3, {opacity:0, ease:Power0.ease});				
			} , 30 );								
		});
		
		
		//Load Page From Menu
		$('.ajax-link-menu').on('click', function() {							
			$("body").addClass("show-loader");
			TweenMax.set($("nav ul li a"), {opacity:0.3});
			
			
			var tl = new TimelineLite();
			$(".menu-timeline").each(function(index, element) {
				tl.to(element, 0.25, {y:-80, opacity:0, ease:Power1.easeIn }, index * 0.05)
			});
			$('#menu-burger').removeClass("open");
			$(".big-title-caption").remove();
			$(".title-caption-tooltip").remove();
			$('.page-container').remove();
		});
		
		
		//Overlay Menu
		$('#burger-wrapper, #close-menu').on('click', function() {			
			$('header').toggleClass('open');			
			$('#menu-burger').toggleClass('open');
			$('#menu-overlay').toggleClass('active');
			setTimeout( function(){			
				if ($('#menu-burger').hasClass("open")) {	
					
					//Fade Out Content					
					var tlThumbs = new TimelineLite();
					$("#portfolio .in-view .item-wrap").each(function(index, element) {
						tlThumbs.to(element, 0.2, {y:-150, opacity:0, ease:Power1.easeIn}, index * 0.05)
					});					
					TweenMax.set($("#portfolio .item-wrap"), {y: -200, opacity:0, delay:0.4});
					
					TweenMax.to($(".hero-title"), 0.3, {force3D:true, y: -100, opacity:0, delay:0.1, ease:Power2.easeIn});
					TweenMax.to($(".hero-subtitle"), 0.3, {force3D:true, y: -100, opacity:0, delay:0.15, ease:Power2.easeIn});					
					TweenMax.set($(".hero-title, .hero-subtitle"), {y: 100, opacity:0, delay:0.5});	
					TweenMax.to($("#hero-bg-wrapper"), 0.3, {force3D:true, opacity:0, delay:0.15, ease:Power2.easeIn});
					
					TweenMax.to($("footer, #page-bottom, #project-nav, .vc_row"), 0.3, {force3D:true, y: -50, opacity:0, delay:0.1, ease:Power2.easeIn});
					TweenMax.set($("footer, #page-bottom, #project-nav, .vc_row"), {y: 50, opacity:0, delay:0.4});		
					//Fade In Navigation Lists
					var tlMenu = new TimelineLite();
					tlMenu.set($(".menu-timeline"), {y: 100, opacity:0});
					$(".menu-timeline").each(function(index, element) {
						tlMenu.to(element, 0.5, {y:0, opacity:1, delay:0.5, ease:Power3.easeOut}, index * 0.1)
					});
						
				} else {					
					
					//Fade Out Navigation Lists					
					var tlMenu = new TimelineLite();
					$(".menu-timeline").each(function(index, element) {
						tlMenu.to(element, 0.25, {y:-100, opacity:0, ease:Power1.easeOut }, index * 0.05)
					});	
					
					TweenMax.to($(".hero-title"), 0.3, {force3D:true, y: 0, opacity:1, delay:0.5, ease:Power2.easeOut});
					TweenMax.to($(".hero-subtitle"), 0.3, {force3D:true, y: 0, opacity:1, delay:0.55, ease:Power2.easeOut});
					TweenMax.to($("#hero-bg-wrapper"), 0.6, {force3D:true, opacity:1, delay:0.35, ease:Power2.easeOut});
					//Fade In Content					
					var tlThumbs = new TimelineLite();
					tlThumbs.set($("#portfolio .item-wrap"), {y: 200, opacity:0});
					$("#portfolio .in-view .item-wrap").each(function(index, element) {
						tlThumbs.to(element, 0.5, {y:0, opacity:1, delay:0.5, ease:Power3.easeOut}, index * 0.05)
					});	
					TweenMax.to($("#portfolio .item-wrap"), 0.3, {force3D:true, y: 0, opacity:1, delay:0.8, ease:Power3.easeOut});			
					
					TweenMax.to($("footer, #page-bottom, #project-nav, .vc_row"), 0.3, {force3D:true, y: 0, opacity:1, delay:0.75, ease:Power2.easeOut});
					
					setTimeout( function(){
						$('nav li.has-sub').removeClass('open');
						$('nav li.has-sub').find('ul').slideUp();
					} , 500 );
				}							
			} , 20 );
		});
		
		
		
		//Overlay Menu
		$('.open-filters, #close-sidebar').on('click', function() {			
			$('#sidebar-overlay').toggleClass('active');
			setTimeout( function(){			
				if ($('#sidebar-overlay').hasClass("active")) {	
					
					TweenMax.to($(".item-content"), 0.6, {force3D:true, scale: 0.8, opacity:0.2, delay:0, ease:Power2.easeInOut});
					TweenMax.to($("#main.project"), 0.6, {force3D:true, scale: 0.95, opacity:0.2, delay:0, ease:Power2.easeInOut});
					
					//Fade In Navigation Lists
					var tlMenu = new TimelineLite();
					tlMenu.set($(".sidebar-timeline, .jssocials-share"), {y: 60, opacity:0});
					$(".sidebar-timeline, .jssocials-share").each(function(index, element) {
						tlMenu.to(element, 0.5, {y:0, opacity:1, delay:0.3, ease:Power3.easeOut}, index * 0.1)
					});
						
				} else {					
					
					TweenMax.to($(".item-content"), 0.6, {force3D:true, scale: 1, opacity:1, delay:0.1, ease:Power2.easeInOut});
					TweenMax.to($("#main.project"), 0.6, {force3D:true, scale: 1, opacity:1, delay:0.1, ease:Power2.easeInOut});
					
					//Fade Out Navigation Lists					
					var tlMenu = new TimelineLite();
					$(".sidebar-timeline, .jssocials-share").each(function(index, element) {
						tlMenu.to(element, 0.25, {y:-60, opacity:0, ease:Power1.easeOut }, index * 0.05)
					});	
				}							
			} , 20 );
		});
		
		
		
		//Drop Down Navigation
		$('nav li.has-sub > a').on('click', function(){
			$(this).removeAttr('href');
			var element = $(this).parent('li');
			if (element.hasClass('open')) {
				element.removeClass('open');
				element.find('li').removeClass('open');
				element.find('ul').slideUp();
			}
			else {
				element.addClass('open');
				element.children('ul').slideDown();
				element.siblings('li').children('ul').slideUp();
				element.siblings('li').removeClass('open');
				element.siblings('li').find('li').removeClass('open');
				element.siblings('li').find('ul').slideUp();
			}
		});	
		
		
	}// End First Load
	
	
/*--------------------------------------------------
Function Lazy Load
---------------------------------------------------*/

	function LazyLoad() {	
	
		$('body').removeClass('hidden');
		
		TweenMax.to($("#main"), 0.2, {force3D:true, opacity:1, delay:0.1, ease:Power2.easeOut});		
		TweenMax.to($("#page-action-holder-left"), 0.3, {opacity:1, ease:Power2.easeOut});
		if( $('#hero').hasClass("has-image")) {	
			TweenMax.to($("#hero-bg-image"), 0.7, {force3D:true, scale:1.05 , opacity:1, delay:0.6, ease:Power2.easeOut});
			TweenMax.to($(".hero-title"), 0.4, {force3D:true, y: 0, opacity:1, delay:0.7, ease:Power2.easeOut});
			TweenMax.to($(".hero-subtitle"), 0.4, {force3D:true, y: 0, opacity:1, delay:0.75, ease:Power2.easeOut});
		} else {
			TweenMax.to($(".hero-title"), 0.4, {force3D:true, y: 0, opacity:1, delay:0.7, ease:Power2.easeOut});
			TweenMax.to($(".hero-subtitle"), 0.4, {force3D:true, y: 0, opacity:1, delay:0.75, ease:Power2.easeOut});
		}
		if ($('#hero-bg-image').hasClass("light-content")) {
			$('#hero-caption').addClass('light-content');
			setTimeout(function(){
				$('#magic-cursor').addClass('light-content');
			} , 700 );
			$('header').addClass('transparent');
			setTimeout(function(){
				$('#header-container, #menu-overlay, #page-bottom').addClass('light-content');
			} , 600 );
		}
		
		var tlThumbs = new TimelineLite();
		$("#portfolio .item-wrap").each(function(index, element) {
			tlThumbs.to(element, 0.5, {y:0, opacity:1, delay:0.1, ease:Power2.easeOut}, index * 0.1)
		});
		
			
		setTimeout( function(){	
			$('body').removeClass("load-project-page")
		} , 850 );
		
		setTimeout( function(){	
			$('body').removeClass("show-loader")
		} , 800 );
		
		TweenMax.set($(".vc_row"), {y: 80, opacity:0, delay:0});		
		var tlRow = new TimelineLite();
		$(".vc_row").each(function(index, element) {
			tlRow.to(element, 0.5, {force3D:true, opacity:1, y:0, delay:0.8, ease:Power3.easeOut}, index * 0.1)
		});		
		
	
	}// End Lazy Load		



/*--------------------------------------------------
Function Hero Section
---------------------------------------------------*/
	
	function HeroSection() {
		
		if( $('#hero').length > 0 ){
						
			if( $('#hero').hasClass("has-image")) {	
			
				// Hero Caption Options			
				var HeroCaption = document.querySelector('#hero-caption');
				var HeroImage = document.querySelector('#hero-image-parallax');
				var windowScrolled;
				function HeroParallaxScroll() {	
					windowScrolled = window.pageYOffset || document.documentElement.scrollTop;				
					if ($('#hero-styles').hasClass("parallax-onscroll")) {		
						TweenMax.to(HeroCaption, 0.1, {y: windowScrolled / 4});	
						TweenMax.to(HeroImage, 0.1, {y: windowScrolled / 5});						
					}
					if ($('#hero-styles').hasClass("opacity-onscroll")) {
						HeroCaption.style.opacity =  (1 - (windowScrolled/15) / 40);
					}				
				}
				
				$(window).on('scroll', HeroParallaxScroll);
					
				$('a.ajax-link, a.ajax-link-menu').on('click', function() {
					$(window).off('scroll', HeroParallaxScroll);
				});
			
			}
			
			
			// Hero Image Parallax
			if( $('#hero').hasClass("has-image")) {				
				var timeout;
				$(window).resize(changePersective);				
				changePersective();				
				function changePersective(){
					TweenMax.set('#hero-bg-wrapper', {perspective: $('body').width()});
				}
				$('#hero').mousemove(function(e){
					if(timeout) clearTimeout(timeout);
					setTimeout(callParallaxHero.bind(null, e));			
				});				
				function callParallaxHero(e){
					parallaxItHero(e, '#hero-bg-image', 0); //5
					moveItHero(e, '#hero-bg-image', - 30); //80
				}				
				function parallaxItHero(e, target, movement){
					var $this = $('#hero-bg-wrapper');
					var relX = e.pageX - $this.offset().left;
					var relY = e.pageY - $this.offset().top;					
					TweenMax.to(target, 1, {
						rotationY: (relX - $this.width()/1.5) / $this.width() * movement,
						rotationX: (relY - $this.height()/2) / $this.height() * movement,
					})
				}				
				function moveItHero(e, target, movement){
					var $this = $('#hero-bg-wrapper');
					var relX = e.pageX - $this.offset().left;
					var relY = e.pageY - $this.offset().top;					
					TweenMax.to(target, 1, {
						x: (relX - $this.width()/2) / $this.width() * movement,
						y: (relY - $this.height()/2) / $this.height() * movement,
					})
				}
				function HeroChangeHeaderColor() {	
				
					var scroll = $(window).scrollTop();
					
					if ($('#hero-bg-image').hasClass("light-content")) {
						
						if (scroll >= $("#hero").height() - 80) {					
							$('#magic-cursor, #header-container').removeClass('light-content');
						} else { 
							$('#magic-cursor, #header-container').addClass('light-content');
						}
					
						if (scroll >= 80) {					
							$('#page-bottom').removeClass('light-content');
						} else { 
							$('#page-bottom').addClass('light-content');
						}
					
					}
						
				}
				
				$(window).on('scroll', HeroChangeHeaderColor);
				
				$('a.ajax-link, a.ajax-link-menu').on('click', function() {
					$(window).off('scroll', HeroChangeHeaderColor);
				});
			}
			
		
		}
		
	}//End Hero Section
	
	

/*--------------------------------------------------
Function Fit Thumb Screen 
---------------------------------------------------*/

	function FitThumbScreen() {			
			
		$("body").find(".page-container").each(function() {
			$("#clone-image").append($(this))
		});
			
		console.clear();

		var root  = document.documentElement;
		var body  = document.body;
		var pages = document.querySelectorAll(".page");
		var tiles = document.querySelectorAll(".item-image");
		
		for (var i = 0; i < tiles.length; i++) {  
		  addListeners(tiles[i], pages[i]);
		}
		
		function addListeners(tile, page) {
		  
		  tile.addEventListener("click", function() {
			$(this).parent().parent().addClass('above');
			TweenMax.set('.item.above',{opacity: 1});			
			setTimeout( function(){
				TweenMax.to('.item', 0.3,{opacity: 0, delay: 0.2, ease:Power2.easeInOut});
				TweenMax.to('.item .item-caption', 0.2,{opacity: 0, ease:Power2.easeIn});
				TweenMax.to('.item .item-cat', 0.2,{opacity: 0, ease:Power2.easeIn});
			} , 0 ); 
			
			setTimeout( function(){				
				animateHero(tile, page);
			} , 50 ); 
		  });
		  
		  page.addEventListener("click", function() {
			$('.item').removeClass('above');
				TweenMax.to('.item', 0.3,{opacity: 1, delay:0.3, ease:Power2.easeOut});
				TweenMax.to('.item .item-caption', 0.2,{opacity: 1, delay:0.6, ease:Power2.easeOut});
				TweenMax.to('.item .item-cat', 0.2,{opacity: 1, delay:0.4, ease:Power2.easeOut});
			animateHero(page, tile);
		  });  
		}
		
		function animateHero(fromHero, toHero) {
			
		  var clone = fromHero.cloneNode(true);
			  
		  var from = calculatePosition(fromHero);
		  var to = calculatePosition(toHero);
		  
		  TweenLite.set([fromHero, toHero], { visibility: "hidden" });
		  TweenLite.set(clone, { position: "absolute", margin: 0 });
		  
		  body.appendChild(clone);  
			  
		  var style = {
			x: to.left - from.left,
			y: to.top - from.top,
			width: to.width,
			height: to.height,
			autoRound: false,
			ease: Power2.easeInOut,
			onComplete: onComplete
		  };
		   
		  TweenLite.set(clone, from);  
		  TweenLite.to(clone, 0.6, style)
			
		  function onComplete() {
			
			TweenLite.set(toHero, { visibility: "visible" });
			body.removeChild(clone);
		  }
		}
		
		function calculatePosition(element) {
			
		  var rect = element.getBoundingClientRect();
		  
		  var scrollTop  = window.pageYOffset || root.scrollTop  || body.scrollTop  || 0;
		  var scrollLeft = window.pageXOffset || root.scrollLeft || body.scrollLeft || 0;
		  
		  var clientTop  = root.clientTop  || body.clientTop  || 0;
		  var clientLeft = root.clientLeft || body.clientLeft || 0;
			
		  return {
			top: Math.round(rect.top + scrollTop - clientTop),
			left: Math.round(rect.left + scrollLeft - clientLeft),
			height: rect.height,
			width: rect.width,
		  };
		}
		
	}// End First Load



/*--------------------------------------------------
Function Portfolio
---------------------------------------------------*/
	
	function Portfolio() {
		
		var $container = $('#portfolio');
		
		$container.packery({
			itemSelector: '.item',
			gutter:0,
			transitionDuration: "0.5s"
		});
		
		$('#filters a').on('click', function() {
			$('#filters a').removeClass('active');
			$(this).addClass('active');
			$('.item').addClass('item-margins');
			var selector = $(this).attr('data-filter');
			$container.isotope({ filter: selector }, function( $changedItems, instance ) {
			  instance.$allAtoms.filter('.isotope-hidden').removeClass('is-filtered');
			  instance.$filteredAtoms.addClass('is-filtered');
			});		
			return false;
		});
		
		$('#filters #all').on('click', function() {
			$('.item').removeClass('item-margins');
		});
		
		function parallax_item() {				
			$('.item.wide').each(function(){					
				var difference = $(window).scrollTop() - $(this).offset().top;
				var half = (difference / 10) + 'px',
				transform = 'translate3d( 0, ' + half + ',0)';				
				$(this).css('transform', transform);			
			});				
		}
		
		$("#all").trigger('click');
					
		parallax_item();
	
		$(window).on('scroll load ', parallax_item);
		
		$('a.ajax-link, a.ajax-link-menu, a.ajax-link-project').on('click', function() {
			$(window).off('scroll', parallax_item);
		});
		
		
		var $animation_elements = $('.item');
		var $window = $(window);
		
		function check_if_in_view() {
			var window_height = $window.height();
			var window_top_position = $window.scrollTop();
			var window_bottom_position = (window_top_position + window_height);
		
			$.each($animation_elements, function() {
				var $element = $(this);
				var element_height = $element.outerHeight();
				var element_top_position = $element.offset().top + 50;
				var element_bottom_position = (element_top_position + element_height);
				
				//check to see if this current container is within viewport
				if ((element_bottom_position >= window_top_position) &&	(element_top_position <= window_bottom_position)) {
					$element.addClass('in-view');						
				} else if (element_bottom_position >= window_top_position)   {
					$element.removeClass('in-view');
				} else if (element_top_position <= window_bottom_position)  {
					$element.removeClass('in-view');
				}
			});
		}		
		$window.on('scroll resize', check_if_in_view);	
		
		
		var $window = $(window),
			$portfolio = $('#portfolio');
	
		function resize() {
			if ($window.width() < 1025) {
				return $portfolio.addClass('mobile');
			}
	
			$portfolio.removeClass('mobile');
		}		
		
		//Title Reveal Hover Effect
		if( $('.title-reveal').length > 0 ){
			
			$('.item-title').each(function(){
				var words = $(this).text().split(" ");
				var total = words.length;
				$(this).empty();
				for (index = 0; index < total; index ++){
					$(this).append($("<div /> ").text(words[index]));
				}
			})
			
			$('.item-title-hover').each(function(){
				var words = $(this).text().split(" ");
				var total = words.length;
				$(this).empty();
				for (index = 0; index < total; index ++){
					$(this).append($("<div /> ").text(words[index]));
				}
			})
			
			setTimeout( function(){
		
			$('.item-title div').each(function(){
				var words = $(this).text().slice(" ");
				var total = words.length;
				$(this).empty();
				for (index = 0; index < total; index ++){
					$(this).append($("<span /> ").text(words[index]));
				}
			})
			
			$('.item-title-hover div').each(function(){
				var words = $(this).text().slice(" ");
				var total = words.length;
				$(this).empty();
				for (index = 0; index < total; index ++){
					$(this).append($("<span /> ").text(words[index]));
				}
			})
			} , 100 );
				
			$("#portfolio").find(".item-content").each(function() {					
				$($(this)).find(".item-caption .item-cat").appendTo($(this))
			});
			
		
			var over = null,
				 out = null;
			
			$(".title-reveal .item-content").hover(mouseOver, mouseOut);
			
			function mouseOver() {
			  
				var delay = 0;
				if (out && out.isActive()) {
					out.timeScale(3);
					delay = 0.1;
				}
			
				over = new TimelineLite({ delay: delay });
			
				$(this).find('.item-title span').each(function(index, element) {
				over.to(element, 0.2, {scale:1, x:30, opacity:0, ease:Power2.easeIn}, index * 0.01)
				});
				
				over.set($(this).find('.item-title span'), {delay:0.2, x: -30, opacity:0});
				
				$(this).find('.item-title-hover span').each(function(index, element) {
					over.to(element, 0.2, {scale:1, x:0, opacity:1, scale:1, delay:0.15, ease:Power2.easeOut}, index * 0.01)
				});
				
			}
			
			function mouseOut() {
				
				var delay = 0;
				if (over && over.isActive()) {
					over.timeScale(3);
					delay = 0.1;
				}
				
				out = new TimelineLite({ delay: delay });
				
				$(this).find('.item-title span').each(function(index, element) {
					out.to(element, 0.2, {scale:1, x:0, opacity:1, scale:1, delay:0.15, ease:Power2.easeOut}, index * 0.01)
				});
				
				$(this).find('.item-title-hover span').each(function(index, element) {
					out.to(element, 0.2, {scale:1, x:30, opacity:0, ease:Power2.easeIn}, index * 0.01)
				});
				
				out.set($(this).find('.item-title-hover span'), {delay:0.3, x: -30, opacity:0});
				
			}
			
			$(".item-content").mouseenter(function(e) {	
				TweenMax.to('#ball', 0.1,{transformOrigin: '15px 15px', borderWidth: '1px', backgroundColor : 'rgba(0, 0, 0, 1)', scale: 1.8});
				TweenMax.to('#ball-loader', 0.1,{borderWidth: '1px', top: 1, left: 1});
				$( "#ball" ).addClass("with-icon").append( '<i class="fa fa-plus"></i>' );
			});
				
			$(".item-content").mouseleave(function(e) {
				TweenMax.to('#ball', 0.1,{borderWidth: '2px', scale:1, backgroundColor : 'rgba(0, 0, 0, 0)', x: -15, y: -15});
				TweenMax.to('#ball-loader', 0.1,{borderWidth: '2px', top: 0, left: 0});
				$("#ball").removeClass("with-icon");
				$('#ball i').remove();
			});
		
		}		
		
		//Title Big Hover Effect
		if( $('.title-big').length > 0 ){
			
			// Portfolio Parallax
			if ($("#portfolio").hasClass("title-big")) {
                $("body").append('<div class="big-title-caption"></div>');
				$(".big-title-caption").append('<div class="outer"></div>');
				$(".big-title-caption .outer").append('<div class="inner"></div>');
                $("#portfolio").find(".item .item-caption").each(function() {
                    $(".big-title-caption .outer .inner").append($(this))
                }), $("#portfolio").find(".item a").on("mouseenter", function(e) {
                    
					TweenMax.to($(".big-title-caption .outer .inner").children().children(".item-title").eq($(this).parent().index()), 0.2, {force3D:true, opacity:1,  y: 0, delay:0.15, ease:Power2.easeOut});
					TweenMax.to($(".big-title-caption .outer .inner").children().children(".item-cat").eq($(this).parent().index()), 0.2, {force3D:true, opacity:1,  y: 0, delay:0.25, ease:Power2.easeOut});
					
                }).on("mouseleave", function(e) {
                    
					TweenMax.to($(".big-title-caption .outer .inner").children().children(".item-title").eq($(this).parent().index()), 0.2, {force3D:true, opacity:0,  y: -50, ease:Power2.easeIn});
					TweenMax.to($(".big-title-caption .outer .inner").children().children(".item-cat").eq($(this).parent().index()), 0.2, {force3D:true, opacity:0,  y: -30, delay:0.05, ease:Power2.easeIn});
					TweenMax.set($(".big-title-caption .outer .inner").children().children(".item-title").eq($(this).parent().index()), { y: 50, opacity:0, delay:0.2});
					TweenMax.set($(".big-title-caption .outer .inner").children().children(".item-cat").eq($(this).parent().index()), { y: 30, opacity:0, delay:0.25});
					
                }).on("click", function() {
                    $(".big-title-caption .outer .inner").addClass("hover")
                });
                $(".item-title-hover").remove();
            }
			
			
			
			$(".item-content").mouseenter(function(e) {	
				TweenMax.to('#ball', 0.1,{transformOrigin: '15px 15px', borderWidth: '1px', backgroundColor : 'rgba(0, 0, 0, 1)', scale: 1.8});
				TweenMax.to('#ball-loader', 0.1,{borderWidth: '1px', top: 1, left: 1});
				$( "#ball" ).addClass("with-icon").append( '<i class="fa fa-plus"></i>' );
			});
				
			$(".item-content").mouseleave(function(e) {
				TweenMax.to('#ball', 0.1,{borderWidth: '2px', scale:1, backgroundColor : 'rgba(0, 0, 0, 0)', x: -15, y: -15});
				TweenMax.to('#ball-loader', 0.1,{borderWidth: '2px', top: 0, left: 0});
				$("#ball").removeClass("with-icon");
				$('#ball i').remove();
			});
				
		}
		
		//Title Floating Tooltip
		if( $('.title-tooltip').length > 0 ){
			
			$(".item-title-hover").remove();
			
			$("#ball").append('<div class="title-caption-tooltip"></div>');
			$("#portfolio").find(".item .item-caption").each(function() {
				$(".title-caption-tooltip").append($(this))
			}), $("#portfolio").find(".item a").on("mouseenter", function(e) {
				$(".title-caption-tooltip").children().eq($(this).parent().index()).addClass("hover")
			}).on("mouseleave", function(e) {
				$(".title-caption-tooltip").children().eq($(this).parent().index()).removeClass("hover")
			}).on("click", function() {
				$(".title-caption-tooltip").children().eq($(this).parent().index()).removeClass("hover")
			});
			
			$(".item-content").mouseenter(function(e) {	
				TweenMax.to('#ball', 0.1,{borderWidth: '0px'});
				TweenMax.to('#ball-loader', 0.1,{borderWidth: '1px', top: 1, left: 1});
				
			});
				
			$(".item-content").mouseleave(function(e) {
				TweenMax.to('#ball', 0.1,{borderWidth: '2px'});
				TweenMax.to('#ball-loader', 0.1,{borderWidth: '2px', top: 0, left: 0});
			});
				
		}		
		
		//Title Floating Tooltip
		if( $('.title-overlay').length > 0 ){
			
			$(".item-title-hover").remove();
			
			$( ".item-image" ).wrap( "<div class='item-image-wrap'></div>" );
			
			$(".item-content").mouseenter(function(e) {	
				TweenMax.to('#ball', 0.1,{transformOrigin: '15px 15px', borderWidth: '1px', backgroundColor : 'rgba(0, 0, 0, 1)', scale: 1.8});
				TweenMax.to('#ball-loader', 0.1,{borderWidth: '1px', top: 1, left: 1});
				$( "#ball" ).addClass("with-icon").append( '<i class="fa fa-plus"></i>' );
			});
				
			$(".item-content").mouseleave(function(e) {
				TweenMax.to('#ball', 0.1,{borderWidth: '2px', scale:1, backgroundColor : 'rgba(0, 0, 0, 0)', x: -15, y: -15});
				TweenMax.to('#ball-loader', 0.1,{borderWidth: '2px', top: 0, left: 0});
				$("#ball").removeClass("with-icon");
				$('#ball i').remove();
			});
				
		}
		
		$("#close-sidebar").mouseenter(function(e) {	
			TweenMax.to('#ball', 0.1,{transformOrigin: '15px 15px', borderWidth: '1px', scale: 1.8});
			TweenMax.to('#ball-loader', 0.1,{borderWidth: '1px', top: 1, left: 1});
			$( "#ball" ).addClass("close-icon").append( '<i class="fa fa-times"></i>' );
		});
			
		$("#close-sidebar").mouseleave(function(e) {
			TweenMax.to('#ball', 0.1,{borderWidth: '2px', scale:1, x: -15, y: -15});
			TweenMax.to('#ball-loader', 0.1,{borderWidth: '2px', top: 0, left: 0});
			$("#ball").removeClass("close-icon");
			$('#ball i').remove();
		});
		
		
		$window
			.resize(resize)
			.trigger('resize');
		
		
		//Project Navigation
		var over = null,
		out = null;
		
		TweenLite.set(".main-subtitle", { yPercent: 100 });
		
		$(".next-project-title").hover(mouseOver, mouseOut);
		
		function mouseOver() {
			var delay = 0;
			if (out && out.isActive()) {
				out.timeScale(3);
				delay = 0.1;
			}		
			over = new TimelineLite({ delay: delay });		
			over
				.to($(".main-title"), 0.3, { yPercent: -100 }, 0)
				.fromTo(".main-subtitle", 0.3, { yPercent: 100 }, { yPercent: 0 }, 0);
		}
		
		function mouseOut() {
			var delay = 0;
			if (over && over.isActive()) {
				over.timeScale(3);
				delay = 0.1;
			}
		
			out = new TimelineLite({ delay: delay });
		
			out
				.to($(".main-subtitle"), 0.3, { yPercent: -100 }, 0)
				.fromTo($(".main-title"), 0.3, { yPercent: 100 }, { yPercent: 0 }, 0);
		}
	
	}//End Portfolio
	

/*--------------------------------------------------
Function Back To Top
---------------------------------------------------*/
	
	function BackToTop() {
		
		$('.scrolltotop').on('click', function() {
			$('html, body').animate({scrollTop : 0},800);
			return false;
		});
		
		$(window).scroll(function() {    
			var scroll = $(window).scrollTop();
		
			if (scroll >= 300) {
				
				$(".scrolltotop").addClass('page-up').removeClass('no-tooltip');
				$("#page-action-holder-right").removeClass('no-tooltip');
				
			} else {				
				
				$(".scrolltotop").removeClass('page-up').addClass('no-tooltip');
				$("#page-action-holder-right").addClass('no-tooltip');
			}
		});
	
	}//End Back To Top
	
	
	
/*--------------------------------------------------
Function Virtual Scroll
---------------------------------------------------*/

	function VirtualScr() {		
		
		new SmoothScroll();

		function SmoothScroll(el) {
			var t = this, h = document.documentElement;
			el = el || window;
			t.rAF = false;
			t.target = 0;
			t.scroll = 0;
			t.animate = function() {
			t.scroll += (t.target - t.scroll) * 0.1;
			if (Math.abs(t.scroll.toFixed(5) - t.target) <= 0.47131) {
			cancelAnimationFrame(t.rAF);
			t.rAF = false;}
			if (el == window) scrollTo(0, t.scroll);
			else el.scrollTop = t.scroll;
			if (t.rAF) t.rAF = requestAnimationFrame(t.animate);};
			el.onmousewheel = function(e) {
			e.preventDefault();
			e.stopPropagation();
			var scrollEnd = (el == window) ? h.scrollHeight - h.clientHeight : el.scrollHeight - el.clientHeight;
			t.target += (e.wheelDelta > 0) ? -100 : 100;
			if (t.target < 0) t.target = 0;
			if (t.target > scrollEnd) t.target = scrollEnd;
			if (!t.rAF) t.rAF = requestAnimationFrame(t.animate);};
			el.onscroll = function() {
			if (t.rAF) return;
			t.target = (el == window) ? pageYOffset || h.scrollTop : el.scrollTop;
			t.scroll = t.target;};
		}			
		
	}// End Virtual Scroll
	

/*--------------------------------------------------
Function Page Share
---------------------------------------------------*/	
	
	function PageShare() {
		
		if( $('#share').length > 0 ){
		
			$("#share").jsSocials({
				showLabel: false,
				showCount: false,
				shares: ["facebook", "twitter", "googleplus"]
			});
		
		}
		
	}//End PageShare
	
	
/*--------------------------------------------------
Function Sliders
---------------------------------------------------*/
	
	function Sliders() {
		
		$('.slider').owlCarousel({
			loop:true,
			margin:500,
			center: true,
			autoHeight:false,
			nav:true,
			navSpeed: 500,
			items:1,			
		});
		
		$( ".slider .owl-prev" ).removeClass( "parallax-wrap" );
		$( ".slider .owl-next" ).removeClass( "parallax-wrap" );
		
		$('.carousel').owlCarousel({
			loop:true,
			margin:20,
			autoHeight:false,
			navSpeed: 600,
			nav:true,
			responsive:{
				0:{
					items:1
				},
				479:{
					items:2
				},
				1024:{
					items:3
				},
				1466:{
					items:3
				}
			}
		});
		
		$( ".carousel .owl-prev" ).removeClass( "parallax-wrap" );
		$( ".carousel .owl-next" ).removeClass( "parallax-wrap" );	
			
		$(".owl-prev").mouseenter(function(e) {	
			TweenMax.to('#ball', 0.1,{transformOrigin: '15px 15px', borderWidth: '1px', backgroundColor : 'rgba(0, 0, 0, 1)', scale: 1.8});
			TweenMax.to('#ball-loader', 0.1,{borderWidth: '1px', top: 1, left: 1});
			$( "#ball" ).addClass("with-icon").append( '<i class="fa fa-chevron-left"></i>' );
		});
			
		$(".owl-prev").mouseleave(function(e) {
			TweenMax.to('#ball', 0.1,{borderWidth: '2px', scale:1, backgroundColor : 'rgba(0, 0, 0, 0)', x: -15, y: -15});
			TweenMax.to('#ball-loader', 0.1,{borderWidth: '2px', top: 0, left: 0});
			$("#ball").removeClass("with-icon");
			$('#ball i').remove();
		});
		
		$(".owl-next").mouseenter(function(e) {	
			TweenMax.to('#ball', 0.1,{transformOrigin: '15px 15px', borderWidth: '1px', backgroundColor : 'rgba(0, 0, 0, 1)', scale: 1.8});
			TweenMax.to('#ball-loader', 0.1,{borderWidth: '1px', top: 1, left: 1});
			$( "#ball" ).addClass("with-icon").append( '<i class="fa fa-chevron-right"></i>' );
		});
			
		$(".owl-next").mouseleave(function(e) {
			TweenMax.to('#ball', 0.1,{borderWidth: '2px', scale:1, backgroundColor : 'rgba(0, 0, 0, 0)', x: -15, y: -15});
			TweenMax.to('#ball-loader', 0.1,{borderWidth: '2px', top: 0, left: 0});
			$("#ball").removeClass("with-icon");
			$('#ball i').remove();
		});
		
		$('.slider').on('click', function() {
			
			var $window = $(window),
				$element = $('.slider'),
				elementTop = $element.offset().top,
				elementHeight = $element.height(),
				viewportHeight = $window.height(),
				scrollIt = elementTop - ((viewportHeight - elementHeight) / 2 + 20);
							
			$("html, body").animate({ scrollTop: scrollIt }, 300);
			
		});
		
		if( $('.text-carousel').length > 0 ){		
			$(".text-carousel").owlCarousel({	
				loop:true,
				dots:false,
				items:1,
				autoplay:true,
				smartSpeed: 750,
				autoHeight:true,
				autoplayHoverPause:true,
				nav:true,
				navText: ["<div class='prev-testimonial parallax-element'><i class='fa fa-chevron-left' aria-hidden='true'></i></div>","<div class='next-testimonial parallax-element'><i class='fa fa-chevron-right' aria-hidden='true'></i></div>"],
			});			
			
		}
		
	}//End Sliders	
	
	
/*--------------------------------------------------
Function Justified Grid
---------------------------------------------------*/	
	
	function JustifiedGrid() {
		
		if( $('#justified-grid').length > 0 ){
		
			$('#justified-grid').justifiedGallery({
				rowHeight : 300,
				lastRow : 'nojustify',
				margins : 10
			});
		
		}
		
	}//End Justified Grid	
	
	
/*--------------------------------------------------
Function Lightbox
---------------------------------------------------*/
	
	function Lightbox() {
		
		$('.image-link').magnificPopup({
		  	type: 'image',
			mainClass: 'mfp-with-zoom',	
			gallery: {
			  enabled:true
			},		
			zoom: {
				enabled: true, 			
				duration: 300, 
				easing: 'ease-in-out', 
				opener: function(openerElement) {
					return openerElement.is('img') ? openerElement : openerElement.find('img');
				}
			}			
		});
		
		$(".image-link").mouseenter(function(e) {	
			TweenMax.to('#ball', 0.1,{transformOrigin: '15px 15px', borderWidth: '1px', backgroundColor : 'rgba(0, 0, 0, 1)', scale: 1.8});
			TweenMax.to('#ball-loader', 0.1,{borderWidth: '1px', top: 1, left: 1});
			$( "#ball" ).addClass("with-icon").append( '<i class="fa fa-plus"></i>' );
		});
			
		$(".image-link").mouseleave(function(e) {
			TweenMax.to('#ball', 0.1,{borderWidth: '2px', scale:1, backgroundColor : 'rgba(0, 0, 0, 0)', x: -15, y: -15});
			TweenMax.to('#ball-loader', 0.1,{borderWidth: '2px', top: 0, left: 0});
			$("#ball").removeClass("with-icon");
			$('#ball i').remove();
		});
			
	}//End Lightbox	 		
	


/*--------------------------------------------------
Function AppearIteam
---------------------------------------------------*/	
		
	function AppearIteam() {		
		
		setTimeout(function(){
			$('.has-animation').each(function() {	
				$(this).appear(function() {				
					$(this).delay($(this).attr('data-delay')).queue(function(next){
						$(this).addClass('animate-in');
						next();
					});				 		
				});		
			});
		} , 250 );		
	
	}//End AppearIteam
	
	
	
/*--------------------------------------------------
Function Contact Map
---------------------------------------------------*/	
		
	function ContactMap() {	
	
	if( jQuery('#map_canvas').length > 0 ){					
		var latlng = new google.maps.LatLng(43.270441,6.640888);
		var settings = {
			zoom: 14,
			center: new google.maps.LatLng(43.270441,6.640888),
			mapTypeControl: false,
			scrollwheel: false,
			draggable: true,
			panControl:false,
			scaleControl: false,
			zoomControl: false,
			streetViewControl:false,
			navigationControl: false};			
			var newstyle = [{
							featureType: "all",
							elementType: "labels.text.fill",
							stylers: [{
								saturation: 36
							}, {
								color: "#333333"
							}, {
								lightness: 40
							}]
						}, {
							featureType: "all",
							elementType: "labels.text.stroke",
							stylers: [{
								visibility: "on"
							}, {
								color: "#ffffff"
							}, {
								lightness: 16
							}]
						}, {
							featureType: "all",
							elementType: "labels.icon",
							stylers: [{
								visibility: "off"
							}]
						}, {
							featureType: "administrative",
							elementType: "geometry.fill",
							stylers: [{
								color: "#fefefe"
							}, {
								lightness: 20
							}]
						}, {
							featureType: "administrative",
							elementType: "geometry.stroke",
							stylers: [{
								color: "#fefefe"
							}, {
								lightness: 17
							}, {
								weight: 1.2
							}]
						}, {
							featureType: "administrative.locality",
							elementType: "labels.text",
							stylers: [{
								color: "#8d8d8d"
							}, {
								weight: "0.35"
							}]
						}, {
							featureType: "landscape",
							elementType: "geometry",
							stylers: [{
								color: "#f5f5f5"
							}, {
								lightness: 20
							}]
						}, {
							featureType: "poi",
							elementType: "geometry",
							stylers: [{
								color: "#f5f5f5"
							}, {
								lightness: 21
							}]
						}, {
							featureType: "poi.park",
							elementType: "geometry",
							stylers: [{
								color: "#dedede"
							}, {
								lightness: 21
							}]
						}, {
							featureType: "road.highway",
							elementType: "geometry.fill",
							stylers: [{
								color: "#ffffff"
							}, {
								lightness: 17
							}]
						}, {
							featureType: "road.highway",
							elementType: "geometry.stroke",
							stylers: [{
								color: "#ffffff"
							}, {
								lightness: 29
							}, {
								weight: .2
							}]
						}, {
							featureType: "road.arterial",
							elementType: "geometry",
							stylers: [{
								color: "#ffffff"
							}, {
								lightness: 18
							}]
						}, {
							featureType: "road.local",
							elementType: "geometry",
							stylers: [{
								color: "#ffffff"
							}, {
								lightness: 16
							}]
						}, {
							featureType: "transit",
							elementType: "geometry",
							stylers: [{
								color: "#f2f2f2"
							}, {
								lightness: 19
							}]
						}, {
							featureType: "water",
							elementType: "geometry",
							stylers: [{
								color: "#e9e9e9"
							}, {
								lightness: 17
							}]
						}];			
		var mapOptions = {
			styles: newstyle,
			mapTypeControlOptions: {
				 mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'holver']
			}
		};
		var map = new google.maps.Map(document.getElementById("map_canvas"), settings);	
		var mapType = new google.maps.StyledMapType(newstyle, { name:"Grayscale" });    
			map.mapTypes.set('holver', mapType);
			map.setMapTypeId('holver');
					
		
		google.maps.event.addDomListener(window, "resize", function() {
			var center = map.getCenter();
			google.maps.event.trigger(map, "resize");
			map.setCenter(center);
		});	
		var contentString = '<div id="content-map-marker" style="text-align:left; padding-top:10px; padding-left:10px">'+
			'<div id="siteNotice">'+
			'</div>'+
			'<h4 id="firstHeading" class="firstHeading" style="color:#000; margin-bottom:0px;"><strong>Hello Friend!</strong></h4>'+
			'<div id="bodyContent">'+
			'<p style="font-family:Verdana; color:#999; font-size:12px; margin-bottom:10px">Here we are. Come to drink a coffee!</p>'+
			'</div>'+
			'</div>';
		var infowindow = new google.maps.InfoWindow({
			content: contentString
		});	
		var companyImage = new google.maps.MarkerImage('images/marker.png',
			new google.maps.Size(58,63),<!-- Width and height of the marker -->
			new google.maps.Point(0,0),
			new google.maps.Point(35,20)<!-- Position of the marker -->
		);
		var companyPos = new google.maps.LatLng(43.270441,6.640888);	
		var companyMarker = new google.maps.Marker({
			position: companyPos,
			map: map,
			icon: companyImage,               
			title:"Our Office",
			zIndex: 3});	
		google.maps.event.addListener(companyMarker, 'click', function() {
			infowindow.open(map,companyMarker);
		});	
	}
	
	return false
	
	}//End ContactMap
	
	
/*--------------------------------------------------
Function Contact Formular
---------------------------------------------------*/	
		
	function ContactForm() {	
	
		if( jQuery('#contact-formular').length > 0 ){
			$('#contactform').submit(function(){
				var action = $(this).attr('action');
				$("#message").slideUp(750,function() {
					$('#message').hide();
					$('#submit').attr('disabled','disabled');		
					$.post(action, {
						name: $('#name').val(),
						email: $('#email').val(),
						comments: $('#comments').val()
					},
					function(data){
						document.getElementById('message').innerHTML = data;
						$('#message').slideDown('slow');
						$('#contactform img.loader').fadeOut('slow',function(){$(this).remove()});
						$('#submit').removeAttr('disabled');
						if(data.match('success') != null) $('#contactform').slideUp('slow');		
					}
				);		
				});		
				return false;		
			});		
		}

	}//End ContactForm		
	
	
	
/*--------------------------------------------------
Function Load Via Ajax
---------------------------------------------------*/	
		
	function LoadViaAjax() {		
		
		FirstLoad();		
		LazyLoad();		
		HeroSection();
		FitThumbScreen();
		Portfolio();		
		BackToTop();
		PageShare();
		Sliders();
		JustifiedGrid();
		Lightbox();
		AppearIteam();
		ContactMap();
		ContactForm();		
	
	}//End Load Via Ajax				
	
		