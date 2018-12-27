<template>
  <v-card>
    <v-list>
      <v-list-tile avatar>
        <v-list-tile-avatar>
          <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title>John Leider</v-list-tile-title>
          <v-list-tile-sub-title>Founder of Vuetify.js</v-list-tile-sub-title>
        </v-list-tile-content>

        <v-list-tile-action>
          <v-btn class="red--text" icon >
            <v-icon>favorite</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>

    <v-divider></v-divider>

    <v-list>
      <v-list-tile>
        <v-list-tile-action>
          <v-switch color="purple"></v-switch>
        </v-list-tile-action>
        <v-list-tile-title>Enable messages</v-list-tile-title>
      </v-list-tile>

      <v-list-tile>
        <v-list-tile-action>
          <v-switch color="purple"></v-switch>
        </v-list-tile-action>
        <v-list-tile-title>Enable hints</v-list-tile-title>
      </v-list-tile>
    </v-list>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn flat>Cancel</v-btn>
      <v-btn color="primary" flat>Save</v-btn>
    </v-card-actions>
  </v-card>
  <!--
  <v-card tile>
    <v-toolbar card color="primary">
      <v-btn icon @click="$emit('closeDialog', null)">
        <v-icon>close</v-icon>
      </v-btn>
      <v-toolbar-title>스크랩 그룹 관리</v-toolbar-title>
      <v-spacer/>
      <v-toolbar-items v-if="$vuetify.breakpoint.xsOnly">
        <v-btn flat @click="save" :loading="loading">저장</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-card-text>
      <v-subheader>스크랩 그룹을 추가, 변경, 삭제할 수 있습니다.</v-subheader>
      <v-layout row>
        <v-flex xs12>
          <v-data-table hide-headers :items="tempScrapGroups" :rows-per-page-items="[-1]" class="mx-auto" :custom-filter="filterItem" :search="search">
            <template slot="items" slot-scope="props">
              <td class="cursor-pointer">
                <v-edit-dialog :return-value.sync="props.item.scrapGroupName" lazy large cancel-text="취소" save-text="확인">
                  {{props.item.scrapGroupName}}
                  <v-icon small class="ml-1">edit</v-icon>
                  <v-text-field slot="input" v-model="props.item.scrapGroupName" :rules="scrapGroupNameRules" label="스크랩 그룹 이름" single-line></v-text-field>
                </v-edit-dialog>
              </td>
              <td class="justify-center layout px-0">
                <v-icon small @click="deleteItem(props.index)">delete</v-icon>
              </td>
            </template>
            <template slot="actions-prepend">
              <v-btn class="short" v-if="$vuetify.breakpoint.xsOnly" :color="showCreateField?null:'primary'" small @click="toggleCreateBtn">{{showCreateField?'취소':'추가'}}</v-btn>
              <v-spacer></v-spacer>
            </template>
          </v-data-table>
          <v-layout row v-if="$vuetify.breakpoint.smAndUp">
            <v-btn id="largeCreateBtn" class="mb-3" @click="toggleCreateBtn">{{showCreateField?'취소':'추가'}}</v-btn>
            <template v-if="showCreateField">
              <v-text-field ref="newScrapGroupName" v-model="newScrapGroupName" validate-on-blur dense class="dense mt-0 pl-2" single-line label="추가할 그룹 이름" :rules="scrapGroupNameRules" @keydown.enter.stop="addNewRow"></v-text-field>
              <v-btn flat color="primary" class="short" @click="addNewRow">등록</v-btn>
            </template>
            <v-spacer/>
            <v-btn color="primary" @click="save" :loading="loading">저장</v-btn>
          </v-layout>
          <v-layout row v-show="showCreateField" v-else>
            <v-text-field ref="newScrapGroupName" v-model="newScrapGroupName" validate-on-blur dense class="dense mt-0 pl-2" single-line label="추가할 그룹 이름" :rules="scrapGroupNameRules" @keydown.enter.stop="addNewRow"></v-text-field>
            <v-btn small flat color="primary" @click="addNewRow">등록</v-btn>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>-->
</template>
<script>
export default {
  name: "NotificationCenter",
  props: ['dialog'],
  data() {
    return {};
  },
  methods: {
    showNotification(item){
      
    },
    closeDialog(){
      this.$emit('closeDialog', null);
    }
  },
  computed:{
    notifications(){
      return this.$store.getters.notifications
    }
  },
  watch:{
    dialog(val){
      if(val){
        this.showNotification();
      }
    }
  }
};
</script>
