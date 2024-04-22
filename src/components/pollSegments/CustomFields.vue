<template>
  <div class="editor-descr">Варианты полей</div>
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
        class="variant-item"
        v-for="variant in optionsList"
        :key="variant.id"
      >
        <div class="variant-item-req" v-if="appType == 'survey'">
          <div class="custom-fields-choise">
            <label class="custom-cb">
              <input
                type="checkbox"
                :name="`${pollItemId}-${variant.id}-option`"
                :checked="variant.req"
                class="custom-cb__checkbox"
                @input="toggleOptionRequired($event, variant.id)"
              />
              <span class="custom-cb__text">Обязательное поле</span>
            </label>
          </div>
        </div>
        <div class="variant-item-w">
          <div class="variant-item__dragg"></div>
          <div class="variant-item__wrapper">
            <label class="variant-item__label">
              <input
                type="text"
                class="variant-item__filed"
                :value="variant.value"
                @input="editVariant($event, variant.id)"
                placeholder="Заголовок поля"
              />
            </label>
            <div class="custom-fields-choise">
              <span class="custom-fields-title">Тип поля:</span>
              <label class="custom-cb">
                <input
                  type="radio"
                  :name="`${pollItemId}-${variant.id}-option`"
                  value="text"
                  :checked="variant.type == 'text'"
                  class="custom-cb__checkbox"
                  @input="setOptionType($event, variant.id)"
                />
                <span class="custom-cb__text">Текст</span>
              </label>
              <label class="custom-cb">
                <input
                  type="radio"
                  :name="`${pollItemId}-${variant.id}-option`"
                  value="phone"
                  :checked="variant.type == 'phone'"
                  class="custom-cb__checkbox"
                  @input="setOptionType($event, variant.id)"
                />
                <span class="custom-cb__text">Телефон</span>
              </label>
              <label class="custom-cb">
                <input
                  type="radio"
                  :name="`${pollItemId}-${variant.id}-option`"
                  value="email"
                  :checked="variant.type == 'email'"
                  class="custom-cb__checkbox"
                  @input="setOptionType($event, variant.id)"
                />
                <span class="custom-cb__text">Email</span>
              </label>
              <label class="custom-cb">
                <input
                  type="radio"
                  :name="`${pollItemId}-${variant.id}-option`"
                  value="textarea"
                  :checked="variant.type == 'textarea'"
                  class="custom-cb__checkbox"
                  @input="setOptionType($event, variant.id)"
                />
                <span class="custom-cb__text">Область текста</span>
              </label>
            </div>
          </div>
          <button
            class="variant-item__remove"
            :class="{ 'cant-remove': !permissionToRemoveOption }"
            @click="removeVariant(variant.id)"
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
    Добавить поле
  </button>
</template>

<script>
import { VueDraggableNext } from "vue-draggable-next";
import { mapMutations, mapGetters, mapState } from "vuex";

export default {
  components: {
    draggable: VueDraggableNext,
  },
  props: {
    pollItemId: { type: String },
    optionsData: { type: Object },
  },
  data() {
    return {
      isDraggingOption: false,
    };
  },
  computed: {
    ...mapState({
      appType: (state) => state.appType,
    }),
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
      "addCustomField",
      "setCustomFieldType",
      "editOptionInPoll",
      "addOptionInPoll",
      "removeOptionInPoll",
      "dragSortOptionsInPoll",
      "setCustomFieldReq",
    ]),

    addOption() {
      if (this.editingIsBlocked) return;
      const { pollItemId } = this;
      this.addCustomField({ pollItemId });
    },

    removeVariant(optionId) {
      if (this.editingIsBlocked) return;
      const { pollItemId, inputsType } = this;
      this.removeOptionInPoll({ pollItemId, optionId, inputsType });
    },

    editVariant(event, optionId) {
      const { pollItemId } = this;
      const optionValue = event.target.value.trim();
      this.editOptionInPoll({ pollItemId, optionId, optionValue });
    },

    setOptionType(event, optionId) {
      if (this.editingIsBlocked) return;

      const selectedType = event.target.value;
      const { pollItemId } = this;
      this.setCustomFieldType({ pollItemId, optionId, selectedType });
    },

    toggleOptionRequired(event, optionId) {
      const { pollItemId } = this;
      this.setCustomFieldReq({
        pollItemId,
        optionId,
        value: event.target.checked,
      });
    },
  },
};
</script>

<style scoped lang="scss">
.variant-item {
  display: flex;
  flex-direction: column;
}
.variant-item-req {
  width: 100%;
}

.variant-item-w {
  width: 100%;
  display: flex;
}
.custom-cb {
  margin-right: 20px;
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
