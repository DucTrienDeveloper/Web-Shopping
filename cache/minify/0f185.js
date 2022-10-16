/*!
 * jQuery UI Slider 1.13.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
! function(e) { "use strict"; "function" == typeof define && define.amd ? define(["jquery", "./mouse", "./core"], e) : e(jQuery) }(function(o) {
    "use strict";
    return o.widget("ui.slider", o.ui.mouse, {
        version: "1.13.1",
        widgetEventPrefix: "slide",
        options: { animate: !1, classes: { "ui-slider": "ui-corner-all", "ui-slider-handle": "ui-corner-all", "ui-slider-range": "ui-corner-all ui-widget-header" }, distance: 0, max: 100, min: 0, orientation: "horizontal", range: !1, step: 1, value: 0, values: null, change: null, slide: null, start: null, stop: null },
        numPages: 5,
        _create: function() { this._keySliding = !1, this._mouseSliding = !1, this._animateOff = !0, this._handleIndex = null, this._detectOrientation(), this._mouseInit(), this._calculateNewMax(), this._addClass("ui-slider ui-slider-" + this.orientation, "ui-widget ui-widget-content"), this._refresh(), this._animateOff = !1 },
        _refresh: function() { this._createRange(), this._createHandles(), this._setupEvents(), this._refreshValue() },
        _createHandles: function() {
            var e, t = this.options,
                i = this.element.find(".ui-slider-handle"),
                s = [],
                a = t.values && t.values.length || 1;
            for (i.length > a && (i.slice(a).remove(), i = i.slice(0, a)), e = i.length; e < a; e++) s.push("<span tabindex='0'></span>");
            this.handles = i.add(o(s.join("")).appendTo(this.element)), this._addClass(this.handles, "ui-slider-handle", "ui-state-default"), this.handle = this.handles.eq(0), this.handles.each(function(e) { o(this).data("ui-slider-handle-index", e).attr("tabIndex", 0) })
        },
        _createRange: function() {
            var e = this.options;
            e.range ? (!0 === e.range && (e.values ? e.values.length && 2 !== e.values.length ? e.values = [e.values[0], e.values[0]] : Array.isArray(e.values) && (e.values = e.values.slice(0)) : e.values = [this._valueMin(), this._valueMin()]), this.range && this.range.length ? (this._removeClass(this.range, "ui-slider-range-min ui-slider-range-max"), this.range.css({ left: "", bottom: "" })) : (this.range = o("<div>").appendTo(this.element), this._addClass(this.range, "ui-slider-range")), "min" !== e.range && "max" !== e.range || this._addClass(this.range, "ui-slider-range-" + e.range)) : (this.range && this.range.remove(), this.range = null)
        },
        _setupEvents: function() { this._off(this.handles), this._on(this.handles, this._handleEvents), this._hoverable(this.handles), this._focusable(this.handles) },
        _destroy: function() { this.handles.remove(), this.range && this.range.remove(), this._mouseDestroy() },
        _mouseCapture: function(e) {
            var i, s, a, n, t, h, l = this,
                r = this.options;
            return !r.disabled && (this.elementSize = { width: this.element.outerWidth(), height: this.element.outerHeight() }, this.elementOffset = this.element.offset(), t = { x: e.pageX, y: e.pageY }, i = this._normValueFromMouse(t), s = this._valueMax() - this._valueMin() + 1, this.handles.each(function(e) {
                var t = Math.abs(i - l.values(e));
                (t < s || s === t && (e === l._lastChangedValue || l.values(e) === r.min)) && (s = t, a = o(this), n = e)
            }), !1 !== this._start(e, n) && (this._mouseSliding = !0, this._handleIndex = n, this._addClass(a, null, "ui-state-active"), a.trigger("focus"), t = a.offset(), h = !o(e.target).parents().addBack().is(".ui-slider-handle"), this._clickOffset = h ? { left: 0, top: 0 } : { left: e.pageX - t.left - a.width() / 2, top: e.pageY - t.top - a.height() / 2 - (parseInt(a.css("borderTopWidth"), 10) || 0) - (parseInt(a.css("borderBottomWidth"), 10) || 0) + (parseInt(a.css("marginTop"), 10) || 0) }, this.handles.hasClass("ui-state-hover") || this._slide(e, n, i), this._animateOff = !0))
        },
        _mouseStart: function() { return !0 },
        _mouseDrag: function(e) {
            var t = { x: e.pageX, y: e.pageY },
                t = this._normValueFromMouse(t);
            return this._slide(e, this._handleIndex, t), !1
        },
        _mouseStop: function(e) { return this._removeClass(this.handles, null, "ui-state-active"), this._mouseSliding = !1, this._stop(e, this._handleIndex), this._change(e, this._handleIndex), this._handleIndex = null, this._clickOffset = null, this._animateOff = !1 },
        _detectOrientation: function() { this.orientation = "vertical" === this.options.orientation ? "vertical" : "horizontal" },
        _normValueFromMouse: function(e) {
            var t, e = "horizontal" === this.orientation ? (t = this.elementSize.width, e.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (t = this.elementSize.height, e.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)),
                e = e / t;
            return (e = 1 < e ? 1 : e) < 0 && (e = 0), "vertical" === this.orientation && (e = 1 - e), t = this._valueMax() - this._valueMin(), e = this._valueMin() + e * t, this._trimAlignValue(e)
        },
        _uiHash: function(e, t, i) { var s = { handle: this.handles[e], handleIndex: e, value: void 0 !== t ? t : this.value() }; return this._hasMultipleValues() && (s.value = void 0 !== t ? t : this.values(e), s.values = i || this.values()), s },
        _hasMultipleValues: function() { return this.options.values && this.options.values.length },
        _start: function(e, t) { return this._trigger("start", e, this._uiHash(t)) },
        _slide: function(e, t, i) {
            var s, a = this.value(),
                n = this.values();
            this._hasMultipleValues() && (s = this.values(t ? 0 : 1), a = this.values(t), 2 === this.options.values.length && !0 === this.options.range && (i = 0 === t ? Math.min(s, i) : Math.max(s, i)), n[t] = i), i !== a && !1 !== this._trigger("slide", e, this._uiHash(t, i, n)) && (this._hasMultipleValues() ? this.values(t, i) : this.value(i))
        },
        _stop: function(e, t) { this._trigger("stop", e, this._uiHash(t)) },
        _change: function(e, t) { this._keySliding || this._mouseSliding || (this._lastChangedValue = t, this._trigger("change", e, this._uiHash(t))) },
        value: function(e) { return arguments.length ? (this.options.value = this._trimAlignValue(e), this._refreshValue(), void this._change(null, 0)) : this._value() },
        values: function(e, t) {
            var i, s, a;
            if (1 < arguments.length) return this.options.values[e] = this._trimAlignValue(t), this._refreshValue(), void this._change(null, e);
            if (!arguments.length) return this._values();
            if (!Array.isArray(e)) return this._hasMultipleValues() ? this._values(e) : this.value();
            for (i = this.options.values, s = e, a = 0; a < i.length; a += 1) i[a] = this._trimAlignValue(s[a]), this._change(null, a);
            this._refreshValue()
        },
        _setOption: function(e, t) {
            var i, s = 0;
            switch ("range" === e && !0 === this.options.range && ("min" === t ? (this.options.value = this._values(0), this.options.values = null) : "max" === t && (this.options.value = this._values(this.options.values.length - 1), this.options.values = null)), Array.isArray(this.options.values) && (s = this.options.values.length), this._super(e, t), e) {
                case "orientation":
                    this._detectOrientation(), this._removeClass("ui-slider-horizontal ui-slider-vertical")._addClass("ui-slider-" + this.orientation), this._refreshValue(), this.options.range && this._refreshRange(t), this.handles.css("horizontal" === t ? "bottom" : "left", "");
                    break;
                case "value":
                    this._animateOff = !0, this._refreshValue(), this._change(null, 0), this._animateOff = !1;
                    break;
                case "values":
                    for (this._animateOff = !0, this._refreshValue(), i = s - 1; 0 <= i; i--) this._change(null, i);
                    this._animateOff = !1;
                    break;
                case "step":
                case "min":
                case "max":
                    this._animateOff = !0, this._calculateNewMax(), this._refreshValue(), this._animateOff = !1;
                    break;
                case "range":
                    this._animateOff = !0, this._refresh(), this._animateOff = !1
            }
        },
        _setOptionDisabled: function(e) { this._super(e), this._toggleClass(null, "ui-state-disabled", !!e) },
        _value: function() { var e = this.options.value; return this._trimAlignValue(e) },
        _values: function(e) { var t, i; if (arguments.length) return e = this.options.values[e], this._trimAlignValue(e); if (this._hasMultipleValues()) { for (t = this.options.values.slice(), i = 0; i < t.length; i += 1) t[i] = this._trimAlignValue(t[i]); return t } return [] },
        _trimAlignValue: function(e) {
            if (e <= this._valueMin()) return this._valueMin();
            if (e >= this._valueMax()) return this._valueMax();
            var t = 0 < this.options.step ? this.options.step : 1,
                i = (e - this._valueMin()) % t,
                e = e - i;
            return 2 * Math.abs(i) >= t && (e += 0 < i ? t : -t), parseFloat(e.toFixed(5))
        },
        _calculateNewMax: function() {
            var e = this.options.max,
                t = this._valueMin(),
                i = this.options.step;
            (e = Math.round((e - t) / i) * i + t) > this.options.max && (e -= i), this.max = parseFloat(e.toFixed(this._precision()))
        },
        _precision: function() { var e = this._precisionOf(this.options.step); return e = null !== this.options.min ? Math.max(e, this._precisionOf(this.options.min)) : e },
        _precisionOf: function(e) {
            var e = e.toString(),
                t = e.indexOf(".");
            return -1 === t ? 0 : e.length - t - 1
        },
        _valueMin: function() { return this.options.min },
        _valueMax: function() { return this.max },
        _refreshRange: function(e) { "vertical" === e && this.range.css({ width: "", left: "" }), "horizontal" === e && this.range.css({ height: "", bottom: "" }) },
        _refreshValue: function() {
            var t, i, e, s, a, n = this.options.range,
                h = this.options,
                l = this,
                r = !this._animateOff && h.animate,
                u = {};
            this._hasMultipleValues() ? this.handles.each(function(e) { i = (l.values(e) - l._valueMin()) / (l._valueMax() - l._valueMin()) * 100, u["horizontal" === l.orientation ? "left" : "bottom"] = i + "%", o(this).stop(1, 1)[r ? "animate" : "css"](u, h.animate), !0 === l.options.range && ("horizontal" === l.orientation ? (0 === e && l.range.stop(1, 1)[r ? "animate" : "css"]({ left: i + "%" }, h.animate), 1 === e && l.range[r ? "animate" : "css"]({ width: i - t + "%" }, { queue: !1, duration: h.animate })) : (0 === e && l.range.stop(1, 1)[r ? "animate" : "css"]({ bottom: i + "%" }, h.animate), 1 === e && l.range[r ? "animate" : "css"]({ height: i - t + "%" }, { queue: !1, duration: h.animate }))), t = i }) : (e = this.value(), s = this._valueMin(), a = this._valueMax(), i = a !== s ? (e - s) / (a - s) * 100 : 0, u["horizontal" === this.orientation ? "left" : "bottom"] = i + "%", this.handle.stop(1, 1)[r ? "animate" : "css"](u, h.animate), "min" === n && "horizontal" === this.orientation && this.range.stop(1, 1)[r ? "animate" : "css"]({ width: i + "%" }, h.animate), "max" === n && "horizontal" === this.orientation && this.range.stop(1, 1)[r ? "animate" : "css"]({ width: 100 - i + "%" }, h.animate), "min" === n && "vertical" === this.orientation && this.range.stop(1, 1)[r ? "animate" : "css"]({ height: i + "%" }, h.animate), "max" === n && "vertical" === this.orientation && this.range.stop(1, 1)[r ? "animate" : "css"]({ height: 100 - i + "%" }, h.animate))
        },
        _handleEvents: {
            keydown: function(e) {
                var t, i, s, a = o(e.target).data("ui-slider-handle-index");
                switch (e.keyCode) {
                    case o.ui.keyCode.HOME:
                    case o.ui.keyCode.END:
                    case o.ui.keyCode.PAGE_UP:
                    case o.ui.keyCode.PAGE_DOWN:
                    case o.ui.keyCode.UP:
                    case o.ui.keyCode.RIGHT:
                    case o.ui.keyCode.DOWN:
                    case o.ui.keyCode.LEFT:
                        if (e.preventDefault(), this._keySliding || (this._keySliding = !0, this._addClass(o(e.target), null, "ui-state-active"), !1 !== this._start(e, a))) break;
                        return
                }
                switch (s = this.options.step, t = i = this._hasMultipleValues() ? this.values(a) : this.value(), e.keyCode) {
                    case o.ui.keyCode.HOME:
                        i = this._valueMin();
                        break;
                    case o.ui.keyCode.END:
                        i = this._valueMax();
                        break;
                    case o.ui.keyCode.PAGE_UP:
                        i = this._trimAlignValue(t + (this._valueMax() - this._valueMin()) / this.numPages);
                        break;
                    case o.ui.keyCode.PAGE_DOWN:
                        i = this._trimAlignValue(t - (this._valueMax() - this._valueMin()) / this.numPages);
                        break;
                    case o.ui.keyCode.UP:
                    case o.ui.keyCode.RIGHT:
                        if (t === this._valueMax()) return;
                        i = this._trimAlignValue(t + s);
                        break;
                    case o.ui.keyCode.DOWN:
                    case o.ui.keyCode.LEFT:
                        if (t === this._valueMin()) return;
                        i = this._trimAlignValue(t - s)
                }
                this._slide(e, a, i)
            },
            keyup: function(e) {
                var t = o(e.target).data("ui-slider-handle-index");
                this._keySliding && (this._keySliding = !1, this._stop(e, t), this._change(e, t), this._removeClass(o(e.target), null, "ui-state-active"))
            }
        }
    })
});;
/*!
 * jQuery UI Touch Punch 0.2.3
 *
 * Copyright 2011â€“2014, Dave Furfero
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Depends:
 *  jquery.ui.widget.js
 *  jquery.ui.mouse.js
 */
