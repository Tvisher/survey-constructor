<template>
  <div class="editor-descr">Варианты</div>
  <answer-option
    v-for="variant in optionsData.optionsList"
    :key="variant.id"
    :variantData="variant"
    :currentAnswerId="currentOption"
    @selectVariant="selectVariant"
    @editVariant="editVariant($event, variant.id)"
    @removeVariant="removeVariant"
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
  computed: {
    currentOption() {
      return this.optionsData.currentAnswerId[0] || 1;
    },
  },
  methods: {
    ...mapMutations([
      "selectCurrentOptionInPoll",
      "editCurrentOptionInPoll",
      "addOptionInPoll",
      "removeCurrentOptionInPoll",
    ]),
    addOption() {
      const pollItemId = this.pollItemId;
      this.addOptionInPoll(pollItemId);
    },

    selectVariant(optionId) {
      const pollItemId = this.pollItemId;
      this.selectCurrentOptionInPoll({ pollItemId, optionId });
    },

    removeVariant(optionId) {
      const pollItemId = this.pollItemId;
      this.removeCurrentOptionInPoll({ pollItemId, optionId });
    },

    editVariant(event, variantId) {
      const optionId = variantId;
      const pollItemId = this.pollItemId;
      const optionValue = event.target.value.trim();
      this.editCurrentOptionInPoll({ pollItemId, optionId, optionValue });
    },
  },
};
</script>

<style></style>
