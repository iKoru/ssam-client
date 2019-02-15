<template>
  <v-card tile>
    <v-toolbar card color="white">
      <v-toolbar-title>스크랩 그룹 관리</v-toolbar-title>
      <v-spacer/>
      <v-toolbar-items>
        <v-btn icon @click="$emit('closeDialog', null)">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-card-text>
      <v-subheader>스크랩 그룹을 추가, 변경, 삭제할 수 있습니다.</v-subheader>
      <v-layout row>
        <v-flex xs12>
          <v-data-table id="scrapGroupTable" hide-headers :items="tempScrapGroups" :rows-per-page-items="[-1]" class="mx-auto customAction" :custom-filter="filterItem" :search="search">
            <template slot="items" slot-scope="props">
              <td class="cursor-pointer wrap">
                <v-edit-dialog :return-value.sync="props.item.scrapGroupName" lazy large cancel-text="취소" save-text="확인">
                  <span class="multi-row">{{props.item.scrapGroupName}}</span>
                  <v-icon small class="ml-1">edit</v-icon>
                  <v-text-field slot="input" v-model="props.item.scrapGroupName" :rules="scrapGroupNameRules" label="스크랩 그룹 이름" class="dense pt-3" single-line></v-text-field>
                </v-edit-dialog>
              </td>
              <td class="justify-center align-center layout px-0">
                <v-icon small @click="deleteItem(props.index)">delete</v-icon>
              </td>
            </template>
            <template slot="actions-prepend">
              <template v-if="$vuetify.breakpoint.xsOnly">
                <v-btn class="short" :color="showCreateField?null:'primary'" small flat @click="toggleCreateBtn">{{showCreateField?'취소':'추가'}}</v-btn>
                <v-btn class="short" color="primary" small @click="save" :loading="loading">저장</v-btn>
              </template>
              <v-spacer></v-spacer>
            </template>
          </v-data-table>
          <v-layout row v-if="$vuetify.breakpoint.smAndUp" align-center>
            <v-btn id="largeCreateBtn" class="mb-3" :color="showCreateField?null:'primary'" flat @click="toggleCreateBtn">{{showCreateField?'취소':'추가'}}</v-btn>
            <template v-if="showCreateField">
              <v-text-field ref="newScrapGroupName" v-model="newScrapGroupName" validate-on-blur dense class="dense mt-0 pl-2" single-line label="추가할 그룹 이름" :rules="scrapGroupNameRules" @keydown.enter="addNewRow"></v-text-field>
              <v-btn flat color="primary" @click="addNewRow">등록</v-btn>
            </template>
            <v-spacer/>
            <v-btn color="primary" @click="save" :loading="loading">저장</v-btn>
          </v-layout>
          <v-layout row v-show="showCreateField" align-center v-else>
            <v-text-field ref="newScrapGroupName" v-model="newScrapGroupName" validate-on-blur dense class="dense mt-0 pl-2" single-line label="추가할 그룹 이름" :rules="scrapGroupNameRules" @keydown.enter="addNewRow"></v-text-field>
            <v-btn small flat color="primary" @click="addNewRow">등록</v-btn>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: 'ScrapGroupManager',
  props: ['scrapGroups', 'dialog'],
  data () {
    return {
      loading: false,
      headers: [{ text: '그룹 이름', value: 'scrapGroupName', sortable: false }, { sortable: false }],
      scrapGroupNameRules: [v => !!v || '이름을 입력해주세요.', v => (!!v && v.length <= 50) || '50자 이내로 입력해주세요.'],
      tempScrapGroups: [],
      showCreateField: false,
      newScrapGroupName: null,
      search: true
    };
  },
  methods: {
    save (value) {
      if (JSON.stringify(this.tempScrapGroups) === JSON.stringify(this.scrapGroups)) {
        this.$store.dispatch('showSnackbar', { text: '변경된 내용이 없습니다.', color: 'info' });
        return;
      }
      if (this.tempScrapGroups.every(x => x.status === 'DELETED')) {
        this.$store.dispatch('showSnackbar', { text: '최소 하나 이상의 스크랩 그룹은 있어야 합니다.', color: 'error' });
        return;
      }
      if (this.tempScrapGroups.some(x => x.status === 'DELETED') && !confirm('삭제할 스크랩 그룹이 있으시군요.\n해당 그룹의 스크랩은 모두 지워집니다. 정말 삭제하시겠어요?')) {
        return;
      }
      this.$axios
        .put('/scrap/group', { scrapGroups: this.tempScrapGroups })
        .then(response => {
          if (Array.isArray(response.data.failedGroup) && response.data.failedGroup.length > 0) {
            this.$store.dispatch('showSnackbar', { text: `오류가 있는 ${response.data.failedGroup.join(', ')}번째 항목을 제외하고 처리되었습니다.`, color: 'warn' });
            this.$emit('updateScrapGroup', null);
          } else {
            this.$store.dispatch('showSnackbar', { text: '변경된 내용을 반영하였습니다.', color: 'success' });
            this.$emit('updateScrapGroup', null);
            this.$emit('closeDialog', null);
          }
        })
        .catch(error => {
          this.$store.dispatch('showSnackbar', { text: error.response ? error.response.data.message || '변경 내용을 반영하지 못했습니다.' : '변경 내용을 반영하지 못했습니다.', color: 'error' });
        });
    },
    deleteItem (index) {
      let i = 0;
      while (i < this.tempScrapGroups.length && i <= index) {
        if (this.tempScrapGroups[i].status === 'DELETED') {
          index++;
        }
        i++;
      }
      if (this.tempScrapGroups[index].scrapGroupId) {
        this.tempScrapGroups[index].status = 'DELETED';
        this.search = !this.search;
      } else {
        this.tempScrapGroups.splice(index, 1);
      }
    },
    addNewRow () {
      if (this.$refs.newScrapGroupName.validate()) {
        this.tempScrapGroups.push({ scrapGroupName: this.newScrapGroupName });
        this.newScrapGroupName = null;
        this.showCreateField = false;
      } else {
        this.$store.dispatch('showSnackbar', { text: '추가할 스크랩 그룹 이름이 올바르지 않습니다.', color: 'error' });
      }
    },
    resetScrapGroups () {
      this.tempScrapGroups = JSON.parse(JSON.stringify(this.scrapGroups)).map(x => ({ ...x, status: 'NORMAL' }));
    },
    filterItem (item) {
      return item.filter(x => x.status !== 'DELETED');
    },
    toggleCreateBtn () {
      this.newScrapGroupName = null;
      this.showCreateField = !this.showCreateField;
      if (this.showCreateField) {
        this.$nextTick(() => {
          this.$refs.newScrapGroupName.focus();
        });
      }
    }
  },
  created () {
    this.resetScrapGroups();
  },
  watch: {
    dialog (val) {
      if (val) {
        this.resetScrapGroups();
        document.body.style.position = 'fixed';
      } else {
        document.body.style.position = 'initial';
      }
    }
  }
};
</script>
<style>
#scrapGroupTable .v-datatable__actions .v-btn:last-of-type {
  margin-left: 8px;
}
#largeCreateBtn + .v-input.dense {
  width: 0px;
}
#scrapGroupTable .v-small-dialog a > * {
  width: auto;
}
</style>
