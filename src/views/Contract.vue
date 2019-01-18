<template>
  <component :is="$vuetify.breakpoint.smAndUp?'v-container':'div'" class="publicLayoutContents">
    <v-layout row height="200px" justify-center align-center>
      <v-card width="100%" flat>
        <v-card-title primary-title>
          <v-flex xs12>
            <h3 class="headline">Pedagy 이용약관</h3>
            <div class="text-xs-center justify-center align-center pa-3">
              <v-flex mt-5>페다지 이용약관 내용</v-flex>
            </div>
          </v-flex>
        </v-card-title>
      </v-card>
    </v-layout>
  </component>
</template>

<script>
import PublicLayout from "../layouts/PublicLayout";
export default {
  created() {
    this.$emit("update:layout", PublicLayout);
  },
  name: "Contract",
};
</script>