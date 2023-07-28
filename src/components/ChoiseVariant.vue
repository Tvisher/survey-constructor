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
    class="btn red-btn add-btn"
    v-if="permissionToAddOption"
    @click="addOption"
  >
    Добавить вариант
  </button>
</template>

<script>
import { mapMutations } from "vuex";
import AnswerOption from "./pollSegments/AnswerOption.vue";
import { VueDraggableNext } from "vue-draggable-next";

export default {
  components: {
    AnswerOption,
    draggable: VueDraggableNext,
  },
  props: {
    pollPageId: { type: [Number, String] },
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
      return maxOptionsLength >= optionsLength;
    },
    permissionToRemoveOption() {
      const minxOptionsLength = this.optionsData.minOptionsLength;
      const optionsLength = this.optionsData.optionsList.length;
      return optionsLength > minxOptionsLength;
    },

    pollItemsDragOptionsInSidebar() {
      return {
        animation: 0,
        group: `optionGroup-${this.pollItemId}`,
        disabled: false,
        ghostClass: "ghost-potion",
        sort: "true",
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
      const { pollItemId, pollPageId } = this;
      this.addOptionInPoll({ pollPageId, pollItemId });
    },

    selectVariant(optionId) {
      const { pollItemId, pollPageId, inputsType } = this;
      this.selectOptionInPoll({ pollPageId, pollItemId, optionId, inputsType });
    },

    removeVariant(optionId) {
      const { pollItemId, pollPageId, inputsType } = this;
      this.removeOptionInPoll({ pollPageId, pollItemId, optionId, inputsType });
    },

    editVariant(event, optionId) {
      const { pollItemId, pollPageId } = this;
      const optionValue = event.target.value.trim();
      this.editOptionInPoll({ pollPageId, pollItemId, optionId, optionValue });
    },
  },
};
</script>

<style scoped lang="scss">
.flip-option-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost-potion {
  opacity: 0.8;
  background: #ecf4ff;
}
</style>
