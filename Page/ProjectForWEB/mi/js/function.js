
function getClass(classname,obj){
	var obj=obj||document;
	if(obj.getElementsByClassName){
		return obj.getElementsByClassName(classname);
	}
	else{
		var all=obj.getElementsByTagName("*");
		var arr=[];
		for(var i=0;i<all.length;i++){
			if(check(all[i].className,classname)){
				arr.push(all[i]);
			}
		}
		return arr;
	}

}

function check(newarr,classname){
	var arry=newarr.split(" ");
	for(var i=0;i<arry.length;i++){
		if(arry[i]==classname){
			return true;
		}
	}
	return false;

}

//***********************************************************

//获取多种元素的函数


function $(select,obj=document){

		if(typeof select=="string"){                //判断select是否为字符串
			var select=select.trim();                   //去除传入字符串两端的空格
			if(select.charAt(0)=="."){                  // charAt(0),获取字符串第一个字符

				   //slice(1),截取字符串，从第二个元素截取字符串，包含第二个元素

				return obj.getElementsByClassName(select.slice(1))

			}else if(select.charAt(0)=="#"){

				return obj.getElementById(select.slice(1))

			}else if(/^[a-z|1-6]{1,10}/.test("select")){          //筛选是传入的为字符标签

				// console.log(/^[a-z|1-6]{1,10}/.test("select"))

				return obj.getElementsByTagName(select)
			}
		}else if(typeof select=="function"){              //判断传入的是否为函数，

			window.onload=function(){                      //如果是函数，则在window.load后调用函数
				select();
			}
		}
	}

	