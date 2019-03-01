(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d391a52"],{"6b87":function(t,s,e){"use strict";e.r(s);var a=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e(t.$vuetify.breakpoint.smAndUp?"v-container":"div",{tag:"component",staticClass:"publicLayoutContents"},[e("v-layout",{attrs:{row:"",height:"200px","justify-center":"","align-center":""}},[e("v-card",{attrs:{width:"100%",flat:""}},[e("v-img",{attrs:{src:"/img/index.jpg","aspect-ratio":"2.75"}}),e("v-card-title",{attrs:{"primary-title":""}},[e("v-flex",{attrs:{xs12:""}},[e("h3",{staticClass:"headline"},[t._v("Pedagy 교사인증")]),e("div",{staticClass:"text-xs-center justify-center align-center pa-3"},[t.result?[e("v-flex",{attrs:{"text-xs-center":"","my-5":""}},[t._v(t._s(t.result))]),e("v-layout",{attrs:{row:""}},[e("v-spacer"),e("div",[e("router-link",{attrs:{to:"/index"}},[e("v-btn",{attrs:{flat:"",depressed:""}},[t._v("메인화면으로 이동")])],1),e("router-link",{attrs:{to:"/signin"}},[e("v-btn",{attrs:{color:"primary",round:"",depressed:""}},[t._v("로그인")])],1)],1)],1)]:e("v-flex",{attrs:{"text-xs-center":"","mt-5":""}},[t._v("인증정보를 처리하는 중입니다. 잠시만 기다려주세요..")])],2)])],1)],1)],1)],1)},c=[],n=e("8810"),r={data:function(){return{result:null}},created:function(){var t=this;this.$emit("update:layout",n["a"]);var s=this.$route.query.userId,e=this.$route.query.authKey;s&&""!==s&&e&&""!==e?this.$axios.post("/auth/submit",{userId:s,authKey:e}).then(function(s){t.result="인증이 정상적으로 처리되었습니다."}).catch(function(s){t.result="인증 처리 과정에서 오류가 발생했습니다.".concat(s.response?"["+s.response.data.message+"]":"")}):this.result="잘못된 접근입니다."},name:"AuthSubmit",methods:{}},i=r,l=e("0c7c"),o=Object(l["a"])(i,a,c,!1,null,null,null);s["default"]=o.exports},7096:function(t,s,e){},7386:function(t,s,e){"use strict";var a=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("v-footer",{staticClass:"pa-3 app--footer",attrs:{height:"auto",absolute:"",inset:""}},[e("v-layout",{attrs:{column:"/index"===t.$route.path?t.$vuetify.breakpoint.mdAndDown:t.$vuetify.breakpoint.smAndDown,reverse:"/index"===t.$route.path?t.$vuetify.breakpoint.mdAndDown:t.$vuetify.breakpoint.smAndDown}},[e("v-flex",{class:{"position-absolute":"/index"===t.$route.path?t.$vuetify.breakpoint.lgAndUp:t.$vuetify.breakpoint.mdAndUp}},[e("div",{staticClass:"text-xs-center text-lg-left"},[e("span",{staticClass:"caption"},[t._v("Copyright © "+t._s((new Date).getFullYear())+" Pedagy. All rights reserved.")])])]),e("v-flex",{attrs:{"text-xs-center":""}},[e("router-link",{staticClass:"caption mr-1",attrs:{to:"/contract"}},[t._v("이용약관")]),t._v("|\n      "),e("router-link",{staticClass:"caption mr-1",attrs:{to:"/privacy"}},[t._v("개인정보 처리방침")]),t._v("|\n      "),e("router-link",{staticClass:"caption",attrs:{to:"/rules"}},[t._v("커뮤니티 이용규칙")])],1)],1)],1)},c=[],n={template:"#mainFooter",name:"mainFooter"},r=n,i=e("0c7c"),l=Object(i["a"])(r,a,c,!1,null,null,null);s["a"]=l.exports},8810:function(t,s,e){"use strict";var a=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"publicLayout"},[e("public-toolbar",{staticClass:"publicLayout__nav"}),e("main",{staticClass:"publicLayout__main"},[t._t("default")],2),e("main-footer",{staticClass:"publicLayout__footer"})],1)},c=[],n=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("v-toolbar",{attrs:{color:"#f3f9f6",fixed:!1,light:t.$store.getters.isLight,flat:""}},[e("v-toolbar-title",{staticClass:"ml-0 pl-3 cursor-pointer",attrs:{title:"Pedagy 홈"},on:{click:t.goIndex}},[e("div",{staticStyle:{width:"120px"}},[e("svg",{staticStyle:{"enable-background":"new 0 0 1650 512","vertical-align":"middle"},attrs:{version:"1.1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",x:"0px",y:"0px",viewBox:"0 0 1650 512","xml:space":"preserve"}},[e("path",{staticClass:"st1",attrs:{d:"M698.2,240.1c0-17.4-14.1-31.6-31.6-31.6c-17.4,0-31.6,14.1-31.6,31.6c0,17.4,14.1,31.6,31.6,31.6 C684.1,271.6,698.2,257.5,698.2,240.1"}}),e("path",{staticClass:"st1",attrs:{d:"M962.2,240.1c0-17.4-14.1-31.6-31.6-31.6c-17.4,0-31.6,14.1-31.6,31.6c0,17.4,14.1,31.6,31.6,31.6 C948,271.6,962.2,257.5,962.2,240.1"}}),e("g",[e("path",{staticClass:"st2",attrs:{d:"M1004,112.5L1004,112.5c-16.4,0-30.1,11.9-32.7,27.6c-17.1-10-37-15.8-58.3-15.8c-52.5,0-96.8,35-111,82.9\n            h-37.2V72.8c0-21.3-17.3-38.6-38.6-38.6h0c-21.3,0-38.6,17.3-38.6,38.6v58.2c-12.1-4.3-25-6.6-38.6-6.6\n            c-63.9,0-115.7,51.8-115.7,115.7c0,63.9,51.8,115.7,115.7,115.7c46.5,0,86.6-27.4,105-67h54c18.4,39.6,58.5,67,105,67\n            c22.6,0,43.8-6.5,61.6-17.8c5.6,10.6,16.6,17.8,29.4,17.8h0c18.4,0,33.3-14.9,33.3-33.3V145.7\n            C1037.2,127.4,1022.3,112.5,1004,112.5z M649,289.3c-27.2,0-49.2-22-49.2-49.2c0-27.2,22-49.2,49.2-49.2c27.2,0,49.2,22,49.2,49.2\n            C698.2,267.3,676.2,289.3,649,289.3z M912.9,289.3c-27.2,0-49.2-22-49.2-49.2c0-27.2,22-49.2,49.2-49.2s49.2,22,49.2,49.2\n            C962.2,267.3,940.1,289.3,912.9,289.3z"}}),e("path",{staticClass:"st2",attrs:{d:"M168.1,34.2C104.2,34.2,52.4,86,52.4,149.9l0,0v172.6c0,18.4,14.9,33.3,33.3,33.3h0\n            c18.4,0,33.3-14.9,33.3-33.3v-67.9c14.9,7,31.6,11,49.2,11c63.9,0,115.7-51.8,115.7-115.7S232,34.2,168.1,34.2z M168.1,199.2\n            c-27.2,0-49.2-22-49.2-49.2s22-49.2,49.2-49.2c27.2,0,49.2,22,49.2,49.2S195.3,199.2,168.1,199.2z"}}),e("path",{staticClass:"st2",attrs:{d:"M1264.7,112.5c-15,0-27.6,9.9-31.8,23.5c-15.3-7.5-32.5-11.7-50.7-11.7c-63.9,0-115.7,51.8-115.7,115.7\n            c0,63.9,51.8,115.7,115.7,115.7c17.6,0,34.3-3.9,49.2-11v31.4c0,27.2-22,49.2-49.2,49.2c-20.3,0-37.8-12.3-45.3-29.9\n            c-5.1-11.9-17.2-19.3-30.2-19.3c-24.1,0-40.1,24.8-30.4,46.9c18,40.6,58.6,68.8,105.8,68.8c62,0,112.6-48.7,115.6-110h0.1V145.7\n            C1298,127.4,1283.1,112.5,1264.7,112.5z M1182.3,289.3c-27.2,0-49.2-22-49.2-49.2c0-27.2,22-49.2,49.2-49.2s49.2,22,49.2,49.2\n            C1231.5,267.3,1209.4,289.3,1182.3,289.3z"}}),e("path",{staticClass:"st2",attrs:{d:"M1539.8,129.6c-18.4,0-33.3,14.9-33.3,33.3v77.2c0,27.2-22,49.2-49.2,49.2c-27.2,0-49.2-22-49.2-49.2h0v-77.2\n            c0-18.4-14.9-33.3-33.3-33.3h0c-18.4,0-33.3,14.9-33.3,33.3v77.2c0,63.9,51.8,115.7,115.7,115.7c17.6,0,34.3-3.9,49.2-11v31.4\n            c0,27.2-22,49.2-49.2,49.2c-20.3,0-37.8-12.3-45.3-29.9c-5.1-11.9-17.2-19.3-30.2-19.3c-24.1,0-40.1,24.8-30.4,46.9\n            c18,40.6,58.6,68.8,105.8,68.8c62,0,112.6-48.7,115.6-110h0.1v-142v-77.2C1573.1,144.5,1558.2,129.6,1539.8,129.6z"}}),e("path",{staticClass:"st2",attrs:{d:"M514.1,199.3C497.5,153.7,453.6,123,405,123c-64,0-116.1,52.1-116.1,116.1S341,355.2,405,355.2\n            c36.5,0,70.1-16.6,92.2-45.6c11.2-14.6,8.4-35.5-6.2-46.7c-14.6-11.2-35.5-8.4-46.7,6.2c-9.5,12.4-23.8,19.5-39.3,19.5\n            c-25.6,0-46.7-19.6-49.2-44.5h127c10.9,0,21.1-5.3,27.3-14.2C516.3,220.9,517.8,209.5,514.1,199.3z M404.9,173.8\n            c16.2,0,30.3,8.5,38.3,21.2h-76.7C374.6,182.3,388.8,173.8,404.9,173.8z"}})])])])])],1)},r=[],i={name:"publicToolbar",methods:{goIndex:function(){this.$store.getters.accessToken?this.$router.push("/"):this.$router.push("/index")}}},l=i,o=e("0c7c"),u=Object(o["a"])(l,n,r,!1,null,null,null),p=u.exports,v=e("7386"),d={components:{PublicToolbar:p,MainFooter:v["a"]}},h=d,f=(e("cc46"),Object(o["a"])(h,a,c,!1,null,null,null));s["a"]=f.exports},cc46:function(t,s,e){"use strict";var a=e("7096"),c=e.n(a);c.a}}]);