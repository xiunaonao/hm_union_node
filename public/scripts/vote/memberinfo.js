$(function () {

            // function GetRequest() {
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
            // }

            // var oid = GetRequest();
            // console.log(oid);

            function showDate(val) {
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

            $.ajax({
                url: "http://cj.123zou.com/Enroll/get_member_info?member_id=" + _param.id,
                type: "post",
                dataType: "json",
                async: false,
                success: function (data) {
                    console.log(data.success);
                    if (data.success) {
                        $(".member_name").val(data.data.real_name);
                        $(".sex input[value='" + data.data.member_sex + "']").attr("checked", true);
                        $(".member_phone").val(data.data.mobile);
                        var birthday = showDate(data.data.member_birthday);
                        $(".member_birth").val(birthday);
                        $(".member_code").val(data.data.card_number);
                        $(".member_national option[value='" + data.data.ethnic + "']").attr("selected", true);
                        $(".census_type option[value='" + data.data.household_type + "']").attr("selected", true);
                        $(".job_state option[value='" + data.data.employment_status + "']").attr("selected", true);
                        $(".education_bg option[value='" + data.data.education + "']").attr("selected", true);
                        $(".tec_grade option[value='" + data.data.technical_grade + "']").attr("selected", true);
                    }
                }
            });

            $(".submit_org").click(function () {
                var real_name = $(".member_name").val();
                var member_sex = $(".sex input:checked").val();
                var mobile = $(".member_phone").val();
                var member_birthday = $(".member_birth").val();
                var card_number = $(".member_code").val();
                var ethnic = $(".member_national option:selected").val();
                var household_type = $(".census_type option:selected").val();
                var employment_status = $(".job_state option:selected").val();
                var education = $(".education_bg option:selected").val();
                var technical_grade = $(".tec_grade option:selected").val();

                if (real_name == '') {
                    $(".alert_msg p").html("请填写您的姓名！");
                    $(".alert_msg").show();
                    setTimeout('$(".alert_msg").hide()', 2000);
                    return;
                }
                if (member_sex == '' || member_sex == 0) {
                    $(".alert_msg p").html("请您选择性别！");
                    $(".alert_msg").show();
                    setTimeout('$(".alert_msg").hide()', 2000);
                    return;
                }
                if (mobile == '') {
                    $(".alert_msg p").html("请填写您的手机号！");
                    $(".alert_msg").show();
                    setTimeout('$(".alert_msg").hide()', 2000);
                    return;
                }
                if (member_birthday == '') {
                    $(".alert_msg p").html("请填写您的出生日期！");
                    $(".alert_msg").show();
                    setTimeout('$(".alert_msg").hide()', 2000);
                    return;
                }
                if (card_number == '') {
                    $(".alert_msg p").html("请填写您的身份证号！");
                    $(".alert_msg").show();
                    setTimeout('$(".alert_msg").hide()', 2000);
                    return;
                }
                if (ethnic == '' || ethnic == 0) {
                    $(".alert_msg p").html("请选择您的民族！");
                    $(".alert_msg").show();
                    setTimeout('$(".alert_msg").hide()', 2000);
                    return;
                }
                if (household_type == '' || household_type == 0) {
                    $(".alert_msg p").html("请选择您的户籍类型！");
                    $(".alert_msg").show();
                    setTimeout('$(".alert_msg").hide()', 2000);
                    return;
                }
                if (employment_status == '' || employment_status == 0) {
                    $(".alert_msg p").html("请选择您的就业状态！");
                    $(".alert_msg").show();
                    setTimeout('$(".alert_msg").hide()', 2000);
                    return;
                }
                if (education == '' || education == 0) {
                    $(".alert_msg p").html("请选择您的学历！");
                    $(".alert_msg").show();
                    setTimeout('$(".alert_msg").hide()', 2000);
                    return;
                }
                //if (technical_grade == '' || technical_grade == 0) {
                //    $(".alert_msg p").html("请选择您的技术等级！");
                //    $(".alert_msg").show();
                //    setTimeout('$(".alert_msg").hide()', 2000);
                //    return;
                //}

                var dataPost = { member_id: oid.id, real_name: real_name, member_sex: member_sex, mobile: mobile, member_birthday: member_birthday, card_number: card_number, ethnic: ethnic, household_type: household_type, employment_status: employment_status, education: education, technical_grade: technical_grade };


                $.ajax({
                    url: "http://cj.123zou.com/Enroll/save_or_update",
                    type: "post",
                    dataType: "json",
                    data: dataPost,
                    async: false,
                    success: function (data) {
                        if (data.success) {
                            $(".MemberInfo").hide();
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