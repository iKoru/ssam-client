<template>
  <v-card tile>
    <v-toolbar card color="primary">
      <v-btn icon @click="$emit('closeDialog', null)">
        <v-icon>close</v-icon>
      </v-btn>
      <v-toolbar-title>새로운 토픽 만들기</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items v-if="$vuetify.breakpoint.xsOnly">
        <v-btn flat @click="save" :loading="loading">등록</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-card-text>
      <v-form ref="form">
        <v-layout row xs12 wrap>
          <v-flex xs6 class="mb-1">
            <v-text-field v-model="boardId" :rules="boardIdRules" class="dense" :error-messages="boardIdErrors" maxlength="15" label="토픽ID" required hint="주소창에 들어갈 토픽의 ID입니다." validate-on-blur @blur="checkBoardId"></v-text-field>
          </v-flex>
          <v-flex xs6 class="mb-1">
            <v-text-field v-model="boardName" :rules="boardNameRules" class="dense" maxlength="200" label="토픽 이름" required hint="토픽 목록에 표시되는 이름입니다." validate-on-blur></v-text-field>
          </v-flex>
          <v-flex xs12 class="mt-4">
            <v-textarea ref="boardDescription" v-model="boardDescription" maxlength="1000" height="40px" label="토픽 소개" hint="토픽 이름 아래에 작게 표시되는 설명입니다." validate-on-blur></v-textarea>
          </v-flex>
          <v-flex xs6>
            <v-checkbox ref="allowAnonymous" v-model="allowAnonymous" class="dense" label="익명글 허용" hide-details></v-checkbox>
          </v-flex>
          <v-flex xs6>
            <v-tooltip bottom>
              <v-checkbox ref="useCategory" slot="activator" v-model="useCategory" class="dense" label="카테고리 분류 사용" hide-details></v-checkbox>
              <span>글을 작성할 때 작성자가 기본/정보/질문 중 하나의 카테고리를 지정할 수 있습니다.</span>
            </v-tooltip>
          </v-flex>
          <v-flex xs6 class="mt-2">
            <v-select v-model="allGroupAuth" :items="allGroupAuthItems" label="토픽 공개 여부" dense></v-select>
          </v-flex>
          <v-flex xs6 class="mt-3">
            <v-layout align-center fill-height>
              <component :is="$vuetify.breakpoint.xsOnly?'small':'div'" v-html="allGroupAuthDescription"></component>
            </v-layout>
          </v-flex>
          <v-flex xs12>
            <component :is="$vuetify.breakpoint.xsOnly?'v-select':'v-autocomplete'" name="allowedGroups" chips multiple item-text="text" dense item-value="value" v-model="allowedGroups" :disabled="allGroupAuth === 'READWRITE'" :items="groupItems" label="구독허용 그룹" hint="(최소) 내가 구독할 수 있도록 선택해야 합니다." persistent-hint :menu-props="{closeOnContentClick:true}">
              <template slot="selection" slot-scope="props">
                <v-chip close small :key="props.item.value" :selected="props.selected" @input="removeChip(props, props.item, allowedGroups)">{{props.item.text}}</v-chip>
              </template>
              <template slot="item" slot-scope="data">
                <v-list-tile-content>
                  <v-list-tile-title v-html="data.item.text"></v-list-tile-title>
                </v-list-tile-content>
              </template>
            </component>
          </v-flex>
        </v-layout>
        <v-divider class="mt-4 mb-2"/>
        <v-layout row>
          <v-btn flat @click="reset">초기화</v-btn>
          <template v-if="$vuetify.breakpoint.smAndUp">
            <v-spacer/>
            <v-btn color="primary" @click="save" :loading="loading">등록</v-btn>
          </template>
        </v-layout>
      </v-form>
    </v-card-text>
  </v-card>
