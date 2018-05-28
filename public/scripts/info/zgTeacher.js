if(location.href.indexOf('?type=bf')>0){
    document.querySelectorAll('.ep_list li')[1].style.display='block';
    document.querySelector('.title').innerText='帮扶';
    document.querySelector('.title').innerText='帮扶';
}else{
    document.querySelectorAll('.ep_list li')[0].style.display='block';
    document.querySelector('.title').innerText='职工大讲堂';
    document.querySelector('.title').innerText='职工大讲堂';
}

$(function () {
    $(".return_user").click(function () {
        history.go(-1);
    });
});