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

            var text = $("#textarea").val();
            if(text != ""){
                Func_Extration(text);
                $("#div_head_visualization").fadeIn(3000);
                $("#div_visualization").fadeIn(3000);
            }
            else{
                alertify.logPosition("bottom right");
                alertify.error("Empty Input");
            }

        });


        function Func_Extration(text) {
            // alert(text);

            $("#myTable").remove();

            var request_url = "http://120.27.214.45:8887/test?q=" + text;

            // if(is_finished == false){

            alertify.logPosition("bottom right");
            alertify.success("Success! Check the results!");

            // is_finished = true;
            $.get(request_url, function(data){
                // alert(request_url)
                // console.log(data);
                var data_ = JSON.parse(data);
                // console.log(data_);
                // $("#colored").after("<div id=inserted_text>" + "关系: " + data_.rel + "<br>" + "置信度: " + data_.confidence_interval+ " </div>");
                var new_table = $("<table class=table table-striped id=myTable></table>");
                new_table.append('<thead><tr> <th>头实体</th> <th>关系</th> <th>尾实体</th>  </tr></thead>');			
		// }
                new_table.append('<tbody id=tbody></tbody>');
                $('#my_table').after(new_table);

                console.log(data);
                // console.log(data[0]);
                // console.log(data[0].spo_list);
                
                var tmpt = null;

                for(var i in data_['pred']){
                    tmpt = data_['pred'][i];
                    
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
                };


            })
        };
    }(window.jQuery);
    

