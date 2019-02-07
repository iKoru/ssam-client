<template>
  <v-card>
    <v-toolbar card dark color="primary" v-if="$vuetify.breakpoint.xsOnly">
      <v-btn icon dark @click="closeDialog">
        <v-icon>close</v-icon>
      </v-btn>
      <v-toolbar-title>알림내역</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-list dense>
      <template v-if="notifications.length > 0">
        <v-list-tile v-for="notification in notifications" :key="notification.notificationId" @click="notificationClicked(notification)">
          <v-list-tile-title>{{notification.message}}</v-list-tile-title>
          <div class="timeago">
            <v-list-tile-sub-title>{{notification.createdDateTime.fromNow()}}</v-list-tile-sub-title>
          </div>
        </v-list-tile>
        <v-list-tile v-if="$vuetify.breakpoint.xsOnly || notifications.length < notifications[0].totalCount">
          <v-layout row>
            <v-btn block :disabled="notifications.length === 0" v-if="$vuetify.breakpoint.xsOnly" @click="clearNotification" :class="{'mr-1':notifications.length < notifications[0].totalCount}">모두 삭제</v-btn>
            <v-btn block flat :loading="loading" @click="moreNotification" v-if="notifications.length < notifications[0].totalCount" :class="{'ml-1':$vuetify.breakpoint.xsOnly}">더보기</v-btn>
          </v-layout>
        </v-list-tile>
      </template>
      <v-list-tile v-else>
        <v-list-tile-title>새로운 알림이 없습니다.</v-list-tile-title>
      </v-list-tile>
    </v-list>
    <template v-if="$vuetify.breakpoint.smAndUp">
      <v-divider/>
      <v-card-actions>
        <v-btn :disabled="notifications.length === 0" @click="clearNotification">모두 삭제</v-btn>
        <v-spacer></v-spacer>
        <v-btn flat color="primary" @click="closeDialog">닫기</v-btn>
      </v-card-actions>
    </template>
  </v-card>
</template>
<script>
export default {
  name: 'NotificationCenter',
  props: ['dialog'],
  data () {
    return {
      loading: false
    };
  },
  methods: {
    notificationClicked (item) {
      this.$axios
        .delete('/notification/' + item.notificationId, { headers: { silent: true } })
        .then(response => {
          this.$store.dispatch('markNotification', item.notificationId);
        })
        .catch(error => {
          console.log(error);
        });
      if (item.href) {
        this.$router.push(item.href);
      }
      this.$emit('closeDialog', null);
    },
    moreNotification () {
      this.loading = true;
      this.$axios
        .get('/notification', { params: { dateTimeBefore: this.$moment(this.notifications[this.notifications.length - 1].createdDateTime).format('YMMDDHHmmss') }, headers: { silent: true } })
        .then(response => {
          this.loading = false;
          this.$store.dispatch('addNotifications', response.data);
        })
        .catch(error => {
          this.loading = false;
          this.$store.dispatch('showSnackbar', { text: `${error.response ? error.response.data.message : '새로운 알림을 불러오지 못했습니다.'}`, color: 'error' });
        });
    },
    closeDialog () {
      this.$emit('closeDialog', null);
    },
    clearNotification () {
      this.$axios
        .put('/notification', { clearNotification: true })
        .then(response => {
          this.$store.dispatch('setNotifications', []);
          this.$emit('closeDialog', null);
        })
        .catch(error => {
          this.$store.dispatch('showSnackbar', { text: `${error.response ? error.response.data.message : '알림을 읽음 표시하지 못했습니다.'}`, color: 'error' });
        });
    }
  },
  computed: {
    notifications () {
      return this.$store.getters.notifications.map(x => ({ ...x, createdDateTime: this.$moment(x.createdDateTime, 'YYYYMMDDHHmmss') }));
    }
  }
};
</script>
<style>
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
.timeago {
  white-space: nowrap;
}
</style>
