$(function(){
  imgLazyloadLib();
  //浠ｇ爜鍒涘缓涓€涓伄缃╁眰锛岀敤浜庡仛鍔犺浇鍔ㄧ敾
  //setScroll();
  setEventListen();
})
$(window).load(function(){
  diyAutoHeight();
  imgLazyloadLib();
});
$(window).resize(function(){
  if(window.resizeTimeout)window.clearTimeout(window.resizeTimeout);
  window.resizeTimeout=setTimeout(function(){
    diyAutoHeight();
  },350);
});
function imgLazyloadLib(obj){
  if(obj){
    obj.lazyload({event:'scroll mouseover',effect: "fadeIn",threshold:0,failure_limit:80,skip_invisible:false,load:function(){
      var father=$(this).parents('.view').first();
      if(father.length>0){
        setTimeout(function(){diyAutoHeight(father);},500);
      }else{
        father=$(this).parents('.layout').first();
        if(father.length>0){
          setTimeout(function(){diyAutoHeight(father);},500);
        }
      }
    }});
  }else{
    $("img").lazyload({event:'scroll mouseover',effect: "fadeIn",threshold:0,failure_limit:80,skip_invisible:false,load:function(){
      var father=$(this).parents('.view').first();
      if(father.length>0){
        setTimeout(function(){diyAutoHeight(father);},500);
      }else{
        father=$(this).parents('.layout').first();
        if(father.length>0){
          setTimeout(function(){diyAutoHeight(father);},500);
        }
      }
    }});
  }
}
var scrollTime=300;
function setEventListen(){
  $(".ev_c_scrollTop").click(function(){
    //婊氬姩鍒伴《閮�
    //$("html").getNiceScroll().resize();
    //$("html").getNiceScroll(0).doScrollTop(0);
    $("html,body").stop().animate({scrollTop:"0px"},window.scrollTime);
  });
  $(".ev_c_scrollView").click(function(){
    //榧犳爣鐐瑰嚮锛氭粴鍔ㄥ埌妯″潡浣嶇疆
    var settings=settingsLib($(this));
    var viewid=settings.getSetting('eventSet.scrollView');
    if($("#"+viewid).length>0){
      //$("html").getNiceScroll().resize();
      //$("html").getNiceScroll(0).doScrollTop($("#"+viewid).offset().top);
      $("html,body").stop().animate({scrollTop:$("#"+viewid).offset().top+"px"},window.scrollTime);
    }
  });
  $(".ev_c_showView").click(function(){
    //榧犳爣鐐瑰嚮锛氭樉绀烘ā鍧�
    showEventView($(this));
  });
  $(".ev_c_hidView").click(function(){
    //榧犳爣鐐瑰嚮锛氶殣钘忔ā鍧�
    hidEventView($(this));
  });
  $(".ev_c_tabView").click(function(){
    //榧犳爣鐐瑰嚮锛氭樉绀轰笌闅愯棌妯″潡
    showHidEventView($(this));
  });
  $(".ev_m_tabView").hover(function(){
    //榧犳爣鐐瑰嚮锛氭樉绀轰笌闅愯棌妯″潡
    showHidEventView($(this));
  });
  $(".view").click(function(){
    $(this).children(".view_contents").addClass("diyCurTab");
    var settings=settingsLib($(this));
    var unitViewSet=settings.getSetting('unitViewSet');
    if(unitViewSet&&unitViewSet.length>0){
      for(key in unitViewSet){
        $("#"+unitViewSet[key]).children(".view_contents").removeClass("diyCurTab");
      }
    }
  });
}
function showHidEventView(obj){
  var settings=settingsLib(obj);
  var showViews=settings.getSetting('eventSet.showViews');
  var hidViews=settings.getSetting('eventSet.hidViews');
  if(!showViews)showViews=new Array();
  if(!hidViews)hidViews=new Array();
  var doubleKey=new Array();
  //鑾峰彇閲嶅鍊�
  if(showViews.length>0){
    for(s_key in showViews){
      if(hidViews.length>0){
        for(h_key in hidViews){
          if(showViews[s_key]==hidViews[h_key]){
            doubleKey.push(showViews[s_key]);
          }
        }
      }
    }
  }
  //闅愯棌
  if(hidViews.length>0){
    for(key in hidViews){
      if($.inArray(hidViews[key],doubleKey)<0){
        $("#"+hidViews[key]).css({"display":"none"});
        diyAutoHeight($("#"+hidViews[key]));
      }
    }
  }
  //鏄剧ず
  if(showViews.length>0){
    for(key in showViews){
      if($.inArray(showViews[key],doubleKey)<0){
        $("#"+showViews[key]).css({"display":"block"});
        diyAutoHeight($("#"+showViews[key]));
      }
    }
  }
  //鍙屽悜鏄剧ず
  if(doubleKey.length>0){
    for(key in doubleKey){
      if($("#"+doubleKey[key]).length>0){
        if($("#"+doubleKey[key]).is(":hidden")){
          $("#"+doubleKey[key]).css({"display":"block"});
          diyAutoHeight($("#"+doubleKey[key]));
        }else{
          $("#"+doubleKey[key]).css({"display":"none"});
          diyAutoHeight($("#"+doubleKey[key]));
        }
      }
    }
  }
}
function showEventView(obj){
  var settings=settingsLib(obj);
  var showViews=settings.getSetting('eventSet.showViews');
  if(!showViews)showViews=new Array();
  if(showViews.length>0){
    for(key in showViews){
      $("#"+showViews[key]).css({"display":"block"});
      diyAutoHeight($("#"+showViews[key]));
    }
  }
}
function hidEventView(obj){
  var settings=settingsLib(obj);
  var hidViews=settings.getSetting('eventSet.hidViews');
  if(!hidViews)hidViews=new Array();
  if(hidViews.length>0){
    for(key in hidViews){
      $("#"+hidViews[key]).css({"display":"none"});
      diyAutoHeight($("#"+hidViews[key]));
    }
  }
}
function getPageScrollTop(){
  var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
  return scrollTop;
}
function getNowPage(){
  var width=$(window).width();
  var max_width=window.DIY_PAGE_SIZE;
  max_width=parseFloat(max_width);
  if(isNaN(max_width))max_width=1200;
  if(width>=max_width){
    return 'pc';
  }else if(width>=640){
    return 'pad';
  }else{
    return 'mobile';
  }
}
$(window).scroll(function(){
    var scrollTop=getPageScrollTop();
    var nowPage=getNowPage();
    if($(".scrollToTop_"+nowPage).length>0){
      $(".scrollToTop_"+nowPage).each(function(){
        var old_top=$(this).attr("old_top_"+nowPage);
        var old_left=$(this).attr("old_left_"+nowPage);
        var old_width=$(this).attr("old_width_"+nowPage);
        if(!old_top||old_top==""){
          old_top=$(this).offset().top;
          $(this).attr("old_top_"+nowPage,old_top);
        }
        if(!old_left||old_left==""){
          old_left=$(this).offset().left;
          $(this).attr("old_left_"+nowPage,old_left);
        }
        if(!old_width||old_width==""){
          old_width=$(this).width();
          $(this).attr("old_width_"+nowPage,old_width);
        }
        old_top=parseFloat(old_top);
        old_left=parseFloat(old_left);
        old_width=parseFloat(old_width);
        if(scrollTop>=old_top){
          $(this).css({"position":"fixed","z-index":9999999,"top":"0px","width":old_width+"px","left":old_left+"px"});
          $(this).parents(".view").css({"z-index":9999999});
          //$(this).parents(".view").children(".view_contents").css({"overflow":"visible"});
          $(this).parents(".layout").css({"z-index":9999999});
          //$(this).parents(".layout").children(".view_contents").css({"overflow":"visible"});
        }else{
          $(this).css({"position":"","z-index":"","top":"","width":"","left":""});
          $(this).parents(".view").css({"z-index":""});
          //$(this).parents(".view").children(".view_contents").css({"overflow":""});
          $(this).parents(".layout").css({"z-index":""});
          //$(this).parents(".layout").children(".view_contents").css({"overflow":""});
          $(this).attr("old_top_"+nowPage,null);
          $(this).attr("old_left_"+nowPage,null);
          $(this).attr("old_width_"+nowPage,null);
        }
      });
    }
});
function diyAutoHeight(obj){
  if(obj&&obj.length>0){
    //閽堝閫夐」鍗″仛鐗规畩澶勭悊
    if(obj.children(".view_contents").children("form").length>0){
      if(obj.children(".view_contents").children("form").children(".view").length>0){
        obj.children(".view_contents").children("form").children(".view").each(function(){
          if($(this).is(":visible")){
            diyAutoHeightDo($(this));
            return false;
          }
        });
      }else{
        diyAutoHeightDo(obj);
      }
    }else if(obj.children(".view_contents").children(".niceTab").find(".niceTabShow").length>0){
      if(obj.children(".view_contents").children(".niceTab").find(".niceTabShow").children(".view").length>0){
        obj.children(".view_contents").children(".niceTab").find(".niceTabShow").children(".view").each(function(){
          if($(this).is(":visible")){
            diyAutoHeightDo($(this));
            return false;
          }
        });
      }else{
        diyAutoHeightDo(obj);
      }
    }else{
      diyAutoHeightDo(obj);
    }
  }else{
    setTimeout(function(){
      $(".view").each(function(){
        if(!$(this).hasClass("includeBlock")){
          diyAutoHeightDo($(this));
        }
      });
    },500);
  }
}
function diyAutoHeightFatherDo(father,obj){
  var settings=settingsLib(father);
  var autoHeight=settings.getSetting('autoHeight');
  if(autoHeight&&autoHeight=="true"){
    //寮€鍚簡鍏佽鑷姩楂樺害
    var minHeight=obj.offset().top+obj.height()-father.offset().top;
    if(obj.siblings(".view").length>0){
      obj.siblings(".view").each(function(){
        if($(this).is(":visible")){
          var tempHeight=$(this).offset().top+$(this).height()-father.offset().top;
          if(tempHeight>minHeight){
            minHeight=tempHeight;
          }
        }
      });
    }
    father.css({"height":minHeight+"px"});
    diyAutoHeightDo(father);
  }
}
function diyAutoHeightDo(obj){
  if(obj.is(":visible")){
    var father=obj.parents(".view").first();
    if(father.length<=0)father=obj.parents(".layout").first();
    if(father.length>0){
      var settings=settingsLib(father);
      var autoHeight=settings.getSetting('autoHeight');
      if(autoHeight&&autoHeight=="true"){
        if(father.offset().top+father.height()<obj.offset().top+obj.height()){
          father.css({"height":(obj.offset().top+obj.height()-father.offset().top)+"px"});
          diyAutoHeightDo(father);
        }else{
          diyAutoHeightFatherDo(father,obj);
        }
      }
    }
  }
}
function setScroll(){
  if(typeof($("html").niceScroll)=="function"){
    $("html").niceScroll({zindex:99999,cursoropacitymax:0.8,cursoropacitymin:0.3,horizrailenabled:false,mousescrollstep:60,smoothscroll:true});
  }else{
    setTimeout(setScroll,500);
  }
}
var settingsLib=function(view){
  var main={
    view:null,
    setup:function(obj){
      if(window.viewsSettings&&window.viewsSettings[obj.attr("id")]){
        this.init(window.viewsSettings[obj.attr("id")]);
        this.view=obj;
      }else{
        this.init({});
      }
    },
    init:function(obj){
      if(typeof(obj)=='object'){
        this.settings=obj;
      }else if(obj!=""){
        eval('if(typeof('+obj+')=="object"){this.settings='+obj+';}else{this.settings={};}');
      }else{
        this.settings={};
      }
    },
    setSetting:function(k,v){
      if(!this.settings){
        this.settings={};
      }
      var keyArray=k.split(".");
          var val='this.settings';
      for (key in keyArray){
        if(keyArray[key]&&keyArray[key]!=''){
          if(eval(val+'["'+keyArray[key]+'"]')){
            val=val+'["'+keyArray[key]+'"]';
          }else{
            eval(val+'["'+keyArray[key]+'"]={}');
            val=val+'["'+keyArray[key]+'"]';
          }
        }
      }
      if(v==null){
        eval("delete "+val);
      }else{
        eval(val+"=v");
      }
    },
    getSetting:function(key){
      if(!this.settings){
        this.settings={};
      }
      if(key){
        var keyArray=key.split(".");
        var val='this.settings';
        for (key in keyArray){
          if(keyArray[key]&&keyArray[key]!=''){
            if(eval(val+'["'+keyArray[key]+'"]')){
              val=val+'["'+keyArray[key]+'"]';
              continue;
            }else{
              val=null;
              break;
            }
          }
        }
        return eval(val);
      }else{
        return this.settings;
      }
    },
    saveSettings:function(obj){
      if(typeof(obj)=="object"&&this.settings&&obj.hasClass("view")){
        window.viewsSettings[obj.attr("id")]=this.settings;
      }else if(this.view&&typeof(this.view)=="object"&&this.settings&&this.view.hasClass("view")){
        window.viewsSettings[this.view.attr("id")]=this.settings;
      }
    }
  };
  if(view){
    main.view=view;
    main.setup(view);
  }
  return main;
}

