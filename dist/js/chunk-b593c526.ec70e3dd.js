(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-b593c526"],{"1c5f":function(t,e,a){"use strict";var r=a("307c"),s=a.n(r);s.a},"307c":function(t,e,a){},7096:function(t,e,a){},7386:function(t,e,a){"use strict";var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-footer",{staticClass:"pa-3 app--footer",attrs:{height:"auto",absolute:"",inset:""}},[a("v-layout",{attrs:{column:t.$vuetify.breakpoint.smAndDown,reverse:t.$vuetify.breakpoint.smAndDown}},[a("v-flex",{staticClass:"copyright"},[a("div",{staticClass:"text-xs-center text-md-left"},[a("span",{staticClass:"caption"},[t._v("Copyright © "+t._s((new Date).getFullYear())+" Pedagy. All rights reserved.")])])]),a("v-flex",{attrs:{"text-xs-center":""}},[a("router-link",{staticClass:"caption mr-1 primary--text",attrs:{to:"/contract"}},[t._v("이용약관")]),t._v("|\n      "),a("router-link",{staticClass:"caption mr-1 primary--text",attrs:{to:"/privacy"}},[t._v("개인정보 처리방침")]),t._v("|\n      "),a("router-link",{staticClass:"caption primary--text",attrs:{to:"/rules"}},[t._v("커뮤니티 이용규칙")])],1)],1)],1)},s=[],v={template:"#mainFooter",name:"mainFooter"},n=v,i=(a("1c5f"),a("0c7c")),c=Object(i["a"])(n,r,s,!1,null,null,null);e["a"]=c.exports},8810:function(t,e,a){"use strict";var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"publicLayout"},[a("public-toolbar",{staticClass:"publicLayout__nav"}),a("main",{staticClass:"publicLayout__main"},[t._t("default")],2),a("main-footer",{staticClass:"publicLayout__footer"})],1)},s=[],v=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-toolbar",{attrs:{color:"#fafafa",fixed:!1,light:t.$store.getters.isLight,flat:""}},[a("v-toolbar-title",{staticClass:"ml-0 pl-3 cursor-pointer",attrs:{title:"Pedagy 홈"},on:{click:t.goIndex}},[t._v("Pedagy")]),a("v-spacer")],1)},n=[],i={name:"publicToolbar",methods:{goIndex:function(){this.$store.getters.accessToken?this.$router.push("/"):this.$router.push("/index")}}},c=i,o=a("0c7c"),l=Object(o["a"])(c,v,n,!1,null,null,null),_=l.exports,h=a("7386"),u={components:{PublicToolbar:_,MainFooter:h["a"]}},p=u,d=(a("cc46"),Object(o["a"])(p,r,s,!1,null,null,null));e["a"]=d.exports},"9f78":function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a(t.$vuetify.breakpoint.smAndUp?"v-container":"div",{tag:"component",staticClass:"publicLayoutContents stickToTop"},[a("v-layout",{attrs:{row:"",height:"200px","justify-center":"","align-center":""}},[a("v-card",{attrs:{width:"100%",flat:""}},[a("v-card-title",{attrs:{"primary-title":""}},[a("v-flex",{attrs:{xs12:""}},[a("h3",{staticClass:"headline"},[t._v("Pedagy 커뮤니티 이용규칙")]),a("div",{staticClass:"justify-center align-center pa-3"},[a("v-flex",{attrs:{"mt-3":""}},[a("p",[t._v("Pedagy 커뮤니티 이용규칙을 위반한 글이 작성된 경우 신고 기능을 이용해주시기 바랍니다. 회원이 관련법 및 커뮤니티 이용규칙에 위배되는 내용의 게시판을 개설하거나 게시물을 게시할 경우, 삭제, 중단, 변경 등의 제재가 가해질 수 있으며, 회원 자격 및 권한을 제한, 정지, 해지당할 수 있습니다.")]),a("p",[t._v("Pedagy 커뮤니티 이용규칙은 다음과 같습니다.")]),a("br"),a("h4",[t._v("Pedagy의 회원들은 본 조의 각 항에 해당하는 규칙을 모두 지켜야 합니다.")]),a("br"),a("h5",[t._v("1.1. Pedagy는 회원들의 자율성을 바탕으로 합니다. 회원들의 자정 능력을 존중하며, 깨끗한 커뮤니티를 위해 노력해주시기 바랍니다.")]),a("h5",[t._v("1.2. 회원은 서로 예의를 지키고, 존중해야 합니다.")]),a("h5",[t._v("1.3. 운영자 사칭 또는 개인정보 유출에 관한 내용")]),a("h6",[t._v("1.3.1. 운영자를 사칭하거나 타인의 명의를 도용하면 안 됩니다.")]),a("h6",[t._v("1.3.2. 타인의 개인정보 및 계정을 수집, 저장, 공개, 이용하거나, 자신의 개인정보 및 계정을 공개, 공유해서는 안 됩니다.")]),a("h5",[t._v("1.4. Pedagy 사이트 및 시스템에 대한 위협에 관한 내용")]),a("h6",[t._v("1.4.1. 컴퓨터, 소프트웨어, 하드웨어, 서버 등의 장비의 정상적인 가동을 방해, 파괴할 목적으로 고안된 소프트웨어, 랜섬웨어, 코드, 파일, 프로그램을 포함하고 있는 자료를 게시하거나 전송하는 행위를 해서는 안 됩니다.")]),a("h6",[t._v("1.4.2. 해킹, 크래킹 시도를 해서는 안 됩니다.")]),a("h6",[t._v("1.4.3. Pedagy의 서비스를 악용해 추천, 신고, 쪽지, 게시판 개설, 게시물 작성 등의 기능을 조직적으로 악용해서는 안 됩니다.")]),a("h6",[t._v("1.4.4. 다른 회원의 ID를 도용하는 행위를 해서는 안 됩니다.")]),a("h6",[t._v("1.4.5. 허위정보로 ID를 생성하거나 이를 시도하는 행위를 해서는 안 됩니다.")]),a("h6",[t._v("1.4.6. 복수의 ID를 생성하거나 이를 시도하는 행위를 해서는 안 됩니다.")]),a("h5",[t._v("1.5. Pedagy 서비스의 부정 이용에 관한 내용")]),a("h6",[t._v("1.5.1. Pedagy 게시판의 게시물 일체를 복사, 스크린샷 등을 통해 외부로 유출해서는 안 됩니다.")]),a("h6",[t._v("1.5.2. Pedagy를 통해 얻은 정보를 Pedagy 또는 저작권자의 사전 승낙 없이 복제, 전송, 출판, 배포, 방송, 기타 방법에 의하여 제 3자에게 제공하는 행위를 해서는 안 됩니다.")]),a("h6",[t._v("1.5.3. Pedagy의 허가 없이 Pedagy의 서비스를 이용하여 영리목적의 활동을 하면 안 됩니다.")]),a("h6",[t._v("1.5.4. Pedagy의 허가 없이 영리를 목적으로 하는 게시판의 개설 및 게시물을 개시하는 행위를 해서는 안 됩니다.")]),a("br"),a("h4",[t._v("Pedagy는 본 조의 각 항에 해당하는 행위, 게시물의 게시, 게시판의 개설을 금지하고 있습니다. 이에 위반하는 경우, 신고 및 이용약관 제 19조에 정의된 회원 자격의 해지 사유가 될 수 있습니다.")]),a("br"),a("h5",[t._v("2.1. 논란 및 분란을 일으킬 수 있는 행위")]),a("h6",[t._v("2.1.1. 욕설, 비아냥, 비속어 등 예의범절에 벗어난 게시판 및 게시물")]),a("h6",[t._v("2.1.2. 혐오스럽거나 타 회원에게 해를 끼칠 목적을 가진 게시판 및 게시물")]),a("h6",[t._v("2.1.3. 특정인이나 단체/지역 등을 비방하는 게시물")]),a("h6",[t._v("2.1.4. 특정인이나 단체/지역 등을 홍보하거나 가입을 유도하는 게시물")]),a("h6",[t._v("2.1.5. 익명을 악용한 여론 조작을 유도하는 게시물")]),a("h5",[t._v("2.2. 불건전한 행위")]),a("h6",[t._v("2.2.1. 성적 비하를 포함하는 게시판 및 게시물")]),a("h6",[t._v("2.2.2. 불건전한 만남, 대화, 통화 등을 목적으로 하는 게시판 및 게시물")]),a("h5",[t._v("2.3. 다른 이용자의 권리를 침해하는 행위")]),a("h6",[t._v("2.3.1. 중복글, 도배글, 낚시글, 내용 없는 게시판 및 게시물")]),a("h6",[t._v("2.3.2. 관련법에 위배되거나, 타인의 권리를 침해하는 게시물(초상권, 저작권, 사생활 등)")]),a("h5",[t._v("2.4. 게시판의 성격에 맞지 않는 게시물을 게시하는 행위")]),a("h6",[t._v("2.4.1. 허가되지 않은 광고/홍보물 또는 상업적/상업체 연관 게시물(타 서비스 및 사이트, 공동구매, 이벤트, 티켓판매, 참가비, 구인 등)")]),a("h6",[t._v("2.4.2. 허가되지 않은 기부금품 모집 게시물")]),a("h5",[t._v("2.5. 불법적인 행위")]),a("h6",[t._v("2.5.1. 청소년유해매체물, 외설, 음란물, 음담패설, 신체사진 등과 연관된 게시물")]),a("h6",[t._v("2.5.2. 타인의 명예를 훼손하거나 모욕하는 게시물")]),a("h6",[t._v("2.5.3. 법령에 따라 금지되는 사행행위에 해당하는 내용을 포함하는 게시물")]),a("h6",[t._v("2.5.4. 법령에 따라 분류된 공무원의 행동강령에 어긋나는 내용을 포함하는 게시물")]),a("h6",[t._v("2.5.5. 고의적/비고의적으로 허위사실에 대한 내용을 포함하는 게시물")]),a("h5",[t._v("2.6. Pedagy의 운영을 방해하는 행위")]),a("h6",[t._v("2.6.1. 운영자를 사칭하는 게시물")]),a("h5",[t._v("2.7. 운영자가 판단하기에 부적합한 게시판을 개설하거나, 게시물을 올리는 경우")]),a("br"),a("h4",[t._v("토픽의 관리자 권한")]),a("br"),a("h5",[t._v("3.1. 토픽의 관리자는 자신의 게시판에 올라오는 게시물을 공지로 지정하거나 삭제, 경고할 수 있습니다.")]),a("h5",[t._v("3.2. 토픽의 관리자는 게시판에서 탈퇴할 수 없으며, 다른 회원에게 관리자 권한을 양도할 수 있습니다.")]),a("br"),a("h4",[t._v("이름바꾸기/생성시 익명 허용 여부 등")]),a("br"),a("h5",[t._v("3.3. 토픽의 관리자는 게시판 개설 후 3일이 지나지 않았거나, 14일 동안 게시물이 올라오지 않았을 때만 해당 게시판을 삭제할 수 있습니다.")]),a("br"),a("h4",[t._v("Pedagy의 신고 제도")]),a("br"),a("h5",[t._v("4.1. 회원들은 커뮤니티 이용규칙 제 1조 및 2조에 어긋난다고 생각되는 게시물을 신고 버튼을 이용하여 신고할 수 있습니다.")]),a("h5",[t._v("4.2. 모든 신고는 자동신고시스템을 통해 자동으로 처리됩니다. Pedagy의 운영자는 신고자의 요청에 따라 게시물을 삭제하지 않습니다.")]),a("h5",[t._v("4.3. 일정 수 이상의 유효 신고가 누적된 회원은 게시판의 글쓰기 제한, 게시판 접근 제한 등의 제재가 가해질 수 있습니다.")]),a("h5",[t._v("4.4. 신고 제도를 악용할 경우, 해당 신고는 처리되지 않습니다. 신고 제도를 악용한 회원은 회원 자격 및 권한에 대한 제한, 정지, 해지 등의 제재가 가해질 수 있습니다.")]),a("br"),a("h4",[t._v("허위사실 유포 및 명예훼손 게시물에 대한 게시중단 요청")]),a("br"),a("h5",[t._v("5.1. 커뮤니티 이용규칙 제 2조 5항에 따라 권리가 침해된 회원은 해당 게시물에 대해 게시중단을 요청할 수 있습니다. 이 때, "),a("a",{attrs:{href:"mailto:webmaster@pedagy.com"}},[t._v("webmaster@pedagy.com")]),t._v(" 를 통해 게시중단 요청을 전달해주시기 바랍니다.")]),a("h5",[t._v("5.2. 게시중단 요청 시 사실을 증명할 수 있는 자료를 같이 보내주셔야 합니다.")]),a("h5",[t._v("5.3. 허위사실 유포 및 명예훼손에 해당하지 않는다고 판단되는 경우, 해당 게시물은 게시중단 처리되지 않을 수 있습니다.")]),a("h5",[t._v("5.4. 허위사실 유포 및 명예훼손 게시물을 올린 회원은 관련법에 따라 처벌받을 수 있으며, Pedagy는 이에 대한 책임을 지지 않습니다.")]),a("br"),a("h4",[t._v("Pedagy의 쪽지 기능")]),a("br"),a("h5",[t._v("6.1. 쪽지는 개인 간의 사적인 대화이므로 커뮤니티 이용규칙 제 2조 1항, 2항에 해당하는 내용에 대한 제재는 가해지지 않습니다.")]),a("h5",[t._v("6.2. 광고, 스팸, 사기 등 커뮤니티 이용규칙 제 1조의 5항, 제 2조의 4항, 5항, 6항에 위배되는 내용의 쪽지를 받으셨을 경우, "),a("a",{attrs:{href:"mailto:webmaster@pedagy.com"}},[t._v("webmaster@pedagy.com")]),t._v(" 으로 문의주시기 바랍니다.")]),a("h5",[t._v("6.3. 다수의 회원에게 피해를 끼치는 쪽지를 반복적으로 발송할 경우 영구적으로 쪽지 이용에 제재가 가해질 수 있습니다.")])])],1)])],1)],1)],1)],1)},s=[],v=a("8810"),n={created:function(){this.$emit("update:layout",v["a"])},name:"Rules"},i=n,c=a("0c7c"),o=Object(c["a"])(i,r,s,!1,null,null,null);e["default"]=o.exports},cc46:function(t,e,a){"use strict";var r=a("7096"),s=a.n(r);s.a}}]);
//# sourceMappingURL=chunk-b593c526.ec70e3dd.js.map