function TimeControl(){
	/*
	need use utility.js TimeControl.css
	*/
	//args[0]	method
		//sync time			s
		//disable input			d
	//args[1]	container id
	//args[2]	0:12H , 1:24H		default:0
	//args[3]	display			default:hMs
	//args[4]	tab width		default:100
	//args[5]	tab height		default:100
	//args[6]	tab offsetTop		default:null	if value isn't null => position: absolute
	//args[7]	tab offsetLeft		default:null
	//args[8]	jumpUnit		default:null	(sec)/time
	var args = arguments;
	this.method = args[0]!=null?args[0]:"";
	this.containerId = args[1];
	this.type = args[2]!=null?args[2]:0;
	this.display = args[3]!=null?args[3]:"hMs";
	this.tabWidth = args[4]!=null?args[4]:100;
	this.tabHeight = args[5]!=null?args[5]:100;
	this.tabTop = args[6]!=null?args[6]:null;
	this.tabLeft = args[7]!=null?args[7]:null;
	this.jumpUnit = args[8]!=null?args[8]:null;

	//keyword
	this.idKey = "tc_";
	this.classKey = "tc_";
	//photo path
	this.path = "../img/";
	//focus on which position
	this.positionFlag = 0;
	
	//setup time
	this.now = new Date();
	this.syncFlag = 1;
	this.keyFlag = 0;

	//check repeat no
	this.no = 0;
	//setup id
	this.tabId;
	this.yearId;
	this.monthId;
	this.dayId;
	this.hrId;
	this.minId;
	this.secId;
	this.typeId;
	this.upId;
	this.downId;
	this.sysId;
	//setup class
	this.tabClass;
	this.yearClass;
	this.monthClass;
	this.dayClass;
	this.hrClass;
	this.minClass;
	this.secClass;
	this.typeClass;
	this.symbolClass;

	this.disabledFlag = 0;
	this.timeOutFlag = 0;
	this.timeOutKeyFlag = 0;

	if(args.length > 0){
		this.init();
	}
}
TimeControl.prototype.init = function(){
	this.setMembers();
	this.appendSkin();
	this.initTime();
	if(this.method.indexOf("s") > -1){
		setTimeout(this.sysId + ".syncTime();",1000);
	}
};
TimeControl.prototype.setMembers = function(){
	while(document.getElementById(this.idKey + "tab" + this.no)){
		this.no++;
	}
	//setup id
	this.tabId = this.idKey + "tab" + this.no;
	this.yearId = this.idKey + "year" + this.no;
	this.monthId = this.idKey + "month" + this.no;
	this.dayId = this.idKey + "day" + this.no;
	this.hrId = this.idKey + "hr" + this.no;
	this.minId = this.idKey + "min" + this.no;
	this.secId = this.idKey + "sec" + this.no;
	this.typeId = this.idKey + "type" + this.no;
	this.upId = this.idKey + "up" + this.no;
	this.downId = this.idKey + "down" + this.no;
	this.sysId = "TimeControl" + this.no;
	window[this.sysId] = this;
	//setup class
	this.tabClass = this.classKey + "tab";
	this.yearClass = this.classKey + "year";
	this.monthClass = this.classKey + "month";
	this.dayClass = this.classKey + "day";
	this.hrClass = this.classKey + "hr";
	this.minClass = this.classKey + "min";
	this.secClass = this.classKey + "sec";
	this.typeClass = this.classKey + "type";
	this.symbolClass = this.classKey + "symbol";
};
TimeControl.prototype.setTime = function(year,month,day,hr,min,sec){	
	//args[0]	year	default: 2007
	//args[1]	month	default: 0
	//args[2]	day		default: 1
	//args[3]	hour	default: 0
	//args[4]	minute	default: 0
	//args[5]	second	default: 0
	var args = arguments;
	var tmpY = args[0]!=null?args[0].toInt():2007;
	var tmpM = args[1]!=null?args[1].toInt():0;
	var tmpD = args[2]!=null?args[2].toInt():1;
	var tmpH = args[3]!=null?args[3].toInt():0;
	var tmpMin = args[4]!=null?args[4].toInt():0;
	var tmpSec = args[5]!=null?args[5].toInt():0;
	this.now.setFullYear(tmpY);
	this.now.setMonth(tmpM);
	this.now.setDate(tmpD);
	this.now.setHours(tmpH);
	this.now.setMinutes(tmpMin);
	this.now.setSeconds(tmpSec);
	this.initTime();
};
TimeControl.prototype.setTimeSec = function(sec,utcFlag){
	utcFlag = utcFlag!=null?utcFlag:false;
	if(utcFlag){
		this.now = new Date(sec.toInt());
		this.setTime(
			this.now.getUTCFullYear(),
			this.now.getUTCMonth(),
			this.now.getUTCDate(),
			this.now.getUTCHours(),
			this.now.getUTCMinutes(),
			this.now.getUTCSeconds()
			);
	}else{
		this.now = new Date(sec.toInt());
		this.initTime();
	}
};
TimeControl.prototype.getTimeSec = function(sec,utcFlag){
	utcFlag = utcFlag!=null?utcFlag:false;
	if(utcFlag){
		return Date.UTC(this.now.getFullYear(),this.now.getMonth(),this.now.getDate(),this.now.getHours(),this.now.getMinutes(),this.now.getSeconds()) / 1000;
	}else{
		return this.now.getTime();
	}
};
TimeControl.prototype.appendSkin = function(){
	var obj = this;
	var skin = "";
	if(this.tabTop != null){
		skin += '<table id="' + this.tabId + '" class="' + this.tabClass + '" border="0" cellspacing="0" cellpadding="0" width="' + this.tabWidth+ '" height="' + this.tabHeight + '" style="position: absolute;top: ' + this.tabTop + 'px;left: ' + this.tabLeft + 'px;">';
	}else{
		skin += '<table id="' + this.tabId + '" class="' + this.tabClass + '" border="0" cellspacing="0" cellpadding="0" width="' + this.tabWidth+ '" height="' + this.tabHeight + '">';
	}
	skin += 	'<tr>';
	if(this.display.indexOf("y") > -1){
		skin += 		'<td rowspan="2" align="center">';
		skin += 			'<input type="text" id="' + this.yearId + '" class="' + this.yearClass + '" maxlength="4" value="' + this.now.getFullYear() + '"/>';
		skin += 		'</td>';
		skin += 		'<td rowspan="2" align="center" valign="middle" class="' + this.symbolClass + '">-</td>';
		this.positionFlag = 0;
	}
	if(this.display.indexOf("m") > -1){
		skin += 		'<td rowspan="2" align="center">';
		skin += 			'<input type="text" id="' + this.monthId + '" class="' + this.monthClass + '" maxlength="2" value="' + this.now.getMonth() + '"/>';
		skin += 		'</td>';
		skin += 		'<td rowspan="2" align="center" valign="middle" class="' + this.symbolClass + '">-</td>';
		this.positionFlag = 1;
	}
	if(this.display.indexOf("d") > -1){
		skin += 		'<td rowspan="2" align="center">';
		skin += 			'<input type="text" id="' + this.dayId + '" class="' + this.dayClass + '" maxlength="2" value="' + this.now.getDate() + '"/>';
		skin += 		'</td>';
		skin += 		'<td rowspan="2">&nbsp;</td>';
		this.positionFlag = 2;
	}
	
	if(this.display.indexOf("h") > -1){
		skin += 		'<td rowspan="2" align="center">';
		skin += 			'<input type="text" id="' + this.hrId + '" class="' + this.hrClass + '" maxlength="2" value="' + this.now.getHours() + '"/>';
		skin += 		'</td>';
		if(this.display.indexOf("M") > -1){
			skin += 		'<td rowspan="2" align="center" valign="middle" class="' + this.symbolClass + '">:</td>';
		}
		this.positionFlag = 3;
	}
	if(this.display.indexOf("M") > -1){
		skin += 		'<td rowspan="2" align="center">';
		skin += 			'<input type="text" id="' + this.minId + '" class="' + this.minClass + '" maxlength="2" value="' + this.now.getMinutes() + '"/>';
		skin += 		'</td>';
		if(this.display.indexOf("s") > -1){
			skin += 		'<td rowspan="2" align="center" valign="middle" class="' + this.symbolClass + '">:</td>';
		}
		this.positionFlag = 4;
	}
	if(this.display.indexOf("s") > -1){
		skin += 		'<td rowspan="2" align="center">';
		skin += 			'<input type="text" id="' + this.secId + '" class="' + this.secClass + '" maxlength="2" value="' + this.now.getSeconds() + '"/>';
		skin += 		'</td>';
		this.positionFlag = 5;
	}
	skin += 		'<td rowspan="2" align="center">';
	skin += 			'<input type="text" id="' + this.typeId + '" class="' + this.typeClass + '" value="AM" readonly/>';
	skin += 		'</td>';
	skin += 		'<td height="50%" align="right"><input type="image" id="' + this.upId + '" src="' + this.path + 'up.gif"/></td>';
	skin += 	'</tr>';
	skin += 	'<tr>';
	skin += 		'<td height="50%" align="right"><input type="image" id="' + this.downId + '" src="' + this.path + 'down.gif"></td>';
	skin += 	'</tr>';
	skin += '</table>';

	setIdInnerHTML(this.containerId,skin);

	if(this.display.indexOf("y") > -1){
		if(this.method.indexOf("d") > -1){
			setIdDisabled(this.yearId,1);
		}else{
			EFDEF_(this.yearId).onclick(
						function(){
							obj.positionFlag = 0;
							obj.syncFlag = 0;
							this.focus();
							this.select();
						})
					.onblur(
						function(){
							var tmpVal = getIdValue(obj.yearId).toInt(obj.year);
							if(tmpVal < 1970){
								tmpVal = 1970;
							}
							obj.now.setFullYear(tmpVal);
							obj.initTime();
							if(obj.method.indexOf("s") > -1){
								obj.syncFlag = 1;
							}
						});
		}
	}
	if(this.display.indexOf("m") > -1){
		if(this.method.indexOf("d") > -1){
			setIdDisabled(this.monthId,1);
		}else{
			EFDEF_(this.monthId).onclick(
						function(){
							obj.positionFlag = 1;
							obj.syncFlag = 0;
							this.focus();
							this.select();
						})
					.onblur(
						function(){
							var tmpVal = getIdValue(obj.monthId).toInt(1);
							if(tmpVal < 1){
								tmpVal = 1;
							}
							if(tmpVal > 12){
								tmpVal = 12;
							}
							obj.now.setMonth(tmpVal - 1);
							obj.initTime();
							if(obj.method.indexOf("s") > -1){
								obj.syncFlag = 1;
							}
						});
		}
	}
	if(this.display.indexOf("d") > -1){
		if(this.method.indexOf("d") > -1){
			setIdDisabled(this.dayId,1);
		}else{
			EFDEF_(this.dayId).onclick(
						function(){
							obj.positionFlag = 2;
							obj.syncFlag = 0;
							this.focus();
							this.select();
						})
					.onblur(
						function(){
							var tmpVal = getIdValue(obj.hrId).toInt(1);
							if(tmpVal < 1){
								tmpVal = 1;
							}
							if(tmpVal > 31){
								tmpVal = 31;
							}
							obj.now.setDate(tmpVal);
							obj.initTime();
							if(obj.method.indexOf("s") > -1){
								obj.syncFlag = 1;
							}
						});
		}
	}
	if(this.display.indexOf("h") > -1){
		if(this.method.indexOf("d") > -1){
			setIdDisabled(this.hrId,1);
		}else{
			EFDEF_(this.hrId).onclick(
						function(){
							obj.positionFlag = 3;
							obj.syncFlag = 0;
							this.focus();
							this.select();
						})
					.onblur(
						function(){
							var tmpVal = getIdValue(obj.hrId).toInt(1);
							if(tmpVal < 0){
								tmpVal = 0;
							}
							if(obj.type == 0){
								if(tmpVal > 12){
									tmpVal = 12;
								}else{
									if(getIdValue(obj.typeId) == "AM" && tmpVal == "12"){
										tmpVal = 0;
									}else if(getIdValue(obj.typeId) == "PM" && tmpVal != "12"){
										tmpVal += 12;
									}
								}
							}else{
								if(tmpVal > 23){
									tmpVal = 23;
								}
							}
							obj.now.setHours(tmpVal);
							obj.initTime();
							if(obj.method.indexOf("s") > -1){
								obj.syncFlag = 1;
							}
						});
		}
	}
	if(this.display.indexOf("M") > -1){
		if(this.method.indexOf("d") > -1){
			setIdDisabled(this.minId,1);
		}else{
			EFDEF_(this.minId).onclick(
						function(){
							obj.positionFlag = 4;
							obj.syncFlag = 0;
							this.focus();
							this.select();
						})
					.onblur(
						function(){
							var tmpVal = getIdValue(obj.minId).toInt(0);
							if(tmpVal < 0){
								tmpVal = 0;
							}
							if(tmpVal > 59){
								tmpVal = 59;
							}
							obj.now.setMinutes(tmpVal);
							obj.initTime();
							if(obj.method.indexOf("s") > -1){
								obj.syncFlag = 1;
							}
						});
		}
	}
	if(this.display.indexOf("s") > -1){
		if(this.method.indexOf("d") > -1){
			setIdDisabled(this.secId,1);
		}else{
			EFDEF_(this.secId).onclick(
						function(){
							obj.positionFlag = 5;
							obj.syncFlag = 0;
							this.focus();
							this.select();
						})
					.onblur(
						function(){
							var tmpVal = getIdValue(obj.secId).toInt(0);
							if(tmpVal < 0){
								tmpVal = 0;
							}
							if(tmpVal > 59){
								tmpVal = 59;
							}
							obj.now.setSeconds(tmpVal);
							obj.initTime();
							if(obj.method.indexOf("s") > -1){
								obj.syncFlag = 1;
							}
						});
		}
	}
	EFDEF_(this.upId).onmousedown(
				function(){
					obj.syncFlag = 0;
					obj.keyFlag = 1;
					obj.timeOutKeyFlag = setTimeout(obj.sysId + ".keepUp();",150);
				})
			.onmouseout(
				function(){
					obj.syncFlag = 1;
					obj.keyFlag = 0;
				})
			.onmouseup(
				function(){
					obj.syncFlag = 1;
					obj.keyFlag = 0;
				});
	
	EFDEF_(this.downId).onmousedown(
				function(){
					obj.syncFlag = 0;
					obj.keyFlag = 1;
					obj.timeOutKeyFlag = setTimeout(obj.sysId + ".keepDown();",150);
				})
			.onmouseout(
				function(){
					obj.syncFlag = 1;
					obj.keyFlag = 0;
				})
			.onmouseup(
				function(){
					obj.syncFlag = 1;
					obj.keyFlag = 0;
				});
};
TimeControl.prototype.changeYear = function(no){
	this.now.setFullYear(this.now.getFullYear() + no);
};
TimeControl.prototype.changeMonth = function(no){
	this.now.setMonth(this.now.getMonth() + no);
};
TimeControl.prototype.changeDay = function(no){
	this.now.setDate(this.now.getDate() + no);
};
TimeControl.prototype.changeHour = function(no){
	this.now.setHours(this.now.getHours() + no);
};
TimeControl.prototype.changeMinute = function(no){
	this.now.setMinutes(this.now.getMinutes() + no);
};
TimeControl.prototype.changeSecond = function(no){
	this.now.setSeconds(this.now.getSeconds() + no);
};
TimeControl.prototype.keepUp = function(){
	if(this.disabledFlag == 0){
		if(this.jumpUnit != null){
			this.changeSecond(this.jumpUnit);
		}else{
			if(this.positionFlag == 0){
				this.changeYear(1);
			}else if(this.positionFlag == 1){
				this.changeMonth(1);
			}else if(this.positionFlag == 2){
				this.changeDay(1);
			}else if(this.positionFlag == 3){
				this.changeHour(1);
			}else if(this.positionFlag == 4){
				this.changeMinute(1);
			}else if(this.positionFlag == 5){
				this.changeSecond(1);
			}
		}
		this.initTime();
		if(this.keyFlag == 1){
			this.timeOutKeyFlag = setTimeout(this.sysId + ".keepUp();",150);
		}else{
			this.clearTimeoutKey();
		}
	}
};
TimeControl.prototype.keepDown = function(){
	if(this.disabledFlag == 0){
		if(this.jumpUnit != null){
			this.changeSecond(this.jumpUnit * -1);
		}else{
			if(this.positionFlag == 0){
				this.changeYear(-1);
			}else if(this.positionFlag == 1){
				this.changeMonth(-1);
			}else if(this.positionFlag == 2){
				this.changeDay(-1);
			}else if(this.positionFlag == 3){
				this.changeHour(-1);
			}else if(this.positionFlag == 4){
				this.changeMinute(-1);
			}else if(this.positionFlag == 5){
				this.changeSecond(-1);
			}
		}
		this.initTime();
		if(this.keyFlag == 1){
			this.timeOutKeyFlag = setTimeout(this.sysId + ".keepDown();",150);
		}else{
			this.clearTimeoutKey();
		}
	}
};
TimeControl.prototype.setType = function(no){
	this.type = no;
	this.initTime();
};
TimeControl.prototype.initTime = function(){
	var tmpHr = this.now.getHours();
	if(this.type == 0){
		if(tmpHr > 12){
			tmpHr = tmpHr - 12;
			setIdValue(this.typeId,"PM");
		}else{
			setIdValue(this.typeId,"AM");
		}
		if(tmpHr == 12){
			setIdValue(this.typeId,"PM");
		}
		if(tmpHr == 0){
			tmpHr = 12;
		}
	}else{
		setIdValue(this.typeId,"");
	}
	if(this.display.indexOf("y") > -1){
		setIdValue(this.yearId,this.now.getFullYear().toFill(4));
	}
	if(this.display.indexOf("m") > -1){
		setIdValue(this.monthId,(this.now.getMonth() + 1).toFill(2));
	}
	if(this.display.indexOf("d") > -1){
		setIdValue(this.dayId,this.now.getDate().toFill(2));
	}
	if(this.display.indexOf("h") > -1){
		setIdValue(this.hrId,tmpHr.toFill(2));
	}
	if(this.display.indexOf("M") > -1){
		setIdValue(this.minId,this.now.getMinutes().toFill(2));
	}
	if(this.display.indexOf("s") > -1){
		setIdValue(this.secId,this.now.getSeconds().toFill(2));
	}
};
TimeControl.prototype.syncTime = function(){
	if(this.syncFlag == 1 && this.keyFlag != 1){
		this.changeSecond(1);
		this.initTime();	
	}
	this.timeOutFlag = setTimeout(this.sysId + ".syncTime();",1000);
};
TimeControl.prototype.clearTimeout = function(){
	clearTimeout(this.timeOutFlag);
};
TimeControl.prototype.clearTimeoutKey = function(){
	clearTimeout(this.timeOutKeyFlag);
};
TimeControl.prototype.getYear = function(){
	return this.now.getFullYear();
};
TimeControl.prototype.getMonth = function(){
	return this.now.getMonth();
};
TimeControl.prototype.getDay = function(){
	return this.now.getDate();
};
TimeControl.prototype.getHr = function(){
	return this.now.getHours();
};
TimeControl.prototype.getMin = function(){
	return this.now.getMinutes();
};
TimeControl.prototype.getSec = function(){
	return this.now.getSeconds();
};
TimeControl.prototype.setDisabled = function(flag){
	this.disabledFlag = flag;
	if(this.display.indexOf("y") > -1){
		setIdDisabled(this.yearId,flag);
	}
	if(this.display.indexOf("m") > -1){
		setIdDisabled(this.monthId,flag);
	}
	if(this.display.indexOf("d") > -1){
		setIdDisabled(this.dayId,flag);
	}
	if(this.display.indexOf("h") > -1){
		setIdDisabled(this.hrId,flag);
	}
	if(this.display.indexOf("M") > -1){
		setIdDisabled(this.minId,flag);
	}
	if(this.display.indexOf("s") > -1){
		setIdDisabled(this.secId,flag);
	}
};