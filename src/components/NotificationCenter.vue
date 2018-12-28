<template>
  <v-card>
    <v-list dense>
      <template v-if="notifications.length > 0">
        <v-list-tile v-for="notification in notifications" :key="notification.notificationId" @click="notificationClicked(notification)">
          <v-list-tile-title>{{notification.message}}</v-list-tile-title>
          <div class="timeago">
            <v-list-tile-sub-title>
              <timeago :datetime="notification.createdDateTime" :autoUpdate="true"></timeago>
            </v-list-tile-sub-title>
          </div>
        </v-list-tile>
        <v-list-tile @click="moreNotification" v-if="notifications.length < notifications[0].totalCount">
          <v-list-tile-title class="text-xs-center">더보기</v-list-tile-title>
        </v-list-tile>
      </template>
      <v-list-tile v-else>
        <v-list-tile-title>새로운 알림이 없습니다.</v-list-tile-title>
      </v-list-tile>
    </v-list>
    <v-divider/>
    <v-card-actions>
      <v-btn :disabled="notifications.length === 0" @click="clearNotification">모두 삭제</v-btn>
      <v-spacer></v-spacer>
      <v-btn flat color="primary" @click="closeDialog">닫기</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  name: "NotificationCenter",
  props: ["dialog"],
  data() {
    return {};
  },
  methods: {
    notificationClicked(item) {
      console.log(item);
      this.$axios
        .delete("/notification/" + item.notificationId, {headers:{silent:true}})
        .then(response => {
          console.log(response);
          this.$store.dispatch("markNotification", item.notificationId);
        })
        .catch(error => {
          console.log(error);
        });
      this.$emit("closeDialog", null);
      if (item.href) {
        this.$router.push(item.href);
      }
    },
    moreNotification() {
      console.log("more!");
    },
    closeDialog() {
      this.$emit("closeDialog", null);
    },
    clearNotification() {
      this.$axios
        .put("/notification", {clearNotification: true})
        .then(response => {
          this.$store.dispatch("setNotifications", []);
          this.$emit("closeDialog", null);
        })
        .catch(error => {
          this.$store.dispatch("showSnackbar", {text: `${error.response ? error.response.data.message : "알림을 읽음 표시하지 못했습니다."}`, color: "error"});
        });
    }
  },
  computed: {
    notifications() {
      return this.$store.getters.notifications.map(x => ({...x, createdDateTime: this.$moment(x.createdDateTime, "YYYYMMDDHHmmss").toDate()}));
    }
  }
};
</script>
<style>
.v_time_ago_a {
  color: #657786;
  cursor: pointer;
  font-size: 14px;
  text-decoration: none;
}
.v_time_ago_a:active,
.v_time_ago_a:focus,
.v_time_ago_a:hover {
  color: #1b95e0;
  text-decoration: underline;
}
.v_time_ago_span {
  letter-spacing: 0.1px;
  line-height: 20px;
  list-style-image: none;
  list-style-position: outside;
  list-style-type: none;
}
.tooltip {
  display: inline-block;
  position: relative;
}
.tooltip .tooltiptext {
  background-color: #555;
  border-radius: 6px;
  bottom: 125%;
  color: #fff;
  left: 50%;
  margin-left: -60px;
  opacity: 0;
  padding: 5px 0;
  position: absolute;
  text-align: center;
  transition: opacity 0.3s;
  transition-delay: 0.5s;
  visibility: hidden;
  width: 150px;
  z-index: 1;
}
.tooltip .tooltiptext:after {
  border: 5px solid transparent;
  border-top-color: #555;
  content: "";
  left: 50%;
  margin-left: -5px;
  position: absolute;
  top: 100%;
}
.tooltip:hover .tooltiptext {
  opacity: 1;
  visibility: visible;
}
.timeago{
  white-space:nowrap;
}
</style>