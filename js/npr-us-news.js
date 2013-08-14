$(document).ready(function(){
	$.ajax({
		type: "GET",
		url: "http://www.npr.org/rss/rss.php?id=1003",
		dataType: "xml",
		success: parseXml2
	});
});

function parseXml2(xml){
	//Get Title of Feed and populate component header
	var title = $(xml).find('title').first().text();
	var $titleLink = $(xml).find('link').first().text();
	$('#feed2 h2').html('<a href="' + $titleLink + '">' + title + '</a>');
	//Parse logo image
	var image = $(xml).find('image').attr('href', image).text();
	//Parse xml items
	$(xml).find("channel").each(function(){
		$(xml).find('item').each(function() {
					var title = $(this).find("title").text();
					var category = $(this).find("category").text();
					var des = $(this).find("description").text();
					var link = $(this).find("link").text();
					var pubDate = $(this).find("pubDate").text();
					var $des = $('<div class="linkitem"></div>').html(des);
					var $link = $('<a></a>').attr('href', link).html(title);
					var $pubDate = $('<br /><span class="date"></span>').html(pubDate);
					var $break = $('<br /><p></p><div class="hr" /></div>');
					var wrapper = "<li class='single-feed'>";
					$("#feed-container2").append($(wrapper).append($link,$pubDate,$break)); 
					// $link.css({
// 						'font-size':'0.9em',
// 						'font-weight':'bold',
// 						'line-height':'1'
// 						});
					$des.css({
						'font-size':'0.9em',
						'color':'gray'
						});
					})
					var pageLink = $(xml).find('link').first().text();
					var $pageLink = $('<a></a>').attr('href', pageLink).text('more').wrap('<div class="cat-link"></div>');
					$("#feed-container2").append($pageLink);
				}
		)}