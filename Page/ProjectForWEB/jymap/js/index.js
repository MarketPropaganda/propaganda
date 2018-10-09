
var stopCar = {
    //Header update Time
    updateTime:function(){
        var $time = $("#header .time");
        var $date = $("#header .date");
        var flag = false;
        updateTime();
        function updateTime(){
            var date = new Date();
            if(!flag){
                var nowDate = date.getFullYear() + "年" + (date.getMonth()+1<10? '0'+(date.getMonth()+1):(date.getMonth()+1))+"月"+(date.getDate()<10?'0'+date.getDate():date.getDate)+"日";
                $date.html(nowDate);
                flag = true;
            }
            var h = date.getHours();
            var m = date.getMinutes();
            var s = date.getSeconds();
            if(m==0&&h==0&&s==0){
                flag = false;
            }
            var nowTime = [h<10?'0'+h:h,m<10?'0'+m:m,s<10?'0'+s:s].join(':');
            $time.html(nowTime);
        }
        var t = setInterval(updateTime,1000);
        return this;
    },
    //停车时长
    stopLength:function(){
        var data = [{"name":"15000","total":100,"ratio":50},{"name":"14000","total":100,"ratio":50},{"name":"12000","total":100,"ratio":50},{"name":"13000","total":100,"ratio":50},{"name":"11000","total":100,"ratio":50}];
        function getData(data){
            var d = [];
            for(let i=0;i<data.length;i++){
                d.push({name:data[i].name,value:data[i].total})
            }
            return d;
        }
        var $stopLengthPip= $(".stop-lenth .pip");
        var myChart = echarts.init($stopLengthPip[0]);
        var option = null;
        option = {
            color:['#fbff86','#ff6f6f','#ab6eff','#1dd7ff','#7dff89'],
            tooltip: {
                trigger: 'item',
                formatter: "<div>薪资：{b}</div> <div>人数：{c} </div><div>占比：{d}%</div>"
            },
            series: [
                
                {
                    name:'当前停车时长比例',
                    type:'pie',
                    radius: ['50%', '70%'],
                    label: {
                        show:true,
                        position: 'outside',
                        fontSize:12
                    },
                    labelLine: {
                        show: true
                    },
                    data:getData(data)
                }
            ]
        }
        if(option){
            myChart.setOption(option, true);
        }
        return this;
    },
    //设备警告
    deviceWarning:function(){
        //自动滚动
        
       $(window).load(function(){
            var $deviceList = $(".device-list");
            var $deviceListBox = $('.device-list-box');
            var deviceListHeight = $deviceList.height();
            var deviceListBoxHeight = $deviceListBox.height();
            console.log(deviceListBoxHeight)
            var top = 0;
            var deviceT = setInterval(slideMove,100)

            function slideMove(){
                
                top--;
                if(Math.abs(top)>(deviceListBoxHeight-deviceListHeight)){
                    top = 0;
                }
                $deviceListBox.css({
                    top:top+'px'
                })
            }
            $deviceList.hover(function(){
                clearInterval(deviceT);
            },function(){
                deviceT = setInterval(slideMove,100)
            })
       })
       return this;
    },
    //昨日运营情况
    yesterdayInfo:function(){
        $(window).load(function(){
            var $yestdayList = $(".info-list");
            var $yestdayListBox = $('.info-list-box');
            var yestdayListHeight = $yestdayList.height();
            var yestdayListBoxHeight = $yestdayListBox.height();
            console.log(yestdayListBoxHeight)
            var top = 0;
            var yestdayT = setInterval(slideMove,100)
            function slideMove(){
                top--;
                if(Math.abs(top)>(yestdayListBoxHeight-yestdayListHeight)){
                    top = 0;
                }
                $yestdayListBox.css({
                    top:top+'px'
                })
            }
            $yestdayList.hover(function(){
                clearInterval(yestdayT);
            },function(){
                yestdayT = setInterval(slideMove,100)
            })
       }) 
       return this;
    },
    //停车照片
    stopPhoto:function(){
        $(window).load(function(){
            var $stopPhoto = $(".stop-photo");
            var $stopBox = $('.stop-box');
            var $lis = $stopBox.find('li'); 
            var stopPhotoWidth = $stopPhoto.width();
            var stopBoxWidth = ($lis.length)*($lis[0].offsetWidth+5)+5;
            console.log($lis[0].offsetWidth+5)
            console.log(stopBoxWidth)
            console.log(stopPhotoWidth)
            $stopBox.css({width:stopBoxWidth+'px'});
            var left = 0;
            var stopT = setInterval(slideMove,100)
            function slideMove(){
                left--;
                if(Math.abs(left)>(stopBoxWidth-stopPhotoWidth)){
                    left = 0;
                }
                $stopBox.css({
                    left:left+'px'
                })
            }
            $stopPhoto.hover(function(){
                clearInterval(stopT);
            },function(){
                stopT = setInterval(slideMove,100)
            })
       }) 
       return this;
    },
    //停车收费排行
    stopTop:function(){
        var $stopPayType= $(".stop-top .stop-pay-type");
        var $stopPayTime = $(".stop-top .stop-pay-time");
        var stopPayTimeOption = {
            color:['#b8e3ff','#009cff'],
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'horizontal',
                bottom: 15,
                itemWidth:5,
                data:['提前缴费','出口缴费'],
                textStyle:{
                    color:'#839bb0'
                }
            },
            series: [
                {
                    name:'缴费情况',
                    type:'pie',
                    center:['50%','40%'],
                    radius: ['45%', '65%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '14',
                                // fontWeight: 'bold'
                            }
                        }
                    },
                    data:[
                        {value:120, name:'提前缴费',selected:true},
                        {value:310, name:'出口缴费'}
                    ]
                }
            ]
        };
        var stopPayTypeOption = {
            color:['#fffbbe','#ffbd3d'],
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'horizontal',
                bottom: 15,
                itemWidth:5,
                data:['现金缴费','电子缴费'],
                textStyle:{
                    color:'#839bb0'
                }
            },
            series: [
                {
                    name:'缴费类型',
                    type:'pie',
                    radius: ['45%', '65%'],
                    center:['50%','40%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '14'
                            }
                        }
                    },
                    data:[
                        {value:35, name:'现金缴费',selected:true},
                        {value:310, name:'电子缴费'}
                    ]
                }
            ]
        };
        $(window).load(function(){
            var stopPayTypeChart = echarts.init($stopPayType[0]);
            var stopPayTimeChart = echarts.init($stopPayTime[0]);
            if(stopPayTypeOption){
                stopPayTypeChart.setOption(stopPayTypeOption, true);
            }
            if(stopPayTimeOption){
                stopPayTimeChart.setOption(stopPayTimeOption,true)
            }
        })
        return this;
    },
    //中间地图
    showMap:function(){
        var data = [
            {name: '青岛', value: 18,num:4532123,min:6000,max:12000},
            {name: '厦门', value: 26,num:4545,min:7000,max:12000},
            {name: '东莞', value: 36,num:456,min:5000,max:14000},
            {name: '广州', value: 38,num:456,min:6000,max:14000},
            {name: '太原', value: 39,num:456,min:4000,max:14000},
            {name: '深圳', value: 41,num:786,min:5000,max:14000},
            {name: '珠海', value: 42,num:123,min:8000,max:14000},
            {name: '大连', value: 47,num:345,min:5000,max:14000},
            {name: '沈阳', value: 50,num:1237,min:6000,max:14000},
            {name: '长春', value: 51,num:786,min:7000,max:14000},
            {name: '吉林', value: 56,num:453,min:8000,max:14000},
            {name: '成都', value: 58,num:123,min:9000,max:14000},
            {name: '西安', value: 61,num:452,min:7000,max:14000},
            {name: '重庆', value: 66,num:122,min:8000,max:14000},
            {name: '南京', value: 67,num:543,min:4000,max:14000},
            {name: '北京', value: 79,num:123,min:4000,max:14000},
            {name: '杭州', value: 84,num:453,min:5000,max:14000},
            {name: '济南', value: 92,num:88888,min:6000,max:14000},
            {name: '兰州', value: 99,num:8576,min:7000,max:14000},
            {name: '天津', value: 105,num:1235,min:8000,max:14000},
            {name: '郑州', value: 113,num:3353,min:6000,max:14000},
            {name: '哈尔滨', value: 114,num:12345,min:8000,max:14000},
            {name: '石家庄', value: 147,num:875,min:8000,max:14000},
            {name: '长沙', value: 175,num:8534,min:8000,max:14000},
            {name: '合肥', value: 229,num:123,min:8000,max:14000},
            {name: '武汉', value: 273,num:6353,min:8000,max:14000},
            {name: '上海', value: 25,num:78545,min:8000,max:14000}
       ];
       var geoCoordMap = {
           '青岛':[120.33,36.07],
           '厦门':[118.1,24.46],
           '东莞':[113.75,23.04],
           '广州':[113.23,23.16],
           '太原':[112.53,37.87],
           '深圳':[114.07,22.62],
           '珠海':[113.52,22.3],
           '大连':[121.62,38.92],
           '沈阳':[123.38,41.8],
           '长春':[125.35,43.88],
           '吉林':[126.57,43.87],
           '成都':[104.06,30.67],
           '西安':[108.95,34.27],
           '重庆':[106.54,29.59],
           '南京':[118.78,32.04],
           '北京':[116.46,39.92],
           '杭州':[120.19,30.26],
           '济南':[117,36.65],
           '兰州':[103.73,36.03],
           '天津':[117.2,39.13],
           '郑州':[113.65,34.76],
           '哈尔滨':[126.63,45.75],
           '石家庄':[114.48,38.03],
           '长沙':[113,28.21],
           '合肥':[117.27,31.86],
           '武汉':[114.31,30.52],
           '上海':[121.48,31.22]
       };
        
        var convertData = function (data) {
            var res = [];
            for (var i = 0; i < data.length; i++) {
                var geoCoord = geoCoordMap[data[i].name];
                if (geoCoord) {
                    res.push({
                        name: data[i].name,
                        value: geoCoord.concat(data[i].value),
                        num:data[i].num,
                        min:data[i].min,
                        max:data[i].max
                    });
                }
            }
            return res;
        };
        
        var mapOption = {
            tooltip: {
                trigger: 'item',
                borderColor:"rgb(74, 223, 255)",
                alwaysShowContent:true,
                borderWidth:1,
                padding:20,
                position:'left',
                formatter: function (params) {
                    console.log(params.data);
                    console.log(params.data.min);
                    // return params.name + ' : ' + params.value[2];
                    return `<div class="modal">
                        <h2>${params.data.name}</h2>
                        <div class="text">就业人数</div>
                        <div class="money">${params.data.num}</div>
                        <div class="car">
                            <div class="left">
                                <span>最高薪资</span>
                                <span>${params.data.max}</span>
                            </div>
                            <div class="right">
                                <span>最低薪资</span>
                                <span>${params.data.min}</span>
                            </div>
                        </div>
                        <div class="bottom">
                            <div style="width:100px;height:1px;"></div>
                            <div style="width:100px;height:1px;"></div>
                        </div>
                    </div>`
                }
            },
            legend: {
                orient: 'vertical',
                y: 'bottom',
                x:'right',
                data:['pm2.5'],
                textStyle: {
                    color: '#fff'
                }
            },
            geo: {
                type:'scatter',
                map: 'china',
                zoom:5.5,
                layoutCenter: ['50%', '50%'],
                layoutSize:100,
                roam:false,
                label: {
                    emphasis: {
                      //    是否显示鼠标移入省份的时候显示出省份名称
                        show: true
                    }
                 },
                itemStyle: {
                    normal: {                   
                        areaColor: '#194e7c',
                        borderColor: '#111'
                    },
                    emphasis: {                 
                        areaColor: '#52a8eb'
                    }
                }
            },
            series: [
                {
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    data: convertData(data),
                    symbolSize: function (val) {
                        return val[2] / 10;
                    },
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            show: false
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#ed3e3e'
                        }
                    }
                },
                {
                    name: 'Top5',
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    data: convertData(data.sort(function (a, b) {
                        return b.value - a.value;
                    }).slice(0, 27)),
                    symbolSize: function (val) {
                        return val[2] / 10;
                    },
                    showEffectOn: 'render',
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    hoverAnimation: true,
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#4affd2',
                            shadowBlur: 10,
                            shadowColor: '#873b4b'
                        }
                    },
                    zlevel: 1
                }
            ]
        }
        window.onload = function(){
            var mapChart = echarts.init($('.map')[0]);
            if(mapOption){
                mapChart.setOption(mapOption);
                window.onresize = mapChart.onresize;  
            }
        }
        return this;
    }
}
stopCar.updateTime().stopLength().deviceWarning().yesterdayInfo().stopPhoto().stopTop().showMap();