! function(t) {
    var o, e, u, n;

    function c(o, t) {
        var e, u;
        1 < o.originalEvent.touches.length || (o.preventDefault(), e = o.originalEvent.changedTouches[0], (u = document.createEvent("MouseEvents")).initMouseEvent(t, !0, !0, window, 1, e.screenX, e.screenY, e.clientX, e.clientY, !1, !1, !1, !1, 0, null), o.target.dispatchEvent(u))
    }
    t.support.touch = "ontouchend" in document, t.support.touch && (o = t.ui.mouse.prototype, e = o._mouseInit, u = o._mouseDestroy, o._touchStart = function(o) {!n && this._mouseCapture(o.originalEvent.changedTouches[0]) && (n = !0, this._touchMoved = !1, c(o, "mouseover"), c(o, "mousemove"), c(o, "mousedown")) }, o._touchMove = function(o) { n && (this._touchMoved = !0, c(o, "mousemove")) }, o._touchEnd = function(o) { n && (c(o, "mouseup"), c(o, "mouseout"), this._touchMoved || c(o, "click"), n = !1) }, o._mouseInit = function() {
        var o = this;
        o.element.on({ touchstart: t.proxy(o, "_touchStart"), touchmove: t.proxy(o, "_touchMove"), touchend: t.proxy(o, "_touchEnd") }), e.call(o)
    }, o._mouseDestroy = function() {
        var o = this;
        o.element.off({ touchstart: t.proxy(o, "_touchStart"), touchmove: t.proxy(o, "_touchMove"), touchend: t.proxy(o, "_touchEnd") }), u.call(o)
    })
}(jQuery);;
"use strict";
jQuery(function($) {
    if (typeof woocommerce_price_slider_params === 'undefined') { return false; }
    $(document.body).on('price_slider_create price_slider_slide', function(event, min, max) {
        min = woocs_convert_price_slider(min);
        max = woocs_convert_price_slider(max);
        var woocs_format = "%v %s";
        if (woocs_current_currency.position === 'left') { woocs_format = "%s%v"; } else if (woocs_current_currency.position === 'left_space') { woocs_format = "%s %v"; } else if (woocs_current_currency.position === 'right') { woocs_format = "%v%s"; } else if (woocs_current_currency.position === 'right_space') { woocs_format = "%v %s"; }
        woocommerce_price_slider_params.currency_format_symbol = woocs_current_currency.symbol;
        woocommerce_price_slider_params.currency_format_num_decimals = woocs_current_currency.decimals;
        $('.price_slider_amount span.from').html(accounting.formatMoney(min, { symbol: woocommerce_price_slider_params.currency_format_symbol, decimal: woocommerce_price_slider_params.currency_format_decimal_sep, thousand: woocommerce_price_slider_params.currency_format_thousand_sep, precision: woocommerce_price_slider_params.currency_format_num_decimals, format: woocs_format }));
        $('.price_slider_amount span.to').html(accounting.formatMoney(max, { symbol: woocommerce_price_slider_params.currency_format_symbol, decimal: woocommerce_price_slider_params.currency_format_decimal_sep, thousand: woocommerce_price_slider_params.currency_format_thousand_sep, precision: woocommerce_price_slider_params.currency_format_num_decimals, format: woocs_format }));
        $(document.body).trigger('price_slider_updated', [min, max]);
    });

    function init_price_filter() {
        $('input#min_price, input#max_price').hide();
        $('.price_slider, .price_label').show();
        var min_price = $('.price_slider_amount #min_price').data('min'),
            max_price = $('.price_slider_amount #max_price').data('max'),
            current_min_price = $('.price_slider_amount #min_price').val(),
            current_max_price = $('.price_slider_amount #max_price').val();
        $('.price_slider:not(.ui-slider)').slider({
            range: true,
            animate: true,
            min: min_price,
            max: max_price,
            values: [current_min_price, current_max_price],
            create: function() {
                $('.price_slider_amount #min_price').val(current_min_price);
                $('.price_slider_amount #max_price').val(current_max_price);
                $(document.body).trigger('price_slider_create', [current_min_price, current_max_price]);
            },
            slide: function(event, ui) {
                $('input#min_price').val(ui.values[0]);
                $('input#max_price').val(ui.values[1]);
                $(document.body).trigger('price_slider_slide', [woocs_convert_price_slider(ui.values[0]), woocs_convert_price_slider(ui.values[1])]);
            },
            change: function(event, ui) { $(document.body).trigger('price_slider_change', [ui.values[0], ui.values[1]]); }
        });
    }
    init_price_filter();
    var hasSelectiveRefresh = ('undefined' !== typeof wp && wp.customize && wp.customize.selectiveRefresh && wp.customize.widgetsPreview && wp.customize.widgetsPreview.WidgetPartial);
    if (hasSelectiveRefresh) { wp.customize.selectiveRefresh.bind('partial-content-rendered', function() { init_price_filter(); }); }
});

function woocs_convert_price_slider(price) {
    var label = price;
    if (woocs_current_currency.rate !== 1) { label = Math.ceil(label * parseFloat(woocs_current_currency.rate)); }
    return label;
};
"use strict";

(function(a) {
    function g(a, b) {
        var c = a.data("ddslick");
        var d = a.find(".dd-selected"),
            e = d.siblings(".dd-selected-value"),
            f = a.find(".dd-options"),
            g = d.siblings(".dd-pointer"),
            h = a.find(".dd-option").eq(b),
            k = h.closest("li"),
            l = c.settings,
            m = c.settings.data[b];
        a.find(".dd-option").removeClass("dd-option-selected");
        h.addClass("dd-option-selected");
        c.selectedIndex = b;
        c.selectedItem = k;
        c.selectedData = m;
        if (l.showSelectedHTML) { d.html((m.imageSrc ? '<img class="dd-selected-image' + (l.imagePosition == "right" ? " dd-image-right" : "") + '" src="' + m.imageSrc + '" />' : "") + (m.text ? '<label class="dd-selected-text">' + m.text + "</label>" : "") + (m.description ? '<small class="dd-selected-description dd-desc' + (l.truncateDescription ? " dd-selected-description-truncated" : "") + '" >' + m.description + "</small>" : "")) } else d.html(m.text);
        e.val(m.value);
        c.original.val(m.value);
        a.data("ddslick", c);
        i(a);
        j(a);
        if (typeof l.onSelected == "function") { l.onSelected.call(this, c) }
    }

    function h(b) {
        var c = b.find(".dd-select"),
            d = c.siblings(".dd-options"),
            e = c.find(".dd-pointer"),
            f = d.is(":visible");
        a(".dd-click-off-close").not(d).slideUp(50);
        a(".dd-pointer").removeClass("dd-pointer-up");
        if (f) {
            d.slideUp("fast");
            e.removeClass("dd-pointer-up")
        } else {
            d.slideDown("fast");
            e.addClass("dd-pointer-up")
        }
        k(b)
    }

    function i(a) {
        a.find(".dd-options").slideUp(50);
        a.find(".dd-pointer").removeClass("dd-pointer-up").removeClass("dd-pointer-up")
    }

    function j(a) { var b = a.find(".dd-select").css("height"); var c = a.find(".dd-selected-description"); var d = a.find(".dd-selected-image"); if (c.length <= 0 && d.length > 0) { a.find(".dd-selected-text").css("lineHeight", b) } }

    function k(b) { b.find(".dd-option").each(function() { var c = a(this); var d = c.css("height"); var e = c.find(".dd-option-description"); var f = b.find(".dd-option-image"); if (e.length <= 0 && f.length > 0) { c.find(".dd-option-text").css("lineHeight", d) } }) }
    a.fn.ddslick = function(c) { if (b[c]) { return b[c].apply(this, Array.prototype.slice.call(arguments, 1)) } else if (typeof c === "object" || !c) { return b.init.apply(this, arguments) } else {} };
    var b = {},
        c = { data: [], keepJSONItemsOnTop: false, width: 260, height: null, background: "#eee", selectText: "", defaultSelectedIndex: null, truncateDescription: true, imagePosition: "left", showSelectedHTML: true, clickOffToClose: true, onSelected: function() {} },
        d = '<div class="dd-select"><input class="dd-selected-value" type="hidden" /><a class="dd-selected"></a><span class="dd-pointer dd-pointer-down"></span></div>',
        e = '<ul class="dd-options"></ul>',
        f = '<style id="css-ddslick" type="text/css">' + ".dd-select{ border-radius:2px; border:solid 1px #ccc; position:relative; cursor:pointer;}" + ".dd-desc { color:#aaa; display:block; overflow: hidden; font-weight:normal; line-height: 1.4em; }" + ".dd-selected{ overflow:hidden; display:block; padding:10px; font-weight:bold;}" + ".dd-pointer{ width:0; height:0; position:absolute; right:10px; top:50%; margin-top:-3px;}" + ".dd-pointer-down{ border:solid 5px transparent; border-top:solid 5px #000; }" + ".dd-pointer-up{border:solid 5px transparent !important; border-bottom:solid 5px #000 !important; margin-top:-8px;}" + ".dd-options{ border:solid 1px #ccc; border-top:none; list-style:none; box-shadow:0px 1px 5px #ddd; display:none; position:absolute; z-index:2000; margin:0; padding:0;background:#fff; overflow:auto;}" + ".dd-option{ padding:10px; display:block; border-bottom:solid 1px #ddd; overflow:hidden; text-decoration:none; color:#333; cursor:pointer;-webkit-transition: all 0.25s ease-in-out; -moz-transition: all 0.25s ease-in-out;-o-transition: all 0.25s ease-in-out;-ms-transition: all 0.25s ease-in-out; }" + ".dd-options > li:last-child > .dd-option{ border-bottom:none;}" + ".dd-option:hover{ background:#f3f3f3; color:#000;}" + ".dd-selected-description-truncated { text-overflow: ellipsis; white-space:nowrap; }" + ".dd-option-selected { background:#f6f6f6; }" + ".dd-option-image, .dd-selected-image { vertical-align:middle; float:left; margin-right:5px; max-width:64px;}" + ".dd-image-right { float:right; margin-right:15px; margin-left:5px;}" + ".dd-container{ position:relative;}â€‹ .dd-selected-text { font-weight:bold}â€‹</style>";
    if (a("#css-ddslick").length <= 0) { a(f).appendTo("head") }
    b.init = function(b) {
        var b = a.extend({}, c, b);
        return this.each(function() {
            var c = a(this),
                f = c.data("ddslick");
            if (!f) {
                var i = [],
                    j = b.data;
                c.find("option").each(function() {
                    var b = a(this),
                        c = b.data();
                    i.push({ text: b.text().trim(), value: b.val(), selected: b.is(":selected"), description: c.description, imageSrc: c.imagesrc })
                });
                if (b.keepJSONItemsOnTop) a.merge(b.data, i);
                else b.data = a.merge(i, b.data);
                var k = c,
                    l = a('<div id="' + c.attr("id") + '"></div>');
                c.replaceWith(l);
                c = l;
                c.addClass("dd-container").append(d).append(e);
                var i = c.find(".dd-select"),
                    m = c.find(".dd-options");
                m.css({ width: b.width });
                i.css({ width: b.width, background: b.background });
                c.css({ width: b.width });
                if (b.height != null) m.css({ height: b.height, overflow: "auto" });
                a.each(b.data, function(a, c) {
                    if (c.selected) b.defaultSelectedIndex = a;
                    m.append("<li>" + '<a class="dd-option">' + (c.value ? ' <input class="dd-option-value" type="hidden" value="' + c.value + '" />' : "") + (c.imageSrc ? ' <img class="dd-option-image' + (b.imagePosition == "right" ? " dd-image-right" : "") + '" src="' + c.imageSrc + '" />' : "") + (c.text ? ' <label class="dd-option-text">' + c.text + "</label>" : "") + (c.description ? ' <small class="dd-option-description dd-desc">' + c.description + "</small>" : "") + "</a>" + "</li>")
                });
                var n = { settings: b, original: k, selectedIndex: -1, selectedItem: null, selectedData: null };
                c.data("ddslick", n);
                if (b.selectText.length > 0 && b.defaultSelectedIndex == null) { c.find(".dd-selected").html(b.selectText) } else {
                    var o = b.defaultSelectedIndex != null && b.defaultSelectedIndex >= 0 && b.defaultSelectedIndex < b.data.length ? b.defaultSelectedIndex : 0;
                    g(c, o)
                }
                c.find(".dd-select").on("click.ddslick", function() { h(c) });
                c.find(".dd-option").on("click.ddslick", function() { g(c, a(this).closest("li").index()) });
                if (b.clickOffToClose) {
                    m.addClass("dd-click-off-close");
                    c.on("click.ddslick", function(a) { a.stopPropagation() });
                    a("body").on("click", function() { a(".dd-click-off-close").slideUp(50).siblings(".dd-select").find(".dd-pointer").removeClass("dd-pointer-up") })
                }
            }
        })
    };
    b.select = function(b) { return this.each(function() { if (b.index) g(a(this), b.index) }) };
    b.open = function() {
        return this.each(function() {
            var b = a(this),
                c = b.data("ddslick");
            if (c) h(b)
        })
    };
    b.close = function() {
        return this.each(function() {
            var b = a(this),
                c = b.data("ddslick");
            if (c) i(b)
        })
    };
    b.destroy = function() {
        return this.each(function() {
            var b = a(this),
                c = b.data("ddslick");
            if (c) {
                var d = c.original;
                b.removeData("ddslick").unbind(".ddslick").replaceWith(d)
            }
        })
    }
})(jQuery);
"use strict";
var woocs_loading_first_time = true;
var woocs_sumbit_currency_changing = true;
jQuery(function($) {
    if (typeof woocs_array_of_get === 'undefined') { return; }
    woocs_array_of_get = JSON.parse(woocs_array_of_get);
    if (Object.keys(woocs_array_of_get).length !== 0) {
        if ('currency' in woocs_array_of_get) {
            $('body.woocommerce-cart .shop_table.cart').closest('form').find('input[name="update_cart"]').prop('disabled', false);
            $('body.woocommerce-cart .shop_table.cart').closest('form').find('input[name="update_cart"]').trigger('click');
        }
    }
    if (Object.keys(woocs_array_of_get).length == 0) { woocs_array_of_get = {}; }
    woocs_array_no_cents = JSON.parse(woocs_array_no_cents);
    if (!parseInt(woocs_get_cookie('woocommerce_items_in_cart'), 10)) {
        $('.widget_shopping_cart_content').empty();
        $(document.body).trigger('wc_fragment_refresh');
    }
    if (woocs_array_of_get.currency != undefined || woocs_array_of_get.removed_item != undefined || woocs_array_of_get.key != undefined) { woocs_refresh_mini_cart(555); }
    if (woocs_redraw_cart) { jQuery(document).on("adding_to_cart", function() { woocs_refresh_mini_cart(999); }); }
    jQuery('body').on('click', '.woocs_price_info', function() { return false; });
    if (woocs_drop_down_view == 'chosen' || woocs_drop_down_view == 'chosen_dark') {
        try {
            if (jQuery("select.woocommerce-currency-switcher").length) {
                jQuery("select.woocommerce-currency-switcher").chosen({ disable_search_threshold: 10 });
                jQuery.each(jQuery('.woocommerce-currency-switcher-form .chosen-container'), function(index, obj) { jQuery(obj).css({ 'width': jQuery(this).prev('select').data('width') }); });
            }
        } catch (e) { console.log(e); }
    }
    if (woocs_drop_down_view == 'ddslick') { try { woocs_init_ddslick_select(); } catch (e) { console.log(e); } }
    woocs_loading_first_time = false;
    if (woocs_drop_down_view == 'wselect' && woocs_is_mobile != 1) { try { jQuery('select.woocommerce-currency-switcher').wSelect({ size: 7 }); } catch (e) { console.log(e); } }
    jQuery('.woocs_flag_view_item').on("click", function() {
        if (woocs_sumbit_currency_changing) {
            if (jQuery(this).hasClass('woocs_flag_view_item_current')) { return false; }
            if (Object.keys(woocs_array_of_get).length == 0) { window.location = window.location.href + '?currency=' + jQuery(this).data('currency'); } else { woocs_redirect(jQuery(this).data('currency')); }
        }
        return false;
    });
    if (jQuery('.woocs_converter_shortcode').length) {
        jQuery('.woocs_converter_shortcode_button').on("click", function() {
            var amount = jQuery(this).parent('.woocs_converter_shortcode').find('.woocs_converter_shortcode_amount').eq(0).val();
            var from = jQuery(this).parent('.woocs_converter_shortcode').find('.woocs_converter_shortcode_from').eq(0).val();
            var to = jQuery(this).parent('.woocs_converter_shortcode').find('.woocs_converter_shortcode_to').eq(0).val();
            var precision = jQuery(this).parent('.woocs_converter_shortcode').find('.woocs_converter_shortcode_precision').eq(0).val();
            var results_obj = jQuery(this).parent('.woocs_converter_shortcode').find('.woocs_converter_shortcode_results').eq(0);
            jQuery(results_obj).val(woocs_lang_loading + ' ...');
            var data = { action: "woocs_convert_currency", amount: amount, from: from, to: to, precision: precision };
            jQuery.post(woocs_ajaxurl, data, function(value) { jQuery(results_obj).val(value); });
            return false;
        });
    }
    if (jQuery('.woocs_rates_shortcode').length) {
        jQuery('body').on('change', '.woocs_rates_current_currency', function() {
            var _this = this;
            var data = { action: "woocs_rates_current_currency", current_currency: jQuery(this).val(), precision: jQuery(this).data('precision'), exclude: jQuery(this).data('exclude') };
            jQuery.post(woocs_ajaxurl, data, function(html) { jQuery(_this).parent('.woocs_rates_shortcode').html(html); });
            return false;
        });
    }
    if (typeof woocs_shop_is_cached !== 'undefined') {
        if (woocs_shop_is_cached) {
            setTimeout(function() {
                woocs_sumbit_currency_changing = false;
                if (typeof woocs_array_of_get.currency === 'undefined') {
                    if (jQuery('body').hasClass('single')) { jQuery('.woocs_price_info').remove(); }
                    var custom_prices = [];
                    jQuery.each(jQuery('.woocs_amount_custom_price'), function(index, item) { custom_prices.push(jQuery(item).data('value')); });
                    if (custom_prices.length != 0) {
                        var data = { action: "woocs_get_custom_price_html", custom_prices: custom_prices };
                        jQuery.post(woocs_ajaxurl, data, function(data) { data = JSON.parse(data); if (!jQuery.isEmptyObject(data)) { jQuery.each(data, function(val, price) { jQuery(".woocs_amount_custom_price[data-value='" + val + "']").replaceWith(price); }); } });
                    }
                    var variation_ids = [];
                    var var_data = jQuery("form.variations_form").data("product_variations");
                    if (typeof var_data != "undefined") {
                        jQuery.each(var_data, function(indx, attr) { variation_ids.push(attr['variation_id']); });
                        if (variation_ids.length != 0) {
                            var data_var = { action: "woocs_get_variation_products_price_html", var_products_ids: variation_ids };
                            jQuery.post(woocs_ajaxurl, data_var, function(data) {
                                data = JSON.parse(data);
                                if (!jQuery.isEmptyObject(data)) {
                                    jQuery.each(var_data, function(indx, attr) { if (typeof data[attr['variation_id']] != "undefined") { var_data[indx]['price_html'] = data[attr['variation_id']]; } });
                                    jQuery("form.variations_form").data("product_variations", var_data);
                                }
                            });
                        }
                    }
                    var products_ids = [];
                    jQuery.each(jQuery('.woocs_price_code'), function(index, item) { products_ids.push(jQuery(item).data('product-id')); });
                    if (products_ids.length === 0) { woocs_sumbit_currency_changing = true; return; }
                    var data = { action: "woocs_get_products_price_html", products_ids: products_ids, };
                    jQuery.post(woocs_ajaxurl, data, function(data) {
                        data = JSON.parse(data);
                        if (!jQuery.isEmptyObject(data)) {
                            jQuery('.woocs_price_info').remove();
                            jQuery('.woocs_price_approx.woocs_cart_item_price').remove();
                            jQuery.each(jQuery('.woocs_price_code'), function(index, item) { if (data.ids[jQuery(item).data('product-id')] != undefined) { jQuery(item).replaceWith(data.ids[jQuery(item).data('product-id')]); } });
                            jQuery('.woocs_price_code').removeClass('woocs_preloader_ajax');
                            jQuery('.woocommerce-currency-switcher').val(data.current_currency);
                            if (woocs_drop_down_view == 'chosen' || woocs_drop_down_view == 'chosen_dark') {
                                try {
                                    if (jQuery("select.woocommerce-currency-switcher").length) {
                                        jQuery("select.woocommerce-currency-switcher").chosen({ disable_search_threshold: 10 });
                                        jQuery('select.woocommerce-currency-switcher').trigger("chosen:updated");
                                    }
                                } catch (e) { console.log(e); }
                            }
                            if (typeof data.currency_data != "undefined") {
                                woocs_current_currency = data.currency_data;
                                var min = jQuery('.price_slider_amount #min_price').val();
                                var max = jQuery('.price_slider_amount #max_price').val();
                                if (typeof max != 'undefined' && typeof min != 'undefined') {
                                    max = woocs_convert_price_slider(max);
                                    min = woocs_convert_price_slider(min);
                                    jQuery(document.body).trigger('price_slider_create', [min, max]);
                                }
                            }
                            if (woocs_drop_down_view == 'ddslick') {
                                try {
                                    jQuery('div.dd-container').ddslick('destroy');
                                    jQuery('select.woocommerce-currency-switcher').val(data.current_currency);
                                    woocs_init_ddslick_select();
                                } catch (e) { console.log(e); }
                            }
                            if (woocs_drop_down_view == 'wselect' && woocs_is_mobile != 1) { try { jQuery('select.woocommerce-currency-switcher').val(data.current_currency).change(); } catch (e) { console.log(e); } }
                            var auto_switcher = jQuery('.woocs_auto_switcher');
                            if (auto_switcher.length > 0) { woocs_auto_switcher_redraw(data.current_currency, auto_switcher); }
                            woocs_sumbit_currency_changing = true;
                            var shortcode_currency = jQuery('strong.woocs_current_currency_code');
                            if (shortcode_currency.length) { shortcode_currency.text(data.current_currency); }
                            document.dispatchEvent(new CustomEvent('after_woocs_get_products_price_html', { detail: { current_currency: data.current_currency } }));
                        }
                    });
                } else {
                    woocs_sumbit_currency_changing = true;
                    jQuery('.woocs_price_code').removeClass('woocs_preloader_ajax');
                }
            }, 300);
        }
    }
    setTimeout(function() {}, 300);
});