function GetUrlPara(){
  var url = document.location.toString();
  var arrUrl = url.split("?");
  var paras='';
  if(arrUrl.length>1){
    var para = arrUrl[1];
    var arrUrl2=para.split("&");
    arrUrl2.forEach(function(e){
      if(e.indexOf("mod=")>=0||e.indexOf("act=")>=0||e.indexOf("#")>=0){
         return;
      }else{
        paras+=e+"&";
      }
    })
  }
  return paras;
}

function RequestURL(viewid, sys_url, moreParams){
  var serverUrl = 'http://'+DIY_JS_SERVER+'/sysTools.php?mod=viewsConn&rtype=json&idweb='+DIY_WEBSITE_ID+'&'+sys_url;
  var settings = settingsLib($("#"+viewid));
  var params = "";
  if(settings && settings.getSetting("data")){
    $.each(settings.getSetting("data"), function(key, val){
      if($.isArray(val)){
        $.each(val, function(key2, val2){
          params += "&"+key+"[]="+val2;
        });
      }else{
        params += "&"+key+"="+val;
      }
    });
    if(params) serverUrl += params;
  }
  var params2 = GetUrlPara();
  if(params2) serverUrl += "&" + params2;
  if(moreParams) serverUrl += "&" + moreParams;
  var scriptString = "<scr"+"ipt type='text/javascript' src="+serverUrl+"></scr"+"ipt>";
  //$.ajaxSettings.async = false;
  $.ajax({
    dataType: 'json',
    url: serverUrl,
    xhrFields:{withCredentials:true},
    success: function(result){
    if(result.error) alert(result.error);
    else{
      if(typeof(history.replaceState) != 'undefined'){
        var obj={};
        var hstate=JSON.stringify(history.state);
        if(hstate!='null'&& hstate!=null){
          eval('var hjson = ' + hstate);
          obj=hjson;
        }
        var key="moreParams"+viewid;
        obj[key]=moreParams;
        //var strparam=viewid+":"+moreParams;
        //history.replaceState({("moreParams"+viewid):moreParams},"","");
        history.replaceState(obj,"","");
      }
      $("#"+viewid).children(".view_contents").html(result.html);
      $("#"+viewid).show();
      setTimeout(function(){
        diyAutoHeight($("#"+viewid));
      },500);
    }
  }});
  setTimeout(function(){commDefault_isFT();},500);
  function commDefault_isFT(){
    var based_Obj= document.getElementById("based");
    var currentlang_Obj= document.getElementById("currentlang");//褰撳墠璇█
    console.log(Request('chlang'))
    $(function(){
      if (based_Obj){
        var JF_cn="ft"+self.location.hostname.toString().replace(/\./g,"");
        switch( Request('chlang') ){
          case "cn-tw":
            BodyIsFt= getCookie(JF_cn)=="1"? 0 : 1;
            delCookie(JF_cn);
            SetCookie(JF_cn, BodyIsFt, 7);
            break;
          case "cn":
          case "en":
            BodyIsFt= 0;
            delCookie(JF_cn);
            SetCookie(JF_cn, 0, 7);
            currentlang_Obj.innerHTML = "绠€浣撲腑鏂�";
            break;
          case "tw":
            BodyIsFt= 1;
            delCookie(JF_cn);
            SetCookie(JF_cn, 1, 7);
            currentlang_Obj.innerHTML = "绻侀珨涓枃"; //鍥犱负鏄箒浣� 浣犲啓绠€浣撲篃浼氳杞寲鎴愮箒浣�  鎵€浠ヨ繖鍎垮彧鑳藉啓绻佷綋 2015-1-16
            break;
          default:
            if (typeof Default_isFT!='undefined' && Default_isFT){ //濡傛灉榛樿绻佷綋
              if(getCookie(JF_cn)==null){
                BodyIsFt= 1;
                SetCookie(JF_cn, 1, 7);
                break;
              }
            }
            BodyIsFt= parseInt(getCookie(JF_cn));
        }
        if(BodyIsFt===1){
          StranBody();
          document.title = StranText(document.title);
        }else{
          StranBodyce();
          document.title = StranTextce(document.title);
        }
      }else{
        var JF_cn="ft"+self.location.hostname.toString().replace(/\./g,"");
        if(Default_isFT){
          BodyIsFt= 1;
          delCookie(JF_cn);
          SetCookie(JF_cn, 1, 7);
          StranBody();
          document.title = StranText(document.title);
        }else{
          BodyIsFt= 0;
          delCookie(JF_cn);
          SetCookie(JF_cn, 0, 7);
          /*StranBodyce();
          document.title = StranTextce(document.title);*/
        }
      }

    });
  }
  /*
  $.getJSON(serverUrl, function(result){
    if(result.error) alert(result.error);
    else{
      $("#"+viewid).children(".view_contents").html(result.html);
      $("#"+viewid).show();
      setTimeout(function(){
        diyAutoHeight($("#"+viewid));
      },500);
    }
  });*/
  //$("#"+viewid).append(scriptString);
}
//瀵艰埅鍏叡鐩戝惉鍑芥暟
function setDhListen(style,obj,params){
  var father=$(obj).parents(".dh").first();
  if(father.length>0){
    switch(style){
      case 'style_01':
        father.find(".miniMenu").toggleClass("Mslide");
              if($("body").css("position")=="relative"){
                  $("body").css({"position":"fixed","width":"100%"});
              }else{
                  $("body").css({"position":"relative","width":"100%"});
              }
        break;
      case 'style_02':
        if(params=="open"){
          father.find(".Style_02_miniMenu .menuMain").css("display","block");
        }else{
          father.find(".Style_02_miniMenu .menuMain").css("display","none");
        }
        break;
      case 'style_03':
        if(params=="mobi_more"){
          $(obj).parent().siblings(".mobi_menuUl02").toggle();
        }else if(params=="m_icoFont"){
          $(obj).parents(".mobi_main").hide();
        }else if(params=="mobi_top"){
          $(obj).siblings(".mobi_main").show();
        }
        break;
      case 'style_04':
        var width = $(window).width();
                var newW = width+18;
                father.find(".newWidth").css("width",newW);
                father.find(".miniMenu").toggleClass("Mslide");
                if($("body").css("position")=="relative"){
                    $("body").css({"position":"fixed","width":"100%"});
                }else{
                    $("body").css({"position":"relative","width":"100%"});
                }
        break;
    }
  }
}
//-------------閫夐」鍗�-----------------------------------------------
//榧犳爣宸﹀彸鎷栨嫿浜嬩欢
function setScroll_Choice(tabId){
  if(navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)) return;
  if(typeof($(".tab_nav .tab_scroll", $("#"+tabId)).niceScroll)=="function"){
    $(".tab_nav .tab_scroll", $("#"+tabId)).niceScroll({zIndex:99999,cursoropacitymax:0,cursoropacitymin:0,horizrailenabled:true,autohidemode:true,touchbehavior:true});
  }else{
    setTimeout(setScroll_Choice,500);
  }
}

