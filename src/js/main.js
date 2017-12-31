$(document).ready(function(){
	$('.js-slider').owlCarousel({
		items: 1,
		loop: true,
		smartSpeed: 1000,
		mouseDrag: false
	});
	accordion();
	tabs();

	initPopups();

	$('.form-item-holder select').styler();
	$('.bottom-row input[type="file"]').styler();


	var didScroll;
	var lastScrollTop = 0;
	var delta = 5;
	var navbarHeight = $('.fixed').outerHeight();

	$(window).scroll(function(event){
		didScroll = true;
	});

	setInterval(function() {
		if (didScroll) {
			hasScrolled();
			didScroll = false;
		}
	}, 250);

	function hasScrolled() {
		var st = $(this).scrollTop();

		if(Math.abs(lastScrollTop - st) <= delta)
			return;

		if (st > lastScrollTop && st > navbarHeight){
			$('.fixed').attr('class', 'fixed nav-up');
		} else {
			if(st + $(window).height() < $(document).height() && st > 100) {
				$('.fixed').attr('class', 'fixed nav-down');
			}
		}

		if(st < 100) {
			$('.fixed').attr('class', 'fixed onTop');
		}

		lastScrollTop = st;
	}

});

function accordion(){
	var opener = $('.js-drop-opener'),
		dropBox = $('.js-drop-opened');

	opener.on('click', function(){
		$(this).next(dropBox).slideToggle();
		$(this).toggleClass('active');
	})
}

function tabs() {
	var tabLink = $('.js-tab-menu a'),
		tabContent = $('.js-tab-content');

	tabLink.on('click', function(e){
		e.preventDefault();
		tabContent.removeClass('active');
		$($(this).attr('href')).addClass('active');
		tabLink.removeClass('active');
		$(this).addClass('active');
	})
}

function initPopups() {
	var opener = $('.open-popup'),
		lightbox = $('.popup'),
		fader = $('.fader'),
		closer = $('.popup .close-popup'),
		id;

	lightbox.each(function(){
		var el = $(this);
		if(el.hasClass('show-me-onload')) {
			popupPosition(el);
			el.fadeIn();
			fader.fadeIn();
		} else {
			el.hide();
		}
	});

	opener.on('click', function(e){
		if($(this).parents('.popup')) {
			$(this).parents('.popup').hide();
		}
		id = $(this).attr('href').substr('1');
		lightbox.each(function(){
			var lightbox_box = $(this);
			if(id == $(this).attr('id')) {
				popupPosition(lightbox_box);
				lightbox_box.fadeIn();
				fader.fadeIn();
				$('.page').addClass('blurred');
				$('body').addClass('popup-opened');
			}
		});
		e.preventDefault();
	});

	function disappearLightbox() {

		lightbox.fadeOut();
		setTimeout(function(){
			lightbox.removeAttr('style');
			if($('.page').attr('style')){
				$('body').addClass('open-menu');
			}
		}, 500);
		setTimeout(function(){
			fader.fadeOut();
			$('.page').removeClass('blurred');
			$('body').removeClass('popup-opened');
		}, 100)
	}

	function closeLightbox(element) {
		element.click(function(e){
			disappearLightbox();
			e.preventDefault();
		})
	}

	closeLightbox(fader);
	closeLightbox(closer);

	$(window).keydown(function(eventObject){
		if (eventObject.which == 27){
			disappearLightbox()
		}
	});

}

function popupPosition(popup){

	if(popup.outerHeight() > $(window).height()) {
		popup.css({
			'position': 'absolute',
			'top': $(window).scrollTop() + 20,
			'margin-top': 0 + 'px',
			'tranform': 'translateY(0)'

		});
	} else {
		popup.css({
			'top': '50%',
			'margin-top':-popup.outerHeight()/2 + 'px',
			'position':'fixed',
			'tranform': 'translateY(-50%)'
		});
	}
}