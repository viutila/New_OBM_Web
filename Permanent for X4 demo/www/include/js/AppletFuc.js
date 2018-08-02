//**************************************************** Applet function
function openLiveStreamApplet() {
    var layoutIdx;
    if (g_total_ch_num == 16) {
        layoutIdx = 16;
    } else if (g_total_ch_num == 8) {
        layoutIdx = 9;
    } else if (g_total_ch_num == 4) {
        layoutIdx = 4;
    } else if (g_total_ch_num == 24) {
        layoutIdx = 16;
    }
    applet.appletRelease();
    applet.setUsernamePassword(g_user_name, g_user_password);
    applet.setModelName(g_model_name_int); //******* different motion behaviors for different model
    applet.setLiveInfo(appletWidth, appletHeight, layoutIdx, g_ip, g_port); //setLiveInfo(int liveWidth , int liveHeight , int liveLayout , ip , port)
    applet.downloadMD5();
    applet.downloadDynamicLibrary();
    applet.downloadEkb200Libraty();
    applet.setLiveUserRightCtrl(RemoteCtrlLiveChnmap);
    applet.setTimeZone(g_time_zone);
    applet.setTimeInfo(g_date_fmt, g_time_fmt);
    applet.initApplet();
    initInstallCameraArray();
    applet.openLiveStream(g_ip, g_port);
}
function openLiveStreamAppletLivePage() {
    var layoutIdx;
    if (g_total_ch_num == 16) {
        layoutIdx = 16;
    } else if (g_total_ch_num == 8) {
        layoutIdx = 9;
    } else if (g_total_ch_num == 4) {
        layoutIdx = 4;
    } else if (g_total_ch_num == 24) {
        layoutIdx = 16;
    }
    applet.appletRelease();
    //applet.setUsernamePassword(g_user_name, g_user_password);
    applet.setLiveInfo(appletWidth, appletHeight, layoutIdx, g_ip, g_port); //setLiveInfo(int liveWidth , int liveHeight , int liveLayout , ip , port)
    //applet.downloadMD5();
    //applet.downloadDynamicLibrary();
    //applet.setLiveUserRightCtrl(RemoteCtrlLiveChnmap);
    //applet.setTimeZone(g_time_zone);
    //applet.setTimeInfo(g_date_fmt, g_time_fmt);
    applet.initApplet();
    initInstallCameraArray();
    applet.openLiveStream(g_ip, g_port);
}
function openPlaybackStreamApplet() {   //******* for alarmwatch
    var layoutIdx;
    if (g_total_ch_num == 16) {
        layoutIdx = 16;
    } else if (g_total_ch_num == 8) {
        layoutIdx = 9;
    } else if (g_total_ch_num == 4) {
        layoutIdx = 4;
    } else if (g_total_ch_num == 24) {
        layoutIdx = 16;
    }
    applet.appletRelease();
    applet.setUsernamePassword(g_user_name, g_user_password);
    applet.setLiveInfo(appletWidth, appletHeight - 50, layoutIdx, g_ip, g_port); //setLiveInfo(int liveWidth , int liveHeight , int liveLayout , ip , port)
    applet.downloadMD5();
    applet.downloadDynamicLibrary();
    //applet.downloadEkb200Libraty();
    applet.setLiveUserRightCtrl(RemoteCtrlLiveChnmap);
    applet.setTimeZone(g_time_zone);
    applet.setTimeInfo(g_date_fmt, g_time_fmt);
    applet.initApplet();
    applet.openLiveStream(g_ip, g_port);
    applet.appletPause();
    //applet.openLiveStream(g_ip, g_port);
}
function PBCancel01() {
    applet.pbCancel();
    applet.setLiveInfo(appletWidth, appletHeight, 0, g_ip, g_port); //setLiveInfo(int liveWidth , int liveHeight , int liveLayout , ip , port)
    applet.initApplet();
    applet.openLiveStream(g_ip, g_port);
}
function changeViewMode(layoutMode) {
	livePage1 = 0;
	liveMode1 = 0;
    if (layoutMode == 1) {

    }
    else if (layoutMode == 4) {
        var cValue;
        if (g_total_ch_num == 16 || g_total_ch_num == 24) {
            cValue = 3;
        } else if (g_total_ch_num == 8) {
            cValue = 1;
        } else if (g_total_ch_num == 4) {
            cValue = 0;
        }
        if (livePage < cValue) {
            livePage++;
        } else {
            livePage = 0;
        }
        if (layoutMode != liveMode) {
            liveMode = layoutMode;
            livePage = 0;
        }
        applet.changeViewMode(livePage, layoutMode, 0);

    } else if (layoutMode == 6) {
        if (livePage < 2) {
            livePage++;
        } else {
            livePage = 0;
        }
        if (layoutMode != liveMode) {
            liveMode = layoutMode;
            livePage = 0;
        }
        applet.changeViewMode(livePage, layoutMode, 0);

    } else if (layoutMode == 8) {
        var cValue;
        if (g_total_ch_num == 16 || g_total_ch_num == 24) {
            cValue = 1;
        } else if (g_total_ch_num == 8) {
            cValue = 0;
        }
        if (livePage < cValue) {
            livePage++;
        } else {
            livePage = 0;
        }
        if (layoutMode != liveMode) {
            liveMode = layoutMode;
            livePage = 0;
        }
        applet.changeViewMode(livePage, layoutMode, 0);

    } else if (layoutMode == 9) {
        var cValue;
        if (g_total_ch_num == 16 || g_total_ch_num == 24) {
            cValue = 1;
        } else if (g_total_ch_num == 8) {
            cValue = 0;
        }
        if (livePage < cValue) {
            livePage++;
        } else {
            livePage = 0;
        }
        if (layoutMode != liveMode) {
            liveMode = layoutMode;
            livePage = 0;
        }
        applet.changeViewMode(livePage, layoutMode, 0);

    } else if (layoutMode == 10) {
        if (livePage < 1) {
            livePage++;
        } else {
            livePage = 0;
        }
        if (layoutMode != liveMode) {
            liveMode = layoutMode;
            livePage = 0;
        }
        applet.changeViewMode(livePage, layoutMode, 0);

    } else if (layoutMode == 16) {
        if (layoutMode != liveMode) {
            liveMode = layoutMode;
            livePage = 0;
        }
        applet.changeViewMode(livePage, layoutMode, 0);
    } else if (layoutMode == 20) {
        if (layoutMode != liveMode) {
            liveMode = layoutMode;
            livePage = 0;
        }
        applet.changeViewMode(livePage, layoutMode, 0);
    }
}
var livePage1 = 0;
var liveMode1 = 0;
function changeViewModeIP(layoutMode){
	liveMode = 0;
	livePage = 0;
	if (layoutMode == 1) {

    }
    else if (layoutMode == 4) {
        var cValue = 1;
        /*
        if (g_total_ch_num == 16) {
            cValue = 3;
        } else if (g_total_ch_num == 8) {
            cValue = 1;
        } else if (g_total_ch_num == 4) {
            cValue = 0;
        }*/
        if (livePage1 < cValue) {
            livePage1++;
        } else {
            livePage1 = 0;
        }
        if (layoutMode != liveMode1) {
            liveMode1 = layoutMode;
            livePage1 = 0;
        }
        applet.changeViewMode(livePage1, layoutMode, 1);

    } else if (layoutMode == 6) {
        if (livePage1 < 2) {
            livePage1++;
        } else {
            livePage1 = 0;
        }
        if (layoutMode != liveMode1) {
            liveMode1 = layoutMode;
            livePage1 = 0;
        }
        applet.changeViewMode(livePage1, layoutMode, 1);

    } else if (layoutMode == 8) {
        var cValue = 0;
        /*if (g_total_ch_num == 16) {
            cValue = 1;
        } else if (g_total_ch_num == 8) {
            cValue = 0;
        }*/
        if (livePage1 < cValue) {
            livePage1++;
        } else {
            livePage1 = 0;
        }
        if (layoutMode != liveMode1) {
            liveMode1 = layoutMode;
            livePage1 = 0;
        }
        applet.changeViewMode(livePage1, layoutMode, 1);

    } else if (layoutMode == 9) {
        var cValue = 0;
        /*if (g_total_ch_num == 16) {
            cValue = 1;
        } else if (g_total_ch_num == 8) {
            cValue = 0;
        }*/
        if (livePage1 < cValue) {
            livePage1++;
        } else {
            livePage1 = 0;
        }
        if (layoutMode != liveMode1) {
            liveMode1 = layoutMode;
            livePage1 = 0;
        }
        applet.changeViewMode(livePage1, layoutMode, 1);

    } else if (layoutMode == 10) {
        if (livePage1 < 1) {
            livePage1++;
        } else {
            livePage1 = 0;
        }
        if (layoutMode != liveMode1) {
            liveMode1 = layoutMode;
            livePage1 = 0;
        }
        applet.changeViewMode(livePage1, layoutMode, 1);

    } else if (layoutMode == 16) {
        if (layoutMode != liveMode1) {
            liveMode1 = layoutMode;
            livePage1 = 0;
        }
        applet.changeViewMode(livePage1, layoutMode, 1);
    } else if (layoutMode == 20) {
        if (layoutMode != liveMode1) {
            liveMode1 = layoutMode;
            livePage1 = 0;
        }
        applet.changeViewMode(livePage1, layoutMode, 1);
    }
}
function setSingleChannelScreen(channelNumber) {
    applet.setSingleChannelScreen(channelNumber);
}
function saveFile() {
    applet.saveFile();
}
function SetAppletVisible(flag) {
    if (flag) {
        //openLiveStreamApplet();
        applet.style.width = appletWidth + "px";
        applet.style.height = appletHeight + "px";
        applet.style.top = 0 + "px";
        applet.style.left = 0 + "px";
        EFDEF_id("appletDiv").style.width = "1247px";
        EFDEF_id("appletDiv").style.height = "779px";
        EFDEF_id("appletDiv").style.overflow = "hidden";
        applet.resize(appletWidth, appletHeight);
        applet.setUILayout(appletWidth, appletHeight, 16);
        changeViewMode(16);
    } else {
        //applet.audioOnOff(false);
        applet.appletPause();
        applet.style.width = 0 + "px";
        applet.style.height = 0 + "px";
        EFDEF_id("appletDiv").style.width = "0px";
        EFDEF_id("appletDiv").style.height = "0px";
        g_audio_switch = 0;
    }
}

