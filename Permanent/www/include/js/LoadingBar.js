function LoadingBar(){
	/*
	need use utility.js LoadingBar.css
	*/
	//args[0]	method
			//
	//args[1]	container id
	//args[2]	div width		default:200
	//args[3]	div height		default:20
	//args[4]	div offsetTop		default:null	if value isn't null => position:absolute
	//args[5]	div offsetLeft		default:null
	//args[6]	message			default:null
	//args[7]	message	offsetTop	default:null	if value isn't null => position:absolute
	//args[8]	message	offsetLeft	default:null
	//args[9]	block width		default:20
	//args[10]	block numbers		default:7
	//args[11]	speed			default:100(ms)
	var args = arguments;
	this.method = args[0]!=null?args[0]:"";
	this.containerId = args[1];
	this.divWidth = args[2]!=null?args[2]:200;
	this.divHeight = args[3]!=null?args[3]:20;
	this.divTop = args[4];
	this.divLeft = args[5];
	this.msg = args[6];
	this.msgTop = args[7];
	this.msgLeft = args[8];
	this.spanWidth = args[9]!=null?args[9]:20;
	this.spanNo = args[10]!=null?args[10]:7;
	this.speed = args[11]!=null?args[11]:100;
	
	//keyword
	this.idKey = "lb_";
	this.classKey = "lb_";
	//the distance of span to span
	this.spanSpace = 2;
	//timeout flag
	this.flag = 0;

	//check repeat no
	this.no = 0;
	//setup id
	this.divId;
	this.msgId;
	this.spanId;
	this.sysId;

	//setup class
	this.divClass;
	this.msgClass;
	this.spanClass;
	this.blockClass;

	if(args.length > 0){
		this.init();
	}
}
LoadingBar.prototype.init = function(){
	this.setMembers();
	this.appendSkin();
	this.flag = setTimeout(this.sysId + ".start();",this.speed);
};
LoadingBar.prototype.setMembers = function(){
	while(document.getElementById(this.idKey + "div" + this.no)){
		this.no++;
	}
	//setup id
	this.divId = this.idKey + "div" + this.no;
	this.msgId = this.idKey + "msg" + this.no;
	this.spanId = this.idKey + "span" + this.no;
	this.sysId = "LoadingBar" + this.no;
	window[this.sysId] = this;
	//setup class
	this.divClass = this.classKey + "div";
	this.msgClass = this.classKey + "msg";
	this.spanClass = this.classKey + "span";
	this.blockClass = this.classKey + "block";
};
LoadingBar.prototype.appendSkin = function(){
	var skin = "";

	if(this.msg != null){
		if(this.msgTop != null){
			skin +=	"<div id='" + this.msgId+ "' class='" + this.msgClass + "' style='position: absolute;top: " + this.msgTop + "px;left: " + this.msgLeft + "px;width: " + this.divWidth + "px;height: " + this.divHeight + "px;'>" + this.msg + "</div>";
		}else{
			skin +=	"<div id='" + this.msgId+ "' class='" + this.msgClass + "' style='position: relative;width: " + this.divWidth + "px;height: " + this.divHeight + "px;'>" + this.msg + "</div>";
		}
	}

	if(this.divTop != null){
		skin +=	'<div id="' + this.divId+ '" class="' + this.divClass + '" style="position: absolute;overflow: hidden;top: ' + this.divTop + 'px;left: ' + this.divLeft + 'px;width: ' + this.divWidth + 'px;height: ' + this.divHeight + 'px;">';
	}else{
		skin +=	'<div id="' + this.divId+ '" class="' + this.divClass + '" style="position: relative;overflow: hidden;width: ' + this.divWidth + 'px;height: ' + this.divHeight + 'px;">';
	}
	skin +=		'<span id="' + this.spanId+ '" class="' + this.spanClass + '" style="position: absolute;width: ' + this.divWidth + 'px;height: ' + this.divHeight + 'px;"></span>';
	skin +=	'</div>';

	setIdInnerHTML(this.containerId,skin);

	var tmpId = "";
	var tmpSpan = "";
	var tmpLeft = 0;

	for(var i = 0;i < this.spanNo;i++){
		tmpId = this.idKey + "span" + this.no + "_" + i;

		tmpLeft = (this.spanWidth + this.spanSpace) * i;
		tmpSpan += "<span id='" + tmpId + "' class='" + this.blockClass + "' style='position: absolute;left: " + tmpLeft + "px;width: " + this.spanWidth + "px;height: " + this.divHeight + "px;" + getCssOpacity(i,this.spanNo) + ";'></span>";
	}
	setIdInnerHTML(this.spanId,tmpSpan);
};
LoadingBar.prototype.start = function(){
	var tmpId = "";
	var tmpLeft = 0;
	for(var i = 0;i < this.spanNo;i++){
		tmpId = this.idKey + "span" + this.no + "_" + i;
		
		tmpLeft = getIdStyle(tmpId).left.toInt() + this.spanWidth + this.spanSpace;
		
		if(tmpLeft > this.divWidth){
			setIdLeft(tmpId,0);
		}else{
			setIdLeft(tmpId,tmpLeft);
		}
	}
	this.flag = setTimeout(this.sysId + ".start();",this.speed);
};
LoadingBar.prototype.stop = function(){
	clearTimeout(this.flag);
};
LoadingBar.prototype.show = function(){
	setIdVisibility(this.containerId,1);
};
LoadingBar.prototype.hide = function(){
	setIdVisibility(this.containerId,0);
};