var users = JSON.parse(sessionStorage.users);
var memid = users.member_id;
console.log(memid);

changeIco(2);
var vapp = new Vue({
    el: '#exchange',
    data: {
        news: [],
        uIndex: 0,
        str: [],
        testIdx:"",
        allNews:[]
    },
    methods: {
        changeTab: function (ind) {

            var t = this;
            switch (ind) {
                case 0:
                    this.news = this.allNews[2];
                    break;
                case 1:
                    this.news = this.allNews[1];
                    break;
                case 2:
                    this.news = this.allNews[0];
                    break;
            }
            //banner = [this.news[0], this.news[1], this.news[2]];
            this.uIndex = ind;

        },
        news_type(image) {
            return 'news-list-' + (image.length == 3 ? '3' : '') + (image.length == 1 ? '2' : '') + (image.length == 0 ? '1' : '');
        },
        go: function (url) {
            location.href = url;
        },
        ghqq: function () {
            ghqq_box.style.display = 'block';
        }, 
        ready:function() {
            var t=this;
            jQuery.ajax({ 
                url: "http://cj.123zou.com/MobileNews/get_member_info?member_id="+memid, 
                type: "get",
                dataType: "json",
                success: function(data){
                    //console.log(data.data.organize_full_idx);
                    //console.log(data);
                    
                    if(data.data != null){
                        if(data.data.source_organize_full_idx){
                            data.data.organize_full_names=data.data.source_organize_full_names;
                            data.data.organize_full_idx=data.data.source_organize_full_idx;
                        }
                        t.str = data.data.organize_full_names.split(",").reverse();
                        t.testIdx = data.data.organize_full_idx.split(",").reverse();
                        t.oidIndex = 0;
                        t.showNews();
                    }else{
                        t.str = ["","","长兴县总工会"];
                        t.testIdx = ["","","1651538723050000573"];
                        t.oidIndex = 0;
                        t.showNews();
                    }
                },
                error: function(data){
                }
            });
        },
        showNews:function() {
            var t = this;
            
            var oid = t.testIdx[t.oidIndex];
            jQuery.ajax({ 
                url: "http://cj.123zou.com/MobileNews/get_union_mobile_news?type=2&organize_id="+oid, 
                type: "get",
                dataType: "json",
                success: function(data){
                    t.news = data.data;
                    t.allNews.push(data.data);
                    ++t.oidIndex;
                    if(t.oidIndex<=2){
                        t.showNews();
                    }
                },
                error: function(data){
                    console.log("失败!");
                }
            });
        },
        nickName:function(name){
            var str=name;
            // if(str.indexOf('长兴县总工会')>-1){
            //     str='长兴总工会';
            // }else{
            //     if(str.indexOf('总工会')>-1) str=str.replace('总工会','');
            //     if(str.indexOf('工会')>-1) str=str.replace('工会','');
            //     else if(str.indexOf('公司')>-1){
            //         str=str.replace('公司','');
            //         str=str.replace('有限','');
            //         str=str.replace('责任','');
            //         str=str.replace('浙江省','');
            //         str=str.replace('长兴县','');
            //         str=str.replace('浙江','');
            //         str=str.replace('科技','');
            //     }
            // }
            return str;


        }
    }
    
});
vapp.ready();

//var areaChange = document.querySelectorAll('.service-area-list button');
//for (var i = 0; i < areaChange.length; i++) {
//    areaChange[i].addEventListener('click', function (e) {
//        for (var j = 0; j < areaChange.length; j++) {
//            areaChange[j].setAttribute('class', '');
//            if (areaChange[j] == e.target) {
//                areaChange[j].setAttribute('class', 'c');
//                document.querySelector('.service-area-list i').setAttribute('class', 'index-' + j);
//            }
//        }
//    });
//}