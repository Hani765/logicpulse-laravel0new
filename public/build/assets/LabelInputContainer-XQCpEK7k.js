import{j as t,c as x}from"./app-CkWx0ziT.js";import{L as b}from"./label-BJBSjzRP.js";import{I as y}from"./input-D_xANFY4.js";import{T as N,a as k,b as T,c as w}from"./tooltip-BzjTxjM0.js";import{Q as C}from"./react-icons.esm-oGyrDKWE.js";function L({description:e}){return t.jsx(N,{children:t.jsxs(k,{children:[t.jsx(T,{type:"button",children:t.jsx(C,{className:"w-4 h-4"})}),t.jsxs(w,{side:"bottom",className:"inline-block text-sm font-light text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400",children:[t.jsx("h3",{className:"font-semibold text-gray-900 dark:text-white",children:"Details"}),t.jsx("p",{children:e})]})]})})}const D=({className:e,autoFocus:d,inputClassName:m,label:s,description:a,errorMessage:r,successMessage:o,bottomMessage:i,disabled:c,required:p,helperText:h,type:j,value:u,onChange:g,Icon:n,id:l,inputRef:f})=>t.jsxs("div",{className:x("space-y-1",e),children:[s&&t.jsxs(b,{className:`flex gap-1 items-center ${r&&"text-red-500"}`,htmlFor:l||"input",children:[n&&t.jsx(n,{size:16,className:"text-muted-foreground"}),s,a&&t.jsx(L,{description:a})]}),t.jsx(y,{type:j,value:u,ref:f,onChange:g,disabled:c,className:x(m),autoFocus:d,required:p,placeholder:h,id:l||"input"}),r&&t.jsx("p",{className:"text-sm text-red-500",children:r}),o&&t.jsx("p",{className:"text-sm text-green-500",children:o}),i&&t.jsx("p",{className:"text-sm text-gray-500",children:i})]});export{D as L};
//# sourceMappingURL=LabelInputContainer-XQCpEK7k.js.map