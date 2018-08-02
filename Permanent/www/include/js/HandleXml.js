function HandleXml(){
	this.XmlDom;
	this.newNode;
}
HandleXml.prototype.init = function(XmlData,urlFlag){
    
	var errFlag = 0;
    /*
    if (window.XMLHttpRequest)
	{
		this.XmlDom=new XMLHttpRequest();
        if(urlFlag){
            this.XmlDom.open("GET",XmlData,false);
	        this.XmlDom.send();
        }
        else{
            if (window.DOMParser)
            {
                parser=new DOMParser();
                this.XmlDom=parser.parseFromString(XmlData,"text/xml");
            }
            else // Internet Explorer
            {
                this.XmlDom=new ActiveXObject("Microsoft.XMLDOM");
                this.XmlDom.async=false;
                this.XmlDom.loadXML(XmlData); 
            }

        }
	}
	else
	{
		this.XmlDom=new ActiveXObject("Microsoft.XMLHTTP");
        if(urlFlag){
            this.XmlDom.open("GET",XmlData,false);
	        this.XmlDom.send();
        }
        else{
            this.XmlDom.loadXML(XmlData);
        }
	}
	
	//return xhttp.responseXML;
    if (this.XmlDom.responseXML != null)
    {
        this.XmlDom = this.XmlDom.responseXML;
    }
    
    

	if(errFlag == 1){
		if(g_util_debug_mode){
			showMsg("Your browser doesn't support xml dom");
		}else{
			return false;
		}
	}
    */
    
    //if(isFF() || isChrome())
    if (window.ActiveXObject)
    {
        this.XmlDom = new ActiveXObject("Microsoft.XMLDOM");
		if(urlFlag){
			this.XmlDom.async = false;
			this.XmlDom.load(XmlData);
		}else{
			this.XmlDom.loadXML(XmlData);
		}
    }
    else
    {
        this.XmlDom=new XMLHttpRequest();
        if(urlFlag){
            this.XmlDom.open("GET",XmlData,false);
	        this.XmlDom.send();
        }
        else{
            if (window.DOMParser)
            {
                parser=new DOMParser();
                this.XmlDom=parser.parseFromString(XmlData,"text/xml");
            }
            else // Internet Explorer
            {
                this.XmlDom=new ActiveXObject("Microsoft.XMLDOM");
                this.XmlDom.async=false;
                this.XmlDom.loadXML(XmlData); 
            }

        }
    }

    if (this.XmlDom.responseXML != null)
    {
        this.XmlDom = this.XmlDom.responseXML;
    }


    /*
    var errFlag = 0;
	var arrSignatures = ["MSXML2.DOMDocument.5.0", "MSXML2.DOMDocument.4.0",
				"MSXML2.DOMDocument.3.0", "MSXML2.DOMDocument",
				"Microsoft.XmlDom"];

	if(isFF() || isChrome()){
		try{
			if(urlFlag){
				this.XmlDom = document.implementation.createDocument("", "", null);
				this.XmlDom.async = false;
				this.XmlDom.load(XmlData);
			}else{
				parser = new DOMParser();
				this.XmlDom = parser.parseFromString(XmlData,"text/xml");
				
			}
    		}catch(e){
    			errFlag = 1;
		}
	}else{
		for(var i=0; i < arrSignatures.length; i++){
			try {
				this.XmlDom = new ActiveXObject(arrSignatures[i]);
				if(urlFlag){
					this.XmlDom.async = false;
					this.XmlDom.load(XmlData);
				}else{
					this.XmlDom.loadXML(XmlData);
				}
				errFlag = 0;
				break;
			}catch(oError){
				errFlag = 1;
			}
		}
	}
	
	if(errFlag == 1){
		if(g_util_debug_mode){
			showMsg("Your browser doesn't support xml dom");
		}else{
			return false;
		}
	}
    */
};
HandleXml.prototype.setUrl = function(url){
    this.init(url,1);
};
HandleXml.prototype.setXml = function(XmlData){
	if(typeof(XmlData) == "string"){
		this.init(XmlData);
	}else{
		this.XmlDom = XmlData;
	}
};
HandleXml.prototype.getXml = function(){
	return this.XmlDom;
};
HandleXml.prototype.getItem = function(no,tag_name){
	var tmpNode = this.XmlDom.getElementsByTagName(tag_name)[no];
	if(tmpNode != null){
		return tmpNode;
	}else{
		if(g_util_debug_mode){
			showMsg("Can't find node " + tag_name + "[" + no + "]");
		}else{
			return false;
		}
	}
};
HandleXml.prototype.getItemSize = function(tag_name){
	var tmpNodes = this.XmlDom.getElementsByTagName(tag_name);
	if(tmpNodes != null){
		return tmpNodes.length;
	}else{
		return 0;
	}
};
HandleXml.prototype.getItemValue = function(no,tag_name){
	var tmpNode = this.getItem(no,tag_name);
	if(tmpNode != null){
		if(tmpNode.hasChildNodes()){
			return tmpNode.firstChild.nodeValue;
		}else{
			return "";
		}
	}
};
HandleXml.prototype.setItemValue = function(no,tag_name,value){
	var tmpNode = this.getItem(no,tag_name);
	if(tmpNode != null){
		if(tmpNode.hasChildNodes()){
			tmpNode.firstChild.nodeValue = value;
		}else{
			var newText = this.XmlDom.createTextNode(value);
			tmpNode.appendChild(newText);
		}
	}
	return this;
};
HandleXml.prototype.getNode = function(){
	//args[i] : tag name
	var args = arguments;
	if(typeof(args[0]) != "object"){
		var tmpXmlDom = this.XmlDom;
		for(var i = 0;i < args.length;i++){
			if(tmpXmlDom != null){
				tmpXmlDom =  tmpXmlDom.getElementsByTagName(args[i])[0];
			}
		}
		if(tmpXmlDom != null){
			return tmpXmlDom;
		}else{
			var errStr = "";
			for(var i = 0;i < args.length;i++){
				errStr += args[i] + " - " ;
			}
			if(g_util_debug_mode){
				showMsg("Can't find node " + errStr);
			}else{
				return false;
			}
		}
	}else{
		return args[0];
	}
};
HandleXml.prototype.getNodeValue = function(){
	//args[i] : tag name
	var args = arguments;
	var tmpXmlDom = this.XmlDom;

	for(var i = 0;i < args.length;i++){
		if(tmpXmlDom != null){
			tmpXmlDom =  tmpXmlDom.getElementsByTagName(args[i])[0];
		}
	}

	if(tmpXmlDom != null){
		if(tmpXmlDom.hasChildNodes()){
			return tmpXmlDom.firstChild.nodeValue;
		}else{
			return "";
		}
	}else{
		var errStr = "";
		for(var i = 0;i < args.length;i++){
			errStr += args[i] + " - " ;
		}
		if(g_util_debug_mode){
			showMsg("Can't find node " + errStr);
		}else{
			return false;
		}
	}
};
HandleXml.prototype.setNodeValue = function(){
	/*
	//args[0] : new value
	//args[i] : tag name	i >= 1
	*/
	var args = arguments;
	var tmpXmlDom = this.XmlDom;
	for(var i = 1;i < args.length;i++){
		if(tmpXmlDom != null){
			tmpXmlDom =  tmpXmlDom.getElementsByTagName(args[i])[0];
		}
	}
	if(tmpXmlDom != null){
		if(tmpXmlDom.hasChildNodes()){
			tmpXmlDom.firstChild.nodeValue = args[0];
		}else{
			var newText = this.XmlDom.createTextNode(args[0]);
			tmpXmlDom.appendChild(newText);
		}
		return this;
	}else{
		var errStr = "";
		for(var i = 1;i < args.length;i++){
			errStr += args[i] + " - " ;
		}
		if(g_util_debug_mode){
			showMsg("Can't find node " + errStr);
		}else{
			return false;
		}
	}
};
HandleXml.prototype.getNodeChildSize = function(){
	//args[i] : tag name
	var args = arguments;
	var tmpXmlDom = this.XmlDom;
	var tmpNode;
	for(var i = 0;i < args.length;i++){
		if(tmpXmlDom != null){
			tmpXmlDom =  tmpXmlDom.getElementsByTagName(args[i])[0];
		}
	}
	
	//return this.XmlDom.getElementsByTagName(args[0])[no].childNodes.length;		//error in Firefox
	
	if(tmpXmlDom != null){
		tmpNode = tmpXmlDom.childNodes;
		var nodeLen = 0; 
		for(var i = 0; i < tmpNode.length; i++){
			if (tmpNode[i].nodeType != 3 && tmpNode[i].nodeType != 8){
				nodeLen++; 
			}
		}
		return nodeLen;
	}else{
		var errStr = "";
		for(var i = 1;i < args.length;i++){
			errStr += args[i] + " - " ;
		}
		if(g_util_debug_mode){
			showMsg("Can't find node " + errStr);
		}else{
			return 0;
		}
	}
};
HandleXml.prototype.getNodeChildName = function(){
	//args[0] : tag name
    //args[1] : index
	var args = arguments;
	var tmpXmlDom = this.XmlDom;
	var tmpNode;
	if(tmpXmlDom != null)
		tmpXmlDom =  tmpXmlDom.getElementsByTagName(args[0])[0];
    if(tmpXmlDom.childNodes)		
    {
        tmpNode=tmpXmlDom.childNodes[args[1]];
        return tmpNode.nodeName;    
    }else
        return -1;
};
HandleXml.prototype.cloneNodeChild = function(){
	//args[0] : from node
	//args[1] : to node
	var args = arguments;
	var fromNode = args[0];
	var toNode = args[1];
	
	if(fromNode != toNode){
		var tmpToNodeChilds = toNode.childNodes;
		for(var i = tmpToNodeChilds.length - 1;i >= 0;i--){
			toNode.removeChild(tmpToNodeChilds[i]);
		}
	
		var cloneNode;
		for(var i = 0;i < fromNode.childNodes.length;i++){
			cloneNode = fromNode.childNodes[i].cloneNode(true);
			toNode.appendChild(cloneNode);
		}
	}
};
HandleXml.prototype.createNode = function(){
	//args[0] : node name
	//args[1] : node text
	var args = arguments;
	var name = args[0];
	var text = args[1];
	
	this.newNode = this.XmlDom.createElement(name);
	if(text != null){
		var tmpTextNode = this.XmlDom.createTextNode(text);
		this.newNode.appendChild(tmpTextNode);
	}
	return this.newNode;
};
HandleXml.prototype.setNodeAttr = function(){
	//args[0] : target node
	//args[1] : attribute name
	//args[2] : attribute value
	var args = arguments;
	var targetNode = this.getNode(args[0]);
	var name = args[1];
	var value = args[2];

	var tmpAttrNode = this.XmlDom.createAttribute(name);
	tmpAttrNode.nodeValue = value;
	targetNode.setAttributeNode(tmpAttrNode);
	return this;
};
HandleXml.prototype.insertBefore = function(){
	//args[0] : new Node
	//args[1] : target Node
	var args = arguments;
	var newNode = this.getNode(args[0]);
	var targetNode = this.getNode(args[1]);
	targetNode.parentNode.insertBefore(newNode,targetNode.nextSibling);
};
HandleXml.prototype.insertAfter = function(){
	//args[0] : new Node
	//args[1] : target Node
	var args = arguments;
	var newNode = this.getNode(args[0]);
	var targetNode = this.getNode(args[1]);
	
	var parent = targetNode.parentNode;
	if(parent.lastChild == targetNode){
		parent.appendChild(newNode);
	}else{
		parent.insertBefore(newNode,targetNode.nextSibling);
	}
};
HandleXml.prototype.GetLangXML = function(){
	//var tmpXmlDom = this.XmlDom.documentElement.childNodes.item(0).nodeName.value;
	//var tmpXmlDom = this.XmlDom.documentElement.childNodes.length;
	var tmpXmlDom = this.XmlDom.documentElement.childNodes;
	var tArray = new Array();
    var cnt = 0;
	for (i=0;i<tmpXmlDom.length;i++)
	{
		//tArray[i] = tmpXmlDom[i].childNodes[0].nodeValue;
        if (tmpXmlDom[i].nodeType != 3){
            tArray[cnt] = tmpXmlDom[i].childNodes[0].nodeValue;
            cnt++;
        }
	}
	//return tmpXmlDom.nodeName;
	return tArray;
};