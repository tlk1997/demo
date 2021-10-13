!function($) {
    "use strict";

}(window.jQuery),
//initializing 
function($) {
    "use strict";
	
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
            alertify.logPosition("bottom right");
            alertify.success("Success! Check the results!");
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
		
		$("#inserted_text").remove();

        var request_url = "http://openue.top:8891/IEDemo?q=" + text;
		
		$.get(request_url, function(data){
			console.log(data);
			var data_ = JSON.parse(data);
			console.log(data_);
			Func_ColorText(data_, text);
		});

    };
	
	function Func_ColorText(data, text){
		// $("#colored").text(text);
		
		// var event_type = ['object', 'denoter', 'participant', 'time'];
		var event_color = new Array();
		// event_color[event_type[0]] = 'blue';
		// event_color[event_type[1]] = 'red';
		// event_color[event_type[2]] = 'purple';
		// event_color[event_type[3]] = 'green';

		var event_ =  data.spo_list[0].predicate;

		var str_tmp = text;
		for(var i in data.spo_list){
			console.log(data.spo_list[i].mention);
			console.log(data.spo_list[i].type);
			
			var word_ = data.spo_list[i].mention;
			var type_ = data.spo_list[i].type;
			// var color_ = event_color[type_];
			var color_ = "blue";
			
			str_tmp  = Func_ColorWord(word_, str_tmp, color_, type_);
		}
		
		// var test = data.spo_list[0].mention;
		// var newstr = Func_ColorWord(test, text);
		$("#colored").after("<div id=inserted_text>" + "Event: " + event_  + "<br>" + str_tmp + "</div>");
	}
	
	function Func_ColorWord(s, str, color, type_){
		 var reg = new RegExp("(" + s + ")", "g");
		 var newstr = str.replace(reg, "<font color=" + color + ">$1" + "(" + type_ + ")" +"</font>");

		 return newstr;
	}

}(window.jQuery);

