(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-978e62ac"],{"1c5f":function(t,e,a){"use strict";var s=a("307c"),r=a.n(s);r.a},"307c":function(t,e,a){},"6b87":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s(t.$vuetify.breakpoint.smAndUp?"v-container":"div",{tag:"component",staticClass:"publicLayoutContents"},[s("v-layout",{attrs:{row:"",height:"200px","justify-center":"","align-center":""}},[s("v-card",{attrs:{width:"100%",flat:""}},[s("v-img",{attrs:{src:a("cc1f"),"aspect-ratio":"2.75"}}),s("v-card-title",{attrs:{"primary-title":""}},[s("v-flex",{attrs:{xs12:""}},[s("h3",{staticClass:"headline"},[t._v("Pedagy 교사인증")]),s("div",{staticClass:"text-xs-center justify-center align-center pa-3"},[t.result?[s("v-flex",{attrs:{"text-xs-center":"","my-5":""}},[t._v(t._s(t.result))]),s("v-layout",{attrs:{row:""}},[s("v-spacer"),s("div",[s("router-link",{attrs:{to:"/index"}},[s("v-btn",{attrs:{flat:""}},[t._v("메인화면으로 이동")])],1),s("router-link",{attrs:{to:"/signin"}},[s("v-btn",{attrs:{color:"primary"}},[t._v("로그인")])],1)],1)],1)]:s("v-flex",{attrs:{"text-xs-center":"","mt-5":""}},[t._v("인증정보를 처리하는 중입니다. 잠시만 기다려주세요..")])],2)])],1)],1)],1)],1)},r=[],n=a("8810"),i={data:function(){return{result:null}},created:function(){var t=this;this.$emit("update:layout",n["a"]);var e=this.$route.query.userId,a=this.$route.query.authKey;e&&""!==e&&a&&""!==a?this.$axios.post("/auth/submit",{userId:e,authKey:a}).then(function(e){t.result="인증이 정상적으로 처리되었습니다."}).catch(function(e){t.result="인증 처리 과정에서 오류가 발생했습니다.".concat(e.response?"["+e.response.data.message+"]":"")}):this.result="잘못된 접근입니다."},name:"AuthSubmit",methods:{}},c=i,o=a("0c7c"),l=Object(o["a"])(c,s,r,!1,null,null,null);e["default"]=l.exports},7096:function(t,e,a){},7386:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-footer",{staticClass:"pa-3 app--footer",attrs:{height:"auto",absolute:"",inset:""}},[a("v-layout",{attrs:{column:t.$vuetify.breakpoint.smAndDown,reverse:t.$vuetify.breakpoint.smAndDown}},[a("v-flex",{staticClass:"copyright"},[a("div",{staticClass:"text-xs-center text-md-left"},[a("span",{staticClass:"caption"},[t._v("Copyright © "+t._s((new Date).getFullYear())+" Pedagy. All rights reserved.")])])]),a("v-flex",{attrs:{"text-xs-center":""}},[a("router-link",{staticClass:"caption mr-1 primary--text",attrs:{to:"/contract"}},[t._v("이용약관")]),t._v("|\n      "),a("router-link",{staticClass:"caption mr-1 primary--text",attrs:{to:"/privacy"}},[t._v("개인정보 처리방침")]),t._v("|\n      "),a("router-link",{staticClass:"caption primary--text",attrs:{to:"/rules"}},[t._v("커뮤니티 이용규칙")])],1)],1)],1)},r=[],n={template:"#mainFooter",name:"mainFooter"},i=n,c=(a("1c5f"),a("0c7c")),o=Object(c["a"])(i,s,r,!1,null,null,null);e["a"]=o.exports},8810:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"publicLayout"},[a("public-toolbar",{staticClass:"publicLayout__nav"}),a("main",{staticClass:"publicLayout__main"},[t._t("default")],2),a("main-footer",{staticClass:"publicLayout__footer"})],1)},r=[],n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-toolbar",{attrs:{color:"#fafafa",fixed:!1,light:t.$store.getters.isLight,flat:""}},[a("v-toolbar-title",{staticClass:"ml-0 pl-3 cursor-pointer",attrs:{title:"Pedagy 홈"},on:{click:t.goIndex}},[t._v("Pedagy")]),a("v-spacer")],1)},i=[],c={name:"publicToolbar",methods:{goIndex:function(){this.$store.getters.accessToken?this.$router.push("/"):this.$router.push("/index")}}},o=c,l=a("0c7c"),u=Object(l["a"])(o,n,i,!1,null,null,null),p=u.exports,v=a("7386"),f={components:{PublicToolbar:p,MainFooter:v["a"]}},m=f,d=(a("cc46"),Object(l["a"])(m,s,r,!1,null,null,null));e["a"]=d.exports},cc1f:function(t,e,a){t.exports=a.p+"img/index.14a5fda2.jpg"},cc46:function(t,e,a){"use strict";var s=a("7096"),r=a.n(s);r.a}}]);
//# sourceMappingURL=chunk-978e62ac.cb698df8.js.map