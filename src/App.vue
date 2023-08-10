<template>
  <div class="poll-app">
    <div class="container">
      <router-view></router-view>
    </div>
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
.poll-app {
  padding-bottom: 90px;
}
* {
  font-family: Montserrat;
}
:root {
  --app-color: #fa0056;
}
</style>
