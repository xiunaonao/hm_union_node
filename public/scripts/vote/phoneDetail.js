var width = document.documentElement.clientWidth;
var _height = document.documentElement.clientHeight;
var mul = width / 640;
document.querySelector('html').style.fontSize = mul * 100 + 'px';

function Editor() {
    var _SID = _param.id;
    console.log("_SID:"+_SID);
    var obj = {
        //_host: 'http://tool.123zou.com/',
        _host: "http://" + window.location.host,
        AJAX: function(url, type, data, success, error) {
            var xhr = new XMLHttpRequest();
            if (url.indexOf('http') == -1) {
                xhr.open(type, this._host + url, true);
            } else {
                xhr.open(type, url, true);
            }
            if(type=='POST')
                xhr.setRequestHeader('Content-Type', 'application/json');
            if (data) {
                xhr.send(JSON.stringify(data));
            } else {
                xhr.send();
            }
            xhr.onload = function() {
                if (xhr.status == 200) {
                    success(JSON.parse(xhr.responseText));
                } else {
                    if (error) {
                        error(xhr);
                    }
                }
            }
        },
        AJAX2:function(url,type,data,success,error){
            var xhr = new XMLHttpRequest();
            if (url.indexOf('http') == -1) {
                xhr.open(type, this._host + url, true);
            } else {
                xhr.open(type, url, true);
            }
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            if (data) {
                xhr.send(JSON.stringify(data));
            } else {
                xhr.send();
            }
            xhr.onload = function() {
                if (xhr.status == 200) {
                    success(JSON.parse(xhr.responseText));
                } else {
                    if (error) {
                        error(xhr);
                    }
                }
            }
        },
        init: function() {
            var self = this;
            if (_SID != '0') {
                //var url = '/api/noticeapi/SelectNoticeContInfo?id=' + _SID;
                //var url = 'http://cj.123zou.com/api/NoticeApi/get_single_news?id=' + _SID;
                var url='http://cj.123zou.com/MobileNews/get_single_news?id='+_SID;
                console.log('init...');
                //self.AJAX('http://cj.123zou.com/MobileNews/news_view_num_change?news_id='+_SID,'POST',{},function(){});
                self.AJAX2('http://cj.123zou.com/MobileNews/news_view_num_change?news_id='+_SID+'&type=1','POST','',function(){});
                this.AJAX(url, 'GET', undefined, function (data) {
                    //var data = JSON.parse(data);
                    //console.log(data);
                    if (data.success) {
                        document.querySelector('.editor-title div').innerText = data.data.news_title;
                        if (data.data.news_title.length > 0) {
                            var css = document.querySelector('.editor-title div').getAttribute('class');
                            document.querySelector('.editor-title div').setAttribute('class', css.replace('editor-title-none', ''));
                        }
                        var date = new Date(eval('new '+data.data.publish_time.replace(/\//g, '')));
                        if(date.getFullYear()<2000)
                            date=new Date('2018-4-25');
                        document.querySelector('.editor-date-now').innerText = date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日';
                        document.querySelector('.editor-box').innerHTML = data.data.news_content.replace(/&lt;/g,'<').replace(/&gt;/g,'>');
                        if (data.data.news_content.length > 0) {
                            var css = document.querySelector('.editor-box').getAttribute('class');
                            document.querySelector('.editor-box').setAttribute('class', css.replace(' editor-box-none', ''));
                        }
                        document.querySelector('.editor-author').value = data.data.news_author;
                        document.querySelector('title').innerText = data.data.news_title;
                    }
                });
                //this.AJAX(url, 'GET', undefined, function (data) {
                //    var data = JSON.parse(data);
                //    console.log(data);
                //    if (data.Success) {
                //        document.querySelector('.editor-title div').innerText = data.Data.Title;
                //        if (data.Data.Title.length > 0) {
                //            var css = document.querySelector('.editor-title div').getAttribute('class');
                //            document.querySelector('.editor-title div').setAttribute('class', css.replace('editor-title-none', ''));
                //        }
                //        var date = new Date(data.Data.ROWIDATE.replace(/\-/g, "\/"));
                //        document.querySelector('.editor-date-now').innerText = date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日';
                //        document.querySelector('.editor-box').innerHTML = data.Data.ContString;
                //        if (data.Data.ContString.length > 0) {
                //            var css = document.querySelector('.editor-box').getAttribute('class');
                //            document.querySelector('.editor-box').setAttribute('class', css.replace(' editor-box-none', ''));
                //        }
                //        document.querySelector('.editor-author').value = data.Data.Author;
                //        document.querySelector('title').innerText = data.Data.Title;
                //    }
                //});
                if (noticeData) {
                    document.querySelector('.editor-title div').innerText = noticeData.Title;
                    if (noticeData.Title.length > 0) {
                        var css = document.querySelector('.editor-title div').getAttribute('class');
                        document.querySelector('.editor-title div').setAttribute('class', css.replace('editor-title-none', ''));
                    }
                    //var date = new Date(noticeData.ROWIDATE.replace(/\-/g, "\/"));
                    var date = new Date(noticeData.ROWIDATE.split('T')[0]);
                    document.querySelector('.editor-date-now').innerText = date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日';
                    document.querySelector('.editor-box').innerHTML = noticeData.ContString;
                    if (noticeData.ContString.length > 0) {
                        var css = document.querySelector('.editor-box').getAttribute('class');
                        document.querySelector('.editor-box').setAttribute('class', css.replace(' editor-box-none', ''));
                    }
                    document.querySelector('.editor-author').value = noticeData.Author;
                    document.querySelector('title').innerText = noticeData.Title;
                }
            }
        },
        createPage: function() {
            //var url = '/api/noticeapi/SaveNoticeCont';
            var url = '/NoticeApi/get_single_news';
            /*
            NTCID:文章内容ID
UUID:用户ID
Status:状态
GroupName:分组名称
Title:标题
Author:作者
Digest:简介
CoverUrl:封面
ContString:内容
only
            
            */
            var json = {
                Title: document.querySelector('.editor-title div').innerText,
                /*Author:document.querySelector('.editor-author').innerText,*/
                /*CreateDate:document.querySelector('.editor-date-now').innerText,*/
                ContString: document.querySelector('.editor-box').innerHTML,
                Digest: ''
            };
            if (document.querySelector('img')) {

                json.CoverUrl = '';
                for (var i = 0; i < document.querySelectorAll('img').length; i++) {
                    if (i != 0) {
                        json.CoverUrl += ',';
                    }
                    json.CoverUrl += document.querySelector('img').getAttribute('src');
                }

            }
            if (_SID) {
                json.NTCID = _SID;
            }
            this.AJAX(url, 'POST', json, function(data) {
                if (data.Success) {
                    //alert('保存成功');
                    alert('保存成功');
                    location.href = 'ArticleList';


                } else {
                    alert(data.Message);
                }

            }, function(xhr) {
                alert(JSON.stringify(xhr));
            });


        },
        event2: function() {
            var self = this;
            if (canAdmin == 1) {
                document.querySelector('.editor-delete').style.display = 'inline-block';
                document.querySelector('.editor-delete').addEventListener('click', function(e) {
                    console.log('--');
                    document.querySelector('.alert-showbox').innerHTML = '<div class="editor-confirm" style="text-align:center;width:4.5rem;position: absolute;;left:50%;top:50%;-webkit-transform:translate(-50%,-50%);background:#FFF;border-radius:5px;border:1px solid #CCC;">' +
                        '<p style="font-size:0.3rem;border-bottom:0.01rem solid #CCC;padding:0.3rem;min-height:0.5rem;"> 确定删除吗?'
                        + '</p><h5 style="font-size:0.3rem;line-height:0.6rem;"><a style="float: left;width: 50%;border-right: 0.01rem solid #CCC;box-sizing:border-box" class="editor-confirm-confirm">确定</a><a class="float: left;width: 50%;" onclick=\'document.querySelector(".editor-confirm").parentNode.removeChild(document.querySelector(".editor-confirm"));\'>取消</a></h5></div>';

                    document.querySelector('.editor-confirm-confirm').addEventListener('click', function(e) {
                        var url = '/api/noticeapi/DeleteNoticeCont?id=' + _SID;
                        self.AJAX(url, 'POST', {}, function(data) {
                            if (data.Success) {
                                _Alert('删除成功');
                                if (location.href.indexOf('&xyh=1') > -1) {
                                    location.href = 'ArticleSchoolList';
                                } else {
                                    location.href = 'ArticleList';
                                }
                                //this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
                            } else {
                                _Alert('删除失败');
                            }
                        });
                    });
                });
            }

            document.querySelector('.editor-message-btn').addEventListener('click', function(e) {
                var url = '/Api/CommentApi/AddComment';
                if (!document.querySelector('.editor-message-txt').value)
                    return;
                var txt = document.querySelector('.editor-message-txt').value;

                var json = {
		        
                };
                json.Cont = txt;
                json.TAID = _SID;
                //json.TBID = scope.viid;
                self.AJAX(url, 'POST', json, function(data) {
                    if (data.Success) {
                        document.querySelector('.editor-message-txt').value = '';
                        self.getCommit();
                        //self.AJAX('http://cj.123zou.com/MobileNews/news_comment_num_change?news_id='+_SID,'POST',{},function(){});
                        self.AJAX2('http://cj.123zou.com/MobileNews/news_comment_num_change?news_id='+_SID+'&type=1','POST','',function(){});
                    }
                });
            });
        },
        getCommit: function() {
            var url = '/Api/CommentApi/SearchComment?Size=100&TAID=' + _SID;
            this.AJAX(url, 'GET', {}, function(data) {
                if (data.Data.length > 0) {
                    var comment = '';
                    for (var i = 0; i < data.Data.length; i++) {
                        var comm = data.Data[i];
                        comment += '<li><p><span>' + comm.Name + '</span><span>' + comm.CreateDate + '</span></p><label>' + comm.Cont + '</label></li>';
                    }
                    document.querySelector('.editor-message').innerHTML = comment;
                }
            });
        }
    };
    var _d = new Date();
    document.querySelector('.editor-date-now').innerText = _d.getFullYear() + '-' + (_d.getMonth() + 1) + '-' + _d.getDate();
    obj.init();
    //obj.event();
    obj.getCommit();
    obj.event2();
    return obj;
}

var editor = new Editor();
var brower=navigator.userAgent;
if (brower.indexOf('iPhone')>-1){
    
} else {
    document.querySelector('body').style.overflow = 'auto';
}

function _Alert(text) {
    var htm = '<div class="alert" style="text-align:center;width:4.5rem;position: absolute;;left:50%;top:50%;-webkit-transform:translate(-50%,-50%);background:#FFF;border-radius:5px;border:1px solid #CCC;"><p style="font-size:0.3rem;border-bottom:0.01rem solid #CCC;padding:0.3rem;min-height:0.5rem;">' + text + '</p><a onclick=\'this.parentNode.parentNode.removeChild(this.parentNode)\'><h5 style="font-size:0.3rem;line-height:0.6rem;font-weight:300;">确定</h5></a></div>';
    document.querySelector('.alert-showbox').innerHTML = htm;
}