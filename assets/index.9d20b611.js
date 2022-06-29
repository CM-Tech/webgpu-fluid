const rs=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function n(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerpolicy&&(o.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?o.credentials="include":i.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(i){if(i.ep)return;i.ep=!0;const o=n(i);fetch(i.href,o)}};rs();const F={};function is(e){F.context=e}const os=(e,t)=>e===t,He=Symbol("solid-proxy"),wi=Symbol("solid-track"),Gt={equals:os};let $i=Ei;const it={},Me=1,Ut=2,_i={owned:null,cleanups:null,context:null,owner:null};var Y=null;let kt=null,U=null,gt=null,J=null,me=null,Vn=0;function pt(e,t){const n=U,r=Y,i=e.length===0,o=i?_i:{owned:null,cleanups:null,context:null,owner:t||r},s=i?e:()=>e(()=>Un(o));Y=o,U=null;try{return Gn(s,!0)}finally{U=n,Y=r}}function A(e,t){t=t?Object.assign({},Gt,t):Gt;const n={value:e,observers:null,observerSlots:null,pending:it,comparator:t.equals||void 0},r=i=>(typeof i=="function"&&(i=i(n.pending!==it?n.pending:n.value)),zn(n,i));return[Ci.bind(n),r]}function Si(e,t,n){const r=on(e,t,!0,Me);lt(r)}function _(e,t,n){const r=on(e,t,!1,Me);lt(r)}function M(e,t,n){$i=ls;const r=on(e,t,!1,Me);r.user=!0,me?me.push(r):lt(r)}function W(e,t,n){n=n?Object.assign({},Gt,n):Gt;const r=on(e,t,!0,0);return r.pending=it,r.observers=null,r.observerSlots=null,r.comparator=n.equals||void 0,lt(r),Ci.bind(r)}function ki(e){if(gt)return e();let t;const n=gt=[];try{t=e()}finally{gt=null}return Gn(()=>{for(let r=0;r<n.length;r+=1){const i=n[r];if(i.pending!==it){const o=i.pending;i.pending=it,zn(i,o)}}},!1),t}function Ie(e){let t,n=U;return U=null,t=e(),U=n,t}function ss(e){M(()=>Ie(e))}function $e(e){return Y===null||(Y.cleanups===null?Y.cleanups=[e]:Y.cleanups.push(e)),e}function Pi(){return U}function nn(e){const t=Symbol("context");return{id:t,Provider:us(t),defaultValue:e}}function rn(e){let t;return(t=Li(Y,e.id))!==void 0?t:e.defaultValue}function Ti(e){const t=W(e);return W(()=>_n(t()))}function Ci(){const e=kt;if(this.sources&&(this.state||e)){const t=J;J=null,this.state===Me||e?lt(this):Wt(this),J=t}if(U){const t=this.observers?this.observers.length:0;U.sources?(U.sources.push(this),U.sourceSlots.push(t)):(U.sources=[this],U.sourceSlots=[t]),this.observers?(this.observers.push(U),this.observerSlots.push(U.sources.length-1)):(this.observers=[U],this.observerSlots=[U.sources.length-1])}return this.value}function zn(e,t,n){if(gt)return e.pending===it&&gt.push(e),e.pending=t,t;if(e.comparator&&e.comparator(e.value,t))return t;let r=!1;return e.value=t,e.observers&&e.observers.length&&Gn(()=>{for(let i=0;i<e.observers.length;i+=1){const o=e.observers[i];r&&kt.disposed.has(o),(r&&!o.tState||!r&&!o.state)&&(o.pure?J.push(o):me.push(o),o.observers&&Oi(o)),r||(o.state=Me)}if(J.length>1e6)throw J=[],new Error},!1),t}function lt(e){if(!e.fn)return;Un(e);const t=Y,n=U,r=Vn;U=Y=e,as(e,e.value,r),U=n,Y=t}function as(e,t,n){let r;try{r=e.fn(t)}catch(i){Ri(i)}(!e.updatedAt||e.updatedAt<=n)&&(e.observers&&e.observers.length?zn(e,r):e.value=r,e.updatedAt=n)}function on(e,t,n,r=Me,i){const o={fn:e,state:r,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:Y,context:null,pure:n};return Y===null||Y!==_i&&(Y.owned?Y.owned.push(o):Y.owned=[o]),o}function mt(e){const t=kt;if(e.state===0||t)return;if(e.state===Ut||t)return Wt(e);if(e.suspense&&Ie(e.suspense.inFallback))return e.suspense.effects.push(e);const n=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<Vn);)(e.state||t)&&n.push(e);for(let r=n.length-1;r>=0;r--)if(e=n[r],e.state===Me||t)lt(e);else if(e.state===Ut||t){const i=J;J=null,Wt(e,n[0]),J=i}}function Gn(e,t){if(J)return e();let n=!1;t||(J=[]),me?n=!0:me=[],Vn++;try{const r=e();return cs(n),r}catch(r){Ri(r)}finally{J=null,n||(me=null)}}function cs(e){J&&(Ei(J),J=null),!e&&(me.length?ki(()=>{$i(me),me=null}):me=null)}function Ei(e){for(let t=0;t<e.length;t++)mt(e[t])}function ls(e){let t,n=0;for(t=0;t<e.length;t++){const i=e[t];i.user?e[n++]=i:mt(i)}F.context&&is();const r=e.length;for(t=0;t<n;t++)mt(e[t]);for(t=r;t<e.length;t++)mt(e[t])}function Wt(e,t){const n=kt;e.state=0;for(let r=0;r<e.sources.length;r+=1){const i=e.sources[r];i.sources&&(i.state===Me||n?i!==t&&mt(i):(i.state===Ut||n)&&Wt(i,t))}}function Oi(e){const t=kt;for(let n=0;n<e.observers.length;n+=1){const r=e.observers[n];(!r.state||t)&&(r.state=Ut,r.pure?J.push(r):me.push(r),r.observers&&Oi(r))}}function Un(e){let t;if(e.sources)for(;e.sources.length;){const n=e.sources.pop(),r=e.sourceSlots.pop(),i=n.observers;if(i&&i.length){const o=i.pop(),s=n.observerSlots.pop();r<i.length&&(o.sourceSlots[s]=r,i[r]=o,n.observerSlots[r]=s)}}if(e.owned){for(t=0;t<e.owned.length;t++)Un(e.owned[t]);e.owned=null}if(e.cleanups){for(t=0;t<e.cleanups.length;t++)e.cleanups[t]();e.cleanups=null}e.state=0,e.context=null}function Ri(e){throw e}function Li(e,t){return e?e.context&&e.context[t]!==void 0?e.context[t]:Li(e.owner,t):void 0}function _n(e){if(typeof e=="function"&&!e.length)return _n(e());if(Array.isArray(e)){const t=[];for(let n=0;n<e.length;n++){const r=_n(e[n]);Array.isArray(r)?t.push.apply(t,r):t.push(r)}return t}return e}function us(e){return function(n){let r;return Si(()=>r=Ie(()=>(Y.context={[e]:n.value},Ti(()=>n.children)))),r}}const fs=Symbol("fallback");function hr(e){for(let t=0;t<e.length;t++)e[t]()}function ds(e,t,n={}){let r=[],i=[],o=[],s=0,a=t.length>1?[]:null;return $e(()=>hr(o)),()=>{let c=e()||[],l,u;return c[wi],Ie(()=>{let f=c.length,v,h,m,y,x,p,b,S,O;if(f===0)s!==0&&(hr(o),o=[],r=[],i=[],s=0,a&&(a=[])),n.fallback&&(r=[fs],i[0]=pt(R=>(o[0]=R,n.fallback())),s=1);else if(s===0){for(i=new Array(f),u=0;u<f;u++)r[u]=c[u],i[u]=pt(d);s=f}else{for(m=new Array(f),y=new Array(f),a&&(x=new Array(f)),p=0,b=Math.min(s,f);p<b&&r[p]===c[p];p++);for(b=s-1,S=f-1;b>=p&&S>=p&&r[b]===c[S];b--,S--)m[S]=i[b],y[S]=o[b],a&&(x[S]=a[b]);for(v=new Map,h=new Array(S+1),u=S;u>=p;u--)O=c[u],l=v.get(O),h[u]=l===void 0?-1:l,v.set(O,u);for(l=p;l<=b;l++)O=r[l],u=v.get(O),u!==void 0&&u!==-1?(m[u]=i[l],y[u]=o[l],a&&(x[u]=a[l]),u=h[u],v.set(O,u)):o[l]();for(u=p;u<f;u++)u in m?(i[u]=m[u],o[u]=y[u],a&&(a[u]=x[u],a[u](u))):i[u]=pt(d);i=i.slice(0,s=f),r=c.slice(0)}return i});function d(f){if(o[u]=f,a){const[v,h]=A(u);return a[u]=h,t(c[u],v)}return t(c[u])}}}function g(e,t){return Ie(()=>e(t||{}))}function Nt(){return!0}const Ni={get(e,t,n){return t===He?n:e.get(t)},has(e,t){return e.has(t)},set:Nt,deleteProperty:Nt,getOwnPropertyDescriptor(e,t){return{configurable:!0,enumerable:!0,get(){return e.get(t)},set:Nt,deleteProperty:Nt}},ownKeys(e){return e.keys()}};function un(e){return(e=typeof e=="function"?e():e)==null?{}:e}function _e(...e){return new Proxy({get(t){for(let n=e.length-1;n>=0;n--){const r=un(e[n])[t];if(r!==void 0)return r}},has(t){for(let n=e.length-1;n>=0;n--)if(t in un(e[n]))return!0;return!1},keys(){const t=[];for(let n=0;n<e.length;n++)t.push(...Object.keys(un(e[n])));return[...new Set(t)]}},Ni)}function Wn(e,...t){const n=new Set(t.flat()),r=Object.getOwnPropertyDescriptors(e),i=t.map(o=>{const s={};for(let a=0;a<o.length;a++){const c=o[a];Object.defineProperty(s,c,r[c]?r[c]:{get(){return e[c]},set(){return!0}})}return s});return i.push(new Proxy({get(o){return n.has(o)?void 0:e[o]},has(o){return n.has(o)?!1:o in e},keys(){return Object.keys(e).filter(o=>!n.has(o))}},Ni)),i}function Hn(e){const t="fallback"in e&&{fallback:()=>e.fallback};return W(ds(()=>e.each,e.children,t||void 0))}function Te(e){let t=!1;const n=W(()=>e.when,void 0,{equals:(r,i)=>t?r===i:!r==!i});return W(()=>{const r=n();if(r){const i=e.children;return(t=typeof i=="function"&&i.length>0)?Ie(()=>i(r)):i}return e.fallback})}function vs(e){let t=!1;const n=Ti(()=>e.children),r=W(()=>{let i=n();Array.isArray(i)||(i=[i]);for(let o=0;o<i.length;o++){const s=i[o].when;if(s)return[o,s,i[o]]}return[-1]},void 0,{equals:(i,o)=>i[0]===o[0]&&(t?i[1]===o[1]:!i[1]==!o[1])&&i[2]===o[2]});return W(()=>{const[i,o,s]=r();if(i<0)return e.fallback;const a=s.children;return(t=typeof a=="function"&&a.length>0)?Ie(()=>a(o)):a})}function fn(e){return e}const hs=["allowfullscreen","async","autofocus","autoplay","checked","controls","default","disabled","formnovalidate","hidden","indeterminate","ismap","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","seamless","selected"],gs=new Set(["className","value","readOnly","formNoValidate","isMap","noModule","playsInline",...hs]),ps=new Set(["innerHTML","textContent","innerText","children"]),ms={className:"class",htmlFor:"for"},gr={class:"className",formnovalidate:"formNoValidate",ismap:"isMap",nomodule:"noModule",playsinline:"playsInline",readonly:"readOnly"},ys=new Set(["beforeinput","click","dblclick","contextmenu","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"]),bs=new Set(["altGlyph","altGlyphDef","altGlyphItem","animate","animateColor","animateMotion","animateTransform","circle","clipPath","color-profile","cursor","defs","desc","ellipse","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence","filter","font","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignObject","g","glyph","glyphRef","hkern","image","line","linearGradient","marker","mask","metadata","missing-glyph","mpath","path","pattern","polygon","polyline","radialGradient","rect","set","stop","svg","switch","symbol","text","textPath","tref","tspan","use","view","vkern"]),xs={xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace"};function ot(e,t){return W(e,void 0,t?void 0:{equals:t})}function ws(e,t,n){let r=n.length,i=t.length,o=r,s=0,a=0,c=t[i-1].nextSibling,l=null;for(;s<i||a<o;){if(t[s]===n[a]){s++,a++;continue}for(;t[i-1]===n[o-1];)i--,o--;if(i===s){const u=o<r?a?n[a-1].nextSibling:n[o-a]:c;for(;a<o;)e.insertBefore(n[a++],u)}else if(o===a)for(;s<i;)(!l||!l.has(t[s]))&&t[s].remove(),s++;else if(t[s]===n[o-1]&&n[a]===t[i-1]){const u=t[--i].nextSibling;e.insertBefore(n[a++],t[s++].nextSibling),e.insertBefore(n[--o],u),t[i]=n[o]}else{if(!l){l=new Map;let d=a;for(;d<o;)l.set(n[d],d++)}const u=l.get(t[s]);if(u!=null)if(a<u&&u<o){let d=s,f=1,v;for(;++d<i&&d<o&&!((v=l.get(t[d]))==null||v!==u+f);)f++;if(f>u-a){const h=t[s];for(;a<u;)e.insertBefore(n[a++],h)}else e.replaceChild(n[a++],t[s++])}else s++;else t[s++].remove()}}}const pr="_$DX_DELEGATE";function ji(e,t,n){let r;return pt(i=>{r=i,t===document?e():k(t,e(),t.firstChild?null:void 0,n)}),()=>{r(),t.textContent=""}}function T(e,t,n){const r=document.createElement("template");r.innerHTML=e;let i=r.content.firstChild;return n&&(i=i.firstChild),i}function Ce(e,t=window.document){const n=t[pr]||(t[pr]=new Set);for(let r=0,i=e.length;r<i;r++){const o=e[r];n.has(o)||(n.add(o),t.addEventListener(o,Cs))}}function he(e,t,n){n==null?e.removeAttribute(t):e.setAttribute(t,n)}function $s(e,t,n,r){r==null?e.removeAttributeNS(t,n):e.setAttributeNS(t,n,r)}function _s(e,t){t==null?e.removeAttribute("class"):e.className=t}function yt(e,t,n,r){if(r)Array.isArray(n)?(e[`$$${t}`]=n[0],e[`$$${t}Data`]=n[1]):e[`$$${t}`]=n;else if(Array.isArray(n)){const i=n[0];e.addEventListener(t,n[0]=o=>i.call(e,n[1],o))}else e.addEventListener(t,n)}function Ss(e,t,n={}){const r=Object.keys(t||{}),i=Object.keys(n);let o,s;for(o=0,s=i.length;o<s;o++){const a=i[o];!a||a==="undefined"||t[a]||(mr(e,a,!1),delete n[a])}for(o=0,s=r.length;o<s;o++){const a=r[o],c=!!t[a];!a||a==="undefined"||n[a]===c||!c||(mr(e,a,!0),n[a]=c)}return n}function Fn(e,t,n={}){const r=e.style,i=typeof n=="string";if(t==null&&i||typeof t=="string")return r.cssText=t;i&&(r.cssText=void 0,n={}),t||(t={});let o,s;for(s in n)t[s]==null&&r.removeProperty(s),delete n[s];for(s in t)o=t[s],o!==n[s]&&(r.setProperty(s,o),n[s]=o);return n}function Fe(e,t,n,r){typeof t=="function"?_(i=>br(e,t(),i,n,r)):br(e,t,void 0,n,r)}function k(e,t,n,r){if(n!==void 0&&!r&&(r=[]),typeof t!="function")return st(e,t,r,n);_(i=>st(e,t(),i,n),r)}function ks(e,t,n,r,i={},o=!1){t||(t={});for(const s in i)if(!(s in t)){if(s==="children")continue;yr(e,s,null,i[s],n,o)}for(const s in t){if(s==="children"){r||st(e,t.children);continue}const a=t[s];i[s]=yr(e,s,a,i[s],n,o)}}function Ps(e){let t,n;return!F.context||!(t=F.registry.get(n=Es()))?e.cloneNode(!0):(F.completed&&F.completed.add(t),F.registry.delete(n),t)}function Ts(e){return e.toLowerCase().replace(/-([a-z])/g,(t,n)=>n.toUpperCase())}function mr(e,t,n){const r=t.trim().split(/\s+/);for(let i=0,o=r.length;i<o;i++)e.classList.toggle(r[i],n)}function yr(e,t,n,r,i,o){let s,a,c;if(t==="style")return Fn(e,n,r);if(t==="classList")return Ss(e,n,r);if(n===r)return r;if(t==="ref")o||n(e);else if(t.slice(0,3)==="on:"){const l=t.slice(3);r&&e.removeEventListener(l,r),n&&e.addEventListener(l,n)}else if(t.slice(0,10)==="oncapture:"){const l=t.slice(10);r&&e.removeEventListener(l,r,!0),n&&e.addEventListener(l,n,!0)}else if(t.slice(0,2)==="on"){const l=t.slice(2).toLowerCase(),u=ys.has(l);if(!u&&r){const d=Array.isArray(r)?r[0]:r;e.removeEventListener(l,d)}(u||n)&&(yt(e,l,n,u),u&&Ce([l]))}else if((c=ps.has(t))||!i&&(gr[t]||(a=gs.has(t)))||(s=e.nodeName.includes("-")))t==="class"||t==="className"?_s(e,n):s&&!a&&!c?e[Ts(t)]=n:e[gr[t]||t]=n;else{const l=i&&t.indexOf(":")>-1&&xs[t.split(":")[0]];l?$s(e,l,t,n):he(e,ms[t]||t,n)}return n}function Cs(e){const t=`$$${e.type}`;let n=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==n&&Object.defineProperty(e,"target",{configurable:!0,value:n}),Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return n||document}}),F.registry&&!F.done&&(F.done=!0,document.querySelectorAll("[id^=pl-]").forEach(r=>r.remove()));n!==null;){const r=n[t];if(r&&!n.disabled){const i=n[`${t}Data`];if(i!==void 0?r.call(n,i,e):r.call(n,e),e.cancelBubble)return}n=n.host&&n.host!==n&&n.host instanceof Node?n.host:n.parentNode}}function br(e,t,n={},r,i){return t||(t={}),!i&&"children"in t&&_(()=>n.children=st(e,t.children,n.children)),t.ref&&t.ref(e),_(()=>ks(e,t,r,!0,n,!0)),n}function st(e,t,n,r,i){for(F.context&&!n&&(n=[...e.childNodes]);typeof n=="function";)n=n();if(t===n)return n;const o=typeof t,s=r!==void 0;if(e=s&&n[0]&&n[0].parentNode||e,o==="string"||o==="number"){if(F.context)return n;if(o==="number"&&(t=t.toString()),s){let a=n[0];a&&a.nodeType===3?a.data=t:a=document.createTextNode(t),n=Ze(e,n,r,a)}else n!==""&&typeof n=="string"?n=e.firstChild.data=t:n=e.textContent=t}else if(t==null||o==="boolean"){if(F.context)return n;n=Ze(e,n,r)}else{if(o==="function")return _(()=>{let a=t();for(;typeof a=="function";)a=a();n=st(e,a,n,r)}),()=>n;if(Array.isArray(t)){const a=[];if(Sn(a,t,i))return _(()=>n=st(e,a,n,r,!0)),()=>n;if(F.context){for(let c=0;c<a.length;c++)if(a[c].parentNode)return n=a}if(a.length===0){if(n=Ze(e,n,r),s)return n}else Array.isArray(n)?n.length===0?xr(e,a,r):ws(e,n,a):(n&&Ze(e),xr(e,a));n=a}else if(t instanceof Node){if(F.context&&t.parentNode)return n=s?[t]:t;if(Array.isArray(n)){if(s)return n=Ze(e,n,r,t);Ze(e,n,null,t)}else n==null||n===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);n=t}}return n}function Sn(e,t,n){let r=!1;for(let i=0,o=t.length;i<o;i++){let s=t[i],a;if(s instanceof Node)e.push(s);else if(!(s==null||s===!0||s===!1))if(Array.isArray(s))r=Sn(e,s)||r;else if((a=typeof s)=="string")e.push(document.createTextNode(s));else if(a==="function")if(n){for(;typeof s=="function";)s=s();r=Sn(e,Array.isArray(s)?s:[s])||r}else e.push(s),r=!0;else e.push(document.createTextNode(s.toString()))}return r}function xr(e,t,n){for(let r=0,i=t.length;r<i;r++)e.insertBefore(t[r],n)}function Ze(e,t,n,r){if(n===void 0)return e.textContent="";const i=r||document.createTextNode("");if(t.length){let o=!1;for(let s=t.length-1;s>=0;s--){const a=t[s];if(i!==a){const c=a.parentNode===e;!o&&!s?c?e.replaceChild(i,a):e.insertBefore(i,n):c&&a.remove()}else o=!0}}else e.insertBefore(i,n);return[i]}function Es(){const e=F.context;return`${e.id}${e.count++}`}const Os="http://www.w3.org/2000/svg";function Di(e,t=!1){return t?document.createElementNS(Os,e):document.createElement(e)}function Ai(e){const{useShadow:t}=e,n=document.createTextNode(""),r=e.mount||document.body;function i(){if(F.context){const[o,s]=A(!1);return queueMicrotask(()=>s(!0)),()=>o()&&e.children}else return()=>e.children}if(r instanceof HTMLHeadElement){const[o,s]=A(!1),a=()=>s(!0);pt(c=>k(r,()=>o()?c():i()(),null)),$e(()=>{F.context?queueMicrotask(a):a()})}else{const o=Di(e.isSVG?"g":"div",e.isSVG),s=t&&o.attachShadow?o.attachShadow({mode:"open"}):o;Object.defineProperty(o,"host",{get(){return n.parentNode}}),k(s,i()),r.appendChild(o),e.ref&&e.ref(o),$e(()=>r.removeChild(o))}return n}function Kn(e){const[t,n]=Wn(e,["component"]),r=W(()=>t.component);return W(()=>{const i=r();switch(typeof i){case"function":return Ie(()=>i(n));case"string":const o=bs.has(i),s=F.context?Ps():Di(i,o);return Fe(s,n,o),s}})}var Rs=`@vertex
fn vert(@builtin(vertex_index) VertexIndex: u32) -> @builtin(position) vec4<f32> {
    var pos = array<vec2<f32>, 4>(
        vec2<f32>(-1.0, -1.0),
        vec2<f32>(-1.0, 1.0),
        vec2<f32>(1.0, -1.0),
        vec2<f32>(1.0, 1.0),
    );

    return vec4<f32>(pos[VertexIndex], 0.0, 1.0);
}
`,Ls=`
struct Uniforms {
    resolution: vec2<i32>,
    resolutionPressure: vec2<i32>,
    resolutionDisplay: vec2<i32>,
};
@group(0) @binding(0) var<uniform> u : Uniforms;

@group(1) @binding(0) var dye : texture_2d<f32>;
@group(1) @binding(1) var pressure : texture_2d<f32>;
@group(1) @binding(2) var velocity : texture_2d<f32>;

fn clamp01(v: f32) -> f32 {
    return clamp(v, 0.0, 1.0);
}

fn clamp01v3(v: vec3<f32>) -> vec3<f32> {
    return clamp(v, vec3<f32>(0.0), vec3<f32>(1.0));
}

fn hue2rgb(hue: f32) -> vec3<f32> {
    var huee = hue;
    huee = fract(hue);
    return vec3<f32>(
        clamp01(abs(hue * 6.0 - 3.0) - 1.0),
        clamp01(2. - abs(hue * 6.0 - 2.0)),
        clamp01(2. - abs(hue * 6.0 - 4.0))
    );
}

// HSV (hue, saturation, value) to RGB.
// Sources: https://gist.github.com/yiwenl/745bfea7f04c456e0101, https://gist.github.com/sugi-cho/6a01cae436acddd72bdf
fn hsv2rgb(c: vec3<f32>) -> vec3<f32> {
    var K = vec4<f32>(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    return c.z * mix(K.xxx, clamp01v3(abs(fract(c.x + K.xyz) * 6.0 - K.w) - K.x), c.y);
}



// @fragment
// fn display(@builtin(position) coords: vec4<f32>) -> @location(0) vec4<f32> {
//     var ppD = textureLoad(dye, vec2<i32>(coords.xy * pow(0.5, f32(u.downsample))), 0).xyz;
//     var exists = existe(vec2<i32>(coords.xy * pow(0.5, f32(u.downsample))));
//     if (exists < 1.0) {
//         return vec4<f32>(0.0, 0.0, 0.0, 1.0);
//     }
//     var ppV = textureLoad(velocity, vec2<i32>(coords.xy * pow(0.5, f32(u.downsample))), 0).xy;
//     var pp = sampleP(vec2<i32>(coords.xy * pow(0.5, f32(u.downsample))), vec2<i32>(coords.xy * pow(0.5, f32(u.downsample))));
//     var ppL = sampleP(vec2<i32>(coords.xy * pow(0.5, f32(u.downsample))) - vec2<i32>(1, 0), vec2<i32>(coords.xy * pow(0.5, f32(u.downsample))) + vec2<i32>(0, 0));
//     var ppT = sampleP(vec2<i32>(coords.xy * pow(0.5, f32(u.downsample))) - vec2<i32>(0, 1), vec2<i32>(coords.xy * pow(0.5, f32(u.downsample))) + vec2<i32>(0, 0));
//     var D3C = vec3<f32>(-vec2<f32>(0, 0), pp);
//     var D3L = vec3<f32>(-vec2<f32>(1, 0), ppL);
//     var D3T = vec3<f32>(-vec2<f32>(0, 1), ppT);
//     var norm = normalize(cross(D3L - D3C, D3T - D3C));
//     var bri = ((dot(norm, normalize(vec3<f32>(-1.0, -1.0, 1.0)))) / 2.0 * 1.5 + 0.75);
//     return vec4<f32>((ppD + hsv2rgb(vec3<f32>(bri * atan2(ppV.y, ppV.x) / atan2(1.0, 0.0) / 4.0, 1.0, length(vec2<f32>(ppV.y, ppV.x) / 60.0))) * bri * 0.05), 1.0);
// }



let BUMP = 1.0;

fn D(uv: vec2<f32>, d: vec2<f32>, mip: i32) -> f32 {
    // return length(textureSampleSmooth(velocity, vec2<f32>((uv + (d+0.0)) * vec2<f32>(u.resolution.xy)), mip).xy);
    // return sin(dot(vec2<f32>((uv + (d+0.0)) * vec2<f32>(u.resolution.xy)), textureSampleSmooth(velocity, vec2<f32>((uv + (d+0.0)) * vec2<f32>(u.resolution.xy)), mip).xy)*0.001);
    var  vv = textureSampleSmooth(velocity, vec2<f32>((uv + (d + 0.0)) * vec2<f32>(u.resolution.xy)), u.resolution).xy;
    var pp = textureSampleSmooth(pressure, vec2<f32>((uv + (d + 0.0)) * vec2<f32>(u.resolutionPressure)), u.resolutionPressure).x;
    var nvv = gradient(uv);
    return -1.0 * 0.1 * (length(nvv - vv) );//*length(textureSampleSmooth(velocity, vec2<f32>((uv + (d+0.0)) * vec2<f32>(u.resolution.xy)), mip).xy);
}

fn diff(uv: vec2<f32>, mip: i32) -> vec3<f32> {
    var texel = 1.0 / vec2<f32>(u.resolution.xy);
    var t = f32(pow(2.0, f32(mip))) * vec4<f32>(texel, -texel.y, 0);

    var d = D(uv, t.ww, mip); var d_n = D(uv, t.wy, mip); var d_e = D(uv, t.xw, mip);
    var d_s = D(uv, t.wz, mip); var d_w = D(uv, -t.xw, mip); var d_nw = D(uv, -t.xz, mip);
    var d_sw = D(uv, -t.xy, mip); var d_ne = D(uv, t.xy, mip); var d_se = D(uv, t.xz, mip);
    var ddd = vec3<f32>(1.0, 1.0, 1.0);
    return normalize(cross(vec3<f32>(t.xw * vec2<f32>(u.resolution.xy), d_e - d) * ddd, vec3<f32>(t.wz * vec2<f32>(u.resolution.xy), d_s - d) * ddd)).xyz;
    // vec2<f32>(
    //     0.5 * (d_e - d_w) + 0.25 * (d_ne - d_nw + d_se - d_sw),
    //     0.5 * (d_n - d_s) + 0.25 * (d_ne + d_nw - d_se - d_sw)
    // );
}

fn contrast(col: vec4<f32>, x: f32) -> vec4<f32> {
    return x * (col - 0.5) + 0.5;
}


// fn smoothClamp(x:f32,  a:f32, b:f32)-> f32
// {
//     var t = clamp(x, a, b);
//     if(t != x){
//         return t;
//     }
//     return b + (a - b)/(1. + exp((b - a)*(2.*x - a - b)/((x - a)*(b - x))));
// }

// fn softClamp(x:f32,  a:f32, b:f32)-> f32
// {
//  	var mid = (a + b)*0.5;
//     return mid + smoothClamp((x - mid)*0.5, a - mid, b - mid);
// }


// Only used for rendering, but useful helpers
fn softmax(a: f32, b: f32, k: f32) -> f32 {
    return log(exp(k * a) + exp(k * b)) / k;
}

fn softmin(a: f32, b: f32, k: f32) -> f32 {
    return -log(exp(-k * a) + exp(-k * b)) / k;
}

fn softmax4(a: vec4<f32>, b: vec4<f32>, k: f32) -> vec4<f32> {
    return log(exp(k * a) + exp(k * b)) / k;
}

fn softmin4(a: vec4<f32>, b: vec4<f32>, k: f32) -> vec4<f32> {
    return -log(exp(-k * a) + exp(-k * b)) / k;
}

fn softclamp(a: f32, b: f32, x: f32, k: f32) -> f32 {
    return (softmin(b, softmax(a, x, k), k) + softmax(a, softmin(b, x, k), k)) / 2.0;
}

fn softclamp4(a: vec4<f32>, b: vec4<f32>, x: vec4<f32>, k: f32) -> vec4<f32> {
    return (softmin4(b, softmax4(a, x, k), k) + softmax4(a, softmin4(b, x, k), k)) / 2.0;
}

fn softclamp42(a: f32, b: f32, x: vec4<f32>, k: f32) -> vec4<f32> {
    return (softmin4(vec4<f32>(b), softmax4(vec4<f32>(a), x, k), k) + softmax4(vec4<f32>(a), softmin4(vec4<f32>(b), x, k), k)) / 2.0;
}


// GGX from Noby's Goo shader https://www.shadertoy.com/view/lllBDM

// MIT License: https://opensource.org/licenses/MIT
fn G1V(dnv: f32, k: f32) -> f32 {
    return 1.0 / (dnv * (1.0 - k) + k);
}

fn ggx(n: vec3<f32>, v: vec3<f32>, l: vec3<f32>, rough: f32, f0: f32) -> f32 {
    var alpha = rough * rough;
    var h = normalize(v + l);
    var dnl = clamp(dot(n, l), 0.0, 1.0);
    var dnv = clamp(dot(n, v), 0.0, 1.0);
    var dnh = clamp(dot(n, h), 0.0, 1.0);
    var dlh = clamp(dot(l, h), 0.0, 1.0);
    var f:f32;
    var d:f32;
    var vis : f32;
    var asqr = alpha * alpha;
    let pi:f32 = 3.14159;
    var den = dnh * dnh * (asqr - 1.0) + 1.0;
    d = asqr / (pi * den * den);
    dlh = pow(1.0 - dlh, 5.0);
    f = f0 + (1.0 - f0) * dlh;
    var k = alpha / 1.0;
    vis = G1V(dnl, k) * G1V(dnv, k);
    var  spec = dnl * d * f * vis;
    return spec;
}
// End Noby's GGX


// Modified from Shane's Bumped Sinusoidal Warp shadertoy here:
// https://www.shadertoy.com/view/4l2XWK
struct LL {
    ld: vec3<f32>,
    avd: vec3<f32>,
};
let iTime=0.0;
fn light(uv: vec2<f32>, BUMP: f32, SRC_DIST: f32, norm: vec3<f32>, iTime: f32, avd: vec3<f32>) -> LL {
    var sp = vec3<f32>(uv - 0.5, 0);
    var light = vec3<f32>(cos(iTime / 2.0) * 0.5, sin(iTime / 2.0) * 0.5, -SRC_DIST);
    var ld = light - sp;
    var lDist = max(length(ld), 0.001);
    ld /= lDist;
    var l:LL;
    l.ld = ld;
    l.avd = reflect(normalize(norm), vec3<f32>(0, 1, 0));
    return l;
}
// End Shane's bumpmapping section


fn figgle(vv: vec2<i32>, resg: vec2<i32>) -> vec2<i32> {
    return (vv % vec2<i32>(resg.xy) + vec2<i32>(resg.xy)) % vec2<i32>(resg.xy);
}
fn textureSampleSmooth(ac: texture_2d<f32>, uv: vec2<f32>, res: vec2<i32>) -> vec4<f32> {
    var inn = uv - 0.5;
    var tl = vec2<i32>(floor(inn));
    var br = vec2<i32>(floor(inn) + 1.0);
    var TL_S = figgle(tl.xy, res);
    var TR_S = figgle(vec2<i32>(br.x, tl.y), res);
    var BL_S = figgle(vec2<i32>(tl.x, br.y), res);
    var BR_S = figgle(br.xy, res);
    return (textureLoad(ac, TL_S, 0) * (f32(br.x) - inn.x)+ textureLoad(ac, TR_S, 0) * (inn.x - f32(tl.x))) * (f32(br.y) - inn.y) + (textureLoad(ac, BL_S, 0) * (f32(br.x) - inn.x) + textureLoad(ac, BR_S, 0) * (inn.x - f32(tl.x))) * (inn.y - f32(tl.y)
     );
}
fn sampleP(coord: vec2<f32>, coordo: vec2<f32>, exists2: f32) -> f32 {
    var q = textureSampleSmooth(pressure, vec2<f32>(coord)/ vec2<f32>(u.resolution.xy)*vec2<f32>(u.resolutionPressure), u.resolutionPressure).x;
     var ov=vec2<f32>(coord);
        var res=u.resolution;
        var inn = ov - 0.5;
    var tl = vec2<i32>(floor(inn));
    var br = vec2<i32>(floor(inn) + 1.0);
    var TL_S = vec2<i32>(tl.xy);
    var TR_S = vec2<i32>(vec2<i32>(br.x, tl.y));
    var BL_S = vec2<i32>(vec2<i32>(tl.x, br.y));
    var BR_S = vec2<i32>(br.xy);
    //     if (!((jjexiste(TL_S) == jjexiste(vec2<i32>(coordo))) && (jjexiste(TR_S) == jjexiste(vec2<i32>(coordo))) && (jjexiste(BL_S) == jjexiste(vec2<i32>(coordo))) && (jjexiste(BR_S) == jjexiste(vec2<i32>(coordo))))) {
      
    //     q = textureSampleSmooth(pressure, vec2<f32>(coordo)/ vec2<f32>(u.resolution.xy)*vec2<f32>(u.resolutionPressure), u.resolutionPressure).x;
    // }
    return q;
}


fn jexiste(uv: vec2<f32>) -> f32 {
    return existe(vec2<i32>((floor(uv*vec2<f32>(u.resolutionPressure))+0.5)/vec2<f32>(u.resolutionPressure)*vec2<f32>(u.resolution)));
}

fn jjexiste(uvc: vec2<i32>) -> f32 {
    return jexiste((vec2<f32>(uvc)+0.5)/vec2<f32>(u.resolution));
}


fn gradient(coords: vec2<f32>) -> vec2<f32> {
    var uv = vec2<f32>(coords.xy);
    var e:f32 = existe(vec2<i32>(uv));
    var  ra = vec2<f32>(u.resolution.xy)/vec2<f32>(u.resolutionPressure.xy);
    var pL = sampleP(vec2<f32>(vec2<f32>(coords.xy)) - vec2<f32>(1, 0)*ra, vec2<f32>(vec2<f32>(uv)) + vec2<f32>(0, 0),e);
    var pR = sampleP(vec2<f32>(vec2<f32>(coords.xy)) + vec2<f32>(1, 0)*ra, vec2<f32>(vec2<f32>(uv)) - vec2<f32>(0, 0),e);
    var pB = sampleP(vec2<f32>(vec2<f32>(coords.xy)) + vec2<f32>(0, 1)*ra, vec2<f32>(vec2<f32>(uv)) - vec2<f32>(0, 0),e);
    var pT = sampleP(vec2<f32>(vec2<f32>(coords.xy)) - vec2<f32>(0, 1)*ra, vec2<f32>(vec2<f32>(uv)) + vec2<f32>(0, 0),e);
    var pC = sampleP(vec2<f32>(vec2<f32>(coords.xy)) - vec2<f32>(0, 0)*ra, vec2<f32>(vec2<f32>(uv)) + vec2<f32>(0, 0),e);
    var v = textureLoad(velocity, vec2<i32>(uv), 0).xy;
    var exists = 1.0;//existe(vec2<i32>(uv));
    return exists * (v - vec2<f32>(pR - pL, pB - pT));
}


@fragment
fn display(@builtin(position) fragCoord: vec4<f32>) -> @location(0) vec4<f32> {
    var uv = fragCoord.xy / vec2<f32>(u.resolutionDisplay.xy);
    var coord = vec2<i32>(uv.xy * vec2<f32>(u.resolution.xy));
    var ppD = textureSampleSmooth(dye, vec2<f32>(uv.xy * vec2<f32>(u.resolution.xy)), u.resolution.xy).xyz;
    var ppV = textureSampleSmooth(velocity, vec2<f32>(fragCoord.xy / vec2<f32>(u.resolutionDisplay.xy) * vec2<f32>(u.resolution.xy)), u.resolution.xy).xy;
    var exists:f32 = existe(vec2<i32>(uv.xy * vec2<f32>(u.resolution.xy)));
    // if (exists < 1.0) {
    //     return vec4<f32>(0.0, 0.0, 0.0, 1.0);
    // }
    var dxy = vec3<f32>(0);
    var occ = 0.0;
    var mip = 0;
    var d = D(uv, vec2<f32>(0.0), mip);
    
    // blur the gradient to reduce appearance of artifacts,
    // and do cheap occlusion with mipmaps
    let  STEPS = 1;
    let  ODIST = 0.0001;
    for (mip = 1; mip <= STEPS; mip += 1) {
        if (mip == 1) {
            dxy += (1.0 / pow(2.0, f32(mip))) * diff(uv, mip - 1);
        }
    }
    var mip2 = 1;
    var wi = 0.0;
    var vis = 0.0;
    var spv = 0.0;
    let RA = 3;
    
    // occ=D(uv,vec2<f32>(0.0), 0);//vis/wi;
    // dxy=vec2<f32>(-1.0,0.0);
    
    // I think this looks nicer than using smoothstep
    // occ = pow(max(0.0,softclamp(0.2,0.8,100.0*occ + 0.5,1.0)),0.5);
    var avd:vec3<f32>;
    var ldq: LL = light(uv, BUMP, 0.5, normalize(dxy), iTime, avd);
    var ld = ldq.ld;
    avd = ldq.avd;

    for (mip = -RA; mip <= RA; mip += 1) {
        for (mip2 = -RA; mip2 <= RA; mip2 += 1) {
            var jm = vec2<f32>(f32(mip), f32(mip2));
            var lnnn = length(jm);
            if (lnnn > 0.0) {
                var kk = pow(2.0, lnnn);
                var www = 1.0 / kk;
                wi += www;
                var ang = atan2(max(D(uv, jm / vec2<f32>(u.resolution.xy), 0) - D(uv, vec2<f32>(0.0), 0), 0.0), lnnn);
                var val = pow(1.0 - ang / atan2(1.0, 0.0), 0.25);// not sure what power should be

                vis += www * val;
                var lang = atan2(max(ld.z, 0.0), length(ld.xy));
                var poang = max(lang, ang);

                val = max(0.0, -cos(lang - poang) * dot(normalize(ld.xy), normalize(vec3<f32>(jm, 1.0).xy)));
                spv += www * pow(val, 1.0);
        // occ += max(0.0,min(1.0,0.5+0.0001*(D(uv, vec2<f32>(0.0), 0) - D(uv,jm/vec2<f32>(u.resolution.xy), 0))/lnnn))/kk/2.0;
            }// occ += 1.0+min((D(uv, vec2<f32>(0.0), 0) - D(uv,vec2<f32>(0.0,-f32(mip)), 0))/kk/4.0,0.0);
        // occ += min((D(uv, vec2<f32>(0.0), 0) - D(uv,vec2<f32>(0.0,f32(mip)).yx, 0))/kk/4.0,0.0);
        // occ += min((D(uv, vec2<f32>(0.0), 0) - D(uv,vec2<f32>(0.0,-f32(mip)).yx, 0))/kk/4.0,0.0);
    	//softclamp(0.0 - ODIST, ODIST, d - D(uv,vec2<f32>(0.0), mip), 1.0) / (pow(1.5, f32(mip)));
        }
    }
    // dxy /= f32(STEPS);
    occ = 0.1 + occ / 3.0;// - 1.0/(8.0-occ*8.0);
    occ = vis / wi;
    spv = spv / wi;
   // spv=0.0;

    var spec = ggx(avd, vec3<f32>(0, 1, 0), ld, 0.2, 0.2) * pow(0.1 / 0.2, 2.0);
    let LOG_SPEC = 10.0;
    spec = (log(LOG_SPEC + 1.0) / LOG_SPEC) * log(1.0 + LOG_SPEC * spec);

    var diffuse = vec4<f32>(ppD, 1.0);// softclamp42(0.0,1.0,6.0*vec4(texture(iChannel0,uv).xy,0,0)+0.5,2.0);    
    diffuse += vec4<f32>(hsv2rgb(vec3<f32>(atan2(ppV.y, ppV.x) / atan2(1.0, 0.0) / 4.0, 1.0, 0.5 * min(1.0, length(vec2<f32>(ppV.y, ppV.x)) / 60.0))), 0.0) * 0.0;
    if (exists < 1.0) {
        // return vec4<f32>(vec3<f32>(0.0),1.0);
        // diffuse=vec4<f32>(vec3<f32>(0.25),1.0);
    } else {
        // diffuse=vec4<f32>(vec3<f32>(0.25),1.0);
    }
    // diffuse=vec4<f32>(vec3<f32>(-d/100.0),1.0);

    var fragColor = vec4<f32>(diffuse);//(diffuse*0.2/2.0 + 16.0*mix(vec4<f32>(spec),1.5*diffuse*spec,0.8))*10.0;
    var vv = textureSampleSmooth(velocity, vec2<f32>((uv + (d + 0.0)) * vec2<f32>(u.resolution.xy)), u.resolution).xy;
    var nvv = gradient(uv);
    var pp = textureSampleSmooth(pressure, vec2<f32>((uv + (d + 0.0)) * vec2<f32>(u.resolutionPressure.xy)), u.resolutionPressure).x;
    fragColor = (diffuse) * (spv * 0.0 + occ) + 100.0 * spec;//vec4<f32>((  nvv - vv).x*0.00000001,0.0*length(vv)*0.000000000001,0.0,0.0);//vec4<f32>(dxy/2.0+0.5,1.0);//occ * (diffuse*0.0+1.0) + spec*100.0;//vec4<f32>(ppD.xyz*0.0+1.0,1.0);//(softclamp42(0.0,1.0,contrast(fragColor,4.5),3.0));


    // fragColor = diffuse*(0.2+spec*10.0);

    // var dir = vec2<i32>(1, 0);
    // var fl=vec2<f32>(0.0);
    // for(var o=0;o<4;o+=1){

        
    //     var ff2 = textureLoad(velocity, coord+dir, 0).xy;//sampleVelocity(coord + dir,coord);
    //     if(existe(coord + dir)<1.0){
    //         ff2=-textureLoad(velocity, coord, 0).xy;
    //     }
      
    //     var inflow=dot(ff2.xy,-vec2<f32>(dir));
       
    //     fl.x+=inflow/2.0;
    //     dir=vec2<i32>(-dir.y, dir.x);
    // }
    // fragColor=vec4<f32>(abs(d/10.0));
    return fragColor;
    //fragColor = vec4(occ);
    //fragColor = vec4(spec);
    //fragColor = diffuse;
    //fragColor = vec4(diffuse+(occ-0.5));
}

// @fragment
// fn display(@builtin(position) coords: vec4<f32>) -> @location(0) vec4<f32> {
//     var ppD = textureLoad(dye, vec2<i32>(coords.xy * pow(0.5, f32(u.downsample))), 0).xyz;
//     var exists = existe(vec2<i32>(coords.xy * pow(0.5, f32(u.downsample))));
//     if (exists < 1.0) {
//         return vec4<f32>(0.0, 0.0, 0.0, 1.0);
//     }
//     var ppV = textureLoad(velocity, vec2<i32>(coords.xy * pow(0.5, f32(u.downsample))), 0).xy;
//     var pp = sampleP(vec2<i32>(coords.xy * pow(0.5, f32(u.downsample))), vec2<i32>(coords.xy * pow(0.5, f32(u.downsample))));
//     var ppL = sampleP(vec2<i32>(coords.xy * pow(0.5, f32(u.downsample))) - vec2<i32>(1, 0), vec2<i32>(coords.xy * pow(0.5, f32(u.downsample))) + vec2<i32>(0, 0));
//     var ppT = sampleP(vec2<i32>(coords.xy * pow(0.5, f32(u.downsample))) - vec2<i32>(0, 1), vec2<i32>(coords.xy * pow(0.5, f32(u.downsample))) + vec2<i32>(0, 0));
//     var D3C = vec3<f32>(-vec2<f32>(0, 0), pp);
//     var D3L = vec3<f32>(-vec2<f32>(1, 0), ppL);
//     var D3T = vec3<f32>(-vec2<f32>(0, 1), ppT);
//     var norm = normalize(cross(D3L - D3C, D3T - D3C));
//     var bri = ((dot(norm, normalize(vec3<f32>(-1.0, -1.0, 1.0)))) / 2.0 * 1.5 + 0.75);
//     return vec4<f32>((ppD + hsv2rgb(vec3<f32>(bri * atan2(ppV.y, ppV.x) / atan2(1.0, 0.0) / 4.0, 1.0, length(vec2<f32>(ppV.y, ppV.x) / 60.0))) * bri * 0.05), 1.0);
// }
`,Ns=`struct Uniforms {
    resolution: vec2<i32>,
    resolutionPressure: vec2<i32>,
    resolutionDisplay: vec2<i32>,
    timestep: f32,
};
@group(0) @binding(0) var<uniform> u : Uniforms;

@group(1) @binding(0) var dye : texture_2d<f32>;
@group(1) @binding(1) var velocity : texture_2d<f32>;
@group(1) @binding(2) var pressure : texture_2d<f32>;


let dyeDissipation = 1.0;
let velocityDissipation = 1.0;//0.75;
let color = vec4<f32>(vec3<f32>(0.0), 1.0);

struct Output {
    @location(0) dye: vec4<f32>,
    @location(1) velocity: vec2<f32>,
    // @location(2) pressure: f32,
}

fn figgle(vv: vec2<i32>, resg: vec2<i32>) -> vec2<i32> {
    return (vv % vec2<i32>(resg.xy) + vec2<i32>(resg.xy)) % vec2<i32>(resg.xy);
}

fn textureNLoad(ac: texture_2d<f32>, ack:vec2<i32>, bc:vec2<i32>) -> vec4<f32> {
    
    var existsTL :f32 = existe(vec2<i32>(ack));
    var exists2 :f32 = existe(vec2<i32>(bc));
    if(exists2==existsTL){
        return textureLoad(ac, ack, 0);
    }
     return textureLoad(ac, bc, 0)*0.0;
}
fn textureSampleSmooth(ac: texture_2d<f32>, uv: vec2<f32>, res: vec2<i32>, bc:vec2<i32>) -> vec4<f32> {
    var inn = uv - 0.5;
    var tl = vec2<i32>(floor(inn));
    var br = vec2<i32>(floor(inn) + 1.0);
    var TL_S = figgle(tl.xy, res);
    var TR_S = figgle(vec2<i32>(br.x, tl.y), res);
    var BL_S = figgle(vec2<i32>(tl.x, br.y), res);
    var BR_S = figgle(br.xy, res);
    
    
    return (textureLoad(ac, TL_S, 0) * (f32(br.x) - inn.x)+ textureLoad(ac, TR_S, 0) * (inn.x - f32(tl.x))) * (f32(br.y) - inn.y) + (textureLoad(ac, BL_S, 0) * (f32(br.x) - inn.x) + textureLoad(ac, BR_S, 0) * (inn.x - f32(tl.x))) * (inn.y - f32(tl.y)
     );
}

fn jexiste(uv: vec2<f32>) -> f32 {
    return existe(vec2<i32>((floor(uv*vec2<f32>(u.resolutionPressure))+0.5)/vec2<f32>(u.resolutionPressure)*vec2<f32>(u.resolution)));
}

fn jjexiste(uvc: vec2<i32>) -> f32 {
    return jexiste((vec2<f32>(uvc)+0.5)/vec2<f32>(u.resolution));
}

@fragment
fn advect(@builtin(position) coords: vec4<f32>) -> Output {
    let timestep = u.timestep/1.0;
    var coord = vec2<i32>(coords.xy - 0.5);
    var pos = coords.xy - timestep * textureLoad(velocity, vec2<i32>(coord), 0).xy;
    var exists :f32 = existe(coord);
    var startDye = textureSampleSmooth(dye, pos,u.resolution,coord);
    var startVelocity = textureSampleSmooth(velocity, pos,u.resolution,coord).xy;
    var out: Output;
    out.dye = ((color - startDye) * (1.0 - pow(dyeDissipation, timestep)) + startDye);
    out.velocity = startVelocity * pow(velocityDissipation, timestep);
   var ov=vec2<f32>(pos);
        var res=u.resolution;
        var inn = ov - 0.5;
    var tl = vec2<i32>(floor(inn));
    var br = vec2<i32>(floor(inn) + 1.0);
    var TL_S = vec2<i32>(tl.xy);
    var TR_S = vec2<i32>(vec2<i32>(br.x, tl.y));
    var BL_S = vec2<i32>(vec2<i32>(tl.x, br.y));
    var BR_S = vec2<i32>(br.xy);
        if (!((jjexiste(TL_S) == jjexiste(vec2<i32>(coord))) && (jjexiste(TR_S) == jjexiste(vec2<i32>(coord))) && (jjexiste(BL_S) == jjexiste(vec2<i32>(coord))) && (jjexiste(BR_S) == jjexiste(vec2<i32>(coord))))) {
      
        out.dye=textureSampleSmooth(dye, coords.xy,u.resolution,coord)*0.0;
        out.velocity=textureSampleSmooth(velocity, coords.xy,u.resolution,coord).xy*0.0;
    }
    // out.pressure= startPressure;
    // var exists = existe(coord);
    // out.velocity *= exists;
    // if (exists < 1.0) {
    //     out.dye = vec4<f32>(1.0);
    // }
    return out;
}


// struct Uniforms {
//     resolution: vec2<i32>,
//     timestep: f32,
// };
// @group(0) @binding(0) var<uniform> u : Uniforms;

// @group(1) @binding(0) var dye : texture_2d<f32>;
// @group(1) @binding(1) var velocity : texture_2d<f32>;

// let dyeDissipation = 1.0;
// let velocityDissipation = 1.0;//0.75;
// let color = vec4<f32>(vec3<f32>(0.0), 1.0);

// struct Output {
//     @location(0) dye: vec4<f32>,
//     @location(1) velocity: vec2<f32>,
// }

// fn textureLoadFalloof(a: texture_2d<f32>, coord: vec2<i32>, e:f32) -> vec4<f32> {
//     var exists = existe(((coord) % u.resolution.xy+u.resolution.xy)% u.resolution.xy);
//     var q = textureLoad(a, ((coord) % u.resolution.xy+u.resolution.xy)% u.resolution.xy, 0);
//     if(exists == e) {
//         return q;
//     }
//     return q * 0.0;
// }

// fn textureSampleSmooth(a: texture_2d<f32>, uvv: vec2<f32>, e:f32) -> vec4<f32> {
//     var uv = uvv;
//     // var exists = existe(vec2<i32>(uv));
//     var inn = uv - 0.5;
//     var tl = vec2<i32>(floor(inn));
//     var br = vec2<i32>(floor(inn) + 1.0);
//     return  (
//         (textureLoadFalloof(a, tl.xy,e) * (f32(br.x) - inn.x) + textureLoadFalloof(a, vec2<i32>(br.x, tl.y),e) * (inn.x - f32(tl.x))) * (f32(br.y) - inn.y) + // newline
//         (textureLoadFalloof(a, vec2<i32>(tl.x, br.y),e) * (f32(br.x) - inn.x) + textureLoadFalloof(a, br.xy,e) * (inn.x - f32(tl.x))) * (inn.y - f32(tl.y))
//     );
// }


fn sampleVelocity(coord: vec2<i32>,coordo: vec2<i32>) -> vec3<f32> {
   
    var exists = existe((coord % u.resolution.xy+u.resolution.xy)% u.resolution.xy);
    var q = textureLoad(velocity, (coord % u.resolution.xy+u.resolution.xy)% u.resolution.xy, 0).xy;
//     if(exists<1.0){
// q=-textureLoad(velocity, coordo, 0).xy;
//     }
    // exists = 1.0;
    return vec3<f32>(q*exists , exists);
}

// @fragment
// fn advect(@builtin(position) coords: vec4<f32>) -> Output {
//     let timestep = u.timestep/100.0;
//     var coord = vec2<i32>(coords.xy - 0.5);
//     var pos = coords.xy - timestep * textureLoad(velocity, vec2<i32>(coord), 0).xy;
//     var posD = coords.xy - timestep * textureLoad(velocity, vec2<i32>(coord), 0).xy;
//     var exists = existe(coord);
//     var startDye = textureSampleSmooth(dye, posD,exists);
//     var startVelocity = textureSampleSmooth(velocity, pos,exists).xy;

//     var mDye = textureLoad(dye, (coord),0);
//     var mVelocity = textureLoad(velocity, (coord),0).xy;
//     var out: Output;
//     out.dye = mDye;//((color - startDye) * (1.0 - pow(dyeDissipation, u.timestep)) + startDye);
//     out.velocity = mVelocity;//startVelocity * pow(velocityDissipation, u.timestep);

//     // var coord = vec2<i32>(coords.xy);
//     // left, right, bottom, and top pressure samples
    


//     // evaluate Jacobi iteration
//     // sum.x += C * dd;
//     // sum.y += dd;
//     // if (sum.y < 1.0 || existe(coord)<1.0) {
//     //     return 0.0;
//     // }
//     // if(existe(coord -  vec2<i32>(1, 0))<1.0){
//     //     return 
//     // }
//     var dir = vec2<i32>(1, 0);
//     var fl=vec2<f32>(0.0);
//     var flowO=0.0;
//     for(var o=0;o<4;o+=1){

//         var ff2 = (textureLoad(velocity, ((coord+dir) % u.resolution.xy+u.resolution.xy)% u.resolution.xy, 0).xy+textureLoad(velocity, ((coord) % u.resolution.xy+u.resolution.xy)% u.resolution.xy, 0).xy)/2.0;//sampleVelocity(coord + dir,coord);
//         var oDye = textureLoad(dye, (((coord+dir) % u.resolution.xy+u.resolution.xy)% u.resolution.xy) ,0).xyzw;
//         var oVelocity = textureLoad(velocity,( ((coord+dir) % u.resolution.xy+u.resolution.xy)% u.resolution.xy),0).xy;
        
//         if(existe(coord + dir)!=existe(coord )){
//             ff2=-textureLoad(velocity, ((coord) % u.resolution.xy+u.resolution.xy)% u.resolution.xy, 0).xy*0.0;
           
//         }
//         // if(existe(coord )<1.0 && o==0){
//         //     ff2=textureLoad(velocity, coord + dir, 0).xy*0.0;
//         //     ff=textureLoad(pressure, coord + dir, 0).x;
//         // }
//         var inflow=dot(ff2.xy * timestep,-vec2<f32>(dir));
//          inflow=max(-1.0,min(inflow,1.0));
//         // inflow+=(ff-textureLoad(pressure, ((coord) % u.resolution.xy+u.resolution.xy)% u.resolution.xy, 0).x);
//        flowO+=inflow;
//         out.dye+=max(inflow,0.0)*oDye-max(-inflow,0.0)*mDye;
//         out.velocity+=max(inflow,0.0)*oVelocity-max(-inflow,0.0)*mVelocity;
//         // fl.x+=ff;

//         dir=vec2<i32>(-dir.y, dir.x);
//     }
//      out.dye+=-max(flowO,0.0)*mDye;
//         out.velocity+=-max(flowO,0.0)*mVelocity;
//     // out.velocity.x=max(-10.0,min(out.velocity.x,10.0));
//     // out.velocity.y=max(-10.0,min(out.velocity.y,10.0));
//     // var exists = existe(coord);
//     // out.velocity *= exists;
//     // if (exists < 1.0) {
//     //     out.dye = vec4<f32>(1.0);
//     // }
//     return out;
// }
`,js=`struct Uniforms {
    resolution: vec2<i32>,
};
@group(0) @binding(0) var<uniform> u : Uniforms;

@group(1) @binding(0) var pressure : texture_2d<f32>;

@fragment
fn clear(@builtin(position) coords: vec4<f32>) -> @location(0) f32 {
    return 0.8 * textureLoad(pressure, vec2<i32>(coords.xy), 0).x;
}
`,Ds=`struct Uniforms {
    resolution: vec2<i32>,
};
@group(0) @binding(0) var<uniform> u : Uniforms;

@group(1) @binding(0) var pressure : texture_2d<f32>;

@fragment
fn clear(@builtin(position) coords: vec4<f32>) -> @location(0) f32 {
    return 1.0 * textureLoad(pressure, vec2<i32>(coords.xy - 0.5), 0).x*0.5;
}
`,As=`struct Uniforms {
    resolution: vec2<i32>,
    resolutionPressure: vec2<i32>,
    resolutionDisplay: vec2<i32>,
};
@group(0) @binding(0) var<uniform> u : Uniforms;

@group(1) @binding(0) var velocity : texture_2d<f32>;

fn figgle(vv: vec2<i32>, resg: vec2<i32>) -> vec2<i32> {
    return (vv % vec2<i32>(resg.xy) + vec2<i32>(resg.xy)) % vec2<i32>(resg.xy);
}
fn textureSampleSmooth(ac: texture_2d<f32>, uv: vec2<f32>, res: vec2<i32>) -> vec4<f32> {
    var inn = uv - 0.5;
    var tl = vec2<i32>(floor(inn));
    var br = vec2<i32>(floor(inn) + 1.0);
    var TL_S = figgle(tl.xy, res);
    var TR_S = figgle(vec2<i32>(br.x, tl.y), res);
    var BL_S = figgle(vec2<i32>(tl.x, br.y), res);
    var BR_S = figgle(br.xy, res);
    return (textureLoad(ac, TL_S, 0) * (f32(br.x) - inn.x)+ textureLoad(ac, TR_S, 0) * (inn.x - f32(tl.x))) * (f32(br.y) - inn.y) + (textureLoad(ac, BL_S, 0) * (f32(br.x) - inn.x) + textureLoad(ac, BR_S, 0) * (inn.x - f32(tl.x))) * (inn.y - f32(tl.y)
     );
}



fn jexiste(uv: vec2<f32>) -> f32 {
    return existe(vec2<i32>((floor(uv*vec2<f32>(u.resolutionPressure))+0.5)/vec2<f32>(u.resolutionPressure)*vec2<f32>(u.resolution)));
}

fn jjexiste(uvc: vec2<i32>) -> f32 {
    return jexiste((vec2<f32>(uvc)+0.5)/vec2<f32>(u.resolution));
}


@fragment
fn divergence(@builtin(position) coords: vec4<f32>) -> @location(0) f32 {
    var coord = vec2<f32>(coords.xy / vec2<f32>(u.resolutionPressure) * vec2<f32>(u.resolution));
    var cellVelocity = textureSampleSmooth(velocity, coord, u.resolution.xy).xy;
    var neighborOffset = vec2<i32>(1, 0);
    var value = 0.0;
    for (var o = 0; o < 4; o += 1) {
        var ov=vec2<f32>(coord + vec2<f32>(neighborOffset)*vec2<f32>(u.resolution.xy)/vec2<f32>(u.resolutionPressure.xy));
        var res=u.resolution;
        var inn = ov - 0.5;
    var tl = vec2<i32>(floor(inn));
    var br = vec2<i32>(floor(inn) + 1.0);
    var TL_S = vec2<i32>(tl.xy);
    var TR_S = vec2<i32>(vec2<i32>(br.x, tl.y));
    var BL_S = vec2<i32>(vec2<i32>(tl.x, br.y));
    var BR_S = vec2<i32>(br.xy);
        if ((jjexiste(TL_S) == jjexiste(vec2<i32>(coord))) && (jjexiste(TR_S) == jjexiste(vec2<i32>(coord))) && (jjexiste(BL_S) == jjexiste(vec2<i32>(coord))) && (jjexiste(BR_S) == jjexiste(vec2<i32>(coord)))) {
            var neighborVelocity = textureSampleSmooth(velocity, ov, u.resolution.xy).xy;
            value += dot((neighborVelocity + cellVelocity) / 2.0, -vec2<f32>(neighborOffset));
        } else {
            // value+=dot(-cellVelocity, -vec2<f32>(neighborOffset));
        }
        neighborOffset = vec2<i32>(-neighborOffset.y, neighborOffset.x);
    }
    return value;
}
`,Bs=`struct Uniforms {
    resolution: vec2<i32>,
    resolutionPressure: vec2<i32>,
    resolutionDisplay: vec2<i32>,
};
@group(0) @binding(0) var<uniform> u : Uniforms;

@group(1) @binding(0) var divergence : texture_2d<f32>;
// @group(1) @binding(1) var velocity : texture_2d<f32>;

@group(2) @binding(0) var pressure : texture_2d<f32>;




// fn sampleP(coord: vec2<i32>, coordo: vec2<i32>,exists2:f32) -> f32 {
//     var exists = existe(((coord) % u.resolution.xy+u.resolution.xy)% u.resolution.xy);
//     var q = textureLoad(pressure, ((coord) % u.resolution.xy+u.resolution.xy)% u.resolution.xy, 0).x;
//     if (exists !=exists2) {
//         q = textureLoad(pressure, ((coordo) % u.resolution.xy+u.resolution.xy)% u.resolution.xy , 0).x;
//     }
//     return q;
// }

// fn gradient(uv: vec2<i32>) ->  vec2<f32> {
//     var e=existe((vec2<i32>(uv)% u.resolution.xy+u.resolution.xy)% u.resolution.xy);
//     var pL = sampleP(uv - vec2<i32>(1, 0), uv + vec2<i32>(0, 0),e);
//     var pR = sampleP(uv + vec2<i32>(1, 0), uv - vec2<i32>(0, 0),e);
//     var pB = sampleP(uv + vec2<i32>(0, 1), uv - vec2<i32>(0, 0),e);
//     var pT = sampleP(uv - vec2<i32>(0, 1), uv + vec2<i32>(0, 0),e);
//     var pC = sampleP(uv - vec2<i32>(0, 0), uv + vec2<i32>(0, 0),e);
//     var v = textureLoad(velocity, (uv% u.resolution.xy+u.resolution.xy)% u.resolution.xy, 0).xy;
//     var exists = 1.0;//existe(vec2<i32>(uv));
//     return exists * (v - vec2<f32>(pR - pL, pB - pT));
// }
fn figgle(vv: vec2<i32>, resg: vec2<i32>) -> vec2<i32> {
    return (vv % vec2<i32>(resg.xy) + vec2<i32>(resg.xy)) % vec2<i32>(resg.xy);
}
fn textureSampleSmooth(ac: texture_2d<f32>, uv: vec2<f32>, res: vec2<i32>) -> vec4<f32> {
    var inn = uv - 0.5;
    var tl = vec2<i32>(floor(inn));
    var br = vec2<i32>(floor(inn) + 1.0);
    var TL_S = figgle(tl.xy, res);
    var TR_S = figgle(vec2<i32>(br.x, tl.y), res);
    var BL_S = figgle(vec2<i32>(tl.x, br.y), res);
    var BR_S = figgle(br.xy, res);
    return (textureLoad(ac, TL_S, 0) * (f32(br.x) - inn.x)+ textureLoad(ac, TR_S, 0) * (inn.x - f32(tl.x))) * (f32(br.y) - inn.y) + (textureLoad(ac, BL_S, 0) * (f32(br.x) - inn.x) + textureLoad(ac, BR_S, 0) * (inn.x - f32(tl.x))) * (inn.y - f32(tl.y)
     );
}
@fragment
fn jacobi(@builtin(position) coords: vec4<f32>) -> @location(0) f32 {
    var coord = vec2<i32>(coords.xy);
    var coord2 = vec2<i32>(coords.xy/vec2<f32>(u.resolutionPressure.xy)*vec2<f32>(u.resolution.xy));
    var UvV = coords.xy/vec2<f32>(u.resolutionPressure.xy);
    // left, right, bottom, and top pressure samples
    

    var C = textureSampleSmooth(pressure, coords.xy,  u.resolutionPressure).x;
    var tot=0.0;
    var vf=textureSampleSmooth(pressure, coords.xy, u.resolutionPressure).x;
    var e=existe(coord2);
    
    // var dir = vec2<i32>(1, 0);
    // for(var o=0;o<4;o+=1){
    //     if(existe(coord + dir)==e){
    //         tot+=textureLoad(pressure, ((coord + (dir )) % u.resolution.xy+u.resolution.xy)% u.resolution.xy,0 ).x - vf;
    //     }
    //     dir=vec2<i32>(-dir.y, dir.x);
    // }
    var dir = vec2<i32>(1, 0);
    
    for (var o = 0; o < 4; o += 1) {
        var coordi=UvV*vec2<f32>(u.resolution.xy);
        var ov=vec2<f32>(coordi + vec2<f32>(dir)*vec2<f32>(u.resolution.xy)/vec2<f32>(u.resolutionPressure.xy));
        var res=u.resolution;
        var inn = ov - 0.5;
    var tl = vec2<i32>(floor(inn));
    var br = vec2<i32>(floor(inn) + 1.0);
    var TL_S = vec2<i32>(tl.xy);
    var TR_S = vec2<i32>(vec2<i32>(br.x, tl.y));
    var BL_S = vec2<i32>(vec2<i32>(tl.x, br.y));
    var BR_S = vec2<i32>(br.xy);
        if ((existe(TL_S) == existe(vec2<i32>(coordi))) && (existe(TR_S) == existe(vec2<i32>(coordi))) && (existe(BL_S) == existe(vec2<i32>(coordi))) && (existe(BR_S) == existe(vec2<i32>(coordi)))) {
            tot+=textureSampleSmooth(pressure, ov/vec2<f32>(u.resolution.xy)*vec2<f32>(u.resolutionPressure.xy) ,u.resolutionPressure ).x - vf;
   }
        dir=vec2<i32>(-dir.y, dir.x);
    }
    
    return (C + tot * 0.25+textureLoad(divergence, coord, 0).x*0.25)*0.9999;
}
`,Ms=`struct Uniforms {
    resolution: vec2<i32>,
    resolutionPressure: vec2<i32>,
    resolutionDisplay: vec2<i32>,
};
@group(0) @binding(0) var<uniform> u : Uniforms;

@group(1) @binding(0) var pressure : texture_2d<f32>;
@group(1) @binding(1) var velocity : texture_2d<f32>;

fn figgle(vv: vec2<i32>, resg: vec2<i32>) -> vec2<i32> {
    return (vv % vec2<i32>(resg.xy) + vec2<i32>(resg.xy)) % vec2<i32>(resg.xy);
}
fn textureSampleSmooth(ac: texture_2d<f32>, uv: vec2<f32>, res: vec2<i32>) -> vec4<f32> {
    var inn = uv - 0.5;
    var tl = vec2<i32>(floor(inn));
    var br = vec2<i32>(floor(inn) + 1.0);
    var TL_S = figgle(tl.xy, res);
    var TR_S = figgle(vec2<i32>(br.x, tl.y), res);
    var BL_S = figgle(vec2<i32>(tl.x, br.y), res);
    var BR_S = figgle(br.xy, res);
    return (textureLoad(ac, TL_S, 0) * (f32(br.x) - inn.x)+ textureLoad(ac, TR_S, 0) * (inn.x - f32(tl.x))) * (f32(br.y) - inn.y) + (textureLoad(ac, BL_S, 0) * (f32(br.x) - inn.x) + textureLoad(ac, BR_S, 0) * (inn.x - f32(tl.x))) * (inn.y - f32(tl.y)
     );
}
fn sampleP(coord: vec2<f32>, coordo: vec2<f32>, exists2: f32) -> f32 {
    var q = textureSampleSmooth(pressure, vec2<f32>(coord)/ vec2<f32>(u.resolution.xy)*vec2<f32>(u.resolutionPressure), u.resolutionPressure).x;
     var ov=vec2<f32>(coord);
        var res=u.resolution;
        var inn = ov - 0.5;
    var tl = vec2<i32>(floor(inn));
    var br = vec2<i32>(floor(inn) + 1.0);
    var TL_S = vec2<i32>(tl.xy);
    var TR_S = vec2<i32>(vec2<i32>(br.x, tl.y));
    var BL_S = vec2<i32>(vec2<i32>(tl.x, br.y));
    var BR_S = vec2<i32>(br.xy);
        if (!((jjexiste(TL_S) == jjexiste(vec2<i32>(coordo))) && (jjexiste(TR_S) == jjexiste(vec2<i32>(coordo))) && (jjexiste(BL_S) == jjexiste(vec2<i32>(coordo))) && (jjexiste(BR_S) == jjexiste(vec2<i32>(coordo))))) {
      
        q = textureSampleSmooth(pressure, vec2<f32>(coordo)/ vec2<f32>(u.resolution.xy)*vec2<f32>(u.resolutionPressure), u.resolutionPressure).x;
    }
    return q;
}


fn jexiste(uv: vec2<f32>) -> f32 {
    return existe(vec2<i32>((floor(uv*vec2<f32>(u.resolutionPressure))+0.5)/vec2<f32>(u.resolutionPressure)*vec2<f32>(u.resolution)));
}

fn jjexiste(uvc: vec2<i32>) -> f32 {
    return jexiste((vec2<f32>(uvc)+0.5)/vec2<f32>(u.resolution));
}


@fragment
fn gradient(@builtin(position) coords: vec4<f32>) -> @location(0) vec2<f32> {
    var uv = vec2<f32>(coords.xy);
    var e:f32 = existe(vec2<i32>(uv));
    var  ra = vec2<f32>(u.resolution.xy)/vec2<f32>(u.resolutionPressure.xy);
    var pL = sampleP(vec2<f32>(vec2<f32>(coords.xy)) - vec2<f32>(1, 0)*ra, vec2<f32>(vec2<f32>(uv)) + vec2<f32>(0, 0),e);
    var pR = sampleP(vec2<f32>(vec2<f32>(coords.xy)) + vec2<f32>(1, 0)*ra, vec2<f32>(vec2<f32>(uv)) - vec2<f32>(0, 0),e);
    var pB = sampleP(vec2<f32>(vec2<f32>(coords.xy)) + vec2<f32>(0, 1)*ra, vec2<f32>(vec2<f32>(uv)) - vec2<f32>(0, 0),e);
    var pT = sampleP(vec2<f32>(vec2<f32>(coords.xy)) - vec2<f32>(0, 1)*ra, vec2<f32>(vec2<f32>(uv)) + vec2<f32>(0, 0),e);
    var pC = sampleP(vec2<f32>(vec2<f32>(coords.xy)) - vec2<f32>(0, 0)*ra, vec2<f32>(vec2<f32>(uv)) + vec2<f32>(0, 0),e);
    var v = textureLoad(velocity, vec2<i32>(uv), 0).xy;
    var exists = 1.0;//existe(vec2<i32>(uv));
    return exists * (v - vec2<f32>(pR - pL, pB - pT));
}
`,Is=`struct Uniforms {
    resolution: vec2<i32>,
    resolutionPressure: vec2<i32>,
    resolutionDisplay: vec2<i32>,
    timestep: f32
};
@group(0) @binding(0) var<uniform> u : Uniforms;

@group(1) @binding(0) var velocity : texture_2d<f32>;

let EPSILON = 2.4414e-4; // 2^-12
let curlAmount = 1.0;

fn curl(coords: vec2<i32>) -> f32 {
    var L = textureLoad(velocity, coords - vec2<i32>(1, 0), 0).y;
    var R = textureLoad(velocity, coords + vec2<i32>(1, 0), 0).y;
    var B = textureLoad(velocity, coords - vec2<i32>(0, 1), 0).x;
    var T = textureLoad(velocity, coords + vec2<i32>(0, 1), 0).x;

    return 0.5 * ((R - L) - (T - B));
}

@fragment
fn vorticity(@builtin(position) coords: vec4<f32>) -> @location(0) vec2<f32> {
    var coord = vec2<i32>(coords.xy);

    var L = curl(coord - vec2<i32>(1, 0));
    var R = curl(coord + vec2<i32>(1, 0));
    var B = curl(coord - vec2<i32>(0, 1));
    var T = curl(coord + vec2<i32>(0, 1));

    var vC = curl(coord);

    var force = 0.5 * vec2<f32>(abs(T) - abs(B), abs(L) - abs(R));
    force *= curlAmount * vC / max(length(force), EPSILON);

    var vel = textureLoad(velocity, coord, 0).xy;
    return vel + u.timestep * force;
}
`,Ue=`
fn existe(coord: vec2<i32>) -> f32 {
    if (coord.x < 1 || coord.x > (u.resolution.x) - 2 || coord.y < 1 || coord.y > (u.resolution.y) - 2) {
        return 0.0;
    }

    var W = min(f32(u.resolution.x), f32(u.resolution.y));
    W = W/1.1 - 1.0;//W;
    var jj = vec2<f32>(coord);
    if (jj.x < f32(W) / 2.0) {
        jj.x = f32(W) / 2.0;
    }
    if (jj.y < f32(W) / 2.0) {
        jj.y = f32(W) / 2.0;
    }
    if (jj.x > f32(u.resolution.x) - f32(W) / 2.0) {
        jj.x = f32(u.resolution.x) - f32(W) / 2.0;
    }
    if (jj.y > f32(u.resolution.y) - f32(W) / 2.0) {
        jj.y = f32(u.resolution.y) - f32(W) / 2.0;
    }
    jj=vec2<f32>(u.resolution)/2.0;

    if (distance(jj, vec2<f32>(coord)) > f32(W) / 2.0) {
        // return 0.0;
    }
    
    return 1.0;
    // return 1.0;
}
`,Vs=`struct Uniforms {
    resolution: vec2<i32>,
};
@group(0) @binding(0) var<uniform> u : Uniforms;

@group(1) @binding(0) var dye : texture_2d<f32>;
@group(1) @binding(1) var velocity : texture_2d<f32>;

struct Touch {
    color: vec4<f32>,
    point: vec2<f32>,
    velocity: vec2<f32>,
    oldPoint: vec2<f32>,
};

@group(2) @binding(0) var<uniform> touch : Touch;

let radius = 1600.0;

struct Output {
    @location(0) dye: vec4<f32>,
    @location(1) velocity: vec4<f32>,
}

fn closestPoint(start: vec2<f32>, end: vec2<f32>, c: vec2<f32>) -> vec2<f32> {
    // Break ab appart into components a and b
    var a = start;
    var b = end;
    if (dot(b - a, b - a) < 0.000001) {
        return a;
    }

    // Project c onto ab, computing the 
    // paramaterized position d(t) = a + t * (b - a)
    var t = dot(c - a, b - a) / dot(b - a, b - a);

    // Clamp T to a 0-1 range. If t was < 0 or > 1
    // then the closest point was outside the line!
    t = clamp(t, 0.0, 1.0);

    // Compute the projected position from the clamped t
    var d = vec2<f32>(a + t * (b - a));

    return d;
}

@fragment
fn splat(@builtin(position) coords: vec4<f32>) -> Output {
    var coord = vec2<i32>(coords.xy);
    var p = coords.xy - closestPoint(touch.point, touch.oldPoint, coords.xy);
    var strength = exp(-dot(p, p) / radius);
    // if(strength>0.5){
    //     strength=1.0;
    // }else{
    //     strength=0.0;
    // }
    var dyeBase = textureLoad(dye, coord, 0).rgb;
    var velocityBase = textureLoad(velocity, coord, 0).xy;
    var out: Output;
    out.dye = vec4<f32>(dyeBase * (1.0 - strength) + strength * touch.color.rgb, 1.0);
    out.velocity = vec4<f32>(velocityBase * (1.0 - strength)  + strength * touch.velocity, 0., 1.0);
    var exists = existe(coord);
    // out.dye *= exists;
    // out.velocity *= exists;
    return out;
}
`,wr=e=>typeof e=="function"&&!e.length?e():e,$r=e=>Array.isArray(e)?e:[e];function zs(e,t,n,r){return e.addEventListener(t,n,r),$e(e.removeEventListener.bind(e,t,n,r))}function xe(e,t,n,r){const i=()=>{$r(wr(e)).forEach(o=>{o&&$r(wr(t)).forEach(s=>zs(o,s,n,r))})};typeof e=="function"?M(i):_(i)}var _r=Object.prototype.hasOwnProperty;function Ht(e,t){var n,r;if(e===t)return!0;if(e&&t&&(n=e.constructor)===t.constructor){if(n===Date)return e.getTime()===t.getTime();if(n===RegExp)return e.toString()===t.toString();if(n===Array){if((r=e.length)===t.length)for(;r--&&Ht(e[r],t[r]););return r===-1}if(!n||typeof e=="object"){r=0;for(n in e)if(_r.call(e,n)&&++r&&!_r.call(t,n)||!(n in t)||!Ht(e[n],t[n]))return!1;return Object.keys(t).length===r}}return e!==e&&t!==t}var sn=function(t,n,r,i){this.name=t,this.fn=n,this.args=r,this.modifiers=i};sn.prototype._test=function(t){var n=this.fn;try{rt(this.modifiers.slice(),n)(t)}catch{n=function(){return!1}}try{return rt(this.modifiers.slice(),n)(t)}catch{return!1}};sn.prototype._check=function(t){try{rt(this.modifiers.slice(),this.fn)(t)}catch{if(rt(this.modifiers.slice(),function(r){return r})(!1))return}if(!rt(this.modifiers.slice(),this.fn)(t))throw null};sn.prototype._testAsync=function(t){var n=this;return new Promise(function(r,i){Mi(n.modifiers.slice(),n.fn)(t).then(function(o){o?r(t):i(null)}).catch(function(o){return i(o)})})};function Bi(e,t){return t===void 0&&(t="simple"),typeof e=="object"?e[t]:e}function rt(e,t){if(e.length){var n=e.shift(),r=rt(e,t);return n.perform(r)}else return Bi(t)}function Mi(e,t){if(e.length){var n=e.shift(),r=Mi(e,t);return n.performAsync(r)}else return function(i){return Promise.resolve(Bi(t,"async")(i))}}var Gs=function(t,n,r){this.name=t,this.perform=n,this.performAsync=r},qn=function(e){function t(n,r,i,o){for(var s=[],a=arguments.length-4;a-- >0;)s[a]=arguments[a+4];e.call(this,s),e.captureStackTrace&&e.captureStackTrace(this,t),this.rule=n,this.value=r,this.cause=i,this.target=o}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t}(Error),Se=function(t,n){t===void 0&&(t=[]),n===void 0&&(n=[]),this.chain=t,this.nextRuleModifiers=n};Se.prototype._applyRule=function(t,n){var r=this;return function(){for(var i=[],o=arguments.length;o--;)i[o]=arguments[o];return r.chain.push(new sn(n,t.apply(r,i),i,r.nextRuleModifiers)),r.nextRuleModifiers=[],r}};Se.prototype._applyModifier=function(t,n){return this.nextRuleModifiers.push(new Gs(n,t.simple,t.async)),this};Se.prototype._clone=function(){return new Se(this.chain.slice(),this.nextRuleModifiers.slice())};Se.prototype.test=function(t){return this.chain.every(function(n){return n._test(t)})};Se.prototype.testAll=function(t){var n=[];return this.chain.forEach(function(r){try{r._check(t)}catch(i){n.push(new qn(r,t,i))}}),n};Se.prototype.check=function(t){this.chain.forEach(function(n){try{n._check(t)}catch(r){throw new qn(n,t,r)}})};Se.prototype.testAsync=function(t){var n=this;return new Promise(function(r,i){Ii(t,n.chain.slice(),r,i)})};function Ii(e,t,n,r){if(t.length){var i=t.shift();i._testAsync(e).then(function(){Ii(e,t,n,r)},function(o){r(new qn(i,e,o))})}else n(e)}function oe(){return typeof Proxy!==void 0?Vi(new Se):kn(new Se)}var wt={};oe.extend=function(e){Object.assign(wt,e)};oe.clearCustomRules=function(){wt={}};function Vi(e){return new Proxy(e,{get:function(n,r){if(r in n)return n[r];var i=Vi(e._clone());if(r in Ft)return i._applyModifier(Ft[r],r);if(r in wt)return i._applyRule(wt[r],r);if(r in Pn)return i._applyRule(Pn[r],r)}})}function kn(e){var t=function(i,o){return Object.keys(i).forEach(function(s){o[s]=function(){for(var a=[],c=arguments.length;c--;)a[c]=arguments[c];var l=kn(o._clone()),u=l._applyRule(i[s],s).apply(void 0,a);return u}}),o},n=t(Pn,e),r=t(wt,n);return Object.keys(Ft).forEach(function(i){Object.defineProperty(r,i,{get:function(){var o=kn(r._clone());return o._applyModifier(Ft[i],i)}})}),r}var Ft={not:{simple:function(e){return function(t){return!e(t)}},async:function(e){return function(t){return Promise.resolve(e(t)).then(function(n){return!n}).catch(function(){return!0})}}},some:{simple:function(e){return function(t){return jt(t).some(function(n){try{return e(n)}catch{return!1}})}},async:function(e){return function(t){return Promise.all(jt(t).map(function(n){try{return e(n).catch(function(){return!1})}catch{return!1}})).then(function(n){return n.some(Boolean)})}}},every:{simple:function(e){return function(t){return t!==!1&&jt(t).every(e)}},async:function(e){return function(t){return Promise.all(jt(t).map(e)).then(function(n){return n.every(Boolean)})}}}};function jt(e){return typeof e=="string"?e.split(""):e}var Pn={equal:function(e){return function(t){return t==e}},exact:function(e){return function(t){return t===e}},number:function(e){return e===void 0&&(e=!0),function(t){return typeof t=="number"&&(e||isFinite(t))}},integer:function(){return function(e){var t=Number.isInteger||Us;return t(e)}},numeric:function(){return function(e){return!isNaN(parseFloat(e))&&isFinite(e)}},string:function(){return Qe("string")},boolean:function(){return Qe("boolean")},undefined:function(){return Qe("undefined")},null:function(){return Qe("null")},array:function(){return Qe("array")},object:function(){return Qe("object")},instanceOf:function(e){return function(t){return t instanceof e}},pattern:function(e){return function(t){return e.test(t)}},lowercase:function(){return function(e){return/^([a-z]+\s*)+$/.test(e)}},uppercase:function(){return function(e){return/^([A-Z]+\s*)+$/.test(e)}},vowel:function(){return function(e){return/^[aeiou]+$/i.test(e)}},consonant:function(){return function(e){return/^(?=[^aeiou])([a-z]+)$/i.test(e)}},first:function(e){return function(t){return t[0]==e}},last:function(e){return function(t){return t[t.length-1]==e}},empty:function(){return function(e){return e.length===0}},length:function(e,t){return function(n){return n.length>=e&&n.length<=(t||e)}},minLength:function(e){return function(t){return t.length>=e}},maxLength:function(e){return function(t){return t.length<=e}},negative:function(){return function(e){return e<0}},positive:function(){return function(e){return e>=0}},between:function(e,t){return function(n){return n>=e&&n<=t}},range:function(e,t){return function(n){return n>=e&&n<=t}},lessThan:function(e){return function(t){return t<e}},lessThanOrEqual:function(e){return function(t){return t<=e}},greaterThan:function(e){return function(t){return t>e}},greaterThanOrEqual:function(e){return function(t){return t>=e}},even:function(){return function(e){return e%2===0}},odd:function(){return function(e){return e%2!==0}},includes:function(e){return function(t){return~t.indexOf(e)}},schema:function(e){return Ws(e)},passesAnyOf:function(){for(var e=[],t=arguments.length;t--;)e[t]=arguments[t];return function(n){return e.some(function(r){return r.test(n)})}},optional:function(e,t){return t===void 0&&(t=!1),function(n){return t&&typeof n=="string"&&n.trim()===""||n!=null&&e.check(n),!0}}};function Qe(e){return function(t){return Array.isArray(t)&&e==="array"||t===null&&e==="null"||typeof t===e}}function Us(e){return typeof e=="number"&&isFinite(e)&&Math.floor(e)===e}function Ws(e){return{simple:function(t){var n=[];if(Object.keys(e).forEach(function(r){var i=e[r];try{i.check((t||{})[r])}catch(o){o.target=r,n.push(o)}}),n.length>0)throw n;return!0},async:function(t){var n=[],r=Object.keys(e).map(function(i){var o=e[i];return o.testAsync((t||{})[i]).catch(function(s){s.target=i,n.push(s)})});return Promise.all(r).then(function(){if(n.length>0)throw n;return!0})}}}function $t(e=null){return{current:e}}const at=(e,t=0,n=1)=>e>n?n:e<t?t:e,Hs=T('<div class="react-colorful__interactive" tabindex="0" role="slider"></div>'),_t=e=>"touches"in e,Fs=(e,t)=>{for(let n=0;n<e.length;n++)if(e[n].identifier===t)return e[n];return e[0]},Tn=e=>e&&e.ownerDocument.defaultView||self,Sr=(e,t,n)=>{const r=e.getBoundingClientRect(),i=_t(t)?Fs(t.touches,n):t;return{left:at((i.pageX-(r.left+Tn(e).pageXOffset))/r.width),top:at((i.pageY-(r.top+Tn(e).pageYOffset))/r.height)}},kr=e=>{!_t(e)&&e.preventDefault()},Ks=(e,t)=>t&&!_t(e),Yn=e=>{const t=$t(null),n=$t(null);let r=!1;const i=W(()=>{const a=f=>{const v=t.current;if(!!v&&(kr(f),!(Ks(f,r)||!v))){if(_t(f)){r=!0;const h=f.changedTouches||[];h.length&&(n.current=h[0].identifier)}v.focus(),e.onMove(Sr(v,f,n.current)),d(!0)}},c=f=>{kr(f),(_t(f)?f.touches.length>0:f.buttons>0)&&t.current?e.onMove(Sr(t.current,f,n.current)):d(!1)},l=()=>d(!1),u=f=>{const v=f.which||f.keyCode;v<37||v>40||(f.preventDefault(),e.onKey({left:v===39?.05:v===37?-.05:0,top:v===40?.05:v===38?-.05:0}))};function d(f){const v=t.current,h=Tn(v),m=f?h.addEventListener:h.removeEventListener;m(r?"touchmove":"mousemove",c),m(r?"touchend":"mouseup",l)}return{handleMoveStart:a,handleKeyDown:u,toggleDocumentEvents:d}});$e(()=>{i().toggleDocumentEvents});const[o,s]=Wn(e,["onMove","onKey"]);return(()=>{const a=Hs.cloneNode(!0);return yt(a,"keydown",i().handleKeyDown,!0),(c=>t.current=c)(a),yt(a,"mousedown",i().handleMoveStart,!0),yt(a,"touchstart",i().handleMoveStart,!0),Fe(a,s,!1,!1),a})()};Ce(["touchstart","mousedown","keydown"]);const Pt=e=>e.filter(Boolean).join(" "),qs=T('<div><div class="react-colorful__pointer-fill"></div></div>'),Xn=e=>(M(()=>{console.log(e.color)}),(()=>{const t=qs.cloneNode(!0),n=t.firstChild;return _(r=>{const i=Pt(["react-colorful__pointer",e.className]),o=`${e.top*100}%`,s=`${e.left*100}%`,a=e.color;return i!==r._v$&&(t.className=r._v$=i),o!==r._v$2&&t.style.setProperty("top",r._v$2=o),s!==r._v$3&&t.style.setProperty("left",r._v$3=s),a!==r._v$4&&n.style.setProperty("background-color",r._v$4=a),r},{_v$:void 0,_v$2:void 0,_v$3:void 0,_v$4:void 0}),t})()),Q=(e,t=0,n=Math.pow(10,t))=>Math.round(n*e)/n,zi=({h:e,s:t,v:n,a:r})=>{const i=(200-t)*n/100;return{h:Q(e),s:Q(i>0&&i<200?t*n/100/(i<=100?i:200-i)*100:0),l:Q(i/2),a:Q(r,2)}},Gi=e=>{const{h:t,s:n,l:r}=zi(e);return`hsl(${t}, ${n}%, ${r}%)`},dn=e=>{const{h:t,s:n,l:r,a:i}=zi(e);return`hsla(${t}, ${n}%, ${r}%, ${i})`},Jn=({h:e,s:t,v:n,a:r})=>{e=e/360*6,t=t/100,n=n/100;const i=Math.floor(e),o=n*(1-t),s=n*(1-(e-i)*t),a=n*(1-(1-e+i)*t),c=i%6;return{r:Q([n,s,o,o,a,n][c]*255),g:Q([a,n,n,s,o,o][c]*255),b:Q([o,o,a,n,n,s][c]*255),a:Q(r,2)}},Ys=e=>{const{r:t,g:n,b:r}=Jn(e);return`rgb(${t}, ${n}, ${r})`},Ui=({r:e,g:t,b:n,a:r})=>{const i=Math.max(e,t,n),o=i-Math.min(e,t,n),s=o?i===e?(t-n)/o:i===t?2+(n-e)/o:4+(e-t)/o:0;return{h:Q(60*(s<0?s+6:s)),s:Q(i?o/i*100:0),v:Q(i/255*100),a:r}},Xs=({r:e,g:t,b:n})=>({r:e,g:t,b:n}),Js=T("<div></div>"),Wi=e=>{const t=r=>{e.onChange({h:360*r.left})},n=r=>{e.onChange({h:at(e.hue+r.left*360,0,360)})};return(()=>{const r=Js.cloneNode(!0);return k(r,g(Yn,{onMove:t,onKey:n,"aria-label":"Hue",get["aria-valuetext"](){return Q(e.hue)},get children(){return g(Xn,{className:"react-colorful__hue-pointer",get left(){return e.hue/360},top:0,get color(){return Gi({h:e.hue,s:100,v:100,a:1})}})}})),_(()=>r.className=Pt(["react-colorful__hue",e.className])),r})()},Zs=T('<div class="react-colorful__saturation"></div>'),Hi=e=>{const t=r=>{e.onChange({s:r.left*100,v:100-r.top*100})},n=r=>{e.onChange({s:at(e.hsva.s+r.left*100,0,100),v:at(e.hsva.v-r.top*100,0,100)})};return(()=>{const r=Zs.cloneNode(!0);return k(r,g(Yn,{onMove:t,onKey:n,"aria-label":"Color",get["aria-valuetext"](){return`Saturation ${Q(e.hsva.s)}%, Brightness ${Q(e.hsva.v)}%`},get children(){return g(Xn,{className:"react-colorful__saturation-pointer",get top(){return 1-e.hsva.v/100},get left(){return e.hsva.s/100},get color(){return Gi(e.hsva)}})}})),_(()=>r.style.setProperty("background-color",Ys({h:e.hsva.h,s:100,v:100,a:1}))),r})()},Zn=(e,t)=>{if(e===t)return!0;for(const n in e)if(e[n]!==t[n])return!1;return!0};function Fi(e){const[t,n]=A(e.colorModel.toHsva(e.color)),r=$t({color:e.color,hsva:t()});return M(()=>{if(!e.colorModel.equal(e.color,r.current.color)){const o=e.colorModel.toHsva(e.color);r.current={hsva:o,color:e.color},n(o)}}),M(()=>{var o;let s;!Zn(t(),r.current.hsva)&&!e.colorModel.equal(s=e.colorModel.fromHsva(t()),r.current.color)&&(r.current={hsva:t(),color:s},(o=e.onChange)==null||o.call(e,s))}),[t,o=>{n(s=>Object.assign({},s,o))}]}const Qs=()=>{if(typeof __webpack_nonce__<"u")return __webpack_nonce__};var ea=`.react-colorful {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 200px;
  user-select: none;
  cursor: default;
}

.react-colorful__saturation {
  position: relative;
  flex-grow: 1;
  border-color: transparent; /* Fixes https://github.com/omgovich/react-colorful/issues/139 */
  border-bottom: 12px solid #000;
  border-radius: 8px 8px 0 0;
  background-image: linear-gradient(to top, #000, rgba(0, 0, 0, 0)),
    linear-gradient(to right, #fff, rgba(255, 255, 255, 0));
}

.react-colorful__pointer-fill,
.react-colorful__alpha-gradient {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  border-radius: inherit;
}

/* Improve elements rendering on light backgrounds */
.react-colorful__alpha-gradient,
.react-colorful__saturation {
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.05);
}

.react-colorful__hue,
.react-colorful__alpha {
  position: relative;
  height: 24px;
}

.react-colorful__hue {
  background: linear-gradient(
    to right,
    #f00 0%,
    #ff0 17%,
    #0f0 33%,
    #0ff 50%,
    #00f 67%,
    #f0f 83%,
    #f00 100%
  );
}

/* Round bottom corners of the last element: \`Hue\` for \`ColorPicker\` or \`Alpha\` for \`AlphaColorPicker\` */
.react-colorful__last-control {
  border-radius: 0 0 8px 8px;
}

.react-colorful__interactive {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  border-radius: inherit;
  outline: none;
  /* Don't trigger the default scrolling behavior when the event is originating from this element */
  touch-action: none;
}

.react-colorful__pointer {
  position: absolute;
  z-index: 1;
  box-sizing: border-box;
  width: 28px;
  height: 28px;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border: 2px solid #fff;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.react-colorful__interactive:focus .react-colorful__pointer {
  transform: translate(-50%, -50%) scale(1.1);
}

/* Chessboard-like pattern for alpha related elements */
.react-colorful__alpha,
.react-colorful__alpha-pointer {
  background-color: #fff;
  background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill-opacity=".05"><rect x="8" width="8" height="8"/><rect y="8" width="8" height="8"/></svg>');
}

/* Display the saturation pointer over the hue one */
.react-colorful__saturation-pointer {
  z-index: 3;
}

/* Display the hue pointer over the alpha one */
.react-colorful__hue-pointer {
  z-index: 2;
}
`;const Pr=new Map,Ki=e=>{M(()=>{const t=e.current?e.current.ownerDocument:document;if(typeof t<"u"&&!Pr.has(t)){const n=t.createElement("style");n.innerHTML=ea,Pr.set(t,n);const r=Qs();r&&n.setAttribute("nonce",r),t.head.appendChild(n)}})},ta=T("<div></div>"),na=e=>{const t=_e({color:e.colorModel.defaultColor},e);let n=$t();Ki({current:n.current});const[r,i]=Fi(t),[o,s]=Wn(t,["color","colorModel","onChange","className"]);return M(()=>{console.log(r())}),(()=>{const a=ta.cloneNode(!0);return(c=>n.current=c)(a),Fe(a,s,!1,!0),k(a,g(Hi,{get hsva(){return r()},onChange:i}),null),k(a,g(Wi,{get hue(){return r().h},onChange:i,className:"react-colorful__last-control"}),null),_(()=>a.className=Pt(["react-colorful",t.className])),a})()},ra=T('<div><div class="react-colorful__alpha-gradient"></div></div>'),ia=e=>{const t=a=>{e.onChange({a:a.left})},n=a=>{e.onChange({a:at(e.hsva.a+a.left)})},r=dn(Object.assign({},e.hsva,{a:0})),i=dn(Object.assign({},e.hsva,{a:1})),o={backgroundImage:`linear-gradient(90deg, ${r}, ${i})`},s=Pt(["react-colorful__alpha",e.className]);return(()=>{const a=ra.cloneNode(!0),c=a.firstChild;return a.className=s,Fn(c,o),k(a,g(Yn,{onMove:t,onKey:n,"aria-label":"Alpha",get["aria-valuetext"](){return`${Q(e.hsva.a*100)}%`},get children(){return g(Xn,{className:"react-colorful__alpha-pointer",get left(){return e.hsva.a},top:0,get color(){return dn(e.hsva)}})}}),null),a})()},oa=T("<div></div>"),sa=e=>{e=_e({},{color:e.colorModel.defaultColor},e);const t=$t();Ki(t);const[n,r]=Fi(e.colorModel,e.color,e.onChange),i=Pt(["react-colorful",e.className]);return(()=>{const o=oa.cloneNode(!0);return(s=>t.current=s)(o),o.className=i,k(o,g(Hi,{get hsva(){return n()},onChange:r}),null),k(o,g(Wi,{get hue(){return n().h},onChange:r}),null),k(o,g(ia,{get hsva(){return n()},onChange:r,className:"react-colorful__last-control"}),null),o})()},aa={defaultColor:{r:0,g:0,b:0,a:1},toHsva:Ui,fromHsva:Jn,equal:Zn},ca=e=>g(sa,_e(e,{colorModel:aa})),la={defaultColor:{r:0,g:0,b:0},toHsva:({r:e,g:t,b:n})=>Ui({r:e,g:t,b:n,a:1}),fromHsva:e=>Xs(Jn(e)),equal:Zn},ua=e=>g(na,_e(e,{colorModel:la}));T("<input>");Ce(["input"]);function ie(e=null){return{current:e}}function Tr(e,t){return e}function fa(e){let t;const n=new Set,r=(l,u)=>{const d=typeof l=="function"?l(t):l;if(d!==t){const f=t;t=u?d:Object.assign({},t,d),n.forEach(v=>v(t,f))}},i=()=>t,o=(l,u=i,d=Object.is)=>{console.warn("[DEPRECATED] Please use `subscribeWithSelector` middleware");let f=u(t);function v(){const h=u(t);if(!d(f,h)){const m=f;l(f=h,m)}}return n.add(v),()=>n.delete(v)},c={setState:r,getState:i,subscribe:(l,u,d)=>u||d?o(l,u,d):(n.add(l),()=>n.delete(l)),destroy:()=>n.clear()};return t=e(r,i,c),c}const qi=Symbol("store-raw"),Kt=Symbol("store-node"),da=Symbol("store-name");function Yi(e,t){let n=e[He];if(!n){Object.defineProperty(e,He,{value:n=new Proxy(e,ga)});const r=Object.keys(e),i=Object.getOwnPropertyDescriptors(e);for(let o=0,s=r.length;o<s;o++){const a=r[o];if(i[a].get){const c=i[a].get.bind(n);Object.defineProperty(e,a,{get:c})}}}return n}function qt(e){let t;return e!=null&&typeof e=="object"&&(e[He]||!(t=Object.getPrototypeOf(e))||t===Object.prototype||Array.isArray(e))}function St(e,t=new Set){let n,r,i,o;if(n=e!=null&&e[qi])return n;if(!qt(e)||t.has(e))return e;if(Array.isArray(e)){Object.isFrozen(e)?e=e.slice(0):t.add(e);for(let s=0,a=e.length;s<a;s++)i=e[s],(r=St(i,t))!==i&&(e[s]=r)}else{Object.isFrozen(e)?e=Object.assign({},e):t.add(e);const s=Object.keys(e),a=Object.getOwnPropertyDescriptors(e);for(let c=0,l=s.length;c<l;c++)o=s[c],!a[o].get&&(i=e[o],(r=St(i,t))!==i&&(e[o]=r))}return e}function Qn(e){let t=e[Kt];return t||Object.defineProperty(e,Kt,{value:t={}}),t}function Cn(e,t,n){return e[t]||(e[t]=Ji(n,!0))}function va(e,t){const n=Reflect.getOwnPropertyDescriptor(e,t);return!n||n.get||!n.configurable||t===He||t===Kt||t===da||(delete n.value,delete n.writable,n.get=()=>e[He][t]),n}function Xi(e){if(Pi()){const t=Qn(e);(t._||(t._=Ji()))()}}function ha(e){return Xi(e),Reflect.ownKeys(e)}function Ji(e,t){const[n,r]=A(e,t?{internal:!0}:{equals:!1,internal:!0});return n.$=r,n}const ga={get(e,t,n){if(t===qi)return e;if(t===He)return n;if(t===wi)return Xi(e);const r=Qn(e),i=r[t];let o=i?r[t]():e[t];if(t===Kt||t==="__proto__")return o;if(!i){const s=Object.getOwnPropertyDescriptor(e,t);Pi()&&(typeof o!="function"||e.hasOwnProperty(t))&&!(s&&s.get)&&(o=Cn(r,t,o)())}return qt(o)?Yi(o):o},set(){return!0},deleteProperty(){return!0},ownKeys:ha,getOwnPropertyDescriptor:va};function Yt(e,t,n){if(e[t]===n)return;const r=e[t],i=e.length;n===void 0?delete e[t]:e[t]=n;let o=Qn(e),s;(s=Cn(o,t,r))&&s.$(()=>n),Array.isArray(e)&&e.length!==i&&(s=Cn(o,"length",i))&&s.$(e.length),(s=o._)&&s.$()}function Zi(e,t){const n=Object.keys(t);for(let r=0;r<n.length;r+=1){const i=n[r];Yt(e,i,t[i])}}function pa(e,t){if(typeof t=="function"&&(t=t(e)),t=St(t),Array.isArray(t)){if(e===t)return;let n=0,r=t.length;for(;n<r;n++){const i=t[n];e[n]!==i&&Yt(e,n,i)}Yt(e,"length",r)}else Zi(e,t)}function vt(e,t,n=[]){let r,i=e;if(t.length>1){r=t.shift();const s=typeof r,a=Array.isArray(e);if(Array.isArray(r)){for(let c=0;c<r.length;c++)vt(e,[r[c]].concat(t),n);return}else if(a&&s==="function"){for(let c=0;c<e.length;c++)r(e[c],c)&&vt(e,[c].concat(t),n);return}else if(a&&s==="object"){const{from:c=0,to:l=e.length-1,by:u=1}=r;for(let d=c;d<=l;d+=u)vt(e,[d].concat(t),n);return}else if(t.length>1){vt(e[r],t,[r].concat(n));return}i=e[r],n=[r].concat(n)}let o=t[0];typeof o=="function"&&(o=o(i,n),o===i)||r===void 0&&o==null||(o=St(o),r===void 0||qt(i)&&qt(o)&&!Array.isArray(o)?Zi(i,o):Yt(e,r,o))}function Qi(e,t){const n=St(e||{}),r=Array.isArray(n),i=Yi(n);function o(...s){ki(()=>{r&&s.length===1?pa(n,s[0]):vt(n,s)})}return[i,o]}var ma=Object.defineProperty,ya=Object.defineProperties,ba=Object.getOwnPropertyDescriptors,Xt=Object.getOwnPropertySymbols,eo=Object.prototype.hasOwnProperty,to=Object.prototype.propertyIsEnumerable,Cr=(e,t,n)=>t in e?ma(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,E=(e,t)=>{for(var n in t||(t={}))eo.call(t,n)&&Cr(e,n,t[n]);if(Xt)for(var n of Xt(t))to.call(t,n)&&Cr(e,n,t[n]);return e},de=(e,t)=>ya(e,ba(t)),H=(e,t)=>{var n={};for(var r in e)eo.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&Xt)for(var r of Xt(e))t.indexOf(r)<0&&to.call(e,r)&&(n[r]=e[r]);return n},pe;(function(e){e[e.UNSUPPORTED_INPUT=0]="UNSUPPORTED_INPUT",e[e.NO_COMPONENT_FOR_TYPE=1]="NO_COMPONENT_FOR_TYPE",e[e.UNKNOWN_INPUT=2]="UNKNOWN_INPUT",e[e.DUPLICATE_KEYS=3]="DUPLICATE_KEYS",e[e.ALREADY_REGISTERED_TYPE=4]="ALREADY_REGISTERED_TYPE",e[e.CLIPBOARD_ERROR=5]="CLIPBOARD_ERROR",e[e.THEME_ERROR=6]="THEME_ERROR",e[e.PATH_DOESNT_EXIST=7]="PATH_DOESNT_EXIST",e[e.INPUT_TYPE_OVERRIDE=8]="INPUT_TYPE_OVERRIDE",e[e.EMPTY_KEY=9]="EMPTY_KEY"})(pe||(pe={}));const xa={[0]:(e,t)=>[`An input with type \`${e}\` input was found at path \`${t}\` but it's not supported yet.`],[1]:(e,t)=>[`Type \`${e}\` found at path \`${t}\` can't be displayed in panel because no component supports it yet.`],[2]:(e,t)=>[`input at path \`${e}\` is not recognized.`,t],[3]:(e,t,n)=>[`Key \`${e}\` of path \`${t}\` already exists at path \`${n}\`. Even nested keys need to be unique. Rename one of the keys.`],[4]:e=>[`Type ${e} has already been registered. You can't register a component with the same type.`],[5]:e=>["Error copying the value",e],[6]:(e,t)=>[`Error accessing the theme \`${e}.${t}\` value.`],[7]:e=>[`Error getting the value at path \`${e}\`. There is probably an error in your \`render\` function.`],[7]:e=>[`Error accessing the value at path \`${e}\``],[8]:(e,t,n)=>[`Input at path \`${e}\` already exists with type: \`${t}\`. Its type cannot be overridden with type \`${n}\`.`],[9]:()=>["Keys can not be empty, if you want to hide a label use whitespace."]};function no(e,t,...n){const[r,...i]=xa[t](...n);console[e]("LEVA: "+r,...i)}const Le=no.bind(null,"warn");no.bind(null,"log");const ro=[],Ke={};function Er(e){var t=e,{value:n}=t,r=H(t,["value"]);for(let i of ro){const o=i(n,r);if(o)return o}}function Ve(e,t){var n=t,{schema:r}=n,i=H(n,["schema"]);if(e in Ke){Le(pe.ALREADY_REGISTERED_TYPE,e);return}ro.push((o,s)=>r(o,s)&&e),Ke[e]=i}function vn(e,t,n,r){const{normalize:i}=Ke[e];if(i)return i(t,n,r);if(typeof t!="object"||!("value"in t))return{value:t};const o=t,{value:s}=o,a=H(o,["value"]);return{value:s,settings:a}}function wa(e,t,n,r,i,o){const{sanitize:s}=Ke[e];return s?s(t,n,r,i,o):t}function Or(e,t,n){const{format:r}=Ke[e];return r?r(t,n):t}const qe=(e,t,n)=>e>n?n:e<t?t:e,$a=e=>{if(e===""||typeof e=="number")return e;try{const t=Be(e);if(!isNaN(t))return t}catch{}return parseFloat(e)},_a=Math.log(10);function Rr(e){let t=Math.abs(+String(e).replace(".",""));if(t===0)return .01;for(;t!==0&&t%10===0;)t/=10;const n=Math.floor(Math.log(t)/_a)+1,r=Math.floor(Math.log10(Math.abs(e))),i=Math.pow(10,r-n);return Math.max(i,.001)}const Jt=(e,t,n)=>n===t?0:(e-t)/(n-t),Zt=(e,t,n)=>e*(n-t)+t,Sa=()=>"_"+Math.random().toString(36).substr(2,9),Lr=/\(([0-9+\-*/^ .]+)\)/,Nr=/(\d+(?:\.\d+)?) ?\^ ?(\d+(?:\.\d+)?)/,jr=/(\d+(?:\.\d+)?) ?\* ?(\d+(?:\.\d+)?)/,Dr=/(\d+(?:\.\d+)?) ?\/ ?(\d+(?:\.\d+)?)/,Ar=/(\d+(?:\.\d+)?) ?\+ ?(\d+(?:\.\d+)?)/,Br=/(\d+(?:\.\d+)?) ?- ?(\d+(?:\.\d+)?)/;function Be(e){if(isNaN(Number(e)))if(Lr.test(e)){const t=e.replace(Lr,(n,r)=>String(Be(r)));return Be(t)}else if(Nr.test(e)){const t=e.replace(Nr,(n,r,i)=>String(Math.pow(Number(r),Number(i))));return Be(t)}else if(jr.test(e)){const t=e.replace(jr,(n,r,i)=>String(Number(r)*Number(i)));return Be(t)}else if(Dr.test(e)){const t=e.replace(Dr,(n,r,i)=>{if(i!=0)return String(Number(r)/Number(i));throw new Error("Division by zero")});return Be(t)}else if(Ar.test(e)){const t=e.replace(Ar,(n,r,i)=>String(Number(r)+Number(i)));return Be(t)}else if(Br.test(e)){const t=e.replace(Br,(n,r,i)=>String(Number(r)-Number(i)));return Be(t)}else return Number(e);return Number(e)}const io=(...e)=>e.filter(Boolean).join(".");function ka(e){const t=e.split(".");return[t.pop(),t.join(".")||void 0]}function Pa(e,t){return t.reduce((n,r)=>(!!e&&e.hasOwnProperty(r)&&(n[r]=e[r]),n),{})}function Ta(e,t){const n=E({},e);return t.forEach(r=>r in e&&delete n[r]),n}function Ca(e,t){return e.reduce((n,r,i)=>Object.assign(n,{[t[i]]:r}),{})}var ke;(function(e){e.BUTTON="BUTTON",e.BUTTON_GROUP="BUTTON_GROUP",e.MONITOR="MONITOR",e.FOLDER="FOLDER"})(ke||(ke={}));var Pe;(function(e){e.SELECT="SELECT",e.IMAGE="IMAGE",e.NUMBER="NUMBER",e.COLOR="COLOR",e.STRING="STRING",e.BOOLEAN="BOOLEAN",e.INTERVAL="INTERVAL",e.VECTOR3D="VECTOR3D",e.VECTOR2D="VECTOR2D"})(Pe||(Pe={}));function oo(e,t,n={},r){if(typeof e!="object"||Array.isArray(e))return{type:r,input:e,options:E({key:t,label:t,optional:!1,disabled:!1},n)};if("__customInput"in e){const b=e,{type:S,__customInput:O}=b,R=H(b,["type","__customInput"]);return oo(O,t,R,S)}const i=e,{render:o,label:s,optional:a,disabled:c,hint:l,onChange:u,onEditStart:d,onEditEnd:f,transient:v}=i,h=H(i,["render","label","optional","disabled","hint","onChange","onEditStart","onEditEnd","transient"]),m=E({render:o,key:t,label:s??t,hint:l,transient:v??!!u,onEditStart:d,onEditEnd:f},n);let y=h,{type:x}=y,p=H(y,["type"]);return x=r??x,x in ke?{type:x,input:p,options:m}:{type:x,input:p,options:de(E({},m),{onChange:u,optional:a??!1,disabled:c??!1})}}function Ea(e,t,n,r){const i=oo(e,t),{type:o,input:s,options:a}=i;if(o)return o in ke?i:{type:o,input:vn(o,s,n,r),options:a};let c=Er(s);return c?{type:c,input:vn(c,s,n,r),options:a}:(c=Er({value:s}),c?{type:c,input:vn(c,{value:s},n,r),options:a}:!1)}function Mr(e,t,n,r,i){const{value:o,type:s,settings:a}=e;e.value=so({type:s,value:o,settings:a},t,n,r),e.fromPanel=i}const Ir=function(e,t,n){this.type="LEVA_ERROR",this.message="LEVA: "+e,this.previousValue=t,this.error=n};function so({type:e,value:t,settings:n},r,i,o){const s=e!=="SELECT"&&typeof r=="function"?r(t):r;let a;try{a=wa(e,s,n,t,i,o)}catch(c){throw new Ir(`The value \`${r}\` did not result in a correct value.`,t,c)}if(Ht(a,t))throw new Ir(`The value \`${r}\` did not result in a value update, which remained the same: \`${t}\`.
        You can ignore this warning if this is the intended behavior.`,t);return a}const Oa=(e,t,n=!1)=>{let r=0;return function(){const i=arguments,o=n&&!r,s=()=>e.apply(this,i);window.clearTimeout(r),r=window.setTimeout(s,t),o&&s()}};function Ra(e,t){return Object.entries(Pa(e,t)).reduce((n,[,{value:r,disabled:i,key:o}])=>(n[o]=i?void 0:r,n),{})}const ao=e=>e.shiftKey?5:e.altKey?1/5:1,La=e=>typeof e=="number"||typeof e=="string"&&!isNaN(parseFloat(e)),co=(e,{min:t=-1/0,max:n=1/0,suffix:r})=>{const i=parseFloat(e);if(e===""||isNaN(i))throw Error("Invalid number");const o=qe(i,t,n);return r?o+r:o},Na=(e,{pad:t=0,suffix:n})=>{const r=parseFloat(e).toFixed(t);return n?r+n:r},lo=e=>{var t=e,{value:n}=t,r=H(t,["value"]);const i=r,{min:o=-1/0,max:s=1/0}=i,a=H(i,["min","max"]),c=qe(parseFloat(n),o,s);let l;if(!Number.isFinite(n)){const v=String(n).match(/[A-Z]+/i);v&&(l=v[0])}let u=r.step;u||(Number.isFinite(o)?Number.isFinite(s)?u=+(Math.abs(s-o)/100).toPrecision(1):u=+(Math.abs(c-o)/100).toPrecision(1):Number.isFinite(s)&&(u=+(Math.abs(s-c)/100).toPrecision(1)));const d=u?Rr(u)*10:Rr(c);u=u||d/10;const f=Math.round(qe(Math.log10(1/d),0,2));return{value:l?c+l:c,settings:E({initialValue:c,step:u,pad:f,min:o,max:s,suffix:l},a)}},uo=(e,{step:t,initialValue:n})=>{const r=Math.round((e-n)/t);return n+r*t};var ja=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",schema:La,sanitize:co,format:Na,normalize:lo,sanitizeStep:uo});const fo=nn({});function se(){return rn(fo)}const vo=nn(null),ho=nn(null),go=nn(null);function er(){return rn(ho)}function Da(){return rn(go)}var D="colors",Z="sizes",w="space",Aa={gap:w,gridGap:w,columnGap:w,gridColumnGap:w,rowGap:w,gridRowGap:w,inset:w,insetBlock:w,insetBlockEnd:w,insetBlockStart:w,insetInline:w,insetInlineEnd:w,insetInlineStart:w,margin:w,marginTop:w,marginRight:w,marginBottom:w,marginLeft:w,marginBlock:w,marginBlockEnd:w,marginBlockStart:w,marginInline:w,marginInlineEnd:w,marginInlineStart:w,padding:w,paddingTop:w,paddingRight:w,paddingBottom:w,paddingLeft:w,paddingBlock:w,paddingBlockEnd:w,paddingBlockStart:w,paddingInline:w,paddingInlineEnd:w,paddingInlineStart:w,top:w,right:w,bottom:w,left:w,scrollMargin:w,scrollMarginTop:w,scrollMarginRight:w,scrollMarginBottom:w,scrollMarginLeft:w,scrollMarginX:w,scrollMarginY:w,scrollMarginBlock:w,scrollMarginBlockEnd:w,scrollMarginBlockStart:w,scrollMarginInline:w,scrollMarginInlineEnd:w,scrollMarginInlineStart:w,scrollPadding:w,scrollPaddingTop:w,scrollPaddingRight:w,scrollPaddingBottom:w,scrollPaddingLeft:w,scrollPaddingX:w,scrollPaddingY:w,scrollPaddingBlock:w,scrollPaddingBlockEnd:w,scrollPaddingBlockStart:w,scrollPaddingInline:w,scrollPaddingInlineEnd:w,scrollPaddingInlineStart:w,fontSize:"fontSizes",background:D,backgroundColor:D,backgroundImage:D,borderImage:D,border:D,borderBlock:D,borderBlockEnd:D,borderBlockStart:D,borderBottom:D,borderBottomColor:D,borderColor:D,borderInline:D,borderInlineEnd:D,borderInlineStart:D,borderLeft:D,borderLeftColor:D,borderRight:D,borderRightColor:D,borderTop:D,borderTopColor:D,caretColor:D,color:D,columnRuleColor:D,fill:D,outline:D,outlineColor:D,stroke:D,textDecorationColor:D,fontFamily:"fonts",fontWeight:"fontWeights",lineHeight:"lineHeights",letterSpacing:"letterSpacings",blockSize:Z,minBlockSize:Z,maxBlockSize:Z,inlineSize:Z,minInlineSize:Z,maxInlineSize:Z,width:Z,minWidth:Z,maxWidth:Z,height:Z,minHeight:Z,maxHeight:Z,flexBasis:Z,gridTemplateColumns:Z,gridTemplateRows:Z,borderWidth:"borderWidths",borderTopWidth:"borderWidths",borderRightWidth:"borderWidths",borderBottomWidth:"borderWidths",borderLeftWidth:"borderWidths",borderStyle:"borderStyles",borderTopStyle:"borderStyles",borderRightStyle:"borderStyles",borderBottomStyle:"borderStyles",borderLeftStyle:"borderStyles",borderRadius:"radii",borderTopLeftRadius:"radii",borderTopRightRadius:"radii",borderBottomRightRadius:"radii",borderBottomLeftRadius:"radii",boxShadow:"shadows",textShadow:"shadows",transition:"transitions",zIndex:"zIndices"},Ba=(e,t)=>typeof t=="function"?{"()":Function.prototype.toString.call(t)}:t,Tt=()=>{const e=Object.create(null);return(t,n,...r)=>{const i=(o=>JSON.stringify(o,Ba))(t);return i in e?e[i]:e[i]=n(t,...r)}},It=Symbol.for("sxs.internal"),tr=(e,t)=>Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)),Vr=e=>{for(const t in e)return!0;return!1},{hasOwnProperty:Ma}=Object.prototype,En=e=>e.includes("-")?e:e.replace(/[A-Z]/g,t=>"-"+t.toLowerCase()),Ia=/\s+(?![^()]*\))/,et=e=>t=>e(...typeof t=="string"?String(t).split(Ia):[t]),zr={appearance:e=>({WebkitAppearance:e,appearance:e}),backfaceVisibility:e=>({WebkitBackfaceVisibility:e,backfaceVisibility:e}),backdropFilter:e=>({WebkitBackdropFilter:e,backdropFilter:e}),backgroundClip:e=>({WebkitBackgroundClip:e,backgroundClip:e}),boxDecorationBreak:e=>({WebkitBoxDecorationBreak:e,boxDecorationBreak:e}),clipPath:e=>({WebkitClipPath:e,clipPath:e}),content:e=>({content:e.includes('"')||e.includes("'")||/^([A-Za-z]+\([^]*|[^]*-quote|inherit|initial|none|normal|revert|unset)$/.test(e)?e:`"${e}"`}),hyphens:e=>({WebkitHyphens:e,hyphens:e}),maskImage:e=>({WebkitMaskImage:e,maskImage:e}),maskSize:e=>({WebkitMaskSize:e,maskSize:e}),tabSize:e=>({MozTabSize:e,tabSize:e}),textSizeAdjust:e=>({WebkitTextSizeAdjust:e,textSizeAdjust:e}),userSelect:e=>({WebkitUserSelect:e,userSelect:e}),marginBlock:et((e,t)=>({marginBlockStart:e,marginBlockEnd:t||e})),marginInline:et((e,t)=>({marginInlineStart:e,marginInlineEnd:t||e})),maxSize:et((e,t)=>({maxBlockSize:e,maxInlineSize:t||e})),minSize:et((e,t)=>({minBlockSize:e,minInlineSize:t||e})),paddingBlock:et((e,t)=>({paddingBlockStart:e,paddingBlockEnd:t||e})),paddingInline:et((e,t)=>({paddingInlineStart:e,paddingInlineEnd:t||e}))},hn=/([\d.]+)([^]*)/,Va=(e,t)=>e.length?e.reduce((n,r)=>(n.push(...t.map(i=>i.includes("&")?i.replace(/&/g,/[ +>|~]/.test(r)&&/&.*&/.test(i)?`:is(${r})`:r):r+" "+i)),n),[]):t,za=(e,t)=>e in Ga&&typeof t=="string"?t.replace(/^((?:[^]*[^\w-])?)(fit-content|stretch)((?:[^\w-][^]*)?)$/,(n,r,i,o)=>r+(i==="stretch"?`-moz-available${o};${En(e)}:${r}-webkit-fill-available`:`-moz-fit-content${o};${En(e)}:${r}fit-content`)+o):String(t),Ga={blockSize:1,height:1,inlineSize:1,maxBlockSize:1,maxHeight:1,maxInlineSize:1,maxWidth:1,minBlockSize:1,minHeight:1,minInlineSize:1,minWidth:1,width:1},Ne=e=>e?e+"-":"",po=(e,t,n)=>e.replace(/([+-])?((?:\d+(?:\.\d*)?|\.\d+)(?:[Ee][+-]?\d+)?)?(\$|--)([$\w-]+)/g,(r,i,o,s,a)=>s=="$"==!!o?r:(i||s=="--"?"calc(":"")+"var(--"+(s==="$"?Ne(t)+(a.includes("$")?"":Ne(n))+a.replace(/\$/g,"-"):a)+")"+(i||s=="--"?"*"+(i||"")+(o||"1")+")":"")),Ua=/\s*,\s*(?![^()]*\))/,Wa=Object.prototype.toString,nt=(e,t,n,r,i)=>{let o,s,a;const c=(l,u,d)=>{let f,v;const h=m=>{for(f in m){const p=f.charCodeAt(0)===64,b=p&&Array.isArray(m[f])?m[f]:[m[f]];for(v of b){const S=/[A-Z]/.test(x=f)?x:x.replace(/-[^]/g,R=>R[1].toUpperCase()),O=typeof v=="object"&&v&&v.toString===Wa&&(!r.utils[S]||!u.length);if(S in r.utils&&!O){const R=r.utils[S];if(R!==s){s=R,h(R(v)),s=null;continue}}else if(S in zr){const R=zr[S];if(R!==a){a=R,h(R(v)),a=null;continue}}if(p&&(y=f.slice(1)in r.media?"@media "+r.media[f.slice(1)]:f,f=y.replace(/\(\s*([\w-]+)\s*(=|<|<=|>|>=)\s*([\w-]+)\s*(?:(<|<=|>|>=)\s*([\w-]+)\s*)?\)/g,(R,z,j,L,N,B)=>{const V=hn.test(z),X=.0625*(V?-1:1),[ce,le]=V?[L,z]:[z,L];return"("+(j[0]==="="?"":j[0]===">"===V?"max-":"min-")+ce+":"+(j[0]!=="="&&j.length===1?le.replace(hn,(ye,ge,be)=>Number(ge)+X*(j===">"?1:-1)+be):le)+(N?") and ("+(N[0]===">"?"min-":"max-")+ce+":"+(N.length===1?B.replace(hn,(ye,ge,be)=>Number(ge)+X*(N===">"?-1:1)+be):B):"")+")"})),O){const R=p?d.concat(f):[...d],z=p?[...u]:Va(u,f.split(Ua));o!==void 0&&i(Gr(...o)),o=void 0,c(v,z,R)}else o===void 0&&(o=[[],u,d]),f=p||f.charCodeAt(0)!==36?f:`--${Ne(r.prefix)}${f.slice(1).replace(/\$/g,"-")}`,v=O?v:typeof v=="number"?v&&S in Ha?String(v)+"px":String(v):po(za(S,v??""),r.prefix,r.themeMap[S]),o[0].push(`${p?`${f} `:`${En(f)}:`}${v}`)}}var y,x};h(l),o!==void 0&&i(Gr(...o)),o=void 0};c(e,t,n)},Gr=(e,t,n)=>`${n.map(r=>`${r}{`).join("")}${t.length?`${t.join(",")}{`:""}${e.join(";")}${t.length?"}":""}${Array(n.length?n.length+1:0).join("}")}`,Ha={animationDelay:1,animationDuration:1,backgroundSize:1,blockSize:1,border:1,borderBlock:1,borderBlockEnd:1,borderBlockEndWidth:1,borderBlockStart:1,borderBlockStartWidth:1,borderBlockWidth:1,borderBottom:1,borderBottomLeftRadius:1,borderBottomRightRadius:1,borderBottomWidth:1,borderEndEndRadius:1,borderEndStartRadius:1,borderInlineEnd:1,borderInlineEndWidth:1,borderInlineStart:1,borderInlineStartWidth:1,borderInlineWidth:1,borderLeft:1,borderLeftWidth:1,borderRadius:1,borderRight:1,borderRightWidth:1,borderSpacing:1,borderStartEndRadius:1,borderStartStartRadius:1,borderTop:1,borderTopLeftRadius:1,borderTopRightRadius:1,borderTopWidth:1,borderWidth:1,bottom:1,columnGap:1,columnRule:1,columnRuleWidth:1,columnWidth:1,containIntrinsicSize:1,flexBasis:1,fontSize:1,gap:1,gridAutoColumns:1,gridAutoRows:1,gridTemplateColumns:1,gridTemplateRows:1,height:1,inlineSize:1,inset:1,insetBlock:1,insetBlockEnd:1,insetBlockStart:1,insetInline:1,insetInlineEnd:1,insetInlineStart:1,left:1,letterSpacing:1,margin:1,marginBlock:1,marginBlockEnd:1,marginBlockStart:1,marginBottom:1,marginInline:1,marginInlineEnd:1,marginInlineStart:1,marginLeft:1,marginRight:1,marginTop:1,maxBlockSize:1,maxHeight:1,maxInlineSize:1,maxWidth:1,minBlockSize:1,minHeight:1,minInlineSize:1,minWidth:1,offsetDistance:1,offsetRotate:1,outline:1,outlineOffset:1,outlineWidth:1,overflowClipMargin:1,padding:1,paddingBlock:1,paddingBlockEnd:1,paddingBlockStart:1,paddingBottom:1,paddingInline:1,paddingInlineEnd:1,paddingInlineStart:1,paddingLeft:1,paddingRight:1,paddingTop:1,perspective:1,right:1,rowGap:1,scrollMargin:1,scrollMarginBlock:1,scrollMarginBlockEnd:1,scrollMarginBlockStart:1,scrollMarginBottom:1,scrollMarginInline:1,scrollMarginInlineEnd:1,scrollMarginInlineStart:1,scrollMarginLeft:1,scrollMarginRight:1,scrollMarginTop:1,scrollPadding:1,scrollPaddingBlock:1,scrollPaddingBlockEnd:1,scrollPaddingBlockStart:1,scrollPaddingBottom:1,scrollPaddingInline:1,scrollPaddingInlineEnd:1,scrollPaddingInlineStart:1,scrollPaddingLeft:1,scrollPaddingRight:1,scrollPaddingTop:1,shapeMargin:1,textDecoration:1,textDecorationThickness:1,textIndent:1,textUnderlineOffset:1,top:1,transitionDelay:1,transitionDuration:1,verticalAlign:1,width:1,wordSpacing:1},Ur=e=>String.fromCharCode(e+(e>25?39:97)),We=e=>(t=>{let n,r="";for(n=Math.abs(t);n>52;n=n/52|0)r=Ur(n%52)+r;return Ur(n%52)+r})(((t,n)=>{let r=n.length;for(;r;)t=33*t^n.charCodeAt(--r);return t})(5381,JSON.stringify(e))>>>0),ht=["themed","global","styled","onevar","resonevar","allvar","inline"],Fa=e=>{if(e.href&&!e.href.startsWith(location.origin))return!1;try{return e.cssRules,!0}catch{return!1}},Ka=e=>{let t;const n=()=>{if(t){const{rules:s,sheet:a}=t;if(!a.deleteRule){for(;Object(Object(a.cssRules)[0]).type===3;)a.cssRules.splice(0,1);a.cssRules=[]}for(const c in s)delete s[c]}const r=Object(e).styleSheets||[];for(const s of r)if(Fa(s)){for(let a=0,c=s.cssRules;c[a];++a){const l=Object(c[a]);if(l.type!==1)continue;const u=Object(c[a+1]);if(u.type!==4)continue;++a;const{cssText:d}=l;if(!d.startsWith("--sxs"))continue;const f=d.slice(14,-3).trim().split(/\s+/),v=ht[f[0]];v&&(t||(t={sheet:s,reset:n,rules:{}}),t.rules[v]={group:u,index:a,cache:new Set(f)})}if(t)break}if(!t){const s=(a,c)=>({type:c,cssRules:[],insertRule(l,u){this.cssRules.splice(u,0,s(l,{import:3,undefined:1}[(l.toLowerCase().match(/^@([a-z]+)/)||[])[1]]||4))},get cssText(){return a==="@media{}"?`@media{${[].map.call(this.cssRules,l=>l.cssText).join("")}}`:a}});t={sheet:e?(e.head||e).appendChild(document.createElement("style")).sheet:s("","text/css"),rules:{},reset:n,toString(){const{cssRules:a}=t.sheet;return[].map.call(a,(c,l)=>{const{cssText:u}=c;let d="";if(u.startsWith("--sxs"))return"";if(a[l-1]&&(d=a[l-1].cssText).startsWith("--sxs")){if(!c.cssRules.length)return"";for(const f in t.rules)if(t.rules[f].group===c)return`--sxs{--sxs:${[...t.rules[f].cache].join(" ")}}${u}`;return c.cssRules.length?`${d}${u}`:""}return u}).join("")}}}const{sheet:i,rules:o}=t;for(let s=ht.length-1;s>=0;--s){const a=ht[s];if(!o[a]){const c=ht[s+1],l=o[c]?o[c].index:i.cssRules.length;i.insertRule("@media{}",l),i.insertRule(`--sxs{--sxs:${s}}`,l),o[a]={group:i.cssRules[l+1],index:l,cache:new Set([s])}}qa(o[a])}};return n(),t},qa=e=>{const t=e.group;let n=t.cssRules.length;e.apply=r=>{try{t.insertRule(r,n),++n}catch{}}},ut=Symbol(),Ya=Tt(),Xa=(e,t)=>Ya(e,()=>(...n)=>{let r={type:null,composers:new Set};for(const i of n)if(i!=null)if(i[It]){r.type==null&&(r.type=i[It].type);for(const o of i[It].composers)r.composers.add(o)}else i.constructor!==Object||i.$$typeof?r.type==null&&(r.type=i):r.composers.add(Ja(i,e));return r.type==null&&(r.type="span"),r.composers.size||r.composers.add(["PJLV",{},[],[],{},[]]),Za(e,r,t)}),Ja=(e,t)=>{var n=e,{variants:r,compoundVariants:i,defaultVariants:o}=n,s=H(n,["variants","compoundVariants","defaultVariants"]);const a=`${Ne(t.prefix)}c-${We(s)}`,c=[],l=[],u=Object.create(null),d=[];for(const h in o)u[h]=String(o[h]);if(typeof r=="object"&&r)for(const h in r){f=u,v=h,Ma.call(f,v)||(u[h]="undefined");const m=r[h];for(const y in m){const x={[h]:String(y)};String(y)==="undefined"&&d.push(h);const p=m[y],b=[x,p,!Vr(p)];c.push(b)}}var f,v;if(typeof i=="object"&&i)for(const h of i){let m=h,{css:y}=m,x=H(m,["css"]);y=typeof y=="object"&&y||{};for(const b in x)x[b]=String(x[b]);const p=[x,y,!Vr(y)];l.push(p)}return[a,s,c,l,u,d]},Za=(e,t,n)=>{const[r,i,o,s]=Qa(t.composers),a=typeof t.type=="function"||t.type.$$typeof?(d=>{function f(){for(let v=0;v<f[ut].length;v++){const[h,m]=f[ut][v];d.rules[h].apply(m)}return f[ut]=[],null}return f[ut]=[],f.rules={},ht.forEach(v=>f.rules[v]={apply:h=>f[ut].push([v,h])}),f})(n):null,c=(a||n).rules,l=`.${r}${i.length>1?`:where(.${i.slice(1).join(".")})`:""}`,u=d=>{d=typeof d=="object"&&d||ec;const f=d,{css:v}=f,h=H(f,["css"]),m={};for(const p in o)if(delete h[p],p in d){let b=d[p];typeof b=="object"&&b?m[p]=E({"@initial":o[p]},b):(b=String(b),m[p]=b!=="undefined"||s.has(p)?b:o[p])}else m[p]=o[p];const y=new Set([...i]);for(const[p,b,S,O]of t.composers){n.rules.styled.cache.has(p)||(n.rules.styled.cache.add(p),nt(b,[`.${p}`],[],e,j=>{c.styled.apply(j)}));const R=Wr(S,m,e.media),z=Wr(O,m,e.media,!0);for(const j of R)if(j!==void 0)for(const[L,N,B]of j){const V=`${p}-${We(N)}-${L}`;y.add(V);const X=(B?n.rules.resonevar:n.rules.onevar).cache,ce=B?c.resonevar:c.onevar;X.has(V)||(X.add(V),nt(N,[`.${V}`],[],e,le=>{ce.apply(le)}))}for(const j of z)if(j!==void 0)for(const[L,N]of j){const B=`${p}-${We(N)}-${L}`;y.add(B),n.rules.allvar.cache.has(B)||(n.rules.allvar.cache.add(B),nt(N,[`.${B}`],[],e,V=>{c.allvar.apply(V)}))}}if(typeof v=="object"&&v){const p=`${r}-i${We(v)}-css`;y.add(p),n.rules.inline.cache.has(p)||(n.rules.inline.cache.add(p),nt(v,[`.${p}`],[],e,b=>{c.inline.apply(b)}))}for(const p of String(d.className||"").trim().split(/\s+/))p&&y.add(p);const x=h.className=[...y].join(" ");return{type:t.type,className:x,selector:l,props:h,toString:()=>x,deferredInjector:a}};return tr(u,{className:r,selector:l,[It]:t,toString:()=>(n.rules.styled.cache.has(r)||u(),r)})},Qa=e=>{let t="";const n=[],r={},i=[];for(const[o,,,,s,a]of e){t===""&&(t=o),n.push(o),i.push(...a);for(const c in s){const l=s[c];(r[c]===void 0||l!=="undefined"||a.includes(l))&&(r[c]=l)}}return[t,n,r,new Set(i)]},Wr=(e,t,n,r)=>{const i=[];e:for(let[o,s,a]of e){if(a)continue;let c,l=0,u=!1;for(c in o){const d=o[c];let f=t[c];if(f!==d){if(typeof f!="object"||!f)continue e;{let v,h,m=0;for(const y in f){if(d===String(f[y])){if(y!=="@initial"){const x=y.slice(1);(h=h||[]).push(x in n?n[x]:y.replace(/^@media ?/,"")),u=!0}l+=m,v=!0}++m}if(h&&h.length&&(s={["@media "+h.join(", ")]:s}),!v)continue e}}}(i[l]=i[l]||[]).push([r?"cv":`${c}-${o[c]}`,s,u])}return i},ec={},tc=Tt(),nc=(e,t)=>tc(e,()=>(...n)=>{const r=()=>{for(let i of n){i=typeof i=="object"&&i||{};let o=We(i);if(!t.rules.global.cache.has(o)){if(t.rules.global.cache.add(o),"@import"in i){let s=[].indexOf.call(t.sheet.cssRules,t.rules.themed.group)-1;for(let a of[].concat(i["@import"]))a=a.includes('"')||a.includes("'")?a:`"${a}"`,t.sheet.insertRule(`@import ${a};`,s++);delete i["@import"]}nt(i,[],[],e,s=>{t.rules.global.apply(s)})}}return""};return tr(r,{toString:r})}),rc=Tt(),ic=(e,t)=>rc(e,()=>n=>{const r=`${Ne(e.prefix)}k-${We(n)}`,i=()=>{if(!t.rules.global.cache.has(r)){t.rules.global.cache.add(r);const o=[];nt(n,[],[],e,a=>o.push(a));const s=`@keyframes ${r}{${o.join("")}}`;t.rules.global.apply(s)}return r};return tr(i,{get name(){return i()},toString:i})}),oc=class{constructor(e,t,n,r){this.token=e==null?"":String(e),this.value=t==null?"":String(t),this.scale=n==null?"":String(n),this.prefix=r==null?"":String(r)}get computedValue(){return"var("+this.variable+")"}get variable(){return"--"+Ne(this.prefix)+Ne(this.scale)+this.token}toString(){return this.computedValue}},sc=Tt(),ac=(e,t)=>sc(e,()=>(n,r)=>{r=typeof n=="object"&&n||Object(r);const i=`.${n=(n=typeof n=="string"?n:"")||`${Ne(e.prefix)}t-${We(r)}`}`,o={},s=[];for(const c in r){o[c]={};for(const l in r[c]){const u=`--${Ne(e.prefix)}${c}-${l}`,d=po(String(r[c][l]),e.prefix,c);o[c][l]=new oc(l,d,c,e.prefix),s.push(`${u}:${d}`)}}const a=()=>{if(s.length&&!t.rules.themed.cache.has(n)){t.rules.themed.cache.add(n);const c=`${r===e.theme?":root,":""}.${n}{${s.join(";")}}`;t.rules.themed.apply(c)}return n};return de(E({},o),{get className(){return a()},selector:i,toString:a})}),cc=Tt(),lc=e=>{let t=!1;const n=cc(e,r=>{t=!0;const i="prefix"in(r=typeof r=="object"&&r||{})?String(r.prefix):"",o=typeof r.media=="object"&&r.media||{},s=typeof r.root=="object"?r.root||null:globalThis.document||null,a=typeof r.theme=="object"&&r.theme||{},c={prefix:i,media:o,theme:a,themeMap:typeof r.themeMap=="object"&&r.themeMap||E({},Aa),utils:typeof r.utils=="object"&&r.utils||{}},l=Ka(s),u={css:Xa(c,l),globalCss:nc(c,l),keyframes:ic(c,l),createTheme:ac(c,l),reset(){l.reset(),u.theme.toString()},theme:{},sheet:l,config:c,prefix:i,getCssText:l.toString,toString:l.toString};return String(u.theme=u.createTheme(a)),u});return t||n.reset(),n};const mo=()=>({colors:{elevation1:"#292d39",elevation2:"#181c20",elevation3:"#373c4b",accent1:"#0066dc",accent2:"#007bff",accent3:"#3c93ff",highlight1:"#535760",highlight2:"#8c92a4",highlight3:"#fefefe",vivid1:"#ffcc00",folderWidgetColor:"$highlight2",folderTextColor:"$highlight3",toolTipBackground:"$highlight3",toolTipText:"$elevation2"},radii:{xs:"2px",sm:"3px",lg:"10px"},space:{xs:"3px",sm:"6px",md:"10px",rowGap:"7px",colGap:"7px"},fonts:{mono:"ui-monospace, SFMono-Regular, Menlo, 'Roboto Mono', monospace",sans:"system-ui, sans-serif"},fontSizes:{root:"11px",toolTip:"$root"},sizes:{rootWidth:"280px",controlWidth:"160px",numberInputMinWidth:"38px",scrubberWidth:"8px",scrubberHeight:"16px",rowHeight:"24px",folderTitleHeight:"20px",checkboxSize:"16px",joystickWidth:"100px",joystickHeight:"100px",colorPickerWidth:"$controlWidth",colorPickerHeight:"100px",imagePreviewWidth:"$controlWidth",imagePreviewHeight:"100px",monitorHeight:"60px",titleBarHeight:"39px"},shadows:{level1:"0 0 9px 0 #00000088",level2:"0 4px 14px #00000033"},borderWidths:{root:"0px",input:"1px",focus:"1px",hover:"1px",active:"1px",folder:"1px"},fontWeights:{label:"normal",folder:"normal",button:"normal"}});function Dt(e,t){const[n,r]=e.split(" "),i={};return n!=="none"&&(i.boxShadow=`${t.inset?"inset ":""}0 0 0 $borderWidths${[t.key]} $colors${n!=="default"&&n||t.borderColor}`),r&&(i.backgroundColor=r),i}const ft={$inputStyle:()=>e=>Dt(e,{key:"$input",borderColor:"$highlight1",inset:!0}),$focusStyle:()=>e=>Dt(e,{key:"$focus",borderColor:"$accent2"}),$hoverStyle:()=>e=>Dt(e,{key:"$hover",borderColor:"$accent1",inset:!0}),$activeStyle:()=>e=>Dt(e,{key:"$active",borderColor:"$accent1",inset:!0})},{css:C,createTheme:uc,globalCss:fc,keyframes:Ed}=lc({prefix:"leva",theme:mo(),utils:de(E({},ft),{$flex:()=>({display:"flex",alignItems:"center"}),$flexCenter:()=>({display:"flex",alignItems:"center",justifyContent:"center"}),$reset:()=>({outline:"none",fontSize:"inherit",fontWeight:"inherit",color:"inherit",fontFamily:"inherit",border:"none",backgroundColor:"transparent",appearance:"none"}),$draggable:()=>({touchAction:"none",WebkitUserDrag:"none",userSelect:"none"}),$focus:e=>({"&:focus":ft.$focusStyle()(e)}),$focusWithin:e=>({"&:focus-within":ft.$focusStyle()(e)}),$hover:e=>({"&:hover":ft.$hoverStyle()(e)}),$active:e=>({"&:active":ft.$activeStyle()(e)})})}),dc=fc({".panel__dragged":{WebkitUserDrag:"none",userSelect:"none",input:{userSelect:"none"},"*":{cursor:"ew-resize !important"}}});dc();function vc(e){const t=mo();if(!e)return{theme:t,className:""};Object.keys(e).forEach(r=>{Object.assign(t[r],e[r])});const n=uc(e);return{theme:t,className:n}}function ct(e,t){const{theme:n}=rn(vo);if(!(e in n)||!(t in n[e]))return Le(pe.THEME_ERROR,e,t),"";let r=t;for(;;){let i=n[e][r];if(typeof i=="string"&&i.charAt(0)==="$")r=i.substr(1);else return i}}const yo=C({$reset:"",padding:"0 $sm",width:0,minWidth:0,flex:1,variants:{levaType:{number:{textAlign:"right"}}}}),hc=C({$draggable:"",height:"100%",$flexCenter:"",position:"relative",padding:"0 $xs",fontSize:"0.8em",opacity:.8,cursor:"default",[`& + ${yo}`]:{paddingLeft:0}}),gc=C({cursor:"ew-resize",marginRight:"-$xs",textTransform:"uppercase",opacity:.3,"&:hover":{opacity:1},variants:{dragging:{true:{backgroundColor:"$accent2",opacity:1}}}}),pc=C({$flex:"",position:"relative",borderRadius:"$sm",overflow:"hidden",color:"inherit",height:"$rowHeight",backgroundColor:"$elevation3",$inputStyle:"$elevation1",$hover:"",$focusWithin:""}),mc=T('<div><label></label><input type="text" autocomplete="off" spell-check="false"></div>');function nr(e){const{id:t,emitOnEditStart:n,emitOnEditEnd:r}=se(),i=e.id||t;let o;const s=c=>l=>{const u=l.currentTarget.value;c(u)};M(()=>{const c=o,l=s(u=>{e.onUpdate(u)});return c?.addEventListener("blur",l),()=>c?.removeEventListener("blur",l)},[s,e.onUpdate,r]);const a=c=>{c.key==="Enter"&&s(e.onUpdate)(c)};return(()=>{const c=mc.cloneNode(!0),l=c.firstChild,u=l.nextSibling;k(l,()=>e.innerLabel),yt(u,"keydown",e.onKeyDown,!0),u.addEventListener("keypress",a),u.addEventListener("change",f=>{e.onUpdate(f.currentTarget.value)}),u.$$input=f=>{e.onChange(f.currentTarget.value)};const d=o;return typeof d=="function"?d(u):o=u,he(u,"id",i),_(f=>{const v=pc(),h=hc(),m=yo({levaType:e.type}),y=e.value;return v!==f._v$&&(c.className=f._v$=v),h!==f._v$2&&(l.className=f._v$2=h),m!==f._v$3&&(u.className=f._v$3=m),y!==f._v$4&&(u.value=f._v$4=y),f},{_v$:void 0,_v$2:void 0,_v$3:void 0,_v$4:void 0}),c})()}function yc(e){return g(nr,{get value(){return e.value},get onChange(){return e.onChange},onUpdate:r=>e.onUpdate($a(r)),onKeyDown:r=>{const i=r.key==="ArrowUp"?1:r.key==="ArrowDown"?-1:0;if(i){r.preventDefault();const o=r.altKey?.1:r.shiftKey?10:1;e.onUpdate(s=>parseFloat(s)+i*o)}},get innerLabel(){return e.innerLabel}})}Ce(["input","keydown"]);const Qt=C({}),On=C({position:"relative",background:"$elevation2",transition:"height 300ms ease",variants:{fill:{true:{},false:{}},flat:{false:{},true:{}},isRoot:{true:{},false:{paddingLeft:"$md","&::after":{content:'""',position:"absolute",left:0,top:0,width:"$borderWidths$folder",height:"100%",backgroundColor:"$folderWidgetColor",opacity:.4,transform:"translateX(-50%)"}}}},compoundVariants:[{isRoot:!0,fill:!1,css:{overflowY:"auto",maxHeight:"calc(100vh - 20px - $$titleBarHeight)"}},{isRoot:!0,flat:!1,css:{borderRadius:"$lg"}}]}),bc=C({$flex:"",color:"$folderTextColor",userSelect:"none",cursor:"pointer",height:"$folderTitleHeight",fontWeight:"$folder","> svg":{marginLeft:-4,marginRight:4,cursor:"pointer",fill:"$folderWidgetColor",opacity:.6},"&:hover > svg":{fill:"$folderWidgetColor"},[`&:hover + ${On}::after`]:{opacity:.6},[`${Qt}:hover > & + ${On}::after`]:{opacity:.6},[`${Qt}:hover > & > svg`]:{opacity:1}}),bo=C({position:"relative",display:"grid",gridTemplateColumns:"100%",rowGap:"$rowGap",variants:{toggled:{true:{opacity:1,transitionDelay:"0ms"},false:{opacity:0,transitionDelay:"0ms",pointerEvents:"none"}},isRoot:{true:{"& > div":{paddingLeft:"$md",paddingRight:"$md"},"& > div:first-of-type":{paddingTop:"$sm"},"& > div:last-of-type":{paddingBottom:"$sm"},[`> ${Qt}:not(:first-of-type)`]:{paddingTop:"$sm",marginTop:"$md",borderTop:"$borderWidths$folder solid $colors$elevation1"}}}}}),xo=C({position:"relative",zIndex:100,display:"grid",rowGap:"$rowGap",gridTemplateRows:"minmax($sizes$rowHeight, max-content)",alignItems:"center",color:"$highlight2",[`${bo} > &`]:{"&:first-of-type":{marginTop:"$rowGap"},"&:last-of-type":{marginBottom:"$rowGap"}},"&:hover,&:focus-within":{color:"$highlight3"}}),wo=C(xo,{gridTemplateColumns:"auto $sizes$controlWidth",columnGap:"$colGap"}),xc=C({$flex:"",height:"100%",position:"relative",overflow:"hidden","& > div":{marginLeft:"$colGap",padding:"0 $xs",opacity:.4},"& > div:hover":{opacity:.8},"& > div > svg":{display:"none",cursor:"pointer",width:13,minWidth:13,height:13,backgroundColor:"$elevation2"},"&:hover > div > svg":{display:"block"},variants:{align:{top:{height:"100%",alignItems:"flex-start",paddingTop:"$sm"}}}}),wc=C({$reset:"",height:0,width:0,opacity:0,margin:0,"& + label":{position:"relative",$flexCenter:"",height:"100%",userSelect:"none",cursor:"pointer",paddingLeft:2,paddingRight:"$sm",pointerEvents:"auto"},"& + label:after":{content:'""',width:6,height:6,backgroundColor:"$elevation3",borderRadius:"50%",$activeStyle:""},"&:focus + label:after":{$focusStyle:""},"& + label:active:after":{backgroundColor:"$accent1",$focusStyle:""},"&:checked + label:after":{backgroundColor:"$accent1"}}),$c=C({opacity:1,variants:{disabled:{true:{opacity:.6,pointerEvents:"none"}}}});C({fontWeight:"$label",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap","& > svg":{display:"block"}});const _c=C({position:"fixed",top:0,bottom:0,right:0,left:0,zIndex:1e3,userSelect:"none"});C({background:"$toolTipBackground",fontFamily:"$sans",fontSize:"$toolTip",padding:"$xs $sm",color:"$toolTipText",borderRadius:"$xs",boxShadow:"$level2",maxWidth:260});C({fill:"$toolTipBackground"});const Sc=T('<input type="checkbox">'),Rn=T("<label></label>"),Hr=T("<div></div>"),kc=T('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"></path><path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"></path></svg>'),Pc=T('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path><path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>');function Tc(){const{id:e,disable:t,disabled:n}=se();return[(()=>{const r=Sc.cloneNode(!0);return r.addEventListener("change",()=>t(!n)),he(r,"id",e+"__disable"),r.checked=!n,_(()=>r.className=wc()),r})(),(()=>{const r=Rn.cloneNode(!0);return he(r,"for",e+"__disable"),r})()]}function Cc(e){const{id:t,optional:n,hint:r}=se();return e.htmlFor,[n&&g(Tc,{}),r!==void 0?(()=>{const i=Rn.cloneNode(!0);return Fe(i,e,!1,!1),i})():(()=>{const i=Rn.cloneNode(!0);return Fe(i,e,!1,!1),i})()]}function je(e){const{value:t,label:n,key:r}=se(),{hideCopyButton:i}=Da(),o=!i&&r!==void 0,[s,a]=A(!1),c=async()=>{try{await navigator.clipboard.writeText(JSON.stringify({[r]:t??""})),a(!0)}catch{Le(pe.CLIPBOARD_ERROR,{[r]:t})}};return(()=>{const l=Hr.cloneNode(!0);return l.addEventListener("pointerleave",()=>a(!1)),k(l,g(Cc,e),null),k(l,o&&(()=>{const u=Hr.cloneNode(!0);return he(u,"title",`Click to copy ${typeof n=="string"?n:r} value`),k(u,(()=>{const d=ot(()=>!s(),!0);return()=>d()?(()=>{const f=kc.cloneNode(!0);return f.$$click=c,f})():Pc.cloneNode(!0)})()),u})(),null),_(()=>l.className=xc({align:e.align})),l})()}Ce(["click"]);const Ec=T('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9 5"><path d="M3.8 4.4c.4.3 1 .3 1.4 0L8 1.7A1 1 0 007.4 0H1.6a1 1 0 00-.7 1.7l3 2.7z"></path></svg>'),Oc=C({fill:"currentColor",width:"1em",height:"1em",transition:"transform 350ms ease, fill 250ms ease"});function rr(e){return(()=>{const t=Ec.cloneNode(!0);return Fe(t,e,!0,!0),_(n=>{const r=Oc(),i="rotate("+(e.toggled?"0deg":"-90deg")+")";return r!==n._v$&&he(t,"class",n._v$=r),i!==n._v$2&&t.style.setProperty("transform",n._v$2=i),n},{_v$:void 0,_v$2:void 0}),t})()}const Fr=T("<div></div>");function Ee(e){return g(Te,{get when(){return!e.input},get fallback(){return(()=>{const t=Fr.cloneNode(!0);return k(t,()=>e.children),_(()=>t.className=wo()),t})()},get children(){const t=Fr.cloneNode(!0);return k(t,()=>e.children),_(()=>t.className=xo()),t}})}const Rc=C({variants:{hasRange:{true:{position:"relative",display:"grid",gridTemplateColumns:"auto $sizes$numberInputMinWidth",columnGap:"$colGap",alignItems:"center"}}}}),$o=C({position:"relative",width:"100%",height:2,borderRadius:"$xs",backgroundColor:"$elevation1"}),Ln=C({position:"absolute",width:"$scrubberWidth",height:"$scrubberHeight",borderRadius:"$xs",boxShadow:"0 0 0 2px $colors$elevation2",backgroundColor:"$accent2",cursor:"pointer",$active:"none $accent1",$hover:"none $accent3",variants:{position:{left:{borderTopRightRadius:0,borderBottomRightRadius:0,transform:"translateX(calc(-0.5 * ($sizes$scrubberWidth + 4px)))"},right:{borderTopLeftRadius:0,borderBottomLeftRadius:0,transform:"translateX(calc(0.5 * ($sizes$scrubberWidth + 4px)))"}}}}),_o=C({position:"relative",$flex:"",height:"100%",cursor:"pointer",touchAction:"none"}),So=C({position:"absolute",height:"100%",backgroundColor:"$accent2"});function Lc(e,t,n){return Math.max(t,Math.min(e,n))}const ee={toVector(e,t){return e===void 0&&(e=t),Array.isArray(e)?e:[e,e]},add(e,t){return[e[0]+t[0],e[1]+t[1]]},sub(e,t){return[e[0]-t[0],e[1]-t[1]]},addTo(e,t){e[0]+=t[0],e[1]+=t[1]},subTo(e,t){e[0]-=t[0],e[1]-=t[1]}};function Kr(e,t,n){return t===0||Math.abs(t)===1/0?Math.pow(e,n*5):e*t*n/(t+n*e)}function qr(e,t,n,r=.15){return r===0?Lc(e,t,n):e<t?-Kr(t-e,n-t,r)+t:e>n?+Kr(e-n,n-t,r)+n:e}function Nc(e,[t,n],[r,i]){const[[o,s],[a,c]]=e;return[qr(t,o,s,r),qr(n,a,c,i)]}function re(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function Yr(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable})),n.push.apply(n,r)}return n}function K(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?Yr(Object(n),!0).forEach(function(r){re(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Yr(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}const ko={pointer:{start:"down",change:"move",end:"up"},mouse:{start:"down",change:"move",end:"up"},touch:{start:"start",change:"move",end:"end"},gesture:{start:"start",change:"change",end:"end"}};function Xr(e){return e?e[0].toUpperCase()+e.slice(1):""}function jc(e,t="",n=!1){const r=ko[e],i=r&&r[t]||t;return"on"+Xr(e)+Xr(i)+(n?"Capture":"")}function Dc(e,t=""){const n=ko[e],r=n&&n[t]||t;return e+r}function ir(e){return"touches"in e}function Ac(e){return Array.from(e.touches).filter(t=>{var n,r;return t.target===e.currentTarget||((n=e.currentTarget)===null||n===void 0||(r=n.contains)===null||r===void 0?void 0:r.call(n,t.target))})}function Bc(e){return e.type==="touchend"?e.changedTouches:e.targetTouches}function Po(e){return ir(e)?Bc(e)[0]:e}function Mc(e){return Ac(e).map(t=>t.identifier)}function gn(e){const t=Po(e);return ir(e)?t.identifier:t.pointerId}function Jr(e){const t=Po(e);return[t.clientX,t.clientY]}function Ic(e){const t={};if("buttons"in e&&(t.buttons=e.buttons),"shiftKey"in e){const{shiftKey:n,altKey:r,metaKey:i,ctrlKey:o}=e;Object.assign(t,{shiftKey:n,altKey:r,metaKey:i,ctrlKey:o})}return t}function en(e,...t){return typeof e=="function"?e(...t):e}function Vc(){}function zc(...e){return e.length===0?Vc:e.length===1?e[0]:function(){let t;for(const n of e)t=n.apply(this,arguments)||t;return t}}function Zr(e,t){return Object.assign({},t,e||{})}const Gc=32;class Uc{constructor(t,n,r){this.ctrl=t,this.args=n,this.key=r,this.state||(this.state={},this.computeValues([0,0]),this.computeInitial(),this.init&&this.init(),this.reset())}get state(){return this.ctrl.state[this.key]}set state(t){this.ctrl.state[this.key]=t}get shared(){return this.ctrl.state.shared}get eventStore(){return this.ctrl.gestureEventStores[this.key]}get timeoutStore(){return this.ctrl.gestureTimeoutStores[this.key]}get config(){return this.ctrl.config[this.key]}get sharedConfig(){return this.ctrl.config.shared}get handler(){return this.ctrl.handlers[this.key]}reset(){const{state:t,shared:n,ingKey:r,args:i}=this;n[r]=t._active=t.active=t._blocked=t._force=!1,t._step=[!1,!1],t.intentional=!1,t._movement=[0,0],t._distance=[0,0],t._delta=[0,0],t._bounds=[[-1/0,1/0],[-1/0,1/0]],t.args=i,t.axis=void 0,t.memo=void 0,t.elapsedTime=0,t.direction=[0,0],t.distance=[0,0],t.velocity=[0,0],t.movement=[0,0],t.delta=[0,0],t.timeStamp=0}start(t){const n=this.state,r=this.config;n._active||(this.reset(),this.computeInitial(),n._active=!0,n.target=t.target,n.currentTarget=t.currentTarget,n.lastOffset=r.from?en(r.from,n):n.offset,n.offset=n.lastOffset),n.startTime=n.timeStamp=t.timeStamp}computeValues(t){const n=this.state;n._values=t,n.values=this.config.transform(t)}computeInitial(){const t=this.state;t._initial=t._values,t.initial=t.values}compute(t){const{state:n,config:r,shared:i}=this;n.args=this.args;let o=0;if(t&&(n.event=t,r.preventDefault&&t.cancelable&&n.event.preventDefault(),n.type=t.type,i.touches=this.ctrl.pointerIds.size||this.ctrl.touchIds.size,i.locked=!!document.pointerLockElement,Object.assign(i,Ic(t)),i.down=i.pressed=i.buttons%2===1||i.touches>0,o=t.timeStamp-n.timeStamp,n.timeStamp=t.timeStamp,n.elapsedTime=n.timeStamp-n.startTime),n._active){const h=n._delta.map(Math.abs);ee.addTo(n._distance,h)}const[s,a]=n._movement,[c,l]=r.threshold,{_step:u,values:d}=n;if(r.hasCustomTransform?(u[0]===!1&&(u[0]=Math.abs(s)>=c&&d[0]),u[1]===!1&&(u[1]=Math.abs(a)>=l&&d[1])):(u[0]===!1&&(u[0]=Math.abs(s)>=c&&Math.sign(s)*c),u[1]===!1&&(u[1]=Math.abs(a)>=l&&Math.sign(a)*l)),n.intentional=u[0]!==!1||u[1]!==!1,!n.intentional)return;const f=[0,0];if(r.hasCustomTransform){const[h,m]=d;f[0]=u[0]!==!1?h-u[0]:0,f[1]=u[1]!==!1?m-u[1]:0}else f[0]=u[0]!==!1?s-u[0]:0,f[1]=u[1]!==!1?a-u[1]:0;if(this.intent&&this.intent(f),(n._active&&!n._blocked||n.active)&&(n.first=n._active&&!n.active,n.last=!n._active&&n.active,n.active=i[this.ingKey]=n._active,t)){n.first&&("bounds"in r&&(n._bounds=en(r.bounds,n)),this.setup&&this.setup()),n.movement=f;const h=n.offset;if(this.computeOffset(),!n.last||o>Gc){n.delta=ee.sub(n.offset,h);const m=n.delta.map(Math.abs);ee.addTo(n.distance,m),n.direction=n.delta.map(Math.sign),!n.first&&o>0&&(n.velocity=[m[0]/o,m[1]/o])}}const v=n._active?r.rubberband||[0,0]:[0,0];n.offset=Nc(n._bounds,n.offset,v),this.computeMovement()}emit(){const t=this.state,n=this.shared,r=this.config;if(t._active||this.clean(),(t._blocked||!t.intentional)&&!t._force&&!r.triggerAllEvents)return;const i=this.handler(K(K(K({},n),t),{},{[this.aliasKey]:t.values}));i!==void 0&&(t.memo=i)}clean(){this.eventStore.clean(),this.timeoutStore.clean()}}function Wc([e,t]){const n=Math.abs(e)-Math.abs(t);if(n>0)return"x";if(n<0)return"y"}function Hc(e,t){switch(t){case"x":e[1]=0;break;case"y":e[0]=0;break}}class Fc extends Uc{constructor(...t){super(...t),re(this,"aliasKey","xy")}reset(){super.reset(),this.state.axis=void 0}init(){this.state.offset=[0,0],this.state.lastOffset=[0,0]}computeOffset(){this.state.offset=ee.add(this.state.lastOffset,this.state.movement)}computeMovement(){this.state.movement=ee.sub(this.state.offset,this.state.lastOffset)}intent(t){this.state.axis=this.state.axis||Wc(t),this.state._blocked=(this.config.lockDirection||!!this.config.axis)&&!this.state.axis||!!this.config.axis&&this.config.axis!==this.state.axis,!this.state._blocked&&(this.config.axis||this.config.lockDirection)&&Hc(t,this.state.axis)}}const Kc=e=>e,Qr=.15,To={enabled(e=!0){return e},preventDefault(e=!1){return e},triggerAllEvents(e=!1){return e},rubberband(e=0){switch(e){case!0:return[Qr,Qr];case!1:return[0,0];default:return ee.toVector(e)}},from(e){if(typeof e=="function")return e;if(e!=null)return ee.toVector(e)},transform(e,t,n){const r=e||n.shared.transform;return this.hasCustomTransform=!!r,r||Kc},threshold(e){return ee.toVector(e,0)}},Ct=K(K({},To),{},{axis(e,t,{axis:n}){if(this.lockDirection=n==="lock",!this.lockDirection)return n},bounds(e={}){if(typeof e=="function")return o=>Ct.bounds(e(o));if("current"in e)return()=>e.current;if(typeof HTMLElement=="function"&&e instanceof HTMLElement)return e;const{left:t=-1/0,right:n=1/0,top:r=-1/0,bottom:i=1/0}=e;return[[t,n],[r,i]]}}),At=10,ei={ArrowRight:(e=1)=>[At*e,0],ArrowLeft:(e=1)=>[-At*e,0],ArrowUp:(e=1)=>[0,-At*e],ArrowDown:(e=1)=>[0,At*e]};class qc extends Fc{constructor(...t){super(...t),re(this,"ingKey","dragging")}reset(){super.reset();const t=this.state;t._pointerId=void 0,t._pointerActive=!1,t._keyboardActive=!1,t._preventScroll=!1,t._delayed=!1,t.swipe=[0,0],t.tap=!1,t.canceled=!1,t.cancel=this.cancel.bind(this)}setup(){const t=this.state;if(t._bounds instanceof HTMLElement){const n=t._bounds.getBoundingClientRect(),r=t.currentTarget.getBoundingClientRect(),i={left:n.left-r.left+t.offset[0],right:n.right-r.right+t.offset[0],top:n.top-r.top+t.offset[1],bottom:n.bottom-r.bottom+t.offset[1]};t._bounds=Ct.bounds(i)}}cancel(){const t=this.state;t.canceled||(t.canceled=!0,t._active=!1,setTimeout(()=>{this.compute(),this.emit()},0))}setActive(){this.state._active=this.state._pointerActive||this.state._keyboardActive}clean(){this.pointerClean(),this.state._pointerActive=!1,this.state._keyboardActive=!1,super.clean()}pointerDown(t){const n=this.config,r=this.state;t.buttons!=null&&(Array.isArray(n.pointerButtons)?!n.pointerButtons.includes(t.buttons):n.pointerButtons!==-1&&n.pointerButtons!==t.buttons)||(this.ctrl.setEventIds(t),n.pointerCapture&&t.target.setPointerCapture(t.pointerId),!r._pointerActive&&(this.start(t),this.setupPointer(t),r._pointerId=gn(t),r._pointerActive=!0,this.computeValues(Jr(t)),this.computeInitial(),n.preventScroll?this.setupScrollPrevention(t):n.delay>0?this.setupDelayTrigger(t):this.startPointerDrag(t)))}startPointerDrag(t){const n=this.state;n._active=!0,n._preventScroll=!0,n._delayed=!1,this.compute(t),this.emit()}pointerMove(t){const n=this.state,r=this.config;if(!n._pointerActive||n.type===t.type&&t.timeStamp===n.timeStamp)return;const i=gn(t);if(n._pointerId&&i!==n._pointerId)return;const o=Jr(t);if(document.pointerLockElement===t.target?n._delta=[t.movementX,t.movementY]:(n._delta=ee.sub(o,n._values),this.computeValues(o)),ee.addTo(n._movement,n._delta),this.compute(t),n._delayed){this.timeoutStore.remove("dragDelay"),n.active=!1,this.startPointerDrag(t);return}if(r.preventScroll&&!n._preventScroll)if(n.axis)if(n.axis===r.preventScrollAxis||r.preventScrollAxis==="xy"){n._active=!1,this.clean();return}else{this.timeoutStore.remove("startPointerDrag"),this.startPointerDrag(t);return}else return;this.emit()}pointerUp(t){this.ctrl.setEventIds(t);try{this.config.pointerCapture&&t.target.hasPointerCapture(t.pointerId)&&t.target.releasePointerCapture(t.pointerId)}catch{}const n=this.state,r=this.config;if(!n._pointerActive)return;const i=gn(t);if(n._pointerId&&i!==n._pointerId)return;this.state._pointerActive=!1,this.setActive(),this.compute(t);const[o,s]=n._distance;if(n.tap=o<=3&&s<=3,n.tap&&r.filterTaps)n._force=!0;else{const[a,c]=n.direction,[l,u]=n.velocity,[d,f]=n.movement,[v,h]=r.swipe.velocity,[m,y]=r.swipe.distance,x=r.swipe.duration;n.elapsedTime<x&&(Math.abs(l)>v&&Math.abs(d)>m&&(n.swipe[0]=a),Math.abs(u)>h&&Math.abs(f)>y&&(n.swipe[1]=c))}this.emit()}pointerClick(t){this.state.tap||(t.preventDefault(),t.stopPropagation())}setupPointer(t){const n=this.config;let r=n.device;n.pointerLock&&t.currentTarget.requestPointerLock(),n.pointerCapture||(this.eventStore.add(this.sharedConfig.window,r,"change",this.pointerMove.bind(this)),this.eventStore.add(this.sharedConfig.window,r,"end",this.pointerUp.bind(this)))}pointerClean(){this.config.pointerLock&&document.pointerLockElement===this.state.currentTarget&&document.exitPointerLock()}preventScroll(t){this.state._preventScroll&&t.cancelable&&t.preventDefault()}setupScrollPrevention(t){Yc(t),this.eventStore.add(this.sharedConfig.window,"touch","change",this.preventScroll.bind(this),{passive:!1}),this.eventStore.add(this.sharedConfig.window,"touch","end",this.clean.bind(this),{passive:!1}),this.eventStore.add(this.sharedConfig.window,"touch","cancel",this.clean.bind(this),{passive:!1}),this.timeoutStore.add("startPointerDrag",this.startPointerDrag.bind(this),this.config.preventScroll,t)}setupDelayTrigger(t){this.state._delayed=!0,this.timeoutStore.add("dragDelay",this.startPointerDrag.bind(this),this.config.delay,t)}keyDown(t){const n=ei[t.key];if(n){const r=this.state,i=t.shiftKey?10:t.altKey?.1:1;r._delta=n(i),this.start(t),r._keyboardActive=!0,ee.addTo(r._movement,r._delta),this.compute(t),this.emit()}}keyUp(t){t.key in ei&&(this.state._keyboardActive=!1,this.setActive(),this.compute(t),this.emit())}bind(t){const n=this.config.device;t(n,"start",this.pointerDown.bind(this)),this.config.pointerCapture&&(t(n,"change",this.pointerMove.bind(this)),t(n,"end",this.pointerUp.bind(this)),t(n,"cancel",this.pointerUp.bind(this))),t("key","down",this.keyDown.bind(this)),t("key","up",this.keyUp.bind(this)),this.config.filterTaps&&t("click","",this.pointerClick.bind(this),{capture:!0})}}function Yc(e){"persist"in e&&typeof e.persist=="function"&&e.persist()}const Et=typeof window<"u"&&window.document&&window.document.createElement;function Co(){return Et&&"ontouchstart"in window}function Xc(){return Co()||Et&&window.navigator.maxTouchPoints>1}function Jc(){return Et&&"onpointerdown"in window}function Zc(){return Et&&"exitPointerLock"in window.document}function Qc(){try{return"constructor"in GestureEvent}catch{return!1}}const fe={isBrowser:Et,gesture:Qc(),touch:Co(),touchscreen:Xc(),pointer:Jc(),pointerLock:Zc()},el=250,tl=180,nl=.5,rl=50,il=250,ol=K(K({},Ct),{},{pointerLock(e,t,{pointer:{lock:n=!1,touch:r=!1}={}}){return this.useTouch=fe.touch&&r,fe.pointerLock&&n},device(e,t){return this.useTouch?"touch":this.pointerLock?"mouse":fe.pointer?"pointer":fe.touch?"touch":"mouse"},preventScroll(e=!1,t,{preventScrollAxis:n="y"}){return n&&(this.preventScrollAxis=n),fe.touchscreen?typeof e=="number"?e:e?el:!1:!1},pointerCapture(e,t,{pointer:{capture:n=!0,buttons:r=1}={}}){return this.pointerButtons=r,!this.pointerLock&&this.device==="pointer"&&n},threshold(e,t,{filterTaps:n=!1,axis:r=void 0}){const i=ee.toVector(e,n?3:r?1:0);return this.filterTaps=n,i},swipe({velocity:e=nl,distance:t=rl,duration:n=il}={}){return{velocity:this.transform(ee.toVector(e)),distance:this.transform(ee.toVector(t)),duration:n}},delay(e=0){switch(e){case!0:return tl;case!1:return 0;default:return e}}});K(K({},To),{},{useTouch(e,t,{pointer:{touch:n=!1}={}}){return fe.touch&&n},device(e,t,n){if(n.shared.target&&!fe.touch&&fe.gesture)return"gesture";if(this.useTouch)return"touch";if(fe.touchscreen){if(fe.pointer)return"pointer";if(fe.touch)return"touch"}},bounds(e,t,{scaleBounds:n={},angleBounds:r={}}){const i=s=>{const a=Zr(en(n,s),{min:-1/0,max:1/0});return[a.min,a.max]},o=s=>{const a=Zr(en(r,s),{min:-1/0,max:1/0});return[a.min,a.max]};return typeof n!="function"&&typeof r!="function"?[i(),o()]:s=>[i(s),o(s)]},threshold(e,t,n){return this.lockDirection=n.axis==="lock",ee.toVector(e,this.lockDirection?[.1,3]:0)}});K(K({},Ct),{},{mouseOnly:(e=!0)=>e});K(K({},Ct),{},{mouseOnly:(e=!0)=>e});const Eo=new Map,Nn=new Map;function sl(e){Eo.set(e.key,e.engine),Nn.set(e.key,e.resolver)}const al={key:"drag",engine:qc,resolver:ol};function cl(e,t){if(e==null)return{};var n={},r=Object.keys(e),i,o;for(o=0;o<r.length;o++)i=r[o],!(t.indexOf(i)>=0)&&(n[i]=e[i]);return n}function ll(e,t){if(e==null)return{};var n=cl(e,t),r,i;if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(i=0;i<o.length;i++)r=o[i],!(t.indexOf(r)>=0)&&(!Object.prototype.propertyIsEnumerable.call(e,r)||(n[r]=e[r]))}return n}const ul={target(e){if(e)return()=>"current"in e?e.current:e},enabled(e=!0){return e},window(e=fe.isBrowser?window:void 0){return e},eventOptions({passive:e=!0,capture:t=!1}={}){return{passive:e,capture:t}},transform(e){return e}},fl=["target","eventOptions","window","enabled","transform"];function Vt(e={},t){const n={};for(const[r,i]of Object.entries(t))switch(typeof i){case"function":n[r]=i.call(n,e[r],r,e);break;case"object":n[r]=Vt(e[r],i);break;case"boolean":i&&(n[r]=e[r]);break}return n}function dl(e,t){const n=e,{target:r,eventOptions:i,window:o,enabled:s,transform:a}=n,c=ll(n,fl),l={shared:Vt({target:r,eventOptions:i,window:o,enabled:s,transform:a},ul)};if(t){const u=Nn.get(t);l[t]=Vt(K({shared:l.shared},c),u)}else for(const u in c){const d=Nn.get(u);d&&(l[u]=Vt(K({shared:l.shared},c[u]),d))}return l}class Oo{constructor(t){re(this,"_listeners",[]),this._ctrl=t}add(t,n,r,i,o){const s=Dc(n,r),a=K(K({},this._ctrl.config.shared.eventOptions),o);t.addEventListener(s,i,a),this._listeners.push(()=>t.removeEventListener(s,i,a))}clean(){this._listeners.forEach(t=>t()),this._listeners=[]}}class vl{constructor(){re(this,"_timeouts",new Map)}add(t,n,r=140,...i){this.remove(t),this._timeouts.set(t,window.setTimeout(n,r,...i))}remove(t){const n=this._timeouts.get(t);n&&window.clearTimeout(n)}clean(){this._timeouts.forEach(t=>void window.clearTimeout(t)),this._timeouts.clear()}}class hl{constructor(t){re(this,"gestures",new Set),re(this,"_targetEventStore",new Oo(this)),re(this,"gestureEventStores",{}),re(this,"gestureTimeoutStores",{}),re(this,"handlers",{}),re(this,"config",{}),re(this,"pointerIds",new Set),re(this,"touchIds",new Set),re(this,"state",{shared:{shiftKey:!1,metaKey:!1,ctrlKey:!1,altKey:!1}}),gl(this,t)}setEventIds(t){ir(t)?this.touchIds=new Set(Mc(t)):"pointerId"in t&&(t.type==="pointerup"||t.type==="pointercancel"?this.pointerIds.delete(t.pointerId):t.type==="pointerdown"&&this.pointerIds.add(t.pointerId))}applyHandlers(t,n){this.handlers=t,this.nativeHandlers=n}applyConfig(t,n){this.config=dl(t,n)}clean(){this._targetEventStore.clean();for(const t of this.gestures)this.gestureEventStores[t].clean(),this.gestureTimeoutStores[t].clean()}effect(){return this.config.shared.target&&this.bind(),()=>this._targetEventStore.clean()}bind(...t){const n=this.config.shared,r=n.eventOptions,i={};let o;if(n.target&&(o=n.target(),!o))return;const s=pl(i,r,!!o);if(n.enabled){for(const a of this.gestures)if(this.config[a].enabled){const c=Eo.get(a);new c(this,t,a).bind(s)}for(const a in this.nativeHandlers)s(a,"",c=>this.nativeHandlers[a](K(K({},this.state.shared),{},{event:c,args:t})),void 0,!0)}for(const a in i)i[a]=zc(...i[a]);if(!o)return i;for(const a in i){let c=a.substr(2).toLowerCase();const l=!!~c.indexOf("capture"),u=!!~c.indexOf("passive");(l||u)&&(c=c.replace(/capture|passive/g,"")),this._targetEventStore.add(o,c,"",i[a],{capture:l,passive:u})}}}function tt(e,t){e.gestures.add(t),e.gestureEventStores[t]=new Oo(e),e.gestureTimeoutStores[t]=new vl}function gl(e,t){t.drag&&tt(e,"drag"),t.wheel&&tt(e,"wheel"),t.scroll&&tt(e,"scroll"),t.move&&tt(e,"move"),t.pinch&&tt(e,"pinch"),t.hover&&tt(e,"hover")}const pl=(e,t,n)=>(r,i,o,s={},a=!1)=>{var c,l;const u=(c=s.capture)!==null&&c!==void 0?c:t.capture,d=(l=s.passive)!==null&&l!==void 0?l:t.passive;let f=a?r:jc(r,i,u);n&&d&&(f+="Passive"),e[f]=e[f]||[],e[f].push(o)};function ml(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function ti(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable})),n.push.apply(n,r)}return n}function ni(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?ti(Object(n),!0).forEach(function(r){ml(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ti(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}const Ro=function(t,n,r,i,o){this._gestureKey=i,this._ctrl=new hl(n),this._ctrl.applyHandlers(n,o),this._ctrl.applyConfig(ni(ni({},r),{},{target:t}),this._gestureKey),this._ctrl.effect()};Ro.prototype.destroy=function(){this._ctrl.clean()};const Ot=function(t,n,r={}){return sl(al),new Ro(t,{drag:n},r,"drag")},yl=T("<div><div><div></div></div><div></div></div>");function bl(e){let t,n,r;const i=ct("sizes","scrubberWidth");return M(()=>{new Ot(n,({event:o,first:s,xy:[a],movement:[c],memo:l})=>{if(s){const{width:d,left:f}=t.getBoundingClientRect();r=d-parseFloat(i),l=o?.target===n?e.value:Zt((a-f)/d,e.min,e.max)}const u=l+Zt(c/r,0,e.max-e.min);return e.onDrag(uo(u,{step:e.step,initialValue:e.initialValue})),l})}),(()=>{const o=yl.cloneNode(!0),s=o.firstChild,a=s.firstChild,c=s.nextSibling,l=t;typeof l=="function"?l(o):t=o,a.style.setProperty("left","0");const u=n;return typeof u=="function"?u(c):n=c,c.style.setProperty("touch-action","none"),_(d=>{const f=_o(),v=$o(),h=So(),m=`${(1-Jt(e.value,e.min,e.max))*100}%`,y=Ln(),x=`calc(${Jt(e.value,e.min,e.max)} * (100% - ${i}))`;return f!==d._v$&&(o.className=d._v$=f),v!==d._v$2&&(s.className=d._v$2=v),h!==d._v$3&&(a.className=d._v$3=h),m!==d._v$4&&a.style.setProperty("right",d._v$4=m),y!==d._v$5&&(c.className=d._v$5=y),x!==d._v$6&&c.style.setProperty("left",d._v$6=x),d},{_v$:void 0,_v$2:void 0,_v$3:void 0,_v$4:void 0,_v$5:void 0,_v$6:void 0}),o})()}const Lo=T("<div></div>"),xl=e=>{const[t,n]=A(!1);let r;return M(()=>{new Ot(r,({active:i,delta:[o],event:s,memo:a=0})=>(n(i),a+=o/2,Math.abs(a)>=1&&(e.onUpdate(c=>parseFloat(c)+Math.floor(a)*e.step*ao(s)),a=0),a))}),(()=>{const i=Lo.cloneNode(!0),o=r;return typeof o=="function"?o(i):r=i,k(i,()=>e.label.slice(0,e.innerLabelTrim)),_(s=>{const a=gc({dragging:t()}),c=e.label.length>1?e.label:"";return a!==s._v$&&(i.className=s._v$=a),c!==s._v$2&&he(i,"title",s._v$2=c),s},{_v$:void 0,_v$2:void 0}),i})()};function No(e){return g(yc,{get id(){return e.id},get value(){return String(e.displayValue)},get onUpdate(){return e.onUpdate},get onChange(){return e.onChange},get innerLabel(){return g(xl,{get label(){return e.label},get step(){return e.settings.step},get onUpdate(){return e.onUpdate},get innerLabelTrim(){return e.innerLabelTrim}})}})}function wl(){const e=se(),t=()=>e.settings.max!==1/0&&e.settings.min!==-1/0;return g(Ee,{input:!0,get children(){return[g(je,{get children(){return e.label}}),(()=>{const n=Lo.cloneNode(!0);return k(n,g(Te,{get when(){return t()},get children(){return g(bl,_e({get value(){return parseFloat(e.value)},get onDrag(){return e.onUpdate}},()=>e.settings))}}),null),k(n,g(No,_e(e,{get id(){return e.id},label:"value",get innerLabelTrim(){return t()?0:2}})),null),_(()=>n.className=Rc({hasRange:t()})),n})()]}})}const jo=ja,{sanitizeStep:$l}=jo,_l=H(jo,["sanitizeStep"]);var Sl=E({component:wl},_l);const kl=(e,t)=>oe().schema({options:oe().passesAnyOf(oe().object(),oe().array())}).test(t),Pl=(e,{values:t})=>{if(t.indexOf(e)<0)throw Error("Selected value doesn't match Select options");return e},Tl=(e,{values:t})=>t.indexOf(e),Cl=e=>{let{value:t,options:n}=e,r,i;return Array.isArray(n)?(i=n,r=n.map(o=>String(o))):(i=Object.values(n),r=Object.keys(n)),"value"in e?i.includes(t)||(r.unshift(String(t)),i.unshift(t)):t=i[0],Object.values(n).includes(t)||(n[String(t)]=t),{value:t,settings:{keys:r,values:i}}};var El=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",schema:kl,sanitize:Pl,format:Tl,normalize:Cl});const Ol=C({$flexCenter:"",position:"relative","> svg":{pointerEvents:"none",position:"absolute",right:"$md"}}),jn=C({position:"absolute",top:0,left:0,width:"100%",height:"100%",opacity:0}),Rl=C("div",{display:"flex",alignItems:"center",width:"100%",height:"$rowHeight",backgroundColor:"$elevation3",borderRadius:"$sm",padding:"0 $sm",cursor:"pointer",[`${jn}:focus + &`]:{$focusStyle:""},[`${jn}:hover + &`]:{$hoverStyle:""}}),Ll=T("<div><select></select><div></div></div>"),Nl=T("<option></option>");function jl(e){return(()=>{const t=Ll.cloneNode(!0),n=t.firstChild,r=n.nextSibling;return n.addEventListener("change",i=>e.onUpdate(e.settings.keys[Number(i.currentTarget.value)])),k(n,g(Hn,{get each(){return e.settings.keys},children:(i,o)=>(()=>{const s=Nl.cloneNode(!0);return k(s,i),_(()=>s.value=o()),s})()})),k(r,()=>e.settings.keys[e.displayValue]),k(t,g(rr,{toggled:!0}),null),_(i=>{const o=Ol(),s=jn(),a=e.id,c=e.displayValue,l=Rl();return o!==i._v$&&(t.className=i._v$=o),s!==i._v$2&&(n.className=i._v$2=s),a!==i._v$3&&he(n,"id",i._v$3=a),c!==i._v$4&&(n.value=i._v$4=c),l!==i._v$5&&(r.className=i._v$5=l),i},{_v$:void 0,_v$2:void 0,_v$3:void 0,_v$4:void 0,_v$5:void 0}),t})()}function Dl(){const e=se();return g(Ee,{input:!0,get children(){return[g(je,{get children(){return e.label}}),g(jl,e)]}})}var Al=E({component:Dl},El),Bl={grad:.9,turn:360,rad:360/(2*Math.PI)},Re=function(e){return typeof e=="string"?e.length>0:typeof e=="number"},q=function(e,t,n){return t===void 0&&(t=0),n===void 0&&(n=Math.pow(10,t)),Math.round(n*e)/n+0},ve=function(e,t,n){return t===void 0&&(t=0),n===void 0&&(n=1),e>n?n:e>t?e:t},Do=function(e){return(e=isFinite(e)?e%360:0)>0?e:e+360},ri=function(e){return{r:ve(e.r,0,255),g:ve(e.g,0,255),b:ve(e.b,0,255),a:ve(e.a)}},pn=function(e){return{r:q(e.r),g:q(e.g),b:q(e.b),a:q(e.a,3)}},Ml=/^#([0-9a-f]{3,8})$/i,Bt=function(e){var t=e.toString(16);return t.length<2?"0"+t:t},Ao=function(e){var t=e.r,n=e.g,r=e.b,i=e.a,o=Math.max(t,n,r),s=o-Math.min(t,n,r),a=s?o===t?(n-r)/s:o===n?2+(r-t)/s:4+(t-n)/s:0;return{h:60*(a<0?a+6:a),s:o?s/o*100:0,v:o/255*100,a:i}},Bo=function(e){var t=e.h,n=e.s,r=e.v,i=e.a;t=t/360*6,n/=100,r/=100;var o=Math.floor(t),s=r*(1-n),a=r*(1-(t-o)*n),c=r*(1-(1-t+o)*n),l=o%6;return{r:255*[r,a,s,s,c,r][l],g:255*[c,r,r,a,s,s][l],b:255*[s,s,c,r,r,a][l],a:i}},ii=function(e){return{h:Do(e.h),s:ve(e.s,0,100),l:ve(e.l,0,100),a:ve(e.a)}},oi=function(e){return{h:q(e.h),s:q(e.s),l:q(e.l),a:q(e.a,3)}},si=function(e){return Bo((n=(t=e).s,{h:t.h,s:(n*=((r=t.l)<50?r:100-r)/100)>0?2*n/(r+n)*100:0,v:r+n,a:t.a}));var t,n,r},bt=function(e){return{h:(t=Ao(e)).h,s:(i=(200-(n=t.s))*(r=t.v)/100)>0&&i<200?n*r/100/(i<=100?i:200-i)*100:0,l:i/2,a:t.a};var t,n,r,i},Il=/^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s*,\s*([+-]?\d*\.?\d+)%\s*,\s*([+-]?\d*\.?\d+)%\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,Vl=/^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s+([+-]?\d*\.?\d+)%\s+([+-]?\d*\.?\d+)%\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,zl=/^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,Gl=/^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,Dn={string:[[function(e){var t=Ml.exec(e);return t?(e=t[1]).length<=4?{r:parseInt(e[0]+e[0],16),g:parseInt(e[1]+e[1],16),b:parseInt(e[2]+e[2],16),a:e.length===4?q(parseInt(e[3]+e[3],16)/255,2):1}:e.length===6||e.length===8?{r:parseInt(e.substr(0,2),16),g:parseInt(e.substr(2,2),16),b:parseInt(e.substr(4,2),16),a:e.length===8?q(parseInt(e.substr(6,2),16)/255,2):1}:null:null},"hex"],[function(e){var t=zl.exec(e)||Gl.exec(e);return t?t[2]!==t[4]||t[4]!==t[6]?null:ri({r:Number(t[1])/(t[2]?100/255:1),g:Number(t[3])/(t[4]?100/255:1),b:Number(t[5])/(t[6]?100/255:1),a:t[7]===void 0?1:Number(t[7])/(t[8]?100:1)}):null},"rgb"],[function(e){var t=Il.exec(e)||Vl.exec(e);if(!t)return null;var n,r,i=ii({h:(n=t[1],r=t[2],r===void 0&&(r="deg"),Number(n)*(Bl[r]||1)),s:Number(t[3]),l:Number(t[4]),a:t[5]===void 0?1:Number(t[5])/(t[6]?100:1)});return si(i)},"hsl"]],object:[[function(e){var t=e.r,n=e.g,r=e.b,i=e.a,o=i===void 0?1:i;return Re(t)&&Re(n)&&Re(r)?ri({r:Number(t),g:Number(n),b:Number(r),a:Number(o)}):null},"rgb"],[function(e){var t=e.h,n=e.s,r=e.l,i=e.a,o=i===void 0?1:i;if(!Re(t)||!Re(n)||!Re(r))return null;var s=ii({h:Number(t),s:Number(n),l:Number(r),a:Number(o)});return si(s)},"hsl"],[function(e){var t=e.h,n=e.s,r=e.v,i=e.a,o=i===void 0?1:i;if(!Re(t)||!Re(n)||!Re(r))return null;var s=function(a){return{h:Do(a.h),s:ve(a.s,0,100),v:ve(a.v,0,100),a:ve(a.a)}}({h:Number(t),s:Number(n),v:Number(r),a:Number(o)});return Bo(s)},"hsv"]]},ai=function(e,t){for(var n=0;n<t.length;n++){var r=t[n][0](e);if(r)return[r,t[n][1]]}return[null,void 0]},Mo=function(e){return typeof e=="string"?ai(e.trim(),Dn.string):typeof e=="object"&&e!==null?ai(e,Dn.object):[null,void 0]},Ul=function(e){return Mo(e)[1]},mn=function(e,t){var n=bt(e);return{h:n.h,s:ve(n.s+100*t,0,100),l:n.l,a:n.a}},yn=function(e){return(299*e.r+587*e.g+114*e.b)/1e3/255},ci=function(e,t){var n=bt(e);return{h:n.h,s:n.s,l:ve(n.l+100*t,0,100),a:n.a}},An=function(){function e(t){this.parsed=Mo(t)[0],this.rgba=this.parsed||{r:0,g:0,b:0,a:1}}return e.prototype.isValid=function(){return this.parsed!==null},e.prototype.brightness=function(){return q(yn(this.rgba),2)},e.prototype.isDark=function(){return yn(this.rgba)<.5},e.prototype.isLight=function(){return yn(this.rgba)>=.5},e.prototype.toHex=function(){return t=pn(this.rgba),n=t.r,r=t.g,i=t.b,s=(o=t.a)<1?Bt(q(255*o)):"","#"+Bt(n)+Bt(r)+Bt(i)+s;var t,n,r,i,o,s},e.prototype.toRgb=function(){return pn(this.rgba)},e.prototype.toRgbString=function(){return t=pn(this.rgba),n=t.r,r=t.g,i=t.b,(o=t.a)<1?"rgba("+n+", "+r+", "+i+", "+o+")":"rgb("+n+", "+r+", "+i+")";var t,n,r,i,o},e.prototype.toHsl=function(){return oi(bt(this.rgba))},e.prototype.toHslString=function(){return t=oi(bt(this.rgba)),n=t.h,r=t.s,i=t.l,(o=t.a)<1?"hsla("+n+", "+r+"%, "+i+"%, "+o+")":"hsl("+n+", "+r+"%, "+i+"%)";var t,n,r,i,o},e.prototype.toHsv=function(){return t=Ao(this.rgba),{h:q(t.h),s:q(t.s),v:q(t.v),a:q(t.a,3)};var t},e.prototype.invert=function(){return ae({r:255-(t=this.rgba).r,g:255-t.g,b:255-t.b,a:t.a});var t},e.prototype.saturate=function(t){return t===void 0&&(t=.1),ae(mn(this.rgba,t))},e.prototype.desaturate=function(t){return t===void 0&&(t=.1),ae(mn(this.rgba,-t))},e.prototype.grayscale=function(){return ae(mn(this.rgba,-1))},e.prototype.lighten=function(t){return t===void 0&&(t=.1),ae(ci(this.rgba,t))},e.prototype.darken=function(t){return t===void 0&&(t=.1),ae(ci(this.rgba,-t))},e.prototype.rotate=function(t){return t===void 0&&(t=15),this.hue(this.hue()+t)},e.prototype.alpha=function(t){return typeof t=="number"?ae({r:(n=this.rgba).r,g:n.g,b:n.b,a:t}):q(this.rgba.a,3);var n},e.prototype.hue=function(t){var n=bt(this.rgba);return typeof t=="number"?ae({h:t,s:n.s,l:n.l,a:n.a}):q(n.h)},e.prototype.isEqual=function(t){return this.toHex()===ae(t).toHex()},e}(),ae=function(e){return e instanceof An?e:new An(e)},li=[],Wl=function(e){e.forEach(function(t){li.indexOf(t)<0&&(t(An,Dn),li.push(t))})};function Hl(e,t){var n={white:"#ffffff",bisque:"#ffe4c4",blue:"#0000ff",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",antiquewhite:"#faebd7",aqua:"#00ffff",azure:"#f0ffff",whitesmoke:"#f5f5f5",papayawhip:"#ffefd5",plum:"#dda0dd",blanchedalmond:"#ffebcd",black:"#000000",gold:"#ffd700",goldenrod:"#daa520",gainsboro:"#dcdcdc",cornsilk:"#fff8dc",cornflowerblue:"#6495ed",burlywood:"#deb887",aquamarine:"#7fffd4",beige:"#f5f5dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkkhaki:"#bdb76b",darkgray:"#a9a9a9",darkgreen:"#006400",darkgrey:"#a9a9a9",peachpuff:"#ffdab9",darkmagenta:"#8b008b",darkred:"#8b0000",darkorchid:"#9932cc",darkorange:"#ff8c00",darkslateblue:"#483d8b",gray:"#808080",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",deeppink:"#ff1493",deepskyblue:"#00bfff",wheat:"#f5deb3",firebrick:"#b22222",floralwhite:"#fffaf0",ghostwhite:"#f8f8ff",darkviolet:"#9400d3",magenta:"#ff00ff",green:"#008000",dodgerblue:"#1e90ff",grey:"#808080",honeydew:"#f0fff0",hotpink:"#ff69b4",blueviolet:"#8a2be2",forestgreen:"#228b22",lawngreen:"#7cfc00",indianred:"#cd5c5c",indigo:"#4b0082",fuchsia:"#ff00ff",brown:"#a52a2a",maroon:"#800000",mediumblue:"#0000cd",lightcoral:"#f08080",darkturquoise:"#00ced1",lightcyan:"#e0ffff",ivory:"#fffff0",lightyellow:"#ffffe0",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",linen:"#faf0e6",mediumaquamarine:"#66cdaa",lemonchiffon:"#fffacd",lime:"#00ff00",khaki:"#f0e68c",mediumseagreen:"#3cb371",limegreen:"#32cd32",mediumspringgreen:"#00fa9a",lightskyblue:"#87cefa",lightblue:"#add8e6",midnightblue:"#191970",lightpink:"#ffb6c1",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",mintcream:"#f5fffa",lightslategray:"#778899",lightslategrey:"#778899",navajowhite:"#ffdead",navy:"#000080",mediumvioletred:"#c71585",powderblue:"#b0e0e6",palegoldenrod:"#eee8aa",oldlace:"#fdf5e6",paleturquoise:"#afeeee",mediumturquoise:"#48d1cc",mediumorchid:"#ba55d3",rebeccapurple:"#663399",lightsteelblue:"#b0c4de",mediumslateblue:"#7b68ee",thistle:"#d8bfd8",tan:"#d2b48c",orchid:"#da70d6",mediumpurple:"#9370db",purple:"#800080",pink:"#ffc0cb",skyblue:"#87ceeb",springgreen:"#00ff7f",palegreen:"#98fb98",red:"#ff0000",yellow:"#ffff00",slateblue:"#6a5acd",lavenderblush:"#fff0f5",peru:"#cd853f",palevioletred:"#db7093",violet:"#ee82ee",teal:"#008080",slategray:"#708090",slategrey:"#708090",aliceblue:"#f0f8ff",darkseagreen:"#8fbc8f",darkolivegreen:"#556b2f",greenyellow:"#adff2f",seagreen:"#2e8b57",seashell:"#fff5ee",tomato:"#ff6347",silver:"#c0c0c0",sienna:"#a0522d",lavender:"#e6e6fa",lightgreen:"#90ee90",orange:"#ffa500",orangered:"#ff4500",steelblue:"#4682b4",royalblue:"#4169e1",turquoise:"#40e0d0",yellowgreen:"#9acd32",salmon:"#fa8072",saddlebrown:"#8b4513",sandybrown:"#f4a460",rosybrown:"#bc8f8f",darksalmon:"#e9967a",lightgoldenrodyellow:"#fafad2",snow:"#fffafa",lightgrey:"#d3d3d3",lightgray:"#d3d3d3",dimgray:"#696969",dimgrey:"#696969",olivedrab:"#6b8e23",olive:"#808000"},r={};for(var i in n)r[n[i]]=i;var o={};e.prototype.toName=function(s){if(!(this.rgba.a||this.rgba.r||this.rgba.g||this.rgba.b))return"transparent";var a,c,l=r[this.toHex()];if(l)return l;if(s?.closest){var u=this.toRgb(),d=1/0,f="black";if(!o.length)for(var v in n)o[v]=new e(n[v]).toRgb();for(var h in n){var m=(a=u,c=o[h],Math.pow(a.r-c.r,2)+Math.pow(a.g-c.g,2)+Math.pow(a.b-c.b,2));m<d&&(d=m,f=h)}return f}},t.string.push([function(s){var a=s.toLowerCase(),c=a==="transparent"?"#0000":n[a];return c?new e(c).toRgb():null},"name"])}Wl([Hl]);const Fl={rgb:"toRgb",hsl:"toHsl",hsv:"toHsv",hex:"toHex"};oe.extend({color:()=>e=>ae(e).isValid()});const Kl=e=>oe().color().test(e);function Io(e,{format:t,hasAlpha:n,isString:r}){const i=Fl[t]+(r&&t!=="hex"?"String":""),o=e[i]();return typeof o=="object"&&!n?Ta(o,["a"]):o}const Vo=(e,t)=>{const n=ae(e);if(!n.isValid())throw Error("Invalid color");return Io(n,t)},ql=(e,t)=>Io(ae(e),de(E({},t),{isString:!0,format:"hex"})),Yl=({value:e})=>{const t=Ul(e),n=t==="name"?"hex":t,r=typeof e=="object"?"a"in e:t==="hex"&&e.length===8||/^(rgba)|(hsla)|(hsva)/.test(e),i={format:n,hasAlpha:r,isString:typeof e=="string"};return{value:Vo(e,i),settings:i}};var Xl=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",schema:Kl,sanitize:Vo,format:ql,normalize:Yl});const Jl=C({position:"relative",boxSizing:"border-box",borderRadius:"$sm",overflow:"hidden",cursor:"pointer",height:"$rowHeight",width:"$rowHeight",backgroundColor:"#fff",backgroundImage:`url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill-opacity=".05"><path d="M8 0h8v8H8zM0 8h8v8H0z"/></svg>')`,$inputStyle:"",$hover:"",zIndex:1,variants:{active:{true:{$inputStyle:"$accent1"}}},"&::before":{content:'""',position:"absolute",top:0,bottom:0,right:0,left:0,backgroundColor:"currentColor",zIndex:1}}),Zl=C({position:"relative",display:"grid",gridTemplateColumns:"$sizes$rowHeight auto",columnGap:"$colGap",alignItems:"center"}),Ql=C({width:"$colorPickerWidth",height:"$colorPickerHeight",".react-colorful":{width:"100%",height:"100%",boxShadow:"$level2",cursor:"crosshair"},".react-colorful__saturation":{borderRadius:"$sm $sm 0 0"},".react-colorful__alpha, .react-colorful__hue":{height:10},".react-colorful__last-control":{borderRadius:"0 0 $sm $sm"},".react-colorful__pointer":{height:12,width:12}});function zo(e){const[t,n]=A(Or(e.type,e.value,e.settings));let r;const i=s=>n(Or(e.type,s,e.settings)),o=s=>{try{e.setValue(s)}catch(a){const{type:c,previousValue:l}=a;if(c!=="LEVA_ERROR")throw a;i(l)}};return M(()=>{Ht(e.value,r)||i(e.value),r=e.value}),{displayValue:t,onChange:n,onUpdate:o}}function eu(e,t){if(Object.is(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;const n=Object.keys(e);if(n.length!==Object.keys(t).length)return!1;for(let r=0;r<n.length;r++)if(!Object.prototype.hasOwnProperty.call(t,n[r])||!Object.is(e[n[r]],t[n[r]]))return!1;return!0}function Go(){const e=ie(null),t=ie({x:0,y:0});return[e,r=>{Object.assign(t.current,r),e.current&&(e.current.style.transform=`translate3d(${t.current.x}px, ${t.current.y}px, 0)`)}]}function tu(e){const t=ie(null),n=ie(null);return{wrapperRef:t,contentRef:n}}const bn=(e,t)=>{if(!e[t])return null;const n=e[t];return H(n,["__refCount"])};function nu(e){const t=er(),[n,r]=A(bn(t.getData(),e)),i=l=>t.setValueAtPath(e,l,!0),o=l=>t.setSettingsAtPath(e,l),s=l=>t.disableInputAtPath(e,l),a=()=>t.emitOnEditStart(e),c=()=>t.emitOnEditEnd(e);return M(()=>{r(bn(t.getData(),e));const l=t.useStore.subscribe(u=>bn(u.data,e),u=>r(u),eu);$e(()=>l())}),[n,{set:i,setSettings:o,disable:s,storeId:t.storeId,emitOnEditStart:a,emitOnEditEnd:c}]}function ru(e=3){let t={current:null},n={current:null};const[r,i]=A(!1),o=()=>i(!0),s=()=>i(!1);return _(()=>{if(r()){const{bottom:a,top:c,left:l}=t.current.getBoundingClientRect(),{height:u}=n.current.getBoundingClientRect(),d=a+u>window.innerHeight-40?"up":"down";n.current.style.position="fixed",n.current.style.zIndex="10000",n.current.style.left=l+"px",d==="down"?n.current.style.top=a+e+"px":n.current.style.bottom=window.innerHeight-c+e+"px"}}),{popinRef:t,wrapperRef:n,shown:r,show:o,hide:s}}const zt=T("<div></div>");function ui(e,t){return t!=="rgb"?ae(e).toRgb():e}function iu(e){se();const{popinRef:t,wrapperRef:n,shown:r,show:i,hide:o}=ru();let s=0;const[a,c]=A(ui(e.value,e.settings.format)),l=()=>{c(ui(e.value,e.settings.format)),i()},u=()=>{o(),window.clearTimeout(s)},d=()=>{s=window.setTimeout(u,500)};return $e(()=>window.clearTimeout(s)),[(()=>{const f=zt.cloneNode(!0);return f.$$click=()=>l(),(v=>t.current=v)(f),_(v=>{const h=Jl({active:r()}),m=e.displayValue;return h!==v._v$&&(f.className=v._v$=h),m!==v._v$2&&f.style.setProperty("color",v._v$2=m),v},{_v$:void 0,_v$2:void 0}),f})(),g(Te,{get when(){return r()},get children(){return g(Ai,{get children(){return[(()=>{const f=zt.cloneNode(!0);return f.addEventListener("mouseleave",v=>v.buttons===0&&d()),f.addEventListener("mouseenter",()=>window.clearTimeout(s)),(v=>n.current=v)(f),k(f,g(Kn,{get component(){return e.settings.hasAlpha?ca:ua},get color(){return a()},get onChange(){return e.onUpdate}})),_(()=>f.className=`${Ql()}`),f})(),(()=>{const f=zt.cloneNode(!0);return f.$$pointerup=u,_(()=>f.className=_c()),f})()]}})}})]}function ou(){const{value:e,displayValue:t,label:n,onChange:r,onUpdate:i,settings:o}=se();return g(Ee,{input:!0,get children(){return[g(je,{children:n}),(()=>{const s=zt.cloneNode(!0);return k(s,g(iu,{value:e,displayValue:t,onChange:r,onUpdate:i,settings:o}),null),k(s,g(nr,{value:t,onChange:r,onUpdate:i}),null),_(()=>s.className=Zl()),s})()]}})}Ce(["click","pointerup"]);var su=E({component:ou},Xl);const au=e=>oe().string().test(e),cu=e=>{if(typeof e!="string")throw Error("Invalid string");return e};var lu=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",schema:au,sanitize:cu});function uu(e){return g(nr,_e({get value(){return e.displayValue}},e))}function fu(){const{label:e,displayValue:t,onUpdate:n,onChange:r}=se();return g(Ee,{input:!0,get children(){return[g(je,{children:e}),g(uu,{displayValue:t,onUpdate:n,onChange:r})]}})}var du=E({component:fu},lu);const vu=e=>oe().boolean().test(e),hu=e=>{if(typeof e!="boolean")throw Error("Invalid boolean");return e};var gu=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",schema:vu,sanitize:hu});const pu=C({position:"relative",$flex:"",height:"$rowHeight",input:{$reset:"",height:0,width:0,opacity:0,margin:0},label:{position:"relative",$flexCenter:"",userSelect:"none",cursor:"pointer",height:"$checkboxSize",width:"$checkboxSize",backgroundColor:"$elevation3",borderRadius:"$sm",$hover:""},"input:focus + label":{$focusStyle:""},"input:focus:checked + label, input:checked + label:hover":{$hoverStyle:"$accent3"},"input + label:active":{backgroundColor:"$accent1"},"input:checked + label:active":{backgroundColor:"$accent1"},"label > svg":{display:"none",width:"90%",height:"90%",stroke:"$highlight3"},"input:checked + label":{backgroundColor:"$accent2"},"input:checked + label > svg":{display:"block"}}),mu=T('<div><input type="checkbox"><label><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg></label></div>');function yu({value:e,onUpdate:t,id:n}){return(()=>{const r=mu.cloneNode(!0),i=r.firstChild,o=i.nextSibling;return i.addEventListener("change",s=>t(s.currentTarget.checked)),he(i,"id",n),i.checked=e,he(o,"for",n),_(()=>r.className=pu()),r})()}function bu(){const{label:e,value:t,onUpdate:n,id:r}=se();return g(Ee,{input:!0,get children(){return[g(je,{children:e}),g(yu,{value:t,onUpdate:n,id:r})]}})}var xu=E({component:bu},gu);const wu=T('<svg><path d="M5 4.63601C5 3.76031 5.24219 3.1054 5.64323 2.67357C6.03934 2.24705 6.64582 1.9783 7.5014 1.9783C8.35745 1.9783 8.96306 2.24652 9.35823 2.67208C9.75838 3.10299 10 3.75708 10 4.63325V5.99999H5V4.63601ZM4 5.99999V4.63601C4 3.58148 4.29339 2.65754 4.91049 1.99307C5.53252 1.32329 6.42675 0.978302 7.5014 0.978302C8.57583 0.978302 9.46952 1.32233 10.091 1.99162C10.7076 2.65557 11 3.57896 11 4.63325V5.99999H12C12.5523 5.99999 13 6.44771 13 6.99999V13C13 13.5523 12.5523 14 12 14H3C2.44772 14 2 13.5523 2 13V6.99999C2 6.44771 2.44772 5.99999 3 5.99999H4ZM3 6.99999H12V13H3V6.99999Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>',4,!0),$u=T('<svg width="10" height="10" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"></svg>'),_u=T('<svg><path d="M9 3.63601C9 2.76044 9.24207 2.11211 9.64154 1.68623C10.0366 1.26502 10.6432 1 11.5014 1C12.4485 1 13.0839 1.30552 13.4722 1.80636C13.8031 2.23312 14 2.84313 14 3.63325H15C15 2.68242 14.7626 1.83856 14.2625 1.19361C13.6389 0.38943 12.6743 0 11.5014 0C10.4294 0 9.53523 0.337871 8.91218 1.0021C8.29351 1.66167 8 2.58135 8 3.63601V6H1C0.447715 6 0 6.44772 0 7V13C0 13.5523 0.447715 14 1 14H10C10.5523 14 11 13.5523 11 13V7C11 6.44772 10.5523 6 10 6H9V3.63601ZM1 7H10V13H1V7Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>',4,!0),Su=T("<div></div>"),ku=e=>{const n=zo({type:"NUMBER",get value(){return e.value[e.valueKey]},get settings(){return e.settings},setValue:r=>{e.onUpdate({[e.valueKey]:so({type:"NUMBER",value:e.value[e.valueKey],settings:e.settings},r)})}});return g(No,{get id(){return e.id},get label(){return e.valueKey},get value(){return e.value[e.valueKey]},get displayValue(){return n.displayValue()},get onUpdate(){return n.onUpdate},get onChange(){return n.onChange},get settings(){return e.settings},get innerLabelTrim(){return e.innerLabelTrim}})},Pu=C({display:"grid",columnGap:"$colGap",gridAutoFlow:"column dense",alignItems:"center",variants:{withLock:{true:{gridTemplateColumns:"10px auto","> svg":{cursor:"pointer"}}}}});function Tu(e){return(()=>{const t=$u.cloneNode(!0);return Fe(t,e,!0,!0),k(t,g(Te,{get when(){return e.locked},get fallback(){return _u.cloneNode(!0)},get children(){return wu.cloneNode(!0)}})),t})()}const Uo=e=>{const t=se();return(()=>{const n=Su.cloneNode(!0);return k(n,g(Te,{get when(){return e.settings.lock},get children(){return g(Tu,{get locked(){return e.settings.locked},onClick:()=>t.setSettings({locked:!e.settings.locked})})}}),null),k(n,g(Hn,{get each(){return Object.keys(e.value)},children:(r,i)=>g(ku,{get id(){return i()===0?t.id:`${t.id}.${r}`},valueKey:r,get value(){return e.value},get settings(){return e.settings[r]},get onUpdate(){return e.onUpdate},get innerLabelTrim(){return e.innerLabelTrim}})}),null),_(()=>n.className=Pu({withLock:e.settings.lock})),n})()},Wo=(e,t)=>{const n={};let r=0,i=1/0;Object.entries(e).forEach(([o,s])=>{n[o]=lo(E({value:s},t[o])).settings,r=Math.max(r,n[o].step),i=Math.min(i,n[o].pad)});for(let o in n){const{step:s,min:a,max:c}=t[o]||{};!isFinite(s)&&(!isFinite(a)||!isFinite(c))&&(n[o].step=r,n[o].pad=i)}return n};function Cu(e){const t=oe().array().length(e).every.number(),n=r=>{if(!r||typeof r!="object")return!1;const i=Object.values(r);return i.length===e&&i.every(o=>isFinite(o))};return r=>t.test(r)||n(r)}function Eu(e){return Array.isArray(e)?"array":"object"}function xt(e,t,n){return Eu(e)===t?e:t==="array"?Object.values(e):Ca(e,n)}const Ou=(e,t,n)=>{const r=xt(e,"object",t.keys);for(let s in r)r[s]=co(r[s],t[s]);const i=Object.keys(r);let o={};if(i.length===t.keys.length)o=r;else{const s=xt(n,"object",t.keys);if(i.length===1&&t.locked){const a=i[0],c=r[a],l=s[a],u=l!==0?c/l:1;for(let d in s)d===a?o[a]=c:o[d]=s[d]*u}else o=E(E({},s),r)}return xt(o,t.format,t.keys)},Ru=(e,t)=>xt(e,"object",t.keys),Lu=e=>!!e&&("step"in e||"min"in e||"max"in e);function Nu(e,t,n=[]){const r=t,{lock:i=!1}=r,o=H(r,["lock"]),s=Array.isArray(e)?"array":"object",a=s==="object"?Object.keys(e):n,c=xt(e,"object",a),l=Lu(o)?a.reduce((d,f)=>Object.assign(d,{[f]:o}),{}):o,u=Wo(c,l);return{value:s==="array"?e:c,settings:de(E({},u),{format:s,keys:a,lock:i,locked:!1})}}function Ho(e){return{schema:Cu(e.length),normalize:t=>{var n=t,{value:r}=n,i=H(n,["value"]);return Nu(r,i,e)},format:(t,n)=>Ru(t,n),sanitize:(t,n,r)=>Ou(t,n,r)}}function ju(){const e=se();return g(Ee,{input:!0,get children(){return[g(je,{get children(){return e.label}}),g(Uo,{get value(){return e.displayValue},get settings(){return e.settings},get onUpdate(){return e.onUpdate}})]}})}var Du=E({component:ju},Ho(["x","y","z"]));const Au=C({$flexCenter:"",position:"relative",backgroundColor:"$elevation3",borderRadius:"$sm",cursor:"pointer",height:"$rowHeight",width:"$rowHeight",$draggable:"",$hover:"","&:active":{cursor:"none"},"&::after":{content:'""',backgroundColor:"$accent2",height:4,width:4,borderRadius:2}}),Bu=C({$flexCenter:"",width:"$joystickWidth",height:"$joystickHeight",borderRadius:"$sm",boxShadow:"$level2",position:"fixed",zIndex:1e4,overflow:"hidden",$draggable:"",transform:"translate(-50%, -50%)",variants:{isOutOfBounds:{true:{backgroundColor:"$elevation1"},false:{backgroundColor:"$elevation3"}}},"> div":{position:"absolute",$flexCenter:"",borderStyle:"solid",borderWidth:1,borderColor:"$highlight1",backgroundColor:"$elevation3",width:"80%",height:"80%","&::after,&::before":{content:'""',position:"absolute",zindex:10,backgroundColor:"$highlight1"},"&::before":{width:"100%",height:1},"&::after":{height:"100%",width:1}},"> span":{position:"relative",zindex:100,width:10,height:10,backgroundColor:"$accent2",borderRadius:"50%"}}),Mu=T("<div><div></div><span></span></div>"),Iu=T("<div></div>"),Vu=e=>{const t=ie(),n=ie(0),r=ie(0),i=ie(1),[o,s]=A(!1),[a,c]=A(!1),[l,u]=Go(),d=ie(null),f=ie(null);_(()=>{if(o()){const{top:L,left:N,width:B,height:V}=d.current.getBoundingClientRect();f.current.style.left=N+B/2+"px",f.current.style.top=L+V/2+"px"}});const{keys:[v,h],joystick:m}=e.settings,y=m==="invertY"?1:-1,{[v]:{step:x},[h]:{step:p}}=e.settings,b=ct("sizes","joystickWidth"),S=ct("sizes","joystickHeight"),O=parseFloat(b)*.8/2,R=parseFloat(S)*.8/2,z=Tr(()=>{t.current||(c(!0),n.current&&u({x:n.current*O}),r.current&&u({y:r.current*-R}),t.current=window.setInterval(()=>{e.onUpdate(L=>{const N=x*n.current*i.current,B=y*p*r.current*i.current;return Array.isArray(L)?{[v]:L[0]+N,[h]:L[1]+B}:{[v]:L[v]+N,[h]:L[h]+B}})},16))},[O,R,e.onUpdate,u,x,p,v,h,y]),j=Tr(()=>{window.clearTimeout(t.current),t.current=void 0,c(!1)});return M(()=>{function L(N){i.current=ao(N)}return window.addEventListener("keydown",L),window.addEventListener("keyup",L),()=>{window.clearTimeout(t.current),window.removeEventListener("keydown",L),window.removeEventListener("keyup",L)}}),M(()=>new Ot(d.current,({first:L,active:N,delta:[B,V],movement:[X,ce]})=>{L&&s(!0);const le=qe(X,-O,O),ye=qe(ce,-R,R);n.current=Math.abs(X)>Math.abs(le)?Math.sign(X-le):0,r.current=Math.abs(ce)>Math.abs(ye)?Math.sign(ye-ce):0;let ge=e.value[v],be=e.value[h];N?(n.current||(ge+=B*x*i.current,u({x:le})),r.current||(be-=y*V*p*i.current,u({y:ye})),n.current||r.current?z():j(),e.onUpdate({[v]:ge,[h]:be})):(s(!1),n.current=0,r.current=0,u({x:0,y:0}),j())})),(()=>{const L=Iu.cloneNode(!0);return(N=>d.current=N)(L),k(L,g(Te,{get when(){return o()},get children(){return g(Ai,{get children(){const N=Mu.cloneNode(!0),B=N.firstChild,V=B.nextSibling;return(X=>f.current=X)(N),(X=>l.current=X)(V),_(()=>N.className=Bu({isOutOfBounds:a()})),N}})}})),_(()=>L.className=Au()),L})()},zu=T("<div></div>"),Gu=C({display:"grid",columnGap:"$colGap",variants:{withJoystick:{true:{gridTemplateColumns:"$sizes$rowHeight auto"},false:{gridTemplateColumns:"auto"}}}});function Uu(){const e=se();return g(Ee,{input:!0,get children(){return[g(je,{get children(){return e.label}}),(()=>{const t=zu.cloneNode(!0);return k(t,g(Te,{get when(){return e.settings.joystick},get children(){return g(Vu,{get value(){return e.displayValue},get settings(){return e.settings},get onUpdate(){return e.onUpdate}})}}),null),k(t,g(Uo,{get value(){return e.displayValue},get settings(){return e.settings},get onUpdate(){return e.onUpdate}}),null),_(()=>t.className=Gu({withJoystick:!!e.settings.joystick})),t})()]}})}const Fo=Ho(["x","y"]),Wu=e=>{var t=e,{joystick:n=!0}=t,r=H(t,["joystick"]);const{value:i,settings:o}=Fo.normalize(r);return{value:i,settings:de(E({},o),{joystick:n})}};var Hu=de(E({component:Uu},Fo),{normalize:Wu});const fi=oe().number(),Fu=(e,t)=>oe().array().length(2).every.number().test(e)&&oe().schema({min:fi,max:fi}).test(t),Bn=e=>({min:e[0],max:e[1]}),Ko=(e,{bounds:[t,n]},r)=>{const i={min:r[0],max:r[1]},{min:o,max:s}=E(E({},i),e);return[qe(Number(o),t,Math.max(t,s)),qe(Number(s),Math.min(n,o),n)]},Ku=({value:e,min:t,max:n})=>{const r={min:t,max:n},i=Wo(Bn(e),{min:r,max:r}),o=[t,n],s=de(E({},i),{bounds:o});return{value:Ko(Bn(e),s,e),settings:s}};var qu=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",schema:Fu,format:Bn,sanitize:Ko,normalize:Ku});const Yu=T("<div><div><div></div></div><div></div><div></div></div>"),Xu=T("<div></div>"),Ju=C({display:"grid",columnGap:"$colGap",gridTemplateColumns:"auto calc($sizes$numberInputMinWidth * 2 + $space$rowGap)"});function Zu(e){var t=e,{value:n,bounds:[r,i],onDrag:o}=t,s=H(t,["value","bounds","onDrag"]);const a=ie(null),c=ie(null),l=ie(null),u=ie(0),d=ct("sizes","scrubberWidth");M(()=>{new Ot(a.current,({event:h,first:m,xy:[y],movement:[x],memo:p={}})=>{if(m){const{width:S,left:O}=a.current.getBoundingClientRect();u.current=S-parseFloat(d);const R=h?.target===c.current||h?.target===l.current;p.pos=Zt((y-O)/S,r,i);const z=Math.abs(p.pos-n.min)-Math.abs(p.pos-n.max);p.key=z<0||z===0&&p.pos<=n.min?"min":"max",R&&(p.pos=n[p.key])}const b=p.pos+Zt(x/u.current,0,i-r);return o({[p.key]:$l(b,s[p.key])}),p})});const f=`calc(${Jt(n.min,r,i)} * (100% - ${d} - 8px) + 4px)`,v=`calc(${1-Jt(n.max,r,i)} * (100% - ${d} - 8px) + 4px)`;return(()=>{const h=Yu.cloneNode(!0),m=h.firstChild,y=m.firstChild,x=m.nextSibling,p=x.nextSibling;return(b=>a.current=b)(h),y.style.setProperty("left",f),y.style.setProperty("right",v),(b=>c.current=b)(x),x.style.setProperty("left",f),(b=>l.current=b)(p),p.style.setProperty("right",v),_(b=>{const S=_o(),O=$o(),R=So(),z=Ln({position:"left"}),j=Ln({position:"right"});return S!==b._v$&&(h.className=b._v$=S),O!==b._v$2&&(m.className=b._v$2=O),R!==b._v$3&&(y.className=b._v$3=R),z!==b._v$4&&(x.className=b._v$4=z),j!==b._v$5&&(p.className=b._v$5=j),b},{_v$:void 0,_v$2:void 0,_v$3:void 0,_v$4:void 0,_v$5:void 0}),h})()}function Qu(){const e=se();return g(Ee,{input:!0,get children(){return[g(je,{get children(){return e.label}}),(()=>{const t=Xu.cloneNode(!0);return k(t,g(Zu,_e({get value(){return e.displayValue}},()=>e.settings,{get onDrag(){return e.onUpdate}}))),_(()=>t.className=Ju()),t})()]}})}var ef=E({component:Qu},qu);const tf=()=>{const e=new Map;return{on:(t,n)=>{let r=e.get(t);r===void 0&&(r=new Set,e.set(t,r)),r.add(n)},off:(t,n)=>{const r=e.get(t);r!==void 0&&(r.delete(n),r.size===0&&e.delete(t))},emit:(t,...n)=>{const r=e.get(t);if(r!==void 0)for(const i of r)i(...n)}}},nf=e=>(t,n,r)=>{const i=r.subscribe;return r.subscribe=(s,a,c)=>{let l=s;if(a){const u=c?.equalityFn||Object.is;let d=s(r.getState());l=f=>{const v=s(f);if(!u(d,v)){const h=d;a(d=v,h)}},c?.fireImmediately&&a(d,d)}return i(l)},e(t,n,r)},rf=function(){const e=fa(nf(()=>({data:{}}))),t=tf();this.useStore=e,this.storeId=Sa();const n={},r=new Set;this.getVisiblePaths=()=>{const o=this.getData(),s=Object.keys(o),a=[];Object.entries(n).forEach(([l,u])=>{u.render&&s.some(d=>d.indexOf(l)===0)&&!u.render(this.get)&&a.push(l+".")});const c=[];return r.forEach(l=>{l in o&&o[l].__refCount>0&&a.every(u=>l.indexOf(u)===-1)&&(!o[l].render||o[l].render(this.get))&&c.push(l)}),c},this.setOrderedPaths=o=>{o.forEach(s=>r.add(s))},this.orderPaths=o=>(this.setOrderedPaths(o),o),this.disposePaths=o=>{e.setState(s=>{const a=s.data;return o.forEach(c=>{if(c in a){const l=a[c];l.__refCount--,l.__refCount===0&&l.type in ke&&delete a[c]}}),{data:a}})},this.dispose=()=>{e.setState(()=>({data:{}}))},this.getFolderSettings=o=>n[o]||{},this.getData=()=>e.getState().data,this.addData=(o,s)=>{e.setState(a=>{const c=a.data;return Object.entries(o).forEach(([l,u])=>{let d=c[l];if(d){const f=u,{type:v,value:h}=f,m=H(f,["type","value"]);v!==d.type?Le(pe.INPUT_TYPE_OVERRIDE,v):((d.__refCount===0||s)&&Object.assign(d,m),d.__refCount++)}else c[l]=de(E({},u),{__refCount:1})}),{data:c}})},this.setValueAtPath=(o,s,a)=>{e.setState(c=>{const l=c.data;return Mr(l[o],s,o,this,a),{data:l}})},this.setSettingsAtPath=(o,s)=>{e.setState(a=>{const c=a.data;return c[o].settings=E(E({},c[o].settings),s),{data:c}})},this.disableInputAtPath=(o,s)=>{e.setState(a=>{const c=a.data;return c[o].disabled=s,{data:c}})},this.set=(o,s)=>{e.setState(a=>{const c=a.data;return Object.entries(o).forEach(([l,u])=>{try{Mr(c[l],u,void 0,void 0,s)}catch{}}),{data:c}})},this.getInput=o=>{try{return this.getData()[o]}catch{Le(pe.PATH_DOESNT_EXIST,o)}},this.get=o=>{var s;return(s=this.getInput(o))==null?void 0:s.value},this.emitOnEditStart=o=>{t.emit(`onEditStart:${o}`,this.get(o),o,de(E({},this.getInput(o)),{get:this.get}))},this.emitOnEditEnd=o=>{t.emit(`onEditEnd:${o}`,this.get(o),o,de(E({},this.getInput(o)),{get:this.get}))},this.subscribeToEditStart=(o,s)=>(t.on(`onEditStart:${o}`,s),()=>t.off(o,s)),this.subscribeToEditEnd=(o,s)=>(t.on(`onEditEnd:${o}`,s),()=>t.off(o,s));const i=(o,s,a)=>{const c={};return Object.entries(o).forEach(([l,u])=>{if(l==="")return Le(pe.EMPTY_KEY);let d=io(s,l);if(u.type===ke.FOLDER){const f=i(u.schema,d,a);Object.assign(c,f),d in n||(n[d]=u.settings)}else if(l in a)Le(pe.DUPLICATE_KEYS,l,d,a[l].path);else{const f=Ea(u,l,d,c);if(f){const{type:v,options:h,input:m}=f,y=h,{onChange:x,transient:p,onEditStart:b,onEditEnd:S}=y,O=H(y,["onChange","transient","onEditStart","onEditEnd"]);c[d]=de(E(E({type:v},O),m),{fromPanel:!0}),a[l]={path:d,onChange:x,transient:p,onEditStart:b,onEditEnd:S}}else Le(pe.UNKNOWN_INPUT,d,u)}}),c};this.getDataFromSchema=o=>{const s={};return[i(o,"",s),s]}},we=new rf,of={collapsed:!1};function sf(e,t){return{type:ke.FOLDER,schema:e,settings:E(E({},of),t)}}/*!
 * isobject <https://github.com/jonschlinkert/isobject>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */var af=function(t){return t!=null&&typeof t=="object"&&Array.isArray(t)===!1};/*!
 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */var cf=af;function di(e){return cf(e)===!0&&Object.prototype.toString.call(e)==="[object Object]"}var qo=function(t){var n,r;return!(di(t)===!1||(n=t.constructor,typeof n!="function")||(r=n.prototype,di(r)===!1)||r.hasOwnProperty("isPrototypeOf")===!1)};/*!
 * is-extendable <https://github.com/jonschlinkert/is-extendable>
 *
 * Copyright (c) 2015-2017, Jon Schlinkert.
 * Released under the MIT License.
 */var lf=qo,or=function(t){return lf(t)||typeof t=="function"||Array.isArray(t)};/*!
 * for-in <https://github.com/jonschlinkert/for-in>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */var uf=function(t,n,r){for(var i in t)if(n.call(r,t[i],i,t)===!1)break},ff=or,df=uf;function Yo(e,t){for(var n=arguments.length,r=0;++r<n;){var i=arguments[r];Mn(i)&&df(i,vf,e)}return e}function vf(e,t){if(!!hf(t)){var n=this[t];Mn(e)&&Mn(n)?Yo(n,e):this[t]=e}}function Mn(e){return ff(e)&&!Array.isArray(e)}function hf(e){return e!=="__proto__"&&e!=="constructor"&&e!=="prototype"}var gf=Yo;/*!
 * get-value <https://github.com/jonschlinkert/get-value>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */var pf=function(e,t,n,r,i){if(!mf(e)||!t)return e;if(t=Mt(t),n&&(t+="."+Mt(n)),r&&(t+="."+Mt(r)),i&&(t+="."+Mt(i)),t in e)return e[t];for(var o=t.split("."),s=o.length,a=-1;e&&++a<s;){for(var c=o[a];c[c.length-1]==="\\";)c=c.slice(0,-1)+"."+o[++a];e=e[c]}return e};function mf(e){return e!==null&&(typeof e=="object"||typeof e=="function")}function Mt(e){return e?Array.isArray(e)?e.join("."):e:""}/*!
 * assign-symbols <https://github.com/jonschlinkert/assign-symbols>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */var yf=function(e,t){if(e===null||typeof e>"u")throw new TypeError("expected first argument to be an object.");if(typeof t>"u"||typeof Symbol>"u"||typeof Object.getOwnPropertySymbols!="function")return e;for(var n=Object.prototype.propertyIsEnumerable,r=Object(e),i=arguments.length,o=0;++o<i;)for(var s=Object(arguments[o]),a=Object.getOwnPropertySymbols(s),c=0;c<a.length;c++){var l=a[c];n.call(s,l)&&(r[l]=s[l])}return r},bf=or,xf=yf,wf=Object.assign||function(e){if(e===null||typeof e>"u")throw new TypeError("Cannot convert undefined or null to object");vi(e)||(e={});for(var t=1;t<arguments.length;t++){var n=arguments[t];_f(n)&&(n=Sf(n)),vi(n)&&($f(e,n),xf(e,n))}return e};function $f(e,t){for(var n in t)kf(t,n)&&(e[n]=t[n])}function _f(e){return e&&typeof e=="string"}function Sf(e){var t={};for(var n in e)t[n]=e[n];return t}function vi(e){return e&&typeof e=="object"||bf(e)}function kf(e,t){return Object.prototype.hasOwnProperty.call(e,t)}/*!
 * split-string <https://github.com/jonschlinkert/split-string>
 *
 * Copyright (c) 2015-2017, Jon Schlinkert.
 * Released under the MIT License.
 */var Pf=wf,Tf=function(e,t,n){if(typeof e!="string")throw new TypeError("expected a string");typeof t=="function"&&(n=t,t=null),typeof t=="string"&&(t={sep:t});var r=Pf({sep:"."},t),i=r.quotes||['"',"'","`"],o;r.brackets===!0?o={"<":">","(":")","[":"]","{":"}"}:r.brackets&&(o=r.brackets);var s=[],a=[],c=[""],l=r.sep,u=e.length,d=-1,f;function v(){if(o&&a.length)return o[a[a.length-1]]}for(;++d<u;){var h=e[d],m=e[d+1],y={val:h,idx:d,arr:c,str:e};if(s.push(y),h==="\\"){y.val=Ef(r,e,d)===!0?h+m:m,y.escaped=!0,typeof n=="function"&&n(y),c[c.length-1]+=y.val,d++;continue}if(o&&o[h]){a.push(h);var x=v(),p=d+1;if(e.indexOf(x,p+1)!==-1)for(;a.length&&p<u;){var b=e[++p];if(b==="\\"){b++;continue}if(i.indexOf(b)!==-1){p=In(e,b,p+1);continue}if(x=v(),a.length&&e.indexOf(x,p+1)===-1)break;if(o[b]){a.push(b);continue}x===b&&a.pop()}if(f=p,f===-1){c[c.length-1]+=h;continue}h=e.slice(d,f+1),y.val=h,y.idx=d=f}if(i.indexOf(h)!==-1){if(f=In(e,h,d+1),f===-1){c[c.length-1]+=h;continue}Cf(h,r)===!0?h=e.slice(d,f+1):h=e.slice(d+1,f),y.val=h,y.idx=d=f}if(typeof n=="function"&&(n(y,s),h=y.val,d=y.idx),y.val===l&&y.split!==!1){c.push("");continue}c[c.length-1]+=y.val}return c};function In(e,t,n,r){var i=e.indexOf(t,n);return e.charAt(i-1)==="\\"?In(e,t,i+1):i}function Cf(e,t){return t.keepDoubleQuotes===!0&&e==='"'||t.keepSingleQuotes===!0&&e==="'"?!0:t.keepQuotes}function Ef(e,t,n){return typeof e.keepEscaping=="function"?e.keepEscaping(t,n):e.keepEscaping===!0||t[n+1]==="\\"}/*!
 * is-extendable <https://github.com/jonschlinkert/is-extendable>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */var Xo=function(t){return typeof t<"u"&&t!==null&&(typeof t=="object"||typeof t=="function")},hi=Xo,Of=function(t){hi(t)||(t={});for(var n=arguments.length,r=1;r<n;r++){var i=arguments[r];hi(i)&&Rf(t,i)}return t};function Rf(e,t){for(var n in t)Lf(t,n)&&(e[n]=t[n])}function Lf(e,t){return Object.prototype.hasOwnProperty.call(e,t)}/*!
 * set-value <https://github.com/jonschlinkert/set-value>
 *
 * Copyright (c) 2014-2015, 2017, Jon Schlinkert.
 * Released under the MIT License.
 */var Nf=Tf,jf=Of,gi=qo,pi=Xo,Df=function(e,t,n){if(!pi(e)||(Array.isArray(t)&&(t=[].concat.apply([],t).join(".")),typeof t!="string"))return e;for(var r=Nf(t,{sep:".",brackets:!0}).filter(Af),i=r.length,o=-1,s=e;++o<i;){var a=r[o];if(o!==i-1){pi(s[a])||(s[a]={}),s=s[a];continue}gi(s[a])&&gi(n)?s[a]=jf({},s[a],n):s[a]=n}return e};function Af(e){return e!=="__proto__"&&e!=="constructor"&&e!=="prototype"}var xn=or,mi=gf,Bf=pf,yi=Df,Mf=function(t,n,r){if(!xn(t))throw new TypeError("expected an object");if(typeof n!="string"||r==null)return mi.apply(null,arguments);if(typeof r=="string")return yi(t,n,r),t;var i=Bf(t,n);return xn(r)&&xn(i)&&(r=mi({},i,r)),yi(t,n,r),t};const If=e=>"__levaInput"in e,wn=(e,t)=>{const n={},r=t?t.toLowerCase():null;return e.forEach(i=>{const[o,s]=ka(i);(!r||o.toLowerCase().indexOf(r)>-1)&&Mf(n,s,{[o]:{__levaInput:!0,path:i}})}),n},Vf=T("<div><div></div></div>");function zf(e){return(()=>{const t=Vf.cloneNode(!0),n=t.firstChild;return t.$$click=()=>e.toggle(),k(t,g(rr,{get toggled(){return e.toggled}}),n),k(n,()=>e.name),_(()=>t.className=bc()),t})()}Ce(["click"]);const Gf=T("<div></div>");function Uf(e){return g(fo.Provider,{value:e,get children(){return e.children}})}function Wf(e){const{displayValue:t,onChange:n,onUpdate:r}=zo(e),i=Ke[e.type].component;return i?g(Uf,{get value(){return e.value},get key(){return e.valueKey},get id(){return""+e.path},get displayValue(){return t()},onChange:n,onUpdate:r,get settings(){return e.settings},get setSettings(){return e.setSettings},get label(){return e.label},get children(){const o=Gf.cloneNode(!0);return k(o,g(Kn,{component:i})),_(()=>o.className=$c({disabled:e.disabled})),o}}):(Le(pe.NO_COMPONENT_FOR_TYPE,e.type,e.path),null)}const Hf=C("button",{display:"block",$reset:"",fontWeight:"$button",color:"$highlight3",height:"$rowHeight",borderStyle:"none",borderRadius:"$sm",backgroundColor:"$accent2",cursor:"pointer",$hover:"$accent3",$active:"$accent3 $accent1",$focus:""}),Ff=T("<button></button>");function Kf(e){return g(Ee,{get children(){const t=Ff.cloneNode(!0);return t.$$click=()=>e.onClick(),k(t,()=>e.label),_(()=>t.className=Hf()),t}})}Ce(["click"]);const qf=C({$flex:"",justifyContent:"flex-end",gap:"$colGap"}),Yf=C({$reset:"",cursor:"pointer",borderRadius:"$xs","&:hover":{backgroundColor:"$elevation3"}}),Xf=T("<div></div>"),Jf=T("<button></button>"),Zf=({label:e,opts:t})=>{let n=typeof e=="string"&&e.trim()===""?null:e,r=t;return typeof t.opts=="object"&&(r.label!==void 0&&(n=t.label),r=t.opts),{label:n,opts:r}};function Qf(e){const{label:t,opts:n}=Zf(e);return g(Ee,{input:!!t,get children(){return[ot(()=>t&&g(je,{children:t})),(()=>{const r=Xf.cloneNode(!0);return k(r,()=>Object.entries(n).map(([i,o])=>(()=>{const s=Jf.cloneNode(!0);return s.$$click=()=>o(),k(s,i),_(()=>s.className=Yf()),s})())),_(()=>r.className=qf()),r})()]}})}Ce(["click"]);const ed={[ke.BUTTON]:Kf,[ke.BUTTON_GROUP]:Qf},td=e=>{const[t,{set:n,setSettings:r,disable:i,storeId:o,emitOnEditStart:s,emitOnEditEnd:a}]=nu(e.path);return g(vs,{get children(){return[g(fn,{get when(){return!t()},children:null}),g(fn,{get when(){return ot(()=>t().type in ke,!0)()?t():void 0},get children(){return g(Kn,_e({get component(){return ed[t().type]},get path(){return e.path}},t))}}),g(fn,{get when(){return ot(()=>t().type in Ke,!0)()?t():void 0},get children(){return g(Wf,{get type(){return t().type},get label(){return t().label},storeId:o,get path(){return e.path},get valueKey(){return t().key},setValue:n,get value(){return t().value},setSettings:r,get settings(){return t().settings},disable:i,emitOnEditStart:s,emitOnEditEnd:a,fromPanel:!0,disabled:!1,optional:!1})}})]}})},nd=T("<div></div>"),rd=T("<div><div></div></div>"),id=e=>{const t=er(),n=io(e.path,e.name),{collapsed:r,color:i}=t.getFolderSettings(n),[o,s]=A(!r);let a;const c=ct("colors","folderWidgetColor"),l=ct("colors","folderTextColor");return M(()=>{a.style.setProperty("--leva-colors-folderWidgetColor",i||c),a.style.setProperty("--leva-colors-folderTextColor",i||l)}),(()=>{const u=nd.cloneNode(!0),d=a;return typeof d=="function"?d(u):a=u,k(u,g(zf,{get name(){return e.name},get toggled(){return o()},toggle:()=>s(f=>!f)}),null),k(u,g(Jo,{parent:n,get tree(){return e.tree},isRoot:!1,get toggled(){return o()}}),null),_(()=>u.className=Qt({isRoot:!1})),u})()},Jo=e=>{const{wrapperRef:t,contentRef:n}=tu();return(()=>{const r=rd.cloneNode(!0),i=r.firstChild;return(o=>t.current=o)(r),(o=>n.current=o)(i),k(i,g(Hn,{get each(){return Object.keys(e.tree)},children:o=>g(Te,{get when(){return If(e.tree[o])},get fallback(){return g(id,{name:o,get path(){return e.parent},get tree(){return e.tree[o]}})},get children(){return g(td,{get key(){return e.tree[o].path},get valueKey(){return e.tree[o].valueKey},get path(){return e.tree[o].path}})}})})),_(o=>{var s;const a=On({isRoot:(s=e.isRoot)!=null?s:!1,fill:e.fill,flat:e.flat}),c=e.toggled?{overflow:"visible",height:"auto"}:{overflow:"hidden",height:0},l=bo({isRoot:e.isRoot,toggled:e.toggled});return a!==o._v$&&(r.className=o._v$=a),o._v$2=Fn(r,c,o._v$2),l!==o._v$3&&(i.className=o._v$3=l),o},{_v$:void 0,_v$2:void 0,_v$3:void 0}),r})()},od=C({position:"relative",fontFamily:"$mono",fontSize:"$root",color:"$rootText",backgroundColor:"$elevation1",variants:{fill:{false:{position:"fixed",top:"10px",right:"10px",zIndex:1e3,width:"$rootWidth"},true:{position:"relative",width:"100%"}},flat:{false:{borderRadius:"$lg",boxShadow:"$level1"}},oneLineLabels:{true:{[`${wo}`]:{gridTemplateColumns:"auto",gridAutoColumns:"minmax(max-content, 1fr)",gridAutoRows:"minmax($sizes$rowHeight), auto)",rowGap:0,columnGap:0,marginTop:"$rowGap"}}},hideTitleBar:{true:{$$titleBarHeight:"0px"},false:{$$titleBarHeight:"$sizes$titleBarHeight"}}},"&,*,*:after,*:before":{boxSizing:"border-box"},"*::selection":{backgroundColor:"$accent2"}}),Zo=40,tn=C("i",{$flexCenter:"",width:Zo,userSelect:"none",cursor:"pointer","> svg":{fill:"$highlight1",transition:"transform 350ms ease, fill 250ms ease"},"&:hover > svg":{fill:"$highlight3"},variants:{active:{true:{"> svg":{fill:"$highlight2"}}}}}),sd=C("div",{display:"flex",alignItems:"stretch",justifyContent:"space-between",height:"$titleBarHeight",variants:{mode:{drag:{cursor:"grab"}}}}),ad=C("div",{$flex:"",position:"relative",width:"100%",overflow:"hidden",transition:"height 250ms ease",color:"$highlight3",paddingLeft:"$md",[`> ${tn}`]:{height:30},variants:{toggled:{true:{height:30},false:{height:0}}}}),cd=C({$reset:"",flex:1,position:"relative",height:30,width:"100%",backgroundColor:"transparent",fontSize:"10px",borderRadius:"$root","&:focus":{},"&::placeholder":{color:"$highlight2"}}),ld=C("div",{$flexCenter:"",flex:1,"> svg":{fill:"$highlight1"},color:"$highlight1",variants:{drag:{true:{$draggable:"","> svg":{transition:"fill 250ms ease"},"&:hover":{color:"$highlight3"},"&:hover > svg":{fill:"$highlight3"}}},filterEnabled:{false:{paddingRight:Zo}}}}),ud=T('<input placeholder="[Open filter with CMD+SHIFT+L]">'),fd=T('<div><svg xmlns="http://www.w3.org/2000/svg" height="14" width="14" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg></div>'),dd=T("<div><div></div><div></div></div>"),vd=T("<div></div>"),hd=T('<svg width="20" height="10" viewBox="0 0 28 14" xmlns="http://www.w3.org/2000/svg"><circle cx="2" cy="2" r="2"></circle><circle cx="14" cy="2" r="2"></circle><circle cx="26" cy="2" r="2"></circle><circle cx="2" cy="12" r="2"></circle><circle cx="14" cy="12" r="2"></circle><circle cx="26" cy="12" r="2"></circle></svg>'),gd=T('<div><svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 20 20"><path d="M9 9a2 2 0 114 0 2 2 0 01-4 0z"></path><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a4 4 0 00-3.446 6.032l-2.261 2.26a1 1 0 101.414 1.415l2.261-2.261A4 4 0 1011 5z" clip-rule="evenodd"></path></svg></div>'),pd=e=>{const[t,n]=A(""),r=W(()=>Oa(e.setFilter,50)),i=()=>{e.setFilter(""),n("")},o=s=>{const a=s.currentTarget.value;e.toggle(!0),n(a)};return M(()=>{r()(t())}),[(()=>{const s=ud.cloneNode(!0);s.$$input=o,s.$$pointerdown=c=>c.stopPropagation();const a=e.ref;return typeof a=="function"?a(s):e.ref=s,_(c=>{const l=cd(),u=t();return l!==c._v$&&(s.className=c._v$=l),u!==c._v$2&&(s.value=c._v$2=u),c},{_v$:void 0,_v$2:void 0}),s})(),(()=>{const s=fd.cloneNode(!0);return s.$$click=()=>i(),_(a=>{const c=tn(),l=t()?"visible":"hidden";return c!==a._v$3&&(s.className=a._v$3=c),l!==a._v$4&&s.style.setProperty("visibility",a._v$4=l),a},{_v$3:void 0,_v$4:void 0}),s})()]};function md(e){const[t,n]=A(!1);let r;M(()=>{t()?r?.focus():r?.blur()});let i;return M(()=>{new Ot(i,({offset:[o,s]})=>e.onDrag({x:o,y:s}),{filterTaps:!0})}),M(()=>{const o=s=>{s.key==="L"&&s.shiftKey&&s.metaKey&&n(a=>!a)};window.addEventListener("keydown",o),$e(()=>window.removeEventListener("keydown",o))},[]),[(()=>{const o=dd.cloneNode(!0),s=o.firstChild,a=s.nextSibling;s.$$click=()=>e.toggle(),k(s,g(rr,{get toggled(){return e.toggled},width:12,height:8}));const c=i;return typeof c=="function"?c(a):i=a,k(a,(()=>{const l=ot(()=>!!(e.title===void 0&&e.drag),!0);return()=>l()?hd.cloneNode(!0):e.title})()),k(o,(()=>{const l=ot(()=>!!e.filterEnabled,!0);return()=>l()&&(()=>{const u=gd.cloneNode(!0);return u.$$click=()=>n(d=>!d),_(()=>u.className=tn({active:t()})),u})()})(),null),_(l=>{const u=sd({mode:e.drag?"drag":void 0}),d=tn({active:!e.toggle}),f=ld({filterEnabled:e.filterEnabled});return u!==l._v$5&&(o.className=l._v$5=u),d!==l._v$6&&(s.className=l._v$6=d),f!==l._v$7&&(a.className=l._v$7=f),l},{_v$5:void 0,_v$6:void 0,_v$7:void 0}),o})(),(()=>{const o=vd.cloneNode(!0);return k(o,g(pd,{ref(s){const a=r;typeof a=="function"?a(s):r=s},get setFilter(){return e.setFilter},get toggle(){return e.toggle}})),_(()=>o.className=ad({toggled:t()})),o})()]}Ce(["pointerdown","input","click"]);const yd=T("<div></div>");function bd(e){const t=W(()=>vc(e.theme),[]),[n,r]=A(!0);return g(Te,{get when(){return e.store},get children(){return g(vo.Provider,{get value(){return t()},get children(){return g(xd,{get store(){return e.store},get toggled(){return n()},setToggle:r,get rootClass(){return t().className},flat:!1,fill:!1,titleBar:!0})}})}})}const xd=e=>{const[t,n]=A(""),[r,i]=A(wn(e.store.getVisiblePaths(),t()));M(()=>{i(wn(e.store.getVisiblePaths(),t())),e.store.useStore.subscribe(()=>{i(wn(e.store.getVisiblePaths(),t()))})});const[o,s]=Go();return g(go.Provider,{value:{hideCopyButton:!1},get children(){const a=yd.cloneNode(!0);return(c=>o.current=c)(a),a.style.setProperty("display","block"),k(a,g(Te,{get when(){return e.titleBar},get children(){return g(md,{onDrag:s,setFilter:n,toggle:c=>e.setToggle(l=>c??!l),get toggled(){return e.toggled},get title(){return typeof e.titleBar=="object"&&e.titleBar.title||void 0},get drag(){var c;return typeof e.titleBar=="object"&&(c=e.titleBar.drag)!=null?c:!0},get filterEnabled(){var c;return typeof e.titleBar=="object"&&(c=e.titleBar.filter)!=null?c:!0}})}}),null),k(a,g(ho.Provider,{value:we,get children(){return g(Jo,{isRoot:!0,get fill(){return e.fill},get flat(){return e.flat},get tree(){return r()},get toggled(){return e.toggled}})}}),null),_(()=>a.className=`${od({fill:e.fill,flat:e.flat,oneLineLabels:e.oneLineLabels,hideTitleBar:!1})} ${e.rootClass}`),a}})};function Qo(e){var t=e,{store:n}=t,r=H(t,["store"]);const i=er();return g(bd,_e({store:n===void 0?i:n},r))}let bi=!1,dt=null;function wd(){M(()=>{bi||(dt||(dt=document.getElementById("leva__root")||Object.assign(document.createElement("div"),{id:"leva__root"}),document.body&&(document.body.appendChild(dt),dt.className="fixed top-0 right-20",ji(()=>g(Qo,{store:we}),dt))),bi=!0)})}function $d(e,t,n,r,i){let o,s,a,c,l;return typeof e=="string"?(s=e,o=t,Array.isArray(n)?l=n:n&&("store"in n?(c=n,l=r):(a=n,Array.isArray(r)?l=r:(c=r,l=i)))):(o=e,Array.isArray(t)?l=t:(c=t,l=n)),{schema:o,folderName:s,folderSettings:a,hookSettings:c,deps:l||[]}}function $n(e,t,n,r){const{folderName:i,schema:o,folderSettings:s,hookSettings:a,deps:c}=$d(e,t,n,r),l=W(()=>{const x=typeof o=="function"?o():o;return i?{[i]:sf(x,s)}:x});wd();const u=W(()=>we.getDataFromSchema(l())),d=W(()=>{const[x,p]=u(),b=[],S=[],O={},R={},z={};return Object.values(p).forEach(({path:j,onChange:L,onEditStart:N,onEditEnd:B,transient:V})=>{b.push(j),L?(O[j]=L,V||S.push(j)):S.push(j),N&&(R[j]=N),B&&(z[j]=B)}),[b,S,O,R,z]}),f=W(()=>we.orderPaths(d()[0])),[v,h]=A(u()[0]),[m,y]=Qi(u()[0]);return Si(()=>{let[x,p]=d(),[b]=u();we.useStore.subscribe(S=>{const O=E(E({},b),S.data);return Ra(O,p)},S=>{h(S),y(S)})}),_(()=>{we.addData(u()[0],!1),$e(()=>we.disposePaths(f()))}),m}Ve(Pe.SELECT,Al);Ve(Pe.NUMBER,Sl);Ve(Pe.COLOR,su);Ve(Pe.STRING,du);Ve(Pe.BOOLEAN,xu);Ve(Pe.INTERVAL,ef);Ve(Pe.VECTOR3D,Du);Ve(Pe.VECTOR2D,Hu);const _d=T("<div></div>"),Sd=T("<div><canvas></canvas></div>"),kd=(e,t)=>({get read(){return e()},get write(){return t()},swap(){[e,t]=[t,e]}});function Pd(e,t,n){let r=0,i=0,o=0;const s=Math.floor(e*6),a=e*6-s,c=n*(1-t),l=n*(1-a*t),u=n*(1-(1-a)*t);switch(s%6){case 0:r=n,i=u,o=c;break;case 1:r=l,i=n,o=c;break;case 2:r=c,i=n,o=u;break;case 3:r=c,i=l,o=n;break;case 4:r=u,i=c,o=n;break;case 5:r=n,i=c,o=l;break}return{r:Math.round(r*255),g:Math.round(i*255),b:Math.round(o*255)}}const Ae=0,xi=3,Td=e=>(M(()=>{if(!e.device||!e.context)return;const t=navigator.gpu.getPreferredCanvasFormat(),n=e.device.createShaderModule({code:`
`+Rs}),r=e.device.createShaderModule({code:Ue+`
`+Ls}),i=e.device.createShaderModule({code:Ue+`
`+Ns}),o=e.device.createShaderModule({code:`
`+js}),s=e.device.createShaderModule({code:`
`+Ds}),a=e.device.createShaderModule({code:Ue+`
`+As}),c=e.device.createShaderModule({code:Ue+`
`+Bs}),l=e.device.createShaderModule({code:Ue+`
`+Ms}),u=e.device.createShaderModule({code:Ue+`
`+Is}),d=e.device.createShaderModule({code:Ue+`
`+Vs}),f=e.device.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}}]}),v=e.device.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}}]}),h=e.device.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,texture:{viewDimension:"2d",sampleType:"unfilterable-float"}},{binding:1,visibility:GPUShaderStage.FRAGMENT,texture:{viewDimension:"2d",sampleType:"unfilterable-float"}},{binding:2,visibility:GPUShaderStage.FRAGMENT,texture:{viewDimension:"2d",sampleType:"unfilterable-float"}}]}),m=e.device.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,texture:{viewDimension:"2d",sampleType:"unfilterable-float"}},{binding:1,visibility:GPUShaderStage.FRAGMENT,texture:{viewDimension:"2d",sampleType:"unfilterable-float"}}]}),y=e.device.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,texture:{viewDimension:"2d",sampleType:"unfilterable-float"}},{binding:1,visibility:GPUShaderStage.FRAGMENT,texture:{viewDimension:"2d",sampleType:"unfilterable-float"}},{binding:2,visibility:GPUShaderStage.FRAGMENT,texture:{viewDimension:"2d",sampleType:"unfilterable-float"}}]}),x=e.device.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,texture:{viewDimension:"2d",sampleType:"unfilterable-float"}}]});e.device.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,texture:{viewDimension:"2d",sampleType:"unfilterable-float"}},{binding:1,visibility:GPUShaderStage.FRAGMENT,texture:{viewDimension:"2d",sampleType:"unfilterable-float"}}]});const p=e.device.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,texture:{viewDimension:"2d",sampleType:"unfilterable-float"}},{binding:1,visibility:GPUShaderStage.FRAGMENT,texture:{viewDimension:"2d",sampleType:"unfilterable-float"}}]}),b=e.device.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}}]}),S={vertex:{module:n,entryPoint:"vert"},primitive:{topology:"triangle-strip",stripIndexFormat:"uint16"}},O=e.device.createRenderPipeline({...S,fragment:{module:d,entryPoint:"splat",targets:[{format:"rgba32float"},{format:"rg32float"}]},layout:e.device.createPipelineLayout({bindGroupLayouts:[f,m,b]})}),R=e.device.createRenderPipeline({...S,fragment:{module:i,entryPoint:"advect",targets:[{format:"rgba32float"},{format:"rg32float"}]},layout:e.device.createPipelineLayout({bindGroupLayouts:[f,y]})});e.device.createRenderPipeline({...S,fragment:{module:o,entryPoint:"clear",targets:[{format:"r32float"}]},layout:e.device.createPipelineLayout({bindGroupLayouts:[f,x]})}),e.device.createRenderPipeline({...S,fragment:{module:s,entryPoint:"clear",targets:[{format:"r32float"}]},layout:e.device.createPipelineLayout({bindGroupLayouts:[f,x]})});const z=e.device.createRenderPipeline({...S,fragment:{module:a,entryPoint:"divergence",targets:[{format:"r32float"}]},layout:e.device.createPipelineLayout({bindGroupLayouts:[f,x]})}),j=e.device.createRenderPipeline({...S,fragment:{module:c,entryPoint:"jacobi",targets:[{format:"r32float"}]},layout:e.device.createPipelineLayout({bindGroupLayouts:[f,x,x]})}),L=e.device.createRenderPipeline({...S,fragment:{module:l,entryPoint:"gradient",targets:[{format:"rg32float"}]},layout:e.device.createPipelineLayout({bindGroupLayouts:[f,p]})}),N=e.device.createRenderPipeline({...S,fragment:{module:u,entryPoint:"vorticity",targets:[{format:"rg32float"}]},layout:e.device.createPipelineLayout({bindGroupLayouts:[f,x]})}),B=e.device.createRenderPipeline({...S,fragment:{module:r,entryPoint:"display",targets:[{format:t}]},layout:e.device.createPipelineLayout({bindGroupLayouts:[f,h]})}),V=()=>e.width,X=()=>e.height,ce=()=>e.width>>Ae,le=()=>e.height>>Ae,ye=()=>e.width>>xi,ge=()=>e.height>>xi;_(()=>{e.context.configure({device:e.device,alphaMode:"opaque",format:t,usage:GPUTextureUsage.COPY_SRC|GPUTextureUsage.RENDER_ATTACHMENT})});const be=(P,$)=>G=>(G&&G.destroy(),e.device.createTexture({format:P??t,dimension:"2d",mipLevelCount:1,size:[($?.width??ce)(),($?.height??le)()],usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT})),an=(P,$)=>kd(W(be(P,$)),W(be(P,$))),ze=an("rgba32float"),te=an("rg32float"),Ge=an("r32float",{width:ye,height:ge}),sr=W(be("r32float",{width:ye,height:ge})),cn=e.device.createBuffer({size:7<<2,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST,mappedAtCreation:!1}),es=()=>e.device.createBuffer({size:10<<2,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST,mappedAtCreation:!1}),ar=e.device.createBuffer({size:6<<2,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST,mappedAtCreation:!1}),Oe=[],cr=P=>{const $={identifier:P.identifier,x:P.clientX>>Ae,y:P.clientY>>Ae,time:Date.now(),previous:{time:Date.now(),x:P.clientX>>Ae,y:P.clientY>>Ae},uniform:es()};var G=e.config.color;e.setConfig("color",Pd(Math.random(),(Math.random()>1/4?1:0)/2+Math.random()*.5,Math.random()>1/6?1:0));var De=1;e.device.queue.writeBuffer($.uniform,0<<2,new Float32Array([G.r/255*De,G.g/255*De,G.b/255*De,1,$.x,$.y,0,0,$.previous.x,$.previous.y])),Oe.push($)},ln=P=>{const $=Oe.find(G=>G.identifier===P.identifier);if(!$){cr(P);return}$.previous.time=$.time,$.previous.x=$.x,$.previous.y=$.y,$.time=Date.now(),$.x=P.clientX>>Ae,$.y=P.clientY>>Ae,e.device.queue.writeBuffer($.uniform,4<<2,new Float32Array([$.x,$.y,($.x-$.previous.x)/($.time-$.previous.time+1)*1e3,($.y-$.previous.y)/($.time-$.previous.time+1)*1e3,$.previous.x,$.previous.y]))},Ye=P=>{const $=Oe.find(G=>G.identifier===P.identifier);!$||(Oe.splice(Oe.indexOf($),1),$.uniform.destroy())};xe(document.querySelector("canvas"),"mousemove",P=>{const $={clientX:P.clientX,clientY:P.clientY,identifier:-1};!Oe.find(De=>De.identifier===$.identifier)||ln($)}),xe(document.querySelector("canvas"),"mousedown",P=>{const $={clientX:P.clientX,clientY:P.clientY,identifier:-1};Ye($),P.button===0&&ln($)}),xe(document.querySelector("canvas"),"mouseup",P=>{const $={clientX:P.clientX,clientY:P.clientY,identifier:-1};Ye($)}),xe(window,"wheel",P=>{P.preventDefault()},{passive:!1}),xe(window,"touchstart",P=>{P.preventDefault(),Ye({identifier:-1,clientX:0,clientY:0});for(let $=0;$<P.changedTouches.length;$++)cr(P.changedTouches[$])},{passive:!1}),xe(window,"touchmove",P=>{P.preventDefault(),Ye({identifier:-1,clientX:0,clientY:0});for(let $=0;$<P.changedTouches.length;$++)ln(P.changedTouches[$])},{passive:!1});var Rt=!1;xe(window,"keydown",P=>{P.key.includes("Shift")&&(Rt=!0)},{passive:!1}),xe(window,"keyup",P=>{P.key.includes("Shift")&&(Rt=!1)},{passive:!1}),xe(window,"touchend",({changedTouches:P})=>{Ye({identifier:-1,clientX:0,clientY:0});for(let $=0;$<P.length;$++)Ye(P[$])}),_(()=>{e.device.queue.writeBuffer(cn,0<<2,new Int32Array([ce(),le(),ye(),ge(),V(),X()])),e.device.queue.writeBuffer(ar,0<<2,new Int32Array([ce(),le(),ye(),ge(),V(),X()]))});const Xe=e.device.createBindGroup({layout:f,entries:[{binding:0,resource:{buffer:cn}}]}),ts=e.device.createBindGroup({layout:v,entries:[{binding:0,resource:{buffer:ar}}]});let lr,ur=new Date;const fr=()=>{let P=new Date,$=Math.min((+P-+ur)/1e3,1/10);e.device.queue.writeBuffer(cn,6<<2,new Float32Array([$])),ur=P;const G=e.device.createCommandEncoder();var De=Oe.length===0&&Rt,Lt=Oe.length===0&&e.config.paused||De;for(const ue of Oe){const ne=G.beginRenderPass({colorAttachments:[{view:ze.write.createView(),clearValue:{r:0,g:0,b:0,a:1},storeOp:"store",loadOp:"clear"},{view:te.write.createView(),clearValue:{r:0,g:0,b:0,a:1},storeOp:"store",loadOp:"clear"}]});ne.setPipeline(O),ne.setBindGroup(0,Xe),ne.setBindGroup(1,e.device.createBindGroup({layout:m,entries:[{binding:0,resource:ze.read.createView()},{binding:1,resource:te.read.createView()}]})),ne.setBindGroup(2,e.device.createBindGroup({layout:b,entries:[{binding:0,resource:{buffer:ue.uniform}}]})),ne.draw(4,1,0,0),ne.end(),Rt||ze.swap(),te.swap()}for(let ue=0;ue<1;ue+=1){{const I=G.beginRenderPass({colorAttachments:[{view:sr().createView(),clearValue:{r:0,g:0,b:0,a:1},storeOp:"store",loadOp:"clear"}]});I.setPipeline(z),I.setBindGroup(0,Xe),I.setBindGroup(1,e.device.createBindGroup({layout:x,entries:[{binding:0,resource:te.read.createView()}]})),I.draw(4,1,0,0),I.end()}const ne=e.device.createBindGroup({layout:x,entries:[{binding:0,resource:sr().createView()}]});let vr=[Ge.write.createView(),Ge.read.createView()],ns=vr.map(I=>e.device.createBindGroup({layout:x,entries:[{binding:0,resource:I}]}));for(let I=0;I<e.config.pressureSolverIterations;I++){var dr=I%2;const Je=G.beginRenderPass({colorAttachments:[{view:vr[dr],clearValue:{r:0,g:0,b:0,a:1},storeOp:"store",loadOp:"clear"}]});Je.setPipeline(j),Je.setBindGroup(0,Xe),Je.setBindGroup(1,ne),Je.setBindGroup(2,ns[1-dr]),Je.draw(4,1,0,0),Je.end(),Ge.swap()}if(!Lt){if(!Lt){const I=G.beginRenderPass({colorAttachments:[{view:te.write.createView(),clearValue:{r:0,g:0,b:0,a:1},storeOp:"store",loadOp:"clear"}]});I.setPipeline(L),I.setBindGroup(0,Xe),I.setBindGroup(1,e.device.createBindGroup({layout:p,entries:[{binding:0,resource:Ge.read.createView()},{binding:1,resource:te.read.createView()}]})),I.draw(4,1,0,0),I.end(),te.swap()}if(!Lt){const I=G.beginRenderPass({colorAttachments:[{view:ze.write.createView(),clearValue:{r:0,g:0,b:0,a:1},storeOp:"store",loadOp:"clear"},{view:te.write.createView(),clearValue:{r:0,g:0,b:0,a:1},storeOp:"store",loadOp:"clear"}]});I.setPipeline(R),I.setBindGroup(0,Xe),I.setBindGroup(1,e.device.createBindGroup({layout:y,entries:[{binding:0,resource:ze.read.createView()},{binding:1,resource:te.read.createView()},{binding:2,resource:Ge.read.createView()}]})),I.draw(4,1,0,0),I.end(),ze.swap(),te.swap(),Ge.swap()}}}if(!Lt){const ue=G.beginRenderPass({colorAttachments:[{view:te.write.createView(),clearValue:{r:0,g:0,b:0,a:1},storeOp:"store",loadOp:"clear"}]});ue.setPipeline(N),ue.setBindGroup(0,Xe),ue.setBindGroup(1,e.device.createBindGroup({layout:x,entries:[{binding:0,resource:te.read.createView()}]})),ue.draw(4,1,0,0),ue.end(),te.swap()}{const ue=e.context.getCurrentTexture(),ne=G.beginRenderPass({colorAttachments:[{view:ue.createView(),clearValue:{r:0,g:0,b:0,a:1},storeOp:"store",loadOp:"clear"}]});ne.setPipeline(B),ne.setBindGroup(0,ts),ne.setBindGroup(1,e.device.createBindGroup({layout:h,entries:[{binding:0,resource:ze.read.createView()},{binding:1,resource:Ge.read.createView()},{binding:2,resource:te.read.createView()}]})),ne.draw(4,1,0,0),ne.end()}e.device.queue.submit([G.finish()]),lr=requestAnimationFrame(fr)};ss(fr),$e(()=>cancelAnimationFrame(lr))}),_d.cloneNode(!0)),Cd=()=>{const[e,t]=A(window.innerWidth),[n,r]=A(window.innerHeight),[i,o]=A(),[s,a]=A(),[c,l]=Qi({pressureSolverIterations:100,color:{r:1,g:1,b:1},paused:!1}),u=(...v)=>{var h=l(...v);document.querySelector("#leva__root")?.remove(),we.disposePaths([v[0]]);try{we.setValueAtPath(v[0],v[1],!1)}catch{console.log("E".e)}return f($n({pressureSolverIterations:c.pressureSolverIterations,color:{...c.color},paused:c.paused})),h},[d,f]=A($n({pressureSolverIterations:c.pressureSolverIterations,color:{...c.color},paused:c.paused}));return xe(window,"resize",()=>{t(window.innerWidth),r(window.innerHeight)}),(async()=>{const v=await navigator.gpu?.requestAdapter();if(!v)throw new Error("No GPU support");return await v.requestDevice()})().then(v=>{console.log("D",v),a(v)}),M(()=>{$n(()=>({pressureSolverIterations:c.pressureSolverIterations}))}),(()=>{const v=Sd.cloneNode(!0),h=v.firstChild;return(m=>o(m.getContext("webgpu")))(h),k(v,g(Td,{get context(){return i()},get device(){return s()},get width(){return e()},get height(){return n()},get config(){return d()},setConfig:u}),null),k(v,g(Qo,{store:we}),null),_(m=>{const y=e(),x=n();return y!==m._v$&&he(h,"width",m._v$=y),x!==m._v$2&&he(h,"height",m._v$2=x),m},{_v$:void 0,_v$2:void 0}),v})()};ji(()=>g(Cd,{}),document.getElementById("root"));
