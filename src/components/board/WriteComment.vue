<template>
    <v-layout>
      <v-flex xs10 px-3 py-3>
          <v-textarea
            height="80"
            name="commentInput"
            solo
            label="댓글을 입력해주세요"
            auto-grow
            hide-details
            
            ></v-textarea>
      </v-flex>
      <v-flex xs2>
        <v-checkbox hide-details label="익명">
        </v-checkbox>
        <v-btn full-width>
            입력
        </v-btn>
      </v-flex>
    </v-layout>
</template>

<script>
export default {
  name: 'WriteComment',
  components: {
  },
  created () {
    console.log('write document')
  }
}
</script>
<style>
textarea {
    height: 80px!important;
}
.v-text-field__slot{
    height: 100px !important;
}
</style>