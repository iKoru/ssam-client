(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7a9edb6b"],{"0962":function(r,a,t){"use strict";var s=t("aeb7"),o=t.n(s);o.a},aeb7:function(r,a,t){},d2b4:function(r,a,t){"use strict";t.r(a);var s=function(){var r=this,a=r.$createElement,t=r._self._c||a;return t("v-card",[t("v-card-title",{staticClass:"headline",attrs:{"primary-title":""}},[t("span",[r._v("상세정보")]),t("v-spacer"),t("v-icon",{on:{click:r.closeDialog}},[r._v("close")])],1),t("v-card-text",[t("v-layout",{attrs:{row:"",wrap:""}},[t("v-flex",{attrs:{xs4:"",md2:""}},[t("v-subheader",[r._v("구분")])],1),t("v-flex",{attrs:{xs8:"",md4:""}},[t("div",{staticClass:"v-subheader"},[r._v(r._s(r.boardTypeItems[r.board.boardType]))])]),t("v-flex",{attrs:{xs4:"",md2:""}},[t("v-subheader",[r._v("이름")])],1),t("v-flex",{attrs:{xs8:"",md4:""}},[t("div",{staticClass:"v-subheader"},[r._v("\n          "+r._s(r.board.boardName)+"(\n          "),t("router-link",{staticClass:"primary--text",attrs:{to:"/"+r.board.boardId},nativeOn:{click:function(a){return r.closeDialog(a)}}},[r._v("/"+r._s(r.board.boardId))]),r._v(")\n        ")],1)]),"T"===r.board.boardType?[t("v-flex",{attrs:{xs4:"",md2:""}},[t("v-subheader",[r._v("토픽지기")])],1),t("v-flex",{attrs:{xs8:"",md4:""}},[t("div",{staticClass:"v-subheader"},[r._v(r._s(r.board.owner))])]),r.$vuetify.breakpoint.mdAndUp?t("v-flex",{attrs:{md6:""}}):r._e()]:r._e(),t("v-flex",{attrs:{xs4:"",md2:""}},[t("v-subheader",[r._v("설명")])],1),t("v-flex",{attrs:{xs8:"",md10:""}},[t("div",{staticClass:"v-subheader"},[r._v(r._s(r.board.boardDescription||"(등록된 설명이 없습니다.)"))])]),t("v-flex",{attrs:{xs4:"",md2:""}},[t("v-subheader",[r._v("공개여부")])],1),t("v-flex",{attrs:{xs8:"",md4:""}},[t("div",{staticClass:"v-subheader"},[r._v(r._s("NONE"===r.board.allGroupAuth?"비공개":"공개"))])]),t("v-flex",{attrs:{xs4:"",md2:""}},[t("v-subheader",[r._v("익명 게시물")])],1),t("v-flex",{attrs:{xs8:"",md4:""}},[t("div",{staticClass:"v-subheader"},[r._v(r._s(r.board.allowAnonymous?"허용":"비허용"))])]),"READWRITE"!==r.board.allGroupAuth?[t("v-flex",{attrs:{xs4:"",md2:""}},[t("v-subheader",{staticClass:"pr-0"},[t("span",["T"===r.board.boardType?t("span",[r._v("구독/")]):r._e(),r._v("글쓰기 조건\n            ")])])],1),t("v-flex",{attrs:{xs8:"",md10:""}},[t("div",{staticClass:"v-subheader"},[r._v(r._s("READWRITE"===r.board.allGroupAuth?"모든 인증된 회원들이 구독할 수 있습니다.":r.board.boardAuth.map(function(r){return r.groupName}).join(", ")))])])]:r._e()],2),"T"===r.board.boardType?t("p",{staticClass:"justify-center align-center text-xs-center mt-3 font-weight-bold"},[r.userBoards.some(function(a){return a.boardId===r.board.boardId})?[r._v("내가 구독중인 토픽입니다.")]:"READWRITE"===r.board.allGroupAuth||r.board.boardAuth.some(function(a){return r.userGroups.some(function(r){return r===a.groupId})})?[r._v("이 토픽을 구독할 수 있습니다.")]:"READONLY"===r.board.allGroupAuth?[r._v("이 토픽을 구독할 수 없지만 글을 읽을 수 있습니다.")]:[r._v("내가 구독할 수 없는 조건의 토픽입니다.")]],2):r._e()],1),t("v-card-actions",["T"===r.board.boardType&&r.userBoards.some(function(a){return a.boardId===r.board.boardId})?t("v-btn",{attrs:{flat:""},on:{click:r.leave}},[r._v("구독취소")]):r._e(),t("v-spacer"),"T"!==r.board.boardType||r.userBoards.some(function(a){return a.boardId===r.board.boardId})||"READWRITE"!==r.board.allGroupAuth&&!r.board.boardAuth.some(function(a){return r.userGroups.some(function(r){return r===a.groupId})})?[t("v-btn",{attrs:{color:"primary"},on:{click:r.closeDialog}},[r._v("닫기")])]:[t("v-btn",{attrs:{flat:""},on:{click:function(a){r.dialog=!1}}},[r._v("취소")]),t("v-btn",{attrs:{color:"primary",loading:r.loading},on:{click:r.join}},[r._v("구독")])]],2)],1)},o=[],e={name:"boardInformation",props:["board"],data:function(){return{boardTypeItems:{T:"토픽",L:"라운지",D:"아카이브",X:"기타",E:"전직교사",N:"예비교사"},loading:!1}},computed:{boards:function(){var r=this.$store.getters.boards;return r.filter(function(a){return a.parentBoardId||!r.some(function(r){return r.parentBoardId===a.boardId})})},userBoards:function(){return this.$store.getters.userBoards},userGroups:function(){return this.$store.getters.profile.groups}},methods:{join:function(){var r=this;this.loading=!0,this.$axios.post("/user/board",{boardId:this.board.boardId},{headers:{silent:!0}}).then(function(a){r.$store.dispatch("addUserBoard",Object.assign({},r.board)),r.loading=!1,r.closeDialog(),r.$store.dispatch("showSnackbar",{text:"토픽을 구독하였습니다.",color:"success"})}).catch(function(a){console.log(a),r.loading=!1,r.$store.dispatch("showSnackbar",{text:"토픽을 구독하지 못했습니다.".concat(a&&a.response&&a.response.data?"["+a.response.data.message+"]":""),color:"error"})})},leave:function(){var r=this;this.$axios.delete("/user/board/"+this.board.boardId).then(function(a){r.$store.dispatch("removeUserBoard",r.board.boardId),r.closeDialog(),r.$store.dispatch("showSnackbar",{text:"토픽을 구독 해제하였습니다.",color:"success"})}).catch(function(a){console.log(a.response),r.$store.dispatch("showSnackbar",{text:a.response&&a.response.data.message||"토픽을 구독 해제하지 못했습니다.",color:"error"})})},closeDialog:function(){this.$emit("closeDialog",null)}}},d=e,n=(t("0962"),t("0c7c")),i=Object(n["a"])(d,s,o,!1,null,null,null);a["default"]=i.exports}}]);
//# sourceMappingURL=chunk-7a9edb6b-legacy.b2886deb.js.map