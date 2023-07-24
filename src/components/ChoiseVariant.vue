<template>
  <div class="editor-descr">Варианты</div>
  <answer-option
    v-for="variant in optionsData.optionsList"
    :key="variant.id"
    :variantData="variant"
    :inputsType="inputsType"
    :currentAnswerIdList="optionsData.currentAnswerId"
    :showRemoveBtn="permissionToRemoveOption"
    @selectVariant="selectVariant"
    @editVariant="editVariant($event, variant.id)"
    @removeVariant="removeVariant"
  />
  <button class="btn red-btn" v-if="permissionToAddOption" @click="addOption">
    Добавить вариант
  </button>
</template>

<script>
import { mapMutations } from "vuex";
import AnswerOption from "./pollSegments/AnswerOption.vue";

export default {
  components: {
    AnswerOption,
  },
  props: {
    pollPageId: { type: [Number, String] },
    pollItemId: { type: [Number, String] },
    optionsData: { type: Object },
    inputsType: { type: String },
  },

  computed: {
    permissionToAddOption() {
      const maxOptionsLength = this.optionsData.maxOptionsLength;
      const optionsLength = this.optionsData.optionsList.length;
      return maxOptionsLength >= optionsLength;
    },
    permissionToRemoveOption() {
      const minxOptionsLength = this.optionsData.minOptionsLength;
      const optionsLength = this.optionsData.optionsList.length;
      return optionsLength > minxOptionsLength;
    },
  },
  methods: {
    ...mapMutations([
      "selectOptionInPoll",
      "editOptionInPoll",
      "addOptionInPoll",
      "removeOptionInPoll",
    ]),
    addOption() {
      const { pollItemId, pollPageId } = this;
      this.addOptionInPoll({ pollPageId, pollItemId });
    },

    selectVariant(optionId) {
      const { pollItemId, pollPageId, inputsType } = this;
      this.selectOptionInPoll({ pollPageId, pollItemId, optionId, inputsType });
    },

    removeVariant(optionId) {
      const { pollItemId, pollPageId } = this;
      this.removeOptionInPoll({ pollPageId, pollItemId, optionId });
    },

    editVariant(event, optionId) {
      const { pollItemId, pollPageId } = this;
      const optionValue = event.target.value.trim();
      this.editOptionInPoll({ pollPageId, pollItemId, optionId, optionValue });
    },
  },
};
</script>

<style></style>
