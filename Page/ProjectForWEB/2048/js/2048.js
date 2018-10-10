/*
	2048游戏逻辑
	# 变量组
	data 存放数据
	score 存放分数

	1. 绘制界面  4*4 双层 for 计算left top

*/
var data = [];//数据
var score = 0; //分数
var flag = true;
var bgColor = {//不同数字单元格背景颜色
	2:'#eee4da',
	4:'#ede0c8',
	8:'#f2b179',
	16:'#f59563',
	32:'#f67c5f',
	64:'#f65e3b',
	128:'#edcf72',
	256:'#edcc61',
	512:'#9c0',
	1024:'#33b5e5',
	2048:'#09c',
	4096:'#a6c',
	8192:'#93c'
}
var fontColor=function(num){//数字颜色
	if(num<=4){
		return "#776e65";
	}
	return "#fff";
}

$(function(){
	newGame()

})
function newGame(){
	//绘制界面
	drawSence();
	score =0;
	util.updateScore();
	util.hightScore();
	//随机生成2个数字
	getNumber();
	getNumber();
	flag=true;
}

//绘制界面函数
function drawSence(){
	var grid=$('.grid');
	grid.empty();
	for (var i = 0; i < 4; i++) {
		for(var j = 0; j < 4; j++){
			$('<div>').attr({
				class:'grid-cell',
				id:'g'+i+j
			}).css({
				top:util.pos(i),
				left:util.pos(j)
			}).appendTo(grid)
		}
	}

	//初始化数据
	for(var i=0;i<4;i++){
		data[i]=[];
		for(var j=0;j<4;j++){
			data[i][j]=0;
		}
	}

	//创建number-cell
	showdata()
	console.log(data)
}
function showdata(){
	var grid=$('.grid');
	$('.number-cell').remove(); //清除所有number-cell元素
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			var numberCell = $('<div>');
			numberCell.attr({
				class:'number-cell',
				id:'n'+i+j
			}).appendTo(grid);
			if(data[i][j]==0){
				numberCell.css({
					width:0,
					height:0,
					left:util.pos(j)+50,
					top:util.pos(i)+50
				})
			}else{
				numberCell.css({
					width:100,
					height:100,
					left:util.pos(j),
					top:util.pos(i)
				})
				numberCell.css({
					backgroundColor:bgColor[data[i][j]],
					color:fontColor(data[i][j]),
				}).text(data[i][j]);
			}
		}
	}
}


function getNumber(){
	if(util.space(data)){
		return true;
	}
	//随机单元格 位置
	var x = Math.floor(Math.random()*4);
	var y = Math.floor(Math.random()*4);
	while(data[x][y]!=0){
		x = Math.floor(Math.random()*4);
		y = Math.floor(Math.random()*4);
	}
	//随机数字
	var num = Math.random()<0.5?2:4;
	data[x][y] = num;
	util.showNumber(x,y,num);

	console.log(data)
	return false;
}


$(document).keydown(function(e){
	if(!flag){return;}
	switch(e.keyCode){
		case 37:
		moveLeft();
		break;
		case 38:
		moveTop();
		break;
		case 39:
		moveRight();
		break;
		case 40:
		moveBottom();
		break;
		default:
		break;
	}
})
function moveLeft(){
	isGameOver();
	if(!canMoveLeft()){
		return false;
	}
	
	for(var i=0;i<4;i++){
		for(var j=1;j<4;j++){
			if(data[i][j]!=0){
				for(var k=0;k<j;k++){
					if(data[i][k]==0&&noBlockH(i,k,j,data)){
						//move()
						util.moveAnimate(i,j,i,k);
						data[i][k]=data[i][j];
						data[i][j]=0;
						continue;
					}else if(data[i][k]==data[i][j]&&noBlockH(i,k,j,data)){
						//move()
						util.moveAnimate(i,j,i,k);
						//add
						data[i][k]+=data[i][j];
						data[i][j]=0;
						score+=data[i][k];//增加分数
						util.updateScore();//更新分数
						continue;
					}
				}
			}
		}
	}
	setTimeout(getNumber,100);
	setTimeout(showdata,100);
}

