import{W as l,j as s,Y as d}from"./app-BOQZNA3r.js";import{L as p}from"./GuestLayout-_xRfDZDe.js";import{S as c}from"./SubmitBtn-BvGcnKlA.js";import{L as u}from"./LabelInputContainer-VaPF5sWp.js";import"./motion-jev4RzsA.js";import"./index-BxJA8sjD.js";import"./use-combine-values-C7NWFPML.js";import"./react-icons.esm-Bb_X1ijD.js";import"./label-DyIUDMiB.js";import"./input-DELo8El7.js";import"./index-DiQKiitX.js";function N(){const{data:r,setData:o,post:t,processing:a,errors:i,reset:n}=l({password:""}),m=e=>{e.preventDefault(),t(route("password.confirm"),{onFinish:()=>n("password")})};return s.jsxs(p,{heading:"Login to Elevate Your Affiliate Marketing Game!",description:`Welcome to Logic Pulse, the ultimate affiliate marketing
            platform. Access powerful tools to drive traffic, gain in-depth
            analytics, and receive comprehensive reports. Join us and
            transform your marketing strategies today!`,children:[s.jsx(d,{title:"Confirm Password"}),s.jsxs("div",{className:"mx-2 w-full rounded-none p-4 md:rounded-2xl md:p-8 lg:mx-4",children:[s.jsx("div",{className:"mb-4 text-sm text-gray-600",children:"This is a secure area of the application. Please confirm your password before continuing."}),s.jsxs("form",{onSubmit:m,children:[s.jsx("div",{className:"mt-4",children:s.jsx(u,{label:"password",id:"password",type:"password",value:r.password,className:"mt-1 block w-full",autoFocus:!0,errorMessage:i.password,onChange:e=>o("password",e.target.value)})}),s.jsx("div",{className:"flex items-center justify-end mt-4",children:s.jsx(c,{label:"Change Password",className:"w-full",processing:a})})]})]})]})}export{N as default};
//# sourceMappingURL=ConfirmPassword-CIk_gxTk.js.map
