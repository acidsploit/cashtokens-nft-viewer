import{d as B,P as x}from"./PageLoading.3db20891.js";import{d as S,l as V,u as q,m as L,K as k,o as M,bd as D,af as E,c as r,b as n,j as R,S as U,e as c,a as O,f as l,t as d,F as w,r as F,h as i,_ as P}from"./index.72e09cb0.js";const j={key:1},G={key:2,class:"wrapper container"},K={class:"collection-header"},Q={class:"collection-name"},z={class:"collection-address"},A={class:"nft-container"},H=["src"],J={class:"commitment"},W={key:3,class:"wrapper container"},X={class:"collection-header"},Y={class:"collection-name"},Z={class:"collection-address"},ee={class:"nft-container"},te=["src"],oe={class:"commitment"},ae={class:"commitment"},se=S({__name:"NFTCollectionView",props:{address:{type:String,required:!0},tokenId:{type:String,required:!0}},setup(b){const s=b,T=V(),e=q(),u=L(),y=k(0),g=k([]),m=k([]),v=k([]),h=k("");M(async()=>{e.validatedQuery.query===s.address?await _():(e.query=s.address,e.type="path",await e.search(s.tokenId).then(async()=>{await _()}))}),D([()=>s.address,()=>s.tokenId],async([a,o])=>{e.query=a,e.type="path",m.value=[],await e.search(o).then(async()=>{await _()})});async function _(){m.value=[],v.value=[],h.value=e.getNftCollectionNameById(s.tokenId),y.value=e.wallet?await e.wallet.getNftTokenBalance(s.tokenId):0,g.value=e.wallet?await e.wallet.getTokenUtxos(s.tokenId):[],g.value.forEach(a=>{if(a.token?.tokenId&&a.token?.commitment){let o=e.getNftCollectionById(a.token.tokenId),t=e.getNftDetailByCommitment(a.token.tokenId,a.token.commitment);t?m.value.push({id:a.token.tokenId,commitment:a.token.commitment,nftType:t}):v.value.push({id:a.token.tokenId,category:o?.BCMR?.token?.category,symbol:o?.BCMR?.token?.symbol,icon:o?.BCMR?.uris?.icon,commitment:a.token.commitment})}})}const p=E(()=>h.value?h.value:`${s.tokenId.slice(0,4)}...${s.tokenId.slice(-4)}`);function I(a){if(a&&a.slice(0,7)==="ipfs://"){let o=T.ipfsGateway,t=a.slice(7);return o+t}else if(a)return a}function $(a,o,t){let f=`${o}/${t}`;u.add(f,a)}function C(a,o){let t=`${a}/${o}`;u.remove(t)}async function N(a,o){const t=window.location.origin,f=B.exports.useToast();await navigator.clipboard.writeText(`${t}/collection/${a}/${o}`).then(()=>{f.open({message:"Link copied to clipboard",type:"success",position:"top-right",duration:5e3})})}return(a,o)=>(i(),r(w,null,[n(e).error!==null?(i(),R(U,{key:0,error:n(e).error,type:"page"},null,8,["error"])):c("",!0),m.value.length===0&&v.value.length===0&&n(e).error===null?(i(),r("div",j,[O(x)])):c("",!0),m.value.length!==0?(i(),r("div",G,[l("div",K,[l("h3",Q,d(p.value),1),l("div",z,[l("div",null,"On address: "+d(n(e).wallet?.tokenaddr),1),l("div",null,"Child NFTs: "+d(y.value),1)]),l("span",{class:"share material-symbols-outlined",onClick:o[0]||(o[0]=t=>N(n(e).wallet?.cashaddr,s.tokenId))}," share "),n(u).isFav(`${n(e).wallet?.cashaddr}/${s.tokenId}`)?c("",!0):(i(),r("span",{key:0,class:"favorite material-symbols-outlined",onClick:o[1]||(o[1]=t=>$(p.value,n(e).wallet?.cashaddr,s.tokenId))}," favorite ")),n(u).isFav(`${n(e).wallet?.cashaddr}/${s.tokenId}`)?(i(),r("span",{key:1,class:"favorite material-symbols-outlined red",onClick:o[2]||(o[2]=t=>C(n(e).wallet?.cashaddr,s.tokenId))}," favorite ")):c("",!0)]),l("div",A,[(i(!0),r(w,null,F(m.value,t=>(i(),r("div",{class:"nft-card",key:t.commitment},[t.nftType.uris?.icon?(i(),r("img",{key:0,src:I(t.nftType.uris.icon)},null,8,H)):c("",!0),l("p",null,d(t.nftType.name),1),l("p",J,"Commitment: "+d(t.commitment),1)]))),128))])])):c("",!0),v.value.length!==0?(i(),r("div",W,[l("div",X,[l("h3",Y,d(p.value),1),l("div",Z,[l("div",null,"On address: "+d(n(e).wallet?.tokenaddr),1),l("div",null,"Child NFTs: "+d(y.value),1)]),l("span",{class:"share material-symbols-outlined",onClick:o[3]||(o[3]=t=>N(n(e).wallet?.cashaddr,s.tokenId))}," share "),n(u).isFav(`${n(e).wallet?.cashaddr}/${s.tokenId}`)?c("",!0):(i(),r("span",{key:0,class:"favorite material-symbols-outlined",onClick:o[4]||(o[4]=t=>$(p.value,n(e).wallet?.cashaddr,s.tokenId))}," favorite ")),n(u).isFav(`${n(e).wallet?.cashaddr}/${s.tokenId}`)?(i(),r("span",{key:1,class:"favorite material-symbols-outlined red",onClick:o[5]||(o[5]=t=>C(n(e).wallet?.cashaddr,s.tokenId))}," favorite ")):c("",!0)]),l("div",ee,[(i(!0),r(w,null,F(v.value,t=>(i(),r("div",{class:"nft-card",key:t.category},[t.icon?(i(),r("img",{key:0,src:I(t.icon)},null,8,te)):c("",!0),l("p",oe,"Commitment: "+d(t.commitment),1),l("p",ae,"1 "+d(t.symbol),1)]))),128))])])):c("",!0)],64))}});const ie=P(se,[["__scopeId","data-v-9ccc8d25"]]);export{ie as default};
