var routes=[
	{
		url:'news',
		dom:'info/news',
		script:'info/news.js'
	}
	
]

window.linkTo=function(url){
	var hash=location.hash;
	for(var i=0;i<routes.length;i++){
		getData(routes[i]);
	}


	function getData(obj){
		if('#'+obj.url==hash){
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