/*榧犳爣鎮诞鏁堟灉*/
function setHover_Choice(tabId){
  $(".tab_nav .tab_li", $("#"+tabId)).unbind('hover');
  $(".tab_nav .tab_li", $("#"+tabId)).hover(function(){
    var index = $(this).index();
    $(this).addClass("tabCurItem").siblings().removeClass("tabCurItem");
    $(".tab_box .tab_div", $("#"+tabId)).eq(index).addClass("niceTabShow").siblings().removeClass("niceTabShow");
    diyAutoHeight($("#"+tabId.substr(4)));
  });
}
/*榧犳爣鐐瑰嚮鏁堟灉*/
function setClick_Choice(tabId){
  $(".tab_nav .tab_li", $("#"+tabId)).unbind('click');
  $(".tab_nav .tab_li", $("#"+tabId)).click(function(){
    var index = $(this).index();
    $(this).addClass("tabCurItem").siblings().removeClass("tabCurItem");
    $(".tab_box .tab_div", $("#"+tabId)).eq(index).addClass("niceTabShow").siblings().removeClass("niceTabShow");
    diyAutoHeight($("#"+tabId.substr(4)));
  });
}
/*鑷姩鎾斁*/
function setAnimat_int(tabId,time){
  if(!time)time=5;
  time=time*1000;
  var viewid=tabId.substr(4);

  if(!window.tabConfigAnimat)window.tabConfigAnimat={};
  //鍒濆鍖�
  window.tabConfigAnimat[viewid]=setTimeout(doAnimat,time);

  $("#"+viewid).mousemove(function(){
    if(window.tabConfigAnimat[viewid])window.clearTimeout(window.tabConfigAnimat[viewid]);
  });
  $("#"+viewid).mouseover(function(){
    if(window.tabConfigAnimat[viewid])window.clearTimeout(window.tabConfigAnimat[viewid]);
  });
  $("#"+viewid).mouseout(function(){
    window.tabConfigAnimat[viewid]=setTimeout(doAnimat,time);
  });

  function doAnimat(){
    if(window.tabConfigAnimat[viewid])window.clearTimeout(window.tabConfigAnimat[viewid]);
    var index=$(".tab_nav .tabCurItem", $("#"+tabId)).index();
    index=index+1;
    if(index>=$(".tab_nav .tab_li", $("#"+tabId)).length){
      index=0;
    }
    $(".tab_nav .tab_li", $("#"+tabId)).eq(index).addClass("tabCurItem").siblings().removeClass("tabCurItem");
    $(".tab_box .tab_div", $("#"+tabId)).eq(index).addClass("niceTabShow").siblings().removeClass("niceTabShow");
    diyAutoHeight($("#"+tabId.substr(4)));
    window.tabConfigAnimat[viewid]=setTimeout(doAnimat,time);
  }
}
//鑾峰彇榧犳爣鎷栨嫿鍖哄煙鐨勬€诲搴�
function tab_style03_init(tabId){
  var total=0;
  var obj=$(".tab_li", $("#"+tabId));
  $(".tab_li", $("#"+tabId)).each(function(){
    total+=$(this).width();
  });
  $(".tab_ul_top", $("#"+tabId)).css("width",total+"px");
  $(".tab_ul_bottom", $("#"+tabId)).css("width",total+"px");

  //鍚戝乏婊氬姩鍥炬爣浜嬩欢
  $(".tab_left_arrow", $("#"+tabId)).unbind('click');
  $(".tab_left_arrow", $("#"+tabId)).click(function(){
    var index = $(".tab_nav .tabCurItem", $("#"+tabId)).index();
    index = index-1;
    $(".tab_nav .tab_li", $("#"+tabId)).eq(index).addClass("tabCurItem").siblings().removeClass("tabCurItem");
    $(".tab_box .tab_div", $("#"+tabId)).eq(index).addClass("niceTabShow").siblings().removeClass("niceTabShow");
  });

  //鍚戝彸婊氬姩鍥炬爣浜嬩欢
  $(".tab_right_arrow", $("#"+tabId)).unbind('click');
  $(".tab_right_arrow", $("#"+tabId)).click(function(){
    var index = $(".tab_nav .tabCurItem", $("#"+tabId)).index();
    var len = $(".tab_nav .tab_li").length;
    index = index+1;
    if(index >= len){
      index = 0;
    }
    $(".tab_nav .tab_li", $("#"+tabId)).eq(index).addClass("tabCurItem").siblings().removeClass("tabCurItem");
    $(".tab_box .tab_div", $("#"+tabId)).eq(index).addClass("niceTabShow").siblings().removeClass("niceTabShow");
  });
  setScroll_Choice(tabId);
}
function StranBody(fobj){
  var obj= fobj ? fobj.childNodes : document.body.childNodes;
  for(var i=0;i<obj.length;i++){
    var OO=obj.item(i);
    if("||BR|HR|TEXTAREA|".indexOf("|"+OO.tagName+"|")>0||OO==based_Obj)continue;
    if(OO.title!=""&&OO.title!=null)OO.title=StranText(OO.title);
    if(OO.alt!=""&&OO.alt!=null)OO.alt=StranText(OO.alt);
    if(OO.tagName=="INPUT"&&OO.value!=""&&OO.type!="text"&&OO.type!="hidden")OO.value=StranText(OO.value);
    if(OO.nodeType==3){OO.data=StranText(OO.data)}
    else StranBody(OO)
  }

  try{
    var based_Obj2= document.getElementById("based2");
    if(!based_Obj2) { //绠€绻�
      based_Obj.innerHTML = BodyIsFt==1? "绠€浣撲腑鏂�":"绻佷綋涓枃";
    }else{ //绠€绻佽嫳
      based_Obj.innerHTML = "绻佷綋涓枃";
      based_Obj2.innerHTML = "绠€浣撲腑鏂�";
    }
  }catch(e){}
}
function StranBodyce(fobj){
  var obj= fobj ? fobj.childNodes : document.body.childNodes;
  for(var i=0;i<obj.length;i++){
    var OO=obj.item(i);
    if("||BR|HR|TEXTAREA|".indexOf("|"+OO.tagName+"|")>0||OO==based_Obj)continue;
    if(OO.title!=""&&OO.title!=null)OO.title=StranTextce(OO.title);
    if(OO.alt!=""&&OO.alt!=null)OO.alt=StranTextce(OO.alt);
    if(OO.tagName=="INPUT"&&OO.value!=""&&OO.type!="text"&&OO.type!="hidden")OO.value=StranTextce(OO.value);
    if(OO.nodeType==3){OO.data=StranTextce(OO.data)}
    else StranBodyce(OO)
  }
  try{
    var based_Obj2= document.getElementById("based2");
    if(!based_Obj2) { //绠€绻�
      based_Obj.innerHTML = BodyIsFt==1? "绠€浣撲腑鏂�":"绻佷綋涓枃";
    }else{ //绠€绻佽嫳
      based_Obj.innerHTML = "绻佷綋涓枃";
      based_Obj2.innerHTML = "绠€浣撲腑鏂�";
    }
  }catch(e){}
}
function StranText(txt){
  if(txt==""||txt==null)return "";
  return Traditionalized(txt);
}
function StranTextce(txt){
  if(txt==""||txt==null)return "";
  return Traditionalizedce(txt);
}
function JTPYStr(){
  return '鐨戣敿纰嶇埍缈辫濂ュ潩缃㈡憜璐ラ鍔炵粖甯粦闀戣挨鍓ラケ瀹濇姤椴嶈緢璐濋挕鐙堝鎯环绗旀瘯姣欓棴杈圭紪璐彉杈╄精槌栫槳婵掓花瀹炬憟楗兼嫧閽甸搨椹冲崪琛ュ弬铓曟畫鎯儴鐏胯媿鑸变粨娌у帟渚у唽娴嬪眰璇ф悁鎺鸿潐棣嬭皸缂犻摬浜ч槓棰ゅ満灏濋暱鍋胯偁鍘傜晠閽炶溅褰诲皹闄堣‖鎾戠О鎯╄瘹楠嬬棿杩熼┌鑰婚娇鐐藉啿铏疇鐣磋笇绛圭桓涓戞┍鍘ㄩ攧闆忕鍌ㄨЕ澶勪紶鐤棷鍒涢敜绾话杈炶瘝璧愯仾钁卞洷浠庝笡鍑戠獪閿欒揪甯﹁捶鎷呭崟閮告幐鑳嗘儺璇炲脊褰撴尅鍏氳崱妗ｆ崳宀涚シ瀵肩洍鐏倱鏁屾钉閫掔紨鐐瑰灚鐢垫穩閽撹皟杩皪鍙犻拤椤堕敪璁笢鍔ㄦ爧鍐绘枟鐘婄嫭璇昏祵闀€閿绘柇缂庡厬闃熷鍚ㄩ】閽濆ず楣呴璁规伓楗垮効灏旈サ璐板彂缃氶榾鐝愮熅閽掔儲鑼冭穿楗绾洪搴熻垂绾峰潫濂嬫劋绮赴鏋攱椋庣柉鍐紳璁藉嚖鑲よ緪鎶氳緟璧嬪璐熻濡囩細璇ラ挋鐩栧共璧剁璧ｅ唸鍒氶挗绾插矖鐨嬮晲鎼侀附闃侀摤涓粰榫氬宸╄础閽╂矡鏋勮喘澶熻泭椤惧墣鍏宠棣嗘儻璐箍瑙勭褰掗緹闂鸿建璇℃煖璐靛埥杈婃粴閿呭浗杩囬獓闊╂眽闃傞工璐烘í杞伴缚绾㈠悗澹舵姢娌埛鍝楀崕鐢诲垝璇濇€€鍧忔鐜繕缂撴崲鍞ょ棯鐒曟叮榛勮皫鎸ヨ緣姣佽纯绉戒細鐑╂眹璁宠缁樿崵娴戜紮鑾疯揣绁稿嚮鏈虹Н楗ヨ楦＄哗缂夋瀬杈戠骇鎸ゅ嚑钃熷墏娴庤璁伴檯缁х邯澶硅崥棰婅淳閽句环椹炬鐩戝潥绗洪棿鑹扮紕鑼ф纰辩》鎷ｆ崱绠€淇噺鑽愭閴磋返璐辫閿埌鍓戦ク娓愭簠娑ф祮钂嬫〃濂栬閰辫兌娴囬獎濞囨悈閾扮煫渚ヨ剼楗虹即缁炶娇杈冪Ц闃惰妭鑼庢儕缁忛闈欓暅寰勭棄绔炲噣绾犲帺鏃ч┕涓炬嵁閿儳鍓ч箖缁㈡澃娲佺粨璇眾绱ч敠浠呰皑杩涙檵鐑敖鍔茶崋瑙夊喅璇€缁濋挧鍐涢獜寮€鍑澹宠鍨︽伋鎶犲簱瑁ゅじ鍧椾京瀹界熆鏃峰喌浜忓部绐ラ婧冩墿闃旇湣鑵婅幈鏉ヨ禆钃濇爮鎷︾闃戝叞婢滆鞍鎻借鎳掔紗鐑傛互鎹炲姵娑濅箰闀瀿绫绘唱绡辩閲岄菠绀间附鍘夊姳鐮惧巻娌ラ毝淇╄仈鑾茶繛闀版€滄稛甯樻暃鑴搁摼鎭嬬偧缁冪伯鍑変袱杈嗚皡鐤楄窘闀ｇ寧涓撮偦槌炲嚊璧侀緞閾冨噷鐏靛箔棰嗛鍒橀緳鑱嬪挋绗煎瀯鎷㈤檱妤煎▌鎼傜瘬鑺﹀崲棰呭簮鐐夋幊鍗よ檹椴佽祩绂勫綍闄嗛┐鍚曢摑渚ｅ薄缂曡檻婊ょ豢宄︽寷瀛沪涔辨姟杞鸡浠戞拨绾惰钀濈綏閫婚敚绠╅楠嗙粶濡堢帥鐮佽殏椹獋鍚椾拱楹﹀崠杩堣剦鐬掗铔弧璋╃尗閿氶搯璐镐箞闇夋病闀侀棬闂蜂滑閿版ⅵ璋滃讥瑙呯坏缂呭簷鐏偗闂介福閾艾璋嬩憨閽犵撼闅炬尃鑴戞伡闂归鑵绘挼鎹婚吙楦熻亗鍟晩闀嶆煚鐙炲畞鎷ф碁閽航鑴撴祿鍐滅枱璇烘楦ユ鍛曟菠鐩樺簽鍥界埍璧斿柗楣忛獥椋橀璐嫻鍑瘎娉奸鎵戦摵鏈磋氨鑴愰綈楠戝矀鍚皵寮冭鐗垫墻閽庨搮杩佺璋﹂挶閽虫綔娴呰按鍫戞灙鍛涘钄峰己鎶㈤敼妗ヤ箶渚ㄧ繕绐嶇獌閽︿翰杞绘阿鍊鹃》璇峰簡鐞肩┓瓒嬪尯韬┍榫嬮ⅶ鏉冨姖鍗撮箠璁╅ザ鎵扮粫鐑煣璁ょ韩鑽ｇ粧杞攼闂版鼎娲掕惃槌冭禌浼炰抚楠氭壂娑╂潃绾辩瓫鏅掗棯闄曡怠缂激璧忕儳缁嶈祳鎽勬厬璁剧粎瀹″┒鑲炬笚澹扮怀鑳滃湥甯堢嫯婀胯瘲灏告椂铓€瀹炶瘑椹跺娍閲婇グ瑙嗚瘯瀵垮吔鏋㈣緭涔﹁祹灞炴湳鏍戠珫鏁板竻鍙岃皝绋庨『璇寸鐑佷笣楗茶€告€傞璁艰鎿炶嫃璇夎們铏界互宀佸瓩鎹熺瑡缂╃悙閿佺嵀鎸炴姮鎽婅椽鐦哗鍧涜碍璋堝徆姹ょ儷娑涚沪鑵捐獖閿戦浣撳眽鏉¤创閾佸巺鍚儍閾滅粺澶村浘娑傚洟棰撹湑鑴遍傅椹┘妞醇琚滃集婀鹃〗涓囩綉闊﹁繚鍥翠负娼嶇淮鑻囦紵浼含璋撳崼娓╅椈绾圭ǔ闂摦鎸濊湕娑＄獫鍛滈挩涔岃鏃犺姕鍚村潪闆惧姟璇敗鐗鸿涔犻摚鎴忕粏铏捐緰宄′緺鐙帵閿ㄩ矞绾ゅ捀璐よ闂叉樉闄╃幇鐚幙棣呯尽瀹嚎鍘㈤暥涔¤鍝嶉」钀ч攢鏅撳暩铦庡崗鎸熸惡鑳佽皭鍐欐郴璋㈤攲琛呭叴姹归攬缁ｈ櫄鍢橀』璁哥华缁僵鎮€夌櫍缁氬鍕嬭瀵婚┋璁閫婂帇楦﹂腑鍝戜簹璁堕槈鐑熺洂涓ラ闃庤壋鍘岀牃褰﹁皻楠岄腐鏉ㄦ壃鐤￠槼鐥掑吇鏍风懚鎽囧哀閬ョ獞璋ｈ嵂鐖烽〉涓氬彾鍖婚摫棰愰仐浠綕铓佽壓浜垮繂涔夎璁皧璇戝紓缁庤崼闃撮摱楗ū濠撮拱搴旂绩鑾硅悿钀ヨ崸铦囬鍝熸嫢浣ｇ棃韪婂拸娑屼紭蹇ч偖閾€鐘规父璇辫垎楸兼笖濞变笌灞胯鍚佸尽鐙辫獕棰勯┉楦虫笂杈曞洯鍛樺渾缂樿繙鎰跨害璺冮挜宀崇菠鎮﹂槄浜戦儳鍖€闄ㄨ繍钑撮厺鏅曢煹鏉傜伨杞芥敀鏆傝禐璧冭剰鍑挎灒鐏惰矗鎷╁垯娉借醇璧犳墡鏈涧閾￠椄璇堟枊鍊烘鐩忔柀杈楀喘鏍堟垬缁藉紶娑ㄥ笎璐﹁儉璧佃洶杈欓敆杩欒礊閽堜睛璇婇晣闃垫專鐫佺嫲甯ч儜璇佺粐鑱屾墽绾告寶鎺峰笢璐ㄩ挓缁堢鑲夸紬璇岃酱鐨辨樇楠ょ尓璇歌瘺鐑涚灘鍢辫串閾哥瓚椹讳笓鐮栬浆璧氭々搴勮濡嗗．鐘堕敟璧樺潬缂€璋嗘祳鍏硅祫娓嶈釜缁兼€荤旱閭硅瘏缁勯捇鑷撮挓涔堜负鍙嚩鍑嗗惎鏉块噷闆充綑閾炬硠鏍囬€傛€佷簬';
}
function FTPYStr(){
  return '鐨氳椆绀欐剾缈鸿濂у）缃锋摵鏁楅爳杈︾祮骞秮閹婅瑮鍓濋＝瀵跺牨楫戣缉璨濋媷鐙藉倷鎲婄箖绛嗙暍鏂冮枆閭婄法璨惰畩杈井榧堢櫉鐎曟勘璩撴摨椁呮挜缂介墤椐佽敂瑁滃弮锠舵畼鎱氭厴鐕﹁捈鑹欏€夋粍寤佸伌鍐婃脯灞よ┇鏀欐懟锜璁掔簭閺熺敚闂￠～鍫村槜闀峰劅鑵稿粻鏆㈤垟杌婂竟濉甸櫝瑗拹绋辨嚥瑾犻▉鐧￠伈棣虫仴榻掔喚娌栬煵瀵电枃韬婄睂缍㈤啘娅ュ粴閶ら洓绀庡劜瑙歌檿鍌崇槨闂栧壍閷樼磾缍借经瑭炶硿鑱拌敟鍥緸鍙㈡箠绔勯尟閬斿付璨告摂鍠劜鎾ｈ喗鎲氳獣褰堢暥鎿嬮花钑╂獢鎼楀扯绂卞皫鐩滅噲閯ф暤婊岄仦绶犻粸澧婇浕婢遍嚕瑾垮彔璜滅枈閲橀爞閷犺▊鏉卞嫊妫熷噸楝ョ姠鐛ㄨ畝璩崓閸涙柗绶炲厡闅婂皪鍣搁爴閳嶅オ榈濋瑷涙儭椁撳厭鐖鹃璨崇櫦缃伴枼鐞虹が閲╃叐绡勮博椋í绱￠寤㈣不绱涘⒊濂啢绯炶睈妤撻嫆棰ㄧ構棣斧璜烽吵鑶氳蓟鎾紨璩﹁璨犺▋濠︾笡瑭查垼钃嬪构瓒曠▓璐涘病鍓涢嫾缍卞礂鑷幀鎿遍纯闁ｉ壔鍊嬬郸榫斿闉忚并閳庢簼妲嬭臣澶犺牨椤у壆闂滆椁ㄦ叄璨唬瑕忕熃姝搁緶闁ㄨ粚瑭珒璨村妸杓ユ痪閸嬪湅閬庨Л闊撴饥闁￠洞璩€姗綗榇荤磪寰屽：璀锋滑鎴跺槱鑿暙鍔冭┍鎳峰姝＄挵閭勭珐鎻涘枤鐦撶叆娓欓粌璎婃彯杓濇瘈璩勭鏈冪嚧褰欒瑾ㄧ躬钁锋妇澶ョ嵅璨ㄧ鎿婃绌嶉璀忛洖绺剧窛妤佃集绱氭摖骞捐枈鍔戞繜瑷堣闅涚辜绱€澶捐帰闋拌硤閴€鍍归娈茬洠鍫呯畫闁撹壉绶樼弓妾㈠牽楣兼弨鎾跨啊鍎夋笡钖︽閼掕笎璩よ閸佃墻鍔嶉婕告亢婢楁伎钄ｆС鐛庤瑳閱啝婢嗛瀣屾敧閴哥煰鍍ヨ叧椁冪钩绲炶綆杓冪ō闅庣瘈鑾栭缍撻牳闈滈彙寰戠棛绔舵法绯惧粍鑸婇鑸夋摎閶告嚰鍔囬祽绲瑰倯娼旂祼瑾″眴绶婇對鍍呰閫叉檳鐕肩洝鍕佽崐瑕烘焙瑷ｇ禃閳炶粛椐块枊鍑遍娈艰澧炬噰鎽冲韩瑜茶獓濉婂剤瀵う鏇犳硜铏у穻绐洪娼版摯闂婅牊鑷樿悐渚嗚炒钘嶆瑒鏀旂眱闂岃槶鐎捐畷鏀鎳剁簻鐖涙揩鎾堝嫗婢囨▊閻冲椤炴窔绫洟瑁忛瘔绂簵鍘插嫷绀泦鐎濋毟鍊嗚伅钃€ｉ惍鎲愭迹绨炬杺鑷夐張鎴€鐓夌反绯ф都鍏╄紱璜掔檪閬奸悙鐛佃嚚閯伴睏鍑滆硟榻￠埓娣╅潏宥洪牁椁惧妷榫嶈伨鍤ㄧ睜澹熸攺闅存〒濠佹憻绨嶈槅鐩ч”寤垚鎿勯沟铏滈璩傜タ閷勯櫢椹㈠憘閶佷径灞㈢阜鎱烤缍犲窉鏀ｅ鐏や簜鎺勮吉鍊緰娣陡璜栬樋缇呴倧閼肩碑楱鹃П绲″鐟⒓铻為Μ缃靛棊璨烽亥璩ｉ倎鑴堢灋楗呰牷婊胯璨撻尐閴氳部楹介淮娌掗巶闁€鎮跺€戦尦澶㈣瑤褰岃缍跨番寤熸粎鎲柀槌撮姌璎瑎鐣濋垑绱嶉洠鎾撹叇鎯遍椁掕啯鏀嗘挌閲€槌ヨ伓榻ч懛閹虫鐛扮敮鎿版繕閳曠磹鑶挎績杈茬槯璜炬瓙榉楁瘑鍢旀細鐩ら緪鍦嬫剾璩犲櫞榈椋勯牷璨ц構鎲戣娼戦牀鎾查嫪妯歌瓬鑷嶉綂楱庤眻鍟撴埃妫勮鐗芥墶閲洪墰閬风敖璎欓將閴楁經娣鸿濉规鍡嗙墕钖斿挤鎼堕崿姗嬪柆鍍戠抗绔呯珚娆借Κ杓曟矮鍌鹃爟璜嬫叾鐡婄瓒ㄥ崁杌€椹呴讲椤存瑠鍕稿嵒榈茶畵楗掓摼绻炵啽闊岃獚绱夋Ξ绲ㄨ粺閵抽枏娼ょ亼钖╅皳璩藉倶鍠ǚ鎺冩線娈虹礂绡╂洭闁冮櫇璐嶇箷鍌疯碁鐕掔垂璩掓敐鎳捐ō绱冲瀣歌厧婊茶伈绻╁嫕鑱栧斧鐛呮繒瑭╁睄鏅傝潟瀵﹁瓨椐涘嫝閲嬮＞瑕栬│澹界嵏妯炶几鏇歌礀灞妯硅睅鏁稿弗闆欒绋呴爢瑾ⅸ鐖嶇挡椋艰伋鎱爩瑷熻鎿昏槆瑷磋倕闆栫稄姝插鎼嶇瓖绺懀閹栫嵑鎾绘摗鏀よ勃鐧辩仒澹囪瓪璜囨瓗婀嚈婵ょ抚楱拌瑒閵婚楂斿睖姊濊布閻靛怀鑱界兇閵呯当闋湒濉楀湗闋硅浕鑴磿棣遍姗㈢瑗綆鐏ｉ爲钀恫闊嬮仌鍦嶇埐婵扮董钁﹀亯鍍炵矾璎傝婧仦绱嬬┅鍟忕敃鎾捐澑娓︾鍡氶帰鐑忚鐒¤暘鍚冲、闇у嫏瑾ら尗鐘цゲ缈掗姂鎴茬窗铦﹁絼宄戒繝鐙瑰粓閸侀绾栭构璩㈤姕闁戦’闅従鐛荤福椁＄鲸鎲茬窔寤傞懖閯夎┏闊块爡钑姺鏇夊槸锠嶅崝鎸炬敎鑴呰瀵€夎瑵閶呴噥鑸堟炊閺界埂铏涘檽闋堣ū绶掔簩杌掓嚫閬哥櫖绲㈠鍕宠灏嬮Υ瑷撹▕閬滃榇夐川鍟炰簽瑷濋柟鐓欓菇鍤撮闁昏睌鍘’褰ヨ椹楅处妤婃彋鐦嶉櫧鐧㈤妯ｇ懁鎼栧牤閬欑璎犺棩鐖洪爜妤憠閱姤闋ら伜鍎€褰滆熁钘濆剟鎲剁京瑭ｈ瑾艰鐣扮构钄櫚閵€椋叉瀣伴饭鎳夌簱鐟╄灑鐕熺啋锠呯鍠叉搧鍌櫚韪磋婀у劒鎲傞兊閳剧尪閬婅獦杓块瓪婕佸鑸囧都瑾炵辈绂︾崉璀介爯棣礇娣佃絽鍦掑摗鍦撶罚閬犻绱勮簫閼板督绮垫倕闁遍洸閯栧嫽闅曢亱铇婇啚鏆堥熁闆滅伣杓夋敘鏆磰璐撻珤閼挎绔堣铂鎿囧墖婢よ硦璐堢串鍔勮粙閸橀枠瑭愰綃鍌垫皥鐩炴柆杓惧秳妫ф埌缍诲嫉婕插赋璩劰瓒欒焺杞嶉嵑閫欒矠閲濆伒瑷洪幃闄ｆ帣鐫滅寵骞€閯瓑绻旇伔鍩风礄鎽摬骞熻唱閸剧祩绋叓琛嗚瑓杌哥毢鏅濋璞瑾呯嚟鐭氬洃璨憚绡夐灏堢杞夎澈妯佽帄瑁濆澹媭閷愯磪澧滅洞璜勬縼鑼茶硣婕工缍滅附绺遍剴瑭涚祫閼界坊閻橀杭鐐洪毣鍏囨簴鍟熼梿瑁￠潅椁橀崐娲╂閬╂厠鏂�';
}
function Traditionalized(cc){
  var str='',ss=JTPYStr(),tt=FTPYStr();
  for(var i=0;i<cc.length;i++){
    if(cc.charCodeAt(i)>10000&&ss.indexOf(cc.charAt(i))!=-1)str+=tt.charAt(ss.indexOf(cc.charAt(i)));
      else str+=cc.charAt(i);
  }
  return str;
}

