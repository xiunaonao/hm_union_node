$(function() {
    $(".return_user").click(function() {
        history.go(-1);
    });

    var swiper3 = new Swiper('.swiper-container3', {
        pagination: '.swiper-pagination3',
        paginationClickable: true,
        autoplay: 3000, //可选选项，自动滑动
        calculateHeight: false,
        autoplayDisableOnInteraction: false //触摸后仍自动轮播
    });
});