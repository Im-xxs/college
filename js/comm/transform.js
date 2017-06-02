/* Jin @2011.12.9 */
var based_Obj = document.getElementById("based");
var currentlang_Obj = document.getElementById("currentlang"); //褰撳墠璇█
$(function() {
    if (based_Obj) {
        var JF_cn = "ft" + self.location.hostname.toString().replace(/\./g, "");
        switch (Request('chlang')) {
            case "cn-tw":
                BodyIsFt = getCookie(JF_cn) == "1" ? 0 : 1;
                delCookie(JF_cn);
                SetCookie(JF_cn, BodyIsFt, 7);
                break;
            case "cn":
            case "en":
                BodyIsFt = 0;
                delCookie(JF_cn);
                SetCookie(JF_cn, 0, 7);
                currentlang_Obj.innerHTML = "绠€浣撲腑鏂�";
                break;
            case "tw":
                BodyIsFt = 1;
                delCookie(JF_cn);
                SetCookie(JF_cn, 1, 7);
                currentlang_Obj.innerHTML = "绻侀珨涓枃"; //鍥犱负鏄箒浣� 浣犲啓绠€浣撲篃浼氳杞寲鎴愮箒浣�  鎵€浠ヨ繖鍎垮彧鑳藉啓绻佷綋 2015-1-16
                break;
            default:
                if (typeof Default_isFT != 'undefined' && Default_isFT) { //濡傛灉榛樿绻佷綋
                    if (getCookie(JF_cn) == null) {
                        BodyIsFt = 1;
                        SetCookie(JF_cn, 1, 7);
                        break;
                    }
                }
                BodyIsFt = parseInt(getCookie(JF_cn));
        }
        if (BodyIsFt === 1) {
            StranBody();
            document.title = StranText(document.title);
        } else {
            StranBodyce();
            document.title = StranTextce(document.title);
        }
    } else {
        var JF_cn = "ft" + self.location.hostname.toString().replace(/\./g, "");
        if (Default_isFT) {
            BodyIsFt = 1;
            delCookie(JF_cn);
            SetCookie(JF_cn, 1, 7);
            StranBody();
            document.title = StranText(document.title);
        } else {
            BodyIsFt = 0;
            delCookie(JF_cn);
            SetCookie(JF_cn, 0, 7);
            StranBodyce();
            document.title = StranTextce(document.title);
        }
    }

});

function StranBody(fobj) {
    var obj = fobj ? fobj.childNodes : document.body.childNodes;
    for (var i = 0; i < obj.length; i++) {
        var OO = obj.item(i);
        if ("||BR|HR|TEXTAREA|".indexOf("|" + OO.tagName + "|") > 0 || OO == based_Obj) continue;
        if (OO.title != "" && OO.title != null) OO.title = StranText(OO.title);
        if (OO.alt != "" && OO.alt != null) OO.alt = StranText(OO.alt);
        if (OO.tagName == "INPUT" && OO.value != "" && OO.type != "text" && OO.type != "hidden") OO.value = StranText(OO.value);
        if (OO.nodeType == 3) { OO.data = StranText(OO.data) } else StranBody(OO)
    }

    try {
        var based_Obj2 = document.getElementById("based2");
        if (!based_Obj2) { //绠€绻�
            based_Obj.innerHTML = BodyIsFt == 1 ? "绠€浣撲腑鏂�" : "绻佷綋涓枃";
        } else { //绠€绻佽嫳
            based_Obj.innerHTML = "绻佷綋涓枃";
            based_Obj2.innerHTML = "绠€浣撲腑鏂�";
        }
    } catch (e) {}
}

