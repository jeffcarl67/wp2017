$(function(){

	$.ajax({
		method:"get",
		url:"./video",
		data:{a:$('input[name="a"]').val()},
		success:function(data){
			//$('#ajax p').html(data + '<br>' +$('#ajax p').html());
			var arr = data.split(' ');
			var url = arr[arr.length-1];
			var title = '';
			for(var i=0;i<arr.length-1;i++){
				title += arr[i]+' ';
			}
			$('iframe').attr('src','https://www.youtube.com/embed/'+url.split('=')[1]);
		}
	})

	$.ajax({
		method:'get',
		url:'./chat_content',
		success:function(data){
			$('#chat_content').html(data.replace(/&lt;br&gt;/g,'<br>'));
		}
	});

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


$('#change_video').click(function(event){
	event.preventDefault();
	$.ajax({
		method:"get",
		url:"./video",
		data:{a:$('input[name="a"]').val()},
		success:function(data){
			//$('#ajax p').html(data + '<br>' +$('#ajax p').html());
			var arr = data.split(' ');
			var url = arr[arr.length-1];
			var title = '';
			for(var i=0;i<arr.length-1;i++){
				title += arr[i]+' ';
			}
			$('iframe').attr('src','https://www.youtube.com/embed/'+url.split('=')[1]);
		}
	});
});

$('#send').click(function(event){
	event.preventDefault();
	$.ajax({
		method:"get",
		url:"./chat",
		data:{a:$('input[name="a"]').val()},
		success:function(data){
			//console.log(data);
			$('#chat_content').html(data.replace(/&lt;br&gt;/g,'<br>'));
			$('input[name="a"]').val('');
		}
	})
});
})