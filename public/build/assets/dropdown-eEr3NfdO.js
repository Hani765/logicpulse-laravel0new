import{r as u,W as p,j as e,D as x,k as m,l as h,m as j,U as f,n as w,T as C,B as t,J as l}from"./app-CkWx0ziT.js";import{C as g,b as D,c as y,d as z,e as N,f as b}from"./credenza-3netIWa9.js";import{R as v}from"./react-icons.esm-oGyrDKWE.js";import{F as E}from"./index-D4WClUwC.js";import{E as F}from"./ellipsis-BWvFTAsp.js";import"./dialog-CMYKyR97.js";import"./index-BI6CrKg2.js";function _({rowCurrent:s}){const n=s.unique_id,[o,r]=u.useState(!1),{processing:a,delete:i}=p(),d=c=>{i(`users/${c}`,{onSuccess:()=>{l.success("User deleted successfully")},onError:()=>{l.error("Failed to delete Tracker.")}})};return e.jsxs(e.Fragment,{children:[e.jsx("div",{children:e.jsxs(x,{children:[e.jsx(m,{asChild:!0,children:e.jsxs("button",{className:"focus:outline-none",children:[e.jsx("span",{className:"sr-only",children:"Open menu"}),e.jsx(F,{className:"h-4 w-4"})]})}),e.jsxs(h,{align:"end",children:[e.jsx(j,{children:"Actions"}),e.jsx(f,{children:e.jsxs("a",{href:`users/${n}/edit`,className:"flex gap-4 items-center justify-center w-full py-1",target:"_blank",rel:"noopener noreferrer",children:["Edit",e.jsx(w,{size:11})]})}),e.jsx(C,{}),e.jsxs(t,{variant:"ghost",size:"sm",className:"py-1 w-full m-0 flex gap-4 text-red-600 hover:text-red-500",onClick:()=>r(!0),children:["Delete",e.jsx(E,{size:11})]})]})]})}),e.jsx(g,{open:o,onOpenChange:r,children:e.jsxs(D,{children:[e.jsxs(y,{children:[e.jsx(z,{children:"Are you sure you want to delete?"}),e.jsxs(N,{children:["This action cannot be undone. You are about to delete (",s.username,")"]})]}),e.jsxs("div",{className:"flex justify-between flex-col gap-2 p-2",children:[e.jsx(t,{className:"w-full",variant:"destructive",disabled:a,onClick:()=>d(n),children:a?e.jsxs(e.Fragment,{children:[e.jsx(v,{className:"mr-2 h-4 w-4 animate-spin"}),"Deleting"]}):"Yes Delete"}),e.jsx(b,{className:"w-full",children:"Cancel"})]})]})})]})}export{_ as default};
//# sourceMappingURL=dropdown-eEr3NfdO.js.map