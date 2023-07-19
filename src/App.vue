<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <PollElement
    v-for="pollItem in pollList"
    :pollItemType="pollItem.type"
    :editorValue="pollItem.data.editorValue"
    :key="pollItem.id"
    :id="pollItem.id"
  />
</template>

<script>
import PollElement from "./components/PollElement.vue";
import { mapState } from "vuex";
export default {
  name: "App",
  components: {
    PollElement,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      pollList: (state) => state.pollList,
    }),
  },
  methods: {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
