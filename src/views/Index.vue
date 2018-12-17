 <template>
  <v-container fluid>
    <v-navigation-drawer right v-model="rightDrawer" app permanent v-if="$vuetify.breakpoint.mdAndUp">
      <v-flex align-center justify-center text-xs-center>
        <v-img src="@/assets/logo.png" height="30" contain class="d-inline-flex" alt="pedagy 로고"></v-img>
        <span>pedagy</span>
      </v-flex>
      <Signin/>
      <BoardExtractor/>
    </v-navigation-drawer>

    <v-content>
      <v-img src="@/static/img/index.jpg" lazy-src="@/static/img/index.jpg">
        <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
          <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
        </v-layout>
      </v-img>
    </v-content>
  </v-container>
</template>

<script>
import IndexLayout from "../layouts/IndexLayout";
export default {
  components: {
    Signin: () => import("@/components/Signin.vue"),
    BoardExtractor: () => import("@/components/board/BoardExtractor.vue")
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
