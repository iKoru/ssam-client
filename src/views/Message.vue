 <template>
  <v-container>
    <v-layout row justify-center align-center>
      <v-card width="100%" flat>
        <v-card-title primary-title>
          <v-layout row>
            <v-flex xs12 sm10 lg8 xl6 class="mx-auto">
              <v-layout row>
                <h3 class="headline">메세지 목록</h3>
              </v-layout>
              <v-flex xs12>
                <v-data-table xs12 :items="chats" id="chatTable" :rows-per-page-items="[15]" :loading="loading" :total-items="totalChats" :pagination.sync="pagination">
                  <template slot="items" slot-scope="props">
                    <tr class="cursor-pointer" @click="getChat(props.item)">
                      <td>
                        <v-avatar :color="props.item.chatType !== 'T'?null:'primary'" :title="props.item.otherNickName + '님과의 대화'" size="32px">
                          <img v-if="props.item.chatType !== 'T'" :src="props.item.picturePath || require('@/static/img/defaultUser.png')">
                          <span v-else class="white--text headline">{{props.item.otherNickName === '(알 수 없음)'?'?':props.item.otherNickName.substring(0, 1)}}</span>
                        </v-avatar>
                      </td>
                      <td class="text-xs-left" v-if="$vuetify.breakpoint.smAndUp">{{ props.item.otherNickName }}</td>
                      <td class="text-xs-left ellipsis">{{props.item.lastContents}}</td>
                      <td class="text-xs-right">
                        <timeago :datetime="props.item.lastSendTimestamp" :autoUpdate="true"></timeago>
                      </td>
                      <td>
                        <v-btn class="short" @click.stop="deleteChat(props.item)" small color="error">나가기</v-btn>
                      </td>
                    </tr>
                  </template>
                  <template slot="no-data">
                    {{this.noresult}}
                    <v-btn color="primary" @click="getChatList">새로고침</v-btn>
                  </template>
                </v-data-table>
              </v-flex>
            </v-flex>
          </v-layout>
          <component :is="$vuetify.breakpoint.xsOnly?'v-dialog':'div'" full-screen v-model="isChatOpen">
            <beautiful-chat :participants="participants" :onMessageWasSent="sendMessage" :messageList="messageList" :newMessagesCount="newMessagesCount" :isOpen="isChatOpen" :close="closeChat" :open="openChat" placeholder="대화 내용을 입력해주세요." :showEmoji="false" :has-user-list="false" :showFile="false" :colors="colors" :alwaysScrollToBottom="true" :showLauncher="false" :messageStyling="false" :title="title" :disabled="disabled"></beautiful-chat>
          </component>
        </v-card-title>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import MainLayout from "../layouts/MainLayout";

