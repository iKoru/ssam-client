(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-80edad86","chunk-2d20feae"],{"0930":function(t,e,s){},"728a":function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"position-relative"},[s("div",{staticClass:"pt-3 px-2 position-relative boardTitle"},[s("router-link",{attrs:{to:"T"===t.boardType?"/topicBest":"/loungeBest"}},[t._v(t._s("T"===t.boardType?"토픽":"라운지")+" 베스트")])],1),s("v-divider",{staticClass:"my-2 dark-border"}),s("small",{staticClass:"boardExtractorPeriod"},[t._v(t._s(0===t.period?"오늘":1===t.period?"이번주":"이번달"))]),s("v-carousel",{staticClass:"periodBestCarousel text-xs-center",attrs:{cycle:"","hide-controls":"",light:"",interval:1e4,height:28*(t.maxCount||10)+50},model:{value:t.period,callback:function(e){t.period=e},expression:"period"}},[s("v-carousel-item",{attrs:{transition:"fade-transition","reverse-transition":"fade-transition"}},[t.items.daily&&t.items.daily.length>0?s("small-document-list",{attrs:{list:t.items.daily,maxCount:t.maxCount,showDateTime:!1,showVoteUpCount:!0}}):s("div",{staticClass:"d-flex cover-title align-center"},[s("div",{staticClass:"my-auto flex d-inline-block"},[t._v("표시할 내용이 없습니다.")])])],1),s("v-carousel-item",{attrs:{transition:"fade-transition","reverse-transition":"fade-transition"}},[t.items.weekly&&t.items.weekly.length>0?s("small-document-list",{attrs:{list:t.items.weekly,maxCount:t.maxCount,showDateTime:!1,showVoteUpCount:!0}}):s("div",{staticClass:"d-flex cover-title align-center"},[s("div",{staticClass:"my-auto flex d-inline-block"},[t._v("표시할 내용이 없습니다.")])])],1),s("v-carousel-item",{attrs:{transition:"fade-transition","reverse-transition":"fade-transition"}},[t.items.monthly&&t.items.monthly.length>0?s("small-document-list",{attrs:{list:t.items.monthly,maxCount:t.maxCount,showDateTime:!1,showVoteUpCount:!0}}):s("div",{staticClass:"d-flex cover-title align-center"},[s("div",{staticClass:"my-auto flex d-inline-block"},[t._v("표시할 내용이 없습니다.")])])],1)],1)],1)},a=[],l=s("b659"),n={name:"BoardExtractor",components:{SmallDocumentList:l["default"]},props:["boardType","maxCount"],data:function(){return{period:0,items:{daily:[],weekly:[],monthly:[]}}},created:function(){var t=this;this.$axios.get("/best",{params:{boardType:this.boardType},headers:{silent:!0}}).then(function(e){t.items=e.data}).catch(function(e){console.log(e),t.$store.dispatch("showSnackbar",{text:"베스트 게시물을 가져오는 데 오류가 발생했습니다.".concat(e.response?"["+e.response.data.message+"]":""),color:"error"})})}},o=n,r=(s("afb6"),s("0c7c")),c=Object(r["a"])(o,i,a,!1,null,null,null);e["default"]=c.exports},afb6:function(t,e,s){"use strict";var i=s("0930"),a=s.n(i);a.a},b659:function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[t.list&&0!==t.list.length?s("v-list",{staticClass:"dense-list",attrs:{dense:"",light:""}},[t._l(Math.min(t.maxCount||10,t.list.length),function(e){return[t.list[e-1].header?s("v-subheader",{key:e-1},[t._v(t._s(t.list[e-1].header))]):t.list[e-1].divider?s("v-divider",{key:e-1,attrs:{inset:t.list[e-1].inset}}):s("v-list-tile",{key:e-1,staticClass:"dense-list",attrs:{to:"/"+t.list[e-1].boardId+"/"+t.list[e-1].documentId,ripple:""}},[s("v-list-tile-content",[s("v-list-tile-title",[s("v-layout",{attrs:{row:""}},[s("span",{staticClass:"ellipsis"},[t._v(t._s(t.list[e-1].title))]),t.list[e-1].commentCount>0?s("span",{staticClass:"primary--text"},[t._v("["+t._s(t.list[e-1].commentCount)+"]")]):t._e(),s("v-spacer"),t.showDateTime?s("v-subheader",{staticClass:"tiny align-center mx-1 px-0"},[s("small",[t._v(t._s(t.list[e-1].writeDateTime.fromNow()))])]):t._e(),t.showVoteUpCount?s("v-subheader",{staticClass:"tiny align-center mx-1 px-0"},[s("small",[t._v("추천 "+t._s(t.list[e-1].voteUpCount))])]):t._e()],1)],1)],1)],1)]})],2):[s("div",{staticClass:"my-2 text-xs-center"},[t._v("표시할 내용이 없습니다.")])]],2)},a=[],l={name:"smallDocumentList",props:["list","maxCount","showDateTime","showVoteUpCount"]},n=l,o=s("0c7c"),r=Object(o["a"])(n,i,a,!1,null,null,null);e["default"]=r.exports}}]);
//# sourceMappingURL=chunk-80edad86.ad7aadea.js.map