<!DOCTYPE html>
<html>

<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="IE=edge">

<title>领导指示</title>
<style type="text/css">
</style>
	<script src="http://libs.baidu.com/jquery/2.1.4/jquery.min.js"></script>
	<script  src="../js/layer/layer.js"></script>
	<script type="text/javascript" src="../js/easyui/jquery.easyui.min.js"></script>
</head>

<body>


	<div class="easyui-layout" style="height: 90%; border: 1px;">
		<form id="loginForm" class="login" onsubmit="return false;">
			<div>
				<a>姓名:</a><input id="username" name="username" style="width: 80px;">
			</div>
			<div>
				<a>密码:</a><input id="password" name="password" style="width: 80px;">
			</div>
			<!-- <div>
				<a>部门:</a><input id="department" name="department"
					style="width: 80px;">
			</div> -->
			<button type="button" id="save"
				onclick="submitAll()">登入</button>
		</form>
		
	</div>

	<script>
		

		function submitAll() {
			var queryParams = {};
			queryParams["username"]=$("#username").val();
			queryParams["password"]=$("#password").val();
			$.ajax({
				url : '../admin/user/getLogin',
				type : "POST",
				dataType : "json",
				data:queryParams,
				cache : false,
				success : function(data) {
					if(data.state){
						window.location.href='index';
					}else{
						layer.alert(data.msg);
					}
					
				},
				error : function() {
					layer.alert("系统错误")
				}
			})
		}
		
	</script>

</body>

</html>