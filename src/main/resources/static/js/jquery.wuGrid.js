/*
 
 
 
 * 
 * JavaScript - lSelect
 * Version: 3.0
 */

(function($) {
	$.fn.extend({
		wuGrid: function(options) {
			var settings = {
				url:null,
				onShowRow: null,
				pagination:false,
				pagesize:15,
				submitForm:null,
				jsonDataType:'api',
				buttons:null,
				listFieldName:null,
				successCallback:null,
				pageRefresh:true,
				cacheCriteria:false,
				cacheKey:''
			};
			$.extend(settings, options);
			if (settings.listFieldName == null){
				if (settings.jsonDataType == "api"){
					settings.listFieldName = "result";
				} else {
					settings.listFieldName = "content";
				}
			}
			var isLoading = false;
			var $data = {};
			var oldPage = 1;
			
			if(options){
				if(options.data){
					$data = options.data;
				}
				if(options.page){
					oldPage = options.page;
				}
			}
			var $workbenchOri=false;
			if(options.workbenchOri){
				$workbenchOri=options.workbenchOri;
			}
			var $table = this;
			var formSerialize = null;
			if (settings.submitForm != null){
				formSerialize  = settings.submitForm.serialize();
			}
			/**********pager start**************/
			var getPager = function(count,page){
				return $.pager({count:count, page:page, pagesize:settings.pagesize,
						load:function(paged){
								load(paged);
							}
						}
					)
			};
			/**********pager end**************/
			/****load data****/
			var load = function(page){
				if (isLoading){
					return;
				}
				
				//if need pager
				if(settings.pagination){
					var replaceParamVal = function(oUrl,paramName,replaceWith) {
					    return oUrl.replace(eval('/('+ paramName+'=)([^&]*)/gi'),paramName+'='+replaceWith);
					};
					if (settings.submitForm != null){
						formSerialize  = settings.submitForm.serialize();
					}
					if(formSerialize!=null && formSerialize!="") formSerialize += "&";
					if(formSerialize.indexOf("page=")<0)formSerialize = formSerialize + "page="+page;
					else formSerialize = replaceParamVal(formSerialize,"page",page);
					
					var pagesize = settings.pagesize;
					var $pagesize = $("#pagesize");
					if ($pagesize != null && typeof $pagesize != 'undefined' && $pagesize.val() != null && typeof $pagesize.val() != 'undefined'){
						var reg = /^[0-9]*$/;
						if (reg.test($pagesize.val())){
							pagesize = $pagesize.val();
						}
					}
					if(formSerialize.indexOf("pagesize")<0){
						formSerialize = formSerialize + "&pagesize="+pagesize;
					}
					else formSerialize = replaceParamVal(formSerialize,"pagesize",pagesize);
					if($data){
						for (var key in $data){
							formSerialize = formSerialize + "&"+key+"="+$data[key];
						}
					}
				}
				var loading;
				$.ajax({
						url: settings.url,
						type: "POST",
						dataType: "json",
						data:formSerialize,
						cache: false,
						beforeSend: function() {
							$table.find("tr:gt(0)").addClass("ppppdelete");
							if (isLoading){
								return false;
							}
							isLoading = true;
							loading=new ol.loading({container:$table});
							loading.show();
						},
						success: function(data) {
							var tmpcontent = data[settings.listFieldName];
							var content = tmpcontent;
							if (!$.isArray(tmpcontent)){
								content = [tmpcontent];
							}
							var seq = 1;
							var $ths = $table.find("tr:eq(0) th");
							var width = 0;
							var thwidths = $table.data("thwidths");
							if (thwidths == null){
								thwidths = new Array();
								for (var thindex = 0; thindex < $ths.length; thindex++){
									width = $($ths[thindex]).width();
									$($ths[thindex]).css("width", width);
									thwidths.push(width);
								}
								$table.data("thwidths", thwidths);
							}
							for (var key in content){
								var rowData = content[key];
								if (rowData == null){
									continue;
								}
								var $tr = $("<tr ></tr>");
								$tr.data("rowData",rowData);
								var tdHtml = "";
								for (var colKey in settings.colModel){
									var col = settings.colModel[colKey];
									tdHtml = "<td";
									if(typeof col.showTitle != 'undefined' && col.showTitle) tdHtml += ' title="'+rowData[col.name]+'"';
									if(typeof col.className != 'undefined' && col.className!=null && col.className!='') tdHtml += ' class="'+col.className+'"';
									tdHtml+='>';
									if($workbenchOri&&col.name == 'progress'){
										var progress = rowData[col.name];
										var Pro = (progress*100)+"%";
										tdHtml+='<div style="width: 100%;border: 2px solid #41719C;height: 7px;background: #ffffff;">';
										tdHtml+= '<div style="float: left;background: #92D050;width:'+Pro+';height: 3px;"></div></div>';
									}else{
										if (typeof rowData[col.name] == 'undefined' || rowData[col.name] == null){
											rowData[col.name] = "";
										}
										if (col.type == "checkbox"){
											tdHtml += "<input type='checkbox' value='" + rowData[col.name] + "' name='" + col.name + "'>";
										}if (col.type == "radio"){
											tdHtml += "<input type='radio' value='" + rowData[col.name] + "' name='" + col.name + "'>";
										} else if (col.type=="seq"){
											tdHtml += seq ++;
										}
										 else {
											tdHtml += rowData[col.name];
										}
									}
									tdHtml += "</td>";
									var $td = $(tdHtml);
									$td.css("width", thwidths[colKey]);
									$td.appendTo($tr);
								}
								var buttons = settings.buttons;
								if(buttons!=null && buttons.length>0){
									var $td = $("<td style='white-space:nowrap;'></td>");
									for(var i=0;i<buttons.length;i++){
										var button = buttons[i];
										var $button = $("<button type='button'>"+button.value+"</button>");
										if(typeof(button.id)!="undefined" && button.id!=null && button.id!="") $button.attr("id",button.id);
										if(typeof(button.className)!="undefined" && button.className!=null && button.className!="") $button.attr("class",button.className);
										if(typeof(button.style)!="undefined" && button.style!=null && button.style!="") $button.attr("style",button.style);
										$button.appendTo($td);
										var clickEvent = button.click;
										if(typeof(clickEvent) == 'function'){
											$button.on("click",rowData,clickEvent);
										}
									}
									$td.css("width", thwidths[thwidths.length - 1] - 12);
									
									$td.appendTo($tr);
								}
								var rowClick = settings.rowClick;
								if (rowClick != null){
									$tr.on("click",rowData,settings.rowClick);
								}
								$tr.appendTo($table);
							}
							if(settings.pagination){//need pager
								var total = data.total;
								var $pager = getPager(total,page);
								if($pager!=null){
									var $pagerList = $table.parent();
									$(".pager_list").remove();
									$pager.appendTo($pagerList);
								}
							}
							$table.find(".ppppdelete").remove();
							
							var successCallback = settings.successCallback;
							if(successCallback!=null && typeof successCallback=="function") successCallback(data);
						},
						complete: function() {
							isLoading = false;
							loading.remove();
						}
					});
			};
		
			function getUrlParameter(name){
				var up = decodeURI(window.location.search);
			    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
			    var r = up.substr(1).match(reg);
			    if (r != null) return unescape(r[2]); return "";
			}
			/*
			if (settings.cacheCriteria && settings.pageRefresh){
				var isclickmenu = getUrlParameter("isclickmenu");
				if (isclickmenu == '1' && this.data("isSearchCacheCleared") != "1"){
					addCookie(settings.cacheKey + "searchCache", "");
					this.data("isSearchCacheCleared", "1");
				}
				var searchCacheJson = getCookie(settings.cacheKey + "searchCache");
				var searchCache = {};
				if (searchCacheJson != null && searchCacheJson != ""){
					searchCache = eval("(" + getCookie(settings.cacheKey + "searchCache") + ")")
				}
				for (var key in searchCache){
					if (key == "page"){
						searchPage = searchCache[key];
					} else {
						var input = settings.submitForm.find("[name='" + key + "']");
						input.val(searchCache[key]);
						if (input != null && input[0].type == 'select-one'){
							input.data("defaultValue", searchCache[key]);
						}
					}
				}
			}*/
			load(1, settings.pageRefresh);
		}
	});
})(jQuery);