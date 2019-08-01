/*
 
 
 
 * 
 * JavaScript - Common
 * Version: 3.0
 */

var shoplg = {
	base: "/ui",
	locale: "zh_CN"
};

var setting = {
	priceScale: "",
	priceRoundType: "",
	currencySign: "",
	currencyUnit: "",
	uploadImageExtension: "jpg,jpeg,bmp,gif,png",
	uploadFlashExtension: "swf,flv",
	uploadMediaExtension: "swf,flv,mp3,wav,avi,rm,rmvb",
	uploadFileExtension: "zip,rar,7z,doc,docx,xls,xlsx,ppt,pptx"
};

var messages = {
	"admin.message.success": "操作成功",
	"admin.message.error": "操作错误",
	"admin.dialog.ok": "确&nbsp;&nbsp;定",
	"admin.dialog.cancel": "取&nbsp;&nbsp;消",
	"admin.dialog.deleteConfirm": "您确定要删除吗？",
	"admin.dialog.clearConfirm": "您确定要清空吗？",
	"admin.browser.title": "选择文件",
	"admin.browser.upload": "本地上传",
	"admin.browser.parent": "上级目录",
	"admin.browser.createFolder": "创建目录",
	"admin.browser.orderType": "排序方式",
	"admin.browser.name": "名称",
	"admin.browser.size": "大小",
	"admin.browser.type": "类型",
	"admin.browser.select": "选择文件",
	"admin.upload.sizeInvalid": "上传文件大小超出限制",
	"admin.upload.typeInvalid": "上传文件格式不正确",
	"admin.upload.invalid": "上传文件格式或大小不正确",
	"admin.validate.required": "必填",
	"admin.validate.email": "邮箱格式错误",
	"admin.validate.url": "网址格式错误",
	"admin.validate.date": "日期格式错误",
	"admin.validate.dateISO": "日期格式错误",
	"admin.validate.pointcard": "admin.validate.pointcard",
	"admin.validate.number": "只允许输入数字",
	"admin.validate.digits": "只允许输入零或正整数",
	"admin.validate.minlength": "长度不允许小于{0}",
	"admin.validate.maxlength": "长度不允许大于{0}",
	"admin.validate.rangelength": "长度必须在{0}-{1}之间",
	"admin.validate.min": "不允许小于{0}",
	"admin.validate.max": "不允许大于{0}",
	"admin.validate.range": "必须在{0}-{1}之间",
	"admin.validate.accept": "输入后缀错误",
	"admin.validate.equalTo": "两次输入不一致",
	"admin.validate.remote": "输入错误",
	"admin.validate.integer": "只允许输入整数",
	"admin.validate.positive": "只允许输入正数",
	"admin.validate.negative": "只允许输入负数",
	"admin.validate.decimal": "数值超出了允许范围",
	"admin.validate.pattern": "格式错误",
	"admin.validate.extension": "文件格式错误"
};
var oldpage = 1;//缓存页码
// 添加Cookie
function addCookie(name, value, options) {
	if (arguments.length > 1 && name != null) {
		if (options == null) {
			options = {};
		}
		if (value == null) {
			options.expires = -1;
		}
		if (typeof options.expires == "number") {
			var time = options.expires;
			var expires = options.expires = new Date();
			expires.setTime(expires.getTime() + time * 1000);
		}
		document.cookie = encodeURIComponent(String(name)) + "=" + encodeURIComponent(String(value)) + (options.expires ? "; expires=" + options.expires.toUTCString() : "") + (options.path ? "; path=" + options.path : "") + (options.domain ? "; domain=" + options.domain : ""), (options.secure ? "; secure" : "");
	}
}

// 获取Cookie
function getCookie(name) {
	if (name != null) {
		var value = new RegExp("(?:^|; )" + encodeURIComponent(String(name)) + "=([^;]*)").exec(document.cookie);
		return value ? decodeURIComponent(value[1]) : null;
	}
}

// 移除Cookie
function removeCookie(name, options) {
	addCookie(name, null, options);
}

