import{r as a,j as e,B as l}from"./app-CkWx0ziT.js";import{L as o}from"./LabelInputContainer-XQCpEK7k.js";import{I as x}from"./input-D_xANFY4.js";import{L as c}from"./label-BJBSjzRP.js";import{T as h}from"./textarea-B0o24yVn.js";import"./tooltip-BzjTxjM0.js";import"./index-Bur4E9wJ.js";import"./react-icons.esm-oGyrDKWE.js";import"./use-combine-values-DXlfacMq.js";import"./proxy-D3ZUg4-_.js";function F({partnersData:m}){const[d,p]=a.useState(m),[t,i]=a.useState({name:"",website:"",description:""}),[s,n]=a.useState(!1),u=()=>{if(t.name&&t.description){const r={href:t.website||"#",alt:t.name,title:t.name,description:t.description};p([...d,r]),i({name:"",website:"",description:""}),n(!1)}else alert("Please fill in all required fields and upload a logo.")};return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"flex justify-center items-center mt-4",children:e.jsx(l,{variant:"outline",onClick:()=>n(!s),children:s?"Cancel":"Add more"})}),s&&e.jsxs("ul",{className:"flex flex-col space-y-4 mt-4",children:[e.jsx("li",{children:e.jsxs("div",{children:[e.jsx(c,{children:"Select Logo"}),e.jsx(x,{type:"file",accept:"image/*"})]})}),e.jsx("li",{children:e.jsx(o,{label:"Name",required:!0,type:"text",value:t.name,onChange:r=>i({...t,name:r.target.value}),helperText:"Logicpulse"})}),e.jsx("li",{children:e.jsx(o,{label:"Website Url (optional)",type:"url",value:t.website,onChange:r=>i({...t,website:r.target.value}),helperText:"https://www.logicpulse.site"})}),e.jsx("li",{children:e.jsxs("div",{children:[e.jsx(c,{children:"Description:"}),e.jsx(h,{placeholder:"Something about partner...",value:t.description,name:"description",onChange:r=>i({...t,description:r.target.value}),required:!0})]})}),e.jsx("li",{className:"flex justify-center items-center",children:e.jsx(l,{variant:"outline",onClick:u,children:"Add Partner"})})]})]})}export{F as default};
//# sourceMappingURL=Form-DblYioal.js.map