/*
 
 
 
 * 
 * JavaScript - List
 * Version: 3.0
 */

$().ready( function() {

	var $listForm = $("#listForm");
	var $pageTotal = $("#pageTotal");
	var $addButton = $("#addButton");
	var $editButton = $(".editButton");
	
	var $deleteButton = $("#deleteButton");
	var $checkLinkedButton = $(".checkLinkedButton");
	var $refreshButton = $("#refreshButton");
	var $pageSizeSelect = $("#pageSizeSelect");
	var $pageSizeOption = $("#pageSizeOption a");
	var $moreOperation = $("#moreOperation");
	var $searchPropertySelect = $("#searchPropertySelect");
	var $searchPropertyOption = $("#searchPropertyOption a");
	var $searchValue = $("#searchValue");
	var $listTable = $("#listTable");
	var $selectAll = $("#selectAll");
	var $ids = $("#listTable input[name='ids']");
	var $contentRow = $("#listTable tr:gt(0)");
	var $sort = $("#listTable a.sort");
	var $pageSize = $("#pageSize");
	var $searchProperty = $("#searchProperty");
	var $orderProperty = $("#orderProperty");
	var $orderDirection = $("#orderDirection");
	var $pageNumber = $("#pageNumber");
	
	$addButton.click(function(){
		$(".modal").remove();
		var title = $(this).attr("modalTitle");
		$.ajax({
			url: "add.jhtm",
			type: "GET",
			dataType: "text",
			cache: false,
			success: function(html) {
				$.dialog({
					title:title,
					modalSize:"large",
					content: html,
					ok: "保存",
					cancel: "取消",
					onShow: function(){
						if (window.postPageLoad != null){
							if (!postPageLoad("add")){
								return;
							}
						}
					},
					onOk: function() {
						
						var l = $( '#dialogOk' ).ladda();
						l.ladda('start');
						if (window.beforeSave != null){
							if (!beforeSave("add")){
								return;
							}
						}
						$("#addForm").validate({
							submitHandler: function(form) {
								$.ajax({
									url: "save.jhtm",
									type: "POST",
									data: $("#addForm").serialize(),
									dataType: "json",
									cache: false,
									success: function(message) {
										if (message.type == "success") {
											window.location.reload();
										} else {
											$.message(message);
											return false;
										}
									},
									complete:function(){
										l.ladda('stop');
									}
								});
								return false;
							}
						});
						$("#addForm").submit();
						return false;
					}
				});
			}
		});
		
	});
	
	$editButton.click(function(){
		$(".modal").remove();
		var url = $(this).attr("url");
		var title = $(this).attr("modalTitle");
		$.ajax({
			url: url,
			type: "GET",
			dataType: "text",
			cache: false,
			success: function(html) {
				$.dialog({
					title:title,
					modalSize:"large",
					content: html,
					ok: "保存",
					cancel: "取消",
					onShow: function(){
						if (window.postPageLoad != null){
							if (!postPageLoad("update")){
								return;
							}
						}
					},
					onOk: function() {
						if (window.beforeSave != null){
							if (!beforeSave("update")){
								return;
							}
						}
						$("#editForm").validate({
							submitHandler: function(form) {
								var l = $( '#dialogOk' ).ladda();
								l.ladda('start');
								$.ajax({
									url: "update.jhtm",
									type: "POST",
									data: $("#editForm").serialize(),
									dataType: "json",
									cache: false,
									success: function(message) {
										if (message.type == "success") {
											window.location.reload();
										} else {
											$.message(message);
											return false;
										}
									},
									complete:function(){
										l.ladda('stop');
									}
								});
								return false;
							}
						});
						$("#editForm").submit();
						return false;
					}
				});
			}
		});
		
	});
	// 删除
	$deleteButton.click( function() {
		var $this = $(this);
		if ($this.hasClass("disabled")) {
			return false;
		}
		var $checkedIds = $("#listTable input[name='ids']:enabled:checked");
		$.dialog({
			type: "warn",
			content: '<div class="modal-body"><p id="msg">确定删除选择的记录?</p></div>',
			ok: message("admin.dialog.ok"),
			cancel: message("admin.dialog.cancel"),
			onOk: function() {
				$.ajax({
					url: "delete.jhtm",
					type: "POST",
					data: $checkedIds.serialize(),
					dataType: "json",
					cache: false,
					success: function(message) {
						$.message(message);
						if (message.type == "success") {
							$pageTotal.text(parseInt($pageTotal.text()) - $checkedIds.size());
							$checkedIds.closest("tr").remove();
							if ($listTable.find("tr").size() <= 1) {
								setTimeout(function() {
									location.reload(true);
								}, 3000);
							}
						}
						$deleteButton.addClass("disabled");
						$selectAll.prop("checked", false);
						$checkedIds.prop("checked", false);
					}
				});
			}
		});
	});
	
	// 刷新
	$refreshButton.click( function() {
		$.showLoading();
		location.reload(true);
		return false;
	});
	
	// 每页记录数选项
	$pageSizeSelect.mouseover( function() {
		var $this = $(this);
		var offset = $this.offset();
		var $menuWrap = $this.closest("div.menuWrap");
		var $popupMenu = $menuWrap.children("div.popupMenu");
		$popupMenu.css({left: offset.left, top: offset.top + $this.height() + 2}).show();
		$menuWrap.mouseleave(function() {
			$popupMenu.hide();
		});
	});
	
	// 每页记录数
	$pageSizeOption.click( function() {
		var $this = $(this);
		$pageSize.val($this.attr("val"));
		$pageNumber.val("1");
		$listForm.submit();
		return false;
	});
	
	// 更多选项
	$moreOperation.mouseover( function() {
		var $this = $(this);
		var offset = $this.offset();
		var $menuWrap = $this.closest("div.menuWrap");
		var $popupMenu = $menuWrap.children("div.popupMenu");
		$popupMenu.css({left: offset.left, top: offset.top + $this.height() + 2}).show();
		$menuWrap.mouseleave(function() {
			$popupMenu.hide();
		});
	});
	
	// 搜索选项
	$searchPropertySelect.mouseover( function() {
		var $this = $(this);
		var offset = $this.offset();
		var $menuWrap = $this.closest("div.menuWrap");
		var $popupMenu = $menuWrap.children("div.popupMenu");
		$popupMenu.css({left: offset.left - 1, top: offset.top + $this.height() + 2}).show();
		$menuWrap.mouseleave(function() {
			$popupMenu.hide();
		});
	});
	
	// 搜索选项
	$searchPropertyOption.click( function() {
		var $this = $(this);
		$searchProperty.val($this.attr("val"));
		$searchPropertyOption.removeClass("current");
		$this.addClass("current");
		return false;
	});
	
	// 全选
	$selectAll.click( function() {
		var $this = $(this);
		var $enabledIds = $("#listTable input[name='ids']:enabled");
		if ($this.prop("checked")) {
			$enabledIds.prop("checked", true);
			if ($enabledIds.filter(":checked").size() > 0) {
				$deleteButton.removeClass("disabled");
				$checkLinkedButton.removeClass("disabled");
				$contentRow.addClass("selected");
			} else {
				$deleteButton.addClass("disabled");
				$checkLinkedButton.addClass("disabled");
			}
		} else {
			$enabledIds.prop("checked", false);
			$deleteButton.addClass("disabled");
			$checkLinkedButton.addClass("disabled");
			$contentRow.removeClass("selected");
		}
	});
	
	// 选择
	$ids.click( function() {
		var $this = $(this);
		if ($this.prop("checked")) {
			$this.closest("tr").addClass("selected");
			$deleteButton.removeClass("disabled");
			$checkLinkedButton.removeClass("disabled");
		} else {
			$this.closest("tr").removeClass("selected");
			if ($("#listTable input[name='ids']:enabled:checked").size() > 0) {
				$deleteButton.removeClass("disabled");
				$checkLinkedButton.removeClass("disabled");
			} else {
				$deleteButton.addClass("disabled");
				$checkLinkedButton.addClass("disabled");
			}
		}
	});
	
	// 排序
	$sort.click( function() {
		var orderProperty = $(this).attr("name");
		if ($orderProperty.val() == orderProperty) {
			if ($orderDirection.val() == "asc") {
				$orderDirection.val("desc")
			} else {
				$orderDirection.val("asc");
			}
		} else {
			$orderProperty.val(orderProperty);
			$orderDirection.val("asc");
		}
		$pageNumber.val("1");
		$listForm.submit();
		return false;
	});
	
	// 排序图标
	if ($orderProperty.val() != "") {
		$sort = $("#listTable a[name='" + $orderProperty.val() + "']");
		if ($orderDirection.val() == "asc") {
			$sort.removeClass("desc").addClass("asc");
		} else {
			$sort.removeClass("asc").addClass("desc");
		}
	}
	
	// 页码输入
	$pageNumber.keypress(function(event) {
		var key = event.keyCode ? event.keyCode : event.which;
		if ((key == 13 && $(this).val().length > 0) || (key >= 48 && key <= 57)) {
			return true;
		} else {
			return false;
		}
	});
	
	// 表单提交
	$listForm.submit(function() {
		if (!/^\d*[1-9]\d*$/.test($pageNumber.val())) {
			$pageNumber.val("1");
		}
		if ($searchValue.size() > 0 && $searchValue.val() != "" && $searchProperty.val() == "") {
			$searchProperty.val($searchPropertyOption.eq(0).attr("val"));
		}
	});
	
	// 页码跳转
	$.pageSkip = function(pageNumber) {
		$pageNumber.val(pageNumber);
		$listForm.submit();
		return false;
	}
	
	// 列表查询
	if (location.search != "") {
		addCookie("listQuery", location.search);
	} else {
		removeCookie("listQuery");
	}

});