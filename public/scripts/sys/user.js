
if(!sessionStorage.token){
	location.href='http://100596.123zou.com/info/node?return='+location.href;
}else{
	if(!sessionStorage.user){
		(function(xhr){
			xhr.open('GET','/system/getUser?token='+sessionStorage.token,true);
			xhr.send(null);
			xhr.onreadystatechange=function(){
				if(xhr.readyState==4 && xhr.status==200){
					//xhr.responseText;
				}
			}
		})(new XMLHttpRequest());
	}else{

	}
}