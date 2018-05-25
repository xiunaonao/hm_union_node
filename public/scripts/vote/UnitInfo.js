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

    var soid = window.localStorage.soid;
    console.log("soid:" + soid);
    $.ajax({
        url: "http://cj.123zou.com/Enroll/get_single_organize?organize_id=" + soid,
        type: "post",
        dataType: "json",
        async: false,
        success: function (data) {
            console.log(data.success);
            if (data.success) {
                $(".unit_up").html(data.data.parent_organize_name);
                $(".unit_name").val(data.data.company_name);
                $(".unit_type option[value='" + data.data.economic_type + "']").attr("selected", true);
                $(".unit_industry option[value='" + data.data.organize_industry + "']").attr("selected", true);
                $(".unit_category option[value='" + data.data.nature_type + "']").attr("selected", true);
                $(".unit_code").val(data.data.organization_code);
                $(".unit_address").val(data.data.address_name);
                $(".unit_area").val(data.data.area_name);
            } else {
                $(".alert_msg p").html(data.msg);
                $(".alert_msg").show();
                setTimeout('$(".alert_msg").hide()', 2000);
                return;
            }
        }
    });

    $(".submit_org").click(function () {
        var company_name = $(".unit_name").val();
        var economic_type = $(".unit_type option:selected").val();
        var organize_industry = $(".unit_industry option:selected").val();
        var nature_type = $(".unit_category option:selected").val();
        var organization_code = $(".unit_code").val();
        var address_name = $(".unit_address").val();
        var area_name = $(".unit_area").val();

        if (company_name == '') {
            $(".alert_msg p").html("请填写单位名称！");
            $(".alert_msg").show();
            setTimeout('$(".alert_msg").hide()', 2000);
            return;
        }
        if (economic_type == '' || economic_type == 0) {
            $(".alert_msg p").html("请您选择经济类型！");
            $(".alert_msg").show();
            setTimeout('$(".alert_msg").hide()', 2000);
            return;
        }
        if (organize_industry == '' || organize_industry == 0) {
            $(".alert_msg p").html("请选择单位所属行业！");
            $(".alert_msg").show();
            setTimeout('$(".alert_msg").hide()', 2000);
            return;
        }
        if (nature_type == '' || nature_type == 0) {
            $(".alert_msg p").html("请选择单位性质类别！");
            $(".alert_msg").show();
            setTimeout('$(".alert_msg").hide()', 2000);
            return;
        }
        if (organization_code == '') {
            $(".alert_msg p").html("请填写组织结构代码！");
            $(".alert_msg").show();
            setTimeout('$(".alert_msg").hide()', 2000);
            return;
        }
        if (address_name == '') {
            $(".alert_msg p").html("请填写单位地址！");
            $(".alert_msg").show();
            setTimeout('$(".alert_msg").hide()', 2000);
            return;
        }
        if (area_name == '') {
            $(".alert_msg p").html("请填写单位所在政区！");
            $(".alert_msg").show();
            setTimeout('$(".alert_msg").hide()', 2000);
            return;
        }

        $.ajax({
            url: "http://cj.123zou.com/Enroll/save_or_update_organize",
            type: "post",
            dataType: "json",
            data: { organize_id: oid.id, company_name: company_name, economic_type: economic_type, organize_industry: organize_industry, nature_type: nature_type, organization_code: organization_code, address_name: address_name, area_name: area_name },
            async: false,
            success: function (data) {
                if (data.success) {
                    $(".UnitInfo").hide();
                    $('html').scrollTop(0);
                    $(".submit_ok").show();
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