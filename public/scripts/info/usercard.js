
    $(function () {
        $(".logo-card").click(function (event) {
            event.stopPropagation();  
            event.preventDefault();
        });
    })
    

    function hidetwocode() {
        $('.user_alert').css('bottom', '200%');
    }

    function hideInfo() {
        $(".info_alert").css("display", "none");
    }

    function zsewm() {
        $.ajax({
            url: "/api/WechatMessage/GetInviteMessage",
            type: "get",
            dataType: "json",
            contentType: "application/json",
            crossDomain: true,
            xhrFields: {
                withCredentials: true
            },
            success: function (data) {
                //alert(data.Message);
                if (data.Success) {
                    $(".ewm_success").show();
                    setTimeout('$(".ewm_success").hide();', 3000);
                    return;
                }
            },
            error: function () {
                alert(data.Message + "错误");
            }
        });
    }



    var vapp = new Vue({
        el: '#app',
        data: {
            member: {},
            isUserCard:true,
            memberId: JSON.parse(sessionStorage.users).member_id,
            msg:[],
            is_zj:false
        },
        mounted:function(){
            if(location.href.indexOf("100596")>-1){
                this.is_zj=true;
            }
        },
        methods: {
            bindUser: function () {
                var userUrl = 'http://cj.123zou.com/MobileNews/get_member_info?member_id=' + this.memberId;
                this.$http.get(userUrl).then(function (data) {
                    if (typeof data.data == 'string') {
                        data.data = JSON.parse(data.data);
                    }
                    this.member = data.data.data;
                    console.log('获取消息中');
                    this.showNoctie(this);
                });
            },
            readMsg:function(obj){
                if(!obj.can_read){
                    this.$http.get('http://cj.123zou.com/SysMsg/set_read?id='+obj.id).then(function(data){
                        vapp_layer.notReadNum--;
                        obj.can_read=1;
                    });
                }
                console.log(obj.url);
                var infoUrl = obj.url;
                if (infoUrl == "") {
                    $(".info_text").html(obj.msg_content);
                    $(".info_alert").css("display", "block");
                } else {
                    window.location.href = infoUrl;
                }
                
            },
            dateValid: function (str) {
                if (!str)
                    return str;
                var date = new Date(eval((str).replace(/\//g, '')))
                return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日';
            },
            companyValid: function (name) {
                var _name = name;
                if(!_name)
                    return '未绑定';
                if (_name.length > 12)
                    _name = _name.substring(0, 12) + '...';
                return _name;
            },
            getBirthday: function () {
                if (!this.member.card_number)
                    return '-';
                return this.member.card_number.substring(6, 10) + '年' +
                this.member.card_number.substring(10, 12) + '月' +
                this.member.card_number.substring(12, 14) + '日';
            },
            getSex: function () {
                if (!this.member.card_number)
                    return '-';
                var sexInd = parseInt(this.member.card_number.substring(16, 17));
                if (sexInd % 2 == 0)
                    return '女';
                if (sexInd % 2 == 1)
                    return "男";
            },
            twocode: function () {
                if (this.member.check_status == 2) {
                    $('.user_alert').css('bottom', '0');
                }
            },
            init: function () {
                this.bindUser();
            },
            getShort: function (str) {
                if (str.length > 40) {
                    str = str.substring(0, 40) + "...";
                }
                return str;
            }
        }
    });
    vapp.init();