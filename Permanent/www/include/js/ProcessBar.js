function ProcessBar(){
	/*
	need use utility.js ProcessBar.css
	*/
	//args[0]	method
			//display process percent	d
			//add status step by step	s
	//args[1]	container id
	//args[2]	div offsetTop		default:null		if value isn't null => position:absolute
	//args[3]	div offsetLeft		default:null
	//args[4]	div width		default:200
	//args[5]	div height		default:20
	//args[6]	show message		default:null
	//args[7]	message	offsetTop	default:null
	//args[8]	message	offsetLeft	default:null
	var args = arguments;
	this.method = args[0]!=null?args[0]:"";
	this.containerId = args[1];
	this.divTop = args[2]!=null?args[2]:null;
	this.divLeft = args[3]!=null?args[3]:null;
	this.divWidth = args[4]!=null?args[4]:"200";
	this.divHeight = args[5]!=null?args[5]:"20";
	this.msg = args[6]!=null?args[6]:null;
	this.msgTop = args[7]!=null?args[7]:null;
	this.msgLeft = args[8]!=null?args[8]:null;
	
	//keyword
	this.idKey = "pb_";
	this.classKey = "pb_";
	this.processFlag = 0;
	this.targetFlag = 0;
	this.timeoutFlag = 0;
	this.speed = 100;
	this.finishFn;

	//check repeat no
	this.no = 0;
	//setup id
	this.msgId;
	this.divId;
	this.frontId;
	this.infoId;
	this.sysId;
	//setup class
	this.msgClass;
	this.divClass;
	this.frontClass;
	this.infoClass;

	this.value = 0;

	if(args.length > 0){
		this.init();
	}
}
ProcessBar.prototype.init = function(){
	this.setMembers();
	this.appendSkin();
	this.hide();
};
ProcessBar.prototype.setMembers = function(){
	while(document.getElementById(this.idKey + "div" + this.no)){
		this.no++;
	}
	//setup id
	this.msgId = this.idKey + "msg" + this.no;
	this.divId = this.idKey + "div" + this.no;
	this.frontId = this.idKey + "front" + this.no;
	this.infoId = this.idKey + "info" + this.no;
	this.sysId = "ProcessBar" + this.no;
	window[this.sysId] = this;
	//setup class
	this.msgClass = this.classKey + "msg";
	this.divClass = this.classKey + "div";
	this.frontClass = this.classKey + "front";
	this.infoClass = this.classKey + "info";
};
ProcessBar.prototype.appendSkin = function(){
	var skin = "";
	if(this.msg != null){
		if(this.msgTop != null){
			skin += "<div id='" + this.msgId + "' class='" + this.msgClass +"' style='position: absolute;TOP: " + this.msgTop + "px; LEFT: " + this.msgLeft + "px;'>" + this.msg + "</div>";
		}else{
			skin += "<div id='" + this.msgId + "' class='" + this.msgClass +"'>" + this.msg + "</div>";
		}
	}
	if(this.divTop != null){
		skin += "<div id='" + this.divId + "' class='" + this.divClass +"' style='position: absolute;TOP: " + this.divTop + "px; LEFT: " + this.divLeft + "px;width: " + this.divWidth + "px;height: " + this.divHeight + "px;'>";
	}else{
		skin += "<div id='" + this.divId + "' class='" + this.divClass +"' style='position: relative;width: " + this.divWidth + "px;height: " + this.divHeight + "px;'>";
	}
	skin += "<div id='" + this.infoId + "' class='" + this.infoClass +"' style='text-align:center;position: absolute;width: 100%;height: 100%;'>";
	
	if(this.method.indexOf("d") > -1){
		skin += "0%";
	}
	skin += "</div>";
	
	skin += "<div id='" + this.frontId + "' class='" + this.frontClass +"' style='width: 0%;height: 100%;'></div>";
	skin += "</div>";
	
	setIdInnerHTML(this.containerId,skin);
};
ProcessBar.prototype.setValue = function(no){
	if(no < 0){
		no = 0;
	}
	if(this.method.indexOf("s") > -1){
		this.targetFlag = no;
		this.stepByStep();
	}else{
		this.processFlag = no;
		setIdStyleWidth(this.frontId,no,'%');
		setIdTitle(this.frontId, no + "%");
		if(this.processFlag == 100){
			if(this.finishFn != null){
				this.finishFn();
			}
		}
		if(this.method.indexOf("d") > -1){
			setIdInnerHTML(this.infoId,no + "%");
		}
	}
	return this;
};
ProcessBar.prototype.stepByStep = function(){
	var obj = this;
	if(this.processFlag < this.targetFlag){
		this.processFlag++;
		setIdStyleWidth(this.frontId,this.processFlag,'%');
		setIdTitle(this.frontId, this.processFlag + "%");
		if(this.method.indexOf("d") > -1){
			setIdInnerHTML(this.infoId,this.processFlag + "%");
		}
		if(this.processFlag == 100){
			if(this.finishFn != null){
				this.finishFn();
			}
		}else{
			obj.timeOutFlag = setTimeout(obj.sysId + ".stepByStep();",this.speed);
		}
	}
};
ProcessBar.prototype.start = function(){
	var obj = this;
	if(this.processFlag < 100){
		this.processFlag++;
		this.setValue(this.processFlag);
		if(this.processFlag == 100){
			if(this.finishFn != null){
				this.finishFn();
			}
		}else{
			obj.timeOutFlag = setTimeout(obj.sysId + ".start();",this.speed);
		}
	}
};
ProcessBar.prototype.stop = function(){
	clearTimeout(this.timeOutFlag);
};
ProcessBar.prototype.back = function(){
	var obj = this;
	if(this.processFlag > 0){
		this.processFlag--;
		this.setValue(this.processFlag);
		obj.timeOutFlag = setTimeout(obj.sysId + ".back();",this.speed);
	}
};
ProcessBar.prototype.show = function(){
	setIdDisplay(this.containerId,"block");
	return this;
};
ProcessBar.prototype.hide = function(){
	setIdDisplay(this.containerId,"none");
	return this;
};
ProcessBar.prototype.setMsg = function(msg){
	setIdInnerHTML(this.msgId,msg);
	return this;
};
ProcessBar.prototype.setFinishFn = function(fn){
	this.finishFn = fn;
	return this;
};
ProcessBar.prototype.setProcessFlag = function(no){
	this.processFlag = no;
	setIdStyleWidth(this.frontId,no,'%');
	setIdTitle(this.frontId, no + "%");
	if(this.method.indexOf("d") > -1){
		setIdInnerHTML(this.infoId,no + "%");
	}
	return this;
};