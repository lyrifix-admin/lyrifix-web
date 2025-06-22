import{c as a}from"./createLucideIcon-8xFrFlUl.js";import{o as t,s as e}from"./hooks-PJGK5Pe1.js";/**
 * @license lucide-react v0.507.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const o=[["path",{d:"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",key:"ct8e1f"}],["path",{d:"M14.084 14.158a3 3 0 0 1-4.242-4.242",key:"151rxh"}],["path",{d:"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",key:"13bj9a"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]],i=a("eye-off",o);/**
 * @license lucide-react v0.507.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const r=[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],d=a("eye",r),c=t({fullName:e().min(1),username:e().min(1),email:e().email(),password:e().min(8,{message:"Password must be at least 8 carachter"}).regex(/[A-Z]/,{message:"Password must contain at least one uppercase letter"}).regex(/[a-z]/,{message:"Password must contain at least one lowercase letter"}).regex(/\d/,{message:"Password must contain at least one number"}).regex(/\W/,{message:"Password must contain at least one special character"}).refine(s=>!/\s/.test(s),{message:"Password must not contain spaces"})}),p=c.pick({email:!0,password:!0});export{i as E,p as L,c as R,d as a};
