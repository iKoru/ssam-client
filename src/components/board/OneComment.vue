<template>
    <v-list-tile-content>
        <v-list-tile-title>
             <v-layout row>
                <v-flex xs11 my-auto pt-2 text-xs-left style="height:wrap-content">
                    <div v-html="deltaToHTML(JSON.parse(comment.contents))">
                    </div>
                </v-flex>
                <v-spacer/>
                <v-flex text-xs-right px-2 my-auto style="cursor:pointer" @click="voteUp">
                    <v-icon color="indigo" small>thumb_up</v-icon>
                    &nbsp;
                    <v-label color="indigo">{{comment.voteUpCount}}</v-label>
                </v-flex>
            </v-layout>
        </v-list-tile-title>
        <v-list-tile-sub-title>
            <v-layout row pb-2>
                <v-flex xs9 my-auto text-xs-left>
                    {{comment.nickName}}({{comment.animalName}}) &middot; {{timeParser(comment.writeDateTime)}}
                    <span v-if="!children"> &middot;
                        <span
                            style="cursor:pointer"
                            @click="$emit('openRecomment', commentIndex)">
                            대댓글
                            <span v-if="comment.childCount">
                                ({{comment.childCount}})
                            </span>
                        </span>
                    </span>
                </v-flex>
                <v-spacer/>
                <v-flex text-xs-right @click="deleteComment">
                    수정/삭제/신고
                </v-flex>
            </v-layout>
        </v-list-tile-sub-title>
    </v-list-tile-content>
</template>

<script>
import BoardMixins from '@/components/mixins/BoardMixins'
import Quill from 'quill'

export default {
    props: ['comment', 'commentIndex', 'children'],
    mixins: [BoardMixins],
    methods: {
        voteUp() {
            console.log('vote')
        },
        deleteComment () {
            this.$axios.delete(`/comment/${this.comment.commentId}`)
                .then(res => console.log(res))
                .catch(err=>console.log(err))
        },
        deltaToHTML(delta) {
            var tempCont = document.createElement("div");
            let quill = new Quill(tempCont);
            delta.ops.forEach(item => {
                if (item.insert.hasOwnProperty("image")) {
                // random generated uuid should given here
                // item.insert.image = this.getImagePath(item.insert.image);
                }
            });
            quill.setContents(delta);
            return tempCont.getElementsByClassName("ql-editor")[0].innerHTML;
        },
        getImagePath(imagePath) {
            console.log(this.comment)
            let attach = this.comment.attach
            return this.webUrl + attach.find(item => item.attachName === imagePath).attachPath;
        },
    }
}
</script>
