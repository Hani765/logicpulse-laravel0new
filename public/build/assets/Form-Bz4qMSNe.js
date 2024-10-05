import{W as c,j as a,J as l}from"./app-BOQZNA3r.js";import{L as o}from"./LabelInputContainer-VaPF5sWp.js";import{S as u}from"./SubmitBtn-BvGcnKlA.js";import"./label-DyIUDMiB.js";import"./input-DELo8El7.js";import"./use-combine-values-C7NWFPML.js";import"./motion-jev4RzsA.js";import"./index-DiQKiitX.js";import"./react-icons.esm-Bb_X1ijD.js";function j(){const{data:r,setData:t,processing:n,post:p,reset:i,errors:s}=c({name:"",param:"",value:""}),m=async e=>{e.preventDefault(),p("/dashboard/trackers",{onSuccess:()=>{l.success("Tracker has been created!"),i()},onError:()=>{l.error("Something went wrong! Please try again later!")}})};return a.jsxs("form",{className:"space-y-2 p-4 sm:p-0",onSubmit:m,children:[a.jsxs("div",{className:"w-full space-y-2",children:[a.jsx(o,{type:"text",autoFocus:!0,id:"tracker-name",helperText:"Tracker name",label:"Name",value:r.name,onChange:e=>t({...r,name:e.target.value}),errorMessage:s.name,description:"Enter a unique name for your tracker. This name will help you identify the tracker later."}),a.jsx(o,{type:"text",id:"tracker-param",helperText:"e.g., sub2",label:"Param",value:r.param,onChange:e=>t({...r,param:e.target.value}),errorMessage:s.param,description:"Specify the parameter for your tracker. This typically represents a sub-parameter for tracking purposes."}),a.jsx(o,{type:"text",id:"tracker-value",helperText:"e.g., {sub2}",label:"Value",value:r.value,onChange:e=>t({...r,value:e.target.value}),errorMessage:s.value,description:"Provide the value for the tracker parameter. Use placeholders like {sub2} to dynamically track different values."})]}),a.jsx(u,{processing:n,label:"Create new",className:"w-full"})]})}export{j as default};
//# sourceMappingURL=Form-Bz4qMSNe.js.map