function Traditionalizedce(cc){
  var str='',tt=JTPYStr(),ss=FTPYStr();
  for(var i=0;i<cc.length;i++){
    if(cc.charCodeAt(i)>10000&&ss.indexOf(cc.charAt(i))!=-1)str+=tt.charAt(ss.indexOf(cc.charAt(i)));
      else str+=cc.charAt(i);
  }
  return str;
}

function _RequestParamsStr(){
  var strHref = window.document.location.href;
  var intPos = strHref.indexOf('?');
  var strRight = strHref.substr(intPos+1);
  return strRight;
}

function Request(strName){
  var arrTmp = _RequestParamsStr().split("&");
  for(var i=0,len=arrTmp.length; i<len; i++){
    var arrTemp = arrTmp[i].split("=");
    if(arrTemp[0].toUpperCase() == strName.toUpperCase()){
    if(arrTemp[1].indexOf("#")!=-1) arrTemp[1] = arrTemp[1].substr(0, arrTemp[1].indexOf("#"));
      return arrTemp[1];
    }
  }
  return "";
}

function SetCookie(name,value,hours){
  var hourstay = 30*24*60*60*1000; //姝� cookie 灏嗚榛樿淇濆瓨 30 澶�
  if(checkNum(hours)){
    hourstay = hours;
  }
    var exp  = new Date();
    exp.setTime(exp.getTime() + hourstay*60*60*1000);
    document.cookie = name + "="+ escape(value) + ";expires=" + exp.toGMTString();
}
function getCookie(name){
    var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
    if(arr != null) return unescape(arr[2]); return null;
}
function delCookie(name){
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}
function checkNum(nubmer){
    var re = /^[0-9]+.?[0-9]*$/;   //鍒ゆ柇瀛楃涓叉槸鍚︿负鏁板瓧     //鍒ゆ柇姝ｆ暣鏁� /^[1-9]+[0-9]*]*$/
    if (re.test(nubmer))return true;
  return false;
}

