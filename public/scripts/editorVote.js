function project(){
	var obj={
		id:_SCENEID,
		gid:_GAMEID,
		historyIndex:[-1],
		history:[[]],
		nowPage:0,
		init: function () {
			var self=this;
			this.getScene(function(data){
				self.data=data.Data;
				self.getPage();
				self.showPage(0);
				self.ctrlEvent();
				self.addCtrlEvent();
				self.pageEvent();
				self.optionEvent();
				self.uploadEvent();
				SYS.init();
			});
		},
		bindCtrlEvent:function(ctrl){
			var self=this;
			ctrl.addEventListener('mousedown',function(e){
				e.stopPropagation();
				if(this.getAttribute('cantMove')!='true')
					self.isMove=true;
				self.startX=e.clientX;
				self.startY=e.clientY;
				self.moveList=[this];
			});
			ctrl.querySelector('.ec-lt').addEventListener('mousedown',function(e){
				self.dropStart(this,e,'lt');
			});
			ctrl.querySelector('.ec-l').addEventListener('mousedown',function(e){
				self.dropStart(this,e,'l');
			});
			ctrl.querySelector('.ec-lb').addEventListener('mousedown',function(e){
				self.dropStart(this,e,'lb');
			});
			ctrl.querySelector('.ec-mt').addEventListener('mousedown',function(e){
				self.dropStart(this,e,'mt');
			});
			ctrl.querySelector('.ec-mb').addEventListener('mousedown',function(e){
				self.dropStart(this,e,'mb');
			});
			ctrl.querySelector('.ec-rt').addEventListener('mousedown',function(e){
				self.dropStart(this,e,'rt');
			});
			ctrl.querySelector('.ec-r').addEventListener('mousedown',function(e){
				self.dropStart(this,e,'r');
			});
			ctrl.querySelector('.ec-rb').addEventListener('mousedown',function(e){
				self.dropStart(this,e,'rb');
			});
		},
		bindAllCtrlEvent:function(){
			var ctrl=document.querySelectorAll('.ctrls');
			var self=this;
			var base={x:document.querySelector('.editor-phone').offsetLeft,y:document.querySelector('.editor-phone').offsetTop};
			for(var i=0;i<ctrl.length;i++){
				self.bindCtrlEvent(ctrl[i]);
			}
		},
		ctrlEvent:function(){
			var ctrl=document.querySelectorAll('.ctrls');
			var self=this;
			var base={x:document.querySelector('.editor-phone').offsetLeft,y:document.querySelector('.editor-phone').offsetTop};
			self.bindAllCtrlEvent();
			document.querySelector('body').addEventListener('click',function(e){
				document.querySelector('.editor-base-ex').setAttribute('class',document.querySelector('.editor-base-ex').getAttribute('class').replace(' editor-baseshow',''));
			});

			document.querySelector('.editor-base-ex').addEventListener('click', function (e) {
			    e.stopPropagation();
			});

			document.querySelector('.editor-body').addEventListener('mousedown',function(e){
				if(document.querySelector('.ctrlC')){
					document.querySelector('.ctrlC').setAttribute('class',document.querySelector('.ctrlC').getAttribute('class').replace(' ctrlC',''));
					self.ctrl=null;
					self.ctrldom=null;
					var css=document.querySelector('.editor-base').getAttribute('class');
					var css2=document.querySelector('.editor-base-ex').getAttribute('class');
					document.querySelector('.editor-base').setAttribute('class',css.replace(' editor-baseshow',''));
					document.querySelector('.editor-base-ex').setAttribute('class',css2.replace(' editor-baseshow',''));
				}
			});

			document.querySelector('.editor-body').addEventListener('mousemove',function(e){
				var x=e.clientX;
				var y=e.clientY;
				if(self.isMove){
					for(var j=0;j<self.moveList.length;j++){
						var _ctrl=self.moveList[j];
						var ctrlobj=self.findCtrl(_ctrl);
						_ctrl.style.left=ctrlobj.Style.Left+x-self.startX+'px';
						_ctrl.style.top=ctrlobj.Style.Top+y-self.startY+'px';
					}
				}
				//console.log(self.isDrop);
				if(self.isDrop){
					var x1=x-self.startX;
					var y1=y-self.startY;
					var hw=self.ctrl.Style.Height/self.ctrl.Style.Width;
					var w1=self.ctrl.Style.Width-x1;
					var h1=self.ctrl.Style.Height-y1;
					var w2=self.ctrl.Style.Width+x1;
					var h2=self.ctrl.Style.Height+y1;

					var y2=(x1)/hw;
					var x2=(y1)/hw;
					if(self.dropType=='lt'){
						if(h1<5 ||w1<5)
							return;
						self.ctrldom.style.left=self.ctrl.Style.Left+x2+'px';
						self.ctrldom.style.top=self.ctrl.Style.Top+y1+'px';
						self.ctrldom.style.width=self.ctrl.Style.Width-x2+'px';
						self.ctrldom.style.height=self.ctrl.Style.Height-y1+'px';
					}else if(self.dropType=='l'){
						if(w1<5)
							return;
						self.ctrldom.style.left=self.ctrl.Style.Left+x1+'px';
						self.ctrldom.style.width=self.ctrl.Style.Width-x1+'px';
					}else if(self.dropType=='lb'){
						if(w1<5 || h2<5)
							return;
						self.ctrldom.style.left=self.ctrl.Style.Left-x2+'px';
						self.ctrldom.style.width=self.ctrl.Style.Width+x2+'px';
						self.ctrldom.style.height=self.ctrl.Style.Height+y1+'px';
					}else if(self.dropType=='mt'){
						if(h1<5)
							return;
						self.ctrldom.style.top=self.ctrl.Style.Top+y1+'px';
						self.ctrldom.style.height=self.ctrl.Style.Height-y1+'px';
					}else if(self.dropType=='mb'){
						if(h2<5)
							return;
						self.ctrldom.style.height=self.ctrl.Style.Height+y1+'px';
					}else if(self.dropType=='rt'){
						if(h1<5 ||w2<5)
							return;
						self.ctrldom.style.top=self.ctrl.Style.Top+y1+'px';
						self.ctrldom.style.width=self.ctrl.Style.Width-x2+'px';
						self.ctrldom.style.height=self.ctrl.Style.Height-y1+'px';
					}else if(self.dropType=='r'){
						if(w2<5)
							return;
						self.ctrldom.style.width=self.ctrl.Style.Width+x1+'px';
					}else if(self.dropType=='rb'){
						if(h2<5 ||w2<5)
							return;
						self.ctrldom.style.width=self.ctrl.Style.Width+x2+'px';
						self.ctrldom.style.height=self.ctrl.Style.Height+y1+'px';
					}
					
				}
			});

			document.querySelector('.editor-body').addEventListener('mouseup',function(e){
				self.isMove=false;
				self.isDrop=false;

				if(!self.moveList)
					return;
				var history=[];
				var historyPro=[];

				// for(var j=0;j<self.moveList.length;j++){
				// 	var _ctrl=self.moveList[j];
				// 	var ctrlobj=self.findCtrl(_ctrl);
				// 	history.push(ctrlobj.ind);
				// 	var objs={Style:{Left:ctrlobj.Style.Left,Top:ctrlobj.Style.Top,Width:ctrlobj.Style.Width,Height:ctrlobj.Style.Height}};
				// 	historyPro.push(objs);
				// }
				var isChange=false;
				for(var j=0;j<self.moveList.length;j++){
					var _ctrl=self.moveList[j];
					var ctrlobj=self.findCtrl(_ctrl);
					history.push(ctrlobj.ind);
					var objs={Style:{Left:ctrlobj.Style.Left,Top:ctrlobj.Style.Top,Width:ctrlobj.Style.Width,Height:ctrlobj.Style.Height}};
					historyPro.push(objs);

					if(ctrlobj.Style.Left!=parseFloat(_ctrl.style.left)){
						//console.log(ctrlobj.Style.Left+' '+parseFloat(_ctrl.style.left));
						isChange=true;
					}
					ctrlobj.Style.Left=parseFloat(_ctrl.style.left);

					if(ctrlobj.Style.Top!=parseFloat(_ctrl.style.top)){
						//console.log(ctrlobj.Style.Top+' '+parseFloat(_ctrl.style.top));
						isChange=true;
					}
					ctrlobj.Style.Top=parseFloat(_ctrl.style.top);

					if(ctrlobj.Style.Width!=parseFloat(_ctrl.style.width)){
						//console.log(ctrlobj.Style.Width+' '+parseFloat(_ctrl.style.width));
						isChange=true;
					}
					ctrlobj.Style.Width=parseFloat(_ctrl.style.width);

					if(ctrlobj.Style.Height!=parseFloat(_ctrl.style.height)){
						//console.log(ctrlobj.Style.Height+' '+parseFloat(_ctrl.style.height));
						isChange=true;
					}
					ctrlobj.Style.Height=parseFloat(_ctrl.style.height);
					if(self.moveList.length==1 && j==0){
						//console.log(ctrlobj.ind+' -- '+self.ctrl.ind);
						if(!self.ctrl || self.ctrl.ind!=ctrlobj.ind){
							self.ctrl=ctrlobj;
							self.ctrldom=_ctrl;
							self.chooseCtrl();
						}
					}
				}
				if(isChange){
					self.saveHistory(history,historyPro);
					//self.history.push({ctrls:history,pros:historyPro});
					//
					//console.log('- -');
				}

				self.moveList=[];
				self.moveNow=false;
			});
		},
		optionEvent:function(){
		    var self = this;

		    var alist=document.querySelectorAll('.editor-play-option a');
		    for (var i = 0; i < alist.length; i++) {
		        alist[i].addEventListener('mousedown', function (e) {
		            e.stopPropagation();
		        });
		    }

			document.querySelector('.close-base-btn').addEventListener('click',function(e){
				var css=this.parentNode.getAttribute('class');
				this.parentNode.setAttribute('class',css.replace(' editor-baseshow',''));

			});

			document.querySelector('#prev-btn').addEventListener('click',function(e){
				var index=self.history[self.nowPage].length-1;
				if(index==-1 || self.historyIndex[self.nowPage]==-1)
					return;
				var nhis=null;
				index=self.historyIndex[self.nowPage];
				

				if(self.historyIndex[self.nowPage]+1==self.history[self.nowPage].length){
					nhis={ctrls:[],pros:[]};
				}

				var his=self.history[self.nowPage][index];
				self.prevOrNextCtrl(index,his,nhis);

			});
			
			document.querySelector('#next-btn').addEventListener('click',function(e){
				var index=self.historyIndex[self.nowPage]+2;
				if(index==-1 || index>self.history[self.nowPage].length-1){
					return;
				}
				var his=self.history[self.nowPage][index];
				self.prevOrNextCtrl(index,his,null);
			});

			document.querySelector('#config-btn').addEventListener('click', function (e) {
			    e.stopPropagation();
			    var html = '<h5 class="ctrl-info-title">全局配置</h5>';
			    html += '<ul class="global-config">';
			    html += '<li>' + (SYS.input('页面标题', 'webTitle', '请输入H5页面的标题', self.Setting.Title)) + '</li>';
			    html += '<li>' + (SYS.input('分享标题', 'webShareTitle', '请输入H5页面的分享标题', self.Setting.ShareTitle)) + '</li>';
			    html += '<li>' + SYS.textarea('分享内容', 'webShareText', '请输入分享内容', self.Setting.Remark) + '</li>';
			    html += '<li>' + (SYS.uploadBox('分享图标', 'shareImg', self.Setting.CoverUrl)) + '</li>';
			    html += '<li>' + (SYS.input('页面高度', 'webHeight', '设置当前页的总高度', '504', 'number')) + '</li>';
			    html += '<li style="text-align:center;"><input class="save-post-btn" type="button" value="保存发布"/></li>';
			    document.querySelector('.editor-base-ex').innerHTML = html;
			    document.querySelector('.editor-base-ex').setAttribute('class', document.querySelector('.editor-base-ex').getAttribute('class').replace(' editor-baseshow', '') + ' editor-baseshow');
			    self.configEvent();
			});

			document.querySelector('#zorderUp-btn').addEventListener('click', function (e) {
			    e.stopPropagation();
			    for (var i = 0; i < self.data.Pages[self.nowPage].Elements.length; i++) {
			        var ctrlNow = self.data.Pages[self.nowPage].Elements[i];
			        if (ctrlNow == self.ctrl) {
			            //console.log('this right');
			            self.getZindex(i, 'up');
			            break;
			        }
			    }
			    
			});

			document.querySelector('#zorderDown-btn').addEventListener('click', function (e) {
			    e.stopPropagation();
			    for (var i = 0; i < self.data.Pages[self.nowPage].Elements.length; i++) {
			        var ctrlNow = self.data.Pages[self.nowPage].Elements[i];
			        if (ctrlNow == self.ctrl) {
			            //console.log('this right');
			            self.getZindex(i, 'down');
			            break;
			        }
			    }

			});

			document.querySelector('#zorderTop-btn').addEventListener('click', function (e) {
			    e.stopPropagation();
			    for (var i = 0; i < self.data.Pages[self.nowPage].Elements.length; i++) {
			        var ctrlNow = self.data.Pages[self.nowPage].Elements[i];
			        if (ctrlNow == self.ctrl) {
			            //console.log('this right');
			            self.getZindex(i, 'top');
			            break;
			        }
			    }

			});

			document.querySelector('#zorderBottom-btn').addEventListener('click', function (e) {
			    e.stopPropagation();
			    for (var i = 0; i < self.data.Pages[self.nowPage].Elements.length; i++) {
			        var ctrlNow = self.data.Pages[self.nowPage].Elements[i];
			        if (ctrlNow == self.ctrl) {
			            //console.log('this right');
			            self.getZindex(i, 'bottom');
			            break;
			        }
			    }

			});

			document.querySelector('#delete-btn').addEventListener('click', function (e) {
			    e.stopPropagation();

			    self.saveHistory([self.ctrl.ind], [{ Delete: false }]);
			    self.ctrl.Delete = true;
			    self.ctrldom.style.display = 'none';
                
			    self.ctrl = undefined;
			    self.ctrldom = undefined;
			});

			
		},
		getZindex: function (curIndex, str) {
		    
		    var history = [];
		    var historyPro = [];

		    var ctrls = this.data.Pages[this.nowPage].Elements;
		    var zlist = [];
		    var zlistIndex = [];
		    var zlistIndex2 = [];
		    for (var i = 1; i < ctrls.length; i++) {
		        history.push(ctrls[i].ind);
		        historyPro.push({ Style: { ZIndex: ctrls[i].Style.ZIndex } });
		        zlist.push(ctrls[i].Style.ZIndex);
		        zlistIndex.push(i);
		        zlistIndex2.push(i);
		    }

		    this.saveHistory(history, historyPro);
		    var minZ = 0;
		    var minZIndex = 0;

            
		    for (var i = 0; i < zlist.length; i++) {
		        for (var j = i + 1; j < zlist.length; j++) {
		            if (zlist[i] > zlist[j]) {
		                minZ = zlist[i];
		                zlist[i] = zlist[j];
		                zlist[j] = minZ;
		                minZIndex = zlistIndex[i];
		                zlistIndex[i] = zlistIndex[j];
		                zlistIndex[j] = minZIndex;


		                zlistIndex2[i] = zlistIndex[i];
		                zlistIndex2[j] = zlistIndex[j];
		                
		            }

		        }
		    }


		    var curI = 999;
		    var nowIndex = -1;
		    for (var i = 0; i < zlistIndex.length; i++) {
		        var index = zlistIndex2[i];
		        if (str == 'top') {
		            if (curIndex == index) {
		                nowIndex = 0;
		            }
		        }
		        if (str == 'bottom' && nowIndex==-1) {
		            if (i == 0) {
		                curI = zlistIndex[i];
		                zlistIndex[i] = curIndex;
		            } else {
		                var curI2 = curI;
		                curI = zlistIndex[i];
		                zlistIndex[i] = curI2;
		            }
		            if (curIndex == index) {
		                nowIndex = 0;
		            }
		        } else if (str == 'top' && nowIndex==0) {
		            if (i == zlist.length - 1) {
		                zlistIndex[i] = curIndex;
		            } else {
		                zlistIndex[i] = zlistIndex[i + 1];
		            }


		        } else {
		            if (curIndex == index) {
		                curI = i;
		                if (str == 'up' && i + 1 < zlist.length) {
		                    var curI2 = zlistIndex[i];
		                    zlistIndex[i] = zlistIndex[i + 1];
		                    zlistIndex[i + 1] = curI2;
		                    break;
		                } else if (str == 'down' && i > 0) {
		                    var indexC = zlistIndex[i];
		                    zlistIndex[i] = zlistIndex[i - 1];
		                    zlistIndex[i - 1] = indexC;
		                    break;
		                }
		            }
		        }
		    }
		    for (var i = 0; i < zlistIndex.length; i++) {
		        this.data.Pages[this.nowPage].Elements[zlistIndex[i]].Style.ZIndex = i;
		        document.querySelector('#ctrl_' + this.nowPage + '_' + zlistIndex[i]).style.zIndex=i;
		    }

		},
		configEvent: function () {
		    var self = this;
		    document.querySelector('.webHeight input').addEventListener('keyup', function (e) {
		        console.log(this.value);
		        document.querySelector('.editor-dom').style.height = this.value + 'px';
		    });

		    document.querySelector(".save-post-btn").addEventListener('click', function (e) {
		        self.saveScene();
		    });
		},
		prevOrNextCtrl:function(index,his,nhis){
			var self=this;
			for(var i=0;i<his.ctrls.length;i++){
					var ind=his.ctrls[i];
					var pageInd=ind.split('_')[0];
					var ctrlInd=ind.split('_')[1];
					var thisctrl=self.data.Pages[pageInd].Elements[ctrlInd];
					var thisctrldom=document.querySelector('#ctrl_'+ind);
					if(nhis){
						nhis.ctrls.push(ind);
					}
					var nhisPro={};
					var pro=his.pros[i];
					for(var j=0;j<Object.keys(pro).length;j++){
						var key=Object.keys(pro)[j];
						var value=pro[key];
						if(typeof pro[key]=='object'){
							if(nhis){
								nhisPro[key]={};
							}

							for(var k=0;k<Object.keys(pro[key]).length;k++){
								var key2=Object.keys(pro[key])[k];

								var value2=pro[key][key2];
								if(nhis)
									nhisPro[key][key2]=thisctrl[key][key2];
								thisctrl[key][key2]=value2;
								if(key=='Style'){
									var styleKey=key2[0].toLowerCase()+key2.replace(key2[0],'');
									var unit='px';
									var noPxCss='borderColorborderStyleColorbackgroundzIndex';
									if(typeof value2!='number' || noPxCss.indexOf(styleKey)>-1){
										unit='';
									}
									console.log(styleKey);
									if(thisctrl.Type==6 || thisctrl.Type==7){
										console.log(thisctrldom.querySelector('input').style[styleKey]);
										thisctrldom.querySelector('input').style[styleKey]=value2+unit;
									}else{
										thisctrldom.style[styleKey]=value2+unit;
									}
									

								}
								if(key=='Property'){
									if(key2=='Src'){
										thisctrldom.querySelector('img').src=value2;
									}
								}
							}
						}else{
							if(nhis)
								nhisPro[key]=thisctrl[key];
							thisctrl[key]=value;
							if(key=='Content'){
								thisctrldom.querySelector('.cont-ctrl-box').innerHTML=value;
							}
						}
						if(nhis)
							nhis.pros.push(nhisPro);
					}
					if(nhis){
						self.history[self.nowPage].push(nhis);
					}
					self.historyIndex[self.nowPage]=index-1;

				}
		},
		uploadEvent:function(){
			var self=this;
		 	var zupload=new ZUpload({
				before:function(t,callback){
					//上传操作前执行的方法，可不设置，如果设置，请执行callback()
					
					callback();
				},
				url:'http://test.123zou.com/Api/UploadApi/Photo/?isMaterial=0&maxQuality=96',//动态赋值
				dom:'#uploadBtn',//要点击上传的file文件框
				success:function(data){

					if(data[0].Success){
						var dat=data[0].Data;
						if(!sc.bgEditor){
							self.saveHistory([self.ctrl.ind],[{Property:{Src:self.ctrl.Property.Src}}]);
							//self.history.push({ctrls:[self.ctrl.ind],pros:[{Property:{Src:self.ctrl.Property.Src}}]})
							self.ctrldom.querySelector('img').src=data[0].Data.Url;
							self.ctrl.Property.Src=data[0].Data.Url;
						}else{
							//self.saveHistory('bg',{'BackgroundImage':self.data.Pages[self.nowPage].Elements[0].Property.BackgroundImage});
							self.data.Pages[self.nowPage].Elements[0].Property.BackgroundImage='url('+data[0].Data.Url+')';
							document.querySelector('.editor-dom').style.backgroundImage = 'url(' + data[0].Data.Url + ')';
							document.querySelector('.editor-dom').style.backgroundRepeat = 'no-repeat';
						}
					}
					//上传完成后执行的操作
				},
				progress:function(data){
					//未实现
				},
				error:function(err){
					//出现异常时执行的操作
				}
			});
		},
		formOptionEvent:function(){
			var self=this;
			document.querySelector('.ctrl-option-detail .formName input').addEventListener('keyup',function(e){
				self.ctrl.Property.Name=document.querySelector('.ctrl-option-detail .formName input').value;
			});

			document.querySelector('.ctrl-option-detail .formTitle input').addEventListener('keyup',function(e){
				self.ctrl.Content=document.querySelector('.ctrl-option-detail .formTitle input').value;
				self.ctrldom.querySelector('textarea').setAttribute('placeholder',self.ctrl.Content)
			});
			document.querySelector('.ctrl-option-detail .formCheck input').addEventListener('click',function(e){
				var cls=this.getAttribute('class');
				var v=false;
				if(cls.indexOf('check-true')>-1){
					v=true;
					this.setAttribute('class',cls.replace('check-true','check-false'));
				}else{
					this.setAttribute('class',cls.replace('check-false','check-true'));
				}
				self.ctrl.Property.IsNull=v;
			});
			document.querySelector('.ctrl-option-detail .formAlign span').addEventListener('click',function(e){
				this.parentNode.querySelector('.select-option').style.display='block';
			});
			var plist=document.querySelectorAll('.formAlign .select-option p');
			for(var i=0;i<plist.length;i++){
				plist[i].addEventListener('click',function(e){
					var v=this.getAttribute('v');
					var o=this.innerText;
					document.querySelector('.formAlign span').setAttribute('v',v);
					document.querySelector('.formAlign span').innerText=o;
					this.parentNode.style.display='none';
					self.ctrldom.style.textAlign=v;
					self.ctrl.Style.textAlign=v;
				});
			}
		},
		formOptionEvent2:function(){
			var self=this;
			document.querySelector('.ctrl-option-detail .submitName input').addEventListener('keyup',function(e){
				self.ctrl.Content=document.querySelector('.ctrl-option-detail .submitName input').value;
				self.ctrldom.querySelector('input').value=self.ctrl.Content;
			});

			document.querySelector('.ctrl-option-detail .submitBg span').addEventListener('click',function(e){
				//console.log(this.parentNode.querySelector('.hide-colorBar'))
				var thisDom=this;
				self.saveHistory([self.ctrl.ind],[{Style:{BackgroundColor:self.ctrl.Style.BackgroundColor}}]);
				var cpForm=ColorPicker(this.parentNode.querySelector('.hide-colorBar'),function(hex,hsv,rgb){
					thisDom.style.backgroundColor=hex;
					thisDom.parentNode.querySelector('input').value=hex;
					thisDom.parentNode.querySelector('.hide-colorBar').style.display='block';
					self.ctrldom.querySelector('input').style.backgroundColor=hex;
					self.ctrl.Style.BackgroundColor=hex;
					SYS.nowColor=thisDom.parentNode.querySelector('.hide-colorBar');
				});
				var color=thisDom.parentNode.querySelector('input').value;
				cpForm.setHex(color);
				this.parentNode.querySelector('.hide-colorBar').style.display='block';
				e.stopPropagation();
			});
			document.querySelector('.ctrl-option-detail .submitColor span').addEventListener('click',function(e){
				var thisDom=this;
				self.saveHistory([self.ctrl.ind],[{Style:{Color:self.ctrl.Style.Color}}]);
				var cpForm=ColorPicker(this.parentNode.querySelector('.hide-colorBar'),function(hex,hsv,rgb){
					thisDom.style.backgroundColor=hex;
					thisDom.parentNode.querySelector('input').value=hex;
					thisDom.parentNode.querySelector('.hide-colorBar').style.display='block';
					SYS.nowColor=thisDom.parentNode.querySelector('.hide-colorBar');
					self.ctrldom.querySelector('input').style.color=hex;
					self.ctrl.Style.Color=hex;
				});
				var color=thisDom.parentNode.querySelector('input').value;
				cpForm.setHex(color);
				this.parentNode.querySelector('.hide-colorBar').style.display='block';
				e.stopPropagation();
			});
		},
		voteOptionEvent:function(){
			var self=this;
			document.querySelector('.ctrl-option-detail .votePage span').addEventListener('click',function(e){
				this.parentNode.querySelector('.select-option').style.display='block';
			});

			var plist=document.querySelectorAll('.votePage .select-option p');
			for(var i=0;i<plist.length;i++){
				plist[i].addEventListener('click',function(e){
					var v=this.getAttribute('v');
					var o=this.innerText;
					document.querySelector('.votePage span').setAttribute('v',v);
					document.querySelector('.votePage span').innerText=o;
					this.parentNode.style.display='none';
					var iframe=document.getElementById('iframe-vote').contentWindow.document;
					for(var j=0;j<iframe.querySelectorAll('nav').length;j++){
						iframe.querySelectorAll('nav')[j].style.display='none';
					}
					iframe.querySelectorAll('nav')[parseInt(v)].style.display='block';
					//self.ctrldom.style.textAlign=v;
					//self.ctrl.Style.textAlign=v;
				});
			}

			document.querySelector('.ctrl-option-detail .mainColor span').addEventListener('click',function(e){
				var thisDom=this;
				self.saveHistory([self.ctrl.ind],[{Style:{Color:self.ctrl.Style.Color}}]);
				var cpForm=ColorPicker(this.parentNode.querySelector('.hide-colorBar'),function(hex,hsv,rgb){
					thisDom.style.backgroundColor=hex;
					thisDom.parentNode.querySelector('input').value=hex;
					thisDom.parentNode.querySelector('.hide-colorBar').style.display='block';
					SYS.nowColor=thisDom.parentNode.querySelector('.hide-colorBar');
					//self.ctrldom.querySelector('input').style.color=hex;
					//self.ctrl.Style.Color=hex;
				});
				var color=thisDom.parentNode.querySelector('input').value;
				cpForm.setHex(color);
				this.parentNode.querySelector('.hide-colorBar').style.display='block';
				e.stopPropagation();
			});

			document.querySelector('.ctrl-option-detail .baseColor span').addEventListener('click',function(e){
				var thisDom=this;
				self.saveHistory([self.ctrl.ind],[{Style:{Color:self.ctrl.Style.Color}}]);
				var cpForm=ColorPicker(this.parentNode.querySelector('.hide-colorBar'),function(hex,hsv,rgb){
					thisDom.style.backgroundColor=hex;
					thisDom.parentNode.querySelector('input').value=hex;
					thisDom.parentNode.querySelector('.hide-colorBar').style.display='block';
					SYS.nowColor=thisDom.parentNode.querySelector('.hide-colorBar');
					//self.ctrldom.querySelector('input').style.color=hex;
					//self.ctrl.Style.Color=hex;
				});
				var color=thisDom.parentNode.querySelector('input').value;
				cpForm.setHex(color);
				this.parentNode.querySelector('.hide-colorBar').style.display='block';
				e.stopPropagation();
			});

		},
		pageEvent:function(){
			var self=this;
			var pagesDom=document.querySelectorAll('.page-btn-box>li');
			for(var i=0;i<pagesDom.length;i++){
				var p=pagesDom[i];
				p.index=i;
				p.addEventListener('click',function(e){
					for(var j=0;j<pagesDom.length;j++){
						var _css=pagesDom[j].getAttribute('class').replace('c','').replace(' ','');
						pagesDom[j].setAttribute('class',_css+'');
					}
					var css=this.getAttribute('class').replace('c','').replace(' ','');
					this.setAttribute('class',css+' c');
					self.nowPage=this.index;
					document.querySelector('.editor-dom').innerHTML='';
					self.showPage(self.nowPage);
					self.bindAllCtrlEvent();
				});
			}
		},
		addCtrlEvent:function(){
			var self=this;
			document.querySelector('#add_txt').addEventListener('click',function(e){
				sc.bgEditor=false;
				self.initNewCtrl(2);
			});
			document.querySelector('#add_img').addEventListener('click',function(e){
				sc.bgEditor=false;
				self.initNewCtrl(3);
			});

			document.querySelector('#add_bg').addEventListener('click',function(e){
				document.querySelector('.upload-box').style.display='none';
				document.querySelector('.elseoption-box').innerHTML='';
				document.querySelector('.upload-box').style.display='block';
				document.querySelector('.editor-base').setAttribute('class',document.querySelector('.editor-base').getAttribute('class').replace(' editor-baseshow','')+' editor-baseshow');
				var controls=[];
				controls.push({
					name:'bgcolor',
					type:'colorBar',
					value:'',
					color:''
				});
				document.querySelector('.elseoption-box').innerHTML=(SYS.createCtrlOption(controls));
				ColorPicker(document.querySelector('.color-bar'),function(hex, hsv, rgb) {
					self.data.Pages[self.nowPage].Elements[0].Property.BackgroundColor=hex;
					document.querySelector('.editor-dom').style.backgroundColor = hex;
					
				});
				sc.ctrl=null;
				sc.ctrldom=null;
				sc.bgEditor=true;
			});

			document.querySelector('#add_form').addEventListener('click',function(e){
				//sc.bgEditor=false;
				//self.initNewCtrl(6);
				e.stopPropagation();
				var html='<h5 class="ctrl-info-title">表单选项</h5>';
				html+='<ul class="form-list-choose">';
				html+='<li>完整表单</li>';
				html+='<li>输入框</li>';
				html+='<li>选择框</li>';
				html+='<li>提交按钮</li>';
				html+='</ul>';
				document.querySelector('.editor-base-ex').innerHTML=html;
				document.querySelector('.editor-base-ex').setAttribute('class',document.querySelector('.editor-base-ex').getAttribute('class').replace(' editor-baseshow','')+' editor-baseshow');
				var ullist=document.querySelectorAll('.form-list-choose li');
				ullist[0].addEventListener('click',function(e){
					e.stopPropagation();
					document.querySelector('.editor-base-ex').setAttribute('class',document.querySelector('.editor-base-ex').getAttribute('class').replace(' editor-baseshow',''));
					self.initNewCtrl(6,{Top:100,Left:50,Property:{Name:'姓名',Title:'请输入姓名',IsNull:false}});
					self.initNewCtrl(6,{Top:150,Left:50,Property:{Name:'电话',Title:'请输入电话号码',IsNull:false}});
					self.initNewCtrl(7,{Top:200,Left:50});
					//self.initNewCtrl(54,{Top:150,Left:50,Property:{Name:'性别',Title:'请选择性别',IsNull:false}});
					//self.initNewCtrl(7,{Top:150,Left:50});
				});
			});

			document.querySelector('#add_vote').addEventListener('click',function(e){
				e.stopPropagation();
				var html='<h5 class="ctrl-info-title">投票选项</h5>';
				html+='<ul class="vote-list-choose">';
				html+='<li>第一个投票活动</li>';
				html+='</ul>';
				document.querySelector('.editor-base-ex').innerHTML=html;
				document.querySelector('.editor-base-ex').setAttribute('class',document.querySelector('.editor-base-ex').getAttribute('class').replace(' editor-baseshow','')+' editor-baseshow');
				var html='<h5 class="ctrl-info-title">投票选项</h5>';
				var ulist=document.querySelectorAll('.vote-list-choose li');
				ulist[0].addEventListener('click',function(e){
					e.stopPropagation();
					document.querySelector('.editor-base-ex').setAttribute('class',document.querySelector('.editor-base-ex').getAttribute('class').replace(' editor-baseshow',''));
					var voteJson={
						Url:'/voteModule/vote1.html',
						MainColor:'#ef4141',
						BaseColor:'#ffffff',
						Title:'抗日英雄评选赛',
						StartTime:'2016-1-1',
						EndTime:'2018-1-1',
						Cover:'/voteModule/img/krtitle.jpg',
						DayTime:1,
						Content:'活动规则在此'
					};
					self.initNewCtrl(54,{Top:0,Left:0,Width:320,Height:504,Property:{Type:10,Values:voteJson}});
				});

			});
		},
		initNewCtrl:function(type,base){
			var self=this;
			if(!base)
				base={};
			var nctrl=new Object();
			nctrl={
				Style:{
					Height:(base.Height!=undefined)?base.Height:200,
					Width:(base.Width!=undefined)?base.Width:200,
					Top:(base.Top!=undefined)?base.Top:150,
					Left:(base.Left!=undefined)?base.Left:150,
					ZIndex:0,
					Opacity:1,
					BorderColor:'rgba(0,0,0,0)',
					BorderWidth:1,
					BorderStyle:'none',
					Color:'#333',
					LineHeight:0,
				},
				Type:type,
				Property:{},
				ctrlInd:self.data.Pages[self.nowPage].Elements.length,
				pageInd:self.nowPage,
				ind:self.nowPage+'_'+self.data.Pages[self.nowPage].Elements.length
			}
			nctrl.Style.TextAlign='center';

			if(type==2){
				nctrl.Content='<article style="text-align:center;font-size:0.15rem;"><z>请</z><z>输</z><z>入</z><z>文</z><z>字</z></article>';
				nctrl.Style.Height=30;
			}
			if(type==3){
				nctrl.Property.Src='/images/new_image.jpg';
			}

			if(type==6){
				nctrl.Style.Width=250;
				nctrl.Style.Height=30;
				nctrl.Style.BorderColor='#CCCCCC';
				nctrl.Style.BorderWidth=1;
				nctrl.Style.BorderStyle='solid';
				nctrl.Content=base.Property.Title;
				nctrl.Property.Name=base.Property.Name;
			}

			if(type==7){
				nctrl.Style.Width=250;
				nctrl.Style.Height=30;
				nctrl.Style.BackgroundColor='#00B7EE';
				nctrl.Content='提交';
				nctrl.Style.Color='#FFFFFF';
			}
			if(type==54){
				nctrl.Content='';
				nctrl.Property.Type=base.Property.Type;
				nctrl.Property.Values=base.Property.Values;
				nctrl.Class='cantMove';
			}
			self.data.Pages[self.nowPage].Elements.push(nctrl);
			self.showCtrl(nctrl);
			self.ctrl=nctrl;
			self.ctrldom=document.querySelector('#ctrl_'+nctrl.ind);
			self.loadImg(self.ctrl);
			self.chooseCtrl();
			self.bindAllCtrlEvent();
		},
		dropStart:function(target,e,droptype){
			var self=this;
			e.stopPropagation();
			if(target.getAttribute('cantMove')=='true')
				return;
			self.isDrop = true;
			console.log(self.isDrop);
			self.startX=e.clientX;
			self.startY=e.clientY;
			self.dropType=droptype;
			self.moveList=[self.ctrldom];
		},
		chooseCtrl:function(){
			var self=this;

			for(var i=0;i<document.querySelectorAll('.ctrls').length;i++){
				document.querySelectorAll('.ctrls')[i].setAttribute('class',document.querySelectorAll('.ctrls')[i].getAttribute('class').replace('ctrlC',''));
			}
			var cls=self.ctrldom.getAttribute('class');
			self.ctrldom.setAttribute('class',cls+=' ctrlC');

			document.querySelector('.upload-box').style.display='none';
			document.querySelector('.elseoption-box').innerHTML='';
			document.querySelector('.editor-base-ex').setAttribute('class',document.querySelector('.editor-base-ex').getAttribute('class').replace(' editor-baseshow',''));
			document.querySelector('.editor-base').setAttribute('class',document.querySelector('.editor-base').getAttribute('class').replace(' editor-baseshow','')+' editor-baseshow');
			if(self.ctrl.Type==2){
				var controls=[];
				controls.push({
					name:'Content',
					type:'textDiv',
					value:self.ctrl.Content,
					color:self.ctrl.Style.Color
				});
				SYS.firstColor=true;
				document.querySelector('.ctrl-info-title').innerText='文字编辑';
				document.querySelector('.elseoption-box').innerHTML=(SYS.createCtrlOption(controls));
				SYS.fontEvent();
				if(self.ctrl.Content!=document.querySelector('.ctrl-textDiv-editor').innerHTML)
                       self.saveHistory([self.ctrl.ind],[{Content:self.ctrl.Content}]);
			}else if(self.ctrl.Type==3){
				document.querySelector('.ctrl-info-title').innerText='图片编辑';
				document.querySelector('.upload-box').style.display='block';
			}else if(self.ctrl.Type==6){
				document.querySelector('.ctrl-info-title').innerText='表单编辑';
				var controls=[];
				document.querySelector('.elseoption-box').innerHTML=(SYS.input('名称','formName','请输入要提交的表单名',self.ctrl.Property.Name));
				document.querySelector('.elseoption-box').innerHTML+=(SYS.input('说明','formTitle','请输入用户输入框的说明',self.ctrl.Content));
				document.querySelector('.elseoption-box').innerHTML+=(SYS.checkbox('必填','formCheck','请输入用户输入框的说明'));
				document.querySelector('.elseoption-box').innerHTML+=(SYS.select('对齐方式','formAlign',['left','center','right'],['左对齐','居中','右对齐']));
				self.formOptionEvent();
			}else if(self.ctrl.Type==7){
				document.querySelector('.ctrl-info-title').innerText='表单编辑';
				document.querySelector('.elseoption-box').innerHTML+=(SYS.input('名称','submitName','提交按钮文本',self.ctrl.Content));
				document.querySelector('.elseoption-box').innerHTML+=(SYS.colorBar('背景颜色','submitBg',self.ctrl.Style.BackgroundColor));
				document.querySelector('.elseoption-box').innerHTML+=(SYS.colorBar('字体颜色','submitColor',self.ctrl.Style.Color));
				self.formOptionEvent2();
			}else if(self.ctrl.Type==54){
				if(self.ctrl.Property.Type==10){
					/*投票器*/
					document.querySelector('.ctrl-info-title').innerText='投票编辑';
					document.querySelector('.elseoption-box').innerHTML+=(SYS.select('编辑页','votePage',['0','1','2','3','4'],['首页','报名页','排行页','活动说明页面','详情页']));
					document.querySelector('.elseoption-box').innerHTML+=(SYS.colorBar('主色调','mainColor',self.ctrl.Property.Values.MainColor));
					document.querySelector('.elseoption-box').innerHTML+=(SYS.colorBar('基色调','baseColor',self.ctrl.Property.Values.BaseColor));
					document.querySelector('.elseoption-box').innerHTML+=(SYS.input('活动标题','voteTitle','请输入活动标题',self.ctrl.Property.Values.Title));
					document.querySelector('.elseoption-box').innerHTML+=(SYS.uploadBox('封面','voteImg',''));;
					document.querySelector('.elseoption-box').innerHTML+=(SYS.input('开始时间','voteStart','请输入活动开始时间',self.ctrl.Property.Values.StartTime,'date'));
					document.querySelector('.elseoption-box').innerHTML+=(SYS.input('结束时间','voteEnd','请输入活动结束时间',self.ctrl.Property.Values.EndTime,'date'));
					document.querySelector('.elseoption-box').innerHTML+=(SYS.input('每日可投','voteEnd','0为仅允许一次投票',self.ctrl.Property.Values.DayTime,'number'));
					document.querySelector('.elseoption-box').innerHTML+=(SYS.textarea('活动规则','voteEnd','活动规则说明',self.ctrl.Property.Values.Content));
					self.voteOptionEvent();
				}
			}
		},
		findCtrl:function(dom){
			var self=this;
			var pageInd=dom.getAttribute('pageind');
			var ctrlInd=dom.getAttribute('ctrlind');
			var ctrlobj=self.data.Pages[pageInd].Elements[ctrlInd];
			return ctrlobj;
		},
		getScene: function (callback) {
		    var self = this;
            

			var url='/Api/SceneApi/GetScene/?ID='+self.id;
			SYS.AJAX(url, 'GET', {}, function (data) {
			    var url2 = 'Api/SceneApi/GetSetting/?ID=' + self.id;
			    SYS.AJAX(url2, 'GET', {}, function (data2) {
			        self.Setting = data2.Data;
			        callback(data);
			    });

			});
		},
		getPage:function(){
			var self=this;
			var html='';
			for(var i=0;i<self.data.Pages.length;i++){
				var chooseNum='';
				if(i==0){
					chooseNum+='c';
				}
				html+='<li class="'+chooseNum+' page-btn">第'+(i+1)+'页</li>';
			}
			document.querySelector('.page-btn-box').innerHTML=html;
		},
		saveScene: function () {
		    var self = this;
            
		    save_page(self.data.Pages, 0);


		    function save_page(pages, index) {
		        var url = '/Api/SceneApi/SavePage/';
		        if (pages.length <= index) {
		            save_setting();
		            return;
		        }
		        SYS.AJAX(url, 'POST', pages[index], function (data) {
		            index++;
                    save_page(pages,index)
		        })
		    }

		    function save_setting() {
		        var url = '/Api/SceneApi/SaveSetting/';
		        var json=self.Setting;
		        SYS.AJAX(url, 'POST', json, function (data) {

		        });

		    }
		},
		showPage:function(index){
			var self=this;
			var nowpage=self.data.Pages[index];
			var ctrlArray=self.data.Pages[index].Elements;
			for(var i=0;i<ctrlArray.length;i++){
				ctrlArray[i].pageInd=index;
				ctrlArray[i].ctrlInd=i;
				ctrlArray[i].ind=index+'_'+i;
				self.showCtrl(ctrlArray[i]);
			}
			for(var i=0;i<ctrlArray.length;i++){
				self.loadImg(ctrlArray[i]);
			}
		},
		loadImg:function(ctrl){
			if(ctrl.Type!=3)
				return;
			//var dom=document.querySelector('.ctrl_'+ctrlArray[i].ind);
			var imgDom=document.querySelector('#ctrl_'+ctrl.ind+' img');
			var img=new Image();
			img.src=imgDom.getAttribute('load_src');
			img.onload=function(){
				imgDom.src=img.src;
				ctrl.imgs=img;
				var hw=img.height/img.width;
				if(ctrl.Style.Height/ctrl.Style.Width>hw){
					imgDom.setAttribute('class','imgH');
				}else{
					imgDom.setAttribute('class','imgW');
				}
			}
			//imgDom.setAttribute('')							
		},
		showCtrl:function(obj){
		    var html = '';
		    if (obj.Delete) {
		        return;
		    }
			if(obj.Type==1){
			    //html+='<div  class="scendBg" style="width:320px;height:504px;z-index:0;background:'+(obj.Property.BackgroundImage).replace('"','').replace('"','')+';"></div>';
			    document.querySelector('.editor-dom').style.background = (obj.Property.BackgroundImage).replace('"', '').replace('"', '');
			    document.querySelector('.editor-dom').style.backgroundAttachment = 'fixed';
			    document.querySelector('.editor-dom').style.backgroundPosition = 'center center ';
			}else{
				var cantMove=false;
				if(obj.Class && obj.Class=='cantMove')
					cantMove=true;
				html+='<div draggable="false" cantMove="'+cantMove+'" class="ctrls" id="ctrl_'+obj.ind+'" pageInd="'+obj.pageInd+'" ctrlInd="'+obj.ctrlInd+'"';
				html+=' style="';
				html+='background:'+obj.Style.BackgroundColor+';'
				html+='width:'+obj.Style.Width+'px;';
				html+='height:'+obj.Style.Height+'px;';
				html+='top:'+obj.Style.Top+'px;';
				html+='left:'+obj.Style.Left+'px;';
				html+='z-index:'+obj.Style.ZIndex+';';
				html+='opacity:'+obj.Style.Opacity+';';
				html+='border-color:'+obj.Style.BorderColor+';';
				html+='border-style:'+obj.Style.BorderStyle+';';
				html+='border-width:'+obj.Style.BorderWidth+'px;';
				html+='color:'+obj.Style.Color+';';
				if(obj.Style.LineHeight==0)
					html+='line-height:30px;';
				else
					html+='line-height:'+obj.Style.LineHeight+'px;';
				html+='" >';
				html+='<div class="cont-ctrl-box">';
				if(obj.Type==2){
					html+=obj.Content;
				}
				if(obj.Type==3){
					html+='<img draggable="false" load_src="'+obj.Property.Src+'" /*style="height:'+obj.Style.Height+'px;width:'+obj.Style.Width+'px;*/"/>';
				}
				if(obj.Type==6){
					html+='<textarea style="text-align: inherit;border: 0px none #000;width:100%;height:100%;line-height:30px;resize: none;box-sizing:border-box;overflow:hidden;" name="'+obj.Property.Name+'" placeholder="'+obj.Content+'"></textarea>';
				}
				if(obj.Type==7){
					html+='<input value="'+obj.Content+'" style="width:100%;height:100%;border:0px solid rgba(0,0,0,0);line-height:30px;resize: none;box-sizing:border-box;overflow:hidden;background-color:'+obj.Style.BackgroundColor+';color:'+obj.Style.Color+'" type="button" />';
				}
				if(obj.Type==54){
					if(obj.Property.Type==10){
						html+='<iframe id="iframe-vote" scrolling="yes" style="width:'+obj.Style.Width+'px;height:'+obj.Style.Height+'px;pointer-events:none;" src="'+obj.Property.Values.Url+'?onlyShow=true"></iframe>';
					}
				}
				html+='</div>';
				html+='<div class="edit-ctrl-box"><span class="ec-l"></span><span class="ec-lt"></span><span class="ec-lb"></span><span class="ec-mt"></span><span class="ec-mb"></span><span class="ec-r"></span><span class="ec-rt"></span><span class="ec-rb"></span></div>';
				html+='</div>';
			}
			

			//console.log(html);
			document.querySelector('.editor-dom').innerHTML+=html;
		},
		showAnimate:function(obj){
		},
		saveHistory:function(ind,pro){
			var self=this;
			var pageIndex=self.nowPage;
			if(pageIndex+1>self.history.length){
				for(var i=self.history.length;i<pageIndex+1;i++){
					self.historyIndex.push(-1);
					self.history.push([]);
				}
			}
			self.historyIndex[self.nowPage]++;
			if(self.history[self.nowPage].length>self.historyIndex[self.nowPage]){
				var history=self.history[self.nowPage];
				self.history[self.nowPage]=[];
				for(var i=0;i<self.historyIndex[self.nowPage];i++){
					self.history[self.nowPage].push(history[i]);
				}
			}
			self.history[self.nowPage].push({ctrls:ind,pros:pro});
		}
	}
	obj.init();
	return obj;
};


var sc = new project();


