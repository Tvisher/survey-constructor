<template>
  <div class="variant-item">
    <div class="variant-item__wrapper">
      <label class="variant-item__label">
        <input
          type="text"
          class="variant-item__filed"
          :value="variantData.value"
          placeholder="Вариант ответа"
          @input="$emit('editVariant', $event)"
        />
      </label>
      <label class="custom-cb">
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
export default {
  props: {
    inputsType: { type: String },
    currentAnswerIdList: { type: Array },
    variantData: { type: Object },
    showRemoveBtn: { type: Boolean },
  },
  data() {
    return {};
  },
  computed: {
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

<style lang="scss"></style>
