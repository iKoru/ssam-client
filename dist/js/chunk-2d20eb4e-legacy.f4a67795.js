(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d20eb4e"],{b109:function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",[a("v-layout",{attrs:{row:"","justify-center":"","align-center":""}},[a("v-flex",{attrs:{xs12:""}},[a("v-tabs",{attrs:{grow:""},model:{value:t.tab,callback:function(e){t.tab=e},expression:"tab"}},[a("v-tab",{attrs:{to:"myBoard"}},[t._v("내 게시판")]),a("v-tab",{attrs:{to:"myDocument"}},[t._v("내가 쓴 글")]),a("v-tab",{attrs:{to:"myComment"}},[t._v("내 댓글")]),a("v-tab",{attrs:{to:"myScrap"}},[t._v("내 스크랩")]),a("v-tabs-items",{attrs:{touchless:""}},[a("v-tab-item",{attrs:{value:"myBoard"}},["myBoard"===t.tab?a("router-view"):t._e()],1),a("v-tab-item",{attrs:{value:"myDocument"}},["myDocument"===t.tab?a("router-view"):t._e()],1),a("v-tab-item",{attrs:{value:"myComment"}},["myComment"===t.tab?a("router-view"):t._e()],1),a("v-tab-item",{attrs:{value:"myScrap"}},["myScrap"===t.tab?a("router-view"):t._e()],1)],1)],1)],1)],1)],1)},o=[],m=a("713b"),n={name:"MyCommunity",data:function(){return{tab:"myBoard"}},created:function(){this.$emit("update:layout",m["a"]),this.$store.dispatch("setColumnType","HIDE_ALWAYS")},watch:{$route:{immediate:!0,handler:function(){"myCommunity"===this.$route.name&&this.$router.push("myBoard")}}}},u=n,s=a("0c7c"),i=Object(s["a"])(u,r,o,!1,null,null,null);e["default"]=i.exports}}]);
//# sourceMappingURL=chunk-2d20eb4e-legacy.f4a67795.js.map