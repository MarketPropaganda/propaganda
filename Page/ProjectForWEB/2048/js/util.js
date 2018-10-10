//工具类
var util ={
	pos:function(n){//获取x y位置
		return n*120+20;
	},
	space:function(d){//检测界面中是否有空间
		for(var i=0;i<4;i++){
			for(var j=0;j<4;j++){
				if(d[i][j]==0){
					return false;
				}
			}
		}
		return true;
	},
	showNumber:function(x,y,num){//动画显示一个numbercell + 数字
		var numberCell = $('#n'+x+y);
		numberCell.css({
			backgroundColor:bgColor[num],
			color:fontColor(num)
		}).text(num).animate({width:100,height:100,left:util.pos(y),top:util.pos(x)},50);
	},
	moveAnimate:function (fi,fj,ti,tj){
		$('#n'+fi+fj).animate({
			left:util.pos(tj),
			top:util.pos(ti)
		},100)
	},
	updateScore:function(){
		$('.score span').text(score);
		this.hightScore()
	},
	hightScore:function(){
		if(!localStorage.getItem('hscore')){
			localStorage.setItem('hscore',0);
		}
		var oldH = localStorage.getItem('hscore');
		if(oldH<score){
			localStorage.setItem('hscore',score);
			$('.hscore span').text(score);
		}else{
			$('.hscore span').text(oldH);
		}
	}
}