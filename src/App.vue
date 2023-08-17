<template>
  <transition name="fade">
    <div class="poll-app" v-if="applicationReady">
      <div class="container">
        <router-view v-slot="{ Component }">
          <transition name="fade">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "App",
  computed: {
    ...mapState({
      appColor: (state) => state.appSettings.appColor,
      applicationReady: (state) => state.applicationReady,
    }),
  },
  methods: {},

  beforeMount() {
    this.$store.dispatch("getQuizTemplate");
  },
};
</script>

<style></style>
