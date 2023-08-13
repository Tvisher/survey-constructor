<template>
  <div class="variant-item">
    <div class="variant-item__dragg"></div>
    <div class="variant-item__wrapper">
      <label class="variant-item__label">
        <input
          type="text"
          class="variant-item__filed"
          :value="variantData.value"
          :placeholder="`Вариант ответа № ${optionNumber}`"
          @input="$emit('editVariant', $event)"
        />
      </label>
      <label class="custom-cb" v-if="hasCorrectAnswers">
        <input
          :type="inputsType"
          class="custom-cb__checkbox"
          :checked="isCurrentVariant"
          @input="$emit('selectVariant', variantData.id)"
        />
        <span class="custom-cb__text">Правильный ответ</span>
      </label>
    </div>
    <button
      class="variant-item__remove"
      :class="{ 'cant-remove': !showRemoveBtn }"
      @click="removeOption"
    ></button>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  props: {
    numberPosition: { type: [String, Number] },
    inputsType: { type: String },
    currentAnswerIdList: { type: Array },
    variantData: { type: Object },
    showRemoveBtn: { type: Boolean },
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      hasCorrectAnswers: (state) => state.appSettings.hasCorrectAnswers,
    }),
    optionNumber() {
      return this.numberPosition + 1;
    },
    isCurrentVariant() {
      return this.currentAnswerIdList.includes(this.variantData.id);
    },
  },
  methods: {
    removeOption() {
      if (this.showRemoveBtn) {
        this.$emit("removeVariant", this.variantData.id);
      }
    },
  },
};
</script>

<style lang="scss">
.variant-item.ghost-potion {
  margin-right: 0;
  margin-left: 0;
  border-style: dashed;
  border-color: var(--app-color);
  * {
    opacity: 0;
  }
}
.variant-item.sortable-drag {
  opacity: 1 !important;
  background: #ecf4ff;
}
</style>
