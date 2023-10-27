import{P as $,d as B}from"./PageLoading.d0730efa.js";import{d as R,l as F,u as M,m as b,o as x,i as N,c as i,b as o,a as m,e as l,f as a,t as u,F as f,r as S,p as V,g as I,h as r,w as T,k as q,_ as L}from"./index.7f69bfc5.js";const D=d=>(V("data-v-a3fcd1ed"),d=d(),I(),d),P={key:0},Q={key:1,class:"wrapper container"},E={class:"heading"},G=D(()=>a("div",{class:"col title"},[a("h3",null,"NFT"),a("h3",null,"Collections")],-1)),O={key:0,class:"address"},U={class:"collection-list container"},j={class:"collection-name"},z=["src"],A=["onClick"],H=["onClick"],J=["onClick"],K={class:"description"},W={class:"bottom-row"},X={class:"amount"},Y=R({__name:"NFTsView",props:{address:{type:String,required:!0}},setup(d){const p=d,y=F(),s=M(),_=b();x(async()=>{console.log("props: "+p.address),console.log("validated query: "+s.validatedQuery.query),s.validatedQuery.query!==p.address&&(s.query=p.address,s.type="path",await s.search())});function h(t,n){return t||`${n.slice(0,4)}...${n.slice(-4)}`}function k(t){if(t&&t.slice(0,7)==="ipfs://"){let n=y.ipfsGateway,c=t.slice(7);return n+c}else if(t)return t}function w(t,n,c){let e=`${n}/${c}`;_.add(e,t)}function C(t,n){let c=`${t}/${n}`;_.remove(c)}async function g(t,n){const c=window.location.origin,e=B.exports.useToast();await navigator.clipboard.writeText(`${c}/collection/${t}/${n}`).then(()=>{e.open({message:"Link copied to clipboard",type:"success",position:"top-right",duration:5e3})})}return(t,n)=>{const c=N("RouterLink");return r(),i(f,null,[o(s).nftDetails.length===0?(r(),i("div",P,[m($)])):l("",!0),o(s).nftDetails.length!==0?(r(),i("div",Q,[a("div",E,[G,o(s).wallet?(r(),i("div",O," On address: "+u(o(s).wallet.tokenaddr),1)):l("",!0)]),a("div",U,[(r(!0),i(f,null,S(o(s).nftDetails,e=>(r(),i("div",{class:"nft-collection",key:e.id},[a("div",j,[e.BCMR?.uris?.icon?(r(),i("img",{key:0,src:k(e.BCMR.uris.icon),alt:"icon"},null,8,z)):l("",!0),a("h3",null,u(h(e.BCMR?.name,e.id)),1),a("span",{class:"share material-symbols-outlined",onClick:v=>g(o(s).wallet?.cashaddr,e.id)}," share ",8,A),o(_).isFav(`${o(s).wallet?.cashaddr}/${e.id}`)?l("",!0):(r(),i("span",{key:1,class:"favorite material-symbols-outlined",onClick:v=>w(h(e.BCMR?.name,e.id),o(s).wallet?.cashaddr,e.id)}," favorite ",8,H)),o(_).isFav(`${o(s).wallet?.cashaddr}/${e.id}`)?(r(),i("span",{key:2,class:"favorite material-symbols-outlined red",onClick:v=>C(o(s).wallet?.cashaddr,e.id)}," favorite ",8,J)):l("",!0)]),a("p",K,u(e.BCMR?.description?e.BCMR?.description:""),1),a("div",W,[a("p",X,u(e.amount/10**(e.BCMR?.token?.decimals?e.BCMR?.token?.decimals:0))+" "+u(e.BCMR?.token?.symbol?e.BCMR?.token?.symbol:"units"),1),m(c,{class:"btn-view-collection",to:`/collection/${o(s).wallet?.address}/${e.id}`},{default:T(()=>[q("View Collection ")]),_:2},1032,["to"])])]))),128))])])):l("",!0)],64)}}});const se=L(Y,[["__scopeId","data-v-a3fcd1ed"]]);export{se as default};
