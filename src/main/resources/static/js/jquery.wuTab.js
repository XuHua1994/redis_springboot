/*
 
 
 
 * 
 * JavaScript - lSelect
 * Version: 3.0
 */

(function($) {
	$.fn.extend({
		wuTab: function(options) {
			var settings = {
				onClick:null,
				clickFirst:false,
				direction:"horizontal",
				subMenus:null
			};
			$.extend(settings, options);
			var $ul = this;
			if (settings.direction == "horizontal"){
				$ul.find("li").each(function(index, element){
					var $div = $("<div class='wutabcontainer clearfix'></div>");
					var $left = $("<div class='wutableft'></div>").appendTo($div);
					var $middle = $("<div></div>").appendTo($div);
					if (settings.subMenus != null && settings.subMenus[index].length > 0){
						$middle.addClass("wutabmiddle-hasmenu");
					} else {
						$middle.addClass("wutabmiddle");
					}
					
					var $right = $("<div class='wutabright'></div>").appendTo($div);
					if ($(this).hasClass("active")){
						$div.addClass("active");
					}
					$middle.html($(this).text());
					$(this).html($div);
					var $li = $(this);
					$ul.show();
					if (settings.subMenus != null){
						var subMenu = settings.subMenus[index];
						if (subMenu.length > 0){
							var $subMenuUl = $("<ul class='wutabsubmenu'></ul>").css("display", "none").css("min-width", $li.width());
							for (var i=0; i<subMenu.length; i++){
								var $subMenuLi = $("<li>" + subMenu[i] + "</li>").appendTo($subMenuUl);
								$subMenuLi.click(function(){
									$ul.find("li.active").removeClass("active");
									$ul.find("div.active").removeClass("active");
									var $this = $(this);
									$this.parent().parent().addClass("active");
									$this.parent().parent().find(".wutabcontainer").addClass("active");
									$subMenuUl.hide();
									settings.onClick($this);
								});
							}
							$subMenuUl.css("position","absolute").css("top", $li.offset().top + 30).css("left",$li.offset().left);
							$subMenuUl.appendTo($li);
							$li.data("subMenu", $subMenuUl);
							$li.mouseenter(function(){
								$(this).data("subMenu").show();
							});
							$li.mouseleave(function(){
								$(this).data("subMenu").hide();
							});
							
						}
					}
					
					if (settings.subMenus == null || settings.subMenus[index].length == 0){
						$(this).click(function(){
							$ul.find("li.active").removeClass("active");
							$ul.find("div.active").removeClass("active");
							var $this = $(this);
							$this.addClass("active");
							$this.find(".wutabcontainer").addClass("active");
							settings.onClick($this);
						});
					}
				});
			} else {
				$ul.find("li").click(function(){
					$ul.find("li.active").removeClass("active");
					$ul.find("div.active").removeClass("active");
					var $this = $(this);
					$this.addClass("active");
					$this.find(".wutabcontainer").addClass("active");
					settings.onClick($this);
				});
			}
			if (settings.clickFirst){
				$ul.find("li:first").click();
			}
		}
	});
})(jQuery);