<template>
    <v-flex>
         <v-data-table
          :headers="headers"
          :items="list"
          class="elevation-1"
        >
          <template slot="items" slot-scope="props">
            <td @click.stop="viewDocument(props.item)">{{ props.item.title }}</td>
            <td class="text-xs-center">{{ props.item.writeDateTime }}</td>
            <td class="text-xs-center">{{ props.item.nickName }}</td>
          </template>
        </v-data-table>
    </v-flex>
</template>
<script>
export default {
  name: 'BoardList',
  data: () => ({
    board: undefined,
    headers: [
      {
        text: '제목',
        value: 'title',
        sortable: false
      },
      {
        text: '작성일',
        value: 'writeDateTime',
        align: 'center',
        sortable: false
      },
      {
        text: '작성자',
        value: 'nickName',
        align: 'center',
        sortable: false
      }
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
