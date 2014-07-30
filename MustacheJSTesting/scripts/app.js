$(document).ready(function(){
	$("#template-result").load("templates.html #template1" ,function(){
       	var template = $('#template1').html();
       	var output = Mustache.render(template, students);
       	$("#person2").html(output);
    });
});