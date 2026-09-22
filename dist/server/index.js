function Gt(e) {
  const t = Object.values(e).filter((r) => typeof r == "number");
  return Object.entries(e).filter(([r, o]) => t.indexOf(+r) === -1).map(([r, o]) => o);
}
function ut(e, t = "|") {
  return e.map((n) => Xt(n)).join(t);
}
function Me(e, t) {
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
function Vn(e) {
  return e == null;
}
function He(e) {
  const t = e.startsWith("^") ? 1 : 0, n = e.endsWith("$") ? e.length - 1 : e.length;
  return e.slice(t, n);
}
function Hn(e, t) {
  const n = e / t, r = Math.round(n), o = 4 * Number.EPSILON * Math.max(Math.abs(n), 1);
  return Math.abs(n - r) < o ? 0 : n - r;
}
function A(e, t, n) {
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
function Gn(e) {
  return JSON.stringify(e);
}
function Yn(e) {
  return e.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}
const Yt = "captureStackTrace" in Error ? Error.captureStackTrace : (...e) => {
};
function ye(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
const qn = /* @__PURE__ */ Ve(() => {
  if (j.jitless || typeof navigator < "u" && navigator?.userAgent?.includes("Cloudflare"))
    return !1;
  try {
    const e = Function;
    return new e(""), !0;
  } catch {
    return !1;
  }
});
function te(e) {
  if (ye(e) === !1)
    return !1;
  const t = e.constructor;
  if (t === void 0 || typeof t != "function")
    return !0;
  const n = t.prototype;
  return !(ye(n) === !1 || Object.prototype.hasOwnProperty.call(n, "isPrototypeOf") === !1);
}
function qt(e) {
  return te(e) ? { ...e } : Array.isArray(e) ? [...e] : e instanceof Map ? new Map(e) : e instanceof Set ? new Set(e) : e;
}
const Xn = /* @__PURE__ */ new Set(["string", "number", "symbol"]);
function ne(e) {
  return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function H(e, t, n) {
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
function Xt(e) {
  return typeof e == "bigint" ? e.toString() + "n" : typeof e == "string" ? `"${e}"` : `${e}`;
}
function Qn(e) {
  return Object.keys(e).filter((t) => e[t]._zod.optin !== void 0 && e[t]._zod.optout === "optional");
}
const er = {
  safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
  int32: [-2147483648, 2147483647],
  uint32: [0, 4294967295],
  float32: [-34028234663852886e22, 34028234663852886e22],
  float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
};
function tr(e, t) {
  const n = e._zod.def, r = n.checks;
  if (r && r.length > 0)
    throw new Error(".pick() cannot be used on object schemas containing refinements");
  const i = V(e._zod.def, {
    get shape() {
      const s = {};
      for (const a of Reflect.ownKeys(t)) {
        if (!Object.prototype.hasOwnProperty.call(n.shape, a))
          throw new Error(`Unrecognized key: "${String(a)}"`);
        t[a] && A(s, a, n.shape[a]);
      }
      return A(this, "shape", s), s;
    },
    checks: []
  });
  return H(e, i);
}
function nr(e, t) {
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
      return A(this, "shape", s), s;
    },
    checks: []
  });
  return H(e, i);
}
function rr(e, t) {
  if (!te(t))
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
      return A(this, "shape", i), i;
    }
  });
  return H(e, o);
}
function or(e, t) {
  if (!te(t))
    throw new Error("Invalid input to safeExtend: expected a plain object");
  const n = V(e._zod.def, {
    get shape() {
      const r = { ...e._zod.def.shape, ...t };
      return A(this, "shape", r), r;
    }
  });
  return H(e, n);
}
function ir(e, t) {
  if (!t?._zod?.def)
    throw new Error("Invalid input to merge: expected an object schema. To merge a plain shape, use `.extend()`.");
  if (e._zod.def.checks?.length)
    throw new Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");
  const n = V(e._zod.def, {
    get shape() {
      const r = { ...e._zod.def.shape, ...t._zod.def.shape };
      return A(this, "shape", r), r;
    },
    get catchall() {
      return t._zod.def.catchall;
    },
    checks: t._zod.def.checks ?? []
  });
  return H(e, n);
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
      return A(this, "shape", u), u;
    },
    checks: []
  });
  return H(t, a);
}
function sr(e, t, n) {
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
      return A(this, "shape", i), i;
    }
  });
  return H(t, r);
}
function X(e, t = 0) {
  if (e.aborted === !0)
    return !0;
  for (let n = t; n < e.issues.length; n++)
    if (e.issues[n]?.continue !== !0)
      return !0;
  return !1;
}
function ar(e, t = 0) {
  if (e.aborted === !0)
    return !0;
  for (let n = t; n < e.issues.length; n++)
    if (e.issues[n]?.continue === !1)
      return !0;
  return !1;
}
function Q(e, t) {
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
function K(e, t, n) {
  var r;
  const o = e.inst?._zod?.traits;
  o?.has("$ZodType") && (o.has("$ZodCheck") ? (r = e).schema ?? (r.schema = e.inst) : e.schema = e.inst);
  const i = e.schema !== e.inst ? e.schema?._zod.def?.error : void 0, s = e.message ? e.message : ie(e.inst?._zod.def?.error?.(e)) ?? ie(i?.(e)) ?? ie(t?.error?.(e)) ?? ie(n.customError?.(e)) ?? ie(n.localeError?.(e)) ?? "Invalid input", { inst: a, schema: c, continue: u, input: l, ...f } = e;
  return f.path ?? (f.path = []), f.message = s, t?.reportInput && (f.input = l), f;
}
const cr = /[\uD800-\uDBFF]/;
function Ge(e) {
  const t = e.length;
  if (!cr.test(e))
    return t;
  let n = t;
  for (let r = 0; r < t - 1; r++)
    (e.charCodeAt(r) & 64512) === 55296 && (e.charCodeAt(r + 1) & 64512) === 56320 && (n--, r++);
  return n;
}
function Ye(e) {
  return Array.isArray(e) ? "array" : typeof e == "string" ? "string" : "unknown";
}
function ur(e) {
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
function lr(e, t) {
  for (const n in t) {
    const r = Object.getOwnPropertyDescriptor(t, n);
    r.get ? Object.defineProperty(e, n, { ...r, enumerable: !1 }) : fr(e, n, r.value);
  }
}
function re(e, t, n, r = !0) {
  return Object.defineProperty(e, t, { configurable: !0, writable: !0, enumerable: r, value: n }), n;
}
function Qt(e, t, n) {
  return re(e, t, n, !1);
}
function fr(e, t, n) {
  Object.defineProperty(e, t, {
    configurable: !0,
    get() {
      return this == null ? n : re(this, t, n.bind(this));
    },
    set(r) {
      re(this, t, r);
    }
  });
}
function dr(e, t) {
  const n = Object.getPrototypeOf(e);
  return t in n ? void 0 : n;
}
let Ae, B = !1;
const pr = {
  configurable: !0,
  get() {
    B = !0;
  }
};
function w(e, t, n) {
  const r = Object.getPrototypeOf(e._zod);
  if (t in r && Ae !== e._zod) {
    Ae = void 0;
    return;
  }
  Ae = e._zod, Object.defineProperty(r, t, {
    configurable: !0,
    get() {
      Object.defineProperty(this, t, pr);
      const o = B;
      B = !1;
      try {
        const i = n(this);
        return B ? delete this[t] : Object.defineProperty(this, t, { configurable: !0, writable: !0, value: i }), B = B || o, i;
      } catch (i) {
        throw delete this[t], B = B || o, i;
      }
    },
    set(o) {
      Object.defineProperty(this, t, { configurable: !0, writable: !0, value: o });
    }
  });
}
function hr(e, t, n, r) {
  const o = dr(e, t);
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
const mr = "~constantCatch";
function gr(e) {
  const t = () => e;
  return t[mr] = !0, t;
}
var dt;
const Ze = { value: void 0, enumerable: !1 };
let pt = "captureStackTrace" in Error ? Error : null;
function _r(e) {
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
function d(e, t, n, r) {
  const o = {};
  function i(p) {
    this.def = p, this.constr = f, this.traits = /* @__PURE__ */ new Set();
  }
  i.prototype = o;
  const s = n, a = s && /* @__PURE__ */ new WeakSet();
  function c(p, h) {
    if (!p._zod) {
      Ze.value = new i(h);
      try {
        Object.defineProperty(p, "_zod", Ze);
      } finally {
        Ze.value = void 0;
      }
    }
    if (p._zod.traits.has(e))
      return;
    if (p._zod.traits.add(e), t(p, h), a) {
      const y = Object.getPrototypeOf(p), _ = p._zod.constr.prototype;
      let v = y;
      for (; v && v !== _; )
        v = Object.getPrototypeOf(v);
      const I = v ?? y;
      a.has(I) || (a.add(I), lr(I, s));
    }
    const m = f.prototype;
    for (const y in m)
      Object.prototype.hasOwnProperty.call(m, y) && (y in p || (p[y] = m[y].bind(p)));
  }
  const u = r?.Parent ?? Object;
  class l extends u {
  }
  Object.defineProperty(l, "name", { value: e });
  function f(p) {
    const h = r?.Parent ? _r(l) : this;
    c(h, p);
    const m = h._zod.deferred;
    if (m) {
      for (const _ of m)
        _();
      h._zod.deferred = void 0;
    }
    const y = globalThis.__zod_globalConfig?.postProcessor;
    return y && y(h), h;
  }
  return Object.defineProperty(f, "init", { value: c }), Object.defineProperty(f, Symbol.hasInstance, {
    value: (p) => r?.Parent && p instanceof r.Parent ? !0 : p?._zod?.traits?.has(e)
  }), Object.defineProperty(f, "name", { value: e }), f;
}
class ee extends Error {
  constructor() {
    super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
  }
}
class en extends Error {
  constructor(t) {
    super(`Encountered unidirectional transform during encode: ${t}`), this.name = "ZodEncodeError";
  }
}
(dt = globalThis).__zod_globalConfig ?? (dt.__zod_globalConfig = {});
const j = globalThis.__zod_globalConfig;
function F(e) {
  return e && Object.assign(j, e), j;
}
function yr() {
  const e = this._zod;
  return e.message ?? (e.message = JSON.stringify(e.def, Me, 2)), e.message;
}
function br(e) {
  this._zod.message = e;
}
const wr = {
  get: yr,
  set: br,
  enumerable: !0,
  configurable: !0
}, De = { value: void 0, enumerable: !1 }, Ce = { value: void 0, enumerable: !1 }, ht = /* @__PURE__ */ new WeakSet([Object.prototype, Error.prototype]), tn = (e, t) => {
  e.name = "$ZodError", De.value = e._zod, Object.defineProperty(e, "_zod", De), Ce.value = t, Object.defineProperty(e, "issues", Ce), De.value = void 0, Ce.value = void 0, Object.defineProperty(e, "message", wr);
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
}, nn = d("$ZodError", tn), rn = d("$ZodError", tn, void 0, {
  Parent: Error
});
function vr(e, t, n) {
  return Object.prototype.hasOwnProperty.call(e, t) || (t === "__proto__" ? Object.defineProperty(e, t, { value: n(), writable: !0, enumerable: !0, configurable: !0 }) : e[t] = n()), e[t];
}
function kr(e, t = (n) => n.message) {
  const n = {}, r = [];
  for (const o of e.issues)
    o.path.length > 0 ? vr(n, o.path[0], () => []).push(t(o)) : r.push(t(o));
  return { formErrors: r, fieldErrors: n };
}
function Sr(e, t = (n) => n.message) {
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
            const l = a[u], f = u === a.length - 1;
            if (l === "_errors") {
              f && c._errors.push(t(s)), u++;
              continue;
            }
            Object.prototype.hasOwnProperty.call(c, l) || Object.defineProperty(c, l, {
              value: { _errors: [] },
              enumerable: !0,
              writable: !0,
              configurable: !0
            });
            const p = c[l];
            f && p._errors.push(t(s)), c = p, u++;
          }
        }
      }
  };
  return r(e), n;
}
function Ee(e, t) {
  return { callee: t?.callee ?? e, Err: t?.Err };
}
const qe = (e) => {
  const t = (n, r, o, i) => {
    const s = o ? { ...o, async: !1 } : { async: !1 }, a = n._zod.run({ value: r, issues: [] }, s);
    if (a instanceof Promise)
      throw new ee();
    if (a.issues.length) {
      const c = new (i?.Err ?? e)(a.issues.map((u) => K(u, s, F())));
      throw Yt(c, i?.callee ?? t), c;
    }
    return a.value;
  };
  return t;
}, Xe = (e) => {
  const t = async (n, r, o, i) => {
    const s = o ? { ...o, async: !0 } : { async: !0 };
    let a = n._zod.run({ value: r, issues: [] }, s);
    if (a instanceof Promise && (a = await a), a.issues.length) {
      const c = new (i?.Err ?? e)(a.issues.map((u) => K(u, s, F())));
      throw Yt(c, i?.callee ?? t), c;
    }
    return a.value;
  };
  return t;
}, $e = (e) => (t, n, r) => {
  const o = r ? { ...r, async: !1 } : { async: !1 }, i = t._zod.run({ value: n, issues: [] }, o);
  if (i instanceof Promise)
    throw new ee();
  return i.issues.length ? {
    success: !1,
    error: new (e ?? nn)(i.issues.map((s) => K(s, o, F())))
  } : { success: !0, data: i.value };
}, zr = /* @__PURE__ */ $e(rn), Te = (e) => async (t, n, r) => {
  const o = r ? { ...r, async: !0 } : { async: !0 };
  let i = t._zod.run({ value: n, issues: [] }, o);
  return i instanceof Promise && (i = await i), i.issues.length ? {
    success: !1,
    error: new e(i.issues.map((s) => K(s, o, F())))
  } : { success: !0, data: i.value };
}, Or = /* @__PURE__ */ Te(rn), Er = (e) => {
  const t = qe(e), n = (r, o, i, s) => {
    const a = i ? { ...i, direction: "backward" } : { direction: "backward" };
    return t(r, o, a, Ee(n, s));
  };
  return n;
}, $r = (e) => {
  const t = qe(e), n = (r, o, i, s) => t(r, o, i, Ee(n, s));
  return n;
}, Tr = (e) => {
  const t = Xe(e), n = async (r, o, i, s) => {
    const a = i ? { ...i, direction: "backward" } : { direction: "backward" };
    return await t(r, o, a, Ee(n, s));
  };
  return n;
}, Ir = (e) => {
  const t = Xe(e), n = async (r, o, i, s) => await t(r, o, i, Ee(n, s));
  return n;
}, Pr = (e) => (t, n, r) => {
  const o = r ? { ...r, direction: "backward" } : { direction: "backward" };
  return $e(e)(t, n, o);
}, Nr = (e) => (t, n, r) => $e(e)(t, n, r), Ar = (e) => async (t, n, r) => {
  const o = r ? { ...r, direction: "backward" } : { direction: "backward" };
  return Te(e)(t, n, o);
}, Zr = (e) => async (t, n, r) => Te(e)(t, n, r), Dr = /^[cC][0-9a-z]{6,}$/, Cr = /^[0-9a-z]+$/, Rr = /^[0-7][0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{25}$/, jr = /^[0-9a-vA-V]{20}$/, xr = /^[A-Za-z0-9]{27}$/, Mr = /^[a-zA-Z0-9_-]{21}$/;
function Ur(e) {
  return new RegExp(`^[a-zA-Z0-9_-]{${e}}$`);
}
const Fr = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/, Lr = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/, mt = (e) => e ? new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${e}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`) : /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/, Br = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/, Jr = "^[\\p{Extended_Pictographic}\\p{Emoji_Component}]+$";
function Kr() {
  return new RegExp(Jr, "u");
}
const Wr = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, Vr = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/, Hr = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/, Gr = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, Yr = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/, on = /^[A-Za-z0-9_-]*$/, qr = /^https?$/, Xr = /^\+[1-9]\d{6,14}$/, sn = "(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))";
function Qr(e) {
  return new RegExp(`^${e}$`);
}
const eo = /* @__PURE__ */ Qr(sn);
function Ue(e) {
  const t = "(?:[01]\\d|2[0-3]):[0-5]\\d";
  return typeof e.precision == "number" ? e.precision === -1 ? `${t}` : e.precision === 0 ? `${t}:[0-5]\\d` : `${t}:[0-5]\\d\\.\\d{${e.precision}}` : e.seconds ? `${t}:[0-5]\\d(?:\\.\\d+)?` : `${t}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function to(e) {
  return new RegExp(`^${Ue(e)}$`);
}
function no(e) {
  const t = ["Z"];
  e.offset && t.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)");
  const n = `${Ue({ precision: e.precision, seconds: !0 })}(?:${t.join("|")})`, r = e.local ? `${n}|${Ue({ precision: e.precision })}` : n;
  return new RegExp(`^${sn}T(?:${r})$`);
}
const ro = (e) => {
  const t = e ? `[\\s\\S]{${e?.minimum ?? 0},${e?.maximum ?? ""}}` : "[\\s\\S]*";
  return new RegExp(`^${t}$`);
}, an = /^-?\d+$/, Qe = /^-?\d+(?:\.\d+)?$/, oo = /^(?:true|false)$/i, io = /^[^A-Z]*$/, so = /^[^a-z]*$/, Z = /* @__PURE__ */ d("$ZodCheck", (e, t) => {
  var n;
  e._zod ?? (e._zod = {}), e._zod.def = t, (n = e._zod).onattach ?? (n.onattach = []);
}), et = (e) => {
  const t = e.value;
  return !Vn(t) && t.length !== void 0;
}, be = {
  number: "number",
  bigint: "bigint",
  object: "date"
}, cn = /* @__PURE__ */ d("$ZodCheckLessThan", (e, t) => {
  Z.init(e, t);
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
}), un = /* @__PURE__ */ d("$ZodCheckGreaterThan", (e, t) => {
  Z.init(e, t);
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
}), ao = /* @__PURE__ */ d("$ZodCheckMultipleOf", (e, t) => {
  Z.init(e, t), e._zod.onattach.push((n) => {
    var r;
    (r = n._zod.bag).multipleOf ?? (r.multipleOf = t.value);
  }), e._zod.check = (n) => {
    if (typeof n.value != typeof t.value)
      throw new Error("Cannot mix number and bigint in multiple_of check.");
    (typeof n.value == "bigint" ? (
      // `value % 0n` throws, and nothing is a multiple of zero — the number branch already fails this way via NaN
      t.value !== BigInt(0) && n.value % t.value === BigInt(0)
    ) : Hn(n.value, t.value) === 0) || n.issues.push({
      origin: typeof n.value,
      code: "not_multiple_of",
      divisor: t.value,
      input: n.value,
      inst: e,
      continue: !t.abort
    });
  };
}), co = /* @__PURE__ */ d("$ZodCheckNumberFormat", (e, t) => {
  Z.init(e, t), t.format = t.format || "float64";
  const n = t.format?.includes("int"), r = n ? "int" : "number", [o, i] = er[t.format];
  e._zod.onattach.push((s) => {
    const a = s._zod.bag;
    a.format = t.format, a.minimum = o, a.maximum = i, n && (a.pattern = an);
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
}), uo = /* @__PURE__ */ d("$ZodCheckMaxLength", (e, t) => {
  var n;
  Z.init(e, t), (n = e._zod.def).when ?? (n.when = et), e._zod.onattach.push((r) => {
    const o = r._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
    t.maximum < o && (r._zod.bag.maximum = t.maximum);
  }), e._zod.check = (r) => {
    const o = r.value, i = o.length;
    if ((typeof o == "string" && i > t.maximum ? Ge(o) : i) <= t.maximum)
      return;
    const a = Ye(o);
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
}), lo = /* @__PURE__ */ d("$ZodCheckMinLength", (e, t) => {
  var n;
  Z.init(e, t), (n = e._zod.def).when ?? (n.when = et), e._zod.onattach.push((r) => {
    const o = r._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
    t.minimum > o && (r._zod.bag.minimum = t.minimum);
  }), e._zod.check = (r) => {
    const o = r.value, i = o.length;
    if ((typeof o == "string" && i >= t.minimum && i < t.minimum * 2 ? Ge(o) : i) >= t.minimum)
      return;
    const a = Ye(o);
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
}), fo = /* @__PURE__ */ d("$ZodCheckLengthEquals", (e, t) => {
  var n;
  Z.init(e, t), (n = e._zod.def).when ?? (n.when = et), e._zod.onattach.push((r) => {
    const o = r._zod.bag;
    o.minimum = t.length, o.maximum = t.length, o.length = t.length;
  }), e._zod.check = (r) => {
    const o = r.value, i = o.length, s = typeof o == "string" && i >= t.length && i <= t.length * 2 ? Ge(o) : i;
    if (s === t.length)
      return;
    const a = Ye(o), c = s > t.length;
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
}), Ie = /* @__PURE__ */ d("$ZodCheckStringFormat", (e, t) => {
  var n, r;
  Z.init(e, t), e._zod.onattach.push((o) => {
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
}), po = /* @__PURE__ */ d("$ZodCheckRegex", (e, t) => {
  Ie.init(e, t), e._zod.check = (n) => {
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
}), ho = /* @__PURE__ */ d("$ZodCheckLowerCase", (e, t) => {
  t.pattern ?? (t.pattern = io), Ie.init(e, t);
}), mo = /* @__PURE__ */ d("$ZodCheckUpperCase", (e, t) => {
  t.pattern ?? (t.pattern = so), Ie.init(e, t);
}), go = /* @__PURE__ */ d("$ZodCheckIncludes", (e, t) => {
  Z.init(e, t);
  const n = ne(t.includes), r = new RegExp(typeof t.position == "number" ? `^.{${t.position},}${n}` : n);
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
}), _o = /* @__PURE__ */ d("$ZodCheckStartsWith", (e, t) => {
  Z.init(e, t);
  const n = new RegExp(`^${ne(t.prefix)}.*`);
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
}), yo = /* @__PURE__ */ d("$ZodCheckEndsWith", (e, t) => {
  Z.init(e, t);
  const n = new RegExp(`.*${ne(t.suffix)}$`);
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
}), bo = /* @__PURE__ */ d("$ZodCheckOverwrite", (e, t) => {
  Z.init(e, t), e._zod.check = (n) => {
    n.value = t.tx(n.value);
  };
});
class wo {
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
const vo = {
  major: 4,
  minor: 5,
  patch: 4
}, z = /* @__PURE__ */ d("$ZodType", (e, t) => {
  var n;
  e ?? (e = {}), e._zod.def = t, e._zod.bag = e._zod.bag || {}, e._zod.version = vo;
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
      let l = X(a), f;
      for (const p of c) {
        if (p._zod.def.when) {
          if (ar(a) || !p._zod.def.when(a))
            continue;
        } else if (l)
          continue;
        const h = a.issues.length, m = p._zod.check(a);
        if (m instanceof Promise && u?.async === !1)
          throw new ee();
        if (f || m instanceof Promise)
          f = (f ?? Promise.resolve()).then(async () => {
            await m, a.issues.length !== h && (ft(a.issues, h, e), l || (l = X(a, h)));
          });
        else {
          if (a.issues.length === h)
            continue;
          ft(a.issues, h, e), l || (l = X(a, h));
        }
      }
      return f ? f.then(() => a) : a;
    }, s = (a, c, u) => {
      if (X(a))
        return a.aborted = !0, a;
      const l = i(c, o, u);
      if (l instanceof Promise) {
        if (u.async === !1)
          throw new ee();
        return l.then((f) => e._zod.parse(f, u));
      }
      return e._zod.parse(l, u);
    };
    e._zod.run = (a, c) => {
      if (c.skipChecks)
        return e._zod.parse(a, c);
      if (c.direction === "backward") {
        const l = e._zod.parse({ value: a.value, issues: [] }, { ...c, skipChecks: !0 });
        return l instanceof Promise ? l.then((f) => s(f, a, c)) : s(l, a, c);
      }
      const u = e._zod.parse(a, c);
      if (u instanceof Promise) {
        if (c.async === !1)
          throw new ee();
        return u.then((l) => i(l, o, c));
      }
      return i(u, o, c);
    };
  }
}, {
  // Wrappers extend this by installing a richer factory over it; reading it eagerly would defeat the laziness.
  get "~standard"() {
    return Qt(this, "~standard", ln(this));
  },
  set "~standard"(e) {
    re(this, "~standard", e);
  }
}), gt = (e) => e.success ? { value: e.data } : { issues: e.error?.issues };
function ln(e) {
  return {
    validate: (t) => {
      try {
        return gt(zr(e, t));
      } catch {
        return Or(e, t).then(gt);
      }
    },
    vendor: "zod",
    version: 1
  };
}
const tt = /* @__PURE__ */ d("$ZodString", (e, t) => {
  z.init(e, t), e._zod.pattern = [...e?._zod.bag?.patterns ?? []].pop() ?? ro(e._zod.bag), e._zod.parse = (n, r) => {
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
}), S = /* @__PURE__ */ d("$ZodStringFormat", (e, t) => {
  Ie.init(e, t), tt.init(e, t);
}), ko = /* @__PURE__ */ d("$ZodGUID", (e, t) => {
  t.pattern ?? (t.pattern = Lr), S.init(e, t);
}), So = /* @__PURE__ */ d("$ZodUUID", (e, t) => {
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
  S.init(e, t);
}), zo = /* @__PURE__ */ d("$ZodEmail", (e, t) => {
  t.pattern ?? (t.pattern = Br), S.init(e, t);
}), fn = 1, dn = 2;
function Oo(e, t) {
  if (!t.normalize && t.protocol?.source === qr.source && !/^https?:\/\//i.test(e))
    return fn;
  try {
    return new URL(e);
  } catch {
    return dn;
  }
}
const Eo = /[\t\n\r]/g;
function $o(e) {
  return e.replace(Eo, "");
}
function To(e, t) {
  return t.lastIndex = 0, t.test(e.hostname);
}
function Io(e, t) {
  return t.lastIndex = 0, t.test(e.protocol.endsWith(":") ? e.protocol.slice(0, -1) : e.protocol);
}
const Po = /* @__PURE__ */ d("$ZodURL", (e, t) => {
  S.init(e, t), e._zod.check = (n) => {
    try {
      const r = n.value.trim(), o = Oo(r, t);
      if (o === fn) {
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
      if (o === dn) {
        n.issues.push({
          code: "invalid_format",
          format: "url",
          input: n.value,
          inst: e,
          continue: !t.abort
        });
        return;
      }
      t.hostname && !To(o, t.hostname) && n.issues.push({
        code: "invalid_format",
        format: "url",
        note: "Invalid hostname",
        pattern: t.hostname.source,
        input: n.value,
        inst: e,
        continue: !t.abort
      }), t.protocol && !Io(o, t.protocol) && n.issues.push({
        code: "invalid_format",
        format: "url",
        note: "Invalid protocol",
        pattern: t.protocol.source,
        input: n.value,
        inst: e,
        continue: !t.abort
      }), n.value = t.normalize ? o.href : $o(r);
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
}), No = /* @__PURE__ */ d("$ZodEmoji", (e, t) => {
  t.pattern ?? (t.pattern = Kr()), S.init(e, t);
}), Ao = /* @__PURE__ */ d("$ZodNanoID", (e, t) => {
  if (t.length !== void 0 && (!Number.isInteger(t.length) || t.length < 1))
    throw new Error(`Invalid nanoid length: ${t.length}`);
  t.pattern ?? (t.pattern = t.length === void 0 ? Mr : Ur(t.length)), S.init(e, t);
}), Zo = /* @__PURE__ */ d("$ZodCUID", (e, t) => {
  t.pattern ?? (t.pattern = Dr), S.init(e, t);
}), Do = /* @__PURE__ */ d("$ZodCUID2", (e, t) => {
  t.pattern ?? (t.pattern = Cr), S.init(e, t);
}), Co = /* @__PURE__ */ d("$ZodULID", (e, t) => {
  t.pattern ?? (t.pattern = Rr), S.init(e, t);
}), Ro = /* @__PURE__ */ d("$ZodXID", (e, t) => {
  t.pattern ?? (t.pattern = jr), S.init(e, t);
}), jo = /* @__PURE__ */ d("$ZodKSUID", (e, t) => {
  t.pattern ?? (t.pattern = xr), S.init(e, t);
}), xo = /* @__PURE__ */ d("$ZodISODateTime", (e, t) => {
  t.pattern ?? (t.pattern = no(t)), S.init(e, t), (t.local || t.precision === -1) && (e._zod.bag.laxFormat = !0, e._zod.onattach.push((n) => {
    n._zod.bag.laxFormat = !0;
  }));
}), Mo = /* @__PURE__ */ d("$ZodISODate", (e, t) => {
  t.pattern ?? (t.pattern = eo), S.init(e, t);
}), Uo = /* @__PURE__ */ d("$ZodISOTime", (e, t) => {
  t.pattern ?? (t.pattern = to(t)), S.init(e, t);
}), Fo = /* @__PURE__ */ d("$ZodISODuration", (e, t) => {
  t.pattern ?? (t.pattern = Fr), S.init(e, t);
}), Lo = /* @__PURE__ */ d("$ZodIPv4", (e, t) => {
  t.pattern ?? (t.pattern = Wr), S.init(e, t), e._zod.bag.format = "ipv4";
}), Bo = /^[0-9a-fA-F:.]+$/;
function pn(e) {
  if (!Bo.test(e))
    return !1;
  try {
    return new URL(`http://[${e}]`), !0;
  } catch {
    return !1;
  }
}
const Jo = /* @__PURE__ */ d("$ZodIPv6", (e, t) => {
  t.pattern ?? (t.pattern = Vr), S.init(e, t), e._zod.bag.format = "ipv6", e._zod.check = (n) => {
    pn(n.value) || n.issues.push({
      code: "invalid_format",
      format: "ipv6",
      input: n.value,
      inst: e,
      continue: !t.abort
    });
  };
}), Ko = /* @__PURE__ */ d("$ZodCIDRv4", (e, t) => {
  t.pattern ?? (t.pattern = Hr), S.init(e, t);
});
function Wo(e) {
  const t = e.split("/");
  if (t.length !== 2)
    return !1;
  const [n, r] = t;
  if (!r)
    return !1;
  const o = Number(r);
  return `${o}` !== r || o < 0 || o > 128 ? !1 : pn(n);
}
const Vo = /* @__PURE__ */ d("$ZodCIDRv6", (e, t) => {
  t.pattern ?? (t.pattern = Gr), S.init(e, t), e._zod.check = (n) => {
    Wo(n.value) || n.issues.push({
      code: "invalid_format",
      format: "cidrv6",
      input: n.value,
      inst: e,
      continue: !t.abort
    });
  };
});
function hn(e) {
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
const Ho = /* @__PURE__ */ d("$ZodBase64", (e, t) => {
  t.pattern ?? (t.pattern = Yr), S.init(e, t), e._zod.bag.contentEncoding = "base64", e._zod.check = (n) => {
    hn(n.value) || n.issues.push({
      code: "invalid_format",
      format: "base64",
      input: n.value,
      inst: e,
      continue: !t.abort
    });
  };
});
function Go(e) {
  if (!on.test(e))
    return !1;
  const t = e.replace(/[-_]/g, (r) => r === "-" ? "+" : "/"), n = t.padEnd(Math.ceil(t.length / 4) * 4, "=");
  return hn(n);
}
const Yo = /* @__PURE__ */ d("$ZodBase64URL", (e, t) => {
  t.pattern ?? (t.pattern = on), S.init(e, t), e._zod.bag.contentEncoding = "base64url", e._zod.check = (n) => {
    Go(n.value) || n.issues.push({
      code: "invalid_format",
      format: "base64url",
      input: n.value,
      inst: e,
      continue: !t.abort
    });
  };
}), qo = /* @__PURE__ */ d("$ZodE164", (e, t) => {
  t.pattern ?? (t.pattern = Xr), S.init(e, t);
});
function Xo(e, t = null) {
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
const Qo = /* @__PURE__ */ d("$ZodJWT", (e, t) => {
  S.init(e, t), e._zod.check = (n) => {
    Xo(n.value, t.alg) || n.issues.push({
      code: "invalid_format",
      format: "jwt",
      input: n.value,
      inst: e,
      continue: !t.abort
    });
  };
}), mn = /* @__PURE__ */ d("$ZodNumber", (e, t) => {
  z.init(e, t), e._zod.pattern = e._zod.bag.pattern ?? Qe, e._zod.parse = (n, r) => {
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
}), ei = /* @__PURE__ */ d("$ZodNumberFormat", (e, t) => {
  co.init(e, t), mn.init(e, t);
}), ti = /* @__PURE__ */ d("$ZodBoolean", (e, t) => {
  z.init(e, t), e._zod.pattern = oo, e._zod.parse = (n, r) => {
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
}), ni = /* @__PURE__ */ d("$ZodUnknown", (e, t) => {
  z.init(e, t), e._zod.parse = (n) => n;
}), ri = /* @__PURE__ */ d("$ZodNever", (e, t) => {
  z.init(e, t), e._zod.parse = (n, r) => (n.issues.push({
    expected: "never",
    code: "invalid_type",
    input: n.value,
    inst: e
  }), n);
});
function _t(e, t, n) {
  e.issues.length && t.issues.push(...Q(n, e.issues)), t.value[n] = e.value;
}
const oi = /* @__PURE__ */ d("$ZodArray", (e, t) => {
  z.init(e, t);
  const n = j.memoizer;
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
      t.issues.push(...Q(n, e.issues));
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
const ii = [];
function gn(e) {
  const t = Object.keys(e.shape), n = Object.getOwnPropertySymbols(e.shape), r = n.length ? n : ii, o = r.length ? [...t, ...r] : t;
  for (const s of o)
    if (!e.shape?.[s]?._zod?.traits?.has("$ZodType"))
      throw new Error(`Invalid element at key "${String(s)}": expected a Zod schema`);
  const i = Qn(e.shape);
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
function _n(e, t, n, r, o, i) {
  const s = [], a = o.keySet, c = o.catchall._zod, u = c.def.type, l = c.optin, f = c.optout;
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
    h instanceof Promise ? e.push(h.then((m) => we(m, n, p, t, l, f))) : we(h, n, p, t, l, f);
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
const yt = /* @__PURE__ */ new WeakMap(), si = /* @__PURE__ */ d("$ZodObject", (e, t) => {
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
  const r = Ve(() => gn(t));
  w(e, "propValues", (c) => {
    const u = c.def.shape, l = {};
    for (const f in u) {
      const p = u[f]._zod;
      if (p.values) {
        Object.prototype.hasOwnProperty.call(l, f) || A(l, f, /* @__PURE__ */ new Set());
        for (const h of p.values)
          l[f].add(h);
        p.optin !== void 0 && l[f].add(void 0);
      }
    }
    return l;
  });
  const o = ye, i = t.catchall;
  let s;
  const a = j.memoizer;
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
    const f = [], p = s.shape;
    for (const h of s.allKeys) {
      if (h === "__proto__")
        continue;
      const m = p[h], y = m._zod.optin, _ = m._zod.optout, v = m._zod.run({ value: l[h], issues: [] }, u);
      v instanceof Promise ? f.push(v.then((I) => we(I, c, h, l, y, _))) : we(v, c, h, l, y, _);
    }
    return i ? _n(f, l, c, u, r.value, e) : f.length ? Promise.all(f).then(() => c) : c;
  };
}), ai = /* @__PURE__ */ d("$ZodObjectJIT", (e, t) => {
  si.init(e, t);
  const n = e._zod.parse, r = Ve(() => gn(t)), o = j.memoizer, i = (h) => {
    const m = r.value, y = m.symbolKeys, _ = new wo(["payload", "ctx"], { shape: h, inst: e, memo: o, syms: y }), v = (N) => `shape[${N}]._zod.run({ value: input[${N}], issues: [] }, ctx)`, I = (N, k) => `
          for (let i = 0; i < ${N}.issues.length; i++) {
            const iss = ${N}.issues[i];
            iss.path = iss.path ? [${k}, ...iss.path] : [${k}];
            payload.issues.push(iss);
          }`;
    _.write("const input = payload.value;");
    const it = /* @__PURE__ */ Object.create(null);
    let Jn = 0;
    for (const N of m.allKeys)
      it[N] = `key_${Jn++}`;
    _.write(o ? "const newResult = memo.alloc(inst, payload, {}, ctx);" : "const newResult = {};");
    for (const N of m.allKeys) {
      if (N === "__proto__")
        continue;
      const k = it[N], x = typeof N == "symbol" ? `syms[${y.indexOf(N)}]` : Gn(N), Ne = `${x} in input`, st = h[N], at = st?._zod?.optin, ct = at !== void 0, Kn = st?._zod?.optout === "optional";
      if (_.write(`const ${k} = ${v(x)};`), ct && Kn) {
        const Wn = at === "optional" ? `${k}_present` : `${k}.value !== undefined || ${k}_present`;
        _.write(`
        const ${k}_present = ${Ne};
        if (!${k}.issues.length || ${k}_present) {
          if (${k}.issues.length) {${I(k, x)}
          }

          if (${Wn}) {
            newResult[${x}] = ${k}.value;
          }
        }

      `);
      } else ct ? _.write(`
        if (${k}.issues.length) {${I(k, x)}
        }
        
        if (${k}.value === undefined) {
          if (${Ne}) {
            newResult[${x}] = undefined;
          }
        } else {
          newResult[${x}] = ${k}.value;
        }

      `) : _.write(`
        const ${k}_present = ${Ne};
        if (${k}.issues.length) {${I(k, x)}
        }
        if (!${k}_present && !${k}.issues.length) {
          payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: undefined,
            path: [${x}]
          });
        }

        if (${k}_present) {
          newResult[${x}] = ${k}.value;
        }

      `);
    }
    return _.write("payload.value = newResult;"), _.write("return payload;"), _.compile();
  };
  let s;
  const a = ye, c = !j.jitless, l = c && qn.value, f = t.catchall;
  let p;
  e._zod.parse = (h, m) => {
    p ?? (p = r.value);
    const y = h.value;
    return a(y) ? c && l && m?.async === !1 && m.jitless !== !0 ? (s || (s = i(t.shape)), h = s(h, m), f ? _n([], y, h, m, p, e) : h) : n(h, m) : (h.issues.push({
      expected: "object",
      code: "invalid_type",
      input: y,
      inst: e
    }), h);
  };
});
function bt(e, t, n, r) {
  for (const i of e)
    if (i.issues.length === 0)
      return t.value = i.value, t;
  const o = e.filter((i) => !X(i));
  return o.length === 1 ? (t.value = o[0].value, o[0]) : (t.issues.push({
    code: "invalid_union",
    input: t.value,
    inst: n,
    errors: e.map((i) => i.issues.map((s) => K(s, r, F())))
  }), t);
}
const ci = /* @__PURE__ */ d("$ZodUnion", (e, t) => {
  z.init(e, t), w(e, "optin", (r) => r.def.options.some((o) => o._zod.optin === "defaulted") ? "defaulted" : r.def.options.some((o) => o._zod.optin !== void 0) ? "optional" : void 0), w(e, "optout", (r) => r.def.options.some((o) => o._zod.optout === "optional") ? "optional" : void 0), w(e, "values", (r) => {
    if (r.def.options.every((o) => o._zod.values))
      return new Set(r.def.options.flatMap((o) => Array.from(o._zod.values)));
  }), w(e, "pattern", (r) => {
    if (r.def.options.every((o) => o._zod.pattern)) {
      const o = r.def.options.map((i) => i._zod.pattern);
      return new RegExp(`^(${o.map((i) => He(i.source)).join("|")})$`);
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
}), ui = /* @__PURE__ */ d("$ZodIntersection", (e, t) => {
  z.init(e, t), e._zod.parse = (n, r) => {
    const o = n.value, i = t.left._zod.run({ value: o, issues: [] }, r), s = t.right._zod.run({ value: o, issues: [] }, r);
    return i instanceof Promise || s instanceof Promise ? Promise.all([i, s]).then(([c, u]) => wt(n, c, u)) : wt(n, i, s);
  };
});
function Fe(e, t) {
  if (e === t)
    return { valid: !0, data: e };
  if (e instanceof Date && t instanceof Date && +e == +t)
    return { valid: !0, data: e };
  if (te(e) && te(t)) {
    const n = Object.keys(t), r = Object.keys(e).filter((i) => n.indexOf(i) !== -1), o = { ...e, ...t };
    Object.prototype.hasOwnProperty.call(o, "__proto__") && delete o.__proto__;
    for (const i of r) {
      if (i === "__proto__")
        continue;
      const s = Fe(e[i], t[i]);
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
      const o = e[r], i = t[r], s = Fe(o, i);
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
    let f;
    if (u.code === "unrecognized_keys" && !u.path?.length)
      o ?? (o = u), f = u.keys;
    else if (u.code === "invalid_key" && u.origin === "record" && u.path?.length === 1) {
      const p = String(u.path[0]);
      i.has(p) || i.set(p, u), f = [p];
    } else
      return !1;
    for (const p of f)
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
  const c = Fe(t.value, n.value);
  if (!c.valid) {
    if (X(e))
      return e;
    throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(c.mergeErrorPath)}`);
  }
  return e.value = c.data, e;
}
const li = /* @__PURE__ */ d("$ZodRecord", (e, t) => {
  z.init(e, t);
  const n = j.memoizer;
  n?.attach(e), e._zod.parse = (r, o) => {
    const i = r.value;
    if (!te(i))
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
          const f = t.keyType._zod.run({ value: l, issues: [] }, o);
          if (f instanceof Promise)
            throw new Error("Async schemas not supported in object keys currently");
          if (f.issues.length) {
            r.issues.push({
              code: "invalid_key",
              origin: "record",
              issues: f.issues.map((m) => K(m, o, F())),
              input: l,
              path: [l],
              inst: e
            });
            continue;
          }
          const p = f.value;
          if (p === "__proto__")
            continue;
          const h = t.valueType._zod.run({ value: i[l], issues: [] }, o);
          h instanceof Promise ? s.push(h.then((m) => {
            m.issues.length && r.issues.push(...Q(l, m.issues)), r.value[p] = m.value;
          })) : (h.issues.length && r.issues.push(...Q(l, h.issues)), r.value[p] = h.value);
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
        if (typeof u == "string" && Qe.test(u) && l.issues.length) {
          const m = t.keyType._zod.run({ value: Number(u), issues: [] }, o);
          if (m instanceof Promise)
            throw new Error("Async schemas not supported in object keys currently");
          m.issues.length === 0 && (l = m);
        }
        if (l.issues.length) {
          t.mode === "loose" ? r.value[u] = i[u] : a ? (c = c ?? [], c.push(u)) : r.issues.push({
            code: "invalid_key",
            origin: "record",
            issues: l.issues.map((m) => K(m, o, F())),
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
          m.issues.length && r.issues.push(...Q(u, m.issues)), r.value[p] = m.value;
        })) : (h.issues.length && r.issues.push(...Q(u, h.issues)), r.value[p] = h.value);
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
}), fi = /* @__PURE__ */ d("$ZodEnum", (e, t) => {
  z.init(e, t);
  const n = Gt(t.entries), r = new Set(n);
  e._zod.values = r;
  const o = n.filter((i) => Xn.has(typeof i));
  e._zod.pattern = new RegExp(o.length ? `^(${o.map((i) => ne(i.toString())).join("|")})$` : "^[^\\s\\S]$"), e._zod.parse = (i, s) => {
    const a = i.value;
    return r.has(a) || i.issues.push({
      code: "invalid_value",
      values: n,
      input: a,
      inst: e
    }), i;
  };
}), di = /* @__PURE__ */ d("$ZodLiteral", (e, t) => {
  z.init(e, t);
  const n = new Set(t.values);
  e._zod.values = n, e._zod.pattern = new RegExp(t.values.length ? `^(${t.values.map((r) => typeof r == "string" ? ne(r) : r ? ne(r.toString()) : String(r)).join("|")})$` : "^[^\\s\\S]$"), e._zod.parse = (r, o) => {
    const i = r.value;
    return n.has(i) || r.issues.push({
      code: "invalid_value",
      values: t.values,
      input: i,
      inst: e
    }), r;
  };
}), pi = /* @__PURE__ */ d("$ZodTransform", (e, t) => {
  z.init(e, t), e._zod.optin = "optional", j.memoizer?.guard(e), e._zod.parse = (n, r) => {
    if (r.direction === "backward")
      throw new en(e.constructor.name);
    const o = t.transform(n.value, n);
    if (r.async)
      return (o instanceof Promise ? o : Promise.resolve(o)).then((s) => (n.value = s, n));
    if (o instanceof Promise)
      throw new ee();
    return n.value = o, n;
  };
});
function vt(e, t) {
  return e.value = t.issues.length ? void 0 : t.value, e;
}
const yn = /* @__PURE__ */ d("$ZodOptional", (e, t) => {
  z.init(e, t), w(e, "optin", (n) => n.def.innerType._zod.optin === "defaulted" ? "defaulted" : "optional"), e._zod.optout = "optional", w(e, "values", (n) => {
    const r = n.def.innerType._zod.values;
    return r ? /* @__PURE__ */ new Set([...r, void 0]) : void 0;
  }), w(e, "pattern", (n) => {
    const r = n.def.innerType._zod.pattern;
    return r ? new RegExp(`^(${He(r.source)})?$`) : void 0;
  }), e._zod.parse = (n, r) => {
    if (n.value === void 0) {
      if (t.innerType._zod.optin !== "defaulted")
        return n;
      const o = t.innerType._zod.run({ value: n.value, issues: [] }, r);
      return o instanceof Promise ? o.then((i) => vt(n, i)) : vt(n, o);
    }
    return t.innerType._zod.run(n, r);
  };
}), hi = /* @__PURE__ */ d("$ZodExactOptional", (e, t) => {
  yn.init(e, t), w(e, "values", (n) => n.def.innerType._zod.values), w(e, "pattern", (n) => n.def.innerType._zod.pattern), e._zod.parse = (n, r) => t.innerType._zod.run(n, r);
}), mi = /* @__PURE__ */ d("$ZodNullable", (e, t) => {
  z.init(e, t), w(e, "optin", (n) => n.def.innerType._zod.optin), w(e, "optout", (n) => n.def.innerType._zod.optout), w(e, "pattern", (n) => {
    const r = n.def.innerType._zod.pattern;
    return r ? new RegExp(`^(${He(r.source)}|null)$`) : void 0;
  }), w(e, "values", (n) => n.def.innerType._zod.values ? /* @__PURE__ */ new Set([...n.def.innerType._zod.values, null]) : void 0), e._zod.parse = (n, r) => n.value === null ? n : t.innerType._zod.run(n, r);
}), gi = /* @__PURE__ */ d("$ZodDefault", (e, t) => {
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
const _i = /* @__PURE__ */ d("$ZodPrefault", (e, t) => {
  z.init(e, t), e._zod.optin = "defaulted", w(e, "values", (n) => n.def.innerType._zod.values), e._zod.parse = (n, r) => (r.direction === "backward" || n.value === void 0 && (n.value = t.defaultValue), t.innerType._zod.run(n, r));
}), yi = /* @__PURE__ */ d("$ZodNonOptional", (e, t) => {
  z.init(e, t), w(e, "values", (n) => {
    const r = n.def.innerType._zod.values;
    return r ? new Set([...r].filter((o) => o !== void 0)) : void 0;
  }), e._zod.parse = (n, r) => {
    const o = t.innerType._zod.run(n, r);
    return o instanceof Promise ? o.then((i) => St(i, e)) : St(o, e);
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
function zt(e, t, n, r) {
  return t.issues.length ? (e.value = n.catchValue({
    ...t,
    value: e.value,
    error: {
      issues: t.issues.map((o) => K(o, r, F()))
    },
    input: e.value
  }), e) : (e.value = t.value, t.memo && (e.memo = !0), e);
}
const bi = /* @__PURE__ */ d("$ZodCatch", (e, t) => {
  z.init(e, t), w(e, "optin", (n) => n.def.innerType._zod.optin === "defaulted" ? "defaulted" : "optional"), w(e, "optout", (n) => n.def.innerType._zod.optout), w(e, "values", (n) => n.def.innerType._zod.values), e._zod.parse = (n, r) => {
    if (r.direction === "backward")
      return t.innerType._zod.run(n, r);
    const o = t.innerType._zod.run({ value: n.value, issues: [] }, r);
    return o instanceof Promise ? o.then((i) => zt(n, i, t, r)) : zt(n, o, t, r);
  };
}), wi = /* @__PURE__ */ d("$ZodPipe", (e, t) => {
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
const vi = /* @__PURE__ */ d("$ZodReadonly", (e, t) => {
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
const ki = /* @__PURE__ */ d("$ZodCustom", (e, t) => {
  Z.init(e, t), z.init(e, t), e._zod.parse = (n, r) => n, e._zod.check = (n) => {
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
class Si extends Error {
  constructor() {
    super("Cannot parse a reference cycle that closes through a transform"), this.name = "ZodCyclicError";
  }
}
const Le = "~memo", $t = [];
function Re(e) {
  return e.map((t) => t.path ? { ...t, path: t.path.slice() } : { ...t });
}
const Tt = /* @__PURE__ */ new WeakMap();
function bn(e, t) {
  const n = Tt.get(e);
  if (n !== void 0)
    return n;
  if (t.has(e))
    return !0;
  t.add(e);
  let r = !1;
  const o = (a) => {
    !r && a?._zod && bn(a, t) && (r = !0);
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
function zi(e, t) {
  let n = e.buckets.get(t);
  return n || (n = /* @__PURE__ */ new Map(), e.buckets.set(t, n)), n;
}
let de;
const pe = [], Oi = {
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
        if (i.direction !== "backward" && $i(i, o.value))
          throw new Si();
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
        if (n === void 0 && (n = bn(e, /* @__PURE__ */ new Set()), !n))
          return e._zod.parse = i, e._zod.run === s && (e._zod.run = i), i(a, c);
        const u = a.value;
        if (u === null || typeof u != "object")
          return i(a, c);
        let l = c[Le];
        l || (l = { buckets: /* @__PURE__ */ new Map(), backEdges: void 0 }, c[Le] = l);
        let f;
        r === c ? f = o : (f = zi(l, e), r = c, o = f);
        const p = f.get(u);
        if (p)
          return a.value = p.value, p.issues ? p.issues.length && a.issues.push(...Re(p.issues)) : (a.memo = !0, l.backEdges ?? (l.backEdges = /* @__PURE__ */ new Set()), l.backEdges.add(p.value)), a;
        de = f;
        const h = pe.length, m = i(a, c);
        de = void 0;
        const y = pe.length > h ? pe.pop() : void 0;
        return m instanceof Promise ? m.then((_) => (y && (y.issues = _.issues.length ? Re(_.issues) : $t), _)) : (y && (y.issues = m.issues.length ? Re(m.issues) : $t), m);
      };
      e._zod.parse = s, e._zod.run === i && (e._zod.run = s);
    });
  }
};
function Ei() {
  return Oi;
}
function $i(e, t) {
  const n = e[Le]?.backEdges;
  return n !== void 0 && t !== null && typeof t == "object" && n.has(t);
}
const Ti = () => {
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
        const s = o(i.expected), a = ur(i.input), c = o(a, i.input);
        return `Invalid input: expected ${s}, received ${c}`;
      }
      case "invalid_value":
        return i.values.length === 1 ? `Invalid input: expected ${Xt(i.values[0])}` : `Invalid option: expected one of ${ut(i.values, "|")}`;
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
function Ii() {
  return {
    localeError: Ti()
  };
}
var It;
class Pi {
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
function Ni() {
  return new Pi();
}
(It = globalThis).__zod_globalRegistry ?? (It.__zod_globalRegistry = Ni());
const se = globalThis.__zod_globalRegistry;
// @__NO_SIDE_EFFECTS__
function Ai(e, t) {
  return new e({
    type: "string",
    ...g(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Zi(e, t) {
  return new e({
    type: "string",
    format: "email",
    check: "string_format",
    abort: !1,
    ...g(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Di(e, t) {
  return new e({
    type: "string",
    format: "guid",
    check: "string_format",
    abort: !1,
    ...g(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Ci(e, t) {
  return new e({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
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
    version: "v4",
    ...g(t)
  });
}
// @__NO_SIDE_EFFECTS__
function ji(e, t) {
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
function xi(e, t) {
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
function Mi(e, t) {
  return new e({
    type: "string",
    format: "url",
    check: "string_format",
    abort: !1,
    ...g(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Ui(e, t) {
  return new e({
    type: "string",
    format: "emoji",
    check: "string_format",
    abort: !1,
    ...g(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Fi(e, t) {
  return new e({
    type: "string",
    format: "nanoid",
    check: "string_format",
    abort: !1,
    ...g(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Li(e, t) {
  return new e({
    type: "string",
    format: "cuid",
    check: "string_format",
    abort: !1,
    ...g(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Bi(e, t) {
  return new e({
    type: "string",
    format: "cuid2",
    check: "string_format",
    abort: !1,
    ...g(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Ji(e, t) {
  return new e({
    type: "string",
    format: "ulid",
    check: "string_format",
    abort: !1,
    ...g(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Ki(e, t) {
  return new e({
    type: "string",
    format: "xid",
    check: "string_format",
    abort: !1,
    ...g(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Wi(e, t) {
  return new e({
    type: "string",
    format: "ksuid",
    check: "string_format",
    abort: !1,
    ...g(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Vi(e, t) {
  return new e({
    type: "string",
    format: "ipv4",
    check: "string_format",
    abort: !1,
    ...g(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Hi(e, t) {
  return new e({
    type: "string",
    format: "ipv6",
    check: "string_format",
    abort: !1,
    ...g(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Gi(e, t) {
  return new e({
    type: "string",
    format: "cidrv4",
    check: "string_format",
    abort: !1,
    ...g(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Yi(e, t) {
  return new e({
    type: "string",
    format: "cidrv6",
    check: "string_format",
    abort: !1,
    ...g(t)
  });
}
// @__NO_SIDE_EFFECTS__
function qi(e, t) {
  return new e({
    type: "string",
    format: "base64",
    check: "string_format",
    abort: !1,
    ...g(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Xi(e, t) {
  return new e({
    type: "string",
    format: "base64url",
    check: "string_format",
    abort: !1,
    ...g(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Qi(e, t) {
  return new e({
    type: "string",
    format: "e164",
    check: "string_format",
    abort: !1,
    ...g(t)
  });
}
// @__NO_SIDE_EFFECTS__
function es(e, t) {
  return new e({
    type: "string",
    format: "jwt",
    check: "string_format",
    abort: !1,
    ...g(t)
  });
}
// @__NO_SIDE_EFFECTS__
function ts(e, t) {
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
function ns(e, t) {
  return new e({
    type: "string",
    format: "date",
    check: "string_format",
    ...g(t)
  });
}
// @__NO_SIDE_EFFECTS__
function rs(e, t) {
  return new e({
    type: "string",
    format: "time",
    check: "string_format",
    precision: null,
    ...g(t)
  });
}
// @__NO_SIDE_EFFECTS__
function os(e, t) {
  return new e({
    type: "string",
    format: "duration",
    check: "string_format",
    ...g(t)
  });
}
// @__NO_SIDE_EFFECTS__
function is(e, t) {
  return new e({
    type: "number",
    checks: [],
    ...g(t)
  });
}
// @__NO_SIDE_EFFECTS__
function ss(e, t) {
  return new e({
    type: "number",
    check: "number_format",
    abort: !1,
    format: "safeint",
    ...g(t)
  });
}
// @__NO_SIDE_EFFECTS__
function as(e, t) {
  return new e({
    type: "boolean",
    ...g(t)
  });
}
// @__NO_SIDE_EFFECTS__
function cs(e) {
  return new e({
    type: "unknown"
  });
}
// @__NO_SIDE_EFFECTS__
function us(e, t) {
  return new e({
    type: "never",
    ...g(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Pt(e, t) {
  return new cn({
    check: "less_than",
    ...g(t),
    value: e,
    inclusive: !1
  });
}
// @__NO_SIDE_EFFECTS__
function je(e, t) {
  return new cn({
    check: "less_than",
    ...g(t),
    value: e,
    inclusive: !0
  });
}
// @__NO_SIDE_EFFECTS__
function Nt(e, t) {
  return new un({
    check: "greater_than",
    ...g(t),
    value: e,
    inclusive: !1
  });
}
// @__NO_SIDE_EFFECTS__
function xe(e, t) {
  return new un({
    check: "greater_than",
    ...g(t),
    value: e,
    inclusive: !0
  });
}
// @__NO_SIDE_EFFECTS__
function At(e, t) {
  return new ao({
    check: "multiple_of",
    ...g(t),
    value: e
  });
}
// @__NO_SIDE_EFFECTS__
function wn(e, t) {
  return new uo({
    check: "max_length",
    ...g(t),
    maximum: e
  });
}
// @__NO_SIDE_EFFECTS__
function ve(e, t) {
  return new lo({
    check: "min_length",
    ...g(t),
    minimum: e
  });
}
// @__NO_SIDE_EFFECTS__
function vn(e, t) {
  return new fo({
    check: "length_equals",
    ...g(t),
    length: e
  });
}
// @__NO_SIDE_EFFECTS__
function ls(e, t) {
  return new po({
    check: "string_format",
    format: "regex",
    ...g(t),
    pattern: e
  });
}
// @__NO_SIDE_EFFECTS__
function fs(e) {
  return new ho({
    check: "string_format",
    format: "lowercase",
    ...g(e)
  });
}
// @__NO_SIDE_EFFECTS__
function ds(e) {
  return new mo({
    check: "string_format",
    format: "uppercase",
    ...g(e)
  });
}
// @__NO_SIDE_EFFECTS__
function ps(e, t) {
  return new go({
    check: "string_format",
    format: "includes",
    ...g(t),
    includes: e
  });
}
// @__NO_SIDE_EFFECTS__
function hs(e, t) {
  return new _o({
    check: "string_format",
    format: "starts_with",
    ...g(t),
    prefix: e
  });
}
// @__NO_SIDE_EFFECTS__
function ms(e, t) {
  return new yo({
    check: "string_format",
    format: "ends_with",
    ...g(t),
    suffix: e
  });
}
// @__NO_SIDE_EFFECTS__
function oe(e) {
  return new bo({
    check: "overwrite",
    tx: e
  });
}
// @__NO_SIDE_EFFECTS__
function gs(e) {
  return /* @__PURE__ */ oe((t) => t.normalize(e));
}
// @__NO_SIDE_EFFECTS__
function _s() {
  return /* @__PURE__ */ oe((e) => e.trim());
}
// @__NO_SIDE_EFFECTS__
function ys() {
  return /* @__PURE__ */ oe((e) => e.toLowerCase());
}
// @__NO_SIDE_EFFECTS__
function bs() {
  return /* @__PURE__ */ oe((e) => e.toUpperCase());
}
// @__NO_SIDE_EFFECTS__
function ws() {
  return /* @__PURE__ */ oe((e) => Yn(e));
}
// @__NO_SIDE_EFFECTS__
function vs(e, t, n) {
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
function ks(e, t, n) {
  return new e({
    type: "custom",
    check: "custom",
    fn: t,
    ...g(n)
  });
}
// @__NO_SIDE_EFFECTS__
function Ss(e, t) {
  const n = /* @__PURE__ */ zs((r) => (r.addIssue = (o) => {
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
function zs(e, t) {
  const n = new Z({
    check: "custom",
    ...g(t)
  });
  return n._zod.check = e, n;
}
function ae(e, ...t) {
  for (const n of t)
    for (const r of Reflect.ownKeys(n))
      Object.prototype.propertyIsEnumerable.call(n, r) && A(e, r, n[r]);
  return e;
}
function kn(e) {
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
function W(e, t, n, r, o) {
  const i = typeof t.unrepresentable == "function" ? t.unrepresentable({ zodSchema: e, path: r.path, message: o }) : t.unrepresentable;
  if (i === "any")
    return !1;
  if (i === void 0 || i === "throw")
    throw new Error(o);
  return Object.assign(n, i), !0;
}
function $(e, t, n = { path: [], schemaPath: [] }) {
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
    const f = e._zod.parent;
    f && (s.ref || (s.ref = f), $(f, t, l), t.seen.get(f).isParent = !0);
  }
  const c = t.metadataRegistry.get(e);
  return c && ae(s.schema, c), t.io === "input" && P(e) && (delete s.schema.examples, delete s.schema.default), t.io === "input" && "_prefault" in s.schema && ((r = s.schema).default ?? (r.default = s.schema._prefault)), delete s.schema._prefault, t.seen.get(e).schema;
}
function Zt(e) {
  return e.replace(/~/g, "~0").replace(/\//g, "~1");
}
function Sn(e, t) {
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
      const f = e.external.registry.get(s[0])?.id, p = e.external.uri ?? ((m) => m);
      if (f)
        return { ref: p(f) };
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
    for (const f in l)
      delete l[f];
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
const On = /* @__PURE__ */ new Set(["type", "properties", "required", "additionalProperties"]), Dt = ["oneOf", "anyOf"];
function Ct(e) {
  const t = e.additionalProperties;
  return t === void 0 || t === !1 || typeof t != "object" || t === null ? null : Object.keys(t).length ? t : null;
}
function Be(e) {
  const t = [];
  for (const i of e) {
    if (typeof i != "object" || i.type !== "object")
      return null;
    for (const s in i)
      if (!On.has(s))
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
        const l = u.properties?.[s] ?? Ct(u);
        l != null && (a.some((f) => JSON.stringify(f) === JSON.stringify(l)) || a.push(l));
      }
      const c = a.length === 1 ? a[0] : Be(a) ?? { allOf: a };
      A(n, s, c);
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
      const a = Ct(s);
      a && !i.some((c) => JSON.stringify(c) === JSON.stringify(a)) && i.push(a);
    }
    i.length === 1 ? o.additionalProperties = i[0] : i.length > 1 && (o.additionalProperties = { allOf: i });
  }
  return o;
}
function Os(e) {
  const t = e.allOf;
  if (!Array.isArray(t) || t.length < 2)
    return;
  for (const o of On)
    if (o in e)
      return;
  const n = t.filter((o) => Dt.some((i) => Array.isArray(o[i])));
  let r = null;
  if (!n.length)
    r = Be(t);
  else {
    const o = n[0], i = Dt.find((c) => Array.isArray(o[c]));
    if (Object.keys(o).length !== 1)
      return;
    const s = t.filter((c) => c !== o), a = o[i].map((c) => Be([...s, c]));
    if (a.some((c) => !c))
      return;
    r = { [i]: a };
  }
  r && (delete e.allOf, ae(e, r));
}
function En(e, t) {
  const n = e.seen.get(t);
  if (!n)
    throw new Error("Unprocessed schema. This is a bug in Zod.");
  const r = (a) => {
    const c = e.seen.get(a);
    if (c.ref === null)
      return;
    const u = c.def ?? c.schema, l = { ...u }, f = c.ref;
    if (c.ref = null, f) {
      r(f);
      const h = e.seen.get(f), m = h.schema;
      if (m.$ref && (e.target === "draft-07" || e.target === "draft-04" || e.target === "openapi-3.0") ? (u.allOf = u.allOf ?? [], u.allOf.push(m)) : ae(u, m), ae(u, l), a._zod.parent === f)
        for (const _ in u)
          _ === "$ref" || _ === "allOf" || _ in l || delete u[_];
      if (m.$ref && h.def)
        for (const _ in u)
          _ === "$ref" || _ === "allOf" || _ in h.def && JSON.stringify(u[_]) === JSON.stringify(h.def[_]) && delete u[_];
    }
    const p = a._zod.parent;
    if (p && p !== f) {
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
          const f = a.get(l);
          f ? f.push(u) : a.set(l, [u]);
        }
      for (const c of e.intersections)
        for (const u of a.get(c) ?? [])
          Os(u);
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
      c.def && c.defId && (c.def.id === c.defId && delete c.def.id, A(s, c.defId, c.def));
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
    for (const o in r.shape)
      if (P(r.shape[o], n))
        return !0;
    return !1;
  }
  if (r.type === "union") {
    for (const o of r.options)
      if (P(o, n))
        return !0;
    return !1;
  }
  if (r.type === "tuple") {
    for (const o of r.items)
      if (P(o, n))
        return !0;
    return !!(r.rest && P(r.rest, n));
  }
  return !1;
}
const Es = (e, t = {}) => (n) => {
  const r = kn({ ...n, processors: t });
  return $(e, r), Sn(r, e), En(r, e);
}, ke = (e, t, n = {}) => (r) => {
  const { libraryOptions: o, target: i } = r ?? {}, s = kn({ ...o ?? {}, target: i, io: t, processors: n });
  return $(e, s), Sn(s, e), En(s, e);
}, $s = {
  guid: "uuid",
  url: "uri",
  datetime: "date-time",
  json_string: "json-string",
  regex: ""
  // do not set
}, Ts = (e, t, n, r) => {
  const o = n;
  o.type = "string";
  const { minimum: i, maximum: s, format: a, patterns: c, contentEncoding: u, laxFormat: l } = e._zod.bag;
  if (typeof i == "number" && (o.minLength = i), typeof s == "number" && (o.maxLength = s), a && (o.format = $s[a] ?? a, o.format === "" && delete o.format, (a === "time" || l) && delete o.format), u && (o.contentEncoding = u), c && c.size > 0) {
    const f = [...c];
    f.length === 1 ? o.pattern = f[0].source : f.length > 1 && (o.allOf = [
      ...f.map((p) => ({
        ...t.target === "draft-07" || t.target === "draft-04" || t.target === "openapi-3.0" ? { type: "string" } : {},
        pattern: p.source
      }))
    ]);
  }
}, Is = (e, t, n, r) => {
  const o = n, { minimum: i, maximum: s, format: a, multipleOf: c, exclusiveMaximum: u, exclusiveMinimum: l } = e._zod.bag;
  typeof a == "string" && a.includes("int") ? o.type = "integer" : o.type = "number";
  const f = typeof l == "number" && l >= (i ?? Number.NEGATIVE_INFINITY), p = typeof u == "number" && u <= (s ?? Number.POSITIVE_INFINITY), h = t.target === "draft-04" || t.target === "openapi-3.0";
  f ? h ? (o.minimum = l, o.exclusiveMinimum = !0) : o.exclusiveMinimum = l : typeof i == "number" && (o.minimum = i), p ? h ? (o.maximum = u, o.exclusiveMaximum = !0) : o.exclusiveMaximum = u : typeof s == "number" && (o.maximum = s), typeof c == "number" && (Number.isFinite(c) && c !== 0 ? o.multipleOf = Math.abs(c) : W(e, t, o, r, `A multipleOf divisor of ${c} cannot be represented in JSON Schema`));
}, Ps = (e, t, n, r) => {
  n.type = "boolean";
}, Ns = (e, t, n, r) => {
  n.not = {};
}, As = (e, t, n, r) => {
}, Zs = (e, t, n, r) => {
  const o = e._zod.def, i = Gt(o.entries);
  if (i.length === 0) {
    n.not = {};
    return;
  }
  i.every((s) => typeof s == "number") && (n.type = "number"), i.every((s) => typeof s == "string") && (n.type = "string"), n.enum = i;
}, Ds = (e, t, n, r) => {
  const o = e._zod.def;
  if (o.values.length === 0) {
    n.not = {};
    return;
  }
  const i = [];
  for (const s of o.values)
    if (s === void 0) {
      if (W(e, t, n, r, "Literal `undefined` cannot be represented in JSON Schema"))
        return;
    } else if (typeof s == "bigint") {
      if (W(e, t, n, r, "BigInt literals cannot be represented in JSON Schema"))
        return;
      i.push(Number(s));
    } else
      i.push(s);
  if (i.length !== 0) if (i.length === 1) {
    const s = i[0];
    n.type = s === null ? "null" : typeof s, t.target === "draft-04" || t.target === "openapi-3.0" ? n.enum = [s] : n.const = s;
  } else
    i.every((s) => typeof s == "number") && (n.type = "number"), i.every((s) => typeof s == "string") && (n.type = "string"), i.every((s) => typeof s == "boolean") && (n.type = "boolean"), i.every((s) => s === null) && (n.type = "null"), n.enum = i;
}, Cs = (e, t, n, r) => {
  W(e, t, n, r, "Custom types cannot be represented in JSON Schema");
}, Rs = (e, t, n, r) => {
  W(e, t, n, r, "Transforms cannot be represented in JSON Schema");
}, js = (e, t, n, r) => {
  const o = n, i = e._zod.def, { minimum: s, maximum: a } = e._zod.bag;
  typeof s == "number" && (o.minItems = s), typeof a == "number" && (o.maxItems = a), o.type = "array", o.items = $(i.element, t, {
    ...r,
    path: [...r.path, "items"]
  });
};
function Se(e) {
  const t = e._zod.def;
  return t.type === "pipe" && t.in._zod.traits.has("$ZodTransform") ? Se(t.out) : t.type === "catch" ? Se(t.innerType) : e._zod.optin;
}
const xs = (e, t, n, r) => {
  const o = n, i = e._zod.def, s = i.shape;
  if (Object.getOwnPropertySymbols(s).length && W(e, t, o, r, "Symbol keys cannot be represented in JSON Schema"))
    return;
  o.type = "object", o.properties = {};
  for (const l in s)
    A(o.properties, l, $(s[l], t, {
      ...r,
      path: [...r.path, "properties", l]
    }));
  const c = new Set(Object.keys(s)), u = new Set([...c].filter((l) => {
    const f = i.shape[l];
    return t.io === "input" ? Se(f) === void 0 : f._zod.optout === void 0;
  }));
  u.size > 0 && (o.required = Array.from(u)), i.catchall?._zod.def.type === "never" ? o.additionalProperties = !1 : i.catchall ? i.catchall && (o.additionalProperties = $(i.catchall, t, {
    ...r,
    path: [...r.path, "additionalProperties"]
  })) : t.io === "output" && (o.additionalProperties = !1);
}, Ms = (e, t, n, r) => {
  const o = e._zod.def, i = o.inclusive === !1, s = o.options.map((a, c) => $(a, t, {
    ...r,
    path: [...r.path, i ? "oneOf" : "anyOf", c]
  }));
  i ? n.oneOf = s : n.anyOf = s;
}, Us = (e, t, n, r) => {
  const o = e._zod.def, i = $(o.left, t, {
    ...r,
    path: [...r.path, "allOf", 0]
  }), s = $(o.right, t, {
    ...r,
    path: [...r.path, "allOf", 1]
  }), a = (u) => "allOf" in u && Object.keys(u).length === 1, c = [
    ...a(i) ? i.allOf : [i],
    ...a(s) ? s.allOf : [s]
  ];
  n.allOf = c, t.intersections.push(c);
};
function Je(e, t, n) {
  if (t.$ref) {
    if (n.has(t))
      return t;
    n.add(t);
    const m = e.get(t)?.def;
    if (!m)
      return t;
    const y = Je(e, m, n);
    return y === m ? t : y;
  }
  for (const m of ["anyOf", "oneOf"]) {
    const y = t[m];
    if (!Array.isArray(y))
      continue;
    const _ = y.map((v) => Je(e, v, n));
    _.some((v, I) => v !== y[I]) && (t = { ...t, [m]: _ });
  }
  const r = Array.isArray(t.type) ? t.type : [t.type], o = !r.includes("string") && r.some((m) => m === "number" || m === "integer"), i = t.enum ?? (t.const !== void 0 ? [t.const] : void 0);
  if (!o && !i?.some((m) => typeof m == "number"))
    return t;
  const { minimum: s, maximum: a, exclusiveMinimum: c, exclusiveMaximum: u, multipleOf: l, format: f, id: p, ...h } = t;
  return h.enum ? h.enum = h.enum.map((m) => typeof m == "number" ? String(m) : m) : typeof h.const == "number" && (h.const = String(h.const)), o && (h.type = "string", i || (h.pattern = (r.includes("number") ? Qe : an).source)), h;
}
const Ke = /* @__PURE__ */ new WeakMap();
function Fs(e) {
  const t = /* @__PURE__ */ new Map();
  for (const r of e.seen.values())
    r.def && !t.has(r.schema) && t.set(r.schema, r);
  const n = /* @__PURE__ */ new Map();
  for (const r of Ke.get(e) ?? []) {
    const o = e.seen.get(r), i = (o?.def ?? o?.schema)?.propertyNames;
    if (!i || i === !0 || n.has(i))
      continue;
    const s = Je(t, i, /* @__PURE__ */ new Set());
    s !== i && n.set(i, s);
  }
  if (n.size)
    for (const r of e.seen.values())
      for (const o of [r.schema, r.def]) {
        const i = o && n.get(o.propertyNames);
        i && (o.propertyNames = i);
      }
}
const Ls = (e, t, n, r) => {
  const o = n, i = e._zod.def;
  o.type = "object";
  const s = i.keyType, c = s._zod.bag?.patterns;
  if (i.mode === "loose" && c && c.size > 0) {
    const f = $(i.valueType, t, {
      ...r,
      path: [...r.path, "patternProperties", "*"]
    });
    o.patternProperties = {};
    for (const p of c)
      A(o.patternProperties, p.source, f);
  } else {
    if (t.target === "draft-07" || t.target === "draft-2020-12") {
      o.propertyNames = $(i.keyType, t, {
        ...r,
        path: [...r.path, "propertyNames"]
      });
      let f = Ke.get(t);
      f || (f = [], Ke.set(t, f), t.deferred.push(() => Fs(t))), f.push(e);
    }
    o.additionalProperties = $(i.valueType, t, {
      ...r,
      path: [...r.path, "additionalProperties"]
    });
  }
  const u = s._zod.values, l = t.io === "input" && Se(i.valueType) !== void 0;
  if (u && !i.partial && !l) {
    const f = [...u].filter((p) => typeof p == "string" || typeof p == "number");
    f.length > 0 && (o.required = f.map(String));
  }
}, Bs = (e, t, n, r) => {
  const o = e._zod.def, i = $(o.innerType, t, r), s = t.seen.get(e);
  t.target === "openapi-3.0" ? (s.ref = o.innerType, n.nullable = !0) : n.anyOf = [i, { type: "null" }];
}, Js = (e, t, n, r) => {
  const o = e._zod.def;
  $(o.innerType, t, r);
  const i = t.seen.get(e);
  i.ref = o.innerType;
}, nt = /* @__PURE__ */ Symbol();
function $n(e, t, n, r, o) {
  let i = !1;
  const s = JSON.stringify(e, (a, c) => typeof c != "bigint" ? c : (i = !0, null));
  return i ? (W(t, n, r, o, "BigInt defaults cannot be represented in JSON Schema"), nt) : JSON.parse(s);
}
const Ks = (e, t, n, r) => {
  const o = e._zod.def;
  $(o.innerType, t, r);
  const i = t.seen.get(e);
  i.ref = o.innerType;
  const s = $n(o.defaultValue, e, t, n, r);
  s !== nt && (n.default = s);
}, Ws = (e, t, n, r) => {
  const o = e._zod.def;
  $(o.innerType, t, r);
  const i = t.seen.get(e);
  if (i.ref = o.innerType, t.io !== "input")
    return;
  const s = $n(o.defaultValue, e, t, n, r);
  s !== nt && (n._prefault = s);
}, Vs = (e, t, n, r) => {
  const o = e._zod.def;
  $(o.innerType, t, r);
  const i = t.seen.get(e);
  i.ref = o.innerType;
  let s;
  try {
    s = o.catchValue(void 0);
  } catch {
    W(e, t, n, r, "Dynamic catch values are not supported in JSON Schema");
    return;
  }
  n.default = s;
}, Hs = (e, t, n, r) => {
  const o = e._zod.def, i = o.in._zod.traits.has("$ZodTransform"), s = t.io === "input" ? i ? o.out : o.in : o.out;
  $(s, t, r);
  const a = t.seen.get(e);
  a.ref = s;
}, Gs = (e, t, n, r) => {
  const o = e._zod.def;
  $(o.innerType, t, r);
  const i = t.seen.get(e);
  i.ref = o.innerType, n.readOnly = !0;
}, Tn = (e, t, n, r) => {
  const o = e._zod.def;
  $(o.innerType, t, r);
  const i = t.seen.get(e);
  i.ref = o.innerType;
}, Rt = /* @__PURE__ */ new WeakSet([Object.prototype, Error.prototype]);
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
const In = (e, t) => {
  nn.init(e, t), e.name = "ZodError";
  const n = Object.getPrototypeOf(e);
  Rt.has(n) || (Rt.add(n), he(n, "format", (r) => (o) => Sr(r, o)), he(n, "flatten", (r) => (o) => kr(r, o)), he(n, "addIssue", (r) => (o) => {
    r.issues.push(o), r.message = JSON.stringify(r.issues, Me, 2);
  }), he(n, "addIssues", (r) => (o) => {
    r.issues.push(...o), r.message = JSON.stringify(r.issues, Me, 2);
  }), Object.defineProperty(n, "isEmpty", {
    configurable: !0,
    enumerable: !1,
    get() {
      return this.issues.length === 0;
    }
  }));
}, Pn = /* @__PURE__ */ d("ZodError", In), R = /* @__PURE__ */ d("ZodError", In, void 0, {
  Parent: Error
}), Ys = /* @__PURE__ */ qe(R), qs = /* @__PURE__ */ Xe(R), Xs = /* @__PURE__ */ $e(R), Qs = /* @__PURE__ */ Te(R), ea = /* @__PURE__ */ Er(R), ta = /* @__PURE__ */ $r(R), na = /* @__PURE__ */ Tr(R), ra = /* @__PURE__ */ Ir(R), oa = /* @__PURE__ */ Pr(R), ia = /* @__PURE__ */ Nr(R), sa = /* @__PURE__ */ Ar(R), aa = /* @__PURE__ */ Zr(R);
function ca() {
  j.localeError || F(Ii());
}
function Pe() {
  j.memoizer || F({ memoizer: Ei() });
}
const O = /* @__PURE__ */ d("ZodType", (e, t) => (ca(), z.init(e, t), e.def = t, e.type = t.type, e), {
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
    return H(this, e, t);
  },
  brand() {
    return this;
  },
  register(e, t) {
    return e.add(this, t), this;
  },
  refine(e, t) {
    return this.check(uc(e, t));
  },
  superRefine(e, t) {
    return this.check(lc(e, t));
  },
  overwrite(e) {
    return this.check(/* @__PURE__ */ oe(e));
  },
  optional() {
    return Mt(this);
  },
  exactOptional() {
    return Ya(this);
  },
  nullable() {
    return Ut(this);
  },
  nullish() {
    return Mt(Ut(this));
  },
  nonoptional(e) {
    return nc(this, e);
  },
  array() {
    return Y(this);
  },
  or(e) {
    return Fa([this, e]);
  },
  and(e) {
    return Ba(this, e);
  },
  transform(e) {
    return Ft(this, Ga(e));
  },
  default(e) {
    return Qa(this, e);
  },
  prefault(e) {
    return tc(this, e);
  },
  catch(e) {
    return oc(this, e);
  },
  pipe(e) {
    return Ft(this, e);
  },
  readonly() {
    return ac(this);
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
    return Qt(this, "~standard", {
      ...ln(this),
      jsonSchema: {
        input: ke(this, "input"),
        output: ke(this, "output")
      }
    });
  },
  set "~standard"(e) {
    re(this, "~standard", e);
  },
  parse: function e(t, n) {
    return Ys(this, t, n, { callee: e });
  },
  parseAsync: async function e(t, n) {
    return await qs(this, t, n, { callee: e });
  },
  safeParse(e, t) {
    return Xs(this, e, t);
  },
  async safeParseAsync(e, t) {
    return Qs(this, e, t);
  },
  // `spa` is an alias: same function object as `safeParseAsync`, as before.
  get spa() {
    return this?.safeParseAsync;
  },
  set spa(e) {
    re(this, "spa", e);
  },
  encode: function e(t, n) {
    return ea(this, t, n, { callee: e });
  },
  decode: function e(t, n) {
    return ta(this, t, n, { callee: e });
  },
  encodeAsync: async function e(t, n) {
    return await na(this, t, n, { callee: e });
  },
  decodeAsync: async function e(t, n) {
    return await ra(this, t, n, { callee: e });
  },
  safeEncode(e, t) {
    return oa(this, e, t);
  },
  safeDecode(e, t) {
    return ia(this, e, t);
  },
  async safeEncodeAsync(e, t) {
    return sa(this, e, t);
  },
  async safeDecodeAsync(e, t) {
    return aa(this, e, t);
  },
  toJSONSchema(e) {
    return Es(this, {})(e);
  },
  // Reads through to the registry on every access, so it must not cache.
  get description() {
    return se.get(this)?.description;
  },
  // No setter: `schema._def = x` throws, as it did when `_def` was a non-writable own property.
  get _def() {
    return this._zod.def;
  }
}), Nn = /* @__PURE__ */ d("_ZodString", (e, t) => {
  tt.init(e, t), O.init(e, t), e._zod.processJSONSchema = (r, o, i) => Ts(e, r, o);
  const n = e._zod.bag;
  e.format = n.format ?? null, e.minLength = n.minimum ?? null, e.maxLength = n.maximum ?? null;
}, {
  regex(...e) {
    return this.check(/* @__PURE__ */ ls(...e));
  },
  includes(...e) {
    return this.check(/* @__PURE__ */ ps(...e));
  },
  startsWith(...e) {
    return this.check(/* @__PURE__ */ hs(...e));
  },
  endsWith(...e) {
    return this.check(/* @__PURE__ */ ms(...e));
  },
  min(...e) {
    return this.check(/* @__PURE__ */ ve(...e));
  },
  max(...e) {
    return this.check(/* @__PURE__ */ wn(...e));
  },
  length(...e) {
    return this.check(/* @__PURE__ */ vn(...e));
  },
  nonempty(...e) {
    return this.check(/* @__PURE__ */ ve(1, ...e));
  },
  lowercase(e) {
    return this.check(/* @__PURE__ */ fs(e));
  },
  uppercase(e) {
    return this.check(/* @__PURE__ */ ds(e));
  },
  trim() {
    return this.check(/* @__PURE__ */ _s());
  },
  normalize(...e) {
    return this.check(/* @__PURE__ */ gs(...e));
  },
  toLowerCase() {
    return this.check(/* @__PURE__ */ ys());
  },
  toUpperCase() {
    return this.check(/* @__PURE__ */ bs());
  },
  slugify() {
    return this.check(/* @__PURE__ */ ws());
  }
}), ua = /* @__PURE__ */ d("ZodString", (e, t) => {
  tt.init(e, t), Nn.init(e, t);
}, {
  email(e) {
    return this.check(/* @__PURE__ */ Zi(ha, e));
  },
  url(e) {
    return this.check(/* @__PURE__ */ Mi(ga, e));
  },
  jwt(e) {
    return this.check(/* @__PURE__ */ es(Na, e));
  },
  emoji(e) {
    return this.check(/* @__PURE__ */ Ui(_a, e));
  },
  guid(e) {
    return this.check(/* @__PURE__ */ Di(ma, e));
  },
  uuid(e) {
    return this.check(/* @__PURE__ */ Ci(me, e));
  },
  uuidv4(e) {
    return this.check(/* @__PURE__ */ Ri(me, e));
  },
  uuidv6(e) {
    return this.check(/* @__PURE__ */ ji(me, e));
  },
  uuidv7(e) {
    return this.check(/* @__PURE__ */ xi(me, e));
  },
  nanoid(e) {
    return this.check(/* @__PURE__ */ Fi(ya, e));
  },
  cuid(e) {
    return this.check(/* @__PURE__ */ Li(ba, e));
  },
  cuid2(e) {
    return this.check(/* @__PURE__ */ Bi(wa, e));
  },
  ulid(e) {
    return this.check(/* @__PURE__ */ Ji(va, e));
  },
  base64(e) {
    return this.check(/* @__PURE__ */ qi(Ta, e));
  },
  base64url(e) {
    return this.check(/* @__PURE__ */ Xi(Ia, e));
  },
  xid(e) {
    return this.check(/* @__PURE__ */ Ki(ka, e));
  },
  ksuid(e) {
    return this.check(/* @__PURE__ */ Wi(Sa, e));
  },
  ipv4(e) {
    return this.check(/* @__PURE__ */ Vi(za, e));
  },
  ipv6(e) {
    return this.check(/* @__PURE__ */ Hi(Oa, e));
  },
  cidrv4(e) {
    return this.check(/* @__PURE__ */ Gi(Ea, e));
  },
  cidrv6(e) {
    return this.check(/* @__PURE__ */ Yi($a, e));
  },
  e164(e) {
    return this.check(/* @__PURE__ */ Qi(Pa, e));
  },
  datetime(e) {
    return this.check(/* @__PURE__ */ ts(la, e));
  },
  date(e) {
    return this.check(/* @__PURE__ */ ns(fa, e));
  },
  time(e) {
    return this.check(/* @__PURE__ */ rs(da, e));
  },
  duration(e) {
    return this.check(/* @__PURE__ */ os(pa, e));
  }
});
function D(e) {
  return /* @__PURE__ */ Ai(ua, e);
}
const E = /* @__PURE__ */ d("ZodStringFormat", (e, t) => {
  S.init(e, t), Nn.init(e, t);
}), la = /* @__PURE__ */ d("ZodISODateTime", (e, t) => {
  xo.init(e, t), E.init(e, t);
}), fa = /* @__PURE__ */ d("ZodISODate", (e, t) => {
  Mo.init(e, t), E.init(e, t);
}), da = /* @__PURE__ */ d("ZodISOTime", (e, t) => {
  Uo.init(e, t), E.init(e, t);
}), pa = /* @__PURE__ */ d("ZodISODuration", (e, t) => {
  Fo.init(e, t), E.init(e, t);
}), ha = /* @__PURE__ */ d("ZodEmail", (e, t) => {
  zo.init(e, t), E.init(e, t);
}), ma = /* @__PURE__ */ d("ZodGUID", (e, t) => {
  ko.init(e, t), E.init(e, t);
}), me = /* @__PURE__ */ d("ZodUUID", (e, t) => {
  So.init(e, t), E.init(e, t);
}), ga = /* @__PURE__ */ d("ZodURL", (e, t) => {
  Po.init(e, t), E.init(e, t);
}), _a = /* @__PURE__ */ d("ZodEmoji", (e, t) => {
  No.init(e, t), E.init(e, t);
}), ya = /* @__PURE__ */ d("ZodNanoID", (e, t) => {
  Ao.init(e, t), E.init(e, t);
}), ba = /* @__PURE__ */ d("ZodCUID", (e, t) => {
  Zo.init(e, t), E.init(e, t);
}), wa = /* @__PURE__ */ d("ZodCUID2", (e, t) => {
  Do.init(e, t), E.init(e, t);
}), va = /* @__PURE__ */ d("ZodULID", (e, t) => {
  Co.init(e, t), E.init(e, t);
}), ka = /* @__PURE__ */ d("ZodXID", (e, t) => {
  Ro.init(e, t), E.init(e, t);
}), Sa = /* @__PURE__ */ d("ZodKSUID", (e, t) => {
  jo.init(e, t), E.init(e, t);
}), za = /* @__PURE__ */ d("ZodIPv4", (e, t) => {
  Lo.init(e, t), E.init(e, t);
}), Oa = /* @__PURE__ */ d("ZodIPv6", (e, t) => {
  Jo.init(e, t), E.init(e, t);
}), Ea = /* @__PURE__ */ d("ZodCIDRv4", (e, t) => {
  Ko.init(e, t), E.init(e, t);
}), $a = /* @__PURE__ */ d("ZodCIDRv6", (e, t) => {
  Vo.init(e, t), E.init(e, t);
}), Ta = /* @__PURE__ */ d("ZodBase64", (e, t) => {
  Ho.init(e, t), E.init(e, t);
}), Ia = /* @__PURE__ */ d("ZodBase64URL", (e, t) => {
  Yo.init(e, t), E.init(e, t);
}), Pa = /* @__PURE__ */ d("ZodE164", (e, t) => {
  qo.init(e, t), E.init(e, t);
}), Na = /* @__PURE__ */ d("ZodJWT", (e, t) => {
  Qo.init(e, t), E.init(e, t);
}), An = /* @__PURE__ */ d("ZodNumber", (e, t) => {
  mn.init(e, t), O.init(e, t), e._zod.processJSONSchema = (r, o, i) => Is(e, r, o, i);
  const n = e._zod.bag;
  e.minValue = Math.max(n.minimum ?? Number.NEGATIVE_INFINITY, n.exclusiveMinimum ?? Number.NEGATIVE_INFINITY) ?? null, e.maxValue = Math.min(n.maximum ?? Number.POSITIVE_INFINITY, n.exclusiveMaximum ?? Number.POSITIVE_INFINITY) ?? null, e.isInt = (n.format ?? "").includes("int") || Number.isSafeInteger(n.multipleOf ?? 0.5), e.isFinite = !0, e.format = n.format ?? null;
}, {
  gt(e, t) {
    return this.check(/* @__PURE__ */ Nt(e, t));
  },
  gte(e, t) {
    return this.check(/* @__PURE__ */ xe(e, t));
  },
  min(e, t) {
    return this.check(/* @__PURE__ */ xe(e, t));
  },
  lt(e, t) {
    return this.check(/* @__PURE__ */ Pt(e, t));
  },
  lte(e, t) {
    return this.check(/* @__PURE__ */ je(e, t));
  },
  max(e, t) {
    return this.check(/* @__PURE__ */ je(e, t));
  },
  int(e) {
    return this.check(jt(e));
  },
  safe(e) {
    return this.check(jt(e));
  },
  positive(e) {
    return this.check(/* @__PURE__ */ Nt(0, e));
  },
  nonnegative(e) {
    return this.check(/* @__PURE__ */ xe(0, e));
  },
  negative(e) {
    return this.check(/* @__PURE__ */ Pt(0, e));
  },
  nonpositive(e) {
    return this.check(/* @__PURE__ */ je(0, e));
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
function T(e) {
  return /* @__PURE__ */ is(An, e);
}
const Aa = /* @__PURE__ */ d("ZodNumberFormat", (e, t) => {
  ei.init(e, t), An.init(e, t);
});
function jt(e) {
  return /* @__PURE__ */ ss(Aa, e);
}
const Za = /* @__PURE__ */ d("ZodBoolean", (e, t) => {
  ti.init(e, t), O.init(e, t), e._zod.processJSONSchema = (n, r, o) => Ps(e, n, r);
});
function Da(e) {
  return /* @__PURE__ */ as(Za, e);
}
const Ca = /* @__PURE__ */ d("ZodUnknown", (e, t) => {
  ni.init(e, t), O.init(e, t), e._zod.processJSONSchema = (n, r, o) => As();
});
function xt() {
  return /* @__PURE__ */ cs(Ca);
}
const Ra = /* @__PURE__ */ d("ZodNever", (e, t) => {
  ri.init(e, t), O.init(e, t), e._zod.processJSONSchema = (n, r, o) => Ns(e, n, r);
});
function ja(e) {
  return /* @__PURE__ */ us(Ra, e);
}
const xa = /* @__PURE__ */ d("ZodArray", (e, t) => {
  Pe(), oi.init(e, t), O.init(e, t), e._zod.processJSONSchema = (n, r, o) => js(e, n, r, o), e.element = t.element;
}, {
  min(e, t) {
    return this.check(/* @__PURE__ */ ve(e, t));
  },
  nonempty(e) {
    return this.check(/* @__PURE__ */ ve(1, e));
  },
  max(e, t) {
    return this.check(/* @__PURE__ */ wn(e, t));
  },
  length(e, t) {
    return this.check(/* @__PURE__ */ vn(e, t));
  },
  unwrap() {
    return this.element;
  }
});
function Y(e, t) {
  return /* @__PURE__ */ vs(xa, e, t);
}
const Ma = /* @__PURE__ */ d("ZodObject", (e, t) => {
  Pe(), ai.init(e, t), O.init(e, t), e._zod.processJSONSchema = (n, r, o) => xs(e, n, r, o), hr(e, "shape", (n) => n._zod.def.shape, !1);
}, {
  keyof() {
    return C(Object.keys(this._zod.def.shape));
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
    return this.clone({ ...this._zod.def, catchall: ja() });
  },
  strip() {
    return this.clone({ ...this._zod.def, catchall: void 0 });
  },
  extend(e) {
    return rr(this, e);
  },
  safeExtend(e) {
    return or(this, e);
  },
  merge(e) {
    return ir(this, e);
  },
  pick(e) {
    return tr(this, e);
  },
  omit(e) {
    return nr(this, e);
  },
  partial(...e) {
    return lt(Zn, this, e[0]);
  },
  exactPartial(...e) {
    return lt(Dn, this, e[0], "exactPartial");
  },
  required(...e) {
    return sr(Cn, this, e[0]);
  }
});
function U(e, t) {
  const n = {
    type: "object",
    shape: e ?? {},
    ...g(t)
  };
  return new Ma(n);
}
const Ua = /* @__PURE__ */ d("ZodUnion", (e, t) => {
  ci.init(e, t), O.init(e, t), e._zod.processJSONSchema = (n, r, o) => Ms(e, n, r, o), e.options = t.options;
});
function Fa(e, t) {
  return new Ua({
    type: "union",
    options: e,
    ...g(t)
  });
}
const La = /* @__PURE__ */ d("ZodIntersection", (e, t) => {
  ui.init(e, t), O.init(e, t), e._zod.processJSONSchema = (n, r, o) => Us(e, n, r, o);
});
function Ba(e, t) {
  return new La({
    type: "intersection",
    left: e,
    right: t
  });
}
const Ja = /* @__PURE__ */ d("ZodRecord", (e, t) => {
  Pe(), li.init(e, t), O.init(e, t), e._zod.processJSONSchema = (n, r, o) => Ls(e, n, r, o), e.keyType = t.keyType, e.valueType = t.valueType;
});
function Ka(e, t, n) {
  return new Ja({
    type: "record",
    keyType: e,
    valueType: t,
    ...g(n),
    partial: !0
  });
}
const We = /* @__PURE__ */ d("ZodEnum", (e, t) => {
  fi.init(e, t), O.init(e, t), e._zod.processJSONSchema = (r, o, i) => Zs(e, r, o), e.enum = t.entries, e.options = Object.values(t.entries);
  const n = new Set(Object.keys(t.entries));
  e.extract = (r, o) => {
    const i = {};
    for (const s of r)
      if (n.has(s))
        i[s] = t.entries[s];
      else
        throw new Error(`Key ${s} not found in enum`);
    return new We({
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
    return new We({
      ...t,
      checks: [],
      ...g(o),
      entries: i
    });
  };
});
function C(e, t) {
  const n = Array.isArray(e) ? Object.fromEntries(e.map((r) => [r, r])) : e;
  return new We({
    type: "enum",
    entries: n,
    ...g(t)
  });
}
const Wa = /* @__PURE__ */ d("ZodLiteral", (e, t) => {
  di.init(e, t), O.init(e, t), e._zod.processJSONSchema = (n, r, o) => Ds(e, n, r, o), e.values = new Set(t.values), Object.defineProperty(e, "value", {
    get() {
      if (t.values.length > 1)
        throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");
      return t.values[0];
    }
  });
});
function Va(e, t) {
  return new Wa({
    type: "literal",
    values: Array.isArray(e) ? e : [e],
    ...g(t)
  });
}
const Ha = /* @__PURE__ */ d("ZodTransform", (e, t) => {
  Pe(), pi.init(e, t), O.init(e, t), e._zod.processJSONSchema = (n, r, o) => Rs(e, n, r, o), e._zod.parse = (n, r) => {
    if (r.direction === "backward")
      throw new en(e.constructor.name);
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
function Ga(e) {
  return new Ha({
    type: "transform",
    transform: e
  });
}
const Zn = /* @__PURE__ */ d("ZodOptional", (e, t) => {
  yn.init(e, t), O.init(e, t), e._zod.processJSONSchema = (n, r, o) => Tn(e, n, r, o), e.unwrap = () => e._zod.def.innerType;
});
function Mt(e) {
  return new Zn({
    type: "optional",
    innerType: e
  });
}
const Dn = /* @__PURE__ */ d("ZodExactOptional", (e, t) => {
  hi.init(e, t), O.init(e, t), e._zod.processJSONSchema = (n, r, o) => Tn(e, n, r, o), e.unwrap = () => e._zod.def.innerType;
});
function Ya(e) {
  return new Dn({
    type: "optional",
    innerType: e
  });
}
const qa = /* @__PURE__ */ d("ZodNullable", (e, t) => {
  mi.init(e, t), O.init(e, t), e._zod.processJSONSchema = (n, r, o) => Bs(e, n, r, o), e.unwrap = () => e._zod.def.innerType;
});
function Ut(e) {
  return new qa({
    type: "nullable",
    innerType: e
  });
}
const Xa = /* @__PURE__ */ d("ZodDefault", (e, t) => {
  gi.init(e, t), O.init(e, t), e._zod.processJSONSchema = (n, r, o) => Ks(e, n, r, o), e.unwrap = () => e._zod.def.innerType, e.removeDefault = e.unwrap;
});
function Qa(e, t) {
  return new Xa({
    type: "default",
    innerType: e,
    get defaultValue() {
      return typeof t == "function" ? t() : qt(t);
    }
  });
}
const ec = /* @__PURE__ */ d("ZodPrefault", (e, t) => {
  _i.init(e, t), O.init(e, t), e._zod.processJSONSchema = (n, r, o) => Ws(e, n, r, o), e.unwrap = () => e._zod.def.innerType;
});
function tc(e, t) {
  return new ec({
    type: "prefault",
    innerType: e,
    get defaultValue() {
      return typeof t == "function" ? t() : qt(t);
    }
  });
}
const Cn = /* @__PURE__ */ d("ZodNonOptional", (e, t) => {
  yi.init(e, t), O.init(e, t), e._zod.processJSONSchema = (n, r, o) => Js(e, n, r, o), e.unwrap = () => e._zod.def.innerType;
});
function nc(e, t) {
  return new Cn({
    type: "nonoptional",
    innerType: e,
    ...g(t)
  });
}
const rc = /* @__PURE__ */ d("ZodCatch", (e, t) => {
  bi.init(e, t), O.init(e, t), e._zod.processJSONSchema = (n, r, o) => Vs(e, n, r, o), e.unwrap = () => e._zod.def.innerType, e.removeCatch = e.unwrap;
});
function oc(e, t) {
  return new rc({
    type: "catch",
    innerType: e,
    catchValue: typeof t == "function" ? t : gr(t)
  });
}
const ic = /* @__PURE__ */ d("ZodPipe", (e, t) => {
  wi.init(e, t), O.init(e, t), e._zod.processJSONSchema = (n, r, o) => Hs(e, n, r, o), e.in = t.in, e.out = t.out;
});
function Ft(e, t) {
  return new ic({
    type: "pipe",
    in: e,
    out: t
    // ...util.normalizeParams(params),
  });
}
const sc = /* @__PURE__ */ d("ZodReadonly", (e, t) => {
  vi.init(e, t), O.init(e, t), e._zod.processJSONSchema = (n, r, o) => Gs(e, n, r, o), e.unwrap = () => e._zod.def.innerType;
});
function ac(e) {
  return new sc({
    type: "readonly",
    innerType: e
  });
}
const cc = /* @__PURE__ */ d("ZodCustom", (e, t) => {
  ki.init(e, t), O.init(e, t), e._zod.processJSONSchema = (n, r, o) => Cs(e, n, r, o);
});
function uc(e, t = {}) {
  return /* @__PURE__ */ ks(cc, e, t);
}
function lc(e, t) {
  return /* @__PURE__ */ Ss(e, t);
}
const L = {
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
function rt(e) {
  const t = { kcal: 0, protein: 0, carbs: 0, fat: 0 };
  for (const [n, r] of Object.entries(e)) for (const o of Object.keys(t)) t[o] += L[n][o] * r / 100;
  return Object.fromEntries(Object.entries(t).map(([n, r]) => [n, Math.round(r)]));
}
Object.assign(L, {
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
const Lt = { chicken: "Chicken", turkey: "Turkey", beef: "Beef", fish: "White fish", tofu: "Tofu", chickpeas: "Chickpea", lentils: "Lentil", beans: "Black bean" }, fc = ["tofu", "chickpeas", "lentils", "beans"], ot = [];
function dc(e) {
  return e === "chicken" ? "Use a separate board for raw chicken. Cut into bite-size pieces, wash hands and clean surfaces. Cook in the measured oil until the thickest piece reaches 165°F (74°C)." : e === "turkey" || e === "beef" ? `Brown the ground ${e} in the measured oil, breaking it into small pieces. Check with a food thermometer: ${e === "turkey" ? "165°F (74°C)" : "160°F (71°C)"}.` : e === "fish" ? "Check fish for bones. Cook in the measured oil, turning carefully, until its center reaches 145°F (63°C); flake into large pieces." : e === "tofu" ? "Drain and cube the tofu. Cook in the measured oil for 6–8 minutes, turning until lightly golden." : "Drain and rinse the canned legumes. Warm them in the measured oil for 3–4 minutes.";
}
function pc(e, t, n, r, o, i = "simmer", s = {}) {
  for (const a of s.proteins || Object.keys(Lt)) {
    const c = { [r]: r === "potatoes" ? 300 : 75, [a]: 170, vegetables: 160, onion: 60, garlic: 5, oil: 7, [o]: 2, ...i === "pilaf" ? { peas: 80 } : { tomatoes: 120 }, ...s.spinach ? { spinach: 100 } : {}, ...t === "Indian" ? { ginger: 8 } : {} }, u = r === "potatoes" ? "Cut the potatoes into small, even cubes. Boil in water for 15–20 minutes until fork-tender; drain." : `Cook the measured ${r} according to its package directions, using water. Drain excess water.`;
    let l = i === "mash" ? "Mash the cooked potatoes with a splash of hot water. Spoon over the thick vegetable and protein filling; serve with the vegetables." : i === "pilaf" ? `Fold the cooked ${r} into the seasoned protein and vegetables. Cover on low heat for 2 minutes, then fluff and serve.` : `Serve the thick sauce and protein over the cooked ${r}.`;
    ot.push({ id: `${e}-${a}`, family: e, protein: a, mealType: "main", name: n.replace("{protein}", Lt[a]), cuisine: t, minutes: i === "mash" ? 40 : 35, equipment: ["stovetop", "knife"], vegan: fc.includes(a), items: c, nutrition: rt(c), image: "/assets/meal-prep.png", imageNote: "Illustrative meal-prep photo; not a photograph of this dish.", steps: [u, dc(a), `Transfer the protein to a clean plate. In the same pan, soften the chopped onion and garlic${t === "Indian" ? " and grated ginger" : ""} with a splash of water for 5 minutes. Stir in the measured ${L[o].name.toLowerCase()} for 30 seconds.`, `Add the vegetables${i === "pilaf" ? " and peas" : ", crushed tomatoes"}${s.spinach ? " and spinach" : ""}, plus 100 ml water. Simmer for 8–10 minutes until vegetables are cooked and the sauce thickens. Return the cooked protein and heat through.`, l, "Refrigerate leftovers promptly. Use the ingredient quantities shown for your portion; water can be adjusted to prevent sticking."] });
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
  ["american-hash", "American", "{protein} vegetable and potato hash", "potatoes", "paprika", "pilaf"]
]) pc(...e);
for (const e of ["banana", "berries", "apple"]) for (const t of ["seeds", "soyMilk"]) for (const n of ["microwave", "stovetop"]) {
  const r = { oats: 85, [e]: 150, [t]: t === "seeds" ? 25 : 200, cinnamon: 1 };
  ot.push({ id: `oats-${e}-${t}-${n}`, family: `oats-${e}-${t}`, mealType: "breakfast", name: `${e === "berries" ? "Berry" : e === "apple" ? "Apple" : "Banana"} ${t === "seeds" ? "pumpkin-seed" : "creamy soy"} porridge`, cuisine: "American", minutes: 12, equipment: [n, ...e === "berries" ? [] : ["knife"]], vegan: !0, items: r, nutrition: rt(r), image: "/assets/meal-prep.png", imageNote: "Illustrative meal-prep photo; not a photograph of this porridge.", steps: [`Combine oats with ${t === "soyMilk" ? "soy milk and 100 ml water" : "250 ml water"} in a large ${n === "microwave" ? "microwave-safe bowl" : "saucepan"}.`, n === "microwave" ? "Microwave for 2 minutes, stir, then heat in 30-second intervals until cooked." : "Simmer for 5–7 minutes, stirring and adding water as needed.", e === "berries" ? "Heat berries according to package instructions." : `Wash or peel and slice the ${e}.`, `Stir in the fruit and cinnamon${t === "seeds" ? " and seeds" : ""}; let cool slightly.`] });
}
const q = U({ name: D().trim().max(80).default(""), country: C(["US", "CA"]).default("US"), location: D().max(150).default(""), weight: T().min(40).max(250).default(70), height: T().min(130).max(230).default(170), goal: C(["lose", "maintain", "gain"]).default("maintain"), budget: T().min(1).max(2e3).default(75), minutes: T().int().min(5).max(180).default(45), meals: T().int().min(1).max(4).default(3), equipment: Y(C(["stovetop", "microwave", "oven", "airfryer", "blender", "toaster", "knife", "slowcooker"])).max(8).default(["stovetop", "knife"]), diet: C(["none", "vegan", "vegetarian", "halal", "kosher"]).default("none"), allergens: Y(C(["wheat", "soy", "milk", "eggs", "peanuts", "tree nuts", "fish", "shellfish", "sesame", "mustard", "pork"])).max(11).default([]), cuisines: Y(C(["American", "Italian", "Mexican", "Middle Eastern", "Asian", "Indian", "British"])).max(7).default([]), memberships: Y(C(["Costco", "Sam's Club"])).max(2).default([]), stores: Y(U({ id: D().max(100), name: D().max(200), address: D().max(400), distance: T().min(0).nullable(), lat: T().min(-90).max(90), lon: T().min(-180).max(180), warehouse: Da() })).max(10).default([]), adult: Va(!0).default(!0) }), Bt = q.parse({}), hc = Ka(C(Object.keys(L)), T().min(0).max(1e5));
function Rn(e) {
  return Math.round(Math.min(3600, Math.max(1600, (10 * e.weight + 6.25 * e.height - 150) * 1.4 + (e.goal === "lose" ? -250 : e.goal === "gain" ? 250 : 0))) / 50) * 50;
}
function jn(e) {
  return ot.filter((t) => t.minutes <= e.minutes && t.equipment.every((n) => e.equipment.includes(n)) && (e.diet === "none" || t.vegan) && !Object.keys(t.items).some((n) => L[n].allergens.some((r) => e.allergens.includes(r))) && (!e.cuisines.length || e.cuisines.includes(t.cuisine)));
}
function xn(e, t) {
  const n = Rn(t) / t.meals / e.nutrition.kcal;
  if (n < 0.4 || n > 3.5) return null;
  const r = Object.fromEntries(Object.entries(e.items).map(([o, i]) => [o, Math.round(i * n)]));
  return { ...e, items: r, nutrition: rt(r), portionScale: Math.round(n * 100) / 100 };
}
function ze(e, t, n = {}) {
  const r = {};
  for (const i of e) for (const [s, a] of Object.entries(i.items)) r[s] = (r[s] || 0) + a;
  const o = Object.entries(r).map(([i, s]) => {
    const a = L[i], c = n[i] || 0, u = Math.max(0, s - c), l = Math.ceil(u / a.pack), f = Math.round(a[t.country === "CA" ? "cad" : "usd"] * 100);
    return { id: i, name: a.name, needed: s, pantryUsed: Math.min(s, c), packages: l, packGrams: a.pack, buyGrams: l * a.pack, leftover: Math.max(0, c - s) + l * a.pack - u, cents: l * f };
  });
  return { list: o, totalCents: o.reduce((i, s) => i + s.cents, 0), currency: t.country === "CA" ? "CAD" : "USD", priceNote: "Illustrative package prices, not store quotes. Taxes, deposits, membership fees and local price changes are not included.", stores: t.stores };
}
function Mn(e, t, n) {
  const r = (i) => i.minutes <= t.minutes && i.equipment.every((s) => t.equipment.includes(s)) && (t.diet === "none" || i.vegan) && !Object.keys(i.items).some((s) => !L[s] || L[s].allergens.some((a) => t.allergens.includes(a))) && (!t.cuisines.length || t.cuisines.includes(i.cuisine));
  if (e.length !== 7 * t.meals || e.some((i) => !r(i))) throw new Error("The requested plan does not meet your meal, diet, time or equipment settings.");
  const o = ze(e, t, n);
  if (o.totalCents > Math.floor(t.budget * 100)) throw new Error("No plan found within your budget and current preferences. Try a larger budget or different cuisines/equipment. Your existing plan has not changed.");
  return o;
}
function Oe(e, t) {
  return t <= 2 ? e % t === 0 ? "Lunch" : "Dinner" : ["Breakfast", "Lunch", "Dinner", "Extra meal"][e % t];
}
const Un = (e, t, n) => Oe(t, n.meals) === "Breakfast" || e.mealType !== "breakfast";
function Jt(e, t = {}, n = []) {
  const r = new Set(n.map((a) => a.id)), o = new Set(n.map((a) => a.family)), i = jn(e).filter((a) => !r.has(a.id)).map((a) => xn(a, e)).filter(Boolean);
  let s;
  for (let a = 0; a < 80; a++) {
    const c = [], u = /* @__PURE__ */ new Set(), l = /* @__PURE__ */ new Map();
    for (let p = 0; p < 7 * e.meals; p++) {
      let h = i.filter((v) => !u.has(v.id) && Un(v, p, e));
      if (!h.length) break;
      const m = Oe(p, e.meals) === "Breakfast", _ = { ...h.map((v) => ({ r: v, score: ze([v], e, t).totalCents * (0.35 + Math.random() * 1.3) + (l.get(v.family) || 0) * 650 + (o.has(v.family) ? 150 : 0) + (m && v.mealType !== "breakfast" ? 200 : 0) })).sort((v, I) => v.score - I.score)[0].r, mealSlot: Oe(p, e.meals) };
      c.push(_), u.add(_.id), l.set(_.family, (l.get(_.family) || 0) + 1);
    }
    if (c.length !== 7 * e.meals) continue;
    const f = ze(c, e, t);
    if ((!s || f.totalCents < s.totalCents) && (s = { meals: c, ...f }), f.totalCents <= e.budget * 100) break;
  }
  if (!s) throw new Error("There are not enough different recipes for a full week without repeating the previous plan. Broaden cuisines or equipment, or reduce meals per day.");
  return Mn(s.meals, e, t), { ...s, targetCalories: Rn(e), settings: e, completed: [], spentCents: 0, createdAt: (/* @__PURE__ */ new Date()).toISOString() };
}
function Kt(e, t, n, r, o = [], i) {
  if (!Number.isInteger(t) || t < 0 || t >= e.meals.length) throw new Error("Choose a valid meal to replace.");
  if (e.completed?.includes(t)) throw new Error("This meal is already cooked. Choose an uncooked meal or build a new week.");
  const s = e.meals[t], a = new Set([...e.meals, ...o].map((l) => l.id)), c = jn(n).filter((l) => !a.has(l.id) && Un(l, t, n) && (!i || l.protein === i));
  c.sort((l, f) => ((i ? l.family !== s.family : l.family === s.family) ? 1 : 0) - ((i ? f.family !== s.family : f.family === s.family) ? 1 : 0));
  const u = c.map((l) => ({ r: l, t: Math.random(), group: i ? l.family === s.family ? 0 : 1 : l.family === s.family ? 1 : 0 })).sort((l, f) => l.group - f.group || l.t - f.t);
  for (const { r: l } of u) {
    const f = xn(l, n);
    if (!f) continue;
    const p = e.meals.map((h, m) => m === t ? { ...f, mealSlot: Oe(m, n.meals) } : h);
    try {
      const h = e.spentCents ?? (e.purchased ? e.totalCents : 0), y = e.purchased || e.completed?.length || h > 0 ? ze(p.filter((v, I) => !e.completed?.includes(I)), n, r) : Mn(p, n, r), _ = h + y.totalCents;
      if (_ > Math.floor(n.budget * 100)) continue;
      return { ...e, ...y, meals: p, totalCents: _, additionalCents: y.totalCents, spentCents: h, purchased: !1, settings: n };
    } catch {
    }
  }
  throw new Error("No replacement fits your protein choice, meal type, current constraints and remaining budget. Try another protein or adjust preferences.");
}
const b = (e, t = 200, n = {}) => new Response(JSON.stringify(e), { status: t, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", ...n } }), ue = (e) => {
  try {
    return JSON.parse(e || "{}");
  } catch {
    return {};
  }
}, Fn = (e) => Object.fromEntries((e.headers.get("cookie") || "").split(";").map((t) => t.trim().split("=").map(decodeURIComponent)).filter((t) => t.length === 2)), le = (e) => [...new Uint8Array(e)].map((t) => t.toString(16).padStart(2, "0")).join(""), mc = (e) => Uint8Array.from(e.match(/.{2}/g) || [], (t) => parseInt(t, 16)), Ln = U({ reply: D().max(5e3), action: C(["none", "generate", "swap", "preferences"]), mealIndex: T().int().min(0).max(27).nullable(), budget: T().min(1).max(2e3).nullable(), minutes: T().int().min(5).max(180).nullable(), cuisines: Y(C(["American", "Italian", "Mexican", "Middle Eastern", "Asian", "Indian", "British"])).max(7).nullable() });
async function J(e) {
  return le(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(e)));
}
async function Bn(e, t = crypto.getRandomValues(new Uint8Array(16))) {
  const n = await crypto.subtle.importKey("raw", new TextEncoder().encode(e), "PBKDF2", !1, ["deriveBits"]), r = await crypto.subtle.deriveBits({ name: "PBKDF2", hash: "SHA-256", salt: t, iterations: 1e5 }, n, 256), o = await crypto.subtle.importKey("raw", r, "PBKDF2", !1, ["deriveBits"]), i = new Uint8Array(await crypto.subtle.digest("SHA-256", new Uint8Array([...t, 67, 104, 101, 97, 112, 67, 104, 101, 102]))), s = await crypto.subtle.deriveBits({ name: "PBKDF2", hash: "SHA-256", salt: i, iterations: 1e5 }, o, 256);
  return `${le(t)}:${le(s)}`;
}
async function Wt(e, t) {
  const [n, r] = t.split(":");
  if (!n || !r) return !1;
  const o = (await Bn(e, mc(n))).split(":")[1];
  let i = r.length ^ o.length;
  for (let s = 0; s < Math.min(r.length, o.length); s++) i |= r.charCodeAt(s) ^ o.charCodeAt(s);
  return i === 0;
}
async function M(e, t) {
  let n;
  try {
    n = await e.json();
  } catch {
    throw new Error("Invalid request.");
  }
  return t.parse(n);
}
async function gc(e, t) {
  const n = Fn(e).cc_session;
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
async function G(e, t) {
  return (await e.DB.prepare("SELECT id,data FROM plans WHERE user_id=? ORDER BY created_at DESC,id DESC LIMIT 2").bind(t).all()).results.map((r) => ({ ...r, data: ue(r.data) }));
}
async function _e(e, t, n, r) {
  return r ? await e.DB.prepare("UPDATE plans SET data=? WHERE id=? AND user_id=?").bind(JSON.stringify(n), r, t).run() : (r = crypto.randomUUID(), await e.DB.prepare("INSERT INTO plans(id,user_id,data) VALUES(?,?,?)").bind(r, t, JSON.stringify(n)).run()), { id: r, ...n };
}
function _c(e) {
  return e instanceof Pn ? e.issues.map((t) => `${t.path.join(".")}: ${t.message}`).join("; ") : /^(No |There |The |Choose |Generate |Start |These |This |Pantry |Search |Enter |Location |Invalid |Your |That |Account|Unable )/.test(e.message) ? e.message : (console.error(e), "Something went wrong. Please try again.");
}
function Vt(e, t, n, r) {
  const o = Math.PI / 180, i = Math.sin((n - e) * o / 2) ** 2 + Math.cos(e * o) * Math.cos(n * o) * Math.sin((r - t) * o / 2) ** 2;
  return Math.round(6371e3 * 2 * Math.atan2(Math.sqrt(i), Math.sqrt(Math.max(0, 1 - i))));
}
async function Ht(e, t = {}) {
  const n = await fetch(e, { ...t, headers: { "User-Agent": "CheapChef/1.0 (https://github.com/anasajhani/cheap-chef)", ...t.headers } });
  if (!n.ok) throw new Error("The map service is temporarily unavailable. Please try again later.");
  return n.json();
}
async function yc(e) {
  let { country: t, location: n, lat: r, lon: o } = e;
  if (r === void 0) {
    if (!n?.trim()) throw new Error("Enter a city, ZIP or postal code, or use your location.");
    const c = await Ht("https://nominatim.openstreetmap.org/search?" + new URLSearchParams({ q: n, countrycodes: t.toLowerCase(), format: "jsonv2", limit: "1" }));
    if (!c.length) throw new Error("Location not found. Try your city and state/province.");
    r = Number(c[0].lat), o = Number(c[0].lon);
  }
  const i = `[out:json][timeout:20];(nwr["shop"~"^(supermarket|grocery|wholesale|department_store|general)$"](around:15000,${r},${o});nwr["brand"~"Walmart|Target|Kroger|Costco|Sam's Club|ALDI",i]["shop"~"^(supermarket|grocery|wholesale|department_store|general)$"](around:15000,${r},${o}););out center tags;`;
  return { stores: ((await Ht("https://overpass-api.de/api/interpreter", { method: "POST", headers: { "content-type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ data: i }) })).elements || []).map((c) => {
    const u = c.tags || {}, l = c.lat ?? c.center?.lat, f = c.lon ?? c.center?.lon;
    return { id: `osm:${c.type}:${c.id}`, name: u.name || u.brand || "Grocery store", address: [u["addr:housenumber"], u["addr:street"], u["addr:city"], u["addr:state"], u["addr:postcode"]].filter(Boolean).join(" ") || "Address not listed in OpenStreetMap", distance: Vt(r, o, l, f), lat: l, lon: f, warehouse: /costco|sam.s club/i.test(u.name || u.brand || "") };
  }).filter((c) => Number.isFinite(c.lat) && Number.isFinite(c.lon)).sort((c, u) => c.distance - u.distance).filter((c, u, l) => !l.slice(0, u).some((f) => f.name.toLowerCase() === c.name.toLowerCase() && Vt(f.lat, f.lon, c.lat, c.lon) < 100)).slice(0, 60), source: "OpenStreetMap contributors", attribution: "https://www.openstreetmap.org/copyright", note: "Within 15 km; distances are straight-line. Coverage may be incomplete. No live prices or inventory." };
}
async function bc(e, { message: t, history: n, profile: r, plan: o, pantry: i }) {
  if (!e.OPENAI_API_KEY || !e.OPENAI_MODEL) return { reply: "The AI chef is not connected yet. You can still use preferences, pantry, nearby stores, meal plans and swaps.", action: "none", mealIndex: null, budget: null, minutes: null, cuisines: null, mode: "unavailable" };
  const s = { type: "object", additionalProperties: !1, properties: { reply: { type: "string" }, action: { type: "string", enum: ["none", "generate", "swap", "preferences"] }, mealIndex: { type: ["integer", "null"] }, budget: { type: ["number", "null"] }, minutes: { type: ["integer", "null"] }, cuisines: { type: ["array", "null"], items: { type: "string", enum: ["American", "Italian", "Mexican", "Middle Eastern", "Asian", "Indian", "British"] } } }, required: ["reply", "action", "mealIndex", "budget", "minutes", "cuisines"] }, a = await fetch("https://api.openai.com/v1/responses", { method: "POST", headers: { Authorization: `Bearer ${e.OPENAI_API_KEY}`, "content-type": "application/json" }, body: JSON.stringify({ model: e.OPENAI_MODEL, store: !1, max_output_tokens: 1200, instructions: "You are Cheap Chef. Help adults with their saved meal plan. Never loosen diet, allergy, equipment or budget limits. Do not claim live prices or inventory. Direct changes to the visible planner controls. Return structured JSON.", input: [{ role: "user", content: JSON.stringify({ profile: { ...r, location: void 0, stores: r.stores.map((l) => ({ name: l.name })) }, plan: o, pantry: i }) }, ...n.slice(-10).map((l) => ({ role: l.role, content: l.text })), { role: "user", content: t }], text: { format: { type: "json_schema", name: "chef_action", strict: !0, schema: s } } }) });
  if (!a.ok) throw new Error("The AI provider could not respond. Try again later; your plan has not changed.");
  const c = await a.json(), u = c.output?.flatMap((l) => l.content || []).find((l) => l.type === "output_text")?.text;
  if (!u) throw new Error("The AI could not answer. Your plan has not changed.");
  return { ...Ln.parse(JSON.parse(u)), mode: "ai" };
}
async function wc(e, t, n) {
  const r = e.method;
  if (n === "/api/health") return b({ ok: !0 });
  if (n === "/api/config") return b({ ai: !!(t.OPENAI_API_KEY && t.OPENAI_MODEL), ingredients: L, defaults: Bt });
  const o = U({ email: D().email().max(254).transform((s) => s.toLowerCase()), password: D().min(12).max(128) });
  if (n === "/api/register" && r === "POST") {
    const s = e.headers.get("cf-connecting-ip") || "unknown";
    if (!await ge(t, `auth:${s}`, 20, 15 * 6e4)) return b({ error: "Too many sign-in attempts. Try again in 15 minutes." }, 429);
    const a = await M(e, o), c = crypto.randomUUID(), u = await Bn(a.password);
    try {
      await t.DB.prepare("INSERT INTO users(id,email,password,profile) VALUES(?,?,?,?)").bind(c, a.email, u, JSON.stringify(Bt)).run();
    } catch {
      throw new Error("Unable to create that account. Try signing in instead.");
    }
    const l = le(crypto.getRandomValues(new Uint8Array(32)));
    return await t.DB.prepare("INSERT INTO sessions(token,user_id,expires_at) VALUES(?,?,?)").bind(await J(l), c, new Date(Date.now() + 7 * 864e5).toISOString()).run(), b({ ok: !0 }, 201, { "set-cookie": `cc_session=${l}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=604800` });
  }
  if (n === "/api/login" && r === "POST") {
    const s = e.headers.get("cf-connecting-ip") || "unknown";
    if (!await ge(t, `auth:${s}`, 20, 15 * 6e4)) return b({ error: "Too many sign-in attempts. Try again in 15 minutes." }, 429);
    const a = await M(e, o), c = await t.DB.prepare("SELECT * FROM users WHERE email=?").bind(a.email).first();
    if (!c || !await Wt(a.password, c.password)) return b({ error: "Email or password is incorrect." }, 401);
    const u = le(crypto.getRandomValues(new Uint8Array(32)));
    return await t.DB.prepare("INSERT INTO sessions(token,user_id,expires_at) VALUES(?,?,?)").bind(await J(u), c.id, new Date(Date.now() + 7 * 864e5).toISOString()).run(), b({ ok: !0 }, 200, { "set-cookie": `cc_session=${u}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=604800` });
  }
  const i = await gc(e, t);
  if (!i) return b({ error: "Please sign in." }, 401);
  if (n === "/api/me" && r === "GET") {
    const s = await G(t, i.id), a = (await t.DB.prepare("SELECT role,text FROM chats WHERE user_id=? ORDER BY created_at DESC,id DESC LIMIT 24").bind(i.id).all()).results.reverse();
    return b({ email: i.email, profile: i.profile, pantry: i.pantry, plan: s[0] ? { id: s[0].id, ...s[0].data } : null, chats: a });
  }
  if (n === "/api/logout" && r === "POST") {
    const s = Fn(e).cc_session;
    return s && await t.DB.prepare("DELETE FROM sessions WHERE token=?").bind(await J(s)).run(), b({ ok: !0 }, 200, { "set-cookie": "cc_session=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0" });
  }
  if (n === "/api/profile" && r === "PUT") {
    const s = await M(e, q), a = [...i.profile.stores || []], c = await t.DB.prepare("SELECT data FROM store_results WHERE user_id=? AND expires_at>CURRENT_TIMESTAMP").bind(i.id).first();
    return c && a.push(...ue(c.data).stores || []), s.stores = s.stores.map((u) => {
      const l = a.find((f) => f.id === u.id);
      if (!l) throw new Error("Search for nearby stores before selecting them.");
      return l;
    }), await t.DB.prepare("UPDATE users SET profile=? WHERE id=?").bind(JSON.stringify(s), i.id).run(), b(s);
  }
  if (n === "/api/pantry" && r === "PUT") {
    const s = await M(e, hc);
    return await t.DB.prepare("UPDATE users SET pantry=? WHERE id=?").bind(JSON.stringify(s), i.id).run(), b(s);
  }
  if (n === "/api/plans" && r === "POST") {
    const s = await G(t, i.id);
    return b(await _e(t, i.id, Jt(q.parse(i.profile), i.pantry, s[0]?.data.meals || [])));
  }
  if (n === "/api/plans/swap" && r === "POST") {
    const { index: s, protein: a, planId: c } = await M(e, U({ index: T().int().min(0).max(27), protein: C(["chicken", "turkey", "beef", "fish", "tofu", "chickpeas", "lentils", "beans"]).optional(), planId: D().optional() })), u = await G(t, i.id);
    if (!u[0]) throw new Error("Generate a plan first.");
    if (c && c !== u[0].id) throw new Error("Your plan changed. Refresh before swapping.");
    return b(await _e(t, i.id, Kt(u[0].data, s, q.parse(i.profile), i.pantry, u[1]?.data.meals || [], a), u[0].id));
  }
  if (n === "/api/plans/purchased" && r === "POST") {
    const s = await G(t, i.id), a = s[0]?.data;
    if (!a) throw new Error("Generate a plan first.");
    if (a.purchased) throw new Error("These purchases have already been added.");
    const c = { ...i.pantry };
    for (const u of a.list) c[u.id] = (c[u.id] || 0) + u.buyGrams;
    return a.spentCents = a.totalCents, a.additionalCents = 0, a.purchased = !0, await t.DB.batch([t.DB.prepare("UPDATE users SET pantry=? WHERE id=?").bind(JSON.stringify(c), i.id), t.DB.prepare("UPDATE plans SET data=? WHERE id=? AND user_id=?").bind(JSON.stringify(a), s[0].id, i.id)]), b({ ok: !0 });
  }
  if (n === "/api/plans/cooked" && r === "POST") {
    const { index: s } = await M(e, U({ index: T().int().min(0).max(27) })), a = await G(t, i.id), c = a[0]?.data;
    if (!c?.meals[s]) throw new Error("Choose a valid meal.");
    if (c.completed.includes(s)) throw new Error("This meal is already marked cooked.");
    const u = { ...i.pantry };
    for (const [l, f] of Object.entries(c.meals[s].items)) {
      if ((u[l] || 0) < f) throw new Error("Pantry stock is too low. Record purchases or update your pantry first.");
      u[l] -= f;
    }
    return c.completed.push(s), await t.DB.batch([t.DB.prepare("UPDATE users SET pantry=? WHERE id=?").bind(JSON.stringify(u), i.id), t.DB.prepare("UPDATE plans SET data=? WHERE id=? AND user_id=?").bind(JSON.stringify(c), a[0].id, i.id)]), b({ ok: !0 });
  }
  if (n === "/api/stores" && r === "POST") {
    if (!await ge(t, `stores:${i.id}`, 5, 6e4)) return b({ error: "Please wait a minute before searching again." }, 429);
    const s = await M(e, U({ country: C(["US", "CA"]), location: D().max(150).optional(), lat: T().min(-90).max(90).optional(), lon: T().min(-180).max(180).optional() }).refine((c) => c.lat === void 0 == (c.lon === void 0))), a = await yc(s);
    return await t.DB.prepare("INSERT INTO store_results(user_id,data,expires_at) VALUES(?,?,?) ON CONFLICT(user_id) DO UPDATE SET data=excluded.data,expires_at=excluded.expires_at").bind(i.id, JSON.stringify(a), new Date(Date.now() + 36e5).toISOString()).run(), b(a);
  }
  if (n === "/api/chat" && r === "POST") {
    if (!await ge(t, `chat:${i.id}`, 8, 6e4)) return b({ error: "Please wait a minute before asking again." }, 429);
    const { message: s } = await M(e, U({ message: D().trim().min(1).max(2e3) })), a = await G(t, i.id), c = (await t.DB.prepare("SELECT role,text FROM chats WHERE user_id=? ORDER BY created_at DESC,id DESC LIMIT 12").bind(i.id).all()).results.reverse();
    if (t.OPENAI_API_KEY && t.OPENAI_MODEL) {
      const f = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
      if ((await t.DB.prepare("INSERT INTO usage(user_id,day,calls) VALUES(?,?,1) ON CONFLICT(user_id,day) DO UPDATE SET calls=calls+1 RETURNING calls").bind(i.id, f).first()).calls > Number(t.AI_DAILY_LIMIT || 20)) return b({ error: "You have reached today’s AI message allowance. Meal-planning controls are still available." }, 429);
    }
    const u = await bc(t, { message: s, history: c, profile: i.profile, pantry: i.pantry, plan: a[0]?.data || null });
    await t.DB.batch([t.DB.prepare("INSERT INTO chats(id,user_id,role,text) VALUES(?,?,?,?)").bind(crypto.randomUUID(), i.id, "user", s), t.DB.prepare("INSERT INTO chats(id,user_id,role,text) VALUES(?,?,?,?)").bind(crypto.randomUUID(), i.id, "assistant", u.reply)]);
    let l = null;
    return u.action !== "none" && (l = crypto.randomUUID(), await t.DB.prepare("INSERT INTO pending_actions(user_id,token,data,plan_id,plan_hash,profile_hash,expires_at) VALUES(?,?,?,?,?,?,?) ON CONFLICT(user_id) DO UPDATE SET token=excluded.token,data=excluded.data,plan_id=excluded.plan_id,plan_hash=excluded.plan_hash,profile_hash=excluded.profile_hash,expires_at=excluded.expires_at").bind(i.id, l, JSON.stringify(u), a[0]?.id || null, await J(JSON.stringify(a[0]?.data || null)), await J(JSON.stringify(i.profile)), new Date(Date.now() + 6e5).toISOString()).run()), b({ ...u, actionToken: l });
  }
  if (n === "/api/chat/confirm" && r === "POST") {
    const { token: s } = await M(e, U({ token: D().uuid() })), a = await t.DB.prepare("SELECT * FROM pending_actions WHERE user_id=? AND token=? AND expires_at>CURRENT_TIMESTAMP").bind(i.id, s).first();
    if (!a) throw new Error("That suggestion expired. Ask the chef again.");
    const c = Ln.parse(ue(a.data)), u = await G(t, i.id);
    if ((a.plan_id || null) !== (u[0]?.id || null) || a.plan_hash !== await J(JSON.stringify(u[0]?.data || null)) || a.profile_hash !== await J(JSON.stringify(i.profile))) throw new Error("Your settings or plan changed. Ask the chef for a new suggestion.");
    await t.DB.prepare("DELETE FROM pending_actions WHERE user_id=?").bind(i.id).run();
    let l = q.parse(i.profile);
    if (c.action === "preferences")
      return l = q.parse({ ...l, ...c.budget !== null ? { budget: c.budget } : {}, ...c.minutes !== null ? { minutes: c.minutes } : {}, ...c.cuisines !== null ? { cuisines: c.cuisines } : {} }), await t.DB.prepare("UPDATE users SET profile=? WHERE id=?").bind(JSON.stringify(l), i.id).run(), b({ message: "Preferences saved. Generate a new week to apply them." });
    if (c.action === "generate")
      return await _e(t, i.id, Jt(l, i.pantry, u[0]?.data.meals || [])), b({ message: "Your new meal plan and shopping list are ready." });
    if (c.action === "swap") {
      if (!u[0]) throw new Error("Generate a new plan before making this change.");
      return await _e(t, i.id, Kt(u[0].data, c.mealIndex, l, i.pantry, u[1]?.data.meals || []), u[0].id), b({ message: "Meal replaced and shopping list updated." });
    }
    return b({ message: "No change requested." });
  }
  if (n === "/api/account" && r === "DELETE") {
    const { password: s } = await M(e, U({ password: D().max(128) }));
    return await Wt(s, i.password) ? (await t.DB.prepare("DELETE FROM users WHERE id=?").bind(i.id).run(), b({ ok: !0 }, 200, { "set-cookie": "cc_session=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0" })) : b({ error: "Password is incorrect." }, 401);
  }
  return b({ error: "Not found." }, 404);
}
const vc = {
  async fetch(e, t) {
    const n = new URL(e.url);
    try {
      return n.pathname.startsWith("/api/") ? await wc(e, t, n.pathname) : t.ASSETS.fetch(e);
    } catch (r) {
      return b({ error: _c(r) }, r instanceof Pn ? 400 : 422);
    }
  }
};
export {
  vc as default
};
