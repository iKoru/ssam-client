<template>
  <v-card tile>
    <v-toolbar card color="white">
      <v-toolbar-title>{{board?'토픽 관리':'새로운 토픽 만들기'}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn icon @click="$emit('closeDialog', null)">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-card-text>
      <v-form ref="form">
        <v-layout row xs12 wrap>
          <v-flex xs6 class="mb-1">
            <v-text-field v-if="board" v-model="boardId" class="dense" readonly label="토픽ID" hint="pedagy.com/<b>seoul</b>과 같이 URL주소에 들어가는 문구입니다."></v-text-field>
            <v-text-field v-else v-model="boardId" :rules="boardIdRules" class="dense" :error-messages="boardIdErrors" maxlength="15" label="토픽ID" hint="pedagy.com/<b>seoul</b>과 같이 URL주소에 들어갈 문구입니다." placeholder="비워두면 임의로 생성됩니다." validate-on-blur @blur="checkBoardId"></v-text-field>
          </v-flex>
          <v-flex xs6 class="mb-1">
            <v-text-field v-model="boardName" :rules="boardNameRules" class="dense" maxlength="200" label="토픽 이름" required hint="토픽 목록에 표시되는 이름입니다." validate-on-blur></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-textarea ref="boardDescription" v-model="boardDescription" :rows="3" maxlength="1000" height="80px" label="토픽 소개" hint="토픽 이름 아래에 작게 표시되는 설명입니다." validate-on-blur></v-textarea>
          </v-flex>
          <v-flex xs6>
            <v-checkbox ref="allowAnonymous" v-model="allowAnonymous" class="dense mt-2" label="익명글 허용" hide-details></v-checkbox>
          </v-flex>
          <v-flex xs6>
            <v-tooltip bottom>
              <v-checkbox ref="useCategory" slot="activator" v-model="useCategory" class="dense mt-2" label="카테고리 분류 사용" hide-details></v-checkbox>
              <span>글을 작성할 때 작성자가 기본/정보/질문 중 하나의 카테고리를 지정할 수 있습니다.</span>
            </v-tooltip>
          </v-flex>
          <v-flex xs6 class="mt-3">
            <v-select v-model="allGroupAuth" :items="allGroupAuthItems" label="토픽 공개 여부" dense></v-select>
          </v-flex>
          <v-flex xs6 class="mt-3">
            <v-layout align-center fill-height>
              <component :is="$vuetify.breakpoint.xsOnly?'small':'div'" v-html="allGroupAuthDescription"></component>
            </v-layout>
          </v-flex>
          <v-flex xs12>
            <component :is="$vuetify.breakpoint.xsOnly?'v-select':'v-autocomplete'" name="allowedGroups" chips multiple item-text="text" dense item-value="value" v-model="allowedGroups" :disabled="allGroupAuth === 'READWRITE'" :items="groupItems" label="구독 권한" hint="(최소) 내가 구독할 수 있도록 선택해야 합니다." persistent-hint :menu-props="{closeOnContentClick:$vuetify.breakpoint.xsOnly}">
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
          <v-flex xs12 v-if="board" class="mt-2">
            <v-select name="ownerNickName" dense v-model="ownerNickName" :items="boardMemberItems" label="토픽지기 양도" hint="선택한 회원에게 토픽지기가 양도됩니다." persistent-hint></v-select>
          </v-flex>
          <v-flex xs12 v-if="board && board.reservedDate" class="mt-3">
            <v-textarea ref="reservedContents" v-model="reservedContents" :rows="3" readonly height="80px" :label="'변경 예약('+$moment(board.reservedDate, 'YYYYMMDD').format('Y.M.D')+' 반영 예정) 내용'" hint="변경이 예약된 토픽의 내용입니다."></v-textarea>
          </v-flex>
        </v-layout>
        <v-divider class="my-2"/>
        <v-layout row>
          <v-btn flat @click="reset(true)">초기화</v-btn>
          <v-btn color="error" @click="deleteBoard" v-if="board">삭제</v-btn>
          <v-spacer/>
          <v-btn color="primary" @click="save" :loading="loading">등록</v-btn>
        </v-layout>
      </v-form>
    </v-card-text>
  </v-card>
</template>
<script>
const reserved = ["document", "documents", "profile", "profiles", "auth", "user", "users", "comment", "comments", "vote", "votes", "report", "reports", "index", "scraps", "scrap", "board", "boards", "manage", "manages", "chat", "chats", "message", "messages", "group", "groups", "event", "events", "signup", "signin", "signout", "resetPassword", "notification", "notifications", "survey", "list", "admin", "ADMIN", "ADMINISTRATOR", "administrator", "attach", "profiles", "animal", "loungeBest", "topicBest", "lounge", "topic", "type", "best", "sanction", "userId", "nickName", "myPage", "myBoard", "myCommunity", "pedagy", "myPedagy", "Pedagy"];
const boardIdRegex = [/^(?:[a-zA-Z]+)(?:[a-zA-Z0-9\-_]{0,15})$/, /^((?!(--|__)).)*$/];
const groupName = {M: "전공", G: "학년", N: "일반", R: "지역", Z: "인증"};
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
      ownerNickName: null,
      groupItems: [],
      boardIdRules: [v => !reserved.includes(v) || "사용할 수 없는 ID입니다.", v => !v || (v.length > 3 && v.length < 16) || "4~15자로 입력해주세요.", v => boardIdRegex[0].test(v) || "토픽ID의 길이가 너무 길거나, 알파벳이 아닌 문자가 있습니다.", v => boardIdRegex[1].test(v) || "토픽ID에 연속된 [_, -]가 있습니다."],
      boardNameRules: [v => !!v || "토픽 이름을 입력해주세요."],
      boardMemberItems: [],
      boardIdErrors: []
    };
  },
  props: ["board"],
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
    },
    reservedContents() {
      if (this.board && this.board.reservedContents) {
        let reservedContents = this.board.reservedContents;
        let string = "";
        for (let key in reservedContents) {
          switch (key) {
            case "boardName":
              string += `토픽 이름 : ${reservedContents[key]}\n`;
              break;
            case "boardDescription":
              string += `토픽 설명 : ${reservedContents[key]}\n`;
              break;
            case "allowAnonymous":
              string += `익명글 허용 여부 : ${reservedContents[key] ? "허용" : "비허용"}\n`;
              break;
            case "useCategory":
              string += `카테고리 : ${reservedContents[key] ? "사용" : "미사용"}\n`;
              break;
            case "allGroupAuth":
              string += `토픽 공개/비공개 : ${this.allGroupAuthItems.some(x => x.value === reservedContents[key]) ? this.allGroupAuthItems.find(x => x.value === reservedContents[key]).text : "(알 수 없음)"}\n`;
              break;
            case "ownerNickName":
              string += `토픽지기 : ${reservedContents[key]}\n`;
              break;
            case "auth":
              string += `구독 권한 : ${reservedContents[key]
                .filter(x => this.groupItems.some(y => y.value === x.groupId))
                .map(x => this.groupItems.find(y => y.value === x.groupId).text + (x.command === "INSERT" ? " 추가" : x.command === "DELETE" ? " 삭제" : ""))
                .join(", ")}`;
              break;
            case "status":
              string += reservedContents[key] === "DELETED" ? "토픽 삭제 예정" : "";
              break;
          }
        }
        return string;
      } else {
        return null;
      }
    }
  },
  methods: {
    reset(skipGetInformationFormServer) {
      if (this.board) {
        if (!skipGetInformationFormServer) {
          this.loading = true;
          this.$axios
            .get("/board/member", {params: {boardId: this.board.boardId}, headers: {silent: true}})
            .then(response => {
              const myNickName = this.$store.getters.profile.topicNickName;
              this.boardMemberItems = response.data.filter(x => x.nickName !== myNickName).map(x => x.nickName);
              this.loading = false;
            })
            .catch(error => {
              console.log(error.response);
              this.loading = false;
              this.$store.dispatch("showSnackbar", {text: error.response ? error.response.data.message : "토픽 구성원을 불러오지 못했습니다.", color: "error"});
            });
        }
        this.boardId = this.board.boardId;
        this.boardName = this.board.boardName;
        this.boardDescription = this.board.boardDescription;
        this.allGroupAuth = this.board.allGroupAuth;
        this.allowAnonymous = this.board.allowAnonymous;
        this.useCategory = this.board.categories ? this.board.categories.filter(x => x).length > 0 : false;
        this.allowedGroups = this.board.boardAuth.map(x => x.groupId);
        this.ownerNickName = this.board.ownerNickName;
      } else {
        this.boardId = null;
        this.boardName = null;
        this.boardDescription = null;
        this.allGroupAuth = "READONLY";
        this.allowAnonymous = true;
        this.useCategory = false;
        this.allowedGroups = [];
        this.ownerNickName = null;
      }
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
      if (this.board) {
        if (this.$refs.form.validate() && this.boardIdErrors.length === 0) {
          if (confirm("변경 내용은 1개월 뒤에 반영됩니다. 계속하시겠습니까?")) {
            this.loading = true;
            this.$axios
              .put("/board", {
                boardId: this.boardId,
                boardName: this.boardName,
                boardDescription: this.boardDescription || undefined,
                allGroupAuth: this.allGroupAuth,
                allowAnonymous: this.allowAnonymous,
                allowedGroups: this.allowedGroups.map(x => ({groupId: x, authType: "READWRITE"})),
                useCategory: this.useCategory,
                ownerNickName: this.ownerNickName || undefined
              })
              .then(response => {
                this.loading = false;
                this.$emit("resetBoard");
                this.$emit("closeDialog");
                this.$store.dispatch("showSnackbar", {text: "토픽 정보를 변경 예약하였습니다.", color: "success"});
              })
              .catch(error => {
                console.log(error.response);
                this.loading = false;
                this.$store.dispatch("showSnackbar", {text: error.response ? error.response.data.message : "토픽을 만들지 못했습니다.", color: "error"});
              });
          }
        } else {
          this.$store.dispatch("showSnackbar", {text: "토픽 정보를 정확히 입력해주세요.", color: "error"});
        }
      } else {
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
    deleteBoard() {
      if (confirm("토픽 삭제는 1개월 유예기간 후에 이루어지고,\n삭제 후에는 모든 글에 접근이 불가능합니다. 계속하시겠습니까?")) {
        this.$axios
          .put("/board", {boardId: this.boardId, status: "DELETED"})
          .then(response => {
            this.$emit("resetBoard");
            this.$emit("closeDialog");
            this.$store.dispatch("showSnackbar", {text: "토픽 삭제를 예약하였습니다.", color: "success"});
          })
          .catch(error => {
            console.log(error.response);
            this.$store.dispatch("showSnackbar", {text: error.response ? error.response.data.message : "토픽을 만들지 못했습니다.", color: "error"});
          });
      }
    }
  },
  created() {
    if (this.$store.getters.groups) {
      this.groupItems = this.$store.getters.groups;
    } else {
      this.$axios
        .get("/group", {headers: {silent: true}})
        .then(response => {
          response.data.forEach(x => {
            if (x.groupType === "N" || x.groupType === "D" || x.groupType === "E") {
              x.groupType = "Z";
            }
          });
          this.groupItems = response.data.sort((a, b) => (a.groupType < b.groupType ? -1 : a.groupType === b.groupType ? 0 : 1));
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
          this.groupItems = this.groupItems.map(x => (x.groupName ? {text: x.groupName, value: x.groupId} : x));
          this.$store.dispatch("setGroups", this.groupItems);
        })
        .catch(error => {
          this.$store.dispatch("showSnackbar", {text: `그룹 목록을 가져오지 못했습니다.${error && error.response && error.response.data ? "[" + error.response.data.message + "]" : ""}`});
        });
    }
    this.reset();
  },
  watch: {
    boardId() {
      if (this.boardIdErrors.length > 0) {
        this.boardIdErrors = [];
      }
    },
    board: {
      handler() {
        this.reset();
      },
      deep: true
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