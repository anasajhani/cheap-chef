function Ht(e) {
  const t = Object.values(e).filter((r) => typeof r == "number");
  return Object.entries(e).filter(([r, o]) => t.indexOf(+r) === -1).map(([r, o]) => o);
}
function ut(e, t = "|") {
  return e.map((n) => qt(n)).join(t);
}
function Ce(e, t) {
  return typeof t == "bigint" ? t.toString() : t;
}
function Ve(e) {
  return {
    get value() {
      {
        const t = e();
        return Object.defineProperty(this, "value", { value: t }), t;
      }
    }
  };
}
function Bn(e) {
  return e == null;
}
function We(e) {
  const t = e.startsWith("^") ? 1 : 0, n = e.endsWith("$") ? e.length - 1 : e.length;
  return e.slice(t, n);
}
function Kn(e, t) {
  const n = e / t, r = Math.round(n), o = 4 * Number.EPSILON * Math.max(Math.abs(n), 1);
  return Math.abs(n - r) < o ? 0 : n - r;
}
function N(e, t, n) {
  Object.defineProperty(e, t, {
    value: n,
    writable: !0,
    enumerable: !0,
    configurable: !0
  });
}
function V(...e) {
  const t = {};
  for (const n of e) {
    const r = Object.getOwnPropertyDescriptors(n);
    Object.assign(t, r);
  }
  return Object.defineProperties({}, t);
}
function Vn(e) {
  return JSON.stringify(e);
}
function Wn(e) {
  return e.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}
