import{r as d,R as N,j as t,c as D,G as F,B as u,F as k,b as A}from"./app-CkWx0ziT.js";import{i as S,c as m,u as H,M as B,a as p,f as z,b as G,d as V,e as E,m as f}from"./proxy-D3ZUg4-_.js";import{M as I}from"./index-bwGpo7tC.js";import{u as w,a as v}from"./use-combine-values-DXlfacMq.js";import{A as L}from"./index-CvH-UYLy.js";const R=e=>e&&typeof e=="object"&&e.mix,_=e=>R(e)?e.mix:void 0;function O(...e){const n=!Array.isArray(e[0]),r=n?0:-1,s=e[0+r],a=e[1+r],l=e[2+r],c=e[3+r],C=S(a,l,{mixer:_(l[0]),...c});return n?C(s):C}function T(e){m.current=[],e();const n=w(m.current,e);return m.current=void 0,n}function h(e,n,r,s){if(typeof e=="function")return T(e);const a=typeof n=="function"?n:O(n,r,s);return Array.isArray(e)?M(e,a):M([e],([l])=>a(l))}function M(e,n){const r=H(()=>[]);return w(e,()=>{r.length=0;const s=e.length;for(let a=0;a<s;a++)r[a]=e[a].get();return n(r)})}function g(e){return typeof e=="number"?e:parseFloat(e)}function j(e,n={}){const{isStatic:r}=d.useContext(B),s=d.useRef(null),a=v(p(e)?g(e.get()):e),l=d.useRef(a.get()),c=d.useRef(()=>{}),C=()=>{const o=s.current;o&&o.time===0&&o.sample(V.delta),i(),s.current=E({keyframes:[a.get(),l.current],velocity:a.getVelocity(),type:"spring",restDelta:.001,restSpeed:.01,...n,onUpdate:c.current})},i=()=>{s.current&&s.current.stop()};return d.useInsertionEffect(()=>a.attach((o,x)=>r?x(o):(l.current=o,c.current=x,z.update(C),a.get()),i),[JSON.stringify(n)]),G(()=>{if(p(e))return e.on("change",o=>a.set(g(o)))},[a]),a}const b=N.memo(({className:e})=>{const n=["M-380 -189C-380 -189 -312 216 152 343C616 470 684 875 684 875","M-373 -197C-373 -197 -305 208 159 335C623 462 691 867 691 867","M-366 -205C-366 -205 -298 200 166 327C630 454 698 859 698 859","M-359 -213C-359 -213 -291 192 173 319C637 446 705 851 705 851","M-352 -221C-352 -221 -284 184 180 311C644 438 712 843 712 843","M-345 -229C-345 -229 -277 176 187 303C651 430 719 835 719 835","M-338 -237C-338 -237 -270 168 194 295C658 422 726 827 726 827","M-331 -245C-331 -245 -263 160 201 287C665 414 733 819 733 819","M-324 -253C-324 -253 -256 152 208 279C672 406 740 811 740 811","M-317 -261C-317 -261 -249 144 215 271C679 398 747 803 747 803","M-310 -269C-310 -269 -242 136 222 263C686 390 754 795 754 795","M-303 -277C-303 -277 -235 128 229 255C693 382 761 787 761 787","M-296 -285C-296 -285 -228 120 236 247C700 374 768 779 768 779","M-289 -293C-289 -293 -221 112 243 239C707 366 775 771 775 771","M-282 -301C-282 -301 -214 104 250 231C714 358 782 763 782 763","M-275 -309C-275 -309 -207 96 257 223C721 350 789 755 789 755","M-268 -317C-268 -317 -200 88 264 215C728 342 796 747 796 747","M-261 -325C-261 -325 -193 80 271 207C735 334 803 739 803 739","M-254 -333C-254 -333 -186 72 278 199C742 326 810 731 810 731","M-247 -341C-247 -341 -179 64 285 191C749 318 817 723 817 723","M-240 -349C-240 -349 -172 56 292 183C756 310 824 715 824 715","M-233 -357C-233 -357 -165 48 299 175C763 302 831 707 831 707","M-226 -365C-226 -365 -158 40 306 167C770 294 838 699 838 699","M-219 -373C-219 -373 -151 32 313 159C777 286 845 691 845 691","M-212 -381C-212 -381 -144 24 320 151C784 278 852 683 852 683","M-205 -389C-205 -389 -137 16 327 143C791 270 859 675 859 675","M-198 -397C-198 -397 -130 8 334 135C798 262 866 667 866 667","M-191 -405C-191 -405 -123 0 341 127C805 254 873 659 873 659","M-184 -413C-184 -413 -116 -8 348 119C812 246 880 651 880 651","M-177 -421C-177 -421 -109 -16 355 111C819 238 887 643 887 643","M-170 -429C-170 -429 -102 -24 362 103C826 230 894 635 894 635","M-163 -437C-163 -437 -95 -32 369 95C833 222 901 627 901 627","M-156 -445C-156 -445 -88 -40 376 87C840 214 908 619 908 619","M-149 -453C-149 -453 -81 -48 383 79C847 206 915 611 915 611","M-142 -461C-142 -461 -74 -56 390 71C854 198 922 603 922 603","M-135 -469C-135 -469 -67 -64 397 63C861 190 929 595 929 595","M-128 -477C-128 -477 -60 -72 404 55C868 182 936 587 936 587","M-121 -485C-121 -485 -53 -80 411 47C875 174 943 579 943 579","M-114 -493C-114 -493 -46 -88 418 39C882 166 950 571 950 571","M-107 -501C-107 -501 -39 -96 425 31C889 158 957 563 957 563","M-100 -509C-100 -509 -32 -104 432 23C896 150 964 555 964 555","M-93 -517C-93 -517 -25 -112 439 15C903 142 971 547 971 547","M-86 -525C-86 -525 -18 -120 446 7C910 134 978 539 978 539","M-79 -533C-79 -533 -11 -128 453 -1C917 126 985 531 985 531","M-72 -541C-72 -541 -4 -136 460 -9C924 118 992 523 992 523","M-65 -549C-65 -549 3 -144 467 -17C931 110 999 515 999 515","M-58 -557C-58 -557 10 -152 474 -25C938 102 1006 507 1006 507","M-51 -565C-51 -565 17 -160 481 -33C945 94 1013 499 1013 499","M-44 -573C-44 -573 24 -168 488 -41C952 86 1020 491 1020 491","M-37 -581C-37 -581 31 -176 495 -49C959 78 1027 483 1027 483"];return t.jsx("div",{className:D("absolute  h-full w-full inset-0  [mask-size:40px] [mask-repeat:no-repeat] flex items-center justify-center",e),children:t.jsxs("svg",{className:" z-0 h-full w-full pointer-events-none absolute ",width:"100%",height:"100%",viewBox:"0 0 696 316",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[t.jsx("path",{d:"M-380 -189C-380 -189 -312 216 152 343C616 470 684 875 684 875M-373 -197C-373 -197 -305 208 159 335C623 462 691 867 691 867M-366 -205C-366 -205 -298 200 166 327C630 454 698 859 698 859M-359 -213C-359 -213 -291 192 173 319C637 446 705 851 705 851M-352 -221C-352 -221 -284 184 180 311C644 438 712 843 712 843M-345 -229C-345 -229 -277 176 187 303C651 430 719 835 719 835M-338 -237C-338 -237 -270 168 194 295C658 422 726 827 726 827M-331 -245C-331 -245 -263 160 201 287C665 414 733 819 733 819M-324 -253C-324 -253 -256 152 208 279C672 406 740 811 740 811M-317 -261C-317 -261 -249 144 215 271C679 398 747 803 747 803M-310 -269C-310 -269 -242 136 222 263C686 390 754 795 754 795M-303 -277C-303 -277 -235 128 229 255C693 382 761 787 761 787M-296 -285C-296 -285 -228 120 236 247C700 374 768 779 768 779M-289 -293C-289 -293 -221 112 243 239C707 366 775 771 775 771M-282 -301C-282 -301 -214 104 250 231C714 358 782 763 782 763M-275 -309C-275 -309 -207 96 257 223C721 350 789 755 789 755M-268 -317C-268 -317 -200 88 264 215C728 342 796 747 796 747M-261 -325C-261 -325 -193 80 271 207C735 334 803 739 803 739M-254 -333C-254 -333 -186 72 278 199C742 326 810 731 810 731M-247 -341C-247 -341 -179 64 285 191C749 318 817 723 817 723M-240 -349C-240 -349 -172 56 292 183C756 310 824 715 824 715M-233 -357C-233 -357 -165 48 299 175C763 302 831 707 831 707M-226 -365C-226 -365 -158 40 306 167C770 294 838 699 838 699M-219 -373C-219 -373 -151 32 313 159C777 286 845 691 845 691M-212 -381C-212 -381 -144 24 320 151C784 278 852 683 852 683M-205 -389C-205 -389 -137 16 327 143C791 270 859 675 859 675M-198 -397C-198 -397 -130 8 334 135C798 262 866 667 866 667M-191 -405C-191 -405 -123 0 341 127C805 254 873 659 873 659M-184 -413C-184 -413 -116 -8 348 119C812 246 880 651 880 651M-177 -421C-177 -421 -109 -16 355 111C819 238 887 643 887 643M-170 -429C-170 -429 -102 -24 362 103C826 230 894 635 894 635M-163 -437C-163 -437 -95 -32 369 95C833 222 901 627 901 627M-156 -445C-156 -445 -88 -40 376 87C840 214 908 619 908 619M-149 -453C-149 -453 -81 -48 383 79C847 206 915 611 915 611M-142 -461C-142 -461 -74 -56 390 71C854 198 922 603 922 603M-135 -469C-135 -469 -67 -64 397 63C861 190 929 595 929 595M-128 -477C-128 -477 -60 -72 404 55C868 182 936 587 936 587M-121 -485C-121 -485 -53 -80 411 47C875 174 943 579 943 579M-114 -493C-114 -493 -46 -88 418 39C882 166 950 571 950 571M-107 -501C-107 -501 -39 -96 425 31C889 158 957 563 957 563M-100 -509C-100 -509 -32 -104 432 23C896 150 964 555 964 555M-93 -517C-93 -517 -25 -112 439 15C903 142 971 547 971 547M-86 -525C-86 -525 -18 -120 446 7C910 134 978 539 978 539M-79 -533C-79 -533 -11 -128 453 -1C917 126 985 531 985 531M-72 -541C-72 -541 -4 -136 460 -9C924 118 992 523 992 523M-65 -549C-65 -549 3 -144 467 -17C931 110 999 515 999 515M-58 -557C-58 -557 10 -152 474 -25C938 102 1006 507 1006 507M-51 -565C-51 -565 17 -160 481 -33C945 94 1013 499 1013 499M-44 -573C-44 -573 24 -168 488 -41C952 86 1020 491 1020 491M-37 -581C-37 -581 31 -176 495 -49C959 78 1027 483 1027 483M-30 -589C-30 -589 38 -184 502 -57C966 70 1034 475 1034 475M-23 -597C-23 -597 45 -192 509 -65C973 62 1041 467 1041 467M-16 -605C-16 -605 52 -200 516 -73C980 54 1048 459 1048 459M-9 -613C-9 -613 59 -208 523 -81C987 46 1055 451 1055 451M-2 -621C-2 -621 66 -216 530 -89C994 38 1062 443 1062 443M5 -629C5 -629 73 -224 537 -97C1001 30 1069 435 1069 435M12 -637C12 -637 80 -232 544 -105C1008 22 1076 427 1076 427M19 -645C19 -645 87 -240 551 -113C1015 14 1083 419 1083 419",stroke:"url(#paint0_radial_242_278)",strokeOpacity:"0.05",strokeWidth:"0.5"}),n.map((r,s)=>t.jsx(f.path,{d:r,stroke:`url(#linearGradient-${s})`,strokeOpacity:"0.4",strokeWidth:"0.5"},"path-"+s)),t.jsxs("defs",{children:[n.map((r,s)=>t.jsxs(f.linearGradient,{id:`linearGradient-${s}`,initial:{x1:"0%",x2:"0%",y1:"0%",y2:"0%"},animate:{x1:["0%","100%"],x2:["0%","95%"],y1:["0%","100%"],y2:["0%",`${93+Math.random()*8}%`]},transition:{duration:Math.random()*10+10,ease:"easeInOut",repeat:1/0,delay:Math.random()*10},children:[t.jsx("stop",{stopColor:"#18CCFC",stopOpacity:"0"}),t.jsx("stop",{stopColor:"#18CCFC"}),t.jsx("stop",{offset:"32.5%",stopColor:"#6344F5"}),t.jsx("stop",{offset:"100%",stopColor:"#AE48FF",stopOpacity:"0"})]},`gradient-${s}`)),t.jsxs("radialGradient",{id:"paint0_radial_242_278",cx:"0",cy:"0",r:"1",gradientUnits:"userSpaceOnUse",gradientTransform:"translate(352 34) rotate(90) scale(555 1560.62)",children:[t.jsx("stop",{offset:"0.0666667",stopColor:"var(--neutral-300)"}),t.jsx("stop",{offset:"0.243243",stopColor:"var(--neutral-300)"}),t.jsx("stop",{offset:"0.43594",stopColor:"white",stopOpacity:"0"})]})]})]})})});b.displayName="BackgroundBeams";let y;const W=({items:e,offset:n,scaleFactor:r})=>{const s=n||10,a=r||.06,[l,c]=d.useState(e);d.useEffect(()=>(C(),()=>clearInterval(y)),[]);const C=()=>{y=setInterval(()=>{c(i=>{const o=[...i];return o.unshift(o.pop()),o})},1e4)};return t.jsx("div",{className:"relative h-full w-full",children:l.map((i,o)=>t.jsx(f.div,{className:"absolute h-fit w-fit shadow-xl shadow-black/[0.1] dark:shadow-white/[0.05]",style:{transformOrigin:"top center"},animate:{top:o*-s,scale:1-o*a,zIndex:l.length-o},children:t.jsx("div",{className:"font-normaltext-neutral-200",children:t.jsx("img",{src:`/${i.content}`,alt:i.designation,loading:"lazy",sizes:"30",className:"!w-[100%]",width:0,height:0})})},i.id))})};function Y(){return t.jsx("div",{className:"flex h-full justify-center w-full",children:t.jsx(W,{items:X})})}const X=[{id:0,name:"Manu Arora",designation:"Senior Software Engineer",content:"assets/app-ui.png"},{id:1,name:"Elon Musk",designation:"Senior Shitposter",content:"assets/app-ui.png"},{id:2,name:"Tyler Durden",designation:"Manager Project Mayhem",content:"assets/app-ui.png"}];function q(e){return F({tag:"svg",attr:{version:"1.1",x:"0px",y:"0px",viewBox:"0 0 48 48",enableBackground:"new 0 0 48 48"},child:[{tag:"path",attr:{fill:"#FFC107",d:`M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12\r
	c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24\r
	c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z`},child:[]},{tag:"path",attr:{fill:"#FF3D00",d:`M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657\r
	C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z`},child:[]},{tag:"path",attr:{fill:"#4CAF50",d:`M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36\r
	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z`},child:[]},{tag:"path",attr:{fill:"#1976D2",d:`M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571\r
	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z`},child:[]}]})(e)}function Z(){return t.jsxs(t.Fragment,{children:[t.jsx(u,{variant:"ringHover",size:"icon",className:"rounded-full bg-gray-100 shadow-md transition-all duration-300 hover:bg-gray-200 hover:ring-gray-200",children:t.jsx("a",{href:route("auth.google"),className:"flex items-center justify-center w-full h-full",children:t.jsx(q,{})})}),t.jsx(u,{variant:"ringHover",size:"icon",className:"rounded-full bg-gray-100 shadow-md hover:transition-all text-black duration-300 hover:bg-gray-200 hover:ring-gray-200",children:t.jsx("a",{href:route("auth.github"),className:"flex items-center justify-center w-full h-full",children:t.jsx(k,{})})}),t.jsx(u,{variant:"ringHover",size:"icon",className:"rounded-full bg-gray-100 shadow-md hover:transition-all text-black duration-300 hover:bg-gray-200 hover:ring-gray-200",children:t.jsx(I,{})})]})}const $=({items:e})=>{const[n,r]=d.useState(null),s={stiffness:100,damping:5},a=v(0),l=j(h(a,[-100,100],[-45,45]),s),c=j(h(a,[-100,100],[-50,50]),s),C=i=>{const o=i.target.offsetWidth/2;a.set(i.nativeEvent.offsetX-o)};return t.jsx(t.Fragment,{children:e.map((i,o)=>t.jsxs("div",{className:"-mr-4  relative group",onMouseEnter:()=>r(i.id),onMouseLeave:()=>r(null),children:[t.jsx(L,{mode:"popLayout",children:n===i.id&&t.jsxs(f.div,{initial:{opacity:0,y:20,scale:.6},animate:{opacity:1,y:0,scale:1,transition:{type:"spring",stiffness:260,damping:10}},exit:{opacity:0,y:20,scale:.6},style:{translateX:c,rotate:l,whiteSpace:"nowrap"},className:"absolute -top-16 -left-1/2 translate-x-1/2 flex text-xs  flex-col items-center justify-center rounded-md bg-black z-50 shadow-xl px-4 py-2",children:[t.jsx("div",{className:"absolute inset-x-10 z-30 w-[20%] -bottom-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent h-px "}),t.jsx("div",{className:"absolute left-10 w-[40%] z-30 -bottom-px bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px "}),t.jsx("div",{className:"font-bold text-white relative z-30 text-base",children:i.name}),t.jsx("div",{className:"text-white text-xs",children:i.designation})]})}),t.jsx("img",{onMouseMove:C,height:100,width:100,src:i.image,alt:i.name,className:"object-cover !m-0 !p-0 object-top rounded-full h-14 w-14 border-2 group-hover:scale-105 group-hover:z-30 border-white  relative transition duration-500"})]},i.name))})},J=[{id:1,name:"John Doe",designation:"Software Engineer",image:"https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80"},{id:2,name:"Robert Johnson",designation:"Product Manager",image:"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"},{id:3,name:"Jane Smith",designation:"Data Scientist",image:"https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"},{id:4,name:"Emily Davis",designation:"UX Designer",image:"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"},{id:5,name:"Tyler Durden",designation:"Soap Developer",image:"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80"},{id:6,name:"Dora",designation:"The Explorer",image:"https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3534&q=80"}];function P(){return t.jsx(t.Fragment,{children:t.jsx($,{items:J})})}function a1({children:e,heading:n,description:r,social:s,socialText:a}){return t.jsxs(t.Fragment,{children:[t.jsx("div",{className:"absolute left-4 top-2",children:t.jsxs("h2",{className:"flex w-full items-center justify-center gap-1 text-center text-xl font-bold text-neutral-800 dark:text-neutral-200",children:[t.jsx(A,{}),"LogicPulse"]})}),t.jsx("div",{className:"mt-4 bg-white dark:bg-slate-950 lg:mt-0 lg:overflow-auto",children:t.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-5",children:[t.jsx("div",{className:"col-span-2 min-h-screen overflow-hidden",children:t.jsxs("div",{className:"relative my-4 py-2 flex flex-col h-full w-full items-center justify-center lg:col-span-2",children:[e,s&&t.jsxs(t.Fragment,{children:[t.jsx("div",{className:"my-4 h-[1px] w-full bg-gradient-to-r from-transparent via-purple-300 to-transparent dark:via-neutral-700"}),t.jsxs("div",{className:"flex w-full items-center justify-center gap-2",children:[t.jsx("p",{className:"text-center text-sm",children:a}),t.jsx(Z,{})]})]})]})}),t.jsxs("div",{className:"relative hidden max-h-full min-h-screen w-full flex-1 flex-col items-center justify-center gap-3 overflow-hidden bg-primary pl-24 pt-10 bg-dot-white/[0.5] lg:col-span-3 lg:flex",children:[t.jsx("div",{className:"pointer-events-none absolute inset-0 flex items-center justify-center bg-primary [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"}),t.jsx(b,{}),t.jsxs("div",{className:"flex flex-col items-start text-white",children:[t.jsx("h2",{className:"font-bold md:text-4xl",children:n}),t.jsx("p",{className:"mb-10 text-gray-300 md:text-sm",children:r})]}),t.jsx("div",{className:"flex h-full w-full justify-start",children:t.jsx(Y,{})}),t.jsx("div",{className:"absolute bottom-4 left-4 z-50 flex",children:t.jsx(P,{})})]})]})})]})}export{a1 as L};
//# sourceMappingURL=GuestLayout-CF2F_M_a.js.map