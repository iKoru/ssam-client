(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-056e92a5"],{"262c":function(t,e,s){},"2da0":function(t,e,s){"use strict";var o=s("f6bc"),a=s.n(o);a.a},"2e31":function(t,e,s){"use strict";var o=s("67a7"),a=s.n(o);a.a},"560d":function(t,e,s){"use strict";var o=s("f116"),a=s.n(o);a.a},"5a2f":function(t,e,s){"use strict";var o=s("8724"),a=s.n(o);a.a},"67a7":function(t,e,s){},"713b":function(t,e,s){"use strict";var o=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"mainLayout"},[s("main-toolbar",{staticClass:"mainLayout__nav"}),s("menu-bar",{attrs:{lounges:t.lounges,topics:t.topics}}),t.$vuetify.breakpoint.xsOnly?s("menu-drawer",{attrs:{lounges:t.lounges,topics:t.topics}}):t._e(),s("main",{staticClass:"mainLayout__main"},[s("main-column-layout",[t._t("default")],2),t._l(t.popups,function(e){return s("v-dialog",{key:e.popupId,attrs:{"hide-overlay":"","content-class":"popup"},model:{value:e.popupActivated,callback:function(s){t.$set(e,"popupActivated",s)},expression:"popup.popupActivated"}},[s("v-card",{attrs:{flat:""}},[s("v-card-title",{class:{"justify-center":!0,"pa-0":"image"===e.popupType}},["image"===e.popupType?s("a",{staticClass:"w-100",attrs:{href:e.popupHref,target:"_blank"}},[s("v-img",{attrs:{src:e.popupContents}})],1):"html"===e.popupType?s("div",{domProps:{innerHTML:t._s(e.popupContents)}}):"text"===e.popupType?s("div",[t._v(t._s(e.popupContents))]):t._e()]),s("v-divider"),s("v-card-actions",{staticStyle:{padding:"4px 8px"}},[s("v-subheader",{staticClass:"pt-0 mt-0 dismiss body-1 cursor-pointer",on:{click:function(s){return t.dismiss(e)}}},[t._v("오늘 하루 그만보기")]),s("v-spacer"),s("v-btn",{staticClass:"short",attrs:{small:"",flat:""},on:{click:function(t){e.popupActivated=!1}}},[t._v("닫기")])],1)],1)],1)})],2),s("main-footer",{staticClass:"mainLayout__footer"})],1)},a=[],n=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-toolbar",{attrs:{color:"white",fixed:!1,light:t.$store.getters.isLight,flat:""}},[t.$vuetify.breakpoint.xsOnly?o("v-toolbar-side-icon",{on:{click:function(e){return e.stopPropagation(),t.$store.dispatch("toggleMenuDrawer")}}}):t._e(),o("v-toolbar-title",{class:{"ml-0 cursor-pointer":!0,"pl-3":t.$vuetify.breakpoint.smAndUp},attrs:{title:"Pedagy 메인"},on:{click:t.goMain}},[o("div",{staticStyle:{width:"120px"}},[o("svg",{staticStyle:{"enable-background":"new 0 0 1650 512","vertical-align":"middle"},attrs:{version:"1.1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",x:"0px",y:"0px",viewBox:"0 0 1650 512","xml:space":"preserve"}},[o("path",{staticClass:"st1",attrs:{d:"M698.2,240.1c0-17.4-14.1-31.6-31.6-31.6c-17.4,0-31.6,14.1-31.6,31.6c0,17.4,14.1,31.6,31.6,31.6 C684.1,271.6,698.2,257.5,698.2,240.1"}}),o("path",{staticClass:"st1",attrs:{d:"M962.2,240.1c0-17.4-14.1-31.6-31.6-31.6c-17.4,0-31.6,14.1-31.6,31.6c0,17.4,14.1,31.6,31.6,31.6 C948,271.6,962.2,257.5,962.2,240.1"}}),o("g",[o("path",{staticClass:"st2",attrs:{d:"M1004,112.5L1004,112.5c-16.4,0-30.1,11.9-32.7,27.6c-17.1-10-37-15.8-58.3-15.8c-52.5,0-96.8,35-111,82.9\n            h-37.2V72.8c0-21.3-17.3-38.6-38.6-38.6h0c-21.3,0-38.6,17.3-38.6,38.6v58.2c-12.1-4.3-25-6.6-38.6-6.6\n            c-63.9,0-115.7,51.8-115.7,115.7c0,63.9,51.8,115.7,115.7,115.7c46.5,0,86.6-27.4,105-67h54c18.4,39.6,58.5,67,105,67\n            c22.6,0,43.8-6.5,61.6-17.8c5.6,10.6,16.6,17.8,29.4,17.8h0c18.4,0,33.3-14.9,33.3-33.3V145.7\n            C1037.2,127.4,1022.3,112.5,1004,112.5z M649,289.3c-27.2,0-49.2-22-49.2-49.2c0-27.2,22-49.2,49.2-49.2c27.2,0,49.2,22,49.2,49.2\n            C698.2,267.3,676.2,289.3,649,289.3z M912.9,289.3c-27.2,0-49.2-22-49.2-49.2c0-27.2,22-49.2,49.2-49.2s49.2,22,49.2,49.2\n            C962.2,267.3,940.1,289.3,912.9,289.3z"}}),o("path",{staticClass:"st2",attrs:{d:"M168.1,34.2C104.2,34.2,52.4,86,52.4,149.9l0,0v172.6c0,18.4,14.9,33.3,33.3,33.3h0\n            c18.4,0,33.3-14.9,33.3-33.3v-67.9c14.9,7,31.6,11,49.2,11c63.9,0,115.7-51.8,115.7-115.7S232,34.2,168.1,34.2z M168.1,199.2\n            c-27.2,0-49.2-22-49.2-49.2s22-49.2,49.2-49.2c27.2,0,49.2,22,49.2,49.2S195.3,199.2,168.1,199.2z"}}),o("path",{staticClass:"st2",attrs:{d:"M1264.7,112.5c-15,0-27.6,9.9-31.8,23.5c-15.3-7.5-32.5-11.7-50.7-11.7c-63.9,0-115.7,51.8-115.7,115.7\n            c0,63.9,51.8,115.7,115.7,115.7c17.6,0,34.3-3.9,49.2-11v31.4c0,27.2-22,49.2-49.2,49.2c-20.3,0-37.8-12.3-45.3-29.9\n            c-5.1-11.9-17.2-19.3-30.2-19.3c-24.1,0-40.1,24.8-30.4,46.9c18,40.6,58.6,68.8,105.8,68.8c62,0,112.6-48.7,115.6-110h0.1V145.7\n            C1298,127.4,1283.1,112.5,1264.7,112.5z M1182.3,289.3c-27.2,0-49.2-22-49.2-49.2c0-27.2,22-49.2,49.2-49.2s49.2,22,49.2,49.2\n            C1231.5,267.3,1209.4,289.3,1182.3,289.3z"}}),o("path",{staticClass:"st2",attrs:{d:"M1539.8,129.6c-18.4,0-33.3,14.9-33.3,33.3v77.2c0,27.2-22,49.2-49.2,49.2c-27.2,0-49.2-22-49.2-49.2h0v-77.2\n            c0-18.4-14.9-33.3-33.3-33.3h0c-18.4,0-33.3,14.9-33.3,33.3v77.2c0,63.9,51.8,115.7,115.7,115.7c17.6,0,34.3-3.9,49.2-11v31.4\n            c0,27.2-22,49.2-49.2,49.2c-20.3,0-37.8-12.3-45.3-29.9c-5.1-11.9-17.2-19.3-30.2-19.3c-24.1,0-40.1,24.8-30.4,46.9\n            c18,40.6,58.6,68.8,105.8,68.8c62,0,112.6-48.7,115.6-110h0.1v-142v-77.2C1573.1,144.5,1558.2,129.6,1539.8,129.6z"}}),o("path",{staticClass:"st2",attrs:{d:"M514.1,199.3C497.5,153.7,453.6,123,405,123c-64,0-116.1,52.1-116.1,116.1S341,355.2,405,355.2\n            c36.5,0,70.1-16.6,92.2-45.6c11.2-14.6,8.4-35.5-6.2-46.7c-14.6-11.2-35.5-8.4-46.7,6.2c-9.5,12.4-23.8,19.5-39.3,19.5\n            c-25.6,0-46.7-19.6-49.2-44.5h127c10.9,0,21.1-5.3,27.3-14.2C516.3,220.9,517.8,209.5,514.1,199.3z M404.9,173.8\n            c16.2,0,30.3,8.5,38.3,21.2h-76.7C374.6,182.3,388.8,173.8,404.9,173.8z"}})])])])]),o("v-spacer"),o("router-link",{staticClass:"d-flex fill-height align-center",attrs:{to:"/search"}},[o("v-icon",{attrs:{color:t.$store.getters.isLight?"primary":"secondary"}},[t._v("search")])],1),o("v-menu",{attrs:{"offset-y":"",left:"","nudge-bottom":"5px","open-on-hover":t.$vuetify.breakpoint.smAndUp},model:{value:t.menu,callback:function(e){t.menu=e},expression:"menu"}},[t.$vuetify.breakpoint.smAndUp?o("v-btn",{staticClass:"plain notificationActivator",attrs:{slot:"activator",small:"",flat:""},slot:"activator"},[o("v-avatar",{staticClass:"mr-1",attrs:{size:"30px",color:t.$store.getters.isLight?null:"secondary"}},[t.$store.getters.isLight?o("img",{attrs:{src:t.$store.getters.profile.picturePath||s("c31a"),title:"프로필 이미지"}}):o("span",{staticClass:"white--text subheading"},[t._v(t._s(t.nickName?t.nickName.substring(0,1):"?"))])]),o("v-badge",{attrs:{color:"error",value:t.totalNotifications>0&&!t.menu&&!t.notification}},[o("span",{staticClass:"font-weight-bold"},[t._v(t._s(t.nickName||""))]),o("span",{attrs:{slot:"badge"},slot:"badge"},[t._v(t._s(t.totalNotifications))])])],1):o("v-btn",{staticClass:"notificationActivator",attrs:{slot:"activator",icon:"",large:""},slot:"activator"},[o("v-badge",{attrs:{color:"error",value:t.totalNotifications>0&&!t.menu&&!t.notification,overlap:""}},[o("v-icon",[t._v("more_vert")]),o("span",{attrs:{slot:"badge"},slot:"badge"},[t._v(t._s(t.totalNotifications))])],1)],1),t.notification?t._e():o("v-list",{staticClass:"py-0",attrs:{id:"mainToolbarMenu"}},[o("v-list-tile",{attrs:{to:"/myPage",ripple:"ripple"}},[o("v-list-tile-content",{staticClass:"align-end"},[t._v("내 계정정보")])],1),o("v-list-tile",{attrs:{to:"/myCommunity",ripple:"ripple"}},[o("v-list-tile-content",{staticClass:"align-end"},[t._v("내 커뮤니티")])],1),t.totalNotifications>0?o("v-list-tile",{on:{click:function(e){t.notification=!0}}},[o("div",{staticClass:"ml-auto",staticStyle:{"margin-right":"18px"}},[o("v-badge",{staticClass:"d-inline-flex",attrs:{color:"error"}},[o("v-list-tile-content",[o("v-list-tile-title",[t._v("알림내역")])],1),o("span",{attrs:{slot:"badge"},slot:"badge"},[t._v(t._s(t.totalNotifications))])],1)],1)]):t._e(),o("v-list-tile",{attrs:{to:"/message",ripple:"ripple"}},[o("v-list-tile-content",{staticClass:"align-end"},[t._v("메시지")])],1),o("v-list-tile",{on:{click:t.signout}},[o("v-list-tile-content",{staticClass:"align-end"},[t._v("로그아웃")])],1)],1)],1),o("v-dialog",{attrs:{attach:".mainLayout","content-class":"notificationDialog","hide-overlay":"",absolute:"",fullscreen:t.$vuetify.breakpoint.xsOnly,transition:t.$vuetify.breakpoint.xsOnly?"dialog-bottom-transition":"fade-transition",lazy:"",scrollable:""},model:{value:t.notification,callback:function(e){t.notification=e},expression:"notification"}},[o("notification-center",{attrs:{dialog:t.notification},on:{closeDialog:t.closeDialog}})],1)],1)},i=[];function r(t){document.cookie=t+"=;expires=Thu, 01 Jan 1970 00:00:01 GMT;"}var l={template:"#mainToolbar",name:"mainToolbar",components:{NotificationCenter:function(){return s.e("chunk-2d21d54d").then(s.bind(null,"d19c"))}},data:function(){return{notification:!1,menu:!1}},computed:{nickName:function(){return this.$store.getters.isLight?this.$store.getters.loungeNickName:this.$store.getters.topicNickName},totalNotifications:function(){return this.$store.getters.totalNotifications},showNotificationBadge:function(){return this.totalNotifications>0}},methods:{signout:function(){var t=this;r("token"),r("_csrf"),r("CSRF-TOKEN"),this.$axios.post("/signout",null,{headers:{silent:!0}}).then(function(){t.$store.dispatch("setToken",!1),t.$store.dispatch("setUserId",null),t.$router.push("/index")}).catch(function(e){t.$store.dispatch("showSnackbar",{text:e&&e.response?e.response.data.message:"로그아웃하지 못했습니다.",color:"error"})})},goMain:function(){this.$router.push("/")},openDialog:function(){this.notification=!0},closeDialog:function(){this.notification=!1}}},c=l,u=(s("2e31"),s("0c7c")),p=Object(u["a"])(c,n,i,!1,null,null,null),d=p.exports,v=s("7386"),m=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-container",{attrs:{"px-0":"","py-0":"",fluid:""}},[s("v-layout",[s("v-navigation-drawer",{attrs:{value:t.$store.getters.menuDrawer,app:"",id:"menuDrawer"},on:{input:t.drawerChanged}},[s("v-toolbar",{staticClass:"bg-light",attrs:{flat:""}},[s("v-list",{staticClass:"py-0"},[s("v-list-tile",{staticClass:"bg-light",on:{click:t.myPage}},[s("v-list-tile-title",{staticClass:"subheading"},[t._v(t._s((t.$store.getters.isLight?t.$store.getters.loungeNickName:t.$store.getters.topicNickName)+"님, 안녕하세요!"))])],1)],1)],1),s("v-list",{staticClass:"pt-0",attrs:{dense:""}},[s("v-list-group",{attrs:{"no-action":""},model:{value:t.openLounge,callback:function(e){t.openLounge=e},expression:"openLounge"}},[s("v-list-tile",{attrs:{slot:"activator"},slot:"activator"},[s("v-list-tile-title",[s("b",{staticClass:"primary--text"},[t._v("라운지")])])],1),t._l(t.lounges.filter(function(t){return t.boardId}),function(e,o){return s("v-list-tile",{key:o,attrs:{to:"/"+e.boardId},on:{click:function(e){return t.drawerChanged(!1)}}},[s("v-list-tile-title",{domProps:{textContent:t._s(e.boardName)}})],1)})],2),s("v-list-group",{attrs:{"no-action":""},model:{value:t.openTopic,callback:function(e){t.openTopic=e},expression:"openTopic"}},[s("v-list-tile",{attrs:{slot:"activator"},slot:"activator"},[s("v-list-tile-title",[s("b",{staticClass:"secondary--text"},[t._v("토픽")])])],1),t._l(t.topics,function(e,o){return s("v-list-tile",{key:o,class:{recommand:e.notJoined},attrs:{to:"/"+e.boardId},on:{click:function(e){return t.drawerChanged(!1)}}},[s("v-layout",{attrs:{column:""}},[s("v-list-tile-title",[t._v("\n                "+t._s(e.boardName)+"\n                "),e.notJoined?s("v-chip",{staticClass:"ma-0",attrs:{small:"",label:""}},[t._v("추천")]):t._e()],1)],1)],1)}),s("v-list-tile",{attrs:{to:"/searchBoard"},on:{click:function(e){return t.drawerChanged(!1)}}},[s("v-layout",{attrs:{column:""}},[s("v-list-tile-title",[s("v-icon",{attrs:{small:""}},[t._v("search")]),t._v("다른 토픽 찾기\n              ")],1)],1)],1)],2)],1)],1)],1)],1)},f=[],h={name:"MenuDrawer",props:["lounges","topics"],methods:{myPage:function(){this.$router.push("/myPage"),this.drawerChanged(!1)},drawerChanged:function(t){t!==this.$store.getters.menuDrawer&&this.$store.dispatch("toggleMenuDrawer")}},data:function(){return{openLounge:!0,openTopic:!1}},watch:{openLounge:function(t){t&&this.openTopic&&(this.openTopic=!1)},openTopic:function(t){t&&this.openLounge&&(this.openLounge=!1)}},mounted:function(){}},g=h,b=(s("5a2f"),Object(u["a"])(g,m,f,!1,null,null,null)),x=b.exports,C=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-container",{attrs:{"px-0":"","py-0":"","mb-3":"/"!==t.$route.path,fluid:"",id:"menubarContainer"}},[t.$vuetify.breakpoint.smAndUp?[s("v-layout",{attrs:{id:"menuBarBackgroundMarker"}},[s("v-flex",{staticClass:"primary",attrs:{sm6:""}}),s("v-flex",{staticClass:"secondary",attrs:{sm6:""}})],1)]:t._e(),s("v-layout",{staticClass:"position-relative",attrs:{row:"",id:"menuBar",wrap:t.$vuetify.breakpoint.xsOnly}},[s("v-flex",{class:{"loungeTab scrollContainer overflow-hidden position-relative":!0,"hide-menuBar":!t.menuBar},attrs:{sm2:"","order-sm1":"",xs6:"","order-xs1":""}},[s("v-flex",{staticClass:"position-absolute menuBarTab"},[s("v-tabs",{attrs:{light:"","hide-slider":"",mandatory:!1,height:"32"},model:{value:t.menu,callback:function(e){t.menu=e},expression:"menu"}},[s("v-tab",{key:0,staticClass:"loungeTab primary flex",on:{click:function(e){return e.stopPropagation(),t.toggleMenuBar("lounge")}}},[t._v("라운지")])],1)],1),t.$vuetify.breakpoint.smAndUp?s("v-layout",{staticClass:"menuBarContents",style:{"margin-top":t.menuBar?0:"32px"},attrs:{row:""}},[s("v-flex",{staticClass:"menuColumn position-relative"},[s("v-layout",{attrs:{column:""}},[t.lounges.length>2?t._l(3,function(e){return s("v-flex",{key:e,staticClass:"ellipsis"},[null!==t.lounges[e-1].boardId?s("router-link",{class:{opaque:!t.isTouchable(t.lounges[e-1])},attrs:{to:"/"+t.lounges[e-1].boardId,title:t.lounges[e-1].boardName}},[t._v(t._s(t.lounges[e-1].boardName||" "))]):s("span",{staticClass:"cursor-default"},[t._v(" ")])],1)}):0===t.lounges.length?[s("v-flex",{staticClass:"cursor-default"},[t._v(" ")]),s("v-flex",{staticClass:"cursor-default"},[t._v(" ")]),s("v-flex",{staticClass:"cursor-default"},[t._v(" ")])]:1===t.lounges.length?[s("v-flex",{staticClass:"ellipsis"},[s("router-link",{class:{opaque:!t.isTouchable(t.lounges[0])},attrs:{to:"/"+t.lounges[0].boardId,title:t.lounges[0].boardName}},[t._v(t._s(t.lounges[0].boardName))])],1),s("v-flex",{staticClass:"cursor-default"},[t._v(" ")]),s("v-flex",{staticClass:"cursor-default"},[t._v(" ")])]:[s("v-flex",{staticClass:"ellipsis"},[s("router-link",{attrs:{to:"/"+t.lounges[0].boardId,title:t.lounges[0].boardName}},[t._v(t._s(t.lounges[0].boardName))])],1),s("v-flex",{staticClass:"ellipsis"},[t.lounges[1].boardId?s("router-link",{class:{opaque:!t.isTouchable(t.lounges[1])},attrs:{to:"/"+t.lounges[1].boardId,title:t.lounges[1].boardName}},[t._v(t._s(t.lounges[1].boardName))]):s("span",{staticClass:"cursor-default"},[t._v(" ")])],1),s("v-flex",{staticClass:"cursor-default"},[t._v(" ")])]],2),s("div",{directives:[{name:"show",rawName:"v-show",value:1===t.menu,expression:"menu===1"}],staticClass:"switchTabIcon switchToTopic cursor-pointer",on:{click:function(e){return t.toggleMenuBar("lounge")}}},[s("v-icon",[t._v("navigate_next")])],1)],1)],1):t._e()],1),t.$vuetify.breakpoint.smAndUp?s("v-flex",{class:{"topicTab scrollContainer":!0,"hide-menuBar":!t.menuBar},attrs:{sm2:"",id:"topicTabScreen"}}):t._e(),s("v-flex",{directives:[{name:"show",rawName:"v-show",value:0===t.menu&&t.$vuetify.breakpoint.smAndUp,expression:"menu===0 && $vuetify.breakpoint.smAndUp"}],class:{"topicTab scrollContainer overflow-hidden":!0,"hide-menuBar":!t.menuBar},attrs:{sm2:"","order-sm3":""}},[s("v-layout",{staticClass:"menuBarContents",attrs:{row:""}},[s("v-flex",{staticClass:"menuColumn position-relative",attrs:{id:"topicFixedColumn"}},[s("div",{staticClass:"switchTabIcon switchToLounge cursor-pointer",on:{click:function(e){return t.toggleMenuBar("topic")}}},[s("v-icon",[t._v("navigate_before")])],1),s("div",{staticClass:"ml-2"},[t.topics.length>2?t._l(3,function(e){return s("v-flex",{key:e},[s("v-layout",[t.topics[e-1].notJoined?s("v-chip",{staticClass:"ma-0",attrs:{label:""}},[t._v("추천")]):t._e(),s("v-flex",{staticClass:"ellipsis"},[s("router-link",{class:{"text-darken-1":t.topics[e-1].notJoined,opaque:!t.isTouchable(t.topics[e-1])},attrs:{title:t.topics[e-1].notJoined?"추천 토픽":t.topics[e-1].boardName,to:"/"+t.topics[e-1].boardId}},[t._v(t._s(t.topics[e-1].boardName))])],1)],1)],1)}):[0===t.topics.length?[s("v-flex",{staticClass:"cursor-default"},[t._v(" ")]),s("v-flex",{staticClass:"cursor-default"},[t._v(" ")]),s("v-flex",{staticClass:"cursor-default"},[t._v(" ")])]:1===t.topics.length?[s("v-flex",[s("v-layout",[t.topics[0].notJoined?s("v-chip",{staticClass:"ma-0",attrs:{label:""}},[t._v("추천")]):t._e(),s("v-flex",{staticClass:"ellipsis"},[s("router-link",{class:{"text-darken-1":t.topics[0].notJoined,opaque:!t.isTouchable(t.topics[0])},attrs:{title:t.topics[0].notJoined?"추천 토픽":t.topics[0].boardName,to:"/"+t.topics[0].boardId}},[t._v(t._s(t.topics[0].boardName))])],1)],1)],1),s("v-flex",{staticClass:"cursor-default"},[t._v(" ")]),s("v-flex",{staticClass:"cursor-default"},[t._v(" ")])]:[s("v-flex",[s("v-layout",[t.topics[0].notJoined?s("v-chip",{staticClass:"ma-0",attrs:{label:""}},[t._v("추천")]):t._e(),s("v-flex",{staticClass:"ellipsis"},[s("router-link",{class:{"text-darken-1":t.topics[0].notJoined,opaque:!t.isTouchable(t.topics[0])},attrs:{title:t.topics[0].notJoined?"추천 토픽":t.topics[0].boardName,to:"/"+t.topics[0].boardId}},[t._v(t._s(t.topics[0].boardName))])],1)],1)],1),s("v-flex",[s("v-layout",[t.topics[1].notJoined?s("v-chip",{staticClass:"ma-0",attrs:{label:""}},[t._v("추천")]):t._e(),s("v-flex",{staticClass:"ellipsis"},[s("router-link",{class:{"text-darken-1":t.topics[1].notJoined,opaque:!t.isTouchable(t.topics[1])},attrs:{title:t.topics[1].notJoined?"추천 토픽":t.topics[1].boardName,to:"/"+t.topics[1].boardId}},[t._v(t._s(t.topics[1].boardName))])],1)],1)],1),s("v-flex",{staticClass:"cursor-default"},[t._v(" ")])]]],2)])],1)],1),s("v-flex",{attrs:{"order-sm2":"","order-xs3":""}},[s("v-tabs-items",{attrs:{mandatory:!1,touchless:""},model:{value:t.menu,callback:function(e){t.menu=e},expression:"menu"}},[s("v-tab-item",{key:0,class:{"d-none":!t.menuBar,"menuBarContents primary":!0}},[[t.$vuetify.breakpoint.smAndUp?s("v-flex",{staticClass:"scrollContainer"},[t.lounges.length>5?t._l(Math.floor(t.lounges.length/3)-1,function(e){return s("v-flex",{key:e,staticClass:"menuColumn loungeColumn",attrs:{sm2:""}},[s("v-layout",{attrs:{column:""}},[s("v-flex",{staticClass:"ellipsis"},[s("router-link",{class:{opaque:!t.isTouchable(t.lounges[3*e])},attrs:{to:"/"+t.lounges[3*e].boardId,title:t.lounges[3*e].boardName}},[t._v(t._s(t.lounges[3*e].boardName))])],1),s("v-flex",{staticClass:"ellipsis"},[s("router-link",{class:{opaque:!t.isTouchable(t.lounges[3*e+1])},attrs:{to:"/"+t.lounges[3*e+1].boardId,title:t.lounges[3*e+1].boardName}},[t._v(t._s(t.lounges[3*e+1].boardName))])],1),s("v-flex",{staticClass:"ellipsis"},[s("router-link",{class:{opaque:!t.isTouchable(t.lounges[3*e+2])},attrs:{to:"/"+t.lounges[3*e+2].boardId,title:t.lounges[3*e+2].boardName}},[t._v(t._s(t.lounges[3*e+2].boardName))])],1)],1)],1)}):t._e(),t.lounges.length%3!==0?s("v-flex",{staticClass:"menuColumn loungeColumn",attrs:{sm2:""}},[s("v-layout",{attrs:{column:""}},[t._l(t.lounges.length%3,function(e){return s("v-flex",{key:e,staticClass:"ellipsis"},[s("router-link",{class:{opaque:!t.isTouchable(t.lounges[t.lounges.length-t.lounges.length%3+(e-1)])},attrs:{to:"/"+t.lounges[t.lounges.length-t.lounges.length%3+e-1].boardId,title:t.lounges[t.lounges.length-t.lounges.length%3+(e-1)].boardName}},[t._v(t._s(t.lounges[t.lounges.length-t.lounges.length%3+(e-1)].boardName))])],1)}),s("v-flex",{staticClass:"cursor-default"},[t._v(" ")]),t.lounges.length%3===1?s("v-flex",{staticClass:"cursor-default"},[t._v(" ")]):t._e()],2)],1):t._e()],2):s("v-flex",{staticClass:"scrollContainer"},t._l(t.lounges.filter(function(t){return t.boardId}),function(e){return s("v-flex",{key:e.boardId,staticClass:"menuColumn loungeColumn ellipsis text-xs-center px-1",attrs:{xs4:""}},[s("router-link",{class:{opaque:!t.isTouchable(e)},attrs:{to:"/"+e.boardId,title:t.lounges.boardName}},[t._v(t._s(e.boardName))])],1)}),1)]],2),s("v-tab-item",{key:1,class:{"d-none":!t.menuBar,menuBarContents:!0,secondary:!0,"white--text":!0}},[[t.$vuetify.breakpoint.smAndUp?s("v-flex",{staticClass:"scrollContainer"},[t._l(Math.floor(t.topics.length/3),function(e){return s("v-flex",{key:e,staticClass:"menuColumn topicColumn",attrs:{sm2:""}},[s("v-layout",{attrs:{column:""}},[s("v-flex",[s("v-layout",[t.topics[3*(e-1)].notJoined?s("v-chip",{attrs:{label:""}},[t._v("추천")]):t._e(),s("v-flex",{staticClass:"ellipsis"},[s("router-link",{class:{"d-inline-block":!0,"text-darken-1":t.topics[3*(e-1)].notJoined,opaque:!t.isTouchable(t.topics[3*(e-1)])},attrs:{title:t.topics[3*(e-1)].notJoined?"추천 토픽":t.topics[3*(e-1)].boardName,to:"/"+t.topics[3*(e-1)].boardId}},[t._v("\n                          "+t._s(t.topics[3*(e-1)].boardName)+"\n                        ")])],1)],1)],1),s("v-flex",[s("v-layout",[t.topics[3*(e-1)+1].notJoined?s("v-chip",{attrs:{label:""}},[t._v("추천")]):t._e(),s("v-flex",{staticClass:"ellipsis"},[s("router-link",{class:{"d-inline-block":!0,"text-darken-1":t.topics[3*(e-1)+1].notJoined,opaque:!t.isTouchable(t.topics[3*(e-1)+1])},attrs:{title:t.topics[3*(e-1)+1].notJoined?"추천 토픽":t.topics[3*(e-1)+1].boardName,to:"/"+t.topics[3*(e-1)+1].boardId}},[t._v("\n                          "+t._s(t.topics[3*(e-1)+1].boardName)+"\n                        ")])],1)],1)],1),s("v-flex",[s("v-layout",[t.topics[3*(e-1)+2].notJoined?s("v-chip",{attrs:{label:""}},[t._v("추천")]):t._e(),s("v-flex",{staticClass:"ellipsis"},[s("router-link",{class:{"d-inline-block":!0,"text-darken-1":t.topics[3*(e-1)+2].notJoined,opaque:!t.isTouchable(t.topics[3*(e-1)+2])},attrs:{title:t.topics[3*(e-1)+2].notJoined?"추천 토픽":t.topics[3*(e-1)+2].boardName,to:"/"+t.topics[3*(e-1)+2].boardId}},[t._v("\n                          "+t._s(t.topics[3*(e-1)+2].boardName)+"\n                        ")])],1)],1)],1)],1)],1)}),t.topics.length%3!==0?s("v-flex",{staticClass:"menuColumn topicColumn",attrs:{sm2:""}},[s("v-layout",{attrs:{column:""}},[t._l(t.topics.length%3,function(e){return s("v-flex",{key:e},[s("v-layout",[t.topics[t.topics.length-t.topics.length%3+(e-1)].notJoined?s("v-chip",{attrs:{label:""}},[t._v("추천")]):t._e(),s("v-flex",{staticClass:"ellipsis"},[s("router-link",{class:{"d-inline-block":!0,"text-darken-1":t.topics[t.topics.length-t.topics.length%3+e-1].notJoined,opaque:!t.isTouchable(t.topics[t.topics.length-t.topics.length%3+e-1])},attrs:{title:t.topics[t.topics.length-t.topics.length%3+e-1].notJoined?"추천 토픽":t.topics[t.topics.length-t.topics.length%3+e-1].boardName,to:"/"+t.topics[t.topics.length-t.topics.length%3+e-1].boardId}},[t._v("\n                          "+t._s(t.topics[t.topics.length-t.topics.length%3+(e-1)].boardName)+"\n                        ")])],1)],1)],1)}),s("v-flex",{staticClass:"ellipsis"},[s("router-link",{attrs:{to:"/searchBoard"}},[s("v-icon",{attrs:{small:""}},[t._v("search")]),t._v("다른 토픽 찾기\n                    ")],1)],1),t.topics.length%3===1?s("v-flex",{staticClass:"cursor-default"},[t._v(" ")]):t._e()],2)],1):s("v-flex",{staticClass:"menuColumn topicColumn",attrs:{sm2:""}},[s("v-layout",{attrs:{column:""}},[s("v-flex",{staticClass:"ellipsis"},[s("router-link",{attrs:{to:"/searchBoard"}},[s("v-icon",{attrs:{small:""}},[t._v("search")]),t._v("다른 토픽 찾기\n                    ")],1)],1),s("v-flex",{staticClass:"cursor-default"},[t._v(" ")]),s("v-flex",{staticClass:"cursor-default"},[t._v(" ")])],1)],1)],2):s("v-flex",{staticClass:"scrollContainer"},t._l(t.topics,function(e){return s("v-flex",{key:e.boardId,staticClass:"menuColumn topicColumn text-xs-center px-1",attrs:{xs4:""}},[s("v-layout",[e.notJoined?s("v-chip",{attrs:{label:""}},[t._v("추천")]):t._e(),s("v-flex",{staticClass:"ellipsis"},[s("router-link",{class:{"d-inline-block":!0,"text-darken-1":e.notJoined,opaque:!t.isTouchable(e)},attrs:{title:e.notJoined?"추천 토픽":e.boardName,to:"/"+e.boardId}},[t._v("\n                      "+t._s(e.boardName)+"\n                    ")])],1)],1)],1)}),1)]],2)],1)],1),s("v-flex",{staticClass:"topicTabMenuBar",attrs:{xs6:"",sm2:"","order-xs2":""}},[s("v-tabs",{attrs:{"hide-slider":"",mandatory:!1,height:"32"},model:{value:t.menu,callback:function(e){t.menu=e},expression:"menu"}},[s("v-tab",{key:1,staticClass:"topicTab flex secondary",on:{click:function(e){return e.stopPropagation(),t.toggleMenuBar("topic")}}},[t._v("토픽")])],1)],1)],1)],2)},_=[],y={name:"MenuBar",props:["lounges","topics"],data:function(){return{menu:0}},computed:{menuBar:function(){return this.$store.getters.menuBar},isLight:function(){return this.$store.getters.isLight}},methods:{toggleMenuBar:function(t){var e=this;"lounge"===t?0===this.menu&&this.menuBar?(this.$store.dispatch("setMenuBar",!1),this.menu=null):(this.$store.dispatch("setMenuBar",!0),this.$nextTick(function(){e.menu=0})):"topic"===t&&(1===this.menu&&this.menuBar?(this.$store.dispatch("setMenuBar",!1),this.menu=null):(this.$store.dispatch("setMenuBar",!0),this.$nextTick(function(){e.menu=1})))},isTouchable:function(t){try{return t.statusAuth.read.includes(this.$store.getters.profile.auth)}catch(e){try{return this.$store.getters.boards.find(function(e){return e.boardId===t.boardId}).statusAuth.read.includes(this.$store.getters.profile.auth)}catch(s){return!1}}}},watch:{isLight:function(t){this.menu=t?0:1}}},k=y,$=(s("92d9"),Object(u["a"])(k,C,_,!1,null,null,null)),w=$.exports,N=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-container",{attrs:{"px-0":"",fluid:"","pb-0":"","pt-0":"/"!==t.$route.path}},[s("v-layout",{attrs:{row:"",wrap:"","align-center":""}},[s("v-layout",{attrs:{row:"",wrap:""}},[s("v-flex",{attrs:{xs12:"",md9:"HIDE_ALWAYS"!==t.columnType}},[t._t("default")],2),s("v-flex",{directives:[{name:"show",rawName:"v-show",value:"SHOW_ALWAYS"===t.columnType||"HIDE_SM"===t.columnType&&t.$vuetify.breakpoint.mdAndUp,expression:"(columnType === 'SHOW_ALWAYS') || (columnType === 'HIDE_SM' && $vuetify.breakpoint.mdAndUp)"}],attrs:{xs12:"",md3:"",id:"columnAside"}},[s("v-layout",{attrs:{column:""}},[s("v-flex",{attrs:{xs12:""}},[s("v-card",{attrs:{flat:""}},[s("v-card-title",[s("v-layout",{staticClass:"border-primary",attrs:{column:""}},[s("v-flex",{staticClass:"py-2 px-3 bg-light"},[s("router-link",{attrs:{to:"/notice"}},[s("span",{staticClass:"subheading font-weight-bold"},[t._v("공지사항")])])],1),s("v-flex",{staticClass:"px-2"},[s("small-document-list",{attrs:{list:t.notice?t.notice.documents:[],maxCount:2,showDateTime:!1,showVoteUpCount:!1}})],1),s("v-flex",{staticClass:"py-2 px-3 bg-light"},[s("span",{staticClass:"subheading font-weight-bold cursor-default"},[t._v("따끈따끈 베스트")])]),s("v-flex",{staticClass:"px-2"},[s("small-document-list",{attrs:{list:t.best?t.best.documents:[],maxCount:5,showDateTime:!1,showVoteUpCount:!1}})],1),s("v-flex",{staticClass:"py-2 px-3 bg-light"},[s("router-link",{staticClass:"subheading font-weight-bold",attrs:{to:"/tools"}},[t._v("생활기록부 도구\n                      "),s("v-chip",{attrs:{id:"hotChip",color:"error ma-0","text-color":"white",label:""}},[t._v("hot")])],1)],1),s("v-flex",{staticClass:"text-xs-center"})],1)],1)],1)],1)],1)],1)],1)],1)],1)},T=[],I={name:"MainColumnLayout",components:{SmallDocumentList:function(){return s.e("chunk-2d20feae").then(s.bind(null,"b659"))}},data:function(){return{notice:{},best:{}}},computed:{columnType:function(){return this.$store.getters.columnType}},mounted:function(){var t=this;this.$store.getters.recents?(this.notice=this.$store.getters.recents.find(function(t){return"notice"===t.boardId}),this.best=this.$store.getters.recents.find(function(t){return null===t.boardId})):this.$axios.get("/recent",{headers:{silent:!0}}).then(function(e){e.data.forEach(function(e){e.documents.forEach(function(e){e.writeDateTime&&(e.writeDateTime=t.$moment(e.writeDateTime,"YYYYMMDDHHmmss"))})}),t.notice=e.data.find(function(t){return"notice"===t.boardId}),t.best=e.data.find(function(t){return null===t.boardId}),t.$store.dispatch("setRecents",e.data)}).catch(function(e){console.log(e),t.$store.dispatch("showSnackbar",{text:"최근 게시물을 가져오는 데 오류가 발생했습니다.".concat(e.response?"["+e.response.data.message+"]":""),color:"error"})})},methods:{}},M=I,B=(s("560d"),Object(u["a"])(M,N,T,!1,null,null,null)),A=B.exports;function J(t){for(var e=1;e<arguments.length;e++){var s=null!=arguments[e]?arguments[e]:{},o=Object.keys(s);"function"===typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(s).filter(function(t){return Object.getOwnPropertyDescriptor(s,t).enumerable}))),o.forEach(function(e){D(t,e,s[e])})}return t}function D(t,e,s){return e in t?Object.defineProperty(t,e,{value:s,enumerable:!0,configurable:!0,writable:!0}):t[e]=s,t}var S={components:{MainToolbar:d,MainFooter:v["a"],MenuDrawer:x,MenuBar:w,MainColumnLayout:A},data:function(){return{popups:[]}},computed:{lounges:function(){var t=this.$store.getters.boards.filter(function(t){return"T"!==t.boardType&&"X"!==t.boardType&&!t.parentBoardId});return t.splice(2,0,{boardName:null,boardId:null}),t},topics:function(){var t=this.$store.getters.userBoards,e=this.$store.getters.boards,s=t.filter(function(t){return"T"===t.boardType}).concat(e.filter(function(e){return"T"===e.boardType&&"NONE"!==e.allGroupAuth&&!t.some(function(t){return t.boardId===e.boardId})&&"topicBest"!==e.boardId}).slice(0,5).map(function(t){return J({},t,{notJoined:!0})}));return e.some(function(t){return"topicBest"===t.boardId})&&s.splice(0,0,e.find(function(t){return"topicBest"===t.boardId})),s}},created:function(){var t=this;this.$axios.get("/user",{headers:{silent:!0}}).then(function(e){t.$store.dispatch("profile",e.data)}).catch(function(e){console.log(e),t.$store.dispatch("showSnackbar",{text:e&&e.response?e.response.data.message:"서버에 연결할 수 없습니다. 인터넷 연결을 확인해주세요.",color:"error"})}),this.$axios.get("/board/list",{headers:{silent:!0}}).then(function(e){t.$store.dispatch("setBoards",e.data)}).catch(function(e){t.$store.dispatch("showSnackbar",{text:"".concat(e.response?e.response.data.message:"게시판 목록을 불러오지 못했습니다."),color:"error"})}),this.$axios.get("/user/board",{headers:{silent:!0}}).then(function(e){t.$store.dispatch("setUserBoards",e.data)}).catch(function(e){t.$store.dispatch("showSnackbar",{text:"".concat(e.response?e.response.data.message:"구독한 토픽 목록을 불러오지 못했습니다."),color:"error"})}),this.$axios.get("/popup",{headers:{silent:!0}}).then(function(e){var s=localStorage.getItem("popup");if(s)try{s=JSON.parse(s),Array.isArray(s)&&(s=s.filter(function(e){return t.$moment(e.due,"YYYYMMDD").isSameOrAfter(t.$moment(),"day")}),localStorage.setItem("popup",JSON.stringify(s)),e.data=e.data.filter(function(t){return!s.some(function(e){return e.popupId===t.popupId})}))}catch(o){console.log(o)}t.popups=e.data}).catch(function(t){console.log(t)})},methods:{dismiss:function(t){var e=this,s=localStorage.getItem("popup");if(s)try{if(s=JSON.parse(s),Array.isArray(s))return s=s.filter(function(t){return e.$moment(t.due,"YYYYMMDD").isSameOrAfter(e.$moment(),"day")}),s.push({due:this.$moment().format("YMMDD"),popupId:t.popupId}),localStorage.setItem("popup",JSON.stringify(s)),void(t.popupActivated=!1)}catch(o){console.log(o)}s=[{due:this.$moment().format("YMMDD"),popupId:t.popupId}],localStorage.setItem("popup",JSON.stringify(s)),t.popupActivated=!1}}},L=S,O=(s("2da0"),Object(u["a"])(L,o,a,!1,null,null,null));e["a"]=O.exports},7386:function(t,e,s){"use strict";var o=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-footer",{staticClass:"pa-3 app--footer",attrs:{height:"auto",absolute:"",inset:""}},[s("v-layout",{attrs:{column:"/index"===t.$route.path?t.$vuetify.breakpoint.mdAndDown:t.$vuetify.breakpoint.smAndDown,reverse:"/index"===t.$route.path?t.$vuetify.breakpoint.mdAndDown:t.$vuetify.breakpoint.smAndDown}},[s("v-flex",{class:{"position-absolute":"/index"===t.$route.path?t.$vuetify.breakpoint.lgAndUp:t.$vuetify.breakpoint.mdAndUp}},[s("div",{staticClass:"text-xs-center text-lg-left"},[s("span",{staticClass:"caption"},[t._v("Copyright © "+t._s((new Date).getFullYear())+" Pedagy. All rights reserved.")])])]),s("v-flex",{attrs:{"text-xs-center":""}},[s("router-link",{staticClass:"caption mr-1",attrs:{to:"/contract"}},[t._v("이용약관")]),t._v("|\n      "),s("router-link",{staticClass:"caption mr-1",attrs:{to:"/privacy"}},[t._v("개인정보 처리방침")]),t._v("|\n      "),s("router-link",{staticClass:"caption",attrs:{to:"/rules"}},[t._v("커뮤니티 이용규칙")])],1)],1)],1)},a=[],n={template:"#mainFooter",name:"mainFooter"},i=n,r=s("0c7c"),l=Object(r["a"])(i,o,a,!1,null,null,null);e["a"]=l.exports},8724:function(t,e,s){},"92d9":function(t,e,s){"use strict";var o=s("262c"),a=s.n(o);a.a},c31a:function(t,e,s){t.exports=s.p+"img/defaultUser.7dec8126.svg"},f116:function(t,e,s){},f6bc:function(t,e,s){}}]);