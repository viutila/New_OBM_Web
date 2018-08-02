function MultipleCheckbox(){
	/*
	need use utility.js MultipleCheckbox.css
	*/
	//args[0]	method
			//set the selected checkbox disabled	d
			//after init,open the MultipleCheckbox	o
	//args[1]	container id
	//args[2]	tbl title
	//args[3]	tbl offsetTop				if value isn't null => position:absolute
	//args[4]	tbl offsetLeft
	//args[5]	handle language
	var args = arguments;
	this.method = args[0]!=null?args[0]:"";
	this.containerId = args[1];
	this.title = args[2]!=null?args[2]:"";
	this.tblTop = args[3]!=null?args[3]:null;
	this.tblLeft = args[4]!=null?args[4]:null;
	this.hl = args[5]!=null?args[5]:null;
	
	//keyword
	this.idKey = "mc_";
	this.classKey = "mc_";
	
	this.ary;
	this.aryChecked = new Array();
	this.funcOk;
	this.funcCancel;
	this.cols = 3;
	this.selectedText;
	this.selectedIdx;
	this.keepValAry;

	//check repeat no
	this.no = 0;
	//setup id
	this.tblId;
	this.tblChkId;
	this.barId;
	this.btnSelAllId;
	this.btnClearAllId;
	this.btnOkId;
	this.btnCancelId;
	//setup class
	this.tblClass;
	this.tblChkClass;
	this.barClass;
	this.btnClass;
	
	this.START = -1;
	this.END = -1;
	
	if(args.length > 0){
		this.init();
	}
}
MultipleCheckbox.prototype.init = function(){
	this.setMembers();
	this.appendSkin();
	if(this.method.indexOf("o") > -1){
		this.open();
	}
	return this;
};
MultipleCheckbox.prototype.setMembers = function(){
	while(document.getElementById(this.idKey + "tbl" + this.no)){
		this.no++;
	}
	//setup id
	this.tblId = this.idKey + "tbl" + this.no;
	this.tblChkId = this.idKey + "tblChk" + this.no;
	this.barId = this.idKey + "bar" + this.no;
	this.btnSelAllId = this.idKey + "btnSelAll" + this.no;
	this.btnClearAllId = this.idKey + "btnClearAll" + this.no;
	this.btnOkId = this.idKey + "btnOk" + this.no;
	this.btnCancelId = this.idKey + "btnCanecl" + this.no;
	
	//setup class
	this.tblClass = this.classKey + "tbl";
	this.tblChkClass = this.classKey + "tblChk";
	this.tblChkTdClass = this.classKey + "tblChkTd";
	this.barClass = this.classKey + "bar";
	this.btnClass = this.classKey + "btn";
	return this;
};
MultipleCheckbox.prototype.appendSkin = function(){
	var obj = this;
	var skin = "";
	if(this.tblTop != null){
		skin += 	'<table id="' + this.tblId + '" class="' + this.tblClass + '" border="1" cellspacing="0" cellpadding="0" style="position:absolute;top: ' + this.tblTop + 'px;left: ' + this.tblLeft + 'px;">';
	}else{
		skin += 	'<table id="' + this.tblId + '" class="' + this.tblClass + '" border="1" cellspacing="0" cellpadding="0">';
	}
	skin += 		'<tr>';
	skin +=				"<td id='" + this.barId + "' class='" + this.barClass + "' colspan='2'>" + this.title + "</td>";
	skin += 		'</tr>';
	skin += 		'<tr>';
	skin +=				"<td valign='top'>";
	skin += 				'<table id="' + this.tblChkId + '" class="' + this.tblChkClass + '" border="0" cellspacing="0" cellpadding="0"></table>';
	skin +=				"</td>";
	skin +=				"<td valign='top'>";
	skin += 				'<table border="0" cellspacing="0" cellpadding="4">';
	skin +=						"<tr>";
	skin +=							"<td>";
	skin +=								"<input type='button' id='" + this.btnSelAllId + "' class='" + this.btnClass + "' value='" + this.hl.get("SEL_ALL") + "'/>";
	skin +=							"</td>";
	skin +=						"</tr>";
	skin +=						"<tr>";
	skin +=							"<td>";
	skin +=								"<input type='button' id='" + this.btnClearAllId + "' class='" + this.btnClass + "' value='" + this.hl.get("CLEAR_ALL") + "'/>";
	skin +=							"</td>";
	skin +=						"</tr>";
	skin +=						"<tr>";
	skin +=							"<td>";
	skin +=								"<input type='button' id='" + this.btnOkId + "' class='" + this.btnClass + "' value='" + this.hl.get("OK") + "'/>";
	skin +=							"</td>";
	skin +=						"</tr>";
	skin +=						"<tr>";
	skin +=							"<td>";
	skin +=								"<input type='button' id='" + this.btnCancelId + "' class='" + this.btnClass + "' value='" + this.hl.get("CANCEL") + "'/>";
	skin +=							"</td>";
	skin +=						"</tr>";
	skin +=					"</table>";
	skin +=				"</td>";
	skin += 		'</tr>';
	skin += 	'</table>';

	setIdInnerHTML(this.containerId,skin);
	
	this.close();
	
	setIdOnclick(this.btnSelAllId,function(){
						for(var i = 0;i < obj.ary.length;i++){
							if(i < obj.START || i > obj.END)
								setIdChecked(obj.tblChkId + "_" + i,1);
						}
					});
	setIdOnclick(this.btnClearAllId,function(){
						for(var i = 0;i < obj.ary.length;i++){
							if(!(obj.method.indexOf("d") > -1 && obj.selectedIdx == i)){
								setIdChecked(obj.tblChkId + "_" + i,0);
							}
						}
					});
	setIdOnclick(this.btnOkId,function(){
						obj.setAryChecked();
						setIdDisplay(obj.containerId,"none");
						if(obj.funcOk){
							obj.funcOk();
						}
					});
	setIdOnclick(this.btnCancelId,function(){
						obj.setValue(obj.aryChecked);
						setIdDisplay(obj.containerId,"none");
						if(obj.funcCancel){
							obj.funcCancel();
						}
					});
	return this;
};
MultipleCheckbox.prototype.setAry = function(ary){
	this.ary = ary;
	return this;
};
MultipleCheckbox.prototype.setValue = function(aryVal){
	for(var i = 0;i < aryVal.length;i++){
		setIdChecked(this.tblChkId + "_" + i,aryVal[i]);
	}
	this.setAryChecked();
	return this;
};
MultipleCheckbox.prototype.createList = function(){
	var ht = new HandleTable(this.tblChkId);
	ht.clear();
	this.aryChecked = new Array();
	for(var i = 0;i < this.ary.length;i++){
		if(i % this.cols == 0){
			ht.insertRow();	
		}
			ht.insertCell().attr("noWrap",true)
					.className(this.tblChkTdClass)
					.innerHTML(this.ary[i] + "<input type='checkbox' id='" + this.tblChkId + "_" + i + "'/>");
		if(i >= this.START && i <= this.END)
			setIdDisabled(this.tblChkId + "_" + i,1);
					
		if(this.selectedText){
			if(this.selectedText.toString().toLowerCase() == this.ary[i].toString().toLowerCase()){
				this.selectedIdx = i;
				setIdChecked(this.tblChkId + "_" + i,1);
				if(this.method.indexOf("d") > -1){
					setIdDisabled(this.tblChkId + "_" + i,1);
				}
			}
		}
		this.aryChecked.push(0);
	}
	return this;
};
MultipleCheckbox.prototype.setAryChecked = function(){
	this.aryChecked = new Array();
	for(var i = 0;i < this.ary.length;i++){
		this.aryChecked.push(getIdChecked(this.tblChkId + "_" + i));
	}
	return this;
};
MultipleCheckbox.prototype.setFuncOk = function(func){
	this.funcOk = func;
	return this;
};
MultipleCheckbox.prototype.setFuncCancel = function(func){
	this.funcCancel = func;
	return this;
};
MultipleCheckbox.prototype.setTitle = function(title){
	this.title = title;
	setIdInnerHTML(this.barId,this.title);
	return this;
};
MultipleCheckbox.prototype.open = function(func){
	setIdDisplay(this.containerId,"block");
	return this;
};
MultipleCheckbox.prototype.close = function(func){
	setIdDisplay(this.containerId,"none");
	return this;
};
MultipleCheckbox.prototype.setCols = function(no){
	this.cols = no;
	return this;
};
MultipleCheckbox.prototype.setSelectedText = function(str){
	this.selectedText = str;
	return this;
};
MultipleCheckbox.prototype.setChkDisable = function(start,end){
	this.START = start;
	this.END = end;
	return this;
};