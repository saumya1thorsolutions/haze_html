/*!
 * Copyright (c) 2021 Momo Bassit.
 * Licensed under the MIT License (MIT)
 * https://github.com/mdbassit/Coloris
 */
!function(u, d, s) {
    var f, h, v, i, o, y, c, r, p, g, b, m, a = d.createElement("canvas").getContext("2d"), w = {
        r: 0,
        g: 0,
        b: 0,
        a: 1
    }, k = {
        el: "[data-coloris]",
        parent: null,
        theme: "light",
        wrap: !0,
        margin: 2,
        format: "hex",
        swatches: [],
        a11y: {
            open: "Open color picker",
            close: "Close color picker",
            marker: "Saturation: {s}. Brightness: {v}.",
            hueSlider: "Hue slider",
            alphaSlider: "Opacity slider",
            input: "Color value field",
            swatch: "Color swatch",
            instruction: "Saturation and brightness selector. Use up, down, left and right arrow keys to select."
        }
    };
    function n(e) {
        if ("object" == typeof e)
            for (var t in e)
                switch (t) {
                case "el":
                    x(e.el),
                    !1 !== e.wrap && E(e.el);
                    break;
                case "parent":
                    k.parent = d.querySelector(e.parent),
                    k.parent && k.parent.appendChild(f);
                    break;
                case "theme":
                    f.setAttribute("class", "clr-picker clr-" + e.theme);
                    break;
                case "margin":
                    e.margin *= 1,
                    k.margin = (isNaN(e.margin) ? k : e).margin;
                    break;
                case "wrap":
                    e.el && e.wrap && E(e.el);
                    break;
                case "format":
                    k.format = e.format;
                    break;
                case "swatches":
                    Array.isArray(e.swatches) && function() {
                        var a = [];
                        e.swatches.forEach(function(e, t) {
                            a.push('<button id="clr-swatch-' + t + '" aria-labelledby="clr-swatch-label clr-swatch-' + t + '" style="color: ' + e + ';">' + e + "</button>")
                        }),
                        a.length && (N("clr-swatches").innerHTML = "<div>" + a.join("") + "</div>")
                    }();
                    break;
                case "a11y":
                    var a, r, l = e.a11y, n = !1;
                    if ("object" == typeof l)
                        for (var i in l)
                            l[i] && k.a11y[i] && (k.a11y[i] = l[i],
                            n = !0);
                    n && (a = N("clr-open-label"),
                    r = N("clr-swatch-label"),
                    a.innerHTML = k.a11y.open,
                    r.innerHTML = k.a11y.swatch,
                    o.setAttribute("aria-label", k.a11y.close),
                    c.setAttribute("aria-label", k.a11y.hueSlider),
                    p.setAttribute("aria-label", k.a11y.alphaSlider),
                    y.setAttribute("aria-label", k.a11y.input),
                    h.setAttribute("aria-label", k.a11y.instruction))
                }
    }
    function x(e) {
        D(d, "click", e, function(e) {
            var t = k.parent
              , a = e.target.getBoundingClientRect()
              , r = u.scrollY
              , l = {
                left: !1,
                top: !1
            }
              , n = {
                x: 0,
                y: 0
            }
              , i = a.x
              , o = r + a.y + a.height + k.margin;
            b = e.target,
            m = b.value,
            f.classList.add("clr-open");
            var c, s = f.offsetWidth, p = f.offsetHeight;
            t ? (c = u.getComputedStyle(t),
            e = parseFloat(c.marginTop),
            c = parseFloat(c.borderTopWidth),
            (n = t.getBoundingClientRect()).y += c + r,
            i -= n.x,
            o -= n.y,
            i + s > t.clientWidth && (i += a.width - s,
            l.left = !0),
            o + p > t.clientHeight - e && (o -= a.height + p + 2 * k.margin,
            l.top = !0),
            o += t.scrollTop) : (i + s > d.documentElement.clientWidth && (i += a.width - s,
            l.left = !0),
            o + p - r > d.documentElement.clientHeight && (o = r + a.y - p - k.margin,
            l.top = !0)),
            f.style.left = i + "px",
            f.style.top = o + "px",
            v = {
                width: h.offsetWidth,
                height: h.offsetHeight,
                x: f.offsetLeft + n.x,
                y: f.offsetTop + n.y
            },
            f.classList.toggle("clr-left", l.left),
            f.classList.toggle("clr-top", l.top),
            S(b.value),
            y.focus({
                preventScroll: !0
            })
        }),
        D(d, "input", e, function(e) {
            var t = e.target.parentNode;
            t.classList.contains("clr-field") && (t.style.color = e.target.value)
        })
    }
    function E(e) {
        d.querySelectorAll(e).forEach(function(e) {
            var t, a = e.parentNode;
            a.classList.contains("clr-field") || ((t = d.createElement("div")).innerHTML = '<button aria-labelledby="clr-open-label"></button>',
            a.insertBefore(t, e),
            t.setAttribute("class", "clr-field"),
            t.style.color = e.value,
            t.appendChild(e))
        })
    }
    function L(e) {
        b && (e && m !== b.value && b.dispatchEvent(new Event("change",{
            bubbles: !0
        })),
        f.classList.remove("clr-open"),
        b.focus({
            preventScroll: !0
        }),
        b = null)
    }
    function S(e) {
        var t = function(e) {
            a.fillStyle = "#000",
            a.fillStyle = e,
            e = (e = /^((rgba)|rgb)[\D]+([\d.]+)[\D]+([\d.]+)[\D]+([\d.]+)[\D]*?([\d.]+|$)/i.exec(a.fillStyle)) ? {
                r: +e[3],
                g: +e[4],
                b: +e[5],
                a: +e[6]
            } : (e = a.fillStyle.replace("#", "").match(/.{2}/g).map(function(e) {
                return parseInt(e, 16)
            }),
            {
                r: e[0],
                g: e[1],
                b: e[2],
                a: 1
            });
            return e
        }(e)
          , e = function(e) {
            var t = e.r / 255
              , a = e.g / 255
              , r = e.b / 255
              , l = s.max(t, a, r)
              , n = s.min(t, a, r)
              , i = l - n
              , o = l
              , c = 0
              , n = 0;
            i && (l === t && (c = (a - r) / i),
            l === a && (c = 2 + (r - t) / i),
            l === r && (c = 4 + (t - a) / i),
            l && (n = i / l));
            return {
                h: (c = s.floor(60 * c)) < 0 ? c + 360 : c,
                s: s.round(100 * n),
                v: s.round(100 * o),
                a: e.a
            }
        }(t);
        T(e.s, e.v),
        C(t),
        c.value = e.h,
        f.style.color = "hsl(" + e.h + ", 100%, 50%)",
        r.style.left = e.h / 360 * 100 + "%",
        i.style.left = v.width * e.s / 100 + "px",
        i.style.top = 100 - v.height * e.v / 100 + "px",
        p.value = 100 * e.a,
        g.style.left = 100 * e.a + "%"
    }
    function l() {
        b && (b.value = y.value,
        b.dispatchEvent(new Event("input",{
            bubbles: !0
        })))
    }
    function A(e, t) {
        e = {
            h: +c.value,
            s: e / v.width * 100,
            v: 100 - t / v.height * 100,
            a: p.value / 100
        },
        t = function(e) {
            var t = e.s / 100
              , a = e.v / 100
              , r = t * a
              , l = e.h / 60
              , n = r * (1 - s.abs(l % 2 - 1))
              , i = a - r;
            r += i,
            n += i;
            t = s.floor(l) % 6,
            a = [r, n, i, i, n, r][t],
            l = [n, r, r, n, i, i][t],
            t = [i, i, n, r, r, n][t];
            return {
                r: s.round(255 * a),
                g: s.round(255 * l),
                b: s.round(255 * t),
                a: e.a
            }
        }(e);
        T(e.s, e.v),
        C(t),
        l()
    }
    function T(e, t) {
        var a = k.a11y.marker;
        e = +e.toFixed(1),
        t = +t.toFixed(1),
        a = (a = a.replace("{s}", e)).replace("{v}", t),
        i.setAttribute("aria-label", a)
    }
    function t(e) {
        var t = {
            pageX: ((a = e).changedTouches ? a.changedTouches[0] : a).pageX,
            pageY: (a.changedTouches ? a.changedTouches[0] : a).pageY
        }
          , a = t.pageX - v.x
          , t = t.pageY - v.y;
        k.parent && (t += k.parent.scrollTop),
        a = a < 0 ? 0 : a > v.width ? v.width : a,
        t = t < 0 ? 0 : t > v.height ? v.height : t,
        i.style.left = a + "px",
        i.style.top = t + "px",
        A(a, t),
        e.preventDefault(),
        e.stopPropagation()
    }
    function C(e) {
        for (var t in e)
            w[t] = e[t];
        var a, r = function(e) {
            var t = e.r.toString(16)
              , a = e.g.toString(16)
              , r = e.b.toString(16)
              , l = "";
            e.r < 16 && (t = "0" + t);
            e.g < 16 && (a = "0" + a);
            e.b < 16 && (r = "0" + r);
            e.a < 1 && (e = 255 * e.a | 0,
            l = e.toString(16),
            e < 16 && (l = "0" + l));
            return "#" + t + a + r + l
        }(w), l = r.substring(0, 7), n = 1 === (a = w).a ? "rgb(" + a.r + "," + a.g + "," + a.b + ")" : "rgba(" + a.r + "," + a.g + "," + a.b + "," + a.a + ")";
        switch (i.style.color = l,
        g.parentNode.style.color = l,
        g.style.color = r,
        o.style.color = r,
        y.value = r,
        h.style.display = "none",
        h.offsetHeight,
        h.style.display = "",
        g.nextElementSibling.style.display = "none",
        g.nextElementSibling.offsetHeight,
        g.nextElementSibling.style.display = "",
        k.format) {
        case "mixed":
            if (1 === w.a)
                break;
        case "rgb":
            y.value = n
        }
    }
    function e() {
        var e = +c.value
          , t = +i.style.left.replace("px", "")
          , a = +i.style.top.replace("px", "");
        f.style.color = "hsl(" + e + ", 100%, 50%)",
        r.style.left = e / 360 * 100 + "%",
        A(t, a)
    }
    function H() {
        var e = p.value / 100;
        g.style.left = 100 * e + "%",
        C({
            a: e
        }),
        l()
    }
    function N(e) {
        return d.getElementById(e)
    }
    function D(e, t, a, r) {
        var l = Element.prototype.matches || Element.prototype.msMatchesSelector;
        "string" == typeof a ? e.addEventListener(t, function(e) {
            l.call(e.target, a) && r.call(e.target, e)
        }) : (r = a,
        e.addEventListener(t, r))
    }
    function M(e, t) {
        t = void 0 !== t ? t : [],
        "loading" !== d.readyState ? e.apply(void 0, t) : d.addEventListener("DOMContentLoaded", function() {
            e.apply(void 0, t)
        })
    }
    void 0 !== NodeList && NodeList.prototype && !NodeList.prototype.forEach && (NodeList.prototype.forEach = Array.prototype.forEach),
    u.Coloris = function() {
        var l = {
            set: n,
            wrap: E,
            close: L
        };
        function e(e) {
            M(function() {
                e && ("string" == typeof e ? x : n)(e)
            })
        }
        for (var t in l)
            !function(r) {
                e[r] = function() {
                    for (var e = arguments.length, t = new Array(e), a = 0; a < e; a++)
                        t[a] = arguments[a];
                    M(l[r], t)
                }
            }(t);
        return e
    }(),
    M(function() {
        (f = d.createElement("div")).setAttribute("id", "clr-picker"),
        f.setAttribute("class", "clr-picker clr-" + k.theme),
        f.innerHTML = '<input id="clr-color-value" class="clr-color" type="text" value="" aria-label="' + k.a11y.input + '"><div id="clr-color-area" class="clr-gradient" role="application" aria-label="' + k.a11y.instruction + '"><div id="clr-color-marker" class="clr-marker" tabindex="0"></div></div><div class="clr-hue"><input id="clr-hue-slider" type="range" min="0" max="360" step="1" aria-label="' + k.a11y.hueSlider + '"><div id="clr-hue-marker"></div></div><div class="clr-alpha"><input id="clr-alpha-slider" type="range" min="0" max="100" step="1" aria-label="' + k.a11y.alphaSlider + '"><div id="clr-alpha-marker"></div><span></span></div><div id="clr-swatches" class="clr-swatches"></div><button id="clr-color-preview" class="clr-preview" aria-label="' + k.a11y.close + '"></button><span id="clr-open-label" hidden>' + k.a11y.open + '</span><span id="clr-swatch-label" hidden>' + k.a11y.swatch + "</span>",
        d.body.appendChild(f),
        h = N("clr-color-area"),
        i = N("clr-color-marker"),
        o = N("clr-color-preview"),
        y = N("clr-color-value"),
        c = N("clr-hue-slider"),
        r = N("clr-hue-marker"),
        p = N("clr-alpha-slider"),
        g = N("clr-alpha-marker"),
        x(k.el),
        E(k.el),
        D(f, "mousedown", function(e) {
            f.classList.remove("clr-keyboard-nav"),
            e.stopPropagation()
        }),
        D(h, "mousedown", function(e) {
            D(d, "mousemove", t)
        }),
        D(h, "touchstart", function(e) {
            d.addEventListener("touchmove", t, {
                passive: !1
            })
        }),
        D(i, "mousedown", function(e) {
            D(d, "mousemove", t)
        }),
        D(i, "touchstart", function(e) {
            d.addEventListener("touchmove", t, {
                passive: !1
            })
        }),
        D(y, "change", function(e) {
            S(y.value),
            l()
        }),
        D(o, "click", function(e) {
            L(!0)
        }),
        D(f, "click", ".clr-swatches button", function(e) {
            S(e.target.style.color),
            l()
        }),
        D(d, "mouseup", function(e) {
            d.removeEventListener("mousemove", t)
        }),
        D(d, "touchend", function(e) {
            d.removeEventListener("touchmove", t)
        }),
        D(d, "mousedown", function(e) {
            f.classList.remove("clr-keyboard-nav"),
            L(!0)
        }),
        D(d, "keydown", function(e) {
            "Escape" === e.key ? L(!0) : "Tab" === e.key && f.classList.add("clr-keyboard-nav")
        }),
        D(d, "click", ".clr-field button", function(e) {
            e.target.nextElementSibling.dispatchEvent(new Event("click",{
                bubbles: !0
            }))
        }),
        D(i, "keydown", function(e) {
            var t = {
                ArrowUp: [0, -1],
                ArrowDown: [0, 1],
                ArrowLeft: [-1, 0],
                ArrowRight: [1, 0]
            };
            -1 !== Object.keys(t).indexOf(e.key) && (!function(e, t) {
                e = +i.style.left.replace("px", "") + e,
                t = +i.style.top.replace("px", "") + t,
                i.style.left = e + "px",
                i.style.top = t + "px",
                A(e, t)
            }
            .apply(void 0, t[e.key]),
            e.preventDefault())
        }),
        D(h, "click", t),
        D(c, "input", e),
        D(p, "input", H)
    })
}(window, document, Math);