export default {
  name: "Message",
  data() {
    return {
      loading: true,
      chats: [],
      totalChats: 0,
      pagination: {},
      participants: [
        {
          id: "other",
          name: "other",
          imageUrl: ""
        }
      ],
      messageList: [],
      newMessagesCount: 0,
      isChatOpen: false,
      colors: {
        header: {
          bg: "#4e8cff",
          text: "#ffffff"
        },
        launcher: {
          bg: "#4e8cff"
        },
        messageList: {
          bg: "#ffffff"
        },
        sentMessage: {
          bg: "#4e8cff",
          text: "#ffffff"
        },
        receivedMessage: {
          bg: "#eaeaea",
          text: "#222222"
        },
        userInput: {
          bg: "#f4f7f9",
          text: "#565867"
        }
      },
      title: "",
      disabled: false
    };
  },
  computed: {
    noresult() {
      return this.loading ? "내 채팅 목록을 불러오고 있습니다. 잠시만 기다려주세요..." : "아직 개설된 채팅이 없습니다.";
    }
  },
  created() {
    this.$emit("update:layout", MainLayout);
    this.getChatList();
  },
  methods: {
    getChatList() {
      this.loading = true;
      this.$axios
        .get("/message/list", {params: {page: this.pagination.page}, headers: {silent: true}})
        .then(response => {
          this.chats = response.data.map(x => ({...x, lastSendTimestamp: this.$moment(x.lastSendTimestamp, "YYYYMMDDHHmmss").toDate()}));
          this.totalChats = response.data.length > 0 ? response.data[0].totalCount : 0;
          this.loading = false;
        })
        .catch(error => {
          console.log(error);
          this.$store.dispatch("showSnackbar", {text: `채팅 목록을 가져오지 못했습니다.${error && error.response && error.response.data ? "[" + error.response.data.message + "]" : ""}`});
          this.loading = false;
        });
    },
    sendMessage(message) {
      let that = this;
      (message => {
        if (message.data.text.length > 0) {
          that.newMessagesCount = that.isChatOpen ? that.newMessagesCount : that.newMessagesCount + 1;
          message.data.meta = that.$moment().format("YYYY.M.D hh:mm:ss a");
          that.onMessageWasSent(message);
        }
      })(message);
    },
    onMessageWasSent(message) {
      // called when the user sends a message
      this.messageList = [...this.messageList, message];
    },
    openChat() {
      // called when the user clicks on the fab button to open the chat
      this.isChatOpen = true;
      this.newMessagesCount = 0;
    },
    closeChat() {
      // called when the user clicks on the botton to close the chat
      this.isChatOpen = false;
    },
    getChat(item) {
      console.log(item);
      this.disabled = item.otherStatus === "DELETED";
      this.axios
        .get("/message", {params: {chatId: item.chatId}})
        .then(response => {
          this.messageList = response.data.map(x => ({author: x.isSender ? "me" : item.otherNickName, type: "text", data: {text: x.contents, meta: this.$moment(x.sendTimestamp, "YYYYMMDDHHmmss").format("YYYY.M.D hh:mm:ss a")}}));
          if (this.disabled) {
            this.messageList.push({type: "system", data: {text: `${item.otherNickName} 님이 채팅을 나갔습니다.`}});
          }
          this.participants = [
            {
              id: item.otherNickName,
              name: item.otherNickName,
              imageUrl: item.chatType === "T" ? "" : item.picturePath || require("@/static/img/defaultUser.png")
            }
          ];
          this.isChatOpen = true;
        })
        .catch(error => {
          console.log(error.response);
          this.$store.dispatch("showSnackbar", {text: error.response ? error.response.data.message : "채팅을 불러오지 못했습니다.", color: "error"});
        });
      this.title = item.otherNickName + "님과의 대화";
    },
    deleteChat(item) {
      if (confirm("이 채팅방을 삭제하면 대화 내용이 모두 사라집니다.\n정말 삭제하시겠어요?")) {
        this.$axios
          .delete("/message/" + item.chatId)
          .then(response => {
            this.chats.splice(this.chats.findIndex(x => x.chatId === item.chatId), 1);
            this.$store.dispatch("showSnackbar", {text: "채팅을 삭제하였습니다.", color: "success"});
          })
          .catch(error => {
            console.log(error.response);
            this.$store.dispatch("showSnackbar", {text: error.response ? error.response.data.message : "채팅을 삭제하지 못했습니다.", color: "error"});
          });
      }
    }
  },
  watch: {
    pagination: {
      handler() {
        this.getChatList();
      },
      deep: true
    }
  }
};
</script>
<style>
@media (max-width: 599px) {
  td:not(:nth-child(4)) {
    white-space: nowrap;
  }
}
@media (min-width: 600px) {
  td:not(:nth-child(3)) {
    white-space: nowrap;
  }
}
td.ellipsis {
  width: 100%;
}
table.v-table thead td:not(:nth-child(1)),
table.v-table tbody td:not(:nth-child(1)),
table.v-table thead th:not(:nth-child(1)),
table.v-table tbody th:not(:nth-child(1)),
table.v-table thead td:first-child,
table.v-table tbody td:first-child,
table.v-table thead th:first-child,
table.v-table tbody th:first-child {
  padding: 0 12px;
}
td:first-child {
  padding: 0 12px;
}
</style>
