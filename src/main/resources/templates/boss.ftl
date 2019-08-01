<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <title>领导指示</title>
<style type="text/css">
	
</style>
</head>
							
<body>


<div class="easyui-layout" style="height:90%;border:1px;">
	<div data-options="region:'north'" style="height:1px;">
		 <div class="container-fluid">
      <form id="fault_form">
         <div class="content">
        	 <div class="row">             
                <div class="col-md-3" id="bossname">
	              <label>领导姓名：</label>
	              <input class="form-control m-b-20" type="text"  name="name" id="name"  placeholder=""></input>  
                 </div>                                                                   
              </div>
              <div class="row">             
                <div class="col-md-3">
	              <label>领导指示内容：</label>
	                <textarea class="form-control m-b-20"  name="content" id="content" rows="6" cols="30" ></textarea>  
                 </div>                                                                   
              </div>
            </div>

          </form>
          <button type="button" class="btn btn-success btn-lg" id="save" onclick="submitAll()" >提交</button>
 
    </div>
	</div>
</div>


<script>

</script>

</body>

</html>