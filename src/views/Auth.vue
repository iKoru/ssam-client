 <template>
  <v-container>
    <v-layout>
      <v-layout row height="200px" justify-center align-center>
        <v-card width="100%" flat>
          <v-img src="@/static/img/index.jpg" aspect-ratio="2.75"></v-img>
          <v-card-title primary-title>
            <v-flex xs12>
              <h3 class="headline mb-0">교사 인증</h3>
              <div class="text-xs-center justify-center align-center pa-3">
                <p>인증을 해야합니다. 안쓰면 사용이 제한될거에용
                  <br>히히히
                </p>
              </div>
            </v-flex>
          </v-card-title>
          <v-card-actions pa-3>
            <v-btn @click="notToday" :loading="loading">오늘 더이상 보지 않기</v-btn>
            <v-btn @click="goMain" :loading="loading">메인 페이지로 가기</v-btn>
            <v-spacer></v-spacer>
            <v-btn @click="sendAuth" color="primary" :loading="loading">인증메일 보내기</v-btn>
          </v-card-actions>
        </v-card>
      </v-layout>
    </v-layout>
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
      loading: false
    };
  },
  methods: {
    goMain() {
      this.$router.push("/");
    },
    notToday() {
      console.log(this, this.$moment);
      localStorage.setItem("authRequirement", this.$moment(new Date()).format("YYYYMMDD"));
      this.$router.push(decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent("redirectTo").replace(/[.+*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1")) || "/");
    },
    sendAuth() {
      this.loading = true;
      this.$axios
        .post("/auth", null, {headers: {silent: true}})
        .then(response => {
          this.$store.dispatch("showSnackbar", {text: "등록된 메일주소로 인증 메일을 보냈습니다. 메일을 확인해주세요.", color: "info"});
          this.$router.push(decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent("redirectTo").replace(/[.+*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1")) || "/");
        })
        .catch(error => {
          if (error.response) {
            this.$store.dispatch("showSnackbar", {text: error.response.data.message || "인증 메일을 보내지 못했습니다.", color: "error"});
          }
          this.$router.push(decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent("redirectTo").replace(/[.+*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1")) || "/");
        });
    }
  }
};
</script>
