(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4bccd6ad"],{"0813":function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a(t.$vuetify.breakpoint.smAndUp?"v-container":"div",{tag:"component",staticClass:"publicLayoutContents"},[a("v-layout",{attrs:{row:"",height:"200px","justify-center":"","align-center":""}},[a("v-card",{attrs:{width:"100%",flat:""}},[a("v-img",{attrs:{src:s("cc1f"),"aspect-ratio":"2.75"}}),a("v-card-title",{attrs:{"primary-title":""}},[a("v-flex",{attrs:{xs12:""}},[a("h3",{staticClass:"headline mb-0"},[t._v("비밀번호 찾기")]),a("div",{staticClass:"text-xs-center justify-center align-center pa-3"},[a("p",[t._v("\n              임시 비밀번호를 만들기 위한 계정의 ID와 이메일 주소를 입력해주세요.\n              "),a("br"),t._v("자격증을 통하여 인증하셨다면, 이용하셨던 메일로\n              "),a("span",[t._v("webmaster@pedagy.com")]),t._v("에 문의해주세요.\n            ")]),a("v-form",{ref:"form",staticClass:"mx-auto",attrs:{"lazy-validation":"",id:"resetPasswordForm"}},[a("v-layout",{attrs:{row:"",xs12:"",wrap:""}},[a("v-flex",{attrs:{xs12:"",md4:""}},[a("v-text-field",{staticClass:"dense",attrs:{rules:t.userIdRules,maxlength:"50","error-messages":t.userIdErrors,label:"아이디",required:"",hint:"최대 50자","validate-on-blur":""},model:{value:t.userId,callback:function(e){t.userId=e},expression:"userId"}})],1),a("v-flex",{attrs:{xs6:"",md4:""}},[a("v-text-field",{ref:"email",staticClass:"dense",attrs:{rules:t.emailRules,maxlength:"90","error-messages":t.emailErrors,label:"이메일",hint:"최대 90자","validate-on-blur":"",placeholder:"NEIS 이메일계정"},model:{value:t.email,callback:function(e){t.email=e},expression:"email"}})],1),a("v-flex",{attrs:{xs6:"",md4:""}},[a("v-autocomplete",{ref:"emailHost",staticClass:"dense",attrs:{items:t.emailHostItems,rules:t.emailHostRules,dense:"","prepend-icon":"alternate_email",label:"NEIS 이메일 뒷자리","validate-on-blur":""},model:{value:t.emailHost,callback:function(e){t.emailHost=e},expression:"emailHost"}})],1)],1)],1)],1)])],1),a("v-card-actions",{attrs:{"pa-3":""}},[a("v-layout",{attrs:{row:t.$vuetify.breakpoint.smAndUp,column:t.$vuetify.breakpoint.xsOnly,wrap:"","text-xs-right":""}},[a("v-btn",{staticClass:"mt-2",on:{click:t.goIndex}},[t._v("돌아가기")]),a("v-spacer"),a("v-btn",{staticClass:"mt-2",attrs:{color:"primary",loading:t.loading},on:{click:t.sendReset}},[t._v("임시 비밀번호 만들기")])],1)],1)],1)],1)],1)},r=[],o=s("8810"),i={name:"ResetPassword",created(){this.$emit("update:layout",o["a"])},data(){return{loading:!1,userId:null,userIdErrors:[],emailErrors:[],email:null,emailHost:null,emailHostItems:["sen.go.kr","goe.go.kr","ice.go.kr","gwe.go.kr","cbe.go.kr","cne.go.kr","dje.go.kr","sje.go.kr","jbe.go.kr","jne.go.kr","gen.go.kr","gbe.go.kr","gne.go.kr","use.go.kr","pen.go.kr","jje.go.kr"],emailRules:[t=>!!t||"이메일을 입력해주세요",t=>!t||/[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*/.test(t)||"이메일이 올바르지 않습니다."],userIdRules:[t=>!!t||"ID를 입력해주세요.",t=>t&&/^[a-zA-Z0-9_^&$]{4,50}$/.test(t)||"알파벳, 숫자, _, ^, &, $만을 포함한 4~50자",t=>t&&/^.*[a-zA-Z]+.*$/.test(t)||"최소 1글자 이상의 알파벳 포함"],emailHostRules:[t=>!!t||"NEIS 이메일 뒷자리를 선택해주세요."]}},methods:{goIndex(){this.$router.push("/index")},sendReset(){if(this.loading=!0,!this.$refs.form.validate()||this.userIdErrors.length>0||this.emailErrors.length>0)return this.$store.dispatch("showSnackbar",{text:"비밀번호를 변경할 ID와 확인용 이메일을 입력해주세요.",color:"error"}),void(this.loading=!1);this.$axios.post("/resetPassword",{userId:this.userId,email:this.email+"@"+this.emailHost},{headers:{silent:!0}}).then(t=>{this.$store.dispatch("showSnackbar",{text:"등록된 메일주소로 임시 비밀번호를 보냈습니다. 메일을 확인해주세요.",color:"info"}),this.$router.push("/signin")}).catch(t=>{if(this.loading=!1,t.response){switch(t.response.data.target){case"userId":return void(this.userIdErrors=[t.response.data.message]);case"email":return void(this.emailErrors=[t.response.data.message])}this.$store.dispatch("showSnackbar",{text:t.response.data.message||"임시 비밀번호 메일을 보내지 못했습니다.",color:"error"})}else console.log(t),this.$store.dispatch("showSnackbar",{text:"임시 비밀번호 메일을 보내지 못했습니다.",color:"error"})})}},watch:{userId(){this.userIdErrors.length>0&&(this.userIdErrors=[])},email(){this.emailErrors.length>0&&(this.emailErrors=[])}}},l=i,n=(s("3f78"),s("0c7c")),c=Object(n["a"])(l,a,r,!1,null,"141e20b0",null);e["default"]=c.exports},"3f78":function(t,e,s){"use strict";var a=s("e911"),r=s.n(a);r.a},7096:function(t,e,s){},7386:function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-footer",{staticClass:"pa-3 app--footer",attrs:{height:"auto",absolute:"",inset:""}},[s("v-layout",{attrs:{column:"/index"===t.$route.path?t.$vuetify.breakpoint.mdAndDown:t.$vuetify.breakpoint.smAndDown,reverse:"/index"===t.$route.path?t.$vuetify.breakpoint.mdAndDown:t.$vuetify.breakpoint.smAndDown}},[s("v-flex",{class:{"position-absolute":"/index"===t.$route.path?t.$vuetify.breakpoint.lgAndUp:t.$vuetify.breakpoint.mdAndUp}},[s("div",{staticClass:"text-xs-center text-lg-left"},[s("span",{staticClass:"caption"},[t._v("Copyright © "+t._s((new Date).getFullYear())+" Pedagy. All rights reserved.")])])]),s("v-flex",{attrs:{"text-xs-center":""}},[s("router-link",{staticClass:"caption mr-1 primary--text",attrs:{to:"/contract"}},[t._v("이용약관")]),t._v("|\n      "),s("router-link",{staticClass:"caption mr-1 primary--text",attrs:{to:"/privacy"}},[t._v("개인정보 처리방침")]),t._v("|\n      "),s("router-link",{staticClass:"caption primary--text",attrs:{to:"/rules"}},[t._v("커뮤니티 이용규칙")])],1)],1)],1)},r=[],o={template:"#mainFooter",name:"mainFooter"},i=o,l=s("0c7c"),n=Object(l["a"])(i,a,r,!1,null,null,null);e["a"]=n.exports},8810:function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"publicLayout"},[s("public-toolbar",{staticClass:"publicLayout__nav"}),s("main",{staticClass:"publicLayout__main"},[t._t("default")],2),s("main-footer",{staticClass:"publicLayout__footer"})],1)},r=[],o=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-toolbar",{attrs:{color:"#fafafa",fixed:!1,light:t.$store.getters.isLight,flat:""}},[s("v-toolbar-title",{staticClass:"ml-0 pl-3 cursor-pointer",attrs:{title:"Pedagy 홈"},on:{click:t.goIndex}},[t._v("Pedagy")]),s("v-spacer")],1)},i=[],l={name:"publicToolbar",methods:{goIndex(){this.$store.getters.accessToken?this.$router.push("/"):this.$router.push("/index")}}},n=l,c=s("0c7c"),u=Object(c["a"])(n,o,i,!1,null,null,null),d=u.exports,m=s("7386"),p={components:{PublicToolbar:d,MainFooter:m["a"]}},v=p,h=(s("cc46"),Object(c["a"])(v,a,r,!1,null,null,null));e["a"]=h.exports},cc1f:function(t,e,s){t.exports=s.p+"img/index.14a5fda2.jpg"},cc46:function(t,e,s){"use strict";var a=s("7096"),r=s.n(a);r.a},e911:function(t,e,s){}}]);
//# sourceMappingURL=chunk-4bccd6ad.e1db1019.js.map