$(document).ready(function(){
	$("h3.r").each(function(index,element){
		go_button = $('<input type="button" class="pattiyalLink" value="Open it here"></input>');
		go_button.click(function(e){
			frameIt($('h3.r a', e.target.parentNode)[0].href);
		});
		$(element).after(go_button);
		go_button.hide();
	});


	var searchLink = new MutationSummary({ callback: handleSearchLinks, 
		queries: [{ element: "h3.r" }]});

	var googleNavLink = new MutationSummary({ callback: removeIt, 
		queries: [{ element: "#knavm" }]});
	var googleNavLink = new MutationSummary({ callback: removeIt, 
		queries: [{ element: "div.vspib" }]});

	var stylesheetDoc = document.styleSheets[0];
	if (stylesheetDoc != null)
		setScrollbarStyle(stylesheetDoc);
	addShortcuts();
});

function setScrollbarStyle(stylesheetDoc){
	stylesheetDoc.insertRule('::-webkit-scrollbar { width: 12px;}', 0);
	stylesheetDoc.insertRule('::-webkit-scrollbar-track{z-index:1000; position:absolute;white-space:nowrap;-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);-webkit-border-radius: 10px;border-radius: 10px;}',1);
	stylesheetDoc.insertRule('::-webkit-scrollbar-thumb {-webkit-border-radius: 10px;border-radius: 10px;background: rgba(0,0,0,0.8); -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5);}',2);
	stylesheetDoc.insertRule('::-webkit-scrollbar-thumb:window-inactive {background: rgba(0,0,0,0.4); }',3);
}

function handleLeftNav()
{
	$('#leftnavc')[0].setAttribute("hidden");	
	$('#center_col').css('margin-left', '0px');
}

function addShortcuts()
{
	shortcut.add('s', function(){
		$('#gbqfq').focus();
		$('#gbqfq').select();
	},{'disable_in_input':true});
	shortcut.addOn('tab,down', function(){
		navigateTab(true);
	});
	shortcut.addOn('shift+tab,up', function(){
		navigateTab(false);
	});
	shortcut.addOn('right,enter', function(){
		loadPattiyal();
	},{'disable_in_input':true});
	shortcut.addOn('ctrl+enter,meta+enter', function(){
		loadNewTab();
	},{'disable_in_input':true});
	
}

function loadPattiyal()
{
	var selectedNode = $('.pattiyal h3.r a')[0];
	if(selectedNode)
	{
		frameIt(selectedNode.href);
	}
}

function loadNewTab()
{
	var selectedNode = $('.pattiyal h3.r a')[0];
	if(selectedNode)
	{
		window.open(selectedNode.href,'_blank');
		window.focus();
	}
}

function navigateTab(moveForward)
{
	var currentSelection = $('.vsc.pattiyal:first');
	var searchList = $('.vsc');
	var toBeHighlighted = $('.vsc:first');
	if(currentSelection.length != 0)
	{	
		var currentPosition = jQuery.inArray(currentSelection[0], searchList);
		var nextIndex = moveForward ? currentPosition + 1 : currentPosition - 1;
		nextIndex = nextIndex == searchList.length ? 0 :nextIndex;
		nextIndex = nextIndex == -1 ? searchList.length - 1 : nextIndex 
		toBeHighlighted = $(searchList[nextIndex]);
	}

	highlightSelection(toBeHighlighted);
}

function highlightSelection(toBeHighlighted)
{
	//remove current selection
	var currentSelection = $('.vsc.pattiyal:first');
	currentSelection.removeClass('pattiyal');
	$('h3.r a', currentSelection).removeClass('pattiyalSearchLink');
	$('input[class="pattiyalLink"]',currentSelection).hide();

	//highlight given selection
	toBeHighlighted.addClass('pattiyal');
	$('h3.r a', toBeHighlighted).addClass('pattiyalSearchLink');

	$('input[class="pattiyalLink"]',toBeHighlighted).show();
	
	$('#gbqfq').blur();
}

function handleSearchLinks(e)
{
	initializePattiyal($(e[0].added));
}

function initializePattiyal(searchLinks)
{
	searchLinks.each(function(index,element){
		//go_button
		go_button = $('<input type="button" class="pattiyalLink" value="Open it here"></input>');
		go_button.click(function(e){
			frameIt($('h3.r a', e.target.parentNode)[0].href);
		});
		$(element).after(go_button);
		go_button.hide();

		//new_tab_button
		newTab = $('<input type="button" class="pattiyalLink" value="Open in new tab"></input>');
		newTab.click(function(e){
			loadNewTab();
		});
		go_button.after(newTab);
		$($(element).closest('.vsc')).hover(function(e){
			var vsc = $(e.target).closest('.vsc');
			highlightSelection(vsc);
		});
		go_button.hide();
		newTab.hide();
	});
	$('div.vspib').remove();
}
function removeIt(e)
{
	$(e[0].added).remove();
}

function getUrl(googleURl)
{
	var url_position = googleURl.indexOf ('&url=');
	url_position += 5;
	url_text = googleURl.substr (url_position);
	url_text = unescape(url_text);
	url_text =  url_text.replace (/ /g, '%20');
	url_text.substr(3);
}

function frameIt(url)
{
	handleLeftNav();
	var center_col = $('#center_col');
	var cnt_width = $('#cnt').width();
	var rcnt_width = $('#rcnt').width();
	$('#rcnt').width(cnt_width);
	$('#rhscol').remove();
	frame_width = cnt_width - (center_col.width() + parseInt(center_col.css('margin-left').split("px")[0]) + 100 )
	frame_height = center_col.css('height');
	frame_left = center_col.css('margin-right');

	if($('#pattiyal_frame').length == 0){
		center_col.css("float", "left");
		center_col.after('<div id="pattiyal_frame"></div>');
	}

	if(url.indexOf("stackoverflow.com") == -1)
	{
		$('#pattiyal_frame .pattiyalStacktack').remove();
		$('#pattiyal_frame iframe').remove();
		$('#pattiyal_frame').append('<iframe src="'+url+'" style="width:'+frame_width.toString()+'px;height:'+frame_height+'; margin-left:-'+frame_left.toString()+'"></iframe>');
	}
	else
	{
		var urlArray = url.split('/');
		stackQId = urlArray[urlArray.indexOf('questions')+1];
		$('.pattiyalStacktack').remove();
		stackDiv = $('<div class="pattiyalStacktack" id="stacktack-'+ stackQId +'" style="overflow-y:scroll; position:absolute;width:'+frame_width.toString()+'px;height:'+frame_height+'; margin-left:'+center_col.width().toString()+'px "></div>');
		$("#pattiyal_frame").append(stackDiv);
		$('#pattiyal_frame iframe').remove();
		$(document).stacktack();
	}
}