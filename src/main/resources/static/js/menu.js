$(document).ready(function(){
	var level_lock = false;
	$.fn.menuExe = function(){
		var pid = $(this).attr("attrid");
		$("div[attrid='"+pid+"']").click(function(){
			if(level_lock){
				return;
			}
			level_lock = true;
			var preid = null;
			$(".level1").each(function(){
				if($(this).children(".menu-icon-r").attr('class').indexOf("fa-angle-down") >= 0){
					preid = $(this).attr("attrid");
				}
			});
			if(preid && $("div[attrpid='"+preid+"']").css("display") == "block" && preid != pid){
				$("div[attrpid='"+preid+"']").slideToggle(300);
				$("div[attrid='"+preid+"']").children(".menu-icon-r").attr('class', $("div[attrid='"+preid+"']").children(".menu-icon-r").attr('class').replace("fa-angle-down", "fa-angle-left"));
			}
			if($(this).children(".menu-icon-r").attr('class').indexOf("fa-angle-left") >= 0){
				$(this).children(".menu-icon-r").attr('class', $(this).children(".menu-icon-r").attr('class').replace("fa-angle-left", "fa-angle-down"));
			}
			else{
				$(this).children(".menu-icon-r").attr('class', $(this).children(".menu-icon-r").attr('class').replace("fa-angle-down", "fa-angle-left"));
			}
			$("div[attrpid='"+pid+"']").slideToggle(300, function(){level_lock = false;preid=pid;});
		});
	}
	$.fn.menuLink = function(){
		$(this).click(function(){
			$(".menu-selected").removeClass("menu-selected");
			$(this).addClass("menu-selected");
			window.open($(this).attr("attrhref"), "iframe");
		});
	}
	$(".level1").each(function(){
		$(this).menuExe();
	});
	$(".level2").each(function(){
		$(this).menuLink();
	});
});