const Gt = "captureStackTrace" in Error ? Error.captureStackTrace : (...e) => {
};
function ye(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
const Hn = /* @__PURE__ */ Ve(() => {
  if (C.jitless || typeof navigator < "u" && navigator?.userAgent?.includes("Cloudflare"))
    return !1;
  try {
    const e = Function;
    return new e(""), !0;
  } catch {
    return !1;
  }
});
function ee(e) {
  if (ye(e) === !1)
    return !1;
  const t = e.constructor;
  if (t === void 0 || typeof t != "function")
    return !0;
  const n = t.prototype;
  return !(ye(n) === !1 || Object.prototype.hasOwnProperty.call(n, "isPrototypeOf") === !1);
}
function Yt(e) {
  return ee(e) ? { ...e } : Array.isArray(e) ? [...e] : e instanceof Map ? new Map(e) : e instanceof Set ? new Set(e) : e;
}
const Gn = /* @__PURE__ */ new Set(["string", "number", "symbol"]);
function te(e) {
  return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function W(e, t, n) {
  const r = new e._zod.constr(t ?? e._zod.def);
  return (!t || n?.parent) && (r._zod.parent = e), r;
}
function g(e) {
  const t = e;
  if (!t)
    return {};
  if (typeof t == "string")
    return { error: () => t };
  if (t?.message !== void 0) {
    if (t?.error !== void 0)
      throw new Error("Cannot specify both `message` and `error` params");
    t.error = t.message;
  }
  return delete t.message, typeof t.error == "string" ? { ...t, error: () => t.error } : t;
}
function qt(e) {
  return typeof e == "bigint" ? e.toString() + "n" : typeof e == "string" ? `"${e}"` : `${e}`;
}
function Yn(e) {
  return Object.keys(e).filter((t) => e[t]._zod.optin !== void 0 && e[t]._zod.optout === "optional");
}
const qn = {
  safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
  int32: [-2147483648, 2147483647],
  uint32: [0, 4294967295],
  float32: [-34028234663852886e22, 34028234663852886e22],
  float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
};
function Xn(e, t) {
  const n = e._zod.def, r = n.checks;
  if (r && r.length > 0)
    throw new Error(".pick() cannot be used on object schemas containing refinements");
  const i = V(e._zod.def, {
    get shape() {
      const s = {};
      for (const a of Reflect.ownKeys(t)) {
        if (!Object.prototype.hasOwnProperty.call(n.shape, a))
          throw new Error(`Unrecognized key: "${String(a)}"`);
        t[a] && N(s, a, n.shape[a]);
      }
      return N(this, "shape", s), s;
    },
    checks: []
  });
  return W(e, i);
}
function Qn(e, t) {
  const n = e._zod.def, r = n.checks;
  if (r && r.length > 0)
    throw new Error(".omit() cannot be used on object schemas containing refinements");
  const i = V(e._zod.def, {
    get shape() {
      const s = { ...e._zod.def.shape };
      for (const a of Reflect.ownKeys(t)) {
        if (!Object.prototype.hasOwnProperty.call(n.shape, a))
          throw new Error(`Unrecognized key: "${String(a)}"`);
        t[a] && delete s[a];
      }
      return N(this, "shape", s), s;
    },
    checks: []
  });
  return W(e, i);
}
function er(e, t) {
  if (!ee(t))
    throw new Error("Invalid input to extend: expected a plain object");
  const n = e._zod.def.checks;
  if (n && n.length > 0) {
    const i = e._zod.def.shape;
    for (const s of Reflect.ownKeys(t))
      if (Object.getOwnPropertyDescriptor(i, s) !== void 0)
        throw new Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
  }
  const o = V(e._zod.def, {
    get shape() {
      const i = { ...e._zod.def.shape, ...t };
      return N(this, "shape", i), i;
    }
  });
  return W(e, o);
}
function tr(e, t) {
  if (!ee(t))
    throw new Error("Invalid input to safeExtend: expected a plain object");
  const n = V(e._zod.def, {
    get shape() {
      const r = { ...e._zod.def.shape, ...t };
      return N(this, "shape", r), r;
    }
  });
  return W(e, n);
}
function nr(e, t) {
  if (!t?._zod?.def)
    throw new Error("Invalid input to merge: expected an object schema. To merge a plain shape, use `.extend()`.");
  if (e._zod.def.checks?.length)
    throw new Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");
  const n = V(e._zod.def, {
    get shape() {
      const r = { ...e._zod.def.shape, ...t._zod.def.shape };
      return N(this, "shape", r), r;
    },
    get catchall() {
      return t._zod.def.catchall;
    },
    checks: t._zod.def.checks ?? []
  });
  return W(e, n);
}
function lt(e, t, n, r = "partial") {
  const i = t._zod.def.checks;
  if (i && i.length > 0)
    throw new Error(`.${r}() cannot be used on object schemas containing refinements`);
  const a = V(t._zod.def, {
    get shape() {
      const c = t._zod.def.shape, u = { ...c };
      if (n)
        for (const l of Reflect.ownKeys(n)) {
          if (!Object.prototype.hasOwnProperty.call(c, l))
            throw new Error(`Unrecognized key: "${String(l)}"`);
          n[l] && (u[l] = e ? new e({
            type: "optional",
            innerType: c[l]
          }) : c[l]);
        }
      else
        for (const l of Reflect.ownKeys(c))
          u[l] = e ? new e({
            type: "optional",
            innerType: c[l]
          }) : c[l];
      return N(this, "shape", u), u;
    },
    checks: []
  });
  return W(t, a);
}
function rr(e, t, n) {
  const r = V(t._zod.def, {
    get shape() {
      const o = t._zod.def.shape, i = { ...o };
      if (n)
        for (const s of Reflect.ownKeys(n)) {
          if (!Object.prototype.hasOwnProperty.call(i, s))
            throw new Error(`Unrecognized key: "${String(s)}"`);
          n[s] && (i[s] = new e({
            type: "nonoptional",
            innerType: o[s]
          }));
        }
      else
        for (const s of Reflect.ownKeys(o))
          i[s] = new e({
            type: "nonoptional",
            innerType: o[s]
          });
      return N(this, "shape", i), i;
    }
  });
  return W(t, r);
}
function q(e, t = 0) {
  if (e.aborted === !0)
    return !0;
  for (let n = t; n < e.issues.length; n++)
    if (e.issues[n]?.continue !== !0)
      return !0;
  return !1;
}
function or(e, t = 0) {
  if (e.aborted === !0)
    return !0;
  for (let n = t; n < e.issues.length; n++)
    if (e.issues[n]?.continue === !1)
      return !0;
  return !1;
}
function X(e, t) {
  return t.map((n) => {
    var r;
    return (r = n).path ?? (r.path = []), n.path.unshift(e), n;
  });
}
function ie(e) {
  return typeof e == "string" ? e : e?.message;
}
function ft(e, t, n) {
  var r;
  for (let o = t; o < e.length; o++)
    (r = e[o]).schema ?? (r.schema = n);
}
function B(e, t, n) {
  var r;
  const o = e.inst?._zod?.traits;
  o?.has("$ZodType") && (o.has("$ZodCheck") ? (r = e).schema ?? (r.schema = e.inst) : e.schema = e.inst);
  const i = e.schema !== e.inst ? e.schema?._zod.def?.error : void 0, s = e.message ? e.message : ie(e.inst?._zod.def?.error?.(e)) ?? ie(i?.(e)) ?? ie(t?.error?.(e)) ?? ie(n.customError?.(e)) ?? ie(n.localeError?.(e)) ?? "Invalid input", { inst: a, schema: c, continue: u, input: l, ...d } = e;
  return d.path ?? (d.path = []), d.message = s, t?.reportInput && (d.input = l), d;
}
const ir = /[\uD800-\uDBFF]/;
function He(e) {
  const t = e.length;
  if (!ir.test(e))
    return t;
  let n = t;
  for (let r = 0; r < t - 1; r++)
    (e.charCodeAt(r) & 64512) === 55296 && (e.charCodeAt(r + 1) & 64512) === 56320 && (n--, r++);
  return n;
}
function Ge(e) {
  return Array.isArray(e) ? "array" : typeof e == "string" ? "string" : "unknown";
}
function sr(e) {
  const t = typeof e;
  switch (t) {
    case "number":
      return Number.isNaN(e) ? "nan" : "number";
    case "object": {
      if (e === null)
        return "null";
      if (Array.isArray(e))
        return "array";
      const n = e;
      if (n && Object.getPrototypeOf(n) !== Object.prototype && "constructor" in n && n.constructor)
        return n.constructor.name;
    }
  }
  return t;
}
function ce(...e) {
  const [t, n, r] = e;
  return typeof t == "string" ? {
    message: t,
    code: "custom",
    input: n,
    inst: r
  } : { ...t };
}
function ar(e, t) {
  for (const n in t) {
    const r = Object.getOwnPropertyDescriptor(t, n);
    r.get ? Object.defineProperty(e, n, { ...r, enumerable: !1 }) : cr(e, n, r.value);
  }
}
function ne(e, t, n, r = !0) {
  return Object.defineProperty(e, t, { configurable: !0, writable: !0, enumerable: r, value: n }), n;
}
function Xt(e, t, n) {
  return ne(e, t, n, !1);
}
function cr(e, t, n) {
  Object.defineProperty(e, t, {
    configurable: !0,
    get() {
      return this == null ? n : ne(this, t, n.bind(this));
    },
    set(r) {
      ne(this, t, r);
    }
  });
}
function ur(e, t) {
  const n = Object.getPrototypeOf(e);
  return t in n ? void 0 : n;
}
let Pe, L = !1;
const lr = {
  configurable: !0,
  get() {
    L = !0;
  }
};
function w(e, t, n) {
  const r = Object.getPrototypeOf(e._zod);
  if (t in r && Pe !== e._zod) {
    Pe = void 0;
    return;
  }
  Pe = e._zod, Object.defineProperty(r, t, {
    configurable: !0,
    get() {
      Object.defineProperty(this, t, lr);
      const o = L;
      L = !1;
      try {
        const i = n(this);
        return L ? delete this[t] : Object.defineProperty(this, t, { configurable: !0, writable: !0, value: i }), L = L || o, i;
      } catch (i) {
        throw delete this[t], L = L || o, i;
      }
    },
    set(o) {
      Object.defineProperty(this, t, { configurable: !0, writable: !0, value: o });
    }
  });
}
function fr(e, t, n, r) {
  const o = ur(e, t);
  o && Object.defineProperty(o, t, {
    configurable: !0,
    get() {
      const i = { configurable: !0, writable: !0, enumerable: r, value: void 0 };
      return Object.defineProperty(this, t, i), i.value = n(this), Object.defineProperty(this, t, i), i.value;
    },
    set(i) {
      Object.defineProperty(this, t, { configurable: !0, writable: !0, enumerable: r, value: i });
    }
  });
}
const dr = "~constantCatch";
function pr(e) {
  const t = () => e;
  return t[dr] = !0, t;
}
var dt;
const Ne = { value: void 0, enumerable: !1 };
let pt = "captureStackTrace" in Error ? Error : null;
function hr(e) {
  const t = pt;
  if (t) {
    const n = t.stackTraceLimit;
    if (typeof n == "number") {
      try {
        t.stackTraceLimit = 0;
      } catch {
        return pt = null, new e();
      }
      try {
        return new e();
      } finally {
        t.stackTraceLimit = n;
      }
    }
  }
  return new e();
}
function f(e, t, n, r) {
  const o = {};
  function i(p) {
    this.def = p, this.constr = d, this.traits = /* @__PURE__ */ new Set();
  }
  i.prototype = o;
  const s = n, a = s && /* @__PURE__ */ new WeakSet();
  function c(p, h) {
    if (!p._zod) {
      Ne.value = new i(h);
      try {
        Object.defineProperty(p, "_zod", Ne);
      } finally {
        Ne.value = void 0;
      }
    }
    if (p._zod.traits.has(e))
      return;
    if (p._zod.traits.add(e), t(p, h), a) {
      const _ = Object.getPrototypeOf(p), y = p._zod.constr.prototype;
      let T = _;
      for (; T && T !== y; )
        T = Object.getPrototypeOf(T);
      const j = T ?? _;
      a.has(j) || (a.add(j), ar(j, s));
    }
    const m = d.prototype;
    for (const _ in m)
      Object.prototype.hasOwnProperty.call(m, _) && (_ in p || (p[_] = m[_].bind(p)));
  }
  const u = r?.Parent ?? Object;
  class l extends u {
  }
  Object.defineProperty(l, "name", { value: e });
  function d(p) {
    const h = r?.Parent ? hr(l) : this;
    c(h, p);
    const m = h._zod.deferred;
    if (m) {
      for (const y of m)
        y();
      h._zod.deferred = void 0;
    }
    const _ = globalThis.__zod_globalConfig?.postProcessor;
    return _ && _(h), h;
  }
  return Object.defineProperty(d, "init", { value: c }), Object.defineProperty(d, Symbol.hasInstance, {
    value: (p) => r?.Parent && p instanceof r.Parent ? !0 : p?._zod?.traits?.has(e)
  }), Object.defineProperty(d, "name", { value: e }), d;
}
class Q extends Error {
  constructor() {
    super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
  }
}
class Qt extends Error {
  constructor(t) {
    super(`Encountered unidirectional transform during encode: ${t}`), this.name = "ZodEncodeError";
  }
}
(dt = globalThis).__zod_globalConfig ?? (dt.__zod_globalConfig = {});
const C = globalThis.__zod_globalConfig;
function F(e) {
  return e && Object.assign(C, e), C;
}
function mr() {
  const e = this._zod;
  return e.message ?? (e.message = JSON.stringify(e.def, Ce, 2)), e.message;
}
function gr(e) {
  this._zod.message = e;
}
const _r = {
  get: mr,
  set: gr,
  enumerable: !0,
  configurable: !0
}, Ae = { value: void 0, enumerable: !1 }, Ze = { value: void 0, enumerable: !1 }, ht = /* @__PURE__ */ new WeakSet([Object.prototype, Error.prototype]), en = (e, t) => {
  e.name = "$ZodError", Ae.value = e._zod, Object.defineProperty(e, "_zod", Ae), Ze.value = t, Object.defineProperty(e, "issues", Ze), Ae.value = void 0, Ze.value = void 0, Object.defineProperty(e, "message", _r);
  const n = Object.getPrototypeOf(e);
  ht.has(n) || (ht.add(n), Object.defineProperty(n, "toString", {
    configurable: !0,
    enumerable: !1,
    get() {
      const r = () => this.message;
      return Object.defineProperty(this, "toString", { value: r, configurable: !0, writable: !0 }), r;
    },
    set(r) {
      Object.defineProperty(this, "toString", { value: r, configurable: !0, writable: !0 });
    }
  }));
}, tn = f("$ZodError", en), nn = f("$ZodError", en, void 0, {
  Parent: Error
});
function yr(e, t, n) {
  return Object.prototype.hasOwnProperty.call(e, t) || (t === "__proto__" ? Object.defineProperty(e, t, { value: n(), writable: !0, enumerable: !0, configurable: !0 }) : e[t] = n()), e[t];
}
function br(e, t = (n) => n.message) {
  const n = {}, r = [];
  for (const o of e.issues)
    o.path.length > 0 ? yr(n, o.path[0], () => []).push(t(o)) : r.push(t(o));
  return { formErrors: r, fieldErrors: n };
}
function wr(e, t = (n) => n.message) {
  const n = { _errors: [] }, r = (o, i = []) => {
    for (const s of o.issues)
      if (s.code === "invalid_union" && s.errors.length)
        s.errors.map((a) => r({ issues: a }, [...i, ...s.path]));
      else if (s.code === "invalid_key")
        r({ issues: s.issues }, [...i, ...s.path]);
      else if (s.code === "invalid_element")
        r({ issues: s.issues }, [...i, ...s.path]);
      else {
        const a = [...i, ...s.path];
        if (a.length === 0)
          n._errors.push(t(s));
        else {
          let c = n, u = 0;
          for (; u < a.length; ) {
            const l = a[u], d = u === a.length - 1;
            if (l === "_errors") {
              d && c._errors.push(t(s)), u++;
              continue;
            }
            Object.prototype.hasOwnProperty.call(c, l) || Object.defineProperty(c, l, {
              value: { _errors: [] },
              enumerable: !0,
              writable: !0,
              configurable: !0
            });
            const p = c[l];
            d && p._errors.push(t(s)), c = p, u++;
          }
        }
      }
  };
  return r(e), n;
}
function Se(e, t) {
  return { callee: t?.callee ?? e, Err: t?.Err };
}
const Ye = (e) => {
  const t = (n, r, o, i) => {
    const s = o ? { ...o, async: !1 } : { async: !1 }, a = n._zod.run({ value: r, issues: [] }, s);
    if (a instanceof Promise)
      throw new Q();
    if (a.issues.length) {
      const c = new (i?.Err ?? e)(a.issues.map((u) => B(u, s, F())));
      throw Gt(c, i?.callee ?? t), c;
    }
    return a.value;
  };
  return t;
}, qe = (e) => {
  const t = async (n, r, o, i) => {
    const s = o ? { ...o, async: !0 } : { async: !0 };
    let a = n._zod.run({ value: r, issues: [] }, s);
    if (a instanceof Promise && (a = await a), a.issues.length) {
      const c = new (i?.Err ?? e)(a.issues.map((u) => B(u, s, F())));
      throw Gt(c, i?.callee ?? t), c;
    }
    return a.value;
  };
  return t;
}, Oe = (e) => (t, n, r) => {
  const o = r ? { ...r, async: !1 } : { async: !1 }, i = t._zod.run({ value: n, issues: [] }, o);
  if (i instanceof Promise)
    throw new Q();
  return i.issues.length ? {
    success: !1,
    error: new (e ?? tn)(i.issues.map((s) => B(s, o, F())))
  } : { success: !0, data: i.value };
}, vr = /* @__PURE__ */ Oe(nn), Ee = (e) => async (t, n, r) => {
  const o = r ? { ...r, async: !0 } : { async: !0 };
  let i = t._zod.run({ value: n, issues: [] }, o);
  return i instanceof Promise && (i = await i), i.issues.length ? {
    success: !1,
    error: new e(i.issues.map((s) => B(s, o, F())))
  } : { success: !0, data: i.value };
}, kr = /* @__PURE__ */ Ee(nn), zr = (e) => {
  const t = Ye(e), n = (r, o, i, s) => {
    const a = i ? { ...i, direction: "backward" } : { direction: "backward" };
    return t(r, o, a, Se(n, s));
  };
  return n;
}, Sr = (e) => {
  const t = Ye(e), n = (r, o, i, s) => t(r, o, i, Se(n, s));
  return n;
}, Or = (e) => {
  const t = qe(e), n = async (r, o, i, s) => {
    const a = i ? { ...i, direction: "backward" } : { direction: "backward" };
    return await t(r, o, a, Se(n, s));
  };
  return n;
}, Er = (e) => {
  const t = qe(e), n = async (r, o, i, s) => await t(r, o, i, Se(n, s));
  return n;
}, $r = (e) => (t, n, r) => {
  const o = r ? { ...r, direction: "backward" } : { direction: "backward" };
  return Oe(e)(t, n, o);
}, Tr = (e) => (t, n, r) => Oe(e)(t, n, r), Ir = (e) => async (t, n, r) => {
  const o = r ? { ...r, direction: "backward" } : { direction: "backward" };
  return Ee(e)(t, n, o);
}, Pr = (e) => async (t, n, r) => Ee(e)(t, n, r), Nr = /^[cC][0-9a-z]{6,}$/, Ar = /^[0-9a-z]+$/, Zr = /^[0-7][0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{25}$/, Dr = /^[0-9a-vA-V]{20}$/, Rr = /^[A-Za-z0-9]{27}$/, jr = /^[a-zA-Z0-9_-]{21}$/;
function Cr(e) {
  return new RegExp(`^[a-zA-Z0-9_-]{${e}}$`);
}
const xr = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/, Ur = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/, mt = (e) => e ? new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${e}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`) : /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/, Mr = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/, Fr = "^[\\p{Extended_Pictographic}\\p{Emoji_Component}]+$";
function Lr() {
  return new RegExp(Fr, "u");
}
const Jr = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, Br = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/, Kr = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/, Vr = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, Wr = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/, rn = /^[A-Za-z0-9_-]*$/, Hr = /^https?$/, Gr = /^\+[1-9]\d{6,14}$/, on = "(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))";
function Yr(e) {
  return new RegExp(`^${e}$`);
}
const qr = /* @__PURE__ */ Yr(on);
function xe(e) {
  const t = "(?:[01]\\d|2[0-3]):[0-5]\\d";
  return typeof e.precision == "number" ? e.precision === -1 ? `${t}` : e.precision === 0 ? `${t}:[0-5]\\d` : `${t}:[0-5]\\d\\.\\d{${e.precision}}` : e.seconds ? `${t}:[0-5]\\d(?:\\.\\d+)?` : `${t}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function Xr(e) {
  return new RegExp(`^${xe(e)}$`);
}
function Qr(e) {
  const t = ["Z"];
  e.offset && t.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)");
  const n = `${xe({ precision: e.precision, seconds: !0 })}(?:${t.join("|")})`, r = e.local ? `${n}|${xe({ precision: e.precision })}` : n;
  return new RegExp(`^${on}T(?:${r})$`);
}
const eo = (e) => {
  const t = e ? `[\\s\\S]{${e?.minimum ?? 0},${e?.maximum ?? ""}}` : "[\\s\\S]*";
  return new RegExp(`^${t}$`);
}, sn = /^-?\d+$/, Xe = /^-?\d+(?:\.\d+)?$/, to = /^(?:true|false)$/i, no = /^[^A-Z]*$/, ro = /^[^a-z]*$/, A = /* @__PURE__ */ f("$ZodCheck", (e, t) => {
  var n;
  e._zod ?? (e._zod = {}), e._zod.def = t, (n = e._zod).onattach ?? (n.onattach = []);
}), Qe = (e) => {
  const t = e.value;
  return !Bn(t) && t.length !== void 0;
}, be = {
  number: "number",
  bigint: "bigint",
  object: "date"
}, an = /* @__PURE__ */ f("$ZodCheckLessThan", (e, t) => {
  A.init(e, t);
  const n = be[typeof t.value];
  e._zod.onattach.push((r) => {
    const o = r._zod.bag, i = (t.inclusive ? o.maximum : o.exclusiveMaximum) ?? Number.POSITIVE_INFINITY;
    t.value < i && (t.inclusive ? o.maximum = t.value : o.exclusiveMaximum = t.value);
  }), e._zod.check = (r) => {
    (t.inclusive ? r.value <= t.value : r.value < t.value) || r.issues.push({
      origin: be[typeof r.value] ?? n,
      code: "too_big",
      maximum: typeof t.value == "object" ? t.value.getTime() : t.value,
      input: r.value,
      inclusive: t.inclusive,
      inst: e,
      continue: !t.abort
    });
  };
}), cn = /* @__PURE__ */ f("$ZodCheckGreaterThan", (e, t) => {
  A.init(e, t);
  const n = be[typeof t.value];
  e._zod.onattach.push((r) => {
    const o = r._zod.bag, i = (t.inclusive ? o.minimum : o.exclusiveMinimum) ?? Number.NEGATIVE_INFINITY;
    t.value > i && (t.inclusive ? o.minimum = t.value : o.exclusiveMinimum = t.value);
  }), e._zod.check = (r) => {
    (t.inclusive ? r.value >= t.value : r.value > t.value) || r.issues.push({
      origin: be[typeof r.value] ?? n,
      code: "too_small",
      minimum: typeof t.value == "object" ? t.value.getTime() : t.value,
      input: r.value,
      inclusive: t.inclusive,
      inst: e,
      continue: !t.abort
    });
  };
}), oo = /* @__PURE__ */ f("$ZodCheckMultipleOf", (e, t) => {
  A.init(e, t), e._zod.onattach.push((n) => {
    var r;
    (r = n._zod.bag).multipleOf ?? (r.multipleOf = t.value);
  }), e._zod.check = (n) => {
    if (typeof n.value != typeof t.value)
      throw new Error("Cannot mix number and bigint in multiple_of check.");
    (typeof n.value == "bigint" ? (
      // `value % 0n` throws, and nothing is a multiple of zero — the number branch already fails this way via NaN
      t.value !== BigInt(0) && n.value % t.value === BigInt(0)
    ) : Kn(n.value, t.value) === 0) || n.issues.push({
      origin: typeof n.value,
      code: "not_multiple_of",
      divisor: t.value,
      input: n.value,
      inst: e,
      continue: !t.abort
    });
  };
}), io = /* @__PURE__ */ f("$ZodCheckNumberFormat", (e, t) => {
  A.init(e, t), t.format = t.format || "float64";
  const n = t.format?.includes("int"), r = n ? "int" : "number", [o, i] = qn[t.format];
  e._zod.onattach.push((s) => {
    const a = s._zod.bag;
    a.format = t.format, a.minimum = o, a.maximum = i, n && (a.pattern = sn);
  }), e._zod.check = (s) => {
    const a = s.value;
    if (n) {
      if (!Number.isInteger(a)) {
        s.issues.push({
          expected: r,
          format: t.format,
          code: "invalid_type",
          continue: !1,
          input: a,
          inst: e
        });
        return;
      }
      if (!Number.isSafeInteger(a)) {
        a > 0 ? s.issues.push({
          input: a,
          code: "too_big",
          maximum: Number.MAX_SAFE_INTEGER,
          note: "Integers must be within the safe integer range.",
          inst: e,
          origin: r,
          inclusive: !0,
          continue: !t.abort
        }) : s.issues.push({
          input: a,
          code: "too_small",
          minimum: Number.MIN_SAFE_INTEGER,
          note: "Integers must be within the safe integer range.",
          inst: e,
          origin: r,
          inclusive: !0,
          continue: !t.abort
        });
        return;
      }
    }
    a < o && s.issues.push({
      origin: "number",
      input: a,
      code: "too_small",
      minimum: o,
      inclusive: !0,
      inst: e,
      continue: !t.abort
    }), a > i && s.issues.push({
      origin: "number",
      input: a,
      code: "too_big",
      maximum: i,
      inclusive: !0,
      inst: e,
      continue: !t.abort
    });
  };
}), so = /* @__PURE__ */ f("$ZodCheckMaxLength", (e, t) => {
  var n;
  A.init(e, t), (n = e._zod.def).when ?? (n.when = Qe), e._zod.onattach.push((r) => {
    const o = r._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
    t.maximum < o && (r._zod.bag.maximum = t.maximum);
  }), e._zod.check = (r) => {
    const o = r.value, i = o.length;
    if ((typeof o == "string" && i > t.maximum ? He(o) : i) <= t.maximum)
      return;
    const a = Ge(o);
    r.issues.push({
      origin: a,
      code: "too_big",
      maximum: t.maximum,
      inclusive: !0,
      input: o,
      inst: e,
      continue: !t.abort
    });
  };
}), ao = /* @__PURE__ */ f("$ZodCheckMinLength", (e, t) => {
  var n;
  A.init(e, t), (n = e._zod.def).when ?? (n.when = Qe), e._zod.onattach.push((r) => {
    const o = r._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
    t.minimum > o && (r._zod.bag.minimum = t.minimum);
  }), e._zod.check = (r) => {
    const o = r.value, i = o.length;
    if ((typeof o == "string" && i >= t.minimum && i < t.minimum * 2 ? He(o) : i) >= t.minimum)
      return;
    const a = Ge(o);
    r.issues.push({
      origin: a,
      code: "too_small",
      minimum: t.minimum,
      inclusive: !0,
      input: o,
      inst: e,
      continue: !t.abort
    });
  };
}), co = /* @__PURE__ */ f("$ZodCheckLengthEquals", (e, t) => {
  var n;
  A.init(e, t), (n = e._zod.def).when ?? (n.when = Qe), e._zod.onattach.push((r) => {
    const o = r._zod.bag;
    o.minimum = t.length, o.maximum = t.length, o.length = t.length;
  }), e._zod.check = (r) => {
    const o = r.value, i = o.length, s = typeof o == "string" && i >= t.length && i <= t.length * 2 ? He(o) : i;
    if (s === t.length)
      return;
    const a = Ge(o), c = s > t.length;
    r.issues.push({
      origin: a,
      ...c ? { code: "too_big", maximum: t.length } : { code: "too_small", minimum: t.length },
      inclusive: !0,
      exact: !0,
      input: r.value,
      inst: e,
      continue: !t.abort
    });
  };
}), $e = /* @__PURE__ */ f("$ZodCheckStringFormat", (e, t) => {
  var n, r;
  A.init(e, t), e._zod.onattach.push((o) => {
    const i = o._zod.bag;
    i.format = t.format, t.pattern && (i.patterns ?? (i.patterns = /* @__PURE__ */ new Set()), i.patterns.add(t.pattern));
  }), t.pattern ? (n = e._zod).check ?? (n.check = (o) => {
    t.pattern.lastIndex = 0, !t.pattern.test(o.value) && o.issues.push({
      origin: "string",
      code: "invalid_format",
      format: t.format,
      input: o.value,
      ...t.pattern ? { pattern: t.pattern.toString() } : {},
      inst: e,
      continue: !t.abort
    });
  }) : (r = e._zod).check ?? (r.check = () => {
  });
}), uo = /* @__PURE__ */ f("$ZodCheckRegex", (e, t) => {
  $e.init(e, t), e._zod.check = (n) => {
    t.pattern.lastIndex = 0, !t.pattern.test(n.value) && n.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "regex",
      input: n.value,
      pattern: t.pattern.toString(),
      inst: e,
      continue: !t.abort
    });
  };
}), lo = /* @__PURE__ */ f("$ZodCheckLowerCase", (e, t) => {
  t.pattern ?? (t.pattern = no), $e.init(e, t);
}), fo = /* @__PURE__ */ f("$ZodCheckUpperCase", (e, t) => {
  t.pattern ?? (t.pattern = ro), $e.init(e, t);
}), po = /* @__PURE__ */ f("$ZodCheckIncludes", (e, t) => {
  A.init(e, t);
  const n = te(t.includes), r = new RegExp(typeof t.position == "number" ? `^.{${t.position},}${n}` : n);
  t.pattern = r, e._zod.onattach.push((o) => {
    const i = o._zod.bag;
    i.patterns ?? (i.patterns = /* @__PURE__ */ new Set()), i.patterns.add(r);
  }), e._zod.check = (o) => {
    o.value.includes(t.includes, t.position) || o.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "includes",
      includes: t.includes,
      input: o.value,
      inst: e,
      continue: !t.abort
    });
  };
}), ho = /* @__PURE__ */ f("$ZodCheckStartsWith", (e, t) => {
  A.init(e, t);
  const n = new RegExp(`^${te(t.prefix)}.*`);
  t.pattern ?? (t.pattern = n), e._zod.onattach.push((r) => {
    const o = r._zod.bag;
    o.patterns ?? (o.patterns = /* @__PURE__ */ new Set()), o.patterns.add(n);
  }), e._zod.check = (r) => {
    r.value.startsWith(t.prefix) || r.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "starts_with",
      prefix: t.prefix,
      input: r.value,
      inst: e,
      continue: !t.abort
    });
  };
}), mo = /* @__PURE__ */ f("$ZodCheckEndsWith", (e, t) => {
  A.init(e, t);
  const n = new RegExp(`.*${te(t.suffix)}$`);
  t.pattern ?? (t.pattern = n), e._zod.onattach.push((r) => {
    const o = r._zod.bag;
    o.patterns ?? (o.patterns = /* @__PURE__ */ new Set()), o.patterns.add(n);
  }), e._zod.check = (r) => {
    r.value.endsWith(t.suffix) || r.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "ends_with",
      suffix: t.suffix,
      input: r.value,
      inst: e,
      continue: !t.abort
    });
  };
}), go = /* @__PURE__ */ f("$ZodCheckOverwrite", (e, t) => {
  A.init(e, t), e._zod.check = (n) => {
    n.value = t.tx(n.value);
  };
});
class _o {
  constructor(t = [], n = {}) {
    this.content = [], this.indent = 0, this.args = t, this.closed = n;
  }
  indented(t) {
    this.indent += 1, t(this), this.indent -= 1;
  }
  write(t) {
    if (typeof t == "function") {
      t(this, { execution: "sync" }), t(this, { execution: "async" });
      return;
    }
    const r = t.split(`
`).filter((s) => s), o = Math.min(...r.map((s) => s.length - s.trimStart().length)), i = r.map((s) => s.slice(o)).map((s) => " ".repeat(this.indent * 2) + s);
    for (const s of i)
      this.content.push(s);
  }
  compile() {
    const t = Function, n = this?.content ?? [""];
    return new t(...Object.keys(this.closed), `return function (${this.args.join(", ")}) {
${n.join(`
`)}
};`)(...Object.values(this.closed));
  }
}
const yo = {
  major: 4,
  minor: 5,
  patch: 4
}, z = /* @__PURE__ */ f("$ZodType", (e, t) => {
  var n;
  e ?? (e = {}), e._zod.def = t, e._zod.bag = e._zod.bag || {}, e._zod.version = yo;
  const r = e._zod.def.checks, o = e._zod.traits.has("$ZodCheck") ? [e, ...r ?? []] : r?.length ? [...r] : [];
  for (const i of o)
    for (const s of i._zod.onattach)
      s(e);
  if (o.length === 0)
    (n = e._zod).deferred ?? (n.deferred = []), e._zod.deferred?.push(() => {
      e._zod.run = e._zod.parse;
    });
  else {
    const i = (a, c, u) => {
      if (a.memo)
        return a;
      let l = q(a), d;
      for (const p of c) {
        if (p._zod.def.when) {
          if (or(a) || !p._zod.def.when(a))
            continue;
        } else if (l)
          continue;
        const h = a.issues.length, m = p._zod.check(a);
        if (m instanceof Promise && u?.async === !1)
          throw new Q();
        if (d || m instanceof Promise)
          d = (d ?? Promise.resolve()).then(async () => {
            await m, a.issues.length !== h && (ft(a.issues, h, e), l || (l = q(a, h)));
          });
        else {
          if (a.issues.length === h)
            continue;
          ft(a.issues, h, e), l || (l = q(a, h));
        }
      }
      return d ? d.then(() => a) : a;
    }, s = (a, c, u) => {
      if (q(a))
        return a.aborted = !0, a;
      const l = i(c, o, u);
      if (l instanceof Promise) {
        if (u.async === !1)
          throw new Q();
        return l.then((d) => e._zod.parse(d, u));
      }
      return e._zod.parse(l, u);
    };
    e._zod.run = (a, c) => {
      if (c.skipChecks)
        return e._zod.parse(a, c);
      if (c.direction === "backward") {
        const l = e._zod.parse({ value: a.value, issues: [] }, { ...c, skipChecks: !0 });
        return l instanceof Promise ? l.then((d) => s(d, a, c)) : s(l, a, c);
      }
      const u = e._zod.parse(a, c);
      if (u instanceof Promise) {
        if (c.async === !1)
          throw new Q();
        return u.then((l) => i(l, o, c));
      }
      return i(u, o, c);
    };
  }
}, {
  // Wrappers extend this by installing a richer factory over it; reading it eagerly would defeat the laziness.
  get "~standard"() {
    return Xt(this, "~standard", un(this));
  },
  set "~standard"(e) {
    ne(this, "~standard", e);
  }
}), gt = (e) => e.success ? { value: e.data } : { issues: e.error?.issues };
function un(e) {
  return {
    validate: (t) => {
      try {
        return gt(vr(e, t));
      } catch {
        return kr(e, t).then(gt);
      }
    },
    vendor: "zod",
    version: 1
  };
}
const et = /* @__PURE__ */ f("$ZodString", (e, t) => {
  z.init(e, t), e._zod.pattern = [...e?._zod.bag?.patterns ?? []].pop() ?? eo(e._zod.bag), e._zod.parse = (n, r) => {
    if (t.coerce)
      try {
        n.value = String(n.value);
      } catch {
      }
    return typeof n.value == "string" || n.issues.push({
      expected: "string",
      code: "invalid_type",
      input: n.value,
      inst: e
    }), n;
  };
}), k = /* @__PURE__ */ f("$ZodStringFormat", (e, t) => {
  $e.init(e, t), et.init(e, t);
}), bo = /* @__PURE__ */ f("$ZodGUID", (e, t) => {
  t.pattern ?? (t.pattern = Ur), k.init(e, t);
}), wo = /* @__PURE__ */ f("$ZodUUID", (e, t) => {
  if (t.version) {
    const r = {
      v1: 1,
      v2: 2,
      v3: 3,
      v4: 4,
      v5: 5,
      v6: 6,
      v7: 7,
      v8: 8
    }[t.version];
    if (r === void 0)
      throw new Error(`Invalid UUID version: "${t.version}"`);
    t.pattern ?? (t.pattern = mt(r));
  } else
    t.pattern ?? (t.pattern = mt());
  k.init(e, t);
}), vo = /* @__PURE__ */ f("$ZodEmail", (e, t) => {
  t.pattern ?? (t.pattern = Mr), k.init(e, t);
}), ln = 1, fn = 2;
function ko(e, t) {
  if (!t.normalize && t.protocol?.source === Hr.source && !/^https?:\/\//i.test(e))
    return ln;
  try {
    return new URL(e);
  } catch {
    return fn;
  }
}
const zo = /[\t\n\r]/g;
function So(e) {
  return e.replace(zo, "");
}
function Oo(e, t) {
  return t.lastIndex = 0, t.test(e.hostname);
}
function Eo(e, t) {
  return t.lastIndex = 0, t.test(e.protocol.endsWith(":") ? e.protocol.slice(0, -1) : e.protocol);
}
const $o = /* @__PURE__ */ f("$ZodURL", (e, t) => {
  k.init(e, t), e._zod.check = (n) => {
    try {
      const r = n.value.trim(), o = ko(r, t);
      if (o === ln) {
        n.issues.push({
          code: "invalid_format",
          format: "url",
          note: "Invalid URL format",
          input: n.value,
          inst: e,
          continue: !t.abort
        });
        return;
      }
      if (o === fn) {
        n.issues.push({
          code: "invalid_format",
          format: "url",
          input: n.value,
          inst: e,
          continue: !t.abort
        });
        return;
      }
      t.hostname && !Oo(o, t.hostname) && n.issues.push({
        code: "invalid_format",
        format: "url",
        note: "Invalid hostname",
        pattern: t.hostname.source,
        input: n.value,
        inst: e,
        continue: !t.abort
      }), t.protocol && !Eo(o, t.protocol) && n.issues.push({
        code: "invalid_format",
        format: "url",
        note: "Invalid protocol",
        pattern: t.protocol.source,
        input: n.value,
        inst: e,
        continue: !t.abort
      }), n.value = t.normalize ? o.href : So(r);
      return;
    } catch {
      n.issues.push({
        code: "invalid_format",
        format: "url",
        input: n.value,
        inst: e,
        continue: !t.abort
      });
    }
  };
}), To = /* @__PURE__ */ f("$ZodEmoji", (e, t) => {
  t.pattern ?? (t.pattern = Lr()), k.init(e, t);
}), Io = /* @__PURE__ */ f("$ZodNanoID", (e, t) => {
  if (t.length !== void 0 && (!Number.isInteger(t.length) || t.length < 1))
    throw new Error(`Invalid nanoid length: ${t.length}`);
  t.pattern ?? (t.pattern = t.length === void 0 ? jr : Cr(t.length)), k.init(e, t);
}), Po = /* @__PURE__ */ f("$ZodCUID", (e, t) => {
  t.pattern ?? (t.pattern = Nr), k.init(e, t);
}), No = /* @__PURE__ */ f("$ZodCUID2", (e, t) => {
  t.pattern ?? (t.pattern = Ar), k.init(e, t);
}), Ao = /* @__PURE__ */ f("$ZodULID", (e, t) => {
  t.pattern ?? (t.pattern = Zr), k.init(e, t);
}), Zo = /* @__PURE__ */ f("$ZodXID", (e, t) => {
  t.pattern ?? (t.pattern = Dr), k.init(e, t);
}), Do = /* @__PURE__ */ f("$ZodKSUID", (e, t) => {
  t.pattern ?? (t.pattern = Rr), k.init(e, t);
}), Ro = /* @__PURE__ */ f("$ZodISODateTime", (e, t) => {
  t.pattern ?? (t.pattern = Qr(t)), k.init(e, t), (t.local || t.precision === -1) && (e._zod.bag.laxFormat = !0, e._zod.onattach.push((n) => {
    n._zod.bag.laxFormat = !0;
  }));
}), jo = /* @__PURE__ */ f("$ZodISODate", (e, t) => {
  t.pattern ?? (t.pattern = qr), k.init(e, t);
}), Co = /* @__PURE__ */ f("$ZodISOTime", (e, t) => {
  t.pattern ?? (t.pattern = Xr(t)), k.init(e, t);
}), xo = /* @__PURE__ */ f("$ZodISODuration", (e, t) => {
  t.pattern ?? (t.pattern = xr), k.init(e, t);
}), Uo = /* @__PURE__ */ f("$ZodIPv4", (e, t) => {
  t.pattern ?? (t.pattern = Jr), k.init(e, t), e._zod.bag.format = "ipv4";
}), Mo = /^[0-9a-fA-F:.]+$/;
function dn(e) {
  if (!Mo.test(e))
    return !1;
  try {
    return new URL(`http://[${e}]`), !0;
  } catch {
    return !1;
  }
}
const Fo = /* @__PURE__ */ f("$ZodIPv6", (e, t) => {
  t.pattern ?? (t.pattern = Br), k.init(e, t), e._zod.bag.format = "ipv6", e._zod.check = (n) => {
    dn(n.value) || n.issues.push({
      code: "invalid_format",
      format: "ipv6",
      input: n.value,
      inst: e,
      continue: !t.abort
    });
  };
}), Lo = /* @__PURE__ */ f("$ZodCIDRv4", (e, t) => {
  t.pattern ?? (t.pattern = Kr), k.init(e, t);
});
function Jo(e) {
  const t = e.split("/");
  if (t.length !== 2)
    return !1;
  const [n, r] = t;
  if (!r)
    return !1;
  const o = Number(r);
  return `${o}` !== r || o < 0 || o > 128 ? !1 : dn(n);
}
const Bo = /* @__PURE__ */ f("$ZodCIDRv6", (e, t) => {
  t.pattern ?? (t.pattern = Vr), k.init(e, t), e._zod.check = (n) => {
    Jo(n.value) || n.issues.push({
      code: "invalid_format",
      format: "cidrv6",
      input: n.value,
      inst: e,
      continue: !t.abort
    });
  };
});
function pn(e) {
  if (e === "")
    return !0;
  if (/\s/.test(e) || e.length % 4 !== 0)
    return !1;
  try {
    return atob(e), !0;
  } catch {
    return !1;
  }
}
const Ko = /* @__PURE__ */ f("$ZodBase64", (e, t) => {
  t.pattern ?? (t.pattern = Wr), k.init(e, t), e._zod.bag.contentEncoding = "base64", e._zod.check = (n) => {
    pn(n.value) || n.issues.push({
      code: "invalid_format",
      format: "base64",
      input: n.value,
      inst: e,
      continue: !t.abort
    });
  };
});
function Vo(e) {
  if (!rn.test(e))
    return !1;
  const t = e.replace(/[-_]/g, (r) => r === "-" ? "+" : "/"), n = t.padEnd(Math.ceil(t.length / 4) * 4, "=");
  return pn(n);
}
const Wo = /* @__PURE__ */ f("$ZodBase64URL", (e, t) => {
  t.pattern ?? (t.pattern = rn), k.init(e, t), e._zod.bag.contentEncoding = "base64url", e._zod.check = (n) => {
    Vo(n.value) || n.issues.push({
      code: "invalid_format",
      format: "base64url",
      input: n.value,
      inst: e,
      continue: !t.abort
    });
  };
}), Ho = /* @__PURE__ */ f("$ZodE164", (e, t) => {
  t.pattern ?? (t.pattern = Gr), k.init(e, t);
});
function Go(e, t = null) {
  try {
    const n = e.split(".");
    if (n.length !== 3)
      return !1;
    const [r] = n;
    if (!r)
      return !1;
    const o = JSON.parse(atob(r));
    return !("typ" in o && o?.typ !== "JWT" || !o.alg || t && (!("alg" in o) || o.alg !== t));
  } catch {
    return !1;
  }
}
const Yo = /* @__PURE__ */ f("$ZodJWT", (e, t) => {
  k.init(e, t), e._zod.check = (n) => {
    Go(n.value, t.alg) || n.issues.push({
      code: "invalid_format",
      format: "jwt",
      input: n.value,
      inst: e,
      continue: !t.abort
    });
  };
}), hn = /* @__PURE__ */ f("$ZodNumber", (e, t) => {
  z.init(e, t), e._zod.pattern = e._zod.bag.pattern ?? Xe, e._zod.parse = (n, r) => {
    if (t.coerce)
      try {
        n.value = Number(n.value);
      } catch {
      }
    const o = n.value;
    if (typeof o == "number" && !Number.isNaN(o) && Number.isFinite(o))
      return n;
    const i = typeof o == "number" ? Number.isNaN(o) ? "NaN" : Number.isFinite(o) ? void 0 : String(o) : void 0;
    return n.issues.push({
      expected: "number",
      code: "invalid_type",
      input: o,
      inst: e,
      ...i ? { received: i } : {}
    }), n;
  };
}), qo = /* @__PURE__ */ f("$ZodNumberFormat", (e, t) => {
  io.init(e, t), hn.init(e, t);
}), Xo = /* @__PURE__ */ f("$ZodBoolean", (e, t) => {
  z.init(e, t), e._zod.pattern = to, e._zod.parse = (n, r) => {
    if (t.coerce)
      try {
        n.value = !!n.value;
      } catch {
      }
    const o = n.value;
    return typeof o == "boolean" || n.issues.push({
      expected: "boolean",
      code: "invalid_type",
      input: o,
      inst: e
    }), n;
  };
}), Qo = /* @__PURE__ */ f("$ZodUnknown", (e, t) => {
  z.init(e, t), e._zod.parse = (n) => n;
}), ei = /* @__PURE__ */ f("$ZodNever", (e, t) => {
  z.init(e, t), e._zod.parse = (n, r) => (n.issues.push({
    expected: "never",
    code: "invalid_type",
    input: n.value,
    inst: e
  }), n);
});
function _t(e, t, n) {
  e.issues.length && t.issues.push(...X(n, e.issues)), t.value[n] = e.value;
}
const ti = /* @__PURE__ */ f("$ZodArray", (e, t) => {
  z.init(e, t);
  const n = C.memoizer;
  n?.attach(e), e._zod.parse = (r, o) => {
    const i = r.value;
    if (!Array.isArray(i))
      return r.issues.push({
        expected: "array",
        code: "invalid_type",
        input: i,
        inst: e
      }), r;
    r.value = n ? n.alloc(e, r, Array(i.length), o) : Array(i.length);
    const s = [];
    for (let a = 0; a < i.length; a++) {
      const c = i[a], u = t.element._zod.run({
        value: c,
        issues: []
      }, o);
      u instanceof Promise ? s.push(u.then((l) => _t(l, r, a))) : _t(u, r, a);
    }
    return s.length ? Promise.all(s).then(() => r) : r;
  };
});
function we(e, t, n, r, o, i) {
  const s = n in r, a = i === "optional";
  if (!(!s && a && o === "optional")) {
    if (e.issues.length) {
      if (o !== void 0 && a && !s)
        return;
      t.issues.push(...X(n, e.issues));
    }
    if (!s && o === void 0) {
      e.issues.length || t.issues.push({
        code: "invalid_type",
        expected: "nonoptional",
        input: void 0,
        path: [n]
      });
      return;
    }
    e.value === void 0 ? s && (t.value[n] = void 0) : t.value[n] = e.value;
  }
}
const ni = [];
function mn(e) {
  const t = Object.keys(e.shape), n = Object.getOwnPropertySymbols(e.shape), r = n.length ? n : ni, o = r.length ? [...t, ...r] : t;
  for (const s of o)
    if (!e.shape?.[s]?._zod?.traits?.has("$ZodType"))
      throw new Error(`Invalid element at key "${String(s)}": expected a Zod schema`);
  const i = Yn(e.shape);
  return {
    ...e,
    allKeys: o,
    symbolKeys: r,
    // string-only: handleCatchall matches it against `for...in`, which never yields a symbol
    keySet: new Set(t),
    numKeys: t.length,
    optionalKeys: new Set(i)
  };
}
function gn(e, t, n, r, o, i) {
  const s = [], a = o.keySet, c = o.catchall._zod, u = c.def.type, l = c.optin, d = c.optout;
  for (const p in t) {
    if (a.has(p))
      continue;
    if (p === "__proto__") {
      u === "never" && s.push(p);
      continue;
    }
    if (u === "never") {
      s.push(p);
      continue;
    }
    const h = c.run({ value: t[p], issues: [] }, r);
    h instanceof Promise ? e.push(h.then((m) => we(m, n, p, t, l, d))) : we(h, n, p, t, l, d);
  }
  return s.length && n.issues.push({
    code: "unrecognized_keys",
    keys: s,
    input: t,
    inst: i,
    // Describes the shape of the input, not the validity of the parsed value, so it never aborts. The parse still fails; the schema's own checks just get to run first, and an enclosing intersection can reconcile the key against a sibling operand.
    continue: !0
  }), e.length ? Promise.all(e).then(() => n) : n;
}
const yt = /* @__PURE__ */ new WeakMap(), ri = /* @__PURE__ */ f("$ZodObject", (e, t) => {
  if (z.init(e, t), !Object.getOwnPropertyDescriptor(t, "shape")?.get) {
    const c = t.shape;
    yt.set(t, c), Object.defineProperty(t, "shape", {
      get: () => {
        const u = { ...c };
        return Object.defineProperty(t, "shape", {
          value: u
        }), yt.set(t, u), u;
      }
    });
  }
  const r = Ve(() => mn(t));
  w(e, "propValues", (c) => {
    const u = c.def.shape, l = {};
    for (const d in u) {
      const p = u[d]._zod;
      if (p.values) {
        Object.prototype.hasOwnProperty.call(l, d) || N(l, d, /* @__PURE__ */ new Set());
        for (const h of p.values)
          l[d].add(h);
        p.optin !== void 0 && l[d].add(void 0);
      }
    }
    return l;
  });
  const o = ye, i = t.catchall;
  let s;
  const a = C.memoizer;
  a?.attach(e), e._zod.parse = (c, u) => {
    s ?? (s = r.value);
    const l = c.value;
    if (!o(l))
      return c.issues.push({
        expected: "object",
        code: "invalid_type",
        input: l,
        inst: e
      }), c;
    c.value = a ? a.alloc(e, c, {}, u) : {};
    const d = [], p = s.shape;
    for (const h of s.allKeys) {
      if (h === "__proto__")
        continue;
      const m = p[h], _ = m._zod.optin, y = m._zod.optout, T = m._zod.run({ value: l[h], issues: [] }, u);
      T instanceof Promise ? d.push(T.then((j) => we(j, c, h, l, _, y))) : we(T, c, h, l, _, y);
    }
    return i ? gn(d, l, c, u, r.value, e) : d.length ? Promise.all(d).then(() => c) : c;
  };
}), oi = /* @__PURE__ */ f("$ZodObjectJIT", (e, t) => {
  ri.init(e, t);
  const n = e._zod.parse, r = Ve(() => mn(t)), o = C.memoizer, i = (h) => {
    const m = r.value, _ = m.symbolKeys, y = new _o(["payload", "ctx"], { shape: h, inst: e, memo: o, syms: _ }), T = (P) => `shape[${P}]._zod.run({ value: input[${P}], issues: [] }, ctx)`, j = (P, v) => `
          for (let i = 0; i < ${P}.issues.length; i++) {
            const iss = ${P}.issues[i];
            iss.path = iss.path ? [${v}, ...iss.path] : [${v}];
            payload.issues.push(iss);
          }`;
    y.write("const input = payload.value;");
    const it = /* @__PURE__ */ Object.create(null);
    let Fn = 0;
    for (const P of m.allKeys)
      it[P] = `key_${Fn++}`;
    y.write(o ? "const newResult = memo.alloc(inst, payload, {}, ctx);" : "const newResult = {};");
    for (const P of m.allKeys) {
      if (P === "__proto__")
        continue;
      const v = it[P], x = typeof P == "symbol" ? `syms[${_.indexOf(P)}]` : Vn(P), Ie = `${x} in input`, st = h[P], at = st?._zod?.optin, ct = at !== void 0, Ln = st?._zod?.optout === "optional";
      if (y.write(`const ${v} = ${T(x)};`), ct && Ln) {
        const Jn = at === "optional" ? `${v}_present` : `${v}.value !== undefined || ${v}_present`;
        y.write(`
        const ${v}_present = ${Ie};
        if (!${v}.issues.length || ${v}_present) {
          if (${v}.issues.length) {${j(v, x)}
          }

          if (${Jn}) {
            newResult[${x}] = ${v}.value;
          }
        }

      `);
      } else ct ? y.write(`
        if (${v}.issues.length) {${j(v, x)}
        }
        
        if (${v}.value === undefined) {
          if (${Ie}) {
            newResult[${x}] = undefined;
          }
        } else {
          newResult[${x}] = ${v}.value;
        }

      `) : y.write(`
        const ${v}_present = ${Ie};
        if (${v}.issues.length) {${j(v, x)}
        }
        if (!${v}_present && !${v}.issues.length) {
          payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: undefined,
            path: [${x}]
          });
        }

        if (${v}_present) {
          newResult[${x}] = ${v}.value;
        }

      `);
    }
    return y.write("payload.value = newResult;"), y.write("return payload;"), y.compile();
  };
  let s;
  const a = ye, c = !C.jitless, l = c && Hn.value, d = t.catchall;
  let p;
  e._zod.parse = (h, m) => {
    p ?? (p = r.value);
    const _ = h.value;
    return a(_) ? c && l && m?.async === !1 && m.jitless !== !0 ? (s || (s = i(t.shape)), h = s(h, m), d ? gn([], _, h, m, p, e) : h) : n(h, m) : (h.issues.push({
      expected: "object",
      code: "invalid_type",
      input: _,
      inst: e
    }), h);
  };
});
function bt(e, t, n, r) {
  for (const i of e)
    if (i.issues.length === 0)
      return t.value = i.value, t;
  const o = e.filter((i) => !q(i));
  return o.length === 1 ? (t.value = o[0].value, o[0]) : (t.issues.push({
    code: "invalid_union",
    input: t.value,
    inst: n,
    errors: e.map((i) => i.issues.map((s) => B(s, r, F())))
  }), t);
}
const ii = /* @__PURE__ */ f("$ZodUnion", (e, t) => {
  z.init(e, t), w(e, "optin", (r) => r.def.options.some((o) => o._zod.optin === "defaulted") ? "defaulted" : r.def.options.some((o) => o._zod.optin !== void 0) ? "optional" : void 0), w(e, "optout", (r) => r.def.options.some((o) => o._zod.optout === "optional") ? "optional" : void 0), w(e, "values", (r) => {
    if (r.def.options.every((o) => o._zod.values))
      return new Set(r.def.options.flatMap((o) => Array.from(o._zod.values)));
  }), w(e, "pattern", (r) => {
    if (r.def.options.every((o) => o._zod.pattern)) {
      const o = r.def.options.map((i) => i._zod.pattern);
      return new RegExp(`^(${o.map((i) => We(i.source)).join("|")})$`);
    }
  });
  const n = t.options.length === 1 ? t.options[0]._zod.run : null;
  e._zod.parse = (r, o) => {
    if (n)
      return n(r, o);
    let i = !1;
    const s = [];
    for (const a of t.options) {
      const c = a._zod.run({
        value: r.value,
        issues: []
      }, o);
      if (c instanceof Promise)
        s.push(c), i = !0;
      else {
        if (c.issues.length === 0)
          return c;
        s.push(c);
      }
    }
    return i ? Promise.all(s).then((a) => bt(a, r, e, o)) : bt(s, r, e, o);
  };
}), si = /* @__PURE__ */ f("$ZodIntersection", (e, t) => {
  z.init(e, t), e._zod.parse = (n, r) => {
    const o = n.value, i = t.left._zod.run({ value: o, issues: [] }, r), s = t.right._zod.run({ value: o, issues: [] }, r);
    return i instanceof Promise || s instanceof Promise ? Promise.all([i, s]).then(([c, u]) => wt(n, c, u)) : wt(n, i, s);
  };
});
function Ue(e, t) {
  if (e === t)
    return { valid: !0, data: e };
  if (e instanceof Date && t instanceof Date && +e == +t)
    return { valid: !0, data: e };
  if (ee(e) && ee(t)) {
    const n = Object.keys(t), r = Object.keys(e).filter((i) => n.indexOf(i) !== -1), o = { ...e, ...t };
    Object.prototype.hasOwnProperty.call(o, "__proto__") && delete o.__proto__;
    for (const i of r) {
      if (i === "__proto__")
        continue;
      const s = Ue(e[i], t[i]);
      if (!s.valid)
        return {
          valid: !1,
          mergeErrorPath: [i, ...s.mergeErrorPath]
        };
      o[i] = s.data;
    }
    return { valid: !0, data: o };
  }
  if (Array.isArray(e) && Array.isArray(t)) {
    if (e.length !== t.length)
      return { valid: !1, mergeErrorPath: [] };
    const n = [];
    for (let r = 0; r < e.length; r++) {
      const o = e[r], i = t[r], s = Ue(o, i);
      if (!s.valid)
        return {
          valid: !1,
          mergeErrorPath: [r, ...s.mergeErrorPath]
        };
      n.push(s.data);
    }
    return { valid: !0, data: n };
  }
  return { valid: !1, mergeErrorPath: [] };
}
function wt(e, t, n) {
  const r = /* @__PURE__ */ new Map();
  let o;
  const i = /* @__PURE__ */ new Map(), s = (u, l) => {
    let d;
    if (u.code === "unrecognized_keys" && !u.path?.length)
      o ?? (o = u), d = u.keys;
    else if (u.code === "invalid_key" && u.origin === "record" && u.path?.length === 1) {
      const p = String(u.path[0]);
      i.has(p) || i.set(p, u), d = [p];
    } else
      return !1;
    for (const p of d)
      r.has(p) || r.set(p, {}), r.get(p)[l] = !0;
    return !0;
  };
  for (const u of t.issues)
    s(u, "l") || e.issues.push(u);
  for (const u of n.issues)
    s(u, "r") || e.issues.push(u);
  const a = [...r].filter(([, u]) => u.l && u.r).map(([u]) => u);
  if (a.length) {
    const u = o ? a.filter((l) => o.keys.includes(l)) : [];
    u.length && e.issues.push({ ...o, keys: u });
    for (const l of a)
      !u.includes(l) && i.has(l) && e.issues.push(i.get(l));
  }
  const c = Ue(t.value, n.value);
  if (!c.valid) {
    if (q(e))
      return e;
    throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(c.mergeErrorPath)}`);
  }
  return e.value = c.data, e;
}
const ai = /* @__PURE__ */ f("$ZodRecord", (e, t) => {
  z.init(e, t);
  const n = C.memoizer;
  n?.attach(e), e._zod.parse = (r, o) => {
    const i = r.value;
    if (!ee(i))
      return r.issues.push({
        expected: "record",
        code: "invalid_type",
        input: i,
        inst: e
      }), r;
    const s = [], a = t.keyType._zod.values;
    if (a && !t.partial) {
      r.value = n ? n.alloc(e, r, {}, o) : {};
      const c = /* @__PURE__ */ new Set();
      for (const l of a)
        if (typeof l == "string" || typeof l == "number" || typeof l == "symbol") {
          if (c.add(typeof l == "number" ? l.toString() : l), l === "__proto__")
            continue;
          const d = t.keyType._zod.run({ value: l, issues: [] }, o);
          if (d instanceof Promise)
            throw new Error("Async schemas not supported in object keys currently");
          if (d.issues.length) {
            r.issues.push({
              code: "invalid_key",
              origin: "record",
              issues: d.issues.map((m) => B(m, o, F())),
              input: l,
              path: [l],
              inst: e
            });
            continue;
          }
          const p = d.value;
          if (p === "__proto__")
            continue;
          const h = t.valueType._zod.run({ value: i[l], issues: [] }, o);
          h instanceof Promise ? s.push(h.then((m) => {
            m.issues.length && r.issues.push(...X(l, m.issues)), r.value[p] = m.value;
          })) : (h.issues.length && r.issues.push(...X(l, h.issues)), r.value[p] = h.value);
        }
      let u;
      for (const l in i)
        if (!c.has(l))
          if (t.mode === "loose") {
            if (l === "__proto__")
              continue;
            r.value[l] = i[l];
          } else
            u = u ?? [], u.push(l);
      u && u.length > 0 && r.issues.push({
        code: "unrecognized_keys",
        input: i,
        inst: e,
        keys: u,
        continue: !0
      });
    } else {
      r.value = n ? n.alloc(e, r, {}, o) : {};
      let c;
      for (const u of Reflect.ownKeys(i)) {
        if (u === "__proto__" || !Object.prototype.propertyIsEnumerable.call(i, u))
          continue;
        let l = t.keyType._zod.run({ value: u, issues: [] }, o);
        if (l instanceof Promise)
          throw new Error("Async schemas not supported in object keys currently");
        if (typeof u == "string" && Xe.test(u) && l.issues.length) {
          const m = t.keyType._zod.run({ value: Number(u), issues: [] }, o);
          if (m instanceof Promise)
            throw new Error("Async schemas not supported in object keys currently");
          m.issues.length === 0 && (l = m);
        }
        if (l.issues.length) {
          t.mode === "loose" ? r.value[u] = i[u] : a ? (c = c ?? [], c.push(u)) : r.issues.push({
            code: "invalid_key",
            origin: "record",
            issues: l.issues.map((m) => B(m, o, F())),
            input: u,
            path: [u],
            inst: e
          });
          continue;
        }
        const p = l.value;
        if (p === "__proto__")
          continue;
        const h = t.valueType._zod.run({ value: i[u], issues: [] }, o);
        h instanceof Promise ? s.push(h.then((m) => {
          m.issues.length && r.issues.push(...X(u, m.issues)), r.value[p] = m.value;
        })) : (h.issues.length && r.issues.push(...X(u, h.issues)), r.value[p] = h.value);
      }
      c && c.length > 0 && r.issues.push({
        code: "unrecognized_keys",
        input: i,
        inst: e,
        keys: c,
        continue: !0
      });
    }
    return s.length ? Promise.all(s).then(() => r) : r;
  };
}), ci = /* @__PURE__ */ f("$ZodEnum", (e, t) => {
  z.init(e, t);
  const n = Ht(t.entries), r = new Set(n);
  e._zod.values = r;
  const o = n.filter((i) => Gn.has(typeof i));
  e._zod.pattern = new RegExp(o.length ? `^(${o.map((i) => te(i.toString())).join("|")})$` : "^[^\\s\\S]$"), e._zod.parse = (i, s) => {
    const a = i.value;
    return r.has(a) || i.issues.push({
      code: "invalid_value",
      values: n,
      input: a,
      inst: e
    }), i;
  };
}), ui = /* @__PURE__ */ f("$ZodLiteral", (e, t) => {
  z.init(e, t);
  const n = new Set(t.values);
  e._zod.values = n, e._zod.pattern = new RegExp(t.values.length ? `^(${t.values.map((r) => typeof r == "string" ? te(r) : r ? te(r.toString()) : String(r)).join("|")})$` : "^[^\\s\\S]$"), e._zod.parse = (r, o) => {
    const i = r.value;
    return n.has(i) || r.issues.push({
      code: "invalid_value",
      values: t.values,
      input: i,
      inst: e
    }), r;
  };
}), li = /* @__PURE__ */ f("$ZodTransform", (e, t) => {
  z.init(e, t), e._zod.optin = "optional", C.memoizer?.guard(e), e._zod.parse = (n, r) => {
    if (r.direction === "backward")
      throw new Qt(e.constructor.name);
    const o = t.transform(n.value, n);
    if (r.async)
      return (o instanceof Promise ? o : Promise.resolve(o)).then((s) => (n.value = s, n));
    if (o instanceof Promise)
      throw new Q();
    return n.value = o, n;
  };
});
function vt(e, t) {
  return e.value = t.issues.length ? void 0 : t.value, e;
}
const _n = /* @__PURE__ */ f("$ZodOptional", (e, t) => {
  z.init(e, t), w(e, "optin", (n) => n.def.innerType._zod.optin === "defaulted" ? "defaulted" : "optional"), e._zod.optout = "optional", w(e, "values", (n) => {
    const r = n.def.innerType._zod.values;
    return r ? /* @__PURE__ */ new Set([...r, void 0]) : void 0;
  }), w(e, "pattern", (n) => {
    const r = n.def.innerType._zod.pattern;
    return r ? new RegExp(`^(${We(r.source)})?$`) : void 0;
  }), e._zod.parse = (n, r) => {
    if (n.value === void 0) {
      if (t.innerType._zod.optin !== "defaulted")
        return n;
      const o = t.innerType._zod.run({ value: n.value, issues: [] }, r);
      return o instanceof Promise ? o.then((i) => vt(n, i)) : vt(n, o);
    }
    return t.innerType._zod.run(n, r);
  };
}), fi = /* @__PURE__ */ f("$ZodExactOptional", (e, t) => {
  _n.init(e, t), w(e, "values", (n) => n.def.innerType._zod.values), w(e, "pattern", (n) => n.def.innerType._zod.pattern), e._zod.parse = (n, r) => t.innerType._zod.run(n, r);
}), di = /* @__PURE__ */ f("$ZodNullable", (e, t) => {
  z.init(e, t), w(e, "optin", (n) => n.def.innerType._zod.optin), w(e, "optout", (n) => n.def.innerType._zod.optout), w(e, "pattern", (n) => {
    const r = n.def.innerType._zod.pattern;
    return r ? new RegExp(`^(${We(r.source)}|null)$`) : void 0;
  }), w(e, "values", (n) => n.def.innerType._zod.values ? /* @__PURE__ */ new Set([...n.def.innerType._zod.values, null]) : void 0), e._zod.parse = (n, r) => n.value === null ? n : t.innerType._zod.run(n, r);
}), pi = /* @__PURE__ */ f("$ZodDefault", (e, t) => {
  z.init(e, t), e._zod.optin = "defaulted", w(e, "values", (n) => n.def.innerType._zod.values), e._zod.parse = (n, r) => {
    if (r.direction === "backward")
      return t.innerType._zod.run(n, r);
    if (n.value === void 0)
      return n.value = t.defaultValue, n;
    const o = t.innerType._zod.run(n, r);
    return o instanceof Promise ? o.then((i) => kt(i, t)) : kt(o, t);
  };
});
function kt(e, t) {
  return e.value === void 0 && (e.value = t.defaultValue), e;
}
const hi = /* @__PURE__ */ f("$ZodPrefault", (e, t) => {
  z.init(e, t), e._zod.optin = "defaulted", w(e, "values", (n) => n.def.innerType._zod.values), e._zod.parse = (n, r) => (r.direction === "backward" || n.value === void 0 && (n.value = t.defaultValue), t.innerType._zod.run(n, r));
}), mi = /* @__PURE__ */ f("$ZodNonOptional", (e, t) => {
  z.init(e, t), w(e, "values", (n) => {
    const r = n.def.innerType._zod.values;
    return r ? new Set([...r].filter((o) => o !== void 0)) : void 0;
  }), e._zod.parse = (n, r) => {
    const o = t.innerType._zod.run(n, r);
    return o instanceof Promise ? o.then((i) => zt(i, e)) : zt(o, e);
  };
});
function zt(e, t) {
  return !e.issues.length && e.value === void 0 && e.issues.push({
    code: "invalid_type",
    expected: "nonoptional",
    input: e.value,
    inst: t
  }), e;
}
function St(e, t, n, r) {
  return t.issues.length ? (e.value = n.catchValue({
    ...t,
    value: e.value,
    error: {
      issues: t.issues.map((o) => B(o, r, F()))
    },
    input: e.value
  }), e) : (e.value = t.value, t.memo && (e.memo = !0), e);
}
const gi = /* @__PURE__ */ f("$ZodCatch", (e, t) => {
  z.init(e, t), w(e, "optin", (n) => n.def.innerType._zod.optin === "defaulted" ? "defaulted" : "optional"), w(e, "optout", (n) => n.def.innerType._zod.optout), w(e, "values", (n) => n.def.innerType._zod.values), e._zod.parse = (n, r) => {
    if (r.direction === "backward")
      return t.innerType._zod.run(n, r);
    const o = t.innerType._zod.run({ value: n.value, issues: [] }, r);
    return o instanceof Promise ? o.then((i) => St(n, i, t, r)) : St(n, o, t, r);
  };
}), _i = /* @__PURE__ */ f("$ZodPipe", (e, t) => {
  z.init(e, t), w(e, "values", (n) => n.def.in._zod.values), w(e, "optin", (n) => n.def.in._zod.optin), w(e, "optout", (n) => n.def.out._zod.optout), w(e, "propValues", (n) => n.def.in._zod.propValues), e._zod.parse = (n, r) => {
    if (r.direction === "backward") {
      const i = t.out._zod.run(n, r);
      return i instanceof Promise ? i.then((s) => fe(s, t.in, r)) : fe(i, t.in, r);
    }
    const o = t.in._zod.run(n, r);
    return o instanceof Promise ? o.then((i) => fe(i, t.out, r)) : fe(o, t.out, r);
  };
});
function fe(e, t, n) {
  return e.issues.some((r) => r.code !== "unrecognized_keys") ? (e.aborted = !0, e) : t._zod.run({ value: e.value, issues: e.issues }, n);
}
const yi = /* @__PURE__ */ f("$ZodReadonly", (e, t) => {
  z.init(e, t), w(e, "propValues", (n) => n.def.innerType._zod.propValues), w(e, "values", (n) => n.def.innerType._zod.values), w(e, "optin", (n) => n.def.innerType?._zod?.optin), w(e, "optout", (n) => n.def.innerType?._zod?.optout), e._zod.parse = (n, r) => {
    if (r.direction === "backward")
      return t.innerType._zod.run(n, r);
    const o = t.innerType._zod.run(n, r);
    return o instanceof Promise ? o.then(Ot) : Ot(o);
  };
});
function Ot(e) {
  return e.memo || (e.value = Object.freeze(e.value)), e;
}
const bi = /* @__PURE__ */ f("$ZodCustom", (e, t) => {
  A.init(e, t), z.init(e, t), e._zod.parse = (n, r) => n, e._zod.check = (n) => {
    const r = n.value, o = t.fn(r);
    if (o instanceof Promise)
      return o.then((i) => Et(i, n, r, e));
    Et(o, n, r, e);
  };
});
function Et(e, t, n, r) {
  if (!e) {
    const o = {
      code: "custom",
      input: n,
      inst: r,
      // incorporates params.error into issue reporting
      path: [...r._zod.def.path ?? []],
      // incorporates params.error into issue reporting
      continue: !r._zod.def.abort
      // params: inst._zod.def.params,
    };
    r._zod.def.params && (o.params = r._zod.def.params), t.issues.push(ce(o));
  }
}
class wi extends Error {
  constructor() {
    super("Cannot parse a reference cycle that closes through a transform"), this.name = "ZodCyclicError";
  }
}
const Me = "~memo", $t = [];
function De(e) {
  return e.map((t) => t.path ? { ...t, path: t.path.slice() } : { ...t });
}
const Tt = /* @__PURE__ */ new WeakMap();
function yn(e, t) {
  const n = Tt.get(e);
  if (n !== void 0)
    return n;
  if (t.has(e))
    return !0;
  t.add(e);
  let r = !1;
  const o = (a) => {
    !r && a?._zod && yn(a, t) && (r = !0);
  }, i = e._zod.def;
  switch (i.type) {
    case "object": {
      for (const a of Reflect.ownKeys(i.shape))
        o(i.shape[a]);
      o(i.catchall);
      break;
    }
    case "array":
      o(i.element);
      break;
    case "tuple":
      for (const a of i.items)
        o(a);
      o(i.rest);
      break;
    case "record":
    case "map":
      o(i.keyType), o(i.valueType);
      break;
    case "set":
      o(i.valueType);
      break;
    case "union":
      for (const a of i.options)
        o(a);
      break;
    case "intersection":
      o(i.left), o(i.right);
      break;
    case "optional":
    case "nullable":
    case "default":
    case "prefault":
    case "catch":
    case "readonly":
    case "nonoptional":
    case "promise":
    case "success":
      o(i.innerType);
      break;
    case "pipe":
      o(i.in), o(i.out);
      break;
    case "function":
      o(i.input), o(i.output);
      break;
    // reading `_zod.innerType` resolves the getter once and caches it
    case "lazy":
      o(e._zod.innerType);
      break;
    // a leaf by choice: `parts` are regex fragments, not data positions
    case "template_literal":
    // leaves
    case "string":
    case "number":
    case "int":
    case "boolean":
    case "bigint":
    case "symbol":
    case "undefined":
    case "null":
    case "void":
    case "never":
    case "any":
    case "unknown":
    case "date":
    case "nan":
    case "enum":
    case "literal":
    case "file":
    case "transform":
    case "custom":
      break;
    default:
      for (const a in i) {
        const c = Object.getOwnPropertyDescriptor(i, a);
        if (!c || c.get)
          continue;
        const u = c.value;
        if (!(!u || typeof u != "object")) {
          if (u._zod)
            o(u);
          else if (Array.isArray(u))
            for (const l of u)
              o(l);
        }
      }
  }
  return t.delete(e), Tt.set(e, r), r;
}
function vi(e, t) {
  let n = e.buckets.get(t);
  return n || (n = /* @__PURE__ */ new Map(), e.buckets.set(t, n)), n;
}
let de;
const pe = [], ki = {
  alloc(e, t, n) {
    const r = de;
    if (!r)
      return n;
    de = void 0;
    const o = { value: n, issues: null };
    return r.set(t.value, o), pe.push(o), n;
  },
  guard(e) {
    var t;
    (t = e._zod).deferred ?? (t.deferred = []), e._zod.deferred.push(() => {
      const n = e._zod.parse, r = (o, i) => {
        if (i.direction !== "backward" && Si(i, o.value))
          throw new wi();
        return n(o, i);
      };
      e._zod.parse = r, e._zod.run === n && (e._zod.run = r);
    });
  },
  attach(e) {
    var t;
    let n, r, o;
    (t = e._zod).deferred ?? (t.deferred = []), e._zod.deferred.push(() => {
      const i = e._zod.parse, s = (a, c) => {
        if (n === void 0 && (n = yn(e, /* @__PURE__ */ new Set()), !n))
          return e._zod.parse = i, e._zod.run === s && (e._zod.run = i), i(a, c);
        const u = a.value;
        if (u === null || typeof u != "object")
          return i(a, c);
        let l = c[Me];
        l || (l = { buckets: /* @__PURE__ */ new Map(), backEdges: void 0 }, c[Me] = l);
        let d;
        r === c ? d = o : (d = vi(l, e), r = c, o = d);
        const p = d.get(u);
        if (p)
          return a.value = p.value, p.issues ? p.issues.length && a.issues.push(...De(p.issues)) : (a.memo = !0, l.backEdges ?? (l.backEdges = /* @__PURE__ */ new Set()), l.backEdges.add(p.value)), a;
        de = d;
        const h = pe.length, m = i(a, c);
        de = void 0;
        const _ = pe.length > h ? pe.pop() : void 0;
        return m instanceof Promise ? m.then((y) => (_ && (_.issues = y.issues.length ? De(y.issues) : $t), y)) : (_ && (_.issues = m.issues.length ? De(m.issues) : $t), m);
      };
      e._zod.parse = s, e._zod.run === i && (e._zod.run = s);
    });
  }
};
function zi() {
  return ki;
}
function Si(e, t) {
  const n = e[Me]?.backEdges;
  return n !== void 0 && t !== null && typeof t == "object" && n.has(t);
}
const Oi = () => {
  const e = {
    string: { unit: "characters", verb: "to have" },
    file: { unit: "bytes", verb: "to have" },
    array: { unit: "items", verb: "to have" },
    set: { unit: "items", verb: "to have" },
    map: { unit: "entries", verb: "to have" }
  };
  function t(i) {
    return e[i] ?? null;
  }
  const n = {
    regex: "input",
    email: "email address",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO datetime",
    date: "ISO date",
    time: "ISO time",
    duration: "ISO duration",
    ipv4: "IPv4 address",
    ipv6: "IPv6 address",
    mac: "MAC address",
    cidrv4: "IPv4 range",
    cidrv6: "IPv6 range",
    base64: "base64-encoded string",
    base64url: "base64url-encoded string",
    json_string: "JSON string",
    e164: "E.164 number",
    credit_card: "credit card number",
    jwt: "JWT",
    template_literal: "input"
  }, r = {
    // Compatibility: "nan" -> "NaN" for display
    nan: "NaN"
    // All other type names omitted - they fall back to raw values via ?? operator
  };
  function o(i, s) {
    return i === "number" && typeof s == "number" && !Number.isFinite(s) ? String(s) : r[i] ?? i;
  }
  return (i) => {
    switch (i.code) {
      case "invalid_type": {
        const s = o(i.expected), a = sr(i.input), c = o(a, i.input);
        return `Invalid input: expected ${s}, received ${c}`;
      }
      case "invalid_value":
        return i.values.length === 1 ? `Invalid input: expected ${qt(i.values[0])}` : `Invalid option: expected one of ${ut(i.values, "|")}`;
      case "too_big": {
        const s = i.exact ? "exactly " : i.inclusive ? "<=" : "<", a = t(i.origin);
        return a ? `Too big: expected ${i.origin ?? "value"} to have ${s}${i.maximum.toString()} ${a.unit ?? "elements"}` : `Too big: expected ${i.origin ?? "value"} to be ${s}${i.maximum.toString()}`;
      }
      case "too_small": {
        const s = i.exact ? "exactly " : i.inclusive ? ">=" : ">", a = t(i.origin);
        return a ? `Too small: expected ${i.origin} to have ${s}${i.minimum.toString()} ${a.unit}` : `Too small: expected ${i.origin} to be ${s}${i.minimum.toString()}`;
      }
      case "invalid_format": {
        const s = i;
        return s.format === "starts_with" ? `Invalid string: must start with "${s.prefix}"` : s.format === "ends_with" ? `Invalid string: must end with "${s.suffix}"` : s.format === "includes" ? `Invalid string: must include "${s.includes}"` : s.format === "regex" ? `Invalid string: must match pattern ${s.pattern}` : `Invalid ${n[s.format] ?? i.format}`;
      }
      case "not_multiple_of":
        return `Invalid number: must be a multiple of ${i.divisor}`;
      case "unrecognized_keys":
        return `Unrecognized key${i.keys.length > 1 ? "s" : ""}: ${ut(i.keys, ", ")}`;
      case "invalid_key":
        return `Invalid key in ${i.origin}`;
      case "invalid_union":
        return i.options && Array.isArray(i.options) && i.options.length > 0 ? `Invalid discriminator value. Expected ${i.options.map((a) => `'${a}'`).join(" | ")}` : i.inclusive === !1 ? "Invalid input: more than one option matched" : "Invalid input";
      case "invalid_element":
        return `Invalid value in ${i.origin}`;
      default:
        return "Invalid input";
    }
  };
};
function Ei() {
  return {
    localeError: Oi()
  };
}
var It;
class $i {
  constructor() {
    this._map = /* @__PURE__ */ new WeakMap(), this._idmap = /* @__PURE__ */ new Map();
  }
  add(t, ...n) {
    const r = n[0];
    return this._map.set(t, r), r && typeof r == "object" && "id" in r && this._idmap.set(r.id, t), this;
  }
  clear() {
    return this._map = /* @__PURE__ */ new WeakMap(), this._idmap = /* @__PURE__ */ new Map(), this;
  }
  remove(t) {
    const n = this._map.get(t);
    return n && typeof n == "object" && "id" in n && this._idmap.delete(n.id), this._map.delete(t), this;
  }
  get(t) {
    const n = t._zod.parent;
    if (n) {
      const r = { ...this.get(n) ?? {} };
      delete r.id;
      const o = { ...r, ...this._map.get(t) };
      return Object.keys(o).length ? o : void 0;
    }
    return this._map.get(t);
  }
  has(t) {
    return this._map.has(t);
  }
}
function Ti() {
  return new $i();
}
(It = globalThis).__zod_globalRegistry ?? (It.__zod_globalRegistry = Ti());
const se = globalThis.__zod_globalRegistry;
// @__NO_SIDE_EFFECTS__
function Ii(e, t) {
  return new e({
    type: "string",
    ...g(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Pi(e, t) {
  return new e({
    type: "string",
    format: "email",
    check: "string_format",
    abort: !1,
    ...g(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Ni(e, t) {
  return new e({
    type: "string",
    format: "guid",
    check: "string_format",
    abort: !1,
    ...g(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Ai(e, t) {
  return new e({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    ...g(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Zi(e, t) {
  return new e({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v4",
    ...g(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Di(e, t) {
  return new e({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v6",
    ...g(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Ri(e, t) {
  return new e({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v7",
    ...g(t)
  });
}
// @__NO_SIDE_EFFECTS__
function ji(e, t) {
  return new e({
    type: "string",
    format: "url",
    check: "string_format",
    abort: !1,
    ...g(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Ci(e, t) {
  return new e({
    type: "string",
    format: "emoji",
    check: "string_format",
    abort: !1,
    ...g(t)
  });
}
// @__NO_SIDE_EFFECTS__
function xi(e, t) {
  return new e({
    type: "string",
    format: "nanoid",
    check: "string_format",
    abort: !1,
    ...g(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Ui(e, t) {
  return new e({
    type: "string",
    format: "cuid",
    check: "string_format",
    abort: !1,
    ...g(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Mi(e, t) {
  return new e({
    type: "string",
    format: "cuid2",
    check: "string_format",
    abort: !1,
    ...g(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Fi(e, t) {
  return new e({
    type: "string",
    format: "ulid",
    check: "string_format",
    abort: !1,
    ...g(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Li(e, t) {
  return new e({
    type: "string",
    format: "xid",
    check: "string_format",
    abort: !1,
    ...g(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Ji(e, t) {
  return new e({
    type: "string",
    format: "ksuid",
    check: "string_format",
    abort: !1,
    ...g(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Bi(e, t) {
  return new e({
    type: "string",
    format: "ipv4",
    check: "string_format",
    abort: !1,
    ...g(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Ki(e, t) {
  return new e({
    type: "string",
    format: "ipv6",
    check: "string_format",
    abort: !1,
    ...g(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Vi(e, t) {
  return new e({
    type: "string",
    format: "cidrv4",
    check: "string_format",
    abort: !1,
    ...g(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Wi(e, t) {
  return new e({
    type: "string",
    format: "cidrv6",
    check: "string_format",
    abort: !1,
    ...g(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Hi(e, t) {
  return new e({
    type: "string",
    format: "base64",
    check: "string_format",
    abort: !1,
    ...g(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Gi(e, t) {
  return new e({
    type: "string",
    format: "base64url",
    check: "string_format",
    abort: !1,
    ...g(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Yi(e, t) {
  return new e({
    type: "string",
    format: "e164",
    check: "string_format",
    abort: !1,
    ...g(t)
  });
}
// @__NO_SIDE_EFFECTS__
function qi(e, t) {
  return new e({
    type: "string",
    format: "jwt",
    check: "string_format",
    abort: !1,
    ...g(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Xi(e, t) {
  return new e({
    type: "string",
    format: "datetime",
    check: "string_format",
    offset: !1,
    local: !1,
    precision: null,
    ...g(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Qi(e, t) {
  return new e({
    type: "string",
    format: "date",
    check: "string_format",
    ...g(t)
  });
}
// @__NO_SIDE_EFFECTS__
function es(e, t) {
  return new e({
    type: "string",
    format: "time",
    check: "string_format",
    precision: null,
    ...g(t)
  });
}
// @__NO_SIDE_EFFECTS__
function ts(e, t) {
  return new e({
    type: "string",
    format: "duration",
    check: "string_format",
    ...g(t)
  });
}
// @__NO_SIDE_EFFECTS__
function ns(e, t) {
  return new e({
    type: "number",
    checks: [],
    ...g(t)
  });
}
// @__NO_SIDE_EFFECTS__
function rs(e, t) {
  return new e({
    type: "number",
    check: "number_format",
    abort: !1,
    format: "safeint",
    ...g(t)
  });
}
// @__NO_SIDE_EFFECTS__
function os(e, t) {
  return new e({
    type: "boolean",
    ...g(t)
  });
}
// @__NO_SIDE_EFFECTS__
function is(e) {
  return new e({
    type: "unknown"
  });
}
// @__NO_SIDE_EFFECTS__
function ss(e, t) {
  return new e({
    type: "never",
    ...g(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Pt(e, t) {
  return new an({
    check: "less_than",
    ...g(t),
    value: e,
    inclusive: !1
  });
}
// @__NO_SIDE_EFFECTS__
function Re(e, t) {
  return new an({
    check: "less_than",
    ...g(t),
    value: e,
    inclusive: !0
  });
}
// @__NO_SIDE_EFFECTS__
function Nt(e, t) {
  return new cn({
    check: "greater_than",
    ...g(t),
    value: e,
    inclusive: !1
  });
}
// @__NO_SIDE_EFFECTS__
function je(e, t) {
  return new cn({
    check: "greater_than",
    ...g(t),
    value: e,
    inclusive: !0
  });
}
// @__NO_SIDE_EFFECTS__
function At(e, t) {
  return new oo({
    check: "multiple_of",
    ...g(t),
    value: e
  });
}
// @__NO_SIDE_EFFECTS__
function bn(e, t) {
  return new so({
    check: "max_length",
    ...g(t),
    maximum: e
  });
}
// @__NO_SIDE_EFFECTS__
function ve(e, t) {
  return new ao({
    check: "min_length",
    ...g(t),
    minimum: e
  });
}
// @__NO_SIDE_EFFECTS__
function wn(e, t) {
  return new co({
    check: "length_equals",
    ...g(t),
    length: e
  });
}
// @__NO_SIDE_EFFECTS__
function as(e, t) {
  return new uo({
    check: "string_format",
    format: "regex",
    ...g(t),
    pattern: e
  });
}
// @__NO_SIDE_EFFECTS__
function cs(e) {
  return new lo({
    check: "string_format",
    format: "lowercase",
    ...g(e)
  });
}
// @__NO_SIDE_EFFECTS__
function us(e) {
  return new fo({
    check: "string_format",
    format: "uppercase",
    ...g(e)
  });
}
// @__NO_SIDE_EFFECTS__
function ls(e, t) {
  return new po({
    check: "string_format",
    format: "includes",
    ...g(t),
    includes: e
  });
}
// @__NO_SIDE_EFFECTS__
function fs(e, t) {
  return new ho({
    check: "string_format",
    format: "starts_with",
    ...g(t),
    prefix: e
  });
}
// @__NO_SIDE_EFFECTS__
function ds(e, t) {
  return new mo({
    check: "string_format",
    format: "ends_with",
    ...g(t),
    suffix: e
  });
}
// @__NO_SIDE_EFFECTS__
function re(e) {
  return new go({
    check: "overwrite",
    tx: e
  });
}
// @__NO_SIDE_EFFECTS__
function ps(e) {
  return /* @__PURE__ */ re((t) => t.normalize(e));
}
// @__NO_SIDE_EFFECTS__
function hs() {
  return /* @__PURE__ */ re((e) => e.trim());
}
// @__NO_SIDE_EFFECTS__
function ms() {
  return /* @__PURE__ */ re((e) => e.toLowerCase());
}
// @__NO_SIDE_EFFECTS__
function gs() {
  return /* @__PURE__ */ re((e) => e.toUpperCase());
}
// @__NO_SIDE_EFFECTS__
function _s() {
  return /* @__PURE__ */ re((e) => Wn(e));
}
// @__NO_SIDE_EFFECTS__
function ys(e, t, n) {
  return new e({
    type: "array",
    element: t,
    // get element() {
    //   return element;
    // },
    ...g(n)
  });
}
// @__NO_SIDE_EFFECTS__
function bs(e, t, n) {
  return new e({
    type: "custom",
    check: "custom",
    fn: t,
    ...g(n)
  });
}
// @__NO_SIDE_EFFECTS__
function ws(e, t) {
  const n = /* @__PURE__ */ vs((r) => (r.addIssue = (o) => {
    if (typeof o == "string")
      r.issues.push(ce(o, r.value, n._zod.def));
    else {
      const i = o;
      i.fatal && (i.continue = !1), i.code ?? (i.code = "custom"), "input" in i || (i.input = r.value), i.inst ?? (i.inst = n), i.continue ?? (i.continue = !n._zod.def.abort), r.issues.push(ce(i));
    }
  }, e(r.value, r)), t);
  return n;
}
// @__NO_SIDE_EFFECTS__
function vs(e, t) {
  const n = new A({
    check: "custom",
    ...g(t)
  });
  return n._zod.check = e, n;
}
function ae(e, ...t) {
  for (const n of t)
    for (const r of Reflect.ownKeys(n))
      Object.prototype.propertyIsEnumerable.call(n, r) && N(e, r, n[r]);
  return e;
}
function vn(e) {
  let t = e?.target ?? "draft-2020-12";
  return t === "draft-4" && (t = "draft-04"), t === "draft-7" && (t = "draft-07"), {
    processors: e.processors ?? {},
    metadataRegistry: e?.metadata ?? se,
    target: t,
    unrepresentable: e?.unrepresentable ?? "throw",
    override: e?.override ?? (() => {
    }),
    io: e?.io ?? "output",
    counter: 0,
    seen: /* @__PURE__ */ new Map(),
    sharedDefsExtractedFor: void 0,
    sharedEmitDoneFor: void 0,
    cycles: e?.cycles ?? "ref",
    reused: e?.reused ?? "inline",
    intersections: [],
    deferred: [],
    external: e?.external ?? void 0
  };
}
function K(e, t, n, r, o) {
  const i = typeof t.unrepresentable == "function" ? t.unrepresentable({ zodSchema: e, path: r.path, message: o }) : t.unrepresentable;
  if (i === "any")
    return !1;
  if (i === void 0 || i === "throw")
    throw new Error(o);
  return Object.assign(n, i), !0;
}
function E(e, t, n = { path: [], schemaPath: [] }) {
  var r;
  const o = e._zod.def, i = t.seen.get(e);
  if (i)
    return i.count++, n.schemaPath.includes(e) && (i.cycle = n.path), i.schema;
  const s = { schema: {}, count: 1, cycle: void 0, path: n.path };
  t.seen.set(e, s), t.sharedDefsExtractedFor = void 0, t.sharedEmitDoneFor = void 0;
  const a = e._zod.toJSONSchema?.();
  if (a)
    s.schema = a;
  else {
    const l = {
      ...n,
      schemaPath: [...n.schemaPath, e],
      path: n.path
    };
    if (e._zod.processJSONSchema)
      e._zod.processJSONSchema(t, s.schema, l);
    else {
      const p = s.schema, h = t.processors[o.type];
      if (!h)
        throw new Error(`[toJSONSchema]: Non-representable type encountered: ${o.type}`);
      h(e, t, p, l);
    }
    const d = e._zod.parent;
    d && (s.ref || (s.ref = d), E(d, t, l), t.seen.get(d).isParent = !0);
  }
  const c = t.metadataRegistry.get(e);
  return c && ae(s.schema, c), t.io === "input" && I(e) && (delete s.schema.examples, delete s.schema.default), t.io === "input" && "_prefault" in s.schema && ((r = s.schema).default ?? (r.default = s.schema._prefault)), delete s.schema._prefault, t.seen.get(e).schema;
}
function Zt(e) {
  return e.replace(/~/g, "~0").replace(/\//g, "~1");
}
function kn(e, t) {
  const n = e.seen.get(t);
  if (!n)
    throw new Error("Unprocessed schema. This is a bug in Zod.");
  if (e.external && e.sharedDefsExtractedFor === e.external)
    return;
  const r = /* @__PURE__ */ new Map();
  for (const s of e.seen.entries()) {
    const a = e.metadataRegistry.get(s[0])?.id;
    if (a) {
      const c = r.get(a);
      if (c && c !== s[0])
        throw new Error(`Duplicate schema id "${a}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);
      r.set(a, s[0]);
    }
  }
  const o = (s) => {
    const a = e.target === "draft-2020-12" ? "$defs" : "definitions";
    if (e.external) {
      const d = e.external.registry.get(s[0])?.id, p = e.external.uri ?? ((m) => m);
      if (d)
        return { ref: p(d) };
      const h = s[1].defId ?? s[1].schema.id ?? `schema${e.counter++}`;
      return s[1].defId = h, { defId: h, ref: `${p("__shared")}#/${a}/${Zt(h)}` };
    }
    const c = "#", u = `${c}/${a}/`;
    if (s[1] === n && !s[1].schema.id)
      return { ref: c };
    const l = s[1].schema.id ?? `__schema${e.counter++}`;
    return { defId: l, ref: u + Zt(l) };
  }, i = (s) => {
    if (s[1].schema.$ref)
      return;
    const a = s[1], { ref: c, defId: u } = o(s);
    a.def = { ...a.schema }, u && (a.defId = u);
    const l = a.schema;
    for (const d in l)
      delete l[d];
    l.$ref = c;
  };
  if (e.cycles === "throw")
    for (const s of e.seen.entries()) {
      const a = s[1];
      if (a.cycle)
        throw new Error(`Cycle detected: #/${a.cycle?.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`);
    }
  for (const s of e.seen.entries()) {
    const a = s[1];
    if (t === s[0]) {
      i(s);
      continue;
    }
    if (e.external) {
      const u = e.external.registry.get(s[0])?.id;
      if (t !== s[0] && u) {
        i(s);
        continue;
      }
    }
    if (e.metadataRegistry.get(s[0])?.id) {
      i(s);
      continue;
    }
    if (a.cycle) {
      i(s);
      continue;
    }
    if (a.count > 1 && e.reused === "ref") {
      i(s);
      continue;
    }
  }
  e.external && (e.sharedDefsExtractedFor = e.external);
}
function zn(e) {
  const t = e.anyOf;
  if (!Array.isArray(t) || t.length === 0 || e.type !== void 0)
    return;
  const n = [];
  for (const r of t) {
    if (!r || typeof r != "object")
      return;
    zn(r);
    const o = Object.keys(r);
    if (o.length !== 1 || o[0] !== "type")
      return;
    const i = r.type;
    for (const s of Array.isArray(i) ? i : [i]) {
      if (typeof s != "string")
        return;
      n.includes(s) || n.push(s);
    }
  }
  delete e.anyOf, e.type = n.length === 1 ? n[0] : n;
}
const Sn = /* @__PURE__ */ new Set(["type", "properties", "required", "additionalProperties"]), Dt = ["oneOf", "anyOf"];
function Rt(e) {
  const t = e.additionalProperties;
  return t === void 0 || t === !1 || typeof t != "object" || t === null ? null : Object.keys(t).length ? t : null;
}
function Fe(e) {
  const t = [];
  for (const i of e) {
    if (typeof i != "object" || i.type !== "object")
      return null;
    for (const s in i)
      if (!Sn.has(s))
        return null;
    t.push(i);
  }
  const n = {}, r = /* @__PURE__ */ new Set();
  for (const i of t) {
    for (const s in i.properties) {
      if (Object.prototype.hasOwnProperty.call(n, s))
        continue;
      const a = [];
      for (const u of t) {
        const l = u.properties?.[s] ?? Rt(u);
        l != null && (a.some((d) => JSON.stringify(d) === JSON.stringify(l)) || a.push(l));
      }
      const c = a.length === 1 ? a[0] : Fe(a) ?? { allOf: a };
      N(n, s, c);
    }
    for (const s of i.required ?? [])
      r.add(s);
  }
  const o = { type: "object", properties: n };
  if (r.size && (o.required = [...r]), t.every((i) => i.additionalProperties === !1))
    o.additionalProperties = !1;
  else {
    const i = [];
    for (const s of t) {
      const a = Rt(s);
      a && !i.some((c) => JSON.stringify(c) === JSON.stringify(a)) && i.push(a);
    }
    i.length === 1 ? o.additionalProperties = i[0] : i.length > 1 && (o.additionalProperties = { allOf: i });
  }
  return o;
}
function ks(e) {
  const t = e.allOf;
  if (!Array.isArray(t) || t.length < 2)
    return;
  for (const o of Sn)
    if (o in e)
      return;
  const n = t.filter((o) => Dt.some((i) => Array.isArray(o[i])));
  let r = null;
  if (!n.length)
    r = Fe(t);
  else {
    const o = n[0], i = Dt.find((c) => Array.isArray(o[c]));
    if (Object.keys(o).length !== 1)
      return;
    const s = t.filter((c) => c !== o), a = o[i].map((c) => Fe([...s, c]));
    if (a.some((c) => !c))
      return;
    r = { [i]: a };
  }
  r && (delete e.allOf, ae(e, r));
}
function On(e, t) {
  const n = e.seen.get(t);
  if (!n)
    throw new Error("Unprocessed schema. This is a bug in Zod.");
  const r = (a) => {
    const c = e.seen.get(a);
    if (c.ref === null)
      return;
    const u = c.def ?? c.schema, l = { ...u }, d = c.ref;
    if (c.ref = null, d) {
      r(d);
      const h = e.seen.get(d), m = h.schema;
      if (m.$ref && (e.target === "draft-07" || e.target === "draft-04" || e.target === "openapi-3.0") ? (u.allOf = u.allOf ?? [], u.allOf.push(m)) : ae(u, m), ae(u, l), a._zod.parent === d)
        for (const y in u)
          y === "$ref" || y === "allOf" || y in l || delete u[y];
      if (m.$ref && h.def)
        for (const y in u)
          y === "$ref" || y === "allOf" || y in h.def && JSON.stringify(u[y]) === JSON.stringify(h.def[y]) && delete u[y];
    }
    const p = a._zod.parent;
    if (p && p !== d) {
      r(p);
      const h = e.seen.get(p);
      if (h?.schema.$ref && (u.$ref = h.schema.$ref, h.def))
        for (const m in u)
          m === "$ref" || m === "allOf" || m in h.def && JSON.stringify(u[m]) === JSON.stringify(h.def[m]) && delete u[m];
    }
    e.override({
      zodSchema: a,
      jsonSchema: u,
      path: c.path ?? []
    });
  };
  if (!e.external || e.sharedEmitDoneFor !== e.external) {
    for (const a of [...e.seen.entries()].reverse())
      r(a[0]);
    if (e.target !== "openapi-3.0")
      for (const a of e.seen.entries())
        zn(a[1].def ?? a[1].schema);
    for (const a of e.deferred)
      a();
    if (e.intersections.length) {
      const a = /* @__PURE__ */ new Map();
      for (const c of e.seen.values())
        for (const u of [c.schema, c.def]) {
          const l = u?.allOf;
          if (!Array.isArray(l))
            continue;
          const d = a.get(l);
          d ? d.push(u) : a.set(l, [u]);
        }
      for (const c of e.intersections)
        for (const u of a.get(c) ?? [])
          ks(u);
    }
  }
  const o = {};
  if (e.target === "draft-2020-12" ? o.$schema = "https://json-schema.org/draft/2020-12/schema" : e.target === "draft-07" ? o.$schema = "http://json-schema.org/draft-07/schema#" : e.target === "draft-04" ? o.$schema = "http://json-schema.org/draft-04/schema#" : e.target, e.external?.uri) {
    const a = e.external.registry.get(t)?.id;
    if (!a)
      throw new Error("Schema is missing an `id` property");
    o.$id = e.external.uri(a);
  }
  ae(o, n.defId ? n.schema : n.def ?? n.schema);
  const i = e.metadataRegistry.get(t)?.id;
  i !== void 0 && o.id === i && delete o.id;
  const s = e.external?.defs ?? {};
  if (!e.external || e.sharedEmitDoneFor !== e.external)
    for (const a of e.seen.entries()) {
      const c = a[1];
      c.def && c.defId && (c.def.id === c.defId && delete c.def.id, N(s, c.defId, c.def));
    }
  e.external && (e.sharedEmitDoneFor = e.external), e.external || Object.keys(s).length > 0 && (e.target === "draft-2020-12" ? o.$defs = s : o.definitions = s);
  try {
    const a = JSON.parse(JSON.stringify(o));
    return Object.defineProperty(a, "~standard", {
      value: {
        ...t["~standard"],
        jsonSchema: {
          input: ke(t, "input", e.processors),
          output: ke(t, "output", e.processors)
        }
      },
      enumerable: !1,
      writable: !1
    }), a;
  } catch {
    throw new Error("Error converting schema to JSON.");
  }
}
function I(e, t) {
  const n = t ?? { seen: /* @__PURE__ */ new Set() };
  if (n.seen.has(e))
    return !1;
  n.seen.add(e);
  const r = e._zod.def;
  if (r.type === "transform")
    return !0;
  if (r.type === "array")
    return I(r.element, n);
  if (r.type === "set")
    return I(r.valueType, n);
  if (r.type === "lazy")
    return I(r.getter(), n);
  if (r.type === "promise" || r.type === "optional" || r.type === "nonoptional" || r.type === "nullable" || r.type === "readonly" || r.type === "default" || r.type === "prefault" || r.type === "catch")
    return I(r.innerType, n);
  if (r.type === "intersection")
    return I(r.left, n) || I(r.right, n);
  if (r.type === "record" || r.type === "map")
    return I(r.keyType, n) || I(r.valueType, n);
  if (r.type === "pipe")
    return e._zod.traits.has("$ZodCodec") ? !0 : I(r.in, n) || I(r.out, n);
  if (r.type === "object") {
    for (const o in r.shape)
      if (I(r.shape[o], n))
        return !0;
    return !1;
  }
  if (r.type === "union") {
    for (const o of r.options)
      if (I(o, n))
        return !0;
    return !1;
  }
  if (r.type === "tuple") {
    for (const o of r.items)
      if (I(o, n))
        return !0;
    return !!(r.rest && I(r.rest, n));
  }
  return !1;
}
const zs = (e, t = {}) => (n) => {
  const r = vn({ ...n, processors: t });
  return E(e, r), kn(r, e), On(r, e);
}, ke = (e, t, n = {}) => (r) => {
  const { libraryOptions: o, target: i } = r ?? {}, s = vn({ ...o ?? {}, target: i, io: t, processors: n });
  return E(e, s), kn(s, e), On(s, e);
}, Ss = {
  guid: "uuid",
  url: "uri",
  datetime: "date-time",
  json_string: "json-string",
  regex: ""
  // do not set
}, Os = (e, t, n, r) => {
  const o = n;
  o.type = "string";
  const { minimum: i, maximum: s, format: a, patterns: c, contentEncoding: u, laxFormat: l } = e._zod.bag;
  if (typeof i == "number" && (o.minLength = i), typeof s == "number" && (o.maxLength = s), a && (o.format = Ss[a] ?? a, o.format === "" && delete o.format, (a === "time" || l) && delete o.format), u && (o.contentEncoding = u), c && c.size > 0) {
    const d = [...c];
    d.length === 1 ? o.pattern = d[0].source : d.length > 1 && (o.allOf = [
      ...d.map((p) => ({
        ...t.target === "draft-07" || t.target === "draft-04" || t.target === "openapi-3.0" ? { type: "string" } : {},
        pattern: p.source
      }))
    ]);
  }
}, Es = (e, t, n, r) => {
  const o = n, { minimum: i, maximum: s, format: a, multipleOf: c, exclusiveMaximum: u, exclusiveMinimum: l } = e._zod.bag;
  typeof a == "string" && a.includes("int") ? o.type = "integer" : o.type = "number";
  const d = typeof l == "number" && l >= (i ?? Number.NEGATIVE_INFINITY), p = typeof u == "number" && u <= (s ?? Number.POSITIVE_INFINITY), h = t.target === "draft-04" || t.target === "openapi-3.0";
  d ? h ? (o.minimum = l, o.exclusiveMinimum = !0) : o.exclusiveMinimum = l : typeof i == "number" && (o.minimum = i), p ? h ? (o.maximum = u, o.exclusiveMaximum = !0) : o.exclusiveMaximum = u : typeof s == "number" && (o.maximum = s), typeof c == "number" && (Number.isFinite(c) && c !== 0 ? o.multipleOf = Math.abs(c) : K(e, t, o, r, `A multipleOf divisor of ${c} cannot be represented in JSON Schema`));
}, $s = (e, t, n, r) => {
  n.type = "boolean";
}, Ts = (e, t, n, r) => {
  n.not = {};
}, Is = (e, t, n, r) => {
}, Ps = (e, t, n, r) => {
  const o = e._zod.def, i = Ht(o.entries);
  if (i.length === 0) {
    n.not = {};
    return;
  }
  i.every((s) => typeof s == "number") && (n.type = "number"), i.every((s) => typeof s == "string") && (n.type = "string"), n.enum = i;
}, Ns = (e, t, n, r) => {
  const o = e._zod.def;
  if (o.values.length === 0) {
    n.not = {};
    return;
  }
  const i = [];
  for (const s of o.values)
    if (s === void 0) {
      if (K(e, t, n, r, "Literal `undefined` cannot be represented in JSON Schema"))
        return;
    } else if (typeof s == "bigint") {
      if (K(e, t, n, r, "BigInt literals cannot be represented in JSON Schema"))
        return;
      i.push(Number(s));
    } else
      i.push(s);
  if (i.length !== 0) if (i.length === 1) {
    const s = i[0];
    n.type = s === null ? "null" : typeof s, t.target === "draft-04" || t.target === "openapi-3.0" ? n.enum = [s] : n.const = s;
  } else
    i.every((s) => typeof s == "number") && (n.type = "number"), i.every((s) => typeof s == "string") && (n.type = "string"), i.every((s) => typeof s == "boolean") && (n.type = "boolean"), i.every((s) => s === null) && (n.type = "null"), n.enum = i;
}, As = (e, t, n, r) => {
  K(e, t, n, r, "Custom types cannot be represented in JSON Schema");
}, Zs = (e, t, n, r) => {
  K(e, t, n, r, "Transforms cannot be represented in JSON Schema");
}, Ds = (e, t, n, r) => {
  const o = n, i = e._zod.def, { minimum: s, maximum: a } = e._zod.bag;
  typeof s == "number" && (o.minItems = s), typeof a == "number" && (o.maxItems = a), o.type = "array", o.items = E(i.element, t, {
    ...r,
    path: [...r.path, "items"]
  });
};
function ze(e) {
  const t = e._zod.def;
  return t.type === "pipe" && t.in._zod.traits.has("$ZodTransform") ? ze(t.out) : t.type === "catch" ? ze(t.innerType) : e._zod.optin;
}
const Rs = (e, t, n, r) => {
  const o = n, i = e._zod.def, s = i.shape;
  if (Object.getOwnPropertySymbols(s).length && K(e, t, o, r, "Symbol keys cannot be represented in JSON Schema"))
    return;
  o.type = "object", o.properties = {};
  for (const l in s)
    N(o.properties, l, E(s[l], t, {
      ...r,
      path: [...r.path, "properties", l]
    }));
  const c = new Set(Object.keys(s)), u = new Set([...c].filter((l) => {
    const d = i.shape[l];
    return t.io === "input" ? ze(d) === void 0 : d._zod.optout === void 0;
  }));
  u.size > 0 && (o.required = Array.from(u)), i.catchall?._zod.def.type === "never" ? o.additionalProperties = !1 : i.catchall ? i.catchall && (o.additionalProperties = E(i.catchall, t, {
    ...r,
    path: [...r.path, "additionalProperties"]
  })) : t.io === "output" && (o.additionalProperties = !1);
}, js = (e, t, n, r) => {
  const o = e._zod.def, i = o.inclusive === !1, s = o.options.map((a, c) => E(a, t, {
    ...r,
    path: [...r.path, i ? "oneOf" : "anyOf", c]
  }));
  i ? n.oneOf = s : n.anyOf = s;
}, Cs = (e, t, n, r) => {
  const o = e._zod.def, i = E(o.left, t, {
    ...r,
    path: [...r.path, "allOf", 0]
  }), s = E(o.right, t, {
    ...r,
    path: [...r.path, "allOf", 1]
  }), a = (u) => "allOf" in u && Object.keys(u).length === 1, c = [
    ...a(i) ? i.allOf : [i],
    ...a(s) ? s.allOf : [s]
  ];
  n.allOf = c, t.intersections.push(c);
};
function Le(e, t, n) {
  if (t.$ref) {
    if (n.has(t))
      return t;
    n.add(t);
    const m = e.get(t)?.def;
    if (!m)
      return t;
    const _ = Le(e, m, n);
    return _ === m ? t : _;
  }
  for (const m of ["anyOf", "oneOf"]) {
    const _ = t[m];
    if (!Array.isArray(_))
      continue;
    const y = _.map((T) => Le(e, T, n));
    y.some((T, j) => T !== _[j]) && (t = { ...t, [m]: y });
  }
  const r = Array.isArray(t.type) ? t.type : [t.type], o = !r.includes("string") && r.some((m) => m === "number" || m === "integer"), i = t.enum ?? (t.const !== void 0 ? [t.const] : void 0);
  if (!o && !i?.some((m) => typeof m == "number"))
    return t;
  const { minimum: s, maximum: a, exclusiveMinimum: c, exclusiveMaximum: u, multipleOf: l, format: d, id: p, ...h } = t;
  return h.enum ? h.enum = h.enum.map((m) => typeof m == "number" ? String(m) : m) : typeof h.const == "number" && (h.const = String(h.const)), o && (h.type = "string", i || (h.pattern = (r.includes("number") ? Xe : sn).source)), h;
}
const Je = /* @__PURE__ */ new WeakMap();
function xs(e) {
  const t = /* @__PURE__ */ new Map();
  for (const r of e.seen.values())
    r.def && !t.has(r.schema) && t.set(r.schema, r);
  const n = /* @__PURE__ */ new Map();
  for (const r of Je.get(e) ?? []) {
    const o = e.seen.get(r), i = (o?.def ?? o?.schema)?.propertyNames;
    if (!i || i === !0 || n.has(i))
      continue;
    const s = Le(t, i, /* @__PURE__ */ new Set());
    s !== i && n.set(i, s);
  }
  if (n.size)
    for (const r of e.seen.values())
      for (const o of [r.schema, r.def]) {
        const i = o && n.get(o.propertyNames);
        i && (o.propertyNames = i);
      }
}
const Us = (e, t, n, r) => {
  const o = n, i = e._zod.def;
  o.type = "object";
  const s = i.keyType, c = s._zod.bag?.patterns;
  if (i.mode === "loose" && c && c.size > 0) {
    const d = E(i.valueType, t, {
      ...r,
      path: [...r.path, "patternProperties", "*"]
    });
    o.patternProperties = {};
    for (const p of c)
      N(o.patternProperties, p.source, d);
  } else {
    if (t.target === "draft-07" || t.target === "draft-2020-12") {
      o.propertyNames = E(i.keyType, t, {
        ...r,
        path: [...r.path, "propertyNames"]
      });
      let d = Je.get(t);
      d || (d = [], Je.set(t, d), t.deferred.push(() => xs(t))), d.push(e);
    }
    o.additionalProperties = E(i.valueType, t, {
      ...r,
      path: [...r.path, "additionalProperties"]
    });
  }
  const u = s._zod.values, l = t.io === "input" && ze(i.valueType) !== void 0;
  if (u && !i.partial && !l) {
    const d = [...u].filter((p) => typeof p == "string" || typeof p == "number");
    d.length > 0 && (o.required = d.map(String));
  }
}, Ms = (e, t, n, r) => {
  const o = e._zod.def, i = E(o.innerType, t, r), s = t.seen.get(e);
  t.target === "openapi-3.0" ? (s.ref = o.innerType, n.nullable = !0) : n.anyOf = [i, { type: "null" }];
}, Fs = (e, t, n, r) => {
  const o = e._zod.def;
  E(o.innerType, t, r);
  const i = t.seen.get(e);
  i.ref = o.innerType;
}, tt = /* @__PURE__ */ Symbol();
function En(e, t, n, r, o) {
  let i = !1;
  const s = JSON.stringify(e, (a, c) => typeof c != "bigint" ? c : (i = !0, null));
  return i ? (K(t, n, r, o, "BigInt defaults cannot be represented in JSON Schema"), tt) : JSON.parse(s);
}
const Ls = (e, t, n, r) => {
  const o = e._zod.def;
  E(o.innerType, t, r);
  const i = t.seen.get(e);
  i.ref = o.innerType;
  const s = En(o.defaultValue, e, t, n, r);
  s !== tt && (n.default = s);
}, Js = (e, t, n, r) => {
  const o = e._zod.def;
  E(o.innerType, t, r);
  const i = t.seen.get(e);
  if (i.ref = o.innerType, t.io !== "input")
    return;
  const s = En(o.defaultValue, e, t, n, r);
  s !== tt && (n._prefault = s);
}, Bs = (e, t, n, r) => {
  const o = e._zod.def;
  E(o.innerType, t, r);
  const i = t.seen.get(e);
  i.ref = o.innerType;
  let s;
  try {
    s = o.catchValue(void 0);
  } catch {
    K(e, t, n, r, "Dynamic catch values are not supported in JSON Schema");
    return;
  }
  n.default = s;
}, Ks = (e, t, n, r) => {
  const o = e._zod.def, i = o.in._zod.traits.has("$ZodTransform"), s = t.io === "input" ? i ? o.out : o.in : o.out;
  E(s, t, r);
  const a = t.seen.get(e);
  a.ref = s;
}, Vs = (e, t, n, r) => {
  const o = e._zod.def;
  E(o.innerType, t, r);
  const i = t.seen.get(e);
  i.ref = o.innerType, n.readOnly = !0;
}, $n = (e, t, n, r) => {
  const o = e._zod.def;
  E(o.innerType, t, r);
  const i = t.seen.get(e);
  i.ref = o.innerType;
}, jt = /* @__PURE__ */ new WeakSet([Object.prototype, Error.prototype]);
function he(e, t, n) {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    get() {
      const r = n(this);
      return Object.defineProperty(this, t, { value: r, configurable: !0, writable: !0 }), r;
    },
    set(r) {
      Object.defineProperty(this, t, { value: r, configurable: !0, writable: !0 });
    }
  });
}
const Tn = (e, t) => {
  tn.init(e, t), e.name = "ZodError";
  const n = Object.getPrototypeOf(e);
  jt.has(n) || (jt.add(n), he(n, "format", (r) => (o) => wr(r, o)), he(n, "flatten", (r) => (o) => br(r, o)), he(n, "addIssue", (r) => (o) => {
    r.issues.push(o), r.message = JSON.stringify(r.issues, Ce, 2);
  }), he(n, "addIssues", (r) => (o) => {
    r.issues.push(...o), r.message = JSON.stringify(r.issues, Ce, 2);
  }), Object.defineProperty(n, "isEmpty", {
    configurable: !0,
    enumerable: !1,
    get() {
      return this.issues.length === 0;
    }
  }));
}, In = /* @__PURE__ */ f("ZodError", Tn), R = /* @__PURE__ */ f("ZodError", Tn, void 0, {
  Parent: Error
}), Ws = /* @__PURE__ */ Ye(R), Hs = /* @__PURE__ */ qe(R), Gs = /* @__PURE__ */ Oe(R), Ys = /* @__PURE__ */ Ee(R), qs = /* @__PURE__ */ zr(R), Xs = /* @__PURE__ */ Sr(R), Qs = /* @__PURE__ */ Or(R), ea = /* @__PURE__ */ Er(R), ta = /* @__PURE__ */ $r(R), na = /* @__PURE__ */ Tr(R), ra = /* @__PURE__ */ Ir(R), oa = /* @__PURE__ */ Pr(R);
function ia() {
  C.localeError || F(Ei());
}
function Te() {
  C.memoizer || F({ memoizer: zi() });
}
const S = /* @__PURE__ */ f("ZodType", (e, t) => (ia(), z.init(e, t), e.def = t, e.type = t.type, e), {
  check(...e) {
    const t = this.def;
    return this.clone(V(t, {
      checks: [
        ...t.checks ?? [],
        ...e.map((n) => typeof n == "function" ? { _zod: { check: n, def: { check: "custom" }, onattach: [] } } : n)
      ]
    }), { parent: !0 });
  },
  with(...e) {
    return this.check(...e);
  },
  clone(e, t) {
    return W(this, e, t);
  },
  brand() {
    return this;
  },
  register(e, t) {
    return e.add(this, t), this;
  },
  refine(e, t) {
    return this.check(sc(e, t));
  },
  superRefine(e, t) {
    return this.check(ac(e, t));
  },
  overwrite(e) {
    return this.check(/* @__PURE__ */ re(e));
  },
  optional() {
    return Ut(this);
  },
  exactOptional() {
    return Wa(this);
  },
  nullable() {
    return Mt(this);
  },
  nullish() {
    return Ut(Mt(this));
  },
  nonoptional(e) {
    return Qa(this, e);
  },
  array() {
    return G(this);
  },
  or(e) {
    return xa([this, e]);
  },
  and(e) {
    return Ma(this, e);
  },
  transform(e) {
    return Ft(this, Va(e));
  },
  default(e) {
    return Ya(this, e);
  },
  prefault(e) {
    return Xa(this, e);
  },
  catch(e) {
    return tc(this, e);
  },
  pipe(e) {
    return Ft(this, e);
  },
  readonly() {
    return oc(this);
  },
  describe(e) {
    const t = this.clone();
    return se.add(t, { description: e }), t;
  },
  meta(...e) {
    if (e.length === 0)
      return se.get(this);
    const t = this.clone();
    return se.add(t, e[0]), t;
  },
  isOptional() {
    return this.safeParse(void 0).success;
  },
  isNullable() {
    return this.safeParse(null).success;
  },
  apply(e, ...t) {
    return t.length === 0 ? e(this) : e(this, ...t);
  },
  // Overrides core's `~standard` to add `jsonSchema`. Must stay a prototype entry: redefining it per instance demotes instances to dictionary mode.
  get "~standard"() {
    return Xt(this, "~standard", {
      ...un(this),
      jsonSchema: {
        input: ke(this, "input"),
        output: ke(this, "output")
      }
    });
  },
  set "~standard"(e) {
    ne(this, "~standard", e);
  },
  parse: function e(t, n) {
    return Ws(this, t, n, { callee: e });
  },
  parseAsync: async function e(t, n) {
    return await Hs(this, t, n, { callee: e });
  },
  safeParse(e, t) {
    return Gs(this, e, t);
  },
  async safeParseAsync(e, t) {
    return Ys(this, e, t);
  },
  // `spa` is an alias: same function object as `safeParseAsync`, as before.
  get spa() {
    return this?.safeParseAsync;
  },
  set spa(e) {
    ne(this, "spa", e);
  },
  encode: function e(t, n) {
    return qs(this, t, n, { callee: e });
  },
  decode: function e(t, n) {
    return Xs(this, t, n, { callee: e });
  },
  encodeAsync: async function e(t, n) {
    return await Qs(this, t, n, { callee: e });
  },
  decodeAsync: async function e(t, n) {
    return await ea(this, t, n, { callee: e });
  },
  safeEncode(e, t) {
    return ta(this, e, t);
  },
  safeDecode(e, t) {
    return na(this, e, t);
  },
  async safeEncodeAsync(e, t) {
    return ra(this, e, t);
  },
  async safeDecodeAsync(e, t) {
    return oa(this, e, t);
  },
  toJSONSchema(e) {
    return zs(this, {})(e);
  },
  // Reads through to the registry on every access, so it must not cache.
  get description() {
    return se.get(this)?.description;
  },
  // No setter: `schema._def = x` throws, as it did when `_def` was a non-writable own property.
  get _def() {
    return this._zod.def;
  }
}), Pn = /* @__PURE__ */ f("_ZodString", (e, t) => {
  et.init(e, t), S.init(e, t), e._zod.processJSONSchema = (r, o, i) => Os(e, r, o);
  const n = e._zod.bag;
  e.format = n.format ?? null, e.minLength = n.minimum ?? null, e.maxLength = n.maximum ?? null;
}, {
  regex(...e) {
    return this.check(/* @__PURE__ */ as(...e));
  },
  includes(...e) {
    return this.check(/* @__PURE__ */ ls(...e));
  },
  startsWith(...e) {
    return this.check(/* @__PURE__ */ fs(...e));
  },
  endsWith(...e) {
    return this.check(/* @__PURE__ */ ds(...e));
  },
  min(...e) {
    return this.check(/* @__PURE__ */ ve(...e));
  },
  max(...e) {
    return this.check(/* @__PURE__ */ bn(...e));
  },
  length(...e) {
    return this.check(/* @__PURE__ */ wn(...e));
  },
  nonempty(...e) {
    return this.check(/* @__PURE__ */ ve(1, ...e));
  },
  lowercase(e) {
    return this.check(/* @__PURE__ */ cs(e));
  },
  uppercase(e) {
    return this.check(/* @__PURE__ */ us(e));
  },
  trim() {
    return this.check(/* @__PURE__ */ hs());
  },
  normalize(...e) {
    return this.check(/* @__PURE__ */ ps(...e));
  },
  toLowerCase() {
    return this.check(/* @__PURE__ */ ms());
  },
  toUpperCase() {
    return this.check(/* @__PURE__ */ gs());
  },
  slugify() {
    return this.check(/* @__PURE__ */ _s());
  }
}), sa = /* @__PURE__ */ f("ZodString", (e, t) => {
  et.init(e, t), Pn.init(e, t);
}, {
  email(e) {
    return this.check(/* @__PURE__ */ Pi(fa, e));
  },
  url(e) {
    return this.check(/* @__PURE__ */ ji(pa, e));
  },
  jwt(e) {
    return this.check(/* @__PURE__ */ qi(Ta, e));
  },
  emoji(e) {
    return this.check(/* @__PURE__ */ Ci(ha, e));
  },
  guid(e) {
    return this.check(/* @__PURE__ */ Ni(da, e));
  },
  uuid(e) {
    return this.check(/* @__PURE__ */ Ai(me, e));
  },
  uuidv4(e) {
    return this.check(/* @__PURE__ */ Zi(me, e));
  },
  uuidv6(e) {
    return this.check(/* @__PURE__ */ Di(me, e));
  },
  uuidv7(e) {
    return this.check(/* @__PURE__ */ Ri(me, e));
  },
  nanoid(e) {
    return this.check(/* @__PURE__ */ xi(ma, e));
  },
  cuid(e) {
    return this.check(/* @__PURE__ */ Ui(ga, e));
  },
  cuid2(e) {
    return this.check(/* @__PURE__ */ Mi(_a, e));
  },
  ulid(e) {
    return this.check(/* @__PURE__ */ Fi(ya, e));
  },
  base64(e) {
    return this.check(/* @__PURE__ */ Hi(Oa, e));
  },
  base64url(e) {
    return this.check(/* @__PURE__ */ Gi(Ea, e));
  },
  xid(e) {
    return this.check(/* @__PURE__ */ Li(ba, e));
  },
  ksuid(e) {
    return this.check(/* @__PURE__ */ Ji(wa, e));
  },
  ipv4(e) {
    return this.check(/* @__PURE__ */ Bi(va, e));
  },
  ipv6(e) {
    return this.check(/* @__PURE__ */ Ki(ka, e));
  },
  cidrv4(e) {
    return this.check(/* @__PURE__ */ Vi(za, e));
  },
  cidrv6(e) {
    return this.check(/* @__PURE__ */ Wi(Sa, e));
  },
  e164(e) {
    return this.check(/* @__PURE__ */ Yi($a, e));
  },
  datetime(e) {
    return this.check(/* @__PURE__ */ Xi(aa, e));
  },
  date(e) {
    return this.check(/* @__PURE__ */ Qi(ca, e));
  },
  time(e) {
    return this.check(/* @__PURE__ */ es(ua, e));
  },
  duration(e) {
    return this.check(/* @__PURE__ */ ts(la, e));
  }
});
function D(e) {
  return /* @__PURE__ */ Ii(sa, e);
}
const O = /* @__PURE__ */ f("ZodStringFormat", (e, t) => {
  k.init(e, t), Pn.init(e, t);
}), aa = /* @__PURE__ */ f("ZodISODateTime", (e, t) => {
  Ro.init(e, t), O.init(e, t);
}), ca = /* @__PURE__ */ f("ZodISODate", (e, t) => {
  jo.init(e, t), O.init(e, t);
}), ua = /* @__PURE__ */ f("ZodISOTime", (e, t) => {
  Co.init(e, t), O.init(e, t);
}), la = /* @__PURE__ */ f("ZodISODuration", (e, t) => {
  xo.init(e, t), O.init(e, t);
}), fa = /* @__PURE__ */ f("ZodEmail", (e, t) => {
  vo.init(e, t), O.init(e, t);
}), da = /* @__PURE__ */ f("ZodGUID", (e, t) => {
  bo.init(e, t), O.init(e, t);
}), me = /* @__PURE__ */ f("ZodUUID", (e, t) => {
  wo.init(e, t), O.init(e, t);
}), pa = /* @__PURE__ */ f("ZodURL", (e, t) => {
  $o.init(e, t), O.init(e, t);
}), ha = /* @__PURE__ */ f("ZodEmoji", (e, t) => {
  To.init(e, t), O.init(e, t);
}), ma = /* @__PURE__ */ f("ZodNanoID", (e, t) => {
  Io.init(e, t), O.init(e, t);
}), ga = /* @__PURE__ */ f("ZodCUID", (e, t) => {
  Po.init(e, t), O.init(e, t);
}), _a = /* @__PURE__ */ f("ZodCUID2", (e, t) => {
  No.init(e, t), O.init(e, t);
}), ya = /* @__PURE__ */ f("ZodULID", (e, t) => {
  Ao.init(e, t), O.init(e, t);
}), ba = /* @__PURE__ */ f("ZodXID", (e, t) => {
  Zo.init(e, t), O.init(e, t);
}), wa = /* @__PURE__ */ f("ZodKSUID", (e, t) => {
  Do.init(e, t), O.init(e, t);
}), va = /* @__PURE__ */ f("ZodIPv4", (e, t) => {
  Uo.init(e, t), O.init(e, t);
}), ka = /* @__PURE__ */ f("ZodIPv6", (e, t) => {
  Fo.init(e, t), O.init(e, t);
}), za = /* @__PURE__ */ f("ZodCIDRv4", (e, t) => {
  Lo.init(e, t), O.init(e, t);
}), Sa = /* @__PURE__ */ f("ZodCIDRv6", (e, t) => {
  Bo.init(e, t), O.init(e, t);
}), Oa = /* @__PURE__ */ f("ZodBase64", (e, t) => {
  Ko.init(e, t), O.init(e, t);
}), Ea = /* @__PURE__ */ f("ZodBase64URL", (e, t) => {
  Wo.init(e, t), O.init(e, t);
}), $a = /* @__PURE__ */ f("ZodE164", (e, t) => {
  Ho.init(e, t), O.init(e, t);
}), Ta = /* @__PURE__ */ f("ZodJWT", (e, t) => {
  Yo.init(e, t), O.init(e, t);
}), Nn = /* @__PURE__ */ f("ZodNumber", (e, t) => {
  hn.init(e, t), S.init(e, t), e._zod.processJSONSchema = (r, o, i) => Es(e, r, o, i);
  const n = e._zod.bag;
  e.minValue = Math.max(n.minimum ?? Number.NEGATIVE_INFINITY, n.exclusiveMinimum ?? Number.NEGATIVE_INFINITY) ?? null, e.maxValue = Math.min(n.maximum ?? Number.POSITIVE_INFINITY, n.exclusiveMaximum ?? Number.POSITIVE_INFINITY) ?? null, e.isInt = (n.format ?? "").includes("int") || Number.isSafeInteger(n.multipleOf ?? 0.5), e.isFinite = !0, e.format = n.format ?? null;
}, {
  gt(e, t) {
    return this.check(/* @__PURE__ */ Nt(e, t));
  },
  gte(e, t) {
    return this.check(/* @__PURE__ */ je(e, t));
  },
  min(e, t) {
    return this.check(/* @__PURE__ */ je(e, t));
  },
  lt(e, t) {
    return this.check(/* @__PURE__ */ Pt(e, t));
  },
  lte(e, t) {
    return this.check(/* @__PURE__ */ Re(e, t));
  },
  max(e, t) {
    return this.check(/* @__PURE__ */ Re(e, t));
  },
  int(e) {
    return this.check(Ct(e));
  },
  safe(e) {
    return this.check(Ct(e));
  },
  positive(e) {
    return this.check(/* @__PURE__ */ Nt(0, e));
  },
  nonnegative(e) {
    return this.check(/* @__PURE__ */ je(0, e));
  },
  negative(e) {
    return this.check(/* @__PURE__ */ Pt(0, e));
  },
  nonpositive(e) {
    return this.check(/* @__PURE__ */ Re(0, e));
  },
  multipleOf(e, t) {
    return this.check(/* @__PURE__ */ At(e, t));
  },
  step(e, t) {
    return this.check(/* @__PURE__ */ At(e, t));
  },
  finite() {
    return this;
  }
});
function $(e) {
  return /* @__PURE__ */ ns(Nn, e);
}
const Ia = /* @__PURE__ */ f("ZodNumberFormat", (e, t) => {
  qo.init(e, t), Nn.init(e, t);
});
function Ct(e) {
  return /* @__PURE__ */ rs(Ia, e);
}
const Pa = /* @__PURE__ */ f("ZodBoolean", (e, t) => {
  Xo.init(e, t), S.init(e, t), e._zod.processJSONSchema = (n, r, o) => $s(e, n, r);
});
function Na(e) {
  return /* @__PURE__ */ os(Pa, e);
}
const Aa = /* @__PURE__ */ f("ZodUnknown", (e, t) => {
  Qo.init(e, t), S.init(e, t), e._zod.processJSONSchema = (n, r, o) => Is();
});
function xt() {
  return /* @__PURE__ */ is(Aa);
}
const Za = /* @__PURE__ */ f("ZodNever", (e, t) => {
  ei.init(e, t), S.init(e, t), e._zod.processJSONSchema = (n, r, o) => Ts(e, n, r);
});
function Da(e) {
  return /* @__PURE__ */ ss(Za, e);
}
const Ra = /* @__PURE__ */ f("ZodArray", (e, t) => {
  Te(), ti.init(e, t), S.init(e, t), e._zod.processJSONSchema = (n, r, o) => Ds(e, n, r, o), e.element = t.element;
}, {
  min(e, t) {
    return this.check(/* @__PURE__ */ ve(e, t));
  },
  nonempty(e) {
    return this.check(/* @__PURE__ */ ve(1, e));
  },
  max(e, t) {
    return this.check(/* @__PURE__ */ bn(e, t));
  },
  length(e, t) {
    return this.check(/* @__PURE__ */ wn(e, t));
  },
  unwrap() {
    return this.element;
  }
});
function G(e, t) {
  return /* @__PURE__ */ ys(Ra, e, t);
}
const ja = /* @__PURE__ */ f("ZodObject", (e, t) => {
  Te(), oi.init(e, t), S.init(e, t), e._zod.processJSONSchema = (n, r, o) => Rs(e, n, r, o), fr(e, "shape", (n) => n._zod.def.shape, !1);
}, {
  keyof() {
    return Z(Object.keys(this._zod.def.shape));
  },
  catchall(e) {
    return this.clone({ ...this._zod.def, catchall: e });
  },
  passthrough() {
    return this.clone({ ...this._zod.def, catchall: xt() });
  },
  loose() {
    return this.clone({ ...this._zod.def, catchall: xt() });
  },
  strict() {
    return this.clone({ ...this._zod.def, catchall: Da() });
  },
  strip() {
    return this.clone({ ...this._zod.def, catchall: void 0 });
  },
  extend(e) {
    return er(this, e);
  },
  safeExtend(e) {
    return tr(this, e);
  },
  merge(e) {
    return nr(this, e);
  },
  pick(e) {
    return Xn(this, e);
  },
  omit(e) {
    return Qn(this, e);
  },
  partial(...e) {
    return lt(An, this, e[0]);
  },
  exactPartial(...e) {
    return lt(Zn, this, e[0], "exactPartial");
  },
  required(...e) {
    return rr(Dn, this, e[0]);
  }
});
function M(e, t) {
  const n = {
    type: "object",
    shape: e ?? {},
    ...g(t)
  };
  return new ja(n);
}
const Ca = /* @__PURE__ */ f("ZodUnion", (e, t) => {
  ii.init(e, t), S.init(e, t), e._zod.processJSONSchema = (n, r, o) => js(e, n, r, o), e.options = t.options;
});
function xa(e, t) {
  return new Ca({
    type: "union",
    options: e,
    ...g(t)
  });
}
const Ua = /* @__PURE__ */ f("ZodIntersection", (e, t) => {
  si.init(e, t), S.init(e, t), e._zod.processJSONSchema = (n, r, o) => Cs(e, n, r, o);
});
function Ma(e, t) {
  return new Ua({
    type: "intersection",
    left: e,
    right: t
  });
}
const Fa = /* @__PURE__ */ f("ZodRecord", (e, t) => {
  Te(), ai.init(e, t), S.init(e, t), e._zod.processJSONSchema = (n, r, o) => Us(e, n, r, o), e.keyType = t.keyType, e.valueType = t.valueType;
});
function La(e, t, n) {
  return new Fa({
    type: "record",
    keyType: e,
    valueType: t,
    ...g(n),
    partial: !0
  });
}
const Be = /* @__PURE__ */ f("ZodEnum", (e, t) => {
  ci.init(e, t), S.init(e, t), e._zod.processJSONSchema = (r, o, i) => Ps(e, r, o), e.enum = t.entries, e.options = Object.values(t.entries);
  const n = new Set(Object.keys(t.entries));
  e.extract = (r, o) => {
    const i = {};
    for (const s of r)
      if (n.has(s))
        i[s] = t.entries[s];
      else
        throw new Error(`Key ${s} not found in enum`);
    return new Be({
      ...t,
      checks: [],
      ...g(o),
      entries: i
    });
  }, e.exclude = (r, o) => {
    const i = { ...t.entries };
    for (const s of r)
      if (n.has(s))
        delete i[s];
      else
        throw new Error(`Key ${s} not found in enum`);
    return new Be({
      ...t,
      checks: [],
      ...g(o),
      entries: i
    });
  };
});
function Z(e, t) {
  const n = Array.isArray(e) ? Object.fromEntries(e.map((r) => [r, r])) : e;
  return new Be({
    type: "enum",
    entries: n,
    ...g(t)
  });
}
const Ja = /* @__PURE__ */ f("ZodLiteral", (e, t) => {
  ui.init(e, t), S.init(e, t), e._zod.processJSONSchema = (n, r, o) => Ns(e, n, r, o), e.values = new Set(t.values), Object.defineProperty(e, "value", {
    get() {
      if (t.values.length > 1)
        throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");
      return t.values[0];
    }
  });
});
function Ba(e, t) {
  return new Ja({
    type: "literal",
    values: Array.isArray(e) ? e : [e],
    ...g(t)
  });
}
const Ka = /* @__PURE__ */ f("ZodTransform", (e, t) => {
  Te(), li.init(e, t), S.init(e, t), e._zod.processJSONSchema = (n, r, o) => Zs(e, n, r, o), e._zod.parse = (n, r) => {
    if (r.direction === "backward")
      throw new Qt(e.constructor.name);
    n.addIssue = (i) => {
      if (typeof i == "string")
        n.issues.push(ce(i, n.value, t));
      else {
        const s = i;
        s.fatal && (s.continue = !1), s.code ?? (s.code = "custom"), "input" in s || (s.input = n.value), s.inst ?? (s.inst = e), n.issues.push(ce(s));
      }
    };
    const o = t.transform(n.value, n);
    return o instanceof Promise ? o.then((i) => (n.value = i, n)) : (n.value = o, n);
  };
});
function Va(e) {
  return new Ka({
    type: "transform",
    transform: e
  });
}
const An = /* @__PURE__ */ f("ZodOptional", (e, t) => {
  _n.init(e, t), S.init(e, t), e._zod.processJSONSchema = (n, r, o) => $n(e, n, r, o), e.unwrap = () => e._zod.def.innerType;
});
function Ut(e) {
  return new An({
    type: "optional",
    innerType: e
  });
}
const Zn = /* @__PURE__ */ f("ZodExactOptional", (e, t) => {
  fi.init(e, t), S.init(e, t), e._zod.processJSONSchema = (n, r, o) => $n(e, n, r, o), e.unwrap = () => e._zod.def.innerType;
});
function Wa(e) {
  return new Zn({
    type: "optional",
    innerType: e
  });
}
const Ha = /* @__PURE__ */ f("ZodNullable", (e, t) => {
  di.init(e, t), S.init(e, t), e._zod.processJSONSchema = (n, r, o) => Ms(e, n, r, o), e.unwrap = () => e._zod.def.innerType;
});
function Mt(e) {
  return new Ha({
    type: "nullable",
    innerType: e
  });
}
const Ga = /* @__PURE__ */ f("ZodDefault", (e, t) => {
  pi.init(e, t), S.init(e, t), e._zod.processJSONSchema = (n, r, o) => Ls(e, n, r, o), e.unwrap = () => e._zod.def.innerType, e.removeDefault = e.unwrap;
});
function Ya(e, t) {
  return new Ga({
    type: "default",
    innerType: e,
    get defaultValue() {
      return typeof t == "function" ? t() : Yt(t);
    }
  });
}
const qa = /* @__PURE__ */ f("ZodPrefault", (e, t) => {
  hi.init(e, t), S.init(e, t), e._zod.processJSONSchema = (n, r, o) => Js(e, n, r, o), e.unwrap = () => e._zod.def.innerType;
});
function Xa(e, t) {
  return new qa({
    type: "prefault",
    innerType: e,
    get defaultValue() {
      return typeof t == "function" ? t() : Yt(t);
    }
  });
}
const Dn = /* @__PURE__ */ f("ZodNonOptional", (e, t) => {
  mi.init(e, t), S.init(e, t), e._zod.processJSONSchema = (n, r, o) => Fs(e, n, r, o), e.unwrap = () => e._zod.def.innerType;
});
function Qa(e, t) {
  return new Dn({
    type: "nonoptional",
    innerType: e,
    ...g(t)
  });
}
const ec = /* @__PURE__ */ f("ZodCatch", (e, t) => {
  gi.init(e, t), S.init(e, t), e._zod.processJSONSchema = (n, r, o) => Bs(e, n, r, o), e.unwrap = () => e._zod.def.innerType, e.removeCatch = e.unwrap;
});
function tc(e, t) {
  return new ec({
    type: "catch",
    innerType: e,
    catchValue: typeof t == "function" ? t : pr(t)
  });
}
const nc = /* @__PURE__ */ f("ZodPipe", (e, t) => {
  _i.init(e, t), S.init(e, t), e._zod.processJSONSchema = (n, r, o) => Ks(e, n, r, o), e.in = t.in, e.out = t.out;
});
function Ft(e, t) {
  return new nc({
    type: "pipe",
    in: e,
    out: t
    // ...util.normalizeParams(params),
  });
}
const rc = /* @__PURE__ */ f("ZodReadonly", (e, t) => {
  yi.init(e, t), S.init(e, t), e._zod.processJSONSchema = (n, r, o) => Vs(e, n, r, o), e.unwrap = () => e._zod.def.innerType;
});
function oc(e) {
  return new rc({
    type: "readonly",
    innerType: e
  });
}
const ic = /* @__PURE__ */ f("ZodCustom", (e, t) => {
  bi.init(e, t), S.init(e, t), e._zod.processJSONSchema = (n, r, o) => As(e, n, r, o);
});
function sc(e, t = {}) {
  return /* @__PURE__ */ bs(ic, e, t);
}
function ac(e, t) {
  return /* @__PURE__ */ ws(e, t);
}
const oe = {
  rice: { name: "Dry rice", pack: 1e3, usd: 2.5, cad: 3.5, kcal: 365, protein: 7, carbs: 80, fat: 1, allergens: [] },
  pasta: { name: "Dry whole-wheat pasta", pack: 454, usd: 1.8, cad: 2.5, kcal: 350, protein: 13, carbs: 70, fat: 2, allergens: ["wheat"] },
  quinoa: { name: "Dry quinoa", pack: 454, usd: 4, cad: 5.5, kcal: 368, protein: 14, carbs: 64, fat: 6, allergens: [] },
  potatoes: { name: "Potatoes", pack: 2e3, usd: 4, cad: 5.5, kcal: 77, protein: 2, carbs: 17, fat: 0.1, allergens: [] },
  chickpeas: { name: "Canned chickpeas, drained", pack: 240, usd: 0.9, cad: 1.3, kcal: 139, protein: 7, carbs: 22, fat: 2, allergens: [] },
  beans: { name: "Canned black beans, drained", pack: 240, usd: 0.9, cad: 1.3, kcal: 132, protein: 9, carbs: 24, fat: 0.5, allergens: [] },
  lentils: { name: "Canned lentils, drained", pack: 240, usd: 1, cad: 1.4, kcal: 116, protein: 9, carbs: 20, fat: 0.4, allergens: [] },
  tofu: { name: "Firm tofu", pack: 400, usd: 2.5, cad: 3.5, kcal: 144, protein: 17, carbs: 3, fat: 9, allergens: ["soy"] },
  chicken: { name: "Boneless chicken breast", pack: 1e3, usd: 8, cad: 12, kcal: 120, protein: 23, carbs: 0, fat: 3, allergens: [] },
  vegetables: { name: "Frozen mixed vegetables", pack: 1e3, usd: 2.5, cad: 3.5, kcal: 60, protein: 3, carbs: 11, fat: 0.5, allergens: [] },
  tomatoes: { name: "Canned crushed tomatoes", pack: 400, usd: 1, cad: 1.5, kcal: 25, protein: 1, carbs: 5, fat: 0.2, allergens: [] },
  oil: { name: "Olive oil", pack: 450, usd: 5, cad: 7, kcal: 884, protein: 0, carbs: 0, fat: 100, allergens: [] },
  cumin: { name: "Ground cumin", pack: 40, usd: 1.5, cad: 2, kcal: 375, protein: 18, carbs: 44, fat: 22, allergens: [] },
  paprika: { name: "Paprika", pack: 40, usd: 1.5, cad: 2, kcal: 282, protein: 14, carbs: 54, fat: 13, allergens: [] },
  herbs: { name: "Dried Italian herbs", pack: 30, usd: 1.5, cad: 2, kcal: 250, protein: 9, carbs: 60, fat: 4, allergens: [] },
  curry: { name: "Curry powder (check label)", pack: 40, usd: 1.5, cad: 2, kcal: 325, protein: 14, carbs: 55, fat: 14, allergens: ["mustard"] },
  oats: { name: "Rolled oats (certified gluten-free if needed)", pack: 1e3, usd: 3, cad: 4.5, kcal: 389, protein: 17, carbs: 66, fat: 7, allergens: [] },
  banana: { name: "Bananas, edible portion", pack: 600, usd: 1.5, cad: 2, kcal: 89, protein: 1, carbs: 23, fat: 0.3, allergens: [] },
  berries: { name: "Frozen berries", pack: 500, usd: 3, cad: 4.5, kcal: 50, protein: 1, carbs: 12, fat: 0.4, allergens: [] },
  apple: { name: "Apples, edible portion", pack: 1e3, usd: 3, cad: 4, kcal: 52, protein: 0.3, carbs: 14, fat: 0.2, allergens: [] },
  soyMilk: { name: "Unsweetened soy milk", pack: 1e3, usd: 2.5, cad: 3.5, kcal: 33, protein: 3, carbs: 1, fat: 2, allergens: ["soy"] },
  seeds: { name: "Pumpkin seeds", pack: 250, usd: 3, cad: 4, kcal: 559, protein: 30, carbs: 11, fat: 49, allergens: [] },
  cinnamon: { name: "Ground cinnamon", pack: 40, usd: 1.5, cad: 2, kcal: 247, protein: 4, carbs: 81, fat: 1, allergens: [] }
};
function nt(e) {
  const t = { kcal: 0, protein: 0, carbs: 0, fat: 0 };
  for (const [n, r] of Object.entries(e)) for (const o of Object.keys(t)) t[o] += oe[n][o] * r / 100;
  return Object.fromEntries(Object.entries(t).map(([n, r]) => [n, Math.round(r)]));
}
const rt = [], cc = [["Italian", "herbs", "herbed tomato"], ["Mexican", "cumin", "smoky cumin"], ["Middle Eastern", "paprika", "paprika tomato"], ["Asian", "curry", "curried"]];
for (const e of ["chickpeas", "beans", "lentils", "tofu", "chicken"]) for (const t of ["rice", "pasta", "quinoa", "potatoes"]) for (const [n, r, o] of cc) {
  const i = { [t]: t === "potatoes" ? 320 : 85, [e]: 170, vegetables: 180, tomatoes: 100, oil: 8, [r]: 2 }, s = `${e}-${t}-${r}`;
  rt.push({ id: s, name: `${o[0].toUpperCase() + o.slice(1)} ${e === "beans" ? "black bean" : e} ${t === "pasta" ? "pasta" : t === "potatoes" ? "potato plate" : t + " bowl"}`, cuisine: n, minutes: 35, equipment: ["stovetop", "knife"], vegan: e !== "chicken", items: i, nutrition: nt(i), image: "/assets/meal-prep.png", imageNote: "Illustrative meal-prep photo; the finished recipe will differ.", steps: [t === "potatoes" ? "Cut potatoes into 2 cm cubes. Cover with water in a saucepan; boil for 15–20 minutes until fork-tender, then drain." : `Bring water to a boil and cook the ${t} according to the package directions, usually 12–20 minutes. Drain any excess water.`, e === "chicken" ? "Use a separate board for raw chicken. Cut into small pieces, wash hands and clean surfaces, then heat the measured oil in a pan and cook the chicken until the center reaches 165°F (74°C)." : e === "tofu" ? "Drain the tofu and cut into cubes. Heat the measured oil in a large pan and cook the tofu for 6–8 minutes, turning gently." : "Drain and rinse the canned legumes. Heat the measured oil in a large pan and add them.", `Add the frozen vegetables, crushed tomatoes and measured ${oe[r].name.toLowerCase()}. Cover and simmer for 8–10 minutes, stirring until the vegetables are hot throughout.`, `Combine with the cooked ${t} and serve. Refrigerate leftovers promptly.`] });
}
for (const e of ["banana", "berries", "apple"]) for (const t of ["seeds", "soyMilk"]) for (const n of ["microwave", "stovetop"]) {
  const r = { oats: 85, [e]: 150, [t]: t === "seeds" ? 25 : 200, cinnamon: 1 };
  rt.push({ id: `oats-${e}-${t}-${n}`, name: `${e === "berries" ? "Berry" : e === "apple" ? "Apple" : "Banana"} ${t === "seeds" ? "pumpkin-seed" : "creamy soy"} porridge (${n})`, cuisine: "American", minutes: 12, equipment: [n, ...e === "berries" ? [] : ["knife"]], vegan: !0, items: r, nutrition: nt(r), image: "/assets/meal-prep.png", imageNote: "Illustrative meal-prep photo; not a photograph of this porridge.", steps: [`Combine the measured oats with ${t === "soyMilk" ? "the soy milk and 100 ml water" : "250 ml water"} in ${n === "microwave" ? "a large microwave-safe bowl" : "a saucepan"}.`, n === "microwave" ? "Microwave for 2 minutes, stir, then heat in 30-second intervals until cooked; use a deep bowl to avoid boiling over." : "Simmer over medium-low heat for 5–7 minutes, stirring regularly and adding water as needed.", e === "berries" ? "Heat frozen berries according to package instructions, then stir into the porridge." : `Wash or peel the ${e}, slice, and stir into the porridge.`, `Add cinnamon${t === "seeds" ? " and pumpkin seeds" : ""}. Let cool slightly before eating.`] });
}
const Y = M({ name: D().trim().max(80).default(""), country: Z(["US", "CA"]).default("US"), location: D().max(150).default(""), weight: $().min(40).max(250).default(70), height: $().min(130).max(230).default(170), goal: Z(["lose", "maintain", "gain"]).default("maintain"), budget: $().min(1).max(2e3).default(75), minutes: $().int().min(5).max(180).default(45), meals: $().int().min(1).max(4).default(3), equipment: G(Z(["stovetop", "microwave", "oven", "airfryer", "blender", "toaster", "knife", "slowcooker"])).max(8).default(["stovetop", "knife"]), diet: Z(["none", "vegan", "vegetarian", "halal", "kosher"]).default("none"), allergens: G(Z(["wheat", "soy", "milk", "eggs", "peanuts", "tree nuts", "fish", "shellfish", "sesame", "mustard", "pork"])).max(11).default([]), cuisines: G(Z(["American", "Italian", "Mexican", "Middle Eastern", "Asian"])).max(5).default([]), memberships: G(Z(["Costco", "Sam's Club"])).max(2).default([]), stores: G(M({ id: D().max(100), name: D().max(200), address: D().max(400), distance: $().min(0).nullable(), lat: $().min(-90).max(90), lon: $().min(-180).max(180), warehouse: Na() })).max(10).default([]), adult: Ba(!0).default(!0) }), Lt = Y.parse({}), uc = La(Z(Object.keys(oe)), $().min(0).max(1e5));
function Rn(e) {
  return Math.round(Math.min(3600, Math.max(1600, (10 * e.weight + 6.25 * e.height - 150) * 1.4 + (e.goal === "lose" ? -250 : e.goal === "gain" ? 250 : 0))) / 50) * 50;
}
function ot(e) {
  return rt.filter((t) => t.minutes <= e.minutes && t.equipment.every((n) => e.equipment.includes(n)) && (e.diet === "none" || t.vegan) && !Object.keys(t.items).some((n) => oe[n].allergens.some((r) => e.allergens.includes(r))) && (!e.cuisines.length || e.cuisines.includes(t.cuisine)));
}
function jn(e, t) {
  const n = Rn(t) / t.meals / e.nutrition.kcal;
  if (n < 0.4 || n > 3.5) return null;
  const r = Object.fromEntries(Object.entries(e.items).map(([o, i]) => [o, Math.round(i * n)]));
  return { ...e, items: r, nutrition: nt(r), portionScale: Math.round(n * 100) / 100 };
}
function Ke(e, t, n = {}) {
  const r = {};
  for (const i of e) for (const [s, a] of Object.entries(i.items)) r[s] = (r[s] || 0) + a;
  const o = Object.entries(r).map(([i, s]) => {
    const a = oe[i], c = n[i] || 0, u = Math.max(0, s - c), l = Math.ceil(u / a.pack), d = Math.round(a[t.country === "CA" ? "cad" : "usd"] * 100);
    return { id: i, name: a.name, needed: s, pantryUsed: Math.min(s, c), packages: l, packGrams: a.pack, buyGrams: l * a.pack, leftover: Math.max(0, c - s) + l * a.pack - u, cents: l * d };
  });
  return { list: o, totalCents: o.reduce((i, s) => i + s.cents, 0), currency: t.country === "CA" ? "CAD" : "USD", priceNote: "Illustrative package prices, not store quotes. Taxes, deposits, membership fees and local price changes are not included.", stores: t.stores };
}
function Cn(e, t, n) {
  const r = new Set(ot(t).map((i) => i.id));
  if (e.length !== 7 * t.meals || e.some((i) => !r.has(i.id))) throw new Error("The requested plan does not meet your meal, diet, time or equipment settings.");
  const o = Ke(e, t, n);
  if (o.totalCents > Math.floor(t.budget * 100)) throw new Error("No plan found within your budget and current preferences. Try a larger budget or different cuisines/equipment. Your existing plan has not changed.");
  return o;
}
function Jt(e, t = {}, n = []) {
  const r = new Set(n.map((s) => s.id)), o = ot(e).filter((s) => !r.has(s.id)).map((s) => jn(s, e)).filter(Boolean);
  if (o.length < 7 * e.meals) throw new Error("There are not enough different recipes for a full week without repeating the previous plan. Broaden your cuisines or equipment, or reduce the meals per day.");
  let i;
  for (let s = 0; s < 80; s++) {
    const c = o.map((l) => ({ r: l, score: Ke([l], e, t).totalCents * (0.6 + Math.random() * 0.8) })).sort((l, d) => l.score - d.score).slice(0, 7 * e.meals).map((l) => l.r), u = Ke(c, e, t);
    if ((!i || u.totalCents < i.totalCents) && (i = { meals: c, ...u }), u.totalCents <= e.budget * 100) break;
  }
  return Cn(i.meals, e, t), { ...i, targetCalories: Rn(e), settings: e, completed: [], createdAt: (/* @__PURE__ */ new Date()).toISOString() };
}
function Bt(e, t, n, r, o = []) {
  if (!Number.isInteger(t) || t < 0 || t >= e.meals.length) throw new Error("Choose a valid meal to replace.");
  const i = new Set([...e.meals, ...o].map((s) => s.id));
  for (const s of ot(n).filter((a) => !i.has(a.id))) {
    const a = jn(s, n);
    if (!a) continue;
    const c = e.meals.map((u, l) => l === t ? a : u);
    try {
      const u = Cn(c, n, r);
      return { ...e, ...u, meals: c };
    } catch {
    }
  }
  throw new Error("No replacement fits all your current constraints and budget.");
}
const b = (e, t = 200, n = {}) => new Response(JSON.stringify(e), { status: t, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", ...n } }), ue = (e) => {
  try {
    return JSON.parse(e || "{}");
  } catch {
    return {};
  }
}, xn = (e) => Object.fromEntries((e.headers.get("cookie") || "").split(";").map((t) => t.trim().split("=").map(decodeURIComponent)).filter((t) => t.length === 2)), le = (e) => [...new Uint8Array(e)].map((t) => t.toString(16).padStart(2, "0")).join(""), lc = (e) => Uint8Array.from(e.match(/.{2}/g) || [], (t) => parseInt(t, 16)), Un = M({ reply: D().max(5e3), action: Z(["none", "generate", "swap", "preferences"]), mealIndex: $().int().min(0).max(27).nullable(), budget: $().min(1).max(2e3).nullable(), minutes: $().int().min(5).max(180).nullable(), cuisines: G(Z(["American", "Italian", "Mexican", "Middle Eastern", "Asian"])).max(5).nullable() });
async function J(e) {
  return le(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(e)));
}
async function Mn(e, t = crypto.getRandomValues(new Uint8Array(16))) {
  const n = await crypto.subtle.importKey("raw", new TextEncoder().encode(e), "PBKDF2", !1, ["deriveBits"]), r = await crypto.subtle.deriveBits({ name: "PBKDF2", hash: "SHA-256", salt: t, iterations: 1e5 }, n, 256), o = await crypto.subtle.importKey("raw", r, "PBKDF2", !1, ["deriveBits"]), i = new Uint8Array(await crypto.subtle.digest("SHA-256", new Uint8Array([...t, 67, 104, 101, 97, 112, 67, 104, 101, 102]))), s = await crypto.subtle.deriveBits({ name: "PBKDF2", hash: "SHA-256", salt: i, iterations: 1e5 }, o, 256);
  return `${le(t)}:${le(s)}`;
}
async function Kt(e, t) {
  const [n, r] = t.split(":");
  if (!n || !r) return !1;
  const o = (await Mn(e, lc(n))).split(":")[1];
  let i = r.length ^ o.length;
  for (let s = 0; s < Math.min(r.length, o.length); s++) i |= r.charCodeAt(s) ^ o.charCodeAt(s);
  return i === 0;
}
async function U(e, t) {
  let n;
  try {
    n = await e.json();
  } catch {
    throw new Error("Invalid request.");
  }
  return t.parse(n);
}
async function fc(e, t) {
  const n = xn(e).cc_session;
  if (!n) return null;
  const r = await t.DB.prepare("SELECT u.* FROM users u JOIN sessions s ON s.user_id=u.id WHERE s.token=? AND s.expires_at>CURRENT_TIMESTAMP").bind(await J(n)).first();
  return r ? { ...r, profile: ue(r.profile), pantry: ue(r.pantry) } : null;
}
async function ge(e, t, n, r) {
  const o = Date.now(), i = new Date(o + r).toISOString();
  await e.DB.prepare("DELETE FROM rate_limits WHERE bucket=? AND expires_at<=CURRENT_TIMESTAMP").bind(t).run();
  const s = await e.DB.prepare("SELECT count FROM rate_limits WHERE bucket=?").bind(t).first();
  return s && s.count >= n ? !1 : (await e.DB.prepare("INSERT INTO rate_limits(bucket,count,expires_at) VALUES(?,1,?) ON CONFLICT(bucket) DO UPDATE SET count=count+1").bind(t, i).run(), !0);
}
async function H(e, t) {
  return (await e.DB.prepare("SELECT id,data FROM plans WHERE user_id=? ORDER BY created_at DESC,id DESC LIMIT 2").bind(t).all()).results.map((r) => ({ ...r, data: ue(r.data) }));
}
async function _e(e, t, n, r) {
  return r ? await e.DB.prepare("UPDATE plans SET data=? WHERE id=? AND user_id=?").bind(JSON.stringify(n), r, t).run() : (r = crypto.randomUUID(), await e.DB.prepare("INSERT INTO plans(id,user_id,data) VALUES(?,?,?)").bind(r, t, JSON.stringify(n)).run()), { id: r, ...n };
}
function dc(e) {
  return e instanceof In ? e.issues.map((t) => `${t.path.join(".")}: ${t.message}`).join("; ") : /^(No |There |The |Choose |Generate |Start |These |This |Pantry |Search |Enter |Location |Invalid |Your |That |Account|Unable )/.test(e.message) ? e.message : (console.error(e), "Something went wrong. Please try again.");
}
function Vt(e, t, n, r) {
  const o = Math.PI / 180, i = Math.sin((n - e) * o / 2) ** 2 + Math.cos(e * o) * Math.cos(n * o) * Math.sin((r - t) * o / 2) ** 2;
  return Math.round(6371e3 * 2 * Math.atan2(Math.sqrt(i), Math.sqrt(Math.max(0, 1 - i))));
}
async function Wt(e, t = {}) {
  const n = await fetch(e, { ...t, headers: { "User-Agent": "CheapChef/1.0 (https://github.com/anasajhani/cheap-chef)", ...t.headers } });
  if (!n.ok) throw new Error("The map service is temporarily unavailable. Please try again later.");
  return n.json();
}
async function pc(e) {
  let { country: t, location: n, lat: r, lon: o } = e;
  if (r === void 0) {
    if (!n?.trim()) throw new Error("Enter a city, ZIP or postal code, or use your location.");
    const c = await Wt("https://nominatim.openstreetmap.org/search?" + new URLSearchParams({ q: n, countrycodes: t.toLowerCase(), format: "jsonv2", limit: "1" }));
    if (!c.length) throw new Error("Location not found. Try your city and state/province.");
    r = Number(c[0].lat), o = Number(c[0].lon);
  }
  const i = `[out:json][timeout:20];(nwr["shop"~"^(supermarket|grocery|wholesale|department_store|general)$"](around:15000,${r},${o});nwr["brand"~"Walmart|Target|Kroger|Costco|Sam's Club|ALDI",i]["shop"~"^(supermarket|grocery|wholesale|department_store|general)$"](around:15000,${r},${o}););out center tags;`;
  return { stores: ((await Wt("https://overpass-api.de/api/interpreter", { method: "POST", headers: { "content-type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ data: i }) })).elements || []).map((c) => {
    const u = c.tags || {}, l = c.lat ?? c.center?.lat, d = c.lon ?? c.center?.lon;
    return { id: `osm:${c.type}:${c.id}`, name: u.name || u.brand || "Grocery store", address: [u["addr:housenumber"], u["addr:street"], u["addr:city"], u["addr:state"], u["addr:postcode"]].filter(Boolean).join(" ") || "Address not listed in OpenStreetMap", distance: Vt(r, o, l, d), lat: l, lon: d, warehouse: /costco|sam.s club/i.test(u.name || u.brand || "") };
  }).filter((c) => Number.isFinite(c.lat) && Number.isFinite(c.lon)).sort((c, u) => c.distance - u.distance).filter((c, u, l) => !l.slice(0, u).some((d) => d.name.toLowerCase() === c.name.toLowerCase() && Vt(d.lat, d.lon, c.lat, c.lon) < 100)).slice(0, 60), source: "OpenStreetMap contributors", attribution: "https://www.openstreetmap.org/copyright", note: "Within 15 km; distances are straight-line. Coverage may be incomplete. No live prices or inventory." };
}
async function hc(e, { message: t, history: n, profile: r, plan: o, pantry: i }) {
  if (!e.OPENAI_API_KEY || !e.OPENAI_MODEL) return { reply: "The AI chef is not connected yet. You can still use preferences, pantry, nearby stores, meal plans and swaps.", action: "none", mealIndex: null, budget: null, minutes: null, cuisines: null, mode: "unavailable" };
  const s = { type: "object", additionalProperties: !1, properties: { reply: { type: "string" }, action: { type: "string", enum: ["none", "generate", "swap", "preferences"] }, mealIndex: { type: ["integer", "null"] }, budget: { type: ["number", "null"] }, minutes: { type: ["integer", "null"] }, cuisines: { type: ["array", "null"], items: { type: "string", enum: ["American", "Italian", "Mexican", "Middle Eastern", "Asian"] } } }, required: ["reply", "action", "mealIndex", "budget", "minutes", "cuisines"] }, a = await fetch("https://api.openai.com/v1/responses", { method: "POST", headers: { Authorization: `Bearer ${e.OPENAI_API_KEY}`, "content-type": "application/json" }, body: JSON.stringify({ model: e.OPENAI_MODEL, store: !1, max_output_tokens: 1200, instructions: "You are Cheap Chef. Help adults with their saved meal plan. Never loosen diet, allergy, equipment or budget limits. Do not claim live prices or inventory. Direct changes to the visible planner controls. Return structured JSON.", input: [{ role: "user", content: JSON.stringify({ profile: { ...r, location: void 0, stores: r.stores.map((l) => ({ name: l.name })) }, plan: o, pantry: i }) }, ...n.slice(-10).map((l) => ({ role: l.role, content: l.text })), { role: "user", content: t }], text: { format: { type: "json_schema", name: "chef_action", strict: !0, schema: s } } }) });
  if (!a.ok) throw new Error("The AI provider could not respond. Try again later; your plan has not changed.");
  const c = await a.json(), u = c.output?.flatMap((l) => l.content || []).find((l) => l.type === "output_text")?.text;
  if (!u) throw new Error("The AI could not answer. Your plan has not changed.");
  return { ...Un.parse(JSON.parse(u)), mode: "ai" };
}
async function mc(e, t, n) {
  const r = e.method;
  if (n === "/api/health") return b({ ok: !0 });
  if (n === "/api/config") return b({ ai: !!(t.OPENAI_API_KEY && t.OPENAI_MODEL), ingredients: oe, defaults: Lt });
  const o = M({ email: D().email().max(254).transform((s) => s.toLowerCase()), password: D().min(12).max(128) });
  if (n === "/api/register" && r === "POST") {
    const s = e.headers.get("cf-connecting-ip") || "unknown";
    if (!await ge(t, `auth:${s}`, 20, 15 * 6e4)) return b({ error: "Too many sign-in attempts. Try again in 15 minutes." }, 429);
    const a = await U(e, o), c = crypto.randomUUID(), u = await Mn(a.password);
    try {
      await t.DB.prepare("INSERT INTO users(id,email,password,profile) VALUES(?,?,?,?)").bind(c, a.email, u, JSON.stringify(Lt)).run();
    } catch {
      throw new Error("Unable to create that account. Try signing in instead.");
    }
    const l = le(crypto.getRandomValues(new Uint8Array(32)));
    return await t.DB.prepare("INSERT INTO sessions(token,user_id,expires_at) VALUES(?,?,?)").bind(await J(l), c, new Date(Date.now() + 7 * 864e5).toISOString()).run(), b({ ok: !0 }, 201, { "set-cookie": `cc_session=${l}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=604800` });
  }
  if (n === "/api/login" && r === "POST") {
    const s = e.headers.get("cf-connecting-ip") || "unknown";
    if (!await ge(t, `auth:${s}`, 20, 15 * 6e4)) return b({ error: "Too many sign-in attempts. Try again in 15 minutes." }, 429);
    const a = await U(e, o), c = await t.DB.prepare("SELECT * FROM users WHERE email=?").bind(a.email).first();
    if (!c || !await Kt(a.password, c.password)) return b({ error: "Email or password is incorrect." }, 401);
    const u = le(crypto.getRandomValues(new Uint8Array(32)));
    return await t.DB.prepare("INSERT INTO sessions(token,user_id,expires_at) VALUES(?,?,?)").bind(await J(u), c.id, new Date(Date.now() + 7 * 864e5).toISOString()).run(), b({ ok: !0 }, 200, { "set-cookie": `cc_session=${u}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=604800` });
  }
  const i = await fc(e, t);
  if (!i) return b({ error: "Please sign in." }, 401);
  if (n === "/api/me" && r === "GET") {
    const s = await H(t, i.id), a = (await t.DB.prepare("SELECT role,text FROM chats WHERE user_id=? ORDER BY created_at DESC,id DESC LIMIT 24").bind(i.id).all()).results.reverse();
    return b({ email: i.email, profile: i.profile, pantry: i.pantry, plan: s[0] ? { id: s[0].id, ...s[0].data } : null, chats: a });
  }
  if (n === "/api/logout" && r === "POST") {
    const s = xn(e).cc_session;
    return s && await t.DB.prepare("DELETE FROM sessions WHERE token=?").bind(await J(s)).run(), b({ ok: !0 }, 200, { "set-cookie": "cc_session=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0" });
  }
  if (n === "/api/profile" && r === "PUT") {
    const s = await U(e, Y), a = [...i.profile.stores || []], c = await t.DB.prepare("SELECT data FROM store_results WHERE user_id=? AND expires_at>CURRENT_TIMESTAMP").bind(i.id).first();
    return c && a.push(...ue(c.data).stores || []), s.stores = s.stores.map((u) => {
      const l = a.find((d) => d.id === u.id);
      if (!l) throw new Error("Search for nearby stores before selecting them.");
      return l;
    }), await t.DB.prepare("UPDATE users SET profile=? WHERE id=?").bind(JSON.stringify(s), i.id).run(), b(s);
  }
  if (n === "/api/pantry" && r === "PUT") {
    const s = await U(e, uc);
    return await t.DB.prepare("UPDATE users SET pantry=? WHERE id=?").bind(JSON.stringify(s), i.id).run(), b(s);
  }
  if (n === "/api/plans" && r === "POST") {
    const s = await H(t, i.id);
    return b(await _e(t, i.id, Jt(Y.parse(i.profile), i.pantry, s[0]?.data.meals || [])));
  }
  if (n === "/api/plans/swap" && r === "POST") {
    const { index: s } = await U(e, M({ index: $().int().min(0).max(27) })), a = await H(t, i.id);
    if (!a[0]) throw new Error("Generate a plan first.");
    if (a[0].data.purchased || a[0].data.completed?.length) throw new Error("Start a new plan to make changes after shopping or cooking.");
    return b(await _e(t, i.id, Bt(a[0].data, s, Y.parse(i.profile), i.pantry, a[1]?.data.meals || []), a[0].id));
  }
  if (n === "/api/plans/purchased" && r === "POST") {
    const s = await H(t, i.id), a = s[0]?.data;
    if (!a) throw new Error("Generate a plan first.");
    if (a.purchased) throw new Error("These purchases have already been added.");
    const c = { ...i.pantry };
    for (const u of a.list) c[u.id] = (c[u.id] || 0) + u.buyGrams;
    return a.purchased = !0, await t.DB.batch([t.DB.prepare("UPDATE users SET pantry=? WHERE id=?").bind(JSON.stringify(c), i.id), t.DB.prepare("UPDATE plans SET data=? WHERE id=? AND user_id=?").bind(JSON.stringify(a), s[0].id, i.id)]), b({ ok: !0 });
  }
  if (n === "/api/plans/cooked" && r === "POST") {
    const { index: s } = await U(e, M({ index: $().int().min(0).max(27) })), a = await H(t, i.id), c = a[0]?.data;
    if (!c?.meals[s]) throw new Error("Choose a valid meal.");
    if (c.completed.includes(s)) throw new Error("This meal is already marked cooked.");
    const u = { ...i.pantry };
    for (const [l, d] of Object.entries(c.meals[s].items)) {
      if ((u[l] || 0) < d) throw new Error("Pantry stock is too low. Record purchases or update your pantry first.");
      u[l] -= d;
    }
    return c.completed.push(s), await t.DB.batch([t.DB.prepare("UPDATE users SET pantry=? WHERE id=?").bind(JSON.stringify(u), i.id), t.DB.prepare("UPDATE plans SET data=? WHERE id=? AND user_id=?").bind(JSON.stringify(c), a[0].id, i.id)]), b({ ok: !0 });
  }
  if (n === "/api/stores" && r === "POST") {
    if (!await ge(t, `stores:${i.id}`, 5, 6e4)) return b({ error: "Please wait a minute before searching again." }, 429);
    const s = await U(e, M({ country: Z(["US", "CA"]), location: D().max(150).optional(), lat: $().min(-90).max(90).optional(), lon: $().min(-180).max(180).optional() }).refine((c) => c.lat === void 0 == (c.lon === void 0))), a = await pc(s);
    return await t.DB.prepare("INSERT INTO store_results(user_id,data,expires_at) VALUES(?,?,?) ON CONFLICT(user_id) DO UPDATE SET data=excluded.data,expires_at=excluded.expires_at").bind(i.id, JSON.stringify(a), new Date(Date.now() + 36e5).toISOString()).run(), b(a);
  }
  if (n === "/api/chat" && r === "POST") {
    if (!await ge(t, `chat:${i.id}`, 8, 6e4)) return b({ error: "Please wait a minute before asking again." }, 429);
    const { message: s } = await U(e, M({ message: D().trim().min(1).max(2e3) })), a = await H(t, i.id), c = (await t.DB.prepare("SELECT role,text FROM chats WHERE user_id=? ORDER BY created_at DESC,id DESC LIMIT 12").bind(i.id).all()).results.reverse();
    if (t.OPENAI_API_KEY && t.OPENAI_MODEL) {
      const d = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
      if ((await t.DB.prepare("INSERT INTO usage(user_id,day,calls) VALUES(?,?,1) ON CONFLICT(user_id,day) DO UPDATE SET calls=calls+1 RETURNING calls").bind(i.id, d).first()).calls > Number(t.AI_DAILY_LIMIT || 20)) return b({ error: "You have reached today’s AI message allowance. Meal-planning controls are still available." }, 429);
    }
    const u = await hc(t, { message: s, history: c, profile: i.profile, pantry: i.pantry, plan: a[0]?.data || null });
    await t.DB.batch([t.DB.prepare("INSERT INTO chats(id,user_id,role,text) VALUES(?,?,?,?)").bind(crypto.randomUUID(), i.id, "user", s), t.DB.prepare("INSERT INTO chats(id,user_id,role,text) VALUES(?,?,?,?)").bind(crypto.randomUUID(), i.id, "assistant", u.reply)]);
    let l = null;
    return u.action !== "none" && (l = crypto.randomUUID(), await t.DB.prepare("INSERT INTO pending_actions(user_id,token,data,plan_id,plan_hash,profile_hash,expires_at) VALUES(?,?,?,?,?,?,?) ON CONFLICT(user_id) DO UPDATE SET token=excluded.token,data=excluded.data,plan_id=excluded.plan_id,plan_hash=excluded.plan_hash,profile_hash=excluded.profile_hash,expires_at=excluded.expires_at").bind(i.id, l, JSON.stringify(u), a[0]?.id || null, await J(JSON.stringify(a[0]?.data || null)), await J(JSON.stringify(i.profile)), new Date(Date.now() + 6e5).toISOString()).run()), b({ ...u, actionToken: l });
  }
  if (n === "/api/chat/confirm" && r === "POST") {
    const { token: s } = await U(e, M({ token: D().uuid() })), a = await t.DB.prepare("SELECT * FROM pending_actions WHERE user_id=? AND token=? AND expires_at>CURRENT_TIMESTAMP").bind(i.id, s).first();
    if (!a) throw new Error("That suggestion expired. Ask the chef again.");
    const c = Un.parse(ue(a.data)), u = await H(t, i.id);
    if ((a.plan_id || null) !== (u[0]?.id || null) || a.plan_hash !== await J(JSON.stringify(u[0]?.data || null)) || a.profile_hash !== await J(JSON.stringify(i.profile))) throw new Error("Your settings or plan changed. Ask the chef for a new suggestion.");
    await t.DB.prepare("DELETE FROM pending_actions WHERE user_id=?").bind(i.id).run();
    let l = Y.parse(i.profile);
    if (c.action === "preferences")
      return l = Y.parse({ ...l, ...c.budget !== null ? { budget: c.budget } : {}, ...c.minutes !== null ? { minutes: c.minutes } : {}, ...c.cuisines !== null ? { cuisines: c.cuisines } : {} }), await t.DB.prepare("UPDATE users SET profile=? WHERE id=?").bind(JSON.stringify(l), i.id).run(), b({ message: "Preferences saved. Generate a new week to apply them." });
    if (c.action === "generate")
      return await _e(t, i.id, Jt(l, i.pantry, u[0]?.data.meals || [])), b({ message: "Your new meal plan and shopping list are ready." });
    if (c.action === "swap") {
      if (!u[0] || u[0].data.purchased || u[0].data.completed?.length) throw new Error("Generate a new plan before making this change.");
      return await _e(t, i.id, Bt(u[0].data, c.mealIndex, l, i.pantry, u[1]?.data.meals || []), u[0].id), b({ message: "Meal replaced and shopping list updated." });
    }
    return b({ message: "No change requested." });
  }
  if (n === "/api/account" && r === "DELETE") {
    const { password: s } = await U(e, M({ password: D().max(128) }));
    return await Kt(s, i.password) ? (await t.DB.prepare("DELETE FROM users WHERE id=?").bind(i.id).run(), b({ ok: !0 }, 200, { "set-cookie": "cc_session=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0" })) : b({ error: "Password is incorrect." }, 401);
  }
  return b({ error: "Not found." }, 404);
}
const gc = {
  async fetch(e, t) {
    const n = new URL(e.url);
    try {
      return n.pathname.startsWith("/api/") ? await mc(e, t, n.pathname) : t.ASSETS.fetch(e);
    } catch (r) {
      return b({ error: dc(r) }, r instanceof In ? 400 : 422);
    }
  }
};
export {
  gc as default
};
