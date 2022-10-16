jQuery(function(d) {
    if ("undefined" == typeof wc_add_to_cart_params) return !1;
    var t = function() { this.requests = [], this.addRequest = this.addRequest.bind(this), this.run = this.run.bind(this), d(document.body).on("click", ".add_to_cart_button", { addToCartHandler: this }, this.onAddToCart).on("click", ".remove_from_cart_button", { addToCartHandler: this }, this.onRemoveFromCart).on("added_to_cart", this.updateButton).on("ajax_request_not_sent.adding_to_cart", this.updateButton).on("added_to_cart removed_from_cart", { addToCartHandler: this }, this.updateFragments) };
    t.prototype.addRequest = function(t) { this.requests.push(t), 1 === this.requests.length && this.run() }, t.prototype.run = function() {
        var t = this,
            a = t.requests[0].complete;
        t.requests[0].complete = function() { "function" == typeof a && a(), t.requests.shift(), 0 < t.requests.length && t.run() }, d.ajax(this.requests[0])
    }, t.prototype.onAddToCart = function(t) {
        var a = d(this);
        if (a.is(".ajax_add_to_cart")) {
            if (!a.attr("data-product_id")) return !0;
            if (t.preventDefault(), a.removeClass("added"), a.addClass("loading"), !1 === d(document.body).triggerHandler("should_send_ajax_request.adding_to_cart", [a])) return d(document.body).trigger("ajax_request_not_sent.adding_to_cart", [!1, !1, a]), !0;
            var e = {};
            d.each(a.data(), function(t, a) { e[t] = a }), d.each(a[0].dataset, function(t, a) { e[t] = a }), d(document.body).trigger("adding_to_cart", [a, e]), t.data.addToCartHandler.addRequest({ type: "POST", url: wc_add_to_cart_params.wc_ajax_url.toString().replace("%%endpoint%%", "add_to_cart"), data: e, success: function(t) { t && (t.error && t.product_url ? window.location = t.product_url : "yes" !== wc_add_to_cart_params.cart_redirect_after_add ? d(document.body).trigger("added_to_cart", [t.fragments, t.cart_hash, a]) : window.location = wc_add_to_cart_params.cart_url) }, dataType: "json" })
        }
    }, t.prototype.onRemoveFromCart = function(t) {
        var a = d(this),
            e = a.closest(".woocommerce-mini-cart-item");
        t.preventDefault(), e.block({ message: null, overlayCSS: { opacity: .6 } }), t.data.addToCartHandler.addRequest({ type: "POST", url: wc_add_to_cart_params.wc_ajax_url.toString().replace("%%endpoint%%", "remove_from_cart"), data: { cart_item_key: a.data("cart_item_key") }, success: function(t) { t && t.fragments ? d(document.body).trigger("removed_from_cart", [t.fragments, t.cart_hash, a]) : window.location = a.attr("href") }, error: function() { window.location = a.attr("href") }, dataType: "json" })
    }, t.prototype.updateButton = function(t, a, e, r) {
        (r = void 0 !== r && r) && (r.removeClass("loading"), a && r.addClass("added"), a && !wc_add_to_cart_params.is_cart && 0 === r.parent().find(".added_to_cart").length && r.after('<a href="' + wc_add_to_cart_params.cart_url + '" class="added_to_cart wc-forward" title="' + wc_add_to_cart_params.i18n_view_cart + '">' + wc_add_to_cart_params.i18n_view_cart + "</a>"), d(document.body).trigger("wc_cart_button_updated", [r]))
    }, t.prototype.updateFragments = function(t, a) { a && (d.each(a, function(t) { d(t).addClass("updating").fadeTo("400", "0.6").block({ message: null, overlayCSS: { opacity: .6 } }) }), d.each(a, function(t, a) { d(t).replaceWith(a), d(t).stop(!0).css("opacity", "1").unblock() }), d(document.body).trigger("wc_fragments_loaded")) }, new t
});; /* flatpickr v4.6.13,, @license MIT */
! function(e, n) { "object" == typeof exports && "undefined" != typeof module ? module.exports = n() : "function" == typeof define && define.amd ? define(n) : (e = "undefined" != typeof globalThis ? globalThis : e || self).flatpickr = n() }(this, (function() {
    "use strict";
    var e = function() {
        return (e = Object.assign || function(e) {
            for (var n, t = 1, a = arguments.length; t < a; t++)
                for (var i in n = arguments[t]) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
            return e
        }).apply(this, arguments)
    };

    function n() {
        for (var e = 0, n = 0, t = arguments.length; n < t; n++) e += arguments[n].length;
        var a = Array(e),
            i = 0;
        for (n = 0; n < t; n++)
            for (var o = arguments[n], r = 0, l = o.length; r < l; r++, i++) a[i] = o[r];
        return a
    }
    var t = ["onChange", "onClose", "onDayCreate", "onDestroy", "onKeyDown", "onMonthChange", "onOpen", "onParseConfig", "onReady", "onValueUpdate", "onYearChange", "onPreCalendarPosition"],
        a = {
            _disable: [],
            allowInput: !1,
            allowInvalidPreload: !1,
            altFormat: "F j, Y",
            altInput: !1,
            altInputClass: "form-control input",
            animate: "object" == typeof window && -1 === window.navigator.userAgent.indexOf("MSIE"),
            ariaDateFormat: "F j, Y",
            autoFillDefaultTime: !0,
            clickOpens: !0,
            closeOnSelect: !0,
            conjunction: ", ",
            dateFormat: "Y-m-d",
            defaultHour: 12,
            defaultMinute: 0,
            defaultSeconds: 0,
            disable: [],
            disableMobile: !1,
            enableSeconds: !1,
            enableTime: !1,
            errorHandler: function(e) { return "undefined" != typeof console && console.warn(e) },
            getWeek: function(e) {
                var n = new Date(e.getTime());
                n.setHours(0, 0, 0, 0), n.setDate(n.getDate() + 3 - (n.getDay() + 6) % 7);
                var t = new Date(n.getFullYear(), 0, 4);
                return 1 + Math.round(((n.getTime() - t.getTime()) / 864e5 - 3 + (t.getDay() + 6) % 7) / 7)
            },
            hourIncrement: 1,
            ignoredFocusElements: [],
            inline: !1,
            locale: "default",
            minuteIncrement: 5,
            mode: "single",
            monthSelectorType: "dropdown",
            nextArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M13.207 8.472l-7.854 7.854-0.707-0.707 7.146-7.146-7.146-7.148 0.707-0.707 7.854 7.854z' /></svg>",
            noCalendar: !1,
            now: new Date,
            onChange: [],
            onClose: [],
            onDayCreate: [],
            onDestroy: [],
            onKeyDown: [],
            onMonthChange: [],
            onOpen: [],
            onParseConfig: [],
            onReady: [],
            onValueUpdate: [],
            onYearChange: [],
            onPreCalendarPosition: [],
            plugins: [],
            position: "auto",
            positionElement: void 0,
            prevArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M5.207 8.471l7.146 7.147-0.707 0.707-7.853-7.854 7.854-7.853 0.707 0.707-7.147 7.146z' /></svg>",
            shorthandCurrentMonth: !1,
            showMonths: 1,
            static: !1,
            time_24hr: !1,
            weekNumbers: !1,
            wrap: !1
        },
        i = {
            weekdays: { shorthand: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], longhand: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] },
            months: { shorthand: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], longhand: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"] },
            daysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
            firstDayOfWeek: 0,
            ordinal: function(e) {
                var n = e % 100;
                if (n > 3 && n < 21) return "th";
                switch (n % 10) {
                    case 1:
                        return "st";
                    case 2:
                        return "nd";
                    case 3:
                        return "rd";
                    default:
                        return "th"
                }
            },
            rangeSeparator: " to ",
            weekAbbreviation: "Wk",
            scrollTitle: "Scroll to increment",
            toggleTitle: "Click to toggle",
            amPM: ["AM", "PM"],
            yearAriaLabel: "Year",
            monthAriaLabel: "Month",
            hourAriaLabel: "Hour",
            minuteAriaLabel: "Minute",
            time_24hr: !1
        },
        o = function(e, n) { return void 0 === n && (n = 2), ("000" + e).slice(-1 * n) },
        r = function(e) { return !0 === e ? 1 : 0 };

    function l(e, n) {
        var t;
        return function() {
            var a = this,
                i = arguments;
            clearTimeout(t), t = setTimeout((function() { return e.apply(a, i) }), n)
        }
    }
    var c = function(e) { return e instanceof Array ? e : [e] };

    function s(e, n, t) {
        if (!0 === t) return e.classList.add(n);
        e.classList.remove(n)
    }

    function d(e, n, t) { var a = window.document.createElement(e); return n = n || "", t = t || "", a.className = n, void 0 !== t && (a.textContent = t), a }

    function u(e) { for (; e.firstChild;) e.removeChild(e.firstChild) }

    function f(e, n) { return n(e) ? e : e.parentNode ? f(e.parentNode, n) : void 0 }

    function m(e, n) {
        var t = d("div", "numInputWrapper"),
            a = d("input", "numInput " + e),
            i = d("span", "arrowUp"),
            o = d("span", "arrowDown");
        if (-1 === navigator.userAgent.indexOf("MSIE 9.0") ? a.type = "number" : (a.type = "text", a.pattern = "\\d*"), void 0 !== n)
            for (var r in n) a.setAttribute(r, n[r]);
        return t.appendChild(a), t.appendChild(i), t.appendChild(o), t
    }

    function g(e) { try { return "function" == typeof e.composedPath ? e.composedPath()[0] : e.target } catch (n) { return e.target } }
    var p = function() {},
        h = function(e, n, t) { return t.months[n ? "shorthand" : "longhand"][e] },
        v = {
            D: p,
            F: function(e, n, t) { e.setMonth(t.months.longhand.indexOf(n)) },
            G: function(e, n) { e.setHours((e.getHours() >= 12 ? 12 : 0) + parseFloat(n)) },
            H: function(e, n) { e.setHours(parseFloat(n)) },
            J: function(e, n) { e.setDate(parseFloat(n)) },
            K: function(e, n, t) { e.setHours(e.getHours() % 12 + 12 * r(new RegExp(t.amPM[1], "i").test(n))) },
            M: function(e, n, t) { e.setMonth(t.months.shorthand.indexOf(n)) },
            S: function(e, n) { e.setSeconds(parseFloat(n)) },
            U: function(e, n) { return new Date(1e3 * parseFloat(n)) },
            W: function(e, n, t) {
                var a = parseInt(n),
                    i = new Date(e.getFullYear(), 0, 2 + 7 * (a - 1), 0, 0, 0, 0);
                return i.setDate(i.getDate() - i.getDay() + t.firstDayOfWeek), i
            },
            Y: function(e, n) { e.setFullYear(parseFloat(n)) },
            Z: function(e, n) { return new Date(n) },
            d: function(e, n) { e.setDate(parseFloat(n)) },
            h: function(e, n) { e.setHours((e.getHours() >= 12 ? 12 : 0) + parseFloat(n)) },
            i: function(e, n) { e.setMinutes(parseFloat(n)) },
            j: function(e, n) { e.setDate(parseFloat(n)) },
            l: p,
            m: function(e, n) { e.setMonth(parseFloat(n) - 1) },
            n: function(e, n) { e.setMonth(parseFloat(n) - 1) },
            s: function(e, n) { e.setSeconds(parseFloat(n)) },
            u: function(e, n) { return new Date(parseFloat(n)) },
            w: p,
            y: function(e, n) { e.setFullYear(2e3 + parseFloat(n)) }
        },
        D = { D: "", F: "", G: "(\\d\\d|\\d)", H: "(\\d\\d|\\d)", J: "(\\d\\d|\\d)\\w+", K: "", M: "", S: "(\\d\\d|\\d)", U: "(.+)", W: "(\\d\\d|\\d)", Y: "(\\d{4})", Z: "(.+)", d: "(\\d\\d|\\d)", h: "(\\d\\d|\\d)", i: "(\\d\\d|\\d)", j: "(\\d\\d|\\d)", l: "", m: "(\\d\\d|\\d)", n: "(\\d\\d|\\d)", s: "(\\d\\d|\\d)", u: "(.+)", w: "(\\d\\d|\\d)", y: "(\\d{2})" },
        w = { Z: function(e) { return e.toISOString() }, D: function(e, n, t) { return n.weekdays.shorthand[w.w(e, n, t)] }, F: function(e, n, t) { return h(w.n(e, n, t) - 1, !1, n) }, G: function(e, n, t) { return o(w.h(e, n, t)) }, H: function(e) { return o(e.getHours()) }, J: function(e, n) { return void 0 !== n.ordinal ? e.getDate() + n.ordinal(e.getDate()) : e.getDate() }, K: function(e, n) { return n.amPM[r(e.getHours() > 11)] }, M: function(e, n) { return h(e.getMonth(), !0, n) }, S: function(e) { return o(e.getSeconds()) }, U: function(e) { return e.getTime() / 1e3 }, W: function(e, n, t) { return t.getWeek(e) }, Y: function(e) { return o(e.getFullYear(), 4) }, d: function(e) { return o(e.getDate()) }, h: function(e) { return e.getHours() % 12 ? e.getHours() % 12 : 12 }, i: function(e) { return o(e.getMinutes()) }, j: function(e) { return e.getDate() }, l: function(e, n) { return n.weekdays.longhand[e.getDay()] }, m: function(e) { return o(e.getMonth() + 1) }, n: function(e) { return e.getMonth() + 1 }, s: function(e) { return e.getSeconds() }, u: function(e) { return e.getTime() }, w: function(e) { return e.getDay() }, y: function(e) { return String(e.getFullYear()).substring(2) } },
        b = function(e) {
            var n = e.config,
                t = void 0 === n ? a : n,
                o = e.l10n,
                r = void 0 === o ? i : o,
                l = e.isMobile,
                c = void 0 !== l && l;
            return function(e, n, a) { var i = a || r; return void 0 === t.formatDate || c ? n.split("").map((function(n, a, o) { return w[n] && "\\" !== o[a - 1] ? w[n](e, i, t) : "\\" !== n ? n : "" })).join("") : t.formatDate(e, n, i) }
        },
        C = function(e) {
            var n = e.config,
                t = void 0 === n ? a : n,
                o = e.l10n,
                r = void 0 === o ? i : o;
            return function(e, n, i, o) {
                if (0 === e || e) {
                    var l, c = o || r,
                        s = e;
                    if (e instanceof Date) l = new Date(e.getTime());
                    else if ("string" != typeof e && void 0 !== e.toFixed) l = new Date(e);
                    else if ("string" == typeof e) {
                        var d = n || (t || a).dateFormat,
                            u = String(e).trim();
                        if ("today" === u) l = new Date, i = !0;
                        else if (t && t.parseDate) l = t.parseDate(e, d);
                        else if (/Z$/.test(u) || /GMT$/.test(u)) l = new Date(e);
                        else {
                            for (var f = void 0, m = [], g = 0, p = 0, h = ""; g < d.length; g++) {
                                var w = d[g],
                                    b = "\\" === w,
                                    C = "\\" === d[g - 1] || b;
                                if (D[w] && !C) {
                                    h += D[w];
                                    var M = new RegExp(h).exec(e);
                                    M && (f = !0) && m["Y" !== w ? "push" : "unshift"]({ fn: v[w], val: M[++p] })
                                } else b || (h += ".")
                            }
                            l = t && t.noCalendar ? new Date((new Date).setHours(0, 0, 0, 0)) : new Date((new Date).getFullYear(), 0, 1, 0, 0, 0, 0), m.forEach((function(e) {
                                var n = e.fn,
                                    t = e.val;
                                return l = n(l, t, c) || l
                            })), l = f ? l : void 0
                        }
                    }
                    if (l instanceof Date && !isNaN(l.getTime())) return !0 === i && l.setHours(0, 0, 0, 0), l;
                    t.errorHandler(new Error("Invalid date provided: " + s))
                }
            }
        };

    function M(e, n, t) { return void 0 === t && (t = !0), !1 !== t ? new Date(e.getTime()).setHours(0, 0, 0, 0) - new Date(n.getTime()).setHours(0, 0, 0, 0) : e.getTime() - n.getTime() }
    var y = function(e, n, t) { return 3600 * e + 60 * n + t },
        x = 864e5;

    function E(e) {
        var n = e.defaultHour,
            t = e.defaultMinute,
            a = e.defaultSeconds;
        if (void 0 !== e.minDate) {
            var i = e.minDate.getHours(),
                o = e.minDate.getMinutes(),
                r = e.minDate.getSeconds();
            n < i && (n = i), n === i && t < o && (t = o), n === i && t === o && a < r && (a = e.minDate.getSeconds())
        }
        if (void 0 !== e.maxDate) {
            var l = e.maxDate.getHours(),
                c = e.maxDate.getMinutes();
            (n = Math.min(n, l)) === l && (t = Math.min(c, t)), n === l && t === c && (a = e.maxDate.getSeconds())
        }
        return { hours: n, minutes: t, seconds: a }
    }
    "function" != typeof Object.assign && (Object.assign = function(e) {
        for (var n = [], t = 1; t < arguments.length; t++) n[t - 1] = arguments[t];
        if (!e) throw TypeError("Cannot convert undefined or null to object");
        for (var a = function(n) { n && Object.keys(n).forEach((function(t) { return e[t] = n[t] })) }, i = 0, o = n; i < o.length; i++) {
            var r = o[i];
            a(r)
        }
        return e
    });

    function k(p, v) {
        var w = { config: e(e({}, a), I.defaultConfig), l10n: i };

        function k() { var e; return (null === (e = w.calendarContainer) || void 0 === e ? void 0 : e.getRootNode()).activeElement || document.activeElement }

        function T(e) { return e.bind(w) }

        function S() {
            var e = w.config;
            !1 === e.weekNumbers && 1 === e.showMonths || !0 !== e.noCalendar && window.requestAnimationFrame((function() {
                if (void 0 !== w.calendarContainer && (w.calendarContainer.style.visibility = "hidden", w.calendarContainer.style.display = "block"), void 0 !== w.daysContainer) {
                    var n = (w.days.offsetWidth + 1) * e.showMonths;
                    w.daysContainer.style.width = n + "px", w.calendarContainer.style.width = n + (void 0 !== w.weekWrapper ? w.weekWrapper.offsetWidth : 0) + "px", w.calendarContainer.style.removeProperty("visibility"), w.calendarContainer.style.removeProperty("display")
                }
            }))
        }

        function _(e) {
            if (0 === w.selectedDates.length) {
                var n = void 0 === w.config.minDate || M(new Date, w.config.minDate) >= 0 ? new Date : new Date(w.config.minDate.getTime()),
                    t = E(w.config);
                n.setHours(t.hours, t.minutes, t.seconds, n.getMilliseconds()), w.selectedDates = [n], w.latestSelectedDateObj = n
            }
            void 0 !== e && "blur" !== e.type && function(e) {
                e.preventDefault();
                var n = "keydown" === e.type,
                    t = g(e),
                    a = t;
                void 0 !== w.amPM && t === w.amPM && (w.amPM.textContent = w.l10n.amPM[r(w.amPM.textContent === w.l10n.amPM[0])]);
                var i = parseFloat(a.getAttribute("min")),
                    l = parseFloat(a.getAttribute("max")),
                    c = parseFloat(a.getAttribute("step")),
                    s = parseInt(a.value, 10),
                    d = e.delta || (n ? 38 === e.which ? 1 : -1 : 0),
                    u = s + c * d;
                if (void 0 !== a.value && 2 === a.value.length) {
                    var f = a === w.hourElement,
                        m = a === w.minuteElement;
                    u < i ? (u = l + u + r(!f) + (r(f) && r(!w.amPM)), m && L(void 0, -1, w.hourElement)) : u > l && (u = a === w.hourElement ? u - l - r(!w.amPM) : i, m && L(void 0, 1, w.hourElement)), w.amPM && f && (1 === c ? u + s === 23 : Math.abs(u - s) > c) && (w.amPM.textContent = w.l10n.amPM[r(w.amPM.textContent === w.l10n.amPM[0])]), a.value = o(u)
                }
            }(e);
            var a = w._input.value;
            O(), ye(), w._input.value !== a && w._debouncedChange()
        }

        function O() {
            if (void 0 !== w.hourElement && void 0 !== w.minuteElement) {
                var e, n, t = (parseInt(w.hourElement.value.slice(-2), 10) || 0) % 24,
                    a = (parseInt(w.minuteElement.value, 10) || 0) % 60,
                    i = void 0 !== w.secondElement ? (parseInt(w.secondElement.value, 10) || 0) % 60 : 0;
                void 0 !== w.amPM && (e = t, n = w.amPM.textContent, t = e % 12 + 12 * r(n === w.l10n.amPM[1]));
                var o = void 0 !== w.config.minTime || w.config.minDate && w.minDateHasTime && w.latestSelectedDateObj && 0 === M(w.latestSelectedDateObj, w.config.minDate, !0),
                    l = void 0 !== w.config.maxTime || w.config.maxDate && w.maxDateHasTime && w.latestSelectedDateObj && 0 === M(w.latestSelectedDateObj, w.config.maxDate, !0);
                if (void 0 !== w.config.maxTime && void 0 !== w.config.minTime && w.config.minTime > w.config.maxTime) {
                    var c = y(w.config.minTime.getHours(), w.config.minTime.getMinutes(), w.config.minTime.getSeconds()),
                        s = y(w.config.maxTime.getHours(), w.config.maxTime.getMinutes(), w.config.maxTime.getSeconds()),
                        d = y(t, a, i);
                    if (d > s && d < c) {
                        var u = function(e) {
                            var n = Math.floor(e / 3600),
                                t = (e - 3600 * n) / 60;
                            return [n, t, e - 3600 * n - 60 * t]
                        }(c);
                        t = u[0], a = u[1], i = u[2]
                    }
                } else {
                    if (l) {
                        var f = void 0 !== w.config.maxTime ? w.config.maxTime : w.config.maxDate;
                        (t = Math.min(t, f.getHours())) === f.getHours() && (a = Math.min(a, f.getMinutes())), a === f.getMinutes() && (i = Math.min(i, f.getSeconds()))
                    }
                    if (o) {
                        var m = void 0 !== w.config.minTime ? w.config.minTime : w.config.minDate;
                        (t = Math.max(t, m.getHours())) === m.getHours() && a < m.getMinutes() && (a = m.getMinutes()), a === m.getMinutes() && (i = Math.max(i, m.getSeconds()))
                    }
                }
                A(t, a, i)
            }
        }

        function F(e) {
            var n = e || w.latestSelectedDateObj;
            n && n instanceof Date && A(n.getHours(), n.getMinutes(), n.getSeconds())
        }

        function A(e, n, t) { void 0 !== w.latestSelectedDateObj && w.latestSelectedDateObj.setHours(e % 24, n, t || 0, 0), w.hourElement && w.minuteElement && !w.isMobile && (w.hourElement.value = o(w.config.time_24hr ? e : (12 + e) % 12 + 12 * r(e % 12 == 0)), w.minuteElement.value = o(n), void 0 !== w.amPM && (w.amPM.textContent = w.l10n.amPM[r(e >= 12)]), void 0 !== w.secondElement && (w.secondElement.value = o(t))) }

        function N(e) {
            var n = g(e),
                t = parseInt(n.value) + (e.delta || 0);
            (t / 1e3 > 1 || "Enter" === e.key && !/[^\d]/.test(t.toString())) && ee(t)
        }

        function P(e, n, t, a) { return n instanceof Array ? n.forEach((function(n) { return P(e, n, t, a) })) : e instanceof Array ? e.forEach((function(e) { return P(e, n, t, a) })) : (e.addEventListener(n, t, a), void w._handlers.push({ remove: function() { return e.removeEventListener(n, t, a) } })) }

        function Y() { De("onChange") }

        function j(e, n) {
            var t = void 0 !== e ? w.parseDate(e) : w.latestSelectedDateObj || (w.config.minDate && w.config.minDate > w.now ? w.config.minDate : w.config.maxDate && w.config.maxDate < w.now ? w.config.maxDate : w.now),
                a = w.currentYear,
                i = w.currentMonth;
            try { void 0 !== t && (w.currentYear = t.getFullYear(), w.currentMonth = t.getMonth()) } catch (e) { e.message = "Invalid date supplied: " + t, w.config.errorHandler(e) }
            n && w.currentYear !== a && (De("onYearChange"), q()), !n || w.currentYear === a && w.currentMonth === i || De("onMonthChange"), w.redraw()
        }

        function H(e) { var n = g(e);~n.className.indexOf("arrow") && L(e, n.classList.contains("arrowUp") ? 1 : -1) }

        function L(e, n, t) {
            var a = e && g(e),
                i = t || a && a.parentNode && a.parentNode.firstChild,
                o = we("increment");
            o.delta = n, i && i.dispatchEvent(o)
        }

        function R(e, n, t, a) {
            var i = ne(n, !0),
                o = d("span", e, n.getDate().toString());
            return o.dateObj = n, o.$i = a, o.setAttribute("aria-label", w.formatDate(n, w.config.ariaDateFormat)), -1 === e.indexOf("hidden") && 0 === M(n, w.now) && (w.todayDateElem = o, o.classList.add("today"), o.setAttribute("aria-current", "date")), i ? (o.tabIndex = -1, be(n) && (o.classList.add("selected"), w.selectedDateElem = o, "range" === w.config.mode && (s(o, "startRange", w.selectedDates[0] && 0 === M(n, w.selectedDates[0], !0)), s(o, "endRange", w.selectedDates[1] && 0 === M(n, w.selectedDates[1], !0)), "nextMonthDay" === e && o.classList.add("inRange")))) : o.classList.add("flatpickr-disabled"), "range" === w.config.mode && function(e) { return !("range" !== w.config.mode || w.selectedDates.length < 2) && (M(e, w.selectedDates[0]) >= 0 && M(e, w.selectedDates[1]) <= 0) }(n) && !be(n) && o.classList.add("inRange"), w.weekNumbers && 1 === w.config.showMonths && "prevMonthDay" !== e && a % 7 == 6 && w.weekNumbers.insertAdjacentHTML("beforeend", "<span class='flatpickr-day'>" + w.config.getWeek(n) + "</span>"), De("onDayCreate", o), o
        }

        function W(e) { e.focus(), "range" === w.config.mode && oe(e) }

        function B(e) {
            for (var n = e > 0 ? 0 : w.config.showMonths - 1, t = e > 0 ? w.config.showMonths : -1, a = n; a != t; a += e)
                for (var i = w.daysContainer.children[a], o = e > 0 ? 0 : i.children.length - 1, r = e > 0 ? i.children.length : -1, l = o; l != r; l += e) { var c = i.children[l]; if (-1 === c.className.indexOf("hidden") && ne(c.dateObj)) return c }
        }

        function J(e, n) {
            var t = k(),
                a = te(t || document.body),
                i = void 0 !== e ? e : a ? t : void 0 !== w.selectedDateElem && te(w.selectedDateElem) ? w.selectedDateElem : void 0 !== w.todayDateElem && te(w.todayDateElem) ? w.todayDateElem : B(n > 0 ? 1 : -1);
            void 0 === i ? w._input.focus() : a ? function(e, n) {
                for (var t = -1 === e.className.indexOf("Month") ? e.dateObj.getMonth() : w.currentMonth, a = n > 0 ? w.config.showMonths : -1, i = n > 0 ? 1 : -1, o = t - w.currentMonth; o != a; o += i)
                    for (var r = w.daysContainer.children[o], l = t - w.currentMonth === o ? e.$i + n : n < 0 ? r.children.length - 1 : 0, c = r.children.length, s = l; s >= 0 && s < c && s != (n > 0 ? c : -1); s += i) { var d = r.children[s]; if (-1 === d.className.indexOf("hidden") && ne(d.dateObj) && Math.abs(e.$i - s) >= Math.abs(n)) return W(d) }
                w.changeMonth(i), J(B(i), 0)
            }(i, n) : W(i)
        }

        function K(e, n) { for (var t = (new Date(e, n, 1).getDay() - w.l10n.firstDayOfWeek + 7) % 7, a = w.utils.getDaysInMonth((n - 1 + 12) % 12, e), i = w.utils.getDaysInMonth(n, e), o = window.document.createDocumentFragment(), r = w.config.showMonths > 1, l = r ? "prevMonthDay hidden" : "prevMonthDay", c = r ? "nextMonthDay hidden" : "nextMonthDay", s = a + 1 - t, u = 0; s <= a; s++, u++) o.appendChild(R("flatpickr-day " + l, new Date(e, n - 1, s), 0, u)); for (s = 1; s <= i; s++, u++) o.appendChild(R("flatpickr-day", new Date(e, n, s), 0, u)); for (var f = i + 1; f <= 42 - t && (1 === w.config.showMonths || u % 7 != 0); f++, u++) o.appendChild(R("flatpickr-day " + c, new Date(e, n + 1, f % i), 0, u)); var m = d("div", "dayContainer"); return m.appendChild(o), m }

        function U() {
            if (void 0 !== w.daysContainer) {
                u(w.daysContainer), w.weekNumbers && u(w.weekNumbers);
                for (var e = document.createDocumentFragment(), n = 0; n < w.config.showMonths; n++) {
                    var t = new Date(w.currentYear, w.currentMonth, 1);
                    t.setMonth(w.currentMonth + n), e.appendChild(K(t.getFullYear(), t.getMonth()))
                }
                w.daysContainer.appendChild(e), w.days = w.daysContainer.firstChild, "range" === w.config.mode && 1 === w.selectedDates.length && oe()
            }
        }

        function q() {
            if (!(w.config.showMonths > 1 || "dropdown" !== w.config.monthSelectorType)) {
                var e = function(e) { return !(void 0 !== w.config.minDate && w.currentYear === w.config.minDate.getFullYear() && e < w.config.minDate.getMonth()) && !(void 0 !== w.config.maxDate && w.currentYear === w.config.maxDate.getFullYear() && e > w.config.maxDate.getMonth()) };
                w.monthsDropdownContainer.tabIndex = -1, w.monthsDropdownContainer.innerHTML = "";
                for (var n = 0; n < 12; n++)
                    if (e(n)) {
                        var t = d("option", "flatpickr-monthDropdown-month");
                        t.value = new Date(w.currentYear, n).getMonth().toString(), t.textContent = h(n, w.config.shorthandCurrentMonth, w.l10n), t.tabIndex = -1, w.currentMonth === n && (t.selected = !0), w.monthsDropdownContainer.appendChild(t)
                    }
            }
        }

        function $() {
            var e, n = d("div", "flatpickr-month"),
                t = window.document.createDocumentFragment();
            w.config.showMonths > 1 || "static" === w.config.monthSelectorType ? e = d("span", "cur-month") : (w.monthsDropdownContainer = d("select", "flatpickr-monthDropdown-months"), w.monthsDropdownContainer.setAttribute("aria-label", w.l10n.monthAriaLabel), P(w.monthsDropdownContainer, "change", (function(e) {
                var n = g(e),
                    t = parseInt(n.value, 10);
                w.changeMonth(t - w.currentMonth), De("onMonthChange")
            })), q(), e = w.monthsDropdownContainer);
            var a = m("cur-year", { tabindex: "-1" }),
                i = a.getElementsByTagName("input")[0];
            i.setAttribute("aria-label", w.l10n.yearAriaLabel), w.config.minDate && i.setAttribute("min", w.config.minDate.getFullYear().toString()), w.config.maxDate && (i.setAttribute("max", w.config.maxDate.getFullYear().toString()), i.disabled = !!w.config.minDate && w.config.minDate.getFullYear() === w.config.maxDate.getFullYear());
            var o = d("div", "flatpickr-current-month");
            return o.appendChild(e), o.appendChild(a), t.appendChild(o), n.appendChild(t), { container: n, yearElement: i, monthElement: e }
        }

        function V() {
            u(w.monthNav), w.monthNav.appendChild(w.prevMonthNav), w.config.showMonths && (w.yearElements = [], w.monthElements = []);
            for (var e = w.config.showMonths; e--;) {
                var n = $();
                w.yearElements.push(n.yearElement), w.monthElements.push(n.monthElement), w.monthNav.appendChild(n.container)
            }
            w.monthNav.appendChild(w.nextMonthNav)
        }

        function z() {
            w.weekdayContainer ? u(w.weekdayContainer) : w.weekdayContainer = d("div", "flatpickr-weekdays");
            for (var e = w.config.showMonths; e--;) {
                var n = d("div", "flatpickr-weekdaycontainer");
                w.weekdayContainer.appendChild(n)
            }
            return G(), w.weekdayContainer
        }

        function G() {
            if (w.weekdayContainer) {
                var e = w.l10n.firstDayOfWeek,
                    t = n(w.l10n.weekdays.shorthand);
                e > 0 && e < t.length && (t = n(t.splice(e, t.length), t.splice(0, e)));
                for (var a = w.config.showMonths; a--;) w.weekdayContainer.children[a].innerHTML = "\n      <span class='flatpickr-weekday'>\n        " + t.join("</span><span class='flatpickr-weekday'>") + "\n      </span>\n      "
            }
        }

        function Z(e, n) {
            void 0 === n && (n = !0);
            var t = n ? e : e - w.currentMonth;
            t < 0 && !0 === w._hidePrevMonthArrow || t > 0 && !0 === w._hideNextMonthArrow || (w.currentMonth += t, (w.currentMonth < 0 || w.currentMonth > 11) && (w.currentYear += w.currentMonth > 11 ? 1 : -1, w.currentMonth = (w.currentMonth + 12) % 12, De("onYearChange"), q()), U(), De("onMonthChange"), Ce())
        }

        function Q(e) { return w.calendarContainer.contains(e) }

        function X(e) {
            if (w.isOpen && !w.config.inline) {
                var n = g(e),
                    t = Q(n),
                    a = !(n === w.input || n === w.altInput || w.element.contains(n) || e.path && e.path.indexOf && (~e.path.indexOf(w.input) || ~e.path.indexOf(w.altInput))) && !t && !Q(e.relatedTarget),
                    i = !w.config.ignoredFocusElements.some((function(e) { return e.contains(n) }));
                a && i && (w.config.allowInput && w.setDate(w._input.value, !1, w.config.altInput ? w.config.altFormat : w.config.dateFormat), void 0 !== w.timeContainer && void 0 !== w.minuteElement && void 0 !== w.hourElement && "" !== w.input.value && void 0 !== w.input.value && _(), w.close(), w.config && "range" === w.config.mode && 1 === w.selectedDates.length && w.clear(!1))
            }
        }

        function ee(e) {
            if (!(!e || w.config.minDate && e < w.config.minDate.getFullYear() || w.config.maxDate && e > w.config.maxDate.getFullYear())) {
                var n = e,
                    t = w.currentYear !== n;
                w.currentYear = n || w.currentYear, w.config.maxDate && w.currentYear === w.config.maxDate.getFullYear() ? w.currentMonth = Math.min(w.config.maxDate.getMonth(), w.currentMonth) : w.config.minDate && w.currentYear === w.config.minDate.getFullYear() && (w.currentMonth = Math.max(w.config.minDate.getMonth(), w.currentMonth)), t && (w.redraw(), De("onYearChange"), q())
            }
        }

        function ne(e, n) {
            var t;
            void 0 === n && (n = !0);
            var a = w.parseDate(e, void 0, n);
            if (w.config.minDate && a && M(a, w.config.minDate, void 0 !== n ? n : !w.minDateHasTime) < 0 || w.config.maxDate && a && M(a, w.config.maxDate, void 0 !== n ? n : !w.maxDateHasTime) > 0) return !1;
            if (!w.config.enable && 0 === w.config.disable.length) return !0;
            if (void 0 === a) return !1;
            for (var i = !!w.config.enable, o = null !== (t = w.config.enable) && void 0 !== t ? t : w.config.disable, r = 0, l = void 0; r < o.length; r++) { if ("function" == typeof(l = o[r]) && l(a)) return i; if (l instanceof Date && void 0 !== a && l.getTime() === a.getTime()) return i; if ("string" == typeof l) { var c = w.parseDate(l, void 0, !0); return c && c.getTime() === a.getTime() ? i : !i } if ("object" == typeof l && void 0 !== a && l.from && l.to && a.getTime() >= l.from.getTime() && a.getTime() <= l.to.getTime()) return i }
            return !i
        }

        function te(e) { return void 0 !== w.daysContainer && (-1 === e.className.indexOf("hidden") && -1 === e.className.indexOf("flatpickr-disabled") && w.daysContainer.contains(e)) }

        function ae(e) {
            var n = e.target === w._input,
                t = w._input.value.trimEnd() !== Me();
            !n || !t || e.relatedTarget && Q(e.relatedTarget) || w.setDate(w._input.value, !0, e.target === w.altInput ? w.config.altFormat : w.config.dateFormat)
        }

        function ie(e) {
            var n = g(e),
                t = w.config.wrap ? p.contains(n) : n === w._input,
                a = w.config.allowInput,
                i = w.isOpen && (!a || !t),
                o = w.config.inline && t && !a;
            if (13 === e.keyCode && t) {
                if (a) return w.setDate(w._input.value, !0, n === w.altInput ? w.config.altFormat : w.config.dateFormat), w.close(), n.blur();
                w.open()
            } else if (Q(n) || i || o) {
                var r = !!w.timeContainer && w.timeContainer.contains(n);
                switch (e.keyCode) {
                    case 13:
                        r ? (e.preventDefault(), _(), fe()) : me(e);
                        break;
                    case 27:
                        e.preventDefault(), fe();
                        break;
                    case 8:
                    case 46:
                        t && !w.config.allowInput && (e.preventDefault(), w.clear());
                        break;
                    case 37:
                    case 39:
                        if (r || t) w.hourElement && w.hourElement.focus();
                        else {
                            e.preventDefault();
                            var l = k();
                            if (void 0 !== w.daysContainer && (!1 === a || l && te(l))) {
                                var c = 39 === e.keyCode ? 1 : -1;
                                e.ctrlKey ? (e.stopPropagation(), Z(c), J(B(1), 0)) : J(void 0, c)
                            }
                        }
                        break;
                    case 38:
                    case 40:
                        e.preventDefault();
                        var s = 40 === e.keyCode ? 1 : -1;
                        w.daysContainer && void 0 !== n.$i || n === w.input || n === w.altInput ? e.ctrlKey ? (e.stopPropagation(), ee(w.currentYear - s), J(B(1), 0)) : r || J(void 0, 7 * s) : n === w.currentYearElement ? ee(w.currentYear - s) : w.config.enableTime && (!r && w.hourElement && w.hourElement.focus(), _(e), w._debouncedChange());
                        break;
                    case 9:
                        if (r) {
                            var d = [w.hourElement, w.minuteElement, w.secondElement, w.amPM].concat(w.pluginElements).filter((function(e) { return e })),
                                u = d.indexOf(n);
                            if (-1 !== u) {
                                var f = d[u + (e.shiftKey ? -1 : 1)];
                                e.preventDefault(), (f || w._input).focus()
                            }
                        } else !w.config.noCalendar && w.daysContainer && w.daysContainer.contains(n) && e.shiftKey && (e.preventDefault(), w._input.focus())
                }
            }
            if (void 0 !== w.amPM && n === w.amPM) switch (e.key) {
                case w.l10n.amPM[0].charAt(0):
                case w.l10n.amPM[0].charAt(0).toLowerCase():
                    w.amPM.textContent = w.l10n.amPM[0], O(), ye();
                    break;
                case w.l10n.amPM[1].charAt(0):
                case w.l10n.amPM[1].charAt(0).toLowerCase():
                    w.amPM.textContent = w.l10n.amPM[1], O(), ye()
            }(t || Q(n)) && De("onKeyDown", e)
        }

        function oe(e, n) {
            if (void 0 === n && (n = "flatpickr-day"), 1 === w.selectedDates.length && (!e || e.classList.contains(n) && !e.classList.contains("flatpickr-disabled"))) {
                for (var t = e ? e.dateObj.getTime() : w.days.firstElementChild.dateObj.getTime(), a = w.parseDate(w.selectedDates[0], void 0, !0).getTime(), i = Math.min(t, w.selectedDates[0].getTime()), o = Math.max(t, w.selectedDates[0].getTime()), r = !1, l = 0, c = 0, s = i; s < o; s += x) ne(new Date(s), !0) || (r = r || s > i && s < o, s < a && (!l || s > l) ? l = s : s > a && (!c || s < c) && (c = s));
                Array.from(w.rContainer.querySelectorAll("*:nth-child(-n+" + w.config.showMonths + ") > ." + n)).forEach((function(n) {
                    var i, o, s, d = n.dateObj.getTime(),
                        u = l > 0 && d < l || c > 0 && d > c;
                    if (u) return n.classList.add("notAllowed"), void["inRange", "startRange", "endRange"].forEach((function(e) { n.classList.remove(e) }));
                    r && !u || (["startRange", "inRange", "endRange", "notAllowed"].forEach((function(e) { n.classList.remove(e) })), void 0 !== e && (e.classList.add(t <= w.selectedDates[0].getTime() ? "startRange" : "endRange"), a < t && d === a ? n.classList.add("startRange") : a > t && d === a && n.classList.add("endRange"), d >= l && (0 === c || d <= c) && (o = a, s = t, (i = d) > Math.min(o, s) && i < Math.max(o, s)) && n.classList.add("inRange")))
                }))
            }
        }

        function re() {!w.isOpen || w.config.static || w.config.inline || de() }

        function le(e) {
            return function(n) {
                var t = w.config["_" + e + "Date"] = w.parseDate(n, w.config.dateFormat),
                    a = w.config["_" + ("min" === e ? "max" : "min") + "Date"];
                void 0 !== t && (w["min" === e ? "minDateHasTime" : "maxDateHasTime"] = t.getHours() > 0 || t.getMinutes() > 0 || t.getSeconds() > 0), w.selectedDates && (w.selectedDates = w.selectedDates.filter((function(e) { return ne(e) })), w.selectedDates.length || "min" !== e || F(t), ye()), w.daysContainer && (ue(), void 0 !== t ? w.currentYearElement[e] = t.getFullYear().toString() : w.currentYearElement.removeAttribute(e), w.currentYearElement.disabled = !!a && void 0 !== t && a.getFullYear() === t.getFullYear())
            }
        }

        function ce() { return w.config.wrap ? p.querySelector("[data-input]") : p }

        function se() { "object" != typeof w.config.locale && void 0 === I.l10ns[w.config.locale] && w.config.errorHandler(new Error("flatpickr: invalid locale " + w.config.locale)), w.l10n = e(e({}, I.l10ns.default), "object" == typeof w.config.locale ? w.config.locale : "default" !== w.config.locale ? I.l10ns[w.config.locale] : void 0), D.D = "(" + w.l10n.weekdays.shorthand.join("|") + ")", D.l = "(" + w.l10n.weekdays.longhand.join("|") + ")", D.M = "(" + w.l10n.months.shorthand.join("|") + ")", D.F = "(" + w.l10n.months.longhand.join("|") + ")", D.K = "(" + w.l10n.amPM[0] + "|" + w.l10n.amPM[1] + "|" + w.l10n.amPM[0].toLowerCase() + "|" + w.l10n.amPM[1].toLowerCase() + ")", void 0 === e(e({}, v), JSON.parse(JSON.stringify(p.dataset || {}))).time_24hr && void 0 === I.defaultConfig.time_24hr && (w.config.time_24hr = w.l10n.time_24hr), w.formatDate = b(w), w.parseDate = C({ config: w.config, l10n: w.l10n }) }

        function de(e) {
            if ("function" != typeof w.config.position) {
                if (void 0 !== w.calendarContainer) {
                    De("onPreCalendarPosition");
                    var n = e || w._positionElement,
                        t = Array.prototype.reduce.call(w.calendarContainer.children, (function(e, n) { return e + n.offsetHeight }), 0),
                        a = w.calendarContainer.offsetWidth,
                        i = w.config.position.split(" "),
                        o = i[0],
                        r = i.length > 1 ? i[1] : null,
                        l = n.getBoundingClientRect(),
                        c = window.innerHeight - l.bottom,
                        d = "above" === o || "below" !== o && c < t && l.top > t,
                        u = window.pageYOffset + l.top + (d ? -t - 2 : n.offsetHeight + 2);
                    if (s(w.calendarContainer, "arrowTop", !d), s(w.calendarContainer, "arrowBottom", d), !w.config.inline) {
                        var f = window.pageXOffset + l.left,
                            m = !1,
                            g = !1;
                        "center" === r ? (f -= (a - l.width) / 2, m = !0) : "right" === r && (f -= a - l.width, g = !0), s(w.calendarContainer, "arrowLeft", !m && !g), s(w.calendarContainer, "arrowCenter", m), s(w.calendarContainer, "arrowRight", g);
                        var p = window.document.body.offsetWidth - (window.pageXOffset + l.right),
                            h = f + a > window.document.body.offsetWidth,
                            v = p + a > window.document.body.offsetWidth;
                        if (s(w.calendarContainer, "rightMost", h), !w.config.static)
                            if (w.calendarContainer.style.top = u + "px", h)
                                if (v) {
                                    var D = function() {
                                        for (var e = null, n = 0; n < document.styleSheets.length; n++) {
                                            var t = document.styleSheets[n];
                                            if (t.cssRules) {
                                                try { t.cssRules } catch (e) { continue }
                                                e = t;
                                                break
                                            }
                                        }
                                        return null != e ? e : (a = document.createElement("style"), document.head.appendChild(a), a.sheet);
                                        var a
                                    }();
                                    if (void 0 === D) return;
                                    var b = window.document.body.offsetWidth,
                                        C = Math.max(0, b / 2 - a / 2),
                                        M = D.cssRules.length,
                                        y = "{left:" + l.left + "px;right:auto;}";
                                    s(w.calendarContainer, "rightMost", !1), s(w.calendarContainer, "centerMost", !0), D.insertRule(".flatpickr-calendar.centerMost:before,.flatpickr-calendar.centerMost:after" + y, M), w.calendarContainer.style.left = C + "px", w.calendarContainer.style.right = "auto"
                                } else w.calendarContainer.style.left = "auto", w.calendarContainer.style.right = p + "px";
                        else w.calendarContainer.style.left = f + "px", w.calendarContainer.style.right = "auto"
                    }
                }
            } else w.config.position(w, e)
        }

        function ue() { w.config.noCalendar || w.isMobile || (q(), Ce(), U()) }

        function fe() { w._input.focus(), -1 !== window.navigator.userAgent.indexOf("MSIE") || void 0 !== navigator.msMaxTouchPoints ? setTimeout(w.close, 0) : w.close() }

        function me(e) {
            e.preventDefault(), e.stopPropagation();
            var n = f(g(e), (function(e) { return e.classList && e.classList.contains("flatpickr-day") && !e.classList.contains("flatpickr-disabled") && !e.classList.contains("notAllowed") }));
            if (void 0 !== n) {
                var t = n,
                    a = w.latestSelectedDateObj = new Date(t.dateObj.getTime()),
                    i = (a.getMonth() < w.currentMonth || a.getMonth() > w.currentMonth + w.config.showMonths - 1) && "range" !== w.config.mode;
                if (w.selectedDateElem = t, "single" === w.config.mode) w.selectedDates = [a];
                else if ("multiple" === w.config.mode) {
                    var o = be(a);
                    o ? w.selectedDates.splice(parseInt(o), 1) : w.selectedDates.push(a)
                } else "range" === w.config.mode && (2 === w.selectedDates.length && w.clear(!1, !1), w.latestSelectedDateObj = a, w.selectedDates.push(a), 0 !== M(a, w.selectedDates[0], !0) && w.selectedDates.sort((function(e, n) { return e.getTime() - n.getTime() })));
                if (O(), i) {
                    var r = w.currentYear !== a.getFullYear();
                    w.currentYear = a.getFullYear(), w.currentMonth = a.getMonth(), r && (De("onYearChange"), q()), De("onMonthChange")
                }
                if (Ce(), U(), ye(), i || "range" === w.config.mode || 1 !== w.config.showMonths ? void 0 !== w.selectedDateElem && void 0 === w.hourElement && w.selectedDateElem && w.selectedDateElem.focus() : W(t), void 0 !== w.hourElement && void 0 !== w.hourElement && w.hourElement.focus(), w.config.closeOnSelect) {
                    var l = "single" === w.config.mode && !w.config.enableTime,
                        c = "range" === w.config.mode && 2 === w.selectedDates.length && !w.config.enableTime;
                    (l || c) && fe()
                }
                Y()
            }
        }
        w.parseDate = C({ config: w.config, l10n: w.l10n }), w._handlers = [], w.pluginElements = [], w.loadedPlugins = [], w._bind = P, w._setHoursFromDate = F, w._positionCalendar = de, w.changeMonth = Z, w.changeYear = ee, w.clear = function(e, n) {
            void 0 === e && (e = !0);
            void 0 === n && (n = !0);
            w.input.value = "", void 0 !== w.altInput && (w.altInput.value = "");
            void 0 !== w.mobileInput && (w.mobileInput.value = "");
            w.selectedDates = [], w.latestSelectedDateObj = void 0, !0 === n && (w.currentYear = w._initialDate.getFullYear(), w.currentMonth = w._initialDate.getMonth());
            if (!0 === w.config.enableTime) {
                var t = E(w.config),
                    a = t.hours,
                    i = t.minutes,
                    o = t.seconds;
                A(a, i, o)
            }
            w.redraw(), e && De("onChange")
        }, w.close = function() {
            w.isOpen = !1, w.isMobile || (void 0 !== w.calendarContainer && w.calendarContainer.classList.remove("open"), void 0 !== w._input && w._input.classList.remove("active"));
            De("onClose")
        }, w.onMouseOver = oe, w._createElement = d, w.createDay = R, w.destroy = function() {
            void 0 !== w.config && De("onDestroy");
            for (var e = w._handlers.length; e--;) w._handlers[e].remove();
            if (w._handlers = [], w.mobileInput) w.mobileInput.parentNode && w.mobileInput.parentNode.removeChild(w.mobileInput), w.mobileInput = void 0;
            else if (w.calendarContainer && w.calendarContainer.parentNode)
                if (w.config.static && w.calendarContainer.parentNode) {
                    var n = w.calendarContainer.parentNode;
                    if (n.lastChild && n.removeChild(n.lastChild), n.parentNode) {
                        for (; n.firstChild;) n.parentNode.insertBefore(n.firstChild, n);
                        n.parentNode.removeChild(n)
                    }
                } else w.calendarContainer.parentNode.removeChild(w.calendarContainer);
            w.altInput && (w.input.type = "text", w.altInput.parentNode && w.altInput.parentNode.removeChild(w.altInput), delete w.altInput);
            w.input && (w.input.type = w.input._type, w.input.classList.remove("flatpickr-input"), w.input.removeAttribute("readonly"));
            ["_showTimeInput", "latestSelectedDateObj", "_hideNextMonthArrow", "_hidePrevMonthArrow", "__hideNextMonthArrow", "__hidePrevMonthArrow", "isMobile", "isOpen", "selectedDateElem", "minDateHasTime", "maxDateHasTime", "days", "daysContainer", "_input", "_positionElement", "innerContainer", "rContainer", "monthNav", "todayDateElem", "calendarContainer", "weekdayContainer", "prevMonthNav", "nextMonthNav", "monthsDropdownContainer", "currentMonthElement", "currentYearElement", "navigationCurrentMonth", "selectedDateElem", "config"].forEach((function(e) { try { delete w[e] } catch (e) {} }))
        }, w.isEnabled = ne, w.jumpToDate = j, w.updateValue = ye, w.open = function(e, n) {
            void 0 === n && (n = w._positionElement);
            if (!0 === w.isMobile) {
                if (e) {
                    e.preventDefault();
                    var t = g(e);
                    t && t.blur()
                }
                return void 0 !== w.mobileInput && (w.mobileInput.focus(), w.mobileInput.click()), void De("onOpen")
            }
            if (w._input.disabled || w.config.inline) return;
            var a = w.isOpen;
            w.isOpen = !0, a || (w.calendarContainer.classList.add("open"), w._input.classList.add("active"), De("onOpen"), de(n));
            !0 === w.config.enableTime && !0 === w.config.noCalendar && (!1 !== w.config.allowInput || void 0 !== e && w.timeContainer.contains(e.relatedTarget) || setTimeout((function() { return w.hourElement.select() }), 50))
        }, w.redraw = ue, w.set = function(e, n) {
            if (null !== e && "object" == typeof e)
                for (var a in Object.assign(w.config, e), e) void 0 !== ge[a] && ge[a].forEach((function(e) { return e() }));
            else w.config[e] = n, void 0 !== ge[e] ? ge[e].forEach((function(e) { return e() })) : t.indexOf(e) > -1 && (w.config[e] = c(n));
            w.redraw(), ye(!0)
        }, w.setDate = function(e, n, t) {
            void 0 === n && (n = !1);
            void 0 === t && (t = w.config.dateFormat);
            if (0 !== e && !e || e instanceof Array && 0 === e.length) return w.clear(n);
            pe(e, t), w.latestSelectedDateObj = w.selectedDates[w.selectedDates.length - 1], w.redraw(), j(void 0, n), F(), 0 === w.selectedDates.length && w.clear(!1);
            ye(n), n && De("onChange")
        }, w.toggle = function(e) {
            if (!0 === w.isOpen) return w.close();
            w.open(e)
        };
        var ge = { locale: [se, G], showMonths: [V, S, z], minDate: [j], maxDate: [j], positionElement: [ve], clickOpens: [function() {!0 === w.config.clickOpens ? (P(w._input, "focus", w.open), P(w._input, "click", w.open)) : (w._input.removeEventListener("focus", w.open), w._input.removeEventListener("click", w.open)) }] };

        function pe(e, n) {
            var t = [];
            if (e instanceof Array) t = e.map((function(e) { return w.parseDate(e, n) }));
            else if (e instanceof Date || "number" == typeof e) t = [w.parseDate(e, n)];
            else if ("string" == typeof e) switch (w.config.mode) {
                case "single":
                case "time":
                    t = [w.parseDate(e, n)];
                    break;
                case "multiple":
                    t = e.split(w.config.conjunction).map((function(e) { return w.parseDate(e, n) }));
                    break;
                case "range":
                    t = e.split(w.l10n.rangeSeparator).map((function(e) { return w.parseDate(e, n) }))
            } else w.config.errorHandler(new Error("Invalid date supplied: " + JSON.stringify(e)));
            w.selectedDates = w.config.allowInvalidPreload ? t : t.filter((function(e) { return e instanceof Date && ne(e, !1) })), "range" === w.config.mode && w.selectedDates.sort((function(e, n) { return e.getTime() - n.getTime() }))
        }

        function he(e) { return e.slice().map((function(e) { return "string" == typeof e || "number" == typeof e || e instanceof Date ? w.parseDate(e, void 0, !0) : e && "object" == typeof e && e.from && e.to ? { from: w.parseDate(e.from, void 0), to: w.parseDate(e.to, void 0) } : e })).filter((function(e) { return e })) }

        function ve() { w._positionElement = w.config.positionElement || w._input }

        function De(e, n) {
            if (void 0 !== w.config) {
                var t = w.config[e];
                if (void 0 !== t && t.length > 0)
                    for (var a = 0; t[a] && a < t.length; a++) t[a](w.selectedDates, w.input.value, w, n);
                "onChange" === e && (w.input.dispatchEvent(we("change")), w.input.dispatchEvent(we("input")))
            }
        }

        function we(e) { var n = document.createEvent("Event"); return n.initEvent(e, !0, !0), n }

        function be(e) { for (var n = 0; n < w.selectedDates.length; n++) { var t = w.selectedDates[n]; if (t instanceof Date && 0 === M(t, e)) return "" + n } return !1 }

        function Ce() {
            w.config.noCalendar || w.isMobile || !w.monthNav || (w.yearElements.forEach((function(e, n) {
                var t = new Date(w.currentYear, w.currentMonth, 1);
                t.setMonth(w.currentMonth + n), w.config.showMonths > 1 || "static" === w.config.monthSelectorType ? w.monthElements[n].textContent = h(t.getMonth(), w.config.shorthandCurrentMonth, w.l10n) + " " : w.monthsDropdownContainer.value = t.getMonth().toString(), e.value = t.getFullYear().toString()
            })), w._hidePrevMonthArrow = void 0 !== w.config.minDate && (w.currentYear === w.config.minDate.getFullYear() ? w.currentMonth <= w.config.minDate.getMonth() : w.currentYear < w.config.minDate.getFullYear()), w._hideNextMonthArrow = void 0 !== w.config.maxDate && (w.currentYear === w.config.maxDate.getFullYear() ? w.currentMonth + 1 > w.config.maxDate.getMonth() : w.currentYear > w.config.maxDate.getFullYear()))
        }

        function Me(e) { var n = e || (w.config.altInput ? w.config.altFormat : w.config.dateFormat); return w.selectedDates.map((function(e) { return w.formatDate(e, n) })).filter((function(e, n, t) { return "range" !== w.config.mode || w.config.enableTime || t.indexOf(e) === n })).join("range" !== w.config.mode ? w.config.conjunction : w.l10n.rangeSeparator) }

        function ye(e) { void 0 === e && (e = !0), void 0 !== w.mobileInput && w.mobileFormatStr && (w.mobileInput.value = void 0 !== w.latestSelectedDateObj ? w.formatDate(w.latestSelectedDateObj, w.mobileFormatStr) : ""), w.input.value = Me(w.config.dateFormat), void 0 !== w.altInput && (w.altInput.value = Me(w.config.altFormat)), !1 !== e && De("onValueUpdate") }

        function xe(e) {
            var n = g(e),
                t = w.prevMonthNav.contains(n),
                a = w.nextMonthNav.contains(n);
            t || a ? Z(t ? -1 : 1) : w.yearElements.indexOf(n) >= 0 ? n.select() : n.classList.contains("arrowUp") ? w.changeYear(w.currentYear + 1) : n.classList.contains("arrowDown") && w.changeYear(w.currentYear - 1)
        }
        return function() {
            w.element = w.input = p, w.isOpen = !1,
                function() {
                    var n = ["wrap", "weekNumbers", "allowInput", "allowInvalidPreload", "clickOpens", "time_24hr", "enableTime", "noCalendar", "altInput", "shorthandCurrentMonth", "inline", "static", "enableSeconds", "disableMobile"],
                        i = e(e({}, JSON.parse(JSON.stringify(p.dataset || {}))), v),
                        o = {};
                    w.config.parseDate = i.parseDate, w.config.formatDate = i.formatDate, Object.defineProperty(w.config, "enable", { get: function() { return w.config._enable }, set: function(e) { w.config._enable = he(e) } }), Object.defineProperty(w.config, "disable", { get: function() { return w.config._disable }, set: function(e) { w.config._disable = he(e) } });
                    var r = "time" === i.mode;
                    if (!i.dateFormat && (i.enableTime || r)) {
                        var l = I.defaultConfig.dateFormat || a.dateFormat;
                        o.dateFormat = i.noCalendar || r ? "H:i" + (i.enableSeconds ? ":S" : "") : l + " H:i" + (i.enableSeconds ? ":S" : "")
                    }
                    if (i.altInput && (i.enableTime || r) && !i.altFormat) {
                        var s = I.defaultConfig.altFormat || a.altFormat;
                        o.altFormat = i.noCalendar || r ? "h:i" + (i.enableSeconds ? ":S K" : " K") : s + " h:i" + (i.enableSeconds ? ":S" : "") + " K"
                    }
                    Object.defineProperty(w.config, "minDate", { get: function() { return w.config._minDate }, set: le("min") }), Object.defineProperty(w.config, "maxDate", { get: function() { return w.config._maxDate }, set: le("max") });
                    var d = function(e) { return function(n) { w.config["min" === e ? "_minTime" : "_maxTime"] = w.parseDate(n, "H:i:S") } };
                    Object.defineProperty(w.config, "minTime", { get: function() { return w.config._minTime }, set: d("min") }), Object.defineProperty(w.config, "maxTime", { get: function() { return w.config._maxTime }, set: d("max") }), "time" === i.mode && (w.config.noCalendar = !0, w.config.enableTime = !0);
                    Object.assign(w.config, o, i);
                    for (var u = 0; u < n.length; u++) w.config[n[u]] = !0 === w.config[n[u]] || "true" === w.config[n[u]];
                    t.filter((function(e) { return void 0 !== w.config[e] })).forEach((function(e) { w.config[e] = c(w.config[e] || []).map(T) })), w.isMobile = !w.config.disableMobile && !w.config.inline && "single" === w.config.mode && !w.config.disable.length && !w.config.enable && !w.config.weekNumbers && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                    for (u = 0; u < w.config.plugins.length; u++) { var f = w.config.plugins[u](w) || {}; for (var m in f) t.indexOf(m) > -1 ? w.config[m] = c(f[m]).map(T).concat(w.config[m]) : void 0 === i[m] && (w.config[m] = f[m]) }
                    i.altInputClass || (w.config.altInputClass = ce().className + " " + w.config.altInputClass);
                    De("onParseConfig")
                }(), se(),
                function() {
                    if (w.input = ce(), !w.input) return void w.config.errorHandler(new Error("Invalid input element specified"));
                    w.input._type = w.input.type, w.input.type = "text", w.input.classList.add("flatpickr-input"), w._input = w.input, w.config.altInput && (w.altInput = d(w.input.nodeName, w.config.altInputClass), w._input = w.altInput, w.altInput.placeholder = w.input.placeholder, w.altInput.disabled = w.input.disabled, w.altInput.required = w.input.required, w.altInput.tabIndex = w.input.tabIndex, w.altInput.type = "text", w.input.setAttribute("type", "hidden"), !w.config.static && w.input.parentNode && w.input.parentNode.insertBefore(w.altInput, w.input.nextSibling));
                    w.config.allowInput || w._input.setAttribute("readonly", "readonly");
                    ve()
                }(),
                function() {
                    w.selectedDates = [], w.now = w.parseDate(w.config.now) || new Date;
                    var e = w.config.defaultDate || ("INPUT" !== w.input.nodeName && "TEXTAREA" !== w.input.nodeName || !w.input.placeholder || w.input.value !== w.input.placeholder ? w.input.value : null);
                    e && pe(e, w.config.dateFormat);
                    w._initialDate = w.selectedDates.length > 0 ? w.selectedDates[0] : w.config.minDate && w.config.minDate.getTime() > w.now.getTime() ? w.config.minDate : w.config.maxDate && w.config.maxDate.getTime() < w.now.getTime() ? w.config.maxDate : w.now, w.currentYear = w._initialDate.getFullYear(), w.currentMonth = w._initialDate.getMonth(), w.selectedDates.length > 0 && (w.latestSelectedDateObj = w.selectedDates[0]);
                    void 0 !== w.config.minTime && (w.config.minTime = w.parseDate(w.config.minTime, "H:i"));
                    void 0 !== w.config.maxTime && (w.config.maxTime = w.parseDate(w.config.maxTime, "H:i"));
                    w.minDateHasTime = !!w.config.minDate && (w.config.minDate.getHours() > 0 || w.config.minDate.getMinutes() > 0 || w.config.minDate.getSeconds() > 0), w.maxDateHasTime = !!w.config.maxDate && (w.config.maxDate.getHours() > 0 || w.config.maxDate.getMinutes() > 0 || w.config.maxDate.getSeconds() > 0)
                }(), w.utils = { getDaysInMonth: function(e, n) { return void 0 === e && (e = w.currentMonth), void 0 === n && (n = w.currentYear), 1 === e && (n % 4 == 0 && n % 100 != 0 || n % 400 == 0) ? 29 : w.l10n.daysInMonth[e] } }, w.isMobile || function() {
                    var e = window.document.createDocumentFragment();
                    if (w.calendarContainer = d("div", "flatpickr-calendar"), w.calendarContainer.tabIndex = -1, !w.config.noCalendar) {
                        if (e.appendChild((w.monthNav = d("div", "flatpickr-months"), w.yearElements = [], w.monthElements = [], w.prevMonthNav = d("span", "flatpickr-prev-month"), w.prevMonthNav.innerHTML = w.config.prevArrow, w.nextMonthNav = d("span", "flatpickr-next-month"), w.nextMonthNav.innerHTML = w.config.nextArrow, V(), Object.defineProperty(w, "_hidePrevMonthArrow", { get: function() { return w.__hidePrevMonthArrow }, set: function(e) { w.__hidePrevMonthArrow !== e && (s(w.prevMonthNav, "flatpickr-disabled", e), w.__hidePrevMonthArrow = e) } }), Object.defineProperty(w, "_hideNextMonthArrow", { get: function() { return w.__hideNextMonthArrow }, set: function(e) { w.__hideNextMonthArrow !== e && (s(w.nextMonthNav, "flatpickr-disabled", e), w.__hideNextMonthArrow = e) } }), w.currentYearElement = w.yearElements[0], Ce(), w.monthNav)), w.innerContainer = d("div", "flatpickr-innerContainer"), w.config.weekNumbers) {
                            var n = function() {
                                    w.calendarContainer.classList.add("hasWeeks");
                                    var e = d("div", "flatpickr-weekwrapper");
                                    e.appendChild(d("span", "flatpickr-weekday", w.l10n.weekAbbreviation));
                                    var n = d("div", "flatpickr-weeks");
                                    return e.appendChild(n), { weekWrapper: e, weekNumbers: n }
                                }(),
                                t = n.weekWrapper,
                                a = n.weekNumbers;
                            w.innerContainer.appendChild(t), w.weekNumbers = a, w.weekWrapper = t
                        }
                        w.rContainer = d("div", "flatpickr-rContainer"), w.rContainer.appendChild(z()), w.daysContainer || (w.daysContainer = d("div", "flatpickr-days"), w.daysContainer.tabIndex = -1), U(), w.rContainer.appendChild(w.daysContainer), w.innerContainer.appendChild(w.rContainer), e.appendChild(w.innerContainer)
                    }
                    w.config.enableTime && e.appendChild(function() {
                        w.calendarContainer.classList.add("hasTime"), w.config.noCalendar && w.calendarContainer.classList.add("noCalendar");
                        var e = E(w.config);
                        w.timeContainer = d("div", "flatpickr-time"), w.timeContainer.tabIndex = -1;
                        var n = d("span", "flatpickr-time-separator", ":"),
                            t = m("flatpickr-hour", { "aria-label": w.l10n.hourAriaLabel });
                        w.hourElement = t.getElementsByTagName("input")[0];
                        var a = m("flatpickr-minute", { "aria-label": w.l10n.minuteAriaLabel });
                        w.minuteElement = a.getElementsByTagName("input")[0], w.hourElement.tabIndex = w.minuteElement.tabIndex = -1, w.hourElement.value = o(w.latestSelectedDateObj ? w.latestSelectedDateObj.getHours() : w.config.time_24hr ? e.hours : function(e) {
                            switch (e % 24) {
                                case 0:
                                case 12:
                                    return 12;
                                default:
                                    return e % 12
                            }
                        }(e.hours)), w.minuteElement.value = o(w.latestSelectedDateObj ? w.latestSelectedDateObj.getMinutes() : e.minutes), w.hourElement.setAttribute("step", w.config.hourIncrement.toString()), w.minuteElement.setAttribute("step", w.config.minuteIncrement.toString()), w.hourElement.setAttribute("min", w.config.time_24hr ? "0" : "1"), w.hourElement.setAttribute("max", w.config.time_24hr ? "23" : "12"), w.hourElement.setAttribute("maxlength", "2"), w.minuteElement.setAttribute("min", "0"), w.minuteElement.setAttribute("max", "59"), w.minuteElement.setAttribute("maxlength", "2"), w.timeContainer.appendChild(t), w.timeContainer.appendChild(n), w.timeContainer.appendChild(a), w.config.time_24hr && w.timeContainer.classList.add("time24hr");
                        if (w.config.enableSeconds) {
                            w.timeContainer.classList.add("hasSeconds");
                            var i = m("flatpickr-second");
                            w.secondElement = i.getElementsByTagName("input")[0], w.secondElement.value = o(w.latestSelectedDateObj ? w.latestSelectedDateObj.getSeconds() : e.seconds), w.secondElement.setAttribute("step", w.minuteElement.getAttribute("step")), w.secondElement.setAttribute("min", "0"), w.secondElement.setAttribute("max", "59"), w.secondElement.setAttribute("maxlength", "2"), w.timeContainer.appendChild(d("span", "flatpickr-time-separator", ":")), w.timeContainer.appendChild(i)
                        }
                        w.config.time_24hr || (w.amPM = d("span", "flatpickr-am-pm", w.l10n.amPM[r((w.latestSelectedDateObj ? w.hourElement.value : w.config.defaultHour) > 11)]), w.amPM.title = w.l10n.toggleTitle, w.amPM.tabIndex = -1, w.timeContainer.appendChild(w.amPM));
                        return w.timeContainer
                    }());
                    s(w.calendarContainer, "rangeMode", "range" === w.config.mode), s(w.calendarContainer, "animate", !0 === w.config.animate), s(w.calendarContainer, "multiMonth", w.config.showMonths > 1), w.calendarContainer.appendChild(e);
                    var i = void 0 !== w.config.appendTo && void 0 !== w.config.appendTo.nodeType;
                    if ((w.config.inline || w.config.static) && (w.calendarContainer.classList.add(w.config.inline ? "inline" : "static"), w.config.inline && (!i && w.element.parentNode ? w.element.parentNode.insertBefore(w.calendarContainer, w._input.nextSibling) : void 0 !== w.config.appendTo && w.config.appendTo.appendChild(w.calendarContainer)), w.config.static)) {
                        var l = d("div", "flatpickr-wrapper");
                        w.element.parentNode && w.element.parentNode.insertBefore(l, w.element), l.appendChild(w.element), w.altInput && l.appendChild(w.altInput), l.appendChild(w.calendarContainer)
                    }
                    w.config.static || w.config.inline || (void 0 !== w.config.appendTo ? w.config.appendTo : window.document.body).appendChild(w.calendarContainer)
                }(),
                function() {
                    w.config.wrap && ["open", "close", "toggle", "clear"].forEach((function(e) { Array.prototype.forEach.call(w.element.querySelectorAll("[data-" + e + "]"), (function(n) { return P(n, "click", w[e]) })) }));
                    if (w.isMobile) return void

                    function() {
                        var e = w.config.enableTime ? w.config.noCalendar ? "time" : "datetime-local" : "date";
                        w.mobileInput = d("input", w.input.className + " flatpickr-mobile"), w.mobileInput.tabIndex = 1, w.mobileInput.type = e, w.mobileInput.disabled = w.input.disabled, w.mobileInput.required = w.input.required, w.mobileInput.placeholder = w.input.placeholder, w.mobileFormatStr = "datetime-local" === e ? "Y-m-d\\TH:i:S" : "date" === e ? "Y-m-d" : "H:i:S", w.selectedDates.length > 0 && (w.mobileInput.defaultValue = w.mobileInput.value = w.formatDate(w.selectedDates[0], w.mobileFormatStr));
                        w.config.minDate && (w.mobileInput.min = w.formatDate(w.config.minDate, "Y-m-d"));
                        w.config.maxDate && (w.mobileInput.max = w.formatDate(w.config.maxDate, "Y-m-d"));
                        w.input.getAttribute("step") && (w.mobileInput.step = String(w.input.getAttribute("step")));
                        w.input.type = "hidden", void 0 !== w.altInput && (w.altInput.type = "hidden");
                        try { w.input.parentNode && w.input.parentNode.insertBefore(w.mobileInput, w.input.nextSibling) } catch (e) {}
                        P(w.mobileInput, "change", (function(e) { w.setDate(g(e).value, !1, w.mobileFormatStr), De("onChange"), De("onClose") }))
                    }();
                    var e = l(re, 50);
                    w._debouncedChange = l(Y, 300), w.daysContainer && !/iPhone|iPad|iPod/i.test(navigator.userAgent) && P(w.daysContainer, "mouseover", (function(e) { "range" === w.config.mode && oe(g(e)) }));
                    P(w._input, "keydown", ie), void 0 !== w.calendarContainer && P(w.calendarContainer, "keydown", ie);
                    w.config.inline || w.config.static || P(window, "resize", e);
                    void 0 !== window.ontouchstart ? P(window.document, "touchstart", X) : P(window.document, "mousedown", X);
                    P(window.document, "focus", X, { capture: !0 }), !0 === w.config.clickOpens && (P(w._input, "focus", w.open), P(w._input, "click", w.open));
                    void 0 !== w.daysContainer && (P(w.monthNav, "click", xe), P(w.monthNav, ["keyup", "increment"], N), P(w.daysContainer, "click", me));
                    if (void 0 !== w.timeContainer && void 0 !== w.minuteElement && void 0 !== w.hourElement) {
                        var n = function(e) { return g(e).select() };
                        P(w.timeContainer, ["increment"], _), P(w.timeContainer, "blur", _, { capture: !0 }), P(w.timeContainer, "click", H), P([w.hourElement, w.minuteElement], ["focus", "click"], n), void 0 !== w.secondElement && P(w.secondElement, "focus", (function() { return w.secondElement && w.secondElement.select() })), void 0 !== w.amPM && P(w.amPM, "click", (function(e) { _(e) }))
                    }
                    w.config.allowInput && P(w._input, "blur", ae)
                }(), (w.selectedDates.length || w.config.noCalendar) && (w.config.enableTime && F(w.config.noCalendar ? w.latestSelectedDateObj : void 0), ye(!1)), S();
            var n = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
            !w.isMobile && n && de(), De("onReady")
        }(), w
    }

    function T(e, n) {
        for (var t = Array.prototype.slice.call(e).filter((function(e) { return e instanceof HTMLElement })), a = [], i = 0; i < t.length; i++) {
            var o = t[i];
            try {
                if (null !== o.getAttribute("data-fp-omit")) continue;
                void 0 !== o._flatpickr && (o._flatpickr.destroy(), o._flatpickr = void 0), o._flatpickr = k(o, n || {}), a.push(o._flatpickr)
            } catch (e) { console.error(e) }
        }
        return 1 === a.length ? a[0] : a
    }
    "undefined" != typeof HTMLElement && "undefined" != typeof HTMLCollection && "undefined" != typeof NodeList && (HTMLCollection.prototype.flatpickr = NodeList.prototype.flatpickr = function(e) { return T(this, e) }, HTMLElement.prototype.flatpickr = function(e) { return T([this], e) });
    var I = function(e, n) { return "string" == typeof e ? T(window.document.querySelectorAll(e), n) : e instanceof Node ? T([e], n) : T(e, n) };
    return I.defaultConfig = {}, I.l10ns = { en: e({}, i), default: e({}, i) }, I.localize = function(n) { I.l10ns.default = e(e({}, I.l10ns.default), n) }, I.setDefaults = function(n) { I.defaultConfig = e(e({}, I.defaultConfig), n) }, I.parseDate = C({}), I.formatDate = b({}), I.compareDates = M, "undefined" != typeof jQuery && void 0 !== jQuery.fn && (jQuery.fn.flatpickr = function(e) { return T(this, e) }), Date.prototype.fp_incr = function(e) { return new Date(this.getFullYear(), this.getMonth(), this.getDate() + ("string" == typeof e ? parseInt(e, 10) : e)) }, "undefined" != typeof window && (window.flatpickr = I), I
}));; /*! Select2 4.0.13 | https://github.com/select2/select2/blob/master/LICENSE.md */
! function(n) { "function" == typeof define && define.amd ? define(["jquery"], n) : "object" == typeof module && module.exports ? module.exports = function(e, t) { return void 0 === t && (t = "undefined" != typeof window ? require("jquery") : require("jquery")(e)), n(t), t } : n(jQuery) }(function(u) {
    var e = function() {
            if (u && u.fn && u.fn.select2 && u.fn.select2.amd) var e = u.fn.select2.amd;
            var t, n, r, h, o, s, f, g, m, v, y, _, i, a, b;

            function w(e, t) { return i.call(e, t) }

            function l(e, t) {
                var n, r, i, o, s, a, l, c, u, d, p, h = t && t.split("/"),
                    f = y.map,
                    g = f && f["*"] || {};
                if (e) {
                    for (s = (e = e.split("/")).length - 1, y.nodeIdCompat && b.test(e[s]) && (e[s] = e[s].replace(b, "")), "." === e[0].charAt(0) && h && (e = h.slice(0, h.length - 1).concat(e)), u = 0; u < e.length; u++)
                        if ("." === (p = e[u])) e.splice(u, 1), --u;
                        else if (".." === p) {
                        if (0 === u || 1 === u && ".." === e[2] || ".." === e[u - 1]) continue;
                        0 < u && (e.splice(u - 1, 2), u -= 2)
                    }
                    e = e.join("/")
                }
                if ((h || g) && f) {
                    for (u = (n = e.split("/")).length; 0 < u; --u) {
                        if (r = n.slice(0, u).join("/"), h)
                            for (d = h.length; 0 < d; --d)
                                if (i = (i = f[h.slice(0, d).join("/")]) && i[r]) { o = i, a = u; break }
                        if (o) break;
                        !l && g && g[r] && (l = g[r], c = u)
                    }!o && l && (o = l, a = c), o && (n.splice(0, a, o), e = n.join("/"))
                }
                return e
            }

            function A(t, n) { return function() { var e = a.call(arguments, 0); return "string" != typeof e[0] && 1 === e.length && e.push(null), s.apply(h, e.concat([t, n])) } }

            function x(t) { return function(e) { m[t] = e } }

            function D(e) {
                if (w(v, e)) {
                    var t = v[e];
                    delete v[e], _[e] = !0, o.apply(h, t)
                }
                if (!w(m, e) && !w(_, e)) throw new Error("No " + e);
                return m[e]
            }

            function c(e) { var t, n = e ? e.indexOf("!") : -1; return -1 < n && (t = e.substring(0, n), e = e.substring(n + 1, e.length)), [t, e] }

            function S(e) { return e ? c(e) : [] }
            return e && e.requirejs || (e ? n = e : e = {}, m = {}, v = {}, y = {}, _ = {}, i = Object.prototype.hasOwnProperty, a = [].slice, b = /\.js$/, f = function(e, t) {
                var n, r, i = c(e),
                    o = i[0],
                    s = t[1];
                return e = i[1], o && (n = D(o = l(o, s))), o ? e = n && n.normalize ? n.normalize(e, (r = s, function(e) { return l(e, r) })) : l(e, s) : (o = (i = c(e = l(e, s)))[0], e = i[1], o && (n = D(o))), { f: o ? o + "!" + e : e, n: e, pr: o, p: n }
            }, g = { require: function(e) { return A(e) }, exports: function(e) { var t = m[e]; return void 0 !== t ? t : m[e] = {} }, module: function(e) { return { id: e, uri: "", exports: m[e], config: (t = e, function() { return y && y.config && y.config[t] || {} }) }; var t } }, o = function(e, t, n, r) {
                var i, o, s, a, l, c, u, d = [],
                    p = typeof n;
                if (c = S(r = r || e), "undefined" == p || "function" == p) {
                    for (t = !t.length && n.length ? ["require", "exports", "module"] : t, l = 0; l < t.length; l += 1)
                        if ("require" === (o = (a = f(t[l], c)).f)) d[l] = g.require(e);
                        else if ("exports" === o) d[l] = g.exports(e), u = !0;
                    else if ("module" === o) i = d[l] = g.module(e);
                    else if (w(m, o) || w(v, o) || w(_, o)) d[l] = D(o);
                    else {
                        if (!a.p) throw new Error(e + " missing " + o);
                        a.p.load(a.n, A(r, !0), x(o), {}), d[l] = m[o]
                    }
                    s = n ? n.apply(m[e], d) : void 0, e && (i && i.exports !== h && i.exports !== m[e] ? m[e] = i.exports : s === h && u || (m[e] = s))
                } else e && (m[e] = n)
            }, t = n = s = function(e, t, n, r, i) {
                if ("string" == typeof e) return g[e] ? g[e](t) : D(f(e, S(t)).f);
                if (!e.splice) {
                    if ((y = e).deps && s(y.deps, y.callback), !t) return;
                    t.splice ? (e = t, t = n, n = null) : e = h
                }
                return t = t || function() {}, "function" == typeof n && (n = r, r = i), r ? o(h, e, t, n) : setTimeout(function() { o(h, e, t, n) }, 4), s
            }, s.config = function(e) { return s(e) }, t._defined = m, (r = function(e, t, n) {
                if ("string" != typeof e) throw new Error("See almond README: incorrect module build, no module name");
                t.splice || (n = t, t = []), w(m, e) || w(v, e) || (v[e] = [e, t, n])
            }).amd = { jQuery: !0 }, e.requirejs = t, e.require = n, e.define = r), e.define("almond", function() {}), e.define("jquery", [], function() { var e = u || $; return null == e && console && console.error && console.error("Select2: An instance of jQuery or a jQuery-compatible library was not found. Make sure that you are including jQuery before Select2 on your web page."), e }), e.define("select2/utils", ["jquery"], function(o) {
                var i = {};

                function u(e) {
                    var t = e.prototype,
                        n = [];
                    for (var r in t) { "function" == typeof t[r] && "constructor" !== r && n.push(r) }
                    return n
                }
                i.Extend = function(e, t) {
                    var n = {}.hasOwnProperty;

                    function r() { this.constructor = e }
                    for (var i in t) n.call(t, i) && (e[i] = t[i]);
                    return r.prototype = t.prototype, e.prototype = new r, e.__super__ = t.prototype, e
                }, i.Decorate = function(r, i) {
                    var e = u(i),
                        t = u(r);

                    function o() {
                        var e = Array.prototype.unshift,
                            t = i.prototype.constructor.length,
                            n = r.prototype.constructor;
                        0 < t && (e.call(arguments, r.prototype.constructor), n = i.prototype.constructor), n.apply(this, arguments)
                    }
                    i.displayName = r.displayName, o.prototype = new function() { this.constructor = o };
                    for (var n = 0; n < t.length; n++) {
                        var s = t[n];
                        o.prototype[s] = r.prototype[s]
                    }

                    function a(e) {
                        var t = function() {};
                        e in o.prototype && (t = o.prototype[e]);
                        var n = i.prototype[e];
                        return function() { return Array.prototype.unshift.call(arguments, t), n.apply(this, arguments) }
                    }
                    for (var l = 0; l < e.length; l++) {
                        var c = e[l];
                        o.prototype[c] = a(c)
                    }
                    return o
                };

                function e() { this.listeners = {} }
                e.prototype.on = function(e, t) { this.listeners = this.listeners || {}, e in this.listeners ? this.listeners[e].push(t) : this.listeners[e] = [t] }, e.prototype.trigger = function(e) {
                    var t = Array.prototype.slice,
                        n = t.call(arguments, 1);
                    this.listeners = this.listeners || {}, null == n && (n = []), 0 === n.length && n.push({}), (n[0]._type = e) in this.listeners && this.invoke(this.listeners[e], t.call(arguments, 1)), "*" in this.listeners && this.invoke(this.listeners["*"], arguments)
                }, e.prototype.invoke = function(e, t) { for (var n = 0, r = e.length; n < r; n++) e[n].apply(this, t) }, i.Observable = e, i.generateChars = function(e) { for (var t = "", n = 0; n < e; n++) { t += Math.floor(36 * Math.random()).toString(36) } return t }, i.bind = function(e, t) { return function() { e.apply(t, arguments) } }, i._convertData = function(e) {
                    for (var t in e) {
                        var n = t.split("-"),
                            r = e;
                        if (1 !== n.length) {
                            for (var i = 0; i < n.length; i++) {
                                var o = n[i];
                                (o = o.substring(0, 1).toLowerCase() + o.substring(1)) in r || (r[o] = {}), i == n.length - 1 && (r[o] = e[t]), r = r[o]
                            }
                            delete e[t]
                        }
                    }
                    return e
                }, i.hasScroll = function(e, t) {
                    var n = o(t),
                        r = t.style.overflowX,
                        i = t.style.overflowY;
                    return (r !== i || "hidden" !== i && "visible" !== i) && ("scroll" === r || "scroll" === i || (n.innerHeight() < t.scrollHeight || n.innerWidth() < t.scrollWidth))
                }, i.escapeMarkup = function(e) { var t = { "\\": "&#92;", "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;", "/": "&#47;" }; return "string" != typeof e ? e : String(e).replace(/[&<>"'\/\\]/g, function(e) { return t[e] }) }, i.appendMany = function(e, t) {
                    if ("1.7" === o.fn.jquery.substr(0, 3)) {
                        var n = o();
                        o.map(t, function(e) { n = n.add(e) }), t = n
                    }
                    e.append(t)
                }, i.__cache = {};
                var n = 0;
                return i.GetUniqueElementId = function(e) { var t = e.getAttribute("data-select2-id"); return null == t && (e.id ? (t = e.id, e.setAttribute("data-select2-id", t)) : (e.setAttribute("data-select2-id", ++n), t = n.toString())), t }, i.StoreData = function(e, t, n) {
                    var r = i.GetUniqueElementId(e);
                    i.__cache[r] || (i.__cache[r] = {}), i.__cache[r][t] = n
                }, i.GetData = function(e, t) { var n = i.GetUniqueElementId(e); return t ? i.__cache[n] && null != i.__cache[n][t] ? i.__cache[n][t] : o(e).data(t) : i.__cache[n] }, i.RemoveData = function(e) {
                    var t = i.GetUniqueElementId(e);
                    null != i.__cache[t] && delete i.__cache[t], e.removeAttribute("data-select2-id")
                }, i
            }), e.define("select2/results", ["jquery", "./utils"], function(h, f) {
                function r(e, t, n) { this.$element = e, this.data = n, this.options = t, r.__super__.constructor.call(this) }
                return f.Extend(r, f.Observable), r.prototype.render = function() { var e = h('<ul class="select2-results__options" role="listbox"></ul>'); return this.options.get("multiple") && e.attr("aria-multiselectable", "true"), this.$results = e }, r.prototype.clear = function() { this.$results.empty() }, r.prototype.displayMessage = function(e) {
                    var t = this.options.get("escapeMarkup");
                    this.clear(), this.hideLoading();
                    var n = h('<li role="alert" aria-live="assertive" class="select2-results__option"></li>'),
                        r = this.options.get("translations").get(e.message);
                    n.append(t(r(e.args))), n[0].className += " select2-results__message", this.$results.append(n)
                }, r.prototype.hideMessages = function() { this.$results.find(".select2-results__message").remove() }, r.prototype.append = function(e) {
                    this.hideLoading();
                    var t = [];
                    if (null != e.results && 0 !== e.results.length) {
                        e.results = this.sort(e.results);
                        for (var n = 0; n < e.results.length; n++) {
                            var r = e.results[n],
                                i = this.option(r);
                            t.push(i)
                        }
                        this.$results.append(t)
                    } else 0 === this.$results.children().length && this.trigger("results:message", { message: "noResults" })
                }, r.prototype.position = function(e, t) { t.find(".select2-results").append(e) }, r.prototype.sort = function(e) { return this.options.get("sorter")(e) }, r.prototype.highlightFirstItem = function() {
                    var e = this.$results.find(".select2-results__option[aria-selected]"),
                        t = e.filter("[aria-selected=true]");
                    0 < t.length ? t.first().trigger("mouseenter") : e.first().trigger("mouseenter"), this.ensureHighlightVisible()
                }, r.prototype.setClasses = function() {
                    var t = this;
                    this.data.current(function(e) {
                        var r = h.map(e, function(e) { return e.id.toString() });
                        t.$results.find(".select2-results__option[aria-selected]").each(function() {
                            var e = h(this),
                                t = f.GetData(this, "data"),
                                n = "" + t.id;
                            null != t.element && t.element.selected || null == t.element && -1 < h.inArray(n, r) ? e.attr("aria-selected", "true") : e.attr("aria-selected", "false")
                        })
                    })
                }, r.prototype.showLoading = function(e) {
                    this.hideLoading();
                    var t = { disabled: !0, loading: !0, text: this.options.get("translations").get("searching")(e) },
                        n = this.option(t);
                    n.className += " loading-results", this.$results.prepend(n)
                }, r.prototype.hideLoading = function() { this.$results.find(".loading-results").remove() }, r.prototype.option = function(e) {
                    var t = document.createElement("li");
                    t.className = "select2-results__option";
                    var n = { role: "option", "aria-selected": "false" },
                        r = window.Element.prototype.matches || window.Element.prototype.msMatchesSelector || window.Element.prototype.webkitMatchesSelector;
                    for (var i in (null != e.element && r.call(e.element, ":disabled") || null == e.element && e.disabled) && (delete n["aria-selected"], n["aria-disabled"] = "true"), null == e.id && delete n["aria-selected"], null != e._resultId && (t.id = e._resultId), e.title && (t.title = e.title), e.children && (n.role = "group", n["aria-label"] = e.text, delete n["aria-selected"]), n) {
                        var o = n[i];
                        t.setAttribute(i, o)
                    }
                    if (e.children) {
                        var s = h(t),
                            a = document.createElement("strong");
                        a.className = "select2-results__group";
                        h(a);
                        this.template(e, a);
                        for (var l = [], c = 0; c < e.children.length; c++) {
                            var u = e.children[c],
                                d = this.option(u);
                            l.push(d)
                        }
                        var p = h("<ul></ul>", { class: "select2-results__options select2-results__options--nested" });
                        p.append(l), s.append(a), s.append(p)
                    } else this.template(e, t);
                    return f.StoreData(t, "data", e), t
                }, r.prototype.bind = function(t, e) {
                    var l = this,
                        n = t.id + "-results";
                    this.$results.attr("id", n), t.on("results:all", function(e) { l.clear(), l.append(e.data), t.isOpen() && (l.setClasses(), l.highlightFirstItem()) }), t.on("results:append", function(e) { l.append(e.data), t.isOpen() && l.setClasses() }), t.on("query", function(e) { l.hideMessages(), l.showLoading(e) }), t.on("select", function() { t.isOpen() && (l.setClasses(), l.options.get("scrollAfterSelect") && l.highlightFirstItem()) }), t.on("unselect", function() { t.isOpen() && (l.setClasses(), l.options.get("scrollAfterSelect") && l.highlightFirstItem()) }), t.on("open", function() { l.$results.attr("aria-expanded", "true"), l.$results.attr("aria-hidden", "false"), l.setClasses(), l.ensureHighlightVisible() }), t.on("close", function() { l.$results.attr("aria-expanded", "false"), l.$results.attr("aria-hidden", "true"), l.$results.removeAttr("aria-activedescendant") }), t.on("results:toggle", function() {
                        var e = l.getHighlightedResults();
                        0 !== e.length && e.trigger("mouseup")
                    }), t.on("results:select", function() { var e = l.getHighlightedResults(); if (0 !== e.length) { var t = f.GetData(e[0], "data"); "true" == e.attr("aria-selected") ? l.trigger("close", {}) : l.trigger("select", { data: t }) } }), t.on("results:previous", function() {
                        var e = l.getHighlightedResults(),
                            t = l.$results.find("[aria-selected]"),
                            n = t.index(e);
                        if (!(n <= 0)) {
                            var r = n - 1;
                            0 === e.length && (r = 0);
                            var i = t.eq(r);
                            i.trigger("mouseenter");
                            var o = l.$results.offset().top,
                                s = i.offset().top,
                                a = l.$results.scrollTop() + (s - o);
                            0 === r ? l.$results.scrollTop(0) : s - o < 0 && l.$results.scrollTop(a)
                        }
                    }), t.on("results:next", function() {
                        var e = l.getHighlightedResults(),
                            t = l.$results.find("[aria-selected]"),
                            n = t.index(e) + 1;
                        if (!(n >= t.length)) {
                            var r = t.eq(n);
                            r.trigger("mouseenter");
                            var i = l.$results.offset().top + l.$results.outerHeight(!1),
                                o = r.offset().top + r.outerHeight(!1),
                                s = l.$results.scrollTop() + o - i;
                            0 === n ? l.$results.scrollTop(0) : i < o && l.$results.scrollTop(s)
                        }
                    }), t.on("results:focus", function(e) { e.element.addClass("select2-results__option--highlighted") }), t.on("results:message", function(e) { l.displayMessage(e) }), h.fn.mousewheel && this.$results.on("mousewheel", function(e) {
                        var t = l.$results.scrollTop(),
                            n = l.$results.get(0).scrollHeight - t + e.deltaY,
                            r = 0 < e.deltaY && t - e.deltaY <= 0,
                            i = e.deltaY < 0 && n <= l.$results.height();
                        r ? (l.$results.scrollTop(0), e.preventDefault(), e.stopPropagation()) : i && (l.$results.scrollTop(l.$results.get(0).scrollHeight - l.$results.height()), e.preventDefault(), e.stopPropagation())
                    }), this.$results.on("mouseup", ".select2-results__option[aria-selected]", function(e) {
                        var t = h(this),
                            n = f.GetData(this, "data");
                        "true" !== t.attr("aria-selected") ? l.trigger("select", { originalEvent: e, data: n }) : l.options.get("multiple") ? l.trigger("unselect", { originalEvent: e, data: n }) : l.trigger("close", {})
                    }), this.$results.on("mouseenter", ".select2-results__option[aria-selected]", function(e) {
                        var t = f.GetData(this, "data");
                        l.getHighlightedResults().removeClass("select2-results__option--highlighted"), l.trigger("results:focus", { data: t, element: h(this) })
                    })
                }, r.prototype.getHighlightedResults = function() { return this.$results.find(".select2-results__option--highlighted") }, r.prototype.destroy = function() { this.$results.remove() }, r.prototype.ensureHighlightVisible = function() {
                    var e = this.getHighlightedResults();
                    if (0 !== e.length) {
                        var t = this.$results.find("[aria-selected]").index(e),
                            n = this.$results.offset().top,
                            r = e.offset().top,
                            i = this.$results.scrollTop() + (r - n),
                            o = r - n;
                        i -= 2 * e.outerHeight(!1), t <= 2 ? this.$results.scrollTop(0) : (o > this.$results.outerHeight() || o < 0) && this.$results.scrollTop(i)
                    }
                }, r.prototype.template = function(e, t) {
                    var n = this.options.get("templateResult"),
                        r = this.options.get("escapeMarkup"),
                        i = n(e, t);
                    null == i ? t.style.display = "none" : "string" == typeof i ? t.innerHTML = r(i) : h(t).append(i)
                }, r
            }), e.define("select2/keys", [], function() { return { BACKSPACE: 8, TAB: 9, ENTER: 13, SHIFT: 16, CTRL: 17, ALT: 18, ESC: 27, SPACE: 32, PAGE_UP: 33, PAGE_DOWN: 34, END: 35, HOME: 36, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40, DELETE: 46 } }), e.define("select2/selection/base", ["jquery", "../utils", "../keys"], function(n, r, i) {
                function o(e, t) { this.$element = e, this.options = t, o.__super__.constructor.call(this) }
                return r.Extend(o, r.Observable), o.prototype.render = function() { var e = n('<span class="select2-selection" role="combobox"  aria-haspopup="true" aria-expanded="false"></span>'); return this._tabindex = 0, null != r.GetData(this.$element[0], "old-tabindex") ? this._tabindex = r.GetData(this.$element[0], "old-tabindex") : null != this.$element.attr("tabindex") && (this._tabindex = this.$element.attr("tabindex")), e.attr("title", this.$element.attr("title")), e.attr("tabindex", this._tabindex), e.attr("aria-disabled", "false"), this.$selection = e }, o.prototype.bind = function(e, t) {
                    var n = this,
                        r = e.id + "-results";
                    this.container = e, this.$selection.on("focus", function(e) { n.trigger("focus", e) }), this.$selection.on("blur", function(e) { n._handleBlur(e) }), this.$selection.on("keydown", function(e) { n.trigger("keypress", e), e.which === i.SPACE && e.preventDefault() }), e.on("results:focus", function(e) { n.$selection.attr("aria-activedescendant", e.data._resultId) }), e.on("selection:update", function(e) { n.update(e.data) }), e.on("open", function() { n.$selection.attr("aria-expanded", "true"), n.$selection.attr("aria-owns", r), n._attachCloseHandler(e) }), e.on("close", function() { n.$selection.attr("aria-expanded", "false"), n.$selection.removeAttr("aria-activedescendant"), n.$selection.removeAttr("aria-owns"), n.$selection.trigger("focus"), n._detachCloseHandler(e) }), e.on("enable", function() { n.$selection.attr("tabindex", n._tabindex), n.$selection.attr("aria-disabled", "false") }), e.on("disable", function() { n.$selection.attr("tabindex", "-1"), n.$selection.attr("aria-disabled", "true") })
                }, o.prototype._handleBlur = function(e) {
                    var t = this;
                    window.setTimeout(function() { document.activeElement == t.$selection[0] || n.contains(t.$selection[0], document.activeElement) || t.trigger("blur", e) }, 1)
                }, o.prototype._attachCloseHandler = function(e) {
                    n(document.body).on("mousedown.select2." + e.id, function(e) {
                        var t = n(e.target).closest(".select2");
                        n(".select2.select2-container--open").each(function() { this != t[0] && r.GetData(this, "element").select2("close") })
                    })
                }, o.prototype._detachCloseHandler = function(e) { n(document.body).off("mousedown.select2." + e.id) }, o.prototype.position = function(e, t) { t.find(".selection").append(e) }, o.prototype.destroy = function() { this._detachCloseHandler(this.container) }, o.prototype.update = function(e) { throw new Error("The `update` method must be defined in child classes.") }, o.prototype.isEnabled = function() { return !this.isDisabled() }, o.prototype.isDisabled = function() { return this.options.get("disabled") }, o
            }), e.define("select2/selection/single", ["jquery", "./base", "../utils", "../keys"], function(e, t, n, r) {
                function i() { i.__super__.constructor.apply(this, arguments) }
                return n.Extend(i, t), i.prototype.render = function() { var e = i.__super__.render.call(this); return e.addClass("select2-selection--single"), e.html('<span class="select2-selection__rendered"></span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span>'), e }, i.prototype.bind = function(t, e) {
                    var n = this;
                    i.__super__.bind.apply(this, arguments);
                    var r = t.id + "-container";
                    this.$selection.find(".select2-selection__rendered").attr("id", r).attr("role", "textbox").attr("aria-readonly", "true"), this.$selection.attr("aria-labelledby", r), this.$selection.on("mousedown", function(e) { 1 === e.which && n.trigger("toggle", { originalEvent: e }) }), this.$selection.on("focus", function(e) {}), this.$selection.on("blur", function(e) {}), t.on("focus", function(e) { t.isOpen() || n.$selection.trigger("focus") })
                }, i.prototype.clear = function() {
                    var e = this.$selection.find(".select2-selection__rendered");
                    e.empty(), e.removeAttr("title")
                }, i.prototype.display = function(e, t) { var n = this.options.get("templateSelection"); return this.options.get("escapeMarkup")(n(e, t)) }, i.prototype.selectionContainer = function() { return e("<span></span>") }, i.prototype.update = function(e) {
                    if (0 !== e.length) {
                        var t = e[0],
                            n = this.$selection.find(".select2-selection__rendered"),
                            r = this.display(t, n);
                        n.empty().append(r);
                        var i = t.title || t.text;
                        i ? n.attr("title", i) : n.removeAttr("title")
                    } else this.clear()
                }, i
            }), e.define("select2/selection/multiple", ["jquery", "./base", "../utils"], function(i, e, l) {
                function n(e, t) { n.__super__.constructor.apply(this, arguments) }
                return l.Extend(n, e), n.prototype.render = function() { var e = n.__super__.render.call(this); return e.addClass("select2-selection--multiple"), e.html('<ul class="select2-selection__rendered"></ul>'), e }, n.prototype.bind = function(e, t) {
                    var r = this;
                    n.__super__.bind.apply(this, arguments), this.$selection.on("click", function(e) { r.trigger("toggle", { originalEvent: e }) }), this.$selection.on("click", ".select2-selection__choice__remove", function(e) {
                        if (!r.isDisabled()) {
                            var t = i(this).parent(),
                                n = l.GetData(t[0], "data");
                            r.trigger("unselect", { originalEvent: e, data: n })
                        }
                    })
                }, n.prototype.clear = function() {
                    var e = this.$selection.find(".select2-selection__rendered");
                    e.empty(), e.removeAttr("title")
                }, n.prototype.display = function(e, t) { var n = this.options.get("templateSelection"); return this.options.get("escapeMarkup")(n(e, t)) }, n.prototype.selectionContainer = function() { return i('<li class="select2-selection__choice"><span class="select2-selection__choice__remove" role="presentation">&times;</span></li>') }, n.prototype.update = function(e) {
                    if (this.clear(), 0 !== e.length) {
                        for (var t = [], n = 0; n < e.length; n++) {
                            var r = e[n],
                                i = this.selectionContainer(),
                                o = this.display(r, i);
                            i.append(o);
                            var s = r.title || r.text;
                            s && i.attr("title", s), l.StoreData(i[0], "data", r), t.push(i)
                        }
                        var a = this.$selection.find(".select2-selection__rendered");
                        l.appendMany(a, t)
                    }
                }, n
            }), e.define("select2/selection/placeholder", ["../utils"], function(e) {
                function t(e, t, n) { this.placeholder = this.normalizePlaceholder(n.get("placeholder")), e.call(this, t, n) }
                return t.prototype.normalizePlaceholder = function(e, t) { return "string" == typeof t && (t = { id: "", text: t }), t }, t.prototype.createPlaceholder = function(e, t) { var n = this.selectionContainer(); return n.html(this.display(t)), n.addClass("select2-selection__placeholder").removeClass("select2-selection__choice"), n }, t.prototype.update = function(e, t) {
                    var n = 1 == t.length && t[0].id != this.placeholder.id;
                    if (1 < t.length || n) return e.call(this, t);
                    this.clear();
                    var r = this.createPlaceholder(this.placeholder);
                    this.$selection.find(".select2-selection__rendered").append(r)
                }, t
            }), e.define("select2/selection/allowClear", ["jquery", "../keys", "../utils"], function(i, r, a) {
                function e() {}
                return e.prototype.bind = function(e, t, n) {
                    var r = this;
                    e.call(this, t, n), null == this.placeholder && this.options.get("debug") && window.console && console.error && console.error("Select2: The `allowClear` option should be used in combination with the `placeholder` option."), this.$selection.on("mousedown", ".select2-selection__clear", function(e) { r._handleClear(e) }), t.on("keypress", function(e) { r._handleKeyboardClear(e, t) })
                }, e.prototype._handleClear = function(e, t) {
                    if (!this.isDisabled()) {
                        var n = this.$selection.find(".select2-selection__clear");
                        if (0 !== n.length) {
                            t.stopPropagation();
                            var r = a.GetData(n[0], "data"),
                                i = this.$element.val();
                            this.$element.val(this.placeholder.id);
                            var o = { data: r };
                            if (this.trigger("clear", o), o.prevented) this.$element.val(i);
                            else {
                                for (var s = 0; s < r.length; s++)
                                    if (o = { data: r[s] }, this.trigger("unselect", o), o.prevented) return void this.$element.val(i);
                                this.$element.trigger("input").trigger("change"), this.trigger("toggle", {})
                            }
                        }
                    }
                }, e.prototype._handleKeyboardClear = function(e, t, n) { n.isOpen() || t.which != r.DELETE && t.which != r.BACKSPACE || this._handleClear(t) }, e.prototype.update = function(e, t) {
                    if (e.call(this, t), !(0 < this.$selection.find(".select2-selection__placeholder").length || 0 === t.length)) {
                        var n = this.options.get("translations").get("removeAllItems"),
                            r = i('<span class="select2-selection__clear" title="' + n() + '">&times;</span>');
                        a.StoreData(r[0], "data", t), this.$selection.find(".select2-selection__rendered").prepend(r)
                    }
                }, e
            }), e.define("select2/selection/search", ["jquery", "../utils", "../keys"], function(r, a, l) {
                function e(e, t, n) { e.call(this, t, n) }
                return e.prototype.render = function(e) {
                    var t = r('<li class="select2-search select2-search--inline"><input class="select2-search__field" type="search" tabindex="-1" autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false" role="searchbox" aria-autocomplete="list" /></li>');
                    this.$searchContainer = t, this.$search = t.find("input");
                    var n = e.call(this);
                    return this._transferTabIndex(), n
                }, e.prototype.bind = function(e, t, n) {
                    var r = this,
                        i = t.id + "-results";
                    e.call(this, t, n), t.on("open", function() { r.$search.attr("aria-controls", i), r.$search.trigger("focus") }), t.on("close", function() { r.$search.val(""), r.$search.removeAttr("aria-controls"), r.$search.removeAttr("aria-activedescendant"), r.$search.trigger("focus") }), t.on("enable", function() { r.$search.prop("disabled", !1), r._transferTabIndex() }), t.on("disable", function() { r.$search.prop("disabled", !0) }), t.on("focus", function(e) { r.$search.trigger("focus") }), t.on("results:focus", function(e) { e.data._resultId ? r.$search.attr("aria-activedescendant", e.data._resultId) : r.$search.removeAttr("aria-activedescendant") }), this.$selection.on("focusin", ".select2-search--inline", function(e) { r.trigger("focus", e) }), this.$selection.on("focusout", ".select2-search--inline", function(e) { r._handleBlur(e) }), this.$selection.on("keydown", ".select2-search--inline", function(e) {
                        if (e.stopPropagation(), r.trigger("keypress", e), r._keyUpPrevented = e.isDefaultPrevented(), e.which === l.BACKSPACE && "" === r.$search.val()) {
                            var t = r.$searchContainer.prev(".select2-selection__choice");
                            if (0 < t.length) {
                                var n = a.GetData(t[0], "data");
                                r.searchRemoveChoice(n), e.preventDefault()
                            }
                        }
                    }), this.$selection.on("click", ".select2-search--inline", function(e) { r.$search.val() && e.stopPropagation() });
                    var o = document.documentMode,
                        s = o && o <= 11;
                    this.$selection.on("input.searchcheck", ".select2-search--inline", function(e) { s ? r.$selection.off("input.search input.searchcheck") : r.$selection.off("keyup.search") }), this.$selection.on("keyup.search input.search", ".select2-search--inline", function(e) {
                        if (s && "input" === e.type) r.$selection.off("input.search input.searchcheck");
                        else {
                            var t = e.which;
                            t != l.SHIFT && t != l.CTRL && t != l.ALT && t != l.TAB && r.handleSearch(e)
                        }
                    })
                }, e.prototype._transferTabIndex = function(e) { this.$search.attr("tabindex", this.$selection.attr("tabindex")), this.$selection.attr("tabindex", "-1") }, e.prototype.createPlaceholder = function(e, t) { this.$search.attr("placeholder", t.text) }, e.prototype.update = function(e, t) {
                    var n = this.$search[0] == document.activeElement;
                    this.$search.attr("placeholder", ""), e.call(this, t), this.$selection.find(".select2-selection__rendered").append(this.$searchContainer), this.resizeSearch(), n && this.$search.trigger("focus")
                }, e.prototype.handleSearch = function() {
                    if (this.resizeSearch(), !this._keyUpPrevented) {
                        var e = this.$search.val();
                        this.trigger("query", { term: e })
                    }
                    this._keyUpPrevented = !1
                }, e.prototype.searchRemoveChoice = function(e, t) { this.trigger("unselect", { data: t }), this.$search.val(t.text), this.handleSearch() }, e.prototype.resizeSearch = function() {
                    this.$search.css("width", "25px");
                    var e = "";
                    "" !== this.$search.attr("placeholder") ? e = this.$selection.find(".select2-selection__rendered").width() : e = .75 * (this.$search.val().length + 1) + "em";
                    this.$search.css("width", e)
                }, e
            }), e.define("select2/selection/eventRelay", ["jquery"], function(s) {
                function e() {}
                return e.prototype.bind = function(e, t, n) {
                    var r = this,
                        i = ["open", "opening", "close", "closing", "select", "selecting", "unselect", "unselecting", "clear", "clearing"],
                        o = ["opening", "closing", "selecting", "unselecting", "clearing"];
                    e.call(this, t, n), t.on("*", function(e, t) {
                        if (-1 !== s.inArray(e, i)) {
                            t = t || {};
                            var n = s.Event("select2:" + e, { params: t });
                            r.$element.trigger(n), -1 !== s.inArray(e, o) && (t.prevented = n.isDefaultPrevented())
                        }
                    })
                }, e
            }), e.define("select2/translation", ["jquery", "require"], function(t, n) {
                function r(e) { this.dict = e || {} }
                return r.prototype.all = function() { return this.dict }, r.prototype.get = function(e) { return this.dict[e] }, r.prototype.extend = function(e) { this.dict = t.extend({}, e.all(), this.dict) }, r._cache = {}, r.loadPath = function(e) {
                    if (!(e in r._cache)) {
                        var t = n(e);
                        r._cache[e] = t
                    }
                    return new r(r._cache[e])
                }, r
            }), e.define("select2/diacritics", [], function() { return { "â’¶": "A", "ï¼¡": "A", "Ã€": "A", "Ã": "A", "Ã‚": "A", "áº¦": "A", "áº¤": "A", "áºª": "A", "áº¨": "A", "Ãƒ": "A", "Ä€": "A", "Ä‚": "A", "áº°": "A", "áº®": "A", "áº´": "A", "áº²": "A", "È¦": "A", "Ç ": "A", "Ã„": "A", "Çž": "A", "áº¢": "A", "Ã…": "A", "Çº": "A", "Ç": "A", "È€": "A", "È‚": "A", "áº ": "A", "áº¬": "A", "áº¶": "A", "á¸€": "A", "Ä„": "A", "Èº": "A", "â±¯": "A", "êœ²": "AA", "Ã†": "AE", "Ç¼": "AE", "Ç¢": "AE", "êœ´": "AO", "êœ¶": "AU", "êœ¸": "AV", "êœº": "AV", "êœ¼": "AY", "â’·": "B", "ï¼¢": "B", "á¸‚": "B", "á¸„": "B", "á¸†": "B", "Éƒ": "B", "Æ‚": "B", "Æ": "B", "â’¸": "C", "ï¼£": "C", "Ä†": "C", "Äˆ": "C", "ÄŠ": "C", "ÄŒ": "C", "Ã‡": "C", "á¸ˆ": "C", "Æ‡": "C", "È»": "C", "êœ¾": "C", "â’¹": "D", "ï¼¤": "D", "á¸Š": "D", "ÄŽ": "D", "á¸Œ": "D", "á¸": "D", "á¸’": "D", "á¸Ž": "D", "Ä": "D", "Æ‹": "D", "ÆŠ": "D", "Æ‰": "D", "ê¹": "D", "Ç±": "DZ", "Ç„": "DZ", "Ç²": "Dz", "Ç…": "Dz", "â’º": "E", "ï¼¥": "E", "Ãˆ": "E", "Ã‰": "E", "ÃŠ": "E", "á»€": "E", "áº¾": "E", "á»„": "E", "á»‚": "E", "áº¼": "E", "Ä’": "E", "á¸”": "E", "á¸–": "E", "Ä”": "E", "Ä–": "E", "Ã‹": "E", "áºº": "E", "Äš": "E", "È„": "E", "È†": "E", "áº¸": "E", "á»†": "E", "È¨": "E", "á¸œ": "E", "Ä˜": "E", "á¸˜": "E", "á¸š": "E", "Æ": "E", "ÆŽ": "E", "â’»": "F", "ï¼¦": "F", "á¸ž": "F", "Æ‘": "F", "ê»": "F", "â’¼": "G", "ï¼§": "G", "Ç´": "G", "Äœ": "G", "á¸ ": "G", "Äž": "G", "Ä ": "G", "Ç¦": "G", "Ä¢": "G", "Ç¤": "G", "Æ“": "G", "êž ": "G", "ê½": "G", "ê¾": "G", "â’½": "H", "ï¼¨": "H", "Ä¤": "H", "á¸¢": "H", "á¸¦": "H", "Èž": "H", "á¸¤": "H", "á¸¨": "H", "á¸ª": "H", "Ä¦": "H", "â±§": "H", "â±µ": "H", "êž": "H", "â’¾": "I", "ï¼©": "I", "ÃŒ": "I", "Ã": "I", "ÃŽ": "I", "Ä¨": "I", "Äª": "I", "Ä¬": "I", "Ä°": "I", "Ã": "I", "á¸®": "I", "á»ˆ": "I", "Ç": "I", "Èˆ": "I", "ÈŠ": "I", "á»Š": "I", "Ä®": "I", "á¸¬": "I", "Æ—": "I", "â’¿": "J", "ï¼ª": "J", "Ä´": "J", "Éˆ": "J", "â“€": "K", "ï¼«": "K", "á¸°": "K", "Ç¨": "K", "á¸²": "K", "Ä¶": "K", "á¸´": "K", "Æ˜": "K", "â±©": "K", "ê€": "K", "ê‚": "K", "ê„": "K", "êž¢": "K", "â“": "L", "ï¼¬": "L", "Ä¿": "L", "Ä¹": "L", "Ä½": "L", "á¸¶": "L", "á¸¸": "L", "Ä»": "L", "á¸¼": "L", "á¸º": "L", "Å": "L", "È½": "L", "â±¢": "L", "â± ": "L", "êˆ": "L", "ê†": "L", "êž€": "L", "Ç‡": "LJ", "Çˆ": "Lj", "â“‚": "M", "ï¼­": "M", "á¸¾": "M", "á¹€": "M", "á¹‚": "M", "â±®": "M", "Æœ": "M", "â“ƒ": "N", "ï¼®": "N", "Ç¸": "N", "Åƒ": "N", "Ã‘": "N", "á¹„": "N", "Å‡": "N", "á¹†": "N", "Å…": "N", "á¹Š": "N", "á¹ˆ": "N", "È ": "N", "Æ": "N", "êž": "N", "êž¤": "N", "ÇŠ": "NJ", "Ç‹": "Nj", "â“„": "O", "ï¼¯": "O", "Ã’": "O", "Ã“": "O", "Ã”": "O", "á»’": "O", "á»": "O", "á»–": "O", "á»”": "O", "Ã•": "O", "á¹Œ": "O", "È¬": "O", "á¹Ž": "O", "ÅŒ": "O", "á¹": "O", "á¹’": "O", "ÅŽ": "O", "È®": "O", "È°": "O", "Ã–": "O", "Èª": "O", "á»Ž": "O", "Å": "O", "Ç‘": "O", "ÈŒ": "O", "ÈŽ": "O", "Æ ": "O", "á»œ": "O", "á»š": "O", "á» ": "O", "á»ž": "O", "á»¢": "O", "á»Œ": "O", "á»˜": "O", "Çª": "O", "Ç¬": "O", "Ã˜": "O", "Ç¾": "O", "Æ†": "O", "ÆŸ": "O", "êŠ": "O", "êŒ": "O", "Å’": "OE", "Æ¢": "OI", "êŽ": "OO", "È¢": "OU", "â“…": "P", "ï¼°": "P", "á¹”": "P", "á¹–": "P", "Æ¤": "P", "â±£": "P", "ê": "P", "ê’": "P", "ê”": "P", "â“†": "Q", "ï¼±": "Q", "ê–": "Q", "ê˜": "Q", "ÉŠ": "Q", "â“‡": "R", "ï¼²": "R", "Å”": "R", "á¹˜": "R", "Å˜": "R", "È": "R", "È’": "R", "á¹š": "R", "á¹œ": "R", "Å–": "R", "á¹ž": "R", "ÉŒ": "R", "â±¤": "R", "êš": "R", "êž¦": "R", "êž‚": "R", "â“ˆ": "S", "ï¼³": "S", "áºž": "S", "Åš": "S", "á¹¤": "S", "Åœ": "S", "á¹ ": "S", "Å ": "S", "á¹¦": "S", "á¹¢": "S", "á¹¨": "S", "È˜": "S", "Åž": "S", "â±¾": "S", "êž¨": "S", "êž„": "S", "â“‰": "T", "ï¼´": "T", "á¹ª": "T", "Å¤": "T", "á¹¬": "T", "Èš": "T", "Å¢": "T", "á¹°": "T", "á¹®": "T", "Å¦": "T", "Æ¬": "T", "Æ®": "T", "È¾": "T", "êž†": "T", "êœ¨": "TZ", "â“Š": "U", "ï¼µ": "U", "Ã™": "U", "Ãš": "U", "Ã›": "U", "Å¨": "U", "á¹¸": "U", "Åª": "U", "á¹º": "U", "Å¬": "U", "Ãœ": "U", "Ç›": "U", "Ç—": "U", "Ç•": "U", "Ç™": "U", "á»¦": "U", "Å®": "U", "Å°": "U", "Ç“": "U", "È”": "U", "È–": "U", "Æ¯": "U", "á»ª": "U", "á»¨": "U", "á»®": "U", "á»¬": "U", "á»°": "U", "á»¤": "U", "á¹²": "U", "Å²": "U", "á¹¶": "U", "á¹´": "U", "É„": "U", "â“‹": "V", "ï¼¶": "V", "á¹¼": "V", "á¹¾": "V", "Æ²": "V", "êž": "V", "É…": "V", "ê ": "VY", "â“Œ": "W", "ï¼·": "W", "áº€": "W", "áº‚": "W", "Å´": "W", "áº†": "W", "áº„": "W", "áºˆ": "W", "â±²": "W", "â“": "X", "ï¼¸": "X", "áºŠ": "X", "áºŒ": "X", "â“Ž": "Y", "ï¼¹": "Y", "á»²": "Y", "Ã": "Y", "Å¶": "Y", "á»¸": "Y", "È²": "Y", "áºŽ": "Y", "Å¸": "Y", "á»¶": "Y", "á»´": "Y", "Æ³": "Y", "ÉŽ": "Y", "á»¾": "Y", "â“": "Z", "ï¼º": "Z", "Å¹": "Z", "áº": "Z", "Å»": "Z", "Å½": "Z", "áº’": "Z", "áº”": "Z", "Æµ": "Z", "È¤": "Z", "â±¿": "Z", "â±«": "Z", "ê¢": "Z", "â“": "a", "ï½": "a", "áºš": "a", "Ã ": "a", "Ã¡": "a", "Ã¢": "a", "áº§": "a", "áº¥": "a", "áº«": "a", "áº©": "a", "Ã£": "a", "Ä": "a", "Äƒ": "a", "áº±": "a", "áº¯": "a", "áºµ": "a", "áº³": "a", "È§": "a", "Ç¡": "a", "Ã¤": "a", "ÇŸ": "a", "áº£": "a", "Ã¥": "a", "Ç»": "a", "ÇŽ": "a", "È": "a", "Èƒ": "a", "áº¡": "a", "áº­": "a", "áº·": "a", "á¸": "a", "Ä…": "a", "â±¥": "a", "É": "a", "êœ³": "aa", "Ã¦": "ae", "Ç½": "ae", "Ç£": "ae", "êœµ": "ao", "êœ·": "au", "êœ¹": "av", "êœ»": "av", "êœ½": "ay", "â“‘": "b", "ï½‚": "b", "á¸ƒ": "b", "á¸…": "b", "á¸‡": "b", "Æ€": "b", "Æƒ": "b", "É“": "b", "â“’": "c", "ï½ƒ": "c", "Ä‡": "c", "Ä‰": "c", "Ä‹": "c", "Ä": "c", "Ã§": "c", "á¸‰": "c", "Æˆ": "c", "È¼": "c", "êœ¿": "c", "â†„": "c", "â““": "d", "ï½„": "d", "á¸‹": "d", "Ä": "d", "á¸": "d", "á¸‘": "d", "á¸“": "d", "á¸": "d", "Ä‘": "d", "ÆŒ": "d", "É–": "d", "É—": "d", "êº": "d", "Ç³": "dz", "Ç†": "dz", "â“”": "e", "ï½…": "e", "Ã¨": "e", "Ã©": "e", "Ãª": "e", "á»": "e", "áº¿": "e", "á»…": "e", "á»ƒ": "e", "áº½": "e", "Ä“": "e", "á¸•": "e", "á¸—": "e", "Ä•": "e", "Ä—": "e", "Ã«": "e", "áº»": "e", "Ä›": "e", "È…": "e", "È‡": "e", "áº¹": "e", "á»‡": "e", "È©": "e", "á¸": "e", "Ä™": "e", "á¸™": "e", "á¸›": "e", "É‡": "e", "É›": "e", "Ç": "e", "â“•": "f", "ï½†": "f", "á¸Ÿ": "f", "Æ’": "f", "ê¼": "f", "â“–": "g", "ï½‡": "g", "Çµ": "g", "Ä": "g", "á¸¡": "g", "ÄŸ": "g", "Ä¡": "g", "Ç§": "g", "Ä£": "g", "Ç¥": "g", "É ": "g", "êž¡": "g", "áµ¹": "g", "ê¿": "g", "â“—": "h", "ï½ˆ": "h", "Ä¥": "h", "á¸£": "h", "á¸§": "h", "ÈŸ": "h", "á¸¥": "h", "á¸©": "h", "á¸«": "h", "áº–": "h", "Ä§": "h", "â±¨": "h", "â±¶": "h", "É¥": "h", "Æ•": "hv", "â“˜": "i", "ï½‰": "i", "Ã¬": "i", "Ã­": "i", "Ã®": "i", "Ä©": "i", "Ä«": "i", "Ä­": "i", "Ã¯": "i", "á¸¯": "i", "á»‰": "i", "Ç": "i", "È‰": "i", "È‹": "i", "á»‹": "i", "Ä¯": "i", "á¸­": "i", "É¨": "i", "Ä±": "i", "â“™": "j", "ï½Š": "j", "Äµ": "j", "Ç°": "j", "É‰": "j", "â“š": "k", "ï½‹": "k", "á¸±": "k", "Ç©": "k", "á¸³": "k", "Ä·": "k", "á¸µ": "k", "Æ™": "k", "â±ª": "k", "ê": "k", "êƒ": "k", "ê…": "k", "êž£": "k", "â“›": "l", "ï½Œ": "l", "Å€": "l", "Äº": "l", "Ä¾": "l", "á¸·": "l", "á¸¹": "l", "Ä¼": "l", "á¸½": "l", "á¸»": "l", "Å¿": "l", "Å‚": "l", "Æš": "l", "É«": "l", "â±¡": "l", "ê‰": "l", "êž": "l", "ê‡": "l", "Ç‰": "lj", "â“œ": "m", "ï½": "m", "á¸¿": "m", "á¹": "m", "á¹ƒ": "m", "É±": "m", "É¯": "m", "â“": "n", "ï½Ž": "n", "Ç¹": "n", "Å„": "n", "Ã±": "n", "á¹…": "n", "Åˆ": "n", "á¹‡": "n", "Å†": "n", "á¹‹": "n", "á¹‰": "n", "Æž": "n", "É²": "n", "Å‰": "n", "êž‘": "n", "êž¥": "n", "ÇŒ": "nj", "â“ž": "o", "ï½": "o", "Ã²": "o", "Ã³": "o", "Ã´": "o", "á»“": "o", "á»‘": "o", "á»—": "o", "á»•": "o", "Ãµ": "o", "á¹": "o", "È­": "o", "á¹": "o", "Å": "o", "á¹‘": "o", "á¹“": "o", "Å": "o", "È¯": "o", "È±": "o", "Ã¶": "o", "È«": "o", "á»": "o", "Å‘": "o", "Ç’": "o", "È": "o", "È": "o", "Æ¡": "o", "á»": "o", "á»›": "o", "á»¡": "o", "á»Ÿ": "o", "á»£": "o", "á»": "o", "á»™": "o", "Ç«": "o", "Ç­": "o", "Ã¸": "o", "Ç¿": "o", "É”": "o", "ê‹": "o", "ê": "o", "Éµ": "o", "Å“": "oe", "Æ£": "oi", "È£": "ou", "ê": "oo", "â“Ÿ": "p", "ï½": "p", "á¹•": "p", "á¹—": "p", "Æ¥": "p", "áµ½": "p", "ê‘": "p", "ê“": "p", "ê•": "p", "â“ ": "q", "ï½‘": "q", "É‹": "q", "ê—": "q", "ê™": "q", "â“¡": "r", "ï½’": "r", "Å•": "r", "á¹™": "r", "Å™": "r", "È‘": "r", "È“": "r", "á¹›": "r", "á¹": "r", "Å—": "r", "á¹Ÿ": "r", "É": "r", "É½": "r", "ê›": "r", "êž§": "r", "êžƒ": "r", "â“¢": "s", "ï½“": "s", "ÃŸ": "s", "Å›": "s", "á¹¥": "s", "Å": "s", "á¹¡": "s", "Å¡": "s", "á¹§": "s", "á¹£": "s", "á¹©": "s", "È™": "s", "ÅŸ": "s", "È¿": "s", "êž©": "s", "êž…": "s", "áº›": "s", "â“£": "t", "ï½”": "t", "á¹«": "t", "áº—": "t", "Å¥": "t", "á¹­": "t", "È›": "t", "Å£": "t", "á¹±": "t", "á¹¯": "t", "Å§": "t", "Æ­": "t", "Êˆ": "t", "â±¦": "t", "êž‡": "t", "êœ©": "tz", "â“¤": "u", "ï½•": "u", "Ã¹": "u", "Ãº": "u", "Ã»": "u", "Å©": "u", "á¹¹": "u", "Å«": "u", "á¹»": "u", "Å­": "u", "Ã¼": "u", "Çœ": "u", "Ç˜": "u", "Ç–": "u", "Çš": "u", "á»§": "u", "Å¯": "u", "Å±": "u", "Ç”": "u", "È•": "u", "È—": "u", "Æ°": "u", "á»«": "u", "á»©": "u", "á»¯": "u", "á»­": "u", "á»±": "u", "á»¥": "u", "á¹³": "u", "Å³": "u", "á¹·": "u", "á¹µ": "u", "Ê‰": "u", "â“¥": "v", "ï½–": "v", "á¹½": "v", "á¹¿": "v", "Ê‹": "v", "êŸ": "v", "ÊŒ": "v", "ê¡": "vy", "â“¦": "w", "ï½—": "w", "áº": "w", "áºƒ": "w", "Åµ": "w", "áº‡": "w", "áº…": "w", "áº˜": "w", "áº‰": "w", "â±³": "w", "â“§": "x", "ï½˜": "x", "áº‹": "x", "áº": "x", "â“¨": "y", "ï½™": "y", "á»³": "y", "Ã½": "y", "Å·": "y", "á»¹": "y", "È³": "y", "áº": "y", "Ã¿": "y", "á»·": "y", "áº™": "y", "á»µ": "y", "Æ´": "y", "É": "y", "á»¿": "y", "â“©": "z", "ï½š": "z", "Åº": "z", "áº‘": "z", "Å¼": "z", "Å¾": "z", "áº“": "z", "áº•": "z", "Æ¶": "z", "È¥": "z", "É€": "z", "â±¬": "z", "ê£": "z", "Î†": "Î‘", "Îˆ": "Î•", "Î‰": "Î—", "ÎŠ": "Î™", "Îª": "Î™", "ÎŒ": "ÎŸ", "ÎŽ": "Î¥", "Î«": "Î¥", "Î": "Î©", "Î¬": "Î±", "Î­": "Îµ", "Î®": "Î·", "Î¯": "Î¹", "ÏŠ": "Î¹", "Î": "Î¹", "ÏŒ": "Î¿", "Ï": "Ï…", "Ï‹": "Ï…", "Î°": "Ï…", "ÏŽ": "Ï‰", "Ï‚": "Ïƒ", "â€™": "'" } }), e.define("select2/data/base", ["../utils"], function(r) {
                function n(e, t) { n.__super__.constructor.call(this) }
                return r.Extend(n, r.Observable), n.prototype.current = function(e) { throw new Error("The `current` method must be defined in child classes.") }, n.prototype.query = function(e, t) { throw new Error("The `query` method must be defined in child classes.") }, n.prototype.bind = function(e, t) {}, n.prototype.destroy = function() {}, n.prototype.generateResultId = function(e, t) { var n = e.id + "-result-"; return n += r.generateChars(4), null != t.id ? n += "-" + t.id.toString() : n += "-" + r.generateChars(4), n }, n
            }), e.define("select2/data/select", ["./base", "../utils", "jquery"], function(e, a, l) {
                function n(e, t) { this.$element = e, this.options = t, n.__super__.constructor.call(this) }
                return a.Extend(n, e), n.prototype.current = function(e) {
                    var n = [],
                        r = this;
                    this.$element.find(":selected").each(function() {
                        var e = l(this),
                            t = r.item(e);
                        n.push(t)
                    }), e(n)
                }, n.prototype.select = function(i) {
                    var o = this;
                    if (i.selected = !0, l(i.element).is("option")) return i.element.selected = !0, void this.$element.trigger("input").trigger("change");
                    if (this.$element.prop("multiple")) this.current(function(e) {
                        var t = [];
                        (i = [i]).push.apply(i, e);
                        for (var n = 0; n < i.length; n++) { var r = i[n].id; - 1 === l.inArray(r, t) && t.push(r) }
                        o.$element.val(t), o.$element.trigger("input").trigger("change")
                    });
                    else {
                        var e = i.id;
                        this.$element.val(e), this.$element.trigger("input").trigger("change")
                    }
                }, n.prototype.unselect = function(i) {
                    var o = this;
                    if (this.$element.prop("multiple")) {
                        if (i.selected = !1, l(i.element).is("option")) return i.element.selected = !1, void this.$element.trigger("input").trigger("change");
                        this.current(function(e) {
                            for (var t = [], n = 0; n < e.length; n++) {
                                var r = e[n].id;
                                r !== i.id && -1 === l.inArray(r, t) && t.push(r)
                            }
                            o.$element.val(t), o.$element.trigger("input").trigger("change")
                        })
                    }
                }, n.prototype.bind = function(e, t) {
                    var n = this;
                    (this.container = e).on("select", function(e) { n.select(e.data) }), e.on("unselect", function(e) { n.unselect(e.data) })
                }, n.prototype.destroy = function() { this.$element.find("*").each(function() { a.RemoveData(this) }) }, n.prototype.query = function(r, e) {
                    var i = [],
                        o = this;
                    this.$element.children().each(function() {
                        var e = l(this);
                        if (e.is("option") || e.is("optgroup")) {
                            var t = o.item(e),
                                n = o.matches(r, t);
                            null !== n && i.push(n)
                        }
                    }), e({ results: i })
                }, n.prototype.addOptions = function(e) { a.appendMany(this.$element, e) }, n.prototype.option = function(e) {
                    var t;
                    e.children ? (t = document.createElement("optgroup")).label = e.text : void 0 !== (t = document.createElement("option")).textContent ? t.textContent = e.text : t.innerText = e.text, void 0 !== e.id && (t.value = e.id), e.disabled && (t.disabled = !0), e.selected && (t.selected = !0), e.title && (t.title = e.title);
                    var n = l(t),
                        r = this._normalizeItem(e);
                    return r.element = t, a.StoreData(t, "data", r), n
                }, n.prototype.item = function(e) {
                    var t = {};
                    if (null != (t = a.GetData(e[0], "data"))) return t;
                    if (e.is("option")) t = { id: e.val(), text: e.text(), disabled: e.prop("disabled"), selected: e.prop("selected"), title: e.prop("title") };
                    else if (e.is("optgroup")) {
                        t = { text: e.prop("label"), children: [], title: e.prop("title") };
                        for (var n = e.children("option"), r = [], i = 0; i < n.length; i++) {
                            var o = l(n[i]),
                                s = this.item(o);
                            r.push(s)
                        }
                        t.children = r
                    }
                    return (t = this._normalizeItem(t)).element = e[0], a.StoreData(e[0], "data", t), t
                }, n.prototype._normalizeItem = function(e) { e !== Object(e) && (e = { id: e, text: e }); return null != (e = l.extend({}, { text: "" }, e)).id && (e.id = e.id.toString()), null != e.text && (e.text = e.text.toString()), null == e._resultId && e.id && null != this.container && (e._resultId = this.generateResultId(this.container, e)), l.extend({}, { selected: !1, disabled: !1 }, e) }, n.prototype.matches = function(e, t) { return this.options.get("matcher")(e, t) }, n
            }), e.define("select2/data/array", ["./select", "../utils", "jquery"], function(e, f, g) {
                function r(e, t) { this._dataToConvert = t.get("data") || [], r.__super__.constructor.call(this, e, t) }
                return f.Extend(r, e), r.prototype.bind = function(e, t) { r.__super__.bind.call(this, e, t), this.addOptions(this.convertToOptions(this._dataToConvert)) }, r.prototype.select = function(n) {
                    var e = this.$element.find("option").filter(function(e, t) { return t.value == n.id.toString() });
                    0 === e.length && (e = this.option(n), this.addOptions(e)), r.__super__.select.call(this, n)
                }, r.prototype.convertToOptions = function(e) {
                    var t = this,
                        n = this.$element.find("option"),
                        r = n.map(function() { return t.item(g(this)).id }).get(),
                        i = [];

                    function o(e) { return function() { return g(this).val() == e.id } }
                    for (var s = 0; s < e.length; s++) {
                        var a = this._normalizeItem(e[s]);
                        if (0 <= g.inArray(a.id, r)) {
                            var l = n.filter(o(a)),
                                c = this.item(l),
                                u = g.extend(!0, {}, a, c),
                                d = this.option(u);
                            l.replaceWith(d)
                        } else {
                            var p = this.option(a);
                            if (a.children) {
                                var h = this.convertToOptions(a.children);
                                f.appendMany(p, h)
                            }
                            i.push(p)
                        }
                    }
                    return i
                }, r
            }), e.define("select2/data/ajax", ["./array", "../utils", "jquery"], function(e, t, o) {
                function n(e, t) { this.ajaxOptions = this._applyDefaults(t.get("ajax")), null != this.ajaxOptions.processResults && (this.processResults = this.ajaxOptions.processResults), n.__super__.constructor.call(this, e, t) }
                return t.Extend(n, e), n.prototype._applyDefaults = function(e) { var t = { data: function(e) { return o.extend({}, e, { q: e.term }) }, transport: function(e, t, n) { var r = o.ajax(e); return r.then(t), r.fail(n), r } }; return o.extend({}, t, e, !0) }, n.prototype.processResults = function(e) { return e }, n.prototype.query = function(n, r) {
                    var i = this;
                    null != this._request && (o.isFunction(this._request.abort) && this._request.abort(), this._request = null);
                    var t = o.extend({ type: "GET" }, this.ajaxOptions);

                    function e() {
                        var e = t.transport(t, function(e) {
                            var t = i.processResults(e, n);
                            i.options.get("debug") && window.console && console.error && (t && t.results && o.isArray(t.results) || console.error("Select2: The AJAX results did not return an array in the `results` key of the response.")), r(t)
                        }, function() { "status" in e && (0 === e.status || "0" === e.status) || i.trigger("results:message", { message: "errorLoading" }) });
                        i._request = e
                    }
                    "function" == typeof t.url && (t.url = t.url.call(this.$element, n)), "function" == typeof t.data && (t.data = t.data.call(this.$element, n)), this.ajaxOptions.delay && null != n.term ? (this._queryTimeout && window.clearTimeout(this._queryTimeout), this._queryTimeout = window.setTimeout(e, this.ajaxOptions.delay)) : e()
                }, n
            }), e.define("select2/data/tags", ["jquery"], function(u) {
                function e(e, t, n) {
                    var r = n.get("tags"),
                        i = n.get("createTag");
                    void 0 !== i && (this.createTag = i);
                    var o = n.get("insertTag");
                    if (void 0 !== o && (this.insertTag = o), e.call(this, t, n), u.isArray(r))
                        for (var s = 0; s < r.length; s++) {
                            var a = r[s],
                                l = this._normalizeItem(a),
                                c = this.option(l);
                            this.$element.append(c)
                        }
                }
                return e.prototype.query = function(e, c, u) {
                    var d = this;
                    this._removeOldTags(), null != c.term && null == c.page ? e.call(this, c, function e(t, n) {
                        for (var r = t.results, i = 0; i < r.length; i++) {
                            var o = r[i],
                                s = null != o.children && !e({ results: o.children }, !0);
                            if ((o.text || "").toUpperCase() === (c.term || "").toUpperCase() || s) return !n && (t.data = r, void u(t))
                        }
                        if (n) return !0;
                        var a = d.createTag(c);
                        if (null != a) {
                            var l = d.option(a);
                            l.attr("data-select2-tag", !0), d.addOptions([l]), d.insertTag(r, a)
                        }
                        t.results = r, u(t)
                    }) : e.call(this, c, u)
                }, e.prototype.createTag = function(e, t) { var n = u.trim(t.term); return "" === n ? null : { id: n, text: n } }, e.prototype.insertTag = function(e, t, n) { t.unshift(n) }, e.prototype._removeOldTags = function(e) { this.$element.find("option[data-select2-tag]").each(function() { this.selected || u(this).remove() }) }, e
            }), e.define("select2/data/tokenizer", ["jquery"], function(d) {
                function e(e, t, n) {
                    var r = n.get("tokenizer");
                    void 0 !== r && (this.tokenizer = r), e.call(this, t, n)
                }
                return e.prototype.bind = function(e, t, n) { e.call(this, t, n), this.$search = t.dropdown.$search || t.selection.$search || n.find(".select2-search__field") }, e.prototype.query = function(e, t, n) {
                    var i = this;
                    t.term = t.term || "";
                    var r = this.tokenizer(t, this.options, function(e) {
                        var t, n = i._normalizeItem(e);
                        if (!i.$element.find("option").filter(function() { return d(this).val() === n.id }).length) {
                            var r = i.option(n);
                            r.attr("data-select2-tag", !0), i._removeOldTags(), i.addOptions([r])
                        }
                        t = n, i.trigger("select", { data: t })
                    });
                    r.term !== t.term && (this.$search.length && (this.$search.val(r.term), this.$search.trigger("focus")), t.term = r.term), e.call(this, t, n)
                }, e.prototype.tokenizer = function(e, t, n, r) {
                    for (var i = n.get("tokenSeparators") || [], o = t.term, s = 0, a = this.createTag || function(e) { return { id: e.term, text: e.term } }; s < o.length;) {
                        var l = o[s];
                        if (-1 !== d.inArray(l, i)) {
                            var c = o.substr(0, s),
                                u = a(d.extend({}, t, { term: c }));
                            null != u ? (r(u), o = o.substr(s + 1) || "", s = 0) : s++
                        } else s++
                    }
                    return { term: o }
                }, e
            }), e.define("select2/data/minimumInputLength", [], function() {
                function e(e, t, n) { this.minimumInputLength = n.get("minimumInputLength"), e.call(this, t, n) }
                return e.prototype.query = function(e, t, n) { t.term = t.term || "", t.term.length < this.minimumInputLength ? this.trigger("results:message", { message: "inputTooShort", args: { minimum: this.minimumInputLength, input: t.term, params: t } }) : e.call(this, t, n) }, e
            }), e.define("select2/data/maximumInputLength", [], function() {
                function e(e, t, n) { this.maximumInputLength = n.get("maximumInputLength"), e.call(this, t, n) }
                return e.prototype.query = function(e, t, n) { t.term = t.term || "", 0 < this.maximumInputLength && t.term.length > this.maximumInputLength ? this.trigger("results:message", { message: "inputTooLong", args: { maximum: this.maximumInputLength, input: t.term, params: t } }) : e.call(this, t, n) }, e
            }), e.define("select2/data/maximumSelectionLength", [], function() {
                function e(e, t, n) { this.maximumSelectionLength = n.get("maximumSelectionLength"), e.call(this, t, n) }
                return e.prototype.bind = function(e, t, n) {
                    var r = this;
                    e.call(this, t, n), t.on("select", function() { r._checkIfMaximumSelected() })
                }, e.prototype.query = function(e, t, n) {
                    var r = this;
                    this._checkIfMaximumSelected(function() { e.call(r, t, n) })
                }, e.prototype._checkIfMaximumSelected = function(e, n) {
                    var r = this;
                    this.current(function(e) {
                        var t = null != e ? e.length : 0;
                        0 < r.maximumSelectionLength && t >= r.maximumSelectionLength ? r.trigger("results:message", { message: "maximumSelected", args: { maximum: r.maximumSelectionLength } }) : n && n()
                    })
                }, e
            }), e.define("select2/dropdown", ["jquery", "./utils"], function(t, e) {
                function n(e, t) { this.$element = e, this.options = t, n.__super__.constructor.call(this) }
                return e.Extend(n, e.Observable), n.prototype.render = function() { var e = t('<span class="select2-dropdown"><span class="select2-results"></span></span>'); return e.attr("dir", this.options.get("dir")), this.$dropdown = e }, n.prototype.bind = function() {}, n.prototype.position = function(e, t) {}, n.prototype.destroy = function() { this.$dropdown.remove() }, n
            }), e.define("select2/dropdown/search", ["jquery", "../utils"], function(o, e) {
                function t() {}
                return t.prototype.render = function(e) {
                    var t = e.call(this),
                        n = o('<span class="select2-search select2-search--dropdown"><input class="select2-search__field" type="search" tabindex="-1" autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false" role="searchbox" aria-autocomplete="list" /></span>');
                    return this.$searchContainer = n, this.$search = n.find("input"), t.prepend(n), t
                }, t.prototype.bind = function(e, t, n) {
                    var r = this,
                        i = t.id + "-results";
                    e.call(this, t, n), this.$search.on("keydown", function(e) { r.trigger("keypress", e), r._keyUpPrevented = e.isDefaultPrevented() }), this.$search.on("input", function(e) { o(this).off("keyup") }), this.$search.on("keyup input", function(e) { r.handleSearch(e) }), t.on("open", function() { r.$search.attr("tabindex", 0), r.$search.attr("aria-controls", i), r.$search.trigger("focus"), window.setTimeout(function() { r.$search.trigger("focus") }, 0) }), t.on("close", function() { r.$search.attr("tabindex", -1), r.$search.removeAttr("aria-controls"), r.$search.removeAttr("aria-activedescendant"), r.$search.val(""), r.$search.trigger("blur") }), t.on("focus", function() { t.isOpen() || r.$search.trigger("focus") }), t.on("results:all", function(e) { null != e.query.term && "" !== e.query.term || (r.showSearch(e) ? r.$searchContainer.removeClass("select2-search--hide") : r.$searchContainer.addClass("select2-search--hide")) }), t.on("results:focus", function(e) { e.data._resultId ? r.$search.attr("aria-activedescendant", e.data._resultId) : r.$search.removeAttr("aria-activedescendant") })
                }, t.prototype.handleSearch = function(e) {
                    if (!this._keyUpPrevented) {
                        var t = this.$search.val();
                        this.trigger("query", { term: t })
                    }
                    this._keyUpPrevented = !1
                }, t.prototype.showSearch = function(e, t) { return !0 }, t
            }), e.define("select2/dropdown/hidePlaceholder", [], function() {
                function e(e, t, n, r) { this.placeholder = this.normalizePlaceholder(n.get("placeholder")), e.call(this, t, n, r) }
                return e.prototype.append = function(e, t) { t.results = this.removePlaceholder(t.results), e.call(this, t) }, e.prototype.normalizePlaceholder = function(e, t) { return "string" == typeof t && (t = { id: "", text: t }), t }, e.prototype.removePlaceholder = function(e, t) {
                    for (var n = t.slice(0), r = t.length - 1; 0 <= r; r--) {
                        var i = t[r];
                        this.placeholder.id === i.id && n.splice(r, 1)
                    }
                    return n
                }, e
            }), e.define("select2/dropdown/infiniteScroll", ["jquery"], function(n) {
                function e(e, t, n, r) { this.lastParams = {}, e.call(this, t, n, r), this.$loadingMore = this.createLoadingMore(), this.loading = !1 }
                return e.prototype.append = function(e, t) { this.$loadingMore.remove(), this.loading = !1, e.call(this, t), this.showLoadingMore(t) && (this.$results.append(this.$loadingMore), this.loadMoreIfNeeded()) }, e.prototype.bind = function(e, t, n) {
                    var r = this;
                    e.call(this, t, n), t.on("query", function(e) { r.lastParams = e, r.loading = !0 }), t.on("query:append", function(e) { r.lastParams = e, r.loading = !0 }), this.$results.on("scroll", this.loadMoreIfNeeded.bind(this))
                }, e.prototype.loadMoreIfNeeded = function() {
                    var e = n.contains(document.documentElement, this.$loadingMore[0]);
                    if (!this.loading && e) {
                        var t = this.$results.offset().top + this.$results.outerHeight(!1);
                        this.$loadingMore.offset().top + this.$loadingMore.outerHeight(!1) <= t + 50 && this.loadMore()
                    }
                }, e.prototype.loadMore = function() {
                    this.loading = !0;
                    var e = n.extend({}, { page: 1 }, this.lastParams);
                    e.page++, this.trigger("query:append", e)
                }, e.prototype.showLoadingMore = function(e, t) { return t.pagination && t.pagination.more }, e.prototype.createLoadingMore = function() {
                    var e = n('<li class="select2-results__option select2-results__option--load-more"role="option" aria-disabled="true"></li>'),
                        t = this.options.get("translations").get("loadingMore");
                    return e.html(t(this.lastParams)), e
                }, e
            }), e.define("select2/dropdown/attachBody", ["jquery", "../utils"], function(f, a) {
                function e(e, t, n) { this.$dropdownParent = f(n.get("dropdownParent") || document.body), e.call(this, t, n) }
                return e.prototype.bind = function(e, t, n) {
                    var r = this;
                    e.call(this, t, n), t.on("open", function() { r._showDropdown(), r._attachPositioningHandler(t), r._bindContainerResultHandlers(t) }), t.on("close", function() { r._hideDropdown(), r._detachPositioningHandler(t) }), this.$dropdownContainer.on("mousedown", function(e) { e.stopPropagation() })
                }, e.prototype.destroy = function(e) { e.call(this), this.$dropdownContainer.remove() }, e.prototype.position = function(e, t, n) { t.attr("class", n.attr("class")), t.removeClass("select2"), t.addClass("select2-container--open"), t.css({ position: "absolute", top: -999999 }), this.$container = n }, e.prototype.render = function(e) {
                    var t = f("<span></span>"),
                        n = e.call(this);
                    return t.append(n), this.$dropdownContainer = t
                }, e.prototype._hideDropdown = function(e) { this.$dropdownContainer.detach() }, e.prototype._bindContainerResultHandlers = function(e, t) {
                    if (!this._containerResultsHandlersBound) {
                        var n = this;
                        t.on("results:all", function() { n._positionDropdown(), n._resizeDropdown() }), t.on("results:append", function() { n._positionDropdown(), n._resizeDropdown() }), t.on("results:message", function() { n._positionDropdown(), n._resizeDropdown() }), t.on("select", function() { n._positionDropdown(), n._resizeDropdown() }), t.on("unselect", function() { n._positionDropdown(), n._resizeDropdown() }), this._containerResultsHandlersBound = !0
                    }
                }, e.prototype._attachPositioningHandler = function(e, t) {
                    var n = this,
                        r = "scroll.select2." + t.id,
                        i = "resize.select2." + t.id,
                        o = "orientationchange.select2." + t.id,
                        s = this.$container.parents().filter(a.hasScroll);
                    s.each(function() { a.StoreData(this, "select2-scroll-position", { x: f(this).scrollLeft(), y: f(this).scrollTop() }) }), s.on(r, function(e) {
                        var t = a.GetData(this, "select2-scroll-position");
                        f(this).scrollTop(t.y)
                    }), f(window).on(r + " " + i + " " + o, function(e) { n._positionDropdown(), n._resizeDropdown() })
                }, e.prototype._detachPositioningHandler = function(e, t) {
                    var n = "scroll.select2." + t.id,
                        r = "resize.select2." + t.id,
                        i = "orientationchange.select2." + t.id;
                    this.$container.parents().filter(a.hasScroll).off(n), f(window).off(n + " " + r + " " + i)
                }, e.prototype._positionDropdown = function() {
                    var e = f(window),
                        t = this.$dropdown.hasClass("select2-dropdown--above"),
                        n = this.$dropdown.hasClass("select2-dropdown--below"),
                        r = null,
                        i = this.$container.offset();
                    i.bottom = i.top + this.$container.outerHeight(!1);
                    var o = { height: this.$container.outerHeight(!1) };
                    o.top = i.top, o.bottom = i.top + o.height;
                    var s = this.$dropdown.outerHeight(!1),
                        a = e.scrollTop(),
                        l = e.scrollTop() + e.height(),
                        c = a < i.top - s,
                        u = l > i.bottom + s,
                        d = { left: i.left, top: o.bottom },
                        p = this.$dropdownParent;
                    "static" === p.css("position") && (p = p.offsetParent());
                    var h = { top: 0, left: 0 };
                    (f.contains(document.body, p[0]) || p[0].isConnected) && (h = p.offset()), d.top -= h.top, d.left -= h.left, t || n || (r = "below"), u || !c || t ? !c && u && t && (r = "below") : r = "above", ("above" == r || t && "below" !== r) && (d.top = o.top - h.top - s), null != r && (this.$dropdown.removeClass("select2-dropdown--below select2-dropdown--above").addClass("select2-dropdown--" + r), this.$container.removeClass("select2-container--below select2-container--above").addClass("select2-container--" + r)), this.$dropdownContainer.css(d)
                }, e.prototype._resizeDropdown = function() {
                    var e = { width: this.$container.outerWidth(!1) + "px" };
                    this.options.get("dropdownAutoWidth") && (e.minWidth = e.width, e.position = "relative", e.width = "auto"), this.$dropdown.css(e)
                }, e.prototype._showDropdown = function(e) { this.$dropdownContainer.appendTo(this.$dropdownParent), this._positionDropdown(), this._resizeDropdown() }, e
            }), e.define("select2/dropdown/minimumResultsForSearch", [], function() {
                function e(e, t, n, r) { this.minimumResultsForSearch = n.get("minimumResultsForSearch"), this.minimumResultsForSearch < 0 && (this.minimumResultsForSearch = 1 / 0), e.call(this, t, n, r) }
                return e.prototype.showSearch = function(e, t) {
                    return !(function e(t) {
                        for (var n = 0, r = 0; r < t.length; r++) {
                            var i = t[r];
                            i.children ? n += e(i.children) : n++
                        }
                        return n
                    }(t.data.results) < this.minimumResultsForSearch) && e.call(this, t)
                }, e
            }), e.define("select2/dropdown/selectOnClose", ["../utils"], function(o) {
                function e() {}
                return e.prototype.bind = function(e, t, n) {
                    var r = this;
                    e.call(this, t, n), t.on("close", function(e) { r._handleSelectOnClose(e) })
                }, e.prototype._handleSelectOnClose = function(e, t) {
                    if (t && null != t.originalSelect2Event) { var n = t.originalSelect2Event; if ("select" === n._type || "unselect" === n._type) return }
                    var r = this.getHighlightedResults();
                    if (!(r.length < 1)) {
                        var i = o.GetData(r[0], "data");
                        null != i.element && i.element.selected || null == i.element && i.selected || this.trigger("select", { data: i })
                    }
                }, e
            }), e.define("select2/dropdown/closeOnSelect", [], function() {
                function e() {}
                return e.prototype.bind = function(e, t, n) {
                    var r = this;
                    e.call(this, t, n), t.on("select", function(e) { r._selectTriggered(e) }), t.on("unselect", function(e) { r._selectTriggered(e) })
                }, e.prototype._selectTriggered = function(e, t) {
                    var n = t.originalEvent;
                    n && (n.ctrlKey || n.metaKey) || this.trigger("close", { originalEvent: n, originalSelect2Event: t })
                }, e
            }), e.define("select2/i18n/en", [], function() {
                return {
                    errorLoading: function() { return "The results could not be loaded." },
                    inputTooLong: function(e) {
                        var t = e.input.length - e.maximum,
                            n = "Please delete " + t + " character";
                        return 1 != t && (n += "s"), n
                    },
                    inputTooShort: function(e) { return "Please enter " + (e.minimum - e.input.length) + " or more characters" },
                    loadingMore: function() { return "Loading more resultsâ€¦" },
                    maximumSelected: function(e) { var t = "You can only select " + e.maximum + " item"; return 1 != e.maximum && (t += "s"), t },
                    noResults: function() { return "No results found" },
                    searching: function() { return "Searchingâ€¦" },
                    removeAllItems: function() { return "Remove all items" }
                }
            }), e.define("select2/defaults", ["jquery", "require", "./results", "./selection/single", "./selection/multiple", "./selection/placeholder", "./selection/allowClear", "./selection/search", "./selection/eventRelay", "./utils", "./translation", "./diacritics", "./data/select", "./data/array", "./data/ajax", "./data/tags", "./data/tokenizer", "./data/minimumInputLength", "./data/maximumInputLength", "./data/maximumSelectionLength", "./dropdown", "./dropdown/search", "./dropdown/hidePlaceholder", "./dropdown/infiniteScroll", "./dropdown/attachBody", "./dropdown/minimumResultsForSearch", "./dropdown/selectOnClose", "./dropdown/closeOnSelect", "./i18n/en"], function(c, u, d, p, h, f, g, m, v, y, s, t, _, $, b, w, A, x, D, S, E, C, O, T, q, L, I, j, e) {
                function n() { this.reset() }
                return n.prototype.apply = function(e) {
                    if (null == (e = c.extend(!0, {}, this.defaults, e)).dataAdapter) {
                        if (null != e.ajax ? e.dataAdapter = b : null != e.data ? e.dataAdapter = $ : e.dataAdapter = _, 0 < e.minimumInputLength && (e.dataAdapter = y.Decorate(e.dataAdapter, x)), 0 < e.maximumInputLength && (e.dataAdapter = y.Decorate(e.dataAdapter, D)), 0 < e.maximumSelectionLength && (e.dataAdapter = y.Decorate(e.dataAdapter, S)), e.tags && (e.dataAdapter = y.Decorate(e.dataAdapter, w)), null == e.tokenSeparators && null == e.tokenizer || (e.dataAdapter = y.Decorate(e.dataAdapter, A)), null != e.query) {
                            var t = u(e.amdBase + "compat/query");
                            e.dataAdapter = y.Decorate(e.dataAdapter, t)
                        }
                        if (null != e.initSelection) {
                            var n = u(e.amdBase + "compat/initSelection");
                            e.dataAdapter = y.Decorate(e.dataAdapter, n)
                        }
                    }
                    if (null == e.resultsAdapter && (e.resultsAdapter = d, null != e.ajax && (e.resultsAdapter = y.Decorate(e.resultsAdapter, T)), null != e.placeholder && (e.resultsAdapter = y.Decorate(e.resultsAdapter, O)), e.selectOnClose && (e.resultsAdapter = y.Decorate(e.resultsAdapter, I))), null == e.dropdownAdapter) {
                        if (e.multiple) e.dropdownAdapter = E;
                        else {
                            var r = y.Decorate(E, C);
                            e.dropdownAdapter = r
                        }
                        if (0 !== e.minimumResultsForSearch && (e.dropdownAdapter = y.Decorate(e.dropdownAdapter, L)), e.closeOnSelect && (e.dropdownAdapter = y.Decorate(e.dropdownAdapter, j)), null != e.dropdownCssClass || null != e.dropdownCss || null != e.adaptDropdownCssClass) {
                            var i = u(e.amdBase + "compat/dropdownCss");
                            e.dropdownAdapter = y.Decorate(e.dropdownAdapter, i)
                        }
                        e.dropdownAdapter = y.Decorate(e.dropdownAdapter, q)
                    }
                    if (null == e.selectionAdapter) {
                        if (e.multiple ? e.selectionAdapter = h : e.selectionAdapter = p, null != e.placeholder && (e.selectionAdapter = y.Decorate(e.selectionAdapter, f)), e.allowClear && (e.selectionAdapter = y.Decorate(e.selectionAdapter, g)), e.multiple && (e.selectionAdapter = y.Decorate(e.selectionAdapter, m)), null != e.containerCssClass || null != e.containerCss || null != e.adaptContainerCssClass) {
                            var o = u(e.amdBase + "compat/containerCss");
                            e.selectionAdapter = y.Decorate(e.selectionAdapter, o)
                        }
                        e.selectionAdapter = y.Decorate(e.selectionAdapter, v)
                    }
                    e.language = this._resolveLanguage(e.language), e.language.push("en");
                    for (var s = [], a = 0; a < e.language.length; a++) { var l = e.language[a]; - 1 === s.indexOf(l) && s.push(l) }
                    return e.language = s, e.translations = this._processTranslations(e.language, e.debug), e
                }, n.prototype.reset = function() {
                    function a(e) { return e.replace(/[^\u0000-\u007E]/g, function(e) { return t[e] || e }) }
                    this.defaults = {
                        amdBase: "./",
                        amdLanguageBase: "./i18n/",
                        closeOnSelect: !0,
                        debug: !1,
                        dropdownAutoWidth: !1,
                        escapeMarkup: y.escapeMarkup,
                        language: {},
                        matcher: function e(t, n) {
                            if ("" === c.trim(t.term)) return n;
                            if (n.children && 0 < n.children.length) { for (var r = c.extend(!0, {}, n), i = n.children.length - 1; 0 <= i; i--) null == e(t, n.children[i]) && r.children.splice(i, 1); return 0 < r.children.length ? r : e(t, r) }
                            var o = a(n.text).toUpperCase(),
                                s = a(t.term).toUpperCase();
                            return -1 < o.indexOf(s) ? n : null
                        },
                        minimumInputLength: 0,
                        maximumInputLength: 0,
                        maximumSelectionLength: 0,
                        minimumResultsForSearch: 0,
                        selectOnClose: !1,
                        scrollAfterSelect: !1,
                        sorter: function(e) { return e },
                        templateResult: function(e) { return e.text },
                        templateSelection: function(e) { return e.text },
                        theme: "default",
                        width: "resolve"
                    }
                }, n.prototype.applyFromElement = function(e, t) {
                    var n = e.language,
                        r = this.defaults.language,
                        i = t.prop("lang"),
                        o = t.closest("[lang]").prop("lang"),
                        s = Array.prototype.concat.call(this._resolveLanguage(i), this._resolveLanguage(n), this._resolveLanguage(r), this._resolveLanguage(o));
                    return e.language = s, e
                }, n.prototype._resolveLanguage = function(e) {
                    if (!e) return [];
                    if (c.isEmptyObject(e)) return [];
                    if (c.isPlainObject(e)) return [e];
                    var t;
                    t = c.isArray(e) ? e : [e];
                    for (var n = [], r = 0; r < t.length; r++)
                        if (n.push(t[r]), "string" == typeof t[r] && 0 < t[r].indexOf("-")) {
                            var i = t[r].split("-")[0];
                            n.push(i)
                        }
                    return n
                }, n.prototype._processTranslations = function(e, t) {
                    for (var n = new s, r = 0; r < e.length; r++) {
                        var i = new s,
                            o = e[r];
                        if ("string" == typeof o) try { i = s.loadPath(o) } catch (e) { try { o = this.defaults.amdLanguageBase + o, i = s.loadPath(o) } catch (e) { t && window.console && console.warn && console.warn('Select2: The language file for "' + o + '" could not be automatically loaded. A fallback will be used instead.') } } else i = c.isPlainObject(o) ? new s(o) : o;
                        n.extend(i)
                    }
                    return n
                }, n.prototype.set = function(e, t) {
                    var n = {};
                    n[c.camelCase(e)] = t;
                    var r = y._convertData(n);
                    c.extend(!0, this.defaults, r)
                }, new n
            }), e.define("select2/options", ["require", "jquery", "./defaults", "./utils"], function(r, d, i, p) {
                function e(e, t) {
                    if (this.options = e, null != t && this.fromElement(t), null != t && (this.options = i.applyFromElement(this.options, t)), this.options = i.apply(this.options), t && t.is("input")) {
                        var n = r(this.get("amdBase") + "compat/inputData");
                        this.options.dataAdapter = p.Decorate(this.options.dataAdapter, n)
                    }
                }
                return e.prototype.fromElement = function(e) {
                    var t = ["select2"];
                    null == this.options.multiple && (this.options.multiple = e.prop("multiple")), null == this.options.disabled && (this.options.disabled = e.prop("disabled")), null == this.options.dir && (e.prop("dir") ? this.options.dir = e.prop("dir") : e.closest("[dir]").prop("dir") ? this.options.dir = e.closest("[dir]").prop("dir") : this.options.dir = "ltr"), e.prop("disabled", this.options.disabled), e.prop("multiple", this.options.multiple), p.GetData(e[0], "select2Tags") && (this.options.debug && window.console && console.warn && console.warn('Select2: The `data-select2-tags` attribute has been changed to use the `data-data` and `data-tags="true"` attributes and will be removed in future versions of Select2.'), p.StoreData(e[0], "data", p.GetData(e[0], "select2Tags")), p.StoreData(e[0], "tags", !0)), p.GetData(e[0], "ajaxUrl") && (this.options.debug && window.console && console.warn && console.warn("Select2: The `data-ajax-url` attribute has been changed to `data-ajax--url` and support for the old attribute will be removed in future versions of Select2."), e.attr("ajax--url", p.GetData(e[0], "ajaxUrl")), p.StoreData(e[0], "ajax-Url", p.GetData(e[0], "ajaxUrl")));
                    var n = {};

                    function r(e, t) { return t.toUpperCase() }
                    for (var i = 0; i < e[0].attributes.length; i++) {
                        var o = e[0].attributes[i].name,
                            s = "data-";
                        if (o.substr(0, s.length) == s) {
                            var a = o.substring(s.length),
                                l = p.GetData(e[0], a);
                            n[a.replace(/-([a-z])/g, r)] = l
                        }
                    }
                    d.fn.jquery && "1." == d.fn.jquery.substr(0, 2) && e[0].dataset && (n = d.extend(!0, {}, e[0].dataset, n));
                    var c = d.extend(!0, {}, p.GetData(e[0]), n);
                    for (var u in c = p._convertData(c)) - 1 < d.inArray(u, t) || (d.isPlainObject(this.options[u]) ? d.extend(this.options[u], c[u]) : this.options[u] = c[u]);
                    return this
                }, e.prototype.get = function(e) { return this.options[e] }, e.prototype.set = function(e, t) { this.options[e] = t }, e
            }), e.define("select2/core", ["jquery", "./options", "./utils", "./keys"], function(o, c, u, r) {
                var d = function(e, t) {
                    null != u.GetData(e[0], "select2") && u.GetData(e[0], "select2").destroy(), this.$element = e, this.id = this._generateId(e), t = t || {}, this.options = new c(t, e), d.__super__.constructor.call(this);
                    var n = e.attr("tabindex") || 0;
                    u.StoreData(e[0], "old-tabindex", n), e.attr("tabindex", "-1");
                    var r = this.options.get("dataAdapter");
                    this.dataAdapter = new r(e, this.options);
                    var i = this.render();
                    this._placeContainer(i);
                    var o = this.options.get("selectionAdapter");
                    this.selection = new o(e, this.options), this.$selection = this.selection.render(), this.selection.position(this.$selection, i);
                    var s = this.options.get("dropdownAdapter");
                    this.dropdown = new s(e, this.options), this.$dropdown = this.dropdown.render(), this.dropdown.position(this.$dropdown, i);
                    var a = this.options.get("resultsAdapter");
                    this.results = new a(e, this.options, this.dataAdapter), this.$results = this.results.render(), this.results.position(this.$results, this.$dropdown);
                    var l = this;
                    this._bindAdapters(), this._registerDomEvents(), this._registerDataEvents(), this._registerSelectionEvents(), this._registerDropdownEvents(), this._registerResultsEvents(), this._registerEvents(), this.dataAdapter.current(function(e) { l.trigger("selection:update", { data: e }) }), e.addClass("select2-hidden-accessible"), e.attr("aria-hidden", "true"), this._syncAttributes(), u.StoreData(e[0], "select2", this), e.data("select2", this)
                };
                return u.Extend(d, u.Observable), d.prototype._generateId = function(e) { return "select2-" + (null != e.attr("id") ? e.attr("id") : null != e.attr("name") ? e.attr("name") + "-" + u.generateChars(2) : u.generateChars(4)).replace(/(:|\.|\[|\]|,)/g, "") }, d.prototype._placeContainer = function(e) {
                    e.insertAfter(this.$element);
                    var t = this._resolveWidth(this.$element, this.options.get("width"));
                    null != t && e.css("width", t)
                }, d.prototype._resolveWidth = function(e, t) { var n = /^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i; if ("resolve" == t) { var r = this._resolveWidth(e, "style"); return null != r ? r : this._resolveWidth(e, "element") } if ("element" == t) { var i = e.outerWidth(!1); return i <= 0 ? "auto" : i + "px" } if ("style" != t) return "computedstyle" != t ? t : window.getComputedStyle(e[0]).width; var o = e.attr("style"); if ("string" != typeof o) return null; for (var s = o.split(";"), a = 0, l = s.length; a < l; a += 1) { var c = s[a].replace(/\s/g, "").match(n); if (null !== c && 1 <= c.length) return c[1] } return null }, d.prototype._bindAdapters = function() { this.dataAdapter.bind(this, this.$container), this.selection.bind(this, this.$container), this.dropdown.bind(this, this.$container), this.results.bind(this, this.$container) }, d.prototype._registerDomEvents = function() {
                    var t = this;
                    this.$element.on("change.select2", function() { t.dataAdapter.current(function(e) { t.trigger("selection:update", { data: e }) }) }), this.$element.on("focus.select2", function(e) { t.trigger("focus", e) }), this._syncA = u.bind(this._syncAttributes, this), this._syncS = u.bind(this._syncSubtree, this), this.$element[0].attachEvent && this.$element[0].attachEvent("onpropertychange", this._syncA);
                    var e = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
                    null != e ? (this._observer = new e(function(e) { t._syncA(), t._syncS(null, e) }), this._observer.observe(this.$element[0], { attributes: !0, childList: !0, subtree: !1 })) : this.$element[0].addEventListener && (this.$element[0].addEventListener("DOMAttrModified", t._syncA, !1), this.$element[0].addEventListener("DOMNodeInserted", t._syncS, !1), this.$element[0].addEventListener("DOMNodeRemoved", t._syncS, !1))
                }, d.prototype._registerDataEvents = function() {
                    var n = this;
                    this.dataAdapter.on("*", function(e, t) { n.trigger(e, t) })
                }, d.prototype._registerSelectionEvents = function() {
                    var n = this,
                        r = ["toggle", "focus"];
                    this.selection.on("toggle", function() { n.toggleDropdown() }), this.selection.on("focus", function(e) { n.focus(e) }), this.selection.on("*", function(e, t) {-1 === o.inArray(e, r) && n.trigger(e, t) })
                }, d.prototype._registerDropdownEvents = function() {
                    var n = this;
                    this.dropdown.on("*", function(e, t) { n.trigger(e, t) })
                }, d.prototype._registerResultsEvents = function() {
                    var n = this;
                    this.results.on("*", function(e, t) { n.trigger(e, t) })
                }, d.prototype._registerEvents = function() {
                    var n = this;
                    this.on("open", function() { n.$container.addClass("select2-container--open") }), this.on("close", function() { n.$container.removeClass("select2-container--open") }), this.on("enable", function() { n.$container.removeClass("select2-container--disabled") }), this.on("disable", function() { n.$container.addClass("select2-container--disabled") }), this.on("blur", function() { n.$container.removeClass("select2-container--focus") }), this.on("query", function(t) { n.isOpen() || n.trigger("open", {}), this.dataAdapter.query(t, function(e) { n.trigger("results:all", { data: e, query: t }) }) }), this.on("query:append", function(t) { this.dataAdapter.query(t, function(e) { n.trigger("results:append", { data: e, query: t }) }) }), this.on("keypress", function(e) {
                        var t = e.which;
                        n.isOpen() ? t === r.ESC || t === r.TAB || t === r.UP && e.altKey ? (n.close(e), e.preventDefault()) : t === r.ENTER ? (n.trigger("results:select", {}), e.preventDefault()) : t === r.SPACE && e.ctrlKey ? (n.trigger("results:toggle", {}), e.preventDefault()) : t === r.UP ? (n.trigger("results:previous", {}), e.preventDefault()) : t === r.DOWN && (n.trigger("results:next", {}), e.preventDefault()) : (t === r.ENTER || t === r.SPACE || t === r.DOWN && e.altKey) && (n.open(), e.preventDefault())
                    })
                }, d.prototype._syncAttributes = function() { this.options.set("disabled", this.$element.prop("disabled")), this.isDisabled() ? (this.isOpen() && this.close(), this.trigger("disable", {})) : this.trigger("enable", {}) }, d.prototype._isChangeMutation = function(e, t) {
                    var n = !1,
                        r = this;
                    if (!e || !e.target || "OPTION" === e.target.nodeName || "OPTGROUP" === e.target.nodeName) {
                        if (t)
                            if (t.addedNodes && 0 < t.addedNodes.length)
                                for (var i = 0; i < t.addedNodes.length; i++) { t.addedNodes[i].selected && (n = !0) } else t.removedNodes && 0 < t.removedNodes.length ? n = !0 : o.isArray(t) && o.each(t, function(e, t) { if (r._isChangeMutation(e, t)) return !(n = !0) });
                            else n = !0;
                        return n
                    }
                }, d.prototype._syncSubtree = function(e, t) {
                    var n = this._isChangeMutation(e, t),
                        r = this;
                    n && this.dataAdapter.current(function(e) { r.trigger("selection:update", { data: e }) })
                }, d.prototype.trigger = function(e, t) {
                    var n = d.__super__.trigger,
                        r = { open: "opening", close: "closing", select: "selecting", unselect: "unselecting", clear: "clearing" };
                    if (void 0 === t && (t = {}), e in r) {
                        var i = r[e],
                            o = { prevented: !1, name: e, args: t };
                        if (n.call(this, i, o), o.prevented) return void(t.prevented = !0)
                    }
                    n.call(this, e, t)
                }, d.prototype.toggleDropdown = function() { this.isDisabled() || (this.isOpen() ? this.close() : this.open()) }, d.prototype.open = function() { this.isOpen() || this.isDisabled() || this.trigger("query", {}) }, d.prototype.close = function(e) { this.isOpen() && this.trigger("close", { originalEvent: e }) }, d.prototype.isEnabled = function() { return !this.isDisabled() }, d.prototype.isDisabled = function() { return this.options.get("disabled") }, d.prototype.isOpen = function() { return this.$container.hasClass("select2-container--open") }, d.prototype.hasFocus = function() { return this.$container.hasClass("select2-container--focus") }, d.prototype.focus = function(e) { this.hasFocus() || (this.$container.addClass("select2-container--focus"), this.trigger("focus", {})) }, d.prototype.enable = function(e) {
                    this.options.get("debug") && window.console && console.warn && console.warn('Select2: The `select2("enable")` method has been deprecated and will be removed in later Select2 versions. Use $element.prop("disabled") instead.'), null != e && 0 !== e.length || (e = [!0]);
                    var t = !e[0];
                    this.$element.prop("disabled", t)
                }, d.prototype.data = function() { this.options.get("debug") && 0 < arguments.length && window.console && console.warn && console.warn('Select2: Data can no longer be set using `select2("data")`. You should consider setting the value instead using `$element.val()`.'); var t = []; return this.dataAdapter.current(function(e) { t = e }), t }, d.prototype.val = function(e) {
                    if (this.options.get("debug") && window.console && console.warn && console.warn('Select2: The `select2("val")` method has been deprecated and will be removed in later Select2 versions. Use $element.val() instead.'), null == e || 0 === e.length) return this.$element.val();
                    var t = e[0];
                    o.isArray(t) && (t = o.map(t, function(e) { return e.toString() })), this.$element.val(t).trigger("input").trigger("change")
                }, d.prototype.destroy = function() { this.$container.remove(), this.$element[0].detachEvent && this.$element[0].detachEvent("onpropertychange", this._syncA), null != this._observer ? (this._observer.disconnect(), this._observer = null) : this.$element[0].removeEventListener && (this.$element[0].removeEventListener("DOMAttrModified", this._syncA, !1), this.$element[0].removeEventListener("DOMNodeInserted", this._syncS, !1), this.$element[0].removeEventListener("DOMNodeRemoved", this._syncS, !1)), this._syncA = null, this._syncS = null, this.$element.off(".select2"), this.$element.attr("tabindex", u.GetData(this.$element[0], "old-tabindex")), this.$element.removeClass("select2-hidden-accessible"), this.$element.attr("aria-hidden", "false"), u.RemoveData(this.$element[0]), this.$element.removeData("select2"), this.dataAdapter.destroy(), this.selection.destroy(), this.dropdown.destroy(), this.results.destroy(), this.dataAdapter = null, this.selection = null, this.dropdown = null, this.results = null }, d.prototype.render = function() { var e = o('<span class="select2 select2-container"><span class="selection"></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>'); return e.attr("dir", this.options.get("dir")), this.$container = e, this.$container.addClass("select2-container--" + this.options.get("theme")), u.StoreData(e[0], "element", this.$element), e }, d
            }), e.define("jquery-mousewheel", ["jquery"], function(e) { return e }), e.define("jquery.select2", ["jquery", "jquery-mousewheel", "./select2/core", "./select2/defaults", "./select2/utils"], function(i, e, o, t, s) {
                if (null == i.fn.select2) {
                    var a = ["open", "close", "destroy"];
                    i.fn.select2 = function(t) {
                        if ("object" == typeof(t = t || {})) return this.each(function() {
                            var e = i.extend(!0, {}, t);
                            new o(i(this), e)
                        }), this;
                        if ("string" != typeof t) throw new Error("Invalid arguments for Select2: " + t);
                        var n, r = Array.prototype.slice.call(arguments, 1);
                        return this.each(function() {
                            var e = s.GetData(this, "select2");
                            null == e && window.console && console.error && console.error("The select2('" + t + "') method was called on an element that is not using Select2."), n = e[t].apply(e, r)
                        }), -1 < i.inArray(t, a) ? this : n
                    }
                }
                return null == i.fn.select2.defaults && (i.fn.select2.defaults = t), o
            }), { define: e.define, require: e.require }
        }(),
        t = e.require("jquery.select2");
    return u.fn.select2.amd = e, t
});;
(function($) {
    'use strict';
    $(document).ready(function() {
        $('body').on('adding_to_cart', function(event, $button, data) { if ($button && $button.hasClass('vc_gitem-link')) { $button.addClass('vc-gitem-add-to-cart-loading-btn').parents('.vc_grid-item-mini').addClass('vc-woocommerce-add-to-cart-loading').append($('<div class="vc_wc-load-add-to-loader-wrapper"><div class="vc_wc-load-add-to-loader"></div></div>')); } }).on('added_to_cart', function(event, fragments, cart_hash, $button) {
            if ('undefined' === typeof($button)) { $button = $('.vc-gitem-add-to-cart-loading-btn'); }
            if ($button && $button.hasClass('vc_gitem-link')) { $button.removeClass('vc-gitem-add-to-cart-loading-btn').parents('.vc_grid-item-mini').removeClass('vc-woocommerce-add-to-cart-loading').find('.vc_wc-load-add-to-loader-wrapper').remove(); }
        });
    });
})(window.jQuery);