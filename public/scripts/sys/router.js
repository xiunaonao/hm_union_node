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
	},
	{
		url:'PhoneEditor/{name}/{id}',
		dom:'vote/PhoneEditor',
		script:'vote/phoneEditor.js'
	},
	{
		url:'ArticleList/{id}',
		dom:'vote/ArticleList',
		script:'vote/ArticleList.js'
	},
	{
		url:'SysNotice',
		dom:'vote/SysNotice',
		script:'vote/SysNotice.js'
	},
	{
		url:'ercode',
		dom:'vote/Ercode',
		script:'vote/Ercode.js'
	},
	{
		url:'Examine',
		dom:'vote/Examine',
		script:'vote/Examine.js'
	},
	{
		url:'ChooseBtn',
		dom:'vote/ChooseBtn',
		script:'vote/ChooseBtn.js'
	},
	{
		url:'OrganizeInfo',
		dom:'vote/OrganizeInfo',
		script:'vote/OrganizeInfo.js'
	},
	{
		url:'UnitInfo',
		dom:'vote/UnitInfo',
		script:'vote/UnitInfo.js'
	},
	{
		url:'exchange',
		dom:'info/exchange',
		script:'info/exchange.js'
	},
	{
		url:'serviceLaw',
		dom:'servicehall/serviceLaw',
		script:'servicehall/serviceLaw.js'
	},
	{
		url:'serviceLawForm',
		dom:'servicehall/serviceLawForm',
		script:'servicehall/serviceLawForm.js'
	},
	{
		url:'policy',
		dom:'info/policy',
		script:'info/policy.js'
	},
	{
		url:'join',
		dom:'info/join',
		script:'info/join.js'
	},
	{
		url:'phoneDetail/{id}',
		dom:'vote/phoneDetail',
		script:'vote/phoneDetail.js'
	},
	{
		url:'zgTeacher/{type}',
		dom:'info/zgTeacher',
		script:'info/zgTeacher.js'
	},
	{
		url:'serviceMedical',
		dom:'servicehall/serviceMedical',
		script:'servicehall/serviceMedical.js'
	},
	{
		url:'promote',
		dom:'info/promote'
	},
	{
		url:'userGame',
		dom:'info/userGame'
	},
	{
		url:'exchangeMoreDemo',
		dom:'info/exchangeMoreDemo',
		script:'info/exchangeMoreDemo.js'
	}
	
]

window.linkTo=function(url){
	var hash=location.hash;
	for(var i=0;i<routes.length;i++){
		getData(routes[i]);
	}


	function getData(obj){
		var param=obj.url.toLowerCase().split('/');
		var hashs=hash.toLowerCase().split('/');
		if('#'+param[0]==hashs[0]){
			var paramObj={};
			for(var i=0;i<param.length;i++){
				if(i==0)
					continue;
				paramObj[param[i].replace('{','').replace('}','')]=hashs.length>(i)?hashs[i]:'';
				console.log(param[i].replace('{','').replace('}','')+' = '+ (hashs.length>(i)?hashs[i]:''))
			}
			window._param=(paramObj);



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