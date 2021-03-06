 <template>
  <v-container>
    <v-layout row justify-center align-center class="d-block">
      <v-flex xs12 sm10 lg8 class="mx-auto" :px-3="$vuetify.breakpoint.xsOnly">
        <v-layout row wrap>
          <v-flex xs12>
            <h3 class="headline">채팅 목록</h3>
          </v-flex>
          <v-flex xs12>
            <v-data-table xs12 :items="chats" id="chatTable" hide-headers :rows-per-page-items="[15]" :loading="loading" :total-items="totalChats" :pagination.sync="pagination" :class="{'customAction mt-4':true, 'noResult':totalChats === 0}">
              <template slot="items" slot-scope="props">
                <tr class="cursor-pointer" @click="getChat(props.item)">
                  <td class="px-2">
                    <v-avatar :color="props.item.chatType !== 'T'?null:'secondary'" :title="props.item.otherNickName + '님과의 대화'" size="32px">
                      <img v-if="props.item.chatType !== 'T'" :src="props.item.picturePath || '/img/defaultUser.svg'">
                      <span v-else class="white--text subheading">{{props.item.otherNickName === '(알 수 없음)'?'?':props.item.otherNickName.substring(0, 1)}}</span>
                    </v-avatar>
                  </td>
                  <td class="text-xs-left px-1" v-if="$vuetify.breakpoint.smAndUp" :title="props.item.chatType === 'T'?'토픽 닉네임':'라운지 필명'">{{ props.item.otherNickName }}</td>
                  <td class="text-xs-left multi-row px-2">{{getShortContents(props.item.lastContents)}}</td>
                  <td class="text-xs-right px-2">{{props.item.lastSendTimestamp? props.item.lastSendTimestamp.fromNow() : ''}}</td>
                  <td class="px-2">
                    <v-btn class="short" @click.stop="deleteChat(props.item)" small color="error">삭제</v-btn>
                  </td>
                </tr>
              </template>
              <template slot="no-data">{{this.noresult}}</template>
              <template slot="actions-prepend">
                <v-btn color="primary" @click="getChatList" :loading="loading">새로고침</v-btn>
                <v-spacer></v-spacer>
              </template>
            </v-data-table>
          </v-flex>
        </v-layout>
      </v-flex>
      <component :is="$vuetify.breakpoint.xsOnly?'v-dialog':'div'" full-screen v-model="isChatOpen">
        <beautiful-chat :participants="participants" :onMessageWasSent="sendMessage" :loadPreviousMessages="loadPreviousMessages" :loadNewMessages="loadNewMessages" :loading="loadingMessages" :messageList="messageList" :newMessagesCount="newMessagesCount" :isOpen="isChatOpen" :close="closeChat" :open="openChat" placeholder="대화 내용을 입력해주세요." :showEmoji="false" :has-user-list="false" :showFile="false" :colors="colors" :alwaysScrollToBottom="scrollToBottom" :showLauncher="false" :messageStyling="false" :title="title" :disabled="disabled"></beautiful-chat>
      </component>
    </v-layout>
  </v-container>
</template>
<script>
import MainLayout from '../layouts/MainLayout';

