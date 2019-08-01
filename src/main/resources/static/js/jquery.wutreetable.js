(function($) {
	$.fn.extend({
		wuTreeTable: function(options) {
			var settings = {
				data:null,
				childFieldName: null
			};
			$.extend(settings, options);
			var data = settings.data;
			this.attr("childFieldName", settings.childFieldName);
			this.data("colModel", settings.colModel);
			this.data("buttons", settings.buttons);
			
			for (var i =0; i<data.result.length; i++){
				var index = i + 1;
				var $tr = this.find("tr:eq(" + index + ")");
				if (data.result[i][settings.childFieldName] != null && data.result[i][settings.childFieldName].length > 0){ 
					$tr.addClass("collapsed");
					$tr.attr("level", i + "l");
					$tr.data("self", data.result[i]);
					$tr.find("td:eq(0)").prepend("<span class='indenter treetable-expand'></span>");
				} else { 
					$tr.addClass("nochild");
					$tr.find("td:eq(0)").prepend("<span class='indenter'></span>");
				}
			}
		}
	});
})(jQuery);
			
$().ready(function(){
	$(".treetable-expand").live("click", function(){
		var $tr = $(this).closest("tr");
		var parentLevel = $tr.attr("level");
		var $table = $tr.closest("table");
		var childFieldName = $table.attr("childFieldName");
		if ($tr.hasClass("collapsed")){
			var $childTr = $table.find("tr[parentLevel='" + parentLevel + "']");
			if ($childTr.length > 0){
				$childTr.show();
				$table.find("tr.expanded").each(function(){
						if ($(this).is(":visible")){
						var $trs = $table.find("tr[parentLevel='" + $(this).attr("level") + "']");
						if ($trs.length > 0){
							$trs.show();
						}
						}
				});
			} else {
				var $self = $tr.data("self");
				var $child = $self[childFieldName];
				for (var i = 0; i<$child.length; i++){
					var data = $child[i];
					var newTr = $("<tr></tr>");
					var colModel = $table.data("colModel");
					var thwidths = $table.data("thwidths");
					for (var key in colModel){
						var $td = $("<td>" + data[colModel[key].name] + "</td>");
						if (thwidths != null){
							$td.css("width", thwidths[key]);
						}
						$td.appendTo(newTr);
					}
					var buttons = $table.data("buttons");
					if (buttons != null && buttons.length > 0){
						var td = $("<td></td>");
						for (var key in buttons){
							var button = buttons[key];
							var $btn = $("<button></button>");
							$btn.attr("id", button.id);
							$btn.html(button.value);
							$btn.addClass(button.className);
							$btn.attr("style", button.style);
							$btn.on("click",data,button.click);
							$btn.appendTo(td);
						}
						td.css("width", thwidths[thwidths.length - 1] - 12);
						td.appendTo(newTr);
					}
					newTr.attr("parentLevel", parentLevel);
					newTr.attr("level", parentLevel + "-" + i + "l");
					var levelCount = newTr.attr("level").split("-").length;
					var style = "margin-left:" + (levelCount * 10) + "px";
					if (data[childFieldName] != null && data[childFieldName].length > 0){ 
						newTr.addClass("collapsed");
						newTr.data("self", data);
						newTr.data("parent", $self);
						newTr.find("td:eq(0)").prepend("<span style='" + style + "' class='indenter treetable-expand'></span>");
					} else { 
						newTr.addClass("nochild");
						newTr.data("parent", $self);
						newTr.find("td:eq(0)").prepend("<span style='" + style + "' class='indenter'></span>");
					}
					newTr.insertAfter($tr);
				}
			}
			$tr.addClass("expanded");
			$tr.removeClass("collapsed");
		} else {
			var $childTr = $table.find("tr[parentLevel^='" + parentLevel + "']");
			if ($childTr.length > 0){
				$childTr.hide();
			}
			$tr.addClass("collapsed");
			$tr.removeClass("expanded");
		}
	});
});