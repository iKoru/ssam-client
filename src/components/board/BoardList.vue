<template>
    <v-container>
        
        게시물 목록
        <v-btn color="success" @click.stop="writeDocument">글쓰기</v-btn>
    </v-container>
</template>
<script>
export default {
    name: 'BoardList',
    data: () => ({
        board: undefined
    }),
    components: {
    },
    created () {
    },
    methods:{
        writeDocument: function() {
            this.$router.replace(`/board/${this.$route.params.boardId}/writeDocument`)
        }
    }
}
</script>