import{r as n,j as r,Y as p}from"./app-CkWx0ziT.js";import{D as c}from"./table-CRgLH--_.js";import{Columns as d}from"./columns-BgfLnD1P.js";import{A as l}from"./AuthenticatedLayout-UbSsgRVo.js";import x from"./CreateDialogue-DyNm9WnB.js";import{u as h}from"./usefetch-CtnNn8YM.js";import{S as g,D as u}from"./tableSkeleton-C84tRfxU.js";import{D as f}from"./date-range-picker-DVoVMRjk.js";import{P as j}from"./page-chart-DUwi3Qbb.js";import"./react-icons.esm-oGyrDKWE.js";import"./select-K8YH05Sy.js";import"./index-BdQq_4o_.js";import"./index-B6yvsKc-.js";import"./index-Bur4E9wJ.js";import"./chevrons-up-down-CgSDZjy1.js";import"./chevron-down-DNksLOx3.js";import"./tooltip-BzjTxjM0.js";import"./input-D_xANFY4.js";import"./use-combine-values-DXlfacMq.js";import"./proxy-D3ZUg4-_.js";import"./badge-DKcNn6KQ.js";import"./command-Bi-o4Peo.js";import"./dialog-CMYKyR97.js";import"./index-BI6CrKg2.js";import"./search-HJj0K7uC.js";import"./popover-BGhxqbzK.js";import"./credenza-3netIWa9.js";import"./index-D4WClUwC.js";import"./lodash-CwY1AdOR.js";import"./checkbox-CtxrMbYo.js";import"./dropdown-BtniPVmG.js";import"./Update-G-uRYJss.js";import"./TrackerForm-CZbvnpwW.js";import"./LabelInputContainer-XQCpEK7k.js";import"./label-BJBSjzRP.js";import"./InputError-C35wS1yu.js";import"./SubmitBtn-BLHHLASd.js";import"./View-vLR-ECeJ.js";import"./index-BtzfxFID.js";import"./ellipsis-BWvFTAsp.js";import"./status-BY2738uO.js";import"./table-chart-DIeNR9jP.js";import"./index-bwGpo7tC.js";import"./index-CLgZZdzP.js";import"./index-Bts-4YLx.js";import"./sheet-CMEpnJqe.js";import"./circle-user-D2Z5yh8B.js";import"./notify-B8WPPLZs.js";import"./play-audio-DP9JVqAd.js";import"./transition-E3hSKKH_.js";import"./Form-DO3HV9hS.js";import"./skeleton-Dcg2qklM.js";import"./chart-CItY3BmR.js";function jr({auth:m}){const[o,i]=n.useState("/dashboard/fetch/trackers"),{data:t,isLoading:a,error:s}=h(o);return r.jsxs(l,{user:m.user,children:[r.jsx(p,{title:"Trackers",children:r.jsx("meta",{name:"description",content:` Manage and track your trackers in one convenient
                        location.`})}),r.jsxs("div",{className:"flex justify-between items-center",children:[r.jsxs("div",{children:[r.jsx("h2",{className:"text-lg",children:"Trackers"}),r.jsx("p",{className:"text-sm text-gray-500 hidden sm:block",children:"Manage and track your trackers in one convenient location."})]}),r.jsx(f,{endPoint:o,onUrlChange:e=>i(e)})]}),s?r.jsxs("div",{className:"min-h-72 bg-white flex mt-6 border flex-col border-gray-200 dark:border-gray-700 dark:bg-gray-900 w-full shadow-sm justify-center items-center px-2 rounded py-4 text-gray-100 dark:text-gray-600",children:[r.jsx(g,{size:44}),r.jsx("div",{children:"Something went wrong please try to refresh the page."})]}):t?r.jsxs(r.Fragment,{children:[r.jsx(j,{data:t==null?void 0:t.chart_data,isLoading:a}),r.jsx(c,{isLoading:a,data:t.data,pagination:t.pagination,endPoint:o,columns:d(),onUrlChange:e=>i(e),isPagination:!0,Create:x})]}):r.jsx(u,{rowCount:8,columnCount:8,showViewOptions:!1})]})}export{jr as default};
//# sourceMappingURL=index-Pad0dX0t.js.map