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
                  <img src="@/static/img/man_1.jpg"/>
                </v-avatar>
              </p>
              <v-form ref="form" lazy-validation>
                <v-container fluid grid-list-xs>
                  <v-layout row>
                    <v-flex xs4>
                      <v-subheader @click="$refs.loungeNickName.focus">라운지 필명</v-subheader>
                    </v-flex>
                    <v-flex xs8>
                      <v-tooltip bottom>
                        <v-text-field ref="loungeNickName" placeholder="라운지 필명" @blur="checkNickName(profile.loungeNickName)" v-model="profile.loungeNickName" :readonly="!checkLoungeNickNameUpdatable"></v-text-field>
                        <span>{{checkLoungeNickNameUpdatable?'라운지와 프로필 등에서 사용되는 필명입니다.':'마지막 수정 후 1개월 뒤에 다시 바꿀 수 있습니다.'}}</span>
                      </v-tooltip>
                    </v-flex>
                  </v-layout>
                  <v-layout row>
                    <v-flex xs4>
                      <v-subheader @click="$refs.topicNickName.focus">토픽 닉네임</v-subheader>
                    </v-flex>
                    <v-flex xs8>
                      <v-tooltip bottom>
                        <v-text-field ref="topicNickName" placeholder="토픽 닉네임" @blur="checkNickName(profile.topicNickName)" v-model="profile.topicNickName" :readonly="!checkTopicNickNameUpdatable"></v-text-field>
                        <span>{{checkLoungeNickNameUpdatable?'토픽에서 사용되는 닉네임명입니다.':'마지막 수정 후 1개월 뒤에 다시 바꿀 수 있습니다.'}}</span>
                      </v-tooltip>
                    </v-flex>
                  </v-layout>
                  <v-divider></v-divider>
                  <v-layout>
                    <v-switch label="프로필 공개" v-model="profile.isOpenInfo" hint="다른 회원들이 내 프로필(사진, 필명, 지역, 학년, 전공)을 볼 수 있습니다."></v-switch>
                  </v-layout>
                  <v-layout row>
                    <v-flex xs4>
                      <v-tooltip bottom>
                        <v-select :items="regionItems" v-model="profile.region" label="지역" disabled></v-select>
                        <span>이메일 주소로 자동선택됩니다.</span>
                      </v-tooltip>
                    </v-flex>
                    <v-flex xs4>
                      <v-tooltip bottom>
                        <v-select :items="majorItems" v-model="profile.major" label="전공" :disabled="!!profile.major && !checkProfileUpdatable"></v-select>
                        <span>{{!!profile.major && !checkProfileUpdatable?'해당 전공 라운지에 글을 쓸 수 있습니다.':(isMarch?'이미 올해에 변경하셨습니다.':'매년 3월에만 변경 가능합니다.')}}</span>
                      </v-tooltip>
                    </v-flex>
                    <v-flex xs4>
                      <v-tooltip bottom>
                        <v-select :items="gradeItems" v-model="profile.grade" label="학년" :disabled="!!profile.grade && !checkProfileUpdatable"></v-select>
                        <span>{{!!profile.grade && !checkProfileUpdatable?'해당 학년 라운지에 글을 쓸 수 있습니다.':(isMarch?'이미 올해에 변경하셨습니다.':'매년 3월에만 변경 가능합니다.')}}</span>
                      </v-tooltip>
                    </v-flex>
                  </v-layout>
                  <v-divider></v-divider>
                  <template v-if="!profile.email">
                    <v-flex xs6>
                      <v-text-field ref="email" v-model="email" class="dense" :rules="emailRules" :error-messages="emailErrors" maxlength="90" label="이메일" hint="최대 90자" validate-on-blur @blur="checkEmail" placeholder="NEIS 이메일계정"></v-text-field>
                    </v-flex>
                    <v-flex xs6>
                      <v-autocomplete ref="emailHost" v-model="emailHost" class="dense" :items="emailHostItems" :error-messages="emailHostErrors" dense prepend-icon="alternate_email" label="NEIS 이메일 뒷자리" validate-on-blur @blur="checkEmail"></v-autocomplete>
                    </v-flex>
                  </template>
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
  components: {
  },
  data() {
    return {
      profile:{}
    };
  },
  computed:{
    isMarch(){
      return new Date().getMonth() === 2
    },
    checkProfileUpdatable(){
      return (!this.profile.infoModifiedDate || this.$moment(this.profile.infoModifiedDate, 'YYYYMMDD').year() < new Date().getYear()) && this.isMarch()
    },
    checkLoungeNickNameUpdatable(){
      return !this.profile.loungeNickNameModifiedDate || this.$moment(this.profile.loungeNickNameModifiedDate, 'YYYYMMDD').add(1, 'months').isAfter(this.$moment())
    },
    checkTopicNickNameUpdatable(){
      return !this.profile.topicNickNameModifiedDate || this.$moment(this.profile.topicNickNameModifiedDate, 'YYYYMMDD').add(1, 'months').isAfter(this.$moment())
    }
  },
  created() {
    this.$emit("update:layout", MainLayout);
    this.reset()
  },
  methods: {
    reset(){
      this.profile = this.$store.getters.profile;
    },
    checkNickName(value){
      
    },
    
  }
};
</script>
<style>
</style>
