import{P as C,d as F}from"./PageLoading.fb7a75e1.js";import{d as S,u as k,a as x,b as N,o as V,r as I,c as l,e as t,f as T,S as L,g as n,h as v,i as r,t as u,F as f,j as B,p as q,k as E,l as c,w as P,m as R,_ as j}from"./index.15f07844.js";const D=d=>(q("data-v-6919c361"),d=d(),E(),d),G={key:1},M={key:2,class:"wrapper container"},O={class:"heading"},U=D(()=>r("div",{class:"col title"},[r("h3",null,"NFT"),r("h3",null,"Collections")],-1)),z={key:0,class:"address"},A={class:"collection-list container"},H={class:"collection-name"},J=["src"],K=["onClick"],Q=["onClick"],W=["onClick"],X={class:"description"},Y={class:"bottom-row"},Z={class:"amount"},ee=S({__name:"NFTsView",props:{address:{type:String,required:!0}},setup(d){const _=d,w=k(),s=x(),p=N();V(async()=>{console.log("props: "+_.address),console.log("validated query: "+s.result.address),s.result.address!==_.address&&await s.search("path",_.address)});function m(o,a){return o||`${a.slice(0,4)}...${a.slice(-4)}`}function y(o){if(o&&o.slice(0,7)==="ipfs://"){let a=w.ipfsGateway,i=o.slice(7);return a+i}else if(o)return o}function g(o,a,i){let e=`${a}/${i}`;p.add(e,o)}function b(o,a){let i=`${o}/${a}`;p.remove(i)}async function $(o,a){const i=window.location.origin,e=F.exports.useToast();await navigator.clipboard.writeText(`${i}/collection/${o}/${a}`).then(()=>{e.open({message:"Link copied to clipboard",type:"success",position:"top-right",duration:5e3})})}return(o,a)=>{const i=I("RouterLink");return c(),l(f,null,[t(s).error!==null?(c(),T(L,{key:0,error:t(s).error,type:"page"},null,8,["error"])):n("",!0),t(s).result.tokens.length===0&&t(s).error===null?(c(),l("div",G,[v(C)])):n("",!0),t(s).result.tokens.length!==0?(c(),l("div",M,[r("div",O,[U,t(s).result.wallet?(c(),l("div",z," On address: "+u(t(s).result.wallet.tokenaddr),1)):n("",!0)]),r("div",A,[(c(!0),l(f,null,B(t(s).result.tokens,e=>(c(),l("div",{class:"nft-collection",key:e.id},[r("div",H,[e.bcmr?.uris?.icon?(c(),l("img",{key:0,src:y(e.bcmr.uris.icon),alt:"icon"},null,8,J)):n("",!0),r("h3",null,u(m(e.bcmr?.name,e.id)),1),r("span",{class:"share material-symbols-outlined",onClick:h=>$(t(s).result.wallet?.cashaddr,e.id)}," share ",8,K),t(p).isFav(`${t(s).result.wallet?.cashaddr}/${e.id}`)?n("",!0):(c(),l("span",{key:1,class:"favorite material-symbols-outlined",onClick:h=>g(m(e.bcmr?.name,e.id),t(s).result.wallet?.cashaddr,e.id)}," favorite ",8,Q)),t(p).isFav(`${t(s).result.wallet?.cashaddr}/${e.id}`)?(c(),l("span",{key:2,class:"favorite material-symbols-outlined red",onClick:h=>b(t(s).result.wallet?.cashaddr,e.id)}," favorite ",8,W)):n("",!0)]),r("p",X,u(e.bcmr?.description?e.bcmr?.description:""),1),r("div",Y,[r("p",Z,u(e.amount/10**(e.bcmr?.token?.decimals?e.bcmr?.token?.decimals:0))+" "+u(e.bcmr?.token?.symbol?e.bcmr?.token?.symbol:"units"),1),v(i,{class:"btn-view-collection",to:`/collection/${t(s).result.wallet?.address}/${e.id}`},{default:P(()=>[R("View Collection ")]),_:2},1032,["to"])])]))),128))])])):n("",!0)],64)}}});const oe=j(ee,[["__scopeId","data-v-6919c361"]]);export{oe as default};
