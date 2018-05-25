sendSystemInfo.onclick=function(e){
		var form={};
		if(!msg_title.value || !msg_content.value){
			alert('请输入内容');
			return;
		}
		form.msg_title=msg_title.value;
		form.msg_content=msg_content.value;
		form.msg_type=1;
		form.url=msg_url.value;
		form.can_notify=can_notify.checked?1:0;
		form.sender_id='@member.MEMID';
		sysTip.style.display='block';
		setTimeout(function(){
			sysTip.style.display='none';
		},3000);
		$.ajax({
			url:'http://cj.123zou.com/SysMsg/insert_msg',
			data:form,
			type:'post',
			success:function(data){

			}
		})
	}