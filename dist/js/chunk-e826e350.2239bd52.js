(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e826e350"],{"1c56":function(t,e,r){t.exports=r.p+"img/403.2dda86ad.svg"},"1c5f":function(t,e,r){"use strict";var a=r("307c"),s=r.n(a);s.a},2129:function(t,e,r){t.exports=r.p+"img/500.990ae4d0.svg"},"307c":function(t,e,r){},"43b7":function(t,e,r){},6447:function(t,e,r){var a={"./400.svg":"878d","./403.svg":"1c56","./404.svg":"721b","./500.svg":"2129"};function s(t){var e=o(t);return r(e)}function o(t){var e=a[t];if(!(e+1)){var r=new Error("Cannot find module '"+t+"'");throw r.code="MODULE_NOT_FOUND",r}return e}s.keys=function(){return Object.keys(a)},s.resolve=o,t.exports=s,s.id="6447"},"6f61":function(t,e,r){"use strict";var a=r("43b7"),s=r.n(a);s.a},7096:function(t,e,r){},"721b":function(t,e,r){t.exports=r.p+"img/404.9ed13bbe.svg"},7386:function(t,e,r){"use strict";var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-footer",{staticClass:"pa-3 app--footer",attrs:{height:"auto",absolute:"",inset:""}},[r("v-layout",{attrs:{column:t.$vuetify.breakpoint.smAndDown,reverse:t.$vuetify.breakpoint.smAndDown}},[r("v-flex",{staticClass:"copyright"},[r("div",{staticClass:"text-xs-center text-md-left"},[r("span",{staticClass:"caption"},[t._v("Copyright © "+t._s((new Date).getFullYear())+" Pedagy. All rights reserved.")])])]),r("v-flex",{attrs:{"text-xs-center":""}},[r("router-link",{staticClass:"caption mr-1 primary--text",attrs:{to:"/contract"}},[t._v("이용약관")]),t._v("|\n      "),r("router-link",{staticClass:"caption mr-1 primary--text",attrs:{to:"/privacy"}},[t._v("개인정보 처리방침")]),t._v("|\n      "),r("router-link",{staticClass:"caption primary--text",attrs:{to:"/rules"}},[t._v("커뮤니티 이용규칙")])],1)],1)],1)},s=[],o={template:"#mainFooter",name:"mainFooter"},n=o,i=(r("1c5f"),r("0c7c")),c=Object(i["a"])(n,a,s,!1,null,null,null);e["a"]=c.exports},"878d":function(t,e,r){t.exports=r.p+"img/400.2dda86ad.svg"},8810:function(t,e,r){"use strict";var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"publicLayout"},[r("public-toolbar",{staticClass:"publicLayout__nav"}),r("main",{staticClass:"publicLayout__main"},[t._t("default")],2),r("main-footer",{staticClass:"publicLayout__footer"})],1)},s=[],o=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-toolbar",{attrs:{color:"#fafafa",fixed:!1,light:t.$store.getters.isLight,flat:""}},[r("v-toolbar-title",{staticClass:"ml-0 pl-3 cursor-pointer",attrs:{title:"Pedagy 홈"},on:{click:t.goIndex}},[t._v("Pedagy")]),r("v-spacer")],1)},n=[],i={name:"publicToolbar",methods:{goIndex:function(){this.$store.getters.accessToken?this.$router.push("/"):this.$router.push("/index")}}},c=i,l=r("0c7c"),u=Object(l["a"])(c,o,n,!1,null,null,null),v=u.exports,f=r("7386"),p={components:{PublicToolbar:v,MainFooter:f["a"]}},d=p,m=(r("cc46"),Object(l["a"])(d,a,s,!1,null,null,null));e["a"]=m.exports},cc46:function(t,e,r){"use strict";var a=r("7096"),s=r.n(a);s.a},dda8:function(t,e,r){"use strict";r.r(e);var a=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",{attrs:{fluid:"","fill-height":""}},[a("v-layout",{attrs:{"align-center":"","justify-center":"",app:""}},[a("v-flex",{attrs:{xs12:""}},[a("v-content",[a("v-layout",{attrs:{row:""}},[a("div",{staticClass:"mr-3 hidden-sm-and-down ml-auto"},[a("img",{attrs:{src:r("6447")("./"+t.errorCode+".svg"),alt:"에러 이미지"}})]),a("div",{class:{"text-xs-center":!0,"ml-auto":t.$vuetify.breakpoint.smAndDown,"mr-auto":!0}},[a("h1",{staticClass:"errorCode"},[t._v(t._s(t.errorCode))]),400===t.errorCode?a("h2",{staticClass:"my-3 headline"},[t._v("올바르지 않은 요청입니다.")]):403===t.errorCode?a("h2",{staticClass:"my-3 headline"},[t._v("회원 인증 후 이용할 수 있습니다.")]):404===t.errorCode?a("h2",{staticClass:"my-3 headline"},[t._v("페이지를 찾을 수 없습니다.")]):a("h2",{staticClass:"my-3 headline"},[t._v("요청을 처리하던 도중 에러가 발생하였습니다.")]),a("v-layout",{attrs:{column:t.$vuetify.breakpoint.xsOnly}},[a("v-btn",{staticClass:"mx-0",on:{click:function(e){t.$router.go(-1)}}},[t._v("이전 페이지로 가기")]),403===t.errorCode?a("router-link",{attrs:{to:"/auth"}},[a("v-btn",{attrs:{block:t.$vuetify.breakpoint.xsOnly}},[t._v("인증 페이지로 가기")])],1):t._e(),a("router-link",{attrs:{to:"/"}},[a("v-btn",{attrs:{block:t.$vuetify.breakpoint.xsOnly,color:"primary"}},[t._v("메인 페이지로 가기")])],1)],1)],1)])],1)],1)],1)],1)},s=[],o=r("8810"),n={props:["error"],created:function(){this.$emit("update:layout",o["a"])},computed:{errorCode:function(){return this.error?1*this.error:500}}},i=n,c=(r("6f61"),r("0c7c")),l=Object(c["a"])(i,a,s,!1,null,null,null);e["default"]=l.exports}}]);
//# sourceMappingURL=chunk-e826e350.2239bd52.js.map