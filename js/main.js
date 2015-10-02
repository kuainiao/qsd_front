var qiongsandai_domain = ".qiongsandai.com";
var qiongsandai_www = "http://www.qiongsandai.com";
var qiongsandai_haitao = "http://haitao.qiongsandai.com";
var qiongsandai_faxian = "http://faxian.qiongsandai.com";
var qiongsandai_jingyan = "http://jingyan.qiongsandai.com";
var qiongsandai_news = "http://news.qiongsandai.com";
var qiongsandai_show = "http://shaiwu.qiongsandai.com";
var qiongsandai_test = "http://test.qiongsandai.com";
var qiongsandai_qingdan = "http://qingdan.qiongsandai.com";
var qiongsandai_yuanchuang = "http://post.qiongsandai.com";
var cookie_length_limit = 20;
var comment_report_cookiename = "comment_report";
window.comment_report_cookie_list;
var comment_rating_cookiename = "comment_rating";
window.comment_rating_cookie_list;
var youhui_collection = qiongsandai_www + "/user/collection";
var faxian_collection = qiongsandai_www + "/user/love";
var show_collection = qiongsandai_www + "/user/show_love";
var jingyan_collection = qiongsandai_www + "/user/jy_love";
var haitao_collection = qiongsandai_www + "/user/haitao_love";
var news_collection = qiongsandai_www + "/user/news_love";
var test_collection = qiongsandai_www + "/user/test_love";
var yuanchuang_collection = qiongsandai_www + "/user/post_love";
var no_avatar = "http://res.qiongsandai.com/images/header/default_small.png";
var ad_scroll = 2;
var StringBuilder = function(b) {
    this.s = new Array(b);
    this.onMultiAppendBeforeHandle = null;
    this.onMultiAppendBefore = function(c) {
        this.onMultiAppendBeforeHandle = c;
        return this;
    };
    this.append = function(c) {
        this.s.push(c);
        return this;
    };
    this.toString = function() {
        return this.s.join("");
    };
    this.clear = function() {
        this.s = new Array();
    };
    this.appendMultiFormat = function(d, e) {
        if (typeof (e) == "object") {
            for (var c in e) {
                if (this.onMultiAppendBeforeHandle != null) {
                    this.onMultiAppendBeforeHandle(e[c]);
                }
                this.appendFormat(d, e[c]);
            }
        }
        return this;
    };
    this.appendFormat = function() {
        var p = arguments.length;
        if (p == 0) {
            return this;
        }
        var l = arguments[0];
        if (p == 1) {
            return this.append(l);
        }
        var d = arguments[1];
        if (d == null) {
            d = "";
        }
        var h, m, o, g, j;
        if (typeof (d) == "object") {
            j = function(c, e) {
                return c[1][e];
            };
        } else {
            j = function(c, e) {
                return c[e - 0 + 1];
            };
        }
        for (h = 0; h < l.length; ) {
            o = l.charAt(h);
            if (o == "{") {
                m = l.indexOf("}", h);
                g = l.substring(h + 1, m);
                this.s.push(j(arguments, g));
                h = m + 1;
                continue;
            }
            this.s.push(o);
            h++;
        }
        return this;
    };
};
function Base64() {
    _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    this.encode = function(d) {
        var b = "";
        var l, j, g, k, h, f, e;
        var c = 0;
        d = _utf8_encode(d);
        while (c < d.length) {
            l = d.charCodeAt(c++);
            j = d.charCodeAt(c++);
            g = d.charCodeAt(c++);
            k = l >> 2;
            h = ((l & 3) << 4) | (j >> 4);
            f = ((j & 15) << 2) | (g >> 6);
            e = g & 63;
            if (isNaN(j)) {
                f = e = 64;
            } else {
                if (isNaN(g)) {
                    e = 64;
                }
            }
            b = b + _keyStr.charAt(k) + _keyStr.charAt(h) + _keyStr.charAt(f) + _keyStr.charAt(e);
        }
        return b;
    };
    this.decode = function(d) {
        var b = "";
        var l, j, g;
        var k, h, f, e;
        var c = 0;
        d = d.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (c < d.length) {
            k = _keyStr.indexOf(d.charAt(c++));
            h = _keyStr.indexOf(d.charAt(c++));
            f = _keyStr.indexOf(d.charAt(c++));
            e = _keyStr.indexOf(d.charAt(c++));
            l = (k << 2) | (h >> 4);
            j = ((h & 15) << 4) | (f >> 2);
            g = ((f & 3) << 6) | e;
            b = b + String.fromCharCode(l);
            if (f != 64) {
                b = b + String.fromCharCode(j);
            }
            if (e != 64) {
                b = b + String.fromCharCode(g);
            }
        }
        b = _utf8_decode(b);
        return b;
    };
    _utf8_encode = function(d) {
        d = d.replace(/\r\n/g, "\n");
        var b = "";
        for (var f = 0; f < d.length; f++) {
            var e = d.charCodeAt(f);
            if (e < 128) {
                b += String.fromCharCode(e);
            } else {
                if ((e > 127) && (e < 2048)) {
                    b += String.fromCharCode((e >> 6) | 192);
                    b += String.fromCharCode((e & 63) | 128);
                } else {
                    b += String.fromCharCode((e >> 12) | 224);
                    b += String.fromCharCode(((e >> 6) & 63) | 128);
                    b += String.fromCharCode((e & 63) | 128);
                }
            }
        }
        return b;
    };
    _utf8_decode = function(b) {
        var d = "";
        var e = 0;
        var f = c1 = c2 = 0;
        while (e < b.length) {
            f = b.charCodeAt(e);
            if (f < 128) {
                d += String.fromCharCode(f);
                e++;
            } else {
                if ((f > 191) && (f < 224)) {
                    c2 = b.charCodeAt(e + 1);
                    d += String.fromCharCode(((f & 31) << 6) | (c2 & 63));
                    e += 2;
                } else {
                    c2 = b.charCodeAt(e + 1);
                    c3 = b.charCodeAt(e + 2);
                    d += String.fromCharCode(((f & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                    e += 3;
                }
            }
        }
        return d;
    };
}
var qiongsandai_user_view = getCookie("qiongsandai_user_view");
if (qiongsandai_user_view == "" || qiongsandai_user_view == null || qiongsandai_user_view == "1") {
    var expiresTimes = 20 * 60 * 1000;
    var guid = guidGenerator();
    setCookie("qiongsandai_user_view", guid, expiresTimes, "/", ".qiongsandai.com");
}
var qiongsandai_user_source = getCookie("qiongsandai_user_source");
if (qiongsandai_user_source == "" || qiongsandai_user_source == null || qiongsandai_user_view == "1") {
    var expiresTimes = 2 * 365 * 24 * 60 * 60 * 1000;
    var guid = guidGenerator();
    setCookie("qiongsandai_user_source", guid, expiresTimes, "/", ".qiongsandai.com");
}
function guidGenerator() {
    var b = function() {
        return (((1 + Math.random()) * 65536) | 0).toString(16).substring(1);
    };
    return (b() + b() + b() + b() + b() + b() + b() + b()).toUpperCase();
}
function tab(b, c, d, e) {
    if (e == "click") {
        $(b).click(function() {
            $(this).addClass(d).siblings().removeClass(d);
            $(c).hide().eq($(b).index(this)).show();
        });
    } else {
        if (e == "hover") {
            $(b).mouseover(function() {
                $(this).addClass(d).siblings().removeClass(d);
                $(c).hide().eq($(b).index(this)).show();
            });
        }
    }
}
function listIntoGraphic(b) {
    $(b).find("li").mouseover(function() {
        $(this).removeClass("listItem").addClass("listCurrent").siblings().removeClass("listCurrent").addClass("listItem");
    });
}
function showHide(d, c, e) {
    var b;
    $(d).mouseover(function() {
        $(this).addClass(c);
        $(this).find(e).show();
        clearTimeout(b);
    });
    $(d).mouseout(function() {
        b = setTimeout(function() {
            $(d).removeClass(c);
            $(d).find(e).hide();
        }, 100);
    });
}
function showHideClick(b, c) {
    $(b).unbind("click").click(function() {
        var d = $(this).parent().find(c);
        if (d.is(":hidden")) {
            d.css("display", "block");
        } else {
            d.css("display", "none");
            d.find("i.i_checkbox").show().removeClass("icon-loginkuangright").removeClass("icon-rightframe");
            d.find(".checkbox_hide").removeAttr("checked");
            d.find(":text").each(function() {
                var e = $(this).attr("default_value");
                $(this).val(e);
                $(this).css("color", "#999");
            });
            d.find(".link_box").each(function() {
                var e = $(this).find(":button").val();
                if (e == "-") {
                    $(this).remove();
                }
            });
        }
        if ($(this).find("i").hasClass("icon-rightframe")) {
            $(this).find("i").removeClass("icon-rightframe");
            $(this).find("i").prev().removeAttr("checked");
        } else {
            $(this).find("i").addClass("icon-rightframe");
            $(this).find("i").prev().attr("checked", "true");
        }
    });
}
function openClose(c, b, g) {
    if (g == "mallNav") {
        $(c).click(function() {
            $(this).prev().css("height", "auto");
            $(this).hide();
            $(this).next("a").show();
        });
        $(b).click(function() {
            $(this).parent().find("ul").css("height", "64px");
            $(this).hide();
            $(this).prev("a").show();
        });
    } else {
        if (g == "comments") {
            var f = $("blockquote").length;
            for (var d = 0; d < f; d++) {
                var e = $(c).prev(".comment_con").eq(d).height();
                if (parseInt($(c).prev(".comment_con").eq(d).height()) > 120) {
                    $(c).prev(".comment_con").eq(d).height(120);
                    $(c).eq(d).css("display", "block");
                } else {
                    $(c).eq(d).css("display", "none");
                }
            }
            $(c).click(function() {
                $(this).prev().css({"height": "auto","max-height": "100%"});
                $(this).hide();
            });
        }
    }
}
function indexTagChange() {
    var b;
    $(".cateBlock , .more_cate").hover(function() {
        var c;
        if ($(this).hasClass("cateBlock")) {
            c = $(this).index(".cateBlock");
        } else {
            c = $(this).index(".more_cate");
        }
        clearTimeout(b);
        $(".cateBlock").eq(c).addClass("cateCurrent").siblings().removeClass("cateCurrent");
        $(".more_cate").hide().eq(c).show();
    }, function() {
        var c;
        if ($(this).hasClass("cateBlock")) {
            c = $(this).index(".cateBlock");
        } else {
            c = $(this).index(".more_cate");
        }
        b = setTimeout(function() {
            $(".cateBlock").eq(c).removeClass("cateCurrent");
            $(".more_cate").eq(c).hide();
        }, 200);
    });
}
function popPosition(f) {
    var e = $(window).width();
    var c = $(window).height();
    var b = $(f).width();
    var d = $(f).height();
    $(f).css({left: e / 2 - b / 2,top: c / 2 - d / 2});
}
function popClose(b) {
    $(b).find(".pop-close").click(function() {
        $("#cover").hide();
        $(b).hide();
    });
    $("#cover").click(function() {
        $("#cover").hide();
        $(b).hide();
    });
}
function popUp(d, e, b) {
    if (d != "") {
        $(d).click(function() {
            popPosition(e);
            $("#cover").show();
            $(e).show();
            popClose(e);
        });
    } else {
        $(e).find(".pop_info").text(b);
        popPosition(e);
        $("#cover").show();
        $(e).show();
        var c = setTimeout(function() {
            $("#cover").hide();
            $(e).hide();
        }, 2000);
        $(e).find(".pop-close").click(function() {
            clearTimeout(c);
            $("#cover").hide();
            $(e).hide();
        });
        $("#cover").click(function() {
            clearTimeout(c);
            $("#cover").hide();
            $(e).hide();
        });
    }
}
function noMoreList() {
    if ($(".listNoMore").length == 0) {
        $(".leftWrap .list:last").after('<p class="listNoMore">没有更多文章了</p>');
    }
    scrollUnbind();
}
function more_link(b) {
    $(b).hover(function() {
        $(this).css("z-index", "6").find(".more_buy").show();
        $(this).find(".icon-down").removeClass().addClass("icon-up");
    }, function() {
        $(this).css("z-index", "2").find(".more_buy").hide();
        $(this).find(".icon-up").removeClass().addClass("icon-down");
    });
}
function setCurrentPage(e) {
    var c = $(".pagedown").find("a").attr("href");
    var b = c.split("/p");
    if ($(".pageup").length > 0) {
        var f = b[0] + "/p" + (e - 1);
        $(".pageup").find("a").attr("href", f);
    }
    if ($(".pagedown").length > 0) {
        var d = b[0] + "/p" + (e + 1);
        $(".pagedown").find("a").attr("href", d);
    }
    $(".pagination").find(".pageCurrent").removeClass("pageCurrent");
    $(".pagination").find("li").each(function() {
        var g = $(this).find("a").html();
        if (g == e) {
            $(this).find("a").addClass("pageCurrent");
        }
    });
}
function scrollStart() {
    var b = $(".leftWrap .list").length;
}
function scrollBind() {
    if ($("#channel").length > 0) {
        $(window).bind("scroll", scrollStart);
    }
}
function scrollUnbind() {
    $(window).unbind("scroll", scrollStart);
}
function bindEventAfterLoad() {
    if (getCookie("post_permission") && typeof (getCookie("post_permission")) != undefined) {
        listAddEditStart();
    }
    var c = $(".pagination .pageCurrent").text();
    var b = parseInt(c);
    setCurrentPage(b + 1);
    set_rating_current();
    set_collect_current();
    set_loverating_current();
    more_link(".buy");
}
function fixFooterPosition(d) {
    var c = $(window).height();
    var b = 110 + $(".wrap").height();
    if (c - b >= 80) {
        $(d).css({"position": "fixed","left": "0","bottom": "0"});
    } else {
        $(d).css("position", "static");
    }
}
function voteTopic(d, f, c, e, b) {
    $(d).unbind("click").click(function() {
        if (!$(this).find("i").is(":hidden")) {
            if ($(this).find("i").hasClass(c)) {
                $(this).find("i").removeClass(c);
                $(this).find("i").prev().removeAttr("checked");
            } else {
                $(this).find("i").addClass(c);
                $(this).find("i").prev().attr("checked", "true");
            }
            $(e).each(function() {
                if ($(this).find("." + c).length == f) {
                    $(this).find("i").each(function() {
                        if (!$(this).hasClass(c)) {
                            $(this).hide();
                        }
                    });
                } else {
                    $(this).find("i").each(function() {
                        if (!$(this).hasClass(c)) {
                            $(this).show();
                        }
                    });
                }
            });
            if ($(e).find("." + c).length > 0 && $(e).find("." + c).length < 4) {
                $(d).parents("form").find(b).addClass("btn_voteCurrent").attr("disabled", false);
            } else {
                $(d).parents("form").find(b).removeClass("btn_voteCurrent").attr("disabled", true);
            }
        }
    });
}
function clearCheckboxInput() {
    if ($(".bl_div_switch").length != 0) {
        var b = $(".bl_div_switch");
        $(b).find(".bl_switch").hide();
        $("i.i_checkbox").show().removeClass("icon-loginkuangright").removeClass("icon-rightframe");
        $(b).find(":text").each(function() {
            var c = $(this).attr("default_value");
            $(this).val(c);
            $(this).css("color", "#999");
        });
        $(b).find(".link_box").each(function() {
            var c = $(this).find(":button").val();
            if (c == "-") {
                $(this).remove();
            }
        });
    }
}
function showError(b, c) {
    b.html(c).fadeIn().delay(3000).fadeOut();
}
function login() {
    $("#btn_login").click(function() {
        var l = $(".notice_error");
        var b = $.trim($("#user_login").val());
        var j = $("#user_pass").val();
        var k = $.trim($("#captcha").val());
        var m = $("#rememberme").is(":checked") + 0;
        var e = $.trim($("#is_third").val());
        var d = $("#is_pop_login").val();
        if (b == "") {
            showError(l, "请输入用户名或邮箱");
        } else {
            if (j == "") {
                showError(l, "请输入密码");
            } else {
                if ($(".captcha_switch").is(":visible") && k == "") {
                    showError(l, "请输入验证码");
                } else {
                    var g = new Base64();
                    var o = 0;
                    if ($("#rememberme").is(":checked")) {
                        o = 1;
                    }
                    var c = "";
                    if (k == "geetest") {
                        var p = ["geetest_challenge", "geetest_validate", "geetest_seccode"];
                        for (var f in p) {
                            c += "&" + p[f] + "=" + encodeURIComponent($("input[name=" + p[f] + "]").val());
                        }
                    }
                    var h = $("#user_domain").val() + "/user/login/jsonp_check";
                    $.ajax({type: "get",url: h,data: "user_login=" + encodeURIComponent(b) + "&user_pass=" + encodeURIComponent(j) + "&rememberme=" + m + "&is_third=" + e + "&is_pop=" + d + "&captcha=" + k + c,dataType: "jsonp",jsonp: "callback",success: function(r) {
                        var t = r.data.redirect_to;
                        var s = r.data.is_use_captcha;
                        var x = r.error_code;
                        if (t != "" && t != undefined) {
                            window.location.href = t;
                        } else {
                            if (s) {
                                var v = $("#captcha_img").attr("data-src");
                                $("#captcha_img").attr("src", v);
                                $(".captcha_switch").show();
                            }
                            if (x == 0) {
                                if ($("#pop-login").length > 0) {
                                    location.reload();
                                } else {
                                    var q = $.trim($("#redirect_to").val());
                                    if ("" == q) {
                                        q = "http://www.qiongsandai.com";
                                    }
                                    window.location.href = q;
                                }
                            }
                            var w = r.error_msg;
                            for (var u in w) {
                                showError(l, w[u]);
                                break;
                            }
                        }
                    },error: function() {
                        showError(l, "网络错误，请稍后重试");
                    }});
                }
            }
        }
        return false;
    });
}
function showRegError(b, c) {
    b.siblings(".icon-loginright").hide().end().siblings(".error").html(c).show();
}
function register() {
    $("#register_form,#login_form").find(".form-input").each(function() {
        $(this).focus(function() {
            $(this).siblings(".error").hide();
            if ($(this).siblings(".grey").length > 0) {
                $(this).siblings(".grey").show();
            }
        });
    });
    $("#user_email").blur(function() {
        var c = $(this);
        var b = $.trim(c.val());
        if (b != "") {
        } else {
            showRegError($(this), "不能为空");
        }
    });
    $("#user_pass").blur(function() {
        var b = $(this).val();
        $(this).siblings(".grey").hide();
        if (b != "") {
            if (b.length < 6 || b.length > 20) {
                showRegError($(this), "请将长度控制在6-20以内");
            } else {
                $(this).siblings(".error").hide().end().siblings(".icon-loginright").show();
            }
            if ($("#user_pass2").siblings(".error").is(":visible") && b == $("#user_pass2").val()) {
                $("#user_pass2").siblings(".error").hide().end().siblings(".icon-loginright").show();
            }
        } else {
            showRegError($(this), "不能为空");
        }
    });
    $("#user_pass2").blur(function() {
        var c = $("#user_pass").val();
        var b = $(this).val();
        if (b != "") {
            if (b != c) {
                showRegError($(this), "密码不一致");
            } else {
                $(this).siblings(".error").hide().end().siblings(".icon-loginright").show();
            }
        } else {
            showRegError($(this), "不能为空");
        }
    });
    $("#display_name").blur(function() {
        var c = $(this);
        var b = c.val();
        $(this).siblings(".grey").hide();
        if (b != "") {
            $.ajax({type: "post",url: "/user/register/ajax_check_display_name",data: "display_name=" + encodeURIComponent(b),dataType: "json",success: function(d) {
                var g = d.error_code;
                var f = d.error_msg;
                if (g == 0) {
                    c.siblings(".error").hide().end().siblings(".icon-loginright").show();
                } else {
                    for (var e in f) {
                        showRegError(c, f[e]);
                        break;
                    }
                }
            },error: function() {
                showRegError(c, "网络错误，请稍后重试");
            }});
        } else {
            showRegError(c, "不能为空");
        }
    });
    $("#register_form #captcha").blur(function() {
        var c = $(this);
        var b = c.val();
        if (b != "") {
            $.ajax({type: "post",url: "/user/getcaptcha/ajax_check/register",data: "captcha=" + b,dataType: "json",success: function(d) {
                var f = d;
                var e = $("#captcha_error_text");
                var g = $("#captcha_success");
                if (f) {
                    e.hide();
                    g.show();
                } else {
                    g.hide();
                    e.html("验证码不正确").show();
                }
            },error: function() {
                showRegError(c, "网络错误，请稍后重试");
            }});
        } else {
            showRegError(c, "不能为空");
        }
    });
    $("#register_form").submit(function() {
        var d = $(this).find(".icon-loginright:visible").length;
        var e = new Base64();
        var g = $.trim($("#user_email").val());
        var f = $("#user_pass").val();
        var j = $("#user_pass2").val();
        var b = $.trim($("#display_name").val());
        var h = $.trim($("#captcha").val());
        var k = $("#agreement").is(":checked");
        var c = $(this).find("input[type='submit']");
        c.attr("disabled", "disabled").removeClass("btn_reg").addClass("btn_grey");
        if (d >= 4 && $("#agreement").is(":checked")) {
            $("#display_name").val(b);
            return true;
        } else {
            if (g == "") {
                $(".notice_error").html("邮箱不能为空");
            } else {
                if (f == "") {
                    $(".notice_error").html("密码不能为空");
                } else {
                    if (j == "") {
                        $(".notice_error").html("确认密码不能为空");
                    } else {
                        if (b == "") {
                            $(".notice_error").html("昵称不能为空");
                        } else {
                            if (h == "") {
                                $(".notice_error").html("验证码不能为空");
                            } else {
                                if (!k) {
                                    $(".notice_error").html("未同意《什么值得买用户使用协议》");
                                }
                            }
                        }
                    }
                }
            }
            setTimeout(function() {
                $(".notice_error").html("");
                c.removeAttr("disabled").removeClass("btn_grey").addClass("btn_reg");
            }, 3000);
            return false;
        }
    });
}
function editUrlFilter(d, c) {
    var b = "http://bgm.qiongsandai.com/post/post/post_detail?id=" + c;
    switch (d) {
        case 2:
            b = "http://bgm.qiongsandai.com/love/love/add_love?get_love_id=" + c;
            break;
        case 3:
            b = "http://bgm.qiongsandai.com/ordershow/ordershow/os_edit/" + c;
            break;
        case 4:
            b = "http://bgm.qiongsandai.com/experience/experience/ex_edit/" + c;
            break;
        case 5:
            b = "http://bgm.qiongsandai.com/haitao/haitao/add?get_haitao_id=" + c;
            break;
        case 6:
            b = "http://bgm.qiongsandai.com/news/news/edit/" + c;
            break;
        case 7:
            b = "http://bgm.qiongsandai.com/probation/probreport/detail/" + c;
            break;
        case 11:
            b = "http://post.bgm.qiongsandai.com/edit/" + c;
            break;
    }
    return b;
}
function addEditInterface(g) {
    if (g.attr("articleid") != undefined) {
        var e = g.attr("articleid").split("_");
        var f = parseInt(e[0]);
        var d = parseInt(e[1]);
        var b = g.find(".lrTop");
        var c = editUrlFilter(f, d);
        if (g.find(".lrTop").length == 0) {
            if (f == 2) {
                b = g.find(".itemUserInfo");
            } else {
                if (f == 3) {
                    b = g.find(".listItem");
                }
            }
        }
        b.append('<span class="edit_interface"><a href="' + c + '" target="_blank">编辑</a></span>');
    }
}
function listAddEditStart() {
    $(".list").each(function() {
        if ($(this).find(".edit_interface").length == 0) {
            addEditInterface($(this));
        }
    });
}
function detailAddEditStart() {
    var d = parseInt($("#channelID").val());
    var c = parseInt($("#articleID").val());
    var b = editUrlFilter(d, c);
    $(".article_meta:first").append('<span class="edit_interface"><a href="' + b + '" target="_blank">编辑</a></span>');
}
function showHidenNotice(c, b) {
    if (!$(b).is(":hidden")) {
        $(c).hover(function() {
            $(b).hide();
        }, function() {
            $(b).show();
        });
    }
}
function login_reg_input(b) {
    SetInputCss(b);
    $(b).mouseup(function() {
        SetInputCss(b);
    });
    $(b).blur(function() {
        if ($.trim($(this).val()) == "") {
            $(this).removeClass("form-input-focus");
            $(this).prev().removeClass("item-tip-focus");
        }
    });
    $(b).focus(function() {
        if (!$(this).hasClass("form-input-focus")) {
            $(this).addClass("form-input-focus");
            $(this).prev().addClass("item-tip-focus");
        }
    });
    $(".item-tip").click(function() {
        $(this).next().focus();
    });
}
function SetInputCss(b) {
    $(b).each(function() {
        if ($.trim($(this).val()) != "") {
            $(this).addClass("form-input-focus");
            $(this).prev().addClass("item-tip-focus");
        }
    });
}
slidingFunction = function() {
    var k = navigator.userAgent.toLowerCase();
    var o = {IE: /msie/.test(k),OPERA: /opera/.test(k),MOZ: /gecko/.test(k),IE5: /msie 5 /.test(k),IE55: /msie 5.5/.test(k),IE6: /msie 6/.test(k),IE7: /msie 7/.test(k),SAFARI: /safari/.test(k)};
    var m = $("#footer").height();
    var g = $(window).width();
    var r = $(window).height();
    var f = $("section.wrap").width();
    var h = $("#leftLayer").height();
    var j = $("#rightLayer").height();
    var q = g / 2 - f / 2 - 10 - 48;
    var d = r / 2 - h / 2 - 50;
    if (q > 0) {
        $("#leftLayer").show().css({"left": q,"top": d});
        $("#rightLayer").show().css("right", q);
    } else {
        if (q = 0) {
            $("#leftLayer").show().css({"left": 0,"top": d});
            $("#rightLayer").show().css("right", 0);
        } else {
            $("#leftLayer").hide();
            $("#rightLayer").hide();
        }
    }
    var c = document.body.scrollTop || document.documentElement.scrollTop;
    (c > 300) ? $("#backToTop").css("display", "block") : $("#backToTop").css("display", "none");
    if (o.IE6) {
        $("#rightLayer").css("top", c + r - 166);
    }
    var p = $("body").height();
    var e = document.getElementById("rightLayer");
    if (e) {
        var b = $("#rightLayer").height() + 18;
        if (p <= c + r + m - b + 135) {
            var l = c + r + m + 20 - p;
            $("#rightLayer").css({position: "fixed",bottom: l});
        } else {
            $("#rightLayer").css({position: "fixed",bottom: 0});
        }
    }
};
function imgResizeFit() {
    if ($(".img-need-resize").length > 0) {
        $(".img-need-resize").each(function() {
            var b = $(this).attr("src");
            $(this).attr("src", "");
            this.onload = function() {
                var e = $(this).parent().innerWidth();
                var j = $(this).parent().innerHeight();
                var c = $(this).width();
                var d = $(this).height();
                var g = c / d;
                if (g > 1) {
                    var f = e / g;
                    $(this).width(e);
                    $(this).height(f);
                    $(this).css("margin-top", j / 2 - f / 2);
                } else {
                    $(this).width(j * g);
                    $(this).height(j);
                }
            };
            $(this).attr("src", b);
        });
    }
}
function fixed_right(d) {
    if ($("#footer").length > 0 && $(".rightPanel").length > 0) {
        var k = d, q = 0, o = $("header").height(), m = $("#footer").height(), b = $(window).height(), r = $(".leftWrap").height(), f = $("aside").height(), c = $(".rightPanel:last"), p = $(".g_g:last"), l = $(".g_g").length, e, g, j, h;
        if (k == 1) {
            g = c.offset().top;
            j = c.outerHeight(true);
        }
        if (k == 2) {
            g = c.prev().offset().top;
            j = c.outerHeight(true) + c.prev().outerHeight(true);
        }
        $(window).scroll(function() {
            q = $(window).scrollTop();
            e = l > 0 ? (p.outerHeight(true) + 40) : 0;
            var u = $("#footer").offset().top;
            if (r > f) {
                if (q >= g) {
                    if (k == 2) {
                        c.prev().css({"position": "fixed","top": "40px"});
                        h = 40 + c.prev().outerHeight(true);
                        c.css({"position": "fixed","top": h});
                    } else {
                        if (k == 1) {
                            c.css({"position": "fixed","top": "40px"});
                        }
                    }
                } else {
                    if (q < g) {
                        c.prev().css({"position": "static","top": "0"});
                        c.css({"position": "static","top": "0"});
                    }
                }
                if (q > u - e - j) {
                    var t = u - e - q - j;
                    var s = t + c.prev().outerHeight(true);
                    if (k == 2) {
                        c.prev().css({"position": "fixed","top": t});
                        c.css({"position": "fixed","top": s});
                    }
                    if (k == 1) {
                        c.css({"position": "fixed","top": t});
                    }
                }
            }
        });
    }
}
$.fn.autoTextarea = function(b) {
    if ($("#quickReply")) {
        var d = {maxHeight: null,minHeight: $(this).height()};
        var c = $.extend({}, d, b);
        $(this).bind("paste cut keydown keyup focus blur", function() {
            var f, g = this.style;
            this.style.height = c.minHeight + "px";
            var e = $(this).css("padding-top").split("", 1);
            var h = parseInt(e);
            if (this.scrollHeight > c.minHeight) {
                if (c.maxHeight && this.scrollHeight > c.maxHeight) {
                    f = c.maxHeight - h;
                    g.overflowY = "scroll";
                } else {
                    f = this.scrollHeight - h;
                    g.overflowY = "hidden";
                }
                g.height = (f - h) + "px";
            }
        });
    }
};
function anchorJump(e) {
    if ($(e).length != 0) {
        var b = $(e).offset().top;
        var c = $(e).outerHeight(true) + $(".navBarWrap").height();
        var d = $(".navBarWrap").height() + $("header").outerHeight(true) + $(".crumbs").height() + $("article").height() + 17 - $(e).outerHeight(true);
        $(window).scroll(function() {
            if ($(window).scrollTop() >= b && $(window).scrollTop() < d) {
                $(e).css({"position": "fixed","top": "32px","width": "690px"});
                $(".news_content").css("padding-top", c - $(".navBarWrap").height());
            } else {
                if ($(window).scrollTop() < b || $(window).scrollTop() > d) {
                    $(e).css("position", "static");
                    $(".news_content").css("padding-top", "0");
                }
            }
            highLight();
        });
    }
}
function anchorClick(b) {
    if ($(b).length != 0) {
        $(b).find("a").each(function() {
            $(this).click(function() {
                var e = $(b).outerHeight(true) + $(".navBarWrap").height();
                var d = $(this).attr("class");
                var c = $("#" + d).offset().top;
                $("html,body").animate({scrollTop: c - e}, 150);
                return false;
            });
        });
    }
}
function foundList(g, f, k, j, h) {
    if ($(g).length == 0) {
        $(f).hide();
    } else {
        $(f).css({marginBottom: "10px",paddingLeft: "10px",paddingRight: "10px",borderStyle: "solid",borderColor: "#dcdcdc",borderWidth: "1px"});
        $(f).find("dd").css({padding: "10px"});
        $(f).fadeIn();
        $(g).clone(true).appendTo(h).wrapInner('<a href=""></a>');
        $(k).attr("href", "javascript:void(0);");
        $(g).each(function(b) {
            $(this).attr("id", "cl_" + b);
        });
        $(k).each(function(b) {
            $(this).addClass("cl_" + b);
            $(this).children().css({color: "",fontSize: ""});
        });
        $(g).each(function(b) {
            $(this).attr("id", "cl_" + b);
            var c = $(".cl_" + b).html();
            $(".cl_" + b).attr("title", c);
        });
        $(j).each(function(b) {
            if ((b + 1) % 4 == 0) {
                $(j).eq(b).addClass("last");
            }
        });
    }
}
function highLight() {
    $(".news_content>h2").each(function(c) {
        var b = $(this).offset().top - $(".list_catalogue").outerHeight(true) - $(".navBarWrap").height();
        var d = $(window).scrollTop();
        if (d >= b) {
            $(".list_catalogue dd h2 a").css({"color": "#5188a6","font-weight": "normal"});
            $(".list_catalogue dd h2 a").eq($(".news_content>h2").index(this)).css({"color": "#333","font-weight": "bold"});
        } else {
            $(".list_catalogue dd h2 a").eq($(".news_content>h2").index(this)).css({"color": "#5188a6","font-weight": "normal"});
        }
    });
}
function banner_pages(b) {
    a = $(b).find(".slick-dots").find(".slick-active a").html();
    n = $(b).find(".slick-dots li:last a").html();
    if (a == undefined || n == undefined) {
        $(b).find(".custom_page").hide();
    } else {
        $(b).find(".custom_page").html(a + " / " + n);
        setTimeout(function() {
            banner_pages(b);
        }, 0);
    }
}
function scored(d, c) {
    var b = $(d);
    if (b.find("a").hasClass(c)) {
        b.mouseover(function() {
            $(this).find("." + c).css("display", "none");
            $(this).find(".scoredInfo").css("display", "block");
        });
        b.mouseout(function() {
            $(this).find("." + c).css("display", "block");
            $(this).find(".scoredInfo").css("display", "none");
        });
    }
}
function showMore(e, c, b) {
    var d = $(c).outerHeight();
    if (d > b) {
        $(e).css("display", "block");
        $(c).css("height", "100px");
        $(e).bind("click", function() {
            $(c).css("height", "auto");
            $(this).hide();
        });
    }
}
function picScroll(b) {
	$(b).each(function() {
		var e = $(this).find(".smallImgList li").length;
		var k = $(this).find(".smallImgList li").outerWidth();
		var m = e * k;
		var f = 0;
		var c;
		var o = 7;
		var h = $(this).find(".smallImgList li").eq(0).find("a").attr("rel");
		var l = "<img src=" + h + '  alt="" />';
		$(this).find(".aimgcon").html(l);
		$(this).find(".smallImgList").css("width", m + "px");
		$(this).find(".smallImgList li").each(function(j) {
			$(this).click(function() {
				clearInterval(c);
				$(this).siblings("li").removeClass("thisimg").end().addClass("thisimg");
				f = j;
				var r = $(this).find("a").attr("rel");
				var q = "<img src=" + r + '  alt="" />';
				var s = '<span class="imgLoading"><img src="img/loading.gif" alt="图片加载中" title="图片加载中" /></span>';
				var p = $(this).parents(b);
				p.find(".aimgcon").html(q).fadeIn("slow");
				p.find(".imgLoading").remove();
				p.find(".imgContent").append(s);
				p.find(".aimgcon img").load(function() {
					p.find(".imgLoading").remove();
					p.find(".aimgcon img").fadeIn("slow");
				});
				return false;
			});
		});
		$(this).find(".img-next").click(function() {
			clearInterval(c);
			if (!$(this).find(".smallImgList").is(":animated")) {
				f++;
				f = f % e;
				var q = $(this).parents(b).find(".smallImgList li");
				var r = q.eq(f).find("a").attr("rel");
				q.removeClass();
				q.eq(f).addClass("thisimg");
				var p = "<img src=" + r + '  alt="" />';
				var s = '<span class="imgLoading"><img src="img/loading.gif" alt="图片加载中" title="图片加载中" /></span>';
				var j = $(this).parents(b);
				j.find(".aimgcon").html(p).fadeIn("slow");
				j.find(".imgLoading").remove();
				j.find(".imgContent").append(s);
				j.find(".aimgcon img").load(function() {
					j.find(".imgLoading").remove();
					j.find(".aimgcon img").fadeIn("slow");
				});
			}
			return false;
		});
		$(this).find(".img-prev").click(function() {
			clearInterval(c);
			if (!$(this).find(".smallImgList").is(":animated")) {
				f--;
				f = f % e;
				var q = $(this).parents(b).find(".smallImgList li");
				var r = q.eq(f).find("a").attr("rel");
				q.removeClass();
				q.eq(f).addClass("thisimg");
				var p = "<img src=" + r + '  alt="" />';
				var s = '<span class="imgLoading"><img src="img/loading.gif" alt="图片加载中" title="图片加载中" /></span>';
				var j = $(this).parents(b);
				j.find(".aimgcon").html(p).fadeIn("slow");
				j.find(".imgLoading").remove();
				j.find(".imgContent").append(s);
				j.find(".aimgcon img").load(function() {
					j.find(".imgLoading").remove();
					j.find(".aimgcon img").fadeIn("slow");
				});
			}
			return false;
		});
		if ($(this).find(".smallImgTab").length) {
			if (e > o) {
				$(this).find(".prevPic").show();
				$(this).find(".nextPic").show();
			}
			var g = Math.ceil(e / o),
				d = 0;
			$(this).find(".nextPic").click(function() {
				d++;
				d = d % g;
				var j = $(this).parent(".smallImgTab"),
					p = j.find(".smallImgList");
				if (d < g) {
					p.animate({
						left: -k * o * d
					});
				} else {
					if (d == g) {
						p.animate({
							left: 0
						});
					}
				}
			});
			$(this).find(".prevPic").click(function() {
				d--;
				d = d % g;
				var j = $(this).parent(".smallImgTab"),
					p = j.find(".smallImgList");
				if (d > -g && d < 0) {
					p.animate({
						left: k * o * (-(g + d))
					});
				} else {
					if (d == 0) {
						p.animate({
							left: 0
						});
					}
				}
			});
		}
	});
}
$(function() {
	picScroll(".banner_scroll");
	showMore("#baoliao_show", "#baoliao_info", 100);
	$(window).load(function() {
		anchorJump(".anchor_list");
		anchorJump(".list_catalogue");
	});
	anchorClick(".anchor_list");
	foundList(".news_content>h2", ".list_catalogue", ".list_catalogue dd h2 a", ".list_catalogue dd h2", ".list_catalogue dd");
	anchorClick(".list_catalogue");
	anchorClick(".xiTop");
	if ($(".slider").length > 0) {
		$(".banner_page").slick({
			dots: true,
			infinite: true,
			autoplay: true,
			draggable: false,
			pauseOnHover: true,
			autoplaySpeed: 10000,
			speed: 400,
			slidesToShow: 4,
			slidesToScroll: 4
		});
		$(".banner_nopage").slick({
			dots: false,
			infinite: true,
			autoplay: true,
			draggable: false,
			pauseOnHover: true,
			autoplaySpeed: 10000,
			speed: 400,
			slidesToShow: 4,
			slidesToScroll: 4
		});
		$(".single-item").slick({
			dots: true,
			infinite: true,
			autoplay: true,
			autoplaySpeed: 5000,
			speed: 400,
			slidesToShow: 1,
			slidesToScroll: 1
		});
		$(".AddSlider").slick({
			dots: true,
			infinite: true,
			autoplay: true,
			autoplaySpeed: 5000,
			speed: 400,
			slidesToShow: 1,
			draggable: false,
			pauseOnHover: true,
			slidesToScroll: 1
		});
	}
	$("#quickComment").autoTextarea({
		maxHeight: 200
	});
	if (zhiyou_open) {
		zhiyou_relate.request_zhiyou_info();
	} else {
		requestUserInfo();
	}
	voteTopic("#topicOnExp li", 3, "icon-rightframe", "#voteForm", "#voteBtn");
	voteTopic("#topicOnExpLeft li", 3, "icon-rightframe", "#topic_vote_form", "#topic_vote_btn");
	voteTopic(".inner_per_item span", 2, "icon-loginkuangright", ".bl_white_bg", "");
	$(".bl_other_link").each(function() {
		$(this).focus(function() {
			var EPl = $(this).parent();
			var length = $(this).parents(".bl_white_bg").find(".icon-loginkuangright").length;
			if (length < 2) {
				EPl.find("i").addClass("icon-loginkuangright");
				EPl.find(".checkbox_hide").attr("checked", "true");
			}
			var ishave = $(this).parent().siblings().find(".icon-loginkuangright").length;
			if (length == 1 && ishave == 1) {
				$(this).parents(".bl_white_bg").find("i").not(".icon-loginkuangright").hide();
			}
		});
	});
	if (zhiyou_open) {
		var config = {
			"redirect_url": encodeURIComponent(window.location.href)
		};
		zhiyou_relate.popup_login_init(config);
	} else {
		login();
		register();
	}
	tab(".tab_li", ".tab_info", "current_item", "hover");
	tab(".tab_set_li", ".tab_set_info", "current_item", "hover");
	tab(".tab_faxian_li", ".tab_info_con", "current_item", "hover");
	tab(".mult-nav span", ".mult-nav-part", "mult-nav-hover", "hover");
	more_link(".buy");
	indexTagChange();
	listIntoGraphic(".rightHotExp");
	listIntoGraphic(".rightHotNews");
	listIntoGraphic(".hotOverseaNews");
	showHide(".moreNav", "moreNavHover", ".more_moreNav");
	showHide(".submission", "submissionHover", ".more_submission");
	showHide(".login_Info", "login_InfoHover", ".more_login_Info");
	showHide(".share_box", "", ".more_share");
	showHide(".erweimaWrap", "", ".erweimaContent");
	showHide(".mobile-go-buy", "", ".more-app-go-buy");
	showHide(".weixin-go-buy", "", ".more-app-go-buy");
	showHide("#show-order", "", ".more-show-order");
	showHideClick(".span_checkbox", ".bl_switch");
	zhankaiCon(".ninePicBox li a img", ".tabCon");
	placehold(".input_style");
	placehold(".inputBox");
	placehold(".bl_other_link");
	$("#bl_select_cate").change(function() {
		var optionVal = $("#bl_select_cate").find("option:selected").val();
		if (optionVal == "1") {
			$(".bl_select_switch").css("display", "none");
			$(".bl_input_switch").css("display", "block");
			$(".bl_div_switch").css("display", "block");
			$("#span_price").css("display", "block");
		} else {
			if (optionVal == "0") {
				$(".bl_select_switch").css("display", "block");
				$(".bl_input_switch").css("display", "none");
				$(".bl_div_switch").css("display", "none");
				$("#span_price").css("display", "none");
			}
		}
	});
	openClose("a.more", "a.pickup", "mallNav");
	$(".button_add").bind("click", articleLinkAdd);
	$(".button_reduce").click(function() {
		$(this).parent().prevAll().addClass("moreitemlink");
		$(this).parent().next().removeClass("moreitemlink");
		$(this).parent().remove();
		var link_length = $(".good_link").length;
		if (link_length < 3) {
			$(".good_link").find(".button_add").removeClass("disabled");
		}
	});
	if (zhiyou_open) {
		$("#n
avBar_login, #user_info_tosign, #sign_login a").addClass("zhiyou_login");
	} else {
		popUp("#navBar_login", "#pop-login", "");
		popUp("#user_info_tosign", "#pop-login", "");
		popUp("#sign_login a", "#pop-login", "");
	}
	popUp(".upload_content img", ".large_img", "");
	login_reg_input(".form-input");
	slidingFunction();
	$(".goTotop").click(function() {
		$("html, body").animate({
			scrollTop: 0
		}, 150);
	});
	if ($("#channel").val() == "qingdan") {
		fixed_right(1);
	} else {
		var screenHeight = window.screen.height;
		if (screenHeight < 800) {
			fixed_right(1);
		} else {
			fixed_right(ad_scroll);
		}
	}
	fixFooterPosition("#footer_fixed");
	$(window).scroll(function() {
		slidingFunction();
	});
	if ($("#noListLoad").length == 0) {
		scrollBind();
	}
	$(window).resize(function() {
		fixFooterPosition("#footer_fixed");
		slidingFunction();
		if ($("#channel").val() == "qingdan") {
			fixed_right(1);
		} else {
			var screenHeight = window.screen.height;
			if (screenHeight < 800) {
				fixed_right(1);
			} else {
				fixed_right(ad_scroll);
			}
		}
	});
	imgResizeFit();
	set_collect_current();
	set_loverating_current();
	$("#quickComment").autoTextarea({
		maxHeight: 200
	});
	$("#voteBtn").click(function() {
		ga("send", "event", "经验盒子", "详情_系列_话题投票", "投票");
		$.ajax({
			url: "/add_vote",
			type: "post",
			data: $("#voteForm").serialize(),
			dataType: "json",
			success: function(data) {
				var d = data;
				if (d.error_code == 0) {
					$("#vote_part").html(d.back_view);
					$("#vote_count").html(d.vote_count);
					$(".voteAnimate").each(function() {
						var tmp_arr = $(this).attr("id").split("_");
						var vid = tmp_arr[1];
						if ($.inArray(vid, d.vote_items) != -1) {
							$(this).fadeIn().animate({
								top: "-5px"
							}, "normal").fadeOut(300);
						}
					});
					$(".progressing").each(function() {
						$(this).data("origWidth", $(this).width()).width(0).animate({
							width: $(this).data("origWidth")
						}, 1200);
					});
				} else {
					if (d.back_view) {
						$("#vote_part").html(d.back_view);
						$(".progressing").each(function() {
							$(this).data("origWidth", $(this).width()).width(0).animate({
								width: $(this).data("origWidth")
							}, 1200);
						});
					}
					alert(d.error_msg);
					return;
				}
			}
		});
	});
	$("#topic_vote_btn").click(function() {
		ga("send", "event", "经验盒子", "列表_话题_投票按钮", "");
		$.ajax({
			url: "/add_vote",
			type: "post",
			data: $("#topic_vote_form").serialize(),
			dataType: "json",
			success: function(data) {
				var d = data;
				$(".listItem .i_checkbox").hide();
				$("#topic_vote_btn").hide();
				if (d.error_code == 0) {
					$("#vote_part").html(d.back_view);
					$("#vote_count").html(d.vote_count);
					$("#topic_vote_btn").hide();
					$("#vote_comment").html("投票成功！");
					$("#topic_vote_count").html("&nbsp;" + d.vote_count + "&nbsp;");
					$(".voteAnimate").each(function() {
						var tmp_arr = $(this).attr("id").split("_");
						var vid = tmp_arr[1];
						if ($.inArray(vid, d.vote_items) != -1) {
							$(this).fadeIn().animate({
								top: "-5px"
							}, "normal").fadeOut(300);
						}
					});
					$(".progressing").each(function() {
						$(this).data("origWidth", $(this).width()).width(0).animate({
							width: $(this).data("origWidth")
						}, 1200);
					});
				} else {
					if (d.back_view) {
						$("#vote_part").html(d.back_view);
						$(".progressing").each(function() {
							$(this).data("origWidth", $(this).width()).width(0).animate({
								width: $(this).data("origWidth")
							}, 1200);
						});
					}
					$("#vote_comment").hide();
					alert(d.error_msg);
					return;
				}
			}
		});
	});
	$("#want_btn").click(function() {
		if ($.trim($("#want_txt").val()) != "" && $.trim($("#want_txt").val()) != "提交您想看到的其他经验吧~") {
			$.ajax({
				url: "/add_suggest",
				type: "post",
				data: $("#want_vote").serialize(),
				dataType: "json",
				success: function(data) {
					var d = eval(data);
					if (d.error_code == 0 || d.error_code == 1) {
						$("#want_txt").val("");
						$("#want_btn").removeClass(".btn_voteCurrent").attr("disabled", true);
						$("body").append('<div class="pop pop_no_title" id="pop-vote"><i class="pop-close icon-cross-lighter"><!--[if lt IE 8]>x<![endif]--></i><div class="pop-content oneLine"><i class="icon-loginright"><!--[if lt IE 8]>√<![endif]--></i><p class="pop_info"></p></div></div>');
						popUp("", "#pop-vote", d.error_msg);
					}
					return;
				}
			});
		} else {
			return;
		}
	});
	$("#want_txt").keydown(function() {
		if ($("#want_txt").val().length >= 4 && $.trim($("#want_txt").val()) != "提交您想看到的其他经验吧~") {
			$("#want_btn").addClass("btn_voteCurrent").attr("disabled", false);
		} else {
			$("#want_btn").removeClass("btn_voteCurrent").attr("disabled", true);
		}
	});
	var vote_period = getCookie("vote_period");
	if (vote_period != null && ($("#cur_vote").val() == vote_period || $("#topic_cur_vote").val() == vote_period)) {
		$("#vote_yet").hide();
		$("#voted").show();
		$(".listItem .i_checkbox").hide();
		$("#topic_vote_btn").hide();
		$("#vote_comment").hide();
		$(".voteProgressing").each(function() {
			$(this).data("origWidth", $(this).width()).width(0).animate({
				width: $(this).data("origWidth")
			}, 1200);
		});
	}
	if (getCookie("post_permission") && typeof(getCookie("post_permission")) != undefined) {
		if ($(".list").length > 0) {
			listAddEditStart();
		}
		if ($("#isDetail").length > 0) {
			detailAddEditStart();
		}
		if ($("#comments .tab_info .comment_listBox").length > 0) {
			$(".comment_listBox li.comment_list, .comment_listBox li.comment_list blockquote").each(function() {
				var commentID = $(this).attr("blockquote_cid");
				var userID = $(this).find(".user_name:first").attr("usmzdmid");
				if ($(this).hasClass("comment_list")) {
					var commentIdArray = $(this).attr("id").split("_");
					commentID = commentIdArray[commentIdArray.length - 1];
				}
				var mosaicDom = '<a href="javascript:void(0);" title="打码" onclick="mosaic_show_textarea(' + commentID + ')">打码</a>';
				if (zhiyou_open) {
					var blackListDom = '<a href="http://users.bgm.smzdm.com/blackroom/user_add?smzdm_id=' + userID + '" title="关小黑屋">关小黑屋</a>';
				} else {
					var blackListDom = '<a href="http://bgm.smzdm.com/blackroom/blackroom/user_add?user_smzdm_id=' + userID + '" title="关小黑屋">关小黑屋</a>';
				}
				if (userID == 0 || userID == undefined) {
					blackListDom = "";
				}
				var deleteDom = '<a href="javascript:void(0);" onclick="commentDelete(' + commentID + ',1)" title="删除">删除</a>';
				var editDom = "";
				var controls = mosaicDom + blackListDom + deleteDom + editDom;
				$(this).find(".dingNum:last").before(controls);
			});
		}
	}
	scored("#details-zan", "current");
});
function oncheckpage(b, c, f) {
    var e = $(f).parent().parent().find(".jumpToPage #input_num").val();
    var d = /^[1-9]+[0-9]*]*$/;
    if (d.test(e)) {
        if (e <= 0) {
            e = 1;
        }
        if (e > b) {
            e = b;
        }
        location.href = c + "1" + "#comments";
        if (e >= 1) {
            location.href = c + e + "#comments";
        }
    } else {
        alert("请输入有效数字！");
    }
    return true;
}
function json_encode(f) {
    var c = this.window.JSON;
    if (typeof c === "object" && typeof c.stringify === "function") {
        return c.stringify(f);
    }
    var d = f;
    var b = function(g) {
        var j = /[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
        var h = {"\b": "\\b","\t": "\\t","\n": "\\n","\f": "\\f","\r": "\\r",'"': '\\"',"\\": "\\\\"};
        j.lastIndex = 0;
        return j.test(g) ? '"' + g.replace(j, function(k) {
            var l = h[k];
            return typeof l === "string" ? l : "\\u" + ("0000" + k.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + g + '"';
    };
    var e = function(s, o) {
        var q = "";
        var h = "    ";
        var l = 0;
        var j = "";
        var t = "";
        var g = 0;
        var p = q;
        var m = [];
        var r = o[s];
        if (r && typeof r === "object" && typeof r.toJSON === "function") {
            r = r.toJSON(s);
        }
        switch (typeof r) {
            case "string":
                return b(r);
            case "number":
                return isFinite(r) ? String(r) : "null";
            case "boolean":
            case "null":
                return String(r);
            case "object":
                if (!r) {
                    return "null";
                }
                q += h;
                m = [];
                if (Object.prototype.toString.apply(r) === "[object Array]") {
                    g = r.length;
                    for (l = 0; l < g; l += 1) {
                        m[l] = e(l, r) || "null";
                    }
                    t = m.length === 0 ? "[]" : q ? "[\n" + q + m.join(",\n" + q) + "\n" + p + "]" : "[" + m.join(",") + "]";
                    q = p;
                    return t;
                }
                for (j in r) {
                    if (Object.hasOwnProperty.call(r, j)) {
                        t = e(j, r);
                        if (t) {
                            m.push(b(j) + (q ? ": " : ":") + t);
                        }
                    }
                }
                t = m.length === 0 ? "{}" : q ? "{\n" + q + m.join(",\n" + q) + "\n" + p + "}" : "{" + m.join(",") + "}";
                q = p;
                return t;
        }
    };
    return e("", {"": d});
}
function json_decode(str_json) {
    var json = this.window.JSON;
    if (typeof json === "object" && typeof json.parse === "function") {
        return json.parse(str_json);
    }
    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
    var j;
    var text = str_json;
    cx.lastIndex = 0;
    if (cx.test(text)) {
        text = text.replace(cx, function(a) {
            return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
        });
    }
    if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
        j = eval("(" + text + ")");
        return j;
    }
    throw new SyntaxError("json_decode");
}
function getCookie(c) {
    var b, d = new RegExp("(^| )" + c + "=([^;]*)(;|$)");
    if (b = document.cookie.match(d)) {
        return unescape(b[2]);
    } else {
        return "";
    }
}
function setCookie(h, g, f, e, c, d) {
    f = f ? f : 604800;
    f = f * 1000;
    var b = new Date();
    b.setTime(b.getTime() + f);
    document.cookie = escape(h) + "=" + escape(g) + (b ? "; expires=" + b.toGMTString() : "") + (e ? "; path=" + e : "/") + (c ? "; domain=" + c : "") + (d ? "; secure" : "");
    return;
}
function setCookieArr1(k, h, m, q, f, b) {
    var c = getCookie(k);
    var o;
    if (c) {
        o = json_decode(c);
    }
    if (o) {
        var e = o.length;
        if (e >= cookie_length_limit) {
            var l = new Array();
            o[cookie_length_limit] = h;
            for (var g in o) {
                if (g <= e - 1) {
                    var d = parseInt(g) + 1;
                    l[g] = o[d.toString()];
                }
            }
            o = l;
        } else {
            o[e] = h;
        }
    } else {
        var o = new Array();
        o[0] = h;
    }
    var p = json_encode(o);
    m = m ? m : 604800;
    setCookie(k, p, m, q, f, b);
    return;
}
function getBooInCookieArr1(f, d) {
    var c = getCookie(f);
    if (c) {
        var e = json_decode(c);
        if (e) {
            for (var b in e) {
                if (e[b] && e[b] == d) {
                    return true;
                }
            }
        }
    }
    return false;
}
function setCookieArr2(m, f, e, p, r, k, c) {
    var g = getCookie(m);
    var b;
    if (g) {
        b = json_decode(g);
    }
    if (b) {
        var d = b.length;
        if (d >= cookie_length_limit) {
            var o = new Array();
            b[cookie_length_limit] = new Array();
            b[cookie_length_limit][0] = f;
            b[cookie_length_limit][1] = e;
            for (var l in b) {
                if (l <= d - 1) {
                    var h = parseInt(l) + 1;
                    o[l] = b[h.toString()];
                }
            }
            b = o;
        } else {
            b[d] = new Array();
            b[d][0] = f;
            b[d][1] = e;
        }
    } else {
        var b = new Array();
        b[0] = new Array();
        b[0][0] = f;
        b[0][1] = e;
    }
    var q = json_encode(b);
    p = p ? p : 604800;
    setCookie(m, q, p, r, k, c);
    return;
}
function getBooInCookieArr2(f, e) {
    var d = getCookie(f);
    if (d) {
        var b = json_decode(d);
        if (b) {
            for (var c in b) {
                if (b[c] && b[c][0] && b[c][0] == e) {
                    return true;
                }
            }
        }
    }
    return false;
}
function ajax_collect(article_id, channel, obj) {
    if (!collect_status) {
        popUp("", "#pop-closed", "服务器君奔赴双11前线，家里没余粮，收藏君悲痛欲绝自挂东南枝了。");
        return;
    }
    var collection_uri = "";
    if (channel == 2) {
        var url = qiongsandai_faxian;
        collection_uri = faxian_collection;
    } else {
        if (channel == 3) {
            var url = qiongsandai_show;
            collection_uri = show_collection;
        } else {
            if (channel == 4) {
                var url = qiongsandai_jingyan;
                collection_uri = jingyan_collection;
            } else {
                if (channel == 5) {
                    var url = qiongsandai_haitao;
                    collection_uri = haitao_collection;
                } else {
                    if (channel == 6) {
                        var url = qiongsandai_news;
                        collection_uri = news_collection;
                    } else {
                        if (channel == 7) {
                            var url = qiongsandai_test;
                            collection_uri = test_collection;
                        } else {
                            if (channel == 11) {
                                var url = qiongsandai_yuanchuang;
                                collection_uri = yuanchuang_collection;
                            } else {
                                var url = qiongsandai_www;
                                collection_uri = youhui_collection;
                            }
                        }
                    }
                }
            }
        }
    }
    $.ajax({url: "/ajax_collect",type: "post",data: "article_id=" + article_id + "&channel=" + channel,dataType: "json",success: function(data) {
        var d = eval(data);
        if (d.error_code == 0) {
            if (collection_uri) {
                $("#pop-collect .pop_info_show a:first").attr("href", collection_uri);
            }
            popPosition("#pop-collect");
            $("#pop-collect").show();
            $("#cover").show();
            popClose("#pop-collect");
            $("a[id='collect_" + channel + "_" + article_id + "']").each(function() {
                $(this).attr("class", "fav current");
                $(this).find("em").html(Number($(this).find("em").html()) + 1);
            });
            popUp("", "#pop-collect", "");
        } else {
            if (d.error_code == 2) {
                if (collection_uri) {
                    $("#pop-nocollect .pop_info_show a:first").attr("href", collection_uri);
                }
                popPosition("#pop-nocollect");
                $("#pop-nocollect").show();
                $("#cover").show();
                popClose("#pop-nocollect");
                $("a[id='collect_" + channel + "_" + article_id + "']").each(function() {
                    $(this).attr("class", "fav");
                    $(this).find("em").html(Number($(this).find("em").html()) - 1);
                });
                popUp("", "#pop-nocollect", "");
            } else {
                if (d.error_code == 5) {
                    popPosition("#pop-login");
                    $("#pop-login").show();
                    $("#cover").show();
                    popClose("#pop-login");
                } else {
                    if (d.error_code == 6) {
                        popUp("", "#pop-closed", "服务器君奔赴双11前线，家里没余粮，收藏君悲痛欲绝自挂东南枝了。");
                    } else {
                    }
                }
            }
        }
        return;
    }});
}
function set_collect_current() {
    $(".fav").each(function() {
        var e = new Array([1, "post"], [2, "faxian"], [3, "ordershow"], [4, "experience"], [5, "haitao"], [6, "news"], [7, "test"]);
        var h = $(this).attr("id");
        if (typeof (h) != "undefined") {
            var c = h.split("_");
            var f = c[2];
            var d = c[1];
            for (i = 0; i < e.length; i++) {
                var b = getCookie("qiongsandai_collection_" + e[i][1]);
                var g = b.split(",");
                if (d == e[i][0] && $.inArray(f, g) > -1) {
                    $(this).attr("class", "fav current");
                }
            }
        }
    });
}
function ajax_love(article_id, channel, obj) {
    if (channel == 2) {
        var url = qiongsandai_faxian;
    } else {
        if (channel == 3) {
            var url = qiongsandai_show;
        } else {
            if (channel == 4) {
                var url = qiongsandai_jingyan;
            } else {
                if (channel == 6) {
                    var url = qiongsandai_news;
                } else {
                    if (channel == 7) {
                        var url = qiongsandai_test;
                    }
                }
            }
        }
    }
    $(obj).removeAttr("onclick");
    $(obj).css("cursor", "default");
    $.ajax({url: "/ajax_love",type: "post",data: "article_id=" + article_id + "&channel=" + channel,dataType: "json",success: function(data) {
        var d = eval(data);
        if (d.error_code == 0) {
        } else {
            if (d.error_code == 2) {
            } else {
                if (d.error_code == 6) {
                } else {
                }
            }
        }
        $(obj).find("span.addNumber").fadeIn().animate({top: "-35px"}, "normal").fadeOut(300);
        $(obj).attr("class", "zan current");
        scored("#details-zan", "current");
        if ($(obj).find("em").length > 0) {
            $(obj).find("span.scoreAnimate").fadeIn().animate({top: "-35px"}, "normal").fadeOut(300, function() {
                $(obj).find("em").html(Number($(obj).find("em").html()) + 1);
            });
        } else {
            if ($(obj).parents(".show_exp_zan").find("em").length > 0) {
                $(obj).parents(".show_exp_zan").find("em").html(Number($(obj).parents(".show_exp_zan").find("em").html()) + 1);
            } else {
                $(obj).parents(".show_exp_zan").find(".grey").html("已有<em>1</em>人赞过");
            }
        }
        return;
    }});
}
function set_loverating_current() {
    $(".zan").each(function() {
        var e = new Array([2, "faxian"], [3, "ordershow"], [4, "experience"], [6, "news"], [7, "test"], [9, "qingdan"]);
        var h = $(this).attr("id");
        if (typeof (h) != "undefined") {
            var c = h.split("_");
            var f = c[3];
            var d = c[2];
            for (i = 0; i < e.length; i++) {
                var b = getCookie("qiongsandai_loverating_" + e[i][1]);
                var g = b.split(",");
                if (d == e[i][0] && $.inArray(f, g) > -1) {
                    $(this).attr("class", "zan current");
                    $(this).removeAttr("onclick");
                    $(this).css("cursor", "default");
                }
            }
        }
    });
}
function ajax_report(article_id, obj) {
    $.ajax({url: "/ajax_report",type: "post",data: "article_id=" + article_id,dataType: "json",success: function(data) {
        var d = eval(data);
        if (d.error_code == 0) {
            reportstyle(obj, 0);
        } else {
            if (d.error_code == 2) {
                reportstyle(obj, 2);
            } else {
            }
        }
        return;
    }});
}
$(function() {
    $(".noGoods").each(function() {
        var b = $(this).attr("id").split("_")[2];
        var c = getCookie("post_reported");
        var d = c.split(",");
        if ($.inArray(b, d) > -1) {
            $(this).html("已举报");
            $(this).removeAttr("onclick");
        }
    });
});
function reportstyle(c, b) {
    $(c).html("已举报");
    $(c).removeAttr("onclick");
    if (b == 2) {
        popPosition("#pop-postreportexist");
        $("#pop-postreportexist").show();
        $("#cover").show();
        popClose("#pop-postreportexist");
        popUp("", "#pop-postreportexist", "");
    } else {
        popPosition("#pop-postreport");
        $("#pop-postreport").show();
        $("#cover").show();
        popClose("#pop-postreport");
        popUp("", "#pop-postreport", "");
    }
}
function rating(c, g, f) {
    var d = $("#rating_worthy_" + c);
    var e = $("#rating_unworthy_" + c);
    d.removeAttr("onclick").css("cursor", "default");
    e.removeAttr("onclick").css("cursor", "default");
    if (g == 1) {
        d.addClass("current").addClass("worthCurrent");
        e.addClass("unworthCurrent");
    } else {
        d.addClass("worthCurrent");
        e.addClass("current").addClass("unworthCurrent");
    }
    var b = "/ajax_rating";
    $.ajax({url: b,type: "post",data: {rating_acticle_id: c,rating_rating: g,rating_article_type: f},dataType: "json",success: function(h) {
        if (h.error_code == 0 || h.error_code == 2 || h.error_code == 6) {
            if (g == 1) {
                d.find(" .scoreAnimate").fadeIn().animate({top: "-30px"}, "normal").fadeOut(300);
                d.find(" .scoreTotal").html("<b>值</b> " + h.worthy_num);
            } else {
                e.find(" .scoreAnimate").fadeIn().animate({top: "30px"}, "normal").fadeOut(300);
                e.find(" .scoreTotal").html("<b>不值</b> " + h.unworthy_num);
            }
        }
    }});
}
function single_rating(h, c, g) {
    var f = $("#rating_" + h);
    var k = $("#rating_worthy");
    var d = $("#rating_unworthy");
    k.removeAttr("onclick").css("cursor", "default").addClass("worthCurrent");
    d.removeAttr("onclick").css("cursor", "default").addClass("unworthCurrent");
    scored("#details-zhi", "worthCurrent");
    scored("#details-buzhi", "unworthCurrent");
    var e = parseInt($("#rating_worthy_num").text());
    var j = parseInt($("#rating_unworthy_num").text());
    if (g == 5) {
        var b = qiongsandai_haitao + "/ajax_rating";
    } else {
        var b = qiongsandai_www + "/ajax_rating";
    }
    $.ajax({url: b,type: "post",data: {rating_acticle_id: h,rating_rating: c,rating_article_type: g},dataType: "json",success: function(o) {
        if (o.error_code == 0 || o.error_code == 2 || o.error_code == 6) {
            if (c == 1) {
                $(f).find(".add").show().animate({"top": "-30px"}, 600).fadeOut("slow", function() {
                    $("#rating_worthy_num").html(e + 1);
                    $("#rating_all_num").html("已有 " + (e + j + 1) + " 用户参与");
                });
            } else {
                $(f).find(".reduce").show().animate({"top": "80px"}, 600).fadeOut("slow", function() {
                    $("#rating_unworthy_num").html(j + 1);
                    $("#rating_all_num").html("已有 " + (e + j + 1) + " 用户参与");
                });
            }
            if (p == 0) {
                var q = "";
            } else {
                var p = parseInt(o.worthy_num);
                var l = parseInt(o.unworthy_num);
                var m = (p / (p + l)) * 100;
                var q = m.toString() + "%";
            }
            f.find(" .progressing").css("width", q);
        }
    }});
}
set_rating_current();
function set_rating_current() {
    $(function() {
        $(".lrBot").each(function() {
            if (typeof ($(this).find(" .good").attr("id")) != "undefined") {
                var d = $(this).find(" .good").attr("id").split("_")[2];
                var c = getCookie("qiongsandai_rating_post");
                if (c) {
                    ste_current(d, c);
                }
                var b = getCookie("qiongsandai_rating_haitao");
                if (b) {
                    ste_current(d, b);
                }
            }
        });
    });
}
function ste_current(g, c) {
    var b = json_decode(c);
    for (var e in b) {
        if (g == e) {
            var d = $("#rating_worthy_" + g);
            var f = $("#rating_unworthy_" + g);
            d.removeAttr("onclick");
            f.removeAttr("onclick");
            if (b[e] == 1) {
                d.addClass("current").css("cursor", "default").addClass("worthCurrent");
                f.addClass("unworthCurrent");
            } else {
                if (b[e] == 2) {
                    d.addClass("worthCurrent");
                    f.addClass("current").css("cursor", "default").addClass("unworthCurrent");
                }
            }
        }
    }
}
$(function() {
    $(".score_rateBox").each(function() {
        if (typeof ($(this).attr("id")) != "undefined") {
            var d = $(this).attr("id").split("_")[1];
            var c = getCookie("qiongsandai_rating_post");
            if (c) {
                ste_current_single(d, c);
            }
            var b = getCookie("qiongsandai_rating_haitao");
            if (b) {
                ste_current_single(d, b);
            }
        }
    });
});
function ste_current_single(g, c) {
    var b = json_decode(c);
    for (var e in b) {
        if (g == e) {
            var d = $("#rating_worthy");
            var f = $("#rating_unworthy");
            d.removeAttr("onclick").css("cursor", "default");
            f.removeAttr("onclick").css("cursor", "default");
            d.addClass("worthCurrent");
            f.addClass("unworthCurrent");
            scored("#details-zhi", "worthCurrent");
            scored("#details-buzhi", "unworthCurrent");
        }
    }
}
function placehold(b) {
    $(b).each(function() {
        var c = $(this).attr("default_value");
        if ($(this).attr("default_value")) {
            $(this).focus(function() {
                if ($(this).val() == c) {
                    $(this).val("");
                    $(this).css("color", "#333");
                }
            });
            $(this).blur(function() {
                if ($(this).val() == "") {
                    $(this).val(c);
                    $(this).css("color", "#999");
                }
            });
        }
    });
}
function articleLinkAdd() {
    var b = $(".link_box").length;
    if (b <= 3) {
        var c = $(this).parent();
        c.after('<div class="link_box"><input type="text" name="coudanpin_title[]" class="input_style lFloat w160 mr20 grey" default_value="请输入商品名称" value="请输入商品名称" /><input type="text" name="coudanpin_link[]" class="input_style lFloat w340 grey" default_value="请输入凑单品链接" value="请输入凑单品链接" /><input type="button" class="lfloat button_add" value="+" ></div>');
        $(this).removeClass("button_add").addClass("button_reduce").val("-");
        $(this).unbind("click").bind("click", function() {
            $(this).parent().remove();
            $(".link_box").find(".button_add").each(function() {
                if ($(this).hasClass("button_add")) {
                    $(this).removeClass("disabled");
                }
            });
        });
        placehold(".input_style");
        c.next(".link_box").find(".button_add").bind("click", articleLinkAdd);
    }
    if (b == 3) {
        $(".link_box").find(".button_add").each(function() {
            if ($(this).hasClass("button_add")) {
                $(this).addClass("disabled");
            }
        });
    }
}
$(window).load(function() {
    $(".siteBlock").each(function() {
        var f = $(this);
        var e = $(this).find("img");
        var d = $(this).height();
        var c = $(this).find("img").height();
        var b = d - c;
        if (c < d) {
            e.css("marginTop", (b) / 2);
        }
    });
});
function zhankaiCon(d, b) {
    var d = $(d);
    for (var c = 0; c < d.length; c++) {
        d.eq(c).mouseover(function() {
            var f = $(this);
            var e = setTimeout(function() {
                f.parent().parent("li").addClass("active");
            }, 100);
            $(this).mouseout(function() {
                clearTimeout(e);
                $(this).parent().parent("li").removeClass("active");
            });
        });
        if ((c + 1) % 3 == 0) {
            d.eq(c).parent().parent("li").addClass("gogo");
        }
    }
}
function gettoday() {
    var b = new Date();
    now = b.getFullYear() + "/";
    now = now + (b.getMonth() + 1) + "/";
    now = now + b.getDate() + " ";
    now = now + b.getHours() + ":";
    now = now + b.getMinutes() + ":";
    now = now + b.getSeconds() + "";
    return now;
}
function gettodayend() {
    var b = new Date();
    end = b.getFullYear() + "/";
    end = end + (b.getMonth() + 1) + "/";
    end = end + b.getDate() + " ";
    end = end + "23:59:59";
    return end;
}
