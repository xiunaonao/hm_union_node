var width = document.documentElement.clientWidth;
    var _height = document.documentElement.clientHeight;
    var mul = width / 640;
    document.querySelector('html').style.fontSize = mul * 100 + 'px';

var memberId = _param.id;
var memberName = decodeURI(_param.name);
document.querySelector('.editor-author').value = memberName;
console.log("memberId:"+memberId+" || memberName:"+memberName);

function Editor() {
    var obj = {
        //_host: 'http://tool.123zou.com/',
        _host :"http://" + window.location.host,
        AJAX: function(url, type, data, success, error) {
            var xhr = new XMLHttpRequest();
            var _url = url;
            if (_url.indexOf('http') <= -1) {
                _url = this._host + url;
            }
            xhr.open(type, _url, true);
            if(type=='POST')
                xhr.setRequestHeader('Content-Type', 'application/json');
            if (data)
                xhr.send(JSON.stringify(data));
            else
                xhr.send();
            xhr.onload = function() {
                if (xhr.status == 200) {
                    success(JSON.parse(xhr.responseText));
                } else {
                    if (error)
                        error(xhr);
                }
            }
        },
        AJAX2:function(url,type,data,success,error){
            $.ajax({
                url:url,
                data:data,
                type:type,
                success:function(data){
                    success(data);
                }
            })
            return;
            var xhr = new XMLHttpRequest();
            if (url.indexOf('http') == -1) {
                xhr.open(type, this._host + url, true);
            } else {
                xhr.open(type, url, true);
            }
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            
            //var formdata=new FormData();
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
            var _SID = 0;
            var self = this;
            if (_SID != '0') {
                //var url = '/api/noticeapi/SelectNoticeContInfo?id=' + _SID;
                var url='http://cj.123zou.com/MobileNews/get_single_news?id='+_SID;

                this.AJAX(url, 'GET', undefined, function(data) {
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
                        document.querySelector('.editor-box').innerHTML = data.data.news_content.replace(/&lt;/g,'<').replace(/&gt;/g,'>');;
                        if (data.data.news_content.length > 0) {
                            var css = document.querySelector('.editor-box').getAttribute('class');
                            document.querySelector('.editor-box').setAttribute('class', css.replace(' editor-box-none', ''));
                        }
                        document.querySelector('.editor-author').value = data.data.news_author;
                        document.querySelector('title').innerText = data.data.news_title;
                    }
                    // document.querySelector('.editor-title div').innerText = data.Data.Title;
                    // if (data.Data.Title.length > 0) {
                    //     var css = document.querySelector('.editor-title div').getAttribute('class');
                    //     document.querySelector('.editor-title div').setAttribute('class', css.replace('editor-title-none', ''));
                    // }
                    // var date = new Date(data.Data.ROWIDATE.replace(/\-/g, "\/"));
                    // document.querySelector('.editor-date-now').innerText = date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日';

                    // document.querySelector('.editor-box').innerHTML = data.Data.ContString;
                    // if (data.Data.ContString.length > 0) {
                    //     var css = document.querySelector('.editor-box').getAttribute('class');
                    //     document.querySelector('.editor-box').setAttribute('class', css.replace(' editor-box-none', ''));
                    // }

                    // if (data.Data.GroupName) {
                    //     for (var i = 0; i < document.querySelectorAll('.editor-post-category .li').length; i++) {
                    //         var li = document.querySelectorAll('.editor-post-category .lic')[i].innerText;
                    //         if (data.Data.GroupName.indexOf(li) > -1) {
                    //             this.setAttribute('class','lic');
                    //         }
                            

                    //     }
                    // }
                });
            }
        },
        createPage: function() {
            var domain = "http://" + window.location.host;
            var url = domain + '/api/noticeapi/SaveNoticeCont';
            var memberId=location.search.substring(location.search.indexOf('memberId')+9);
            console.log(memberId);
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
                Author: document.querySelector('.editor-author').value,
                Digest: ''

            };

            var url2='http://cj.123zou.com/MobileNews/save_or_update_news';
                if(location.href.indexOf('test')>0){
                    url2='http://192.168.5.173:8080/MobileNews/save_or_update_news';
                }
            var htmldiv=document.createElement('div');
            htmldiv.innerText=json.ContString;
            json2={
                news_title:json.Title,
                news_content:htmldiv.innerHTML.replace(/</g,'&lt;').replace(/>/g,'&gt;'),
                member_id:memberId,
                news_author:json.Author
            }

            if (json.Title == '') {
                _Alert2('请先填写标题');
                return;
            }
            var trim = json.Title.split(' ');
            var isnull = true;
            for (var i = 0; i < trim.length; i++) {
                if (trim[i] != '')
                    isnull = false;
            }
            if (isnull) {
                _Alert2('请先填写标题');
                return;
            }
            json.GroupName = '';
            for (var i = 0; i < document.querySelectorAll('.editor-post-category .lic').length; i++) {
                var li = document.querySelectorAll('.editor-post-category .lic')[i].innerText;
                if (json.GroupName != '')
                    json.GroupName += ',';
                json.GroupName += li;
                
                json2.news_type= document.querySelectorAll('.editor-post-category .lic')[i].querySelector('input').getAttribute('data-id');
            }


            if (!json.GroupName) {
                _Alert2('请选择要发布的分类');
                return
            }else{
                // if(!json.GroupName.indexOf('工会头条')>-1)
                //     json2.news_type=1;
                // else
                //     json2.news_type=2;
            }



            //json.GroupName = '';

            if (document.querySelector('img')) {

                json.CoverUrl = '';
                json2.head_img_url='';
                for (var i = 0; i < document.querySelectorAll('img').length; i++) {
                    if (i >= 3)
                        break;
                    if (i != 0) {
                        json.CoverUrl += ',';
                        json2.head_img_url+=',';
                    }
                    json.CoverUrl += document.querySelectorAll('img')[i].getAttribute('src');
                    json2.head_img_url+=document.querySelectorAll('img')[i].getAttribute('src');
                }

            }
            if (_SID) {
                json.NTCID = _SID;
                json2.news_id=_SID;
            }
            if(json2.news_id=='0')
                delete json2.news_id;
            //alert(url);

            this.AJAX2(url2,'POST',json2,function(data){
                if (data.success) {
                    //alert('保存成功');
                    _Alert('发布成功');
                    setTimeout(function() {
                        if (location.href.indexOf('&xyh=1') > -1) {
                            location.href = 'ArticleSchoolList';
                        } else {
                            location.href = 'ArticleList?memberId='+memberId;
                        }
                    }, 500);

                } else {
                    _Alert2(data.Message);
                }
            });

            // this.AJAX(url, 'POST', json, function(data) {
            //     if (data.Success) {
            //         //alert('保存成功');
            //         _Alert('发布成功');
            //         setTimeout(function() {
            //             if (location.href.indexOf('&xyh=1') > -1) {
            //                 location.href = 'ArticleSchoolList';
            //             } else {
            //                 location.href = 'ArticleList';
            //             }
            //         }, 500);

            //     } else {
            //         _Alert2(data.Message);
            //     }

            // }, function(xhr) {
            //     _Alert2('出现错误：' + JSON.stringify(xhr));
            //     //_Alert(JSON.stringify(xhr));
            // });


        },
        event: function() {
            var self = this;
            document.querySelector('.editor-title-none').addEventListener('focus', function(e) {
                var cls = this.getAttribute('class');
                this.setAttribute('class', cls.replace('editor-title-none', ''));
            });

            document.querySelector('.editor-title div').addEventListener('blur', function(e) {
                var cls = this.getAttribute('class');
                if (this.innerText == '') {
                    this.setAttribute('class', cls + 'editor-title-none');
                }

            });

            document.querySelector('.editor-box-none').addEventListener('focus', function(e) {
                var cls = this.getAttribute('class');
                this.setAttribute('class', cls.replace(' editor-box-none', ''));
            });

            document.querySelector('.editor-box').addEventListener('blur', function(e) {
                var cls = this.getAttribute('class');
                if (this.innerText == '') {
                    this.setAttribute('class', cls + ' editor-box-none');
                }

            });


            document.querySelector('.editor-box').addEventListener('focus', function(e) {
                //this.style.paddingBottom = _height / 2 + 'px';
                //this.scrollIntoView(true);
                document.documentElement.scrollTop = document.documentElement.scrollHeight;
            });

            document.querySelector('.editor-box').addEventListener('blur', function(e) {
                //this.style.paddingBottom ='0.5rem';
            });

            var zupload = new ZUpload({
                before: function(t, callback) {
                    //上传操作前执行的方法，可不设置，如果设置，请执行callback()
                    document.querySelector('.editor-box').focus();
                    _Loading('正在上传');
                    setTimeout(function() {
                        document.querySelector('.alert-showbox').innerHTML = '';
                    }, 10000);
                    callback();
                },
                url: 'http://www.123zou.com/Api/UploadApi/Photo/?isMaterial=0&maxQuality=96', //动态赋值
                //url:'http://uup.123zou.com/ueditor.ashx?action=uploadimage&encode=utf-8',
                mul: 0.5,
                dom: '#uploadBtn', //要点击上传的file文件框
                success: function(data) {
                    document.querySelector('.alert-showbox').innerHTML = '';

                    var cls = document.querySelector('.editor-box').getAttribute('class');
                    document.querySelector('.editor-box').setAttribute('class', cls.replace(' editor-box-none', ''));

                    if (data[0].Success) {
                        var url = data[0].Data.Url;
                        //console.log(url);
                        var editor = document.querySelector('.editor-box');
                        editor.innerHTML += '<p><img src="' + url + '"/><br/></p>';
                        editor.focus();
                        //window.getSelection().collapseToEnd();
                        console.log('allchildNodes:' + editor.childNodes.length);
                        window.getSelection().getRangeAt(0).setStart(editor, editor.childNodes.length);
                        editor.style.paddingBottom = _height / 2 + 'px';
                        //window.getSelection().collapse(editor,editor.innerText.length-1);

                    }


                    //上传完成后执行的操作
                },
                progress: function(data) {
                    //未实现
                },
                error: function(err) {
                    document.querySelector('.alert-showbox').innerHTML = '';
                    if (err && err.target && err.target.response) {
                        console.log(err.target.response);
                        var errJSON = JSON.parse(err.target.response);
                        if (errJSON.Message == '系统全局异常') {
                            _Alert2('网络错误');
                        } else {
                            _Alert2(errJSON.Message);
                        }
                    } else {
                        _Alert2('上传失败');
                    }

                    //出现异常时执行的操作
                }
            });

            for (var i = 0; i < document.querySelectorAll('.editor-post-category ul input').length; i++) {
                document.querySelectorAll('.editor-post-category ul input')[i].addEventListener('click', function (e) {
                    var cls = this.parentNode.getAttribute('class');
                    Debug.Log(cls);
                    if (cls == 'lic') {
                        this.parentNode.setAttribute('class', '');
                    } else {
                        this.parentNode.setAttribute('class', 'lic');
                    }
                });
            }

            document.querySelector('.editor-save').addEventListener('click',function(){
                //if(_SID=='0')
                document.querySelector('.editor-post-category').style.display = 'block';
                
            });

            document.querySelector('.post-btn-cancel').addEventListener('click', function () {
                document.querySelector('.editor-post-category').style.display = 'none';
            });

            document.querySelector('.post-btn-confirm').addEventListener('click', function () {
                self.createPage();
            });

            document.querySelector('.editor-url').addEventListener('click', function() {
                _URL();
            });
        }
    };
    var _d = new Date();
    document.querySelector('.editor-date-now').innerText = _d.getFullYear() + '-' + (_d.getMonth() + 1) + '-' + _d.getDate();
    obj.init();
    obj.event();

    return obj;
}

