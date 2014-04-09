$(function(){
	$(".col3 li:nth-child(3), .col3 div:nth-child(3)").css({"float":"right","width":"250px"});
	$(".col4 li:nth-child(4), .col4 div:nth-child(4)").css({"float":"right","width":"180px"});
	$(".col3 li:nth-child(3) p, .col4 li:nth-child(4) p").css({"padding-right":"0"});
	$(".list li:last-child").css({"padding-right":"0"});
	$("#footer ul.pageLink li:last-child").css({"border-right":"none"});

	var $k = $(".pNav li").length;
	$(".pNav ul").addClass("li"+($k-2));

	$("a[href*='.pdf'] ,a[href^='http://']").click(function(){ this.target = "_blank"; });

	//if (navigator.platform.indexOf("Win") != -1) {
	//	$('head').append('<link rel="stylesheet" href="/common/css/win.css" type="text/css" media="all" />');
	//}
});
