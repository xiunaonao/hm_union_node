/* v0.0.1 by yujin 20170330 */
function ifreamStyle($this) {
    var $ifream = $($this); //将js对象转换成jq对象，
    
    $ifream.find("html").css({ "width": "100%", "height": "100%", "overflow": "hidden" });
    $ifream.find("body").css({ "width": "100%", "height": "100%", "overflow-y": "scroll", "padding-right": "17px" });
    console.log($ifream.find("html"));
}
(function ($) {
    $.extend({
        tryAjax: function (options) {
            var defaults = { type: 'get', dataType: 'json', contentType: 'application/json' };
            options = $.extend(defaults, options);
            $.ajax({
                url: options.url,
                type: options.type,
                dataType: options.dataType,
                data: options.data,
                contentType: options.contentType,
                success: function (data, textStatus, jqXHR) {
                    //console.log(JSON.stringify(data));
                    if (options.success) {
                        if (data.Success) {
                            options.success(data);
                        } else {
                            $.popAlert(data.Message);
                        }
                    }
                    //else {
                    //    if (data && data.Message) {
                    //        $.popAlert(data.Message);
                    //    }
                    //}
                },
                error: function (data) {
                    if (options.error) {
                        options.error(data);
                    } else {
                        $.popAlert("全局错误"); /*TODO:20161009 yj savelog*/
                    }
                }
            });
        },
        tryGet: function (url, data, success, dataType, options) {
            if (!options) {
                options = {};
            }

            //忽略请求参数情况
            if (typeof data === 'function' && !success) {
                success = data;
            }

            options.url = url;
            options.data = data;
            options.dataType = dataType;
            options.success = success;
            options.type = 'POST';

            return $.tryAjax(options);
        },
        tryPost: function (url, data, success, dataType, options) {
            if (!options) {
                options = {};
            }

            //忽略请求参数情况
            if (typeof data === 'function' && !success) {
                success = data;
            }

            options.url = url;
            options.data = data;
            options.dataType = dataType;
            options.success = success;
            options.type = 'POST';

            return $.tryAjax(options);
        },
        popAlert: function (message, title, expire) {
            //if (!title) {
            //    title = "系统提示";
            //}
            //if (!expire) {
            //    expire = 60 * 60 * 24;
            //}
            alert(message);
        },
        popConfirm: function (message, title, callfunc) {
            if (typeof title === "function") {
                callfunc = title;
                title = '';
            }
            if (confirm(message)) {
                if (callfunc) {
                    callfunc();
                }
            }
        },
        debug: function (log) {
            console.log(log);
        },
        localhost: "http://" + window.location.host,
        domain: "http://" + window.location.host,
        goto: function (url) {
            if (!url) {
                return;
            }
            $.debug('goto(' + url + ')');
            if (url == '-1') {
                window.history.back(-1);
            } else if (url == '-2') {
                window.history.back(-2);
            } else if (url == '0') {
                window.location.reload();
            } else if (url) {
                window.location.href = url;
            }
        }
    });

    $.fn.extend({
        getEachAttrs: function (name) {
            var eles = this;
            var arr = new Array();
            eles.each(function () {
                arr.push($(this).attr(name));
            });
            return arr;
        },
        getForm: function () {
            var ele = this;
            var eles = ele.find('input,checkbox,hidden,select');
            eval('var data = {};');
            eles.each(function () {
                var curr = $(this);
                eval('var curr = $(this);');
                var id = curr.attr("id");
                var type = curr.attr("type");
                if (id) {
                    if (curr.is('input')) {
                        if (type == 'text') {
                            eval('data.' + id + '=curr.val();');
                        } else if (type == 'hidden') {
                            eval('data.' + id + '=curr.val();');
                        }
                    } else if (curr.is('select')) {
                        eval('data.' + id + '=curr.val();');
                    }
                }
            });
            $.debug(data);
            return eval('data;');
        },
        getForms: function () {
            var vals = [];
            this.each(function () {
                var val = $(this).getForm();
                if (val) {
                    vals.push(val);
                }
            });
            return vals;
        },
        bindForm: function (data) {
            if (!data) {
                return;
            }
            var ele = this;
            var eles = ele.find('input,checkbox,hidden,select');
            eles.each(function () {
                var curr = $(this);
                eval('var curr = $(this);');
                var id = curr.attr("id");
                var type = curr.attr("type");
                if (id) {
                    if (curr.is('input')) {
                        if (type == 'text') {
                            eval('if(data.' + id + '){curr.val(data.' + id + ')}');
                        } else if (type == 'hidden') {
                            eval('if(data.' + id + '){curr.val(data.' + id + ')}');
                        }
                    } else if (curr.is('select')) {
                        eval('if(data.' + id + '){curr.val(data.' + id + ')}');
                    }
                }
            });
        },
        clearForm: function () {
            var ele = this;
            ele.find('input[type=text]').val('');
        }
    });
})(window.jQuery);
