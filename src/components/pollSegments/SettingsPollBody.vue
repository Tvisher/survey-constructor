<template>
  <div class="poll-body">
    <div class="editor-descr">Изображение для вопроса</div>
    <app-image-loader
      :addedImage="pollItemData.pollImage"
      :maxFileSize="1.5"
      @imageAdded="addImageInPoll"
    />
    <hr />

    <app-editor-component
      :pollItemId="pollItemId"
      :editorValue="pollItemData.editorValue"
    />
    <app-choise-variant
      v-if="isOptionsNeeded"
      :pollItemId="pollItemId"
      :optionsData="pollItemData.optionsData"
      :inputsType="inputsType"
      :pollItemType="pollItemType"
    />
    <app-ranging
      v-if="pollItemType === 'ranging'"
      :pollItemId="pollItemId"
      :optionsData="pollItemData.optionsData"
    />
    <app-range-selection
      v-if="pollItemType === 'range-selection'"
      :pollItemId="pollItemId"
      :rangeData="pollItemData.rangeData"
    />
    <app-pair-ranking
      v-if="pollItemType === 'pair-ranking'"
      :pollItemId="pollItemId"
      :optionsData="pollItemData.optionsData"
    />

    <app-date-option
      v-if="pollItemType === 'date'"
      :pollItemId="pollItemId"
      :dateData="pollItemData.dateData"
    />
    <app-custom-fields
      v-if="pollItemType === 'custom-fields'"
      :pollItemId="pollItemId"
      :optionsData="pollItemData.optionsData"
    />
  </div>
</template>

<script>
import AppEditorComponent from "./EditorComponent.vue";
import AppImageLoader from "./ImageLoader.vue";
import AppChoiseVariant from "./ChoiseVariant.vue";
import AppRanging from "./Ranging.vue";
import AppRangeSelection from "./RangeSelection.vue";
import AppPairRanking from "./PairRanking.vue";
import AppDateOption from "./DateOption.vue";
import AppCustomFields from "./CustomFields.vue";
export default {
  components: {
    AppEditorComponent,
    AppChoiseVariant,
    AppRanging,
    AppRangeSelection,
    AppPairRanking,
    AppImageLoader,
    AppDateOption,
    AppCustomFields,
  },
  props: {
    pollItemId: { type: [Number, String] },
    pollItemType: { type: String },
    pollItemData: { type: Object },
  },
  computed: {
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
    addImageInPoll(newImageData) {
      const { pollItemId } = this;
      this.$store.commit("addImageinPoll", {
        newImageData,
        pollItemId,
      });
    },
  },
};
</script>

<style></style>
