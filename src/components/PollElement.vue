<template>
  <div class="poll-item">
    <div class="poll-item__head">
      <div class="poll-item__name">
        <div class="poll-item__num">{{ indexNumber }}</div>
        <div class="poll-item__title">{{ pollItemName }}</div>
      </div>
      <button class="poll-remove" @click="removePoll"></button>
    </div>

    <editor-component
      :pollItemId="pollItemId"
      :pollPageId="pollPageId"
      :editorValue="pollItemData.editorValue"
    />

    <choise-variant
      v-if="isOptionsNeeded"
      :pollPageId="pollPageId"
      :pollItemId="pollItemId"
      :optionsData="pollItemData.optionsData"
      :inputsType="inputsType"
    />

    <ranging
      v-if="pollItemType === 'ranging'"
      :pollPageId="pollPageId"
      :pollItemId="pollItemId"
      :optionsData="pollItemData.optionsData"
    />

    <range-selection
      v-if="pollItemType === 'range-selection'"
      :pollItemId="pollItemId"
      :rangeData="pollItemData.rangeData"
    />
    <pair-ranking
      v-if="pollItemType === 'pair-ranking'"
      :pollItemId="pollItemId"
      :optionsData="pollItemData.optionsData"
    />
  </div>
</template>

<script>
import { mapMutations } from "vuex";

import EditorComponent from "./pollSegments/EditorComponent.vue";
import ChoiseVariant from "./ChoiseVariant.vue";
import Ranging from "./Ranging.vue";
import RangeSelection from "./RangeSelection.vue";
import PairRanking from "./PairRanking.vue";

export default {
  components: {
    EditorComponent,
    ChoiseVariant,
    Ranging,
    RangeSelection,
    PairRanking,
  },
  props: {
    pollPageId: { type: [Number, String] },
    pollItemId: { type: [Number, String] },
    pollItemType: { type: String },
    pollItemName: { type: String },
    pollItemData: { type: Object },
    pollNumber: { type: Number },
  },

  data() {
    return {};
  },
  computed: {
    indexNumber() {
      return this.pollNumber + 1;
    },

    isOptionsNeeded() {
      return [
        "single-choice",
        "drop-down-list",
        "multiple-drop-down-list",
        "multiple-choice",
      ].includes(this.pollItemType);
    },

    inputsType() {
      if (
        this.pollItemType === "single-choice" ||
        this.pollItemType === "drop-down-list"
      ) {
        return "radio";
      }
      if (
        this.pollItemType === "multiple-drop-down-list" ||
        this.pollItemType === "multiple-choice"
      ) {
        return "checkbox";
      }
    },
  },
  methods: {
    ...mapMutations(["removePollInPage"]),
    removePoll() {
      const pollPageId = this.pollPageId;
      const pollId = this.pollItemId;
      this.removePollInPage({ pollPageId, pollId });
    },
  },
  mounted() {},
};
</script>

<style></style>
