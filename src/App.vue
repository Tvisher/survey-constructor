<template>
  <InnerContent />
</template>

<script>
import InnerContent from "./components/InnerContent.vue";
export default {
  name: "App",
  components: {
    InnerContent,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
  mounted() {
    this.$store.dispatch("setPollTypesList");
  },
};
</script>

<style>
* {
  font-family: Montserrat;
}
</style>
