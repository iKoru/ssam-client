<template>
    <v-flex>
         <v-data-table
          :headers="headers"
          :items="list"
          hide-actions
          class="elevation-1"
        >
          <template slot="items" slot-scope="props">
            <td @click.stop="viewDocument(props.item)">{{ props.item.title }} <span v-if="props.item.commentCount" style="color:indigo">({{props.item.commentCount}})</span></td>
            <td class="text-xs-center">{{ props.item.nickName }}</td>
            <td class="text-xs-center">{{ timeParser(props.item.writeDateTime)  }}</td>
            <td class="text-xs-center">{{ props.item.voteUpCount }}</td>
          </template>
        </v-data-table>
    </v-flex>
</template>
<script>

import BoardMixins from '@/components/mixins/BoardMixins'
export default {
  name: 'BoardList',
  mixins: [BoardMixins],
  data: () => ({
    board: undefined,
    headers: [
      {
        text: '제목',
        value: 'title',
        sortable: false,
        width: '300'
      },
      {
        text: '글쓴이',
        value: 'nickName',
        align: 'center',
        sortable: false,
        width: '50'
      },
      {
        text: '날짜',
        value: 'writeDateTime',
        align: 'center',
        sortable: false,
        width: '50'
      },
      {
        text: '추천',
        value: 'voteUpCount',
        align: 'center',
        sortable: false,
        width: '40'
      },
    ],
    list: []
  }),
  components: {
  },
  methods: {
    getList (boardId) {
      this.$axios.get(`/${boardId}`)
        .then(response => {
          console.log(response)
          this.list = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    viewDocument (item) {
      this.$router.push(`${this.$route.params.boardId}/${item.documentId}`)
    }
  },
  created () {
    this.getList(this.$route.params.boardId)
  },
  beforeRouteUpdate (to, from, next) {
    this.getList(to.path.replace('/',''))
    next()
  }
}
</script>
