function cgi(){
	this.ajax = new AjaxClass();
	
	//login id
	this.sid;
	//archive id
	this.aid;
	//playback id
	this.pbid;
	//ptz id
	this.ptzId;
	//search id
	this.search_id;
	//step speed
	this.step;
	
	this.playBackSpeed = new Array(0,1,2,4,8,16,32);
	this.FFSpeedFlag = 1;
	this.FBSpeedFlag = 1;

	this.autoFlag = 1;
	this.menuFlag = 1;
	this.step = -9999;
}
cgi.prototype.login = function(fn){
	this.ajax.getAsynData("../cgi-bin/Live.cgi?cmd=register_stream",fn);
};
cgi.prototype.setLiveStream = function(no,type){
	var tmpChMap = 0xffff;//meta for all channel because archive
	var t = type!=null?type:0;
//	this.ajax.getData("Live.cgi?cmd=stream_ctrl&stream_id=" + this.sid + "&camera=" + no + "&meta=" + tmpChMap + "&video_type=" + t);
	this.ajax.getData("../cgi-bin/Live.cgi?cmd=stream_ctrl&stream_id=" + this.sid + "&camera=" + no + "&meta=" + tmpChMap);
	showMsg("../cgi-bin/setLiveStream Live.cgi? s_id=" + this.sid + "&cam=" + no + "&meta=" + tmpChMap);
};
cgi.prototype.setLiveAudio = function(no){
	showMsg("../cgi-bin/Live.cgi?cmd=stream_ctrl&stream_id=" + this.sid + "&audio=" + no);
	this.ajax.getData("../cgi-bin/Live.cgi?cmd=stream_ctrl&stream_id=" + this.sid + "&audio=" + no);
};
cgi.prototype.changeRcdStream = function(rcd_type)
{	//rcd_type 0:record 1:record 2
	this.ajax.getData("../../cgi-bin/Live.cgi?cmd=stream_ctrl&stream_id=" + this.sid + "&video_type="+ rcd_type);
	showMsg("../../cgi-bin/changeRcdStream Live.cgi? s_id=" + this.sid + "&v_t="+ rcd_type);
};
//==============================================================
//PTZ
cgi.prototype.tiltUp = function(){
	if(this.step>0)
		return this.ajax.getAsynData("../cgi-bin/Live.cgi?stream_id=" + this.sid + "&camera=" + this.ptzId + "&cmd=ptz_ctrl&action=tilt&value=up" + "&step=" + this.step);
	else
		return this.ajax.getAsynData("../cgi-bin/Live.cgi?stream_id=" + this.sid + "&camera=" + this.ptzId + "&cmd=ptz_ctrl&action=tilt&value=up");
};
cgi.prototype.tiltDown = function(){
	if(this.step>0)
		return this.ajax.getAsynData("../cgi-bin/Live.cgi?stream_id=" + this.sid + "&camera=" + this.ptzId + "&cmd=ptz_ctrl&action=tilt&value=down" + "&step=" + this.step);
	else
		return this.ajax.getAsynData("../cgi-bin/Live.cgi?stream_id=" + this.sid + "&camera=" + this.ptzId + "&cmd=ptz_ctrl&action=tilt&value=down");
};
cgi.prototype.panLeft = function(){
	if(this.step>0)
		return this.ajax.getAsynData("../cgi-bin/Live.cgi?stream_id=" + this.sid + "&camera=" + this.ptzId + "&cmd=ptz_ctrl&action=pan&value=left" + "&step=" + this.step);
	else
		return this.ajax.getAsynData("../cgi-bin/Live.cgi?stream_id=" + this.sid + "&camera=" + this.ptzId + "&cmd=ptz_ctrl&action=pan&value=left");
};
cgi.prototype.panRight = function(){
	if(this.step>0)
		return this.ajax.getAsynData("../cgi-bin/Live.cgi?stream_id=" + this.sid + "&camera=" + this.ptzId + "&cmd=ptz_ctrl&action=pan&value=right" + "&step=" + this.step);
	else
		return this.ajax.getAsynData("../cgi-bin/Live.cgi?stream_id=" + this.sid + "&camera=" + this.ptzId + "&cmd=ptz_ctrl&action=pan&value=right");
};
cgi.prototype.RightUP = function(){
	if(this.step>0)
		return this.ajax.getAsynData("../cgi-bin/Live.cgi?stream_id=" + this.sid + "&camera=" + this.ptzId + "&cmd=ptz_ctrl&action=pan_tilt&value=right_up " + "&step=" + this.step);
	else
		return this.ajax.getAsynData("../cgi-bin/Live.cgi?stream_id=" + this.sid + "&camera=" + this.ptzId + "&cmd=ptz_ctrl&action=pan_tilt&value=right_up ");
};
cgi.prototype.RightDown = function(){
	if(this.step>0)
		return this.ajax.getAsynData("../cgi-bin/Live.cgi?stream_id=" + this.sid + "&camera=" + this.ptzId + "&cmd=ptz_ctrl&action=pan_tilt&value=right_down" + "&step=" + this.step);
	else
		return this.ajax.getAsynData("../cgi-bin/Live.cgi?stream_id=" + this.sid + "&camera=" + this.ptzId + "&cmd=ptz_ctrl&action=pan_tilt&value=right_down");
};
cgi.prototype.LeftUP = function(){
	if(this.step>0)
		return this.ajax.getAsynData("../cgi-bin/Live.cgi?stream_id=" + this.sid + "&camera=" + this.ptzId + "&cmd=ptz_ctrl&action=pan_tilt&value=left_up" + "&step=" + this.step);
	else
		return this.ajax.getAsynData("../cgi-bin/Live.cgi?stream_id=" + this.sid + "&camera=" + this.ptzId + "&cmd=ptz_ctrl&action=pan_tilt&value=left_up");
};
cgi.prototype.LeftDown = function(){
	if(this.step>0)
		return this.ajax.getAsynData("../cgi-bin/Live.cgi?stream_id=" + this.sid + "&camera=" + this.ptzId + "&cmd=ptz_ctrl&action=pan_tilt&value=left_down" + "&step=" + this.step);
	else
		return this.ajax.getAsynData("../cgi-bin/Live.cgi?stream_id=" + this.sid + "&camera=" + this.ptzId + "&cmd=ptz_ctrl&action=pan_tilt&value=left_down");
};
cgi.prototype.zoomOut = function(){
    if(this.step>0)
	    return this.ajax.getAsynData("../cgi-bin/Live.cgi?stream_id=" + this.sid + "&camera=" + this.ptzId + "&cmd=ptz_ctrl&action=zoom&value=out"+ "&step=" + this.step);
    else
		return this.ajax.getAsynData("../cgi-bin/Live.cgi?stream_id=" + this.sid + "&camera=" + this.ptzId + "&cmd=ptz_ctrl&action=zoom&value=out");
};
cgi.prototype.zoomIn = function(){
    if(this.step>0)
        this.ajax.getAsynData("../cgi-bin/Live.cgi?stream_id=" + this.sid + "&camera=" + this.ptzId + "&cmd=ptz_ctrl&action=zoom&value=in"+ "&step=" + this.step);
    else
		this.ajax.getAsynData("../cgi-bin/Live.cgi?stream_id=" + this.sid + "&camera=" + this.ptzId + "&cmd=ptz_ctrl&action=zoom&value=in");
};
cgi.prototype.focusFar = function(){
    if(this.step>0)
        this.ajax.getAsynData("../cgi-bin/Live.cgi?stream_id=" + this.sid + "&camera=" + this.ptzId + "&cmd=ptz_ctrl&action=focus&value=far"+ "&step=" + this.step);
    else
		this.ajax.getAsynData("../cgi-bin/Live.cgi?stream_id=" + this.sid + "&camera=" + this.ptzId + "&cmd=ptz_ctrl&action=focus&value=far");
};
cgi.prototype.focusNear = function(){
    if(this.step>0)
        this.ajax.getAsynData("../cgi-bin/Live.cgi?stream_id=" + this.sid + "&camera=" + this.ptzId + "&cmd=ptz_ctrl&action=focus&value=near"+ "&step=" + this.step);
    else
		this.ajax.getAsynData("../cgi-bin/Live.cgi?stream_id=" + this.sid + "&camera=" + this.ptzId + "&cmd=ptz_ctrl&action=focus&value=near");
};
cgi.prototype.irisOpen = function(){
    if(this.step>0)
        this.ajax.getAsynData("../cgi-bin/Live.cgi?stream_id=" + this.sid + "&camera=" + this.ptzId + "&cmd=ptz_ctrl&action=iris&value=open"+ "&step=" + this.step);
    else
		this.ajax.getAsynData("../cgi-bin/Live.cgi?stream_id=" + this.sid + "&camera=" + this.ptzId + "&cmd=ptz_ctrl&action=iris&value=open");
};
cgi.prototype.irisClose = function(){
    if(this.step>0)
        this.ajax.getAsynData("../cgi-bin/Live.cgi?stream_id=" + this.sid + "&camera=" + this.ptzId + "&cmd=ptz_ctrl&action=iris&value=close"+ "&step=" + this.step);
    else
		this.ajax.getAsynData("../cgi-bin/Live.cgi?stream_id=" + this.sid + "&camera=" + this.ptzId + "&cmd=ptz_ctrl&action=iris&value=close");
};
cgi.prototype.clear = function(no){
	this.ajax.getData("../cgi-bin/Live.cgi?stream_id=" + this.sid + "&camera=" + this.ptzId + "&cmd=ptz_ctrl&action=clear&value=" + no);
};
cgi.prototype.presetGo = function(no){
	this.ajax.getData("../cgi-bin/Live.cgi?stream_id=" + this.sid + "&camera=" + this.ptzId + "&cmd=ptz_ctrl&action=go_preset&value=" + no);
};
cgi.prototype.presetSet = function(no){
	this.ajax.getData("../cgi-bin/Live.cgi?stream_id=" + this.sid + "&camera=" + this.ptzId + "&cmd=ptz_ctrl&action=set_preset&value=" + no);
};
cgi.prototype.autoPan = function(){
	var tmpStr = "";
	if(this.autoFlag == 0){
		tmpStr = "stop";
		this.autoFlag = 1;
	}else{
		tmpStr = "run";
		this.autoFlag = 0;
	}
	this.ajax.getData("../cgi-bin/Live.cgi?stream_id=" + this.sid + "&camera=" + this.ptzId + "&cmd=ptz_ctrl&action=auto_pan&value=" + tmpStr);
};
cgi.prototype.pattern = function(){
	this.ajax.getData("../cgi-bin/Live.cgi?stream_id=" + this.sid + "&camera=" + this.ptzId + "&cmd=ptz_ctrl&action=pattern&value=1");
};
cgi.prototype.tour = function(no){
	this.ajax.getData("../cgi-bin/Live.cgi?stream_id=" + this.sid + "&camera=" + this.ptzId + "&cmd=ptz_ctrl&action=go_tour&value=" + no);
};
cgi.prototype.stopMove = function(){
	if(this.step<0)
		this.ajax.getData("../cgi-bin/Live.cgi?stream_id=" + this.sid + "&camera=" + this.ptzId + "&cmd=ptz_ctrl&action=stop");
};
cgi.prototype.menu = function(){
	var tmpStr = "";
	if(this.menuFlag == 0){
		tmpStr = "exit";
		this.menuFlag = 1;
	}else{
		tmpStr = "open";
		this.menuFlag = 0;
	}
	this.ajax.getData("../cgi-bin/Live.cgi?stream_id=" + this.sid + "&camera=" + this.ptzId + "&cmd=ptz_ctrl&action=menu&value=" + tmpStr);
};
//==============================================================
//playback
cgi.prototype.PbLogin = function(){
	this.pbid = this.ajax.getData("../cgi-bin/Playback.cgi?cmd=register_stream");
};
cgi.prototype.setPbStream = function(no){
	var args = arguments;
	var rcd_type = args[1]!=null?args[1]:1;//default dual stream
	var tmpChMap = 0xffff;//meta for all channel because archive
	this.ajax.getData("../cgi-bin/Playback.cgi?cmd=stream_ctrl&stream_id=" + this.pbid + "&camera=" + no + "&meta=" + tmpChMap + "&video_type="+ rcd_type);
};
cgi.prototype.setPbAudio = function(no){
	this.ajax.getData("../cgi-bin/Playback.cgi?cmd=stream_ctrl&stream_id=" + this.pbid + "&audio=" + no);
};
cgi.prototype.changePbRcdStream = function(rcd_type)
{	//rcd_type 0:record 1:record 2
	this.ajax.getData("../cgi-bin/Playback.cgi?cmd=stream_ctrl&stream_id=" + this.pbid + "&video_type="+ rcd_type);
};
cgi.prototype.PbCancel = function(){
	this.ajax.getData("../cgi-bin/Playback.cgi?cmd=stream_ctrl&stream_id=" + this.pbid + "&action=cancel");
	this.FFSpeedFlag = 1;
	this.FBSpeedFlag = 1;
};
cgi.prototype.PbPause = function(){
	this.ajax.getData("../cgi-bin/Playback.cgi?cmd=stream_ctrl&stream_id=" + this.pbid + "&action=pause");
	this.FFSpeedFlag = 1;
	this.FBSpeedFlag = 1;
};
cgi.prototype.PbBackward = function(){
	this.ajax.getData("../cgi-bin/Playback.cgi?cmd=stream_ctrl&stream_id=" + this.pbid + "&action=backward");
	this.FFSpeedFlag = 1;
	this.FBSpeedFlag = 1;
};
cgi.prototype.PbForward = function(){
	this.ajax.getData("../cgi-bin/Playback.cgi?cmd=stream_ctrl&stream_id=" + this.pbid + "&action=forward");
	this.FFSpeedFlag = 1;
	this.FBSpeedFlag = 1;
};
cgi.prototype.PbFastBackward = function(){
	//args[0]	speed
	var args = arguments;
	if(args[0] != null){
		this.FBSpeedFlag = args[0];
	}else{
		if(this.FBSpeedFlag < this.playBackSpeed.length - 1){
			this.FBSpeedFlag++;
		}
	}
	this.ajax.getData("../cgi-bin/Playback.cgi?cmd=stream_ctrl&stream_id=" + this.pbid + "&action=fast-backward&speed=" + this.playBackSpeed[this.FBSpeedFlag]);
	this.FFSpeedFlag = 1;
};
cgi.prototype.PbFastForward = function(){
	//args[0]	speed
	var args = arguments;
	if(args[0] != null){
		this.FFSpeedFlag = args[0];
	}else{
		if(this.FFSpeedFlag < this.playBackSpeed.length - 1){
			this.FFSpeedFlag++;
		}
	}
	this.ajax.getData("../cgi-bin/Playback.cgi?cmd=stream_ctrl&stream_id=" + this.pbid + "&action=fast-forward&speed=" + this.playBackSpeed[this.FFSpeedFlag]);
	this.FBSpeedFlag = 1;
};
cgi.prototype.PbStepBackward = function(){
	this.ajax.getData("../cgi-bin/Playback.cgi?cmd=stream_ctrl&stream_id=" + this.pbid + "&action=step-backward");
	this.FFSpeedFlag = 1;
	this.FBSpeedFlag = 1;
};
cgi.prototype.PbStepForward = function(){
	this.ajax.getData("../cgi-bin/Playback.cgi?cmd=stream_ctrl&stream_id=" + this.pbid + "&action=step-forward");
	this.FFSpeedFlag = 1;
	this.FBSpeedFlag = 1;
};
//==============================================================
//archive
cgi.prototype.getAid = function(){
	this.aid = this.ajax.getData("../cgi-bin/Archive.cgi?cmd=register_stream");
};
cgi.prototype.requestArchive = function(cam,start_time,end_time){
	return this.ajax.getData("../cgi-bin/Archive.cgi?cmd=query&camera=" + cam + "&start_time=" + start_time + "&end_time=" + end_time);
};
cgi.prototype.cancelArchive = function(){
	return this.ajax.getData("../cgi-bin/Archive.cgi?action=cancel&stream_id=" + this.aid);
};
//==============================================================
//quick archive
cgi.prototype.QuickArchive = function(){
	return this.ajax.getData("../cgi-bin/LocalArchive.cgi?cmd=quick_archive");
};
cgi.prototype.NormalArchive = function(camera,start_time,end_time,media,player){
	return this.ajax.getData("../cgi-bin/LocalArchive.cgi?cmd=archive&camera=" + camera + "&start_time=" + start_time + "&end_time=" + end_time + "&media=" + media + "&player=" + player);
};
cgi.prototype.MediaStatus = function(){
	return this.ajax.getData("../cgi-bin/LocalArchive.cgi?cmd=media_status");
};
cgi.prototype.ArchiveStatus = function(){
	return this.ajax.getData("../cgi-bin/LocalArchive.cgi?cmd=archive_status");
};
cgi.prototype.QueryArchiveInterval = function(){
	return this.ajax.getData("../cgi-bin/LocalArchive.cgi?cmd=query_archive_interval");
};
//Nonvideo Archive
cgi.prototype.NonvideoArchive = function(cam,conditions,starttime,endtime){
	return this.ajax.getData("../cgi-bin/NonvideoArchive.cgi?camera="+ cam +"&conditions="+ conditions +"&start_time="+ starttime +"&end_time="+ endtime);
};
cgi.prototype.NonvideoArchiveId = function(archive_id){
	return this.ajax.getData("../cgi-bin/NonvideoArchive.cgi?archive_id="+ archive_id);
};
//===============================================================
//disk
cgi.prototype.diskFormat = function(){
	return this.ajax.getData("../cgi-bin/Disk.cgi?cmd=format");
};
cgi.prototype.diskDelete = function(){
	return this.ajax.getData("../cgi-bin/Disk.cgi?cmd=delete");
};
cgi.prototype.diskUnlock = function(){
	return this.ajax.getData("../cgi-bin/Disk.cgi?cmd=unlock");
};
//==============================================================
//log
//new log cgi for new code base
cgi.prototype.getLogId = function(type,start_time,end_time,total){
	//Configurations	1
	//Event			2
	//Record		4
	//Operation		8
	//User			16
	return this.ajax.getData("../cgi-bin/Log.cgi?type=" + type + "&start_time=" + start_time + "&end_time=" + end_time +"&total=" + total);
};
cgi.prototype.getLogData = function(){

	return this.ajax.getData("../cgi-bin/Log.cgi?log_id=" + this.search_id);
};
cgi.prototype.cancelLogSearch = function(){
	return this.ajax.getData("../cgi-bin/Log.cgi?log_id=" + this.search_id + "&action=cancel");
};
//**********Old**************//
cgi.prototype.getLogTotal = function(type,start_time,end_time){
	//Configurations	1
	//Event			2
	//Record		4
	//Operation		8
	//User			16
	return this.ajax.getData("../cgi-bin/Log.cgi?cmd=count&type=" + type + "&start_time=" + start_time + "&end_time=" + end_time);
};
cgi.prototype.getLogItem = function(idx,no,type,start_time,end_time){
	//Configurations	1
	//Event			2
	//Record		4
	//Operation		8
	//User			16
	return this.ajax.getData("../cgi-bin/Log.cgi?cmd=log_search&index=" + idx + "&total=" + no + "&type=" + type + "&start_time=" + start_time + "&end_time=" + end_time);
};
cgi.prototype.clearLog = function(){
	return this.ajax.getData("../cgi-bin/Log.cgi?cmd=clear_log");
};
cgi.prototype.logDelete = function(cam,st,et,bid){
	return this.ajax.getData("../cgi-bin/Delete.cgi?camera=" + cam + "&start_time=" + st + "&end_time=" + et + "&block_id=" + bid);
};
cgi.prototype.logUnlock = function(cam,st,et,bid){
	return this.ajax.getData("../cgi-bin/Unlock.cgi?camera=" + cam + "&start_time=" + st + "&end_time=" + et + "&block_id=" + bid);
};
cgi.prototype.logLock = function(cam,st,et,bid){
	return this.ajax.getData("../cgi-bin/Lock.cgi?camera=" + cam + "&start_time=" + st + "&end_time=" + et + "&block_id=" + bid);
};
//==============================================================
//firmware
cgi.prototype.getFwUploadStatus = function(){
	return this.ajax.getData("../cgi-bin/FW_Upgrade.cgi?cmd=upload_fw_status");
};
cgi.prototype.getFwUpgradeStatus = function(){
	return this.ajax.getData("../cgi-bin/FW_Upgrade.cgi?cmd=fw_upgrade_status");
};
//==============================================================
//config
cgi.prototype.loadDefault = function(){
	return this.ajax.getData("../cgi-bin/Config.cgi?cmd=load_default");
};
cgi.prototype.getLoadDefaultStatus = function(){
	return this.ajax.getData("../cgi-bin/Config.cgi?cmd=load_default_status");
};
cgi.prototype.getLoadConfig = function(){
	return this.ajax.getData("../cgi-bin/Config.cgi?cmd=load_config");
};
cgi.prototype.getLoadConfigStatus = function(){
	return this.ajax.getData("../cgi-bin/Config.cgi?cmd=load_config_status");
};

