 <template>
   <div>
    <v-layout fill-height grid-list-sm fluid :column="$vuetify.breakpoint.smAndDown">
      <v-flex>
        <v-img id="indexImage" src="@/static/img/index.jpg" lazy-src="@/static/img/index.jpg">
          <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
            <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
          </v-layout>
        </v-img>
        <!--<template v-if="$vuetify.breakpoint.smAndDown">
          <v-card flat>
            <v-card-title>
              <div xs12>
                <span class="headline">Pedagy 로그인</span>
              </div>
            </v-card-title>
            <Signin/>
          </v-card>
          <BoardExtractor/>
        </template>-->
        <main-footer></main-footer>
      </v-flex>
      <v-flex align-center justify-center text-xs-center id="rightDrawer">
        <div id="signinContainer" class="mx-auto">
          <v-img src="@/assets/logo.png" height="30" contain class="d-inline-flex" alt="pedagy 로고"></v-img>
          <span>pedagy</span>
          <Signin/>
          <BoardExtractor/>
        </div>
      </v-flex>
    </v-layout>
    <!--<v-navigation-drawer right v-model="rightDrawer" absolute permanent v-if="$vuetify.breakpoint.mdAndUp">
      <v-flex align-center justify-center text-xs-center>
        <v-img src="@/assets/logo.png" height="30" contain class="d-inline-flex" alt="pedagy 로고"></v-img>
        <span>pedagy</span>
      </v-flex>
      <Signin/>
      <BoardExtractor/>
    </v-navigation-drawer>-->
     
   </div>
</template>

<script>
import IndexLayout from "../layouts/IndexLayout";
import MainFooter from '../components/MainFooter'
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
    return {
      clipped: false,
      drawer: true,
      items: [
        {
          icon: "mdi-chart-bubble",
          title: "Inspire"
        }
      ],
      miniVariant: false,
      rightDrawer: true,
      title: "pedagy"
    };
  },
  methods: {}
};
</script>
<style>
  #indexImage{
    max-height:calc(100vh - 53px);
  }
  @media(min-width:960px){
    #rightDrawer{
      max-width:300px;
    }
  }
  @media(max-width:959px){
    #signinContainer{
      max-width:400px; 
      margin-bottom:5rem;
      margin-top:2rem;
    }
  }
</style>