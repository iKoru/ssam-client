(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-11693ce8"],{3497:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-flex",[a("v-layout",{attrs:{column:""}},[a("v-flex",[t.isCardView?[a("v-divider"),a("v-list",{staticClass:"py-0 border-x-light",attrs:{dense:""}},[t._l(t.documents.filter(function(t){return t.isNotice}),function(e){return[a("v-list-tile",{key:e.documentId,staticClass:"grey lighten-3",attrs:{to:"/"+t.board.boardId+"/"+e.documentId}},[a("v-list-tile-content",[a("v-list-tile-title",[a("div",{staticClass:"ellipsis text-xs-left body-1 font-weight-bold"},[a("router-link",{attrs:{to:"/"+t.board.boardId+"/"+e.documentId},nativeOn:{click:function(t){t.stopPropagation()}}},[t._v("[공지] "+t._s(e.title))])],1)])],1)],1),a("v-divider",{key:"divider"+e.documentId})]}),0===t.documents.length?[a("v-list-tile",{staticClass:"grey lighten-3"},[a("v-list-tile-content",[a("v-list-tile-title",{attrs:{"text-xs-center":""}},[t._v("아직 작성된 글이 없습니다. 첫 글을 작성해보세요!")])],1)],1),a("v-divider")]:t._e()],2),a("v-list",{staticClass:"py-0 border-x-light",attrs:{"two-line":"",id:"cardView"}},[t._l(t.documents.filter(function(t){return!t.isNotice}),function(e){return[a("v-list-tile",{key:e.documentId,staticClass:"grey lighten-5",attrs:{to:"/"+t.board.boardId+"/"+e.documentId}},[a("v-list-tile-content",[a("v-list-tile-title",[a("v-layout",{attrs:{row:""}},[t.hasChildren?a("small",{staticClass:"grey--text lighten-1 mr-1"},[t._v("\n                      ["),a("router-link",{staticClass:"grey--text lighten-1",attrs:{to:"/"+e.boardId},nativeOn:{click:function(t){t.stopPropagation()}}},[t._v(t._s(t.boardItems.some(function(t){return t.boardId===e.boardId})?t.$vuetify.breakpoint.smAndUp?t.boardItems.find(function(t){return t.boardId===e.boardId}).boardName.replace(/\s/g,"").substring(0,5):t.boardItems.find(function(t){return t.boardId===e.boardId}).boardName.replace(t.boardTypeItems[t.board.boardType],"").replace(/\s/g,"").substring(0,2):""))]),t._v("]\n                    ")],1):t.board.categories.some(function(t){return t})&&e.category?a("small",{staticClass:"grey--text lighten-1 mr-1"},[t._v("["+t._s(e.category)+"]")]):t._e(),a("div",{staticClass:"ellipsis font-weight-bold body-2"},[t._v(t._s(e.title))]),a("v-spacer"),a("div",{staticClass:"caption"},[""!==e.nickName&&t.$vuetify.breakpoint.smAndUp?a("span",[t._v(t._s(e.nickName)+" | ")]):t._e(),a("v-icon",{attrs:{color:"primary",small:""}},[t._v("thumb_up_alt")]),a("span",{staticClass:"primary--text"},[t._v(t._s(e.voteUpCount))]),t._v(" |\n                      "),a("v-icon",{attrs:{color:"accent",small:""}},[t._v("chat_bubble_outline")]),a("span",{staticClass:"accent--text"},[t._v(t._s(e.commentCount))]),t._v(" |\n                      "),a("span",{staticClass:"grey--text lighten-1"},[t._v(t._s(t.$moment(e.writeDateTime,"YYYYMMDDHHmmss").isSame(t.$moment(),"day")?t.$moment(e.writeDateTime,"YYYYMMDDHHmmss").format("HH:mm"):t.$moment(e.writeDateTime,"YYYYMMDDHHmmss").format(t.$vuetify.breakpoint.xsOnly?"M/D":"Y/M/D")))])],1)],1)],1),a("v-list-tile-sub-title",[t._v(t._s(e.previewContents&&""!==e.previewContents.trim()?e.previewContents:"(텍스트가 없는 글입니다.)"))])],1)],1),a("v-divider",{key:"divider"+e.documentId})]})],2)]:a("v-data-table",{staticClass:"last-tr-border",attrs:{headers:t.headers,xs12:"",items:t.documents,id:"documentTable","hide-actions":"","rows-per-page-items":[t.$vuetify.breakpoint.xsOnly?10:20],loading:t.loading,"total-items":t.totalDocuments,pagination:t.pagination,"no-data-text":t.noDataText},on:{"update:pagination":function(e){t.pagination=e}},scopedSlots:t._u([{key:"headers",fn:function(e){return[a("tr",t._l(e.headers,function(e){return a("th",{key:e.value,class:{"px-1 font-weight-bold black--text body-2":!0,"text-xs-center":"center"===e.align,"text-xs-left":"left"===e.align,"text-xs-right":"right"===e.align},attrs:{width:e.width||!1}},["category"===e.value?a("v-select",{class:{"mt-0 pt-0":!0,"primary--text":""!==t.category},attrs:{items:t.categoryItems,dense:"",solo:"",flat:"","hide-details":"","append-icon":null},model:{value:t.category,callback:function(e){t.category=e},expression:"category"}}):a("span",[t._v("\n                "+t._s(e.text)+"\n              ")])],1)}),0)]}},{key:"items",fn:function(e){return[e.item.isNotice?a("tr",{staticClass:"grey lighten-3"},[a("td",{staticClass:"font-weight-bold px-2 cursor-pointer py-1",attrs:{colspan:t.headers.length},on:{click:function(a){return a.stopPropagation(),t.$router.push("/"+t.board.boardId+"/"+e.item.documentId)}}},[a("v-layout",{attrs:{row:""}},[a("div",{staticClass:"ellipsis text-xs-left"},[a("router-link",{attrs:{to:"/"+t.board.boardId+"/"+e.item.documentId},nativeOn:{click:function(t){t.stopPropagation()}}},[t._v("[공지] "+t._s(e.item.title))])],1)])],1)]):a("tr",[t.hasChildren?a("td",{staticClass:"pa-1 grey--text lighten-1"},[a("v-layout",{attrs:{row:"","justify-center":""}},[t._v("\n                ["),a("router-link",{staticClass:"grey--text lighten-1",attrs:{to:"/"+e.item.boardId}},[t._v(t._s(t.boardItems.some(function(t){return t.boardId===e.item.boardId})?t.$vuetify.breakpoint.smAndUp?t.boardItems.find(function(t){return t.boardId===e.item.boardId}).boardName.replace(/\s/g,"").substring(0,5):t.boardItems.find(function(t){return t.boardId===e.item.boardId}).boardName.replace(t.boardTypeItems[t.board.boardType],"").replace(/\s/g,"").substring(0,2):""))]),t._v("]\n              ")],1)],1):t._e(),!t.hasChildren&&t.board.categories.some(function(t){return t})?a("td",{staticClass:"text-xs-center pa-1 grey--text lighten-1"},[t._v(t._s(e.item.category?"["+e.item.category+"]":""))]):t._e(),a("td",{class:{"text-xs-left py-1 ellipsis cursor-pointer":!0,"px-2":!t.hasChildren,"px-0":t.hasChildren,"font-weight-bold":t.$route.params.documentId===e.item.documentId},on:{click:function(a){return a.stopPropagation(),t.$router.push("/"+t.board.boardId+"/"+e.item.documentId)}}},[a("v-layout",{attrs:{row:""}},[a("div",{staticClass:"ellipsis text-xs-left"},[a("router-link",{attrs:{to:"/"+t.board.boardId+"/"+e.item.documentId},nativeOn:{click:function(t){t.stopPropagation()}}},[t._v(t._s(e.item.title))])],1),a("span",{staticClass:"accent--text",attrs:{title:"댓글 수"}},[t._v(t._s(e.item.commentCount>0?"["+e.item.commentCount+"]":""))])])],1),t.$vuetify.breakpoint.smAndUp?a("td",{staticClass:"text-xs-center pa-1 ellipsis"},[t._v(t._s(e.item.nickName))]):t._e(),a("td",{staticClass:"text-xs-right pa-1"},[t._v(t._s(e.item.voteUpCount))]),a("td",{staticClass:"text-xs-right pa-1 grey--text lighten-1"},[t._v(t._s(t.$moment(e.item.writeDateTime,"YYYYMMDDHHmmss").isSame(t.$moment(),"day")?t.$moment(e.item.writeDateTime,"YYYYMMDDHHmmss").format("HH:mm"):t.$moment(e.item.writeDateTime,"YYYYMMDDHHmmss").format(t.$vuetify.breakpoint.xsOnly?"M/D":"Y/M/D")))])])]}}])},[a("template",{slot:"no-data"},[a("tr",[a("td",{staticClass:"text-xs-center multi-row px-0",attrs:{colspan:t.$vuetify.breakpoint.smAndUp?4+(t.hasChildren?1:0):3+(t.hasChildren?1:0)}},[t._v(t._s(t.noDataText))])])])],2)],2),a("v-flex",[a("v-layout",{attrs:{row:"","pa-2":"","align-center":""}},[a("v-btn",{staticClass:"ma-0",attrs:{flat:"",small:"",icon:"",title:t.isCardView?"목록형 보기":"카드형 보기"},on:{click:t.switchView}},[a("v-icon",[t._v(t._s(t.isCardView?"list":"dashboard"))])],1),a("v-btn",{class:{"grey--text ma-0":!0,short:t.$vuetify.breakpoint.smAndUp,"ml-1":t.$vuetify.breakpoint.xsOnly},attrs:{flat:"",small:"",icon:t.$vuetify.breakpoint.xsOnly,color:"secondary",loading:t.loading},on:{click:t.getDocuments}},[t.$vuetify.breakpoint.xsOnly?a("v-icon",[t._v("refresh")]):a("span",[t._v("새로고침")])],1),a("v-spacer"),a("v-flex",{attrs:{xs6:"",sm4:"",id:"searchDocumentForm"}},[a("v-text-field",{staticClass:"dense mt-0 pt-0",attrs:{"hide-details":"",dense:"","append-outer-icon":"search",placeholder:"제목, 내용으로 검색"},on:{keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:(e.stopPropagation(),t.search(e))},"click:append-outer":t.search},model:{value:t.searchQuery,callback:function(e){t.searchQuery=e},expression:"searchQuery"}})],1),a("v-btn",{directives:[{name:"show",rawName:"v-show",value:("notice"!==t.$route.params.boardId||t.board&&t.board.isOwner)&&("loungeBest"!==t.$route.params.boardId&&"topicBest"!==t.$route.params.boardId||t.documentBoardId&&t.$route.params.documentId),expression:"($route.params.boardId !== 'notice' || (board && board.isOwner)) && (($route.params.boardId !== 'loungeBest' && $route.params.boardId !== 'topicBest') || (documentBoardId && $route.params.documentId))"}],staticClass:"short my-0",attrs:{depressed:"",small:"",color:"primary"},on:{click:function(e){return t.$emit("write")}}},[t._v("쓰기")])],1)],1),a("v-flex",{attrs:{"text-xs-center":"","mt-2":"",xs12:""}},[a("v-pagination",{attrs:{length:t.pages,"total-visible":t.$vuetify.breakpoint.smAndUp?10:void 0},model:{value:t.page,callback:function(e){t.page=e},expression:"page"}})],1)],1)],1)},i=[],r=a("5347"),o={name:"DocumentList",mixins:[r["a"]],props:["board","hasChildren","documentBoardId"],data:function(){return{documents:[],totalDocuments:0,loading:!1,pagination:{},page:null,boardId:null,noDataText:"아직 작성된 글이 없습니다. 첫 글을 작성해보세요!",searchQuery:null,isCardView:!!localStorage.getItem("CardView"),category:""}},computed:{headers:function(){var t=[{text:"제목",value:"title",sortable:!1,align:"center"},{text:"추천",value:"voteUpCount",sortable:!1,align:"right",width:this.$vuetify.breakpoint.xsOnly?"30":"50"},{text:"날짜",value:"writeDateTime",sortable:!1,align:"right",width:this.$vuetify.breakpoint.xsOnly?"50":"100"}];return this.$vuetify.breakpoint.smAndUp&&t.splice(1,0,{text:"글쓴이",value:"nickName",sortable:!1,align:"center",width:"100"}),!this.hasChildren&&this.board.categories.some(function(t){return t})&&t.splice(0,0,{text:"분류",value:"category",sortable:!1,align:"center",width:"50"}),this.hasChildren&&t.splice(0,0,{text:this.boardTypeItems[this.board.boardType],value:"boardId",sortable:!1,align:"center",width:this.$vuetify.breakpoint.smAndUp?"100":"50"}),t},boardItems:function(){return this.$store.getters.boards},pages:function(){return this.pagination.rowsPerPage&&this.totalDocuments>0?Math.ceil(this.totalDocuments/this.pagination.rowsPerPage):1},categoryItems:function(){if(Array.isArray(this.board.categories)&&this.board.categories.length>0){var t=this.board.categories.map(function(t){return{text:t,value:t}});return t.splice(0,0,{text:"분류",value:""}),t}return[]}},methods:{getDocuments:function(){var t=this;this.loading=!0,this.$axios.get("/".concat(this.boardId),{params:{page:this.pagination.page,rowsPerPage:this.$vuetify.breakpoint.xsOnly?10:20,category:""===this.category?void 0:this.category},headers:{silent:!0}}).then(function(e){if(t.documents=e.data,t.totalDocuments=e.data.length>0?e.data[0].totalCount:0,t.board.notices.length>0){var a=0;while(a<t.board.notices.length)t.documents.splice(a,0,t.board.notices[a]),a++}t.noDataText="아직 작성된 글이 없습니다. 첫 글을 작성해보세요!",t.loading=!1}).catch(function(e){t.loading=!1,console.log(e),t.noDataText=e.response?e.response.data.message:"글 목록을 가져오지 못했습니다.",t.$store.dispatch("showSnackbar",{text:"".concat(e.response?e.response.data.message:"글 목록을 가져오지 못했습니다."),color:"error"})})},search:function(){this.searchQuery&&this.$router.push("/searchDocument?boardId=".concat(this.board.boardId,"&searchQuery=").concat(this.searchQuery))},switchView:function(){this.isCardView=!this.isCardView,this.isCardView?(this.category="",localStorage.setItem("CardView",this.isCardView)):localStorage.removeItem("CardView")}},created:function(){this.page=1*this.$route.query.page>0&&Number.isInteger(1*this.$route.query.page)?1*this.$route.query.page:1},watch:{"$route.params":{handler:function(t){var e=this;if(this.boardId!==t.boardId){this.documents=[],this.totalDocuments=0;var a=1*this.$route.query.page>0&&Number.isInteger(1*this.$route.query.page)?1*this.$route.query.page:1;this.boardId=t.boardId,this.$nextTick(function(){e.pagination.page=a,e.page=a,e.getDocuments()})}},deep:!0,immediate:!0},page:function(t){this.pagination.page!==t&&(this.pagination.page=t,this.getDocuments())},category:function(t){this.getDocuments()}}},n=o,d=(a("aea3"),a("0c7c")),l=Object(d["a"])(n,s,i,!1,null,null,null);e["default"]=l.exports},"8f80":function(t,e,a){},aea3:function(t,e,a){"use strict";var s=a("8f80"),i=a.n(s);i.a}}]);