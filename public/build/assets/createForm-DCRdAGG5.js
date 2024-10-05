import{W as B,r as J,j as e,B as p,R as $,J as G}from"./app-BOQZNA3r.js";import{I as H}from"./input-DELo8El7.js";import{L as n}from"./label-DyIUDMiB.js";import{S as h,a as f,b as g,c as x,d as j}from"./select-D3RgUlHS.js";import{T as O}from"./textarea-CU9b8o3s.js";import{b as W}from"./index-BxJA8sjD.js";import{R as z}from"./react-icons.esm-Bb_X1ijD.js";import{S as v}from"./search-select-4YQh_Y_H.js";import{I as y}from"./InputError-CGYjvlaJ.js";import{L as c}from"./LabelInputContainer-VaPF5sWp.js";import{M as _}from"./multi-select-DCCqSIAV.js";import"./use-combine-values-C7NWFPML.js";import"./motion-jev4RzsA.js";import"./index-BdQq_4o_.js";import"./index-BQAw569x.js";import"./index-DiQKiitX.js";import"./chevron-down-DmAu_b38.js";import"./command-DMsnYI8w.js";import"./dialog-BcfKVCAb.js";import"./index-CMPCDGMv.js";import"./search-FFPjmnRD.js";import"./index-DsGR-aJQ.js";import"./checkbox-DkbzEEfI.js";const K=({domains:C,users:T,networks:I,countries:q,categories:M,doneFunction:R})=>{const{post:k,processing:b,data:s,setData:l,errors:i,reset:E}=B({offer_name:"",image:null,age:"",rate:"",encryption:"",network_id:"",domain_id:"",category_id:"",proxy:"",details:"",users_ids:"",countries:"",status:"",urls:[{url:"",deviceType:"all"}]}),w=["all","windows","mobiles","linux","android","iOs"],U=r=>{var a;const t=(a=r.target.files)==null?void 0:a[0];t&&l(o=>({...o,image:t}))},[d,m]=J.useState({}),D=()=>{l(r=>({...r,urls:[...r.urls,{url:"",deviceType:""}]}))},L=r=>{s.urls.length>1&&(l(t=>{const a=t.urls.filter((o,u)=>u!==r);return{...t,urls:a}}),m(t=>{const a={...t};return delete a[r],a}))},N=(r,t,a)=>{l(o=>{const u=o.urls.map((S,V)=>V===r?{...S,[t]:a}:S);return{...o,urls:u}}),t==="url"&&A(r,a)},A=(r,t)=>{try{new URL(t),m(a=>{const o={...a};return delete o[r],o})}catch{m(a=>({...a,[r]:"Invalid URL"}))}},F=s.urls.map(r=>r.deviceType),P=async r=>{r.preventDefault(),k("/dashboard/offers",{onSuccess:()=>{G.success("Offer has been created!"),E(),R()}})};return e.jsxs("form",{onSubmit:P,className:"px-4 pb-4",children:[e.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4",children:[e.jsxs("div",{className:"space-y-2",children:[e.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-2",children:[e.jsx(c,{type:"text",value:s.offer_name,onChange:r=>l({...s,offer_name:r.target.value}),required:!0,errorMessage:i.offer_name,description:"Enter a unique and descriptive name for the offer.",label:"Offer Name",helperText:"Offer Name",id:"offer-name"}),e.jsx(c,{type:"file",onChange:U,required:!0,errorMessage:i.image,description:"Select an image for offer to show as an OG image.",label:"Selete Image",id:"offer-image"})]}),e.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-3 gap-2",children:[e.jsx(c,{type:"number",value:s.age,onChange:r=>l({...s,age:r.target.value}),required:!0,helperText:"18",errorMessage:i.age,description:"Specify the minimum age required to avail this offer.",label:"Age:",id:"age"}),e.jsx(c,{type:"number",value:s.rate,onChange:r=>l({...s,rate:r.target.value}),required:!0,helperText:"150",errorMessage:i.rate,description:"Enter the rate for this offer in your local currency.",label:"Rate:",id:"rate"}),e.jsx(c,{type:"number",value:s.encryption,onChange:r=>l({...s,encryption:r.target.value}),helperText:"****",errorMessage:i.encryption,description:"Specify the encryption level or code for the offer, if applicable.",label:"Encryption:",id:"encryption"})]}),e.jsx("div",{className:"w-full",children:e.jsx(v,{label:"Select Network",items:I,onSelect:r=>l({...s,network_id:r}),selected_value:s.network_id,description:"Choose the network associated with this offer.",errorMessage:i.network_id})}),e.jsxs("div",{className:"w-full grid grid-cols-3 gap-4",children:[e.jsx("div",{className:"col-span-2",children:e.jsx(v,{label:"Select Domain",items:C,onSelect:r=>l({...s,domain_id:r}),selected_value:s.domain_id,description:"Select the domain where this offer will be available.",errorMessage:i.domain_id})}),e.jsxs("div",{className:"w-full",children:[e.jsx(n,{children:"Proxy check"}),e.jsxs(h,{required:!0,value:s.proxy,onValueChange:r=>l({...s,proxy:r}),children:[e.jsx(f,{className:"",children:e.jsx(g,{placeholder:"proxy"})}),e.jsx(x,{side:"top",children:["yes","no"].map(r=>e.jsx(j,{value:r,children:r},r))})]}),e.jsx(y,{message:i.proxy})]})]}),e.jsx(v,{label:"Select Category",items:M,onSelect:r=>l({...s,category_id:r}),selected_value:s.category_id,description:"Pick a category that best describes the offer.",errorMessage:i.category_id}),e.jsxs("div",{className:"w-full",children:[e.jsx(n,{htmlFor:"message",children:"About:"}),e.jsx(O,{name:"message",placeholder:"Something about the offer...",id:"message",onChange:r=>l({...s,details:r.target.value}),required:!0}),e.jsx("p",{className:"text-sm text-gray-500",children:"Provide a detailed description of the offer."}),e.jsx(y,{message:i.details})]})]}),e.jsxs("div",{className:"w-full border-t sm:border-0",children:[s.urls.map((r,t)=>e.jsxs("div",{className:"w-full flex gap-2",children:[e.jsxs("div",{className:"w-full pt-1",children:[e.jsx(n,{children:"Offer Url"}),e.jsx(H,{type:"url",required:!0,placeholder:"https://www.example-offer.com",className:`py-4 ${d[t]?"border-red-500":""}`,value:r.url,onChange:a=>N(t,"url",a.target.value)}),d[t]&&e.jsx("p",{className:"text-red-500 text-sm",children:d[t]})]}),e.jsxs("div",{className:"w-[300px]",children:[e.jsx(n,{children:"Device Type"}),e.jsxs(h,{required:!0,value:r.deviceType,onValueChange:a=>N(t,"deviceType",a),children:[e.jsx(f,{className:"h-10 my-1",children:e.jsx(g,{placeholder:"Device Type"})}),e.jsx(x,{side:"top",children:w.filter(a=>!F.includes(a)||a===r.deviceType).map(a=>e.jsx(j,{value:a,children:a},a))})]})]}),e.jsx(p,{type:"button",onClick:()=>L(t),className:"text-red-500 bg-transparent mt-6 hover:bg-transparent hover:text-red-600",children:e.jsx(W,{})})]},t)),s.urls.length<w.length&&e.jsx(p,{type:"button",onClick:D,variant:"ringHover",className:"mt-2",children:"Add URL"}),e.jsxs("div",{className:"mt-2 space-y-2",children:[e.jsx(_,{items:T,selectedItems:s.users_ids,onSelect:r=>l({...s,users_ids:r}),label:"Select Users"}),e.jsx(_,{items:q,selectedItems:s.countries,onSelect:r=>l({...s,countries:r}),label:"Select countries"})]})]})]}),e.jsx("hr",{className:"my-2"}),e.jsxs("div",{className:"w-full items-center justify-end flex gap-2",children:[e.jsxs("div",{className:"w-full lg:max-w-36",children:[e.jsxs(h,{required:!0,value:s.status,onValueChange:r=>l({...s,status:r}),children:[e.jsx(f,{className:"h-10 my-1",children:e.jsx(g,{placeholder:"Select status"})}),e.jsx(x,{side:"top",children:["active","inactive","paused"].map(r=>e.jsx(j,{value:r,children:r},r))})]}),e.jsx(y,{message:i.status})]}),e.jsx(p,{type:"submit",disabled:b,variant:"gooeyRight",children:b?e.jsxs($.Fragment,{children:[e.jsx(z,{className:"mr-2 h-4 w-4 animate-spin"}),"Processing..."]}):"Submit"})]})]})},ve=K;export{ve as default};
//# sourceMappingURL=createForm-DCRdAGG5.js.map