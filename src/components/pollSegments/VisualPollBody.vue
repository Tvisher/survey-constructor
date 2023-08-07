<template>
  <div class="poll-body">
    <hr />
    <div class="poll-body__image-block" v-if="isHasImageInPoll">
      <img
        :src="pollItemData.pollImage.path"
        :alt="pollItemData.pollImage.name"
      />
    </div>
    <app-text-from-editor :editorValue="pollItemData.editorValue" />
    <app-single-choise-variant
      v-if="pollItemType === 'single-choice'"
      :optionsData="pollItemData.optionsData"
      :pollItemId="pollItemId"
    />
    <app-multi-choise-variant
      v-if="pollItemType === 'multiple-choice'"
      :optionsData="pollItemData.optionsData"
      :pollItemId="pollItemId"
    />
    <app-single-select
      v-if="pollItemType === 'drop-down-list'"
      :optionsData="pollItemData.optionsData"
      :pollItemId="pollItemId"
    />

    <app-multi-select
      v-if="pollItemType === 'multiple-drop-down-list'"
      :optionsData="pollItemData.optionsData"
      :pollItemId="pollItemId"
    />

    <app-range-slider
      v-if="pollItemType === 'range-selection'"
      :rangeData="pollItemData.rangeData"
      :pollItemId="pollItemId"
    />

    <app-ranging-visual
      v-if="pollItemType === 'ranging'"
      :optionsData="pollItemData.optionsData"
      :pollItemId="pollItemId"
    />
    <app-datapicker-visual
      v-if="pollItemType === 'date'"
      :dateData="pollItemData.dateData"
    />
  </div>
</template>

<script>
import AppTextFromEditor from "./visualPollSegments/TextFromEditor.vue";
import AppSingleChoiseVariant from "./visualPollSegments/SingleChioseVariant.vue";
import AppMultiChoiseVariant from "./visualPollSegments/MultiChioseVariant.vue";
import AppSingleSelect from "./visualPollSegments/SingleSelect.vue";
import AppMultiSelect from "./visualPollSegments/MultiSelect.vue";
import AppRangeSlider from "./visualPollSegments/RangeSlider.vue";
import AppPairRankingVisual from "./visualPollSegments/PairRankingVisual.vue";
import AppRangingVisual from "./visualPollSegments/RangingVisual.vue";
import AppDatapickerVisual from "./visualPollSegments/DatapickerVisual.vue";
export default {
  components: {
    AppTextFromEditor,
    AppSingleChoiseVariant,
    AppMultiChoiseVariant,
    AppSingleSelect,
    AppMultiSelect,
    AppRangeSlider,
    AppPairRankingVisual,
    AppRangingVisual,
    AppDatapickerVisual,
  },
  props: {
    pollItemId: { type: [Number, String] },
    pollItemType: { type: String },
    pollItemData: { type: Object },
  },
  computed: {
    isHasImageInPoll() {
      const pollImage = this.pollItemData.pollImage;
      return pollImage && Object.keys(pollImage).length !== 0;
    },
  },
};
</script>

<style></style>