function StranBodyce(fobj) {
    var obj = fobj ? fobj.childNodes : document.body.childNodes;
    for (var i = 0; i < obj.length; i++) {
        var OO = obj.item(i);
        if ("||BR|HR|TEXTAREA|".indexOf("|" + OO.tagName + "|") > 0 || OO == based_Obj) continue;
        if (OO.title != "" && OO.title != null) OO.title = StranTextce(OO.title);
        if (OO.alt != "" && OO.alt != null) OO.alt = StranTextce(OO.alt);
        if (OO.tagName == "INPUT" && OO.value != "" && OO.type != "text" && OO.type != "hidden") OO.value = StranTextce(OO.value);
        if (OO.nodeType == 3) { OO.data = StranTextce(OO.data) } else StranBodyce(OO)
    }
    try {
        var based_Obj2 = document.getElementById("based2");
        if (!based_Obj2) { //绠€绻�
            based_Obj.innerHTML = BodyIsFt == 1 ? "绠€浣撲腑鏂�" : "绻佷綋涓枃";
        } else { //绠€绻佽嫳
            based_Obj.innerHTML = "绻佷綋涓枃";
            based_Obj2.innerHTML = "绠€浣撲腑鏂�";
        }
    } catch (e) {}
}

function StranText(txt) {
    if (txt == "" || txt == null) return "";
    return Traditionalized(txt);
}

function StranTextce(txt) {
    if (txt == "" || txt == null) return "";
    return Traditionalizedce(txt);
}