DIY_PAGE_SIZE='1200';



$(document).ready(function(){
  /*
  **褰撳墠妯″潡瀵硅薄锛�$("#dh_style_01_1494471060703")
  **鏁堟灉浠呭湪鍙戝竷棰勮涓嬫墠鐢熸晥
  */

})

$(document).ready(function(){
  /*
  **褰撳墠妯″潡瀵硅薄锛�$("#image_style_01_1494471229390")
  **鏁堟灉浠呭湪鍙戝竷棰勮涓嬫墠鐢熸晥
  */

})

$(document).ready(function(){
  /*
  **褰撳墠妯″潡瀵硅薄锛�$("#image_style_01_1494471708303")
  **鏁堟灉浠呭湪鍙戝竷棰勮涓嬫墠鐢熸晥
  */

})

$(document).ready(function(){
  /*
  **褰撳墠妯″潡瀵硅薄锛�$("#image_style_01_1494471714796")
  **鏁堟灉浠呭湪鍙戝竷棰勮涓嬫墠鐢熸晥
  */

})

$(document).ready(function(){
  /*
  **褰撳墠妯″潡瀵硅薄锛�$("#dh_style_01_1494567947626")
  **鏁堟灉浠呭湪鍙戝竷棰勮涓嬫墠鐢熸晥
  */

})




