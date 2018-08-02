function SelectWeek(){
	/*
	need use utility.js SelectWeek.css
	*/
	//args[0]
		//use drag bar		b
		//open selectweek	o
	//args[1]	container id
	//args[2]	input id
	//args[3]	tab offsetTop	default:null	if value isn't null => position:absolute
	//args[4]	tab offsetLeft	default:null
	//args[5]	tab width	default:200
	//args[6]	tab height	default:200
	var args = arguments;
	this.method = args[0]!=null?args[0]:"";
	this.containerId = args[1];
	this.inputId = args[2];
	this.tabTop = args[3]!=null?args[3]:null;
	this.tabLeft = args[4]!=null?args[4]:null;
	this.tabWidth = args[5]!=null?args[5]:200;
	this.tabHeight = args[6]!=null?args[6]:200;
	
	//drag & drop
	this.dragFlag = 0;
	this.barRelativeTop;
	this.barRelativeLeft;
	
	this.extraEvent;
	//keyword
	this.idKey = "sw_";
	this.classKey = "sw_";
	this.days = new Array("Sun","Mon", "Tue", "Wed","Thu", "Fri", "Sat");
	this.weeks = new Array("ST1","ND2", "RD3", "TH4","LAST");
	this.months = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
	
	//check repeat no
	this.no = 0;
	//setup id
	this.tabId;
	this.barId;
	this.monthId;
	this.weekId;
	this.dayId;
	this.btnApplyId;
	this.btnCancelId;
	//setup class
	this.tabClass;
	this.barClass;
	this.btnClass;
	
	if(args.length > 0){
		this.init();
	}
}
SelectWeek.prototype.init = function(){
	this.setMembers();
	this.appendSkin();
	if(this.method.indexOf("o") > -1){
		setIdDisplay(this.tabId,'inline');
		this.open();
	}else{
		this.close();
	}
};
SelectWeek.prototype.setMembers = function(){
	while(document.getElementById(this.idKey + "tab" + this.no)){
		this.no++;
	}
	//setup id
	this.tabId = this.idKey + "tab" + this.no;
	this.barId = this.idKey + "bar" + this.no;
	this.monthId = this.idKey + "month" + this.no;
	this.weekId = this.idKey + "week" + this.no;
	this.dayId = this.idKey + "day" + this.no;
	this.btnApplyId = this.idKey + "btn_Save" + this.no;
	this.btnCancelId = this.idKey + "btn_Cancel" + this.no;
	//setup class
	this.tabClass = this.classKey + "tab";
	this.barClass = this.classKey + "bar";
	this.btnClass = this.classKey + "btn";
};
SelectWeek.prototype.appendSkin = function(){
	var obj = this;
	var skin = "";
	if(this.tabTop != null){
		skin += 	'<table id="' + this.tabId + '" class="' + this.tabClass + '" width="' + this.tabWidth + '" border="0" cellspacing="0" cellpadding="0" style="position: absolute;top: ' + this.tabTop + 'px; left: ' + this.tabLeft + 'px;">';
	}else{
		skin += 	'<table id="' + this.tabId + '" class="' + this.tabClass + '" width="' + this.tabWidth + '" border="0" cellspacing="0" cellpadding="0">';
	}
	if(this.method.indexOf("b") > -1){
		skin +=		"<tr>";
		skin +=			"<td id='" + this.barId + "' class='" + this.barClass + "'>" + hl.get("SCHEDULE_SETTING") +"</td>";
		skin +=		"</tr>";
	}
	skin += 		'<tr>';
	skin += 			'<td align="center"><select id="' + this.monthId + '"></select></td>';
	skin += 		'</tr>';
	skin += 		'<tr>';
	skin += 			'<td align="center"><select id="' + this.weekId + '"></select></td>';
	skin += 		'</tr>';
	skin += 		'<tr>';
	skin += 			'<td align="center"><select id="' + this.dayId + '"></select></td>';
	skin += 		'</tr>';
	skin += 		'<tr>';
	skin += 			'<td align="center">';
	skin += 				'<input type="button" id="' + this.btnApplyId + '" class="' + this.btnClass + '" value="' + hl.get("OK") + '"/>';
	skin += 				'&nbsp;';
	skin += 				'<input type="button" id="' + this.btnCancelId + '" class="' + this.btnClass + '" value="' + hl.get("CANCEL") + '"/>';
	skin += 			'</td>';
	skin += 		'</tr>';
	skin += 	'</table>';

	setIdInnerHTML(this.containerId,skin);

	if(this.method.indexOf("b") > -1){
		setIdOnmousedown(this.barId,function(e){
							e = e || event;
							obj.dragFlag = 1;
							obj.barRelativeTop = e.clientY - getIdTop(obj.tabId);
							obj.barRelativeLeft = e.clientX - getIdLeft(obj.tabId);
						});
	}
	setIdOnclick(this.btnApplyId,function(){
					if(obj.inputId != null){
						obj.showInfo();
						obj.close();
					}
					if(obj.extraEvent != null){
						obj.extraEvent();
					}
				});
	setIdOnclick(this.btnCancelId,function(){
					obj.close();
				});
	this.initSelect();
};
SelectWeek.prototype.initSelect = function(){
	var s1 = new HandleSelect(this.monthId,0);
	var s2 = new HandleSelect(this.weekId,0);
	var s3 = new HandleSelect(this.dayId,0);
	for(var i = 0;i < this.months.length;i++){
		s1.addOpt(i,hl.get(this.months[i].toUpperCase()),i);
	}
	for(var i = 0;i < this.weeks.length;i++){
		s2.addOpt(i,hl.get(this.weeks[i].toUpperCase()),i);
	}
	for(var i = 0;i < this.days.length;i++){
		s3.addOpt(i,hl.get(this.days[i].toUpperCase()),i);
	}
};
SelectWeek.prototype.close = function(){
	setIdDisplay(this.tabId,'none');
};
SelectWeek.prototype.open = function(){
	setIdDisplay(this.tabId,'inline');
};
SelectWeek.prototype.clearDragFlag = function(){
	this.dragFlag = 0;
};
SelectWeek.prototype.move = function(e){
	e = e || event;
	if(this.dragFlag == 1){
		setIdTop(this.tabId,e.clientY - this.barRelativeTop);
		setIdLeft(this.tabId,e.clientX - this.barRelativeLeft);
	}
};
SelectWeek.prototype.setInputValue = function(){
	//args[0]	month
	//args[1]	week
	//args[2]	day
	var args = arguments;
	if(args[0] != null){
		setIdValue(this.monthId,args[0]);
	}
	if(args[1] != null){
		setIdValue(this.weekId,args[1]);
	}
	if(args[2] != null){
		setIdValue(this.dayId,args[2]);
	}
	this.showInfo();
};
SelectWeek.prototype.showInfo = function(){
	if(this.inputId != null){
		setIdValue(this.inputId,hl.get(this.months[getIdValue(this.monthId)].toUpperCase()) + "," + hl.get(this.weeks[getIdValue(this.weekId)].toUpperCase()) + "," + hl.get(this.days[getIdValue(this.dayId)].toUpperCase())  );
	}
};
SelectWeek.prototype.getMonth = function(){
	return getIdValue(this.monthId);
};
SelectWeek.prototype.getWeek = function(){
	return getIdValue(this.weekId);
};
SelectWeek.prototype.getDay = function(){
	return getIdValue(this.dayId);
};
SelectWeek.prototype.getMonthText = function(){
	return getIdSelectText(this.monthId);
};
SelectWeek.prototype.getWeekText = function(){
	return getIdSelectText(this.weekId);
};
SelectWeek.prototype.getDayText = function(){
	return getIdSelectText(this.dayId);
};