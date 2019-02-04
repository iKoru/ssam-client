(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-22928f1c"],{"972f":function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-card",{attrs:{flat:""}},[e("v-card-title",[e("v-layout",{attrs:{row:""}},[e("v-flex",{staticClass:"mx-auto",attrs:{xs12:"",sm10:"",lg8:""}},[e("v-layout",{attrs:{row:"","align-center":""}},[e("h3",{staticClass:"headline"},[t._v("내 스크랩 목록")]),t.$vuetify.breakpoint.smAndUp?e("v-spacer"):t._e(),e("v-select",{staticClass:"selectScrapGroup",attrs:{items:t.scrapGroups,label:"그룹 선택","hide-details":"",dense:"","item-text":"scrapGroupName","item-value":"scrapGroupId","append-outer-icon":"settings",id:"selectScrapGroup"},on:{"click:append-outer":t.openDialog},model:{value:t.scrapGroupId,callback:function(a){t.scrapGroupId=a},expression:"scrapGroupId"}}),e("v-dialog",{attrs:{fullscreen:t.$vuetify.breakpoint.xsOnly,transition:t.$vuetify.breakpoint.xsOnly?"dialog-bottom-transition":"fade-transition",lazy:"",scrollable:"","max-width":"700px"},model:{value:t.dialog,callback:function(a){t.dialog=a},expression:"dialog"}},[e("scrap-group-manager",{attrs:{scrapGroups:t.scrapGroups,dialog:t.dialog},on:{closeDialog:t.closeDialog,updateScrapGroup:t.resetScrapGroups}})],1)],1)],1)],1)],1),e("v-layout",[e("v-flex",{staticClass:"mx-auto",attrs:{xs12:"",sm10:"",lg8:""}},[e("v-data-table",{class:{customAction:!0,noResult:0===t.totalUserScraps},attrs:{headers:t.headers,xs12:"",items:t.userScraps,id:"userScrapTable","rows-per-page-items":[10],loading:t.loading,"total-items":t.totalUserScraps,pagination:t.pagination},on:{"update:pagination":function(a){t.pagination=a}},scopedSlots:t._u([{key:"items",fn:function(a){return[e("tr",{on:{click:function(e){t.selected=t.selected===a.index?null:a.index}}},[e("td",[e("v-checkbox",{attrs:{"input-value":t.selected===a.index,primary:"","hide-details":""}})],1),t.$vuetify.breakpoint.smAndUp?e("td",{staticClass:"text-xs-left"},[t._v(t._s(t.boardItems.some(function(t){return t.boardId===a.item.boardId})?t.boardItems.find(function(t){return t.boardId===a.item.boardId}).boardName:"(삭제된 게시판)"))]):t._e(),e("td",{staticClass:"text-xs-left multi-row cursor-pointer",on:{click:function(e){e.stopPropagation(),t.openLink("/"+a.item.boardId+"/"+a.item.documentId)}}},[e("a",{attrs:{href:"/"+a.item.boardId+"/"+a.item.documentId,target:"_blank"}},[t._v("\n                "+t._s(a.item.title)+"\n                "),e("span",{staticClass:"primary--text",attrs:{title:"댓글 수"}},[t._v(t._s(a.item.commentCount>0?"["+a.item.commentCount+"]":""))])])]),e("td",{staticClass:"text-xs-right"},[t._v(t._s(a.item.voteUpCount))]),e("td",{staticClass:"text-xs-right"},[t._v(t._s(t.$moment(a.item.writeDateTime,"YYYYMMDDHHmmss").format("Y-MM-DD")))])])]}}])},[e("template",{slot:"no-data"},[t._v("\n          "+t._s(this.noresult)+"\n          "),e("v-btn",{attrs:{color:"primary"},on:{click:t.getMyScraps}},[t._v("새로고침")])],1),e("template",{slot:"actions-prepend"},[e("v-btn",{class:{short:t.$vuetify.breakpoint.xsOnly},attrs:{color:"error",disabled:null===t.selected,small:t.$vuetify.breakpoint.xsOnly},on:{click:t.deleteRow}},[t._v("삭제")]),e("v-spacer")],1)],2)],1)],1)],1)},r=[],o={name:"MyScrap",components:{ScrapGroupManager:function(){return e.e("chunk-d40c80fc").then(e.bind(null,"0a13"))}},data:function(){return{dialog:!1,selected:null,userScraps:[],scrapGroupId:null,scrapGroups:[],loading:!1,totalUserScraps:0,pagination:{}}},computed:{boardItems:function(){return this.$store.getters.boards},noresult:function(){return this.loading?"스크랩한 글을 불러오고 있습니다. 잠시만 기다려주세요...":"아직 스크랩한 글이 없으시군요!"},headers:function(){return this.$vuetify.breakpoint.xsOnly?[{text:"",sortable:!1,value:""},{text:"제목",sortable:!1,align:"left",value:"title",class:"ellipsis",width:"100%"},{text:"추천",align:"right",sortable:!1,value:"voteUpCount"},{text:"작성일",sortable:!1,align:"right",value:"writeDateTime"}]:[{text:"",sortable:!1,value:""},{text:"게시판",align:"left",sortable:!1,value:"boardId"},{text:"제목",sortable:!1,align:"left",value:"title",class:"ellipsis",width:"100%"},{text:"추천",align:"right",sortable:!1,value:"voteUpCount"},{text:"작성일",sortable:!1,align:"right",value:"writeDateTime"}]}},methods:{getMyScraps:function(){var t=this;this.loading=!0,this.$axios.get("/scrap",{params:{scrapGroupId:this.scrapGroupId,page:this.pagination.page}}).then(function(a){t.userScraps=a.data,t.totalUserScraps=a.data.length>0?a.data[0].totalCount:0,t.loading=!1}).catch(function(a){t.loading=!1,t.$router.app.$emit("showSnackbar","스크랩 목록을 불러오지 못했습니다.[".concat(a.response.data?a.response.data.message:"","]"),"error")})},openLink:function(t){var a=this.$router.resolve({path:t});window.open(a.href,"_blank")},deleteRow:function(){var t=this;null!==this.selected?this.$axios.delete("/scrap/".concat(this.scrapGroupId,"/").concat(this.userScraps[this.selected].documentId)).then(function(a){t.getMyScraps(),t.selected=null,t.$store.dispatch("showSnackbar",{text:"스크랩을 삭제하였습니다.",color:"success"})}).catch(function(a){t.$store.dispatch("showSnackbar",{text:a.response&&a.response.data.message||"스크랩을 삭제하지 못했습니다.",color:"error"})}):this.$store.dispatch("showSnackbar",{text:"삭제할 스크랩을 선택해주세요.",color:"error"})},resetScrapGroups:function(){this.$store.dispatch("setScrapGroups",null),this.getScrapGroups()},getScrapGroups:function(){var t=this;this.$store.getters.scrapGroups?(this.scrapGroups=this.$store.getters.scrapGroups,this.scrapGroupId===this.scrapGroups[0].scrapGroupId&&1===this.pagination.page||(this.pagination.page=1,this.scrapGroupId=this.scrapGroups[0].scrapGroupId,this.getMyScraps())):this.$axios.get("/scrap/group",{headers:{silent:!0}}).then(function(a){t.scrapGroups=a.data,t.scrapGroupId===t.scrapGroups[0].scrapGroupId&&1===t.pagination.page||(t.pagination.page=1,t.scrapGroupId=t.scrapGroups[0].scrapGroupId,t.getMyScraps()),t.$store.dispatch("setScrapGroups",t.scrapGroups)}).catch(function(a){t.$store.dispatch("showSnackbar",{text:a.response&&a.response.data.message||"스크랩 그룹 목록을 가져오지 못했습니다.",color:"error"})})},openDialog:function(){this.dialog=!0,document.body.style.position="fixed"},closeDialog:function(){document.body.style.position="initial",this.dialog=!1}},watch:{pagination:{handler:function(t){this.scrapGroupId&&this.getMyScraps()},deep:!0},scrapGroupId:function(t){var a=this;this.$nextTick(function(){a.pagination.page=1,a.getMyScraps()})},dialog:function(t){}},created:function(){this.getScrapGroups()}},i=o,n=(e("b7a5"),e("0c7c")),c=Object(n["a"])(i,s,r,!1,null,null,null);a["default"]=c.exports},aaa7:function(t,a,e){},b7a5:function(t,a,e){"use strict";var s=e("aaa7"),r=e.n(s);r.a}}]);
//# sourceMappingURL=chunk-22928f1c.47591b29.js.map