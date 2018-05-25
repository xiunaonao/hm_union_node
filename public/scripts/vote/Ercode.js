var vapp=new Vue({
	el:'#ercode',
	data:{
		type:1,
		memberId:JSON.parse(sessionStorage.users).member_id,
		memberCode:'',
		companyCode:'',
		showerId:0
	},

	methods:{
		cancelBubble:function(ev){
			ev.cancelBubble=true;
		}
	},
	mounted:function(data){
		var t=this;
		// this.memberId = _param.id;

		//this.memberId='1826164934900000376';
		this.$http.get('http://cj.123zou.com/MobileNews/get_member_info?member_id='+this.memberId).then(function(data){
			console.log(data);
			
			if(typeof data.data=="string"){
				data.data=JSON.parse(data.data);
			}
            var cpid = data.data.data.source_organize_id;
			this.$http.get('http://union.123zou.com/api/RealApi/GetCompanyQrCode?id='+cpid).then(function(data2){
				if(typeof data2.data=="string"){
					data2.data=JSON.parse(data2.data);
				}
				t.memberCode='http://union.123zou.com/qrcode/index?url='+data2.data.Data;
			})
            var cid = data.data.data.organize_id;
			this.$http.get('http://union.123zou.com/api/RealApi/GetUnionyWorkerQrCode?id='+cid).then(function(data2){
				
				if(typeof data2.data=="string"){
					data2.data=JSON.parse(data2.data);
				}
				t.companyCode='http://union.123zou.com/qrcode/index?url='+data2.data.Data;
			})


		});
		
	}
});