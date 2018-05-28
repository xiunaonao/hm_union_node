    // changeIco(1);
    var vapp = new Vue({
        el: '#newslist',
        data: {
            news: [],
            banner: [],
            allNews:[],
            allBanner:[],
            unionList: [],
            unionId:[],
            topNews:[],
            modelNews:[],
            uIndex: 0,
            uIndex2:0,
            bIndex: 0,
            isCool: true,
            isAdmin:false,
            select_box:false,
            memberId:JSON.parse(sessionStorage.users).member_id,
            bannerTouch:false,
            touchUnion:{name:''},
            bannerPos:{x:0,y:0},
            unionPos:{x:0,y:0},
            childUnion:[],
            unionData:{},
            nowPid:'',
            countryId:'',
            nowTouchIndex:0,
            oidStr:[],
            modelY:0,
            modelPhoto:[
                {name:"陈怡川",img:"/images/models/cyc.png",url:"https://mp.weixin.qq.com/s?__biz=MzAxNTIzMzI0Mw==&mid=2651141489&idx=1&sn=77d5bc299a1f95fa2952ea4282f46318&chksm=8076acc5b70125d39b8938055f5451bf64ea81eb2d9e15148aa975c7e25e084d84621ab577a1#rd"},
                {name:"李新",img:"/images/models/lx.png",url:"https://mp.weixin.qq.com/s?__biz=MzAxNTIzMzI0Mw==&mid=2651141339&idx=2&sn=71baacad4e20e84f553a90b438d5ab81&chksm=8076ad6fb7012479c404efd917a0855cb2affa5a5fcf228f28867b4ea07b4e74d522d9ae8476#rd"},
                {name:"庄建坤",img:"/images/models/zjk.png",url:"https://mp.weixin.qq.com/s?__biz=MzAxNTIzMzI0Mw==&mid=2651141297&idx=1&sn=d5fb7f2edeb3eb244498d558c6c2e071&chksm=8076ad05b7012413323bdb572a33006f42607380d29025502912b7c2a1f541a6b6873cd05530#rd"},
                {name:"许志明",img:"/images/models/xzm.png",url:"https://mp.weixin.qq.com/s?__biz=MzAxNTIzMzI0Mw==&mid=2651141295&idx=1&sn=3e92e6208120ec5ac59f2b39b64153c2&chksm=8076ad1bb701240d56ff3c86bff39a0d64b0946ba5e267b96030bd6a8f9bb1aa40e0fb4c56d4#rd"},
                {name:"关为民",img:"/images/models/gwm.png",url:"https://mp.weixin.qq.com/s?__biz=MzAxNTIzMzI0Mw==&mid=2651141257&idx=2&sn=01f18692573330cf105d899e3d535904&chksm=8076ad3db701242b961873b93c69bfd33ae4f243f64eb2d5055164c4c016134c283444f1d36e#rd"},
                {name:"艾伟",img:"/images/models/av.png",url:"https://mp.weixin.qq.com/s?__biz=MzAxNTIzMzI0Mw==&mid=2651141248&idx=1&sn=1da9827137eaf73590432ef72e2ea8b8&chksm=8076ad34b701242293ccd07bda84eb782a2420c20caa97fa64e5ed56b6cf953501b3a1e94661#rd"},
                {name:"张卫兵",img:"/images/models/zwb.png",url:"https://mp.weixin.qq.com/s?__biz=MzAxNTIzMzI0Mw==&mid=2651141231&idx=1&sn=d9ee7d77ce8b1d5f7f35ee781790b1bc&chksm=8076addbb70124cda1c226c7b708f783dbb01125d2a782b783e206a15f59a4f578f19c9138ba#rd"},
                {name:"钱金元",img:"/images/models/qjy.png",url:"https://mp.weixin.qq.com/s?__biz=MzAxNTIzMzI0Mw==&mid=2651141158&idx=2&sn=0f1f42274209a6e018b38cfa31fe3b34&chksm=8076ad92b701248482a265bac4ace3003a3899c66f4fba300476fe40d8d62e616cf1fb5f8701#rd"},
                {name:"陈顺明",img:"/images/models/csm.png",url:"https://mp.weixin.qq.com/s?__biz=MzAxNTIzMzI0Mw==&mid=2651141108&idx=1&sn=880432dfb2a45556896d167dd1a2cb07&chksm=8076aa40b70123569a13b48fe848d1f1a869c082c08d40dfdee4df3936f76cb103b8474cb7c0#rd"},
                {name:"祁煜良",img:"/images/models/qyl.png",url:"https://mp.weixin.qq.com/s?__biz=MzAxNTIzMzI0Mw==&mid=2651140970&idx=2&sn=436fb2fa13337d0a52b8ff576c1fe33f&chksm=8076aadeb70123c884f0e25cc8a22680d76fe41ff67d1fd49383d4871d6fc7d16b6947cdfcfa#rd"},
                
                {name:"陈怡川",img:"/images/models/cyc.png",url:"https://mp.weixin.qq.com/s?__biz=MzAxNTIzMzI0Mw==&mid=2651141489&idx=1&sn=77d5bc299a1f95fa2952ea4282f46318&chksm=8076acc5b70125d39b8938055f5451bf64ea81eb2d9e15148aa975c7e25e084d84621ab577a1#rd"},
                {name:"李新",img:"/images/models/lx.png",url:"https://mp.weixin.qq.com/s?__biz=MzAxNTIzMzI0Mw==&mid=2651141339&idx=2&sn=71baacad4e20e84f553a90b438d5ab81&chksm=8076ad6fb7012479c404efd917a0855cb2affa5a5fcf228f28867b4ea07b4e74d522d9ae8476#rd"},
                {name:"庄建坤",img:"/images/models/zjk.png",url:"https://mp.weixin.qq.com/s?__biz=MzAxNTIzMzI0Mw==&mid=2651141297&idx=1&sn=d5fb7f2edeb3eb244498d558c6c2e071&chksm=8076ad05b7012413323bdb572a33006f42607380d29025502912b7c2a1f541a6b6873cd05530#rd"},
                {name:"许志明",img:"/images/models/xzm.png",url:"https://mp.weixin.qq.com/s?__biz=MzAxNTIzMzI0Mw==&mid=2651141295&idx=1&sn=3e92e6208120ec5ac59f2b39b64153c2&chksm=8076ad1bb701240d56ff3c86bff39a0d64b0946ba5e267b96030bd6a8f9bb1aa40e0fb4c56d4#rd"},
                {name:"关为民",img:"/images/models/gwm.png",url:"https://mp.weixin.qq.com/s?__biz=MzAxNTIzMzI0Mw==&mid=2651141257&idx=2&sn=01f18692573330cf105d899e3d535904&chksm=8076ad3db701242b961873b93c69bfd33ae4f243f64eb2d5055164c4c016134c283444f1d36e#rd"}
            ]
        },
        methods: {
            stopEvent:function(str,e){
                e.stopPropagation();
            },
            unionStart:function(name,e,pid){
                if(!this.isAdmin)
                    return;
                if(name==0)
                    return;
                this.unionPos=e.touches[0];
                this.touchUnion.name=name;
                var t=this;
                setTimeout(function(){
                    if(t.touchUnion.name==name){
                        
                        t.select_box=true;
                        t.touchUnion.name='';
                        var pid=t.oidStr[t.oidStr.length-4+name];
                        if(t.unionData[pid]){
                            t.childUnion=t.unionData[pid];
                            t.nowPid=pid;
                            return;
                        }
                        t.$http.get('http://cj.123zou.com/OuterUnion/get_organizes_by_parentid?organize_pid='+pid).then(function(data){
                            if(typeof data.data == 'string'){
                                data.data=JSON.parse(data.data);
                            }
                            if(data.data.data)
                                t.childUnion=data.data.data;
                            else
                                t.childUnion=[];
                            t.unionData[pid]=t.childUnion;
                            t.nowPid=pid;
                            t.nowTouchIndex=name;
                        });
                    }
                },1000);
            },
            adminChangeUnion:function(obj){
                var admin_bind=obj;
                var t=this;
                var oidx='1651538723050000573,';
                var oname='长兴县总工会,';
                if(t.nowPid=='1651538723050000573'){
                    oidx+=obj.organize_id;
                    oname+=obj.organize_name;
                    t.countryId=obj.organize_id;
                    t.$http.get('http://cj.123zou.com/OuterUnion/get_organizes_by_parentid?organize_pid='+obj.organize_id).then(function(data){
                        if(typeof data.data == 'string'){
                            data.data=JSON.parse(data.data);
                        }
                        oidx+=',';
                        oname+=',';

                        if(data.data.data){
                            t.unionData[obj.organize_id]=data.data.data;
                            oidx+=t.unionData[obj.organize_id][0].organize_id;
                            oname+=t.unionData[obj.organize_id][0].company_name;
                        }else{
                            t.unionData[obj.organize_id]=[];
                            oidx+='-1';
                        }

                        admin_bind.organize_full_idx=oidx;
                        admin_bind.organize_full_names=oname;
                        //console.log(oidx+' '+oname);
                        t.init(admin_bind);
                    });
                }else{
                    if(!obj.organize_pid)
                        obj.organize_pid=t.countryId;
                    oidx+=obj.organize_pid+',';
                    oname+=t.unionList[1]+',';
                    console.log(oidx);
                    oidx+=obj.organize_id;
                    oname+=obj.company_name;
                    admin_bind.organize_full_idx=oidx;
                    admin_bind.organize_full_names=oname;
                    t.init(admin_bind);
                }
                
            },
            makeRead:function(num,id,ptime){
                var idnum=parseInt(id.substring(id.length-2));

                //console.log(ptime.replace(/\\/g,''));
                var date=(eval('new '+ptime.replace(/\//g,'')));
                if((new Date()-date)/1000/60<10)
                    idnum=0;
                return idnum+num;
            },
            unionEnd:function(name,e){
                //this.unionPos
                this.touchUnion.name='';
            },
            bannerStart:function(name,e){
                this.bannerPos=e.touches[0];
                this.bannerTouch=true;
                this.bIndexTemp=this.bIndex;
            },
            bannerMove:function(name,e){
                var movePos=e.changedTouches[0];
                var fl=((movePos.clientX-this.bannerPos.clientX)/deviceWidth);
                this.bIndex-=fl*10;
                this.bannerPos=movePos;
            },
            viewNumAdd:function(obj){
                //if(obj.news_outer_url)
                this.$http.get('http://cj.123zou.com/MobileNews/news_view_num_change?news_id='+obj.news_id).then(function(){});
            },
            bannerEnd:function(name,e){
                this.bannerTouch=false;
                if(this.bIndex<this.bIndexTemp-0.5){
                    this.bIndex=this.bIndexTemp-1;
                }else if(this.bIndex>this.bIndexTemp+0.5){
                    this.bIndex=this.bIndexTemp+1;
                }else{
                    this.bIndex=this.bIndexTemp;
                }
                if(this.bIndex<=0)
                    this.bIndex=0;
                if(this.bIndex>=this.banner.length-1)
                    this.bIndex=this.banner.length-1;

            },
            coverCss:function(imgsrc){
                var strs=imgsrc.split(',');
                if(strs=='' || strs=='null'){
                    return "1";
                }
                if(strs.length<=2){
                    return '2';
                }else if(strs.length>=3){
                    return '3';
                }

            },
            changeTab: function (ind) {
                switch (ind) {
                    case 0:
                        //this.news = this.allNews[2];
                        this.changeTab2(this.uIndex2);
                        this.banner=this.allBanner[2];
                        break;
                    case 1:
                        this.news = this.allNews[1];
                        this.banner=this.allBanner[1];
                        break;
                    case 2:
                        this.news = this.allNews[0];
                        this.banner=this.allBanner[0];
                        break;
                }
                if(this.bIndex>this.banner.length-1){
                    this.bIndex=this.banner.length-1;
                }
                this.bIndex=0;
                //banner = [this.news[0], this.news[1], this.news[2], this.news[0]];
                this.uIndex = ind;
            },
            changeTab2:function(ind){
                switch(ind){
                    case 0:
                        this.news=this.topNews;
                        break;
                    case 1:
                        this.news=this.allNews[2];
                        break;
                    case 2:
                        this.news=this.modelNews;
                        break;
                }
                this.uIndex2=ind;
            },
            nickName:function(name){
                var str=name;
                return str;
                
                if(str.indexOf('长兴县总工会')>-1){
                    str='长兴总工会';
                }else{
                    if(str.indexOf('总工会')>-1) str=str.replace('总工会','');
                    if(str.indexOf('工会')>-1) str=str.replace('工会','');
                    else if(str.indexOf('公司')>-1){
                        str=str.replace('公司','');
                        str=str.replace('有限','');
                        str=str.replace('责任','');
                        str=str.replace('浙江省','');
                        str=str.replace('长兴县','');
                        str=str.replace('浙江','');
                        str=str.replace('科技','');
                    }
                }
                return str;
    
            },
            news_type(image) {
                return 'news-list-' + (image.length == 3 ? '3' : '') + (image.length == 1 ? '2' : '') + (image.length == 0 ? '1' : '');
            },
            go: function (url) {
                location.href = url;
            },
            changeBanner:function(index){
                this.bIndex=index;
            },
            bindUser:function(callback,admin_bind){
                var userData=JSON.parse(sessionStorage.users);
                if(admin_bind){ 
                    userData.organize_full_names=admin_bind.organize_full_names;
                    userData.data.data.organize_full_idx=admin_bind.organize_full_idx;
                }
                callback(userData);


                // var userUrl='http://cj.123zou.com/MobileNews/get_member_info?member_id='+this.memberId;
                // this.$http.get(userUrl).then(function(data){
                //     if(typeof data.data == 'string'){
                //         data.data=JSON.parse(data.data);
                //     }
                //     if(admin_bind && data.data.data){
                //         data.data.data.organize_full_names=admin_bind.organize_full_names;
                //         data.data.data.organize_full_idx=admin_bind.organize_full_idx;
                //     }

                //     callback(data.data.data);
                // });
            },
            bindBanner:function(){
                var t=this;
                var oid=this.oidStr[this.oidIndex2];
                var newUrl='http://cj.123zou.com/MobileNews/get_union_overhead_mobile_news?type=1&organize_id='+oid+'';
                
                this.$http.get(newUrl).then(function(data){
                    var dat=data.data;
                    if(typeof dat == 'string')
                        dat=JSON.parse(data.data);

                    if(dat.data){
                        t.allBanner.push(dat.data);
                        

                    }else{
                        t.allBanner.push([]);
                    }

                    if(t.oidIndex2<t.oidStr.length-2){
                        t.banner=t.allBanner[2];
                        return;
                    }else{
                        t.oidIndex2--;
                        t.bindBanner();
                    }

                });
            },
            bindNews:function(index){
                var t=this;
                var oid=this.oidStr[this.oidIndex];
                var newUrl='http://cj.123zou.com/MobileNews/get_union_mobile_news?type=1&organize_id='+oid+'&size=20&page='+(index?index:1);
                if(t.oidIndex<t.oidStr.length-2){
                    newUrl='http://cj.123zou.com/MobileNews/get_union_small_news?type=2&organize_id='+oid+'&size=20&page='+(index?index:1);
                }
                this.$http.get(newUrl).then(function(data){
    
                    var dat=data.data;
                    //alert(JSON.stringify(data));
                    if(typeof dat =='string')
                        dat=JSON.parse(data.data);
                    t.allNews.push(dat.data?dat.data:[]);
                    if(t.oidIndex<t.oidStr.length-2){
                        if(index){

                        }
                        t.news=dat.data?dat.data:[];
                    }
                    //t.banner=dat.data;
                    // if(t.banner.length>5){
                    //     t.banner=[t.banner[0],t.banner[1],t.banner[2],t.banner[3],t.banner[4]];
                    // }
                    t.bIndex=0;
        
                    if(t.oidIndex<t.oidStr.length-2){
                        t.bindImportNews(t.oidIndex,1);
                        return;
                    }else{
                        t.oidIndex--;
                        t.bindNews();
                    }
                },function(e){
                    //alert(JSON.stringify(e));
                });
            },
            bindImportNews:function(ind,type){
                var t=this;
                var oid=this.oidStr[this.oidIndex];
                var newUrl='http://cj.123zou.com/MobileNews/get_union_small_news?type='+type+'&organize_id='+oid+'&size=100&page=1';
                this.$http.get(newUrl).then(function(data){
                    var dat=data.data;
                    if(typeof dat =='string')
                        dat=JSON.parse(data.data);
                    
                    if(type==1){
                        t.topNews=dat.data;
                        t.news=t.topNews;
                        t.bindImportNews(ind,6);
                    }else{
                        if(t.nowTouchIndex){
                            t.changeTab(t.nowTouchIndex);
                        }
                        t.modelNews=dat.data;
                        //if(window.z && location.href.indexOf('loading=1')>-1)
                        window.z.remove();
                    }
                });
            },
            moveModel:function(){
                    if(this.modelY<=-7.5){
                        this.modelY=0;
                    }else{

                    }
                    this.modelY-=0.002;
                    webkitRequestAnimationFrame(this.moveModel);
            },
            init:function(admin_bind){
                if(location.href.indexOf('test_uid=')>0){
                        this.memberId=location.href.substring(location.href.indexOf('test_uid=')+9);
                }

                if(admin_bind){

                }
                this.select_box=false;
                var t=this;
                //t.memberId='1817332508000000014';
                this.bindUser(function(memberData){
                    if(!memberData){
                        memberData={
                            organize_full_names:'长兴县总工会,,',
                            organize_full_idx:'1651538723050000573,-1,-1'

                        }
                    }else{
                        if(memberData.user_type==1){
                            t.isAdmin=true;
                            if(memberData.source_organize_full_idx && !admin_bind){
                                memberData.organize_full_names=memberData.source_organize_full_names;
                                memberData.organize_full_idx=memberData.source_organize_full_idx;
                            }
                        }else{
                            t.isAdmin=false;
                        }
                    }


                    var oName=memberData.organize_full_names.split(',').reverse();
                    t.unionList=[];

                    for(var i=0;i<oName.length;i++){
                        if(i>=3)
                            break;
                        t.unionList.push(oName[i]);
                    }
                    t.unionList.reverse();
                    t.oidStr=memberData.organize_full_idx.split(',');
                    t.oidIndex=t.oidStr.length-1;
                    t.oidIndex2=t.oidStr.length-1;
                    if(t.oidIndex<=0)
                        return;
                    if(t.oidStr.length>1)
                        t.countryId=t.oidStr[t.oidStr.length-2];

                    t.allBanner=[];
                    t.allNews=[];
                    t.banner=[];
                    t.news=[];
                    t.bindNews();
                    t.bindBanner();

                },admin_bind);

                


                webkitRequestAnimationFrame(this.moveModel);
    
                setInterval(function(){
                    if(t.banner.length<=t.bIndex+1){
                        t.bIndex=0;
                    }else{
                        t.bIndex++;
                    }
                }, 5000);
            }
        }
    });
    vapp.init();
    if(window.z)
        window.z.init();