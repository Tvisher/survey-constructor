<template>
  <span class="editor-descr">Опции ранжирования</span>
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
      <div
        class="variant-item__container"
        v-for="(option, index) in optionsList"
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
    class="btn app-btn add-btn"
    v-if="permissionToAddOption"
    @click="addOption"
  >
    Добавить вариант
  </button>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import { VueDraggableNext } from "vue-draggable-next";

export default {
  components: {
    draggable: VueDraggableNext,
  },
  props: {
    pollItemId: { type: [Number, String] },
    optionsData: { type: Object },
  },
  data() {
    return {
      isDraggingOption: false,
    };
  },
  computed: {
    ...mapGetters(["editingIsBlocked"]),

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
      if (this.editingIsBlocked) {
        return { disabled: true };
      }
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
      "editOptionInPoll",
      "addOptionInPoll",
      "removeOptionInPoll",
      "dragSortOptionsInPoll",
    ]),
    addOption() {
      if (this.editingIsBlocked) return;

      const { pollItemId } = this;
      this.addOptionInPoll({ pollItemId });
    },

    removeVariant(optionId) {
      if (this.editingIsBlocked) return;

      const { pollItemId } = this;
      if (this.permissionToRemoveOption) {
        this.removeOptionInPoll({ pollItemId, optionId });
      }
    },
    editVariant(event, optionId) {
      const { pollItemId } = this;
      const optionValue = event.target.value.trim();
      this.editOptionInPoll({ pollItemId, optionId, optionValue });
    },
  },
};
</script>

<style scoped lang="scss">
.variant-item__container {
  border-radius: 8px;
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

.ghost-potion {
  margin-right: 0;
  margin-left: 0;
  & > * {
    opacity: 0;
  }
  border-style: dashed;
  border-color: var(--app-color);
}

.sortable-drag {
  opacity: 1 !important;
  background: #ecf4ff;
}
</style>
