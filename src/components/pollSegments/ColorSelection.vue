<template>
  <div class="color-selection">
    <label
      class="color-selection__item"
      v-for="(color, index) in colors"
      :key="index"
      :style="{
        borderColor:
          color.value == defaultColor.value
            ? '#0078d2'
            : 'rgba(0, 66, 105, 0.28)',
      }"
    >
      <input
        :checked="color.value == defaultColor.value"
        type="radio"
        :value="color.value"
        :name="`color-selection-${colorBinding}`"
        class="color-selection__input"
        @input="colorSelect(color)"
      />
      <div
        class="color-selection__example"
        :style="{
          borderColor: color.value,
          backgroundColor: color.value,
        }"
      ></div>
      <div class="color-selection__name">{{ color.name }}</div>
    </label>
  </div>
</template>

<script>
export default {
  props: {
    defaultColor: { type: Object },
    colors: { type: Array },
    colorBinding: { type: String },
  },
  data() {
    return {
      selectedColor: {},
    };
  },
  computed: {},

  methods: {
    colorSelect(color) {
      this.$emit("colorSelect", color);
      this.selectedColor = color;
    },
  },
};
</script>

<style lang="scss">
.color-selection {
  display: flex;
  flex-wrap: wrap;
  margin-right: -5px;
  margin-left: -5px;
  margin-bottom: 25px;
}
.color-selection__item {
  background-color: #ecf4ff;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 5px;
  padding: 10px;
  width: calc(25% - 10px);
  border-radius: 4px;
  border: 1px solid rgba(0, 66, 105, 0.28);
}

.color-selection__input {
  margin: 0;
  position: absolute;
  z-index: 2;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  &:checked + .color-selection__example::before {
    opacity: 0;
  }
}

.color-selection__example {
  width: 24px;
  height: 24px;
  border: 2px solid transparent;
  border-radius: 50%;
  margin-bottom: 6px;
  position: relative;
  overflow: hidden;
  &::before {
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    background-color: #ecf4ff;
  }
}
.color-selection__name {
  color: #868da4;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 27px */
}
</style>
