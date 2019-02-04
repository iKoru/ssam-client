(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-452d4511"],{7862:function(e,t,o){"use strict";var r=o("fd44"),a=o.n(r);a.a},f94d:function(e,t,o){"use strict";o.r(t);var r=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("v-card",{attrs:{tile:""}},[o("v-toolbar",{attrs:{card:"",color:"white"}},[o("v-toolbar-title",[e._v(e._s(e.board?"토픽 관리":"새로운 토픽 만들기"))]),o("v-spacer"),o("v-toolbar-items",[o("v-btn",{attrs:{icon:""},on:{click:function(t){e.$emit("closeDialog",null)}}},[o("v-icon",[e._v("close")])],1)],1)],1),o("v-card-text",[o("v-form",{ref:"form"},[o("v-layout",{attrs:{row:"",xs12:"",wrap:""}},[o("v-flex",{staticClass:"mb-1",attrs:{xs6:""}},[e.board?o("v-text-field",{staticClass:"dense",attrs:{readonly:"",label:"토픽ID",hint:"pedagy.com/<b>seoul</b>과 같이 URL주소에 들어가는 문구입니다."},model:{value:e.boardId,callback:function(t){e.boardId=t},expression:"boardId"}}):o("v-text-field",{staticClass:"dense",attrs:{rules:e.boardIdRules,"error-messages":e.boardIdErrors,maxlength:"15",label:"토픽ID",hint:"pedagy.com/<b>seoul</b>과 같이 URL주소에 들어갈 문구입니다.",placeholder:"비워두면 임의로 생성됩니다.","validate-on-blur":""},on:{blur:e.checkBoardId},model:{value:e.boardId,callback:function(t){e.boardId=t},expression:"boardId"}})],1),o("v-flex",{staticClass:"mb-1",attrs:{xs6:""}},[o("v-text-field",{staticClass:"dense",attrs:{rules:e.boardNameRules,maxlength:"200",label:"토픽 이름",required:"",hint:"토픽 목록에 표시되는 이름입니다.","validate-on-blur":""},model:{value:e.boardName,callback:function(t){e.boardName=t},expression:"boardName"}})],1),o("v-flex",{attrs:{xs12:""}},[o("v-textarea",{ref:"boardDescription",attrs:{rows:3,maxlength:"1000",height:"80px",label:"토픽 소개",hint:"토픽 이름 아래에 작게 표시되는 설명입니다.","validate-on-blur":""},model:{value:e.boardDescription,callback:function(t){e.boardDescription=t},expression:"boardDescription"}})],1),o("v-flex",{attrs:{xs6:""}},[o("v-checkbox",{ref:"allowAnonymous",staticClass:"dense mt-2",attrs:{label:"익명글 허용","hide-details":""},model:{value:e.allowAnonymous,callback:function(t){e.allowAnonymous=t},expression:"allowAnonymous"}})],1),o("v-flex",{attrs:{xs6:""}},[o("v-tooltip",{attrs:{bottom:""}},[o("v-checkbox",{ref:"useCategory",staticClass:"dense mt-2",attrs:{slot:"activator",label:"카테고리 분류 사용","hide-details":""},slot:"activator",model:{value:e.useCategory,callback:function(t){e.useCategory=t},expression:"useCategory"}}),o("span",[e._v("글을 작성할 때 작성자가 기본/정보/질문 중 하나의 카테고리를 지정할 수 있습니다.")])],1)],1),o("v-flex",{staticClass:"mt-3",attrs:{xs6:""}},[o("v-select",{attrs:{items:e.allGroupAuthItems,label:"토픽 공개 여부",dense:""},model:{value:e.allGroupAuth,callback:function(t){e.allGroupAuth=t},expression:"allGroupAuth"}})],1),o("v-flex",{staticClass:"mt-3",attrs:{xs6:""}},[o("v-layout",{attrs:{"align-center":"","fill-height":""}},[o(e.$vuetify.breakpoint.xsOnly?"small":"div",{tag:"component",domProps:{innerHTML:e._s(e.allGroupAuthDescription)}})],1)],1),o("v-flex",{attrs:{xs12:""}},[o(e.$vuetify.breakpoint.xsOnly?"v-select":"v-autocomplete",{tag:"component",attrs:{name:"allowedGroups",chips:"",multiple:"","item-text":"text",dense:"","item-value":"value",disabled:"READWRITE"===e.allGroupAuth,items:e.groupItems,label:"구독 권한",hint:"내가 구독할 수 있도록 선택해야 합니다."+(""!==e.myGroup?" 나의 구독가능 정보 : "+e.myGroup:""),"persistent-hint":"","menu-props":{closeOnContentClick:e.$vuetify.breakpoint.xsOnly}},scopedSlots:e._u([{key:"selection",fn:function(t){return[o("v-chip",{key:t.item.value,attrs:{close:"",small:"",selected:t.selected},on:{input:function(o){e.removeChip(t,t.item,e.allowedGroups)}}},[e._v(e._s(t.item.text))])]}},{key:"item",fn:function(t){return[o("v-list-tile-content",[o("v-list-tile-title",{domProps:{innerHTML:e._s(t.item.text)}})],1)]}}]),model:{value:e.allowedGroups,callback:function(t){e.allowedGroups=t},expression:"allowedGroups"}})],1),e.board?o("v-flex",{staticClass:"mt-2",attrs:{xs12:""}},[o("v-select",{attrs:{name:"ownerNickName",dense:"",items:e.boardMemberItems,label:"토픽지기 양도",hint:"선택한 회원에게 토픽지기가 양도됩니다.","persistent-hint":""},model:{value:e.ownerNickName,callback:function(t){e.ownerNickName=t},expression:"ownerNickName"}})],1):e._e(),e.board&&e.board.reservedDate?o("v-flex",{staticClass:"mt-3",attrs:{xs12:""}},[o("v-textarea",{ref:"reservedContents",attrs:{rows:3,readonly:"",height:"80px",label:"변경 예약("+e.$moment(e.board.reservedDate,"YYYYMMDD").format("Y.M.D")+" 반영 예정) 내용",hint:"변경이 예약된 토픽의 내용입니다."},model:{value:e.reservedContents,callback:function(t){e.reservedContents=t},expression:"reservedContents"}})],1):e._e()],1),o("v-divider",{staticClass:"my-2"}),o("v-layout",{attrs:{row:""}},[o("v-btn",{attrs:{flat:""},on:{click:function(t){e.reset(!0)}}},[e._v("초기화")]),e.board?o("v-btn",{attrs:{color:"error"},on:{click:e.deleteBoard}},[e._v("삭제")]):e._e(),o("v-spacer"),o("v-btn",{attrs:{color:"primary",loading:e.loading},on:{click:e.save}},[e._v("등록")])],1)],1)],1)],1)},a=[];function s(e){return s="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},s(e)}var n=["document","documents","profile","profiles","auth","user","users","comment","comments","vote","votes","report","reports","index","scraps","scrap","board","boards","manage","manages","chat","chats","message","messages","group","groups","event","events","signup","signin","signout","resetPassword","notification","notifications","survey","list","admin","ADMIN","ADMINISTRATOR","administrator","attach","profiles","animal","loungeBest","topicBest","lounge","topic","type","best","sanction","userId","nickName","myPage","myBoard","myCommunity","pedagy","myPedagy","Pedagy"],i=[/^(?:[a-zA-Z]+)(?:[a-zA-Z0-9\-_]{0,15})$/,/^((?!(--|__)).)*$/],l={M:"전공",G:"학년",N:"일반",R:"지역",Z:"인증"},u={name:"topicCreator",data:function(){return{loading:!1,boardId:null,boardName:null,boardDescription:null,allGroupAuth:"READONLY",allowAnonymous:!0,useCategory:!1,allowedGroups:[],allGroupAuthItems:[{value:"READWRITE",text:"전체구독허용"},{value:"READONLY",text:"읽기공개"},{value:"NONE",text:"비공개"}],ownerNickName:null,groupItems:[],boardIdRules:[function(e){return!n.includes(e)||"사용할 수 없는 ID입니다."},function(e){return!e||e.length>3&&e.length<16||"4~15자로 입력해주세요."},function(e){return i[0].test(e)||"토픽ID의 길이가 너무 길거나, 알파벳이 아닌 문자가 있습니다."},function(e){return i[1].test(e)||"토픽ID에 연속된 [_, -]가 있습니다."}],boardNameRules:[function(e){return!!e||"토픽 이름을 입력해주세요."}],boardMemberItems:[],boardIdErrors:[]}},props:["board"],computed:{myGroup:function(){var e=this.$store.getters.profile;return this.groupItems.filter(function(t){return e.groups.some(function(e){return e===t.value})}).map(function(e){return e.text}).join(", ")},allGroupAuthDescription:function(){switch(this.allGroupAuth){case"READONLY":return"구독자만 글을 쓸 수 있지만,<br>구독하지 않아도 글을 볼 수 있습니다.<br>그 대신 핫토픽에 글이 노출됩니다.";case"NONE":return"구독자만 글을 읽고 쓸 수 있습니다.<br>핫토픽에는 글이 노출되지 않습니다.";case"READWRITE":return"모든 회원이 토픽을 구독할 수 있습니다.<br>구독하지 않아도 글을 볼 수 있습니다.<br>핫토픽에 글이 노출됩니다."}},reservedContents:function(){var e=this;if(!this.board||!this.board.reservedContents)return null;var t=function(){var t=e.board.reservedContents,o="",r=function(r){switch(r){case"boardName":o+="토픽 이름 : ".concat(t[r],"\n");break;case"boardDescription":o+="토픽 설명 : ".concat(t[r],"\n");break;case"allowAnonymous":o+="익명글 허용 여부 : ".concat(t[r]?"허용":"비허용","\n");break;case"useCategory":o+="카테고리 : ".concat(t[r]?"사용":"미사용","\n");break;case"allGroupAuth":o+="토픽 공개/비공개 : ".concat(e.allGroupAuthItems.some(function(e){return e.value===t[r]})?e.allGroupAuthItems.find(function(e){return e.value===t[r]}).text:"(알 수 없음)","\n");break;case"ownerNickName":o+="토픽지기 : ".concat(t[r],"\n");break;case"auth":o+="구독 권한 : ".concat(t[r].filter(function(t){return e.groupItems.some(function(e){return e.value===t.groupId})}).map(function(t){return e.groupItems.find(function(e){return e.value===t.groupId}).text+("INSERT"===t.command?" 추가":"DELETE"===t.command?" 삭제":"")}).join(", "));break;case"status":o+="DELETED"===t[r]?"토픽 삭제 예정":"";break}};for(var a in t)r(a);return{v:o}}();return"object"===s(t)?t.v:void 0}},methods:{reset:function(e){var t=this;this.board?(e||(this.loading=!0,this.$axios.get("/board/member",{params:{boardId:this.board.boardId},headers:{silent:!0}}).then(function(e){var o=t.$store.getters.profile.topicNickName;t.boardMemberItems=e.data.filter(function(e){return e.nickName!==o}).map(function(e){return e.nickName}),t.loading=!1}).catch(function(e){console.log(e.response),t.loading=!1,t.$store.dispatch("showSnackbar",{text:e.response?e.response.data.message:"토픽 구성원을 불러오지 못했습니다.",color:"error"})})),this.boardId=this.board.boardId,this.boardName=this.board.boardName,this.boardDescription=this.board.boardDescription,this.allGroupAuth=this.board.allGroupAuth,this.allowAnonymous=this.board.allowAnonymous,this.useCategory=!!this.board.categories&&this.board.categories.filter(function(e){return e}).length>0,this.allowedGroups=this.board.boardAuth.map(function(e){return e.groupId}),this.ownerNickName=this.board.ownerNickName):(this.boardId=null,this.boardName=null,this.boardDescription=null,this.allGroupAuth="READONLY",this.allowAnonymous=!0,this.useCategory=!1,this.allowedGroups=[],this.ownerNickName=null)},removeChip:function(e,t,o){e.parent.selectedItems.splice(e.parent.selectedItems.indexOf(t.value),1),o.splice(o.indexOf(t.value),1)},checkBoardId:function(e){var t=this;this.boardId&&0===this.boardIdErrors.length?this.$axios.get("/boardId",{params:{boardId:this.boardId},headers:{silent:!0}}).then(function(o){t.boardIdErrors=[],"function"===typeof e&&e.call(t)}).catch(function(o){t.boardIdErrors=[o&&o.response&&o.response.data.message],"function"===typeof e&&e.call(t)}):"function"===typeof e&&e.call(this)},save:function(){var e=this;this.board?this.$refs.form.validate()&&0===this.boardIdErrors.length?confirm("변경 내용은 1개월 뒤에 반영됩니다. 계속하시겠습니까?")&&(this.loading=!0,this.$axios.put("/board",{boardId:this.boardId,boardName:this.boardName,boardDescription:this.boardDescription||void 0,allGroupAuth:this.allGroupAuth,allowAnonymous:this.allowAnonymous,allowedGroups:this.allowedGroups.map(function(e){return{groupId:e,authType:"READWRITE"}}),useCategory:this.useCategory,ownerNickName:this.ownerNickName||void 0}).then(function(t){e.loading=!1,e.$emit("resetBoard"),e.$emit("closeDialog"),e.$store.dispatch("showSnackbar",{text:"토픽 정보를 변경 예약하였습니다.",color:"success"})}).catch(function(t){console.log(t.response),e.loading=!1,e.$store.dispatch("showSnackbar",{text:t.response?t.response.data.message:"토픽을 만들지 못했습니다.",color:"error"})})):this.$store.dispatch("showSnackbar",{text:"토픽 정보를 정확히 입력해주세요.",color:"error"}):this.checkBoardId(function(){e.$refs.form.validate()&&0===e.boardIdErrors.length?(e.loading=!0,e.$axios.post("/board",{boardId:e.boardId,boardName:e.boardName,boardType:"T",boardDescription:e.boardDescription||void 0,allGroupAuth:e.allGroupAuth,allowAnonymous:e.allowAnonymous,allowedGroups:e.allowedGroups.map(function(e){return{groupId:e,authType:"READWRITE"}}),useCategory:e.useCategory}).then(function(t){e.loading=!1,e.$store.dispatch("addBoard",{boardId:e.boardId,boardName:e.boardName,boardType:"T",boardDescription:e.boardDescription||void 0,allGroupAuth:e.allGroupAuth,allowAnonymous:e.allowAnonymous}),e.$store.dispatch("addUserBoard",{boardId:e.boardId,boardName:e.boardName,boardType:"T",boardDescription:e.boardDescription||void 0,allGroupAuth:e.allGroupAuth,allowAnonymous:e.allowAnonymous}),e.$emit("resetBoard"),e.$emit("closeDialog"),e.reset(),e.$store.dispatch("showSnackbar",{text:"새로운 토픽을 만들었습니다.",color:"success"})}).catch(function(t){console.log(t.response),e.loading=!1,e.$store.dispatch("showSnackbar",{text:t.response?t.response.data.message:"토픽을 만들지 못했습니다.",color:"error"})})):e.$store.dispatch("showSnackbar",{text:"토픽 정보를 정확히 입력해주세요.",color:"error"})})},deleteBoard:function(){var e=this;confirm("토픽 삭제는 1개월 유예기간 후에 이루어지고,\n삭제 후에는 모든 글에 접근이 불가능합니다. 계속하시겠습니까?")&&this.$axios.put("/board",{boardId:this.boardId,status:"DELETED"}).then(function(t){e.$emit("resetBoard"),e.$emit("closeDialog"),e.$store.dispatch("showSnackbar",{text:"토픽 삭제를 예약하였습니다.",color:"success"})}).catch(function(t){console.log(t.response),e.$store.dispatch("showSnackbar",{text:t.response?t.response.data.message:"토픽을 만들지 못했습니다.",color:"error"})})}},created:function(){var e=this;this.$store.getters.groups?this.groupItems=this.$store.getters.groups:this.$axios.get("/group",{headers:{silent:!0}}).then(function(t){t.data.forEach(function(e){"N"!==e.groupType&&"D"!==e.groupType&&"E"!==e.groupType||(e.groupType="Z")}),e.groupItems=t.data.sort(function(e,t){return e.groupType<t.groupType?-1:e.groupType===t.groupType?0:1});var o=null,r=0;while(r<e.groupItems.length)o!==e.groupItems[r].groupType&&(o?(o=e.groupItems[r].groupType,e.groupItems.splice(r,0,{divider:!0}),r++):o=e.groupItems[r].groupType,e.groupItems.splice(r,0,{header:l[o]}),r++),r++;e.groupItems=e.groupItems.map(function(e){return e.groupName?{text:e.groupName,value:e.groupId}:e}),e.$store.dispatch("setGroups",e.groupItems)}).catch(function(t){e.$store.dispatch("showSnackbar",{text:"그룹 목록을 가져오지 못했습니다.".concat(t&&t.response&&t.response.data?"["+t.response.data.message+"]":"")})}),this.reset()},watch:{boardId:function(){this.boardIdErrors.length>0&&(this.boardIdErrors=[])},board:{handler:function(){this.reset()},deep:!0}}},c=u,d=(o("7862"),o("0c7c")),p=Object(d["a"])(c,r,a,!1,null,null,null);t["default"]=p.exports},fd44:function(e,t,o){}}]);
//# sourceMappingURL=chunk-452d4511.63be0690.js.map