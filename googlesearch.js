var _prevIndex = 0;
var _nextIndex = 0;
var _resultsPerPage = 10;
var _pageNumber = 1;

$(function ()
{
    $('#btnSearch').show().click(function () { Search($("#txtSearchTerm").val(),0);});
    $('#lnkPrev').click(function () { Search($("#txtSearchTerm").val(),-1); });
    $('#lnkNext').click(function () { Search($("#txtSearchTerm").val(),1);  });
});

function Search(term, direction)
{
    var startIndex = 1;

    if (direction === -1)
    {
        startIndex = _prevIndex; 
        _pageNumber--;
    }
    if (direction === 1)
    {
        startIndex = _nextIndex; 
        _pageNumber++;
    }
    if (direction === 0)
    {
        startIndex = 1; 
        _pageNumber = 1;
    }

    var url = "https://www.googleapis.com/customsearch/v1?key="
    + "AIzaSyCPzUfSvVNnZcQ4DvISq_ob2L0S-1MQD5w" + "&cx=" + "001917348625090949355:r6f5jukbnco" + "&start=" + startIndex + "&as_qdr=d100&sort=date:D:S:d1"+"&q=" + escape(term) + "&callback=?";

 //   url = "http://hahndorf/ws/dummy.aspx?q=" + escape(term) + "&start=" + startIndex + "&callback=?";

    $.getJSON(url, '', SearchCompleted);
}

function SearchCompleted(response)
{
    var html = "";
    $("#searchResult").html("");

    if (response.items == null)
    {
        $("#searchResult").html("No matching pages found");
        return;
    }

    if (response.items.length === 0)
    {
        $("#searchResult").html("No matching pages found");
        return;
    }

    $("#searchResult").html(response.queries.request[0].totalResults + " pages found");

    if (response.queries.nextPage != null)
    {
        _nextIndex = response.queries.nextPage[0].startIndex;
        $("#lnkNext").show();
    }
    else
    {
        $("#lnkNext").hide();
    }

    if (response.queries.previousPage != null)
    {
        _prevIndex = response.queries.previousPage[0].startIndex;
        $("#lnkPrev").show();
    }
    else
    {
        $("#lnkPrev").hide();
    }

    if (response.queries.request[0].totalResults > _resultsPerPage)
    {
        $("#lblPageNumber").show().html(_pageNumber);
    }
    else
    {
        $("#lblPageNumber").hide();
    }

    for (var i = 0; i < response.items.length; i++)
    {
        var item = response.items[i];
        var title = item.htmlTitle;
        var icon = icon = "class='cmisc' title='Other page'";

        title = title.replace("- Peter Hahndorf", "");
        title = title.replace("- Forever Breathes The Lonely Word", "");
        title = title.replace("Forever Breathes The Lonely Word - ", "");

        if (item.link.indexOf("/tech/") > -1)
        {
            icon = "class='ctech' title='Tech Stuff'";
        }

        if (item.link.indexOf("/trip/") > -1)
        {
            icon = "class='ctravel' title='Travel'";
        }

        if (item.link.indexOf("/blog/") > -1)
        {
            icon = "class='cblog' title='Technical blog'";
        }

	  html += "<div><div class='hcHead2'>"+i+"<a " + icon + " href='"+ item.link +"' data-url='"+ item.link +"'> " + title + "</a></div>";
        html += item.htmlSnippet + "</div>";
    }

    $("#output").html(html);
$('.hcHead2 a').bind('click', function(e){$('#loadFrame')[0].src = this.getAttribute('data-url');e.preventDefault();})
addShortcuts();
}


function addShortcuts()
{
  $.each($('#output a'), function(index, value){
 var num = index 
  shortcut.add(num.toString(),function() {
    value.click();
    });
  });

}
