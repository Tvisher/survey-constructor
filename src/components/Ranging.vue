<template>
  <draggable
    v-model="optionsList"
    v-bind="pollItemsDragOptionsInSidebar"
    handle=".variant-item__dragg"
    @start="isDraggingOption = true"
    @end="isDraggingOption = false"
  >
    <transition-group
      type="transition"
      :name="isDraggingOption ? 'flip-option-list' : null"
    >
      <div
        class="variant-item__container"
        v-for="(option, index) in optionsData.optionsList"
        :key="option.id"
      >
        <div class="variant-item__dragg">
          <div class="variant-item__position">{{ index + 1 }}</div>
        </div>
        <div class="variant-item">
          <div class="variant-item__wrapper">
            <label class="variant-item__label">
              <input
                type="text"
                class="variant-item__filed"
                :value="option.value"
                @input="editVariant($event, option.id)"
                :placeholder="`Вариант ответа № ${index + 1}`"
              />
            </label>
          </div>
          <button
            class="variant-item__remove"
            :class="{ 'cant-remove': !permissionToRemoveOption }"
            @click="removeVariant(option.id)"
          ></button>
        </div>
      </div>
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
import { VueDraggableNext } from "vue-draggable-next";

export default {
  components: {
    draggable: VueDraggableNext,
  },
  props: {
    pollPageId: { type: [Number, String] },
    pollItemId: { type: [Number, String] },
    optionsData: { type: Object },
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
      "editOptionInPoll",
      "addOptionInPoll",
      "removeOptionInPoll",
      "dragSortOptionsInPoll",
    ]),
    addOption() {
      const { pollItemId, pollPageId } = this;
      this.addOptionInPoll({ pollPageId, pollItemId });
    },

    removeVariant(optionId) {
      const { pollItemId, pollPageId } = this;
      if (this.permissionToRemoveOption) {
        this.removeOptionInPoll({ pollPageId, pollItemId, optionId });
      }
    },
    editVariant(event, optionId) {
      const { pollItemId, pollPageId } = this;
      const optionValue = event.target.value.trim();
      this.editOptionInPoll({ pollPageId, pollItemId, optionId, optionValue });
    },
  },
};
</script>

<style scoped>
.variant-item__container {
  align-items: center;
  padding: 8px 15px;
  margin-right: -15px;
  margin-left: -15px;
}
.variant-item__dragg {
  margin-top: 0;
}
.variant-item__filed {
  margin-bottom: 0;
}
.variant-item {
  padding: 0;
  margin: 0;
  width: 100%;
}

.variant-item__dragg {
  padding-right: 0;
  width: fit-content;
  padding-left: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.variant-item__position {
  margin-top: 0;
}

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
