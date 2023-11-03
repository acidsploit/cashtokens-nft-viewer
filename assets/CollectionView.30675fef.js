import{d as j,u as P,a as U,b as G,v as _,o as M,w as O,x as R,c,e as l,f as w,S as x,g as d,h as L,i as n,t as u,C as H,y as h,z as y,F as $,j as N,q as J,l as i,A as K,_ as Q}from"./index.d3202513.js";import{P as W,A as D}from"./PageLoading.4e0fdd63.js";const X={key:1},Y={key:2,class:"wrapper container"},Z={class:"header"},ee={class:"name"},te={class:"actions"},se={class:"metadata"},ae={class:"address"},ne={class:"dropdown is-vertical-align"},oe={class:"dropdown is-vertical-align"},ie={key:0},re=["href"],le={class:"nft-container"},ce=["onClick"],de={class:"img"},ue=["src","onLoad"],ve={key:0,class:"spinner"},me={key:0,class:"commitment mono"},pe={key:1,class:"commitment mono"},fe=j({__name:"CollectionView",props:{address:{type:String,required:!0},tokenId:{type:String,required:!0}},setup(V){const o=V,g=P(),r=U(),m=G(),a=_(void 0),p=_({}),f=_(!1),k=_(!1);function b(){a.value?.utxos.forEach(e=>{p.value[e.txid+e.vout]=!0})}M(async()=>{r.result.address!==o.address?await r.search("props",o.address,o.tokenId).then(()=>{a.value=r.result.tokens.find(e=>e.id===o.tokenId),b()}):(a.value=r.result.tokens.find(e=>e.id===o.tokenId),b())}),O([()=>o.address,()=>o.tokenId],async([e,s])=>{a.value=void 0,await r.search("props",e,s).then(()=>{a.value=r.result.tokens.find(t=>t.id===s),b()})});function A(e,s,t){let v=`${s}/${t}`;m.add(v,e)}function B(e,s){let t=`${e}/${s}`;m.remove(t)}async function T(e,s){const t=window.location.origin,v=J.exports.useToast();await navigator.clipboard.writeText(`${t}/collection/${e}/${s}`).then(()=>{v.open({message:"Link copied to clipboard",type:"success",position:"top-right",duration:5e3})})}const C=R(()=>a.value?.bcmr?.name?a.value?.bcmr?.name:`${o.tokenId.slice(0,4)}...${o.tokenId.slice(-4)}`);function q(e){return e?a.value?.bcmr?.token?.nfts?.parse?.types[e]?.name?a.value.bcmr.token.nfts.parse.types[e].name:e:""}function I(e){if(e.slice(0,7)==="ipfs://"){let s=g.ipfsGateway,t=e.slice(7);e=s+t}return e}function z(e){if(e.token?.commitment!==void 0&&a.value?.bcmr?.token?.nfts?.parse.types[e.token.commitment]!==void 0){let s=a.value?.bcmr?.token?.nfts?.parse.types[e.token.commitment].uris?.icon;if(s!==void 0)return I(s)}if(a.value?.bcmr?.uris!==void 0){let s=a.value?.bcmr?.uris?.icon;if(s!==void 0)return I(s)}return""}function E(e){e.token?.commitment!=null&&e.token.capability!=="minting"&&K.push(`/nft/${o.address}/${o.tokenId}/${e.token?.commitment}`)}function F(){f.value=!f.value}function S(){k.value=!k.value}return(e,s)=>(i(),c($,null,[l(r).error!==null?(i(),w(x,{key:0,error:l(r).error,type:"page"},null,8,["error"])):d("",!0),a.value===void 0?(i(),c("div",X,[L(W)])):d("",!0),a.value!==void 0?(i(),c("div",Y,[n("div",Z,[n("h3",ee,u(a.value.utxos.length)+" "+u(C.value),1),n("div",te,[n("span",{class:"share material-symbols-outlined",onClick:s[0]||(s[0]=t=>T(l(r).result.wallet?.cashaddr,o.tokenId)),title:"Copy shareable link"}," share "),l(m).isFav(`${l(r).result.wallet?.cashaddr}/${o.tokenId}`)?d("",!0):(i(),c("span",{key:0,class:"favorite material-symbols-outlined",onClick:s[1]||(s[1]=t=>A(C.value,l(r).result.wallet?.cashaddr,o.tokenId)),title:"Add NFT collection to favorites"}," favorite ")),l(m).isFav(`${l(r).result.wallet?.cashaddr}/${o.tokenId}`)?(i(),c("span",{key:1,class:"favorite material-symbols-outlined red",onClick:s[2]||(s[2]=t=>B(l(r).result.wallet?.cashaddr,o.tokenId)),title:"Remove NFT collection from favorites"}," favorite ")):d("",!0)])]),n("div",se,[n("div",ae,[L(H,{class:"ca",addr:l(r).result.wallet?.tokenaddr},null,8,["addr"])]),n("div",ne,[n("span",{onClick:F,class:"material-symbols-outlined small pointer"},u(f.value?"expand_more":"chevron_right"),1),n("span",{onClick:F,class:"bold pointer"},"Description")]),h(n("div",null,u(a.value.bcmr?.description),513),[[y,f.value]]),n("div",oe,[n("span",{onClick:S,class:"material-symbols-outlined small pointer"},u(k.value?"expand_more":"chevron_right"),1),n("span",{onClick:S,class:"bold pointer"},"Links")]),a.value.bcmr?.uris?h((i(),c("div",ie,[(i(!0),c($,null,N(Object.entries(a.value.bcmr.uris),([t,v])=>h((i(),c("a",{key:t,class:"button outline primary mono",href:v,target:"_blank"},u(t),9,re)),[[y,!["icon","image"].includes(t)]])),128))],512)),[[y,k.value]]):d("",!0)]),n("div",le,[(i(!0),c($,null,N(a.value?.utxos,t=>(i(),c("div",{class:"nft-card",key:t.txid+t.vout,onClick:v=>E(t)},[n("div",de,[h(n("img",{src:z(t),onLoad:v=>p.value[t.txid+t.vout]=!1},null,40,ue),[[y,!p.value[t.txid+t.vout]]]),p.value[t.txid+t.vout]?(i(),c("div",ve,[l(g).isDark?(i(),w(l(D),{key:0,"animation-duration":1e3,size:60,color:"#00c3ff"})):d("",!0),l(g).isDark?d("",!0):(i(),w(l(D),{key:1,"animation-duration":1e3,size:60,color:"#0ac18e"}))])):d("",!0)]),n("p",null,u(q(t.token?.commitment)),1),t.token?.capability!=="none"?(i(),c("p",me,"Capability: "+u(t.token?.capability),1)):d("",!0),t.token?.commitment?(i(),c("p",pe,"Commitment: "+u(t.token?.commitment),1)):d("",!0)],8,ce))),128))])])):d("",!0)],64))}});const he=Q(fe,[["__scopeId","data-v-51f09c57"]]);export{he as default};