function SetPlaybackVisible(flag) {
    if (flag) {
        applet.style.width = appletWidth + "px";
        applet.style.height = appletHeight - 50 + "px";
        applet.style.top = 0 + "px";
        applet.style.left = 0 + "px";
        EFDEF_id("appletDiv").style.width = "1247px";
        EFDEF_id("appletDiv").style.height = "779px";
        //applet.resize(appletWidth, appletHeight - 50);
        //applet.setUILayout(appletWidth, appletHeight - 50, 16);
        //changeViewMode(16);
    } else {
        //applet.audioOnOff(false);
        //applet.appletPause();
        applet.style.width = 0 + "px";
        applet.style.height = 0 + "px";
        EFDEF_id("appletDiv").style.width = "0px";
        EFDEF_id("appletDiv").style.height = "0px";
        g_audio_switch = 0;
        //firstTimeFlag = 0;
    }
}
function SetAppletVideoAdjust(SelIdx) {
    EFDEF_id("appletDiv").style.width = "1247px";
    EFDEF_id("appletDiv").style.height = "532px";
    EFDEF_id("appletDiv").style.overflow = "hidden";
    applet.style.width = 480 + "px";
    applet.style.height = 360 + "px";
    applet.style.top = 170 + "px";
    applet.style.left = 150 + "px";
    //applet.resize(480,360);
    //applet.setUILayout(480, 360, 4);
    //changeViewMode(1);
    //changeViewMode(16);
    //applet.setSingleChannelScreen(SelIdx);
}
function changeMainSub() {
    applet.changeMainSub(g_dual_switch);
}
function audioOnOff() {
    //var btn_audio = document.getElementById("btn_audio");

    if (g_audio_switch == 1) {
        applet.audioOnOff(false);
        audioFlag = false;
        g_audio_switch = 0;
        //btn_audio.value = "state:audio off";

    } else {
        applet.audioOnOff(true);
        audioFlag = true;
        g_audio_switch = 1;
        //btn_audio.value = "state:audio on";
    }
}
function audioForceOff() {
    applet.audioOnOff(false);
    g_audio_switch = 0;
}
function efEncode(str) {
    return applet.efEncode(str);
}
function efDecode(str) {
    return applet.efDecode(str);
}