cgi.prototype.getReboot = function(){
	return this.ajax.getData("../cgi-bin/Reboot.cgi");
};
//==============================================================
//search
cgi.prototype.getSearchId = function(start_time,end_time,cam,conditions,total,grid,txt){
	var tmpUrl = "../cgi-bin/Search.cgi?start_time=" + start_time + "&end_time=" + end_time + "&camera=" + cam + "&conditions=" + conditions + "&total=" + total;
	if(grid != null){
		tmpUrl += "&grid=" + grid;
	}
	if(txt != null)
		tmpUrl += "&text=" + txt;
//	showMsg("start_time :" + start_time + ",end_time :" + end_time + ",cam :" + cam + ",conditions :" + conditions + ",total :" + total + ",grid :" + grid + ",txt :" + txt);
	showMsg("getSearchId :" + tmpUrl);
	return this.ajax.getData(tmpUrl);
};
cgi.prototype.getSearchData = function(){
	return this.ajax.getData("../cgi-bin/Search.cgi?search_id=" + this.search_id);
};
cgi.prototype.cancelSearch = function(){
	return this.ajax.getData("../cgi-bin/Search.cgi?search_id=" + this.search_id + "&action=cancel");
};
//==============================================================
cgi.prototype.estimate = function(hrs){
	return this.ajax.getData("../cgi-bin/cal.cgi?hours=" + hrs);
};
cgi.prototype.alarmIoControl = function(map){
	return this.ajax.getData("../cgi-bin/alarm_io_ctrl.cgi?alarm_io_map=" + map);
};
//=============================================================
// Video Analytics

cgi.prototype.PeopleCountInfo = function(cam)
{
	return this.ajax.getData("../cgi-bin/Get_va_meta.cgi?camera=" + cam);
};
//==============================================================
//IP Camera 
cgi.prototype.GetIPCamOption = function(port,ip,username,password,channel)//20130606 julia add channel
{
	return this.ajax.getXmlData("../cgi-bin/IPCamVideoOptions.cgi?HttpPort="+port+"&ip="+ip+"&username="+username+"&password="+ password+"&ch="+channel);
};

cgi.prototype.AutoDetection = function(port,ip,username,password,channel)//20130606 julia add channel
{
	return this.ajax.getXmlData("../cgi-bin/IPCamAutoDetection.cgi?HttpPort="+port+"&ip="+ip+"&username="+username+"&password="+ password+"&ch="+channel);
};
cgi.prototype.ShutDown = function(){
	return this.ajax.getData("../cgi-bin/Reboot.cgi?action=poweroff");
};
//Dongle Upgrade
cgi.prototype.getDongleUploadStatus = function(){
	return this.ajax.getData("../cgi-bin/Dongle_Upgrade.cgi?cmd=dongle_upgrade_status");
};