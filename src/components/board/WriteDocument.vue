<template>
    <v-container>
        WriteDocumentHere
        <Editor/>
    </v-container>
</template>

<script>
export default {
    name: 'WriteDocument',
    components: {
        Editor: () => import('@/components/board/editor/Editor')
    },
    created () {
        console.log('write document')
    }
}
</script>

