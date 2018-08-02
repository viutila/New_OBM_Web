/////////////////////////////////////
var g_util_debug_mode = window.location.host=="localhost"?1:getPara("debug");
var g_util_debug_admin = window.location.host=="localhost"?1:getPara("admin");
var g_bug_id = "div_debug";
var g_bug_div_id = "div_debug_id";
var g_bug_tbl_id = "tbl_debug";
var g_bug_search_id = "input_search_debug";
var g_bug_search_btn_id = "btn_search_debug";
var g_bug_counter = 0;
var g_bug_top = 0;
var g_bug_left = 0;
var g_bug_flag = 0;

var EFDEF_;
window.EFDEF_ = EFDEF_;

EFDEF_ = function(id){
	if(typeof(id) == "object"){
		return new EFDEF_.fn(id);
	}else{
		if(EFDEF_id(id))
			return new EFDEF_.fn(EFDEF_id(id));
		else
			return null;//add by robert hsu 20111103 for if cannot find object doesn't init for that object
	}
};
EFDEF_selector = function(type,elem,id){
	var tmpAry = new Array();
	var myReg = new RegExp(id);
	var tmpAttr;
	for(var h = 0;h < elem.length;h++){
		if(type == "id"){
			tmpAttr = elem[h].id;
		}else if(type == "class"){
			tmpAttr = elem[h].className;
		}
		if(myReg.test(tmpAttr)){
			tmpAry.push(elem[h]);
		}
	}
	return tmpAry;
};
EFDEF_create = function(id){
	return new EFDEF_.fn(document.createElement(id));
};
EFDEF_id = function(id){
	if(typeof(id) == "object"){
		return id;
	}else{
		var tmpObj;
		if(id.indexOf("^") > -1 || id.indexOf("EFDEF_") > -1 || id.indexOf("+") > -1){
			var elem = document.getElementsByTagName("*");
			tmpObj = EFDEF_selector("id",elem,id);
		}else{
			tmpObj = document.getElementById(id);
		}
		if(tmpObj === null){
			if(g_util_debug_mode){
				showMsg("Can't find node id " + id);
			}
			return null;
		}else{
			return tmpObj;
		}
	}
};
EFDEF_class = function(id,rootId){
	if(typeof(id) == "object"){
		return id;
	}else{
		var tmpObj;
		var myReg;
		var elem;
		if(id.indexOf("^") > -1 || id.indexOf("EFDEF_") > -1 || id.indexOf("+") > -1){
			myReg = new RegExp(id);
		}else{
			myReg = new RegExp("\\b" + id + "\\b");
		}
		if(rootId != null){
			if(typeof(rootId) == "object"){
				elem = rootId.getElementsByTagName("*");
			}else{
				var tmpRoot = EFDEF_id(rootId);
				elem = tmpRoot.getElementsByTagName("*");
			}
		}else{
			elem = document.getElementsByTagName("*");
		}
		tmpObj = EFDEF_selector("class",elem,myReg);
		if(tmpObj.length == 0){
			if(g_util_debug_mode){
				showMsg("Can't find node class " + id);
			}else{
				return false;
			}
		}else{
			return new EFDEF_.fn(tmpObj);
		}
	}
};
EFDEF_tag = function(id,rootId){
	if(typeof(id) == "object"){
		return id;
	}else{
		var tmpObj;
		if(rootId != null){
			if(typeof(rootId) == "object"){
				tmpObj = rootId.getElementsByTagName(id);
			}else{
				var tmpRoot = EFDEF_id(rootId);
				tmpObj = tmpRoot.getElementsByTagName(id);
			}
		}else{
			tmpObj = document.getElementsByTagName(id);
		}
		if(tmpObj.length == 0){
			if(g_util_debug_mode){
				showMsg("Can't find node tag " + id);
			}else{
				return false;
			}
		}else{
			return new EFDEF_.fn(tmpObj);
		}
	}
};
EFDEF_p = function(id){
	if(parent.document.getElementById(id) == null){
		if(g_util_debug_mode){
			showMsg("Can't find parent." + id);
		}else{
			return false;
		}
	}else{
		return parent.document.getElementById(id);
	}
};
EFDEF_c = function(child,id){
	if(typeof(child) != "undefined"){
		if(child.document.getElementById(id)){
			return child.document.getElementById(id);
		}else{
			if(g_util_debug_mode){
				showMsg("Can't find child." + id);
			}else{
				return false;
			}
		}
	}else{
		if(g_util_debug_mode){
			showMsg("Can't find child." + id);
		}else{
			return false;
		}
	}
};
function controller(e){
	e = e || event;
	key = window.event ? e.keyCode : e.which;
	if(e.shiftKey && e.altKey && key == 38){
		g_util_debug_mode = 1;
		g_util_debug_admin = 1;
		showMsg("start controller!");
	}
}
function setIdId(id,val){
	EFDEF_id(id).id = val;
}
function getIdId(id){
	return EFDEF_id(id).id;
}
function setIdValue(id,val){
	EFDEF_id(id).value = val;
}
function getIdValue(id){
	return EFDEF_id(id).value;
}
function getIdStyle(id){
	return EFDEF_id(id).style;
}
function setIdCssText(id,val){
	getIdStyle(id).cssText = val;
}
function getIdCssText(id){
	return getIdStyle(id).cssText;
}
function setIdBgColor(id,val){
	getIdStyle(id).backgroundColor = val;
}
function getIdBgColor(id){
	return getIdStyle(id).backgroundColor;
}
function setIdBgAttachment(){
	//args[0]	id
	//args[1]	type	scroll | fixed
	var args = arguments;
	var type = args[1]!=null?args[1]:"fixed";
	getIdStyle(args[0]).backgroundAttachment = type;
}
function getIdBgAttachment(id){
	return getIdStyle(id).backgroundAttachment;
}
function setIdBgPosition(){
	//args[0]	id
	//args[1]	val1	[top | center | bottom] || [left | center | right]
	//args[2]	val2
	var args = arguments;
	var val1 = args[1]!=null?args[1]:"0%";
	var val2 = args[2]!=null?args[2]:"0%";
	var tmpStr = val1 + " " + val2;
	getIdStyle(args[0]).backgroundPosition = tmpStr;
}
function getIdBgPosition(id){
	return getIdStyle(arguments[0]).backgroundPosition;
}
function setIdBgRepeat(){
	//args[0]	id
	//args[1]	value	//repeat | repeat-x | repeat-y | no-repeat | inherit
	var args = arguments;
	var tmpType = args[1]!=null?args[1]:"no";
	if(tmpType == "no"){
		tmpType = "no-repeat";
	}else if(tmpType == "x" || tmpType == "y"){
		tmpType = "repeat-" + tmpType;
	}
	getIdStyle(args[0]).backgroundRepeat = tmpType;
}
function getIdBgRepeat(id){
	return getIdStyle(id).backgroundRepeat;
}
function setIdBgImg(id,val){
	if(val.indexOf("url") > -1){
		getIdStyle(id).backgroundImage = val;
	}else{
		getIdStyle(id).backgroundImage = "url(" + val + ")";
	}
}
function getIdBgImg(id){
	return getIdStyle(id).backgroundImage;
}
function setIdHref(id,val){
	EFDEF_id(id).href = val;
}
function getIdHref(id){
	return EFDEF_id(id).href;
}
function setIdCursor(id,val){
	getIdStyle(id).cursor = val;
}
function getIdCursor(id){
	return getIdStyle(id).cursor;
}
function setIdPosition(id,val){
	getIdStyle(id).position = val;
}
function getIdPosition(id){
	return getIdStyle(id).position;
}
function getIdScrollWidth(id){
	if(EFDEF_id(id).scrollWidth)
		return EFDEF_id(id).scrollWidth;
	else
	{
		return EFDEF_id(id).offsetWidth;
	}
}
function getIdScrollHeight(id){
	if(EFDEF_id(id).scrollHeight)
		return EFDEF_id(id).scrollHeight;
	else
	{
		return EFDEF_id(id).offsetHeight;
	}
}
function getIdOffsetWidth(id){
	return EFDEF_id(id).offsetWidth;
}
function getIdOffsetHeight(id){
	return EFDEF_id(id).offsetHeight;
}
function setIdWidth(id,val){
	EFDEF_id(id).width = val.toInt();
}
function getIdWidth(id){
	return EFDEF_id(id).width.toInt();
}
function setIdHeight(id,val){
	EFDEF_id(id).height = val.toInt();
}
function getIdHeight(id){
	return EFDEF_id(id).height.toInt();
}
function setIdStyleWidth(){
	//args[0]	id
	//args[1]	value
	//args[2]	unit	default:'px'
	var args = arguments;
	var tmpUnit = args[2]!=null?args[2]:'px';
	var tmpValue;
	if(args[1] == "auto"){
		tmpValue = "auto";
	}else{
		tmpValue = args[1].toInt() + tmpUnit;
	}
	getIdStyle(args[0]).width = tmpValue;
}
function getIdStyleWidth(id){
	return getIdStyle(id).width.toInt();
}
function setIdStyleHeight(){
	//args[0]	id
	//args[1]	value
	//args[2]	unit	default:'px'
	var args = arguments;
	var tmpUnit = args[2]!=null?args[2]:'px';
	var tmpValue;
	if(args[1] == "auto"){
		tmpValue = "auto";
	}else{
		tmpValue = args[1].toInt() + tmpUnit;
	}
	getIdStyle(args[0]).height = tmpValue;
}
function getIdStyleHeight(id){
	return getIdStyle(id).height.toInt();
}
function getIdChecked(){
	//args[0]	id
	//args[1]	if this is not null => return boolean;
	var args = arguments;
	if(args[1] == null){
		return EFDEF_id(args[0]).checked==true?1:0;
	}else{
		return EFDEF_id(args[0]).checked;
	}
}
function setIdChecked(id,val){
	if(typeof(val) == "boolean"){
		EFDEF_id(id).checked = val;
	}else{
		var tmpValue = val.toInt();
		EFDEF_id(id).checked = tmpValue!=0?true:false;
	}
}
function setIdDisabled(id,val){
	if(typeof(val) == "boolean"){
		EFDEF_id(id).disabled = val;
	}else{
		var tmpValue = val.toInt();
		EFDEF_id(id).disabled = tmpValue!=0?true:false;
	}
}
function getIdDisabled(id){
	return EFDEF_id(id).disabled;
}
function setIdReadOnly(id,val){
	if(typeof(val) == "boolean"){
		EFDEF_id(id).readOnly = val;
	}else{
		var tmpValue = val.toInt();
		EFDEF_id(id).readOnly = tmpValue!=0?true:false;
	}
}
function getIdReadOnly(id){
	return EFDEF_id(id).readOnly;
}
function setIdVisibility(id,val){
	//var tmpObj;
	//if(document.layers){
	//	tmpObj = eval(document.layers[id]);
	//	tmpObj.visibility = val==0?"hide":"show";
	//}else{
		//getIdStyle(id).visibility = val==0?"hidden":"visible";
    //}
    EFDEF_id(id).style.visibility = val == 0 ? "hidden" : "visible";
}
function getIdVisibility(id){
	var tmpStatus = getIdStyle(id).visibility;
	if(tmpStatus == "hidden"){
		return false;
	}else{
		return true;
	}
}
function setIdInnerHTML(id,val){
	EFDEF_id(id).innerHTML = val;
}
function getIdInnerHTML(id){
	return EFDEF_id(id).innerHTML;
}
function setIdSrc(id,val){
	EFDEF_id(id).src = val;
}
function getIdSrc(id){
	return EFDEF_id(id).src;
}
function setIdTitle(id,val){
	if(EFDEF_id(id)!=null) // addbyalec08112010
		EFDEF_id(id).title = val;
}
function getIdTitle(id){
	return EFDEF_id(id).title;
}
function setIdClass(id,val){
	EFDEF_id(id).className = val;
}
function getIdClass(id){
	return EFDEF_id(id).className;
}
function setIdDisplay(id,val){
	/*if(val == "table" || val == "table-row" || val == "table-cell"){
	    //val = isFF()||isChrome()?val:"block";
	    val = isNotIE() ? val : "block";
	}*/
	EFDEF_id(id).style.display = val;
}
function getIdDisplay(id){
	return EFDEF_id(id).style.display;
}
function setIdOpacity(){
	//args[0]	id
	//args[1]	no		0~10
	//args[2]	block number
	var args = arguments;
	var tmpOpacity = 0;
	var id = args[0];
	var no = args[1]!=null?args[1].toInt():6;
	var block = args[2]!=null?args[2].toInt():null;
	if(block == null){
		tmpOpacity = isFF() || isChrome()?no / 10:no * 10;
	}else{
		tmpOpacity = isFF() || isChrome()?(no * (100 / block)) / 100:no * (100 / block);
	}
	if(isFF()){
		getIdStyle(id).MozOpacity = tmpOpacity;
	}else if(isChrome()){
		getIdStyle(id).Opacity = tmpOpacity;
	}else{
		getIdStyle(id).filter = "alpha(opacity=" + tmpOpacity + ")";
	}
}
function getIdOpacity(id){
	if(isFF()){
		return getIdStyle(id).MozOpacity;
	}else if(isChrome()){
		return getIdStyle(id).Opacity;
	}else{
		return getIdStyle(id).filter;
	}
}
function autoIdDisplay(id,val){
	var tmpType = getIdDisplay(id)!=""?getIdDisplay(id):val;
	if(val == "table" || val == "table-row" || val == "table-cell"){
		val = isFF()||isChrome()?val:"block";
	}
	if(tmpType == val){
		setIdDisplay(id,"none");
	}else{
		setIdDisplay(id,val);
	}
}
function getCssOpacity(){
	//args[0]	no		0~10
	//args[1]	block number
	var args = arguments;
	tmpCssText = "";
	tmpOpacity = 0;
	var no = args[0].toInt();
	var block = args[1].toInt();
	if(args[1] == null){
		tmpOpacity = isFF() || isChrome()?no / 10:args[0] * 10;
	}else{
		tmpOpacity = isFF() || isChrome()?(no * (100 / block)) / 100:no * (100 / block);
	}
	tmpCssText = isFF() || isChrome()?"-Moz-opacity:" + tmpOpacity :"filter:alpha(opacity=" + tmpOpacity + ")";
	return tmpCssText;
}
function setIdTop(id,val){
	getIdStyle(id).top = val.toInt() + 'px';
}
function getIdTop(id){
	var obj = EFDEF_id(id);
	var curTop = 0;
	if(obj.offsetParent){
        	do{
			curTop += obj.offsetTop;
        	}while(obj = obj.offsetParent);
	}else if(obj.y){
		curTop += obj.y;
	}
	return curTop;
}
function getIdStyleTop(id){
	return getIdStyle(id).top.toInt();
}
function setIdLeft(id,val){
	getIdStyle(id).left = val.toInt() + 'px';
}
function getIdLeft(id){
	var obj = EFDEF_id(id);
	var curLeft = 0;
	if(obj.offsetParent){
		do{
			curLeft += obj.offsetLeft;
		}while(obj = obj.offsetParent);
	}else if(obj.x){
		curLeft += obj.x;
	}
	return curLeft;
}
function getIdStyleLeft(id){
	return getIdStyle(id).left.toInt();
}
function setIdAttr(id,name,val){
	EFDEF_id(id).setAttribute(name,val);
}
function getIdAttr(id,name){
	return EFDEF_id(id).getAttribute(name);
}
function setIdBorder(){
	//args[0]	id
	//args[1]	value
	//args[2]	type	//0 => "border",1 => "borderTop",2 => "borderLeft",3 => "borderBottom",4 => "borderRight"	default:0
	var args = arguments;
	var id = args[0];
	var val = args[1];
	var type = args[2]?args[2]:0;
	if(type == 1){
		getIdStyle(id).borderTop = val;
	}else if(type == 2){
		getIdStyle(id).borderLeft = val;
	}else if(type == 3){
		getIdStyle(id).borderBottom = val;
	}else if(type == 4){
		getIdStyle(id).borderRight = val;
	}else{
		getIdStyle(id).border = val;
	}
}
function getIdBorder(){
	//args[0]	id
	//args[1]	type
	var args = arguments;
	var id = args[0];
	var type = args[1]?args[1]:0;
	if(type == 1){
		return getIdStyle(id).borderTop;
	}else if(type == 2){
		return getIdStyle(id).borderLeft;
	}else if(type == 3){
		return getIdStyle(id).borderBottom;
	}else if(type == 4){
		return getIdStyle(id).borderRight;
	}else{
		return getIdStyle(id).border;
	}
}
function setIdMargin(){
	//args[0]	id
	//args[1]	value
	//args[2]	type	//0 => "margin",1 => "marginTop",2 => "marginLeft",3 => "marginBottom",4 => "marginRight"	default:0
	var args = arguments;
	var id = args[0];
	var val = args[1];
	var type = args[2]?args[2]:0;
	if(type == 1){
		getIdStyle(id).marginTop = val;
	}else if(type == 2){
		getIdStyle(id).marginLeft = val;
	}else if(type == 3){
		getIdStyle(id).marginBottom = val;
	}else if(type == 4){
		getIdStyle(id).marginRight = val;
	}else{
		getIdStyle(id).margin = val;
	}
}
function getIdMargin(){
	//args[0]	id
	//args[1]	type
	var args = arguments;
	var id = args[0];
	var type = args[1]?args[1]:0;
	if(type == 1){
		return getIdStyle(id).marginTop;
	}else if(type == 2){
		return getIdStyle(id).marginLeft;
	}else if(type == 3){
		return getIdStyle(id).marginBottom;
	}else if(type == 4){
		return getIdStyle(id).marginRight;
	}else{
		return getIdStyle(id).margin;
	}
}
function setIdPadding(){
	//args[0]	id
	//args[1]	value
	//args[2]	type	//0 => "padding",1 => "paddingTop",2 => "paddingLeft",3 => "paddingBottom",4 => "paddingRight"	default:0
	var args = arguments;
	var id = args[0];
	var val = args[1];
	var type = args[2]?args[2]:0;
	if(type == 1){
		getIdStyle(id).paddingTop = val;
	}else if(type == 2){
		getIdStyle(id).paddingLeft = val;
	}else if(type == 3){
		getIdStyle(id).paddingBottom = val;
	}else if(type == 4){
		getIdStyle(id).paddingRight = val;
	}else{
		getIdStyle(id).padding = val;
	}
}
function getIdPadding(){
	//args[0]	id
	//args[1]	type
	var args = arguments;
	var id = args[0];
	var type = args[1]?args[1]:0;
	if(type == 1){
		return getIdStyle(id).paddingTop;
	}else if(type == 2){
		return getIdStyle(id).paddingLeft;
	}else if(type == 3){
		return getIdStyle(id).paddingBottom;
	}else if(type == 4){
		return getIdStyle(id).paddingRight;
	}else{
		return getIdStyle(id).padding;
	}
}
function setIdOverflow(id,val){
	getIdStyle(id).overflow = val;
}
function getIdOverflow(id){
	return getIdStyle(id).overflow;
}
function setIdTextAlign(id,val){
	getIdStyle(id).textAlign = val;
}
function getIdTextAlign(id){
	return getIdStyle(id).textAlign;
}
function setIdColor(id,val){
	getIdStyle(id).color = val;
}
function getIdColor(id){
	return getIdStyle(id).color;
}
function setIdZIndex(id,val){
	getIdStyle(id).zIndex = val;
}
function getIdZIndex(id){
	return getIdStyle(id).zIndex;
}
function setIdTextIndent(){
	//args[0]	id
	//args[1]	value
	//args[2]	unit	default:'px'
	var args = arguments;
	var tmpUnit = args[2]!=null?args[2]:'px';
	var tmpValue;
	tmpValue = args[1].toInt() + tmpUnit;
	getIdStyle(args[0]).textIndent = tmpValue;
}
function getIdTextIndent(id){
	return getIdStyle(id).textIndent.toInt();
}
function setIdFontSize(){
	//args[0]	id
	//args[1]	value
	//args[2]	unit	default:'px'
	var args = arguments;
	var tmpUnit = args[2]!=null?args[2]:'px';
	var tmpValue;
	tmpValue = args[1].toInt() + tmpUnit;
	getIdStyle(args[0]).fontSize = tmpValue;
}
function getIdFontSize(id){
	return getIdStyle(id).fontSize.toInt();
}
function setIdOnclick(id,fn){
	EFDEF_id(id).onclick = fn;
}
function getIdOnclick(id){
	return EFDEF_id(id).onclick;
}
function setIdOndblclick(id,fn){
	EFDEF_id(id).ondblclick = fn;
}
function getIdOndblclick(id){
	return EFDEF_id(id).ondblclick;
}
function setIdOnmouseup(id,fn){
	EFDEF_id(id).onmouseup = fn;
}
function getIdOnmouseup(id){
	return EFDEF_id(id).onmouseup;
}
function setIdOnmousedown(id,fn){
	EFDEF_id(id).onmousedown = fn;
}
function getIdOnmousedown(id){
	return EFDEF_id(id).onmousedown;
}
function setIdOnmousemove(id,fn){
	EFDEF_id(id).onmousemove = fn;
}
function getIdOnmousemove(id){
	return EFDEF_id(id).onmousemove;
}
function setIdOnmouseover(id,fn){
	EFDEF_id(id).onmouseover = fn;
}
function getIdOnmouseover(id){
	return EFDEF_id(id).onmouseover;
}
function setIdOnmouseout(id,fn){
	EFDEF_id(id).onmouseout = fn;
}
function getIdOnmouseout(id){
	return EFDEF_id(id).onmouseout;
}
function setIdOnchange(id,fn){
	EFDEF_id(id).onchange = fn;
}
function getIdOnchange(id){
	return EFDEF_id(id).onchange;
}
function setIdOnkeydown(id,fn){
	EFDEF_id(id).onkeydown = fn;
}
function getIdOnkeydown(id){
	return EFDEF_id(id).onkeydown;
}
function setIdOnkeyup(id,fn){
	EFDEF_id(id).onkeyup = fn;
}
function getIdOnkeyup(id){
	return EFDEF_id(id).onkeyup;
}
function setIdOnfocus(id,fn){
	EFDEF_id(id).onfocus = fn;
}
function getIdOnfocus(id){
	return EFDEF_id(id).onfocus;
}
function setIdOnblur(id,fn){
	EFDEF_id(id).onblur = fn;
}
function getIdOnblur(id){
	return EFDEF_id(id).onblur;
}
//===============================================================
EFDEF_.fn = function(obj){
	this.obj = obj;
	if(obj)
	{
		this.id = function(){
			return this.exe(arguments,0,setIdId,getIdId);
		};
		this.value = function(){
			return this.exe(arguments,0,setIdValue,getIdValue);
		};
		this.cssText = function(){
			return this.exe(arguments,0,setIdCssText,getIdCssText);
		};
		this.bgColor = function(){
			return this.exe(arguments,0,setIdBgColor,getIdBgColor);
		};
		this.bgAttachment = function(){
			return this.exe(arguments,0,setIdBgAttachment,getIdBgAttachment);
		};
		this.bgPosition = function(){
			return this.exe(arguments,0,setIdBgPosition,getIdBgPosition);
		};
		this.bgRepeat = function(){
			return this.exe(arguments,0,setIdBgRepeat,getIdBgRepeat);
		};
		this.bgImage = function(){
			return this.exe(arguments,0,setIdBgImg,getIdBgImg);
		};
		this.href = function(){
			return this.exe(arguments,0,setIdHref,getIdHref);
		};
		this.cursor = function(){
			return this.exe(arguments,0,setIdCursor,getIdCursor);
		};
		this.position = function(){
			return this.exe(arguments,0,setIdPosition,getIdPosition);
		};
		this.top = function(){
			return this.exe(arguments,0,setIdTop,getIdTop);
		};
		this.left = function(){
			return this.exe(arguments,0,setIdLeft,getIdLeft);
		};
		this.attr = function(){
			return this.exe(arguments,1,setIdAttr,getIdAttr);
		};
		this.border = function(){
			return this.exe(arguments,0,setIdBorder,getIdBorder);
		};
		this.margin = function(){
			return this.exe(arguments,0,setIdMargin,getIdMargin);
		};
		this.padding = function(){
			return this.exe(arguments,0,setIdPadding,getIdPadding);
		};
		this.scrollWidth = getIdScrollWidth(obj);
		
		this.scrollHeight = getIdScrollHeight(obj);
		
		this.offsetWidth = getIdOffsetWidth(obj);
		
		this.offsetHeight = getIdOffsetHeight(obj);
		
		this.width = function(){
			return this.exe(arguments,0,setIdStyleWidth,getIdStyleWidth);
		};
		this.height = function(){
			return this.exe(arguments,0,setIdStyleHeight,getIdStyleHeight);
		};
		this.checked = function(){
			return this.exe(arguments,0,setIdChecked,getIdChecked);
		};
		this.disabled = function(){
			return this.exe(arguments,0,setIdDisabled,getIdDisabled);
		};
		this.readOnly = function(){
			return this.exe(arguments,0,setIdReadOnly,getIdReadOnly);
		};
		this.visibility = function(){
			return this.exe(arguments,0,setIdVisibility,getIdVisibility);
		};
		this.innerHTML = function(){
			return this.exe(arguments,0,setIdInnerHTML,getIdInnerHTML);
		};
		this.src = function(){
			return this.exe(arguments,0,setIdSrc,getIdSrc);
		};
		this.title = function(){
			return this.exe(arguments,0,setIdTitle,getIdTitle);
		};
		this.className = function(){
			return this.exe(arguments,0,setIdClass,getIdClass);
		};
		this.display = function(){
			return this.exe(arguments,0,setIdDisplay,getIdDisplay);
		};
		this.opacity = function(){
			return this.exe(arguments,0,setIdOpacity,getIdOpacity);
		};
		this.overflow = function(){
			return this.exe(arguments,0,setIdOverflow,getIdOverflow);
		};
		this.textAlign = function(){
			return this.exe(arguments,0,setIdTextAlign,getIdTextAlign);
		};
		this.color = function(){
			return this.exe(arguments,0,setIdColor,getIdColor);
		};
		this.zIndex = function(){
			return this.exe(arguments,0,setIdZIndex,getIdZIndex);
		};
		this.textIndent = function(){
			return this.exe(arguments,0,setIdTextIndent,getIdTextIndent);
		};
		this.fontSize = function(){
			return this.exe(arguments,0,setIdFontSize,getIdFontSize);
		};
		this.onclick = function(){
			return this.exe(arguments,0,setIdOnclick,getIdOnclick);
		};
		this.ondblclick = function(){
			return this.exe(arguments,0,setIdOndblclick,getIdOndblclick);
		};
		this.onmouseup = function(){
			return this.exe(arguments,0,setIdOnmouseup,getIdOnmouseup);
		};
		this.onmousedown = function(){
			return this.exe(arguments,0,setIdOnmousedown,getIdOnmousedown);
		};
		this.onmousemove = function(){
			return this.exe(arguments,0,setIdOnmousemove,getIdOnmousemove);
		};
		this.onmouseover = function(){
			return this.exe(arguments,0,setIdOnmouseover,getIdOnmouseover);
		};
		this.onmouseout = function(){
			return this.exe(arguments,0,setIdOnmouseout,getIdOnmouseout);
		};
		this.onchange = function(){
			return this.exe(arguments,0,setIdOnchange,getIdOnchange);
		};
		this.onkeydown = function(){
			return this.exe(arguments,0,setIdOnkeydown,getIdOnkeydown);
		};
		this.onkeyup = function(){
			return this.exe(arguments,0,setIdOnkeyup,getIdOnkeyup);
		};
		this.onfocus = function(){
			return this.exe(arguments,0,setIdOnfocus,getIdOnfocus);
		};
		this.onblur = function(){
			return this.exe(arguments,0,setIdOnblur,getIdOnblur);
		};
		this.appendChild = function(){
			obj.appendChild(arguments[0]);
			return this;
		};
		this.removeChild = function(){
			obj.removeChild(arguments[0]);
			return this;
		};
		this.focus = function(){
		    //obj.focus();
		    window.setTimeout(function () { obj.focus(); }, 0);
			return this;
		};
		this.blur = function(){
			obj.blur();
			return this;
		};
		this.submit = function(){
			obj.submit();
			return this;
		};
		this.exe = function(args,no,setFn,getFn){
			if(args.length > no){
				if(obj.length !== undefined){
					for(var i = 0;i < obj.length;i++){
						setFn(obj[i],args[0],args[1],args[2]);
					}
				}else{
					setFn(obj,args[0],args[1],args[2]);
				}
				return this;
			}else{
				return getFn(obj,args[0]);
			}
		};
	}
};
//===============================================================
String.prototype.toFill = function(){
	//args[0]	the max length of string 	default: 0
	//args[1]	filled with char		default: "0"
	var args = arguments;
	var tmpLen = args[0]!=null?args[0]:0;
	var tmpChar = args[1]!=null?args[1]:"0";
	
	var tmpValue = this;
	tmpValue += "";
	if(tmpValue.length > tmpLen){
		tmpValue = tmpValue.substring(0,tmpLen);
	}else{
		while(tmpValue.length < tmpLen){
			tmpValue = tmpChar + "" + tmpValue;
		}
	}
	return tmpValue;
};
Number.prototype.toFill = String.prototype.toFill;
String.prototype.trim = function(){
	return this.replace(/(^\s*)|(\s*$)/g,"");
};
String.prototype.toInt = function(){
	//args[0]	default value	default:0
	//args[1]	radix		default:10
	var args = arguments;
	var defaultVal = args[0]!=null?args[0]:0;
	var radix = args[1]!=null?args[1]:10;
	
	var tmpStr = this + "";
	if(tmpStr.indexOf("0x") > -1){
		radix = 16;
	}
	var tmpVal = parseInt(this,radix);

	if(isNaN(tmpVal)){
		return defaultVal;
	}else{
		return tmpVal;
	}
};
Number.prototype.toInt = String.prototype.toInt;
String.prototype.toPow = function(){
	//args[0]	pow		default:2
	var args = arguments;
	var pow = args[0]!=null?args[0]:2;
	
	return Math.pow(pow,this.toInt());
};
Number.prototype.toPow = String.prototype.toPow;
String.prototype.replaceAll = function(str1,str2){
	return this.replace(new RegExp(str1,"gm"),str2);
};
String.prototype.nl2br = function(){
	//return this.replace(/([^>])\n/g, 'EFDEF_1<br/>\n');	//have some problems
	return this.replace(/\n/g,"<br/>");
};
//===============================================================
function isArray(arr){
	return Object.prototype.toString.call(arr) === "[object Array]";
}
function isFF(){
	if(navigator.userAgent.indexOf("Firefox") > 0){
		return true;
	}else{
		return false;
	}
}
function isChrome(){
	if(navigator.userAgent.indexOf("Chrome") > 0){
		return true;
	}else{
		return false;
	}
}
function isNotIE() {
    if (window.ActiveXObject) {
        return false;
    }
    else {
        return true;
    }
}
function checkUrlRandom(url){
	var tmpDate = new Date();
	if(url.indexOf("?") > 0 ){
		url = url + "&rnd=" + tmpDate.getTime();
	}else{
		url = url + "?rnd=" + tmpDate.getTime();
	}
	return url;	
}
function checkEmail(id,showInfo){
	var re = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
	if(!re.test(getIdValue(id))){
            	alert(showInfo + "email address is invalid format");
            	return false;
        }
        return true;
}
function checkCharAndNum(obj){
	//allow Chars : 0-9 a-z A-Z ' ','.','-','_','@'
	var tmpVal = obj.value + "";
	var len = tmpVal.length;
	var rs = true;
	for(var i = len - 1;i >= 0;i--){
		var ch = tmpVal.charCodeAt(i);
		if((ch >= 48) && (ch <= 57)){			//0-9
	  		//
		}else if((ch >= 65) && (ch <= 90)){		//A-Z
			//
		}else if((ch >= 97) && (ch <= 122)){		//a-z
			//
		}else if((ch == 32) || (ch == 46) || (ch == 45) || (ch == 64) || (ch == 95)){
			rs =  false;
		}else{
			rs = false;
		}			
	}
	if(!rs){
		alert("Characters must be 0-9, A-Z, a-z");
		obj.focus();
	 	obj.select();
	}
	return rs;
}
function CheckTitle(){		//bChar 1:0-9 a-z '.','-','_'
	//args[0]	id
	var args = arguments;
	var tmpValue = getIdValue(args[0]);
	var len = tmpValue.length;
	var errFlag = 0;
	for(var i = len - 1;i >= 0;i--){
		var ch = tmpValue.charCodeAt(i);
		if((ch >= 48) && (ch <= 57)){			//0-9

		}else if((ch >= 65) && (ch <= 90)){		//A-Z

		}else if((ch >= 97) && (ch <= 122)){		//a-z

		//}else if((ch == 46) || (ch == 45) || (ch == 95)){
			
		}else{
			errFlag = 1;
		}
	}
	if(errFlag == 1){
		alert("Characters must be 0-9, A-Z, a-z");
        EFDEF_id(args[0]).focus();
	 	EFDEF_id(args[0]).select();
		return false;
	}else{
		return true;
	}
}
function CheckUnicodeTitle(){		//not @ * & , / EFDEF_ ?
	//args[0]	id
	var args = arguments;
	var tmpValue = getIdValue(args[0]);
	var len = tmpValue.length;
	var errFlag = 0;
	for(var i = len - 1;i >= 0;i--){
		var ch = tmpValue.charCodeAt(i);
		//if((ch == 64) || (ch == 42) || (ch == 38)|| (ch == 44)|| (ch == 47)|| (ch == 36)|| (ch == 63)){
		if ( (ch == 32) || (ch == 45) || (ch == 46) || (ch == 64) || (ch == 95) || (ch == 44) || (ch == 47) || (ch == 42) || (ch == 63) ) { //******* remove @ , / * ?
		
        } else if (ch == 38) {  //******* add &
            errFlag = 1;
            break;
        } else if ((ch >= 33) && (ch <= 47) || (ch >= 58) && (ch <= 63) || (ch >= 91) && (ch <= 96) || (ch >= 123) && (ch <= 126)) {
            errFlag = 1;
            break;
        }else{
			errFlag = 0;
		}
	}
	if(errFlag == 1){
		alert("Invaild Symbol");//multi-lang
        EFDEF_id(args[0]).focus();
	 	EFDEF_id(args[0]).select();
		return false;
	}else{
		return true;
	}
}
function CheckFTPFilename() {		//not / * &
    //args[0]	id
    var args = arguments;
    var tmpValue = getIdValue(args[0]);
    var len = tmpValue.length;
    var errFlag = 0;
    for (var i = len - 1; i >= 0; i--) {
        var ch = tmpValue.charCodeAt(i);

        if ((ch == 32) || (ch == 45) || (ch == 46) || (ch == 64) || (ch == 95) || (ch == 44) || (ch == 63)) {

        } else if ((ch == 38) || (ch == 42) || (ch == 47)) { //******* block '/', '*', '&'
            errFlag = 1;
            break;
        } else if ((ch >= 33) && (ch <= 47) || (ch >= 58) && (ch <= 63) || (ch >= 91) && (ch <= 96) || (ch >= 123) && (ch <= 126)) {
            errFlag = 1;
            break;
        } else {
            errFlag = 0;
        }
    }
    if (errFlag == 1) {
        alert("Invaild Symbol"); //multi-lang
        EFDEF_id(args[0]).focus();
        EFDEF_id(args[0]).select();
        return false;
    } else {
        return true;
    }
}
function CheckCharKeyin(){	//bChar 1:0-9 a-z ' ','.','-','_','@' 0:0-9, min~max
	//args[0]	id
	//args[1]	type	//0 => number,  1 => string, 3 => string(only check length)	//default => 0
	//args[2]	min	//when type = 0 ,args[3] must != null, value must be between args[2] and args[3]
				//when type = 1 and args[3] = null, string length must be args[2]
				//when type = 1 and args[3] != null, string length must be between args[2] and args[3]
				//default => 0
	//args[3]	max	//default => 0
	//args[4]	msg	//alert error message you want to display(default => "")
	var args = arguments;
	var tmpValue = getIdValue(args[0]);
	var type = args[1]!=null?args[1]:0;
	var min = args[2]!=null?args[2]:0;
	var max = args[3]!=null?args[3]:0;
	var msg = args[4]!=null?args[4]:"";

	var len = tmpValue.length;
	var errFlag = 0;
	if(type != 3){
		for(var i = len - 1;i >= 0;i--){
			var ch = tmpValue.charCodeAt(i);
			if((ch >= 48) && (ch <= 57)){			//0-9
		  		//
			}else if((ch >= 65) && (ch <= 90)){		//A-Z
				if(type == 0){
					errFlag = 1;
				}
			}else if((ch >= 97) && (ch <= 122)){		//a-z
				if(type == 0){
					errFlag = 1;
				}
            } else if ((ch == 32) || (ch == 45) || (ch == 46) || (ch == 64) || (ch == 95) || (ch == 44) || (ch == 47) || (ch == 42) || (ch == 63)) {
				if(type == 0){
					errFlag = 1;
				}
			}else{
				errFlag = 1;
			}			
		}
	}
	if(errFlag == 1){
		if(type == 0){
			alert("Number Only");
		}else{
			alert("Characters must be 0-9, A-Z, a-z, ' ', '.', ',', '-', '_', '@', '/', '?', '*'");
		}
		EFDEF_id(args[0]).focus();
	 	EFDEF_id(args[0]).select();
	 	return false;
	}else{
  		if(type == 1 || type == 3){
  			if(max == 0){
  				if((len != min) && (min != 0)){
  					if(msg == ""){
  						alert("Length must be " + min );
  					}else{
  						alert(msg);
  					}
  					return false;
  				}
  			}else{
  				if(len < min || len > max){
  					if(msg == ""){
  						alert("Length must be between Min:" + min + ",Max:" + max);
  					}else{
  						alert(msg);
  					}
  					return false;
  				}
  			}	
  		}else{		
			if((tmpValue < min) || (tmpValue > max) && ((min + max) > 0)){
				if(msg == ""){
					alert("Min:" + min + ",Max:" + max);
				}else{
					alert(msg);
				}
				EFDEF_id(args[0]).focus();
				EFDEF_id(args[0]).select();
				return false;
			}
		}
	}
	return true;
}
function checkNum(val){
	return checkReg(val,/^[0-9]*$/);	//only check positive
}
function checkReg(val,reg){
	if(!reg.test(val)){
		return false;
	}
	return true;
}
function getIdSelectText(id,value){
	//args[0] : id
	//args[1] : value
	var args = arguments;
	if(args[1] != null){
		return EFDEF_id(args[0]).options[args[1]].text;
	}else{
		return EFDEF_id(args[0]).options[getIdValue(args[0])].text;
	}
}
function dynIframeSize(iframename,min_height) {
	var FFextraHeight = 0;
	//extra height in px to add to iframe in FireFox 1.0+ browsers
	if(isFF() || isChrome()){
		FFextraHeight = 8;
	}
	var pTar = EFDEF_id(iframename);

	if(pTar && !window.opera){
		//begin resizing iframe
		setIdDisplay(pTar,"block");
   
		if(pTar.contentDocument && pTar.contentDocument.body.offsetHeight){
			//ns6 syntax
			pTar.height = pTar.contentDocument.body.offsetHeight + FFextraHeight;
		}else if (pTar.Document && pTar.Document.body.scrollHeight){
			//ie5+ syntax
			pTar.height = pTar.Document.body.scrollHeight;
		}
		if(pTar.height < min_height){
			pTar.height = min_height;
		}
		return pTar.height;
	}
}
function resizeImg(id,width,height){
	var w = getIdWidth(id);
	var h = getIdHeight(id);
	var rate = 0;
	if(w > width || h > height){
		if(w > h){
			rate = width / w;
		}else{
			rate = height / h;
		}
		setIdWidth(id,w * rate);
		setIdHeight(id,h * rate);
		setIdStyleWidth(id,w * rate);
		setIdStyleHeight(id,h * rate);
	}else if(w == 0 && h == 0){
		//this case for chrome
		setIdWidth(id,width);
		setIdHeight(id,height);
		setIdStyleWidth(id,width);
		setIdStyleHeight(id,height);
	}
}
function reloadPage(){
	//args[0]	url
	//args[1]	target
	var args = arguments;
	if(args[1] != null){
		window.open(args[0],args[1]);
	}else{
		if(args[0] != null){
			window.location.href = args[0];
		}else{
			window.location.reload();
		}
	}
}
//=========================================================================================
function HandleSelect(){
	var args = arguments;
	this.obj = EFDEF_id(args[0]);
	if(args[1] != null){
		this.obj.options.length = args[1];
	}
}
HandleSelect.prototype.setLen = function(len){
	this.obj.options.length = len;
	return this;
};
HandleSelect.prototype.addOpt = function(){
	//args[0] : no
	//args[1] : text
	//args[2] : value
	//args[3] : defaultSelected
	//args[4] : selected
	var args = arguments;
	var ds = args[3]!=null?args[3]:false;
	var sd = args[4]!=null?args[4]:false;
	this.obj.options[args[0]] = new Option(args[1],args[2],ds,sd);
	return this;
};
HandleSelect.prototype.setValue = function(id_value){
	this.obj.value = id_value;
	return this;
};
//=========================================================================================
function HandleTable(){
	this.table = EFDEF_id(arguments[0]);
	this.tr;
	this.td;
	this.border(arguments[1]);
	this.spacing(arguments[2]);
	this.padding(arguments[3]);
}
HandleTable.prototype.border = function(val){
	if(val != null){
		this.table.border = val + "px";
	}else{
		return this.table.border;
	}
};
HandleTable.prototype.spacing = function(val){
	if(val != null){
		this.table.cellSpacing = val + "px";
	}else{
		return this.table.cellSpacing;
	}
};
HandleTable.prototype.padding = function(val){
	if(val != null){
		this.table.cellPadding = val + "px";
	}else{
		return this.table.cellPadding;
	}
};
HandleTable.prototype.getRowSize = function(){
	return this.table.rows.length;
};
HandleTable.prototype.getRows = function(){
	//args[0]	row index	if this is null,return all rows
	var args = arguments;
	if(args[0] != null){
		return this.table.rows[args[0]];
	}else{
		return this.table.rows;
	}
};
HandleTable.prototype.getColSize = function(rowNo){
	return this.table.rows[rowNo].cells.length;
};
HandleTable.prototype.getCols = function(){
	//args[0]	row index
	//args[1]	col index	if this is null,return all cols
	var args = arguments;
	if(args[1] != null){
		return this.table.rows[args[0]].cells[args[1]];
	}else{
		return this.table.rows[args[0]].cells;
	}
};
HandleTable.prototype.deleteRow = function(){
	var no = arguments[0]!=null?arguments[0]:-1;
	this.table.deleteRow(no);
};
HandleTable.prototype.insertRow = function(){
	var no = arguments[0]!=null?arguments[0]:-1;
	this.tr = this.table.insertRow(no);
	return new EFDEF_.fn(this.tr);
};
HandleTable.prototype.insertBefore = function(newNode,targetNode){
	targetNode.parentNode.insertBefore(newNode,targetNode);
};
HandleTable.prototype.insertAfter = function(newNode,targetNode){	
	var parent = targetNode.parentNode;
	if(parent.lastChild == targetNode){
		parent.appendChild(newNode);
	}else{
		parent.insertBefore(newNode,targetNode.nextSibling);
	}
};
HandleTable.prototype.insertCell = function(){
	var no = arguments[0]!=null?arguments[0]:-1;
	this.td = this.tr.insertCell(no);
	return new EFDEF_.fn(this.td);
};
HandleTable.prototype.clear = function(){
	//args[0]		A few rows remain.If this is null,the table will be empty.	default:0
	var args = arguments;
	var tmpEnd = args[0]!=null?args[0]:0;
	var len = this.table.rows.length;
	for(i = len;i > tmpEnd;i--){
		this.table.deleteRow(i-1);
	}
};
//deal with cookie=======================================================================
function setCookie(c_name,value,expire_sec){
	var exdate = new Date();
	exdate.setTime(exdate.getTime() + (expire_sec!=null?expire_sec:1000*60*60*24*365*5));//5 years
	document.cookie = c_name+ "=" + escape(value) + ";expires=" + exdate.toGMTString();
}
function getCookie(c_name){
	if(document.cookie.length > 0){
		var c_start = document.cookie.indexOf(c_name + "=");
		if (c_start!=-1){
			c_start = c_start + c_name.length + 1;
			c_end = document.cookie.indexOf(";",c_start);
			if(c_end==-1){
				c_end = document.cookie.length;
			}
		return unescape(document.cookie.substring(c_start,c_end));
		} 
	}
	return "";
}
function unsetCookie(c_name){
	document.cookie = c_name+ "=";
}
//=========================================================================================
function globalEval(data){
	var head = document.getElementsByTagName("head")[0] || document.documentElement,
	script = document.createElement("script");
	script.type = "text/javascript";
	script.text = data;
	// Use insertBefore instead of appendChild  to circumvent an IE6 bug.
	// This arises when a base node is used (#2709).
	head.insertBefore( script, head.firstChild );
	head.removeChild( script );
}
function getPara(para){
	var s = unescape(window.location.href); 
	var arr = s.match(para + "=([^&]*)"); 
	if(arr == null){
		return null; 
	}else{
		return arr[1]; 
	}
}
function getTimeSec(){
	//args[0] : year
	//args[1] : month
	//args[2] : day
	//args[3] : hour
	//args[4] : minute
	//args[5] : second
	//args[6] : UTC	default:true
	var args = arguments;
	var tmpY = args[0]!=null?args[0].toInt():1970;
	var tmpM = args[1]!=null?args[1].toInt():1;
	var tmpD = args[2]!=null?args[2].toInt():0;
	var tmpH = args[3]!=null?args[3].toInt():0;
	var tmpMin = args[4]!=null?args[4].toInt():0;
	var tmpS = args[5]!=null?args[5].toInt():0;
	var utcFlag = args[6]!=null?args[6].toInt():true;
	
	if(utcFlag){
		return Date.UTC(tmpY,tmpM - 1,tmpD,tmpH,tmpMin,tmpS) / 1000;
	}else{
		tmpDate = new Date(tmpY,tmpM - 1,tmpD,tmpH,tmpMin,tmpS);
		return tmpDate.getTime() / 1000;
	}
}
function dynLoad(elem,url){
	var head = document.getElementsByTagName("head")[0]; 
	if(elem == "link"){
		var css = document.createElement('link');
		css.type = 'text/css';
		css.rel = "stylesheet";
		css.href = url;
		head.appendChild(css);
	}else if(elem == "script"){
		var js = document.createElement('link');
		js.type = 'text/javascript';
		js.src= url;
		head.appendChild(js);
	}
}
function showMsg(msg,assignId){
	if(g_util_debug_mode){
		var ht;	
		if(document.getElementById(g_bug_id) == null){
			var tmpDiv = EFDEF_create("div").id(g_bug_id).overflow("auto").position("absolute").width(260).height(300).top(5).left(5).bgColor("#CCCCCC").zIndex(98).obj;
			document.body.appendChild(tmpDiv);
			tmpDiv.appendChild(EFDEF_create("div").textAlign("center").color("#FFFF00").bgColor("#0000FF").innerHTML("Message List")
						.ondblclick(function(){
								if(getIdStyleWidth(g_bug_id) > 300){
									setIdStyleWidth(g_bug_id,260);
									setIdStyleHeight(g_bug_id,300);
								}else{
									setIdStyleWidth(g_bug_id,700);
									setIdStyleHeight(g_bug_id,700);
								}
							})
						.onmouseover(function(){setIdCursor(this,"move");})
						.onmousedown(function(e){
								e = e || event;
								g_bug_flag = 1;
								g_bug_top = e.clientY - getIdTop(g_bug_id);
								g_bug_left = e.clientX - getIdLeft(g_bug_id);
							})
						.onmousemove(function(e){
								if(g_bug_flag == 1){
									e = e || event;
									var tmpX = e.clientX - g_bug_left;
									var tmpY = e.clientY - g_bug_top;
									setIdTop(g_bug_id,tmpY);
									setIdLeft(g_bug_id,tmpX);
								}
							})
						.onmouseout(function(){g_bug_flag = 0;})
						.onmouseup(function(){g_bug_flag = 0;})
						.obj);
			tmpDiv.appendChild(EFDEF_create("div").textAlign("left").color("#000000")
						.appendChild(
								EFDEF_create("a").href("#").margin("5px",2).innerHTML("hide")
									.onclick(function(){
											setIdStyleHeight(g_bug_id,40);
											setIdOverflow(g_bug_id,"hidden");
										})
									.obj
							)
						.appendChild(
								EFDEF_create("a").href("#").margin("5px",2).innerHTML("show")
									.onclick(function(){
											setIdStyleHeight(g_bug_id,300);
											setIdOverflow(g_bug_id,"auto");
										})
									.obj
							)
						.appendChild(
								EFDEF_create("a").href("#").margin("5px",2).innerHTML("clear")
									.onclick(function(){
											ht.clear();
										})
									.obj
							)
						.appendChild(
								EFDEF_create("a").href("#").innerHTML("close").margin("5px",2)
									.onclick(function(){
											document.body.removeChild(EFDEF_id(g_bug_id));
										})
									.obj
							)
						.obj);
			if(g_util_debug_admin){
				tmpDiv.appendChild(EFDEF_create("div").innerHTML("<input type='text' id='" + g_bug_search_id + "'/>"
									+ "<input type='button' id='" + g_bug_search_btn_id + "' value='execute'>")
						.obj);
				EFDEF_(g_bug_search_btn_id).onclick(function (){
								if(getIdValue(g_bug_search_id) != ""){
									try{
										globalEval(getIdValue(g_bug_search_id));
									}catch(oError){
										showMsg("Access error!");	
									}
								}
							});
			}
			tmpDiv.appendChild(EFDEF_create("div").id(g_bug_div_id).bgColor("#CCCCCC")
						.appendChild(EFDEF_create("table").id(g_bug_tbl_id).width(280).obj)
						.obj);
		}
		ht = new HandleTable(g_bug_tbl_id);
		var tmpMsg = msg.toString().replaceAll("><",">\n<").replaceAll("<","&lt;").replaceAll(">","&gt;").nl2br()
		if(assignId == null){
			ht.insertRow(0);
				ht.insertCell().border("solid 1px #000000",1)
					.innerHTML("&nbsp;" + g_bug_counter + ". &nbsp;" + tmpMsg + "&nbsp;");
			g_bug_counter++;
		}else{
			if(document.getElementById(assignId) == null){
				ht.insertRow(0);
					ht.insertCell().id(assignId).border("solid 1px #000000",1)
						.innerHTML("&nbsp;" + assignId+ ". &nbsp;" + tmpMsg + "&nbsp;");
			}else{
				setIdInnerHTML(assignId,"&nbsp;" + assignId+ ". &nbsp;" + tmpMsg + "&nbsp;");
			}
		}
	}
}

