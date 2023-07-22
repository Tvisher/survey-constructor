<template>
  <div class="variant-item">
    <div class="variant-item__wrapper">
      <label class="variant-item__label">
        <input
          type="text"
          class="variant-item__filed"
          :value="variantData.value"
          @input="$emit('editVariant', $event)"
        />
      </label>
      <label class="custom-cb">
        <input
          type="radio"
          class="custom-cb__checkbox"
          :checked="isCurrentVariant"
          @input="$emit('selectVariant', variantData.id)"
        />
        <span class="custom-cb__text">Правильный ответ</span>
      </label>
    </div>
    <button
      class="variant-item__remove"
      @click="$emit('removeVariant', variantData.id)"
    ></button>
  </div>
</template>
<script>
export default {
  props: {
    currentAnswerId: { type: [Number, String] },
    variantData: { type: Object },
  },
  data() {
    return {};
  },
  computed: {
    isCurrentVariant() {
      return this.variantData.id == this.currentAnswerId;
    },
  },
  methods: {},
};
</script>

<style lang="scss">
.variant-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 15px;
  width: 100%;
}
.variant-item__label {
  display: block;
  width: 100%;
}
.variant-item__filed {
  margin-bottom: 8px;
  width: 100%;
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #c2cfe0;
  background: #fff;
  color: #262b31;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
}

.variant-item__wrapper {
  width: 100%;
}

.variant-item__remove {
  cursor: pointer;
  border: none;
  width: 30px;
  height: 48px;
  background-color: transparent;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cg clip-path='url(%23clip0_1212_7089)'%3e%3cpath d='M8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16C12.4183 16 16 12.4183 16 8C15.9952 3.58369 12.4163 0.00478125 8 0ZM10.6667 9.72466C10.9376 9.974 10.9551 10.3958 10.7057 10.6667C10.4564 10.9376 10.0346 10.9551 9.76372 10.7057C9.75016 10.6933 9.73716 10.6802 9.72466 10.6667L8 8.94266L6.276 10.6667C6.01116 10.9224 5.58913 10.9151 5.33334 10.6503C5.08384 10.3919 5.08384 9.98234 5.33334 9.724L7.05734 8L5.33334 6.276C5.07756 6.01116 5.08491 5.58913 5.34975 5.33334C5.60809 5.08384 6.01766 5.08384 6.276 5.33334L8 7.05734L9.72466 5.33334C9.974 5.06244 10.3958 5.04494 10.6667 5.29428C10.9376 5.54363 10.9551 5.96537 10.7057 6.23628C10.6933 6.24984 10.6802 6.26284 10.6667 6.27534L8.94266 8L10.6667 9.72466Z' fill='%23C2CFE0'/%3e%3c/g%3e%3cdefs%3e%3cclipPath id='clip0_1212_7089'%3e%3crect width='16' height='16' fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e ");
  background-repeat: no-repeat;
  background-size: 16px;
  background-position: right;
}

.custom-cb {
  position: relative;
  .custom-cb__checkbox {
    margin: 0;
    cursor: pointer;
    opacity: 0;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    &:checked + .custom-cb__text {
      &:before {
        background-color: #fa0056;
        border-color: #fa0056;
      }
      &::after {
        opacity: 1;
      }
    }
  }
  .custom-cb__text {
    color: #262b31;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 140%;
    padding-left: 24px;
    &:before {
      content: "";
      position: absolute;
      left: 0;
      top: 1px;
      width: 16px;
      height: 16px;
      border-radius: 4px;
      border: 1px solid #c2cfe0;
    }
    &::after {
      opacity: 0;
      content: "";
      position: absolute;
      left: 0;
      top: 1px;
      width: 16px;
      height: 16px;
      background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='8' height='8' viewBox='0 0 8 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cg clip-path='url(%23clip0_1212_7094)'%3e%3cpath d='M2.58306 6.88763C2.35598 6.88772 2.13819 6.79746 1.97775 6.63675L0.147687 4.80737C-0.049229 4.61039 -0.049229 4.29109 0.147687 4.09411C0.344666 3.89719 0.663969 3.89719 0.860947 4.09411L2.58306 5.81623L7.13905 1.26024C7.33603 1.06332 7.65533 1.06332 7.85231 1.26024C8.04923 1.45721 8.04923 1.77652 7.85231 1.9735L3.18838 6.63675C3.02794 6.79746 2.81015 6.88772 2.58306 6.88763Z' fill='white'/%3e%3c/g%3e%3cdefs%3e%3cclipPath id='clip0_1212_7094'%3e%3crect width='8' height='8' fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e ");
      background-repeat: no-repeat;
      background-size: 8px;
      background-position: center;
    }
  }
}
</style>
