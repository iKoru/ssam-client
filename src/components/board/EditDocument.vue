<template>
    <v-layout>
      <v-flex row>
        <Editor :boardId="boardId" :documentId="documentId"/>
      </v-flex>
    </v-layout>
</template>

<script>
export default {
  name: 'EditDocument',
  props: ['boardId', 'documentId'],
  components: {
    Editor: () => import('@/components/board/editor/Editor')
  },
  created () {
    console.log(this.boardId, this.documentId)
  }
}
</script>
