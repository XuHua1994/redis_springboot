/*
	服务台分页js文件
 */

(function($) {
	$.pager = function(option){
		var count = option.count;
		var page = option.page;
		var pagesize = option.pagesize;
		var $table = option.table;
		if(typeof count=="undefined" || count==null) return;
		var showMaxPage = option.maxPage;//显示的最大页码数量
		if (showMaxPage == null){
			showMaxPage  = 5;
		}
		var pageSplitCount=1;

		var $pagesize = $("#wupagesize");
		if ($pagesize != null && typeof $pagesize != 'undefined' && $pagesize.val() != null && typeof $pagesize.val() != 'undefined'){
			var reg = /^[0-9]*$/;
			if (reg.test($pagesize.val())){
				pagesize = $pagesize.val();
			}
		}		

		var totalPage = count%pagesize > 0 ? parseInt(count/pagesize)+1: count/pagesize;
		var $div_pagerList = $("<div></div>").addClass("pager_list");
		if ($table != null){
			$table.data("pager", null);
			$table.data("pager", $div_pagerList);
		}
		$div_pagerList.data("currentpage", page);
		/* pager left */
		if(count==0) page=0;
		var $pager_left = $('<div><span class="span_l">共计</span><span class="color span">'+count+'</span><span class="span_l">条记录</span><span class="span_l">每页</span><span class="pagesize"><input type="text" class="text" id="wupagesize" name="wupagesize" value="' + pagesize + '"/><i id="iPageSizeUp" class="fa fa-caret-up"></i></span><span>条</span><span class="span_l">当前<label class="color span_l">'+page+'</label>/<label class="color span_r">'+totalPage+'</label>页</span></div>').addClass("left");
		$pager_left.appendTo($div_pagerList);
		
		$pager_left.find("i").click(function(){
			var $pagesize = $pager_left.find(".pagesize");
			var $ul = $("<ul id='pagesizeselect' class='pagesizeselect'><li>10</li><li>25</li><li>50</li><li>100</li></ul>");
			$ul.css("position", "absolute");
			$ul.appendTo("body");
			$ul.css("left", $pagesize.offset().left);
			$ul.css("top", $pagesize.offset().top - $ul.height());
			$ul.css("width", $pagesize.width() + 1);
			
			$ul.find("li").click(function(){
				$("#wupagesize").val($(this).text());
				option.load(1);
			});
			$(document).click(function(e){
				if (e.target.id != "iPageSizeUp"){
					$("#pagesizeselect").remove();
					$(document).unbind("click");
				}
			});
		});
		
		/* pager center*/
		if(count>0){
			/*************page right*************/
		var $pager_right = $('<div><span class="span_l">跳至</span><input type="text" class="text"/><span class="span_l">页</span></div>').addClass("right");
			
		var $go = $('<button type="button" id="go_page" class="general1">跳转</button>');
		$go.appendTo($pager_right);
		$pager_right.appendTo($div_pagerList);
		
		var $pager_center = $("<div></div>").addClass("center");
		var $ul = $("<ul></ul>").addClass("pager");
		var $firstpage_li = $("<li></li>").data("page",1),$firstpage_a = $("<a class='firstpage'>&nbsp;</a>");
		var $prevpage_li = $("<li></li>").data("page",(parseInt(page)-1)),$prevpage_a = $("<a class='prevpage'>&nbsp;</a>");
		var $nextpage_li = $("<li></li>").data("page",(parseInt(page)+1)),$nextpage_a = $("<a class='nextpage'>&nbsp;</a>");
		var $endpage_li = $("<li></li>").data("page",totalPage),$endpage_a = $("<a class='endpage'>&nbsp;</a>");
		if(totalPage<=showMaxPage) showMaxPage = totalPage;
		if(totalPage==1){
			$firstpage_li.addClass("disabled");$firstpage_a.addClass("firstpage_disabled");
			$prevpage_li.addClass("disabled");$prevpage_a.addClass("prevpage_disabled");
			$nextpage_li.addClass("disabled");$nextpage_a.addClass("nextpage_disabled");
			$endpage_li.addClass("disabled");$endpage_a.addClass("endpage_disabled");
		}else if(page==1){
			$firstpage_li.addClass("disabled");$firstpage_a.addClass("firstpage_disabled");
			$prevpage_li.addClass("disabled");$prevpage_a.addClass("prevpage_disabled");
		}else if(page==totalPage){
			$nextpage_li.addClass("disabled");$nextpage_a.addClass("nextpage_disabled");
			$endpage_li.addClass("disabled");$endpage_a.addClass("endpage_disabled");
		}
		$firstpage_a.appendTo($firstpage_li);$firstpage_li.appendTo($ul);
		$prevpage_a.appendTo($prevpage_li);$prevpage_li.appendTo($ul);
		//var $pageshow =$('<span class="span_l"><label class="color span_l">'+page+'</label>/<label class="color span_r">'+totalPage+'</label></span>')
		var $pageshow = $('<span>第</span><input type="text" class="pageshow" value="'+page+'" disabled="disabled"/><span >页</span>') 
		$pageshow.appendTo($ul);
		/*for(var i=0;i<showMaxPage;i++){
			var $li = $("<li></li>");
			var $a = $('<a href="javascript:void(0);">'+(i+1)+'</a>');
			var $more = $('<li class="disabled"><a href="javascript:void(0);" class="nore">...</a></li>');
			if(i==0 || page<=(showMaxPage-pageSplitCount) || totalPage<=showMaxPage) {
				if((i+1)==page){$li.addClass("disabled");$a.addClass("current");}
				$li.data("page",(i+1));
				$a.appendTo($li);
				$li.appendTo($ul);
				if((i+1)==showMaxPage && totalPage>showMaxPage) $more.appendTo($ul);
				continue;
			}
			var pageNum = parseInt(parseInt(page) - parseInt(pageSplitCount))+ parseInt(parseInt(i)-parseInt(pageSplitCount));
			var centerPage = page;
			if(page>(totalPage-pageSplitCount)) centerPage = totalPage-pageSplitCount;
			if(centerPage>=parseInt(totalPage-pageSplitCount)) pageNum = parseInt(centerPage) - parseInt(parseInt(showMaxPage)-parseInt(pageSplitCount))+ parseInt(i+1);
			if(page==pageNum) {$li.addClass("disabled");$a.addClass("current");}
			$a.html(pageNum);
			$a.appendTo($li);
			$li.data("page",pageNum);
			if(i==pageSplitCount) $more.appendTo($ul);
			$li.appendTo($ul);
			if((i+1)==showMaxPage && pageNum!=totalPage) $more.appendTo($ul);
		}*/
		$nextpage_a.appendTo($nextpage_li);$nextpage_li.appendTo($ul);
		$endpage_a.appendTo($endpage_li);$endpage_li.appendTo($ul);
		$ul.appendTo($pager_center);
		$pager_center.appendTo($div_pagerList);
		
		var $refresh_li = $("<li></li>").data("page",page);
		var $refresh = $('<a class="pagerefresh"><i class="fa fa-refresh"></i></a>').appendTo($refresh_li);
		$refresh_li.appendTo($ul);
		
		/*************pager click event ****************/
		$ul.find("li").click(function(){if(!$(this).hasClass("disabled")) option.load($(this).data("page"));});
		$pager_right.find("input").bind("input propertychange",function(){
			if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'');}
			else{this.value=this.value.replace(/\D/g,'');}
			if(this.value>totalPage) this.value=totalPage;
		}).keyup(function(event){if(event.keyCode == 13 && this.value!="") option.load(this.value);});
		$go.click(function(){var val = parseInt($pager_right.find("input").val());if(val!="" && val<=totalPage) option.load(val);});
		
		var $clonediv_pagerList = $("<div></div>").addClass("pager_list").html($div_pagerList.html());
		$clonediv_pagerList.appendTo($("body"));
		var minwidth = $clonediv_pagerList.find("div.left").width() + $clonediv_pagerList.find("div.center").width() + $clonediv_pagerList.find("div.right").width() + 20;
		if (minwidth > $(document).width()){
			$div_pagerList.css("min-width", minwidth);
		}
		$clonediv_pagerList.remove();
	}
		return $div_pagerList;
	};
	
	$.pager2 = function(option){
		var count = option.count;
		var page = option.page;
		var pagesize = option.pagesize;
		var $table = option.table;
		if(typeof count=="undefined" || count==null) return;
		var showMaxPage = option.maxPage;//显示的最大页码数量
		if (showMaxPage == null){
			showMaxPage  = 5;
		}
		var pageSplitCount=1;

		var $pagesize = $("#wupagesize2");
		if ($pagesize != null && typeof $pagesize != 'undefined' && $pagesize.val() != null && typeof $pagesize.val() != 'undefined'){
			var reg = /^[0-9]*$/;
			if (reg.test($pagesize.val())){
				pagesize = $pagesize.val();
			}
		}		

		var totalPage = count%pagesize > 0 ? parseInt(count/pagesize)+1: count/pagesize;
		var $div_pagerList = $("<div></div>").addClass("pager_list");
		if ($table != null){
			$table.data("pager", null);
			$table.data("pager", $div_pagerList);
		}
		$div_pagerList.data("currentpage", page);
		/* pager left */
		if(count==0) page=0;
		var $pager_left = $('<div><span class="span_l">共计</span><span class="color span">'+count+'</span><span class="span_l">条记录</span><span class="span_l">每页</span><span class="pagesize"><input type="text" class="text" id="wupagesize2" name="wupagesize2" value="' + pagesize + '"/><i id="iPageSizeUp" class="fa fa-caret-up"></i></span><span>条</span><span class="span_l">当前<label class="color span_l">'+page+'</label>/<label class="color span_r">'+totalPage+'</label>页</span></div>').addClass("left");
		$pager_left.appendTo($div_pagerList);
		
		$pager_left.find("i").click(function(){
			var $pagesize = $pager_left.find(".pagesize");
			var $ul = $("<ul id='pagesizeselect2' class='pagesizeselect2'><li>10</li><li>25</li><li>50</li><li>100</li></ul>");
			$ul.css("position", "absolute");
			$ul.appendTo("body");
			$ul.css("left", $pagesize.offset().left);
			$ul.css("top", $pagesize.offset().top - $ul.height());
			$ul.css("width", $pagesize.width() + 1);
			
			$ul.find("li").click(function(){
				$("#wupagesize2").val($(this).text());
				option.load(1);
			});
			$(document).click(function(e){
				if (e.target.id != "iPageSizeUp"){
					$("#pagesizeselect2").remove();
					$(document).unbind("click");
				}
			});
		});
		
		/* pager center*/
		if(count>0){
			/*************page right*************/
		var $pager_right = $('<div><span class="span_l">跳至</span><input type="text" class="text"/><span class="span_l">页</span></div>').addClass("right");
			
		var $go = $('<button type="button" id="go_page" class="general1">跳转</button>');
		$go.appendTo($pager_right);
		$pager_right.appendTo($div_pagerList);
		
		var $pager_center = $("<div></div>").addClass("center");
		var $ul = $("<ul></ul>").addClass("pager");
		var $firstpage_li = $("<li></li>").data("page",1),$firstpage_a = $("<a class='firstpage'>&nbsp;</a>");
		var $prevpage_li = $("<li></li>").data("page",(parseInt(page)-1)),$prevpage_a = $("<a class='prevpage'>&nbsp;</a>");
		var $nextpage_li = $("<li></li>").data("page",(parseInt(page)+1)),$nextpage_a = $("<a class='nextpage'>&nbsp;</a>");
		var $endpage_li = $("<li></li>").data("page",totalPage),$endpage_a = $("<a class='endpage'>&nbsp;</a>");
		if(totalPage<=showMaxPage) showMaxPage = totalPage;
		if(totalPage==1){
			$firstpage_li.addClass("disabled");$firstpage_a.addClass("firstpage_disabled");
			$prevpage_li.addClass("disabled");$prevpage_a.addClass("prevpage_disabled");
			$nextpage_li.addClass("disabled");$nextpage_a.addClass("nextpage_disabled");
			$endpage_li.addClass("disabled");$endpage_a.addClass("endpage_disabled");
		}else if(page==1){
			$firstpage_li.addClass("disabled");$firstpage_a.addClass("firstpage_disabled");
			$prevpage_li.addClass("disabled");$prevpage_a.addClass("prevpage_disabled");
		}else if(page==totalPage){
			$nextpage_li.addClass("disabled");$nextpage_a.addClass("nextpage_disabled");
			$endpage_li.addClass("disabled");$endpage_a.addClass("endpage_disabled");
		}
		$firstpage_a.appendTo($firstpage_li);$firstpage_li.appendTo($ul);
		$prevpage_a.appendTo($prevpage_li);$prevpage_li.appendTo($ul);
		//var $pageshow =$('<span class="span_l"><label class="color span_l">'+page+'</label>/<label class="color span_r">'+totalPage+'</label></span>')
		var $pageshow = $('<span>第</span><input type="text" class="pageshow" value="'+page+'" disabled="disabled"/><span >页</span>') 
		$pageshow.appendTo($ul);
		/*for(var i=0;i<showMaxPage;i++){
			var $li = $("<li></li>");
			var $a = $('<a href="javascript:void(0);">'+(i+1)+'</a>');
			var $more = $('<li class="disabled"><a href="javascript:void(0);" class="nore">...</a></li>');
			if(i==0 || page<=(showMaxPage-pageSplitCount) || totalPage<=showMaxPage) {
				if((i+1)==page){$li.addClass("disabled");$a.addClass("current");}
				$li.data("page",(i+1));
				$a.appendTo($li);
				$li.appendTo($ul);
				if((i+1)==showMaxPage && totalPage>showMaxPage) $more.appendTo($ul);
				continue;
			}
			var pageNum = parseInt(parseInt(page) - parseInt(pageSplitCount))+ parseInt(parseInt(i)-parseInt(pageSplitCount));
			var centerPage = page;
			if(page>(totalPage-pageSplitCount)) centerPage = totalPage-pageSplitCount;
			if(centerPage>=parseInt(totalPage-pageSplitCount)) pageNum = parseInt(centerPage) - parseInt(parseInt(showMaxPage)-parseInt(pageSplitCount))+ parseInt(i+1);
			if(page==pageNum) {$li.addClass("disabled");$a.addClass("current");}
			$a.html(pageNum);
			$a.appendTo($li);
			$li.data("page",pageNum);
			if(i==pageSplitCount) $more.appendTo($ul);
			$li.appendTo($ul);
			if((i+1)==showMaxPage && pageNum!=totalPage) $more.appendTo($ul);
		}*/
		$nextpage_a.appendTo($nextpage_li);$nextpage_li.appendTo($ul);
		$endpage_a.appendTo($endpage_li);$endpage_li.appendTo($ul);
		$ul.appendTo($pager_center);
		$pager_center.appendTo($div_pagerList);
		
		var $refresh_li = $("<li></li>").data("page",page);
		var $refresh = $('<a class="pagerefresh"><i class="fa fa-refresh"></i></a>').appendTo($refresh_li);
		$refresh_li.appendTo($ul);
		
		/*************pager click event ****************/
		$ul.find("li").click(function(){if(!$(this).hasClass("disabled")) option.load($(this).data("page"));});
		$pager_right.find("input").bind("input propertychange",function(){
			if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'');}
			else{this.value=this.value.replace(/\D/g,'');}
			if(this.value>totalPage) this.value=totalPage;
		}).keyup(function(event){if(event.keyCode == 13 && this.value!="") option.load(this.value);});
		$go.click(function(){var val = parseInt($pager_right.find("input").val());if(val!="" && val<=totalPage) option.load(val);});
		
		var $clonediv_pagerList = $("<div></div>").addClass("pager_list").html($div_pagerList.html());
		$clonediv_pagerList.appendTo($("body"));
		var minwidth = $clonediv_pagerList.find("div.left").width() + $clonediv_pagerList.find("div.center").width() + $clonediv_pagerList.find("div.right").width() + 20;
		if (minwidth > $(document).width()){
			$div_pagerList.css("min-width", minwidth);
		}
		$clonediv_pagerList.remove();
	}
		return $div_pagerList;
	};

})(jQuery);
