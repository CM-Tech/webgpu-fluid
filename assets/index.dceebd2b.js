const Yi=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function n(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerpolicy&&(i.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?i.credentials="include":o.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(o){if(o.ep)return;o.ep=!0;const i=n(o);fetch(o.href,i)}};Yi();const F={};function Xi(e){F.context=e}const Ji=(e,t)=>e===t,Ge=Symbol("solid-proxy"),vo=Symbol("solid-track"),jt={equals:Ji};let po=_o;const tt={},Ie=1,Vt=2,mo={owned:null,cleanups:null,context:null,owner:null};var X=null;let $t=null,U=null,dt=null,Z=null,ye=null,In=0;function ht(e,t){const n=U,r=X,o=e.length===0,i=o?mo:{owned:null,cleanups:null,context:null,owner:t||r},s=o?e:()=>e(()=>jn(i));X=i,U=null;try{return Bn(s,!0)}finally{U=n,X=r}}function I(e,t){t=t?Object.assign({},jt,t):jt;const n={value:e,observers:null,observerSlots:null,pending:tt,comparator:t.equals||void 0},r=o=>(typeof o=="function"&&(o=o(n.pending!==tt?n.pending:n.value)),Mn(n,o));return[$o.bind(n),r]}function yo(e,t,n){const r=tn(e,t,!0,Ie);st(r)}function _(e,t,n){const r=tn(e,t,!1,Ie);st(r)}function B(e,t,n){po=ts;const r=tn(e,t,!1,Ie);r.user=!0,ye?ye.push(r):st(r)}function W(e,t,n){n=n?Object.assign({},jt,n):jt;const r=tn(e,t,!0,0);return r.pending=tt,r.observers=null,r.observerSlots=null,r.comparator=n.equals||void 0,st(r),$o.bind(r)}function bo(e){if(dt)return e();let t;const n=dt=[];try{t=e()}finally{dt=null}return Bn(()=>{for(let r=0;r<n.length;r+=1){const o=n[r];if(o.pending!==tt){const i=o.pending;o.pending=tt,Mn(o,i)}}},!1),t}function Me(e){let t,n=U;return U=null,t=e(),U=n,t}function Zi(e){B(()=>Me(e))}function we(e){return X===null||(X.cleanups===null?X.cleanups=[e]:X.cleanups.push(e)),e}function xo(){return U}function Qt(e){const t=Symbol("context");return{id:t,Provider:ns(t),defaultValue:e}}function en(e){let t;return(t=Co(X,e.id))!==void 0?t:e.defaultValue}function wo(e){const t=W(e);return W(()=>bn(t()))}function $o(){const e=$t;if(this.sources&&(this.state||e)){const t=Z;Z=null,this.state===Ie||e?st(this):zt(this),Z=t}if(U){const t=this.observers?this.observers.length:0;U.sources?(U.sources.push(this),U.sourceSlots.push(t)):(U.sources=[this],U.sourceSlots=[t]),this.observers?(this.observers.push(U),this.observerSlots.push(U.sources.length-1)):(this.observers=[U],this.observerSlots=[U.sources.length-1])}return this.value}function Mn(e,t,n){if(dt)return e.pending===tt&&dt.push(e),e.pending=t,t;if(e.comparator&&e.comparator(e.value,t))return t;let r=!1;return e.value=t,e.observers&&e.observers.length&&Bn(()=>{for(let o=0;o<e.observers.length;o+=1){const i=e.observers[o];r&&$t.disposed.has(i),(r&&!i.tState||!r&&!i.state)&&(i.pure?Z.push(i):ye.push(i),i.observers&&So(i)),r||(i.state=Ie)}if(Z.length>1e6)throw Z=[],new Error},!1),t}function st(e){if(!e.fn)return;jn(e);const t=X,n=U,r=In;U=X=e,Qi(e,e.value,r),U=n,X=t}function Qi(e,t,n){let r;try{r=e.fn(t)}catch(o){ko(o)}(!e.updatedAt||e.updatedAt<=n)&&(e.observers&&e.observers.length?Mn(e,r):e.value=r,e.updatedAt=n)}function tn(e,t,n,r=Ie,o){const i={fn:e,state:r,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:X,context:null,pure:n};return X===null||X!==mo&&(X.owned?X.owned.push(i):X.owned=[i]),i}function gt(e){const t=$t;if(e.state===0||t)return;if(e.state===Vt||t)return zt(e);if(e.suspense&&Me(e.suspense.inFallback))return e.suspense.effects.push(e);const n=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<In);)(e.state||t)&&n.push(e);for(let r=n.length-1;r>=0;r--)if(e=n[r],e.state===Ie||t)st(e);else if(e.state===Vt||t){const o=Z;Z=null,zt(e,n[0]),Z=o}}function Bn(e,t){if(Z)return e();let n=!1;t||(Z=[]),ye?n=!0:ye=[],In++;try{const r=e();return es(n),r}catch(r){ko(r)}finally{Z=null,n||(ye=null)}}function es(e){Z&&(_o(Z),Z=null),!e&&(ye.length?bo(()=>{po(ye),ye=null}):ye=null)}function _o(e){for(let t=0;t<e.length;t++)gt(e[t])}function ts(e){let t,n=0;for(t=0;t<e.length;t++){const o=e[t];o.user?e[n++]=o:gt(o)}F.context&&Xi();const r=e.length;for(t=0;t<n;t++)gt(e[t]);for(t=r;t<e.length;t++)gt(e[t])}function zt(e,t){const n=$t;e.state=0;for(let r=0;r<e.sources.length;r+=1){const o=e.sources[r];o.sources&&(o.state===Ie||n?o!==t&&gt(o):(o.state===Vt||n)&&zt(o,t))}}function So(e){const t=$t;for(let n=0;n<e.observers.length;n+=1){const r=e.observers[n];(!r.state||t)&&(r.state=Vt,r.pure?Z.push(r):ye.push(r),r.observers&&So(r))}}function jn(e){let t;if(e.sources)for(;e.sources.length;){const n=e.sources.pop(),r=e.sourceSlots.pop(),o=n.observers;if(o&&o.length){const i=o.pop(),s=n.observerSlots.pop();r<o.length&&(i.sourceSlots[s]=r,o[r]=i,n.observerSlots[r]=s)}}if(e.owned){for(t=0;t<e.owned.length;t++)jn(e.owned[t]);e.owned=null}if(e.cleanups){for(t=0;t<e.cleanups.length;t++)e.cleanups[t]();e.cleanups=null}e.state=0,e.context=null}function ko(e){throw e}function Co(e,t){return e?e.context&&e.context[t]!==void 0?e.context[t]:Co(e.owner,t):void 0}function bn(e){if(typeof e=="function"&&!e.length)return bn(e());if(Array.isArray(e)){const t=[];for(let n=0;n<e.length;n++){const r=bn(e[n]);Array.isArray(r)?t.push.apply(t,r):t.push(r)}return t}return e}function ns(e){return function(n){let r;return yo(()=>r=Me(()=>(X.context={[e]:n.value},wo(()=>n.children)))),r}}const rs=Symbol("fallback");function lr(e){for(let t=0;t<e.length;t++)e[t]()}function os(e,t,n={}){let r=[],o=[],i=[],s=0,a=t.length>1?[]:null;return we(()=>lr(i)),()=>{let l=e()||[],c,u;return l[vo],Me(()=>{let f=l.length,h,g,m,y,w,p,b,S,O;if(f===0)s!==0&&(lr(i),i=[],r=[],o=[],s=0,a&&(a=[])),n.fallback&&(r=[rs],o[0]=ht(R=>(i[0]=R,n.fallback())),s=1);else if(s===0){for(o=new Array(f),u=0;u<f;u++)r[u]=l[u],o[u]=ht(d);s=f}else{for(m=new Array(f),y=new Array(f),a&&(w=new Array(f)),p=0,b=Math.min(s,f);p<b&&r[p]===l[p];p++);for(b=s-1,S=f-1;b>=p&&S>=p&&r[b]===l[S];b--,S--)m[S]=o[b],y[S]=i[b],a&&(w[S]=a[b]);for(h=new Map,g=new Array(S+1),u=S;u>=p;u--)O=l[u],c=h.get(O),g[u]=c===void 0?-1:c,h.set(O,u);for(c=p;c<=b;c++)O=r[c],u=h.get(O),u!==void 0&&u!==-1?(m[u]=o[c],y[u]=i[c],a&&(w[u]=a[c]),u=g[u],h.set(O,u)):i[c]();for(u=p;u<f;u++)u in m?(o[u]=m[u],i[u]=y[u],a&&(a[u]=w[u],a[u](u))):o[u]=ht(d);o=o.slice(0,s=f),r=l.slice(0)}return o});function d(f){if(i[u]=f,a){const[h,g]=I(u);return a[u]=g,t(l[u],h)}return t(l[u])}}}function v(e,t){return Me(()=>e(t||{}))}function Ot(){return!0}const Po={get(e,t,n){return t===Ge?n:e.get(t)},has(e,t){return e.has(t)},set:Ot,deleteProperty:Ot,getOwnPropertyDescriptor(e,t){return{configurable:!0,enumerable:!0,get(){return e.get(t)},set:Ot,deleteProperty:Ot}},ownKeys(e){return e.keys()}};function sn(e){return(e=typeof e=="function"?e():e)==null?{}:e}function $e(...e){return new Proxy({get(t){for(let n=e.length-1;n>=0;n--){const r=sn(e[n])[t];if(r!==void 0)return r}},has(t){for(let n=e.length-1;n>=0;n--)if(t in sn(e[n]))return!0;return!1},keys(){const t=[];for(let n=0;n<e.length;n++)t.push(...Object.keys(sn(e[n])));return[...new Set(t)]}},Po)}function Vn(e,...t){const n=new Set(t.flat()),r=Object.getOwnPropertyDescriptors(e),o=t.map(i=>{const s={};for(let a=0;a<i.length;a++){const l=i[a];Object.defineProperty(s,l,r[l]?r[l]:{get(){return e[l]},set(){return!0}})}return s});return o.push(new Proxy({get(i){return n.has(i)?void 0:e[i]},has(i){return n.has(i)?!1:i in e},keys(){return Object.keys(e).filter(i=>!n.has(i))}},Po)),o}function zn(e){const t="fallback"in e&&{fallback:()=>e.fallback};return W(os(()=>e.each,e.children,t||void 0))}function Ce(e){let t=!1;const n=W(()=>e.when,void 0,{equals:(r,o)=>t?r===o:!r==!o});return W(()=>{const r=n();if(r){const o=e.children;return(t=typeof o=="function"&&o.length>0)?Me(()=>o(r)):o}return e.fallback})}function is(e){let t=!1;const n=wo(()=>e.children),r=W(()=>{let o=n();Array.isArray(o)||(o=[o]);for(let i=0;i<o.length;i++){const s=o[i].when;if(s)return[i,s,o[i]]}return[-1]},void 0,{equals:(o,i)=>o[0]===i[0]&&(t?o[1]===i[1]:!o[1]==!i[1])&&o[2]===i[2]});return W(()=>{const[o,i,s]=r();if(o<0)return e.fallback;const a=s.children;return(t=typeof a=="function"&&a.length>0)?Me(()=>a(i)):a})}function an(e){return e}const ss=["allowfullscreen","async","autofocus","autoplay","checked","controls","default","disabled","formnovalidate","hidden","indeterminate","ismap","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","seamless","selected"],as=new Set(["className","value","readOnly","formNoValidate","isMap","noModule","playsInline",...ss]),ls=new Set(["innerHTML","textContent","innerText","children"]),cs={className:"class",htmlFor:"for"},cr={class:"className",formnovalidate:"formNoValidate",ismap:"isMap",nomodule:"noModule",playsinline:"playsInline",readonly:"readOnly"},us=new Set(["beforeinput","click","dblclick","contextmenu","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"]),fs=new Set(["altGlyph","altGlyphDef","altGlyphItem","animate","animateColor","animateMotion","animateTransform","circle","clipPath","color-profile","cursor","defs","desc","ellipse","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence","filter","font","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignObject","g","glyph","glyphRef","hkern","image","line","linearGradient","marker","mask","metadata","missing-glyph","mpath","path","pattern","polygon","polyline","radialGradient","rect","set","stop","svg","switch","symbol","text","textPath","tref","tspan","use","view","vkern"]),ds={xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace"};function nt(e,t){return W(e,void 0,t?void 0:{equals:t})}function hs(e,t,n){let r=n.length,o=t.length,i=r,s=0,a=0,l=t[o-1].nextSibling,c=null;for(;s<o||a<i;){if(t[s]===n[a]){s++,a++;continue}for(;t[o-1]===n[i-1];)o--,i--;if(o===s){const u=i<r?a?n[a-1].nextSibling:n[i-a]:l;for(;a<i;)e.insertBefore(n[a++],u)}else if(i===a)for(;s<o;)(!c||!c.has(t[s]))&&t[s].remove(),s++;else if(t[s]===n[i-1]&&n[a]===t[o-1]){const u=t[--o].nextSibling;e.insertBefore(n[a++],t[s++].nextSibling),e.insertBefore(n[--i],u),t[o]=n[i]}else{if(!c){c=new Map;let d=a;for(;d<i;)c.set(n[d],d++)}const u=c.get(t[s]);if(u!=null)if(a<u&&u<i){let d=s,f=1,h;for(;++d<o&&d<i&&!((h=c.get(t[d]))==null||h!==u+f);)f++;if(f>u-a){const g=t[s];for(;a<u;)e.insertBefore(n[a++],g)}else e.replaceChild(n[a++],t[s++])}else s++;else t[s++].remove()}}}const ur="_$DX_DELEGATE";function To(e,t,n){let r;return ht(o=>{r=o,t===document?e():k(t,e(),t.firstChild?null:void 0,n)}),()=>{r(),t.textContent=""}}function P(e,t,n){const r=document.createElement("template");r.innerHTML=e;let o=r.content.firstChild;return n&&(o=o.firstChild),o}function Pe(e,t=window.document){const n=t[ur]||(t[ur]=new Set);for(let r=0,o=e.length;r<o;r++){const i=e[r];n.has(i)||(n.add(i),t.addEventListener(i,xs))}}function pe(e,t,n){n==null?e.removeAttribute(t):e.setAttribute(t,n)}function gs(e,t,n,r){r==null?e.removeAttributeNS(t,n):e.setAttributeNS(t,n,r)}function vs(e,t){t==null?e.removeAttribute("class"):e.className=t}function vt(e,t,n,r){if(r)Array.isArray(n)?(e[`$$${t}`]=n[0],e[`$$${t}Data`]=n[1]):e[`$$${t}`]=n;else if(Array.isArray(n)){const o=n[0];e.addEventListener(t,n[0]=i=>o.call(e,n[1],i))}else e.addEventListener(t,n)}function ps(e,t,n={}){const r=Object.keys(t||{}),o=Object.keys(n);let i,s;for(i=0,s=o.length;i<s;i++){const a=o[i];!a||a==="undefined"||t[a]||(fr(e,a,!1),delete n[a])}for(i=0,s=r.length;i<s;i++){const a=r[i],l=!!t[a];!a||a==="undefined"||n[a]===l||!l||(fr(e,a,!0),n[a]=l)}return n}function Gn(e,t,n={}){const r=e.style,o=typeof n=="string";if(t==null&&o||typeof t=="string")return r.cssText=t;o&&(r.cssText=void 0,n={}),t||(t={});let i,s;for(s in n)t[s]==null&&r.removeProperty(s),delete n[s];for(s in t)i=t[s],i!==n[s]&&(r.setProperty(s,i),n[s]=i);return n}function Ue(e,t,n,r){typeof t=="function"?_(o=>hr(e,t(),o,n,r)):hr(e,t,void 0,n,r)}function k(e,t,n,r){if(n!==void 0&&!r&&(r=[]),typeof t!="function")return rt(e,t,r,n);_(o=>rt(e,t(),o,n),r)}function ms(e,t,n,r,o={},i=!1){t||(t={});for(const s in o)if(!(s in t)){if(s==="children")continue;dr(e,s,null,o[s],n,i)}for(const s in t){if(s==="children"){r||rt(e,t.children);continue}const a=t[s];o[s]=dr(e,s,a,o[s],n,i)}}function ys(e){let t,n;return!F.context||!(t=F.registry.get(n=ws()))?e.cloneNode(!0):(F.completed&&F.completed.add(t),F.registry.delete(n),t)}function bs(e){return e.toLowerCase().replace(/-([a-z])/g,(t,n)=>n.toUpperCase())}function fr(e,t,n){const r=t.trim().split(/\s+/);for(let o=0,i=r.length;o<i;o++)e.classList.toggle(r[o],n)}function dr(e,t,n,r,o,i){let s,a,l;if(t==="style")return Gn(e,n,r);if(t==="classList")return ps(e,n,r);if(n===r)return r;if(t==="ref")i||n(e);else if(t.slice(0,3)==="on:"){const c=t.slice(3);r&&e.removeEventListener(c,r),n&&e.addEventListener(c,n)}else if(t.slice(0,10)==="oncapture:"){const c=t.slice(10);r&&e.removeEventListener(c,r,!0),n&&e.addEventListener(c,n,!0)}else if(t.slice(0,2)==="on"){const c=t.slice(2).toLowerCase(),u=us.has(c);if(!u&&r){const d=Array.isArray(r)?r[0]:r;e.removeEventListener(c,d)}(u||n)&&(vt(e,c,n,u),u&&Pe([c]))}else if((l=ls.has(t))||!o&&(cr[t]||(a=as.has(t)))||(s=e.nodeName.includes("-")))t==="class"||t==="className"?vs(e,n):s&&!a&&!l?e[bs(t)]=n:e[cr[t]||t]=n;else{const c=o&&t.indexOf(":")>-1&&ds[t.split(":")[0]];c?gs(e,c,t,n):pe(e,cs[t]||t,n)}return n}function xs(e){const t=`$$${e.type}`;let n=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==n&&Object.defineProperty(e,"target",{configurable:!0,value:n}),Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return n||document}}),F.registry&&!F.done&&(F.done=!0,document.querySelectorAll("[id^=pl-]").forEach(r=>r.remove()));n!==null;){const r=n[t];if(r&&!n.disabled){const o=n[`${t}Data`];if(o!==void 0?r.call(n,o,e):r.call(n,e),e.cancelBubble)return}n=n.host&&n.host!==n&&n.host instanceof Node?n.host:n.parentNode}}function hr(e,t,n={},r,o){return t||(t={}),!o&&"children"in t&&_(()=>n.children=rt(e,t.children,n.children)),t.ref&&t.ref(e),_(()=>ms(e,t,r,!0,n,!0)),n}function rt(e,t,n,r,o){for(F.context&&!n&&(n=[...e.childNodes]);typeof n=="function";)n=n();if(t===n)return n;const i=typeof t,s=r!==void 0;if(e=s&&n[0]&&n[0].parentNode||e,i==="string"||i==="number"){if(F.context)return n;if(i==="number"&&(t=t.toString()),s){let a=n[0];a&&a.nodeType===3?a.data=t:a=document.createTextNode(t),n=Ye(e,n,r,a)}else n!==""&&typeof n=="string"?n=e.firstChild.data=t:n=e.textContent=t}else if(t==null||i==="boolean"){if(F.context)return n;n=Ye(e,n,r)}else{if(i==="function")return _(()=>{let a=t();for(;typeof a=="function";)a=a();n=rt(e,a,n,r)}),()=>n;if(Array.isArray(t)){const a=[];if(xn(a,t,o))return _(()=>n=rt(e,a,n,r,!0)),()=>n;if(F.context){for(let l=0;l<a.length;l++)if(a[l].parentNode)return n=a}if(a.length===0){if(n=Ye(e,n,r),s)return n}else Array.isArray(n)?n.length===0?gr(e,a,r):hs(e,n,a):(n&&Ye(e),gr(e,a));n=a}else if(t instanceof Node){if(F.context&&t.parentNode)return n=s?[t]:t;if(Array.isArray(n)){if(s)return n=Ye(e,n,r,t);Ye(e,n,null,t)}else n==null||n===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);n=t}}return n}function xn(e,t,n){let r=!1;for(let o=0,i=t.length;o<i;o++){let s=t[o],a;if(s instanceof Node)e.push(s);else if(!(s==null||s===!0||s===!1))if(Array.isArray(s))r=xn(e,s)||r;else if((a=typeof s)=="string")e.push(document.createTextNode(s));else if(a==="function")if(n){for(;typeof s=="function";)s=s();r=xn(e,Array.isArray(s)?s:[s])||r}else e.push(s),r=!0;else e.push(document.createTextNode(s.toString()))}return r}function gr(e,t,n){for(let r=0,o=t.length;r<o;r++)e.insertBefore(t[r],n)}function Ye(e,t,n,r){if(n===void 0)return e.textContent="";const o=r||document.createTextNode("");if(t.length){let i=!1;for(let s=t.length-1;s>=0;s--){const a=t[s];if(o!==a){const l=a.parentNode===e;!i&&!s?l?e.replaceChild(o,a):e.insertBefore(o,n):l&&a.remove()}else i=!0}}else e.insertBefore(o,n);return[o]}function ws(){const e=F.context;return`${e.id}${e.count++}`}const $s="http://www.w3.org/2000/svg";function Eo(e,t=!1){return t?document.createElementNS($s,e):document.createElement(e)}function Oo(e){const{useShadow:t}=e,n=document.createTextNode(""),r=e.mount||document.body;function o(){if(F.context){const[i,s]=I(!1);return queueMicrotask(()=>s(!0)),()=>i()&&e.children}else return()=>e.children}if(r instanceof HTMLHeadElement){const[i,s]=I(!1),a=()=>s(!0);ht(l=>k(r,()=>i()?l():o()(),null)),we(()=>{F.context?queueMicrotask(a):a()})}else{const i=Eo(e.isSVG?"g":"div",e.isSVG),s=t&&i.attachShadow?i.attachShadow({mode:"open"}):i;Object.defineProperty(i,"host",{get(){return n.parentNode}}),k(s,o()),r.appendChild(i),e.ref&&e.ref(i),we(()=>r.removeChild(i))}return n}function Un(e){const[t,n]=Vn(e,["component"]),r=W(()=>t.component);return W(()=>{const o=r();switch(typeof o){case"function":return Me(()=>o(n));case"string":const i=fs.has(o),s=F.context?ys():Eo(o,i);return Ue(s,n,i),s}})}var _s=`@vertex
fn vert(@builtin(vertex_index) VertexIndex: u32) -> @builtin(position) vec4<f32> {
    var pos = array<vec2<f32>, 4>(
        vec2<f32>(-1.0, -1.0),
        vec2<f32>(-1.0, 1.0),
        vec2<f32>(1.0, -1.0),
        vec2<f32>(1.0, 1.0),
    );

    return vec4<f32>(pos[VertexIndex], 0.0, 1.0);
}
`,Ss=`struct Uniforms {
    resolution: vec2<i32>,
    downsample: i32,
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


fn textureSampleSmooth(a: texture_2d<f32>, uv: vec2<f32>,mip:i32) -> vec4<f32> {
    var inn = uv;
    var tl = (vec2<i32>(floor(inn))%vec2<i32>(u.resolution.xy)+vec2<i32>(u.resolution.xy))%vec2<i32>(u.resolution.xy);
    var br = (vec2<i32>(floor(inn) + 1.0)%vec2<i32>(u.resolution.xy)+vec2<i32>(u.resolution.xy))%vec2<i32>(u.resolution.xy);
    return (textureLoad(a, tl.xy, mip) * (f32(br.x) - inn.x) + textureLoad(a, vec2<i32>(br.x, tl.y), mip) * (inn.x - f32(tl.x))) * (f32(br.y) - inn.y) + 
      (textureLoad(a,vec2<i32>(tl.x, br.y), mip) * (f32(br.x) - inn.x) + textureLoad(a, br.xy, mip) * (inn.x - f32(tl.x))) * (inn.y - f32(tl.y)
    );
}
fn D(uv:vec2<f32>,d:vec2<f32>,mip:i32) -> f32 {
    // return length(textureSampleSmooth(velocity, vec2<f32>((uv + (d+0.0)) * vec2<f32>(u.resolution.xy)), mip).xy);
    // return sin(dot(vec2<f32>((uv + (d+0.0)) * vec2<f32>(u.resolution.xy)), textureSampleSmooth(velocity, vec2<f32>((uv + (d+0.0)) * vec2<f32>(u.resolution.xy)), mip).xy)*0.001);
    var  vv=(textureSampleSmooth(velocity, vec2<f32>((uv + (d+0.0)) * vec2<f32>(u.resolution.xy)), mip).xy);
    var pp=textureSampleSmooth(pressure, (vec2<f32>((uv + (d+0.0)) * vec2<f32>(u.resolution.xy))%vec2<f32>(u.resolution.xy)+vec2<f32>(u.resolution.xy))%vec2<f32>(u.resolution.xy), mip).x;
    var nvv=gradient(vec2<i32>(uv));
    return -1.0*0.1*(length(nvv-vv) );//*length(textureSampleSmooth(velocity, vec2<f32>((uv + (d+0.0)) * vec2<f32>(u.resolution.xy)), mip).xy);
}

fn diff( uv:vec2<f32>,  mip: i32) -> vec3<f32> {
    var texel = 1.0/vec2<f32>(u.resolution.xy);
    var t = f32(pow(2.0,f32(mip)))*vec4<f32>(texel, -texel.y, 0);

    var d =    D(uv, t.ww,mip); var d_n =  D(uv, t.wy,mip); var d_e =  D( uv, t.xw,mip);
    var d_s =  D(uv, t.wz,mip); var d_w =  D(uv,-t.xw,mip); var d_nw = D( uv,-t.xz,mip);
    var d_sw = D(uv,-t.xy,mip); var d_ne = D(uv, t.xy,mip); var d_se = D( uv, t.xz,mip);
    var ddd=vec3<f32>(1.0,1.0,1.0);
    return normalize(cross(vec3<f32>(t.xw*vec2<f32>(u.resolution.xy),d_e - d)*ddd,vec3<f32>(t.wz*vec2<f32>(u.resolution.xy),d_s - d)*ddd)).xyz;
    // vec2<f32>(
    //     0.5 * (d_e - d_w) + 0.25 * (d_ne - d_nw + d_se - d_sw),
    //     0.5 * (d_n - d_s) + 0.25 * (d_ne + d_nw - d_se - d_sw)
    // );
}

fn contrast(col:vec4<f32>,  x: f32) -> vec4<f32> {
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
fn softmax(a:f32,  b:f32, k:f32)-> f32 {
	return log(exp(k*a)+exp(k*b))/k;    
}

fn softmin(a:f32,  b:f32, k:f32)-> f32  {
	return -log(exp(-k*a)+exp(-k*b))/k;    
}

fn softmax4(a:vec4<f32>,  b:vec4<f32>, k:f32)-> vec4<f32>  {
	return log(exp(k*a)+exp(k*b))/k;    
}

fn softmin4(a:vec4<f32>,  b:vec4<f32>, k:f32)-> vec4<f32> {
	return -log(exp(-k*a)+exp(-k*b))/k;    
}

fn softclamp(a:f32,  b:f32, x:f32, k:f32) ->f32 {
	return (softmin(b,softmax(a,x,k),k) + softmax(a,softmin(b,x,k),k)) / 2.0;    
}

fn softclamp4(a:vec4<f32>,  b:vec4<f32>, x:vec4<f32>, k:f32) ->vec4<f32> {
	return (softmin4(b,softmax4(a,x,k),k) + softmax4(a,softmin4(b,x,k),k)) / 2.0;    
}

fn softclamp42(a: f32, b: f32,x:vec4<f32>, k:f32) ->vec4<f32>{
	return (softmin4(vec4(b),softmax4(vec4(a),x,k),k) + softmax4(vec4(a),softmin4(vec4(b),x,k),k)) / 2.0;    
}


// GGX from Noby's Goo shader https://www.shadertoy.com/view/lllBDM

// MIT License: https://opensource.org/licenses/MIT
fn  G1V(dnv:f32, k:f32) -> f32{
    return 1.0/(dnv*(1.0-k)+k);
}

fn ggx(n: vec3<f32>, v: vec3<f32>, l: vec3<f32>, rough:f32, f0:f32) -> f32{
    var alpha = rough*rough;
    var h = normalize(v+l);
    var dnl = clamp(dot(n,l), 0.0, 1.0);
    var dnv = clamp(dot(n,v), 0.0, 1.0);
    var dnh = clamp(dot(n,h), 0.0, 1.0);
    var dlh = clamp(dot(l,h), 0.0, 1.0);
    var f:f32;
    var d:f32;
    var vis : f32;
    var asqr = alpha*alpha;
    let pi:f32 = 3.14159;
    var den = dnh*dnh*(asqr - 1.0)+1.0;
    d = asqr/(pi * den * den);
    dlh = pow(1.0 - dlh, 5.0);
    f = f0 + (1.0 - f0)*dlh;
    var k = alpha/1.0;
    vis = G1V(dnl, k)*G1V(dnv, k);
    var  spec = dnl * d * f * vis;
    return spec;
}
// End Noby's GGX


// Modified from Shane's Bumped Sinusoidal Warp shadertoy here:
// https://www.shadertoy.com/view/4l2XWK
struct LL {
    ld: vec3<f32>,
    avd:vec3<f32>,
};
let iTime=0.0;
fn light(uv:vec2<f32>, BUMP:f32, SRC_DIST:f32, norm:vec3<f32>, iTime:f32,  avd:vec3<f32>) -> LL  {
    var sp = vec3<f32>(uv - 0.5, 0);
    var light = vec3<f32>(cos(iTime/2.0)*0.5, sin(iTime/2.0)*0.5, -SRC_DIST);
    var ld = light - sp;
    var lDist = max(length(ld), 0.001);
    ld /= lDist;
    var l:LL;
    l.ld=ld;
    l.avd = reflect(normalize(norm), vec3<f32>(0,1,0));
    return l;
}
// End Shane's bumpmapping section


fn sampleP(coord: vec2<i32>, coordo: vec2<i32>,exists2:f32) -> f32 {
    var exists = existe(((coord) % u.resolution.xy+u.resolution.xy)% u.resolution.xy);
    var q = textureLoad(pressure, ((coord) % u.resolution.xy+u.resolution.xy)% u.resolution.xy, 0).x;
    if (exists !=exists2) {
        q = textureLoad(pressure, ((coordo) % u.resolution.xy+u.resolution.xy)% u.resolution.xy , 0).x;
    }
    return q;
}


fn gradient(uv: vec2<i32>) ->  vec2<f32> {
    var e=existe((vec2<i32>(uv)% u.resolution.xy+u.resolution.xy)% u.resolution.xy);
    var pL = sampleP(uv - vec2<i32>(1, 0), uv + vec2<i32>(0, 0),e);
    var pR = sampleP(uv + vec2<i32>(1, 0), uv - vec2<i32>(0, 0),e);
    var pB = sampleP(uv + vec2<i32>(0, 1), uv - vec2<i32>(0, 0),e);
    var pT = sampleP(uv - vec2<i32>(0, 1), uv + vec2<i32>(0, 0),e);
    var pC = sampleP(uv - vec2<i32>(0, 0), uv + vec2<i32>(0, 0),e);
    var v = textureLoad(velocity, (uv% u.resolution.xy+u.resolution.xy)% u.resolution.xy, 0).xy;
    var exists = 1.0;//existe(vec2<i32>(uv));
    return exists * (v - vec2<f32>(pR - pL, pB - pT));
}

@fragment
fn display(@builtin(position) fragCoord: vec4<f32>) -> @location(0) vec4<f32> {
    var uv = fragCoord.xy / vec2<f32>(u.resolution.xy) * pow(0.5, f32(u.downsample));
    var coord = vec2<i32>(uv.xy * vec2<f32>(u.resolution.xy));
 var ppD = textureSampleSmooth(dye, vec2<f32>(uv.xy * vec2<f32>(u.resolution.xy)), 0).xyz;
    var ppV = textureSampleSmooth(velocity, vec2<f32>(fragCoord.xy * pow(0.5, f32(u.downsample))), 0).xy;
    var exists = existe(vec2<i32>(uv.xy * vec2<f32>(u.resolution.xy)));
    // if (exists < 1.0) {
    //     return vec4<f32>(0.0, 0.0, 0.0, 1.0);
    // }
    var dxy = vec3<f32>(0);
    var occ=0.0;
    var mip = 0;
    var d   = D(uv, vec2<f32>(0.0), mip);
    
    // blur the gradient to reduce appearance of artifacts,
    // and do cheap occlusion with mipmaps
    let  STEPS= 1;
    let  ODIST= 0.0001;
    for(mip = 1; mip <= STEPS; mip += 1) {	 
        if(mip==1){
        dxy += (1.0/pow(2.0,f32(mip))) * diff(uv, mip - 1);
        }	
    }
    var mip2=1;
    var wi=0.0;
    var vis=0.0;
    var spv=0.0;
    let RA=3;
    
    // occ=D(uv,vec2<f32>(0.0), 0);//vis/wi;
    // dxy=vec2<f32>(-1.0,0.0);
    
    // I think this looks nicer than using smoothstep
    // occ = pow(max(0.0,softclamp(0.2,0.8,100.0*occ + 0.5,1.0)),0.5);
    var avd:vec3<f32>;
    var ldq: LL = light(uv, BUMP, 0.5, normalize(dxy), iTime, avd);
    var ld=ldq.ld;
    avd=ldq.avd;

    for(mip = -RA; mip <= RA; mip += 1) {	 
        for(mip2 = -RA; mip2 <= RA; mip2 += 1) {	 
        var jm=vec2<f32>(f32(mip),f32(mip2));
        var lnnn=length(jm);
        if(lnnn>0.0){
        var kk=pow(2.0, lnnn);
        var www=1.0/kk;
            wi+=www;
            var ang=atan2(max(D(uv,jm/vec2<f32>(u.resolution.xy), 0) - D(uv, vec2<f32>(0.0), 0),0.0) ,lnnn);
            var val=pow(1.0-ang/atan2(1.0,0.0),0.25);// not sure what power should be
            
            vis+=www*val;
            var lang=atan2(max(ld.z,0.0) ,length(ld.xy));
            var poang=max(lang,ang);
            
val=max(0.0,-cos(lang - poang)*dot(normalize(ld.xy),normalize(vec3<f32>(jm,1.0).xy)));
            spv+=www*pow(val,1.0);
        // occ += max(0.0,min(1.0,0.5+0.0001*(D(uv, vec2<f32>(0.0), 0) - D(uv,jm/vec2<f32>(u.resolution.xy), 0))/lnnn))/kk/2.0;
         
         }// occ += 1.0+min((D(uv, vec2<f32>(0.0), 0) - D(uv,vec2<f32>(0.0,-f32(mip)), 0))/kk/4.0,0.0);
        // occ += min((D(uv, vec2<f32>(0.0), 0) - D(uv,vec2<f32>(0.0,f32(mip)).yx, 0))/kk/4.0,0.0);
        // occ += min((D(uv, vec2<f32>(0.0), 0) - D(uv,vec2<f32>(0.0,-f32(mip)).yx, 0))/kk/4.0,0.0);
    	//softclamp(0.0 - ODIST, ODIST, d - D(uv,vec2<f32>(0.0), mip), 1.0) / (pow(1.5, f32(mip)));
    }
    }
    // dxy /= f32(STEPS);
    occ=0.1+occ/3.0;// - 1.0/(8.0-occ*8.0);
    occ=vis/wi;
    spv=spv/wi;
   // spv=0.0;
    
    var spec = ggx(avd, vec3(0,1,0), ld, 0.2, 0.2)*pow(0.1/0.2,2.0);
    let LOG_SPEC =10.0;
    spec = (log(LOG_SPEC+1.0)/LOG_SPEC)*log(1.0 + LOG_SPEC * spec);    
    
    var diffuse =vec4<f32>(ppD,1.0);// softclamp42(0.0,1.0,6.0*vec4(texture(iChannel0,uv).xy,0,0)+0.5,2.0);    
    diffuse+=vec4<f32>(hsv2rgb(vec3<f32>( atan2(ppV.y, ppV.x) / atan2(1.0, 0.0) / 4.0, 1.0, 0.5*min(1.0,length(vec2<f32>(ppV.y, ppV.x) )/ 60.0))),0.0)*0.0;
    if (exists < 1.0) {
        // return vec4<f32>(vec3<f32>(0.0),1.0);
        // diffuse=vec4<f32>(vec3<f32>(0.25),1.0);
    }else{
        // diffuse=vec4<f32>(vec3<f32>(0.25),1.0);
    }
    // diffuse=vec4<f32>(vec3<f32>(-d/100.0),1.0);
    
    var fragColor = vec4<f32>(diffuse);//(diffuse*0.2/2.0 + 16.0*mix(vec4<f32>(spec),1.5*diffuse*spec,0.8))*10.0;
    var  vv=textureSampleSmooth(velocity, vec2<f32>((uv + (d+0.0)) * vec2<f32>(u.resolution.xy)), 0).xy;
    var nvv=gradient(vec2<i32>(uv));
    var pp=textureSampleSmooth(pressure, (vec2<f32>((uv + (d+0.0)) * vec2<f32>(u.resolution.xy))%vec2<f32>(u.resolution.xy)+vec2<f32>(u.resolution.xy))%vec2<f32>(u.resolution.xy), 0).x;
    fragColor = (diffuse)*(spv*0.0+occ)+ 100.0*spec;//vec4<f32>((  nvv - vv).x*0.00000001,0.0*length(vv)*0.000000000001,0.0,0.0);//vec4<f32>(dxy/2.0+0.5,1.0);//occ * (diffuse*0.0+1.0) + spec*100.0;//vec4<f32>(ppD.xyz*0.0+1.0,1.0);//(softclamp42(0.0,1.0,contrast(fragColor,4.5),3.0));


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
`,ks=`struct Uniforms {
    resolution: vec2<i32>,
    timestep: f32,
};
@group(0) @binding(0) var<uniform> u : Uniforms;

@group(1) @binding(0) var dye : texture_2d<f32>;
@group(1) @binding(1) var velocity : texture_2d<f32>;


let dyeDissipation = 1.0;
let velocityDissipation = 1.0;//0.75;
let color = vec4<f32>(vec3<f32>(0.0), 1.0);

struct Output {
    @location(0) dye: vec4<f32>,
    @location(1) velocity: vec2<f32>,
}

fn textureLoadFalloof(a: texture_2d<f32>, coord: vec2<i32>, e:f32) -> vec4<f32> {
    var exists = existe(((coord) % u.resolution.xy+u.resolution.xy)% u.resolution.xy);
    var q = textureLoad(a, ((coord) % u.resolution.xy+u.resolution.xy)% u.resolution.xy, 0);
    return q * (1.0 - abs(exists - e));
}

fn textureSampleSmooth(a: texture_2d<f32>, uvv: vec2<f32>, e:f32) -> vec4<f32> {
    var uv = uvv;
    // var exists = existe(vec2<i32>(uv));
    var inn = uv - 0.5;
    var tl = vec2<i32>(floor(inn));
    var br = vec2<i32>(floor(inn) + 1.0);
    return  (
        (textureLoadFalloof(a, tl.xy,e) * (f32(br.x) - inn.x) + textureLoadFalloof(a, vec2<i32>(br.x, tl.y),e) * (inn.x - f32(tl.x))) * (f32(br.y) - inn.y) + // newline
        (textureLoadFalloof(a, vec2<i32>(tl.x, br.y),e) * (f32(br.x) - inn.x) + textureLoadFalloof(a, br.xy,e) * (inn.x - f32(tl.x))) * (inn.y - f32(tl.y))
    );
}

@fragment
fn advect(@builtin(position) coords: vec4<f32>) -> Output {
    let timestep = u.timestep/1.0;
    var coord = vec2<i32>(coords.xy - 0.5);
    var pos = coords.xy - timestep * textureLoad(velocity, vec2<i32>(coord), 0).xy;
    var posD = coords.xy - timestep* textureLoad(velocity, vec2<i32>(coord), 0).xy;
    var exists = existe(coord);
    var startDye = textureSampleSmooth(dye, posD,exists);
    var startVelocity = textureSampleSmooth(velocity, pos,exists).xy;
    var out: Output;
    out.dye = ((color - startDye) * (1.0 - pow(dyeDissipation, timestep)) + startDye);
    out.velocity = startVelocity * pow(velocityDissipation, timestep);
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
`,Cs=`struct Uniforms {
    resolution: vec2<i32>,
};
@group(0) @binding(0) var<uniform> u : Uniforms;

@group(1) @binding(0) var pressure : texture_2d<f32>;

@fragment
fn clear(@builtin(position) coords: vec4<f32>) -> @location(0) f32 {
    return 0.8 * textureLoad(pressure, vec2<i32>(coords.xy), 0).x;
}
`,Ps=`struct Uniforms {
    resolution: vec2<i32>,
};
@group(0) @binding(0) var<uniform> u : Uniforms;

@group(1) @binding(0) var pressure : texture_2d<f32>;

@fragment
fn clear(@builtin(position) coords: vec4<f32>) -> @location(0) f32 {
    return 1.0 * textureLoad(pressure, vec2<i32>(coords.xy), 0).x+0.00;
}
`,Ts=`struct Uniforms {
    resolution: vec2<i32>,
};
@group(0) @binding(0) var<uniform> u : Uniforms;

@group(1) @binding(0) var velocity : texture_2d<f32>;

@fragment
fn divergence(@builtin(position) coords: vec4<f32>) -> @location(0) f32 {
    var coord = vec2<i32>(coords.xy);
    var cellVelocity = textureLoad(velocity, ((coord ) % u.resolution.xy+u.resolution.xy)% u.resolution.xy, 0).xy;
    var neighborOffset = vec2<i32>(1, 0);
    var value = 0.0;
    for(var o = 0; o < 4; o += 1){
        if(existe(coord + neighborOffset) == existe(coord )){
            var neighborVelocity = textureLoad(velocity, ((coord + neighborOffset) % u.resolution.xy + u.resolution.xy) % u.resolution.xy, 0).xy;
            value+=dot(neighborVelocity, -vec2<f32>(neighborOffset));
        } else {
            value+=dot(-cellVelocity, -vec2<f32>(neighborOffset));
        }
        neighborOffset = vec2<i32>(-neighborOffset.y, neighborOffset.x);
    }
    return value;
}
`,Es=`struct Uniforms {
    resolution: vec2<i32>,
};
@group(0) @binding(0) var<uniform> u : Uniforms;

@group(1) @binding(0) var divergence : texture_2d<f32>;
@group(1) @binding(1) var velocity : texture_2d<f32>;

@group(2) @binding(0) var pressure : texture_2d<f32>;




fn sampleP(coord: vec2<i32>, coordo: vec2<i32>,exists2:f32) -> f32 {
    var exists = existe(((coord) % u.resolution.xy+u.resolution.xy)% u.resolution.xy);
    var q = textureLoad(pressure, ((coord) % u.resolution.xy+u.resolution.xy)% u.resolution.xy, 0).x;
    if (exists !=exists2) {
        q = textureLoad(pressure, ((coordo) % u.resolution.xy+u.resolution.xy)% u.resolution.xy , 0).x;
    }
    return q;
}

fn gradient(uv: vec2<i32>) ->  vec2<f32> {
    var e=existe((vec2<i32>(uv)% u.resolution.xy+u.resolution.xy)% u.resolution.xy);
    var pL = sampleP(uv - vec2<i32>(1, 0), uv + vec2<i32>(0, 0),e);
    var pR = sampleP(uv + vec2<i32>(1, 0), uv - vec2<i32>(0, 0),e);
    var pB = sampleP(uv + vec2<i32>(0, 1), uv - vec2<i32>(0, 0),e);
    var pT = sampleP(uv - vec2<i32>(0, 1), uv + vec2<i32>(0, 0),e);
    var pC = sampleP(uv - vec2<i32>(0, 0), uv + vec2<i32>(0, 0),e);
    var v = textureLoad(velocity, (uv% u.resolution.xy+u.resolution.xy)% u.resolution.xy, 0).xy;
    var exists = 1.0;//existe(vec2<i32>(uv));
    return exists * (v - vec2<f32>(pR - pL, pB - pT));
}

@fragment
fn jacobi(@builtin(position) coords: vec4<f32>) -> @location(0) f32 {
    var coord = vec2<i32>(coords.xy);
    // left, right, bottom, and top pressure samples
    

    var C = textureLoad(pressure, coord, 0).x;

    // evaluate Jacobi iteration
    // sum.x += C * dd;
    // sum.y += dd;
    // if (sum.y < 1.0 || existe(coord)<1.0) {
    //     return 0.0;
    // }
    // if(existe(coord -  vec2<i32>(1, 0))<1.0){
    //     return 
    // }
    var dir = vec2<i32>(1, 0);
    var fl=vec2<f32>(0.0);
    var currentInflow=0.0;
    var wantInflow=0.0;
    // var curV=gradient(coord);
    var tot=0.0;
    fl.x=textureLoad(divergence, (coord% u.resolution.xy+u.resolution.xy)% u.resolution.xy, 0).x/2.0;
    for(var o=0;o<4;o+=1){

        var ff= textureLoad(pressure, ((coord + (dir )) % u.resolution.xy+u.resolution.xy)% u.resolution.xy,0 ).x;
      //  var ff2 =( textureLoad(velocity, ((coord + dir) % u.resolution.xy+u.resolution.xy)% u.resolution.xy, 0).xy + textureLoad(velocity, ((coord ) % u.resolution.xy+u.resolution.xy)% u.resolution.xy, 0).xy)/2.0;//(gradient( ((coord+dir) % u.resolution.xy+u.resolution.xy)% u.resolution.xy).xy+gradient( ((coord) % u.resolution.xy+u.resolution.xy)% u.resolution.xy).xy)/2.0;//sampleVelocity(coord + dir,coord);
        //var inflow=dot(ff2.xy,-vec2<f32>(dir));
        if(existe(coord + dir)!=existe(coord )){
           // ff2=-textureLoad(velocity, ((coord) % u.resolution.xy+u.resolution.xy)% u.resolution.xy, 0).xy;
            ff=textureLoad(pressure, ((coord) % u.resolution.xy+u.resolution.xy)% u.resolution.xy, 0).x;
            
            // inflow=dot(ff2.xy,-vec2<f32>(dir));
            // currentInflow+=0.0;//inflow;
            // wantInflow+=inflow;
            
        }else{
          //  currentInflow+=inflow;
           // wantInflow+=0.0;
           // tot+=1.0;
        }
        // if(existe(coord )<1.0 && o==0){
        //     ff2=textureLoad(velocity, coord + dir, 0).xy*0.0;
        //     ff=textureLoad(pressure, coord + dir, 0).x;
        // }
        //inflow=dot(ff2.xy,-vec2<f32>(dir))/2.0;
        var inflow=(ff-textureLoad(pressure, ((coord) % u.resolution.xy+u.resolution.xy)% u.resolution.xy, 0).x);
       
        fl.x+=inflow;
        // // fl.x+=ff;

        dir=vec2<i32>(-dir.y, dir.x);
    }
    return (C + ( (currentInflow - wantInflow)*0.0 + fl.x)/4.0)*0.99999;//(sum.x + bC/2.0) / sum.y;
}
`,Os=`struct Uniforms {
    resolution: vec2<i32>,
};
@group(0) @binding(0) var<uniform> u : Uniforms;

@group(1) @binding(0) var pressure : texture_2d<f32>;
@group(1) @binding(1) var velocity : texture_2d<f32>;


fn sampleP(coord: vec2<i32>, coordo: vec2<i32>,exists2:f32) -> f32 {
    var exists = existe(((coord) % u.resolution.xy+u.resolution.xy)% u.resolution.xy);
    var q = textureLoad(pressure, ((coord) % u.resolution.xy+u.resolution.xy)% u.resolution.xy, 0).x;
    if (exists !=exists2) {
        q = textureLoad(pressure, ((coordo) % u.resolution.xy+u.resolution.xy)% u.resolution.xy , 0).x;
    }
    return q;
}

@fragment
fn gradient(@builtin(position) coords: vec4<f32>) -> @location(0) vec2<f32> {
    var uv = vec2<i32>(coords.xy);
    var e=existe(vec2<i32>(uv));
    var pL = sampleP(uv - vec2<i32>(1, 0), uv + vec2<i32>(0, 0),e);
    var pR = sampleP(uv + vec2<i32>(1, 0), uv - vec2<i32>(0, 0),e);
    var pB = sampleP(uv + vec2<i32>(0, 1), uv - vec2<i32>(0, 0),e);
    var pT = sampleP(uv - vec2<i32>(0, 1), uv + vec2<i32>(0, 0),e);
    var pC = sampleP(uv - vec2<i32>(0, 0), uv + vec2<i32>(0, 0),e);
    var v = textureLoad(velocity, uv, 0).xy;
    var exists = 1.0;//existe(vec2<i32>(uv));
    return exists * (v - vec2<f32>(pR - pL, pB - pT));
}
`,Rs=`struct Uniforms {
    resolution: vec2<i32>,
    timestep: f32
};
@group(0) @binding(0) var<uniform> u : Uniforms;

@group(1) @binding(0) var velocity : texture_2d<f32>;

let EPSILON = 2.4414e-4; // 2^-12
let curlAmount = 2.0;

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
`,Ve=`
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
        return 0.0;
    }
    
    return 1.0;
    // return 1.0;
}
`,Ns=`struct Uniforms {
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
`,vr=e=>typeof e=="function"&&!e.length?e():e,pr=e=>Array.isArray(e)?e:[e];function Ls(e,t,n,r){return e.addEventListener(t,n,r),we(e.removeEventListener.bind(e,t,n,r))}function be(e,t,n,r){const o=()=>{pr(vr(e)).forEach(i=>{i&&pr(vr(t)).forEach(s=>Ls(i,s,n,r))})};typeof e=="function"?B(o):_(o)}var mr=Object.prototype.hasOwnProperty;function Gt(e,t){var n,r;if(e===t)return!0;if(e&&t&&(n=e.constructor)===t.constructor){if(n===Date)return e.getTime()===t.getTime();if(n===RegExp)return e.toString()===t.toString();if(n===Array){if((r=e.length)===t.length)for(;r--&&Gt(e[r],t[r]););return r===-1}if(!n||typeof e=="object"){r=0;for(n in e)if(mr.call(e,n)&&++r&&!mr.call(t,n)||!(n in t)||!Gt(e[n],t[n]))return!1;return Object.keys(t).length===r}}return e!==e&&t!==t}var nn=function(t,n,r,o){this.name=t,this.fn=n,this.args=r,this.modifiers=o};nn.prototype._test=function(t){var n=this.fn;try{et(this.modifiers.slice(),n)(t)}catch{n=function(){return!1}}try{return et(this.modifiers.slice(),n)(t)}catch{return!1}};nn.prototype._check=function(t){try{et(this.modifiers.slice(),this.fn)(t)}catch{if(et(this.modifiers.slice(),function(r){return r})(!1))return}if(!et(this.modifiers.slice(),this.fn)(t))throw null};nn.prototype._testAsync=function(t){var n=this;return new Promise(function(r,o){No(n.modifiers.slice(),n.fn)(t).then(function(i){i?r(t):o(null)}).catch(function(i){return o(i)})})};function Ro(e,t){return t===void 0&&(t="simple"),typeof e=="object"?e[t]:e}function et(e,t){if(e.length){var n=e.shift(),r=et(e,t);return n.perform(r)}else return Ro(t)}function No(e,t){if(e.length){var n=e.shift(),r=No(e,t);return n.performAsync(r)}else return function(o){return Promise.resolve(Ro(t,"async")(o))}}var As=function(t,n,r){this.name=t,this.perform=n,this.performAsync=r},Wn=function(e){function t(n,r,o,i){for(var s=[],a=arguments.length-4;a-- >0;)s[a]=arguments[a+4];e.call(this,s),e.captureStackTrace&&e.captureStackTrace(this,t),this.rule=n,this.value=r,this.cause=o,this.target=i}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t}(Error),_e=function(t,n){t===void 0&&(t=[]),n===void 0&&(n=[]),this.chain=t,this.nextRuleModifiers=n};_e.prototype._applyRule=function(t,n){var r=this;return function(){for(var o=[],i=arguments.length;i--;)o[i]=arguments[i];return r.chain.push(new nn(n,t.apply(r,o),o,r.nextRuleModifiers)),r.nextRuleModifiers=[],r}};_e.prototype._applyModifier=function(t,n){return this.nextRuleModifiers.push(new As(n,t.simple,t.async)),this};_e.prototype._clone=function(){return new _e(this.chain.slice(),this.nextRuleModifiers.slice())};_e.prototype.test=function(t){return this.chain.every(function(n){return n._test(t)})};_e.prototype.testAll=function(t){var n=[];return this.chain.forEach(function(r){try{r._check(t)}catch(o){n.push(new Wn(r,t,o))}}),n};_e.prototype.check=function(t){this.chain.forEach(function(n){try{n._check(t)}catch(r){throw new Wn(n,t,r)}})};_e.prototype.testAsync=function(t){var n=this;return new Promise(function(r,o){Lo(t,n.chain.slice(),r,o)})};function Lo(e,t,n,r){if(t.length){var o=t.shift();o._testAsync(e).then(function(){Lo(e,t,n,r)},function(i){r(new Wn(o,e,i))})}else n(e)}function ie(){return typeof Proxy!==void 0?Ao(new _e):wn(new _e)}var yt={};ie.extend=function(e){Object.assign(yt,e)};ie.clearCustomRules=function(){yt={}};function Ao(e){return new Proxy(e,{get:function(n,r){if(r in n)return n[r];var o=Ao(e._clone());if(r in Ut)return o._applyModifier(Ut[r],r);if(r in yt)return o._applyRule(yt[r],r);if(r in $n)return o._applyRule($n[r],r)}})}function wn(e){var t=function(o,i){return Object.keys(o).forEach(function(s){i[s]=function(){for(var a=[],l=arguments.length;l--;)a[l]=arguments[l];var c=wn(i._clone()),u=c._applyRule(o[s],s).apply(void 0,a);return u}}),i},n=t($n,e),r=t(yt,n);return Object.keys(Ut).forEach(function(o){Object.defineProperty(r,o,{get:function(){var i=wn(r._clone());return i._applyModifier(Ut[o],o)}})}),r}var Ut={not:{simple:function(e){return function(t){return!e(t)}},async:function(e){return function(t){return Promise.resolve(e(t)).then(function(n){return!n}).catch(function(){return!0})}}},some:{simple:function(e){return function(t){return Rt(t).some(function(n){try{return e(n)}catch{return!1}})}},async:function(e){return function(t){return Promise.all(Rt(t).map(function(n){try{return e(n).catch(function(){return!1})}catch{return!1}})).then(function(n){return n.some(Boolean)})}}},every:{simple:function(e){return function(t){return t!==!1&&Rt(t).every(e)}},async:function(e){return function(t){return Promise.all(Rt(t).map(e)).then(function(n){return n.every(Boolean)})}}}};function Rt(e){return typeof e=="string"?e.split(""):e}var $n={equal:function(e){return function(t){return t==e}},exact:function(e){return function(t){return t===e}},number:function(e){return e===void 0&&(e=!0),function(t){return typeof t=="number"&&(e||isFinite(t))}},integer:function(){return function(e){var t=Number.isInteger||Ds;return t(e)}},numeric:function(){return function(e){return!isNaN(parseFloat(e))&&isFinite(e)}},string:function(){return Xe("string")},boolean:function(){return Xe("boolean")},undefined:function(){return Xe("undefined")},null:function(){return Xe("null")},array:function(){return Xe("array")},object:function(){return Xe("object")},instanceOf:function(e){return function(t){return t instanceof e}},pattern:function(e){return function(t){return e.test(t)}},lowercase:function(){return function(e){return/^([a-z]+\s*)+$/.test(e)}},uppercase:function(){return function(e){return/^([A-Z]+\s*)+$/.test(e)}},vowel:function(){return function(e){return/^[aeiou]+$/i.test(e)}},consonant:function(){return function(e){return/^(?=[^aeiou])([a-z]+)$/i.test(e)}},first:function(e){return function(t){return t[0]==e}},last:function(e){return function(t){return t[t.length-1]==e}},empty:function(){return function(e){return e.length===0}},length:function(e,t){return function(n){return n.length>=e&&n.length<=(t||e)}},minLength:function(e){return function(t){return t.length>=e}},maxLength:function(e){return function(t){return t.length<=e}},negative:function(){return function(e){return e<0}},positive:function(){return function(e){return e>=0}},between:function(e,t){return function(n){return n>=e&&n<=t}},range:function(e,t){return function(n){return n>=e&&n<=t}},lessThan:function(e){return function(t){return t<e}},lessThanOrEqual:function(e){return function(t){return t<=e}},greaterThan:function(e){return function(t){return t>e}},greaterThanOrEqual:function(e){return function(t){return t>=e}},even:function(){return function(e){return e%2===0}},odd:function(){return function(e){return e%2!==0}},includes:function(e){return function(t){return~t.indexOf(e)}},schema:function(e){return Is(e)},passesAnyOf:function(){for(var e=[],t=arguments.length;t--;)e[t]=arguments[t];return function(n){return e.some(function(r){return r.test(n)})}},optional:function(e,t){return t===void 0&&(t=!1),function(n){return t&&typeof n=="string"&&n.trim()===""||n!=null&&e.check(n),!0}}};function Xe(e){return function(t){return Array.isArray(t)&&e==="array"||t===null&&e==="null"||typeof t===e}}function Ds(e){return typeof e=="number"&&isFinite(e)&&Math.floor(e)===e}function Is(e){return{simple:function(t){var n=[];if(Object.keys(e).forEach(function(r){var o=e[r];try{o.check((t||{})[r])}catch(i){i.target=r,n.push(i)}}),n.length>0)throw n;return!0},async:function(t){var n=[],r=Object.keys(e).map(function(o){var i=e[o];return i.testAsync((t||{})[o]).catch(function(s){s.target=o,n.push(s)})});return Promise.all(r).then(function(){if(n.length>0)throw n;return!0})}}}function bt(e=null){return{current:e}}const ot=(e,t=0,n=1)=>e>n?n:e<t?t:e,Ms=P('<div class="react-colorful__interactive" tabindex="0" role="slider"></div>'),xt=e=>"touches"in e,Bs=(e,t)=>{for(let n=0;n<e.length;n++)if(e[n].identifier===t)return e[n];return e[0]},_n=e=>e&&e.ownerDocument.defaultView||self,yr=(e,t,n)=>{const r=e.getBoundingClientRect(),o=xt(t)?Bs(t.touches,n):t;return{left:ot((o.pageX-(r.left+_n(e).pageXOffset))/r.width),top:ot((o.pageY-(r.top+_n(e).pageYOffset))/r.height)}},br=e=>{!xt(e)&&e.preventDefault()},js=(e,t)=>t&&!xt(e),Hn=e=>{const t=bt(null),n=bt(null);let r=!1;const o=W(()=>{const a=f=>{const h=t.current;if(!!h&&(br(f),!(js(f,r)||!h))){if(xt(f)){r=!0;const g=f.changedTouches||[];g.length&&(n.current=g[0].identifier)}h.focus(),e.onMove(yr(h,f,n.current)),d(!0)}},l=f=>{br(f),(xt(f)?f.touches.length>0:f.buttons>0)&&t.current?e.onMove(yr(t.current,f,n.current)):d(!1)},c=()=>d(!1),u=f=>{const h=f.which||f.keyCode;h<37||h>40||(f.preventDefault(),e.onKey({left:h===39?.05:h===37?-.05:0,top:h===40?.05:h===38?-.05:0}))};function d(f){const h=t.current,g=_n(h),m=f?g.addEventListener:g.removeEventListener;m(r?"touchmove":"mousemove",l),m(r?"touchend":"mouseup",c)}return{handleMoveStart:a,handleKeyDown:u,toggleDocumentEvents:d}});we(()=>{o().toggleDocumentEvents});const[i,s]=Vn(e,["onMove","onKey"]);return(()=>{const a=Ms.cloneNode(!0);return vt(a,"keydown",o().handleKeyDown,!0),(l=>t.current=l)(a),vt(a,"mousedown",o().handleMoveStart,!0),vt(a,"touchstart",o().handleMoveStart,!0),Ue(a,s,!1,!1),a})()};Pe(["touchstart","mousedown","keydown"]);const _t=e=>e.filter(Boolean).join(" "),Vs=P('<div><div class="react-colorful__pointer-fill"></div></div>'),Fn=e=>(B(()=>{console.log(e.color)}),(()=>{const t=Vs.cloneNode(!0),n=t.firstChild;return _(r=>{const o=_t(["react-colorful__pointer",e.className]),i=`${e.top*100}%`,s=`${e.left*100}%`,a=e.color;return o!==r._v$&&(t.className=r._v$=o),i!==r._v$2&&t.style.setProperty("top",r._v$2=i),s!==r._v$3&&t.style.setProperty("left",r._v$3=s),a!==r._v$4&&n.style.setProperty("background-color",r._v$4=a),r},{_v$:void 0,_v$2:void 0,_v$3:void 0,_v$4:void 0}),t})()),ee=(e,t=0,n=Math.pow(10,t))=>Math.round(n*e)/n,Do=({h:e,s:t,v:n,a:r})=>{const o=(200-t)*n/100;return{h:ee(e),s:ee(o>0&&o<200?t*n/100/(o<=100?o:200-o)*100:0),l:ee(o/2),a:ee(r,2)}},Io=e=>{const{h:t,s:n,l:r}=Do(e);return`hsl(${t}, ${n}%, ${r}%)`},ln=e=>{const{h:t,s:n,l:r,a:o}=Do(e);return`hsla(${t}, ${n}%, ${r}%, ${o})`},Kn=({h:e,s:t,v:n,a:r})=>{e=e/360*6,t=t/100,n=n/100;const o=Math.floor(e),i=n*(1-t),s=n*(1-(e-o)*t),a=n*(1-(1-e+o)*t),l=o%6;return{r:ee([n,s,i,i,a,n][l]*255),g:ee([a,n,n,s,i,i][l]*255),b:ee([i,i,a,n,n,s][l]*255),a:ee(r,2)}},zs=e=>{const{r:t,g:n,b:r}=Kn(e);return`rgb(${t}, ${n}, ${r})`},Mo=({r:e,g:t,b:n,a:r})=>{const o=Math.max(e,t,n),i=o-Math.min(e,t,n),s=i?o===e?(t-n)/i:o===t?2+(n-e)/i:4+(e-t)/i:0;return{h:ee(60*(s<0?s+6:s)),s:ee(o?i/o*100:0),v:ee(o/255*100),a:r}},Gs=({r:e,g:t,b:n})=>({r:e,g:t,b:n}),Us=P("<div></div>"),Bo=e=>{const t=r=>{e.onChange({h:360*r.left})},n=r=>{e.onChange({h:ot(e.hue+r.left*360,0,360)})};return(()=>{const r=Us.cloneNode(!0);return k(r,v(Hn,{onMove:t,onKey:n,"aria-label":"Hue",get["aria-valuetext"](){return ee(e.hue)},get children(){return v(Fn,{className:"react-colorful__hue-pointer",get left(){return e.hue/360},top:0,get color(){return Io({h:e.hue,s:100,v:100,a:1})}})}})),_(()=>r.className=_t(["react-colorful__hue",e.className])),r})()},Ws=P('<div class="react-colorful__saturation"></div>'),jo=e=>{const t=r=>{e.onChange({s:r.left*100,v:100-r.top*100})},n=r=>{e.onChange({s:ot(e.hsva.s+r.left*100,0,100),v:ot(e.hsva.v-r.top*100,0,100)})};return(()=>{const r=Ws.cloneNode(!0);return k(r,v(Hn,{onMove:t,onKey:n,"aria-label":"Color",get["aria-valuetext"](){return`Saturation ${ee(e.hsva.s)}%, Brightness ${ee(e.hsva.v)}%`},get children(){return v(Fn,{className:"react-colorful__saturation-pointer",get top(){return 1-e.hsva.v/100},get left(){return e.hsva.s/100},get color(){return Io(e.hsva)}})}})),_(()=>r.style.setProperty("background-color",zs({h:e.hsva.h,s:100,v:100,a:1}))),r})()},qn=(e,t)=>{if(e===t)return!0;for(const n in e)if(e[n]!==t[n])return!1;return!0};function Vo(e){const[t,n]=I(e.colorModel.toHsva(e.color)),r=bt({color:e.color,hsva:t()});return B(()=>{if(!e.colorModel.equal(e.color,r.current.color)){const i=e.colorModel.toHsva(e.color);r.current={hsva:i,color:e.color},n(i)}}),B(()=>{var i;let s;!qn(t(),r.current.hsva)&&!e.colorModel.equal(s=e.colorModel.fromHsva(t()),r.current.color)&&(r.current={hsva:t(),color:s},(i=e.onChange)==null||i.call(e,s))}),[t,i=>{n(s=>Object.assign({},s,i))}]}const Hs=()=>{if(typeof __webpack_nonce__<"u")return __webpack_nonce__};var Fs=`.react-colorful {
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
`;const xr=new Map,zo=e=>{B(()=>{const t=e.current?e.current.ownerDocument:document;if(typeof t<"u"&&!xr.has(t)){const n=t.createElement("style");n.innerHTML=Fs,xr.set(t,n);const r=Hs();r&&n.setAttribute("nonce",r),t.head.appendChild(n)}})},Ks=P("<div></div>"),qs=e=>{const t=$e({color:e.colorModel.defaultColor},e);let n=bt();zo({current:n.current});const[r,o]=Vo(t),[i,s]=Vn(t,["color","colorModel","onChange","className"]);return B(()=>{console.log(r())}),(()=>{const a=Ks.cloneNode(!0);return(l=>n.current=l)(a),Ue(a,s,!1,!0),k(a,v(jo,{get hsva(){return r()},onChange:o}),null),k(a,v(Bo,{get hue(){return r().h},onChange:o,className:"react-colorful__last-control"}),null),_(()=>a.className=_t(["react-colorful",t.className])),a})()},Ys=P('<div><div class="react-colorful__alpha-gradient"></div></div>'),Xs=e=>{const t=a=>{e.onChange({a:a.left})},n=a=>{e.onChange({a:ot(e.hsva.a+a.left)})},r=ln(Object.assign({},e.hsva,{a:0})),o=ln(Object.assign({},e.hsva,{a:1})),i={backgroundImage:`linear-gradient(90deg, ${r}, ${o})`},s=_t(["react-colorful__alpha",e.className]);return(()=>{const a=Ys.cloneNode(!0),l=a.firstChild;return a.className=s,Gn(l,i),k(a,v(Hn,{onMove:t,onKey:n,"aria-label":"Alpha",get["aria-valuetext"](){return`${ee(e.hsva.a*100)}%`},get children(){return v(Fn,{className:"react-colorful__alpha-pointer",get left(){return e.hsva.a},top:0,get color(){return ln(e.hsva)}})}}),null),a})()},Js=P("<div></div>"),Zs=e=>{e=$e({},{color:e.colorModel.defaultColor},e);const t=bt();zo(t);const[n,r]=Vo(e.colorModel,e.color,e.onChange),o=_t(["react-colorful",e.className]);return(()=>{const i=Js.cloneNode(!0);return(s=>t.current=s)(i),i.className=o,k(i,v(jo,{get hsva(){return n()},onChange:r}),null),k(i,v(Bo,{get hue(){return n().h},onChange:r}),null),k(i,v(Xs,{get hsva(){return n()},onChange:r,className:"react-colorful__last-control"}),null),i})()},Qs={defaultColor:{r:0,g:0,b:0,a:1},toHsva:Mo,fromHsva:Kn,equal:qn},ea=e=>v(Zs,$e(e,{colorModel:Qs})),ta={defaultColor:{r:0,g:0,b:0},toHsva:({r:e,g:t,b:n})=>Mo({r:e,g:t,b:n,a:1}),fromHsva:e=>Gs(Kn(e)),equal:qn},na=e=>v(qs,$e(e,{colorModel:ta}));P("<input>");Pe(["input"]);function oe(e=null){return{current:e}}function wr(e,t){return e}function ra(e){let t;const n=new Set,r=(c,u)=>{const d=typeof c=="function"?c(t):c;if(d!==t){const f=t;t=u?d:Object.assign({},t,d),n.forEach(h=>h(t,f))}},o=()=>t,i=(c,u=o,d=Object.is)=>{console.warn("[DEPRECATED] Please use `subscribeWithSelector` middleware");let f=u(t);function h(){const g=u(t);if(!d(f,g)){const m=f;c(f=g,m)}}return n.add(h),()=>n.delete(h)},l={setState:r,getState:o,subscribe:(c,u,d)=>u||d?i(c,u,d):(n.add(c),()=>n.delete(c)),destroy:()=>n.clear()};return t=e(r,o,l),l}const Go=Symbol("store-raw"),Wt=Symbol("store-node"),oa=Symbol("store-name");function Uo(e,t){let n=e[Ge];if(!n){Object.defineProperty(e,Ge,{value:n=new Proxy(e,aa)});const r=Object.keys(e),o=Object.getOwnPropertyDescriptors(e);for(let i=0,s=r.length;i<s;i++){const a=r[i];if(o[a].get){const l=o[a].get.bind(n);Object.defineProperty(e,a,{get:l})}}}return n}function Ht(e){let t;return e!=null&&typeof e=="object"&&(e[Ge]||!(t=Object.getPrototypeOf(e))||t===Object.prototype||Array.isArray(e))}function wt(e,t=new Set){let n,r,o,i;if(n=e!=null&&e[Go])return n;if(!Ht(e)||t.has(e))return e;if(Array.isArray(e)){Object.isFrozen(e)?e=e.slice(0):t.add(e);for(let s=0,a=e.length;s<a;s++)o=e[s],(r=wt(o,t))!==o&&(e[s]=r)}else{Object.isFrozen(e)?e=Object.assign({},e):t.add(e);const s=Object.keys(e),a=Object.getOwnPropertyDescriptors(e);for(let l=0,c=s.length;l<c;l++)i=s[l],!a[i].get&&(o=e[i],(r=wt(o,t))!==o&&(e[i]=r))}return e}function Yn(e){let t=e[Wt];return t||Object.defineProperty(e,Wt,{value:t={}}),t}function Sn(e,t,n){return e[t]||(e[t]=Ho(n,!0))}function ia(e,t){const n=Reflect.getOwnPropertyDescriptor(e,t);return!n||n.get||!n.configurable||t===Ge||t===Wt||t===oa||(delete n.value,delete n.writable,n.get=()=>e[Ge][t]),n}function Wo(e){if(xo()){const t=Yn(e);(t._||(t._=Ho()))()}}function sa(e){return Wo(e),Reflect.ownKeys(e)}function Ho(e,t){const[n,r]=I(e,t?{internal:!0}:{equals:!1,internal:!0});return n.$=r,n}const aa={get(e,t,n){if(t===Go)return e;if(t===Ge)return n;if(t===vo)return Wo(e);const r=Yn(e),o=r[t];let i=o?r[t]():e[t];if(t===Wt||t==="__proto__")return i;if(!o){const s=Object.getOwnPropertyDescriptor(e,t);xo()&&(typeof i!="function"||e.hasOwnProperty(t))&&!(s&&s.get)&&(i=Sn(r,t,i)())}return Ht(i)?Uo(i):i},set(){return!0},deleteProperty(){return!0},ownKeys:sa,getOwnPropertyDescriptor:ia};function Ft(e,t,n){if(e[t]===n)return;const r=e[t],o=e.length;n===void 0?delete e[t]:e[t]=n;let i=Yn(e),s;(s=Sn(i,t,r))&&s.$(()=>n),Array.isArray(e)&&e.length!==o&&(s=Sn(i,"length",o))&&s.$(e.length),(s=i._)&&s.$()}function Fo(e,t){const n=Object.keys(t);for(let r=0;r<n.length;r+=1){const o=n[r];Ft(e,o,t[o])}}function la(e,t){if(typeof t=="function"&&(t=t(e)),t=wt(t),Array.isArray(t)){if(e===t)return;let n=0,r=t.length;for(;n<r;n++){const o=t[n];e[n]!==o&&Ft(e,n,o)}Ft(e,"length",r)}else Fo(e,t)}function ut(e,t,n=[]){let r,o=e;if(t.length>1){r=t.shift();const s=typeof r,a=Array.isArray(e);if(Array.isArray(r)){for(let l=0;l<r.length;l++)ut(e,[r[l]].concat(t),n);return}else if(a&&s==="function"){for(let l=0;l<e.length;l++)r(e[l],l)&&ut(e,[l].concat(t),n);return}else if(a&&s==="object"){const{from:l=0,to:c=e.length-1,by:u=1}=r;for(let d=l;d<=c;d+=u)ut(e,[d].concat(t),n);return}else if(t.length>1){ut(e[r],t,[r].concat(n));return}o=e[r],n=[r].concat(n)}let i=t[0];typeof i=="function"&&(i=i(o,n),i===o)||r===void 0&&i==null||(i=wt(i),r===void 0||Ht(o)&&Ht(i)&&!Array.isArray(i)?Fo(o,i):Ft(e,r,i))}function Ko(e,t){const n=wt(e||{}),r=Array.isArray(n),o=Uo(n);function i(...s){bo(()=>{r&&s.length===1?la(n,s[0]):ut(n,s)})}return[o,i]}var ca=Object.defineProperty,ua=Object.defineProperties,fa=Object.getOwnPropertyDescriptors,Kt=Object.getOwnPropertySymbols,qo=Object.prototype.hasOwnProperty,Yo=Object.prototype.propertyIsEnumerable,$r=(e,t,n)=>t in e?ca(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,E=(e,t)=>{for(var n in t||(t={}))qo.call(t,n)&&$r(e,n,t[n]);if(Kt)for(var n of Kt(t))Yo.call(t,n)&&$r(e,n,t[n]);return e},ge=(e,t)=>ua(e,fa(t)),H=(e,t)=>{var n={};for(var r in e)qo.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&Kt)for(var r of Kt(e))t.indexOf(r)<0&&Yo.call(e,r)&&(n[r]=e[r]);return n},me;(function(e){e[e.UNSUPPORTED_INPUT=0]="UNSUPPORTED_INPUT",e[e.NO_COMPONENT_FOR_TYPE=1]="NO_COMPONENT_FOR_TYPE",e[e.UNKNOWN_INPUT=2]="UNKNOWN_INPUT",e[e.DUPLICATE_KEYS=3]="DUPLICATE_KEYS",e[e.ALREADY_REGISTERED_TYPE=4]="ALREADY_REGISTERED_TYPE",e[e.CLIPBOARD_ERROR=5]="CLIPBOARD_ERROR",e[e.THEME_ERROR=6]="THEME_ERROR",e[e.PATH_DOESNT_EXIST=7]="PATH_DOESNT_EXIST",e[e.INPUT_TYPE_OVERRIDE=8]="INPUT_TYPE_OVERRIDE",e[e.EMPTY_KEY=9]="EMPTY_KEY"})(me||(me={}));const da={[0]:(e,t)=>[`An input with type \`${e}\` input was found at path \`${t}\` but it's not supported yet.`],[1]:(e,t)=>[`Type \`${e}\` found at path \`${t}\` can't be displayed in panel because no component supports it yet.`],[2]:(e,t)=>[`input at path \`${e}\` is not recognized.`,t],[3]:(e,t,n)=>[`Key \`${e}\` of path \`${t}\` already exists at path \`${n}\`. Even nested keys need to be unique. Rename one of the keys.`],[4]:e=>[`Type ${e} has already been registered. You can't register a component with the same type.`],[5]:e=>["Error copying the value",e],[6]:(e,t)=>[`Error accessing the theme \`${e}.${t}\` value.`],[7]:e=>[`Error getting the value at path \`${e}\`. There is probably an error in your \`render\` function.`],[7]:e=>[`Error accessing the value at path \`${e}\``],[8]:(e,t,n)=>[`Input at path \`${e}\` already exists with type: \`${t}\`. Its type cannot be overridden with type \`${n}\`.`],[9]:()=>["Keys can not be empty, if you want to hide a label use whitespace."]};function Xo(e,t,...n){const[r,...o]=da[t](...n);console[e]("LEVA: "+r,...o)}const Ne=Xo.bind(null,"warn");Xo.bind(null,"log");const Jo=[],We={};function _r(e){var t=e,{value:n}=t,r=H(t,["value"]);for(let o of Jo){const i=o(n,r);if(i)return i}}function Be(e,t){var n=t,{schema:r}=n,o=H(n,["schema"]);if(e in We){Ne(me.ALREADY_REGISTERED_TYPE,e);return}Jo.push((i,s)=>r(i,s)&&e),We[e]=o}function cn(e,t,n,r){const{normalize:o}=We[e];if(o)return o(t,n,r);if(typeof t!="object"||!("value"in t))return{value:t};const i=t,{value:s}=i,a=H(i,["value"]);return{value:s,settings:a}}function ha(e,t,n,r,o,i){const{sanitize:s}=We[e];return s?s(t,n,r,o,i):t}function Sr(e,t,n){const{format:r}=We[e];return r?r(t,n):t}const He=(e,t,n)=>e>n?n:e<t?t:e,ga=e=>{if(e===""||typeof e=="number")return e;try{const t=De(e);if(!isNaN(t))return t}catch{}return parseFloat(e)},va=Math.log(10);function kr(e){let t=Math.abs(+String(e).replace(".",""));if(t===0)return .01;for(;t!==0&&t%10===0;)t/=10;const n=Math.floor(Math.log(t)/va)+1,r=Math.floor(Math.log10(Math.abs(e))),o=Math.pow(10,r-n);return Math.max(o,.001)}const qt=(e,t,n)=>n===t?0:(e-t)/(n-t),Yt=(e,t,n)=>e*(n-t)+t,pa=()=>"_"+Math.random().toString(36).substr(2,9),Cr=/\(([0-9+\-*/^ .]+)\)/,Pr=/(\d+(?:\.\d+)?) ?\^ ?(\d+(?:\.\d+)?)/,Tr=/(\d+(?:\.\d+)?) ?\* ?(\d+(?:\.\d+)?)/,Er=/(\d+(?:\.\d+)?) ?\/ ?(\d+(?:\.\d+)?)/,Or=/(\d+(?:\.\d+)?) ?\+ ?(\d+(?:\.\d+)?)/,Rr=/(\d+(?:\.\d+)?) ?- ?(\d+(?:\.\d+)?)/;function De(e){if(isNaN(Number(e)))if(Cr.test(e)){const t=e.replace(Cr,(n,r)=>String(De(r)));return De(t)}else if(Pr.test(e)){const t=e.replace(Pr,(n,r,o)=>String(Math.pow(Number(r),Number(o))));return De(t)}else if(Tr.test(e)){const t=e.replace(Tr,(n,r,o)=>String(Number(r)*Number(o)));return De(t)}else if(Er.test(e)){const t=e.replace(Er,(n,r,o)=>{if(o!=0)return String(Number(r)/Number(o));throw new Error("Division by zero")});return De(t)}else if(Or.test(e)){const t=e.replace(Or,(n,r,o)=>String(Number(r)+Number(o)));return De(t)}else if(Rr.test(e)){const t=e.replace(Rr,(n,r,o)=>String(Number(r)-Number(o)));return De(t)}else return Number(e);return Number(e)}const Zo=(...e)=>e.filter(Boolean).join(".");function ma(e){const t=e.split(".");return[t.pop(),t.join(".")||void 0]}function ya(e,t){return t.reduce((n,r)=>(!!e&&e.hasOwnProperty(r)&&(n[r]=e[r]),n),{})}function ba(e,t){const n=E({},e);return t.forEach(r=>r in e&&delete n[r]),n}function xa(e,t){return e.reduce((n,r,o)=>Object.assign(n,{[t[o]]:r}),{})}var Se;(function(e){e.BUTTON="BUTTON",e.BUTTON_GROUP="BUTTON_GROUP",e.MONITOR="MONITOR",e.FOLDER="FOLDER"})(Se||(Se={}));var ke;(function(e){e.SELECT="SELECT",e.IMAGE="IMAGE",e.NUMBER="NUMBER",e.COLOR="COLOR",e.STRING="STRING",e.BOOLEAN="BOOLEAN",e.INTERVAL="INTERVAL",e.VECTOR3D="VECTOR3D",e.VECTOR2D="VECTOR2D"})(ke||(ke={}));function Qo(e,t,n={},r){if(typeof e!="object"||Array.isArray(e))return{type:r,input:e,options:E({key:t,label:t,optional:!1,disabled:!1},n)};if("__customInput"in e){const b=e,{type:S,__customInput:O}=b,R=H(b,["type","__customInput"]);return Qo(O,t,R,S)}const o=e,{render:i,label:s,optional:a,disabled:l,hint:c,onChange:u,onEditStart:d,onEditEnd:f,transient:h}=o,g=H(o,["render","label","optional","disabled","hint","onChange","onEditStart","onEditEnd","transient"]),m=E({render:i,key:t,label:s??t,hint:c,transient:h??!!u,onEditStart:d,onEditEnd:f},n);let y=g,{type:w}=y,p=H(y,["type"]);return w=r??w,w in Se?{type:w,input:p,options:m}:{type:w,input:p,options:ge(E({},m),{onChange:u,optional:a??!1,disabled:l??!1})}}function wa(e,t,n,r){const o=Qo(e,t),{type:i,input:s,options:a}=o;if(i)return i in Se?o:{type:i,input:cn(i,s,n,r),options:a};let l=_r(s);return l?{type:l,input:cn(l,s,n,r),options:a}:(l=_r({value:s}),l?{type:l,input:cn(l,{value:s},n,r),options:a}:!1)}function Nr(e,t,n,r,o){const{value:i,type:s,settings:a}=e;e.value=ei({type:s,value:i,settings:a},t,n,r),e.fromPanel=o}const Lr=function(e,t,n){this.type="LEVA_ERROR",this.message="LEVA: "+e,this.previousValue=t,this.error=n};function ei({type:e,value:t,settings:n},r,o,i){const s=e!=="SELECT"&&typeof r=="function"?r(t):r;let a;try{a=ha(e,s,n,t,o,i)}catch(l){throw new Lr(`The value \`${r}\` did not result in a correct value.`,t,l)}if(Gt(a,t))throw new Lr(`The value \`${r}\` did not result in a value update, which remained the same: \`${t}\`.
        You can ignore this warning if this is the intended behavior.`,t);return a}const $a=(e,t,n=!1)=>{let r=0;return function(){const o=arguments,i=n&&!r,s=()=>e.apply(this,o);window.clearTimeout(r),r=window.setTimeout(s,t),i&&s()}};function _a(e,t){return Object.entries(ya(e,t)).reduce((n,[,{value:r,disabled:o,key:i}])=>(n[i]=o?void 0:r,n),{})}const ti=e=>e.shiftKey?5:e.altKey?1/5:1,Sa=e=>typeof e=="number"||typeof e=="string"&&!isNaN(parseFloat(e)),ni=(e,{min:t=-1/0,max:n=1/0,suffix:r})=>{const o=parseFloat(e);if(e===""||isNaN(o))throw Error("Invalid number");const i=He(o,t,n);return r?i+r:i},ka=(e,{pad:t=0,suffix:n})=>{const r=parseFloat(e).toFixed(t);return n?r+n:r},ri=e=>{var t=e,{value:n}=t,r=H(t,["value"]);const o=r,{min:i=-1/0,max:s=1/0}=o,a=H(o,["min","max"]),l=He(parseFloat(n),i,s);let c;if(!Number.isFinite(n)){const h=String(n).match(/[A-Z]+/i);h&&(c=h[0])}let u=r.step;u||(Number.isFinite(i)?Number.isFinite(s)?u=+(Math.abs(s-i)/100).toPrecision(1):u=+(Math.abs(l-i)/100).toPrecision(1):Number.isFinite(s)&&(u=+(Math.abs(s-l)/100).toPrecision(1)));const d=u?kr(u)*10:kr(l);u=u||d/10;const f=Math.round(He(Math.log10(1/d),0,2));return{value:c?l+c:l,settings:E({initialValue:l,step:u,pad:f,min:i,max:s,suffix:c},a)}},oi=(e,{step:t,initialValue:n})=>{const r=Math.round((e-n)/t);return n+r*t};var Ca=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",schema:Sa,sanitize:ni,format:ka,normalize:ri,sanitizeStep:oi});const ii=Qt({});function se(){return en(ii)}const si=Qt(null),ai=Qt(null),li=Qt(null);function Xn(){return en(ai)}function Pa(){return en(li)}var D="colors",Q="sizes",x="space",Ta={gap:x,gridGap:x,columnGap:x,gridColumnGap:x,rowGap:x,gridRowGap:x,inset:x,insetBlock:x,insetBlockEnd:x,insetBlockStart:x,insetInline:x,insetInlineEnd:x,insetInlineStart:x,margin:x,marginTop:x,marginRight:x,marginBottom:x,marginLeft:x,marginBlock:x,marginBlockEnd:x,marginBlockStart:x,marginInline:x,marginInlineEnd:x,marginInlineStart:x,padding:x,paddingTop:x,paddingRight:x,paddingBottom:x,paddingLeft:x,paddingBlock:x,paddingBlockEnd:x,paddingBlockStart:x,paddingInline:x,paddingInlineEnd:x,paddingInlineStart:x,top:x,right:x,bottom:x,left:x,scrollMargin:x,scrollMarginTop:x,scrollMarginRight:x,scrollMarginBottom:x,scrollMarginLeft:x,scrollMarginX:x,scrollMarginY:x,scrollMarginBlock:x,scrollMarginBlockEnd:x,scrollMarginBlockStart:x,scrollMarginInline:x,scrollMarginInlineEnd:x,scrollMarginInlineStart:x,scrollPadding:x,scrollPaddingTop:x,scrollPaddingRight:x,scrollPaddingBottom:x,scrollPaddingLeft:x,scrollPaddingX:x,scrollPaddingY:x,scrollPaddingBlock:x,scrollPaddingBlockEnd:x,scrollPaddingBlockStart:x,scrollPaddingInline:x,scrollPaddingInlineEnd:x,scrollPaddingInlineStart:x,fontSize:"fontSizes",background:D,backgroundColor:D,backgroundImage:D,borderImage:D,border:D,borderBlock:D,borderBlockEnd:D,borderBlockStart:D,borderBottom:D,borderBottomColor:D,borderColor:D,borderInline:D,borderInlineEnd:D,borderInlineStart:D,borderLeft:D,borderLeftColor:D,borderRight:D,borderRightColor:D,borderTop:D,borderTopColor:D,caretColor:D,color:D,columnRuleColor:D,fill:D,outline:D,outlineColor:D,stroke:D,textDecorationColor:D,fontFamily:"fonts",fontWeight:"fontWeights",lineHeight:"lineHeights",letterSpacing:"letterSpacings",blockSize:Q,minBlockSize:Q,maxBlockSize:Q,inlineSize:Q,minInlineSize:Q,maxInlineSize:Q,width:Q,minWidth:Q,maxWidth:Q,height:Q,minHeight:Q,maxHeight:Q,flexBasis:Q,gridTemplateColumns:Q,gridTemplateRows:Q,borderWidth:"borderWidths",borderTopWidth:"borderWidths",borderRightWidth:"borderWidths",borderBottomWidth:"borderWidths",borderLeftWidth:"borderWidths",borderStyle:"borderStyles",borderTopStyle:"borderStyles",borderRightStyle:"borderStyles",borderBottomStyle:"borderStyles",borderLeftStyle:"borderStyles",borderRadius:"radii",borderTopLeftRadius:"radii",borderTopRightRadius:"radii",borderBottomRightRadius:"radii",borderBottomLeftRadius:"radii",boxShadow:"shadows",textShadow:"shadows",transition:"transitions",zIndex:"zIndices"},Ea=(e,t)=>typeof t=="function"?{"()":Function.prototype.toString.call(t)}:t,St=()=>{const e=Object.create(null);return(t,n,...r)=>{const o=(i=>JSON.stringify(i,Ea))(t);return o in e?e[o]:e[o]=n(t,...r)}},It=Symbol.for("sxs.internal"),Jn=(e,t)=>Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)),Ar=e=>{for(const t in e)return!0;return!1},{hasOwnProperty:Oa}=Object.prototype,kn=e=>e.includes("-")?e:e.replace(/[A-Z]/g,t=>"-"+t.toLowerCase()),Ra=/\s+(?![^()]*\))/,Je=e=>t=>e(...typeof t=="string"?String(t).split(Ra):[t]),Dr={appearance:e=>({WebkitAppearance:e,appearance:e}),backfaceVisibility:e=>({WebkitBackfaceVisibility:e,backfaceVisibility:e}),backdropFilter:e=>({WebkitBackdropFilter:e,backdropFilter:e}),backgroundClip:e=>({WebkitBackgroundClip:e,backgroundClip:e}),boxDecorationBreak:e=>({WebkitBoxDecorationBreak:e,boxDecorationBreak:e}),clipPath:e=>({WebkitClipPath:e,clipPath:e}),content:e=>({content:e.includes('"')||e.includes("'")||/^([A-Za-z]+\([^]*|[^]*-quote|inherit|initial|none|normal|revert|unset)$/.test(e)?e:`"${e}"`}),hyphens:e=>({WebkitHyphens:e,hyphens:e}),maskImage:e=>({WebkitMaskImage:e,maskImage:e}),maskSize:e=>({WebkitMaskSize:e,maskSize:e}),tabSize:e=>({MozTabSize:e,tabSize:e}),textSizeAdjust:e=>({WebkitTextSizeAdjust:e,textSizeAdjust:e}),userSelect:e=>({WebkitUserSelect:e,userSelect:e}),marginBlock:Je((e,t)=>({marginBlockStart:e,marginBlockEnd:t||e})),marginInline:Je((e,t)=>({marginInlineStart:e,marginInlineEnd:t||e})),maxSize:Je((e,t)=>({maxBlockSize:e,maxInlineSize:t||e})),minSize:Je((e,t)=>({minBlockSize:e,minInlineSize:t||e})),paddingBlock:Je((e,t)=>({paddingBlockStart:e,paddingBlockEnd:t||e})),paddingInline:Je((e,t)=>({paddingInlineStart:e,paddingInlineEnd:t||e}))},un=/([\d.]+)([^]*)/,Na=(e,t)=>e.length?e.reduce((n,r)=>(n.push(...t.map(o=>o.includes("&")?o.replace(/&/g,/[ +>|~]/.test(r)&&/&.*&/.test(o)?`:is(${r})`:r):r+" "+o)),n),[]):t,La=(e,t)=>e in Aa&&typeof t=="string"?t.replace(/^((?:[^]*[^\w-])?)(fit-content|stretch)((?:[^\w-][^]*)?)$/,(n,r,o,i)=>r+(o==="stretch"?`-moz-available${i};${kn(e)}:${r}-webkit-fill-available`:`-moz-fit-content${i};${kn(e)}:${r}fit-content`)+i):String(t),Aa={blockSize:1,height:1,inlineSize:1,maxBlockSize:1,maxHeight:1,maxInlineSize:1,maxWidth:1,minBlockSize:1,minHeight:1,minInlineSize:1,minWidth:1,width:1},Le=e=>e?e+"-":"",ci=(e,t,n)=>e.replace(/([+-])?((?:\d+(?:\.\d*)?|\.\d+)(?:[Ee][+-]?\d+)?)?(\$|--)([$\w-]+)/g,(r,o,i,s,a)=>s=="$"==!!i?r:(o||s=="--"?"calc(":"")+"var(--"+(s==="$"?Le(t)+(a.includes("$")?"":Le(n))+a.replace(/\$/g,"-"):a)+")"+(o||s=="--"?"*"+(o||"")+(i||"1")+")":"")),Da=/\s*,\s*(?![^()]*\))/,Ia=Object.prototype.toString,Qe=(e,t,n,r,o)=>{let i,s,a;const l=(c,u,d)=>{let f,h;const g=m=>{for(f in m){const p=f.charCodeAt(0)===64,b=p&&Array.isArray(m[f])?m[f]:[m[f]];for(h of b){const S=/[A-Z]/.test(w=f)?w:w.replace(/-[^]/g,R=>R[1].toUpperCase()),O=typeof h=="object"&&h&&h.toString===Ia&&(!r.utils[S]||!u.length);if(S in r.utils&&!O){const R=r.utils[S];if(R!==s){s=R,g(R(h)),s=null;continue}}else if(S in Dr){const R=Dr[S];if(R!==a){a=R,g(R(h)),a=null;continue}}if(p&&(y=f.slice(1)in r.media?"@media "+r.media[f.slice(1)]:f,f=y.replace(/\(\s*([\w-]+)\s*(=|<|<=|>|>=)\s*([\w-]+)\s*(?:(<|<=|>|>=)\s*([\w-]+)\s*)?\)/g,(R,z,A,N,L,M)=>{const j=un.test(z),J=.0625*(j?-1:1),[ce,ue]=j?[N,z]:[z,N];return"("+(A[0]==="="?"":A[0]===">"===j?"max-":"min-")+ce+":"+(A[0]!=="="&&A.length===1?ue.replace(un,(ae,V,fe)=>Number(V)+J*(A===">"?1:-1)+fe):ue)+(L?") and ("+(L[0]===">"?"min-":"max-")+ce+":"+(L.length===1?M.replace(un,(ae,V,fe)=>Number(V)+J*(L===">"?-1:1)+fe):M):"")+")"})),O){const R=p?d.concat(f):[...d],z=p?[...u]:Na(u,f.split(Da));i!==void 0&&o(Ir(...i)),i=void 0,l(h,z,R)}else i===void 0&&(i=[[],u,d]),f=p||f.charCodeAt(0)!==36?f:`--${Le(r.prefix)}${f.slice(1).replace(/\$/g,"-")}`,h=O?h:typeof h=="number"?h&&S in Ma?String(h)+"px":String(h):ci(La(S,h??""),r.prefix,r.themeMap[S]),i[0].push(`${p?`${f} `:`${kn(f)}:`}${h}`)}}var y,w};g(c),i!==void 0&&o(Ir(...i)),i=void 0};l(e,t,n)},Ir=(e,t,n)=>`${n.map(r=>`${r}{`).join("")}${t.length?`${t.join(",")}{`:""}${e.join(";")}${t.length?"}":""}${Array(n.length?n.length+1:0).join("}")}`,Ma={animationDelay:1,animationDuration:1,backgroundSize:1,blockSize:1,border:1,borderBlock:1,borderBlockEnd:1,borderBlockEndWidth:1,borderBlockStart:1,borderBlockStartWidth:1,borderBlockWidth:1,borderBottom:1,borderBottomLeftRadius:1,borderBottomRightRadius:1,borderBottomWidth:1,borderEndEndRadius:1,borderEndStartRadius:1,borderInlineEnd:1,borderInlineEndWidth:1,borderInlineStart:1,borderInlineStartWidth:1,borderInlineWidth:1,borderLeft:1,borderLeftWidth:1,borderRadius:1,borderRight:1,borderRightWidth:1,borderSpacing:1,borderStartEndRadius:1,borderStartStartRadius:1,borderTop:1,borderTopLeftRadius:1,borderTopRightRadius:1,borderTopWidth:1,borderWidth:1,bottom:1,columnGap:1,columnRule:1,columnRuleWidth:1,columnWidth:1,containIntrinsicSize:1,flexBasis:1,fontSize:1,gap:1,gridAutoColumns:1,gridAutoRows:1,gridTemplateColumns:1,gridTemplateRows:1,height:1,inlineSize:1,inset:1,insetBlock:1,insetBlockEnd:1,insetBlockStart:1,insetInline:1,insetInlineEnd:1,insetInlineStart:1,left:1,letterSpacing:1,margin:1,marginBlock:1,marginBlockEnd:1,marginBlockStart:1,marginBottom:1,marginInline:1,marginInlineEnd:1,marginInlineStart:1,marginLeft:1,marginRight:1,marginTop:1,maxBlockSize:1,maxHeight:1,maxInlineSize:1,maxWidth:1,minBlockSize:1,minHeight:1,minInlineSize:1,minWidth:1,offsetDistance:1,offsetRotate:1,outline:1,outlineOffset:1,outlineWidth:1,overflowClipMargin:1,padding:1,paddingBlock:1,paddingBlockEnd:1,paddingBlockStart:1,paddingBottom:1,paddingInline:1,paddingInlineEnd:1,paddingInlineStart:1,paddingLeft:1,paddingRight:1,paddingTop:1,perspective:1,right:1,rowGap:1,scrollMargin:1,scrollMarginBlock:1,scrollMarginBlockEnd:1,scrollMarginBlockStart:1,scrollMarginBottom:1,scrollMarginInline:1,scrollMarginInlineEnd:1,scrollMarginInlineStart:1,scrollMarginLeft:1,scrollMarginRight:1,scrollMarginTop:1,scrollPadding:1,scrollPaddingBlock:1,scrollPaddingBlockEnd:1,scrollPaddingBlockStart:1,scrollPaddingBottom:1,scrollPaddingInline:1,scrollPaddingInlineEnd:1,scrollPaddingInlineStart:1,scrollPaddingLeft:1,scrollPaddingRight:1,scrollPaddingTop:1,shapeMargin:1,textDecoration:1,textDecorationThickness:1,textIndent:1,textUnderlineOffset:1,top:1,transitionDelay:1,transitionDuration:1,verticalAlign:1,width:1,wordSpacing:1},Mr=e=>String.fromCharCode(e+(e>25?39:97)),ze=e=>(t=>{let n,r="";for(n=Math.abs(t);n>52;n=n/52|0)r=Mr(n%52)+r;return Mr(n%52)+r})(((t,n)=>{let r=n.length;for(;r;)t=33*t^n.charCodeAt(--r);return t})(5381,JSON.stringify(e))>>>0),ft=["themed","global","styled","onevar","resonevar","allvar","inline"],Ba=e=>{if(e.href&&!e.href.startsWith(location.origin))return!1;try{return e.cssRules,!0}catch{return!1}},ja=e=>{let t;const n=()=>{if(t){const{rules:s,sheet:a}=t;if(!a.deleteRule){for(;Object(Object(a.cssRules)[0]).type===3;)a.cssRules.splice(0,1);a.cssRules=[]}for(const l in s)delete s[l]}const r=Object(e).styleSheets||[];for(const s of r)if(Ba(s)){for(let a=0,l=s.cssRules;l[a];++a){const c=Object(l[a]);if(c.type!==1)continue;const u=Object(l[a+1]);if(u.type!==4)continue;++a;const{cssText:d}=c;if(!d.startsWith("--sxs"))continue;const f=d.slice(14,-3).trim().split(/\s+/),h=ft[f[0]];h&&(t||(t={sheet:s,reset:n,rules:{}}),t.rules[h]={group:u,index:a,cache:new Set(f)})}if(t)break}if(!t){const s=(a,l)=>({type:l,cssRules:[],insertRule(c,u){this.cssRules.splice(u,0,s(c,{import:3,undefined:1}[(c.toLowerCase().match(/^@([a-z]+)/)||[])[1]]||4))},get cssText(){return a==="@media{}"?`@media{${[].map.call(this.cssRules,c=>c.cssText).join("")}}`:a}});t={sheet:e?(e.head||e).appendChild(document.createElement("style")).sheet:s("","text/css"),rules:{},reset:n,toString(){const{cssRules:a}=t.sheet;return[].map.call(a,(l,c)=>{const{cssText:u}=l;let d="";if(u.startsWith("--sxs"))return"";if(a[c-1]&&(d=a[c-1].cssText).startsWith("--sxs")){if(!l.cssRules.length)return"";for(const f in t.rules)if(t.rules[f].group===l)return`--sxs{--sxs:${[...t.rules[f].cache].join(" ")}}${u}`;return l.cssRules.length?`${d}${u}`:""}return u}).join("")}}}const{sheet:o,rules:i}=t;for(let s=ft.length-1;s>=0;--s){const a=ft[s];if(!i[a]){const l=ft[s+1],c=i[l]?i[l].index:o.cssRules.length;o.insertRule("@media{}",c),o.insertRule(`--sxs{--sxs:${s}}`,c),i[a]={group:o.cssRules[c+1],index:c,cache:new Set([s])}}Va(i[a])}};return n(),t},Va=e=>{const t=e.group;let n=t.cssRules.length;e.apply=r=>{try{t.insertRule(r,n),++n}catch{}}},at=Symbol(),za=St(),Ga=(e,t)=>za(e,()=>(...n)=>{let r={type:null,composers:new Set};for(const o of n)if(o!=null)if(o[It]){r.type==null&&(r.type=o[It].type);for(const i of o[It].composers)r.composers.add(i)}else o.constructor!==Object||o.$$typeof?r.type==null&&(r.type=o):r.composers.add(Ua(o,e));return r.type==null&&(r.type="span"),r.composers.size||r.composers.add(["PJLV",{},[],[],{},[]]),Wa(e,r,t)}),Ua=(e,t)=>{var n=e,{variants:r,compoundVariants:o,defaultVariants:i}=n,s=H(n,["variants","compoundVariants","defaultVariants"]);const a=`${Le(t.prefix)}c-${ze(s)}`,l=[],c=[],u=Object.create(null),d=[];for(const g in i)u[g]=String(i[g]);if(typeof r=="object"&&r)for(const g in r){f=u,h=g,Oa.call(f,h)||(u[g]="undefined");const m=r[g];for(const y in m){const w={[g]:String(y)};String(y)==="undefined"&&d.push(g);const p=m[y],b=[w,p,!Ar(p)];l.push(b)}}var f,h;if(typeof o=="object"&&o)for(const g of o){let m=g,{css:y}=m,w=H(m,["css"]);y=typeof y=="object"&&y||{};for(const b in w)w[b]=String(w[b]);const p=[w,y,!Ar(y)];c.push(p)}return[a,s,l,c,u,d]},Wa=(e,t,n)=>{const[r,o,i,s]=Ha(t.composers),a=typeof t.type=="function"||t.type.$$typeof?(d=>{function f(){for(let h=0;h<f[at].length;h++){const[g,m]=f[at][h];d.rules[g].apply(m)}return f[at]=[],null}return f[at]=[],f.rules={},ft.forEach(h=>f.rules[h]={apply:g=>f[at].push([h,g])}),f})(n):null,l=(a||n).rules,c=`.${r}${o.length>1?`:where(.${o.slice(1).join(".")})`:""}`,u=d=>{d=typeof d=="object"&&d||Fa;const f=d,{css:h}=f,g=H(f,["css"]),m={};for(const p in i)if(delete g[p],p in d){let b=d[p];typeof b=="object"&&b?m[p]=E({"@initial":i[p]},b):(b=String(b),m[p]=b!=="undefined"||s.has(p)?b:i[p])}else m[p]=i[p];const y=new Set([...o]);for(const[p,b,S,O]of t.composers){n.rules.styled.cache.has(p)||(n.rules.styled.cache.add(p),Qe(b,[`.${p}`],[],e,A=>{l.styled.apply(A)}));const R=Br(S,m,e.media),z=Br(O,m,e.media,!0);for(const A of R)if(A!==void 0)for(const[N,L,M]of A){const j=`${p}-${ze(L)}-${N}`;y.add(j);const J=(M?n.rules.resonevar:n.rules.onevar).cache,ce=M?l.resonevar:l.onevar;J.has(j)||(J.add(j),Qe(L,[`.${j}`],[],e,ue=>{ce.apply(ue)}))}for(const A of z)if(A!==void 0)for(const[N,L]of A){const M=`${p}-${ze(L)}-${N}`;y.add(M),n.rules.allvar.cache.has(M)||(n.rules.allvar.cache.add(M),Qe(L,[`.${M}`],[],e,j=>{l.allvar.apply(j)}))}}if(typeof h=="object"&&h){const p=`${r}-i${ze(h)}-css`;y.add(p),n.rules.inline.cache.has(p)||(n.rules.inline.cache.add(p),Qe(h,[`.${p}`],[],e,b=>{l.inline.apply(b)}))}for(const p of String(d.className||"").trim().split(/\s+/))p&&y.add(p);const w=g.className=[...y].join(" ");return{type:t.type,className:w,selector:c,props:g,toString:()=>w,deferredInjector:a}};return Jn(u,{className:r,selector:c,[It]:t,toString:()=>(n.rules.styled.cache.has(r)||u(),r)})},Ha=e=>{let t="";const n=[],r={},o=[];for(const[i,,,,s,a]of e){t===""&&(t=i),n.push(i),o.push(...a);for(const l in s){const c=s[l];(r[l]===void 0||c!=="undefined"||a.includes(c))&&(r[l]=c)}}return[t,n,r,new Set(o)]},Br=(e,t,n,r)=>{const o=[];e:for(let[i,s,a]of e){if(a)continue;let l,c=0,u=!1;for(l in i){const d=i[l];let f=t[l];if(f!==d){if(typeof f!="object"||!f)continue e;{let h,g,m=0;for(const y in f){if(d===String(f[y])){if(y!=="@initial"){const w=y.slice(1);(g=g||[]).push(w in n?n[w]:y.replace(/^@media ?/,"")),u=!0}c+=m,h=!0}++m}if(g&&g.length&&(s={["@media "+g.join(", ")]:s}),!h)continue e}}}(o[c]=o[c]||[]).push([r?"cv":`${l}-${i[l]}`,s,u])}return o},Fa={},Ka=St(),qa=(e,t)=>Ka(e,()=>(...n)=>{const r=()=>{for(let o of n){o=typeof o=="object"&&o||{};let i=ze(o);if(!t.rules.global.cache.has(i)){if(t.rules.global.cache.add(i),"@import"in o){let s=[].indexOf.call(t.sheet.cssRules,t.rules.themed.group)-1;for(let a of[].concat(o["@import"]))a=a.includes('"')||a.includes("'")?a:`"${a}"`,t.sheet.insertRule(`@import ${a};`,s++);delete o["@import"]}Qe(o,[],[],e,s=>{t.rules.global.apply(s)})}}return""};return Jn(r,{toString:r})}),Ya=St(),Xa=(e,t)=>Ya(e,()=>n=>{const r=`${Le(e.prefix)}k-${ze(n)}`,o=()=>{if(!t.rules.global.cache.has(r)){t.rules.global.cache.add(r);const i=[];Qe(n,[],[],e,a=>i.push(a));const s=`@keyframes ${r}{${i.join("")}}`;t.rules.global.apply(s)}return r};return Jn(o,{get name(){return o()},toString:o})}),Ja=class{constructor(e,t,n,r){this.token=e==null?"":String(e),this.value=t==null?"":String(t),this.scale=n==null?"":String(n),this.prefix=r==null?"":String(r)}get computedValue(){return"var("+this.variable+")"}get variable(){return"--"+Le(this.prefix)+Le(this.scale)+this.token}toString(){return this.computedValue}},Za=St(),Qa=(e,t)=>Za(e,()=>(n,r)=>{r=typeof n=="object"&&n||Object(r);const o=`.${n=(n=typeof n=="string"?n:"")||`${Le(e.prefix)}t-${ze(r)}`}`,i={},s=[];for(const l in r){i[l]={};for(const c in r[l]){const u=`--${Le(e.prefix)}${l}-${c}`,d=ci(String(r[l][c]),e.prefix,l);i[l][c]=new Ja(c,d,l,e.prefix),s.push(`${u}:${d}`)}}const a=()=>{if(s.length&&!t.rules.themed.cache.has(n)){t.rules.themed.cache.add(n);const l=`${r===e.theme?":root,":""}.${n}{${s.join(";")}}`;t.rules.themed.apply(l)}return n};return ge(E({},i),{get className(){return a()},selector:o,toString:a})}),el=St(),tl=e=>{let t=!1;const n=el(e,r=>{t=!0;const o="prefix"in(r=typeof r=="object"&&r||{})?String(r.prefix):"",i=typeof r.media=="object"&&r.media||{},s=typeof r.root=="object"?r.root||null:globalThis.document||null,a=typeof r.theme=="object"&&r.theme||{},l={prefix:o,media:i,theme:a,themeMap:typeof r.themeMap=="object"&&r.themeMap||E({},Ta),utils:typeof r.utils=="object"&&r.utils||{}},c=ja(s),u={css:Ga(l,c),globalCss:qa(l,c),keyframes:Xa(l,c),createTheme:Qa(l,c),reset(){c.reset(),u.theme.toString()},theme:{},sheet:c,config:l,prefix:o,getCssText:c.toString,toString:c.toString};return String(u.theme=u.createTheme(a)),u});return t||n.reset(),n};const ui=()=>({colors:{elevation1:"#292d39",elevation2:"#181c20",elevation3:"#373c4b",accent1:"#0066dc",accent2:"#007bff",accent3:"#3c93ff",highlight1:"#535760",highlight2:"#8c92a4",highlight3:"#fefefe",vivid1:"#ffcc00",folderWidgetColor:"$highlight2",folderTextColor:"$highlight3",toolTipBackground:"$highlight3",toolTipText:"$elevation2"},radii:{xs:"2px",sm:"3px",lg:"10px"},space:{xs:"3px",sm:"6px",md:"10px",rowGap:"7px",colGap:"7px"},fonts:{mono:"ui-monospace, SFMono-Regular, Menlo, 'Roboto Mono', monospace",sans:"system-ui, sans-serif"},fontSizes:{root:"11px",toolTip:"$root"},sizes:{rootWidth:"280px",controlWidth:"160px",numberInputMinWidth:"38px",scrubberWidth:"8px",scrubberHeight:"16px",rowHeight:"24px",folderTitleHeight:"20px",checkboxSize:"16px",joystickWidth:"100px",joystickHeight:"100px",colorPickerWidth:"$controlWidth",colorPickerHeight:"100px",imagePreviewWidth:"$controlWidth",imagePreviewHeight:"100px",monitorHeight:"60px",titleBarHeight:"39px"},shadows:{level1:"0 0 9px 0 #00000088",level2:"0 4px 14px #00000033"},borderWidths:{root:"0px",input:"1px",focus:"1px",hover:"1px",active:"1px",folder:"1px"},fontWeights:{label:"normal",folder:"normal",button:"normal"}});function Nt(e,t){const[n,r]=e.split(" "),o={};return n!=="none"&&(o.boxShadow=`${t.inset?"inset ":""}0 0 0 $borderWidths${[t.key]} $colors${n!=="default"&&n||t.borderColor}`),r&&(o.backgroundColor=r),o}const lt={$inputStyle:()=>e=>Nt(e,{key:"$input",borderColor:"$highlight1",inset:!0}),$focusStyle:()=>e=>Nt(e,{key:"$focus",borderColor:"$accent2"}),$hoverStyle:()=>e=>Nt(e,{key:"$hover",borderColor:"$accent1",inset:!0}),$activeStyle:()=>e=>Nt(e,{key:"$active",borderColor:"$accent1",inset:!0})},{css:T,createTheme:nl,globalCss:rl,keyframes:wd}=tl({prefix:"leva",theme:ui(),utils:ge(E({},lt),{$flex:()=>({display:"flex",alignItems:"center"}),$flexCenter:()=>({display:"flex",alignItems:"center",justifyContent:"center"}),$reset:()=>({outline:"none",fontSize:"inherit",fontWeight:"inherit",color:"inherit",fontFamily:"inherit",border:"none",backgroundColor:"transparent",appearance:"none"}),$draggable:()=>({touchAction:"none",WebkitUserDrag:"none",userSelect:"none"}),$focus:e=>({"&:focus":lt.$focusStyle()(e)}),$focusWithin:e=>({"&:focus-within":lt.$focusStyle()(e)}),$hover:e=>({"&:hover":lt.$hoverStyle()(e)}),$active:e=>({"&:active":lt.$activeStyle()(e)})})}),ol=rl({".panel__dragged":{WebkitUserDrag:"none",userSelect:"none",input:{userSelect:"none"},"*":{cursor:"ew-resize !important"}}});ol();function il(e){const t=ui();if(!e)return{theme:t,className:""};Object.keys(e).forEach(r=>{Object.assign(t[r],e[r])});const n=nl(e);return{theme:t,className:n}}function it(e,t){const{theme:n}=en(si);if(!(e in n)||!(t in n[e]))return Ne(me.THEME_ERROR,e,t),"";let r=t;for(;;){let o=n[e][r];if(typeof o=="string"&&o.charAt(0)==="$")r=o.substr(1);else return o}}const fi=T({$reset:"",padding:"0 $sm",width:0,minWidth:0,flex:1,variants:{levaType:{number:{textAlign:"right"}}}}),sl=T({$draggable:"",height:"100%",$flexCenter:"",position:"relative",padding:"0 $xs",fontSize:"0.8em",opacity:.8,cursor:"default",[`& + ${fi}`]:{paddingLeft:0}}),al=T({cursor:"ew-resize",marginRight:"-$xs",textTransform:"uppercase",opacity:.3,"&:hover":{opacity:1},variants:{dragging:{true:{backgroundColor:"$accent2",opacity:1}}}}),ll=T({$flex:"",position:"relative",borderRadius:"$sm",overflow:"hidden",color:"inherit",height:"$rowHeight",backgroundColor:"$elevation3",$inputStyle:"$elevation1",$hover:"",$focusWithin:""}),cl=P('<div><label></label><input type="text" autocomplete="off" spell-check="false"></div>');function Zn(e){const{id:t,emitOnEditStart:n,emitOnEditEnd:r}=se(),o=e.id||t;let i;const s=l=>c=>{const u=c.currentTarget.value;l(u)};B(()=>{const l=i,c=s(u=>{e.onUpdate(u)});return l?.addEventListener("blur",c),()=>l?.removeEventListener("blur",c)},[s,e.onUpdate,r]);const a=l=>{l.key==="Enter"&&s(e.onUpdate)(l)};return(()=>{const l=cl.cloneNode(!0),c=l.firstChild,u=c.nextSibling;k(c,()=>e.innerLabel),vt(u,"keydown",e.onKeyDown,!0),u.addEventListener("keypress",a),u.addEventListener("change",f=>{e.onUpdate(f.currentTarget.value)}),u.$$input=f=>{e.onChange(f.currentTarget.value)};const d=i;return typeof d=="function"?d(u):i=u,pe(u,"id",o),_(f=>{const h=ll(),g=sl(),m=fi({levaType:e.type}),y=e.value;return h!==f._v$&&(l.className=f._v$=h),g!==f._v$2&&(c.className=f._v$2=g),m!==f._v$3&&(u.className=f._v$3=m),y!==f._v$4&&(u.value=f._v$4=y),f},{_v$:void 0,_v$2:void 0,_v$3:void 0,_v$4:void 0}),l})()}function ul(e){return v(Zn,{get value(){return e.value},get onChange(){return e.onChange},onUpdate:r=>e.onUpdate(ga(r)),onKeyDown:r=>{const o=r.key==="ArrowUp"?1:r.key==="ArrowDown"?-1:0;if(o){r.preventDefault();const i=r.altKey?.1:r.shiftKey?10:1;e.onUpdate(s=>parseFloat(s)+o*i)}},get innerLabel(){return e.innerLabel}})}Pe(["input","keydown"]);const Xt=T({}),Cn=T({position:"relative",background:"$elevation2",transition:"height 300ms ease",variants:{fill:{true:{},false:{}},flat:{false:{},true:{}},isRoot:{true:{},false:{paddingLeft:"$md","&::after":{content:'""',position:"absolute",left:0,top:0,width:"$borderWidths$folder",height:"100%",backgroundColor:"$folderWidgetColor",opacity:.4,transform:"translateX(-50%)"}}}},compoundVariants:[{isRoot:!0,fill:!1,css:{overflowY:"auto",maxHeight:"calc(100vh - 20px - $$titleBarHeight)"}},{isRoot:!0,flat:!1,css:{borderRadius:"$lg"}}]}),fl=T({$flex:"",color:"$folderTextColor",userSelect:"none",cursor:"pointer",height:"$folderTitleHeight",fontWeight:"$folder","> svg":{marginLeft:-4,marginRight:4,cursor:"pointer",fill:"$folderWidgetColor",opacity:.6},"&:hover > svg":{fill:"$folderWidgetColor"},[`&:hover + ${Cn}::after`]:{opacity:.6},[`${Xt}:hover > & + ${Cn}::after`]:{opacity:.6},[`${Xt}:hover > & > svg`]:{opacity:1}}),di=T({position:"relative",display:"grid",gridTemplateColumns:"100%",rowGap:"$rowGap",variants:{toggled:{true:{opacity:1,transitionDelay:"0ms"},false:{opacity:0,transitionDelay:"0ms",pointerEvents:"none"}},isRoot:{true:{"& > div":{paddingLeft:"$md",paddingRight:"$md"},"& > div:first-of-type":{paddingTop:"$sm"},"& > div:last-of-type":{paddingBottom:"$sm"},[`> ${Xt}:not(:first-of-type)`]:{paddingTop:"$sm",marginTop:"$md",borderTop:"$borderWidths$folder solid $colors$elevation1"}}}}}),hi=T({position:"relative",zIndex:100,display:"grid",rowGap:"$rowGap",gridTemplateRows:"minmax($sizes$rowHeight, max-content)",alignItems:"center",color:"$highlight2",[`${di} > &`]:{"&:first-of-type":{marginTop:"$rowGap"},"&:last-of-type":{marginBottom:"$rowGap"}},"&:hover,&:focus-within":{color:"$highlight3"}}),gi=T(hi,{gridTemplateColumns:"auto $sizes$controlWidth",columnGap:"$colGap"}),dl=T({$flex:"",height:"100%",position:"relative",overflow:"hidden","& > div":{marginLeft:"$colGap",padding:"0 $xs",opacity:.4},"& > div:hover":{opacity:.8},"& > div > svg":{display:"none",cursor:"pointer",width:13,minWidth:13,height:13,backgroundColor:"$elevation2"},"&:hover > div > svg":{display:"block"},variants:{align:{top:{height:"100%",alignItems:"flex-start",paddingTop:"$sm"}}}}),hl=T({$reset:"",height:0,width:0,opacity:0,margin:0,"& + label":{position:"relative",$flexCenter:"",height:"100%",userSelect:"none",cursor:"pointer",paddingLeft:2,paddingRight:"$sm",pointerEvents:"auto"},"& + label:after":{content:'""',width:6,height:6,backgroundColor:"$elevation3",borderRadius:"50%",$activeStyle:""},"&:focus + label:after":{$focusStyle:""},"& + label:active:after":{backgroundColor:"$accent1",$focusStyle:""},"&:checked + label:after":{backgroundColor:"$accent1"}}),gl=T({opacity:1,variants:{disabled:{true:{opacity:.6,pointerEvents:"none"}}}});T({fontWeight:"$label",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap","& > svg":{display:"block"}});const vl=T({position:"fixed",top:0,bottom:0,right:0,left:0,zIndex:1e3,userSelect:"none"});T({background:"$toolTipBackground",fontFamily:"$sans",fontSize:"$toolTip",padding:"$xs $sm",color:"$toolTipText",borderRadius:"$xs",boxShadow:"$level2",maxWidth:260});T({fill:"$toolTipBackground"});const pl=P('<input type="checkbox">'),Pn=P("<label></label>"),jr=P("<div></div>"),ml=P('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"></path><path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"></path></svg>'),yl=P('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path><path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>');function bl(){const{id:e,disable:t,disabled:n}=se();return[(()=>{const r=pl.cloneNode(!0);return r.addEventListener("change",()=>t(!n)),pe(r,"id",e+"__disable"),r.checked=!n,_(()=>r.className=hl()),r})(),(()=>{const r=Pn.cloneNode(!0);return pe(r,"for",e+"__disable"),r})()]}function xl(e){const{id:t,optional:n,hint:r}=se();return e.htmlFor,[n&&v(bl,{}),r!==void 0?(()=>{const o=Pn.cloneNode(!0);return Ue(o,e,!1,!1),o})():(()=>{const o=Pn.cloneNode(!0);return Ue(o,e,!1,!1),o})()]}function Ae(e){const{value:t,label:n,key:r}=se(),{hideCopyButton:o}=Pa(),i=!o&&r!==void 0,[s,a]=I(!1),l=async()=>{try{await navigator.clipboard.writeText(JSON.stringify({[r]:t??""})),a(!0)}catch{Ne(me.CLIPBOARD_ERROR,{[r]:t})}};return(()=>{const c=jr.cloneNode(!0);return c.addEventListener("pointerleave",()=>a(!1)),k(c,v(xl,e),null),k(c,i&&(()=>{const u=jr.cloneNode(!0);return pe(u,"title",`Click to copy ${typeof n=="string"?n:r} value`),k(u,(()=>{const d=nt(()=>!s(),!0);return()=>d()?(()=>{const f=ml.cloneNode(!0);return f.$$click=l,f})():yl.cloneNode(!0)})()),u})(),null),_(()=>c.className=dl({align:e.align})),c})()}Pe(["click"]);const wl=P('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9 5"><path d="M3.8 4.4c.4.3 1 .3 1.4 0L8 1.7A1 1 0 007.4 0H1.6a1 1 0 00-.7 1.7l3 2.7z"></path></svg>'),$l=T({fill:"currentColor",width:"1em",height:"1em",transition:"transform 350ms ease, fill 250ms ease"});function Qn(e){return(()=>{const t=wl.cloneNode(!0);return Ue(t,e,!0,!0),_(n=>{const r=$l(),o="rotate("+(e.toggled?"0deg":"-90deg")+")";return r!==n._v$&&pe(t,"class",n._v$=r),o!==n._v$2&&t.style.setProperty("transform",n._v$2=o),n},{_v$:void 0,_v$2:void 0}),t})()}const Vr=P("<div></div>");function Te(e){return v(Ce,{get when(){return!e.input},get fallback(){return(()=>{const t=Vr.cloneNode(!0);return k(t,()=>e.children),_(()=>t.className=gi()),t})()},get children(){const t=Vr.cloneNode(!0);return k(t,()=>e.children),_(()=>t.className=hi()),t}})}const _l=T({variants:{hasRange:{true:{position:"relative",display:"grid",gridTemplateColumns:"auto $sizes$numberInputMinWidth",columnGap:"$colGap",alignItems:"center"}}}}),vi=T({position:"relative",width:"100%",height:2,borderRadius:"$xs",backgroundColor:"$elevation1"}),Tn=T({position:"absolute",width:"$scrubberWidth",height:"$scrubberHeight",borderRadius:"$xs",boxShadow:"0 0 0 2px $colors$elevation2",backgroundColor:"$accent2",cursor:"pointer",$active:"none $accent1",$hover:"none $accent3",variants:{position:{left:{borderTopRightRadius:0,borderBottomRightRadius:0,transform:"translateX(calc(-0.5 * ($sizes$scrubberWidth + 4px)))"},right:{borderTopLeftRadius:0,borderBottomLeftRadius:0,transform:"translateX(calc(0.5 * ($sizes$scrubberWidth + 4px)))"}}}}),pi=T({position:"relative",$flex:"",height:"100%",cursor:"pointer",touchAction:"none"}),mi=T({position:"absolute",height:"100%",backgroundColor:"$accent2"});function Sl(e,t,n){return Math.max(t,Math.min(e,n))}const te={toVector(e,t){return e===void 0&&(e=t),Array.isArray(e)?e:[e,e]},add(e,t){return[e[0]+t[0],e[1]+t[1]]},sub(e,t){return[e[0]-t[0],e[1]-t[1]]},addTo(e,t){e[0]+=t[0],e[1]+=t[1]},subTo(e,t){e[0]-=t[0],e[1]-=t[1]}};function zr(e,t,n){return t===0||Math.abs(t)===1/0?Math.pow(e,n*5):e*t*n/(t+n*e)}function Gr(e,t,n,r=.15){return r===0?Sl(e,t,n):e<t?-zr(t-e,n-t,r)+t:e>n?+zr(e-n,n-t,r)+n:e}function kl(e,[t,n],[r,o]){const[[i,s],[a,l]]=e;return[Gr(t,i,s,r),Gr(n,a,l,o)]}function re(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function Ur(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),n.push.apply(n,r)}return n}function K(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?Ur(Object(n),!0).forEach(function(r){re(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Ur(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}const yi={pointer:{start:"down",change:"move",end:"up"},mouse:{start:"down",change:"move",end:"up"},touch:{start:"start",change:"move",end:"end"},gesture:{start:"start",change:"change",end:"end"}};function Wr(e){return e?e[0].toUpperCase()+e.slice(1):""}function Cl(e,t="",n=!1){const r=yi[e],o=r&&r[t]||t;return"on"+Wr(e)+Wr(o)+(n?"Capture":"")}function Pl(e,t=""){const n=yi[e],r=n&&n[t]||t;return e+r}function er(e){return"touches"in e}function Tl(e){return Array.from(e.touches).filter(t=>{var n,r;return t.target===e.currentTarget||((n=e.currentTarget)===null||n===void 0||(r=n.contains)===null||r===void 0?void 0:r.call(n,t.target))})}function El(e){return e.type==="touchend"?e.changedTouches:e.targetTouches}function bi(e){return er(e)?El(e)[0]:e}function Ol(e){return Tl(e).map(t=>t.identifier)}function fn(e){const t=bi(e);return er(e)?t.identifier:t.pointerId}function Hr(e){const t=bi(e);return[t.clientX,t.clientY]}function Rl(e){const t={};if("buttons"in e&&(t.buttons=e.buttons),"shiftKey"in e){const{shiftKey:n,altKey:r,metaKey:o,ctrlKey:i}=e;Object.assign(t,{shiftKey:n,altKey:r,metaKey:o,ctrlKey:i})}return t}function Jt(e,...t){return typeof e=="function"?e(...t):e}function Nl(){}function Ll(...e){return e.length===0?Nl:e.length===1?e[0]:function(){let t;for(const n of e)t=n.apply(this,arguments)||t;return t}}function Fr(e,t){return Object.assign({},t,e||{})}const Al=32;class Dl{constructor(t,n,r){this.ctrl=t,this.args=n,this.key=r,this.state||(this.state={},this.computeValues([0,0]),this.computeInitial(),this.init&&this.init(),this.reset())}get state(){return this.ctrl.state[this.key]}set state(t){this.ctrl.state[this.key]=t}get shared(){return this.ctrl.state.shared}get eventStore(){return this.ctrl.gestureEventStores[this.key]}get timeoutStore(){return this.ctrl.gestureTimeoutStores[this.key]}get config(){return this.ctrl.config[this.key]}get sharedConfig(){return this.ctrl.config.shared}get handler(){return this.ctrl.handlers[this.key]}reset(){const{state:t,shared:n,ingKey:r,args:o}=this;n[r]=t._active=t.active=t._blocked=t._force=!1,t._step=[!1,!1],t.intentional=!1,t._movement=[0,0],t._distance=[0,0],t._delta=[0,0],t._bounds=[[-1/0,1/0],[-1/0,1/0]],t.args=o,t.axis=void 0,t.memo=void 0,t.elapsedTime=0,t.direction=[0,0],t.distance=[0,0],t.velocity=[0,0],t.movement=[0,0],t.delta=[0,0],t.timeStamp=0}start(t){const n=this.state,r=this.config;n._active||(this.reset(),this.computeInitial(),n._active=!0,n.target=t.target,n.currentTarget=t.currentTarget,n.lastOffset=r.from?Jt(r.from,n):n.offset,n.offset=n.lastOffset),n.startTime=n.timeStamp=t.timeStamp}computeValues(t){const n=this.state;n._values=t,n.values=this.config.transform(t)}computeInitial(){const t=this.state;t._initial=t._values,t.initial=t.values}compute(t){const{state:n,config:r,shared:o}=this;n.args=this.args;let i=0;if(t&&(n.event=t,r.preventDefault&&t.cancelable&&n.event.preventDefault(),n.type=t.type,o.touches=this.ctrl.pointerIds.size||this.ctrl.touchIds.size,o.locked=!!document.pointerLockElement,Object.assign(o,Rl(t)),o.down=o.pressed=o.buttons%2===1||o.touches>0,i=t.timeStamp-n.timeStamp,n.timeStamp=t.timeStamp,n.elapsedTime=n.timeStamp-n.startTime),n._active){const g=n._delta.map(Math.abs);te.addTo(n._distance,g)}const[s,a]=n._movement,[l,c]=r.threshold,{_step:u,values:d}=n;if(r.hasCustomTransform?(u[0]===!1&&(u[0]=Math.abs(s)>=l&&d[0]),u[1]===!1&&(u[1]=Math.abs(a)>=c&&d[1])):(u[0]===!1&&(u[0]=Math.abs(s)>=l&&Math.sign(s)*l),u[1]===!1&&(u[1]=Math.abs(a)>=c&&Math.sign(a)*c)),n.intentional=u[0]!==!1||u[1]!==!1,!n.intentional)return;const f=[0,0];if(r.hasCustomTransform){const[g,m]=d;f[0]=u[0]!==!1?g-u[0]:0,f[1]=u[1]!==!1?m-u[1]:0}else f[0]=u[0]!==!1?s-u[0]:0,f[1]=u[1]!==!1?a-u[1]:0;if(this.intent&&this.intent(f),(n._active&&!n._blocked||n.active)&&(n.first=n._active&&!n.active,n.last=!n._active&&n.active,n.active=o[this.ingKey]=n._active,t)){n.first&&("bounds"in r&&(n._bounds=Jt(r.bounds,n)),this.setup&&this.setup()),n.movement=f;const g=n.offset;if(this.computeOffset(),!n.last||i>Al){n.delta=te.sub(n.offset,g);const m=n.delta.map(Math.abs);te.addTo(n.distance,m),n.direction=n.delta.map(Math.sign),!n.first&&i>0&&(n.velocity=[m[0]/i,m[1]/i])}}const h=n._active?r.rubberband||[0,0]:[0,0];n.offset=kl(n._bounds,n.offset,h),this.computeMovement()}emit(){const t=this.state,n=this.shared,r=this.config;if(t._active||this.clean(),(t._blocked||!t.intentional)&&!t._force&&!r.triggerAllEvents)return;const o=this.handler(K(K(K({},n),t),{},{[this.aliasKey]:t.values}));o!==void 0&&(t.memo=o)}clean(){this.eventStore.clean(),this.timeoutStore.clean()}}function Il([e,t]){const n=Math.abs(e)-Math.abs(t);if(n>0)return"x";if(n<0)return"y"}function Ml(e,t){switch(t){case"x":e[1]=0;break;case"y":e[0]=0;break}}class Bl extends Dl{constructor(...t){super(...t),re(this,"aliasKey","xy")}reset(){super.reset(),this.state.axis=void 0}init(){this.state.offset=[0,0],this.state.lastOffset=[0,0]}computeOffset(){this.state.offset=te.add(this.state.lastOffset,this.state.movement)}computeMovement(){this.state.movement=te.sub(this.state.offset,this.state.lastOffset)}intent(t){this.state.axis=this.state.axis||Il(t),this.state._blocked=(this.config.lockDirection||!!this.config.axis)&&!this.state.axis||!!this.config.axis&&this.config.axis!==this.state.axis,!this.state._blocked&&(this.config.axis||this.config.lockDirection)&&Ml(t,this.state.axis)}}const jl=e=>e,Kr=.15,xi={enabled(e=!0){return e},preventDefault(e=!1){return e},triggerAllEvents(e=!1){return e},rubberband(e=0){switch(e){case!0:return[Kr,Kr];case!1:return[0,0];default:return te.toVector(e)}},from(e){if(typeof e=="function")return e;if(e!=null)return te.toVector(e)},transform(e,t,n){const r=e||n.shared.transform;return this.hasCustomTransform=!!r,r||jl},threshold(e){return te.toVector(e,0)}},kt=K(K({},xi),{},{axis(e,t,{axis:n}){if(this.lockDirection=n==="lock",!this.lockDirection)return n},bounds(e={}){if(typeof e=="function")return i=>kt.bounds(e(i));if("current"in e)return()=>e.current;if(typeof HTMLElement=="function"&&e instanceof HTMLElement)return e;const{left:t=-1/0,right:n=1/0,top:r=-1/0,bottom:o=1/0}=e;return[[t,n],[r,o]]}}),Lt=10,qr={ArrowRight:(e=1)=>[Lt*e,0],ArrowLeft:(e=1)=>[-Lt*e,0],ArrowUp:(e=1)=>[0,-Lt*e],ArrowDown:(e=1)=>[0,Lt*e]};class Vl extends Bl{constructor(...t){super(...t),re(this,"ingKey","dragging")}reset(){super.reset();const t=this.state;t._pointerId=void 0,t._pointerActive=!1,t._keyboardActive=!1,t._preventScroll=!1,t._delayed=!1,t.swipe=[0,0],t.tap=!1,t.canceled=!1,t.cancel=this.cancel.bind(this)}setup(){const t=this.state;if(t._bounds instanceof HTMLElement){const n=t._bounds.getBoundingClientRect(),r=t.currentTarget.getBoundingClientRect(),o={left:n.left-r.left+t.offset[0],right:n.right-r.right+t.offset[0],top:n.top-r.top+t.offset[1],bottom:n.bottom-r.bottom+t.offset[1]};t._bounds=kt.bounds(o)}}cancel(){const t=this.state;t.canceled||(t.canceled=!0,t._active=!1,setTimeout(()=>{this.compute(),this.emit()},0))}setActive(){this.state._active=this.state._pointerActive||this.state._keyboardActive}clean(){this.pointerClean(),this.state._pointerActive=!1,this.state._keyboardActive=!1,super.clean()}pointerDown(t){const n=this.config,r=this.state;t.buttons!=null&&(Array.isArray(n.pointerButtons)?!n.pointerButtons.includes(t.buttons):n.pointerButtons!==-1&&n.pointerButtons!==t.buttons)||(this.ctrl.setEventIds(t),n.pointerCapture&&t.target.setPointerCapture(t.pointerId),!r._pointerActive&&(this.start(t),this.setupPointer(t),r._pointerId=fn(t),r._pointerActive=!0,this.computeValues(Hr(t)),this.computeInitial(),n.preventScroll?this.setupScrollPrevention(t):n.delay>0?this.setupDelayTrigger(t):this.startPointerDrag(t)))}startPointerDrag(t){const n=this.state;n._active=!0,n._preventScroll=!0,n._delayed=!1,this.compute(t),this.emit()}pointerMove(t){const n=this.state,r=this.config;if(!n._pointerActive||n.type===t.type&&t.timeStamp===n.timeStamp)return;const o=fn(t);if(n._pointerId&&o!==n._pointerId)return;const i=Hr(t);if(document.pointerLockElement===t.target?n._delta=[t.movementX,t.movementY]:(n._delta=te.sub(i,n._values),this.computeValues(i)),te.addTo(n._movement,n._delta),this.compute(t),n._delayed){this.timeoutStore.remove("dragDelay"),n.active=!1,this.startPointerDrag(t);return}if(r.preventScroll&&!n._preventScroll)if(n.axis)if(n.axis===r.preventScrollAxis||r.preventScrollAxis==="xy"){n._active=!1,this.clean();return}else{this.timeoutStore.remove("startPointerDrag"),this.startPointerDrag(t);return}else return;this.emit()}pointerUp(t){this.ctrl.setEventIds(t);try{this.config.pointerCapture&&t.target.hasPointerCapture(t.pointerId)&&t.target.releasePointerCapture(t.pointerId)}catch{}const n=this.state,r=this.config;if(!n._pointerActive)return;const o=fn(t);if(n._pointerId&&o!==n._pointerId)return;this.state._pointerActive=!1,this.setActive(),this.compute(t);const[i,s]=n._distance;if(n.tap=i<=3&&s<=3,n.tap&&r.filterTaps)n._force=!0;else{const[a,l]=n.direction,[c,u]=n.velocity,[d,f]=n.movement,[h,g]=r.swipe.velocity,[m,y]=r.swipe.distance,w=r.swipe.duration;n.elapsedTime<w&&(Math.abs(c)>h&&Math.abs(d)>m&&(n.swipe[0]=a),Math.abs(u)>g&&Math.abs(f)>y&&(n.swipe[1]=l))}this.emit()}pointerClick(t){this.state.tap||(t.preventDefault(),t.stopPropagation())}setupPointer(t){const n=this.config;let r=n.device;n.pointerLock&&t.currentTarget.requestPointerLock(),n.pointerCapture||(this.eventStore.add(this.sharedConfig.window,r,"change",this.pointerMove.bind(this)),this.eventStore.add(this.sharedConfig.window,r,"end",this.pointerUp.bind(this)))}pointerClean(){this.config.pointerLock&&document.pointerLockElement===this.state.currentTarget&&document.exitPointerLock()}preventScroll(t){this.state._preventScroll&&t.cancelable&&t.preventDefault()}setupScrollPrevention(t){zl(t),this.eventStore.add(this.sharedConfig.window,"touch","change",this.preventScroll.bind(this),{passive:!1}),this.eventStore.add(this.sharedConfig.window,"touch","end",this.clean.bind(this),{passive:!1}),this.eventStore.add(this.sharedConfig.window,"touch","cancel",this.clean.bind(this),{passive:!1}),this.timeoutStore.add("startPointerDrag",this.startPointerDrag.bind(this),this.config.preventScroll,t)}setupDelayTrigger(t){this.state._delayed=!0,this.timeoutStore.add("dragDelay",this.startPointerDrag.bind(this),this.config.delay,t)}keyDown(t){const n=qr[t.key];if(n){const r=this.state,o=t.shiftKey?10:t.altKey?.1:1;r._delta=n(o),this.start(t),r._keyboardActive=!0,te.addTo(r._movement,r._delta),this.compute(t),this.emit()}}keyUp(t){t.key in qr&&(this.state._keyboardActive=!1,this.setActive(),this.compute(t),this.emit())}bind(t){const n=this.config.device;t(n,"start",this.pointerDown.bind(this)),this.config.pointerCapture&&(t(n,"change",this.pointerMove.bind(this)),t(n,"end",this.pointerUp.bind(this)),t(n,"cancel",this.pointerUp.bind(this))),t("key","down",this.keyDown.bind(this)),t("key","up",this.keyUp.bind(this)),this.config.filterTaps&&t("click","",this.pointerClick.bind(this),{capture:!0})}}function zl(e){"persist"in e&&typeof e.persist=="function"&&e.persist()}const Ct=typeof window<"u"&&window.document&&window.document.createElement;function wi(){return Ct&&"ontouchstart"in window}function Gl(){return wi()||Ct&&window.navigator.maxTouchPoints>1}function Ul(){return Ct&&"onpointerdown"in window}function Wl(){return Ct&&"exitPointerLock"in window.document}function Hl(){try{return"constructor"in GestureEvent}catch{return!1}}const he={isBrowser:Ct,gesture:Hl(),touch:wi(),touchscreen:Gl(),pointer:Ul(),pointerLock:Wl()},Fl=250,Kl=180,ql=.5,Yl=50,Xl=250,Jl=K(K({},kt),{},{pointerLock(e,t,{pointer:{lock:n=!1,touch:r=!1}={}}){return this.useTouch=he.touch&&r,he.pointerLock&&n},device(e,t){return this.useTouch?"touch":this.pointerLock?"mouse":he.pointer?"pointer":he.touch?"touch":"mouse"},preventScroll(e=!1,t,{preventScrollAxis:n="y"}){return n&&(this.preventScrollAxis=n),he.touchscreen?typeof e=="number"?e:e?Fl:!1:!1},pointerCapture(e,t,{pointer:{capture:n=!0,buttons:r=1}={}}){return this.pointerButtons=r,!this.pointerLock&&this.device==="pointer"&&n},threshold(e,t,{filterTaps:n=!1,axis:r=void 0}){const o=te.toVector(e,n?3:r?1:0);return this.filterTaps=n,o},swipe({velocity:e=ql,distance:t=Yl,duration:n=Xl}={}){return{velocity:this.transform(te.toVector(e)),distance:this.transform(te.toVector(t)),duration:n}},delay(e=0){switch(e){case!0:return Kl;case!1:return 0;default:return e}}});K(K({},xi),{},{useTouch(e,t,{pointer:{touch:n=!1}={}}){return he.touch&&n},device(e,t,n){if(n.shared.target&&!he.touch&&he.gesture)return"gesture";if(this.useTouch)return"touch";if(he.touchscreen){if(he.pointer)return"pointer";if(he.touch)return"touch"}},bounds(e,t,{scaleBounds:n={},angleBounds:r={}}){const o=s=>{const a=Fr(Jt(n,s),{min:-1/0,max:1/0});return[a.min,a.max]},i=s=>{const a=Fr(Jt(r,s),{min:-1/0,max:1/0});return[a.min,a.max]};return typeof n!="function"&&typeof r!="function"?[o(),i()]:s=>[o(s),i(s)]},threshold(e,t,n){return this.lockDirection=n.axis==="lock",te.toVector(e,this.lockDirection?[.1,3]:0)}});K(K({},kt),{},{mouseOnly:(e=!0)=>e});K(K({},kt),{},{mouseOnly:(e=!0)=>e});const $i=new Map,En=new Map;function Zl(e){$i.set(e.key,e.engine),En.set(e.key,e.resolver)}const Ql={key:"drag",engine:Vl,resolver:Jl};function ec(e,t){if(e==null)return{};var n={},r=Object.keys(e),o,i;for(i=0;i<r.length;i++)o=r[i],!(t.indexOf(o)>=0)&&(n[o]=e[o]);return n}function tc(e,t){if(e==null)return{};var n=ec(e,t),r,o;if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)r=i[o],!(t.indexOf(r)>=0)&&(!Object.prototype.propertyIsEnumerable.call(e,r)||(n[r]=e[r]))}return n}const nc={target(e){if(e)return()=>"current"in e?e.current:e},enabled(e=!0){return e},window(e=he.isBrowser?window:void 0){return e},eventOptions({passive:e=!0,capture:t=!1}={}){return{passive:e,capture:t}},transform(e){return e}},rc=["target","eventOptions","window","enabled","transform"];function Mt(e={},t){const n={};for(const[r,o]of Object.entries(t))switch(typeof o){case"function":n[r]=o.call(n,e[r],r,e);break;case"object":n[r]=Mt(e[r],o);break;case"boolean":o&&(n[r]=e[r]);break}return n}function oc(e,t){const n=e,{target:r,eventOptions:o,window:i,enabled:s,transform:a}=n,l=tc(n,rc),c={shared:Mt({target:r,eventOptions:o,window:i,enabled:s,transform:a},nc)};if(t){const u=En.get(t);c[t]=Mt(K({shared:c.shared},l),u)}else for(const u in l){const d=En.get(u);d&&(c[u]=Mt(K({shared:c.shared},l[u]),d))}return c}class _i{constructor(t){re(this,"_listeners",[]),this._ctrl=t}add(t,n,r,o,i){const s=Pl(n,r),a=K(K({},this._ctrl.config.shared.eventOptions),i);t.addEventListener(s,o,a),this._listeners.push(()=>t.removeEventListener(s,o,a))}clean(){this._listeners.forEach(t=>t()),this._listeners=[]}}class ic{constructor(){re(this,"_timeouts",new Map)}add(t,n,r=140,...o){this.remove(t),this._timeouts.set(t,window.setTimeout(n,r,...o))}remove(t){const n=this._timeouts.get(t);n&&window.clearTimeout(n)}clean(){this._timeouts.forEach(t=>void window.clearTimeout(t)),this._timeouts.clear()}}class sc{constructor(t){re(this,"gestures",new Set),re(this,"_targetEventStore",new _i(this)),re(this,"gestureEventStores",{}),re(this,"gestureTimeoutStores",{}),re(this,"handlers",{}),re(this,"config",{}),re(this,"pointerIds",new Set),re(this,"touchIds",new Set),re(this,"state",{shared:{shiftKey:!1,metaKey:!1,ctrlKey:!1,altKey:!1}}),ac(this,t)}setEventIds(t){er(t)?this.touchIds=new Set(Ol(t)):"pointerId"in t&&(t.type==="pointerup"||t.type==="pointercancel"?this.pointerIds.delete(t.pointerId):t.type==="pointerdown"&&this.pointerIds.add(t.pointerId))}applyHandlers(t,n){this.handlers=t,this.nativeHandlers=n}applyConfig(t,n){this.config=oc(t,n)}clean(){this._targetEventStore.clean();for(const t of this.gestures)this.gestureEventStores[t].clean(),this.gestureTimeoutStores[t].clean()}effect(){return this.config.shared.target&&this.bind(),()=>this._targetEventStore.clean()}bind(...t){const n=this.config.shared,r=n.eventOptions,o={};let i;if(n.target&&(i=n.target(),!i))return;const s=lc(o,r,!!i);if(n.enabled){for(const a of this.gestures)if(this.config[a].enabled){const l=$i.get(a);new l(this,t,a).bind(s)}for(const a in this.nativeHandlers)s(a,"",l=>this.nativeHandlers[a](K(K({},this.state.shared),{},{event:l,args:t})),void 0,!0)}for(const a in o)o[a]=Ll(...o[a]);if(!i)return o;for(const a in o){let l=a.substr(2).toLowerCase();const c=!!~l.indexOf("capture"),u=!!~l.indexOf("passive");(c||u)&&(l=l.replace(/capture|passive/g,"")),this._targetEventStore.add(i,l,"",o[a],{capture:c,passive:u})}}}function Ze(e,t){e.gestures.add(t),e.gestureEventStores[t]=new _i(e),e.gestureTimeoutStores[t]=new ic}function ac(e,t){t.drag&&Ze(e,"drag"),t.wheel&&Ze(e,"wheel"),t.scroll&&Ze(e,"scroll"),t.move&&Ze(e,"move"),t.pinch&&Ze(e,"pinch"),t.hover&&Ze(e,"hover")}const lc=(e,t,n)=>(r,o,i,s={},a=!1)=>{var l,c;const u=(l=s.capture)!==null&&l!==void 0?l:t.capture,d=(c=s.passive)!==null&&c!==void 0?c:t.passive;let f=a?r:Cl(r,o,u);n&&d&&(f+="Passive"),e[f]=e[f]||[],e[f].push(i)};function cc(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function Yr(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),n.push.apply(n,r)}return n}function Xr(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?Yr(Object(n),!0).forEach(function(r){cc(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Yr(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}const Si=function(t,n,r,o,i){this._gestureKey=o,this._ctrl=new sc(n),this._ctrl.applyHandlers(n,i),this._ctrl.applyConfig(Xr(Xr({},r),{},{target:t}),this._gestureKey),this._ctrl.effect()};Si.prototype.destroy=function(){this._ctrl.clean()};const Pt=function(t,n,r={}){return Zl(Ql),new Si(t,{drag:n},r,"drag")},uc=P("<div><div><div></div></div><div></div></div>");function fc(e){let t,n,r;const o=it("sizes","scrubberWidth");return B(()=>{new Pt(n,({event:i,first:s,xy:[a],movement:[l],memo:c})=>{if(s){const{width:d,left:f}=t.getBoundingClientRect();r=d-parseFloat(o),c=i?.target===n?e.value:Yt((a-f)/d,e.min,e.max)}const u=c+Yt(l/r,0,e.max-e.min);return e.onDrag(oi(u,{step:e.step,initialValue:e.initialValue})),c})}),(()=>{const i=uc.cloneNode(!0),s=i.firstChild,a=s.firstChild,l=s.nextSibling,c=t;typeof c=="function"?c(i):t=i,a.style.setProperty("left","0");const u=n;return typeof u=="function"?u(l):n=l,l.style.setProperty("touch-action","none"),_(d=>{const f=pi(),h=vi(),g=mi(),m=`${(1-qt(e.value,e.min,e.max))*100}%`,y=Tn(),w=`calc(${qt(e.value,e.min,e.max)} * (100% - ${o}))`;return f!==d._v$&&(i.className=d._v$=f),h!==d._v$2&&(s.className=d._v$2=h),g!==d._v$3&&(a.className=d._v$3=g),m!==d._v$4&&a.style.setProperty("right",d._v$4=m),y!==d._v$5&&(l.className=d._v$5=y),w!==d._v$6&&l.style.setProperty("left",d._v$6=w),d},{_v$:void 0,_v$2:void 0,_v$3:void 0,_v$4:void 0,_v$5:void 0,_v$6:void 0}),i})()}const ki=P("<div></div>"),dc=e=>{const[t,n]=I(!1);let r;return B(()=>{new Pt(r,({active:o,delta:[i],event:s,memo:a=0})=>(n(o),a+=i/2,Math.abs(a)>=1&&(e.onUpdate(l=>parseFloat(l)+Math.floor(a)*e.step*ti(s)),a=0),a))}),(()=>{const o=ki.cloneNode(!0),i=r;return typeof i=="function"?i(o):r=o,k(o,()=>e.label.slice(0,e.innerLabelTrim)),_(s=>{const a=al({dragging:t()}),l=e.label.length>1?e.label:"";return a!==s._v$&&(o.className=s._v$=a),l!==s._v$2&&pe(o,"title",s._v$2=l),s},{_v$:void 0,_v$2:void 0}),o})()};function Ci(e){return v(ul,{get id(){return e.id},get value(){return String(e.displayValue)},get onUpdate(){return e.onUpdate},get onChange(){return e.onChange},get innerLabel(){return v(dc,{get label(){return e.label},get step(){return e.settings.step},get onUpdate(){return e.onUpdate},get innerLabelTrim(){return e.innerLabelTrim}})}})}function hc(){const e=se(),t=()=>e.settings.max!==1/0&&e.settings.min!==-1/0;return v(Te,{input:!0,get children(){return[v(Ae,{get children(){return e.label}}),(()=>{const n=ki.cloneNode(!0);return k(n,v(Ce,{get when(){return t()},get children(){return v(fc,$e({get value(){return parseFloat(e.value)},get onDrag(){return e.onUpdate}},()=>e.settings))}}),null),k(n,v(Ci,$e(e,{get id(){return e.id},label:"value",get innerLabelTrim(){return t()?0:2}})),null),_(()=>n.className=_l({hasRange:t()})),n})()]}})}const Pi=Ca,{sanitizeStep:gc}=Pi,vc=H(Pi,["sanitizeStep"]);var pc=E({component:hc},vc);const mc=(e,t)=>ie().schema({options:ie().passesAnyOf(ie().object(),ie().array())}).test(t),yc=(e,{values:t})=>{if(t.indexOf(e)<0)throw Error("Selected value doesn't match Select options");return e},bc=(e,{values:t})=>t.indexOf(e),xc=e=>{let{value:t,options:n}=e,r,o;return Array.isArray(n)?(o=n,r=n.map(i=>String(i))):(o=Object.values(n),r=Object.keys(n)),"value"in e?o.includes(t)||(r.unshift(String(t)),o.unshift(t)):t=o[0],Object.values(n).includes(t)||(n[String(t)]=t),{value:t,settings:{keys:r,values:o}}};var wc=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",schema:mc,sanitize:yc,format:bc,normalize:xc});const $c=T({$flexCenter:"",position:"relative","> svg":{pointerEvents:"none",position:"absolute",right:"$md"}}),On=T({position:"absolute",top:0,left:0,width:"100%",height:"100%",opacity:0}),_c=T("div",{display:"flex",alignItems:"center",width:"100%",height:"$rowHeight",backgroundColor:"$elevation3",borderRadius:"$sm",padding:"0 $sm",cursor:"pointer",[`${On}:focus + &`]:{$focusStyle:""},[`${On}:hover + &`]:{$hoverStyle:""}}),Sc=P("<div><select></select><div></div></div>"),kc=P("<option></option>");function Cc(e){return(()=>{const t=Sc.cloneNode(!0),n=t.firstChild,r=n.nextSibling;return n.addEventListener("change",o=>e.onUpdate(e.settings.keys[Number(o.currentTarget.value)])),k(n,v(zn,{get each(){return e.settings.keys},children:(o,i)=>(()=>{const s=kc.cloneNode(!0);return k(s,o),_(()=>s.value=i()),s})()})),k(r,()=>e.settings.keys[e.displayValue]),k(t,v(Qn,{toggled:!0}),null),_(o=>{const i=$c(),s=On(),a=e.id,l=e.displayValue,c=_c();return i!==o._v$&&(t.className=o._v$=i),s!==o._v$2&&(n.className=o._v$2=s),a!==o._v$3&&pe(n,"id",o._v$3=a),l!==o._v$4&&(n.value=o._v$4=l),c!==o._v$5&&(r.className=o._v$5=c),o},{_v$:void 0,_v$2:void 0,_v$3:void 0,_v$4:void 0,_v$5:void 0}),t})()}function Pc(){const e=se();return v(Te,{input:!0,get children(){return[v(Ae,{get children(){return e.label}}),v(Cc,e)]}})}var Tc=E({component:Pc},wc),Ec={grad:.9,turn:360,rad:360/(2*Math.PI)},Oe=function(e){return typeof e=="string"?e.length>0:typeof e=="number"},Y=function(e,t,n){return t===void 0&&(t=0),n===void 0&&(n=Math.pow(10,t)),Math.round(n*e)/n+0},ve=function(e,t,n){return t===void 0&&(t=0),n===void 0&&(n=1),e>n?n:e>t?e:t},Ti=function(e){return(e=isFinite(e)?e%360:0)>0?e:e+360},Jr=function(e){return{r:ve(e.r,0,255),g:ve(e.g,0,255),b:ve(e.b,0,255),a:ve(e.a)}},dn=function(e){return{r:Y(e.r),g:Y(e.g),b:Y(e.b),a:Y(e.a,3)}},Oc=/^#([0-9a-f]{3,8})$/i,At=function(e){var t=e.toString(16);return t.length<2?"0"+t:t},Ei=function(e){var t=e.r,n=e.g,r=e.b,o=e.a,i=Math.max(t,n,r),s=i-Math.min(t,n,r),a=s?i===t?(n-r)/s:i===n?2+(r-t)/s:4+(t-n)/s:0;return{h:60*(a<0?a+6:a),s:i?s/i*100:0,v:i/255*100,a:o}},Oi=function(e){var t=e.h,n=e.s,r=e.v,o=e.a;t=t/360*6,n/=100,r/=100;var i=Math.floor(t),s=r*(1-n),a=r*(1-(t-i)*n),l=r*(1-(1-t+i)*n),c=i%6;return{r:255*[r,a,s,s,l,r][c],g:255*[l,r,r,a,s,s][c],b:255*[s,s,l,r,r,a][c],a:o}},Zr=function(e){return{h:Ti(e.h),s:ve(e.s,0,100),l:ve(e.l,0,100),a:ve(e.a)}},Qr=function(e){return{h:Y(e.h),s:Y(e.s),l:Y(e.l),a:Y(e.a,3)}},eo=function(e){return Oi((n=(t=e).s,{h:t.h,s:(n*=((r=t.l)<50?r:100-r)/100)>0?2*n/(r+n)*100:0,v:r+n,a:t.a}));var t,n,r},pt=function(e){return{h:(t=Ei(e)).h,s:(o=(200-(n=t.s))*(r=t.v)/100)>0&&o<200?n*r/100/(o<=100?o:200-o)*100:0,l:o/2,a:t.a};var t,n,r,o},Rc=/^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s*,\s*([+-]?\d*\.?\d+)%\s*,\s*([+-]?\d*\.?\d+)%\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,Nc=/^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s+([+-]?\d*\.?\d+)%\s+([+-]?\d*\.?\d+)%\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,Lc=/^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,Ac=/^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,Rn={string:[[function(e){var t=Oc.exec(e);return t?(e=t[1]).length<=4?{r:parseInt(e[0]+e[0],16),g:parseInt(e[1]+e[1],16),b:parseInt(e[2]+e[2],16),a:e.length===4?Y(parseInt(e[3]+e[3],16)/255,2):1}:e.length===6||e.length===8?{r:parseInt(e.substr(0,2),16),g:parseInt(e.substr(2,2),16),b:parseInt(e.substr(4,2),16),a:e.length===8?Y(parseInt(e.substr(6,2),16)/255,2):1}:null:null},"hex"],[function(e){var t=Lc.exec(e)||Ac.exec(e);return t?t[2]!==t[4]||t[4]!==t[6]?null:Jr({r:Number(t[1])/(t[2]?100/255:1),g:Number(t[3])/(t[4]?100/255:1),b:Number(t[5])/(t[6]?100/255:1),a:t[7]===void 0?1:Number(t[7])/(t[8]?100:1)}):null},"rgb"],[function(e){var t=Rc.exec(e)||Nc.exec(e);if(!t)return null;var n,r,o=Zr({h:(n=t[1],r=t[2],r===void 0&&(r="deg"),Number(n)*(Ec[r]||1)),s:Number(t[3]),l:Number(t[4]),a:t[5]===void 0?1:Number(t[5])/(t[6]?100:1)});return eo(o)},"hsl"]],object:[[function(e){var t=e.r,n=e.g,r=e.b,o=e.a,i=o===void 0?1:o;return Oe(t)&&Oe(n)&&Oe(r)?Jr({r:Number(t),g:Number(n),b:Number(r),a:Number(i)}):null},"rgb"],[function(e){var t=e.h,n=e.s,r=e.l,o=e.a,i=o===void 0?1:o;if(!Oe(t)||!Oe(n)||!Oe(r))return null;var s=Zr({h:Number(t),s:Number(n),l:Number(r),a:Number(i)});return eo(s)},"hsl"],[function(e){var t=e.h,n=e.s,r=e.v,o=e.a,i=o===void 0?1:o;if(!Oe(t)||!Oe(n)||!Oe(r))return null;var s=function(a){return{h:Ti(a.h),s:ve(a.s,0,100),v:ve(a.v,0,100),a:ve(a.a)}}({h:Number(t),s:Number(n),v:Number(r),a:Number(i)});return Oi(s)},"hsv"]]},to=function(e,t){for(var n=0;n<t.length;n++){var r=t[n][0](e);if(r)return[r,t[n][1]]}return[null,void 0]},Ri=function(e){return typeof e=="string"?to(e.trim(),Rn.string):typeof e=="object"&&e!==null?to(e,Rn.object):[null,void 0]},Dc=function(e){return Ri(e)[1]},hn=function(e,t){var n=pt(e);return{h:n.h,s:ve(n.s+100*t,0,100),l:n.l,a:n.a}},gn=function(e){return(299*e.r+587*e.g+114*e.b)/1e3/255},no=function(e,t){var n=pt(e);return{h:n.h,s:n.s,l:ve(n.l+100*t,0,100),a:n.a}},Nn=function(){function e(t){this.parsed=Ri(t)[0],this.rgba=this.parsed||{r:0,g:0,b:0,a:1}}return e.prototype.isValid=function(){return this.parsed!==null},e.prototype.brightness=function(){return Y(gn(this.rgba),2)},e.prototype.isDark=function(){return gn(this.rgba)<.5},e.prototype.isLight=function(){return gn(this.rgba)>=.5},e.prototype.toHex=function(){return t=dn(this.rgba),n=t.r,r=t.g,o=t.b,s=(i=t.a)<1?At(Y(255*i)):"","#"+At(n)+At(r)+At(o)+s;var t,n,r,o,i,s},e.prototype.toRgb=function(){return dn(this.rgba)},e.prototype.toRgbString=function(){return t=dn(this.rgba),n=t.r,r=t.g,o=t.b,(i=t.a)<1?"rgba("+n+", "+r+", "+o+", "+i+")":"rgb("+n+", "+r+", "+o+")";var t,n,r,o,i},e.prototype.toHsl=function(){return Qr(pt(this.rgba))},e.prototype.toHslString=function(){return t=Qr(pt(this.rgba)),n=t.h,r=t.s,o=t.l,(i=t.a)<1?"hsla("+n+", "+r+"%, "+o+"%, "+i+")":"hsl("+n+", "+r+"%, "+o+"%)";var t,n,r,o,i},e.prototype.toHsv=function(){return t=Ei(this.rgba),{h:Y(t.h),s:Y(t.s),v:Y(t.v),a:Y(t.a,3)};var t},e.prototype.invert=function(){return le({r:255-(t=this.rgba).r,g:255-t.g,b:255-t.b,a:t.a});var t},e.prototype.saturate=function(t){return t===void 0&&(t=.1),le(hn(this.rgba,t))},e.prototype.desaturate=function(t){return t===void 0&&(t=.1),le(hn(this.rgba,-t))},e.prototype.grayscale=function(){return le(hn(this.rgba,-1))},e.prototype.lighten=function(t){return t===void 0&&(t=.1),le(no(this.rgba,t))},e.prototype.darken=function(t){return t===void 0&&(t=.1),le(no(this.rgba,-t))},e.prototype.rotate=function(t){return t===void 0&&(t=15),this.hue(this.hue()+t)},e.prototype.alpha=function(t){return typeof t=="number"?le({r:(n=this.rgba).r,g:n.g,b:n.b,a:t}):Y(this.rgba.a,3);var n},e.prototype.hue=function(t){var n=pt(this.rgba);return typeof t=="number"?le({h:t,s:n.s,l:n.l,a:n.a}):Y(n.h)},e.prototype.isEqual=function(t){return this.toHex()===le(t).toHex()},e}(),le=function(e){return e instanceof Nn?e:new Nn(e)},ro=[],Ic=function(e){e.forEach(function(t){ro.indexOf(t)<0&&(t(Nn,Rn),ro.push(t))})};function Mc(e,t){var n={white:"#ffffff",bisque:"#ffe4c4",blue:"#0000ff",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",antiquewhite:"#faebd7",aqua:"#00ffff",azure:"#f0ffff",whitesmoke:"#f5f5f5",papayawhip:"#ffefd5",plum:"#dda0dd",blanchedalmond:"#ffebcd",black:"#000000",gold:"#ffd700",goldenrod:"#daa520",gainsboro:"#dcdcdc",cornsilk:"#fff8dc",cornflowerblue:"#6495ed",burlywood:"#deb887",aquamarine:"#7fffd4",beige:"#f5f5dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkkhaki:"#bdb76b",darkgray:"#a9a9a9",darkgreen:"#006400",darkgrey:"#a9a9a9",peachpuff:"#ffdab9",darkmagenta:"#8b008b",darkred:"#8b0000",darkorchid:"#9932cc",darkorange:"#ff8c00",darkslateblue:"#483d8b",gray:"#808080",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",deeppink:"#ff1493",deepskyblue:"#00bfff",wheat:"#f5deb3",firebrick:"#b22222",floralwhite:"#fffaf0",ghostwhite:"#f8f8ff",darkviolet:"#9400d3",magenta:"#ff00ff",green:"#008000",dodgerblue:"#1e90ff",grey:"#808080",honeydew:"#f0fff0",hotpink:"#ff69b4",blueviolet:"#8a2be2",forestgreen:"#228b22",lawngreen:"#7cfc00",indianred:"#cd5c5c",indigo:"#4b0082",fuchsia:"#ff00ff",brown:"#a52a2a",maroon:"#800000",mediumblue:"#0000cd",lightcoral:"#f08080",darkturquoise:"#00ced1",lightcyan:"#e0ffff",ivory:"#fffff0",lightyellow:"#ffffe0",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",linen:"#faf0e6",mediumaquamarine:"#66cdaa",lemonchiffon:"#fffacd",lime:"#00ff00",khaki:"#f0e68c",mediumseagreen:"#3cb371",limegreen:"#32cd32",mediumspringgreen:"#00fa9a",lightskyblue:"#87cefa",lightblue:"#add8e6",midnightblue:"#191970",lightpink:"#ffb6c1",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",mintcream:"#f5fffa",lightslategray:"#778899",lightslategrey:"#778899",navajowhite:"#ffdead",navy:"#000080",mediumvioletred:"#c71585",powderblue:"#b0e0e6",palegoldenrod:"#eee8aa",oldlace:"#fdf5e6",paleturquoise:"#afeeee",mediumturquoise:"#48d1cc",mediumorchid:"#ba55d3",rebeccapurple:"#663399",lightsteelblue:"#b0c4de",mediumslateblue:"#7b68ee",thistle:"#d8bfd8",tan:"#d2b48c",orchid:"#da70d6",mediumpurple:"#9370db",purple:"#800080",pink:"#ffc0cb",skyblue:"#87ceeb",springgreen:"#00ff7f",palegreen:"#98fb98",red:"#ff0000",yellow:"#ffff00",slateblue:"#6a5acd",lavenderblush:"#fff0f5",peru:"#cd853f",palevioletred:"#db7093",violet:"#ee82ee",teal:"#008080",slategray:"#708090",slategrey:"#708090",aliceblue:"#f0f8ff",darkseagreen:"#8fbc8f",darkolivegreen:"#556b2f",greenyellow:"#adff2f",seagreen:"#2e8b57",seashell:"#fff5ee",tomato:"#ff6347",silver:"#c0c0c0",sienna:"#a0522d",lavender:"#e6e6fa",lightgreen:"#90ee90",orange:"#ffa500",orangered:"#ff4500",steelblue:"#4682b4",royalblue:"#4169e1",turquoise:"#40e0d0",yellowgreen:"#9acd32",salmon:"#fa8072",saddlebrown:"#8b4513",sandybrown:"#f4a460",rosybrown:"#bc8f8f",darksalmon:"#e9967a",lightgoldenrodyellow:"#fafad2",snow:"#fffafa",lightgrey:"#d3d3d3",lightgray:"#d3d3d3",dimgray:"#696969",dimgrey:"#696969",olivedrab:"#6b8e23",olive:"#808000"},r={};for(var o in n)r[n[o]]=o;var i={};e.prototype.toName=function(s){if(!(this.rgba.a||this.rgba.r||this.rgba.g||this.rgba.b))return"transparent";var a,l,c=r[this.toHex()];if(c)return c;if(s?.closest){var u=this.toRgb(),d=1/0,f="black";if(!i.length)for(var h in n)i[h]=new e(n[h]).toRgb();for(var g in n){var m=(a=u,l=i[g],Math.pow(a.r-l.r,2)+Math.pow(a.g-l.g,2)+Math.pow(a.b-l.b,2));m<d&&(d=m,f=g)}return f}},t.string.push([function(s){var a=s.toLowerCase(),l=a==="transparent"?"#0000":n[a];return l?new e(l).toRgb():null},"name"])}Ic([Mc]);const Bc={rgb:"toRgb",hsl:"toHsl",hsv:"toHsv",hex:"toHex"};ie.extend({color:()=>e=>le(e).isValid()});const jc=e=>ie().color().test(e);function Ni(e,{format:t,hasAlpha:n,isString:r}){const o=Bc[t]+(r&&t!=="hex"?"String":""),i=e[o]();return typeof i=="object"&&!n?ba(i,["a"]):i}const Li=(e,t)=>{const n=le(e);if(!n.isValid())throw Error("Invalid color");return Ni(n,t)},Vc=(e,t)=>Ni(le(e),ge(E({},t),{isString:!0,format:"hex"})),zc=({value:e})=>{const t=Dc(e),n=t==="name"?"hex":t,r=typeof e=="object"?"a"in e:t==="hex"&&e.length===8||/^(rgba)|(hsla)|(hsva)/.test(e),o={format:n,hasAlpha:r,isString:typeof e=="string"};return{value:Li(e,o),settings:o}};var Gc=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",schema:jc,sanitize:Li,format:Vc,normalize:zc});const Uc=T({position:"relative",boxSizing:"border-box",borderRadius:"$sm",overflow:"hidden",cursor:"pointer",height:"$rowHeight",width:"$rowHeight",backgroundColor:"#fff",backgroundImage:`url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill-opacity=".05"><path d="M8 0h8v8H8zM0 8h8v8H0z"/></svg>')`,$inputStyle:"",$hover:"",zIndex:1,variants:{active:{true:{$inputStyle:"$accent1"}}},"&::before":{content:'""',position:"absolute",top:0,bottom:0,right:0,left:0,backgroundColor:"currentColor",zIndex:1}}),Wc=T({position:"relative",display:"grid",gridTemplateColumns:"$sizes$rowHeight auto",columnGap:"$colGap",alignItems:"center"}),Hc=T({width:"$colorPickerWidth",height:"$colorPickerHeight",".react-colorful":{width:"100%",height:"100%",boxShadow:"$level2",cursor:"crosshair"},".react-colorful__saturation":{borderRadius:"$sm $sm 0 0"},".react-colorful__alpha, .react-colorful__hue":{height:10},".react-colorful__last-control":{borderRadius:"0 0 $sm $sm"},".react-colorful__pointer":{height:12,width:12}});function Ai(e){const[t,n]=I(Sr(e.type,e.value,e.settings));let r;const o=s=>n(Sr(e.type,s,e.settings)),i=s=>{try{e.setValue(s)}catch(a){const{type:l,previousValue:c}=a;if(l!=="LEVA_ERROR")throw a;o(c)}};return B(()=>{Gt(e.value,r)||o(e.value),r=e.value}),{displayValue:t,onChange:n,onUpdate:i}}function Fc(e,t){if(Object.is(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;const n=Object.keys(e);if(n.length!==Object.keys(t).length)return!1;for(let r=0;r<n.length;r++)if(!Object.prototype.hasOwnProperty.call(t,n[r])||!Object.is(e[n[r]],t[n[r]]))return!1;return!0}function Di(){const e=oe(null),t=oe({x:0,y:0});return[e,r=>{Object.assign(t.current,r),e.current&&(e.current.style.transform=`translate3d(${t.current.x}px, ${t.current.y}px, 0)`)}]}function Kc(e){const t=oe(null),n=oe(null);return{wrapperRef:t,contentRef:n}}const vn=(e,t)=>{if(!e[t])return null;const n=e[t];return H(n,["__refCount"])};function qc(e){const t=Xn(),[n,r]=I(vn(t.getData(),e)),o=c=>t.setValueAtPath(e,c,!0),i=c=>t.setSettingsAtPath(e,c),s=c=>t.disableInputAtPath(e,c),a=()=>t.emitOnEditStart(e),l=()=>t.emitOnEditEnd(e);return B(()=>{r(vn(t.getData(),e));const c=t.useStore.subscribe(u=>vn(u.data,e),u=>r(u),Fc);we(()=>c())}),[n,{set:o,setSettings:i,disable:s,storeId:t.storeId,emitOnEditStart:a,emitOnEditEnd:l}]}function Yc(e=3){let t={current:null},n={current:null};const[r,o]=I(!1),i=()=>o(!0),s=()=>o(!1);return _(()=>{if(r()){const{bottom:a,top:l,left:c}=t.current.getBoundingClientRect(),{height:u}=n.current.getBoundingClientRect(),d=a+u>window.innerHeight-40?"up":"down";n.current.style.position="fixed",n.current.style.zIndex="10000",n.current.style.left=c+"px",d==="down"?n.current.style.top=a+e+"px":n.current.style.bottom=window.innerHeight-l+e+"px"}}),{popinRef:t,wrapperRef:n,shown:r,show:i,hide:s}}const Bt=P("<div></div>");function oo(e,t){return t!=="rgb"?le(e).toRgb():e}function Xc(e){se();const{popinRef:t,wrapperRef:n,shown:r,show:o,hide:i}=Yc();let s=0;const[a,l]=I(oo(e.value,e.settings.format)),c=()=>{l(oo(e.value,e.settings.format)),o()},u=()=>{i(),window.clearTimeout(s)},d=()=>{s=window.setTimeout(u,500)};return we(()=>window.clearTimeout(s)),[(()=>{const f=Bt.cloneNode(!0);return f.$$click=()=>c(),(h=>t.current=h)(f),_(h=>{const g=Uc({active:r()}),m=e.displayValue;return g!==h._v$&&(f.className=h._v$=g),m!==h._v$2&&f.style.setProperty("color",h._v$2=m),h},{_v$:void 0,_v$2:void 0}),f})(),v(Ce,{get when(){return r()},get children(){return v(Oo,{get children(){return[(()=>{const f=Bt.cloneNode(!0);return f.addEventListener("mouseleave",h=>h.buttons===0&&d()),f.addEventListener("mouseenter",()=>window.clearTimeout(s)),(h=>n.current=h)(f),k(f,v(Un,{get component(){return e.settings.hasAlpha?ea:na},get color(){return a()},get onChange(){return e.onUpdate}})),_(()=>f.className=`${Hc()}`),f})(),(()=>{const f=Bt.cloneNode(!0);return f.$$pointerup=u,_(()=>f.className=vl()),f})()]}})}})]}function Jc(){const{value:e,displayValue:t,label:n,onChange:r,onUpdate:o,settings:i}=se();return v(Te,{input:!0,get children(){return[v(Ae,{children:n}),(()=>{const s=Bt.cloneNode(!0);return k(s,v(Xc,{value:e,displayValue:t,onChange:r,onUpdate:o,settings:i}),null),k(s,v(Zn,{value:t,onChange:r,onUpdate:o}),null),_(()=>s.className=Wc()),s})()]}})}Pe(["click","pointerup"]);var Zc=E({component:Jc},Gc);const Qc=e=>ie().string().test(e),eu=e=>{if(typeof e!="string")throw Error("Invalid string");return e};var tu=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",schema:Qc,sanitize:eu});function nu(e){return v(Zn,$e({get value(){return e.displayValue}},e))}function ru(){const{label:e,displayValue:t,onUpdate:n,onChange:r}=se();return v(Te,{input:!0,get children(){return[v(Ae,{children:e}),v(nu,{displayValue:t,onUpdate:n,onChange:r})]}})}var ou=E({component:ru},tu);const iu=e=>ie().boolean().test(e),su=e=>{if(typeof e!="boolean")throw Error("Invalid boolean");return e};var au=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",schema:iu,sanitize:su});const lu=T({position:"relative",$flex:"",height:"$rowHeight",input:{$reset:"",height:0,width:0,opacity:0,margin:0},label:{position:"relative",$flexCenter:"",userSelect:"none",cursor:"pointer",height:"$checkboxSize",width:"$checkboxSize",backgroundColor:"$elevation3",borderRadius:"$sm",$hover:""},"input:focus + label":{$focusStyle:""},"input:focus:checked + label, input:checked + label:hover":{$hoverStyle:"$accent3"},"input + label:active":{backgroundColor:"$accent1"},"input:checked + label:active":{backgroundColor:"$accent1"},"label > svg":{display:"none",width:"90%",height:"90%",stroke:"$highlight3"},"input:checked + label":{backgroundColor:"$accent2"},"input:checked + label > svg":{display:"block"}}),cu=P('<div><input type="checkbox"><label><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg></label></div>');function uu({value:e,onUpdate:t,id:n}){return(()=>{const r=cu.cloneNode(!0),o=r.firstChild,i=o.nextSibling;return o.addEventListener("change",s=>t(s.currentTarget.checked)),pe(o,"id",n),o.checked=e,pe(i,"for",n),_(()=>r.className=lu()),r})()}function fu(){const{label:e,value:t,onUpdate:n,id:r}=se();return v(Te,{input:!0,get children(){return[v(Ae,{children:e}),v(uu,{value:t,onUpdate:n,id:r})]}})}var du=E({component:fu},au);const hu=P('<svg><path d="M5 4.63601C5 3.76031 5.24219 3.1054 5.64323 2.67357C6.03934 2.24705 6.64582 1.9783 7.5014 1.9783C8.35745 1.9783 8.96306 2.24652 9.35823 2.67208C9.75838 3.10299 10 3.75708 10 4.63325V5.99999H5V4.63601ZM4 5.99999V4.63601C4 3.58148 4.29339 2.65754 4.91049 1.99307C5.53252 1.32329 6.42675 0.978302 7.5014 0.978302C8.57583 0.978302 9.46952 1.32233 10.091 1.99162C10.7076 2.65557 11 3.57896 11 4.63325V5.99999H12C12.5523 5.99999 13 6.44771 13 6.99999V13C13 13.5523 12.5523 14 12 14H3C2.44772 14 2 13.5523 2 13V6.99999C2 6.44771 2.44772 5.99999 3 5.99999H4ZM3 6.99999H12V13H3V6.99999Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>',4,!0),gu=P('<svg width="10" height="10" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"></svg>'),vu=P('<svg><path d="M9 3.63601C9 2.76044 9.24207 2.11211 9.64154 1.68623C10.0366 1.26502 10.6432 1 11.5014 1C12.4485 1 13.0839 1.30552 13.4722 1.80636C13.8031 2.23312 14 2.84313 14 3.63325H15C15 2.68242 14.7626 1.83856 14.2625 1.19361C13.6389 0.38943 12.6743 0 11.5014 0C10.4294 0 9.53523 0.337871 8.91218 1.0021C8.29351 1.66167 8 2.58135 8 3.63601V6H1C0.447715 6 0 6.44772 0 7V13C0 13.5523 0.447715 14 1 14H10C10.5523 14 11 13.5523 11 13V7C11 6.44772 10.5523 6 10 6H9V3.63601ZM1 7H10V13H1V7Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>',4,!0),pu=P("<div></div>"),mu=e=>{const n=Ai({type:"NUMBER",get value(){return e.value[e.valueKey]},get settings(){return e.settings},setValue:r=>{e.onUpdate({[e.valueKey]:ei({type:"NUMBER",value:e.value[e.valueKey],settings:e.settings},r)})}});return v(Ci,{get id(){return e.id},get label(){return e.valueKey},get value(){return e.value[e.valueKey]},get displayValue(){return n.displayValue()},get onUpdate(){return n.onUpdate},get onChange(){return n.onChange},get settings(){return e.settings},get innerLabelTrim(){return e.innerLabelTrim}})},yu=T({display:"grid",columnGap:"$colGap",gridAutoFlow:"column dense",alignItems:"center",variants:{withLock:{true:{gridTemplateColumns:"10px auto","> svg":{cursor:"pointer"}}}}});function bu(e){return(()=>{const t=gu.cloneNode(!0);return Ue(t,e,!0,!0),k(t,v(Ce,{get when(){return e.locked},get fallback(){return vu.cloneNode(!0)},get children(){return hu.cloneNode(!0)}})),t})()}const Ii=e=>{const t=se();return(()=>{const n=pu.cloneNode(!0);return k(n,v(Ce,{get when(){return e.settings.lock},get children(){return v(bu,{get locked(){return e.settings.locked},onClick:()=>t.setSettings({locked:!e.settings.locked})})}}),null),k(n,v(zn,{get each(){return Object.keys(e.value)},children:(r,o)=>v(mu,{get id(){return o()===0?t.id:`${t.id}.${r}`},valueKey:r,get value(){return e.value},get settings(){return e.settings[r]},get onUpdate(){return e.onUpdate},get innerLabelTrim(){return e.innerLabelTrim}})}),null),_(()=>n.className=yu({withLock:e.settings.lock})),n})()},Mi=(e,t)=>{const n={};let r=0,o=1/0;Object.entries(e).forEach(([i,s])=>{n[i]=ri(E({value:s},t[i])).settings,r=Math.max(r,n[i].step),o=Math.min(o,n[i].pad)});for(let i in n){const{step:s,min:a,max:l}=t[i]||{};!isFinite(s)&&(!isFinite(a)||!isFinite(l))&&(n[i].step=r,n[i].pad=o)}return n};function xu(e){const t=ie().array().length(e).every.number(),n=r=>{if(!r||typeof r!="object")return!1;const o=Object.values(r);return o.length===e&&o.every(i=>isFinite(i))};return r=>t.test(r)||n(r)}function wu(e){return Array.isArray(e)?"array":"object"}function mt(e,t,n){return wu(e)===t?e:t==="array"?Object.values(e):xa(e,n)}const $u=(e,t,n)=>{const r=mt(e,"object",t.keys);for(let s in r)r[s]=ni(r[s],t[s]);const o=Object.keys(r);let i={};if(o.length===t.keys.length)i=r;else{const s=mt(n,"object",t.keys);if(o.length===1&&t.locked){const a=o[0],l=r[a],c=s[a],u=c!==0?l/c:1;for(let d in s)d===a?i[a]=l:i[d]=s[d]*u}else i=E(E({},s),r)}return mt(i,t.format,t.keys)},_u=(e,t)=>mt(e,"object",t.keys),Su=e=>!!e&&("step"in e||"min"in e||"max"in e);function ku(e,t,n=[]){const r=t,{lock:o=!1}=r,i=H(r,["lock"]),s=Array.isArray(e)?"array":"object",a=s==="object"?Object.keys(e):n,l=mt(e,"object",a),c=Su(i)?a.reduce((d,f)=>Object.assign(d,{[f]:i}),{}):i,u=Mi(l,c);return{value:s==="array"?e:l,settings:ge(E({},u),{format:s,keys:a,lock:o,locked:!1})}}function Bi(e){return{schema:xu(e.length),normalize:t=>{var n=t,{value:r}=n,o=H(n,["value"]);return ku(r,o,e)},format:(t,n)=>_u(t,n),sanitize:(t,n,r)=>$u(t,n,r)}}function Cu(){const e=se();return v(Te,{input:!0,get children(){return[v(Ae,{get children(){return e.label}}),v(Ii,{get value(){return e.displayValue},get settings(){return e.settings},get onUpdate(){return e.onUpdate}})]}})}var Pu=E({component:Cu},Bi(["x","y","z"]));const Tu=T({$flexCenter:"",position:"relative",backgroundColor:"$elevation3",borderRadius:"$sm",cursor:"pointer",height:"$rowHeight",width:"$rowHeight",$draggable:"",$hover:"","&:active":{cursor:"none"},"&::after":{content:'""',backgroundColor:"$accent2",height:4,width:4,borderRadius:2}}),Eu=T({$flexCenter:"",width:"$joystickWidth",height:"$joystickHeight",borderRadius:"$sm",boxShadow:"$level2",position:"fixed",zIndex:1e4,overflow:"hidden",$draggable:"",transform:"translate(-50%, -50%)",variants:{isOutOfBounds:{true:{backgroundColor:"$elevation1"},false:{backgroundColor:"$elevation3"}}},"> div":{position:"absolute",$flexCenter:"",borderStyle:"solid",borderWidth:1,borderColor:"$highlight1",backgroundColor:"$elevation3",width:"80%",height:"80%","&::after,&::before":{content:'""',position:"absolute",zindex:10,backgroundColor:"$highlight1"},"&::before":{width:"100%",height:1},"&::after":{height:"100%",width:1}},"> span":{position:"relative",zindex:100,width:10,height:10,backgroundColor:"$accent2",borderRadius:"50%"}}),Ou=P("<div><div></div><span></span></div>"),Ru=P("<div></div>"),Nu=e=>{const t=oe(),n=oe(0),r=oe(0),o=oe(1),[i,s]=I(!1),[a,l]=I(!1),[c,u]=Di(),d=oe(null),f=oe(null);_(()=>{if(i()){const{top:N,left:L,width:M,height:j}=d.current.getBoundingClientRect();f.current.style.left=L+M/2+"px",f.current.style.top=N+j/2+"px"}});const{keys:[h,g],joystick:m}=e.settings,y=m==="invertY"?1:-1,{[h]:{step:w},[g]:{step:p}}=e.settings,b=it("sizes","joystickWidth"),S=it("sizes","joystickHeight"),O=parseFloat(b)*.8/2,R=parseFloat(S)*.8/2,z=wr(()=>{t.current||(l(!0),n.current&&u({x:n.current*O}),r.current&&u({y:r.current*-R}),t.current=window.setInterval(()=>{e.onUpdate(N=>{const L=w*n.current*o.current,M=y*p*r.current*o.current;return Array.isArray(N)?{[h]:N[0]+L,[g]:N[1]+M}:{[h]:N[h]+L,[g]:N[g]+M}})},16))},[O,R,e.onUpdate,u,w,p,h,g,y]),A=wr(()=>{window.clearTimeout(t.current),t.current=void 0,l(!1)});return B(()=>{function N(L){o.current=ti(L)}return window.addEventListener("keydown",N),window.addEventListener("keyup",N),()=>{window.clearTimeout(t.current),window.removeEventListener("keydown",N),window.removeEventListener("keyup",N)}}),B(()=>new Pt(d.current,({first:N,active:L,delta:[M,j],movement:[J,ce]})=>{N&&s(!0);const ue=He(J,-O,O),ae=He(ce,-R,R);n.current=Math.abs(J)>Math.abs(ue)?Math.sign(J-ue):0,r.current=Math.abs(ce)>Math.abs(ae)?Math.sign(ae-ce):0;let V=e.value[h],fe=e.value[g];L?(n.current||(V+=M*w*o.current,u({x:ue})),r.current||(fe-=y*j*p*o.current,u({y:ae})),n.current||r.current?z():A(),e.onUpdate({[h]:V,[g]:fe})):(s(!1),n.current=0,r.current=0,u({x:0,y:0}),A())})),(()=>{const N=Ru.cloneNode(!0);return(L=>d.current=L)(N),k(N,v(Ce,{get when(){return i()},get children(){return v(Oo,{get children(){const L=Ou.cloneNode(!0),M=L.firstChild,j=M.nextSibling;return(J=>f.current=J)(L),(J=>c.current=J)(j),_(()=>L.className=Eu({isOutOfBounds:a()})),L}})}})),_(()=>N.className=Tu()),N})()},Lu=P("<div></div>"),Au=T({display:"grid",columnGap:"$colGap",variants:{withJoystick:{true:{gridTemplateColumns:"$sizes$rowHeight auto"},false:{gridTemplateColumns:"auto"}}}});function Du(){const e=se();return v(Te,{input:!0,get children(){return[v(Ae,{get children(){return e.label}}),(()=>{const t=Lu.cloneNode(!0);return k(t,v(Ce,{get when(){return e.settings.joystick},get children(){return v(Nu,{get value(){return e.displayValue},get settings(){return e.settings},get onUpdate(){return e.onUpdate}})}}),null),k(t,v(Ii,{get value(){return e.displayValue},get settings(){return e.settings},get onUpdate(){return e.onUpdate}}),null),_(()=>t.className=Au({withJoystick:!!e.settings.joystick})),t})()]}})}const ji=Bi(["x","y"]),Iu=e=>{var t=e,{joystick:n=!0}=t,r=H(t,["joystick"]);const{value:o,settings:i}=ji.normalize(r);return{value:o,settings:ge(E({},i),{joystick:n})}};var Mu=ge(E({component:Du},ji),{normalize:Iu});const io=ie().number(),Bu=(e,t)=>ie().array().length(2).every.number().test(e)&&ie().schema({min:io,max:io}).test(t),Ln=e=>({min:e[0],max:e[1]}),Vi=(e,{bounds:[t,n]},r)=>{const o={min:r[0],max:r[1]},{min:i,max:s}=E(E({},o),e);return[He(Number(i),t,Math.max(t,s)),He(Number(s),Math.min(n,i),n)]},ju=({value:e,min:t,max:n})=>{const r={min:t,max:n},o=Mi(Ln(e),{min:r,max:r}),i=[t,n],s=ge(E({},o),{bounds:i});return{value:Vi(Ln(e),s,e),settings:s}};var Vu=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",schema:Bu,format:Ln,sanitize:Vi,normalize:ju});const zu=P("<div><div><div></div></div><div></div><div></div></div>"),Gu=P("<div></div>"),Uu=T({display:"grid",columnGap:"$colGap",gridTemplateColumns:"auto calc($sizes$numberInputMinWidth * 2 + $space$rowGap)"});function Wu(e){var t=e,{value:n,bounds:[r,o],onDrag:i}=t,s=H(t,["value","bounds","onDrag"]);const a=oe(null),l=oe(null),c=oe(null),u=oe(0),d=it("sizes","scrubberWidth");B(()=>{new Pt(a.current,({event:g,first:m,xy:[y],movement:[w],memo:p={}})=>{if(m){const{width:S,left:O}=a.current.getBoundingClientRect();u.current=S-parseFloat(d);const R=g?.target===l.current||g?.target===c.current;p.pos=Yt((y-O)/S,r,o);const z=Math.abs(p.pos-n.min)-Math.abs(p.pos-n.max);p.key=z<0||z===0&&p.pos<=n.min?"min":"max",R&&(p.pos=n[p.key])}const b=p.pos+Yt(w/u.current,0,o-r);return i({[p.key]:gc(b,s[p.key])}),p})});const f=`calc(${qt(n.min,r,o)} * (100% - ${d} - 8px) + 4px)`,h=`calc(${1-qt(n.max,r,o)} * (100% - ${d} - 8px) + 4px)`;return(()=>{const g=zu.cloneNode(!0),m=g.firstChild,y=m.firstChild,w=m.nextSibling,p=w.nextSibling;return(b=>a.current=b)(g),y.style.setProperty("left",f),y.style.setProperty("right",h),(b=>l.current=b)(w),w.style.setProperty("left",f),(b=>c.current=b)(p),p.style.setProperty("right",h),_(b=>{const S=pi(),O=vi(),R=mi(),z=Tn({position:"left"}),A=Tn({position:"right"});return S!==b._v$&&(g.className=b._v$=S),O!==b._v$2&&(m.className=b._v$2=O),R!==b._v$3&&(y.className=b._v$3=R),z!==b._v$4&&(w.className=b._v$4=z),A!==b._v$5&&(p.className=b._v$5=A),b},{_v$:void 0,_v$2:void 0,_v$3:void 0,_v$4:void 0,_v$5:void 0}),g})()}function Hu(){const e=se();return v(Te,{input:!0,get children(){return[v(Ae,{get children(){return e.label}}),(()=>{const t=Gu.cloneNode(!0);return k(t,v(Wu,$e({get value(){return e.displayValue}},()=>e.settings,{get onDrag(){return e.onUpdate}}))),_(()=>t.className=Uu()),t})()]}})}var Fu=E({component:Hu},Vu);const Ku=()=>{const e=new Map;return{on:(t,n)=>{let r=e.get(t);r===void 0&&(r=new Set,e.set(t,r)),r.add(n)},off:(t,n)=>{const r=e.get(t);r!==void 0&&(r.delete(n),r.size===0&&e.delete(t))},emit:(t,...n)=>{const r=e.get(t);if(r!==void 0)for(const o of r)o(...n)}}},qu=e=>(t,n,r)=>{const o=r.subscribe;return r.subscribe=(s,a,l)=>{let c=s;if(a){const u=l?.equalityFn||Object.is;let d=s(r.getState());c=f=>{const h=s(f);if(!u(d,h)){const g=d;a(d=h,g)}},l?.fireImmediately&&a(d,d)}return o(c)},e(t,n,r)},Yu=function(){const e=ra(qu(()=>({data:{}}))),t=Ku();this.useStore=e,this.storeId=pa();const n={},r=new Set;this.getVisiblePaths=()=>{const i=this.getData(),s=Object.keys(i),a=[];Object.entries(n).forEach(([c,u])=>{u.render&&s.some(d=>d.indexOf(c)===0)&&!u.render(this.get)&&a.push(c+".")});const l=[];return r.forEach(c=>{c in i&&i[c].__refCount>0&&a.every(u=>c.indexOf(u)===-1)&&(!i[c].render||i[c].render(this.get))&&l.push(c)}),l},this.setOrderedPaths=i=>{i.forEach(s=>r.add(s))},this.orderPaths=i=>(this.setOrderedPaths(i),i),this.disposePaths=i=>{e.setState(s=>{const a=s.data;return i.forEach(l=>{if(l in a){const c=a[l];c.__refCount--,c.__refCount===0&&c.type in Se&&delete a[l]}}),{data:a}})},this.dispose=()=>{e.setState(()=>({data:{}}))},this.getFolderSettings=i=>n[i]||{},this.getData=()=>e.getState().data,this.addData=(i,s)=>{e.setState(a=>{const l=a.data;return Object.entries(i).forEach(([c,u])=>{let d=l[c];if(d){const f=u,{type:h,value:g}=f,m=H(f,["type","value"]);h!==d.type?Ne(me.INPUT_TYPE_OVERRIDE,h):((d.__refCount===0||s)&&Object.assign(d,m),d.__refCount++)}else l[c]=ge(E({},u),{__refCount:1})}),{data:l}})},this.setValueAtPath=(i,s,a)=>{e.setState(l=>{const c=l.data;return Nr(c[i],s,i,this,a),{data:c}})},this.setSettingsAtPath=(i,s)=>{e.setState(a=>{const l=a.data;return l[i].settings=E(E({},l[i].settings),s),{data:l}})},this.disableInputAtPath=(i,s)=>{e.setState(a=>{const l=a.data;return l[i].disabled=s,{data:l}})},this.set=(i,s)=>{e.setState(a=>{const l=a.data;return Object.entries(i).forEach(([c,u])=>{try{Nr(l[c],u,void 0,void 0,s)}catch{}}),{data:l}})},this.getInput=i=>{try{return this.getData()[i]}catch{Ne(me.PATH_DOESNT_EXIST,i)}},this.get=i=>{var s;return(s=this.getInput(i))==null?void 0:s.value},this.emitOnEditStart=i=>{t.emit(`onEditStart:${i}`,this.get(i),i,ge(E({},this.getInput(i)),{get:this.get}))},this.emitOnEditEnd=i=>{t.emit(`onEditEnd:${i}`,this.get(i),i,ge(E({},this.getInput(i)),{get:this.get}))},this.subscribeToEditStart=(i,s)=>(t.on(`onEditStart:${i}`,s),()=>t.off(i,s)),this.subscribeToEditEnd=(i,s)=>(t.on(`onEditEnd:${i}`,s),()=>t.off(i,s));const o=(i,s,a)=>{const l={};return Object.entries(i).forEach(([c,u])=>{if(c==="")return Ne(me.EMPTY_KEY);let d=Zo(s,c);if(u.type===Se.FOLDER){const f=o(u.schema,d,a);Object.assign(l,f),d in n||(n[d]=u.settings)}else if(c in a)Ne(me.DUPLICATE_KEYS,c,d,a[c].path);else{const f=wa(u,c,d,l);if(f){const{type:h,options:g,input:m}=f,y=g,{onChange:w,transient:p,onEditStart:b,onEditEnd:S}=y,O=H(y,["onChange","transient","onEditStart","onEditEnd"]);l[d]=ge(E(E({type:h},O),m),{fromPanel:!0}),a[c]={path:d,onChange:w,transient:p,onEditStart:b,onEditEnd:S}}else Ne(me.UNKNOWN_INPUT,d,u)}}),l};this.getDataFromSchema=i=>{const s={};return[o(i,"",s),s]}},xe=new Yu,Xu={collapsed:!1};function Ju(e,t){return{type:Se.FOLDER,schema:e,settings:E(E({},Xu),t)}}/*!
 * isobject <https://github.com/jonschlinkert/isobject>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */var Zu=function(t){return t!=null&&typeof t=="object"&&Array.isArray(t)===!1};/*!
 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */var Qu=Zu;function so(e){return Qu(e)===!0&&Object.prototype.toString.call(e)==="[object Object]"}var zi=function(t){var n,r;return!(so(t)===!1||(n=t.constructor,typeof n!="function")||(r=n.prototype,so(r)===!1)||r.hasOwnProperty("isPrototypeOf")===!1)};/*!
 * is-extendable <https://github.com/jonschlinkert/is-extendable>
 *
 * Copyright (c) 2015-2017, Jon Schlinkert.
 * Released under the MIT License.
 */var ef=zi,tr=function(t){return ef(t)||typeof t=="function"||Array.isArray(t)};/*!
 * for-in <https://github.com/jonschlinkert/for-in>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */var tf=function(t,n,r){for(var o in t)if(n.call(r,t[o],o,t)===!1)break},nf=tr,rf=tf;function Gi(e,t){for(var n=arguments.length,r=0;++r<n;){var o=arguments[r];An(o)&&rf(o,of,e)}return e}function of(e,t){if(!!sf(t)){var n=this[t];An(e)&&An(n)?Gi(n,e):this[t]=e}}function An(e){return nf(e)&&!Array.isArray(e)}function sf(e){return e!=="__proto__"&&e!=="constructor"&&e!=="prototype"}var af=Gi;/*!
 * get-value <https://github.com/jonschlinkert/get-value>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */var lf=function(e,t,n,r,o){if(!cf(e)||!t)return e;if(t=Dt(t),n&&(t+="."+Dt(n)),r&&(t+="."+Dt(r)),o&&(t+="."+Dt(o)),t in e)return e[t];for(var i=t.split("."),s=i.length,a=-1;e&&++a<s;){for(var l=i[a];l[l.length-1]==="\\";)l=l.slice(0,-1)+"."+i[++a];e=e[l]}return e};function cf(e){return e!==null&&(typeof e=="object"||typeof e=="function")}function Dt(e){return e?Array.isArray(e)?e.join("."):e:""}/*!
 * assign-symbols <https://github.com/jonschlinkert/assign-symbols>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */var uf=function(e,t){if(e===null||typeof e>"u")throw new TypeError("expected first argument to be an object.");if(typeof t>"u"||typeof Symbol>"u"||typeof Object.getOwnPropertySymbols!="function")return e;for(var n=Object.prototype.propertyIsEnumerable,r=Object(e),o=arguments.length,i=0;++i<o;)for(var s=Object(arguments[i]),a=Object.getOwnPropertySymbols(s),l=0;l<a.length;l++){var c=a[l];n.call(s,c)&&(r[c]=s[c])}return r},ff=tr,df=uf,hf=Object.assign||function(e){if(e===null||typeof e>"u")throw new TypeError("Cannot convert undefined or null to object");ao(e)||(e={});for(var t=1;t<arguments.length;t++){var n=arguments[t];vf(n)&&(n=pf(n)),ao(n)&&(gf(e,n),df(e,n))}return e};function gf(e,t){for(var n in t)mf(t,n)&&(e[n]=t[n])}function vf(e){return e&&typeof e=="string"}function pf(e){var t={};for(var n in e)t[n]=e[n];return t}function ao(e){return e&&typeof e=="object"||ff(e)}function mf(e,t){return Object.prototype.hasOwnProperty.call(e,t)}/*!
 * split-string <https://github.com/jonschlinkert/split-string>
 *
 * Copyright (c) 2015-2017, Jon Schlinkert.
 * Released under the MIT License.
 */var yf=hf,bf=function(e,t,n){if(typeof e!="string")throw new TypeError("expected a string");typeof t=="function"&&(n=t,t=null),typeof t=="string"&&(t={sep:t});var r=yf({sep:"."},t),o=r.quotes||['"',"'","`"],i;r.brackets===!0?i={"<":">","(":")","[":"]","{":"}"}:r.brackets&&(i=r.brackets);var s=[],a=[],l=[""],c=r.sep,u=e.length,d=-1,f;function h(){if(i&&a.length)return i[a[a.length-1]]}for(;++d<u;){var g=e[d],m=e[d+1],y={val:g,idx:d,arr:l,str:e};if(s.push(y),g==="\\"){y.val=wf(r,e,d)===!0?g+m:m,y.escaped=!0,typeof n=="function"&&n(y),l[l.length-1]+=y.val,d++;continue}if(i&&i[g]){a.push(g);var w=h(),p=d+1;if(e.indexOf(w,p+1)!==-1)for(;a.length&&p<u;){var b=e[++p];if(b==="\\"){b++;continue}if(o.indexOf(b)!==-1){p=Dn(e,b,p+1);continue}if(w=h(),a.length&&e.indexOf(w,p+1)===-1)break;if(i[b]){a.push(b);continue}w===b&&a.pop()}if(f=p,f===-1){l[l.length-1]+=g;continue}g=e.slice(d,f+1),y.val=g,y.idx=d=f}if(o.indexOf(g)!==-1){if(f=Dn(e,g,d+1),f===-1){l[l.length-1]+=g;continue}xf(g,r)===!0?g=e.slice(d,f+1):g=e.slice(d+1,f),y.val=g,y.idx=d=f}if(typeof n=="function"&&(n(y,s),g=y.val,d=y.idx),y.val===c&&y.split!==!1){l.push("");continue}l[l.length-1]+=y.val}return l};function Dn(e,t,n,r){var o=e.indexOf(t,n);return e.charAt(o-1)==="\\"?Dn(e,t,o+1):o}function xf(e,t){return t.keepDoubleQuotes===!0&&e==='"'||t.keepSingleQuotes===!0&&e==="'"?!0:t.keepQuotes}function wf(e,t,n){return typeof e.keepEscaping=="function"?e.keepEscaping(t,n):e.keepEscaping===!0||t[n+1]==="\\"}/*!
 * is-extendable <https://github.com/jonschlinkert/is-extendable>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */var Ui=function(t){return typeof t<"u"&&t!==null&&(typeof t=="object"||typeof t=="function")},lo=Ui,$f=function(t){lo(t)||(t={});for(var n=arguments.length,r=1;r<n;r++){var o=arguments[r];lo(o)&&_f(t,o)}return t};function _f(e,t){for(var n in t)Sf(t,n)&&(e[n]=t[n])}function Sf(e,t){return Object.prototype.hasOwnProperty.call(e,t)}/*!
 * set-value <https://github.com/jonschlinkert/set-value>
 *
 * Copyright (c) 2014-2015, 2017, Jon Schlinkert.
 * Released under the MIT License.
 */var kf=bf,Cf=$f,co=zi,uo=Ui,Pf=function(e,t,n){if(!uo(e)||(Array.isArray(t)&&(t=[].concat.apply([],t).join(".")),typeof t!="string"))return e;for(var r=kf(t,{sep:".",brackets:!0}).filter(Tf),o=r.length,i=-1,s=e;++i<o;){var a=r[i];if(i!==o-1){uo(s[a])||(s[a]={}),s=s[a];continue}co(s[a])&&co(n)?s[a]=Cf({},s[a],n):s[a]=n}return e};function Tf(e){return e!=="__proto__"&&e!=="constructor"&&e!=="prototype"}var pn=tr,fo=af,Ef=lf,ho=Pf,Of=function(t,n,r){if(!pn(t))throw new TypeError("expected an object");if(typeof n!="string"||r==null)return fo.apply(null,arguments);if(typeof r=="string")return ho(t,n,r),t;var o=Ef(t,n);return pn(r)&&pn(o)&&(r=fo({},o,r)),ho(t,n,r),t};const Rf=e=>"__levaInput"in e,mn=(e,t)=>{const n={},r=t?t.toLowerCase():null;return e.forEach(o=>{const[i,s]=ma(o);(!r||i.toLowerCase().indexOf(r)>-1)&&Of(n,s,{[i]:{__levaInput:!0,path:o}})}),n},Nf=P("<div><div></div></div>");function Lf(e){return(()=>{const t=Nf.cloneNode(!0),n=t.firstChild;return t.$$click=()=>e.toggle(),k(t,v(Qn,{get toggled(){return e.toggled}}),n),k(n,()=>e.name),_(()=>t.className=fl()),t})()}Pe(["click"]);const Af=P("<div></div>");function Df(e){return v(ii.Provider,{value:e,get children(){return e.children}})}function If(e){const{displayValue:t,onChange:n,onUpdate:r}=Ai(e),o=We[e.type].component;return o?v(Df,{get value(){return e.value},get key(){return e.valueKey},get id(){return""+e.path},get displayValue(){return t()},onChange:n,onUpdate:r,get settings(){return e.settings},get setSettings(){return e.setSettings},get label(){return e.label},get children(){const i=Af.cloneNode(!0);return k(i,v(Un,{component:o})),_(()=>i.className=gl({disabled:e.disabled})),i}}):(Ne(me.NO_COMPONENT_FOR_TYPE,e.type,e.path),null)}const Mf=T("button",{display:"block",$reset:"",fontWeight:"$button",color:"$highlight3",height:"$rowHeight",borderStyle:"none",borderRadius:"$sm",backgroundColor:"$accent2",cursor:"pointer",$hover:"$accent3",$active:"$accent3 $accent1",$focus:""}),Bf=P("<button></button>");function jf(e){return v(Te,{get children(){const t=Bf.cloneNode(!0);return t.$$click=()=>e.onClick(),k(t,()=>e.label),_(()=>t.className=Mf()),t}})}Pe(["click"]);const Vf=T({$flex:"",justifyContent:"flex-end",gap:"$colGap"}),zf=T({$reset:"",cursor:"pointer",borderRadius:"$xs","&:hover":{backgroundColor:"$elevation3"}}),Gf=P("<div></div>"),Uf=P("<button></button>"),Wf=({label:e,opts:t})=>{let n=typeof e=="string"&&e.trim()===""?null:e,r=t;return typeof t.opts=="object"&&(r.label!==void 0&&(n=t.label),r=t.opts),{label:n,opts:r}};function Hf(e){const{label:t,opts:n}=Wf(e);return v(Te,{input:!!t,get children(){return[nt(()=>t&&v(Ae,{children:t})),(()=>{const r=Gf.cloneNode(!0);return k(r,()=>Object.entries(n).map(([o,i])=>(()=>{const s=Uf.cloneNode(!0);return s.$$click=()=>i(),k(s,o),_(()=>s.className=zf()),s})())),_(()=>r.className=Vf()),r})()]}})}Pe(["click"]);const Ff={[Se.BUTTON]:jf,[Se.BUTTON_GROUP]:Hf},Kf=e=>{const[t,{set:n,setSettings:r,disable:o,storeId:i,emitOnEditStart:s,emitOnEditEnd:a}]=qc(e.path);return v(is,{get children(){return[v(an,{get when(){return!t()},children:null}),v(an,{get when(){return nt(()=>t().type in Se,!0)()?t():void 0},get children(){return v(Un,$e({get component(){return Ff[t().type]},get path(){return e.path}},t))}}),v(an,{get when(){return nt(()=>t().type in We,!0)()?t():void 0},get children(){return v(If,{get type(){return t().type},get label(){return t().label},storeId:i,get path(){return e.path},get valueKey(){return t().key},setValue:n,get value(){return t().value},setSettings:r,get settings(){return t().settings},disable:o,emitOnEditStart:s,emitOnEditEnd:a,fromPanel:!0,disabled:!1,optional:!1})}})]}})},qf=P("<div></div>"),Yf=P("<div><div></div></div>"),Xf=e=>{const t=Xn(),n=Zo(e.path,e.name),{collapsed:r,color:o}=t.getFolderSettings(n),[i,s]=I(!r);let a;const l=it("colors","folderWidgetColor"),c=it("colors","folderTextColor");return B(()=>{a.style.setProperty("--leva-colors-folderWidgetColor",o||l),a.style.setProperty("--leva-colors-folderTextColor",o||c)}),(()=>{const u=qf.cloneNode(!0),d=a;return typeof d=="function"?d(u):a=u,k(u,v(Lf,{get name(){return e.name},get toggled(){return i()},toggle:()=>s(f=>!f)}),null),k(u,v(Wi,{parent:n,get tree(){return e.tree},isRoot:!1,get toggled(){return i()}}),null),_(()=>u.className=Xt({isRoot:!1})),u})()},Wi=e=>{const{wrapperRef:t,contentRef:n}=Kc();return(()=>{const r=Yf.cloneNode(!0),o=r.firstChild;return(i=>t.current=i)(r),(i=>n.current=i)(o),k(o,v(zn,{get each(){return Object.keys(e.tree)},children:i=>v(Ce,{get when(){return Rf(e.tree[i])},get fallback(){return v(Xf,{name:i,get path(){return e.parent},get tree(){return e.tree[i]}})},get children(){return v(Kf,{get key(){return e.tree[i].path},get valueKey(){return e.tree[i].valueKey},get path(){return e.tree[i].path}})}})})),_(i=>{var s;const a=Cn({isRoot:(s=e.isRoot)!=null?s:!1,fill:e.fill,flat:e.flat}),l=e.toggled?{overflow:"visible",height:"auto"}:{overflow:"hidden",height:0},c=di({isRoot:e.isRoot,toggled:e.toggled});return a!==i._v$&&(r.className=i._v$=a),i._v$2=Gn(r,l,i._v$2),c!==i._v$3&&(o.className=i._v$3=c),i},{_v$:void 0,_v$2:void 0,_v$3:void 0}),r})()},Jf=T({position:"relative",fontFamily:"$mono",fontSize:"$root",color:"$rootText",backgroundColor:"$elevation1",variants:{fill:{false:{position:"fixed",top:"10px",right:"10px",zIndex:1e3,width:"$rootWidth"},true:{position:"relative",width:"100%"}},flat:{false:{borderRadius:"$lg",boxShadow:"$level1"}},oneLineLabels:{true:{[`${gi}`]:{gridTemplateColumns:"auto",gridAutoColumns:"minmax(max-content, 1fr)",gridAutoRows:"minmax($sizes$rowHeight), auto)",rowGap:0,columnGap:0,marginTop:"$rowGap"}}},hideTitleBar:{true:{$$titleBarHeight:"0px"},false:{$$titleBarHeight:"$sizes$titleBarHeight"}}},"&,*,*:after,*:before":{boxSizing:"border-box"},"*::selection":{backgroundColor:"$accent2"}}),Hi=40,Zt=T("i",{$flexCenter:"",width:Hi,userSelect:"none",cursor:"pointer","> svg":{fill:"$highlight1",transition:"transform 350ms ease, fill 250ms ease"},"&:hover > svg":{fill:"$highlight3"},variants:{active:{true:{"> svg":{fill:"$highlight2"}}}}}),Zf=T("div",{display:"flex",alignItems:"stretch",justifyContent:"space-between",height:"$titleBarHeight",variants:{mode:{drag:{cursor:"grab"}}}}),Qf=T("div",{$flex:"",position:"relative",width:"100%",overflow:"hidden",transition:"height 250ms ease",color:"$highlight3",paddingLeft:"$md",[`> ${Zt}`]:{height:30},variants:{toggled:{true:{height:30},false:{height:0}}}}),ed=T({$reset:"",flex:1,position:"relative",height:30,width:"100%",backgroundColor:"transparent",fontSize:"10px",borderRadius:"$root","&:focus":{},"&::placeholder":{color:"$highlight2"}}),td=T("div",{$flexCenter:"",flex:1,"> svg":{fill:"$highlight1"},color:"$highlight1",variants:{drag:{true:{$draggable:"","> svg":{transition:"fill 250ms ease"},"&:hover":{color:"$highlight3"},"&:hover > svg":{fill:"$highlight3"}}},filterEnabled:{false:{paddingRight:Hi}}}}),nd=P('<input placeholder="[Open filter with CMD+SHIFT+L]">'),rd=P('<div><svg xmlns="http://www.w3.org/2000/svg" height="14" width="14" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg></div>'),od=P("<div><div></div><div></div></div>"),id=P("<div></div>"),sd=P('<svg width="20" height="10" viewBox="0 0 28 14" xmlns="http://www.w3.org/2000/svg"><circle cx="2" cy="2" r="2"></circle><circle cx="14" cy="2" r="2"></circle><circle cx="26" cy="2" r="2"></circle><circle cx="2" cy="12" r="2"></circle><circle cx="14" cy="12" r="2"></circle><circle cx="26" cy="12" r="2"></circle></svg>'),ad=P('<div><svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 20 20"><path d="M9 9a2 2 0 114 0 2 2 0 01-4 0z"></path><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a4 4 0 00-3.446 6.032l-2.261 2.26a1 1 0 101.414 1.415l2.261-2.261A4 4 0 1011 5z" clip-rule="evenodd"></path></svg></div>'),ld=e=>{const[t,n]=I(""),r=W(()=>$a(e.setFilter,50)),o=()=>{e.setFilter(""),n("")},i=s=>{const a=s.currentTarget.value;e.toggle(!0),n(a)};return B(()=>{r()(t())}),[(()=>{const s=nd.cloneNode(!0);s.$$input=i,s.$$pointerdown=l=>l.stopPropagation();const a=e.ref;return typeof a=="function"?a(s):e.ref=s,_(l=>{const c=ed(),u=t();return c!==l._v$&&(s.className=l._v$=c),u!==l._v$2&&(s.value=l._v$2=u),l},{_v$:void 0,_v$2:void 0}),s})(),(()=>{const s=rd.cloneNode(!0);return s.$$click=()=>o(),_(a=>{const l=Zt(),c=t()?"visible":"hidden";return l!==a._v$3&&(s.className=a._v$3=l),c!==a._v$4&&s.style.setProperty("visibility",a._v$4=c),a},{_v$3:void 0,_v$4:void 0}),s})()]};function cd(e){const[t,n]=I(!1);let r;B(()=>{t()?r?.focus():r?.blur()});let o;return B(()=>{new Pt(o,({offset:[i,s]})=>e.onDrag({x:i,y:s}),{filterTaps:!0})}),B(()=>{const i=s=>{s.key==="L"&&s.shiftKey&&s.metaKey&&n(a=>!a)};window.addEventListener("keydown",i),we(()=>window.removeEventListener("keydown",i))},[]),[(()=>{const i=od.cloneNode(!0),s=i.firstChild,a=s.nextSibling;s.$$click=()=>e.toggle(),k(s,v(Qn,{get toggled(){return e.toggled},width:12,height:8}));const l=o;return typeof l=="function"?l(a):o=a,k(a,(()=>{const c=nt(()=>!!(e.title===void 0&&e.drag),!0);return()=>c()?sd.cloneNode(!0):e.title})()),k(i,(()=>{const c=nt(()=>!!e.filterEnabled,!0);return()=>c()&&(()=>{const u=ad.cloneNode(!0);return u.$$click=()=>n(d=>!d),_(()=>u.className=Zt({active:t()})),u})()})(),null),_(c=>{const u=Zf({mode:e.drag?"drag":void 0}),d=Zt({active:!e.toggle}),f=td({filterEnabled:e.filterEnabled});return u!==c._v$5&&(i.className=c._v$5=u),d!==c._v$6&&(s.className=c._v$6=d),f!==c._v$7&&(a.className=c._v$7=f),c},{_v$5:void 0,_v$6:void 0,_v$7:void 0}),i})(),(()=>{const i=id.cloneNode(!0);return k(i,v(ld,{ref(s){const a=r;typeof a=="function"?a(s):r=s},get setFilter(){return e.setFilter},get toggle(){return e.toggle}})),_(()=>i.className=Qf({toggled:t()})),i})()]}Pe(["pointerdown","input","click"]);const ud=P("<div></div>");function fd(e){const t=W(()=>il(e.theme),[]),[n,r]=I(!0);return v(Ce,{get when(){return e.store},get children(){return v(si.Provider,{get value(){return t()},get children(){return v(dd,{get store(){return e.store},get toggled(){return n()},setToggle:r,get rootClass(){return t().className},flat:!1,fill:!1,titleBar:!0})}})}})}const dd=e=>{const[t,n]=I(""),[r,o]=I(mn(e.store.getVisiblePaths(),t()));B(()=>{o(mn(e.store.getVisiblePaths(),t())),e.store.useStore.subscribe(()=>{o(mn(e.store.getVisiblePaths(),t()))})});const[i,s]=Di();return v(li.Provider,{value:{hideCopyButton:!1},get children(){const a=ud.cloneNode(!0);return(l=>i.current=l)(a),a.style.setProperty("display","block"),k(a,v(Ce,{get when(){return e.titleBar},get children(){return v(cd,{onDrag:s,setFilter:n,toggle:l=>e.setToggle(c=>l??!c),get toggled(){return e.toggled},get title(){return typeof e.titleBar=="object"&&e.titleBar.title||void 0},get drag(){var l;return typeof e.titleBar=="object"&&(l=e.titleBar.drag)!=null?l:!0},get filterEnabled(){var l;return typeof e.titleBar=="object"&&(l=e.titleBar.filter)!=null?l:!0}})}}),null),k(a,v(ai.Provider,{value:xe,get children(){return v(Wi,{isRoot:!0,get fill(){return e.fill},get flat(){return e.flat},get tree(){return r()},get toggled(){return e.toggled}})}}),null),_(()=>a.className=`${Jf({fill:e.fill,flat:e.flat,oneLineLabels:e.oneLineLabels,hideTitleBar:!1})} ${e.rootClass}`),a}})};function Fi(e){var t=e,{store:n}=t,r=H(t,["store"]);const o=Xn();return v(fd,$e({store:n===void 0?o:n},r))}let go=!1,ct=null;function hd(){B(()=>{go||(ct||(ct=document.getElementById("leva__root")||Object.assign(document.createElement("div"),{id:"leva__root"}),document.body&&(document.body.appendChild(ct),ct.className="fixed top-0 right-20",To(()=>v(Fi,{store:xe}),ct))),go=!0)})}function gd(e,t,n,r,o){let i,s,a,l,c;return typeof e=="string"?(s=e,i=t,Array.isArray(n)?c=n:n&&("store"in n?(l=n,c=r):(a=n,Array.isArray(r)?c=r:(l=r,c=o)))):(i=e,Array.isArray(t)?c=t:(l=t,c=n)),{schema:i,folderName:s,folderSettings:a,hookSettings:l,deps:c||[]}}function yn(e,t,n,r){const{folderName:o,schema:i,folderSettings:s,hookSettings:a,deps:l}=gd(e,t,n,r),c=W(()=>{const w=typeof i=="function"?i():i;return o?{[o]:Ju(w,s)}:w});hd();const u=W(()=>xe.getDataFromSchema(c())),d=W(()=>{const[w,p]=u(),b=[],S=[],O={},R={},z={};return Object.values(p).forEach(({path:A,onChange:N,onEditStart:L,onEditEnd:M,transient:j})=>{b.push(A),N?(O[A]=N,j||S.push(A)):S.push(A),L&&(R[A]=L),M&&(z[A]=M)}),[b,S,O,R,z]}),f=W(()=>xe.orderPaths(d()[0])),[h,g]=I(u()[0]),[m,y]=Ko(u()[0]);return yo(()=>{let[w,p]=d(),[b]=u();xe.useStore.subscribe(S=>{const O=E(E({},b),S.data);return _a(O,p)},S=>{g(S),y(S)})}),_(()=>{xe.addData(u()[0],!1),we(()=>xe.disposePaths(f()))}),m}Be(ke.SELECT,Tc);Be(ke.NUMBER,pc);Be(ke.COLOR,Zc);Be(ke.STRING,ou);Be(ke.BOOLEAN,du);Be(ke.INTERVAL,Fu);Be(ke.VECTOR3D,Pu);Be(ke.VECTOR2D,Mu);const vd=P("<div></div>"),pd=P("<div><canvas></canvas></div>"),md=(e,t)=>({get read(){return e()},get write(){return t()},swap(){[e,t]=[t,e]}});function yd(e,t,n){let r=0,o=0,i=0;const s=Math.floor(e*6),a=e*6-s,l=n*(1-t),c=n*(1-a*t),u=n*(1-(1-a)*t);switch(s%6){case 0:r=n,o=u,i=l;break;case 1:r=c,o=n,i=l;break;case 2:r=l,o=n,i=u;break;case 3:r=l,o=c,i=n;break;case 4:r=u,o=l,i=n;break;case 5:r=n,o=l,i=c;break}return{r:Math.round(r*255),g:Math.round(o*255),b:Math.round(i*255)}}const Re=0,bd=e=>(B(()=>{if(!e.device||!e.context)return;const t=navigator.gpu.getPreferredCanvasFormat(),n=e.device.createShaderModule({code:`
`+_s}),r=e.device.createShaderModule({code:Ve+`
`+Ss}),o=e.device.createShaderModule({code:Ve+`
`+ks}),i=e.device.createShaderModule({code:`
`+Cs}),s=e.device.createShaderModule({code:`
`+Ps}),a=e.device.createShaderModule({code:Ve+`
`+Ts}),l=e.device.createShaderModule({code:Ve+`
`+Es}),c=e.device.createShaderModule({code:Ve+`
`+Os}),u=e.device.createShaderModule({code:Ve+`
`+Rs}),d=e.device.createShaderModule({code:Ve+`
`+Ns}),f=e.device.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}}]}),h=e.device.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}}]}),g=e.device.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,texture:{viewDimension:"2d",sampleType:"unfilterable-float"}},{binding:1,visibility:GPUShaderStage.FRAGMENT,texture:{viewDimension:"2d",sampleType:"unfilterable-float"}},{binding:2,visibility:GPUShaderStage.FRAGMENT,texture:{viewDimension:"2d",sampleType:"unfilterable-float"}}]}),m=e.device.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,texture:{viewDimension:"2d",sampleType:"unfilterable-float"}},{binding:1,visibility:GPUShaderStage.FRAGMENT,texture:{viewDimension:"2d",sampleType:"unfilterable-float"}}]}),y=e.device.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,texture:{viewDimension:"2d",sampleType:"unfilterable-float"}}]}),w=e.device.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,texture:{viewDimension:"2d",sampleType:"unfilterable-float"}},{binding:1,visibility:GPUShaderStage.FRAGMENT,texture:{viewDimension:"2d",sampleType:"unfilterable-float"}}]}),p=e.device.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,texture:{viewDimension:"2d",sampleType:"unfilterable-float"}},{binding:1,visibility:GPUShaderStage.FRAGMENT,texture:{viewDimension:"2d",sampleType:"unfilterable-float"}}]}),b=e.device.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}}]}),S={vertex:{module:n,entryPoint:"vert"},primitive:{topology:"triangle-strip",stripIndexFormat:"uint16"}},O=e.device.createRenderPipeline({...S,fragment:{module:d,entryPoint:"splat",targets:[{format:"rgba32float"},{format:"rg32float"}]},layout:e.device.createPipelineLayout({bindGroupLayouts:[f,m,b]})}),R=e.device.createRenderPipeline({...S,fragment:{module:o,entryPoint:"advect",targets:[{format:"rgba32float"},{format:"rg32float"}]},layout:e.device.createPipelineLayout({bindGroupLayouts:[f,m]})});e.device.createRenderPipeline({...S,fragment:{module:i,entryPoint:"clear",targets:[{format:"r32float"}]},layout:e.device.createPipelineLayout({bindGroupLayouts:[f,y]})}),e.device.createRenderPipeline({...S,fragment:{module:s,entryPoint:"clear",targets:[{format:"r32float"}]},layout:e.device.createPipelineLayout({bindGroupLayouts:[f,y]})});const z=e.device.createRenderPipeline({...S,fragment:{module:a,entryPoint:"divergence",targets:[{format:"r32float"}]},layout:e.device.createPipelineLayout({bindGroupLayouts:[f,y]})}),A=e.device.createRenderPipeline({...S,fragment:{module:l,entryPoint:"jacobi",targets:[{format:"r32float"}]},layout:e.device.createPipelineLayout({bindGroupLayouts:[f,w,y]})}),N=e.device.createRenderPipeline({...S,fragment:{module:c,entryPoint:"gradient",targets:[{format:"rg32float"}]},layout:e.device.createPipelineLayout({bindGroupLayouts:[f,p]})}),L=e.device.createRenderPipeline({...S,fragment:{module:u,entryPoint:"vorticity",targets:[{format:"rg32float"}]},layout:e.device.createPipelineLayout({bindGroupLayouts:[f,y]})}),M=e.device.createRenderPipeline({...S,fragment:{module:r,entryPoint:"display",targets:[{format:t}]},layout:e.device.createPipelineLayout({bindGroupLayouts:[f,g]})}),j=()=>e.width>>Re,J=()=>e.height>>Re;_(()=>{e.context.configure({device:e.device,alphaMode:"opaque",format:t,usage:GPUTextureUsage.COPY_SRC|GPUTextureUsage.RENDER_ATTACHMENT})});const ce=C=>$=>($&&$.destroy(),e.device.createTexture({format:C??t,dimension:"2d",mipLevelCount:1,size:[j(),J()],usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT})),ue=C=>md(W(ce(C)),W(ce(C))),ae=ue("rgba32float"),V=ue("rg32float"),fe=ue("r32float"),nr=W(ce("r32float")),rn=e.device.createBuffer({size:3<<2,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST,mappedAtCreation:!1}),Ki=()=>e.device.createBuffer({size:10<<2,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST,mappedAtCreation:!1}),rr=e.device.createBuffer({size:3<<2,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST,mappedAtCreation:!1}),Ee=[],or=C=>{const $={identifier:C.identifier,x:C.clientX>>Re,y:C.clientY>>Re,time:Date.now(),previous:{time:Date.now(),x:C.clientX>>Re,y:C.clientY>>Re},uniform:Ki()};var q=e.config.color;e.setConfig("color",yd(Math.random(),(Math.random()>1/4?1:0)/2+Math.random()*.5,Math.random()>1/6?1:0));var je=1;e.device.queue.writeBuffer($.uniform,0<<2,new Float32Array([q.r/255*je,q.g/255*je,q.b/255*je,1,$.x,$.y,0,0,$.previous.x,$.previous.y])),Ee.push($)},on=C=>{const $=Ee.find(q=>q.identifier===C.identifier);if(!$){or(C);return}$.previous.time=$.time,$.previous.x=$.x,$.previous.y=$.y,$.time=Date.now(),$.x=C.clientX>>Re,$.y=C.clientY>>Re,e.device.queue.writeBuffer($.uniform,4<<2,new Float32Array([$.x,$.y,($.x-$.previous.x)/($.time-$.previous.time+1)*1e3,($.y-$.previous.y)/($.time-$.previous.time+1)*1e3,$.previous.x,$.previous.y]))},Fe=C=>{const $=Ee.find(q=>q.identifier===C.identifier);!$||(Ee.splice(Ee.indexOf($),1),$.uniform.destroy())};be(document.querySelector("canvas"),"mousemove",C=>{const $={clientX:C.clientX,clientY:C.clientY,identifier:-1};!Ee.find(je=>je.identifier===$.identifier)||on($)}),be(document.querySelector("canvas"),"mousedown",C=>{const $={clientX:C.clientX,clientY:C.clientY,identifier:-1};Fe($),C.button===0&&on($)}),be(document.querySelector("canvas"),"mouseup",C=>{const $={clientX:C.clientX,clientY:C.clientY,identifier:-1};Fe($)}),be(window,"wheel",C=>{C.preventDefault()},{passive:!1}),be(window,"touchstart",C=>{C.preventDefault(),Fe({identifier:-1,clientX:0,clientY:0});for(let $=0;$<C.changedTouches.length;$++)or(C.changedTouches[$])},{passive:!1}),be(window,"touchmove",C=>{C.preventDefault(),Fe({identifier:-1,clientX:0,clientY:0});for(let $=0;$<C.changedTouches.length;$++)on(C.changedTouches[$])},{passive:!1});var Tt=!1;be(window,"keydown",C=>{C.key.includes("Shift")&&(Tt=!0)},{passive:!1}),be(window,"keyup",C=>{C.key.includes("Shift")&&(Tt=!1)},{passive:!1}),be(window,"touchend",({changedTouches:C})=>{Fe({identifier:-1,clientX:0,clientY:0});for(let $=0;$<C.length;$++)Fe(C[$])}),_(()=>{e.device.queue.writeBuffer(rn,0<<2,new Int32Array([j(),J()])),e.device.queue.writeBuffer(rr,0<<2,new Int32Array([j(),J(),Re]))});const Ke=e.device.createBindGroup({layout:f,entries:[{binding:0,resource:{buffer:rn}}]}),qi=e.device.createBindGroup({layout:h,entries:[{binding:0,resource:{buffer:rr}}]});let ir,sr=new Date;const ar=()=>{let C=new Date,$=Math.min((+C-+sr)/1e3,1/10);e.device.queue.writeBuffer(rn,2<<2,new Float32Array([$])),sr=C;const q=e.device.createCommandEncoder();var je=Ee.length===0&&Tt,Et=Ee.length===0&&e.config.paused||je;for(const de of Ee){const ne=q.beginRenderPass({colorAttachments:[{view:ae.write.createView(),clearValue:{r:0,g:0,b:0,a:1},storeOp:"store",loadOp:"clear"},{view:V.write.createView(),clearValue:{r:0,g:0,b:0,a:1},storeOp:"store",loadOp:"clear"}]});ne.setPipeline(O),ne.setBindGroup(0,Ke),ne.setBindGroup(1,e.device.createBindGroup({layout:m,entries:[{binding:0,resource:ae.read.createView()},{binding:1,resource:V.read.createView()}]})),ne.setBindGroup(2,e.device.createBindGroup({layout:b,entries:[{binding:0,resource:{buffer:de.uniform}}]})),ne.draw(4,1,0,0),ne.end(),Tt||ae.swap(),V.swap()}for(let de=0;de<1;de+=1){{const G=q.beginRenderPass({colorAttachments:[{view:nr().createView(),clearValue:{r:0,g:0,b:0,a:1},storeOp:"store",loadOp:"clear"}]});G.setPipeline(z),G.setBindGroup(0,Ke),G.setBindGroup(1,e.device.createBindGroup({layout:y,entries:[{binding:0,resource:V.read.createView()}]})),G.draw(4,1,0,0),G.end()}const ne=e.device.createBindGroup({layout:w,entries:[{binding:0,resource:nr().createView()},{binding:1,resource:V.read.createView()}]});for(let G=0;G<e.config.pressureSolverIterations;G++){const qe=q.beginRenderPass({colorAttachments:[{view:fe.write.createView(),clearValue:{r:0,g:0,b:0,a:1},storeOp:"store",loadOp:"clear"}]});qe.setPipeline(A),qe.setBindGroup(0,Ke),qe.setBindGroup(1,ne),qe.setBindGroup(2,e.device.createBindGroup({layout:y,entries:[{binding:0,resource:fe.read.createView()}]})),qe.draw(4,1,0,0),qe.end(),fe.swap()}if(!Et){if(!Et){const G=q.beginRenderPass({colorAttachments:[{view:V.write.createView(),clearValue:{r:0,g:0,b:0,a:1},storeOp:"store",loadOp:"clear"}]});G.setPipeline(N),G.setBindGroup(0,Ke),G.setBindGroup(1,e.device.createBindGroup({layout:p,entries:[{binding:0,resource:fe.read.createView()},{binding:1,resource:V.read.createView()}]})),G.draw(4,1,0,0),G.end(),V.swap()}if(!Et){const G=q.beginRenderPass({colorAttachments:[{view:ae.write.createView(),clearValue:{r:0,g:0,b:0,a:1},storeOp:"store",loadOp:"clear"},{view:V.write.createView(),clearValue:{r:0,g:0,b:0,a:1},storeOp:"store",loadOp:"clear"}]});G.setPipeline(R),G.setBindGroup(0,Ke),G.setBindGroup(1,e.device.createBindGroup({layout:m,entries:[{binding:0,resource:ae.read.createView()},{binding:1,resource:V.read.createView()}]})),G.draw(4,1,0,0),G.end(),ae.swap(),V.swap()}}}if(!Et){const de=q.beginRenderPass({colorAttachments:[{view:V.write.createView(),clearValue:{r:0,g:0,b:0,a:1},storeOp:"store",loadOp:"clear"}]});de.setPipeline(L),de.setBindGroup(0,Ke),de.setBindGroup(1,e.device.createBindGroup({layout:y,entries:[{binding:0,resource:V.read.createView()}]})),de.draw(4,1,0,0),de.end(),V.swap()}{const de=e.context.getCurrentTexture(),ne=q.beginRenderPass({colorAttachments:[{view:de.createView(),clearValue:{r:0,g:0,b:0,a:1},storeOp:"store",loadOp:"clear"}]});ne.setPipeline(M),ne.setBindGroup(0,qi),ne.setBindGroup(1,e.device.createBindGroup({layout:g,entries:[{binding:0,resource:ae.read.createView()},{binding:1,resource:fe.read.createView()},{binding:2,resource:V.read.createView()}]})),ne.draw(4,1,0,0),ne.end()}e.device.queue.submit([q.finish()]),ir=requestAnimationFrame(ar)};Zi(ar),we(()=>cancelAnimationFrame(ir))}),vd.cloneNode(!0)),xd=()=>{const[e,t]=I(window.innerWidth),[n,r]=I(window.innerHeight),[o,i]=I(),[s,a]=I(),[l,c]=Ko({pressureSolverIterations:100,color:{r:1,g:1,b:1},paused:!1}),u=(...h)=>{var g=c(...h);document.querySelector("#leva__root")?.remove(),xe.disposePaths([h[0]]);try{xe.setValueAtPath(h[0],h[1],!1)}catch{console.log("E".e)}return f(yn({pressureSolverIterations:l.pressureSolverIterations,color:{...l.color},paused:l.paused})),g},[d,f]=I(yn({pressureSolverIterations:l.pressureSolverIterations,color:{...l.color},paused:l.paused}));return be(window,"resize",()=>{t(window.innerWidth),r(window.innerHeight)}),(async()=>{const h=await navigator.gpu?.requestAdapter();if(!h)throw new Error("No GPU support");return await h.requestDevice()})().then(h=>{console.log("D",h),a(h)}),B(()=>{yn(()=>({pressureSolverIterations:l.pressureSolverIterations}))}),(()=>{const h=pd.cloneNode(!0),g=h.firstChild;return(m=>i(m.getContext("webgpu")))(g),k(h,v(bd,{get context(){return o()},get device(){return s()},get width(){return e()},get height(){return n()},get config(){return d()},setConfig:u}),null),k(h,v(Fi,{store:xe}),null),_(m=>{const y=e(),w=n();return y!==m._v$&&pe(g,"width",m._v$=y),w!==m._v$2&&pe(g,"height",m._v$2=w),m},{_v$:void 0,_v$2:void 0}),h})()};To(()=>v(xd,{}),document.getElementById("root"));
