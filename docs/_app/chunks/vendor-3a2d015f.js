function t(){}function n(t,n){for(const e in n)t[e]=n[e];return t}function e(t){return t()}function o(){return Object.create(null)}function r(t){t.forEach(e)}function s(t){return"function"==typeof t}function i(t,n){return t!=t?n==n:t!==n||t&&"object"==typeof t||"function"==typeof t}function c(t,n,e,o){if(t){const r=u(t,n,e,o);return t[0](r)}}function u(t,e,o,r){return t[1]&&r?n(o.ctx.slice(),t[1](r(e))):o.ctx}function f(t,n,e,o,r,s,i){const c=function(t,n,e,o){if(t[2]&&o){const r=t[2](o(e));if(void 0===n.dirty)return r;if("object"==typeof r){const t=[],e=Math.max(n.dirty.length,r.length);for(let o=0;o<e;o+=1)t[o]=n.dirty[o]|r[o];return t}return n.dirty|r}return n.dirty}(n,o,r,s);if(c){const r=u(n,e,o,i);t.p(r,c)}}function a(t,n){t.appendChild(n)}function l(t,n,e){t.insertBefore(n,e||null)}function h(t){t.parentNode.removeChild(t)}function d(t,n){for(let e=0;e<t.length;e+=1)t[e]&&t[e].d(n)}function p(t){return document.createElement(t)}function g(t){return document.createTextNode(t)}function m(){return g(" ")}function $(){return g("")}function y(t,n,e,o){return t.addEventListener(n,e,o),()=>t.removeEventListener(n,e,o)}function b(t,n,e){null==e?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}function x(t){return Array.from(t.childNodes)}function _(t,n,e,o){for(let r=0;r<t.length;r+=1){const o=t[r];if(o.nodeName===n){let n=0;const s=[];for(;n<o.attributes.length;){const t=o.attributes[n++];e[t.name]||s.push(t.name)}for(let t=0;t<s.length;t++)o.removeAttribute(s[t]);return t.splice(r,1)[0]}}return o?function(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}(n):p(n)}function v(t,n){for(let e=0;e<t.length;e+=1){const o=t[e];if(3===o.nodeType)return o.data=""+n,t.splice(e,1)[0]}return g(n)}function w(t){return v(t," ")}function E(t,n){n=""+n,t.wholeText!==n&&(t.data=n)}function k(t,n=document.body){return Array.from(n.querySelectorAll(t))}class A{constructor(t=null){this.a=t,this.e=this.n=null}m(t,n,e=null){this.e||(this.e=p(n.nodeName),this.t=n,this.h(t)),this.i(e)}h(t){this.e.innerHTML=t,this.n=Array.from(this.e.childNodes)}i(t){for(let n=0;n<this.n.length;n+=1)l(this.t,this.n[n],t)}p(t){this.d(),this.h(t),this.i(this.a)}d(){this.n.forEach(h)}}let N;function j(t){N=t}function S(){if(!N)throw new Error("Function called outside component initialization");return N}function L(t){S().$$.on_mount.push(t)}function O(t){S().$$.after_update.push(t)}function T(t,n){S().$$.context.set(t,n)}const q=[],C=[],M=[],z=[],B=Promise.resolve();let F=!1;function H(t){M.push(t)}let D=!1;const G=new Set;function I(){if(!D){D=!0;do{for(let t=0;t<q.length;t+=1){const n=q[t];j(n),J(n.$$)}for(j(null),q.length=0;C.length;)C.pop()();for(let t=0;t<M.length;t+=1){const n=M[t];G.has(n)||(G.add(n),n())}M.length=0}while(q.length);for(;z.length;)z.pop()();F=!1,D=!1,G.clear()}}function J(t){if(null!==t.fragment){t.update(),r(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(H)}}const K=new Set;let P;function Q(){P={r:0,c:[],p:P}}function R(){P.r||r(P.c),P=P.p}function U(t,n){t&&t.i&&(K.delete(t),t.i(n))}function V(t,n,e,o){if(t&&t.o){if(K.has(t))return;K.add(t),P.c.push((()=>{K.delete(t),o&&(e&&t.d(1),o())})),t.o(n)}}function W(t,n){const e={},o={},r={$$scope:1};let s=t.length;for(;s--;){const i=t[s],c=n[s];if(c){for(const t in i)t in c||(o[t]=1);for(const t in c)r[t]||(e[t]=c[t],r[t]=1);t[s]=c}else for(const t in i)r[t]=1}for(const i in o)i in e||(e[i]=void 0);return e}function X(t){return"object"==typeof t&&null!==t?t:{}}function Y(t){t&&t.c()}function Z(t,n){t&&t.l(n)}function tt(t,n,o,i){const{fragment:c,on_mount:u,on_destroy:f,after_update:a}=t.$$;c&&c.m(n,o),i||H((()=>{const n=u.map(e).filter(s);f?f.push(...n):r(n),t.$$.on_mount=[]})),a.forEach(H)}function nt(t,n){const e=t.$$;null!==e.fragment&&(r(e.on_destroy),e.fragment&&e.fragment.d(n),e.on_destroy=e.fragment=null,e.ctx=[])}function et(t,n){-1===t.$$.dirty[0]&&(q.push(t),F||(F=!0,B.then(I)),t.$$.dirty.fill(0)),t.$$.dirty[n/31|0]|=1<<n%31}function ot(n,e,s,i,c,u,f=[-1]){const a=N;j(n);const l=n.$$={fragment:null,ctx:null,props:u,update:t,not_equal:c,bound:o(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(a?a.$$.context:e.context||[]),callbacks:o(),dirty:f,skip_bound:!1};let d=!1;if(l.ctx=s?s(n,e.props||{},((t,e,...o)=>{const r=o.length?o[0]:e;return l.ctx&&c(l.ctx[t],l.ctx[t]=r)&&(!l.skip_bound&&l.bound[t]&&l.bound[t](r),d&&et(n,t)),e})):[],l.update(),d=!0,r(l.before_update),l.fragment=!!i&&i(l.ctx),e.target){if(e.hydrate){const t=x(e.target);l.fragment&&l.fragment.l(t),t.forEach(h)}else l.fragment&&l.fragment.c();e.intro&&U(n.$$.fragment),tt(n,e.target,e.anchor,e.customElement),I()}j(a)}class rt{$destroy(){nt(this,1),this.$destroy=t}$on(t,n){const e=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return e.push(n),()=>{const t=e.indexOf(n);-1!==t&&e.splice(t,1)}}$set(t){var n;this.$$set&&(n=t,0!==Object.keys(n).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const st=[];function it(n,e=t){let o;const r=[];function s(t){if(i(n,t)&&(n=t,o)){const t=!st.length;for(let e=0;e<r.length;e+=1){const t=r[e];t[1](),st.push(t,n)}if(t){for(let t=0;t<st.length;t+=2)st[t][0](st[t+1]);st.length=0}}}return{set:s,update:function(t){s(t(n))},subscribe:function(i,c=t){const u=[i,c];return r.push(u),1===r.length&&(o=e(s)||t),i(n),()=>{const t=r.indexOf(u);-1!==t&&r.splice(t,1),0===r.length&&(o(),o=null)}}}}export{n as A,Q as B,it as C,c as D,k as E,a as F,f as G,t as H,d as I,y as J,s as K,A as L,rt as S,x as a,b,_ as c,h as d,p as e,l as f,v as g,E as h,ot as i,Y as j,m as k,$ as l,Z as m,w as n,tt as o,W as p,X as q,V as r,i as s,g as t,R as u,U as v,nt as w,T as x,O as y,L as z};