function showEventLog(channelNumber, eventLog) {    //******* Get Playback Channels' Status
    //alert("channelNumber = " + channelNumber);
    //alert("eventLog = " + eventLog);
    eventLog = eventLog & 0x0f;
    subMenuFrm.chgCamStatus(channelNumber, eventLog);
}

function GetTimeZone() {
    hx.setUrl("./cgi-bin/DateTime.xml");
    g_time_zone = hx.getNodeValue("DateTime", "timeZone");
    if (g_time_zone.indexOf("+") > -1) {
        var str1 = g_time_zone.substr(4);
        var str2 = str1.split(":");
        var hr = parseInt(str2[0], 10);
        var min = parseInt(str2[1], 10);
        g_time_zone_sec = hr * 60 * 60 + min * 60;
    }
    else {
        var str1 = g_time_zone.substr(4);
        var str2 = str1.split(":");
        var hr = parseInt(str2[0]);
        var min = parseInt(str2[1]);
        g_time_zone_sec = (hr * 60 * 60 + min * 60) * (-1);
    }

    g_time_fmt = hx.getNodeValue("timeFormat");
    if (g_time_fmt == "12H") {
        g_time_fmt = 0;
    }
    else if (g_time_fmt == "24H") {
        g_time_fmt = 1;
    }

    g_date_fmt = hx.getNodeValue("dateFormat");
    if (g_date_fmt == "Y/M/D") {
        g_date_fmt = 0;
    } else if (g_date_fmt == "D/M/Y") {
        g_date_fmt = 1;
    } else if (g_date_fmt == "M/D/Y") {
        g_date_fmt = 2;
    }
}
function checkDST_NV() {   //******* calculate DST
    var hx1 = new HandleXml();
    var hx2 = new HandleXml();
    hx1.setUrl("./cgi-bin/DateTime.xml");
    var currentTime = parseInt(hx1.getNodeValue("currentTime"));
    hx2.setUrl("./cgi-bin/DaylightSaving.xml");
    var enable = hx2.getNodeValue("dlsEnable");
    if (enable == 1) {
        var startMonth = parseInt(hx2.getNodeValue("startMon"));
        var startWeek = parseInt(hx2.getNodeValue("startWeek"));
        var startWeekday = parseInt(hx2.getNodeValue("startWeekDay"));
        var startHour = parseInt(hx2.getNodeValue("startFromHour"));
        var startMin = parseInt(hx2.getNodeValue("startFromMin"));
        if (startMin == 1)
        { startMin = 30; }
        var setHour = parseInt(hx2.getNodeValue("setHour"));
        var setMin = parseInt(hx2.getNodeValue("setMin"));
        if (setMin == 1)
        { setMin = 30; }
        var endMonth = parseInt(hx2.getNodeValue("endMon"));
        var endWeek = parseInt(hx2.getNodeValue("endWeek"));
        var endWeekday = parseInt(hx2.getNodeValue("endWeekDay"));
        var endHour = parseInt(hx2.getNodeValue("endFromHour"));
        var endMin = parseInt(hx2.getNodeValue("endFromMin"));
        if (endMin == 1)
        { endMin = 30; }


        currentTime = currentTime * 1000;
        var currentZoneTime = currentTime + g_time_zone_sec * 1000;
        var d1 = new Date(currentTime);
        var currentYear = d1.getFullYear();

        //**************** StartTime and AdjustTime
        var t1 = new Date(currentYear, startMonth, 1, 0, 0, 0, 0);
        var daysofStartMonth = daysInMonth(currentYear, startMonth);


        var weekDayPlus, weekDayPlus1;

        if (startWeekday >= t1.getDay()) {
            startWeek = startWeek;
            weekDayPlus = startWeekday - t1.getDay();
        }
        else {
            startWeek = startWeek + 1;
            weekDayPlus = startWeekday - t1.getDay();
        }

        var startDate = (weekDayPlus + 1) + 7 * startWeek;

        if (startDate > daysofStartMonth) {
            startDate = startDate - 7;
        }

        var startTime = new Date(currentYear, startMonth, startDate, startHour, startMin, 0, 0);
        startTime = startTime.getTime() + g_time_zone_sec * 1000;

        var adjustTime = ((setHour - startHour) * 60 + setMin - startMin) * 60 * 1000;
        //****************
        //**************** EndTime
        var t2 = new Date(currentYear, endMonth, 1, 0, 0, 0, 0);
        var daysofEndMonth = daysInMonth(currentYear, endMonth);

        //****************

        if (endWeekday >= t2.getDay()) {
            endWeek = endWeek;
            weekDayPlus1 = endWeekday - t2.getDay();
        }
        else {
            endWeek = endWeek + 1;
            weekDayPlus1 = endWeekday - t2.getDay();
        }

        var endDate = (weekDayPlus1 + 1) + 7 * endWeek;

        if (endDate > daysofEndMonth) {
            endDate = endDate - 7;
        }

        var endTime = new Date(currentYear, endMonth, endDate, endHour, endMin, 0, 0);
        endTime = endTime.getTime() + g_time_zone_sec * 1000 - adjustTime; //**** 20130709 John add - adjustTime to change endtime.
        //****************

        if (currentZoneTime >= startTime && currentZoneTime < endTime) {
            g_dst_time_sec = adjustTime / 1000;
        }
        else {
            g_dst_time_sec = 0;
        }
    }
    else {
        g_dst_time_sec = 0;
        return;
    }
}
function checkDSTpar(parTime) {   //******* calculate DST range
    //var hx1 = new HandleXml();
    var hx2 = new HandleXml();
    //hx1.setUrl("./cgi-bin/DateTime.xml");
    //var currentTime = parseInt(hx1.getNodeValue("DateTime ", "currentTime"));
    var currentTime = parTime;
    hx2.setUrl("./cgi-bin/DaylightSaving.xml");
    var enable = hx2.getNodeValue("dlsEnable");
    if (enable == 1) {
        var startMonth = parseInt(hx2.getNodeValue("startMon"));
        var startWeek = parseInt(hx2.getNodeValue("startWeek"));
        var startWeekday = parseInt(hx2.getNodeValue("startWeekDay"));
        var startHour = parseInt(hx2.getNodeValue("startFromHour"));
        var startMin = parseInt(hx2.getNodeValue("startFromMin"));
        if (startMin == 1)
        { startMin = 30; }
        var setHour = parseInt(hx2.getNodeValue("setHour"));
        var setMin = parseInt(hx2.getNodeValue("setMin"));
        if (setMin == 1)
        { setMin = 30; }
        var endMonth = parseInt(hx2.getNodeValue("endMon"));
        var endWeek = parseInt(hx2.getNodeValue("endWeek"));
        var endWeekday = parseInt(hx2.getNodeValue("endWeekDay"));
        var endHour = parseInt(hx2.getNodeValue("endFromHour"));
        var endMin = parseInt(hx2.getNodeValue("endFromMin"));
        if (endMin == 1)
        { endMin = 30; }


        currentTime = currentTime * 1000;
        var currentZoneTime = currentTime + g_time_zone_sec * 1000;
        var d1 = new Date(currentZoneTime);
        var currentYear = d1.getFullYear();

        //**************** StartTime and AdjustTime
        //**************** StartTime and AdjustTime
        var t1 = new Date(currentYear, startMonth, 1, 0, 0, 0, 0);
        var daysofStartMonth = daysInMonth(currentYear, startMonth);


        var weekDayPlus, weekDayPlus1;

        if (startWeekday >= t1.getDay()) {
            startWeek = startWeek;
            weekDayPlus = startWeekday - t1.getDay();
        }
        else {
            startWeek = startWeek + 1;
            weekDayPlus = startWeekday - t1.getDay();
        }

        var startDate = (weekDayPlus + 1) + 7 * startWeek;

        if (startDate > daysofStartMonth) {
            startDate = startDate - 7;
        }

        var startTime = new Date(currentYear, startMonth, startDate, startHour, startMin, 0, 0);
        //startTime = startTime.getTime() + g_time_zone_sec * 1000;
        startTime = startTime.getTime();

        var adjustTime = ((setHour - startHour) * 60 + setMin - startMin) * 60 * 1000;
        //**************** EndTime
        //**************** EndTime
        var t2 = new Date(currentYear, endMonth, 1, 0, 0, 0, 0);
        var daysofEndMonth = daysInMonth(currentYear, endMonth);

        //****************

        if (endWeekday >= t2.getDay()) {
            endWeek = endWeek;
            weekDayPlus1 = endWeekday - t2.getDay();
        }
        else {
            endWeek = endWeek + 1;
            weekDayPlus1 = endWeekday - t2.getDay();
        }

        var endDate = (weekDayPlus1 + 1) + 7 * endWeek;

        if (endDate > daysofEndMonth) {
            endDate = endDate - 7;
        }
        var endTime = new Date(currentYear, endMonth, endDate, endHour, endMin, 0, 0);
        //endTime = endTime.getTime() + g_time_zone_sec * 1000 + adjustTime;
        endTime = endTime.getTime();
        //****************
        parTime = parTime * 1000;
        if (parTime >= startTime && parTime < endTime) {
            //g_dst_time_sec = adjustTime / 1000;
            if (parTime < startTime + adjustTime) {
                parTime = startTime - 60 * 1000;
                return (parTime / 1000);
            }
            else {
                if (g_dst_time_sec != 0) {
                    return (parTime / 1000);
                } else {
                    return ((parTime - adjustTime) / 1000);
                }
                
            }
        }
        else {
            //g_dst_time_sec = 0;
            return ((parTime) / 1000);
        }
    }
    else {
        return parTime;
    }
}
function checkDSTparShow(parTime) {   //******* calculate DST range
    //var hx1 = new HandleXml();
    var hx2 = new HandleXml();
    //hx1.setUrl("./cgi-bin/DateTime.xml");
    //var currentTime = parseInt(hx1.getNodeValue("DateTime ", "currentTime"));
    var currentTime = parTime;
    hx2.setUrl("./cgi-bin/DaylightSaving.xml");
    var enable = hx2.getNodeValue("dlsEnable");
    if (enable == 1) {
        var startMonth = parseInt(hx2.getNodeValue("startMon"));
        var startWeek = parseInt(hx2.getNodeValue("startWeek"));
        var startWeekday = parseInt(hx2.getNodeValue("startWeekDay"));
        var startHour = parseInt(hx2.getNodeValue("startFromHour"));
        var startMin = parseInt(hx2.getNodeValue("startFromMin"));
        if (startMin == 1)
        { startMin = 30; }
        var setHour = parseInt(hx2.getNodeValue("setHour"));
        var setMin = parseInt(hx2.getNodeValue("setMin"));
        if (setMin == 1)
        { setMin = 30; }
        var endMonth = parseInt(hx2.getNodeValue("endMon"));
        var endWeek = parseInt(hx2.getNodeValue("endWeek"));
        var endWeekday = parseInt(hx2.getNodeValue("endWeekDay"));
        var endHour = parseInt(hx2.getNodeValue("endFromHour"));
        var endMin = parseInt(hx2.getNodeValue("endFromMin"));
        if (endMin == 1)
        { endMin = 30; }


        currentTime = currentTime * 1000;
        var currentZoneTime = currentTime + g_time_zone_sec * 1000;
        var d1 = new Date(currentZoneTime);
        var currentYear = d1.getFullYear();

        //**************** StartTime and AdjustTime
        //**************** StartTime and AdjustTime
        var t1 = new Date(currentYear, startMonth, 1, 0, 0, 0, 0);
        var daysofStartMonth = daysInMonth(currentYear, startMonth);


        var weekDayPlus, weekDayPlus1;

        if (startWeekday >= t1.getDay()) {
            startWeek = startWeek;
            weekDayPlus = startWeekday - t1.getDay();
        }
        else {
            startWeek = startWeek + 1;
            weekDayPlus = startWeekday - t1.getDay();
        }

        var startDate = (weekDayPlus + 1) + 7 * startWeek;

        if (startDate > daysofStartMonth) {
            startDate = startDate - 7;
        }

        var startTime = new Date(currentYear, startMonth, startDate, startHour, startMin, 0, 0);
        //startTime = startTime.getTime() + g_time_zone_sec * 1000;
        startTime = startTime.getTime();

        var adjustTime = ((setHour - startHour) * 60 + setMin - startMin) * 60 * 1000;
        //**************** EndTime
        //**************** EndTime
        var t2 = new Date(currentYear, endMonth, 1, 0, 0, 0, 0);
        var daysofEndMonth = daysInMonth(currentYear, endMonth);

        //****************

        if (endWeekday >= t2.getDay()) {
            endWeek = endWeek;
            weekDayPlus1 = endWeekday - t2.getDay();
        }
        else {
            endWeek = endWeek + 1;
            weekDayPlus1 = endWeekday - t2.getDay();
        }

        var endDate = (weekDayPlus1 + 1) + 7 * endWeek;

        if (endDate > daysofEndMonth) {
            endDate = endDate - 7;
        }
        var endTime = new Date(currentYear, endMonth, endDate, endHour, endMin, 0, 0);
        //endTime = endTime.getTime() + g_time_zone_sec * 1000 + adjustTime;
        endTime = endTime.getTime();
        //****************
        parTime = parTime * 1000;
        if ((parTime + adjustTime) >= startTime && (parTime + adjustTime) < endTime) {
            //g_dst_time_sec = adjustTime / 1000;
            /*if (parTime < startTime + adjustTime) {
                parTime = startTime - 60 * 1000;
                return (parTime / 1000);
            }
            else {
                if (g_dst_time_sec != 0) {
                    return (parTime / 1000);
                } else {
                    return ((parTime - adjustTime) / 1000);
                }

            }*/
            if (g_dst_time_sec != 0) {
                return (parTime / 1000);
            } else {
                return ((parTime + adjustTime) / 1000);
            }
            
        }
        else {
            //g_dst_time_sec = 0;
            return ((parTime) / 1000);
        }
    }
    else {
        return parTime;
    }
}
function adjustDSTTime() {   //******* calculate DST range
    //var hx1 = new HandleXml();
    var hx2 = new HandleXml();
    //hx1.setUrl("./cgi-bin/DateTime.xml");
    //var currentTime = parseInt(hx1.getNodeValue("DateTime ", "currentTime"));
    hx2.setUrl("./cgi-bin/DaylightSaving.xml");
    var enable = hx2.getNodeValue("dlsEnable");
    if (enable == 1) {
        var startMonth = parseInt(hx2.getNodeValue("startMon"));
        var startWeek = parseInt(hx2.getNodeValue("startWeek"));
        var startWeekday = parseInt(hx2.getNodeValue("startWeekDay"));
        var startHour = parseInt(hx2.getNodeValue("startFromHour"));
        var startMin = parseInt(hx2.getNodeValue("startFromMin"));
        if (startMin == 1)
        { startMin = 30; }
        var setHour = parseInt(hx2.getNodeValue("setHour"));
        var setMin = parseInt(hx2.getNodeValue("setMin"));
        if (setMin == 1)
        { setMin = 30; }
        var endMonth = parseInt(hx2.getNodeValue("endMon"));
        var endWeek = parseInt(hx2.getNodeValue("endWeek"));
        var endWeekday = parseInt(hx2.getNodeValue("endWeekDay"));
        var endHour = parseInt(hx2.getNodeValue("endFromHour"));
        var endMin = parseInt(hx2.getNodeValue("endFromMin"));
        if (endMin == 1)
        { endMin = 30; }

        var adjustTime = ((setHour - startHour) * 60 + setMin - startMin) * 60;
        return adjustTime;
    }
    else {
        return 0;
    }
}
function checkDSTparTrue(parTime) {   //******* calculate DST range
    //var hx1 = new HandleXml();
    var hx2 = new HandleXml();
    //hx1.setUrl("./cgi-bin/DateTime.xml");
    //var currentTime = parseInt(hx1.getNodeValue("DateTime ", "currentTime"));
    var currentTime = parTime;
    hx2.setUrl("./cgi-bin/DaylightSaving.xml");
    var enable = hx2.getNodeValue("dlsEnable");
    if (enable == 1) {
        var startMonth = parseInt(hx2.getNodeValue("startMon"));
        var startWeek = parseInt(hx2.getNodeValue("startWeek"));
        var startWeekday = parseInt(hx2.getNodeValue("startWeekDay"));
        var startHour = parseInt(hx2.getNodeValue("startFromHour"));
        var startMin = parseInt(hx2.getNodeValue("startFromMin"));
        if (startMin == 1)
        { startMin = 30; }
        var setHour = parseInt(hx2.getNodeValue("setHour"));
        var setMin = parseInt(hx2.getNodeValue("setMin"));
        if (setMin == 1)
        { setMin = 30; }
        var endMonth = parseInt(hx2.getNodeValue("endMon"));
        var endWeek = parseInt(hx2.getNodeValue("endWeek"));
        var endWeekday = parseInt(hx2.getNodeValue("endWeekDay"));
        var endHour = parseInt(hx2.getNodeValue("endFromHour"));
        var endMin = parseInt(hx2.getNodeValue("endFromMin"));
        if (endMin == 1)
        { endMin = 30; }


        currentTime = currentTime * 1000;
        var currentZoneTime = currentTime + g_time_zone_sec * 1000;
        var d1 = new Date(currentZoneTime);
        var currentYear = d1.getFullYear();

        //**************** StartTime and AdjustTime
        //**************** StartTime and AdjustTime
        var t1 = new Date(currentYear, startMonth, 1, 0, 0, 0, 0);
        var daysofStartMonth = daysInMonth(currentYear, startMonth);


        var weekDayPlus, weekDayPlus1;

        if (startWeekday >= t1.getDay()) {
            startWeek = startWeek;
            weekDayPlus = startWeekday - t1.getDay();
        }
        else {
            startWeek = startWeek + 1;
            weekDayPlus = startWeekday - t1.getDay();
        }

        var startDate = (weekDayPlus + 1) + 7 * startWeek;

        if (startDate > daysofStartMonth) {
            startDate = startDate - 7;
        }

        var startTime = new Date(currentYear, startMonth, startDate, startHour, startMin, 0, 0);
        //startTime = startTime.getTime() + g_time_zone_sec * 1000;
        startTime = startTime.getTime();

        var adjustTime = ((setHour - startHour) * 60 + setMin - startMin) * 60 * 1000;
        //**************** EndTime
        //**************** EndTime
        var t2 = new Date(currentYear, endMonth, 1, 0, 0, 0, 0);
        var daysofEndMonth = daysInMonth(currentYear, endMonth);

        //****************

        if (endWeekday >= t2.getDay()) {
            endWeek = endWeek;
            weekDayPlus1 = endWeekday - t2.getDay();
        }
        else {
            endWeek = endWeek + 1;
            weekDayPlus1 = endWeekday - t2.getDay();
        }

        var endDate = (weekDayPlus1 + 1) + 7 * endWeek;

        if (endDate > daysofEndMonth) {
            endDate = endDate - 7;
        }
        var endTime = new Date(currentYear, endMonth, endDate, endHour, endMin, 0, 0);
        //endTime = endTime.getTime() + g_time_zone_sec * 1000 + adjustTime;
        endTime = endTime.getTime();
        //****************
        parTime = parTime * 1000;
        if (parTime >= startTime && parTime < endTime) {
            return true;
        }
        else {
            //g_dst_time_sec = 0;
            return false;
        }
    }
    else {
        return false;
    }
}
function daysInMonth(iYear, iMonth) {
    return 32 - new Date(iYear, iMonth, 32).getDate();
}

