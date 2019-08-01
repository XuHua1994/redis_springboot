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
	<script type="text/javascript" src="../js/layer/layer.js"></script>
	<script type="text/javascript" src="../js/jquery.validate.js"></script>
	<script type="text/javascript" src="../js/common.js"></script>
	<script type="text/javascript" src="../js/olloading/jquery.bgiframe.min.js"></script>
	<script type="text/javascript" src="../js/olloading/loading-min.js"></script>
	<script type="text/javascript" src="../js/easyui/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="../js/pagetoitportal.js"></script>
</head>

<body>


	<div class="easyui-layout" style="height: 90%; border: 1px;">
		
		<div><a>欢迎登入!</a></div>
		<div>姓名:</div>
		<button id="" onclick="getName()">获取</button><input id="name"></input>
	</div>

	<script>
	
	function getName() {
		$.ajax({
			url : '../admin/user/getUserById',
			type : "POST",
			dataType : "json",
			data:{id:'1'},
			cache : false,
			success : function(data) {
				
				if(data.state){
					var result=data.result;
					$("#name").val(result.userName);
				}else{
					layer.alert(data.msg);
				}
				
			},
			error : function(e) {
				layer.alert("系统错误");
			}
		})
	}
	
	</script>

</body>

</html>