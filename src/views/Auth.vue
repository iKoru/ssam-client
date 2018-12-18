 <template>
  <v-container fluid>
    <v-content>
      <v-btn @click="notToday">오늘 더이상 보지 않기</v-btn>
      <v-btn @click="goMain">메인 페이지로 가기</v-btn>
      인증을 해야합니다. 안쓰면 사용이 제한될거에용
      <v-img src="@/static/img/index.jpg" lazy-src="@/static/img/index.jpg">
        <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
          <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
        </v-layout>
      </v-img>
    </v-content>
  </v-container>
</template>

<script>
import MainLayout from "../layouts/MainLayout";
export default {
  name: "Auth",
  created() {
    this.$emit("update:layout", MainLayout);
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
  computed:{
    status(){
      return this.$store.getters.status;
    }
  },
  methods: {
    goMain(){
      this.$router.push('/');
    },
    notToday(){
      console.log(this, this.$moment)
      localStorage.setItem('authRequirement', this.$moment(new Date()).format('YYYYMMDD'));
      this.$router.push('/');
    }
  }
};
</script>
