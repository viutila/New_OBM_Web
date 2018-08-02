function AlarmTable(){
	/*
	need use utility.jsp AlarmTable.css HandleXml.js
	sync xml format:
	<SCHEDULE>
		<ALARM00>
			<HOL>
				<ZONE0>
					<ST></ST>
					<TYP></TYP>
				</ZONE0>
				~~~~~~~~
				<ZONE5>
				</ZONE5>
			</HOL>
		</ALARM00>
	</SCHEDULE>
	*/
	//args[0]	container id
	//args[1]	sync xml dom
	//args[2]	table width		default:550
	//args[3]	table height		default:550
	//args[4]	HandleLanghage object
	var args = arguments;
	this.containerId = args[0];
	this.hx = args[1];
	this.tabWidth = args[2]!=null?args[2]:550;
	this.tabHeight = args[3]!=null?args[3]:550;
	this.hl = args[4];
	
	//keyword
	this.idKey = "at_";
	this.classKey = "at_";
	//photo path
	this.path = "../img/";
	//Xml days array
	this.daysAry = new Array();
	this.daysAry2 = new Array();
	//all table array
	this.tabSubAry = new Array();
	//focus on which row or td
	this.focusRow = "";
	this.focusTd = "";
	//for aim line
	this.imgTop;
	this.adjustAimTop = isFF()||isChrome()?10:0;
	this.adjustAimLeft = 2;
	this.adjustAimHeight = isFF()?20:20;
	//for block
	this.adjustBlockTop = isFF()||isChrome()?-2:8;
	//select camera No
	this.camTag = "";

	//check repeat no
	this.no = 0;
	//setup id
	this.tabId;
	this.imgId;
	this.tabInfoId;
	this.infoId;
	this.aimId;
	this.blockId;
	this.sysId;
	
	//setup class
	this.tabClass;
	this.tabSubClass;
	this.tabSubSelClass;
	this.tdOffClass;
	this.tdOnClass;
	this.tabInfoClass;
	this.imgClass;
	this.tdLeftClass;
	this.tdLeftUpClass;
	this.infoClass;
	this.infoOffClass;
	this.infoOnClass;
	this.aimClass;
	this.blockClass;
	if(args.length > 0){
		this.init();
	}
}
AlarmTable.prototype.init = function(){
	this.setMembers();
	this.appendSkin();
	this.setToolRow();
};
AlarmTable.prototype.setMembers = function(){
	while(document.getElementById(this.idKey + "tab" + this.no)){
		this.no++;
	}
	//setup id
	this.tabId = this.idKey + "tab" + this.no;
	this.imgId = this.idKey + "img" + this.no;
	this.tabInfoId = this.idKey + "tab_info" + this.no;
	this.infoId = this.idKey + "info" + this.no;
	this.aimId = this.idKey + "aim" + this.no;
	this.blockId = this.idKey + "block" + this.no;
	this.sysId = "AlarmTable" + this.no;
	window[this.sysId] = this;
	//setup class
	this.tabClass = this.classKey + "tab";
	this.tabSubClass = this.classKey + "tab_Sub";
	this.tabSubSelClass = this.classKey + "tab_Sub_Sel";
	this.tdOffClass = this.classKey + "td_off";
	this.tdOnClass = this.classKey + "td_on";
	this.tabInfoClass = this.classKey + "tab_info";
	this.imgClass = this.classKey + "img";
	this.tdLeftClass = this.classKey + "td_Left";
	this.tdLeftUpClass = this.classKey + "td_Left_Up";
	this.infoClass = this.classKey + "info";
	this.infoOffClass = this.classKey + "info_off";
	this.infoOnClass = this.classKey + "info_on";	
	this.aimClass = this.classKey + "aim";
	this.blockClass = this.classKey + "block";
};
AlarmTable.prototype.appendSkin = function(){
	var obj = this;
	var skin = "";
	skin += 	'<table id="' + this.tabId + '" class="' + this.tabClass + '" width="' + this.tabWidth + '" border="0" cellspacing="3" cellpadding="0">';
	skin += 		'<tr>';
	skin += 			'<td class="' + this.tdLeftUpClass + '"></td>';
	skin += 			'<td colSpan="48" class="' + this.imgClass + '"><img id="' + this.imgId + '" src="' + this.path + '/ruler.bmp"/></td>';
	skin += 		'</tr>';
	skin += 	'</table>';
	skin += 	'<table id="' + this.tabInfoId + '" class="' + this.tabInfoClass + '" width="' + this.tabWidth + '" border="0" cellspacing="2" cellpadding="0"></table>';
	skin +=		'<div id="' + this.aimId + '" class="' + this.aimClass + '" style="position:absolute;visibility: hidden;"></div>';
	skin +=		'<div id="' + this.blockId + '" class="' + this.blockClass + '" style="position:absolute;visibility: hidden;"></div>';
	
	setIdInnerHTML(this.containerId,skin);
	
	this.imgTop = getIdTop(this.imgId);
	
	EFDEF_(this.blockId).onclick(
				function(){
					obj.openAimLine();
					obj.selectRow();
					obj.setInfo();
				})
			.ondblclick(
				function(){
					obj.createNewStatus();
					obj.setInfo();
				})
			.onblur(function(){
						obj.closeAimLine();
				});
};
AlarmTable.prototype.setRow = function(camNo,tag_name,show_name){
	this.camTag = "ALARM" + camNo.toFill(2);
	this.daysAry.push(tag_name);
	this.daysAry2.push(show_name);
	this.setRowUI(tag_name,show_name);
};
AlarmTable.prototype.setRowUI = function(tag_name,show_name){
	var obj = this;
	var ht = new HandleTable(this.tabId);
	ht.insertRow();
		ht.insertCell().id("td_" + tag_name)
				//.attr("noWrap",true)
				.className(this.tdLeftClass)
				.innerHTML("&nbsp;" + show_name + "&nbsp;");
		ht.insertCell().attr("colSpan",48)
				.className(this.tabSubClass)
				.innerHTML('<table id="tab_' + tag_name + '" class="' + this.tabSubClass + '" width="100%" border="0" cellspacing="0" cellpadding="0"></table>');		
	this.tabSubAry.push("tab_" + tag_name);
		
	var ht2 = new HandleTable("tab_" + tag_name);
	ht2.insertRow();
		
	for(var i = 0;i < 48;i++){
		ht2.insertCell().id("td_" + tag_name + "_" + i)
				.width(2,"%")
				.className(this.tdOffClass)
				.innerHTML("&nbsp;")
				.onclick(function(){
						obj.selectRow();
						obj.openAimLine();
						obj.setInfo();
					})
				.ondblclick(function(){
						obj.createNewStatus();
						obj.setInfo();
					})
				.onmouseover(function(){
						obj.openBlock(this);
					});
	}
	var tmpObj;
	var tmpType;
	var tmpStart;
	var tmpEnd;
	var str = "";
	for(var i = 0;i < 6;i++){
		str = "ZONE" + i.toFill(2);
		tmpType = this.hx.getNodeValue(this.camTag,tag_name,str,"TYP");
		tmpStart = this.hx.getNodeValue(this.camTag,tag_name,str,"ST").toInt();
		for(var j = tmpStart;j < 48;j++){
			if(tmpType == "0"){
				setIdClass("td_" + tag_name + "_" + j,this.tdOffClass);
			}else if(tmpType == "1"){
				setIdClass("td_" + tag_name + "_" + j,this.tdOnClass);
			}
		}
		if(tmpStart < 48){
			setIdInnerHTML("td_" + tag_name + "_" + tmpStart,i + 1);
		}
	}
};
AlarmTable.prototype.setToolRow = function(){
	var ht = new HandleTable(this.tabInfoId);

	ht.insertRow();
		ht.insertCell().id(this.infoId)
				.width(this.tabWidth.toInt() - 50 * 5)
				.attr("noWrap","true")
				.className(this.infoClass)
				.innerHTML("&nbsp;");
		ht.insertCell().width(50)
				.className(this.infoOffClass)
				.attr("noWrap","true")
				.innerHTML(this.hl.get("OFF"));
		ht.insertCell().width(50)
				.className(this.infoOnClass)
				.attr("noWrap","true")
				.innerHTML(this.hl.get("ON"));
};
AlarmTable.prototype.setInfo = function(){
	var tmpStr = "";
	var tag_name = this.focusTd.id.split("_")[1];
	var no = this.getCurrentXmlNode();
	var str = "ZONE" + no.toFill(2);
	
	var tmpInfo = "&nbsp;";
	tmpInfo += this.changeSysTimeFormat(this.hx.getNodeValue(this.camTag,tag_name,str,"ST"));
	tmpInfo += " - ";
	if(no > 4){
		tmpInfo += "24:00";
	}else{
		tmpInfo += this.changeSysTimeFormat(this.hx.getNodeValue(this.camTag,tag_name,"ZONE" + (no + 1).toFill(2),"ST"));
	}
	tmpInfo += " , ";
	if(this.hx.getNodeValue(this.camTag,tag_name,str,"TYP") == "0"){
		tmpInfo += "Alarm : OFF";
	}else{
		tmpInfo += "Alarm : ON";
	}
	
	setIdInnerHTML(this.infoId,tmpInfo);
};
AlarmTable.prototype.clearInfo = function(){
	setIdInnerHTML(this.infoId,"");
};
AlarmTable.prototype.initTabSubClass = function(){
	for(var i = 0;i < this.tabSubAry.length;i++){
		setIdClass(this.tabSubAry[i],this.tabSubClass);
	}
};
AlarmTable.prototype.selectRow = function(){
	this.initTabSubClass();
	this.focusRow = this.focusTd.id.split("_")[1];
	setIdClass("tab_" + this.focusTd.id.split("_")[1],this.tabSubSelClass);
};
AlarmTable.prototype.createNewStatus = function(){
	var tag_name = this.focusTd.id.split("_")[1];
	var no = this.focusTd.id.split("_")[2];
	var tmpEnableXmlNode = this.getEnableXmlNode();
	var tmpClass;
	if(tmpEnableXmlNode < 6){
		tmpClass = this.getNextClass();
		for(var i = no; i < 48;i++){
			setIdClass("td_" + tag_name + "_" + i,tmpClass);
			setIdInnerHTML("td_" + tag_name + "_" + i,"&nbsp;");
		}
		this.syncXml(tmpEnableXmlNode);
		if(no < 48){
			setIdInnerHTML("td_" + tag_name + "_" + no,tmpEnableXmlNode + 1);
		}
	}
};
AlarmTable.prototype.syncXml = function(enableXmlNode){
	var tag_name = this.focusTd.id.split("_")[1];
	var no = this.focusTd.id.split("_")[2];
	var tmpClass = getIdClass(this.focusTd);
	var tmpType = 0;
	var str = "";

	if(tmpClass == this.tdOffClass){
		tmpType = 0;
	}else if(tmpClass == this.tdOnClass){
		tmpType = 1;
	}

	str = "ZONE" + enableXmlNode.toFill(2);
	this.hx.setNodeValue(no,this.camTag,tag_name,str,"ST")
		.setNodeValue(tmpType,this.camTag,tag_name,str,"TYP");
	
	
	for(var i = enableXmlNode + 1;i < 6;i++){
		str = "ZONE" + i.toFill(2);
		this.hx.setNodeValue(0,this.camTag,tag_name,str,"TYP")
			.setNodeValue(48,this.camTag,tag_name,str,"ST");
	}
};
AlarmTable.prototype.changeSysTimeFormat = function(sysTime){
	var tmpSysTime = sysTime.toInt() * 30;
	var tmpHr = 0;
	var tmpMin = 0;
	
	tmpMin = tmpSysTime % 60;
	tmpHr = (tmpSysTime - tmpMin) / 60;
	
	return tmpHr.toFill(2) + ":" + tmpMin.toFill(2);
};
AlarmTable.prototype.getNextClass = function(){
	var currentClass = getIdClass(this.focusTd);
	if(currentClass == this.tdOffClass){
		currentClass = this.tdOnClass;
	}else{
		currentClass = this.tdOffClass;
	}
	return currentClass;
};
AlarmTable.prototype.getCurrentXmlNode = function(){
	var tag_name = this.focusTd.id.split("_")[1];
	var no = this.focusTd.id.split("_")[2];
	var tmpFlag = -1;
	var tmpStart = 0;
	var tmpEnd = 0;
	var str = "";

	for(var i = 0;i < 6;i++){
		str = "ZONE" + i.toFill(2);
		tmpStart = this.hx.getNodeValue(this.camTag,tag_name,str,"ST").toInt();
		if(no >= tmpStart){
			tmpFlag++;
		}else{
			break;
		}
	}
	return tmpFlag;
};
AlarmTable.prototype.getEnableXmlNode = function(){
	var tag_name = this.focusTd.id.split("_")[1];
	var no = this.focusTd.id.split("_")[2];
	var tmpFlag = 0;
	var tmpStart = 0;
	var str = "";

	if(no != 0){
		for(var i = 0;i < 6;i++){
			str = "ZONE" + i.toFill(2);
			tmpStart = this.hx.getNodeValue(this.camTag,tag_name,str,"ST").toInt();
			if(no > tmpStart){
				tmpFlag++;
			}
		}
	}
	return tmpFlag;
};
AlarmTable.prototype.clearAlarmTable = function(){
	var ht = new HandleTable(this.tabId);
	ht.clear(1);
	this.focusRow = "";
	this.focusTd = "";
};
AlarmTable.prototype.openAimLine = function(){
	////var tmpAimHeight;
	////tmpAimHeight = getIdTop(this.focusTd) - this.imgTop + this.adjustAimHeight;
	setIdTop(this.aimId,this.imgTop + this.adjustAimTop -90);
	setIdLeft(this.aimId,getIdLeft(this.focusTd) + this.adjustAimLeft -50);
	////getIdStyle(this.aimId).height = tmpAimHeight + 'px';
	setIdVisibility(this.aimId,1);
};
AlarmTable.prototype.closeAimLine = function(){
	setIdVisibility(this.aimId,0);
};
AlarmTable.prototype.openBlock = function(focusObj){
	this.focusTd = focusObj;
	setIdTop(this.blockId,getIdTop(focusObj) - this.adjustBlockTop -90);
	setIdLeft(this.blockId,getIdLeft(focusObj) + 2 -50);
	setIdVisibility(this.blockId,1);
};
AlarmTable.prototype.closeBlock = function(){
	setIdVisibility(this.blockId,0);
};
AlarmTable.prototype.syncDays = function(){
	//args[0]	copy to which day	default: all days
	var args = arguments;
	var toDay = args[0];
	if(this.focusRow != ""){
		var tag_name = this.focusRow;
		var toTag;
		var str;
		var tmpType;
		var tmpStart;
		var tmpAction;
		var tmpRes;
		var tmpNormal;
		var tmpEvent;

		for(var i = 0;i < this.daysAry.length;i++){
			if(toDay != null){
				toTag = this.daysAry[toDay];
			}else{
				toTag = this.daysAry[i];
			}
			if(toTag != tag_name){
				var tmpFrom = this.hx.getNode(this.camTag,tag_name);
				var tmpTo = this.hx.getNode(this.camTag,toTag);
				this.hx.cloneNodeChild(tmpFrom,tmpTo);
			}
			if(toDay != null){
				break;
			}
		}
		if(toDay == null){
			this.refresh();
		}		
	}else{
		alert("Please choose a date!");
	}
};
AlarmTable.prototype.syncCameras = function(no){
	var tmpStr = "ALARM" + no.toFill(2);
	
	if(tmpStr != this.camTag){
		var tmpFrom = this.hx.getNode(this.camTag);
		var tmpTo = this.hx.getNode(tmpStr);
		this.hx.cloneNodeChild(tmpFrom,tmpTo);
	}
};
AlarmTable.prototype.refresh = function(){
	this.clearAlarmTable();
	for(var i = 0;i < this.daysAry.length;i++){
		this.setRowUI(this.daysAry[i],this.daysAry[i]);
	}
};