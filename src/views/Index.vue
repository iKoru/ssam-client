 <template>
  <div class="fill-height">
    <v-layout fill-height grid-list-sm fluid :column="$vuetify.breakpoint.smAndDown">
      <v-flex>
        <div id="indexContents">
          <v-parallax id="indexImage" src="@/static/img/index.jpg" v-if="$vuetify.breakpoint.mdAndUp" height="500">
            <v-layout align-center column justify-center>
              <h1 class="display-2 font-weight-thin mb-3">Pedagy</h1>
              <h4 class="subheading">선생님들의 노다지</h4>
            </v-layout>
          </v-parallax>
          <v-layout v-if="$vuetify.breakpoint.mdAndUp" align-center justify-center text-xs-center row wrap class="px-5" style="height:calc(100% - 500px);min-height:236px;">
            <v-flex my-auto py-3>
              <p>
                <span class="title">
                  전국 초&middot;중&middot;고등학교 교사들이 모인다,
                  <span class="primary--text font-weight-bold">페다지</span>
                </span>
              </p>
              <p>
                <span class="body-1">
                  페다지는
                  <b>인증</b>을 거친 전 &middot; 현직 교사들만의 대화를 위한
                  <b>지역&middot;학년&middot;전공별 라운지</b>와
                  <br>각종 학습자료들을 공유하는
                  <b>아카이브</b>,
                  <br>그리고 관심사에 대한 게시판을 직접 만들고 운영할 수 있는
                  <b>토픽</b>으로 구성된 커뮤니티 플랫폼입니다.
                </span>
              </p>
              <p class="pt-3">
                <span class="title">
                  <span class="primary--text font-weight-bold">페다지</span>란?
                </span>
              </p>
              <p class="mb-0">
                <!--prettyhtml-ignore-->
                <span class="body-1">교육을 근대과학적 방법으로 연구하고, 그 성과를 체계화하여 정리한 교육학이라는 의미의
                  <br>영어 '<b>pedagogy</b>'의 줄임말입니다.
                </span>
              </p>
            </v-flex>
          </v-layout>
        </div>
        <main-footer :class="{withAside:$vuetify.breakpoint.mdAndUp}"></main-footer>
      </v-flex>
      <v-flex align-center justify-center text-xs-center id="rightDrawer">
        <div id="signinContainer" class="mx-auto">
          <v-img src="@/assets/logo.png" height="30" contain class="d-inline-flex" alt="Pedagy 로고"></v-img>
          <span v-if="$vuetify.breakpoint.mdAndUp">Pedagy</span>
          <h1 v-else>Pedagy</h1>
          <Signin/>
          <div class="text-xs-left">
            <BoardExtractor boardType="L"/>
          </div>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import IndexLayout from "../layouts/IndexLayout";
import MainFooter from "../components/MainFooter";
export default {
  components: {
    Signin: () => import("@/components/Signin.vue"),
    BoardExtractor: () => import("@/components/board/BoardExtractor.vue"),
    MainFooter
  },
  name: "Index",
  created() {
    this.$emit("update:layout", IndexLayout);
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
<style>
#indexImage {
  max-height: calc(100vh - 53px);
}
#rightDrawer {
  background-color: white;
}
@media (min-width: 960px) {
  #rightDrawer {
    width: 350px;
    border-left: 1px solid rgba(0, 0, 0, 0.12);
    position: fixed;
    right: 0;
    height: 100%;
  }
  #indexContents {
    margin-right: 350px;
    height: 100%;
  }
  .withAside {
    width: calc(100% - 350px);
  }
}
@media (max-width: 959px) {
  #signinContainer {
    max-width: 400px;
    margin-bottom: 5rem;
  }
}
</style>
