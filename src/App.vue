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
  <!-- <pre>  {{ this.$store.state }}</pre> -->
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "App",
  data() {
    return {
      applicationReady: false,
    };
  },
  computed: {
    ...mapState({
      appColor: (state) => state.appSettings.appColor,
    }),
  },
  methods: {},

  beforeMount() {
    this.$store
      .dispatch("getQuizTemplate")
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
      .finally(() => (this.applicationReady = true));
  },
};
</script>

<style></style>