function woocs_redirect(currency) {
    if (!woocs_sumbit_currency_changing) { return; }
    var l = window.location.href;
    var l_tmp = l.split('#');
    l = l_tmp[0];
    var id_key = "";
    if (l_tmp.length > 1) { id_key = "#" + l_tmp[1] }
    l = l.split('?');
    l = l[0];
    var string_of_get = '?';
    woocs_array_of_get.currency = currency;
    if (woocs_special_ajax_mode) {
        string_of_get = "";
        var data = { action: "woocs_set_currency_ajax", currency: currency };
        jQuery.post(woocs_ajaxurl, data, function(value) { location.reload(); });
    } else {
        if (Object.keys(woocs_array_of_get).length > 0) { jQuery.each(woocs_array_of_get, function(index, value) { string_of_get = string_of_get + "&" + index + "=" + value; }); }
        window.location = l + string_of_get + id_key;
    }
}

function woocs_refresh_mini_cart(delay) {
    setTimeout(function() {
        try {
            $fragment_refresh = {
                url: wc_cart_fragments_params.ajax_url,
                type: 'POST',
                data: { action: 'woocommerce_get_refreshed_fragments', woocs_woocommerce_before_mini_cart: 'mini_cart_refreshing' },
                success: function(data) {
                    if (data && data.fragments) {
                        jQuery.each(data.fragments, function(key, value) { jQuery(key).replaceWith(value); });
                        try {
                            if ($supports_html5_storage) {
                                sessionStorage.setItem(wc_cart_fragments_params.fragment_name, JSON.stringify(data.fragments));
                                sessionStorage.setItem('wc_cart_hash', data.cart_hash);
                            }
                        } catch (e) {}
                        jQuery('body').trigger('wc_fragments_refreshed');
                    }
                }
            };
            jQuery.ajax($fragment_refresh);
            try {
                if (woocs_get_cookie('woocommerce_items_in_cart') > 0) { jQuery('.hide_cart_widget_if_empty').closest('.widget_shopping_cart').show(); } else { jQuery('.hide_cart_widget_if_empty').closest('.widget_shopping_cart').hide(); }
            } catch (e) {}
            jQuery('body').on('adding_to_cart', function() { jQuery('.hide_cart_widget_if_empty').closest('.widget_shopping_cart').show(); });
        } catch (e) {}
    }, delay);
}

function woocs_get_cookie(name) { var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)")); return matches ? decodeURIComponent(matches[1]) : undefined; }
jQuery(function() {
    jQuery('.woocs_auto_switcher_link').on('click', function() { woocs_redirect(jQuery(this).data('currency')); return false; });
    jQuery('.woocs_auto_switcher li').on('click', function(e) { woocs_redirect(jQuery(this).find('a.woocs_auto_switcher_link').data('currency')); return false; });
});

function woocs_auto_switcher_redraw(curr_curr, switcher) {
    var view = switcher.data('view');
    switch (view) {
        case 'classic_blocks':
            switcher.find('a').removeClass('woocs_curr_curr');
            switcher.find('a[data-currency="' + curr_curr + '"]').addClass('woocs_curr_curr');
            break;
        case 'roll_blocks':
            switcher.find('a').removeClass('woocs_curr_curr');
            switcher.find('li').removeClass('woocs_auto_bg_woocs_curr_curr');
            var current_link = switcher.find('a[data-currency="' + curr_curr + '"]');
            current_link.addClass('woocs_curr_curr');
            current_link.parents('li').addClass('woocs_auto_bg_woocs_curr_curr');
            break;
        case 'round_select':
            switcher.find('a').removeClass('woocs_curr_curr');
            var current_link = switcher.find('a[data-currency="' + curr_curr + '"]');
            current_link.addClass('woocs_curr_curr');
            jQuery('.woocs_current_text').html(current_link.find('.woocs_base_text').html());
            break;
        default:
            break;
    }
}

function woocs_remove_link_param(key, sourceURL) {
    var rtn = sourceURL.split("?")[0],
        param, params_arr = [],
        queryString = (sourceURL.indexOf("?") !== -1) ? sourceURL.split("?")[1] : "";
    if (queryString !== "") {
        params_arr = queryString.split("&");
        for (var i = params_arr.length - 1; i >= 0; i -= 1) { param = params_arr[i].split("=")[0]; if (param === key) { params_arr.splice(i, 1); } }
        rtn = rtn + "?" + params_arr.join("&");
    }
    return rtn;
}

function woocs_init_ddslick_select() {
    jQuery.each(jQuery('select.woocommerce-currency-switcher'), function(index, obj) {
        var width = jQuery(obj).data('width');
        var flag_position = jQuery(obj).data('flag-position');
        jQuery(obj).ddslick({
            width: width,
            imagePosition: flag_position,
            selectText: "Select currency",
            onSelected: function(data) {
                if (!woocs_loading_first_time) {
                    var form = jQuery(data.selectedItem).closest('form.woocommerce-currency-switcher-form');
                    jQuery(form).find('input[name="woocommerce-currency-switcher"]').eq(0).val(data.selectedData.value);
                    if (Object.keys(woocs_array_of_get).length == 0) { woocs_redirect(data.selectedData.value); } else { woocs_redirect(data.selectedData.value); }
                }
            }
        });
    });
};
/*!
 * WPBakery Page Builder v6.0.0 (https://wpbakery.com)
 * Copyright 2011-2020 Michael M, WPBakery
 * License: Commercial. More details: http://go.wpbakery.com/licensing
 */

// jscs:disable
// jshint ignore: start

