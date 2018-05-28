$(function () {
    $(".btn_join").click(function () {
        $(".btn_join").css({
            "color": "red",
            "border-bottom": "0.03rem solid red"
        });
        $(".btn_create").css({
            "color": "#323232",
            "border-bottom": "none"
        })
        $(".create_list").css("display", "none");
        $(".join_list").css("display", "block");
    })
    $(".btn_create").click(function () {
        $(".btn_create").css({
            "color": "red",
            "border-bottom": "0.03rem solid red"
        });
        $(".btn_join").css({
            "color": "#323232",
            "border-bottom": "none"
        })
        $(".join_list").css("display", "none");
        $(".create_list").css("display", "block");
    })
})