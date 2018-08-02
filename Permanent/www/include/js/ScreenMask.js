function ScreenMask(){
	/*
	need use utility.js ScreenMask.css
	*/
	//args[0]	method
			//create text span		t
			//after init,open ScreenMask	o
			//use iframe			m
			//create close button		b
	//args[1]	container id
	//args[2]	div width
	//args[3]	diw height
	//args[4]	div offsetTop				if value isn't null => position:absolute
	//args[5]	div offsetLeft
	//args[6]	mask color
	var args = arguments;
	this.method = args[0]!=null?args[0]:"";
	this.containerId = args[1];
	//documentElement vs body?
	//this.divWidth = args[2]!=null?args[2]:document.documentElement.scrollWidth;
	//this.divHeight = args[3]!=null?args[3]:document.documentElement.scrollHeight;
	//this.divWidth = args[2]!=null?args[2]:document.body.clientWidth;
	//this.divHeight = args[3]!=null?args[3]:document.body.clientHeight;
    this.divWidth = args[2]!=null?args[2]:document.documentElement.offsetWidth;
	this.divHeight = args[3]!=null?args[3]:document.documentElement.offsetHeight;
	this.divTop = args[4]!=null?args[4]:0;
	this.divLeft = args[5]!=null?args[5]:0;
	this.bgColor = args[6]!=null?args[6]:"#FFFFFF";
	
	//keyword
	this.idKey = "sm_";
	this.classKey = "sm_";
	this.opacity = 6;
	this.cancelFunc = null;

	//check repeat no
	this.no = 0;
	//setup id
	this.divId;
	this.spanId;
	this.btnId;
	this.sysId;
	//setup class
	this.containerClass;
	this.divClass;
	this.spanClass;
	this.btnClass;

	if(args.length > 0){
		this.init();
	}
}
ScreenMask.prototype.init = function(){
	this.setMembers();
	this.appendSkin();
	if(this.method.indexOf("o") > -1){
		this.open();
	}
};
ScreenMask.prototype.setMembers = function(){
	while(document.getElementById(this.idKey + "div" + this.no)){
		this.no++;
	}
	//setup id
	this.divId = this.idKey + "div" + this.no;
	this.spanId = this.idKey + "span" + this.no;
	this.btnId = this.idKey + "btn" + this.no;
	this.ifrId = this.idKey + "ifr" + this.no;
	
	//setup class
	this.containerClass = this.classKey + "container";
	this.divClass = this.classKey + "div";
	this.spanClass = this.classKey + "span";
	this.btnClass = this.classKey + "btn";
	this.ifrClass = this.classKey + "ifr";
};
ScreenMask.prototype.appendSkin = function(){
	var obj = this;
	var skin = "";
	
	EFDEF_(this.containerId).position("absolute")
			.top(this.divTop)
			.left(this.divLeft)
			.width(this.divWidth)
			.height(this.divHeight)
			.bgColor(this.bgColor)
			.opacity(this.opacity)
			.className(this.containerClass)
			//.visibility(0)
			.display("none");

	if(this.method.indexOf("m") > -1){
		skin +=		"<iframe id='" + this.ifrId + "' name='" + this.ifrId + "' class='" + this.ifrClass + "' src='about:blank'></iframe>";
	}
	
	skin +=	"<div id='" + this.divId + "' class='" + this.divClass + "'>";
	if(this.method.indexOf("t") > -1){
		skin +=		"<span id='" + this.spanId + "' class='" + this.spanClass + "'>Screen Mask</span><br/>";
	}
	if(this.method.indexOf("b") > -1){
		skin +=		"<input type='button' id='" + this.btnId + "' class='" + this.btnClass + "' value='close'/>";
	}
	skin += "</div>";
	setIdInnerHTML(this.containerId,skin);

	if(this.method.indexOf("m") > -1){
		var ifr_window = window.frames[this.ifrId];
		ifr_window.document.open();   
		ifr_window.document.write("<body style='background:transparent;background-color: " + this.bgColor + ";'></body>");
		ifr_window.document.close(); 
	}
	
	if(this.method.indexOf("b") > -1){
		setIdOnmouseup(this.btnId,function(){
						obj.close();
						if(obj.cancelFunc != null){
							obj.cancelFunc();
						}
					});
	}
};
ScreenMask.prototype.open = function(){
	//setIdVisibility(this.containerId,1);
	setIdDisplay(this.containerId,"block");
	return this;
};
ScreenMask.prototype.close = function(){
	//setIdVisibility(this.containerId,0);
	setIdDisplay(this.containerId,"none");
	return this;
};
ScreenMask.prototype.setBtnValue = function(value){
	setIdValue(this.btnId,value);
	return this;
};
ScreenMask.prototype.setCancelFunc = function(func){
	this.cancelFunc = func;
	return this;
};
ScreenMask.prototype.openBtn = function(){
	setIdDisplay(this.btnId,"block");
	return this;
};
ScreenMask.prototype.closeBtn = function(){
	setIdDisplay(this.btnId,"none");
	return this;
};
ScreenMask.prototype.setOpacity = function(opacity){
	setIdOpacity(this.containerId,opacity);
	return this;
};
ScreenMask.prototype.setWidth = function(width){
	setIdStyleWidth(this.containerId,width);
	return this;
};
ScreenMask.prototype.setHeight = function(height){
	setIdStyleHeight(this.containerId,height);
	return this;
};
ScreenMask.prototype.setTop = function(top){
	setIdTop(this.containerId,top);
	return this;
};
ScreenMask.prototype.setLeft = function(left){
	setIdLeft(this.containerId,left);
	return this;
};
ScreenMask.prototype.setSpanText = function(txt){
	setIdInnerHTML(this.spanId,txt);
	return this;
};
ScreenMask.prototype.resize = function(width,height){
	if(width){
		this.setWidth(width);
	}else{
		this.setWidth(document.body.clientWidth);
	}
	if(height){
		this.setHeight(height);
	}else{
		this.setHeight(document.body.clientHeight);
	}
	return this;
};