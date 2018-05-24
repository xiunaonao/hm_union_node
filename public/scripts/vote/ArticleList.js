
var width = document.documentElement.clientWidth;
document.querySelector('html').style.fontSize = (width / 7.5) + 'px';

var host = "http://" + window.location.host;

function AJAX(url, type, data, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.open(type, host + url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    if (data)
        xhr.send(JSON.stringify(data));
    else
        xhr.send();
    xhr.onload = function() {
        if (xhr.status == 200) {
            success(JSON.parse(xhr.responseText));
        } else {
            error();
        }
    }
}

function AJAX2(url,type,data,success,error){
     $.ajax({
        url:url,
        data:data,
        type:type,
        success:function(data){
            success(data);
        }
    })
}

var url = '/api/noticeapi/SelectNoticeCont?page=1&size=100';
<!-- var memberId=location.search.substring(location.search.indexOf('memberId')+9); -->
var memberId = _param.id;
var url2='http://cj.123zou.com/MobileNews/get_my_mobile_news?type=0&member_id='+memberId+'&page=1&size=100';
AJAX2(url2,'GET',null,function(data){
    var ul = '';
    var dat = data.data;
    if (!dat)
        return;
    for (var i = 0; i < dat.length; i++) {
        var div = document.createElement('div');
        div.innerHTML = (dat[i].news_title);
        var pdate= new Date(eval('new '+dat[i].publish_time.replace(/\//g,'')));
        
        if(pdate.getFullYear()<2000)
            pdate=new Date('2018-4-25');
        ul += '<li tid="' + dat[i].news_id + '"><h4>' + pdate.getFullYear()+'-'+(pdate.getMonth()+1)+'-'+pdate.getDate() + '</h4>';
        if (dat[i].CoverUrl) {
            var imgUL = dat[i].head_img_url.split(',');
            if (imgUL.length >= 3) {
                ul += '<p><a href="PhoneDetail?id=' + dat[i].news_id + '&nick=' + dat[i].news_author + '" style="text-decoration: none;color: inherit;">' + div.innerText + '</a></p>';
                ul += '<p style="height:2.3rem;"><a href="PhoneDetail?id=' + dat[i].news_id + '&nick=' + dat[i].news_author + '" style="text-decoration: none;color: inherit;"><img src="' + imgUL[0] + '"/><img src="' + imgUL[1] + '"/><img src="' + imgUL[2] + '"/></a></p>';
            } else if (imgUL.length >=1) {
                ul += '<p  style="height:2rem;"><a href="PhoneDetail?id=' + dat[i].news_id + '&nick=' + dat[i].news_author + '" style="text-decoration: none;color: inherit;"><img style="float:left;" src="' + imgUL[0] + '"/><span style="float:left;">' + div.innerText + '</span></a></p>';
            }
        } else {
            ul += '<p><a href="PhoneDetail?id=' + dat[i].news_id + '&nick=' + dat[i].news_author + '" style="text-decoration: none;color: inherit;">' + div.innerText + '</a></p>';
        }


        ul += '<h3><a href="PhoneEditor?id=' + dat[i].news_id + '&nick=' + dat[i].news_author + '&memberId='+memberId+'" class="article-editor">编辑</a> <a class="article-delete">删除</a></h3></li>';
    }

    document.querySelector('.article-list').innerHTML = ul;
    Event();
})


function Event() {
    var ul = document.querySelectorAll('.article-list li');
    for (var i = 0; i < ul.length; i++) {

        ul[i].querySelector('.article-delete').addEventListener('click', function (e) {

            document.querySelector('.alert-showbox').innerHTML = '<div class="editor-confirm" style="text-align:center;width:5rem;position: absolute;;left:50%;top:50%;-webkit-transform:translate(-50%,-50%);background:#FFF;border-radius:5px;border:1px solid #CCC;">' +
                        '<p style="font-size:0.3rem;border-bottom:0.01rem solid #CCC;padding:0.3rem;min-height:0.5rem;"> 确定删除吗?'
                        + '</p><h5 style="font-size:0.3rem;line-height:0.6rem;"><a style="float: left;width: 50%;border-right: 0.01rem solid #CCC;box-sizing:border-box" class="editor-confirm-confirm">确定</a><a class="float: left;width: 50%;" onclick=\'document.querySelector(".editor-confirm").parentNode.removeChild(document.querySelector(".editor-confirm"));\'>取消</a></h5></div>';
            var thisDom = this;
            document.querySelector('.editor-confirm-confirm').addEventListener('click', function(e) {
                //var url = '/api/noticeapi/DeleteNoticeCont?id=' + thisDom.parentNode.parentNode.getAttribute('tid');
                var url='http://cj.123zou.com/MobileNews/remove_news';
                thisDom.parentNode.parentNode.id = 'deleteDOM';
                AJAX2(url, 'POST', {news_id:thisDom.parentNode.parentNode.getAttribute('tid')}, function(data) {
                    if (data.success) {
                        _Alert('删除成功');
                        thisDom.parentNode.parentNode.parentNode.removeChild(thisDom.parentNode.parentNode);
                    } else {
                        _Alert('删除失败');
                    }
                });
            });
        });
    }
}


function _Alert(text) {
    var htm = '<div class="alert" style="text-align:center;width:4.5rem;position: absolute;;left:50%;top:50%;-webkit-transform:translate(-50%,-50%);background:#FFF;border-radius:5px;border:1px solid #CCC;"><p style="font-size:0.3rem;border-bottom:0.01rem solid #CCC;padding:0.3rem;min-height:0.5rem;">' + text + '</p><a onclick=\'this.parentNode.parentNode.removeChild(this.parentNode)\'><h5 style="font-size:0.3rem;line-height:0.6rem;font-weight:300;">确定</h5></a></div>';
    document.querySelector('.alert-showbox').innerHTML = htm;
}





