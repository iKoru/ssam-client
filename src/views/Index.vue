 <template>
  <div>
    <v-layout fill-height grid-list-sm fluid :column="$vuetify.breakpoint.smAndDown">
      <v-flex>
        <div id="indexContents">
          <v-parallax id="indexImage" src="@/static/img/index.jpg" v-if="$vuetify.breakpoint.mdAndUp">
            <v-layout align-center column justify-center>
              <h1 class="display-2 font-weight-thin mb-3">Pedagy</h1>
              <h4 class="subheading">선생님들의 노다지</h4>
            </v-layout>
          </v-parallax>
          <v-layout v-if="$vuetify.breakpoint.mdAndUp" align-center justify-center text-xs-center fill-height>
            <div>사이트 소개 글 내용이 들어갈 자리입니당.</div>
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
          <BoardExtractor boardType="L"/>
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
    margin-bottom: 52px;
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