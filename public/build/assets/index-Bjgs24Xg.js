import{r as o,W as _,j as t,J as c}from"./app-CkWx0ziT.js";import{A as E}from"./AuthenticatedLayout-UbSsgRVo.js";import I from"./Step1-CqWEAUiU.js";import U from"./Step2-C6EoB6Kl.js";import C from"./Step3-Z_SIM2Zo.js";import{S as J}from"./stepper-BkZ7olyo.js";import M from"./Step4-CXp5DWDy.js";import N from"./Step5-BGRswbcu.js";import{A as O}from"./index-CvH-UYLy.js";import{m as P}from"./proxy-D3ZUg4-_.js";import"./index-D4WClUwC.js";import"./index-bwGpo7tC.js";import"./index-CLgZZdzP.js";import"./index-Bts-4YLx.js";import"./index-BdQq_4o_.js";import"./sheet-CMEpnJqe.js";import"./index-BI6CrKg2.js";import"./tooltip-BzjTxjM0.js";import"./index-Bur4E9wJ.js";import"./chevron-down-DNksLOx3.js";import"./ellipsis-BWvFTAsp.js";import"./credenza-3netIWa9.js";import"./dialog-CMYKyR97.js";import"./label-BJBSjzRP.js";import"./input-D_xANFY4.js";import"./use-combine-values-DXlfacMq.js";import"./circle-user-D2Z5yh8B.js";import"./LabelInputContainer-XQCpEK7k.js";import"./react-icons.esm-oGyrDKWE.js";import"./notify-B8WPPLZs.js";import"./play-audio-DP9JVqAd.js";import"./transition-E3hSKKH_.js";import"./search-HJj0K7uC.js";import"./textarea-B0o24yVn.js";import"./skeleton-Dcg2qklM.js";import"./schemas-DL5d6btj.js";import"./index-BVh6SYYr.js";import"./InputError-C35wS1yu.js";import"./image-uploader-Dn9xwcOv.js";import"./SubmitBtn-BLHHLASd.js";import"./profile_pic-BgAzqiSS.js";import"./search-select-Cb-UKa6W.js";import"./popover-BGhxqbzK.js";import"./command-Bi-o4Peo.js";import"./chevrons-up-down-CgSDZjy1.js";import"./select-K8YH05Sy.js";import"./index-B6yvsKc-.js";import"./multi-select-DPI-qEqD.js";import"./badge-DKcNn6KQ.js";import"./checkbox-CtxrMbYo.js";function Mt({auth:m}){const[e,r]=o.useState(1),[d,u]=o.useState(!1),[l,f]=o.useState(!1),[h,x]=o.useState(!1),D=m.user.role,[p,S]=o.useState({domains:[],networks:[],categories:[]}),[n,j]=o.useState({users:[],countries:[]}),{post:w,processing:F,data:s,setData:i,errors:a,reset:y}=_({main_url:"",title:"",description:"",keywords:"",image:"",age:"",rate:"",encryption:"",network_id:"",domain_id:"",category_id:"",proxy:"",details:"",users_ids:"",countries:"",status:"active",appliableFor:"everyone",urls:[{url:"",deviceType:"all"}]}),v=async b=>{b.preventDefault(),w("/dashboard/offers",{onSuccess:()=>{c.success("Offer has been created!"),y()},onError:()=>{c.error("An error occured while submitting form! Please check the form fields."),r(1)}})},g=5,k=()=>{switch(e){case 1:return t.jsx(I,{formData:s,setFormData:i,errors:a,showMeta:d,setShowMeta:u,currentStep:e,setCurrentStep:r});case 2:return t.jsx(U,{formData:s,setFormData:i,errors:a,dataFetched:l,setDataFetched:f,currentStep:e,setCurrentStep:r,fetchedData:p,setFetchedData:S});case 3:return t.jsx(C,{formData:s,setFormData:i,currentStep:e,setCurrentStep:r});case 4:return t.jsx(M,{formData:s,setFormData:i,errors:a,userDataFetched:h,setUserDataFetched:x,currentStep:e,setCurrentStep:r,fetchedUsersData:n,setFetchedUsersData:j,role:D});case 5:return t.jsx(N,{data:s,onClick:v,processing:F,fetchedData:p,fetchedUsersData:n});default:return null}},A=["Basic Information","Network Details","Additional Details","Target Details","Review"];return t.jsxs(E,{user:m.user,children:[t.jsx(J,{stepperItems:A,currentStep:e,setCurrentStep:r,lastStep:g}),t.jsx("div",{className:"mt-6 overflow-x-hidden",children:t.jsx(O,{mode:"wait",children:t.jsx(P.div,{initial:{opacity:0,x:100},animate:{opacity:1,x:0},exit:{opacity:0,x:-100},transition:{duration:.3},children:k()},e)})})]})}export{Mt as default};
//# sourceMappingURL=index-Bjgs24Xg.js.map