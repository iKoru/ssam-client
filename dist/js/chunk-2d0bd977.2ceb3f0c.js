(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0bd977"],{"2d3b":function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",[a("v-layout",{attrs:{row:"","justify-center":"","align-center":""}},[a("v-flex",{attrs:{xs12:""}},[a("v-tabs",{model:{value:t.tab,callback:function(e){t.tab=e},expression:"tab"}},[a("v-tab",{key:"searchDocument",attrs:{to:"searchDocument"}},[t._v("게시물 찾기")]),a("v-tab",{key:"searchBoard",attrs:{to:"searchBoard"}},[t._v("게시판 찾기")]),a("v-tabs-items",{attrs:{touchless:""}},[a("v-tab-item",{attrs:{value:"searchDocument"}},["searchDocument"===t.tab?a("router-view"):t._e()],1),a("v-tab-item",{attrs:{value:"searchBoard"}},["searchBoard"===t.tab?a("router-view"):t._e()],1)],1)],1)],1)],1)],1)},s=[],c=a("713b"),n={name:"Search",data:function(){return{tab:""}},created:function(){this.$emit("update:layout",c["a"]),this.$store.dispatch("setColumnType","HIDE_ALWAYS")},watch:{$route:{immediate:!0,handler:function(){"search"===this.$route.name&&this.$router.push("searchDocument")}}}},o=n,u=a("0c7c"),i=Object(u["a"])(o,r,s,!1,null,null,null);e["default"]=i.exports}}]);
//# sourceMappingURL=chunk-2d0bd977.2ceb3f0c.js.map