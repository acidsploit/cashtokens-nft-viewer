import{e as C,B as D,D as H,s as g,E as N,w as M,G as V,H as B,I as F,J as A,K as E,d as O,u as q,a as G,o as K,v,c as u,i as m,t as _,g as b,F as S,j as x,p as J,k as L,l,_ as P}from"./index.b5f26f81.js";function W(s){return typeof s=="function"?s():C(s)}function k(s,e=""){if(s instanceof Promise)return s;const r=W(s);return!s||!r?r:Array.isArray(r)?r.map(n=>k(n,e)):typeof r=="object"?Object.fromEntries(Object.entries(r).map(([n,t])=>n==="titleTemplate"||n.startsWith("on")?[n,C(t)]:[n,k(t,n)])):r}const z="usehead",T=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof globalThis<"u"?globalThis:typeof self<"u"?self:{},j="__unhead_injection_handler__";function Q(){if(j in T)return T[j]();const s=D(z);return s||H()}function R(s,e={}){const r=e.head||Q();if(r)return r.ssr?r.push(s,e):X(r,s,e)}function X(s,e,r={}){const n=g(!1),t=g({});N(()=>{t.value=n.value?{}:k(e)});const o=s.push(t.value,r);return M(t,f=>{o.patch(f)}),A()&&(V(()=>{o.dispose()}),B(()=>{n.value=!0}),F(()=>{n.value=!1})),o}function Y(s,e){const{title:r,titleTemplate:n,...t}=s;return R({title:r,titleTemplate:n,_flatMeta:t},{...e,transform(o){const p=E({...o._flatMeta});return delete o._flatMeta,{...o,meta:p}}})}const U=s=>(J("data-v-cf9ba2d8"),s=s(),L(),s),Z={class:"container wrapper"},$={class:"nft-name"},ee=["src"],te={class:"container meta"},se={key:0,class:"attributes"},ne=U(()=>m("h4",{class:"text-center"},"Attributes",-1)),re={class:"table"},ae={class:"key"},oe={class:"value"},ie={key:1,class:"description"},ce=U(()=>m("h4",{class:"text-center"},"Description",-1)),ue=O({__name:"NFTView",props:{address:{type:String,required:!0},tokenId:{type:String,required:!0},commitment:{type:String,required:!0}},setup(s){const e=s,r=q(),n=G(),t=g(null);function o(){Y({title:t.value?.bcmr?.token?.nfts?.parse.types[e.commitment].name,description:t.value?.bcmr?.token?.nfts?.parse.types[e.commitment].description,ogDescription:t.value?.bcmr?.token?.nfts?.parse.types[e.commitment].description,ogTitle:t.value?.bcmr?.token?.nfts?.parse.types[e.commitment].name,ogImage:t.value?.bcmr?.token?.nfts?.parse.types[e.commitment].uris?.image,twitterCard:"summary_large_image",twitterSite:window.location.href,twitterTitle:t.value?.bcmr?.token?.nfts?.parse.types[e.commitment].name,twitterDescription:t.value?.bcmr?.token?.nfts?.parse.types[e.commitment].description,twitterImage:t.value?.bcmr?.token?.nfts?.parse.types[e.commitment].uris?.image})}K(()=>{let a=n.result.tokens.find(i=>i.id===e.tokenId);n.result.address===e.address&&a!=null?(t.value=a,o()):n.search("props",e.address,e.tokenId).then(()=>{a=n.result.tokens.find(i=>i.id===e.tokenId),a!=null&&(t.value=a,o())})}),M([()=>e.address,()=>e.tokenId,()=>e.commitment],async([a,i,d])=>{let c=n.result.tokens.find(y=>y.id===i);n.result.address===a&&c!=null?(t.value=c,o()):n.search("props",a,i).then(()=>{c=n.result.tokens.find(y=>y.id===i),c!=null&&(t.value=c,o())})});const p=v(()=>t?.value?.bcmr?.token?.nfts?.parse.types[e.commitment].name);function f(a){if(a.slice(0,7)==="ipfs://"){let i=r.ipfsGateway,d=a.slice(7);a=i+d}return a}const w=v(()=>t.value?.bcmr?.token?.nfts?.parse.types[e.commitment].uris?.image!=null?f(t.value.bcmr.token.nfts.parse.types[e.commitment].uris.image):t.value?.bcmr?.token?.nfts?.parse.types[e.commitment].uris?.icon!=null?f(t.value.bcmr.token.nfts.parse.types[e.commitment].uris.icon):void 0),I=v(()=>t.value?.bcmr?.token?.nfts?.parse.types[e.commitment].description),h=v(()=>t.value?.bcmr?.token?.nfts?.parse.types[e.commitment]?.extensions?.attributes);return(a,i)=>(l(),u("div",Z,[m("h1",$,_(p.value?p.value:e.commitment),1),w.value?(l(),u("img",{key:0,src:w.value},null,8,ee)):b("",!0),m("div",te,[h.value?(l(),u("div",se,[ne,m("div",re,[m("div",ae,[(l(!0),u(S,null,x(Object.entries(h.value),([d])=>(l(),u("div",{class:"entry mono",key:d},_(d),1))),128))]),m("div",oe,[(l(!0),u(S,null,x(Object.entries(h.value),([d,c])=>(l(),u("div",{class:"entry mono",key:d},_(c||"none"),1))),128))])])])):b("",!0),I.value?(l(),u("div",ie,[ce,m("div",null,_(I.value),1)])):b("",!0)])]))}});const me=P(ue,[["__scopeId","data-v-cf9ba2d8"]]);export{me as default};
