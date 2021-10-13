
!function($) {
    "use strict";

}(window.jQuery),
//initializing 
function($) {
    "use strict";

	// var is_finished = false;

    $("#alertify-success-1").click(function(){
        var div_id = 1;

        Func_Extration(div_id);
 
        $("#div_head_visualization").fadeIn(3000);
        $("#div_visualization").fadeIn(3000);
        $("#div_bargraph_whole").fadeIn(4000);

        // alertify.logPosition("bottom right");
        // alertify.success("Success! Check the results!");

    });

    
    $("#alertify-success-2").click(function(){
        var div_id = 2;

        Func_Extration(div_id);
 
        $("#div_head_visualization").fadeIn(3000);
        $("#div_visualization").fadeIn(3000);
        $("#div_bargraph_whole").fadeIn(4000);

        // alertify.logPosition("bottom right");
        // alertify.success("Success! Check the results!");

    });
    
    $("#alertify-success-3").click(function(){
        var div_id = 3;

        Func_Extration(div_id);
 
        $("#div_head_visualization").fadeIn(3000);
        $("#div_visualization").fadeIn(3000);
        $("#div_bargraph_whole").fadeIn(4000);

        // alertify.logPosition("bottom right");
        // alertify.success("Success! Check the results!");

    });
    
	// function Is_Chinese(v){
	// 	var re = new RegExp("[\\u4E00-\\u9FFF]+","g");       
	// 	if (re.test(v)){
    //     	return true;
    //     }
	// 	return false;
	// }

    function Func_Extration(div_id) {

        echarts.init(document.getElementById('div_graph')).dispose();
        $("#inserted_text").remove();
        $("#myTable").remove();


		// alert(div_id);
        if(div_id != null){
            var text = $("#" + "paragraph_" + div_id).text();
            // alert(text); 
			var request_url;
			// if( Is_Chinese(text) == false){
			// 	request_url = "http://localhost:8887/test?q=" + text;
			// 	chinese_ = false;
			// }
			// else{
			// 	request_url = "http://localhost:8887/test?q=" + text;
            //     // request_url = "http://localhost:8889/test?q=" + text
			// 	chinese_ = true;
			// }
			request_url = "http://deepke.openkg.cn:8887/test?q=" + text;
			// if(is_finished == false){
				// is_finished = true;
				$.get(request_url, function(data){
					// console.log(data);
					var data_ = JSON.parse(data);
                    console.log(request_url)
					Func_DrawTable(data_);

				});
			
				alertify.logPosition("bottom right");
				alertify.success("Success! Check the results!");
				// $('#alertify-success-'+ div_id).text("Refresh");	
			
			// }		
			// else{
				// $(window).attr('location','index.html');
			// }	
			
        }
    };
	
    function Func_DrawTable(data){
        // 可视化表格
        var new_table = $("<table class=table table-striped id=myTable></table>");
        // new_table.append('<caption>基本的表格布局</caption>');
		// alert(chinese_);
		// if(chinese_ == true){
		// 	new_table.append('<thead><tr> <th>subject</th> <th>subject_type</th> <th>predicate</th> <th>object</th> <th>object_type</th> </tr></thead>');			
		// }
        // else{
		new_table.append('<thead><tr> <th>头实体</th> <th>关系</th> <th>尾实体</th>  </tr></thead>');			
		// }
		new_table.append('<tbody id=tbody></tbody>');
        $('#my_table').after(new_table);

        console.log(data);
        // console.log(data[0]);
        // console.log(data[0].spo_list);
        var ori_sen = data['ori_sen'];
        var graph_input = data['graph'];
        var tmpt = null;

        for(var i in data['pred']){
            tmpt = data['pred'][i];
            
            var html_ = $("<tr></tr>");
			// if(chinese_ == true){
			// 	html_.append("<td>" + tmpt.subject + "</td>");
			// 	html_.append("<td>" + tmpt.subject_type + "</td>");
			// 	html_.append("<td>" + tmpt.predicate + "</td>");
			// 	html_.append("<td>" + tmpt.object+ "</td>");
			// 	html_.append("<td>" + tmpt.object_type + "</td>");
			// 	html_.appendTo('#tbody');
			// }
			// else{
			html_.append("<td>" + tmpt.h + "</td>");
			html_.append("<td>" + tmpt.r + "</td>");
			html_.append("<td>" + tmpt.t + "</td>");
			html_.appendTo('#tbody');

			// }

        }
        Func_DrawBarGraph(ori_sen);

        Func_DrawGraph(graph_input);

    }   

    function Func_DrawGraph(graph_input){
        // Random tree
      
    //   console.log(graph_input)
    //   var height = document.getElementById("div_graph").clientHeight;
	//   var width = document.getElementById("div_graph").clientWidth;
    //   console.log(height,width)
    //   const Graph = ForceGraph3D()
    //     (document.getElementById('div_graph'))
    //       .width(width)
    //       .height(height)
    //       .showNavInfo(false)
    //       .graphData(graph_input)
    //       .backgroundColor("#FFFFFF")
    //       .nodeLabel(({entity}) => `$<span style=" color: black;">${entity}</span>`)
    //       .nodeVal(10)
    //       .nodeOpacity(1)
    //     //   .onNodeHover(node => elem.style.cursor = node ? 'pointer' : null)
    //       .nodeAutoColorBy('id')
    //       .linkLabel("rel")
    //       .linkWidth(6)
    //     //   .linkThreeObjectExtend(true)
    //     //   .linkThreeObject(link => {
    //     //       console.log(link)
    //     //   // extend link with text sprite
    //     //     const sprite = new SpriteText(`${link.rel}`);
    //     //     sprite.color = 'black';
    //     //     sprite.textHeight = 12;
    //     //     return sprite;
    //     //     })
    //         .linkPositionUpdate((sprite, { start, end }) => {
    //             const middlePos = Object.assign(...['x', 'y', 'z'].map(c => ({
    //                 [c]: start[c] + (end[c] - start[c]) / 2 // calc middle point
    //         })));
    //       // Position sprite
    //         Object.assign(sprite.position, middlePos);
    //         })

        // Graph.d3Force('charge').strength(-120);

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
            var head;
            var relation;
            var tail;

            for(var i in graph_input){
                head = graph_input[i].h;
                relation = graph_input[i].r;
                tail = graph_input[i].t;
                
                var entity_tmp1 = {name: head, des: "实体" ,itemStyle:{normal:{color: 'grey'}} };
                var entity_tmp2 = {name: tail, des: "实体" , itemStyle:{normal:{color: 'grey'}} };
                

                // var entity_tmp1 = {name: _object, des: _object_type, symbolSize:100,  itemStyle:{normal:{color: 'grey'}} };
                // var entity_tmp2 = {name: _subject, des: _subject_type, symbolSize:100,  itemStyle:{normal:{color: 'grey'}} };
                
                // cato_tmp = dic[_object_type];
                // if(cato_tmp == null){ cato_tmp = 4};
                // var entity_tmp1 = {name: _object, des: _object_type, symbolSize:100, category=cato_tmp};
                
                // cato_tmp = dic[_subject_type];
                // if(cato_tmp == null){ cato_tmp = 4 };
                // var entity_tmp2 = {name: _subject, des: _subject_type, symbolSize:100, category=cato_tmp};

                var relation_tmp = {source: head , target: tail, name: relation, des: "关系"};

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
                    symbolSize: 20,
                    roam: true,//是否可以移动和缩放
                    edgeSymbol: ['circle', 'arrow'],
                    edgeSymbolSize: 10,
                    edgeLabel: {
                        normal: {
                            textStyle: {
                                fontSize: 8
                            }
                        }
                    },
                    force: {
                        repulsion: 300,
                        edgeLength: [50, 60]
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
        $("#colored").before("<div id=inserted_text>" + bar_input);
    }


}(window.jQuery);
