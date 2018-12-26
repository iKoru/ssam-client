<template id="myBoard">
  <v-card flat>
    <v-card-title primary-title>
      <v-layout column>
        <v-layout row wrap>
          <v-flex xs12 sm6 lg5 v-if="lounges.length > 0" :class="{'mt-5':$vuetify.breakpoint.xsOnly, 'pr-2':$vuetify.breakpoint.mdAndUp, 'ml-auto':true}">
            <v-layout row class="titleRow">
              <span class="title">라운지</span>
            </v-layout>
            <span class="ellipsis subtitle">신고로 인해 쓰기/읽기가 제한된 라운지만 보여집니다.</span>
            <v-divider class="my-3"/>
            <v-list dense>
              <v-list-tile v-for="lounge in lounges" :key="lounge.boardId">
                <v-layout row>
                  <v-flex class="ellipsis">
                    <div class="vertical-center ellipsis">
                      {{lounge.boardName}}
                      <v-icon v-if="lounge.isOwner" title="라운지지기">person</v-icon>
                    </div>
                  </v-flex>
                  <v-spacer/>
                  <v-tooltip v-if="lounge.writeRestrictDate" bottom>
                    <v-chip slot="activator" color="red" text-color="white" small>쓰기제한</v-chip>
                    <span>{{$moment(lounge.writeRestrictDate, 'YYYYMMDD').format('YYYY년 M월 D일까지')}}</span>
                  </v-tooltip>
                  <v-tooltip v-if="lounge.readRestrictDate" bottom>
                    <v-chip slot="activator" color="red" text-color="white" small>읽기제한</v-chip>
                    <span>{{$moment(lounge.readRestrictDate, 'YYYYMMDD').format('YYYY년 M월 D일까지')}}</span>
                  </v-tooltip>
                </v-layout>
              </v-list-tile>
            </v-list>
          </v-flex>
          <v-flex xs12 :sm6="lounges.length > 0" :sm9="lounges.length === 0" :lg5="lounges.length > 0" :lg8="lounges.length === 0" :class="{'pl-2':$vuetify.breakpoint.mdAndUp, 'mr-auto':true, 'ml-auto':lounges.length === 0}">
            <v-layout row :class="{'titleRow':true, 'mb-2':lounges.length === 0}">
              <span :class="{'title':lounges.length > 0, 'headline':lounges.length===0}">토픽</span>
              <v-spacer/>
              <v-btn id="createTopic" small @click="openDialog" color="accent" :class="{'my-0':true, 'ml-0':true, 'mr-0':$vuetify.breakpoint.xsOnly}" title="새로운 토픽을 만들 수 있습니다.">토픽만들기</v-btn>
              <br>
            </v-layout>
            <span class="ellipsis subtitle">드래그하여 순서를 변경할 수 있습니다.</span>
            <v-divider class="my-3"/>
            <draggable v-model="topics" v-if="topics.length > 0">
              <transition-group>
                <v-layout class="cursor-move" row v-for="(topic, index) in topics" :key="topic.boardId">
                  <v-flex class="ellipsis">
                    <div class="vertical-center ellipsis">
                      {{topic.boardName}}
                      <v-icon v-if="topic.isOwner" title="토픽지기">person</v-icon>
                    </div>
                  </v-flex>
                  <v-spacer/>
                  <template v-if="!topic.readRestrictDate && !topic.writeRestrictDate">
                    <v-btn flat v-if="!topic.isOwner" primary small class="mx-0" @click="removeItem(index)">구독해제</v-btn>
                    <v-btn flat v-else primary small class="mx-0" @click="manageBoard(topic.boardId)" title="내가 토픽지기인 토픽은 구독해제할 수 없습니다.">토픽관리</v-btn>
                  </template>
                  <template v-else>
                    <v-tooltip v-if="topic.writeRestrictDate" bottom>
                      <v-chip slot="activator" color="red" text-color="white" small>쓰기제한</v-chip>
                      <span>{{$moment(topic.writeRestrictDate, 'YYYYMMDD').format('YYYY년 M월 D일까지')}}</span>
                    </v-tooltip>
                    <v-tooltip v-if="topic.readRestrictDate" bottom>
                      <v-chip slot="activator" color="red" text-color="white" small>읽기제한</v-chip>
                      <span>{{$moment(topic.readRestrictDate, 'YYYYMMDD').format('YYYY년 M월 D일까지')}}</span>
                    </v-tooltip>
                  </template>
                </v-layout>
              </transition-group>
            </draggable>
            <v-layout v-else>아직 구독하고 있는 토픽이 없네요.
              <br>새로운 토픽을 구독해보세요!
            </v-layout>
          </v-flex>
        </v-layout>
      </v-layout>
      <v-dialog v-model="dialog" :fullscreen="$vuetify.breakpoint.xsOnly" :transition="$vuetify.breakpoint.xsOnly?'dialog-bottom-transition':'fade-transition'" lazy scrollable max-width="700px">
        <topic-creator @closeDialog="closeDialog" @resetBoard="resetBoard"/>
      </v-dialog>
    </v-card-title>
    <v-card-actions pa-3>
      <v-layout :row="$vuetify.breakpoint.smAndUp" :column="$vuetify.breakpoint.xsOnly" wrap text-xs-right>
        <v-btn @click="reset" class="mt-2" flat>초기화</v-btn>
        <v-spacer></v-spacer>
        <v-btn @click="save" color="primary" :loading="loading" class="mt-2">저장</v-btn>
      </v-layout>
    </v-card-actions>
  </v-card>
