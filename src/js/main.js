$(document).ready(function(){
	$('.js-slider').owlCarousel({
		items: 1,
		loop: true,
		smartSpeed: 1000,
		mouseDrag: false
	});
	accordion();
	tabs();

	$('.form-item-holder select').styler();
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