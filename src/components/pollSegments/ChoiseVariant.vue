<template>
  <div class="editor-descr">Варианты</div>
  <draggable
    v-model="optionsList"
    v-bind="pollItemsDragOptionsInSidebar"
    handle=".variant-item__dragg"
    @start="isDraggingOption = true"
    @end="isDraggingOption = false"
  >
    <transition-group
      type="transition"
      :name="isDraggingOption ? 'flip-option-list' : 'option-transition'"
    >
      <answer-option
        v-for="(variant, index) in optionsList"
        :key="variant.id"
        :numberPosition="index"
        :variantData="variant"
        :inputsType="inputsType"
        :currentAnswerIdList="optionsData.currentAnswerId"
        :showRemoveBtn="permissionToRemoveOption"
        @selectVariant="selectVariant"
        @editVariant="editVariant($event, variant.id)"
        @removeVariant="removeVariant"
      />
    </transition-group>
  </draggable>
  <button
    class="btn app-btn add-btn"
    v-if="permissionToAddOption"
    @click="addOption"
  >
    Добавить вариант
  </button>
</template>

<script>
import { mapMutations } from "vuex";
import AnswerOption from "./AnswerOption.vue";
import { VueDraggableNext } from "vue-draggable-next";

export default {
  components: {
    AnswerOption,
    draggable: VueDraggableNext,
  },
  props: {
    pollItemId: { type: [Number, String] },
    optionsData: { type: Object },
    inputsType: { type: String },
  },
  data() {
    return {
      isDraggingOption: false,
    };
  },
  computed: {
    optionsList: {
      get() {
        return this.optionsData.optionsList;
      },
      set(sortableList) {
        const pollItemId = this.pollItemId;
        this.dragSortOptionsInPoll({ sortableList, pollItemId });
      },
    },
    permissionToAddOption() {
      const maxOptionsLength = this.optionsData.maxOptionsLength;
      const optionsLength = this.optionsData.optionsList.length;
      return maxOptionsLength > optionsLength;
    },
    permissionToRemoveOption() {
      const minxOptionsLength = this.optionsData.minOptionsLength;
      const optionsLength = this.optionsData.optionsList.length;
      return optionsLength > minxOptionsLength;
    },

    pollItemsDragOptionsInSidebar() {
      return {
        animation: 200,
        group: `optionGroup-${this.pollItemId}`,
        scrollSensitivity: 200,
        forceFallback: true,
        disabled: false,
        ghostClass: "ghost-potion",
        sort: true,
      };
    },
  },
  methods: {
    ...mapMutations([
      "selectOptionInPoll",
      "editOptionInPoll",
      "addOptionInPoll",
      "removeOptionInPoll",
      "dragSortOptionsInPoll",
    ]),
    addOption() {
      const { pollItemId } = this;
      this.addOptionInPoll({ pollItemId });
    },

    selectVariant(optionId) {
      const { pollItemId, inputsType } = this;
      this.selectOptionInPoll({ pollItemId, optionId, inputsType });
    },

    removeVariant(optionId) {
      const { pollItemId, inputsType } = this;
      this.removeOptionInPoll({ pollItemId, optionId, inputsType });
    },

    editVariant(event, optionId) {
      const { pollItemId } = this;
      const optionValue = event.target.value.trim();
      this.editOptionInPoll({ pollItemId, optionId, optionValue });
    },
  },
};
</script>

<style scoped lang="scss"></style>
