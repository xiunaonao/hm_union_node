


function ZUpload(obj){
	var zobj={
		url:obj.url,
		dom:obj.dom,
		iscut: obj.iscut,
        mul:obj.mul,
		success: obj.success,
        error:obj.error

	};

	function bindEvent(){
		var nodeDom=document.querySelector(zobj.dom);
		nodeDom.addEventListener('change',function(e){
			if(obj.before){
				obj.before(zobj,function(){
					upload();	
				});
			
			}else{
				upload();
			}

			function upload(){
				if(!window.FileReader){
					return;
				}

				var reader=new FileReader();
				var startIndex=0;
				var file=nodeDom.files;
				var endIndex=file.length-1;
				var fileIndex = 0;
				var fileType = file[0].type;
				var fm=new FormData();
				var data_list = [];
				var xhr2 = new XMLHttpRequest();
				reader.onload=function(){
				    //console.log(reader.result);
				    
				    if (zobj.mul && zobj.mul != 1) {
				        console.log(zobj.mul);
				        var canvas = document.createElement('canvas');
				        //var imgdata = reader.result.split(',')[1];
				        var img = new Image();
				        img.src = reader.result;
				        img.onload = function () {
				            //console.log(this.width + ' ' + this.height);
				            if (this.width > 700) {
				                canvas.width = this.width * zobj.mul;
				                canvas.height = this.height * zobj.mul;
				            } else {
				                canvas.width = this.width;
				                canvas.height = this.height;
				            }
                            
				            var c = canvas.getContext('2d');
				            c.drawImage(this, 0, 0, canvas.width, canvas.height);
				            var imgdata = canvas.toDataURL(fileType).split(',')[1];
				            //console.log(imgdata);
				            imgdata = window.atob(imgdata);

				            var ia = new Uint8Array(imgdata.length);
				            for (var i = 0; i < imgdata.length; i++) {
				                ia[i] = imgdata.charCodeAt(i);
				            };
				            var blob = new Blob([ia], { type: fileType });
				            var fm2 = new FormData();
				            var fileName = (new Date().getTime()) + file[0].name.substring(file[0].name.lastIndexOf('.'));
				            fm2.append('file' + 0, blob,fileName);
				            postFile(fm2);
				        }



				        return;
				    }
				    var fm2 = new FormData()
					fm2.append('file'+0,file[0]);
					postFile(fm2);
					
					//var fileName=(new Date().getTime())+file[startIndex].name.substring(file[startIndex].name.lastIndexOf('.'));
					//console.log(fileName);
					var fileSize=file[0].size;

					//if(!obj.iscut){
					//	postFile(fm2);
					//}else{
					//	//console.log('裁剪中');
					//}
					

					

					function postFile(_fm){
						var xhr=new XMLHttpRequest();
						xhr.open('post',zobj.url);
						xhr.send(_fm);
						xhr.onload=function(data){
						    if (this.status >= 200 && this.status < 400) {
                                
								//console.log('上传成功');
						        var data = JSON.parse(this.response);
						        if (data.Success) {
						            data_list.push(data);
						            if (fileIndex >= endIndex) {
						                zobj.success(data_list);
						            }
						            fileIndex++;
						        }
								
								//document.getElementById('img-box').appendChild('<img src="'+data.result+'"/>');
								//$('body').append('<img src="'+data.result+'"/>');
							} else {
								zobj.error(data);
							}
						}
					}

					//if(startIndex!=endIndex){
					//	startIndex++;
					//	//console.log(file[startIndex]);
					//	reader.readAsDataURL(file[startIndex]);
					//	return;
					//}

				}
			    //for(var i=0;i<file.length;i++){

				if(file.length>0){
					reader.readAsDataURL(file[0]);
				}

				//}
			}
		});
	}
	bindEvent();

	return zobj;
}
