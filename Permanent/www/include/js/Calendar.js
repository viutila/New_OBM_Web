function Calendar(){
	/*
	need use utility.js date.format.js calendar.css
	*/
	//args[0]
		//use drag bar			b
		//obj onclick			c
		//use delay select		d
		//use calendar icon		i
		//when mouseout	close calendar	m
		//open calendar			o
		//when selected close		s
	//args[1]	container id
	//args[2]	input id
	//args[3]	output dateFormat	default:"dd-mm-yyyy"
	//args[4]	img offsetTop		default:null		if value isn't null => position:absolute
	//args[5]	img offsetLeft		default:null
	//args[6]	div offsetTop		default:null		if value isn't null => position:absolute
	//args[7]	div offsetLeft		default:null
	//args[8]	calendar width		default:200
	//args[9]	calendar height		default:140
	var args = arguments;
	this.method = args[0]!=null?args[0]:0;
	this.containerId = args[1];
	this.inputId = args[2];
	this.dateFormat = args[3]!=null?args[3]:"dd-mm-yyyy";
	this.imgTop = args[4]!=null?args[4]:null;
	this.imgLeft = args[5]!=null?args[5]:null;
	this.divTop = args[6]!=null?args[6]:null;
	this.divLeft = args[7]!=null?args[7]:null;
	this.calWidth = args[8]!=null?args[8]:"200";
	this.calHeight = args[9]!=null?args[9]:"140";

	this.extraEvent;
	//keyword
	this.idKey = "cal_";
	this.classKey = "cal_";
	//photo path
	this.path = "../img/";
	//setup time
	this.now = new Date();
	this.year = this.now.getFullYear();
	this.month = this.now.getMonth();
	this.day = this.now.getDate();
	this.daysInMonth = new Array(31, 28, 31, 30, 31, 30, 31, 31,30, 31, 30, 31);
	this.days = new Array("Sun","Mon", "Tue", "Wed","Thu", "Fri", "Sat");
	this.monthAry = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
	this.maxYear = 2037;
	this.minYear = 2013;

	//drag & drop
	this.dragFlag = 0;
	this.barRelativeTop;
	this.barRelativeLeft;
	
	//check repeat no
	this.no = 0;
	//setup id
	this.divId;
	this.tabId;
	this.tbodyId;
	this.showId;
	this.imgId;
	this.barId;
	this.desYearId;
	this.addYearId;
	this.desMonthId;
	this.addMonthId;
	//setup class
	this.divClass;
	this.barClass;
	this.titleClass;
	this.buttonClass;
	this.weekdayClass;
	this.satClass;
	this.sunClass;
	this.tdClass;
	this.dayClass;
	this.daySunClass;
	this.daySatClass;
	this.todayClass;

    this.showYear = 1;
	
	if(args.length > 0){
		this.init();
	}
}
Calendar.prototype.init = function(){
	this.setMembers();
	this.appendSkin();
	if(this.inputId != null){
		setIdValue(this.inputId,this.now.format(this.dateFormat));
	}
	this.createCalendar();
	if(this.method.indexOf("o") > -1){
		this.openCalendar();
	}
};
Calendar.prototype.setMembers = function(){
	while(document.getElementById(this.idKey + "div" + this.no)){
		this.no++;
	}
	//setup id
	this.divId = this.idKey + "div" + this.no;
	this.tabId = this.idKey + "tab" + this.no;
	this.tbodyId = this.idKey + "tbody" + this.no;
	this.showId = this.idKey + "show" + this.no;
	this.imgId = this.idKey + "img" + this.no;
	this.barId = this.idKey + "bar" + this.no;
	this.desYearId = this.idKey + "desYear" + this.no;
	this.addYearId = this.idKey + "addYear" + this.no;
	this.desMonthId = this.idKey + "desMonth" + this.no;
	this.addMonthId = this.idKey + "addMonth" + this.no;
	//setup class
	this.divClass = this.classKey + "div";
	this.barClass = this.classKey + "bar";
	this.titleClass = this.classKey + "title";
	this.buttonClass = this.classKey + "button";
	this.weekdayClass = this.classKey + "weekday";
	this.satClass = this.classKey + "sat";
	this.sunClass = this.classKey + "sun";
	this.tdClass = this.classKey + "td";
	this.dayClass = this.classKey + "day";
	this.daySunClass = this.classKey + "daySun";
	this.daySatClass = this.classKey + "daySat";
	this.todayClass = this.classKey + "today";
};
Calendar.prototype.appendSkin = function(){
	var calObj = this;
	var skin = "";

	if(this.method.indexOf("i") > -1){
		if(this.imgTop != null){
			skin += "<img id='" + this.imgId + "' src='" + this.path + "cal.gif' alt='calendar' style='position:absolute;top: " + this.imgTop + "px;left: " + this.imgLeft + "px;width: 20px; height: 20px;'/>";
		}else{
			skin += "<img id='" + this.imgId + "' src='" + this.path + "cal.gif' alt='calendar' style='width: 20px; height: 20px;'/>";
		}
	}
	if(this.divTop != null){
		skin += "<div id='" + this.divId + "' class='" + this.divClass +"' style='position: absolute;TOP: " + this.divTop + "px; LEFT: " + this.divLeft + "px;width: " + this.calWidth + "px;height: " + this.calHeight + "px;'>";
	}else{
		skin += "<div id='" + this.divId + "' class='" + this.divClass +"' style='width: " + this.calWidth + "px;height: " + this.calHeight + "px;'>";
	}
	skin +=	 "<table border='1' cellpadding='0' cellspacing='0' id='" + this.tabId + "' width='" + this.calWidth + "' height='" + this.calHeight + "'>";
	skin +=		"<thead>";
	if(this.method.indexOf("b") > -1){
		skin +=			"<tr>";
		skin +=				"<td id='" + this.barId + "' colspan='7' class='" + this.barClass + "'>&nbsp;</td>";
		skin +=			"</tr>";
	}
	skin +=			"<tr align='center' valign='middle'>";
	skin +=				"<td colspan='7' class='" + this.titleClass + "'>";
	skin +=					"<label title='Last year' id='" + this.desYearId + "' class='" + this.buttonClass + "'>";
	skin +=						isFF()?"&lt;&lt;&nbsp;":"7";
	skin +=					"</label>";
	skin +=					"<label title='Last month' id='" + this.desMonthId + "' class='" + this.buttonClass + "'>";
	skin +=						isFF()?"&lt;&nbsp;":"3";
	skin +=					 "</label>";
	skin +=					"<label align='center' id='" + this.showId + "' style='width:100px;'></label>";
	skin +=					"<label title='Next month' id='" + this.addMonthId + "' class='" + this.buttonClass + "'>";
	skin +=						isFF()?"&nbsp;&gt":"4";
	skin +=					"</label>";
	skin +=					"<label title='Next year' id='" + this.addYearId + "' class='" + this.buttonClass + "'>";
	skin +=						isFF()?"&nbsp;&gt;&gt;":"8";
	skin +=					"</label>";
	skin +=				"</td>";
	skin +=			"</tr>";
	skin +=			"<tr align='center' valign='middle'>";
	skin +=				"<td class='" + this.sunClass + "' id='diary'>" + this.days[0] + "</td>";
						for (var i = 1; i < this.days.length-1;i++){
	skin += 					"<td class='" + this.weekdayClass + "' id='diary'>" + this.days[i] + "</td>";
						}
	skin +=				"<td class='" + this.satClass + "' id='diary'>" + this.days[i] + "</td>";
	skin +=			"</tr>";
	skin +=		"</thead>";
	skin +=		"<tbody border='0' cellspacing='0' cellpadding='0' id='" + this.tbodyId + "' align='center'>";
	skin +=		"</tbody>";
	skin +=	"</table>";
	skin +=	"</div>";
	setIdInnerHTML(this.containerId,getIdInnerHTML(this.containerId) + skin);
	var ht = new HandleTable(this.tbodyId);
	for(var i = 0; i < 6; i++){
		ht.insertRow();
		for (var j = 0; j < this.days.length;j++){
			ht.insertCell().className(this.tdClass)
					.onclick(function(){
							if(getIdInnerHTML(this) != "&nbsp;"){
								calObj.setInputValue(calObj.year,calObj.month+1,this);
								if(calObj.method.indexOf("s") > -1){
									calObj.closeCalendar();
								}
								if(calObj.extraEvent != null){
									calObj.extraEvent();
								}
							}
						});
				if(this.method.indexOf("d") > -1){
					ht.td.onmouseover = function(){calObj.buttonOver(this);};
					ht.td.onmouseout = function(){calObj.buttonOut(this);};
				}
		}
	}
	
	if(this.method.indexOf("b") > -1){
		setIdOnmousedown(this.barId,function(e){
							e = e || event;
							calObj.dragFlag = 1;
							calObj.barRelativeTop = e.clientY - getIdTop(calObj.divId);
							calObj.barRelativeLeft = e.clientX - getIdLeft(calObj.divId);
						});
	}
	
	if(this.method.indexOf("i") > -1){
		setIdOnclick(this.imgId,function(){
							if(getIdDisplay(calObj.divId) == "inline"){
								calObj.closeCalendar();
							}else{
								calObj.openCalendar();
							}
						});
	}
	if(this.method.indexOf("c") > -1){
		setIdOnclick(this.containerId,function(){
							calObj.openCalendar();
						});
	}
	if(this.method.indexOf("m") > -1){
		setIdOnmouseover(this.divId,function(){
							calObj.openCalendar();
						});
		setIdOnmouseover(this.tabId,function(){
							calObj.openCalendar();
						});
		setIdOnmouseout(this.divId,function(){
							calObj.closeCalendar();
						});
	}
	setIdOnmousedown(this.desYearId,function(){calObj.chgYear(-1);});
	setIdOnmousedown(this.addYearId,function(){calObj.chgYear(1);});
	setIdOnmousedown(this.desMonthId,function(){calObj.chgMonth(-1);});
	setIdOnmousedown(this.addMonthId,function(){calObj.chgMonth(1);});
};
Calendar.prototype.createCalendar = function(){
	var newCal = new Date(this.year,this.month,1);
	var today = -1;
	var daily = 0;

	var startDay = newCal.getDay();
	var endDay = this.getDays(newCal.getMonth(), newCal.getFullYear());

	if((this.year == this.now.getFullYear()) && (this.month == this.now.getMonth())){
		today = this.now.getDate();
	}
	var intDaysInMonth = this.getDays(newCal.getMonth(), newCal.getFullYear());

	var ht = new HandleTable(this.tbodyId);

	for (var i = 0;i < ht.getRowSize();i++){
		for (var j = 0;j < ht.getColSize(i);j++){
			if ((j == startDay)  &&  (0 == daily)){
				daily = 1;
			}
			if((daily > 0)  &&  (daily <= intDaysInMonth)){
				setIdInnerHTML(ht.getCols(i,j),daily);
				if(today == daily){
					setIdClass(ht.getCols(i,j),this.todayClass);
				}else if(j == 6){
					setIdClass(ht.getCols(i,j),this.satClass);
				}else if(j == 0){
					setIdClass(ht.getCols(i,j),this.sunClass);
				}else{
					setIdClass(ht.getCols(i,j),this.weekdayClass);
				}
				daily++;
			}else{
				setIdClass(ht.getCols(i,j),this.tdClass);
				setIdInnerHTML(ht.getCols(i,j),"&nbsp;");
			}
		}
	}
	setIdInnerHTML(this.showId,this.monthAry[this.month%12] + " " + this.year);
    if (this.showYear){
        setIdInnerHTML(this.showId,this.monthAry[this.month%12] + " " + this.year);
    }else{
        setIdInnerHTML(this.showId,this.monthAry[this.month%12]);
    }
};
Calendar.prototype.move = function(e){
	e = e || event;
	if(this.dragFlag == 1){
		setIdTop(this.divId,e.clientY - this.barRelativeTop);
		setIdLeft(this.divId,e.clientX - this.barRelativeLeft);
	}
};
Calendar.prototype.clearDragFlag = function(){
	this.dragFlag = 0;
};
Calendar.prototype.getDays = function(mm, yy){
	if (1 == mm){
		return ((0 == yy % 4)  &&  (0 != (yy % 100))) ||(0 == yy % 400) ? 29 : 28;
	}else{
		return this.daysInMonth[mm];
	}
};
Calendar.prototype.checkYear = function(val){
	if(val > this.maxYear){
		val = this.maxYear;
	}else if(val < this.minYear){
		val = this.minYear;
	}
	return val;
};
Calendar.prototype.chgYear = function(cmd){
	this.year = this.checkYear(this.year + cmd);
	this.createCalendar();
};
Calendar.prototype.chgMonth = function(cmd){
	this.month += cmd;
	if(this.month == 12){
		this.month = 0;
		this.year = this.checkYear(this.year + 1);
	}else if(this.month == -1){
		this.month = 11;
		this.year = this.checkYear(this.year -1);
	}
	this.createCalendar();
};
Calendar.prototype.buttonOver = function(obj){
	//runtimeStyle firefox not support
	//var obj = window.event.srcElement;
	//obj.runtimeStyle.cssText = "background-color:#444444; cursor:nono;";
	setIdBgColor(obj,'#444444');
};
Calendar.prototype.buttonOut = function(obj){
	//runtimeStyle firefox not support
	//var obj = window.event.srcElement;
	//window.setTimeout(function(){obj.runtimeStyle.cssText = "";},300);
	window.setTimeout(function(){setIdBgColor(obj,'#000000');},300);
};
Calendar.prototype.setInputValue = function (yy,mm,obj){
	if(typeof(obj) == "object"){
		this.now = new Date(yy,mm-1,obj.innerHTML);
	}else{
		this.now = new Date(yy,mm-1,obj);
	}

	this.year = this.now.getFullYear();
	this.month = this.now.getMonth();
	this.day = this.now.getDate();
	
	if(this.inputId != null){
		setIdValue(this.inputId,this.now.format(this.dateFormat));
	}
	this.createCalendar();
};
Calendar.prototype.setDateFormat = function(formatString){
	this.dateFormat = formatString;
	if(this.inputId != null){
		setIdValue(this.inputId,this.now.format(this.dateFormat));
	}
};
Calendar.prototype.openCalendar = function(){
	setIdDisplay(this.divId,'inline');
};
Calendar.prototype.setYearVisible = function(flag){
    setIdVisibility(this.desYearId,flag);
    setIdVisibility(this.addYearId,flag);
    if (flag){
        setIdInnerHTML(this.showId,this.monthAry[this.month%12] + " " + this.year);
        this.showYear = 1;
    }else{
        setIdInnerHTML(this.showId,this.monthAry[this.month%12]);
        this.showYear = 0;
    }
    
};
Calendar.prototype.closeCalendar = function(){
	setIdDisplay(this.divId,'none');
};
Calendar.prototype.getValue = function(){
	if(this.inputId != null){
		return getIdValue(this.inputId);
	}else{
		alert("Can't find " + this.inputId);
	}
};
Calendar.prototype.setValue = function(yy,mm,dd){
	this.now = new Date(this.checkYear(yy),mm-1,dd);
	this.year = this.now.getFullYear();
	this.month = this.now.getMonth();
	this.day = this.now.getDate(); 

	if(this.inputId != null){
		setIdValue(this.inputId,this.now.format(this.dateFormat));
	}
	this.createCalendar();
};
Calendar.prototype.setTimeSec = function(sec,utcFlag){
	utcFlag = utcFlag!=null?utcFlag:false;
	this.now = new Date(sec.toInt());
	if(utcFlag){
		this.year = this.checkYear(this.now.getUTCFullYear());
		this.month = this.now.getUTCMonth();
		this.day = this.now.getUTCDate();
	}else{
		this.year = this.checkYear(this.now.getFullYear());
		this.month = this.now.getMonth();
		this.day = this.now.getDate(); 
	}
	this.setValue(this.year,this.month + 1,this.day);
};
Calendar.prototype.getYear = function(){
	return this.now.getFullYear();
};
Calendar.prototype.getMonth = function(){
	return this.now.getMonth() + 1;
};
Calendar.prototype.getDay = function(){
	return this.now.getDate();
};
Calendar.prototype.getUTCYear = function(){
	return this.now.getUTCFullYear();
};
Calendar.prototype.getUTCMonth = function(){
	return this.now.getUTCMonth() + 1;
};
Calendar.prototype.getUTCDay = function(){
	return this.now.getUTCDate();
};