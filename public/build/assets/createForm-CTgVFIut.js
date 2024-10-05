import{W as S,j as e,B as N,J as b}from"./app-BOQZNA3r.js";import{L as i}from"./label-DyIUDMiB.js";import{S as d,a as n,b as m,c,d as u}from"./select-D3RgUlHS.js";import{S as y}from"./search-select-4YQh_Y_H.js";import{P as C}from"./password-input-B5qJd4qe.js";import{L as o}from"./LabelInputContainer-VaPF5sWp.js";import{T as q}from"./textarea-CU9b8o3s.js";import{I as t}from"./InputError-CGYjvlaJ.js";import{M as _}from"./multi-select-DCCqSIAV.js";import{S as F}from"./SubmitBtn-BvGcnKlA.js";import"./index-BdQq_4o_.js";import"./index-BQAw569x.js";import"./index-DiQKiitX.js";import"./chevron-down-DmAu_b38.js";import"./command-DMsnYI8w.js";import"./dialog-BcfKVCAb.js";import"./index-CMPCDGMv.js";import"./search-FFPjmnRD.js";import"./index-DsGR-aJQ.js";import"./input-DELo8El7.js";import"./use-combine-values-C7NWFPML.js";import"./motion-jev4RzsA.js";import"./index-DpeUaN6f.js";import"./react-icons.esm-Bb_X1ijD.js";import"./checkbox-DkbzEEfI.js";const M=({domains:p,role:x,offers:g,doneFunction:h})=>{const{data:a,setData:r,post:j,errors:l,processing:f}=S({username:"",email:"",password:"",domain_id:"",rate:"",phone:"",skype:"",details:"",offer_ids:"",notification:"yes",role:"",isVerified:"no",status:"active"}),v=(s=>{switch(s){case"administrator":return["admin","manager","user"];case"admin":return["manager","user"];case"manager":return["user"];default:return[]}})(x),w=async s=>{s.preventDefault(),j("/dashboard/users",{onSuccess:()=>{b.success("User created successfully"),h()}})};return e.jsxs("form",{onSubmit:w,children:[e.jsxs("div",{className:"w-full space-y-2",children:[e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2",children:[e.jsx("div",{className:"w-full",children:e.jsx(o,{type:"text",id:"username",value:a.username,onChange:s=>r({...a,username:s.target.value}),required:!0,helperText:"eg: john doe",className:"col-span-2 md:col-span-1",label:"Username",errorMessage:l.username,autoFocus:!0})}),e.jsx("div",{className:"w-fu",children:e.jsx(o,{type:"email",id:"email",value:a.email,onChange:s=>r({...a,email:s.target.value}),required:!0,helperText:"example@gmail.com",label:"Email",errorMessage:l.email})}),e.jsxs("div",{className:"w-full -mt-1.5",children:[e.jsx(i,{htmlFor:"password",children:"Password"}),e.jsx(C,{id:"password",placeholder:"********",value:a.password,onChange:s=>r({...a,password:s.target.value}),required:!0}),e.jsx(t,{message:l.password})]})]}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2",children:[e.jsx("div",{className:"w-full",children:e.jsx(y,{items:p,selected_value:a.domain_id,onSelect:s=>{r({...a,domain_id:s})},label:"Select Domain",errorMessage:l.domain_id,description:"Select a domain that you want to assing to user."})}),e.jsx(o,{type:"number",value:a.rate,onChange:s=>r({...a,rate:s.target.value}),required:!0,helperText:"150",label:"Rate",id:"rate",errorMessage:l.rate}),e.jsx(o,{type:"number",value:a.phone,onChange:s=>r({...a,phone:s.target.value}),required:!0,helperText:"+123-456-789",label:"Phone",id:"phone",errorMessage:l.phone}),e.jsx(o,{type:"number",value:a.skype,onChange:s=>r({...a,skype:s.target.value}),required:!0,helperText:"+123-456-789",label:"Skype",id:"skype",errorMessage:l.skype})]}),e.jsxs("div",{className:"w-full",children:[e.jsx(i,{htmlFor:"message",children:"About:"}),e.jsx(q,{name:"message",placeholder:"Something about user...",id:"message",onChange:s=>r({...a,details:s.target.value}),required:!0,value:a.details}),e.jsx(t,{message:l.details})]}),e.jsx(_,{items:g,selectedItems:a.offer_ids,onSelect:s=>r({...a,offer_ids:s}),label:"Select Offers",descriptoin:"Select offers that you want to assign to this user."}),e.jsx(t,{message:l.offer_ids}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4",children:[e.jsxs("div",{className:"w-full ",children:[e.jsx(i,{htmlFor:"message",children:"Allow notifications:"}),e.jsxs(d,{required:!0,value:a.notification,onValueChange:s=>r({...a,notification:s}),children:[e.jsx(n,{className:"h-9 my-1",children:e.jsx(m,{placeholder:"Allow notification"})}),e.jsx(c,{side:"top",children:["yes","no"].map(s=>e.jsx(u,{value:s,children:s},s))})]}),e.jsx(t,{message:l.notification})]}),e.jsxs("div",{className:"w-full ",children:[e.jsx(i,{htmlFor:"message",children:"Role:"}),e.jsxs(d,{required:!0,value:a.role,onValueChange:s=>r({...a,role:s}),children:[e.jsx(n,{className:"h-9 my-1",children:e.jsx(m,{placeholder:"Select role"})}),e.jsx(c,{side:"top",children:v.map(s=>e.jsx(u,{value:s,children:s},s))})]}),e.jsx(t,{message:l.role})]}),e.jsxs("div",{className:"w-full ",children:[e.jsx(i,{htmlFor:"message",children:"Is verified:"}),e.jsxs(d,{required:!0,value:a.isVerified,onValueChange:s=>r({...a,isVerified:s}),children:[e.jsx(n,{className:"h-9 my-1",children:e.jsx(m,{placeholder:"Email verfication"})}),e.jsx(c,{side:"top",children:["yes","no"].map(s=>e.jsx(u,{value:s,children:s},s))})]}),e.jsx(t,{message:l.isVerified})]}),e.jsxs("div",{className:"w-full ",children:[e.jsx(i,{htmlFor:"message",children:"Status:"}),e.jsxs(d,{required:!0,value:a.status,onValueChange:s=>r({...a,status:s}),children:[e.jsx(n,{className:"h-9 my-1",children:e.jsx(m,{placeholder:"Select status"})}),e.jsx(c,{side:"top",children:["active","inactive","banned"].map(s=>e.jsx(u,{value:s,children:s},s))})]}),e.jsx(t,{message:l.status})]})]})]}),e.jsx("hr",{className:"my-3"}),e.jsxs("div",{className:"w-full items-center flex gap-2",children:[e.jsx(N,{variant:"outline",className:" w-full",type:"button",onClick:h,children:"Cancel"}),e.jsx(F,{label:"Create",className:"w-full",processing:f})]})]})},ae=M;export{ae as default};
//# sourceMappingURL=createForm-CTgVFIut.js.map
