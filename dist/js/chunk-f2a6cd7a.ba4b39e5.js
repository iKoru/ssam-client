(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f2a6cd7a"],{"0586":function(t,e,n){},2558:function(t,e,n){},"437a":function(t,e,n){"use strict";var r=n("2558"),a=n.n(r);a.a},"475a":function(t,e,n){},5347:function(t,e,n){"use strict";var r=n("c1df"),a=n.n(r),s={data:function(){return{boardTypeItems:{T:"토픽",L:"라운지",D:"아카이브",X:"게시판",E:"전직교사",N:"예비교사"},webUrl:"https://pedagy.com"}},methods:{uuid:function(){var t=function(){return(65536*(1+Math.random())|0).toString(16).substring(1)};return t()+t()+"-"+t()+"-"+t()+"-"+t()+"-"+t()+t()+t()},dataURItoBlob:function(t){var e;e=t.split(",")[0].indexOf("base64")>=0?atob(t.split(",")[1]):unescape(t.split(",")[1]);for(var n=t.split(",")[0].split(":")[1].split(";")[0],r=new Uint8Array(e.length),a=0;a<e.length;a++)r[a]=e.charCodeAt(a);return new Blob([r],{type:n})},timeParser:function(t){return a()(t,"YYYYMMDDHHmmss").fromNow()}}};e["a"]=s},8512:function(t,e,n){(function(t){function e(t){return e="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},e(t)}(function(){var n;function r(t){var e=0;return function(){return e<t.length?{done:!1,value:t[e++]}:{done:!0}}}var a="function"==typeof Object.defineProperties?Object.defineProperty:function(t,e,n){t!=Array.prototype&&t!=Object.prototype&&(t[e]=n.value)},s="undefined"!=typeof window&&window===this?this:"undefined"!=typeof t&&null!=t?t:this;function i(){i=function(){},s.Symbol||(s.Symbol=c)}var o,c=function(){var t=0;return function(e){return"jscomp_symbol_"+(e||"")+t++}}();function u(){i();var t=s.Symbol.iterator;t||(t=s.Symbol.iterator=s.Symbol("iterator")),"function"!=typeof Array.prototype[t]&&a(Array.prototype,t,{configurable:!0,writable:!0,value:function(){return l(r(this))}}),u=function(){}}function l(t){return u(),t={next:t},t[s.Symbol.iterator]=function(){return this},t}function h(t){var e="undefined"!=typeof Symbol&&Symbol.iterator&&t[Symbol.iterator];return e?e.call(t):{next:r(t)}}if("function"==typeof Object.setPrototypeOf)o=Object.setPrototypeOf;else{var d;t:{var p={o:!0},f={};try{f.__proto__=p,d=f.o;break t}catch(U){}d=!1}o=d?function(t,e){if(t.__proto__=e,t.__proto__!==e)throw new TypeError(t+" is not extensible");return t}:null}var v=o;function m(){this.g=!1,this.c=null,this.m=void 0,this.b=1,this.l=this.s=0,this.f=null}function y(t){if(t.g)throw new TypeError("Generator is already running");t.g=!0}function b(t,e,n){return t.b=n,{value:e}}function g(t){for(var e in this.w=t,this.j=[],t)this.j.push(e);this.j.reverse()}function w(t){this.a=new m,this.A=t}function x(t,e){y(t.a);var n=t.a.c;return n?S(t,"return"in n?n["return"]:function(t){return{value:t,done:!0}},e,t.a["return"]):(t.a["return"](e),k(t))}function S(t,e,n,r){try{var a=e.call(t.a.c,n);if(!(a instanceof Object))throw new TypeError("Iterator result "+a+" is not an object");if(!a.done)return t.a.g=!1,a;var s=a.value}catch(i){return t.a.c=null,t.a.i(i),k(t)}return t.a.c=null,r.call(t.a,s),k(t)}function k(t){for(;t.a.b;)try{var e=t.A(t.a);if(e)return t.a.g=!1,{value:e.value,done:!1}}catch(n){t.a.m=void 0,t.a.i(n)}if(t.a.g=!1,t.a.f){if(e=t.a.f,t.a.f=null,e.v)throw e.u;return{value:e["return"],done:!0}}return{value:void 0,done:!0}}function _(t){this.next=function(e){return t.h(e)},this["throw"]=function(e){return t.i(e)},this["return"]=function(e){return x(t,e)},u(),this[Symbol.iterator]=function(){return this}}function D(t,e){var n=new _(new w(e));return v&&v(n,t.prototype),n}if(m.prototype.h=function(t){this.m=t},m.prototype.i=function(t){this.f={u:t,v:!0},this.b=this.s||this.l},m.prototype["return"]=function(t){this.f={return:t},this.b=this.l},w.prototype.h=function(t){return y(this.a),this.a.c?S(this,this.a.c.next,t,this.a.h):(this.a.h(t),k(this))},w.prototype.i=function(t){return y(this.a),this.a.c?S(this,this.a.c["throw"],t,this.a.h):(this.a.i(t),k(this))},"undefined"===typeof FormData||!FormData.prototype.keys){var C=function(t,e){for(var n=0;n<t.length;n++)e(t[n])},$=function(t){return"string"===typeof t&&(t=t.replace(/\r\n/g,"\n").replace(/\n/g,"\r\n")),t},I=function(t,e,n){if(2>arguments.length)throw new TypeError("2 arguments required, but only "+arguments.length+" present.");return e instanceof Blob?[t+"",e,void 0!==n?n+"":"string"===typeof e.name?e.name:"blob"]:[t+"",e+""]},q=function(t){if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");return[t+""]},F=function(t){var e=h(t);return t=e.next().value,e=e.next().value,t instanceof Blob&&(t=new File([t],e,{type:t.type,lastModified:t.lastModified})),t},A="object"===("undefined"===typeof window?"undefined":e(window))?window:"object"===("undefined"===typeof self?"undefined":e(self))?self:this,E=A.FormData,O=A.XMLHttpRequest&&A.XMLHttpRequest.prototype.send,M=A.Request&&A.fetch;i();var j=A.Symbol&&Symbol.toStringTag,R=new WeakMap,T=Array.from||function(t){return[].slice.call(t)};j&&(Blob.prototype[j]||(Blob.prototype[j]="Blob"),"File"in A&&!File.prototype[j]&&(File.prototype[j]="File"));try{new File([],"")}catch(U){A.File=function(t,e,n){return t=new Blob(t,n),n=n&&void 0!==n.lastModified?new Date(n.lastModified):new Date,Object.defineProperties(t,{name:{value:e},lastModifiedDate:{value:n},lastModified:{value:+n},toString:{value:function(){return"[object File]"}}}),j&&Object.defineProperty(t,j,{value:"File"}),t}}i(),u();var B=function(t){if(R.set(this,Object.create(null)),!t)return this;var e=this;C(t.elements,function(t){if(t.name&&!t.disabled&&"submit"!==t.type&&"button"!==t.type)if("file"===t.type)C(t.files||[],function(n){e.append(t.name,n)});else if("select-multiple"===t.type||"select-one"===t.type)C(t.options,function(n){!n.disabled&&n.selected&&e.append(t.name,n.value)});else if("checkbox"===t.type||"radio"===t.type)t.checked&&e.append(t.name,t.value);else{var n="textarea"===t.type?$(t.value):t.value;e.append(t.name,n)}})};if(n=B.prototype,n.append=function(t,e,n){var r=R.get(this);r[t]||(r[t]=[]),r[t].push([e,n])},n["delete"]=function(t){delete R.get(this)[t]},n.entries=function t(){var e,n,r,a,s,i,o=this;return D(t,function(t){switch(t.b){case 1:e=R.get(o),r=new g(e);case 2:var c;t:{for(c=r;0<c.j.length;){var u=c.j.pop();if(u in c.w){c=u;break t}}c=null}if(null==(n=c)){t.b=0;break}a=h(e[n]),s=a.next();case 5:if(s.done){t.b=2;break}return i=s.value,b(t,[n,F(i)],6);case 6:s=a.next(),t.b=5}})},n.forEach=function(t,e){for(var n=h(this),r=n.next();!r.done;r=n.next()){var a=h(r.value);r=a.next().value,a=a.next().value,t.call(e,a,r,this)}},n.get=function(t){var e=R.get(this);return e[t]?F(e[t][0]):null},n.getAll=function(t){return(R.get(this)[t]||[]).map(F)},n.has=function(t){return t in R.get(this)},n.keys=function t(){var e,n,r,a,s,i=this;return D(t,function(t){if(1==t.b&&(e=h(i),n=e.next()),3!=t.b)return n.done?void(t.b=0):(r=n.value,a=h(r),s=a.next().value,b(t,s,3));n=e.next(),t.b=2})},n.set=function(t,e,n){R.get(this)[t]=[[e,n]]},n.values=function t(){var e,n,r,a,s,i=this;return D(t,function(t){if(1==t.b&&(e=h(i),n=e.next()),3!=t.b)return n.done?void(t.b=0):(r=n.value,a=h(r),a.next(),s=a.next().value,b(t,s,3));n=e.next(),t.b=2})},B.prototype._asNative=function(){for(var t=new E,e=h(this),n=e.next();!n.done;n=e.next()){var r=h(n.value);n=r.next().value,r=r.next().value,t.append(n,r)}return t},B.prototype._blob=function(){for(var t="----formdata-polyfill-"+Math.random(),e=[],n=h(this),r=n.next();!r.done;r=n.next()){var a=h(r.value);r=a.next().value,a=a.next().value,e.push("--"+t+"\r\n"),a instanceof Blob?e.push('Content-Disposition: form-data; name="'+r+'"; filename="'+a.name+'"\r\n',"Content-Type: "+(a.type||"application/octet-stream")+"\r\n\r\n",a,"\r\n"):e.push('Content-Disposition: form-data; name="'+r+'"\r\n\r\n'+a+"\r\n")}return e.push("--"+t+"--"),new Blob(e,{type:"multipart/form-data; boundary="+t})},B.prototype[Symbol.iterator]=function(){return this.entries()},B.prototype.toString=function(){return"[object FormData]"},j&&(B.prototype[j]="FormData"),[["append",I],["delete",q],["get",q],["getAll",q],["has",q],["set",I]].forEach(function(t){var e=B.prototype[t[0]];B.prototype[t[0]]=function(){return e.apply(this,t[1].apply(this,T(arguments)))}}),O&&(XMLHttpRequest.prototype.send=function(t){t instanceof B?(t=t._blob(),this.setRequestHeader("Content-Type",t.type),O.call(this,t)):O.call(this,t)}),M){var N=A.fetch;A.fetch=function(t,e){return e&&e.body&&e.body instanceof B&&(e.body=e.body._blob()),N(t,e)}}A.FormData=B}})()}).call(this,n("c8ba"))},"88dd":function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.survey?n("v-layout",{staticClass:"border-light py-2",attrs:{column:""}},[n("v-flex",[n("v-layout",{attrs:{row:"","align-center":"","mx-2":""}},[t.onlyView?n("span",{staticClass:"subheading"},[t._v("글 작성 후에 수정/삭제가 불가능합니다.")]):n("span",{staticClass:"subheading"},[t._v("설문조사")]),n("v-spacer"),n("span",{directives:[{name:"show",rawName:"v-show",value:t.finalResults,expression:"finalResults"}],staticStyle:{"white-space":"nowrap"}},[t._v("\n        "+t._s(t.survey.participants)+"명 참여\n      ")])],1)],1),t._l(t.survey.surveyContents.questions,function(e,r){return n("v-flex",{key:r,staticClass:"px-3 pt-2"},[n("div",{attrs:{id:"poll"}},[n("div",{staticClass:"font-weight-bold body-2 mb-2"},[t._v(t._s(r+1+". "+e.title)),e.allowMultipleChoice?n("small",{staticClass:"grey--text lighten-1"},[t._v("(복수응답)")]):t._e()]),n("div",{staticClass:"ans-cnt"},t._l(e.choices,function(a,s){return n("div",{key:s,staticClass:"ans"},[t.finalResults?[n("div",{class:{"ans-voted final multi-row":!0,selected:a.selected,"font-weight-bold":e.mostVotes==a.votes}},[a.percent?n("span",{staticClass:"percent"},[t._v(t._s(a.percent))]):t._e(),n("span",{staticClass:"txt"},[t._v(t._s(a.text))])]),n("span",{staticClass:"bg",style:{width:a.percent}})]:[n("div",{class:{"ans-no-vote multi-row":!0,active:a.selected},on:{click:function(e){return t.handleVote(r,a)}}},[n("span",{staticClass:"txt"},[t._v(t._s(a.text))])]),n("span",{staticClass:"bg"})]],2)}),0)]),r+1!==t.survey.surveyContents.questions.length?n("v-divider",{key:"divider"+r,staticClass:"mt-3"}):t._e()],1)}),t.survey.participated||t.onlyView?t._e():n("v-flex",[n("v-layout",{attrs:{"justify-center":"","my-2":""}},[n("v-btn",{attrs:{small:""},on:{click:function(e){t.showSurveyResult=!t.showSurveyResult}}},[t._v("\n        "+t._s(t.showSurveyResult?"돌아가기":"결과보기")+"\n      ")]),n("v-btn",{attrs:{small:"",color:"primary",disabled:t.finalResults},on:{click:t.completeSurvey}},[t._v("응답하기")])],1)],1)],2):t._e()},a=[],s={props:["currentSurvey","onlyView"],data:function(){return{showSurveyResult:!1,survey:null}},created:function(){this.survey=this.formatSurvey(this.currentSurvey)},computed:{finalResults:function(){return this.survey.participated||this.showSurveyResult}},methods:{formatSurvey:function(t){var e=t.surveyAnswers;return t.surveyContents.questions.forEach(function(t,n){var r=[],a=0,s=0;t.choices.forEach(function(t,i){e.length>n?(r.push({text:t,selected:!1,votes:e[n][i]}),e[n][i]>a&&(a=e[n][i]),s+=e[n][i]):r.push({text:t,selected:!1,votes:0})}),t.mostVotes=a,t.totalVotes=s,0===s?r.forEach(function(t){t.percent="0%"}):r.forEach(function(t){t.percent=!isNaN(t.votes)&&t.votes>0?Math.round(parseInt(t.votes)/s*100)+"%":"0%"}),t.choices=r}),t},getAnswerArray:function(t){var e=[];return t.forEach(function(t){if(t.allowMultipleChoice){var n=[];t.choices.forEach(function(t,e){t.selected&&n.push(e)}),e.push(n)}else e.push(t.choices.findIndex(function(t){return t.selected}))}),e},completeSurvey:function(){var t=this;if(this.survey.surveyContents.questions.every(function(t){return t.choices.some(function(t){return t.selected})})){if(this.survey.participated)return void this.$store.dispatch("showSnackbar",{text:"이미 참여한 설문입니다.",color:"info"});var e=this.getAnswerArray(this.survey.surveyContents.questions);this.$axios.post("/survey",{documentId:this.$route.params.documentId,answer:e}).then(function(e){console.log(e),e.data.survey?(t.survey=t.formatSurvey(e.data.survey),t.showSurveyResult=!0):t.$axios.get("/".concat(t.$route.params.boardId,"/").concat(t.$route.params.documentId)).then(function(e){t.survey=t.formatSurvey(e.data.survey),console.log(t.survey),t.showSurveyResult=!0}).catch(function(t){console.log(t)})}).catch(function(e){e.response&&409===e.response.status?t.$store.dispatch("showSnackbar",{text:e.response&&e.response.data.message||"설문 응답을 등록하지 못했습니다.",color:"info"}):t.$store.dispatch("showSnackbar",{text:e.response&&e.response.data.message||"설문 응답을 등록하지 못했습니다.",color:"error"})})}else this.$store.dispatch("showSnackbar",{text:this.survey.surveyContents.questions.findIndex(function(t){return!t.choices.some(function(t){return t.selected})})+1+"번 질문의 응답을 선택해주세요.",color:"warning"})},handleVote:function(t,e){this.survey.surveyContents.questions[t].allowMultipleChoice||e.selected||this.survey.surveyContents.questions[t].choices.forEach(function(t){return t.selected=!1}),e.selected=!e.selected}}},i=s,o=(n("437a"),n("0c7c")),c=Object(o["a"])(i,r,a,!1,null,null,null);e["a"]=c.exports},ace1:function(t,e,n){"use strict";var r=n("475a"),a=n.n(r);a.a},b76b:function(t,e,n){"use strict";var r=n("0586"),a=n.n(r);a.a},ec84:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-layout",{attrs:{column:"","mx-1":t.$vuetify.breakpoint.smAndUp,"mt-1":t.$vuetify.breakpoint.smAndUp}},[n("v-flex",{staticClass:"mb-0 pb-0",attrs:{id:"title"}},[n("v-layout",{attrs:{row:"","align-center":""}},[n("div",[t.board.categories.some(function(t){return t})?n("v-select",{staticClass:"pt-0 mt-0 nowrap",attrs:{items:t.categoryItems,id:"category",solo:"",flat:"","hide-details":"",placeholder:"카테고리 선택"},model:{value:t.category,callback:function(e){t.category=e},expression:"category"}}):t._e()],1),n("v-flex",[n("v-text-field",{staticClass:"dense",attrs:{placeholder:"제목",solo:"",flat:"",readonly:!!t.documentId,"hide-details":""},model:{value:t.title,callback:function(e){t.title=e},expression:"title"}})],1)],1)],1),n("v-flex",{attrs:{xs12:"",id:"write-editor"}},[n("quill-editor",{ref:"editor",attrs:{options:t.editorOption},model:{value:t.content,callback:function(e){t.content=e},expression:"content"}},[n("div",{attrs:{slot:"toolbar",id:"toolbar"},slot:"toolbar"},[n("button",{staticClass:"ql-bold"},[t._v("Bold")]),n("button",{staticClass:"ql-italic"},[t._v("Italic")]),n("select",{staticClass:"ql-size"},[n("option",{attrs:{value:"small"}},[t._v("작게")]),n("option",{attrs:{selected:""}},[t._v("보통")]),n("option",{attrs:{value:"large"}},[t._v("크게")]),n("option",{attrs:{value:"huge"}},[t._v("더 크게")])])])])],1),n("div",[t._v(t._s(t.savedContent))]),t.documentId?t._e():n("v-dialog",{attrs:{"max-width":"500px",fullscreen:t.$vuetify.breakpoint.xsOnly,scrollable:""},model:{value:t.surveyDialog,callback:function(e){t.surveyDialog=e},expression:"surveyDialog"}},[n("survey-maker",{attrs:{survey:t.survey,isSurveyDeletable:t.isSurveyDeletable,dialog:t.surveyDialog},on:{deleteSurvey:t.deleteSurvey,closeSurvey:t.closeSurvey,extractSurvey:t.extractSurvey}})],1),n("v-layout",{attrs:{"pt-1":"","pl-2":"","align-center":""}},[n("div",[t.documentId?t.isSurveyDeletable?n("div",{staticClass:"body-1 primary--text mr-2",attrs:{title:"등록한 설문조사는 수정할 수 없습니다."}},[n("v-icon",{staticClass:"primary--text cursor-default vertical-align-middle"},[t._v("how_to_vote")]),n("span",{staticClass:"cursor-default"},[t._v("설문조사")])],1):t._e():n("v-btn",{attrs:{small:"",flat:"",color:t.isSurveyDeletable?"primary":"default"},on:{click:t.surveyButtonClick}},[n("v-icon",[t._v("how_to_vote")]),n("span",[t._v("설문조사")])],1)],1),n("div",[n("v-btn",{attrs:{small:"",flat:""},on:{click:t.openImageDialog}},[n("v-icon",[t._v("image")]),t._v("이미지\n      ")],1)],1),n("div",[n("v-btn",{attrs:{small:"",flat:""},on:{click:t.openFileDialog}},[n("v-icon",[t._v("attach_file")]),t._v("파일첨부\n      ")],1)],1)]),n("input",{ref:"imageInput",staticClass:"d-none",attrs:{multiple:"",id:"image-upload",accept:"image/*",type:"file"},on:{change:t.onImageChange}}),n("input",{ref:"fileInput",staticClass:"d-none",attrs:{multiple:"",id:"file-upload",accept:"application/zip, application/x-zip-compressed, multipart/x-zip, application/x-hwp,application/pdf, image/*, application/vnd.openxmlformats-officedocument.wordprocessingml.*, application/msword, application/vnd.ms-powerpoint, audio/*, video/*, application/vnd.ms-excel, application/haansofthwp, application/haansoftxlsx, application/haansoftxls, application/haansoftpptx, application/haansoftppt, application/haansoftdocx, application/haansoftdoc",type:"file"},on:{change:t.onFileChange}}),n("v-slide-y-transition",[t.attachedFilenames.length>0?n("v-layout",{staticClass:"border-light",attrs:{wrap:""}},t._l(t.attachedFilenames,function(e,r){return n("v-flex",{key:r,attrs:{xs6:"",md4:"","px-2":""}},[n("v-slide-y-transition",[n("v-layout",{attrs:{row:"","align-center":""}},[n("div",{staticClass:"ellipsis"},[t._v(t._s(e))]),n("v-spacer"),n("v-btn",{staticClass:"short",attrs:{small:""},on:{click:function(e){return t.removeFile(r)}}},[t._v("삭제")])],1)],1)],1)}),1):t._e()],1),t.board.allowAnonymous?n("v-layout",{attrs:{"py-2":"","ml-3":"","justify-center":""}},[n("div",{staticClass:"mr-3"},[n("v-checkbox",{staticClass:"mr-1 my-auto mb-0",attrs:{"hide-details":"",label:"익명"},model:{value:t.isAnonymous,callback:function(e){t.isAnonymous=e},expression:"isAnonymous"}})],1),n("div",[n("v-checkbox",{staticClass:"mr-1 my-auto mb-0",attrs:{"hide-details":"",label:"익명댓글불가"},model:{value:t.disallowAnonymous,callback:function(e){t.disallowAnonymous=e},expression:"disallowAnonymous"}})],1),n("v-spacer")],1):t._e(),n("v-layout",{attrs:{row:"","mt-3":""}},[n("v-flex",{attrs:{"text-xs-center":""}},[n("v-btn",{on:{click:function(e){return t.$router.go(-1)}}},[t._v("돌아가기")]),n("v-btn",{staticClass:"primary",on:{click:function(e){return t.post()}}},[t._v(t._s(t.documentId?"수정":"등록"))])],1)],1)],1)},a=[],s=n("a34a"),i=n.n(s),o=n("88dd"),c=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-card",[n("v-toolbar",{attrs:{flat:""}},[n("v-toolbar-title",[t._v("설문조사")]),n("v-spacer"),n("v-btn",{staticClass:"toolbar-btn-last",attrs:{icon:""},on:{click:function(e){return t.$emit("closeSurvey")}}},[n("v-icon",[t._v("close")])],1)],1),n("v-card-text",{staticClass:"pb-0"},[n("v-layout",{attrs:{column:""}},[n("div",{staticClass:"border-light",attrs:{id:"surveyMaker"}},t._l(t.currentSurvey.questions,function(e,r){return n("v-flex",{key:r},[n("v-card",{attrs:{flat:""}},[n("v-card-title",{staticClass:"pb-1"},[t._v("\n              "+t._s(r+1)+".\n              "),n("v-text-field",{staticClass:"dense mt-0 pt-0 ml-2",attrs:{"single-line":"","hide-details":"",dense:"",placeholder:"질문 내용","append-outer-icon":"close"},on:{"click:append-outer":function(e){return t.deleteQuestion(r)}},model:{value:e.title,callback:function(n){t.$set(e,"title",n)},expression:"question.title"}})],1),n("v-card-text",{staticClass:"py-0"},[n("v-layout",{attrs:{column:""}},[t._l(e.choices,function(a,s){return n("v-flex",{key:s,staticClass:"mt-2"},[n("v-text-field",{staticClass:"pt-1 dense",attrs:{box:"","single-line":"",placeholder:"선택지"+(s+1),"hide-details":"","append-icon":"delete"},on:{"click:append":function(e){return t.deleteAnswer(r,s)}},model:{value:e.choices[s],callback:function(n){t.$set(e.choices,s,n)},expression:"question.choices[answerIndex]"}})],1)}),n("v-flex",[n("v-layout",{attrs:{row:"","align-center":"","justify-space-around":""}},[n("v-flex",{attrs:{"text-xs-center":""}},[n("v-btn",{attrs:{flat:""},on:{click:function(e){return t.addAnswer(r)}}},[n("v-icon",{staticClass:"mr-1",attrs:{small:""}},[t._v("add")]),t._v("선택지 추가\n                      ")],1)],1),n("v-flex",{attrs:{"text-xs-center":""}},[n("v-checkbox",{staticClass:"mt-0 pt-0",attrs:{"hide-details":"",label:"복수응답 허용"},model:{value:e.allowMultipleChoice,callback:function(n){t.$set(e,"allowMultipleChoice",n)},expression:"question.allowMultipleChoice"}})],1)],1)],1)],2)],1)],1),r!==t.currentSurvey.questions.length-1?n("v-divider",{staticClass:"mx-4"}):t._e()],1)}),1),n("v-flex",{attrs:{"mt-3":""}},[n("v-btn",{attrs:{block:"",flat:""},on:{click:t.pushQuestion}},[n("v-icon",[t._v("playlist_add")]),t._v("질문추가\n        ")],1)],1)],1)],1),n("v-card-actions",{staticClass:"align-start"},[n("v-spacer"),n("v-btn",{attrs:{color:"error",depressed:"",disabled:!t.isSurveyDeletable},on:{click:function(e){return t.$emit("deleteSurvey")}}},[t._v("설문 삭제")]),n("v-btn",{attrs:{color:"primary",depressed:""},on:{click:t.extractSurvey}},[t._v("저장")])],1)],1)},u=[],l={props:["survey","isSurveyDeletable","dialog"],data:function(){return{currentSurvey:{}}},methods:{addAnswer:function(t){this.currentSurvey.questions[t].choices.push("")},deleteAnswer:function(t,e){this.currentSurvey.questions[t].choices.length<3?this.currentSurvey.questions[t].choices[e]&&this.currentSurvey.questions[t].choices[e].length>0?(this.currentSurvey.questions[t].choices[e]="",this.$forceUpdate()):this.$store.dispatch("showSnackbar",{text:"선택지는 2개 이상이어야 합니다.",color:"info"}):this.currentSurvey.questions[t].choices.splice(e,1)},pushQuestion:function(){this.currentSurvey.questions.push({title:"",allowMultipleChoice:!1,choices:["",""]})},deleteQuestion:function(t){1===this.currentSurvey.questions.length?this.currentSurvey.questions[t].title&&this.currentSurvey.questions[t].title.length>0||this.currentSurvey.questions[t].choices.some(function(t){return t&&t.length>0})?(this.currentSurvey.questions.splice(t,1),this.currentSurvey.questions.push({title:"",allowMultipleChoice:!1,choices:["",""]})):this.$store.dispatch("showSnackbar",{text:"최소 하나 이상의 질문을 입력해주세요",color:"warning"}):this.currentSurvey.questions.splice(t,1)},extractSurvey:function(){var t=0;while(t<this.currentSurvey.questions.length)if(this.currentSurvey.questions[t].title&&this.currentSurvey.questions[t].title.length>0){if(!(this.currentSurvey.questions[t].choices.filter(function(t){return t&&t.length>0}).length>1))return void this.$store.dispatch("showSnackbar",{text:t+1+"번째 질문의 응답을 2개 이상으로 입력해주세요.",color:"info"});this.currentSurvey.questions[t].choices=this.currentSurvey.questions[t].choices.filter(function(t){return t&&t.length>0}),t++}else{if(this.currentSurvey.questions[t].choices.some(function(t){return t&&t.length>0}))return void this.$store.dispatch("showSnackbar",{text:t+1+"번째 질문의 제목을 입력해주세요.",color:"info"});this.currentSurvey.questions.splice(t,1)}0!==t?this.$emit("extractSurvey",this.currentSurvey):this.$store.dispatch("showSnackbar",{text:"질문을 1개 이상 입력해주세요.",color:"warning"})}},watch:{dialog:function(t){t&&(this.currentSurvey=JSON.parse(JSON.stringify(this.survey)))}}},h=l,d=(n("b76b"),n("0c7c")),p=Object(d["a"])(h,c,u,!1,null,null,null),f=p.exports,v=n("5347");n("8512");function m(t,e,n,r,a,s,i){try{var o=t[s](i),c=o.value}catch(u){return void n(u)}o.done?e(c):Promise.resolve(c).then(r,a)}function y(t){return function(){var e=this,n=arguments;return new Promise(function(r,a){var s=t.apply(e,n);function i(t){m(s,r,a,i,o,"next",t)}function o(t){m(s,r,a,i,o,"throw",t)}i(void 0)})}}var b={name:"Editor",components:{SurveyMaker:f,Survey:o["a"]},props:["documentId","board"],mixins:[v["a"]],data:function(){return{savedContent:void 0,link:void 0,title:null,content:"",surveyDialog:!1,survey:{questions:[]},isSurveyDeletable:!1,category:"",editorOption:{placeholder:"내용을 입력해주세요.",modules:{toolbar:"#toolbar",magicUrl:{urlRegularExpression:/(https?:\/\/[\S]+)|(www.[\S]+)|([\S]+.(?:com|kr|org|io|net|me))/,globalRegularExpression:/(https?:\/\/[\S]+)|(www.[\S]+)|([\S]+.(?:com|kr|org|io|net|me))/,normalizeRegularExpression:/(https?:\/\/[\S]+)|(www.[\S]+)|([\S]+.(?:com|kr|org|io|net|me))/},imageDrop:!0},theme:this.$vuetify.breakpoint.xsOnly?"bubble":"snow"},show:!1,isAnonymous:!1,disallowAnonymous:!1,formData:void 0,rawFileData:void 0,attachedFilenames:[],attachFromServer:[],newlyAddedImages:[]}},methods:{onEditorChange:function(t){t.quill;var e=t.html;t.text;this.content=e},post:function(){var t=y(i.a.mark(function t(){return i.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(this.title&&""!==this.title.trim()){t.next=5;break}return this.$store.dispatch("showSnackbar",{text:"글 제목을 입력해주세요.",color:"error"}),t.abrupt("return");case 5:if(this.content&&""!==this.content.trim()){t.next=8;break}return this.$store.dispatch("showSnackbar",{text:"글 내용을 입력해주세요.",color:"error"}),t.abrupt("return");case 8:if(!this.documentId){t.next=13;break}return t.next=11,this.uploadModifiedDocument();case 11:t.next=15;break;case 13:return t.next=15,this.uploadDocument();case 15:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),uploadDocument:function(){var t=y(i.a.mark(function t(){var e=this;return i.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:this.formData||(this.formData=new FormData),this.attachImages(),this.formData.append("boardId",this.$route.params.boardId),this.formData.append("title",this.title),this.formData.append("contents",JSON.stringify(this.$refs.editor.quill.editor.delta)),this.formData.append("previewContents",this.$refs.editor.quill.getText(0,50)),this.formData.append("isAnonymous",this.isAnonymous),this.category&&""!==this.category&&this.formData.append("category",this.category),this.formData.append("allowAnonymous",!!this.isAnonymous||!this.disallowAnonymous),this.isSurveyDeletable&&this.formData.append("survey",JSON.stringify(this.survey)),this.processUploadFiles(),this.$axios.post("/document",this.formData).then(function(t){e.newlyAddedImages=[],e.$router.push("/".concat(e.$route.params.boardId,"/").concat(t.data.documentId))}).catch(function(t){console.log(t),e.$store.dispatch("showSnackbar",{text:"".concat(t.response?t.response.data.message:"글을 등록하지 못했습니다. 다시 시도해주세요."),color:"error"}),delete e.formData,e.revertImages(),e.newlyAddedImages=[]});case 12:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),uploadModifiedDocument:function(){var t=y(i.a.mark(function t(){var e=this;return i.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,this.formData||(this.formData=new FormData),this.formData.append("documentId",this.documentId),this.restoreServerImages(),this.attachImages(),t.next=7,this.processFileChange();case 7:if(!t.sent){t.next=11;break}this.$axios.put("/document",{documentId:this.documentId,title:this.title,contents:JSON.stringify(this.$refs.editor.quill.editor.delta),previewContents:this.$refs.editor.quill.getText(0,50),category:this.category}).then(function(t){e.$store.dispatch("showSnackbar",{text:"글을 수정하였습니다.",color:"success"}),e.newlyAddedImages=[],e.$router.push("/".concat(e.$route.params.boardId,"/").concat(e.documentId))}).catch(function(t){console.log(t),delete e.formData,e.revertImages(),e.$store.dispatch("showSnackbar",{text:"".concat(t.response?t.response.data.message:"글을 수정하지 못했습니다. 다시 시도해주세요."),color:"error"})}),t.next=13;break;case 11:delete this.formData,this.revertImages();case 13:t.next=21;break;case 15:t.prev=15,t.t0=t["catch"](0),console.log(t.t0),this.$store.dispatch("showSnackbar",{text:"".concat(t.t0.response?t.t0.response.data.message:"글을 수정하지 못했습니다. 다시 시도해주세요."),color:"error"}),this.revertImages(),delete this.formData;case 21:case"end":return t.stop()}},t,this,[[0,15]])}));function e(){return t.apply(this,arguments)}return e}(),attachImages:function(){var t=this;this.$refs.editor.quill.editor.delta.ops.forEach(function(e){if(e.insert.image&&e.insert.image.startsWith("data:image")){var n=e.insert.image,r=t.uuid()+"."+n.substring("data:image/".length,n.indexOf(";base64"));t.formData.append("attach",t.dataURItoBlob(n),r),e.insert.image=r,t.newlyAddedImages.push({base64:n,attach_name:r})}})},restoreServerImages:function(){var t=this;this.$refs.editor.quill.editor.delta.ops.forEach(function(e){e.insert.image&&t.attachFromServer.some(function(t){return t.insert&&t.attach_path===e.insert.image})&&(e.insert.image=t.attachFromServer.find(function(t){return t.insert&&t.attach_path===e.insert.image}).attach_name)})},revertImages:function(){var t=this;this.$refs.editor.quill.editor.delta.ops.forEach(function(e){e.insert.image&&t.newlyAddedImages.some(function(t){return t.attach_name===e.insert.image})?e.insert.image=t.newlyAddedImages.find(function(t){return t.attach_name===e.insert.image}).base64:e.insert.image&&t.attachFromServer.some(function(t){return t.insert&&t.attach_name===e.insert.image})&&(e.insert.image=t.webUrl+t.attachFromServer.find(function(t){return t.insert&&t.attach_name===e.insert.image}).attach_path)}),this.newlyAddedImages=[]},processFileChange:function(){var t=y(i.a.mark(function t(){var e,n,r=this;return i.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(e=this.$refs.editor.quill.editor.delta.ops.filter(function(t){return t.insert.image&&r.attachFromServer.some(function(e){return t.insert.image===e.attach_name})}).map(function(t){return r.attachFromServer.find(function(e){return t.insert.image===e.attach_name}).attach_id}),n=[],this.attachFromServer.forEach(function(t){t.insert&&!e.includes(t.attach_id)?n.push(r.$axios.delete("/document/attach/".concat(r.documentId,"/").concat(t.attach_id))):t.insert||r.attachedFilenames.includes(t.attach_name)||n.push(r.$axios.delete("/document/attach/".concat(r.documentId,"/").concat(t.attach_id)))}),this.processUploadFiles()>0&&n.push(this.$axios.post("/document/attach",this.formData)),!(n.length>0)){t.next=10;break}return t.next=7,Promise.all(n).catch(function(t){return console.log(t),r.$store.dispatch("showSnackbar",{text:"".concat(t.response?t.response.data.message:"글을 수정하지 못했습니다. 다시 시도해주세요"),color:"error"}),!1});case 7:return t.abrupt("return",!0);case 10:return t.abrupt("return",!0);case 11:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),surveyButtonClick:function(){this.isSurveyDeletable||0!==this.survey.questions.length||this.survey.questions.push({title:"",allowMultipleChoice:!1,choices:["",""]}),this.surveyDialog=!0},extractSurvey:function(t){this.surveyDialog=!1,this.survey=JSON.parse(JSON.stringify(t)),this.isSurveyDeletable=!0},closeSurvey:function(){this.surveyDialog=!1},deleteSurvey:function(){confirm("작성된 질문 및 내용을 삭제할까요?")&&(this.surveyDialog=!1,this.survey.questions=[],this.isSurveyDeletable=!1)},parseDocument:function(t){var e,n=this;(this.title=t.title,this.contents=JSON.parse(t.contents),this.attachFromServer=t.attach.filter(function(t){return t}),this.isAnonymous=t.isAnonymous,t.survey&&(this.survey=t.survey,this.isSurveyDeletable=!0),Array.isArray(t.attach)&&(t.attach=t.attach.filter(function(t){return null!==t})),t.attach)&&(this.contents.ops.forEach(function(r){r.insert.hasOwnProperty("image")&&(e=t.attach.find(function(t){return t.attach_name===r.insert.image}),e&&(e.insert=!0,r.insert.image=n.webUrl+e.attach_path))}),this.attachedFilenames=t.attach.filter(function(t){return!t.insert}).map(function(t){return t.attach_name}));this.$refs.editor.quill.setContents(this.contents)},openFileDialog:function(){document.getElementById("file-upload").click()},openImageDialog:function(){document.getElementById("image-upload").click()},onFileChange:function(){var t=y(i.a.mark(function t(e){var n,r,a,s=this;return i.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:this.rawFileData||(this.rawFileData=new FormData),n=e.target.files||e.dataTransfer.files,a=0;case 3:if(!(a<n.length)){t.next=12;break}if(!(n[a].size>8388608)){t.next=7;break}return this.$store.dispatch("showSnackbar",{text:"8MB 이하의 파일만 첨부가능합니다.",color:"error"}),t.abrupt("break",12);case 7:r=this.rawFileData.getAll("file"),r.some(function(t){return t.name===n[a].name})?function(){var t=0,e=n[a].name.lastIndexOf(".");do{t++}while(r.some(function(r){return r.name===n[a].name.substring(0,e)+" (".concat(t,")")+n[a].name.substring(e,n[a].name.length)}));s.rawFileData.append("file",n[a],n[a].name.substring(0,e)+" (".concat(t,")")+n[a].name.substring(e,n[a].name.length)),s.attachedFilenames.push(n[a].name.substring(0,e)+" (".concat(t,")")+n[a].name.substring(e,n[a].name.length))}():(this.rawFileData.append("file",n[a],n[a].name),this.attachedFilenames.push(n[a].name));case 9:a++,t.next=3;break;case 12:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}(),onImageChange:function(){var t=y(i.a.mark(function t(e){var n,r,a,s=this;return i.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(n=e.target.files||e.dataTransfer.files,r=this.$refs.editor.quill,!(n.length>0)){t.next=17;break}a=0;case 4:if(!(a<n.length)){t.next=17;break}if(!(n[a].size>8388608)){t.next=8;break}return this.$store.dispatch("showSnackbar",{text:"8MB 이하의 이미지만 첨부가능합니다.",color:"error"}),t.abrupt("break",17);case 8:if(!/^image\//.test(n[a].type)){t.next=13;break}return t.next=11,new Promise(function(t){s.$loadImage(n[a],function(e){"error"===e.type&&s.$store.dispatch("showSnackbar",{text:"이미지를 업로드하지 못했습니다.",color:"error"});var n=r.getSelection();if(n)r.getLine(n.index)[1]&&(r.insertText(n.index,"\n"),n.index++),r.insertEmbed(n.index,"image",e.toDataURL()),r.insertText(++n.index,"\n"),r.setSelection(++n.index);else{var a=r.getLength();r.getLine(a)[1]&&(r.insertText(a,"\n"),a++),r.insertEmbed(a,"image",e.toDataURL()),r.insertText(++a,"\n"),r.setSelection(++a)}t()},{orientation:!0})});case 11:t.next=14;break;case 13:this.$store.dispatch("showSnackbar",{text:"이미지 파일만 업로드할 수 있습니다.",color:"error"});case 14:a++,t.next=4;break;case 17:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}(),removeFile:function(){var t=y(i.a.mark(function t(e){var n,r,a,s,o,c,u,l;return i.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(!this.rawFileData){t.next=33;break}n=new FormData,r=0,a=!0,s=!1,o=void 0,t.prev=6,c=this.rawFileData.entries()[Symbol.iterator]();case 8:if(a=(u=c.next()).done){t.next=18;break}if(l=u.value,"file"!==l[0]){t.next=15;break}if(r===Number(e)){t.next=14;break}return t.next=14,n.append(l[0],l[1],l[1].name);case 14:r+=1;case 15:a=!0,t.next=8;break;case 18:t.next=24;break;case 20:t.prev=20,t.t0=t["catch"](6),s=!0,o=t.t0;case 24:t.prev=24,t.prev=25,a||null==c.return||c.return();case 27:if(t.prev=27,!s){t.next=30;break}throw o;case 30:return t.finish(27);case 31:return t.finish(24);case 32:this.rawFileData=n;case 33:this.attachedFilenames.splice(e,1);case 34:case"end":return t.stop()}},t,this,[[6,20,24,32],[25,,27,31]])}));function e(e){return t.apply(this,arguments)}return e}(),processUploadFiles:function(){var t=this;if(this.rawFileData){var e,n=!0,r=!1,a=void 0;try{for(var s,i=function(){var n=s.value;e=t.formData.getAll("attach"),e.some(function(t){return t.name===n[1].name})?function(){var r=0,a=n[1].name.lastIndexOf(".");do{r++}while(e.some(function(t){return t.name===n[1].name.substring(0,a)+" (".concat(r,")")+n[1].name.substring(a,n[1].name.length)}));t.formData.append("attach",n[1],n[1].name.substring(0,a)+" (".concat(r,")")+n[1].name.substring(a,n[1].name.length))}():t.formData.append("attach",n[1],n[1].name)},o=this.rawFileData.entries()[Symbol.iterator]();!(n=(s=o.next()).done);n=!0)i()}catch(c){r=!0,a=c}finally{try{n||null==o.return||o.return()}finally{if(r)throw a}}}return this.formData.getAll("attach").length}},computed:{editor:function(){return this.$refs.editor.quill},categoryItems:function(){if(Array.isArray(this.board.categories)&&this.board.categories.length>0){var t=this.board.categories.map(function(t){return{text:t,value:t}});return t.splice(0,0,{text:"(분류 없음)",value:""}),t}return[]}},watch:{isAnonymous:function(t){var e=this;t&&this.$nextTick(function(){return e.disallowAnonymous=!1})},disallowAnonymous:function(t){var e=this;t&&this.$nextTick(function(){return e.isAnonymous=!1})}},created:function(){var t=this;this.$route.params.boardId&&this.documentId&&this.$axios.get("/".concat(this.$route.params.boardId,"/").concat(this.documentId)).then(function(e){t.parseDocument(e.data)}).catch(function(e){console.log(e),t.$store.dispatch("showSnackbar",{text:"".concat(e.response?e.response.data.message:"글 내용을 불러오지 못했습니다."),color:"error"}),t.$router.replace("/error?error="+(e&&e.response&&e.response.status||"404"))})}},g=b,w=(n("ace1"),Object(d["a"])(g,r,a,!1,null,null,null));e["default"]=w.exports}}]);