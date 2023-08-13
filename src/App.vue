<template>
  <div class="poll-app">
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "App",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      appColor: (state) => state.appSettings.appColor,
    }),
  },
  methods: {},

  beforeMount() {
    this.$store.dispatch("setCollorsTemplates");
    this.$store.dispatch("setPollTypesList");

    if (this.appColor && this.appColor.value) {
      document.body.style.setProperty("--app-color", this.appColor.value);
    }
  },
};
</script>

<style>
.poll-app {
  padding-bottom: 90px;
  min-height: 100vh;
}
* {
  font-family: Montserrat;
}
:root {
  --app-color: #fa0056;
}
</style>