document.documentElement.className += " js_active ", document.documentElement.className += "ontouchstart" in document.documentElement ? " vc_mobile " : " vc_desktop ",
    function() { for (var prefix = ["-webkit-", "-moz-", "-ms-", "-o-", ""], i = 0; i < prefix.length; i++) prefix[i] + "transform" in document.documentElement.style && (document.documentElement.className += " vc_transform ") }(),
    function($) {
        "function" != typeof window.vc_js && (window.vc_js = function() {
            "use strict";
            vc_toggleBehaviour(), vc_tabsBehaviour(), vc_accordionBehaviour(), vc_teaserGrid(), vc_carouselBehaviour(), vc_slidersBehaviour(), vc_prettyPhoto(), vc_pinterest(), vc_progress_bar(), vc_plugin_flexslider(), vc_gridBehaviour(), vc_rowBehaviour(), vc_prepareHoverBox(), vc_googleMapsPointer(), vc_ttaActivation(), jQuery(document).trigger("vc_js"), window.setTimeout(vc_waypoints, 500)
        }), "function" != typeof window.vc_plugin_flexslider && (window.vc_plugin_flexslider = function($parent) {
            ($parent ? $parent.find(".wpb_flexslider") : jQuery(".wpb_flexslider")).each(function() {
                var this_element = jQuery(this),
                    sliderTimeout = 1e3 * parseInt(this_element.attr("data-interval"), 10),
                    sliderFx = this_element.attr("data-flex_fx"),
                    slideshow = 0 == sliderTimeout ? !1 : !0;
                this_element.is(":visible") && this_element.flexslider({ animation: sliderFx, slideshow: slideshow, slideshowSpeed: sliderTimeout, sliderSpeed: 800, smoothHeight: !0 })
            })
        }), "function" != typeof window.vc_googleplus && (window.vc_googleplus = function() {
            0 < jQuery(".wpb_googleplus").length && function() {
                var po = document.createElement("script");
                po.type = "text/javascript", po.async = !0, po.src = "https://apis.google.com/js/plusone.js";
                var s = document.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(po, s)
            }()
        }), "function" != typeof window.vc_pinterest && (window.vc_pinterest = function() {
            0 < jQuery(".wpb_pinterest").length && function() {
                var po = document.createElement("script");
                po.type = "text/javascript", po.async = !0, po.src = "https://assets.pinterest.com/js/pinit.js";
                var s = document.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(po, s)
            }()
        }), "function" != typeof window.vc_progress_bar && (window.vc_progress_bar = function() {
            void 0 !== jQuery.fn.vcwaypoint && jQuery(".vc_progress_bar").each(function() {
                var $el = jQuery(this);
                $el.vcwaypoint(function() {
                    $el.find(".vc_single_bar").each(function(index) {
                        var bar = jQuery(this).find(".vc_bar"),
                            val = bar.data("percentage-value");
                        setTimeout(function() { bar.css({ width: val + "%" }) }, 200 * index)
                    })
                }, { offset: "85%" })
            })
        }), "function" != typeof window.vc_waypoints && (window.vc_waypoints = function() {
            void 0 !== jQuery.fn.vcwaypoint && jQuery(".wpb_animate_when_almost_visible:not(.wpb_start_animation)").each(function() {
                var $el = jQuery(this);
                $el.vcwaypoint(function() { $el.addClass("wpb_start_animation animated") }, { offset: "85%" })
            })
        }), "function" != typeof window.vc_toggleBehaviour && (window.vc_toggleBehaviour = function($el) {
            function event(content) {
                content && content.preventDefault && content.preventDefault();
                var element = jQuery(this).closest(".vc_toggle"),
                    content = element.find(".vc_toggle_content");
                element.hasClass("vc_toggle_active") ? content.slideUp({ duration: 300, complete: function() { element.removeClass("vc_toggle_active") } }) : content.slideDown({ duration: 300, complete: function() { element.addClass("vc_toggle_active") } })
            }($el ? $el.hasClass("vc_toggle_title") ? $el.unbind("click") : $el.find(".vc_toggle_title").off("click") : jQuery(".vc_toggle_title").off("click")).on("click", event)
        }), "function" != typeof window.vc_tabsBehaviour && (window.vc_tabsBehaviour = function(ver) {
            var $call, old_version;
            jQuery.ui && ($call = ver || jQuery(".wpb_tabs, .wpb_tour"), ver = jQuery.ui && jQuery.ui.version ? jQuery.ui.version.split(".") : "1.10", old_version = 1 === parseInt(ver[0], 10) && parseInt(ver[1], 10) < 9, $call.each(function(index) {
                var interval = jQuery(this).attr("data-interval"),
                    tabs_array = [],
                    $tabs = jQuery(this).find(".wpb_tour_tabs_wrapper").tabs({ show: function(event, ui) { wpb_prepare_tab_content(event, ui) }, activate: function(event, ui) { wpb_prepare_tab_content(event, ui) } });
                if (interval && 0 < interval) try { $tabs.tabs("rotate", 1e3 * interval) } catch (err) { window.console && window.console.warn && console.warn("tabs behaviours error", err) }
                jQuery(this).find(".wpb_tab").each(function() { tabs_array.push(this.id) }), jQuery(this).find(".wpb_tabs_nav li").on("click", function(e) { return e && e.preventDefault && e.preventDefault(), old_version ? $tabs.tabs("select", jQuery("a", this).attr("href")) : $tabs.tabs("option", "active", jQuery(this).index()), !1 }), jQuery(this).find(".wpb_prev_slide a, .wpb_next_slide a").on("click", function(length) {
                    var index;
                    length && length.preventDefault && length.preventDefault(), old_version ? (index = $tabs.tabs("option", "selected"), jQuery(this).parent().hasClass("wpb_next_slide") ? index++ : index--, index < 0 ? index = $tabs.tabs("length") - 1 : index >= $tabs.tabs("length") && (index = 0), $tabs.tabs("select", index)) : (index = $tabs.tabs("option", "active"), length = $tabs.find(".wpb_tab").length, index = jQuery(this).parent().hasClass("wpb_next_slide") ? length <= index + 1 ? 0 : index + 1 : index - 1 < 0 ? length - 1 : index - 1, $tabs.tabs("option", "active", index))
                })
            }))
        }), "function" != typeof window.vc_accordionBehaviour && (window.vc_accordionBehaviour = function() {
            jQuery(".wpb_accordion").each(function(index) {
                var $this = jQuery(this),
                    active_tab = ($this.attr("data-interval"), !isNaN(jQuery(this).data("active-tab")) && 0 < parseInt($this.data("active-tab"), 10) && parseInt($this.data("active-tab"), 10) - 1),
                    $tabs = !1 === active_tab || "yes" === $this.data("collapsible"),
                    $tabs = $this.find(".wpb_accordion_wrapper").accordion({ header: "> div > h3", autoHeight: !1, heightStyle: "content", active: active_tab, collapsible: $tabs, navigation: !0, activate: vc_accordionActivate, change: function(event, ui) { void 0 !== jQuery.fn.isotope && ui.newContent.find(".isotope").isotope("layout"), vc_carouselBehaviour(ui.newPanel) } });
                !0 === $this.data("vcDisableKeydown") && ($tabs.data("uiAccordion")._keydown = function() {})
            })
        }), "function" != typeof window.vc_teaserGrid && (window.vc_teaserGrid = function() {
            var layout_modes = { fitrows: "fitRows", masonry: "masonry" };
            jQuery(".wpb_grid .teaser_grid_container:not(.wpb_carousel), .wpb_filtered_grid .teaser_grid_container:not(.wpb_carousel)").each(function() {
                var $container = jQuery(this),
                    $thumbs = $container.find(".wpb_thumbnails"),
                    layout_mode = $thumbs.attr("data-layout-mode");
                $thumbs.isotope({ itemSelector: ".isotope-item", layoutMode: void 0 === layout_modes[layout_mode] ? "fitRows" : layout_modes[layout_mode] }), $container.find(".categories_filter a").data("isotope", $thumbs).on("click", function($thumbs) {
                    $thumbs && $thumbs.preventDefault && $thumbs.preventDefault();
                    $thumbs = jQuery(this).data("isotope");
                    jQuery(this).parent().parent().find(".active").removeClass("active"), jQuery(this).parent().addClass("active"), $thumbs.isotope({ filter: jQuery(this).attr("data-filter") })
                }), jQuery(window).on("load resize", function() { $thumbs.isotope("layout") })
            })
        }), "function" != typeof window.vc_carouselBehaviour && (window.vc_carouselBehaviour = function($parent) {
            ($parent ? $parent.find(".wpb_carousel") : jQuery(".wpb_carousel")).each(function() { var fluid_ul = jQuery(this);!0 !== fluid_ul.data("carousel_enabled") && fluid_ul.is(":visible") && (fluid_ul.data("carousel_enabled", !0), getColumnsCount(jQuery(this)), jQuery(this).hasClass("columns_count_1"), (fluid_ul = jQuery(this).find(".wpb_thumbnails-fluid li")).css({ "margin-right": fluid_ul.css("margin-left"), "margin-left": 0 }), (fluid_ul = jQuery(this).find("ul.wpb_thumbnails-fluid")).width(fluid_ul.width() + 300), jQuery(window).on("resize", function() { screen_size != (screen_size = getSizeName()) && window.setTimeout(function() { location.reload() }, 20) })) })
        }), "function" != typeof window.vc_slidersBehaviour && (window.vc_slidersBehaviour = function() {
            jQuery(".wpb_gallery_slides").each(function(index) {
                var $imagesGrid, sliderTimeout, this_element = jQuery(this);
                this_element.hasClass("wpb_slider_nivo") ? (0 === (sliderTimeout = 1e3 * this_element.attr("data-interval")) && (sliderTimeout = 9999999999), this_element.find(".nivoSlider").nivoSlider({ effect: "boxRainGrow,boxRain,boxRainReverse,boxRainGrowReverse", slices: 15, boxCols: 8, boxRows: 4, animSpeed: 800, pauseTime: sliderTimeout, startSlide: 0, directionNav: !0, directionNavHide: !0, controlNav: !0, keyboardNav: !1, pauseOnHover: !0, manualAdvance: !1, prevText: "Prev", nextText: "Next" })) : this_element.hasClass("wpb_image_grid") && (jQuery.fn.imagesLoaded ? $imagesGrid = this_element.find(".wpb_image_grid_ul").imagesLoaded(function() { $imagesGrid.isotope({ itemSelector: ".isotope-item", layoutMode: "fitRows" }) }) : this_element.find(".wpb_image_grid_ul").isotope({ itemSelector: ".isotope-item", layoutMode: "fitRows" }))
            })
        }), "function" != typeof window.vc_prettyPhoto && (window.vc_prettyPhoto = function() { try { jQuery && jQuery.fn && jQuery.fn.prettyPhoto && jQuery('a.prettyphoto, .gallery-icon a[href*=".jpg"]').prettyPhoto({ animationSpeed: "normal", hook: "data-rel", padding: 15, opacity: .7, showTitle: !0, allowresize: !0, counter_separator_label: "/", hideflash: !1, deeplinking: !1, modal: !1, callback: function() {-1 < location.href.indexOf("#!prettyPhoto") && (location.hash = "") }, social_tools: "" }) } catch (err) { window.console && window.console.warn && window.console.warn("vc_prettyPhoto initialize error", err) } }), "function" != typeof window.vc_google_fonts && (window.vc_google_fonts = function() { return window.console && window.console.warn && window.console.warn("function vc_google_fonts is deprecated, no need to use it"), !1 }), window.vcParallaxSkroll = !1, "function" != typeof window.vc_rowBehaviour && (window.vc_rowBehaviour = function() {
            var vcSkrollrOptions, callSkrollInit, $ = window.jQuery;

            function fullWidthRow() {
                var $elements = $('[data-vc-full-width="true"]');
                $.each($elements, function(key, item) {
                    var $el = $(this);
                    $el.addClass("vc_hidden");
                    var el_margin_left, el_margin_right, offset, width, padding, paddingRight, $el_full = $el.next(".vc_row-full-width");
                    $el_full.length || ($el_full = $el.parent().next(".vc_row-full-width")), $el_full.length && (el_margin_left = parseInt($el.css("margin-left"), 10), el_margin_right = parseInt($el.css("margin-right"), 10), offset = 0 - $el_full.offset().left - el_margin_left, width = $(window).width(), "rtl" === $el.css("direction") && (offset -= $el_full.width(), offset += width, offset += el_margin_left, offset += el_margin_right), $el.css({ position: "relative", left: offset, "box-sizing": "border-box", width: width }), $el.data("vcStretchContent") || ("rtl" === $el.css("direction") ? ((padding = offset) < 0 && (padding = 0), (paddingRight = offset) < 0 && (paddingRight = 0)) : ((padding = -1 * offset) < 0 && (padding = 0), (paddingRight = width - padding - $el_full.width() + el_margin_left + el_margin_right) < 0 && (paddingRight = 0)), $el.css({ "padding-left": padding + "px", "padding-right": paddingRight + "px" })), $el.attr("data-vc-full-width-init", "true"), $el.removeClass("vc_hidden"), $(document).trigger("vc-full-width-row-single", { el: $el, offset: offset, marginLeft: el_margin_left, marginRight: el_margin_right, elFull: $el_full, width: width }))
                }), $(document).trigger("vc-full-width-row", $elements)
            }

            function fullHeightRow() {
                var fullHeight, offsetTop, $element = $(".vc_row-o-full-height:first");
                $element.length && (fullHeight = $(window).height(), (offsetTop = $element.offset().top) < fullHeight && (fullHeight = 100 - offsetTop / (fullHeight / 100), $element.css("min-height", fullHeight + "vh"))), $(document).trigger("vc-full-height-row", $element)
            }
            $(window).off("resize.vcRowBehaviour").on("resize.vcRowBehaviour", fullWidthRow).on("resize.vcRowBehaviour", fullHeightRow), fullWidthRow(), fullHeightRow(), (0 < window.navigator.userAgent.indexOf("MSIE ") || navigator.userAgent.match(/Trident.*rv\:11\./)) && $(".vc_row-o-full-height").each(function() { "flex" === $(this).css("display") && $(this).wrap('<div class="vc_ie-flexbox-fixer"></div>') }), vc_initVideoBackgrounds(), callSkrollInit = !1, window.vcParallaxSkroll && window.vcParallaxSkroll.destroy(), $(".vc_parallax-inner").remove(), $("[data-5p-top-bottom]").removeAttr("data-5p-top-bottom data-30p-top-bottom"), $("[data-vc-parallax]").each(function() {
                var skrollrStart, $parallaxElement, parallaxImage, youtubeId;
                callSkrollInit = !0, "on" === $(this).data("vcParallaxOFade") && $(this).children().attr("data-5p-top-bottom", "opacity:0;").attr("data-30p-top-bottom", "opacity:1;"), skrollrStart = 100 * $(this).data("vcParallax"), ($parallaxElement = $("<div />").addClass("vc_parallax-inner").appendTo($(this))).height(skrollrStart + "%"), parallaxImage = $(this).data("vcParallaxImage"), (youtubeId = vcExtractYoutubeId(parallaxImage)) ? insertYoutubeVideoAsBackground($parallaxElement, youtubeId) : void 0 !== parallaxImage && $parallaxElement.css("background-image", "url(" + parallaxImage + ")"), skrollrStart = -(skrollrStart - 100), $parallaxElement.attr("data-bottom-top", "top: " + skrollrStart + "%;").attr("data-top-bottom", "top: 0%;")
            }), callSkrollInit && window.skrollr && (vcSkrollrOptions = { forceHeight: !1, smoothScrolling: !1, mobileCheck: function() { return !1 } }, window.vcParallaxSkroll = skrollr.init(vcSkrollrOptions), window.vcParallaxSkroll)
        }), "function" != typeof window.vc_gridBehaviour && (window.vc_gridBehaviour = function() { jQuery.fn.vcGrid && jQuery("[data-vc-grid]").vcGrid() }), "function" != typeof window.getColumnsCount && (window.getColumnsCount = function(el) {
            for (var find = !1, i = 1; !1 === find;) {
                if (el.hasClass("columns_count_" + i)) return find = !0, i;
                i++
            }
        });
        var screen_size = getSizeName();

        function getSizeName() { var screen_w = jQuery(window).width(); return 1170 < screen_w ? "desktop_wide" : 960 < screen_w && screen_w < 1169 ? "desktop" : 768 < screen_w && screen_w < 959 ? "tablet" : 300 < screen_w && screen_w < 767 ? "mobile" : screen_w < 300 ? "mobile_portrait" : "" }
        "function" != typeof window.wpb_prepare_tab_content && (window.wpb_prepare_tab_content = function(event, ui) {
            var panel = ui.panel || ui.newPanel,
                $pie_charts = panel.find(".vc_pie_chart:not(.vc_ready)"),
                $round_charts = panel.find(".vc_round-chart"),
                $frame = panel.find(".vc_line-chart"),
                $google_maps = panel.find('[data-ride="vc_carousel"]');
            vc_carouselBehaviour(), vc_plugin_flexslider(panel), ui.newPanel.find(".vc_masonry_media_grid, .vc_masonry_grid").length && ui.newPanel.find(".vc_masonry_media_grid, .vc_masonry_grid").each(function() {
                var grid = jQuery(this).data("vcGrid");
                grid && grid.gridBuilder && grid.gridBuilder.setMasonry && grid.gridBuilder.setMasonry()
            }), panel.find(".vc_masonry_media_grid, .vc_masonry_grid").length && panel.find(".vc_masonry_media_grid, .vc_masonry_grid").each(function() {
                var grid = jQuery(this).data("vcGrid");
                grid && grid.gridBuilder && grid.gridBuilder.setMasonry && grid.gridBuilder.setMasonry()
            }), $pie_charts.length && jQuery.fn.vcChat && $pie_charts.vcChat(), $round_charts.length && jQuery.fn.vcRoundChart && $round_charts.vcRoundChart({ reload: !1 }), $frame.length && jQuery.fn.vcLineChart && $frame.vcLineChart({ reload: !1 }), $google_maps.length && jQuery.fn.carousel && $google_maps.carousel("resizeAction"), $frame = panel.find(".isotope, .wpb_image_grid_ul"), $google_maps = panel.find(".wpb_gmaps_widget"), 0 < $frame.length && $frame.isotope("layout"), $google_maps.length && !$google_maps.is(".map_ready") && (($frame = $google_maps.find("iframe")).attr("src", $frame.attr("src")), $google_maps.addClass("map_ready")), panel.parents(".isotope").length && panel.parents(".isotope").each(function() { jQuery(this).isotope("layout") }), $(document).trigger("wpb_prepare_tab_content", panel)
        }), "function" != typeof window.vc_ttaActivation && (window.vc_ttaActivation = function() {
            jQuery("[data-vc-accordion]").on("show.vc.accordion", function(e) {
                var $ = window.jQuery,
                    ui = {};
                ui.newPanel = $(this).data("vc.accordion").getTarget(), window.wpb_prepare_tab_content(e, ui)
            })
        }), "function" != typeof window.vc_accordionActivate && (window.vc_accordionActivate = function(event, ui) {
            var $pie_charts, $round_charts, $line_charts, $carousel;
            ui.newPanel.length && ui.newHeader.length && ($pie_charts = ui.newPanel.find(".vc_pie_chart:not(.vc_ready)"), $round_charts = ui.newPanel.find(".vc_round-chart"), $line_charts = ui.newPanel.find(".vc_line-chart"), $carousel = ui.newPanel.find('[data-ride="vc_carousel"]'), void 0 !== jQuery.fn.isotope && ui.newPanel.find(".isotope, .wpb_image_grid_ul").isotope("layout"), ui.newPanel.find(".vc_masonry_media_grid, .vc_masonry_grid").length && ui.newPanel.find(".vc_masonry_media_grid, .vc_masonry_grid").each(function() {
                var grid = jQuery(this).data("vcGrid");
                grid && grid.gridBuilder && grid.gridBuilder.setMasonry && grid.gridBuilder.setMasonry()
            }), vc_carouselBehaviour(ui.newPanel), vc_plugin_flexslider(ui.newPanel), $pie_charts.length && jQuery.fn.vcChat && $pie_charts.vcChat(), $round_charts.length && jQuery.fn.vcRoundChart && $round_charts.vcRoundChart({ reload: !1 }), $line_charts.length && jQuery.fn.vcLineChart && $line_charts.vcLineChart({ reload: !1 }), $carousel.length && jQuery.fn.carousel && $carousel.carousel("resizeAction"), ui.newPanel.parents(".isotope").length && ui.newPanel.parents(".isotope").each(function() { jQuery(this).isotope("layout") }))
        }), "function" != typeof window.initVideoBackgrounds && (window.initVideoBackgrounds = function() { return window.console && window.console.warn && window.console.warn("this function is deprecated use vc_initVideoBackgrounds"), vc_initVideoBackgrounds() }), "function" != typeof window.vc_initVideoBackgrounds && (window.vc_initVideoBackgrounds = function() {
            jQuery("[data-vc-video-bg]").each(function() {
                var youtubeId, $element = jQuery(this);
                $element.data("vcVideoBg") ? (youtubeId = $element.data("vcVideoBg"), (youtubeId = vcExtractYoutubeId(youtubeId)) && ($element.find(".vc_video-bg").remove(), insertYoutubeVideoAsBackground($element, youtubeId)), jQuery(window).on("grid:items:added", function(event, $grid) { $element.has($grid).length && vcResizeVideoBackground($element) })) : $element.find(".vc_video-bg").remove()
            })
        }), "function" != typeof window.insertYoutubeVideoAsBackground && (window.insertYoutubeVideoAsBackground = function($element, youtubeId, counter) {
            if ("undefined" == typeof YT || void 0 === YT.Player) return 100 < (counter = void 0 === counter ? 0 : counter) ? void console.warn("Too many attempts to load YouTube api") : void setTimeout(function() { insertYoutubeVideoAsBackground($element, youtubeId, counter++) }, 100);
            var $container = $element.prepend('<div class="vc_video-bg vc_hidden-xs"><div class="inner"></div></div>').find(".inner");
            new YT.Player($container[0], { width: "100%", height: "100%", videoId: youtubeId, playerVars: { playlist: youtubeId, iv_load_policy: 3, enablejsapi: 1, disablekb: 1, autoplay: 1, controls: 0, showinfo: 0, rel: 0, loop: 1, wmode: "transparent" }, events: { onReady: function(event) { event.target.mute().setLoop(!0) } } }), vcResizeVideoBackground($element), jQuery(window).on("resize", function() { vcResizeVideoBackground($element) })
        }), "function" != typeof window.vcResizeVideoBackground && (window.vcResizeVideoBackground = function($element) {
            var iframeW, iframeH, marginLeft, marginTop, containerW = $element.innerWidth(),
                containerH = $element.innerHeight();
            containerW / containerH < 16 / 9 ? (iframeW = containerH * (16 / 9), iframeH = containerH, marginLeft = -Math.round((iframeW - containerW) / 2) + "px", marginTop = -Math.round((iframeH - containerH) / 2) + "px") : (iframeH = (iframeW = containerW) * (9 / 16), marginTop = -Math.round((iframeH - containerH) / 2) + "px", marginLeft = -Math.round((iframeW - containerW) / 2) + "px"), iframeW += "px", iframeH += "px", $element.find(".vc_video-bg iframe").css({ maxWidth: "1000%", marginLeft: marginLeft, marginTop: marginTop, width: iframeW, height: iframeH })
        }), "function" != typeof window.vcExtractYoutubeId && (window.vcExtractYoutubeId = function(id) {
            if (void 0 === id) return !1;
            id = id.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
            return null !== id && id[1]
        }), "function" != typeof window.vc_googleMapsPointer && (window.vc_googleMapsPointer = function() {
            var $ = window.jQuery,
                $wpbGmapsWidget = $(".wpb_gmaps_widget");
            $wpbGmapsWidget.on("click", function() { $("iframe", this).css("pointer-events", "auto") }), $wpbGmapsWidget.on("mouseleave", function() { $("iframe", this).css("pointer-events", "none") }), $(".wpb_gmaps_widget iframe").css("pointer-events", "none")
        }), "function" != typeof window.vc_setHoverBoxPerspective && (window.vc_setHoverBoxPerspective = function(hoverBox) {
            hoverBox.each(function() {
                var $this = jQuery(this),
                    perspective = 4 * $this.width() + "px";
                $this.css("perspective", perspective)
            })
        }), "function" != typeof window.vc_setHoverBoxHeight && (window.vc_setHoverBoxHeight = function(hoverBox) {
            hoverBox.each(function() {
                var hoverBoxHeight = jQuery(this),
                    hoverBoxInner = hoverBoxHeight.find(".vc-hoverbox-inner");
                hoverBoxInner.css("min-height", 0);
                var frontHeight = hoverBoxHeight.find(".vc-hoverbox-front-inner").outerHeight(),
                    hoverBoxHeight = hoverBoxHeight.find(".vc-hoverbox-back-inner").outerHeight(),
                    hoverBoxHeight = hoverBoxHeight < frontHeight ? frontHeight : hoverBoxHeight;
                hoverBoxHeight < 250 && (hoverBoxHeight = 250), hoverBoxInner.css("min-height", hoverBoxHeight + "px")
            })
        }), "function" != typeof window.vc_prepareHoverBox && (window.vc_prepareHoverBox = function() {
            var hoverBox = jQuery(".vc-hoverbox");
            vc_setHoverBoxHeight(hoverBox), vc_setHoverBoxPerspective(hoverBox)
        }), jQuery(document).ready(window.vc_prepareHoverBox), jQuery(window).on("resize", window.vc_prepareHoverBox), jQuery(document).ready(function($) { window.vc_js() })
    }(window.jQuery);;