// 货币格式化
function currency(value, showSign, showUnit) {
	if (value != null) {
		var price;
		if (setting.priceRoundType == "roundHalfUp") {
			price = (Math.round(value * Math.pow(10, setting.priceScale)) / Math.pow(10, setting.priceScale)).toFixed(setting.priceScale);
		} else if (setting.priceRoundType == "roundUp") {
			price = (Math.ceil(value * Math.pow(10, setting.priceScale)) / Math.pow(10, setting.priceScale)).toFixed(setting.priceScale);
		} else {
			price = (Math.floor(value * Math.pow(10, setting.priceScale)) / Math.pow(10, setting.priceScale)).toFixed(setting.priceScale);
		}
		if (showSign) {
			price = setting.currencySign + price;
		}
		if (showUnit) {
			price += setting.currencyUnit;
		}
		return price;
	}
}

// 多语言
function message(code) {
	if (code != null) {
		var content = messages[code] != null ? messages[code] : code;
		if (arguments.length == 1) {
			return content;
		} else {
			if ($.isArray(arguments[1])) {
				$.each(arguments[1], function(i, n) {
					content = content.replace(new RegExp("\\{" + i + "\\}", "g"), n);
				});
				return content;
			} else {
				$.each(Array.prototype.slice.apply(arguments).slice(1), function(i, n) {
					content = content.replace(new RegExp("\\{" + i + "\\}", "g"), n);
				});
				return content;
			}
		}
	}
}

