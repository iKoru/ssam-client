<template>
  <v-container px-0 fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout row wrap align-center>
        <v-flex xs8 offset-xs2>
          <router-view/>
        </v-flex>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import MainLayout from "../layouts/MainLayout";
export default {
  name: "Home",
  components: {
    Menu: () => import("@/components/Menu"),
    MenuDrawer: () => import("@/components/MenuDrawer")
  },
  data() {
    return {
      boards: []
    };
  },
  created() {
    this.$emit("update:layout", MainLayout);
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
