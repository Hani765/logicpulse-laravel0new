import{W as m,j as r,J as s}from"./app-BOQZNA3r.js";import{L as l}from"./LabelInputContainer-VaPF5sWp.js";import{S as p}from"./SubmitBtn-BvGcnKlA.js";import"./label-DyIUDMiB.js";import"./input-DELo8El7.js";import"./use-combine-values-C7NWFPML.js";import"./motion-jev4RzsA.js";import"./index-DiQKiitX.js";import"./react-icons.esm-Bb_X1ijD.js";function S(){const{data:a,setData:t,processing:n,post:u,reset:i,errors:o}=m({name:"",value:""}),c=async e=>{e.preventDefault(),u("/dashboard/sources",{onSuccess:()=>{s.success("Source has been created!"),i()},onError:()=>{s.error("Something went wrong! Please try again later!")}})};return r.jsxs("form",{className:"space-y-2 p-4 sm:p-0",onSubmit:c,children:[r.jsxs("div",{className:"w-full space-y-2",children:[r.jsx(l,{type:"text",autoFocus:!0,id:"tracker-name",helperText:"eg: Google",label:"Name",value:a.name,onChange:e=>t({...a,name:e.target.value}),errorMessage:o.name,description:"Enter a unique name for your Source. This name will help you identify the source later."}),r.jsx(l,{type:"text",id:"tracker-value",helperText:"e.g: google",label:"Value",value:a.value,onChange:e=>t({...a,value:e.target.value}),errorMessage:o.value,description:"Provide the value for the source parameter. Use placeholders like {google} to dynamically track different values."})]}),r.jsx(p,{processing:n,label:"Create new",className:"w-full"})]})}export{S as default};
//# sourceMappingURL=Form-BHkWWCmD.js.map
