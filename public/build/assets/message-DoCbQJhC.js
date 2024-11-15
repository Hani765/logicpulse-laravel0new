import{d as u,r as m,j as e,C as f,B as j}from"./app-CkWx0ziT.js";import{S as g}from"./skeleton-Dcg2qklM.js";import{_ as y}from"./index-yYqflLGK.js";/**
 * @license lucide-react v0.417.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w=u("Pause",[["rect",{x:"14",y:"4",width:"4",height:"16",rx:"1",key:"zuxfzm"}],["rect",{x:"6",y:"4",width:"4",height:"16",rx:"1",key:"1okwgv"}]]);/**
 * @license lucide-react v0.417.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=u("Play",[["polygon",{points:"6 3 20 12 6 21 6 3",key:"1oa8hb"}]]);function v(){const o=()=>{const t=new Date,a=t.getDate(),s=t.getMonth()+1,i=t.getFullYear(),x=`${a<10?"0"+a:a}/${s<10?"0"+s:s}/${i}`;let r=t.getHours();const l=t.getMinutes(),d=r>=12?"PM":"AM";r=r%12,r=r||12;const h=l<10?"0"+l:l,p=`${r}:${h} ${d}`;return`${x}, ${p}`},[n,c]=m.useState(o());return m.useEffect(()=>{const t=setInterval(()=>{c(o())},1e3);return()=>clearInterval(t)},[]),n}function k({username:o,data:n,isLoading:c,error:t}){const a=v(),[s,i]=m.useState(!0);return e.jsxs(f,{className:"overflow-hidden flex",children:[e.jsx("div",{className:"bg-primary py-1 px-6 flex items-center justify-center",children:e.jsx("p",{className:"text-md text-white font-semibold",children:"News"})}),e.jsxs("div",{className:"p-2 flex w-full",children:[e.jsxs(y,{pauseOnHover:!0,play:s,children:[e.jsx("div",{className:"h-3 w-3 bg-primary animate-pulse rounded-full mr-0.5"}),e.jsxs("span",{className:"font-bold mr-1",children:["Hello ",o,"!"]}),c&&!t?e.jsx(g,{className:"h-4 w-[300px]"}):e.jsx("p",{className:"text-md",children:n==null?void 0:n.message})]}),e.jsxs("div",{className:"flex items-center justify-between whitespace-nowrap gap-1",children:[e.jsx(j,{onClick:()=>i(!s),size:"icon",variant:"outline",className:"w-5 h-5 border-0",children:s?e.jsx(w,{}):e.jsx(N,{})}),e.jsx("p",{className:"text-sm text-gray-600 hidden sm:block",children:a})]})]})]})}export{k as default};
//# sourceMappingURL=message-DoCbQJhC.js.map
