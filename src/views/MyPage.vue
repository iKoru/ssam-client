 <template>
  <v-container>
    <v-layout row justify-center align-center>
      <v-card width="100%" flat>
        <v-card-title primary-title>
          <v-flex xs12>
            <h3 class="headline mb-0">내 계정 정보</h3>
            <div :class="{'text-xs-center':true, 'justify-center':true, 'align-center':true, 'pa-3':$vuetify.breakpoint.smAndUp}">
              <p>
                <component :is="$vuetify.breakpoint.xsOnly?'v-bottom-sheet':'v-menu'" v-model="bottomSheet" absolute offset-y v-if="profile.picturePath">
                  <v-avatar :size="$vuetify.breakpoint.xsOnly?100:200" class="cursor-pointer" slot="activator" title="클릭하여 이미지 변경 또는 삭제">
                    <img :src="webUrl+ profile.picturePath" alt="프로필 이미지">
                  </v-avatar>
                  <v-list>
                    <v-list-tile @click="deleteProfilePath">
                      <v-list-tile-title>프로필 사진 삭제</v-list-tile-title>
                    </v-list-tile>
                    <v-list-tile @click="bottomSheet = false;dialog=true">
                      <v-list-tile-title>프로필 사진 변경</v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </component>
                <v-avatar :size="$vuetify.breakpoint.xsOnly?100:200" class="cursor-pointer" @click="dialog = true" title="클릭하여 이미지 등록" v-else>
                  <img :src="require('@/static/img/defaultUser.png')" alt="기본 프로필 이미지">
                </v-avatar>
              </p>
              <v-form ref="form" lazy-validation>
                <v-container fluid grid-list-xs>
                  <v-layout row wrap>
                    <v-flex sm2 xs4 py-0>
                      <v-subheader @click="focus('loungeNickName')">라운지 필명</v-subheader>
                    </v-flex>
                    <v-flex sm4 xs8 py-0>
                      <v-text-field ref="loungeNickName" placeholder="라운지 필명" :rules="nickNameRules" @keydown.enter.stop="submit" @blur="checkNickName('loungeNickName')" v-model="profile.loungeNickName" :error-messages="loungeNickNameErrors" :readonly="!checkLoungeNickNameUpdatable" class="mt-0 pt-0 dense" :hint="checkLoungeNickNameUpdatable?'라운지와 프로필 등에서 사용되는 필명입니다.':'마지막 수정 후 1개월 뒤에 다시 바꿀 수 있습니다.'"></v-text-field>
                    </v-flex>
                    <v-flex sm2 xs4 py-0>
                      <v-subheader @click="focus('topicNickName')">토픽 닉네임</v-subheader>
                    </v-flex>
                    <v-flex sm4 xs8 py-0>
                      <v-text-field ref="topicNickName" placeholder="토픽 닉네임" :rules="nickNameRules" @keydown.enter.stop="submit" @blur="checkNickName('topicNickName')" v-model="profile.topicNickName" :error-messages="topicNickNameErrors" :readonly="!checkTopicNickNameUpdatable" class="mt-0 pt-0 dense" :hint="checkTopicNickNameUpdatable?'토픽에서 사용되는 닉네임입니다.':'마지막 수정 후 1개월 뒤에 다시 바꿀 수 있습니다.'"></v-text-field>
                    </v-flex>
                    <v-flex xs4 py-0>
                      <v-subheader @click="focus('password')">비밀번호 변경</v-subheader>
                    </v-flex>
                    <v-flex xs8 py-0>
                      <v-text-field ref="password" dense placeholder="변경할 비밀번호" type="password" @keydown.enter.stop="submit" :rules="passwordRules" v-model="password" hint="비워두면 현재 비밀번호가 유지됩니다." class="my-0 pt-0 dense"></v-text-field>
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
                        <v-text-field slot="activator" v-model="profile.region" label="지역" class="mt-0 pt-0" disabled hint="NEIS이메일로 자동선택됩니다." hide-details></v-text-field>
                        <span>NEIS이메일로 자동선택됩니다.</span>
                      </v-tooltip>
                    </v-flex>
                    <v-flex xs4>
                      <v-tooltip bottom>
                        <v-select slot="activator" :items="majorItems" v-model="major" label="전공" class="dense mt-0 pt-0" dense :disabled="!checkProfileUpdatable" hide-details></v-select>
                        <span>{{!checkProfileUpdatable?(isMarch?'이미 올해에 변경하셨습니다.':'매년 3월에만 변경 가능합니다.'):'해당 전공 라운지에 글을 쓸 수 있습니다.'}}</span>
                      </v-tooltip>
                    </v-flex>
                    <v-flex xs4>
                      <v-tooltip bottom>
                        <v-select slot="activator" :items="gradeItems" v-model="grade" label="학년" class="dense mt-0 pt-0" dense :disabled="!checkProfileUpdatable" hide-details></v-select>
                        <span>{{!checkProfileUpdatable?(isMarch?'이미 올해에 변경하셨습니다.':'매년 3월에만 변경 가능합니다.'):'해당 학년 라운지에 글을 쓸 수 있습니다.'}}</span>
                      </v-tooltip>
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
      <v-dialog v-model="dialog" width="500">
        <v-card>
          <v-card-title class="headline" primary-title>
            <span>{{profile.picturePath? '프로필 사진 변경':'프로필 사진 등록'}}</span>
            <v-spacer/>
            <v-icon @click="dialog = false">close</v-icon>
          </v-card-title>
          <v-card-text>
            <file-pond name="picture" ref="pond" :server="server" accepted-file-types="image/*"/>
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-layout v-show="dialog"></v-layout>
    </v-layout>
  </v-container>