function JTPYStr() {
    return '鐨戣敿纰嶇埍缈辫濂ュ潩缃㈡憜璐ラ鍔炵粖甯粦闀戣挨鍓ラケ瀹濇姤椴嶈緢璐濋挕鐙堝鎯环绗旀瘯姣欓棴杈圭紪璐彉杈╄精槌栫槳婵掓花瀹炬憟楗兼嫧閽甸搨椹冲崪琛ュ弬铓曟畫鎯儴鐏胯媿鑸变粨娌у帟渚у唽娴嬪眰璇ф悁鎺鸿潐棣嬭皸缂犻摬浜ч槓棰ゅ満灏濋暱鍋胯偁鍘傜晠閽炶溅褰诲皹闄堣‖鎾戠О鎯╄瘹楠嬬棿杩熼┌鑰婚娇鐐藉啿铏疇鐣磋笇绛圭桓涓戞┍鍘ㄩ攧闆忕鍌ㄨЕ澶勪紶鐤棷鍒涢敜绾话杈炶瘝璧愯仾钁卞洷浠庝笡鍑戠獪閿欒揪甯﹁捶鎷呭崟閮告幐鑳嗘儺璇炲脊褰撴尅鍏氳崱妗ｆ崳宀涚シ瀵肩洍鐏倱鏁屾钉閫掔紨鐐瑰灚鐢垫穩閽撹皟杩皪鍙犻拤椤堕敪璁笢鍔ㄦ爧鍐绘枟鐘婄嫭璇昏祵闀€閿绘柇缂庡厬闃熷鍚ㄩ】閽濆ず楣呴璁规伓楗垮効灏旈サ璐板彂缃氶榾鐝愮熅閽掔儲鑼冭穿楗绾洪搴熻垂绾峰潫濂嬫劋绮赴鏋攱椋庣柉鍐紳璁藉嚖鑲よ緪鎶氳緟璧嬪璐熻濡囩細璇ラ挋鐩栧共璧剁璧ｅ唸鍒氶挗绾插矖鐨嬮晲鎼侀附闃侀摤涓粰榫氬宸╄础閽╂矡鏋勮喘澶熻泭椤惧墣鍏宠棣嗘儻璐箍瑙勭褰掗緹闂鸿建璇℃煖璐靛埥杈婃粴閿呭浗杩囬獓闊╂眽闃傞工璐烘í杞伴缚绾㈠悗澹舵姢娌埛鍝楀崕鐢诲垝璇濇€€鍧忔鐜繕缂撴崲鍞ょ棯鐒曟叮榛勮皫鎸ヨ緣姣佽纯绉戒細鐑╂眹璁宠缁樿崵娴戜紮鑾疯揣绁稿嚮鏈虹Н楗ヨ楦＄哗缂夋瀬杈戠骇鎸ゅ嚑钃熷墏娴庤璁伴檯缁х邯澶硅崥棰婅淳閽句环椹炬鐩戝潥绗洪棿鑹扮紕鑼ф纰辩》鎷ｆ崱绠€淇噺鑽愭閴磋返璐辫閿埌鍓戦ク娓愭簠娑ф祮钂嬫〃濂栬閰辫兌娴囬獎濞囨悈閾扮煫渚ヨ剼楗虹即缁炶娇杈冪Ц闃惰妭鑼庢儕缁忛闈欓暅寰勭棄绔炲噣绾犲帺鏃ч┕涓炬嵁閿儳鍓ч箖缁㈡澃娲佺粨璇眾绱ч敠浠呰皑杩涙檵鐑敖鍔茶崋瑙夊喅璇€缁濋挧鍐涢獜寮€鍑澹宠鍨︽伋鎶犲簱瑁ゅじ鍧椾京瀹界熆鏃峰喌浜忓部绐ラ婧冩墿闃旇湣鑵婅幈鏉ヨ禆钃濇爮鎷︾闃戝叞婢滆鞍鎻借鎳掔紗鐑傛互鎹炲姵娑濅箰闀瀿绫绘唱绡辩閲岄菠绀间附鍘夊姳鐮惧巻娌ラ毝淇╄仈鑾茶繛闀版€滄稛甯樻暃鑴搁摼鎭嬬偧缁冪伯鍑変袱杈嗚皡鐤楄窘闀ｇ寧涓撮偦槌炲嚊璧侀緞閾冨噷鐏靛箔棰嗛鍒橀緳鑱嬪挋绗煎瀯鎷㈤檱妤煎▌鎼傜瘬鑺﹀崲棰呭簮鐐夋幊鍗よ檹椴佽祩绂勫綍闄嗛┐鍚曢摑渚ｅ薄缂曡檻婊ょ豢宄︽寷瀛沪涔辨姟杞鸡浠戞拨绾惰钀濈綏閫婚敚绠╅楠嗙粶濡堢帥鐮佽殏椹獋鍚椾拱楹﹀崠杩堣剦鐬掗铔弧璋╃尗閿氶搯璐镐箞闇夋病闀侀棬闂蜂滑閿版ⅵ璋滃讥瑙呯坏缂呭簷鐏偗闂介福閾艾璋嬩憨閽犵撼闅炬尃鑴戞伡闂归鑵绘挼鎹婚吙楦熻亗鍟晩闀嶆煚鐙炲畞鎷ф碁閽航鑴撴祿鍐滅枱璇烘楦ユ鍛曟菠鐩樺簽鍥界埍璧斿柗楣忛獥椋橀璐嫻鍑瘎娉奸鎵戦摵鏈磋氨鑴愰綈楠戝矀鍚皵寮冭鐗垫墻閽庨搮杩佺璋﹂挶閽虫綔娴呰按鍫戞灙鍛涘钄峰己鎶㈤敼妗ヤ箶渚ㄧ繕绐嶇獌閽︿翰杞绘阿鍊鹃》璇峰簡鐞肩┓瓒嬪尯韬┍榫嬮ⅶ鏉冨姖鍗撮箠璁╅ザ鎵扮粫鐑煣璁ょ韩鑽ｇ粧杞攼闂版鼎娲掕惃槌冭禌浼炰抚楠氭壂娑╂潃绾辩瓫鏅掗棯闄曡怠缂激璧忕儳缁嶈祳鎽勬厬璁剧粎瀹″┒鑲炬笚澹扮怀鑳滃湥甯堢嫯婀胯瘲灏告椂铓€瀹炶瘑椹跺娍閲婇グ瑙嗚瘯瀵垮吔鏋㈣緭涔﹁祹灞炴湳鏍戠珫鏁板竻鍙岃皝绋庨『璇寸鐑佷笣楗茶€告€傞璁艰鎿炶嫃璇夎們铏界互宀佸瓩鎹熺瑡缂╃悙閿佺嵀鎸炴姮鎽婅椽鐦哗鍧涜碍璋堝徆姹ょ儷娑涚沪鑵捐獖閿戦浣撳眽鏉¤创閾佸巺鍚儍閾滅粺澶村浘娑傚洟棰撹湑鑴遍傅椹┘妞醇琚滃集婀鹃〗涓囩綉闊﹁繚鍥翠负娼嶇淮鑻囦紵浼含璋撳崼娓╅椈绾圭ǔ闂摦鎸濊湕娑＄獫鍛滈挩涔岃鏃犺姕鍚村潪闆惧姟璇敗鐗鸿涔犻摚鎴忕粏铏捐緰宄′緺鐙帵閿ㄩ矞绾ゅ捀璐よ闂叉樉闄╃幇鐚幙棣呯尽瀹嚎鍘㈤暥涔¤鍝嶉」钀ч攢鏅撳暩铦庡崗鎸熸惡鑳佽皭鍐欐郴璋㈤攲琛呭叴姹归攬缁ｈ櫄鍢橀』璁哥华缁僵鎮€夌櫍缁氬鍕嬭瀵婚┋璁閫婂帇楦﹂腑鍝戜簹璁堕槈鐑熺洂涓ラ闃庤壋鍘岀牃褰﹁皻楠岄腐鏉ㄦ壃鐤￠槼鐥掑吇鏍风懚鎽囧哀閬ョ獞璋ｈ嵂鐖烽〉涓氬彾鍖婚摫棰愰仐浠綕铓佽壓浜垮繂涔夎璁皧璇戝紓缁庤崼闃撮摱楗ū濠撮拱搴旂绩鑾硅悿钀ヨ崸铦囬鍝熸嫢浣ｇ棃韪婂拸娑屼紭蹇ч偖閾€鐘规父璇辫垎楸兼笖濞变笌灞胯鍚佸尽鐙辫獕棰勯┉楦虫笂杈曞洯鍛樺渾缂樿繙鎰跨害璺冮挜宀崇菠鎮﹂槄浜戦儳鍖€闄ㄨ繍钑撮厺鏅曢煹鏉傜伨杞芥敀鏆傝禐璧冭剰鍑挎灒鐏惰矗鎷╁垯娉借醇璧犳墡鏈涧閾￠椄璇堟枊鍊烘鐩忔柀杈楀喘鏍堟垬缁藉紶娑ㄥ笎璐﹁儉璧佃洶杈欓敆杩欒礊閽堜睛璇婇晣闃垫專鐫佺嫲甯ч儜璇佺粐鑱屾墽绾告寶鎺峰笢璐ㄩ挓缁堢鑲夸紬璇岃酱鐨辨樇楠ょ尓璇歌瘺鐑涚灘鍢辫串閾哥瓚椹讳笓鐮栬浆璧氭々搴勮濡嗗．鐘堕敟璧樺潬缂€璋嗘祳鍏硅祫娓嶈釜缁兼€荤旱閭硅瘏缁勯捇鑷撮挓涔堜负鍙嚩鍑嗗惎鏉块噷闆充綑閾炬硠鏍囬€傛€佷簬';
}

