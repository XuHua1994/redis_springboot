/*
 
 
 
 * 
 * JavaScript - Input
 * Version: 3.0
 */

$().ready( function() {

	var zIndex = 100;
	var $validatorMessage;
	var validatorMessageTimer;
	$.validatorMessage = function(error) {
		var message = {};
		message.type = "error";
		message.content = error.html();
		//if ($validatorMessage == null) {
		//	toast(message);
		//} else {
			$validatorMessage.children("div").html($validatorMessage.children("div").html() + "<br>" + message.content);
		//}
		return $validatorMessage;
	}
	// 验证消息
	if($.validator != null) {
		$.extend($.validator.messages, {
		    required: message("admin.validate.required"),
			email: message("admin.validate.email"),
			url: message("admin.validate.url"),
			date: message("admin.validate.date"),
			dateISO: message("admin.validate.dateISO"),
			pointcard: message("admin.validate.pointcard"),
			number: message("admin.validate.number"),
			digits: message("admin.validate.digits"),
			minlength: $.validator.format(message("admin.validate.minlength")),
			maxlength: $.validator.format(message("admin.validate.maxlength")),
			rangelength: $.validator.format(message("admin.validate.rangelength")),
			min: $.validator.format(message("admin.validate.min")),
			max: $.validator.format(message("admin.validate.max")),
			range: $.validator.format(message("admin.validate.range")),
			accept: message("admin.validate.accept"),
			equalTo: message("admin.validate.equalTo"),
			remote: message("admin.validate.remote"),
			integer: message("admin.validate.integer"),
			positive: message("admin.validate.positive"),
			negative: message("admin.validate.negative"),
			decimal: message("admin.validate.decimal"),
			pattern: message("admin.validate.pattern"),
			extension: message("admin.validate.extension")
		});
		
		$.validator.setDefaults({
			errorClass: "fieldError",
			ignore: ".ignore",
			ignoreTitle: true,
			onfocusout:false,
			errorPlacement: function(error, element) {
				error.insertAfter(element);
				//$.validatorMessage(error);
			},
			submitHandler: function(form) {
				$(form).find(":submit").prop("disabled", true);
				form.submit();
			}
		});
	}

});

function createKindEditor(){
	editor = KindEditor.create("#editor", {
			height: "350px",
			items: [
				"source", "|", "undo", "redo", "|", "preview", "print", "template", "cut", "copy", "paste",
				"plainpaste", "wordpaste", "|", "justifyleft", "justifycenter", "justifyright",
				"justifyfull", "insertorderedlist", "insertunorderedlist", "indent", "outdent", "subscript",
				"superscript", "clearhtml", "quickformat", "selectall", "|", "fullscreen", "/",
				"formatblock", "fontname", "fontsize", "|", "forecolor", "hilitecolor", "bold",
				"italic", "underline", "strikethrough", "lineheight", "removeformat", "|", "image",
				"flash", "media", "insertfile", "table", "hr", "emoticons", "baidumap", "pagebreak",
				"anchor", "link", "unlink"
			],
			langType: shoplg.locale,
			syncType: "form",
			filterMode: false,
			pagebreakHtml: '<hr class="pageBreak" \/>',
			allowFileManager: true,
			filePostName: "file",
			fileManagerJson: shoplg.base + "/admin/file/browser.htm",
			uploadJson: shoplg.base + "/admin/file/upload.htm",
			uploadImageExtension: setting.uploadImageExtension,
			uploadFlashExtension: setting.uploadFlashExtension,
			uploadMediaExtension: setting.uploadMediaExtension,
			uploadFileExtension: setting.uploadFileExtension,
			extraFileUploadParams: {
				token: getCookie("token")
			},
			afterChange: function() {
				this.sync();
			}
		});
}

function loadKindEditor(){
	// 编辑器
	if(typeof(KindEditor) != "undefined") {
			KindEditor.ready(function(K) {
				editor = K.create("#editor", {
					height: "350px",
					items: [
						"source", "|", "undo", "redo", "|", "preview", "print", "template", "cut", "copy", "paste",
						"plainpaste", "wordpaste", "|", "justifyleft", "justifycenter", "justifyright",
						"justifyfull", "insertorderedlist", "insertunorderedlist", "indent", "outdent", "subscript",
						"superscript", "clearhtml", "quickformat", "selectall", "|", "fullscreen", "/",
						"formatblock", "fontname", "fontsize", "|", "forecolor", "hilitecolor", "bold",
						"italic", "underline", "strikethrough", "lineheight", "removeformat", "|", "image",
						"flash", "media", "insertfile", "table", "hr", "emoticons", "baidumap", "pagebreak",
						"anchor", "link", "unlink"
					],
					langType: shoplg.locale,
					syncType: "form",
					filterMode: false,
					pagebreakHtml: '<hr class="pageBreak" \/>',
					allowFileManager: true,
					filePostName: "file",
					fileManagerJson: shoplg.base + "/admin/file/browser.htm",
					uploadJson: shoplg.base + "/admin/file/upload.htm",
					uploadImageExtension: setting.uploadImageExtension,
					uploadFlashExtension: setting.uploadFlashExtension,
					uploadMediaExtension: setting.uploadMediaExtension,
					uploadFileExtension: setting.uploadFileExtension,
					extraFileUploadParams: {
						token: getCookie("token")
					},
					afterChange: function() {
						this.sync();
					}
				});
			});
	}
}