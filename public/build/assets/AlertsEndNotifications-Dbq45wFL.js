import{d as A,r as u,y as H,f as I,j as e,P as j,i as B,M as D,c as k,R as g,W as G,C as q,m as $,aq as C,l as z}from"./app-BOQZNA3r.js";import{u as F}from"./index-BQAw569x.js";var v="Switch",[O,V]=A(v),[W,Y]=O(v),S=u.forwardRef((t,a)=>{const{__scopeSwitch:s,name:n,checked:i,defaultChecked:o,required:r,disabled:c,value:l="on",onCheckedChange:d,...h}=t,[p,b]=u.useState(null),T=H(a,m=>b(m)),w=u.useRef(!1),y=p?!!p.closest("form"):!0,[f=!1,M]=I({prop:i,defaultProp:o,onChange:d});return e.jsxs(W,{scope:s,checked:f,disabled:c,children:[e.jsx(j.button,{type:"button",role:"switch","aria-checked":f,"aria-required":r,"data-state":_(f),"data-disabled":c?"":void 0,disabled:c,value:l,...h,ref:T,onClick:B(t.onClick,m=>{M(L=>!L),y&&(w.current=m.isPropagationStopped(),w.current||m.stopPropagation())})}),y&&e.jsx(U,{control:p,bubbles:!w.current,name:n,value:l,checked:f,required:r,disabled:c,style:{transform:"translateX(-100%)"}})]})});S.displayName=v;var N="SwitchThumb",P=u.forwardRef((t,a)=>{const{__scopeSwitch:s,...n}=t,i=Y(N,s);return e.jsx(j.span,{"data-state":_(i.checked),"data-disabled":i.disabled?"":void 0,...n,ref:a})});P.displayName=N;var U=t=>{const{control:a,checked:s,bubbles:n=!0,...i}=t,o=u.useRef(null),r=F(s),c=D(a);return u.useEffect(()=>{const l=o.current,d=window.HTMLInputElement.prototype,p=Object.getOwnPropertyDescriptor(d,"checked").set;if(r!==s&&p){const b=new Event("click",{bubbles:n});p.call(l,s),l.dispatchEvent(b)}},[r,s,n]),e.jsx("input",{type:"checkbox","aria-hidden":!0,defaultChecked:s,...i,tabIndex:-1,ref:o,style:{...t.style,...c,position:"absolute",pointerEvents:"none",opacity:0,margin:0}})};function _(t){return t?"checked":"unchecked"}var E=S,X=P;const R=u.forwardRef(({className:t,...a},s)=>e.jsx(E,{className:k("peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",t),...a,ref:s,children:e.jsx(X,{className:k("pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0")})}));R.displayName=E.displayName;function J(t){const[a,s]=g.useState(null),[n,i]=g.useState(null),[o,r]=g.useState(!0),c=async l=>{try{const d=await fetch(l);if(!d.ok)throw new Error(`HTTP error! Status: ${d.status}`);const h=await d.json();s(h)}catch(d){i(d)}finally{r(!1)}};return g.useEffect(()=>{c(t)},[t]),{data:a,error:n,isLoading:o}}function Z(){J("/update/NotifcationSettings");const{data:t,setData:a,processing:s,errors:n,patch:i}=G({company_news:!1,account_activity:!0,meetups:!1,new_messages:!0}),o=r=>{a(c=>({...c,[r]:!c[r]}))};return e.jsx(q,{children:e.jsxs("form",{children:[e.jsxs($,{children:[e.jsx(C,{children:"Alerts & Notifications"}),e.jsx(C,{children:"You can set up Logicpulse to get notifications"})]}),e.jsx(z,{children:e.jsxs("div",{className:"divide-y divide-gray-200 dark:divide-gray-700",children:[e.jsx(x,{title:"Company News",description:"Get Logicpulse news, announcements, and product updates",checked:t.company_news,onChange:()=>o("company_news")}),e.jsx(x,{title:"Account Activity",description:"Get important notifications about you or activity you've missed",checked:t.account_activity,onChange:()=>o("account_activity")}),e.jsx(x,{title:"Meetups Near You",description:"Get an email when a Logicpulse Meetup is posted close to my location",checked:t.meetups,onChange:()=>o("meetups")}),e.jsx(x,{title:"New Messages",description:"Get Logicpulse news, announcements, and product updates",checked:t.new_messages,onChange:()=>o("new_messages")})]})})]})})}const x=({title:t,description:a,checked:s,onChange:n})=>e.jsxs("div",{className:"flex items-center justify-between py-4",children:[e.jsxs("div",{className:"flex flex-col flex-grow",children:[e.jsx("div",{className:"text-lg font-semibold text-gray-900 dark:text-white",children:t}),e.jsx("div",{className:"text-base font-normal text-gray-500 dark:text-gray-400",children:a})]}),e.jsx("label",{className:"relative flex items-center cursor-pointer",children:e.jsx(R,{checked:s,onCheckedChange:n,"aria-label":`Toggle ${t}`})})]});export{Z as default};
//# sourceMappingURL=AlertsEndNotifications-Dbq45wFL.js.map
