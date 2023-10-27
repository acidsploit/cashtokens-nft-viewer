import{d as T,P as x}from"./PageLoading.d0730efa.js";import{d as b,l as B,u as S,m as V,K as p,o as q,bc as L,ae as D,c as i,a as U,e as d,f as n,t as u,b as l,F as w,r as E,h as r,_ as P}from"./index.7f69bfc5.js";const G={key:0},K={key:1,class:"wrapper container"},M={class:"collection-title"},O={class:"collection-name"},Q={class:"collection-address"},j={class:"nft-container"},z=["src"],A={class:"commitment"},H=b({__name:"NFTCollectionView",props:{address:{type:String,required:!0},tokenId:{type:String,required:!0}},setup(g){const s=g,I=B(),t=S(),m=V(),y=p(0),h=p([]),c=p([]),v=p("");q(async()=>{t.validatedQuery.query===s.address?await k():(t.query=s.address,t.type="path",await t.search(s.tokenId).then(async()=>{await k()}))}),L([()=>s.address,()=>s.tokenId],async([e,a])=>{t.query=e,t.type="path",await t.search(a).then(async()=>{await k()})});async function k(){c.value=[],v.value=t.getNftCollectionNameById(s.tokenId),y.value=t.wallet?await t.wallet.getNftTokenBalance(s.tokenId):0,h.value=t.wallet?await t.wallet.getTokenUtxos(s.tokenId):[],h.value.forEach(e=>{if(e.token?.tokenId&&e.token?.commitment){let a=t.getNftDetailByCommitment(e.token.tokenId,e.token.commitment);a&&c.value.push({id:e.token.tokenId,commitment:e.token.commitment,nftType:a})}})}const _=D(()=>v.value?v.value:`${s.tokenId.slice(0,4)}...${s.tokenId.slice(-4)}`);function $(e){if(e&&e.slice(0,7)==="ipfs://"){let a=I.ipfsGateway,o=e.slice(7);return a+o}else if(e)return e}function N(e,a,o){let f=`${a}/${o}`;m.add(f,e)}function C(e,a){let o=`${e}/${a}`;m.remove(o)}async function F(e,a){const o=window.location.origin,f=T.exports.useToast();await navigator.clipboard.writeText(`${o}/collection/${e}/${a}`).then(()=>{f.open({message:"Link copied to clipboard",type:"success",position:"top-right",duration:5e3})})}return(e,a)=>(r(),i(w,null,[c.value.length===0?(r(),i("div",G,[U(x)])):d("",!0),c.value.length!==0?(r(),i("div",K,[n("div",M,[n("h3",O,u(_.value),1),n("div",Q,[n("div",null,"On address: "+u(l(t).wallet?.tokenaddr),1),n("div",null,"Child NFTs: "+u(y.value),1)]),n("span",{class:"share material-symbols-outlined",onClick:a[0]||(a[0]=o=>F(l(t).wallet?.cashaddr,s.tokenId))}," share "),l(m).isFav(`${l(t).wallet?.cashaddr}/${s.tokenId}`)?d("",!0):(r(),i("span",{key:0,class:"favorite material-symbols-outlined",onClick:a[1]||(a[1]=o=>N(_.value,l(t).wallet?.cashaddr,s.tokenId))}," favorite ")),l(m).isFav(`${l(t).wallet?.cashaddr}/${s.tokenId}`)?(r(),i("span",{key:1,class:"favorite material-symbols-outlined red",onClick:a[2]||(a[2]=o=>C(l(t).wallet?.cashaddr,s.tokenId))}," favorite ")):d("",!0)]),n("div",j,[(r(!0),i(w,null,E(c.value,o=>(r(),i("div",{class:"nft-card",key:o.commitment},[o.nftType.uris?.icon?(r(),i("img",{key:0,src:$(o.nftType.uris.icon)},null,8,z)):d("",!0),n("p",null,u(o.nftType.name),1),n("p",A,"Commitment: "+u(o.commitment),1)]))),128))])])):d("",!0)],64))}});const W=P(H,[["__scopeId","data-v-1827d0d8"]]);export{W as default};