</template>
<script>
import draggable from "vuedraggable";
import TopicCreator from "./TopicCreator";
export default {
  name: "MyBoard",
  components: {
    draggable,
    TopicCreator
  },
  data() {
    return {
      loading: false,
      dialog: false,
      topics: [],
      lounges: [],
      originalTopics: []
    };
  },
  methods: {
    reset() {
      this.topics = JSON.parse(JSON.stringify(this.originalTopics));
    },
    isDirty() {
      if (this.topics.length !== this.originalTopics.length) {
        return true;
      }
      let i = 0;
      while (i < this.topics.length) {
        if (this.topics[i].boardId !== this.originalTopics[i].boardId) {
          return true;
        }
        i++;
      }
      return false;
    },
    save() {
      if (!this.isDirty()) {
        this.$store.dispatch("showSnackbar", {text: "변경된 내용이 없습니다.", color: "info"});
        return;
      }
      this.loading = true;
      this.$axios
        .put("/user/board", {boards: this.topics.map((item, index) => ({orderNumber: index + 1, boardId: item.boardId}))})
        .then(responose => {
          this.loading = false;
          this.originalTopics = JSON.parse(JSON.stringify(this.topics));
          this.reset();
          this.$store.dispatch("showSnackbar", {text: "변경 내용을 반영하였습니다.", color: "success"});
        })
        .catch(error => {
          console.log(error);
          this.loading = false;
          this.$store.dispatch("showSnackbar", {text: error.response ? error.response.data.message || "변경 내용을 반영하지 못했습니다." : "변경내용을 반영하지 못했습니다.", color: "error"});
        });
    },
    removeItem(index) {
      this.topics.splice(index, 1);
    },
    openDialog() {
      if (this.$store.getters.profile.status !== "AUTHORIZED") {
        this.$store.dispatch("showSnackbar", {text: "인증을 받은 회원만 토픽을 만들 수 있습니다.", color: "error"});
        return;
      }
      document.body.style.position = "fixed";
      this.dialog = true;
    },
    closeDialog() {
      document.body.style.position = "initial";
      this.dialog = false;
    },
    resetBoard() {
      this.$axios
        .get("/user/board")
        .then(response => {
          console.log(response);
          this.originalTopics = response.data.filter(x => x.boardType === "T");
          this.lounges = response.data.filter(x => x.boardType !== "T");
          this.reset();
        })
        .catch(error => {
          console.log(error);
          this.$store.dispatch("showSnackbar", {text: error.response ? error.response.data.message || "구독 게시판 목록을 불러오지 못했습니다." : "구독 게시판 목록을 불러오지 못했습니다.", color: "error"});
        });
    },
    manageBoard(boardId) {
      this.$router.push("/board/" + boardId);
    }
  },
  mounted() {
    console.log("load topics and lounges...");
    this.$axios
      .get("/user/board")
      .then(response => {
        console.log(response);
        this.originalTopics = response.data.filter(x => x.boardType === "T");
        this.lounges = response.data.filter(x => x.boardType !== "T");
        this.reset();
      })
      .catch(error => {
        console.log(error);
        this.$store.dispatch("showSnackbar", {text: error.response ? error.response.data.message || "구독 게시판 목록을 불러오지 못했습니다." : "구독 게시판 목록을 불러오지 못했습니다.", color: "error"});
      });
  },
  render(h) {
    return h("myBoard", {attrs: {id: "app"}}, this.draggable);
  }
};
</script>
<style>
.cursor-move {
  height: 40px;
}
.subtitle {
  display: block;
}
.v-tooltip .v-chip {
  margin-top: 8px;
  margin-bottom: 8px;
}
.titleRow {
  height: 24px;
}
#createTopic {
  top: -4px;
}
</style>