var editor=new Editor();


function _Alert2(text) {
    var htm = '<div class="alert" style="text-align:center;width:4.5rem;position: absolute;;left:50%;top:50%;-webkit-transform:translate(-50%,-50%);background:#FFF;border-radius:10px;border:1px solid #CCC;"><p style="font-size:0.3rem;border-bottom:0.01rem solid #CCC;padding:0.3rem;min-height:0.5rem;">' + text + '</p><a onclick=\'this.parentNode.parentNode.removeChild(this.parentNode)\'><h5 style="font-size:0.3rem;line-height:0.6rem;">确定</h5></a></div>';
    document.querySelector('.alert-showbox').innerHTML = htm;
}


function _Alert(text) {
    //var htm = '<div class="alert" style="text-align:center;width:4.5rem;position: absolute;;left:50%;top:50%;-webkit-transform:translate(-50%,-50%);background:#FFF;border-radius:5px;border:1px solid #CCC;"><p style="font-size:0.3rem;border-bottom:0.01rem solid #CCC;padding:0.3rem;min-height:0.5rem;">' + text + '</p><a onclick=\'this.parentNode.parentNode.removeChild(this.parentNode)\'><h5 style="font-size:0.3rem;line-height:0.6rem;font-weight:300;">确定</h5></a></div>';
    var htm = '<div class="alert" style="background:rgba(0,0,0,0.7);width:100%;height:100%;position:fixed;left:0;top:0;"><div style="position: absolute;;left:50%;top:50%;-webkit-transform:translate(-50%,-50%);text-align:center;color: #FFF;font-size: 0.3rem;"><img style="width:1.2rem;" src="/images/save-article.png"/><p>'+text+'</p></div></div>';
    document.querySelector('.alert-showbox').innerHTML = htm;
}

