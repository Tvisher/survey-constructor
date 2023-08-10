<template>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  },
  computed: {},
  methods: {},

  beforeMount() {
    this.$store.dispatch("setPollTypesList");
  },
};
</script>

<style>
* {
  font-family: Montserrat;
}
:root {
  --app-color: #fa0056;
}
</style>
