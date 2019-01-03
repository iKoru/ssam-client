 <template>
  <v-container>
    <v-layout row justify-center align-center>
      <v-card width="100%" flat>
        <v-card-title primary-title>
          <v-layout row>
            <v-flex xs12 sm10 lg8 xl6 class="mx-auto">
              <v-layout row>
                <h3 class="headline">채팅 목록</h3>
              </v-layout>
              <v-flex xs12>
                <v-data-table xs12 :items="chats" id="chatTable" :rows-per-page-items="[15]" :loading="loading" :total-items="totalChats" :pagination.sync="pagination">
                  <template slot="items" slot-scope="props">
                    <tr class="cursor-pointer" @click="getChat(props.item)">
                      <td>
                        <v-avatar :color="props.item.chatType !== 'T'?null:'primary'" :title="props.item.otherNickName + '님과의 대화'">
                          <img v-if="props.item.chatType !== 'T'" :src="props.item.picturePath || require('@/static/img/defaultUser.png')">
                          <span v-else class="white--text headline">{{props.item.otherNickName === '(알 수 없음)'?'?':props.item.otherNickName.substring(0, 1)}}</span>
                        </v-avatar>
                      </td>
                      <td class="text-xs-left" v-if="$vuetify.breakpoint.smAndUp">{{ props.item.otherNickName }}</td>
                      <td class="text-xs-left ellipsis">
                        {{props.item.lastContents}}
                      </td>
                      <td class="text-xs-right">
                        <timeago :datetime="props.item.lastSendTimestamp" :autoUpdate="true"></timeago>
                      </td>
                    </tr>
                  </template>
                  <template slot="no-data">
                    {{this.noresult}}
                    <v-btn color="primary" @click="reset">새로고침</v-btn>
                  </template>
                </v-data-table>
              </v-flex>
            </v-flex>
          </v-layout>
        </v-card-title>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import MainLayout from "../layouts/MainLayout";

export default {
  name: "Chat",
  data() {
    return {
      loading: true,
      chats:[],
      totalChats:0,
      pagination:{}
    }
  },
  computed: {
    noresult() {
      return this.loading ? "내 채팅 목록을 불러오고 있습니다. 잠시만 기다려주세요..." : "아직 개설된 채팅이 없습니다.";
    }
  },
  created() {
    this.$emit("update:layout", MainLayout);
    this.reset();
  },
  methods: {
    reset() {
      this.loading = true;
      this.$axios
        .get("/message/list", {params:{page: this.pagination.page}, headers: {silent: true}})
        .then(response => {
          this.chats = response.data.map(x=>({...x, lastSendTimestamp:this.$moment(x.lastSendTimestamp, 'YYYYMMDDHHmmss').toDate()}));
          console.log(response.data);
          this.totalChats = response.data.length > 0? response.data[0].totalCount : 0;
          this.loading = false;
        })
        .catch(error => {
          console.log(error);
          this.$store.dispatch("showSnackbar", {text: `채팅 목록을 가져오지 못했습니다.${error && error.response && error.response.data ? "[" + error.response.data.message + "]" : ""}`});
          this.loading = false;
        });
    }
  }
};
</script>
<style>
@media(max-width:599px){
  td:not(:nth-child(4)) {
    white-space: nowrap;
  }
}
@media(min-width:600px){
  td:not(:nth-child(3)) {
    white-space: nowrap;
  }
}
td.ellipsis{
  width:100%;
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
