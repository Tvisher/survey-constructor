<template>
  <div class="single-choise-visual">
    <label
      class="single-choise-visual__label"
      :class="{ checked: option.id === checkedInputId }"
      v-for="option in optionsData.optionsList"
      :key="option.id"
    >
      <input
        class="single-choise-visual__input"
        type="radio"
        :name="pollItemId"
        @input="getChecket(option.id)"
      />
      <p class="single-choise-visual__text">{{ option.value }}</p>
    </label>
  </div>
</template>

<script>
export default {
  props: {
    optionsData: Object,
    pollItemId: String,
  },
  data() {
    return {
      checkedInputId: "",
    };
  },
  methods: {
    getChecket(inputId) {
      this.checkedInputId = inputId;
    },
  },
};
</script>

<style lang="scss">
.single-choise-visual,
.multiple-choise-visual {
  display: flex;
  flex-direction: column;
}
.single-choise-visual__label {
  &.checked::before {
    opacity: 0.2;
  }
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: var(--app-color);
    opacity: 0;
  }
  transition: border 0.2s ease-in-out, background-color 0.2s ease-in-out;
  cursor: pointer;
  position: relative;
  width: 100%;
  padding: 16px 20px;
  border: 1px solid rgba(0, 66, 105, 0.28);
  border-bottom: 1px solid transparent;
  &:first-child {
    border-radius: 4px 4px 0px 0px;
  }
  &:last-child {
    border-radius: 0px 0px 4px 4px;
    border-bottom: 1px solid rgba(0, 66, 105, 0.28);
  }
  &:hover {
    border-color: var(--app-color) !important;
    & + .single-choise-visual__label {
      border-top: 1px solid transparent;
    }
  }
}

.single-choise-visual__text {
  word-wrap: break-word;
  margin: 0;
  color: #262b31;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%; /* 25.2px */
  position: relative;
  padding-left: 26px;
  &:before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    border: 1px solid #c2cfe0;
    border-radius: 50%;
    width: 16px;
    height: 16px;
  }

  &:after {
    content: "";
    position: absolute;
    left: 4px;
    top: 50%;
    transform: translateY(-50%);
    background-color: var(--app-color);
    border-radius: 50%;
    width: 8px;
    height: 8px;
    opacity: 0;
  }
}

.single-choise-visual__input {
  margin: 0;
  cursor: pointer;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  &:checked + .single-choise-visual__text {
    &:before {
      border-color: var(--app-color);
    }
    &:after {
      opacity: 1;
    }
  }
}
</style>
