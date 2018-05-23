window.SYS =function() {
    
    return {
        _host:'http://www.123zou.com/',
        initDiv:'<div class="ctrl-option-detail">',
        init:function(){
            var self=this;
            document.querySelector('body').addEventListener('click',function(e){

                if(document.querySelector('.ctrl-textDiv')){
                    var cls=document.querySelector('.ctrl-textDiv').getAttribute('class');
                    cls=cls.replace('ctrl-textDiv-ex','');
                    document.querySelector('.ctrl-textDiv').setAttribute('class',cls);
                }

                var querys=document.querySelectorAll('.alert-hide');
                for(var i=0;i<querys.length;i++){
                    querys[i].style.display='none';
                }
                if(self.nowColor){
                    self.nowColor.style.display='block';
                    self.nowColor=null;
                }
            })



            document.querySelector('.editor-option').addEventListener('mousemove',function(e){
                if(self.sliderNow){
                    var x=e.clientX-self.sliderX;
                    var left=parseFloat(self.sliderDom.style.left)+x;
                    if(left>=180)
                        left=180;
                    if(left<=0)
                        left=0;
                    self.sliderDom.style.left=left+'px';
                    self.sliderX=e.clientX;
                    var input=self.sliderDom.parentNode.querySelector('input');
                    var min=parseFloat(input.getAttribute('min'));
                    var max=parseFloat(input.getAttribute('max'));
                    var unit=input.getAttribute('unit');
                    input.value=parseInt((left/180)*(max-min)+min)+unit;
                    var type=self.sliderDom.parentNode.getAttribute('class');
                    self.sliderOver(self.sliderDom,type);

                }
            });

            document.querySelector('.editor-option').addEventListener('mouseup',reset_default);
            document.querySelector('.editor-option').addEventListener('mouseleave',reset_default);

            function reset_default(e){
                self.sliderNow=false;
                if(document.querySelector('.ctrl-textDiv-editor')){
                    document.querySelector('.ctrl-textDiv-editor').setAttribute('contenteditable','true');


                    if(window.getSelection().anchorNode){
                        self.selectTxt=window.getSelection().toString();
                        var selectIndex=window.getSelection().focusNode.parentNode;
                        var selectIndex2=window.getSelection().anchorNode.parentNode;
                        var first=true;
                        var zlist=document.querySelectorAll('.ctrl-textDiv-editor z');
                        for(var i=0;i<zlist.length;i++){
                            if(zlist[i]==selectIndex || zlist[i]==selectIndex2){
                                if(first){
                                    self.selectIndex=i;
                                    first=false;
                                }else{
                                    self.selectIndex2=i;
                                }
                                
                            }
                        }
                    }
                }

                

            }
        },
        AJAX: function (url, type, data, success,error) {
            var xhr = new XMLHttpRequest();
            xhr.open(type, this._host+url, true);
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
        },
        slider:function(name,css,min,max,base,unit){
            var html='';
            if(name!=null){
                html=this.initDiv+'<label>'+name+'：</label>';
            }
            html+='<div class="sys-slider-div '+(name?name:'font-size')+'">';
            html+='<div class="sys-slider-line"></div>';
            html+='<span class="sys-slider-bar"></span>';
            html+='<input class="'+css+'" min="'+min+'" max="'+max+'" unit="'+unit+'" type="text" value="'+base+unit+'"/>';
            html+='</div>';

            if(name)
                html+='</div>';

            return html;
        },
        input:function(name,css,title,base,type){
            var html=this.initDiv+'<div class="ctrls-option-txt '+css+'">';
            html+='<label>'+name+':</label>';
            html+='<input type="'+(type?type:'text')+'" name="'+name+'" placeholder="'+title+'" mtype="'+type+'" value="'+base+'"/>';
            html+='</div>';
            html+='</div>';

            return html;
        },
        checkbox:function(name,css,base,type){
            var html=this.initDiv+'<div class="ctrls-option-check '+css+'">';
            html+='<label>'+name+':</label>';
            html+='<input type="button" value="" class="'+(base?"check-true":"check-false")+'" name="'+name+'"/>';
            html+='</div>';
            html+='</div>';
            return html;
        },
        select:function(name,css,values,options,base,free){
            var obj={};
            var html=this.initDiv+'<div class="ctrls-option-select '+css+'"><label>'+name+':</label>';
            if(!base){
                base=0;
            }
            html+='<span v="'+values[base]+'">'+(options?options[base]:values[base])+'</span>';

            html+='<nav class="select-option">';
            html+='';
            var array=[];
            var array2=[];
            array=values;
            if(options){
                array2=options;
            }
            // if(values.indexOf(',')>-1){
            //     array=values.split(',');
            //     if(options){
            //         array2=options.split(',');
            //     }
            // }
            console.log(array);
            console.log(array2);
            var texts=array;
            if(array2.length>0)
                texts=array2;
            for(var i=0;i<texts.length;i++){
                html+='<p v="'+array[i]+'">'+texts[i]+'</p>';
            }
            if(free){
                html+='<p><input type="text"/></p>';
            }
            html+='</nav>';
            html+='</div>';
            return html;
        },
        colorBar:function(name,css,base){
            if(!base)
                base='#000000';
            var html=this.initDiv+'<div class="ctrls-option-color '+css+'">';
            html+='<label>'+name+':</label>';
            html+='<input type="text" value="'+base+'"/>';
            html+='<span style="background-color:'+base+'"></span>';
            html+='<div class="hide-colorBar cp-default alert-hide"></div>';
            return html;
        },
        bindSlider:function(dom){
            var self=this;
            
            dom.querySelector('.sys-slider-bar').addEventListener('mousedown',function(e){

                self.sliderNow=true;
                self.sliderX=e.clientX;
                self.sliderY=e.clientY;
                self.sliderDom=this;
                document.querySelector('.ctrl-textDiv-editor').setAttribute('contenteditable','false');
            });

            dom.querySelector('input').addEventListener('keyup',function(e){
                var type=this.parentNode.getAttribute('class');
                self.sliderOver(this,type);

            });
        },
        uploadBox:function(name,css,base){
            var html = this.initDiv + '<div style="height:155px;" class="ctrls-option-upload ctrls-option-txt ' + css + '">';
            html+='<label>'+name+':</label>';
            html += '<input type="button" value="" style="position:absolute;background:url('+base+') no-repeat 0/155px; no-repeat;"/>';
            html+='<input type="file" name="'+name+'" accept="image/png,image/gif" value="'+base+'" style="opacity:0;"/>';
            html+='</div>';
            html+='</div>';

            return html;
        },
        textarea:function(name,css,title,base){
            var html=this.initDiv+'<div style="height:155px;" class="ctrls-option-txt '+css+'">';
            html+='<label>'+name+':</label>';
            html+='<textarea  name="'+name+'" placeholder="'+title+'">'+base+'</textarea>';
            html+='</div>';
            html+='</div>';

            return html;
        },
        sliderOver:function(dom,type){
            var self=this;
            if(type.indexOf('font-size')){
                var editor=document.querySelector('.ctrl-textDiv-editor');

                var value=dom.parentNode.querySelector('input').value;
                var html=editor.innerHTML;
                var size=parseFloat(value)/100+'rem';
                if(!self.selectTxt || self.selectTxt==''){
                    editor.querySelector('article').style.fontSize=size;
                }

                //editor.querySelectorAll('article z')[self.selectIndex]=
                for(var i=0;i<editor.querySelectorAll('article z').length;i++){
                    var z=editor.querySelectorAll('article z')[i];
                    if(!self.selectTxt || self.selectTxt==''){
                        z.style.fontSize=size;
                    }else{
                        if(i>=self.selectIndex && i<=self.selectIndex2){
                            z.style.fontSize=size;
                        }
                    }
                }
                if(sc.ctrl.Content!=document.querySelector('.ctrl-textDiv-editor').innerHTML)
                    sc.saveHistory([sc.ctrl.ind],[{Content:sc.ctrl.Content}]);
                sc.ctrldom.querySelector('.cont-ctrl-box').innerHTML=document.querySelector('.ctrl-textDiv-editor').innerHTML;
                sc.ctrl.Content=document.querySelector('.ctrl-textDiv-editor').innerHTML;

            }
        },
        fontOption:function(dom,type){
            var self=this;
            var editor=document.querySelector('.ctrl-textDiv-editor');
            var value='';
            document.querySelector('.ctrl-textDiv-editor').setAttribute('contenteditable','false');
            if(type=='color'){
                value=document.querySelector('.ico-color').style.backgroundColor;
            }
            if(type=='bold'){
                value=300;
            }
            if(type=='italic'){
                value="italic";
            }

            var html=editor.innerHTML;
            //var size=parseFloat(value)/100+'rem';
            var value2='';
            if(!self.selectTxt || self.selectTxt==''){
                if(type=='color')
                    editor.querySelector('article').style.color=value;
            }
            var start=false;
            
            for(var i=0;i<editor.querySelectorAll('article z').length;i++){
                var z=editor.querySelectorAll('article z')[i];
                if(!self.selectTxt || self.selectTxt==''){
                    if(type=='color'){
                        z.style.color=value;
                        //sc.saveHistory([sc.ctrl.ind],[{Style:{Color:sc.ctrl.Style.Color}}]);
                        sc.ctrl.Style.Color=value;

                    }
                    if(type=='bold'){
                        if(i==0)
                            if(editor.querySelectorAll('article z')[0].style.fontWeight!='' && editor.querySelectorAll('article z')[0].style.fontWeight==600){
                                z.style.fontWeight=300;
                            }else{
                                z.style.fontWeight=600;
                            }
                        if(i!=0){
                            z.style.fontWeight=editor.querySelectorAll('article z')[0].style.fontWeight;
                        }
                    }
                    if(type=="italic"){
                        if(i==0)
                            if(editor.querySelectorAll('article z')[0].style.fontStyle!='' && editor.querySelectorAll('article z')[0].style.fontStyle=='italic'){
                                z.style.fontStyle='normal';
                            }else{
                                z.style.fontStyle='italic';
                            }
                        if(i!=0){
                            z.style.fontStyle=editor.querySelectorAll('article z')[0].style.fontStyle;
                        }
                    }
                    //text-decoration
                    if(type=='underline'){
                        if(i==0)
                            if(editor.querySelectorAll('article z')[0].style.textDecoration!='' && editor.querySelectorAll('article z')[0].style.textDecoration=='underline'){
                                z.style.textDecoration='none';
                            }else{
                                z.style.textDecoration='underline';
                            }
                        if(i!=0){
                            z.style.textDecoration=editor.querySelectorAll('article z')[0].style.textDecoration;
                        }
                    }
                }else{
                    if(i>=self.selectIndex && i<=self.selectIndex2){
                        var minIndex=self.selectIndex;
                        if(self.selectIndex>self.selectIndex2)
                            minIndex=self.selectIndex2;
                        if(!start){
                            start=true;
                            //console.log(z.style.fontWeight);
                        }

                        if(type=='color'){
                            z.style.color=value;
                        }
                        if(type=='bold')
                            if(i==minIndex)
                                if(z.style.fontWeight!='' && z.style.fontWeight==600){
                                    z.style.fontWeight=300;
                                }else{
                                    z.style.fontWeight=600;
                                }
                            else{
                                z.style.fontWeight=editor.querySelectorAll('article z')[minIndex].style.fontWeight;
                            }


                        if(type=='italic'){
                            if(i==minIndex)
                                if(z.style.fontStyle!='' && z.style.fontStyle=='italic'){
                                    z.style.fontStyle='normal';
                                }else{
                                    z.style.fontStyle='italic';
                                }
                            else{
                                z.style.fontStyle=editor.querySelectorAll('article z')[minIndex].style.fontStyle;
                            }
                        }
                        if(type=='underline'){
                            if(i==minIndex)
                                if(z.style.textDecoration!='' && z.style.textDecoration=='underline'){
                                    z.style.textDecoration='none';
                                }else{
                                    z.style.textDecoration='underline';
                                }
                            else{
                                z.style.textDecoration=editor.querySelectorAll('article z')[minIndex].style.textDecoration;
                            }
                        }
                    }
                }



            }
            if(type=='textLeft'){
                    editor.querySelector('article').style.textAlign='left';
            }
            if(type=='textCenter'){
                    editor.querySelector('article').style.textAlign='center';
            }
            if(type=='textRight'){
                    editor.querySelector('article').style.textAlign='right';
            }
            if(type=='lineHeight'){
                    editor.querySelector('article').style.lineHeight='right';
            }
            sc.ctrldom.querySelector('.cont-ctrl-box').innerHTML=document.querySelector('.ctrl-textDiv-editor').innerHTML;
            //if(sc.ctrl.Content!=document.querySelector('.ctrl-textDiv-editor').innerHTML)
            //    sc.saveHistory([sc.ctrl.ind],[{Content:sc.ctrl.Content}]);
            sc.ctrl.Content=document.querySelector('.ctrl-textDiv-editor').innerHTML;
        },
        textInput:function(name,css,min,max,base){
            var html='';
            html=this.initDiv+'<label>'+name+'</label>';
            html+='<input class="'+css+' sys-txt-input" type="text" value=""/>';
                html+='</div>';

            return html;
        },
        fontSizeBar:function(name,css){
            var html='<li style="alert-box">';
            html+=this.slider(name,css,12,72,15);
            html+='</li>';
        },
        textDiv:function(name,value,color,fontsize){
            var html=this.initDiv;
            html+='<div class="ctrl-textDiv '+name+'">';

            html+='<ul class="ico-text-div">';
            html+='<li class="ico-size select" v=\'{\"value\":\"12,13,14,16,18,20,24,36,48,72\",\"free\":\"自定义字号\",\"name\":\"fontSize\"}\' title="文字大小"><button></button></li>';
            html+='<li class="ico-color" title="文字颜色" style="background-color:'+color+';"><button></button></li>';
            html+='<li class="ico-family" title="文字样式"><button></button></li>';
            html+='<li class="ico-bold" title="文字加粗"><button></button></li>';
            html+='<li class="ico-italic" title="文字倾斜"><button></button></li>';
            html+='<li class="ico-underline" title="下划线"><button></button></li>';
            html+='<li class="ico-left" title="左对齐"><button></button></li>';
            html+='<li class="ico-center" title="居中"><button></button></li>';
            html+='<li class="ico-right" title="右对齐"><button></button></li>';
            html+='<li class="ico-lineHeight" title="文字行高"><button></button></li>';

            html+='<li class="alert-hide alert-font alert-font-size">'+this.slider(null,'font-size',12,72,15,'px')+'</li>';
            html+='<li class="alert-hide alert-color cp-default"></li>';
            html+='<li class="alert-hide alert-font alert-line-height">'+this.slider(null,'line-height',15,72,20,'px')+'</li>';
            //html+='<li class="alert-font alert-font-size">'+this.select(null,'font-size',12,72,15,'px')+'</li>';
            html+='</ul>';

            html+='<div contenteditable="true" class="ctrl-textDiv-editor">';
            html+=value;
            html+='</div>';
            html+='</div>';

            return html;
        },
        formDiv:function(obj){
            var self=this;
            var html=this.initDiv;

            html+='<div class="ctrl-formDiv">';
            //html+='<li><div><label>输入框标题:</label><input value="请输入姓名"/>';
            html+=formlist('姓名','请输入姓名');

            html+='</div>';

            return html;

            function formlist(name,base){
                var htm='<li>';
                htm+=self.input(name,'',base,'');

                
            }
        },
        fontEvent:function(){
            var self=this;

            document.querySelector('.ctrl-textDiv').addEventListener('click',function(e){
                e.stopPropagation();
            })

            document.querySelector('.ico-size').addEventListener('click',function(e){
                e.stopPropagation();
                if(document.querySelector('.alert-font').style.display=='block'){
                    hideControls();
                }else{
                    hideControls();
                    var obj=JSON.parse(this.getAttribute('v'));
                    
                    //this.innerHTML=this.innerHTML+self.createSelect(obj);
                    var css=this.parentNode.parentNode.getAttribute('class');
                    this.parentNode.parentNode.setAttribute('class',css.replace(' ctrl-textDiv-ex','')+' ctrl-textDiv-ex');
                    var fz=parseFloat(document.querySelector('.ctrl-textDiv-editor article').style.fontSize)*100;
                    var input=this.parentNode.parentNode.querySelector('.alert-font-size .sys-slider-div input');
                    var min=parseFloat(input.getAttribute('min'));
                    var max=parseFloat(input.getAttribute('max'));
                    document.querySelector('.alert-font-size').style.display='block';
                    var v=((fz-min)/(max-min))*180;
                    this.parentNode.parentNode.parentNode.querySelector('.alert-font-size .sys-slider-div .sys-slider-bar').style.left=v+'px';
                }

            });
            document.querySelector('.ico-bold').addEventListener('click',function(e){
                e.stopPropagation();
                hideControls();
                self.fontOption(this,'bold');
            });

            document.querySelector('.ico-italic').addEventListener('click',function(e){
                e.stopPropagation();
                hideControls();
                self.fontOption(this,'italic');
            });

            document.querySelector('.ico-underline').addEventListener('click',function(e){
                e.stopPropagation();
                hideControls();
                self.fontOption(this,'underline');
            });

            document.querySelector('.ico-left').addEventListener('click',function(e){
                e.stopPropagation();
                hideControls();
                self.fontOption(this,'textLeft');
            });

            document.querySelector('.ico-center').addEventListener('click',function(e){
                e.stopPropagation();
                hideControls();
                self.fontOption(this,'textCenter');
            });

            document.querySelector('.ico-right').addEventListener('click',function(e){
                e.stopPropagation();
                hideControls();
                self.fontOption(this,'textRight');
            });
            document.querySelector('.ico-lineHeight').addEventListener('click',function(e){
                e.stopPropagation();
                hideControls();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
            });


            document.querySelector('.ico-color').addEventListener('click',function(e){
                e.stopPropagation();
                if(document.querySelector('.alert-color').style.display=='block'){
                    hideControls();
                }else{
                    hideControls();
                    document.querySelector('.alert-color').style.display='block';
                }
            });


            document.querySelector('.alert-color').addEventListener('click',function(e){
                e.stopPropagation();
            });

            self.bindSlider(document.querySelector('.alert-font-size .sys-slider-div'));

            document.querySelector('.ctrl-textDiv-editor').addEventListener('focus',function(){
                if(document.querySelector('.ctrl-textDiv')){
                    var cls=document.querySelector('.ctrl-textDiv').getAttribute('class');
                    cls=cls.replace('ctrl-textDiv-ex','');
                    document.querySelector('.ctrl-textDiv').setAttribute('class',cls);
                }

                var querys=document.querySelectorAll('.alert-hide');
                for(var i=0;i<querys.length;i++){
                    querys[i].style.display='none';
                }
            });
            document.querySelector('.ctrl-textDiv-editor').addEventListener('blur',changeTxt);
            document.querySelector('.ctrl-textDiv-editor').addEventListener('mousedown',changeTxt);
            document.querySelector('.ctrl-textDiv-editor').addEventListener('keyup',function(e){
                sc.ctrldom.querySelector('.cont-ctrl-box').innerHTML=document.querySelector('.ctrl-textDiv-editor').innerHTML;
            });
            function changeTxt(e){
                //console.log(this.selectionStart)
                //var newHtml='';
                //if(this.querySelector('article'))
                var t=this;
                if(this.querySelectorAll('z').length==0 && this.innerText!=''){
                    var newHtml='';
                    for(var i=0;i<this.innerText.length;i++){
                        newHtml+='<z>'+this.innerText[i]+'</z>';
                    }
                    if(!this.querySelector('article')){
                        this.innerHTML='<article></article>';
                    }
                    this.querySelector('article').innerHTML=newHtml;
                    return;
                }
                for(var i=0;i<this.querySelectorAll('z').length;i++){
                    var doms=this.querySelectorAll('z')[i];
                    var style=doms.getAttribute('style');
                    if(doms.innerText.length>1)
                    {
                        var domTxt=doms.innerText;
                        doms.insertAdjacentHTML('beforebegin', '<z style="'+style+'">'+domTxt[0]+'</z>');
                        doms.innerText=domTxt[1];
                        for(var j=2;j<domTxt.length;j++){
                            //newHtml+='<z style="'+style+'">'+domTxt[j]+'</z>';
                            doms.insertAdjacentHTML('afterend', '<z style="'+style+'">'+domTxt[j]+'</z>');
                        }
                        console.log(window.getSelection().getRangeAt(0));
                        window.getSelection().getRangeAt(0).setStart(this.querySelector('article'),i+2);
                    }else{
                        //newHtml+='<z style="'+style+'">'+doms.innerText+'</z>';
                    }
                }
                if(sc.ctrldom && sc.ctrldom.querySelector('.cont-ctrl-box')){
                    sc.ctrldom.querySelector('.cont-ctrl-box').innerHTML=document.querySelector('.ctrl-textDiv-editor').innerHTML;
                    if(sc.ctrl.Content!=document.querySelector('.ctrl-textDiv-editor').innerHTML)
                        sc.saveHistory([sc.ctrl.ind],[{Content:sc.ctrl.Content}]);
                    sc.ctrl.Content=document.querySelector('.ctrl-textDiv-editor').innerHTML;
                }
            }

            var cpFont=ColorPicker(document.querySelector('.alert-color'),function(hex, hsv, rgb) {
                //console.log(hsv.h, hsv.s, hsv.v);         // [0-359], [0-1], [0-1]
                //console.log(rgb.r, rgb.g, rgb.b);         // [0-255], [0-255], [0-255]
                document.querySelector('.ico-color').style.backgroundColor=hex;
                if(!self.firstColor){
                    self.fontOption(document.querySelector('.ico-color'),'color');
                        
                }
                self.firstColor=false;
                
              //document.body.style.backgroundColor = hex;        // #HEX
              //
              //
            });
            var color=document.querySelector('.ico-color').style.backgroundColor;
            if(color.indexOf('#')<0){
                var clist=color.split(',');
                //color='#'+clist[0].toString(16)+clist[1]+clist[2];
                var r=parseInt(clist[0].replace('rgb(','').replace('rgba(','')).toString(16);
                var g=parseInt(clist[1]).toString(16);
                var b=parseInt(clist[2]).toString(16);
                if(r.length==1)
                    r='0'+r;
                if(g.length==1)
                    g='0'+g;
                if(b.length==1)
                    b='0'+b;
                color='#'+r+g+b;

            }
            //cpFont.setHex();
            cpFont.setHex(color);

            function hideControls(){
                var cls=document.querySelector('.ctrl-textDiv').getAttribute('class');
                cls.replace('ctrl-textDiv-ex','');
                document.querySelector('.ctrl-textDiv').setAttribute('class',cls);
                document.querySelector('.alert-color').style.display='none';

            }
            //cpFont.setHex(document.querySelector('.ico-color').style.backgroundColor);

        },
        createCtrlOption:function(ctrl){
            var self=this;
            var reHtml='';
            for(var i=0;i<ctrl.length;i++){
                if(ctrl[i].type=='textDiv'){
                    reHtml+=self.textDiv(ctrl[i].name,ctrl[i].value,ctrl[i].color,ctrl[i].fontSize);
                }else if(ctrl[i].type=='colorBar'){
                    reHtml+='<div class="color-bar cp-default '+ctrl[i].name+'" ></div>';

                }else if(ctrl[i].type=='formBox'){
                    reHtml+=self.formDiv(ctrl[i].formObj);
                }
            }

            return reHtml;
        }

        

       
        //,
        // styleStr:function(str){
            
        // }

    }
}();

