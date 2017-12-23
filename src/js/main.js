$(document).ready(function(){
	$('.js-slider').owlCarousel({
		items: 1,
		loop: true,
		smartSpeed: 1000,
		mouseDrag: false
	});
	accordion();
	tabs();

	$(".header").sticky({
		className: 'fixed',
		zIndex: 1001
	});

	initPopups();

	$('.form-item-holder select').styler();
	$('.bottom-row input[type="file"]').styler();
})

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

	if(popup.height() > $(window).height()) {
		popup.css({
			'position': 'absolute',
			'top': $(window).scrollTop() + 20,
			'margin-top': 0 + 'px',
			'tranform': 'translateY(0)'

		});
	} else {
		popup.css({
			'top': '50%',
			'margin-top':-popup.height()/2 + 'px',
			'position':'fixed',
			'tranform': 'translateY(-50%)'
		});
	}
}