function _Loading(text) {
    var htm = '<div style="position:fixed;left:0;top:0;width:100%;height:100%;background:rgba(0,0,0,0.5);"></div><div class="alert" style="text-align:center;width:4.5rem;position: absolute;;left:50%;top:50%;-webkit-transform:translate(-50%,-50%);background:#FFF;border-radius:5px;border:1px solid #CCC;"><p style="font-size:0.3rem;padding:0.3rem;min-height:0.5rem;">' + text + '</p></div>';
    document.querySelector('.alert-showbox').innerHTML = htm;
}

function _URL() {
    var htm = '<div style="position:fixed;left:0;top:0;width:100%;height:100%;background:rgba(0,0,0,0);"><div class="alert" style="background:#555555;width:5.5rem;height:3rem;text-align:center;position: absolute;;left:50%;top:50%;-webkit-transform:translate(-50%,-50%);">'+
        '<p style="height: 1rem;"><span style="color:#fff;font-size:0.3rem;float:left;line-height:1rem;margin-left:1rem;">链接</span><a style="float:right;" onclick=\'document.querySelector(".alert-showbox").innerHTML="";\'><img style="width: 0.3rem;float: left;margin: 0.2rem; 0.2rem 0 0;" src="/images/pe_close.png"/></a></p>' +
        '<p><input id="url-input" style="border: none;display:block;margin:0 0.95rem;width:3.6rem;height:0.5rem;" type="text" value=""/></p>' +
        '<p><input onclick="getURL()" style="width:1.5rem;height:0.5rem;border:none;background:#ef4141;color:#FFF;margin-right: 0.6rem;" type="button" value="确定"/><input style="width:1.5rem;height:0.5rem;border:none;color:#b5b5b5;background:#FFF;" type="button" value="关闭"  onclick=\'document.querySelector(".alert-showbox").innerHTML="";\'/></p>' +
        '</div></div>';
    document.querySelector('.alert-showbox').innerHTML = htm;

}

function getURL() {
    var url = 'http://union.123zou.com/Api/WechatApi/GetOnlineArticle';
    editor.AJAX(url, 'POST', { Url: document.querySelector('#url-input').value }, function(data) {
        document.querySelector('.editor-title div').innerText = data.Data.Title;
        document.querySelector('.editor-title div').setAttribute('class', document.querySelector('.editor-title div').getAttribute('class').replace('editor-title-none', ''));

        document.querySelector('.editor-box').innerHTML = data.Data.ContString+'<br/><br/>';
        document.querySelector('.editor-box').setAttribute('class', document.querySelector('.editor-box').getAttribute('class').replace(' editor-box-none', ''));

        document.querySelector('.editor-author').value = data.Data.Author;

        document.querySelector('.alert-showbox').innerHTML = '';

        for (var i = 0; i < document.querySelectorAll('.editor-box img').length; i++) {
            document.querySelectorAll('.editor-box img')[i].style.maxWidth = '100%';
        }
    });

    _Loading('信息录入中');
}