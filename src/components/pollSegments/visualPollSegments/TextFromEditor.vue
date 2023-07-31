<template>
  <div>
    <div class="poll-item__answer" v-html="deltaToHtml"></div>
  </div>
</template>

<script>
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import { Delta } from "@vueup/vue-quill";

export default {
  props: {
    editorValue: { type: Object },
  },
  data() {
    return {
      editorValueInComponent: "",
    };
  },

  computed: {
    deltaToHtml() {
      const deltaOps = this.editorValueInComponent.ops;
      const converter = new QuillDeltaToHtmlConverter(deltaOps, {});
      return converter.convert();
    },
  },

  mounted() {
    this.editorValueInComponent = new Delta(
      JSON.parse(JSON.stringify(this.editorValue))
    );
  },
};
</script>

<style></style>
