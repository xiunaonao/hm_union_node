$(function () {

    function GetRequest() {
        var url = decodeURI(location.search); 
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
            }
        }
        return theRequest;
    }

    var oid = GetRequest();
    console.log(oid.id);

    function showDate(val){
        val = val.replace("/Date(", "").replace(")/", "");
        if (val > 0) {
            val = parseInt(val);
            var date = new Date(val);
            Y = date.getFullYear() + '-';
            M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            D = date.getDate() + ' ';
            return Y + M + D;
        } else {
            return null;
        }
        
    }

    var oid = window.localStorage.oid;
    console.log("oid:" + oid);

    $.ajax({
        url: "http://cj.123zou.com/Enroll/get_single_organize?organize_id=" + oid,
        type: "get",
        dataType: "json",
        async: false,
        success: function (data) {
            console.log(data.success);
            if (data.success) {
                $(".info_up").html(data.data.parent_organize_name);
                $(".info_name").html(data.data.company_name);
                $(".org_type option[value='" + data.data.organize_category + "']").attr("selected", true);
                $(".org_leader").val(data.data.principal_name);
                var crateDate = showDate(data.data.create_date);
                $(".org_start").val(crateDate);
                $(".org_phone").val(data.data.contact_mobile);
            }
        }
    });

    $(".submit_org").click(function () {
        var organize_category = $(".org_type option:selected").val();
        var principal_name = $(".org_leader").val();
        var create_date = $(".org_start").val();
        var contact_mobile = $(".org_phone").val();

        if (organize_category == '' || organize_category == 0) {
            $(".alert_msg p").html("请选择工会类型！");
            $(".alert_msg").show();
            setTimeout('$(".alert_msg").hide()', 2000);
            return;
        }
        if (principal_name == '') {
            $(".alert_msg p").html("请填写负责人！");
            $(".alert_msg").show();
            setTimeout('$(".alert_msg").hide()', 2000);
            return;
        }
        if (create_date == '') {
            $(".alert_msg p").html("请填写建会时间！");
            $(".alert_msg").show();
            setTimeout('$(".alert_msg").hide()', 2000);
            return;
        }
        if (contact_mobile == '') {
            $(".alert_msg p").html("请填写工会电话！");
            $(".alert_msg").show();
            setTimeout('$(".alert_msg").hide()', 2000);
            return;
        }

        var company_name = $(".info_name").html();

        $.ajax({
            url: "http://cj.123zou.com/Enroll/save_or_update_organize",
            type: "post",
            dataType: "json",
            data:{ organize_id: oid.id, company_name: company_name, organize_category: organize_category, principal_name: principal_name, create_date: create_date, contact_mobile: contact_mobile },
            async: false,
            success: function (data) {
                if (data.success) {
                    $(".OrganizeInfo").hide();
                    $('html').scrollTop(0);
                    $(".subnit_ok").show();
                } else {
                    $(".alert_msg p").html(data.msg);
                    $(".alert_msg").show();
                    setTimeout('$(".alert_msg").hide()', 2000);
                    return;
                }
                
            }
        });

    });
    
});