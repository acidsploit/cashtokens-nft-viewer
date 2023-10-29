import{d as F,P as S,A as _}from"./PageLoading.fb7a75e1.js";import{d as N,bG as T,u as V,a as B,b as D,J as L,o as q,bb as z,ad as A,c as l,e as r,f as v,S as E,g as c,h as G,i as d,t as u,F as y,j as P,l as i,_ as j}from"./index.15f07844.js";const J={key:1},M={key:2,class:"wrapper container"},O={class:"collection-header"},U={class:"collection-name"},x={class:"collection-address"},H={class:"nft-container"},K={key:0,class:"img"},Q=["src"],R={key:1,class:"spinner"},W={key:2,class:"commitment"},X={key:3,class:"commitment"},Y=N({__name:"NFTCollectionView",props:{address:{type:String,required:!0},tokenId:{type:String,required:!0}},setup(h){const n=h,k=T(),b=V(),o=B(),m=D(),s=L(void 0);q(async()=>{o.result.address!==n.address?await o.search("path",n.address,n.tokenId).then(()=>{s.value=o.result.tokens.find(e=>e.id===n.tokenId)}):s.value=o.result.tokens.find(e=>e.id===n.tokenId)}),z([()=>n.address,()=>n.tokenId],async([e,a])=>{s.value=void 0,await o.search("path",e,a).then(()=>{s.value=o.result.tokens.find(t=>t.id===n.tokenId)})});function g(e,a,t){let p=`${a}/${t}`;m.add(p,e)}function w(e,a){let t=`${e}/${a}`;m.remove(t)}async function I(e,a){const t=window.location.origin,p=F.exports.useToast();await navigator.clipboard.writeText(`${t}/collection/${e}/${a}`).then(()=>{p.open({message:"Link copied to clipboard",type:"success",position:"top-right",duration:5e3})})}const f=A(()=>s.value?.bcmr?.name?s.value?.bcmr?.name:`${n.tokenId.slice(0,4)}...${n.tokenId.slice(-4)}`);function $(e){return e?s.value?.bcmr?.token?.nfts?.parse?.types[e]?.name?s.value.bcmr.token.nfts.parse.types[e].name:e:""}function C(e){if(e&&e.slice(0,7)==="ipfs://"){let a=b.ipfsGateway,t=e.slice(7);return a+t}else if(e)return e}return(e,a)=>(i(),l(y,null,[r(o).error!==null?(i(),v(E,{key:0,error:r(o).error,type:"page"},null,8,["error"])):c("",!0),s.value===void 0?(i(),l("div",J,[G(S)])):c("",!0),s.value!==void 0?(i(),l("div",M,[d("div",O,[d("h3",U,u(f.value),1),d("div",x,[d("div",null,"On address: "+u(r(o).result.wallet?.tokenaddr),1),d("div",null,"Child NFTs: "+u(s.value?.amount),1)]),d("span",{class:"share material-symbols-outlined",onClick:a[0]||(a[0]=t=>I(r(o).result.wallet?.cashaddr,n.tokenId))}," share "),r(m).isFav(`${r(o).result.wallet?.cashaddr}/${n.tokenId}`)?c("",!0):(i(),l("span",{key:0,class:"favorite material-symbols-outlined",onClick:a[1]||(a[1]=t=>g(f.value,r(o).result.wallet?.cashaddr,n.tokenId))}," favorite ")),r(m).isFav(`${r(o).result.wallet?.cashaddr}/${n.tokenId}`)?(i(),l("span",{key:1,class:"favorite material-symbols-outlined red",onClick:a[2]||(a[2]=t=>w(r(o).result.wallet?.cashaddr,n.tokenId))}," favorite ")):c("",!0)]),d("div",H,[(i(!0),l(y,null,P(s.value?.utxos,t=>(i(),l("div",{class:"nft-card",key:t.token?.commitment},[s.value?.bcmr&&t.token?.commitment?(i(),l("div",K,[d("img",{src:C(s.value.bcmr.token?.nfts?.parse?.types[t.token.commitment].uris?.icon?s.value.bcmr.token?.nfts?.parse?.types[t.token.commitment].uris?.icon:s.value.bcmr.uris?.icon)},null,8,Q)])):(i(),l("div",R,[r(k)?(i(),v(r(_),{key:0,"animation-duration":1e3,size:60,color:"#00c3ff"})):c("",!0),r(k)?c("",!0):(i(),v(r(_),{key:1,"animation-duration":1e3,size:60,color:"#0ac18e"}))])),d("p",null,u($(t.token?.commitment)),1),t.token?.capability!=="none"?(i(),l("p",W,"Capability: "+u(t.token?.capability),1)):c("",!0),t.token?.commitment?(i(),l("p",X,"Commitment: "+u(t.token?.commitment),1)):c("",!0)]))),128))])])):c("",!0)],64))}});const te=j(Y,[["__scopeId","data-v-69c2ba5b"]]);export{te as default};
