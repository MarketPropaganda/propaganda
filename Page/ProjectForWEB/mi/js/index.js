window.onload=function(){               //当文档完成之后才触发事件；

	//banner轮播图
	
	var banner=getClass("banner")[0];
	var hezi=getClass("hezi")[0];           //获取到元素
	var slide=getClass("slide",hezi)
	var btnbox=getClass("btnbox")[0];
	var btns=getClass("btn",btnbox);
	var leftbtn=getClass("leftbtn")[0];
	var rightbtn=getClass("rightbtn")[0];

	var num=0;                              //变量用来监控是否需要换图
	function move(n){
		var n=n||"r";
		if(n=="r"){
			num++;
			if(num>=slide.length){               //一轮播完，让num回到初始值
				num=0;
			}
		}else if(n=="l"){
			num--;
			if (num<0) {
				num=slide.length-1;
			}
		}
		for(var i=0;i<btns.length;i++){
			btns[i].style.background="#622C21";          //设置初始值
			slide[i].style.zIndex=1;
			slide[i].style.opacity=0;
		}
		btns[num].style.background="white";          //当num到对应值时候改变样式
		slide[num].style.zIndex=2;
		slide[num].style.opacity=1;
	}

	var bt=setInterval(function(){           //时间函数，1s图片换一次，对应圆点也改变样式
		move();                              //调用一次函数，num加一次

	},2000)


	banner.onmouseleave=function(){                 //鼠标移入，停止，鼠标移除，开始
		bt=setInterval(function(){           
		move();                              
		},2000)
	}

	banner.onmouseenter=function(){
		clearInterval(bt);
	}

	leftbtn.onclick=function(){
		move("l");
	}

	rightbtn.onclick=function(){
		move("r");
	}

	Array.from(btns).forEach(function(val,n){        //鼠标移入圆点，出现对应的图片；
		val.onclick=function(){
			num=n-1;
			move();
		}
		val.onmouseenter=function(){
		
			this.style.background="white";
		
		}
		val.onmouseleave=function(){
			if(n==num){
				this.style.background="white";
			}else{
				this.style.background="#622C21";
			}
		}

	})

	// 多个选项卡
	

	function xuan2(tops,bots){
			Array.from(tops).forEach(function(val,index){
				val.onmouseenter=function(){
					for(var i=0;i<tops.length;i++){
						tops[i].style.color="black";
						tops[i].style.borderBottom="0";
						bots[i].style.zIndex=1;
					}
					this.style.color="#FF6700";
					this.style.borderBottom="2px solid red";
					bots[index].style.zIndex=2;
				}

			})
	}
	var box_t=getClass("box_t");
	var box_b=getClass("box_b");	
	for(var i=0;i<box_t.length;i++){
		toped=box_t[i].getElementsByClassName("word2");
		boted=box_b[i].getElementsByClassName("right");
		xuan2(toped,boted)
	}


	//顶部导航

	var navi=getClass("navi")[0];
	var words=getClass("word",navi)[0];
	var lise=getClass("word1",words);
	var navibg=$(".navi-bg")[0];
	var navihidden=getClass("navihidden",navibg)[0];
	var navibox=getClass("navibox",navihidden);

	Array.from(lise).forEach(function(val,index){
		val.onmouseenter=function(){
			for(var i=0;i<lise.length;i++){
				navibox[i].style.zIndex=1;
			}
			navibox[index].style.zIndex=2;
			navihidden.style.height="230px";
			navihidden.style.borderTop="1px solid #E0E0E0";
		}
		val.onmouseleave=function(){
			navihidden.style.height="0px";
		}
	})

	navihidden.onmouseenter=function(){
		this.style.height="230px";

	}
	navihidden.onmouseleave=function(){
		this.style.height="0";
		navihidden.style.borderTop="0";

	}

	//顶部搜索
	
	var search=$(".search",$(".navi")[0])[0];
	var input=search.querySelector("input");
	var submit=search.querySelector(".submit");
	var wenzi=search.querySelector(".wenzi");
	var none=search.querySelector(".none");

	var flag2=false;
	input.onfocus=function(){
		none.style.display="block";
		search.style.border="1px solid #ff6700";
		submit.style.borderLeft="1px solid #ff6700";
		wenzi.style.display="none";
		flag2=true;
	}
	input.onblur=function(){
		none.style.display="none";
		search.style.border="1px solid #E0E0E0";
		submit.style.borderLeft="1px solid #E0E0E0";
		wenzi.style.display="block";
		flag2=false;
	}

	search.onmouseenter=function(){
		if(flag2==true){
			search.style.border="1px solid #ff6700";
			submit.style.borderLeft="1px solid #ff6700";
		}else{
			search.style.border="1px solid #999";
			submit.style.borderLeft="1px solid #999";
		}
	}
	search.onmouseleave=function(){
		if(flag2==true){
			search.style.border="1px solid #ff6700";
			submit.style.borderLeft="1px solid #ff6700";
		}else{
			search.style.border="1px solid #E0E0E0";
			submit.style.borderLeft="1px solid #E0E0E0";
		}
	}




	// banner左侧
	
	var navileft=$(".navileft")[0];
	var bannerleft=$(".bannerleft",navileft)[0];
	var lises=$("li",bannerleft);
	var hiddenbox=$(".hiddenbox",navileft)[0];
	var hidden=$(".hidden",hiddenbox);
	Array.from(lises).forEach(function(val,index){
		val.onmouseenter=function(){
			for(var i=0;i<lises.length;i++){
				hidden[i].style.zIndex=1;
				lises[i].style.background="none";
			}
			hidden[index].style.zIndex=2;
			hiddenbox.style.display="block";
			this.style.background="#FF6700";
		}
		val.onmouseleave=function(){
			hiddenbox.style.display="none";
			this.style.background="none";
		}
	})

	hiddenbox.onmouseenter=function(){
		this.style.display="block";
	}
	hiddenbox.onmouseleave=function(){
		this.style.display="none";	
	}

	for(let i=0;i<hidden.length;i++){
		hidden[i].onmouseenter=function(){
			lises[i].style.background="#FF6700";
		}
		hidden[i].onmouseleave=function(){
			lises[i].style.background="none";
		}
	}


	//为你推荐

	var box=$(".right",$(".recom")[0])[0];
	var top=$(".top",$(".recom")[0])[0];
	var leftbtn2=$(".leftbtn",top)[0];
	var rightbtn2=$(".rightbtn",top)[0];
	var up=$(".up",box);

	for(var i=0;i<up.length;i++){
		if(i!=0){
			up[i].style.left="1226px";
		}
	}

	var now=0;
	var next=0;

	var flag=true;

	function tmove(a="r"){
		if(flag==false){
			return;
		}
		flag=false;
		if(a=="r"){                          
			next++;
			if(next>=up.length){
				next=up.length-1;
				flag=true;
				return ;
			}
			up[next].style.left="1226px";       
			animate(up[now],{left:"-1226"});
		}

		if(a=="l"){
			next--;
			if(next<0){
				next=0;
				flag=true;
				return;
			}
			up[next].style.left="-1226px";
			animate(up[now],{left:"1226"});
		}
		animate(up[next],{left:"0"},function(){
				flag=true;
			});
		now=next;

	}

	rightbtn2.onclick=function(){
		if(next==up.length-2){
		this.style.color="#ccc";
		}
		leftbtn2.style.color="black";
		tmove();
	}
	leftbtn2.onclick=function(){
		if(next==1){
		this.style.color="#ccc";
		}
		rightbtn2.style.color="black";
		tmove("l");
	}

	leftbtn2.onmouseenter=function(){
		if(next==0){
			this.style.color="#ccc";
		}else{
			this.style.color="#ff6700";
		}
	}

	rightbtn2.onmouseenter=function(){
		if(next==up.length-1){
			this.style.color="#ccc";
		}else{
			this.style.color="#ff6700";
		}
	}
	leftbtn2.onmouseleave=function(){
		if(next==0){
			this.style.color="#ccc";
		}else{
			this.style.color="black";
		}
	}
	rightbtn2.onmouseleave=function(){
		if(next==up.length-1){
			this.style.color="#ccc";
		}else{
			this.style.color="black";
		}
	}

	
   	//书
   	
   	
 	function bookmove(a){

		var changebox=$(".changebox",$(".book1")[a])[0];
		var change=$(".change",changebox);
		var btnbox=$(".dot",$(".book1")[a])[0];
		var btn=$(".btn",btnbox)
		var rightbtn3=$(".hidden-r",$(".book1")[a])[0];
		var leftbtn3=$(".hidden-l",$(".book1")[a])[0];

		for(var i=0;i<change.length;i++){
			if(i!=0){
				change[i].style.left="296px";
			}
		}

		var first=0;
		var second=0;
		var flag=true;

		function bmove(a="r"){
			if(!flag){
				return;
			}
			flag=false;

			if(a=="r"){
				second++;
				if(second>=change.length){
					second=change.length-1;
					flag=true;
					return;
				}
				change[second].style.left="296px";
				animate(change[first],{left:-296});
			}
			if(a=="l"){
				second--;
				if(second<0){
					second=0;
					flag=true;
					return;
				}
				change[second].style.left="-296px";
				animate(change[first],{left:296});
			}
			animate(change[second],{left:0},function(){
				flag=true;
			});
			btn[second].style.border="2px solid #FF6700";
			btn[second].style.background="#fff";
			btn[first].style.border="2px solid transparent";
			btn[first].style.background="#B0B0B0";
			first=second;
		}

		rightbtn3.onclick=function(){
			bmove();
		}
		leftbtn3.onclick=function(){
			bmove("l");
		}


		for(let i=0;i<btn.length;i++){
			btn[i].onmouseenter=function(){
			   if(i==second){
					btn[i].style.border="2px solid #FF6700";
			   		btn[i].style.background="#fff";
				}
				else{
					btn[i].style.background="#FF6700";
				}		
			}
			btn[i].onmouseleave=function(){
				if(i==second){
					btn[i].style.border="2px solid #FF6700";
			   		btn[i].style.background="#fff";
				}
				else{
					btn[i].style.border="2px solid transparent";
					btn[i].style.background="#B0B0B0";
				}
			}
		}


		for(let i=0;i<btn.length;i++){
			btn[i].onclick=function(){
				if(i<first){
					second=i+1;
					bmove("l");
				}
				if(i>first){
					second=i-1;
					bmove();
				}
			}
		}


		

	}

	var book1=$(".book1");
	for(var i=0;i<book1.length;i++){
		bookmove(i);
	};


	//明星单品
	
	var showbox2=$(".showbox2")[0];
	var rightarrow=$(".leftarrow",$(".staritem")[0])[0];
	var leftarrow=$(".rightarrow",$(".staritem")[0])[0];
	var arrowbox=$(".arrowbox",$(".staritem")[0])[0];


	var flag=true;
	function smove(){
		if(flag){
			showbox2.style.left="-1226px";
			leftarrow.style.color="black";
			rightarrow.style.color="#ccc";
		}else{
			showbox2.style.left="0px";
			leftarrow.style.color="#ccc";
			rightarrow.style.color="black";
		}
		flag=!flag;
	}

	var st=setInterval(function(){
		smove()
	},2000);

	arrowbox.onmouseenter=function(){
		clearInterval(st);
	}

	arrowbox.onmouseleave=function(){
		st=setInterval(function(){
		smove()
		},2000)
	}
	leftarrow.onmouseenter=function(){
		if(flag==false){
			leftarrow.style.color="#ff6700";
		}
	}
	rightarrow.onmouseenter=function(){
		if(flag==true){
			rightarrow.style.color="#ff6700";
		}
	}

	function aa(){
		if(flag){
			leftarrow.style.color="#ccc";
			rightarrow.style.color="black";
		}else{
			rightarrow.style.color="#ccc";
			leftarrow.style.color="black";
		}
	}
	leftarrow.onmouseleave=aa;
	rightarrow.onmouseleave=aa;


	rightarrow.onclick=function(){
		flag=true;
		smove();
	}
	leftarrow.onclick=function(){
		flag=false;
		smove();
	}








	







		
	





}