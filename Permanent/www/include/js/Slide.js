function Slide(){
	/*
	need use utility.js
	*/
	//args[0]	input id
	//args[1]	area id
	//args[2]	bar id
	//args[3]	area offsetTop			default:100
	//args[4]	area offsetLeft			default:200
	//args[5]	adjust bar Top position		default:8
	//args[6]	adjust bar Left position	default:-2
	//args[7]	min value			default:1
	//args[8]	max value			default:255
	//args[9]	slide area width		default:100
	//args[10]	slide area height		default:4
	//args[11]	slide bar width			default:8
	var args = arguments;
	this.inputId = args[0];
	this.areaId = args[1];
	this.barId = args[2];
	this.areaTop = args[3]!=null?args[3]:100;
	this.areaLeft = args[4]!=null?args[4]:200;
	this.adjustBarTop = args[5]!=null?args[5]:8;
	this.adjustBarLeft = args[6]!=null?args[6]:-2;
	this.adjustBarLeft += isFF() || isChrome()?-4:0;
	this.valueMin = args[7]!=null?args[7]:1;
	this.valueMax = args[8]!=null?args[8]:255;
	this.areaWidth = args[9]!=null?args[9]:100;
	this.areaHeight = args[10]!=null?args[10]:4;
	this.barWidth = args[11]!=null?args[11]:8;

	this.posMin;			//position min
	this.posMax;			//position max
	this.currentPosition;		//currentPostion;
	this.barColor = "#17569A";	//bar color
	this.flag = 0;

	if(args.length > 0){
		this.init();
	}
}
Slide.prototype.init = function(){
	this.setObjStyle();
	this.setValue(this.valueMin);
};
Slide.prototype.setObjStyle = function(){
	var obj = this;
	EFDEF_(this.areaId).position("absolute")
			.top(this.areaTop)
			.left(this.areaLeft)
			.width(this.areaWidth)
			.height(this.areaHeight)
			.disabled(1);
	
	EFDEF_(this.barId).position("absolute")
			.top(this.areaTop - this.adjustBarTop)
			.left(this.areaLeft - this.barWidth / 2)
			.width(this.barWidth)
			.height(20)
			.cursor("w-resize")
			.bgColor(this.barColor)
			.onmousedown(
				function(){
					obj.start();
				});

	this.posMin = getIdStyleLeft(this.areaId) + this.adjustBarLeft;
	this.posMax = this.posMin + this.areaWidth + this.adjustBarLeft;
	this.currentPosition = this.areaLeft - this.barWidth / 2;
	
	if(this.inputId){
		setIdOnkeyup(this.inputId,function(){
						obj.KyUp();
					});
	}
};
Slide.prototype.GetPosition = function(inputValue){
	return (this.posMin + Math.floor((this.posMax - this.posMin) * (inputValue - this.valueMin) / (this.valueMax - this.valueMin) + 0.5));
};
Slide.prototype.setValue = function(inputValue){
	if(inputValue > this.valueMax){
		inputValue = this.valueMax;
	}
	if(inputValue < this.valueMin){
		inputValue = this.valueMin;
	}
	if(this.inputId){
		setIdValue(this.inputId,inputValue);
	}
	if(this.valueMin != this.valueMax){
		setIdLeft(this.barId,this.GetPosition(inputValue));
		this.currentPosition = this.GetPosition(inputValue);
	}
};
Slide.prototype.getValue = function(){
	return (this.valueMin + Math.floor((this.valueMax - this.valueMin) * (this.currentPosition - this.posMin) / (this.posMax - this.posMin) + 0.5));
};
Slide.prototype.KyUp = function(){
	var y;

	y = getIdValue(this.inputId).toInt();
	if(y < this.valueMin){
		y = this.valueMin;
	}
	if(y > this.valueMax){
		y = this.valueMax;
	}
	if(y >= this.valueMin && y <= this.valueMax){
		if(this.valueMin != this.valueMax){
			setIdLeft(this.barId,this.GetPosition(y));
		}
		setIdValue(this.inputId,y);
	}
};
Slide.prototype.start = function() {
	this.flag = 1;
	
};
Slide.prototype.stop = function() {
	this.flag = 0;
};
Slide.prototype.move = function(e) {
	if(this.flag == 1){
		e = e || event;
		var x = e.clientX - 141;
		x -= this.barWidth / 2;
		if(x > this.posMax){
			x = this.posMax;
		}
		if(x < this.posMin){
			x = this.posMin;
		}
		setIdLeft(this.barId,x);
		this.currentPosition = x;
		if(this.inputId){
			setIdValue(this.inputId,this.getValue());
		}
	}
};