function changeIco(ind) {
            document.querySelectorAll(".newunion-footer a")[ind].setAttribute("class", "c");
        }


        var vapp_layer = new Vue({
            el: '#admin_box',
            data: {
                isOpen:false,
                memberId:'1826164934900000376',
                notReadNum:0,
                isAdmin:false,
                member:{real_name:''},
                notice:[],
                isNewPro:false,
            },
            methods: {
                showAdmin: function () {
                    this.isOpen = !this.isOpen;
                },
                NoticeList:function(obj){
                    var t=this;
                    this.$http.get('http://cj.123zou.com/SysMsg/get_receiver_msgs?msg_type=1&receiver_id='+this.memberId).then(function(data){
                        
                        if(typeof data.data == 'string'){
                            data.data=JSON.parse(data.data);
                        }
                        console.log(data.data.data);
                        if(!data.data.data){
                            return;
                        }
                        //localStorage.notice=JSON.stringify(data.data.data);
                        t.notice=data.data.data;
                        if(obj){
                            obj.msg=t.notice;
                        }
                        t.notReadNum=0;
                        for(var i=0;i<data.data.data.length;i++){
                            if(data.data.data[i].can_read==0){
                                t.notReadNum++;
                            }
                        }
                    });
                },
                showNoctie:function(obj){
                    obj.msg=this.notice;
                    if(this.notice.length<=0){
                        this.NoticeList(obj);
                    }

                },
                init:function(){
                    if(location.href.indexOf('100596')>-1)
                        this.isNewPro=true;

                    localStorage.MEMID=this.memberId;
                    if(location.href.indexOf('test_uid=')>0){
                        this.memberId=location.href.substring(location.href.indexOf('test_uid=')+9);
                    }

                    var t=this;
                    this.$http.get('http://cj.123zou.com/MobileNews/get_member_info?member_id='+this.memberId).then(function(data){
                        
                        //alert(JSON.stringify(data));
                        if(typeof data.data == 'string'){
                            data.data=JSON.parse(data.data);
                        }
                        //alert('页面正在建设中'+data.data.data.user_type);

                        if(data.data.data){
                            t.member=data.data.data;
                            localStorage.oid=data.data.data.organize_id;
                            localStorage.soid=data.data.data.source_organize_id;
                            //alert(JSON.stringify(data.data.data.user_type));
                            if(data.data.data.user_type==1){
                                t.isAdmin=true;
                            }else{
                                t.isAdmin=false;
                            }
                            t.NoticeList();
                        }else{

                        }
                    });
                }
            }
        });
        vapp_layer.init();
        console.log('layer initing...');
        