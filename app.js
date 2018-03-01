$(document).ready(function() {
	icon = $('.navbar-brand');
	$('.hidden-title').hide().css('opacity', 0).delay(1000).slideDown(2000).animate({
		opacity: 1
	}, {
		queue: false,
		duration: '2000'
	});
	icon.hide().delay(2000).fadeIn(1000);
	$('.navbar-brand').click(function() {
		$('html, body').animate({
			scrollTop: $("#about").offset().top
		}, 2000);
	});
	$('#contact-btn').click(function() {
		$(this).fadeOut();
		$('html, body').animate({
			scrollTop: $("#reused_form").offset().top
		}, 2000);
	});
	$(window).scroll(function() {
		$(".hidden-title").css("opacity", 1 - $(window).scrollTop() / 250);
	});
	$('.contact-form form input[type="text"], .contact-form form textarea').on('focus', function() {
		$('.contact-form form input[type="text"], .contact-form form textarea').removeClass('input-error');
	});
	$('.contact-form form').submit(function(e) {
		e.preventDefault();
		$('.contact-form form input[type="text"], .contact-form form textarea').removeClass('input-error');
		var postdata = $('.contact-form form').serialize();
		$.ajax({
			type: 'POST',
			url: 'assets/contact.php',
			data: postdata,
			dataType: 'json',
			success: function(json) {
				if (json.emailMessage != '') {
					$('.contact-form form .contact-email').addClass('input-error');
				}
				if (json.subjectMessage != '') {
					$('.contact-form form .contact-subject').addClass('input-error');
				}
				if (json.messageMessage != '') {
					$('.contact-form form textarea').addClass('input-error');
				}
				if (json.antispamMessage != '') {
					$('.contact-form form .contact-antispam').addClass('input-error');
				}
				if (json.emailMessage == '' && json.subjectMessage == '' && json.messageMessage == '' && json.antispamMessage == '') {
					$('.contact-form form').fadeOut('fast', function() {
						$('.contact-form').append('<p>Thanks for contacting us! We will get back to you very soon.</p>');
						// reload background
						$.backstretch("resize");
					});
				}
			}
		});
	});
});
