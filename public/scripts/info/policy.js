var vapp = new Vue({
    el: '#policy',
    data: {
        news: [],
        allNews: [],
        oidIndex: 0,
        type:[20,24],
        uIndex: 0
    },
    methods: {
        changeTab: function (ind) {

            var t = this;
            switch (ind) {
                case 0:
                    this.news = this.allNews[0];
                    break;
                case 1:
                    this.news = this.allNews[1];
                    break;
            }
            this.uIndex = ind;
        },
        getNews: function () {
            var that = this;
            var tNum = that.type[that.oidIndex];
            var newsUrl = 'http://cj.123zou.com/MobileNews/get_union_small_news?type='+tNum+'&organize_id=1651538723050000573&size=20';
            this.$http.get(newsUrl).then(function (data) {
                var dat = data.data
                if (typeof dat == 'string')
                    dat = JSON.parse(data.data);
                
                that.allNews.push(dat.data);
                ++that.oidIndex;
                if (that.oidIndex <= 1) {
                    that.getNews();
                }
                that.news = that.allNews[0];
            });
        },
        showDate: function (val) {
            
            val = val.replace("/Date(", "").replace(")/", "");
            val = parseInt(val);
            var date = new Date(val);
            Y = date.getFullYear() + '-';
            M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            D = date.getDate() + ' ';
            return Y+M+D;
        }
    }
});

vapp.getNews();