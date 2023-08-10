<template>
  <div class="toggle-option">
    <label class="toggle-option__label">
      <input type="checkbox" class="toggle-option__cb" />
      <div class="toggle-option__text">
        <slot></slot>
      </div>
    </label>
    <Popper
      class="top-popper"
      :content="'Подсказка'"
      :hover="true"
      :arrow="true"
      :placement="'top'"
    >
      <button class="tolltip-btn"></button>
    </Popper>
  </div>
</template>

<script>
import Popper from "vue3-popper";

export default {
  components: {
    Popper,
  },
};
</script>

<style lang="scss" scoped>
.toggle-option__label {
  padding: 10px 0;
  display: flex;
  position: relative;
}
.toggle-option__cb {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: 0;
  opacity: 0;
  z-index: 2;
  cursor: pointer;
  &:checked + .toggle-option__text {
    &::before {
      background-color: var(--app-color);
    }
    &::after {
      left: 17px;
    }
  }
}
.toggle-option__text {
  &::selection {
    background-color: transparent;
  }
  margin-right: 10px;
  color: #262b31;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%; /* 25.2px */
  display: flex;
  align-items: center;
  &::before {
    transition: background-color 0.2s ease-in-out;
    margin-right: 30px;
    border-radius: 10px;
    content: "";
    display: block;
    width: 32px;
    height: 16px;
    background-color: #ecf4ff;
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25) inset;
  }
  &::after {
    position: absolute;
    content: "";
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background-color: #fff;
    top: 50%;
    left: 1px;
    transform: translateY(-50%);
    transition: left 0.2s ease-in-out;
  }
}

.toggle-option {
  display: flex;
  align-items: center;
  &:not(:last-child) {
    margin-bottom: 20px;
  }
}
.tolltip-btn {
  width: 16px !important;
  height: 16px !important;
}
</style>
