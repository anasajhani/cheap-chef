function Xt(e) {
  const t = Object.values(e).filter((r) => typeof r == "number");
  return Object.entries(e).filter(([r, i]) => t.indexOf(+r) === -1).map(([r, i]) => i);
}
function lt(e, t = "|") {
  return e.map((n) => tn(n)).join(t);
}
function Le(e, t) {
  return typeof t == "bigint" ? t.toString() : t;
}
function Ge(e) {
  return {
    get value() {
      {
        const t = e();
        return Object.defineProperty(this, "value", { value: t }), t;
      }
    }
  };
}
function Yn(e) {
  return e == null;
}
function Ye(e) {
  const t = e.startsWith("^") ? 1 : 0, n = e.endsWith("$") ? e.length - 1 : e.length;
  return e.slice(t, n);
}
function qn(e, t) {
  const n = e / t, r = Math.round(n), i = 4 * Number.EPSILON * Math.max(Math.abs(n), 1);
  return Math.abs(n - r) < i ? 0 : n - r;
}
function Z(e, t, n) {
  Object.defineProperty(e, t, {
    value: n,
    writable: !0,
    enumerable: !0,
    configurable: !0
  });
}
function G(...e) {
  const t = {};
  for (const n of e) {
    const r = Object.getOwnPropertyDescriptors(n);
    Object.assign(t, r);
  }
  return Object.defineProperties({}, t);
}
function Xn(e) {
  return JSON.stringify(e);
}
function Qn(e) {
  return e.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}
