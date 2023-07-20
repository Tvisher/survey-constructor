<template>
  <QuillEditor v-model:content="editorValueInComponent"></QuillEditor>
</template>

<script>
import { Delta } from "@vueup/vue-quill";
import { mapMutations } from "vuex";

export default {
  props: {
    pollNumber: { type: Number },
    editorValue: { type: Object },
  },
  data() {
    return {
      editorValueInComponent: "",
    };
  },
  methods: {
    ...mapMutations(["setSinglePollEditorValue"]),
  },

  watch: {
    editorValueInComponent(editorValue, oldValue) {
      if (oldValue === "") return;
      const itemId = this.pollItemId;
      this.setSinglePollEditorValue({ itemId, editorValue });
    },
  },

  mounted() {
    this.editorValueInComponent = new Delta(this.editorValue);
  },
};
</script>

<style></style>
