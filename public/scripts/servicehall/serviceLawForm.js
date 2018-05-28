$(function () {
    for(var i = 2017; i>=1900;i++){
        var option = document.createElement('option');
        option.setAttribute('value',i);
        option.innerHTML = i;
        $("#choceBornYear").append(option);
    }

    for(var i = 1; i <=12; i++){
        var option = document.createElement('option');
        option.setAttribute('value',i);
        option.innerHTML = i;
        $("#choceBornMonth").append(option);    
    }

    $(".form_btn").click(function () {
        var name = $("#name").val();//姓名
        var chooseLaw = $("#choceLaw").val();//选择律师
        var bornYear = $("#choceBornYear").val();//出生年
        var bornMonth = $("#choceBornMonth").val();//出生月
        var born = bornYear + bornMonth;//出生年月
        var sex = $('input[name="sex"]:checked').val(); //性别
        var nation = $("#familyName").val();//民族
        var idNumber = $("#IDcard").val();//身份证号码
        var work = $("#workPlace").val();//工作单位
        var phone = $("#phone").val();//手机号码
        var infoCountent = $(".infoCountent").val();//内容
        var dataPost = { FRSID: "1", Txt1: name, Txt2: chooseLaw, Date1: born, Int1: sex, Txt3: nation, Txt4: idNumber, Txt5: work, Txt6: phone, Btxt1: infoCountent };
        console.log(infoCountent);
        $.ajax({
            url: $.domain + "/api/UnionFormApi/SaveUnionForm",
            type: "post",
            data: JSON.stringify(dataPost),
            dataType: "json",
            contentType: "application/json",
            crossDomain: true,
            xhrFields: {
                withCredentials: true
            },
            success: function (data) {
                alert(data.Message);

            },
            error: function () {
                alert(data.Message + "错误");
            }
        });
    });
});