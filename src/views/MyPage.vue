 <template>
  <component :is="$vuetify.breakpoint.smAndUp?'v-container':'div'">
    <v-layout row justify-center align-center>
      <v-card width="100%" flat>
        <v-card-title primary-title>
          <v-flex xs12>
            <h3 class="headline mb-0">내 계정 정보</h3>
            <div class="text-xs-center justify-center align-center pa-3">
              <p>
                <v-avatar :size="$vuetify.breakpoint.xsOnly?100:200">
                  <img src="@/static/img/man_1.jpg">
                </v-avatar>
              </p>
              <v-form ref="form" lazy-validation>
                <v-container fluid grid-list-xs>
                  <v-layout row wrap>
                    <v-flex sm2 xs4 py-0>
                      <v-subheader @click="focus('loungeNickName')">라운지 필명</v-subheader>
                    </v-flex>
                    <v-flex sm4 xs8 py-0>
                      <v-text-field ref="loungeNickName" placeholder="라운지 필명" @blur="checkNickName(profile.loungeNickName)" v-model="profile.loungeNickName" :error-messages="loungeNickNameErrors" :readonly="!checkLoungeNickNameUpdatable" class="mt-0 pt-0 dense" :hint="checkLoungeNickNameUpdatable?'라운지와 프로필 등에서 사용되는 필명입니다.':'마지막 수정 후 1개월 뒤에 다시 바꿀 수 있습니다.'"></v-text-field>
                    </v-flex>
                    <v-flex sm2 xs4 py-0>
                      <v-subheader @click="focus('topicNickName')">토픽 닉네임</v-subheader>
                    </v-flex>
                    <v-flex sm4 xs8 py-0>
                      <v-text-field ref="topicNickName" placeholder="토픽 닉네임" @blur="checkNickName(profile.topicNickName)" v-model="profile.topicNickName" :error-messages="topicNickNameErrors" :readonly="!checkTopicNickNameUpdatable" class="mt-0 pt-0 dense" :hint="checkLoungeNickNameUpdatable?'토픽에서 사용되는 닉네임입니다.':'마지막 수정 후 1개월 뒤에 다시 바꿀 수 있습니다.'"></v-text-field>
                    </v-flex>
                    <v-flex xs4 py-0>
                      <v-subheader @click="focus('password')">비밀번호 변경</v-subheader>
                    </v-flex>
                    <v-flex xs8 py-0>
                      <v-text-field ref="password" dense placeholder="변경할 비밀번호" v-model="password" hint="비워두면 현재 비밀번호가 유지됩니다." class="my-0 pt-0 dense"></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout row></v-layout>
                  <v-divider class="my-2"></v-divider>
                  <v-layout>
                    <v-tooltip bottom>
                      <v-switch slot="activator" class="pl-4" label="프로필 공개" v-model="profile.isOpenInfo"></v-switch>
                      <span>다른 회원들이 내 프로필(사진, 필명, 지역, 학년, 전공)을 볼 수 있습니다.</span>
                    </v-tooltip>
                  </v-layout>
                  <v-layout row>
                    <v-flex xs4>
                      <v-tooltip bottom>
                        <v-select slot="activator" :items="regionItems" v-model="profile.region" label="지역" class="dense mt-0 pt-0" disabled hide-details></v-select>
                        <span>등록된 이메일 주소로 자동선택됩니다.</span>
                      </v-tooltip>
                    </v-flex>
                    <v-flex xs4>
                      <v-tooltip bottom>
                        <v-select slot="activator" :items="majorItems" v-model="profile.major" label="전공" class="dense mt-0 pt-0" dense :disabled="!!profile.major && !checkProfileUpdatable" hide-details></v-select>
                        <span>{{!!profile.major && !checkProfileUpdatable?(isMarch?'이미 올해에 변경하셨습니다.':'매년 3월에만 변경 가능합니다.'):'해당 전공 라운지에 글을 쓸 수 있습니다.'}}</span>
                      </v-tooltip>
                    </v-flex>
                    <v-flex xs4>
                      <v-tooltip bottom>
                        <v-select slot="activator" :items="gradeItems" v-model="profile.grade" label="학년" class="dense mt-0 pt-0" dense :disabled="!!profile.grade && !checkProfileUpdatable" hide-details></v-select>
                        <span>{{!!profile.grade && !checkProfileUpdatable?(isMarch?'이미 올해에 변경하셨습니다.':'매년 3월에만 변경 가능합니다.'):'해당 학년 라운지에 글을 쓸 수 있습니다.'}}</span>
                      </v-tooltip>
                    </v-flex>
                  </v-layout>
                  <v-divider class="my-2"></v-divider>
                  <v-layout v-if="!profile.email" row>
                    <v-flex xs6>
                      <v-text-field ref="email" v-model="email" class="dense" :rules="emailRules" :error-messages="emailErrors" maxlength="90" label="이메일" hint="최대 90자" validate-on-blur @blur="checkEmail" placeholder="NEIS 이메일계정"></v-text-field>
                    </v-flex>
                    <v-flex xs6>
                      <v-autocomplete ref="emailHost" v-model="emailHost" class="dense" :items="emailHostItems" :error-messages="emailHostErrors" dense prepend-icon="alternate_email" label="NEIS 이메일 뒷자리" validate-on-blur @blur="checkEmail"></v-autocomplete>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-form>
            </div>
          </v-flex>
        </v-card-title>
        <v-card-actions pa-3>
          <v-layout :row="$vuetify.breakpoint.smAndUp" :column="$vuetify.breakpoint.xsOnly" wrap text-xs-right>
            <v-btn @click="reset" class="mt-2" flat>초기화</v-btn>
            <v-spacer></v-spacer>
            <v-btn @click="submit" color="primary" :loading="loading" class="mt-2">저장</v-btn>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-layout>
  </component>
