import{z as e}from"./index-BVh6SYYr.js";const s=e.object({main_url:e.string().url("Please enter a valid URL."),title:e.string().min(1,"Title is required."),description:e.string().min(1,"Description is required.")}),t=e.object({urls:e.array(e.object({url:e.string().url({message:"Invalid URL format"}),deviceType:e.union([e.enum(["all","windows","mobiles","linux","android","iOs"]),e.literal("")]).refine(i=>i!=="",{message:"Device type is required"})})).nonempty({message:"At least one URL is required"})});export{t as a,s};
//# sourceMappingURL=schemas-DL5d6btj.js.map