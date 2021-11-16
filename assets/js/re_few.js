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

            $("#inserted_text").remove();

            var request_url = "http://120.27.214.45:8885/test?q=" + text;

            // if(is_finished == false){

            alertify.logPosition("bottom right");
            alertify.success("Success! Check the results!");

            // is_finished = true;
            $.get(request_url, function(data){
                // alert(request_url)
                // console.log(data);
                var data_ = JSON.parse(data);
                var result = ""
                for(var item in data_){
                    result = result + item + ": " + data_[item] + "<br>"
                    // $("#colored").after(item + ": " + data_[item] + "<br>")
                }
                $("#colored").after("<div id=inserted_text>" + "文本: "+ text + "<br>" + result );
            });


        };
    }(window.jQuery);

