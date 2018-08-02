function HandleLanguage(){
	//args[0]		library
	//args[1]		which language
	var args = arguments;
	this.lib = args[0]!=null?args[0]:"";
	this.type = args[1]!=null?args[1]:0;
	this.defaultLang = 0;
}
HandleLanguage.prototype.setType = function(type){
	this.type = type;
};
HandleLanguage.prototype.setLib = function(lib){
	this.lib = lib;
};
HandleLanguage.prototype.get = function(idx){
	if(typeof(this.lib[idx]) == 'string'){
		return this.lib[idx].trim();
	}else if(typeof(this.lib[idx]) == 'object'){
		if(typeof(this.lib[idx][this.type]) == 'undefined'){
			if(g_util_debug_mode){
				showMsg("Can't find lang - " + this.type + " - " + idx);
			}else{
				return this.lib[idx][this.defaultLang].trim();
			}
		}else if(this.lib[idx][this.type] == '' || this.lib[idx][this.type] == '""'){
			return this.lib[idx][this.defaultLang].trim();
		}else{
			return this.lib[idx][this.type].trim();
		}
	}else{
		if(g_util_debug_mode){
			showMsg("Can't find lang - " + idx);
		}else{
			return "";
		}
	}
};
HandleLanguage.prototype.showDataByTable = function(){
	var strHtml = "";
	
	strHtml += "<table border='1' cellpadding='0' cellspacing='0'>";
	
	for(var key in this.lib){
		strHtml += "<tr>";
			strHtml += "<td>" + key + "</td>";
		for(var k in this.lib[key]){
			if(k == "trim"){						//string status
				strHtml += "<td>" + this.lib[key] + "</td>";
			}else{								//array status
				strHtml += "<td>" + this.lib[key][k] + "</td>";
			}
		}
		strHtml += "</tr>";
	}
	
	strHtml += "</table>";
	return strHtml;
};
HandleLanguage.prototype.showData = function(){
	var strHtml = "";
	
	for(var key in this.lib){
		strHtml += "hl.get(\"" + key + "\");<br/>";
	}
	return strHtml;
};

HandleLanguage.prototype.showDataByTable1 = function(){
	var strHtml = "";
	
	for(var key in this.lib){
		for(var k in this.lib[key]){
			if (k==0)
			{
				if(k == "trim"){						//string status
					strHtml += "&lt;" +key + "&gt;" + this.lib[key] + "&lt;/" +key + "&gt;";
				}else{								//array status
					strHtml += "&lt;" +key + "&gt;"+ this.lib[key][k] + "&lt;/" +key + "&gt;";
				}
			}
			
		}
		strHtml += "<br/>";
	}
	return strHtml;
};

HandleLanguage.prototype.SetLangArray = function(theArray, idx){
	var strHtml = "";
	
	var cnt = 0;
	for(var key in this.lib){
		for(var k in this.lib[key]){
			if (k==idx)
			{
				this.lib[key][k] = theArray[cnt];
				cnt++;
			}
			
			
		}
		strHtml += "<br/>";
	}
	return strHtml;
};