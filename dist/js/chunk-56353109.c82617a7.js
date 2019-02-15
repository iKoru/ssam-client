(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-56353109"],{2671:function(t,e,r){"use strict";r.r(e);var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-container",[r("v-layout",{attrs:{row:"","justify-center":"","align-center":"",wrap:""}},[r("v-card",{attrs:{width:"100%",flat:""}},[r("v-card-title",{staticClass:"px-0",attrs:{"primary-title":""}},[r("v-flex",{staticClass:"mx-auto px-3 pb-2",attrs:{xs12:"",sm11:"",md10:"",lg9:""}},[r("div",{class:{"text-xs-center":!0,"justify-center":!0,"align-center":!0,"pa-3":t.$vuetify.breakpoint.smAndUp}},[r("v-container",{attrs:{fluid:"","grid-list-xs":""}},[r("v-layout",{attrs:{row:""}},[r("div",[r("v-autocomplete",{ref:"searchBoard",staticClass:"dense ellipsis",attrs:{id:"searchBoard",placeholder:"검색할 게시판",items:t.boardItems},model:{value:t.boardId,callback:function(e){t.boardId=e},expression:"boardId"}})],1),r("v-flex",{attrs:{"pl-3":""}},[r("v-text-field",{ref:"searchQuery",staticClass:"dense",attrs:{placeholder:"제목, 내용으로 검색","append-outer-icon":"search"},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:(e.stopPropagation(),t.search(e))},"click:append-outer":t.search},model:{value:t.searchQuery,callback:function(e){t.searchQuery=e},expression:"searchQuery"}})],1)],1)],1)],1)]),r("v-flex",{staticClass:"mx-auto",attrs:{xs12:"",sm11:"",md10:"",lg9:""}},[r("v-data-table",{staticClass:"last-tr-border",attrs:{headers:t.headers,xs12:"",items:t.documents,"rows-per-page-items":[10],loading:t.loading,"total-items":t.totalDocuments,pagination:t.pagination,"hide-actions":""},on:{"update:pagination":function(e){t.pagination=e}},scopedSlots:t._u([{key:"headers",fn:function(e){return[r("tr",t._l(e.headers,function(e){return r("th",{key:e.value,class:{"px-1":!0,"text-xs-center":"center"===e.align,"text-xs-left":"left"===e.align,"text-xs-right":"right"===e.align,"font-weight-bold":!0,"black--text":!0},attrs:{width:e.width||!1}},[t._v(t._s(e.text))])}),0)]}},{key:"items",fn:function(e){return[r("tr",{on:{click:function(r){return t.$router.push("/"+e.item.boardId+"/"+e.item.documentId)}}},[r("td",{staticClass:"pa-1 grey--text lighten-1"},[r("v-layout",{attrs:{row:"","justify-center":""}},[t._v("\n                    ["+t._s(t.boards.some(function(t){return t.boardId===e.item.boardId})?t.$vuetify.breakpoint.smAndUp?t.boards.find(function(t){return t.boardId===e.item.boardId}).boardName:t.boards.find(function(t){return t.boardId===e.item.boardId}).boardName.replace(/\s/g,"").substring(0,2):"")+"]\n                  ")])],1),r("td",{staticClass:"text-xs-left pa-1 multi-row cursor-pointer",on:{click:function(r){return r.stopPropagation(),t.$router.push("/"+e.item.boardId+"/"+e.item.documentId)}}},[t._v("\n                  "+t._s(e.item.title)+"\n                  "),r("span",{staticClass:"primary--text",attrs:{title:"댓글 수"}},[t._v(t._s(e.item.commentCount>0?"["+e.item.commentCount+"]":""))])]),r("td",{staticClass:"text-xs-right pa-1"},[t._v(t._s(e.item.voteUpCount))]),r("td",{staticClass:"text-xs-right pa-1"},[t._v(t._s(t.$moment(e.item.writeDateTime,"YYYYMMDDHHmmss").isSame(t.$moment(),"day")?t.$moment(e.item.writeDateTime,"YYYYMMDDHHmmss").format("HH:mm"):t.$moment(e.item.writeDateTime,"YYYYMMDDHHmmss").format("M/D")))])])]}}])},[r("template",{slot:"footer"},[t.searched?r("td",{staticClass:"multi-row",attrs:{colspan:t.headers.length}},[t._v("\n                "+t._s(this.noresult)+"\n                "),t.targetYear>2018?r("v-btn",{attrs:{color:"primary",small:""},on:{click:t.searchMore}},[t._v("계속 검색")]):t._e()],1):t._e()])],2)],1),t.currentSearchQuery?r("v-flex",{attrs:{"text-xs-center":"","mt-2":"",xs12:""}},[r("v-pagination",{attrs:{length:t.pages,"total-visible":t.$vuetify.breakpoint.smAndUp?10:void 0},model:{value:t.pagination.page,callback:function(e){t.$set(t.pagination,"page",e)},expression:"pagination.page"}})],1):t._e()],1)],1)],1)],1)},s=[],n={name:"SearchDocument",data:function(){return{loading:!1,boardTypeItems:{T:"토픽",L:"라운지",D:"아카이브",E:"기타"},boardId:null,targetYear:(new Date).getFullYear(),searchQuery:null,groupItems:[],documents:[],totalDocuments:0,searched:!1,pagination:{},currentSearchQuery:null}},mounted:function(){var t=this;this.$route.query.boardId&&this.boardItems.some(function(e){return e.value===t.$route.query.boardId})&&(this.boardId=this.$route.query.boardId,this.$route.query.searchQuery&&""!==this.$route.query.searchQuery.trim()&&(this.searchQuery=this.$route.query.searchQuery.trim(),this.search()))},computed:{boards:function(){return this.$store.getters.boards},boardItems:function(){var t=this.$store.getters.profile.auth,e=this.$store.getters.userBoards,r=this.boards.filter(function(r){return"T"!==r.boardType&&r.statusAuth.read.includes(t)||"T"===r.boardType&&e.some(function(t){return t.boardId===r.boardId&&"T"===t.boardType})}).map(function(t){return{text:t.boardName,value:t.boardId}});return r.splice(0,0,{text:"(공개 게시판 전체)",value:null}),r},noresult:function(){return this.targetYear+"년을 대상으로 검색한 결과입니다."+(this.targetYear>2018?" 이전 연도로 계속 검색할 수 있습니다.":"")},headers:function(){return[{text:"게시판",align:"center",sortable:!1,value:"boardId",width:this.$vuetify.breakpoint.smAndUp?"100":"50"},{text:"제목",sortable:!1,align:"center",value:"title",class:"ellipsis",width:"100%"},{text:"추천",align:"right",sortable:!1,value:"voteUpCount",width:"30"},{text:"날짜",sortable:!1,align:"right",value:"writeDateTime",width:this.$vuetify.breakpoint.xsOnly?"50":"100"}]},pages:function(){return this.pagination.rowsPerPage?Math.ceil(this.totalDocuments/this.pagination.rowsPerPage):1}},methods:{search:function(){this.searchQuery&&""!==this.searchQuery.trim()?(this.targetYear=(new Date).getFullYear(),this.currentSearchQuery=this.searchQuery.trim(),this.getDocuments(this.targetYear),this.searched=!0):this.$store.dispatch("showSnackbar",{text:"검색할 단어를 입력해주세요.",color:"error"})},searchMore:function(){this.currentSearchQuery?this.getDocuments(--this.targetYear):this.$store.dispatch("showSnackbar",{text:"검색할 단어를 입력해주세요.",color:"error"})},getDocuments:function(t){var e=this;this.loading=!0,this.$axios.get("/document",{params:{targetYear:t,boardId:this.boardId,searchQuery:this.currentSearchQuery,searchTarget:"titleContents",page:this.pagination.page},headers:{silent:!0}}).then(function(t){e.documents=Array.isArray(t.data)?t.data:[],e.totalDocuments=e.documents[0]?e.documents[0].totalCount:0,e.loading=!1}).catch(function(t){e.loading=!1,console.log(t),e.$store.dispatch("showSnackbar",{text:t.response&&t.response.data.message||"글을 검색하지 못했습니다.",color:"error"})})}},watch:{pagination:{handler:function(){this.currentSearchQuery&&""!==this.currentSearchQuery&&this.getDocuments(this.targetYear)},deep:!0}}},i=n,o=(r("ea8f"),r("0c7c")),u=Object(o["a"])(i,a,s,!1,null,null,null);e["default"]=u.exports},ea8f:function(t,e,r){"use strict";var a=r("f945"),s=r.n(a);s.a},f945:function(t,e,r){}}]);