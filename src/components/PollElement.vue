<template>
  <hr />
  {{ pollItemType }}

  <QuillEditor v-model:content="editorValueInComponent"></QuillEditor>

  <pre style="text-align: left">  {{ editorValue }}</pre>
  <br />
</template>

<script>
import { Delta } from "@vueup/vue-quill";
import { mapMutations } from "vuex";

export default {
  props: {
    pollItemType: { type: String },
    editorValue: { type: Object },
    id: { type: Number },
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
      const itemId = this.id;
      this.setSinglePollEditorValue({ itemId, editorValue });
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