/*!
 * WPBakery Page Builder v6.0.0 (https://wpbakery.com)
 * Copyright 2011-2020 Michael M, WPBakery
 * License: Commercial. More details: http://go.wpbakery.com/licensing
 */

// jscs:disable
// jshint ignore: start

/*!
 * imagesLoaded PACKAGED v3.1.8
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

(function() {
    function e() {}

    function t(e, t) {
        for (var n = e.length; n--;)
            if (e[n].listener === t) return n;
        return -1
    }

    function n(e) { return function() { return this[e].apply(this, arguments) } }
    var i = e.prototype,
        r = this,
        o = r.EventEmitter;
    i.getListeners = function(e) { var t, n, i = this._getEvents(); if ("object" == typeof e) { t = {}; for (n in i) i.hasOwnProperty(n) && e.test(n) && (t[n] = i[n]) } else t = i[e] || (i[e] = []); return t }, i.flattenListeners = function(e) { var t, n = []; for (t = 0; e.length > t; t += 1) n.push(e[t].listener); return n }, i.getListenersAsObject = function(e) { var t, n = this.getListeners(e); return n instanceof Array && (t = {}, t[e] = n), t || n }, i.addListener = function(e, n) {
        var i, r = this.getListenersAsObject(e),
            o = "object" == typeof n;
        for (i in r) r.hasOwnProperty(i) && -1 === t(r[i], n) && r[i].push(o ? n : { listener: n, once: !1 });
        return this
    }, i.on = n("addListener"), i.addOnceListener = function(e, t) { return this.addListener(e, { listener: t, once: !0 }) }, i.once = n("addOnceListener"), i.defineEvent = function(e) { return this.getListeners(e), this }, i.defineEvents = function(e) { for (var t = 0; e.length > t; t += 1) this.defineEvent(e[t]); return this }, i.removeListener = function(e, n) { var i, r, o = this.getListenersAsObject(e); for (r in o) o.hasOwnProperty(r) && (i = t(o[r], n), -1 !== i && o[r].splice(i, 1)); return this }, i.off = n("removeListener"), i.addListeners = function(e, t) { return this.manipulateListeners(!1, e, t) }, i.removeListeners = function(e, t) { return this.manipulateListeners(!0, e, t) }, i.manipulateListeners = function(e, t, n) {
        var i, r, o = e ? this.removeListener : this.addListener,
            s = e ? this.removeListeners : this.addListeners;
        if ("object" != typeof t || t instanceof RegExp)
            for (i = n.length; i--;) o.call(this, t, n[i]);
        else
            for (i in t) t.hasOwnProperty(i) && (r = t[i]) && ("function" == typeof r ? o.call(this, i, r) : s.call(this, i, r));
        return this
    }, i.removeEvent = function(e) {
        var t, n = typeof e,
            i = this._getEvents();
        if ("string" === n) delete i[e];
        else if ("object" === n)
            for (t in i) i.hasOwnProperty(t) && e.test(t) && delete i[t];
        else delete this._events;
        return this
    }, i.removeAllListeners = n("removeEvent"), i.emitEvent = function(e, t) {
        var n, i, r, o, s = this.getListenersAsObject(e);
        for (r in s)
            if (s.hasOwnProperty(r))
                for (i = s[r].length; i--;) n = s[r][i], n.once === !0 && this.removeListener(e, n.listener), o = n.listener.apply(this, t || []), o === this._getOnceReturnValue() && this.removeListener(e, n.listener);
        return this
    }, i.trigger = n("emitEvent"), i.emit = function(e) { var t = Array.prototype.slice.call(arguments, 1); return this.emitEvent(e, t) }, i.setOnceReturnValue = function(e) { return this._onceReturnValue = e, this }, i._getOnceReturnValue = function() { return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0 }, i._getEvents = function() { return this._events || (this._events = {}) }, e.noConflict = function() { return r.EventEmitter = o, e }, "function" == typeof define && define.amd ? define("eventEmitter/EventEmitter", [], function() { return e }) : "object" == typeof module && module.exports ? module.exports = e : this.EventEmitter = e
}).call(this),
    function(e) {
        function t(t) { var n = e.event; return n.target = n.target || n.srcElement || t, n }
        var n = document.documentElement,
            i = function() {};
        n.addEventListener ? i = function(e, t, n) { e.addEventListener(t, n, !1) } : n.attachEvent && (i = function(e, n, i) {
            e[n + i] = i.handleEvent ? function() {
                var n = t(e);
                i.handleEvent.call(i, n)
            } : function() {
                var n = t(e);
                i.call(e, n)
            }, e.attachEvent("on" + n, e[n + i])
        });
        var r = function() {};
        n.removeEventListener ? r = function(e, t, n) { e.removeEventListener(t, n, !1) } : n.detachEvent && (r = function(e, t, n) { e.detachEvent("on" + t, e[t + n]); try { delete e[t + n] } catch (i) { e[t + n] = void 0 } });
        var o = { bind: i, unbind: r };
        "function" == typeof define && define.amd ? define("eventie/eventie", o) : e.eventie = o
    }(this),
    function(e, t) { "function" == typeof define && define.amd ? define(["eventEmitter/EventEmitter", "eventie/eventie"], function(n, i) { return t(e, n, i) }) : "object" == typeof exports ? module.exports = t(e, require("wolfy87-eventemitter"), require("eventie")) : e.imagesLoaded = t(e, e.EventEmitter, e.eventie) }(window, function(e, t, n) {
        function i(e, t) { for (var n in t) e[n] = t[n]; return e }

        function r(e) { return "[object Array]" === d.call(e) }

        function o(e) {
            var t = [];
            if (r(e)) t = e;
            else if ("number" == typeof e.length)
                for (var n = 0, i = e.length; i > n; n++) t.push(e[n]);
            else t.push(e);
            return t
        }

        function s(e, t, n) {
            if (!(this instanceof s)) return new s(e, t);
            "string" == typeof e && (e = document.querySelectorAll(e)), this.elements = o(e), this.options = i({}, this.options), "function" == typeof t ? n = t : i(this.options, t), n && this.on("always", n), this.getImages(), a && (this.jqDeferred = new a.Deferred);
            var r = this;
            setTimeout(function() { r.check() })
        }

        function f(e) { this.img = e }

        function c(e) { this.src = e, v[e] = this }
        var a = e.jQuery,
            u = e.console,
            h = u !== void 0,
            d = Object.prototype.toString;
        s.prototype = new t, s.prototype.options = {}, s.prototype.getImages = function() {
            this.images = [];
            for (var e = 0, t = this.elements.length; t > e; e++) {
                var n = this.elements[e];
                "IMG" === n.nodeName && this.addImage(n);
                var i = n.nodeType;
                if (i && (1 === i || 9 === i || 11 === i))
                    for (var r = n.querySelectorAll("img"), o = 0, s = r.length; s > o; o++) {
                        var f = r[o];
                        this.addImage(f)
                    }
            }
        }, s.prototype.addImage = function(e) {
            var t = new f(e);
            this.images.push(t)
        }, s.prototype.check = function() {
            function e(e, r) { return t.options.debug && h && u.log("confirm", e, r), t.progress(e), n++, n === i && t.complete(), !0 }
            var t = this,
                n = 0,
                i = this.images.length;
            if (this.hasAnyBroken = !1, !i) return this.complete(), void 0;
            for (var r = 0; i > r; r++) {
                var o = this.images[r];
                o.on("confirm", e), o.check()
            }
        }, s.prototype.progress = function(e) {
            this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded;
            var t = this;
            setTimeout(function() { t.emit("progress", t, e), t.jqDeferred && t.jqDeferred.notify && t.jqDeferred.notify(t, e) })
        }, s.prototype.complete = function() {
            var e = this.hasAnyBroken ? "fail" : "done";
            this.isComplete = !0;
            var t = this;
            setTimeout(function() {
                if (t.emit(e, t), t.emit("always", t), t.jqDeferred) {
                    var n = t.hasAnyBroken ? "reject" : "resolve";
                    t.jqDeferred[n](t)
                }
            })
        }, a && (a.fn.imagesLoaded = function(e, t) { var n = new s(this, e, t); return n.jqDeferred.promise(a(this)) }), f.prototype = new t, f.prototype.check = function() {
            var e = v[this.img.src] || new c(this.img.src);
            if (e.isConfirmed) return this.confirm(e.isLoaded, "cached was confirmed"), void 0;
            if (this.img.complete && void 0 !== this.img.naturalWidth) return this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), void 0;
            var t = this;
            e.on("confirm", function(e, n) { return t.confirm(e.isLoaded, n), !0 }), e.check()
        }, f.prototype.confirm = function(e, t) { this.isLoaded = e, this.emit("confirm", this, t) };
        var v = {};
        return c.prototype = new t, c.prototype.check = function() {
            if (!this.isChecked) {
                var e = new Image;
                n.bind(e, "load", this), n.bind(e, "error", this), e.src = this.src, this.isChecked = !0
            }
        }, c.prototype.handleEvent = function(e) {
            var t = "on" + e.type;
            this[t] && this[t](e)
        }, c.prototype.onload = function(e) { this.confirm(!0, "onload"), this.unbindProxyEvents(e) }, c.prototype.onerror = function(e) { this.confirm(!1, "onerror"), this.unbindProxyEvents(e) }, c.prototype.confirm = function(e, t) { this.isConfirmed = !0, this.isLoaded = e, this.emit("confirm", this, t) }, c.prototype.unbindProxyEvents = function(e) { n.unbind(e.target, "load", this), n.unbind(e.target, "error", this) }, s
    });;
/*!
 * WPBakery Page Builder v6.0.0 (https://wpbakery.com)
 * Copyright 2011-2020 Michael M, WPBakery
 * License: Commercial. More details: http://go.wpbakery.com/licensing
 */