</template>

<script>
import MainLayout from "../layouts/MainLayout";
import vueFilePond, {setOptions} from "vue-filepond";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type/dist/filepond-plugin-file-validate-type.esm.js";

const FilePond = vueFilePond(FilePondPluginFileValidateType);
setOptions({
  labelIdle: "이미지를 여기로 끌어다놓거나 여기를 클릭하여 올려주세요.(200KB 이내)",
  labelFileWaitingForSize: "파일의 크기를 확인중입니다...",
  labelFileSizeNotAvailable: "파일의 크기를 확인할 수 없습니다.",
  labelFileLoading: "이미지를 불러오는 중...",
  labelFileLoadError: "이미지를 불러오지 못헀습니다.",
  labelFileProcessing: "서버로 업로드중...",
  labelFileProcessingComplete: "이미지를 서버로 업로드하였습니다.",
  labelFileProcessingAborted: "업로드가 취소되었습니다.",
  labelFileProcessingError: "이미지를 업로드하지 못했습니다.",
  labelTapToCancel: "",
  labelTapToRetry: "재시도",
  labelTapToUndo: "",
  labelButtonRemoveItem: "삭제",
  labelButtonAbortItemLoad: "중지",
  labelButtonRetryItemLoad: "재시도",
  labelButtonAbortItemProcessing: "취소",
  labelButtonUndoItemProcessing: "재시도",
  labelButtonProcessItem: "업로드",
  labelFileTypeNotAllowed: "허용된 파일 형식이 아닙니다.",
  fileValidateTypeLabelExpectedTypes: "jpg, png, gif, png 등 이미지 파일만 업로드 가능합니다."
});
export default {
  name: "MyPage",
  components: {
    FilePond
  },
  data() {
    return {
      loading: false,
      dialog: false,
      profile: {},
      grade: null,
      major: null,
      password: null,
      gradeItems: [],
      majorItems: [],
      loungeNickNameErrors: [],
      topicNickNameErrors: [],
      passwordRules: [v => !v || (v.length > 3 && v.length < 26) || "4~25자"],
      nickNameRules: [v => (!!v && v !== "") || "닉네임/필명을 입력해주세요.", v => (!!v && v.length > 3 && v.length <= 50) || "4~50자로 입력해주세요."],
      bottomSheet: false,
      server: {
        process: (fieldName, file, metadata, load, error, progress, abort) => {
          if (file.size > 200 * 1024) {
            this.$store.dispatch("showSnackbar", {text: "이미지는 200KB 이내만 업로드할 수 있습니다.", color: "error"});
            abort();
            return;
          }
          const formData = new FormData();
          formData.append("picture", file, file.name);
          this.$axios
            .post("/user/picture", formData)
            .then(response => {
              this.profile.picturePath = response.data.picturePath;
              this.dialog = false;
              this.$store.dispatch("updateProfile", {picturePath: this.profile.picturePath});
              load();
            })
            .catch(error => {
              abort();
              this.$store.dispatch("showSnackbar", {text: `${error.response ? error.response.data.message : "프로필 이미지를 업로드하지 못했습니다."}`, color: "error"});
            });
          return {load, error, progress, abort};
        }
      },
      labels: {}
    };
  },
  computed: {
    isMarch() {
      return process.env.NODE_ENV === "development" || new Date().getMonth() === 2;
    },
    checkProfileUpdatable() {
      return (!this.profile.infoModifiedDate || this.$moment(this.profile.infoModifiedDate, "YYYYMMDD").year() < new Date().getYear()) && this.isMarch;
    },
    checkLoungeNickNameUpdatable() {
      return (
        !this.profile.loungeNickNameModifiedDate ||
        this.$moment(this.profile.loungeNickNameModifiedDate, "YYYYMMDD")
          .add(1, "months")
          .isBefore(this.$moment())
      );
    },
    checkTopicNickNameUpdatable() {
      return (
        !this.profile.topicNickNameModifiedDate ||
        this.$moment(this.profile.topicNickNameModifiedDate, "YYYYMMDD")
          .add(1, "months")
          .isBefore(this.$moment())
      );
    },
    webUrl() {
      return process.env.VUE_APP_WEB_URL;
    }
  },
  created() {
    this.$emit("update:layout", MainLayout);
    this.reset();
    this.$axios
      .get("/group", {params: {groupType: ["M", "G"]}, headers: {silent: true}})
      .then(response => {
        if (this.checkProfileUpdatable) {
          this.majorItems = response.data.filter(x => x.groupType === "M").map(x => ({text: x.groupName, value: x.groupId}));
          this.majorItems.splice(0, 0, {text: "(미지정)", value: null});
          this.gradeItems = response.data.filter(x => x.groupType === "G").map(x => ({text: x.groupName, value: x.groupId}));
          this.gradeItems.splice(0, 0, {text: "(미지정)", value: null});
        } else {
          this.majorItems = response.data.filter(x => x.groupType === "M" && x.groupId === this.profile.major).map(x => ({text: x.groupName, value: x.groupId}));
          this.majorItems.splice(0, 0, {text: "(미지정)", value: null});
          this.gradeItems = response.data.filter(x => x.groupType === "G" && x.groupId === this.profile.grade).map(x => ({text: x.groupName, value: x.groupId}));
          this.gradeItems.splice(0, 0, {text: "(미지정)", value: null});
        }
      })
      .catch(error => {
        console.log(error);
        this.$store.dispatch("showSnackbar", {text: `전공, 학년 목록을 가져오지 못했습니다.${error && error.response && error.response.data ? "[" + error.response.data.message + "]" : ""}`});
      });
  },
  methods: {
    reset() {
      this.profile = Object.assign({}, this.$store.getters.profile);
      if (this.profile.major === undefined) {
        this.major = null;
      } else {
        this.major = this.profile.major;
      }
      if (this.profile.grade === undefined) {
        this.grade = null;
      } else {
        this.grade = this.profile.grade;
      }
      this.password = null;
    },
    checkNickName(target, callback) {
      let errors, nickName;
      switch (target) {
        case "loungeNickName":
          errors = this.loungeNickNameErrors;
          nickName = this.profile.loungeNickName;
          this.$refs.loungeNickName.validate();
          break;
        case "topicNickName":
          errors = this.topicNickNameErrors;
          nickName = this.profile.topicNickName;
          this.$refs.topicNickName.validate();
          break;
        default:
          if (typeof callback === "function") {
            callback.call(this);
          }
          return;
      }
      if (errors.length === 0 && nickName !== this.$store.getters.profile[target]) {
        this.$axios
          .get("/nickName", {params: {nickName: nickName}, headers: {silent: true}})
          .then(() => {
            if (typeof callback === "function") {
              callback.call(this);
            }
          })
          .catch(error => {
            errors.push(error.response ? error.response.data.message || "사용할 수 없는 닉네임/필명입니다." : "사용할 수 없는 닉네임/필명입니다.");
            if (typeof callback === "function") {
              callback.call(this);
            }
          });
      } else if (typeof callback === "function") {
        callback.call(this);
      }
    },
    focus(target) {
      if (this.$refs[target]) {
        this.$refs[target].focus();
      }
    },
    submit() {
      if (this.$refs.form.validate()) {
        this.checkNickName("topicNickName", () => {
          this.checkNickName("loungeNickName", () => {
            if (this.loungeNickNameErrors.length === 0 && this.topicNickNameErrors.length === 0) {
              let params = {};
              const origin = this.$store.getters.profile;
              if (this.profile.topicNickName !== origin.topicNickName) {
                this.checkNickName("topicNickName");
                params.topicNickName = this.profile.topicNickName;
              }
              if (this.profile.loungeNickName !== origin.loungeNickName) {
                this.checkNickName("loungeNickName");
                params.loungeNickName = this.profile.loungeNickName;
              }
              if (this.profile.isOpenInfo !== origin.isOpenInfo) {
                params.isOpenInfo = this.profile.isOpenInfo;
              }
              if (this.major !== origin.major && !(this.major === null && origin.major === undefined) && this.checkProfileUpdatable) {
                params.major = this.major;
              }
              if (this.grade !== origin.grade && !(this.grade === null && origin.grade === undefined) && this.checkProfileUpdatable) {
                params.grade = this.grade;
              }
              if (this.password && this.password !== "") {
                params.password = this.password;
              }
              if (Object.keys(params).length > 0) {
                if (params.major !== undefined || params.grade !== undefined) {
                  if (!confirm(`전공을 ${params.major && this.majorItems.find(x => x.value === params.major) ? this.majorItems.find(x => x.value === params.major).text + "로 지정" : "지정해제"}, 학년을 ${params.grade && this.gradeItems.find(x => x.value === params.grade) ? this.gradeItems.find(x => x.value === params.grade).text + "로 지정" : "지정해제"}하시겠습니까?\n한 번 변경하면 올해에는 추가로 변경이 불가능하니, 신중히 선택해주세요.`)) {
                    return;
                  }
                }
                this.loading = true;
                this.$axios
                  .put("/user", params)
                  .then(response => {
                    this.password = null;
                    this.loading = false;
                    this.$store.dispatch("showSnackbar", {text: "내 정보를 변경하였습니다.", color: "success"});
                    if (params.major !== undefined || params.grade !== undefined) {
                      params.infoModifiedDate = this.$moment().format("YYYYMMDD");
                      this.profile.infoModifiedDate = params.infoModifiedDate;
                    }
                    if (params.topicNickName) {
                      params.topicNickNameModifiedDate = this.$moment().format("YYYYMMDD");
                      this.profile.topicNickNameModifiedDate = params.topicNickNameModifiedDate;
                    }
                    if (params.loungeNickName) {
                      params.loungeNickNameModifiedDate = this.$moment().format("YYYYMMDD");
                      this.profile.loungeNickNameModifiedDate = params.loungeNickNameModifiedDate;
                    }
                    this.$store.dispatch("updateProfile", params);
                  })
                  .catch(error => {
                    this.loading = false;
                    this.$store.dispatch("showSnackbar", {text: `정보를 변경하지 못했습니다.${error.response ? "[" + error.response.data.message + "]" : ""}`, color: "error"});
                    console.log(error);
                  });
              } else {
                this.$store.dispatch("showSnackbar", {text: "변경된 내용이 없습니다."});
              }
            }
          });
        });
      } else {
        this.$store.dispatch("showSnackbar", {text: "변경할 정보를 확인해주세요.", color: "error"});
      }
    },
    deleteProfilePath() {
      this.$axios
        .put("/user", {picturePath: ""})
        .then(response => {
          this.$store.dispatch("updateProfile", {picturePath: null});
          this.profile.picturePath = null;
        })
        .catch(error => {
          console.log(error);
          this.$store.dispatch("showSnackbar", {text: `${error.response ? error.response.data.message : "프로필 이미지를 삭제하지 못했습니다."}`, color: "error"});
        });
      this.bottomSheet = false;
    }
  },
  watch: {
    "profile.loungeNickName"() {
      if (this.loungeNickNameErrors.length > 0) {
        this.loungeNickNameErrors = [];
      }
    },
    "profile.topicNickName"() {
      if (this.topicNickNameErrors.length > 0) {
        this.topicNickNameErrors = [];
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
