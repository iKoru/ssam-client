<template>
    <v-container v-if="board">
        <v-chip>{{board.boardName}}</v-chip> <v-chip>{{board.boardType}}</v-chip>
        <div>
            {{board.boardDescription}}
        </div>
        <router-view/>
    </v-container>
</template>

<script>
export default {
    name: 'Board',
    data: () => ({
        board: undefined
    }),
    components: {
    },
    created () {
        console.log(this.$route.params.boardId)
        this.$axios.get(`/board?boardId=${this.$route.params.boardId}`)
            .then(response => {
                console.log(response)
                this.board = response.data
            })
            .catch(error => {
                console.log(error)
            });
    },
    methods:{
        writeDocument: function() {
            this.$router.replace(`/board/${this.$route.params.boardId}/writeDocument`)
        }
    }
}
</script>

