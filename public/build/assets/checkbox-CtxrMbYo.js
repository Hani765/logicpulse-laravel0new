import{s as B,r as n,u as H,H as K,j as a,P as j,v as E,w as L,K as M,c as P,L as O}from"./app-CkWx0ziT.js";import{u as A}from"./index-B6yvsKc-.js";var v="Checkbox",[q,Q]=B(v),[z,T]=q(v),w=n.forwardRef((e,c)=>{const{__scopeCheckbox:t,name:d,checked:p,defaultChecked:s,required:h,disabled:u,value:l="on",onCheckedChange:k,...y}=e,[r,m]=n.useState(null),_=H(c,o=>m(o)),x=n.useRef(!1),g=r?!!r.closest("form"):!0,[f=!1,C]=K({prop:p,defaultProp:s,onChange:k}),D=n.useRef(f);return n.useEffect(()=>{const o=r==null?void 0:r.form;if(o){const b=()=>C(D.current);return o.addEventListener("reset",b),()=>o.removeEventListener("reset",b)}},[r,C]),a.jsxs(z,{scope:t,state:f,disabled:u,children:[a.jsx(j.button,{type:"button",role:"checkbox","aria-checked":i(f)?"mixed":f,"aria-required":h,"data-state":S(f),"data-disabled":u?"":void 0,disabled:u,value:l,...y,ref:_,onKeyDown:E(e.onKeyDown,o=>{o.key==="Enter"&&o.preventDefault()}),onClick:E(e.onClick,o=>{C(b=>i(b)?!0:!b),g&&(x.current=o.isPropagationStopped(),x.current||o.stopPropagation())})}),g&&a.jsx(X,{control:r,bubbles:!x.current,name:d,value:l,checked:f,required:h,disabled:u,style:{transform:"translateX(-100%)"}})]})});w.displayName=v;var R="CheckboxIndicator",N=n.forwardRef((e,c)=>{const{__scopeCheckbox:t,forceMount:d,...p}=e,s=T(R,t);return a.jsx(L,{present:d||i(s.state)||s.state===!0,children:a.jsx(j.span,{"data-state":S(s.state),"data-disabled":s.disabled?"":void 0,...p,ref:c,style:{pointerEvents:"none",...e.style}})})});N.displayName=R;var X=e=>{const{control:c,checked:t,bubbles:d=!0,...p}=e,s=n.useRef(null),h=A(t),u=M(c);return n.useEffect(()=>{const l=s.current,k=window.HTMLInputElement.prototype,r=Object.getOwnPropertyDescriptor(k,"checked").set;if(h!==t&&r){const m=new Event("click",{bubbles:d});l.indeterminate=i(t),r.call(l,i(t)?!1:t),l.dispatchEvent(m)}},[h,t,d]),a.jsx("input",{type:"checkbox","aria-hidden":!0,defaultChecked:i(t)?!1:t,...p,tabIndex:-1,ref:s,style:{...e.style,...u,position:"absolute",pointerEvents:"none",opacity:0,margin:0}})};function i(e){return e==="indeterminate"}function S(e){return i(e)?"indeterminate":e?"checked":"unchecked"}var I=w,F=N;const $=n.forwardRef(({className:e,...c},t)=>a.jsx(I,{ref:t,className:P("peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",e),...c,children:a.jsx(F,{className:P("flex items-center justify-center text-current"),children:a.jsx(O,{className:"h-4 w-4"})})}));$.displayName=I.displayName;export{$ as C};
//# sourceMappingURL=checkbox-CtxrMbYo.js.map