</template>
<script>
const reserved = ["document", "documents", "profile", "profiles", "auth", "user", "users", "comment", "comments", "vote", "votes", "report", "reports", "index", "scraps", "scrap", "board", "boards", "manage", "manages", "chat", "chats", "message", "messages", "group", "groups", "event", "events", "signup", "signin", "signout", "resetPassword", "notification", "notifications", "survey", "list", "admin", "ADMIN", "ADMINISTRATOR", "administrator", "attach", "profiles", "animal", "loungeBest", "topicBest", "lounge", "topic", "type", "best", "sanction", "userId", "nickName", "myPage", "myBoard", "myCommunity", "pedagy", "myPedagy", "Pedagy"];
const boardIdRegex = [/^(?:[a-zA-Z]+)(?:[a-zA-Z0-9\-_]{0,15})$/, /^((?!(--|__)).)*$/];
const groupName = {M: "전공", G: "학년", N: "일반", R: "지역"};
export default {
  name: "topicCreator",
  data() {
    return {
      loading: false,
      boardId: null,
      boardName: null,
      boardDescription: null,
      allGroupAuth: "READONLY",
      allowAnonymous: true,
      useCategory: false,
      allowedGroups: [],
      allGroupAuthItems: [{value: "READWRITE", text: "전체구독허용"}, {value: "READONLY", text: "읽기공개"}, {value: "NONE", text: "비공개"}],
      groupItems: [],
      boardIdRules: [v => !!v || "토픽ID를 입력해주세요.", v => !reserved.includes(v) || "사용할 수 없는 ID입니다.", v => (v && v.length > 3 && v.length < 16) || "4~15자로 입력해주세요.", v => boardIdRegex[0].test(v) || "토픽ID의 길이가 너무 길거나, 알파벳이 아닌 문자가 있습니다.", v => boardIdRegex[1].test(v) || "토픽ID에 연속된 [_, -]가 있습니다."],
      boardNameRules: [v => !!v || "토픽 이름을 입력해주세요."],
      boardIdErrors: []
    };
  },
  computed: {
    allGroupAuthDescription() {
      switch (this.allGroupAuth) {
        case "READONLY":
          return "구독자만 글을 쓸 수 있지만,<br>구독하지 않아도 글을 볼 수 있습니다.<br>그 대신 핫토픽에 글이 노출됩니다.";
        case "NONE":
          return "구독자만 글을 읽고 쓸 수 있습니다.<br>핫토픽에는 글이 노출되지 않습니다.";
        case "READWRITE":
          return "모든 회원이 토픽을 구독할 수 있습니다.<br>구독하지 않아도 글을 볼 수 있습니다.<br>핫토픽에 글이 노출됩니다.";
      }
    }
  },
  methods: {
    reset() {
      this.boardId = null;
      this.boardName = null;
      this.boardDescription = null;
      this.allGroupAuth = "READONLY";
      this.allowAnonymous = true;
      this.useCategory = false;
      this.allowedGroups = [];
    },
    removeChip(props, item, list) {
      props.parent.selectedItems.splice(props.parent.selectedItems.indexOf(item.value), 1);
      list.splice(list.indexOf(item.value), 1);
    },
    checkBoardId(event) {
      if (this.boardId && this.boardIdErrors.length === 0) {
        this.$axios
          .get("/boardId", {params: {boardId: this.boardId}, headers: {silent: true}})
          .then(response => {
            this.boardIdErrors = [];
            if (typeof event === "function") {
              event.call(this);
            }
          })
          .catch(error => {
            this.boardIdErrors = [error && error.response && error.response.data.message];
            if (typeof event === "function") {
              event.call(this);
            }
          });
      } else if (typeof event === "function") {
        event.call(this);
      }
    },
    save() {
      this.checkBoardId(() => {
        if (this.$refs.form.validate() && this.boardIdErrors.length === 0) {
          this.loading = true;
          this.$axios
            .post("/board", {
              boardId: this.boardId,
              boardName: this.boardName,
              boardType: "T",
              boardDescription: this.boardDescription || undefined,
              allGroupAuth: this.allGroupAuth,
              allowAnonymous: this.allowAnonymous,
              allowedGroups: this.allowedGroups.map(x => ({groupId: x, authType: "READWRITE"})),
              useCategory: this.useCategory
            })
            .then(response => {
              this.loading = false;
              this.$store.dispatch("addBoard", {
                boardId: this.boardId,
                boardName: this.boardName,
                boardType: "T",
                boardDescription: this.boardDescription || undefined,
                allGroupAuth: this.allGroupAuth,
                allowAnonymous: this.allowAnonymous
              });
              this.$store.dispatch("addUserBoard", {
                boardId: this.boardId,
                boardName: this.boardName,
                boardType: "T",
                boardDescription: this.boardDescription || undefined,
                allGroupAuth: this.allGroupAuth,
                allowAnonymous: this.allowAnonymous
              });
              this.$emit("resetBoard");
              this.$emit("closeDialog");
              this.reset();
              this.$store.dispatch("showSnackbar", {text: "새로운 토픽을 만들었습니다.", color: "success"});
            })
            .catch(error => {
              console.log(error.response);
              this.loading = false;
              this.$store.dispatch("showSnackbar", {text: error.response ? error.response.data.message : "토픽을 만들지 못했습니다.", color: "error"});
            });
        } else {
          this.$store.dispatch("showSnackbar", {text: "토픽 정보를 정확히 입력해주세요.", color: "error"});
        }
      });
    }
  },
  created() {
    this.$axios
      .get("/group", {headers: {silent: true}})
      .then(response => {
        this.groupItems = response.data.sort((a, b) => a.groupType < b.groupType);
        let previous = null;
        let i = 0;
        while (i < this.groupItems.length) {
          if (previous !== this.groupItems[i].groupType) {
            if (previous) {
              previous = this.groupItems[i].groupType;
              this.groupItems.splice(i, 0, {divider: true});
              i++;
            } else {
              previous = this.groupItems[i].groupType;
            }
            this.groupItems.splice(i, 0, {header: groupName[previous]});
            i++;
          }
          i++;
        }
        console.log(this.groupItems);
        this.groupItems = this.groupItems.map(x => (x.groupName ? {text: x.groupName, value: x.groupId} : x));
      })
      .catch(error => {
        this.$store.dispatch("showSnackbar", {text: `그룹 목록을 가져오지 못했습니다.${error && error.response && error.response.data ? "[" + error.response.data.message + "]" : ""}`});
      });
  },
  watch: {
    boardId() {
      if (this.boardIdErrors.length > 0) {
        this.boardIdErrors = [];
      }
    }
  }
};
</script>
<style>
form .flex {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
.v-list .v-subheader {
  padding-left: 0.5rem;
}
</style>