function FTPYStr() {
    return '鐨氳椆绀欐剾缈鸿濂у）缃锋摵鏁楅爳杈︾祮骞秮閹婅瑮鍓濋＝瀵跺牨楫戣缉璨濋媷鐙藉倷鎲婄箖绛嗙暍鏂冮枆閭婄法璨惰畩杈井榧堢櫉鐎曟勘璩撴摨椁呮挜缂介墤椐佽敂瑁滃弮锠舵畼鎱氭厴鐕﹁捈鑹欏€夋粍寤佸伌鍐婃脯灞よ┇鏀欐懟锜璁掔簭閺熺敚闂￠～鍫村槜闀峰劅鑵稿粻鏆㈤垟杌婂竟濉甸櫝瑗拹绋辨嚥瑾犻▉鐧￠伈棣虫仴榻掔喚娌栬煵瀵电枃韬婄睂缍㈤啘娅ュ粴閶ら洓绀庡劜瑙歌檿鍌崇槨闂栧壍閷樼磾缍借经瑭炶硿鑱拌敟鍥緸鍙㈡箠绔勯尟閬斿付璨告摂鍠劜鎾ｈ喗鎲氳獣褰堢暥鎿嬮花钑╂獢鎼楀扯绂卞皫鐩滅噲閯ф暤婊岄仦绶犻粸澧婇浕婢遍嚕瑾垮彔璜滅枈閲橀爞閷犺▊鏉卞嫊妫熷噸楝ョ姠鐛ㄨ畝璩崓閸涙柗绶炲厡闅婂皪鍣搁爴閳嶅オ榈濋瑷涙儭椁撳厭鐖鹃璨崇櫦缃伴枼鐞虹が閲╃叐绡勮博椋í绱￠寤㈣不绱涘⒊濂啢绯炶睈妤撻嫆棰ㄧ構棣斧璜烽吵鑶氳蓟鎾紨璩﹁璨犺▋濠︾笡瑭查垼钃嬪构瓒曠▓璐涘病鍓涢嫾缍卞礂鑷幀鎿遍纯闁ｉ壔鍊嬬郸榫斿闉忚并閳庢簼妲嬭臣澶犺牨椤у壆闂滆椁ㄦ叄璨唬瑕忕熃姝搁緶闁ㄨ粚瑭珒璨村妸杓ユ痪閸嬪湅閬庨Л闊撴饥闁￠洞璩€姗綗榇荤磪寰屽：璀锋滑鎴跺槱鑿暙鍔冭┍鎳峰姝＄挵閭勭珐鎻涘枤鐦撶叆娓欓粌璎婃彯杓濇瘈璩勭鏈冪嚧褰欒瑾ㄧ躬钁锋妇澶ョ嵅璨ㄧ鎿婃绌嶉璀忛洖绺剧窛妤佃集绱氭摖骞捐枈鍔戞繜瑷堣闅涚辜绱€澶捐帰闋拌硤閴€鍍归娈茬洠鍫呯畫闁撹壉绶樼弓妾㈠牽楣兼弨鎾跨啊鍎夋笡钖︽閼掕笎璩よ閸佃墻鍔嶉婕告亢婢楁伎钄ｆС鐛庤瑳閱啝婢嗛瀣屾敧閴哥煰鍍ヨ叧椁冪钩绲炶綆杓冪ō闅庣瘈鑾栭缍撻牳闈滈彙寰戠棛绔舵法绯惧粍鑸婇鑸夋摎閶告嚰鍔囬祽绲瑰倯娼旂祼瑾″眴绶婇對鍍呰閫叉檳鐕肩洝鍕佽崐瑕烘焙瑷ｇ禃閳炶粛椐块枊鍑遍娈艰澧炬噰鎽冲韩瑜茶獓濉婂剤瀵う鏇犳硜铏у穻绐洪娼版摯闂婅牊鑷樿悐渚嗚炒钘嶆瑒鏀旂眱闂岃槶鐎捐畷鏀鎳剁簻鐖涙揩鎾堝嫗婢囨▊閻冲椤炴窔绫洟瑁忛瘔绂簵鍘插嫷绀泦鐎濋毟鍊嗚伅钃€ｉ惍鎲愭迹绨炬杺鑷夐張鎴€鐓夌反绯ф都鍏╄紱璜掔檪閬奸悙鐛佃嚚閯伴睏鍑滆硟榻￠埓娣╅潏宥洪牁椁惧妷榫嶈伨鍤ㄧ睜澹熸攺闅存〒濠佹憻绨嶈槅鐩ч”寤垚鎿勯沟铏滈璩傜タ閷勯櫢椹㈠憘閶佷径灞㈢阜鎱烤缍犲窉鏀ｅ鐏や簜鎺勮吉鍊緰娣陡璜栬樋缇呴倧閼肩碑楱鹃П绲″鐟⒓铻為Μ缃靛棊璨烽亥璩ｉ倎鑴堢灋楗呰牷婊胯璨撻尐閴氳部楹介淮娌掗巶闁€鎮跺€戦尦澶㈣瑤褰岃缍跨番寤熸粎鎲柀槌撮姌璎瑎鐣濋垑绱嶉洠鎾撹叇鎯遍椁掕啯鏀嗘挌閲€槌ヨ伓榻ч懛閹虫鐛扮敮鎿版繕閳曠磹鑶挎績杈茬槯璜炬瓙榉楁瘑鍢旀細鐩ら緪鍦嬫剾璩犲櫞榈椋勯牷璨ц構鎲戣娼戦牀鎾查嫪妯歌瓬鑷嶉綂楱庤眻鍟撴埃妫勮鐗芥墶閲洪墰閬风敖璎欓將閴楁經娣鸿濉规鍡嗙墕钖斿挤鎼堕崿姗嬪柆鍍戠抗绔呯珚娆借Κ杓曟矮鍌鹃爟璜嬫叾鐡婄瓒ㄥ崁杌€椹呴讲椤存瑠鍕稿嵒榈茶畵楗掓摼绻炵啽闊岃獚绱夋Ξ绲ㄨ粺閵抽枏娼ょ亼钖╅皳璩藉倶鍠ǚ鎺冩線娈虹礂绡╂洭闁冮櫇璐嶇箷鍌疯碁鐕掔垂璩掓敐鎳捐ō绱冲瀣歌厧婊茶伈绻╁嫕鑱栧斧鐛呮繒瑭╁睄鏅傝潟瀵﹁瓨椐涘嫝閲嬮＞瑕栬│澹界嵏妯炶几鏇歌礀灞妯硅睅鏁稿弗闆欒绋呴爢瑾ⅸ鐖嶇挡椋艰伋鎱爩瑷熻鎿昏槆瑷磋倕闆栫稄姝插鎼嶇瓖绺懀閹栫嵑鎾绘摗鏀よ勃鐧辩仒澹囪瓪璜囨瓗婀嚈婵ょ抚楱拌瑒閵婚楂斿睖姊濊布閻靛怀鑱界兇閵呯当闋湒濉楀湗闋硅浕鑴磿棣遍姗㈢瑗綆鐏ｉ爲钀恫闊嬮仌鍦嶇埐婵扮董钁﹀亯鍍炵矾璎傝婧仦绱嬬┅鍟忕敃鎾捐澑娓︾鍡氶帰鐑忚鐒¤暘鍚冲、闇у嫏瑾ら尗鐘цゲ缈掗姂鎴茬窗铦﹁絼宄戒繝鐙瑰粓閸侀绾栭构璩㈤姕闁戦’闅従鐛荤福椁＄鲸鎲茬窔寤傞懖閯夎┏闊块爡钑姺鏇夊槸锠嶅崝鎸炬敎鑴呰瀵€夎瑵閶呴噥鑸堟炊閺界埂铏涘檽闋堣ū绶掔簩杌掓嚫閬哥櫖绲㈠鍕宠灏嬮Υ瑷撹▕閬滃榇夐川鍟炰簽瑷濋柟鐓欓菇鍤撮闁昏睌鍘’褰ヨ椹楅处妤婃彋鐦嶉櫧鐧㈤妯ｇ懁鎼栧牤閬欑璎犺棩鐖洪爜妤憠閱姤闋ら伜鍎€褰滆熁钘濆剟鎲剁京瑭ｈ瑾艰鐣扮构钄櫚閵€椋叉瀣伴饭鎳夌簱鐟╄灑鐕熺啋锠呯鍠叉搧鍌櫚韪磋婀у劒鎲傞兊閳剧尪閬婅獦杓块瓪婕佸鑸囧都瑾炵辈绂︾崉璀介爯棣礇娣佃絽鍦掑摗鍦撶罚閬犻绱勮簫閼板督绮垫倕闁遍洸閯栧嫽闅曢亱铇婇啚鏆堥熁闆滅伣杓夋敘鏆磰璐撻珤閼挎绔堣铂鎿囧墖婢よ硦璐堢串鍔勮粙閸橀枠瑭愰綃鍌垫皥鐩炴柆杓惧秳妫ф埌缍诲嫉婕插赋璩劰瓒欒焺杞嶉嵑閫欒矠閲濆伒瑷洪幃闄ｆ帣鐫滅寵骞€閯瓑绻旇伔鍩风礄鎽摬骞熻唱閸剧祩绋叓琛嗚瑓杌哥毢鏅濋璞瑾呯嚟鐭氬洃璨憚绡夐灏堢杞夎澈妯佽帄瑁濆澹媭閷愯磪澧滅洞璜勬縼鑼茶硣婕工缍滅附绺遍剴瑭涚祫閼界坊閻橀杭鐐洪毣鍏囨簴鍟熼梿瑁￠潅椁橀崐娲╂閬╂厠鏂�';
}

