<template>
  <hr />
  {{ pollItemType }}
  <QuillEditor v-model:content="editorValueInComponent"></QuillEditor>
  <pre style="text-align: left">  {{ editorValue }}</pre>
  <br />
</template>

<script>
import { Delta } from "@vueup/vue-quill";
export default {
  props: {
    pollItemType: { type: String },
    editorValue: { type: Object },
  },

  emits: ["setEditorValue"],

  data() {
    return {
      editorValueInComponent: "",
    };
  },
  watch: {
    editorValueInComponent(newValue) {
      this.$emit("setEditorValue", newValue);
    },
  },
  mounted() {
    this.editorValueInComponent = new Delta(this.editorValue);
  },
};
</script>

<style>
.ql-toolbar {
  text-align: left;
}
.ql-editor {
  font-size: 18px;
}
</style>
