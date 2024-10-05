import{d as q,x as H,r as s,y as S,j as u,A as K,P as Q,i as C,k as X,z as W,E as J,S as Z,H as ee,g as te,f as oe,K as re,c as _}from"./app-BOQZNA3r.js";import{L as ne}from"./label-DyIUDMiB.js";import{I as se}from"./input-DELo8El7.js";import{R as ae}from"./index-DiQKiitX.js";import{Q as ie}from"./react-icons.esm-Bb_X1ijD.js";var[R,Ie]=q("Tooltip",[H]),j=H(),M="TooltipProvider",le=700,D="tooltip.open",[ce,O]=R(M),G=e=>{const{__scopeTooltip:o,delayDuration:t=le,skipDelayDuration:r=300,disableHoverableContent:n=!1,children:i}=e,[l,f]=s.useState(!0),a=s.useRef(!1),d=s.useRef(0);return s.useEffect(()=>{const c=d.current;return()=>window.clearTimeout(c)},[]),u.jsx(ce,{scope:o,isOpenDelayed:l,delayDuration:t,onOpen:s.useCallback(()=>{window.clearTimeout(d.current),f(!1)},[]),onClose:s.useCallback(()=>{window.clearTimeout(d.current),d.current=window.setTimeout(()=>f(!0),r)},[r]),isPointerInTransitRef:a,onPointerInTransitChange:s.useCallback(c=>{a.current=c},[]),disableHoverableContent:n,children:i})};G.displayName=M;var k="Tooltip",[ue,L]=R(k),F=e=>{const{__scopeTooltip:o,children:t,open:r,defaultOpen:n=!1,onOpenChange:i,disableHoverableContent:l,delayDuration:f}=e,a=O(k,e.__scopeTooltip),d=j(o),[c,p]=s.useState(null),m=te(),x=s.useRef(0),h=l??a.disableHoverableContent,y=f??a.delayDuration,v=s.useRef(!1),[g=!1,T]=oe({prop:r,defaultProp:n,onChange:I=>{I?(a.onOpen(),document.dispatchEvent(new CustomEvent(D))):a.onClose(),i==null||i(I)}}),w=s.useMemo(()=>g?v.current?"delayed-open":"instant-open":"closed",[g]),E=s.useCallback(()=>{window.clearTimeout(x.current),v.current=!1,T(!0)},[T]),P=s.useCallback(()=>{window.clearTimeout(x.current),T(!1)},[T]),A=s.useCallback(()=>{window.clearTimeout(x.current),x.current=window.setTimeout(()=>{v.current=!0,T(!0)},y)},[y,T]);return s.useEffect(()=>()=>window.clearTimeout(x.current),[]),u.jsx(re,{...d,children:u.jsx(ue,{scope:o,contentId:m,open:g,stateAttribute:w,trigger:c,onTriggerChange:p,onTriggerEnter:s.useCallback(()=>{a.isOpenDelayed?A():E()},[a.isOpenDelayed,A,E]),onTriggerLeave:s.useCallback(()=>{h?P():window.clearTimeout(x.current)},[P,h]),onOpen:E,onClose:P,disableHoverableContent:h,children:t})})};F.displayName=k;var N="TooltipTrigger",z=s.forwardRef((e,o)=>{const{__scopeTooltip:t,...r}=e,n=L(N,t),i=O(N,t),l=j(t),f=s.useRef(null),a=S(o,f,n.onTriggerChange),d=s.useRef(!1),c=s.useRef(!1),p=s.useCallback(()=>d.current=!1,[]);return s.useEffect(()=>()=>document.removeEventListener("pointerup",p),[p]),u.jsx(K,{asChild:!0,...l,children:u.jsx(Q.button,{"aria-describedby":n.open?n.contentId:void 0,"data-state":n.stateAttribute,...r,ref:a,onPointerMove:C(e.onPointerMove,m=>{m.pointerType!=="touch"&&!c.current&&!i.isPointerInTransitRef.current&&(n.onTriggerEnter(),c.current=!0)}),onPointerLeave:C(e.onPointerLeave,()=>{n.onTriggerLeave(),c.current=!1}),onPointerDown:C(e.onPointerDown,()=>{d.current=!0,document.addEventListener("pointerup",p,{once:!0})}),onFocus:C(e.onFocus,()=>{d.current||n.onOpen()}),onBlur:C(e.onBlur,n.onClose),onClick:C(e.onClick,n.onClose)})})});z.displayName=N;var de="TooltipPortal",[He,pe]=R(de,{forceMount:void 0}),b="TooltipContent",$=s.forwardRef((e,o)=>{const t=pe(b,e.__scopeTooltip),{forceMount:r=t.forceMount,side:n="top",...i}=e,l=L(b,e.__scopeTooltip);return u.jsx(X,{present:r||l.open,children:l.disableHoverableContent?u.jsx(B,{side:n,...i,ref:o}):u.jsx(fe,{side:n,...i,ref:o})})}),fe=s.forwardRef((e,o)=>{const t=L(b,e.__scopeTooltip),r=O(b,e.__scopeTooltip),n=s.useRef(null),i=S(o,n),[l,f]=s.useState(null),{trigger:a,onClose:d}=t,c=n.current,{onPointerInTransitChange:p}=r,m=s.useCallback(()=>{f(null),p(!1)},[p]),x=s.useCallback((h,y)=>{const v=h.currentTarget,g={x:h.clientX,y:h.clientY},T=ve(g,v.getBoundingClientRect()),w=ye(g,T),E=Te(y.getBoundingClientRect()),P=Ce([...w,...E]);f(P),p(!0)},[p]);return s.useEffect(()=>()=>m(),[m]),s.useEffect(()=>{if(a&&c){const h=v=>x(v,c),y=v=>x(v,a);return a.addEventListener("pointerleave",h),c.addEventListener("pointerleave",y),()=>{a.removeEventListener("pointerleave",h),c.removeEventListener("pointerleave",y)}}},[a,c,x,m]),s.useEffect(()=>{if(l){const h=y=>{const v=y.target,g={x:y.clientX,y:y.clientY},T=(a==null?void 0:a.contains(v))||(c==null?void 0:c.contains(v)),w=!ge(g,l);T?m():w&&(m(),d())};return document.addEventListener("pointermove",h),()=>document.removeEventListener("pointermove",h)}},[a,c,l,d,m]),u.jsx(B,{...e,ref:i})}),[xe,he]=R(k,{isInside:!1}),B=s.forwardRef((e,o)=>{const{__scopeTooltip:t,children:r,"aria-label":n,onEscapeKeyDown:i,onPointerDownOutside:l,...f}=e,a=L(b,t),d=j(t),{onClose:c}=a;return s.useEffect(()=>(document.addEventListener(D,c),()=>document.removeEventListener(D,c)),[c]),s.useEffect(()=>{if(a.trigger){const p=m=>{const x=m.target;x!=null&&x.contains(a.trigger)&&c()};return window.addEventListener("scroll",p,{capture:!0}),()=>window.removeEventListener("scroll",p,{capture:!0})}},[a.trigger,c]),u.jsx(W,{asChild:!0,disableOutsidePointerEvents:!1,onEscapeKeyDown:i,onPointerDownOutside:l,onFocusOutside:p=>p.preventDefault(),onDismiss:c,children:u.jsxs(J,{"data-state":a.stateAttribute,...d,...f,ref:o,style:{...f.style,"--radix-tooltip-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-tooltip-content-available-width":"var(--radix-popper-available-width)","--radix-tooltip-content-available-height":"var(--radix-popper-available-height)","--radix-tooltip-trigger-width":"var(--radix-popper-anchor-width)","--radix-tooltip-trigger-height":"var(--radix-popper-anchor-height)"},children:[u.jsx(Z,{children:r}),u.jsx(xe,{scope:t,isInside:!0,children:u.jsx(ae,{id:a.contentId,role:"tooltip",children:n||r})})]})})});$.displayName=b;var U="TooltipArrow",me=s.forwardRef((e,o)=>{const{__scopeTooltip:t,...r}=e,n=j(t);return he(U,t).isInside?null:u.jsx(ee,{...n,...r,ref:o})});me.displayName=U;function ve(e,o){const t=Math.abs(o.top-e.y),r=Math.abs(o.bottom-e.y),n=Math.abs(o.right-e.x),i=Math.abs(o.left-e.x);switch(Math.min(t,r,n,i)){case i:return"left";case n:return"right";case t:return"top";case r:return"bottom";default:throw new Error("unreachable")}}function ye(e,o,t=5){const r=[];switch(o){case"top":r.push({x:e.x-t,y:e.y+t},{x:e.x+t,y:e.y+t});break;case"bottom":r.push({x:e.x-t,y:e.y-t},{x:e.x+t,y:e.y-t});break;case"left":r.push({x:e.x+t,y:e.y-t},{x:e.x+t,y:e.y+t});break;case"right":r.push({x:e.x-t,y:e.y-t},{x:e.x-t,y:e.y+t});break}return r}function Te(e){const{top:o,right:t,bottom:r,left:n}=e;return[{x:n,y:o},{x:t,y:o},{x:t,y:r},{x:n,y:r}]}function ge(e,o){const{x:t,y:r}=e;let n=!1;for(let i=0,l=o.length-1;i<o.length;l=i++){const f=o[i].x,a=o[i].y,d=o[l].x,c=o[l].y;a>r!=c>r&&t<(d-f)*(r-a)/(c-a)+f&&(n=!n)}return n}function Ce(e){const o=e.slice();return o.sort((t,r)=>t.x<r.x?-1:t.x>r.x?1:t.y<r.y?-1:t.y>r.y?1:0),be(o)}function be(e){if(e.length<=1)return e.slice();const o=[];for(let r=0;r<e.length;r++){const n=e[r];for(;o.length>=2;){const i=o[o.length-1],l=o[o.length-2];if((i.x-l.x)*(n.y-l.y)>=(i.y-l.y)*(n.x-l.x))o.pop();else break}o.push(n)}o.pop();const t=[];for(let r=e.length-1;r>=0;r--){const n=e[r];for(;t.length>=2;){const i=t[t.length-1],l=t[t.length-2];if((i.x-l.x)*(n.y-l.y)>=(i.y-l.y)*(n.x-l.x))t.pop();else break}t.push(n)}return t.pop(),o.length===1&&t.length===1&&o[0].x===t[0].x&&o[0].y===t[0].y?o:o.concat(t)}var we=G,Ee=F,Pe=z,V=$;const Re=we,je=Ee,ke=Pe,Y=s.forwardRef(({className:e,sideOffset:o=4,...t},r)=>u.jsx(V,{ref:r,sideOffset:o,className:_("z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",e),...t}));Y.displayName=V.displayName;function Le({description:e}){return u.jsx(Re,{children:u.jsxs(je,{children:[u.jsx(ke,{type:"button",children:u.jsx(ie,{className:"w-4 h-4"})}),u.jsxs(Y,{side:"bottom",className:"inline-block text-sm font-light text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400",children:[u.jsx("h3",{className:"font-semibold text-gray-900 dark:text-white",children:"Details"}),u.jsx("p",{children:e})]})]})})}const Se=({className:e,autoFocus:o,inputClassName:t,label:r,description:n,errorMessage:i,successMessage:l,disabled:f,required:a,helperText:d,type:c,value:p,onChange:m,Icon:x,id:h})=>u.jsxs("div",{className:_("space-y-1",e),children:[r&&u.jsxs(ne,{className:`flex gap-1 items-center ${i&&"text-red-500"}`,htmlFor:h||"input",children:[x&&u.jsx(x,{size:16,className:"text-muted-foreground"}),r,n&&u.jsx(Le,{description:n})]}),u.jsx(se,{type:c,value:p,onChange:m,disabled:f,className:_(t),autoFocus:o,required:a,placeholder:d,id:h||"input"}),i&&u.jsx("p",{className:"text-sm text-red-500",children:i}),l&&u.jsx("p",{className:"text-sm text-green-500",children:l})]});export{Se as L,Le as P,Re as T,je as a,ke as b,Y as c};
//# sourceMappingURL=LabelInputContainer-VaPF5sWp.js.map