function Traditionalized(cc) {
    var str = '',
        ss = JTPYStr(),
        tt = FTPYStr();
    for (var i = 0; i < cc.length; i++) {
        if (cc.charCodeAt(i) > 10000 && ss.indexOf(cc.charAt(i)) != -1) str += tt.charAt(ss.indexOf(cc.charAt(i)));
        else str += cc.charAt(i);
    }
    return str;
}

function Traditionalizedce(cc) {
    var str = '',
        tt = JTPYStr(),
        ss = FTPYStr();
    for (var i = 0; i < cc.length; i++) {
        if (cc.charCodeAt(i) > 10000 && ss.indexOf(cc.charAt(i)) != -1) str += tt.charAt(ss.indexOf(cc.charAt(i)));
        else str += cc.charAt(i);
    }
    return str;
}

function _RequestParamsStr() {
    var strHref = window.document.location.href;
    var intPos = strHref.indexOf('?');
    var strRight = strHref.substr(intPos + 1);
    return strRight;
}

function Request(strName) {
    var arrTmp = _RequestParamsStr().split("&");
    for (var i = 0, len = arrTmp.length; i < len; i++) {
        var arrTemp = arrTmp[i].split("=");
        if (arrTemp[0].toUpperCase() == strName.toUpperCase()) {
            if (arrTemp[1].indexOf("#") != -1) arrTemp[1] = arrTemp[1].substr(0, arrTemp[1].indexOf("#"));
            return arrTemp[1];
        }
    }
    return "";
}

function SetCookie(name, value, hours) {
    var hourstay = 30 * 24 * 60 * 60 * 1000; //姝� cookie 灏嗚榛樿淇濆瓨 30 澶�
    if (checkNum(hours)) {
        hourstay = hours;
    }
    var exp = new Date();
    exp.setTime(exp.getTime() + hourstay * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

function getCookie(name) {
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return unescape(arr[2]);
    return null;
}

function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

function checkNum(nubmer) {
    var re = /^[0-9]+.?[0-9]*$/; //鍒ゆ柇瀛楃涓叉槸鍚︿负鏁板瓧     //鍒ゆ柇姝ｆ暣鏁� /^[1-9]+[0-9]*]*$/
    if (re.test(nubmer)) return true;
    return false;
}
