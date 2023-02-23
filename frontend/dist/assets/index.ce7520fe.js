const vt=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function n(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerpolicy&&(o.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?o.credentials="include":r.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(r){if(r.ep)return;r.ep=!0;const o=n(r);fetch(r.href,o)}};vt();function p(){}const wt=t=>t;function yt(t,e){for(const n in e)t[n]=e[n];return t}function kt(t){return t&&typeof t=="object"&&typeof t.then=="function"}function at(t){return t()}function ze(){return Object.create(null)}function oe(t){t.forEach(at)}function ue(t){return typeof t=="function"}function z(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let ge;function We(t,e){return ge||(ge=document.createElement("a")),ge.href=e,t===ge.href}function $t(t){return Object.keys(t).length===0}function Te(t,e,n,i){if(t){const r=ct(t,e,n,i);return t[0](r)}}function ct(t,e,n,i){return t[1]&&i?yt(n.ctx.slice(),t[1](i(e))):n.ctx}function Be(t,e,n,i){if(t[2]&&i){const r=t[2](i(n));if(e.dirty===void 0)return r;if(typeof r=="object"){const o=[],s=Math.max(e.dirty.length,r.length);for(let c=0;c<s;c+=1)o[c]=e.dirty[c]|r[c];return o}return e.dirty|r}return e.dirty}function Oe(t,e,n,i,r,o){if(r){const s=ct(e,n,i,o);t.p(s,r)}}function Pe(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let i=0;i<n;i++)e[i]=-1;return e}return-1}function se(t){return t==null?"":t}const ut=typeof window<"u";let bt=ut?()=>window.performance.now():()=>Date.now(),Ie=ut?t=>requestAnimationFrame(t):p;const fe=new Set;function ft(t){fe.forEach(e=>{e.c(t)||(fe.delete(e),e.f())}),fe.size!==0&&Ie(ft)}function Gt(t){let e;return fe.size===0&&Ie(ft),{promise:new Promise(n=>{fe.add(e={c:t,f:n})}),abort(){fe.delete(e)}}}function f(t,e){t.appendChild(e)}function dt(t){if(!t)return document;const e=t.getRootNode?t.getRootNode():t.ownerDocument;return e&&e.host?e:t.ownerDocument}function Rt(t){const e=E("style");return Ct(dt(t),e),e.sheet}function Ct(t,e){f(t.head||t,e)}function S(t,e,n){t.insertBefore(e,n||null)}function U(t){t.parentNode.removeChild(t)}function mt(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function E(t){return document.createElement(t)}function w(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function ee(t){return document.createTextNode(t)}function P(){return ee(" ")}function je(){return ee("")}function de(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function l(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function re(t,e,n){t.setAttributeNS("http://www.w3.org/1999/xlink",e,n)}function Ut(t){return Array.from(t.childNodes)}function ce(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function h(t,e,n,i){n===null?t.style.removeProperty(e):t.style.setProperty(e,n,i?"important":"")}function St(t,e,{bubbles:n=!1,cancelable:i=!1}={}){const r=document.createEvent("CustomEvent");return r.initCustomEvent(t,n,i,e),r}const Ge=new Map;let Re=0;function Et(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}function xt(t,e){const n={stylesheet:Rt(e),rules:{}};return Ge.set(t,n),n}function He(t,e,n,i,r,o,s,c=0){const a=16.666/i;let u=`{
`;for(let $=0;$<=1;$+=a){const k=e+(n-e)*o($);u+=$*100+`%{${s(k,1-k)}}
`}const g=u+`100% {${s(n,1-n)}}
}`,_=`__svelte_${Et(g)}_${c}`,v=dt(t),{stylesheet:y,rules:d}=Ge.get(v)||xt(v,t);d[_]||(d[_]=!0,y.insertRule(`@keyframes ${_} ${g}`,y.cssRules.length));const m=t.style.animation||"";return t.style.animation=`${m?`${m}, `:""}${_} ${i}ms linear ${r}ms 1 both`,Re+=1,_}function Mt(t,e){const n=(t.style.animation||"").split(", "),i=n.filter(e?o=>o.indexOf(e)<0:o=>o.indexOf("__svelte")===-1),r=n.length-i.length;r&&(t.style.animation=i.join(", "),Re-=r,Re||At())}function At(){Ie(()=>{Re||(Ge.forEach(t=>{const{stylesheet:e}=t;let n=e.cssRules.length;for(;n--;)e.deleteRule(n);t.rules={}}),Ge.clear())})}let he;function ne(t){he=t}function Dt(){if(!he)throw new Error("Function called outside component initialization");return he}const _e=[],Qe=[],ye=[],Ve=[],Lt=Promise.resolve();let Me=!1;function Nt(){Me||(Me=!0,Lt.then(Fe))}function pe(t){ye.push(t)}const Se=new Set;let ve=0;function Fe(){const t=he;do{for(;ve<_e.length;){const e=_e[ve];ve++,ne(e),Tt(e.$$)}for(ne(null),_e.length=0,ve=0;Qe.length;)Qe.pop()();for(let e=0;e<ye.length;e+=1){const n=ye[e];Se.has(n)||(Se.add(n),n())}ye.length=0}while(_e.length);for(;Ve.length;)Ve.pop()();Me=!1,Se.clear(),ne(t)}function Tt(t){if(t.fragment!==null){t.update(),oe(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(pe)}}let me;function Bt(){return me||(me=Promise.resolve(),me.then(()=>{me=null})),me}function Ee(t,e,n){t.dispatchEvent(St(`${e?"intro":"outro"}${n}`))}const ke=new Set;let ie;function Ce(){ie={r:0,c:[],p:ie}}function Ue(){ie.r||oe(ie.c),ie=ie.p}function G(t,e){t&&t.i&&(ke.delete(t),t.i(e))}function R(t,e,n,i){if(t&&t.o){if(ke.has(t))return;ke.add(t),ie.c.push(()=>{ke.delete(t),i&&(n&&t.d(1),i())}),t.o(e)}else i&&i()}const Ot={duration:0};function Ke(t,e,n,i){let r=e(t,n),o=i?0:1,s=null,c=null,a=null;function u(){a&&Mt(t,a)}function g(v,y){const d=v.b-o;return y*=Math.abs(d),{a:o,b:v.b,d,duration:y,start:v.start,end:v.start+y,group:v.group}}function _(v){const{delay:y=0,duration:d=300,easing:m=wt,tick:$=p,css:k}=r||Ot,x={start:bt()+y,b:v};v||(x.group=ie,ie.r+=1),s||c?c=x:(k&&(u(),a=He(t,o,v,d,y,m,k)),v&&$(0,1),s=g(x,d),pe(()=>Ee(t,v,"start")),Gt(D=>{if(c&&D>c.start&&(s=g(c,d),c=null,Ee(t,s.b,"start"),k&&(u(),a=He(t,o,s.b,s.duration,0,m,r.css))),s){if(D>=s.end)$(o=s.b,1-o),Ee(t,s.b,"end"),c||(s.b?u():--s.group.r||oe(s.group.c)),s=null;else if(D>=s.start){const Q=D-s.start;o=s.a+s.d*m(Q/s.duration),$(o,1-o)}}return!!(s||c)}))}return{run(v){ue(r)?Bt().then(()=>{r=r(),_(v)}):_(v)},end(){u(),s=c=null}}}function Ae(t,e){const n=e.token={};function i(r,o,s,c){if(e.token!==n)return;e.resolved=c;let a=e.ctx;s!==void 0&&(a=a.slice(),a[s]=c);const u=r&&(e.current=r)(a);let g=!1;e.block&&(e.blocks?e.blocks.forEach((_,v)=>{v!==o&&_&&(Ce(),R(_,1,1,()=>{e.blocks[v]===_&&(e.blocks[v]=null)}),Ue())}):e.block.d(1),u.c(),G(u,1),u.m(e.mount(),e.anchor),g=!0),e.block=u,e.blocks&&(e.blocks[o]=u),g&&Fe()}if(kt(t)){const r=Dt();if(t.then(o=>{ne(r),i(e.then,1,e.value,o),ne(null)},o=>{if(ne(r),i(e.catch,2,e.error,o),ne(null),!e.hasCatch)throw o}),e.current!==e.pending)return i(e.pending,0),!0}else{if(e.current!==e.then)return i(e.then,1,e.value,t),!0;e.resolved=t}}function _t(t,e,n){const i=e.slice(),{resolved:r}=t;t.current===t.then&&(i[t.value]=r),t.current===t.catch&&(i[t.error]=r),t.block.p(i,n)}function O(t){t&&t.c()}function T(t,e,n,i){const{fragment:r,on_mount:o,on_destroy:s,after_update:c}=t.$$;r&&r.m(e,n),i||pe(()=>{const a=o.map(at).filter(ue);s?s.push(...a):oe(a),t.$$.on_mount=[]}),c.forEach(pe)}function B(t,e){const n=t.$$;n.fragment!==null&&(oe(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function Pt(t,e){t.$$.dirty[0]===-1&&(_e.push(t),Nt(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function W(t,e,n,i,r,o,s,c=[-1]){const a=he;ne(t);const u=t.$$={fragment:null,ctx:null,props:o,update:p,not_equal:r,bound:ze(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(a?a.$$.context:[])),callbacks:ze(),dirty:c,skip_bound:!1,root:e.target||a.$$.root};s&&s(u.root);let g=!1;if(u.ctx=n?n(t,e.props||{},(_,v,...y)=>{const d=y.length?y[0]:v;return u.ctx&&r(u.ctx[_],u.ctx[_]=d)&&(!u.skip_bound&&u.bound[_]&&u.bound[_](d),g&&Pt(t,_)),v}):[],u.update(),g=!0,oe(u.before_update),u.fragment=i?i(u.ctx):!1,e.target){if(e.hydrate){const _=Ut(e.target);u.fragment&&u.fragment.l(_),_.forEach(U)}else u.fragment&&u.fragment.c();e.intro&&G(t.$$.fragment),T(t,e.target,e.anchor,e.customElement),Fe()}ne(a)}class H{$destroy(){B(this,1),this.$destroy=p}$on(e,n){const i=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return i.push(n),()=>{const r=i.indexOf(n);r!==-1&&i.splice(r,1)}}$set(e){this.$$set&&!$t(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}function Ye(){window.runtime.WindowToggleMaximise()}function It(){window.runtime.WindowMinimise()}function jt(t){window.runtime.BrowserOpenURL(t)}function Ft(){window.runtime.Quit()}function qt(){return window.go.main.App.GetAssignedPullRequestsForUser()}function zt(){return window.go.main.App.GetReviewedPullRequestsForUser()}function Wt(){return window.go.main.App.IsFrameless()}const $e="assigned",be="reviewed",xe="created",Je=async t=>{let e=null;switch(t){case $e:e=qt;break;case be:e=zt;break}const n=await e();return n.length==0?[]:(console.log(n),n)};function Xe(t){const e=t.split("/");return{user:e[e.length-4],repo:e[e.length-3]}}function Ze({user:t,repo:e}){return`${t}/${e}`}function et(t){const{Comments:e,Reviews:n}=t,i=e?e.slice(-1)[0]:null,r=n?n.slice(-1)[0]:null;if(!i&&r)return tt(r);if(!r&&i)return nt(i);if(i&&r){const o=new Date(i.CreatedAt),s=new Date(r.CreatedAt);return o>s?nt(i):tt(r)}else return""}function tt(t){const{User:{Login:e},Body:n,State:i}=t,r=Ht(i),o=n?`: "${n}"`:"";return`${e} ${r} this PR${o}`}function nt(t){const{User:{Login:e},Body:n}=t;return`${e} commented ${n}`}function Ht(t){switch(t){case Le:return"approved";case Ne:return"requested changes to";case Vt:return"commented on";case Qt:return"dismissed";case De:return"pending";default:return""}}const De="PENDING",Le="APPROVED",Ne="CHANGES_REQUESTED",Qt="DISMISSED",Vt="COMMENTED";function Kt(t){return t.reduce((e,n)=>n.ReviewState===Ne?Ne:e===De&&n.ReviewState===Le?Le:e,De)}function ht(t){switch(t){case"APPROVED":return"approved";case"PENDING":return"pending";case"CHANGES_REQUESTED":return"changes_requested";case void 0:return"";default:return"pending"}}function Yt(t){const e=t.getDate(),n=t.getMonth()+1,i=t.getFullYear(),r=t.getHours(),o=r<10?`0${r}`:r,s=t.getMinutes(),c=s<10?`0${s}`:s;return`${n}/${e}/${i} ${o}:${c}`}function Jt(t){return t<.5?4*t*t*t:.5*Math.pow(2*t-2,3)+1}function it(t,{delay:e=0,duration:n=400,easing:i=Jt,amount:r=5,opacity:o=0}={}){const s=getComputedStyle(t),c=+s.opacity,a=s.filter==="none"?"":s.filter,u=c*(1-o);return{delay:e,duration:n,easing:i,css:(g,_)=>`opacity: ${c-u*_}; filter: ${a} blur(${_*r}px);`}}function Xt(t){let e,n,i,r,o,s,c;return{c(){e=E("div"),n=E("img"),r=P(),o=E("p"),s=ee(t[1]),We(n.src,i=t[0])||l(n,"src",i),l(n,"class",se(t[3])+" svelte-5b7psv"),l(o,"class","svelte-5b7psv"),l(e,"id","user"),l(e,"class",c=se(t[2]?"small":"")+" svelte-5b7psv")},m(a,u){S(a,e,u),f(e,n),f(e,r),f(e,o),f(o,s)},p(a,[u]){u&1&&!We(n.src,i=a[0])&&l(n,"src",i),u&2&&ce(s,a[1]),u&4&&c!==(c=se(a[2]?"small":"")+" svelte-5b7psv")&&l(e,"class",c)},i:p,o:p,d(a){a&&U(e)}}}function Zt(t,e,n){let{avatarURL:i=""}=e,{userName:r=""}=e,{reviewStatus:o=void 0}=e,{small:s=!1}=e,c=ht(o);return t.$$set=a=>{"avatarURL"in a&&n(0,i=a.avatarURL),"userName"in a&&n(1,r=a.userName),"reviewStatus"in a&&n(4,o=a.reviewStatus),"small"in a&&n(2,s=a.small)},[i,r,s,c,o]}class pt extends H{constructor(e){super(),W(this,e,Zt,Xt,z,{avatarURL:0,userName:1,reviewStatus:4,small:2})}}function en(t){let e,n,i,r,o,s,c,a,u,g,_,v,y,d,m,$,k,x,D,Q,V,J,I,j,K,X,F,Y,Z,L,C,N;return{c(){e=w("svg"),n=w("defs"),i=w("linearGradient"),r=w("stop"),o=w("linearGradient"),s=w("stop"),c=w("linearGradient"),a=w("stop"),u=w("linearGradient"),g=w("stop"),_=w("linearGradient"),v=w("stop"),y=w("linearGradient"),d=w("stop"),m=w("linearGradient"),$=w("stop"),k=w("linearGradient"),x=w("stop"),D=w("linearGradient"),Q=w("stop"),V=w("linearGradient"),J=w("linearGradient"),I=w("linearGradient"),j=w("linearGradient"),K=w("linearGradient"),X=w("linearGradient"),F=w("linearGradient"),Y=w("linearGradient"),Z=w("g"),L=w("g"),C=w("rect"),N=w("path"),h(r,"stop-color","#000000"),h(r,"stop-opacity","1"),l(r,"offset","0"),l(r,"id","stop3587"),l(i,"id","linearGradient3589"),h(s,"stop-color","#7996a9"),h(s,"stop-opacity","1"),l(s,"offset","0"),l(s,"id","stop22262"),l(o,"id","linearGradient22264"),h(a,"stop-color","#000000"),h(a,"stop-opacity","1"),l(a,"offset","0"),l(a,"id","stop22256"),l(c,"id","linearGradient22258"),h(g,"stop-color","#d02900"),h(g,"stop-opacity","1"),l(g,"offset","0"),l(g,"id","stop21524"),l(u,"id","linearGradient21526"),h(v,"stop-color","#2dc300"),h(v,"stop-opacity","1"),l(v,"offset","0"),l(v,"id","stop21466"),l(_,"id","linearGradient21468"),h(d,"stop-color","#dcf3ff"),h(d,"stop-opacity","1"),l(d,"offset","0"),l(d,"id","stop19948"),l(y,"id","linearGradient19950"),h($,"stop-color","#ffffff"),h($,"stop-opacity","1"),l($,"offset","0"),l($,"id","stop16213"),l(m,"id","linearGradient16215"),h(x,"stop-color","#dcf3ff"),h(x,"stop-opacity","1"),l(x,"offset","0"),l(x,"id","stop16075"),l(k,"id","linearGradient16077"),h(Q,"stop-color","#000000"),h(Q,"stop-opacity","1"),l(Q,"offset","0"),l(Q,"id","stop16069"),l(D,"id","linearGradient16071"),re(V,"xlink:href","#linearGradient16077"),l(V,"id","linearGradient569"),l(V,"gradientUnits","userSpaceOnUse"),l(V,"x1","4.9308944"),l(V,"y1","-0.55273086"),l(V,"x2","32.801735"),l(V,"y2","-0.55273086"),re(J,"xlink:href","#linearGradient16077"),l(J,"id","linearGradient571"),l(J,"gradientUnits","userSpaceOnUse"),l(J,"x1","4.9308944"),l(J,"y1","-0.55273086"),l(J,"x2","32.801735"),l(J,"y2","-0.55273086"),re(I,"xlink:href","#linearGradient16077"),l(I,"id","linearGradient573"),l(I,"gradientUnits","userSpaceOnUse"),l(I,"x1","4.9308944"),l(I,"y1","-0.55273086"),l(I,"x2","32.801735"),l(I,"y2","-0.55273086"),re(j,"xlink:href","#linearGradient22264"),l(j,"id","linearGradient1016"),l(j,"gradientUnits","userSpaceOnUse"),l(j,"gradientTransform","translate(-1.1441386,-1.2413489)"),l(j,"x1","11.162614"),l(j,"y1","12.849595"),l(j,"x2","33.947269"),l(j,"y2","12.849595"),re(K,"xlink:href","#linearGradient21468"),l(K,"id","linearGradient1068"),l(K,"gradientUnits","userSpaceOnUse"),l(K,"x1","30.120722"),l(K,"y1","-2.7701409"),l(K,"x2","32.801735"),l(K,"y2","-2.7701409"),re(X,"xlink:href","#linearGradient21468"),l(X,"id","linearGradient1076"),l(X,"gradientUnits","userSpaceOnUse"),l(X,"x1","30.120722"),l(X,"y1","-2.7701409"),l(X,"x2","32.801735"),l(X,"y2","-2.7701409"),re(F,"xlink:href","#linearGradient16077"),l(F,"id","linearGradient1110"),l(F,"gradientUnits","userSpaceOnUse"),l(F,"x1","4.9308944"),l(F,"y1","-0.55273086"),l(F,"x2","32.801735"),l(F,"y2","-0.55273086"),re(Y,"xlink:href","#linearGradient16077"),l(Y,"id","linearGradient1118"),l(Y,"gradientUnits","userSpaceOnUse"),l(Y,"x1","4.9308944"),l(Y,"y1","-0.55273086"),l(Y,"x2","32.801735"),l(Y,"y2","-0.55273086"),l(n,"id","defs2"),h(C,"fill","url(#linearGradient569)"),h(C,"fill-opacity","1"),h(C,"stroke","none"),h(C,"stroke-width","0.264583"),h(C,"stroke-linecap","square"),h(C,"stroke-linejoin","bevel"),h(C,"stroke-miterlimit","2"),h(C,"stroke-dasharray","none"),h(C,"stroke-opacity","1"),h(C,"paint-order","stroke fill markers"),l(C,"id","rect13341-7"),l(C,"width","2.4961891"),l(C,"height","1.7285458"),l(C,"x","3.7226794"),l(C,"y","-31.362644"),l(C,"ry","0.23663536"),h(N,"fill","url(#linearGradient571)"),h(N,"fill-opacity","1"),h(N,"stroke","none"),h(N,"stroke-width","0.37127"),h(N,"stroke-linecap","square"),h(N,"stroke-linejoin","bevel"),h(N,"stroke-miterlimit","2"),h(N,"stroke-dasharray","none"),h(N,"stroke-opacity","1"),h(N,"paint-order","stroke fill markers"),l(N,"d","m 5.3469467,-29.864809 c 0.2712518,0.231304 0.794113,0.674873 0.8719218,0.675445 v -0.675445 z"),l(N,"id","path15016-5"),l(L,"id","g16061-6"),l(L,"transform","matrix(0.84158698,0,0,1,14.524631,15.415773)"),h(L,"display","inline"),h(L,"fill","url(#linearGradient573)"),h(L,"fill-opacity","1"),h(L,"stroke","none"),l(Z,"id","layer2"),h(Z,"display","inline"),l(Z,"transform","translate(-17.657587,15.946871)"),l(e,"viewBox","0 0 2.1007614 2.1732807"),l(e,"id","commentIcon"),l(e,"version","1.1"),l(e,"xml:space","preserve"),l(e,"xmlns:xlink","http://www.w3.org/1999/xlink"),l(e,"xmlns","http://www.w3.org/2000/svg"),l(e,"xmlns:svg","http://www.w3.org/2000/svg"),l(e,"class","svelte-jy16ox")},m(ae,te){S(ae,e,te),f(e,n),f(n,i),f(i,r),f(n,o),f(o,s),f(n,c),f(c,a),f(n,u),f(u,g),f(n,_),f(_,v),f(n,y),f(y,d),f(n,m),f(m,$),f(n,k),f(k,x),f(n,D),f(D,Q),f(n,V),f(n,J),f(n,I),f(n,j),f(n,K),f(n,X),f(n,F),f(n,Y),f(e,Z),f(Z,L),f(L,C),f(L,N)},p,i:p,o:p,d(ae){ae&&U(e)}}}class tn extends H{constructor(e){super(),W(this,e,null,en,z,{})}}function rt(t,e,n){const i=t.slice();return i[5]=e[n],i}function lt(t){let e,n;return e=new pt({props:{avatarURL:t[5].User.AvatarURL,reviewStatus:t[5].ReviewState}}),{c(){O(e.$$.fragment)},m(i,r){T(e,i,r),n=!0},p(i,r){const o={};r&1&&(o.avatarURL=i[5].User.AvatarURL),r&1&&(o.reviewStatus=i[5].ReviewState),e.$set(o)},i(i){n||(G(e.$$.fragment,i),n=!0)},o(i){R(e.$$.fragment,i),n=!1},d(i){B(e,i)}}}function nn(t){let e,n,i=t[0].Title+"",r,o,s,c=Ze(Xe(t[0].HTMLURL))+"",a,u,g,_,v,y,d,m,$,k,x,D,Q=t[0].CommentCount+"",V,J,I,j=et(t[0])+"",K,X,F,Y,Z,L,C,N,ae;_=new pt({props:{avatarURL:t[0].User.AvatarURL,userName:t[0].User.Login,small:!0}});let te=t[0].ReviewStateForUser,M=[];for(let b=0;b<te.length;b+=1)M[b]=lt(rt(t,te,b));const gt=b=>R(M[b],1,1,()=>{M[b]=null});return k=new tn({props:{id:"commentIcon"}}),{c(){e=E("div"),n=E("h5"),r=ee(i),o=P(),s=E("p"),a=ee(c),u=P(),g=E("div"),O(_.$$.fragment),v=P(),y=E("div");for(let b=0;b<M.length;b+=1)M[b].c();d=P(),m=E("div"),$=E("div"),O(k.$$.fragment),x=P(),D=E("p"),V=ee(Q),J=P(),I=E("p"),K=ee(j),X=P(),F=E("div"),Y=ee(t[1]),l(n,"id","title"),l(n,"class","svelte-19pa980"),l(s,"id","repo"),l(s,"class","svelte-19pa980"),l(y,"id","reviewUsers"),l(y,"class","svelte-19pa980"),l(g,"id","userContainer"),l(g,"class","svelte-19pa980"),l(D,"id","commentCount"),l(D,"class","svelte-19pa980"),l(I,"id","commentText"),l(I,"class","svelte-19pa980"),l($,"id","commentContainer"),l($,"class","svelte-19pa980"),l(F,"id","created"),l(F,"class","svelte-19pa980"),l(m,"id","bottomBarContainer"),l(m,"class","svelte-19pa980"),l(e,"id","review"),l(e,"class",Z=se(t[2])+" svelte-19pa980")},m(b,A){S(b,e,A),f(e,n),f(n,r),f(e,o),f(e,s),f(s,a),f(e,u),f(e,g),T(_,g,null),f(g,v),f(g,y);for(let le=0;le<M.length;le+=1)M[le].m(y,null);f(e,d),f(e,m),f(m,$),T(k,$,null),f($,x),f($,D),f(D,V),f($,J),f($,I),f(I,K),f(m,X),f(m,F),f(F,Y),C=!0,N||(ae=de(e,"click",t[3]),N=!0)},p(b,[A]){(!C||A&1)&&i!==(i=b[0].Title+"")&&ce(r,i),(!C||A&1)&&c!==(c=Ze(Xe(b[0].HTMLURL))+"")&&ce(a,c);const le={};if(A&1&&(le.avatarURL=b[0].User.AvatarURL),A&1&&(le.userName=b[0].User.Login),_.$set(le),A&1){te=b[0].ReviewStateForUser;let q;for(q=0;q<te.length;q+=1){const qe=rt(b,te,q);M[q]?(M[q].p(qe,A),G(M[q],1)):(M[q]=lt(qe),M[q].c(),G(M[q],1),M[q].m(y,null))}for(Ce(),q=te.length;q<M.length;q+=1)gt(q);Ue()}(!C||A&1)&&Q!==(Q=b[0].CommentCount+"")&&ce(V,Q),(!C||A&1)&&j!==(j=et(b[0])+"")&&ce(K,j),(!C||A&2)&&ce(Y,b[1]),(!C||A&4&&Z!==(Z=se(b[2])+" svelte-19pa980"))&&l(e,"class",Z)},i(b){if(!C){G(_.$$.fragment,b);for(let A=0;A<te.length;A+=1)G(M[A]);G(k.$$.fragment,b),pe(()=>{L||(L=Ke(e,it,{delay:250,duration:300},!0)),L.run(1)}),C=!0}},o(b){R(_.$$.fragment,b),M=M.filter(Boolean);for(let A=0;A<M.length;A+=1)R(M[A]);R(k.$$.fragment,b),L||(L=Ke(e,it,{delay:250,duration:300},!1)),L.run(0),C=!1},d(b){b&&U(e),B(_),mt(M,b),B(k),b&&L&&L.end(),N=!1,ae()}}}function rn(t,e,n){let i,r,{review:o={}}=e;const s=()=>{jt(o.HTMLURL)},c=new Date(o.CreatedAt);return t.$$set=a=>{"review"in a&&n(0,o=a.review)},t.$$.update=()=>{t.$$.dirty&1&&n(2,i=ht(Kt(o.ReviewStateForUser)))},n(1,r=Yt(c)),[o,r,i,s]}class ln extends H{constructor(e){super(),W(this,e,rn,nn,z,{review:0})}}function sn(t){let e,n,i,r,o,s;const c=t[4].default,a=Te(c,t,t[3],null);return{c(){e=E("a"),a&&a.c(),l(e,"id","tab"),l(e,"href",n=t[1]?"#":void 0),l(e,"class",i=se(t[0]?"active":"")+" svelte-sfxtff")},m(u,g){S(u,e,g),a&&a.m(e,null),r=!0,o||(s=de(e,"click",t[2]),o=!0)},p(u,[g]){a&&a.p&&(!r||g&8)&&Oe(a,c,u,u[3],r?Be(c,u[3],g,null):Pe(u[3]),null),(!r||g&2&&n!==(n=u[1]?"#":void 0))&&l(e,"href",n),(!r||g&1&&i!==(i=se(u[0]?"active":"")+" svelte-sfxtff"))&&l(e,"class",i)},i(u){r||(G(a,u),r=!0)},o(u){R(a,u),r=!1},d(u){u&&U(e),a&&a.d(u),o=!1,s()}}}function on(t,e,n){let{$$slots:i={},$$scope:r}=e,{active:o=!1}=e,{onClick:s}=e;function c(a){a.preventDefault(),console.log("click"),s()}return t.$$set=a=>{"active"in a&&n(0,o=a.active),"onClick"in a&&n(1,s=a.onClick),"$$scope"in a&&n(3,r=a.$$scope)},[o,s,c,r,i]}class we extends H{constructor(e){super(),W(this,e,on,sn,z,{active:0,onClick:1})}}function an(t){let e,n;const i=t[1].default,r=Te(i,t,t[0],null);return{c(){e=E("div"),r&&r.c(),l(e,"id","tabContainer"),l(e,"class","svelte-1s9hpe8")},m(o,s){S(o,e,s),r&&r.m(e,null),n=!0},p(o,[s]){r&&r.p&&(!n||s&1)&&Oe(r,i,o,o[0],n?Be(i,o[0],s,null):Pe(o[0]),null)},i(o){n||(G(r,o),n=!0)},o(o){R(r,o),n=!1},d(o){o&&U(e),r&&r.d(o)}}}function cn(t,e,n){let{$$slots:i={},$$scope:r}=e;return t.$$set=o=>{"$$scope"in o&&n(0,r=o.$$scope)},[r,i]}class un extends H{constructor(e){super(),W(this,e,cn,an,z,{})}}function fn(t){let e,n;return{c(){e=w("svg"),n=w("path"),l(n,"d","m 4 4 h 1 h 0.03125 c 0.253906 0.011719 0.511719 0.128906 0.6875 0.3125 l 2.28125 2.28125 l 2.3125 -2.28125 c 0.265625 -0.230469 0.445312 -0.304688 0.6875 -0.3125 h 1 v 1 c 0 0.285156 -0.035156 0.550781 -0.25 0.75 l -2.28125 2.28125 l 2.25 2.25 c 0.1875 0.1875 0.28125 0.453125 0.28125 0.71875 v 1 h -1 c -0.265625 0 -0.53125 -0.09375 -0.71875 -0.28125 l -2.28125 -2.28125 l -2.28125 2.28125 c -0.1875 0.1875 -0.453125 0.28125 -0.71875 0.28125 h -1 v -1 c 0 -0.265625 0.09375 -0.53125 0.28125 -0.71875 l 2.28125 -2.25 l -2.28125 -2.28125 c -0.210938 -0.195312 -0.304688 -0.46875 -0.28125 -0.75 z m 0 0"),l(e,"height","16px"),l(e,"viewBox","0 0 16 16"),l(e,"width","16px"),l(e,"xmlns","http://www.w3.org/2000/svg"),l(e,"class","svelte-17vr09j")},m(i,r){S(i,e,r),f(e,n)},p,i:p,o:p,d(i){i&&U(e)}}}class dn extends H{constructor(e){super(),W(this,e,null,fn,z,{})}}function mn(t){let e,n;return{c(){e=w("svg"),n=w("path"),l(n,"d","m 3.988281 3.992188 v 8.011718 h 8.011719 v -8.011718 z m 2 2 h 4.011719 v 4.011718 h -4.011719 z m 0 0"),l(e,"height","16px"),l(e,"viewBox","0 0 16 16"),l(e,"width","16px"),l(e,"xmlns","http://www.w3.org/2000/svg"),l(e,"class","svelte-17vr09j")},m(i,r){S(i,e,r),f(e,n)},p,i:p,o:p,d(i){i&&U(e)}}}class _n extends H{constructor(e){super(),W(this,e,null,mn,z,{})}}function hn(t){let e,n;return{c(){e=w("svg"),n=w("path"),l(n,"d","m 4 10.007812 h 8 v 1.988282 h -8 z m 0 0"),l(e,"height","16px"),l(e,"viewBox","0 0 16 16"),l(e,"width","16px"),l(e,"xmlns","http://www.w3.org/2000/svg"),l(e,"class","svelte-17vr09j")},m(i,r){S(i,e,r),f(e,n)},p,i:p,o:p,d(i){i&&U(e)}}}class pn extends H{constructor(e){super(),W(this,e,null,hn,z,{})}}function gn(t){let e,n;return{c(){e=w("svg"),n=w("path"),l(n,"d","m 4.988281 4.992188 v 6.011718 h 6.011719 v -6.011718 z m 2 2 h 2.011719 v 2.011718 h -2.011719 z m 0 0"),l(e,"height","16px"),l(e,"viewBox","0 0 16 16"),l(e,"width","16px"),l(e,"xmlns","http://www.w3.org/2000/svg"),l(e,"class","svelte-17vr09j")},m(i,r){S(i,e,r),f(e,n)},p,i:p,o:p,d(i){i&&U(e)}}}class vn extends H{constructor(e){super(),W(this,e,null,gn,z,{})}}function wn(t){let e,n;return e=new _n({}),{c(){O(e.$$.fragment)},m(i,r){T(e,i,r),n=!0},i(i){n||(G(e.$$.fragment,i),n=!0)},o(i){R(e.$$.fragment,i),n=!1},d(i){B(e,i)}}}function yn(t){let e,n;return e=new vn({}),{c(){O(e.$$.fragment)},m(i,r){T(e,i,r),n=!0},i(i){n||(G(e.$$.fragment,i),n=!0)},o(i){R(e.$$.fragment,i),n=!1},d(i){B(e,i)}}}function kn(t){let e,n,i,r,o,s,c,a,u,g,_,v,y;i=new pn({});const d=[yn,wn],m=[];function $(k,x){return k[0]?0:1}return s=$(t),c=m[s]=d[s](t),g=new dn({props:{class:"icon"}}),{c(){e=E("div"),n=E("div"),O(i.$$.fragment),r=P(),o=E("div"),c.c(),a=P(),u=E("div"),O(g.$$.fragment),l(n,"class","windowButton svelte-oa2mou"),l(n,"id","windowButtonMinimize"),l(o,"class","windowButton svelte-oa2mou"),l(o,"id","windowButtonMaximize"),l(u,"class","windowButton svelte-oa2mou"),l(u,"id","windowButtonClose"),l(e,"id","windowButtons"),l(e,"data-wails-drag",""),l(e,"class","svelte-oa2mou")},m(k,x){S(k,e,x),f(e,n),T(i,n,null),f(e,r),f(e,o),m[s].m(o,null),f(e,a),f(e,u),T(g,u,null),_=!0,v||(y=[de(n,"click",function(){ue(t[3])&&t[3].apply(this,arguments)}),de(o,"click",function(){ue(t[0]?t[2]:t[1])&&(t[0]?t[2]:t[1]).apply(this,arguments)}),de(u,"click",function(){ue(t[4])&&t[4].apply(this,arguments)})],v=!0)},p(k,[x]){t=k;let D=s;s=$(t),s!==D&&(Ce(),R(m[D],1,1,()=>{m[D]=null}),Ue(),c=m[s],c||(c=m[s]=d[s](t),c.c()),G(c,1),c.m(o,null))},i(k){_||(G(i.$$.fragment,k),G(c),G(g.$$.fragment,k),_=!0)},o(k){R(i.$$.fragment,k),R(c),R(g.$$.fragment,k),_=!1},d(k){k&&U(e),B(i),m[s].d(),B(g),v=!1,oe(y)}}}function $n(t,e,n){let{isMaximised:i=!1}=e,{onMaximise:r=()=>{}}=e,{onRestore:o=()=>{}}=e,{onMinimise:s=()=>{}}=e,{onClose:c=()=>{}}=e;return t.$$set=a=>{"isMaximised"in a&&n(0,i=a.isMaximised),"onMaximise"in a&&n(1,r=a.onMaximise),"onRestore"in a&&n(2,o=a.onRestore),"onMinimise"in a&&n(3,s=a.onMinimise),"onClose"in a&&n(4,c=a.onClose)},[i,r,o,s,c]}class bn extends H{constructor(e){super(),W(this,e,$n,kn,z,{isMaximised:0,onMaximise:1,onRestore:2,onMinimise:3,onClose:4})}}function Gn(t){let e,n,i,r;const o=t[4].default,s=Te(o,t,t[3],null);return{c(){e=E("div"),s&&s.c(),l(e,"id","container"),l(e,"class","svelte-1kfui5f"),h(e,"width",t[0],!1),h(e,"height",t[1],!1)},m(c,a){S(c,e,a),s&&s.m(e,null),n=!0,i||(r=de(e,"click",function(){ue(t[2])&&t[2].apply(this,arguments)}),i=!0)},p(c,[a]){t=c,s&&s.p&&(!n||a&8)&&Oe(s,o,t,t[3],n?Be(o,t[3],a,null):Pe(t[3]),null),a&1&&h(e,"width",t[0],!1),a&2&&h(e,"height",t[1],!1)},i(c){n||(G(s,c),n=!0)},o(c){R(s,c),n=!1},d(c){c&&U(e),s&&s.d(c),i=!1,r()}}}function Rn(t,e,n){let{$$slots:i={},$$scope:r}=e,{width:o=20}=e,{height:s=20}=e,{onClick:c=()=>{}}=e;return t.$$set=a=>{"width"in a&&n(0,o=a.width),"height"in a&&n(1,s=a.height),"onClick"in a&&n(2,c=a.onClick),"$$scope"in a&&n(3,r=a.$$scope)},[o,s,c,r,i]}class Cn extends H{constructor(e){super(),W(this,e,Rn,Gn,z,{width:0,height:1,onClick:2})}}function Un(t){let e,n;return{c(){e=w("svg"),n=w("path"),l(n,"d","m 7.40625 1 c -0.613281 0.007812 -1.234375 0.089844 -1.847656 0.253906 c -3.273438 0.878906 -5.558594 3.855469 -5.558594 7.246094 s 2.285156 6.367188 5.558594 7.242188 c 3.273437 0.878906 6.742187 -0.558594 8.4375 -3.492188 c 0.277344 -0.480469 0.109375 -1.089844 -0.367188 -1.367188 c -0.476562 -0.273437 -1.089844 -0.109374 -1.367187 0.367188 c -1.246094 2.160156 -3.777344 3.207031 -6.1875 2.5625 c -2.40625 -0.644531 -4.074219 -2.820312 -4.074219 -5.3125 c 0 -2.496094 1.667969 -4.667969 4.074219 -5.3125 c 2.410156 -0.644531 4.941406 0.402344 6.1875 2.5625 c 0.058593 0.085938 0.125 0.164062 0.203125 0.226562 l -0.019532 0.015626 l -0.007812 0.007812 h -1.4375 c -0.550781 0 -1 0.449219 -1 1 c 0 0 0 1 1 1 h 5 v -5 s 0.003906 -1 -1 -1 c -0.550781 0 -1 0.449219 -1 1 v 1.6875 l -0.015625 0.011719 l -0.011719 0.011719 c -1.277344 -2.179688 -3.53125 -3.519532 -5.953125 -3.691407 c -0.203125 -0.015625 -0.40625 -0.019531 -0.613281 -0.019531 z m 0 0"),l(e,"height","16px"),l(e,"viewBox","0 0 16 16"),l(e,"width","16px"),l(e,"xmlns","http://www.w3.org/2000/svg"),l(e,"class","svelte-18q7xqv")},m(i,r){S(i,e,r),f(e,n)},p,i:p,o:p,d(i){i&&U(e)}}}class Sn extends H{constructor(e){super(),W(this,e,null,Un,z,{})}}function En(t){let e,n;return e=new Sn({}),{c(){O(e.$$.fragment)},m(i,r){T(e,i,r),n=!0},i(i){n||(G(e.$$.fragment,i),n=!0)},o(i){R(e.$$.fragment,i),n=!1},d(i){B(e,i)}}}function xn(t){let e,n,i;return n=new Cn({props:{width:t[0],height:t[1],onClick:t[2],$$slots:{default:[En]},$$scope:{ctx:t}}}),{c(){e=E("div"),O(n.$$.fragment),l(e,"id","container"),l(e,"class","svelte-1v3j0i2")},m(r,o){S(r,e,o),T(n,e,null),i=!0},p(r,[o]){const s={};o&1&&(s.width=r[0]),o&2&&(s.height=r[1]),o&4&&(s.onClick=r[2]),o&8&&(s.$$scope={dirty:o,ctx:r}),n.$set(s)},i(r){i||(G(n.$$.fragment,r),i=!0)},o(r){R(n.$$.fragment,r),i=!1},d(r){r&&U(e),B(n)}}}function Mn(t,e,n){let{width:i=20}=e,{height:r=20}=e,{onClick:o=()=>{}}=e;return t.$$set=s=>{"width"in s&&n(0,i=s.width),"height"in s&&n(1,r=s.height),"onClick"in s&&n(2,o=s.onClick)},[i,r,o]}class An extends H{constructor(e){super(),W(this,e,Mn,xn,z,{width:0,height:1,onClick:2})}}function st(t,e,n){const i=t.slice();return i[6]=e[n],i}function Dn(t){let e;return{c(){e=ee("Assigned")},m(n,i){S(n,e,i)},d(n){n&&U(e)}}}function Ln(t){let e;return{c(){e=ee("Created")},m(n,i){S(n,e,i)},d(n){n&&U(e)}}}function Nn(t){let e;return{c(){e=ee("Reviewed")},m(n,i){S(n,e,i)},d(n){n&&U(e)}}}function Tn(t){return{c:p,m:p,p,i:p,o:p,d:p}}function Bn(t){let e,n,i=t[9]&&On();return{c(){i&&i.c(),e=je()},m(r,o){i&&i.m(r,o),S(r,e,o),n=!0},p(r,o){r[9]&&i.p(r,o)},i(r){n||(G(i),n=!0)},o(r){R(i),n=!1},d(r){i&&i.d(r),r&&U(e)}}}function On(t){let e,n;return e=new bn({props:{onMaximise:Ye,onRestore:Ye,onMinimise:It,onClose:Ft}}),{c(){O(e.$$.fragment)},m(i,r){T(e,i,r),n=!0},p,i(i){n||(G(e.$$.fragment,i),n=!0)},o(i){R(e.$$.fragment,i),n=!1},d(i){B(e,i)}}}function Pn(t){return{c:p,m:p,p,i:p,o:p,d:p}}function In(t){let e,n,i,r,o,s,c,a,u,g,_,v;e=new we({props:{active:t[0]===$e,onClick:t[3]($e),$$slots:{default:[Dn]},$$scope:{ctx:t}}}),i=new we({props:{active:t[0]===xe,onClick:t[3](xe),$$slots:{default:[Ln]},$$scope:{ctx:t}}}),o=new we({}),c=new we({props:{active:t[0]===be,onClick:t[3](be),$$slots:{default:[Nn]},$$scope:{ctx:t}}}),u=new An({props:{onClick:t[4]}});let y={ctx:t,current:null,token:null,hasCatch:!1,pending:Pn,then:Bn,catch:Tn,value:9,blocks:[,,,]};return Ae(t[2],y),{c(){O(e.$$.fragment),n=P(),O(i.$$.fragment),r=P(),O(o.$$.fragment),s=P(),O(c.$$.fragment),a=P(),O(u.$$.fragment),g=P(),_=je(),y.block.c()},m(d,m){T(e,d,m),S(d,n,m),T(i,d,m),S(d,r,m),T(o,d,m),S(d,s,m),T(c,d,m),S(d,a,m),T(u,d,m),S(d,g,m),S(d,_,m),y.block.m(d,y.anchor=m),y.mount=()=>_.parentNode,y.anchor=_,v=!0},p(d,m){t=d;const $={};m&1&&($.active=t[0]===$e),m&1024&&($.$$scope={dirty:m,ctx:t}),e.$set($);const k={};m&1&&(k.active=t[0]===xe),m&1024&&(k.$$scope={dirty:m,ctx:t}),i.$set(k);const x={};m&1&&(x.active=t[0]===be),m&1024&&(x.$$scope={dirty:m,ctx:t}),c.$set(x),_t(y,t,m)},i(d){v||(G(e.$$.fragment,d),G(i.$$.fragment,d),G(o.$$.fragment,d),G(c.$$.fragment,d),G(u.$$.fragment,d),G(y.block),v=!0)},o(d){R(e.$$.fragment,d),R(i.$$.fragment,d),R(o.$$.fragment,d),R(c.$$.fragment,d),R(u.$$.fragment,d);for(let m=0;m<3;m+=1){const $=y.blocks[m];R($)}v=!1},d(d){B(e,d),d&&U(n),B(i,d),d&&U(r),B(o,d),d&&U(s),B(c,d),d&&U(a),B(u,d),d&&U(g),d&&U(_),y.block.d(d),y.token=null,y=null}}}function jn(t){return{c:p,m:p,p,i:p,o:p,d:p}}function Fn(t){let e,n,i=t[5],r=[];for(let s=0;s<i.length;s+=1)r[s]=ot(st(t,i,s));const o=s=>R(r[s],1,1,()=>{r[s]=null});return{c(){for(let s=0;s<r.length;s+=1)r[s].c();e=je()},m(s,c){for(let a=0;a<r.length;a+=1)r[a].m(s,c);S(s,e,c),n=!0},p(s,c){if(c&2){i=s[5];let a;for(a=0;a<i.length;a+=1){const u=st(s,i,a);r[a]?(r[a].p(u,c),G(r[a],1)):(r[a]=ot(u),r[a].c(),G(r[a],1),r[a].m(e.parentNode,e))}for(Ce(),a=i.length;a<r.length;a+=1)o(a);Ue()}},i(s){if(!n){for(let c=0;c<i.length;c+=1)G(r[c]);n=!0}},o(s){r=r.filter(Boolean);for(let c=0;c<r.length;c+=1)R(r[c]);n=!1},d(s){mt(r,s),s&&U(e)}}}function ot(t){let e,n;return e=new ln({props:{review:t[6],id:t[6].ID}}),{c(){O(e.$$.fragment)},m(i,r){T(e,i,r),n=!0},p(i,r){const o={};r&2&&(o.review=i[6]),r&2&&(o.id=i[6].ID),e.$set(o)},i(i){n||(G(e.$$.fragment,i),n=!0)},o(i){R(e.$$.fragment,i),n=!1},d(i){B(e,i)}}}function qn(t){let e;return{c(){e=E("p"),e.textContent="loading..."},m(n,i){S(n,e,i)},p,i:p,o:p,d(n){n&&U(e)}}}function zn(t){let e,n,i,r,o;n=new un({props:{$$slots:{default:[In]},$$scope:{ctx:t}}});let s={ctx:t,current:null,token:null,hasCatch:!1,pending:qn,then:Fn,catch:jn,value:5,blocks:[,,,]};return Ae(r=t[1],s),{c(){e=E("main"),O(n.$$.fragment),i=P(),s.block.c()},m(c,a){S(c,e,a),T(n,e,null),f(e,i),s.block.m(e,s.anchor=null),s.mount=()=>e,s.anchor=null,o=!0},p(c,[a]){t=c;const u={};a&1025&&(u.$$scope={dirty:a,ctx:t}),n.$set(u),s.ctx=t,a&2&&r!==(r=t[1])&&Ae(r,s)||_t(s,t,a)},i(c){o||(G(n.$$.fragment,c),G(s.block),o=!0)},o(c){R(n.$$.fragment,c);for(let a=0;a<3;a+=1){const u=s.blocks[a];R(u)}o=!1},d(c){c&&U(e),B(n),s.block.d(),s.token=null,s=null}}}function Wn(t,e,n){let i,r="assigned",o=Wt();const s=a=>async()=>{n(0,r=a)},c=()=>{n(1,i=Je(r))};return t.$$.update=()=>{t.$$.dirty&1&&n(1,i=Je(r))},[r,i,o,s,c]}class Hn extends H{constructor(e){super(),W(this,e,Wn,zn,z,{})}}new Hn({target:document.getElementById("app")});