// 功用: 	解析 http://www.go.com/index.html?paraA=2&paraB=3
// 		httpStr -> http://www.go.com/index.html?paraA=2&paraB=3 
// exam: 	parsehttp(httpStr,"paraA") , return 2 ; parsehttp(httpStr,"paraB") return 3; 
function parseHttp(httpStr, para)
{
	var Re = new RegExp(para+"=[0-9]*");
	var Re2 = new RegExp("[0-9]+");
	return Re2.exec(Re.exec(httpStr));
}

//addbyalec04302010
//取得 字串 pfx, 加上val 數字的值,
//回傳值為 "CH01"..."CH10","CH11"
function getPrefixCH(pfx,val,remain)
{
	//arg[0] "CH"
	//arg[1]  value
	//arg[2] divisor 除數,預設=4
	if(arguments[2]==null)
		remain=4;
	var newval=0;
	var pre="";
	if(bFlexTest==true)
		newval = (val==0?0:((val+(remain-1))%remain)+1);
	else
		newval=val;
	if(newval>=10)
		pre=pfx;
	else
		pre=pfx+"0";
	return pre+newval;
}
function disableSelection(target) {
    if (typeof target.onselectstart != "undefined") //IE route
        target.onselectstart = function () { return false }
    else if (typeof target.style.MozUserSelect != "undefined") //Firefox route
        target.style.MozUserSelect = "none"
    else //All other route (ie: Opera)
        target.onmousedown = function () { return false }
    target.style.cursor = "default"
}


function CheckSelectValue(id, value) {
    var length = getSelectLength(id);
    var flag = false;
    var obj = EFDEF_id(id);
    for (var cnt = 0; cnt < length; cnt++) {
        if (obj.options[cnt].value == value) {
            flag = true;
            break;
        }
    }

    return flag;
}
function getSelectLength(id) {//20130515 julia add
    return EFDEF_id(id).length;
}
function setSelectIndex(id,val) {
    EFDEF_id(id).selectedIndex = val;
}
function cutLongStr(id,str) {
    var rstStr;
    if (str.length > 20) {
        rstStr = str.substr(0, 17) + "...";
        setIdTitle(id, str);
    } else {
        rstStr = str;
    }
    //return rstStr;
    setIdInnerHTML(id, rstStr);
    
}
//-->