$(document).ready(function() {
	var $typekitFlavors = ['editorial','kickoff','fieldreport','seafarer','ironictee','newsy'];
	var $allFlavors = $typekitFlavors.concat(['librarysci','swissface']);
	$(window).load(function() {
		var $hash = location.hash.substring(1);
		if($.inArray($hash,$allFlavors) > -1){
			$('select#flavor').val($hash);
			$('link.type-a-file').attr("href",'!theme/css/type/taf-' + $hash + '-m.css');
		}
	});
	$('select#flavor,select#size').change(function(){
		$style = $('select#flavor').val();
		location.hash = "#" + $style;
		$size = $('select#size').val();
		$('link.type-a-file').attr("href",'!theme/css/type/taf-' + $style + '-' + $size + '.css');
	});
});