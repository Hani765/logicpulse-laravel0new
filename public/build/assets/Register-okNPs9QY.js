import{W as p,j as e,Y as x,B as g,a as f}from"./app-BOQZNA3r.js";import{L as h}from"./GuestLayout-_xRfDZDe.js";import{L as o}from"./LabelInputContainer-VaPF5sWp.js";import{P as i}from"./password-input-B5qJd4qe.js";import{C as w}from"./checkbox-DkbzEEfI.js";import{L as n}from"./label-DyIUDMiB.js";import{S as j}from"./SubmitBtn-BvGcnKlA.js";import{I as l}from"./InputError-CGYjvlaJ.js";import"./motion-jev4RzsA.js";import"./index-BxJA8sjD.js";import"./use-combine-values-C7NWFPML.js";import"./input-DELo8El7.js";import"./index-DiQKiitX.js";import"./react-icons.esm-Bb_X1ijD.js";import"./index-DpeUaN6f.js";import"./index-BQAw569x.js";function B(){const{data:a,setData:r,post:m,processing:d,errors:t,reset:u}=p({first_name:"",last_name:"",username:"",email:"",password:"",password_confirmation:""}),c=s=>{s.preventDefault(),m(route("register"),{onFinish:()=>u("password","password_confirmation")})};return e.jsxs(h,{heading:"Join Logic Pulse for Advanced Affiliate Marketing Solutions!",description:`Sign up with Logic Pulse and unlock powerful tools to enhance your
            affiliate marketing strategies. Gain access to robust analytics,
            comprehensive reports, and boost your website traffic effectively.
            Join us now and revolutionize your marketing efforts!`,social:!0,socialText:"or signup using",children:[e.jsx(x,{title:"Register"}),e.jsxs("div",{className:"mx-2 w-full rounded-none p-4 md:rounded-2xl md:p-8 lg:mx-4",children:[e.jsxs("div",{className:"",children:[e.jsx("h2",{className:"text-lg font-bold text-neutral-800 dark:text-neutral-200",children:"Welcome to Freelancing Network!"}),e.jsxs("span",{className:"mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300",children:["Sign up now to connect with clients and grow your freelancing career. or?",e.jsx(g,{variant:"linkHover2",className:"m-0 p-0",children:e.jsxs(f,{href:"login",className:"text-primary",children:[" ","Login now"]})})]})]}),e.jsx("div",{className:"my-4 w-full",children:e.jsxs("form",{onSubmit:c,children:[e.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-2",children:[e.jsx(o,{type:"text",id:"first_name",helperText:"eg: John",value:a.first_name,onChange:s=>r("first_name",s.target.value),required:!0,errorMessage:t.first_name,autoFocus:!0,label:"First Name"}),e.jsx(o,{type:"text",id:"last_name",helperText:"eg: Smith",value:a.last_name,onChange:s=>r("last_name",s.target.value),required:!0,errorMessage:t.last_name,autoFocus:!0,label:"Last Name"}),e.jsx(o,{type:"text",id:"username",helperText:"eg: johnsmith",value:a.username,onChange:s=>r("username",s.target.value),required:!0,errorMessage:t.username,autoFocus:!0,label:"Username"}),e.jsx(o,{type:"email",id:"email",helperText:"example@domain.com",value:a.email,onChange:s=>r("email",s.target.value),required:!0,errorMessage:t.email,autoFocus:!0,label:"Email"})]}),e.jsxs("div",{className:"mt-2",children:[e.jsx(n,{htmlFor:"password",children:"Password"}),e.jsx(i,{id:"password",name:"password",value:a.password,autoComplete:"new-password",onChange:s=>r("password",s.target.value),required:!0}),e.jsx(l,{message:t.password,className:"mt-2"})]}),e.jsxs("div",{className:"mt-2",children:[e.jsx(n,{htmlFor:"password_confirmation",children:"Confirm Password"}),e.jsx(i,{id:"password_confirmation",name:"password_confirmation",value:a.password_confirmation,autoComplete:"new-password",onChange:s=>r("password_confirmation",s.target.value),required:!0}),e.jsx(l,{message:t.password_confirmation,className:"mt-2"})]}),e.jsxs("div",{className:"items-top mb-1 flex space-x-2 mt-2",children:[e.jsx(w,{id:"terms1",required:!0}),e.jsxs("div",{className:"grid gap-1 leading-none",children:[e.jsx("label",{htmlFor:"terms1",className:"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",children:"Accept terms and conditions"}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"You agree to our Terms of Service and Privacy Policy."})]})]}),e.jsx("div",{className:"mt-4",children:e.jsx(j,{label:"Create new account",processing:d,className:"w-full"})})]})})]})]})}export{B as default};
//# sourceMappingURL=Register-okNPs9QY.js.map