</template>

<script>
import MainLayout from "../layouts/MainLayout";
export default {
  name: "MyPage",
  components: {},
  data() {
    return {
      loading: false,
      profile: {},
      emailHostItems: ["sen.go.kr", "goe.go.kr", "ice.go.kr", "gwe.go.kr", "cbe.go.kr", "cne.go.kr", "dje.go.kr", "sje.go.kr", "jbe.go.kr", "jne.go.kr", "gen.go.kr", "gbe.go.kr", "gne.go.kr", "use.go.kr", "pen.go.kr", "jje.go.kr"],
      regionItems: [{value: "sen.go.kr", text: "서울"}, {value: "goe.go.kr", text: "경기"}, {value: "ice.go.kr", text: "인천"}, {value: "gwe.go.kr", text: "강원"}, {value: "cbe.go.kr", text: "충북"}, {value: "cne.go.kr", text: "충남"}, {value: "dje.go.kr", text: "대전"}, {value: "sje.go.kr", text: "세종"}, {value: "jbe.go.kr", text: "전북"}, {value: "jne.go.kr", text: "전남"}, {value: "gen.go.kr", text: "광주"}, {value: "gbe.go.kr", text: "경북"}, {value: "gne.go.kr", text: "경남"}, {value: "use.go.kr", text: "울산"}, {value: "pen.go.kr", text: "부산"}, {value: "jje.go.kr", text: "제주"}],
      email: null,
      emailHost: null,
      password: null,
      gradeItems: [],
      majorItems: [],
      emailHostErrors: [],
      emailErrors: [],
      loungeNickNameErrors: [],
      topicNickNameErrors: [],
      emailRules: [v => !v || /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*/.test(v) || "이메일이 올바르지 않습니다."]
    };
  },
  computed: {
    isMarch() {
      return new Date().getMonth() === 2;
    },
    checkProfileUpdatable() {
      return (!this.profile.infoModifiedDate || this.$moment(this.profile.infoModifiedDate, "YYYYMMDD").year() < new Date().getYear()) && this.isMarch();
    },
    checkLoungeNickNameUpdatable() {
      return (
        !this.profile.loungeNickNameModifiedDate ||
        this.$moment(this.profile.loungeNickNameModifiedDate, "YYYYMMDD")
          .add(1, "months")
          .isAfter(this.$moment())
      );
    },
    checkTopicNickNameUpdatable() {
      return (
        !this.profile.topicNickNameModifiedDate ||
        this.$moment(this.profile.topicNickNameModifiedDate, "YYYYMMDD")
          .add(1, "months")
          .isAfter(this.$moment())
      );
    }
  },
  created() {
    this.$emit("update:layout", MainLayout);
    this.reset();
  },
  methods: {
    reset() {
      this.profile = this.$store.getters.profile;
    },
    checkNickName(value) {},
    checkEmail() {},
    focus(target) {
      if (this.$refs[target]) {
        this.$refs[target].focus();
      }
    },
    submit() {}
  },
  watch: {
    email() {
      if (this.emailErrors.length > 0) {
        this.emailErrors = [];
      }
    },
    emailHost() {
      if (this.emailHostErrors.length > 0) {
        this.emailHostErrors = [];
      }
    }
  }
};
</script>
<style>
.v-subheader {
  height: 32px;
}
</style>
