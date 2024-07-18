<template>
  <div class="variant-item" :class="{ 'has-editor': isNeddedEditor }">
    <div class="variant-item__dragg"></div>
    <div class="variant-item__wrapper">
      <label class="variant-item__label">
        <input
          type="text"
          class="variant-item__filed"
          :value="variantData.value"
          :placeholder="`Вариант ответа № ${optionNumber}`"
          @input="$emit('editVariant', $event)"
        />
      </label>
      <label class="custom-cb" v-if="hasCorrectAnswers">
        <input
          :type="inputsType"
          class="custom-cb__checkbox"
          :checked="isCurrentVariant"
          @input="$emit('selectVariant', variantData.id)"
        />
        <span class="custom-cb__text">Правильный ответ</span>
      </label>
    </div>
    <button
      class="variant-item__remove"
      :class="{ 'cant-remove': !showRemoveBtn }"
      @click="removeOption"
    ></button>
    <div class="single-chiose-editor" v-if="isNeddedEditor">
      <span class="single-chiose-editor-descr">Описание для ответа:</span>
      <QuillEditor v-model:content="editorValueInComponent"></QuillEditor>
    </div>
  </div>
</template>

<script>
import { Delta } from "@vueup/vue-quill";

import { mapState, mapMutations } from "vuex";

export default {
  props: {
    numberPosition: { type: [String, Number] },
    inputsType: { type: String },
    appType: { type: String },
    pollItemType: { type: String },
    currentAnswerIdList: { type: Array },
    variantData: { type: Object },
    showRemoveBtn: { type: Boolean },
    pollItemId: { type: String },
  },
  data() {
    return {
      editorValueInComponent: "",
    };
  },
  computed: {
    ...mapState({
      hasCorrectAnswers: (state) => state.appSettings.hasCorrectAnswers,
    }),
    optionNumber() {
      return this.numberPosition + 1;
    },
    isCurrentVariant() {
      return this.currentAnswerIdList.includes(this.variantData.id);
    },
    isNeddedEditor() {
      return this.pollItemType === "single-choice" && this.appType === "quiz";
    },
  },
  methods: {
    ...mapMutations(["setSingleChoiseEditorValue"]),
    removeOption() {
      if (this.showRemoveBtn) {
        this.$emit("removeVariant", this.variantData.id);
      }
    },
  },
  watch: {
    editorValueInComponent(newVal, oldVal) {
      const data = {
        pollItemId: this.pollItemId,
        optionId: this.variantData.id,
        editorValue: newVal,
      };
      this.setSingleChoiseEditorValue(data);
    },
  },

  mounted() {
    if (this.variantData.descriptionValue) {
      this.editorValueInComponent = new Delta(
        JSON.parse(JSON.stringify(this.variantData.descriptionValue))
      );
    }
  },
};
</script>

<style lang="scss">
.variant-item {
  &.ghost-potion {
    margin-right: 0;
    margin-left: 0;
    border-style: dashed;
    border-color: var(--app-color);
    * {
      opacity: 0;
    }
  }
  &.sortable-drag {
    opacity: 1 !important;
    background: #ecf4ff;
  }
  &.has-editor {
    overflow: inherit;
    margin: 0;
    border: 1px solid #ecf4ff;
    margin-bottom: 20px;
    padding: 20px 10px;
    flex-wrap: wrap;
    .variant-item__wrapper {
      width: calc(100% - 50px);
    }
  }
}

.single-chiose-editor {
  padding-top: 10px;
  padding-left: 20px;
  padding-right: 30px;
  width: 100%;
  .ql-editor {
    min-height: 80px;
    padding: 15px;
    font-size: 16px;
  }
}

.single-chiose-editor-descr {
  font-size: 15px;
  margin-bottom: 5px;
  display: block;
  font-weight: 500;
}
</style>
