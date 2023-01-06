(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function n(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerpolicy&&(i.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?i.credentials="include":o.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(o){if(o.ep)return;o.ep=!0;const i=n(o);fetch(o.href,i)}})();const K={};function Qi(e){K.context=e}const es=(e,t)=>e===t,me=Symbol("solid-proxy"),wn=Symbol("solid-track"),Vt={equals:es};let $o=Co;const De=1,zt=2,_o={owned:null,cleanups:null,context:null,owner:null};var F=null;let He=null,W=null,J=null,je=null,zn=0;function gt(e,t){const n=W,r=F,o=e.length===0,i=o?_o:{owned:null,cleanups:null,context:null,owner:t||r},s=o?e:()=>e(()=>Te(()=>Gn(i)));F=i,W=null;try{return lt(s,!0)}finally{W=n,F=r}}function B(e,t){t=t?Object.assign({},Vt,t):Vt;const n={value:e,observers:null,observerSlots:null,comparator:t.equals||void 0},r=o=>(typeof o=="function"&&(o=o(n.value)),To(n,o));return[Po.bind(n),r]}function ts(e,t,n){const r=nn(e,t,!0,De);ct(r)}function _(e,t,n){const r=nn(e,t,!1,De);ct(r)}function I(e,t,n){$o=as;const r=nn(e,t,!1,De);r.user=!0,je?je.push(r):ct(r)}function D(e,t,n){n=n?Object.assign({},Vt,n):Vt;const r=nn(e,t,!0,0);return r.observers=null,r.observerSlots=null,r.comparator=n.equals||void 0,ct(r),Po.bind(r)}function ns(e){return lt(e,!1)}function Te(e){const t=W;W=null;try{return e()}finally{W=t}}function rs(e){I(()=>Te(e))}function $e(e){return F===null||(F.cleanups===null?F.cleanups=[e]:F.cleanups.push(e)),e}function So(){return W}function os(){return F}function en(e,t){const n=Symbol("context");return{id:n,Provider:ls(n),defaultValue:e}}function tn(e){let t;return(t=Ro(F,e.id))!==void 0?t:e.defaultValue}function ko(e){const t=D(e),n=D(()=>$n(t()));return n.toArray=()=>{const r=n();return Array.isArray(r)?r:r!=null?[r]:[]},n}function Po(){const e=He;if(this.sources&&(this.state||e))if(this.state===De||e)ct(this);else{const t=J;J=null,lt(()=>Ut(this),!1),J=t}if(W){const t=this.observers?this.observers.length:0;W.sources?(W.sources.push(this),W.sourceSlots.push(t)):(W.sources=[this],W.sourceSlots=[t]),this.observers?(this.observers.push(W),this.observerSlots.push(W.sources.length-1)):(this.observers=[W],this.observerSlots=[W.sources.length-1])}return this.value}function To(e,t,n){let r=e.value;return(!e.comparator||!e.comparator(r,t))&&(e.value=t,e.observers&&e.observers.length&&lt(()=>{for(let o=0;o<e.observers.length;o+=1){const i=e.observers[o],s=He&&He.running;s&&He.disposed.has(i),(s&&!i.tState||!s&&!i.state)&&(i.pure?J.push(i):je.push(i),i.observers&&Eo(i)),s||(i.state=De)}if(J.length>1e6)throw J=[],new Error},!1)),t}function ct(e){if(!e.fn)return;Gn(e);const t=F,n=W,r=zn;W=F=e,is(e,e.value,r),W=n,F=t}function is(e,t,n){let r;try{r=e.fn(t)}catch(o){e.pure&&(e.state=De),Oo(o)}(!e.updatedAt||e.updatedAt<=n)&&(e.updatedAt!=null&&"observers"in e?To(e,r):e.value=r,e.updatedAt=n)}function nn(e,t,n,r=De,o){const i={fn:e,state:r,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:F,context:null,pure:n};return F===null||F!==_o&&(F.owned?F.owned.push(i):F.owned=[i]),i}function Gt(e){const t=He;if(e.state===0||t)return;if(e.state===zt||t)return Ut(e);if(e.suspense&&Te(e.suspense.inFallback))return e.suspense.effects.push(e);const n=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<zn);)(e.state||t)&&n.push(e);for(let r=n.length-1;r>=0;r--)if(e=n[r],e.state===De||t)ct(e);else if(e.state===zt||t){const o=J;J=null,lt(()=>Ut(e,n[0]),!1),J=o}}function lt(e,t){if(J)return e();let n=!1;t||(J=[]),je?n=!0:je=[],zn++;try{const r=e();return ss(n),r}catch(r){J||(je=null),Oo(r)}}function ss(e){if(J&&(Co(J),J=null),e)return;const t=je;je=null,t.length&&lt(()=>$o(t),!1)}function Co(e){for(let t=0;t<e.length;t++)Gt(e[t])}function as(e){let t,n=0;for(t=0;t<e.length;t++){const r=e[t];r.user?e[n++]=r:Gt(r)}for(K.context&&Qi(),t=0;t<n;t++)Gt(e[t])}function Ut(e,t){const n=He;e.state=0;for(let r=0;r<e.sources.length;r+=1){const o=e.sources[r];o.sources&&(o.state===De||n?o!==t&&Gt(o):(o.state===zt||n)&&Ut(o,t))}}function Eo(e){const t=He;for(let n=0;n<e.observers.length;n+=1){const r=e.observers[n];(!r.state||t)&&(r.state=zt,r.pure?J.push(r):je.push(r),r.observers&&Eo(r))}}function Gn(e){let t;if(e.sources)for(;e.sources.length;){const n=e.sources.pop(),r=e.sourceSlots.pop(),o=n.observers;if(o&&o.length){const i=o.pop(),s=n.observerSlots.pop();r<o.length&&(i.sourceSlots[s]=r,o[r]=i,n.observerSlots[r]=s)}}if(e.owned){for(t=0;t<e.owned.length;t++)Gn(e.owned[t]);e.owned=null}if(e.cleanups){for(t=0;t<e.cleanups.length;t++)e.cleanups[t]();e.cleanups=null}e.state=0,e.context=null}function cs(e){return e instanceof Error||typeof e=="string"?e:new Error("Unknown error")}function Oo(e){throw e=cs(e),e}function Ro(e,t){return e?e.context&&e.context[t]!==void 0?e.context[t]:Ro(e.owner,t):void 0}function $n(e){if(typeof e=="function"&&!e.length)return $n(e());if(Array.isArray(e)){const t=[];for(let n=0;n<e.length;n++){const r=$n(e[n]);Array.isArray(r)?t.push.apply(t,r):t.push(r)}return t}return e}function ls(e,t){return function(r){let o;return _(()=>o=Te(()=>(F.context={[e]:r.value},ko(()=>r.children))),void 0),o}}const us=Symbol("fallback");function vr(e){for(let t=0;t<e.length;t++)e[t]()}function fs(e,t,n={}){let r=[],o=[],i=[],s=0,a=t.length>1?[]:null;return $e(()=>vr(i)),()=>{let c=e()||[],l,u;return c[wn],Te(()=>{let f=c.length,v,h,m,y,x,p,b,S,O;if(f===0)s!==0&&(vr(i),i=[],r=[],o=[],s=0,a&&(a=[])),n.fallback&&(r=[us],o[0]=gt(R=>(i[0]=R,n.fallback())),s=1);else if(s===0){for(o=new Array(f),u=0;u<f;u++)r[u]=c[u],o[u]=gt(d);s=f}else{for(m=new Array(f),y=new Array(f),a&&(x=new Array(f)),p=0,b=Math.min(s,f);p<b&&r[p]===c[p];p++);for(b=s-1,S=f-1;b>=p&&S>=p&&r[b]===c[S];b--,S--)m[S]=o[b],y[S]=i[b],a&&(x[S]=a[b]);for(v=new Map,h=new Array(S+1),u=S;u>=p;u--)O=c[u],l=v.get(O),h[u]=l===void 0?-1:l,v.set(O,u);for(l=p;l<=b;l++)O=r[l],u=v.get(O),u!==void 0&&u!==-1?(m[u]=o[l],y[u]=i[l],a&&(x[u]=a[l]),u=h[u],v.set(O,u)):i[l]();for(u=p;u<f;u++)u in m?(o[u]=m[u],i[u]=y[u],a&&(a[u]=x[u],a[u](u))):o[u]=gt(d);o=o.slice(0,s=f),r=c.slice(0)}return o});function d(f){if(i[u]=f,a){const[v,h]=B(u);return a[u]=h,t(c[u],v)}return t(c[u])}}}function g(e,t){return Te(()=>e(t||{}))}function Rt(){return!0}const _n={get(e,t,n){return t===me?n:e.get(t)},has(e,t){return t===me?!0:e.has(t)},set:Rt,deleteProperty:Rt,getOwnPropertyDescriptor(e,t){return{configurable:!0,enumerable:!0,get(){return e.get(t)},set:Rt,deleteProperty:Rt}},ownKeys(e){return e.keys()}};function cn(e){return(e=typeof e=="function"?e():e)?e:{}}function _e(...e){let t=!1;for(let r=0;r<e.length;r++){const o=e[r];t=t||!!o&&me in o,e[r]=typeof o=="function"?(t=!0,D(o)):o}if(t)return new Proxy({get(r){for(let o=e.length-1;o>=0;o--){const i=cn(e[o])[r];if(i!==void 0)return i}},has(r){for(let o=e.length-1;o>=0;o--)if(r in cn(e[o]))return!0;return!1},keys(){const r=[];for(let o=0;o<e.length;o++)r.push(...Object.keys(cn(e[o])));return[...new Set(r)]}},_n);const n={};for(let r=e.length-1;r>=0;r--)if(e[r]){const o=Object.getOwnPropertyDescriptors(e[r]);for(const i in o)i in n||Object.defineProperty(n,i,{enumerable:!0,get(){for(let s=e.length-1;s>=0;s--){const a=(e[s]||{})[i];if(a!==void 0)return a}}})}return n}function Un(e,...t){const n=new Set(t.flat());if(me in e){const o=t.map(i=>new Proxy({get(s){return i.includes(s)?e[s]:void 0},has(s){return i.includes(s)&&s in e},keys(){return i.filter(s=>s in e)}},_n));return o.push(new Proxy({get(i){return n.has(i)?void 0:e[i]},has(i){return n.has(i)?!1:i in e},keys(){return Object.keys(e).filter(i=>!n.has(i))}},_n)),o}const r=Object.getOwnPropertyDescriptors(e);return t.push(Object.keys(r).filter(o=>!n.has(o))),t.map(o=>{const i={};for(let s=0;s<o.length;s++){const a=o[s];a in e&&Object.defineProperty(i,a,r[a]?r[a]:{get(){return e[a]},set(){return!0},enumerable:!0})}return i})}function Wn(e){const t="fallback"in e&&{fallback:()=>e.fallback};return D(fs(()=>e.each,e.children,t||void 0))}function Ce(e){let t=!1;const n=e.keyed,r=D(()=>e.when,void 0,{equals:(o,i)=>t?o===i:!o==!i});return D(()=>{const o=r();if(o){const i=e.children,s=typeof i=="function"&&i.length>0;return t=n||s,s?Te(()=>i(o)):i}return e.fallback},void 0,void 0)}function ds(e){let t=!1,n=!1;const r=(s,a)=>s[0]===a[0]&&(t?s[1]===a[1]:!s[1]==!a[1])&&s[2]===a[2],o=ko(()=>e.children),i=D(()=>{let s=o();Array.isArray(s)||(s=[s]);for(let a=0;a<s.length;a++){const c=s[a].when;if(c)return n=!!s[a].keyed,[a,c,s[a]]}return[-1]},void 0,{equals:r});return D(()=>{const[s,a,c]=i();if(s<0)return e.fallback;const l=c.children,u=typeof l=="function"&&l.length>0;return t=n||u,u?Te(()=>l(a)):l},void 0,void 0)}function ln(e){return e}const vs=["allowfullscreen","async","autofocus","autoplay","checked","controls","default","disabled","formnovalidate","hidden","indeterminate","ismap","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","seamless","selected"],hs=new Set(["className","value","readOnly","formNoValidate","isMap","noModule","playsInline",...vs]),gs=new Set(["innerHTML","textContent","innerText","children"]),ps=Object.assign(Object.create(null),{className:"class",htmlFor:"for"}),hr=Object.assign(Object.create(null),{class:"className",formnovalidate:"formNoValidate",ismap:"isMap",nomodule:"noModule",playsinline:"playsInline",readonly:"readOnly"}),ms=new Set(["beforeinput","click","dblclick","contextmenu","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"]),ys=new Set(["altGlyph","altGlyphDef","altGlyphItem","animate","animateColor","animateMotion","animateTransform","circle","clipPath","color-profile","cursor","defs","desc","ellipse","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence","filter","font","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignObject","g","glyph","glyphRef","hkern","image","line","linearGradient","marker","mask","metadata","missing-glyph","mpath","path","pattern","polygon","polyline","radialGradient","rect","set","stop","svg","switch","symbol","text","textPath","tref","tspan","use","view","vkern"]),bs={xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace"};function xs(e,t,n){let r=n.length,o=t.length,i=r,s=0,a=0,c=t[o-1].nextSibling,l=null;for(;s<o||a<i;){if(t[s]===n[a]){s++,a++;continue}for(;t[o-1]===n[i-1];)o--,i--;if(o===s){const u=i<r?a?n[a-1].nextSibling:n[i-a]:c;for(;a<i;)e.insertBefore(n[a++],u)}else if(i===a)for(;s<o;)(!l||!l.has(t[s]))&&t[s].remove(),s++;else if(t[s]===n[i-1]&&n[a]===t[o-1]){const u=t[--o].nextSibling;e.insertBefore(n[a++],t[s++].nextSibling),e.insertBefore(n[--i],u),t[o]=n[i]}else{if(!l){l=new Map;let d=a;for(;d<i;)l.set(n[d],d++)}const u=l.get(t[s]);if(u!=null)if(a<u&&u<i){let d=s,f=1,v;for(;++d<o&&d<i&&!((v=l.get(t[d]))==null||v!==u+f);)f++;if(f>u-a){const h=t[s];for(;a<u;)e.insertBefore(n[a++],h)}else e.replaceChild(n[a++],t[s++])}else s++;else t[s++].remove()}}}const gr="_$DX_DELEGATE";function Lo(e,t,n,r={}){let o;return gt(i=>{o=i,t===document?e():k(t,e(),t.firstChild?null:void 0,n)},r.owner),()=>{o(),t.textContent=""}}function T(e,t,n){const r=document.createElement("template");r.innerHTML=e;let o=r.content.firstChild;return n&&(o=o.firstChild),o}function Ee(e,t=window.document){const n=t[gr]||(t[gr]=new Set);for(let r=0,o=e.length;r<o;r++){const i=e[r];n.has(i)||(n.add(i),t.addEventListener(i,Cs))}}function ce(e,t,n){n==null?e.removeAttribute(t):e.setAttribute(t,n)}function ws(e,t,n,r){r==null?e.removeAttributeNS(t,n):e.setAttributeNS(t,n,r)}function $s(e,t){t==null?e.removeAttribute("class"):e.className=t}function pt(e,t,n,r){if(r)Array.isArray(n)?(e[`$$${t}`]=n[0],e[`$$${t}Data`]=n[1]):e[`$$${t}`]=n;else if(Array.isArray(n)){const o=n[0];e.addEventListener(t,n[0]=i=>o.call(e,n[1],i))}else e.addEventListener(t,n)}function _s(e,t,n={}){const r=Object.keys(t||{}),o=Object.keys(n);let i,s;for(i=0,s=o.length;i<s;i++){const a=o[i];!a||a==="undefined"||t[a]||(pr(e,a,!1),delete n[a])}for(i=0,s=r.length;i<s;i++){const a=r[i],c=!!t[a];!a||a==="undefined"||n[a]===c||!c||(pr(e,a,!0),n[a]=c)}return n}function Hn(e,t,n){if(!t)return n?ce(e,"style"):t;const r=e.style;if(typeof t=="string")return r.cssText=t;typeof n=="string"&&(r.cssText=n=void 0),n||(n={}),t||(t={});let o,i;for(i in n)t[i]==null&&r.removeProperty(i),delete n[i];for(i in t)o=t[i],o!==n[i]&&(r.setProperty(i,o),n[i]=o);return n}function Ke(e,t={},n,r){const o={};return r||_(()=>o.children=it(e,t.children,o.children)),_(()=>t.ref&&t.ref(e)),_(()=>ks(e,t,n,!0,o,!0)),o}function Ss(e,t,n){return Te(()=>e(t,n))}function k(e,t,n,r){if(n!==void 0&&!r&&(r=[]),typeof t!="function")return it(e,t,r,n);_(o=>it(e,t(),o,n),r)}function ks(e,t,n,r,o={},i=!1){t||(t={});for(const s in o)if(!(s in t)){if(s==="children")continue;o[s]=mr(e,s,null,o[s],n,i)}for(const s in t){if(s==="children"){r||it(e,t.children);continue}const a=t[s];o[s]=mr(e,s,a,o[s],n,i)}}function Ps(e){let t,n;return!K.context||!(t=K.registry.get(n=Es()))?e.cloneNode(!0):(K.completed&&K.completed.add(t),K.registry.delete(n),t)}function Ts(e){return e.toLowerCase().replace(/-([a-z])/g,(t,n)=>n.toUpperCase())}function pr(e,t,n){const r=t.trim().split(/\s+/);for(let o=0,i=r.length;o<i;o++)e.classList.toggle(r[o],n)}function mr(e,t,n,r,o,i){let s,a,c;if(t==="style")return Hn(e,n,r);if(t==="classList")return _s(e,n,r);if(n===r)return r;if(t==="ref")i||n(e);else if(t.slice(0,3)==="on:"){const l=t.slice(3);r&&e.removeEventListener(l,r),n&&e.addEventListener(l,n)}else if(t.slice(0,10)==="oncapture:"){const l=t.slice(10);r&&e.removeEventListener(l,r,!0),n&&e.addEventListener(l,n,!0)}else if(t.slice(0,2)==="on"){const l=t.slice(2).toLowerCase(),u=ms.has(l);if(!u&&r){const d=Array.isArray(r)?r[0]:r;e.removeEventListener(l,d)}(u||n)&&(pt(e,l,n,u),u&&Ee([l]))}else if((c=gs.has(t))||!o&&(hr[t]||(a=hs.has(t)))||(s=e.nodeName.includes("-")))t==="class"||t==="className"?$s(e,n):s&&!a&&!c?e[Ts(t)]=n:e[hr[t]||t]=n;else{const l=o&&t.indexOf(":")>-1&&bs[t.split(":")[0]];l?ws(e,l,t,n):ce(e,ps[t]||t,n)}return n}function Cs(e){const t=`$$${e.type}`;let n=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==n&&Object.defineProperty(e,"target",{configurable:!0,value:n}),Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return n||document}}),K.registry&&!K.done&&(K.done=!0,document.querySelectorAll("[id^=pl-]").forEach(r=>r.remove()));n;){const r=n[t];if(r&&!n.disabled){const o=n[`${t}Data`];if(o!==void 0?r.call(n,o,e):r.call(n,e),e.cancelBubble)return}n=n._$host||n.parentNode||n.host}}function it(e,t,n,r,o){for(K.context&&!n&&(n=[...e.childNodes]);typeof n=="function";)n=n();if(t===n)return n;const i=typeof t,s=r!==void 0;if(e=s&&n[0]&&n[0].parentNode||e,i==="string"||i==="number"){if(K.context)return n;if(i==="number"&&(t=t.toString()),s){let a=n[0];a&&a.nodeType===3?a.data=t:a=document.createTextNode(t),n=Qe(e,n,r,a)}else n!==""&&typeof n=="string"?n=e.firstChild.data=t:n=e.textContent=t}else if(t==null||i==="boolean"){if(K.context)return n;n=Qe(e,n,r)}else{if(i==="function")return _(()=>{let a=t();for(;typeof a=="function";)a=a();n=it(e,a,n,r)}),()=>n;if(Array.isArray(t)){const a=[],c=n&&Array.isArray(n);if(Sn(a,t,n,o))return _(()=>n=it(e,a,n,r,!0)),()=>n;if(K.context){if(!a.length)return n;for(let l=0;l<a.length;l++)if(a[l].parentNode)return n=a}if(a.length===0){if(n=Qe(e,n,r),s)return n}else c?n.length===0?yr(e,a,r):xs(e,n,a):(n&&Qe(e),yr(e,a));n=a}else if(t instanceof Node){if(K.context&&t.parentNode)return n=s?[t]:t;if(Array.isArray(n)){if(s)return n=Qe(e,n,r,t);Qe(e,n,null,t)}else n==null||n===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);n=t}}return n}function Sn(e,t,n,r){let o=!1;for(let i=0,s=t.length;i<s;i++){let a=t[i],c=n&&n[i];if(a instanceof Node)e.push(a);else if(!(a==null||a===!0||a===!1))if(Array.isArray(a))o=Sn(e,a,c)||o;else if(typeof a=="function")if(r){for(;typeof a=="function";)a=a();o=Sn(e,Array.isArray(a)?a:[a],Array.isArray(c)?c:[c])||o}else e.push(a),o=!0;else{const l=String(a);c&&c.nodeType===3&&c.data===l?e.push(c):e.push(document.createTextNode(l))}}return o}function yr(e,t,n=null){for(let r=0,o=t.length;r<o;r++)e.insertBefore(t[r],n)}function Qe(e,t,n,r){if(n===void 0)return e.textContent="";const o=r||document.createTextNode("");if(t.length){let i=!1;for(let s=t.length-1;s>=0;s--){const a=t[s];if(o!==a){const c=a.parentNode===e;!i&&!s?c?e.replaceChild(o,a):e.insertBefore(o,n):c&&a.remove()}else i=!0}}else e.insertBefore(o,n);return[o]}function Es(){const e=K.context;return`${e.id}${e.count++}`}const Os="http://www.w3.org/2000/svg";function No(e,t=!1){return t?document.createElementNS(Os,e):document.createElement(e)}function jo(e){const{useShadow:t}=e,n=document.createTextNode(""),r=e.mount||document.body;function o(){if(K.context){const[i,s]=B(!1);return queueMicrotask(()=>s(!0)),()=>i()&&e.children}else return()=>e.children}if(r instanceof HTMLHeadElement){const[i,s]=B(!1),a=()=>s(!0);gt(c=>k(r,()=>i()?c():o()(),null)),$e(()=>{K.context?queueMicrotask(a):a()})}else{const i=No(e.isSVG?"g":"div",e.isSVG),s=t&&i.attachShadow?i.attachShadow({mode:"open"}):i;Object.defineProperty(i,"_$host",{get(){return n.parentNode},configurable:!0}),k(s,o()),r.appendChild(i),e.ref&&e.ref(i),$e(()=>r.removeChild(i))}return n}function Fn(e){const[t,n]=Un(e,["component"]),r=D(()=>t.component);return D(()=>{const o=r();switch(typeof o){case"function":return Te(()=>o(n));case"string":const i=ys.has(o),s=K.context?Ps():No(o,i);return Ke(s,n,i),s}})}const Rs=`@vertex
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



const BUMP = 1.0;

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
    const pi:f32 = 3.14159;
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
const iTime=0.0;
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
    const  STEPS = 1;
    const  ODIST = 0.0001;
    for (mip = 1; mip <= STEPS; mip += 1) {
        if (mip == 1) {
            dxy += (1.0 / pow(2.0, f32(mip))) * diff(uv, mip - 1);
        }
    }
    var mip2 = 1;
    var wi = 0.0;
    var vis = 0.0;
    var spv = 0.0;
    const RA = 3;
    
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
    const LOG_SPEC = 10.0;
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


const dyeDissipation = 1.0;
const velocityDissipation = 1.0;//0.75;
const color = vec4<f32>(vec3<f32>(0.0), 1.0);

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
    var timestep = u.timestep/1.0;
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

// const dyeDissipation = 1.0;
// const velocityDissipation = 1.0;//0.75;
// const color = vec4<f32>(vec3<f32>(0.0), 1.0);

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
//     const timestep = u.timestep/100.0;
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
`,As=`struct Uniforms {
    resolution: vec2<i32>,
};
@group(0) @binding(0) var<uniform> u : Uniforms;

@group(1) @binding(0) var pressure : texture_2d<f32>;

@fragment
fn clear(@builtin(position) coords: vec4<f32>) -> @location(0) f32 {
    return 1.0 * textureLoad(pressure, vec2<i32>(coords.xy - 0.5), 0).x*0.5;
}
`,Ds=`struct Uniforms {
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

const EPSILON = 2.4414e-4; // 2^-12
const curlAmount = 1.0;

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
`,We=`
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
    cpoint: vec2<f32>,
    velocity: vec2<f32>,
    oldPoint: vec2<f32>,
};

@group(2) @binding(0) var<uniform> touch : Touch;

const radius = 1600.0;

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
    var p = coords.xy - closestPoint(touch.cpoint, touch.oldPoint, coords.xy);
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
`;var br=e=>typeof e=="function"&&!e.length?e():e,xr=e=>Array.isArray(e)?e:[e],zs=e=>os()?$e(e):e;function Gs(e,t,n,r){return e.addEventListener(t,n,r),zs(e.removeEventListener.bind(e,t,n,r))}function xe(e,t,n,r){const o=()=>{xr(br(e)).forEach(i=>{i&&xr(br(t)).forEach(s=>Gs(i,s,n,r))})};typeof e=="function"?I(o):_(o)}var wr=Object.prototype.hasOwnProperty;function Wt(e,t){var n,r;if(e===t)return!0;if(e&&t&&(n=e.constructor)===t.constructor){if(n===Date)return e.getTime()===t.getTime();if(n===RegExp)return e.toString()===t.toString();if(n===Array){if((r=e.length)===t.length)for(;r--&&Wt(e[r],t[r]););return r===-1}if(!n||typeof e=="object"){r=0;for(n in e)if(wr.call(e,n)&&++r&&!wr.call(t,n)||!(n in t)||!Wt(e[n],t[n]))return!1;return Object.keys(t).length===r}}return e!==e&&t!==t}var rn=function(t,n,r,o){this.name=t,this.fn=n,this.args=r,this.modifiers=o};rn.prototype._test=function(t){var n=this.fn;try{ot(this.modifiers.slice(),n,this)(t)}catch{n=function(){return!1}}try{return ot(this.modifiers.slice(),n,this)(t)}catch{return!1}};rn.prototype._check=function(t){try{ot(this.modifiers.slice(),this.fn,this)(t)}catch{if(ot(this.modifiers.slice(),function(r){return r},this)(!1))return}if(!ot(this.modifiers.slice(),this.fn,this)(t))throw null};rn.prototype._testAsync=function(t){var n=this;return new Promise(function(r,o){Do(n.modifiers.slice(),n.fn,n)(t).then(function(i){i?r(t):o(null)}).catch(function(i){return o(i)})})};function Ao(e,t){return t===void 0&&(t="simple"),typeof e=="object"?e[t]:e}function ot(e,t,n){if(e.length){var r=e.shift(),o=ot(e,t,n);return r.perform(o,n)}else return Ao(t)}function Do(e,t,n){if(e.length){var r=e.shift(),o=Do(e,t,n);return r.performAsync(o,n)}else return function(i){return Promise.resolve(Ao(t,"async")(i))}}var Us=function(t,n,r){this.name=t,this.perform=n,this.performAsync=r},Kn=function(e){function t(n,r,o,i){for(var s=[],a=arguments.length-4;a-- >0;)s[a]=arguments[a+4];e.call(this,s),e.captureStackTrace&&e.captureStackTrace(this,t),this.rule=n,this.value=r,this.cause=o,this.target=i}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t}(Error),Se=function(t,n){t===void 0&&(t=[]),n===void 0&&(n=[]),this.chain=t,this.nextRuleModifiers=n};Se.prototype._applyRule=function(t,n){var r=this;return function(){for(var o=[],i=arguments.length;i--;)o[i]=arguments[i];return r.chain.push(new rn(n,t.apply(r,o),o,r.nextRuleModifiers)),r.nextRuleModifiers=[],r}};Se.prototype._applyModifier=function(t,n){return this.nextRuleModifiers.push(new Us(n,t.simple,t.async)),this};Se.prototype._clone=function(){return new Se(this.chain.slice(),this.nextRuleModifiers.slice())};Se.prototype.test=function(t){return this.chain.every(function(n){return n._test(t)})};Se.prototype.testAll=function(t){var n=[];return this.chain.forEach(function(r){try{r._check(t)}catch(o){n.push(new Kn(r,t,o))}}),n};Se.prototype.check=function(t){this.chain.forEach(function(n){try{n._check(t)}catch(r){throw new Kn(n,t,r)}})};Se.prototype.testAsync=function(t){var n=this;return new Promise(function(r,o){Bo(t,n.chain.slice(),r,o)})};function Bo(e,t,n,r){if(t.length){var o=t.shift();o._testAsync(e).then(function(){Bo(e,t,n,r)},function(i){r(new Kn(o,e,i))})}else n(e)}var $r=function(e,t){return t&&typeof e=="string"&&e.trim().length===0?!0:e==null};function Ws(e,t){return t===void 0&&(t=!1),{simple:function(n){return $r(n,t)||e.check(n)===void 0},async:function(n){return $r(n,t)||e.testAsync(n)}}}function ie(){return typeof Proxy<"u"?Mo(new Se):kn(new Se)}var bt={};ie.extend=function(e){Object.assign(bt,e)};ie.clearCustomRules=function(){bt={}};function Mo(e){return new Proxy(e,{get:function(n,r){if(r in n)return n[r];var o=Mo(e._clone());if(r in Ht)return o._applyModifier(Ht[r],r);if(r in bt)return o._applyRule(bt[r],r);if(r in Pn)return o._applyRule(Pn[r],r)}})}function kn(e){var t=function(o,i){return Object.keys(o).forEach(function(s){i[s]=function(){for(var a=[],c=arguments.length;c--;)a[c]=arguments[c];var l=kn(i._clone()),u=l._applyRule(o[s],s).apply(void 0,a);return u}}),i},n=t(Pn,e),r=t(bt,n);return Object.keys(Ht).forEach(function(o){Object.defineProperty(r,o,{get:function(){var i=kn(r._clone());return i._applyModifier(Ht[o],o)}})}),r}var Ht={not:{simple:function(e){return function(t){return!e(t)}},async:function(e){return function(t){return Promise.resolve(e(t)).then(function(n){return!n}).catch(function(){return!0})}}},some:{simple:function(e){return function(t){return Lt(t).some(function(n){try{return e(n)}catch{return!1}})}},async:function(e){return function(t){return Promise.all(Lt(t).map(function(n){try{return e(n).catch(function(){return!1})}catch{return!1}})).then(function(n){return n.some(Boolean)})}}},every:{simple:function(e){return function(t){return t!==!1&&Lt(t).every(e)}},async:function(e){return function(t){return Promise.all(Lt(t).map(e)).then(function(n){return n.every(Boolean)})}}},strict:{simple:function(e,t){return function(n){return _r(t)&&n&&typeof n=="object"?Object.keys(t.args[0]).length===Object.keys(n).length&&e(n):e(n)}},async:function(e,t){return function(n){return Promise.resolve(e(n)).then(function(r){return _r(t)&&n&&typeof n=="object"?Object.keys(t.args[0]).length===Object.keys(n).length&&r:r}).catch(function(){return!1})}}}};function _r(e){return e&&e.name==="schema"&&e.args.length>0&&typeof e.args[0]=="object"}function Lt(e){return typeof e=="string"?e.split(""):e}var Pn={equal:function(e){return function(t){return t==e}},exact:function(e){return function(t){return t===e}},number:function(e){return e===void 0&&(e=!0),function(t){return typeof t=="number"&&(e||isFinite(t))}},integer:function(){return function(e){var t=Number.isInteger||Hs;return t(e)}},numeric:function(){return function(e){return!isNaN(parseFloat(e))&&isFinite(e)}},string:function(){return et("string")},boolean:function(){return et("boolean")},undefined:function(){return et("undefined")},null:function(){return et("null")},array:function(){return et("array")},object:function(){return et("object")},instanceOf:function(e){return function(t){return t instanceof e}},pattern:function(e){return function(t){return e.test(t)}},lowercase:function(){return function(e){return typeof e=="boolean"||e===e.toLowerCase()&&e.trim()!==""}},uppercase:function(){return function(e){return e===e.toUpperCase()&&e.trim()!==""}},vowel:function(){return function(e){return/^[aeiou]+$/i.test(e)}},consonant:function(){return function(e){return/^(?=[^aeiou])([a-z]+)$/i.test(e)}},first:function(e){return function(t){return t[0]==e}},last:function(e){return function(t){return t[t.length-1]==e}},empty:function(){return function(e){return e.length===0}},length:function(e,t){return function(n){return n.length>=e&&n.length<=(t||e)}},minLength:function(e){return function(t){return t.length>=e}},maxLength:function(e){return function(t){return t.length<=e}},negative:function(){return function(e){return e<0}},positive:function(){return function(e){return e>=0}},between:function(e,t){return function(n){return n>=e&&n<=t}},range:function(e,t){return function(n){return n>=e&&n<=t}},lessThan:function(e){return function(t){return t<e}},lessThanOrEqual:function(e){return function(t){return t<=e}},greaterThan:function(e){return function(t){return t>e}},greaterThanOrEqual:function(e){return function(t){return t>=e}},even:function(){return function(e){return e%2===0}},odd:function(){return function(e){return e%2!==0}},includes:function(e){return function(t){return~t.indexOf(e)}},schema:function(e){return Fs(e)},passesAnyOf:function(){for(var e=[],t=arguments.length;t--;)e[t]=arguments[t];return function(n){return e.some(function(r){return r.test(n)})}},optional:Ws};function et(e){return function(t){return Array.isArray(t)&&e==="array"||t===null&&e==="null"||typeof t===e}}function Hs(e){return typeof e=="number"&&isFinite(e)&&Math.floor(e)===e}function Fs(e){return{simple:function(t){var n=[];if(Object.keys(e).forEach(function(r){var o=e[r];try{o.check((t||{})[r])}catch(i){i.target=r,n.push(i)}}),n.length>0)throw n;return!0},async:function(t){var n=[],r=Object.keys(e).map(function(o){var i=e[o];return i.testAsync((t||{})[o]).catch(function(s){s.target=o,n.push(s)})});return Promise.all(r).then(function(){if(n.length>0)throw n;return!0})}}}function xt(e=null){return{current:e}}const st=(e,t=0,n=1)=>e>n?n:e<t?t:e,Ks=T('<div class="react-colorful__interactive" tabindex="0" role="slider"></div>'),wt=e=>"touches"in e,qs=(e,t)=>{for(let n=0;n<e.length;n++)if(e[n].identifier===t)return e[n];return e[0]},Tn=e=>e&&e.ownerDocument.defaultView||self,Sr=(e,t,n)=>{const r=e.getBoundingClientRect(),o=wt(t)?qs(t.touches,n):t;return{left:st((o.pageX-(r.left+Tn(e).pageXOffset))/r.width),top:st((o.pageY-(r.top+Tn(e).pageYOffset))/r.height)}},kr=e=>{!wt(e)&&e.preventDefault()},Ys=(e,t)=>t&&!wt(e),qn=e=>{const t=xt(null),n=xt(null);let r=!1;const o=D(()=>{const a=f=>{const v=t.current;if(v&&(kr(f),!(Ys(f,r)||!v))){if(wt(f)){r=!0;const h=f.changedTouches||[];h.length&&(n.current=h[0].identifier)}v.focus(),e.onMove(Sr(v,f,n.current)),d(!0)}},c=f=>{kr(f),(wt(f)?f.touches.length>0:f.buttons>0)&&t.current?e.onMove(Sr(t.current,f,n.current)):d(!1)},l=()=>d(!1),u=f=>{const v=f.which||f.keyCode;v<37||v>40||(f.preventDefault(),e.onKey({left:v===39?.05:v===37?-.05:0,top:v===40?.05:v===38?-.05:0}))};function d(f){const v=t.current,h=Tn(v),m=f?h.addEventListener:h.removeEventListener;m(r?"touchmove":"mousemove",c),m(r?"touchend":"mouseup",l)}return{handleMoveStart:a,handleKeyDown:u,toggleDocumentEvents:d}});$e(()=>{o().toggleDocumentEvents});const[i,s]=Un(e,["onMove","onKey"]);return(()=>{const a=Ks.cloneNode(!0);return pt(a,"keydown",o().handleKeyDown,!0),(c=>t.current=c)(a),pt(a,"mousedown",o().handleMoveStart,!0),pt(a,"touchstart",o().handleMoveStart,!0),Ke(a,s,!1,!1),a})()};Ee(["touchstart","mousedown","keydown"]);const St=e=>e.filter(Boolean).join(" "),Xs=T('<div><div class="react-colorful__pointer-fill"></div></div>'),Yn=e=>(I(()=>{console.log(e.color)}),(()=>{const t=Xs.cloneNode(!0),n=t.firstChild;return _(r=>{const o=St(["react-colorful__pointer",e.className]),i=`${e.top*100}%`,s=`${e.left*100}%`,a=e.color;return o!==r._v$&&(t.className=r._v$=o),i!==r._v$2&&t.style.setProperty("top",r._v$2=i),s!==r._v$3&&t.style.setProperty("left",r._v$3=s),a!==r._v$4&&n.style.setProperty("background-color",r._v$4=a),r},{_v$:void 0,_v$2:void 0,_v$3:void 0,_v$4:void 0}),t})()),Q=(e,t=0,n=Math.pow(10,t))=>Math.round(n*e)/n,Io=({h:e,s:t,v:n,a:r})=>{const o=(200-t)*n/100;return{h:Q(e),s:Q(o>0&&o<200?t*n/100/(o<=100?o:200-o)*100:0),l:Q(o/2),a:Q(r,2)}},Vo=e=>{const{h:t,s:n,l:r}=Io(e);return`hsl(${t}, ${n}%, ${r}%)`},un=e=>{const{h:t,s:n,l:r,a:o}=Io(e);return`hsla(${t}, ${n}%, ${r}%, ${o})`},Xn=({h:e,s:t,v:n,a:r})=>{e=e/360*6,t=t/100,n=n/100;const o=Math.floor(e),i=n*(1-t),s=n*(1-(e-o)*t),a=n*(1-(1-e+o)*t),c=o%6;return{r:Q([n,s,i,i,a,n][c]*255),g:Q([a,n,n,s,i,i][c]*255),b:Q([i,i,a,n,n,s][c]*255),a:Q(r,2)}},Js=e=>{const{r:t,g:n,b:r}=Xn(e);return`rgb(${t}, ${n}, ${r})`},zo=({r:e,g:t,b:n,a:r})=>{const o=Math.max(e,t,n),i=o-Math.min(e,t,n),s=i?o===e?(t-n)/i:o===t?2+(n-e)/i:4+(e-t)/i:0;return{h:Q(60*(s<0?s+6:s)),s:Q(o?i/o*100:0),v:Q(o/255*100),a:r}},Zs=({r:e,g:t,b:n})=>({r:e,g:t,b:n}),Qs=T("<div></div>"),Go=e=>{const t=r=>{e.onChange({h:360*r.left})},n=r=>{e.onChange({h:st(e.hue+r.left*360,0,360)})};return(()=>{const r=Qs.cloneNode(!0);return k(r,g(qn,{onMove:t,onKey:n,"aria-label":"Hue",get["aria-valuetext"](){return Q(e.hue)},get children(){return g(Yn,{className:"react-colorful__hue-pointer",get left(){return e.hue/360},top:0,get color(){return Vo({h:e.hue,s:100,v:100,a:1})}})}})),_(()=>r.className=St(["react-colorful__hue",e.className])),r})()},ea=T('<div class="react-colorful__saturation"></div>'),Uo=e=>{const t=r=>{e.onChange({s:r.left*100,v:100-r.top*100})},n=r=>{e.onChange({s:st(e.hsva.s+r.left*100,0,100),v:st(e.hsva.v-r.top*100,0,100)})};return(()=>{const r=ea.cloneNode(!0);return k(r,g(qn,{onMove:t,onKey:n,"aria-label":"Color",get["aria-valuetext"](){return`Saturation ${Q(e.hsva.s)}%, Brightness ${Q(e.hsva.v)}%`},get children(){return g(Yn,{className:"react-colorful__saturation-pointer",get top(){return 1-e.hsva.v/100},get left(){return e.hsva.s/100},get color(){return Vo(e.hsva)}})}})),_(()=>r.style.setProperty("background-color",Js({h:e.hsva.h,s:100,v:100,a:1}))),r})()},Jn=(e,t)=>{if(e===t)return!0;for(const n in e)if(e[n]!==t[n])return!1;return!0};function Wo(e){const[t,n]=B(e.colorModel.toHsva(e.color)),r=xt({color:e.color,hsva:t()});return I(()=>{if(!e.colorModel.equal(e.color,r.current.color)){const i=e.colorModel.toHsva(e.color);r.current={hsva:i,color:e.color},n(i)}}),I(()=>{var i;let s;!Jn(t(),r.current.hsva)&&!e.colorModel.equal(s=e.colorModel.fromHsva(t()),r.current.color)&&(r.current={hsva:t(),color:s},(i=e.onChange)==null||i.call(e,s))}),[t,i=>{n(s=>Object.assign({},s,i))}]}const ta=()=>{if(typeof __webpack_nonce__<"u")return __webpack_nonce__};var na=`.react-colorful {
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
`;const Pr=new Map,Ho=e=>{I(()=>{const t=e.current?e.current.ownerDocument:document;if(typeof t<"u"&&!Pr.has(t)){const n=t.createElement("style");n.innerHTML=na,Pr.set(t,n);const r=ta();r&&n.setAttribute("nonce",r),t.head.appendChild(n)}})},ra=T("<div></div>"),oa=e=>{const t=_e({color:e.colorModel.defaultColor},e);let n=xt();Ho({current:n.current});const[r,o]=Wo(t),[i,s]=Un(t,["color","colorModel","onChange","className"]);return I(()=>{console.log(r())}),(()=>{const a=ra.cloneNode(!0);return(c=>n.current=c)(a),Ke(a,s,!1,!0),k(a,g(Uo,{get hsva(){return r()},onChange:o}),null),k(a,g(Go,{get hue(){return r().h},onChange:o,className:"react-colorful__last-control"}),null),_(()=>a.className=St(["react-colorful",t.className])),a})()},ia=T('<div><div class="react-colorful__alpha-gradient"></div></div>'),sa=e=>{const t=a=>{e.onChange({a:a.left})},n=a=>{e.onChange({a:st(e.hsva.a+a.left)})},r=un(Object.assign({},e.hsva,{a:0})),o=un(Object.assign({},e.hsva,{a:1})),i={backgroundImage:`linear-gradient(90deg, ${r}, ${o})`},s=St(["react-colorful__alpha",e.className]);return(()=>{const a=ia.cloneNode(!0),c=a.firstChild;return a.className=s,Hn(c,i),k(a,g(qn,{onMove:t,onKey:n,"aria-label":"Alpha",get["aria-valuetext"](){return`${Q(e.hsva.a*100)}%`},get children(){return g(Yn,{className:"react-colorful__alpha-pointer",get left(){return e.hsva.a},top:0,get color(){return un(e.hsva)}})}}),null),a})()},aa=T("<div></div>"),ca=e=>{e=_e({},{color:e.colorModel.defaultColor},e);const t=xt();Ho(t);const[n,r]=Wo(e.colorModel,e.color,e.onChange),o=St(["react-colorful",e.className]);return(()=>{const i=aa.cloneNode(!0);return(s=>t.current=s)(i),i.className=o,k(i,g(Uo,{get hsva(){return n()},onChange:r}),null),k(i,g(Go,{get hue(){return n().h},onChange:r}),null),k(i,g(sa,{get hsva(){return n()},onChange:r,className:"react-colorful__last-control"}),null),i})()},la={defaultColor:{r:0,g:0,b:0,a:1},toHsva:zo,fromHsva:Xn,equal:Jn},ua=e=>g(ca,_e(e,{colorModel:la})),fa={defaultColor:{r:0,g:0,b:0},toHsva:({r:e,g:t,b:n})=>zo({r:e,g:t,b:n,a:1}),fromHsva:e=>Zs(Xn(e)),equal:Jn},da=e=>g(oa,_e(e,{colorModel:fa}));T("<input>");Ee(["input"]);function oe(e=null){return{current:e}}function Tr(e,t){return e}function va(e){let t;const n=new Set,r=(l,u)=>{const d=typeof l=="function"?l(t):l;if(d!==t){const f=t;t=u?d:Object.assign({},t,d),n.forEach(v=>v(t,f))}},o=()=>t,i=(l,u=o,d=Object.is)=>{console.warn("[DEPRECATED] Please use `subscribeWithSelector` middleware");let f=u(t);function v(){const h=u(t);if(!d(f,h)){const m=f;l(f=h,m)}}return n.add(v),()=>n.delete(v)},c={setState:r,getState:o,subscribe:(l,u,d)=>u||d?i(l,u,d):(n.add(l),()=>n.delete(l)),destroy:()=>n.clear()};return t=e(r,o,c),c}const Cn=Symbol("store-raw"),$t=Symbol("store-node"),ha=Symbol("store-name");function Fo(e,t){let n=e[me];if(!n&&(Object.defineProperty(e,me,{value:n=new Proxy(e,ma)}),!Array.isArray(e))){const r=Object.keys(e),o=Object.getOwnPropertyDescriptors(e);for(let i=0,s=r.length;i<s;i++){const a=r[i];o[a].get&&Object.defineProperty(e,a,{enumerable:o[a].enumerable,get:o[a].get.bind(n)})}}return n}function Ft(e){let t;return e!=null&&typeof e=="object"&&(e[me]||!(t=Object.getPrototypeOf(e))||t===Object.prototype||Array.isArray(e))}function _t(e,t=new Set){let n,r,o,i;if(n=e!=null&&e[Cn])return n;if(!Ft(e)||t.has(e))return e;if(Array.isArray(e)){Object.isFrozen(e)?e=e.slice(0):t.add(e);for(let s=0,a=e.length;s<a;s++)o=e[s],(r=_t(o,t))!==o&&(e[s]=r)}else{Object.isFrozen(e)?e=Object.assign({},e):t.add(e);const s=Object.keys(e),a=Object.getOwnPropertyDescriptors(e);for(let c=0,l=s.length;c<l;c++)i=s[c],!a[i].get&&(o=e[i],(r=_t(o,t))!==o&&(e[i]=r))}return e}function Zn(e){let t=e[$t];return t||Object.defineProperty(e,$t,{value:t={}}),t}function En(e,t,n){return e[t]||(e[t]=qo(n))}function ga(e,t){const n=Reflect.getOwnPropertyDescriptor(e,t);return!n||n.get||!n.configurable||t===me||t===$t||t===ha||(delete n.value,delete n.writable,n.get=()=>e[me][t]),n}function Ko(e){if(So()){const t=Zn(e);(t._||(t._=qo()))()}}function pa(e){return Ko(e),Reflect.ownKeys(e)}function qo(e){const[t,n]=B(e,{equals:!1,internal:!0});return t.$=n,t}const ma={get(e,t,n){if(t===Cn)return e;if(t===me)return n;if(t===wn)return Ko(e),n;const r=Zn(e),o=r.hasOwnProperty(t);let i=o?r[t]():e[t];if(t===$t||t==="__proto__")return i;if(!o){const s=Object.getOwnPropertyDescriptor(e,t);So()&&(typeof i!="function"||e.hasOwnProperty(t))&&!(s&&s.get)&&(i=En(r,t,i)())}return Ft(i)?Fo(i):i},has(e,t){return t===Cn||t===me||t===wn||t===$t||t==="__proto__"?!0:(this.get(e,t,e),t in e)},set(){return!0},deleteProperty(){return!0},ownKeys:pa,getOwnPropertyDescriptor:ga};function Kt(e,t,n,r=!1){if(!r&&e[t]===n)return;const o=e[t],i=e.length;n===void 0?delete e[t]:e[t]=n;let s=Zn(e),a;(a=En(s,t,o))&&a.$(()=>n),Array.isArray(e)&&e.length!==i&&(a=En(s,"length",i))&&a.$(e.length),(a=s._)&&a.$()}function Yo(e,t){const n=Object.keys(t);for(let r=0;r<n.length;r+=1){const o=n[r];Kt(e,o,t[o])}}function ya(e,t){if(typeof t=="function"&&(t=t(e)),t=_t(t),Array.isArray(t)){if(e===t)return;let n=0,r=t.length;for(;n<r;n++){const o=t[n];e[n]!==o&&Kt(e,n,o)}Kt(e,"length",r)}else Yo(e,t)}function vt(e,t,n=[]){let r,o=e;if(t.length>1){r=t.shift();const s=typeof r,a=Array.isArray(e);if(Array.isArray(r)){for(let c=0;c<r.length;c++)vt(e,[r[c]].concat(t),n);return}else if(a&&s==="function"){for(let c=0;c<e.length;c++)r(e[c],c)&&vt(e,[c].concat(t),n);return}else if(a&&s==="object"){const{from:c=0,to:l=e.length-1,by:u=1}=r;for(let d=c;d<=l;d+=u)vt(e,[d].concat(t),n);return}else if(t.length>1){vt(e[r],t,[r].concat(n));return}o=e[r],n=[r].concat(n)}let i=t[0];typeof i=="function"&&(i=i(o,n),i===o)||r===void 0&&i==null||(i=_t(i),r===void 0||Ft(o)&&Ft(i)&&!Array.isArray(i)?Yo(o,i):Kt(e,r,i))}function Xo(...[e,t]){const n=_t(e||{}),r=Array.isArray(n),o=Fo(n);function i(...s){ns(()=>{r&&s.length===1?ya(n,s[0]):vt(n,s)})}return[o,i]}var ba=Object.defineProperty,xa=Object.defineProperties,wa=Object.getOwnPropertyDescriptors,qt=Object.getOwnPropertySymbols,Jo=Object.prototype.hasOwnProperty,Zo=Object.prototype.propertyIsEnumerable,Cr=(e,t,n)=>t in e?ba(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,E=(e,t)=>{for(var n in t||(t={}))Jo.call(t,n)&&Cr(e,n,t[n]);if(qt)for(var n of qt(t))Zo.call(t,n)&&Cr(e,n,t[n]);return e},ve=(e,t)=>xa(e,wa(t)),H=(e,t)=>{var n={};for(var r in e)Jo.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&qt)for(var r of qt(e))t.indexOf(r)<0&&Zo.call(e,r)&&(n[r]=e[r]);return n},pe;(function(e){e[e.UNSUPPORTED_INPUT=0]="UNSUPPORTED_INPUT",e[e.NO_COMPONENT_FOR_TYPE=1]="NO_COMPONENT_FOR_TYPE",e[e.UNKNOWN_INPUT=2]="UNKNOWN_INPUT",e[e.DUPLICATE_KEYS=3]="DUPLICATE_KEYS",e[e.ALREADY_REGISTERED_TYPE=4]="ALREADY_REGISTERED_TYPE",e[e.CLIPBOARD_ERROR=5]="CLIPBOARD_ERROR",e[e.THEME_ERROR=6]="THEME_ERROR",e[e.PATH_DOESNT_EXIST=7]="PATH_DOESNT_EXIST",e[e.INPUT_TYPE_OVERRIDE=8]="INPUT_TYPE_OVERRIDE",e[e.EMPTY_KEY=9]="EMPTY_KEY"})(pe||(pe={}));const $a={[0]:(e,t)=>[`An input with type \`${e}\` input was found at path \`${t}\` but it's not supported yet.`],[1]:(e,t)=>[`Type \`${e}\` found at path \`${t}\` can't be displayed in panel because no component supports it yet.`],[2]:(e,t)=>[`input at path \`${e}\` is not recognized.`,t],[3]:(e,t,n)=>[`Key \`${e}\` of path \`${t}\` already exists at path \`${n}\`. Even nested keys need to be unique. Rename one of the keys.`],[4]:e=>[`Type ${e} has already been registered. You can't register a component with the same type.`],[5]:e=>["Error copying the value",e],[6]:(e,t)=>[`Error accessing the theme \`${e}.${t}\` value.`],[7]:e=>[`Error getting the value at path \`${e}\`. There is probably an error in your \`render\` function.`],[7]:e=>[`Error accessing the value at path \`${e}\``],[8]:(e,t,n)=>[`Input at path \`${e}\` already exists with type: \`${t}\`. Its type cannot be overridden with type \`${n}\`.`],[9]:()=>["Keys can not be empty, if you want to hide a label use whitespace."]};function Qo(e,t,...n){const[r,...o]=$a[t](...n);console[e]("LEVA: "+r,...o)}const Ne=Qo.bind(null,"warn");Qo.bind(null,"log");const ei=[],qe={};function Er(e){var t=e,{value:n}=t,r=H(t,["value"]);for(let o of ei){const i=o(n,r);if(i)return i}}function ze(e,t){var n=t,{schema:r}=n,o=H(n,["schema"]);if(e in qe){Ne(pe.ALREADY_REGISTERED_TYPE,e);return}ei.push((i,s)=>r(i,s)&&e),qe[e]=o}function fn(e,t,n,r){const{normalize:o}=qe[e];if(o)return o(t,n,r);if(typeof t!="object"||!("value"in t))return{value:t};const i=t,{value:s}=i,a=H(i,["value"]);return{value:s,settings:a}}function _a(e,t,n,r,o,i){const{sanitize:s}=qe[e];return s?s(t,n,r,o,i):t}function Or(e,t,n){const{format:r}=qe[e];return r?r(t,n):t}const Ye=(e,t,n)=>e>n?n:e<t?t:e,Sa=e=>{if(e===""||typeof e=="number")return e;try{const t=Ve(e);if(!isNaN(t))return t}catch{}return parseFloat(e)},ka=Math.log(10);function Rr(e){let t=Math.abs(+String(e).replace(".",""));if(t===0)return .01;for(;t!==0&&t%10===0;)t/=10;const n=Math.floor(Math.log(t)/ka)+1,r=Math.floor(Math.log10(Math.abs(e))),o=Math.pow(10,r-n);return Math.max(o,.001)}const Yt=(e,t,n)=>n===t?0:(e-t)/(n-t),Xt=(e,t,n)=>e*(n-t)+t,Pa=()=>"_"+Math.random().toString(36).substr(2,9),Lr=/\(([0-9+\-*/^ .]+)\)/,Nr=/(\d+(?:\.\d+)?) ?\^ ?(\d+(?:\.\d+)?)/,jr=/(\d+(?:\.\d+)?) ?\* ?(\d+(?:\.\d+)?)/,Ar=/(\d+(?:\.\d+)?) ?\/ ?(\d+(?:\.\d+)?)/,Dr=/(\d+(?:\.\d+)?) ?\+ ?(\d+(?:\.\d+)?)/,Br=/(\d+(?:\.\d+)?) ?- ?(\d+(?:\.\d+)?)/;function Ve(e){if(isNaN(Number(e)))if(Lr.test(e)){const t=e.replace(Lr,(n,r)=>String(Ve(r)));return Ve(t)}else if(Nr.test(e)){const t=e.replace(Nr,(n,r,o)=>String(Math.pow(Number(r),Number(o))));return Ve(t)}else if(jr.test(e)){const t=e.replace(jr,(n,r,o)=>String(Number(r)*Number(o)));return Ve(t)}else if(Ar.test(e)){const t=e.replace(Ar,(n,r,o)=>{if(o!=0)return String(Number(r)/Number(o));throw new Error("Division by zero")});return Ve(t)}else if(Dr.test(e)){const t=e.replace(Dr,(n,r,o)=>String(Number(r)+Number(o)));return Ve(t)}else if(Br.test(e)){const t=e.replace(Br,(n,r,o)=>String(Number(r)-Number(o)));return Ve(t)}else return Number(e);return Number(e)}const ti=(...e)=>e.filter(Boolean).join(".");function Ta(e){const t=e.split(".");return[t.pop(),t.join(".")||void 0]}function Ca(e,t){return t.reduce((n,r)=>(e&&e.hasOwnProperty(r)&&(n[r]=e[r]),n),{})}function Ea(e,t){const n=E({},e);return t.forEach(r=>r in e&&delete n[r]),n}function Oa(e,t){return e.reduce((n,r,o)=>Object.assign(n,{[t[o]]:r}),{})}var ke;(function(e){e.BUTTON="BUTTON",e.BUTTON_GROUP="BUTTON_GROUP",e.MONITOR="MONITOR",e.FOLDER="FOLDER"})(ke||(ke={}));var Pe;(function(e){e.SELECT="SELECT",e.IMAGE="IMAGE",e.NUMBER="NUMBER",e.COLOR="COLOR",e.STRING="STRING",e.BOOLEAN="BOOLEAN",e.INTERVAL="INTERVAL",e.VECTOR3D="VECTOR3D",e.VECTOR2D="VECTOR2D"})(Pe||(Pe={}));function ni(e,t,n={},r){if(typeof e!="object"||Array.isArray(e))return{type:r,input:e,options:E({key:t,label:t,optional:!1,disabled:!1},n)};if("__customInput"in e){const b=e,{type:S,__customInput:O}=b,R=H(b,["type","__customInput"]);return ni(O,t,R,S)}const o=e,{render:i,label:s,optional:a,disabled:c,hint:l,onChange:u,onEditStart:d,onEditEnd:f,transient:v}=o,h=H(o,["render","label","optional","disabled","hint","onChange","onEditStart","onEditEnd","transient"]),m=E({render:i,key:t,label:s??t,hint:l,transient:v??!!u,onEditStart:d,onEditEnd:f},n);let y=h,{type:x}=y,p=H(y,["type"]);return x=r??x,x in ke?{type:x,input:p,options:m}:{type:x,input:p,options:ve(E({},m),{onChange:u,optional:a??!1,disabled:c??!1})}}function Ra(e,t,n,r){const o=ni(e,t),{type:i,input:s,options:a}=o;if(i)return i in ke?o:{type:i,input:fn(i,s,n,r),options:a};let c=Er(s);return c?{type:c,input:fn(c,s,n,r),options:a}:(c=Er({value:s}),c?{type:c,input:fn(c,{value:s},n,r),options:a}:!1)}function Mr(e,t,n,r,o){const{value:i,type:s,settings:a}=e;e.value=ri({type:s,value:i,settings:a},t,n,r),e.fromPanel=o}const Ir=function(e,t,n){this.type="LEVA_ERROR",this.message="LEVA: "+e,this.previousValue=t,this.error=n};function ri({type:e,value:t,settings:n},r,o,i){const s=e!=="SELECT"&&typeof r=="function"?r(t):r;let a;try{a=_a(e,s,n,t,o,i)}catch(c){throw new Ir(`The value \`${r}\` did not result in a correct value.`,t,c)}if(Wt(a,t))throw new Ir(`The value \`${r}\` did not result in a value update, which remained the same: \`${t}\`.
        You can ignore this warning if this is the intended behavior.`,t);return a}const La=(e,t,n=!1)=>{let r=0;return function(){const o=arguments,i=n&&!r,s=()=>e.apply(this,o);window.clearTimeout(r),r=window.setTimeout(s,t),i&&s()}};function Na(e,t){return Object.entries(Ca(e,t)).reduce((n,[,{value:r,disabled:o,key:i}])=>(n[i]=o?void 0:r,n),{})}const oi=e=>e.shiftKey?5:e.altKey?1/5:1,ja=e=>typeof e=="number"||typeof e=="string"&&!isNaN(parseFloat(e)),ii=(e,{min:t=-1/0,max:n=1/0,suffix:r})=>{const o=parseFloat(e);if(e===""||isNaN(o))throw Error("Invalid number");const i=Ye(o,t,n);return r?i+r:i},Aa=(e,{pad:t=0,suffix:n})=>{const r=parseFloat(e).toFixed(t);return n?r+n:r},si=e=>{var t=e,{value:n}=t,r=H(t,["value"]);const o=r,{min:i=-1/0,max:s=1/0}=o,a=H(o,["min","max"]),c=Ye(parseFloat(n),i,s);let l;if(!Number.isFinite(n)){const v=String(n).match(/[A-Z]+/i);v&&(l=v[0])}let u=r.step;u||(Number.isFinite(i)?Number.isFinite(s)?u=+(Math.abs(s-i)/100).toPrecision(1):u=+(Math.abs(c-i)/100).toPrecision(1):Number.isFinite(s)&&(u=+(Math.abs(s-c)/100).toPrecision(1)));const d=u?Rr(u)*10:Rr(c);u=u||d/10;const f=Math.round(Ye(Math.log10(1/d),0,2));return{value:l?c+l:c,settings:E({initialValue:c,step:u,pad:f,min:i,max:s,suffix:l},a)}},ai=(e,{step:t,initialValue:n})=>{const r=Math.round((e-n)/t);return n+r*t};var Da=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",schema:ja,sanitize:ii,format:Aa,normalize:si,sanitizeStep:ai});const ci=en({});function se(){return tn(ci)}const li=en(null),ui=en(null),fi=en(null);function Qn(){return tn(ui)}function Ba(){return tn(fi)}var A="colors",Z="sizes",w="space",Ma={gap:w,gridGap:w,columnGap:w,gridColumnGap:w,rowGap:w,gridRowGap:w,inset:w,insetBlock:w,insetBlockEnd:w,insetBlockStart:w,insetInline:w,insetInlineEnd:w,insetInlineStart:w,margin:w,marginTop:w,marginRight:w,marginBottom:w,marginLeft:w,marginBlock:w,marginBlockEnd:w,marginBlockStart:w,marginInline:w,marginInlineEnd:w,marginInlineStart:w,padding:w,paddingTop:w,paddingRight:w,paddingBottom:w,paddingLeft:w,paddingBlock:w,paddingBlockEnd:w,paddingBlockStart:w,paddingInline:w,paddingInlineEnd:w,paddingInlineStart:w,top:w,right:w,bottom:w,left:w,scrollMargin:w,scrollMarginTop:w,scrollMarginRight:w,scrollMarginBottom:w,scrollMarginLeft:w,scrollMarginX:w,scrollMarginY:w,scrollMarginBlock:w,scrollMarginBlockEnd:w,scrollMarginBlockStart:w,scrollMarginInline:w,scrollMarginInlineEnd:w,scrollMarginInlineStart:w,scrollPadding:w,scrollPaddingTop:w,scrollPaddingRight:w,scrollPaddingBottom:w,scrollPaddingLeft:w,scrollPaddingX:w,scrollPaddingY:w,scrollPaddingBlock:w,scrollPaddingBlockEnd:w,scrollPaddingBlockStart:w,scrollPaddingInline:w,scrollPaddingInlineEnd:w,scrollPaddingInlineStart:w,fontSize:"fontSizes",background:A,backgroundColor:A,backgroundImage:A,borderImage:A,border:A,borderBlock:A,borderBlockEnd:A,borderBlockStart:A,borderBottom:A,borderBottomColor:A,borderColor:A,borderInline:A,borderInlineEnd:A,borderInlineStart:A,borderLeft:A,borderLeftColor:A,borderRight:A,borderRightColor:A,borderTop:A,borderTopColor:A,caretColor:A,color:A,columnRuleColor:A,fill:A,outline:A,outlineColor:A,stroke:A,textDecorationColor:A,fontFamily:"fonts",fontWeight:"fontWeights",lineHeight:"lineHeights",letterSpacing:"letterSpacings",blockSize:Z,minBlockSize:Z,maxBlockSize:Z,inlineSize:Z,minInlineSize:Z,maxInlineSize:Z,width:Z,minWidth:Z,maxWidth:Z,height:Z,minHeight:Z,maxHeight:Z,flexBasis:Z,gridTemplateColumns:Z,gridTemplateRows:Z,borderWidth:"borderWidths",borderTopWidth:"borderWidths",borderRightWidth:"borderWidths",borderBottomWidth:"borderWidths",borderLeftWidth:"borderWidths",borderStyle:"borderStyles",borderTopStyle:"borderStyles",borderRightStyle:"borderStyles",borderBottomStyle:"borderStyles",borderLeftStyle:"borderStyles",borderRadius:"radii",borderTopLeftRadius:"radii",borderTopRightRadius:"radii",borderBottomRightRadius:"radii",borderBottomLeftRadius:"radii",boxShadow:"shadows",textShadow:"shadows",transition:"transitions",zIndex:"zIndices"},Ia=(e,t)=>typeof t=="function"?{"()":Function.prototype.toString.call(t)}:t,kt=()=>{const e=Object.create(null);return(t,n,...r)=>{const o=(i=>JSON.stringify(i,Ia))(t);return o in e?e[o]:e[o]=n(t,...r)}},Bt=Symbol.for("sxs.internal"),er=(e,t)=>Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)),Vr=e=>{for(const t in e)return!0;return!1},{hasOwnProperty:Va}=Object.prototype,On=e=>e.includes("-")?e:e.replace(/[A-Z]/g,t=>"-"+t.toLowerCase()),za=/\s+(?![^()]*\))/,tt=e=>t=>e(...typeof t=="string"?String(t).split(za):[t]),zr={appearance:e=>({WebkitAppearance:e,appearance:e}),backfaceVisibility:e=>({WebkitBackfaceVisibility:e,backfaceVisibility:e}),backdropFilter:e=>({WebkitBackdropFilter:e,backdropFilter:e}),backgroundClip:e=>({WebkitBackgroundClip:e,backgroundClip:e}),boxDecorationBreak:e=>({WebkitBoxDecorationBreak:e,boxDecorationBreak:e}),clipPath:e=>({WebkitClipPath:e,clipPath:e}),content:e=>({content:e.includes('"')||e.includes("'")||/^([A-Za-z]+\([^]*|[^]*-quote|inherit|initial|none|normal|revert|unset)$/.test(e)?e:`"${e}"`}),hyphens:e=>({WebkitHyphens:e,hyphens:e}),maskImage:e=>({WebkitMaskImage:e,maskImage:e}),maskSize:e=>({WebkitMaskSize:e,maskSize:e}),tabSize:e=>({MozTabSize:e,tabSize:e}),textSizeAdjust:e=>({WebkitTextSizeAdjust:e,textSizeAdjust:e}),userSelect:e=>({WebkitUserSelect:e,userSelect:e}),marginBlock:tt((e,t)=>({marginBlockStart:e,marginBlockEnd:t||e})),marginInline:tt((e,t)=>({marginInlineStart:e,marginInlineEnd:t||e})),maxSize:tt((e,t)=>({maxBlockSize:e,maxInlineSize:t||e})),minSize:tt((e,t)=>({minBlockSize:e,minInlineSize:t||e})),paddingBlock:tt((e,t)=>({paddingBlockStart:e,paddingBlockEnd:t||e})),paddingInline:tt((e,t)=>({paddingInlineStart:e,paddingInlineEnd:t||e}))},dn=/([\d.]+)([^]*)/,Ga=(e,t)=>e.length?e.reduce((n,r)=>(n.push(...t.map(o=>o.includes("&")?o.replace(/&/g,/[ +>|~]/.test(r)&&/&.*&/.test(o)?`:is(${r})`:r):r+" "+o)),n),[]):t,Ua=(e,t)=>e in Wa&&typeof t=="string"?t.replace(/^((?:[^]*[^\w-])?)(fit-content|stretch)((?:[^\w-][^]*)?)$/,(n,r,o,i)=>r+(o==="stretch"?`-moz-available${i};${On(e)}:${r}-webkit-fill-available`:`-moz-fit-content${i};${On(e)}:${r}fit-content`)+i):String(t),Wa={blockSize:1,height:1,inlineSize:1,maxBlockSize:1,maxHeight:1,maxInlineSize:1,maxWidth:1,minBlockSize:1,minHeight:1,minInlineSize:1,minWidth:1,width:1},Ae=e=>e?e+"-":"",di=(e,t,n)=>e.replace(/([+-])?((?:\d+(?:\.\d*)?|\.\d+)(?:[Ee][+-]?\d+)?)?(\$|--)([$\w-]+)/g,(r,o,i,s,a)=>s=="$"==!!i?r:(o||s=="--"?"calc(":"")+"var(--"+(s==="$"?Ae(t)+(a.includes("$")?"":Ae(n))+a.replace(/\$/g,"-"):a)+")"+(o||s=="--"?"*"+(o||"")+(i||"1")+")":"")),Ha=/\s*,\s*(?![^()]*\))/,Fa=Object.prototype.toString,rt=(e,t,n,r,o)=>{let i,s,a;const c=(l,u,d)=>{let f,v;const h=m=>{for(f in m){const p=f.charCodeAt(0)===64,b=p&&Array.isArray(m[f])?m[f]:[m[f]];for(v of b){const S=/[A-Z]/.test(x=f)?x:x.replace(/-[^]/g,R=>R[1].toUpperCase()),O=typeof v=="object"&&v&&v.toString===Fa&&(!r.utils[S]||!u.length);if(S in r.utils&&!O){const R=r.utils[S];if(R!==s){s=R,h(R(v)),s=null;continue}}else if(S in zr){const R=zr[S];if(R!==a){a=R,h(R(v)),a=null;continue}}if(p&&(y=f.slice(1)in r.media?"@media "+r.media[f.slice(1)]:f,f=y.replace(/\(\s*([\w-]+)\s*(=|<|<=|>|>=)\s*([\w-]+)\s*(?:(<|<=|>|>=)\s*([\w-]+)\s*)?\)/g,(R,G,j,L,N,M)=>{const z=dn.test(G),X=.0625*(z?-1:1),[le,ue]=z?[L,G]:[G,L];return"("+(j[0]==="="?"":j[0]===">"===z?"max-":"min-")+le+":"+(j[0]!=="="&&j.length===1?ue.replace(dn,(ye,ge,be)=>Number(ge)+X*(j===">"?1:-1)+be):ue)+(N?") and ("+(N[0]===">"?"min-":"max-")+le+":"+(N.length===1?M.replace(dn,(ye,ge,be)=>Number(ge)+X*(N===">"?-1:1)+be):M):"")+")"})),O){const R=p?d.concat(f):[...d],G=p?[...u]:Ga(u,f.split(Ha));i!==void 0&&o(Gr(...i)),i=void 0,c(v,G,R)}else i===void 0&&(i=[[],u,d]),f=p||f.charCodeAt(0)!==36?f:`--${Ae(r.prefix)}${f.slice(1).replace(/\$/g,"-")}`,v=O?v:typeof v=="number"?v&&S in Ka?String(v)+"px":String(v):di(Ua(S,v??""),r.prefix,r.themeMap[S]),i[0].push(`${p?`${f} `:`${On(f)}:`}${v}`)}}var y,x};h(l),i!==void 0&&o(Gr(...i)),i=void 0};c(e,t,n)},Gr=(e,t,n)=>`${n.map(r=>`${r}{`).join("")}${t.length?`${t.join(",")}{`:""}${e.join(";")}${t.length?"}":""}${Array(n.length?n.length+1:0).join("}")}`,Ka={animationDelay:1,animationDuration:1,backgroundSize:1,blockSize:1,border:1,borderBlock:1,borderBlockEnd:1,borderBlockEndWidth:1,borderBlockStart:1,borderBlockStartWidth:1,borderBlockWidth:1,borderBottom:1,borderBottomLeftRadius:1,borderBottomRightRadius:1,borderBottomWidth:1,borderEndEndRadius:1,borderEndStartRadius:1,borderInlineEnd:1,borderInlineEndWidth:1,borderInlineStart:1,borderInlineStartWidth:1,borderInlineWidth:1,borderLeft:1,borderLeftWidth:1,borderRadius:1,borderRight:1,borderRightWidth:1,borderSpacing:1,borderStartEndRadius:1,borderStartStartRadius:1,borderTop:1,borderTopLeftRadius:1,borderTopRightRadius:1,borderTopWidth:1,borderWidth:1,bottom:1,columnGap:1,columnRule:1,columnRuleWidth:1,columnWidth:1,containIntrinsicSize:1,flexBasis:1,fontSize:1,gap:1,gridAutoColumns:1,gridAutoRows:1,gridTemplateColumns:1,gridTemplateRows:1,height:1,inlineSize:1,inset:1,insetBlock:1,insetBlockEnd:1,insetBlockStart:1,insetInline:1,insetInlineEnd:1,insetInlineStart:1,left:1,letterSpacing:1,margin:1,marginBlock:1,marginBlockEnd:1,marginBlockStart:1,marginBottom:1,marginInline:1,marginInlineEnd:1,marginInlineStart:1,marginLeft:1,marginRight:1,marginTop:1,maxBlockSize:1,maxHeight:1,maxInlineSize:1,maxWidth:1,minBlockSize:1,minHeight:1,minInlineSize:1,minWidth:1,offsetDistance:1,offsetRotate:1,outline:1,outlineOffset:1,outlineWidth:1,overflowClipMargin:1,padding:1,paddingBlock:1,paddingBlockEnd:1,paddingBlockStart:1,paddingBottom:1,paddingInline:1,paddingInlineEnd:1,paddingInlineStart:1,paddingLeft:1,paddingRight:1,paddingTop:1,perspective:1,right:1,rowGap:1,scrollMargin:1,scrollMarginBlock:1,scrollMarginBlockEnd:1,scrollMarginBlockStart:1,scrollMarginBottom:1,scrollMarginInline:1,scrollMarginInlineEnd:1,scrollMarginInlineStart:1,scrollMarginLeft:1,scrollMarginRight:1,scrollMarginTop:1,scrollPadding:1,scrollPaddingBlock:1,scrollPaddingBlockEnd:1,scrollPaddingBlockStart:1,scrollPaddingBottom:1,scrollPaddingInline:1,scrollPaddingInlineEnd:1,scrollPaddingInlineStart:1,scrollPaddingLeft:1,scrollPaddingRight:1,scrollPaddingTop:1,shapeMargin:1,textDecoration:1,textDecorationThickness:1,textIndent:1,textUnderlineOffset:1,top:1,transitionDelay:1,transitionDuration:1,verticalAlign:1,width:1,wordSpacing:1},Ur=e=>String.fromCharCode(e+(e>25?39:97)),Fe=e=>(t=>{let n,r="";for(n=Math.abs(t);n>52;n=n/52|0)r=Ur(n%52)+r;return Ur(n%52)+r})(((t,n)=>{let r=n.length;for(;r;)t=33*t^n.charCodeAt(--r);return t})(5381,JSON.stringify(e))>>>0),ht=["themed","global","styled","onevar","resonevar","allvar","inline"],qa=e=>{if(e.href&&!e.href.startsWith(location.origin))return!1;try{return e.cssRules,!0}catch{return!1}},Ya=e=>{let t;const n=()=>{if(t){const{rules:s,sheet:a}=t;if(!a.deleteRule){for(;Object(Object(a.cssRules)[0]).type===3;)a.cssRules.splice(0,1);a.cssRules=[]}for(const c in s)delete s[c]}const r=Object(e).styleSheets||[];for(const s of r)if(qa(s)){for(let a=0,c=s.cssRules;c[a];++a){const l=Object(c[a]);if(l.type!==1)continue;const u=Object(c[a+1]);if(u.type!==4)continue;++a;const{cssText:d}=l;if(!d.startsWith("--sxs"))continue;const f=d.slice(14,-3).trim().split(/\s+/),v=ht[f[0]];v&&(t||(t={sheet:s,reset:n,rules:{}}),t.rules[v]={group:u,index:a,cache:new Set(f)})}if(t)break}if(!t){const s=(a,c)=>({type:c,cssRules:[],insertRule(l,u){this.cssRules.splice(u,0,s(l,{import:3,undefined:1}[(l.toLowerCase().match(/^@([a-z]+)/)||[])[1]]||4))},get cssText(){return a==="@media{}"?`@media{${[].map.call(this.cssRules,l=>l.cssText).join("")}}`:a}});t={sheet:e?(e.head||e).appendChild(document.createElement("style")).sheet:s("","text/css"),rules:{},reset:n,toString(){const{cssRules:a}=t.sheet;return[].map.call(a,(c,l)=>{const{cssText:u}=c;let d="";if(u.startsWith("--sxs"))return"";if(a[l-1]&&(d=a[l-1].cssText).startsWith("--sxs")){if(!c.cssRules.length)return"";for(const f in t.rules)if(t.rules[f].group===c)return`--sxs{--sxs:${[...t.rules[f].cache].join(" ")}}${u}`;return c.cssRules.length?`${d}${u}`:""}return u}).join("")}}}const{sheet:o,rules:i}=t;for(let s=ht.length-1;s>=0;--s){const a=ht[s];if(!i[a]){const c=ht[s+1],l=i[c]?i[c].index:o.cssRules.length;o.insertRule("@media{}",l),o.insertRule(`--sxs{--sxs:${s}}`,l),i[a]={group:o.cssRules[l+1],index:l,cache:new Set([s])}}Xa(i[a])}};return n(),t},Xa=e=>{const t=e.group;let n=t.cssRules.length;e.apply=r=>{try{t.insertRule(r,n),++n}catch{}}},ut=Symbol(),Ja=kt(),Za=(e,t)=>Ja(e,()=>(...n)=>{let r={type:null,composers:new Set};for(const o of n)if(o!=null)if(o[Bt]){r.type==null&&(r.type=o[Bt].type);for(const i of o[Bt].composers)r.composers.add(i)}else o.constructor!==Object||o.$$typeof?r.type==null&&(r.type=o):r.composers.add(Qa(o,e));return r.type==null&&(r.type="span"),r.composers.size||r.composers.add(["PJLV",{},[],[],{},[]]),ec(e,r,t)}),Qa=(e,t)=>{var n=e,{variants:r,compoundVariants:o,defaultVariants:i}=n,s=H(n,["variants","compoundVariants","defaultVariants"]);const a=`${Ae(t.prefix)}c-${Fe(s)}`,c=[],l=[],u=Object.create(null),d=[];for(const h in i)u[h]=String(i[h]);if(typeof r=="object"&&r)for(const h in r){f=u,v=h,Va.call(f,v)||(u[h]="undefined");const m=r[h];for(const y in m){const x={[h]:String(y)};String(y)==="undefined"&&d.push(h);const p=m[y],b=[x,p,!Vr(p)];c.push(b)}}var f,v;if(typeof o=="object"&&o)for(const h of o){let m=h,{css:y}=m,x=H(m,["css"]);y=typeof y=="object"&&y||{};for(const b in x)x[b]=String(x[b]);const p=[x,y,!Vr(y)];l.push(p)}return[a,s,c,l,u,d]},ec=(e,t,n)=>{const[r,o,i,s]=tc(t.composers),a=typeof t.type=="function"||t.type.$$typeof?(d=>{function f(){for(let v=0;v<f[ut].length;v++){const[h,m]=f[ut][v];d.rules[h].apply(m)}return f[ut]=[],null}return f[ut]=[],f.rules={},ht.forEach(v=>f.rules[v]={apply:h=>f[ut].push([v,h])}),f})(n):null,c=(a||n).rules,l=`.${r}${o.length>1?`:where(.${o.slice(1).join(".")})`:""}`,u=d=>{d=typeof d=="object"&&d||nc;const f=d,{css:v}=f,h=H(f,["css"]),m={};for(const p in i)if(delete h[p],p in d){let b=d[p];typeof b=="object"&&b?m[p]=E({"@initial":i[p]},b):(b=String(b),m[p]=b!=="undefined"||s.has(p)?b:i[p])}else m[p]=i[p];const y=new Set([...o]);for(const[p,b,S,O]of t.composers){n.rules.styled.cache.has(p)||(n.rules.styled.cache.add(p),rt(b,[`.${p}`],[],e,j=>{c.styled.apply(j)}));const R=Wr(S,m,e.media),G=Wr(O,m,e.media,!0);for(const j of R)if(j!==void 0)for(const[L,N,M]of j){const z=`${p}-${Fe(N)}-${L}`;y.add(z);const X=(M?n.rules.resonevar:n.rules.onevar).cache,le=M?c.resonevar:c.onevar;X.has(z)||(X.add(z),rt(N,[`.${z}`],[],e,ue=>{le.apply(ue)}))}for(const j of G)if(j!==void 0)for(const[L,N]of j){const M=`${p}-${Fe(N)}-${L}`;y.add(M),n.rules.allvar.cache.has(M)||(n.rules.allvar.cache.add(M),rt(N,[`.${M}`],[],e,z=>{c.allvar.apply(z)}))}}if(typeof v=="object"&&v){const p=`${r}-i${Fe(v)}-css`;y.add(p),n.rules.inline.cache.has(p)||(n.rules.inline.cache.add(p),rt(v,[`.${p}`],[],e,b=>{c.inline.apply(b)}))}for(const p of String(d.className||"").trim().split(/\s+/))p&&y.add(p);const x=h.className=[...y].join(" ");return{type:t.type,className:x,selector:l,props:h,toString:()=>x,deferredInjector:a}};return er(u,{className:r,selector:l,[Bt]:t,toString:()=>(n.rules.styled.cache.has(r)||u(),r)})},tc=e=>{let t="";const n=[],r={},o=[];for(const[i,,,,s,a]of e){t===""&&(t=i),n.push(i),o.push(...a);for(const c in s){const l=s[c];(r[c]===void 0||l!=="undefined"||a.includes(l))&&(r[c]=l)}}return[t,n,r,new Set(o)]},Wr=(e,t,n,r)=>{const o=[];e:for(let[i,s,a]of e){if(a)continue;let c,l=0,u=!1;for(c in i){const d=i[c];let f=t[c];if(f!==d){if(typeof f!="object"||!f)continue e;{let v,h,m=0;for(const y in f){if(d===String(f[y])){if(y!=="@initial"){const x=y.slice(1);(h=h||[]).push(x in n?n[x]:y.replace(/^@media ?/,"")),u=!0}l+=m,v=!0}++m}if(h&&h.length&&(s={["@media "+h.join(", ")]:s}),!v)continue e}}}(o[l]=o[l]||[]).push([r?"cv":`${c}-${i[c]}`,s,u])}return o},nc={},rc=kt(),oc=(e,t)=>rc(e,()=>(...n)=>{const r=()=>{for(let o of n){o=typeof o=="object"&&o||{};let i=Fe(o);if(!t.rules.global.cache.has(i)){if(t.rules.global.cache.add(i),"@import"in o){let s=[].indexOf.call(t.sheet.cssRules,t.rules.themed.group)-1;for(let a of[].concat(o["@import"]))a=a.includes('"')||a.includes("'")?a:`"${a}"`,t.sheet.insertRule(`@import ${a};`,s++);delete o["@import"]}rt(o,[],[],e,s=>{t.rules.global.apply(s)})}}return""};return er(r,{toString:r})}),ic=kt(),sc=(e,t)=>ic(e,()=>n=>{const r=`${Ae(e.prefix)}k-${Fe(n)}`,o=()=>{if(!t.rules.global.cache.has(r)){t.rules.global.cache.add(r);const i=[];rt(n,[],[],e,a=>i.push(a));const s=`@keyframes ${r}{${i.join("")}}`;t.rules.global.apply(s)}return r};return er(o,{get name(){return o()},toString:o})}),ac=class{constructor(e,t,n,r){this.token=e==null?"":String(e),this.value=t==null?"":String(t),this.scale=n==null?"":String(n),this.prefix=r==null?"":String(r)}get computedValue(){return"var("+this.variable+")"}get variable(){return"--"+Ae(this.prefix)+Ae(this.scale)+this.token}toString(){return this.computedValue}},cc=kt(),lc=(e,t)=>cc(e,()=>(n,r)=>{r=typeof n=="object"&&n||Object(r);const o=`.${n=(n=typeof n=="string"?n:"")||`${Ae(e.prefix)}t-${Fe(r)}`}`,i={},s=[];for(const c in r){i[c]={};for(const l in r[c]){const u=`--${Ae(e.prefix)}${c}-${l}`,d=di(String(r[c][l]),e.prefix,c);i[c][l]=new ac(l,d,c,e.prefix),s.push(`${u}:${d}`)}}const a=()=>{if(s.length&&!t.rules.themed.cache.has(n)){t.rules.themed.cache.add(n);const c=`${r===e.theme?":root,":""}.${n}{${s.join(";")}}`;t.rules.themed.apply(c)}return n};return ve(E({},i),{get className(){return a()},selector:o,toString:a})}),uc=kt(),fc=e=>{let t=!1;const n=uc(e,r=>{t=!0;const o="prefix"in(r=typeof r=="object"&&r||{})?String(r.prefix):"",i=typeof r.media=="object"&&r.media||{},s=typeof r.root=="object"?r.root||null:globalThis.document||null,a=typeof r.theme=="object"&&r.theme||{},c={prefix:o,media:i,theme:a,themeMap:typeof r.themeMap=="object"&&r.themeMap||E({},Ma),utils:typeof r.utils=="object"&&r.utils||{}},l=Ya(s),u={css:Za(c,l),globalCss:oc(c,l),keyframes:sc(c,l),createTheme:lc(c,l),reset(){l.reset(),u.theme.toString()},theme:{},sheet:l,config:c,prefix:o,getCssText:l.toString,toString:l.toString};return String(u.theme=u.createTheme(a)),u});return t||n.reset(),n};const vi=()=>({colors:{elevation1:"#292d39",elevation2:"#181c20",elevation3:"#373c4b",accent1:"#0066dc",accent2:"#007bff",accent3:"#3c93ff",highlight1:"#535760",highlight2:"#8c92a4",highlight3:"#fefefe",vivid1:"#ffcc00",folderWidgetColor:"$highlight2",folderTextColor:"$highlight3",toolTipBackground:"$highlight3",toolTipText:"$elevation2"},radii:{xs:"2px",sm:"3px",lg:"10px"},space:{xs:"3px",sm:"6px",md:"10px",rowGap:"7px",colGap:"7px"},fonts:{mono:"ui-monospace, SFMono-Regular, Menlo, 'Roboto Mono', monospace",sans:"system-ui, sans-serif"},fontSizes:{root:"11px",toolTip:"$root"},sizes:{rootWidth:"280px",controlWidth:"160px",numberInputMinWidth:"38px",scrubberWidth:"8px",scrubberHeight:"16px",rowHeight:"24px",folderTitleHeight:"20px",checkboxSize:"16px",joystickWidth:"100px",joystickHeight:"100px",colorPickerWidth:"$controlWidth",colorPickerHeight:"100px",imagePreviewWidth:"$controlWidth",imagePreviewHeight:"100px",monitorHeight:"60px",titleBarHeight:"39px"},shadows:{level1:"0 0 9px 0 #00000088",level2:"0 4px 14px #00000033"},borderWidths:{root:"0px",input:"1px",focus:"1px",hover:"1px",active:"1px",folder:"1px"},fontWeights:{label:"normal",folder:"normal",button:"normal"}});function Nt(e,t){const[n,r]=e.split(" "),o={};return n!=="none"&&(o.boxShadow=`${t.inset?"inset ":""}0 0 0 $borderWidths${[t.key]} $colors${n!=="default"&&n||t.borderColor}`),r&&(o.backgroundColor=r),o}const ft={$inputStyle:()=>e=>Nt(e,{key:"$input",borderColor:"$highlight1",inset:!0}),$focusStyle:()=>e=>Nt(e,{key:"$focus",borderColor:"$accent2"}),$hoverStyle:()=>e=>Nt(e,{key:"$hover",borderColor:"$accent1",inset:!0}),$activeStyle:()=>e=>Nt(e,{key:"$active",borderColor:"$accent1",inset:!0})},{css:C,createTheme:dc,globalCss:vc,keyframes:Rd}=fc({prefix:"leva",theme:vi(),utils:ve(E({},ft),{$flex:()=>({display:"flex",alignItems:"center"}),$flexCenter:()=>({display:"flex",alignItems:"center",justifyContent:"center"}),$reset:()=>({outline:"none",fontSize:"inherit",fontWeight:"inherit",color:"inherit",fontFamily:"inherit",border:"none",backgroundColor:"transparent",appearance:"none"}),$draggable:()=>({touchAction:"none",WebkitUserDrag:"none",userSelect:"none"}),$focus:e=>({"&:focus":ft.$focusStyle()(e)}),$focusWithin:e=>({"&:focus-within":ft.$focusStyle()(e)}),$hover:e=>({"&:hover":ft.$hoverStyle()(e)}),$active:e=>({"&:active":ft.$activeStyle()(e)})})}),hc=vc({".panel__dragged":{WebkitUserDrag:"none",userSelect:"none",input:{userSelect:"none"},"*":{cursor:"ew-resize !important"}}});hc();function gc(e){const t=vi();if(!e)return{theme:t,className:""};Object.keys(e).forEach(r=>{Object.assign(t[r],e[r])});const n=dc(e);return{theme:t,className:n}}function at(e,t){const{theme:n}=tn(li);if(!(e in n)||!(t in n[e]))return Ne(pe.THEME_ERROR,e,t),"";let r=t;for(;;){let o=n[e][r];if(typeof o=="string"&&o.charAt(0)==="$")r=o.substr(1);else return o}}const hi=C({$reset:"",padding:"0 $sm",width:0,minWidth:0,flex:1,variants:{levaType:{number:{textAlign:"right"}}}}),pc=C({$draggable:"",height:"100%",$flexCenter:"",position:"relative",padding:"0 $xs",fontSize:"0.8em",opacity:.8,cursor:"default",[`& + ${hi}`]:{paddingLeft:0}}),mc=C({cursor:"ew-resize",marginRight:"-$xs",textTransform:"uppercase",opacity:.3,"&:hover":{opacity:1},variants:{dragging:{true:{backgroundColor:"$accent2",opacity:1}}}}),yc=C({$flex:"",position:"relative",borderRadius:"$sm",overflow:"hidden",color:"inherit",height:"$rowHeight",backgroundColor:"$elevation3",$inputStyle:"$elevation1",$hover:"",$focusWithin:""}),bc=T('<div><label></label><input type="text" autocomplete="off" spell-check="false"></div>');function tr(e){const{id:t,emitOnEditStart:n,emitOnEditEnd:r}=se(),o=e.id||t;let i;const s=c=>l=>{const u=l.currentTarget.value;c(u)};I(()=>{const c=i,l=s(u=>{e.onUpdate(u)});return c?.addEventListener("blur",l),()=>c?.removeEventListener("blur",l)},[s,e.onUpdate,r]);const a=c=>{c.key==="Enter"&&s(e.onUpdate)(c)};return(()=>{const c=bc.cloneNode(!0),l=c.firstChild,u=l.nextSibling;k(l,()=>e.innerLabel),pt(u,"keydown",e.onKeyDown,!0),u.addEventListener("keypress",a),u.addEventListener("change",f=>{e.onUpdate(f.currentTarget.value)}),u.$$input=f=>{e.onChange(f.currentTarget.value)};const d=i;return typeof d=="function"?d(u):i=u,ce(u,"id",o),_(f=>{const v=yc(),h=pc(),m=hi({levaType:e.type}),y=e.value;return v!==f._v$&&(c.className=f._v$=v),h!==f._v$2&&(l.className=f._v$2=h),m!==f._v$3&&(u.className=f._v$3=m),y!==f._v$4&&(u.value=f._v$4=y),f},{_v$:void 0,_v$2:void 0,_v$3:void 0,_v$4:void 0}),c})()}function xc(e){return g(tr,{get value(){return e.value},get onChange(){return e.onChange},onUpdate:r=>e.onUpdate(Sa(r)),onKeyDown:r=>{const o=r.key==="ArrowUp"?1:r.key==="ArrowDown"?-1:0;if(o){r.preventDefault();const i=r.altKey?.1:r.shiftKey?10:1;e.onUpdate(s=>parseFloat(s)+o*i)}},get innerLabel(){return e.innerLabel}})}Ee(["input","keydown"]);const Jt=C({}),Rn=C({position:"relative",background:"$elevation2",transition:"height 300ms ease",variants:{fill:{true:{},false:{}},flat:{false:{},true:{}},isRoot:{true:{},false:{paddingLeft:"$md","&::after":{content:'""',position:"absolute",left:0,top:0,width:"$borderWidths$folder",height:"100%",backgroundColor:"$folderWidgetColor",opacity:.4,transform:"translateX(-50%)"}}}},compoundVariants:[{isRoot:!0,fill:!1,css:{overflowY:"auto",maxHeight:"calc(100vh - 20px - $$titleBarHeight)"}},{isRoot:!0,flat:!1,css:{borderRadius:"$lg"}}]}),wc=C({$flex:"",color:"$folderTextColor",userSelect:"none",cursor:"pointer",height:"$folderTitleHeight",fontWeight:"$folder","> svg":{marginLeft:-4,marginRight:4,cursor:"pointer",fill:"$folderWidgetColor",opacity:.6},"&:hover > svg":{fill:"$folderWidgetColor"},[`&:hover + ${Rn}::after`]:{opacity:.6},[`${Jt}:hover > & + ${Rn}::after`]:{opacity:.6},[`${Jt}:hover > & > svg`]:{opacity:1}}),gi=C({position:"relative",display:"grid",gridTemplateColumns:"100%",rowGap:"$rowGap",variants:{toggled:{true:{opacity:1,transitionDelay:"0ms"},false:{opacity:0,transitionDelay:"0ms",pointerEvents:"none"}},isRoot:{true:{"& > div":{paddingLeft:"$md",paddingRight:"$md"},"& > div:first-of-type":{paddingTop:"$sm"},"& > div:last-of-type":{paddingBottom:"$sm"},[`> ${Jt}:not(:first-of-type)`]:{paddingTop:"$sm",marginTop:"$md",borderTop:"$borderWidths$folder solid $colors$elevation1"}}}}}),pi=C({position:"relative",zIndex:100,display:"grid",rowGap:"$rowGap",gridTemplateRows:"minmax($sizes$rowHeight, max-content)",alignItems:"center",color:"$highlight2",[`${gi} > &`]:{"&:first-of-type":{marginTop:"$rowGap"},"&:last-of-type":{marginBottom:"$rowGap"}},"&:hover,&:focus-within":{color:"$highlight3"}}),mi=C(pi,{gridTemplateColumns:"auto $sizes$controlWidth",columnGap:"$colGap"}),$c=C({$flex:"",height:"100%",position:"relative",overflow:"hidden","& > div":{marginLeft:"$colGap",padding:"0 $xs",opacity:.4},"& > div:hover":{opacity:.8},"& > div > svg":{display:"none",cursor:"pointer",width:13,minWidth:13,height:13,backgroundColor:"$elevation2"},"&:hover > div > svg":{display:"block"},variants:{align:{top:{height:"100%",alignItems:"flex-start",paddingTop:"$sm"}}}}),_c=C({$reset:"",height:0,width:0,opacity:0,margin:0,"& + label":{position:"relative",$flexCenter:"",height:"100%",userSelect:"none",cursor:"pointer",paddingLeft:2,paddingRight:"$sm",pointerEvents:"auto"},"& + label:after":{content:'""',width:6,height:6,backgroundColor:"$elevation3",borderRadius:"50%",$activeStyle:""},"&:focus + label:after":{$focusStyle:""},"& + label:active:after":{backgroundColor:"$accent1",$focusStyle:""},"&:checked + label:after":{backgroundColor:"$accent1"}}),Sc=C({opacity:1,variants:{disabled:{true:{opacity:.6,pointerEvents:"none"}}}});C({fontWeight:"$label",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap","& > svg":{display:"block"}});const kc=C({position:"fixed",top:0,bottom:0,right:0,left:0,zIndex:1e3,userSelect:"none"});C({background:"$toolTipBackground",fontFamily:"$sans",fontSize:"$toolTip",padding:"$xs $sm",color:"$toolTipText",borderRadius:"$xs",boxShadow:"$level2",maxWidth:260});C({fill:"$toolTipBackground"});const Pc=T('<input type="checkbox">'),Ln=T("<label></label>"),Hr=T("<div></div>"),Tc=T('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"></path><path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"></path></svg>'),Cc=T('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path><path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>');function Ec(){const{id:e,disable:t,disabled:n}=se();return[(()=>{const r=Pc.cloneNode(!0);return r.addEventListener("change",()=>t(!n)),ce(r,"id",e+"__disable"),r.checked=!n,_(()=>r.className=_c()),r})(),(()=>{const r=Ln.cloneNode(!0);return ce(r,"for",e+"__disable"),r})()]}function Oc(e){const{id:t,optional:n,hint:r}=se();return e.htmlFor,[n&&g(Ec,{}),r!==void 0?(()=>{const o=Ln.cloneNode(!0);return Ke(o,e,!1,!1),o})():(()=>{const o=Ln.cloneNode(!0);return Ke(o,e,!1,!1),o})()]}function Be(e){const{value:t,label:n,key:r}=se(),{hideCopyButton:o}=Ba(),i=!o&&r!==void 0,[s,a]=B(!1),c=async()=>{try{await navigator.clipboard.writeText(JSON.stringify({[r]:t??""})),a(!0)}catch{Ne(pe.CLIPBOARD_ERROR,{[r]:t})}};return(()=>{const l=Hr.cloneNode(!0);return l.addEventListener("pointerleave",()=>a(!1)),k(l,g(Oc,e),null),k(l,i&&(()=>{const u=Hr.cloneNode(!0);return ce(u,"title",`Click to copy ${typeof n=="string"?n:r} value`),k(u,(()=>{const d=D(()=>!s(),!0);return()=>d()?(()=>{const f=Tc.cloneNode(!0);return f.$$click=c,f})():Cc.cloneNode(!0)})()),u})(),null),_(()=>l.className=$c({align:e.align})),l})()}Ee(["click"]);const Rc=T('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9 5"><path d="M3.8 4.4c.4.3 1 .3 1.4 0L8 1.7A1 1 0 007.4 0H1.6a1 1 0 00-.7 1.7l3 2.7z"></path></svg>'),Lc=C({fill:"currentColor",width:"1em",height:"1em",transition:"transform 350ms ease, fill 250ms ease"});function nr(e){return(()=>{const t=Rc.cloneNode(!0);return Ke(t,e,!0,!0),_(n=>{const r=Lc(),o="rotate("+(e.toggled?"0deg":"-90deg")+")";return r!==n._v$&&ce(t,"class",n._v$=r),o!==n._v$2&&t.style.setProperty("transform",n._v$2=o),n},{_v$:void 0,_v$2:void 0}),t})()}const Fr=T("<div></div>");function Oe(e){return g(Ce,{get when(){return!e.input},get fallback(){return(()=>{const t=Fr.cloneNode(!0);return k(t,()=>e.children),_(()=>t.className=mi()),t})()},get children(){const t=Fr.cloneNode(!0);return k(t,()=>e.children),_(()=>t.className=pi()),t}})}const Nc=C({variants:{hasRange:{true:{position:"relative",display:"grid",gridTemplateColumns:"auto $sizes$numberInputMinWidth",columnGap:"$colGap",alignItems:"center"}}}}),yi=C({position:"relative",width:"100%",height:2,borderRadius:"$xs",backgroundColor:"$elevation1"}),Nn=C({position:"absolute",width:"$scrubberWidth",height:"$scrubberHeight",borderRadius:"$xs",boxShadow:"0 0 0 2px $colors$elevation2",backgroundColor:"$accent2",cursor:"pointer",$active:"none $accent1",$hover:"none $accent3",variants:{position:{left:{borderTopRightRadius:0,borderBottomRightRadius:0,transform:"translateX(calc(-0.5 * ($sizes$scrubberWidth + 4px)))"},right:{borderTopLeftRadius:0,borderBottomLeftRadius:0,transform:"translateX(calc(0.5 * ($sizes$scrubberWidth + 4px)))"}}}}),bi=C({position:"relative",$flex:"",height:"100%",cursor:"pointer",touchAction:"none"}),xi=C({position:"absolute",height:"100%",backgroundColor:"$accent2"});function jc(e,t,n){return Math.max(t,Math.min(e,n))}const ee={toVector(e,t){return e===void 0&&(e=t),Array.isArray(e)?e:[e,e]},add(e,t){return[e[0]+t[0],e[1]+t[1]]},sub(e,t){return[e[0]-t[0],e[1]-t[1]]},addTo(e,t){e[0]+=t[0],e[1]+=t[1]},subTo(e,t){e[0]-=t[0],e[1]-=t[1]}};function Kr(e,t,n){return t===0||Math.abs(t)===1/0?Math.pow(e,n*5):e*t*n/(t+n*e)}function qr(e,t,n,r=.15){return r===0?jc(e,t,n):e<t?-Kr(t-e,n-t,r)+t:e>n?+Kr(e-n,n-t,r)+n:e}function Ac(e,[t,n],[r,o]){const[[i,s],[a,c]]=e;return[qr(t,i,s,r),qr(n,a,c,o)]}function re(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function Yr(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),n.push.apply(n,r)}return n}function q(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?Yr(Object(n),!0).forEach(function(r){re(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Yr(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}const wi={pointer:{start:"down",change:"move",end:"up"},mouse:{start:"down",change:"move",end:"up"},touch:{start:"start",change:"move",end:"end"},gesture:{start:"start",change:"change",end:"end"}};function Xr(e){return e?e[0].toUpperCase()+e.slice(1):""}function Dc(e,t="",n=!1){const r=wi[e],o=r&&r[t]||t;return"on"+Xr(e)+Xr(o)+(n?"Capture":"")}function Bc(e,t=""){const n=wi[e],r=n&&n[t]||t;return e+r}function rr(e){return"touches"in e}function Mc(e){return Array.from(e.touches).filter(t=>{var n,r;return t.target===e.currentTarget||((n=e.currentTarget)===null||n===void 0||(r=n.contains)===null||r===void 0?void 0:r.call(n,t.target))})}function Ic(e){return e.type==="touchend"?e.changedTouches:e.targetTouches}function $i(e){return rr(e)?Ic(e)[0]:e}function Vc(e){return Mc(e).map(t=>t.identifier)}function vn(e){const t=$i(e);return rr(e)?t.identifier:t.pointerId}function Jr(e){const t=$i(e);return[t.clientX,t.clientY]}function zc(e){const t={};if("buttons"in e&&(t.buttons=e.buttons),"shiftKey"in e){const{shiftKey:n,altKey:r,metaKey:o,ctrlKey:i}=e;Object.assign(t,{shiftKey:n,altKey:r,metaKey:o,ctrlKey:i})}return t}function Zt(e,...t){return typeof e=="function"?e(...t):e}function Gc(){}function Uc(...e){return e.length===0?Gc:e.length===1?e[0]:function(){let t;for(const n of e)t=n.apply(this,arguments)||t;return t}}function Zr(e,t){return Object.assign({},t,e||{})}const Wc=32;class Hc{constructor(t,n,r){this.ctrl=t,this.args=n,this.key=r,this.state||(this.state={},this.computeValues([0,0]),this.computeInitial(),this.init&&this.init(),this.reset())}get state(){return this.ctrl.state[this.key]}set state(t){this.ctrl.state[this.key]=t}get shared(){return this.ctrl.state.shared}get eventStore(){return this.ctrl.gestureEventStores[this.key]}get timeoutStore(){return this.ctrl.gestureTimeoutStores[this.key]}get config(){return this.ctrl.config[this.key]}get sharedConfig(){return this.ctrl.config.shared}get handler(){return this.ctrl.handlers[this.key]}reset(){const{state:t,shared:n,ingKey:r,args:o}=this;n[r]=t._active=t.active=t._blocked=t._force=!1,t._step=[!1,!1],t.intentional=!1,t._movement=[0,0],t._distance=[0,0],t._delta=[0,0],t._bounds=[[-1/0,1/0],[-1/0,1/0]],t.args=o,t.axis=void 0,t.memo=void 0,t.elapsedTime=0,t.direction=[0,0],t.distance=[0,0],t.velocity=[0,0],t.movement=[0,0],t.delta=[0,0],t.timeStamp=0}start(t){const n=this.state,r=this.config;n._active||(this.reset(),this.computeInitial(),n._active=!0,n.target=t.target,n.currentTarget=t.currentTarget,n.lastOffset=r.from?Zt(r.from,n):n.offset,n.offset=n.lastOffset),n.startTime=n.timeStamp=t.timeStamp}computeValues(t){const n=this.state;n._values=t,n.values=this.config.transform(t)}computeInitial(){const t=this.state;t._initial=t._values,t.initial=t.values}compute(t){const{state:n,config:r,shared:o}=this;n.args=this.args;let i=0;if(t&&(n.event=t,r.preventDefault&&t.cancelable&&n.event.preventDefault(),n.type=t.type,o.touches=this.ctrl.pointerIds.size||this.ctrl.touchIds.size,o.locked=!!document.pointerLockElement,Object.assign(o,zc(t)),o.down=o.pressed=o.buttons%2===1||o.touches>0,i=t.timeStamp-n.timeStamp,n.timeStamp=t.timeStamp,n.elapsedTime=n.timeStamp-n.startTime),n._active){const h=n._delta.map(Math.abs);ee.addTo(n._distance,h)}const[s,a]=n._movement,[c,l]=r.threshold,{_step:u,values:d}=n;if(r.hasCustomTransform?(u[0]===!1&&(u[0]=Math.abs(s)>=c&&d[0]),u[1]===!1&&(u[1]=Math.abs(a)>=l&&d[1])):(u[0]===!1&&(u[0]=Math.abs(s)>=c&&Math.sign(s)*c),u[1]===!1&&(u[1]=Math.abs(a)>=l&&Math.sign(a)*l)),n.intentional=u[0]!==!1||u[1]!==!1,!n.intentional)return;const f=[0,0];if(r.hasCustomTransform){const[h,m]=d;f[0]=u[0]!==!1?h-u[0]:0,f[1]=u[1]!==!1?m-u[1]:0}else f[0]=u[0]!==!1?s-u[0]:0,f[1]=u[1]!==!1?a-u[1]:0;if(this.intent&&this.intent(f),(n._active&&!n._blocked||n.active)&&(n.first=n._active&&!n.active,n.last=!n._active&&n.active,n.active=o[this.ingKey]=n._active,t)){n.first&&("bounds"in r&&(n._bounds=Zt(r.bounds,n)),this.setup&&this.setup()),n.movement=f;const h=n.offset;if(this.computeOffset(),!n.last||i>Wc){n.delta=ee.sub(n.offset,h);const m=n.delta.map(Math.abs);ee.addTo(n.distance,m),n.direction=n.delta.map(Math.sign),!n.first&&i>0&&(n.velocity=[m[0]/i,m[1]/i])}}const v=n._active?r.rubberband||[0,0]:[0,0];n.offset=Ac(n._bounds,n.offset,v),this.computeMovement()}emit(){const t=this.state,n=this.shared,r=this.config;if(t._active||this.clean(),(t._blocked||!t.intentional)&&!t._force&&!r.triggerAllEvents)return;const o=this.handler(q(q(q({},n),t),{},{[this.aliasKey]:t.values}));o!==void 0&&(t.memo=o)}clean(){this.eventStore.clean(),this.timeoutStore.clean()}}function Fc([e,t]){const n=Math.abs(e)-Math.abs(t);if(n>0)return"x";if(n<0)return"y"}function Kc(e,t){switch(t){case"x":e[1]=0;break;case"y":e[0]=0;break}}class qc extends Hc{constructor(...t){super(...t),re(this,"aliasKey","xy")}reset(){super.reset(),this.state.axis=void 0}init(){this.state.offset=[0,0],this.state.lastOffset=[0,0]}computeOffset(){this.state.offset=ee.add(this.state.lastOffset,this.state.movement)}computeMovement(){this.state.movement=ee.sub(this.state.offset,this.state.lastOffset)}intent(t){this.state.axis=this.state.axis||Fc(t),this.state._blocked=(this.config.lockDirection||!!this.config.axis)&&!this.state.axis||!!this.config.axis&&this.config.axis!==this.state.axis,!this.state._blocked&&(this.config.axis||this.config.lockDirection)&&Kc(t,this.state.axis)}}const Yc=e=>e,Qr=.15,_i={enabled(e=!0){return e},preventDefault(e=!1){return e},triggerAllEvents(e=!1){return e},rubberband(e=0){switch(e){case!0:return[Qr,Qr];case!1:return[0,0];default:return ee.toVector(e)}},from(e){if(typeof e=="function")return e;if(e!=null)return ee.toVector(e)},transform(e,t,n){const r=e||n.shared.transform;return this.hasCustomTransform=!!r,r||Yc},threshold(e){return ee.toVector(e,0)}},Pt=q(q({},_i),{},{axis(e,t,{axis:n}){if(this.lockDirection=n==="lock",!this.lockDirection)return n},bounds(e={}){if(typeof e=="function")return i=>Pt.bounds(e(i));if("current"in e)return()=>e.current;if(typeof HTMLElement=="function"&&e instanceof HTMLElement)return e;const{left:t=-1/0,right:n=1/0,top:r=-1/0,bottom:o=1/0}=e;return[[t,n],[r,o]]}}),jt=10,eo={ArrowRight:(e=1)=>[jt*e,0],ArrowLeft:(e=1)=>[-jt*e,0],ArrowUp:(e=1)=>[0,-jt*e],ArrowDown:(e=1)=>[0,jt*e]};class Xc extends qc{constructor(...t){super(...t),re(this,"ingKey","dragging")}reset(){super.reset();const t=this.state;t._pointerId=void 0,t._pointerActive=!1,t._keyboardActive=!1,t._preventScroll=!1,t._delayed=!1,t.swipe=[0,0],t.tap=!1,t.canceled=!1,t.cancel=this.cancel.bind(this)}setup(){const t=this.state;if(t._bounds instanceof HTMLElement){const n=t._bounds.getBoundingClientRect(),r=t.currentTarget.getBoundingClientRect(),o={left:n.left-r.left+t.offset[0],right:n.right-r.right+t.offset[0],top:n.top-r.top+t.offset[1],bottom:n.bottom-r.bottom+t.offset[1]};t._bounds=Pt.bounds(o)}}cancel(){const t=this.state;t.canceled||(t.canceled=!0,t._active=!1,setTimeout(()=>{this.compute(),this.emit()},0))}setActive(){this.state._active=this.state._pointerActive||this.state._keyboardActive}clean(){this.pointerClean(),this.state._pointerActive=!1,this.state._keyboardActive=!1,super.clean()}pointerDown(t){const n=this.config,r=this.state;t.buttons!=null&&(Array.isArray(n.pointerButtons)?!n.pointerButtons.includes(t.buttons):n.pointerButtons!==-1&&n.pointerButtons!==t.buttons)||(this.ctrl.setEventIds(t),n.pointerCapture&&t.target.setPointerCapture(t.pointerId),!r._pointerActive&&(this.start(t),this.setupPointer(t),r._pointerId=vn(t),r._pointerActive=!0,this.computeValues(Jr(t)),this.computeInitial(),n.preventScroll?this.setupScrollPrevention(t):n.delay>0?this.setupDelayTrigger(t):this.startPointerDrag(t)))}startPointerDrag(t){const n=this.state;n._active=!0,n._preventScroll=!0,n._delayed=!1,this.compute(t),this.emit()}pointerMove(t){const n=this.state,r=this.config;if(!n._pointerActive||n.type===t.type&&t.timeStamp===n.timeStamp)return;const o=vn(t);if(n._pointerId&&o!==n._pointerId)return;const i=Jr(t);if(document.pointerLockElement===t.target?n._delta=[t.movementX,t.movementY]:(n._delta=ee.sub(i,n._values),this.computeValues(i)),ee.addTo(n._movement,n._delta),this.compute(t),n._delayed){this.timeoutStore.remove("dragDelay"),n.active=!1,this.startPointerDrag(t);return}if(r.preventScroll&&!n._preventScroll)if(n.axis)if(n.axis===r.preventScrollAxis||r.preventScrollAxis==="xy"){n._active=!1,this.clean();return}else{this.timeoutStore.remove("startPointerDrag"),this.startPointerDrag(t);return}else return;this.emit()}pointerUp(t){this.ctrl.setEventIds(t);try{this.config.pointerCapture&&t.target.hasPointerCapture(t.pointerId)&&t.target.releasePointerCapture(t.pointerId)}catch{}const n=this.state,r=this.config;if(!n._pointerActive)return;const o=vn(t);if(n._pointerId&&o!==n._pointerId)return;this.state._pointerActive=!1,this.setActive(),this.compute(t);const[i,s]=n._distance;if(n.tap=i<=3&&s<=3,n.tap&&r.filterTaps)n._force=!0;else{const[a,c]=n.direction,[l,u]=n.velocity,[d,f]=n.movement,[v,h]=r.swipe.velocity,[m,y]=r.swipe.distance,x=r.swipe.duration;n.elapsedTime<x&&(Math.abs(l)>v&&Math.abs(d)>m&&(n.swipe[0]=a),Math.abs(u)>h&&Math.abs(f)>y&&(n.swipe[1]=c))}this.emit()}pointerClick(t){this.state.tap||(t.preventDefault(),t.stopPropagation())}setupPointer(t){const n=this.config;let r=n.device;n.pointerLock&&t.currentTarget.requestPointerLock(),n.pointerCapture||(this.eventStore.add(this.sharedConfig.window,r,"change",this.pointerMove.bind(this)),this.eventStore.add(this.sharedConfig.window,r,"end",this.pointerUp.bind(this)))}pointerClean(){this.config.pointerLock&&document.pointerLockElement===this.state.currentTarget&&document.exitPointerLock()}preventScroll(t){this.state._preventScroll&&t.cancelable&&t.preventDefault()}setupScrollPrevention(t){Jc(t),this.eventStore.add(this.sharedConfig.window,"touch","change",this.preventScroll.bind(this),{passive:!1}),this.eventStore.add(this.sharedConfig.window,"touch","end",this.clean.bind(this),{passive:!1}),this.eventStore.add(this.sharedConfig.window,"touch","cancel",this.clean.bind(this),{passive:!1}),this.timeoutStore.add("startPointerDrag",this.startPointerDrag.bind(this),this.config.preventScroll,t)}setupDelayTrigger(t){this.state._delayed=!0,this.timeoutStore.add("dragDelay",this.startPointerDrag.bind(this),this.config.delay,t)}keyDown(t){const n=eo[t.key];if(n){const r=this.state,o=t.shiftKey?10:t.altKey?.1:1;r._delta=n(o),this.start(t),r._keyboardActive=!0,ee.addTo(r._movement,r._delta),this.compute(t),this.emit()}}keyUp(t){t.key in eo&&(this.state._keyboardActive=!1,this.setActive(),this.compute(t),this.emit())}bind(t){const n=this.config.device;t(n,"start",this.pointerDown.bind(this)),this.config.pointerCapture&&(t(n,"change",this.pointerMove.bind(this)),t(n,"end",this.pointerUp.bind(this)),t(n,"cancel",this.pointerUp.bind(this))),t("key","down",this.keyDown.bind(this)),t("key","up",this.keyUp.bind(this)),this.config.filterTaps&&t("click","",this.pointerClick.bind(this),{capture:!0})}}function Jc(e){"persist"in e&&typeof e.persist=="function"&&e.persist()}const Tt=typeof window<"u"&&window.document&&window.document.createElement;function Si(){return Tt&&"ontouchstart"in window}function Zc(){return Si()||Tt&&window.navigator.maxTouchPoints>1}function Qc(){return Tt&&"onpointerdown"in window}function el(){return Tt&&"exitPointerLock"in window.document}function tl(){try{return"constructor"in GestureEvent}catch{return!1}}const de={isBrowser:Tt,gesture:tl(),touch:Si(),touchscreen:Zc(),pointer:Qc(),pointerLock:el()},nl=250,rl=180,ol=.5,il=50,sl=250,al=q(q({},Pt),{},{pointerLock(e,t,{pointer:{lock:n=!1,touch:r=!1}={}}){return this.useTouch=de.touch&&r,de.pointerLock&&n},device(e,t){return this.useTouch?"touch":this.pointerLock?"mouse":de.pointer?"pointer":de.touch?"touch":"mouse"},preventScroll(e=!1,t,{preventScrollAxis:n="y"}){return n&&(this.preventScrollAxis=n),de.touchscreen?typeof e=="number"?e:e?nl:!1:!1},pointerCapture(e,t,{pointer:{capture:n=!0,buttons:r=1}={}}){return this.pointerButtons=r,!this.pointerLock&&this.device==="pointer"&&n},threshold(e,t,{filterTaps:n=!1,axis:r=void 0}){const o=ee.toVector(e,n?3:r?1:0);return this.filterTaps=n,o},swipe({velocity:e=ol,distance:t=il,duration:n=sl}={}){return{velocity:this.transform(ee.toVector(e)),distance:this.transform(ee.toVector(t)),duration:n}},delay(e=0){switch(e){case!0:return rl;case!1:return 0;default:return e}}});q(q({},_i),{},{useTouch(e,t,{pointer:{touch:n=!1}={}}){return de.touch&&n},device(e,t,n){if(n.shared.target&&!de.touch&&de.gesture)return"gesture";if(this.useTouch)return"touch";if(de.touchscreen){if(de.pointer)return"pointer";if(de.touch)return"touch"}},bounds(e,t,{scaleBounds:n={},angleBounds:r={}}){const o=s=>{const a=Zr(Zt(n,s),{min:-1/0,max:1/0});return[a.min,a.max]},i=s=>{const a=Zr(Zt(r,s),{min:-1/0,max:1/0});return[a.min,a.max]};return typeof n!="function"&&typeof r!="function"?[o(),i()]:s=>[o(s),i(s)]},threshold(e,t,n){return this.lockDirection=n.axis==="lock",ee.toVector(e,this.lockDirection?[.1,3]:0)}});q(q({},Pt),{},{mouseOnly:(e=!0)=>e});q(q({},Pt),{},{mouseOnly:(e=!0)=>e});const ki=new Map,jn=new Map;function cl(e){ki.set(e.key,e.engine),jn.set(e.key,e.resolver)}const ll={key:"drag",engine:Xc,resolver:al};function ul(e,t){if(e==null)return{};var n={},r=Object.keys(e),o,i;for(i=0;i<r.length;i++)o=r[i],!(t.indexOf(o)>=0)&&(n[o]=e[o]);return n}function fl(e,t){if(e==null)return{};var n=ul(e,t),r,o;if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)r=i[o],!(t.indexOf(r)>=0)&&Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}const dl={target(e){if(e)return()=>"current"in e?e.current:e},enabled(e=!0){return e},window(e=de.isBrowser?window:void 0){return e},eventOptions({passive:e=!0,capture:t=!1}={}){return{passive:e,capture:t}},transform(e){return e}},vl=["target","eventOptions","window","enabled","transform"];function Mt(e={},t){const n={};for(const[r,o]of Object.entries(t))switch(typeof o){case"function":n[r]=o.call(n,e[r],r,e);break;case"object":n[r]=Mt(e[r],o);break;case"boolean":o&&(n[r]=e[r]);break}return n}function hl(e,t){const n=e,{target:r,eventOptions:o,window:i,enabled:s,transform:a}=n,c=fl(n,vl),l={shared:Mt({target:r,eventOptions:o,window:i,enabled:s,transform:a},dl)};if(t){const u=jn.get(t);l[t]=Mt(q({shared:l.shared},c),u)}else for(const u in c){const d=jn.get(u);d&&(l[u]=Mt(q({shared:l.shared},c[u]),d))}return l}class Pi{constructor(t){re(this,"_listeners",[]),this._ctrl=t}add(t,n,r,o,i){const s=Bc(n,r),a=q(q({},this._ctrl.config.shared.eventOptions),i);t.addEventListener(s,o,a),this._listeners.push(()=>t.removeEventListener(s,o,a))}clean(){this._listeners.forEach(t=>t()),this._listeners=[]}}class gl{constructor(){re(this,"_timeouts",new Map)}add(t,n,r=140,...o){this.remove(t),this._timeouts.set(t,window.setTimeout(n,r,...o))}remove(t){const n=this._timeouts.get(t);n&&window.clearTimeout(n)}clean(){this._timeouts.forEach(t=>void window.clearTimeout(t)),this._timeouts.clear()}}class pl{constructor(t){re(this,"gestures",new Set),re(this,"_targetEventStore",new Pi(this)),re(this,"gestureEventStores",{}),re(this,"gestureTimeoutStores",{}),re(this,"handlers",{}),re(this,"config",{}),re(this,"pointerIds",new Set),re(this,"touchIds",new Set),re(this,"state",{shared:{shiftKey:!1,metaKey:!1,ctrlKey:!1,altKey:!1}}),ml(this,t)}setEventIds(t){rr(t)?this.touchIds=new Set(Vc(t)):"pointerId"in t&&(t.type==="pointerup"||t.type==="pointercancel"?this.pointerIds.delete(t.pointerId):t.type==="pointerdown"&&this.pointerIds.add(t.pointerId))}applyHandlers(t,n){this.handlers=t,this.nativeHandlers=n}applyConfig(t,n){this.config=hl(t,n)}clean(){this._targetEventStore.clean();for(const t of this.gestures)this.gestureEventStores[t].clean(),this.gestureTimeoutStores[t].clean()}effect(){return this.config.shared.target&&this.bind(),()=>this._targetEventStore.clean()}bind(...t){const n=this.config.shared,r=n.eventOptions,o={};let i;if(n.target&&(i=n.target(),!i))return;const s=yl(o,r,!!i);if(n.enabled){for(const a of this.gestures)if(this.config[a].enabled){const c=ki.get(a);new c(this,t,a).bind(s)}for(const a in this.nativeHandlers)s(a,"",c=>this.nativeHandlers[a](q(q({},this.state.shared),{},{event:c,args:t})),void 0,!0)}for(const a in o)o[a]=Uc(...o[a]);if(!i)return o;for(const a in o){let c=a.substr(2).toLowerCase();const l=!!~c.indexOf("capture"),u=!!~c.indexOf("passive");(l||u)&&(c=c.replace(/capture|passive/g,"")),this._targetEventStore.add(i,c,"",o[a],{capture:l,passive:u})}}}function nt(e,t){e.gestures.add(t),e.gestureEventStores[t]=new Pi(e),e.gestureTimeoutStores[t]=new gl}function ml(e,t){t.drag&&nt(e,"drag"),t.wheel&&nt(e,"wheel"),t.scroll&&nt(e,"scroll"),t.move&&nt(e,"move"),t.pinch&&nt(e,"pinch"),t.hover&&nt(e,"hover")}const yl=(e,t,n)=>(r,o,i,s={},a=!1)=>{var c,l;const u=(c=s.capture)!==null&&c!==void 0?c:t.capture,d=(l=s.passive)!==null&&l!==void 0?l:t.passive;let f=a?r:Dc(r,o,u);n&&d&&(f+="Passive"),e[f]=e[f]||[],e[f].push(i)};function bl(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function to(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),n.push.apply(n,r)}return n}function no(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?to(Object(n),!0).forEach(function(r){bl(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):to(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}const Ti=function(t,n,r,o,i){this._gestureKey=o,this._ctrl=new pl(n),this._ctrl.applyHandlers(n,i),this._ctrl.applyConfig(no(no({},r),{},{target:t}),this._gestureKey),this._ctrl.effect()};Ti.prototype.destroy=function(){this._ctrl.clean()};const Ct=function(t,n,r={}){return cl(ll),new Ti(t,{drag:n},r,"drag")},xl=T("<div><div><div></div></div><div></div></div>");function wl(e){let t,n,r;const o=at("sizes","scrubberWidth");return I(()=>{new Ct(n,({event:i,first:s,xy:[a],movement:[c],memo:l})=>{if(s){const{width:d,left:f}=t.getBoundingClientRect();r=d-parseFloat(o),l=i?.target===n?e.value:Xt((a-f)/d,e.min,e.max)}const u=l+Xt(c/r,0,e.max-e.min);return e.onDrag(ai(u,{step:e.step,initialValue:e.initialValue})),l})}),(()=>{const i=xl.cloneNode(!0),s=i.firstChild,a=s.firstChild,c=s.nextSibling,l=t;typeof l=="function"?l(i):t=i,a.style.setProperty("left","0");const u=n;return typeof u=="function"?u(c):n=c,c.style.setProperty("touch-action","none"),_(d=>{const f=bi(),v=yi(),h=xi(),m=`${(1-Yt(e.value,e.min,e.max))*100}%`,y=Nn(),x=`calc(${Yt(e.value,e.min,e.max)} * (100% - ${o}))`;return f!==d._v$&&(i.className=d._v$=f),v!==d._v$2&&(s.className=d._v$2=v),h!==d._v$3&&(a.className=d._v$3=h),m!==d._v$4&&a.style.setProperty("right",d._v$4=m),y!==d._v$5&&(c.className=d._v$5=y),x!==d._v$6&&c.style.setProperty("left",d._v$6=x),d},{_v$:void 0,_v$2:void 0,_v$3:void 0,_v$4:void 0,_v$5:void 0,_v$6:void 0}),i})()}const Ci=T("<div></div>"),$l=e=>{const[t,n]=B(!1);let r;return I(()=>{new Ct(r,({active:o,delta:[i],event:s,memo:a=0})=>(n(o),a+=i/2,Math.abs(a)>=1&&(e.onUpdate(c=>parseFloat(c)+Math.floor(a)*e.step*oi(s)),a=0),a))}),(()=>{const o=Ci.cloneNode(!0),i=r;return typeof i=="function"?i(o):r=o,k(o,()=>e.label.slice(0,e.innerLabelTrim)),_(s=>{const a=mc({dragging:t()}),c=e.label.length>1?e.label:"";return a!==s._v$&&(o.className=s._v$=a),c!==s._v$2&&ce(o,"title",s._v$2=c),s},{_v$:void 0,_v$2:void 0}),o})()};function Ei(e){return g(xc,{get id(){return e.id},get value(){return String(e.displayValue)},get onUpdate(){return e.onUpdate},get onChange(){return e.onChange},get innerLabel(){return g($l,{get label(){return e.label},get step(){return e.settings.step},get onUpdate(){return e.onUpdate},get innerLabelTrim(){return e.innerLabelTrim}})}})}function _l(){const e=se(),t=()=>e.settings.max!==1/0&&e.settings.min!==-1/0;return g(Oe,{input:!0,get children(){return[g(Be,{get children(){return e.label}}),(()=>{const n=Ci.cloneNode(!0);return k(n,g(Ce,{get when(){return t()},get children(){return g(wl,_e({get value(){return parseFloat(e.value)},get onDrag(){return e.onUpdate}},()=>e.settings))}}),null),k(n,g(Ei,_e(e,{get id(){return e.id},label:"value",get innerLabelTrim(){return t()?0:2}})),null),_(()=>n.className=Nc({hasRange:t()})),n})()]}})}const Oi=Da,{sanitizeStep:Sl}=Oi,kl=H(Oi,["sanitizeStep"]);var Pl=E({component:_l},kl);const Tl=(e,t)=>ie().schema({options:ie().passesAnyOf(ie().object(),ie().array())}).test(t),Cl=(e,{values:t})=>{if(t.indexOf(e)<0)throw Error("Selected value doesn't match Select options");return e},El=(e,{values:t})=>t.indexOf(e),Ol=e=>{let{value:t,options:n}=e,r,o;return Array.isArray(n)?(o=n,r=n.map(i=>String(i))):(o=Object.values(n),r=Object.keys(n)),"value"in e?o.includes(t)||(r.unshift(String(t)),o.unshift(t)):t=o[0],Object.values(n).includes(t)||(n[String(t)]=t),{value:t,settings:{keys:r,values:o}}};var Rl=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",schema:Tl,sanitize:Cl,format:El,normalize:Ol});const Ll=C({$flexCenter:"",position:"relative","> svg":{pointerEvents:"none",position:"absolute",right:"$md"}}),An=C({position:"absolute",top:0,left:0,width:"100%",height:"100%",opacity:0}),Nl=C("div",{display:"flex",alignItems:"center",width:"100%",height:"$rowHeight",backgroundColor:"$elevation3",borderRadius:"$sm",padding:"0 $sm",cursor:"pointer",[`${An}:focus + &`]:{$focusStyle:""},[`${An}:hover + &`]:{$hoverStyle:""}}),jl=T("<div><select></select><div></div></div>"),Al=T("<option></option>");function Dl(e){return(()=>{const t=jl.cloneNode(!0),n=t.firstChild,r=n.nextSibling;return n.addEventListener("change",o=>e.onUpdate(e.settings.keys[Number(o.currentTarget.value)])),k(n,g(Wn,{get each(){return e.settings.keys},children:(o,i)=>(()=>{const s=Al.cloneNode(!0);return k(s,o),_(()=>s.value=i()),s})()})),k(r,()=>e.settings.keys[e.displayValue]),k(t,g(nr,{toggled:!0}),null),_(o=>{const i=Ll(),s=An(),a=e.id,c=e.displayValue,l=Nl();return i!==o._v$&&(t.className=o._v$=i),s!==o._v$2&&(n.className=o._v$2=s),a!==o._v$3&&ce(n,"id",o._v$3=a),c!==o._v$4&&(n.value=o._v$4=c),l!==o._v$5&&(r.className=o._v$5=l),o},{_v$:void 0,_v$2:void 0,_v$3:void 0,_v$4:void 0,_v$5:void 0}),t})()}function Bl(){const e=se();return g(Oe,{input:!0,get children(){return[g(Be,{get children(){return e.label}}),g(Dl,e)]}})}var Ml=E({component:Bl},Rl),Il={grad:.9,turn:360,rad:360/(2*Math.PI)},Le=function(e){return typeof e=="string"?e.length>0:typeof e=="number"},Y=function(e,t,n){return t===void 0&&(t=0),n===void 0&&(n=Math.pow(10,t)),Math.round(n*e)/n+0},he=function(e,t,n){return t===void 0&&(t=0),n===void 0&&(n=1),e>n?n:e>t?e:t},Ri=function(e){return(e=isFinite(e)?e%360:0)>0?e:e+360},ro=function(e){return{r:he(e.r,0,255),g:he(e.g,0,255),b:he(e.b,0,255),a:he(e.a)}},hn=function(e){return{r:Y(e.r),g:Y(e.g),b:Y(e.b),a:Y(e.a,3)}},Vl=/^#([0-9a-f]{3,8})$/i,At=function(e){var t=e.toString(16);return t.length<2?"0"+t:t},Li=function(e){var t=e.r,n=e.g,r=e.b,o=e.a,i=Math.max(t,n,r),s=i-Math.min(t,n,r),a=s?i===t?(n-r)/s:i===n?2+(r-t)/s:4+(t-n)/s:0;return{h:60*(a<0?a+6:a),s:i?s/i*100:0,v:i/255*100,a:o}},Ni=function(e){var t=e.h,n=e.s,r=e.v,o=e.a;t=t/360*6,n/=100,r/=100;var i=Math.floor(t),s=r*(1-n),a=r*(1-(t-i)*n),c=r*(1-(1-t+i)*n),l=i%6;return{r:255*[r,a,s,s,c,r][l],g:255*[c,r,r,a,s,s][l],b:255*[s,s,c,r,r,a][l],a:o}},oo=function(e){return{h:Ri(e.h),s:he(e.s,0,100),l:he(e.l,0,100),a:he(e.a)}},io=function(e){return{h:Y(e.h),s:Y(e.s),l:Y(e.l),a:Y(e.a,3)}},so=function(e){return Ni((n=(t=e).s,{h:t.h,s:(n*=((r=t.l)<50?r:100-r)/100)>0?2*n/(r+n)*100:0,v:r+n,a:t.a}));var t,n,r},mt=function(e){return{h:(t=Li(e)).h,s:(o=(200-(n=t.s))*(r=t.v)/100)>0&&o<200?n*r/100/(o<=100?o:200-o)*100:0,l:o/2,a:t.a};var t,n,r,o},zl=/^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s*,\s*([+-]?\d*\.?\d+)%\s*,\s*([+-]?\d*\.?\d+)%\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,Gl=/^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s+([+-]?\d*\.?\d+)%\s+([+-]?\d*\.?\d+)%\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,Ul=/^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,Wl=/^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,Dn={string:[[function(e){var t=Vl.exec(e);return t?(e=t[1]).length<=4?{r:parseInt(e[0]+e[0],16),g:parseInt(e[1]+e[1],16),b:parseInt(e[2]+e[2],16),a:e.length===4?Y(parseInt(e[3]+e[3],16)/255,2):1}:e.length===6||e.length===8?{r:parseInt(e.substr(0,2),16),g:parseInt(e.substr(2,2),16),b:parseInt(e.substr(4,2),16),a:e.length===8?Y(parseInt(e.substr(6,2),16)/255,2):1}:null:null},"hex"],[function(e){var t=Ul.exec(e)||Wl.exec(e);return t?t[2]!==t[4]||t[4]!==t[6]?null:ro({r:Number(t[1])/(t[2]?100/255:1),g:Number(t[3])/(t[4]?100/255:1),b:Number(t[5])/(t[6]?100/255:1),a:t[7]===void 0?1:Number(t[7])/(t[8]?100:1)}):null},"rgb"],[function(e){var t=zl.exec(e)||Gl.exec(e);if(!t)return null;var n,r,o=oo({h:(n=t[1],r=t[2],r===void 0&&(r="deg"),Number(n)*(Il[r]||1)),s:Number(t[3]),l:Number(t[4]),a:t[5]===void 0?1:Number(t[5])/(t[6]?100:1)});return so(o)},"hsl"]],object:[[function(e){var t=e.r,n=e.g,r=e.b,o=e.a,i=o===void 0?1:o;return Le(t)&&Le(n)&&Le(r)?ro({r:Number(t),g:Number(n),b:Number(r),a:Number(i)}):null},"rgb"],[function(e){var t=e.h,n=e.s,r=e.l,o=e.a,i=o===void 0?1:o;if(!Le(t)||!Le(n)||!Le(r))return null;var s=oo({h:Number(t),s:Number(n),l:Number(r),a:Number(i)});return so(s)},"hsl"],[function(e){var t=e.h,n=e.s,r=e.v,o=e.a,i=o===void 0?1:o;if(!Le(t)||!Le(n)||!Le(r))return null;var s=function(a){return{h:Ri(a.h),s:he(a.s,0,100),v:he(a.v,0,100),a:he(a.a)}}({h:Number(t),s:Number(n),v:Number(r),a:Number(i)});return Ni(s)},"hsv"]]},ao=function(e,t){for(var n=0;n<t.length;n++){var r=t[n][0](e);if(r)return[r,t[n][1]]}return[null,void 0]},ji=function(e){return typeof e=="string"?ao(e.trim(),Dn.string):typeof e=="object"&&e!==null?ao(e,Dn.object):[null,void 0]},Hl=function(e){return ji(e)[1]},gn=function(e,t){var n=mt(e);return{h:n.h,s:he(n.s+100*t,0,100),l:n.l,a:n.a}},pn=function(e){return(299*e.r+587*e.g+114*e.b)/1e3/255},co=function(e,t){var n=mt(e);return{h:n.h,s:n.s,l:he(n.l+100*t,0,100),a:n.a}},Bn=function(){function e(t){this.parsed=ji(t)[0],this.rgba=this.parsed||{r:0,g:0,b:0,a:1}}return e.prototype.isValid=function(){return this.parsed!==null},e.prototype.brightness=function(){return Y(pn(this.rgba),2)},e.prototype.isDark=function(){return pn(this.rgba)<.5},e.prototype.isLight=function(){return pn(this.rgba)>=.5},e.prototype.toHex=function(){return t=hn(this.rgba),n=t.r,r=t.g,o=t.b,s=(i=t.a)<1?At(Y(255*i)):"","#"+At(n)+At(r)+At(o)+s;var t,n,r,o,i,s},e.prototype.toRgb=function(){return hn(this.rgba)},e.prototype.toRgbString=function(){return t=hn(this.rgba),n=t.r,r=t.g,o=t.b,(i=t.a)<1?"rgba("+n+", "+r+", "+o+", "+i+")":"rgb("+n+", "+r+", "+o+")";var t,n,r,o,i},e.prototype.toHsl=function(){return io(mt(this.rgba))},e.prototype.toHslString=function(){return t=io(mt(this.rgba)),n=t.h,r=t.s,o=t.l,(i=t.a)<1?"hsla("+n+", "+r+"%, "+o+"%, "+i+")":"hsl("+n+", "+r+"%, "+o+"%)";var t,n,r,o,i},e.prototype.toHsv=function(){return t=Li(this.rgba),{h:Y(t.h),s:Y(t.s),v:Y(t.v),a:Y(t.a,3)};var t},e.prototype.invert=function(){return ae({r:255-(t=this.rgba).r,g:255-t.g,b:255-t.b,a:t.a});var t},e.prototype.saturate=function(t){return t===void 0&&(t=.1),ae(gn(this.rgba,t))},e.prototype.desaturate=function(t){return t===void 0&&(t=.1),ae(gn(this.rgba,-t))},e.prototype.grayscale=function(){return ae(gn(this.rgba,-1))},e.prototype.lighten=function(t){return t===void 0&&(t=.1),ae(co(this.rgba,t))},e.prototype.darken=function(t){return t===void 0&&(t=.1),ae(co(this.rgba,-t))},e.prototype.rotate=function(t){return t===void 0&&(t=15),this.hue(this.hue()+t)},e.prototype.alpha=function(t){return typeof t=="number"?ae({r:(n=this.rgba).r,g:n.g,b:n.b,a:t}):Y(this.rgba.a,3);var n},e.prototype.hue=function(t){var n=mt(this.rgba);return typeof t=="number"?ae({h:t,s:n.s,l:n.l,a:n.a}):Y(n.h)},e.prototype.isEqual=function(t){return this.toHex()===ae(t).toHex()},e}(),ae=function(e){return e instanceof Bn?e:new Bn(e)},lo=[],Fl=function(e){e.forEach(function(t){lo.indexOf(t)<0&&(t(Bn,Dn),lo.push(t))})};function Kl(e,t){var n={white:"#ffffff",bisque:"#ffe4c4",blue:"#0000ff",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",antiquewhite:"#faebd7",aqua:"#00ffff",azure:"#f0ffff",whitesmoke:"#f5f5f5",papayawhip:"#ffefd5",plum:"#dda0dd",blanchedalmond:"#ffebcd",black:"#000000",gold:"#ffd700",goldenrod:"#daa520",gainsboro:"#dcdcdc",cornsilk:"#fff8dc",cornflowerblue:"#6495ed",burlywood:"#deb887",aquamarine:"#7fffd4",beige:"#f5f5dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkkhaki:"#bdb76b",darkgray:"#a9a9a9",darkgreen:"#006400",darkgrey:"#a9a9a9",peachpuff:"#ffdab9",darkmagenta:"#8b008b",darkred:"#8b0000",darkorchid:"#9932cc",darkorange:"#ff8c00",darkslateblue:"#483d8b",gray:"#808080",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",deeppink:"#ff1493",deepskyblue:"#00bfff",wheat:"#f5deb3",firebrick:"#b22222",floralwhite:"#fffaf0",ghostwhite:"#f8f8ff",darkviolet:"#9400d3",magenta:"#ff00ff",green:"#008000",dodgerblue:"#1e90ff",grey:"#808080",honeydew:"#f0fff0",hotpink:"#ff69b4",blueviolet:"#8a2be2",forestgreen:"#228b22",lawngreen:"#7cfc00",indianred:"#cd5c5c",indigo:"#4b0082",fuchsia:"#ff00ff",brown:"#a52a2a",maroon:"#800000",mediumblue:"#0000cd",lightcoral:"#f08080",darkturquoise:"#00ced1",lightcyan:"#e0ffff",ivory:"#fffff0",lightyellow:"#ffffe0",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",linen:"#faf0e6",mediumaquamarine:"#66cdaa",lemonchiffon:"#fffacd",lime:"#00ff00",khaki:"#f0e68c",mediumseagreen:"#3cb371",limegreen:"#32cd32",mediumspringgreen:"#00fa9a",lightskyblue:"#87cefa",lightblue:"#add8e6",midnightblue:"#191970",lightpink:"#ffb6c1",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",mintcream:"#f5fffa",lightslategray:"#778899",lightslategrey:"#778899",navajowhite:"#ffdead",navy:"#000080",mediumvioletred:"#c71585",powderblue:"#b0e0e6",palegoldenrod:"#eee8aa",oldlace:"#fdf5e6",paleturquoise:"#afeeee",mediumturquoise:"#48d1cc",mediumorchid:"#ba55d3",rebeccapurple:"#663399",lightsteelblue:"#b0c4de",mediumslateblue:"#7b68ee",thistle:"#d8bfd8",tan:"#d2b48c",orchid:"#da70d6",mediumpurple:"#9370db",purple:"#800080",pink:"#ffc0cb",skyblue:"#87ceeb",springgreen:"#00ff7f",palegreen:"#98fb98",red:"#ff0000",yellow:"#ffff00",slateblue:"#6a5acd",lavenderblush:"#fff0f5",peru:"#cd853f",palevioletred:"#db7093",violet:"#ee82ee",teal:"#008080",slategray:"#708090",slategrey:"#708090",aliceblue:"#f0f8ff",darkseagreen:"#8fbc8f",darkolivegreen:"#556b2f",greenyellow:"#adff2f",seagreen:"#2e8b57",seashell:"#fff5ee",tomato:"#ff6347",silver:"#c0c0c0",sienna:"#a0522d",lavender:"#e6e6fa",lightgreen:"#90ee90",orange:"#ffa500",orangered:"#ff4500",steelblue:"#4682b4",royalblue:"#4169e1",turquoise:"#40e0d0",yellowgreen:"#9acd32",salmon:"#fa8072",saddlebrown:"#8b4513",sandybrown:"#f4a460",rosybrown:"#bc8f8f",darksalmon:"#e9967a",lightgoldenrodyellow:"#fafad2",snow:"#fffafa",lightgrey:"#d3d3d3",lightgray:"#d3d3d3",dimgray:"#696969",dimgrey:"#696969",olivedrab:"#6b8e23",olive:"#808000"},r={};for(var o in n)r[n[o]]=o;var i={};e.prototype.toName=function(s){if(!(this.rgba.a||this.rgba.r||this.rgba.g||this.rgba.b))return"transparent";var a,c,l=r[this.toHex()];if(l)return l;if(s?.closest){var u=this.toRgb(),d=1/0,f="black";if(!i.length)for(var v in n)i[v]=new e(n[v]).toRgb();for(var h in n){var m=(a=u,c=i[h],Math.pow(a.r-c.r,2)+Math.pow(a.g-c.g,2)+Math.pow(a.b-c.b,2));m<d&&(d=m,f=h)}return f}},t.string.push([function(s){var a=s.toLowerCase(),c=a==="transparent"?"#0000":n[a];return c?new e(c).toRgb():null},"name"])}Fl([Kl]);const ql={rgb:"toRgb",hsl:"toHsl",hsv:"toHsv",hex:"toHex"};ie.extend({color:()=>e=>ae(e).isValid()});const Yl=e=>ie().color().test(e);function Ai(e,{format:t,hasAlpha:n,isString:r}){const o=ql[t]+(r&&t!=="hex"?"String":""),i=e[o]();return typeof i=="object"&&!n?Ea(i,["a"]):i}const Di=(e,t)=>{const n=ae(e);if(!n.isValid())throw Error("Invalid color");return Ai(n,t)},Xl=(e,t)=>Ai(ae(e),ve(E({},t),{isString:!0,format:"hex"})),Jl=({value:e})=>{const t=Hl(e),n=t==="name"?"hex":t,r=typeof e=="object"?"a"in e:t==="hex"&&e.length===8||/^(rgba)|(hsla)|(hsva)/.test(e),o={format:n,hasAlpha:r,isString:typeof e=="string"};return{value:Di(e,o),settings:o}};var Zl=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",schema:Yl,sanitize:Di,format:Xl,normalize:Jl});const Ql=C({position:"relative",boxSizing:"border-box",borderRadius:"$sm",overflow:"hidden",cursor:"pointer",height:"$rowHeight",width:"$rowHeight",backgroundColor:"#fff",backgroundImage:`url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill-opacity=".05"><path d="M8 0h8v8H8zM0 8h8v8H0z"/></svg>')`,$inputStyle:"",$hover:"",zIndex:1,variants:{active:{true:{$inputStyle:"$accent1"}}},"&::before":{content:'""',position:"absolute",top:0,bottom:0,right:0,left:0,backgroundColor:"currentColor",zIndex:1}}),eu=C({position:"relative",display:"grid",gridTemplateColumns:"$sizes$rowHeight auto",columnGap:"$colGap",alignItems:"center"}),tu=C({width:"$colorPickerWidth",height:"$colorPickerHeight",".react-colorful":{width:"100%",height:"100%",boxShadow:"$level2",cursor:"crosshair"},".react-colorful__saturation":{borderRadius:"$sm $sm 0 0"},".react-colorful__alpha, .react-colorful__hue":{height:10},".react-colorful__last-control":{borderRadius:"0 0 $sm $sm"},".react-colorful__pointer":{height:12,width:12}});function Bi(e){const[t,n]=B(Or(e.type,e.value,e.settings));let r;const o=s=>n(Or(e.type,s,e.settings)),i=s=>{try{e.setValue(s)}catch(a){const{type:c,previousValue:l}=a;if(c!=="LEVA_ERROR")throw a;o(l)}};return I(()=>{Wt(e.value,r)||o(e.value),r=e.value}),{displayValue:t,onChange:n,onUpdate:i}}function nu(e,t){if(Object.is(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;const n=Object.keys(e);if(n.length!==Object.keys(t).length)return!1;for(let r=0;r<n.length;r++)if(!Object.prototype.hasOwnProperty.call(t,n[r])||!Object.is(e[n[r]],t[n[r]]))return!1;return!0}function Mi(){const e=oe(null),t=oe({x:0,y:0});return[e,r=>{Object.assign(t.current,r),e.current&&(e.current.style.transform=`translate3d(${t.current.x}px, ${t.current.y}px, 0)`)}]}function ru(e){const t=oe(null),n=oe(null);return{wrapperRef:t,contentRef:n}}const mn=(e,t)=>{if(!e[t])return null;const n=e[t];return H(n,["__refCount"])};function ou(e){const t=Qn(),[n,r]=B(mn(t.getData(),e)),o=l=>t.setValueAtPath(e,l,!0),i=l=>t.setSettingsAtPath(e,l),s=l=>t.disableInputAtPath(e,l),a=()=>t.emitOnEditStart(e),c=()=>t.emitOnEditEnd(e);return I(()=>{r(mn(t.getData(),e));const l=t.useStore.subscribe(u=>mn(u.data,e),u=>r(u),nu);$e(()=>l())}),[n,{set:o,setSettings:i,disable:s,storeId:t.storeId,emitOnEditStart:a,emitOnEditEnd:c}]}function iu(e=3){let t={current:null},n={current:null};const[r,o]=B(!1),i=()=>o(!0),s=()=>o(!1);return _(()=>{if(r()){const{bottom:a,top:c,left:l}=t.current.getBoundingClientRect(),{height:u}=n.current.getBoundingClientRect(),d=a+u>window.innerHeight-40?"up":"down";n.current.style.position="fixed",n.current.style.zIndex="10000",n.current.style.left=l+"px",d==="down"?n.current.style.top=a+e+"px":n.current.style.bottom=window.innerHeight-c+e+"px"}}),{popinRef:t,wrapperRef:n,shown:r,show:i,hide:s}}const It=T("<div></div>");function uo(e,t){return t!=="rgb"?ae(e).toRgb():e}function su(e){se();const{popinRef:t,wrapperRef:n,shown:r,show:o,hide:i}=iu();let s=0;const[a,c]=B(uo(e.value,e.settings.format)),l=()=>{c(uo(e.value,e.settings.format)),o()},u=()=>{i(),window.clearTimeout(s)},d=()=>{s=window.setTimeout(u,500)};return $e(()=>window.clearTimeout(s)),[(()=>{const f=It.cloneNode(!0);return f.$$click=()=>l(),(v=>t.current=v)(f),_(v=>{const h=Ql({active:r()}),m=e.displayValue;return h!==v._v$&&(f.className=v._v$=h),m!==v._v$2&&f.style.setProperty("color",v._v$2=m),v},{_v$:void 0,_v$2:void 0}),f})(),g(Ce,{get when(){return r()},get children(){return g(jo,{get children(){return[(()=>{const f=It.cloneNode(!0);return f.addEventListener("mouseleave",v=>v.buttons===0&&d()),f.addEventListener("mouseenter",()=>window.clearTimeout(s)),(v=>n.current=v)(f),k(f,g(Fn,{get component(){return e.settings.hasAlpha?ua:da},get color(){return a()},get onChange(){return e.onUpdate}})),_(()=>f.className=`${tu()}`),f})(),(()=>{const f=It.cloneNode(!0);return f.$$pointerup=u,_(()=>f.className=kc()),f})()]}})}})]}function au(){const{value:e,displayValue:t,label:n,onChange:r,onUpdate:o,settings:i}=se();return g(Oe,{input:!0,get children(){return[g(Be,{children:n}),(()=>{const s=It.cloneNode(!0);return k(s,g(su,{value:e,displayValue:t,onChange:r,onUpdate:o,settings:i}),null),k(s,g(tr,{value:t,onChange:r,onUpdate:o}),null),_(()=>s.className=eu()),s})()]}})}Ee(["click","pointerup"]);var cu=E({component:au},Zl);const lu=e=>ie().string().test(e),uu=e=>{if(typeof e!="string")throw Error("Invalid string");return e};var fu=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",schema:lu,sanitize:uu});function du(e){return g(tr,_e({get value(){return e.displayValue}},e))}function vu(){const{label:e,displayValue:t,onUpdate:n,onChange:r}=se();return g(Oe,{input:!0,get children(){return[g(Be,{children:e}),g(du,{displayValue:t,onUpdate:n,onChange:r})]}})}var hu=E({component:vu},fu);const gu=e=>ie().boolean().test(e),pu=e=>{if(typeof e!="boolean")throw Error("Invalid boolean");return e};var mu=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",schema:gu,sanitize:pu});const yu=C({position:"relative",$flex:"",height:"$rowHeight",input:{$reset:"",height:0,width:0,opacity:0,margin:0},label:{position:"relative",$flexCenter:"",userSelect:"none",cursor:"pointer",height:"$checkboxSize",width:"$checkboxSize",backgroundColor:"$elevation3",borderRadius:"$sm",$hover:""},"input:focus + label":{$focusStyle:""},"input:focus:checked + label, input:checked + label:hover":{$hoverStyle:"$accent3"},"input + label:active":{backgroundColor:"$accent1"},"input:checked + label:active":{backgroundColor:"$accent1"},"label > svg":{display:"none",width:"90%",height:"90%",stroke:"$highlight3"},"input:checked + label":{backgroundColor:"$accent2"},"input:checked + label > svg":{display:"block"}}),bu=T('<div><input type="checkbox"><label><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg></label></div>');function xu({value:e,onUpdate:t,id:n}){return(()=>{const r=bu.cloneNode(!0),o=r.firstChild,i=o.nextSibling;return o.addEventListener("change",s=>t(s.currentTarget.checked)),ce(o,"id",n),o.checked=e,ce(i,"for",n),_(()=>r.className=yu()),r})()}function wu(){const{label:e,value:t,onUpdate:n,id:r}=se();return g(Oe,{input:!0,get children(){return[g(Be,{children:e}),g(xu,{value:t,onUpdate:n,id:r})]}})}var $u=E({component:wu},mu);const _u=T('<svg><path d="M5 4.63601C5 3.76031 5.24219 3.1054 5.64323 2.67357C6.03934 2.24705 6.64582 1.9783 7.5014 1.9783C8.35745 1.9783 8.96306 2.24652 9.35823 2.67208C9.75838 3.10299 10 3.75708 10 4.63325V5.99999H5V4.63601ZM4 5.99999V4.63601C4 3.58148 4.29339 2.65754 4.91049 1.99307C5.53252 1.32329 6.42675 0.978302 7.5014 0.978302C8.57583 0.978302 9.46952 1.32233 10.091 1.99162C10.7076 2.65557 11 3.57896 11 4.63325V5.99999H12C12.5523 5.99999 13 6.44771 13 6.99999V13C13 13.5523 12.5523 14 12 14H3C2.44772 14 2 13.5523 2 13V6.99999C2 6.44771 2.44772 5.99999 3 5.99999H4ZM3 6.99999H12V13H3V6.99999Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>',4,!0),Su=T('<svg width="10" height="10" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"></svg>'),ku=T('<svg><path d="M9 3.63601C9 2.76044 9.24207 2.11211 9.64154 1.68623C10.0366 1.26502 10.6432 1 11.5014 1C12.4485 1 13.0839 1.30552 13.4722 1.80636C13.8031 2.23312 14 2.84313 14 3.63325H15C15 2.68242 14.7626 1.83856 14.2625 1.19361C13.6389 0.38943 12.6743 0 11.5014 0C10.4294 0 9.53523 0.337871 8.91218 1.0021C8.29351 1.66167 8 2.58135 8 3.63601V6H1C0.447715 6 0 6.44772 0 7V13C0 13.5523 0.447715 14 1 14H10C10.5523 14 11 13.5523 11 13V7C11 6.44772 10.5523 6 10 6H9V3.63601ZM1 7H10V13H1V7Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>',4,!0),Pu=T("<div></div>"),Tu=e=>{const n=Bi({type:"NUMBER",get value(){return e.value[e.valueKey]},get settings(){return e.settings},setValue:r=>{e.onUpdate({[e.valueKey]:ri({type:"NUMBER",value:e.value[e.valueKey],settings:e.settings},r)})}});return g(Ei,{get id(){return e.id},get label(){return e.valueKey},get value(){return e.value[e.valueKey]},get displayValue(){return n.displayValue()},get onUpdate(){return n.onUpdate},get onChange(){return n.onChange},get settings(){return e.settings},get innerLabelTrim(){return e.innerLabelTrim}})},Cu=C({display:"grid",columnGap:"$colGap",gridAutoFlow:"column dense",alignItems:"center",variants:{withLock:{true:{gridTemplateColumns:"10px auto","> svg":{cursor:"pointer"}}}}});function Eu(e){return(()=>{const t=Su.cloneNode(!0);return Ke(t,e,!0,!0),k(t,g(Ce,{get when(){return e.locked},get fallback(){return ku.cloneNode(!0)},get children(){return _u.cloneNode(!0)}})),t})()}const Ii=e=>{const t=se();return(()=>{const n=Pu.cloneNode(!0);return k(n,g(Ce,{get when(){return e.settings.lock},get children(){return g(Eu,{get locked(){return e.settings.locked},onClick:()=>t.setSettings({locked:!e.settings.locked})})}}),null),k(n,g(Wn,{get each(){return Object.keys(e.value)},children:(r,o)=>g(Tu,{get id(){return o()===0?t.id:`${t.id}.${r}`},valueKey:r,get value(){return e.value},get settings(){return e.settings[r]},get onUpdate(){return e.onUpdate},get innerLabelTrim(){return e.innerLabelTrim}})}),null),_(()=>n.className=Cu({withLock:e.settings.lock})),n})()},Vi=(e,t)=>{const n={};let r=0,o=1/0;Object.entries(e).forEach(([i,s])=>{n[i]=si(E({value:s},t[i])).settings,r=Math.max(r,n[i].step),o=Math.min(o,n[i].pad)});for(let i in n){const{step:s,min:a,max:c}=t[i]||{};!isFinite(s)&&(!isFinite(a)||!isFinite(c))&&(n[i].step=r,n[i].pad=o)}return n};function Ou(e){const t=ie().array().length(e).every.number(),n=r=>{if(!r||typeof r!="object")return!1;const o=Object.values(r);return o.length===e&&o.every(i=>isFinite(i))};return r=>t.test(r)||n(r)}function Ru(e){return Array.isArray(e)?"array":"object"}function yt(e,t,n){return Ru(e)===t?e:t==="array"?Object.values(e):Oa(e,n)}const Lu=(e,t,n)=>{const r=yt(e,"object",t.keys);for(let s in r)r[s]=ii(r[s],t[s]);const o=Object.keys(r);let i={};if(o.length===t.keys.length)i=r;else{const s=yt(n,"object",t.keys);if(o.length===1&&t.locked){const a=o[0],c=r[a],l=s[a],u=l!==0?c/l:1;for(let d in s)d===a?i[a]=c:i[d]=s[d]*u}else i=E(E({},s),r)}return yt(i,t.format,t.keys)},Nu=(e,t)=>yt(e,"object",t.keys),ju=e=>!!e&&("step"in e||"min"in e||"max"in e);function Au(e,t,n=[]){const r=t,{lock:o=!1}=r,i=H(r,["lock"]),s=Array.isArray(e)?"array":"object",a=s==="object"?Object.keys(e):n,c=yt(e,"object",a),l=ju(i)?a.reduce((d,f)=>Object.assign(d,{[f]:i}),{}):i,u=Vi(c,l);return{value:s==="array"?e:c,settings:ve(E({},u),{format:s,keys:a,lock:o,locked:!1})}}function zi(e){return{schema:Ou(e.length),normalize:t=>{var n=t,{value:r}=n,o=H(n,["value"]);return Au(r,o,e)},format:(t,n)=>Nu(t,n),sanitize:(t,n,r)=>Lu(t,n,r)}}function Du(){const e=se();return g(Oe,{input:!0,get children(){return[g(Be,{get children(){return e.label}}),g(Ii,{get value(){return e.displayValue},get settings(){return e.settings},get onUpdate(){return e.onUpdate}})]}})}var Bu=E({component:Du},zi(["x","y","z"]));const Mu=C({$flexCenter:"",position:"relative",backgroundColor:"$elevation3",borderRadius:"$sm",cursor:"pointer",height:"$rowHeight",width:"$rowHeight",$draggable:"",$hover:"","&:active":{cursor:"none"},"&::after":{content:'""',backgroundColor:"$accent2",height:4,width:4,borderRadius:2}}),Iu=C({$flexCenter:"",width:"$joystickWidth",height:"$joystickHeight",borderRadius:"$sm",boxShadow:"$level2",position:"fixed",zIndex:1e4,overflow:"hidden",$draggable:"",transform:"translate(-50%, -50%)",variants:{isOutOfBounds:{true:{backgroundColor:"$elevation1"},false:{backgroundColor:"$elevation3"}}},"> div":{position:"absolute",$flexCenter:"",borderStyle:"solid",borderWidth:1,borderColor:"$highlight1",backgroundColor:"$elevation3",width:"80%",height:"80%","&::after,&::before":{content:'""',position:"absolute",zindex:10,backgroundColor:"$highlight1"},"&::before":{width:"100%",height:1},"&::after":{height:"100%",width:1}},"> span":{position:"relative",zindex:100,width:10,height:10,backgroundColor:"$accent2",borderRadius:"50%"}}),Vu=T("<div><div></div><span></span></div>"),zu=T("<div></div>"),Gu=e=>{const t=oe(),n=oe(0),r=oe(0),o=oe(1),[i,s]=B(!1),[a,c]=B(!1),[l,u]=Mi(),d=oe(null),f=oe(null);_(()=>{if(i()){const{top:L,left:N,width:M,height:z}=d.current.getBoundingClientRect();f.current.style.left=N+M/2+"px",f.current.style.top=L+z/2+"px"}});const{keys:[v,h],joystick:m}=e.settings,y=m==="invertY"?1:-1,{[v]:{step:x},[h]:{step:p}}=e.settings,b=at("sizes","joystickWidth"),S=at("sizes","joystickHeight"),O=parseFloat(b)*.8/2,R=parseFloat(S)*.8/2,G=Tr(()=>{t.current||(c(!0),n.current&&u({x:n.current*O}),r.current&&u({y:r.current*-R}),t.current=window.setInterval(()=>{e.onUpdate(L=>{const N=x*n.current*o.current,M=y*p*r.current*o.current;return Array.isArray(L)?{[v]:L[0]+N,[h]:L[1]+M}:{[v]:L[v]+N,[h]:L[h]+M}})},16))},[O,R,e.onUpdate,u,x,p,v,h,y]),j=Tr(()=>{window.clearTimeout(t.current),t.current=void 0,c(!1)});return I(()=>{function L(N){o.current=oi(N)}return window.addEventListener("keydown",L),window.addEventListener("keyup",L),()=>{window.clearTimeout(t.current),window.removeEventListener("keydown",L),window.removeEventListener("keyup",L)}}),I(()=>new Ct(d.current,({first:L,active:N,delta:[M,z],movement:[X,le]})=>{L&&s(!0);const ue=Ye(X,-O,O),ye=Ye(le,-R,R);n.current=Math.abs(X)>Math.abs(ue)?Math.sign(X-ue):0,r.current=Math.abs(le)>Math.abs(ye)?Math.sign(ye-le):0;let ge=e.value[v],be=e.value[h];N?(n.current||(ge+=M*x*o.current,u({x:ue})),r.current||(be-=y*z*p*o.current,u({y:ye})),n.current||r.current?G():j(),e.onUpdate({[v]:ge,[h]:be})):(s(!1),n.current=0,r.current=0,u({x:0,y:0}),j())})),(()=>{const L=zu.cloneNode(!0);return(N=>d.current=N)(L),k(L,g(Ce,{get when(){return i()},get children(){return g(jo,{get children(){const N=Vu.cloneNode(!0),M=N.firstChild,z=M.nextSibling;return(X=>f.current=X)(N),(X=>l.current=X)(z),_(()=>N.className=Iu({isOutOfBounds:a()})),N}})}})),_(()=>L.className=Mu()),L})()},Uu=T("<div></div>"),Wu=C({display:"grid",columnGap:"$colGap",variants:{withJoystick:{true:{gridTemplateColumns:"$sizes$rowHeight auto"},false:{gridTemplateColumns:"auto"}}}});function Hu(){const e=se();return g(Oe,{input:!0,get children(){return[g(Be,{get children(){return e.label}}),(()=>{const t=Uu.cloneNode(!0);return k(t,g(Ce,{get when(){return e.settings.joystick},get children(){return g(Gu,{get value(){return e.displayValue},get settings(){return e.settings},get onUpdate(){return e.onUpdate}})}}),null),k(t,g(Ii,{get value(){return e.displayValue},get settings(){return e.settings},get onUpdate(){return e.onUpdate}}),null),_(()=>t.className=Wu({withJoystick:!!e.settings.joystick})),t})()]}})}const Gi=zi(["x","y"]),Fu=e=>{var t=e,{joystick:n=!0}=t,r=H(t,["joystick"]);const{value:o,settings:i}=Gi.normalize(r);return{value:o,settings:ve(E({},i),{joystick:n})}};var Ku=ve(E({component:Hu},Gi),{normalize:Fu});const fo=ie().number(),qu=(e,t)=>ie().array().length(2).every.number().test(e)&&ie().schema({min:fo,max:fo}).test(t),Mn=e=>({min:e[0],max:e[1]}),Ui=(e,{bounds:[t,n]},r)=>{const o={min:r[0],max:r[1]},{min:i,max:s}=E(E({},o),e);return[Ye(Number(i),t,Math.max(t,s)),Ye(Number(s),Math.min(n,i),n)]},Yu=({value:e,min:t,max:n})=>{const r={min:t,max:n},o=Vi(Mn(e),{min:r,max:r}),i=[t,n],s=ve(E({},o),{bounds:i});return{value:Ui(Mn(e),s,e),settings:s}};var Xu=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",schema:qu,format:Mn,sanitize:Ui,normalize:Yu});const Ju=T("<div><div><div></div></div><div></div><div></div></div>"),Zu=T("<div></div>"),Qu=C({display:"grid",columnGap:"$colGap",gridTemplateColumns:"auto calc($sizes$numberInputMinWidth * 2 + $space$rowGap)"});function ef(e){var t=e,{value:n,bounds:[r,o],onDrag:i}=t,s=H(t,["value","bounds","onDrag"]);const a=oe(null),c=oe(null),l=oe(null),u=oe(0),d=at("sizes","scrubberWidth");I(()=>{new Ct(a.current,({event:h,first:m,xy:[y],movement:[x],memo:p={}})=>{if(m){const{width:S,left:O}=a.current.getBoundingClientRect();u.current=S-parseFloat(d);const R=h?.target===c.current||h?.target===l.current;p.pos=Xt((y-O)/S,r,o);const G=Math.abs(p.pos-n.min)-Math.abs(p.pos-n.max);p.key=G<0||G===0&&p.pos<=n.min?"min":"max",R&&(p.pos=n[p.key])}const b=p.pos+Xt(x/u.current,0,o-r);return i({[p.key]:Sl(b,s[p.key])}),p})});const f=`calc(${Yt(n.min,r,o)} * (100% - ${d} - 8px) + 4px)`,v=`calc(${1-Yt(n.max,r,o)} * (100% - ${d} - 8px) + 4px)`;return(()=>{const h=Ju.cloneNode(!0),m=h.firstChild,y=m.firstChild,x=m.nextSibling,p=x.nextSibling;return(b=>a.current=b)(h),y.style.setProperty("left",f),y.style.setProperty("right",v),(b=>c.current=b)(x),x.style.setProperty("left",f),(b=>l.current=b)(p),p.style.setProperty("right",v),_(b=>{const S=bi(),O=yi(),R=xi(),G=Nn({position:"left"}),j=Nn({position:"right"});return S!==b._v$&&(h.className=b._v$=S),O!==b._v$2&&(m.className=b._v$2=O),R!==b._v$3&&(y.className=b._v$3=R),G!==b._v$4&&(x.className=b._v$4=G),j!==b._v$5&&(p.className=b._v$5=j),b},{_v$:void 0,_v$2:void 0,_v$3:void 0,_v$4:void 0,_v$5:void 0}),h})()}function tf(){const e=se();return g(Oe,{input:!0,get children(){return[g(Be,{get children(){return e.label}}),(()=>{const t=Zu.cloneNode(!0);return k(t,g(ef,_e({get value(){return e.displayValue}},()=>e.settings,{get onDrag(){return e.onUpdate}}))),_(()=>t.className=Qu()),t})()]}})}var nf=E({component:tf},Xu);const rf=()=>{const e=new Map;return{on:(t,n)=>{let r=e.get(t);r===void 0&&(r=new Set,e.set(t,r)),r.add(n)},off:(t,n)=>{const r=e.get(t);r!==void 0&&(r.delete(n),r.size===0&&e.delete(t))},emit:(t,...n)=>{const r=e.get(t);if(r!==void 0)for(const o of r)o(...n)}}},of=e=>(t,n,r)=>{const o=r.subscribe;return r.subscribe=(s,a,c)=>{let l=s;if(a){const u=c?.equalityFn||Object.is;let d=s(r.getState());l=f=>{const v=s(f);if(!u(d,v)){const h=d;a(d=v,h)}},c?.fireImmediately&&a(d,d)}return o(l)},e(t,n,r)},sf=function(){const e=va(of(()=>({data:{}}))),t=rf();this.useStore=e,this.storeId=Pa();const n={},r=new Set;this.getVisiblePaths=()=>{const i=this.getData(),s=Object.keys(i),a=[];Object.entries(n).forEach(([l,u])=>{u.render&&s.some(d=>d.indexOf(l)===0)&&!u.render(this.get)&&a.push(l+".")});const c=[];return r.forEach(l=>{l in i&&i[l].__refCount>0&&a.every(u=>l.indexOf(u)===-1)&&(!i[l].render||i[l].render(this.get))&&c.push(l)}),c},this.setOrderedPaths=i=>{i.forEach(s=>r.add(s))},this.orderPaths=i=>(this.setOrderedPaths(i),i),this.disposePaths=i=>{e.setState(s=>{const a=s.data;return i.forEach(c=>{if(c in a){const l=a[c];l.__refCount--,l.__refCount===0&&l.type in ke&&delete a[c]}}),{data:a}})},this.dispose=()=>{e.setState(()=>({data:{}}))},this.getFolderSettings=i=>n[i]||{},this.getData=()=>e.getState().data,this.addData=(i,s)=>{e.setState(a=>{const c=a.data;return Object.entries(i).forEach(([l,u])=>{let d=c[l];if(d){const f=u,{type:v,value:h}=f,m=H(f,["type","value"]);v!==d.type?Ne(pe.INPUT_TYPE_OVERRIDE,v):((d.__refCount===0||s)&&Object.assign(d,m),d.__refCount++)}else c[l]=ve(E({},u),{__refCount:1})}),{data:c}})},this.setValueAtPath=(i,s,a)=>{e.setState(c=>{const l=c.data;return Mr(l[i],s,i,this,a),{data:l}})},this.setSettingsAtPath=(i,s)=>{e.setState(a=>{const c=a.data;return c[i].settings=E(E({},c[i].settings),s),{data:c}})},this.disableInputAtPath=(i,s)=>{e.setState(a=>{const c=a.data;return c[i].disabled=s,{data:c}})},this.set=(i,s)=>{e.setState(a=>{const c=a.data;return Object.entries(i).forEach(([l,u])=>{try{Mr(c[l],u,void 0,void 0,s)}catch{}}),{data:c}})},this.getInput=i=>{try{return this.getData()[i]}catch{Ne(pe.PATH_DOESNT_EXIST,i)}},this.get=i=>{var s;return(s=this.getInput(i))==null?void 0:s.value},this.emitOnEditStart=i=>{t.emit(`onEditStart:${i}`,this.get(i),i,ve(E({},this.getInput(i)),{get:this.get}))},this.emitOnEditEnd=i=>{t.emit(`onEditEnd:${i}`,this.get(i),i,ve(E({},this.getInput(i)),{get:this.get}))},this.subscribeToEditStart=(i,s)=>(t.on(`onEditStart:${i}`,s),()=>t.off(i,s)),this.subscribeToEditEnd=(i,s)=>(t.on(`onEditEnd:${i}`,s),()=>t.off(i,s));const o=(i,s,a)=>{const c={};return Object.entries(i).forEach(([l,u])=>{if(l==="")return Ne(pe.EMPTY_KEY);let d=ti(s,l);if(u.type===ke.FOLDER){const f=o(u.schema,d,a);Object.assign(c,f),d in n||(n[d]=u.settings)}else if(l in a)Ne(pe.DUPLICATE_KEYS,l,d,a[l].path);else{const f=Ra(u,l,d,c);if(f){const{type:v,options:h,input:m}=f,y=h,{onChange:x,transient:p,onEditStart:b,onEditEnd:S}=y,O=H(y,["onChange","transient","onEditStart","onEditEnd"]);c[d]=ve(E(E({type:v},O),m),{fromPanel:!0}),a[l]={path:d,onChange:x,transient:p,onEditStart:b,onEditEnd:S}}else Ne(pe.UNKNOWN_INPUT,d,u)}}),c};this.getDataFromSchema=i=>{const s={};return[o(i,"",s),s]}},we=new sf,af={collapsed:!1};function cf(e,t){return{type:ke.FOLDER,schema:e,settings:E(E({},af),t)}}/*!
 * isobject <https://github.com/jonschlinkert/isobject>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */var lf=function(t){return t!=null&&typeof t=="object"&&Array.isArray(t)===!1};/*!
 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */var uf=lf;function vo(e){return uf(e)===!0&&Object.prototype.toString.call(e)==="[object Object]"}var Wi=function(t){var n,r;return!(vo(t)===!1||(n=t.constructor,typeof n!="function")||(r=n.prototype,vo(r)===!1)||r.hasOwnProperty("isPrototypeOf")===!1)};/*!
 * is-extendable <https://github.com/jonschlinkert/is-extendable>
 *
 * Copyright (c) 2015-2017, Jon Schlinkert.
 * Released under the MIT License.
 */var ff=Wi,or=function(t){return ff(t)||typeof t=="function"||Array.isArray(t)};/*!
 * for-in <https://github.com/jonschlinkert/for-in>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */var df=function(t,n,r){for(var o in t)if(n.call(r,t[o],o,t)===!1)break},vf=or,hf=df;function Hi(e,t){for(var n=arguments.length,r=0;++r<n;){var o=arguments[r];In(o)&&hf(o,gf,e)}return e}function gf(e,t){if(pf(t)){var n=this[t];In(e)&&In(n)?Hi(n,e):this[t]=e}}function In(e){return vf(e)&&!Array.isArray(e)}function pf(e){return e!=="__proto__"&&e!=="constructor"&&e!=="prototype"}var mf=Hi;/*!
 * get-value <https://github.com/jonschlinkert/get-value>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */var yf=function(e,t,n,r,o){if(!bf(e)||!t)return e;if(t=Dt(t),n&&(t+="."+Dt(n)),r&&(t+="."+Dt(r)),o&&(t+="."+Dt(o)),t in e)return e[t];for(var i=t.split("."),s=i.length,a=-1;e&&++a<s;){for(var c=i[a];c[c.length-1]==="\\";)c=c.slice(0,-1)+"."+i[++a];e=e[c]}return e};function bf(e){return e!==null&&(typeof e=="object"||typeof e=="function")}function Dt(e){return e?Array.isArray(e)?e.join("."):e:""}/*!
 * assign-symbols <https://github.com/jonschlinkert/assign-symbols>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */var xf=function(e,t){if(e===null||typeof e>"u")throw new TypeError("expected first argument to be an object.");if(typeof t>"u"||typeof Symbol>"u"||typeof Object.getOwnPropertySymbols!="function")return e;for(var n=Object.prototype.propertyIsEnumerable,r=Object(e),o=arguments.length,i=0;++i<o;)for(var s=Object(arguments[i]),a=Object.getOwnPropertySymbols(s),c=0;c<a.length;c++){var l=a[c];n.call(s,l)&&(r[l]=s[l])}return r},wf=or,$f=xf,_f=Object.assign||function(e){if(e===null||typeof e>"u")throw new TypeError("Cannot convert undefined or null to object");ho(e)||(e={});for(var t=1;t<arguments.length;t++){var n=arguments[t];kf(n)&&(n=Pf(n)),ho(n)&&(Sf(e,n),$f(e,n))}return e};function Sf(e,t){for(var n in t)Tf(t,n)&&(e[n]=t[n])}function kf(e){return e&&typeof e=="string"}function Pf(e){var t={};for(var n in e)t[n]=e[n];return t}function ho(e){return e&&typeof e=="object"||wf(e)}function Tf(e,t){return Object.prototype.hasOwnProperty.call(e,t)}/*!
 * split-string <https://github.com/jonschlinkert/split-string>
 *
 * Copyright (c) 2015-2017, Jon Schlinkert.
 * Released under the MIT License.
 */var Cf=_f,Ef=function(e,t,n){if(typeof e!="string")throw new TypeError("expected a string");typeof t=="function"&&(n=t,t=null),typeof t=="string"&&(t={sep:t});var r=Cf({sep:"."},t),o=r.quotes||['"',"'","`"],i;r.brackets===!0?i={"<":">","(":")","[":"]","{":"}"}:r.brackets&&(i=r.brackets);var s=[],a=[],c=[""],l=r.sep,u=e.length,d=-1,f;function v(){if(i&&a.length)return i[a[a.length-1]]}for(;++d<u;){var h=e[d],m=e[d+1],y={val:h,idx:d,arr:c,str:e};if(s.push(y),h==="\\"){y.val=Rf(r,e,d)===!0?h+m:m,y.escaped=!0,typeof n=="function"&&n(y),c[c.length-1]+=y.val,d++;continue}if(i&&i[h]){a.push(h);var x=v(),p=d+1;if(e.indexOf(x,p+1)!==-1)for(;a.length&&p<u;){var b=e[++p];if(b==="\\"){b++;continue}if(o.indexOf(b)!==-1){p=Vn(e,b,p+1);continue}if(x=v(),a.length&&e.indexOf(x,p+1)===-1)break;if(i[b]){a.push(b);continue}x===b&&a.pop()}if(f=p,f===-1){c[c.length-1]+=h;continue}h=e.slice(d,f+1),y.val=h,y.idx=d=f}if(o.indexOf(h)!==-1){if(f=Vn(e,h,d+1),f===-1){c[c.length-1]+=h;continue}Of(h,r)===!0?h=e.slice(d,f+1):h=e.slice(d+1,f),y.val=h,y.idx=d=f}if(typeof n=="function"&&(n(y,s),h=y.val,d=y.idx),y.val===l&&y.split!==!1){c.push("");continue}c[c.length-1]+=y.val}return c};function Vn(e,t,n,r){var o=e.indexOf(t,n);return e.charAt(o-1)==="\\"?Vn(e,t,o+1):o}function Of(e,t){return t.keepDoubleQuotes===!0&&e==='"'||t.keepSingleQuotes===!0&&e==="'"?!0:t.keepQuotes}function Rf(e,t,n){return typeof e.keepEscaping=="function"?e.keepEscaping(t,n):e.keepEscaping===!0||t[n+1]==="\\"}/*!
 * is-extendable <https://github.com/jonschlinkert/is-extendable>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */var Fi=function(t){return typeof t<"u"&&t!==null&&(typeof t=="object"||typeof t=="function")},go=Fi,Lf=function(t){go(t)||(t={});for(var n=arguments.length,r=1;r<n;r++){var o=arguments[r];go(o)&&Nf(t,o)}return t};function Nf(e,t){for(var n in t)jf(t,n)&&(e[n]=t[n])}function jf(e,t){return Object.prototype.hasOwnProperty.call(e,t)}/*!
 * set-value <https://github.com/jonschlinkert/set-value>
 *
 * Copyright (c) 2014-2015, 2017, Jon Schlinkert.
 * Released under the MIT License.
 */var Af=Ef,Df=Lf,po=Wi,mo=Fi,Bf=function(e,t,n){if(!mo(e)||(Array.isArray(t)&&(t=[].concat.apply([],t).join(".")),typeof t!="string"))return e;for(var r=Af(t,{sep:".",brackets:!0}).filter(Mf),o=r.length,i=-1,s=e;++i<o;){var a=r[i];if(i!==o-1){mo(s[a])||(s[a]={}),s=s[a];continue}po(s[a])&&po(n)?s[a]=Df({},s[a],n):s[a]=n}return e};function Mf(e){return e!=="__proto__"&&e!=="constructor"&&e!=="prototype"}var yn=or,yo=mf,If=yf,bo=Bf,Vf=function(t,n,r){if(!yn(t))throw new TypeError("expected an object");if(typeof n!="string"||r==null)return yo.apply(null,arguments);if(typeof r=="string")return bo(t,n,r),t;var o=If(t,n);return yn(r)&&yn(o)&&(r=yo({},o,r)),bo(t,n,r),t};const zf=e=>"__levaInput"in e,bn=(e,t)=>{const n={},r=t?t.toLowerCase():null;return e.forEach(o=>{const[i,s]=Ta(o);(!r||i.toLowerCase().indexOf(r)>-1)&&Vf(n,s,{[i]:{__levaInput:!0,path:o}})}),n},Gf=T("<div><div></div></div>");function Uf(e){return(()=>{const t=Gf.cloneNode(!0),n=t.firstChild;return t.$$click=()=>e.toggle(),k(t,g(nr,{get toggled(){return e.toggled}}),n),k(n,()=>e.name),_(()=>t.className=wc()),t})()}Ee(["click"]);const Wf=T("<div></div>");function Hf(e){return g(ci.Provider,{value:e,get children(){return e.children}})}function Ff(e){const{displayValue:t,onChange:n,onUpdate:r}=Bi(e),o=qe[e.type].component;return o?g(Hf,{get value(){return e.value},get key(){return e.valueKey},get id(){return""+e.path},get displayValue(){return t()},onChange:n,onUpdate:r,get settings(){return e.settings},get setSettings(){return e.setSettings},get label(){return e.label},get children(){const i=Wf.cloneNode(!0);return k(i,g(Fn,{component:o})),_(()=>i.className=Sc({disabled:e.disabled})),i}}):(Ne(pe.NO_COMPONENT_FOR_TYPE,e.type,e.path),null)}const Kf=C("button",{display:"block",$reset:"",fontWeight:"$button",color:"$highlight3",height:"$rowHeight",borderStyle:"none",borderRadius:"$sm",backgroundColor:"$accent2",cursor:"pointer",$hover:"$accent3",$active:"$accent3 $accent1",$focus:""}),qf=T("<button></button>");function Yf(e){return g(Oe,{get children(){const t=qf.cloneNode(!0);return t.$$click=()=>e.onClick(),k(t,()=>e.label),_(()=>t.className=Kf()),t}})}Ee(["click"]);const Xf=C({$flex:"",justifyContent:"flex-end",gap:"$colGap"}),Jf=C({$reset:"",cursor:"pointer",borderRadius:"$xs","&:hover":{backgroundColor:"$elevation3"}}),Zf=T("<div></div>"),Qf=T("<button></button>"),ed=({label:e,opts:t})=>{let n=typeof e=="string"&&e.trim()===""?null:e,r=t;return typeof t.opts=="object"&&(r.label!==void 0&&(n=t.label),r=t.opts),{label:n,opts:r}};function td(e){const{label:t,opts:n}=ed(e);return g(Oe,{input:!!t,get children(){return[D(()=>t&&g(Be,{children:t})),(()=>{const r=Zf.cloneNode(!0);return k(r,()=>Object.entries(n).map(([o,i])=>(()=>{const s=Qf.cloneNode(!0);return s.$$click=()=>i(),k(s,o),_(()=>s.className=Jf()),s})())),_(()=>r.className=Xf()),r})()]}})}Ee(["click"]);const nd={[ke.BUTTON]:Yf,[ke.BUTTON_GROUP]:td},rd=e=>{const[t,{set:n,setSettings:r,disable:o,storeId:i,emitOnEditStart:s,emitOnEditEnd:a}]=ou(e.path);return g(ds,{get children(){return[g(ln,{get when(){return!t()},children:null}),g(ln,{get when(){return D(()=>t().type in ke,!0)()?t():void 0},get children(){return g(Fn,_e({get component(){return nd[t().type]},get path(){return e.path}},t))}}),g(ln,{get when(){return D(()=>t().type in qe,!0)()?t():void 0},get children(){return g(Ff,{get type(){return t().type},get label(){return t().label},storeId:i,get path(){return e.path},get valueKey(){return t().key},setValue:n,get value(){return t().value},setSettings:r,get settings(){return t().settings},disable:o,emitOnEditStart:s,emitOnEditEnd:a,fromPanel:!0,disabled:!1,optional:!1})}})]}})},od=T("<div></div>"),id=T("<div><div></div></div>"),sd=e=>{const t=Qn(),n=ti(e.path,e.name),{collapsed:r,color:o}=t.getFolderSettings(n),[i,s]=B(!r);let a;const c=at("colors","folderWidgetColor"),l=at("colors","folderTextColor");return I(()=>{a.style.setProperty("--leva-colors-folderWidgetColor",o||c),a.style.setProperty("--leva-colors-folderTextColor",o||l)}),(()=>{const u=od.cloneNode(!0),d=a;return typeof d=="function"?d(u):a=u,k(u,g(Uf,{get name(){return e.name},get toggled(){return i()},toggle:()=>s(f=>!f)}),null),k(u,g(Ki,{parent:n,get tree(){return e.tree},isRoot:!1,get toggled(){return i()}}),null),_(()=>u.className=Jt({isRoot:!1})),u})()},Ki=e=>{const{wrapperRef:t,contentRef:n}=ru();return(()=>{const r=id.cloneNode(!0),o=r.firstChild;return(i=>t.current=i)(r),(i=>n.current=i)(o),k(o,g(Wn,{get each(){return Object.keys(e.tree)},children:i=>g(Ce,{get when(){return zf(e.tree[i])},get fallback(){return g(sd,{name:i,get path(){return e.parent},get tree(){return e.tree[i]}})},get children(){return g(rd,{get key(){return e.tree[i].path},get valueKey(){return e.tree[i].valueKey},get path(){return e.tree[i].path}})}})})),_(i=>{var s;const a=Rn({isRoot:(s=e.isRoot)!=null?s:!1,fill:e.fill,flat:e.flat}),c=e.toggled?{overflow:"visible",height:"auto"}:{overflow:"hidden",height:0},l=gi({isRoot:e.isRoot,toggled:e.toggled});return a!==i._v$&&(r.className=i._v$=a),i._v$2=Hn(r,c,i._v$2),l!==i._v$3&&(o.className=i._v$3=l),i},{_v$:void 0,_v$2:void 0,_v$3:void 0}),r})()},ad=C({position:"relative",fontFamily:"$mono",fontSize:"$root",color:"$rootText",backgroundColor:"$elevation1",variants:{fill:{false:{position:"fixed",top:"10px",right:"10px",zIndex:1e3,width:"$rootWidth"},true:{position:"relative",width:"100%"}},flat:{false:{borderRadius:"$lg",boxShadow:"$level1"}},oneLineLabels:{true:{[`${mi}`]:{gridTemplateColumns:"auto",gridAutoColumns:"minmax(max-content, 1fr)",gridAutoRows:"minmax($sizes$rowHeight), auto)",rowGap:0,columnGap:0,marginTop:"$rowGap"}}},hideTitleBar:{true:{$$titleBarHeight:"0px"},false:{$$titleBarHeight:"$sizes$titleBarHeight"}}},"&,*,*:after,*:before":{boxSizing:"border-box"},"*::selection":{backgroundColor:"$accent2"}}),qi=40,Qt=C("i",{$flexCenter:"",width:qi,userSelect:"none",cursor:"pointer","> svg":{fill:"$highlight1",transition:"transform 350ms ease, fill 250ms ease"},"&:hover > svg":{fill:"$highlight3"},variants:{active:{true:{"> svg":{fill:"$highlight2"}}}}}),cd=C("div",{display:"flex",alignItems:"stretch",justifyContent:"space-between",height:"$titleBarHeight",variants:{mode:{drag:{cursor:"grab"}}}}),ld=C("div",{$flex:"",position:"relative",width:"100%",overflow:"hidden",transition:"height 250ms ease",color:"$highlight3",paddingLeft:"$md",[`> ${Qt}`]:{height:30},variants:{toggled:{true:{height:30},false:{height:0}}}}),ud=C({$reset:"",flex:1,position:"relative",height:30,width:"100%",backgroundColor:"transparent",fontSize:"10px",borderRadius:"$root","&:focus":{},"&::placeholder":{color:"$highlight2"}}),fd=C("div",{$flexCenter:"",flex:1,"> svg":{fill:"$highlight1"},color:"$highlight1",variants:{drag:{true:{$draggable:"","> svg":{transition:"fill 250ms ease"},"&:hover":{color:"$highlight3"},"&:hover > svg":{fill:"$highlight3"}}},filterEnabled:{false:{paddingRight:qi}}}}),dd=T('<input placeholder="[Open filter with CMD+SHIFT+L]">'),vd=T('<div><svg xmlns="http://www.w3.org/2000/svg" height="14" width="14" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg></div>'),hd=T("<div><div></div><div></div></div>"),gd=T("<div></div>"),pd=T('<svg width="20" height="10" viewBox="0 0 28 14" xmlns="http://www.w3.org/2000/svg"><circle cx="2" cy="2" r="2"></circle><circle cx="14" cy="2" r="2"></circle><circle cx="26" cy="2" r="2"></circle><circle cx="2" cy="12" r="2"></circle><circle cx="14" cy="12" r="2"></circle><circle cx="26" cy="12" r="2"></circle></svg>'),md=T('<div><svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 20 20"><path d="M9 9a2 2 0 114 0 2 2 0 01-4 0z"></path><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a4 4 0 00-3.446 6.032l-2.261 2.26a1 1 0 101.414 1.415l2.261-2.261A4 4 0 1011 5z" clip-rule="evenodd"></path></svg></div>'),yd=e=>{const[t,n]=B(""),r=D(()=>La(e.setFilter,50)),o=()=>{e.setFilter(""),n("")},i=s=>{const a=s.currentTarget.value;e.toggle(!0),n(a)};return I(()=>{r()(t())}),[(()=>{const s=dd.cloneNode(!0);s.$$input=i,s.$$pointerdown=c=>c.stopPropagation();const a=e.ref;return typeof a=="function"?a(s):e.ref=s,_(c=>{const l=ud(),u=t();return l!==c._v$&&(s.className=c._v$=l),u!==c._v$2&&(s.value=c._v$2=u),c},{_v$:void 0,_v$2:void 0}),s})(),(()=>{const s=vd.cloneNode(!0);return s.$$click=()=>o(),_(a=>{const c=Qt(),l=t()?"visible":"hidden";return c!==a._v$3&&(s.className=a._v$3=c),l!==a._v$4&&s.style.setProperty("visibility",a._v$4=l),a},{_v$3:void 0,_v$4:void 0}),s})()]};function bd(e){const[t,n]=B(!1);let r;I(()=>{t()?r?.focus():r?.blur()});let o;return I(()=>{new Ct(o,({offset:[i,s]})=>e.onDrag({x:i,y:s}),{filterTaps:!0})}),I(()=>{const i=s=>{s.key==="L"&&s.shiftKey&&s.metaKey&&n(a=>!a)};window.addEventListener("keydown",i),$e(()=>window.removeEventListener("keydown",i))},[]),[(()=>{const i=hd.cloneNode(!0),s=i.firstChild,a=s.nextSibling;s.$$click=()=>e.toggle(),k(s,g(nr,{get toggled(){return e.toggled},width:12,height:8}));const c=o;return typeof c=="function"?c(a):o=a,k(a,(()=>{const l=D(()=>!!(e.title===void 0&&e.drag),!0);return()=>l()?pd.cloneNode(!0):e.title})()),k(i,(()=>{const l=D(()=>!!e.filterEnabled,!0);return()=>l()&&(()=>{const u=md.cloneNode(!0);return u.$$click=()=>n(d=>!d),_(()=>u.className=Qt({active:t()})),u})()})(),null),_(l=>{const u=cd({mode:e.drag?"drag":void 0}),d=Qt({active:!e.toggle}),f=fd({filterEnabled:e.filterEnabled});return u!==l._v$5&&(i.className=l._v$5=u),d!==l._v$6&&(s.className=l._v$6=d),f!==l._v$7&&(a.className=l._v$7=f),l},{_v$5:void 0,_v$6:void 0,_v$7:void 0}),i})(),(()=>{const i=gd.cloneNode(!0);return k(i,g(yd,{ref(s){const a=r;typeof a=="function"?a(s):r=s},get setFilter(){return e.setFilter},get toggle(){return e.toggle}})),_(()=>i.className=ld({toggled:t()})),i})()]}Ee(["pointerdown","input","click"]);const xd=T("<div></div>");function wd(e){const t=D(()=>gc(e.theme),[]),[n,r]=B(!0);return g(Ce,{get when(){return e.store},get children(){return g(li.Provider,{get value(){return t()},get children(){return g($d,{get store(){return e.store},get toggled(){return n()},setToggle:r,get rootClass(){return t().className},flat:!1,fill:!1,titleBar:!0})}})}})}const $d=e=>{const[t,n]=B(""),[r,o]=B(bn(e.store.getVisiblePaths(),t()));I(()=>{o(bn(e.store.getVisiblePaths(),t())),e.store.useStore.subscribe(()=>{o(bn(e.store.getVisiblePaths(),t()))})});const[i,s]=Mi();return g(fi.Provider,{value:{hideCopyButton:!1},get children(){const a=xd.cloneNode(!0);return(c=>i.current=c)(a),a.style.setProperty("display","block"),k(a,g(Ce,{get when(){return e.titleBar},get children(){return g(bd,{onDrag:s,setFilter:n,toggle:c=>e.setToggle(l=>c??!l),get toggled(){return e.toggled},get title(){return typeof e.titleBar=="object"&&e.titleBar.title||void 0},get drag(){var c;return typeof e.titleBar=="object"&&(c=e.titleBar.drag)!=null?c:!0},get filterEnabled(){var c;return typeof e.titleBar=="object"&&(c=e.titleBar.filter)!=null?c:!0}})}}),null),k(a,g(ui.Provider,{value:we,get children(){return g(Ki,{isRoot:!0,get fill(){return e.fill},get flat(){return e.flat},get tree(){return r()},get toggled(){return e.toggled}})}}),null),_(()=>a.className=`${ad({fill:e.fill,flat:e.flat,oneLineLabels:e.oneLineLabels,hideTitleBar:!1})} ${e.rootClass}`),a}})};function Yi(e){var t=e,{store:n}=t,r=H(t,["store"]);const o=Qn();return g(wd,_e({store:n===void 0?o:n},r))}let xo=!1,dt=null;function _d(){I(()=>{xo||(dt||(dt=document.getElementById("leva__root")||Object.assign(document.createElement("div"),{id:"leva__root"}),document.body&&(document.body.appendChild(dt),dt.className="fixed top-0 right-20",Lo(()=>g(Yi,{store:we}),dt))),xo=!0)})}function Sd(e,t,n,r,o){let i,s,a,c,l;return typeof e=="string"?(s=e,i=t,Array.isArray(n)?l=n:n&&("store"in n?(c=n,l=r):(a=n,Array.isArray(r)?l=r:(c=r,l=o)))):(i=e,Array.isArray(t)?l=t:(c=t,l=n)),{schema:i,folderName:s,folderSettings:a,hookSettings:c,deps:l||[]}}function xn(e,t,n,r){const{folderName:o,schema:i,folderSettings:s,hookSettings:a,deps:c}=Sd(e,t,n,r),l=D(()=>{const x=typeof i=="function"?i():i;return o?{[o]:cf(x,s)}:x});_d();const u=D(()=>we.getDataFromSchema(l())),d=D(()=>{const[x,p]=u(),b=[],S=[],O={},R={},G={};return Object.values(p).forEach(({path:j,onChange:L,onEditStart:N,onEditEnd:M,transient:z})=>{b.push(j),L?(O[j]=L,z||S.push(j)):S.push(j),N&&(R[j]=N),M&&(G[j]=M)}),[b,S,O,R,G]}),f=D(()=>we.orderPaths(d()[0])),[v,h]=B(u()[0]),[m,y]=Xo(u()[0]);return ts(()=>{let[x,p]=d(),[b]=u();we.useStore.subscribe(S=>{const O=E(E({},b),S.data);return Na(O,p)},S=>{h(S),y(S)})}),_(()=>{we.addData(u()[0],!1),$e(()=>we.disposePaths(f()))}),m}ze(Pe.SELECT,Ml);ze(Pe.NUMBER,Pl);ze(Pe.COLOR,cu);ze(Pe.STRING,hu);ze(Pe.BOOLEAN,$u);ze(Pe.INTERVAL,nf);ze(Pe.VECTOR3D,Bu);ze(Pe.VECTOR2D,Ku);const kd=T("<div></div>"),Pd=T("<div><canvas></canvas></div>"),Td=(e,t)=>({get read(){return e()},get write(){return t()},swap(){[e,t]=[t,e]}});function Cd(e,t,n){let r=0,o=0,i=0;const s=Math.floor(e*6),a=e*6-s,c=n*(1-t),l=n*(1-a*t),u=n*(1-(1-a)*t);switch(s%6){case 0:r=n,o=u,i=c;break;case 1:r=l,o=n,i=c;break;case 2:r=c,o=n,i=u;break;case 3:r=c,o=l,i=n;break;case 4:r=u,o=c,i=n;break;case 5:r=n,o=c,i=l;break}return{r:Math.round(r*255),g:Math.round(o*255),b:Math.round(i*255)}}const Ie=0,wo=3,Ed=e=>(I(()=>{if(!e.device||!e.context)return;const t=navigator.gpu.getPreferredCanvasFormat(),n=e.device.createShaderModule({code:`
`+Rs}),r=e.device.createShaderModule({code:We+`
`+Ls}),o=e.device.createShaderModule({code:We+`
`+Ns}),i=e.device.createShaderModule({code:`
`+js}),s=e.device.createShaderModule({code:`
`+As}),a=e.device.createShaderModule({code:We+`
`+Ds}),c=e.device.createShaderModule({code:We+`
`+Bs}),l=e.device.createShaderModule({code:We+`
`+Ms}),u=e.device.createShaderModule({code:We+`
`+Is}),d=e.device.createShaderModule({code:We+`
`+Vs}),f=e.device.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}}]}),v=e.device.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}}]}),h=e.device.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,texture:{viewDimension:"2d",sampleType:"unfilterable-float"}},{binding:1,visibility:GPUShaderStage.FRAGMENT,texture:{viewDimension:"2d",sampleType:"unfilterable-float"}},{binding:2,visibility:GPUShaderStage.FRAGMENT,texture:{viewDimension:"2d",sampleType:"unfilterable-float"}}]}),m=e.device.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,texture:{viewDimension:"2d",sampleType:"unfilterable-float"}},{binding:1,visibility:GPUShaderStage.FRAGMENT,texture:{viewDimension:"2d",sampleType:"unfilterable-float"}}]}),y=e.device.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,texture:{viewDimension:"2d",sampleType:"unfilterable-float"}},{binding:1,visibility:GPUShaderStage.FRAGMENT,texture:{viewDimension:"2d",sampleType:"unfilterable-float"}},{binding:2,visibility:GPUShaderStage.FRAGMENT,texture:{viewDimension:"2d",sampleType:"unfilterable-float"}}]}),x=e.device.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,texture:{viewDimension:"2d",sampleType:"unfilterable-float"}}]});e.device.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,texture:{viewDimension:"2d",sampleType:"unfilterable-float"}},{binding:1,visibility:GPUShaderStage.FRAGMENT,texture:{viewDimension:"2d",sampleType:"unfilterable-float"}}]});const p=e.device.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,texture:{viewDimension:"2d",sampleType:"unfilterable-float"}},{binding:1,visibility:GPUShaderStage.FRAGMENT,texture:{viewDimension:"2d",sampleType:"unfilterable-float"}}]}),b=e.device.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}}]}),S={vertex:{module:n,entryPoint:"vert"},primitive:{topology:"triangle-strip",stripIndexFormat:"uint16"}},O=e.device.createRenderPipeline({...S,fragment:{module:d,entryPoint:"splat",targets:[{format:"rgba32float"},{format:"rg32float"}]},layout:e.device.createPipelineLayout({bindGroupLayouts:[f,m,b]})}),R=e.device.createRenderPipeline({...S,fragment:{module:o,entryPoint:"advect",targets:[{format:"rgba32float"},{format:"rg32float"}]},layout:e.device.createPipelineLayout({bindGroupLayouts:[f,y]})});e.device.createRenderPipeline({...S,fragment:{module:i,entryPoint:"clear",targets:[{format:"r32float"}]},layout:e.device.createPipelineLayout({bindGroupLayouts:[f,x]})}),e.device.createRenderPipeline({...S,fragment:{module:s,entryPoint:"clear",targets:[{format:"r32float"}]},layout:e.device.createPipelineLayout({bindGroupLayouts:[f,x]})});const G=e.device.createRenderPipeline({...S,fragment:{module:a,entryPoint:"divergence",targets:[{format:"r32float"}]},layout:e.device.createPipelineLayout({bindGroupLayouts:[f,x]})}),j=e.device.createRenderPipeline({...S,fragment:{module:c,entryPoint:"jacobi",targets:[{format:"r32float"}]},layout:e.device.createPipelineLayout({bindGroupLayouts:[f,x,x]})}),L=e.device.createRenderPipeline({...S,fragment:{module:l,entryPoint:"gradient",targets:[{format:"rg32float"}]},layout:e.device.createPipelineLayout({bindGroupLayouts:[f,p]})}),N=e.device.createRenderPipeline({...S,fragment:{module:u,entryPoint:"vorticity",targets:[{format:"rg32float"}]},layout:e.device.createPipelineLayout({bindGroupLayouts:[f,x]})}),M=e.device.createRenderPipeline({...S,fragment:{module:r,entryPoint:"display",targets:[{format:t}]},layout:e.device.createPipelineLayout({bindGroupLayouts:[f,h]})}),z=()=>e.width,X=()=>e.height,le=()=>e.width>>Ie,ue=()=>e.height>>Ie,ye=()=>e.width>>wo,ge=()=>e.height>>wo;_(()=>{e.context.configure({device:e.device,alphaMode:"opaque",format:t,usage:GPUTextureUsage.COPY_SRC|GPUTextureUsage.RENDER_ATTACHMENT})});const be=(P,$)=>U=>(U&&U.destroy(),e.device.createTexture({format:P??t,dimension:"2d",mipLevelCount:1,size:[($?.width??le)(),($?.height??ue)()],usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT})),on=(P,$)=>Td(D(be(P,$)),D(be(P,$))),Ge=on("rgba32float"),te=on("rg32float"),Ue=on("r32float",{width:ye,height:ge}),ir=D(be("r32float",{width:ye,height:ge})),sn=e.device.createBuffer({size:7<<2,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST,mappedAtCreation:!1}),Xi=()=>e.device.createBuffer({size:10<<2,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST,mappedAtCreation:!1}),sr=e.device.createBuffer({size:6<<2,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST,mappedAtCreation:!1}),Re=[],ar=P=>{const $={identifier:P.identifier,x:P.clientX>>Ie,y:P.clientY>>Ie,time:Date.now(),previous:{time:Date.now(),x:P.clientX>>Ie,y:P.clientY>>Ie},uniform:Xi()};var U=e.config.color;e.setConfig("color",Cd(Math.random(),(Math.random()>1/4?1:0)/2+Math.random()*.5,Math.random()>1/6?1:0));var Me=1;e.device.queue.writeBuffer($.uniform,0<<2,new Float32Array([U.r/255*Me,U.g/255*Me,U.b/255*Me,1,$.x,$.y,0,0,$.previous.x,$.previous.y])),Re.push($)},an=P=>{const $=Re.find(U=>U.identifier===P.identifier);if(!$){ar(P);return}$.previous.time=$.time,$.previous.x=$.x,$.previous.y=$.y,$.time=Date.now(),$.x=P.clientX>>Ie,$.y=P.clientY>>Ie,e.device.queue.writeBuffer($.uniform,4<<2,new Float32Array([$.x,$.y,($.x-$.previous.x)/($.time-$.previous.time+1)*1e3,($.y-$.previous.y)/($.time-$.previous.time+1)*1e3,$.previous.x,$.previous.y]))},Xe=P=>{const $=Re.find(U=>U.identifier===P.identifier);$&&(Re.splice(Re.indexOf($),1),$.uniform.destroy())};xe(document.querySelector("canvas"),"mousemove",P=>{const $={clientX:P.clientX,clientY:P.clientY,identifier:-1};Re.find(Me=>Me.identifier===$.identifier)&&an($)}),xe(document.querySelector("canvas"),"mousedown",P=>{const $={clientX:P.clientX,clientY:P.clientY,identifier:-1};Xe($),P.button===0&&an($)}),xe(document.querySelector("canvas"),"mouseup",P=>{const $={clientX:P.clientX,clientY:P.clientY,identifier:-1};Xe($)}),xe(window,"wheel",P=>{P.preventDefault()},{passive:!1}),xe(window,"touchstart",P=>{P.preventDefault(),Xe({identifier:-1,clientX:0,clientY:0});for(let $=0;$<P.changedTouches.length;$++)ar(P.changedTouches[$])},{passive:!1}),xe(window,"touchmove",P=>{P.preventDefault(),Xe({identifier:-1,clientX:0,clientY:0});for(let $=0;$<P.changedTouches.length;$++)an(P.changedTouches[$])},{passive:!1});var Et=!1;xe(window,"keydown",P=>{P.key.includes("Shift")&&(Et=!0)},{passive:!1}),xe(window,"keyup",P=>{P.key.includes("Shift")&&(Et=!1)},{passive:!1}),xe(window,"touchend",({changedTouches:P})=>{Xe({identifier:-1,clientX:0,clientY:0});for(let $=0;$<P.length;$++)Xe(P[$])}),_(()=>{e.device.queue.writeBuffer(sn,0<<2,new Int32Array([le(),ue(),ye(),ge(),z(),X()])),e.device.queue.writeBuffer(sr,0<<2,new Int32Array([le(),ue(),ye(),ge(),z(),X()]))});const Je=e.device.createBindGroup({layout:f,entries:[{binding:0,resource:{buffer:sn}}]}),Ji=e.device.createBindGroup({layout:v,entries:[{binding:0,resource:{buffer:sr}}]});let cr,lr=new Date;const ur=()=>{let P=new Date,$=Math.min((+P-+lr)/1e3,1/10);e.device.queue.writeBuffer(sn,6<<2,new Float32Array([$])),lr=P;const U=e.device.createCommandEncoder();var Me=Re.length===0&&Et,Ot=Re.length===0&&e.config.paused||Me;for(const fe of Re){const ne=U.beginRenderPass({colorAttachments:[{view:Ge.write.createView(),clearValue:{r:0,g:0,b:0,a:1},storeOp:"store",loadOp:"clear"},{view:te.write.createView(),clearValue:{r:0,g:0,b:0,a:1},storeOp:"store",loadOp:"clear"}]});ne.setPipeline(O),ne.setBindGroup(0,Je),ne.setBindGroup(1,e.device.createBindGroup({layout:m,entries:[{binding:0,resource:Ge.read.createView()},{binding:1,resource:te.read.createView()}]})),ne.setBindGroup(2,e.device.createBindGroup({layout:b,entries:[{binding:0,resource:{buffer:fe.uniform}}]})),ne.draw(4,1,0,0),ne.end(),Et||Ge.swap(),te.swap()}for(let fe=0;fe<1;fe+=1){{const V=U.beginRenderPass({colorAttachments:[{view:ir().createView(),clearValue:{r:0,g:0,b:0,a:1},storeOp:"store",loadOp:"clear"}]});V.setPipeline(G),V.setBindGroup(0,Je),V.setBindGroup(1,e.device.createBindGroup({layout:x,entries:[{binding:0,resource:te.read.createView()}]})),V.draw(4,1,0,0),V.end()}const ne=e.device.createBindGroup({layout:x,entries:[{binding:0,resource:ir().createView()}]});let dr=[Ue.write.createView(),Ue.read.createView()],Zi=dr.map(V=>e.device.createBindGroup({layout:x,entries:[{binding:0,resource:V}]}));for(let V=0;V<e.config.pressureSolverIterations;V++){var fr=V%2;const Ze=U.beginRenderPass({colorAttachments:[{view:dr[fr],clearValue:{r:0,g:0,b:0,a:1},storeOp:"store",loadOp:"clear"}]});Ze.setPipeline(j),Ze.setBindGroup(0,Je),Ze.setBindGroup(1,ne),Ze.setBindGroup(2,Zi[1-fr]),Ze.draw(4,1,0,0),Ze.end(),Ue.swap()}if(!Ot){if(!Ot){const V=U.beginRenderPass({colorAttachments:[{view:te.write.createView(),clearValue:{r:0,g:0,b:0,a:1},storeOp:"store",loadOp:"clear"}]});V.setPipeline(L),V.setBindGroup(0,Je),V.setBindGroup(1,e.device.createBindGroup({layout:p,entries:[{binding:0,resource:Ue.read.createView()},{binding:1,resource:te.read.createView()}]})),V.draw(4,1,0,0),V.end(),te.swap()}if(!Ot){const V=U.beginRenderPass({colorAttachments:[{view:Ge.write.createView(),clearValue:{r:0,g:0,b:0,a:1},storeOp:"store",loadOp:"clear"},{view:te.write.createView(),clearValue:{r:0,g:0,b:0,a:1},storeOp:"store",loadOp:"clear"}]});V.setPipeline(R),V.setBindGroup(0,Je),V.setBindGroup(1,e.device.createBindGroup({layout:y,entries:[{binding:0,resource:Ge.read.createView()},{binding:1,resource:te.read.createView()},{binding:2,resource:Ue.read.createView()}]})),V.draw(4,1,0,0),V.end(),Ge.swap(),te.swap(),Ue.swap()}}}if(!Ot){const fe=U.beginRenderPass({colorAttachments:[{view:te.write.createView(),clearValue:{r:0,g:0,b:0,a:1},storeOp:"store",loadOp:"clear"}]});fe.setPipeline(N),fe.setBindGroup(0,Je),fe.setBindGroup(1,e.device.createBindGroup({layout:x,entries:[{binding:0,resource:te.read.createView()}]})),fe.draw(4,1,0,0),fe.end(),te.swap()}{const fe=e.context.getCurrentTexture(),ne=U.beginRenderPass({colorAttachments:[{view:fe.createView(),clearValue:{r:0,g:0,b:0,a:1},storeOp:"store",loadOp:"clear"}]});ne.setPipeline(M),ne.setBindGroup(0,Ji),ne.setBindGroup(1,e.device.createBindGroup({layout:h,entries:[{binding:0,resource:Ge.read.createView()},{binding:1,resource:Ue.read.createView()},{binding:2,resource:te.read.createView()}]})),ne.draw(4,1,0,0),ne.end()}e.device.queue.submit([U.finish()]),cr=requestAnimationFrame(ur)};rs(ur),$e(()=>cancelAnimationFrame(cr))}),kd.cloneNode(!0)),Od=()=>{const[e,t]=B(window.innerWidth),[n,r]=B(window.innerHeight),[o,i]=B(),[s,a]=B(),[c,l]=Xo({pressureSolverIterations:100,color:{r:1,g:1,b:1},paused:!1}),u=(...v)=>{var h=l(...v);document.querySelector("#leva__root")?.remove(),we.disposePaths([v[0]]);try{we.setValueAtPath(v[0],v[1],!1)}catch(m){console.log("E",m)}return f(xn({pressureSolverIterations:c.pressureSolverIterations,color:{...c.color},paused:c.paused})),h},[d,f]=B(xn({pressureSolverIterations:c.pressureSolverIterations,color:{...c.color},paused:c.paused}));return xe(window,"resize",()=>{t(window.innerWidth),r(window.innerHeight)}),(async()=>{const v=await navigator.gpu?.requestAdapter();if(!v)throw new Error("No GPU support");return await v.requestDevice()})().then(v=>{console.log("D",v),a(v)}),I(()=>{xn(()=>({pressureSolverIterations:c.pressureSolverIterations}))}),(()=>{const v=Pd.cloneNode(!0),h=v.firstChild;return Ss(m=>i(m.getContext("webgpu")),h),k(v,g(Ed,{get context(){return o()},get device(){return s()},get width(){return e()},get height(){return n()},get config(){return d()},setConfig:u}),null),k(v,g(Yi,{store:we}),null),_(m=>{const y=e(),x=n();return y!==m._v$&&ce(h,"width",m._v$=y),x!==m._v$2&&ce(h,"height",m._v$2=x),m},{_v$:void 0,_v$2:void 0}),v})()};Lo(()=>g(Od,{}),document.getElementById("root"));
