$(document).ready(function(){
	$.ajax({
		type: "GET",
		url: "http://www.npr.org/rss/rss.php?id=100",
		dataType: "xml",
		success: parseXml
	});
});

function parseXml(xml){
	//Get Title of Feed and populate component header
	var title = $(xml).find('title').first().text();
	var $titleLink = $(xml).find('link').first().text();
	$('#feed h2').html('<a href="' + $titleLink + '" target="_blank">' + title + '</a>');
	//Parse logo image
	var image = $(xml).find('image').attr('href', image).text();
	$('#logo').html("<img src=" + image + " />")
	.css({
		'float':'right',
		'margin':'16px',
		});
	//Get date
	var date = $(xml).find("lastBuildDate").text();
	$('#feed h3').html(date);
	//Populate main feed cell
	var topTitle = $(xml).find('item').first().find('title').text();
	var topLink = $(xml).find('item').first().find('link').text();
	$('#top-feed').html('<a href="' + topLink + '" id="top-link">'+'<p>'+ topTitle + '</p>'+'</a>').css({'font-size':'3.0em'});
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
					$("#feed-container").append($(wrapper).append($link,$pubDate,$break)); 
					$link.css({
						'font-size':'1em',
						'font-weight':'bold',
						'line-height':'1'
						});
					$des.css({
						'font-size':'0.9em',
						'color':'gray'
						});
					})
					var $pageLink = $('<span class="cat-link"></span>').html('<a href="http://www.npr.org/">More Stories</a>');
					$(".feed-container").append($pageLink);
				}
		)}