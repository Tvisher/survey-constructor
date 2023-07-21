<template>
  <div class="editor-descr">Варианты</div>
  <answer-option
    v-for="(variant, index) in optionsData.optionsList"
    :key="variant.id"
    :pollItemId="pollItemId"
    :variantData="variant"
    :currentAnswerId="optionsData.currentAnswerId"
    :variantNumber="index"
  />
</template>

<script>
import AnswerOption from "./pollSegments/AnswerOption.vue";
export default {
  components: {
    AnswerOption,
  },
  props: {
    pollItemId: { type: [Number, String] },
    optionsData: { type: Object },
  },
};
</script>

<style></style>
