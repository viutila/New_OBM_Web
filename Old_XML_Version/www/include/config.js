//release chk: 1.g_web_ver
var g_host = top.location.host;
//var g_ip = g_host.split(":")[0];
var g_ip = g_host.split(":")[0];
var g_port = g_host.split(":")[1]?g_host.split(":")[1]:80;
var g_DVR_web_ver = "0.11.22"; //Paragon960x4-16, ECOR960-8F2, ECOR960-4F2, EPHD08+, TUTIS+-8F3, TUTIS+-4F3 //release 20131114
var g_NVR_web_ver = "0.9.11.20"; //NVR Web base on DVR  //release 20131025
var g_ENVR_web_ver = "0.6.12.04"; //ENVR Web base on DVR  //release 20131204
var g_machine_type = 0;
var g_isNoBrand = 0;
var g_title = "";
var g_imgMenuPath = "";
var g_imgPtzPath = "";
var g_imgVAPath ="";
var g_player_name = "";

var g_isNoLogo=0;  //20120303  julia add for EDR HD-2H14 no logo but use "img/menu/" image  


g_title = "Digital Video Recorder";
g_player_name = "EFPlayer.zip";
g_imgMenuPath = "img/menu/";
g_imgPtzPath = "../img/ptz/";
g_imgVAPath = "../img/Intelligent/";

var g_Applet_ver;

g_Applet_ver = "1.00.00";

var g_product = 0;
            //426 => ENDEAVOR264 X4
			
			
var g_model = 0;
var g_hdmi = 0;
var g_codec = 16;	//0x10 => P2
var g_ch_num = 0;
var g_ipcam_num = 0;  //20120209  julia add for add IPCam
var g_total_ch_num = 0;
var g_audio_num = 0;
var g_audio_switch = 0;
var g_dual_switch = 1;//0:main 1:dual
//var g_lang_ary = new Array("en","ru","zh","ch","th","jp","fr","de","hu","it","du","sp");
var g_lang_ary = new Array(0,1,3,4,"th",5,6,7,"hu","it",8,2);
		//lang	fw	web
		//en	0	0
		//ru	1	1
		//zh	2	3
		//ch	3	4
		//th
		//jp	5	5
		//fr	6	6
		//de	7	7
		//hu
		//it
		//du	10	8
		//sp	11	2
var g_lang = 0;

var connectStatus = 0;
var g_errCount = 0;

var g_ch_status = null;		//display => 1: 1X1,2: 2X2,3: 3X3,4: 4X4 (if this equals to 0 => g_cam_status doesn't equal to 0)
var g_cam_status = null;	//0 ~ g_ch_num - 1
var g_search_cam = null;	//0 ~ g_ch_num - 1

var g_display_max = Math.ceil(Math.sqrt(g_ch_num));

var g_dvr_sys = 0;		//numbe: NTSC:30/15/10/7.5/5/1  PAL:25/12.5/6.25/5/2.5/1 fps
						//if(parent.g_dvr_sys == 0) //NTSC

var g_user_lv = 0;		//0:Disable 1:Operator 2:Manager 3:Administrator
var g_user_name = "";
var g_user_password = "";
var g_lv_ary = new Array(
			"1,0,0,0,0,0,0,0,0,0,0,0,0,0",
			"1,0,0,0,0,0,0,0,0,1,1,0,0,0",
			"1,0,0,0,0,0,0,0,1,1,1,1,1,1",
			"1,1,1,1,1,1,1,1,1,1,1,1,1,1");
var g_time_fmt = 0;	//0 : 12h, 1 : 24h
var g_date_fmt = 0;	//0 : dd/mm/yyyy
					//1 : yyyy/mm/dd
					//2 : mm/dd/yy
var g_date_fmt_ary = new Array("yyyy/mm/dd","dd/mm/yyyy","mm/dd/yyyy");
var g_time_fmt_ary = new Array("hh:MM:ss TT","HH:MM:ss");

var g_fps_max = 480;

var g_lock_menu = 0;
var g_submenu_idx = 0;

var g_year_start = 2007;
var g_year_range = 30;
var g_OutputSum = 4; //20100920 ruby add for according to g_product to judge output number

var g_motion_width;
var g_motion_height;
var g_model_name;
var g_nic_num;

function setSelectResolution() {
    var args = arguments;
    var id = args[0];
    var stream_ary = args[1];

    var hs = new HandleSelect(id, 0);
    for (var i = 0; i < stream_ary.length; i++) {
        hs.addOpt(i, stream_ary[i], i);
    }

}
function setSelectFps() {
    var args = arguments;
    var id = args[0];
    var speed_ary = args[1];
    var hs = new HandleSelect(id, 0);
    for (var i = 0; i < speed_ary.length; i++) {
        //hs.addOpt(i, speed_ary[i], speed_ary[i].split(" ")[0]);
        hs.addOpt(i, speed_ary[i], i);
    }

}

function getFpsValue(value) {
    /*
    var tmpNTSC = new Array(30, 15, 10, 7.5, 5, 3, 2, 1, 0);
    var tmpPAL = new Array(25, 12.5, 8, 6.25, 5, 3, 2, 1, 0);
    if (g_dvr_sys == 0) {				//NTSC
        return tmpNTSC[no];
    } else {						//PAL
        return tmpPAL[no];
    }
    */
    var tmpAry = g_mainNormalSpeed_ary;
    var no = value.toInt();
    return tmpAry[no].split(" ")[0];
}
function setSelectYear(id) {
    var hs = new HandleSelect(id, 0);
    for (var i = 0; i <= g_year_range; i++) {
        hs.addOpt(i, i + g_year_start, i + g_year_start);
    }
}
function setSelectMonth(id) {
    var hs = new HandleSelect(id, 0);
    for (var i = 0; i < 12; i++) {
        hs.addOpt(i, (i + 1).toFill(2), i + 1);
    }
}
function setSelectDay(id) {
    var hs = new HandleSelect(id, 0);
    for (var i = 0; i < 31; i++) {
        hs.addOpt(i, (i + 1).toFill(2), i + 1);
    }
}
function setSelectHour(id) {
    var hs = new HandleSelect(id, 0);
    if (g_time_fmt == 0) {				//12H 
        for (var i = 0; i < 24; i++) {
            if (i == 0) {
                hs.addOpt(i, 12, 0);
            } else {
                var tmpVal = i;
                if (tmpVal > 12) {
                    tmpVal = tmpVal - 12;
                }
                hs.addOpt(i, tmpVal.toFill(2), i);
            }
        }
    } else {
        for (var i = 0; i < 24; i++) {
            hs.addOpt(i, i.toFill(2), i);
        }
    }
}
function setSelectMin(id) {
    var hs = new HandleSelect(id, 0);
    for (var i = 0; i < 60; i++) {
        hs.addOpt(i, i.toFill(2), i);
    }
}
function setSelectResolutionHD(id) {
    var hs = new HandleSelect(id, 0);
    hs.addOpt(0, "1920x1080", 0)
		.addOpt(1, "1280x720", 1);
}

function setSelectOutput(id, num) {	//num refer to g_OutputSum which set in index.hmtl
    var hs = new HandleSelect(id, 0);
    hs.addOpt(0, hl.get("NONE"), "0");
    for (var i = 1; i <= num; i++)
        hs.addOpt(i, i.toString(), i.toString());
}