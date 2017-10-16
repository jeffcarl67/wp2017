$('img').click(function(){
	for(var i=0;i<3;i++){
		if($('img')[i] === this){
			break;
		}
	}
	var con = $('#container').clone(true,true);
	var show = $('#show').clone(true,true);
	$(this).parent().css({
		'position':'fixed',
		'top':$(this).parent().offset().top,
		'left':$(this).parent().offset().left,
		'overflow':'scroll',
		'display':'block'
	});
	var top = $(this).parent().offset().top;
	var left = $(this).parent().offset().left;
	var width = $(this).parent().width();
	var height = $(this).parent().width();

	$(this).parent().animate({
		'width':'100vw',
		'top':'0px',
		'left':'0px',
	},300,function(){
		$(this).css({
			'margin':'0px',
			'overflow':'hidden'
		})
		$('body').empty();
		$('<div class="button_back"><img src="back.png"></div>').appendTo($('body'));
		$('<div class="bar"></div>').css({
			'width':$(window).width()-128,
		}).html('<p class="title">' + $(this).children('p').html() + '</p>').appendTo($('body'));

		$(this).children('img').addClass('intro_img').delay(500).animate({
			'width':'50vw',
			'top':'150px',
			'left':'0px',
			'z-index':'0',
		},1000).appendTo($('body'));

		
		switch(i){
			case 0: $('<div>姓名:王建程<br>學校:成功大學<br>系所:交通管理科學系</div>').addClass('content').fadeIn().appendTo($('body'));
			break;
			case 1: $('<div>編譯原理<br>作業系統<br>電腦圖學</div>').addClass('content').fadeIn().appendTo($('body'));
			break;
			case 2: $('<div>好玩</div>').addClass('content').fadeIn().appendTo($('body'));
			break;
			default:
			break;
		}
		$('.button_back').click(function(){
			$('body').empty();
			$('body').append(con);
			$('body').append(show);
			
			$('#show').html($($('img')[i]).parent().html());
			$('#show').css({
				'width':'100vw',
				'height':'100vh',
				'position':'fixed',
				'top':'0px',
				'left':'0px',
			});
			
			$('#show').animate({
				'width':width,
				'height':height,
				'top':top,
				'left':left,
			},300,function(){
				$('#show').empty();
				$('#show').removeAttr('style');
				$($('img')[i]).parent().removeAttr('style');
			})
		});
	});
});