(function($) {

	var zIndex = 100;
	
	// 消息框
	var $message;
	var messageTimer;
	$.message = function() {
		var message = {};
		if ($.isPlainObject(arguments[0])) {
			message = arguments[0];
		} else if (typeof arguments[0] === "string" && typeof arguments[1] === "string") {
			message.type = arguments[0];
			message.content = arguments[1];
		} else {
			return false;
		}
		
		if (message.type == null || message.content == null) {
			return false;
		}
		
		toastr.options = {
		  "closeButton": true,
		  "debug": false,
		  "progressBar": true,
		  "preventDuplicates": false,
		  "positionClass": "toast-top-center",
		  "onclick": null,
		  "showDuration": "400",
		  "hideDuration": "1000",
		  "timeOut": "7000",
		  "extendedTimeOut": "1000",
		  "showEasing": "swing",
		  "hideEasing": "linear",
		  "showMethod": "fadeIn",
		  "hideMethod": "fadeOut"
		};		
		var type = message.type;
		if (type == "warn"){
			type = "warning";
		}
		toastr[type](message.content);
	}
	$.tabpanel = function getTabPanel(){
		return window.parent.tabpanel;
	}
	$.showLoading = function displayLoading(options) {
		var settings = {
			width: 320,
			height: "auto"
		};
		$.extend(settings, options);
		var bodyWidth = $(document.body).width();
		var bodyHeight = $(document.body).height();
		var $dialog = $('<div id="xxLoading" class="xxLoading"><img src="/ui/resources/admin/images/loading.gif"><\/div>');
		$dialog.appendTo("body");
		$dialogOverlay = $('<div id="dialogOverlay" class="dialogOverlay"><\/div>').insertAfter($dialog);
		$dialogOverlay.css({"z-index": zIndex ++});
		$dialog.css({"position": "absolute", "top":bodyHeight / 2, "width": settings.width, "height": settings.height, "margin-left": bodyWidth / 2 - parseInt(settings.width / 2), "z-index": zIndex ++});
		$dialog.show();
		$dialogOverlay.show();
		return $dialog;
	}
	
	$.fn.serializeObject = function()
	{
	    var o = {};
	    var a = this.serializeArray();
	    $.each(a, function() {
	        if (o[this.name] !== undefined) {
	            if (!o[this.name].push) {
	                o[this.name] = [o[this.name]];
	            }
	            o[this.name].push(this.value || '');
	        } else {
	            o[this.name] = this.value || '';
	        }
	    });
	    return o;
	};
	$.fn.extend({
		pager: function(method) {
			if (method == "getPageSize"){
				var $pager = this.data("pager");
				if ($pager == null){
					return 15;
				} else {
					return $pager.find("#wupagesize").val();
				}
			}
			if (method == "getPage"){
				var $pager = this.data("pager");
				if ($pager == null){
					return 1;
				} else {
					return $pager.data("currentpage");
				}
			}
		}
	});

	// 对话框
	$.dialog = function(options) {
		var settings = {
			width: 320,
			height: "auto",
			modal: true,
			modalSize: null,
			title: "温馨提示",
			ok: message("admin.dialog.ok"),
			cancel: message("admin.dialog.cancel"),
			onShow: null,
			onClose: null,
			onOk: null,
			onCancel: null
		};
		$.extend(settings, options);
		
		if (settings.content == null) {
			return false;
		}
		var $dialog = $('<div id="divDialog" class="modal inmodal fade" tabindex="-1" role="dialog" aria-hidden="true" style="display: none;"><\/div>');
		var $dialogDialog;
		if (settings.modalSize == "large"){
			$dialogDialog = $('<div class="modal-dialog modal-lg"><\/div>').appendTo($dialog);
		} else {
			$dialogDialog = $('<div class="modal-dialog"><\/div>').appendTo($dialog);
		}var $dialogContent;
		var $dialogBottom;
		var $dialogTitle;
		var $dialogOk;
		var $dialogCancel;
		var $dialogOverlay;
		if (settings.title != null) {
			$dialogTitle = $('<div class="dialogTitle"><\/div>').appendTo($dialog);
		}
		if (settings.type != null) {
			$dialogContent = $('<div class="modal-content"><\/div>').appendTo($dialogDialog);
		} else {
			$dialogContent = $('<div class="modal-content"><\/div>').appendTo($dialogDialog);
		}
		if (settings.title != null) {
			$dialogTitle= $('<div class="modal-header text-left bor-0"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button><h4 class="modal-title">' + settings.title + '</h4></div>').appendTo($dialogContent);
		}
		var $dialogContCont = $('<div class="modal-body" style="padding:20px;"><\/div>').appendTo($dialogContent);
		if (settings.ok != null || settings.cancel != null) {
			$dialogBottom = $('<div class="modal-footer"><\/div>').appendTo($dialogContent);
		}
		if (settings.ok != null) {
			$dialogOk = $('<button type="button" id="dialogOk" class="ladda-button btn btn-primary">' + settings.ok + '<\/button>').appendTo($dialogBottom);
		}
		if (settings.cancel != null) {
			$dialogCancel = $('<button type="button" class="btn btn-white" data-dismiss="modal">' + settings.cancel + '<\/button>').appendTo($dialogBottom);
		}
		if (!window.XMLHttpRequest) {
			$dialog.append('<iframe class="dialogIframe"><\/iframe>');
		}
		$dialog.appendTo("body");
		
		$dialogContCont.html(settings.content);
		
		dialogShow();
		
		
		if ($dialogOk != null) {
			$dialogOk.click(function() {
				if (settings.onOk && typeof settings.onOk == "function") {
					if (settings.onOk($dialog) != false) {
						$dialog.modal("hide");
					}
				} else {
					$dialog.modal("hide");
				}
				return false;
			});
		}
		
		if ($dialogCancel != null) {
			$dialogCancel.click(function() {
				if (settings.onCancel && typeof settings.onCancel == "function") {
					if (settings.onCancel($dialog) != false) {
						$dialog.modal("hide");
					}
				} else {
					$dialog.modal("hide");
				}
				return false;
			});
		}
		
		function dialogShow() {
			if (settings.onShow && typeof settings.onShow == "function") {
				if (settings.onShow($dialog) != false) {
					$dialog.modal();
				}
			} else {
				$dialog.modal();
			}
		}
		function dialogClose() {
			if (settings.onClose && typeof settings.onClose == "function") {
				if (settings.onClose($dialog) != false) {
					$dialog.modal("hide");
				}
			} else {
				$dialog.modal("hide");
			}
		}
		return $dialog;
	}



	// 文件浏览
	$.fn.extend({
		browser: function(options) {
			var settings = {
				type: "image",
				title: message("admin.browser.title"),
				isUpload: true,
				browserUrl: shoplg.base + "/admin/file/browser.htm",
				uploadUrl: shoplg.base + "/admin/file/upload.htm",
				createFolderUrl: shoplg.base + "/admin/file/create_folder.htm",
				callback: null
			};
			$.extend(settings, options);
			
			var token = getCookie("token");
			var cache = {};
			return this.each(function() {
				var curPath = "";
				var browserFrameId = "browserFrame" + (new Date()).valueOf() + Math.floor(Math.random() * 1000000);
				var $browserButton = $(this);
				$browserButton.click(function() {
					var $browser = $('<div class="xxBrowser"><\/div>');
					var $browserBar = $('<div class="browserBar"><\/div>').appendTo($browser);
					var $browserFrame;
					var $browserForm;
					var $browserUploadButton;
					var $browserUploadInput;
					var $browserParentButton;
					var $browserOrderType;
					var $browserLoadingIcon;
					var $browserList;
					if (settings.isUpload) {
						$browserFrame = $('<iframe id="' + browserFrameId + '" name="' + browserFrameId + '" style="display: none;"><\/iframe>').appendTo($browserBar);
						$browserForm = $('<form action="' + settings.uploadUrl + '" method="post" encType="multipart/form-data" target="' + browserFrameId + '"><input type="hidden" name="token" value="' + token + '" \/><input type="hidden" name="fileType" value="' + settings.type + '" \/><input type="hidden" id="path" name="path" value="" \/><\/form>').appendTo($browserBar);
						$browserUploadButton = $('<a href="javascript:;" class="browserUploadButton button">' + message("admin.browser.upload") + '<\/a>').appendTo($browserForm);
						$browserUploadInput = $('<input type="file" name="file" \/>').appendTo($browserUploadButton);
					}
					$browserParentButton = $('<a href="javascript:;" class="button">' + message("admin.browser.parent") + '<\/a>').appendTo($browserBar);
					$createFolderButton = $('<a href="javascript:;" class="button">' + message("admin.browser.createFolder") + '<\/a>').appendTo($browserBar);
					$browserBar.append(message("admin.browser.orderType") + ": ");
					$browserOrderType = $('<select name="orderType" class="browserOrderType"><option value="name">' + message("admin.browser.name") + '<\/option><option value="size">' + message("admin.browser.size") + '<\/option><option value="type">' + message("admin.browser.type") + '<\/option><\/select>').appendTo($browserBar);
					$browserLoadingIcon = $('<span class="loadingIcon" style="display: none;">&nbsp;<\/span>').appendTo($browserBar);
					$browserList = $('<div class="browserList"><\/div>').appendTo($browser);
	
					var $dialog = $.dialog({
						title: settings.title,
						content: $browser,
						width: 700,
						height:450,
						modal: true,
						ok: null,
						cancel: null
					});
					
					var browserPath = getCookie("browserPath");
					if (browserPath != null && browserPath != ""){
						browserList(browserPath);
					} else {
						browserList("/");
					}
					
					
					function browserList(path) {
						var key = settings.type + "_" + path + "_" + $browserOrderType.val();
						if (cache[key] == null) {
							$.ajax({
								url: settings.browserUrl,
								type: "GET",
								data: {fileType: settings.type, orderType: $browserOrderType.val(), path: path},
								dataType: "json",
								cache: false,
								beforeSend: function() {
									$browserLoadingIcon.show();
								},
								success: function(data) {
									createBrowserList(path, data);
									cache[key] = data;
								},
								complete: function() {
									$browserLoadingIcon.hide();
								}
							});
						} else {
							createBrowserList(path, cache[key]);
						}
						curPath = path;
					}
					
					function createBrowserList(path, data) {
						var browserListHtml = "";
						$.each(data, function(i, fileInfo) {
							var iconUrl;
							var title;
							if (fileInfo.isDirectory) {
								iconUrl = shoplg.base + "/resources/admin/images/folder_icon.gif";
								title = fileInfo.name;
							} else if (new RegExp("^\\S.*\\.(jpg|jpeg|bmp|gif|png)$", "i").test(fileInfo.name)) {
								iconUrl = fileInfo.url;
								title = fileInfo.name + " (" + Math.ceil(fileInfo.size / 1024) + "KB, " + new Date(fileInfo.lastModified).toLocaleString() + ")";
							} else {
								iconUrl = shoplg.base + "/resources/admin/images/file_icon.gif";
								title = fileInfo.name + " (" + Math.ceil(fileInfo.size / 1024) + "KB, " + new Date(fileInfo.lastModified).toLocaleString() + ")";
							}
							browserListHtml += '<div class="browserItem"><img src="' + iconUrl + '" title="' + title + '" url="' + fileInfo.url + '" isDirectory="' + fileInfo.isDirectory + '" \/><div>' + fileInfo.name + '<\/div><\/div>';
						});
						$browserList.html(browserListHtml);
						
						$browserList.find("img").bind("click", function() {
							var $this = $(this);
							var isDirectory = $this.attr("isDirectory");
							if (isDirectory == "true") {
								var name = $this.next().text();
								browserList(path + name + "/");
							} else {
								var url = $this.attr("url");
								if (settings.input != null) {
									settings.input.val(url);
								} else {
									$browserButton.prev(":text").val(url);
								}
								if (settings.img != null){
									settings.img.attr("src", url);
								}
								if (settings.callback != null && typeof settings.callback == "function") {
									settings.callback(url);
								}
								$dialog.next(".dialogOverlay").andSelf().remove();
							}
						});
						
						if (path == "/") {
							$browserParentButton.unbind("click");
						} else {
							var parentPath = path.substr(0, path.replace(/\/$/, "").lastIndexOf("/") + 1);
							$browserParentButton.unbind("click").bind("click", function() {
								browserList(parentPath);
							});
						}
						$browserOrderType.unbind("change").bind("change", function() {
							browserList(path);
						});
					}
					
					$browserUploadInput.change(function() {
						var allowedUploadExtensions;
						if (settings.type == "flash") {
							allowedUploadExtensions = setting.uploadFlashExtension;
						} else if (settings.type == "media") {
							allowedUploadExtensions = setting.uploadMediaExtension;
						} else if (settings.type == "file") {
							allowedUploadExtensions = setting.uploadFileExtension;
						} else {
							allowedUploadExtensions = setting.uploadImageExtension;
						}
						if ($.trim(allowedUploadExtensions) == "" || !new RegExp("^\\S.*\\.(" + allowedUploadExtensions.replace(/,/g, "|") + ")$", "i").test($browserUploadInput.val())) {
							$.message("warn", message("admin.upload.typeInvalid"));
							return false;
						}
						$browserForm.find("#path").val(curPath);
						$browserLoadingIcon.show();
						$browserForm.submit();
					});

					$createFolderButton.click(function() {
						var folderName=prompt("请输入文件夹名称","");
						var key = settings.type + "_" + curPath + "_" + $browserOrderType.val();
						$.ajax({
							url: settings.createFolderUrl,
							type: "GET",
							data: {folderName: folderName, path: curPath},
							dataType: "json",
							cache: false,
							beforeSend: function() {
								$browserLoadingIcon.show();
							},
							success: function(data) {
								cache[key] = null;
								browserList(curPath);
							},
							complete: function() {
								$browserLoadingIcon.hide();
							}
						});
					});
					
					$browserFrame.load(function() {
						var text;
						var io = document.getElementById(browserFrameId);
						if(io.contentWindow) {
							text = io.contentWindow.document.body ? io.contentWindow.document.body.innerHTML : null;
						} else if(io.contentDocument) {
							text = io.contentDocument.document.body ? io.contentDocument.document.body.innerHTML : null;
						}
						if ($.trim(text) != "") {
							$browserLoadingIcon.hide();
							var data = $.parseJSON(text);
							if (data.message.type == "success") {
								/*if (settings.input != null) {
									settings.input.val(data.url);
								} else {
									$browserButton.prev(":text").val(data.url);
								}
								if (settings.callback != null && typeof settings.callback == "function") {
									settings.callback(data.url);
								}*/
								cache = {};
								browserList(curPath);
								//$dialog.next(".dialogOverlay").andSelf().remove();
							} else {
								$.message(data.message);
							}
						}
					});
					
				});
			});
		}
	});

	// 令牌
	$(document).ajaxSend(function(event, request, settings) {
		if (!settings.crossDomain && settings.type != null && settings.type.toLowerCase() == "post") {
			var token = getCookie("token");
			if (token != null) {
				request.setRequestHeader("token", token);
			}
		}
		var apiSessionId = getCookie("apiSessionId");
		if (apiSessionId != null) {
			var url = settings.url;
			if (url.indexOf("?") >= 0){
				url += "&sessionid=" + apiSessionId;
			} else {
				url += "?sessionid=" + apiSessionId;
			}
			settings.url = url;
			//request.setParameter("sessionid", apiSessionId);
		}
	});
	
	$(document).ajaxComplete(function(event, request, settings) {
		if (request.responseText != null && request.responseText != ""){
			var json = eval("(" + request.responseText + ")");
			if (json.code == '-1'){
				layer.confirm('会话过期，请重新登录。', {
		  			btn: ['确定'], //按钮
				}, function(){
					window.top.location = "/ui/admin/logout.jsp?tp=1";
					});
				return;
			}
		}
		if (!request.getResponseHeader){
			return;
		}
		var loginStatus = request.getResponseHeader("loginStatus");
		var tokenStatus = request.getResponseHeader("tokenStatus");
		
		if (loginStatus == "accessDenied") {
			$.message("warn", "登录超时，请重新登录");
			setTimeout(function() {
				window.top.location.reload(true);
			}, 2000);
		} else if (loginStatus == "unauthorized") {
			$.message("warn", "对不起，您无此操作权限！");
		} else if (tokenStatus == "accessDenied") {
			var token = getCookie("token");
			if (token != null) {
				$.extend(settings, {
					global: false,
					headers: {token: token}
				});
				$.ajax(settings);
			}
		}
	});

})(jQuery);

