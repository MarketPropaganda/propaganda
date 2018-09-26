window.onload=function(){
//butterFly升级版3.0用于标签列表
	//selector1点击目标
	//selector2点击后联动目标
	//classname1，2号目标加类名以替换效果
	//classname2，1号点击目标加类名以切换点击效果
	//shijian增加了可修改事件功能并简化了部分代码
	//parents增加了可遍历多个同名父元素接口
	function butterFly(selector1,selector2,classname1,classname2,shijian,parents){
		//设置默认值
		classname1=classname1||'show';
		classname2=classname2||'selected';
		shijian=shijian||'onmouseover';
		// console.log(parents);
		parents=parents||document;
		//获取点击对象列表
		// console.log(parents);
		let f=parents.querySelectorAll(selector1);
		//获取联动对象列表
		let s=parents.querySelectorAll(selector2);
		//循环点击对象列表获取每一个value单位对象index下标值
		f.forEach((value,index)=>{
			//给每个点击对象添加指定事件
			value[shijian]=function(){
				//事件触发后循环点击对象组获取index
				f.forEach((value,index)=>{
					// 循环去除上次点击增加的类名
					s[index].classList.remove(classname1);
					f[index].classList.remove(classname2);
				});
				//为点击目标与联动目标增加类名以此改变效果
				s[index].classList.add(classname1);
				f[index].classList.add(classname2);
			}
		})
	}
	// banner右边标签栏
	butterFly('div.banner >div.containter >div.rside >ul.head >li','div.banner >div.containter >div.rside >ul.news','showf');
	// 必抢清单
	butterFly('div.djb >div.right >div.content >ol >li','div.djb >div.right >div.content >ul');
	//1~11楼标签栏
	// butterFly('','','show','selected','onmouseover');
	let floor11=document.querySelectorAll('div.fzbh');
	floor11.forEach((value,index)=>{
		// console.log(value,index);
		butterFly('div.title >ul >li','div.wroplist','show','selected','onmouseover',value);
	});
	// 十二楼标签栏
	butterFly('div.tsyxf12 >div.title >ul >li','div.tsyxf12 >div.wroplist','showf');
	
	// 标签部分结束
	
	
// banner开始
	// bannerOpacity用于不透明度变化的banner
	// box轮播图容器
	// imgs轮播图片容器集合
	// navs轮播导航点集合
	// btnr轮播右按钮
	// btnl轮播左按钮
	// parent轮播板块父元素用于同结构轮播复制后遍历分别绑定
	// time设置轮播图切换时间
	function bannerOpacity(box,imgs,navs,btnr,btnl,parent,time){
		// 设置parent默认值
		parent=parent||document;
		// 设置时间默认值
		time=time||4000;
		// 轮播下标计数器
		let n=0;
		// 轮播图容器
		let banbox=parent.querySelector(box);
		// 轮播图片容器集合
		let banli=parent.querySelectorAll(imgs);
		// 轮播导航点集合
		let banoli=parent.querySelectorAll(navs);
		// 轮播右按钮
		let ban_r=parent.querySelector(btnr);
		// 轮播左按钮
		let ban_l=parent.querySelector(btnl);
		// 设置开关
		let flag=true;
		// 轮播导航点等待时间
		let wt;
		// 轮播定时器
		let t=setInterval(move,time);
			// 轮播图运动函数
		function move(back=''){	
			switch(back){
				// 当传入值为空时轮播向右运行n超过最大值设为0
				case '':
				n+=1;	
				if(n>=banli.length){
					n=0;
				}
				break;
				// 当传入值为‘back’时轮播向右运行n超过0值设置为最大值
				case 'back':
				n-=1;	
				if(n<0){
					n=banli.length-1;
				}
				break;			
			}
			//遍历去除类名
			banli.forEach((value,index)=>{
				banli[index].classList.remove('showo')
				banoli[index].classList.remove('selected')
			});
			//将类名加到与n值相同下标的图片容器与导航点以显示样式
			banli[n].classList.add('showo')
			banoli[n].classList.add('selected')
		}
		// 鼠标进入banner区域清除定时器
		banbox.onmouseover=function(){
			clearInterval(t);
		}
		// 鼠标离开banner区再次启动定时器
		banbox.onmouseout=function(){
			t=setInterval(move,time);
		}
		// 点击右按钮执行移动函数
		ban_r.onclick=function(){
			//检测开关如果打开则关闭并执行函数
			if(flag){
				flag=false;
				move();
			}			
		}
		// 点击左按钮执行移动函数（反向）
		ban_l.onclick=function(){
			//检测开关如果打开则关闭并执行函数
			if(flag){
				flag=false;
				move('back');
			}
		}
		// 导航点分别绑定事件
		banoli.forEach((value,index)=>{
			value.onmouseover=function(){
				// 设置延迟函数防止误触发
				wt=setTimeout(function(){
					// 重新给n赋值
					n=index;
					// 直接调用移动函数
					move('mouseover');		
				},200);					
			}
			//清除延时定时
			value.onmouseout=function(){
				clearTimeout(wt);
			}
		});
		// 重置开关标志flag
		banli.forEach((value,index)=>{
			value.addEventListener('transitionend',function(){
				flag=true;
			});
		});
	}
	// 大banner
	bannerOpacity('div.banner >div.banner-m','div.banner >div.banner-m >ul >li','div.banner >div.banner-m >ol >li','div.banner >div.banner-m >a.bbtn-r','div.banner >div.banner-m >a.bbtn-l');
	//11小banner
	let banner11=document.querySelectorAll('div.fzbh');
	banner11.forEach((value,index)=>{		
	bannerOpacity('div.wroplist >div.middle >div.banner-x','div.wroplist >div.middle >div.banner-x >ul >li','div.wroplist >div.middle >div.banner-x >ol >li','div.wroplist >div.middle >div.banner-x >a.right','div.wroplist >div.middle >div.banner-x >a.left',value);
	});



// 顶部广告
	// 广告容器
	let ad=document.querySelector('.top-ad');
	// 广告关闭按钮
	let cloAd=document.querySelector('.top-ad>a:last-child');
	// 广告打开按钮
	let opeAd=document.querySelector('.top-ad>a:nth-child(2)');
	// 点击关闭容器高为0关闭按钮消失打开按钮显示
	cloAd.onclick=function(){
		ad.style.height='0';
		cloAd.style.display="none";
		opeAd.style.display="block";
	}
	// 点击打开容器高为100px打开按钮消失关闭按钮显示
	opeAd.onclick=function(){
		ad.style.height='100px';
		opeAd.style.display="none";
		cloAd.style.display="block";
	}
// 搜索框获取焦点事件
hotSearch('div.header > div.container > div.search input[type="text"]','div.header >div.container >div.search form >div.ss','271px');
function hotSearch(sinput,searchbox,boxheight){
	// input获取焦点用
	let input=document.querySelector(sinput);
	let inputv=input.value;
	//获取焦点时显示框
	let hotSearch=document.querySelector(searchbox);
	let kg=true;
	let kg2=true;
	input.onfocus=function(){
		kg2=false;
		input.value='';
		hotSearch.style.height=boxheight;
		hotSearch.style.border='1px solid rgb(239,239,239)';
	}
	input.onblur=function(){
		kg2=true;
		input.value=inputv;
		if(kg){
			hotSearch.style.height='0';
			hotSearch.style.border='0';
		}
	}
	hotSearch.onmouseover=function(){
			kg=false;			
			hotSearch.style.height=boxheight;
			hotSearch.style.border='1px solid rgb(239,239,239)';		
	}
	hotSearch.onmouseout=function(){
			kg=true;
		if (kg2) {
			hotSearch.style.height='0';
			hotSearch.style.border='0';
		}
	}
}
//返回顶部练手
	let backTop=document.querySelector('div.sidebar >div.service >a:nth-child(4)');
	backTop.onclick=function(){
		animate(document.body,{scrollTop:0},800);
		animate(document.documentElement,{scrollTop:0},800);
	}
// 工程量巨大的楼层跳转
	// 核心属性
	// scrolTop   webkit document.body.scrollTop
	//            moz    document.documentElement.scrollTop
	// scrolLeft  webkit document.body.scrollLeft
	//            moz    document.documentElement.scrollLeft
	// console.log(document.body.scrollTop);
	// console.log(document.body.scrollLeft);
	// 计算公式
	// 出现位置 obj.offsetTop==screen.height+scrollTop
	// 消失位置 obj.offsetTop==scrollTop
	// 楼层前11层、12、13
	let fool11s=document.querySelectorAll('div.fzbh');
	let fool12=document.querySelector('div.tsyxf12');
	let fool13=document.querySelector('div.cnxh');
	// 合并全楼层数组
	let fools=[...fool11s];
		fools.push(fool12);
		fools.push(fool13);
	fooljump('ul.fool','ul.fool >li','div.foot',fools,'current')
	function fooljump(navbox,navs,navbottom,fools,navclass){
		// 楼层导航容器
		let fnavbox=document.querySelector(navbox);
		// 楼层导航
		let fnavs=document.querySelectorAll(navs);
		// 底部离顶部距离
		let footot=document.querySelector(navbottom).offsetTop;
		let flag=true;
		// 全部楼层离顶部距离数组
		let foolsT=fools.map((value)=>{
			return value.offsetTop;
		});
		// console.log(fool13.offsetTop);
		// console.log(fool11s,fool12,fool13);
		// console.log(foolsT);
		// 楼层跳转选项卡的显示与隐藏
		function foolnavset(){
			// 获取滚条里顶部距离
			let obj=document.body.scrollTop ? document.body:document.documentElement;
			let sTop=obj.scrollTop;
			// console.log(obj.scrollTop);
			// 楼层跳转选项卡的显示与隐藏楼层范围内显示其余隐藏
			if((sTop+screen.height>foolsT[0])&&(sTop+screen.height<footot)){
				fnavbox.style.display='block';
			}else{
				fnavbox.style.display='none';
			}
			// 楼层对应选项卡变色
			foolsT.forEach((value,index)=>{
				if(flag){
					// 滚条离顶部距离超过某楼层离顶部距离即表示到达该楼层开始消失位置-150为了降低高度让我看着顺眼— —#！！
					if(sTop>value-150){
						fnavs.forEach((value)=>{
							value.classList.remove(navclass);					
						});
						fnavs[index].classList.add(navclass);					
					}
				}
			});		
		}
		foolnavset();
		// 随着滚条位置改变调用函数调整选项卡显示内容
		// window.onscroll=function(){
		// 	foolnavset();
		// }
		window.addEventListener('scroll',foolnavset,false);
		// 选项卡点击对应楼层跳转	
		fnavs.forEach((value,index)=>{
			value.onclick=function(){
				// 点击改变选项卡样式
				fnavs.forEach((value)=>{
						value.classList.remove(navclass);					
					});
				fnavs[index].classList.add(navclass);
				// 关闭开关使得foolnavset()被屏蔽跳转时不触发滚动效果		
				flag=false;
				// 点击后将滚条高度设置为对应楼层高度
				animate(document.body,{scrollTop:foolsT[index]-100},500,function(){
					flag=true;
				})
				animate(document.documentElement,{scrollTop:foolsT[index]-100},500,function(){
					flag=true;
				})					
			}
		})
	}
// 开始遮罩扫码
	let closesys=document.querySelector('div.zhezhao >div.sys >span');
	let zzsys=document.querySelector('div.zhezhao');
	closesys.onclick=function(){
		zzsys.style.display='none';
	}
// banner旁标签栏
goodslist('div.nav >div.container >div.allgoods >div.aside','div.nav >div.container >div.allgoods >div.aside >ul >li','div.nav >div.container >div.allgoods >div.goodslist');
goodslist('div.fixedSearch >div.allgoods >div.aside','div.fixedSearch >div.allgoods >div.aside >ul >li','div.fixedSearch >div.allgoods >div.goodslist');
function goodslist(navbox,nav,lists){
	let goodsnavbox=document.querySelector(navbox)
	let goodslists=document.querySelectorAll(lists)
	// butterFly('','','show','selected','onmouseover');
	butterFly(nav,lists);
	goodsnavbox.onmouseout=function(){
		goodslists.forEach((value)=>{
			value.classList.remove('show');
		});
	}
	goodslists.forEach((value,index)=>{
		value.onmouseover=function(){
			value.classList.add('show');
		};
		value.onmouseout=function(){
			value.classList.remove('show');
		};		
	});
}
// 下滑搜索框
	let fixedTop=document.querySelector('div.fixedSearch');
	let star=document.querySelector('div.dtlb').offsetTop;
	window.addEventListener('scroll',fixTop,false);
	function fixTop(){
		let obj=document.body.scrollTop ? document.body : document.documentElement;
		let scrollT=obj.scrollTop;
		if (scrollT>star) {
			fixedTop.style.top='0';
		}else{
			fixedTop.style.top='-50px';

		}
	}
// 多图轮播
	let dbbtnl=document.querySelector('div.dtlb >a.dtbtn-l');
	let dbbtnr=document.querySelector('div.dtlb >a.dtbtn-r');
	let dbbox=document.querySelector('div.dtlb >ul');
	console.log(dbbtnl,dbbtnr,dbbox);
	let dbn=0;
	let dbw=-1200;
	dbbtnr.onclick=function(){
		dbn+=1;
		if(dbn>2){
			dbn=0;
		}
		dbbox.style.left=dbw*dbn+'px';
	}
	dbbtnl.onclick=function(){
		dbn-=1;
		if(dbn<0){
			dbn=2;
		}
		dbbox.style.left=dbw*dbn+'px';
	}

}