function UpdateArchiveProgress(progress) {  //***** Receive Archive Progress
    archive_progress = progress;
}
function ChangSignelAppletSize(width, height, top, left, SelIdx) {
    applet.style.width = width + "px";
    applet.style.height = height + "px";
    applet.style.top = top + "px";
    applet.style.left = left + "px";
    applet.resize(width, height);
    applet.setUILayout(width, height, 4);
    //changeViewMode(1);
    //changeViewMode(16);
    applet.setSingleChannelScreen(SelIdx);

}
function setNVRMaskValue() {
    var hx_Get_Status = new HandleXml();
    hx_Get_Status.setUrl("./xml/Status.xml");
    var mask_Map = 65535 - parseInt(hx_Get_Status.getNodeValue("maskChannel"));
    parent.applet.setNvrInstallValue(mask_Map);
}
function initInstallCameraArray() {
    if (g_model_name_int == 0) {

    } else {
        setNVRMaskValue();
    }
    installCameraArray = new Array(16);
    var hx_Get_Status = new HandleXml();
    hx_Get_Status.setUrl("./xml/Status.xml");
    var install_Status = hx_Get_Status.getNodeValue("install").toInt().toString(2);
    if (install_Status.length < 16) {
        install_Status = install_Status.toFill(16);
    }
    for (var i = 0; i < 16; i++) {
        if (install_Status.substr(16 - 1 - i, 1) == "0") {
            installCameraArray[i] = false;
        } else if (install_Status.substr(16 - 1 - i, 1) == "1") {
            installCameraArray[i] = true;
        }
    }
    applet.setInstallValue(installCameraArray, 16);
}
function ChangAppletPosition(width, height, top, left) {
    applet.style.width = width + "px";
    applet.style.height = height + "px";
    //applet.style.top = top + "px";
    //applet.style.left = left + "px";
    EFDEF_id("appletDiv").style.width = width + "px";
    EFDEF_id("appletDiv").style.height = height + "px";
    EFDEF_id("appletDiv").style.top = top + "px";
    EFDEF_id("appletDiv").style.left = left + "px";
    EFDEF_id("appletDiv").style.overflow = "hidden";
}
function setViewRotateAngle(angleAry) {
    applet.setRotateAngle(angleAry, angleAry.length);
}