const Qt = "captureStackTrace" in Error ? Error.captureStackTrace : (...e) => {
};
function be(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
const er = /* @__PURE__ */ Ge(() => {
  if (M.jitless || typeof navigator < "u" && navigator?.userAgent?.includes("Cloudflare"))
    return !1;
  try {
    const e = Function;
    return new e(""), !0;
  } catch {
    return !1;
  }
});
function re(e) {
  if (be(e) === !1)
    return !1;
  const t = e.constructor;
  if (t === void 0 || typeof t != "function")
    return !0;
  const n = t.prototype;
  return !(be(n) === !1 || Object.prototype.hasOwnProperty.call(n, "isPrototypeOf") === !1);
}
function en(e) {
  return re(e) ? { ...e } : Array.isArray(e) ? [...e] : e instanceof Map ? new Map(e) : e instanceof Set ? new Set(e) : e;
}
const tr = /* @__PURE__ */ new Set(["string", "number", "symbol"]);
function ie(e) {
  return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function Y(e, t, n) {
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
function tn(e) {
  return typeof e == "bigint" ? e.toString() + "n" : typeof e == "string" ? `"${e}"` : `${e}`;
}
function nr(e) {
  return Object.keys(e).filter((t) => e[t]._zod.optin !== void 0 && e[t]._zod.optout === "optional");
}
const rr = {
  safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
  int32: [-2147483648, 2147483647],
  uint32: [0, 4294967295],
  float32: [-34028234663852886e22, 34028234663852886e22],
  float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
};
function ir(e, t) {
  const n = e._zod.def, r = n.checks;
  if (r && r.length > 0)
    throw new Error(".pick() cannot be used on object schemas containing refinements");
  const o = G(e._zod.def, {
    get shape() {
      const s = {};
      for (const c of Reflect.ownKeys(t)) {
        if (!Object.prototype.hasOwnProperty.call(n.shape, c))
          throw new Error(`Unrecognized key: "${String(c)}"`);
        t[c] && Z(s, c, n.shape[c]);
      }
      return Z(this, "shape", s), s;
    },
    checks: []
  });
  return Y(e, o);
}
function or(e, t) {
  const n = e._zod.def, r = n.checks;
  if (r && r.length > 0)
    throw new Error(".omit() cannot be used on object schemas containing refinements");
  const o = G(e._zod.def, {
    get shape() {
      const s = { ...e._zod.def.shape };
      for (const c of Reflect.ownKeys(t)) {
        if (!Object.prototype.hasOwnProperty.call(n.shape, c))
          throw new Error(`Unrecognized key: "${String(c)}"`);
        t[c] && delete s[c];
      }
      return Z(this, "shape", s), s;
    },
    checks: []
  });
  return Y(e, o);
}
function sr(e, t) {
  if (!re(t))
    throw new Error("Invalid input to extend: expected a plain object");
  const n = e._zod.def.checks;
  if (n && n.length > 0) {
    const o = e._zod.def.shape;
    for (const s of Reflect.ownKeys(t))
      if (Object.getOwnPropertyDescriptor(o, s) !== void 0)
        throw new Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
  }
  const i = G(e._zod.def, {
    get shape() {
      const o = { ...e._zod.def.shape, ...t };
      return Z(this, "shape", o), o;
    }
  });
  return Y(e, i);
}
function ar(e, t) {
  if (!re(t))
    throw new Error("Invalid input to safeExtend: expected a plain object");
  const n = G(e._zod.def, {
    get shape() {
      const r = { ...e._zod.def.shape, ...t };
      return Z(this, "shape", r), r;
    }
  });
  return Y(e, n);
}
function cr(e, t) {
  if (!t?._zod?.def)
    throw new Error("Invalid input to merge: expected an object schema. To merge a plain shape, use `.extend()`.");
  if (e._zod.def.checks?.length)
    throw new Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");
  const n = G(e._zod.def, {
    get shape() {
      const r = { ...e._zod.def.shape, ...t._zod.def.shape };
      return Z(this, "shape", r), r;
    },
    get catchall() {
      return t._zod.def.catchall;
    },
    checks: t._zod.def.checks ?? []
  });
  return Y(e, n);
}
function dt(e, t, n, r = "partial") {
  const o = t._zod.def.checks;
  if (o && o.length > 0)
    throw new Error(`.${r}() cannot be used on object schemas containing refinements`);
  const c = G(t._zod.def, {
    get shape() {
      const a = t._zod.def.shape, u = { ...a };
      if (n)
        for (const l of Reflect.ownKeys(n)) {
          if (!Object.prototype.hasOwnProperty.call(a, l))
            throw new Error(`Unrecognized key: "${String(l)}"`);
          n[l] && (u[l] = e ? new e({
            type: "optional",
            innerType: a[l]
          }) : a[l]);
        }
      else
        for (const l of Reflect.ownKeys(a))
          u[l] = e ? new e({
            type: "optional",
            innerType: a[l]
          }) : a[l];
      return Z(this, "shape", u), u;
    },
    checks: []
  });
  return Y(t, c);
}
function ur(e, t, n) {
  const r = G(t._zod.def, {
    get shape() {
      const i = t._zod.def.shape, o = { ...i };
      if (n)
        for (const s of Reflect.ownKeys(n)) {
          if (!Object.prototype.hasOwnProperty.call(o, s))
            throw new Error(`Unrecognized key: "${String(s)}"`);
          n[s] && (o[s] = new e({
            type: "nonoptional",
            innerType: i[s]
          }));
        }
      else
        for (const s of Reflect.ownKeys(i))
          o[s] = new e({
            type: "nonoptional",
            innerType: i[s]
          });
      return Z(this, "shape", o), o;
    }
  });
  return Y(t, r);
}
function ee(e, t = 0) {
  if (e.aborted === !0)
    return !0;
  for (let n = t; n < e.issues.length; n++)
    if (e.issues[n]?.continue !== !0)
      return !0;
  return !1;
}
function lr(e, t = 0) {
  if (e.aborted === !0)
    return !0;
  for (let n = t; n < e.issues.length; n++)
    if (e.issues[n]?.continue === !1)
      return !0;
  return !1;
}
function te(e, t) {
  return t.map((n) => {
    var r;
    return (r = n).path ?? (r.path = []), n.path.unshift(e), n;
  });
}
function ae(e) {
  return typeof e == "string" ? e : e?.message;
}
function ft(e, t, n) {
  var r;
  for (let i = t; i < e.length; i++)
    (r = e[i]).schema ?? (r.schema = n);
}
function V(e, t, n) {
  var r;
  const i = e.inst?._zod?.traits;
  i?.has("$ZodType") && (i.has("$ZodCheck") ? (r = e).schema ?? (r.schema = e.inst) : e.schema = e.inst);
  const o = e.schema !== e.inst ? e.schema?._zod.def?.error : void 0, s = e.message ? e.message : ae(e.inst?._zod.def?.error?.(e)) ?? ae(o?.(e)) ?? ae(t?.error?.(e)) ?? ae(n.customError?.(e)) ?? ae(n.localeError?.(e)) ?? "Invalid input", { inst: c, schema: a, continue: u, input: l, ...d } = e;
  return d.path ?? (d.path = []), d.message = s, t?.reportInput && (d.input = l), d;
}
const dr = /[\uD800-\uDBFF]/;
function qe(e) {
  const t = e.length;
  if (!dr.test(e))
    return t;
  let n = t;
  for (let r = 0; r < t - 1; r++)
    (e.charCodeAt(r) & 64512) === 55296 && (e.charCodeAt(r + 1) & 64512) === 56320 && (n--, r++);
  return n;
}
function Xe(e) {
  return Array.isArray(e) ? "array" : typeof e == "string" ? "string" : "unknown";
}
function fr(e) {
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
function le(...e) {
  const [t, n, r] = e;
  return typeof t == "string" ? {
    message: t,
    code: "custom",
    input: n,
    inst: r
  } : { ...t };
}
function pr(e, t) {
  for (const n in t) {
    const r = Object.getOwnPropertyDescriptor(t, n);
    r.get ? Object.defineProperty(e, n, { ...r, enumerable: !1 }) : mr(e, n, r.value);
  }
}
function oe(e, t, n, r = !0) {
  return Object.defineProperty(e, t, { configurable: !0, writable: !0, enumerable: r, value: n }), n;
}
function nn(e, t, n) {
  return oe(e, t, n, !1);
}
function mr(e, t, n) {
  Object.defineProperty(e, t, {
    configurable: !0,
    get() {
      return this == null ? n : oe(this, t, n.bind(this));
    },
    set(r) {
      oe(this, t, r);
    }
  });
}
function hr(e, t) {
  const n = Object.getPrototypeOf(e);
  return t in n ? void 0 : n;
}
let Ze, W = !1;
const gr = {
  configurable: !0,
  get() {
    W = !0;
  }
};
function w(e, t, n) {
  const r = Object.getPrototypeOf(e._zod);
  if (t in r && Ze !== e._zod) {
    Ze = void 0;
    return;
  }
  Ze = e._zod, Object.defineProperty(r, t, {
    configurable: !0,
    get() {
      Object.defineProperty(this, t, gr);
      const i = W;
      W = !1;
      try {
        const o = n(this);
        return W ? delete this[t] : Object.defineProperty(this, t, { configurable: !0, writable: !0, value: o }), W = W || i, o;
      } catch (o) {
        throw delete this[t], W = W || i, o;
      }
    },
    set(i) {
      Object.defineProperty(this, t, { configurable: !0, writable: !0, value: i });
    }
  });
}
function yr(e, t, n, r) {
  const i = hr(e, t);
  i && Object.defineProperty(i, t, {
    configurable: !0,
    get() {
      const o = { configurable: !0, writable: !0, enumerable: r, value: void 0 };
      return Object.defineProperty(this, t, o), o.value = n(this), Object.defineProperty(this, t, o), o.value;
    },
    set(o) {
      Object.defineProperty(this, t, { configurable: !0, writable: !0, enumerable: r, value: o });
    }
  });
}
const _r = "~constantCatch";
function br(e) {
  const t = () => e;
  return t[_r] = !0, t;
}
var pt;
const Re = { value: void 0, enumerable: !1 };
let mt = "captureStackTrace" in Error ? Error : null;
function wr(e) {
  const t = mt;
  if (t) {
    const n = t.stackTraceLimit;
    if (typeof n == "number") {
      try {
        t.stackTraceLimit = 0;
      } catch {
        return mt = null, new e();
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
function p(e, t, n, r) {
  const i = {};
  function o(f) {
    this.def = f, this.constr = d, this.traits = /* @__PURE__ */ new Set();
  }
  o.prototype = i;
  const s = n, c = s && /* @__PURE__ */ new WeakSet();
  function a(f, m) {
    if (!f._zod) {
      Re.value = new o(m);
      try {
        Object.defineProperty(f, "_zod", Re);
      } finally {
        Re.value = void 0;
      }
    }
    if (f._zod.traits.has(e))
      return;
    if (f._zod.traits.add(e), t(f, m), c) {
      const _ = Object.getPrototypeOf(f), y = f._zod.constr.prototype;
      let k = _;
      for (; k && k !== y; )
        k = Object.getPrototypeOf(k);
      const N = k ?? _;
      c.has(N) || (c.add(N), pr(N, s));
    }
    const h = d.prototype;
    for (const _ in h)
      Object.prototype.hasOwnProperty.call(h, _) && (_ in f || (f[_] = h[_].bind(f)));
  }
  const u = r?.Parent ?? Object;
  class l extends u {
  }
  Object.defineProperty(l, "name", { value: e });
  function d(f) {
    const m = r?.Parent ? wr(l) : this;
    a(m, f);
    const h = m._zod.deferred;
    if (h) {
      for (const y of h)
        y();
      m._zod.deferred = void 0;
    }
    const _ = globalThis.__zod_globalConfig?.postProcessor;
    return _ && _(m), m;
  }
  return Object.defineProperty(d, "init", { value: a }), Object.defineProperty(d, Symbol.hasInstance, {
    value: (f) => r?.Parent && f instanceof r.Parent ? !0 : f?._zod?.traits?.has(e)
  }), Object.defineProperty(d, "name", { value: e }), d;
}
class ne extends Error {
  constructor() {
    super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
  }
}
class rn extends Error {
  constructor(t) {
    super(`Encountered unidirectional transform during encode: ${t}`), this.name = "ZodEncodeError";
  }
}
(pt = globalThis).__zod_globalConfig ?? (pt.__zod_globalConfig = {});
const M = globalThis.__zod_globalConfig;
function L(e) {
  return e && Object.assign(M, e), M;
}
function kr() {
  const e = this._zod;
  return e.message ?? (e.message = JSON.stringify(e.def, Le, 2)), e.message;
}
function vr(e) {
  this._zod.message = e;
}
const Er = {
  get: kr,
  set: vr,
  enumerable: !0,
  configurable: !0
}, Ce = { value: void 0, enumerable: !1 }, je = { value: void 0, enumerable: !1 }, ht = /* @__PURE__ */ new WeakSet([Object.prototype, Error.prototype]), on = (e, t) => {
  e.name = "$ZodError", Ce.value = e._zod, Object.defineProperty(e, "_zod", Ce), je.value = t, Object.defineProperty(e, "issues", je), Ce.value = void 0, je.value = void 0, Object.defineProperty(e, "message", Er);
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
}, sn = p("$ZodError", on), an = p("$ZodError", on, void 0, {
  Parent: Error
});
function Sr(e, t, n) {
  return Object.prototype.hasOwnProperty.call(e, t) || (t === "__proto__" ? Object.defineProperty(e, t, { value: n(), writable: !0, enumerable: !0, configurable: !0 }) : e[t] = n()), e[t];
}
function Or(e, t = (n) => n.message) {
  const n = {}, r = [];
  for (const i of e.issues)
    i.path.length > 0 ? Sr(n, i.path[0], () => []).push(t(i)) : r.push(t(i));
  return { formErrors: r, fieldErrors: n };
}
function zr(e, t = (n) => n.message) {
  const n = { _errors: [] }, r = (i, o = []) => {
    for (const s of i.issues)
      if (s.code === "invalid_union" && s.errors.length)
        s.errors.map((c) => r({ issues: c }, [...o, ...s.path]));
      else if (s.code === "invalid_key")
        r({ issues: s.issues }, [...o, ...s.path]);
      else if (s.code === "invalid_element")
        r({ issues: s.issues }, [...o, ...s.path]);
      else {
        const c = [...o, ...s.path];
        if (c.length === 0)
          n._errors.push(t(s));
        else {
          let a = n, u = 0;
          for (; u < c.length; ) {
            const l = c[u], d = u === c.length - 1;
            if (l === "_errors") {
              d && a._errors.push(t(s)), u++;
              continue;
            }
            Object.prototype.hasOwnProperty.call(a, l) || Object.defineProperty(a, l, {
              value: { _errors: [] },
              enumerable: !0,
              writable: !0,
              configurable: !0
            });
            const f = a[l];
            d && f._errors.push(t(s)), a = f, u++;
          }
        }
      }
  };
  return r(e), n;
}
function $e(e, t) {
  return { callee: t?.callee ?? e, Err: t?.Err };
}
const Qe = (e) => {
  const t = (n, r, i, o) => {
    const s = i ? { ...i, async: !1 } : { async: !1 }, c = n._zod.run({ value: r, issues: [] }, s);
    if (c instanceof Promise)
      throw new ne();
    if (c.issues.length) {
      const a = new (o?.Err ?? e)(c.issues.map((u) => V(u, s, L())));
      throw Qt(a, o?.callee ?? t), a;
    }
    return c.value;
  };
  return t;
}, et = (e) => {
  const t = async (n, r, i, o) => {
    const s = i ? { ...i, async: !0 } : { async: !0 };
    let c = n._zod.run({ value: r, issues: [] }, s);
    if (c instanceof Promise && (c = await c), c.issues.length) {
      const a = new (o?.Err ?? e)(c.issues.map((u) => V(u, s, L())));
      throw Qt(a, o?.callee ?? t), a;
    }
    return c.value;
  };
  return t;
}, Te = (e) => (t, n, r) => {
  const i = r ? { ...r, async: !1 } : { async: !1 }, o = t._zod.run({ value: n, issues: [] }, i);
  if (o instanceof Promise)
    throw new ne();
  return o.issues.length ? {
    success: !1,
    error: new (e ?? sn)(o.issues.map((s) => V(s, i, L())))
  } : { success: !0, data: o.value };
}, $r = /* @__PURE__ */ Te(an), Ie = (e) => async (t, n, r) => {
  const i = r ? { ...r, async: !0 } : { async: !0 };
  let o = t._zod.run({ value: n, issues: [] }, i);
  return o instanceof Promise && (o = await o), o.issues.length ? {
    success: !1,
    error: new e(o.issues.map((s) => V(s, i, L())))
  } : { success: !0, data: o.value };
}, Tr = /* @__PURE__ */ Ie(an), Ir = (e) => {
  const t = Qe(e), n = (r, i, o, s) => {
    const c = o ? { ...o, direction: "backward" } : { direction: "backward" };
    return t(r, i, c, $e(n, s));
  };
  return n;
}, Nr = (e) => {
  const t = Qe(e), n = (r, i, o, s) => t(r, i, o, $e(n, s));
  return n;
}, Pr = (e) => {
  const t = et(e), n = async (r, i, o, s) => {
    const c = o ? { ...o, direction: "backward" } : { direction: "backward" };
    return await t(r, i, c, $e(n, s));
  };
  return n;
}, Ar = (e) => {
  const t = et(e), n = async (r, i, o, s) => await t(r, i, o, $e(n, s));
  return n;
}, Dr = (e) => (t, n, r) => {
  const i = r ? { ...r, direction: "backward" } : { direction: "backward" };
  return Te(e)(t, n, i);
}, Zr = (e) => (t, n, r) => Te(e)(t, n, r), Rr = (e) => async (t, n, r) => {
  const i = r ? { ...r, direction: "backward" } : { direction: "backward" };
  return Ie(e)(t, n, i);
}, Cr = (e) => async (t, n, r) => Ie(e)(t, n, r), jr = /^[cC][0-9a-z]{6,}$/, xr = /^[0-9a-z]+$/, Mr = /^[0-7][0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{25}$/, Ur = /^[0-9a-vA-V]{20}$/, Lr = /^[A-Za-z0-9]{27}$/, Fr = /^[a-zA-Z0-9_-]{21}$/;
function Br(e) {
  return new RegExp(`^[a-zA-Z0-9_-]{${e}}$`);
}
const Jr = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/, Wr = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/, gt = (e) => e ? new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${e}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`) : /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/, Kr = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/, Vr = "^[\\p{Extended_Pictographic}\\p{Emoji_Component}]+$";
function Hr() {
  return new RegExp(Vr, "u");
}
const Gr = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, Yr = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/, qr = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/, Xr = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, Qr = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/, cn = /^[A-Za-z0-9_-]*$/, ei = /^https?$/, ti = /^\+[1-9]\d{6,14}$/, un = "(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))";
function ni(e) {
  return new RegExp(`^${e}$`);
}
const ri = /* @__PURE__ */ ni(un);
function Fe(e) {
  const t = "(?:[01]\\d|2[0-3]):[0-5]\\d";
  return typeof e.precision == "number" ? e.precision === -1 ? `${t}` : e.precision === 0 ? `${t}:[0-5]\\d` : `${t}:[0-5]\\d\\.\\d{${e.precision}}` : e.seconds ? `${t}:[0-5]\\d(?:\\.\\d+)?` : `${t}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function ii(e) {
  return new RegExp(`^${Fe(e)}$`);
}
function oi(e) {
  const t = ["Z"];
  e.offset && t.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)");
  const n = `${Fe({ precision: e.precision, seconds: !0 })}(?:${t.join("|")})`, r = e.local ? `${n}|${Fe({ precision: e.precision })}` : n;
  return new RegExp(`^${un}T(?:${r})$`);
}
const si = (e) => {
  const t = e ? `[\\s\\S]{${e?.minimum ?? 0},${e?.maximum ?? ""}}` : "[\\s\\S]*";
  return new RegExp(`^${t}$`);
}, ln = /^-?\d+$/, tt = /^-?\d+(?:\.\d+)?$/, ai = /^(?:true|false)$/i, ci = /^[^A-Z]*$/, ui = /^[^a-z]*$/, R = /* @__PURE__ */ p("$ZodCheck", (e, t) => {
  var n;
  e._zod ?? (e._zod = {}), e._zod.def = t, (n = e._zod).onattach ?? (n.onattach = []);
}), nt = (e) => {
  const t = e.value;
  return !Yn(t) && t.length !== void 0;
}, we = {
  number: "number",
  bigint: "bigint",
  object: "date"
}, dn = /* @__PURE__ */ p("$ZodCheckLessThan", (e, t) => {
  R.init(e, t);
  const n = we[typeof t.value];
  e._zod.onattach.push((r) => {
    const i = r._zod.bag, o = (t.inclusive ? i.maximum : i.exclusiveMaximum) ?? Number.POSITIVE_INFINITY;
    t.value < o && (t.inclusive ? i.maximum = t.value : i.exclusiveMaximum = t.value);
  }), e._zod.check = (r) => {
    (t.inclusive ? r.value <= t.value : r.value < t.value) || r.issues.push({
      origin: we[typeof r.value] ?? n,
      code: "too_big",
      maximum: typeof t.value == "object" ? t.value.getTime() : t.value,
      input: r.value,
      inclusive: t.inclusive,
      inst: e,
      continue: !t.abort
    });
  };
}), fn = /* @__PURE__ */ p("$ZodCheckGreaterThan", (e, t) => {
  R.init(e, t);
  const n = we[typeof t.value];
  e._zod.onattach.push((r) => {
    const i = r._zod.bag, o = (t.inclusive ? i.minimum : i.exclusiveMinimum) ?? Number.NEGATIVE_INFINITY;
    t.value > o && (t.inclusive ? i.minimum = t.value : i.exclusiveMinimum = t.value);
  }), e._zod.check = (r) => {
    (t.inclusive ? r.value >= t.value : r.value > t.value) || r.issues.push({
      origin: we[typeof r.value] ?? n,
      code: "too_small",
      minimum: typeof t.value == "object" ? t.value.getTime() : t.value,
      input: r.value,
      inclusive: t.inclusive,
      inst: e,
      continue: !t.abort
    });
  };
}), li = /* @__PURE__ */ p("$ZodCheckMultipleOf", (e, t) => {
  R.init(e, t), e._zod.onattach.push((n) => {
    var r;
    (r = n._zod.bag).multipleOf ?? (r.multipleOf = t.value);
  }), e._zod.check = (n) => {
    if (typeof n.value != typeof t.value)
      throw new Error("Cannot mix number and bigint in multiple_of check.");
    (typeof n.value == "bigint" ? (
      // `value % 0n` throws, and nothing is a multiple of zero — the number branch already fails this way via NaN
      t.value !== BigInt(0) && n.value % t.value === BigInt(0)
    ) : qn(n.value, t.value) === 0) || n.issues.push({
      origin: typeof n.value,
      code: "not_multiple_of",
      divisor: t.value,
      input: n.value,
      inst: e,
      continue: !t.abort
    });
  };
}), di = /* @__PURE__ */ p("$ZodCheckNumberFormat", (e, t) => {
  R.init(e, t), t.format = t.format || "float64";
  const n = t.format?.includes("int"), r = n ? "int" : "number", [i, o] = rr[t.format];
  e._zod.onattach.push((s) => {
    const c = s._zod.bag;
    c.format = t.format, c.minimum = i, c.maximum = o, n && (c.pattern = ln);
  }), e._zod.check = (s) => {
    const c = s.value;
    if (n) {
      if (!Number.isInteger(c)) {
        s.issues.push({
          expected: r,
          format: t.format,
          code: "invalid_type",
          continue: !1,
          input: c,
          inst: e
        });
        return;
      }
      if (!Number.isSafeInteger(c)) {
        c > 0 ? s.issues.push({
          input: c,
          code: "too_big",
          maximum: Number.MAX_SAFE_INTEGER,
          note: "Integers must be within the safe integer range.",
          inst: e,
          origin: r,
          inclusive: !0,
          continue: !t.abort
        }) : s.issues.push({
          input: c,
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
    c < i && s.issues.push({
      origin: "number",
      input: c,
      code: "too_small",
      minimum: i,
      inclusive: !0,
      inst: e,
      continue: !t.abort
    }), c > o && s.issues.push({
      origin: "number",
      input: c,
      code: "too_big",
      maximum: o,
      inclusive: !0,
      inst: e,
      continue: !t.abort
    });
  };
}), fi = /* @__PURE__ */ p("$ZodCheckMaxLength", (e, t) => {
  var n;
  R.init(e, t), (n = e._zod.def).when ?? (n.when = nt), e._zod.onattach.push((r) => {
    const i = r._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
    t.maximum < i && (r._zod.bag.maximum = t.maximum);
  }), e._zod.check = (r) => {
    const i = r.value, o = i.length;
    if ((typeof i == "string" && o > t.maximum ? qe(i) : o) <= t.maximum)
      return;
    const c = Xe(i);
    r.issues.push({
      origin: c,
      code: "too_big",
      maximum: t.maximum,
      inclusive: !0,
      input: i,
      inst: e,
      continue: !t.abort
    });
  };
}), pi = /* @__PURE__ */ p("$ZodCheckMinLength", (e, t) => {
  var n;
  R.init(e, t), (n = e._zod.def).when ?? (n.when = nt), e._zod.onattach.push((r) => {
    const i = r._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
    t.minimum > i && (r._zod.bag.minimum = t.minimum);
  }), e._zod.check = (r) => {
    const i = r.value, o = i.length;
    if ((typeof i == "string" && o >= t.minimum && o < t.minimum * 2 ? qe(i) : o) >= t.minimum)
      return;
    const c = Xe(i);
    r.issues.push({
      origin: c,
      code: "too_small",
      minimum: t.minimum,
      inclusive: !0,
      input: i,
      inst: e,
      continue: !t.abort
    });
  };
}), mi = /* @__PURE__ */ p("$ZodCheckLengthEquals", (e, t) => {
  var n;
  R.init(e, t), (n = e._zod.def).when ?? (n.when = nt), e._zod.onattach.push((r) => {
    const i = r._zod.bag;
    i.minimum = t.length, i.maximum = t.length, i.length = t.length;
  }), e._zod.check = (r) => {
    const i = r.value, o = i.length, s = typeof i == "string" && o >= t.length && o <= t.length * 2 ? qe(i) : o;
    if (s === t.length)
      return;
    const c = Xe(i), a = s > t.length;
    r.issues.push({
      origin: c,
      ...a ? { code: "too_big", maximum: t.length } : { code: "too_small", minimum: t.length },
      inclusive: !0,
      exact: !0,
      input: r.value,
      inst: e,
      continue: !t.abort
    });
  };
}), Ne = /* @__PURE__ */ p("$ZodCheckStringFormat", (e, t) => {
  var n, r;
  R.init(e, t), e._zod.onattach.push((i) => {
    const o = i._zod.bag;
    o.format = t.format, t.pattern && (o.patterns ?? (o.patterns = /* @__PURE__ */ new Set()), o.patterns.add(t.pattern));
  }), t.pattern ? (n = e._zod).check ?? (n.check = (i) => {
    t.pattern.lastIndex = 0, !t.pattern.test(i.value) && i.issues.push({
      origin: "string",
      code: "invalid_format",
      format: t.format,
      input: i.value,
      ...t.pattern ? { pattern: t.pattern.toString() } : {},
      inst: e,
      continue: !t.abort
    });
  }) : (r = e._zod).check ?? (r.check = () => {
  });
}), hi = /* @__PURE__ */ p("$ZodCheckRegex", (e, t) => {
  Ne.init(e, t), e._zod.check = (n) => {
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
}), gi = /* @__PURE__ */ p("$ZodCheckLowerCase", (e, t) => {
  t.pattern ?? (t.pattern = ci), Ne.init(e, t);
}), yi = /* @__PURE__ */ p("$ZodCheckUpperCase", (e, t) => {
  t.pattern ?? (t.pattern = ui), Ne.init(e, t);
}), _i = /* @__PURE__ */ p("$ZodCheckIncludes", (e, t) => {
  R.init(e, t);
  const n = ie(t.includes), r = new RegExp(typeof t.position == "number" ? `^.{${t.position},}${n}` : n);
  t.pattern = r, e._zod.onattach.push((i) => {
    const o = i._zod.bag;
    o.patterns ?? (o.patterns = /* @__PURE__ */ new Set()), o.patterns.add(r);
  }), e._zod.check = (i) => {
    i.value.includes(t.includes, t.position) || i.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "includes",
      includes: t.includes,
      input: i.value,
      inst: e,
      continue: !t.abort
    });
  };
}), bi = /* @__PURE__ */ p("$ZodCheckStartsWith", (e, t) => {
  R.init(e, t);
  const n = new RegExp(`^${ie(t.prefix)}.*`);
  t.pattern ?? (t.pattern = n), e._zod.onattach.push((r) => {
    const i = r._zod.bag;
    i.patterns ?? (i.patterns = /* @__PURE__ */ new Set()), i.patterns.add(n);
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
}), wi = /* @__PURE__ */ p("$ZodCheckEndsWith", (e, t) => {
  R.init(e, t);
  const n = new RegExp(`.*${ie(t.suffix)}$`);
  t.pattern ?? (t.pattern = n), e._zod.onattach.push((r) => {
    const i = r._zod.bag;
    i.patterns ?? (i.patterns = /* @__PURE__ */ new Set()), i.patterns.add(n);
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
}), ki = /* @__PURE__ */ p("$ZodCheckOverwrite", (e, t) => {
  R.init(e, t), e._zod.check = (n) => {
    n.value = t.tx(n.value);
  };
});
class vi {
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
`).filter((s) => s), i = Math.min(...r.map((s) => s.length - s.trimStart().length)), o = r.map((s) => s.slice(i)).map((s) => " ".repeat(this.indent * 2) + s);
    for (const s of o)
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
const Ei = {
  major: 4,
  minor: 5,
  patch: 4
}, S = /* @__PURE__ */ p("$ZodType", (e, t) => {
  var n;
  e ?? (e = {}), e._zod.def = t, e._zod.bag = e._zod.bag || {}, e._zod.version = Ei;
  const r = e._zod.def.checks, i = e._zod.traits.has("$ZodCheck") ? [e, ...r ?? []] : r?.length ? [...r] : [];
  for (const o of i)
    for (const s of o._zod.onattach)
      s(e);
  if (i.length === 0)
    (n = e._zod).deferred ?? (n.deferred = []), e._zod.deferred?.push(() => {
      e._zod.run = e._zod.parse;
    });
  else {
    const o = (c, a, u) => {
      if (c.memo)
        return c;
      let l = ee(c), d;
      for (const f of a) {
        if (f._zod.def.when) {
          if (lr(c) || !f._zod.def.when(c))
            continue;
        } else if (l)
          continue;
        const m = c.issues.length, h = f._zod.check(c);
        if (h instanceof Promise && u?.async === !1)
          throw new ne();
        if (d || h instanceof Promise)
          d = (d ?? Promise.resolve()).then(async () => {
            await h, c.issues.length !== m && (ft(c.issues, m, e), l || (l = ee(c, m)));
          });
        else {
          if (c.issues.length === m)
            continue;
          ft(c.issues, m, e), l || (l = ee(c, m));
        }
      }
      return d ? d.then(() => c) : c;
    }, s = (c, a, u) => {
      if (ee(c))
        return c.aborted = !0, c;
      const l = o(a, i, u);
      if (l instanceof Promise) {
        if (u.async === !1)
          throw new ne();
        return l.then((d) => e._zod.parse(d, u));
      }
      return e._zod.parse(l, u);
    };
    e._zod.run = (c, a) => {
      if (a.skipChecks)
        return e._zod.parse(c, a);
      if (a.direction === "backward") {
        const l = e._zod.parse({ value: c.value, issues: [] }, { ...a, skipChecks: !0 });
        return l instanceof Promise ? l.then((d) => s(d, c, a)) : s(l, c, a);
      }
      const u = e._zod.parse(c, a);
      if (u instanceof Promise) {
        if (a.async === !1)
          throw new ne();
        return u.then((l) => o(l, i, a));
      }
      return o(u, i, a);
    };
  }
}, {
  // Wrappers extend this by installing a richer factory over it; reading it eagerly would defeat the laziness.
  get "~standard"() {
    return nn(this, "~standard", pn(this));
  },
  set "~standard"(e) {
    oe(this, "~standard", e);
  }
}), yt = (e) => e.success ? { value: e.data } : { issues: e.error?.issues };
function pn(e) {
  return {
    validate: (t) => {
      try {
        return yt($r(e, t));
      } catch {
        return Tr(e, t).then(yt);
      }
    },
    vendor: "zod",
    version: 1
  };
}
const rt = /* @__PURE__ */ p("$ZodString", (e, t) => {
  S.init(e, t), e._zod.pattern = [...e?._zod.bag?.patterns ?? []].pop() ?? si(e._zod.bag), e._zod.parse = (n, r) => {
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
}), E = /* @__PURE__ */ p("$ZodStringFormat", (e, t) => {
  Ne.init(e, t), rt.init(e, t);
}), Si = /* @__PURE__ */ p("$ZodGUID", (e, t) => {
  t.pattern ?? (t.pattern = Wr), E.init(e, t);
}), Oi = /* @__PURE__ */ p("$ZodUUID", (e, t) => {
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
    t.pattern ?? (t.pattern = gt(r));
  } else
    t.pattern ?? (t.pattern = gt());
  E.init(e, t);
}), zi = /* @__PURE__ */ p("$ZodEmail", (e, t) => {
  t.pattern ?? (t.pattern = Kr), E.init(e, t);
}), mn = 1, hn = 2;
function $i(e, t) {
  if (!t.normalize && t.protocol?.source === ei.source && !/^https?:\/\//i.test(e))
    return mn;
  try {
    return new URL(e);
  } catch {
    return hn;
  }
}
const Ti = /[\t\n\r]/g;
function Ii(e) {
  return e.replace(Ti, "");
}
function Ni(e, t) {
  return t.lastIndex = 0, t.test(e.hostname);
}
function Pi(e, t) {
  return t.lastIndex = 0, t.test(e.protocol.endsWith(":") ? e.protocol.slice(0, -1) : e.protocol);
}
const Ai = /* @__PURE__ */ p("$ZodURL", (e, t) => {
  E.init(e, t), e._zod.check = (n) => {
    try {
      const r = n.value.trim(), i = $i(r, t);
      if (i === mn) {
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
      if (i === hn) {
        n.issues.push({
          code: "invalid_format",
          format: "url",
          input: n.value,
          inst: e,
          continue: !t.abort
        });
        return;
      }
      t.hostname && !Ni(i, t.hostname) && n.issues.push({
        code: "invalid_format",
        format: "url",
        note: "Invalid hostname",
        pattern: t.hostname.source,
        input: n.value,
        inst: e,
        continue: !t.abort
      }), t.protocol && !Pi(i, t.protocol) && n.issues.push({
        code: "invalid_format",
        format: "url",
        note: "Invalid protocol",
        pattern: t.protocol.source,
        input: n.value,
        inst: e,
        continue: !t.abort
      }), n.value = t.normalize ? i.href : Ii(r);
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
}), Di = /* @__PURE__ */ p("$ZodEmoji", (e, t) => {
  t.pattern ?? (t.pattern = Hr()), E.init(e, t);
}), Zi = /* @__PURE__ */ p("$ZodNanoID", (e, t) => {
  if (t.length !== void 0 && (!Number.isInteger(t.length) || t.length < 1))
    throw new Error(`Invalid nanoid length: ${t.length}`);
  t.pattern ?? (t.pattern = t.length === void 0 ? Fr : Br(t.length)), E.init(e, t);
}), Ri = /* @__PURE__ */ p("$ZodCUID", (e, t) => {
  t.pattern ?? (t.pattern = jr), E.init(e, t);
}), Ci = /* @__PURE__ */ p("$ZodCUID2", (e, t) => {
  t.pattern ?? (t.pattern = xr), E.init(e, t);
}), ji = /* @__PURE__ */ p("$ZodULID", (e, t) => {
  t.pattern ?? (t.pattern = Mr), E.init(e, t);
}), xi = /* @__PURE__ */ p("$ZodXID", (e, t) => {
  t.pattern ?? (t.pattern = Ur), E.init(e, t);
}), Mi = /* @__PURE__ */ p("$ZodKSUID", (e, t) => {
  t.pattern ?? (t.pattern = Lr), E.init(e, t);
}), Ui = /* @__PURE__ */ p("$ZodISODateTime", (e, t) => {
  t.pattern ?? (t.pattern = oi(t)), E.init(e, t), (t.local || t.precision === -1) && (e._zod.bag.laxFormat = !0, e._zod.onattach.push((n) => {
    n._zod.bag.laxFormat = !0;
  }));
}), Li = /* @__PURE__ */ p("$ZodISODate", (e, t) => {
  t.pattern ?? (t.pattern = ri), E.init(e, t);
}), Fi = /* @__PURE__ */ p("$ZodISOTime", (e, t) => {
  t.pattern ?? (t.pattern = ii(t)), E.init(e, t);
}), Bi = /* @__PURE__ */ p("$ZodISODuration", (e, t) => {
  t.pattern ?? (t.pattern = Jr), E.init(e, t);
}), Ji = /* @__PURE__ */ p("$ZodIPv4", (e, t) => {
  t.pattern ?? (t.pattern = Gr), E.init(e, t), e._zod.bag.format = "ipv4";
}), Wi = /^[0-9a-fA-F:.]+$/;
function gn(e) {
  if (!Wi.test(e))
    return !1;
  try {
    return new URL(`http://[${e}]`), !0;
  } catch {
    return !1;
  }
}
const Ki = /* @__PURE__ */ p("$ZodIPv6", (e, t) => {
  t.pattern ?? (t.pattern = Yr), E.init(e, t), e._zod.bag.format = "ipv6", e._zod.check = (n) => {
    gn(n.value) || n.issues.push({
      code: "invalid_format",
      format: "ipv6",
      input: n.value,
      inst: e,
      continue: !t.abort
    });
  };
}), Vi = /* @__PURE__ */ p("$ZodCIDRv4", (e, t) => {
  t.pattern ?? (t.pattern = qr), E.init(e, t);
});
function Hi(e) {
  const t = e.split("/");
  if (t.length !== 2)
    return !1;
  const [n, r] = t;
  if (!r)
    return !1;
  const i = Number(r);
  return `${i}` !== r || i < 0 || i > 128 ? !1 : gn(n);
}
const Gi = /* @__PURE__ */ p("$ZodCIDRv6", (e, t) => {
  t.pattern ?? (t.pattern = Xr), E.init(e, t), e._zod.check = (n) => {
    Hi(n.value) || n.issues.push({
      code: "invalid_format",
      format: "cidrv6",
      input: n.value,
      inst: e,
      continue: !t.abort
    });
  };
});
function yn(e) {
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
const Yi = /* @__PURE__ */ p("$ZodBase64", (e, t) => {
  t.pattern ?? (t.pattern = Qr), E.init(e, t), e._zod.bag.contentEncoding = "base64", e._zod.check = (n) => {
    yn(n.value) || n.issues.push({
      code: "invalid_format",
      format: "base64",
      input: n.value,
      inst: e,
      continue: !t.abort
    });
  };
});
function qi(e) {
  if (!cn.test(e))
    return !1;
  const t = e.replace(/[-_]/g, (r) => r === "-" ? "+" : "/"), n = t.padEnd(Math.ceil(t.length / 4) * 4, "=");
  return yn(n);
}
const Xi = /* @__PURE__ */ p("$ZodBase64URL", (e, t) => {
  t.pattern ?? (t.pattern = cn), E.init(e, t), e._zod.bag.contentEncoding = "base64url", e._zod.check = (n) => {
    qi(n.value) || n.issues.push({
      code: "invalid_format",
      format: "base64url",
      input: n.value,
      inst: e,
      continue: !t.abort
    });
  };
}), Qi = /* @__PURE__ */ p("$ZodE164", (e, t) => {
  t.pattern ?? (t.pattern = ti), E.init(e, t);
});
function eo(e, t = null) {
  try {
    const n = e.split(".");
    if (n.length !== 3)
      return !1;
    const [r] = n;
    if (!r)
      return !1;
    const i = JSON.parse(atob(r));
    return !("typ" in i && i?.typ !== "JWT" || !i.alg || t && (!("alg" in i) || i.alg !== t));
  } catch {
    return !1;
  }
}
const to = /* @__PURE__ */ p("$ZodJWT", (e, t) => {
  E.init(e, t), e._zod.check = (n) => {
    eo(n.value, t.alg) || n.issues.push({
      code: "invalid_format",
      format: "jwt",
      input: n.value,
      inst: e,
      continue: !t.abort
    });
  };
}), _n = /* @__PURE__ */ p("$ZodNumber", (e, t) => {
  S.init(e, t), e._zod.pattern = e._zod.bag.pattern ?? tt, e._zod.parse = (n, r) => {
    if (t.coerce)
      try {
        n.value = Number(n.value);
      } catch {
      }
    const i = n.value;
    if (typeof i == "number" && !Number.isNaN(i) && Number.isFinite(i))
      return n;
    const o = typeof i == "number" ? Number.isNaN(i) ? "NaN" : Number.isFinite(i) ? void 0 : String(i) : void 0;
    return n.issues.push({
      expected: "number",
      code: "invalid_type",
      input: i,
      inst: e,
      ...o ? { received: o } : {}
    }), n;
  };
}), no = /* @__PURE__ */ p("$ZodNumberFormat", (e, t) => {
  di.init(e, t), _n.init(e, t);
}), ro = /* @__PURE__ */ p("$ZodBoolean", (e, t) => {
  S.init(e, t), e._zod.pattern = ai, e._zod.parse = (n, r) => {
    if (t.coerce)
      try {
        n.value = !!n.value;
      } catch {
      }
    const i = n.value;
    return typeof i == "boolean" || n.issues.push({
      expected: "boolean",
      code: "invalid_type",
      input: i,
      inst: e
    }), n;
  };
}), io = /* @__PURE__ */ p("$ZodUnknown", (e, t) => {
  S.init(e, t), e._zod.parse = (n) => n;
}), oo = /* @__PURE__ */ p("$ZodNever", (e, t) => {
  S.init(e, t), e._zod.parse = (n, r) => (n.issues.push({
    expected: "never",
    code: "invalid_type",
    input: n.value,
    inst: e
  }), n);
});
function _t(e, t, n) {
  e.issues.length && t.issues.push(...te(n, e.issues)), t.value[n] = e.value;
}
const so = /* @__PURE__ */ p("$ZodArray", (e, t) => {
  S.init(e, t);
  const n = M.memoizer;
  n?.attach(e), e._zod.parse = (r, i) => {
    const o = r.value;
    if (!Array.isArray(o))
      return r.issues.push({
        expected: "array",
        code: "invalid_type",
        input: o,
        inst: e
      }), r;
    r.value = n ? n.alloc(e, r, Array(o.length), i) : Array(o.length);
    const s = [];
    for (let c = 0; c < o.length; c++) {
      const a = o[c], u = t.element._zod.run({
        value: a,
        issues: []
      }, i);
      u instanceof Promise ? s.push(u.then((l) => _t(l, r, c))) : _t(u, r, c);
    }
    return s.length ? Promise.all(s).then(() => r) : r;
  };
});
function ke(e, t, n, r, i, o) {
  const s = n in r, c = o === "optional";
  if (!(!s && c && i === "optional")) {
    if (e.issues.length) {
      if (i !== void 0 && c && !s)
        return;
      t.issues.push(...te(n, e.issues));
    }
    if (!s && i === void 0) {
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
const ao = [];
function bn(e) {
  const t = Object.keys(e.shape), n = Object.getOwnPropertySymbols(e.shape), r = n.length ? n : ao, i = r.length ? [...t, ...r] : t;
  for (const s of i)
    if (!e.shape?.[s]?._zod?.traits?.has("$ZodType"))
      throw new Error(`Invalid element at key "${String(s)}": expected a Zod schema`);
  const o = nr(e.shape);
  return {
    ...e,
    allKeys: i,
    symbolKeys: r,
    // string-only: handleCatchall matches it against `for...in`, which never yields a symbol
    keySet: new Set(t),
    numKeys: t.length,
    optionalKeys: new Set(o)
  };
}
function wn(e, t, n, r, i, o) {
  const s = [], c = i.keySet, a = i.catchall._zod, u = a.def.type, l = a.optin, d = a.optout;
  for (const f in t) {
    if (c.has(f))
      continue;
    if (f === "__proto__") {
      u === "never" && s.push(f);
      continue;
    }
    if (u === "never") {
      s.push(f);
      continue;
    }
    const m = a.run({ value: t[f], issues: [] }, r);
    m instanceof Promise ? e.push(m.then((h) => ke(h, n, f, t, l, d))) : ke(m, n, f, t, l, d);
  }
  return s.length && n.issues.push({
    code: "unrecognized_keys",
    keys: s,
    input: t,
    inst: o,
    // Describes the shape of the input, not the validity of the parsed value, so it never aborts. The parse still fails; the schema's own checks just get to run first, and an enclosing intersection can reconcile the key against a sibling operand.
    continue: !0
  }), e.length ? Promise.all(e).then(() => n) : n;
}
const bt = /* @__PURE__ */ new WeakMap(), co = /* @__PURE__ */ p("$ZodObject", (e, t) => {
  if (S.init(e, t), !Object.getOwnPropertyDescriptor(t, "shape")?.get) {
    const a = t.shape;
    bt.set(t, a), Object.defineProperty(t, "shape", {
      get: () => {
        const u = { ...a };
        return Object.defineProperty(t, "shape", {
          value: u
        }), bt.set(t, u), u;
      }
    });
  }
  const r = Ge(() => bn(t));
  w(e, "propValues", (a) => {
    const u = a.def.shape, l = {};
    for (const d in u) {
      const f = u[d]._zod;
      if (f.values) {
        Object.prototype.hasOwnProperty.call(l, d) || Z(l, d, /* @__PURE__ */ new Set());
        for (const m of f.values)
          l[d].add(m);
        f.optin !== void 0 && l[d].add(void 0);
      }
    }
    return l;
  });
  const i = be, o = t.catchall;
  let s;
  const c = M.memoizer;
  c?.attach(e), e._zod.parse = (a, u) => {
    s ?? (s = r.value);
    const l = a.value;
    if (!i(l))
      return a.issues.push({
        expected: "object",
        code: "invalid_type",
        input: l,
        inst: e
      }), a;
    a.value = c ? c.alloc(e, a, {}, u) : {};
    const d = [], f = s.shape;
    for (const m of s.allKeys) {
      if (m === "__proto__")
        continue;
      const h = f[m], _ = h._zod.optin, y = h._zod.optout, k = h._zod.run({ value: l[m], issues: [] }, u);
      k instanceof Promise ? d.push(k.then((N) => ke(N, a, m, l, _, y))) : ke(k, a, m, l, _, y);
    }
    return o ? wn(d, l, a, u, r.value, e) : d.length ? Promise.all(d).then(() => a) : a;
  };
}), uo = /* @__PURE__ */ p("$ZodObjectJIT", (e, t) => {
  co.init(e, t);
  const n = e._zod.parse, r = Ge(() => bn(t)), i = M.memoizer, o = (m) => {
    const h = r.value, _ = h.symbolKeys, y = new vi(["payload", "ctx"], { shape: m, inst: e, memo: i, syms: _ }), k = (A) => `shape[${A}]._zod.run({ value: input[${A}], issues: [] }, ctx)`, N = (A, v) => `
          for (let i = 0; i < ${A}.issues.length; i++) {
            const iss = ${A}.issues[i];
            iss.path = iss.path ? [${v}, ...iss.path] : [${v}];
            payload.issues.push(iss);
          }`;
    y.write("const input = payload.value;");
    const st = /* @__PURE__ */ Object.create(null);
    let Vn = 0;
    for (const A of h.allKeys)
      st[A] = `key_${Vn++}`;
    y.write(i ? "const newResult = memo.alloc(inst, payload, {}, ctx);" : "const newResult = {};");
    for (const A of h.allKeys) {
      if (A === "__proto__")
        continue;
      const v = st[A], U = typeof A == "symbol" ? `syms[${_.indexOf(A)}]` : Xn(A), De = `${U} in input`, at = m[A], ct = at?._zod?.optin, ut = ct !== void 0, Hn = at?._zod?.optout === "optional";
      if (y.write(`const ${v} = ${k(U)};`), ut && Hn) {
        const Gn = ct === "optional" ? `${v}_present` : `${v}.value !== undefined || ${v}_present`;
        y.write(`
        const ${v}_present = ${De};
        if (!${v}.issues.length || ${v}_present) {
          if (${v}.issues.length) {${N(v, U)}
          }

          if (${Gn}) {
            newResult[${U}] = ${v}.value;
          }
        }

      `);
      } else ut ? y.write(`
        if (${v}.issues.length) {${N(v, U)}
        }
        
        if (${v}.value === undefined) {
          if (${De}) {
            newResult[${U}] = undefined;
          }
        } else {
          newResult[${U}] = ${v}.value;
        }

      `) : y.write(`
        const ${v}_present = ${De};
        if (${v}.issues.length) {${N(v, U)}
        }
        if (!${v}_present && !${v}.issues.length) {
          payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: undefined,
            path: [${U}]
          });
        }

        if (${v}_present) {
          newResult[${U}] = ${v}.value;
        }

      `);
    }
    return y.write("payload.value = newResult;"), y.write("return payload;"), y.compile();
  };
  let s;
  const c = be, a = !M.jitless, l = a && er.value, d = t.catchall;
  let f;
  e._zod.parse = (m, h) => {
    f ?? (f = r.value);
    const _ = m.value;
    return c(_) ? a && l && h?.async === !1 && h.jitless !== !0 ? (s || (s = o(t.shape)), m = s(m, h), d ? wn([], _, m, h, f, e) : m) : n(m, h) : (m.issues.push({
      expected: "object",
      code: "invalid_type",
      input: _,
      inst: e
    }), m);
  };
});
function wt(e, t, n, r) {
  for (const o of e)
    if (o.issues.length === 0)
      return t.value = o.value, t;
  const i = e.filter((o) => !ee(o));
  return i.length === 1 ? (t.value = i[0].value, i[0]) : (t.issues.push({
    code: "invalid_union",
    input: t.value,
    inst: n,
    errors: e.map((o) => o.issues.map((s) => V(s, r, L())))
  }), t);
}
const lo = /* @__PURE__ */ p("$ZodUnion", (e, t) => {
  S.init(e, t), w(e, "optin", (r) => r.def.options.some((i) => i._zod.optin === "defaulted") ? "defaulted" : r.def.options.some((i) => i._zod.optin !== void 0) ? "optional" : void 0), w(e, "optout", (r) => r.def.options.some((i) => i._zod.optout === "optional") ? "optional" : void 0), w(e, "values", (r) => {
    if (r.def.options.every((i) => i._zod.values))
      return new Set(r.def.options.flatMap((i) => Array.from(i._zod.values)));
  }), w(e, "pattern", (r) => {
    if (r.def.options.every((i) => i._zod.pattern)) {
      const i = r.def.options.map((o) => o._zod.pattern);
      return new RegExp(`^(${i.map((o) => Ye(o.source)).join("|")})$`);
    }
  });
  const n = t.options.length === 1 ? t.options[0]._zod.run : null;
  e._zod.parse = (r, i) => {
    if (n)
      return n(r, i);
    let o = !1;
    const s = [];
    for (const c of t.options) {
      const a = c._zod.run({
        value: r.value,
        issues: []
      }, i);
      if (a instanceof Promise)
        s.push(a), o = !0;
      else {
        if (a.issues.length === 0)
          return a;
        s.push(a);
      }
    }
    return o ? Promise.all(s).then((c) => wt(c, r, e, i)) : wt(s, r, e, i);
  };
}), fo = /* @__PURE__ */ p("$ZodIntersection", (e, t) => {
  S.init(e, t), e._zod.parse = (n, r) => {
    const i = n.value, o = t.left._zod.run({ value: i, issues: [] }, r), s = t.right._zod.run({ value: i, issues: [] }, r);
    return o instanceof Promise || s instanceof Promise ? Promise.all([o, s]).then(([a, u]) => kt(n, a, u)) : kt(n, o, s);
  };
});
function Be(e, t) {
  if (e === t)
    return { valid: !0, data: e };
  if (e instanceof Date && t instanceof Date && +e == +t)
    return { valid: !0, data: e };
  if (re(e) && re(t)) {
    const n = Object.keys(t), r = Object.keys(e).filter((o) => n.indexOf(o) !== -1), i = { ...e, ...t };
    Object.prototype.hasOwnProperty.call(i, "__proto__") && delete i.__proto__;
    for (const o of r) {
      if (o === "__proto__")
        continue;
      const s = Be(e[o], t[o]);
      if (!s.valid)
        return {
          valid: !1,
          mergeErrorPath: [o, ...s.mergeErrorPath]
        };
      i[o] = s.data;
    }
    return { valid: !0, data: i };
  }
  if (Array.isArray(e) && Array.isArray(t)) {
    if (e.length !== t.length)
      return { valid: !1, mergeErrorPath: [] };
    const n = [];
    for (let r = 0; r < e.length; r++) {
      const i = e[r], o = t[r], s = Be(i, o);
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
function kt(e, t, n) {
  const r = /* @__PURE__ */ new Map();
  let i;
  const o = /* @__PURE__ */ new Map(), s = (u, l) => {
    let d;
    if (u.code === "unrecognized_keys" && !u.path?.length)
      i ?? (i = u), d = u.keys;
    else if (u.code === "invalid_key" && u.origin === "record" && u.path?.length === 1) {
      const f = String(u.path[0]);
      o.has(f) || o.set(f, u), d = [f];
    } else
      return !1;
    for (const f of d)
      r.has(f) || r.set(f, {}), r.get(f)[l] = !0;
    return !0;
  };
  for (const u of t.issues)
    s(u, "l") || e.issues.push(u);
  for (const u of n.issues)
    s(u, "r") || e.issues.push(u);
  const c = [...r].filter(([, u]) => u.l && u.r).map(([u]) => u);
  if (c.length) {
    const u = i ? c.filter((l) => i.keys.includes(l)) : [];
    u.length && e.issues.push({ ...i, keys: u });
    for (const l of c)
      !u.includes(l) && o.has(l) && e.issues.push(o.get(l));
  }
  const a = Be(t.value, n.value);
  if (!a.valid) {
    if (ee(e))
      return e;
    throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(a.mergeErrorPath)}`);
  }
  return e.value = a.data, e;
}
const po = /* @__PURE__ */ p("$ZodRecord", (e, t) => {
  S.init(e, t);
  const n = M.memoizer;
  n?.attach(e), e._zod.parse = (r, i) => {
    const o = r.value;
    if (!re(o))
      return r.issues.push({
        expected: "record",
        code: "invalid_type",
        input: o,
        inst: e
      }), r;
    const s = [], c = t.keyType._zod.values;
    if (c && !t.partial) {
      r.value = n ? n.alloc(e, r, {}, i) : {};
      const a = /* @__PURE__ */ new Set();
      for (const l of c)
        if (typeof l == "string" || typeof l == "number" || typeof l == "symbol") {
          if (a.add(typeof l == "number" ? l.toString() : l), l === "__proto__")
            continue;
          const d = t.keyType._zod.run({ value: l, issues: [] }, i);
          if (d instanceof Promise)
            throw new Error("Async schemas not supported in object keys currently");
          if (d.issues.length) {
            r.issues.push({
              code: "invalid_key",
              origin: "record",
              issues: d.issues.map((h) => V(h, i, L())),
              input: l,
              path: [l],
              inst: e
            });
            continue;
          }
          const f = d.value;
          if (f === "__proto__")
            continue;
          const m = t.valueType._zod.run({ value: o[l], issues: [] }, i);
          m instanceof Promise ? s.push(m.then((h) => {
            h.issues.length && r.issues.push(...te(l, h.issues)), r.value[f] = h.value;
          })) : (m.issues.length && r.issues.push(...te(l, m.issues)), r.value[f] = m.value);
        }
      let u;
      for (const l in o)
        if (!a.has(l))
          if (t.mode === "loose") {
            if (l === "__proto__")
              continue;
            r.value[l] = o[l];
          } else
            u = u ?? [], u.push(l);
      u && u.length > 0 && r.issues.push({
        code: "unrecognized_keys",
        input: o,
        inst: e,
        keys: u,
        continue: !0
      });
    } else {
      r.value = n ? n.alloc(e, r, {}, i) : {};
      let a;
      for (const u of Reflect.ownKeys(o)) {
        if (u === "__proto__" || !Object.prototype.propertyIsEnumerable.call(o, u))
          continue;
        let l = t.keyType._zod.run({ value: u, issues: [] }, i);
        if (l instanceof Promise)
          throw new Error("Async schemas not supported in object keys currently");
        if (typeof u == "string" && tt.test(u) && l.issues.length) {
          const h = t.keyType._zod.run({ value: Number(u), issues: [] }, i);
          if (h instanceof Promise)
            throw new Error("Async schemas not supported in object keys currently");
          h.issues.length === 0 && (l = h);
        }
        if (l.issues.length) {
          t.mode === "loose" ? r.value[u] = o[u] : c ? (a = a ?? [], a.push(u)) : r.issues.push({
            code: "invalid_key",
            origin: "record",
            issues: l.issues.map((h) => V(h, i, L())),
            input: u,
            path: [u],
            inst: e
          });
          continue;
        }
        const f = l.value;
        if (f === "__proto__")
          continue;
        const m = t.valueType._zod.run({ value: o[u], issues: [] }, i);
        m instanceof Promise ? s.push(m.then((h) => {
          h.issues.length && r.issues.push(...te(u, h.issues)), r.value[f] = h.value;
        })) : (m.issues.length && r.issues.push(...te(u, m.issues)), r.value[f] = m.value);
      }
      a && a.length > 0 && r.issues.push({
        code: "unrecognized_keys",
        input: o,
        inst: e,
        keys: a,
        continue: !0
      });
    }
    return s.length ? Promise.all(s).then(() => r) : r;
  };
}), mo = /* @__PURE__ */ p("$ZodEnum", (e, t) => {
  S.init(e, t);
  const n = Xt(t.entries), r = new Set(n);
  e._zod.values = r;
  const i = n.filter((o) => tr.has(typeof o));
  e._zod.pattern = new RegExp(i.length ? `^(${i.map((o) => ie(o.toString())).join("|")})$` : "^[^\\s\\S]$"), e._zod.parse = (o, s) => {
    const c = o.value;
    return r.has(c) || o.issues.push({
      code: "invalid_value",
      values: n,
      input: c,
      inst: e
    }), o;
  };
}), ho = /* @__PURE__ */ p("$ZodLiteral", (e, t) => {
  S.init(e, t);
  const n = new Set(t.values);
  e._zod.values = n, e._zod.pattern = new RegExp(t.values.length ? `^(${t.values.map((r) => typeof r == "string" ? ie(r) : r ? ie(r.toString()) : String(r)).join("|")})$` : "^[^\\s\\S]$"), e._zod.parse = (r, i) => {
    const o = r.value;
    return n.has(o) || r.issues.push({
      code: "invalid_value",
      values: t.values,
      input: o,
      inst: e
    }), r;
  };
}), go = /* @__PURE__ */ p("$ZodTransform", (e, t) => {
  S.init(e, t), e._zod.optin = "optional", M.memoizer?.guard(e), e._zod.parse = (n, r) => {
    if (r.direction === "backward")
      throw new rn(e.constructor.name);
    const i = t.transform(n.value, n);
    if (r.async)
      return (i instanceof Promise ? i : Promise.resolve(i)).then((s) => (n.value = s, n));
    if (i instanceof Promise)
      throw new ne();
    return n.value = i, n;
  };
});
function vt(e, t) {
  return e.value = t.issues.length ? void 0 : t.value, e;
}
const kn = /* @__PURE__ */ p("$ZodOptional", (e, t) => {
  S.init(e, t), w(e, "optin", (n) => n.def.innerType._zod.optin === "defaulted" ? "defaulted" : "optional"), e._zod.optout = "optional", w(e, "values", (n) => {
    const r = n.def.innerType._zod.values;
    return r ? /* @__PURE__ */ new Set([...r, void 0]) : void 0;
  }), w(e, "pattern", (n) => {
    const r = n.def.innerType._zod.pattern;
    return r ? new RegExp(`^(${Ye(r.source)})?$`) : void 0;
  }), e._zod.parse = (n, r) => {
    if (n.value === void 0) {
      if (t.innerType._zod.optin !== "defaulted")
        return n;
      const i = t.innerType._zod.run({ value: n.value, issues: [] }, r);
      return i instanceof Promise ? i.then((o) => vt(n, o)) : vt(n, i);
    }
    return t.innerType._zod.run(n, r);
  };
}), yo = /* @__PURE__ */ p("$ZodExactOptional", (e, t) => {
  kn.init(e, t), w(e, "values", (n) => n.def.innerType._zod.values), w(e, "pattern", (n) => n.def.innerType._zod.pattern), e._zod.parse = (n, r) => t.innerType._zod.run(n, r);
}), _o = /* @__PURE__ */ p("$ZodNullable", (e, t) => {
  S.init(e, t), w(e, "optin", (n) => n.def.innerType._zod.optin), w(e, "optout", (n) => n.def.innerType._zod.optout), w(e, "pattern", (n) => {
    const r = n.def.innerType._zod.pattern;
    return r ? new RegExp(`^(${Ye(r.source)}|null)$`) : void 0;
  }), w(e, "values", (n) => n.def.innerType._zod.values ? /* @__PURE__ */ new Set([...n.def.innerType._zod.values, null]) : void 0), e._zod.parse = (n, r) => n.value === null ? n : t.innerType._zod.run(n, r);
}), bo = /* @__PURE__ */ p("$ZodDefault", (e, t) => {
  S.init(e, t), e._zod.optin = "defaulted", w(e, "values", (n) => n.def.innerType._zod.values), e._zod.parse = (n, r) => {
    if (r.direction === "backward")
      return t.innerType._zod.run(n, r);
    if (n.value === void 0)
      return n.value = t.defaultValue, n;
    const i = t.innerType._zod.run(n, r);
    return i instanceof Promise ? i.then((o) => Et(o, t)) : Et(i, t);
  };
});
function Et(e, t) {
  return e.value === void 0 && (e.value = t.defaultValue), e;
}
const wo = /* @__PURE__ */ p("$ZodPrefault", (e, t) => {
  S.init(e, t), e._zod.optin = "defaulted", w(e, "values", (n) => n.def.innerType._zod.values), e._zod.parse = (n, r) => (r.direction === "backward" || n.value === void 0 && (n.value = t.defaultValue), t.innerType._zod.run(n, r));
}), ko = /* @__PURE__ */ p("$ZodNonOptional", (e, t) => {
  S.init(e, t), w(e, "values", (n) => {
    const r = n.def.innerType._zod.values;
    return r ? new Set([...r].filter((i) => i !== void 0)) : void 0;
  }), e._zod.parse = (n, r) => {
    const i = t.innerType._zod.run(n, r);
    return i instanceof Promise ? i.then((o) => St(o, e)) : St(i, e);
  };
});
function St(e, t) {
  return !e.issues.length && e.value === void 0 && e.issues.push({
    code: "invalid_type",
    expected: "nonoptional",
    input: e.value,
    inst: t
  }), e;
}
function Ot(e, t, n, r) {
  return t.issues.length ? (e.value = n.catchValue({
    ...t,
    value: e.value,
    error: {
      issues: t.issues.map((i) => V(i, r, L()))
    },
    input: e.value
  }), e) : (e.value = t.value, t.memo && (e.memo = !0), e);
}
const vo = /* @__PURE__ */ p("$ZodCatch", (e, t) => {
  S.init(e, t), w(e, "optin", (n) => n.def.innerType._zod.optin === "defaulted" ? "defaulted" : "optional"), w(e, "optout", (n) => n.def.innerType._zod.optout), w(e, "values", (n) => n.def.innerType._zod.values), e._zod.parse = (n, r) => {
    if (r.direction === "backward")
      return t.innerType._zod.run(n, r);
    const i = t.innerType._zod.run({ value: n.value, issues: [] }, r);
    return i instanceof Promise ? i.then((o) => Ot(n, o, t, r)) : Ot(n, i, t, r);
  };
}), Eo = /* @__PURE__ */ p("$ZodPipe", (e, t) => {
  S.init(e, t), w(e, "values", (n) => n.def.in._zod.values), w(e, "optin", (n) => n.def.in._zod.optin), w(e, "optout", (n) => n.def.out._zod.optout), w(e, "propValues", (n) => n.def.in._zod.propValues), e._zod.parse = (n, r) => {
    if (r.direction === "backward") {
      const o = t.out._zod.run(n, r);
      return o instanceof Promise ? o.then((s) => fe(s, t.in, r)) : fe(o, t.in, r);
    }
    const i = t.in._zod.run(n, r);
    return i instanceof Promise ? i.then((o) => fe(o, t.out, r)) : fe(i, t.out, r);
  };
});
function fe(e, t, n) {
  return e.issues.some((r) => r.code !== "unrecognized_keys") ? (e.aborted = !0, e) : t._zod.run({ value: e.value, issues: e.issues }, n);
}
const So = /* @__PURE__ */ p("$ZodReadonly", (e, t) => {
  S.init(e, t), w(e, "propValues", (n) => n.def.innerType._zod.propValues), w(e, "values", (n) => n.def.innerType._zod.values), w(e, "optin", (n) => n.def.innerType?._zod?.optin), w(e, "optout", (n) => n.def.innerType?._zod?.optout), e._zod.parse = (n, r) => {
    if (r.direction === "backward")
      return t.innerType._zod.run(n, r);
    const i = t.innerType._zod.run(n, r);
    return i instanceof Promise ? i.then(zt) : zt(i);
  };
});
function zt(e) {
  return e.memo || (e.value = Object.freeze(e.value)), e;
}
const Oo = /* @__PURE__ */ p("$ZodCustom", (e, t) => {
  R.init(e, t), S.init(e, t), e._zod.parse = (n, r) => n, e._zod.check = (n) => {
    const r = n.value, i = t.fn(r);
    if (i instanceof Promise)
      return i.then((o) => $t(o, n, r, e));
    $t(i, n, r, e);
  };
});
function $t(e, t, n, r) {
  if (!e) {
    const i = {
      code: "custom",
      input: n,
      inst: r,
      // incorporates params.error into issue reporting
      path: [...r._zod.def.path ?? []],
      // incorporates params.error into issue reporting
      continue: !r._zod.def.abort
      // params: inst._zod.def.params,
    };
    r._zod.def.params && (i.params = r._zod.def.params), t.issues.push(le(i));
  }
}
class zo extends Error {
  constructor() {
    super("Cannot parse a reference cycle that closes through a transform"), this.name = "ZodCyclicError";
  }
}
const Je = "~memo", Tt = [];
function xe(e) {
  return e.map((t) => t.path ? { ...t, path: t.path.slice() } : { ...t });
}
const It = /* @__PURE__ */ new WeakMap();
function vn(e, t) {
  const n = It.get(e);
  if (n !== void 0)
    return n;
  if (t.has(e))
    return !0;
  t.add(e);
  let r = !1;
  const i = (c) => {
    !r && c?._zod && vn(c, t) && (r = !0);
  }, o = e._zod.def;
  switch (o.type) {
    case "object": {
      for (const c of Reflect.ownKeys(o.shape))
        i(o.shape[c]);
      i(o.catchall);
      break;
    }
    case "array":
      i(o.element);
      break;
    case "tuple":
      for (const c of o.items)
        i(c);
      i(o.rest);
      break;
    case "record":
    case "map":
      i(o.keyType), i(o.valueType);
      break;
    case "set":
      i(o.valueType);
      break;
    case "union":
      for (const c of o.options)
        i(c);
      break;
    case "intersection":
      i(o.left), i(o.right);
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
      i(o.innerType);
      break;
    case "pipe":
      i(o.in), i(o.out);
      break;
    case "function":
      i(o.input), i(o.output);
      break;
    // reading `_zod.innerType` resolves the getter once and caches it
    case "lazy":
      i(e._zod.innerType);
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
      for (const c in o) {
        const a = Object.getOwnPropertyDescriptor(o, c);
        if (!a || a.get)
          continue;
        const u = a.value;
        if (!(!u || typeof u != "object")) {
          if (u._zod)
            i(u);
          else if (Array.isArray(u))
            for (const l of u)
              i(l);
        }
      }
  }
  return t.delete(e), It.set(e, r), r;
}
function $o(e, t) {
  let n = e.buckets.get(t);
  return n || (n = /* @__PURE__ */ new Map(), e.buckets.set(t, n)), n;
}
let pe;
const me = [], To = {
  alloc(e, t, n) {
    const r = pe;
    if (!r)
      return n;
    pe = void 0;
    const i = { value: n, issues: null };
    return r.set(t.value, i), me.push(i), n;
  },
  guard(e) {
    var t;
    (t = e._zod).deferred ?? (t.deferred = []), e._zod.deferred.push(() => {
      const n = e._zod.parse, r = (i, o) => {
        if (o.direction !== "backward" && No(o, i.value))
          throw new zo();
        return n(i, o);
      };
      e._zod.parse = r, e._zod.run === n && (e._zod.run = r);
    });
  },
  attach(e) {
    var t;
    let n, r, i;
    (t = e._zod).deferred ?? (t.deferred = []), e._zod.deferred.push(() => {
      const o = e._zod.parse, s = (c, a) => {
        if (n === void 0 && (n = vn(e, /* @__PURE__ */ new Set()), !n))
          return e._zod.parse = o, e._zod.run === s && (e._zod.run = o), o(c, a);
        const u = c.value;
        if (u === null || typeof u != "object")
          return o(c, a);
        let l = a[Je];
        l || (l = { buckets: /* @__PURE__ */ new Map(), backEdges: void 0 }, a[Je] = l);
        let d;
        r === a ? d = i : (d = $o(l, e), r = a, i = d);
        const f = d.get(u);
        if (f)
          return c.value = f.value, f.issues ? f.issues.length && c.issues.push(...xe(f.issues)) : (c.memo = !0, l.backEdges ?? (l.backEdges = /* @__PURE__ */ new Set()), l.backEdges.add(f.value)), c;
        pe = d;
        const m = me.length, h = o(c, a);
        pe = void 0;
        const _ = me.length > m ? me.pop() : void 0;
        return h instanceof Promise ? h.then((y) => (_ && (_.issues = y.issues.length ? xe(y.issues) : Tt), y)) : (_ && (_.issues = h.issues.length ? xe(h.issues) : Tt), h);
      };
      e._zod.parse = s, e._zod.run === o && (e._zod.run = s);
    });
  }
};
function Io() {
  return To;
}
function No(e, t) {
  const n = e[Je]?.backEdges;
  return n !== void 0 && t !== null && typeof t == "object" && n.has(t);
}
const Po = () => {
  const e = {
    string: { unit: "characters", verb: "to have" },
    file: { unit: "bytes", verb: "to have" },
    array: { unit: "items", verb: "to have" },
    set: { unit: "items", verb: "to have" },
    map: { unit: "entries", verb: "to have" }
  };
  function t(o) {
    return e[o] ?? null;
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
  function i(o, s) {
    return o === "number" && typeof s == "number" && !Number.isFinite(s) ? String(s) : r[o] ?? o;
  }
  return (o) => {
    switch (o.code) {
      case "invalid_type": {
        const s = i(o.expected), c = fr(o.input), a = i(c, o.input);
        return `Invalid input: expected ${s}, received ${a}`;
      }
      case "invalid_value":
        return o.values.length === 1 ? `Invalid input: expected ${tn(o.values[0])}` : `Invalid option: expected one of ${lt(o.values, "|")}`;
      case "too_big": {
        const s = o.exact ? "exactly " : o.inclusive ? "<=" : "<", c = t(o.origin);
        return c ? `Too big: expected ${o.origin ?? "value"} to have ${s}${o.maximum.toString()} ${c.unit ?? "elements"}` : `Too big: expected ${o.origin ?? "value"} to be ${s}${o.maximum.toString()}`;
      }
      case "too_small": {
        const s = o.exact ? "exactly " : o.inclusive ? ">=" : ">", c = t(o.origin);
        return c ? `Too small: expected ${o.origin} to have ${s}${o.minimum.toString()} ${c.unit}` : `Too small: expected ${o.origin} to be ${s}${o.minimum.toString()}`;
      }
      case "invalid_format": {
        const s = o;
        return s.format === "starts_with" ? `Invalid string: must start with "${s.prefix}"` : s.format === "ends_with" ? `Invalid string: must end with "${s.suffix}"` : s.format === "includes" ? `Invalid string: must include "${s.includes}"` : s.format === "regex" ? `Invalid string: must match pattern ${s.pattern}` : `Invalid ${n[s.format] ?? o.format}`;
      }
      case "not_multiple_of":
        return `Invalid number: must be a multiple of ${o.divisor}`;
      case "unrecognized_keys":
        return `Unrecognized key${o.keys.length > 1 ? "s" : ""}: ${lt(o.keys, ", ")}`;
      case "invalid_key":
        return `Invalid key in ${o.origin}`;
      case "invalid_union":
        return o.options && Array.isArray(o.options) && o.options.length > 0 ? `Invalid discriminator value. Expected ${o.options.map((c) => `'${c}'`).join(" | ")}` : o.inclusive === !1 ? "Invalid input: more than one option matched" : "Invalid input";
      case "invalid_element":
        return `Invalid value in ${o.origin}`;
      default:
        return "Invalid input";
    }
  };
};
function Ao() {
  return {
    localeError: Po()
  };
}
var Nt;
class Do {
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
      const i = { ...r, ...this._map.get(t) };
      return Object.keys(i).length ? i : void 0;
    }
    return this._map.get(t);
  }
  has(t) {
    return this._map.has(t);
  }
}
function Zo() {
  return new Do();
}
(Nt = globalThis).__zod_globalRegistry ?? (Nt.__zod_globalRegistry = Zo());
const ce = globalThis.__zod_globalRegistry;
// @__NO_SIDE_EFFECTS__
function Ro(e, t) {
  return new e({
    type: "string",
    ...g(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Co(e, t) {
  return new e({
    type: "string",
    format: "email",
    check: "string_format",
    abort: !1,
    ...g(t)
  });
}
// @__NO_SIDE_EFFECTS__
function jo(e, t) {
  return new e({
    type: "string",
    format: "guid",
    check: "string_format",
    abort: !1,
    ...g(t)
  });
}
// @__NO_SIDE_EFFECTS__
function xo(e, t) {
  return new e({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    ...g(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Mo(e, t) {
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
function Uo(e, t) {
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
function Lo(e, t) {
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
function Fo(e, t) {
  return new e({
    type: "string",
    format: "url",
    check: "string_format",
    abort: !1,
    ...g(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Bo(e, t) {
  return new e({
    type: "string",
    format: "emoji",
    check: "string_format",
    abort: !1,
    ...g(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Jo(e, t) {
  return new e({
    type: "string",
    format: "nanoid",
    check: "string_format",
    abort: !1,
    ...g(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Wo(e, t) {
  return new e({
    type: "string",
    format: "cuid",
    check: "string_format",
    abort: !1,
    ...g(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Ko(e, t) {
  return new e({
    type: "string",
    format: "cuid2",
    check: "string_format",
    abort: !1,
    ...g(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Vo(e, t) {
  return new e({
    type: "string",
    format: "ulid",
    check: "string_format",
    abort: !1,
    ...g(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Ho(e, t) {
  return new e({
    type: "string",
    format: "xid",
    check: "string_format",
    abort: !1,
    ...g(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Go(e, t) {
  return new e({
    type: "string",
    format: "ksuid",
    check: "string_format",
    abort: !1,
    ...g(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Yo(e, t) {
  return new e({
    type: "string",
    format: "ipv4",
    check: "string_format",
    abort: !1,
    ...g(t)
  });
}
// @__NO_SIDE_EFFECTS__
function qo(e, t) {
  return new e({
    type: "string",
    format: "ipv6",
    check: "string_format",
    abort: !1,
    ...g(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Xo(e, t) {
  return new e({
    type: "string",
    format: "cidrv4",
    check: "string_format",
    abort: !1,
    ...g(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Qo(e, t) {
  return new e({
    type: "string",
    format: "cidrv6",
    check: "string_format",
    abort: !1,
    ...g(t)
  });
}
// @__NO_SIDE_EFFECTS__
function es(e, t) {
  return new e({
    type: "string",
    format: "base64",
    check: "string_format",
    abort: !1,
    ...g(t)
  });
}
// @__NO_SIDE_EFFECTS__
function ts(e, t) {
  return new e({
    type: "string",
    format: "base64url",
    check: "string_format",
    abort: !1,
    ...g(t)
  });
}
// @__NO_SIDE_EFFECTS__
function ns(e, t) {
  return new e({
    type: "string",
    format: "e164",
    check: "string_format",
    abort: !1,
    ...g(t)
  });
}
// @__NO_SIDE_EFFECTS__
function rs(e, t) {
  return new e({
    type: "string",
    format: "jwt",
    check: "string_format",
    abort: !1,
    ...g(t)
  });
}
// @__NO_SIDE_EFFECTS__
function is(e, t) {
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
function os(e, t) {
  return new e({
    type: "string",
    format: "date",
    check: "string_format",
    ...g(t)
  });
}
// @__NO_SIDE_EFFECTS__
function ss(e, t) {
  return new e({
    type: "string",
    format: "time",
    check: "string_format",
    precision: null,
    ...g(t)
  });
}
// @__NO_SIDE_EFFECTS__
function as(e, t) {
  return new e({
    type: "string",
    format: "duration",
    check: "string_format",
    ...g(t)
  });
}
// @__NO_SIDE_EFFECTS__
function cs(e, t) {
  return new e({
    type: "number",
    checks: [],
    ...g(t)
  });
}
// @__NO_SIDE_EFFECTS__
function us(e, t) {
  return new e({
    type: "number",
    check: "number_format",
    abort: !1,
    format: "safeint",
    ...g(t)
  });
}
// @__NO_SIDE_EFFECTS__
function ls(e, t) {
  return new e({
    type: "boolean",
    ...g(t)
  });
}
// @__NO_SIDE_EFFECTS__
function ds(e) {
  return new e({
    type: "unknown"
  });
}
// @__NO_SIDE_EFFECTS__
function fs(e, t) {
  return new e({
    type: "never",
    ...g(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Pt(e, t) {
  return new dn({
    check: "less_than",
    ...g(t),
    value: e,
    inclusive: !1
  });
}
// @__NO_SIDE_EFFECTS__
function Me(e, t) {
  return new dn({
    check: "less_than",
    ...g(t),
    value: e,
    inclusive: !0
  });
}
// @__NO_SIDE_EFFECTS__
function At(e, t) {
  return new fn({
    check: "greater_than",
    ...g(t),
    value: e,
    inclusive: !1
  });
}
// @__NO_SIDE_EFFECTS__
function Ue(e, t) {
  return new fn({
    check: "greater_than",
    ...g(t),
    value: e,
    inclusive: !0
  });
}
// @__NO_SIDE_EFFECTS__
function Dt(e, t) {
  return new li({
    check: "multiple_of",
    ...g(t),
    value: e
  });
}
// @__NO_SIDE_EFFECTS__
function En(e, t) {
  return new fi({
    check: "max_length",
    ...g(t),
    maximum: e
  });
}
// @__NO_SIDE_EFFECTS__
function ve(e, t) {
  return new pi({
    check: "min_length",
    ...g(t),
    minimum: e
  });
}
// @__NO_SIDE_EFFECTS__
function Sn(e, t) {
  return new mi({
    check: "length_equals",
    ...g(t),
    length: e
  });
}
// @__NO_SIDE_EFFECTS__
function ps(e, t) {
  return new hi({
    check: "string_format",
    format: "regex",
    ...g(t),
    pattern: e
  });
}
// @__NO_SIDE_EFFECTS__
function ms(e) {
  return new gi({
    check: "string_format",
    format: "lowercase",
    ...g(e)
  });
}
// @__NO_SIDE_EFFECTS__
function hs(e) {
  return new yi({
    check: "string_format",
    format: "uppercase",
    ...g(e)
  });
}
// @__NO_SIDE_EFFECTS__
function gs(e, t) {
  return new _i({
    check: "string_format",
    format: "includes",
    ...g(t),
    includes: e
  });
}
// @__NO_SIDE_EFFECTS__
function ys(e, t) {
  return new bi({
    check: "string_format",
    format: "starts_with",
    ...g(t),
    prefix: e
  });
}
// @__NO_SIDE_EFFECTS__
function _s(e, t) {
  return new wi({
    check: "string_format",
    format: "ends_with",
    ...g(t),
    suffix: e
  });
}
// @__NO_SIDE_EFFECTS__
function se(e) {
  return new ki({
    check: "overwrite",
    tx: e
  });
}
// @__NO_SIDE_EFFECTS__
function bs(e) {
  return /* @__PURE__ */ se((t) => t.normalize(e));
}
// @__NO_SIDE_EFFECTS__
function ws() {
  return /* @__PURE__ */ se((e) => e.trim());
}
// @__NO_SIDE_EFFECTS__
function ks() {
  return /* @__PURE__ */ se((e) => e.toLowerCase());
}
// @__NO_SIDE_EFFECTS__
function vs() {
  return /* @__PURE__ */ se((e) => e.toUpperCase());
}
// @__NO_SIDE_EFFECTS__
function Es() {
  return /* @__PURE__ */ se((e) => Qn(e));
}
// @__NO_SIDE_EFFECTS__
function Ss(e, t, n) {
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
function Os(e, t, n) {
  return new e({
    type: "custom",
    check: "custom",
    fn: t,
    ...g(n)
  });
}
// @__NO_SIDE_EFFECTS__
function zs(e, t) {
  const n = /* @__PURE__ */ $s((r) => (r.addIssue = (i) => {
    if (typeof i == "string")
      r.issues.push(le(i, r.value, n._zod.def));
    else {
      const o = i;
      o.fatal && (o.continue = !1), o.code ?? (o.code = "custom"), "input" in o || (o.input = r.value), o.inst ?? (o.inst = n), o.continue ?? (o.continue = !n._zod.def.abort), r.issues.push(le(o));
    }
  }, e(r.value, r)), t);
  return n;
}
// @__NO_SIDE_EFFECTS__
function $s(e, t) {
  const n = new R({
    check: "custom",
    ...g(t)
  });
  return n._zod.check = e, n;
}
function ue(e, ...t) {
  for (const n of t)
    for (const r of Reflect.ownKeys(n))
      Object.prototype.propertyIsEnumerable.call(n, r) && Z(e, r, n[r]);
  return e;
}
function On(e) {
  let t = e?.target ?? "draft-2020-12";
  return t === "draft-4" && (t = "draft-04"), t === "draft-7" && (t = "draft-07"), {
    processors: e.processors ?? {},
    metadataRegistry: e?.metadata ?? ce,
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
function H(e, t, n, r, i) {
  const o = typeof t.unrepresentable == "function" ? t.unrepresentable({ zodSchema: e, path: r.path, message: i }) : t.unrepresentable;
  if (o === "any")
    return !1;
  if (o === void 0 || o === "throw")
    throw new Error(i);
  return Object.assign(n, o), !0;
}
function T(e, t, n = { path: [], schemaPath: [] }) {
  var r;
  const i = e._zod.def, o = t.seen.get(e);
  if (o)
    return o.count++, n.schemaPath.includes(e) && (o.cycle = n.path), o.schema;
  const s = { schema: {}, count: 1, cycle: void 0, path: n.path };
  t.seen.set(e, s), t.sharedDefsExtractedFor = void 0, t.sharedEmitDoneFor = void 0;
  const c = e._zod.toJSONSchema?.();
  if (c)
    s.schema = c;
  else {
    const l = {
      ...n,
      schemaPath: [...n.schemaPath, e],
      path: n.path
    };
    if (e._zod.processJSONSchema)
      e._zod.processJSONSchema(t, s.schema, l);
    else {
      const f = s.schema, m = t.processors[i.type];
      if (!m)
        throw new Error(`[toJSONSchema]: Non-representable type encountered: ${i.type}`);
      m(e, t, f, l);
    }
    const d = e._zod.parent;
    d && (s.ref || (s.ref = d), T(d, t, l), t.seen.get(d).isParent = !0);
  }
  const a = t.metadataRegistry.get(e);
  return a && ue(s.schema, a), t.io === "input" && P(e) && (delete s.schema.examples, delete s.schema.default), t.io === "input" && "_prefault" in s.schema && ((r = s.schema).default ?? (r.default = s.schema._prefault)), delete s.schema._prefault, t.seen.get(e).schema;
}
function Zt(e) {
  return e.replace(/~/g, "~0").replace(/\//g, "~1");
}
function zn(e, t) {
  const n = e.seen.get(t);
  if (!n)
    throw new Error("Unprocessed schema. This is a bug in Zod.");
  if (e.external && e.sharedDefsExtractedFor === e.external)
    return;
  const r = /* @__PURE__ */ new Map();
  for (const s of e.seen.entries()) {
    const c = e.metadataRegistry.get(s[0])?.id;
    if (c) {
      const a = r.get(c);
      if (a && a !== s[0])
        throw new Error(`Duplicate schema id "${c}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);
      r.set(c, s[0]);
    }
  }
  const i = (s) => {
    const c = e.target === "draft-2020-12" ? "$defs" : "definitions";
    if (e.external) {
      const d = e.external.registry.get(s[0])?.id, f = e.external.uri ?? ((h) => h);
      if (d)
        return { ref: f(d) };
      const m = s[1].defId ?? s[1].schema.id ?? `schema${e.counter++}`;
      return s[1].defId = m, { defId: m, ref: `${f("__shared")}#/${c}/${Zt(m)}` };
    }
    const a = "#", u = `${a}/${c}/`;
    if (s[1] === n && !s[1].schema.id)
      return { ref: a };
    const l = s[1].schema.id ?? `__schema${e.counter++}`;
    return { defId: l, ref: u + Zt(l) };
  }, o = (s) => {
    if (s[1].schema.$ref)
      return;
    const c = s[1], { ref: a, defId: u } = i(s);
    c.def = { ...c.schema }, u && (c.defId = u);
    const l = c.schema;
    for (const d in l)
      delete l[d];
    l.$ref = a;
  };
  if (e.cycles === "throw")
    for (const s of e.seen.entries()) {
      const c = s[1];
      if (c.cycle)
        throw new Error(`Cycle detected: #/${c.cycle?.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`);
    }
  for (const s of e.seen.entries()) {
    const c = s[1];
    if (t === s[0]) {
      o(s);
      continue;
    }
    if (e.external) {
      const u = e.external.registry.get(s[0])?.id;
      if (t !== s[0] && u) {
        o(s);
        continue;
      }
    }
    if (e.metadataRegistry.get(s[0])?.id) {
      o(s);
      continue;
    }
    if (c.cycle) {
      o(s);
      continue;
    }
    if (c.count > 1 && e.reused === "ref") {
      o(s);
      continue;
    }
  }
  e.external && (e.sharedDefsExtractedFor = e.external);
}
function $n(e) {
  const t = e.anyOf;
  if (!Array.isArray(t) || t.length === 0 || e.type !== void 0)
    return;
  const n = [];
  for (const r of t) {
    if (!r || typeof r != "object")
      return;
    $n(r);
    const i = Object.keys(r);
    if (i.length !== 1 || i[0] !== "type")
      return;
    const o = r.type;
    for (const s of Array.isArray(o) ? o : [o]) {
      if (typeof s != "string")
        return;
      n.includes(s) || n.push(s);
    }
  }
  delete e.anyOf, e.type = n.length === 1 ? n[0] : n;
}
const Tn = /* @__PURE__ */ new Set(["type", "properties", "required", "additionalProperties"]), Rt = ["oneOf", "anyOf"];
function Ct(e) {
  const t = e.additionalProperties;
  return t === void 0 || t === !1 || typeof t != "object" || t === null ? null : Object.keys(t).length ? t : null;
}
function We(e) {
  const t = [];
  for (const o of e) {
    if (typeof o != "object" || o.type !== "object")
      return null;
    for (const s in o)
      if (!Tn.has(s))
        return null;
    t.push(o);
  }
  const n = {}, r = /* @__PURE__ */ new Set();
  for (const o of t) {
    for (const s in o.properties) {
      if (Object.prototype.hasOwnProperty.call(n, s))
        continue;
      const c = [];
      for (const u of t) {
        const l = u.properties?.[s] ?? Ct(u);
        l != null && (c.some((d) => JSON.stringify(d) === JSON.stringify(l)) || c.push(l));
      }
      const a = c.length === 1 ? c[0] : We(c) ?? { allOf: c };
      Z(n, s, a);
    }
    for (const s of o.required ?? [])
      r.add(s);
  }
  const i = { type: "object", properties: n };
  if (r.size && (i.required = [...r]), t.every((o) => o.additionalProperties === !1))
    i.additionalProperties = !1;
  else {
    const o = [];
    for (const s of t) {
      const c = Ct(s);
      c && !o.some((a) => JSON.stringify(a) === JSON.stringify(c)) && o.push(c);
    }
    o.length === 1 ? i.additionalProperties = o[0] : o.length > 1 && (i.additionalProperties = { allOf: o });
  }
  return i;
}
function Ts(e) {
  const t = e.allOf;
  if (!Array.isArray(t) || t.length < 2)
    return;
  for (const i of Tn)
    if (i in e)
      return;
  const n = t.filter((i) => Rt.some((o) => Array.isArray(i[o])));
  let r = null;
  if (!n.length)
    r = We(t);
  else {
    const i = n[0], o = Rt.find((a) => Array.isArray(i[a]));
    if (Object.keys(i).length !== 1)
      return;
    const s = t.filter((a) => a !== i), c = i[o].map((a) => We([...s, a]));
    if (c.some((a) => !a))
      return;
    r = { [o]: c };
  }
  r && (delete e.allOf, ue(e, r));
}
function In(e, t) {
  const n = e.seen.get(t);
  if (!n)
    throw new Error("Unprocessed schema. This is a bug in Zod.");
  const r = (c) => {
    const a = e.seen.get(c);
    if (a.ref === null)
      return;
    const u = a.def ?? a.schema, l = { ...u }, d = a.ref;
    if (a.ref = null, d) {
      r(d);
      const m = e.seen.get(d), h = m.schema;
      if (h.$ref && (e.target === "draft-07" || e.target === "draft-04" || e.target === "openapi-3.0") ? (u.allOf = u.allOf ?? [], u.allOf.push(h)) : ue(u, h), ue(u, l), c._zod.parent === d)
        for (const y in u)
          y === "$ref" || y === "allOf" || y in l || delete u[y];
      if (h.$ref && m.def)
        for (const y in u)
          y === "$ref" || y === "allOf" || y in m.def && JSON.stringify(u[y]) === JSON.stringify(m.def[y]) && delete u[y];
    }
    const f = c._zod.parent;
    if (f && f !== d) {
      r(f);
      const m = e.seen.get(f);
      if (m?.schema.$ref && (u.$ref = m.schema.$ref, m.def))
        for (const h in u)
          h === "$ref" || h === "allOf" || h in m.def && JSON.stringify(u[h]) === JSON.stringify(m.def[h]) && delete u[h];
    }
    e.override({
      zodSchema: c,
      jsonSchema: u,
      path: a.path ?? []
    });
  };
  if (!e.external || e.sharedEmitDoneFor !== e.external) {
    for (const c of [...e.seen.entries()].reverse())
      r(c[0]);
    if (e.target !== "openapi-3.0")
      for (const c of e.seen.entries())
        $n(c[1].def ?? c[1].schema);
    for (const c of e.deferred)
      c();
    if (e.intersections.length) {
      const c = /* @__PURE__ */ new Map();
      for (const a of e.seen.values())
        for (const u of [a.schema, a.def]) {
          const l = u?.allOf;
          if (!Array.isArray(l))
            continue;
          const d = c.get(l);
          d ? d.push(u) : c.set(l, [u]);
        }
      for (const a of e.intersections)
        for (const u of c.get(a) ?? [])
          Ts(u);
    }
  }
  const i = {};
  if (e.target === "draft-2020-12" ? i.$schema = "https://json-schema.org/draft/2020-12/schema" : e.target === "draft-07" ? i.$schema = "http://json-schema.org/draft-07/schema#" : e.target === "draft-04" ? i.$schema = "http://json-schema.org/draft-04/schema#" : e.target, e.external?.uri) {
    const c = e.external.registry.get(t)?.id;
    if (!c)
      throw new Error("Schema is missing an `id` property");
    i.$id = e.external.uri(c);
  }
  ue(i, n.defId ? n.schema : n.def ?? n.schema);
  const o = e.metadataRegistry.get(t)?.id;
  o !== void 0 && i.id === o && delete i.id;
  const s = e.external?.defs ?? {};
  if (!e.external || e.sharedEmitDoneFor !== e.external)
    for (const c of e.seen.entries()) {
      const a = c[1];
      a.def && a.defId && (a.def.id === a.defId && delete a.def.id, Z(s, a.defId, a.def));
    }
  e.external && (e.sharedEmitDoneFor = e.external), e.external || Object.keys(s).length > 0 && (e.target === "draft-2020-12" ? i.$defs = s : i.definitions = s);
  try {
    const c = JSON.parse(JSON.stringify(i));
    return Object.defineProperty(c, "~standard", {
      value: {
        ...t["~standard"],
        jsonSchema: {
          input: Ee(t, "input", e.processors),
          output: Ee(t, "output", e.processors)
        }
      },
      enumerable: !1,
      writable: !1
    }), c;
  } catch {
    throw new Error("Error converting schema to JSON.");
  }
}
function P(e, t) {
  const n = t ?? { seen: /* @__PURE__ */ new Set() };
  if (n.seen.has(e))
    return !1;
  n.seen.add(e);
  const r = e._zod.def;
  if (r.type === "transform")
    return !0;
  if (r.type === "array")
    return P(r.element, n);
  if (r.type === "set")
    return P(r.valueType, n);
  if (r.type === "lazy")
    return P(r.getter(), n);
  if (r.type === "promise" || r.type === "optional" || r.type === "nonoptional" || r.type === "nullable" || r.type === "readonly" || r.type === "default" || r.type === "prefault" || r.type === "catch")
    return P(r.innerType, n);
  if (r.type === "intersection")
    return P(r.left, n) || P(r.right, n);
  if (r.type === "record" || r.type === "map")
    return P(r.keyType, n) || P(r.valueType, n);
  if (r.type === "pipe")
    return e._zod.traits.has("$ZodCodec") ? !0 : P(r.in, n) || P(r.out, n);
  if (r.type === "object") {
    for (const i in r.shape)
      if (P(r.shape[i], n))
        return !0;
    return !1;
  }
  if (r.type === "union") {
    for (const i of r.options)
      if (P(i, n))
        return !0;
    return !1;
  }
  if (r.type === "tuple") {
    for (const i of r.items)
      if (P(i, n))
        return !0;
    return !!(r.rest && P(r.rest, n));
  }
  return !1;
}
const Is = (e, t = {}) => (n) => {
  const r = On({ ...n, processors: t });
  return T(e, r), zn(r, e), In(r, e);
}, Ee = (e, t, n = {}) => (r) => {
  const { libraryOptions: i, target: o } = r ?? {}, s = On({ ...i ?? {}, target: o, io: t, processors: n });
  return T(e, s), zn(s, e), In(s, e);
}, Ns = {
  guid: "uuid",
  url: "uri",
  datetime: "date-time",
  json_string: "json-string",
  regex: ""
  // do not set
}, Ps = (e, t, n, r) => {
  const i = n;
  i.type = "string";
  const { minimum: o, maximum: s, format: c, patterns: a, contentEncoding: u, laxFormat: l } = e._zod.bag;
  if (typeof o == "number" && (i.minLength = o), typeof s == "number" && (i.maxLength = s), c && (i.format = Ns[c] ?? c, i.format === "" && delete i.format, (c === "time" || l) && delete i.format), u && (i.contentEncoding = u), a && a.size > 0) {
    const d = [...a];
    d.length === 1 ? i.pattern = d[0].source : d.length > 1 && (i.allOf = [
      ...d.map((f) => ({
        ...t.target === "draft-07" || t.target === "draft-04" || t.target === "openapi-3.0" ? { type: "string" } : {},
        pattern: f.source
      }))
    ]);
  }
}, As = (e, t, n, r) => {
  const i = n, { minimum: o, maximum: s, format: c, multipleOf: a, exclusiveMaximum: u, exclusiveMinimum: l } = e._zod.bag;
  typeof c == "string" && c.includes("int") ? i.type = "integer" : i.type = "number";
  const d = typeof l == "number" && l >= (o ?? Number.NEGATIVE_INFINITY), f = typeof u == "number" && u <= (s ?? Number.POSITIVE_INFINITY), m = t.target === "draft-04" || t.target === "openapi-3.0";
  d ? m ? (i.minimum = l, i.exclusiveMinimum = !0) : i.exclusiveMinimum = l : typeof o == "number" && (i.minimum = o), f ? m ? (i.maximum = u, i.exclusiveMaximum = !0) : i.exclusiveMaximum = u : typeof s == "number" && (i.maximum = s), typeof a == "number" && (Number.isFinite(a) && a !== 0 ? i.multipleOf = Math.abs(a) : H(e, t, i, r, `A multipleOf divisor of ${a} cannot be represented in JSON Schema`));
}, Ds = (e, t, n, r) => {
  n.type = "boolean";
}, Zs = (e, t, n, r) => {
  n.not = {};
}, Rs = (e, t, n, r) => {
}, Cs = (e, t, n, r) => {
  const i = e._zod.def, o = Xt(i.entries);
  if (o.length === 0) {
    n.not = {};
    return;
  }
  o.every((s) => typeof s == "number") && (n.type = "number"), o.every((s) => typeof s == "string") && (n.type = "string"), n.enum = o;
}, js = (e, t, n, r) => {
  const i = e._zod.def;
  if (i.values.length === 0) {
    n.not = {};
    return;
  }
  const o = [];
  for (const s of i.values)
    if (s === void 0) {
      if (H(e, t, n, r, "Literal `undefined` cannot be represented in JSON Schema"))
        return;
    } else if (typeof s == "bigint") {
      if (H(e, t, n, r, "BigInt literals cannot be represented in JSON Schema"))
        return;
      o.push(Number(s));
    } else
      o.push(s);
  if (o.length !== 0) if (o.length === 1) {
    const s = o[0];
    n.type = s === null ? "null" : typeof s, t.target === "draft-04" || t.target === "openapi-3.0" ? n.enum = [s] : n.const = s;
  } else
    o.every((s) => typeof s == "number") && (n.type = "number"), o.every((s) => typeof s == "string") && (n.type = "string"), o.every((s) => typeof s == "boolean") && (n.type = "boolean"), o.every((s) => s === null) && (n.type = "null"), n.enum = o;
}, xs = (e, t, n, r) => {
  H(e, t, n, r, "Custom types cannot be represented in JSON Schema");
}, Ms = (e, t, n, r) => {
  H(e, t, n, r, "Transforms cannot be represented in JSON Schema");
}, Us = (e, t, n, r) => {
  const i = n, o = e._zod.def, { minimum: s, maximum: c } = e._zod.bag;
  typeof s == "number" && (i.minItems = s), typeof c == "number" && (i.maxItems = c), i.type = "array", i.items = T(o.element, t, {
    ...r,
    path: [...r.path, "items"]
  });
};
function Se(e) {
  const t = e._zod.def;
  return t.type === "pipe" && t.in._zod.traits.has("$ZodTransform") ? Se(t.out) : t.type === "catch" ? Se(t.innerType) : e._zod.optin;
}
const Ls = (e, t, n, r) => {
  const i = n, o = e._zod.def, s = o.shape;
  if (Object.getOwnPropertySymbols(s).length && H(e, t, i, r, "Symbol keys cannot be represented in JSON Schema"))
    return;
  i.type = "object", i.properties = {};
  for (const l in s)
    Z(i.properties, l, T(s[l], t, {
      ...r,
      path: [...r.path, "properties", l]
    }));
  const a = new Set(Object.keys(s)), u = new Set([...a].filter((l) => {
    const d = o.shape[l];
    return t.io === "input" ? Se(d) === void 0 : d._zod.optout === void 0;
  }));
  u.size > 0 && (i.required = Array.from(u)), o.catchall?._zod.def.type === "never" ? i.additionalProperties = !1 : o.catchall ? o.catchall && (i.additionalProperties = T(o.catchall, t, {
    ...r,
    path: [...r.path, "additionalProperties"]
  })) : t.io === "output" && (i.additionalProperties = !1);
}, Fs = (e, t, n, r) => {
  const i = e._zod.def, o = i.inclusive === !1, s = i.options.map((c, a) => T(c, t, {
    ...r,
    path: [...r.path, o ? "oneOf" : "anyOf", a]
  }));
  o ? n.oneOf = s : n.anyOf = s;
}, Bs = (e, t, n, r) => {
  const i = e._zod.def, o = T(i.left, t, {
    ...r,
    path: [...r.path, "allOf", 0]
  }), s = T(i.right, t, {
    ...r,
    path: [...r.path, "allOf", 1]
  }), c = (u) => "allOf" in u && Object.keys(u).length === 1, a = [
    ...c(o) ? o.allOf : [o],
    ...c(s) ? s.allOf : [s]
  ];
  n.allOf = a, t.intersections.push(a);
};
function Ke(e, t, n) {
  if (t.$ref) {
    if (n.has(t))
      return t;
    n.add(t);
    const h = e.get(t)?.def;
    if (!h)
      return t;
    const _ = Ke(e, h, n);
    return _ === h ? t : _;
  }
  for (const h of ["anyOf", "oneOf"]) {
    const _ = t[h];
    if (!Array.isArray(_))
      continue;
    const y = _.map((k) => Ke(e, k, n));
    y.some((k, N) => k !== _[N]) && (t = { ...t, [h]: y });
  }
  const r = Array.isArray(t.type) ? t.type : [t.type], i = !r.includes("string") && r.some((h) => h === "number" || h === "integer"), o = t.enum ?? (t.const !== void 0 ? [t.const] : void 0);
  if (!i && !o?.some((h) => typeof h == "number"))
    return t;
  const { minimum: s, maximum: c, exclusiveMinimum: a, exclusiveMaximum: u, multipleOf: l, format: d, id: f, ...m } = t;
  return m.enum ? m.enum = m.enum.map((h) => typeof h == "number" ? String(h) : h) : typeof m.const == "number" && (m.const = String(m.const)), i && (m.type = "string", o || (m.pattern = (r.includes("number") ? tt : ln).source)), m;
}
const Ve = /* @__PURE__ */ new WeakMap();
function Js(e) {
  const t = /* @__PURE__ */ new Map();
  for (const r of e.seen.values())
    r.def && !t.has(r.schema) && t.set(r.schema, r);
  const n = /* @__PURE__ */ new Map();
  for (const r of Ve.get(e) ?? []) {
    const i = e.seen.get(r), o = (i?.def ?? i?.schema)?.propertyNames;
    if (!o || o === !0 || n.has(o))
      continue;
    const s = Ke(t, o, /* @__PURE__ */ new Set());
    s !== o && n.set(o, s);
  }
  if (n.size)
    for (const r of e.seen.values())
      for (const i of [r.schema, r.def]) {
        const o = i && n.get(i.propertyNames);
        o && (i.propertyNames = o);
      }
}
const Ws = (e, t, n, r) => {
  const i = n, o = e._zod.def;
  i.type = "object";
  const s = o.keyType, a = s._zod.bag?.patterns;
  if (o.mode === "loose" && a && a.size > 0) {
    const d = T(o.valueType, t, {
      ...r,
      path: [...r.path, "patternProperties", "*"]
    });
    i.patternProperties = {};
    for (const f of a)
      Z(i.patternProperties, f.source, d);
  } else {
    if (t.target === "draft-07" || t.target === "draft-2020-12") {
      i.propertyNames = T(o.keyType, t, {
        ...r,
        path: [...r.path, "propertyNames"]
      });
      let d = Ve.get(t);
      d || (d = [], Ve.set(t, d), t.deferred.push(() => Js(t))), d.push(e);
    }
    i.additionalProperties = T(o.valueType, t, {
      ...r,
      path: [...r.path, "additionalProperties"]
    });
  }
  const u = s._zod.values, l = t.io === "input" && Se(o.valueType) !== void 0;
  if (u && !o.partial && !l) {
    const d = [...u].filter((f) => typeof f == "string" || typeof f == "number");
    d.length > 0 && (i.required = d.map(String));
  }
}, Ks = (e, t, n, r) => {
  const i = e._zod.def, o = T(i.innerType, t, r), s = t.seen.get(e);
  t.target === "openapi-3.0" ? (s.ref = i.innerType, n.nullable = !0) : n.anyOf = [o, { type: "null" }];
}, Vs = (e, t, n, r) => {
  const i = e._zod.def;
  T(i.innerType, t, r);
  const o = t.seen.get(e);
  o.ref = i.innerType;
}, it = /* @__PURE__ */ Symbol();
function Nn(e, t, n, r, i) {
  let o = !1;
  const s = JSON.stringify(e, (c, a) => typeof a != "bigint" ? a : (o = !0, null));
  return o ? (H(t, n, r, i, "BigInt defaults cannot be represented in JSON Schema"), it) : JSON.parse(s);
}
const Hs = (e, t, n, r) => {
  const i = e._zod.def;
  T(i.innerType, t, r);
  const o = t.seen.get(e);
  o.ref = i.innerType;
  const s = Nn(i.defaultValue, e, t, n, r);
  s !== it && (n.default = s);
}, Gs = (e, t, n, r) => {
  const i = e._zod.def;
  T(i.innerType, t, r);
  const o = t.seen.get(e);
  if (o.ref = i.innerType, t.io !== "input")
    return;
  const s = Nn(i.defaultValue, e, t, n, r);
  s !== it && (n._prefault = s);
}, Ys = (e, t, n, r) => {
  const i = e._zod.def;
  T(i.innerType, t, r);
  const o = t.seen.get(e);
  o.ref = i.innerType;
  let s;
  try {
    s = i.catchValue(void 0);
  } catch {
    H(e, t, n, r, "Dynamic catch values are not supported in JSON Schema");
    return;
  }
  n.default = s;
}, qs = (e, t, n, r) => {
  const i = e._zod.def, o = i.in._zod.traits.has("$ZodTransform"), s = t.io === "input" ? o ? i.out : i.in : i.out;
  T(s, t, r);
  const c = t.seen.get(e);
  c.ref = s;
}, Xs = (e, t, n, r) => {
  const i = e._zod.def;
  T(i.innerType, t, r);
  const o = t.seen.get(e);
  o.ref = i.innerType, n.readOnly = !0;
}, Pn = (e, t, n, r) => {
  const i = e._zod.def;
  T(i.innerType, t, r);
  const o = t.seen.get(e);
  o.ref = i.innerType;
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
const An = (e, t) => {
  sn.init(e, t), e.name = "ZodError";
  const n = Object.getPrototypeOf(e);
  jt.has(n) || (jt.add(n), he(n, "format", (r) => (i) => zr(r, i)), he(n, "flatten", (r) => (i) => Or(r, i)), he(n, "addIssue", (r) => (i) => {
    r.issues.push(i), r.message = JSON.stringify(r.issues, Le, 2);
  }), he(n, "addIssues", (r) => (i) => {
    r.issues.push(...i), r.message = JSON.stringify(r.issues, Le, 2);
  }), Object.defineProperty(n, "isEmpty", {
    configurable: !0,
    enumerable: !1,
    get() {
      return this.issues.length === 0;
    }
  }));
}, Dn = /* @__PURE__ */ p("ZodError", An), x = /* @__PURE__ */ p("ZodError", An, void 0, {
  Parent: Error
}), Qs = /* @__PURE__ */ Qe(x), ea = /* @__PURE__ */ et(x), ta = /* @__PURE__ */ Te(x), na = /* @__PURE__ */ Ie(x), ra = /* @__PURE__ */ Ir(x), ia = /* @__PURE__ */ Nr(x), oa = /* @__PURE__ */ Pr(x), sa = /* @__PURE__ */ Ar(x), aa = /* @__PURE__ */ Dr(x), ca = /* @__PURE__ */ Zr(x), ua = /* @__PURE__ */ Rr(x), la = /* @__PURE__ */ Cr(x);
function da() {
  M.localeError || L(Ao());
}
function Pe() {
  M.memoizer || L({ memoizer: Io() });
}
const O = /* @__PURE__ */ p("ZodType", (e, t) => (da(), S.init(e, t), e.def = t, e.type = t.type, e), {
  check(...e) {
    const t = this.def;
    return this.clone(G(t, {
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
    return Y(this, e, t);
  },
  brand() {
    return this;
  },
  register(e, t) {
    return e.add(this, t), this;
  },
  refine(e, t) {
    return this.check(fc(e, t));
  },
  superRefine(e, t) {
    return this.check(pc(e, t));
  },
  overwrite(e) {
    return this.check(/* @__PURE__ */ se(e));
  },
  optional() {
    return Ut(this);
  },
  exactOptional() {
    return Qa(this);
  },
  nullable() {
    return Lt(this);
  },
  nullish() {
    return Ut(Lt(this));
  },
  nonoptional(e) {
    return oc(this, e);
  },
  array() {
    return F(this);
  },
  or(e) {
    return Ja([this, e]);
  },
  and(e) {
    return Ka(this, e);
  },
  transform(e) {
    return Ft(this, Xa(e));
  },
  default(e) {
    return nc(this, e);
  },
  prefault(e) {
    return ic(this, e);
  },
  catch(e) {
    return ac(this, e);
  },
  pipe(e) {
    return Ft(this, e);
  },
  readonly() {
    return lc(this);
  },
  describe(e) {
    const t = this.clone();
    return ce.add(t, { description: e }), t;
  },
  meta(...e) {
    if (e.length === 0)
      return ce.get(this);
    const t = this.clone();
    return ce.add(t, e[0]), t;
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
    return nn(this, "~standard", {
      ...pn(this),
      jsonSchema: {
        input: Ee(this, "input"),
        output: Ee(this, "output")
      }
    });
  },
  set "~standard"(e) {
    oe(this, "~standard", e);
  },
  parse: function e(t, n) {
    return Qs(this, t, n, { callee: e });
  },
  parseAsync: async function e(t, n) {
    return await ea(this, t, n, { callee: e });
  },
  safeParse(e, t) {
    return ta(this, e, t);
  },
  async safeParseAsync(e, t) {
    return na(this, e, t);
  },
  // `spa` is an alias: same function object as `safeParseAsync`, as before.
  get spa() {
    return this?.safeParseAsync;
  },
  set spa(e) {
    oe(this, "spa", e);
  },
  encode: function e(t, n) {
    return ra(this, t, n, { callee: e });
  },
  decode: function e(t, n) {
    return ia(this, t, n, { callee: e });
  },
  encodeAsync: async function e(t, n) {
    return await oa(this, t, n, { callee: e });
  },
  decodeAsync: async function e(t, n) {
    return await sa(this, t, n, { callee: e });
  },
  safeEncode(e, t) {
    return aa(this, e, t);
  },
  safeDecode(e, t) {
    return ca(this, e, t);
  },
  async safeEncodeAsync(e, t) {
    return ua(this, e, t);
  },
  async safeDecodeAsync(e, t) {
    return la(this, e, t);
  },
  toJSONSchema(e) {
    return Is(this, {})(e);
  },
  // Reads through to the registry on every access, so it must not cache.
  get description() {
    return ce.get(this)?.description;
  },
  // No setter: `schema._def = x` throws, as it did when `_def` was a non-writable own property.
  get _def() {
    return this._zod.def;
  }
}), Zn = /* @__PURE__ */ p("_ZodString", (e, t) => {
  rt.init(e, t), O.init(e, t), e._zod.processJSONSchema = (r, i, o) => Ps(e, r, i);
  const n = e._zod.bag;
  e.format = n.format ?? null, e.minLength = n.minimum ?? null, e.maxLength = n.maximum ?? null;
}, {
  regex(...e) {
    return this.check(/* @__PURE__ */ ps(...e));
  },
  includes(...e) {
    return this.check(/* @__PURE__ */ gs(...e));
  },
  startsWith(...e) {
    return this.check(/* @__PURE__ */ ys(...e));
  },
  endsWith(...e) {
    return this.check(/* @__PURE__ */ _s(...e));
  },
  min(...e) {
    return this.check(/* @__PURE__ */ ve(...e));
  },
  max(...e) {
    return this.check(/* @__PURE__ */ En(...e));
  },
  length(...e) {
    return this.check(/* @__PURE__ */ Sn(...e));
  },
  nonempty(...e) {
    return this.check(/* @__PURE__ */ ve(1, ...e));
  },
  lowercase(e) {
    return this.check(/* @__PURE__ */ ms(e));
  },
  uppercase(e) {
    return this.check(/* @__PURE__ */ hs(e));
  },
  trim() {
    return this.check(/* @__PURE__ */ ws());
  },
  normalize(...e) {
    return this.check(/* @__PURE__ */ bs(...e));
  },
  toLowerCase() {
    return this.check(/* @__PURE__ */ ks());
  },
  toUpperCase() {
    return this.check(/* @__PURE__ */ vs());
  },
  slugify() {
    return this.check(/* @__PURE__ */ Es());
  }
}), fa = /* @__PURE__ */ p("ZodString", (e, t) => {
  rt.init(e, t), Zn.init(e, t);
}, {
  email(e) {
    return this.check(/* @__PURE__ */ Co(ya, e));
  },
  url(e) {
    return this.check(/* @__PURE__ */ Fo(ba, e));
  },
  jwt(e) {
    return this.check(/* @__PURE__ */ rs(Za, e));
  },
  emoji(e) {
    return this.check(/* @__PURE__ */ Bo(wa, e));
  },
  guid(e) {
    return this.check(/* @__PURE__ */ jo(_a, e));
  },
  uuid(e) {
    return this.check(/* @__PURE__ */ xo(ge, e));
  },
  uuidv4(e) {
    return this.check(/* @__PURE__ */ Mo(ge, e));
  },
  uuidv6(e) {
    return this.check(/* @__PURE__ */ Uo(ge, e));
  },
  uuidv7(e) {
    return this.check(/* @__PURE__ */ Lo(ge, e));
  },
  nanoid(e) {
    return this.check(/* @__PURE__ */ Jo(ka, e));
  },
  cuid(e) {
    return this.check(/* @__PURE__ */ Wo(va, e));
  },
  cuid2(e) {
    return this.check(/* @__PURE__ */ Ko(Ea, e));
  },
  ulid(e) {
    return this.check(/* @__PURE__ */ Vo(Sa, e));
  },
  base64(e) {
    return this.check(/* @__PURE__ */ es(Pa, e));
  },
  base64url(e) {
    return this.check(/* @__PURE__ */ ts(Aa, e));
  },
  xid(e) {
    return this.check(/* @__PURE__ */ Ho(Oa, e));
  },
  ksuid(e) {
    return this.check(/* @__PURE__ */ Go(za, e));
  },
  ipv4(e) {
    return this.check(/* @__PURE__ */ Yo($a, e));
  },
  ipv6(e) {
    return this.check(/* @__PURE__ */ qo(Ta, e));
  },
  cidrv4(e) {
    return this.check(/* @__PURE__ */ Xo(Ia, e));
  },
  cidrv6(e) {
    return this.check(/* @__PURE__ */ Qo(Na, e));
  },
  e164(e) {
    return this.check(/* @__PURE__ */ ns(Da, e));
  },
  datetime(e) {
    return this.check(/* @__PURE__ */ is(pa, e));
  },
  date(e) {
    return this.check(/* @__PURE__ */ os(ma, e));
  },
  time(e) {
    return this.check(/* @__PURE__ */ ss(ha, e));
  },
  duration(e) {
    return this.check(/* @__PURE__ */ as(ga, e));
  }
});
function $(e) {
  return /* @__PURE__ */ Ro(fa, e);
}
const z = /* @__PURE__ */ p("ZodStringFormat", (e, t) => {
  E.init(e, t), Zn.init(e, t);
}), pa = /* @__PURE__ */ p("ZodISODateTime", (e, t) => {
  Ui.init(e, t), z.init(e, t);
}), ma = /* @__PURE__ */ p("ZodISODate", (e, t) => {
  Li.init(e, t), z.init(e, t);
}), ha = /* @__PURE__ */ p("ZodISOTime", (e, t) => {
  Fi.init(e, t), z.init(e, t);
}), ga = /* @__PURE__ */ p("ZodISODuration", (e, t) => {
  Bi.init(e, t), z.init(e, t);
}), ya = /* @__PURE__ */ p("ZodEmail", (e, t) => {
  zi.init(e, t), z.init(e, t);
}), _a = /* @__PURE__ */ p("ZodGUID", (e, t) => {
  Si.init(e, t), z.init(e, t);
}), ge = /* @__PURE__ */ p("ZodUUID", (e, t) => {
  Oi.init(e, t), z.init(e, t);
}), ba = /* @__PURE__ */ p("ZodURL", (e, t) => {
  Ai.init(e, t), z.init(e, t);
}), wa = /* @__PURE__ */ p("ZodEmoji", (e, t) => {
  Di.init(e, t), z.init(e, t);
}), ka = /* @__PURE__ */ p("ZodNanoID", (e, t) => {
  Zi.init(e, t), z.init(e, t);
}), va = /* @__PURE__ */ p("ZodCUID", (e, t) => {
  Ri.init(e, t), z.init(e, t);
}), Ea = /* @__PURE__ */ p("ZodCUID2", (e, t) => {
  Ci.init(e, t), z.init(e, t);
}), Sa = /* @__PURE__ */ p("ZodULID", (e, t) => {
  ji.init(e, t), z.init(e, t);
}), Oa = /* @__PURE__ */ p("ZodXID", (e, t) => {
  xi.init(e, t), z.init(e, t);
}), za = /* @__PURE__ */ p("ZodKSUID", (e, t) => {
  Mi.init(e, t), z.init(e, t);
}), $a = /* @__PURE__ */ p("ZodIPv4", (e, t) => {
  Ji.init(e, t), z.init(e, t);
}), Ta = /* @__PURE__ */ p("ZodIPv6", (e, t) => {
  Ki.init(e, t), z.init(e, t);
}), Ia = /* @__PURE__ */ p("ZodCIDRv4", (e, t) => {
  Vi.init(e, t), z.init(e, t);
}), Na = /* @__PURE__ */ p("ZodCIDRv6", (e, t) => {
  Gi.init(e, t), z.init(e, t);
}), Pa = /* @__PURE__ */ p("ZodBase64", (e, t) => {
  Yi.init(e, t), z.init(e, t);
}), Aa = /* @__PURE__ */ p("ZodBase64URL", (e, t) => {
  Xi.init(e, t), z.init(e, t);
}), Da = /* @__PURE__ */ p("ZodE164", (e, t) => {
  Qi.init(e, t), z.init(e, t);
}), Za = /* @__PURE__ */ p("ZodJWT", (e, t) => {
  to.init(e, t), z.init(e, t);
}), Rn = /* @__PURE__ */ p("ZodNumber", (e, t) => {
  _n.init(e, t), O.init(e, t), e._zod.processJSONSchema = (r, i, o) => As(e, r, i, o);
  const n = e._zod.bag;
  e.minValue = Math.max(n.minimum ?? Number.NEGATIVE_INFINITY, n.exclusiveMinimum ?? Number.NEGATIVE_INFINITY) ?? null, e.maxValue = Math.min(n.maximum ?? Number.POSITIVE_INFINITY, n.exclusiveMaximum ?? Number.POSITIVE_INFINITY) ?? null, e.isInt = (n.format ?? "").includes("int") || Number.isSafeInteger(n.multipleOf ?? 0.5), e.isFinite = !0, e.format = n.format ?? null;
}, {
  gt(e, t) {
    return this.check(/* @__PURE__ */ At(e, t));
  },
  gte(e, t) {
    return this.check(/* @__PURE__ */ Ue(e, t));
  },
  min(e, t) {
    return this.check(/* @__PURE__ */ Ue(e, t));
  },
  lt(e, t) {
    return this.check(/* @__PURE__ */ Pt(e, t));
  },
  lte(e, t) {
    return this.check(/* @__PURE__ */ Me(e, t));
  },
  max(e, t) {
    return this.check(/* @__PURE__ */ Me(e, t));
  },
  int(e) {
    return this.check(xt(e));
  },
  safe(e) {
    return this.check(xt(e));
  },
  positive(e) {
    return this.check(/* @__PURE__ */ At(0, e));
  },
  nonnegative(e) {
    return this.check(/* @__PURE__ */ Ue(0, e));
  },
  negative(e) {
    return this.check(/* @__PURE__ */ Pt(0, e));
  },
  nonpositive(e) {
    return this.check(/* @__PURE__ */ Me(0, e));
  },
  multipleOf(e, t) {
    return this.check(/* @__PURE__ */ Dt(e, t));
  },
  step(e, t) {
    return this.check(/* @__PURE__ */ Dt(e, t));
  },
  finite() {
    return this;
  }
});
function I(e) {
  return /* @__PURE__ */ cs(Rn, e);
}
const Ra = /* @__PURE__ */ p("ZodNumberFormat", (e, t) => {
  no.init(e, t), Rn.init(e, t);
});
function xt(e) {
  return /* @__PURE__ */ us(Ra, e);
}
const Ca = /* @__PURE__ */ p("ZodBoolean", (e, t) => {
  ro.init(e, t), O.init(e, t), e._zod.processJSONSchema = (n, r, i) => Ds(e, n, r);
});
function ja(e) {
  return /* @__PURE__ */ ls(Ca, e);
}
const xa = /* @__PURE__ */ p("ZodUnknown", (e, t) => {
  io.init(e, t), O.init(e, t), e._zod.processJSONSchema = (n, r, i) => Rs();
});
function Mt() {
  return /* @__PURE__ */ ds(xa);
}
const Ma = /* @__PURE__ */ p("ZodNever", (e, t) => {
  oo.init(e, t), O.init(e, t), e._zod.processJSONSchema = (n, r, i) => Zs(e, n, r);
});
function Ua(e) {
  return /* @__PURE__ */ fs(Ma, e);
}
const La = /* @__PURE__ */ p("ZodArray", (e, t) => {
  Pe(), so.init(e, t), O.init(e, t), e._zod.processJSONSchema = (n, r, i) => Us(e, n, r, i), e.element = t.element;
}, {
  min(e, t) {
    return this.check(/* @__PURE__ */ ve(e, t));
  },
  nonempty(e) {
    return this.check(/* @__PURE__ */ ve(1, e));
  },
  max(e, t) {
    return this.check(/* @__PURE__ */ En(e, t));
  },
  length(e, t) {
    return this.check(/* @__PURE__ */ Sn(e, t));
  },
  unwrap() {
    return this.element;
  }
});
function F(e, t) {
  return /* @__PURE__ */ Ss(La, e, t);
}
const Fa = /* @__PURE__ */ p("ZodObject", (e, t) => {
  Pe(), uo.init(e, t), O.init(e, t), e._zod.processJSONSchema = (n, r, i) => Ls(e, n, r, i), yr(e, "shape", (n) => n._zod.def.shape, !1);
}, {
  keyof() {
    return j(Object.keys(this._zod.def.shape));
  },
  catchall(e) {
    return this.clone({ ...this._zod.def, catchall: e });
  },
  passthrough() {
    return this.clone({ ...this._zod.def, catchall: Mt() });
  },
  loose() {
    return this.clone({ ...this._zod.def, catchall: Mt() });
  },
  strict() {
    return this.clone({ ...this._zod.def, catchall: Ua() });
  },
  strip() {
    return this.clone({ ...this._zod.def, catchall: void 0 });
  },
  extend(e) {
    return sr(this, e);
  },
  safeExtend(e) {
    return ar(this, e);
  },
  merge(e) {
    return cr(this, e);
  },
  pick(e) {
    return ir(this, e);
  },
  omit(e) {
    return or(this, e);
  },
  partial(...e) {
    return dt(Cn, this, e[0]);
  },
  exactPartial(...e) {
    return dt(jn, this, e[0], "exactPartial");
  },
  required(...e) {
    return ur(xn, this, e[0]);
  }
});
function D(e, t) {
  const n = {
    type: "object",
    shape: e ?? {},
    ...g(t)
  };
  return new Fa(n);
}
const Ba = /* @__PURE__ */ p("ZodUnion", (e, t) => {
  lo.init(e, t), O.init(e, t), e._zod.processJSONSchema = (n, r, i) => Fs(e, n, r, i), e.options = t.options;
});
function Ja(e, t) {
  return new Ba({
    type: "union",
    options: e,
    ...g(t)
  });
}
const Wa = /* @__PURE__ */ p("ZodIntersection", (e, t) => {
  fo.init(e, t), O.init(e, t), e._zod.processJSONSchema = (n, r, i) => Bs(e, n, r, i);
});
function Ka(e, t) {
  return new Wa({
    type: "intersection",
    left: e,
    right: t
  });
}
const Va = /* @__PURE__ */ p("ZodRecord", (e, t) => {
  Pe(), po.init(e, t), O.init(e, t), e._zod.processJSONSchema = (n, r, i) => Ws(e, n, r, i), e.keyType = t.keyType, e.valueType = t.valueType;
});
function Ha(e, t, n) {
  return new Va({
    type: "record",
    keyType: e,
    valueType: t,
    ...g(n),
    partial: !0
  });
}
const He = /* @__PURE__ */ p("ZodEnum", (e, t) => {
  mo.init(e, t), O.init(e, t), e._zod.processJSONSchema = (r, i, o) => Cs(e, r, i), e.enum = t.entries, e.options = Object.values(t.entries);
  const n = new Set(Object.keys(t.entries));
  e.extract = (r, i) => {
    const o = {};
    for (const s of r)
      if (n.has(s))
        o[s] = t.entries[s];
      else
        throw new Error(`Key ${s} not found in enum`);
    return new He({
      ...t,
      checks: [],
      ...g(i),
      entries: o
    });
  }, e.exclude = (r, i) => {
    const o = { ...t.entries };
    for (const s of r)
      if (n.has(s))
        delete o[s];
      else
        throw new Error(`Key ${s} not found in enum`);
    return new He({
      ...t,
      checks: [],
      ...g(i),
      entries: o
    });
  };
});
function j(e, t) {
  const n = Array.isArray(e) ? Object.fromEntries(e.map((r) => [r, r])) : e;
  return new He({
    type: "enum",
    entries: n,
    ...g(t)
  });
}
const Ga = /* @__PURE__ */ p("ZodLiteral", (e, t) => {
  ho.init(e, t), O.init(e, t), e._zod.processJSONSchema = (n, r, i) => js(e, n, r, i), e.values = new Set(t.values), Object.defineProperty(e, "value", {
    get() {
      if (t.values.length > 1)
        throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");
      return t.values[0];
    }
  });
});
function Ya(e, t) {
  return new Ga({
    type: "literal",
    values: Array.isArray(e) ? e : [e],
    ...g(t)
  });
}
const qa = /* @__PURE__ */ p("ZodTransform", (e, t) => {
  Pe(), go.init(e, t), O.init(e, t), e._zod.processJSONSchema = (n, r, i) => Ms(e, n, r, i), e._zod.parse = (n, r) => {
    if (r.direction === "backward")
      throw new rn(e.constructor.name);
    n.addIssue = (o) => {
      if (typeof o == "string")
        n.issues.push(le(o, n.value, t));
      else {
        const s = o;
        s.fatal && (s.continue = !1), s.code ?? (s.code = "custom"), "input" in s || (s.input = n.value), s.inst ?? (s.inst = e), n.issues.push(le(s));
      }
    };
    const i = t.transform(n.value, n);
    return i instanceof Promise ? i.then((o) => (n.value = o, n)) : (n.value = i, n);
  };
});
function Xa(e) {
  return new qa({
    type: "transform",
    transform: e
  });
}
const Cn = /* @__PURE__ */ p("ZodOptional", (e, t) => {
  kn.init(e, t), O.init(e, t), e._zod.processJSONSchema = (n, r, i) => Pn(e, n, r, i), e.unwrap = () => e._zod.def.innerType;
});
function Ut(e) {
  return new Cn({
    type: "optional",
    innerType: e
  });
}
const jn = /* @__PURE__ */ p("ZodExactOptional", (e, t) => {
  yo.init(e, t), O.init(e, t), e._zod.processJSONSchema = (n, r, i) => Pn(e, n, r, i), e.unwrap = () => e._zod.def.innerType;
});
function Qa(e) {
  return new jn({
    type: "optional",
    innerType: e
  });
}
const ec = /* @__PURE__ */ p("ZodNullable", (e, t) => {
  _o.init(e, t), O.init(e, t), e._zod.processJSONSchema = (n, r, i) => Ks(e, n, r, i), e.unwrap = () => e._zod.def.innerType;
});
function Lt(e) {
  return new ec({
    type: "nullable",
    innerType: e
  });
}
const tc = /* @__PURE__ */ p("ZodDefault", (e, t) => {
  bo.init(e, t), O.init(e, t), e._zod.processJSONSchema = (n, r, i) => Hs(e, n, r, i), e.unwrap = () => e._zod.def.innerType, e.removeDefault = e.unwrap;
});
function nc(e, t) {
  return new tc({
    type: "default",
    innerType: e,
    get defaultValue() {
      return typeof t == "function" ? t() : en(t);
    }
  });
}
const rc = /* @__PURE__ */ p("ZodPrefault", (e, t) => {
  wo.init(e, t), O.init(e, t), e._zod.processJSONSchema = (n, r, i) => Gs(e, n, r, i), e.unwrap = () => e._zod.def.innerType;
});
function ic(e, t) {
  return new rc({
    type: "prefault",
    innerType: e,
    get defaultValue() {
      return typeof t == "function" ? t() : en(t);
    }
  });
}
const xn = /* @__PURE__ */ p("ZodNonOptional", (e, t) => {
  ko.init(e, t), O.init(e, t), e._zod.processJSONSchema = (n, r, i) => Vs(e, n, r, i), e.unwrap = () => e._zod.def.innerType;
});
function oc(e, t) {
  return new xn({
    type: "nonoptional",
    innerType: e,
    ...g(t)
  });
}
const sc = /* @__PURE__ */ p("ZodCatch", (e, t) => {
  vo.init(e, t), O.init(e, t), e._zod.processJSONSchema = (n, r, i) => Ys(e, n, r, i), e.unwrap = () => e._zod.def.innerType, e.removeCatch = e.unwrap;
});
function ac(e, t) {
  return new sc({
    type: "catch",
    innerType: e,
    catchValue: typeof t == "function" ? t : br(t)
  });
}
const cc = /* @__PURE__ */ p("ZodPipe", (e, t) => {
  Eo.init(e, t), O.init(e, t), e._zod.processJSONSchema = (n, r, i) => qs(e, n, r, i), e.in = t.in, e.out = t.out;
});
function Ft(e, t) {
  return new cc({
    type: "pipe",
    in: e,
    out: t
    // ...util.normalizeParams(params),
  });
}
const uc = /* @__PURE__ */ p("ZodReadonly", (e, t) => {
  So.init(e, t), O.init(e, t), e._zod.processJSONSchema = (n, r, i) => Xs(e, n, r, i), e.unwrap = () => e._zod.def.innerType;
});
function lc(e) {
  return new uc({
    type: "readonly",
    innerType: e
  });
}
const dc = /* @__PURE__ */ p("ZodCustom", (e, t) => {
  Oo.init(e, t), O.init(e, t), e._zod.processJSONSchema = (n, r, i) => xs(e, n, r, i);
});
function fc(e, t = {}) {
  return /* @__PURE__ */ Os(dc, e, t);
}
function pc(e, t) {
  return /* @__PURE__ */ zs(e, t);
}
const J = {
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
function ot(e) {
  const t = { kcal: 0, protein: 0, carbs: 0, fat: 0 };
  for (const [n, r] of Object.entries(e)) for (const i of Object.keys(t)) t[i] += J[n][i] * r / 100;
  return Object.fromEntries(Object.entries(t).map(([n, r]) => [n, Math.round(r)]));
}
Object.assign(J, {
  turkey: { name: "Lean ground turkey", pack: 500, usd: 5, cad: 7, kcal: 150, protein: 20, carbs: 0, fat: 8, allergens: [] },
  beef: { name: "Lean ground beef", pack: 500, usd: 6, cad: 8, kcal: 172, protein: 21, carbs: 0, fat: 10, allergens: [] },
  fish: { name: "Boneless white fish", pack: 500, usd: 6, cad: 8, kcal: 85, protein: 18, carbs: 0, fat: 1, allergens: ["fish"] },
  onion: { name: "Onions", pack: 1e3, usd: 2, cad: 3, kcal: 40, protein: 1, carbs: 9, fat: 0, allergens: [] },
  spinach: { name: "Frozen spinach", pack: 400, usd: 2, cad: 3, kcal: 23, protein: 3, carbs: 4, fat: 0, allergens: [] },
  ginger: { name: "Fresh ginger", pack: 100, usd: 1, cad: 1.5, kcal: 80, protein: 2, carbs: 18, fat: 1, allergens: [] },
  garlic: { name: "Garlic", pack: 100, usd: 1, cad: 1.5, kcal: 149, protein: 6, carbs: 33, fat: 1, allergens: [] },
  garam: { name: "Garam masala (check label)", pack: 40, usd: 2, cad: 3, kcal: 300, protein: 10, carbs: 50, fat: 10, allergens: ["mustard"] },
  peas: { name: "Frozen peas", pack: 500, usd: 1.5, cad: 2, kcal: 81, protein: 5, carbs: 14, fat: 0, allergens: [] }
});
const Bt = { chicken: "Chicken", turkey: "Turkey", beef: "Beef", fish: "White fish", tofu: "Tofu", chickpeas: "Chickpea", lentils: "Lentil", beans: "Black bean" }, mc = ["tofu", "chickpeas", "lentils", "beans"], Ae = [];
function hc(e) {
  return e === "chicken" ? "Use a separate board for raw chicken. Cut into bite-size pieces, wash hands and clean surfaces. Cook in the measured oil until the thickest piece reaches 165°F (74°C)." : e === "turkey" || e === "beef" ? `Brown the ground ${e} in the measured oil, breaking it into small pieces. Check with a food thermometer: ${e === "turkey" ? "165°F (74°C)" : "160°F (71°C)"}.` : e === "fish" ? "Check fish for bones. Cook in the measured oil, turning carefully, until its center reaches 145°F (63°C); flake into large pieces." : e === "tofu" ? "Drain and cube the tofu. Cook in the measured oil for 6–8 minutes, turning until lightly golden." : "Drain and rinse the canned legumes. Warm them in the measured oil for 3–4 minutes.";
}
function gc(e, t, n, r, i, o = "simmer", s = {}) {
  for (const c of s.proteins || Object.keys(Bt)) {
    const a = { [r]: r === "potatoes" ? 300 : 75, [c]: 170, vegetables: 160, onion: 60, garlic: 5, oil: 7, [i]: 2, ...o === "pilaf" ? { peas: 80 } : { tomatoes: 120 }, ...s.spinach ? { spinach: 100 } : {}, ...t === "Indian" ? { ginger: 8 } : {} }, u = r === "potatoes" ? "Cut the potatoes into small, even cubes. Boil in water for 15–20 minutes until fork-tender; drain." : `Cook the measured ${r} according to its package directions, using water. Drain excess water.`;
    let l = o === "mash" ? "Mash the cooked potatoes with a splash of hot water. Spoon over the thick vegetable and protein filling; serve with the vegetables." : o === "pilaf" ? `Fold the cooked ${r} into the seasoned protein and vegetables. Cover on low heat for 2 minutes, then fluff and serve.` : `Serve the thick sauce and protein over the cooked ${r}.`;
    Ae.push({ id: `${e}-${c}`, family: e, protein: c, mealType: "main", name: n.replace("{protein}", Bt[c]), cuisine: t, minutes: o === "mash" ? 40 : 35, equipment: ["stovetop", "knife"], vegan: mc.includes(c), items: a, nutrition: ot(a), image: "/assets/meal-prep.png", imageNote: "Illustrative meal-prep photo; not a photograph of this dish.", steps: [u, hc(c), `Transfer the protein to a clean plate. In the same pan, soften the chopped onion and garlic${t === "Indian" ? " and grated ginger" : ""} with a splash of water for 5 minutes. Stir in the measured ${J[i].name.toLowerCase()} for 30 seconds.`, `Add the vegetables${o === "pilaf" ? " and peas" : ", crushed tomatoes"}${s.spinach ? " and spinach" : ""}, plus 100 ml water. Simmer for 8–10 minutes until vegetables are cooked and the sauce thickens. Return the cooked protein and heat through.`, l, "Refrigerate leftovers promptly. Use the ingredient quantities shown for your portion; water can be adjusted to prevent sticking."] });
  }
}
for (const e of [
  ["masala", "Indian", "{protein} tomato masala with rice", "rice", "garam", "simmer"],
  ["saag", "Indian", "{protein} saag-style spinach with rice", "rice", "cumin", "simmer", { spinach: !0 }],
  ["keema", "Indian", "{protein} keema-style peas and potatoes", "potatoes", "garam", "pilaf"],
  ["pulao", "Indian", "{protein} and vegetable pulao-style rice", "rice", "cumin", "pilaf"],
  ["aloo", "Indian", "{protein} aloo-style potato curry", "potatoes", "curry", "simmer"],
  ["ginger-curry", "Indian", "Ginger {protein} curry with quinoa", "quinoa", "garam", "simmer"],
  ["dal", "Indian", "{protein} dal-style tomato stew with rice", "rice", "cumin", "simmer", { proteins: ["lentils", "chickpeas", "beans"] }],
  ["spinach-potato", "Indian", "{protein} spinach and potato masala", "potatoes", "garam", "simmer", { spinach: !0 }],
  ["cottage", "British", "{protein} cottage-pie-style mash bowl", "potatoes", "herbs", "mash"],
  ["hotpot", "British", "{protein} and vegetable stovetop hotpot", "potatoes", "herbs", "simmer"],
  ["garden", "British", "{protein} with garden peas and potatoes", "potatoes", "herbs", "pilaf"],
  ["tomato-stew", "British", "{protein} tomato and vegetable stew with rice", "rice", "herbs", "simmer"],
  ["pepper-potato", "British", "{protein} paprika potato hash", "potatoes", "paprika", "pilaf"],
  ["spinach-mash", "British", "{protein} spinach and potato supper", "potatoes", "herbs", "mash", { spinach: !0 }],
  ["savoury-rice", "British", "{protein} savoury rice with peas", "rice", "herbs", "pilaf"],
  ["curry-rice", "British", "{protein} mild curry-house rice bowl", "rice", "curry", "simmer"],
  ["ragu", "Italian", "{protein} tomato ragu with whole-wheat pasta", "pasta", "herbs", "simmer"],
  ["italian-stew", "Italian", "{protein} Italian-style vegetable stew", "potatoes", "herbs", "simmer"],
  ["burrito", "Mexican", "{protein} burrito bowl with rice and vegetables", "rice", "cumin", "simmer"],
  ["mexican-quinoa", "Mexican", "{protein} smoky quinoa bowl", "quinoa", "paprika", "simmer"],
  ["spiced-rice", "Middle Eastern", "{protein} cumin rice with vegetables", "rice", "cumin", "pilaf"],
  ["spiced-potato", "Middle Eastern", "{protein} paprika potato skillet", "potatoes", "paprika", "simmer"],
  ["ginger-rice", "Asian", "{protein} ginger vegetable rice", "rice", "cumin", "pilaf"],
  ["american-hash", "American", "{protein} vegetable and potato hash", "potatoes", "paprika", "pilaf"],
  ["shawarma-bowl", "Middle Eastern", "{protein} shawarma-style vegetable rice bowl", "rice", "cumin", "pilaf"]
]) gc(...e);
for (const e of ["banana", "berries", "apple"]) for (const t of ["seeds", "soyMilk"]) for (const n of ["microwave", "stovetop"]) {
  const r = { oats: 85, [e]: 150, [t]: t === "seeds" ? 25 : 200, cinnamon: 1 };
  Ae.push({ id: `oats-${e}-${t}-${n}`, family: `oats-${e}-${t}`, mealType: "breakfast", name: `${e === "berries" ? "Berry" : e === "apple" ? "Apple" : "Banana"} ${t === "seeds" ? "pumpkin-seed" : "creamy soy"} porridge`, cuisine: "American", minutes: 12, equipment: [n, ...e === "berries" ? [] : ["knife"]], vegan: !0, items: r, nutrition: ot(r), image: "/assets/meal-prep.png", imageNote: "Illustrative meal-prep photo; not a photograph of this porridge.", steps: [`Combine oats with ${t === "soyMilk" ? "soy milk and 100 ml water" : "250 ml water"} in a large ${n === "microwave" ? "microwave-safe bowl" : "saucepan"}.`, n === "microwave" ? "Microwave for 2 minutes, stir, then heat in 30-second intervals until cooked." : "Simmer for 5–7 minutes, stirring and adding water as needed.", e === "berries" ? "Heat berries according to package instructions." : `Wash or peel and slice the ${e}.`, `Stir in the fruit and cinnamon${t === "seeds" ? " and seeds" : ""}; let cool slightly.`] });
}
const Q = D({ name: $().trim().max(80).default(""), country: j(["US", "CA"]).default("US"), location: $().max(150).default(""), weight: I().min(40).max(250).default(70), height: I().min(130).max(230).default(170), goal: j(["lose", "maintain", "gain"]).default("maintain"), budget: I().min(1).max(2e3).default(75), minutes: I().int().min(5).max(180).default(45), meals: I().int().min(1).max(4).default(3), equipment: F(j(["stovetop", "microwave", "oven", "airfryer", "blender", "toaster", "knife", "slowcooker"])).max(8).default(["stovetop", "knife"]), diet: j(["none", "vegan", "vegetarian", "halal", "kosher"]).default("none"), allergens: F(j(["wheat", "soy", "milk", "eggs", "peanuts", "tree nuts", "fish", "shellfish", "sesame", "mustard", "pork"])).max(11).default([]), cuisines: F(j(["American", "Italian", "Mexican", "Middle Eastern", "Asian", "Indian", "British"])).max(7).default([]), memberships: F(j(["Costco", "Sam's Club"])).max(2).default([]), stores: F(D({ id: $().max(100), name: $().max(200), address: $().max(400), distance: I().min(0).nullable(), lat: I().min(-90).max(90), lon: I().min(-180).max(180), warehouse: ja() })).max(10).default([]), adult: Ya(!0).default(!0) }), Jt = Q.parse({}), yc = Ha(j(Object.keys(J)), I().min(0).max(1e5));
function Mn(e) {
  return Math.round(Math.min(3600, Math.max(1600, (10 * e.weight + 6.25 * e.height - 150) * 1.4 + (e.goal === "lose" ? -250 : e.goal === "gain" ? 250 : 0))) / 50) * 50;
}
function Un(e) {
  return Ae.filter((t) => t.minutes <= e.minutes && t.equipment.every((n) => e.equipment.includes(n)) && (e.diet === "none" || t.vegan) && !Object.keys(t.items).some((n) => J[n].allergens.some((r) => e.allergens.includes(r))) && (!e.cuisines.length || e.cuisines.includes(t.cuisine)));
}
function Ln(e, t) {
  const n = Mn(t) / t.meals / e.nutrition.kcal;
  if (n < 0.4 || n > 3.5) return null;
  const r = Object.fromEntries(Object.entries(e.items).map(([i, o]) => [i, Math.round(o * n)]));
  return { ...e, items: r, nutrition: ot(r), portionScale: Math.round(n * 100) / 100 };
}
function Oe(e, t, n = {}) {
  const r = {};
  for (const o of e) for (const [s, c] of Object.entries(o.items)) r[s] = (r[s] || 0) + c;
  const i = Object.entries(r).map(([o, s]) => {
    const c = J[o], a = n[o] || 0, u = Math.max(0, s - a), l = Math.ceil(u / c.pack), d = Math.round(c[t.country === "CA" ? "cad" : "usd"] * 100);
    return { id: o, name: c.name, needed: s, pantryUsed: Math.min(s, a), packages: l, packGrams: c.pack, buyGrams: l * c.pack, leftover: Math.max(0, a - s) + l * c.pack - u, cents: l * d };
  });
  return { list: i, totalCents: i.reduce((o, s) => o + s.cents, 0), currency: t.country === "CA" ? "CAD" : "USD", priceNote: "Illustrative package prices, not store quotes. Taxes, deposits, membership fees and local price changes are not included.", stores: t.stores };
}
function Fn(e, t, n) {
  const r = (o) => o.minutes <= t.minutes && o.equipment.every((s) => t.equipment.includes(s)) && (t.diet === "none" || o.vegan) && !Object.keys(o.items).some((s) => !J[s] || J[s].allergens.some((c) => t.allergens.includes(c))) && (!t.cuisines.length || t.cuisines.includes(o.cuisine));
  if (e.length !== 7 * t.meals || e.some((o) => !r(o))) throw new Error("The requested plan does not meet your meal, diet, time or equipment settings.");
  const i = Oe(e, t, n);
  if (i.totalCents > Math.floor(t.budget * 100)) throw new Error("No plan found within your budget and current preferences. Try a larger budget or different cuisines/equipment. Your existing plan has not changed.");
  return i;
}
function ze(e, t) {
  return t <= 2 ? e % t === 0 ? "Lunch" : "Dinner" : ["Breakfast", "Lunch", "Dinner", "Extra meal"][e % t];
}
const Bn = (e, t, n) => ze(t, n.meals) === "Breakfast" || e.mealType !== "breakfast";
function Wt(e, t = {}, n = []) {
  const r = new Set(n.map((c) => c.id)), i = new Set(n.map((c) => c.family)), o = Un(e).filter((c) => !r.has(c.id)).map((c) => Ln(c, e)).filter(Boolean);
  let s;
  for (let c = 0; c < 80; c++) {
    const a = [], u = /* @__PURE__ */ new Set(), l = /* @__PURE__ */ new Map();
    for (let f = 0; f < 7 * e.meals; f++) {
      let m = o.filter((k) => !u.has(k.id) && Bn(k, f, e));
      if (!m.length) break;
      const h = ze(f, e.meals) === "Breakfast", y = { ...m.map((k) => ({ r: k, score: Oe([k], e, t).totalCents * (0.35 + Math.random() * 1.3) + (l.get(k.family) || 0) * 650 + (i.has(k.family) ? 150 : 0) + (h && k.mealType !== "breakfast" ? 200 : 0) })).sort((k, N) => k.score - N.score)[0].r, mealSlot: ze(f, e.meals) };
      a.push(y), u.add(y.id), l.set(y.family, (l.get(y.family) || 0) + 1);
    }
    if (a.length !== 7 * e.meals) continue;
    const d = Oe(a, e, t);
    if ((!s || d.totalCents < s.totalCents) && (s = { meals: a, ...d }), d.totalCents <= e.budget * 100) break;
  }
  if (!s) throw new Error("There are not enough different recipes for a full week without repeating the previous plan. Broaden cuisines or equipment, or reduce meals per day.");
  return Fn(s.meals, e, t), { ...s, targetCalories: Mn(e), settings: e, completed: [], spentCents: 0, createdAt: (/* @__PURE__ */ new Date()).toISOString() };
}
function Kt(e, t, n, r, i = [], o) {
  if (!Number.isInteger(t) || t < 0 || t >= e.meals.length) throw new Error("Choose a valid meal to replace.");
  if (e.completed?.includes(t)) throw new Error("This meal is already cooked. Choose an uncooked meal or build a new week.");
  const s = e.meals[t], c = new Set([...e.meals, ...i].map((l) => l.id)), a = Un(n).filter((l) => !c.has(l.id) && Bn(l, t, n) && (!o || l.protein === o));
  a.sort((l, d) => ((o ? l.family !== s.family : l.family === s.family) ? 1 : 0) - ((o ? d.family !== s.family : d.family === s.family) ? 1 : 0));
  const u = a.map((l) => ({ r: l, t: Math.random(), group: o ? l.family === s.family ? 0 : 1 : l.family === s.family ? 1 : 0 })).sort((l, d) => l.group - d.group || l.t - d.t);
  for (const { r: l } of u) {
    const d = Ln(l, n);
    if (!d) continue;
    const f = e.meals.map((m, h) => h === t ? { ...d, mealSlot: ze(h, n.meals) } : m);
    try {
      const m = e.spentCents ?? (e.purchased ? e.totalCents : 0), _ = e.purchased || e.completed?.length || m > 0 ? Oe(f.filter((k, N) => !e.completed?.includes(N)), n, r) : Fn(f, n, r), y = m + _.totalCents;
      if (y > Math.floor(n.budget * 100)) continue;
      return { ...e, ..._, meals: f, totalCents: y, additionalCents: _.totalCents, spentCents: m, purchased: !1, settings: n };
    } catch {
    }
  }
  throw new Error("No replacement fits your protein choice, meal type, current constraints and remaining budget. Try another protein or adjust preferences.");
}
const b = (e, t = 200, n = {}) => new Response(JSON.stringify(e), { status: t, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", ...n } }), B = (e) => {
  try {
    return JSON.parse(e || "{}");
  } catch {
    return {};
  }
}, Jn = (e) => Object.fromEntries((e.headers.get("cookie") || "").split(";").map((t) => t.trim().split("=").map(decodeURIComponent)).filter((t) => t.length === 2)), de = (e) => [...new Uint8Array(e)].map((t) => t.toString(16).padStart(2, "0")).join(""), _c = (e) => Uint8Array.from(e.match(/.{2}/g) || [], (t) => parseInt(t, 16)), Wn = D({ reply: $().max(5e3), action: j(["none", "generate", "swap", "preferences"]), mealIndex: I().int().min(0).max(27).nullable(), budget: I().min(1).max(2e3).nullable(), minutes: I().int().min(5).max(180).nullable(), cuisines: F(j(["American", "Italian", "Mexican", "Middle Eastern", "Asian", "Indian", "British"])).max(7).nullable() }), bc = /* @__PURE__ */ new Set(["tiktok.com", "www.tiktok.com", "instagram.com", "www.instagram.com", "facebook.com", "www.facebook.com", "fb.watch", "snapchat.com", "www.snapchat.com"]), ye = { osu: "Ohio State", campus: "Campus kitchen", home: "Home cooks" }, wc = D({ title: $().trim().min(1).max(160), ingredients: F($().trim().min(1).max(180)).max(40), steps: F($().trim().min(1).max(700)).max(20) });
async function K(e) {
  return de(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(e)));
}
async function Kn(e, t = crypto.getRandomValues(new Uint8Array(16))) {
  const n = await crypto.subtle.importKey("raw", new TextEncoder().encode(e), "PBKDF2", !1, ["deriveBits"]), r = await crypto.subtle.deriveBits({ name: "PBKDF2", hash: "SHA-256", salt: t, iterations: 1e5 }, n, 256), i = await crypto.subtle.importKey("raw", r, "PBKDF2", !1, ["deriveBits"]), o = new Uint8Array(await crypto.subtle.digest("SHA-256", new Uint8Array([...t, 67, 104, 101, 97, 112, 67, 104, 101, 102]))), s = await crypto.subtle.deriveBits({ name: "PBKDF2", hash: "SHA-256", salt: o, iterations: 1e5 }, i, 256);
  return `${de(t)}:${de(s)}`;
}
async function Vt(e, t) {
  const [n, r] = t.split(":");
  if (!n || !r) return !1;
  const i = (await Kn(e, _c(n))).split(":")[1];
  let o = r.length ^ i.length;
  for (let s = 0; s < Math.min(r.length, i.length); s++) o |= r.charCodeAt(s) ^ i.charCodeAt(s);
  return o === 0;
}
async function C(e, t) {
  let n;
  try {
    n = await e.json();
  } catch {
    throw new Error("Invalid request.");
  }
  return t.parse(n);
}
async function Ht(e, t) {
  const n = Jn(e).cc_session;
  if (!n) return null;
  const r = await t.DB.prepare("SELECT u.* FROM users u JOIN sessions s ON s.user_id=u.id WHERE s.token=? AND s.expires_at>CURRENT_TIMESTAMP").bind(await K(n)).first();
  return r ? { ...r, profile: B(r.profile), pantry: B(r.pantry) } : null;
}
async function X(e, t, n, r) {
  const i = Date.now(), o = new Date(i + r).toISOString();
  await e.DB.prepare("DELETE FROM rate_limits WHERE bucket=? AND expires_at<=CURRENT_TIMESTAMP").bind(t).run();
  const s = await e.DB.prepare("SELECT count FROM rate_limits WHERE bucket=?").bind(t).first();
  return s && s.count >= n ? !1 : (await e.DB.prepare("INSERT INTO rate_limits(bucket,count,expires_at) VALUES(?,1,?) ON CONFLICT(bucket) DO UPDATE SET count=count+1").bind(t, o).run(), !0);
}
async function q(e, t) {
  return (await e.DB.prepare("SELECT id,data FROM plans WHERE user_id=? ORDER BY created_at DESC,id DESC LIMIT 2").bind(t).all()).results.map((r) => ({ ...r, data: B(r.data) }));
}
async function _e(e, t, n, r) {
  return r ? await e.DB.prepare("UPDATE plans SET data=? WHERE id=? AND user_id=?").bind(JSON.stringify(n), r, t).run() : (r = crypto.randomUUID(), await e.DB.prepare("INSERT INTO plans(id,user_id,data) VALUES(?,?,?)").bind(r, t, JSON.stringify(n)).run()), { id: r, ...n };
}
function kc(e) {
  return e instanceof Dn ? e.issues.map((t) => `${t.path.join(".")}: ${t.message}`).join("; ") : /^(No |There |The |Choose |Generate |Start |These |This |Pantry |Search |Enter |Location |Invalid |Your |That |Account|Unable )/.test(e.message) ? e.message : (console.error(e), "Something went wrong. Please try again.");
}
function Gt(e, t, n, r) {
  const i = Math.PI / 180, o = Math.sin((n - e) * i / 2) ** 2 + Math.cos(e * i) * Math.cos(n * i) * Math.sin((r - t) * i / 2) ** 2;
  return Math.round(6371e3 * 2 * Math.atan2(Math.sqrt(o), Math.sqrt(Math.max(0, 1 - o))));
}
async function Yt(e, t = {}) {
  const n = await fetch(e, { ...t, headers: { "User-Agent": "CheapChef/1.0 (https://github.com/anasajhani/cheap-chef)", ...t.headers } });
  if (!n.ok) throw new Error("The map service is temporarily unavailable. Please try again later.");
  return n.json();
}
function vc(e) {
  return e ? `/api/community/media/${encodeURIComponent(e)}` : null;
}
function Ec(e, t) {
  return String(e?.name || "").trim() || `Cook ${String(t || "").slice(0, 1).toUpperCase() || "C"}.`;
}
function qt(...e) {
  return e.find((t) => typeof t == "string" && t.trim())?.trim() || "";
}
function Sc(e) {
  const t = `${e.strMeal || ""} ${e.strCategory || ""} ${e.strTags || ""}`.toLowerCase(), n = /dessert|cake|pie|brownie|cookie|donut|fried|pizza|burger|poutine|ice cream/.test(t) ? "Treat" : "Everyday", r = [];
  for (let o = 1; o <= 20; o++) {
    const s = String(e[`strIngredient${o}`] || "").trim(), c = String(e[`strMeasure${o}`] || "").trim();
    s && r.push(`${c ? `${c} ` : ""}${s}`.trim());
  }
  const i = String(e.strInstructions || "").split(/\r?\n|(?<=[.!?])\s+(?=[A-Z0-9])/).map((o) => o.replace(/^\s*(?:\d+[.)]|[-•])\s*/, "").trim()).filter((o) => o.length > 8).slice(0, 18);
  return { id: String(e.idMeal), name: e.strMeal || "Untitled recipe", cuisine: e.strArea || "Global", category: e.strCategory || "Meal", tags: String(e.strTags || "").split(",").map((o) => o.trim()).filter(Boolean), style: n, image: e.strMealThumb || "", ingredients: r, steps: i };
}
async function Oc(e) {
  const t = await e.DB.prepare("SELECT data FROM recipe_cache WHERE cache_key=? AND expires_at>CURRENT_TIMESTAMP").bind("themealdb-library").first();
  if (t) return B(t.data).recipes || [];
  const n = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=");
  if (!n.ok) throw new Error("The recipe library is temporarily unavailable. Please try again later.");
  const r = await n.json(), i = (r.meals || []).map(Sc).filter((o) => o.image && o.ingredients.length && o.steps.length);
  if (i.length < 200) throw new Error("The recipe library is being refreshed. Please try again shortly.");
  return await e.DB.prepare("INSERT INTO recipe_cache(cache_key,data,expires_at) VALUES(?,?,?) ON CONFLICT(cache_key) DO UPDATE SET data=excluded.data,expires_at=excluded.expires_at").bind("themealdb-library", JSON.stringify({ recipes: i }), new Date(Date.now() + 6 * 36e5).toISOString()).run(), i;
}
async function zc(e) {
  try {
    const t = await fetch(`https://noembed.com/embed?${new URLSearchParams({ url: e })}`);
    if (!t.ok) return {};
    const n = await t.json();
    return { title: qt(n.title, n.author_name), thumbnail: qt(n.thumbnail_url) };
  } catch {
    return {};
  }
}
async function $c(e, { url: t, caption: n, title: r }) {
  const i = { title: r || "Imported social recipe", ingredients: [], steps: [] };
  if (!n.trim()) return i;
  if (!e.OPENAI_API_KEY || !e.OPENAI_MODEL) {
    const u = n.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    return { title: r || u[0]?.slice(0, 160) || i.title, ingredients: u.filter((l) => /^[-•*]|^\d+\s*(?:x|cup|tbsp|tsp|oz|g|lb)/i.test(l)).slice(0, 40), steps: u.filter((l) => /^\d+[.)]/.test(l)).map((l) => l.replace(/^\d+[.)]\s*/, "")).slice(0, 20) };
  }
  const o = { type: "object", additionalProperties: !1, properties: { title: { type: "string" }, ingredients: { type: "array", items: { type: "string" }, maxItems: 40 }, steps: { type: "array", items: { type: "string" }, maxItems: 20 } }, required: ["title", "ingredients", "steps"] }, s = await fetch("https://api.openai.com/v1/responses", { method: "POST", headers: { Authorization: `Bearer ${e.OPENAI_API_KEY}`, "content-type": "application/json" }, body: JSON.stringify({ model: e.OPENAI_MODEL, store: !1, max_output_tokens: 1e3, instructions: "Turn only the user-provided public social recipe caption into a concise recipe. Do not invent ingredients, quantities, temperatures, timings or steps. If information is missing, omit it. Return structured JSON.", input: JSON.stringify({ title: r, caption: n, url: t }), text: { format: { type: "json_schema", name: "imported_recipe", strict: !0, schema: o } } }) });
  if (!s.ok) return i;
  const c = await s.json(), a = c.output?.flatMap((u) => u.content || []).find((u) => u.type === "output_text")?.text;
  return a ? wc.parse(JSON.parse(a)) : i;
}
async function Tc(e) {
  let { country: t, location: n, lat: r, lon: i } = e;
  if (r === void 0) {
    if (!n?.trim()) throw new Error("Enter a city, ZIP or postal code, or use your location.");
    const a = await Yt("https://nominatim.openstreetmap.org/search?" + new URLSearchParams({ q: n, countrycodes: t.toLowerCase(), format: "jsonv2", limit: "1" }));
    if (!a.length) throw new Error("Location not found. Try your city and state/province.");
    r = Number(a[0].lat), i = Number(a[0].lon);
  }
  const o = `[out:json][timeout:20];(nwr["shop"~"^(supermarket|grocery|wholesale|department_store|general)$"](around:15000,${r},${i});nwr["brand"~"Walmart|Target|Kroger|Costco|Sam's Club|ALDI",i]["shop"~"^(supermarket|grocery|wholesale|department_store|general)$"](around:15000,${r},${i}););out center tags;`;
  return { stores: ((await Yt("https://overpass-api.de/api/interpreter", { method: "POST", headers: { "content-type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ data: o }) })).elements || []).map((a) => {
    const u = a.tags || {}, l = a.lat ?? a.center?.lat, d = a.lon ?? a.center?.lon;
    return { id: `osm:${a.type}:${a.id}`, name: u.name || u.brand || "Grocery store", address: [u["addr:housenumber"], u["addr:street"], u["addr:city"], u["addr:state"], u["addr:postcode"]].filter(Boolean).join(" ") || "Address not listed in OpenStreetMap", distance: Gt(r, i, l, d), lat: l, lon: d, warehouse: /costco|sam.s club/i.test(u.name || u.brand || "") };
  }).filter((a) => Number.isFinite(a.lat) && Number.isFinite(a.lon)).sort((a, u) => a.distance - u.distance).filter((a, u, l) => !l.slice(0, u).some((d) => d.name.toLowerCase() === a.name.toLowerCase() && Gt(d.lat, d.lon, a.lat, a.lon) < 100)).slice(0, 60), source: "OpenStreetMap contributors", attribution: "https://www.openstreetmap.org/copyright", note: "Within 15 km; distances are straight-line. Coverage may be incomplete. No live prices or inventory." };
}
async function Ic(e, { message: t, history: n, profile: r, plan: i, pantry: o }) {
  if (!e.OPENAI_API_KEY || !e.OPENAI_MODEL) return { reply: "The AI chef is not connected yet. You can still use preferences, pantry, nearby stores, meal plans and swaps.", action: "none", mealIndex: null, budget: null, minutes: null, cuisines: null, mode: "unavailable" };
  const s = { type: "object", additionalProperties: !1, properties: { reply: { type: "string" }, action: { type: "string", enum: ["none", "generate", "swap", "preferences"] }, mealIndex: { type: ["integer", "null"] }, budget: { type: ["number", "null"] }, minutes: { type: ["integer", "null"] }, cuisines: { type: ["array", "null"], items: { type: "string", enum: ["American", "Italian", "Mexican", "Middle Eastern", "Asian", "Indian", "British"] } } }, required: ["reply", "action", "mealIndex", "budget", "minutes", "cuisines"] }, c = await fetch("https://api.openai.com/v1/responses", { method: "POST", headers: { Authorization: `Bearer ${e.OPENAI_API_KEY}`, "content-type": "application/json" }, body: JSON.stringify({ model: e.OPENAI_MODEL, store: !1, max_output_tokens: 1200, instructions: "You are Cheap Chef. Help adults with their saved meal plan. Never loosen diet, allergy, equipment or budget limits. Do not claim live prices or inventory. Direct changes to the visible planner controls. Return structured JSON.", input: [{ role: "user", content: JSON.stringify({ profile: { ...r, location: void 0, stores: r.stores.map((l) => ({ name: l.name })) }, plan: i, pantry: o }) }, ...n.slice(-10).map((l) => ({ role: l.role, content: l.text })), { role: "user", content: t }], text: { format: { type: "json_schema", name: "chef_action", strict: !0, schema: s } } }) });
  if (!c.ok) throw new Error("The AI provider could not respond. Try again later; your plan has not changed.");
  const a = await c.json(), u = a.output?.flatMap((l) => l.content || []).find((l) => l.type === "output_text")?.text;
  if (!u) throw new Error("The AI could not answer. Your plan has not changed.");
  return { ...Wn.parse(JSON.parse(u)), mode: "ai" };
}
async function Nc(e, t, n) {
  const r = e.method;
  if (n === "/api/health") return b({ ok: !0 });
  if (n === "/api/config") return b({ ai: !!(t.OPENAI_API_KEY && t.OPENAI_MODEL), ingredients: J, defaults: Jt, plannerRecipeCount: Ae.length, communityNames: ye });
  if (n === "/api/recipes" && r === "GET") {
    const a = await Oc(t);
    return b({ recipes: a, source: "TheMealDB", note: "Recipe images and directions are supplied by the public recipe library. “Everyday” and “Treat” are browsing labels, not medical or nutrition advice." }, 200, { "cache-control": "public, max-age=600" });
  }
  if (n === "/api/community/posts" && r === "GET") {
    const a = new URL(e.url), u = a.searchParams.get("community") || "osu";
    if (!ye[u]) throw new Error("Choose a valid community.");
    const l = await Ht(e, t), d = (await t.DB.prepare("SELECT p.id,p.community_slug,p.recipe_id,p.meal_name,p.caption,p.image_key,p.created_at,u.email,u.profile,COUNT(l.post_id) AS likes,(SELECT COUNT(*) FROM community_tries tr WHERE tr.community_slug=p.community_slug AND tr.meal_name=p.meal_name) AS tries,EXISTS(SELECT 1 FROM community_likes mine WHERE mine.post_id=p.id AND mine.user_id=?) AS liked,EXISTS(SELECT 1 FROM community_tries mineTry WHERE mineTry.community_slug=p.community_slug AND mineTry.meal_name=p.meal_name AND mineTry.user_id=?) AS tried FROM community_posts p JOIN users u ON u.id=p.user_id LEFT JOIN community_likes l ON l.post_id=p.id WHERE p.community_slug=? GROUP BY p.id ORDER BY p.created_at DESC LIMIT 60").bind(l?.id || "", l?.id || "", u).all()).results;
    return b({ community: u, name: ye[u], posts: d.map((f) => ({ ...f, author: Ec(B(f.profile), f.email), imageUrl: vc(f.image_key), likes: Number(f.likes), tries: Number(f.tries), liked: !!f.liked, tried: !!f.tried })) });
  }
  if (n.startsWith("/api/community/media/") && r === "GET") {
    const a = decodeURIComponent(n.slice(21));
    if (!a.startsWith("community/") || !t.MEDIA) return b({ error: "Image not found." }, 404);
    const u = await t.MEDIA.get(a);
    return u ? new Response(u.body, { headers: { "content-type": u.httpMetadata?.contentType || "image/jpeg", "cache-control": "public, max-age=86400" } }) : b({ error: "Image not found." }, 404);
  }
  const i = D({ email: $().email().max(254).transform((a) => a.toLowerCase()), password: $().min(12).max(128) });
  if (n === "/api/register" && r === "POST") {
    const a = e.headers.get("cf-connecting-ip") || "unknown";
    if (!await X(t, `auth:${a}`, 20, 15 * 6e4)) return b({ error: "Too many sign-in attempts. Try again in 15 minutes." }, 429);
    const u = await C(e, i), l = crypto.randomUUID(), d = await Kn(u.password);
    try {
      await t.DB.prepare("INSERT INTO users(id,email,password,profile) VALUES(?,?,?,?)").bind(l, u.email, d, JSON.stringify(Jt)).run();
    } catch {
      throw new Error("Unable to create that account. Try signing in instead.");
    }
    const f = de(crypto.getRandomValues(new Uint8Array(32)));
    return await t.DB.prepare("INSERT INTO sessions(token,user_id,expires_at) VALUES(?,?,?)").bind(await K(f), l, new Date(Date.now() + 7 * 864e5).toISOString()).run(), b({ ok: !0 }, 201, { "set-cookie": `cc_session=${f}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=604800` });
  }
  if (n === "/api/login" && r === "POST") {
    const a = e.headers.get("cf-connecting-ip") || "unknown";
    if (!await X(t, `auth:${a}`, 20, 15 * 6e4)) return b({ error: "Too many sign-in attempts. Try again in 15 minutes." }, 429);
    const u = await C(e, i), l = await t.DB.prepare("SELECT * FROM users WHERE email=?").bind(u.email).first();
    if (!l || !await Vt(u.password, l.password)) return b({ error: "Email or password is incorrect." }, 401);
    const d = de(crypto.getRandomValues(new Uint8Array(32)));
    return await t.DB.prepare("INSERT INTO sessions(token,user_id,expires_at) VALUES(?,?,?)").bind(await K(d), l.id, new Date(Date.now() + 7 * 864e5).toISOString()).run(), b({ ok: !0 }, 200, { "set-cookie": `cc_session=${d}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=604800` });
  }
  const o = await Ht(e, t);
  if (!o) return b({ error: "Please sign in." }, 401);
  if (n === "/api/me" && r === "GET") {
    const a = await q(t, o.id), u = (await t.DB.prepare("SELECT role,text FROM chats WHERE user_id=? ORDER BY created_at DESC,id DESC LIMIT 24").bind(o.id).all()).results.reverse(), l = (await t.DB.prepare("SELECT meal_id FROM saved_recipes WHERE user_id=? ORDER BY created_at DESC").bind(o.id).all()).results.map((f) => f.meal_id), d = (await t.DB.prepare("SELECT id,source_url,title,ingredients,steps,source_caption,created_at FROM recipe_imports WHERE user_id=? ORDER BY created_at DESC LIMIT 24").bind(o.id).all()).results.map((f) => ({ ...f, ingredients: B(f.ingredients), steps: B(f.steps) }));
    return b({ email: o.email, profile: o.profile, pantry: o.pantry, plan: a[0] ? { id: a[0].id, ...a[0].data } : null, chats: u, savedRecipeIds: l, imports: d });
  }
  if (n === "/api/logout" && r === "POST") {
    const a = Jn(e).cc_session;
    return a && await t.DB.prepare("DELETE FROM sessions WHERE token=?").bind(await K(a)).run(), b({ ok: !0 }, 200, { "set-cookie": "cc_session=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0" });
  }
  if (n === "/api/recipe-saves" && r === "POST") {
    const { mealId: a } = await C(e, D({ mealId: $().regex(/^\d{5,}$/) }));
    return await t.DB.prepare("INSERT OR IGNORE INTO saved_recipes(user_id,meal_id) VALUES(?,?)").bind(o.id, a).run(), b({ ok: !0 });
  }
  if (n === "/api/recipe-saves" && r === "DELETE") {
    const { mealId: a } = await C(e, D({ mealId: $().regex(/^\d{5,}$/) }));
    return await t.DB.prepare("DELETE FROM saved_recipes WHERE user_id=? AND meal_id=?").bind(o.id, a).run(), b({ ok: !0 });
  }
  if (n === "/api/imports" && r === "POST") {
    if (!await X(t, `imports:${o.id}`, 8, 36e5)) return b({ error: "You have reached the hourly recipe-import limit. Please try again later." }, 429);
    const a = await C(e, D({ url: $().url().max(2e3), caption: $().max(6e3).default("") })), u = new URL(a.url);
    if (!bc.has(u.hostname.toLowerCase())) throw new Error("Use a public TikTok, Instagram, Facebook or Snapchat link.");
    const l = await zc(a.url), d = await $c(t, { url: a.url, caption: a.caption, title: l.title }), f = crypto.randomUUID();
    return await t.DB.prepare("INSERT INTO recipe_imports(id,user_id,source_url,title,ingredients,steps,source_caption) VALUES(?,?,?,?,?,?,?)").bind(f, o.id, a.url, d.title, JSON.stringify(d.ingredients), JSON.stringify(d.steps), a.caption).run(), b({ id: f, source_url: a.url, title: d.title, ingredients: d.ingredients, steps: d.steps, source_caption: a.caption, thumbnail: l.thumbnail || null, needsCaption: !a.caption.trim(), note: a.caption.trim() ? "Saved from the text you provided. Check amounts, allergens and food-safety details before cooking." : "We could only read basic public link information. Paste the caption, ingredient list or spoken recipe text to create accurate ingredients and steps." }, 201);
  }
  if (n === "/api/community/posts" && r === "POST") {
    if (!await X(t, `community-posts:${o.id}`, 6, 36e5)) return b({ error: "Please wait before creating another community post." }, 429);
    const a = await e.formData(), u = String(a.get("community") || "osu"), l = String(a.get("mealName") || "").trim(), d = String(a.get("caption") || "").trim(), f = String(a.get("recipeId") || "").trim() || null, m = a.get("photo");
    if (!ye[u]) throw new Error("Choose a valid community.");
    if (!l || l.length > 160) throw new Error("Add the meal name before posting.");
    if (d.length > 700) throw new Error("Keep your caption under 700 characters.");
    let h = null;
    if (m && typeof m != "string") {
      if (!t.MEDIA) throw new Error("Photo sharing is not available yet. Please try again shortly.");
      if (!["image/jpeg", "image/png", "image/webp"].includes(m.type) || m.size > 5 * 1024 * 1024) throw new Error("Use a JPG, PNG or WebP photo no larger than 5 MB.");
      const y = m.type === "image/png" ? "png" : m.type === "image/webp" ? "webp" : "jpg";
      h = `community/${u}/${o.id}/${crypto.randomUUID()}.${y}`, await t.MEDIA.put(h, await m.arrayBuffer(), { httpMetadata: { contentType: m.type } });
    }
    const _ = crypto.randomUUID();
    return await t.DB.prepare("INSERT INTO community_posts(id,community_slug,user_id,recipe_id,meal_name,caption,image_key) VALUES(?,?,?,?,?,?,?)").bind(_, u, o.id, f, l, d, h).run(), b({ ok: !0, id: _ }, 201);
  }
  const s = n.match(/^\/api\/community\/posts\/([0-9a-f-]{36})\/like$/);
  if (s && r === "POST") {
    const a = await t.DB.prepare("SELECT id FROM community_posts WHERE id=?").bind(s[1]).first();
    if (!a) throw new Error("That community post no longer exists.");
    const u = await t.DB.prepare("SELECT 1 FROM community_likes WHERE post_id=? AND user_id=?").bind(a.id, o.id).first();
    return u ? await t.DB.prepare("DELETE FROM community_likes WHERE post_id=? AND user_id=?").bind(a.id, o.id).run() : await t.DB.prepare("INSERT INTO community_likes(post_id,user_id) VALUES(?,?)").bind(a.id, o.id).run(), b({ liked: !u });
  }
  const c = n.match(/^\/api\/community\/posts\/([0-9a-f-]{36})\/try$/);
  if (c && r === "POST") {
    const a = await t.DB.prepare("SELECT community_slug,meal_name FROM community_posts WHERE id=?").bind(c[1]).first();
    if (!a) throw new Error("That community post no longer exists.");
    const u = await t.DB.prepare("SELECT 1 FROM community_tries WHERE community_slug=? AND meal_name=? AND user_id=?").bind(a.community_slug, a.meal_name, o.id).first();
    return u ? await t.DB.prepare("DELETE FROM community_tries WHERE community_slug=? AND meal_name=? AND user_id=?").bind(a.community_slug, a.meal_name, o.id).run() : await t.DB.prepare("INSERT INTO community_tries(community_slug,meal_name,user_id) VALUES(?,?,?)").bind(a.community_slug, a.meal_name, o.id).run(), b({ tried: !u });
  }
  if (n === "/api/profile" && r === "PUT") {
    const a = await C(e, Q), u = [...o.profile.stores || []], l = await t.DB.prepare("SELECT data FROM store_results WHERE user_id=? AND expires_at>CURRENT_TIMESTAMP").bind(o.id).first();
    return l && u.push(...B(l.data).stores || []), a.stores = a.stores.map((d) => {
      const f = u.find((m) => m.id === d.id);
      if (!f) throw new Error("Search for nearby stores before selecting them.");
      return f;
    }), await t.DB.prepare("UPDATE users SET profile=? WHERE id=?").bind(JSON.stringify(a), o.id).run(), b(a);
  }
  if (n === "/api/pantry" && r === "PUT") {
    const a = await C(e, yc);
    return await t.DB.prepare("UPDATE users SET pantry=? WHERE id=?").bind(JSON.stringify(a), o.id).run(), b(a);
  }
  if (n === "/api/plans" && r === "POST") {
    const a = await q(t, o.id);
    return b(await _e(t, o.id, Wt(Q.parse(o.profile), o.pantry, a[0]?.data.meals || [])));
  }
  if (n === "/api/plans/swap" && r === "POST") {
    const { index: a, protein: u, planId: l } = await C(e, D({ index: I().int().min(0).max(27), protein: j(["chicken", "turkey", "beef", "fish", "tofu", "chickpeas", "lentils", "beans"]).optional(), planId: $().optional() })), d = await q(t, o.id);
    if (!d[0]) throw new Error("Generate a plan first.");
    if (l && l !== d[0].id) throw new Error("Your plan changed. Refresh before swapping.");
    return b(await _e(t, o.id, Kt(d[0].data, a, Q.parse(o.profile), o.pantry, d[1]?.data.meals || [], u), d[0].id));
  }
  if (n === "/api/plans/purchased" && r === "POST") {
    const a = await q(t, o.id), u = a[0]?.data;
    if (!u) throw new Error("Generate a plan first.");
    if (u.purchased) throw new Error("These purchases have already been added.");
    const l = { ...o.pantry };
    for (const d of u.list) l[d.id] = (l[d.id] || 0) + d.buyGrams;
    return u.spentCents = u.totalCents, u.additionalCents = 0, u.purchased = !0, await t.DB.batch([t.DB.prepare("UPDATE users SET pantry=? WHERE id=?").bind(JSON.stringify(l), o.id), t.DB.prepare("UPDATE plans SET data=? WHERE id=? AND user_id=?").bind(JSON.stringify(u), a[0].id, o.id)]), b({ ok: !0 });
  }
  if (n === "/api/plans/cooked" && r === "POST") {
    const { index: a } = await C(e, D({ index: I().int().min(0).max(27) })), u = await q(t, o.id), l = u[0]?.data;
    if (!l?.meals[a]) throw new Error("Choose a valid meal.");
    if (l.completed.includes(a)) throw new Error("This meal is already marked cooked.");
    const d = { ...o.pantry };
    for (const [f, m] of Object.entries(l.meals[a].items)) {
      if ((d[f] || 0) < m) throw new Error("Pantry stock is too low. Record purchases or update your pantry first.");
      d[f] -= m;
    }
    return l.completed.push(a), await t.DB.batch([t.DB.prepare("UPDATE users SET pantry=? WHERE id=?").bind(JSON.stringify(d), o.id), t.DB.prepare("UPDATE plans SET data=? WHERE id=? AND user_id=?").bind(JSON.stringify(l), u[0].id, o.id)]), b({ ok: !0 });
  }
  if (n === "/api/stores" && r === "POST") {
    if (!await X(t, `stores:${o.id}`, 5, 6e4)) return b({ error: "Please wait a minute before searching again." }, 429);
    const a = await C(e, D({ country: j(["US", "CA"]), location: $().max(150).optional(), lat: I().min(-90).max(90).optional(), lon: I().min(-180).max(180).optional() }).refine((l) => l.lat === void 0 == (l.lon === void 0))), u = await Tc(a);
    return await t.DB.prepare("INSERT INTO store_results(user_id,data,expires_at) VALUES(?,?,?) ON CONFLICT(user_id) DO UPDATE SET data=excluded.data,expires_at=excluded.expires_at").bind(o.id, JSON.stringify(u), new Date(Date.now() + 36e5).toISOString()).run(), b(u);
  }
  if (n === "/api/chat" && r === "POST") {
    if (!await X(t, `chat:${o.id}`, 8, 6e4)) return b({ error: "Please wait a minute before asking again." }, 429);
    const { message: a } = await C(e, D({ message: $().trim().min(1).max(2e3) })), u = await q(t, o.id), l = (await t.DB.prepare("SELECT role,text FROM chats WHERE user_id=? ORDER BY created_at DESC,id DESC LIMIT 12").bind(o.id).all()).results.reverse();
    if (t.OPENAI_API_KEY && t.OPENAI_MODEL) {
      const m = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
      if ((await t.DB.prepare("INSERT INTO usage(user_id,day,calls) VALUES(?,?,1) ON CONFLICT(user_id,day) DO UPDATE SET calls=calls+1 RETURNING calls").bind(o.id, m).first()).calls > Number(t.AI_DAILY_LIMIT || 20)) return b({ error: "You have reached today’s AI message allowance. Meal-planning controls are still available." }, 429);
    }
    const d = await Ic(t, { message: a, history: l, profile: o.profile, pantry: o.pantry, plan: u[0]?.data || null });
    await t.DB.batch([t.DB.prepare("INSERT INTO chats(id,user_id,role,text) VALUES(?,?,?,?)").bind(crypto.randomUUID(), o.id, "user", a), t.DB.prepare("INSERT INTO chats(id,user_id,role,text) VALUES(?,?,?,?)").bind(crypto.randomUUID(), o.id, "assistant", d.reply)]);
    let f = null;
    return d.action !== "none" && (f = crypto.randomUUID(), await t.DB.prepare("INSERT INTO pending_actions(user_id,token,data,plan_id,plan_hash,profile_hash,expires_at) VALUES(?,?,?,?,?,?,?) ON CONFLICT(user_id) DO UPDATE SET token=excluded.token,data=excluded.data,plan_id=excluded.plan_id,plan_hash=excluded.plan_hash,profile_hash=excluded.profile_hash,expires_at=excluded.expires_at").bind(o.id, f, JSON.stringify(d), u[0]?.id || null, await K(JSON.stringify(u[0]?.data || null)), await K(JSON.stringify(o.profile)), new Date(Date.now() + 6e5).toISOString()).run()), b({ ...d, actionToken: f });
  }
  if (n === "/api/chat/confirm" && r === "POST") {
    const { token: a } = await C(e, D({ token: $().uuid() })), u = await t.DB.prepare("SELECT * FROM pending_actions WHERE user_id=? AND token=? AND expires_at>CURRENT_TIMESTAMP").bind(o.id, a).first();
    if (!u) throw new Error("That suggestion expired. Ask the chef again.");
    const l = Wn.parse(B(u.data)), d = await q(t, o.id);
    if ((u.plan_id || null) !== (d[0]?.id || null) || u.plan_hash !== await K(JSON.stringify(d[0]?.data || null)) || u.profile_hash !== await K(JSON.stringify(o.profile))) throw new Error("Your settings or plan changed. Ask the chef for a new suggestion.");
    await t.DB.prepare("DELETE FROM pending_actions WHERE user_id=?").bind(o.id).run();
    let f = Q.parse(o.profile);
    if (l.action === "preferences")
      return f = Q.parse({ ...f, ...l.budget !== null ? { budget: l.budget } : {}, ...l.minutes !== null ? { minutes: l.minutes } : {}, ...l.cuisines !== null ? { cuisines: l.cuisines } : {} }), await t.DB.prepare("UPDATE users SET profile=? WHERE id=?").bind(JSON.stringify(f), o.id).run(), b({ message: "Preferences saved. Generate a new week to apply them." });
    if (l.action === "generate")
      return await _e(t, o.id, Wt(f, o.pantry, d[0]?.data.meals || [])), b({ message: "Your new meal plan and shopping list are ready." });
    if (l.action === "swap") {
      if (!d[0]) throw new Error("Generate a new plan before making this change.");
      return await _e(t, o.id, Kt(d[0].data, l.mealIndex, f, o.pantry, d[1]?.data.meals || []), d[0].id), b({ message: "Meal replaced and shopping list updated." });
    }
    return b({ message: "No change requested." });
  }
  if (n === "/api/account" && r === "DELETE") {
    const { password: a } = await C(e, D({ password: $().max(128) }));
    return await Vt(a, o.password) ? (await t.DB.prepare("DELETE FROM users WHERE id=?").bind(o.id).run(), b({ ok: !0 }, 200, { "set-cookie": "cc_session=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0" })) : b({ error: "Password is incorrect." }, 401);
  }
  return b({ error: "Not found." }, 404);
}
const Pc = {
  async fetch(e, t) {
    const n = new URL(e.url);
    try {
      return n.pathname.startsWith("/api/") ? await Nc(e, t, n.pathname) : t.ASSETS.fetch(e);
    } catch (r) {
      return b({ error: kc(r) }, r instanceof Dn ? 400 : 422);
    }
  }
};
export {
  Pc as default
};