$(document).ready(function(){
  /*
  **褰撳墠妯″潡瀵硅薄锛�$("#dh_style_01_1494465147907")
  **鏁堟灉浠呭湪鍙戝竷棰勮涓嬫墠鐢熸晥
  */

})
var viewsSettings={"comm_layout_header":{"diyShowName":"\u5171\u4eab\u5934\u90e8","css":{"pc":{"height":"137px"},"customCss":{"pc":{"modelArea":{"border-top-color":"#eeb81a","border-top-style":"none","border-top-width":"2px","border-bottom-style":"none","background":"#2C333D"}},"mobile":{"@view_contents":{"margin-left":"0px","margin-right":"0px"}}},"pad":{"height":"137px"},"mobile":{"height":"109px","display":"block","z-index":"8"},"content":{"max-width":"1200px"}},"settingsBox":{"showTitle":"\u5171\u4eab\u5934\u90e8\u8bbe\u7f6e","setList":{"\u6837\u5f0f":{"isDefault":"true","mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}}},"eventSet":{"scrollView":"none","type":"none"},"autoHeight":"false"},"div_includeBlock_1494309835303":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsPro","act":"viewConfig","setupFunc":"SettingBoxListen"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"includeBlock","styleKind":"\u81ea\u7531\u5bb9\u5668","styleHelpId":1249,"viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"1200px","height":"137px","position":"absolute","top":"0px","left":"calc(50% - 600px)"},"pad":{"height":"137px","width":"100%","left":"0%"},"mobile":{"width":"100%","height":"109px","top":"0px","left":"0%"}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668","moveEdit":[],"eventSet":{"scrollView":"none","type":"none"}},"dh_style_01_1494471060703":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsB","act":"dhConfig","setupFunc":"dhSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bfc\u822a\u83dc\u5355\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u5bfc\u822a\u83dc\u5355-\u98ce\u683c1","styleShowName":"\u98ce\u683c1","styleKind":"\u5bfc\u822a\u83dc\u5355","styleHelpId":1257,"viewCtrl":"default","css":{"pc":{"width":"60%","z-index":"999","position":"absolute","top":"93px","left":"20%"},"pad":{"z-index":"999","left":"15.026455026455027%","width":"70%"},"mobile":{"width":"44px","z-index":"999","top":"64px","left":"calc(50% - 22px)","display":"none"},"content":{"overflow":"visible"},"customCss":{"pc":{"@mainMenuSet":{"color":"#ffffff","font-size":"16px","margin-left":"0px","margin-right":"0px","line-height":"37px","height":"40px"},"%hot>a":{"color":"#ffffff","border-top-color":"#ffffff","border-right-color":"#ffffff","border-bottom-color":"#ffffff","border-left-color":"#ffffff","border-top-style":"solid","border-right-style":"solid","border-bottom-style":"solid","border-left-style":"solid","border-top-width":"2px","border-right-width":"2px","border-bottom-width":"2px","border-left-width":"2px","border-top-left-radius":"5px","border-bottom-left-radius":"5px","border-top-right-radius":"5px","border-bottom-right-radius":"5px"},"@mainMenuSet:hover":{"border-top-color":"#ffffff","border-right-color":"#ffffff","border-bottom-color":"#ffffff","border-left-color":"#ffffff","border-top-style":"solid","border-right-style":"solid","border-bottom-style":"solid","border-left-style":"solid","border-top-width":"2px","border-right-width":"2px","border-bottom-width":"2px","border-left-width":"2px","border-top-left-radius":"5px","border-bottom-left-radius":"5px","border-top-right-radius":"5px","border-bottom-right-radius":"5px","line-height":"34px","height":"40px","font-size":"16px","margin-left":"5px","margin-right":"5px"},"%hot>a:hover":{"height":"40px","line-height":"37px","font-size":"16px"}},"mobile":{"@icoMenuSet":{"color":"#ffffff"},"@mainMenuSet":{"margin-left":"-25px","text-align":"center","margin-top":"5px","margin-bottom":"5px"},"%hot>a:hover":{"margin-left":"0px","margin-right":"0px"},"@mainMenuSet:hover":{"margin-top":"0px","margin-left":"0px","margin-right":"0px","margin-bottom":"0px"}}}},"lock":{"height":"true"},"name":"dh","kind":"\u5bfc\u822a\u83dc\u5355","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"}},"text_style_08_1494464791299":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_08","diyShowName":"\u6587\u5b57\u6a21\u5757-Arial Black","styleKind":"\u82f1\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"51%","font-size":"46px","color":"#333","line-height":"50px","font-family":"Arial Black","position":"absolute","top":"0px","left":"24.5%"},"pad":{"left":"27.306468716861083%","width":"45.387062566277834%","top":"0px"},"mobile":{"width":"195px","top":"15px","left":"0%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"30px","color":"#ffffff","margin-top":"0px","margin-bottom":"0px","line-height":"70px","text-align":"center"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"20px","line-height":"30px"}}}},"lock":{"height":"true"},"showEditTip":"Double click to edit text","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"data":{"linkType":"1","selectVal":10669}},"image_style_01_1494471229390":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"2%","height":"32px","position":"absolute","top":"19px","left":"91.58333333333334%"},"pad":{"left":"89.78989925768823%","width":"2.5%","top":"19px"},"mobile":{"width":"6%","height":"31px","top":"17px","left":"77.04769736842105%"},"content":{"overflow":"visible"},"customCss":{"pc":{"@picSet:hover":{"opacity":"0.7"}}}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"\/userimg\/720\/pkgimg\/mbing\/20170511105409276.png","imgStyle":{"pc":"2","pad":"2","mobile":"2"},"linkType":"0","selectVal":10669},"eventSet":{"scrollView":"none","type":"none"},"params":{"filelist":"","urllist":""}},"text_style_02_1494473718646":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"19.666666666666664%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"10px","left":"0%"},"pad":{"left":"2%","width":"20%"},"mobile":{"width":"195px","top":"0px","display":"none"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","color":"#ffffff","font-size":"14px"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"}},"image_style_01_1494471708303":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"2%","height":"32px","position":"absolute","top":"19px","left":"94.66666666666667%"},"pad":{"width":"2.5%","top":"19px","left":"92.93312566277837%"},"mobile":{"width":"6.000000000000001%","height":"31px","top":"17px","left":"84.41611842105263%"},"content":{"overflow":"visible"},"customCss":{"pc":{"@picSet:hover":{"opacity":"0.7"}}}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"\/userimg\/720\/pkgimg\/mbing\/20170511105409951.png","imgStyle":{"pc":"2","pad":"2","mobile":"2"},"linkType":"0","selectVal":10669},"eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"params":{"filelist":"","urllist":""}},"image_style_01_1494471714796":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"2%","height":"32px","position":"absolute","top":"19px","left":"97.75%"},"pad":{"width":"2.5%","top":"19px","left":"96.07635206786851%"},"mobile":{"width":"6.000000000000001%","height":"31px","top":"17px","left":"91.78453947368422%"},"content":{"overflow":"visible"},"customCss":{"pc":{"@picSet:hover":{"opacity":"0.7"}}}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"\/userimg\/720\/pkgimg\/mbing\/20170511105410224.png","imgStyle":{"pc":"2","pad":"2","mobile":"2"},"linkType":"0","selectVal":10669},"eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"params":{"filelist":"","urllist":""}},"dh_style_01_1494567947626":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsB","act":"dhConfig","setupFunc":"dhSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bfc\u822a\u83dc\u5355\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u5bfc\u822a\u83dc\u5355-\u98ce\u683c1","styleShowName":"\u98ce\u683c1","styleKind":"\u5bfc\u822a\u83dc\u5355","styleHelpId":1257,"viewCtrl":"default","css":{"pc":{"width":"66.66666666666666%","z-index":"999","position":"absolute","left":"16.66666666666667%","top":"39.28124237060547px","display":"none"},"pad":{"width":"11.578947368421053%","z-index":"999","top":"39.28124237060547px","left":"44.21052631578947%","display":"none"},"mobile":{"width":"44px","z-index":"999","left":"calc(50% - 22px)","top":"62.27556610107422px","display":"block"},"content":{"overflow":"visible"},"customCss":{"mobile":{"@icoMenuSet":{"color":"#ffffff"},"@mainMenuSet":{"margin-left":"-24px","text-align":"center","margin-top":"2px","margin-bottom":"2px"},"%hot>a":{"border-bottom-color":"#ffffff","border-top-style":"solid","border-right-style":"solid","border-left-style":"solid","border-top-width":"2px","border-right-width":"2px","border-bottom-width":"2px","border-left-width":"2px","border-top-left-radius":"5px","border-bottom-left-radius":"5px","border-top-right-radius":"5px","border-bottom-right-radius":"5px"},"@mainMenuSet:hover":{"border-top-color":"#ffffff","border-right-color":"#ffffff","border-bottom-color":"#ffffff","border-left-color":"#ffffff","border-top-style":"solid","border-right-style":"solid","border-bottom-style":"solid","border-left-style":"solid","border-left-width":"2px","border-bottom-width":"2px","border-right-width":"2px","border-top-width":"2px","border-top-left-radius":"5px","border-bottom-left-radius":"5px","border-bottom-right-radius":"5px","border-top-right-radius":"5px","padding-left":"0px"},"@columnSet:hover":{"padding-top":"0px"}}}},"lock":{"height":"true"},"name":"dh","kind":"\u5bfc\u822a\u83dc\u5355","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"}},"layout_1494491122684":{"diyShowName":"\u533a\u57df\u5e03\u5c40","name":"layout","style":"autoLayout","css":{"content":{"overflow":"visible"},"pad":{"display":"block","height":"1px"},"mobile":{"height":"1px"},"pc":{"height":"1px"}},"settingsBox":{"showTitle":"\u533a\u57df\u5e03\u5c40\u8bbe\u7f6e","setList":{"\u6837\u5f0f":{"isDefault":"true","mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}}},"eventSet":{"scrollView":"none","type":"none"}},"div_blank_1494491123220":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsPro","act":"viewConfig","setupFunc":"SettingBoxListen"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u7a7a\u767d\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"blank","styleKind":"\u7a7a\u767d\u80cc\u666f","styleHelpId":1248,"viewCtrl":"blank","css":{"pc":{"width":"100%","height":"0px","position":"absolute","top":"0px","left":"0%"},"pad":{"left":"0%","width":"100%"},"mobile":{"width":"100%","height":"1px","top":"0px","left":"0%"},"content":{"overflow":"visible"},"customCss":{"pc":{"modelArea":{"box-sizing":"border-box","border-top-style":"solid","border-right-style":"solid","border-bottom-style":"solid","border-left-style":"solid","border-top-color":"#2C333D","border-right-color":"#2C333D","border-bottom-color":"transparent","border-left-color":"#2C333D","border-top-width":"50px","border-right-width":"50px","border-bottom-width":"50px","border-left-width":"50px"}},"pad":{"modelArea":{"box-sizing":"border-box"}},"mobile":{"modelArea":{"box-sizing":"border-box","border-top-width":"25px","border-right-width":"25px","border-bottom-width":"25px","border-left-width":"25px"}}}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u7a7a\u767d\u80cc\u666f","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[]},"layout_1494491136993":{"diyShowName":"\u533a\u57df\u5e03\u5c40","name":"layout","style":"autoLayout","css":{"content":{"overflow":"visible","max-width":"1200px"},"pad":{"height":"900px"},"mobile":{"height":"886px"},"pc":{"height":"846px"}},"settingsBox":{"showTitle":"\u533a\u57df\u5e03\u5c40\u8bbe\u7f6e","setList":{"\u6837\u5f0f":{"isDefault":"true","mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}}},"eventSet":{"scrollView":"none","type":"none"}},"text_style_02_1494491218447":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"39.23647932131495%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"90px","left":"30.381510416666668%"},"pad":{"width":"39.23647932131495%","top":"100px","left":"30.381760339342524%"},"mobile":{"width":"100%","top":"80px","left":"0%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"40px","text-align":"center","line-height":"65px","font-weight":"bold","color":"#2C333D"}},"pad":{"@view_contents":{"box-sizing":"border-box","color":"#2C333D","font-size":"35px","text-align":"center"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"25px","text-align":"center","line-height":"45px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"}},"image_style_01_1494492345193":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"64.08333333333334%","height":"396px","position":"absolute","left":"17.958333333333336%","top":"250px","z-index":"9999"},"pad":{"height":"431px","left":"calc(50% - 409.5px)","top":"250px","width":"819px"},"mobile":{"height":"242px","left":"1.9736842105263157%","top":"195px","width":"96%"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"\/userimg\/720\/pkgimg\/mbing\/center.jpg","imgStyle":{"pc":"2","pad":"2","mobile":"2"}},"eventSet":{"scrollView":"none","type":"none"},"setFixed":"2","params":{"filelist":"","urllist":""}},"text_style_02_1494492405563":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"100%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","left":"0%","top":"668px"},"pad":{"width":"95%","left":"2.4920466595970305%","top":"698.5px"},"mobile":{"width":"96%","top":"457px","left":"1.9983552631578947%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","color":"#2C333D","font-size":"16px","line-height":"30px","text-indent":"2em"}},"pad":{"@view_contents":{"box-sizing":"border-box","font-size":"14px"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"15px","line-height":"30px","color":"#909090"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"params":{"animate":"fadeInUp","duration":"1","delay":"0.25","iteration":"1","offset":"0"}},"text_style_02_1494492629093":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"100%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","left":"0%","top":"756px"},"pad":{"width":"95%","left":"2.5%","top":"780px"},"mobile":{"width":"96%","top":"646px","left":"1.9942434210526316%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","color":"#909090","font-size":"16px","line-height":"30px","text-indent":"2em"}},"pad":{"@view_contents":{"box-sizing":"border-box","font-size":"14px"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"15px","line-height":"30px","color":"#909090"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"params":{"animate":"fadeInUp","duration":"1","delay":"0.25","iteration":"1","offset":"0"}},"homelink_style_01_1494560279623":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"homelinkConfig","setupFunc":"homelinkSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5f53\u524d\u4f4d\u7f6e\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u5f53\u524d\u4f4d\u7f6e-\u98ce\u683c1","styleShowName":"\u98ce\u683c1","styleKind":"\u5f53\u524d\u4f4d\u7f6e","viewCtrl":"default","css":{"pc":{"width":"100%","position":"absolute","top":"50.5px","left":"0%","z-index":2},"mobile":{"width":"85%","top":"25px","left":"7.5%"},"pad":{"width":"90%","left":"4.984093319194061%"}},"lock":{"height":"true"},"name":"homelink","kind":"\u5f53\u524d\u4f4d\u7f6e","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"data":{"icon":"\/editor\/images\/system\/file\/links-6-gray.png","route":"","separator":">"},"moveEdit":[]},"layout_1494492915319":{"css":{"pc":{"height":"50px"},"content":{"overflow":"visible","max-width":"1200px"},"mobile":{"height":"50px"},"pad":{"height":"50px"}},"diyShowName":"\u533a\u57df\u5e03\u5c40","name":"layout","style":"autoLayout"},"div_includeBlock_1494492957552":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsPro","act":"viewConfig","setupFunc":"SettingBoxListen"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"includeBlock","styleKind":"\u81ea\u7531\u5bb9\u5668","styleHelpId":1249,"viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"100%","height":"50px","position":"absolute","left":"0%","top":"0px"},"pad":{"width":"100%","height":"50px","left":"0%","top":"0px"},"mobile":{"width":"100%","height":"50px","top":"0px","left":"0%"}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668","eventSet":{"scrollView":"none","type":"none"}},"layout_1494492966367":{"css":{"pc":{"height":"622px"},"content":{"overflow":"visible","max-width":"1200px"},"mobile":{"height":"800px"},"pad":{"height":"586px"}},"diyShowName":"\u533a\u57df\u5e03\u5c40","name":"layout","style":"autoLayout","settingsBox":{"showTitle":"\u533a\u57df\u5e03\u5c40\u8bbe\u7f6e","setList":{"\u6837\u5f0f":{"isDefault":"true","mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}}},"eventSet":{"scrollView":"none","type":"none"},"autoHeight":"true"},"text_style_02_1494493091260":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"50.24999999999999%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"50px","left":"24.875%"},"pad":[],"mobile":{"width":"100%","top":"0px","left":"0%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","text-align":"center","font-size":"40px","line-height":"65px","height":"140px","font-weight":"bold","color":"#2C333D"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"25px","line-height":"45px","height":"100px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"}},"div_includeBlock_1494493435024":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsPro","act":"viewConfig","setupFunc":"SettingBoxListen"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"includeBlock","styleKind":"\u81ea\u7531\u5bb9\u5668","styleHelpId":1249,"viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"24%","height":"402px","position":"absolute","top":"220px","left":"0%"},"pad":{"height":"366px","top":"220px","left":"1%","width":"24%"},"mobile":{"width":"48%","height":"321px","top":"123px","left":"1%"}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668","eventSet":{"scrollView":"none","type":"none"},"autoHeight":"true","params":{"animate":"fadeInUp","duration":"1","delay":"0.1","iteration":"1","offset":"0"}},"text_style_02_1494493532761":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"96%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"305px","left":"2.083333333333333%"},"pad":{"left":"0%","width":"100%","top":"236px"},"mobile":{"width":"100%","top":"201px","left":"0%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"20px","text-align":"center","color":"#2C333D","font-weight":"normal","line-height":"30px"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"}},"text_style_02_1494493607177":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"100%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"342px","left":"0%"},"pad":{"left":"0%","width":"100%","top":"276px"},"mobile":{"width":"100%","top":"231px","left":"0%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"14px","color":"#909090","line-height":"30px","text-align":"center"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"}},"image_style_03_1494493738237":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_03","diyShowName":"\u56fe\u7247\u2014\u56fe\u6587","styleShowName":"\u98ce\u683c2","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"100%","height":"288px","position":"absolute","top":"0px","left":"0%"},"pad":{"left":"0%","width":"100%","height":"225px"},"mobile":{"width":"100%","height":"181px","top":"0px","left":"0%"},"content":{"overflow":"visible"},"customCss":{"pc":{"@tipsText":{"font-size":"24px"}}}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"\/userimg\/720\/pkgimg\/mbing\/s1.jpg","imgStyle":{"pc":"2","pad":"2","mobile":"2"},"chrAlt":"TCH"},"eventSet":{"scrollView":"none","type":"none"},"params":{"filelist":"","urllist":""}},"div_includeBlock_1494494067092":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsPro","act":"viewConfig","setupFunc":"SettingBoxListen"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"includeBlock","styleKind":"\u81ea\u7531\u5bb9\u5668","styleHelpId":1249,"viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"24%","height":"402px","position":"absolute","top":"220px","left":"25.333333333333336%"},"pad":{"height":"366px","width":"24%","top":"220px","left":"25.5%"},"mobile":{"width":"48%","height":"321px","top":"123px","left":"51%"}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668","eventSet":{"scrollView":"none","type":"none"},"setFixedScroll":{"pc":"2"},"autoHeight":"true","params":{"animate":"fadeInUp","duration":"1","delay":"0.2","iteration":"1","offset":"0"}},"text_style_02_1494494067292":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"96%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"305px","left":"2.083333333333333%"},"pad":{"left":"0%","width":"100%","top":"236px"},"mobile":{"width":"100%","top":"201px","left":"0%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"20px","text-align":"center","color":"#2C333D","font-weight":"normal","line-height":"30px"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"}},"text_style_02_1494494067307":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"100%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"342px","left":"0%"},"pad":{"left":"0%","width":"100%","top":"276px"},"mobile":{"width":"100%","top":"231px","left":"0%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"14px","color":"#909090","line-height":"30px","text-align":"center"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"}},"image_style_03_1494494067311":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_03","diyShowName":"\u56fe\u7247\u2014\u56fe\u6587","styleShowName":"\u98ce\u683c2","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"100%","height":"288px","position":"absolute","top":"0px","left":"0%"},"pad":{"left":"0%","width":"100%","height":"225px"},"mobile":{"width":"100%","height":"181px","top":"0px","left":"0%"},"content":{"overflow":"visible"},"customCss":{"pc":{"@tipsText":{"font-size":"24px"}}}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"\/userimg\/720\/pkgimg\/mbing\/s2.jpg","imgStyle":{"pc":"2","pad":"2","mobile":"2"},"chrAlt":"TCH"},"eventSet":{"scrollView":"none","type":"none"},"params":{"filelist":"","urllist":""}},"div_includeBlock_1494494259435":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsPro","act":"viewConfig","setupFunc":"SettingBoxListen"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"includeBlock","styleKind":"\u81ea\u7531\u5bb9\u5668","styleHelpId":1249,"viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"24%","height":"402px","position":"absolute","top":"220px","left":"50.66666666666667%"},"pad":{"height":"366px","width":"24%","left":"50.3%"},"mobile":{"width":"48%","height":"321px","top":"479px","left":"0.9991776315789473%"}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668","eventSet":{"scrollView":"none","type":"none"},"autoHeight":"true","params":{"animate":"fadeInUp","duration":"1","delay":"0.3","iteration":"1","offset":"0"}},"text_style_02_1494494259617":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"96%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"305px","left":"2.083333333333333%"},"pad":{"left":"0%","width":"100%","top":"236px"},"mobile":{"width":"100%","top":"201px","left":"0%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"20px","text-align":"center","color":"#2C333D","font-weight":"normal","line-height":"30px"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"}},"text_style_02_1494494259632":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"100%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"342px","left":"0%"},"pad":{"left":"0%","width":"100%","top":"276px"},"mobile":{"width":"100%","top":"231px","left":"0%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"14px","color":"#909090","line-height":"30px","text-align":"center"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"}},"image_style_03_1494494259636":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_03","diyShowName":"\u56fe\u7247\u2014\u56fe\u6587","styleShowName":"\u98ce\u683c2","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"100%","height":"288px","position":"absolute","top":"0px","left":"0%"},"pad":{"left":"0%","width":"100%","height":"225px"},"mobile":{"width":"100%","height":"181px","top":"0px","left":"0%"},"content":{"overflow":"visible"},"customCss":{"pc":{"@tipsText":{"font-size":"24px"}}}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"\/userimg\/720\/pkgimg\/mbing\/s3.jpg","imgStyle":{"pc":"2","pad":"2","mobile":"2"},"chrAlt":"TCH"},"eventSet":{"scrollView":"none","type":"none"},"params":{"filelist":"","urllist":""}},"div_includeBlock_1494494340740":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsPro","act":"viewConfig","setupFunc":"SettingBoxListen"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"includeBlock","styleKind":"\u81ea\u7531\u5bb9\u5668","styleHelpId":1249,"viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"24%","height":"402px","position":"absolute","top":"220px","left":"76%"},"pad":{"height":"366px","width":"24%","left":"75%"},"mobile":{"width":"48%","height":"321px","top":"479px","left":"50.73601973684211%"}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668","eventSet":{"scrollView":"none","type":"none"},"autoHeight":"true","params":{"animate":"fadeInUp","duration":"1","delay":"0.4","iteration":"1","offset":"0"}},"text_style_02_1494494340908":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"96%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"305px","left":"2.083333333333333%"},"pad":{"left":"0%","width":"100%","top":"236px"},"mobile":{"width":"100%","top":"201px","left":"0%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"20px","text-align":"center","color":"#2C333D","font-weight":"normal","line-height":"30px"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"}},"text_style_02_1494494340922":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"100%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"342px","left":"0%"},"pad":{"left":"0%","width":"100%","top":"276px"},"mobile":{"width":"100%","top":"231px","left":"0%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"14px","color":"#909090","line-height":"30px","text-align":"center"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"}},"image_style_03_1494494340927":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_03","diyShowName":"\u56fe\u7247\u2014\u56fe\u6587","styleShowName":"\u98ce\u683c2","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"100%","height":"288px","position":"absolute","top":"0px","left":"0%"},"pad":{"left":"0%","width":"100%","height":"225px"},"mobile":{"width":"100%","height":"181px","top":"0px","left":"0%"},"content":{"overflow":"visible"},"customCss":{"pc":{"@tipsText":{"font-size":"24px"}}}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"\/userimg\/720\/pkgimg\/mbing\/s4.jpg","imgStyle":{"pc":"2","pad":"2","mobile":"2"},"chrAlt":"TCH"},"eventSet":{"scrollView":"none","type":"none"},"params":{"filelist":"","urllist":""}},"layout_1494494526998":{"css":{"pc":{"height":"50px"},"content":{"overflow":"visible","max-width":"1200px"},"pad":{"height":"50px"},"mobile":{"height":"50px"}},"diyShowName":"\u533a\u57df\u5e03\u5c40","name":"layout","style":"autoLayout"},"div_includeBlock_1494494532182":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsPro","act":"viewConfig","setupFunc":"SettingBoxListen"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"includeBlock","styleKind":"\u81ea\u7531\u5bb9\u5668","styleHelpId":1249,"viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"100%","height":"50px","position":"absolute","top":"0px","left":"0%"},"pad":{"width":"100%","height":"50px","top":"0px","left":"0%"},"mobile":{"width":"100%","height":"50px","top":"0px","left":"0%"}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668","eventSet":{"scrollView":"none","type":"none"}},"comm_layout_footer":{"diyShowName":"\u5171\u4eab\u5e95\u90e8","css":{"pc":{"height":"495px","display":"block"},"customCss":{"pc":{"modelArea":[]}},"mobile":{"height":"339px","display":"block"},"pad":{"height":"437px","display":"block"},"content":[]},"settingsBox":{"showTitle":"\u5171\u4eab\u5e95\u90e8\u8bbe\u7f6e","setList":{"\u6837\u5f0f":{"isDefault":"true","mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}}},"eventSet":{"scrollView":"none","type":"none"},"autoHeight":"false"},"div_includeBlock_1494465147349":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsPro","act":"viewConfig","setupFunc":"SettingBoxListen"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"includeBlock","styleKind":"\u81ea\u7531\u5bb9\u5668","viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"100%","height":"495px","position":"absolute","top":"0px","left":"0%"},"pad":{"height":"437px"},"mobile":{"width":"100%","height":"339px","top":"0px","left":"0%"},"customCss":{"pc":{"modelArea":{"background":" url(\/sysTools\/Model\/views\/footer\/z_14\/v9Res\/d679842110890e6adc3a5b6d47e9ebbc.jpg)","background-repeat":"no-repeat","background-size":"cover","background-position-x":"50%","background-position-y":"50%"}}}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668","eventSet":{"scrollView":"none","type":"none"},"autoHeight":"true"},"div_includeBlock_1494465147519":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsPro","act":"viewConfig","setupFunc":"SettingBoxListen"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"includeBlock","styleKind":"\u81ea\u7531\u5bb9\u5668","viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"1200px","height":"410px","position":"absolute","top":"85px","left":"calc(50% - 600px)"},"pad":{"height":"279.5px","width":"96%","left":"2%","top":"46px"},"mobile":{"width":"96.00000000000001%","height":"275px","top":"15px","left":"1.999999999999993%","display":"block"}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668","eventSet":{"scrollView":"none","type":"none"}},"text_style_02_1494465147762":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u5b57\u4f53","viewCtrl":"default","css":{"pc":{"width":"17.25%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"9.5px","left":"0.33333333333333337%"},"mobile":{"width":"45.75342465753425%","top":"20px","left":"1.3157894736842124%","display":"block"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"16px","line-height":"30px","color":"#b5c0af","text-align":"left"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"14px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u57fa\u7840\u6a21\u5757","showname":"\u6587\u5b57\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"}},"text_style_02_1494465147772":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u5b57\u4f53","viewCtrl":"default","css":{"pc":{"width":"18.583333333333332%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"53px","left":"0.33333333333333337%"},"mobile":{"width":"50.68493150684932%","top":"50px","left":"1.0702054794520548%","display":"block"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"14px","line-height":"23px","color":"#b5c0af","text-align":"left"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"12px"}}},"pad":{"width":"219px"}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u57fa\u7840\u6a21\u5757","showname":"\u6587\u5b57\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"}},"text_style_02_1494465147778":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u5b57\u4f53","viewCtrl":"default","css":{"pc":{"width":"13.3%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"159.5px","left":"86.66666666666667%"},"mobile":{"width":"41.64383561643836%","top":"159px","left":"58.35616438356165%","display":"block"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"14px","line-height":"23px","color":"#b5c0af","text-align":"center"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box","text-align":"right"}}},"pad":{"width":"147px","left":"83.75690607734806%","top":"180.5px"}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u57fa\u7840\u6a21\u5757","showname":"\u6587\u5b57\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"}},"image_style_01_1494465147784":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","viewCtrl":"default","css":{"pc":{"width":"12.5%","height":"99px","position":"absolute","top":"47px","left":"86.80859375%"},"pad":{"left":"83.88466850828729%","width":"14.806629834254142%","top":"57.5px","height":"109px"},"mobile":{"width":"112px","height":"110px","top":"29px","left":"69.25941780821918%"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"\/userimg\/720\/pkgimg\/mbing\/erweima.png","imgStyle":{"pc":"3","pad":"3","mobile":"3"}},"eventSet":{"scrollView":"none","type":"none"},"params":{"filelist":"","urllist":""}},"image_style_01_1494465147789":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":"1254","viewCtrl":"default","css":{"pc":{"width":"2.5%","height":"34px","position":"absolute","top":"11.5px","left":"28.260416666666664%"},"pad":{"left":"29.633977900552487%","top":"36.5px"},"mobile":{"width":"57.392102846648285%","height":"200px","top":"0px","left":"21.303948576675857%","display":"none"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"\/sysTools\/Model\/views\/footer\/z_14\/v9Res\/d35dee9b76bdf29aad1b182191a48cbc.png","imgStyle":{"pc":"3","pad":"3","mobile":"null"}},"eventSet":{"scrollView":"none","type":"none"},"params":{"filelist":"","urllist":""}},"text_style_02_1494465147795":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u5b57\u4f53","viewCtrl":"default","css":{"pc":{"width":"12.833333333333332%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"71px","left":"31.899739583333332%"},"mobile":{"width":"97.36842105263158%","top":"700px","left":"1.3157894736842124%","display":"none"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"14px","line-height":"30px","color":"#b5c0af","text-align":"left"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box"}}},"pad":{"left":"34.178176795580114%","top":"97px"}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u57fa\u7840\u6a21\u5757","showname":"\u6587\u5b57\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"}},"text_style_02_1494465147801":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u5b57\u4f53","viewCtrl":"default","css":{"pc":{"width":"12.25%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"12.5px","left":"31.899739583333332%"},"mobile":{"width":"97.36842105263158%","top":"200px","left":"1.3157894736842124%","display":"none"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"14px","line-height":"30px","color":"#b5c0af","text-align":"left"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box"}}},"pad":{"left":"34.21270718232044%","top":"41.5px"}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u57fa\u7840\u6a21\u5757","showname":"\u6587\u5b57\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"}},"image_style_01_1494465147805":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":"1254","viewCtrl":"default","css":{"pc":{"width":"2.9166666666666665%","height":"34px","position":"absolute","top":"69px","left":"28.052083333333332%"},"pad":{"width":"34px","left":"29.064226519337016%","top":"97px","height":"30px"},"mobile":{"width":"59.78344046525862%","height":"200px","top":"434px","left":"20.10827976737069%","display":"none"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"\/sysTools\/Model\/views\/footer\/z_14\/v9Res\/54f708d657bdb3905742b1ed96d00547.png","imgStyle":{"pc":"3","pad":"3","mobile":"null"}},"eventSet":{"scrollView":"none","type":"none"},"params":{"filelist":"","urllist":""}},"image_style_01_1494465147810":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":"1254","viewCtrl":"default","css":{"pc":{"width":"3.4166666666666665%","height":"34px","position":"absolute","top":"127.5px","left":"27.802083333333332%"},"pad":{"width":"37px","left":"28.88294198895028%","top":"149.5px","height":"32px"},"mobile":{"width":"62.274417151311056%","height":"200px","top":"934px","left":"18.862791424344472%","display":"none"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"\/sysTools\/Model\/views\/footer\/z_14\/v9Res\/06bcd5986593040238047b62875f97f6.png","imgStyle":{"pc":"3","pad":"3","mobile":"null"}},"eventSet":{"scrollView":"none","type":"none"},"params":{"filelist":"","urllist":""}},"text_style_02_1494465147820":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u5b57\u4f53","viewCtrl":"default","css":{"pc":{"width":"12.833333333333332%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"129.5px","left":"31.899739583333332%"},"mobile":{"width":"97.36842105263158%","top":"1200px","left":"1.3157894736842124%","display":"none"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"14px","line-height":"30px","color":"#b5c0af","text-align":"left"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box"}}},"pad":{"left":"34.19544198895028%","top":"149.5px"}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u57fa\u7840\u6a21\u5757","showname":"\u6587\u5b57\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"}},"image_style_01_1494465147825":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":"1254","viewCtrl":"default","css":{"pc":{"width":"4%","height":"34px","position":"absolute","top":"186px","left":"27.510416666666664%"},"pad":{"left":"29.14191988950276%","top":"202px","height":"32px"},"mobile":{"width":"64.86918453261566%","height":"200px","top":"1434px","left":"17.56540773369217%","display":"none"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"\/sysTools\/Model\/views\/footer\/z_14\/v9Res\/931cb43ed2f77db5d722190883945f21.png","imgStyle":{"pc":"3","pad":"3","mobile":"null"}},"eventSet":{"scrollView":"none","type":"none"},"params":{"filelist":"","urllist":""}},"text_style_02_1494465147829":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u5b57\u4f53","viewCtrl":"default","css":{"pc":{"width":"18%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"188px","left":"31.899739583333332%"},"mobile":{"width":"97.36842105263158%","top":"1700px","left":"1.3157894736842124%","display":"none"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"14px","line-height":"30px","color":"#b5c0af","text-align":"left"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box"}}},"pad":{"left":"34.05904696132597%","top":"203px","width":"200px"}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u57fa\u7840\u6a21\u5757","showname":"\u6587\u5b57\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"}},"image_style_04_1494465147834":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"photoConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_04","diyShowName":"\u56fe\u7247\u2014\u76f8\u518c","styleShowName":"\u98ce\u683c4","styleKind":"\u56fe\u7247\u7ec4","viewCtrl":"photo","css":{"pc":{"width":"23.583333333333336%","position":"absolute","top":"20px","left":"56.225260416666664%"},"pad":{"left":"60.57320441988951%","width":"19.226519337016573%","top":"9.5px"},"mobile":{"width":"300px","top":"0px","display":"none"},"content":{"overflow":"visible"}},"lock":{"height":"true"},"doubleClickFunc":"photoGroupSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"photoGroupSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"data":{"prodnum":"6","prodhnumpc":"3","prodhnum":"2","prodhnumpad":"2","prodznumpad":"3","prodznum":"3"},"params":{"filelist":"\/sysTools\/Model\/views\/footer\/z_14\/v9Res\/e977d0acf5c4d868990efbe57ae44496.jpg,\/sysTools\/Model\/views\/footer\/z_14\/v9Res\/a2d4e87c472f5c88fd421a7f369628a8.jpg,\/sysTools\/Model\/views\/footer\/z_14\/v9Res\/83cddac62721047349c86665379c4574.jpg,\/sysTools\/Model\/views\/footer\/z_14\/v9Res\/af23b2444a48b9120507ecbaf14cf25b.jpg,\/sysTools\/Model\/views\/footer\/z_14\/v9Res\/07211fa322a61078c909c32a33863952.jpg,\/sysTools\/Model\/views\/footer\/z_14\/v9Res\/2df98439aba644b8ce14fcdf90a8ff6a.jpg,","textlist":",,,,,,","urllist":",,,,,,"}},"div_includeBlock_1494465147528":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsPro","act":"viewConfig","setupFunc":"SettingBoxListen"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"includeBlock","styleKind":"\u81ea\u7531\u5bb9\u5668","viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"1200px","height":"115px","position":"absolute","top":"352px","left":"calc(50% - 600px)"},"pad":{"width":"96%","left":"2%","top":"340px","height":"97px"},"mobile":{"width":"96.00000000000001%","height":"90px","top":"249px","left":"1.999999999999993%"}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668","eventSet":{"scrollView":"none","type":"none"}},"text_style_02_1494465147898":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u5b57\u4f53","viewCtrl":"default","css":{"pc":{"width":"50%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"19px","left":"0%"},"mobile":{"width":"100%","top":"10px","left":"0%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"14px","line-height":"40px","color":"#c4c4c4","text-align":"left","border-top-color":"#4d4d4d","border-top-style":"none","border-top-width":"1px","padding-top":"0px"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box","color":"#c4c4c4","text-align":"center"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u57fa\u7840\u6a21\u5757","showname":"\u6587\u5b57\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"}},"dh_style_01_1494465147907":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsB","act":"dhConfig","setupFunc":"dhSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bfc\u822a\u83dc\u5355\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u5bfc\u822a\u83dc\u5355-\u98ce\u683c1","styleShowName":"\u98ce\u683c1","styleKind":"\u5bfc\u822a\u83dc\u5355","viewCtrl":"default","css":{"pc":{"width":"42.833333333333336%","z-index":"999","position":"absolute","top":"29px","left":"57.166666666666664%"},"pad":{"z-index":"999"},"mobile":{"width":"12.121212121212121%","z-index":"999","top":"300px","left":"43.93939393939394%","display":"none"},"content":{"overflow":"visible"},"customCss":{"pc":{"@mainMenuSet":{"color":"#c4c4c4","font-size":"14px","border-right-style":"solid","border-right-width":"2px","line-height":"20px","height":"20px"},"%hot>a":{"color":"#c4c4c4","font-size":"14px","border-right-color":"#c4c4c4"}}}},"lock":{"height":"true"},"name":"dh","kind":"\u5bfc\u822a\u83dc\u5355","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"}}}
