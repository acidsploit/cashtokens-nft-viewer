import{d as f,j as i,o as g,c as n,n as h,h as o,_ as w,m as e,q as y,a as b,v as q,e as u,b as _,t as p,x as C,Q as v,y as Q,W as k}from"./index.b4c259e6.js";const B=["src","alt","title"],V=f({__name:"QrImage",props:{image:{},defaultSize:{},allowZoom:{type:Boolean}},setup(c){const a=c,t=i(!1);g(()=>{a.defaultSize==="big"&&(t.value=!0)});function r(){a.allowZoom&&(t.value=!t.value)}return(d,m)=>(o(),n("img",{class:h(["qr-img",t.value?"big":"small"]),onClick:r,src:a.image.src,alt:a.image.alt,title:a.image.title},null,10,B))}});const x=w(V,[["__scopeId","data-v-817178b2"]]),S={class:"wrapper"},z={key:1},I={key:2},D=f({__name:"BCHView",props:{address:{type:String,required:!0}},setup(c){const a=c,t=i(null),r=i(0),d=i(0);async function m(s){let l=s;C(l)===!0?(e.query=l,e.validatedQuery.query=l,e.validatedQuery.queryType=v.cashaddress,e.wallet=await y.fromCashaddr(l)):e.wallet=null,Q(l)&&(e.query=l,e.validatedQuery.query=l,e.validatedQuery.queryType=v.token)}return g(async()=>{console.log("props: "+a.address),e.query===""&&(e.query=a.address),m(a.address);try{e.wallet=await y.fromCashaddr(a.address),t.value=e.wallet.getDepositQr();let s=await e.wallet.getBalance();typeof s!="number"&&(r.value=s.bch,d.value=s.usd)}catch(s){alert(s)}}),(s,l)=>(o(),n("div",S,[b(k),t.value?(o(),q(x,{key:0,image:t.value,"default-size":"big","allow-zoom":!1},null,8,["image"])):u("",!0),_(e).wallet?(o(),n("div",z,p(_(e).wallet.cashaddr),1)):u("",!0),_(e).wallet?(o(),n("div",I,"BCH: "+p(r.value)+" ("+p(d.value)+" USD)",1)):u("",!0)]))}});const N=w(D,[["__scopeId","data-v-aeb4779e"]]);export{N as default};