function moveTop(){
	isGameOver();
	if(!canMoveTop()){
		return false;
	}
	
	for(var i=1;i<4;i++){
		for(var j=0;j<4;j++){
			if(data[i][j]!=0){
				for(var k=0;k<i;k++){
					if(data[k][j]==0&&noBlockV(j,k,i,data)){
						//move()
						util.moveAnimate(i,j,k,j);
						data[k][j]=data[i][j];
						data[i][j]=0;
						continue;
					}else if(data[k][j]==data[i][j]&&noBlockV(j,k,i,data)){
						//move()
						util.moveAnimate(i,j,k,j);
						//add
						data[k][j]+=data[i][j];
						data[i][j]=0;
						score+=data[k][j];//增加分数
						util.updateScore();//更新分数
						continue;
					}
				}
			}
		}
	}
	setTimeout(getNumber,100);
	setTimeout(showdata,100);
}

function moveBottom(){
	isGameOver();
	if(!canMoveBottom()){
		return false;
	}
	for(var i=2;i>=0;i--){
		for(var j=0;j<4;j++){
			if(data[i][j]!=0){
				for(var k=3;k>i;k--){
					if(data[k][j]==0&&noBlockV(j,i,k,data)){
						//move()
						util.moveAnimate(i,j,k,j);
						data[k][j]=data[i][j];
						data[i][j]=0;
						continue;
					}else if(data[k][j]==data[i][j]&&noBlockV(j,i,k,data)){
						//move()
						util.moveAnimate(i,j,k,j);
						//add
						data[k][j]+=data[i][j];
						data[i][j]=0;
						score+=data[k][j];//增加分数
						util.updateScore();//更新分数
						continue;
					}
				}
			}
		}
	}
	setTimeout(getNumber,100);
	setTimeout(showdata,100);
}

function moveRight(){
	isGameOver();
	if(!canMoveRight()){
		return false;
	}
	
	for(var i=0;i<4;i++){
		for(var j=2;j>=0;j--){
			if(data[i][j]!=0){
				for(var k=3;k>j;k--){
					if(data[i][k]==0&&noBlockH(i,j,k,data)){
						//move()
						util.moveAnimate(i,j,i,k);
						data[i][k]=data[i][j];
						data[i][j]=0;
						continue;
					}else if(data[i][k]==data[i][j]&&noBlockH(i,j,k,data)){
						//move()
						util.moveAnimate(i,j,i,k);
						//add
						data[i][k]+=data[i][j];
						data[i][j]=0;
						score+=data[i][k];//增加分数
						util.updateScore();//更新分数
						continue;
					}
				}
			}
		}
	}
	setTimeout(getNumber,100);
	setTimeout(showdata,100);
}

function canMoveLeft(){
	for(var i=0;i<4;i++){
		for(var j=1;j<4;j++){
			if(data[i][j]!=0){
				if(data[i][j-1]==0||data[i][j-1]==data[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}

function canMoveTop(){
	for(var i=1;i<4;i++){
		for(var j=0;j<4;j++){
			if(data[i][j]!=0){
				if(data[i-1][j]==0||data[i-1][j]==data[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}

function canMoveRight(){
	for(var i=0;i<4;i++){
		for(var j=0;j<3;j++){
			if(data[i][j]!=0){
				if(data[i][j+1]==0||data[i][j+1]==data[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}

function canMoveBottom(){
	for(var i=0;i<3;i++){
		for(var j=0;j<4;j++){
			if(data[i][j]!=0){
				if(data[i+1][j]==0||data[i+1][j]==data[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}


function noBlockH(row,col1,col2,data){
	for(var i=col1+1;i<col2;i++){
		if(data[row][i]!=0){
			return false;
		}
	}
	return true;
}
function noBlockV(col,row1,row2,data){
	for(var i=row1+1;i<row2;i++){
		if(data[i][col]!=0){
			return false;
		}
	}
	return true;
}

function isGameOver(){
	if(!canMoveTop()&&!canMoveBottom()&&!canMoveLeft()&&!canMoveRight()){
		alert('GameOver');
		flag=false;
	}
}