!function($) {
    "use strict";

}(window.jQuery),
//initializing 
function($) {
    "use strict";
	
	// var is_finished = false;
	
	$("#select_id").change(function(){
		
		var text = $("#select_id").find("option:selected").text();
		
		var options=$("#select_id option:selected");
		var value_ = options.val();
		
		if(value_ != "example"){
			$("#textarea").text(text);		
		}
	});
		
    $("#text-confirm").click(function(){
        // var text = $("#select_id").find("option:selected").text();
		
		// var text = $("#textarea").val();
		
		var text = $("#textarea").val();
		// $("#textarea").text(text);	
		
        if(text != ""){
            alertify.logPosition("bottom right");
            alertify.success("Success! Check the results!");
            Func_Extration(text);
            $("#div_head_visualization").fadeIn(3000);
            $("#div_visualization").fadeIn(3000);
            $("#div_bargraph_whole").fadeIn(4000);
        }
        else{
            alertify.logPosition("bottom right");
            alertify.error("Empty Input");
        }
		
    });
	
	function Is_Chinese(v){
		var re = new RegExp("[\\u4E00-\\u9FFF]+","g");       
		if (re.test(v)){
        	return true;
        }
		return false;
	}

    function Func_Extration(text) {

        echarts.init(document.getElementById('div_bargraph')).dispose();
        echarts.init(document.getElementById('div_graph')).dispose();
        $("#myTable").remove();

        // alert(text); 
        var request_url;
		var chinese_;
		// alert(Is_Chinese(text));
		if(Is_Chinese(text)){
			request_url = "http://openue.top:8888/IEDemo?q=" + text;
			chinese_ = true;
		}
		else{
			request_url = "http://openue.top:8887/IEDemo?q=" + text;
			chinese_ = false;

		}
		
		// if(is_finished == false){
		// 	is_finished = true;
		    
			$.get(request_url, function(data){
				// console.log(data);
				// console.log(data);
				var data_ = JSON.parse(data);
				Func_DrawTable(data_, chinese_);

			});
		
		// 	$('#text-confirm').text("Refresh");
		// }
		// else{
		// 	$(window).attr('location','text2triples.html');
		// }
		
    };

    function Func_DrawTable(data, chinese_){
        // 可视化表格
        var new_table = $("<table class=table table-striped id=myTable></table>");
        // new_table.append('<caption>基本的表格布局</caption>');
		if(chinese_ == true){
			new_table.append('<thead><tr> <th>subject</th> <th>subject_type</th> <th>predicate</th> <th>object</th> <th>object_type</th> </tr></thead>');
        }
		else{
			new_table.append('<thead><tr> <th>subject</th> <th>predicate</th> <th>object</th> </tr></thead>');
		}
		new_table.append('<tbody id=tbody></tbody>');
        $('#my_table').after(new_table);

        // console.log(data);
        // console.log(data[0]);
        // console.log(data[0].spo_list);
        var bar_input = data[0].class_prob;
        var graph_input = data[0].spo_list;
        var tmpt = null;

        for(var i in data[0].spo_list){
            tmpt = data[0].spo_list[i];
            console.log(tmpt.object);
            
            var html_ = $("<tr></tr>");
			
			if(chinese_ == true){
				html_.append("<td>" + tmpt.subject + "</td>");
				html_.append("<td>" + tmpt.subject_type + "</td>");
				html_.append("<td>" + tmpt.predicate + "</td>");
				html_.append("<td>" + tmpt.object+ "</td>");
				html_.append("<td>" + tmpt.object_type + "</td>");
            }
			else{
				html_.append("<td>" + tmpt.subject + "</td>");
				html_.append("<td>" + tmpt.predicate + "</td>");
				html_.append("<td>" + tmpt.subject + "</td>");
			}
			
			html_.appendTo('#tbody');
        }

        Func_DrawGraph(graph_input);
        Func_DrawBarGraph(bar_input);
    }   

    function Func_DrawGraph(graph_input){
        // 	可视化图，KG
        var x = document.getElementById("div_graph");
        // console.log(x);
        // console.log(y);···
        // console.log(z);
        if(x != null){
            // console.log('57587');

            var myChart = echarts.init(document.getElementById('div_graph'));

            // 处理得到relations和entities
            var relations = new Array();
            var entities = new Array(); 

            var entity_set = new Set();
            var dic = {"人物":0, "Date":1, "影视作品":2, "企业":3}
            // var cato_tmp;
            var _object;
            var _object_type;
            var _predicate;
            var _subject;
            var _subject_type;

            for(var i in graph_input){
                _object = graph_input[i].object;
                _object_type = graph_input[i].object_type;
                _predicate = graph_input[i].predicate;
                _subject = graph_input[i].subject;
                _subject_type = graph_input[i].subject_type;
                
                var entity_tmp1 = {name: _object, des: _object_type,  itemStyle:{normal:{color: 'grey'}} };
                var entity_tmp2 = {name: _subject, des: _subject_type,  itemStyle:{normal:{color: 'grey'}} };
                

                // var entity_tmp1 = {name: _object, des: _object_type, symbolSize:100,  itemStyle:{normal:{color: 'grey'}} };
                // var entity_tmp2 = {name: _subject, des: _subject_type, symbolSize:100,  itemStyle:{normal:{color: 'grey'}} };
                
                // cato_tmp = dic[_object_type];
                // if(cato_tmp == null){ cato_tmp = 4};
                // var entity_tmp1 = {name: _object, des: _object_type, symbolSize:100, category=cato_tmp};
                
                // cato_tmp = dic[_subject_type];
                // if(cato_tmp == null){ cato_tmp = 4 };
                // var entity_tmp2 = {name: _subject, des: _subject_type, symbolSize:100, category=cato_tmp};

                var relation_tmp = {source: _object , target: _subject, name: _predicate, des: "关系"};

                if(entity_set.has(entity_tmp1.name)){

                }
                else{
                    entities.push(entity_tmp1);
                    entity_set.add(entity_tmp1.name);
                }

                if(entity_set.has(entity_tmp2.name)){

                }
                else{
                    entities.push(entity_tmp2);
                    entity_set.add(entity_tmp2.name);
                }

                relations.push(relation_tmp);
            }

            console.log(entities);
            console.log(relations);

            var option = {
                // title: { text: '关系图谱' },
                tooltip: {
                    formatter: function (x) {
                        return x.data.des;
                    }
                },
                series: [
                {
                    type: 'graph',
                    layout: 'force',
                    symbolSize: 50,
                    roam: true,
                    edgeSymbol: ['circle', 'arrow'],
                    edgeSymbolSize: [4, 10],
                    edgeLabel: {
                        normal: {
                            textStyle: {
                                fontSize: 20
                            }
                        }
                    },
                    force: {
                        repulsion: 2500,
                        edgeLength: [1, 2]
                    },
                    draggable: true,
                    // itemStyle: {
                        // normal: {
                            // color: '#4b565b'
                        // }
                    // },
                    lineStyle: {
                        normal: {
                            width: 2,
                            color: '#4b565b'

                        }
                    },
                    edgeLabel: {
                        normal: {
                            show: true,
                            formatter: function (x) {
                                return x.data.name;
                            }
                        }
                    },
                    label: {
                        normal: {
                            show: true,
                            textStyle: {
                            }
                        }
                    },
                    data: entities,
                    links: relations,
                    }
                ]
            };

            myChart.setOption(option);

        }
						

    }

    function Func_DrawBarGraph(bar_input){
        var myChart = echarts.init(document.getElementById('div_bargraph'));
        var yMax = 1;
        var data = bar_input;
        var dataShadow = [];
        var dataAxis = new Array();

        for (var i = 0; i < data.length; i++) {
            dataShadow.push(yMax);
            dataAxis[i] = i + "";
        }

        var option = {
            // title: {
            //     text: '特性示例：渐变色 阴影 点击缩放',
            //     subtext: 'Feature Sample: Gradient Color, Shadow, Click Zoom'
            // },
            xAxis:
             {
                data: dataAxis,
                axisLabel: {
                    inside: true,
                    textStyle: {
                        color: '#fff',
                    },
                    fontSize: 10
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                z: 10
            },
            yAxis: {
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    textStyle: {
                        color: '#999'
                    }
                }
            },
            dataZoom: [
                {
                    type: 'inside'
                }
            ],
            series: [

                {
                    type: 'bar',
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: '#83bff6'},
                                {offset: 0.5, color: '#188df0'},
                                {offset: 1, color: '#188df0'}
                            ]
                        )
                    },
                    emphasis: {
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    {offset: 0, color: '#2378f7'},
                                    {offset: 0.7, color: '#2378f7'},
                                    {offset: 1, color: '#83bff6'}
                                ]
                            )
                        }
                    },
                    data: data
                }
            ]
        };

        // Enable data zoom when user click bar.
        var zoomSize = 6;
        myChart.on('click', function (params) {
            console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
            myChart.dispatchAction({
                type: 'dataZoom',
                startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
                endValue: dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
            });
        });

        myChart.setOption(option);
    }

}(window.jQuery);

