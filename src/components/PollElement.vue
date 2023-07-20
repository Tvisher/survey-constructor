<template>
  <div class="poll-item">
    <div class="poll-item__head">
      <div class="poll-item__name">
        <div class="poll-item__num">{{ indexNumber }}</div>
        <div class="poll-item__title">{{ pollItemName }}</div>
      </div>
      <button class="poll-remove" @click="removePoll"></button>
    </div>
    <div class="editor-descr">Текст вопроса</div>
    <div class="editor-wrapper">
      <QuillEditor v-model:content="editorValueInComponent"></QuillEditor>
    </div>
    <pre style="text-align: left">  {{ editorValue }}</pre>
  </div>
</template>

<script>
import { Delta } from "@vueup/vue-quill";
import { mapMutations } from "vuex";

export default {
  props: {
    pollItemType: { type: String },
    pollItemName: { type: String },
    pollItemData: { type: Object },
    id: { type: Number },
    number: { type: Number },
  },

  data() {
    return {
      editorValueInComponent: "",
    };
  },
  computed: {
    indexNumber() {
      return this.number + 1;
    },
    editorValue() {
      return this.pollItemData.editorValue;
    },
  },
  methods: {
    ...mapMutations(["setSinglePollEditorValue", "removePollInState"]),
    removePoll() {
      this.removePollInState(this.id);
    },
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
.editor-descr {
  text-align: left;
  color: #707683;
  font-size: 14px;
  font-weight: 500;
  line-height: 100%;
  text-transform: uppercase;
  margin-bottom: 10px;
}
.poll-item {
  background: #fff;
  padding: 30px;
  margin-bottom: 20px;
}
.poll-item__head,
.poll-item__name {
  display: flex;
  align-items: center;
  color: #707683;
  font-size: 18px;
  font-weight: 500;
  line-height: 100%;
}
.poll-item__head {
  margin-bottom: 20px;
}

.poll-item__num {
  width: fit-content;
  background-color: #fa0056;
  padding: 10px 18px;
  border-radius: 123px;
  color: #fff;
  font-size: 18px;
  margin-right: 10px;
}

.poll-remove {
  background-color: transparent;
  cursor: pointer;
  width: 30px;
  height: 30px;
  outline: none;
  border: none;
  margin-left: auto;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cg clip-path='url(%23clip0_1122_45047)'%3e%3cpath d='M13.625 1.875H10.838L10.5333 0.961313C10.4401 0.681239 10.2611 0.437625 10.0217 0.265061C9.78223 0.0924975 9.4945 -0.000245665 9.19934 4.88728e-07H6.80066C6.50546 -0.000195446 6.2177 0.0925603 5.97818 0.265111C5.73867 0.437661 5.55957 0.681246 5.46628 0.961313L5.16194 1.875H2.375C1.59956 1.875 0.96875 2.50581 0.96875 3.28125V4.21875C0.96875 4.74088 1.43878 4.6875 1.94322 4.6875H14.5625C14.8216 4.6875 15.0312 4.47784 15.0312 4.21875V3.28125C15.0312 2.50581 14.4004 1.875 13.625 1.875ZM6.15041 1.875L6.35572 1.25794C6.38684 1.16457 6.44657 1.08337 6.52643 1.02585C6.60629 0.968337 6.70224 0.937425 6.80066 0.9375H9.19934C9.40122 0.9375 9.58022 1.06613 9.64384 1.25794L9.84937 1.875H6.15041ZM2.02081 5.6875L2.76822 14.721C2.83459 15.4502 3.43656 16 4.16853 16H11.8315C12.5635 16 13.1654 15.4502 13.2323 14.7169L13.9793 5.6875H2.02081ZM5.65625 13.6563C5.65625 14.2742 4.71875 14.2767 4.71875 13.6563V7.09375C4.71875 6.47584 5.65625 6.47331 5.65625 7.09375V13.6563ZM8.46875 13.6563C8.46875 14.2742 7.53125 14.2767 7.53125 13.6563V7.09375C7.53125 6.47584 8.46875 6.47331 8.46875 7.09375V13.6563ZM11.2812 13.6563C11.2812 14.2742 10.3438 14.2767 10.3438 13.6563V7.09375C10.3438 6.83466 10.5534 6.625 10.8125 6.625C11.0716 6.625 11.2812 6.83466 11.2812 7.09375V13.6563Z' fill='%23FA0056'/%3e%3c/g%3e%3cdefs%3e%3cclipPath id='clip0_1122_45047'%3e%3crect width='16' height='16' fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e ");
  background-repeat: no-repeat;
  background-size: 18px;
}

.editor-wrapper {
  margin-bottom: 20px;
}
</style>
