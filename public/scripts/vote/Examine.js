$(function () {
    $("#check_all").click(function () {
        if (this.checked) {
            $("[name=check_one]").prop("checked", true);
        }
        else { $("[name=check_one]").prop("checked", false); }
    });

    $(".check_one").click(function () {
        if (!this.checked) {
            $("#check_all").prop("checked", false);
        }
    });

    $(".pass_a").click(function () {
        var chk_value = [];
        $('.check_one:checked').each(function () {
            chk_value.push($(this).attr("data-id"));
            //$(this).parent().parent().hide();
            var mId = $(this).val();
            console.log("mId" + mId);
            $.ajax({
                url: "http://cj.123zou.com/Enroll/review_construction_meeting?member_id="+ mId,
                type: "get",
                dataType: "json",
                async: false,
                success: function (data) {
                    console.log(data.success);

                    if (data.success) {
                        $(".alert_msg p").html("操作成功！");
                        $(".alert_msg").show();
                        setTimeout('$(".alert_msg").hide();window.location.reload();', 2000);
                    } else {
                        $(".alert_msg p").html(data.msg);
                        $(".alert_msg").show();
                        setTimeout('$(".alert_msg").hide()', 2000);
                    }
                }
            })
        });
        console.log(chk_value);
    })

});

var vapp = new Vue({
    el: '#examine',
    data: {
        news: [],
        noneTotal: 0,
        source_organize_id:'',
        organize_id:''
    },
    methods: {
        // getRequest: function () {
        //     var url = decodeURI(location.search);
        //     var theRequest = new Object();
        //     if (url.indexOf("?") != -1) {
        //         var str = url.substr(1);
        //         strs = str.split("&");
        //         for (var i = 0; i < strs.length; i++) {
        //             theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        //         }
        //     }
        //     return theRequest;
        // },
        getNews: function () {
            var that = this;
            //var id = that.getRequest();
            var id = _param.id;
            var idNum = id;
            console.log(idNum);
            var memberUrl = 'http://cj.123zou.com/MobileNews/get_member_info?member_id=' + idNum;
            this.$http.get(memberUrl).then(function (data) {
                var dat = data.data
                if (typeof dat == 'string')
                    dat = JSON.parse(data.data);
                that.source_organize_id = dat.data.source_organize_id;
                that.organize_id=dat.data.organize_id;
                console.log("source_organize_id:" + that.source_organize_id);
                that.getExamine();
            });

            
        },
        getExamine: function () {
            var that = this;
            console.log("oPid:" + this.source_organize_id);
            var newsUrl = 'http://cj.123zou.com/Enroll/get_construction_meetings?organize_pid=' + this.organize_id;
            this.$http.get(newsUrl).then(function (data) {
                var dat = data.data
                if (typeof dat == 'string')
                    dat = JSON.parse(data.data);
                that.news = dat.data;
                that.noneTotal = dat.total;
                console.log(that.noneTotal)
            });
        }
        
    }
});
vapp.getNews();