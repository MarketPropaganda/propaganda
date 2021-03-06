/*
 * http://worrydream.com
 * (c) 2011 Bret Victor.  MIT open-source license.
 * 
 * See http://worrydream.com/Home2011/Script/ for uncompressed.
 * 
 */
(function() {
	this.MooTools = {
		version: "1.3.1",
		build: "af48c8d589f43f32212f9bb8ff68a127e6a3ba6c"
	};
	var o = this.typeOf = function(i) {
		if(i == null) {
			return "null"
		}
		if(i.$family) {
			return i.$family()
		}
		if(i.nodeName) {
			if(i.nodeType == 1) {
				return "element"
			}
			if(i.nodeType == 3) {
				return(/\S/).test(i.nodeValue) ? "textnode" : "whitespace"
			}
		} else {
			if(typeof i.length == "number") {
				if(i.callee) {
					return "arguments"
				}
				if("item" in i) {
					return "collection"
				}
			}
		}
		return typeof i
	};
	var j = this.instanceOf = function(t, i) {
		if(t == null) {
			return false
		}
		var s = t.$constructor || t.constructor;
		while(s) {
			if(s === i) {
				return true
			}
			s = s.parent
		}
		return t instanceof i
	};
	var f = this.Function;
	var p = true;
	for(var k in {
			toString: 1
		}) {
		p = null
	}
	if(p) {
		p = ["hasOwnProperty", "valueOf", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "constructor"]
	}
	f.prototype.overloadSetter = function(s) {
		var i = this;
		return function(u, t) {
			if(u == null) {
				return this
			}
			if(s || typeof u != "string") {
				for(var v in u) {
					i.call(this, v, u[v])
				}
				if(p) {
					for(var w = p.length; w--;) {
						v = p[w];
						if(u.hasOwnProperty(v)) {
							i.call(this, v, u[v])
						}
					}
				}
			} else {
				i.call(this, u, t)
			}
			return this
		}
	};
	f.prototype.overloadGetter = function(s) {
		var i = this;
		return function(u) {
			var v, t;
			if(s || typeof u != "string") {
				v = u
			} else {
				if(arguments.length > 1) {
					v = arguments
				}
			}
			if(v) {
				t = {};
				for(var w = 0; w < v.length; w++) {
					t[v[w]] = i.call(this, v[w])
				}
			} else {
				t = i.call(this, u)
			}
			return t
		}
	};
	f.prototype.extend = function(i, s) {
		this[i] = s
	}.overloadSetter();
	f.prototype.implement = function(i, s) {
		this.prototype[i] = s
	}.overloadSetter();
	var n = Array.prototype.slice;
	f.from = function(i) {
		return(o(i) == "function") ? i : function() {
			return i
		}
	};
	Array.from = function(i) {
		if(i == null) {
			return []
		}
		return(a.isEnumerable(i) && typeof i != "string") ? (o(i) == "array") ? i : n.call(i) : [i]
	};
	Number.from = function(s) {
		var i = parseFloat(s);
		return isFinite(i) ? i : null
	};
	String.from = function(i) {
		return i + ""
	};
	f.implement({
		hide: function() {
			this.$hidden = true;
			return this
		},
		protect: function() {
			this.$protected = true;
			return this
		}
	});
	var a = this.Type = function(u, t) {
		if(u) {
			var s = u.toLowerCase();
			var i = function(v) {
				return(o(v) == s)
			};
			a["is" + u] = i;
			if(t != null) {
				t.prototype.$family = (function() {
					return s
				}).hide()
			}
		}
		if(t == null) {
			return null
		}
		t.extend(this);
		t.$constructor = a;
		t.prototype.$constructor = t;
		return t
	};
	var e = Object.prototype.toString;
	a.isEnumerable = function(i) {
		return(i != null && typeof i.length == "number" && e.call(i) != "[object Function]")
	};
	var q = {};
	var r = function(i) {
		var s = o(i.prototype);
		return q[s] || (q[s] = [])
	};
	var b = function(t, x) {
		if(x && x.$hidden) {
			return
		}
		var s = r(this);
		for(var u = 0; u < s.length; u++) {
			var w = s[u];
			if(o(w) == "type") {
				b.call(w, t, x)
			} else {
				w.call(this, t, x)
			}
		}
		var v = this.prototype[t];
		if(v == null || !v.$protected) {
			this.prototype[t] = x
		}
		if(this[t] == null && o(x) == "function") {
			m.call(this, t, function(i) {
				return x.apply(i, n.call(arguments, 1))
			})
		}
	};
	var m = function(i, t) {
		if(t && t.$hidden) {
			return
		}
		var s = this[i];
		if(s == null || !s.$protected) {
			this[i] = t
		}
	};
	a.implement({
		implement: b.overloadSetter(),
		extend: m.overloadSetter(),
		alias: function(i, s) {
			b.call(this, i, this.prototype[s])
		}.overloadSetter(),
		mirror: function(i) {
			r(this).push(i);
			return this
		}
	});
	new a("Type", a);
	var d = function(s, w, u) {
		var t = (w != Object),
			A = w.prototype;
		if(t) {
			w = new a(s, w)
		}
		for(var x = 0, v = u.length; x < v; x++) {
			var B = u[x],
				z = w[B],
				y = A[B];
			if(z) {
				z.protect()
			}
			if(t && y) {
				delete A[B];
				A[B] = y.protect()
			}
		}
		if(t) {
			w.implement(A)
		}
		return d
	};
	d("String", String, ["charAt", "charCodeAt", "concat", "indexOf", "lastIndexOf", "match", "quote", "replace", "search", "slice", "split", "substr", "substring", "toLowerCase", "toUpperCase"])("Array", Array, ["pop", "push", "reverse", "shift", "sort", "splice", "unshift", "concat", "join", "slice", "indexOf", "lastIndexOf", "filter", "forEach", "every", "map", "some", "reduce", "reduceRight"])("Number", Number, ["toExponential", "toFixed", "toLocaleString", "toPrecision"])("Function", f, ["apply", "call", "bind"])("RegExp", RegExp, ["exec", "test"])("Object", Object, ["create", "defineProperty", "defineProperties", "keys", "getPrototypeOf", "getOwnPropertyDescriptor", "getOwnPropertyNames", "preventExtensions", "isExtensible", "seal", "isSealed", "freeze", "isFrozen"])("Date", Date, ["now"]);
	Object.extend = m.overloadSetter();
	Date.extend("now", function() {
		return +(new Date)
	});
	new a("Boolean", Boolean);
	Number.prototype.$family = function() {
		return isFinite(this) ? "number" : "null"
	}.hide();
	Number.extend("random", function(s, i) {
		return Math.floor(Math.random() * (i - s + 1) + s)
	});
	var g = Object.prototype.hasOwnProperty;
	Object.extend("forEach", function(i, t, u) {
		for(var s in i) {
			if(g.call(i, s)) {
				t.call(u, i[s], s, i)
			}
		}
	});
	Object.each = Object.forEach;
	Array.implement({
		forEach: function(u, v) {
			for(var t = 0, s = this.length; t < s; t++) {
				if(t in this) {
					u.call(v, this[t], t, this)
				}
			}
		},
		each: function(i, s) {
			Array.forEach(this, i, s);
			return this
		}
	});
	var l = function(i) {
		switch(o(i)) {
			case "array":
				return i.clone();
			case "object":
				return Object.clone(i);
			default:
				return i
		}
	};
	Array.implement("clone", function() {
		var s = this.length,
			t = new Array(s);
		while(s--) {
			t[s] = l(this[s])
		}
		return t
	});
	var h = function(s, i, t) {
		switch(o(t)) {
			case "object":
				if(o(s[i]) == "object") {
					Object.merge(s[i], t)
				} else {
					s[i] = Object.clone(t)
				}
				break;
			case "array":
				s[i] = t.clone();
				break;
			default:
				s[i] = t
		}
		return s
	};
	Object.extend({
		merge: function(z, u, t) {
			if(o(u) == "string") {
				return h(z, u, t)
			}
			for(var y = 1, s = arguments.length; y < s; y++) {
				var w = arguments[y];
				for(var x in w) {
					h(z, x, w[x])
				}
			}
			return z
		},
		clone: function(i) {
			var t = {};
			for(var s in i) {
				t[s] = l(i[s])
			}
			return t
		},
		append: function(w) {
			for(var v = 1, t = arguments.length; v < t; v++) {
				var s = arguments[v] || {};
				for(var u in s) {
					w[u] = s[u]
				}
			}
			return w
		}
	});
	["Object", "WhiteSpace", "TextNode", "Collection", "Arguments"].each(function(i) {
		new a(i)
	});
	var c = Date.now();
	String.extend("uniqueID", function() {
		return(c++).toString(36)
	})
}).call(this);
Array.implement({
	invoke: function(a) {
		var b = Array.slice(arguments, 1);
		return this.map(function(c) {
			return c[a].apply(c, b)
		})
	},
	every: function(c, d) {
		for(var b = 0, a = this.length; b < a; b++) {
			if((b in this) && !c.call(d, this[b], b, this)) {
				return false
			}
		}
		return true
	},
	filter: function(d, e) {
		var c = [];
		for(var b = 0, a = this.length; b < a; b++) {
			if((b in this) && d.call(e, this[b], b, this)) {
				c.push(this[b])
			}
		}
		return c
	},
	clean: function() {
		return this.filter(function(a) {
			return a != null
		})
	},
	indexOf: function(c, d) {
		var a = this.length;
		for(var b = (d < 0) ? Math.max(0, a + d) : d || 0; b < a; b++) {
			if(this[b] === c) {
				return b
			}
		}
		return -1
	},
	map: function(d, e) {
		var c = [];
		for(var b = 0, a = this.length; b < a; b++) {
			if(b in this) {
				c[b] = d.call(e, this[b], b, this)
			}
		}
		return c
	},
	some: function(c, d) {
		for(var b = 0, a = this.length; b < a; b++) {
			if((b in this) && c.call(d, this[b], b, this)) {
				return true
			}
		}
		return false
	},
	associate: function(c) {
		var d = {},
			b = Math.min(this.length, c.length);
		for(var a = 0; a < b; a++) {
			d[c[a]] = this[a]
		}
		return d
	},
	link: function(c) {
		var a = {};
		for(var e = 0, b = this.length; e < b; e++) {
			for(var d in c) {
				if(c[d](this[e])) {
					a[d] = this[e];
					delete c[d];
					break
				}
			}
		}
		return a
	},
	contains: function(a, b) {
		return this.indexOf(a, b) != -1
	},
	append: function(a) {
		this.push.apply(this, a);
		return this
	},
	getLast: function() {
		return(this.length) ? this[this.length - 1] : null
	},
	getRandom: function() {
		return(this.length) ? this[Number.random(0, this.length - 1)] : null
	},
	include: function(a) {
		if(!this.contains(a)) {
			this.push(a)
		}
		return this
	},
	combine: function(c) {
		for(var b = 0, a = c.length; b < a; b++) {
			this.include(c[b])
		}
		return this
	},
	erase: function(b) {
		for(var a = this.length; a--;) {
			if(this[a] === b) {
				this.splice(a, 1)
			}
		}
		return this
	},
	empty: function() {
		this.length = 0;
		return this
	},
	flatten: function() {
		var d = [];
		for(var b = 0, a = this.length; b < a; b++) {
			var c = typeOf(this[b]);
			if(c == "null") {
				continue
			}
			d = d.concat((c == "array" || c == "collection" || c == "arguments" || instanceOf(this[b], Array)) ? Array.flatten(this[b]) : this[b])
		}
		return d
	},
	pick: function() {
		for(var b = 0, a = this.length; b < a; b++) {
			if(this[b] != null) {
				return this[b]
			}
		}
		return null
	},
	hexToRgb: function(b) {
		if(this.length != 3) {
			return null
		}
		var a = this.map(function(c) {
			if(c.length == 1) {
				c += c
			}
			return c.toInt(16)
		});
		return(b) ? a : "rgb(" + a + ")"
	},
	rgbToHex: function(d) {
		if(this.length < 3) {
			return null
		}
		if(this.length == 4 && this[3] == 0 && !d) {
			return "transparent"
		}
		var b = [];
		for(var a = 0; a < 3; a++) {
			var c = (this[a] - 0).toString(16);
			b.push((c.length == 1) ? "0" + c : c)
		}
		return(d) ? b : "#" + b.join("")
	}
});
Function.extend({
	attempt: function() {
		for(var b = 0, a = arguments.length; b < a; b++) {
			try {
				return arguments[b]()
			} catch(c) {}
		}
		return null
	}
});
Function.implement({
	attempt: function(a, c) {
		try {
			return this.apply(c, Array.from(a))
		} catch(b) {}
		return null
	},
	bind: function(c) {
		var a = this,
			b = (arguments.length > 1) ? Array.slice(arguments, 1) : null;
		return function() {
			if(!b && !arguments.length) {
				return a.call(c)
			}
			if(b && arguments.length) {
				return a.apply(c, b.concat(Array.from(arguments)))
			}
			return a.apply(c, b || arguments)
		}
	},
	pass: function(b, c) {
		var a = this;
		if(b != null) {
			b = Array.from(b)
		}
		return function() {
			return a.apply(c, b || arguments)
		}
	},
	delay: function(b, c, a) {
		return setTimeout(this.pass((a == null ? [] : a), c), b)
	},
	periodical: function(c, b, a) {
		return setInterval(this.pass((a == null ? [] : a), b), c)
	}
});
Number.implement({
	limit: function(b, a) {
		return Math.min(a, Math.max(b, this))
	},
	round: function(a) {
		a = Math.pow(10, a || 0).toFixed(a < 0 ? -a : 0);
		return Math.round(this * a) / a
	},
	times: function(b, c) {
		for(var a = 0; a < this; a++) {
			b.call(c, a, this)
		}
	},
	toFloat: function() {
		return parseFloat(this)
	},
	toInt: function(a) {
		return parseInt(this, a || 10)
	}
});
Number.alias("each", "times");
(function(b) {
	var a = {};
	b.each(function(c) {
		if(!Number[c]) {
			a[c] = function() {
				return Math[c].apply(null, [this].concat(Array.from(arguments)))
			}
		}
	});
	Number.implement(a)
})(["abs", "acos", "asin", "atan", "atan2", "ceil", "cos", "exp", "floor", "log", "max", "min", "pow", "sin", "sqrt", "tan"]);
String.implement({
	test: function(a, b) {
		return((typeOf(a) == "regexp") ? a : new RegExp("" + a, b)).test(this)
	},
	contains: function(a, b) {
		return(b) ? (b + this + b).indexOf(b + a + b) > -1 : this.indexOf(a) > -1
	},
	trim: function() {
		return this.replace(/^\s+|\s+$/g, "")
	},
	clean: function() {
		return this.replace(/\s+/g, " ").trim()
	},
	camelCase: function() {
		return this.replace(/-\D/g, function(a) {
			return a.charAt(1).toUpperCase()
		})
	},
	hyphenate: function() {
		return this.replace(/[A-Z]/g, function(a) {
			return("-" + a.charAt(0).toLowerCase())
		})
	},
	capitalize: function() {
		return this.replace(/\b[a-z]/g, function(a) {
			return a.toUpperCase()
		})
	},
	escapeRegExp: function() {
		return this.replace(/([-.*+?^${}()|[\]\/\\])/g, "\\$1")
	},
	toInt: function(a) {
		return parseInt(this, a || 10)
	},
	toFloat: function() {
		return parseFloat(this)
	},
	hexToRgb: function(b) {
		var a = this.match(/^#?(\w{1,2})(\w{1,2})(\w{1,2})$/);
		return(a) ? a.slice(1).hexToRgb(b) : null
	},
	rgbToHex: function(b) {
		var a = this.match(/\d{1,3}/g);
		return(a) ? a.rgbToHex(b) : null
	},
	substitute: function(a, b) {
		return this.replace(b || (/\\?\{([^{}]+)\}/g), function(d, c) {
			if(d.charAt(0) == "\\") {
				return d.slice(1)
			}
			return(a[c] != null) ? a[c] : ""
		})
	}
});
(function() {
	var k = this.document;
	var i = k.window = this;
	var b = 1;
	this.$uid = (i.ActiveXObject) ? function(e) {
		return(e.uid || (e.uid = [b++]))[0]
	} : function(e) {
		return e.uid || (e.uid = b++)
	};
	$uid(i);
	$uid(k);
	var a = navigator.userAgent.toLowerCase(),
		c = navigator.platform.toLowerCase(),
		j = a.match(/(opera|ie|firefox|chrome|version)[\s\/:]([\w\d\.]+)?.*?(safari|version[\s\/:]([\w\d\.]+)|$)/) || [null, "unknown", 0],
		f = j[1] == "ie" && k.documentMode;
	var o = this.Browser = {
		extend: Function.prototype.extend,
		name: (j[1] == "version") ? j[3] : j[1],
		version: f || parseFloat((j[1] == "opera" && j[4]) ? j[4] : j[2]),
		Platform: {
			name: a.match(/ip(?:ad|od|hone)/) ? "ios" : (a.match(/(?:webos|android)/) || c.match(/mac|win|linux/) || ["other"])[0]
		},
		Features: {
			xpath: !!(k.evaluate),
			air: !!(i.runtime),
			query: !!(k.querySelector),
			json: !!(i.JSON)
		},
		Plugins: {}
	};
	o[o.name] = true;
	o[o.name + parseInt(o.version, 10)] = true;
	o.Platform[o.Platform.name] = true;
	o.Request = (function() {
		var q = function() {
			return new XMLHttpRequest()
		};
		var p = function() {
			return new ActiveXObject("MSXML2.XMLHTTP")
		};
		var e = function() {
			return new ActiveXObject("Microsoft.XMLHTTP")
		};
		return Function.attempt(function() {
			q();
			return q
		}, function() {
			p();
			return p
		}, function() {
			e();
			return e
		})
	})();
	o.Features.xhr = !!(o.Request);
	var h = (Function.attempt(function() {
		return navigator.plugins["Shockwave Flash"].description
	}, function() {
		return new ActiveXObject("ShockwaveFlash.ShockwaveFlash").GetVariable("$version")
	}) || "0 r0").match(/\d+/g);
	o.Plugins.Flash = {
		version: Number(h[0] || "0." + h[1]) || 0,
		build: Number(h[2]) || 0
	};
	o.exec = function(p) {
		if(!p) {
			return p
		}
		if(i.execScript) {
			i.execScript(p)
		} else {
			var e = k.createElement("script");
			e.setAttribute("type", "text/javascript");
			e.text = p;
			k.head.appendChild(e);
			k.head.removeChild(e)
		}
		return p
	};
	String.implement("stripScripts", function(p) {
		var e = "";
		var q = this.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, function(r, s) {
			e += s + "\n";
			return ""
		});
		if(p === true) {
			o.exec(e)
		} else {
			if(typeOf(p) == "function") {
				p(e, q)
			}
		}
		return q
	});
	o.extend({
		Document: this.Document,
		Window: this.Window,
		Element: this.Element,
		Event: this.Event
	});
	this.Window = this.$constructor = new Type("Window", function() {});
	this.$family = Function.from("window").hide();
	Window.mirror(function(e, p) {
		i[e] = p
	});
	this.Document = k.$constructor = new Type("Document", function() {});
	k.$family = Function.from("document").hide();
	Document.mirror(function(e, p) {
		k[e] = p
	});
	k.html = k.documentElement;
	k.head = k.getElementsByTagName("head")[0];
	if(k.execCommand) {
		try {
			k.execCommand("BackgroundImageCache", false, true)
		} catch(g) {}
	}
	if(this.attachEvent && !this.addEventListener) {
		var d = function() {
			this.detachEvent("onunload", d);
			k.head = k.html = k.window = null
		};
		this.attachEvent("onunload", d)
	}
	var m = Array.from;
	try {
		m(k.html.childNodes)
	} catch(g) {
		Array.from = function(p) {
			if(typeof p != "string" && Type.isEnumerable(p) && typeOf(p) != "array") {
				var e = p.length,
					q = new Array(e);
				while(e--) {
					q[e] = p[e]
				}
				return q
			}
			return m(p)
		};
		var l = Array.prototype,
			n = l.slice;
		["pop", "push", "reverse", "shift", "sort", "splice", "unshift", "concat", "join", "slice"].each(function(e) {
			var p = l[e];
			Array[e] = function(q) {
				return p.apply(Array.from(q), n.call(arguments, 1))
			}
		})
	}
}).call(this);
(function() {
	var k, n, l, g, a = {},
		c = {},
		m = /\\/g;
	var e = function(q, p) {
		if(q == null) {
			return null
		}
		if(q.Slick === true) {
			return q
		}
		q = ("" + q).replace(/^\s+|\s+$/g, "");
		g = !!p;
		var o = (g) ? c : a;
		if(o[q]) {
			return o[q]
		}
		k = {
			Slick: true,
			expressions: [],
			raw: q,
			reverse: function() {
				return e(this.raw, true)
			}
		};
		n = -1;
		while(q != (q = q.replace(j, b))) {}
		k.length = k.expressions.length;
		return o[k.raw] = (g) ? h(k) : k
	};
	var i = function(o) {
		if(o === "!") {
			return " "
		} else {
			if(o === " ") {
				return "!"
			} else {
				if((/^!/).test(o)) {
					return o.replace(/^!/, "")
				} else {
					return "!" + o
				}
			}
		}
	};
	var h = function(u) {
		var r = u.expressions;
		for(var p = 0; p < r.length; p++) {
			var t = r[p];
			var q = {
				parts: [],
				tag: "*",
				combinator: i(t[0].combinator)
			};
			for(var o = 0; o < t.length; o++) {
				var s = t[o];
				if(!s.reverseCombinator) {
					s.reverseCombinator = " "
				}
				s.combinator = s.reverseCombinator;
				delete s.reverseCombinator
			}
			t.reverse().push(q)
		}
		return u
	};
	var f = function(o) {
		return o.replace(/[-[\]{}()*+?.\\^$|,#\s]/g, function(p) {
			return "\\" + p
		})
	};
	var j = new RegExp("^(?:\\s*(,)\\s*|\\s*(<combinator>+)\\s*|(\\s+)|(<unicode>+|\\*)|\\#(<unicode>+)|\\.(<unicode>+)|\\[\\s*(<unicode1>+)(?:\\s*([*^$!~|]?=)(?:\\s*(?:([\"']?)(.*?)\\9)))?\\s*\\](?!\\])|(:+)(<unicode>+)(?:\\((?:(?:([\"'])([^\\13]*)\\13)|((?:\\([^)]+\\)|[^()]*)+))\\))?)".replace(/<combinator>/, "[" + f(">+~`!@$%^&={}\\;</") + "]").replace(/<unicode>/g, "(?:[\\w\\u00a1-\\uFFFF-]|\\\\[^\\s0-9a-f])").replace(/<unicode1>/g, "(?:[:\\w\\u00a1-\\uFFFF-]|\\\\[^\\s0-9a-f])"));

	function b(x, s, D, z, r, C, q, B, A, y, u, F, G, v, p, w) {
		if(s || n === -1) {
			k.expressions[++n] = [];
			l = -1;
			if(s) {
				return ""
			}
		}
		if(D || z || l === -1) {
			D = D || " ";
			var t = k.expressions[n];
			if(g && t[l]) {
				t[l].reverseCombinator = i(D)
			}
			t[++l] = {
				combinator: D,
				tag: "*"
			}
		}
		var o = k.expressions[n][l];
		if(r) {
			o.tag = r.replace(m, "")
		} else {
			if(C) {
				o.id = C.replace(m, "")
			} else {
				if(q) {
					q = q.replace(m, "");
					if(!o.classList) {
						o.classList = []
					}
					if(!o.classes) {
						o.classes = []
					}
					o.classList.push(q);
					o.classes.push({
						value: q,
						regexp: new RegExp("(^|\\s)" + f(q) + "(\\s|$)")
					})
				} else {
					if(G) {
						w = w || p;
						w = w ? w.replace(m, "") : null;
						if(!o.pseudos) {
							o.pseudos = []
						}
						o.pseudos.push({
							key: G.replace(m, ""),
							value: w,
							type: F.length == 1 ? "class" : "element"
						})
					} else {
						if(B) {
							B = B.replace(m, "");
							u = (u || "").replace(m, "");
							var E, H;
							switch(A) {
								case "^=":
									H = new RegExp("^" + f(u));
									break;
								case "$=":
									H = new RegExp(f(u) + "$");
									break;
								case "~=":
									H = new RegExp("(^|\\s)" + f(u) + "(\\s|$)");
									break;
								case "|=":
									H = new RegExp("^" + f(u) + "(-|$)");
									break;
								case "=":
									E = function(I) {
										return u == I
									};
									break;
								case "*=":
									E = function(I) {
										return I && I.indexOf(u) > -1
									};
									break;
								case "!=":
									E = function(I) {
										return u != I
									};
									break;
								default:
									E = function(I) {
										return !!I
									}
							}
							if(u == "" && (/^[*$^]=$/).test(A)) {
								E = function() {
									return false
								}
							}
							if(!E) {
								E = function(I) {
									return I && H.test(I)
								}
							}
							if(!o.attributes) {
								o.attributes = []
							}
							o.attributes.push({
								key: B,
								operator: A,
								value: u,
								test: E
							})
						}
					}
				}
			}
		}
		return ""
	}
	var d = (this.Slick || {});
	d.parse = function(o) {
		return e(o)
	};
	d.escapeRegExp = f;
	if(!this.Slick) {
		this.Slick = d
	}
}).apply((typeof exports != "undefined") ? exports : this);
(function() {
	var j = {},
		l = {},
		b = Object.prototype.toString;
	j.isNativeCode = function(c) {
		return(/\{\s*\[native code\]\s*\}/).test("" + c)
	};
	j.isXML = function(c) {
		return(!!c.xmlVersion) || (!!c.xml) || (b.call(c) == "[object XMLDocument]") || (c.nodeType == 9 && c.documentElement.nodeName != "HTML")
	};
	j.setDocument = function(w) {
		var t = w.nodeType;
		if(t == 9) {} else {
			if(t) {
				w = w.ownerDocument
			} else {
				if(w.navigator) {
					w = w.document
				} else {
					return
				}
			}
		}
		if(this.document === w) {
			return
		}
		this.document = w;
		var y = w.documentElement,
			u = this.getUIDXML(y),
			o = l[u],
			A;
		if(o) {
			for(A in o) {
				this[A] = o[A]
			}
			return
		}
		o = l[u] = {};
		o.root = y;
		o.isXMLDocument = this.isXML(w);
		o.brokenStarGEBTN = o.starSelectsClosedQSA = o.idGetsName = o.brokenMixedCaseQSA = o.brokenGEBCN = o.brokenCheckedQSA = o.brokenEmptyAttributeQSA = o.isHTMLDocument = o.nativeMatchesSelector = false;
		var m, n, x, q, r;
		var s, c = "slick_uniqueid";
		var z = w.createElement("div");
		var p = w.body || w.getElementsByTagName("body")[0] || y;
		p.appendChild(z);
		try {
			z.innerHTML = '<a id="' + c + '"></a>';
			o.isHTMLDocument = !!w.getElementById(c)
		} catch(v) {}
		if(o.isHTMLDocument) {
			z.style.display = "none";
			z.appendChild(w.createComment(""));
			n = (z.getElementsByTagName("*").length > 1);
			try {
				z.innerHTML = "foo</foo>";
				s = z.getElementsByTagName("*");
				m = (s && !!s.length && s[0].nodeName.charAt(0) == "/")
			} catch(v) {}
			o.brokenStarGEBTN = n || m;
			try {
				z.innerHTML = '<a name="' + c + '"></a><b id="' + c + '"></b>';
				o.idGetsName = w.getElementById(c) === z.firstChild
			} catch(v) {}
			if(z.getElementsByClassName) {
				try {
					z.innerHTML = '<a class="f"></a><a class="b"></a>';
					z.getElementsByClassName("b").length;
					z.firstChild.className = "b";
					q = (z.getElementsByClassName("b").length != 2)
				} catch(v) {}
				try {
					z.innerHTML = '<a class="a"></a><a class="f b a"></a>';
					x = (z.getElementsByClassName("a").length != 2)
				} catch(v) {}
				o.brokenGEBCN = q || x
			}
			if(z.querySelectorAll) {
				try {
					z.innerHTML = "foo</foo>";
					s = z.querySelectorAll("*");
					o.starSelectsClosedQSA = (s && !!s.length && s[0].nodeName.charAt(0) == "/")
				} catch(v) {}
				try {
					z.innerHTML = '<a class="MiX"></a>';
					o.brokenMixedCaseQSA = !z.querySelectorAll(".MiX").length
				} catch(v) {}
				try {
					z.innerHTML = '<select><option selected="selected">a</option></select>';
					o.brokenCheckedQSA = (z.querySelectorAll(":checked").length == 0)
				} catch(v) {}
				try {
					z.innerHTML = '<a class=""></a>';
					o.brokenEmptyAttributeQSA = (z.querySelectorAll('[class*=""]').length != 0)
				} catch(v) {}
			}
			try {
				z.innerHTML = '<form action="s"><input id="action"/></form>';
				r = (z.firstChild.getAttribute("action") != "s")
			} catch(v) {}
			o.nativeMatchesSelector = y.matchesSelector || y.mozMatchesSelector || y.webkitMatchesSelector;
			if(o.nativeMatchesSelector) {
				try {
					o.nativeMatchesSelector.call(y, ":slick");
					o.nativeMatchesSelector = null
				} catch(v) {}
			}
		}
		try {
			y.slick_expando = 1;
			delete y.slick_expando;
			o.getUID = this.getUIDHTML
		} catch(v) {
			o.getUID = this.getUIDXML
		}
		p.removeChild(z);
		z = s = p = null;
		o.getAttribute = (o.isHTMLDocument && r) ? function(D, B) {
			var E = this.attributeGetters[B];
			if(E) {
				return E.call(D)
			}
			var C = D.getAttributeNode(B);
			return(C) ? C.nodeValue : null
		} : function(C, B) {
			var D = this.attributeGetters[B];
			return(D) ? D.call(C) : C.getAttribute(B)
		};
		o.hasAttribute = (y && this.isNativeCode(y.hasAttribute)) ? function(C, B) {
			return C.hasAttribute(B)
		} : function(C, B) {
			C = C.getAttributeNode(B);
			return !!(C && (C.specified || C.nodeValue))
		};
		o.contains = (y && this.isNativeCode(y.contains)) ? function(B, C) {
			return B.contains(C)
		} : (y && y.compareDocumentPosition) ? function(B, C) {
			return B === C || !!(B.compareDocumentPosition(C) & 16)
		} : function(B, C) {
			if(C) {
				do {
					if(C === B) {
						return true
					}
				} while ((C = C.parentNode))
			}
			return false
		};
		o.documentSorter = (y.compareDocumentPosition) ? function(C, B) {
			if(!C.compareDocumentPosition || !B.compareDocumentPosition) {
				return 0
			}
			return C.compareDocumentPosition(B) & 4 ? -1 : C === B ? 0 : 1
		} : ("sourceIndex" in y) ? function(C, B) {
			if(!C.sourceIndex || !B.sourceIndex) {
				return 0
			}
			return C.sourceIndex - B.sourceIndex
		} : (w.createRange) ? function(E, C) {
			if(!E.ownerDocument || !C.ownerDocument) {
				return 0
			}
			var D = E.ownerDocument.createRange(),
				B = C.ownerDocument.createRange();
			D.setStart(E, 0);
			D.setEnd(E, 0);
			B.setStart(C, 0);
			B.setEnd(C, 0);
			return D.compareBoundaryPoints(Range.START_TO_END, B)
		} : null;
		y = null;
		for(A in o) {
			this[A] = o[A]
		}
	};
	var e = /^([#.]?)((?:[\w-]+|\*))$/,
		g = /\[.+[*$^]=(?:""|'')?\]/,
		f = {};
	j.search = function(q, D, O, v) {
		var B = this.found = (v) ? null : (O || []);
		if(!q) {
			return B
		} else {
			if(q.navigator) {
				q = q.document
			} else {
				if(!q.nodeType) {
					return B
				}
			}
		}
		var z, N, s = this.uniques = {},
			y = !!(O && O.length),
			c = (q.nodeType == 9);
		if(this.document !== (c ? q : q.ownerDocument)) {
			this.setDocument(q)
		}
		if(y) {
			for(N = B.length; N--;) {
				s[this.getUID(B[N])] = true
			}
		}
		if(typeof D == "string") {
			var C = D.match(e);
			simpleSelectors: if(C) {
				var K = C[1],
					V = C[2],
					I, G;
				if(!K) {
					if(V == "*" && this.brokenStarGEBTN) {
						break simpleSelectors
					}
					G = q.getElementsByTagName(V);
					if(v) {
						return G[0] || null
					}
					for(N = 0; I = G[N++];) {
						if(!(y && s[this.getUID(I)])) {
							B.push(I)
						}
					}
				} else {
					if(K == "#") {
						if(!this.isHTMLDocument || !c) {
							break simpleSelectors
						}
						I = q.getElementById(V);
						if(!I) {
							return B
						}
						if(this.idGetsName && I.getAttributeNode("id").nodeValue != V) {
							break simpleSelectors
						}
						if(v) {
							return I || null
						}
						if(!(y && s[this.getUID(I)])) {
							B.push(I)
						}
					} else {
						if(K == ".") {
							if(!this.isHTMLDocument || ((!q.getElementsByClassName || this.brokenGEBCN) && q.querySelectorAll)) {
								break simpleSelectors
							}
							if(q.getElementsByClassName && !this.brokenGEBCN) {
								G = q.getElementsByClassName(V);
								if(v) {
									return G[0] || null
								}
								for(N = 0; I = G[N++];) {
									if(!(y && s[this.getUID(I)])) {
										B.push(I)
									}
								}
							} else {
								var u = new RegExp("(^|\\s)" + d.escapeRegExp(V) + "(\\s|$)");
								G = q.getElementsByTagName("*");
								for(N = 0; I = G[N++];) {
									className = I.className;
									if(!(className && u.test(className))) {
										continue
									}
									if(v) {
										return I
									}
									if(!(y && s[this.getUID(I)])) {
										B.push(I)
									}
								}
							}
						}
					}
				}
				if(y) {
					this.sort(B)
				}
				return(v) ? null : B
			}
			querySelector: if(q.querySelectorAll) {
				if(!this.isHTMLDocument || this.brokenMixedCaseQSA || f[D] || (this.brokenCheckedQSA && D.indexOf(":checked") > -1) || (this.brokenEmptyAttributeQSA && g.test(D)) || d.disableQSA) {
					break querySelector
				}
				var A = D;
				if(!c) {
					var M = q.getAttribute("id"),
						p = "slickid__";
					q.setAttribute("id", p);
					A = "#" + p + " " + A
				}
				try {
					if(v) {
						return q.querySelector(A) || null
					} else {
						G = q.querySelectorAll(A)
					}
				} catch(P) {
					f[D] = 1;
					break querySelector
				} finally {
					if(!c) {
						if(M) {
							q.setAttribute("id", M)
						} else {
							q.removeAttribute("id")
						}
					}
				}
				if(this.starSelectsClosedQSA) {
					for(N = 0; I = G[N++];) {
						if(I.nodeName > "@" && !(y && s[this.getUID(I)])) {
							B.push(I)
						}
					}
				} else {
					for(N = 0; I = G[N++];) {
						if(!(y && s[this.getUID(I)])) {
							B.push(I)
						}
					}
				}
				if(y) {
					this.sort(B)
				}
				return B
			}
			z = this.Slick.parse(D);
			if(!z.length) {
				return B
			}
		} else {
			if(D == null) {
				return B
			} else {
				if(D.Slick) {
					z = D
				} else {
					if(this.contains(q.documentElement || q, D)) {
						(B) ? B.push(D): B = D;
						return B
					} else {
						return B
					}
				}
			}
		}
		this.posNTH = {};
		this.posNTHLast = {};
		this.posNTHType = {};
		this.posNTHTypeLast = {};
		this.push = (!y && (v || (z.length == 1 && z.expressions[0].length == 1))) ? this.pushArray : this.pushUID;
		if(B == null) {
			B = []
		}
		var L, H, F;
		var J, U, E, T, Q, x, t;
		var w, r, o, R, S = z.expressions;
		search: for(N = 0;
			(r = S[N]); N++) {
			for(L = 0;
				(o = r[L]); L++) {
				J = "combinator:" + o.combinator;
				if(!this[J]) {
					continue search
				}
				U = (this.isXMLDocument) ? o.tag : o.tag.toUpperCase();
				E = o.id;
				T = o.classList;
				Q = o.classes;
				x = o.attributes;
				t = o.pseudos;
				R = (L === (r.length - 1));
				this.bitUniques = {};
				if(R) {
					this.uniques = s;
					this.found = B
				} else {
					this.uniques = {};
					this.found = []
				}
				if(L === 0) {
					this[J](q, U, E, Q, x, t, T);
					if(v && R && B.length) {
						break search
					}
				} else {
					if(v && R) {
						for(H = 0, F = w.length; H < F; H++) {
							this[J](w[H], U, E, Q, x, t, T);
							if(B.length) {
								break search
							}
						}
					} else {
						for(H = 0, F = w.length; H < F; H++) {
							this[J](w[H], U, E, Q, x, t, T)
						}
					}
				}
				w = this.found
			}
		}
		if(y || (z.expressions.length > 1)) {
			this.sort(B)
		}
		return(v) ? (B[0] || null) : B
	};
	j.uidx = 1;
	j.uidk = "slick-uniqueid";
	j.getUIDXML = function(m) {
		var c = m.getAttribute(this.uidk);
		if(!c) {
			c = this.uidx++;
			m.setAttribute(this.uidk, c)
		}
		return c
	};
	j.getUIDHTML = function(c) {
		return c.uniqueNumber || (c.uniqueNumber = this.uidx++)
	};
	j.sort = function(c) {
		if(!this.documentSorter) {
			return c
		}
		c.sort(this.documentSorter);
		return c
	};
	j.cacheNTH = {};
	j.matchNTH = /^([+-]?\d*)?([a-z]+)?([+-]\d+)?$/;
	j.parseNTHArgument = function(p) {
		var n = p.match(this.matchNTH);
		if(!n) {
			return false
		}
		var o = n[2] || false;
		var m = n[1] || 1;
		if(m == "-") {
			m = -1
		}
		var c = +n[3] || 0;
		n = (o == "n") ? {
			a: m,
			b: c
		} : (o == "odd") ? {
			a: 2,
			b: 1
		} : (o == "even") ? {
			a: 2,
			b: 0
		} : {
			a: 0,
			b: m
		};
		return(this.cacheNTH[p] = n)
	};
	j.createNTHPseudo = function(o, m, c, n) {
		return function(r, p) {
			var t = this.getUID(r);
			if(!this[c][t]) {
				var z = r.parentNode;
				if(!z) {
					return false
				}
				var q = z[o],
					s = 1;
				if(n) {
					var y = r.nodeName;
					do {
						if(q.nodeName != y) {
							continue
						}
						this[c][this.getUID(q)] = s++
					} while ((q = q[m]))
				} else {
					do {
						if(q.nodeType != 1) {
							continue
						}
						this[c][this.getUID(q)] = s++
					} while ((q = q[m]))
				}
			}
			p = p || "n";
			var u = this.cacheNTH[p] || this.parseNTHArgument(p);
			if(!u) {
				return false
			}
			var x = u.a,
				w = u.b,
				v = this[c][t];
			if(x == 0) {
				return w == v
			}
			if(x > 0) {
				if(v < w) {
					return false
				}
			} else {
				if(w < v) {
					return false
				}
			}
			return((v - w) % x) == 0
		}
	};
	j.pushArray = function(o, c, q, n, m, p) {
		if(this.matchSelector(o, c, q, n, m, p)) {
			this.found.push(o)
		}
	};
	j.pushUID = function(p, c, r, o, m, q) {
		var n = this.getUID(p);
		if(!this.uniques[n] && this.matchSelector(p, c, r, o, m, q)) {
			this.uniques[n] = true;
			this.found.push(p)
		}
	};
	j.matchNode = function(m, n) {
		if(this.isHTMLDocument && this.nativeMatchesSelector) {
			try {
				return this.nativeMatchesSelector.call(m, n.replace(/\[([^=]+)=\s*([^'"\]]+?)\s*\]/g, '[$1="$2"]'))
			} catch(u) {}
		}
		var t = this.Slick.parse(n);
		if(!t) {
			return true
		}
		var r = t.expressions,
			p, s = 0,
			q;
		for(q = 0;
			(currentExpression = r[q]); q++) {
			if(currentExpression.length == 1) {
				var o = currentExpression[0];
				if(this.matchSelector(m, (this.isXMLDocument) ? o.tag : o.tag.toUpperCase(), o.id, o.classes, o.attributes, o.pseudos)) {
					return true
				}
				s++
			}
		}
		if(s == t.length) {
			return false
		}
		var c = this.search(this.document, t),
			v;
		for(q = 0; v = c[q++];) {
			if(v === m) {
				return true
			}
		}
		return false
	};
	j.matchPseudo = function(p, c, o) {
		var m = "pseudo:" + c;
		if(this[m]) {
			return this[m](p, o)
		}
		var n = this.getAttribute(p, c);
		return(o) ? o == n : !!n
	};
	j.matchSelector = function(n, u, c, o, p, r) {
		if(u) {
			var s = (this.isXMLDocument) ? n.nodeName : n.nodeName.toUpperCase();
			if(u == "*") {
				if(s < "@") {
					return false
				}
			} else {
				if(s != u) {
					return false
				}
			}
		}
		if(c && n.getAttribute("id") != c) {
			return false
		}
		var q, m, t;
		if(o) {
			for(q = o.length; q--;) {
				t = n.getAttribute("class") || n.className;
				if(!(t && o[q].regexp.test(t))) {
					return false
				}
			}
		}
		if(p) {
			for(q = p.length; q--;) {
				m = p[q];
				if(m.operator ? !m.test(this.getAttribute(n, m.key)) : !this.hasAttribute(n, m.key)) {
					return false
				}
			}
		}
		if(r) {
			for(q = r.length; q--;) {
				m = r[q];
				if(!this.matchPseudo(n, m.key, m.value)) {
					return false
				}
			}
		}
		return true
	};
	var i = {
		" ": function(p, v, m, q, r, t, o) {
			var s, u, n;
			if(this.isHTMLDocument) {
				getById: if(m) {
					u = this.document.getElementById(m);
					if((!u && p.all) || (this.idGetsName && u && u.getAttributeNode("id").nodeValue != m)) {
						n = p.all[m];
						if(!n) {
							return
						}
						if(!n[0]) {
							n = [n]
						}
						for(s = 0; u = n[s++];) {
							var c = u.getAttributeNode("id");
							if(c && c.nodeValue == m) {
								this.push(u, v, null, q, r, t);
								break
							}
						}
						return
					}
					if(!u) {
						if(this.contains(this.root, p)) {
							return
						} else {
							break getById
						}
					} else {
						if(this.document !== p && !this.contains(p, u)) {
							return
						}
					}
					this.push(u, v, null, q, r, t);
					return
				}getByClass: if(q && p.getElementsByClassName && !this.brokenGEBCN) {
					n = p.getElementsByClassName(o.join(" "));
					if(!(n && n.length)) {
						break getByClass
					}
					for(s = 0; u = n[s++];) {
						this.push(u, v, m, null, r, t)
					}
					return
				}
			}
			getByTag: {
				n = p.getElementsByTagName(v);
				if(!(n && n.length)) {
					break getByTag
				}
				if(!this.brokenStarGEBTN) {
					v = null
				}
				for(s = 0; u = n[s++];) {
					this.push(u, v, m, q, r, t)
				}
			}
		},
		">": function(o, c, q, n, m, p) {
			if((o = o.firstChild)) {
				do {
					if(o.nodeType == 1) {
						this.push(o, c, q, n, m, p)
					}
				} while ((o = o.nextSibling))
			}
		},
		"+": function(o, c, q, n, m, p) {
			while((o = o.nextSibling)) {
				if(o.nodeType == 1) {
					this.push(o, c, q, n, m, p);
					break
				}
			}
		},
		"^": function(o, c, q, n, m, p) {
			o = o.firstChild;
			if(o) {
				if(o.nodeType == 1) {
					this.push(o, c, q, n, m, p)
				} else {
					this["combinator:+"](o, c, q, n, m, p)
				}
			}
		},
		"~": function(p, c, r, o, m, q) {
			while((p = p.nextSibling)) {
				if(p.nodeType != 1) {
					continue
				}
				var n = this.getUID(p);
				if(this.bitUniques[n]) {
					break
				}
				this.bitUniques[n] = true;
				this.push(p, c, r, o, m, q)
			}
		},
		"++": function(o, c, q, n, m, p) {
			this["combinator:+"](o, c, q, n, m, p);
			this["combinator:!+"](o, c, q, n, m, p)
		},
		"~~": function(o, c, q, n, m, p) {
			this["combinator:~"](o, c, q, n, m, p);
			this["combinator:!~"](o, c, q, n, m, p)
		},
		"!": function(o, c, q, n, m, p) {
			while((o = o.parentNode)) {
				if(o !== this.document) {
					this.push(o, c, q, n, m, p)
				}
			}
		},
		"!>": function(o, c, q, n, m, p) {
			o = o.parentNode;
			if(o !== this.document) {
				this.push(o, c, q, n, m, p)
			}
		},
		"!+": function(o, c, q, n, m, p) {
			while((o = o.previousSibling)) {
				if(o.nodeType == 1) {
					this.push(o, c, q, n, m, p);
					break
				}
			}
		},
		"!^": function(o, c, q, n, m, p) {
			o = o.lastChild;
			if(o) {
				if(o.nodeType == 1) {
					this.push(o, c, q, n, m, p)
				} else {
					this["combinator:!+"](o, c, q, n, m, p)
				}
			}
		},
		"!~": function(p, c, r, o, m, q) {
			while((p = p.previousSibling)) {
				if(p.nodeType != 1) {
					continue
				}
				var n = this.getUID(p);
				if(this.bitUniques[n]) {
					break
				}
				this.bitUniques[n] = true;
				this.push(p, c, r, o, m, q)
			}
		}
	};
	for(var h in i) {
		j["combinator:" + h] = i[h]
	}
	var k = {
		empty: function(c) {
			var m = c.firstChild;
			return !(m && m.nodeType == 1) && !(c.innerText || c.textContent || "").length
		},
		not: function(c, m) {
			return !this.matchNode(c, m)
		},
		contains: function(c, m) {
			return(c.innerText || c.textContent || "").indexOf(m) > -1
		},
		"first-child": function(c) {
			while((c = c.previousSibling)) {
				if(c.nodeType == 1) {
					return false
				}
			}
			return true
		},
		"last-child": function(c) {
			while((c = c.nextSibling)) {
				if(c.nodeType == 1) {
					return false
				}
			}
			return true
		},
		"only-child": function(n) {
			var m = n;
			while((m = m.previousSibling)) {
				if(m.nodeType == 1) {
					return false
				}
			}
			var c = n;
			while((c = c.nextSibling)) {
				if(c.nodeType == 1) {
					return false
				}
			}
			return true
		},
		"nth-child": j.createNTHPseudo("firstChild", "nextSibling", "posNTH"),
		"nth-last-child": j.createNTHPseudo("lastChild", "previousSibling", "posNTHLast"),
		"nth-of-type": j.createNTHPseudo("firstChild", "nextSibling", "posNTHType", true),
		"nth-last-of-type": j.createNTHPseudo("lastChild", "previousSibling", "posNTHTypeLast", true),
		index: function(m, c) {
			return this["pseudo:nth-child"](m, "" + c + 1)
		},
		even: function(c) {
			return this["pseudo:nth-child"](c, "2n")
		},
		odd: function(c) {
			return this["pseudo:nth-child"](c, "2n+1")
		},
		"first-of-type": function(c) {
			var m = c.nodeName;
			while((c = c.previousSibling)) {
				if(c.nodeName == m) {
					return false
				}
			}
			return true
		},
		"last-of-type": function(c) {
			var m = c.nodeName;
			while((c = c.nextSibling)) {
				if(c.nodeName == m) {
					return false
				}
			}
			return true
		},
		"only-of-type": function(n) {
			var m = n,
				o = n.nodeName;
			while((m = m.previousSibling)) {
				if(m.nodeName == o) {
					return false
				}
			}
			var c = n;
			while((c = c.nextSibling)) {
				if(c.nodeName == o) {
					return false
				}
			}
			return true
		},
		enabled: function(c) {
			return !c.disabled
		},
		disabled: function(c) {
			return c.disabled
		},
		checked: function(c) {
			return c.checked || c.selected
		},
		focus: function(c) {
			return this.isHTMLDocument && this.document.activeElement === c && (c.href || c.type || this.hasAttribute(c, "tabindex"))
		},
		root: function(c) {
			return(c === this.root)
		},
		selected: function(c) {
			return c.selected
		}
	};
	for(var a in k) {
		j["pseudo:" + a] = k[a]
	}
	j.attributeGetters = {
		"class": function() {
			return this.getAttribute("class") || this.className
		},
		"for": function() {
			return("htmlFor" in this) ? this.htmlFor : this.getAttribute("for")
		},
		href: function() {
			return("href" in this) ? this.getAttribute("href", 2) : this.getAttribute("href")
		},
		style: function() {
			return(this.style) ? this.style.cssText : this.getAttribute("style")
		},
		tabindex: function() {
			var c = this.getAttributeNode("tabindex");
			return(c && c.specified) ? c.nodeValue : null
		},
		type: function() {
			return this.getAttribute("type")
		}
	};
	var d = j.Slick = (this.Slick || {});
	d.version = "1.1.5";
	d.search = function(m, n, c) {
		return j.search(m, n, c)
	};
	d.find = function(c, m) {
		return j.search(c, m, null, true)
	};
	d.contains = function(c, m) {
		j.setDocument(c);
		return j.contains(c, m)
	};
	d.getAttribute = function(m, c) {
		return j.getAttribute(m, c)
	};
	d.match = function(m, c) {
		if(!(m && c)) {
			return false
		}
		if(!c || c === m) {
			return true
		}
		j.setDocument(m);
		return j.matchNode(m, c)
	};
	d.defineAttributeGetter = function(c, m) {
		j.attributeGetters[c] = m;
		return this
	};
	d.lookupAttributeGetter = function(c) {
		return j.attributeGetters[c]
	};
	d.definePseudo = function(c, m) {
		j["pseudo:" + c] = function(o, n) {
			return m.call(o, n)
		};
		return this
	};
	d.lookupPseudo = function(c) {
		var m = j["pseudo:" + c];
		if(m) {
			return function(n) {
				return m.call(this, n)
			}
		}
		return null
	};
	d.override = function(m, c) {
		j.override(m, c);
		return this
	};
	d.isXML = j.isXML;
	d.uidOf = function(c) {
		return j.getUIDHTML(c)
	};
	if(!this.Slick) {
		this.Slick = d
	}
}).apply((typeof exports != "undefined") ? exports : this);
var Element = function(b, g) {
	var h = Element.Constructors[b];
	if(h) {
		return h(g)
	}
	if(typeof b != "string") {
		return document.id(b).set(g)
	}
	if(!g) {
		g = {}
	}
	if(!(/^[\w-]+$/).test(b)) {
		var e = Slick.parse(b).expressions[0][0];
		b = (e.tag == "*") ? "div" : e.tag;
		if(e.id && g.id == null) {
			g.id = e.id
		}
		var d = e.attributes;
		if(d) {
			for(var f = 0, c = d.length; f < c; f++) {
				var a = d[f];
				if(a.value != null && a.operator == "=" && g[a.key] == null) {
					g[a.key] = a.value
				}
			}
		}
		if(e.classList && g["class"] == null) {
			g["class"] = e.classList.join(" ")
		}
	}
	return document.newElement(b, g)
};
if(Browser.Element) {
	Element.prototype = Browser.Element.prototype
}
new Type("Element", Element).mirror(function(a) {
	if(Array.prototype[a]) {
		return
	}
	var b = {};
	b[a] = function() {
		var h = [],
			e = arguments,
			j = true;
		for(var g = 0, d = this.length; g < d; g++) {
			var f = this[g],
				c = h[g] = f[a].apply(f, e);
			j = (j && typeOf(c) == "element")
		}
		return(j) ? new Elements(h) : h
	};
	Elements.implement(b)
});
if(!Browser.Element) {
	Element.parent = Object;
	Element.Prototype = {
		"$family": Function.from("element").hide()
	};
	Element.mirror(function(a, b) {
		Element.Prototype[a] = b
	})
}
Element.Constructors = {};
var IFrame = new Type("IFrame", function() {
	var e = Array.link(arguments, {
		properties: Type.isObject,
		iframe: function(f) {
			return(f != null)
		}
	});
	var c = e.properties || {},
		b;
	if(e.iframe) {
		b = document.id(e.iframe)
	}
	var d = c.onload || function() {};
	delete c.onload;
	c.id = c.name = [c.id, c.name, b ? (b.id || b.name) : "IFrame_" + String.uniqueID()].pick();
	b = new Element(b || "iframe", c);
	var a = function() {
		d.call(b.contentWindow)
	};
	if(window.frames[c.id]) {
		a()
	} else {
		b.addListener("load", a)
	}
	return b
});
var Elements = this.Elements = function(a) {
	if(a && a.length) {
		var e = {},
			d;
		for(var c = 0; d = a[c++];) {
			var b = Slick.uidOf(d);
			if(!e[b]) {
				e[b] = true;
				this.push(d)
			}
		}
	}
};
Elements.prototype = {
	length: 0
};
Elements.parent = Array;
new Type("Elements", Elements).implement({
	filter: function(a, b) {
		if(!a) {
			return this
		}
		return new Elements(Array.filter(this, (typeOf(a) == "string") ? function(c) {
			return c.match(a)
		} : a, b))
	}.protect(),
	push: function() {
		var d = this.length;
		for(var b = 0, a = arguments.length; b < a; b++) {
			var c = document.id(arguments[b]);
			if(c) {
				this[d++] = c
			}
		}
		return(this.length = d)
	}.protect(),
	unshift: function() {
		var b = [];
		for(var c = 0, a = arguments.length; c < a; c++) {
			var d = document.id(arguments[c]);
			if(d) {
				b.push(d)
			}
		}
		return Array.prototype.unshift.apply(this, b)
	}.protect(),
	concat: function() {
		var b = new Elements(this);
		for(var c = 0, a = arguments.length; c < a; c++) {
			var d = arguments[c];
			if(Type.isEnumerable(d)) {
				b.append(d)
			} else {
				b.push(d)
			}
		}
		return b
	}.protect(),
	append: function(c) {
		for(var b = 0, a = c.length; b < a; b++) {
			this.push(c[b])
		}
		return this
	}.protect(),
	empty: function() {
		while(this.length) {
			delete this[--this.length]
		}
		return this
	}.protect()
});
(function() {
	var g = Array.prototype.splice,
		b = {
			"0": 0,
			"1": 1,
			length: 2
		};
	g.call(b, 1, 1);
	if(b[1] == 1) {
		Elements.implement("splice", function() {
			var e = this.length;
			g.apply(this, arguments);
			while(e >= this.length) {
				delete this[e--]
			}
			return this
		}.protect())
	}
	Elements.implement(Array.prototype);
	Array.mirror(Elements);
	var f;
	try {
		var a = document.createElement("<input name=x>");
		f = (a.name == "x")
	} catch(c) {}
	var d = function(e) {
		return("" + e).replace(/&/g, "&amp;").replace(/"/g, "&quot;")
	};
	Document.implement({
		newElement: function(e, h) {
			if(h && h.checked != null) {
				h.defaultChecked = h.checked
			}
			if(f && h) {
				e = "<" + e;
				if(h.name) {
					e += ' name="' + d(h.name) + '"'
				}
				if(h.type) {
					e += ' type="' + d(h.type) + '"'
				}
				e += ">";
				delete h.name;
				delete h.type
			}
			return this.id(this.createElement(e)).set(h)
		}
	})
})();
Document.implement({
	newTextNode: function(a) {
		return this.createTextNode(a)
	},
	getDocument: function() {
		return this
	},
	getWindow: function() {
		return this.window
	},
	id: (function() {
		var a = {
			string: function(d, c, b) {
				d = Slick.find(b, "#" + d.replace(/(\W)/g, "\\$1"));
				return(d) ? a.element(d, c) : null
			},
			element: function(b, c) {
				$uid(b);
				if(!c && !b.$family && !(/^(?:object|embed)$/i).test(b.tagName)) {
					Object.append(b, Element.Prototype)
				}
				return b
			},
			object: function(c, d, b) {
				if(c.toElement) {
					return a.element(c.toElement(b), d)
				}
				return null
			}
		};
		a.textnode = a.whitespace = a.window = a.document = function(b) {
			return b
		};
		return function(c, e, d) {
			if(c && c.$family && c.uid) {
				return c
			}
			var b = typeOf(c);
			return(a[b]) ? a[b](c, e, d || document) : null
		}
	})()
});
if(window.$ == null) {
	Window.implement("$", function(a, b) {
		return document.id(a, b, this.document)
	})
}
Window.implement({
	getDocument: function() {
		return this.document
	},
	getWindow: function() {
		return this
	}
});
[Document, Element].invoke("implement", {
	getElements: function(a) {
		return Slick.search(this, a, new Elements)
	},
	getElement: function(a) {
		return document.id(Slick.find(this, a))
	}
});
if(window.$$ == null) {
	Window.implement("$$", function(a) {
		if(arguments.length == 1) {
			if(typeof a == "string") {
				return Slick.search(this.document, a, new Elements)
			} else {
				if(Type.isEnumerable(a)) {
					return new Elements(a)
				}
			}
		}
		return new Elements(arguments)
	})
}(function() {
	var k = {},
		i = {};
	var n = {
		input: "checked",
		option: "selected",
		textarea: "value"
	};
	var e = function(p) {
		return(i[p] || (i[p] = {}))
	};
	var j = function(q) {
		var p = q.uid;
		if(q.removeEvents) {
			q.removeEvents()
		}
		if(q.clearAttributes) {
			q.clearAttributes()
		}
		if(p != null) {
			delete k[p];
			delete i[p]
		}
		return q
	};
	var o = ["defaultValue", "accessKey", "cellPadding", "cellSpacing", "colSpan", "frameBorder", "maxLength", "readOnly", "rowSpan", "tabIndex", "useMap"];
	var d = ["compact", "nowrap", "ismap", "declare", "noshade", "checked", "disabled", "readOnly", "multiple", "selected", "noresize", "defer", "defaultChecked"];
	var g = {
		html: "innerHTML",
		"class": "className",
		"for": "htmlFor",
		text: (function() {
			var p = document.createElement("div");
			return(p.textContent == null) ? "innerText" : "textContent"
		})()
	};
	var m = ["type"];
	var h = ["value", "defaultValue"];
	var l = /^(?:href|src|usemap)$/i;
	d = d.associate(d);
	o = o.associate(o.map(String.toLowerCase));
	m = m.associate(m);
	Object.append(g, h.associate(h));
	var c = {
		before: function(q, p) {
			var r = p.parentNode;
			if(r) {
				r.insertBefore(q, p)
			}
		},
		after: function(q, p) {
			var r = p.parentNode;
			if(r) {
				r.insertBefore(q, p.nextSibling)
			}
		},
		bottom: function(q, p) {
			p.appendChild(q)
		},
		top: function(q, p) {
			p.insertBefore(q, p.firstChild)
		}
	};
	c.inside = c.bottom;
	var b = function(s, r) {
		if(!s) {
			return r
		}
		s = Object.clone(Slick.parse(s));
		var q = s.expressions;
		for(var p = q.length; p--;) {
			q[p][0].combinator = r
		}
		return s
	};
	Element.implement({
		set: function(r, q) {
			var p = Element.Properties[r];
			(p && p.set) ? p.set.call(this, q): this.setProperty(r, q)
		}.overloadSetter(),
		get: function(q) {
			var p = Element.Properties[q];
			return(p && p.get) ? p.get.apply(this) : this.getProperty(q)
		}.overloadGetter(),
		erase: function(q) {
			var p = Element.Properties[q];
			(p && p.erase) ? p.erase.apply(this): this.removeProperty(q);
			return this
		},
		setProperty: function(q, r) {
			q = o[q] || q;
			if(r == null) {
				return this.removeProperty(q)
			}
			var p = g[q];
			(p) ? this[p] = r: (d[q]) ? this[q] = !!r : this.setAttribute(q, "" + r);
			return this
		},
		setProperties: function(p) {
			for(var q in p) {
				this.setProperty(q, p[q])
			}
			return this
		},
		getProperty: function(q) {
			q = o[q] || q;
			var p = g[q] || m[q];
			return(p) ? this[p] : (d[q]) ? !!this[q] : (l.test(q) ? this.getAttribute(q, 2) : (p = this.getAttributeNode(q)) ? p.nodeValue : null) || null
		},
		getProperties: function() {
			var p = Array.from(arguments);
			return p.map(this.getProperty, this).associate(p)
		},
		removeProperty: function(q) {
			q = o[q] || q;
			var p = g[q];
			(p) ? this[p] = "": (d[q]) ? this[q] = false : this.removeAttribute(q);
			return this
		},
		removeProperties: function() {
			Array.each(arguments, this.removeProperty, this);
			return this
		},
		hasClass: function(p) {
			return this.className.clean().contains(p, " ")
		},
		addClass: function(p) {
			if(!this.hasClass(p)) {
				this.className = (this.className + " " + p).clean()
			}
			return this
		},
		removeClass: function(p) {
			this.className = this.className.replace(new RegExp("(^|\\s)" + p + "(?:\\s|$)"), "$1");
			return this
		},
		toggleClass: function(p, q) {
			if(q == null) {
				q = !this.hasClass(p)
			}
			return(q) ? this.addClass(p) : this.removeClass(p)
		},
		adopt: function() {
			var s = this,
				p, u = Array.flatten(arguments),
				t = u.length;
			if(t > 1) {
				s = p = document.createDocumentFragment()
			}
			for(var r = 0; r < t; r++) {
				var q = document.id(u[r], true);
				if(q) {
					s.appendChild(q)
				}
			}
			if(p) {
				this.appendChild(p)
			}
			return this
		},
		appendText: function(q, p) {
			return this.grab(this.getDocument().newTextNode(q), p)
		},
		grab: function(q, p) {
			c[p || "bottom"](document.id(q, true), this);
			return this
		},
		inject: function(q, p) {
			c[p || "bottom"](this, document.id(q, true));
			return this
		},
		replaces: function(p) {
			p = document.id(p, true);
			p.parentNode.replaceChild(this, p);
			return this
		},
		wraps: function(q, p) {
			q = document.id(q, true);
			return this.replaces(q).grab(q, p)
		},
		getPrevious: function(p) {
			return document.id(Slick.find(this, b(p, "!~")))
		},
		getAllPrevious: function(p) {
			return Slick.search(this, b(p, "!~"), new Elements)
		},
		getNext: function(p) {
			return document.id(Slick.find(this, b(p, "~")))
		},
		getAllNext: function(p) {
			return Slick.search(this, b(p, "~"), new Elements)
		},
		getFirst: function(p) {
			return document.id(Slick.search(this, b(p, ">"))[0])
		},
		getLast: function(p) {
			return document.id(Slick.search(this, b(p, ">")).getLast())
		},
		getParent: function(p) {
			return document.id(Slick.find(this, b(p, "!")))
		},
		getParents: function(p) {
			return Slick.search(this, b(p, "!"), new Elements)
		},
		getSiblings: function(p) {
			return Slick.search(this, b(p, "~~"), new Elements)
		},
		getChildren: function(p) {
			return Slick.search(this, b(p, ">"), new Elements)
		},
		getWindow: function() {
			return this.ownerDocument.window
		},
		getDocument: function() {
			return this.ownerDocument
		},
		getElementById: function(p) {
			return document.id(Slick.find(this, "#" + ("" + p).replace(/(\W)/g, "\\$1")))
		},
		getSelected: function() {
			this.selectedIndex;
			return new Elements(Array.from(this.options).filter(function(p) {
				return p.selected
			}))
		},
		toQueryString: function() {
			var p = [];
			this.getElements("input, select, textarea").each(function(r) {
				var q = r.type;
				if(!r.name || r.disabled || q == "submit" || q == "reset" || q == "file" || q == "image") {
					return
				}
				var s = (r.get("tag") == "select") ? r.getSelected().map(function(t) {
					return document.id(t).get("value")
				}) : ((q == "radio" || q == "checkbox") && !r.checked) ? null : r.get("value");
				Array.from(s).each(function(t) {
					if(typeof t != "undefined") {
						p.push(encodeURIComponent(r.name) + "=" + encodeURIComponent(t))
					}
				})
			});
			return p.join("&")
		},
		destroy: function() {
			var p = j(this).getElementsByTagName("*");
			Array.each(p, j);
			Element.dispose(this);
			return null
		},
		empty: function() {
			Array.from(this.childNodes).each(Element.dispose);
			return this
		},
		dispose: function() {
			return(this.parentNode) ? this.parentNode.removeChild(this) : this
		},
		match: function(p) {
			return !p || Slick.match(this, p)
		}
	});
	var a = function(t, s, q) {
		if(!q) {
			t.setAttributeNode(document.createAttribute("id"))
		}
		if(t.clearAttributes) {
			t.clearAttributes();
			t.mergeAttributes(s);
			t.removeAttribute("uid");
			if(t.options) {
				var u = t.options,
					p = s.options;
				for(var r = u.length; r--;) {
					u[r].selected = p[r].selected
				}
			}
		}
		var v = n[s.tagName.toLowerCase()];
		if(v && s[v]) {
			t[v] = s[v]
		}
	};
	Element.implement("clone", function(r, p) {
		r = r !== false;
		var w = this.cloneNode(r),
			q;
		if(r) {
			var s = w.getElementsByTagName("*"),
				u = this.getElementsByTagName("*");
			for(q = s.length; q--;) {
				a(s[q], u[q], p)
			}
		}
		a(w, this, p);
		if(Browser.ie) {
			var t = w.getElementsByTagName("object"),
				v = this.getElementsByTagName("object");
			for(q = t.length; q--;) {
				t[q].outerHTML = v[q].outerHTML
			}
		}
		return document.id(w)
	});
	var f = {
		contains: function(p) {
			return Slick.contains(this, p)
		}
	};
	if(!document.contains) {
		Document.implement(f)
	}
	if(!document.createElement("div").contains) {
		Element.implement(f)
	}[Element, Window, Document].invoke("implement", {
		addListener: function(s, r) {
			if(s == "unload") {
				var p = r,
					q = this;
				r = function() {
					q.removeListener("unload", r);
					p()
				}
			} else {
				k[$uid(this)] = this
			}
			if(this.addEventListener) {
				this.addEventListener(s, r, !!arguments[2])
			} else {
				this.attachEvent("on" + s, r)
			}
			return this
		},
		removeListener: function(q, p) {
			if(this.removeEventListener) {
				this.removeEventListener(q, p, !!arguments[2])
			} else {
				this.detachEvent("on" + q, p)
			}
			return this
		},
		retrieve: function(q, p) {
			var s = e($uid(this)),
				r = s[q];
			if(p != null && r == null) {
				r = s[q] = p
			}
			return r != null ? r : null
		},
		store: function(q, p) {
			var r = e($uid(this));
			r[q] = p;
			return this
		},
		eliminate: function(p) {
			var q = e($uid(this));
			delete q[p];
			return this
		}
	});
	if(window.attachEvent && !window.addEventListener) {
		window.addListener("unload", function() {
			Object.each(k, j);
			if(window.CollectGarbage) {
				CollectGarbage()
			}
		})
	}
})();
Element.Properties = {};
Element.Properties.style = {
	set: function(a) {
		this.style.cssText = a
	},
	get: function() {
		return this.style.cssText
	},
	erase: function() {
		this.style.cssText = ""
	}
};
Element.Properties.tag = {
	get: function() {
		return this.tagName.toLowerCase()
	}
};
(function(a) {
	if(a != null) {
		Element.Properties.maxlength = Element.Properties.maxLength = {
			get: function() {
				var b = this.getAttribute("maxLength");
				return b == a ? null : b
			}
		}
	}
})(document.createElement("input").getAttribute("maxLength"));
Element.Properties.html = (function() {
	var c = Function.attempt(function() {
		var e = document.createElement("table");
		e.innerHTML = "<tr><td></td></tr>"
	});
	var d = document.createElement("div");
	var a = {
		table: [1, "<table>", "</table>"],
		select: [1, "<select>", "</select>"],
		tbody: [2, "<table><tbody>", "</tbody></table>"],
		tr: [3, "<table><tbody><tr>", "</tr></tbody></table>"]
	};
	a.thead = a.tfoot = a.tbody;
	var b = {
		set: function() {
			var f = Array.flatten(arguments).join("");
			var g = (!c && a[this.get("tag")]);
			if(g) {
				var h = d;
				h.innerHTML = g[1] + f + g[2];
				for(var e = g[0]; e--;) {
					h = h.firstChild
				}
				this.empty().adopt(h.childNodes)
			} else {
				this.innerHTML = f
			}
		}
	};
	b.erase = b.set;
	return b
})();
(function() {
	var c = document.html;
	Element.Properties.styles = {
		set: function(f) {
			this.setStyles(f)
		}
	};
	var e = (c.style.opacity != null);
	var d = /alpha\(opacity=([\d.]+)\)/i;
	var b = function(g, f) {
		if(!g.currentStyle || !g.currentStyle.hasLayout) {
			g.style.zoom = 1
		}
		if(e) {
			g.style.opacity = f
		} else {
			f = (f == 1) ? "" : "alpha(opacity=" + f * 100 + ")";
			var h = g.style.filter || g.getComputedStyle("filter") || "";
			g.style.filter = d.test(h) ? h.replace(d, f) : h + f
		}
	};
	Element.Properties.opacity = {
		set: function(g) {
			var f = this.style.visibility;
			if(g == 0 && f != "hidden") {
				this.style.visibility = "hidden"
			} else {
				if(g != 0 && f != "visible") {
					this.style.visibility = "visible"
				}
			}
			b(this, g)
		},
		get: (e) ? function() {
			var f = this.style.opacity || this.getComputedStyle("opacity");
			return(f == "") ? 1 : f
		} : function() {
			var f, g = (this.style.filter || this.getComputedStyle("filter"));
			if(g) {
				f = g.match(d)
			}
			return(f == null || g == null) ? 1 : (f[1] / 100)
		}
	};
	var a = (c.style.cssFloat == null) ? "styleFloat" : "cssFloat";
	Element.implement({
		getComputedStyle: function(h) {
			if(this.currentStyle) {
				return this.currentStyle[h.camelCase()]
			}
			var g = Element.getDocument(this).defaultView,
				f = g ? g.getComputedStyle(this, null) : null;
			return(f) ? f.getPropertyValue((h == a) ? "float" : h.hyphenate()) : null
		},
		setOpacity: function(f) {
			b(this, f);
			return this
		},
		getOpacity: function() {
			return this.get("opacity")
		},
		setStyle: function(g, f) {
			switch(g) {
				case "opacity":
					return this.set("opacity", parseFloat(f));
				case "float":
					g = a
			}
			g = g.camelCase();
			if(typeOf(f) != "string") {
				var h = (Element.Styles[g] || "@").split(" ");
				f = Array.from(f).map(function(k, j) {
					if(!h[j]) {
						return ""
					}
					return(typeOf(k) == "number") ? h[j].replace("@", Math.round(k)) : k
				}).join(" ")
			} else {
				if(f == String(Number(f))) {
					f = Math.round(f)
				}
			}
			this.style[g] = f;
			return this
		},
		getStyle: function(l) {
			switch(l) {
				case "opacity":
					return this.get("opacity");
				case "float":
					l = a
			}
			l = l.camelCase();
			var f = this.style[l];
			if(!f || l == "zIndex") {
				f = [];
				for(var k in Element.ShortStyles) {
					if(l != k) {
						continue
					}
					for(var j in Element.ShortStyles[k]) {
						f.push(this.getStyle(j))
					}
					return f.join(" ")
				}
				f = this.getComputedStyle(l)
			}
			if(f) {
				f = String(f);
				var h = f.match(/rgba?\([\d\s,]+\)/);
				if(h) {
					f = f.replace(h[0], h[0].rgbToHex())
				}
			}
			if(Browser.opera || (Browser.ie && isNaN(parseFloat(f)))) {
				if((/^(height|width)$/).test(l)) {
					var g = (l == "width") ? ["left", "right"] : ["top", "bottom"],
						i = 0;
					g.each(function(m) {
						i += this.getStyle("border-" + m + "-width").toInt() + this.getStyle("padding-" + m).toInt()
					}, this);
					return this["offset" + l.capitalize()] - i + "px"
				}
				if(Browser.opera && String(f).indexOf("px") != -1) {
					return f
				}
				if((/^border(.+)Width|margin|padding/).test(l)) {
					return "0px"
				}
			}
			return f
		},
		setStyles: function(g) {
			for(var f in g) {
				this.setStyle(f, g[f])
			}
			return this
		},
		getStyles: function() {
			var f = {};
			Array.flatten(arguments).each(function(g) {
				f[g] = this.getStyle(g)
			}, this);
			return f
		}
	});
	Element.Styles = {
		left: "@px",
		top: "@px",
		bottom: "@px",
		right: "@px",
		width: "@px",
		height: "@px",
		maxWidth: "@px",
		maxHeight: "@px",
		minWidth: "@px",
		minHeight: "@px",
		backgroundColor: "rgb(@, @, @)",
		backgroundPosition: "@px @px",
		color: "rgb(@, @, @)",
		fontSize: "@px",
		letterSpacing: "@px",
		lineHeight: "@px",
		clip: "rect(@px @px @px @px)",
		margin: "@px @px @px @px",
		padding: "@px @px @px @px",
		border: "@px @ rgb(@, @, @) @px @ rgb(@, @, @) @px @ rgb(@, @, @)",
		borderWidth: "@px @px @px @px",
		borderStyle: "@ @ @ @",
		borderColor: "rgb(@, @, @) rgb(@, @, @) rgb(@, @, @) rgb(@, @, @)",
		zIndex: "@",
		zoom: "@",
		fontWeight: "@",
		textIndent: "@px",
		opacity: "@"
	};
	Element.ShortStyles = {
		margin: {},
		padding: {},
		border: {},
		borderWidth: {},
		borderStyle: {},
		borderColor: {}
	};
	["Top", "Right", "Bottom", "Left"].each(function(l) {
		var k = Element.ShortStyles;
		var g = Element.Styles;
		["margin", "padding"].each(function(m) {
			var n = m + l;
			k[m][n] = g[n] = "@px"
		});
		var j = "border" + l;
		k.border[j] = g[j] = "@px @ rgb(@, @, @)";
		var i = j + "Width",
			f = j + "Style",
			h = j + "Color";
		k[j] = {};
		k.borderWidth[i] = k[j][i] = g[i] = "@px";
		k.borderStyle[f] = k[j][f] = g[f] = "@";
		k.borderColor[h] = k[j][h] = g[h] = "rgb(@, @, @)"
	})
}).call(this);
(function() {
	var h = document.createElement("div"),
		e = document.createElement("div");
	h.style.height = "0";
	h.appendChild(e);
	var d = (e.offsetParent === h);
	h = e = null;
	var l = function(m) {
		return k(m, "position") != "static" || a(m)
	};
	var i = function(m) {
		return l(m) || (/^(?:table|td|th)$/i).test(m.tagName)
	};
	Element.implement({
		scrollTo: function(m, n) {
			if(a(this)) {
				this.getWindow().scrollTo(m, n)
			} else {
				this.scrollLeft = m;
				this.scrollTop = n
			}
			return this
		},
		getSize: function() {
			if(a(this)) {
				return this.getWindow().getSize()
			}
			return {
				x: this.offsetWidth,
				y: this.offsetHeight
			}
		},
		getScrollSize: function() {
			if(a(this)) {
				return this.getWindow().getScrollSize()
			}
			return {
				x: this.scrollWidth,
				y: this.scrollHeight
			}
		},
		getScroll: function() {
			if(a(this)) {
				return this.getWindow().getScroll()
			}
			return {
				x: this.scrollLeft,
				y: this.scrollTop
			}
		},
		getScrolls: function() {
			var n = this.parentNode,
				m = {
					x: 0,
					y: 0
				};
			while(n && !a(n)) {
				m.x += n.scrollLeft;
				m.y += n.scrollTop;
				n = n.parentNode
			}
			return m
		},
		getOffsetParent: d ? function() {
			var m = this;
			if(a(m) || k(m, "position") == "fixed") {
				return null
			}
			var n = (k(m, "position") == "static") ? i : l;
			while((m = m.parentNode)) {
				if(n(m)) {
					return m
				}
			}
			return null
		} : function() {
			var m = this;
			if(a(m) || k(m, "position") == "fixed") {
				return null
			}
			try {
				return m.offsetParent
			} catch(n) {}
			return null
		},
		getOffsets: function() {
			if(this.getBoundingClientRect && !Browser.Platform.ios) {
				var r = this.getBoundingClientRect(),
					o = document.id(this.getDocument().documentElement),
					q = o.getScroll(),
					t = this.getScrolls(),
					s = (k(this, "position") == "fixed");
				return {
					x: r.left.toInt() + t.x + ((s) ? 0 : q.x) - o.clientLeft,
					y: r.top.toInt() + t.y + ((s) ? 0 : q.y) - o.clientTop
				}
			}
			var n = this,
				m = {
					x: 0,
					y: 0
				};
			if(a(this)) {
				return m
			}
			while(n && !a(n)) {
				m.x += n.offsetLeft;
				m.y += n.offsetTop;
				if(Browser.firefox) {
					if(!c(n)) {
						m.x += b(n);
						m.y += g(n)
					}
					var p = n.parentNode;
					if(p && k(p, "overflow") != "visible") {
						m.x += b(p);
						m.y += g(p)
					}
				} else {
					if(n != this && Browser.safari) {
						m.x += b(n);
						m.y += g(n)
					}
				}
				n = n.offsetParent
			}
			if(Browser.firefox && !c(this)) {
				m.x -= b(this);
				m.y -= g(this)
			}
			return m
		},
		getPosition: function(p) {
			if(a(this)) {
				return {
					x: 0,
					y: 0
				}
			}
			var q = this.getOffsets(),
				n = this.getScrolls();
			var m = {
				x: q.x - n.x,
				y: q.y - n.y
			};
			if(p && (p = document.id(p))) {
				var o = p.getPosition();
				return {
					x: m.x - o.x - b(p),
					y: m.y - o.y - g(p)
				}
			}
			return m
		},
		getCoordinates: function(o) {
			if(a(this)) {
				return this.getWindow().getCoordinates()
			}
			var m = this.getPosition(o),
				n = this.getSize();
			var p = {
				left: m.x,
				top: m.y,
				width: n.x,
				height: n.y
			};
			p.right = p.left + p.width;
			p.bottom = p.top + p.height;
			return p
		},
		computePosition: function(m) {
			return {
				left: m.x - j(this, "margin-left"),
				top: m.y - j(this, "margin-top")
			}
		},
		setPosition: function(m) {
			return this.setStyles(this.computePosition(m))
		}
	});
	[Document, Window].invoke("implement", {
		getSize: function() {
			var m = f(this);
			return {
				x: m.clientWidth,
				y: m.clientHeight
			}
		},
		getScroll: function() {
			var n = this.getWindow(),
				m = f(this);
			return {
				x: n.pageXOffset || m.scrollLeft,
				y: n.pageYOffset || m.scrollTop
			}
		},
		getScrollSize: function() {
			var o = f(this),
				n = this.getSize(),
				m = this.getDocument().body;
			return {
				x: Math.max(o.scrollWidth, m.scrollWidth, n.x),
				y: Math.max(o.scrollHeight, m.scrollHeight, n.y)
			}
		},
		getPosition: function() {
			return {
				x: 0,
				y: 0
			}
		},
		getCoordinates: function() {
			var m = this.getSize();
			return {
				top: 0,
				left: 0,
				bottom: m.y,
				right: m.x,
				height: m.y,
				width: m.x
			}
		}
	});
	var k = Element.getComputedStyle;

	function j(m, n) {
		return k(m, n).toInt() || 0
	}

	function c(m) {
		return k(m, "-moz-box-sizing") == "border-box"
	}

	function g(m) {
		return j(m, "border-top-width")
	}

	function b(m) {
		return j(m, "border-left-width")
	}

	function a(m) {
		return(/^(?:body|html)$/i).test(m.tagName)
	}

	function f(m) {
		var n = m.getDocument();
		return(!n.compatMode || n.compatMode == "CSS1Compat") ? n.html : n.body
	}
}).call(this);
Element.alias({
	position: "setPosition"
});
[Window, Document, Element].invoke("implement", {
	getHeight: function() {
		return this.getSize().y
	},
	getWidth: function() {
		return this.getSize().x
	},
	getScrollTop: function() {
		return this.getScroll().y
	},
	getScrollLeft: function() {
		return this.getScroll().x
	},
	getScrollHeight: function() {
		return this.getScrollSize().y
	},
	getScrollWidth: function() {
		return this.getScrollSize().x
	},
	getTop: function() {
		return this.getPosition().y
	},
	getLeft: function() {
		return this.getPosition().x
	}
});
(function() {
	var a = this.Class = new Type("Class", function(h) {
		if(instanceOf(h, Function)) {
			h = {
				initialize: h
			}
		}
		var g = function() {
			e(this);
			if(g.$prototyping) {
				return this
			}
			this.$caller = null;
			var i = (this.initialize) ? this.initialize.apply(this, arguments) : this;
			this.$caller = this.caller = null;
			return i
		}.extend(this).implement(h);
		g.$constructor = a;
		g.prototype.$constructor = g;
		g.prototype.parent = c;
		return g
	});
	var c = function() {
		if(!this.$caller) {
			throw new Error('The method "parent" cannot be called.')
		}
		var g = this.$caller.$name,
			h = this.$caller.$owner.parent,
			i = (h) ? h.prototype[g] : null;
		if(!i) {
			throw new Error('The method "' + g + '" has no parent.')
		}
		return i.apply(this, arguments)
	};
	var e = function(g) {
		for(var h in g) {
			var j = g[h];
			switch(typeOf(j)) {
				case "object":
					var i = function() {};
					i.prototype = j;
					g[h] = e(new i);
					break;
				case "array":
					g[h] = j.clone();
					break
			}
		}
		return g
	};
	var b = function(g, h, j) {
		if(j.$origin) {
			j = j.$origin
		}
		var i = function() {
			if(j.$protected && this.$caller == null) {
				throw new Error('The method "' + h + '" cannot be called.')
			}
			var l = this.caller,
				m = this.$caller;
			this.caller = m;
			this.$caller = i;
			var k = j.apply(this, arguments);
			this.$caller = m;
			this.caller = l;
			return k
		}.extend({
			$owner: g,
			$origin: j,
			$name: h
		});
		return i
	};
	var f = function(h, i, g) {
		if(a.Mutators.hasOwnProperty(h)) {
			i = a.Mutators[h].call(this, i);
			if(i == null) {
				return this
			}
		}
		if(typeOf(i) == "function") {
			if(i.$hidden) {
				return this
			}
			this.prototype[h] = (g) ? i : b(this, h, i)
		} else {
			Object.merge(this.prototype, h, i)
		}
		return this
	};
	var d = function(g) {
		g.$prototyping = true;
		var h = new g;
		delete g.$prototyping;
		return h
	};
	a.implement("implement", f.overloadSetter());
	a.Mutators = {
		Extends: function(g) {
			this.parent = g;
			this.prototype = d(g)
		},
		Implements: function(g) {
			Array.from(g).each(function(j) {
				var h = new j;
				for(var i in h) {
					f.call(this, i, h[i], true)
				}
			}, this)
		}
	}
}).call(this);
(function() {
	this.Chain = new Class({
		$chain: [],
		chain: function() {
			this.$chain.append(Array.flatten(arguments));
			return this
		},
		callChain: function() {
			return(this.$chain.length) ? this.$chain.shift().apply(this, arguments) : false
		},
		clearChain: function() {
			this.$chain.empty();
			return this
		}
	});
	var a = function(b) {
		return b.replace(/^on([A-Z])/, function(c, d) {
			return d.toLowerCase()
		})
	};
	this.Events = new Class({
		$events: {},
		addEvent: function(d, c, b) {
			d = a(d);
			this.$events[d] = (this.$events[d] || []).include(c);
			if(b) {
				c.internal = true
			}
			return this
		},
		addEvents: function(b) {
			for(var c in b) {
				this.addEvent(c, b[c])
			}
			return this
		},
		fireEvent: function(e, c, b) {
			e = a(e);
			var d = this.$events[e];
			if(!d) {
				return this
			}
			c = Array.from(c);
			d.each(function(f) {
				if(b) {
					f.delay(b, this, c)
				} else {
					f.apply(this, c)
				}
			}, this);
			return this
		},
		removeEvent: function(e, d) {
			e = a(e);
			var c = this.$events[e];
			if(c && !d.internal) {
				var b = c.indexOf(d);
				if(b != -1) {
					delete c[b]
				}
			}
			return this
		},
		removeEvents: function(d) {
			var e;
			if(typeOf(d) == "object") {
				for(e in d) {
					this.removeEvent(e, d[e])
				}
				return this
			}
			if(d) {
				d = a(d)
			}
			for(e in this.$events) {
				if(d && d != e) {
					continue
				}
				var c = this.$events[e];
				for(var b = c.length; b--;) {
					if(b in c) {
						this.removeEvent(e, c[b])
					}
				}
			}
			return this
		}
	});
	this.Options = new Class({
		setOptions: function() {
			var b = this.options = Object.merge.apply(null, [{}, this.options].append(arguments));
			if(this.addEvent) {
				for(var c in b) {
					if(typeOf(b[c]) != "function" || !(/^on[A-Z]/).test(c)) {
						continue
					}
					this.addEvent(c, b[c]);
					delete b[c]
				}
			}
			return this
		}
	})
}).call(this);
(function() {
	var f = this.Fx = new Class({
		Implements: [Chain, Events, Options],
		options: {
			fps: 60,
			unit: false,
			duration: 500,
			frames: null,
			frameSkip: true,
			link: "ignore"
		},
		initialize: function(g) {
			this.subject = this.subject || this;
			this.setOptions(g)
		},
		getTransition: function() {
			return function(g) {
				return -(Math.cos(Math.PI * g) - 1) / 2
			}
		},
		step: function(g) {
			if(this.options.frameSkip) {
				var h = (this.time != null) ? (g - this.time) : 0,
					i = h / this.frameInterval;
				this.time = g;
				this.frame += i
			} else {
				this.frame++
			}
			if(this.frame < this.frames) {
				var j = this.transition(this.frame / this.frames);
				this.set(this.compute(this.from, this.to, j))
			} else {
				this.frame = this.frames;
				this.set(this.compute(this.from, this.to, 1));
				this.stop()
			}
		},
		set: function(g) {
			return g
		},
		compute: function(i, h, g) {
			return f.compute(i, h, g)
		},
		check: function() {
			if(!this.isRunning()) {
				return true
			}
			switch(this.options.link) {
				case "cancel":
					this.cancel();
					return true;
				case "chain":
					this.chain(this.caller.pass(arguments, this));
					return false
			}
			return false
		},
		start: function(k, j) {
			if(!this.check(k, j)) {
				return this
			}
			this.from = k;
			this.to = j;
			this.frame = (this.options.frameSkip) ? 0 : -1;
			this.time = null;
			this.transition = this.getTransition();
			var i = this.options.frames,
				h = this.options.fps,
				g = this.options.duration;
			this.duration = f.Durations[g] || g.toInt();
			this.frameInterval = 1000 / h;
			this.frames = i || Math.round(this.duration / this.frameInterval);
			this.fireEvent("start", this.subject);
			b.call(this, h);
			return this
		},
		stop: function() {
			if(this.isRunning()) {
				this.time = null;
				d.call(this, this.options.fps);
				if(this.frames == this.frame) {
					this.fireEvent("complete", this.subject);
					if(!this.callChain()) {
						this.fireEvent("chainComplete", this.subject)
					}
				} else {
					this.fireEvent("stop", this.subject)
				}
			}
			return this
		},
		cancel: function() {
			if(this.isRunning()) {
				this.time = null;
				d.call(this, this.options.fps);
				this.frame = this.frames;
				this.fireEvent("cancel", this.subject).clearChain()
			}
			return this
		},
		pause: function() {
			if(this.isRunning()) {
				this.time = null;
				d.call(this, this.options.fps)
			}
			return this
		},
		resume: function() {
			if((this.frame < this.frames) && !this.isRunning()) {
				b.call(this, this.options.fps)
			}
			return this
		},
		isRunning: function() {
			var g = e[this.options.fps];
			return g && g.contains(this)
		}
	});
	f.compute = function(i, h, g) {
		return(h - i) * g + i
	};
	f.Durations = {
		"short": 250,
		normal: 500,
		"long": 1000
	};
	var e = {},
		c = {};
	var a = function() {
		var h = Date.now();
		for(var j = this.length; j--;) {
			var g = this[j];
			if(g) {
				g.step(h)
			}
		}
	};
	var b = function(h) {
		var g = e[h] || (e[h] = []);
		g.push(this);
		if(!c[h]) {
			c[h] = a.periodical(Math.round(1000 / h), g)
		}
	};
	var d = function(h) {
		var g = e[h];
		if(g) {
			g.erase(this);
			if(!g.length && c[h]) {
				delete e[h];
				c[h] = clearInterval(c[h])
			}
		}
	}
}).call(this);
Fx.CSS = new Class({
	Extends: Fx,
	prepare: function(c, d, b) {
		b = Array.from(b);
		if(b[1] == null) {
			b[1] = b[0];
			b[0] = c.getStyle(d)
		}
		var a = b.map(this.parse);
		return {
			from: a[0],
			to: a[1]
		}
	},
	parse: function(a) {
		a = Function.from(a)();
		a = (typeof a == "string") ? a.split(" ") : Array.from(a);
		return a.map(function(c) {
			c = String(c);
			var b = false;
			Object.each(Fx.CSS.Parsers, function(f, e) {
				if(b) {
					return
				}
				var d = f.parse(c);
				if(d || d === 0) {
					b = {
						value: d,
						parser: f
					}
				}
			});
			b = b || {
				value: c,
				parser: Fx.CSS.Parsers.String
			};
			return b
		})
	},
	compute: function(d, c, b) {
		var a = [];
		(Math.min(d.length, c.length)).times(function(e) {
			a.push({
				value: d[e].parser.compute(d[e].value, c[e].value, b),
				parser: d[e].parser
			})
		});
		a.$family = Function.from("fx:css:value");
		return a
	},
	serve: function(c, b) {
		if(typeOf(c) != "fx:css:value") {
			c = this.parse(c)
		}
		var a = [];
		c.each(function(d) {
			a = a.concat(d.parser.serve(d.value, b))
		});
		return a
	},
	render: function(a, d, c, b) {
		a.setStyle(d, this.serve(c, b))
	},
	search: function(a) {
		if(Fx.CSS.Cache[a]) {
			return Fx.CSS.Cache[a]
		}
		var c = {},
			b = new RegExp("^" + a.escapeRegExp() + "$");
		Array.each(document.styleSheets, function(f, e) {
			var d = f.href;
			if(d && d.contains("://") && !d.contains(document.domain)) {
				return
			}
			var g = f.rules || f.cssRules;
			Array.each(g, function(k, h) {
				if(!k.style) {
					return
				}
				var j = (k.selectorText) ? k.selectorText.replace(/^\w+/, function(i) {
					return i.toLowerCase()
				}) : null;
				if(!j || !b.test(j)) {
					return
				}
				Object.each(Element.Styles, function(l, i) {
					if(!k.style[i] || Element.ShortStyles[i]) {
						return
					}
					l = String(k.style[i]);
					c[i] = ((/^rgb/).test(l)) ? l.rgbToHex() : l
				})
			})
		});
		return Fx.CSS.Cache[a] = c
	}
});
Fx.CSS.Cache = {};
Fx.CSS.Parsers = {
	Color: {
		parse: function(a) {
			if(a.match(/^#[0-9a-f]{3,6}$/i)) {
				return a.hexToRgb(true)
			}
			return((a = a.match(/(\d+),\s*(\d+),\s*(\d+)/))) ? [a[1], a[2], a[3]] : false
		},
		compute: function(c, b, a) {
			return c.map(function(e, d) {
				return Math.round(Fx.compute(c[d], b[d], a))
			})
		},
		serve: function(a) {
			return a.map(Number)
		}
	},
	Number: {
		parse: parseFloat,
		compute: Fx.compute,
		serve: function(b, a) {
			return(a) ? b + a : b
		}
	},
	String: {
		parse: Function.from(false),
		compute: function(b, a) {
			return a
		},
		serve: function(a) {
			return a
		}
	}
};
Fx.Tween = new Class({
	Extends: Fx.CSS,
	initialize: function(b, a) {
		this.element = this.subject = document.id(b);
		this.parent(a)
	},
	set: function(b, a) {
		if(arguments.length == 1) {
			a = b;
			b = this.property || this.options.property
		}
		this.render(this.element, b, a, this.options.unit);
		return this
	},
	start: function(c, e, d) {
		if(!this.check(c, e, d)) {
			return this
		}
		var b = Array.flatten(arguments);
		this.property = this.options.property || b.shift();
		var a = this.prepare(this.element, this.property, b);
		return this.parent(a.from, a.to)
	}
});
Element.Properties.tween = {
	set: function(a) {
		this.get("tween").cancel().setOptions(a);
		return this
	},
	get: function() {
		var a = this.retrieve("tween");
		if(!a) {
			a = new Fx.Tween(this, {
				link: "cancel"
			});
			this.store("tween", a)
		}
		return a
	}
};
Element.implement({
	tween: function(a, c, b) {
		this.get("tween").start(arguments);
		return this
	},
	fade: function(c) {
		var e = this.get("tween"),
			d = "opacity",
			a;
		c = [c, "toggle"].pick();
		switch(c) {
			case "in":
				e.start(d, 1);
				break;
			case "out":
				e.start(d, 0);
				break;
			case "show":
				e.set(d, 1);
				break;
			case "hide":
				e.set(d, 0);
				break;
			case "toggle":
				var b = this.retrieve("fade:flag", this.get("opacity") == 1);
				e.start(d, (b) ? 0 : 1);
				this.store("fade:flag", !b);
				a = true;
				break;
			default:
				e.start(d, arguments)
		}
		if(!a) {
			this.eliminate("fade:flag")
		}
		return this
	},
	highlight: function(c, a) {
		if(!a) {
			a = this.retrieve("highlight:original", this.getStyle("background-color"));
			a = (a == "transparent") ? "#fff" : a
		}
		var b = this.get("tween");
		b.start("background-color", c || "#ffff88", a).chain(function() {
			this.setStyle("background-color", this.retrieve("highlight:original"));
			b.callChain()
		}.bind(this));
		return this
	}
});
(function() {
	var a = Object.prototype.hasOwnProperty;
	Object.extend({
		subset: function(d, g) {
			var f = {};
			for(var e = 0, b = g.length; e < b; e++) {
				var c = g[e];
				f[c] = d[c]
			}
			return f
		},
		map: function(b, e, f) {
			var d = {};
			for(var c in b) {
				if(a.call(b, c)) {
					d[c] = e.call(f, b[c], c, b)
				}
			}
			return d
		},
		filter: function(b, d, e) {
			var c = {};
			Object.each(b, function(g, f) {
				if(d.call(e, g, f, b)) {
					c[f] = g
				}
			});
			return c
		},
		every: function(b, d, e) {
			for(var c in b) {
				if(a.call(b, c) && !d.call(e, b[c], c)) {
					return false
				}
			}
			return true
		},
		some: function(b, d, e) {
			for(var c in b) {
				if(a.call(b, c) && d.call(e, b[c], c)) {
					return true
				}
			}
			return false
		},
		keys: function(b) {
			var d = [];
			for(var c in b) {
				if(a.call(b, c)) {
					d.push(c)
				}
			}
			return d
		},
		values: function(c) {
			var b = [];
			for(var d in c) {
				if(a.call(c, d)) {
					b.push(c[d])
				}
			}
			return b
		},
		getLength: function(b) {
			return Object.keys(b).length
		},
		keyOf: function(b, d) {
			for(var c in b) {
				if(a.call(b, c) && b[c] === d) {
					return c
				}
			}
			return null
		},
		contains: function(b, c) {
			return Object.keyOf(b, c) != null
		},
		toQueryString: function(b, c) {
			var d = [];
			Object.each(b, function(h, g) {
				if(c) {
					g = c + "[" + g + "]"
				}
				var f;
				switch(typeOf(h)) {
					case "object":
						f = Object.toQueryString(h, g);
						break;
					case "array":
						var e = {};
						h.each(function(k, j) {
							e[j] = k
						});
						f = Object.toQueryString(e, g);
						break;
					default:
						f = g + "=" + encodeURIComponent(h)
				}
				if(h != null) {
					d.push(f)
				}
			});
			return d.join("&")
		}
	})
})();
(function() {
	var d = function() {},
		a = ("onprogress" in new Browser.Request);
	var c = this.Request = new Class({
		Implements: [Chain, Events, Options],
		options: {
			url: "",
			data: "",
			headers: {
				"X-Requested-With": "XMLHttpRequest",
				Accept: "text/javascript, text/html, application/xml, text/xml, */*"
			},
			async: true,
			format: false,
			method: "post",
			link: "ignore",
			isSuccess: null,
			emulation: true,
			urlEncoded: true,
			encoding: "utf-8",
			evalScripts: false,
			evalResponse: false,
			timeout: 0,
			noCache: false
		},
		initialize: function(e) {
			this.xhr = new Browser.Request();
			this.setOptions(e);
			this.headers = this.options.headers
		},
		onStateChange: function() {
			var e = this.xhr;
			if(e.readyState != 4 || !this.running) {
				return
			}
			this.running = false;
			this.status = 0;
			Function.attempt(function() {
				var f = e.status;
				this.status = (f == 1223) ? 204 : f
			}.bind(this));
			e.onreadystatechange = d;
			if(a) {
				e.onprogress = e.onloadstart = d
			}
			clearTimeout(this.timer);
			this.response = {
				text: this.xhr.responseText || "",
				xml: this.xhr.responseXML
			};
			if(this.options.isSuccess.call(this, this.status)) {
				this.success(this.response.text, this.response.xml)
			} else {
				this.failure()
			}
		},
		isSuccess: function() {
			var e = this.status;
			return(e >= 200 && e < 300)
		},
		isRunning: function() {
			return !!this.running
		},
		processScripts: function(e) {
			if(this.options.evalResponse || (/(ecma|java)script/).test(this.getHeader("Content-type"))) {
				return Browser.exec(e)
			}
			return e.stripScripts(this.options.evalScripts)
		},
		success: function(f, e) {
			this.onSuccess(this.processScripts(f), e)
		},
		onSuccess: function() {
			this.fireEvent("complete", arguments).fireEvent("success", arguments).callChain()
		},
		failure: function() {
			this.onFailure()
		},
		onFailure: function() {
			this.fireEvent("complete").fireEvent("failure", this.xhr)
		},
		loadstart: function(e) {
			this.fireEvent("loadstart", [e, this.xhr])
		},
		progress: function(e) {
			this.fireEvent("progress", [e, this.xhr])
		},
		timeout: function() {
			this.fireEvent("timeout", this.xhr)
		},
		setHeader: function(e, f) {
			this.headers[e] = f;
			return this
		},
		getHeader: function(e) {
			return Function.attempt(function() {
				return this.xhr.getResponseHeader(e)
			}.bind(this))
		},
		check: function() {
			if(!this.running) {
				return true
			}
			switch(this.options.link) {
				case "cancel":
					this.cancel();
					return true;
				case "chain":
					this.chain(this.caller.pass(arguments, this));
					return false
			}
			return false
		},
		send: function(o) {
			if(!this.check(o)) {
				return this
			}
			this.options.isSuccess = this.options.isSuccess || this.isSuccess;
			this.running = true;
			var l = typeOf(o);
			if(l == "string" || l == "element") {
				o = {
					data: o
				}
			}
			var h = this.options;
			o = Object.append({
				data: h.data,
				url: h.url,
				method: h.method
			}, o);
			var j = o.data,
				f = String(o.url),
				e = o.method.toLowerCase();
			switch(typeOf(j)) {
				case "element":
					j = document.id(j).toQueryString();
					break;
				case "object":
				case "hash":
					j = Object.toQueryString(j)
			}
			if(this.options.format) {
				var m = "format=" + this.options.format;
				j = (j) ? m + "&" + j : m
			}
			if(this.options.emulation && !["get", "post"].contains(e)) {
				var k = "_method=" + e;
				j = (j) ? k + "&" + j : k;
				e = "post"
			}
			if(this.options.urlEncoded && ["post", "put"].contains(e)) {
				var g = (this.options.encoding) ? "; charset=" + this.options.encoding : "";
				this.headers["Content-type"] = "application/x-www-form-urlencoded" + g
			}
			if(!f) {
				f = document.location.pathname
			}
			var i = f.lastIndexOf("/");
			if(i > -1 && (i = f.indexOf("#")) > -1) {
				f = f.substr(0, i)
			}
			if(this.options.noCache) {
				f += (f.contains("?") ? "&" : "?") + String.uniqueID()
			}
			if(j && e == "get") {
				f += (f.contains("?") ? "&" : "?") + j;
				j = null
			}
			var n = this.xhr;
			if(a) {
				n.onloadstart = this.loadstart.bind(this);
				n.onprogress = this.progress.bind(this)
			}
			n.open(e.toUpperCase(), f, this.options.async, this.options.user, this.options.password);
			if(this.options.user && "withCredentials" in n) {
				n.withCredentials = true
			}
			n.onreadystatechange = this.onStateChange.bind(this);
			Object.each(this.headers, function(q, p) {
				try {
					n.setRequestHeader(p, q)
				} catch(r) {
					this.fireEvent("exception", [p, q])
				}
			}, this);
			this.fireEvent("request");
			n.send(j);
			if(!this.options.async) {
				this.onStateChange()
			}
			if(this.options.timeout) {
				this.timer = this.timeout.delay(this.options.timeout, this)
			}
			return this
		},
		cancel: function() {
			if(!this.running) {
				return this
			}
			this.running = false;
			var e = this.xhr;
			e.abort();
			clearTimeout(this.timer);
			e.onreadystatechange = d;
			if(a) {
				e.onprogress = e.onloadstart = d
			}
			this.xhr = new Browser.Request();
			this.fireEvent("cancel");
			return this
		}
	});
	var b = {};
	["get", "post", "put", "delete", "GET", "POST", "PUT", "DELETE"].each(function(e) {
		b[e] = function(g) {
			var f = {
				method: e
			};
			if(g != null) {
				f.data = g
			}
			return this.send(f)
		}
	});
	c.implement(b);
	Element.Properties.send = {
		set: function(e) {
			var f = this.get("send").cancel();
			f.setOptions(e);
			return this
		},
		get: function() {
			var e = this.retrieve("send");
			if(!e) {
				e = new c({
					data: this,
					link: "cancel",
					method: this.get("method") || "post",
					url: this.get("action")
				});
				this.store("send", e)
			}
			return e
		}
	};
	Element.implement({
		send: function(e) {
			var f = this.get("send");
			f.send({
				data: this,
				url: e || f.options.url
			});
			return this
		}
	})
})();
var Event = new Type("Event", function(a, i) {
	if(!i) {
		i = window
	}
	var o = i.document;
	a = a || i.event;
	if(a.$extended) {
		return a
	}
	this.$extended = true;
	var n = a.type,
		k = a.target || a.srcElement,
		m = {},
		c = {},
		q = null,
		h, l, b, p;
	while(k && k.nodeType == 3) {
		k = k.parentNode
	}
	if(n.indexOf("key") != -1) {
		b = a.which || a.keyCode;
		p = Object.keyOf(Event.Keys, b);
		if(n == "keydown") {
			var d = b - 111;
			if(d > 0 && d < 13) {
				p = "f" + d
			}
		}
		if(!p) {
			p = String.fromCharCode(b).toLowerCase()
		}
	} else {
		if((/click|mouse|menu/i).test(n)) {
			o = (!o.compatMode || o.compatMode == "CSS1Compat") ? o.html : o.body;
			m = {
				x: (a.pageX != null) ? a.pageX : a.clientX + o.scrollLeft,
				y: (a.pageY != null) ? a.pageY : a.clientY + o.scrollTop
			};
			c = {
				x: (a.pageX != null) ? a.pageX - i.pageXOffset : a.clientX,
				y: (a.pageY != null) ? a.pageY - i.pageYOffset : a.clientY
			};
			if((/DOMMouseScroll|mousewheel/).test(n)) {
				l = (a.wheelDelta) ? a.wheelDelta / 120 : -(a.detail || 0) / 3
			}
			h = (a.which == 3) || (a.button == 2);
			if((/over|out/).test(n)) {
				q = a.relatedTarget || a[(n == "mouseover" ? "from" : "to") + "Element"];
				var j = function() {
					while(q && q.nodeType == 3) {
						q = q.parentNode
					}
					return true
				};
				var g = (Browser.firefox2) ? j.attempt() : j();
				q = (g) ? q : null
			}
		} else {
			if((/gesture|touch/i).test(n)) {
				this.rotation = a.rotation;
				this.scale = a.scale;
				this.targetTouches = a.targetTouches;
				this.changedTouches = a.changedTouches;
				var f = this.touches = a.touches;
				if(f && f[0]) {
					var e = f[0];
					m = {
						x: e.pageX,
						y: e.pageY
					};
					c = {
						x: e.clientX,
						y: e.clientY
					}
				}
			}
		}
	}
	return Object.append(this, {
		event: a,
		type: n,
		page: m,
		client: c,
		rightClick: h,
		wheel: l,
		relatedTarget: document.id(q),
		target: document.id(k),
		code: b,
		key: p,
		shift: a.shiftKey,
		control: a.ctrlKey,
		alt: a.altKey,
		meta: a.metaKey
	})
});
Event.Keys = {
	enter: 13,
	up: 38,
	down: 40,
	left: 37,
	right: 39,
	esc: 27,
	space: 32,
	backspace: 8,
	tab: 9,
	"delete": 46
};
Event.implement({
	stop: function() {
		return this.stopPropagation().preventDefault()
	},
	stopPropagation: function() {
		if(this.event.stopPropagation) {
			this.event.stopPropagation()
		} else {
			this.event.cancelBubble = true
		}
		return this
	},
	preventDefault: function() {
		if(this.event.preventDefault) {
			this.event.preventDefault()
		} else {
			this.event.returnValue = false
		}
		return this
	}
});
(function() {
	Element.Properties.events = {
		set: function(b) {
			this.addEvents(b)
		}
	};
	[Element, Window, Document].invoke("implement", {
		addEvent: function(f, h) {
			var i = this.retrieve("events", {});
			if(!i[f]) {
				i[f] = {
					keys: [],
					values: []
				}
			}
			if(i[f].keys.contains(h)) {
				return this
			}
			i[f].keys.push(h);
			var g = f,
				b = Element.Events[f],
				d = h,
				j = this;
			if(b) {
				if(b.onAdd) {
					b.onAdd.call(this, h)
				}
				if(b.condition) {
					d = function(k) {
						if(b.condition.call(this, k)) {
							return h.call(this, k)
						}
						return true
					}
				}
				g = b.base || g
			}
			var e = function() {
				return h.call(j)
			};
			var c = Element.NativeEvents[g];
			if(c) {
				if(c == 2) {
					e = function(k) {
						k = new Event(k, j.getWindow());
						if(d.call(j, k) === false) {
							k.stop()
						}
					}
				}
				this.addListener(g, e, arguments[2])
			}
			i[f].values.push(e);
			return this
		},
		removeEvent: function(e, d) {
			var c = this.retrieve("events");
			if(!c || !c[e]) {
				return this
			}
			var h = c[e];
			var b = h.keys.indexOf(d);
			if(b == -1) {
				return this
			}
			var g = h.values[b];
			delete h.keys[b];
			delete h.values[b];
			var f = Element.Events[e];
			if(f) {
				if(f.onRemove) {
					f.onRemove.call(this, d)
				}
				e = f.base || e
			}
			return(Element.NativeEvents[e]) ? this.removeListener(e, g, arguments[2]) : this
		},
		addEvents: function(b) {
			for(var c in b) {
				this.addEvent(c, b[c])
			}
			return this
		},
		removeEvents: function(b) {
			var d;
			if(typeOf(b) == "object") {
				for(d in b) {
					this.removeEvent(d, b[d])
				}
				return this
			}
			var c = this.retrieve("events");
			if(!c) {
				return this
			}
			if(!b) {
				for(d in c) {
					this.removeEvents(d)
				}
				this.eliminate("events")
			} else {
				if(c[b]) {
					c[b].keys.each(function(e) {
						this.removeEvent(b, e)
					}, this);
					delete c[b]
				}
			}
			return this
		},
		fireEvent: function(e, c, b) {
			var d = this.retrieve("events");
			if(!d || !d[e]) {
				return this
			}
			c = Array.from(c);
			d[e].keys.each(function(f) {
				if(b) {
					f.delay(b, this, c)
				} else {
					f.apply(this, c)
				}
			}, this);
			return this
		},
		cloneEvents: function(e, d) {
			e = document.id(e);
			var c = e.retrieve("events");
			if(!c) {
				return this
			}
			if(!d) {
				for(var b in c) {
					this.cloneEvents(e, b)
				}
			} else {
				if(c[d]) {
					c[d].keys.each(function(f) {
						this.addEvent(d, f)
					}, this)
				}
			}
			return this
		}
	});
	Element.NativeEvents = {
		click: 2,
		dblclick: 2,
		mouseup: 2,
		mousedown: 2,
		contextmenu: 2,
		mousewheel: 2,
		DOMMouseScroll: 2,
		mouseover: 2,
		mouseout: 2,
		mousemove: 2,
		selectstart: 2,
		selectend: 2,
		keydown: 2,
		keypress: 2,
		keyup: 2,
		orientationchange: 2,
		touchstart: 2,
		touchmove: 2,
		touchend: 2,
		touchcancel: 2,
		gesturestart: 2,
		gesturechange: 2,
		gestureend: 2,
		focus: 2,
		blur: 2,
		change: 2,
		reset: 2,
		select: 2,
		submit: 2,
		load: 2,
		unload: 1,
		beforeunload: 2,
		resize: 1,
		move: 1,
		DOMContentLoaded: 1,
		readystatechange: 1,
		error: 1,
		abort: 1,
		scroll: 1
	};
	var a = function(b) {
		var c = b.relatedTarget;
		if(c == null) {
			return true
		}
		if(!c) {
			return false
		}
		return(c != this && c.prefix != "xul" && typeOf(this) != "document" && !this.contains(c))
	};
	Element.Events = {
		mouseenter: {
			base: "mouseover",
			condition: a
		},
		mouseleave: {
			base: "mouseout",
			condition: a
		},
		mousewheel: {
			base: (Browser.firefox) ? "DOMMouseScroll" : "mousewheel"
		}
	}
}).call(this);
(function(j, l) {
	var m, g, f = [],
		c, b, n = true;
	try {
		n = j.frameElement != null
	} catch(i) {}
	var h = function() {
		clearTimeout(b);
		if(m) {
			return
		}
		Browser.loaded = m = true;
		l.removeListener("DOMContentLoaded", h).removeListener("readystatechange", a);
		l.fireEvent("domready");
		j.fireEvent("domready")
	};
	var a = function() {
		for(var e = f.length; e--;) {
			if(f[e]()) {
				h();
				return true
			}
		}
		return false
	};
	var k = function() {
		clearTimeout(b);
		if(!a()) {
			b = setTimeout(k, 10)
		}
	};
	l.addListener("DOMContentLoaded", h);
	var d = l.createElement("div");
	if(d.doScroll && !n) {
		f.push(function() {
			try {
				d.doScroll();
				return true
			} catch(o) {}
			return false
		});
		c = true
	}
	if(l.readyState) {
		f.push(function() {
			var e = l.readyState;
			return(e == "loaded" || e == "complete")
		})
	}
	if("onreadystatechange" in l) {
		l.addListener("readystatechange", a)
	} else {
		c = true
	}
	if(c) {
		k()
	}
	Element.Events.domready = {
		onAdd: function(e) {
			if(m) {
				e.call(this)
			}
		}
	};
	Element.Events.load = {
		base: "load",
		onAdd: function(e) {
			if(g && this == j) {
				e.call(this)
			}
		},
		condition: function() {
			if(this == j) {
				h();
				delete Element.Events.load
			}
			return true
		}
	};
	j.addEvent("load", function() {
		g = true
	})
})(window, document);
(function(c, a) {
	var b = window.MooTools && window.MooTools.version == "1.3.1";
	if(b) {
		if(!window.$empty) {
			$empty = Function.from;
			$clear = clearTimeout
		}
		if(!window.$type) {
			$type = typeOf
		}
	} else {
		if(Browser.Engine) {
			Browser.ie6 = Browser.Engine.trident4;
			Browser.ie7 = Browser.Engine.trident5;
			Browser.opera = Browser.Engine.presto
		}
	}
	window.store("hashchange:interval", 300);
	window.store("hashchange:ieframe-src", "./blank.html");
	window.store("hashchange:implemented", !!("onhashchange" in window));
	Element.Events.hashchange = {
		onAdd: function(g) {
			Element.Events.hashchange.onAdd = $empty;
			var d = c(this);
			var e = $empty;
			if($type(d) != "window") {
				return
			}
			window.store("hashchange:changed", false);
			var k = function(n, l) {
				window.store("hashchange:current", l || n);
				if(window.retrieve("hashchange:changed")) {
					n = n.trim();
					if(n.length == 0) {
						var m = new String(window.location);
						if(m.indexOf("#") >= 0) {
							n = "#"
						}
					}
					window.fireEvent("hashchange", [n])
				} else {
					window.store("hashchange:changed", true)
				}
			};
			if(typeof window.onhashchange == "function" && g !== window.onhashchange) {
				window.addEvent("hashchange", window.onhashchange);
				window.onhashchange = null
			}
			if(Browser.ie6 || Browser.ie7) {
				e = function(m, q) {
					var r = window.retrieve("hashchange:checker");
					var o = window.retrieve("hashchange:timer");
					$clear(o);
					o = null;
					var l = q && m.length == 0;
					var s = m == "#";
					var t, p, w = unescape(new String(window.location));
					if(s) {
						p = t = "#"
					} else {
						if(l) {
							p = t = ""
						} else {
							m = m != null ? m : w;
							t = m;
							if(m.length > 0) {
								var u = m.indexOf("#");
								if(u >= 0) {
									t = m.substr(u)
								}
							}
							p = t.toLowerCase()
						}
					}
					var v = window.retrieve("hashchange:current");
					if(v != p) {
						if(q) {
							m = w;
							if(v) {
								m = m.replace(v, t)
							} else {
								m += t
							}
							window.location = m
						}
						var n = !q && window.retrieve("hashchange:changed");
						k(t, p);
						if(n) {
							window.retrieve("hashchange:ieframe").setPath(t)
						}
					}
					o = r.delay(window.retrieve("hashchange:interval"));
					window.store("hashchange:timer", o)
				};
				var j = window.retrieve("hashchange:ieframe-src");
				var i = new IFrame({
					id: "hashchange-ie-frame",
					src: j + "?start",
					styles: {
						width: 0,
						height: 0,
						position: "absolute",
						top: -9999,
						left: -9999
					},
					onload: function() {
						var l = c("hashchange-ie-frame");
						if(l.retrieve("loaded")) {
							var n = unescape(new String(l.contentWindow.location));
							var m = n.indexOf("?");
							if(m >= 0) {
								var q = "",
									o = false;
								if(n.indexOf("?empty") >= 0) {
									q = "#"
								} else {
									m = n.indexOf("?!");
									if(m >= 0) {
										q = n.substr(m + 2);
										q = "#" + q
									}
								}
								var p = window.retrieve("hashchange:current");
								if(p != q) {
									window.retrieve("hashchange:checker")(q, true)
								}
							}
						} else {
							l.store("loaded", true)
						}
					}.bind(window)
				});
				window.store("hashchange:ieframe", i);
				i.injectInside(document.body);
				var h = i.contentWindow;
				i.setPath = function(l) {
					if(l.charAt(0) == "#") {
						l = l.substr(1);
						if(l.length == 0) {
							this.contentWindow.location = j + "?empty";
							return
						}
					}
					this.contentWindow.location = j + "?!" + escape(l)
				}.bind(i)
			} else {
				if(window.retrieve("hashchange:implemented")) {
					e = window.onhashchange = function(l) {
						l = l && typeof l == "string" ? l : new String(window.location.hash);
						k.delay(1, window, [l])
					}
				} else {
					if(Browser.opera) {
						history.navigationMode = "compatible"
					}
					e = function(o) {
						var l = window.retrieve("hashchange:checker");
						var p = window.retrieve("hashchange:timer");
						$clear(p);
						p = null;
						var o = o || new String(window.location.hash);
						var m = o.toLowerCase();
						if(o.length == 0 && new String(window.location).indexOf("#") >= 0) {
							m = "#"
						}
						var n = window.retrieve("hashchange:current");
						if(n != m) {
							k(o, m)
						}
						p = l.delay(window.retrieve("hashchange:interval"));
						window.store("hashchange:timer", p)
					}
				}
			}
			window.store("hashchange:checker", e);
			e();
			var f = function(n) {
				if(n.charAt(0) != "#") {
					n = "#" + n
				}
				if(Browser.ie6 || Browser.ie7) {
					var l = new String(window.location);
					var m = l.match(/#.+?$/);
					m = m && m[0] ? m[0] : "";
					if(m.length > 0) {
						window.location = l.replace(m, n)
					} else {
						window.location += n
					}
				} else {
					window.location.hash = n
				}
				if(!window.retrieve("hashchange:implemented")) {
					window.retrieve("hashchange:checker")()
				}
			};
			window.sethash = f
		},
		onDelete: function() {
			if($type(this) == "window") {
				var d = window.retrieve("hashchange:timer");
				if(d) {
					$clear(d);
					d = null;
					window.store("hashchange:timer", null)
				}
			}
		}
	}
})(document.id, $$);
(function() {
	var b = false;
	var a = this.BVLayer = new Class({
		initialize: function(d) {
			if(!c) {
				a._initializeQuirks()
			}
			this.root = d ? d.root : this;
			this.superlayer = d;
			this.sublayers = [];
			this._offsetX = 0;
			this._offsetY = 0;
			this.x = 0;
			this.y = 0;
			this.width = 0;
			this.height = 0;
			this.zPosition = 0;
			this.accelerated = false;
			this.touchable = false;
			this.hoverable = false;
			this.hidden = false;
			this.invisible = false;
			this.masksToBounds = false;
			this.contentsURL = null;
			this.backgroundColor = null;
			this.cornerRadius = 0;
			this.opacity = 1;
			this.scale = 1;
			this.rotation = 0;
			this.globalID = null;
			this._animationDuration = 0;
			if(d) {
				d.sublayers.push(this)
			}
			this.setHasElement(true)
		},
		getAncestorWithElement: function() {
			for(var d = this.superlayer; !!d; d = d.superlayer) {
				if(d.element) {
					return d
				}
			}
			return null
		},
		setHasElement: function(e) {
			if(e == this.hasElement) {
				return
			}
			this.hasElement = e;
			if(e) {
				this.element = new Element("div", a._defaultProperties);
				var d = this.getAncestorWithElement();
				if(d) {
					d.element.grab(this.element)
				}
			} else {
				this.element.destroy();
				this.element = null
			}
		},
		removeFromSuperlayer: function() {
			if(!this.superlayer) {
				return
			}
			this.setGlobalID(null);
			this.superlayer.sublayers.erase(this);
			this.superlayer = null;
			this.root = null;
			if(this.element) {
				this.element.destroy()
			}
		},
		getAncestorWithClass: function(d) {
			var e = this.superlayer;
			if(!e) {
				return null
			}
			if(instanceOf(e, d)) {
				return e
			}
			return e.getAncestorWithClass(d)
		},
		each: function(d, e) {
			this.sublayers.each(d, e)
		},
		_setAnimatableProperty: function(e, g, h) {
			h = h || "";
			if(c.areTransitionsAvailable) {
				var f = a.animationsEnabled ? a.animationDuration : 0;
				if(this._animationDuration !== f) {
					this._animationDuration = f;
					var d = "" + (0.001 * f) + "s";
					this.element.style[c.stylePrefix + "TransitionDuration"] = d
				}
				this.element.style[e] = "" + g + h
			} else {
				var i = "_" + e + "Fx";
				if(a.animationDuration && a.animationsEnabled) {
					if(this[i]) {
						this[i].cancel()
					}
					this[i] = new Fx.Tween(this.element, {
						property: e,
						duration: a.animationDuration,
						transition: "cubic:in:out"
					});
					this[i].start(g)
				} else {
					if(this[i]) {
						this[i].cancel();
						delete this[i]
					}
					this.element.style[e] = "" + g + h
				}
			}
		},
		setX: function(d) {
			this.setPosition(d, this.y)
		},
		setY: function(d) {
			this.setPosition(this.x, d)
		},
		getPosition: function() {
			return {
				x: this.x,
				y: this.y
			}
		},
		setPosition: function(d, f) {
			if(f === undefined) {
				f = d.y;
				d = d.x
			}
			d = Math.round(d);
			f = Math.round(f);
			if(d === this.x && f === this.y) {
				return
			}
			this.x = d;
			this.y = f;
			var e = this.superlayer;
			if(!e || e.hasElement) {
				this._setOffset(d, f)
			} else {
				this._setOffset(d + e._offsetX, f + e._offsetY)
			}
		},
		_setOffset: function(d, e) {
			if(this._offsetX === d && this._offsetY === e) {
				return
			}
			this._offsetX = d;
			this._offsetY = e;
			if(this.hasElement) {
				this._updateElementPosition()
			} else {
				this.sublayers.each(function(f) {
					f._setOffset(f.x + d, f.y + e)
				})
			}
		},
		_updateElementPosition: function() {
			if(c.isAccelerationAvailable && this.accelerated) {
				this._updateTransformProperty()
			} else {
				this._setAnimatableProperty("left", this._offsetX, "px");
				this._setAnimatableProperty("top", -this._offsetY, "px")
			}
		},
		setWidth: function(d) {
			this._setSizeProperty("width", d)
		},
		setHeight: function(d) {
			this._setSizeProperty("height", d)
		},
		getSize: function() {
			return {
				width: this.width,
				height: this.height
			}
		},
		setSize: function(d, e) {
			if(e === undefined) {
				e = d.height;
				d = d.width
			}
			this.setWidth(d);
			this.setHeight(e)
		},
		_setSizeProperty: function(d, e) {
			e = Math.round(e);
			if(this[d] === e) {
				return
			}
			this[d] = e;
			if(this.hasElement) {
				this.element.style[d] = "" + e + "px"
			}
		},
		setScale: function(d) {
			if(this.scale === d) {
				return
			}
			this.scale = d;
			this._updateTransformProperty()
		},
		setRotation: function(d) {
			if(this.rotation === d) {
				return
			}
			this.rotation = d;
			this._updateTransformProperty()
		},
		_updateTransformProperty: function() {
			if(!this.hasElement) {
				return
			}
			var h = "";
			if(c.isAccelerationAvailable && this.accelerated) {
				h = c.isTransform3DAvailable ? "translate3d(" + this._offsetX + "px," + (-this._offsetY) + "px, 0) " : "translate(" + this._offsetX + "px," + (-this._offsetY) + "px) ";
				var g = a.animationsEnabled ? a.animationDuration : 0;
				if(this._animationDuration !== g) {
					this._animationDuration = g;
					var e = "" + (0.001 * g) + "s";
					this.element.style[c.stylePrefix + "TransitionDuration"] = e
				}
			}
			var d = "scale(" + this.scale + ") rotate(" + (-this.rotation) + "rad)";
			var f = h + d;
			this.element.style[c.stylePrefix + "Transform"] = f
		},
		setContentsURL: function(d) {
			if(this.contentsURL === d) {
				return
			}
			this.contentsURL = d;
			this.element.style.backgroundImage = d ? ("url(" + d + ")") : "none"
		},
		setContentsURLAndSize: function(e, f, d) {
			this.setContentsURL(e);
			this.setSize(f, d)
		},
		setRepeatingContentsURL: function(d) {
			this.setContentsURL(d);
			this.element.style.backgroundRepeat = "repeat";
			this.element.style.backgroundSize = "auto";
			this.element.style[c.stylePrefix + "BackgroundSize"] = "auto"
		},
		setBackgroundColor: function(d) {
			if(this.backgroundColor == d) {
				return
			}
			this.backgroundColor = d;
			this.element.style.backgroundColor = d ? d : "transparent"
		},
		setCornerRadius: function(d) {
			d = Math.round(d);
			if(this.cornerRadius === d) {
				return
			}
			this.cornerRadius = d;
			var e = "" + d + "px";
			this.element.style.borderRadius = e;
			this.element.style[c.stylePrefix + "BorderRadius"] = e
		},
		setAccelerated: function(d) {
			this.accelerated = d
		},
		setHidden: function(d) {
			if(this.hidden === d) {
				return
			}
			this.hidden = d;
			this.element.style.display = d ? "none" : "block"
		},
		setInvisible: function(d) {
			if(this.invisible === d) {
				return
			}
			this.invisible = d;
			this.element.style.visibility = d ? "hidden" : "visible"
		},
		setMasksToBounds: function(d) {
			if(this.masksToBounds === d) {
				return
			}
			this.masksToBounds = d;
			this.element.style.overflow = d ? "hidden" : "visible"
		},
		setZPosition: function(d) {
			d = Math.round(d);
			if(this.zPosition === d) {
				return
			}
			this.zPosition = d;
			this.element.style.zIndex = d
		},
		setOpacity: function(d) {
			if(this.opacity === d) {
				return
			}
			this.opacity = d;
			this._setAnimatableProperty("opacity", d)
		},
		setGlobalID: function(e) {
			var d = this.globalID;
			if(d === e) {
				return
			}
			this.globalID = e;
			if(d) {
				delete a._layersByGlobalID[d]
			}
			if(e) {
				a._layersByGlobalID[e] = this
			}
		},
		setHoverable: function(d) {
			if(this.hoverable === d) {
				return
			}
			this.hoverable = d;
			this.element.style.pointerEvents = (this.touchable || this.hoverable) ? "auto" : "none";
			if(d) {
				this.element.addEvent("mouseenter", this.mouseEntered.bind(this));
				this.element.addEvent("mouseleave", this.mouseExited.bind(this))
			} else {
				this.element.removeEvents("mouseenter");
				this.element.removeEvents("mouseleave")
			}
		},
		mouseEntered: function(d) {},
		mouseExited: function(d) {},
		setTouchable: function(d) {
			if(this.touchable === d) {
				return
			}
			this.touchable = d;
			this.element.style.pointerEvents = (this.touchable || this.hoverable) ? "auto" : "none";
			if(d) {
				if(!this._mouseBound) {
					this._mouseBound = {
						mouseDown: this._mouseDown.bind(this),
						mouseMove: this._mouseMove.bind(this),
						mouseUp: this._mouseUp.bind(this),
						touchStart: this._touchStart.bind(this),
						touchMove: this._touchMove.bind(this),
						touchEnd: this._touchEnd.bind(this),
						touchCancel: this._touchCancel.bind(this)
					}
				}
				this.element.addEvent("mousedown", this._mouseBound.mouseDown);
				this.element.addEvent("touchstart", this._mouseBound.touchStart)
			} else {
				this.element.removeEvents("mousedown");
				this.element.removeEvents("touchstart")
			}
		},
		touchDidGoDown: function(d) {},
		touchDidMove: function(d) {},
		touchDidGoUp: function(d) {},
		_mouseDown: function(d) {
			d.stop();
			this.element.getDocument().addEvents({
				mousemove: this._mouseBound.mouseMove,
				mouseup: this._mouseBound.mouseUp
			});
			this.touches = new BVTouches(this, d);
			this.touchDidGoDown(this.touches)
		},
		_mouseMove: function(d) {
			d.stop();
			this.touches._updateWithEvent(d);
			this.touchDidMove(this.touches)
		},
		_mouseUp: function(d) {
			d.stop();
			this.touches._goUpWithEvent(d);
			this.touchDidGoUp(this.touches);
			delete this.touches;
			this.element.getDocument().removeEvents({
				mousemove: this._mouseBound.mouseMove,
				mouseup: this._mouseBound.mouseUp
			})
		},
		_touchStart: function(d) {
			d.stop();
			if(this.touches || d.length > 1) {
				this._touchCancel(d);
				return
			}
			this.element.getDocument().addEvents({
				touchmove: this._mouseBound.touchMove,
				touchend: this._mouseBound.touchEnd,
				touchcancel: this._mouseBound.touchCancel
			});
			this.touches = new BVTouches(this, d);
			this.touchDidGoDown(this.touches)
		},
		_touchMove: function(d) {
			d.stop();
			if(!this.touches) {
				return
			}
			this.touches._updateWithEvent(d);
			this.touchDidMove(this.touches)
		},
		_touchEnd: function(d) {
			d.stop();
			if(!this.touches) {
				return
			}
			this.touches._goUpWithEvent(d);
			this.touchDidGoUp(this.touches);
			delete this.touches;
			this.element.getDocument().removeEvents({
				touchmove: this._mouseBound.touchMove,
				touchend: this._mouseBound.touchEnd,
				touchcancel: this._mouseBound.touchCancel
			})
		},
		_touchCancel: function(d) {
			this._touchEnd(d)
		},
		containsLocalPoint: function(d, e) {
			if(e === undefined) {
				e = d.y;
				d = d.x
			}
			return(d >= 0 && d < this.width && e <= 0 && e > -this.height)
		},
		containsGlobalPoint: function(d, f) {
			var e = this.getLocalPointForGlobalPoint(d, f);
			return this.containsLocalPoint(e)
		},
		getPositionOfLocalPoint: function(d, i) {
			if(i === undefined) {
				i = d.y;
				d = d.x
			}
			if(this.scale !== 1) {
				var e = layer.scale;
				d *= e;
				i *= e
			}
			if(this.rotation !== 0) {
				var f = this.rotation;
				var h = d * Math.cos(f) - i * Math.sin(f);
				var g = d * Math.sin(f) + i * Math.cos(f);
				d = h;
				i = g
			}
			return {
				x: d,
				y: i
			}
		},
		setPositionOfLocalPoint: function(h, g, f, e) {
			var d = this.getPositionOfLocalPoint(f, e);
			this.setPosition(h - d.x, g - d.y)
		},
		getGlobalPointForLocalPoint: function(d, j) {
			if(j === undefined) {
				j = d.y;
				d = d.x
			}
			var e = this;
			while(e.superlayer) {
				if(e.scale !== 1) {
					var f = e.scale;
					d *= f;
					j *= f
				}
				if(e.rotation !== 0) {
					var g = e.rotation;
					var i = d * Math.cos(g) - j * Math.sin(g);
					var h = d * Math.sin(g) + j * Math.cos(g);
					d = i;
					j = h
				}
				d += e.x;
				j += e.y;
				e = e.superlayer
			}
			return {
				x: d,
				y: j
			}
		},
		getLocalPointForGlobalPoint: function(j, h) {
			if(h === undefined) {
				h = j.y;
				j = j.x
			}
			var k = [];
			var g = this;
			while(g.superlayer) {
				k.push(g);
				g = g.superlayer
			}
			for(var f = k.length - 1; f >= 0; f--) {
				g = k[f];
				j -= g.x;
				h -= g.y;
				if(g.scale !== 1) {
					var m = 1 / g.scale;
					j *= m;
					h *= m
				}
				if(g.rotation !== 0) {
					var e = -g.rotation;
					var d = j * Math.cos(e) - h * Math.sin(e);
					var l = j * Math.sin(e) + h * Math.cos(e);
					j = d;
					h = l
				}
			}
			return {
				x: j,
				y: h
			}
		},
		getGlobalX: function() {
			return this.getGlobalPosition().x
		},
		getGlobalY: function() {
			return this.getGlobalPosition().y
		},
		getGlobalPosition: function() {
			return this.getGlobalPointForLocalPoint(0, 0)
		},
		setGlobalPosition: function(e, f) {
			if(!this.superlayer) {
				return
			}
			var d = this.superlayer.getLocalPointForGlobalPoint(e, f);
			this.setPosition(d)
		},
		_theEnd: function() {}
	});
	var c;
	a._initializeQuirks = function() {
		c = {};
		var d = !!navigator.userAgent.toLowerCase().match(/applewebkit/);
		c.stylePrefix = (Browser.ie ? "ms" : Browser.firefox ? "Moz" : d ? "webkit" : Browser.opera ? "O" : "");
		c.stylePrefixCSS = c.stylePrefix ? ("-" + c.stylePrefix.toLowerCase() + "-") : "";
		c.areTransitionsAvailable = (d) && !b;
		c.isTransform3DAvailable = Browser.safari || Browser.chrome;
		c.isAccelerationAvailable = (Browser.chrome || Browser.safari) && !b;
		a._quirks = c;
		a._initializeDefaultProperties()
	};
	a._initializeDefaultProperties = function() {
		var e = {
			position: "absolute",
			zIndex: "0",
			left: "0px",
			top: "0px",
			backgroundRepeat: "no-repeat",
			backgroundSize: "100% 100%",
			pointerEvents: "none"
		};
		var d = c.stylePrefix;
		e[d + "TransformOrigin"] = "0% 0%";
		e[d + "BackgroundSize"] = e.backgroundSize;
		if(c.areTransitionsAvailable) {
			e[d + "TransitionProperty"] = c.isAccelerationAvailable ? (c.stylePrefixCSS + "transform, opacity") : "left, top, opacity";
			e[d + "TransitionDuration"] = "0s";
			e[d + "TransitionTimingFunction"] = "ease-in-out"
		}
		a._defaultProperties = {
			styles: e
		}
	};
	a.addPrefixToStyleName = function(d) {
		return c.stylePrefix + d
	};
	a._layersByGlobalID = {};
	a.getByGlobalID = function(d) {
		return a._layersByGlobalID[d]
	};
	a.animationDuration = 0;
	a.animationsEnabled = true;
	a.animate = function(f, e, g) {
		var d = a.animationDuration;
		a.animationDuration = f;
		e.call(g);
		a.animationDuration = d
	};
	a.setAnimationsEnabled = function(d) {
		a.animationsEnabled = d
	};
	Element.Properties.opacity.set = function(d) {
		this.style.opacity = d
	}
})();
(function() {
	var a = this.BVTouches = new Class({
		initialize: function(c, d) {
			this.layer = c;
			this.globalPoint = {
				x: d.page.x,
				y: -d.page.y
			};
			this.translation = {
				x: 0,
				y: 0
			};
			this.deltaTranslation = {
				x: 0,
				y: 0
			};
			this.velocity = {
				x: 0,
				y: 0
			};
			this.count = 1;
			this.event = d;
			this.timestamp = d.event.timeStamp;
			this.downTimestamp = this.timestamp
		},
		_updateWithEvent: function(g, i) {
			this.event = g;
			if(!i) {
				var d = g.page.x - this.globalPoint.x;
				var c = -g.page.y - this.globalPoint.y;
				this.translation.x += d;
				this.translation.y += c;
				this.deltaTranslation.x += d;
				this.deltaTranslation.y += c;
				this.globalPoint.x = g.page.x;
				this.globalPoint.y = -g.page.y
			}
			var h = g.event.timeStamp;
			var f = h - this.timestamp;
			var e = i || (d === 0 && c === 0);
			var j = (e && f > 150);
			this.velocity.x = j ? 0 : (e || f === 0) ? this.velocity.x : (d / f * 1000);
			this.velocity.y = j ? 0 : (e || f === 0) ? this.velocity.y : (c / f * 1000);
			this.timestamp = h
		},
		_goUpWithEvent: function(c) {
			this._updateWithEvent(c, true);
			this.count = 0;
			var d = Math.abs(this.translation.x) > 10 || Math.abs(this.translation.y) > 10;
			var e = Math.abs(this.velocity.x) > 400 || Math.abs(this.velocity.y) > 400;
			this.wasTap = !d && !e && (this.getTimeSinceGoingDown() < 300);
			this.wasDoubleTap = this.wasTap && (this.timestamp - (this.layer.timestampOfLastTap || 0) < 400);
			if(this.wasTap) {
				this.layer.timestampOfLastTap = this.timestamp
			}
		},
		getTimeSinceGoingDown: function() {
			return this.timestamp - this.downTimestamp
		},
		resetDeltaTranslation: function() {
			this.deltaTranslation.x = 0;
			this.deltaTranslation.y = 0
		}
	});
	var b = this.BVTouchRegion = new Class({
		Extends: BVLayer,
		initialize: function(c) {
			this.parent(c);
			this.setTouchable(true);
			this.targetLayer = this.superlayer
		},
		setTargetLayer: function(c) {
			this.targetLayer = c || this.superlayer
		},
		setBoundsWithMargin: function(e, d, c) {
			if(d === undefined) {
				d = this.targetLayer.getSize()
			}
			if(c === undefined) {
				c = d.height;
				d = d.width
			}
			this.setPosition(-e, e);
			this.setSize(d + e * 2, c + e * 2)
		},
		touchDidGoDown: function(c) {
			this.targetLayer.touchDidGoDown(c)
		},
		touchDidMove: function(c) {
			this.targetLayer.touchDidMove(c)
		},
		touchDidGoUp: function(c) {
			this.targetLayer.touchDidGoUp(c)
		},
		mouseEntered: function(c) {
			this.targetLayer.mouseEntered()
		},
		mouseExited: function(c) {
			this.targetLayer.mouseExited()
		}
	})
})();
(function() {
	BVText = new Class({
		Extends: BVLayer,
		initialize: function(a) {
			this.parent(a);
			this.html = "";
			this.textClass = "";
			this.textElement = new Element("div");
			this.element.grab(this.textElement, "top")
		},
		setHTML: function(a) {
			if(a === this.html) {
				return
			}
			this.html = a;
			this.textElement.set("html", a)
		},
		setTextClass: function(a) {
			if(a === this.textClass) {
				return
			}
			this.textClass = a;
			this.textElement.className = a
		},
		setTextStyle: function(b, a) {
			this.textElement.setStyle(b, a)
		},
		setTextStyles: function(a) {
			this.textElement.setStyles(a)
		}
	})
})();
(function() {
	window.addEvent("domready", function() {
		var d = navigator.userAgent.toLowerCase().match(/applewebkit/);
		var c = d || Browser.safari || Browser.firefox || Browser.chrome || Browser.opera || Browser.ie9 || Browser.ie10;
		if(c) {
			new a()
		} else {
			var b = document.id(document.body);
			b.style.background = "white";
			b.style.color = "#111";
			b.style.overflow = "auto";
			b.style.overflowX = "auto";
			b.style.overflowY = "auto";
			document.id("sections").style.display = "block"
		}
	});
	var a = this.Root = new Class({
		Extends: BVLayer,
		initialize: function() {
			this.parent(null);
			a.root = this;
			this.updateSize();
			this.contentContainer = new ContentContainer(this);
			this.site = new Site(this);
			document.id(document.body).grab(this.element, "bottom");
			window.addEvent("resize", this.windowWasResized.bind(this))
		},
		destroy: function() {
			this.contentContainer.setURL(null);
			window.removeEvents();
			document.body.removeEvents();
			this.element.destroy();
			this.element = null;
			a.root = null
		},
		updateSize: function() {
			var b = window.getSize();
			this.setSize(Math.max(600, b.x), b.y)
		},
		windowWasResized: function() {
			this.updateSize();
			this.site.rootWasResized()
		}
	})
})();
(function() {
	var b = 900;
	var a = 0.7;
	var f = true;
	var d = 300;
	var e = this.ContentContainer = new Class({
		Extends: BVLayer,
		initialize: function(m) {
			this.parent(m);
			this.setZPosition(10);
			this.url = null;
			this.clickURL = null;
			this.preloadURL = null;
			this.preloadedURLs = {};
			this.bottomSpacer = new BVLayer(this);
			this.bottomSpacer.setSize(2, 20);
			this.bottomSpacer.setHidden(true)
		},
		setURL: function(n, p, o) {
			if(n === this.url) {
				return
			}
			this.url = n;
			this.clickURL = p || n;
			this.preloadURL = null;
			if(this.content) {
				this.content.destroy();
				delete this.content
			}
			this.setHidden(!n);
			this.bottomSpacer.setHidden(this.hidden);
			if(!n) {
				return
			}
			this.bottomSpacer.setY(-this.height);
			var m = this.getContentClassForURL(n, o);
			this.content = new m(this, o)
		},
		getContentClassForURL: function(m, n) {
			return(n && n.vimeo) ? h : (n && n.youTube) ? l : e.isMovieURL(m) ? j : e.isImageURL(m) ? k : (n && n.injectContent) ? i : c
		},
		getContentSizeForProperties: function(r, u, m) {
			var t = r.imageWidth || r.pageWidth || b;
			var q = r.imageHeight || r.pageHeight || m;
			var p = r.minimumImageScale || a;
			var s = m - this.bottomSpacer.height;
			if(r.imageHeight && q > s && !r.noSquish) {
				var n = s / q;
				if(n > p) {
					t = Math.round(t * n);
					q = Math.round(q * n)
				}
			}
			if(t > u) {
				if(!r.imageWidth) {
					t = u
				} else {
					var o = u / t;
					if(o > p) {
						t = Math.round(t * o);
						q = Math.round(q * o)
					}
				}
			}
			return {
				width: t,
				height: q
			}
		},
		setPreloadURL: function(m, n) {
			if(n.noPreload) {
				m = null
			}
			this.preloadURL = m;
			this.preloadProperties = n
		},
		preload: function(n, o) {
			n = n || this.preloadURL;
			o = o || this.preloadProperties;
			if(n && !this.preloadedURLs[n]) {
				var m = this.getContentClassForURL(n, o);
				m.preloadWithURL(n);
				this.preloadedURLs[n] = true
			}
			this.preloadURL = null
		}
	});
	e.getBrowserSpecificURL = function(m) {
		if(this.isMovieURL(m)) {
			return this.getBrowserSpecificMovieURL(m)
		}
		return m
	};
	e.getPreviewURL = function(m) {
		if(this.isMovieURL(m)) {
			return this.getMoviePreviewURL(m)
		}
		return m
	};
	var k = new Class({
		Extends: BVLayer,
		initialize: function(o, n) {
			this.parent(o);
			var m = this.container = this.getAncestorWithClass(e);
			this.setContentsURLAndSize(m.url, m.width, m.height);
			this.element.setStyle("pointerEvents", "auto");
			if(m.clickURL) {
				var p = m.clickURL;
				this.element.setStyle("cursor", "pointer");
				this.element.addEvent("click", function() {
					window.location = p
				})
			}
			if(this.preloadTimer) {
				clearTimeout(this.preloadTimer)
			}
			this.preloadTimer = this.container.preload.delay(1000, this.container)
		},
		destroy: function() {
			if(this.preloadTimer) {
				clearTimeout(this.preloadTimer);
				delete this.preloadTimer
			}
			this.removeFromSuperlayer();
			this.container = null
		}
	});
	k.preloadWithURL = function(m) {
		var n = new Image();
		n.src = m
	};
	e.isImageURL = function(m) {
		return !!(m.match(/\.jpg$/) || m.match(/\.png$/))
	};
	var j = new Class({
		Extends: BVLayer,
		initialize: function(p, o) {
			this.parent(p);
			var m = this.container = this.getAncestorWithClass(e);
			var n = e.getMoviePreviewURL(m.url);
			this.setContentsURLAndSize(n, m.width, m.height);
			if(f) {
				this.autoplayTimer = this.playMovie.delay(d, this)
			}
			this.element.setStyle("pointerEvents", "auto");
			this.element.setStyle("cursor", "pointer");
			this.element.addEvent("click", this.playMovie.bind(this));
			this.spinner = new g(this);
			this.spinner.setPosition(0.5 * (m.width - this.spinner.width), -0.5 * (m.height - this.spinner.height));
			this.spinner.setSpinning(true)
		},
		playMovie: function() {
			if(this.autoplayTimer) {
				clearTimeout(this.autoplayTimer);
				delete this.autoplayTimer
			}
			this.element.removeEvents("click");
			this.element.setStyle("cursor", "auto");
			this.videoElement = new Element("video", {
				src: this.container.url,
				width: this.width,
				height: this.height
			});
			if(!this.videoElement) {
				return
			}
			this.videoElement.loop = true;
			this.canPlayEventListener = this.movieCanPlayThrough.bind(this);
			this.videoElement.addEventListener("canplaythrough", this.canPlayEventListener, false)
		},
		movieCanPlayThrough: function() {
			this.spinner.setSpinning(false);
			this.element.grab(this.videoElement);
			this.videoElement.play()
		},
		destroy: function() {
			if(this.autoplayTimer) {
				clearTimeout(this.autoplayTimer);
				delete this.autoplayTimer
			}
			if(this.videoElement) {
				this.videoElement.removeEventListener("canplaythrough", this.canPlayEventListener, false);
				this.videoElement.pause();
				this.videoElement.src = ""
			}
			this.spinner.setSpinning(false);
			this.removeFromSuperlayer();
			this.container = null
		}
	});
	j.preloadWithURL = function(m) {};
	e.isMovieURL = function(m) {
		return !!(m.match(/\.mov$/) || m.match(/\.mp4$/) || m.match(/\.ogv$/) || m.match(/\.webm$/))
	};
	e.getBrowserSpecificMovieURL = function(m) {
		var n = Browser.firefox3 ? ".ogv" : (Browser.firefox || Browser.chrome) ? ".webm" : null;
		if(n) {
			m = m.replace(/\.\w+$/, n)
		}
		return m
	};
	e.getMoviePreviewURL = function(m) {
		return m.replace(/\.\w+$/, ".jpg")
	};
	var i = new Class({
		Extends: BVLayer,
		initialize: function(o, n) {
			this.parent(o);
			var m = this.container = this.getAncestorWithClass(e);
			this.setSize(m.width, m.height);
			this.element.setStyle("pointerEvents", "auto");
			this.request = new Request({
				url: m.url,
				method: "get",
				urlEncoded: "false",
				headers: {
					Accept: "text/html, application/xml, text/xml, */*"
				}
			});
			this.request.addEvent("success", this.requestWasSuccessful.bind(this));
			this.request.send()
		},
		destroy: function() {
			if(this.preloadTimer) {
				clearTimeout(this.preloadTimer);
				delete this.preloadTimer
			}
			if(this.request) {
				this.request.cancel();
				delete this.request
			}
			this.removeFromSuperlayer();
			this.container = null
		},
		requestWasSuccessful: function(o) {
			var m = o.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
			if(!m) {
				return
			}
			var n = m[1];
			this.element.set("html", n);
			if(this.preloadTimer) {
				clearTimeout(this.preloadTimer)
			}
			this.preloadTimer = this.container.preload.delay(1000, this.container)
		}
	});
	i.preloadWithURL = function(m) {
		c.preloadWithURL(m)
	};
	var c = new Class({
		initialize: function(m, p) {
			this.container = m;
			var q = m.getGlobalPosition();
			var n = p.pageColor;
			if(n === undefined) {
				n = "fff"
			}
			var o = m.url;
			if(p.queryWindowSize) {
				o += "?width=" + this.container.width + "&height=" + Root.root.height
			}
			this.iframe = new IFrame({
				src: o,
				styles: {
					position: "absolute",
					left: "" + q.x + "px",
					top: "" + (-q.y) + "px",
					backgroundColor: "#" + n,
					zIndex: 20,
					visibility: "hidden"
				},
				events: {
					load: this.iframeDidLoad.bind(this)
				},
				width: "" + m.width,
				height: "" + m.height,
				frameBorder: "0",
				scrolling: "no"
			});
			this.iframeIsVisible = false;
			this.iframeHeight = m.height;
			this.iframeShouldUpdateHeight = !p.pageHeight;
			this.iframeHeightCanChange = !!p.pageHeightCanChange;
			this.iframeShouldScrollToEnd = (p.pageHeightCanChange === "scrollToEnd");
			this.iframeUpdateInterval = this.updateIframeVisibilityAndHeight.periodical(500, this);
			document.id(document.body).grab(this.iframe, "bottom");
			this.container.bottomSpacer.setY(-this.iframeHeight)
		},
		destroy: function() {
			if(this.iframe) {
				this.iframe.destroy();
				delete this.iframe
			}
			if(this.iframeUpdateInterval !== undefined) {
				clearInterval(this.iframeUpdateInterval);
				delete this.iframeUpdateInterval
			}
			this.container = null
		},
		iframeDidLoad: function() {
			this.updateIframeVisibilityAndHeight();
			this.iframeIsLoaded = true;
			if(!this.iframe) {
				return
			}
			if(this.iframeUpdateInterval !== undefined) {
				clearInterval(this.iframeUpdateInterval);
				delete this.iframeUpdateInterval
			}
			if(this.iframeShouldUpdateHeight && this.iframeHeightCanChange) {
				this.iframeUpdateInterval = this.updateIframeVisibilityAndHeight.periodical(500, this)
			}
			if(this.container) {
				this.container.preload()
			}
		},
		updateIframeVisibilityAndHeight: function() {
			if(!this.iframe) {
				return
			}
			if(!this.iframeIsVisible) {
				this.iframeIsVisible = true;
				this.iframe.style.visibility = "visible"
			}
			if(this.iframeShouldUpdateHeight) {
				var m = this.container.height;
				var p = this.iframe.contentDocument;
				if(p) {
					var n = p.body;
					var o = p.documentElement;
					if(n) {
						m = Math.max(m, n.scrollHeight, n.offsetHeight, n.clientHeight)
					}
					if(o) {
						m = Math.max(m, o.scrollHeight, o.offsetHeight, o.clientHeight)
					}
				}
				if(m != this.iframeHeight) {
					this.iframeHeight = m;
					this.iframe.set("height", m);
					if(this.iframeIsLoaded && this.iframeShouldScrollToEnd) {
						(function() {
							window.scrollBy(0, 10000)
						}).delay(10)
					}
				}
			}
			this.container.bottomSpacer.setY(-this.iframeHeight)
		}
	});
	c.preloadWithURL = function(m) {
		var p = m.replace(/\w+\.\w+$/, "");
		if(!p.match(/\/$/)) {
			p += "/"
		}
		var r = o();
		r.addEvent("success", function(s) {
			if(!s) {
				return
			}
			var t = q(s);
			if(t) {
				t.addEvent("success", function(u) {
					n(s)
				});
				t.send()
			} else {
				n(s)
			}
		});
		r.send();

		function o() {
			return new Request({
				url: m,
				method: "get"
			})
		}

		function q(t) {
			var s = t.match(/href="(\w+.css)"/);
			if(!s) {
				return null
			}
			return new Request({
				url: p + s[1],
				method: "get"
			})
		}

		function n(t) {
			var s = t.match(/preload-image href="([^"]+)"/);
			if(!s) {
				return
			}
			var u = new Image();
			u.src = s[1]
		}
	};
	var h = new Class({
		initialize: function(m, n) {
			this.container = m;
			var p = n.vimeo;
			var o = m.getGlobalPosition();
			this.iframe = new IFrame({
				src: "http://player.vimeo.com/video/" + p + "?title=0&byline=0&portrait=0",
				styles: {
					position: "absolute",
					left: "" + o.x + "px",
					top: "" + (-o.y) + "px",
					zIndex: 20,
					visibility: "hidden",
				},
				events: {
					load: this.iframeDidLoad.bind(this)
				},
				width: "" + m.width,
				height: "" + m.height,
				frameBorder: "0",
				scrolling: "no"
			});
			document.id(document.body).grab(this.iframe, "bottom")
		},
		destroy: function() {
			if(this.iframe) {
				this.iframe.destroy();
				delete this.iframe
			}
			this.container = null
		},
		iframeDidLoad: function() {
			if(!this.iframe) {
				return
			}
			this.iframe.style.visibility = "visible"
		}
	});
	h.preloadWithURL = function(m) {};
	var l = new Class({
		initialize: function(m, n) {
			this.container = m;
			var p = n.youTube;
			var o = m.getGlobalPosition();
			this.iframe = new IFrame({
				src: "https://www.youtube.com/embed/" + p + "?autohide=1&rel=0&showinfo=0",
				styles: {
					position: "absolute",
					left: "" + o.x + "px",
					top: "" + (-o.y) + "px",
					zIndex: 20,
					visibility: "hidden",
				},
				events: {
					load: this.iframeDidLoad.bind(this)
				},
				width: "" + m.width,
				height: "" + m.height,
				frameBorder: "0",
				scrolling: "no"
			});
			document.id(document.body).grab(this.iframe, "bottom")
		},
		destroy: function() {
			if(this.iframe) {
				this.iframe.destroy();
				delete this.iframe
			}
			this.container = null
		},
		iframeDidLoad: function() {
			if(!this.iframe) {
				return
			}
			this.iframe.style.visibility = "visible"
		}
	});
	l.preloadWithURL = function(m) {};
	var g = new Class({
		Extends: BVLayer,
		initialize: function(n, m) {
			this.parent(n);
			this.element.setStyle(BVLayer.addPrefixToStyleName("TransformOrigin"), "50% 50%");
			this.setContentsURLAndSize("Images/Spinner.png", 40, 40);
			this.setHidden(true)
		},
		setSpinning: function(m) {
			if(m == this.isSpinning) {
				return
			}
			this.isSpinning = m;
			this.setHidden(!m);
			if(this.spinTimer) {
				clearTimeout(this.spinTimer);
				delete this.spinTimer
			}
			if(m) {
				this.spinTimer = this.updateSpin.periodical(1 / 30, this);
				this.lastTimestamp = Date.now()
			}
		},
		updateSpin: function() {
			var n = Date.now();
			var m = n - this.lastTimestamp;
			this.lastTimestamp = n;
			this.setRotation(this.rotation + 8 * m / 1000)
		}
	})
})();
var gSiteShowThumbnailImages = true;
var gSiteShowPageImages = true;
var kSiteZoomDuration = 900;
var kSiteUnzoomDuration = 1000;
var kSiteStripRotation = -2 / 180 * Math.PI;
var kSiteSectionTitleRotation = -2 / 180 * Math.PI;
var kSiteStripHeaderTitleRotation = 12 / 180 * Math.PI;
var lerp = function(d, c, e) {
	return d + e * (c - d)
};
(function() {
	var a = this.Site = new Class({
		Extends: BVLayer,
		initialize: function(e) {
			this.parent(e);
			this.scrollX = 0;
			this.scrollY = 1;
			this.backgroundOffsetX = 0;
			this.backgroundOffsetY = 0;
			this.zoomedSegment = null;
			this.isZoomed = false;
			this.isZoomTransitioning = false;
			this.setTouchable(true);
			this.setSize(this.root.getSize());
			this.setMasksToBounds(true);
			this.background = new c(this);
			this.sectionsContainer = new BVLayer(this);
			this.sections = new BVLayer(this.sectionsContainer);
			this.sections.setHasElement(false);
			this.sectionTitles = new BVLayer(this);
			this.pageSet = new SitePageSet(this);
			this.edgeShadows = new BVLayer(this);
			this.edgeShadows.setHasElement(false);
			this.addEdgeShadows();
			this.pageArrowRegionLeft = new SitePageArrowRegion(this, false);
			this.pageArrowRegionRight = new SitePageArrowRegion(this, true);
			this.topContactSet = new SiteContactSet(this, "top");
			this.bottomContactSet = new SiteContactSet(this, "bottom");
			this.headerTitles = new BVLayer(this);
			this.doodle = new d(this);
			this.xScroller = new SiteXScroller(this);
			this.yScroller = new SiteYScroller(this);
			this.homeButton = new b(this);
			this.addSectionsAndPages();
			BVLayer.setAnimationsEnabled(false);
			this.zoomHashedSegment();
			BVLayer.setAnimationsEnabled(true);
			window.addEvent("hashchange", this.zoomHashedSegment.bind(this));
			window.addEvent("scroll", this.windowDidScroll.bind(this));
			window.addEvent("mousewheel", this.mouseWheelWithEvent.bind(this));
			this.graduallyShowStrips();
			this.setScrollOffset(this.scrollX, this.scrollY)
		},
		addEdgeShadows: function() {
			this.edgeShadows.topShadow = new BVLayer(this.edgeShadows);
			this.edgeShadows.topShadow.setAccelerated(true);
			this.edgeShadows.topShadow.setContentsURLAndSize("Images/EdgeShadowTop.png", this.width, 200);
			this.edgeShadows.bottomShadow = new BVLayer(this.edgeShadows);
			this.edgeShadows.bottomShadow.setAccelerated(true);
			this.edgeShadows.bottomShadow.setContentsURLAndSize("Images/EdgeShadowBottom.png", this.width, 200);
			this.edgeShadows.bottomShadow.setY(-this.height + this.edgeShadows.bottomShadow.height);
			this.edgeShadows.leftShadow = new BVLayer(this.edgeShadows);
			this.edgeShadows.leftShadow.setAccelerated(true);
			this.edgeShadows.leftShadow.setContentsURLAndSize("Images/EdgeShadowLeft.png", 142, this.height);
			this.edgeShadows.rightShadow = new BVLayer(this.edgeShadows);
			this.edgeShadows.rightShadow.setAccelerated(true);
			this.edgeShadows.rightShadow.setContentsURLAndSize("Images/EdgeShadowRight.png", 142, this.height);
			this.edgeShadows.rightShadow.setX(this.width - this.edgeShadows.rightShadow.width);
			this.edgeShadows.headerTitleShadow = new BVLayer(this.edgeShadows);
			this.edgeShadows.headerTitleShadow.setContentsURLAndSize("Images/HeaderTitleShadow.png", 180, 183);
			this.edgeShadows.headerTitleShadow.setHidden(true);
			this.edgeShadows.headerTitleShadow.setAccelerated(true)
		},
		graduallyShowStrips: function() {
			this.preloadImageURLs = this.getPreloadImageURLs();
			var e = (function() {
				if(!this.areAllStripsShowing) {
					var g = 2;
					var r = this.sections.sublayers;
					for(var p = 0; p < r.length; p++) {
						var l = r[p].strips.sublayers;
						var q = l.length;
						for(var o = 0; o < q; o++) {
							var f = l[o];
							if(f.hidden) {
								f.setHidden(false);
								g--;
								if(g === 0) {
									return
								}
							}
						}
					}
					this.areAllStripsShowing = true
				} else {
					if(!this.areImagesPreloaded) {
						var n = Math.min(5, this.preloadImageURLs.length);
						for(var m = 0; m < n; m++) {
							var h = new Image();
							h.src = this.preloadImageURLs.shift()
						}
						if(n === 0) {
							this.areImagesPreloaded = true
						}
					} else {
						clearInterval(e)
					}
				}
			}).periodical(50, this);
			this.sections.sublayers[0].strips.sublayers[0].setHidden(false)
		},
		getPreloadImageURLs: function() {
			var e = ["Images/HeaderTitleShadow.png", "Images/ButtonHome.png", "Images/BackgroundGradient.png", "Images/PageShadowBottom.png", "Images/PageShadowBottomLeft.png", "Images/PageShadowBottomRight.png", "Images/PageShadowLeft.png", "Images/PageShadowRight.png", "Images/PageShadowTop.png", "Images/PageShadowTopLeft.png", "Images/PageShadowTopRight.png"];
			this.pageSet.pages.each(function(f) {
				e.push("PageImages/" + f.segment.name + ".jpg")
			});
			return e
		},
		setHashForSegment: function(e) {
			if(e) {
				window.location.hash = "!" + (e.urlIndex || "") + "/" + e.localURL
			} else {
				window.location.hash = ""
			}
		},
		zoomHashedSegment: function() {
			var i = window.location.hash;
			var h = i.match(/^\#?\!(\d)?\/([^\?]+)/) || [];
			var f = (h[1] || 0) * 1;
			var e = h[2] || null;
			if(!e) {
				this.setZoomedSegment(null)
			} else {
				if(!this.zoomedSegment || this.zoomedSegment.localURL !== e) {
					var g = this.getSegmentWithLocalURL(e, f);
					this.setZoomedSegment(g);
					if(g) {
						this.scrollSegmentToCenter(g)
					}
				}
			}
		},
		rootWasResized: function() {
			if(this.resizeTimer !== undefined) {
				clearTimeout(this.resizeTimer);
				delete this.resizeTimer
			}
			if(this.root.width === this.width) {
				this.updateForNewRootHeight()
			} else {
				this.yScroller.setHidden(true);
				this.setNativeScrollbarHidden(true);
				this.resizeTimer = this.updateForNewRootSize.delay(300, this)
			}
		},
		updateForNewRootSize: function() {
			if(this.root.width === this.width) {
				this.yScroller.setHidden(this.isZoomed);
				this.setNativeScrollbarHidden(!this.isZoomed);
				if(this.root.height !== this.height) {
					this.updateForNewRootHeight()
				}
			} else {
				var e = this.scrollY;
				this.root.destroy();
				var f = new Root();
				if(!f.site.zoomedSegment) {
					f.site.setScrollY(e)
				}
			}
		},
		updateForNewRootHeight: function() {
			var e = this.root.height;
			this.setHeight(e);
			this.yScroller.setHidden(this.isZoomed);
			this.setNativeScrollbarHidden(!this.isZoomed);
			this.edgeShadows.leftShadow.setHeight(e);
			this.edgeShadows.rightShadow.setHeight(e);
			this.setScrollOffset(this.scrollX, this.scrollY);
			this.pageSet.siteHeightDidChange(e);
			this.yScroller.siteHeightDidChange(e)
		},
		windowDidScroll: function(g) {
			var f = false;
			if(this.zoomedSegment) {
				var h = window.getScroll().y;
				var e = this.zoomedSegment.properties.hideSiteHeight ? Math.max(360, (this.zoomedSegment.properties.hideSiteHeight - this.zoomedSegment.page.y - this.height)) : (this.height * 2);
				f = (h >= e)
			}
			this.setHidden(f)
		},
		mergePropertiesFromElement: function(l, j) {
			var n = {};
			for(var g in l) {
				n[g] = l[g]
			}
			var m = j.className || "";
			var o = m.split(" ");
			for(var k = 0; k < o.length; k++) {
				var f = o[k];
				var u = f.split("-");
				if(u.length != 2) {
					continue
				}
				var t = u[0];
				var s = u[1];
				var h = parseInt(s);
				var q = s.match(/\D/);
				var e = (s.length > 1 && s.substr(0, 1) === "0");
				if(!q && !e && !isNaN(h)) {
					s = h
				}
				var r = t.match(/(.+)Percent$/);
				if(r) {
					t = r[1];
					s = s / 100
				}
				n[t] = s
			}
			return n
		},
		addSectionsAndPages: function() {
			var e = document.id("sections").getChildren("div");
			e.each(function(f) {
				if(f.hasClass("hidden-1")) {
					return
				}
				new SiteSection(this.sections, f)
			}, this);
			this.updateSectionPositions();
			this.pageSet.allPagesWereAdded()
		},
		setSectionTitlesOpacity: function(e) {
			this.sections.each(function(f) {
				f.setTitleOpacity(e)
			}, this)
		},
		updateSectionTitlePositions: function() {
			this.sections.each(function(e) {
				e.updateTitlePosition()
			}, this)
		},
		updateSectionTitlesHidden: function() {
			if(!this.isZoomed) {
				return
			}
			this.sections.each(function(e) {
				e.showTitlesThatHaveScrolledOffscreen()
			}, this)
		},
		setStripHeadersHidden: function(e) {
			this.sections.each(function(f) {
				f.strips.each(function(g) {
					g.setHeaderHidden(e)
				}, this)
			}, this)
		},
		updateSectionPositions: function() {
			var e = 0;
			var f = -100;
			this.sections.each(function(g) {
				g.updateStripPositions();
				g.setPosition(e, f);
				if(this.isZoomed) {
					e += g.width;
					f -= g.height
				} else {
					f -= g.height + 100
				}
			}, this);
			this.sections.setSize(this.isZoomed ? e : this.width, -f)
		},
		updateSectionPositionsPreservingPositionOfSegment: function(g) {
			var f = g.getGlobalPosition();
			this.updateSectionPositions();
			this.sections.setPosition(0, 0);
			var h = g.getGlobalPosition();
			var e = f.x - h.x;
			var i = f.y - h.y;
			this.backgroundOffsetX = (this.background.x - e).round();
			this.backgroundOffsetY = (this.background.y - i).round();
			this.setScrollOffset(e, i, true)
		},
		updateHeaderPositions: function() {
			this.sections.each(function(e) {
				e.updateHeaderPositions()
			})
		},
		eachSegment: function(e, f) {
			this.sections.each(function(g) {
				g.strips.each(function(h) {
					h.segments.each(function(i) {
						if(i.isHeader) {
							return
						}
						e.call(f, i)
					}, this)
				}, this)
			}, this)
		},
		getSegmentNearX: function(f) {
			var g = 10000000000;
			var e = null;
			this.eachSegment(function(i) {
				var j = i.getGlobalX() + 0.5 * i.width;
				var h = Math.abs(f - j);
				if(h < g) {
					g = h;
					e = i
				}
			}, this);
			return e
		},
		getSegmentWithLocalURL: function(e, f) {
			f = f || 0;
			var g = null;
			this.eachSegment(function(h) {
				if(h.localURL === e && h.urlIndex === f) {
					g = h
				}
			}, this);
			return g
		},
		getSegmentPageInfos: function() {
			var e = "";
			this.eachSegment(function(g) {
				var f = this.root.contentContainer.getContentSizeForProperties(g.properties, 2000, 2000);
				var h = g.properties.pageColor;
				if(h === undefined) {
					h = "fff"
				}
				e += g.name + " " + h + " " + f.width + " " + f.height + " " + g.previewURL + "\n"
			}, this);
			return e
		},
		getSegmentThumbnailInfos: function() {
			var e = "";
			this.eachSegment(function(f) {
				e += f.name + " " + (f.properties.scale || 1) + " " + (f.properties.widthScale || 1) + "\n"
			}, this);
			return e
		},
		mouseWheelWithEvent: function(f) {
			var e = f.event;
			var g = (e.axis !== undefined) ? (e.axis === e.HORIZONTAL_AXIS) : (e.wheelDeltaX !== undefined) ? (Math.abs(e.wheelDeltaX) > Math.abs(e.wheelDeltaY)) : false;
			var h = e.detail ? (-e.detail) : e.wheelDelta ? (e.wheelDelta / (((e.wheelDelta % 120) === 0) ? 120 : 3)) : 0;
			h *= Browser.firefox ? 6 : 1;
			if(g) {
				this.mouseWheelHorizontal(-h, f)
			} else {
				this.mouseWheelVertical(h, f)
			}
		},
		mouseWheelHorizontal: function(e, g) {
			g.stop();
			if(this.isZoomTransitioning) {
				return
			}
			if(!this.isZoomed || !this.pageSet.zoomedPage) {
				return
			}
			var f = this.pageSet.zoomedPage.getGlobalPosition().y;
			if(-g.page.y <= f) {
				return
			}
			this.recenterBackgroundOffset();
			this.setScrollX(this.scrollX - e);
			this.zoomSegmentAtCenter()
		},
		mouseWheelVertical: function(e, f) {
			if(this.isZoomed) {
				return
			}
			f.stop();
			if(this.isZoomTransitioning) {
				return
			}
			this.recenterBackgroundOffset();
			this.setScrollY(this.scrollY - e)
		},
		getMinScrollX: function() {
			return -this.sections.width + 0.5 * this.width
		},
		getMaxScrollX: function() {
			return 0.5 * this.width
		},
		getMinScrollY: function() {
			return 0
		},
		getMaxScrollY: function() {
			return this.sections.height - this.height
		},
		setScrollOffset: function(g, f, e) {
			if(!e) {
				g = this.isZoomed ? g.limit(this.getMinScrollX(), this.getMaxScrollX()) : 0;
				f = this.isZoomed ? f : f.limit(this.getMinScrollY(), this.getMaxScrollY())
			}
			this.scrollX = g;
			this.scrollY = f;
			if(BVLayer.animationDuration === 0) {
				this.recenterBackgroundOffset()
			}
			this.sections.setPosition(g, f);
			this.updateEdgeShadows();
			this.updateBackgroundPosition();
			this.updateHeaderPositions();
			this.updateSectionTitlePositions();
			this.updateDoodlePosition();
			this.updateContactsPosition();
			this.updateSectionTitlesHidden()
		},
		updateBackgroundPosition: function() {
			this.background.setPosition(this.scrollX + this.backgroundOffsetX, this.scrollY + this.backgroundOffsetY)
		},
		updateContactsPosition: function() {
			this.topContactSet.setY(this.scrollY - 7);
			this.bottomContactSet.setY(this.scrollY - this.sections.height + 22);
			this.topContactSet.setHidden(this.isZoomed);
			this.bottomContactSet.setHidden(this.isZoomed)
		},
		updateDoodlePosition: function() {
			this.doodle.updateWithStrip(this.sections.sublayers[0].strips.sublayers[0])
		},
		updateEdgeShadows: function() {
			this.edgeShadows.topShadow.setY(this.isZoomed ? (this.edgeShadows.topShadow.height + 2) : this.scrollY);
			this.edgeShadows.bottomShadow.setHidden(this.isZoomed);
			this.edgeShadows.bottomShadow.setY(Math.min(-this.sections.height + this.scrollY, -this.height) + this.edgeShadows.bottomShadow.height)
		},
		setScrollY: function(e) {
			this.setScrollOffset(this.scrollX, e);
			BVLayer.animate(0, function() {
				var f = (this.scrollY - this.getMinScrollY()) / (this.getMaxScrollY() - this.getMinScrollY());
				this.yScroller.setProgress(f)
			}, this)
		},
		setScrollX: function(g) {
			g = g.limit(this.getMinScrollX(), this.getMaxScrollX());
			var f = this.scrollY + (g - this.scrollX) * Math.tan(kSiteStripRotation);
			this.setScrollOffset(g, f);
			var e = (this.scrollX - this.getMaxScrollX()) / (this.getMinScrollX() - this.getMaxScrollX());
			this.xScroller.setProgress(e)
		},
		scrollSegmentToCenter: function(f, g) {
			if(g === undefined) {
				g = 400
			}
			var h = this.getLocalPointForGlobalPoint(f.getGlobalPosition()).x;
			var e = 0.5 * this.width - (h + 0.5 * f.width);
			BVLayer.animate(g, function() {
				this.setScrollX(this.scrollX + e)
			}, this);
			if(this.recenterBackgroundTimer) {
				clearTimeout(this.recenterBackgroundTimer)
			}
			this.recenterBackgroundTimer = (function() {
				this.recenterBackgroundOffset();
				this.updateBackgroundPosition()
			}).delay(g + 200, this)
		},
		recenterBackgroundOffset: function() {
			var f = this.backgroundOffsetX + this.scrollX;
			f -= Math.floor(f / this.background.tileWidth) * this.background.tileWidth;
			this.backgroundOffsetX = f - this.scrollX;
			var e = this.backgroundOffsetY + this.scrollY;
			e -= Math.floor(e / this.background.tileHeight) * this.background.tileHeight;
			this.backgroundOffsetY = e - this.scrollY
		},
		scrollWithTouches: function(e) {
			if(this.isZoomed) {
				this.setScrollX(this.scrollX + e.deltaTranslation.x);
				this.zoomSegmentAtCenter()
			} else {
				this.setScrollY(this.scrollY + e.deltaTranslation.y)
			}
			e.resetDeltaTranslation()
		},
		setNativeScrollbarHidden: function(e) {
			if(e === this.isNativeScrollbarHidden) {
				return
			}
			this.isNativeScrollbarHidden = e;
			document.id(document.body).setStyle("overflowY", e ? "hidden" : "scroll")
		},
		stopMomentumScrolling: function() {
			if(this.momentumScrollInterval) {
				clearInterval(this.momentumScrollInterval);
				delete this.momentumScrollInterval
			}
		},
		momentumScrollWithTouches: function(g) {
			this.stopMomentumScrolling();
			var f = this.isZoomed ? g.velocity.x : g.velocity.y;
			var e = Math.abs(f) > 40;
			if(!e) {
				return
			}
			this.momentumVelocity = f;
			this.momentumLastTimestamp = Date.now();
			this.momentumScrollInterval = this.updateMomentumScroll.periodical(20, this)
		},
		updateMomentumScroll: function() {
			var g = Date.now();
			var f = g - this.momentumLastTimestamp;
			this.momentumLastTimestamp = g;
			this.momentumVelocity *= Math.exp(-0.005 * f);
			if(Math.abs(this.momentumVelocity) < 30) {
				this.stopMomentumScrolling();
				return
			}
			var e = (this.momentumVelocity * f / 1000).limit(-200, 200);
			if(this.isZoomed) {
				this.setScrollX(this.scrollX + e);
				this.zoomSegmentAtCenter()
			} else {
				this.setScrollY(this.scrollY + e)
			}
		},
		setZoomedSegment: function(j, f, i) {
			var h = this.zoomedSegment;
			if(h === j) {
				return
			}
			this.zoomedSegment = j;
			var l = !!h;
			var k = !!j;
			if(h) {
				h.setHighlighted(false)
			}
			if(j) {
				j.setHighlighted(true)
			}
			if(j && j.strip.hidden) {
				j.strip.setHidden(false)
			}
			if(j && j.page.hidden) {
				j.page.setHidden(false)
			}
			if(l && k) {
				if(i) {
					j.page.preloadContent()
				}
				this.pageSet.setZoomedPage(j.page);
				if(i) {
					this.scrollSegmentToCenter(j)
				}
				return
			}
			this.isZoomTransitioning = true;
			var e = 23;
			if(this.zoomTransitionTimers) {
				this.zoomTransitionTimers.each(clearTimeout)
			}
			this.zoomTransitionTimers = [];
			var g = function(n, m, o) {
				if(BVLayer.animationsEnabled) {
					o.zoomTransitionTimers.push(m.delay(n, o))
				} else {
					m.call(o)
				}
			};
			this.zoomDuration = kSiteZoomDuration * (f ? 5 : 1);
			this.unzoomDuration = kSiteUnzoomDuration * (f ? 5 : 1);
			if(!l && k) {
				j.page.preloadContent();
				this.isZoomed = true;
				this.edgeShadows.headerTitleShadow.setHidden(false);
				this.homeButton.setHidden(false);
				this.xScroller.setHidden(false);
				BVLayer.animate(this.zoomDuration, function() {
					this.updateSectionPositionsPreservingPositionOfSegment(j)
				}, this);
				this.yScroller.setHidden(true);
				this.setNativeScrollbarHidden(false);
				this.scrollSegmentToCenter(j, this.zoomDuration);
				BVLayer.animate(this.zoomDuration, function() {
					var m = this.sections.getLocalPointForGlobalPoint(j.getGlobalPosition()).y;
					this.setScrollY(-m - this.xScroller.height - e);
					this.doodle.setOpacity(0);
					this.setSectionTitlesOpacity(0)
				}, this);
				this.pageSet.setZoomedPage(j.page);
				g(this.zoomDuration, function() {
					this.isZoomTransitioning = false;
					this.setStripHeadersHidden(false)
				}, this)
			} else {
				if(l && !k) {
					this.isZoomed = false;
					this.homeButton.setHidden(true);
					this.setStripHeadersHidden(true);
					this.edgeShadows.headerTitleShadow.setHidden(true);
					this.xScroller.setHidden(true);
					BVLayer.animate(this.unzoomDuration, function() {
						this.updateSectionPositionsPreservingPositionOfSegment(h)
					}, this);
					this.yScroller.setHidden(false);
					this.setNativeScrollbarHidden(true);
					BVLayer.animate(this.unzoomDuration, function() {
						this.setScrollY(this.scrollY - 180);
						this.doodle.setOpacity(1);
						this.setSectionTitlesOpacity(1)
					}, this);
					this.setHashForSegment(null);
					this.pageSet.setZoomedPage(null);
					g(this.unzoomDuration, function() {
						this.isZoomTransitioning = false
					}, this)
				}
			}
		},
		zoomSegmentAtCenter: function() {
			var e = this.getSegmentNearX(0.5 * this.width);
			if(!e.isHeader) {
				this.setZoomedSegment(e)
			}
		},
		touchDidGoDown: function(e) {
			this.isScrolling = false;
			this.stopMomentumScrolling()
		},
		touchDidMove: function(e) {
			if(this.isScrolling) {
				this.scrollWithTouches(e);
				return
			}
			if(Math.abs(e.translation.x) > 4 || Math.abs(e.translation.y) > 4) {
				this.isScrolling = true;
				e.resetDeltaTranslation()
			}
		},
		touchDidGoUp: function(e) {
			if(this.isScrolling) {
				this.isScrolling = false;
				this.momentumScrollWithTouches(e)
			} else {
				if(e.wasDoubleTap) {
					this.setZoomedSegment(null)
				}
			}
		},
		explode: function() {
			var f = Date.now();
			var e = 0;
			var g = 1 / 200;
			(function() {
				var h = Date.now();
				var j = h - f;
				f = h;
				var k = g * Math.PI * 2 * j;
				var i = function(l) {
					if(l.accelerated) {
						if(l.explodePhase === undefined) {
							l.explodePhase = Math.random() * Math.PI * 2
						}
						l.setPosition(l.x + e * Math.cos(l.explodePhase), l.y + e * Math.sin(l.explodePhase));
						l.explodePhase += k
					}
					l.sublayers.each(i)
				};
				i(this);
				e += j / 100;
				e = Math.min(e, 400);
				g *= Math.pow(0.99, j / 50);
				g = Math.max(g, 1 / 1000)
			}).periodical(50, this)
		}
	});
	var c = new Class({
		Extends: BVLayer,
		initialize: function(i, f) {
			this.parent(i);
			this.site = this.getAncestorWithClass(a);
			this.setHasElement(false);
			this.tileWidth = 622;
			this.tileHeight = 400;
			var h = 2;
			var e = Math.ceil(this.site.height / this.tileHeight) + 2 * h;
			var k = Math.ceil(this.site.width / this.tileWidth) + 2 * h;
			for(var l = 0; l < e; l++) {
				for(var g = 0; g < k; g++) {
					var j = new BVLayer(this);
					j.setAccelerated(true);
					j.setContentsURLAndSize("Images/Background.jpg", this.tileWidth, this.tileHeight);
					j.setPosition((g - h) * this.tileWidth, -(l - h) * this.tileHeight)
				}
			}
		}
	});
	var b = new Class({
		Extends: BVLayer,
		initialize: function(f, e) {
			this.parent(f);
			this.site = this.getAncestorWithClass(a);
			this.setAccelerated(true);
			this.setHoverable(true);
			this.setTouchable(true);
			this.element.setStyle("cursor", "pointer");
			this.setHidden(true);
			this.setSize(60, 70);
			this.image = new BVLayer(this);
			this.image.setPosition(6, -5);
			this.image.setContentsURLAndSize("Images/ButtonHome.png", 23, 38);
			this.overlay = new BVLayer(this);
			this.overlay.setPosition(this.image.getPosition());
			this.overlay.setSize(this.image.getSize())
		},
		mouseEntered: function() {
			if(this.touches) {
				return
			}
			this.overlay.setBackgroundColor("rgba(0,0,0,0.3)")
		},
		mouseExited: function() {
			if(this.touches) {
				return
			}
			this.overlay.setBackgroundColor(null)
		},
		touchDidGoDown: function(e) {
			this.overlay.setBackgroundColor("rgba(0,0,0,0.5)")
		},
		touchDidMove: function(e) {},
		touchDidGoUp: function(f) {
			this.overlay.setBackgroundColor(null);
			if(this.containsGlobalPoint(f.globalPoint)) {
				var e = f.event.shift;
				this.site.setZoomedSegment(null, e)
			}
		}
	});
	var d = new Class({
		Extends: BVLayer,
		initialize: function(e) {
			this.parent(e);
			this.site = this.getAncestorWithClass(a);
			this.setHasElement(false);
			this.leftDoodle = new BVLayer(this);
			this.leftDoodle.setContentsURLAndSize("Images/DoodleLeft.png", 86, 170);
			this.leftDoodle.setAccelerated(true);

			//			添加logo
			this.leftLogo = new BVLayer(this);
			this.leftLogo.setContentsURLAndSize("Images/logo.png", 203.2, 48.8);
			this.leftLogo.setAccelerated(true);



			this.rightDoodle = new BVLayer(this);
			this.rightDoodle.setContentsURLAndSize("Images/DoodleRight.png", 67, 184);
			this.rightDoodle.setAccelerated(true)
		},
		updateWithStrip: function(h) {
			var i = h.segments.sublayers[1];
			var g = i.getGlobalPosition();
			this.leftDoodle.setPosition(g.x - 16, g.y + this.leftDoodle.height - 6);
			//			添加logo定位
			this.leftLogo.setPosition(g.x - 430, g.y + this.leftLogo.height - (-70));
			var e = h.segments.sublayers[h.segments.sublayers.length - 1];
			var f = e.getGlobalPointForLocalPoint(e.width, 0);
			this.rightDoodle.setPosition(f.x - this.rightDoodle.width + 18, f.y + this.rightDoodle.height - 7)
		},
		setOpacity: function(e) {
			this.opacity = e;
			this.leftDoodle.setOpacity(e);
			this.rightDoodle.setOpacity(e)
		}
	})
})();
(function() {
	var b = this.SiteSection = new Class({
		Extends: BVLayer,
		initialize: function(d, c) {
			this.parent(d);
			this.site = this.getAncestorWithClass(Site);
			this.setHasElement(false);
			this.properties = this.site.mergePropertiesFromElement({}, c);
			this.stripXMargin = 60;
			this.rowWidth = this.site.width - 2 * this.stripXMargin + 10;
			this.segmentUnscaledWidth = 218;
			this.segmentUnscaledHeight = this.properties.filmEdges ? 235 : 204;
			this.titleHeight = this.properties.titleHeight || 0;
			this.setWidth(this.site.width);
			this.strips = new BVLayer(this);
			this.strips.setHasElement(false);
			this.addStrips(c);
			this.updateStripPositions();
			this.titleSet = new a(this.site.sectionTitles, this, c)
		},
		setTitleOpacity: function(c) {
			this.titleSet.setOpacity(c)
		},
		updateTitlePosition: function() {
			this.titleSet.updatePosition()
		},
		showTitlesThatHaveScrolledOffscreen: function() {
			this.titleSet.showTitlesThatHaveScrolledOffscreen()
		},
		addStrips: function(v) {
			var f = v.getChildren("h2");
			var n = v.getChildren("ul");
			var u = 0;
			var e = this.rowWidth;
			var d = [];
			for(var r = 0; r < n.length; r++) {
				var t = f[r].get("html");
				var p = n[r].getChildren("li");
				var m = this.site.mergePropertiesFromElement(this.properties, n[r]);
				var x = m.scale;
				var q = Math.round(this.segmentUnscaledWidth * x);
				if(!m.noStretch) {
					var w = Math.round(e / q);
					q = Math.floor(e / w);
					x = q / this.segmentUnscaledWidth
				}
				var h = p.length;
				var j = 0;
				while(j < h) {
					var s = 0;
					var o = 0;
					var g = (function() {
						s = 0;
						o = 0;
						for(var y = j; y < h; y++) {
							var i = this.site.mergePropertiesFromElement(m, p[y]);
							var z = q;
							if(i.widthScale) {
								z = Math.round(z * i.widthScale)
							}
							if(y == 0) {
								z += q
							}
							if(u + o + z > e) {
								break
							}
							s++;
							o += z
						}
					}).bind(this);
					if(m.rowBreak) {
						u = 0
					}
					g();
					if(s == 0) {
						u = 0;
						g()
					}
					var l = {
						segmentElements: p.slice(j, j + s),
						properties: m,
						isFirstInSubsection: (j == 0),
						isLastInSubsection: (j + s >= h),
						isFirstInRow: (u == 0),
						title: (j == 0) ? t : null,
						scale: x,
						rowWidth: o + u
					};
					if(l.isFirstInRow) {
						d.push([])
					}
					d[d.length - 1].push(l);
					u += o;
					j += s
				}
			}
			var c = null;
			var k = 0;
			d.each(function(A, C) {
				var i = A[A.length - 1].rowWidth;
				var y = e - i;
				var z = (A.length > 1) ? Math.floor(y / (A.length - 1)) : 0;
				var B = (C == d.length - 1);
				if(B) {
					z = 0
				}
				A.each(function(F, E) {
					var D = (E == 0);
					var I = (E == A.length - 1);
					var H = new SiteStrip(this.strips, F);
					var G = (!D && !(I && F.isLastInSubsection));
					if(G) {
						H.paddingLeft = z
					}
					k += H.width;
					if(F.isFirstInSubsection) {
						c = H
					}
					if(F.isLastInSubsection) {
						c.subsectionWidth = k;
						k = 0
					}
				}, this)
			}, this)
		},
		updateStripPositionsZoomed: function() {
			var c = 30;
			var e = 0;
			var d = kSiteStripRotation;
			this.strips.each(function(f) {
				f.setZoomed(true);
				f.setPosition(c, e);
				c = Math.round(c + f.width * Math.cos(d));
				e = Math.round(e + f.width * Math.sin(d))
			}, this);
			this.setSize(c, -e)
		},
		updateStripPositionsUnzoomed: function() {
			var d = -this.titleHeight;
			var e = null;
			var c = 0;
			var f = 0;
			this.strips.each(function(i, g) {
				i.setZoomed(false);
				var j = i.header ? -8 : 0;
				j -= i.properties.topPadding || 0;
				d += j;
				if(i.isFirstInRow) {
					if(this.properties.centered) {
						i.setPositionOfLocalPoint(0.5 * this.site.width, d, 0.5 * (i.width + i.segments.sublayers[0].width), 0)
					} else {
						i.setPosition(this.stripXMargin, d)
					}
					f = i.height
				} else {
					d += c;
					f = Math.max(i.height, f);
					var h = f - i.height;
					i.setX(Math.round(e.x + (i.paddingLeft + e.width) * Math.cos(kSiteStripRotation)));
					i.setY(Math.round(j + e.y - h + (i.paddingLeft + e.width) * Math.sin(kSiteStripRotation)))
				}
				c = f - 4;
				d -= c;
				e = i
			}, this);
			this.setSize(this.site.width, -d)
		},
		updateStripPositions: function() {
			if(this.site.isZoomed) {
				this.updateStripPositionsZoomed()
			} else {
				this.updateStripPositionsUnzoomed()
			}
		},
		updateHeaderPositions: function() {
			this.strips.each(function(c) {
				c.updateHeaderPosition()
			})
		}
	});
	var a = new Class({
		Extends: BVLayer,
		initialize: function(g, j, f) {
			this.parent(g);
			this.site = this.getAncestorWithClass(Site);
			this.section = j;
			this.setHasElement(false);
			this.isInZoomedPosition = false;
			this.firstSegment = this.section.strips.sublayers[0].segments.sublayers[1];
			var i = this.firstSegment.getGlobalPosition();
			var h = f.getChildren("h1")[0];
			var d = f.getChildren("h3")[0];
			this.titleWidth = (j.properties.titleWidth || 750);
			this.subtitleWidth = 750;
			this.subtitleY = -46;
			this.titleString = h.get("html");
			this.subtitleString = d ? d.get("html") : "";
			if(j.properties.magicSubtitle) {
				this.subtitleString = "<span>" + this.subtitleString + "</span>"
			}
			this.title = new BVText(this);
			this.title.setAccelerated(true);
			this.title.setTextClass("sectionTitle");
			this.title.setTextStyle("width", this.titleWidth);
			this.title.setHTML(this.titleString);
			this.title.setRotation(kSiteSectionTitleRotation);
			this.title.setPositionOfLocalPoint(0.5 * this.site.width, 0, 0.5 * this.titleWidth, 0);
			var c = this.title.getGlobalPosition();
			this.title.segmentOffsetUnzoomed = {
				x: c.x - i.x,
				y: c.y - i.y
			};
			this.title.segmentOffsetZoomed = {
				x: -2,
				y: 42
			};
			this.subtitle = new BVText(this);
			this.subtitle.setAccelerated(true);
			this.subtitle.setTextClass("sectionSubtitle");
			this.subtitle.setTextStyle("width", this.subtitleWidth);
			this.subtitle.setHTML(this.subtitleString);
			this.subtitle.setRotation(this.title.rotation);
			this.subtitle.setPositionOfLocalPoint(0.5 * this.site.width, 0, 0.5 * this.subtitleWidth, -this.subtitleY);
			var e = this.subtitle.getGlobalPosition();
			this.subtitle.segmentOffsetUnzoomed = {
				x: e.x - i.x,
				y: e.y - i.y
			};
			this.subtitle.segmentOffsetZoomed = {
				x: this.subtitle.segmentOffsetUnzoomed.x + this.title.segmentOffsetZoomed.x - this.title.segmentOffsetUnzoomed.x,
				y: this.subtitle.segmentOffsetUnzoomed.y + this.title.segmentOffsetZoomed.y - this.title.segmentOffsetUnzoomed.y
			};
			if(j.properties.magicSubtitle) {
				this.magicSubtitleSpan = this.subtitle.textElement.getElementsByTagName("span")[0];
				this.addMagicToSubtitle()
			}
		},
		updatePosition: function() {
			if(!this.site.isZoomed) {
				this.isInZoomedPosition = false
			}
			var e = this.isInZoomedPosition ? this.title.segmentOffsetZoomed : this.title.segmentOffsetUnzoomed;
			var c = this.isInZoomedPosition ? this.subtitle.segmentOffsetZoomed : this.subtitle.segmentOffsetUnzoomed;
			var d = this.firstSegment.getGlobalPosition();
			this.title.setGlobalPosition(d.x + e.x, d.y + e.y);
			this.subtitle.setGlobalPosition(d.x + c.x, d.y + c.y)
		},
		setOpacity: function(c) {
			this.opacity = c;
			this.title.setOpacity(c);
			this.subtitle.setOpacity(c)
		},
		showTitlesThatHaveScrolledOffscreen: function() {
			if(!this.site.isZoomed || this.title.opacity == 1 || this.section.properties.hideSectionTitle) {
				return
			}
			var d = this.firstSegment.getGlobalPosition();
			var c = d.x + this.title.segmentOffsetZoomed.x;
			if(c + this.titleWidth < 0 || c > this.site.width) {
				this.title.setOpacity(1);
				this.isInZoomedPosition = true
			}
		},
		addMagicToSubtitle: function() {
			this.magicSubtitleSpan.setStyle("cursor", "pointer");
			this.magicSubtitleSpan.setStyle("pointerEvents", "auto");
			this.magicSubtitleSpan.addEvent("click", this.magicSubtitleWasClicked.bind(this))
		},
		magicSubtitleWasClicked: function() {
			if(!this.magicSubtitleIndex) {
				this.magicSubtitleIndex = 0
			}
			var d = this.getMagicSubtitles();
			if(this.magicSubtitleIndex >= d.length) {
				return
			}
			var c = d[this.magicSubtitleIndex];
			this.magicSubtitleSpan.set("html", c);
			this.magicSubtitleIndex++;
			if(this.magicSubtitleIndex >= d.length) {
				this.site.explode()
			}
		},
		getMagicSubtitles: function() {
			if(!this.magicSubtitles) {
				this.magicSubtitles = this.getMagicCode().split("OO").map(function(c) {
					return c.match(/\w\w/g).map(function(d) {
						return String.fromCharCode(parseInt("0x" + d) ^ 187)
					}).join("")
				})
			}
			return this.magicSubtitles
		},
		getMagicCode: function() {
			return "d9dac9d9ded8ced2d5dc9bc2d4cec99bc8dad8c9dedf9bd8d4ccOOcfd3de9bd1dad7dacbded5d49bd2d59bc2d4cec99bcbdedad5cecf9bd9cecfcfdec9OOcfd4d49bd6ced8d39bd6dad5d2dddec8cfd4c8cfdec9d4d5deOOd1cec8cf9bded5d4cedcd39bd0dec9d4c8ded5de9bcfd49bc8decf9bcfd3de9bccd4c9d7df9bd4d59bddd2c9deOOd9d4c9d59bc8d8c9dedad6d2d5dc979bd5decddec99bc8cfd4cbcbdedfOOd2d5dfdecbded5dfded5cf9bcddac9d2dad9d7deOOc8ccd2c8c89bdac9d6c29bddd7dad6decfd3c9d4ccdec9OOcdded7d8c9d49bddd4c99bc2d4cec99bd9c9d4d0ded59bd3dedac9cfOOda9bcfc9dad2d5ccc9ded8d09bd2d59bda9bd6d2d7d7d2d4d59bd8d4d7d4c9c8OOd7d4cddedf9bdad5df9bdddedac9dedf9bd2d59bdecacedad79bd6dedac8cec9deOOc8cacedac9de9bcbdedc979bc9d4ced5df9bd3d4d7de979bd3c2dfc9daced7d2d89bd1dad8d0d3dad6d6dec9OOced5c8cfdad9d7de9bd4c8d8d2d7d7dacfd4c9OOd7dedad0c29bdad9c8cfc9dad8cfd2d4d5OOcfd3de9bd7dac8cf9bdcc9dedacf9bdcded5cfd7ded6dad59bc8d8d2ded5cfd2c8cfOOda9bddd2dcd6ded5cf9bd4dd9bc2d4cec99bd6dad8d3d2d5dacfd2d4d5c8OOd5d4cf9bda9bc9d4d9d4cf9bc8ded5cf9bd9dad8d09bddc9d4d69bcfd3de9bddcecfcec9deOOcbd7dad5cfd2d5dc9bc8dededfc89bddd4c99bcfc9dedec89bd29cd7d79bd5decddec99bc8dedeOOd6d4c9de9bc9d3c2d6de9bcfd3dad59bc9dedac8d4d5OOc2d4ce9bd9c9d2d5dc9bcfd3de9bc8cfcec9d6979bf29bdcd4cf9bcfd3de9bdfc9dad5dcOOccd4ced7df9bc9dacfd3dec99bdcc9d4cc9bcfc9dedec89bcfd3dad59bddd7d4ccdec9c8OOd6ded6d9dec99bd4dd9bcfd3de9bded6cbcfc29bc8decfOOdfc9d2d5d0d2d5dc9bddc9d4d69bcfd3de9bd0d7ded2d59bd9d4cfcfd7deOOd8d4d5dcded5d2cfdad7d7c29bced5daddddd2d7d2dacfdedfOOd6dac8cfdec99bdfded7cec8d2d4d5d2c8cfOOd8d4d5c8ced6d6dacfde9bced5cbc9d4dddec8c8d2d4d5dad7OOd3dedadf9bd4dd9bcfd3de9bd2d8d4d5d4d8d7dac8c8OOd8d4dcd5d2cfd2cdde9bcfc9d2cfd4d5deOOcbd7dacec8d2d9d7c29bdfded5d2dad9d7deOOda9bcfd2d8d09bd4d59bcfd3de9bc8d8c9d4cfced69bd4dd9bcfd3de9bccd4c9d7dfOOddc9dede9bc8cbd2c9d2cf979bd4c99bdacf9bd7dedac8cf9bd3dedacdd2d7c29bdfd2c8d8d4ced5cfdedfOOd5d4cf9bdfdedddedacfd2d5dc9bcfd3de9bcbcec9cbd4c8de979bd9cecf9bcbcecfcfd2d5dc9bcecb9bda9bdcd4d4df9bddd2dcd3cfOOccd4d59ccf9bd7decf9bc9dedad7d2cfc29bc8cfdad5df9bd2d59bcfd3de9bccdac2OOd3dac89bc8d49bd6ced8d39bcfd49bdcd2cddeOOc9ced2d5d2d5dc9bc2d4ce9bddd4c99bdad7d79bd4cfd3dec9c8OOd6cecfcedad7d7c296dac8c8cec9dedf9bd3dedac9cfd9c9dedad0OOd6dadfde9bc2d4ce9bd8d7d2d8d0OOd6dadfde9bc2d4ce9bd8d7d2d8d09bdadcdad2d5OOd4d0dac2979bded5d4cedcd3979bc8cfd4cb9bd8d7d2d8d0d2d5dcOOd5d4979bc9dedad7d7c2OOc8cfd4cbOOcbd7dedac8deOOc8cfd4cbOOcbd7dedac8deOOc8cfd4cbOOd4d39bdcd4df"
		}
	})
})();
(function() {
	var a = this.SiteStrip = new Class({
		Extends: BVLayer,
		initialize: function(g, h) {
			this.parent(g);
			this.section = this.getAncestorWithClass(SiteSection);
			this.site = this.getAncestorWithClass(Site);
			this.setAccelerated(true);
			this.setHidden(true);
			this.properties = h.properties;
			this.isFirstInSubsection = h.isFirstInSubsection;
			this.isLastInSubsection = h.isLastInSubsection;
			this.isFirstInRow = h.isFirstInRow;
			this.shouldHideHeaderTitle = !!this.properties.hideHeader;
			this.paddingLeft = 0;
			this.stripScale = h.scale;
			this.stripScaleForPageOffset = this.properties.scaleForPageOffset || this.stripScale;
			this.segmentSize = {
				width: Math.round(this.section.segmentUnscaledWidth * this.stripScale),
				height: Math.round(this.section.segmentUnscaledHeight * this.stripScale)
			};
			if(h.title === null) {
				this.offLeft = new BVLayer(this);
				this.offLeft.setContentsURL("Images/FilmOffleft.png");
				this.offLeft.setSize(Math.round(57 * this.segmentSize.height / 235), this.segmentSize.height);
				this.offLeft.setX(-this.offLeft.width)
			}
			this.segments = new BVLayer(this);
			var e = 0;
			var d = 0;
			if(h.title !== null) {
				this.header = new c(this.segments, h.title);
				this.setHeaderHidden(true);
				e += this.header.width
			}
			var f = this.section.site.pageSet;
			h.segmentElements.each(function(i) {
				var j = new SiteStripSegment(this.segments, i);
				f.addPageForSegment(j);
				j.setX(e);
				e += j.width;
				d = Math.max(d, j.height)
			}, this);
			this.setSize(e, d);
			this.offRight = new BVLayer(this);
			if(this.isLastInSubsection) {
				this.offRight.setContentsURLAndSize("Images/FilmLeft.png", this.segmentSize)
			} else {
				this.offRight.setContentsURL("Images/FilmOffright.png");
				this.offRight.setSize(Math.round(57 * this.segmentSize.height / 235), this.segmentSize.height)
			}
			this.offRight.setX(this.width);
			this.setRotation(kSiteStripRotation)
		},
		setZoomed: function(d) {
			if(this.offLeft) {
				this.offLeft.setHidden(d)
			}
			this.offRight.setHidden(d && !this.isLastInSubsection)
		},
		setHeaderHidden: function(d) {
			if(this.shouldHideHeaderTitle && this.header) {
				this.header.title.setHidden(d)
			}
		},
		updateHeaderPosition: function() {
			if(this.header) {
				this.header.title.updatePosition()
			}
		}
	});
	var c = this.SiteStripHeader = new Class({
		Extends: BVLayer,
		initialize: function(d, e) {
			this.parent(d);
			this.strip = this.getAncestorWithClass(a);
			this.site = this.getAncestorWithClass(Site);
			this.isHeader = true;
			this.setSize(this.strip.segmentSize);
			this.film = new BVLayer(this);
			this.film.setContentsURLAndSize("Images/FilmRight.png", this.getSize());
			this.title = new b(this.site.headerTitles, this.strip, e)
		}
	});
	var b = this.SiteStripHeaderTitle = new Class({
		Extends: BVLayer,
		initialize: function(h, g, j) {
			this.parent(h);
			this.site = this.getAncestorWithClass(Site);
			this.strip = g;
			this.segmentWidth = this.strip.segmentSize.width;
			this.segmentHeight = this.strip.segmentSize.height;
			this.setAccelerated(true);
			this.setRotation(kSiteStripRotation);
			this.text = new BVText(this);
			var f = g.properties.headerClass || "stripHeader";
			this.text.setTextClass(f);
			this.text.setTextStyles({
				position: "absolute",
				bottom: "0px",
				right: "0px",
				width: "200px"
			});
			var d = j.contains(" ");
			var e = j.replace(" ", "<br/>");
			this.text.setHTML(e);
			var i = this.strip.stripScale;
			this.text.setRotation(kSiteStripHeaderTitleRotation);
			this.localTargetPosition = {
				x: this.segmentWidth - Math.round(26 * i),
				y: -this.segmentHeight + Math.round((d ? 80 : 88) * i)
			}
		},
		updatePosition: function() {
			var h = this.strip.getGlobalPointForLocalPoint(this.localTargetPosition);
			if(!this.site.isZoomed) {
				this.setGlobalPosition(h);
				return
			}
			var i = this.segmentWidth;
			var f = this.strip.subsectionWidth - Math.round(0.5 * (this.site.width + this.segmentWidth) - this.segmentWidth);
			if(f <= i) {
				this.setGlobalPosition(h);
				return
			}
			var e = this.strip.getGlobalPosition();
			var d = e.x + f;
			var j = -20;
			var g = {
				x: j + -3 + this.localTargetPosition.x,
				y: -20 + this.localTargetPosition.y
			};
			if(d < 0) {} else {
				if(d < i) {
					var k = d / i;
					h.x = lerp(-this.segmentWidth, 0, k) + this.localTargetPosition.x;
					h.y = g.y
				} else {
					if(e.x < j) {
						h = g
					} else {}
				}
			}
			this.setGlobalPosition(h)
		}
	})
})();
(function() {
	var b = this.SiteStripSegment = new Class({
		Extends: BVLayer,
		initialize: function(i, e) {
			this.parent(i);
			this.strip = this.getAncestorWithClass(SiteStrip);
			this.section = this.getAncestorWithClass(SiteSection);
			this.site = this.getAncestorWithClass(Site);
			this.setHoverable(true);
			this.setTouchable(true);
			this.element.setStyle("cursor", "pointer");
			this.properties = this.site.mergePropertiesFromElement(this.strip.properties, e);
			this.parseSegmentElement(e);
			var k = this.strip.stripScale;
			var j = this.properties.widthScale || 1;
			this.setSize(this.strip.segmentSize.width * j, this.strip.segmentSize.height);
			var h = this.properties.filmEdges ? -29 : -14;
			var g = {
				x: Math.round(5 * k),
				y: Math.round(h * k)
			};
			var f = {
				width: Math.round((218 * j - 10) * k),
				height: Math.round(170 * k)
			};
			this.film = new BVLayer(this);
			var d = "Images/FilmMiddle" + (this.properties.filmEdges ? "" : "Solid") + ".png";
			this.film.setContentsURLAndSize(d, this.getSize());
			this.contentClip = new BVLayer(this);
			this.contentClip.setPosition(g);
			this.contentClip.setSize(f.width, f.height - 1);
			this.window = new BVLayer(this);
			this.window.setContentsURLAndSize("Images/Window.png", f);
			this.window.setPosition(g);
			this.window.setHidden(false);
			this.windowOverlay = new BVLayer(this.window);
			this.windowOverlay.setSize(this.window.getSize());
			this.windowOverlay.setHidden(true);
			this.addContent()
		},
		parseSegmentElement: function(j) {
			var e = j.getElement("a");
			this.name = e.get("id");
			this.url = ContentContainer.getBrowserSpecificURL(e.get("href"));
			var l = j.getElement(".display") || e;
			this.displayURL = ContentContainer.getBrowserSpecificURL(l.get("href"));
			var k = j.getElement(".click");
			if(k) {
				this.contentClickURL = ContentContainer.getBrowserSpecificURL(k.get("href"))
			} else {
				this.contentClickURL = (this.displayURL == this.url) ? null : this.url
			}
			var d = j.getElement(".preview") || l;
			this.previewURL = ContentContainer.getPreviewURL(d.get("href"));
			var h = this.url.match(/\.com\/(.+)/);
			this.localURL = (h && h[1]) ? h[1] : this.url;
			this.localURL = this.localURL.replace(/\/$/, "");
			this.urlIndex = (this.properties.urlIndex || 0) * 1;
			var g = j.getElement(".title");
			this.titleString = g ? g.get("html") : "";
			var f = j.getElement(".subtitle");
			this.subtitleString = f ? f.get("html") : "";
			var i = j.getElement(".caption");
			this.captionString = i ? i.get("html") : ""
		},
		addContent: function() {
			this.content = new BVLayer(this.contentClip);
			if(gSiteShowThumbnailImages) {
				this.content.setContentsURLAndSize("ThumbnailImages/" + this.name + ".jpg", this.contentClip.getSize())
			}
			if(!this.properties.hideTitle) {
				this.title = new BVText(this.contentClip);
				this.title.setPosition(0, -this.contentClip.height);
				var f = {
					position: "absolute",
					bottom: "0px",
					left: "0px",
					width: this.contentClip.width + "px",
					backgroundImage: "url(Images/WindowCaption.png)",
					backgroundRepeat: "repeat-x"
				};
				this.title.setTextStyles(f);
				var d = this.properties.titleClass ? (" " + this.properties.titleClass) : "";
				var e = this.properties.subtitleOnly ? ("<div class='segmentSubtitleSolo'>" + this.subtitleString + "</div>") : this.subtitleString ? ("<div class='segmentTitle" + d + "'>" + this.titleString + "</div><div class='segmentSubtitle'>" + this.subtitleString + "</div>") : ("<div class='segmentTitleSolo" + d + "'>" + this.titleString + "</div>");
				this.title.setHTML(e)
			}
		},
		setHighlighted: function(d) {
			this.window.setContentsURL(d ? "Images/WindowHighlighted.png" : "Images/Window.png");
			if(d) {
				this.windowOverlay.setHidden(true)
			}
		},
		mouseEntered: function() {
			if(this.site.isScrolling || this.site.zoomedSegment == this) {
				return
			}
			this.windowOverlay.setBackgroundColor("rgba(0,0,0,0.2)");
			this.windowOverlay.setHidden(false)
		},
		mouseExited: function() {
			this.windowOverlay.setHidden(true)
		},
		touchDidGoDown: function(d) {
			this.site.isScrolling = false;
			this.site.stopMomentumScrolling();
			if(this.site.zoomedSegment != this) {
				this.windowOverlay.setBackgroundColor("rgba(0,0,0,0.35)");
				this.windowOverlay.setHidden(false)
			}
		},
		touchDidMove: function(e) {
			if(this.site.isScrolling) {
				this.site.scrollWithTouches(e);
				return
			}
			var d = (this.site.zoomedSegment != this) && this.containsGlobalPoint(e.globalPoint);
			if(Math.abs(e.translation.x) > 8 || Math.abs(e.translation.y) > 8) {
				this.site.isScrolling = true;
				e.resetDeltaTranslation();
				d = false
			}
			this.windowOverlay.setHidden(!d)
		},
		touchDidGoUp: function(f) {
			this.windowOverlay.setHidden(true);
			if(this.site.isScrolling) {
				this.site.isScrolling = false;
				this.site.momentumScrollWithTouches(f);
				return
			}
			if(f.event.control || f.event.alt || f.event.meta) {
				window.open(this.url)
			} else {
				if(this.site.zoomedSegment != this) {
					var e = this.site.isZoomed;
					var d = f.event.shift;
					this.site.setZoomedSegment(this, d, true)
				} else {
					if(f.wasDoubleTap) {
						window.location = this.url
					}
				}
			}
		}
	});
	var c = this.SiteStripSegmentButtonSet = new Class({
		Extends: BVLayer,
		initialize: function(d) {
			this.parent(d);
			this.segment = this.getAncestorWithClass(b);
			this.site = this.getAncestorWithClass(Site);
			this.closeButton = new a(this, "Close");
			this.expandButton = new a(this, "Expand");
			this.expandButton.setX(d.width - this.expandButton.width)
		},
		buttonWasClicked: function(f, g) {
			if(this.segment !== this.site.zoomedSegment) {
				return
			}
			if(f === this.closeButton) {
				var d = g.shift;
				this.site.setZoomedSegment(null, d)
			} else {
				if(f === this.expandButton) {
					var e = this.segment.url;
					if(e) {
						window.location = e
					}
				}
			}
		}
	});
	var a = this.SiteStripSegmentButton = new Class({
		Extends: BVLayer,
		initialize: function(e, d) {
			this.parent(e);
			this.buttonSet = this.getAncestorWithClass(c);
			this.imageURL = "Images/Window" + d + "Button.png";
			this.hoverURL = "Images/Window" + d + "ButtonHover.png";
			this.setTouchable(true);
			this.setHoverable(true);
			this.setContentsURLAndSize(this.imageURL, 38, 34)
		},
		mouseEntered: function() {
			this.setContentsURL(this.hoverURL)
		},
		mouseExited: function() {
			this.setContentsURL(this.imageURL)
		},
		touchDidGoUp: function(d) {
			console.log(1321)
			if(!this.containsGlobalPoint(d.globalPoint)) {
				return
			}
			this.setContentsURL(this.imageURL);
			this.buttonSet.buttonWasClicked(this, d.event)
		}
	})
})();
(function() {
	var b = this.SitePageSet = new Class({
		Extends: BVLayer,
		initialize: function(e) {
			this.parent(e);
			this.site = this.getAncestorWithClass(Site);
			this.tocTopMargin = 20;
			this.tocHeight = 250;
			this.zoomedYOffset = 30;
			this.zoomedPage = null;
			this.pages = new BVLayer(this);
			this.backgroundGradientY = -200;
			this.backgroundGradient = new BVLayer(this);
			this.backgroundGradient.setAccelerated(true);
			this.backgroundGradient.setHidden(true);
			this.backgroundGradient.setContentsURL("Images/BackgroundGradient.png");
			this.backgroundGradient.setY(-this.site.height);
			this.backgroundGradient.setSize(this.site.width, this.site.height + this.backgroundGradientY)
		},
		siteHeightDidChange: function(e) {
			if(this.y < 0) {
				this.setY(-e)
			}
			this.pages.each(function(f) {
				f.siteHeightDidChange(e)
			}, this);
			this.backgroundGradient.setHeight(e + this.backgroundGradientY)
		},
		addPageForSegment: function(e) {
			new a(this.pages, e)
		},
		allPagesWereAdded: function() {
			var e;
			this.pages.each(function(f) {
				if(e) {
					e.nextPage = f
				}
				f.previousPage = e;
				e = f
			});
			this.updatePagePositionsAroundPage(this.pages.sublayers[0]);
			this.hideAllPages()
		},
		getAvailableHeightForPage: function(f) {
			var e = this.tocHeight * Math.max(0.51, f.segment.strip.stripScaleForPageOffset);
			e += f.segment.properties.pageYOffset || 0;
			return Math.round(this.site.height - e - this.site.xScroller.height - this.tocTopMargin)
		},
		updatePagePositionsAroundPage: function(j, e) {
			var m = Math.round(0.5 * (this.site.width - j.width) - 100).limit(100, 200);
			if(!e) {
				m = Math.round(this.site.width / 2)
			}
			var g = 100;
			var f = 100;
			var k = this.site.width;
			var i = this.site.height;
			var l = false;
			var h = BVLayer._quirks.isAccelerationAvailable ? (3 / 180 * Math.PI) : 0;
			this.pages.each(function(o) {
				var n = e ? (o.showingY - this.zoomedYOffset) : (-i - f);
				if(l) {
					o.setRotation(-h);
					o.setPosition(k + g, n)
				} else {
					if(o == j.nextPage) {
						o.setHidden(false);
						o.setRotation(-h);
						o.setPosition(k - m, n);
						l = true
					} else {
						if(o == j) {
							o.setHidden(false);
							o.setRotation(0);
							o.setPositionOfLocalPoint(0.5 * k, e ? o.showingY : n, 0.5 * o.width, 0)
						} else {
							if(o == j.previousPage) {
								o.setHidden(false);
								o.setRotation(h);
								o.setPositionOfLocalPoint(m, n, o.width, 0)
							} else {
								o.setRotation(h);
								o.setPosition(-o.width - g, n)
							}
						}
					}
				}
			}, this);
			this.site.pageArrowRegionLeft.updatePositionAroundPage(e ? j : null);
			this.site.pageArrowRegionRight.updatePositionAroundPage(e ? j : null)
		},
		hideOffscreenPagesAroundPage: function(g) {
			var f = null;
			var e = false;
			this.pages.each(function(h) {
				if(e) {
					h.setHidden(f !== g)
				} else {
					if(h === g) {
						h.setHidden(false);
						if(f) {
							f.setHidden(false)
						}
						e = true
					} else {
						h.setHidden(true)
					}
				}
				f = h
			}, this)
		},
		showPagesAroundPage: function(g) {
			var f = null;
			var e = false;
			this.pages.each(function(h) {
				if(e) {
					if(f === g) {
						h.setHidden(false)
					}
				} else {
					if(h === g) {
						h.setHidden(false);
						if(f) {
							f.setHidden(false)
						}
						e = true
					}
				}
				f = h
			}, this)
		},
		hideAllPages: function() {
			this.pages.each(function(e) {
				e.setHidden(true)
			})
		},
		setZoomedPage: function(f) {
			var g = this.zoomedPage;
			if(g === f) {
				return
			}
			this.zoomedPage = f;
			if(g) {
				g.setZoomed(false);
				g.setContentShowing(false);
				g.setZPosition(0)
			}
			if(f) {
				f.setZoomed(true);
				f.setZPosition(1)
			}
			if(this.pageTransitionTimers) {
				this.pageTransitionTimers.each(clearTimeout)
			}
			this.pageTransitionTimers = [];
			var e = function(i, h, j) {
				if(BVLayer.animationsEnabled) {
					j.pageTransitionTimers.push(h.delay(i, j))
				} else {
					h.call(j)
				}
			};
			if(!g) {
				this.updatePagePositionsAroundPage(f, false);
				this.backgroundGradient.setY(-this.site.height);
				this.backgroundGradient.setHidden(false);
				e(10, (function() {
					var h = this.site.zoomDuration - 100;
					BVLayer.animate(h, function() {
						this.updatePagePositionsAroundPage(f, true);
						this.backgroundGradient.setY(this.backgroundGradientY)
					}, this);
					e(h, function() {
						this.zoomedPage.setContentShowing(true)
					}, this)
				}), this)
			} else {
				if(!f) {
					BVLayer.animate(this.site.unzoomDuration, function() {
						this.updatePagePositionsAroundPage(g, false);
						this.backgroundGradient.setY(-this.site.height)
					}, this);
					e(this.site.unzoomDuration + 200, function() {
						this.hideAllPages();
						this.backgroundGradient.setHidden(true)
					}, this)
				} else {
					this.showPagesAroundPage(f);
					e(10, (function() {
						var h = 400;
						BVLayer.animate(h, function() {
							this.updatePagePositionsAroundPage(f, true)
						}, this);
						e(h, function() {
							this.zoomedPage.setContentShowing(true)
						}, this)
					}), this);
					e(700, (function() {
						this.hideOffscreenPagesAroundPage(f)
					}), this)
				}
			}
		}
	});
	var a = this.SitePage = new Class({
		Extends: BVLayer,
		initialize: function(h, g) {
			this.parent(h);
			this.pageSet = this.getAncestorWithClass(b);
			this.site = this.getAncestorWithClass(Site);
			this.setHidden(true);
			this.setAccelerated(true);
			this.segment = g;
			g.page = this;
			this.setTouchable(true);
			this.updateSize();
			this.shadow = new d(this);
			this.background = new BVLayer(this);
			this.background.setSize(this.getSize());
			var f = g.properties.pageColor;
			if(f === undefined) {
				f = "fff"
			}
			this.background.setBackgroundColor("#" + f);
			this.previewContent = new BVLayer(this);
			if(gSiteShowPageImages) {
				this.previewContent.setContentsURL("PageImages/" + this.segment.name + ".jpg")
			}
			if(this.segment.properties.imageWidth) {
				this.previewContent.setSize(this.getSize())
			} else {
				var e = this.segment.properties.pageHeight ? Math.min(600, this.segment.properties.pageHeight) : 600;
				this.previewContent.setSize(this.width, e)
			}
			if(this.segment.captionString) {
				this.caption = new BVText(this);
				this.caption.setHidden(true);
				this.caption.setTextClass("pageCaption");
				this.caption.setTextStyle("pointerEvents", "auto");
				if(this.segment.properties.captionColor) {
					this.caption.setTextStyle("color", "#" + this.segment.properties.captionColor)
				}
				this.caption.setHTML(this.segment.captionString);
				this.caption.setY(17)
			}
			this.setContentShowing(false)
		},
		setZoomed: function(e) {
			this.isZoomed = e
		},
		preloadContent: function() {
			this.root.contentContainer.preload(this.segment.displayURL, this.segment.properties)
		},
		setContentShowing: function(g) {
			if(g === this.isContentShowing) {
				return
			}
			this.isContentShowing = g;
			if(this.caption) {
				this.caption.setHidden(!g)
			}
			var f = this.root.contentContainer;
			if(!g) {
				if(f.url === this.segment.displayURL) {
					f.setURL(null)
				}
			} else {
				var e = this.superlayer.getGlobalPointForLocalPoint(Math.round(0.5 * (this.site.width - this.width)), this.showingY);
				f.setGlobalPosition(e);
				f.setSize(this.getSize());
				f.setURL(this.segment.displayURL, this.segment.contentClickURL, this.segment.properties);
				if(this.nextPage) {
					f.setPreloadURL(this.nextPage.segment.displayURL, this.nextPage.segment.properties)
				}
				this.site.setHashForSegment(this.segment)
			}
		},
		updateSize: function() {
			var e = this.site.width - 70;
			var g = this.pageSet.getAvailableHeightForPage(this);
			var f = this.root.contentContainer.getContentSizeForProperties(this.segment.properties, e, g);
			this.setSize(f);
			this.showingY = -this.site.height + g
		},
		siteHeightDidChange: function(e) {
			this.updateSize();
			if(this.segment.properties.imageWidth) {
				this.previewContent.setSize(this.getSize())
			}
			this.shadow.update()
		}
	});
	var d = this.SitePageShadow = new Class({
		Extends: BVLayer,
		initialize: function(f, e) {
			this.parent(f);
			this.page = this.getAncestorWithClass(a);
			this.addShadows()
		},
		addShadows: function() {
			var f = ["TopLeft", "Top", "TopRight", "Left", "Right", "BottomLeft", "Bottom", "BottomRight"];
			for(var e = 0; e < f.length; e++) {
				var g = new BVLayer(this);
				this[f[e]] = g;
				g.setContentsURLAndSize("Images/PageShadow" + f[e] + ".png", 60, 60)
			}
			this.update()
		},
		update: function() {
			var h = this.TopLeft.width;
			var f = this.TopLeft.height;
			var e = 32;
			var g = 28;
			var i = 34;
			this.TopLeft.setPosition(-e, g);
			this.TopRight.setPosition(this.page.width - h + e, g);
			this.Top.setPosition(this.TopLeft.x + this.TopLeft.width, g);
			this.Top.setWidth(this.TopRight.x - this.Top.x);
			this.BottomLeft.setPosition(-e, -this.page.height + f - i);
			this.BottomRight.setPosition(this.TopRight.x, this.BottomLeft.y);
			this.Bottom.setPosition(this.Top.x, this.BottomLeft.y);
			this.Bottom.setWidth(this.Top.width);
			this.Left.setPosition(this.TopLeft.x, this.TopLeft.y - this.TopLeft.height);
			this.Left.setHeight(this.Left.y - this.BottomLeft.y);
			this.Right.setPosition(this.TopRight.x, this.Left.y);
			this.Right.setHeight(this.Left.height)
		}
	});
	var c = this.SitePageArrowRegion = new Class({
		Extends: BVLayer,
		initialize: function(f, e) {
			this.parent(f);
			this.site = this.getAncestorWithClass(Site);
			this.isRight = e;
			this.setAccelerated(true);
			this.setTouchable(true);
			this.setHoverable(true);
			this.element.setStyle("cursor", "pointer");
			this.arrow = new BVLayer(this);
			this.arrow.setAccelerated(true);
			this.arrow.setContentsURLAndSize("Images/PageArrow" + (e ? "Right" : "Left") + ".png", 45, 34);
			this.setHidden(true);
			this.arrow.setHidden(true)
		},
		updatePositionAroundPage: function(j) {
			var k = !j ? null : this.isRight ? j.nextPage : j.previousPage;
			if(!k) {
				this.setHidden(true);
				this.arrow.setHidden(true);
				return
			}
			this.setHidden(false);
			var i = 14;
			var e = 10;
			var f = k.getGlobalPointForLocalPoint(this.isRight ? 0 : k.width, 0);
			var g;
			if(this.isRight) {
				g = Math.max(0, this.site.width - Math.max(f.x, j.x + j.width));
				this.setPosition(this.site.width - g, j.y);
				this.setSize(g, this.site.height + this.y);
				this.arrow.setX(this.width - this.arrow.width - i - e)
			} else {
				g = Math.max(0, Math.min(f.x, j.x));
				this.setPosition(0, j.y);
				this.setSize(g, this.site.height + this.y);
				this.arrow.setX(e)
			}
			var h = this.getLocalPointForGlobalPoint(f);
			this.arrow.setY(Math.max(lerp(h.y, -this.height + this.arrow.height, 0.25), h.y - 0.5 * (k.height - this.arrow.height)))
		},
		mouseEntered: function() {
			this.arrow.setHidden(false)
		},
		mouseExited: function() {
			this.arrow.setHidden(true)
		},
		touchDidGoDown: function(g) {
			var f = this.site.pageSet.zoomedPage;
			if(!f) {
				return
			}
			var e = this.isRight ? f.nextPage : f.previousPage;
			if(!e) {
				return
			}
			this.site.setZoomedSegment(e.segment, false, true)
		}
	})
})();
(function() {
	var b = this.SiteContactSet = new Class({
		Extends: BVLayer,
		initialize: function(e, g) {
			this.parent(e);
			this.site = this.getAncestorWithClass(Site);
			this.topOrBottom = g;
			this.setAccelerated(true);
			this.setContentsURLAndSize("Images/Contacts" + (this.topOrBottom == "top" ? "Top" : "Bottom") + ".png", 61, 16);
			this.setX(this.site.width - this.width - 23);
			var f = [14, 24, 23];
			var c = 0;
			var d = document.id("contacts").getElement("ul").getChildren("li");
			d.each(function(i) {
				var h = new a(this);
				h.setX(c);
				h.setSize(f[0], this.height);
				h.setContactElement(i);
				c += f.shift()
			}, this)
		}
	});
	var a = this.SiteContact = new Class({
		Extends: BVLayer,
		initialize: function(c) {
			this.parent(c);
			this.contactSet = this.getAncestorWithClass(b);
			this.setTouchable(true);
			this.setHoverable(true);
			this.element.setStyle("cursor", "pointer")
		},
		setContactElement: function(c) {
			this.url = c.getElement("a").get("href");
			this.url = this.url.replace("-at-", "@");
			this.url = this.url.replace("-dot-", ".");
			var e = 140;
			var d = (this.contactSet.topOrBottom == "top") ? (-this.height - 3) : 19;
			this.caption = new BVText(this);
			this.caption.setHidden(true);
			this.caption.setTextClass("contactCaption");
			this.caption.setTextStyle("width", e);
			this.caption.setHTML(c.getElement("a").get("html"));
			this.caption.setPositionOfLocalPoint(this.contactSet.width - this.x, d, e, 0)
		},
		mouseEntered: function() {
			if(this.touches) {
				return
			}
			this.setBackgroundColor("rgba(0,0,0,0.3)");
			this.caption.setHidden(false)
		},
		mouseExited: function() {
			if(this.touches) {
				return
			}
			this.setBackgroundColor(null);
			this.caption.setHidden(true)
		},
		touchDidGoDown: function(c) {
			this.setBackgroundColor("rgba(0,0,0,0.5)")
		},
		touchDidMove: function(c) {},
		touchDidGoUp: function(c) {
			this.setBackgroundColor(null);
			this.caption.setHidden(true);
			if(this.containsGlobalPoint(c.globalPoint)) {
				window.location = this.url
			}
		}
	})
})();
(function() {
	var b = this.SiteScrollerThumb = new Class({
		Extends: BVLayer,
		initialize: function(e, d) {
			this.parent(e);
			this.scroller = this.getAncestorWithClass(c) || this.getAncestorWithClass(a);
			this.normalColor = "#fff";
			this.hoverColor = "#bbb";
			this.setAccelerated(true);
			this.setBackgroundColor(this.normalColor);
			this.touchRegion = new BVTouchRegion(this);
			this.touchRegion.setHoverable(true)
		},
		setSize: function(d, e) {
			this.parent(d, e);
			if(this.touchRegion) {
				this.touchRegion.setBoundsWithMargin(8)
			}
		},
		touchDidGoDown: function(d) {
			this.scroller.site.stopMomentumScrolling();
			this.positionAtTouchDown = this.getPosition();
			this.setBackgroundColor(this.hoverColor)
		},
		touchDidMove: function(e) {
			var f = this.positionAtTouchDown.x + e.translation.x;
			var d = this.positionAtTouchDown.y + e.translation.y;
			this.scroller.setThumbPosition(f, d)
		},
		touchDidGoUp: function(d) {
			this.setBackgroundColor(this.normalColor)
		},
		mouseEntered: function() {
			this.setBackgroundColor(this.hoverColor)
		},
		mouseExited: function() {
			if(!this.touchRegion.touches) {
				this.setBackgroundColor(this.normalColor)
			}
		}
	});
	var c = this.SiteXScroller = new Class({
		Extends: BVLayer,
		initialize: function(g, d) {
			this.parent(g);
			this.site = this.getAncestorWithClass(Site);
			this.setTouchable(true);
			this.setSize(this.site.width, 4);
			this.setBackgroundColor("rgba(0,0,0,0.3)");
			var e = 40;
			var f = 16;
			this.track = new BVLayer(this);
			this.track.setAccelerated(true);
			this.track.setSize(this.site.width - e - f, this.height);
			this.track.setX(e);
			this.thumb = new b(this.track);
			this.thumb.setSize(60, this.track.height);
			this.thumb.setCornerRadius(this.thumb.height / 2);
			this.underline = new BVLayer(this);
			this.underline.setAccelerated(true);
			this.underline.setY(-this.height);
			this.underline.setSize(this.width, 1);
			this.underline.setBackgroundColor("rgba(255,255,255,0.1)");
			this.setHidden(true)
		},
		setProgress: function(d) {
			this.thumb.setX(Math.round(d * (this.track.width - this.thumb.width)))
		},
		setThumbPosition: function(d, f) {
			if(!this.site.isZoomed) {
				return
			}
			var e = d / (this.track.width - this.thumb.width);
			this.site.setScrollX(lerp(this.site.getMaxScrollX(), this.site.getMinScrollX(), e));
			this.site.zoomSegmentAtCenter()
		}
	});
	var a = this.SiteYScroller = new Class({
		Extends: BVLayer,
		initialize: function(e, d) {
			this.parent(e);
			this.site = this.getAncestorWithClass(Site);
			this.setAccelerated(true);
			this.setSize(7, this.site.height);
			this.track = new BVLayer(this);
			this.track.setBackgroundColor("#222");
			this.track.setY(-1);
			this.track.setSize(this.width - 1, this.height - 2);
			this.thumb = new b(this.track);
			this.thumb.setSize(6, 60);
			this.thumb.setCornerRadius(this.thumb.width / 2);
			this.setX(this.site.width - this.width)
		},
		getProgress: function(d) {
			return -d / (this.track.height - this.thumb.height)
		},
		setProgress: function(d) {
			this.thumb.setY(-Math.round(d * (this.track.height - this.thumb.height)))
		},
		setThumbPosition: function(d, f) {
			if(this.site.isZoomed) {
				return
			}
			var e = this.getProgress(f);
			this.site.setScrollY(lerp(this.site.getMinScrollY(), this.site.getMaxScrollY(), e))
		},
		siteHeightDidChange: function(d) {
			this.setHeight(d);
			this.track.setHeight(this.height - 2);
			this.setProgress(this.getProgress(this.thumb.y))
		}
	})
})();