<template>
  <div>
    <div class="editor-descr">Текст вопроса</div>
    <div class="editor-wrapper">
      <QuillEditor v-model:content="editorValueInComponent"></QuillEditor>
    </div>
    <hr />
  </div>
</template>

<script>
// import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import { Delta } from "@vueup/vue-quill";
import { mapMutations } from "vuex";

export default {
  props: {
    pollItemId: { type: [Number, String] },
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
      const pollItemId = this.pollItemId;
      this.setSinglePollEditorValue({ pollItemId, editorValue });
    },
  },

  mounted() {
    this.editorValueInComponent = new Delta(
      JSON.parse(JSON.stringify(this.editorValue))
    );
  },
};
</script>

<style lang="scss"></style>
