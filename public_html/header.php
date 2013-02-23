<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>EricRasch.com | The Lifestream of Eric Rasch</title>

  <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
  <meta name="description" content="EricRasch.com is a place to learn more about Eric Rasch and his life online. Find Eric on Flickr, follow Eric on Twitter, or friend Eric on Facebook." />
  <meta name="keywords" content="EricRasch.com, Eric Rasch, campfiresites.com, Office of Communications, Houston Web Design, family photography, social media guru, modern website style" />
  <meta name="author" content="Eric Rasch" />

  <meta name="verify-v1" content="00fe8HYZxOWxaLCGGZJSRzkt38EgHOxZzY6DwoQLkh0=" />

  <link rel="stylesheet" href="Assets/css/screen.css" type="text/css" media="screen, projection" />
  <link rel="stylesheet" href="Assets/css/print.css" type="text/css" media="print" />
  <!--[if IE]>
  	<link rel="stylesheet" href="Assets/css/ie.css" type="text/css" media="screen, projection">
  <![endif]-->
  <link rel="stylesheet" href="Assets/css/style.css" type="text/css" media="screen, projection" />
  <link rel="shortcut icon" href="/favicon.ico" />

  <!-- Grab Google CDN's jQuery. fall back to local if necessary -->
  <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
  <script>window.jQuery || document.write('<script src="Assets/js/libs/jquery-1.5.1.min.js">\x3C/script>')</script>

  <script type="text/javascript">
  $(document).ready(function(){
  
  	$.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?ids=30832654@N00&lang=en-us&format=json&jsoncallback=?", function(data){
  	  $.each(data.items, function(index, item){
  		$("<img/>").attr("src", item.media.m).appendTo("#flickr")
  		  .wrap("<a href='" + item.link + "'></a>");
  	  });
  	});
  	
  	$.getJSON('http://twitter.com/status/user_timeline/ericrasch.json?count=10&callback=?', function(data){
  		$.each(data, function(index, item){
  			$('#twitter').append('<div class="tweet"><p>' + item.text.linkify() + '</p><p class="tweettime"><strong>' + relative_time(item.created_at) + '</strong></p></div>');
  		});
  	
  	});
  	  	
  	$.getJSON("http://api.dribbble.com/players/ericrasch/shots?callback=?", function(data) {

   		$.each(data.shots, function(index, shot) {
   			$("#dribbble").append("<a href='" + shot.image_url + "'><img src='" + shot.image_teaser_url + "' /></a>");
   		});

   	});
   	
  	function relative_time(time_value) {
  	  var values = time_value.split(" ");
  	  time_value = values[1] + " " + values[2] + ", " + values[5] + " " + values[3];
  	  var parsed_date = Date.parse(time_value);
  	  var relative_to = (arguments.length > 1) ? arguments[1] : new Date();
  	  var delta = parseInt((relative_to.getTime() - parsed_date) / 1000);
  	  delta = delta + (relative_to.getTimezoneOffset() * 60);
  	  
  	  var r = '';
  	  if (delta < 60) {
  		r = 'a minute ago';
  	  } else if(delta < 120) {
  		r = 'couple of minutes ago';
  	  } else if(delta < (45*60)) {
  		r = (parseInt(delta / 60)).toString() + ' minutes ago';
  	  } else if(delta < (90*60)) {
  		r = 'an hour ago';
  	  } else if(delta < (24*60*60)) {
  		r = '' + (parseInt(delta / 3600)).toString() + ' hours ago';
  	  } else if(delta < (48*60*60)) {
  		r = '1 day ago';
  	  } else {
  		r = (parseInt(delta / 86400)).toString() + ' days ago';
  	  }
  	  
  	  return r;
  	}
  	
  	String.prototype.linkify = function() {
  		return this.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&\?\/.=]+/, function(m) {
  			return m.link(m);
  		});
  	};
  
  });
  </script>
</head>
