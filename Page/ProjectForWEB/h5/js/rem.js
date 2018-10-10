// 设计稿宽度
var designWidth = 750;

function resize(){
	// 设备宽度
    var clientWidth = document.documentElement.clientWidth;

    // 设置html标签的font-size
    document.documentElement.style.fontSize = (clientWidth/designWidth*100)+"px";
}
resize();
window.onresize = resize;