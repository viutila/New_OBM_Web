function AjaxClass(){
	this.xhr = false;	//http_request
	this.data;
	this.status = 0;
	this.repeatFlag = 0;
	this.repeatTime = 0;
	this.retrySec = 5000;
	this.args;

	this.no = 0;
	while(window["AjaxClass" + this.no]){
		this.no++;
	}
	this.sysId = "AjaxClass" + this.no;
	window[this.sysId] = this;
}
AjaxClass.prototype.init = function(){
    /*
	try{
		this.xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}catch(er){
		try{
			this.xhr = new ActiveXObject("Msxml2.XMLHTTP");
		}catch(err){
			try{
				this.xhr = new XMLHttpRequest();
			}catch(errr){
				if(g_util_debug_mode){
					showMsg("can't create the xmlhttp object");
				}else{
					return false;
				}
			}
		}
	}
    */
    if (window.XMLHttpRequest)
    {
        this.xhr = new XMLHttpRequest();
    }
    else
    {
        this.xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    
	this.data = null;
	this.status = 0;
	this.repeatFlag = 0;
};
AjaxClass.prototype.core = function(){
	var obj = this;
	//args[0]	url
	//args[1]	method		"GET","POST"	default: "GET"
	//args[2]	type		0 => "sync", 1 => "Async"
	//args[3]	result		0 => "text", 1 => "Xml"
	//args[4]	func		for Async	default: false
	//args[5]	sendData	default: null
	var args = arguments;
	var url = args[0];
    //var url = "http://"+parent.g_ip+"/"+args[0];
	var method = args[1]!=null?args[1]:"GET";
	var type = args[2]!=null?args[2]:0;
	var result = args[3]!=null?args[3]:0;
	var func = args[4]!=null?args[4]:false;
	var sendData = args[5]!=null?args[5]:null;
	
	this.args = args;
	try{
		this.init();
		this.xhr.open(method,checkUrlRandom(url),func);
		if(method == "POST"){
			this.xhr.setRequestHeader("CONTENT-TYPE","application/x-www-form-urlencoded");
		}
		this.xhr.send(sendData);
	
		if(type == 0){
			if(this.xhr.readyState == 4){
				if(this.xhr.status == 200){
					if(result == 0){
						this.data = this.xhr.responseText;
					}else{
						this.data = this.xhr.responseXML;
					}
					this.status = 1;
					return this.data;
				}else{
					return "";
				}
			}
		}else{
            this.xhrtimeout=setTimeout(function(){
                obj.xhr.abort();
            },5000);

			this.xhr.onreadystatechange = function(){
							if(obj.xhr.readyState == 4){
								if(obj.xhr.status == 200){
									if(result == 0){
										obj.data = obj.xhr.responseText;
									}else{
										obj.data = obj.xhr.responseXML;
									}
									obj.status = 1;
                                    clearTimeout(obj.xhrtimeout); 
									func();
								}else{
									func();
                                    clearTimeout(obj.xhrtimeout); 
								}
							}
						};
		}
	}catch(e){
		if(this.repeatFlag < this.repeatTime){
			setTimeout(this.sysId + ".retry();",this.retrySec);
			this.repeatFlag++;
		}
	}
};
AjaxClass.prototype.retry = function(){
	this.core(this.args[0],this.args[1],this.args[2],this.args[3],this.args[4],this.args[5]);
}
AjaxClass.prototype.getData = function(){
	//args[0]	url
	//args[1]	sendData
	var args = arguments;
	return this.core(args[0],"GET",0,0,null,args[1]);
};
AjaxClass.prototype.postData = function(){
	//args[0]	url
	//args[1]	sendData
	var args = arguments;
	return this.core(args[0],"POST",0,0,null,args[1]);
};
AjaxClass.prototype.getXmlData = function(){
	//args[0]	url
	//args[1]	sendData
	var args = arguments;
	return this.core(args[0],"GET",0,1,null,args[1]);
};
AjaxClass.prototype.postXmlData = function(){
	//args[0]	url
	//args[1]	sendData
	var args = arguments;
	return this.core(args[0],"POST",0,1,null,args[1]);
};
AjaxClass.prototype.getAsynData = function(){
	//args[0]	url
	//args[1]	func
	//args[2]	sendData
	var args = arguments;
	this.core(args[0],"GET",1,0,args[1],args[2]);
};
AjaxClass.prototype.postAsynData = function(){
	//args[0]	url
	//args[1]	func
	//args[2]	sendData
	var args = arguments;
	this.core(args[0],"POST",1,0,args[1],args[2]);
};
AjaxClass.prototype.getAsynXmlData = function(uristr,func){
	//args[0]	url
	//args[1]	func
	//args[2]	sendData
	var args = arguments;
	this.core(args[0],"GET",1,1,args[1],args[2]);
};
AjaxClass.prototype.postAsynXmlData = function(uristr,func){
	//args[0]	url
	//args[1]	func
	//args[2]	sendData
	var args = arguments;
	this.core(args[0],"POST",1,1,args[1],args[2]);
};