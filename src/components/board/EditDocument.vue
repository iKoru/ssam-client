<template>
    <v-layout>
      <v-flex row>
        <Editor :boardId="boardId" :documentId="documentId" :board="board"/>
      </v-flex>
    </v-layout>
</template>

<script>
export default {
  name: 'EditDocument',
  props: ['boardId', 'documentId', 'board'],
  components: {
    Editor: () => import('@/components/board/editor/Editor')
  }
}
</script>
