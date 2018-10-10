$(function(){
	var play = true;
	var music = document.querySelector('audio');
	var $img = $('.musicBox .img');
	var $gif = $('.musicBox .gif');
	// 背景音乐播放暂停控制
	$('.musicBox').click(function(){
		if(play){
			music.pause();
			$img.css('animation','none');
			$gif.css('display','none');
			play = !play;
		}else{
			music.play();
			$img.css('animation','playMusic 2s linear 0s infinite');
			$gif.css('display','block');
			play = !play;
		}
	})
	// 启动fullpage
	$('#dowebok').fullpage({
		navigation:true,
		anchors: ['page7'],
	});
})