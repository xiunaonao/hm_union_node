var routes=[
	{
		url:'news/{id}/{name}',
		dom:'info/news',
		script:'info/news.js'
	},
	{
		url:'UserCard',
		dom:'info/UserCard',
		script:'info/usercard.js'
	},
	{
		url:'MemberInfo/{id}',
		dom:'vote/MemberInfo',
		script:'vote/memberinfo.js'
	}
	
]

window.linkTo=function(url){
	var hash=location.hash;
	for(var i=0;i<routes.length;i++){
		getData(routes[i]);
	}


	function getData(obj){
		var param=obj.url.split('/');
		var hashs=hash.split('/');
		var paramObj={};
		for(var i=0;i<paramObj.length;i++){
			if(i==0)
				continue;
			paramObj[param[i].replace('{','').replace('}','')]=hashs.length>(i+1)?hashs[i]:'';
			sessionStorage.param=JSON.stringify(paramObj);
		}

		if(paran[0]==hash){
			var xhr= new XMLHttpRequest();
			xhr.open('GET',obj.dom+'.html',true);
			xhr.send(null);
			xhr.onreadystatechange=function(){

				if (xhr.readyState==4)
				{// 4 = "loaded"
				  if (xhr.status==200)
				    {// 200 = OK
				    	//console.log(xhr.responseText);
				    	//main.write(xhr.responseText);
				    	//var section=document.createElement('section');
				    	//section.innerHTML=xhr.responseText;
				    	main.innerHTML=(xhr.responseText);
				    	var script=document.createElement('script')
				    	script.src='/scripts/'+obj.script;
				    	main.appendChild(script);
				    	//main.appendChild(section);
				    }
				}


			}
		}
	}
}


window.addEventListener("popstate",function(e){
	window.linkTo();
});