export default {
  name: 'Message',
  data () {
    return {
      loading: true,
      chats: [],
      totalChats: 0,
      pagination: {},
      participants: [
        {
          id: 'other',
          name: 'other',
          imageUrl: ''
        }
      ],
      messageList: [],
      newMessagesCount: 0,
      isChatOpen: false,
      colors: {
        header: {
          bg: '#9dd1b7',
          text: '#ffffff'
        },
        launcher: {
          bg: '#9dd1b7'
        },
        messageList: {
          bg: '#ffffff'
        },
        sentMessage: {
          bg: '#9dd1b7',
          text: '#ffffff'
        },
        receivedMessage: {
          bg: '#eaeaea',
          text: '#222222'
        },
        userInput: {
          bg: '#f3f9f6',
          text: '#565867'
        }
      },
      title: '',
      disabled: false,
      chatId: null,
      noPreviousMessage: false,
      scrollToBottom: true,
      loadingMessages: false
    };
  },
  computed: {
    noresult () {
      return this.loading ? '내 채팅 목록을 불러오고 있습니다. 잠시만 기다려주세요...' : '아직 개설된 채팅이 없습니다.';
    }
  },
  created () {
    this.$emit('update:layout', MainLayout);
    this.$store.dispatch('setColumnType', 'HIDE_ALWAYS')
    this.getChatList();
  },
  mounted () {
    if (this.$route.query.chatId) {
      if (this.chats.some(x => x.chatId === this.$route.query.chatId)) {
        this.getChat(this.chats.find(x => x.chatId === this.$route.query.chatId))
      } else {
        this.$axios.get('/message/target', { params: { chatId: this.$route.query.chatId }, headers: { silent: true } })
          .then(response => {
            this.getChat(response.data);
          })
          .catch(error => {
            this.$store.dispatch('showSnackbar', { text: `${error.response ? error.response.data.message : '채팅을 찾지 못했습니다.'}`, color: 'error' });
          })
      }
    }
  },
  methods: {
    getChatList () {
      this.loading = true;
      this.$axios
        .get('/message/list', { params: { page: this.pagination.page }, headers: { silent: true } })
        .then(response => {
          this.chats = response.data.map(x => ({ ...x, lastSendTimestamp: x.lastSendTimestamp ? this.$moment(x.lastSendTimestamp, 'YYYYMMDDHHmmss') : null }));
          this.totalChats = response.data.length > 0 ? response.data[0].totalCount : 0;
          this.loading = false;
        })
        .catch(error => {
          console.log(error);
          this.$store.dispatch('showSnackbar', { text: `${error.response ? error.response.data.message : '채팅 목록을 가져오지 못했습니다.'}`, color: 'error' });
          this.loading = false;
        });
      this.closeChat();
    },
    sendMessage (message) {
      (message => {
        if (message.data.text.trim().length > 0) {
          message.data.text = message.data.text.trim();
          const chat = this.chats.find(x => x.chatId === this.chatId);
          const lastSendTimestamp = chat.lastSendTimestamp ? this.$moment(chat.lastSendTimestamp).format('YMMDDHHmmss') : this.$moment().format('YMMDDHHmmss');
          this.$axios
            .post('/message', { chatId: this.chatId, contents: message.data.text, lastSendTimestamp }, { headers: { silent: true } })
            .then(response => {
              if (Array.isArray(response.data.messageList)) {
                response.data.messageList.reverse();
                this.messageList = this.messageList.concat(response.data.messageList.filter(x => x.sendTimestamp > lastSendTimestamp).map(x => ({ author: x.isSender ? 'me' : chat ? chat.otherNickName : '(알 수 없음)', type: 'text', data: { text: x.contents, meta: this.$moment(x.sendTimestamp, 'YYYYMMDDHHmmss').format('Y.M.D hh:mm:ss a') } })));
                if (response.data.messageList.length > 0) {
                  chat.lastSendTimestamp = this.$moment(response.data.messageList[response.data.messageList.length - 1].sendTimestamp, 'YYYYMMDDHHmmss');
                  chat.lastContents = response.data.messageList[response.data.messageList.length - 1].contents;
                }
              }
            })
            .catch(error => {
              console.log(error.response);
              this.$store.dispatch('showSnackbar', { text: `${error.response ? error.response.data.message : '메시지를 보내지 못했습니다.'}`, color: 'error' });
            });
        }
      })(message);
    },
    onMessageWasSent (message) {
      // called when the user sends a message
      this.messageList = [...this.messageList, message];
    },
    openChat () {
      this.isChatOpen = true;
      this.newMessagesCount = 0;
    },
    closeChat () {
      this.isChatOpen = false;
    },
    getChat (item) {
      this.disabled = item.otherStatus === 'DELETED';
      this.axios
        .get('/message', { params: { chatId: item.chatId } })
        .then(response => {
          this.messageList = response.data.map(x => ({ author: x.isSender ? 'me' : item.otherNickName, type: 'text', data: { text: x.contents, meta: this.$moment(x.sendTimestamp, 'YYYYMMDDHHmmss').format('Y.M.D hh:mm:ss a') } }));
          this.messageList.reverse();
          if (this.disabled) {
            this.messageList.push({ type: 'system', data: { text: `${item.otherNickName} 님이 채팅을 나갔습니다.` } });
          }
          this.noPreviousMessage = this.messageList.length < 15;

          this.participants = [
            {
              id: item.otherNickName,
              name: item.otherNickName,
              imageUrl: item.chatType === 'T' ? '' : item.picturePath || '/img/defaultUser.svg'
            }
          ];
          this.chatId = item.chatId;
          this.isChatOpen = true;
        })
        .catch(error => {
          console.log(error.response);
          this.$store.dispatch('showSnackbar', { text: error.response ? error.response.data.message : '채팅을 불러오지 못했습니다.', color: 'error' });
        });
      if (item.chatType === 'T') {
        this.colors.header.bg = '#0067c2'
        this.colors.launcher.bg = '#0067c2'
        this.colors.sentMessage.bg = '#0067c2'
      } else {
        this.colors.header.bg = '#9dd1b7'
        this.colors.launcher.bg = '#9dd1b7'
        this.colors.sentMessage.bg = '#9dd1b7'
      }
      this.title = item.otherNickName + '님과의 대화';
    },
    deleteChat (item) {
      if (confirm('이 채팅을 삭제하면 대화 내용이 모두 사라집니다.\n정말 삭제하시겠어요?')) {
        this.closeChat();
        this.$axios
          .delete('/message/' + item.chatId)
          .then(response => {
            this.chats.splice(this.chats.findIndex(x => x.chatId === item.chatId), 1);
            this.$store.dispatch('showSnackbar', { text: '채팅을 삭제하였습니다.', color: 'success' });
          })
          .catch(error => {
            console.log(error.response);
            this.$store.dispatch('showSnackbar', { text: error.response ? error.response.data.message || '채팅을 삭제하지 못했습니다.' : '채팅을 삭제하지 못했습니다.', color: 'error' });
          });
      }
    },
    loadPreviousMessages () {
      (() => {
        if (!this.noPreviousMessage) {
          this.scrollToBottom = false;
          this.loadingMessages = true;
          this.axios
            .get('/message', { params: { chatId: this.chatId, timestampBefore: this.messageList[0] ? this.$moment(this.messageList[0].data.meta, 'YYYY.M.D hh:mm:ss a').format('YMMDDHHmmss') : this.$moment().format('YMMDDHHmmss') }, headers: { silent: true } })
            .then(response => {
              if (Array.isArray(response.data)) {
                if (response.data.length < 15) {
                  this.noPreviousMessage = true;
                }
                response.data.reverse();
                const chat = this.chats.find(x => x.chatId === this.chatId);
                this.messageList = response.data.map(x => ({ author: x.isSender ? 'me' : chat.otherNickName, type: 'text', data: { text: x.contents, meta: this.$moment(x.sendTimestamp, 'YYYYMMDDHHmmss').format('Y.M.D hh:mm:ss a') } })).concat(this.messageList);
                this.loadingMessages = false;
                this.$nextTick(() => {
                  this.scrollToBottom = true;
                });
              }
            })
            .catch(error => {
              console.log(error.response);
              this.scrollToBottom = true;
              this.loadingMessages = false;
              this.$store.dispatch('showSnackbar', { text: error.response ? error.response.data.message : '메시지를 불러오지 못했습니다.', color: 'error' });
            });
        }
      })();
    },
    loadNewMessages () {
      (() => {
        this.loadingMessages = true;
        const lastSendTimestamp = this.messageList.length > 0 ? this.$moment(this.messageList[this.messageList.length - 1].data.meta, 'YYYY.M.D hh:mm:ss a').format('YMMDDHHmmss') : undefined;
        this.axios
          .get('/message', { params: { chatId: this.chatId, timestampAfter: lastSendTimestamp }, headers: { silent: true } })
          .then(response => {
            const chat = this.chats.find(x => x.chatId === this.chatId);
            response.data.reverse();
            this.messageList = this.messageList.concat(response.data.filter(x => !lastSendTimestamp || x.sendTimestamp > lastSendTimestamp).map(x => ({ author: x.isSender ? 'me' : chat.otherNickName, type: 'text', data: { text: x.contents, meta: this.$moment(x.sendTimestamp, 'YYYYMMDDHHmmss').format('Y.M.D hh:mm:ss a') } })));
            this.loadingMessages = false;
          })
          .catch(error => {
            console.log(error.response);
            this.loadingMessages = false;
            this.$store.dispatch('showSnackbar', { text: error.response ? error.response.data.message : '메시지를 불러오지 못했습니다.', color: 'error' });
          });
      })();
    },
    getShortContents (contents) {
      return contents && contents.length > 50 ? contents.substring(0, 50) + '...' : contents;
    }
  },
  watch: {
    pagination: {
      handler () {
        this.getChatList();
      },
      deep: true
    },
    isChatOpen (val) {
      if (this.$vuetify.breakpoint.xsOnly) {
        document.body.style.position = val ? 'fixed' : 'initial';
      }
    }
  }
};
</script>
