var host = 'http://tool.123zou.com';

function AJAX(url, type, data, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.open(type, host + url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    if (data)
        xhr.send(JSON.stringify(data));
    else
        xhr.send();
    xhr.onload = function () {
        if (xhr.status == 200) {
            success(JSON.parse(xhr.responseText));
        } else {
            error();
        }
    }
}

var url = '/api/noticeapi/SelectNoticeContBySysID?page=1&size=100';

AJAX(url, 'GET', {}, function (data) {
    var ul = '';
    var dat = data.Data;
    if (!dat)
        return;
    for (var i = 0; i < dat.length; i++) {
        var div = document.createElement('div');
        div.innerHTML = (dat[i].Title);
        var cover = dat[i].CoverUrl ? dat[i].CoverUrl.split(',')[0] : '';
        //ul += '<li tid="' + dat[i].NTCID + '"><h4>' + dat[i].ROWIDATE + '</h4><p>' + div.innerText + '</p><h3><a href="PhoneEditor?id=' + dat[i].NTCID + '&nick=' + dat[i].Author + '" class="article-editor">编辑</a> <a class="article-delete">删除</a></h3></li>';
        ul += '<li><a href="PhoneDetail?id='+dat[i].NTCID+'&xyh=1&nick='+dat[i].Author+'"><img src="' + cover + '"/><div class="cth-body-content"><p class="cth-body-title">' + div.innerText + '</p><p class="cth-body-author">发布人：' + dat[i].Author + '</p><p class="cth-body-num"></p></div></a></li>';
    }

    document.querySelector('.cth-body').innerHTML = ul;
    Event();
});