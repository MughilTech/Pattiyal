$(document).ready(function(){
	$("h3.r").each(function(index,element){
 	go_button = $('<input type="button" value="Go"></input>');
 	go_button.click(function(e){
 		console.log(e.target);
 		frameIt($('h3.r a', e.target.parentNode)[0].href);
 	});
 	$(element).after(go_button);
 });
   var some = new MutationSummary({ callback: handleSummary, 
   	queries: [{ element: "h3.r" }]});
	
	var stylesheetDoc = document.styleSheets[0];
	if (stylesheetDoc != null)
		setScrollbarStyle(stylesheetDoc);
	
});

function setScrollbarStyle(stylesheetDoc){
	stylesheetDoc.insertRule('::-webkit-scrollbar { width: 12px;}', 0);
	stylesheetDoc.insertRule('::-webkit-scrollbar-track{z-index:1000; position:absolute;white-space:nowrap;-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);-webkit-border-radius: 10px;border-radius: 10px;}',1);
	stylesheetDoc.insertRule('::-webkit-scrollbar-thumb {-webkit-border-radius: 10px;border-radius: 10px;background: rgba(0,0,0,0.8); -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5);}',2);
	stylesheetDoc.insertRule('::-webkit-scrollbar-thumb:window-inactive {background: rgba(0,0,0,0.4); }',3);
}

function handleSummary(e)
{
 $(e[0].added).each(function(index,element){
 	go_button = $('<input type="button" value="Go"></input>');
 	go_button.click(function(e){
 		console.log(e.target);
 		frameIt($('h3.r a', e.target.parentNode)[0].href);
 	});
 	$(element).after(go_button);
 });
}

function frameIt(url)
{
	
	if($('#pattiyal_frame').length == 0){
		var center_col = $('#center_col');
		var cnt_width = $('#cnt').width();
		var rcnt_width = $('#rcnt').width();
		$('#rcnt').width(cnt_width);
		$('#rhscol').remove();
		frame_width = cnt_width - (center_col.width() + parseInt(center_col.css('margin-left').split("px")[0]) + 100 )
		frame_height = center_col.css('height');
		frame_left = center_col.css('margin-right');

		center_col.css("float", "left");

		center_col.after('<div id="pattiyal_frame">\
			<iframe src="'+url+'" style="width:'+frame_width.toString()+'px;height:'+frame_height+'; margin-left:-'+frame_left+'"></iframe></div>');
	}
	else
		$('#pattiyal_frame iframe')[0].src = url;

}