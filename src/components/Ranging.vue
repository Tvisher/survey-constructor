<template>
  <div
    class="variant-item__container"
    v-for="(option, index) in optionsData.optionsList"
    :key="option.id"
  >
    <div class="variant-item__position">{{ index + 1 }}</div>
    <div class="variant-item">
      <div class="variant-item__wrapper">
        <label class="variant-item__label">
          <input
            type="text"
            class="variant-item__filed"
            :value="option.value"
            @input="editVariant($event, option.id)"
            placeholder="Вариант ответа"
          />
        </label>
      </div>
      <button
        class="variant-item__remove"
        @click="removeVariant(option.id)"
      ></button>
    </div>
  </div>
  <button class="btn red-btn" v-if="permissionToAddOption" @click="addOption">
    Добавить вариант
  </button>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  props: {
    pollPageId: { type: [Number, String] },
    pollItemId: { type: [Number, String] },
    optionsData: { type: Object },
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
      "editOptionInPoll",
      "addOptionInPoll",
      "removeOptionInPoll",
    ]),
    addOption() {
      const { pollItemId, pollPageId } = this;
      this.addOptionInPoll({ pollPageId, pollItemId });
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
