<!--
function ScheduleTable(){
	/*
	need use utility.jsp ScheduleTable.css HandleXml.js
	sync xml format:
	<SCHEDULE>
		<Camera01>
			<Holiday>
				<Zone01>
					<startTime></startTime>
					<resolution></resolution>
					<action></action>
					<recordType></recordType>
					<normalFPS></normalFPS>
					<eventFPS></eventFPS>
				</Zone01>
				~~~~~~~~
				<Zone05>
				</Zone05>
			</Holiday>
		</CAMERA00>
		
		
	</SCHEDULE>
	*/
	//args[0]	container id
	//args[1]	sync xml dom
	//args[2]	table width		default:550
	//args[3]	table height		default:550
	//args[4]	edit table offsetTop	default:40
	//args[5]	edit table offsetLeft	default:20
	//args[6]	edit table width	default:650
	//args[7]	edit table height	default:300
	//args[8]	HandleLanghage object
	var args = arguments;
	this.containerId = args[0];
	this.hx = args[1];
	this.tabWidth = args[2]!=null?args[2]:550;
	this.tabHeight = args[3]!=null?args[3]:550;
	this.editTop = args[4]!=null?args[4]:10;
	this.editLeft = args[5]!=null?args[5]:40;
	this.editWidth = args[6]!=null?args[6]:650;
	this.editHeight = args[7]!=null?args[7]:400;
	this.hl = args[8];
	
	//keyword
	this.idKey = "st_";
	this.classKey = "st_";
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
	//drag & drop
	this.dragFlag = 0;
	this.barRelativeTop;
	this.barRelativeLeft;
	//for aim line
	this.imgTop;
	this.adjustAimTop = isFF() || isChrome()?-5:0;
	this.adjustAimLeft = 0;
	this.adjustAimHeight = isFF()?20:20;
	//for block
	this.adjustBlockTop = isFF()||isChrome()?-2:8;
	//select camera No
	this.camTag = "";
	//HD CAMERA
	//this.hdcam;
	//check repeat no
	this.no = 0;
	//setup id
	this.tabId;
	this.imgId;
	this.tabInfoId;
	this.editId;
	this.barId;
	this.infoId;
	this.btnId;
	this.aimId;
	this.blockId;
	this.sysId;
	
	//setup class
	this.tabClass;
	this.tabSubClass;
	this.tabSubSelClass;
	this.editClass;
	this.tdEditClass;
	this.tdEditNoClass;
	this.barClass;
	this.tabInfoClass;
	this.imgClass;
	this.tdLeftClass;
	this.tdLeftUpClass;
	this.tdNoRecClass;
	this.tdEventClass;
	this.tdNormalEventClass;
	this.infoClass;
	this.infoNoRecClass;
	this.infoEventClass;
	this.infoNormalEventClass;
	this.btnClass;
	this.aimClass;
	this.blockClass;
    this.applybtnid;

    //******** adjust parameters
    //this.adjustTop1 = isFF() || isChrome()?87:82;
    if (isChrome()){
        this.adjustTop1 = 87;
    }else if (isFF()){
        this.adjustTop1 = 89;
    }else{
        this.adjustTop1 = 82;
    }
    //this.adjustTop2 = 56;
    if (isChrome()){
        this.adjustTop2 = 43;
    }else if (isFF()){
        this.adjustTop2 = 40;
    }else{
        this.adjustTop2 = 44;
    }
    //this.adjustLeft1 = isFF() || isChrome()?137:141;
    if (isChrome()){
        this.adjustLeft1 = 137;
    }else if (isFF()){
        this.adjustLeft1 = 139;
    }else{
        this.adjustLeft1 = 141;
    }

	if(args.length > 0){
		this.init();
	}
}
ScheduleTable.prototype.init = function(){
	this.setMembers();
	this.appendSkin();
	this.setToolRow();
};
ScheduleTable.prototype.setMembers = function(){
	while(document.getElementById(this.idKey + "tab" + this.no)){
		this.no++;
	}
	//setup id
	this.tabId = this.idKey + "tab" + this.no;
	this.imgId = this.idKey + "img" + this.no;
	this.tabInfoId = this.idKey + "tab_info" + this.no;
	this.infoId = this.idKey + "info" + this.no;
	this.editId = this.idKey + "edit" + this.no;
	this.barId = this.idKey + "bar" + this.no;
	this.btnId = this.idKey + "btn" + this.no;
    this.applybtnid = this.idKey + "btnapply" + this.no;
	this.aimId = this.idKey + "aim" + this.no;
	this.blockId = this.idKey + "block" + this.no;
	this.sysId = "ScheduleTable" + this.no;
	window[this.sysId] = this;
	//setup class
	this.tabClass = this.classKey + "tab";
	this.tabSubClass = this.classKey + "tab_Sub";
	this.tabSubSelClass = this.classKey + "tab_Sub_Sel";
	this.editClass = this.classKey + "tab_edit";
	this.tdEditClass = this.classKey + "tab_td_edit";
	this.tdEditNoClass = this.classKey + "tab_td_edit_No";
	this.barClass = this.classKey + "bar";
	this.tabInfoClass = this.classKey + "tab_info";
	this.imgClass = this.classKey + "img";
	this.tdLeftClass = this.classKey + "td_Left";
	this.tdLeftUpClass = this.classKey + "td_Left_Up";
	this.tdNoRecClass = this.classKey + "td_No_Rec";
	this.tdEventClass = this.classKey + "td_Event";
	this.tdNormalEventClass = this.classKey + "td_Normal_Event";
	this.infoClass = this.classKey + "info";
	this.infoNoRecClass = this.classKey + "info_No_Rec";
	this.infoEventClass = this.classKey + "info_Event";
	this.infoNormalEventClass = this.classKey + "info_Normal_Event";
	this.btnClass = this.classKey + "btn";
	this.aimClass = this.classKey + "aim";
	this.blockClass = this.classKey + "block";
};
ScheduleTable.prototype.appendSkin = function(){
	var obj = this;
	var skin = "";
	skin += 	'<table id="' + this.tabId + '" class="' + this.tabClass + '" width="' + this.tabWidth + '" border="0" cellspacing="3" cellpadding="0">';
	skin += 		'<tr>';
	skin += 			'<td class="' + this.tdLeftUpClass + '"></td>';
	skin += 			'<td colSpan="48" class="' + this.imgClass + '"><img id="' + this.imgId + '" src="' + this.path + '/ruler.bmp"/></td>';
	skin += 		'</tr>';
	skin += 	'</table>';
	skin += 	'<table id="' + this.tabInfoId + '" class="' + this.tabInfoClass + '" width="' + this.tabWidth + '" border="0" cellspacing="2" cellpadding="0"></table>';
	skin += 	'<table id="' + this.editId + '" class="' + this.editClass + '" width="' + this.editWidth + '" height="' + this.editHeight + '" border="0" cellspacing="0" cellpadding="0" style="top: ' + this.editTop + 'px;left: ' + this.editLeft + 'px;position:absolute;width: ' + this.editWidth + 'px;height: ' + this.editHeight + 'px;visibility: hidden;">';
	skin += 		'<tr>';
	skin +=				"<td id='" + this.barId + "' colspan='9' class='" + this.barClass + "'>" + this.hl.get("EDIT_TIMEZONE") + "</td>";
	skin += 		'</tr>';
	skin += 	'</table>';
	skin +=		'<div id="' + this.aimId + '" class="' + this.aimClass + '" style="position:absolute;visibility: hidden;"></div>';
	skin +=		'<div id="' + this.blockId + '" class="' + this.blockClass + '" style="position:absolute;visibility: hidden;"></div>';
	
	setIdInnerHTML(this.containerId,skin);
	
	this.imgTop = getIdTop(this.imgId);
	
	setIdOnmousedown(this.barId,function(e){
						e = e || event;
						obj.dragFlag = 1;
						obj.barRelativeTop = e.clientY - getIdTop(obj.editId) -50;
						obj.barRelativeLeft = e.clientX - getIdLeft(obj.editId);
					});
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
					if(!obj.checkFps(obj.focusRow)){
						setIdDisabled("btn_Save",1);
						alert("overflow");
					}else{
						setIdDisabled("btn_Save",0);
					}
				})
			.onblur(
				function(){
					obj.closeAimLine();
				});
};
ScheduleTable.prototype.setRow = function(camNo,tag_name,show_name){
	this.camTag = "Camera" + camNo.toFill(2);
	this.daysAry.push(tag_name);
	this.daysAry2.push(show_name);
	this.setRowUI(tag_name,show_name);
};
ScheduleTable.prototype.setRowUI = function(tag_name,show_name){
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
				.className(this.tdNormalEventClass)
				.innerHTML("&nbsp;")	
				.onclick(function(){
						obj.selectRow();
						obj.openAimLine();
						obj.setInfo();
					})
				.ondblclick(function(){
						obj.createNewStatus();
						obj.setInfo();
						if(!obj.checkFps(obj.focusRow)){
							setIdDisabled("btn_Save",1);
							alert("overflow");
						}else{
							setIdDisabled("btn_Save",0);
						}
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
	for(var i = 1;i <= 6;i++){
		str = "Zone" + i.toFill(2);
		tmpType = this.hx.getNodeValue(this.camTag,tag_name,str,"recordType");
		tmpStart = this.hx.getNodeValue(this.camTag,tag_name,str,"startTime").toInt();
		
		for(var j = tmpStart;j < 48;j++){
			if(tmpType == "0"){
				setIdClass("td_" + tag_name + "_" + j,this.tdNoRecClass);
			}else if(tmpType == "1"){
				setIdClass("td_" + tag_name + "_" + j,this.tdEventClass);
			}else if(tmpType == "2"){
				setIdClass("td_" + tag_name + "_" + j,this.tdNormalEventClass);
			}
		}
		if(tmpStart < 48){
			setIdInnerHTML("td_" + tag_name + "_" + tmpStart,i);//zone的編號由1開始
		}
	}
};
ScheduleTable.prototype.setToolRow = function(){
	//var ht = new HandleTable(this.tabInfoId,0,5);
	var ht = new HandleTable(this.tabInfoId,0,3);//20100802 Ruby modify

	ht.insertRow();
		//ht.insertCell().width(this.tabWidth.toInt() - 100).innerHTML("&nbsp;");
		ht.insertCell().innerHTML("&nbsp;");
		ht.insertCell()//.width(150)
				.className(this.infoNoRecClass)
				.attr("noWrap","true")
				.innerHTML(this.hl.get("NO_RECORD"));
		ht.insertCell()//.width(150)
				.className(this.infoEventClass)
				.attr("noWrap","true")
				.innerHTML(this.hl.get("EVENT_ONLY"));
		ht.insertCell()
				.className(this.infoNormalEventClass)
				.attr("noWrap","true")
				.innerHTML(this.hl.get("NORMAL") + "+" +this.hl.get("EVENT"));
	ht.insertRow();
		ht.insertCell().id(this.infoId)
				.attr("noWrap","true")
				.attr("colSpan","4")
				.className(this.infoClass)
				.innerHTML("&nbsp;");
};
ScheduleTable.prototype.setInfo = function(){
	var tmpStr = "";
	var tag_name = this.focusTd.id.split("_")[1];
	var no = this.getCurrentXmlNode();
	var str = "Zone" + no.toFill(2);
	
	var tmpInfo = "&nbsp;";
	tmpInfo += this.changeSysTimeFormat(this.hx.getNodeValue(this.camTag,tag_name,str,"startTime"));
	tmpInfo += "-";
	if(no > 5){//到最後一個zone
		tmpInfo += "24:00";
	}else{
		tmpInfo += this.changeSysTimeFormat(this.hx.getNodeValue(this.camTag,tag_name,"Zone" + (no + 1).toFill(2),"startTime"));
	}
	
	if(this.hx.getNodeValue(this.camTag,tag_name,str,"recordType") != "0"){
		tmpInfo += " , ";

        if (parent.g_model_name_int == 0) {
            tmpInfo += "N:" + parseInt(parent.getFpsValue(this.hx.getNodeValue(this.camTag,tag_name,str,"normalFPS"),0)).toFixed(2) + " fps";
		    tmpInfo += " , ";
		    tmpInfo += "E:" + parseInt(parent.getFpsValue(this.hx.getNodeValue(this.camTag,tag_name,str,"eventFPS"),0)).toFixed(2) + " fps";
        }else{
            tmpInfo += "N:" + parseInt(this.hx.getNodeValue(this.camTag,tag_name,str,"normalFPS")).toFixed(2) + " fps";
		    tmpInfo += " , ";
		    tmpInfo += "E:" + parseInt(this.hx.getNodeValue(this.camTag,tag_name,str,"eventFPS")).toFixed(2) + " fps";
        }
		tmpInfo += " , ";
		if(this.hx.getNodeValue(this.camTag,tag_name,str,"action") == "0"){
			tmpInfo += "Action:N";
		}else{
			tmpInfo += "Action:Y";
		}
	}else{
		tmpInfo += ",No Record.";
	}
	setIdInnerHTML(this.infoId,tmpInfo);
};
ScheduleTable.prototype.clearInfo = function(){
	setIdInnerHTML(this.infoId,"");
};
ScheduleTable.prototype.initTabSubClass = function(){
	for(var i = 0;i < this.tabSubAry.length;i++){
		setIdClass(this.tabSubAry[i],this.tabSubClass);
	}
};
ScheduleTable.prototype.selectRow = function(){
	this.initTabSubClass();
	this.focusRow = this.focusTd.id.split("_")[1];
	setIdClass("tab_" + this.focusTd.id.split("_")[1],this.tabSubSelClass);
};
ScheduleTable.prototype.createNewStatus = function(){
	var tag_name = this.focusTd.id.split("_")[1];
	var no = this.focusTd.id.split("_")[2];
	var tmpEnableXmlNode = this.getEnableXmlNode();
	var tmpClass;
	if(tmpEnableXmlNode <= 6){
		tmpClass = this.getNextClass();
		for(var i = no; i < 48;i++){
			setIdClass("td_" + tag_name + "_" + i,tmpClass);
			setIdInnerHTML("td_" + tag_name + "_" + i,"&nbsp;");
		}
		this.syncXml(tmpEnableXmlNode);
		if(no < 48){
			setIdInnerHTML("td_" + tag_name + "_" + no,tmpEnableXmlNode);
		}
	}
};
ScheduleTable.prototype.syncXml = function(enableXmlNode){
	var tag_name = this.focusTd.id.split("_")[1];
	var no = this.focusTd.id.split("_")[2];
	var tmpClass = getIdClass(this.focusTd);
	var tmpType = 0;
	var str = "";

	if(tmpClass == this.tdNoRecClass){
		tmpType = 0;
	}else if(tmpClass == this.tdEventClass){
		tmpType = 1;
	}else if(tmpClass == this.tdNormalEventClass){
		tmpType = 2;
	}
	
	str = "Zone" + enableXmlNode.toFill(2);
	
	//var HD_Cam_Flag  = parseInt(this.hx.getNodeValue(this.camTag,"HD_CAMERA"));
	var ResNode, NorNode, EvnNode;
    /*
    ResNode = 2;
    NorNode = 7;
    EvnNode = 1;
    */
    ResNode = this.hx.getNodeValue(this.camTag,tag_name,str,"resolution");
    NorNode = this.hx.getNodeValue(this.camTag,tag_name,str,"normalFPS");
    EvnNode = this.hx.getNodeValue(this.camTag,tag_name,str,"eventFPS");
    ActNode = this.hx.getNodeValue(this.camTag,tag_name,str,"action");
	/*
	HD_Cam_Flag = 0;
		
	switch(HD_Cam_Flag)
	{
		case 1:
		case 2:
			ResNode = 0;NorNode = 7; 
			EvnNode = HD_Cam_Flag == 1 ? 0: 1;
		break;
		default:
			ResNode = 2;NorNode = 7;EvnNode = 0;
		break;	
	}
    */
	this.hx.setNodeValue(tmpType,this.camTag,tag_name,str,"recordType")
			.setNodeValue(no,this.camTag,tag_name,str,"startTime");
			
			
			
			
	
    if (setHx.getNode("SCHEDULE", "Resolution"))
    {
        this.hx.setNodeValue(ResNode,this.camTag,tag_name,str,"resolution");
    }
    if (setHx.getNode("SCHEDULE", "NormalRate"))
    {
        this.hx.setNodeValue(NorNode,this.camTag,tag_name,str,"normalFPS");
    }
    if (setHx.getNode("SCHEDULE", "EventRate"))
    {
        this.hx.setNodeValue(EvnNode,this.camTag,tag_name,str,"eventFPS");
    }
    if (setHx.getNode("SCHEDULE", "Action"))
    {
        //this.hx.setNodeValue(1,this.camTag,tag_name,str,"action");
        this.hx.setNodeValue(ActNode,this.camTag,tag_name,str,"action");
    }
    
    	
	for(var i = enableXmlNode + 1;i <= 6;i++){
		str = "Zone" + i.toFill(2);

        ResNode = this.hx.getNodeValue(this.camTag,tag_name,str,"resolution");
        NorNode = this.hx.getNodeValue(this.camTag,tag_name,str,"normalFPS");
        EvnNode = this.hx.getNodeValue(this.camTag,tag_name,str,"eventFPS");
        ActNode = this.hx.getNodeValue(this.camTag,tag_name,str,"action");

		this.hx.setNodeValue(0,this.camTag,tag_name,str,"recordType")
			.setNodeValue(48,this.camTag,tag_name,str,"startTime");

        if (setHx.getNode("SCHEDULE", "Resolution"))
        {
            this.hx.setNodeValue(ResNode,this.camTag,tag_name,str,"resolution");
        }
        if (setHx.getNode("SCHEDULE", "NormalRate"))
        {
            this.hx.setNodeValue(NorNode,this.camTag,tag_name,str,"normalFPS");
        }
        if (setHx.getNode("SCHEDULE", "EventRate"))
        {
            this.hx.setNodeValue(EvnNode,this.camTag,tag_name,str,"eventFPS");
        }
        if (setHx.getNode("SCHEDULE", "Action"))
        {
            this.hx.setNodeValue(ActNode,this.camTag,tag_name,str,"action");
        }
	}
};
ScheduleTable.prototype.syncResolution = function(tag_name,no,value){
	var str = "Zone" + no.toFill(2);
	this.hx.setNodeValue(value,this.camTag,tag_name,str ,"resolution");
};
ScheduleTable.prototype.syncNormal = function(tag_name,no,value){
	var str = "Zone" + no.toFill(2);
	this.hx.setNodeValue(value,this.camTag,tag_name,str ,"normalFPS");
};
ScheduleTable.prototype.syncEvent = function(tag_name,no,value){
	var str = "Zone" + no.toFill(2);
	this.hx.setNodeValue(value,this.camTag,tag_name,str ,"eventFPS");
};
ScheduleTable.prototype.syncAction = function(tag_name,no,value){
	var str = "Zone" + no.toFill(2);
	var tmpBoolean = value==true?1:0;
	this.hx.setNodeValue(tmpBoolean,this.camTag,tag_name,str ,"action");
};
ScheduleTable.prototype.changeSysTimeFormat = function(sysTime){
	var tmpSysTime = sysTime.toInt() * 30;
	var tmpHr = 0;
	var tmpMin = 0;
	
	tmpMin = tmpSysTime % 60;
	tmpHr = (tmpSysTime - tmpMin) / 60;
	
	return tmpHr.toFill(2) + ":" + tmpMin.toFill(2);
};
ScheduleTable.prototype.getNextClass = function(){
	var currentClass = getIdClass(this.focusTd);
	if(currentClass == this.tdNoRecClass){
		currentClass = this.tdEventClass;
	}else if(currentClass == this.tdEventClass){
		currentClass = this.tdNormalEventClass;
	}else if(currentClass == this.tdNormalEventClass){
		currentClass = this.tdNoRecClass;
	}
	return currentClass;
};
ScheduleTable.prototype.getCurrentXmlNode = function(){
	var tag_name = this.focusTd.id.split("_")[1];
	var no = this.focusTd.id.split("_")[2];
	var tmpFlag = 0;
	var tmpStart = 0;
	var tmpEnd = 0;
	var str = "";

	for(var i = 1;i <= 6;i++){
		str = "Zone" + i.toFill(2);
		tmpStart = this.hx.getNodeValue(this.camTag,tag_name,str,"startTime").toInt();
		if(no >= tmpStart){
			tmpFlag++;
		}else{
			break;
		}
	}
	return tmpFlag;
};
ScheduleTable.prototype.getEnableXmlNode = function(){
	var tag_name = this.focusTd.id.split("_")[1];
	var no = this.focusTd.id.split("_")[2];
	var tmpFlag = 1;
	var tmpStart = 0;
	var str = "";

	if(no != 0){
		for(var i = 1;i <= 6;i++){
			str = "Zone" + i.toFill(2);
			tmpStart = this.hx.getNodeValue(this.camTag,tag_name,str,"startTime").toInt();
			if(no > tmpStart){
				tmpFlag++;
			}
		}
	}
	return tmpFlag;
};
ScheduleTable.prototype.openEdit = function(){
	var obj = this;
	var tag_name = this.focusRow;
	//20100121
	//var HD_Cam_Flag  = parseInt(this.hx.getNodeValue(this.camTag,"HD_CAMERA"));
	obj.closeAimLine();
	obj.closeBlock();
    
	if(this.focusRow != ""){
        if(lockCamera){
            lockCamera();
        }
		this.clearEdit();
		var ht = new HandleTable(this.editId);
		ht.insertRow();
			ht.insertCell().width(50)
					.innerHTML("&nbsp;");
            var showDay;
            if(tag_name == "Sun"){
                showDay = this.hl.get("SUNDAY");
            } else if(tag_name == "Mon"){
                showDay = this.hl.get("MONDAY");
            } else if(tag_name == "Tue"){
                showDay = this.hl.get("TUESDAY");
            } else if(tag_name == "Wed"){
                showDay = this.hl.get("WEDNESDAY");
            } else if(tag_name == "Thu"){
                showDay = this.hl.get("THURSDAY");
            } else if(tag_name == "Fri"){
                showDay = this.hl.get("FRIDAY");
            } else if(tag_name == "Sat"){
                showDay = this.hl.get("SATURDAY");
            } else if(tag_name == "Holiday"){
                showDay = this.hl.get("HOLIDAY");
            } else if(tag_name == "Others"){
                showDay = this.hl.get("OTHERS");
            }
			ht.insertCell().attr("colSpan",7)
					.className(this.tdEditClass)
                    .textAlign("left")
                    .innerHTML("Editing: " + showDay);
					//.innerHTML("Editing: " + tag_name);
		ht.insertRow();
			ht.insertCell().attr("colSpan",8)
					.className(this.tdEditClass)
					.innerHTML("&nbsp;");
		ht.insertRow();
			ht.insertCell().className(this.tdEditClass)
					.innerHTML("&nbsp;");
			ht.insertCell().className(this.tdEditClass)
					.innerHTML(this.hl.get("FROM"));
			ht.insertCell().className(this.tdEditClass)
					.innerHTML(this.hl.get("TO"));
			ht.insertCell().className(this.tdEditClass)
					.innerHTML(this.hl.get("RECORD"));

            if (setHx.getNode("SCHEDULE", "Resolution"))
            {
                ht.insertCell().className(this.tdEditClass)
					.innerHTML(this.hl.get("RESOLUTION"));
            }
            if (setHx.getNode("SCHEDULE", "NormalRate"))
            {
                ht.insertCell().className(this.tdEditClass)
					.innerHTML(this.hl.get("NORMAL"));
            }
            if (setHx.getNode("SCHEDULE", "EventRate"))
            {
                ht.insertCell().className(this.tdEditClass)
					.innerHTML(this.hl.get("EVENT"));
            }
            if (setHx.getNode("SCHEDULE", "Action"))
            {
                ht.insertCell().className(this.tdEditClass)
					//.attr("noWrap","true")
					.innerHTML(this.hl.get("ACTION"));
            }
			

			

			
			
		var str = "";
		var nextStr = "";
		for(var i = 1;i <= 6;i++){
		
			str = "Zone" + i.toFill(2);
			nextStr = "Zone" + (i + 1).toFill(2);
			ht.insertRow();
				ht.insertCell().className(this.tdEditNoClass)
						.innerHTML(i);
				ht.insertCell().className(this.tdEditClass)
						.innerHTML(this.changeSysTimeFormat(this.hx.getNodeValue(this.camTag,tag_name,str,"startTime")));
					if(getIdInnerHTML(ht.td) == "24:00"){
						setIdVisibility(ht.tr,0);	
					}
				ht.insertCell().className(this.tdEditClass);
					if(i < 6){
						setIdInnerHTML(ht.td,this.changeSysTimeFormat(this.hx.getNodeValue(this.camTag,tag_name,nextStr,"startTime")));
					}else{
						setIdInnerHTML(ht.td,"24:00");
					}
				ht.insertCell().className(this.tdEditClass);
					if(this.hx.getNodeValue(this.camTag,tag_name,str,"recordType") == "0"){
						setIdInnerHTML(ht.td,this.hl.get("NO_RECORD"));
					}else if(this.hx.getNodeValue(this.camTag,tag_name,str,"recordType") == "1"){
						setIdInnerHTML(ht.td,this.hl.get("EVENT_ONLY"));
					}else if(this.hx.getNodeValue(this.camTag,tag_name,str,"recordType") == "2"){
						setIdAttr(ht.td,"noWrap","true");
						setIdInnerHTML(ht.td,hl.get("NORMAL") + "+" + hl.get("EVENT"));
					}
				
					if(this.hx.getNodeValue(this.camTag,tag_name,str,"recordType") == "0"){
						ht.insertCell().attr("colSpan","3")
								.className(this.tdEditNoClass)
								.innerHTML("&nbsp;");
					}else if(this.hx.getNodeValue(this.camTag,tag_name,str,"recordType") == "1" || this.hx.getNodeValue(this.camTag,tag_name,str,"recordType") == "2"){

                        if (setHx.getNode("SCHEDULE", "Resolution"))
                        {
                            ht.insertCell().innerHTML('<select id="' + tag_name + '_Res_' + i + '"/></select>');
                            var ResObj = EFDEF_id(tag_name + "_Res_" + i);
                            
                            if (parent.g_model_name_int == 0) { //******* 20130617 added specific resolutions by different ip cams for X86NVR and ENVR by John
                                //parent.setSelectResolution(ResObj,parent.g_mainResolution_ary);
                                if (parent.g_model_name == "ECOR960-8F2") { //******* for ECOR960-8F2
                                    var np;
                                    if (parent.g_dvr_sys == 0) {
                                        np = "N";
                                    }
                                    else {
                                        np = "P";
                                    }
                                    var hx_OSD_Display = new HandleXml();
                                    hx_OSD_Display.setUrl("../cgi-bin/DisplayOSD.xml");
                                    var display_ration = hx_OSD_Display.getNodeValue("MainMonitor", "aspect_ratio");
                                    var Resolution_ary = parent.SetHx.getNodeValue("Global", "MainForce" + display_ration + "_" + np).split(",");
                                    parent.setSelectResolution(ResObj,Resolution_ary);
                                } else {
                                    parent.setSelectResolution(ResObj,parent.g_mainResolution_ary);
                                }
                            }else{
                                parent.setSelectResolution(ResObj,resolution_array);
                            }
                            setIdValue(tag_name + "_Res_" + i,this.hx.getNodeValue(this.camTag,tag_name,str,"resolution"));
                            setIdOnchange(tag_name + "_Res_" + i,function(){
												    //obj.syncResolution(this.id.split("_")[0],this.id.split("_")[2],this.value);
												    if(!obj.checkFps(obj.focusRow)){
													    setIdDisabled("btn_Save",1);
													    alert("overflow");
												    }else{
													    setIdDisabled("btn_Save",0);
												    }
											    });
                        }
                        if (setHx.getNode("SCHEDULE", "NormalRate"))
                        {
                                ht.insertCell().innerHTML('<select id="' + tag_name + '_Normal_' + i + '"/></select>');
                                var NorObj = EFDEF_id(tag_name + "_Normal_" + i);
                                parent.setSelectFps(NorObj,parent.g_mainNormalSpeed_ary);
                                setIdValue(tag_name + "_Normal_" + i,this.hx.getNodeValue(this.camTag,tag_name,str,"normalFPS"));
                                setIdOnchange(tag_name + "_Normal_" + i,function(){
												    //obj.syncNormal(this.id.split("_")[0],this.id.split("_")[2],this.value);
												    if(!obj.checkFps(obj.focusRow)){
													    setIdDisabled("btn_Save",1);
													    alert("overflow");
												    }else{
													    setIdDisabled("btn_Save",0);
												    }
											    });
                        }
                        if (setHx.getNode("SCHEDULE", "EventRate"))
                        {
                            ht.insertCell().innerHTML('<select id="' + tag_name + '_Event_' + i + '"/></select>');
						    var EvenObj = EFDEF_id(tag_name + "_Event_" + i);
						    parent.setSelectFps(EvenObj,parent.g_mainEventSpeed_ary);
						    setIdValue(tag_name + "_Event_" + i,this.hx.getNodeValue(this.camTag,tag_name,str,"eventFPS"));
						    setIdOnchange(tag_name + "_Event_" + i,function(){
												    //obj.syncEvent(this.id.split("_")[0],this.id.split("_")[2],this.value);
												    if(!obj.checkFps(obj.focusRow)){
													    setIdDisabled("btn_Save",1);
													    alert("overflow");
												    }else{
													    setIdDisabled("btn_Save",0);
												    }
											    });
                        }
                        
						//var hs_main_reso = new HandleSelect(ResObj,0);					
						
						//HD_Cam_Flag =0;
						/*
						switch(HD_Cam_Flag)
						{
							case 0:
							case 1:
									HD_Cam_Flag == 1 ? hs_main_reso.addOpt(0,"1280x720",0) : parent.setSelectResolution(ResObj,0); 
									parent.setSelectFps(NorObj);
									parent.setSelectFps(EvenObj);
							break;
							
							case 2:
									hs_main_reso.addOpt(0,"1920x1080",0);
									parent.setSelectFpsHD(NorObj);
									parent.setSelectFpsHD(EvenObj);
							break;
						}
                        */

					}
                    if (setHx.getNode("SCHEDULE", "Action"))
                    {
                        ht.insertCell().className(this.tdEditNoClass);
					    if(this.hx.getNodeValue(this.camTag,tag_name,str,"recordType") == "0"){
						    setIdInnerHTML(ht.td,"&nbsp;");
					    }else if(this.hx.getNodeValue(this.camTag,tag_name,str,"recordType") == "1" || this.hx.getNodeValue(this.camTag,tag_name,str,"recordType") == "2"){
						    setIdInnerHTML(ht.td,'<input type="checkbox" id="' + tag_name + '_Act_' + i + '" onclick="alert(this.checked);"/>');
						    setIdChecked(tag_name + "_Act_" + i,this.hx.getNodeValue(this.camTag,tag_name,str,"action"));
						
						    setIdOnclick(tag_name + "_Act_" + i,function(){
												    //obj.syncAction(this.id.split("_")[0],this.id.split("_")[2],this.checked);
											    });
					    }
                    }
				
		}


        





		ht.insertRow();
			

            ht.insertCell().attr("colSpan",8)
					.className(this.tdEditNoClass)
					.innerHTML('<input type="button" id="' + this.applybtnid + '" class="' + this.btnClass + '" value="' + this.hl.get("APPLY") + '"/>');
		setIdOnclick(this.applybtnid,function(){
                        for(var i = 1;i <= 6;i++){
                            str = "Zone" + i.toFill(2);
			                nextStr = "Zone" + (i + 1).toFill(2);

                            if(obj.hx.getNodeValue(obj.camTag,tag_name,str,"recordType") == "0"){

			                }else if(obj.hx.getNodeValue(obj.camTag,tag_name,str,"recordType") == "1" || obj.hx.getNodeValue(obj.camTag,tag_name,str,"recordType") == "2"){
                                if (setHx.getNode("SCHEDULE", "Resolution"))
                                {
                                    var sycid= tag_name + "_Res_" + i.toString();
					                obj.syncResolution(sycid.split("_")[0],sycid.split("_")[2],getIdValue(sycid));
                                }
                                if (setHx.getNode("SCHEDULE", "NormalRate"))
                                {
                                    var sycid= tag_name + "_Normal_" + i.toString();
					                obj.syncNormal(sycid.split("_")[0],sycid.split("_")[2],getIdValue(sycid));
                                }
                                if (setHx.getNode("SCHEDULE", "EventRate"))
                                {
                                    var sycid= tag_name + "_Event_" + i.toString();
					                obj.syncEvent(sycid.split("_")[0],sycid.split("_")[2],getIdValue(sycid));
                                }
                            }

                            if (setHx.getNode("SCHEDULE", "Action"))
                            {
                                var sycid= tag_name + "_Act_" + i.toString();
				                if(obj.hx.getNodeValue(obj.camTag,tag_name,str,"recordType") == "0"){

				                }else if(obj.hx.getNodeValue(obj.camTag,tag_name,str,"recordType") == "1" || obj.hx.getNodeValue(obj.camTag,tag_name,str,"recordType") == "2"){
					                obj.syncAction(sycid.split("_")[0],sycid.split("_")[2],getIdChecked(sycid));
				                }
                            }
                        }
						obj.closeEdit();
					});

            ht.insertCell().className(this.tdEditNoClass)
					.innerHTML('<input type="button" id="' + this.btnId + '" class="' + this.btnClass + '" value="' + this.hl.get("CLOSE") + '"/>');
		setIdOnclick(this.btnId,function(){
						obj.closeEdit();
					});
		
		setIdVisibility(this.editId,1);
		this.clearInfo();
	}else{
		alert("Please choose a date!");
	}
};
ScheduleTable.prototype.closeEdit = function(){
	setIdVisibility(this.editId,0);
    if(unlockCameraCE)
        unlockCameraCE();
};
ScheduleTable.prototype.clearEdit = function(){
	var ht = new HandleTable(this.editId);
	ht.clear(1);
};
ScheduleTable.prototype.clearDragFlag = function(){
	this.dragFlag = 0;
};
ScheduleTable.prototype.moveEdit = function(e){
	e = e || event;
	if(this.dragFlag == 1){
		setIdTop(this.editId,e.clientY - this.barRelativeTop);
		setIdLeft(this.editId,e.clientX - this.barRelativeLeft);
	}
};
ScheduleTable.prototype.clearScheduleTable = function(){
	var ht = new HandleTable(this.tabId);
	ht.clear(1);
	this.focusRow = "";
	this.focusTd = "";
};
ScheduleTable.prototype.openAimLine = function(){
	////var tmpAimHeight;
	////tmpAimHeight = getIdTop(this.focusTd) - this.imgTop + this.adjustAimHeight;
	setIdTop(this.aimId,this.imgTop + this.adjustAimTop - this.adjustTop2);
	setIdLeft(this.aimId,getIdLeft(this.focusTd) + this.adjustAimLeft - this.adjustLeft1);
	////getIdStyle(this.aimId).height = tmpAimHeight + 'px';
	setIdVisibility(this.aimId,1);
};
ScheduleTable.prototype.closeAimLine = function(){
	setIdVisibility(this.aimId,0);
};
ScheduleTable.prototype.openBlock = function(focusObj){
	this.focusTd = focusObj;
	setIdTop(this.blockId,getIdTop(focusObj) - this.adjustBlockTop - this.adjustTop1);
	setIdLeft(this.blockId,getIdLeft(focusObj) - this.adjustLeft1);
	setIdVisibility(this.blockId,1);
};
ScheduleTable.prototype.closeBlock = function(){
	setIdVisibility(this.blockId,0);
};
ScheduleTable.prototype.syncDays = function(){
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
ScheduleTable.prototype.syncCameras = function(no){
	var tmpStr = "Camera" + (no+1).toFill(2);
	
	if(tmpStr != this.camTag){
		
		var tmpFrom = this.hx.getNode(this.camTag);
		var tmpTo = this.hx.getNode(tmpStr);

		var fromNode = tmpFrom;
		var toNode = tmpTo;
		
		if(fromNode != toNode){
			this.hx.cloneNodeChild(fromNode,toNode);
		}
	}
};

ScheduleTable.prototype.RemoveRecursive = function(TopNodes){

	var tmpToNodeChilds = TopNodes.childNodes;
	var toplen = tmpToNodeChilds.length-1;
		
		while(toplen >= 0)
		{	
			this.RemoveRecursive(tmpToNodeChilds[toplen]);
			
			switch(tmpToNodeChilds[toplen].nodeName)
			{
				case "startTime":
				case "action":
				case "recordType":
					TopNodes.removeChild(tmpToNodeChilds[toplen]);
				break;
				
				default:
				break;
			}
			toplen--;
		}
}

ScheduleTable.prototype.cloneNodeRecursive = function(fromNode,toNode){

			var cloneNode;
				
			for(var i = 0;i < fromNode.childNodes.length;i++){
			
				switch(fromNode.childNodes[i].nodeName)
				{
					case "startTime":
					case "action":
					case "recordType":
						cloneNode = fromNode.childNodes[i].cloneNode(true);
					break;
					
					default:
						cloneNode = fromNode.childNodes[i].cloneNode(false);
					break;
				}
				
				toNode.appendChild(cloneNode);
				this.cloneNodeRecursive(fromNode.childNodes[i],toNode.childNodes[i]);	
			}
}

ScheduleTable.prototype.refresh = function(){
	this.clearScheduleTable();
	for(var i = 0;i < this.daysAry.length;i++){
		this.setRowUI(this.daysAry[i],this.daysAry[i]);
	}
};
ScheduleTable.prototype.checkFps = function(){

    return true;//20121212  julia add 目前不CHECK
	//args[0]	which day	if this is null => "ALL"
	var args = arguments;
	var camNo = this.hx.getNodeChildSize("Schedule") - 1;		//del MAX tag
	var maxFps = this.hx.getNodeValue("FPS_MAX").toInt();
	var tmpCam;
	var tmpDay;
	var zoneNo = 6;
	var tmpZone;
	var tmpNextZone;
	var tmpType;
	var tmpRes;
	var tmpNormal;
	var tmpStart;
	var tmpEnd;
	var tmpEnable;
	var tmpWeight;
	var tmpFps;
	var tmpCamAry;
	var tmpDayAry;
	
	var flagEnd = this.daysAry.length;

	if(args[0] != null){
		flagEnd = 1;
	}
	for(var m = 0;m < flagEnd;m++){
		tmpCamAry = new Array();
		if(args[0]){
			tmpDay = args[0];
		}else{
			tmpDay = this.daysAry[m];
		}
		for(var i = 0;i < camNo;i++){
			tmpCam = "Camera" + i.toFill(2);
			tmpEnable = this.hx.getNodeValue(tmpCam,"INSTALL").toInt();
			tmpDayAry = new Array();
			var tmpVal;
			if(tmpEnable > 0){
				for(var j = 0;j < zoneNo;j++){
					tmpZone = "Zone" + j.toFill(2);
					tmpNextZone = "Zone" + (j + 1).toFill(2);
			
					tmpStart = this.hx.getNodeValue(tmpCam,tmpDay,tmpZone,"startTime").toInt();
					if(j < zoneNo - 1){
						tmpEnd = this.hx.getNodeValue(tmpCam,tmpDay,tmpNextZone,"startTime").toInt();
					}else{
						tmpEnd = 48;
					}
					if(tmpStart == 48){
						continue;
					}
					
					tmpType = this.hx.getNodeValue(tmpCam,tmpDay,tmpZone,"recordType").toInt();
					tmpRes = this.hx.getNodeValue(tmpCam,tmpDay,tmpZone,"resolution").toInt();
					tmpNormal = this.hx.getNodeValue(tmpCam,tmpDay,tmpZone,"normalFPS").toInt();
					
					if(tmpRes == 0){
						tmpWeight = 4;
					}else if(tmpRes == 1){
						tmpWeight = 2;
					}else if(tmpRes == 2){
						tmpWeight = 1;
					}
					tmpFps = parent.getFpsValue(tmpNormal,0);
					for(var k = tmpStart;k < tmpEnd;k++){
						//parent.showMsg(tmpWeight + " * " + tmpFps + " - " + tmpNormal);
						if(tmpType > 0){
							tmpVal = tmpWeight * tmpFps;
						}else{
							tmpVal = 0;
						}
						tmpDayAry.push(tmpVal);
					}
				}
			}else{
				for(var l = 0;l < 48;l++){
					tmpDayAry.push(0);
				}
			}
			tmpCamAry.push(tmpDayAry);
		}

		var val;
		////debug string
		////var str = "";
		for(var i = 0;i < tmpCamAry[0].length;i++){
			val = 0;
			for(var j = 0;j < tmpCamAry.length;j++){
				val += tmpCamAry[j][i];
				////str += tmpCamAry[j][i] + ",";
			}
			////str += " = " + val + "\n";
			parent.showMsg(val + " - " + maxFps);
			if(val > maxFps){
				return false;
			}
		}
		////if(args[0] != null){
			////showMsg(str);
		////}
	}
	return true;
};
//-->