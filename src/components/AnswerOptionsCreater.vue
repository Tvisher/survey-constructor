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
  <button class="btn red-btn" @click="addOption">Добавить вариант</button>
</template>

<script>
import { mapMutations } from "vuex";

import AnswerOption from "./pollSegments/AnswerOption.vue";
export default {
  components: {
    AnswerOption,
  },
  props: {
    pollItemId: { type: [Number, String] },
    optionsData: { type: Object },
  },
  methods: {
    ...mapMutations(["addOptionInPoll"]),
    addOption() {
      const pollItemId = this.pollItemId;
      this.addOptionInPoll(pollItemId);
    },
  },
};
</script>

<style></style>
