$(function(){
  imgLazyloadLib();
  //代码创建一个遮罩层，用于做加载动画
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
    //滚动到顶部
    //$("html").getNiceScroll().resize();
    //$("html").getNiceScroll(0).doScrollTop(0);
    $("html,body").stop().animate({scrollTop:"0px"},window.scrollTime);
  });
  $(".ev_c_scrollView").click(function(){
    //鼠标点击：滚动到模块位置
    var settings=settingsLib($(this));
    var viewid=settings.getSetting('eventSet.scrollView');
    if($("#"+viewid).length>0){
      //$("html").getNiceScroll().resize();
      //$("html").getNiceScroll(0).doScrollTop($("#"+viewid).offset().top);
      $("html,body").stop().animate({scrollTop:$("#"+viewid).offset().top+"px"},window.scrollTime);
    }
  });
  $(".ev_c_showView").click(function(){
    //鼠标点击：显示模块
    showEventView($(this));
  });
  $(".ev_c_hidView").click(function(){
    //鼠标点击：隐藏模块
    hidEventView($(this));
  });
  $(".ev_c_tabView").click(function(){
    //鼠标点击：显示与隐藏模块
    showHidEventView($(this));
  });
  $(".ev_m_tabView").hover(function(){
    //鼠标点击：显示与隐藏模块
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
  //获取重复值
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
  //隐藏
  if(hidViews.length>0){
    for(key in hidViews){
      if($.inArray(hidViews[key],doubleKey)<0){
        $("#"+hidViews[key]).css({"display":"none"});
        diyAutoHeight($("#"+hidViews[key]));
      }
    }
  }
  //显示
  if(showViews.length>0){
    for(key in showViews){
      if($.inArray(showViews[key],doubleKey)<0){
        $("#"+showViews[key]).css({"display":"block"});
        diyAutoHeight($("#"+showViews[key]));
      }
    }
  }
  //双向显示
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
    //针对选项卡做特殊处理
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
    //开启了允许自动高度
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
    var currentlang_Obj= document.getElementById("currentlang");//当前语言
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
            currentlang_Obj.innerHTML = "简体中文";
            break;
          case "tw":
            BodyIsFt= 1;
            delCookie(JF_cn);
            SetCookie(JF_cn, 1, 7);
            currentlang_Obj.innerHTML = "繁體中文"; //因为是繁体 你写简体也会被转化成繁体  所以这儿只能写繁体 2015-1-16
            break;
          default:
            if (typeof Default_isFT!='undefined' && Default_isFT){ //如果默认繁体
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
//导航公共监听函数
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
//-------------选项卡-----------------------------------------------
//鼠标左右拖拽事件
function setScroll_Choice(tabId){
  if(navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)) return;
  if(typeof($(".tab_nav .tab_scroll", $("#"+tabId)).niceScroll)=="function"){
    $(".tab_nav .tab_scroll", $("#"+tabId)).niceScroll({zIndex:99999,cursoropacitymax:0,cursoropacitymin:0,horizrailenabled:true,autohidemode:true,touchbehavior:true});
  }else{
    setTimeout(setScroll_Choice,500);
  }
}

/*鼠标悬浮效果*/
function setHover_Choice(tabId){
  $(".tab_nav .tab_li", $("#"+tabId)).unbind('hover');
  $(".tab_nav .tab_li", $("#"+tabId)).hover(function(){
    var index = $(this).index();
    $(this).addClass("tabCurItem").siblings().removeClass("tabCurItem");
    $(".tab_box .tab_div", $("#"+tabId)).eq(index).addClass("niceTabShow").siblings().removeClass("niceTabShow");
    diyAutoHeight($("#"+tabId.substr(4)));
  });
}
/*鼠标点击效果*/
function setClick_Choice(tabId){
  $(".tab_nav .tab_li", $("#"+tabId)).unbind('click');
  $(".tab_nav .tab_li", $("#"+tabId)).click(function(){
    var index = $(this).index();
    $(this).addClass("tabCurItem").siblings().removeClass("tabCurItem");
    $(".tab_box .tab_div", $("#"+tabId)).eq(index).addClass("niceTabShow").siblings().removeClass("niceTabShow");
    diyAutoHeight($("#"+tabId.substr(4)));
  });
}
/*自动播放*/
function setAnimat_int(tabId,time){
  if(!time)time=5;
  time=time*1000;
  var viewid=tabId.substr(4);

  if(!window.tabConfigAnimat)window.tabConfigAnimat={};
  //初始化
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
//获取鼠标拖拽区域的总宽度
function tab_style03_init(tabId){
  var total=0;
  var obj=$(".tab_li", $("#"+tabId));
  $(".tab_li", $("#"+tabId)).each(function(){
    total+=$(this).width();
  });
  $(".tab_ul_top", $("#"+tabId)).css("width",total+"px");
  $(".tab_ul_bottom", $("#"+tabId)).css("width",total+"px");

  //向左滚动图标事件
  $(".tab_left_arrow", $("#"+tabId)).unbind('click');
  $(".tab_left_arrow", $("#"+tabId)).click(function(){
    var index = $(".tab_nav .tabCurItem", $("#"+tabId)).index();
    index = index-1;
    $(".tab_nav .tab_li", $("#"+tabId)).eq(index).addClass("tabCurItem").siblings().removeClass("tabCurItem");
    $(".tab_box .tab_div", $("#"+tabId)).eq(index).addClass("niceTabShow").siblings().removeClass("niceTabShow");
  });

  //向右滚动图标事件
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
    if(!based_Obj2) { //简繁
      based_Obj.innerHTML = BodyIsFt==1? "简体中文":"繁体中文";
    }else{ //简繁英
      based_Obj.innerHTML = "繁体中文";
      based_Obj2.innerHTML = "简体中文";
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
    if(!based_Obj2) { //简繁
      based_Obj.innerHTML = BodyIsFt==1? "简体中文":"繁体中文";
    }else{ //简繁英
      based_Obj.innerHTML = "繁体中文";
      based_Obj2.innerHTML = "简体中文";
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
  return '皑蔼碍爱翱袄奥坝罢摆败颁办绊帮绑镑谤剥饱宝报鲍辈贝钡狈备惫绷笔毕毙闭边编贬变辩辫鳖瘪濒滨宾摈饼拨钵铂驳卜补参蚕残惭惨灿苍舱仓沧厕侧册测层诧搀掺蝉馋谗缠铲产阐颤场尝长偿肠厂畅钞车彻尘陈衬撑称惩诚骋痴迟驰耻齿炽冲虫宠畴踌筹绸丑橱厨锄雏础储触处传疮闯创锤纯绰辞词赐聪葱囱从丛凑窜错达带贷担单郸掸胆惮诞弹当挡党荡档捣岛祷导盗灯邓敌涤递缔点垫电淀钓调迭谍叠钉顶锭订东动栋冻斗犊独读赌镀锻断缎兑队对吨顿钝夺鹅额讹恶饿儿尔饵贰发罚阀珐矾钒烦范贩饭访纺飞废费纷坟奋愤粪丰枫锋风疯冯缝讽凤肤辐抚辅赋复负讣妇缚该钙盖干赶秆赣冈刚钢纲岗皋镐搁鸽阁铬个给龚宫巩贡钩沟构购够蛊顾剐关观馆惯贯广规硅归龟闺轨诡柜贵刽辊滚锅国过骇韩汉阂鹤贺横轰鸿红后壶护沪户哗华画划话怀坏欢环还缓换唤痪焕涣黄谎挥辉毁贿秽会烩汇讳诲绘荤浑伙获货祸击机积饥讥鸡绩缉极辑级挤几蓟剂济计记际继纪夹荚颊贾钾价驾歼监坚笺间艰缄茧检碱硷拣捡简俭减荐槛鉴践贱见键舰剑饯渐溅涧浆蒋桨奖讲酱胶浇骄娇搅铰矫侥脚饺缴绞轿较秸阶节茎惊经颈静镜径痉竞净纠厩旧驹举据锯惧剧鹃绢杰洁结诫届紧锦仅谨进晋烬尽劲荆觉决诀绝钧军骏开凯颗壳课垦恳抠库裤夸块侩宽矿旷况亏岿窥馈溃扩阔蜡腊莱来赖蓝栏拦篮阑兰澜谰揽览懒缆烂滥捞劳涝乐镭垒类泪篱离里鲤礼丽厉励砾历沥隶俩联莲连镰怜涟帘敛脸链恋炼练粮凉两辆谅疗辽镣猎临邻鳞凛赁龄铃凌灵岭领馏刘龙聋咙笼垄拢陇楼娄搂篓芦卢颅庐炉掳卤虏鲁赂禄录陆驴吕铝侣屡缕虑滤绿峦挛孪滦乱抡轮伦仑沦纶论萝罗逻锣箩骡骆络妈玛码蚂马骂吗买麦卖迈脉瞒馒蛮满谩猫锚铆贸么霉没镁门闷们锰梦谜弥觅绵缅庙灭悯闽鸣铭谬谋亩钠纳难挠脑恼闹馁腻撵捻酿鸟聂啮镊镍柠狞宁拧泞钮纽脓浓农疟诺欧鸥殴呕沤盘庞国爱赔喷鹏骗飘频贫苹凭评泼颇扑铺朴谱脐齐骑岂启气弃讫牵扦钎铅迁签谦钱钳潜浅谴堑枪呛墙蔷强抢锹桥乔侨翘窍窃钦亲轻氢倾顷请庆琼穷趋区躯驱龋颧权劝却鹊让饶扰绕热韧认纫荣绒软锐闰润洒萨鳃赛伞丧骚扫涩杀纱筛晒闪陕赡缮伤赏烧绍赊摄慑设绅审婶肾渗声绳胜圣师狮湿诗尸时蚀实识驶势释饰视试寿兽枢输书赎属术树竖数帅双谁税顺说硕烁丝饲耸怂颂讼诵擞苏诉肃虽绥岁孙损笋缩琐锁獭挞抬摊贪瘫滩坛谭谈叹汤烫涛绦腾誊锑题体屉条贴铁厅听烃铜统头图涂团颓蜕脱鸵驮驼椭洼袜弯湾顽万网韦违围为潍维苇伟伪纬谓卫温闻纹稳问瓮挝蜗涡窝呜钨乌诬无芜吴坞雾务误锡牺袭习铣戏细虾辖峡侠狭厦锨鲜纤咸贤衔闲显险现献县馅羡宪线厢镶乡详响项萧销晓啸蝎协挟携胁谐写泻谢锌衅兴汹锈绣虚嘘须许绪续轩悬选癣绚学勋询寻驯训讯逊压鸦鸭哑亚讶阉烟盐严颜阎艳厌砚彦谚验鸯杨扬疡阳痒养样瑶摇尧遥窑谣药爷页业叶医铱颐遗仪彝蚁艺亿忆义诣议谊译异绎荫阴银饮樱婴鹰应缨莹萤营荧蝇颖哟拥佣痈踊咏涌优忧邮铀犹游诱舆鱼渔娱与屿语吁御狱誉预驭鸳渊辕园员圆缘远愿约跃钥岳粤悦阅云郧匀陨运蕴酝晕韵杂灾载攒暂赞赃脏凿枣灶责择则泽贼赠扎札轧铡闸诈斋债毡盏斩辗崭栈战绽张涨帐账胀赵蛰辙锗这贞针侦诊镇阵挣睁狰帧郑证织职执纸挚掷帜质钟终种肿众诌轴皱昼骤猪诸诛烛瞩嘱贮铸筑驻专砖转赚桩庄装妆壮状锥赘坠缀谆浊兹资渍踪综总纵邹诅组钻致钟么为只凶准启板里雳余链泄标适态于';
}
function FTPYStr(){
  return '皚藹礙愛翺襖奧壩罷擺敗頒辦絆幫綁鎊謗剝飽寶報鮑輩貝鋇狽備憊繃筆畢斃閉邊編貶變辯辮鼈癟瀕濱賓擯餅撥缽鉑駁蔔補參蠶殘慚慘燦蒼艙倉滄廁側冊測層詫攙摻蟬饞讒纏鏟産闡顫場嘗長償腸廠暢鈔車徹塵陳襯撐稱懲誠騁癡遲馳恥齒熾沖蟲寵疇躊籌綢醜櫥廚鋤雛礎儲觸處傳瘡闖創錘純綽辭詞賜聰蔥囪從叢湊竄錯達帶貸擔單鄲撣膽憚誕彈當擋黨蕩檔搗島禱導盜燈鄧敵滌遞締點墊電澱釣調叠諜疊釘頂錠訂東動棟凍鬥犢獨讀賭鍍鍛斷緞兌隊對噸頓鈍奪鵝額訛惡餓兒爾餌貳發罰閥琺礬釩煩範販飯訪紡飛廢費紛墳奮憤糞豐楓鋒風瘋馮縫諷鳳膚輻撫輔賦複負訃婦縛該鈣蓋幹趕稈贛岡剛鋼綱崗臯鎬擱鴿閣鉻個給龔宮鞏貢鈎溝構購夠蠱顧剮關觀館慣貫廣規矽歸龜閨軌詭櫃貴劊輥滾鍋國過駭韓漢閡鶴賀橫轟鴻紅後壺護滬戶嘩華畫劃話懷壞歡環還緩換喚瘓煥渙黃謊揮輝毀賄穢會燴彙諱誨繪葷渾夥獲貨禍擊機積饑譏雞績緝極輯級擠幾薊劑濟計記際繼紀夾莢頰賈鉀價駕殲監堅箋間艱緘繭檢堿鹼揀撿簡儉減薦檻鑒踐賤見鍵艦劍餞漸濺澗漿蔣槳獎講醬膠澆驕嬌攪鉸矯僥腳餃繳絞轎較稭階節莖驚經頸靜鏡徑痙競淨糾廄舊駒舉據鋸懼劇鵑絹傑潔結誡屆緊錦僅謹進晉燼盡勁荊覺決訣絕鈞軍駿開凱顆殼課墾懇摳庫褲誇塊儈寬礦曠況虧巋窺饋潰擴闊蠟臘萊來賴藍欄攔籃闌蘭瀾讕攬覽懶纜爛濫撈勞澇樂鐳壘類淚籬離裏鯉禮麗厲勵礫曆瀝隸倆聯蓮連鐮憐漣簾斂臉鏈戀煉練糧涼兩輛諒療遼鐐獵臨鄰鱗凜賃齡鈴淩靈嶺領餾劉龍聾嚨籠壟攏隴樓婁摟簍蘆盧顱廬爐擄鹵虜魯賂祿錄陸驢呂鋁侶屢縷慮濾綠巒攣孿灤亂掄輪倫侖淪綸論蘿羅邏鑼籮騾駱絡媽瑪碼螞馬罵嗎買麥賣邁脈瞞饅蠻滿謾貓錨鉚貿麽黴沒鎂門悶們錳夢謎彌覓綿緬廟滅憫閩鳴銘謬謀畝鈉納難撓腦惱鬧餒膩攆撚釀鳥聶齧鑷鎳檸獰甯擰濘鈕紐膿濃農瘧諾歐鷗毆嘔漚盤龐國愛賠噴鵬騙飄頻貧蘋憑評潑頗撲鋪樸譜臍齊騎豈啓氣棄訖牽扡釺鉛遷簽謙錢鉗潛淺譴塹槍嗆牆薔強搶鍬橋喬僑翹竅竊欽親輕氫傾頃請慶瓊窮趨區軀驅齲顴權勸卻鵲讓饒擾繞熱韌認紉榮絨軟銳閏潤灑薩鰓賽傘喪騷掃澀殺紗篩曬閃陝贍繕傷賞燒紹賒攝懾設紳審嬸腎滲聲繩勝聖師獅濕詩屍時蝕實識駛勢釋飾視試壽獸樞輸書贖屬術樹豎數帥雙誰稅順說碩爍絲飼聳慫頌訟誦擻蘇訴肅雖綏歲孫損筍縮瑣鎖獺撻擡攤貪癱灘壇譚談歎湯燙濤縧騰謄銻題體屜條貼鐵廳聽烴銅統頭圖塗團頹蛻脫鴕馱駝橢窪襪彎灣頑萬網韋違圍爲濰維葦偉僞緯謂衛溫聞紋穩問甕撾蝸渦窩嗚鎢烏誣無蕪吳塢霧務誤錫犧襲習銑戲細蝦轄峽俠狹廈鍁鮮纖鹹賢銜閑顯險現獻縣餡羨憲線廂鑲鄉詳響項蕭銷曉嘯蠍協挾攜脅諧寫瀉謝鋅釁興洶鏽繡虛噓須許緒續軒懸選癬絢學勳詢尋馴訓訊遜壓鴉鴨啞亞訝閹煙鹽嚴顔閻豔厭硯彥諺驗鴦楊揚瘍陽癢養樣瑤搖堯遙窯謠藥爺頁業葉醫銥頤遺儀彜蟻藝億憶義詣議誼譯異繹蔭陰銀飲櫻嬰鷹應纓瑩螢營熒蠅穎喲擁傭癰踴詠湧優憂郵鈾猶遊誘輿魚漁娛與嶼語籲禦獄譽預馭鴛淵轅園員圓緣遠願約躍鑰嶽粵悅閱雲鄖勻隕運蘊醞暈韻雜災載攢暫贊贓髒鑿棗竈責擇則澤賊贈紮劄軋鍘閘詐齋債氈盞斬輾嶄棧戰綻張漲帳賬脹趙蟄轍鍺這貞針偵診鎮陣掙睜猙幀鄭證織職執紙摯擲幟質鍾終種腫衆謅軸皺晝驟豬諸誅燭矚囑貯鑄築駐專磚轉賺樁莊裝妝壯狀錐贅墜綴諄濁茲資漬蹤綜總縱鄒詛組鑽緻鐘麼為隻兇準啟闆裡靂餘鍊洩標適態於';
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
  var hourstay = 30*24*60*60*1000; //此 cookie 将被默认保存 30 天
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
    var re = /^[0-9]+.?[0-9]*$/;   //判断字符串是否为数字     //判断正整数 /^[1-9]+[0-9]*]*$/
    if (re.test(nubmer))return true;
  return false;
}

DIY_PAGE_SIZE='1200';



$(document).ready(function(){
  /*
  **当前模块对象：$("#dh_style_01_1494471060703")
  **效果仅在发布预览下才生效
  */

})

$(document).ready(function(){
  /*
  **当前模块对象：$("#image_style_01_1494471229390")
  **效果仅在发布预览下才生效
  */

})

$(document).ready(function(){
  /*
  **当前模块对象：$("#image_style_01_1494471708303")
  **效果仅在发布预览下才生效
  */

})

$(document).ready(function(){
  /*
  **当前模块对象：$("#image_style_01_1494471714796")
  **效果仅在发布预览下才生效
  */

})

$(document).ready(function(){
  /*
  **当前模块对象：$("#dh_style_01_1494567947626")
  **效果仅在发布预览下才生效
  */

})




$(document).ready(function(){
  /*
  **当前模块对象：$("#dh_style_01_1494465147907")
  **效果仅在发布预览下才生效
  */

})
var viewsSettings={"comm_layout_header":{"diyShowName":"\u5171\u4eab\u5934\u90e8","css":{"pc":{"height":"137px"},"customCss":{"pc":{"modelArea":{"border-top-color":"#eeb81a","border-top-style":"none","border-top-width":"2px","border-bottom-style":"none","background":"#2C333D"}},"mobile":{"@view_contents":{"margin-left":"0px","margin-right":"0px"}}},"pad":{"height":"137px"},"mobile":{"height":"109px","display":"block","z-index":"8"},"content":{"max-width":"1200px"}},"settingsBox":{"showTitle":"\u5171\u4eab\u5934\u90e8\u8bbe\u7f6e","setList":{"\u6837\u5f0f":{"isDefault":"true","mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}}},"eventSet":{"scrollView":"none","type":"none"},"autoHeight":"false"},"div_includeBlock_1494309835303":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsPro","act":"viewConfig","setupFunc":"SettingBoxListen"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"includeBlock","styleKind":"\u81ea\u7531\u5bb9\u5668","styleHelpId":1249,"viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"1200px","height":"137px","position":"absolute","top":"0px","left":"calc(50% - 600px)"},"pad":{"height":"137px","width":"100%","left":"0%"},"mobile":{"width":"100%","height":"109px","top":"0px","left":"0%"}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668","moveEdit":[],"eventSet":{"scrollView":"none","type":"none"}},"dh_style_01_1494471060703":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsB","act":"dhConfig","setupFunc":"dhSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bfc\u822a\u83dc\u5355\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u5bfc\u822a\u83dc\u5355-\u98ce\u683c1","styleShowName":"\u98ce\u683c1","styleKind":"\u5bfc\u822a\u83dc\u5355","styleHelpId":1257,"viewCtrl":"default","css":{"pc":{"width":"60%","z-index":"999","position":"absolute","top":"93px","left":"20%"},"pad":{"z-index":"999","left":"15.026455026455027%","width":"70%"},"mobile":{"width":"44px","z-index":"999","top":"64px","left":"calc(50% - 22px)","display":"none"},"content":{"overflow":"visible"},"customCss":{"pc":{"@mainMenuSet":{"color":"#ffffff","font-size":"16px","margin-left":"0px","margin-right":"0px","line-height":"37px","height":"40px"},"%hot>a":{"color":"#ffffff","border-top-color":"#ffffff","border-right-color":"#ffffff","border-bottom-color":"#ffffff","border-left-color":"#ffffff","border-top-style":"solid","border-right-style":"solid","border-bottom-style":"solid","border-left-style":"solid","border-top-width":"2px","border-right-width":"2px","border-bottom-width":"2px","border-left-width":"2px","border-top-left-radius":"5px","border-bottom-left-radius":"5px","border-top-right-radius":"5px","border-bottom-right-radius":"5px"},"@mainMenuSet:hover":{"border-top-color":"#ffffff","border-right-color":"#ffffff","border-bottom-color":"#ffffff","border-left-color":"#ffffff","border-top-style":"solid","border-right-style":"solid","border-bottom-style":"solid","border-left-style":"solid","border-top-width":"2px","border-right-width":"2px","border-bottom-width":"2px","border-left-width":"2px","border-top-left-radius":"5px","border-bottom-left-radius":"5px","border-top-right-radius":"5px","border-bottom-right-radius":"5px","line-height":"34px","height":"40px","font-size":"16px","margin-left":"5px","margin-right":"5px"},"%hot>a:hover":{"height":"40px","line-height":"37px","font-size":"16px"}},"mobile":{"@icoMenuSet":{"color":"#ffffff"},"@mainMenuSet":{"margin-left":"-25px","text-align":"center","margin-top":"5px","margin-bottom":"5px"},"%hot>a:hover":{"margin-left":"0px","margin-right":"0px"},"@mainMenuSet:hover":{"margin-top":"0px","margin-left":"0px","margin-right":"0px","margin-bottom":"0px"}}}},"lock":{"height":"true"},"name":"dh","kind":"\u5bfc\u822a\u83dc\u5355","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"}},"text_style_08_1494464791299":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_08","diyShowName":"\u6587\u5b57\u6a21\u5757-Arial Black","styleKind":"\u82f1\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"51%","font-size":"46px","color":"#333","line-height":"50px","font-family":"Arial Black","position":"absolute","top":"0px","left":"24.5%"},"pad":{"left":"27.306468716861083%","width":"45.387062566277834%","top":"0px"},"mobile":{"width":"195px","top":"15px","left":"0%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"30px","color":"#ffffff","margin-top":"0px","margin-bottom":"0px","line-height":"70px","text-align":"center"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"20px","line-height":"30px"}}}},"lock":{"height":"true"},"showEditTip":"Double click to edit text","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"data":{"linkType":"1","selectVal":10669}},"image_style_01_1494471229390":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"2%","height":"32px","position":"absolute","top":"19px","left":"91.58333333333334%"},"pad":{"left":"89.78989925768823%","width":"2.5%","top":"19px"},"mobile":{"width":"6%","height":"31px","top":"17px","left":"77.04769736842105%"},"content":{"overflow":"visible"},"customCss":{"pc":{"@picSet:hover":{"opacity":"0.7"}}}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"\/userimg\/720\/pkgimg\/mbing\/20170511105409276.png","imgStyle":{"pc":"2","pad":"2","mobile":"2"},"linkType":"0","selectVal":10669},"eventSet":{"scrollView":"none","type":"none"},"params":{"filelist":"","urllist":""}},"text_style_02_1494473718646":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"19.666666666666664%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"10px","left":"0%"},"pad":{"left":"2%","width":"20%"},"mobile":{"width":"195px","top":"0px","display":"none"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","color":"#ffffff","font-size":"14px"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"}},"image_style_01_1494471708303":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"2%","height":"32px","position":"absolute","top":"19px","left":"94.66666666666667%"},"pad":{"width":"2.5%","top":"19px","left":"92.93312566277837%"},"mobile":{"width":"6.000000000000001%","height":"31px","top":"17px","left":"84.41611842105263%"},"content":{"overflow":"visible"},"customCss":{"pc":{"@picSet:hover":{"opacity":"0.7"}}}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"\/userimg\/720\/pkgimg\/mbing\/20170511105409951.png","imgStyle":{"pc":"2","pad":"2","mobile":"2"},"linkType":"0","selectVal":10669},"eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"params":{"filelist":"","urllist":""}},"image_style_01_1494471714796":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"2%","height":"32px","position":"absolute","top":"19px","left":"97.75%"},"pad":{"width":"2.5%","top":"19px","left":"96.07635206786851%"},"mobile":{"width":"6.000000000000001%","height":"31px","top":"17px","left":"91.78453947368422%"},"content":{"overflow":"visible"},"customCss":{"pc":{"@picSet:hover":{"opacity":"0.7"}}}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"\/userimg\/720\/pkgimg\/mbing\/20170511105410224.png","imgStyle":{"pc":"2","pad":"2","mobile":"2"},"linkType":"0","selectVal":10669},"eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"params":{"filelist":"","urllist":""}},"dh_style_01_1494567947626":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsB","act":"dhConfig","setupFunc":"dhSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bfc\u822a\u83dc\u5355\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u5bfc\u822a\u83dc\u5355-\u98ce\u683c1","styleShowName":"\u98ce\u683c1","styleKind":"\u5bfc\u822a\u83dc\u5355","styleHelpId":1257,"viewCtrl":"default","css":{"pc":{"width":"66.66666666666666%","z-index":"999","position":"absolute","left":"16.66666666666667%","top":"39.28124237060547px","display":"none"},"pad":{"width":"11.578947368421053%","z-index":"999","top":"39.28124237060547px","left":"44.21052631578947%","display":"none"},"mobile":{"width":"44px","z-index":"999","left":"calc(50% - 22px)","top":"62.27556610107422px","display":"block"},"content":{"overflow":"visible"},"customCss":{"mobile":{"@icoMenuSet":{"color":"#ffffff"},"@mainMenuSet":{"margin-left":"-24px","text-align":"center","margin-top":"2px","margin-bottom":"2px"},"%hot>a":{"border-bottom-color":"#ffffff","border-top-style":"solid","border-right-style":"solid","border-left-style":"solid","border-top-width":"2px","border-right-width":"2px","border-bottom-width":"2px","border-left-width":"2px","border-top-left-radius":"5px","border-bottom-left-radius":"5px","border-top-right-radius":"5px","border-bottom-right-radius":"5px"},"@mainMenuSet:hover":{"border-top-color":"#ffffff","border-right-color":"#ffffff","border-bottom-color":"#ffffff","border-left-color":"#ffffff","border-top-style":"solid","border-right-style":"solid","border-bottom-style":"solid","border-left-style":"solid","border-left-width":"2px","border-bottom-width":"2px","border-right-width":"2px","border-top-width":"2px","border-top-left-radius":"5px","border-bottom-left-radius":"5px","border-bottom-right-radius":"5px","border-top-right-radius":"5px","padding-left":"0px"},"@columnSet:hover":{"padding-top":"0px"}}}},"lock":{"height":"true"},"name":"dh","kind":"\u5bfc\u822a\u83dc\u5355","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"}},"layout_1494491122684":{"diyShowName":"\u533a\u57df\u5e03\u5c40","name":"layout","style":"autoLayout","css":{"content":{"overflow":"visible"},"pad":{"display":"block","height":"1px"},"mobile":{"height":"1px"},"pc":{"height":"1px"}},"settingsBox":{"showTitle":"\u533a\u57df\u5e03\u5c40\u8bbe\u7f6e","setList":{"\u6837\u5f0f":{"isDefault":"true","mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}}},"eventSet":{"scrollView":"none","type":"none"}},"div_blank_1494491123220":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsPro","act":"viewConfig","setupFunc":"SettingBoxListen"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u7a7a\u767d\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"blank","styleKind":"\u7a7a\u767d\u80cc\u666f","styleHelpId":1248,"viewCtrl":"blank","css":{"pc":{"width":"100%","height":"0px","position":"absolute","top":"0px","left":"0%"},"pad":{"left":"0%","width":"100%"},"mobile":{"width":"100%","height":"1px","top":"0px","left":"0%"},"content":{"overflow":"visible"},"customCss":{"pc":{"modelArea":{"box-sizing":"border-box","border-top-style":"solid","border-right-style":"solid","border-bottom-style":"solid","border-left-style":"solid","border-top-color":"#2C333D","border-right-color":"#2C333D","border-bottom-color":"transparent","border-left-color":"#2C333D","border-top-width":"50px","border-right-width":"50px","border-bottom-width":"50px","border-left-width":"50px"}},"pad":{"modelArea":{"box-sizing":"border-box"}},"mobile":{"modelArea":{"box-sizing":"border-box","border-top-width":"25px","border-right-width":"25px","border-bottom-width":"25px","border-left-width":"25px"}}}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u7a7a\u767d\u80cc\u666f","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[]},"layout_1494491136993":{"diyShowName":"\u533a\u57df\u5e03\u5c40","name":"layout","style":"autoLayout","css":{"content":{"overflow":"visible","max-width":"1200px"},"pad":{"height":"962px"},"mobile":{"height":"484px"},"pc":{"height":"1188px"}},"settingsBox":{"showTitle":"\u533a\u57df\u5e03\u5c40\u8bbe\u7f6e","setList":{"\u6837\u5f0f":{"isDefault":"true","mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}}},"eventSet":{"scrollView":"none","type":"none"},"autoHeight":"true"},"text_style_02_1494491218447":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"26.166666666666664%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"90px","left":"36.916666666666664%"},"pad":{"width":"39.23647932131495%","top":"100px","left":"30.381760339342524%"},"mobile":{"width":"100%","top":"80px","left":"0%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"40px","text-align":"center","line-height":"65px","font-weight":"bold","color":"#2C333D"}},"pad":{"@view_contents":{"box-sizing":"border-box","color":"#2C333D","font-size":"35px","text-align":"center"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"25px","text-align":"center","line-height":"45px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"}},"image_style_04_1494506400401":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"photoConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_04","diyShowName":"\u56fe\u7247\u2014\u76f8\u518c","styleShowName":"\u98ce\u683c4","styleKind":"\u56fe\u7247\u7ec4","styleHelpId":1255,"viewCtrl":"photo","css":{"pc":{"width":"100%","position":"absolute","top":"270px","left":"0%"},"pad":{"width":"96%","left":"2%"},"mobile":{"width":"96%","top":"205px","left":"1.9983552631578947%"},"content":{"overflow":"visible"}},"lock":{"height":"true"},"doubleClickFunc":"photoGroupSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"photoGroupSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","params":{"filelist":"\/userimg\/720\/pkgimg\/mbing\/g6.jpg,\/userimg\/720\/pkgimg\/mbing\/20170511204020340.jpg,\/userimg\/720\/pkgimg\/mbing\/20170511204020211.jpg,\/userimg\/720\/pkgimg\/mbing\/g12.jpg,\/userimg\/720\/pkgimg\/mbing\/g3.jpg,\/userimg\/720\/pkgimg\/mbing\/timg.jpg,\/userimg\/720\/pkgimg\/mbing\/20170511204931309.jpg,\/userimg\/720\/pkgimg\/mbing\/20170511205017894.jpg,\/userimg\/720\/pkgimg\/mbing\/20170511204020340.jpg,","textlist":",,,,,,,,,","urllist":",,,,,,,,,","duration":"1","delay":"0.25","iteration":"1","offset":"0"},"eventSet":{"scrollView":"none","type":"none"},"data":{"prodhnumpc":"3","prodhnum":"3","newPicScale":"3:4","prodhnumpad":"3","prodhnummobile":"3"}},"homelink_style_01_1494560313007":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"homelinkConfig","setupFunc":"homelinkSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5f53\u524d\u4f4d\u7f6e\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u5f53\u524d\u4f4d\u7f6e-\u98ce\u683c1","styleShowName":"\u98ce\u683c1","styleKind":"\u5f53\u524d\u4f4d\u7f6e","viewCtrl":"default","css":{"pc":{"width":"100%","position":"absolute","top":"50px","left":"0%","z-index":2},"mobile":{"width":"85.52631578947368%","top":"25px","left":"7.236842105263158%"},"pad":{"width":"90%","left":"4.984093319194061%"}},"lock":{"height":"true"},"name":"homelink","kind":"\u5f53\u524d\u4f4d\u7f6e","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"data":{"icon":"\/editor\/images\/system\/file\/links-6-gray.png","route":"","separator":">"},"moveEdit":[]},"layout_1494492915319":{"css":{"pc":{"height":"50px"},"content":{"overflow":"visible","max-width":"1200px"},"mobile":{"height":"50px"},"pad":{"height":"50px"}},"diyShowName":"\u533a\u57df\u5e03\u5c40","name":"layout","style":"autoLayout"},"div_includeBlock_1494492957552":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsPro","act":"viewConfig","setupFunc":"SettingBoxListen"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"includeBlock","styleKind":"\u81ea\u7531\u5bb9\u5668","styleHelpId":1249,"viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"100%","height":"50px","position":"absolute","left":"0%","top":"0px"},"pad":{"width":"100%","height":"50px","left":"0%","top":"0px"},"mobile":{"width":"100%","height":"50px","top":"0px","left":"0%"}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668","eventSet":{"scrollView":"none","type":"none"}},"comm_layout_footer":{"diyShowName":"\u5171\u4eab\u5e95\u90e8","css":{"pc":{"height":"495px","display":"block"},"customCss":{"pc":{"modelArea":[]}},"mobile":{"height":"339px","display":"block"},"pad":{"height":"437px","display":"block"},"content":[]},"settingsBox":{"showTitle":"\u5171\u4eab\u5e95\u90e8\u8bbe\u7f6e","setList":{"\u6837\u5f0f":{"isDefault":"true","mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}}},"eventSet":{"scrollView":"none","type":"none"},"autoHeight":"false"},"div_includeBlock_1494465147349":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsPro","act":"viewConfig","setupFunc":"SettingBoxListen"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"includeBlock","styleKind":"\u81ea\u7531\u5bb9\u5668","viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"100%","height":"495px","position":"absolute","top":"0px","left":"0%"},"pad":{"height":"437px"},"mobile":{"width":"100%","height":"339px","top":"0px","left":"0%"},"customCss":{"pc":{"modelArea":{"background":" url(\/sysTools\/Model\/views\/footer\/z_14\/v9Res\/d679842110890e6adc3a5b6d47e9ebbc.jpg)","background-repeat":"no-repeat","background-size":"cover","background-position-x":"50%","background-position-y":"50%"}}}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668","eventSet":{"scrollView":"none","type":"none"},"autoHeight":"true"},"div_includeBlock_1494465147519":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsPro","act":"viewConfig","setupFunc":"SettingBoxListen"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"includeBlock","styleKind":"\u81ea\u7531\u5bb9\u5668","viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"1200px","height":"410px","position":"absolute","top":"85px","left":"calc(50% - 600px)"},"pad":{"height":"279.5px","width":"96%","left":"2%","top":"46px"},"mobile":{"width":"96.00000000000001%","height":"275px","top":"15px","left":"1.999999999999993%","display":"block"}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668","eventSet":{"scrollView":"none","type":"none"}},"text_style_02_1494465147762":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u5b57\u4f53","viewCtrl":"default","css":{"pc":{"width":"17.25%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"9.5px","left":"0.33333333333333337%"},"mobile":{"width":"45.75342465753425%","top":"20px","left":"1.3157894736842124%","display":"block"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"16px","line-height":"30px","color":"#b5c0af","text-align":"left"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"14px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u57fa\u7840\u6a21\u5757","showname":"\u6587\u5b57\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"}},"text_style_02_1494465147772":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u5b57\u4f53","viewCtrl":"default","css":{"pc":{"width":"18.583333333333332%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"53px","left":"0.33333333333333337%"},"mobile":{"width":"50.68493150684932%","top":"50px","left":"1.0702054794520548%","display":"block"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"14px","line-height":"23px","color":"#b5c0af","text-align":"left"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"12px"}}},"pad":{"width":"219px"}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u57fa\u7840\u6a21\u5757","showname":"\u6587\u5b57\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"}},"text_style_02_1494465147778":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u5b57\u4f53","viewCtrl":"default","css":{"pc":{"width":"13.3%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"159.5px","left":"86.66666666666667%"},"mobile":{"width":"41.64383561643836%","top":"159px","left":"58.35616438356165%","display":"block"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"14px","line-height":"23px","color":"#b5c0af","text-align":"center"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box","text-align":"right"}}},"pad":{"width":"147px","left":"83.75690607734806%","top":"180.5px"}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u57fa\u7840\u6a21\u5757","showname":"\u6587\u5b57\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"}},"image_style_01_1494465147784":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","viewCtrl":"default","css":{"pc":{"width":"12.5%","height":"99px","position":"absolute","top":"47px","left":"86.80859375%"},"pad":{"left":"83.88466850828729%","width":"14.806629834254142%","top":"57.5px","height":"109px"},"mobile":{"width":"112px","height":"110px","top":"29px","left":"69.25941780821918%"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"\/userimg\/720\/pkgimg\/mbing\/erweima.png","imgStyle":{"pc":"3","pad":"3","mobile":"3"}},"eventSet":{"scrollView":"none","type":"none"},"params":{"filelist":"","urllist":""}},"image_style_01_1494465147789":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":"1254","viewCtrl":"default","css":{"pc":{"width":"2.5%","height":"34px","position":"absolute","top":"11.5px","left":"28.260416666666664%"},"pad":{"left":"29.633977900552487%","top":"36.5px"},"mobile":{"width":"57.392102846648285%","height":"200px","top":"0px","left":"21.303948576675857%","display":"none"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"\/sysTools\/Model\/views\/footer\/z_14\/v9Res\/d35dee9b76bdf29aad1b182191a48cbc.png","imgStyle":{"pc":"3","pad":"3","mobile":"null"}},"eventSet":{"scrollView":"none","type":"none"},"params":{"filelist":"","urllist":""}},"text_style_02_1494465147795":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u5b57\u4f53","viewCtrl":"default","css":{"pc":{"width":"12.833333333333332%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"71px","left":"31.899739583333332%"},"mobile":{"width":"97.36842105263158%","top":"700px","left":"1.3157894736842124%","display":"none"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"14px","line-height":"30px","color":"#b5c0af","text-align":"left"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box"}}},"pad":{"left":"34.178176795580114%","top":"97px"}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u57fa\u7840\u6a21\u5757","showname":"\u6587\u5b57\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"}},"text_style_02_1494465147801":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u5b57\u4f53","viewCtrl":"default","css":{"pc":{"width":"12.25%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"12.5px","left":"31.899739583333332%"},"mobile":{"width":"97.36842105263158%","top":"200px","left":"1.3157894736842124%","display":"none"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"14px","line-height":"30px","color":"#b5c0af","text-align":"left"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box"}}},"pad":{"left":"34.21270718232044%","top":"41.5px"}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u57fa\u7840\u6a21\u5757","showname":"\u6587\u5b57\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"}},"image_style_01_1494465147805":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":"1254","viewCtrl":"default","css":{"pc":{"width":"2.9166666666666665%","height":"34px","position":"absolute","top":"69px","left":"28.052083333333332%"},"pad":{"width":"34px","left":"29.064226519337016%","top":"97px","height":"30px"},"mobile":{"width":"59.78344046525862%","height":"200px","top":"434px","left":"20.10827976737069%","display":"none"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"\/sysTools\/Model\/views\/footer\/z_14\/v9Res\/54f708d657bdb3905742b1ed96d00547.png","imgStyle":{"pc":"3","pad":"3","mobile":"null"}},"eventSet":{"scrollView":"none","type":"none"},"params":{"filelist":"","urllist":""}},"image_style_01_1494465147810":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":"1254","viewCtrl":"default","css":{"pc":{"width":"3.4166666666666665%","height":"34px","position":"absolute","top":"127.5px","left":"27.802083333333332%"},"pad":{"width":"37px","left":"28.88294198895028%","top":"149.5px","height":"32px"},"mobile":{"width":"62.274417151311056%","height":"200px","top":"934px","left":"18.862791424344472%","display":"none"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"\/sysTools\/Model\/views\/footer\/z_14\/v9Res\/06bcd5986593040238047b62875f97f6.png","imgStyle":{"pc":"3","pad":"3","mobile":"null"}},"eventSet":{"scrollView":"none","type":"none"},"params":{"filelist":"","urllist":""}},"text_style_02_1494465147820":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u5b57\u4f53","viewCtrl":"default","css":{"pc":{"width":"12.833333333333332%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"129.5px","left":"31.899739583333332%"},"mobile":{"width":"97.36842105263158%","top":"1200px","left":"1.3157894736842124%","display":"none"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"14px","line-height":"30px","color":"#b5c0af","text-align":"left"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box"}}},"pad":{"left":"34.19544198895028%","top":"149.5px"}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u57fa\u7840\u6a21\u5757","showname":"\u6587\u5b57\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"}},"image_style_01_1494465147825":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":"1254","viewCtrl":"default","css":{"pc":{"width":"4%","height":"34px","position":"absolute","top":"186px","left":"27.510416666666664%"},"pad":{"left":"29.14191988950276%","top":"202px","height":"32px"},"mobile":{"width":"64.86918453261566%","height":"200px","top":"1434px","left":"17.56540773369217%","display":"none"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"\/sysTools\/Model\/views\/footer\/z_14\/v9Res\/931cb43ed2f77db5d722190883945f21.png","imgStyle":{"pc":"3","pad":"3","mobile":"null"}},"eventSet":{"scrollView":"none","type":"none"},"params":{"filelist":"","urllist":""}},"text_style_02_1494465147829":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u5b57\u4f53","viewCtrl":"default","css":{"pc":{"width":"18%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"188px","left":"31.899739583333332%"},"mobile":{"width":"97.36842105263158%","top":"1700px","left":"1.3157894736842124%","display":"none"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"14px","line-height":"30px","color":"#b5c0af","text-align":"left"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box"}}},"pad":{"left":"34.05904696132597%","top":"203px","width":"200px"}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u57fa\u7840\u6a21\u5757","showname":"\u6587\u5b57\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"}},"image_style_04_1494465147834":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"photoConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_04","diyShowName":"\u56fe\u7247\u2014\u76f8\u518c","styleShowName":"\u98ce\u683c4","styleKind":"\u56fe\u7247\u7ec4","viewCtrl":"photo","css":{"pc":{"width":"23.583333333333336%","position":"absolute","top":"20px","left":"56.225260416666664%"},"pad":{"left":"60.57320441988951%","width":"19.226519337016573%","top":"9.5px"},"mobile":{"width":"300px","top":"0px","display":"none"},"content":{"overflow":"visible"}},"lock":{"height":"true"},"doubleClickFunc":"photoGroupSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"photoGroupSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"data":{"prodnum":"6","prodhnumpc":"3","prodhnum":"2","prodhnumpad":"2","prodznumpad":"3","prodznum":"3"},"params":{"filelist":"\/sysTools\/Model\/views\/footer\/z_14\/v9Res\/e977d0acf5c4d868990efbe57ae44496.jpg,\/sysTools\/Model\/views\/footer\/z_14\/v9Res\/a2d4e87c472f5c88fd421a7f369628a8.jpg,\/sysTools\/Model\/views\/footer\/z_14\/v9Res\/83cddac62721047349c86665379c4574.jpg,\/sysTools\/Model\/views\/footer\/z_14\/v9Res\/af23b2444a48b9120507ecbaf14cf25b.jpg,\/sysTools\/Model\/views\/footer\/z_14\/v9Res\/07211fa322a61078c909c32a33863952.jpg,\/sysTools\/Model\/views\/footer\/z_14\/v9Res\/2df98439aba644b8ce14fcdf90a8ff6a.jpg,","textlist":",,,,,,","urllist":",,,,,,"}},"div_includeBlock_1494465147528":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsPro","act":"viewConfig","setupFunc":"SettingBoxListen"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"includeBlock","styleKind":"\u81ea\u7531\u5bb9\u5668","viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"1200px","height":"115px","position":"absolute","top":"352px","left":"calc(50% - 600px)"},"pad":{"width":"96%","left":"2%","top":"340px","height":"97px"},"mobile":{"width":"96.00000000000001%","height":"90px","top":"249px","left":"1.999999999999993%"}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668","eventSet":{"scrollView":"none","type":"none"}},"text_style_02_1494465147898":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u5b57\u4f53","viewCtrl":"default","css":{"pc":{"width":"50%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"19px","left":"0%"},"mobile":{"width":"100%","top":"10px","left":"0%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"14px","line-height":"40px","color":"#c4c4c4","text-align":"left","border-top-color":"#4d4d4d","border-top-style":"none","border-top-width":"1px","padding-top":"0px"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box","color":"#c4c4c4","text-align":"center"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u57fa\u7840\u6a21\u5757","showname":"\u6587\u5b57\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"}},"dh_style_01_1494465147907":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsB","act":"dhConfig","setupFunc":"dhSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bfc\u822a\u83dc\u5355\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u5bfc\u822a\u83dc\u5355-\u98ce\u683c1","styleShowName":"\u98ce\u683c1","styleKind":"\u5bfc\u822a\u83dc\u5355","viewCtrl":"default","css":{"pc":{"width":"42.833333333333336%","z-index":"999","position":"absolute","top":"29px","left":"57.166666666666664%"},"pad":{"z-index":"999"},"mobile":{"width":"12.121212121212121%","z-index":"999","top":"300px","left":"43.93939393939394%","display":"none"},"content":{"overflow":"visible"},"customCss":{"pc":{"@mainMenuSet":{"color":"#c4c4c4","font-size":"14px","border-right-style":"solid","border-right-width":"2px","line-height":"20px","height":"20px"},"%hot>a":{"color":"#c4c4c4","font-size":"14px","border-right-color":"#c4c4c4"}}}},"lock":{"height":"true"},"name":"dh","kind":"\u5bfc\u822a\u83dc\u5355","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"}}}