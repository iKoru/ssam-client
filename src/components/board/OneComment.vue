<template>
    <v-list-tile-content>
        <v-list-tile-title>
             <v-layout row>
                <v-flex xs11 text-xs-left>
                    {{comment.contents}}
                </v-flex>
                <v-flex xs1 text-xs-right>
                    <v-chip small color="indigo" text-color="white" @click.native="voteDocument">
                        <div class="vote-chip">
                        <v-avatar>
                            <v-icon color="white" small>thumb_up</v-icon>
                        </v-avatar>
                        {{comment.voteUpCount}}
                        </div>
                    </v-chip>
                </v-flex>
            </v-layout>
        </v-list-tile-title>
        <v-list-tile-sub-title>
            <v-layout row>
                <v-flex xs6 text-xs-left>
                    {{comment.nickName}}({{comment.animalName}}) &middot; {{timeParser(comment.writeDateTime)}} &middot; <span style="cursor:pointer" @click="$emit('openRecomment', commentIndex)">대댓글<span v-if="comment.childCount">({{comment.childCount}})</span></span>
                </v-flex>
                <v-flex xs6 text-xs-right>
                    수정/삭제/신고
                </v-flex>
            </v-layout>
        </v-list-tile-sub-title>
    </v-list-tile-content>
</template>

<script>
import BoardMixins from '@/components/mixins/BoardMixins'

export default {
    props: ['comment', 'commentIndex'],
    mixins: [BoardMixins]
}
</script>
