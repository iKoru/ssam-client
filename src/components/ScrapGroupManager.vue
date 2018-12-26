<template>
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
          <v-data-table hide-headers :items="tempScrapGroups" :rows-per-page-items="[5]" class="mx-auto">
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
              <v-btn class="short" v-if="$vuetify.breakpoint.xsOnly" :color="showCreateField?null:'primary'" small @click="newScrapGroupName=null;showCreateField=!showCreateField">{{showCreateField?'취소':'추가'}}</v-btn>
              <v-spacer></v-spacer>
            </template>
          </v-data-table>
          <v-layout row v-if="$vuetify.breakpoint.smAndUp">
            <v-btn id="largeCreateBtn" class="mb-3" @click="newScrapGroupName=null;showCreateField=!showCreateField">{{showCreateField?'취소':'추가'}}</v-btn>
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
  </v-card>
</template>
<script>
export default {
  name: "ScrapGroupManager",
  props: ["scrapGroups"],
  data() {
    return {
      loading: false,
      headers: [{text: "그룹 이름", value: "scrapGroupName", sortable: false}, {sortable: false}],
      scrapGroupNameRules: [v => !!v || "이름을 입력해주세요.", v => (!!v && v.length <= 50) || "50자 이내로 입력해주세요."],
      tempScrapGroups: [],
      showCreateField: false,
      newScrapGroupName: null
    };
  },
  methods: {
    save(value) {
      console.log("saved", value);
    },
    deleteItem(index) {
      this.tempScrapGroups.splice(index, 1);
    },
    addNewRow() {
      if (this.$refs.newScrapGroupName.validate()) {
        this.tempScrapGroups.push({scrapGroupName: this.newScrapGroupName});
        this.newScrapGroupName = null;
        this.showCreateField = false;
      } else {
        this.$store.dispatch("showSnackbar", {text: "추가할 스크랩 그룹 이름이 올바르지 않습니다.", color: "error"});
      }
    }
  },
  created() {
    this.tempScrapGroups = JSON.parse(JSON.stringify(this.scrapGroups));
  }
};
</script>
<style>
.v-datatable__actions .v-btn:last-of-type {
  margin-left: 8px;
}
.v-datatable__actions__pagination {
  margin: 0;
}
#largeCreateBtn + .v-input.dense {
  width: 0px;
}
</style>