// 令牌
$().ready(function() {
	
	$("form").submit(function() {
		var $this = $(this);
		if ($this.attr("method") != null && $this.attr("method").toLowerCase() == "post" && $this.find("input[name='token']").size() == 0) {
			var token = getCookie("token");
			if (token != null) {
				$this.append('<input type="hidden" name="token" value="' + token + '" \/>');
			}
		}
	});
	
	$("textarea").on("keydown", function(e){
		if ($(this).attr("maxlength") == null){
			return true;
		}
		var maxLength = parseInt($(this).attr("maxlength"));
		if (e.keyCode == 13){
		return true;
		}

		var textarea = e.target;
		if (e.shiftKey)
		// ignore shift click for select
		return true;

		var allowKey = false;
		if (textarea.selectionStart != textarea.selectionEnd)
		allowKey = true;
		else {
		var keyCode =
		document.layers ? e.which : e.keyCode;
		if (keyCode < 32 && keyCode != 13)
		allowKey = true;
		else
		allowKey = textarea.value.length < maxLength;
		}
		textarea.selected = false;
		return allowKey;
	});  

	var $restContainer = $(".rest-container");
	if ($restContainer.length > 0){
		var $restAdjustTable = $(".rest-adjust-table");
		var top = $restAdjustTable.offset().top - $restContainer.offset().top;
		$restAdjustTable.find("tbody").css("height", $restContainer.height() - top - 90);
	}
});