import{P as C,d as F}from"./PageLoading.1f4c94d8.js";import{d as k,u as N,a as S,b as x,o as T,r as V,c,e as t,f as I,S as L,g as n,h as v,i as r,t as u,F as f,j as B,p as R,k as q,l as i,w as E,m as P,_ as j}from"./index.045bbb8c.js";const A=d=>(R("data-v-ed8d91a7"),d=d(),q(),d),D={key:1},G={key:2,class:"wrapper container"},M={class:"heading"},O=A(()=>r("div",{class:"col title"},[r("h3",null,"NFT"),r("h3",null,"Collections")],-1)),U={key:0,class:"address"},z={class:"collection-list container"},H={class:"collection-name"},J=["src"],K=["onClick"],Q=["onClick"],W=["onClick"],X={class:"description"},Y={class:"bottom-row"},Z={class:"amount mono"},ee=k({__name:"NFTsView",props:{address:{type:String,required:!0}},setup(d){const _=d,w=N(),s=S(),p=x();T(async()=>{console.log("props: "+_.address),console.log("validated query: "+s.result.address),s.result.address!==_.address&&await s.search("props",_.address)});function m(o,a){return o||`${a.slice(0,4)}...${a.slice(-4)}`}function y(o){if(o&&o.slice(0,7)==="ipfs://"){let a=w.ipfsGateway,l=o.slice(7);return a+l}else if(o)return o}function g(o,a,l){let e=`${a}/${l}`;p.add(e,o)}function b(o,a){let l=`${o}/${a}`;p.remove(l)}async function $(o,a){const l=window.location.origin,e=F.exports.useToast();await navigator.clipboard.writeText(`${l}/collection/${o}/${a}`).then(()=>{e.open({message:"Link copied to clipboard",type:"success",position:"top-right",duration:5e3})})}return(o,a)=>{const l=V("RouterLink");return i(),c(f,null,[t(s).error!==null?(i(),I(L,{key:0,error:t(s).error,type:"page"},null,8,["error"])):n("",!0),t(s).result.tokens.length===0&&t(s).error===null?(i(),c("div",D,[v(C)])):n("",!0),t(s).result.tokens.length!==0?(i(),c("div",G,[r("div",M,[O,t(s).result.wallet?(i(),c("div",U," On address: "+u(t(s).result.wallet.tokenaddr),1)):n("",!0)]),r("div",z,[(i(!0),c(f,null,B(t(s).result.tokens,e=>(i(),c("div",{class:"nft-collection",key:e.id},[r("div",H,[e.bcmr?.uris?.icon?(i(),c("img",{key:0,src:y(e.bcmr.uris.icon),alt:"icon"},null,8,J)):n("",!0),r("h3",null,u(m(e.bcmr?.name,e.id)),1),r("span",{class:"share material-symbols-outlined",onClick:h=>$(t(s).result.wallet?.cashaddr,e.id),title:"Copy shareable link"}," share ",8,K),t(p).isFav(`${t(s).result.wallet?.cashaddr}/${e.id}`)?n("",!0):(i(),c("span",{key:1,class:"favorite material-symbols-outlined",onClick:h=>g(m(e.bcmr?.name,e.id),t(s).result.wallet?.cashaddr,e.id),title:"Add NFT collection to favorites"}," favorite ",8,Q)),t(p).isFav(`${t(s).result.wallet?.cashaddr}/${e.id}`)?(i(),c("span",{key:2,class:"favorite material-symbols-outlined red",onClick:h=>b(t(s).result.wallet?.cashaddr,e.id),title:"Remove NFT collection from favorites"}," favorite ",8,W)):n("",!0)]),r("p",X,u(e.bcmr?.description?e.bcmr?.description:""),1),r("div",Y,[r("p",Z,u(e.amount/10**(e.bcmr?.token?.decimals?e.bcmr?.token?.decimals:0))+" "+u(e.bcmr?.token?.symbol?e.bcmr?.token?.symbol:"units"),1),v(l,{class:"btn-view-collection",to:`/collection/${t(s).result.wallet?.address}/${e.id}`},{default:E(()=>[P("View Collection ")]),_:2},1032,["to"])])]))),128))])])):n("",!0)],64)}}});const oe=j(ee,[["__scopeId","data-v-ed8d91a7"]]);export{oe as default};
