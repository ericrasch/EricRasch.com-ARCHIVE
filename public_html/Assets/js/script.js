/* Author: Eric Rasch
*/

//	=BEGIN: Scroll effect with local anchors - jQuery
//  URL Source: http://www.alfredapp.com/
//	.............................................................. 
  //Page scrolling
  jQuery('a[href*=#]').click(function() {
  	if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
  	  var $target = $(this.hash);
  	  $target = $target.length && $target || $('[name=' + this.hash.slice(1) +']');
  	  	if ($target.length) {
    	    var targetOffset = $target.offset().top - 30;
  				$('html,body')
  				.animate({scrollTop: targetOffset}, 1000);
  			   return false;
  		  }
  	}
  });
//	.............................................................. 
//	=END: Scroll effect with local anchors - jQuery
