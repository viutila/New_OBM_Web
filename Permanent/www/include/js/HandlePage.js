function HandlePage(){
	var hp = this;
	//args[0]	CURRENT PAGE
	//args[1]	ITEM / PER PAGE
	//args[2]	DATA COUNTS
	var args = arguments;
	if(args[0] != null){
		this.CURRENT = args[0].toInt();
	}else{
		alert("Can't find '" + args[0] + "'");
	}
	if(args[1] != null){
		this.SIZE = args[1].toInt();
	}else{
		alert("Can't find '" + args[1] + "'");
	}
	if(args[2] != null){
		this.DATA_COUNTS = args[2].toInt();
	}else{
		alert("Can't find '" + args[2] + "'");
	}

	this.BEGIN;
	this.END;
	this.TOTAL;
	this.PREV;
	this.PREVPREV;
	this.NEXT;
	this.NEXTNEXT;
	this.BEGIN_INDEX;
	this.END_INDEX;

	this.PAGE_RANGE = 10;
	this.PAGE_RANGE_START = 0;
	this.PAGE_RANGE_END = 0;

	this.init();
}
HandlePage.prototype.init = function(){
	if(this.DATA_COUNTS == 0){
		this.CURRENT = 0;
	}
	this.getTotal();
	if(this.CURRENT > this.getTotal()){
		this.CURRENT = this.getTotal();
	}
	this.getBegin();
	this.getEnd();
	this.getPrev();
	this.getPrevPrev();
	this.getNext();
	this.getNextNext();
	this.getBeginIndex();
	this.getEndIndex();
};
HandlePage.prototype.setSize = function(no){
	this.SIZE = no.toInt();
	this.init();	
};
HandlePage.prototype.setCurrent = function(no){
	var tmpNo = no.toInt();
	if(tmpNo < 1){
		tmpNo = 1;
	}
	if(tmpNo > this.TOTAL){
		tmpNo = this.TOTAL;
	}
	this.CURRENT = tmpNo;
	this.init();	
};
HandlePage.prototype.getCurrent = function(){
	return this.CURRENT;
}
HandlePage.prototype.getTotal = function(){
	if((this.DATA_COUNTS % this.SIZE) > 0 ){
		this.TOTAL = Math.floor((this.DATA_COUNTS / this.SIZE) + 1);
	}else{
		this.TOTAL = Math.ceil(this.DATA_COUNTS / this.SIZE);	
	}
	return this.TOTAL;
};
HandlePage.prototype.getBegin = function(){
	if(this.TOTAL > 0 && this.CURRENT != 1){
		this.BEGIN = 1;
	}else{
		this.BEGIN = 0;
	}
};
HandlePage.prototype.getEnd = function(){
	if(this.TOTAL > 0  && this.CURRENT != this.TOTAL){
		this.END = this.TOTAL;
	}else{
		this.END = 0;
	}
};
HandlePage.prototype.getPrev = function(){
	if(this.CURRENT > 1){
		this.PREV = this.CURRENT - 1;
	}else{
		this.PREV = 0;
	}
};
HandlePage.prototype.getPrevPrev = function(){
	if(this.CURRENT > 2){
		this.PREVPREV = this.CURRENT - 2;
	}else{
		this.PREVPREV = 0;
	}
};
HandlePage.prototype.getNext = function(){
	if(this.CURRENT < this.TOTAL){
		this.NEXT = this.CURRENT + 1;
	}else{
		this.NEXT = 0;
	}
};
HandlePage.prototype.getNextNext = function(){
	if(this.CURRENT + 1 < this.TOTAL){
		this.NEXTNEXT = this.CURRENT + 2;
	}else{
		this.NEXTNEXT = 0;
	}
};
HandlePage.prototype.getBeginIndex = function(){
	this.BEGIN_INDEX = (this.CURRENT - 1) * this.SIZE + 1;
	if(this.BEGIN_INDEX < 0){
		this.BEGIN_INDEX = 0;
	}
};
HandlePage.prototype.getEndIndex = function(){
	this.END_INDEX  = this.CURRENT * this.SIZE;
	if(this.END_INDEX > this.DATA_COUNTS){
		this.END_INDEX = this.DATA_COUNTS;
	}
};
HandlePage.prototype.setPageRange = function(RangeValue){
	if((this.CURRENT - RangeValue) <= 0){
		this.PAGE_RANGE_START = 1;
	}else{
		this.PAGE_RANGE_START = this.CURRENT - RangeValue;
	}
	
	if((this.CURRENT + RangeValue) > this.TOTAL){
		this.PAGE_RANGE_END = this.TOTAL;
	}else{
		this.PAGE_RANGE_END = this.CURRENT + RangeValue;
	}
};