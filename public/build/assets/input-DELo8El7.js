import{r as l,j as p,c as v}from"./app-BOQZNA3r.js";import{u as M,a as d}from"./use-combine-values-C7NWFPML.js";import{b as c,m as y}from"./motion-jev4RzsA.js";function k(o,...r){const i=o.length;function n(){let a="";for(let t=0;t<i;t++){a+=o[t];const e=r[t];e&&(a+=c(e)?e.get():e)}return a}return M(r.filter(c),n)}const w=l.forwardRef(({className:o,type:r,...i},n)=>{const[t,e]=l.useState(!1);let s=d(0),u=d(0);function m({currentTarget:f,clientX:x,clientY:b}){let{left:g,top:h}=f.getBoundingClientRect();s.set(x-g),u.set(b-h)}return p.jsx(y.div,{style:{background:k`
        radial-gradient(
          ${t?"100px":"0px"} circle at ${s}px ${u}px,
          hsl(var(--primary)),
          transparent 80%
        )
      `},onMouseMove:m,onMouseEnter:()=>e(!0),onMouseLeave:()=>e(!1),className:"group/input rounded-lg p-[2px] transition duration-300",children:p.jsx("input",{type:r,className:v("dark:placeholder-text-neutral-600 duration-400 flex h-10 w-full rounded-sm border bg-gray-50 px-3 py-2 text-sm text-black shadow-input transition file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 group-hover/input:shadow-none dark:bg-gray-800 dark:text-white dark:shadow-[0px_0px_1px_1px_var(--neutral-700)] dark:focus-visible:ring-primary",o),ref:n,...i})})});w.displayName="Input";export{w as I};
//# sourceMappingURL=input-DELo8El7.js.map