// jscs:disable
// jshint ignore: start

/*!
 * Isotope PACKAGED v3.0.5
 *
 * Licensed GPLv3 for open source use
 * or Isotope Commercial License for commercial use
 *
 * https://isotope.metafizzy.co
 * Copyright 2017 Metafizzy
 */

! function(t, e) { "function" == typeof define && define.amd ? define("jquery-bridget/jquery-bridget", ["jquery"], function(i) { return e(t, i) }) : "object" == typeof module && module.exports ? module.exports = e(t, require("jquery")) : t.jQueryBridget = e(t, t.jQuery) }(window, function(t, e) {
    "use strict";

    function i(i, s, a) {
        function u(t, e, o) {
            var n, s = "$()." + i + '("' + e + '")';
            return t.each(function(t, u) {
                var h = a.data(u, i);
                if (!h) return void r(i + " not initialized. Cannot call methods, i.e. " + s);
                var d = h[e];
                if (!d || "_" == e.charAt(0)) return void r(s + " is not a valid method");
                var l = d.apply(h, o);
                n = void 0 === n ? l : n
            }), void 0 !== n ? n : t
        }

        function h(t, e) {
            t.each(function(t, o) {
                var n = a.data(o, i);
                n ? (n.option(e), n._init()) : (n = new s(o, e), a.data(o, i, n))
            })
        }
        a = a || e || t.jQuery, a && (s.prototype.option || (s.prototype.option = function(t) { a.isPlainObject(t) && (this.options = a.extend(!0, this.options, t)) }), a.fn[i] = function(t) { if ("string" == typeof t) { var e = n.call(arguments, 1); return u(this, t, e) } return h(this, t), this }, o(a))
    }

    function o(t) {!t || t && t.bridget || (t.bridget = i) }
    var n = Array.prototype.slice,
        s = t.console,
        r = "undefined" == typeof s ? function() {} : function(t) { s.error(t) };
    return o(e || t.jQuery), i
}),
function(t, e) { "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e() }("undefined" != typeof window ? window : this, function() {
    function t() {}
    var e = t.prototype;
    return e.on = function(t, e) {
        if (t && e) {
            var i = this._events = this._events || {},
                o = i[t] = i[t] || [];
            return o.indexOf(e) == -1 && o.push(e), this
        }
    }, e.once = function(t, e) {
        if (t && e) {
            this.on(t, e);
            var i = this._onceEvents = this._onceEvents || {},
                o = i[t] = i[t] || {};
            return o[e] = !0, this
        }
    }, e.off = function(t, e) { var i = this._events && this._events[t]; if (i && i.length) { var o = i.indexOf(e); return o != -1 && i.splice(o, 1), this } }, e.emitEvent = function(t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            i = i.slice(0), e = e || [];
            for (var o = this._onceEvents && this._onceEvents[t], n = 0; n < i.length; n++) {
                var s = i[n],
                    r = o && o[s];
                r && (this.off(t, s), delete o[s]), s.apply(this, e)
            }
            return this
        }
    }, e.allOff = function() { delete this._events, delete this._onceEvents }, t
}),
function(t, e) { "use strict"; "function" == typeof define && define.amd ? define("get-size/get-size", [], function() { return e() }) : "object" == typeof module && module.exports ? module.exports = e() : t.getSize = e() }(window, function() {
    "use strict";

    function t(t) {
        var e = parseFloat(t),
            i = t.indexOf("%") == -1 && !isNaN(e);
        return i && e
    }

    function e() {}

    function i() {
        for (var t = { width: 0, height: 0, innerWidth: 0, innerHeight: 0, outerWidth: 0, outerHeight: 0 }, e = 0; e < h; e++) {
            var i = u[e];
            t[i] = 0
        }
        return t
    }

    function o(t) { var e = getComputedStyle(t); return e || a("Style returned " + e + ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"), e }

    function n() {
        if (!d) {
            d = !0;
            var e = document.createElement("div");
            e.style.width = "200px", e.style.padding = "1px 2px 3px 4px", e.style.borderStyle = "solid", e.style.borderWidth = "1px 2px 3px 4px", e.style.boxSizing = "border-box";
            var i = document.body || document.documentElement;
            i.appendChild(e);
            var n = o(e);
            s.isBoxSizeOuter = r = 200 == t(n.width), i.removeChild(e)
        }
    }

    function s(e) {
        if (n(), "string" == typeof e && (e = document.querySelector(e)), e && "object" == typeof e && e.nodeType) {
            var s = o(e);
            if ("none" == s.display) return i();
            var a = {};
            a.width = e.offsetWidth, a.height = e.offsetHeight;
            for (var d = a.isBorderBox = "border-box" == s.boxSizing, l = 0; l < h; l++) {
                var f = u[l],
                    c = s[f],
                    m = parseFloat(c);
                a[f] = isNaN(m) ? 0 : m
            }
            var p = a.paddingLeft + a.paddingRight,
                y = a.paddingTop + a.paddingBottom,
                g = a.marginLeft + a.marginRight,
                v = a.marginTop + a.marginBottom,
                _ = a.borderLeftWidth + a.borderRightWidth,
                I = a.borderTopWidth + a.borderBottomWidth,
                z = d && r,
                x = t(s.width);
            x !== !1 && (a.width = x + (z ? 0 : p + _));
            var S = t(s.height);
            return S !== !1 && (a.height = S + (z ? 0 : y + I)), a.innerWidth = a.width - (p + _), a.innerHeight = a.height - (y + I), a.outerWidth = a.width + g, a.outerHeight = a.height + v, a
        }
    }
    var r, a = "undefined" == typeof console ? e : function(t) { console.error(t) },
        u = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"],
        h = u.length,
        d = !1;
    return s
}),
function(t, e) { "use strict"; "function" == typeof define && define.amd ? define("desandro-matches-selector/matches-selector", e) : "object" == typeof module && module.exports ? module.exports = e() : t.matchesSelector = e() }(window, function() {
    "use strict";
    var t = function() {
        var t = window.Element.prototype;
        if (t.matches) return "matches";
        if (t.matchesSelector) return "matchesSelector";
        for (var e = ["webkit", "moz", "ms", "o"], i = 0; i < e.length; i++) {
            var o = e[i],
                n = o + "MatchesSelector";
            if (t[n]) return n
        }
    }();
    return function(e, i) { return e[t](i) }
}),
function(t, e) { "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["desandro-matches-selector/matches-selector"], function(i) { return e(t, i) }) : "object" == typeof module && module.exports ? module.exports = e(t, require("desandro-matches-selector")) : t.fizzyUIUtils = e(t, t.matchesSelector) }(window, function(t, e) {
    var i = {};
    i.extend = function(t, e) { for (var i in e) t[i] = e[i]; return t }, i.modulo = function(t, e) { return (t % e + e) % e }, i.makeArray = function(t) {
        var e = [];
        if (Array.isArray(t)) e = t;
        else if (t && "object" == typeof t && "number" == typeof t.length)
            for (var i = 0; i < t.length; i++) e.push(t[i]);
        else e.push(t);
        return e
    }, i.removeFrom = function(t, e) {
        var i = t.indexOf(e);
        i != -1 && t.splice(i, 1)
    }, i.getParent = function(t, i) {
        for (; t.parentNode && t != document.body;)
            if (t = t.parentNode, e(t, i)) return t
    }, i.getQueryElement = function(t) { return "string" == typeof t ? document.querySelector(t) : t }, i.handleEvent = function(t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
    }, i.filterFindElements = function(t, o) {
        t = i.makeArray(t);
        var n = [];
        return t.forEach(function(t) {
            if (t instanceof HTMLElement) {
                if (!o) return void n.push(t);
                e(t, o) && n.push(t);
                for (var i = t.querySelectorAll(o), s = 0; s < i.length; s++) n.push(i[s])
            }
        }), n
    }, i.debounceMethod = function(t, e, i) {
        var o = t.prototype[e],
            n = e + "Timeout";
        t.prototype[e] = function() {
            var t = this[n];
            t && clearTimeout(t);
            var e = arguments,
                s = this;
            this[n] = setTimeout(function() { o.apply(s, e), delete s[n] }, i || 100)
        }
    }, i.docReady = function(t) { var e = document.readyState; "complete" == e || "interactive" == e ? setTimeout(t) : document.addEventListener("DOMContentLoaded", t) }, i.toDashed = function(t) { return t.replace(/(.)([A-Z])/g, function(t, e, i) { return e + "-" + i }).toLowerCase() };
    var o = t.console;
    return i.htmlInit = function(e, n) {
        i.docReady(function() {
            var s = i.toDashed(n),
                r = "data-" + s,
                a = document.querySelectorAll("[" + r + "]"),
                u = document.querySelectorAll(".js-" + s),
                h = i.makeArray(a).concat(i.makeArray(u)),
                d = r + "-options",
                l = t.jQuery;
            h.forEach(function(t) {
                var i, s = t.getAttribute(r) || t.getAttribute(d);
                try { i = s && JSON.parse(s) } catch (a) { return void(o && o.error("Error parsing " + r + " on " + t.className + ": " + a)) }
                var u = new e(t, i);
                l && l.data(t, n, u)
            })
        })
    }, i
}),
function(t, e) { "function" == typeof define && define.amd ? define("outlayer/item", ["ev-emitter/ev-emitter", "get-size/get-size"], e) : "object" == typeof module && module.exports ? module.exports = e(require("ev-emitter"), require("get-size")) : (t.Outlayer = {}, t.Outlayer.Item = e(t.EvEmitter, t.getSize)) }(window, function(t, e) {
    "use strict";

    function i(t) { for (var e in t) return !1; return e = null, !0 }

    function o(t, e) { t && (this.element = t, this.layout = e, this.position = { x: 0, y: 0 }, this._create()) }

    function n(t) { return t.replace(/([A-Z])/g, function(t) { return "-" + t.toLowerCase() }) }
    var s = document.documentElement.style,
        r = "string" == typeof s.transition ? "transition" : "WebkitTransition",
        a = "string" == typeof s.transform ? "transform" : "WebkitTransform",
        u = { WebkitTransition: "webkitTransitionEnd", transition: "transitionend" }[r],
        h = { transform: a, transition: r, transitionDuration: r + "Duration", transitionProperty: r + "Property", transitionDelay: r + "Delay" },
        d = o.prototype = Object.create(t.prototype);
    d.constructor = o, d._create = function() { this._transn = { ingProperties: {}, clean: {}, onEnd: {} }, this.css({ position: "absolute" }) }, d.handleEvent = function(t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
    }, d.getSize = function() { this.size = e(this.element) }, d.css = function(t) {
        var e = this.element.style;
        for (var i in t) {
            var o = h[i] || i;
            e[o] = t[i]
        }
    }, d.getPosition = function() {
        var t = getComputedStyle(this.element),
            e = this.layout._getOption("originLeft"),
            i = this.layout._getOption("originTop"),
            o = t[e ? "left" : "right"],
            n = t[i ? "top" : "bottom"],
            s = this.layout.size,
            r = o.indexOf("%") != -1 ? parseFloat(o) / 100 * s.width : parseInt(o, 10),
            a = n.indexOf("%") != -1 ? parseFloat(n) / 100 * s.height : parseInt(n, 10);
        r = isNaN(r) ? 0 : r, a = isNaN(a) ? 0 : a, r -= e ? s.paddingLeft : s.paddingRight, a -= i ? s.paddingTop : s.paddingBottom, this.position.x = r, this.position.y = a
    }, d.layoutPosition = function() {
        var t = this.layout.size,
            e = {},
            i = this.layout._getOption("originLeft"),
            o = this.layout._getOption("originTop"),
            n = i ? "paddingLeft" : "paddingRight",
            s = i ? "left" : "right",
            r = i ? "right" : "left",
            a = this.position.x + t[n];
        e[s] = this.getXValue(a), e[r] = "";
        var u = o ? "paddingTop" : "paddingBottom",
            h = o ? "top" : "bottom",
            d = o ? "bottom" : "top",
            l = this.position.y + t[u];
        e[h] = this.getYValue(l), e[d] = "", this.css(e), this.emitEvent("layout", [this])
    }, d.getXValue = function(t) { var e = this.layout._getOption("horizontal"); return this.layout.options.percentPosition && !e ? t / this.layout.size.width * 100 + "%" : t + "px" }, d.getYValue = function(t) { var e = this.layout._getOption("horizontal"); return this.layout.options.percentPosition && e ? t / this.layout.size.height * 100 + "%" : t + "px" }, d._transitionTo = function(t, e) {
        this.getPosition();
        var i = this.position.x,
            o = this.position.y,
            n = parseInt(t, 10),
            s = parseInt(e, 10),
            r = n === this.position.x && s === this.position.y;
        if (this.setPosition(t, e), r && !this.isTransitioning) return void this.layoutPosition();
        var a = t - i,
            u = e - o,
            h = {};
        h.transform = this.getTranslate(a, u), this.transition({ to: h, onTransitionEnd: { transform: this.layoutPosition }, isCleaning: !0 })
    }, d.getTranslate = function(t, e) {
        var i = this.layout._getOption("originLeft"),
            o = this.layout._getOption("originTop");
        return t = i ? t : -t, e = o ? e : -e, "translate3d(" + t + "px, " + e + "px, 0)"
    }, d.goTo = function(t, e) { this.setPosition(t, e), this.layoutPosition() }, d.moveTo = d._transitionTo, d.setPosition = function(t, e) { this.position.x = parseInt(t, 10), this.position.y = parseInt(e, 10) }, d._nonTransition = function(t) { this.css(t.to), t.isCleaning && this._removeStyles(t.to); for (var e in t.onTransitionEnd) t.onTransitionEnd[e].call(this) }, d.transition = function(t) {
        if (!parseFloat(this.layout.options.transitionDuration)) return void this._nonTransition(t);
        var e = this._transn;
        for (var i in t.onTransitionEnd) e.onEnd[i] = t.onTransitionEnd[i];
        for (i in t.to) e.ingProperties[i] = !0, t.isCleaning && (e.clean[i] = !0);
        if (t.from) {
            this.css(t.from);
            var o = this.element.offsetHeight;
            o = null
        }
        this.enableTransition(t.to), this.css(t.to), this.isTransitioning = !0
    };
    var l = "opacity," + n(a);
    d.enableTransition = function() {
        if (!this.isTransitioning) {
            var t = this.layout.options.transitionDuration;
            t = "number" == typeof t ? t + "ms" : t, this.css({ transitionProperty: l, transitionDuration: t, transitionDelay: this.staggerDelay || 0 }), this.element.addEventListener(u, this, !1)
        }
    }, d.onwebkitTransitionEnd = function(t) { this.ontransitionend(t) }, d.onotransitionend = function(t) { this.ontransitionend(t) };
    var f = { "-webkit-transform": "transform" };
    d.ontransitionend = function(t) {
        if (t.target === this.element) {
            var e = this._transn,
                o = f[t.propertyName] || t.propertyName;
            if (delete e.ingProperties[o], i(e.ingProperties) && this.disableTransition(), o in e.clean && (this.element.style[t.propertyName] = "", delete e.clean[o]), o in e.onEnd) {
                var n = e.onEnd[o];
                n.call(this), delete e.onEnd[o]
            }
            this.emitEvent("transitionEnd", [this])
        }
    }, d.disableTransition = function() { this.removeTransitionStyles(), this.element.removeEventListener(u, this, !1), this.isTransitioning = !1 }, d._removeStyles = function(t) {
        var e = {};
        for (var i in t) e[i] = "";
        this.css(e)
    };
    var c = { transitionProperty: "", transitionDuration: "", transitionDelay: "" };
    return d.removeTransitionStyles = function() { this.css(c) }, d.stagger = function(t) { t = isNaN(t) ? 0 : t, this.staggerDelay = t + "ms" }, d.removeElem = function() { this.element.parentNode.removeChild(this.element), this.css({ display: "" }), this.emitEvent("remove", [this]) }, d.remove = function() { return r && parseFloat(this.layout.options.transitionDuration) ? (this.once("transitionEnd", function() { this.removeElem() }), void this.hide()) : void this.removeElem() }, d.reveal = function() {
        delete this.isHidden, this.css({ display: "" });
        var t = this.layout.options,
            e = {},
            i = this.getHideRevealTransitionEndProperty("visibleStyle");
        e[i] = this.onRevealTransitionEnd, this.transition({ from: t.hiddenStyle, to: t.visibleStyle, isCleaning: !0, onTransitionEnd: e })
    }, d.onRevealTransitionEnd = function() { this.isHidden || this.emitEvent("reveal") }, d.getHideRevealTransitionEndProperty = function(t) { var e = this.layout.options[t]; if (e.opacity) return "opacity"; for (var i in e) return i }, d.hide = function() {
        this.isHidden = !0, this.css({ display: "" });
        var t = this.layout.options,
            e = {},
            i = this.getHideRevealTransitionEndProperty("hiddenStyle");
        e[i] = this.onHideTransitionEnd, this.transition({ from: t.visibleStyle, to: t.hiddenStyle, isCleaning: !0, onTransitionEnd: e })
    }, d.onHideTransitionEnd = function() { this.isHidden && (this.css({ display: "none" }), this.emitEvent("hide")) }, d.destroy = function() { this.css({ position: "", left: "", right: "", top: "", bottom: "", transition: "", transform: "" }) }, o
}),
function(t, e) { "use strict"; "function" == typeof define && define.amd ? define("outlayer/outlayer", ["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./item"], function(i, o, n, s) { return e(t, i, o, n, s) }) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./item")) : t.Outlayer = e(t, t.EvEmitter, t.getSize, t.fizzyUIUtils, t.Outlayer.Item) }(window, function(t, e, i, o, n) {
    "use strict";

    function s(t, e) {
        var i = o.getQueryElement(t);
        if (!i) return void(u && u.error("Bad element for " + this.constructor.namespace + ": " + (i || t)));
        this.element = i, h && (this.$element = h(this.element)), this.options = o.extend({}, this.constructor.defaults), this.option(e);
        var n = ++l;
        this.element.outlayerGUID = n, f[n] = this, this._create();
        var s = this._getOption("initLayout");
        s && this.layout()
    }

    function r(t) {
        function e() { t.apply(this, arguments) }
        return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e
    }

    function a(t) {
        if ("number" == typeof t) return t;
        var e = t.match(/(^\d*\.?\d*)(\w*)/),
            i = e && e[1],
            o = e && e[2];
        if (!i.length) return 0;
        i = parseFloat(i);
        var n = m[o] || 1;
        return i * n
    }
    var u = t.console,
        h = t.jQuery,
        d = function() {},
        l = 0,
        f = {};
    s.namespace = "outlayer", s.Item = n, s.defaults = { containerStyle: { position: "relative" }, initLayout: !0, originLeft: !0, originTop: !0, resize: !0, resizeContainer: !0, transitionDuration: "0.4s", hiddenStyle: { opacity: 0, transform: "scale(0.001)" }, visibleStyle: { opacity: 1, transform: "scale(1)" } };
    var c = s.prototype;
    o.extend(c, e.prototype), c.option = function(t) { o.extend(this.options, t) }, c._getOption = function(t) { var e = this.constructor.compatOptions[t]; return e && void 0 !== this.options[e] ? this.options[e] : this.options[t] }, s.compatOptions = { initLayout: "isInitLayout", horizontal: "isHorizontal", layoutInstant: "isLayoutInstant", originLeft: "isOriginLeft", originTop: "isOriginTop", resize: "isResizeBound", resizeContainer: "isResizingContainer" }, c._create = function() {
        this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), o.extend(this.element.style, this.options.containerStyle);
        var t = this._getOption("resize");
        t && this.bindResize()
    }, c.reloadItems = function() { this.items = this._itemize(this.element.children) }, c._itemize = function(t) {
        for (var e = this._filterFindItemElements(t), i = this.constructor.Item, o = [], n = 0; n < e.length; n++) {
            var s = e[n],
                r = new i(s, this);
            o.push(r)
        }
        return o
    }, c._filterFindItemElements = function(t) { return o.filterFindElements(t, this.options.itemSelector) }, c.getItemElements = function() { return this.items.map(function(t) { return t.element }) }, c.layout = function() {
        this._resetLayout(), this._manageStamps();
        var t = this._getOption("layoutInstant"),
            e = void 0 !== t ? t : !this._isLayoutInited;
        this.layoutItems(this.items, e), this._isLayoutInited = !0
    }, c._init = c.layout, c._resetLayout = function() { this.getSize() }, c.getSize = function() { this.size = i(this.element) }, c._getMeasurement = function(t, e) {
        var o, n = this.options[t];
        n ? ("string" == typeof n ? o = this.element.querySelector(n) : n instanceof HTMLElement && (o = n), this[t] = o ? i(o)[e] : n) : this[t] = 0
    }, c.layoutItems = function(t, e) { t = this._getItemsForLayout(t), this._layoutItems(t, e), this._postLayout() }, c._getItemsForLayout = function(t) { return t.filter(function(t) { return !t.isIgnored }) }, c._layoutItems = function(t, e) {
        if (this._emitCompleteOnItems("layout", t), t && t.length) {
            var i = [];
            t.forEach(function(t) {
                var o = this._getItemLayoutPosition(t);
                o.item = t, o.isInstant = e || t.isLayoutInstant, i.push(o)
            }, this), this._processLayoutQueue(i)
        }
    }, c._getItemLayoutPosition = function() { return { x: 0, y: 0 } }, c._processLayoutQueue = function(t) { this.updateStagger(), t.forEach(function(t, e) { this._positionItem(t.item, t.x, t.y, t.isInstant, e) }, this) }, c.updateStagger = function() { var t = this.options.stagger; return null === t || void 0 === t ? void(this.stagger = 0) : (this.stagger = a(t), this.stagger) }, c._positionItem = function(t, e, i, o, n) { o ? t.goTo(e, i) : (t.stagger(n * this.stagger), t.moveTo(e, i)) }, c._postLayout = function() { this.resizeContainer() }, c.resizeContainer = function() {
        var t = this._getOption("resizeContainer");
        if (t) {
            var e = this._getContainerSize();
            e && (this._setContainerMeasure(e.width, !0), this._setContainerMeasure(e.height, !1))
        }
    }, c._getContainerSize = d, c._setContainerMeasure = function(t, e) {
        if (void 0 !== t) {
            var i = this.size;
            i.isBorderBox && (t += e ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth), t = Math.max(t, 0), this.element.style[e ? "width" : "height"] = t + "px"
        }
    }, c._emitCompleteOnItems = function(t, e) {
        function i() { n.dispatchEvent(t + "Complete", null, [e]) }

        function o() { r++, r == s && i() }
        var n = this,
            s = e.length;
        if (!e || !s) return void i();
        var r = 0;
        e.forEach(function(e) { e.once(t, o) })
    }, c.dispatchEvent = function(t, e, i) {
        var o = e ? [e].concat(i) : i;
        if (this.emitEvent(t, o), h)
            if (this.$element = this.$element || h(this.element), e) {
                var n = h.Event(e);
                n.type = t, this.$element.trigger(n, i)
            } else this.$element.trigger(t, i)
    }, c.ignore = function(t) {
        var e = this.getItem(t);
        e && (e.isIgnored = !0)
    }, c.unignore = function(t) {
        var e = this.getItem(t);
        e && delete e.isIgnored
    }, c.stamp = function(t) { t = this._find(t), t && (this.stamps = this.stamps.concat(t), t.forEach(this.ignore, this)) }, c.unstamp = function(t) { t = this._find(t), t && t.forEach(function(t) { o.removeFrom(this.stamps, t), this.unignore(t) }, this) }, c._find = function(t) { if (t) return "string" == typeof t && (t = this.element.querySelectorAll(t)), t = o.makeArray(t) }, c._manageStamps = function() { this.stamps && this.stamps.length && (this._getBoundingRect(), this.stamps.forEach(this._manageStamp, this)) }, c._getBoundingRect = function() {
        var t = this.element.getBoundingClientRect(),
            e = this.size;
        this._boundingRect = { left: t.left + e.paddingLeft + e.borderLeftWidth, top: t.top + e.paddingTop + e.borderTopWidth, right: t.right - (e.paddingRight + e.borderRightWidth), bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth) }
    }, c._manageStamp = d, c._getElementOffset = function(t) {
        var e = t.getBoundingClientRect(),
            o = this._boundingRect,
            n = i(t),
            s = { left: e.left - o.left - n.marginLeft, top: e.top - o.top - n.marginTop, right: o.right - e.right - n.marginRight, bottom: o.bottom - e.bottom - n.marginBottom };
        return s
    }, c.handleEvent = o.handleEvent, c.bindResize = function() { t.addEventListener("resize", this), this.isResizeBound = !0 }, c.unbindResize = function() { t.removeEventListener("resize", this), this.isResizeBound = !1 }, c.onresize = function() { this.resize() }, o.debounceMethod(s, "onresize", 100), c.resize = function() { this.isResizeBound && this.needsResizeLayout() && this.layout() }, c.needsResizeLayout = function() {
        var t = i(this.element),
            e = this.size && t;
        return e && t.innerWidth !== this.size.innerWidth
    }, c.addItems = function(t) { var e = this._itemize(t); return e.length && (this.items = this.items.concat(e)), e }, c.appended = function(t) {
        var e = this.addItems(t);
        e.length && (this.layoutItems(e, !0), this.reveal(e))
    }, c.prepended = function(t) {
        var e = this._itemize(t);
        if (e.length) {
            var i = this.items.slice(0);
            this.items = e.concat(i), this._resetLayout(), this._manageStamps(), this.layoutItems(e, !0), this.reveal(e), this.layoutItems(i)
        }
    }, c.reveal = function(t) {
        if (this._emitCompleteOnItems("reveal", t), t && t.length) {
            var e = this.updateStagger();
            t.forEach(function(t, i) { t.stagger(i * e), t.reveal() })
        }
    }, c.hide = function(t) {
        if (this._emitCompleteOnItems("hide", t), t && t.length) {
            var e = this.updateStagger();
            t.forEach(function(t, i) { t.stagger(i * e), t.hide() })
        }
    }, c.revealItemElements = function(t) {
        var e = this.getItems(t);
        this.reveal(e)
    }, c.hideItemElements = function(t) {
        var e = this.getItems(t);
        this.hide(e)
    }, c.getItem = function(t) { for (var e = 0; e < this.items.length; e++) { var i = this.items[e]; if (i.element == t) return i } }, c.getItems = function(t) {
        t = o.makeArray(t);
        var e = [];
        return t.forEach(function(t) {
            var i = this.getItem(t);
            i && e.push(i)
        }, this), e
    }, c.remove = function(t) {
        var e = this.getItems(t);
        this._emitCompleteOnItems("remove", e), e && e.length && e.forEach(function(t) { t.remove(), o.removeFrom(this.items, t) }, this)
    }, c.destroy = function() {
        var t = this.element.style;
        t.height = "", t.position = "", t.width = "", this.items.forEach(function(t) { t.destroy() }), this.unbindResize();
        var e = this.element.outlayerGUID;
        delete f[e], delete this.element.outlayerGUID, h && h.removeData(this.element, this.constructor.namespace)
    }, s.data = function(t) { t = o.getQueryElement(t); var e = t && t.outlayerGUID; return e && f[e] }, s.create = function(t, e) { var i = r(s); return i.defaults = o.extend({}, s.defaults), o.extend(i.defaults, e), i.compatOptions = o.extend({}, s.compatOptions), i.namespace = t, i.data = s.data, i.Item = r(n), o.htmlInit(i, t), h && h.bridget && h.bridget(t, i), i };
    var m = { ms: 1, s: 1e3 };
    return s.Item = n, s
}),
function(t, e) { "function" == typeof define && define.amd ? define("isotope-layout/js/item", ["outlayer/outlayer"], e) : "object" == typeof module && module.exports ? module.exports = e(require("outlayer")) : (t.Isotope = t.Isotope || {}, t.Isotope.Item = e(t.Outlayer)) }(window, function(t) {
    "use strict";

    function e() { t.Item.apply(this, arguments) }
    var i = e.prototype = Object.create(t.Item.prototype),
        o = i._create;
    i._create = function() { this.id = this.layout.itemGUID++, o.call(this), this.sortData = {} }, i.updateSortData = function() {
        if (!this.isIgnored) {
            this.sortData.id = this.id, this.sortData["original-order"] = this.id, this.sortData.random = Math.random();
            var t = this.layout.options.getSortData,
                e = this.layout._sorters;
            for (var i in t) {
                var o = e[i];
                this.sortData[i] = o(this.element, this)
            }
        }
    };
    var n = i.destroy;
    return i.destroy = function() { n.apply(this, arguments), this.css({ display: "" }) }, e
}),
function(t, e) { "function" == typeof define && define.amd ? define("isotope-layout/js/layout-mode", ["get-size/get-size", "outlayer/outlayer"], e) : "object" == typeof module && module.exports ? module.exports = e(require("get-size"), require("outlayer")) : (t.Isotope = t.Isotope || {}, t.Isotope.LayoutMode = e(t.getSize, t.Outlayer)) }(window, function(t, e) {
    "use strict";

    function i(t) { this.isotope = t, t && (this.options = t.options[this.namespace], this.element = t.element, this.items = t.filteredItems, this.size = t.size) }
    var o = i.prototype,
        n = ["_resetLayout", "_getItemLayoutPosition", "_manageStamp", "_getContainerSize", "_getElementOffset", "needsResizeLayout", "_getOption"];
    return n.forEach(function(t) { o[t] = function() { return e.prototype[t].apply(this.isotope, arguments) } }), o.needsVerticalResizeLayout = function() {
        var e = t(this.isotope.element),
            i = this.isotope.size && e;
        return i && e.innerHeight != this.isotope.size.innerHeight
    }, o._getMeasurement = function() { this.isotope._getMeasurement.apply(this, arguments) }, o.getColumnWidth = function() { this.getSegmentSize("column", "Width") }, o.getRowHeight = function() { this.getSegmentSize("row", "Height") }, o.getSegmentSize = function(t, e) {
        var i = t + e,
            o = "outer" + e;
        if (this._getMeasurement(i, o), !this[i]) {
            var n = this.getFirstItemSize();
            this[i] = n && n[o] || this.isotope.size["inner" + e]
        }
    }, o.getFirstItemSize = function() { var e = this.isotope.filteredItems[0]; return e && e.element && t(e.element) }, o.layout = function() { this.isotope.layout.apply(this.isotope, arguments) }, o.getSize = function() { this.isotope.getSize(), this.size = this.isotope.size }, i.modes = {}, i.create = function(t, e) {
        function n() { i.apply(this, arguments) }
        return n.prototype = Object.create(o), n.prototype.constructor = n, e && (n.options = e), n.prototype.namespace = t, i.modes[t] = n, n
    }, i
}),
function(t, e) { "function" == typeof define && define.amd ? define("masonry-layout/masonry", ["outlayer/outlayer", "get-size/get-size"], e) : "object" == typeof module && module.exports ? module.exports = e(require("outlayer"), require("get-size")) : t.Masonry = e(t.Outlayer, t.getSize) }(window, function(t, e) {
    var i = t.create("masonry");
    i.compatOptions.fitWidth = "isFitWidth";
    var o = i.prototype;
    return o._resetLayout = function() {
        this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns(), this.colYs = [];
        for (var t = 0; t < this.cols; t++) this.colYs.push(0);
        this.maxY = 0, this.horizontalColIndex = 0
    }, o.measureColumns = function() {
        if (this.getContainerWidth(), !this.columnWidth) {
            var t = this.items[0],
                i = t && t.element;
            this.columnWidth = i && e(i).outerWidth || this.containerWidth
        }
        var o = this.columnWidth += this.gutter,
            n = this.containerWidth + this.gutter,
            s = n / o,
            r = o - n % o,
            a = r && r < 1 ? "round" : "floor";
        s = Math[a](s), this.cols = Math.max(s, 1)
    }, o.getContainerWidth = function() {
        var t = this._getOption("fitWidth"),
            i = t ? this.element.parentNode : this.element,
            o = e(i);
        this.containerWidth = o && o.innerWidth
    }, o._getItemLayoutPosition = function(t) {
        t.getSize();
        var e = t.size.outerWidth % this.columnWidth,
            i = e && e < 1 ? "round" : "ceil",
            o = Math[i](t.size.outerWidth / this.columnWidth);
        o = Math.min(o, this.cols);
        for (var n = this.options.horizontalOrder ? "_getHorizontalColPosition" : "_getTopColPosition", s = this[n](o, t), r = { x: this.columnWidth * s.col, y: s.y }, a = s.y + t.size.outerHeight, u = o + s.col, h = s.col; h < u; h++) this.colYs[h] = a;
        return r
    }, o._getTopColPosition = function(t) {
        var e = this._getTopColGroup(t),
            i = Math.min.apply(Math, e);
        return { col: e.indexOf(i), y: i }
    }, o._getTopColGroup = function(t) { if (t < 2) return this.colYs; for (var e = [], i = this.cols + 1 - t, o = 0; o < i; o++) e[o] = this._getColGroupY(o, t); return e }, o._getColGroupY = function(t, e) { if (e < 2) return this.colYs[t]; var i = this.colYs.slice(t, t + e); return Math.max.apply(Math, i) }, o._getHorizontalColPosition = function(t, e) {
        var i = this.horizontalColIndex % this.cols,
            o = t > 1 && i + t > this.cols;
        i = o ? 0 : i;
        var n = e.size.outerWidth && e.size.outerHeight;
        return this.horizontalColIndex = n ? i + t : this.horizontalColIndex, { col: i, y: this._getColGroupY(i, t) }
    }, o._manageStamp = function(t) {
        var i = e(t),
            o = this._getElementOffset(t),
            n = this._getOption("originLeft"),
            s = n ? o.left : o.right,
            r = s + i.outerWidth,
            a = Math.floor(s / this.columnWidth);
        a = Math.max(0, a);
        var u = Math.floor(r / this.columnWidth);
        u -= r % this.columnWidth ? 0 : 1, u = Math.min(this.cols - 1, u);
        for (var h = this._getOption("originTop"), d = (h ? o.top : o.bottom) + i.outerHeight, l = a; l <= u; l++) this.colYs[l] = Math.max(d, this.colYs[l])
    }, o._getContainerSize = function() { this.maxY = Math.max.apply(Math, this.colYs); var t = { height: this.maxY }; return this._getOption("fitWidth") && (t.width = this._getContainerFitWidth()), t }, o._getContainerFitWidth = function() { for (var t = 0, e = this.cols; --e && 0 === this.colYs[e];) t++; return (this.cols - t) * this.columnWidth - this.gutter }, o.needsResizeLayout = function() { var t = this.containerWidth; return this.getContainerWidth(), t != this.containerWidth }, i
}),
function(t, e) { "function" == typeof define && define.amd ? define("isotope-layout/js/layout-modes/masonry", ["../layout-mode", "masonry-layout/masonry"], e) : "object" == typeof module && module.exports ? module.exports = e(require("../layout-mode"), require("masonry-layout")) : e(t.Isotope.LayoutMode, t.Masonry) }(window, function(t, e) {
    "use strict";
    var i = t.create("masonry"),
        o = i.prototype,
        n = { _getElementOffset: !0, layout: !0, _getMeasurement: !0 };
    for (var s in e.prototype) n[s] || (o[s] = e.prototype[s]);
    var r = o.measureColumns;
    o.measureColumns = function() { this.items = this.isotope.filteredItems, r.call(this) };
    var a = o._getOption;
    return o._getOption = function(t) { return "fitWidth" == t ? void 0 !== this.options.isFitWidth ? this.options.isFitWidth : this.options.fitWidth : a.apply(this.isotope, arguments) }, i
}),
function(t, e) { "function" == typeof define && define.amd ? define("isotope-layout/js/layout-modes/fit-rows", ["../layout-mode"], e) : "object" == typeof exports ? module.exports = e(require("../layout-mode")) : e(t.Isotope.LayoutMode) }(window, function(t) {
    "use strict";
    var e = t.create("fitRows"),
        i = e.prototype;
    return i._resetLayout = function() { this.x = 0, this.y = 0, this.maxY = 0, this._getMeasurement("gutter", "outerWidth") }, i._getItemLayoutPosition = function(t) {
        t.getSize();
        var e = t.size.outerWidth + this.gutter,
            i = this.isotope.size.innerWidth + this.gutter;
        0 !== this.x && e + this.x > i && (this.x = 0, this.y = this.maxY);
        var o = { x: this.x, y: this.y };
        return this.maxY = Math.max(this.maxY, this.y + t.size.outerHeight), this.x += e, o
    }, i._getContainerSize = function() { return { height: this.maxY } }, e
}),
function(t, e) { "function" == typeof define && define.amd ? define("isotope-layout/js/layout-modes/vertical", ["../layout-mode"], e) : "object" == typeof module && module.exports ? module.exports = e(require("../layout-mode")) : e(t.Isotope.LayoutMode) }(window, function(t) {
    "use strict";
    var e = t.create("vertical", { horizontalAlignment: 0 }),
        i = e.prototype;
    return i._resetLayout = function() { this.y = 0 }, i._getItemLayoutPosition = function(t) {
        t.getSize();
        var e = (this.isotope.size.innerWidth - t.size.outerWidth) * this.options.horizontalAlignment,
            i = this.y;
        return this.y += t.size.outerHeight, { x: e, y: i }
    }, i._getContainerSize = function() { return { height: this.y } }, e
}),
function(t, e) { "function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size", "desandro-matches-selector/matches-selector", "fizzy-ui-utils/utils", "isotope-layout/js/item", "isotope-layout/js/layout-mode", "isotope-layout/js/layout-modes/masonry", "isotope-layout/js/layout-modes/fit-rows", "isotope-layout/js/layout-modes/vertical"], function(i, o, n, s, r, a) { return e(t, i, o, n, s, r, a) }) : "object" == typeof module && module.exports ? module.exports = e(t, require("outlayer"), require("get-size"), require("desandro-matches-selector"), require("fizzy-ui-utils"), require("isotope-layout/js/item"), require("isotope-layout/js/layout-mode"), require("isotope-layout/js/layout-modes/masonry"), require("isotope-layout/js/layout-modes/fit-rows"), require("isotope-layout/js/layout-modes/vertical")) : t.Isotope = e(t, t.Outlayer, t.getSize, t.matchesSelector, t.fizzyUIUtils, t.Isotope.Item, t.Isotope.LayoutMode) }(window, function(t, e, i, o, n, s, r) {
    function a(t, e) {
        return function(i, o) {
            for (var n = 0; n < t.length; n++) {
                var s = t[n],
                    r = i.sortData[s],
                    a = o.sortData[s];
                if (r > a || r < a) {
                    var u = void 0 !== e[s] ? e[s] : e,
                        h = u ? 1 : -1;
                    return (r > a ? 1 : -1) * h
                }
            }
            return 0
        }
    }
    var u = t.jQuery,
        h = String.prototype.trim ? function(t) { return t.trim() } : function(t) { return t.replace(/^\s+|\s+$/g, "") },
        d = e.create("isotope", { layoutMode: "masonry", isJQueryFiltering: !0, sortAscending: !0 });
    d.Item = s, d.LayoutMode = r;
    var l = d.prototype;
    l._create = function() { this.itemGUID = 0, this._sorters = {}, this._getSorters(), e.prototype._create.call(this), this.modes = {}, this.filteredItems = this.items, this.sortHistory = ["original-order"]; for (var t in r.modes) this._initLayoutMode(t) }, l.reloadItems = function() { this.itemGUID = 0, e.prototype.reloadItems.call(this) }, l._itemize = function() {
        for (var t = e.prototype._itemize.apply(this, arguments), i = 0; i < t.length; i++) {
            var o = t[i];
            o.id = this.itemGUID++
        }
        return this._updateItemsSortData(t), t
    }, l._initLayoutMode = function(t) {
        var e = r.modes[t],
            i = this.options[t] || {};
        this.options[t] = e.options ? n.extend(e.options, i) : i, this.modes[t] = new e(this)
    }, l.layout = function() { return !this._isLayoutInited && this._getOption("initLayout") ? void this.arrange() : void this._layout() }, l._layout = function() {
        var t = this._getIsInstant();
        this._resetLayout(), this._manageStamps(), this.layoutItems(this.filteredItems, t), this._isLayoutInited = !0
    }, l.arrange = function(t) {
        this.option(t), this._getIsInstant();
        var e = this._filter(this.items);
        this.filteredItems = e.matches, this._bindArrangeComplete(), this._isInstant ? this._noTransition(this._hideReveal, [e]) : this._hideReveal(e), this._sort(), this._layout()
    }, l._init = l.arrange, l._hideReveal = function(t) { this.reveal(t.needReveal), this.hide(t.needHide) }, l._getIsInstant = function() {
        var t = this._getOption("layoutInstant"),
            e = void 0 !== t ? t : !this._isLayoutInited;
        return this._isInstant = e, e
    }, l._bindArrangeComplete = function() {
        function t() { e && i && o && n.dispatchEvent("arrangeComplete", null, [n.filteredItems]) }
        var e, i, o, n = this;
        this.once("layoutComplete", function() { e = !0, t() }), this.once("hideComplete", function() { i = !0, t() }), this.once("revealComplete", function() { o = !0, t() })
    }, l._filter = function(t) {
        var e = this.options.filter;
        e = e || "*";
        for (var i = [], o = [], n = [], s = this._getFilterTest(e), r = 0; r < t.length; r++) {
            var a = t[r];
            if (!a.isIgnored) {
                var u = s(a);
                u && i.push(a), u && a.isHidden ? o.push(a) : u || a.isHidden || n.push(a)
            }
        }
        return { matches: i, needReveal: o, needHide: n }
    }, l._getFilterTest = function(t) {
        return u && this.options.isJQueryFiltering ? function(e) { return u(e.element).is(t) } : "function" == typeof t ? function(e) { return t(e.element) } : function(e) { return o(e.element, t) }
    }, l.updateSortData = function(t) {
        var e;
        t ? (t = n.makeArray(t), e = this.getItems(t)) : e = this.items, this._getSorters(), this._updateItemsSortData(e)
    }, l._getSorters = function() {
        var t = this.options.getSortData;
        for (var e in t) {
            var i = t[e];
            this._sorters[e] = f(i)
        }
    }, l._updateItemsSortData = function(t) {
        for (var e = t && t.length, i = 0; e && i < e; i++) {
            var o = t[i];
            o.updateSortData()
        }
    };
    var f = function() {
        function t(t) {
            if ("string" != typeof t) return t;
            var i = h(t).split(" "),
                o = i[0],
                n = o.match(/^\[(.+)\]$/),
                s = n && n[1],
                r = e(s, o),
                a = d.sortDataParsers[i[1]];
            return t = a ? function(t) { return t && a(r(t)) } : function(t) { return t && r(t) }
        }

        function e(t, e) { return t ? function(e) { return e.getAttribute(t) } : function(t) { var i = t.querySelector(e); return i && i.textContent } }
        return t
    }();
    d.sortDataParsers = { parseInt: function(t) { return parseInt(t, 10) }, parseFloat: function(t) { return parseFloat(t) } }, l._sort = function() {
        if (this.options.sortBy) {
            var t = n.makeArray(this.options.sortBy);
            this._getIsSameSortBy(t) || (this.sortHistory = t.concat(this.sortHistory));
            var e = a(this.sortHistory, this.options.sortAscending);
            this.filteredItems.sort(e)
        }
    }, l._getIsSameSortBy = function(t) {
        for (var e = 0; e < t.length; e++)
            if (t[e] != this.sortHistory[e]) return !1;
        return !0
    }, l._mode = function() {
        var t = this.options.layoutMode,
            e = this.modes[t];
        if (!e) throw new Error("No layout mode: " + t);
        return e.options = this.options[t], e
    }, l._resetLayout = function() { e.prototype._resetLayout.call(this), this._mode()._resetLayout() }, l._getItemLayoutPosition = function(t) { return this._mode()._getItemLayoutPosition(t) }, l._manageStamp = function(t) { this._mode()._manageStamp(t) }, l._getContainerSize = function() { return this._mode()._getContainerSize() }, l.needsResizeLayout = function() { return this._mode().needsResizeLayout() }, l.appended = function(t) {
        var e = this.addItems(t);
        if (e.length) {
            var i = this._filterRevealAdded(e);
            this.filteredItems = this.filteredItems.concat(i)
        }
    }, l.prepended = function(t) {
        var e = this._itemize(t);
        if (e.length) {
            this._resetLayout(), this._manageStamps();
            var i = this._filterRevealAdded(e);
            this.layoutItems(this.filteredItems), this.filteredItems = i.concat(this.filteredItems), this.items = e.concat(this.items)
        }
    }, l._filterRevealAdded = function(t) { var e = this._filter(t); return this.hide(e.needHide), this.reveal(e.matches), this.layoutItems(e.matches, !0), e.matches }, l.insert = function(t) {
        var e = this.addItems(t);
        if (e.length) {
            var i, o, n = e.length;
            for (i = 0; i < n; i++) o = e[i], this.element.appendChild(o.element);
            var s = this._filter(e).matches;
            for (i = 0; i < n; i++) e[i].isLayoutInstant = !0;
            for (this.arrange(), i = 0; i < n; i++) delete e[i].isLayoutInstant;
            this.reveal(s)
        }
    };
    var c = l.remove;
    return l.remove = function(t) {
        t = n.makeArray(t);
        var e = this.getItems(t);
        c.call(this, t);
        for (var i = e && e.length, o = 0; i && o < i; o++) {
            var s = e[o];
            n.removeFrom(this.filteredItems, s)
        }
    }, l.shuffle = function() {
        for (var t = 0; t < this.items.length; t++) {
            var e = this.items[t];
            e.sortData.random = Math.random()
        }
        this.options.sortBy = "random", this._sort(), this._layout()
    }, l._noTransition = function(t, e) {
        var i = this.options.transitionDuration;
        this.options.transitionDuration = 0;
        var o = t.apply(this, e);
        return this.options.transitionDuration = i, o
    }, l.getFilteredItemElements = function() { return this.filteredItems.map(function(t) { return t.element }) }, d
});